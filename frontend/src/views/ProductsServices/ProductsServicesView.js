import {html,render } from '../../lit-html/lit-html.js';
import ProductsServicesViewTableData from './ProductsServicesViewTableData.js'
import MMarketsElement from '../MMarketsElement.js';
export default class ProductsServicesView extends MMarketsElement {

    constructor() {
        super();
        this.onViewChanged = _ => this.viewChanged();
        this.listenerName = 'mm-products-services';
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
        return await fetch('views/ProductsServices/data.json').then(response => response.json());
    }

    async loadViewData() {
        let tableData = ProductsServicesViewTableData.get();
        if (!tableData) {
            try {
                tableData = await this.fetchTableData();
                const [first] = tableData;
                const keys = Reflect.ownKeys(first);
                for (let row of tableData) {
                    ProductsServicesViewTableData.add(...keys.map(key => row[key]));
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
                        <th>Date</th><th>Company</th><th>Type</th><th>Title</th><th>Summary Text</th><th>Details</th>
                    </tr>
                </thead>
                <tbody>
                ${ProductsServicesViewTableData.all().map(({ date, org, type, title, summary, details }) =>
            html`
                <tr>
                <td>${org}</td><td>${date}</td><td>${org}</td><td>${type}</td><td>${title}</td><td>${summary}</td><td>${details}</td>
                </tr>
            `
            )}
            </tbody>
            </table>
        `;
    }

}

customElements.define('products-services-view', ProductsServicesView);