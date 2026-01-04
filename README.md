# 📚 Library Management System


## 🏗️ Architecture

The project is split into two main parts:
- **[Backend](./Backend)**: A RESTful API built with Express and Mongoose.
- **[Frontend](./Frontend)**: A responsive SPA built with React and Vite.

## 🚀 Features

- **Book Inventory Management**:
  - Full CRUD operations (Create, Read, Update, Delete).
  - Search by title, author, or category.
  - Filter by publication year or specific categories (e.g., Fiction).
  - Inventory controls: Update available copies and categories.
  - Deletion safety: Books can only be deleted if stock is zero.
- **Customer Directory**:
  - Manage customer profiles (Name, Age, Membership).
  - Search and filter customers.
  - Membership badges (Bronze, Silver, Gold, Platinum).
- **Modern UI/UX**:
  - Dashboard-style interface with tabbed navigation.
  - Real-time feedback (loading states, success/error notifications).
  - Responsive design for mobile and desktop.

## 🛠️ Tech Stack

### Backend
- **Node.js** & **Express.js** (v5.2.1)
- **MongoDB** with **Mongoose** (v9.1.1)
- **CORS** for secure frontend-backend communication
- **Dotenv** for environment variable management
- **Nodemon** for development efficiency

### Frontend
- **React** (v19)
- **Vite** (Build tool)
- **CSS Modules** & Modern CSS (Gradients, Flexbox, Grid)
- **Fetch API** for backend integration

## 📋 Prerequisites

- **Node.js** (v18+ recommended)
- **MongoDB** (Local instance or MongoDB Atlas)

## ⚡ Quick Start

### 1. Setup Backend
```bash
cd Backend
npm install
# Create a .env file and add:
# MONGO_URI=your_mongodb_connection_string
npm run seed  # Optional: Seed sample data
npm run dev   # Runs on http://localhost:3000
```

### 2. Setup Frontend
```bash
# In a new terminal
cd Frontend
npm install
npm run dev   # Runs on http://localhost:5173
```

## 🔌 API Endpoints Reference

| Entity | Method | Endpoint | Description |
|--------|--------|----------|-------------|
| Books | GET | `/books` | Get all books |
| Books | POST | `/books` | Create new book |
| Books | PATCH | `/books/:id/copies` | Update stock quantity |
| Books | DELETE | `/books/:id` | Delete book (if copies=0) |
| Customers | GET | `/customers` | Get all customers |
| Customers | POST | `/customers` | Register new customer |

## 📁 Project Structure

```
.
├── Backend/                 # Express API
│   ├── models/              # Mongoose Schemas
│   ├── routes/              # API Route Handlers
│   └── seed.js              # Database Seeder
└── Frontend/                # React Vite App
    ├── src/
    │   ├── components/      # UI Components (Books/Customers)
    │   └── App.jsx          # Main App Logic
```

## 📜 License
This project is licensed under the ISC License.