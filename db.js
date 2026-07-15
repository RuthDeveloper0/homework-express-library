const books = [
    {
        id: 1,
        title: "The Hobbit",
        category: "Fantasy",
        price: 45,
        isBorrowed: false,
        borrowHistory: []
    },
    {
        id: 2,
        title: "A Brief History of Time",
        category: "Science",
        price: 60,
        isBorrowed: true,
        borrowHistory: [
            { borrowDate: "2026-07-01", customerId: 101 },
            { borrowDate: "2026-07-10", customerId: 102 }
        ]
    },
    {
        id: 3,
        title: "Introduction to Algorithms",
        category: "Computers",
        price: 95,
        isBorrowed: false,
        borrowHistory: [
            { borrowDate: "2026-05-12", customerId: 103 }
        ]
    }
];

module.exports = { books };