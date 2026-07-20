import Joi from 'joi';

export const userSchema = Joi.object({
    username: Joi.string().min(2).required(),
    phone: Joi.string().regex(/^05\d-?\d{7}$/).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required() // אורך מינימלי 4 לפי סעיף 26
});