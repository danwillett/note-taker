const express = require('express');
const path = require('path');
const fs = require('fs');
// const getNotes = require('./public/assets/js/index')

const PORT = process.env.PORT || 3001;
const app = express();
const api = require('./routes/index')

// const notes = require('./db/db.json')

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

// adds api routes for note POST and GET
app.use('/api', api)

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT} 🚀`)
);