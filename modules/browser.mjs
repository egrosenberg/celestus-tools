import hbs from "./import/handlebars.mjs";
import celestus from "../data/celestus.mjs";
import { createRequire } from "module";
import Index from "./Index.mjs";
const require = createRequire(import.meta.url);

const defaultPaths = {
    browser: "templates/browse/parts/_KEY_-browser.hbs",
    list: "templates/browse/parts/_KEY_-list.hbs",
    description: "templates/descriptions/_KEY_-description.hbs"
}

export default class Browser {

    /**
     * @param {String} key for use in generating paths
     * @param {String} jsonPath path to JSON file containing list data
     * @param {Boolean} overrideDescPath should it override description path
     * @returns this. this.err will be present if an error occurs
     */
    constructor(key, jsonPath, overrideDescPath) {
        this.overrideDescPath = overrideDescPath;
        if (!key) {
            throw new Error('INVALID KEY');
        }
        if (!jsonPath) {
            throw new Error('MISSING JSON PATH')
        }
        this.key = key;
        // require json
        this._data = require(jsonPath).data;
        if(!this._data || !this._data.length) {
            throw new Error('INVALID JSON PATH');
        }
        // sort data
        this._data.sort((a, b) => {
            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;
            return 0;
        });
        // add data to index
        for (const entry of this._data) {
            const obj = {
                name: entry.name,
                id: entry._id,
                statuses: entry.system.statusEffects,
                type: this.key
            };
            Index.push(obj);
        }
        // create paths
        this.paths = structuredClone(defaultPaths);
        for (const [k, path] of Object.entries(this.paths)) {
            this.paths[k] = path.replace('_KEY_', this.key);
        }
    }

    
    /**
     * Renders the browser to an html text format
     * @returns {String|undefined} html text or undefined if error
     */
    async render() {
        return await hbs.renderFromTemplate(this.paths.browser, { data: this._data, celestus });
    }

    /**
     * Get HTML description of an item by id
     * @param {String} id of item to get description of
     * @returns {String}
     */
    async description(id) {
        if (!id) return "";
        const item = this._data.find(s => s._id == id);
        if (!item) return "";
        let msgData = {
            name: item.name,
            flavor: item.system.description,
            portrait: item.img,
            item: item,
            system: item.system,
            config: celestus,
        };
    
        const path = this.overrideDescPath ? this.paths.description : `templates/descriptions/${item.type}-description.hbs`;
        const content = await hbs.renderFromTemplate(path, msgData);
    
        return content;
    }

    get list() {
        return this._data;
    }
};