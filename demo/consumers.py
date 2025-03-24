from pycrdt_websocket.django_channels_consumer import YjsConsumer
from pycrdt import Text, Doc
from django.apps import apps
from django.core.exceptions import ObjectDoesNotExist
from django_quill.fields import QuillField
import json

# Global store for YDoc instances
# TODO FIX THIS WILL NOT WORK WITH MULTIPLE PROCESSES
doc_store = {}

class QuillConsumer(YjsConsumer):
    # Class variable to track active connections per room
    active_connections = {}
    
    async def connect(self):
        await super().connect()
        
        # Initialize connection counter for this room
        if self.room_name not in self.active_connections:
            self.active_connections[self.room_name] = 0
        self.active_connections[self.room_name] += 1
        
        # Debug info
        print(f"Connection to {self.room_name}. Active: {self.active_connections[self.room_name]}")
    
    async def disconnect(self, close_code):
        # Decrement connection counter
        if self.room_name in self.active_connections:
            self.active_connections[self.room_name] -= 1
            
            # If no more connections to this room, clean up the doc
            if self.active_connections[self.room_name] <= 0:
                if self.room_name in doc_store:
                    print(f"Cleaning up document for room {self.room_name}")
                    del doc_store[self.room_name]
                    del self.active_connections[self.room_name]
        
        # Debug info
        print(f"Disconnection from {self.room_name}. Active: {self.active_connections.get(self.room_name, 0)}")
        
        await super().disconnect(close_code)
    
    async def make_ydoc(self):
        # Check if a doc already exists for this room
        if self.room_name in doc_store:
            print(f"Using existing document for room {self.room_name}")
            return doc_store[self.room_name]
        
        # Create a new doc
        print(f"Creating new document for room {self.room_name}")
        doc = Doc()
        
        # Initialize doc content
        [model_name, object_id] = self.room_name.split("__")
        if model_name and object_id:
            try:
                # Get the model class dynamically
                model_class = apps.get_model(model_name)
                
                # Get the object with the specified ID
                obj = await self.get_object_async(model_class, object_id)
                
                for field in model_class._meta.get_fields():
                    if isinstance(field, QuillField):
                        field_name = field.name
                        field_content = getattr(obj, field_name)
                        ytext = doc.get(field_name, type=Text)
                        
                        # Apply delta to YText directly
                        if hasattr(field_content, 'delta') and field_content.delta:
                            self.apply_delta_to_ytext(ytext, field_content.delta)
                        else:
                            # Fallback to HTML if delta is not available
                            ytext.insert(0, field_content.html)
            except (LookupError, ObjectDoesNotExist):
                doc.get("error", type=Text).insert(0, f"Could not find {model_name} with id {object_id}")
        
        # Store the doc for future connections
        doc_store[self.room_name] = doc
        return doc
    
    def apply_delta_to_ytext(self, ytext, delta):
        """Apply Quill delta operations directly to YText"""
        if isinstance(delta, str):
            try:
                delta = json.loads(delta)
            except json.JSONDecodeError:
                ytext.insert(0, "Error parsing delta")
                return
                
        if not isinstance(delta, dict) or 'ops' not in delta:
            ytext.insert(0, "Invalid delta format")
            return
            
        position = 0
        for op in delta.get('ops', []):
            if 'insert' in op:
                text = op['insert']
                attributes = op.get('attributes', {})
                
                # Insert text at current position
                ytext.insert(position, text)
                
                # If attributes exist, apply them (you would need to convert Quill formats to YText formats)
                # This is a simplified version - you might need more complex attribute mapping
                if attributes:
                    for attr_name, attr_value in attributes.items():
                        # Apply attributes to the inserted text range
                        ytext.format(position, len(text), {attr_name: attr_value})
                
                position += len(text)
            
            # Handle other operations like delete, retain if needed
            elif 'delete' in op:
                delete_count = op['delete']
                ytext.delete(position, delete_count)
            elif 'retain' in op:
                position += op['retain']
    
    async def get_object_async(self, model_class, object_id):
        """Helper method to get an object asynchronously from the database."""
        # For Django with async support
        try:
            from asgiref.sync import sync_to_async
            get_object = sync_to_async(model_class.objects.get)
            return await get_object(pk=object_id)
        except ImportError:
            # Fallback for older Django versions or without async support
            return model_class.objects.get(pk=object_id)
