import mongoose from 'mongoose';

const authorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true }
}); 

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true }, 
    categories: { type: [String], required: true }, 
    authorDetails: { type: authorSchema, required: true }, 
    isBorrowed: { type: Boolean, default: false },
    borrowHistory: { type: Array, default: [] }
}, { timestamps: true });

const Book = mongoose.model('Book', bookSchema);

export default Book;