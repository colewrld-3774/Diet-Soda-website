import urllib.request
import urllib.parse
import json
import re
import os

def search_duckduckgo_image(query):
    req = urllib.request.Request(f'https://html.duckduckgo.com/html/?q={urllib.parse.quote(query)}')
    req.add_header('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)')
    try:
        html = urllib.request.urlopen(req).read().decode('utf-8')
        matches = re.findall(r'vqd=([\d-]+)', html)
        if not matches:
            return None
        vqd = matches[0]
        url = f"https://duckduckgo.com/i.js?q={urllib.parse.quote(query)}&o=json&vqd={vqd}"
        req_json = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        res_json = urllib.request.urlopen(req_json).read().decode('utf-8')
        data = json.loads(res_json)
        for res in data.get('results', []):
            if res['image'].endswith('.png') or res['image'].endswith('.jpg') or res['image'].endswith('.jpeg'):
                return res['image']
    except Exception as e:
        print(f"Error searching {query}: {e}")
    return None

queries = {
    "stoney_can.png": "Stoney Tangawizi can isolated",
    "mountain_dew_can.png": "Mountain Dew can transparent png",
    "mirinda_pineapple_can.png": "Mirinda Pineapple can",
    "mirinda_apple_can.png": "Mirinda Apple green can",
    "pineapple.png": "pineapple fruit isolated png",
    "apple.png": "green apple fruit isolated png",
    "ginger.png": "ginger root isolated png",
    "orange.png": "orange fruit isolated png",
    "stoney_texture.jpg": "Stoney Tangawizi label flat texture",
    "mountain_dew_texture.jpg": "Mountain Dew can label flat texture",
    "mirinda_pineapple_texture.jpg": "Mirinda Pineapple can label flat texture",
    "mirinda_apple_texture.jpg": "Mirinda Apple can label flat texture"
}

os.makedirs("assets", exist_ok=True)

for filename, query in queries.items():
    if not os.path.exists(f"assets/{filename}"):
        print(f"Searching for {filename}...")
        url = search_duckduckgo_image(query)
        if url:
            try:
                urllib.request.urlretrieve(url, f"assets/{filename}")
                print(f"Downloaded {filename}")
            except Exception as e:
                print(f"Failed to download {filename} from {url}: {e}")
        else:
            print(f"Could not find {filename}")
