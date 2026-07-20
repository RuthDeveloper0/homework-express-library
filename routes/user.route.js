import express from 'express';
import { getAllUsers, signUp, signIn } from '../controllers/user.controller.js';
import { validateBody } from '../middlewares/validator.middleware.js'; 
import { userSchema, signInSchema } from '../validators/user.validator.js'; 
import { checkAuth, checkAdmin } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/signup', validateBody(userSchema), signUp);

router.post('/signin', validateBody(signInSchema), signIn);

router.get('/', checkAuth, checkAdmin, getAllUsers);

router.put('/:id', checkAuth, (req, res, next) => {
    if (req.user.id === req.params.id || req.user.role === 'admin') {
        next();
    } else {
        return res.status(403).json({ message: 'אין לך הרשאה לעדכן משתמש אחר' });
    }
});

export default router;