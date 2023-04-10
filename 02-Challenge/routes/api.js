//require express, fs, and id-16
const apiNotes = require('express').Router();
const fs = require('fs');
const id_16 = require('id-16');

//create id generator
let uid = id_16.generator(5);





// GET /notes read the db.json file and return all saved notes as JSON.
apiNotes.get("/api/notes", (req, res) => {
    let data = JSON.parse(fs.readFile("./db/db.json", "utf8"))
});

// POST /api/notes should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client.
apiNotes.post("/api/notes", (req, res) => {
    let data = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'))
    const newNote = {
        title: req.body.title,
        text: req.body.text,
        id: uid(), 
    };
    data.push(newNote);
    fs.writeFile("db/db.json", JSON.stringify(data))
    });

    //function to dele note from db.json file
    //apiNotes.delete("/api/notes/:id", (req, res) => {
    //    const delete = req.params.id.toString()


    module.exports = apiNotes