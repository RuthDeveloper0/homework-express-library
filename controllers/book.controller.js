import Book from '../models/book.model.js';

// קבלת כל הספרים
export const getAllBooks = async (req, res, next) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (error) {
        next(error);
    }
};

// קבלת ספר לפי קוד (ID)
export const getBookById = async (req, res, next) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            res.status(404);
            throw new Error('ספר לא נמצא');
        }
        res.status(200).json(book);
    } catch (error) {
        next(error);
    }
};

// הוספת ספר חדש - ודאי ששם הפונקציה תואם בדיוק לייבוא בראוטר!
export const createBook = async (req, res, next) => {
    try {
        const newBook = await Book.create(req.body);
        res.status(201).json(newBook);
    } catch (error) {
        next(error);
    }
};

// עדכון ספר
export const updateBook = async (req, res, next) => {
    try {
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedBook) {
            res.status(404);
            throw new Error('ספר לא נמצא לעדכון');
        }
        res.status(200).json(updatedBook);
    } catch (error) {
        next(error);
    }
};

// מחיקת ספר
export const deleteBook = async (req, res, next) => {
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id);
        if (!deletedBook) {
            res.status(404);
            throw new Error('ספר לא נמצא למחיקה');
        }
        res.status(200).json({ message: 'הספר נמחק בהצלחה' });
    } catch (error) {
        next(error);
    }
};

// קבלת ספרים לפי קטגוריה (סעיף 29)
export const getBooksByCategory = async (req, res, next) => {
    try {
        const { categoryName } = req.params;
        const books = await Book.find({ categories: categoryName });
        res.status(200).json(books);
    } catch (error) {
        next(error);
    }
};