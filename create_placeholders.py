"""
Placeholder Image Generator
This script creates placeholder images for the gallery section.
You can replace these with your actual images later.
"""

from PIL import Image, ImageDraw, ImageFont
import os

# Create static/images directory if it doesn't exist
images_dir = 'static/images'
os.makedirs(images_dir, exist_ok=True)

def create_placeholder(filename, text, size=(800, 800), bg_color=(0, 40, 50), text_color=(0, 217, 255)):
    """Create a placeholder image with text"""
    img = Image.new('RGB', size, bg_color)
    draw = ImageDraw.Draw(img)
    
    # Try to use a nice font, fall back to default if not available
    try:
        font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 60)
        small_font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 30)
    except:
        font = ImageFont.load_default()
        small_font = ImageFont.load_default()
    
    # Draw text in center
    text_bbox = draw.textbbox((0, 0), text, font=font)
    text_width = text_bbox[2] - text_bbox[0]
    text_height = text_bbox[3] - text_bbox[1]
    
    position = ((size[0] - text_width) // 2, (size[1] - text_height) // 2 - 50)
    draw.text(position, text, fill=text_color, font=font)
    
    # Draw size info
    size_text = f"{size[0]}x{size[1]}"
    size_bbox = draw.textbbox((0, 0), size_text, font=small_font)
    size_width = size_bbox[2] - size_bbox[0]
    size_position = ((size[0] - size_width) // 2, (size[1] // 2) + 50)
    draw.text(size_position, size_text, fill=(100, 200, 220), font=small_font)
    
    # Draw decorative circle
    circle_radius = 100
    circle_bbox = [
        size[0]//2 - circle_radius,
        size[1]//2 - circle_radius - 200,
        size[0]//2 + circle_radius,
        size[1]//2 + circle_radius - 200
    ]
    draw.ellipse(circle_bbox, outline=text_color, width=3)
    
    # Save image
    filepath = os.path.join(images_dir, filename)
    img.save(filepath, 'JPEG', quality=95)
    print(f"✓ Created: {filepath}")

# Create placeholder images
print("Creating placeholder images...\n")

create_placeholder('profile.jpg', 'Ibrahim Fakhry', (1000, 1000))
create_placeholder('project1.jpg', 'Web Dev', (800, 800))
create_placeholder('project2.jpg', 'AI Project', (800, 800))
create_placeholder('project3.jpg', 'Teaching', (800, 800))
create_placeholder('project4.jpg', 'Innovation', (800, 800))

print("\n✨ All placeholder images created successfully!")
print("📝 You can replace these with your actual images in the static/images/ folder")
