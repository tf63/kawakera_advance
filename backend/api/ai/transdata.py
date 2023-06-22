import numpy as np
from PIL import Image
import io


def np2binary(arr):
    binary_data = arr.tobytes()
    return binary_data


def binary2np(binary_data):
    arr = np.frombuffer(binary_data, dtype=np.uint8)
    return arr


def np2image(arr):
    image = Image.fromarray(arr)
    return image


def binary2image(data):
    image = Image.open(io.BytesIO(data))
    return image


def image2binary(image):
    buffer = io.BytesIO()
    image.save(buffer, format="PNG")
    binary_data = buffer.getvalue()
    return binary_data
