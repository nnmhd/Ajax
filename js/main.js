(() => {
  //variables
  const hotspots = document.querySelectorAll(".Hotspot");
  const materialList = document.querySelector("#material-list");
  const materialTemplate = document.querySelector("#material-template");
  const loading = document.querySelector("#loading-animation");
  const errorCont = document.querySelector("#error-box");

  //This information needs to be removed then pulled with an AJAX Call using the Fetch API
  //this is the api url https://swiftpixel.com/earbud/api/infoboxes"

  //This information needs to be removed then pulled with an AJAX Call using the Fetch API
  //this is the api url https://swiftpixel.com/earbud/api/materials"

  //functions
  function loadInfoBoxes() {
    fetch("https://swiftpixel.com/earbud/api/infoboxes")
      .then((response) => response.json())
      .then((infoBoxes) => {
        infoBoxes.forEach((infoBox, index) => {
          let selected = document.querySelector(`#hotspot-${index + 1}`);

          const titleElement = document.createElement("h2");
          titleElement.textContent = infoBox.heading;

          const textElement = document.createElement("p");
          textElement.textContent = infoBox.description;

          const imgElement = document.createElement("img");
          imgElement.src = `images/earbud${index + 1}.jpg`;
          imgElement.alt = infoBox.heading;

          selected.appendChild(imgElement);
          selected.appendChild(titleElement);
          selected.appendChild(textElement);
        });
      })
      .catch((error) => {
        console.log(error);
        for (let i = 1; i <= 10; i++) {
          const selected = document.querySelector(`#hotspot-${i}`);
          if (selected) {
            const errorMessage = document.createElement("p");
            errorMessage.textContent = `Oops, something went wrong. Please check or try again later. ${error.message}`;
            selected.appendChild(errorMessage);
          }
        }
      });
  }

  loadInfoBoxes();

  function loadMaterialInfo() {
    fetch("https://swiftpixel.com/earbud/api/materials")
      .then((response) => response.json())
      .then((materialListData) => {
        materialListData.forEach((material) => {
          // clone the template
          const clone = materialTemplate.content.cloneNode(true);
          // populate template
          const materialHeading = clone.querySelector(".material-heading");
          materialHeading.textContent = material.heading;

          const paragraphDescription = clone.querySelector(
            ".material-description"
          );
          paragraphDescription.textContent = material.description;

          materialList.appendChild(clone);
        });

        loading.classList.toggle("hidden");
      })
      .catch((error) => {
        console.log(error);
        const errorMessage = document.createElement("p");
        errorMessage.textContent = `Oops, something went wrong. Please check or try again later. ${error}`;
        materialList.appendChild(errorMessage);
      });
  }

  loadMaterialInfo();

  function showInfo() {
    let selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, 1, { autoAlpha: 1 });
  }

  function hideInfo() {
    let selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, 1, { autoAlpha: 0 });
  }

  //Event listeners

  hotspots.forEach(function (hotspot) {
    hotspot.addEventListener("mouseenter", showInfo);
    hotspot.addEventListener("mouseleave", hideInfo);
  });
})();
