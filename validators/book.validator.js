import Joi from 'joi';

export const bookSchema = Joi.object({
    title: Joi.string().min(2).max(20).required(),
    price: Joi.number().positive().required(),     
    categories: Joi.array().items(Joi.string()).required(),
    authorDetails: Joi.object({                 
        name: Joi.string().required(),
        phone: Joi.string().regex(/^05\d-?\d{7}$/).required(), 
        email: Joi.string().email().required()
    }).required()
});