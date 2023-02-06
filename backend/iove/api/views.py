from rest_framework.response import Response
from rest_framework import permissions
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from django.db.models import Q
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect
import json
from rest_framework.views import APIView
from django.db import IntegrityError
from server.models import *
import random

def check_login(func):
    def wrapper(*args, **kwargs):
        try:
            func(*args, **kwargs)
        except AttributeError:
            return Response({"response":"Not logged in"}, status=401)
    return wrapper
@method_decorator(ensure_csrf_cookie, name='dispatch')
class GetCookie(APIView):
    def get(self, request):
        return Response({"data":"CSRFCookie set"})

# @api_view(["GET"])
# @ensure_csrf_cookie
# def get_cookie(request):
#     return Response({"data":"CSRFCookie set"})

@method_decorator(csrf_protect, name='dispatch')
class GetBasicInfo(APIView):
    def get(self, request):
        if request.user:
            user = request.user.jsonify()
            return Response({"id":user["id"]})


# @api_view(["GET"])
# @login_required# type: ignore
# def get_basic_info(request):
#     if request.user:
#         user = request.user.jsonify()
#         return Response(user["id"])

# @api_view(["POST"])
# def login_route(request):
#     if request.method == "POST":
        

class Register(APIView):
    permission_classes = (permissions.AllowAny,)
    def post(self, request):
        
        print(request.data)
        data = json.loads(request.data)
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
            return Response({"response":"Username taken"}, status=403)
        login(request, user)
        return Response({"response":"Registration successful"}, status=200)
        # username = data["username"]
        # password = data["password"]
        # print(data)
        # user = authenticate(request, username=username, password=password)
        # print(user)

        # # Check if authentication successful
        # if user is not None:
        #     login(request, user)
        #     return Response({"response":"Logged in"}, status=200)
        # else:
        #     return Response({"response":"Invalid credentials"}, status=401)
        # data = json.loads(request.body)


class Profile(APIView):
    permission_classes = (permissions.AllowAny,)
    # @check_login
    def get(self, request, format=None):
        return Response(request.user.jsonify())
        
    def post(self, request, format=None):

        def edit_many_to_many(edits_list, many_to_many_field):
            for item in edits_list:
                try:
                    if item["add"]:
                        if item["category"] == "language":
                            many_to_many_field.add(Language.objects.get(name=item["item"]))
                        elif item["category"] == "ethnicity":
                            many_to_many_field.add(Ethnicity.objects.get(name=item["item"]))
                    elif not item["add"]:
                        if item["category"] == "language":
                            many_to_many_field.remove(Language.objects.get(name=item["item"]))
                        elif item["category"] == "ethnicity":
                            many_to_many_field.remove(Ethnicity.objects.get(name=item["item"]))
                except:
                    pass

        user = request.user
        data = request.data

        # print(user.jsonify())

        # Update data. Can't really do it nicely since frontend data and db data is structured differently

        user.pfp_url = data["bigCards"]["profilePicture"]["image"]
        user.pfp_transform_x = data["bigCards"]["profilePicture"]["transformX"]
        user.pfp_transform_y = data["bigCards"]["profilePicture"]["transformY"]
        user.pfp_transform_scale = data["bigCards"]["profilePicture"]["transformScale"]
        # Bio card
        user.bio_text = data["bigCards"]["bio"]
        user.bio_orientation = data["bigCards"]["vitals"]["orientation"]
        user.bio_gender = data["bigCards"]["vitals"]["gender"]
        user.bio_pronouns = data["bigCards"]["vitals"]["pronouns"]
        edit_many_to_many(data["bigCards"]["background"]["ethnicity"]["edits"], user.bio_ethnicity)
        edit_many_to_many(data["bigCards"]["background"]["languages"]["edits"], user.bio_languages)
        user.bio_education = data["bigCards"]["background"]["education"]
        user.bio_religion = data["bigCards"]["background"]["religion"]
        user.bio_occupation = data["bigCards"]["background"]["occupation"]
        user.bio_alcohol = data["bigCards"]["lifestyle"]["alcohol"]
        user.bio_smoke = data["bigCards"]["lifestyle"]["weed"]
        user.bio_cannabis = data["bigCards"]["lifestyle"]["smoke"]
        user.bio_diet = data["bigCards"]["lifestyle"]["diet"]
        # Fav hobby card
        user.favourite_hobby = data["bigCards"]["favoriteHobby"]
        # Code card
        user.code_text = data["bigCards"]["code"]["code"]
        user.code_filename = data["bigCards"]["code"]["filename"]
        user.code_lang = data["bigCards"]["code"]["language"]
        # Small card #1
        user.small_1_theme = data["smallCards"]["card_1"]["theme"]
        user.small_1_specific = data["smallCards"]["card_1"]["prop"]
        # Small card #2
        user.small_2_theme = data["smallCards"]["card_2"]["theme"]
        user.small_2_specific = data["smallCards"]["card_2"]["prop"]
        # Small card #3
        user.small_3_theme = data["smallCards"]["card_3"]["theme"]
        user.small_3_specific = data["smallCards"]["card_3"]["prop"]
        # Small card #4
        user.small_4_theme = data["smallCards"]["card_4"]["theme"]
        user.small_4_specific = data["smallCards"]["card_4"]["prop"]
        user.save()
        # print(type(data["bigCards"]["background"]["ethnicity"]))
        return Response(user.jsonify())


@method_decorator(csrf_protect, name='dispatch')
class LoginView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        data = json.loads(request.data)
        username = data["username"]
        password = data["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return Response({"response":"Logged in"}, status=200)
        else:
            return Response({"response":"Invalid credentials"}, status=401)

class SubmitDecision(APIView):
    def post(self, request):
        data = request.data
        subject = User.objects.get(pk=data["subject"])
        user = request.user
        print(user.id)
        if data["like"]:
            user.likes.add(subject)
            if subject.likes.filter(pk=user.id).exists():
                user.matches.add(subject)
                subject.matches.add(user)
                Chat.objects.create(participant_1_id = user.id, participant_2_id = subject.id)# type: ignore
                # subject.save()
        else:
            user.dislikes.add(subject)
        # user.save()

        return Response({"status":"decision successful"}, status=200)

class ServeUsers(APIView):
    # @login_required
    def get(self, request):
        try:
            user = request.user
            quantity = int(request.query_params.get('n'))
            exclude_candidates = list(user.likes.values("id"))
            exclude_candidates.extend(list(user.dislikes.values("id")))
            exclude_candidates = list(map(lambda element: element["id"], exclude_candidates))
            print(exclude_candidates)
            candidates_list = list(User.objects.exclude(id__in = exclude_candidates))
            try:
                candidates = random.sample(candidates_list, quantity)
            except ValueError:
                candidates = random.sample(candidates_list, len(candidates_list))
            object_candidates = list(map(lambda candidate: candidate.jsonify(), candidates))
            return Response(object_candidates, status=200)
        except AttributeError:
            # return HttpResponseRedirect("/login")
            return Response({"response":"Not logged in"}, status=401)

class ServeChats(APIView):
    def get(self, request):
        try:
            chats = Chat.objects.filter(Q(participant_1 = request.user) | Q(participant_2 = request.user))
            chats = list(map(lambda chat: chat.jsonify(request), chats))
            # print(chats)
            return Response(chats)
        except AttributeError:
            return Response({"response":""})

class SendMessage(APIView):
    def post(self, request):
        message = json.loads(request.data)
        # print(message)
        # print(int(message["conversation"]))
        chat = Chat.objects.get(pk=int(message["conversation"]))
        Message.objects.create(sender=request.user, text=message["text"], ref_chat=chat)
        return Response({"ye":"ye"})

def dict_substitute (old_dict, new_dict):
    for key in old_dict:
        if type(old_dict[key]) is dict:
            dict_substitute(old_dict[key], new_dict[key])
        old_dict[key] = new_dict[key]