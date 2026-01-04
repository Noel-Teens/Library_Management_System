# 📚 Library Book Management System

A complete REST API backend for managing library books with comprehensive CRUD operations, validation, and error handling.

## ✨ Features

### ✅ Complete CRUD Operations
- **Create**: Add new books with validation
- **Read**: Retrieve all books, by ID, by category, or by published year
- **Update**: Modify copies, category, or any field with full validation
- **Delete**: Remove books only when copies = 0

### ✅ Comprehensive Error Handling
- Book not found (404)
- Negative stock prevention (400)
- Invalid updates (400)
- Missing required fields (400)
- Delete constraints (400)
- Invalid ID format (400)
- Server errors (500)

### ✅ Schema Validation
- Required field enforcement
- Type checking
- Min/max constraints
- Published year validation
- Automatic timestamps

### ✅ Production Ready
- Async/await error wrapping
- Input sanitization
- Case-insensitive search
- Proper HTTP status codes
- Descriptive error messages

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
Create a `.env` file in the root directory:
```
MONGO_URI=mongodb://localhost:27017/
```

For MongoDB Atlas (Cloud):
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/
```

### 3. Seed Sample Data
```bash
npm run seed
```
This inserts 9 sample books into the database.

### 4. Start Development Server
```bash
npm run dev
```

The server will run on **http://localhost:3000**

---

## 📊 Database Schema

**Database**: `libraryDB`  
**Collection**: `books`

```javascript
{
  title: String (required),
  author: String (required),
  category: String (required),
  publishedYear: Number (required, min: 1000, max: current year),
  availableCopies: Number (required, min: 0),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

---

## 🔌 API Endpoints

### CREATE - Add New Book
```http
POST /books
Content-Type: application/json

{
  "title": "The Hobbit",
  "author": "J.R.R. Tolkien",
  "category": "Fantasy",
  "publishedYear": 1937,
  "availableCopies": 5
}
```

**Response**: `201 Created`
```json
{
  "message": "Book created successfully",
  "book": { ... }
}
```

---

### READ - Get All Books
```http
GET /books
```

**Response**: `200 OK`
```json
{
  "count": 9,
  "books": [
    {
      "_id": "...",
      "title": "The Great Gatsby",
      "author": "F. Scott Fitzgerald",
      "category": "Fiction",
      "publishedYear": 1925,
      "availableCopies": 5,
      "createdAt": "2026-01-04T...",
      "updatedAt": "2026-01-04T..."
    },
    ...
  ]
}
```

---

### READ - Get Books by Category
```http
GET /books/category/Fiction
```

**Response**: `200 OK`
```json
{
  "category": "Fiction",
  "count": 3,
  "books": [ ... ]
}
```

**Error**: `404 Not Found`
```json
{
  "error": "No books found in category: Fiction"
}
```

---

### READ - Get Books Published After Year
```http
GET /books/year/2015
```

**Response**: `200 OK`
```json
{
  "searchYear": 2015,
  "count": 4,
  "books": [ ... ]
}
```

**Error**: `404 Not Found`
```json
{
  "error": "No books found after year 2015"
}
```

---

### READ - Get Book by ID
```http
GET /books/:id
```

**Response**: `200 OK`
```json
{
  "_id": "...",
  "title": "1984",
  "author": "George Orwell",
  "category": "Dystopian",
  "publishedYear": 1949,
  "availableCopies": 4,
  "createdAt": "2026-01-04T...",
  "updatedAt": "2026-01-04T..."
}
```

**Error**: `404 Not Found`
```json
{
  "error": "Book with ID 000000000000000000000000 not found"
}
```

---

### UPDATE - Increase/Decrease Copies
```http
PATCH /books/:id/copies
Content-Type: application/json

{
  "quantity": 3
}
```

**Response**: `200 OK`
```json
{
  "message": "Copies updated successfully",
  "book": { ... }
}
```

**Error - Negative Stock**: `400 Bad Request`
```json
{
  "error": "Cannot reduce copies below 0. Current: 5, Reduction: 10"
}
```

---

### UPDATE - Change Category
```http
PATCH /books/:id/category
Content-Type: application/json

{
  "category": "Adventure"
}
```

**Response**: `200 OK`
```json
{
  "message": "Category updated successfully",
  "book": { ... }
}
```

---

### UPDATE - Update Book Details
```http
PUT /books/:id
Content-Type: application/json

{
  "title": "New Title",
  "author": "New Author",
  "publishedYear": 2020
}
```

**Response**: `200 OK`
```json
{
  "message": "Book updated successfully",
  "book": { ... }
}
```

---

### DELETE - Remove Book (Only if copies = 0)
```http
DELETE /books/:id
```

**Response**: `200 OK`
```json
{
  "message": "Book deleted successfully",
  "deletedBook": { ... }
}
```

**Error - Copies Not Zero**: `400 Bad Request`
```json
{
  "error": "Cannot delete book. Available copies: 5. Please reduce to 0 first."
}
```

---

## 📚 Sample Data

The seed script inserts 9 books:

| # | Title | Author | Year | Category | Copies |
|---|-------|--------|------|----------|--------|
| 1 | The Great Gatsby | F. Scott Fitzgerald | 1925 | Fiction | 5 |
| 2 | To Kill a Mockingbird | Harper Lee | 1960 | Fiction | 3 |
| 3 | 1984 | George Orwell | 1949 | Dystopian | 4 |
| 4 | Pride and Prejudice | Jane Austen | 1813 | Romance | 6 |
| 5 | The Catcher in the Rye | J.D. Salinger | 1951 | Fiction | 2 |
| 6 | Sapiens | Yuval Noah Harari | 2011 | Non-Fiction | 7 |
| 7 | Educated | Tara Westover | 2018 | Biography | 4 |
| 8 | Atomic Habits | James Clear | 2018 | Self-Help | 8 |
| 9 | The Silent Patient | Alex Michaelides | 2019 | Thriller | 5 |

---

## 🧪 Testing

### Using Postman
1. Import `postman_books.json` into Postman
2. Run the collection to execute all test cases
3. 12 test scenarios included:
   - ✅ Create new book
   - ✅ Get all books
   - ✅ Filter by category
   - ✅ Filter by published year
   - ✅ Increase copies
   - ✅ Decrease copies
   - ✅ Change category
   - ✅ Delete book
   - ✅ Error: Delete with copies > 0
   - ✅ Error: Negative stock
   - ✅ Error: Book not found
   - ✅ Error: Missing fields

---

## ⚠️ Error Handling

| Status | Error | Scenario |
|--------|-------|----------|
| 400 | Missing required fields | POST without all fields |
| 400 | Available copies cannot be negative | POST/PUT with negative copies |
| 400 | Cannot reduce copies below 0 | PATCH /copies with too large negative quantity |
| 400 | Cannot delete book | DELETE when copies > 0 |
| 400 | Invalid book ID format | Invalid MongoDB ObjectID |
| 404 | Book with ID ... not found | GET/PUT/PATCH/DELETE non-existent book |
| 404 | No books found in category | GET /category with no matches |
| 404 | No books found after year | GET /year with no matches |
| 500 | Internal server error | Unexpected server error |

---

## 📁 Project Structure

```
Backend/
├── models/
│   ├── Book.js                      # Book schema & model
│   └── Customer.js                  # Existing customer model
├── routes/
│   ├── bookRoutes.js                # Book API endpoints
│   └── customerRoutes.js            # Existing customer routes
├── index.js                         # Express server setup
├── seed.js                          # Database seeding script
├── package.json                     # Dependencies & scripts
├── .env                             # Environment variables (create this)
├── postman_books.json               # Postman test collection
├── SETUP_GUIDE.md                   # Detailed setup instructions
├── IMPLEMENTATION_SUMMARY.txt       # Implementation checklist
├── QUICK_REFERENCE.txt              # Quick reference guide
└── README.md                        # This file
```

---

## 🛠️ Tech Stack

- **Framework**: Express.js 5.2.1
- **Database**: MongoDB with Mongoose 9.1.1
- **CORS**: cors 2.8.5
- **Environment**: dotenv 17.2.3
- **Dev Tool**: nodemon 3.1.11

---

## 📋 Requirements Checklist

### Schema ✅
- ✓ Title (String, required)
- ✓ Author (String, required)
- ✓ Category (String, required)
- ✓ PublishedYear (Number, required)
- ✓ AvailableCopies (Number, required)

### CRUD Operations ✅
- ✓ Insert 7+ books (9 inserted)
- ✓ Read all books
- ✓ Read books by category
- ✓ Read books after year 2015
- ✓ Update copies (increase/decrease)
- ✓ Update category
- ✓ Delete book (if copies = 0)

### Error Handling ✅
- ✓ Book not found (404)
- ✓ Negative stock prevention (400)
- ✓ Invalid update (400)
- ✓ Missing required fields (400)
- ✓ Delete constraints (400)

---

## 🚀 Available Commands

```bash
# Install dependencies
npm install

# Start production server
npm start

# Start development server with auto-reload
npm run dev

# Seed database with sample books
npm run seed
```

---

## 🔒 Security & Best Practices

✅ Input validation at API level  
✅ Schema validation at database level  
✅ Error handling middleware  
✅ CORS enabled for cross-origin requests  
✅ Async/await with proper error wrapping  
✅ Descriptive error messages  
✅ Proper HTTP status codes  
✅ Environment variable configuration  

---

## 📞 Support

For issues or questions:
1. Check SETUP_GUIDE.md for detailed setup instructions
2. Check QUICK_REFERENCE.txt for quick API reference
3. Review error messages for validation details
4. Import postman_books.json for API examples

---

**Status**: ✅ Production Ready

All requirements implemented with comprehensive error handling and validation.

## Frontend Integration

This backend API is designed to work with the React frontend application located in the `Frontend` directory. The frontend provides:

- Book Management interface with CRUD operations
- Customer Management interface
- Real-time data synchronization
- Form validation and error handling

To run the complete application:

1. Start the backend server: `npm run dev` (in Backend directory)
2. In a separate terminal, navigate to the Frontend directory and run: `npm run dev`
3. Access the frontend at `http://localhost:5173`
