const express = require('express');
const app = express();


const mainRouter = require('./routes/index.route.js');

const P = 5000;


app.use(express.json());


app.get('/', (req, res) => {
    res.send('welcome to the library');
});


app.use('/api', mainRouter);


app.listen(P, () => {
    console.log(`Server running on port ${P}`);
});