import express from "express";
//import $ from "jquery";
//import Handlebars from "handlebars";

import hbs from './modules/import/handlebars.mjs'
import skills from "./modules/skills.mjs";

const STATUS = {
    Ok: 200,
    Created: 201,
    NoContent: 204,
    BadRequest: 400,
    Unauthorized: 401,
    Forbidden: 403,
    NotFound: 404,
    InternalServerError: 500,
};

// register helpers
hbs.registerHelpers();

// load handlebars partials
hbs.loadPartials([
    "./templates/skills/list.hbs",
    "./templates/skills/browser.hbs",
]);

const app = express();

const PORT = 7777;

// allow access to public files
app.use(express.static('public'));

// listen on port
app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}`)
})

/**
 * Home page of site
 */
app.get('/', async (req, res) => {
    const skillsList = await skills.render();
    const msg = await hbs.renderFromTemplate('templates/index.hbs', { name: "Celestus", skillsList: skillsList });
    res.locals.skillsList = skills.list;
    res.send(msg);
});

/**
 * Skills
 */
// skill browser
app.get('/skills', async (req, res) => {
    const skillsList = await skills.render();
    const description = await skills.description(req.query.item);
    const msg = await hbs.renderFromTemplate('templates/index.hbs', {
        name: "Celestus",
        skillsList: skillsList,
        description
    });
    res.locals.skillsList = skills.list;
    res.send(msg);
    return;
});
// fetch skills list
app.get('/resources/skill-data', (req, res) => {
    res.send(skills.list);
    return;
});
// fetch skill description
app.get('/resources/descriptions', async (req, res) => {
    if (req.query.type === "skill") {
        const html = await skills.description(req.query.id);
        if (html) res.send(html);
    }
    else {
        res.status(STATUS.BadRequest).send("Invalid description type!");
    }
    return;
});