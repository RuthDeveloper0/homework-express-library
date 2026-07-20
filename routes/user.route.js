import express from 'express';
import { getAllUsers, signUp, signIn } from '../controllers/user.controller.js';
import { validateBody } from '../middlewares/validator.middleware.js'; // המידלוואר הגנרי שלך
import { userSchema, signInSchema } from '../validators/user.validator.js'; // ייבוא שתי הסכמות החדשות
import { checkAuth, checkAdmin } from '../middlewares/auth.middleware.js';

const router = express.Router();

// הרשמה - ולידציה של כל השדות
router.post('/signup', validateBody(userSchema), signUp);

// התחברות - ולידציה רק של מייל וסיסמה
router.post('/signin', validateBody(signInSchema), signIn);

// קבלת כל המשתמשים - הגנה למנהל בלבד
router.get('/', checkAuth, checkAdmin, getAllUsers);

// עדכון משתמש - בדיקה שהמשתמש מחובר ומעדכן את עצמו (או מנהל)
router.put('/:id', checkAuth, (req, res, next) => {
    if (req.user.id === req.params.id || req.user.role === 'admin') {
        next();
    } else {
        return res.status(403).json({ message: 'אין לך הרשאה לעדכן משתמש אחר' });
    }
});

export default router;