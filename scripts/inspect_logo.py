import os
from PIL import Image, ImageChops, ImageFilter
import numpy as np

src_path = r"C:\Users\imsto\.gemini\antigravity-ide\brain\03e28508-8545-45c5-880d-04554aa19723\.user_uploaded\media_1787390583723.png"
img = Image.open(src_path).convert("RGBA")
print(f"Original image size: {img.size}")

# Let's inspect the background color (around corners)
corners = [
    img.getpixel((0, 0)),
    img.getpixel((img.width - 1, 0)),
    img.getpixel((0, img.height - 1)),
    img.getpixel((img.width - 1, img.height - 1))
]
print("Corners:", corners)
