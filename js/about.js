const canvas = document.getElementById('background');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas });

renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.z = 10;

// Create a group of 3D wheels
const wheels = [];

function createWheel() {
    const wheelGroup = new THREE.Group();

    // Tire (Outer Cylinder)
    const tireGeometry = new THREE.TorusGeometry(1.2, 0.3, 16, 100); // Torus for rounded tire
    const tireMaterial = new THREE.MeshStandardMaterial({ color: 0x111111 }); // Black rubber
    const tire = new THREE.Mesh(tireGeometry, tireMaterial);

    // Hub (Inner Cylinder)
    const hubGeometry = new THREE.CylinderGeometry(0.5, 0.5, 0.5, 32); // Cylinder for the hub
    const hubMaterial = new THREE.MeshStandardMaterial({ color: 0x999999 }); // Metallic hub
    const hub = new THREE.Mesh(hubGeometry, hubMaterial);
    hub.rotation.x = Math.PI / 2; // Align hub with the tire
    hub.position.z = 0.1;

    // Spokes
    const spokes = new THREE.Group();
    const spokeGeometry = new THREE.BoxGeometry(0.05, 1, 0.05); // Thin rectangle for spokes
    const spokeMaterial = new THREE.MeshStandardMaterial({ color: 0xaaaaaa }); // Metallic spokes

    for (let i = 0; i < 6; i++) {
        const spoke = new THREE.Mesh(spokeGeometry, spokeMaterial);
        spoke.rotation.z = (Math.PI / 3) * i; // Spread spokes evenly
        spokes.add(spoke);
    }

    // Assemble the wheel
    wheelGroup.add(tire);
    wheelGroup.add(hub);
    wheelGroup.add(spokes);

    return wheelGroup;
}

// Add multiple wheels to the scene
for (let i = 0; i < 10; i++) {
    const wheel = createWheel();
    wheel.position.set(
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 15
    );
    wheels.push(wheel);
    scene.add(wheel);
}

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(10, 10, 10);
scene.add(ambientLight, pointLight);

// Animation Loop
function animate() {
    requestAnimationFrame(animate);

    wheels.forEach(wheel => {
        wheel.rotation.x += 0.02; // Spin wheels
        wheel.rotation.y += 0.01;
    });

    renderer.render(scene, camera);
}

animate();

// Resize Handler
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
