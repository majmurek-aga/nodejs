const Book = require("../models/bookModel");

// const testBook = new Book({
//     title: "Book Title",
//     author: "Author Name",
//     pageNum: 200,
//     imageURL: "https://example.com/book.jpg",
//     topic: "Technology",
// })

// testBook.save().then((result) => console.log(result)).catch((err) => console.log(err));

exports.createBook = async (req, res) => {
  try {
    const newBook = await Book.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        book: newBook,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();

    res.status(200).json({
      status: "success",
      requestedAt: req.requestTime, //
      results: books.length,
      message: "All books retrieved successfully",
      data: books,
    });
  } catch (err) {
    res.status(404).json({
      status: "not_found",
      message: err.message,
    });
  }
};

exports.getBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    res.status(200).json({
      status: "success",
      data: {
        book,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "not_found",
      message: err.message,
    });
  }
};


exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);

    res.status(200).json({
      status: "success",
      data: {
        book,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "not_found",
      message: err.message,
    });
  }
}

exports.updateBook = async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.status(200).json({
      status: "success",
      data: {
        book: updatedBook,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "not_found",
      message: err.message,
    });
  }
}