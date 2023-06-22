from django.contrib import admin
from .models import Category, Individual, Animal


class CategoryAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "label",
        "hp",
        "attack",
        "defense",
        "speed",
        "magic_attack",
        "magic_defense",
    )


class IndividualAdmin(admin.ModelAdmin):
    list_display = ("id", "category", "image", "score")


# Register your models here.
admin.site.register(Category, CategoryAdmin)
admin.site.register(Individual, IndividualAdmin)
admin.site.register(Animal)
