// Three.js Robot Scene
let scene, camera, renderer, robot;
let mouseX = 0, mouseY = 0;
let targetX = 0, targetY = 0;

function initRobot() {
    const container = document.getElementById('robot-container');
    if (!container) return;
    
    // Scene setup
    scene = new THREE.Scene();
    
    // Camera setup
    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.z = 5;
    
    // Renderer setup
    renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);
    
    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const pointLight1 = new THREE.PointLight(0x00d9ff, 1, 100);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);
    
    const pointLight2 = new THREE.PointLight(0x00f0ff, 0.8, 100);
    pointLight2.position.set(-5, -5, 5);
    scene.add(pointLight2);
    
    // Create Robot
    createRobot();
    
    // Mouse move event
    document.addEventListener('mousemove', onMouseMove);
    
    // Window resize event
    window.addEventListener('resize', onWindowResize);
    
    // Start animation
    animate();
}

function createRobot() {
    robot = new THREE.Group();
    
    // Materials
    const bodyMaterial = new THREE.MeshPhongMaterial({
        color: 0x00d9ff,
        emissive: 0x00d9ff,
        emissiveIntensity: 0.3,
        shininess: 100,
    });
    
    const eyeMaterial = new THREE.MeshPhongMaterial({
        color: 0x00f0ff,
        emissive: 0x00f0ff,
        emissiveIntensity: 0.8,
    });
    
    // Head
    const headGeometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
    const head = new THREE.Mesh(headGeometry, bodyMaterial);
    head.position.y = 1.5;
    robot.add(head);
    
    // Antenna
    const antennaGeometry = new THREE.CylinderGeometry(0.05, 0.05, 0.5);
    const antenna = new THREE.Mesh(antennaGeometry, bodyMaterial);
    antenna.position.y = 2.5;
    robot.add(antenna);
    
    // Antenna ball
    const ballGeometry = new THREE.SphereGeometry(0.15);
    const ball = new THREE.Mesh(ballGeometry, eyeMaterial);
    ball.position.y = 2.8;
    robot.add(ball);
    
    // Eyes
    const eyeGeometry = new THREE.SphereGeometry(0.2);
    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    leftEye.position.set(-0.4, 1.6, 0.7);
    robot.add(leftEye);
    
    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    rightEye.position.set(0.4, 1.6, 0.7);
    robot.add(rightEye);
    
    // Body
    const bodyGeometry = new THREE.BoxGeometry(2, 2.5, 1.5);
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = -0.5;
    robot.add(body);
    
    // Arms
    const armGeometry = new THREE.CylinderGeometry(0.2, 0.2, 2);
    
    const leftArm = new THREE.Mesh(armGeometry, bodyMaterial);
    leftArm.position.set(-1.3, -0.3, 0);
    leftArm.rotation.z = Math.PI / 6;
    robot.add(leftArm);
    
    const rightArm = new THREE.Mesh(armGeometry, bodyMaterial);
    rightArm.position.set(1.3, -0.3, 0);
    rightArm.rotation.z = -Math.PI / 6;
    robot.add(rightArm);
    
    // Legs
    const legGeometry = new THREE.CylinderGeometry(0.25, 0.25, 1.5);
    
    const leftLeg = new THREE.Mesh(legGeometry, bodyMaterial);
    leftLeg.position.set(-0.5, -2.5, 0);
    robot.add(leftLeg);
    
    const rightLeg = new THREE.Mesh(legGeometry, bodyMaterial);
    rightLeg.position.set(0.5, -2.5, 0);
    robot.add(rightLeg);
    
    // Add some decorative elements
    const detailGeometry = new THREE.TorusGeometry(0.3, 0.05, 16, 100);
    const detail = new THREE.Mesh(detailGeometry, eyeMaterial);
    detail.position.set(0, -0.5, 0.8);
    robot.add(detail);
    
    // Add glow rings around the robot
    for (let i = 0; i < 3; i++) {
        const ringGeometry = new THREE.TorusGeometry(2 + i * 0.5, 0.02, 16, 100);
        const ringMaterial = new THREE.MeshBasicMaterial({
            color: 0x00d9ff,
            transparent: true,
            opacity: 0.3 - i * 0.1,
        });
        const ring = new THREE.Mesh(ringGeometry, ringMaterial);
        ring.position.y = 0;
        ring.rotation.x = Math.PI / 2;
        robot.add(ring);
    }
    
    // Position and scale robot
    robot.position.y = 0;
    robot.scale.set(0.8, 0.8, 0.8);
    
    scene.add(robot);
}

function onMouseMove(event) {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);
    
    if (robot) {
        // Smooth follow mouse movement
        targetX = mouseX * 0.5;
        targetY = mouseY * 0.3;
        
        robot.rotation.y += (targetX - robot.rotation.y) * 0.05;
        robot.rotation.x += (targetY - robot.rotation.x) * 0.05;
        
        // Continuous floating animation
        robot.position.y = Math.sin(Date.now() * 0.001) * 0.2;
        
        // Rotate the antenna ball
        const ball = robot.children.find(child => child.position.y > 2.7);
        if (ball) {
            ball.rotation.y += 0.02;
        }
        
        // Pulse the glow rings
        robot.children.forEach((child, index) => {
            if (child.geometry && child.geometry.type === 'TorusGeometry') {
                child.rotation.z += 0.005 * (index + 1);
                child.material.opacity = 0.3 + Math.sin(Date.now() * 0.002 + index) * 0.1;
            }
        });
        
        // Make eyes follow cursor more intensely
        const leftEye = robot.children.find(child => 
            child.position.x < 0 && child.position.z > 0.5 && child.geometry.type === 'SphereGeometry'
        );
        const rightEye = robot.children.find(child => 
            child.position.x > 0 && child.position.z > 0.5 && child.geometry.type === 'SphereGeometry'
        );
        
        if (leftEye && rightEye) {
            leftEye.position.x = -0.4 + mouseX * 0.1;
            leftEye.position.y = 1.6 + mouseY * 0.1;
            rightEye.position.x = 0.4 + mouseX * 0.1;
            rightEye.position.y = 1.6 + mouseY * 0.1;
        }
    }
    
    renderer.render(scene, camera);
}

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initRobot);
} else {
    initRobot();
}

console.log('🤖 Robot initialized');
