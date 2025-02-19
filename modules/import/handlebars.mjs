import { loadTextFile } from "./files.mjs";
import Handlebars from "handlebars";

/**
 * Registers system-wide handlebars helpers
 */
function registerHelpers() {
    Handlebars.registerHelper('eq', function(arg1, arg2) {
        return (arg1 === arg2);
    });
}

/**
 * Renders a handlebars template from a url
 * @param {String} url path to handlebars template file
 * @param {Object?} data to use for rendering handlebars template
 * @returns {Promise} rendered handlebars remplate
 */
async function renderFromTemplate(url, data = {}) {
    try {
        const content = await loadTextFile(url);
        const template = Handlebars.compile(content);
        return template(data);
    } catch (error) {
        return console.error(error);
    }
}

/**
 * Registers handlebar partials from a list of strings
 * @param {String[]} urls to load partials from
 */
async function loadPartials(urls) {
    for (const url of urls) {
        const content = await loadTextFile(url);
        Handlebars.registerPartial(url, content);
    }
}

export default {
    renderFromTemplate,
    loadPartials,
    registerHelpers
}