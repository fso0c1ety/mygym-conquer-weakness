#!/bin/bash
# Image optimization script for better performance

echo "Optimizing images for better mobile performance..."

# Install imagemagick if not present (for WebP conversion)
if ! command -v convert &> /dev/null; then
    echo "Installing ImageMagick for image optimization..."
    apt-get update -qq && apt-get install -y -qq imagemagick webp > /dev/null 2>&1
fi

cd src/assets

# Convert large JPG/PNG to WebP with quality 80
for img in *.jpg *.png 2>/dev/null; do
    if [ -f "$img" ]; then
        filename="${img%.*}"
        # Only convert if WebP doesn't exist and file is larger than 50KB
        if [ ! -f "${filename}.webp" ] && [ $(stat -f%z "$img" 2>/dev/null || stat -c%s "$img") -gt 51200 ]; then
            echo "Converting $img to WebP..."
            convert "$img" -quality 80 -define webp:method=6 "${filename}.webp" 2>/dev/null || \
            cwebp -q 80 -m 6 "$img" -o "${filename}.webp" 2>/dev/null
        fi
    fi
done

echo "Image optimization complete!"
echo "Remember to update image imports to use .webp extensions"
