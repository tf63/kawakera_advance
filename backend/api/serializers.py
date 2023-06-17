from rest_framework import serializers
from .models import Category, Individual



# class ProblemSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Problem
#         fields = "__all__"

# class RecordSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Record
#         fields = ['problem', 'correct', 'miss', 'time']
        
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"

class IndividualSerializer(serializers.ModelSerializer):
    class Meta:
        model = Individual
        fields = "__all__"

# class AnimalSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Animal
#         fields = "__all__"