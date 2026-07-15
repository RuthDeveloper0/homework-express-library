const express = require('express');
const router = express.Router();

const bookRouter = require('./book.route.js');
const userRouter = require('./user.route.js');

router.use('/books', bookRouter);
router.use('/users', userRouter);

module.exports = router;