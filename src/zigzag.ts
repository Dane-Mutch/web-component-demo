class Zigzag extends HTMLElement {
  connectedCallback() {
    const style = document.createElement("style");
    style.innerHTML = `
      zig-zag { 
        height: 100px;
        width: 100%;
        display: flex;
        justify-content: center;
      }

      zig-zag > *:nth-child(odd) { 
        align-self: start;
      }

      zig-zag > *:nth-child(even) { 
        align-self: end;
      }
    `;
    this.appendChild(style);
  }
}

window.customElements.define("zig-zag", Zigzag);
