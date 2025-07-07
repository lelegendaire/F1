import { logoData } from "./logo.js";




gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
    const lenis = new Lenis();
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => {
  if (document.hasFocus()) lenis.raf(time * 1000);
});

    gsap.ticker.lagSmoothing(0)

    const heroImgContainer = document.querySelector(".hero_img_container");
    const heroImgLogo = document.querySelector(".hero_img_logo");
    const heroImgCopy = document.querySelector(".hero_img_copy");
    const fadeOverlay = document.querySelector(".fade_overlay");
    const svgOverlay = document.querySelector(".overlay");
    const overlayCopy = document.querySelector(".overlay_copy h1");
    
    const initialOverlayScale = 350;
    const logoContainer = document.querySelector(".logo_container");
    const logoMask = document.getElementById("logoMask");
    logoMask.setAttribute("d", logoData)

    const logoDimensions = logoContainer.getBoundingClientRect();
    const logoBoundingBox = logoMask.getBBox();
    const horizontalScaleRatio = logoDimensions.width / logoBoundingBox.width
    const verticalScaleRatio = logoDimensions.height / logoBoundingBox.height

    const logoScaleFacter = Math.min(horizontalScaleRatio, verticalScaleRatio) ;

    const logoHorizontalPosition = logoDimensions.left + (logoDimensions.width - logoBoundingBox.width * logoScaleFacter) / 2 - logoBoundingBox.x * logoScaleFacter;
    const logoVerticalPosition = logoDimensions.top + (logoDimensions.height - logoBoundingBox.height * logoScaleFacter) / 2 - logoBoundingBox.y * logoScaleFacter;
    
    logoMask.setAttribute("transform", `translate(${logoHorizontalPosition}, ${logoVerticalPosition+99}) scale(${logoScaleFacter}, -${logoScaleFacter})`)

    ScrollTrigger.create({
        trigger: ".hero",
        start: "top top",
        end: `${window.innerHeight * 5}px`,
        pin: true,
        pinSpacing: true,
        scrub: 1,
        onUpdate: (self) => {
            const scrollProgress = self.progress;
            const fadeOpacity = 1 - scrollProgress * (1 / 0.15);

            if(scrollProgress <= 0.15){
                gsap.set([heroImgLogo, heroImgCopy], {
                    opacity: fadeOpacity
                });
            } else {
                gsap.set([heroImgLogo, heroImgCopy], {
                    opacity: 0,
                })
            }
            if(scrollProgress <= 0.85){
                const normalizedProgress = scrollProgress * (1 / 0.85);
                const heroImgContainerScale = 1.5 -0.5 * normalizedProgress;
                const overlayScale = initialOverlayScale * Math.pow(1 / initialOverlayScale, normalizedProgress);
                let fadeOverlayOpacity = 0;
                
                gsap.set(heroImgContainer, {
                    scale: heroImgContainerScale,

                });
                 
                gsap.set(svgOverlay,{
                    scale: overlayScale,
                });
                if (scrollProgress >= 0.25){
                    fadeOverlayOpacity = Math.min(1, (scrollProgress - 0.25) * (1 /0.4));
                }
                gsap.set(fadeOverlay,{
                    opacity: fadeOverlayOpacity
                })
                if(scrollProgress >= 0.6 && scrollProgress <= 0.85){
                    const overlayCopyRevealProgress = (scrollProgress - 0.6) * (1/ 0.25);

                    const gradientSpread = 100;
                    const gradientBottomPosition = 240 - overlayCopyRevealProgress *280;
                    const gradientTopPosition = gradientBottomPosition- gradientSpread;
                    const overlayCopyScale = 1.25 - 0.25 * overlayCopyRevealProgress;

                    overlayCopy.style.background = `linear-gradient(to bottom, #000 0%, #000 ${gradientTopPosition}%, #e66461 ${gradientBottomPosition}%, #e66461 100%)`;
                    overlayCopy.style.backgroundClip = "text";

                    gsap.set(overlayCopy,{
                        scale: overlayCopyScale,
                        opacity: overlayCopyRevealProgress,
                    });



                } else if(scrollProgress < 0.6) {
                    gsap.set(overlayCopy,{
                        opacity: 0,
                    })

                }
            }
        },
    })
    let hasLoadedPilote = false;

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !hasLoadedPilote) {
      hasLoadedPilote = true;
      import('./animatePilote.js')
        .then(({ animatePilote }) => animatePilote())
        .catch(err => console.error("Erreur de chargement :", err));
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const piloteSection = document.querySelector(".Pilote");
if (piloteSection) {
  observer.observe(piloteSection);
}
    let hasLoadedTimeline = false;

const observerT = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !hasLoadedTimeline) {
      hasLoadedTimeline = true;
      import('./animateTimeline.js')
        .then(({ animateTimeline }) => animateTimeline())
        .catch(err => console.error("Erreur de chargement :", err));
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const TimelineSection = document.querySelector(".timeline");
if (TimelineSection) {
  observerT.observe(TimelineSection);
}
   let hasLoadedCircuit = false;
const observerC = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !hasLoadedCircuit) {
      hasLoadedCircuit = true;
      import('./animateCircuit.js')
        .then(({ animateCircuit }) => animateCircuit())
        .catch(err => console.error("Erreur de chargement :", err));
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const CircuitSection = document.querySelector(".Circuit_monaco");
if (CircuitSection) {
  observerC.observe(CircuitSection);
}
   let hasLoadedFAQ = false;

const observerF = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !hasLoadedFAQ) {
      hasLoadedFAQ = true;
      import('./animateFAQ.js')
        .then(({ animateFAQ }) => animateFAQ())
        .catch(err => console.error("Erreur de chargement :", err));
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const FAQSection = document.querySelector(".FAQ");
if (FAQSection) {
  observerF.observe(FAQSection);
}
  let hasLoadedModelCar = false;
const observerMC = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !hasLoadedModelCar) {
      hasLoadedModelCar = true;
      import('./animateModelCar.js')
        .then(({ animateModelCar }) => animateModelCar())
        .catch(err => console.error("Erreur de chargement :", err));
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const ModelCarSection = document.querySelector(".Voiture");
if (ModelCarSection) {
  observerMC.observe(ModelCarSection);
}

   
    animateMomentHist(lenis)
   
 
})


function animateMomentHist(lenis){

   
    const targetSection = document.querySelector(".Moment_historique");
    const images = [];
    let loadedImageCount = 0;
    let hasStarted = false;

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasStarted) {
                hasStarted = true;
                loadImages(); // va appeler initializeScene au bon moment
                observer.unobserve(targetSection);
            }
        });
    }, {
        threshold: 0.3
    });

    observer.observe(targetSection);
    
    function loadImages(){
        for (let i = 1; i <= 7; i++){
            const img = new Image();
            img.onload = function (){
                images.push(img);
                loadedImageCount++;

                if(loadedImageCount === 7){
                    initializeScene();
                }
            };
            img.onerror = function (){
                loadedImageCount++;
                if(loadedImageCount === 7){
                    initializeScene();
                }

            };
            img.src = `./asset/image_${i}.jpg`;
        }
    }

    function initializeScene(){

        const scene2 = new THREE.Scene();
        const camera2 = new THREE.PerspectiveCamera(45,window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer2 = new THREE.WebGLRenderer({canvas: document.getElementById("canva_moment_historique"),antialias: true,powerPreference: "high-performance",})
        renderer2.setSize(window.innerWidth, window.innerHeight);
        renderer2.setPixelRatio(Math.min(window.devicePixelRatio,2));
        renderer2.setClearColor(0x000000);
        renderer2.state.reset(); // reset l’état WebGL entre deux renders

        const parentWidth = 20;
        const parentHeight = 75;
        const curvature = 35;
        const segmentsX = 200;
        const segmentsY = 200;

        const parentGeometry = new THREE.PlaneGeometry(parentWidth,parentHeight,segmentsX,segmentsY);
        const positions = parentGeometry.attributes.position.array;
        for (let i = 0; i < positions.length; i += 3){
            const y = positions[i +1];
            const distanceFromCenter = Math.abs(y / (parentHeight / 2));
            positions[i+2] = Math.pow(distanceFromCenter, 2) * curvature;
        }
        parentGeometry.computeVertexNormals();

        const totalSlides = 7;
        const slideHeight = 15;
        const gap = 0.5;
        const cycleHeight = totalSlides * (slideHeight + gap);

        const textureCanvas = document.createElement("canvas");
        const ctx = textureCanvas.getContext("2d", {
            alpha: false,
            willReadFrequently: false,
        });
        textureCanvas.width = 2048;
        textureCanvas.height = 8192;

        const texture = new THREE.CanvasTexture(textureCanvas);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.anisotropy = Math.min(4, renderer2.capabilities.getMaxAnisotropy());

        const parentMaterial = new THREE.MeshBasicMaterial({
            map: texture,
            side: THREE.DoubleSide,
        });

        const parentMesh = new THREE.Mesh(parentGeometry, parentMaterial);
        parentMesh.position.set(0,0,0);
        parentMesh.rotation.x = THREE.MathUtils.degToRad(-20);
        parentMesh.rotation.y = THREE.MathUtils.degToRad(20);
        scene2.add(parentMesh);

        const distance = 17.5;
        const heightOffset = 5;
        const offsetX = distance * Math.sin(THREE.MathUtils.degToRad(20));
        const offsetZ = distance * Math.cos(THREE.MathUtils.degToRad(20));
        
        camera2.position.set(offsetX, heightOffset, offsetZ);
        camera2.lookAt(0,-2,0);
        camera2.rotation.z = THREE.MathUtils.degToRad(-5);

        const slideTiltes = [
            "Duel Prost/Senna (1989-1990)",
            "Victoire de Gasly à Monza en 2020",
            "Premier titre de Hamilton en 2008",
            "Trois pilotes en un point – Raikkonen champion",
            "Le duel Hunt vs Lauda",
            "Dernier virage, dernier tour pour Hamilton",
            "Grosjean survit à un crash apocalyptique à Bahreïn",
        ];

        function updateTexture(offset = 0){
            ctx.fillStyle = "#000";
            ctx.fillRect(0,0, textureCanvas.width, textureCanvas.height);

            const fontSize = 70;
            ctx.font = `500 ${fontSize}px Formula1-Regular`;
            ctx.textAlign = "center";
            ctx.textBaseline = "bottom";

            const extraSlides = 2;
            for (let i = -extraSlides; i < totalSlides + extraSlides; i++){
                let slideY = -i * (slideHeight + gap);
                slideY += offset * cycleHeight;

                const textureY = (slideY / cycleHeight) * textureCanvas.height;
                let wrappedY = textureY % textureCanvas.height;
                if (wrappedY < 0) wrappedY += textureCanvas.height;

                let slideIndex = ((-i % totalSlides) + totalSlides) % totalSlides;
                let slideNumber = slideIndex + 1;

                const slideRect = {
                    x: textureCanvas.width * 0.05,
                    y: wrappedY,
                    width: textureCanvas.width * 0.9,
                    height: (slideHeight / cycleHeight) * textureCanvas.height,
                };

                const img = images[slideNumber - 1];
                if (img){
                    const imgAspect = img.width / img.height;
                    const rectAspect = slideRect.width / slideRect.height;
                    let drawWidth, drawHeight, drawX, drawY;
                    if (imgAspect > rectAspect){
                        drawHeight = slideRect.height;
                        drawWidth = drawHeight * imgAspect;
                        drawX = slideRect.x + (slideRect.width - drawWidth) / 2;
                        drawY = slideRect.y
                    } else {
                        drawWidth = slideRect.width;
                        drawHeight = drawWidth / imgAspect;
                        drawX = slideRect.x;
                        drawY = slideRect.y + (slideRect.height - drawHeight) / 2;
                    }
                    ctx.save();
                    ctx.beginPath();
                    ctx.roundRect(slideRect.x, slideRect.y, slideRect.width, slideRect.height);
                    ctx.clip();
                    ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
                    ctx.restore();

                    ctx.fillStyle = "white";
                    ctx.fillText(
                        slideTiltes[slideIndex],
                        textureCanvas.width / 2,
                        wrappedY + slideRect.height + 10,
                    );
                }
            }
            texture.needsUpdate = true;

        }

        let currentOffset = 0;
let needsUpdate = true;

function renderLoop() {
    if (needsUpdate) {
        updateTexture(-currentOffset);
        renderer2.render(scene2, camera2);
        needsUpdate = false;
    }
    requestAnimationFrame(renderLoop);
}
renderLoop();
        
        let resizeTimeout; 
        window.addEventListener("resize", ()=>{
            if(resizeTimeout) clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(()=>{
                camera2.aspect = window.innerWidth / window.innerHeight;
                camera2.updateProjectionMatrix();
                renderer2.setSize(window.innerWidth, window.innerHeight);

            },250)
        });
        lenis.on("scroll", ({ scroll, limit }) => {
    currentOffset = (scroll / limit) * 5;
    needsUpdate = true;
});

ScrollTrigger.create({
    trigger: targetSection,
    start: "top top",
    end: `${window.innerHeight * 5}px`,
    pin: true,
    scrub: true,
    onUpdate: (self) => {
        currentOffset = self.progress;
        needsUpdate = true;
    }
});

        // Resize
        window.addEventListener("resize", () => {
            camera2.aspect = window.innerWidth / window.innerHeight;
            camera2.updateProjectionMatrix();
            renderer2.setSize(window.innerWidth, window.innerHeight);
        });

        updateTexture(0);
        renderer2.render(scene2, camera2);
    }



}





