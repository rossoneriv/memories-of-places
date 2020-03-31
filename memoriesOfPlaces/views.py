from django.shortcuts import render

# Create your views here.

def memories_list(request):
    return render(request, 'index.html', {})