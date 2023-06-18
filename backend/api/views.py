from django.shortcuts import render
from django.http import JsonResponse
from random import choice
from string import ascii_lowercase

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Category, Individual
from .serializers import CategorySerializer, IndividualSerializer

from .utils import convert_to_file
import base64

# from .ai.segmentation import create_segmentation
# from .ai.classifier import image_classification

# from .ai.segmentation import create_segmentation
# from .ai.chat import chat

# def index(request):
#     return render(request, "index.html")


class ImageAPIView(APIView):
    def post(self, request):
        data = request.data
        # 画像の読み込み
        image = data["image"]

        # 画像を HuggingFace API に渡して動物名と切り抜き画像を取得
        # score, label = image_classification(image)
        # image = create_segmentation(image)

        # ダミー
        score = 70
        label = "bird"
        image = data["image"]

        # 動物名が既出の場合ステータス，生態を ChatGPTを使って取得しDBに保存
        exists = Category.objects.filter(label=label).exists()
        if not exists:
            data_category = {"label": label}
            # ChatGPTに動物名を渡してステータス，生態を取得
            # information = chat(label)
            # data_category ← information
            # ダミー
            information = {
                "hp": 50,
                "attack": 50,
                "defence": 50,
                "speed": 50,
                "magic_attack": 50,
                "magic_defence": 50,
            }

            data_category.update(information)

            serializer_category = CategorySerializer(data=data_category)
            if serializer_category.is_valid():
                serializer_category.save()
            else:
                return Response(
                    serializer_category.errors, status=status.HTTP_400_BAD_REQUEST
                )

        category = Category.objects.get(label=label)
        image_file = convert_to_file(image)
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
                }
            )
        else:
            return Response(
                serializer_individual.errors, status=status.HTTP_400_BAD_REQUEST
            )


class CategoryAPIView(APIView):
    def get(self, request):
        response_data = []
        try:
            label = request.GET.get("label")
            # カテゴリ情報
            category = Category.objects.all()
            individuals = Individual.objects.all()

            if label:
                category = category.filter(label=label)
                # print(category[0].hp)
                individuals = individuals.filter(category_id=category.first().id)

            serializer_category = CategorySerializer(category, many=True)
            serializer_individual = IndividualSerializer(individuals, many=True)

            response_data.append({"category": serializer_category.data})
            response_data.append({"individuals": serializer_individual.data})

            # # 全カテゴリーのトップスコアの画像
            # top_images = {}
            # for category in categories:
            #     try:
            #         individual = category.individual_set.order_by(
            #             "-score", "id"
            #         ).first()
            #     except individual.DoesNotExist:
            #         continue
            #     if individual and individual.image:
            #         serializer_individual = IndividualSerializer(individual)
            #         # base64_image = base64.b16encode(image_data).decode("utf-8")
            #         top_images[category.id] = {
            #             "label": category.label,
            #             "image": serializer_individual.data["image"],
            #         }
            # response_data.append({"top_images": top_images})

            # # 最近
            # latest_individuals = Individual.objects.order_by("-id")[:5]
            # serializer_individual = IndividualSerializer(latest_individuals, many=True)
            # response_data.append({"latest_individuals": serializer_individual.data})

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
