from PIL import Image
import numpy as np

src_path = r"C:\Users\imsto\Desktop\ThePictureSquare\scripts\inspect_logo.py"
img = Image.open(r"C:\Users\imsto\.gemini\antigravity-ide\brain\03e28508-8545-45c5-880d-04554aa19723\.user_uploaded\media_1787390583723.png").convert("RGBA")
arr = np.array(img)

# Bounding box of emblem
emblem_region = arr[75:285, :, :]
emblem_fg = (emblem_region[:,:,0] < 240) | (emblem_region[:,:,1] < 240) | (emblem_region[:,:,2] < 240)
y_indices, x_indices = np.where(emblem_fg)
print(f"Emblem x: {x_indices.min()} to {x_indices.max()}, y: {75 + y_indices.min()} to {75 + y_indices.max()}")

# Sample colors of emblem
emblem_pixels = emblem_region[emblem_fg]
mean_emblem_color = np.median(emblem_pixels, axis=0)
print(f"Median emblem color (RGBA): {mean_emblem_color}")

# Text region (THE PICTURE SQUARE)
text_region = arr[310:360, :, :]
text_fg = (text_region[:,:,0] < 240) | (text_region[:,:,1] < 240) | (text_region[:,:,2] < 240)
ty_indices, tx_indices = np.where(text_fg)
print(f"Text x: {tx_indices.min()} to {tx_indices.max()}, y: {310 + ty_indices.min()} to {310 + ty_indices.max()}")

text_pixels = text_region[text_fg]
mean_text_color = np.median(text_pixels, axis=0)
print(f"Median text color (RGBA): {mean_text_color}")
