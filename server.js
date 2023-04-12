//import express from node.js
const express = require('express');
const path = require('path')

//import html.js and api.js
const html = require('./routes/html');
const api = require('./routes/api');

//set port
const PORT = process.env.PORT || 3001;

//create express app
const app = express();

// set up express app to handle data parsing
// uses middleware function for parsing URL requests, true posts nested objects
app.use(express.urlencoded({ extended: true }))

// middleware that automatically parses JSON request bodies
app.use(express.json())

//middleware function tells express to serve static assets
app.use(express.static('public'))

//set up express app to use html.js and api.js
app.use(html)

app.use(api)

//start server
app.listen(PORT, () => {
    console.log(`Note taker app listening on PORT: ${PORT}`)
    }
);
