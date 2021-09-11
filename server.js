const express = require('express');
const app = express();

const PORT = process.env.PORT || 3001;

const notes = require('./db/db');
const {v4: uuidv4} = require('uuid');
const fs = require('fs');
const path = require('path');


// add middleware to parse incoming data
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static('public'));



 // GET for notes
app.get('/api/notes', (req, res) => {
    res.json(notes);
})

function createNewNote(body, notesArray) {
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, '/db/db.json'),
        JSON.stringify(notesArray, null, 2)
    );
    return note;
}

//  POST  for notes
app.post('/api/notes', (req, res) => {
    //  Creating unique IDS
    req.body.id = uuidv4();
    const note = createNewNote(req.body, notes);
    res.json(note);
});


//  DELETE route 
app.delete('/api/notes/:id', (req, res) => {
    const id = req.params.id;
    let note;

    notes.map((element, index) => {
      if (element.id == id){
        note = element
        notes.splice(index, 1)
	//Save NOTES DATA in DB.JSON FILE
        fs.writeFileSync(path.join(__dirname, '/db/db.json'),
        JSON.stringify(notes, null, 2));
        return res.json(note);
      } 
    
    })
}); 

// GET ROUTE for INDEX.HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

//GET ROUTE for NOTES.HTML
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});


app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});