import Book from '../models/book.model.js';

export const getAllBooks = async (req, res) => {
    try {
        const { title } = req.query;
        const page = parseInt(req.query.page) || 1;      
        const limit = parseInt(req.query.limit) || 10;  
        const startIndex = (page - 1) * limit;


        let queryFilter = {};
        if (title) {
            queryFilter.title = { $regex: title, $options: 'i' }; 
        }

        const filteredBooks = await Book.find(queryFilter)
                                        .skip(startIndex)
                                        .limit(limit);

        res.json(filteredBooks);
    } catch (error) {
        res.status(500).json({ message: "שגיאה בקבלת הספרים", error: error.message });
    }
};

export const getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (book) {
            res.json(book); 
        } else {
            res.status(404).send('not found the book');
        }
    } catch (error) {
        res.status(400).json({ message: "מזהה ספר לא תקין", error: error.message });
    }
};


export const createBook = async (req, res) => {
    try {
        const newBook = new Book(req.body); 
        await newBook.save();    
        res.status(201).json(newBook); 
    } catch (error) {
        res.status(400).json({ message: "שגיאה ביצירת הספר", error: error.message });
    }
};


export const updateBook = async (req, res) => {
    try {
        const bookId = req.params.id; 

        const updatedBook = await Book.findByIdAndUpdate(
            bookId, 
            { $set: req.body }, 
            { new: true, runValidators: true }
        );

        if (!updatedBook) {
            return res.status(404).send('הספר לא נמצא');
        }

        res.json({ message: "הספר עודכן בהצלחה", book: updatedBook });
    } catch (error) {
        res.status(400).json({ message: "שגיאה בעדכון הספר", error: error.message });
    }
};


export const deleteBook = async (req, res) => {
    try {
        const bookId = req.params.id;
        const deletedBook = await Book.findByIdAndDelete(bookId);

        if (!deletedBook) {
            return res.status(404).send('הספר לא נמצא ומחיקתו נכשלה');
        }

        res.json({ message: "הספר נמחק בהצלחה", book: deletedBook });
    } catch (error) {
        res.status(400).json({ message: "שגיאה במחיקת הספר", error: error.message });
    }
};


export const borrowBook = async (req, res) => {
    try {
        const bookId = req.params.id;
        const { customerId } = req.body; 

        const book = await Book.findById(bookId);
        if (!book) return res.status(404).send('הספר לא נמצא');
        if (book.isBorrowed) return res.status(400).send('הספר כבר מושאל');


        book.isBorrowed = true;
        book.borrowHistory.push({
            borrowDate: new Date().toISOString().split('T')[0], 
            customerId: customerId
        });

        await book.save();
        res.json({ message: "הספר הושאל בהצלחה", book });
    } catch (error) {
        res.status(400).json({ message: "שגיאה בתהליך השאלת הספר", error: error.message });
    }
};


export const returnBook = async (req, res) => {
    try {
        const bookId = req.params.id;

        const book = await Book.findById(bookId);
        if (!book) return res.status(404).send('הספר לא נמצא');
        if (!book.isBorrowed) return res.status(400).send('הספר אינו במצב מושאל');

        book.isBorrowed = false;
        await book.save();

        res.json({ message: "הספר הוחזר בהצלחה", book });
    } catch (error) {
        res.status(400).json({ message: "שגיאה בתהליך החזרת הספר", error: error.message });
    }
};