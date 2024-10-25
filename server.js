const dotenv = require("dotenv");
const app = require("./index");
const mongoose = require("mongoose");
const { MongoClient, ServerApiVersion } = require('mongodb');

dotenv.config({ path: "./config.env" });
const PORT = process.env.PORT || 3000;
const DB = process.env.DATABASE.replace('<db_password>', process.env.DATABASE_PASSWORD);

// const client = new MongoClient(DB, {
//     serverApi: {
//       version: ServerApiVersion.v1,
//       strict: true,
//       deprecationErrors: true,
//     }
//   });
//   async function run() {
//     try {
//       // Connect the client to the server	(optional starting in v4.7)
//       await client.connect();
//       // Send a ping to confirm a successful connection
//       await client.db("admin").command({ ping: 1 });
//       console.log("Pinged your deployment. You successfully connected to MongoDB!");
//     } finally {
//       // Ensures that the client will close when you finish/error
//       await client.close();
//     }
//   }
//   run().catch(console.dir);
mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

}).then(() => console.log("Connected to MongoDB"));

// const bookSchema = new mongoose.Schema({
//     title: { type: String, required: true },
//     author: { type: String, required: true },
//     pageNum: { type: Number, required: true },
//     imageURL: { type: String, required: true },
//     topic: { type: String, required: true },
//     id: { type: mongoose.Schema.Types.ObjectId, auto: true },
//  })
 
//  const Book = mongoose.model("Book", bookSchema);



// const testBook = new Book({
//     title: "Book Title",
//     author: "Author Name",
//     pageNum: 200,
//     imageURL: "https://example.com/book.jpg",
//     topic: "Technology",
// })

// testBook.save().then((result) => console.log(result)).catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
