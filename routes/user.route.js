const express = require('express');
const router = express.Router();


const userController = require('../controllers/user.controller.js');


router.get('/', userController.getAllUsers);
router.post('/sign-up', userController.signUpUser);
router.post('/sign-in', userController.signInUser);

module.exports = router;