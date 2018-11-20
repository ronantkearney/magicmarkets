import {html,render } from '../lit-html/lit-html.js';
import LandingViewTableData from './LandingViewTableData.js'
import MMarketsElement from './MMarketsElement.js';
export default class LandingView extends MMarketsElement {

    constructor() {
        super();
        this.onViewChanged = _ => this.viewChanged();
        this.listenerName = 'mm-landing';
        this.tableData = this.getTableData();
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
        console.log("fetching Table Data");
        return new Promise((resolve, reject) => {
            resolve(this.fetchFromServer());
        });
    }

    async fetchFromServer() {
        return await fetch('answer.json').then(response => response.json());
    }

    async getTableData() {
        console.log('getTableData');
        let tableData = LandingViewTableData.get();
        if (!tableData) {
            try {
                console.log('fetchTableData');
                tableData = await this.fetchTableData();
                console.log(tableData);
                const [first] = tableData;
                console.log(first);
                const keys = Reflect.ownKeys(first);
                console.log(keys);
                for (let row of tableData) {
                    console.log(keys.map(key => row[key]));
                    LandingViewTableData.add(keys.map(key => row[key]));
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