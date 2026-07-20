import mongoose from 'mongoose';

const authorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true }
}, { _id: false });

const bookSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true, 
        unique: true,         
        minlength: [2, 'שם הספר חייב להכיל לפחות 2 תווים'], 
        maxlength: [20, 'שם הספר לא יכול לעבור את ה-20 תווים']
    }, 
    price: { type: Number, required: true }, 
    categories: { 
        type: [String], 
        required: true,
        enum: {
            values: ['Computer Science', 'Academic', 'Technology', 'Fiction', 'Biography'],
            message: 'הקטגוריה {VALUE} אינה קיימת ברשימת הערכים המותרים'
        }
    }, 
    authorDetails: { type: authorSchema, required: true }, 
    isBorrowed: { type: Boolean, default: false },
    borrowHistory: { type: Array, default: [] }
}, { timestamps: true });

const Book = mongoose.model('Book', bookSchema);

export default Book;