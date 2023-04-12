//router object called html
const html = require("express").Router();

// reqiure path
const path = require("path");

// sends user to html file 
html.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/assets/index.html"));
});


//sends user to notes.html when they visit /notes page
html.get("/", (req, res) => {  
    res.sendFile(path.join(__dirname, "/assets/notes.html"));
});

//export html router object
module.exports = html;