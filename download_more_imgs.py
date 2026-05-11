import urllib.request
import re
import ssl
import os

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

url = 'https://www.primageotex.co.id/'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
html = urllib.request.urlopen(req, context=ctx).read().decode('utf-8')

assets_dir = 'Assets'
downloads = {}

# We look for more product images
images = set(re.findall(r'<img[^>]+src="([^">]+)"', html))
for img in images:
    img_url = img if img.startswith('http') else url.rstrip('/') + '/' + img.lstrip('/')
    if 'geocomposite' in img_url.lower(): downloads[img_url] = 'geocomposite.jpg'
    if 'plastik' in img_url.lower() or 'cor' in img_url.lower() and 'plastik' in img_url.lower(): downloads[img_url] = 'plastik_cor.jpg'
    if 'vertikal' in img_url.lower() or 'garden' in img_url.lower(): downloads[img_url] = 'vertical_garden.jpg'

for img_url, filename in downloads.items():
    img_req = urllib.request.Request(img_url.replace(' ', '%20'), headers={'User-Agent': 'Mozilla/5.0'})
    try:
        content = urllib.request.urlopen(img_req, context=ctx).read()
        with open(os.path.join(assets_dir, filename), 'wb') as f:
            f.write(content)
        print(f"Downloaded {filename}")
    except Exception as e:
        print(f"Error downloading {filename} from {img_url}: {e}")
