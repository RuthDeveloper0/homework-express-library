import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    isBorrowed: { type: Boolean, default: false },
    borrowHistory: [
        {
            borrowDate: { type: String },
            customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
        }
    ]
}, { timestamps: true }); 

const Book = mongoose.model('Book', bookSchema);
export default Book;