import mongoose from 'mongoose';

// סכמה פנימית לפריט במערך ההשאלות (שלב 6, סעיף 26)
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
        // ביטוי רגולרי לבדיקת טלפון ישראלי תקין
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
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    // מערך ההשאלות של המשתמש
    borrowedBooks: [borrowItemSchema],
    
    // מערך ההשאלות של המשתמש
    borrowedBooks: [borrowItemSchema] 
}, { timestamps: true });

// שלב 7: הגדרת טרנספורמציה לתוצאות השאילתות בעת המרה ל-JSON
userSchema.set('toJSON', {
    transform: (doc, ret) => {
        ret.id = ret._id;    // הפיכת _id ל-id
        delete ret._id;      // הסרת ה-_id המקורי
        delete ret.password; // הסרת שדה הסיסמה מטעמי אבטחה
        delete ret.__v;      // הסרת שדה הגרסה של מונגו
        return ret;
    }
});

// שלב 7: הגדרת טרנספורמציה בעת המרה לאובייקט
userSchema.set('toObject', {
    transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
        return ret;
    }
});

// יצירת המודל והאקספורט (פעם אחת בלבד!)
const User = mongoose.model('User', userSchema);
export default User;