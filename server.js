const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const { notes } = require ('./db/db');
const fs = require('fs');
const path = require('path');

app.get('/api/notes', (req, res) => {
	res.json(notes);
})





app.listen(3001, ()=> {
	console.log(`API server now on port 3001`);
})