import Joi from 'joi';

// 1. סכמה להרשמה (signUp) - כוללת כעת גם את שדה ה-role
export const userSchema = Joi.object({
    username: Joi.string().min(2).required(),
    phone: Joi.string().regex(/^05\d-?\d{7}$/).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required(),
    role: Joi.string().valid('user', 'admin').default('user') // הוספת השדה הזה
});

// 2. סכמה להתחברות (signIn) - אימייל וסיסמה בלבד
export const signInSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required()
});