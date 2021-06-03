const router = require('express').Router()
const fs = require('fs');
const path = require("path");
const { v4: uuidv4 } = require('uuid');

const {notes} = require('../db/db.json')




//======FUNCTIONS======//
function addNewNote(body, notesArr) {
    const newNote = body;
    notesArr.push(newNote);
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify({notes: notesArr}, null, 2)
    );
    return newNote;
}

function deleteNote(id, notes) {
    const result = notes.filter((notes) => notes.id === id)[0];
    return result;
}

//======ROUTES======//
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

notes = filteredNotes;
res.json(notes);
});

module.exports = router;