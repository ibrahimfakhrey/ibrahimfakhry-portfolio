# Ibrahim Fakhry Ibrahim - Personal Landing Page

A stunning, futuristic personal portfolio website built with Flask, featuring Apple-inspired design, smooth GSAP animations, an interactive 3D robot, and AI-themed particle effects.

## 🌟 Features

### Design & Animations
- **Apple-Inspired Design**: Elegant, minimalist interface with smooth transitions
- **GSAP Animations**: Professional scroll-triggered animations with ScrollTrigger
- **Lenis Smooth Scroll**: Buttery-smooth scrolling experience
- **Interactive 3D Robot**: Three.js robot that follows your mouse movement
- **Particle System**: AI-themed particles with mouse interaction and trailing effects
- **Parallax Effects**: Depth and motion throughout the page
- **Responsive Design**: Fully responsive across all devices

### Sections
1. **Hero Section**: Full-screen intro with interactive 3D robot
2. **About Section**: Personal bio and contact information
3. **Projects Section**: Showcase of web applications with hover effects
4. **Courses Section**: Programming courses offered
5. **Gallery Section**: Image gallery with smooth animations
6. **Contact Section**: Contact information and call-to-action
7. **Authentication**: Register and Login pages with elegant forms

### Technologies Used
- **Backend**: Flask (Python)
- **Frontend**: HTML5, CSS3, JavaScript
- **3D Graphics**: Three.js
- **Animations**: GSAP, ScrollTrigger, Lenis
- **Design**: Custom CSS with CSS Variables
- **Fonts**: Inter (Google Fonts)

## 🚀 Quick Start

### Prerequisites
- Python 3.8 or higher
- pip (Python package manager)

### Installation

1. **Clone or navigate to the project directory**
   ```bash
   cd /Users/ibrahimfakhry/Desktop/cv
   ```

2. **Create a virtual environment** (recommended)
   ```bash
   python3 -m venv venv
   ```

3. **Activate the virtual environment**
   
   On macOS/Linux:
   ```bash
   source venv/bin/activate
   ```
   
   On Windows:
   ```bash
   venv\Scripts\activate
   ```

4. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

5. **Run the application**
   ```bash
   python app.py
   ```

6. **Open your browser**
   Navigate to: `http://127.0.0.1:5000`

## 📁 Project Structure

```
cv/
├── app.py                      # Flask application
├── requirements.txt            # Python dependencies
├── README.md                   # This file
├── static/
│   ├── css/
│   │   └── style.css          # Main stylesheet
│   ├── js/
│   │   ├── animations.js      # GSAP animations
│   │   ├── robot.js           # Three.js robot
│   │   └── particles.js       # Particle system
│   └── images/                # Image assets (add your images here)
│       ├── profile.jpg        # Your profile photo
│       ├── project1.jpg       # Project images
│       ├── project2.jpg
│       ├── project3.jpg
│       └── project4.jpg
└── templates/
    ├── index.html             # Main landing page
    ├── register.html          # Registration page
    └── login.html             # Login page
```

## 🖼️ Adding Your Images

The gallery section expects the following images in the `static/images/` folder:

- `profile.jpg` - Your personal photo (will be displayed as the large featured image)
- `project1.jpg` - Project gallery image 1
- `project2.jpg` - Project gallery image 2
- `project3.jpg` - Project gallery image 3
- `project4.jpg` - Project gallery image 4

**Note**: You can add placeholder images or your own images. Recommended size: 800x800px or higher.

## 🎨 Customization

### Colors
Edit CSS variables in `static/css/style.css`:
```css
:root {
    --color-bg: #000000;
    --color-accent: #00d9ff;
    /* ... more variables */
}
```

### Content
Edit content in `templates/index.html`:
- Update bio, contact info, projects, courses

### Robot Appearance
Modify robot design in `static/js/robot.js`

## 🌐 Deployment

### For Production
1. Set `debug=False` in `app.py`
2. Use a production WSGI server like Gunicorn:
   ```bash
   pip install gunicorn
   gunicorn app:app
   ```

### Recommended Hosting Platforms
- **Heroku**: Easy deployment with git
- **PythonAnywhere**: Free tier available
- **DigitalOcean**: Full control with droplets
- **AWS/Azure/GCP**: Scalable cloud hosting

## 📱 Browser Support

- Chrome/Edge (recommended)
- Firefox
- Safari
- Opera

## 🔧 Troubleshooting

### Port Already in Use
If port 5000 is in use, change it in `app.py`:
```python
app.run(debug=True, port=5001)
```

### Images Not Loading
- Check that images are in `static/images/` folder
- Verify filenames match those in HTML
- Use lowercase extensions (.jpg not .JPG)

### Animations Not Working
- Ensure JavaScript files load in correct order
- Check browser console for errors
- Try clearing browser cache

## 📄 License

This project is open source and available for personal and educational use.

## 👨‍💻 Contact

**Ibrahim Fakhry Ibrahim**
- Email: ibrahimfakhryams@gmail.com
- Phone: 01012818977
- Website: [Your Website]

## 🙏 Credits

- **GSAP**: GreenSock Animation Platform
- **Three.js**: 3D Graphics Library
- **Lenis**: Smooth Scroll Library
- **Inter Font**: Google Fonts

---

**"Code. Teach. Inspire."** 🚀
