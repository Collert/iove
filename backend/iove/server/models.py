from django.contrib.auth.models import AbstractUser
from django.db import models
import datetime

# Create your models here.

class User(AbstractUser):
    matches = models.ManyToManyField("self", symmetrical=True, blank=True, db_constraint=False)
    likes = models.ManyToManyField("self", related_name="likers", symmetrical=False, blank=True, db_constraint=False)
    dislikes = models.ManyToManyField("self", related_name="dislikers", symmetrical=False, blank=True, db_constraint=False)
    age = models.IntegerField(null=True, blank=True)
    # Profile pic card
    pfp_url = models.TextField(default="", null=True, blank=True)
    pfp_transform_x = models.IntegerField(null=True, default=0, blank=True)
    pfp_transform_y = models.IntegerField(null=True, default=0, blank=True)
    pfp_transform_scale = models.IntegerField(null=True, default=0, blank=True)
    # Bio card
    bio_text = models.TextField(null=True, default=None, blank=True)
    bio_orientation = models.TextField(null=True, default=None, blank=True)
    bio_gender = models.TextField(null=True, default=None, blank=True)
    bio_pronouns = models.TextField(null=True, default=None, blank=True)
    bio_ethnicity = models.ManyToManyField("Ethnicity", blank=True, related_name="representatives")
    # bio_ethnicity = models.TextField(null=True, default=None, blank=True) # Something is telling me that storing all that data as plain text fields is a bad idea
    bio_languages = models.ManyToManyField("Language", blank=True, related_name="speakers")
    # bio_languages = models.TextField(null=True, default=None, blank=True)
    bio_education = models.TextField(null=True, default=None, blank=True)
    bio_religion = models.TextField(null=True, default=None, blank=True)
    bio_occupation = models.TextField(null=True, default=None, blank=True)
    bio_alcohol = models.BooleanField(null=True, default=None, blank=True)
    bio_smoke = models.BooleanField(null=True, default=None, blank=True)
    bio_cannabis = models.BooleanField(null=True, default=None, blank=True)
    bio_diet = models.TextField(null=True, default=None, blank=True)
    # Fav hobby card
    favourite_hobby = models.TextField(null=True, default=None, blank=True)
    # Code card
    code_text = models.TextField(null=True, default=None, blank=True)
    code_filename = models.TextField(null=True, default=None, blank=True)
    code_lang = models.TextField(null=True, default=None, blank=True)
    # Small card #1
    small_1_theme = models.TextField(null=True, default=None, blank=True)
    small_1_specific = models.TextField(null=True, default=None, blank=True)
    # Small card #2
    small_2_theme = models.TextField(null=True, default=None, blank=True)
    small_2_specific = models.TextField(null=True, default=None, blank=True)
    # Small card #3
    small_3_theme = models.TextField(null=True, default=None, blank=True)
    small_3_specific = models.TextField(null=True, default=None, blank=True)
    # Small card #4
    small_4_theme = models.TextField(null=True, default=None, blank=True)
    small_4_specific = models.TextField(null=True, default=None, blank=True)

    def jsonify(self):
        return ({
            # "matches":self.matches.all(),
            "id":self.id,# type: ignore
            "name":self.first_name,
            "age":self.age,
            "email":self.email,
            "bigCards":{
                "profilePicture":{
                    "image":self.pfp_url,
                    "transformX":self.pfp_transform_x,
                    "transformY":self.pfp_transform_y,
                    "transformScale":self.pfp_transform_scale,
                },
                "bio":self.bio_text,
                "vitals":{
                    "orientation":self.bio_orientation,
                    "gender":self.bio_gender,
                    "pronouns":self.bio_pronouns
                },
                "background":{
                    "ethnicity":{
                        "list":list_from_queryset(self.bio_ethnicity.all()),
                        "edits":[]
                    },
                    "languages":{
                        "list":list_from_queryset(self.bio_languages.all()),
                        "edits":[]
                    },
                    "education":self.bio_education,
                    "religion":self.bio_religion,
                    "occupation":self.bio_occupation
                },
                "lifestyle":{
                    "alcohol":self.bio_alcohol,
                    "weed":self.bio_cannabis,
                    "smoke":self.bio_smoke,
                    "diet":self.bio_diet
                },
                "favoriteHobby":self.favourite_hobby,
                "code":{
                    "code":self.code_text,
                    "filename":self.code_filename,
                    "language":self.code_lang
                }
            },
            "smallCards":{
                "card_1":{"id":1, "theme":self.small_1_theme, "prop":self.small_1_specific},
                "card_2":{"id":2, "theme":self.small_2_theme, "prop":self.small_2_specific},
                "card_3":{"id":3, "theme":self.small_3_theme, "prop":self.small_3_specific},
                "card_4":{"id":4, "theme":self.small_4_theme, "prop":self.small_4_specific}
            }
        })

class Chat(models.Model):
    participant_1 = models.ForeignKey("User", related_name="chats_1", on_delete=models.CASCADE)
    participant_2 = models.ForeignKey("User", related_name="chats_2", on_delete=models.CASCADE)

    def jsonify(self, request):
        messages = self.messages.all().order_by("-timestamp")# type: ignore
        if self.participant_1 == request.user:
            person = self.participant_2
        else:
            person = self.participant_1
        messages_list = list(map(lambda message: message.jsonify(request), messages))
        # print(messages_list)
        return ({
            "id":self.id,# type: ignore
            "person":{
                "name":person.first_name,
                "pfp":person.pfp_url
            },
            "messages":messages_list
        })

class Message(models.Model):
    sender = models.ForeignKey("User", related_name="messages", on_delete=models.CASCADE)
    text = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    ref_chat = models.ForeignKey("Chat", related_name="messages", on_delete=models.CASCADE)

    def jsonify(self, request):
        return({
            "incoming":self.sender != request.user,
            "text":self.text,
            "timestamp":self.timestamp.timestamp()
        })

class Ethnicity(models.Model):
    name = models.CharField(max_length=20)

    def __str__(self):
        return self.name

class Language(models.Model):
    name = models.CharField(max_length=20)

    def __str__(self):
        return self.name


def list_from_queryset(queryset):
    list = []
    for item in queryset:
        list.append(item.name)
    return list