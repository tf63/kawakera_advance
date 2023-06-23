from django.shortcuts import render
from django.http import JsonResponse
from random import choice
from string import ascii_lowercase
from os.path import dirname, abspath
import sys
from PIL import Image

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Category, Individual, Animal
from .serializers import CategorySerializer, IndividualSerializer, AnimalSerializer
from django.core.files.base import ContentFile
from django.db.models import Max

from .utils import convert_to_file, resize_image
import base64
import random

parent_dir = dirname(abspath(__file__))
if parent_dir not in sys.path:
    sys.path.append(parent_dir)
from ai import *


class ImageAPIView(APIView):
    def post(self, request):
        image_file = request.FILES["image"]
        binary_data = image_file.read()

        # 画像を HuggingFace API に渡して動物名と切り抜き画像を取得
        status_classification, score, label = image_classification(binary_data)
        print(f"classification_status: {status_classification}")
        if status_classification != 200:
            return Response(
                {
                    "message": "Image classification failed.",
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

        print("score, label = ", score, label)

        # 画像をセグメントする
        status_segmentation, image_file = create_segmentation(binary_data)
        print(f"segment_status: {status_segmentation}")
        if status_segmentation != 200:
            return Response(
                {
                    "message": "Segmentation failed.",
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

        # 画像のリサイズ
        image_file = resize_image(image_file, 250, 239)
        image_file = image2binary(image_file)

        # 動物名が既出の場合ステータス，生態を ChatGPTを使って取得しDBに保存
        exists = Category.objects.filter(label=label).exists()
        if not exists:
            data_category = {"label": label}
            # ChatGPTに動物名を渡してステータス，生態を取得
            json_ok, information = chat_knowledge(label)
            if not json_ok:
                return Response(
                    {
                        "message": "JSON decode failed.",
                    },
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR,
                )

            data_category.update(information)
            print(data_category)

            serializer_category = CategorySerializer(data=data_category)
            if serializer_category.is_valid():
                serializer_category.save()
            else:
                return Response(
                    serializer_category.errors, status=status.HTTP_400_BAD_REQUEST
                )

        category = Category.objects.get(label=label)
        image_file = ContentFile(image_file, name=f"{label}" + ".png")
        data_indvidual = {"category": category.pk, "score": score, "image": image_file}
        print(data_indvidual)
        serializer_individual = IndividualSerializer(data=data_indvidual)

        print("json ----------------------------------------")
        serializer_category = CategorySerializer(category)
        if serializer_individual.is_valid():
            serializer_individual.save()
            return Response(
                {
                    "message": "Record created successfully.",
                    "category": serializer_category.data,
                    "individual": serializer_individual.data,
                },
                status=status.HTTP_200_OK,
            )
        else:
            return Response(
                serializer_individual.errors, status=status.HTTP_400_BAD_REQUEST
            )


class CategoryAPIView(APIView):
    def get(self, request):
        response_data = {}
        try:
            animal_id = request.GET.get("id")
            # カテゴリ情報
            categories = Category.objects.all()
            individuals = Individual.objects.all()

            # ラベルが指定されていた場合
            if animal_id:
                categories = categories.filter(id=animal_id)
                # print(category[0].hp)

                individuals = individuals.filter(
                    category_id=categories.first().id
                ).order_by("-score")

                serializer_category = CategorySerializer(categories, many=True)
                serializer_individual = IndividualSerializer(individuals, many=True)

                response_data["category"] = serializer_category.data[0]
                response_data["individuals"] = serializer_individual.data
            # ラベルが指定されていなかった場合
            else:
                # 全カテゴリーのトップスコアの画像
                top_images = []
                for category in categories:
                    try:
                        individual = category.individual_set.order_by(
                            "-score", "id"
                        ).first()
                    except individual.DoesNotExist:
                        continue
                    if individual and individual.image:
                        serializer_individual = IndividualSerializer(individual)
                        # base64_image = base64.b16encode(image_data).decode("utf-8")
                        top_images.append(
                            {
                                "id": category.id,
                                "label": category.label,
                                "label_ja": category.label_ja,
                                "image": serializer_individual.data["image"],
                            }
                        )
                response_data["top_images"] = top_images

                # 最近
                latest_individuals = Individual.objects.order_by("-id")[:5]
                serializer_individual = IndividualSerializer(
                    latest_individuals, many=True
                )
                latest_list = serializer_individual.data  # list
                for latest_individual in latest_list:
                    latest_individual["label"] = (
                        Category.objects.all()
                        .filter(id=latest_individual["category"])
                        .first()
                        .label
                    )
                    latest_individual["label_ja"] = (
                        Category.objects.all()
                        .filter(id=latest_individual["category"])
                        .first()
                        .label_ja
                    )

                response_data["latest_individuals"] = serializer_individual.data

            return Response(response_data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class TriviaAPIView(APIView):
    def get(self, request):
        response_data = {}
        ten_animals = []
        try:
            # 保存されているカテゴリidの最大値
            max_id = Category.objects.aggregate(Max("id"))["id__max"]
            # 1からmax_idのうちからランダムに10個取ってくる
            ten_ids = random.sample(range(1, max_id), 10)

            categories = Category.objects.all()
            for id in ten_ids:
                label_trivia = {}
                label_trivia["label"] = categories.filter(id=id).first().label
                label_trivia["trivia"] = categories.filter(id=id).first().trivia
                ten_animals.append(label_trivia)

            response_data["trivia"] = ten_animals
            return Response(response_data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


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
