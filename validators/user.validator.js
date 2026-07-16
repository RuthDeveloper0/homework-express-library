import Joi from 'joi';

// סכמה 1 
export const signUpSchema = Joi.object({
    username: Joi.string().min(3).max(30).required().messages({
        'string.empty': 'שם משתמש הוא שדה חובה',
        'string.min': 'שם משתמש חייב להכיל לפחות 3 תווים'
    }),
    email: Joi.string().email().required().messages({
        'string.email': 'כתובת האימייל אינה תקינה',
        'string.empty': 'אימייל הוא שדה חובה'
    }),
    password: Joi.string().min(6).required().messages({
        'string.min': 'הסיסמה חייבת להיות באורך של 6 תווים לפחות',
        'string.empty': 'סיסמה היא שדה חובה'
    })
});

// סכמה 2
export const signInSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.email': 'כתובת האימייל אינה תקינה'
    }),
    password: Joi.string().required().messages({
        'string.empty': 'חובה להזין סיסמה'
    })
});