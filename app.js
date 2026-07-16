import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import mainRouter from './routes/index.route.js';

const app = express();
const P = 5000;

const limiter = rateLimit({
    windowMs: 15 * 60000, 
    max: 100, 
    message: 'Too many requests, pls try again later.'
});

// שימוש ב-Middlewares הכלליים של השרת
app.use(helmet()); // אבטחת השרת באמצעות כותרות HTTP
app.use(cors()); // מאפשר גישה לשרת מכתובות ודפדפנים שונים (CORS)
app.use(morgan('dev')); // מדפיס לוג מפורט של כל בקשה שמגיעה לטרמינל
app.use(express.json()); // מאפשר לשרת לקרוא גוף בקשה בפורמט JSON
app.use(limiter); // החלת מגבלת הבקשות על כל השרת


app.get('/', (req, res) => {
    res.send('welcome to the library');
});


app.use('/api', mainRouter);

app.listen(P, () => {
    console.log(`Server running on port ${P}`);
});