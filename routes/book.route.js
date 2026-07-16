import express from 'express';
import { createBook, updateBook, deleteBook } from '../controllers/book.controller.js';
import { validateBody } from '../middlewares/validator.middleware.js';
import { bookSchema } from '../validators/book.validator.js';

const router = express.Router();


router.post('/', validateBody(bookSchema), createBook);
router.put('/:id', validateBody(bookSchema), updateBook);
router.delete('/:id', deleteBook);

export default router;