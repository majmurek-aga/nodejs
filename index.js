const express = require("express");
const fs = require("fs");
const morgan = require("morgan");
const cors = require("cors");
const compression = require("compression");
const {createBook, getAllBooks, getBook, updateBook, deleteBook} = require("./controller/bookController");

const app = express();
app.use(express.json());

//1) MIDDLEWARES

app.use(morgan("dev"));
app.use(cors());
app.use(compression());

app.use((req, res, next) => {
  console.log("Hello from middleware");
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString(); // i teraz dodaj do funkcji console log, console.log(req.requestTime)
  next();
});

//MIDDLEWARE
const books = JSON.parse(fs.readFileSync(`${__dirname}/data/books.json`));

// app.get("/api/v1/books", (req, res) => {
//   res.status(200).json({
//     status: "success",
//     results: books.length,
//     message: "All books retrieved successfully",
//     data: books,
//   });
// });

// app.post("/api/v1/books", (req, res) => {
//   console.log(req.body); // nie dziala -> app.use(express.json())
//   books.sort((a, b)=> a.id > b.id);
//   const id = books[books.length - 1].id + 1;
//   const newBook = { ...req.body, id };

//   books.push({ ...newBook, id });

//   fs.writeFile(`${__dirname}/data/books.json`, JSON.stringify(books), (err) => {
//     res.status(201).json({
//       status: "success",
//       data: {
//         book: newBook,
//       },
//     });
//   });
// });

// app.get("/api/v1/books/:id", (req, res) => {
//   const book = books.find((book) => `${book.id}` === req.params.id);

//   if (!book) {
//     res.status(404).json({
//       status: "Not found",
//       message: "Invalid id",
//     });
//   }

//   res.status(200).json({
//     status: "success",
//     message: "Book retrieved successfully",
//     data: book,
//   });
// });

// app.patch("/api/v1/books/:id", (req, res) => {
//   const book = books.find((book) => `${book.id}` === req.params.id);

//   if (!book) {
//     res.status(404).json({
//       status: "Not found",
//       message: "Invalid id",
//     });
//   }

//   const newBooks = books.map((book) => {
//     if (`${book.id}` === req.params.id) {
//       return { ...book, ...req.body };
//     }
//     return book;
//   });

//   fs.writeFile(`${__dirname}/data/books.json`, JSON.stringify(newBooks), () => {
//     res.status(201).json({
//       status: "success",
//       data: {
//         books: newBooks,
//       },
//     });
//   });
// });

// app.delete("/api/v1/books/:id", (req, res) => {
//   const book = books.find((book) => `${book.id}` === req.params.id);

//   if (!book) {
//     res.status(404).json({
//       status: "Not found",
//       message: "Invalid id",
//     });
//   }

//   const newBooks = books.filter((book) => `${book.id}` !== req.params.id);

//   fs.writeFile(`${__dirname}/data/books.json`, JSON.stringify(newBooks), () => {
//     res.status(201).json({
//       status: "success",
//       results: newBooks.length,
//       data: {
//         books: newBooks,
//       },
//     });
//   });
// });

// 2)  ROUTES HANDLING
// const getAllBooks = (req, res) => {
//   // console.log(req.requestTime);
//   res.status(200).json({
//     status: "success",
//     requestedAt: req.requestTime, //
//     results: books.length,
//     message: "All books retrieved successfully",
//     data: books,
//   });
// };

const checkIfBookExist = (req, res) => {
  const book = books.find((book) => `${book.id}` === req.params.id);

  if (!book) {
    res.status(404).json({
      status: "Not found",
      message: "Invalid id",
    });
  }
  return book;
};

// const getBook = (req, res) => {
//   const book = checkIfBookExist(req, res);

//   res.status(200).json({
//     status: "success",
//     message: "Book retrieved successfully",
//     data: book,
//   });
// };

const writeBooks = (req, res, books) => {
  fs.writeFile(`${__dirname}/data/books.json`, JSON.stringify(books), (err) => {
    res.status(201).json({
      status: "success",
      data: {
        books,
      },
    });
  });
};

// const createBook = (req, res) => {
//   books.sort((a, b) => a.id > b.id);
//   const id = books[books.length - 1].id + 1;
//   const newBook = { ...req.body, id };

//   books.push({ ...newBook, id });

//   writeBooks(req, res, books);
// };

// const updateBook = (req, res) => {
//   const book = checkIfBookExist(req, res);

//   const newBooks = books.map((book) => {
//     if (`${book.id}` === req.params.id) {
//       return { ...book, ...req.body };
//     }
//     return book;
//   });

//   writeBooks(req, res, newBooks);
// };

// const deleteBook = (req, res) => {
//   const book = checkIfBookExist(req, res);

//   const newBooks = books.filter((book) => `${book.id}` !== req.params.id);

//   writeBooks(req, res, newBooks);
// };

// app.get("/api/v1/books", getAllBooks);
// app.get("/api/v1/books/:id", getBook);
// app.post("/api/v1/books", createBook);
// app.patch("/api/v1/books/:id", updateBook);
// app.delete("/api/v1/books/:id", deleteBook);

// 3)  ROUTES
app.route("/api/v1/books").get(getAllBooks).post(createBook);

app
  .route("/api/v1/books/:id")
  .get(getBook)
  .patch(updateBook)
  .delete(deleteBook);

// 4)  START SERVER
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

module.exports = app;