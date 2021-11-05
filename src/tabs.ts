let selected_: boolean | null = null;

customElements.define(
  "fancy-tabs",
  class extends HTMLElement {
    tabs: any;
    panels: any;
    _selected: any;
    boundOnTitleClick: (e: any) => void;
    boundOnKeyDown: (e: any) => void;
    connectedCallback() {
      // Create shadow DOM for the component.
      let shadowRoot = this.attachShadow({ mode: "open" });
      shadowRoot.innerHTML = `
      <style>
        :host {
          display: inline-block;
          width: 650px;
          font-family: 'Roboto Slab';
          contain: content;
        }
        :host([background]) {
          background: var(--background-color, #9E9E9E);
          border-radius: 10px;
          padding: 10px;
        }
        #panels {
          box-shadow: 0 2px 4px rgba(0, 0, 0, .3);
          background: white;
          border-radius: 3px;
          padding: 16px;
          height: 250px;
          overflow: auto;
        }
        #tabs {
          display: inline-flex;
          -webkit-user-select: none;
          user-select: none;
        }
        #tabs slot {
          display: inline-flex; /* Safari bug. Treats <slot> as a parent */
        }
  
        #tabs ::slotted(*) {
          font: 400 16px/22px 'Roboto';
          padding: 16px 8px;
          margin: 0;
          text-align: center;
          width: 100px;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          cursor: pointer;
          border-top-left-radius: 3px;
          border-top-right-radius: 3px;
          background: linear-gradient(#fafafa, #eee);
          border: none; /* if the user users a <button> */
        }
        #tabs ::slotted([aria-selected="true"]) {
          font-weight: 600;
          background: white;
          box-shadow: none;
        }
        #tabs ::slotted(:focus) {
          z-index: 1; /* make sure focus ring doesn't get buried */
        }
        #panels ::slotted([aria-hidden="true"]) {
          display: none;
        }
      </style>
      <div id="tabs">
        <slot id="tabsSlot" name="title"></slot>
      </div>
      <div id="panels">
        <slot id="panelsSlot"></slot>
      </div>
    `;
      this.setAttribute("role", "tablist");

      const tabsSlot = this.shadowRoot?.querySelector(
        "#tabsSlot"
      ) as HTMLSlotElement;
      const panelsSlot = this.shadowRoot?.querySelector(
        "#panelsSlot"
      ) as HTMLSlotElement;

      this.tabs = tabsSlot?.assignedNodes({ flatten: true });
      this.panels = panelsSlot
        ?.assignedNodes({ flatten: true })
        .filter((el) => {
          return el.nodeType === Node.ELEMENT_NODE;
        });

      // Add aria role="tabpanel" to each content panel.
      for (let [_i, panel] of this.panels.entries()) {
        panel.setAttribute("role", "tabpanel");
        panel.setAttribute("tabindex", 0);
      }

      // Save reference to we can remove listeners later.
      this.boundOnTitleClick = this.onTitleClick.bind(this);
      this.boundOnKeyDown = this.onKeyDown.bind(this);

      tabsSlot.addEventListener("click", this.boundOnTitleClick);
      tabsSlot.addEventListener("keydown", this.boundOnKeyDown);

      this.selected = this.findFirstSelectedTab() || 0;
    }

    get selected() {
      return selected_;
    }

    set selected(idNumber: any) {
      selected_ = idNumber;
      this.selectTab(idNumber);

      // Updated the element's selected attribute value when
      // backing property changes.
      this.setAttribute("selected", idNumber);
    }

    disconnectedCallback() {
      const tabsSlot = this.shadowRoot?.querySelector("#tabsSlot");
      tabsSlot?.removeEventListener("click", this.boundOnTitleClick);
      tabsSlot?.removeEventListener("keydown", this.boundOnKeyDown);
    }

    onTitleClick(event: any) {
      if (event.target.slot === "title") {
        this.selected = this.tabs.indexOf(event.target);
        event.target.focus();
      }
    }

    onKeyDown(e: any) {
      switch (e.code) {
        case "ArrowUp":
        case "ArrowLeft":
          e.preventDefault();
          var idNumber: number = this.selected - 1;
          idNumber = idNumber < 0 ? this.tabs.length - 1 : idNumber;
          this.tabs[idNumber].click();
          break;
        case "ArrowDown":
        case "ArrowRight":
          e.preventDefault();
          var idNumber: number = this.selected + 1;
          this.tabs[idNumber % this.tabs.length].click();
          break;
        default:
          break;
      }
    }

    findFirstSelectedTab() {
      let selectedidNumber;
      for (let [i, tab] of this.tabs.entries()) {
        tab.setAttribute("role", "tab");

        // Allow users to declaratively select a tab
        // Highlight last tab which has the selected attribute.
        if (tab.hasAttribute("selected")) {
          selectedidNumber = i;
        }
      }
      return selectedidNumber;
    }

    selectTab(idNumber: number | null = null) {
      for (let i = 0, tab; (tab = this.tabs[i]); ++i) {
        let select = i === idNumber;
        tab.setAttribute("tabindex", select ? 0 : -1);
        tab.setAttribute("aria-selected", select);
        this.panels[i].setAttribute("aria-hidden", !select);
      }
    }
  }
);
