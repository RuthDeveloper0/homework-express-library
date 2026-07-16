
export const addCurrentDate = (req, res, next) => {
    req.currentDate = new Date();
    next();
};


export const logGetDate = (req, res, next) => {
    if (req.method === 'GET') {
        console.log(`[GET Request Time]: ${req.currentDate.toISOString()}`);
    }
    next();
};

//רשות
export const checkLibraryHours = (req, res, next) => {
    const now = req.currentDate || new Date();
    const day = now.getDay(); 
    const hours = now.getHours();


    if (day === 5 && hours >= 12) {
        return res.status(403).json({ message: "הספרייה סגורה החל מיום שישי בצהריים." });
    }


    if (day === 6 && hours < 22) {
        return res.status(403).json({ message: "הספרייה סגורה ביום שבת." });
    }

    next();
};


export const notFoundHandler = (req, res, next) => {
    const error = new Error(`נתיב לא נמצא - ${req.originalUrl}`);
    res.status(404);
    next(error); 
};


export const errorHandler = (err, req, res, next) => {
  
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    
    res.status(statusCode).json({
        error: {
            message: err.message,
            type: statusCode === 404 ? 'not found' : 'server error',

            stack: process.env.NODE_ENV === 'production' ? null : err.stack
        }
    });
};