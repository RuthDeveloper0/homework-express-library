const express = require('express');
const router = express.Router();
const { users } = require('../db.js');


router.get('/', (req, res) => {
    res.json(users);
});


router.post('/sign-up', (req, res) => {
    const { username, email, password } = req.body;


    const userExists = users.find(u => u.email === email);
    if (userExists) {
        return res.status(400).send('משתמש עם אימייל זה כבר קיים במערכת');
    }

    const newUser = {
        id: users.length + 101,
        username,
        email,
        password,
        borrowedBooks: [] 
    };

    users.push(newUser);
    res.status(201).json({ message: "המשתמש נרשם בהצלחה", user: newUser });
});


router.post('/sign-in', (req, res) => {
    const { email, password } = req.body;
    

    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
        return res.status(401).send('אימייל או סיסמה שגויים');
    }

    res.json({ message: "התחברות הצליחה", username: user.username });
});

module.exports = router;