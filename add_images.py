"""
Image Setup Helper
This script will help you organize your images for the website.

INSTRUCTIONS:
1. Save your two attached photos as:
   - photo1.jpg (the one with you teaching/presenting with laptop)
   - photo2.jpg (the one with you and colleague at the conference)

2. Place them in the static/images/ folder

3. Run this script to create additional placeholder images if needed:
   python3 add_images.py

Or simply rename your photos to match the expected filenames:
- profile.jpg (use photo1.jpg or photo2.jpg - your choice for main profile)
- teaching1.jpg (photo with laptop and teaching)
- conference1.jpg (photo at conference table)
"""

import os
import shutil

images_dir = 'static/images'

print("📸 Image Setup Helper")
print("=" * 50)
print()

# Check if images exist
if os.path.exists(os.path.join(images_dir, 'photo1.jpg')) or os.path.exists(os.path.join(images_dir, 'photo2.jpg')):
    print("✓ Found your photos!")
    print()
    print("Would you like to set up the gallery? (y/n)")
    response = input().lower()
    
    if response == 'y':
        # Copy photos to gallery names
        if os.path.exists(os.path.join(images_dir, 'photo1.jpg')):
            shutil.copy(os.path.join(images_dir, 'photo1.jpg'), os.path.join(images_dir, 'profile.jpg'))
            shutil.copy(os.path.join(images_dir, 'photo1.jpg'), os.path.join(images_dir, 'teaching1.jpg'))
            print("✓ Set photo1.jpg as profile and teaching image")
        
        if os.path.exists(os.path.join(images_dir, 'photo2.jpg')):
            shutil.copy(os.path.join(images_dir, 'photo2.jpg'), os.path.join(images_dir, 'conference1.jpg'))
            print("✓ Set photo2.jpg as conference image")
        
        print()
        print("✨ Images are ready! Your website gallery is now set up.")
else:
    print("⚠️  Photos not found yet.")
    print()
    print("Please save your attached photos to static/images/ as:")
    print("  - photo1.jpg")
    print("  - photo2.jpg")
    print()
    print("Then run this script again.")
