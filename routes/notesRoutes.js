const router = require('express').Router()
const fs = require('fs');
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




//======ROUTES======//
router.get('/db', (req, res) => {
    res.json(notes);
});

router.post('/db', (req, res) => {
    // console.log(req.body);
    const newNote = addNewNote(req.body, notes);
    res.json(newNote);
})

module.exports = router;