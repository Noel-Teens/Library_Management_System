const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Book title is required"],
    trim: true
  },
  author: {
    type: String,
    required: [true, "Author name is required"],
    trim: true
  },
  category: {
    type: String,
    required: [true, "Category is required"],
    trim: true
  },
  publishedYear: {
    type: Number,
    required: [true, "Published year is required"],
    min: [1000, "Published year must be valid"],
    max: [new Date().getFullYear(), "Published year cannot be in the future"]
  },
  availableCopies: {
    type: Number,
    required: [true, "Available copies is required"],
    min: [0, "Available copies cannot be negative"],
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

module.exports = mongoose.model("Book", bookSchema);
