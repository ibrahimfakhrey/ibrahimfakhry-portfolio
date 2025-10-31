# pyright: reportMissingImports=false
from flask import Flask, render_template, request, redirect, url_for, flash, session  # type: ignore
from werkzeug.security import generate_password_hash, check_password_hash  # type: ignore
import os

app = Flask(__name__)
app.secret_key = os.urandom(24)

# In-memory user storage (for demo purposes - use a database in production)
users = {}

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form.get('username')
        email = request.form.get('email')
        password = request.form.get('password')
        
        if username in users:
            flash('Username already exists!', 'error')
            return redirect(url_for('register'))
        
        users[username] = {
            'email': email,
            'password': generate_password_hash(password)
        }
        
        flash('Registration successful! Please login.', 'success')
        return redirect(url_for('login'))
    
    return render_template('register.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        
        if username in users and check_password_hash(users[username]['password'], password):
            session['user'] = username
            flash('Login successful!', 'success')
            return redirect(url_for('index'))
        else:
            flash('Invalid credentials!', 'error')
            return redirect(url_for('login'))
    
    return render_template('login.html')

@app.route('/logout')
def logout():
    session.pop('user', None)
    flash('You have been logged out.', 'success')
    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True, port=5001)
