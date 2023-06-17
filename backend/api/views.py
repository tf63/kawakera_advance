from django.shortcuts import render
from django.http import JsonResponse
from random import choice
from string import ascii_lowercase

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Category, Individual
from .serializers import CategorySerializer, IndividualSerializer

# def index(request):
#     return render(request, "index.html")
class ImageAPIView(APIView):
    def post(self, request):
        data = request.data
        serializer_category = CategorySerializer(data=data)
        
        if serializer_category.is_valid():
            # Save the record
            record_category = serializer_category.save()            
        else:
            return Response(serializer_category.errors, status=status.HTTP_400_BAD_REQUEST)
        
        data_indvidual = {
                                "individual":15, 
                                "score": 90
                                }
        serializer_individual = IndividualSerializer(data=data_indvidual)
        
        if serializer_individual.is_valid():
            record_individual = serializer_individual.save()
        # return Response(serializer_category.data)
            return Response({"message": "Record created successfully."})
        else:
            return Response(serializer_individual.errors, status=status.HTTP_400_BAD_REQUEST)
        
        
class CategoryAPIView(APIView):
    def get(self, request):
        try:
            # idの降順で最新の30件を取得
            queryset = Category.objects.order_by("-id")[:30]
            serializer = CategorySerializer(queryset, many=True)

            return Response(serializer.data)
        except Exception as e:
            return Response(
                {"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

