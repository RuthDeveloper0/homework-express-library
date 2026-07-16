import Joi from 'joi';

// סכמה 3
export const bookSchema = Joi.object({
    title: Joi.string().min(2).max(100).required().messages({
        'string.empty': 'כותרת הספר היא שדה חובה'
    }),
    author: Joi.string().min(2).max(50).required().messages({
        'string.empty': 'שם המחבר הוא שדה חובה'
    }),
    publishYear: Joi.number().integer().min(1000).max(new Date().getFullYear()).required().messages({
        'number.base': 'שנת ההוצאה חייבת להיות מספר',
        'number.max': 'שנת ההוצאה אינה יכולה להיות בעתיד'
    })
});