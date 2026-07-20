// 1. קריאת המידע מקובץ ה-.env באמצעות הספרייה המתאימה
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';

import userRouter from './routes/user.route.js';
import bookRouter from './routes/book.route.js';

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('welcome to the library');
});

app.use('/api/users', userRouter);
app.use('/api/books', bookRouter);

// מידלוואר לטיפול בשגיאות גלובלי - מציג את ה-stack רק במצב פיתוח
app.use((err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode).json({
        message: err.message || 'Internal Server Error',
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
});

// 2. השמת ערך ברירת מחדל לפרמטרים של משתני הסביבה
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});