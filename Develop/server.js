const express = require('express');
const path = require('path');
const fs = require('fs');

const PORT = 3001;
const app = express();

const notes = require('./db/db.json')

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

// loads in homepage 
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
)

app.get('/api/notes', (req, res) => {
    // send db.json to client   
    res.status(200).json(notes)

    // Log our request to the terminal
    console.info(`${req.method} request received to get notes`);


})

app.post('/api/notes', (req, res) => {
    console.info(`${req.method} request received to add a review`);

    const { title, text } = req.body;

    if (title && text) {
        const newNote = {
            title,
            text
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

                const response = {
                    status: 'success',
                    body: noteArray
                };
        
                console.log(response);
                res.status(201).json(response);
            }

        });
        

    } else {
        res.status(500).json('Error in creating new note');
    }

})

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT} 🚀`)
);