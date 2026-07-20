import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import generateToken from '../utils/generateToken.js'; // ייבוא הפונקציה ליצירת טוקן

// 1. פונקציית קבלת כל המשתמשים
export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        next(error); 
    }
};

// 2. פונקציית הרשמה מאובטחת (sign-up)
export const signUp = async (req, res, next) => {
    try {
        const { username, phone, email, password, role } = req.body;

        // בדיקה האם המשתמש כבר קיים לפי מייל
        const userExists = await User.findOne({ email });
        if (userExists) {
            res.status(400);
            throw new Error('משתמש עם אימייל זה כבר קיים במערכת');
        }

        // יצירת Salt והצפנת הסיסמה (Hash)
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // יצירת המשתמש עם הסיסמה המוצפנת והתפקיד (ברירת מחדל 'user' אם לא נשלח)
        const newUser = await User.create({
            username,
            phone,
            email,
            password: hashedPassword,
            role: role || 'user'
        });

        // יצירת טוקן מאובטח ל-5 דקות על בסיס ה-ID החדש
        const token = generateToken(newUser._id);

        // החזרת הנתונים המעובדים יחד עם אסימון הגישה (token)
        res.status(201).json({
            user: newUser.toJSON(),
            token: token
        });
    } catch (error) {
        next(error);
    }
};

// 3. פונקציית התחברות מאובטחת (sign-in)
export const signIn = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // חיפוש המשתמש במסד הנתונים
        const user = await User.findOne({ email });
        
        // בדיקה האם המשתמש קיים והשוואת הסיסמה המוצפנת בעזרת bcrypt.compare
        if (!user || !(await bcrypt.compare(password, user.password))) {
            res.status(401);
            throw new Error('אימייל או סיסמה שגויים');
        }

        // יצירת טוקן מאובטח ל-5 דקות בעת התחברות מוצלחת
        const token = generateToken(user._id);

        // החזרת אובייקט המשתמש נקי ומעובד יחד עם אסימון הגישה
        res.status(200).json({
            message: 'התחברות בוצעה בהצלחה',
            user: user.toJSON(),
            token: token
        });
    } catch (error) {
        next(error);
    }
};