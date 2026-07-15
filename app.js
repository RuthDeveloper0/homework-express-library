const express = require('express');
const { books } = require('./db.js');


const app = express();
const P = 5000;

app.get('/', (req, res) => {
    res.send('welcome to the library');
});


app.get('/books', (req, res) => {
    res.json(books);
});

app.listen(P, () => {
    console.log(`Server running on port ${P}`);
});

