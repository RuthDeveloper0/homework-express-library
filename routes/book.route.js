const express = require('express');
const router = express.Router();


const bookController = require('../controllers/book.controller.js');


router.get('/', bookController.getAllBooks);
router.get('/:id', bookController.getBookById);
router.post('/', bookController.createBook);
router.post('/:id', bookController.updateBook);
router.post('/borrow/:id', bookController.borrowBook);
router.post('/return/:id', bookController.returnBook);

module.exports = router;