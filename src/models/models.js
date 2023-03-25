const mongoose = require("mongoose");

const PageSchema = new mongoose.Schema({
  pageNumber: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  associatedSentences: [
    {
      type: String,
      required: true,
    },
  ],
});

const Page = mongoose.model("Page", PageSchema);
const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  cover: {
    type: String,
    required: true,
  },
  pages: [
    {
      type: [PageSchema],
    },
  ],
});
const Book = mongoose.model("Book", BookSchema);

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  books: {
    type: [BookSchema],
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = { User, Book, Page };
