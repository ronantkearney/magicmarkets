import {html,render } from '../lit-html/lit-html.js';
import MMarketsElement from './MMarketsElement.js';
export default class LandingView extends MMarketsElement {

    constructor() {
        super();
        this.onViewChanged = _ => this.viewChanged();
        this.listenerName = 'mm-landing';
    }

    connectedCallback() {
        addEventListener(this.listenerName,this.onViewChanged() );
        this.viewChanged();
    }

    disconnectedCallback() {
        console.log('cleanup');
        this.removeEventListener(this.listenerName,this.onViewChanged());
    }

    createView() {
        return html `
        <style>
         header{
             background: var(--mm-brown, red);
         }
        </style>
            <header>
            <h2>the stocks</h2>
            </header>
            <table>
                <thead>
                    <tr>
                        <th>Product & Services</th><th>News</th><th>Events</th><th>People</th>
                    </tr>
                </thead>
            </table>
        `;
    }

}

customElements.define('landing-view', LandingView);