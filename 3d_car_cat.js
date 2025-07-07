document.addEventListener("DOMContentLoaded", () => {
const lenis = new Lenis();
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((time)=>{
    lenis.raf(time * 1000);
})
gsap.ticker.lagSmoothing(0)

const scene = new THREE.Scene();


const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth/2 / window.innerHeight,
    0.1,
    1000
)
const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
})
const box = document.querySelector(".catégorie-card")
const rect_box = box.getBoundingClientRect();
renderer.setClearColor(0x000000, 0);  // fond transparent (alpha = 0)
renderer.setSize(rect_box.width,400);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.physicallyCorrectLights = true;
renderer.tonMapping = THREE.ACESFilmicToneMapping;
renderer.tonMappingExposure = 2.5;
document.querySelector(".model_F1").appendChild(renderer.domElement)

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const mainLight = new THREE.DirectionalLight(0xffffff,1);
mainLight.position.set(5,10,7.5);
scene.add(mainLight)

const fillLight = new THREE.DirectionalLight(0xffffff,3);
fillLight.position.set(-5,0,-5);
scene.add(fillLight)

const hemiLight = new THREE.HemisphereLight(0xffffff,2);
hemiLight.position.set(0,25,0);
scene.add(hemiLight)

const topLight = new THREE.DirectionalLight(0xffffff, 10); // blanc, intensité 1
topLight.position.set(0, 10, 0); // positionnée 10 unités au-dessus (Y=10)
topLight.target.position.set(2, 2, 2); // dirigée vers le centre de la scène (la voiture)
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
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x,size.y,size.z);
    camera.position.z = maxDim * 1.5;
    scene.add(model);
    model.position.sub(center);

    model.scale.set(2, 2, 2); // ou essaye (0.5, 0.5, 0.5) selon le modèle
    camera.position.set(3.5, 1.5, 5);  // Vue légèrement à gauche (x = -3), en hauteur (y = 2), en recul (z = 5)
    camera.lookAt(-2, 0, 0);         // regarde vers le centre de la scène

    //playInitialAnimation();
    //cancelAnimationFrame(basicAnimation);
    //animate();



});


});
document.addEventListener("DOMContentLoaded", () => {
const lenis = new Lenis();
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((time)=>{
    lenis.raf(time * 1000);
})
gsap.ticker.lagSmoothing(0)

const scene = new THREE.Scene();


const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth/2 / window.innerHeight,
    0.1,
    1000
)
const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
})
const box2 = document.querySelector(".catégorie-card")
const rect_box2 = box2.getBoundingClientRect();
renderer.setClearColor(0x000000, 0);  // fond transparent (alpha = 0)
renderer.setSize(rect_box2.width,400);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.physicallyCorrectLights = true;
renderer.tonMapping = THREE.ACESFilmicToneMapping;
renderer.tonMappingExposure = 2.5;
document.querySelector(".model_FE").appendChild(renderer.domElement)

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const mainLight = new THREE.DirectionalLight(0xffffff,1);
mainLight.position.set(5,10,7.5);
scene.add(mainLight)

const fillLight = new THREE.DirectionalLight(0xffffff,3);
fillLight.position.set(-5,0,-5);
scene.add(fillLight)

const hemiLight = new THREE.HemisphereLight(0xffffff,2);
hemiLight.position.set(0,25,0);
scene.add(hemiLight)

const topLight = new THREE.DirectionalLight(0xffffff, 10); // blanc, intensité 1
topLight.position.set(0, 10, 0); // positionnée 10 unités au-dessus (Y=10)
topLight.target.position.set(2, 2, 2); // dirigée vers le centre de la scène (la voiture)
scene.add(topLight);
scene.add(topLight.target); // important pour que la cible soit prise en compte



function basicAnimation(){
    renderer.render(scene, camera)
    requestAnimationFrame(basicAnimation)
}
basicAnimation()
let model;
const loader = new THREE.GLTFLoader();
loader.load("../asset/formula_e.glb", function(gltf){
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
    model.scale.set(2, 2, 2); // ou essaye (0.5, 0.5, 0.5) selon le modèle
    camera.position.set(3.5, 1.5, 5);  // Vue légèrement à gauche (x = -3), en hauteur (y = 2), en recul (z = 5)
    camera.lookAt(-2, 0, 0);         // Centre du modèle
     // regarde vers le centre de la scène

    //playInitialAnimation();
    //cancelAnimationFrame(basicAnimation);
    //animate();


});


});
document.addEventListener("DOMContentLoaded", () => {
const lenis = new Lenis();
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((time)=>{
    lenis.raf(time * 1000);
})
gsap.ticker.lagSmoothing(0)

const scene = new THREE.Scene();


const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth/2 / window.innerHeight,
    0.1,
    1000
)
const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
})
const box3 = document.querySelector(".catégorie-card")
const rect_box3 = box3.getBoundingClientRect();
renderer.setClearColor(0x000000, 0);  // fond transparent (alpha = 0)
renderer.setSize(rect_box3.width,400);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.physicallyCorrectLights = true;
renderer.tonMapping = THREE.ACESFilmicToneMapping;
renderer.tonMappingExposure = 2.5;
document.querySelector(".model_kart").appendChild(renderer.domElement)

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const mainLight = new THREE.DirectionalLight(0xffffff,1);
mainLight.position.set(5,10,7.5);
scene.add(mainLight)

const fillLight = new THREE.DirectionalLight(0xffffff,3);
fillLight.position.set(-5,0,-5);
scene.add(fillLight)

const hemiLight = new THREE.HemisphereLight(0xffffff,2);
hemiLight.position.set(0,25,0);
scene.add(hemiLight)

const topLight = new THREE.DirectionalLight(0xffffff, 10); // blanc, intensité 1
topLight.position.set(0, 10, 0); // positionnée 10 unités au-dessus (Y=10)
topLight.target.position.set(2, 2, 2); // dirigée vers le centre de la scène (la voiture)
scene.add(topLight);
scene.add(topLight.target); // important pour que la cible soit prise en compte

//const gui = new lil.GUI();
//
//const cameraFolder = gui.addFolder('Camera Position');
//cameraFolder.add(camera.position, 'x', -100, 100).step(0.1);
//cameraFolder.add(camera.position, 'y', -100, 100).step(0.1);
//cameraFolder.add(camera.position, 'z', -100, 300).step(0.1);
//cameraFolder.open();
function basicAnimation(){
   
    renderer.render(scene, camera);
    requestAnimationFrame(basicAnimation);
}
basicAnimation()
let model;
const loader = new THREE.GLTFLoader();
loader.load("../asset/karting.glb", function(gltf){
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
    model.scale.set(0.5, 0.5, 0.5); // ou essaye (0.5, 0.5, 0.5) selon le modèle
    camera.position.set(100, -7, 198);  // Vue légèrement à gauche (x = -3), en hauteur (y = 2), en recul (z = 5)
    camera.lookAt(-2, 0, 0);       // regarde vers le centre de la scène

    //playInitialAnimation();
    //cancelAnimationFrame(basicAnimation);
    //animate();




});




});