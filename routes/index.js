const express = require('express');
const route = express();

const notesRouter = require('./notesRouter')

// GET and POST routes for /api/tips
route.use('/notes', notesRouter)


module.exports = route;