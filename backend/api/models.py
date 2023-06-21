from django.db import models
from django.contrib.postgres.fields import ArrayField


# class Problem(models.Model):
#     problem_name = models.CharField(max_length=100, default="")
#     language = models.CharField(max_length=100, choices=LANGUAGE_CHOICES)
#     length = models.CharField(max_length=10, choices=LENGTH_CHOICES)
#     words = ArrayField(models.CharField(max_length=200), default=list)
#     tab_counts = ArrayField(models.IntegerField(), default=list)

#     def __str__(self):
#         return f"{self.problem_name}, Lang: {self.language}, length: {self.length}"


# class Record(models.Model):
#     problem = models.ForeignKey(Problem, on_delete=models.CASCADE)
#     correct = models.PositiveIntegerField()
#     miss = models.PositiveIntegerField()
#     time = models.PositiveIntegerField()

#     def __str__(self):
#         return f"Record {self.id}"


class Category(models.Model):
    label = models.CharField(max_length=100, default="")
    hp = models.PositiveBigIntegerField()
    attack = models.PositiveBigIntegerField()
    defence = models.PositiveBigIntegerField()
    speed = models.PositiveBigIntegerField()
    magic_attack = models.PositiveBigIntegerField()
    magic_defence = models.PositiveBigIntegerField()
    type = models.CharField(max_length=100, default="")
    trivia = models.TextField()
    ecology = models.TextField()

    def __str__(self):
        return f"{self.label}"


class Individual(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    image = models.ImageField(upload_to="input_images")
    score = models.PositiveBigIntegerField(default=0)

    def __str__(self):
        return f"{self.score}"


class Animal(models.Model):
    name = models.CharField(max_length=100, default="default_image.jpg")
    image = models.ImageField(upload_to="tests/animals/", default="dog.jpg")

    def __str__(self):
        return f"{self.name}"
