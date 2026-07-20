# תיעוד מערכת ניהול - Tuition Management System

### כתובת האתר (Base URL)
`http://localhost:5001`

### קישור למאגר (Repository URL)
https://github.com/RuthDeveloper0/homework-express-library.git

### פירוט משתני הסביבה
* `PORT`: פורט הרצת השרת (ברירת מחדל: 5001)
* `JWT_SECRET`: מפתח אבטחה סודי להנפקת אסימוני גישה (Tokens)
* `MONGO_URI`: מחרוזת התחברות למסד הנתונים MongoDB

---

## טבלת פעולות עבור משאב משתמשים (Users Resource)

| url | method | description | permissions | parameters | optional parameters | body | headers | returns |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `/api/users/signup` | `POST` | הרשמת משתמש חדש למערכת | גישה ציבורית | ללא | ללא | `username`, `phone`, `email`, `password`, `role` | ללא | פרטי המשתמש שנוצר + Token |
| `/api/users/signin` | `POST` | התחברות משתמש רשום וקבלת אסימון | גישה ציבורית | ללא | ללא | `email`, `password` | ללא | הודעת הצלחה + Token בתוקף |
| `/api/users` | `GET` | קבלת רשימת כל המשתמשים במערכת | מנהל (`admin`) בלבד | ללא | ללא | ללא | `Authorization: Bearer <token>` | מערך JSON של כל המשתמשים |