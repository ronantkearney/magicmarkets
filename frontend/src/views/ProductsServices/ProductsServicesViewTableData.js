export default class ProductsServicesViewTableData {

    static add(org, date, type, title, summary, details) {
        const { localStorage } = window;
        const rowData = { 
            org, 
            date, 
            type, 
            title, 
            summary, 
            details
        };
        const stringified = JSON.stringify(rowData);
        localStorage.setItem(`productsServicesViewTableData.${org}`, stringified);
    }

    static getWithoutPrefix(org) {
        const stringified = localStorage.getItem(org);
        return JSON.parse(stringified);
    }

    static get(org) {
        return ProductsServicesViewTableData.getWithoutPrefix(`productsServicesViewTableData.${org}`);
    }

    static remove(org) {
        localStorage.removeItem(`productsServicesViewTableData.${org}`);
    }

    static all() {
        const all = { ...localStorage };
        return Object.keys(all).
            filter(key => key.startsWith('productsServicesViewTableData.')).
            map(key => ProductsServicesViewTableData.getWithoutPrefix(key));
    }

}