import LandingView from './views/LandingView.js';

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
        this.currentView = linkName;
        this.loadView(linkName);
    }
    
    async loadView(linkName) { 
        let newChild;
        switch (linkName) { 
            case 'Dashboard':
                newChild = new LandingView();
                break;
            case 'Products':
                newChild = new LandingView();
                break;
            default:
                throw new Error(`Unknown route: ${linkName}`);
        }

            if (this.oldChild) {
                this.root.replaceChild(newChild, this.oldChild);
            } else { 
                this.root.appendChild(newChild);
            }
    
        this.oldChild = newChild;
    }

}

customElements.define('mm-slot',MMarketsSlot);