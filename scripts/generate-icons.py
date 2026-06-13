"""Generate Pogo Tunes branded icons and OG image."""
from PIL import Image, ImageDraw
import math, os

PURPLE = (108, 99, 255)
PINK = (255, 107, 157)
WHITE = (255, 255, 255, 255)
YELLOW = (255, 215, 0)

def gradient(draw, w, h):
    for y in range(h):
        t = y / h
        r = int(PURPLE[0]*(1-t) + PINK[0]*t)
        g = int(PURPLE[1]*(1-t) + PINK[1]*t)
        b = int(PURPLE[2]*(1-t) + PINK[2]*t)
        draw.line([(0,y),(w,y)], fill=(r,g,b))

def make_icon(size):
    img = Image.new("RGBA", (size,size))
    draw = ImageDraw.Draw(img)
    gradient(draw, size, size)
    r = int(size*0.42)
    cx = cy = size//2
    draw.ellipse([cx-r, cy-r, cx+r, cy+r], fill=WHITE)
    fs = int(size*0.38)
    try:
        from PIL import ImageFont
        font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", fs)
    except:
        font = ImageFont.load_default()
    b = draw.textbbox((0,0), "P", font=font)
    tx = (size - (b[2]-b[0]))//2 - b[0]
    ty = (size - (b[3]-b[1]))//2 - b[1]
    draw.text((tx, ty), "P", fill=PURPLE, font=font)
    return img

def make_og():
    w, h = 1200, 630
    img = Image.new("RGBA", (w, h))
    draw = ImageDraw.Draw(img)
    gradient(draw, w, h)
    r = int(h*0.3)
    cx, cy = w//2, h//2
    draw.ellipse([cx-r, cy-r, cx+r, cy+r], fill=WHITE)
    fs = int(h*0.35)
    try:
        from PIL import ImageFont
        font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", fs)
    except:
        font = ImageFont.load_default()
    b = draw.textbbox((0,0), "P", font=font)
    tx = cx - (b[2]-b[0])//2 - b[0]
    ty = cy - (b[3]-b[1])//2 - b[1]
    draw.text((tx, ty), "P", fill=PURPLE, font=font)
    fs2 = int(h*0.08)
    try:
        font2 = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", fs2)
    except:
        font2 = ImageFont.load_default()
    b2 = draw.textbbox((0,0), "Pogo Tunes - Learn & Play!", font=font2)
    tx2 = (w - (b2[2]-b2[0]))//2 - b2[0]
    ty2 = cy + r + int(h*0.05)
    draw.text((tx2, ty2), "Pogo Tunes - Learn & Play!", fill=WHITE, font=font2)
    return img

def main():
    d = os.path.join(os.path.dirname(os.path.dirname(__file__)), "public")
    os.makedirs(d, exist_ok=True)
    for name, sz in {"icon-192.png": 192, "icon-512.png": 512}.items():
        make_icon(sz).save(os.path.join(d, name), "PNG")
        print(f"{name} ({sz}x{sz})")
    make_icon(48).save(os.path.join(d, "favicon.ico"), "ICO", sizes=[(48,48)])
    print("favicon.ico")
    make_icon(180).save(os.path.join(d, "apple-touch-icon.png"), "PNG")
    print("apple-touch-icon.png")
    make_og().save(os.path.join(d, "og-image.png"), "PNG")
    print("og-image.png (1200x630)")

if __name__ == "__main__":
    main()
