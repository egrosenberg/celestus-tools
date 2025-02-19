import express from "express";
//import $ from "jquery";
//import Handlebars from "handlebars";

import hbs from './modules/import/handlebars.mjs'

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
    const msg = await hbs.renderFromTemplate('templates/index.hbs', {name: "Celestus"});
    res.send(msg);
});