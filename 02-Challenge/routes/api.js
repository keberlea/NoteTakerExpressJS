//require express, fs, and id-16
const express = require("express");
const fs = require("fs");
const id = require("id-16");

// GET /notes read the db.json file and return all saved notes as JSON.
app.get("/api/notes",  function(req, res) {
    fs.readFile("db/db.json", "utf8", function(err, data) {
        if (err) throw err;
        res.json(JSON.parse(data));
    });
})

// POST /api/notes should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client.
app.post("/api/notes", function(req, res) {
    fs.readFile("db/db.json", "utf8", function(err, data) {
        if (err) throw err;
        var notes = JSON.parse(data);
        notes.push(req.body);
        fs.writeFile("db/db.json", JSON.stringify(notes), function(err) {
            if (err) throw err;
            res.json(notes);
        });
    });
})