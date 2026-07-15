const express = require('express');
const router = express.Router();
const { books, users } = require('../db.js');


router.get('/', (req, res) => {
    const { title } = req.query;
    const page = parseInt(req.query.page) || 1;      
    const limit = parseInt(req.query.limit) || 10;  

    let filteredBooks = books;
    if (title) {
        filteredBooks = books.filter(b => 
            b.title.toLowerCase().includes(title.toLowerCase())
        );
    }

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedBooks = filteredBooks.slice(startIndex, endIndex);

    res.json(paginatedBooks);
});


router.get('/:id', (req, res) => {
    const book = books.find(b => b.id == req.params.id);
    if (book) {
        res.json(book); 
    } else {
        res.status(404).send('not found the book');
    }
});


router.post('/', (req, res) => {
    const newBook = req.body; 
    books.push(newBook);    
    res.status(201).json(newBook); 
});


router.post('/:id', (req, res) => {
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


router.post('/borrow/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const { customerId } = req.body; 

    const book = books.find(b => b.id === bookId);
    if (!book) return res.status(404).send('הספר לא נמצא');
    if (book.isBorrowed) return res.status(400).send('הספר כבר מושאל');

   
    const user = users.find(u => u.id === parseInt(customerId));
    if (!user) return res.status(404).send('המשתמש (הלקוח) לא נמצא במערכת');


    book.isBorrowed = true;
    book.borrowHistory.push({
        borrowDate: new Date().toISOString().split('T')[0], 
        customerId: user.id
    });


    user.borrowedBooks.push(bookId);

    res.json({ message: "הספר הושאל בהצלחה ועודכן אצל המשתמש", book, user });
});


router.post('/return/:id', (req, res) => {
    const bookId = parseInt(req.params.id);

    const book = books.find(b => b.id === bookId);
    if (!book) return res.status(404).send('הספר לא נמצא');
    if (!book.isBorrowed) return res.status(400).send('הספר אינו במצב מושאל');


    const lastBorrow = book.borrowHistory[book.borrowHistory.length - 1];
    if (lastBorrow) {
        const user = users.find(u => u.id === lastBorrow.customerId);
        if (user) {

            user.borrowedBooks = user.borrowedBooks.filter(id => id !== bookId);
        }
    }

    book.isBorrowed = false;

    res.json({ message: "הספר הוחזר בהצלחה ועודכן אצל המשתמש", book });
});


module.exports = router;