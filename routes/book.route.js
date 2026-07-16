import express from 'express';
import bookController from '../controllers/book.controller.js';

const router = express.Router();

router.get('/', bookController.getAllBooks);
router.get('/:id', bookController.getBookById);
router.post('/', bookController.createBook);
router.put('/:id', bookController.updateBook);
router.post('/borrow/:id', bookController.borrowBook);
router.post('/return/:id', bookController.returnBook);

export default router;