from . import models
from django.forms import ModelForm
from crispy_forms.helper import FormHelper
from crispy_forms.layout import Submit

class QuillPostForm(ModelForm):
    class Meta:
        model = models.QuillPost
        fields = ['content', 'more_content']

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.add_input(Submit("save", "Save"))
        instance_id = kwargs.get('instance').id if kwargs.get('instance') else 'new'
        self.fields['content'].widget.attrs.update({'model': 'demo.QuillPost', 'instance_id': instance_id})
        self.fields['more_content'].widget.attrs.update({'model': 'demo.QuillPost', 'instance_id': instance_id})
