export default class MMarketsSlot extends HTMLElement{ 

    constructor(){ 
        super();
        this.oldChild = null;
        this.currentView = null;
        this.root = this.attachShadow({mode:'open'});
    }

    connectedCallback() { 
        this.root.innerHTML = `
        <style>
        slot[name="view"]{
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
        }
        </style>
        <slot name="view">VIEW</slot>
        `;
        document.addEventListener('mm-nav',e => this.onNavigation(e));
        this.oldChild = this.root.querySelector("[name=view]");
    }

    onNavigation(evt) { 
        const { detail } = evt;
        const { hash: linkName } = detail;
        this.loadView(linkName);
    }
    
    async loadView(linkName) { 
        const { default: View } = await import (`./views/${linkName}/${linkName}View.js`)
        const newChild = new View();
        if (this.oldChild) {
            this.root.replaceChild(newChild, this.oldChild);
        } else { 
            this.root.appendChild(newChild);
        }
    
        this.oldChild = newChild;
        this.oldChild.loadViewData();
    }

}

customElements.define('mm-slot',MMarketsSlot);