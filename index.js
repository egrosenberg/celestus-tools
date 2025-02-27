import express from "express";

import hbs from './modules/import/handlebars.mjs'
import Browser from "./modules/browser.mjs";
import celestus from "./data/celestus.mjs";

// create skills browser
const browsers = new Map([
    ['skills', new Browser("skills", "../data/skills.json")],
    ['backgrounds', new Browser("backgrounds", "../data/backgrounds.json")],
    ['professions', new Browser("professions", "../data/professions.json")],
    ['ancestries', new Browser("ancestries", "../data/ancestries.json")],
    ['talents', new Browser("talents", "../data/talents.json")],
    ['rules', new Browser("rules", "../data/rules.json")]
]);

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

const HOSTS = [
    "rules.crowsnest.me",
    "127.0.0.1",
    "192.168.1.39"
];

// register helpers
hbs.registerHelpers();

// load handlebars partials
hbs.loadPartials([
    "./templates/browse/parts/skills-list.hbs",
    "./templates/browse/parts/backgrounds-list.hbs",
    "./templates/browse/parts/professions-list.hbs",
    "./templates/browse/parts/ancestries-list.hbs",
    "./templates/browse/parts/talents-list.hbs",
    "./templates/browse/parts/rules-list.hbs",
    "./templates/parts/navigation.hbs",
]);

const app = express();

const PORT = 7777;

// enable server to be proxied
app.set('trust proxy', [
    'loopback',
    'linklocal',
    'uniquelocal',
    '192.168.1.55'
]);

// allow access to public files
app.use(express.static('public'));

// listen on port
app.listen(PORT, HOSTS, () => {
    console.log(`Server is running on Port ${PORT}`)
})

/**
 * Home page of site
 */
app.get('/:var(index|index.html)?', async (req, res) => {
    const msg = await hbs.renderFromTemplate('templates/index.hbs', {
        name: "Celestus",
    });
    return res.send(msg);
});

/**
 * Content pages
 */
app.get('/content/:templateName', async (req, res) => {
    const html = await hbs.renderFromTemplate(`templates/content/${req.params.templateName}.hbs`, { config: celestus });
    if (!html) return res.redirect('/404/');
    return res.send(html);
});

/**
 * Browsers
 */
app.get('/browse/:browser', async (req, res) => {
    const browser = browsers.get(req.params.browser);
    if (browser) {
        const list = await browser.render();
        const description = await browser.description(req.query.item);
        const msg = await hbs.renderFromTemplate(`templates/browse/${browser.key}.hbs`, {
            name: "Celestus",
            list: list,
            description
        });
        return res.send(msg);
    }
    return res.redirect('/404/');
});
// fetch skills list
app.get('/resources/browserdata/:browser', (req, res) => {
    const browser = browsers.get(req.params.browser);
    if (browser) return res.send(browser.list);
    return res.redirect('/404/');
});
// fetch description
app.get('/resources/descriptions', async (req, res) => {
    const browser = browsers.get(req.query.type);
    if (browser) {
        const html = await browser.description(req.query.id);
        if (html) return res.send(html);
        else return res.status(STATUS.BadRequest).send("Invalid description type!");
    }
    else {
        return res.status(STATUS.BadRequest).send("Invalid description type!");
    }
});
// fetch form
app.get('/resources/forms/:templateName', async (req, res) => {
    const html = await hbs.renderFromTemplate(`templates/forms/${req.params.templateName}`, { config: celestus });
    if (html) {
        res.send(html);
    }
    else {
        res.status(STATUS.BadRequest).send("Invalid template name!");
    }
    return;
});

/**
 * Catch not found pages
 */
app.all('*', async (req, res) => {
    const html = await hbs.renderFromTemplate('templates/404.hbs');
    res.status(STATUS.NotFound).send(html);
});
/**
 * Error handler
 */
app.use((err, req, res) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
});
