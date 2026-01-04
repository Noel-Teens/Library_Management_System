const express = require("express");
const router = express.Router();
const Book = require("../models/Book");

// Error handling wrapper
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// 1️⃣ CREATE - Add a new book
router.post("/", asyncHandler(async (req, res) => {
  const { title, author, category, publishedYear, availableCopies } = req.body;

  // Validation
  if (!title || !author || !category || publishedYear === undefined || availableCopies === undefined) {
    return res.status(400).json({ 
      error: "All fields are required (title, author, category, publishedYear, availableCopies)" 
    });
  }

  if (availableCopies < 0) {
    return res.status(400).json({ 
      error: "Available copies cannot be negative" 
    });
  }

  const book = await Book.create(req.body);
  res.status(201).json({
    message: "Book created successfully",
    book
  });
}));

// 2️⃣ READ - Get all books
router.get("/", asyncHandler(async (req, res) => {
  const books = await Book.find().sort({ createdAt: -1 });
  res.json({
    count: books.length,
    books
  });
}));

// 3️⃣ READ - Get books by category
router.get("/category/:category", asyncHandler(async (req, res) => {
  const category = req.params.category;
  const books = await Book.find({ category: { $regex: category, $options: "i" } });

  if (books.length === 0) {
    return res.status(404).json({ 
      error: `No books found in category: ${category}` 
    });
  }

  res.json({
    category,
    count: books.length,
    books
  });
}));

// 4️⃣ READ - Get books published after a specific year
router.get("/year/:year", asyncHandler(async (req, res) => {
  const year = parseInt(req.params.year);

  if (isNaN(year)) {
    return res.status(400).json({ 
      error: "Year must be a valid number" 
    });
  }

  const books = await Book.find({ publishedYear: { $gt: year } }).sort({ publishedYear: -1 });

  if (books.length === 0) {
    return res.status(404).json({ 
      error: `No books found after year ${year}` 
    });
  }

  res.json({
    searchYear: year,
    count: books.length,
    books
  });
}));

// 5️⃣ READ - Get specific book by ID
router.get("/:id", asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);

  if (!book) {
    return res.status(404).json({ 
      error: `Book with ID ${req.params.id} not found` 
    });
  }

  res.json(book);
}));

// 6️⃣ UPDATE - Increase/Decrease available copies
router.patch("/:id/copies", asyncHandler(async (req, res) => {
  const { quantity } = req.body;

  if (quantity === undefined) {
    return res.status(400).json({ 
      error: "Quantity is required" 
    });
  }

  if (!Number.isInteger(quantity)) {
    return res.status(400).json({ 
      error: "Quantity must be an integer" 
    });
  }

  const book = await Book.findById(req.params.id);

  if (!book) {
    return res.status(404).json({ 
      error: `Book with ID ${req.params.id} not found` 
    });
  }

  const newCopies = book.availableCopies + quantity;

  if (newCopies < 0) {
    return res.status(400).json({ 
      error: `Cannot reduce copies below 0. Current: ${book.availableCopies}, Reduction: ${Math.abs(quantity)}` 
    });
  }

  book.availableCopies = newCopies;
  await book.save();

  res.json({
    message: "Copies updated successfully",
    book
  });
}));

// 7️⃣ UPDATE - Change book category
router.patch("/:id/category", asyncHandler(async (req, res) => {
  const { category } = req.body;

  if (!category) {
    return res.status(400).json({ 
      error: "New category is required" 
    });
  }

  const book = await Book.findByIdAndUpdate(
    req.params.id,
    { category },
    { new: true, runValidators: true }
  );

  if (!book) {
    return res.status(404).json({ 
      error: `Book with ID ${req.params.id} not found` 
    });
  }

  res.json({
    message: "Category updated successfully",
    book
  });
}));

// 8️⃣ UPDATE - Update other book details
router.put("/:id", asyncHandler(async (req, res) => {
  const { title, author, publishedYear, availableCopies } = req.body;

  if (availableCopies !== undefined && availableCopies < 0) {
    return res.status(400).json({ 
      error: "Available copies cannot be negative" 
    });
  }

  const book = await Book.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  if (!book) {
    return res.status(404).json({ 
      error: `Book with ID ${req.params.id} not found` 
    });
  }

  res.json({
    message: "Book updated successfully",
    book
  });
}));

// 9️⃣ DELETE - Remove book if available copies = 0
router.delete("/:id", asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);

  if (!book) {
    return res.status(404).json({ 
      error: `Book with ID ${req.params.id} not found` 
    });
  }

  if (book.availableCopies !== 0) {
    return res.status(400).json({ 
      error: `Cannot delete book. Available copies: ${book.availableCopies}. Please reduce to 0 first.` 
    });
  }

  await Book.findByIdAndDelete(req.params.id);

  res.json({
    message: "Book deleted successfully",
    deletedBook: book
  });
}));

// Error handling middleware
router.use((err, req, res, next) => {
  console.error(err);

  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map(e => e.message);
    return res.status(400).json({ error: messages });
  }

  if (err.name === "CastError") {
    return res.status(400).json({ error: "Invalid book ID format" });
  }

  res.status(500).json({ error: "Internal server error" });
});

module.exports = router;
