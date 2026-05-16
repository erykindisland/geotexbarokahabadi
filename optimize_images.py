from PIL import Image
import os
import glob

assets_dir = 'Assets/'
# Images to convert
hero_images = [
    'hero_banner.png',
    'proyek_pertamanan.png',
    'proyek_kolam.png',
    'proyek_longsor.png'
]

for img_name in hero_images:
    img_path = os.path.join(assets_dir, img_name)
    if os.path.exists(img_path):
        try:
            img = Image.open(img_path)
            webp_path = os.path.join(assets_dir, img_name.split('.')[0] + '.webp')
            img.save(webp_path, 'WEBP', quality=80)
            print(f"Converted {img_name} to WebP -> {webp_path}")
        except Exception as e:
            print(f"Error converting {img_name}: {e}")
    else:
        print(f"File not found: {img_path}")
