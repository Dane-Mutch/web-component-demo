class Spongebob extends HTMLElement {
  image!: HTMLImageElement;
  connectedCallback() {
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes triggered { 
        0% {transform: rotate(0)}
        50% {transform: rotate(15deg)}
        100% {transform: rotate(0)}
      }

      .image { 
        display: block;
        margin: 0px auto;
        width: 50%;
        height: 50%;
      }

      .triggered { 
        animation-name: triggered;
        animation-duration: 0.05s;
        animation-iteration-count: infinite;
      }

      .small { 
        width: 5%;
        height: 5%;
      }
    `;
    this.prepend(style);
    const image = document.createElement("img");
    this.image = image;
    image.setAttribute(
      "src",
      "https://www.looper.com/img/uploads/2016/08/SpongeBob.jpg"
    );

    image.className = "image";

    if (this.hasAttribute("triggered")) {
      image.classList.toggle("triggered");
      image.classList.toggle("small");
    }
    this.appendChild(image);
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name === "triggered") {
      console.log("Triggered has changed");
      this.image.classList.toggle("triggered");
      this.image.classList.toggle("small");
    }
  }

  static get observedAttributes() {
    return ["triggered"];
  }
}

window.customElements.define("sponge-bob", Spongebob);
