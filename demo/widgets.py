import logging
import sys
from django.utils.safestring import mark_safe
from django_quill.widgets import QuillWidget
from django_quill.fields import QuillField

# Setup logging to ensure output is visible
logger = logging.getLogger(__name__)
handler = logging.StreamHandler(sys.stdout)
handler.setLevel(logging.DEBUG)
logger.addHandler(handler)
logger.setLevel(logging.DEBUG)
logger.propagate = False  # Prevent double logging

class CustomQuillWidget(QuillWidget):
    """
    Custom Quill widget that provides model information to the template.
    """
    def get_context(self, name, value, attrs):
        print(f"DEBUG: get_context called for {name}")  # Direct print for immediate visibility
        context = super().get_context(name, value, attrs)
        
        # Try to get the form instance from widget
        form = getattr(self, 'form', None)
        instance = None
        
        # If we have a form, try to get its instance
        if form:
            instance = getattr(form, 'instance', None)
            logger.debug(f"Form found: {form.__class__.__name__}, Has instance: {instance is not None}")
        else:
            logger.debug("No form found in widget")
        
        # Add model information to the context if instance is available
        if instance:
            model_class = instance.__class__
            model_name = model_class._meta.model_name
            instance_id = instance.pk if hasattr(instance, 'pk') else None
            
            logger.debug(f"Adding model info: {model_name}, id: {instance_id}")
            context['widget']['attrs']['data-model'] = model_name
            context['widget']['attrs']['data-model-id'] = instance_id
            
            # Debug the context
            logger.debug(f"Widget attrs after update: {context['widget']['attrs']}")

        return context
    
    def render(self, name, value, attrs=None, renderer=None):
        print(f"DEBUG: render called for {name}")  # Direct print for immediate visibility
        # Store form reference when render is called from a BoundField
        if attrs and 'form' in attrs:
            self.form = attrs.pop('form')
            logger.debug(f"Form stored in widget during render for field: {name}")
        
        html = super().render(name, value, attrs, renderer)
        logger.debug(f"Rendered HTML contains data-model: {'data-model=' in html}")
        return html

class CustomQuillField(QuillField):
    """
    Custom Quill field that uses our custom widget.
    """
    def formfield(self, **kwargs):
        # Create widget explicitly with our custom widget class
        widget = CustomQuillWidget()
        # Copy config from original field to widget directly
        if hasattr(self, 'config'):
            widget.config = self.config
        
        kwargs['widget'] = widget
        return super().formfield(**kwargs)

# Apply monkey patching to replace the original classes
import django_quill.widgets
import django_quill.fields

# Store original classes for reference if needed
original_widget = django_quill.widgets.QuillWidget
original_field = django_quill.fields.QuillField

# Check if patching is necessary (avoid re-patching on module reload)
if django_quill.widgets.QuillWidget != CustomQuillWidget:
    django_quill.widgets.QuillWidget = CustomQuillWidget
    django_quill.fields.QuillField = CustomQuillField
    print("Django-Quill monkey patching applied successfully")  # Direct print for immediate visibility
else:
    print("Django-Quill already patched")  # Direct print for immediate visibility
