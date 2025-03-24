from django import forms

class ModelFormWithInstance(forms.ModelForm):
    """
    A ModelForm that passes the instance to each field's widget.
    """
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        if hasattr(self, 'instance'):
            # Add form to each field's widget attrs
            for field_name, field in self.fields.items():
                field.widget.attrs['form'] = self
