export default class LandingViewTableData {

    static add(org, product, news, event, people) {
        const { localStorage } = window;
        const rowData = {
            org,
            product,
            news,
            event,
            people
        };
        const stringified = JSON.stringify(rowData);
        localStorage.setItem(`landingViewTableData.${org}`, stringified);
    }

    static getWithoutPrefix(org) {
        const stringified = localStorage.getItem(org);
        return JSON.parse(stringified);
    }

    static get(org) {
        return LandingViewTableData.getWithoutPrefix(`landingViewTableData.${org}`);
    }

    static remove(org) {
        localStorage.removeItem(`landingViewTableData.${org}`);
    }

    static all() {
        const all = { ...localStorage };
        return Object.keys(all).
            filter(key => key.startsWith('landingViewTableData.')).
            map(key => LandingViewTableData.getWithoutPrefix(key));
    }

}