import {html,render } from '../../lit-html/lit-html.js';
import LandingViewTableData from './LandingViewTableData.js'
import MMarketsElement from '../MMarketsElement.js';
export default class LandingView extends MMarketsElement {

    constructor() {
        super();
        this.onViewChanged = _ => this.viewChanged();
        this.listenerName = 'mm-landing';
     }

    connectedCallback() {
        this.addEventListener(this.listenerName,this.onViewChanged() );
        this.viewChanged();
    }

    disconnectedCallback() {
        console.log('cleanup');
        this.removeEventListener(this.listenerName,this.onViewChanged());
    }

    fetchTableData() {
        return new Promise((resolve, reject) => {
            resolve(this.fetchFromServer());
        });
    }

    async fetchFromServer() {
        return await fetch('views/Landing/data.json').then(response => response.json());
    }

    async loadViewData() {
        let tableData = LandingViewTableData.get();
        if (!tableData) {
            try {
                tableData = await this.fetchTableData();
                const [first] = tableData;
                const keys = Reflect.ownKeys(first);
                for (let row of tableData) {
                    LandingViewTableData.add(...keys.map(key => row[key]));
                }
            } catch (e) {
                console.error(`error happened: ${e}`);
            }
        }
    }

    createView() {
        return html `
        <style>
         header{
             background: var(--mm-brown, red);
         }
        </style>
            <header>
            <h2>HCM Market</h2>
            </header>
            <table>
                <thead>
                    <tr>
                        <th/><th>Product & Services</th><th>News</th><th>Events</th><th>People</th>
                    </tr>
                </thead>
                <tbody>
                ${LandingViewTableData.all().map(({ org, product, news, event, people }) =>
            html`
                <tr>
                <td>${org}</td><td>${product}</td><td>${news}</td><td>${event}</td><td>${people}</td>
                </tr>
            `
            )}
            </tbody>
            </table>
        `;
    }

}

customElements.define('landing-view', LandingView);