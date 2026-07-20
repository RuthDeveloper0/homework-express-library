import jwt from 'jsonwebtoken';

const generateToken = (userId) => {
    return jwt.sign(
        { id: userId }, 
        process.env.JWT_SECRET, 
        { expiresIn: '5m' } 
    );
};

export default generateToken;