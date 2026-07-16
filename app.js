import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

import mainRouter from './routes/index.route.js';
import { 
    addCurrentDate, 
    logGetDate, 
    checkLibraryHours, 
    notFoundHandler, 
    errorHandler 
} from './middlewares/custom.middleware.js';

const app = express();
const P = 5000;

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 100, 
    message: 'Too many requests from this IP, please try again later.'
});

app.use(helmet());       // אבטחת השרת באמצעות כותרות HTTP
app.use(cors());         // מאפשר גישה לשרת מכתובות ודפדפנים שונים
app.use(morgan('dev'));  // מדפיס לוג מפורט של כל בקשה שמגיעה לטרמינל
app.use(express.json()); // מאפשר לשרת לקרוא גוף בקשה בפורמט JSON
app.use(limiter);        // הגבלת כמות הבקשות להגנה מפני הצפות

app.use(addCurrentDate);  
app.use(logGetDate);      
app.use(checkLibraryHours); 

app.get('/', (req, res) => {
    res.send('welcome to the library');
});

app.use('/api', mainRouter);

app.use(notFoundHandler); 
app.use(errorHandler);   

app.listen(P, () => {
    console.log(`Server running on port ${P}`);
});