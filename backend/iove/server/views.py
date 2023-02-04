from django.shortcuts import render
import json
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.http import HttpResponseRedirect
from django.db import IntegrityError
import random
from django.db.models import Q
from django.views.decorators.csrf import csrf_exempt, ensure_csrf_cookie

from .models import *

# Create your views here.

@csrf_exempt
def login_route(request):
    if request.method == "POST":
        
        data = json.loads(request.body)
        username = data["username"]
        password = data["password"]
        print(data)
        user = authenticate(request, username=username, password=password)
        print(user)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return JsonResponse(json.dumps({"response":"Logged in"}), safe=False, status=200)
        else:
            return JsonResponse(json.dumps({"response":"Invalid credentials"}), status=401, safe=False)

@csrf_exempt
def register(request):
    if request.method == "POST":
        data = json.loads(request.body)

        # Attempt to create new user
        try:
            user = User.objects.create_user(# type: ignore
                username = data["username"], 
                email = data["email"], 
                password = data["password"],
                age = data["age"]
            )
            user.save()
        except IntegrityError:
            return JsonResponse(json.dumps({"response":"Username taken"}), safe=False, status=403)
        login(request, user)
        return JsonResponse(json.dumps({"response":"Registration successful"}), safe=False, status=200)

@login_required# type: ignore
def send_preference(request):
    if request.method == "PUT":
        data = json.loads(request.body)
        subject = User.objects.get(pk=data["subject"])
        user = request.user
        if data["like"]:
            user.likes.add(subject)
            if subject.likes.filter(pk=user.id).exists():
                user.matches.add(subject)
                subject.matches.add(user)
                subject.save()
        else:
            user.dislikes.add(subject)
        user.save()
        return JsonResponse(json.dumps({"response":"Decision made"}), status=200)

@login_required# type: ignore
def profile(request):
    pass

@login_required# type: ignore
def serve_candidates(request):
    if request.method == "GET":
        user = request.user
        exclude_candidates = user.likes.values("id")
        exclude_candidates.append(user.dislikes.values("id"))
        candidates_list = list(User.objects.exclude(id__in = exclude_candidates))
        candidates = random.sample(candidates_list, 3)
        object_candidates = list(map(lambda candidate: candidate.jsonify(), candidates))
        return JsonResponse({"candidates"})

@login_required# type: ignore
def serve_matches(request):
    matches_set = Chat.objects.filter(Q(participant_1 = request.user) | Q(participant_2 = request.user))
    matches = list(map(lambda match: match.jsonify(request), matches_set))

@csrf_exempt
def get_basic_info(request):
    print(request.user.jsonify())
    return JsonResponse(json.dumps(request.user))

@ensure_csrf_cookie
def wsTest(request):
    # print(request.user.jsonify())
    return render(request, 'server/wsTest.html')