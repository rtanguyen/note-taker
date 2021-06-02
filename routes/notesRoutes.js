const router = require('express').Router()
const fs = require('fs');
const path = require("path");

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

function validateNote(note) {
    if (!note.title || typeof note.title !=='string') {
        return false;
    }
    if (!note.text || typeof note.text !=='string') {
        return false;
    }
    return true;
};


//======ROUTES======//
router.get('/db', (req, res) => {
    // fs.readFile(('../db/db.json'), function (err, notesData) {
    //     if (err) {
    //         throw err
    //     } else {
    //         console.log(notesData)
    //     }
    // }
    // );
    res.json(notes);
});

router.post('/db', (req, res) => {
    // console.log(req.body);
    req.body.id = notes.length.toString();

    if (!validateNote(req.body)) {
        res.status(400).send('Note is not properly formatted.');
    } else {
        const newNote = addNewNote(req.body, notes);
        res.json(newNote);
    }
});

module.exports = router;