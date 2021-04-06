const express = require('express');
const path = require('path');
const db = require('./db/db.json');
// const shortid = require('shortid');

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
    res.sendFile(path.join(__dirname, '/public/index.html'))
})


app.get('/api/notes/', (req, res) => {
    return res.json(db);
})

// add notes to db with a unique id
app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    db.push(newNote)
    for (let i = 0; i < db.length; i++) {
        db[i].id = i+1;
    }
    console.log(db);
    res.json(newNote);
})

// Get request with specific ID
app.get('/api/notes/:id', (req, res) => {
    const chosen = req.params.id;
    console.log(chosen)

    for ( let i = 0; i<db.length; i++ ) {
        if (chosen == db[i].id) {
            return res.json(db[i]);
        }
    }
    return res.json(db)
})

// return all other alternative routes to index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
})

// app.get('/api/characters/:character', (req, res) => {
    //     const chosen = req.params.character;
    
    //     console.log(chosen);
  
//     for (let i = 0; i < characters.length; i++) {
//       if (chosen.toLowerCase() === characters[i].routeName) {
//         return res.json(characters[i]);
//       }
//     }
  
//     return res.json(false);
//   });

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});