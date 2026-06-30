from pathlib import Path
from PIL import Image, ImageDraw
import math

assets_dir = Path('assets')
assets_dir.mkdir(exist_ok=True)

# Generate cake image
size = (512, 512)
img = Image.new('RGBA', size, (0, 0, 0, 0))
d = ImageDraw.Draw(img)

# background circle
for i, alpha in enumerate([18, 12, 6]):
    radius = 220 - i * 30
    d.ellipse(
        [(size[0] // 2 - radius, size[1] // 2 - radius), (size[0] // 2 + radius, size[1] // 2 + radius)],
        fill=(250, 204, 21, alpha)
    )

# cake base layers
layer_colors = [(35, 45, 70, 255), (58, 71, 99, 255), (85, 102, 141, 255)]
for i, color in enumerate(layer_colors):
    y = 300 - i * 40
    d.rounded_rectangle([90, y, 422, y + 74], 32, fill=color, outline=(255, 255, 255, 60), width=2)

# frosting drip
for x in range(112, 402, 32):
    d.ellipse([x, 240, x + 44, 296], fill=(246, 213, 77, 220))

d.rectangle([100, 248, 420, 300], fill=(246, 213, 77, 220))

# candles
for x in (180, 244, 308):
    d.rectangle([x, 168, x + 12, 244], fill=(247, 235, 150, 255), outline=(255, 255, 255, 150))
    d.ellipse([x - 4, 148, x + 16, 164], fill=(255, 235, 145, 255))
    d.polygon([(x + 6, 138), (x + 2, 150), (x + 10, 150)], fill=(255, 245, 197, 255))

# candle glow details
for x in (180, 244, 308):
    d.ellipse([x - 10, 136, x + 22, 164], outline=(255, 255, 255, 80), width=2)

# sparkles
sparkles = [(148, 192), (372, 220), (268, 256), (170, 320), (326, 312)]
for cx, cy in sparkles:
    d.ellipse([cx - 6, cy - 6, cx + 6, cy + 6], fill=(255, 255, 255, 180))
    d.line((cx, cy - 14, cx, cy + 14), fill=(255, 255, 255, 110), width=2)
    d.line((cx - 14, cy, cx + 14, cy), fill=(255, 255, 255, 110), width=2)

img.save(assets_dir / 'cake.png')
print('Generated assets/cake.png')

# Generate background music mp3
try:
    import lameenc
    import wave
    import struct

    sample_rate = 44100
    duration = 24
    frequency = 440.0
    amplitude = 0.26
    samples = []
    for n in range(sample_rate * duration):
        t = n / sample_rate
        note = 0.5 * math.sin(2 * math.pi * frequency * t)
        note += 0.26 * math.sin(2 * math.pi * (frequency * 1.5) * t)
        note += 0.18 * math.sin(2 * math.pi * (frequency * 2.25) * t)
        note *= amplitude
        samples.append(int(note * 32767))

    encoder = lameenc.Encoder()
    encoder.set_bit_rate(128)
    encoder.set_in_sample_rate(sample_rate)
    encoder.set_channels(1)
    encoder.set_quality(2)
    data = b''.join(struct.pack('<h', sample) for sample in samples)
    mp3_data = encoder.encode(data) + encoder.flush()
    with open(assets_dir / 'music.mp3', 'wb') as f:
        f.write(mp3_data)
    print('Generated assets/music.mp3')
except ModuleNotFoundError:
    print('lameenc not available; skipping mp3 generation')
