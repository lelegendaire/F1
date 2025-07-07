
import {
simulationVertexShader,
simulationFragmentShader,
renderVertexShader,
renderFragmentShader,
} from "./shader.js";

document.addEventListener("DOMContentLoaded", () => {
const scene = new THREE.Scene();
const simScene = new THREE.Scene();
const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

const renderer = new THREE.WebGLRenderer({
antialias: true,
alpha: true,
preserveDrawingBuffer: true,
});



document.querySelector(".outro").appendChild(renderer.domElement);

const mouse = new THREE.Vector2();
let frame = 0;

const outro = document.querySelector(".outro");
const bounds = outro.getBoundingClientRect();
const width = bounds.width * window.devicePixelRatio;
const height = bounds.height * window.devicePixelRatio;
renderer.setSize(bounds.width, bounds.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
const options = {
format: THREE.RGBAFormat,
type: THREE.FloatType,
minFilter: THREE.LinearFilter,
magFilter: THREE.LinearFilter,
stencilBuffer: false,
depthBuffer: false,
};

let rtA = new THREE.WebGLRenderTarget (width, height, options); 
let rtB = new THREE.WebGLRenderTarget (width, height, options);
const simMaterial = new THREE.ShaderMaterial({
uniforms: {
textureA: { value: null },
mouse: { value: mouse },
resolution: { value: new THREE.Vector2(width, height) },
time: {value: 0},
frame: {value: 0},
},
vertexShader: simulationVertexShader,
fragmentShader: simulationFragmentShader,
});

const renderMaterial = new THREE.ShaderMaterial({
uniforms: {

textureA: { value: null },
textureB: { value: null },
},
vertexShader: renderVertexShader,
fragmentShader: renderFragmentShader,
transparent: true,
});

const plane = new THREE. PlaneGeometry (2, 2);
const simQuad = new THREE.Mesh(plane, simMaterial);
const renderQuad = new THREE.Mesh(plane, renderMaterial);
simScene.add(simQuad);
scene.add(renderQuad);
const canvas = document.createElement("canvas");

canvas.width = width;
canvas.height = height;
const ctx = canvas.getContext("2d", { alpha: true });
const patternSize = 30;
const dotRadius = 1.5;
const dotColor = "rgba(28, 26, 26, 0.17)";

// Remplissage fond
ctx.fillStyle = "#fff";
ctx.fillRect(0, 0, width, height);

// Dessin du motif
ctx.fillStyle = dotColor;
for (let y = 0; y < height; y += patternSize) {
  for (let x = 0; x < width; x += patternSize) {
    ctx.beginPath();
    ctx.arc(x - 5, y - 5, dotRadius, 0, Math.PI * 2); // Position ajustée comme CSS : -5px -5px
    ctx.fill();
  }
}

const fontSize = Math.round(150 * window.devicePixelRatio);
ctx.fillStyle = "#ec0204";
ctx.font = `${fontSize}px Formula1-Black`

ctx.textAlign = "center";
ctx.textBaseline = "middle";
ctx.textRendering = "geometricPrecision"; ctx.imagesmoothingEnabled = true;
ctx.imagesmoothingQuality = "high";
ctx.fillText("FORMULA 1", width / 2, height / 2);
const textTexture = new THREE.CanvasTexture(canvas);
textTexture.minFilter = THREE.LinearFilter; 
textTexture.magFilter = THREE.LinearFilter; 
textTexture.format = THREE.RGBAFormat;

window.addEventListener("resize", () => {

const newWidth = window.innerWidth * window.devicePixelRatio;
const newHeight = window.innerHeight * window.devicePixelRatio;

renderer.setSize(window.innerWidth, window.innerHeight);
rtA.setSize(newWidth, newHeight);
rtB.setSize(newWidth, newHeight);


simMaterial.uniforms.resolution.value.set(newWidth, newHeight);


canvas.width = newWidth;

canvas.height = newHeight;

ctx.fillstyle = "#fb7427";

ctx.fillRect(0, 0, newWidth, newHeight);
const newFontSize = Math.round(100* window.devicePixelRatio); ctx.fillStyle = "#fef4b8";

ctx.font= `${newFontSize}px Formula1-Black`;

ctx.textAlign = "center";

ctx.textBaseline = "middle";

ctx.fillText("FORMULA 1", newWidth / 2, newHeight / 2);

textTexture.needsUpdate = true;

});

renderer.domElement.addEventListener("mousemove", (e) => {
    const bounds = outro.getBoundingClientRect(); // position relative à la fenêtre
    const scrollY = window.scrollY || window.pageYOffset; // position de scroll

    const localX = e.clientX - bounds.left;
    const localY = e.clientY - bounds.top;

    mouse.x = localX * window.devicePixelRatio;
    mouse.y = (bounds.height - localY) * window.devicePixelRatio;

});

renderer.domElement.addEventListener("mouseleave", () => {
    mouse.set(0,0);
});
const animate = () => {

simMaterial.uniforms.frame.value = frame++;
simMaterial.uniforms.time.value = performance.now() / 1000;

simMaterial.uniforms.textureA.value = rtA.texture;
renderer.setRenderTarget (rtB);
renderer.render(simScene, camera);

renderMaterial.uniforms.textureA.value = rtB.texture;
renderMaterial.uniforms.textureB.value = textTexture;
renderer.setRenderTarget (null);
renderer.render(scene, camera);

const temp = rtA;
rtA =rtB;
rtB = temp;

requestAnimationFrame(animate)
};
animate();

});