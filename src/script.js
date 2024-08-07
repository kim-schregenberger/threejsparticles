import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import GUI from 'lil-gui';
import gsap from 'gsap';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

const gui = new GUI();

// hide GUI
gui.domElement.style.display = 'none';

// Toggle GUI visibility when pressing 'h'
document.addEventListener('keydown', (event) => {
    if (event.key === 'h' || event.key === 'H') {
        const guiContainer = gui.domElement;
        if (guiContainer.style.display === 'none') {
            guiContainer.style.display = 'block';
        } else {
            guiContainer.style.display = 'none';
        }
    }
});

const parameters = {
    materialColor: '#ffeded',
    sphereSegments: 64,
    torusKnotSegments: 200,
    boxSegments: 20,
    torusSegments: 40
};

/**
 * Base
 */
const canvas = document.querySelector('canvas.webgl');
const scene = new THREE.Scene();

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const particleTexture = textureLoader.load('/textures/particles/14.webp');

// Geometry
const createParticles = (geometry, color, size) => {
    const particlesMaterial = new THREE.PointsMaterial({
        size: size,
        sizeAttenuation: true,
        color: color,
        transparent: true,
        alphaTest: 0.5,
        depthWrite: true
    });
    return new THREE.Points(geometry, particlesMaterial);
};

let mesh1, mesh2, mesh3, mesh4;
const objectsDistance = 4;

const createMeshes = () => {
    if (mesh1) {
        scene.remove(mesh1);
        scene.remove(mesh2);
        scene.remove(mesh3);
        scene.remove(mesh4);
    }

    const sphereGeometry = new THREE.SphereGeometry(1, parameters.sphereSegments, parameters.sphereSegments);
    const torusKnotGeometry = new THREE.TorusKnotGeometry(0.6, 0.3, parameters.torusKnotSegments, 50);
    const boxGeometry = new THREE.BoxGeometry(1.5, 1.5, 1.5, parameters.boxSegments, parameters.boxSegments, parameters.boxSegments);
    const torusGeometry = new THREE.TorusGeometry(0.8, 0.4, parameters.torusSegments, 150);

    mesh1 = createParticles(sphereGeometry, parameters.materialColor, 0.02);
    mesh2 = createParticles(torusKnotGeometry, parameters.materialColor, 0.02);
    mesh3 = createParticles(boxGeometry, parameters.materialColor, 0.02);
    mesh4 = createParticles(torusGeometry, parameters.materialColor, 0.02);

    updateMeshPositions();
    scene.add(mesh1, mesh2, mesh3, mesh4);
};

const updateMeshPositions = () => {
    if (window.innerWidth <= 800) {
        // Mobile layout: stack meshes vertically
        mesh1.position.set(0, -objectsDistance * 1, 0);
        mesh2.position.set(0, -objectsDistance * 2, 0);
        mesh3.position.set(0, -objectsDistance * 3, 0);
        mesh4.position.set(0, -objectsDistance * 4, 0);
    } else {
        // Default layout: alternate left and right
        mesh1.position.set(-2, -objectsDistance * 1, 0);
        mesh2.position.set(2, -objectsDistance * 2, 0);
        mesh3.position.set(-2, -objectsDistance * 3, 0);
        mesh4.position.set(2, -objectsDistance * 4, 0);
    }
};

createMeshes();

// GUI Controls
gui.addColor(parameters, 'materialColor').onChange(() => {
    mesh1.material.color.set(parameters.materialColor);
    mesh2.material.color.set(parameters.materialColor);
    mesh3.material.color.set(parameters.materialColor);
    mesh4.material.color.set(parameters.materialColor);
});

// gui.add(parameters, 'sphereSegments', 4, 80, 1).name('Sphere Segments').onChange(createMeshes);
// gui.add(parameters, 'torusKnotSegments', 10, 250, 1).name('TorusKnot Segments').onChange(createMeshes);
// gui.add(parameters, 'boxSegments', 1, 30, 1).name('Box Segments').onChange(createMeshes);
// gui.add(parameters, 'torusSegments', 3, 50, 1).name('Torus Segments').onChange(createMeshes);

/**
 * Background Particles
 */
const particlesCount = 300;
const positions = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount; i++) {
    positions[i * 3 + 0] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 1] = objectsDistance * 0.5 - Math.random() * objectsDistance * 5;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
}

const particlesGeometry = new THREE.BufferGeometry();
particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

const bgparticlesMaterial = new THREE.PointsMaterial({
    color: parameters.materialColor,
    sizeAttenuation: true,
    size: 0.1,
    map: particleTexture,
    transparent: true,
    alphaTest: 0.5,
    depthWrite: true
});

const particles = new THREE.Points(particlesGeometry, bgparticlesMaterial);
scene.add(particles);

/**
 * Lights
 */
const directionalLight = new THREE.DirectionalLight('#ffffff', 3);
directionalLight.position.set(1, 1, 0);
scene.add(directionalLight);

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};

window.addEventListener('resize', () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    updateMeshPositions(); // Update positions on resize
});

/**
 * Camera
 */
const cameraGroup = new THREE.Group();
scene.add(cameraGroup);
const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 100);
camera.position.z = 6;
cameraGroup.add(camera);

/**
 * Controls
 */
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enableZoom = false;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));



/**
 * Cursor and Touch
 */
const cursor = { x: 0, y: 0 };
const touch = { x: 0, y: 0 };

const handleMove = (x, y) => {
    cursor.x = x / sizes.width - 0.5;
    cursor.y = y / sizes.height - 0.5;
};

window.addEventListener('mousemove', (event) => {
    handleMove(event.clientX, event.clientY);
});

window.addEventListener('touchmove', (event) => {
    if (event.touches.length > 0) {
        handleMove(event.touches[0].clientX, event.touches[0].clientY);
    }
});

/**
 * Animate
 */
const clock = new THREE.Clock();
let previousTime = 0;

const tick = () => {
    const elapsedTime = clock.getElapsedTime();
    const deltaTime = elapsedTime - previousTime;
    previousTime = elapsedTime;

    camera.position.y = -scrollY / sizes.height * objectsDistance;

    const parallaxX = cursor.x * 0.5;
    const parallaxY = -cursor.y * 0.5;
    cameraGroup.position.x += (parallaxX - cameraGroup.position.x) * 5 * deltaTime;
    cameraGroup.position.y += (parallaxY - cameraGroup.position.y) * 5 * deltaTime;

    mesh3.rotation.x += deltaTime * 0.3;
    mesh3.rotation.y += deltaTime * 0.16;

    // mesh1.rotation.x += deltaTime * -0.16;
    // mesh1.rotation.y += deltaTime * -0.3;

    gsap.to(mesh2.rotation, {
        x: cursor.y * Math.PI * 2,
        y: cursor.x * Math.PI * 2,
        duration: 1,
        ease: 'power2.out'
    });

    renderer.render(scene, camera);
    window.requestAnimationFrame(tick);
};

tick();

/**
 * Raycaster
 */
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

const handleClick = (x, y) => {
    mouse.x = (x / sizes.width) * 2 - 1;
    mouse.y = -(y / sizes.height) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObject(mesh1);

    if (intersects.length > 0) {
        const selectedParticle = intersects[0];
        showParticlePosition(selectedParticle);
    }
};


window.addEventListener('click', (event) => {
    handleClick(event.clientX, event.clientY);
});

window.addEventListener('touchend', (event) => {
    if (event.changedTouches.length > 0) {
        handleClick(event.changedTouches[0].clientX, event.changedTouches[0].clientY);
    }
});

function showParticlePosition(particle) {
    const positionElement = document.getElementById('particlePosition');
    if (positionElement) {
        positionElement.innerHTML = `Position: (x: ${particle.point.x.toFixed(2)}, y: ${particle.point.y.toFixed(2)}, z: ${particle.point.z.toFixed(2)})`;
    }
}
