import hbs from "./import/handlebars.mjs";
import celestus from "../data/celestus.mjs";
import { createRequire } from "module";
const require = createRequire(import.meta.url);

const paths = {
    browser: "templates/skills/browser.hbs",
    list: "templates/skills/list.hbs",
    description: "templates/descriptions/skill-description.hbs"
};

const skillData = require("../data/skills.json").skills;
skillData.sort((a, b) => {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
});

/**
 * Renders the skill browser to an html text format
 * @returns {String} html text
 */
async function render() {
    return await hbs.renderFromTemplate(paths.browser, { skills: skillData, celestus });
}

/**
 * Get HTML description of skill by id
 * @param {String} id of skill to get description of
 * @returns {String}
 */
async function description(id) {
    if (!id) return "";
    const item = skillData.find(s => s._id == id);
    if (!item) return "";
    let msgData = {
        name: item.name,
        flavor: item.system.description,
        portrait: item.img,
        item: item,
        system: item.system,
        config: celestus,
    };

    const content = await hbs.renderFromTemplate(paths.description, msgData);

    return content;
}

export default {
    render,
    description,
    list: skillData,
};