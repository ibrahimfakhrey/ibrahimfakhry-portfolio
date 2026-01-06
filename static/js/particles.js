// Particle System with Mouse Interaction
class ParticleSystem {
    constructor() {
        this.canvas = document.getElementById('particleCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouseParticles = [];
        this.mouse = { x: 0, y: 0 };

        // Detect mobile and reduce particles significantly
        this.isMobile = window.innerWidth <= 768 || 'ontouchstart' in window;
        this.particleCount = this.isMobile ? 30 : 60; // Reduced from 100
        this.maxConnectDistance = this.isMobile ? 100 : 120; // Reduced connection distance
        this.isVisible = true;

        this.init();
    }

    init() {
        this.resize();
        this.createParticles();
        this.setupEvents();
        this.setupVisibilityCheck();
        this.animate();
    }

    setupVisibilityCheck() {
        // Pause animation when tab is not visible
        document.addEventListener('visibilitychange', () => {
            this.isVisible = !document.hidden;
        });
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
        // Debounced resize
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => this.resize(), 150);
        });

        // Only add mouse effects on desktop
        if (!this.isMobile) {
            document.addEventListener('mousemove', (e) => {
                this.mouse.x = e.clientX;
                this.mouse.y = e.clientY;

                // Create trailing particles (reduced frequency)
                if (Math.random() > 0.9) {
                    this.mouseParticles.push({
                        x: e.clientX,
                        y: e.clientY,
                        size: Math.random() * 3 + 2,
                        opacity: 1,
                        speedX: (Math.random() - 0.5) * 2,
                        speedY: (Math.random() - 0.5) * 2,
                        life: 1,
                        decay: Math.random() * 0.03 + 0.02,
                    });
                }
            });
        }
    }
    
    drawParticle(particle, color = '0, 217, 255') {
        this.ctx.beginPath();
        this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        this.ctx.fillStyle = `rgba(${color}, ${particle.opacity})`;
        this.ctx.fill();

        // Skip expensive glow effect on mobile
        if (!this.isMobile) {
            const gradient = this.ctx.createRadialGradient(
                particle.x, particle.y, 0,
                particle.x, particle.y, particle.size * 3
            );
            gradient.addColorStop(0, `rgba(${color}, ${particle.opacity * 0.5})`);
            gradient.addColorStop(1, `rgba(${color}, 0)`);

            this.ctx.fillStyle = gradient;
            this.ctx.fill();
        }
    }
    
    connectParticles() {
        // Skip connections on mobile for better performance
        if (this.isMobile) return;

        const maxDistance = this.maxConnectDistance;
        const maxDistanceSq = maxDistance * maxDistance;

        // Batch drawing for better performance
        this.ctx.beginPath();
        this.ctx.strokeStyle = 'rgba(0, 217, 255, 0.15)';
        this.ctx.lineWidth = 1;

        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                // Skip sqrt for performance - compare squared distances
                const distanceSq = dx * dx + dy * dy;

                if (distanceSq < maxDistanceSq) {
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                }
            }
        }
        this.ctx.stroke();
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
        const canvasWidth = this.canvas.width;
        const canvasHeight = this.canvas.height;
        const isMobile = this.isMobile;
        const mouseX = this.mouse.x;
        const mouseY = this.mouse.y;

        for (let i = 0; i < this.particles.length; i++) {
            const particle = this.particles[i];

            // Update position
            particle.x += particle.speedX;
            particle.y += particle.speedY;

            // Pulse effect
            particle.pulsePhase += particle.pulseSpeed;
            particle.opacity = 0.3 + Math.sin(particle.pulsePhase) * 0.3;

            // Mouse attraction (desktop only)
            if (!isMobile && mouseX && mouseY) {
                const dx = mouseX - particle.x;
                const dy = mouseY - particle.y;
                const distanceSq = dx * dx + dy * dy;

                if (distanceSq < 40000) { // 200^2
                    const distance = Math.sqrt(distanceSq);
                    const force = (200 - distance) / 200;
                    particle.x += (dx / distance) * force * 0.5;
                    particle.y += (dy / distance) * force * 0.5;
                }
            }

            // Wrap around screen
            if (particle.x < 0) particle.x = canvasWidth;
            if (particle.x > canvasWidth) particle.x = 0;
            if (particle.y < 0) particle.y = canvasHeight;
            if (particle.y > canvasHeight) particle.y = 0;
        }
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
        // Skip animation when tab is not visible
        if (!this.isVisible) {
            requestAnimationFrame(() => this.animate());
            return;
        }

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw mouse glow (desktop only)
        if (!this.isMobile) {
            this.drawMouseGlow();
        }

        // Update and draw particles
        this.updateParticles();
        for (let i = 0; i < this.particles.length; i++) {
            this.drawParticle(this.particles[i]);
        }

        // Connect nearby particles (desktop only, handled inside method)
        this.connectParticles();

        // Update and draw mouse trail particles (desktop only)
        if (!this.isMobile) {
            this.updateMouseParticles();
            for (let i = 0; i < this.mouseParticles.length; i++) {
                this.drawParticle(this.mouseParticles[i], '0, 240, 255');
            }
        }

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

// Add floating light orbs (desktop only - too expensive for mobile)
class FloatingOrbs {
    constructor() {
        this.isMobile = window.innerWidth <= 768 || 'ontouchstart' in window;
        // Skip orbs entirely on mobile - they cause lag
        if (this.isMobile) return;

        this.orbs = [];
        this.createOrbs();
    }

    createOrbs() {
        const sections = document.querySelectorAll('section');

        sections.forEach((section, index) => {
            // Only add to every 3rd section to reduce count
            if (index % 3 === 0) {
                const orb = document.createElement('div');
                orb.className = 'floating-orb';
                orb.style.cssText = `
                    position: absolute;
                    width: ${Math.random() * 150 + 80}px;
                    height: ${Math.random() * 150 + 80}px;
                    border-radius: 50%;
                    background: radial-gradient(circle, rgba(0, 217, 255, 0.08) 0%, transparent 70%);
                    filter: blur(30px);
                    pointer-events: none;
                    z-index: 1;
                    left: ${Math.random() * 80 + 10}%;
                    top: ${Math.random() * 80 + 10}%;
                    animation: float ${Math.random() * 15 + 15}s ease-in-out infinite;
                    will-change: transform;
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
                        transform: translate(0, 0);
                    }
                    50% {
                        transform: translate(15px, -15px);
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
