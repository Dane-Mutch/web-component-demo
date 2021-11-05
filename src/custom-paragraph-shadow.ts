class CustomParagraphShadow extends HTMLElement {
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: "open" });
    const styleElem = document.createElement("style");
    styleElem.innerHTML = `
        * {
          font-size: 2rem;
          color: var(--text-color, red);
        }
    
    `;
    shadowRoot.appendChild(styleElem);
    shadowRoot.appendChild(document.createElement("slot"));
  }
}

window.customElements.define("custom-paragraph-shadow", CustomParagraphShadow);
