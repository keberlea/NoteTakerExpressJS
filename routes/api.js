//require express, fs, and id-16
const apiNotes = require('express').Router()
const fs = require('fs')
const id_16 = require('id-16')
const path = require("path")


//create id generator that generates a random id with a set length in ()
let uid = id_16.generator(5);

console.log(uid)


// GET /api/notes read the db.json file and return all saved notes as JSON.
apiNotes.get('/api/notes', async (req, res) => {
    const data = await JSON.parse(fs.readFileSync('./db/db.json', 'utf8'))
    console.log(JSON.stringify(data))
    res.json(data)
})

// POST /api/notes should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client.
apiNotes.post('/api/notes', (req, res) => {
    let data = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'))
    console.log(data)

    const newNote = {
        title: req.body.title,
        text: req.body.text,
        id: uid(), 
    };
    console.log(newNote)

    data.push(newNote)
    

    fs.writeFileSync('./db/db.json', JSON.stringify(data))
    console.log(JSON.stringify(data))
    res.json(data)
})


//function to delete note from db.json file
/*
apiNotes.delete("/api/notes/:id", (req, res) => {
    const deleteID = req.params.id.toString()
    const data = JSON.parse(fs.readFileSync('db/db.json','utf8'))
    const newData = data.filter(note => note.id.toString() !== deleteID)
    fs.writeFileSync('db/db.json', JSON.stringify(newData))
    res.json(newData)
})
*/

module.exports = apiNotes