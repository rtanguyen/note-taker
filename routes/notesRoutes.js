const router = require('express').Router()
const fs = require('fs');
const path = require("path");
const { v4: uuidv4 } = require('uuid');

let {notes} = require('../db/db.json')

function addNewNote(body, notesArr) {
    const newNote = body;
    notesArr.push(newNote);
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify({notes: notesArr}, null, 2)
    );
    return newNote;
}

//================ROUTES================//
router.get('/notes', (req, res) => {
    res.json(notes);
});

router.post('/notes', (req, res) => {
    req.body.id = uuidv4();
    console.log(req.body);
    const newNote = addNewNote(req.body, notes);
    res.json(newNote);

});

//TODO: delete
router.delete('/notes/:id', (req, res) => {
const noteId = req.params.id;
const filteredNotes = notes.filter((notes) => notes.id !== noteId);
fs.writeFileSync(
    path.join(__dirname, '../db/db.json'),
    JSON.stringify({notes: filteredNotes}, null, 2)
);
notes = filteredNotes;
res.json(notes);
});

module.exports = router;