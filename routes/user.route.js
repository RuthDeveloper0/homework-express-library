import express from 'express';
import { signUpController, signInController } from '../controllers/user.controller.js'; 
import { validateBody } from '../middlewares/validator.middleware.js';
import { signUpSchema, signInSchema } from '../validators/user.validator.js';

const router = express.Router();


router.post('/signup', validateBody(signUpSchema), signUpController);
router.post('/signin', validateBody(signInSchema), signInController);

export default router;