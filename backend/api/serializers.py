from rest_framework import serializers
from .models import Problem, Record


class ProblemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Problem
        fields = "__all__"

class RecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = Record
        fields = ['problem', 'correct', 'miss', 'time']