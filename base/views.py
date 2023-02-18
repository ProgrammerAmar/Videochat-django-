from django.shortcuts import render

# Create your views here.
def lobby(request):
    return render(request, 'base/login.html')


def room(request):
    return render(request, 'base/room.html')