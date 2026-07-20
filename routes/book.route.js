import express from 'express';
import { 
    getAllBooks, 
    getBookById, 
    createBook, 
    updateBook, 
    deleteBook,
    getBooksByCategory 
} from '../controllers/book.controller.js';
import { validateBody } from '../middlewares/validator.middleware.js';
import { bookSchema } from '../validators/book.validator.js';

const router = express.Router();

router.get('/', getAllBooks);
router.get('/category/:categoryName', getBooksByCategory); 
router.get('/:id', getBookById);

router.post('/', validateBody(bookSchema), createBook);
router.put('/:id', validateBody(bookSchema), updateBook);
router.delete('/:id', deleteBook);

export default router;