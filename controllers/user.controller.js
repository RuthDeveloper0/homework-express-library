import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import generateToken from '../utils/generateToken.js'; 

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
        const { username, phone, email, password, role } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) {
            res.status(400);
            throw new Error('משתמש עם אימייל זה כבר קיים במערכת');
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            username,
            phone,
            email,
            password: hashedPassword,
            role: role || 'user'
        });

        if (!process.env.JWT_SECRET) {
            process.env.JWT_SECRET = 'MySuperSecretKey123456!';
        }

        const token = generateToken(newUser._id);

        res.status(201).json({
            user: newUser.toJSON(),
            token: token
        });
    } catch (error) {
        next(error);
    }
};

export const signIn = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            res.status(401);
            throw new Error('אימייל או סיסמה שגויים');
        }

        if (!process.env.JWT_SECRET) {
            process.env.JWT_SECRET = 'MySuperSecretKey123456!';
        }

        const token = generateToken(user._id);

        res.status(200).json({
            message: 'התחברות בוצעה בהצלחה',
            user: user.toJSON(),
            token: token
        });
    } catch (error) {
        next(error);
    }
};