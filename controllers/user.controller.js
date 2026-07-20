import User from '../models/user.model.js';


export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().populate('borrowedBooks'); 
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "שגיאה בקבלת המשתמשים", error: error.message });
    }
};


export const signUpController = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).send('משתמש עם אימייל זה כבר קיים במערכת');
        }

      
        const newUser = new User({
            username,
            email,
            password,
            borrowedBooks: []
        });

        await newUser.save();
        res.status(201).json({ message: "המשתמש נרשם בהצלחה", user: newUser });
    } catch (error) {
        res.status(400).json({ message: "שגיאה בתהליך ההרשמה", error: error.message });
    }
};


export const signInController = async (req, res) => {
    try {
        const { email, password } = req.body;
        

        const user = await User.findOne({ email, password });
        
        if (!user) {
            return res.status(401).send('אימייל או סיסמה שגויים');
        }

        res.json({ message: "התחברות הצליחה", username: user.username });
    } catch (error) {
        res.status(500).json({ message: "שגיאה בתהליך ההתחברות", error: error.message });
    }
};