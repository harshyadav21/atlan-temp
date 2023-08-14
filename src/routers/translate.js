const { Translate } = require('@google-cloud/translate').v2;
const express = require("express");
const routerTranslate = new express.Router();
require("dotenv").config();
// Instantiates a client

const project_id = process.env.project_id;
const api_key = process.env.key;

const translate = new Translate({ projectId: project_id, key: api_key });


routerTranslate.get("/translate", (req, res) => {
    res.render("translate");
});

routerTranslate.post("/translate", async(req, res) => {

    try {
        const { text, target } = req.body;

        const [translation] = await translate.translate(text, target);
        console.log("come");
        const translatedText = [translation];
        res.status(201).render("translate", { translatedText });
        console.log(`Text: ${text}`);
        console.log(`Translation: ${translation}`);
    } catch (err) {
        console.log(err);
        res.status(404).send(err);
    }
});

//routerTranslate();
module.exports = routerTranslate;

// async function quickStart() {
//   // The text to translate
//   const text = 'Hello, world!';

//   // The target language
//   const target = 'ru';

//   // Translates some text into Russian
//   const [translation] = await translate.translate(text, target);
//   console.log(`Text: ${text}`);
//   console.log(`Translation: ${translation}`);
// }

// quickStart();