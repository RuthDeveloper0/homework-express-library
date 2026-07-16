
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