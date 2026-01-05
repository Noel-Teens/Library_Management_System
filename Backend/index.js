const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

const customerRoutes = require("./routes/customerRoutes");
const bookRoutes = require("./routes/bookRoutes");

app.use("/customers", customerRoutes);
app.use("/books", bookRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  dbName: "libraryDB"
})
  .then(() => console.log("MongoDB Connected to libraryDB"))
  .catch(err => console.log("MongoDB connection error:", err));

// Root endpoint
app.get("/", (req, res) => {
  res.json({ message: "Library Book Management API" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log('Server running on port ${PORT}');
  console.log("Available endpoints:");
  console.log("  POST   /books                 - Create new book");
  console.log("  GET    /books                 - Get all books");
  console.log("  GET    /books/:id             - Get book by ID");
  console.log("  GET    /books/category/:name  - Get books by category");
  console.log("  GET    /books/year/:year      - Get books published after year");
  console.log("  PUT    /books/:id             - Update book details");
  console.log("  PATCH  /books/:id/copies     - Update available copies");
  console.log("  PATCH  /books/:id/category   - Update book category");
  console.log("  DELETE /books/:id            - Delete book (only if copies = 0)");
});
