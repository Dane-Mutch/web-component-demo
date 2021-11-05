class CustomParagraph extends HTMLElement {
  connectedCallback() {
    const styleElem = document.createElement("style");
    styleElem.innerHTML = `
        .custom-paragraph {
          font-size: 1.5rem;
          color: red;
        }
    `;
    this.prepend(styleElem);
    this.classList.add("custom-paragraph");
  }
}

window.customElements.define("custom-paragraph", CustomParagraph);
