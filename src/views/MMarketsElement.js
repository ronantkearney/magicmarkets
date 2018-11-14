import { render } from '../lit-html/lit-html.js';
export default class MMarketsElement extends HTMLElement { 
    constructor() { 
        super();
        this.root = this.attachShadow({mode:'open'});
    }

    viewChanged() { 
        render(this.createView(),this.root);
    }
}