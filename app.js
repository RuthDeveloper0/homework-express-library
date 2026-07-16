import express from 'express';
import mainRouter from './routes/index.route.js';

const app = express();
const P = 5000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('welcome to the library');
});

app.use('/api', mainRouter);

app.listen(P, () => {
    console.log(`Server running on port ${P}`);
});