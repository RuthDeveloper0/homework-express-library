import User from '../models/user.model.js';


export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};


export const signUp = async (req, res, next) => {
    try {
        const { username, phone, email, password } = req.body;
        const userExists = await User.findOne({ email });
        if (userExists) {
            res.status(400);
            throw new Error('משתמש עם אימייל זה כבר קיים במערכת');
        }

        const newUser = await User.create({
            username,
            phone,
            email,
            password 
        });

        res.status(201).json(newUser);
    } catch (error) {
        next(error);
    }
};


export const signIn = async (req, res, next) => {
    try {
        const { email, password } = req.body;  
        const user = await User.findOne({ email });
        
 
        if (!user || user.password !== password) {
            res.status(401);
            throw new Error('אימייל או סיסמה שגויים');
        }

        res.status(200).json({
            message: 'התחברות בוצעה בהצלחה',
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        next(error);
    }
};