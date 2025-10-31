# 🚀 QUICK START GUIDE

Welcome! This guide will help you get your stunning personal landing page up and running in minutes.

## Option 1: Automated Setup (Recommended)

Run the automated setup script:

```bash
cd /Users/ibrahimfakhry/Desktop/cv
./setup.sh
```

This will:
- Create a virtual environment
- Install all dependencies
- Optionally create placeholder images
- Get everything ready to run

Then simply:
```bash
source venv/bin/activate
python app.py
```

Open your browser to: **http://127.0.0.1:5000**

---

## Option 2: Manual Setup

### Step 1: Create Virtual Environment
```bash
cd /Users/ibrahimfakhry/Desktop/cv
python3 -m venv venv
source venv/bin/activate
```

### Step 2: Install Dependencies
```bash
pip install -r requirements.txt
```

### Step 3: (Optional) Create Placeholder Images
```bash
pip install Pillow
python create_placeholders.py
```

### Step 4: Run the Application
```bash
python app.py
```

### Step 5: Open Your Browser
Navigate to: **http://127.0.0.1:5000**

---

## 🖼️ Adding Your Images

Replace placeholder images in `static/images/`:

1. **profile.jpg** - Your photo (featured in gallery)
2. **project1.jpg** - Project screenshot
3. **project2.jpg** - Project screenshot  
4. **project3.jpg** - Project screenshot
5. **project4.jpg** - Project screenshot

**Recommended size**: 800x800px or larger

---

## 🎨 Customization Tips

### Update Your Info
Edit `templates/index.html`:
- Line ~64: Update bio text
- Line ~71-77: Update contact info
- Line ~95-160: Update project links and descriptions
- Line ~175-210: Update course offerings

### Change Colors
Edit `static/css/style.css`:
```css
:root {
    --color-accent: #00d9ff;  /* Your brand color */
}
```

### Modify Robot
Edit `static/js/robot.js` to change the 3D robot's appearance

---

## 📱 Test Your Site

1. **Desktop**: Open in Chrome/Firefox/Safari
2. **Mobile**: Use browser dev tools (F12 → Device Toolbar)
3. **Animations**: Scroll through all sections to see effects

---

## 🔧 Troubleshooting

### "Port 5000 already in use"
Change port in `app.py`:
```python
app.run(debug=True, port=5001)
```

### "Module not found"
Make sure virtual environment is activated:
```bash
source venv/bin/activate
```

### Images not showing
- Check files are in `static/images/`
- Verify lowercase extensions (.jpg not .JPG)
- Clear browser cache (Cmd+Shift+R)

---

## 🌐 Deploying to Production

### Quick Deploy Options:

**Heroku** (Free tier):
```bash
# Install Heroku CLI, then:
heroku create your-app-name
git push heroku main
```

**PythonAnywhere** (Free tier):
1. Upload files to PythonAnywhere
2. Create web app with Flask
3. Point to your app.py

**DigitalOcean** ($5/month):
- Use their App Platform
- Connect your GitHub repo
- Auto-deploy on push

---

## ✨ What You Get

✅ Futuristic landing page with AI theme  
✅ Interactive 3D robot that follows mouse  
✅ Smooth GSAP animations & parallax effects  
✅ Particle system with mouse trailing  
✅ Fully responsive design  
✅ Register & Login functionality  
✅ Contact sections with your info  
✅ Project & course showcases  

---

## 📧 Need Help?

**Ibrahim Fakhry Ibrahim**  
Email: ibrahimfakhryams@gmail.com  
Phone: 01012818977

---

**"Code. Teach. Inspire."** 🚀

Enjoy your new website!
