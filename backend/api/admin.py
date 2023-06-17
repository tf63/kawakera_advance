from django.contrib import admin
from .models import Category, Individual

class CategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'label', 'hp', 'attack', 'defence', 'speed', 'magic_attack', 'magic_defence')

# Register your models here.
admin.site.register(Category, CategoryAdmin)
admin.site.register(Individual)


