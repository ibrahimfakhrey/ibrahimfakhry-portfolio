// Particle System with Mouse Interaction
class ParticleSystem {
    constructor() {
        this.canvas = document.getElementById('particleCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouseParticles = [];
        this.mouse = { x: 0, y: 0 };
        this.particleCount = 100;
        
        this.init();
    }
    
    init() {
        this.resize();
        this.createParticles();
        this.setupEvents();
        this.animate();
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    createParticles() {
        this.particles = [];
        
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 2 + 1,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
                opacity: Math.random() * 0.5 + 0.2,
                pulseSpeed: Math.random() * 0.02 + 0.01,
                pulsePhase: Math.random() * Math.PI * 2,
            });
        }
    }
    
    setupEvents() {
        window.addEventListener('resize', () => this.resize());
        
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
            
            // Create trailing particles
            if (Math.random() > 0.8) {
                this.mouseParticles.push({
                    x: e.clientX,
                    y: e.clientY,
                    size: Math.random() * 3 + 2,
                    opacity: 1,
                    speedX: (Math.random() - 0.5) * 2,
                    speedY: (Math.random() - 0.5) * 2,
                    life: 1,
                    decay: Math.random() * 0.02 + 0.01,
                });
            }
        });
    }
    
    drawParticle(particle, color = '0, 217, 255') {
        this.ctx.beginPath();
        this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        this.ctx.fillStyle = `rgba(${color}, ${particle.opacity})`;
        this.ctx.fill();
        
        // Add glow effect
        const gradient = this.ctx.createRadialGradient(
            particle.x, particle.y, 0,
            particle.x, particle.y, particle.size * 3
        );
        gradient.addColorStop(0, `rgba(${color}, ${particle.opacity * 0.5})`);
        gradient.addColorStop(1, `rgba(${color}, 0)`);
        
        this.ctx.fillStyle = gradient;
        this.ctx.fill();
    }
    
    connectParticles() {
        const maxDistance = 150;
        
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < maxDistance) {
                    const opacity = (1 - distance / maxDistance) * 0.2;
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = `rgba(0, 217, 255, ${opacity})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                }
            }
        }
    }
    
    drawMouseGlow() {
        const gradient = this.ctx.createRadialGradient(
            this.mouse.x, this.mouse.y, 0,
            this.mouse.x, this.mouse.y, 150
        );
        
        gradient.addColorStop(0, 'rgba(0, 217, 255, 0.1)');
        gradient.addColorStop(0.5, 'rgba(0, 217, 255, 0.05)');
        gradient.addColorStop(1, 'rgba(0, 217, 255, 0)');
        
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    
    updateParticles() {
        this.particles.forEach((particle) => {
            // Update position
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            // Pulse effect
            particle.pulsePhase += particle.pulseSpeed;
            particle.opacity = 0.3 + Math.sin(particle.pulsePhase) * 0.3;
            
            // Mouse attraction
            const dx = this.mouse.x - particle.x;
            const dy = this.mouse.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 200) {
                const force = (200 - distance) / 200;
                particle.x += (dx / distance) * force * 0.5;
                particle.y += (dy / distance) * force * 0.5;
            }
            
            // Wrap around screen
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;
        });
    }
    
    updateMouseParticles() {
        this.mouseParticles = this.mouseParticles.filter((particle) => {
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            particle.life -= particle.decay;
            particle.opacity = particle.life;
            particle.speedX *= 0.98;
            particle.speedY *= 0.98;
            
            return particle.life > 0;
        });
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw mouse glow
        this.drawMouseGlow();
        
        // Update and draw particles
        this.updateParticles();
        this.particles.forEach((particle) => this.drawParticle(particle));
        
        // Connect nearby particles
        this.connectParticles();
        
        // Update and draw mouse trail particles
        this.updateMouseParticles();
        this.mouseParticles.forEach((particle) => {
            this.drawParticle(particle, '0, 240, 255');
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize particle system
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new ParticleSystem();
        console.log('✨ Particle system initialized');
    });
} else {
    new ParticleSystem();
    console.log('✨ Particle system initialized');
}

// Add floating light orbs
class FloatingOrbs {
    constructor() {
        this.orbs = [];
        this.createOrbs();
    }
    
    createOrbs() {
        const orbCount = 5;
        const sections = document.querySelectorAll('section');
        
        sections.forEach((section, index) => {
            if (index % 2 === 0) {
                const orb = document.createElement('div');
                orb.className = 'floating-orb';
                orb.style.cssText = `
                    position: absolute;
                    width: ${Math.random() * 200 + 100}px;
                    height: ${Math.random() * 200 + 100}px;
                    border-radius: 50%;
                    background: radial-gradient(circle, rgba(0, 217, 255, 0.1) 0%, transparent 70%);
                    filter: blur(40px);
                    pointer-events: none;
                    z-index: 1;
                    left: ${Math.random() * 80 + 10}%;
                    top: ${Math.random() * 80 + 10}%;
                    animation: float ${Math.random() * 10 + 10}s ease-in-out infinite;
                `;
                
                section.style.position = 'relative';
                section.appendChild(orb);
                this.orbs.push(orb);
            }
        });
        
        // Add keyframes for floating animation
        if (!document.getElementById('float-animation')) {
            const style = document.createElement('style');
            style.id = 'float-animation';
            style.textContent = `
                @keyframes float {
                    0%, 100% {
                        transform: translate(0, 0) scale(1);
                    }
                    25% {
                        transform: translate(20px, -20px) scale(1.1);
                    }
                    50% {
                        transform: translate(-20px, 20px) scale(0.9);
                    }
                    75% {
                        transform: translate(20px, 20px) scale(1.05);
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
}

// Initialize floating orbs
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new FloatingOrbs();
        console.log('🌟 Floating orbs initialized');
    });
} else {
    new FloatingOrbs();
    console.log('🌟 Floating orbs initialized');
}
