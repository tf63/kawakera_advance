from django.shortcuts import render
from django.http import JsonResponse
from random import choice
from string import ascii_lowercase

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Problem, Record, Animal
from .serializers import ProblemSerializer, RecordSerializer, AnimalSerializer


class ProblemAPIView(APIView):
    def get(self, request):
        try:
            lang = request.GET.get("language")
            length = request.GET.get("length")
            queryset = Problem.objects.all()

            if lang:
                queryset = queryset.filter(language=lang)

            if length:
                queryset = queryset.filter(length=length)

            serializer = ProblemSerializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

        except Exception as e:
            return Response(
                {"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class RecordAPIView(APIView):
    def get(self, request):
        try:
            # idの降順で最新の30件を取得
            queryset = Record.objects.order_by("-id")[:30]
            serializer = RecordSerializer(queryset, many=True)

            return Response(serializer.data)
        except Exception as e:
            return Response(
                {"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def post(self, request):
        data = request.data

        serializer = RecordSerializer(data=data)
        if serializer.is_valid():
            # Save the record
            record = serializer.save()
            return Response({"message": "Record created successfully."})
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


def index(request):
    return render(request, "index.html")


class AnimalAPIView(APIView):
    def get(self, request):
        try:
            # idの降順で最新の30件を取得
            queryset = Animal.objects.order_by("-id")[:30]
            serializer = AnimalSerializer(queryset, many=True)

            return Response(serializer.data)
        except Exception as e:
            return Response(
                {"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def post(self, request):
        data = request.data

        serializer = AnimalSerializer(data=data)
        if serializer.is_valid():
            # Save the record
            record = serializer.save()
            return Response({"message": "Record created successfully."})
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
