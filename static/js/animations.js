// Initialize Lenis Smooth Scroll with enhanced settings
const lenis = new Lenis({
    duration: 1.8,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    smoothTouch: false,
    wheelMultiplier: 1,
    touchMultiplier: 2,
    infinite: false,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// GSAP ScrollTrigger Setup
gsap.registerPlugin(ScrollTrigger);

// Update ScrollTrigger on Lenis scroll
lenis.on('scroll', ScrollTrigger.update);

// Sync Lenis with GSAP ScrollTrigger
gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

// Hero Section Animations with enhanced premium feel
gsap.from('.hero-name', {
    opacity: 0,
    y: 100,
    scale: 0.9,
    duration: 1.8,
    ease: 'power4.out',
    delay: 0.5,
});

gsap.from('.hero-subtitle', {
    opacity: 0,
    y: 50,
    duration: 1.5,
    ease: 'power4.out',
    delay: 0.9,
});

gsap.from('.btn-hero', {
    opacity: 0,
    y: 30,
    scale: 0.95,
    duration: 1.2,
    stagger: 0.2,
    ease: 'back.out(1.4)',
    delay: 1.3,
});

gsap.from('.scroll-indicator', {
    opacity: 0,
    y: 20,
    duration: 1,
    ease: 'power4.out',
    delay: 1.7,
});

// Navbar Scroll Effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.style.background = 'rgba(0, 0, 0, 0.8)';
    } else {
        navbar.style.background = 'rgba(0, 0, 0, 0.95)';
    }
    
    lastScroll = currentScroll;
});

// Section Title Animations
gsap.utils.toArray('.section-title').forEach((title) => {
    gsap.from(title, {
        scrollTrigger: {
            trigger: title,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power4.out',
    });
});

// Section Line Animations
gsap.utils.toArray('.section-line').forEach((line) => {
    gsap.from(line, {
        scrollTrigger: {
            trigger: line,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
        },
        scaleX: 0,
        duration: 1.2,
        ease: 'power4.out',
    });
});

// About Section Animation
gsap.from('.about-description', {
    scrollTrigger: {
        trigger: '.about-section',
        start: 'top 70%',
        end: 'bottom 30%',
        toggleActions: 'play none none reverse',
    },
    opacity: 0,
    y: 50,
    duration: 1.2,
    ease: 'power4.out',
});

gsap.from('.contact-item', {
    scrollTrigger: {
        trigger: '.contact-info',
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
    },
    opacity: 0,
    y: 30,
    stagger: 0.2,
    duration: 1,
    ease: 'power4.out',
});

// Projects Grid Animation with Parallax
gsap.utils.toArray('.project-card').forEach((card, index) => {
    // Entrance animation
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
        },
        opacity: 0,
        y: 80,
        rotationX: -15,
        duration: 1.2,
        ease: 'power4.out',
        delay: index * 0.1,
    });
    
    // Parallax effect
    gsap.to(card, {
        scrollTrigger: {
            trigger: card,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
        },
        y: -30,
        ease: 'none',
    });
});

// Courses Grid Animation
gsap.utils.toArray('.course-card').forEach((card, index) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
        },
        opacity: 0,
        y: 60,
        scale: 0.9,
        duration: 1,
        ease: 'back.out(1.7)',
        delay: index * 0.15,
    });
});

// Gallery Animation with Stagger and 3D effects
gsap.utils.toArray('.gallery-item').forEach((item, index) => {
    // Entrance animation with 3D rotation
    gsap.from(item, {
        scrollTrigger: {
            trigger: item,
            start: 'top 90%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
        },
        opacity: 0,
        scale: 0.7,
        rotationY: 45,
        rotationX: 15,
        duration: 1.2,
        ease: 'back.out(1.7)',
        delay: index * 0.1,
    });
    
    // Parallax effect for gallery items
    gsap.to(item, {
        scrollTrigger: {
            trigger: item,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
        },
        y: gsap.utils.random(-30, 30),
        ease: 'none',
    });
    
    // Add 3D tilt effect on mouse move
    item.addEventListener('mousemove', (e) => {
        const rect = item.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;
        
        gsap.to(item, {
            rotationX: rotateX,
            rotationY: rotateY,
            duration: 0.5,
            ease: 'power2.out',
            transformPerspective: 1000,
        });
    });
    
    item.addEventListener('mouseleave', () => {
        gsap.to(item, {
            rotationX: 0,
            rotationY: 0,
            duration: 0.5,
            ease: 'power2.out',
        });
    });
});

// Contact Section Animation
gsap.from('.contact-quote', {
    scrollTrigger: {
        trigger: '.contact-section',
        start: 'top 70%',
        end: 'bottom 30%',
        toggleActions: 'play none none reverse',
    },
    opacity: 0,
    scale: 0.9,
    duration: 1.2,
    ease: 'power4.out',
});

// GitHub Section Animations
gsap.from('.github-icon', {
    scrollTrigger: {
        trigger: '.github-section',
        start: 'top 70%',
        end: 'bottom 30%',
        toggleActions: 'play none none reverse',
    },
    opacity: 0,
    scale: 0.5,
    rotation: 180,
    duration: 1.2,
    ease: 'back.out(1.7)',
});

gsap.from('.github-title', {
    scrollTrigger: {
        trigger: '.github-section',
        start: 'top 70%',
        end: 'bottom 30%',
        toggleActions: 'play none none reverse',
    },
    opacity: 0,
    y: 30,
    duration: 1,
    ease: 'power4.out',
    delay: 0.2,
});

gsap.from('.github-description', {
    scrollTrigger: {
        trigger: '.github-section',
        start: 'top 70%',
        end: 'bottom 30%',
        toggleActions: 'play none none reverse',
    },
    opacity: 0,
    y: 30,
    duration: 1,
    ease: 'power4.out',
    delay: 0.4,
});

gsap.from('.github-btn', {
    scrollTrigger: {
        trigger: '.github-section',
        start: 'top 70%',
        end: 'bottom 30%',
        toggleActions: 'play none none reverse',
    },
    opacity: 0,
    y: 30,
    scale: 0.9,
    duration: 1,
    ease: 'back.out(1.4)',
    delay: 0.6,
});

gsap.from('.contact-quote', {
    scrollTrigger: {
        trigger: '.contact-section',
        start: 'top 70%',
        end: 'bottom 30%',
        toggleActions: 'play none none reverse',
    },
    opacity: 0,
    scale: 0.9,
    duration: 1.2,
    ease: 'power4.out',
});

gsap.from('.contact-subtext', {
    scrollTrigger: {
        trigger: '.contact-section',
        start: 'top 70%',
        end: 'bottom 30%',
        toggleActions: 'play none none reverse',
    },
    opacity: 0,
    y: 30,
    duration: 1,
    ease: 'power4.out',
    delay: 0.2,
});

gsap.from('.contact-link', {
    scrollTrigger: {
        trigger: '.contact-links',
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
    },
    opacity: 0,
    y: 40,
    stagger: 0.2,
    duration: 1,
    ease: 'power4.out',
    delay: 0.4,
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            lenis.scrollTo(target, {
                offset: -80,
                duration: 1.5,
            });
        }
    });
});

// Add hover effect with GSAP for project cards
document.querySelectorAll('.project-card').forEach((card) => {
    const glow = card.querySelector('.project-glow');
    
    card.addEventListener('mouseenter', () => {
        gsap.to(glow, {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out',
        });
    });
    
    card.addEventListener('mouseleave', () => {
        gsap.to(glow, {
            scale: 0,
            opacity: 0,
            duration: 0.6,
            ease: 'power2.out',
        });
    });
});

// Parallax effect for hero content
gsap.to('.hero-content', {
    scrollTrigger: {
        trigger: '.hero-section',
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
    },
    y: 150,
    opacity: 0.3,
    ease: 'none',
});

// Add 3D tilt effect to course cards
document.querySelectorAll('.course-card').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        gsap.to(card, {
            rotationX: rotateX,
            rotationY: rotateY,
            duration: 0.5,
            ease: 'power2.out',
            transformPerspective: 1000,
        });
    });
    
    card.addEventListener('mouseleave', () => {
        gsap.to(card, {
            rotationX: 0,
            rotationY: 0,
            duration: 0.5,
            ease: 'power2.out',
        });
    });
});

// Create floating animation for section backgrounds
gsap.to('.about-section', {
    scrollTrigger: {
        trigger: '.about-section',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
    },
    backgroundPosition: '50% 100%',
    ease: 'none',
});

// Add magnetic effect to buttons
document.querySelectorAll('.btn-primary, .btn-secondary, .btn-hero').forEach((button) => {
    button.addEventListener('mouseenter', function() {
        gsap.to(this, {
            scale: 1.05,
            duration: 0.3,
            ease: 'power2.out',
        });
    });
    
    button.addEventListener('mouseleave', function() {
        gsap.to(this, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out',
        });
    });
});

console.log('🚀 GSAP Animations Loaded');
