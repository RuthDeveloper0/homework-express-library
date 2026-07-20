import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const checkAuth = async (req, res, next) => {
    try {
        let token;

        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({ message: 'אין הרשאה, לא נשלח אסימון גישה' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = await User.findById(decoded.id);

        if (!req.user) {
            return res.status(401).json({ message: 'משתמש לא נמצא במערכת' });
        }

        next(); 
    } catch (error) {

        return res.status(401).json({ message: 'פג תוקף האסימון או שהאסימון אינו תקין' });
    }
};

export const checkAdmin = (req, res, next) => {

    if (req.user && req.user.role === 'admin') {
        next(); 
    } else {
        return res.status(403).json({ message: 'גישה נדחתה, פעולה זו מיועדת למנהלים בלבד' });
    }
};