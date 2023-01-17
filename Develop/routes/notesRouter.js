const route = require('express').Router();
const uuid = require('../helpers/uuid');
const notes = require('../db/db.json')
const fs = require('fs')

route.get('/', (req, res) => {
    // send db.json to client   
    res.status(200).json(notes)

    // Log our request to the terminal
    console.info(`${req.method} request received to get notes`);

})

route.post('/', (req, res) => {
    console.info(`${req.method} request received to add a review`);

    const { title, text } = req.body;

    if (title && text) {
        const newNote = {
            title,
            text,
            noteId: uuid()
        }
        // Read existing note database
        fs.readFile(`./db/db.json`, 'utf-8', (err, data) => {

            if (err) {
                console.error(err);
            } else {

                // parse note data base and add new note
                const noteArray = JSON.parse(data);
                noteArray.push(newNote)

                // write updated note object array to database
                fs.writeFile('./db/db.json', JSON.stringify(noteArray, null, 4), (err) =>
                    err ? console.error(err) : console.info(`\nData written to ./db/db.json`)
                );

                res.json(`Note added successfully 🚀`);
            }
        });

    } else {
        res.status(500).json('Error in creating new note');
    }
})

module.exports = route;