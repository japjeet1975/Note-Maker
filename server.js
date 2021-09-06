const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const { notes } = require('./db/db');
const {v4: uuidv4} = require('uuid');
const { create } = require('domain');
const fs = require('fs');
const path = require('path');


// add middleware to parse incoming data
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static('public'));



 // Get route for notes
app.get('/api/notes', (req, res) => {
    res.json(notes);
})

function createNewNote(body, notesArray) {
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, '/db/db.json'),
        JSON.stringify({notes: notesArray}, null, 2)
    );
    return note;
}

//  POST route for notes
app.post('/api/notes', (req, res) => {
    //  using uuid module to generate random unique id
    req.body.id = uuidv4();
    const note = createNewNote(req.body, notes);
    res.json(note);
});


//  DELETE route for notes
app.delete('/api/notes/:id', (req, res) => {
    const id = req.params.id;
    let note;

    notes.map((element, index) => {
      if (element.id == id){
        note = element
        notes.splice(index, 1)
        fs.writeFileSync(path.join(__dirname, '/db/db.json'),
        JSON.stringify({notes}, null, 2));
        return res.json(note);
      } 
    
    })
}); 

// html route for index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

// html route for notes.html
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});



// method to make the server listen to requests coming from client side 
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});