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

app.use((err, req, res, next) => {

    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode).json({
        message: err.message || 'Internal Server Error'
    });
});

const PORT = 5001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});