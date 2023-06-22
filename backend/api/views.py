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

from .utils import convert_to_file
import base64

parent_dir = dirname(abspath(__file__))
if parent_dir not in sys.path:
    sys.path.append(parent_dir)
from ai import *

# from .ai.segmentation import create_segmentation
# from .ai.classifier import image_classification

# from .ai.segmentation import create_segmentation
# from .ai.chat import chat

# def index(request):
#     return render(request, "index.html")S


class ImageAPIView(APIView):
    def post(self, request):
        # data = request.data
        # image_file = data["image"]
        image_file = request.FILES["image"]
        binary_data = image_file.read()
        # image = binary2image(binary_data)
        # image_file = image.convert("RGB")
        print(type(image_file))
        # image_file = request.FILE["image"]
        # print(data)
        # image = binary2image(data["image"])

        # print(type(image))
        # image = data
        # 画像をnumpyからバイナリに変換する
        # image = np2binary(data)
        # # 画像を HuggingFace API に渡して動物名と切り抜き画像を取得
        score, label = image_classification(binary_data)
        print(score, label)
        image_file = create_segmentation(binary_data)

        max_width = 500
        max_height = 500
        width, height = image_file.size
        resize_ratio = min(max_width / width, max_height / height)
        new_width = int(width * resize_ratio)
        new_height = int(height * resize_ratio)
        image_file = image_file.resize((new_width, new_height))
        image_file = image2binary(image_file)
        print(type(image_file))

        # score = 90
        # label = "dog"
        # image = data["image"]

        # 動物名が既出の場合ステータス，生態を ChatGPTを使って取得しDBに保存
        exists = Category.objects.filter(label=label).exists()
        if not exists:
            #
            data_category = {"label": label}
            # ChatGPTに動物名を渡してステータス，生態を取得
            information = chat_knowledge(label)
            print(information)
            # data_category ← information
            # ダミー
            # information = {
            #     "trivia": "人よりも大きい犬がいる",
            #     "echology": "人に飼われていることが多い",
            #     "hp": 50,
            #     "attack": 50,
            #     "defence": 50,
            #     "speed": 50,
            #     "magic_attack": 50,
            #     "magic_defence": 50,
            # }
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
        image_file = ContentFile(image_file, name="temp." + "png")
        # image_file = convert_to_file(image)
        data_indvidual = {"category": category.pk, "score": score, "image": image_file}
        serializer_individual = IndividualSerializer(data=data_indvidual)

        serializer_category = CategorySerializer(category)
        if serializer_individual.is_valid():
            serializer_individual.save()
            # return Response({"message": "Record created successfully."})
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
                                "image": serializer_individual.data["image"],
                            }
                        )
                response_data["top_images"] = top_images

                # 最近
                latest_individuals = Individual.objects.order_by("-id")[:5]
                serializer_individual = IndividualSerializer(
                    latest_individuals, many=True
                )
                response_data["latest_individuals"] = serializer_individual.data

            # # 特定のidを持つカテゴリのレコード
            # # ---------------------------------------------------------------------------
            # id = 15
            # # ---------------------------------------------------------------------------
            # animals = {}
            # individuals = Individual.objects.filter(category_id=id).order_by("-score")
            # for individual in individuals:
            #     serializer_individual = IndividualSerializer(individual)
            #     animals[individual.id] = {
            #         "image": serializer_individual.data["image"],
            #         "score": serializer_individual.data["score"],
            #     }
            # response_data.append({"individuals": animals})

            return Response(response_data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
        # ---------------------------------------------------------------------------

        # try:
        #     # idの降順で最新の30件を取得
        #     queryset = Category.objects.order_by("-id")[:30]
        #     serializer = CategorySerializer(queryset, many=True)

        #     return Response(serializer.data)
        # except Exception as e:
        #     return Response(
        #         {"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
        #     )


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
