const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    pageNum: { type: Number, required: true },
    imageURL: { type: String, required: true },
    topic: { type: String, required: true },
    id: { type: mongoose.Schema.Types.ObjectId, auto: true },
 })
 
 const Book = mongoose.model("Book", bookSchema);
module.exports = Book;