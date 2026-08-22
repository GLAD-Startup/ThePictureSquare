import os
from PIL import Image, ImageFilter
import numpy as np

src_path = r"C:\Users\imsto\.gemini\antigravity-ide\brain\03e28508-8545-45c5-880d-04554aa19723\.user_uploaded\media_1787390583723.png"
raw_img = Image.open(src_path).convert("RGBA")
raw_arr = np.array(raw_img, dtype=np.float32)

def extract_alpha_matte(region_arr, bg_color=(255.0, 255.0, 255.0)):
    """
    Computes smooth unmultiplied RGB and alpha from white background.
    """
    r, g, b = region_arr[:,:,0], region_arr[:,:,1], region_arr[:,:,2]
    
    # Distance from white in RGB
    diff_r = 255.0 - r
    diff_g = 255.0 - g
    diff_b = 255.0 - b
    
    # Alpha proportional to max difference from white
    max_diff = np.maximum(diff_r, np.maximum(diff_g, diff_b))
    
    # Threshold for pure white background
    alpha = np.clip((max_diff - 10.0) / (255.0 - 10.0) * 1.08, 0.0, 1.0)
    
    # Unmultiply color where alpha > 0
    safe_alpha = np.where(alpha > 0.01, alpha, 1.0)
    out_r = np.clip((r - 255.0 * (1.0 - alpha)) / safe_alpha, 0.0, 255.0)
    out_g = np.clip((g - 255.0 * (1.0 - alpha)) / safe_alpha, 0.0, 255.0)
    out_b = np.clip((b - 255.0 * (1.0 - alpha)) / safe_alpha, 0.0, 255.0)
    
    out_rgba = np.zeros_like(region_arr, dtype=np.uint8)
    out_rgba[:,:,0] = out_r.astype(np.uint8)
    out_rgba[:,:,1] = out_g.astype(np.uint8)
    out_rgba[:,:,2] = out_b.astype(np.uint8)
    out_rgba[:,:,3] = (alpha * 255.0).astype(np.uint8)
    
    return Image.fromarray(out_rgba, mode="RGBA")

# 1. Standalone Monogram Emblem (Crop y: 70 to 290, x: 270 to 460)
emblem_raw = raw_arr[70:290, 270:460, :]
emblem_img = extract_alpha_matte(emblem_raw)
# Autocrop transparent borders
bbox = emblem_img.getbbox()
if bbox:
    emblem_img = emblem_img.crop(bbox)

# Add small padding to make square
max_dim = max(emblem_img.width, emblem_img.height)
pad_dim = int(max_dim * 1.15)
square_emblem = Image.new("RGBA", (pad_dim, pad_dim), (0, 0, 0, 0))
offset_x = (pad_dim - emblem_img.width) // 2
offset_y = (pad_dim - emblem_img.height) // 2
square_emblem.paste(emblem_img, (offset_x, offset_y), emblem_img)

os.makedirs("public/images", exist_ok=True)
emblem_img.save("public/images/logo-emblem.png")
square_emblem.save("public/images/logo-emblem-square.png")

# 2. Full Logo (Emblem + "THE PICTURE SQUARE", crop y: 70 to 360, x: 35 to 690)
full_raw = raw_arr[70:360, 35:690, :]
full_img = extract_alpha_matte(full_raw)
f_bbox = full_img.getbbox()
if f_bbox:
    full_img = full_img.crop(f_bbox)

# Add subtle margin
full_canvas = Image.new("RGBA", (full_img.width + 20, full_img.height + 20), (0, 0, 0, 0))
full_canvas.paste(full_img, (10, 10), full_img)
full_canvas.save("public/images/logo.png")

# 3. Light version for dark background (Invert/lighten the text part to #F6F4EE)
full_arr = np.array(full_canvas, dtype=np.float32)
# Pixels in text region (roughly bottom 30%) with dark grey color:
h = full_canvas.height
text_y_start = int(h * 0.55)
# Find non-gold dark pixels in text region
r, g, b, a = full_arr[:,:,0], full_arr[:,:,1], full_arr[:,:,2], full_arr[:,:,3]
is_text = (np.arange(h)[:, None] >= text_y_start) & (a > 20) & (r < 90) & (g < 90) & (b < 90)

light_arr = full_arr.copy()
light_arr[is_text, 0] = 246.0 # #F6F4EE
light_arr[is_text, 1] = 244.0
light_arr[is_text, 2] = 238.0

light_img = Image.fromarray(light_arr.astype(np.uint8), mode="RGBA")
light_img.save("public/images/logo-light.png")

# 4. Favicon icons (16, 32, 48, 64, 180, 192, 512)
# Favicon on subtle warm background or transparent
fav_32 = square_emblem.resize((32, 32), Image.Resampling.LANCZOS)
fav_32.save("public/icon.png")

fav_180 = square_emblem.resize((180, 180), Image.Resampling.LANCZOS)
fav_180.save("public/apple-icon.png")

fav_192 = square_emblem.resize((192, 192), Image.Resampling.LANCZOS)
fav_192.save("public/icon-192.png")

fav_512 = square_emblem.resize((512, 512), Image.Resampling.LANCZOS)
fav_512.save("public/icon-512.png")

# Save multi-size favicon.ico
ico_sizes = [(16, 16), (32, 32), (48, 48), (64, 64)]
square_emblem.save("public/favicon.ico", format="ICO", sizes=ico_sizes)
square_emblem.save("src/app/favicon.ico", format="ICO", sizes=ico_sizes)

print("Generated assets:")
print("- public/images/logo.png", full_canvas.size)
print("- public/images/logo-light.png", light_img.size)
print("- public/images/logo-emblem.png", emblem_img.size)
print("- public/images/logo-emblem-square.png", square_emblem.size)
print("- public/favicon.ico")
print("- public/icon.png (32x32)")
print("- public/apple-icon.png (180x180)")
