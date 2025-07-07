export function animatePilote(){

  const images = document.querySelectorAll(".img_r");

  images.forEach(imgWrapper => {
    imgWrapper.addEventListener("click", () => {
      const img = imgWrapper.querySelector("img");
      const name = imgWrapper.dataset.name;
      const description = imgWrapper.dataset.description;

    

          document.querySelector(".pilot-detail")?.remove();

          const container = document.createElement("div");
          container.className = "pilot-detail";

          const newImg = document.createElement("img");
          newImg.src = img.src;
          newImg.alt = name;

          const text_div = document.createElement("div");
          text_div.classList.add("text_div")
          const newTitle = document.createElement("h1");
          newTitle.textContent = name;

          const newDescription = document.createElement("p");
          newDescription.textContent = description;

          container.appendChild(newImg);
          container.appendChild(text_div);
          text_div.appendChild(newTitle);
          text_div.appendChild(newDescription);
          document.body.appendChild(container);

           // 👇 Ajout : clic sur la carte pour la fermer
          container.addEventListener("click", () => {
            container.remove();
          });
          // Attente nécessaire pour éviter que le clic initial ne ferme instantanément
          setTimeout(() => {
            function handleOutsideClick(e) {
              if (!container.contains(e.target)) {
                container.remove();
                document.removeEventListener("click", handleOutsideClick);
              }
            }
            document.addEventListener("click", handleOutsideClick);
          }, 0);
          
    
      
    });
  });
}