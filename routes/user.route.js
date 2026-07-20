import express from 'express';
import { getAllUsers, signUp, signIn } from '../controllers/user.controller.js';
import { validateBody } from '../middlewares/validator.middleware.js';
import { userSchema } from '../validators/user.validator.js'; 

const router = express.Router();

router.get('/', getAllUsers);
router.post('/signup', validateBody(userSchema), signUp);
router.post('/signin', signIn);

export default router;