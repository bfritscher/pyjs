from django.shortcuts import render
from . import models
from . import forms
from django.views.generic.edit import UpdateView

# Create your views here.
def index(request):
    """
    View function for the home page of the site.
    """
    context = {
        'title': 'Welcome to PyJS',
        'message': 'This is a basic Django template demo.',
    }
    
    return render(request, 'demo/index.html', context)


class CollabView(UpdateView):
    model = models.QuillPost
    form_class = forms.QuillPostForm
    
