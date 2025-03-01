import hbs from "./import/handlebars.mjs";
import celestus from "../data/celestus.mjs";
import Index from "./Index.mjs";

export default class Content {
    /**
     * Constructor
     * @param {String} key 
     * @param {String} title of content page
     */
    constructor(key, title) {
        this.key = key;
        this.title = title;
        Index.push({
            name: this.title,
            id: this.key,
            type: "content"
        });
    }

    /**
     * Renders the content body to an html text format
     * @returns {String|undefined} html text or undefined if error
     */
    async render() {
        return await hbs.renderFromTemplate(`templates/content/${this.key}.hbs`, { config: celestus });
    }
}