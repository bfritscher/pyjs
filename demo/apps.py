from django.apps import AppConfig

class DemoConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'demo'
    
    def ready(self):
        # Import our override module to apply monkey patching
        try:
            from . import widgets
            # Explicitly trigger the monkey patching
            import django_quill.widgets
            import django_quill.fields
            from django_quill.widgets import QuillWidget
            from django_quill.fields import QuillField
            
            # Log successful patching
            print(f"Django-Quill patched: Widget={QuillWidget.__name__}, Field={QuillField.__name__}")
        except ImportError as e:
            print(f"Failed to patch Django-Quill: {e}")
