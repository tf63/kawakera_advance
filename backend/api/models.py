from django.db import models
from django.contrib.postgres.fields import ArrayField
from .types import LANGUAGE_CHOICES, LENGTH_CHOICES


class Problem(models.Model):
    problem_name = models.CharField(max_length=100, default="")
    language = models.CharField(max_length=100, choices=LANGUAGE_CHOICES)
    length = models.CharField(max_length=10, choices=LENGTH_CHOICES)
    words = ArrayField(models.CharField(max_length=200), default=list)
    tab_counts = ArrayField(models.IntegerField(), default=list)

    def __str__(self):
        return f"{self.problem_name}, Lang: {self.language}, length: {self.length}"


class Record(models.Model):
    problem = models.ForeignKey(Problem, on_delete=models.CASCADE)
    correct = models.PositiveIntegerField()
    miss = models.PositiveIntegerField()
    time = models.PositiveIntegerField()

    def __str__(self):
        return f"Record {self.id}"
    
    
class Animal(models.Model):
    name = models.CharField(max_length=100, default="")
    
    def __str__(self):
        return f"{self.name}"
