#!/bin/bash

echo "🚀 Setting up Ibrahim Fakhry Ibrahim's Personal Landing Page"
echo "============================================================"
echo ""

# Check if Python 3 is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.8 or higher."
    exit 1
fi

echo "✓ Python 3 found: $(python3 --version)"
echo ""

# Create virtual environment
echo "📦 Creating virtual environment..."
python3 -m venv venv

if [ $? -ne 0 ]; then
    echo "❌ Failed to create virtual environment"
    exit 1
fi

echo "✓ Virtual environment created"
echo ""

# Activate virtual environment
echo "🔧 Activating virtual environment..."
source venv/bin/activate

# Install dependencies
echo "📥 Installing dependencies..."
pip install --upgrade pip
pip install -r requirements.txt

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✓ Dependencies installed"
echo ""

# Create placeholder images (optional)
echo "🖼️  Do you want to create placeholder images? (y/n)"
read -r response
if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
    echo "Installing Pillow for image generation..."
    pip install Pillow
    echo "Creating placeholder images..."
    python create_placeholders.py
fi

echo ""
echo "============================================================"
echo "✨ Setup Complete!"
echo ""
echo "To run the application:"
echo "1. Activate the virtual environment: source venv/bin/activate"
echo "2. Run the app: python app.py"
echo "3. Open your browser: http://127.0.0.1:5000"
echo ""
echo "📝 Don't forget to add your personal images to static/images/"
echo "============================================================"
