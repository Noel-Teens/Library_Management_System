const mongoose = require("mongoose");
require("dotenv").config();

const Book = require("./models/Book");

const seedBooks = [
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    category: "Fiction",
    publishedYear: 1925,
    availableCopies: 5
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    category: "Fiction",
    publishedYear: 1960,
    availableCopies: 3
  },
  {
    title: "1984",
    author: "George Orwell",
    category: "Dystopian",
    publishedYear: 1949,
    availableCopies: 4
  },
  {
    title: "Pride and Prejudice",
    author: "Jane Austen",
    category: "Romance",
    publishedYear: 1813,
    availableCopies: 6
  },
  {
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    category: "Fiction",
    publishedYear: 1951,
    availableCopies: 2
  },
  {
    title: "Sapiens",
    author: "Yuval Noah Harari",
    category: "Non-Fiction",
    publishedYear: 2011,
    availableCopies: 7
  },
  {
    title: "Educated",
    author: "Tara Westover",
    category: "Biography",
    publishedYear: 2018,
    availableCopies: 4
  },
  {
    title: "Atomic Habits",
    author: "James Clear",
    category: "Self-Help",
    publishedYear: 2018,
    availableCopies: 8
  },
  {
    title: "The Silent Patient",
    author: "Alex Michaelides",
    category: "Thriller",
    publishedYear: 2019,
    availableCopies: 5
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "libraryDB"
    });
    console.log("MongoDB Connected to libraryDB");

    // Clear existing books
    await Book.deleteMany({});
    console.log("Cleared existing books");

    // Insert seed books
    const result = await Book.insertMany(seedBooks);
    console.log(`\n✅ Successfully inserted ${result.length} books:\n`);
    
    result.forEach((book, index) => {
      console.log(`${index + 1}. ${book.title} by ${book.author} (${book.publishedYear}) - ${book.availableCopies} copies available`);
    });

    console.log("\n📚 Sample Books Inserted Successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
