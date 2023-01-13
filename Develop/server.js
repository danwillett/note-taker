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
    console.log(req.body)
})

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);