from django.shortcuts import render

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
