

export const validateBody = (schema) => {
    return (req, res, next) => {

        const { error } = schema.validate(req.body, { abortEarly: false });

        if (error) {

            const errorMessages = error.details.map(detail => detail.message);

            const validationError = new Error(errorMessages.join(' | '));
            
            res.status(400);
            return next(validationError);
        }

        next();
    };
};