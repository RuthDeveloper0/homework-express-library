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
import { checkAuth } from '../middlewares/auth.middleware.js'; 

const router = express.Router();

router.get('/', getAllBooks);
router.get('/category/:categoryName', getBooksByCategory); 
router.get('/:id', getBookById);

router.post('/', validateBody(bookSchema), createBook);
router.put('/:id', validateBody(bookSchema), updateBook);
router.delete('/:id', deleteBook);

router.post('/:bookId/borrow/:userId', checkAuth, (req, res, next) => {

    if (req.user.id === req.params.userId || req.user.role === 'admin') {
        next(); 
    } else {
        return res.status(403).json({ message: 'אינך יכול להשאיל ספר עבור משתמש אחר' });
    }
});

export default router;