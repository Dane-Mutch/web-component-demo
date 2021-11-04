class CustomParagraph extends HTMLElement {
  connectedCallback() {
    const styleElem = document.createElement("style");
    styleElem.innerHTML = `
        * {
          font-size: 1.5rem;
          color: red;
        }
    
    `;
    this.prepend(styleElem);
  }
}

window.customElements.define("custom-paragraph", CustomParagraph);
