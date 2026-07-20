import mongoose from 'mongoose';

const borrowItemSchema = new mongoose.Schema({
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
    bookTitle: { type: String, required: true },
    returnDate: { type: Date, required: true }
}, { _id: false });

const userSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true 
    },
    phone: { 
        type: String, 
        required: true,
        match: [/^05\d-?\d{7}$/, 'נא להזין מספר טלפון נייד ישראלי תקין'] 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        lowercase: true, 
        match: [/^\S+@\S+\.\S+$/, 'נא להזין כתובת אימייל תקינה']
    }, 
    password: { 
        type: String, 
        required: true,
        minlength: [4, 'הסיסמה חייבת להכיל לפחות 4 תווים'] 
    },

    borrowedBooks: [borrowItemSchema] 
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;