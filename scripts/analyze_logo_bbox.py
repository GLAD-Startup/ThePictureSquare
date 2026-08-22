from PIL import Image
import numpy as np

src_path = r"C:\Users\imsto\.gemini\antigravity-ide\brain\03e28508-8545-45c5-880d-04554aa19723\.user_uploaded\media_1787390583723.png"
img = Image.open(src_path).convert("RGBA")
arr = np.array(img)

# White is background (e.g., > 240 in all RGB channels)
r, g, b, a = arr[:,:,0], arr[:,:,1], arr[:,:,2], arr[:,:,3]
# Non-white mask
is_foreground = (r < 240) | (g < 240) | (b < 240)

# Check vertical projection
v_proj = np.sum(is_foreground, axis=1)
for y, count in enumerate(v_proj):
    if count > 0:
        print(f"y={y}: foreground pixels = {count}")
