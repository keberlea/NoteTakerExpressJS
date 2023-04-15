//require express
const apiNotes = require('express').Router()
//require fs
const fs = require('fs')
//require id generator package
const generateUniqueId = require('generate-unique-id');
 


// GET /api/notes read the db.json file and return all saved notes as JSON.
apiNotes.get('/api/notes', async (req, res) => {
    //read db.json file
    let data = await JSON.parse(fs.readFileSync('./db/db.json', 'utf8'))
    console.log(JSON.stringify(data))
    res.json(data)
})

// POST /api/notes should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client.
apiNotes.post('/api/notes', (req, res) => {
    //read db.json file
    let data = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'))
    //create new note gathering information from user input fields
    const newNote = {
        title: req.body.title,
        text: req.body.text,
        id: generateUniqueId(),
    };
    //push new note to data
    data.push(newNote)
    
    //write to json file
    fs.writeFileSync('./db/db.json', JSON.stringify(data))
    //console log to confirm new note is written to json file
    console.log(JSON.stringify(data))
    res.json(data)
})


//function to delete note from db.json file

apiNotes.delete("/api/notes/:id", (req, res) => {
    //get id from params
    const deleteID = req.params.id
    //read db.json file
    const data = JSON.parse(fs.readFileSync('db/db.json','utf8'))
    //delete new note if the deleteID ===note.id
    const newData = data.filter(note => note.id !== deleteID)
    //write new data from deleteing to db.json
    fs.writeFileSync('./db/db.json', JSON.stringify(newData))
    res.json(newData)
})


module.exports = apiNotes