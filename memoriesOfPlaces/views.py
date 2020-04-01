from django.shortcuts import render
from django.utils import timezone
from .models import Memories

# Create your views here.

def memories_list(request):
    memories = Memories.objects.filter(mem_date__lte=timezone.now()).order_by('mem_date')
    return render(request, 'index.html', {'memories' : memories})