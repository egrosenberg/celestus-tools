import hbs from "./import/handlebars.mjs";
import celestus from "../data/celestus.mjs";
import { createRequire } from "module";
const require = createRequire(import.meta.url);

const paths = {
    browser: "templates/skills/browser.hbs",
    list: "templates/skills/list.hbs",
};

const skillData = require("../data/skills.json").skills;
skillData.sort((a, b) => {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
});

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
    const skill = skillData.find(s => s._id == id);
    if (skill) return skill.html;
    return "";
}

export default {
    render,
    description,
    list: skillData,
};