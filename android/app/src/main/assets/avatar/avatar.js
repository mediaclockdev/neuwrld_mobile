alert(
  'THREE.GLTFLoader type: ' + typeof THREE.GLTFLoader
);

const MODEL_URL =
  'https://models.readyplayer.me/69686a301fb616285a2f665c.glb';

let scene, camera, renderer, avatar;

init();
animate();

function init() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf5f5f5);

  camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    100
  );
  camera.position.set(0, 1.6, 3);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  document.body.appendChild(renderer.domElement);

  scene.add(new THREE.HemisphereLight(0xffffff, 0x444444, 1.2));

  const loader = new THREE.GLTFLoader();

  fetch(MODEL_URL)
  .then(r => {
    alert('Fetch status: ' + r.status);
    return r.arrayBuffer();
  })
  .then(b => alert('GLB bytes: ' + b.byteLength))
  .catch(e => alert('Fetch error'));


  loader.load(
    MODEL_URL,
    (gltf) => {
      alert('GLB loaded ✅');

      avatar = gltf.scene;
      scene.add(avatar);

      const box = new THREE.Box3().setFromObject(avatar);
      const center = box.getCenter(new THREE.Vector3());
      avatar.position.sub(center);
      avatar.position.y = 0;

      camera.lookAt(0, 1.4, 0);
    },
    undefined,
    (err) => {
      alert('GLB error ❌');
      console.error(err);
    }
  );
}

function animate() {
  requestAnimationFrame(animate);
  if (avatar) avatar.rotation.y += 0.002;
  renderer.render(scene, camera);
}
