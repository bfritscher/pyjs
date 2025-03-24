# Import our custom widget to ensure it's loaded and the monkey patching occurs
try:
    from .widgets import CustomQuillWidget
except ImportError:
    pass

default_app_config = 'demo.apps.DemoConfig'
