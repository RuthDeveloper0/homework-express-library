import express from 'express';
import { 
    getAllBooks, 
    getBookById, 
    createBook, 
    updateBook, 
    deleteBook,
    getBooksByCategory 
    // אם יש לך פונקציית קונטרולר מוכנה להשאלה (למשל borrowBook), ייבאי אותה כאן
} from '../controllers/book.controller.js';
import { validateBody } from '../middlewares/validator.middleware.js';
import { bookSchema } from '../validators/book.validator.js';
import { checkAuth } from '../middlewares/auth.middleware.js'; // 1. ייבוא מידלוואר האימות

const router = express.Router();

// ראוטים כלליים של ספרים
router.get('/', getAllBooks);
router.get('/category/:categoryName', getBooksByCategory); 
router.get('/:id', getBookById);

router.post('/', validateBody(bookSchema), createBook);
router.put('/:id', validateBody(bookSchema), updateBook);
router.delete('/:id', deleteBook);

// 2. הוספת ראוט השאלת ספר - מוגן באמצעות checkAuth
// הראוט מקבל את מזהה הספר (bookId) ואת מזהה המשתמש שרוצה להשאיל (userId)
router.post('/:bookId/borrow/:userId', checkAuth, (req, res, next) => {
    // בדיקה שהמשתמש המחובר (req.user.id) משאיל לעצמו, או שהוא מנהל
    if (req.user.id === req.params.userId || req.user.role === 'admin') {
        next(); // מאפשרים מעבר לפונקציה הבאה בקונטרולר
    } else {
        return res.status(403).json({ message: 'אינך יכול להשאיל ספר עבור משתמש אחר' });
    }
    // כאן בהמשך תבוא פונקציית הקונטרולר של ההשאלה מה-book.controller
});

export default router;