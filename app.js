const express = require('express');
const { books } = require('./db.js');


const app = express();
app.use(express.json());
const P = 5000;

app.get('/', (req, res) => {
    res.send('welcome to the library');
});


app.get('/books', (req, res) => {
    res.json(books);
});

app.get('/books/:id', (req, res) => {

    const book = books.find(b => b.id == req.params.id);

    if (book) {
        res.json(book); 
    } else {
        res.status(404).send('not found the book');
    }
});


app.post('/books', (req, res) => {
    const newBook = req.body; 
    books.push(newBook);    
    res.status(201).json(newBook); 
});


app.post('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id); 
    const book = books.find(b => b.id === bookId); 


    if (!book) {
        return res.status(404).send('הספר לא נמצא');
    }

    book.title = req.body.title || book.title;
    book.category = req.body.category || book.category;
    book.price = req.body.price || book.price;

    res.json({ message: "הספר עודכן בהצלחה", book });
});


app.post('/books/borrow/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const { customerId } = req.body; 


    const book = books.find(b => b.id === bookId);

    if (!book) {
        return res.status(404).send('הספר לא נמצא');
    }


    if (book.isBorrowed) {
        return res.status(400).send('הספר כבר מושאל ולא ניתן להשאיל אותו שוב');
    }


    book.isBorrowed = true;


    const newBorrow = {
        borrowDate: new Date().toISOString().split('T')[0], 
        customerId: parseInt(customerId)
    };

    book.borrowHistory.push(newBorrow);

    res.json({ message: "הספר הושאל בהצלחה", book });
});


app.post('/books/return/:id', (req, res) => {
    const bookId = parseInt(req.params.id);

    const book = books.find(b => b.id === bookId);

    if (!book) {
        return res.status(404).send('הספר לא נמצא');
    }

    if (!book.isBorrowed) {
        return res.status(400).send('הספר אינו נמצא במצב מושאל, לכן לא ניתן להחזיר אותו');
    }


    book.isBorrowed = false;

    res.json({ message: "הספר הוחזר בהצלחה ", book });
});


app.listen(P, () => {
    console.log(`Server running on port ${P}`);
});

