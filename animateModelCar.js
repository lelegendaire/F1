export function animateModelCar(){
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)
const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
})
renderer.setClearColor(0x000000, 0);  // fond transparent (alpha = 0)

renderer.setSize(window.innerWidth,window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.physicallyCorrectLights = true;
renderer.tonMapping = THREE.ACESFilmicToneMapping;
renderer.tonMappingExposure = 2.5;
document.querySelector(".model").appendChild(renderer.domElement)
// Lumière ambiante douce
const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambientLight);

// Lumière principale comme le soleil
const keyLight = new THREE.DirectionalLight(0xffffff, 1.2);
keyLight.position.set(10, 15, 10);
keyLight.castShadow = true;
keyLight.shadow.mapSize.width = 1024;
keyLight.shadow.mapSize.height = 1024;
scene.add(keyLight);

// Fill light opposée, plus douce
const rimLight = new THREE.DirectionalLight(0xccccff, 0.6);
rimLight.position.set(-10, 5, -10);
scene.add(rimLight);

// Hemisphere light pour un éclairage naturel diffus
const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.8);
hemiLight.position.set(0, 20, 0);
scene.add(hemiLight);

// Light from above (effet studio)
const topLight = new THREE.DirectionalLight(0xffffff, 0.7);
topLight.position.set(0, 10, 0);
topLight.target.position.set(0, 0, 0);
scene.add(topLight);
scene.add(topLight.target);

// Projecteur simulé : optionnel si tu veux un effet plus stylisé
const rectLight = new THREE.RectAreaLight(0xffffff, 5, 10, 10);
rectLight.position.set(5, 5, 5);
rectLight.lookAt(0, 0, 0);
scene.add(rectLight);

scene.add(topLight);
scene.add(topLight.target); // important pour que la cible soit prise en compte


function basicAnimation(){
    renderer.render(scene, camera)
    requestAnimationFrame(basicAnimation)
}
basicAnimation()
let model;
const loader = new THREE.GLTFLoader();
loader.load("../asset/scuderia_ferrari.glb", function(gltf){
    model = gltf.scene;
    model.traverse((node)=>{
        if (node.material){
            if (node.material){
                node.material.metalness = 0.3;
                node.material.roughness = 0.4;
                node.material.envMapIntensity = 1.5;
            }
        node.castShadow = true;
        node.receiveShadow = true;
        }
    })
    const box = new THREE.Box3().setFromObject(model);
    const center = box.getCenter(new THREE.Vector3());
    model.position.sub(center);

    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x,size.y,size.z);
    camera.position.z = maxDim * 1.5;
    scene.add(model);
    model.scale.set(3, 3, 3); // ou essaye (0.5, 0.5, 0.5) selon le modèle
    model.position.set(0, 0, -10); // voiture départ à droite
    camera.position.set(10, 0, 0);  // 10 unités à droite
    camera.lookAt(0, 0, 0);         // regarde vers le centre de la scène

    //playInitialAnimation();
    //cancelAnimationFrame(basicAnimation);
    //animate();



let tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".Voiture",
    start: "top top",
  end: `${window.innerHeight * 1}px`,// ajuste selon la longueur désirée
    scrub: 1,
    pin: true,
    pinSpacing: true,
  }
});
// Position initiale (caméra à droite)
camera.position.set(10, 0, 0);
camera.lookAt(0, 0, 0);

// Étape 1 – Aller au centre
tl.to(model.position, {
        z: 0,
        duration: 1
    }, 0);

// Étape 2 – Rotation pour l'aileron (feature1)
tl.to(model.rotation, {
  y: Math.PI / 4,
  x: -0.1,
  duration: 1
}, 1);
tl.to("#feature1", { autoAlpha: 1 }, 1.1);

// Étape 3 – Vue en plongée (feature2)
tl.to(model.rotation, {
  x: Math.PI / 2,
  z: 2,
  duration: 1
}, 2);
tl.to("#feature2", { autoAlpha: 1 }, 2.1);

// Étape 4 – Zoom sur les pneus (feature3)
tl.to(camera.position, {
  x: 0,
  y: -5,
  z: 3,
  duration: 1,
  onUpdate: () => camera.lookAt(0, 0, 0)
}, 3);
tl.to("#feature3", { autoAlpha: 1 }, 3.1);

// Étape 5 – Zoom sur le cockpit (feature4)
tl.to(model.rotation, {
        y: Math.PI, // Vue en face
        x: 0.1,     // légère inclinaison vers le haut
        z: 0,
        duration: 1
    }, 4);

    tl.to(camera.position, {
        x: 5,
        y: 0.5,
        z: 2,
        duration: 1,
        onUpdate: () => camera.lookAt(model.position)
    }, 4);
    tl.to("#feature4", { autoAlpha: 1 }, 4.1);


});


}
