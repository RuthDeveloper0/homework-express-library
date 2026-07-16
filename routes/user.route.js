import express from 'express';
import userController from '../controllers/user.controller.js';

const router = express.Router();

router.get('/', userController.getAllUsers);
router.post('/signup', userController.signUpUser);
router.post('/signin', userController.signInUser);

export default router;