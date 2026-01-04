# Library Management System - Frontend

A React-based frontend application for the Library Management System that connects to a Node.js/Express backend with MongoDB.

## Features

- Book Management:
  - Create, read, update, and delete books
  - Filter books by category and publication year
  - Update available copies
  - Change book categories

- Customer Management:
  - Create, read, update, and delete customers
  - Manage customer memberships

## Prerequisites

- Node.js (v14 or higher)
- Backend server running on `http://localhost:3000`

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start the Development Server**
   ```bash
   npm run dev
   ```

3. **Access the Application**
   Open your browser and navigate to `http://localhost:5173`

## Backend Setup

Make sure the backend server is running:

1. Navigate to the backend directory: `cd ../Backend`
2. Install dependencies: `npm install`
3. Create a `.env` file with your MongoDB connection string:
   ```
   MONGO_URI=your_mongodb_connection_string
   ```
4. Start the backend server: `npm run dev`

## API Integration

The frontend communicates with the backend API at `http://localhost:3000` and supports all the endpoints:

### Book Endpoints
- `GET /books` - Get all books
- `POST /books` - Create a new book
- `GET /books/:id` - Get a specific book
- `GET /books/category/:name` - Get books by category
- `GET /books/year/:year` - Get books published after year
- `PUT /books/:id` - Update book details
- `PATCH /books/:id/copies` - Update available copies
- `PATCH /books/:id/category` - Update book category
- `DELETE /books/:id` - Delete book (only if copies = 0)

### Customer Endpoints
- `GET /customers` - Get all customers
- `POST /customers` - Create a new customer
- `GET /customers/:id` - Get a specific customer
- `PUT /customers/:id` - Update customer details
- `DELETE /customers/:id` - Delete a customer

## Project Structure

```
src/
├── components/
│   ├── BookManagement.jsx
│   ├── BookManagement.css
│   ├── CustomerManagement.jsx
│   └── CustomerManagement.css
├── App.jsx
├── App.css
└── main.jsx
```

## Technologies Used

- React v19
- Vite
- CSS Modules

## Development

- The application uses Vite for fast development with Hot Module Replacement (HMR)
- Run `npm run dev` for development mode
- Run `npm run build` to create a production build
- Run `npm run preview` to locally preview the production build