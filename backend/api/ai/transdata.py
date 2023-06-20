import numpy as np


def np2binary(arr):
    binary_data = arr.tobytes()
    return binary_data


def binary2np(binary_data):
    arr = np.frombuffer(binary_data, dtype=np.uint8)
    return arr
