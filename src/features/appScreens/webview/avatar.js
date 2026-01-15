import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

let scene, camera, renderer, avatar, outfit;

init();
animate();

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(0, 1.6, 3);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  scene.add(new THREE.DirectionalLight(0xffffff, 1));

  new GLTFLoader().load('./assets/male.glb', (gltf) => {
    avatar = gltf.scene;
    scene.add(avatar);
  });
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

window.addEventListener('message', (e) => {
  const msg = JSON.parse(e.data);

  if (msg.type === 'SET_AVATAR') applyAvatar(msg.payload);
  if (msg.type === 'WEAR_PRODUCT') wearCloth(msg.payload.product);
});

function applyAvatar(cfg) {
  if (!avatar) return;

  avatar.scale.y = cfg.height;
  avatar.scale.x = cfg.weight;
  avatar.scale.z = cfg.weight;

  avatar.traverse((child) => {
    if (child.isMesh && child.material.name === 'Skin') {
      const colors = {
        light: '#f1c27d',
        medium: '#c68642',
        dark: '#8d5524',
      };
      child.material.color.set(colors[cfg.skinTone]);
    }
  });
}

function wearCloth(file) {
  if (outfit) avatar.remove(outfit);

  new GLTFLoader().load(`./assets/${file}`, (gltf) => {
    outfit = gltf.scene;
    avatar.add(outfit);
  });
}
