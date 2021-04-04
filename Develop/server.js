const express = require('express');
const path = require('path');
const db = require('./db/db.json');

const PORT = process.env.PORT || 3001;
const app = express();
// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data

app.use(express.json());
app.use(express.static('public'));

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
})

app.get('/api/notes/', (req, res) => {
    return res.json(db);
})

app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    db.push(newNote)
    res.json(newNote);
})
// app.post('/api/characters', (req, res) => {
//     const newCharacter = req.body;
//     newCharacter.routeName = newCharacter.name.toLowerCase();
  
//     // BONUS: Use a RegEx Pattern to remove spaces from newCharacter
//     // Your code here
  
//     console.log(newCharacter);
  
//     characters.push(newCharacter);
  
//     res.json(newCharacter);
//   });


app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});