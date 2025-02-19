import { loadTextFile } from "./files.mjs";
import Handlebars from "handlebars";

/**
 * Renders a handlebars template from a url
 * @param {String} url path to handlebars template file
 * @param {Object?} data to use for rendering handlebars template
 * @returns {Promise} rendered handlebars remplate
 */
async function renderFromTemplate(url, data = {}) {
    const content = await loadTextFile(url);
    const template = Handlebars.compile(content);
    return template(data);
}

export default {
    renderFromTemplate
}