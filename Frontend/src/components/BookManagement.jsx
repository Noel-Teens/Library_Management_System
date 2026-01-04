import { useState, useEffect } from 'react';
import './BookManagement.css';

const BookManagement = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    category: '',
    publishedYear: '',
    availableCopies: ''
  });
  const [updateData, setUpdateData] = useState({
    id: '',
    copiesChange: 0,
    newCategory: ''
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [yearFilter, setYearFilter] = useState('');

  // API base URL
  const API_BASE_URL = 'http://localhost:3000';

  // Fetch all books
  const fetchBooks = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${API_BASE_URL}/books`);
      const data = await response.json();
      if (response.ok) {
        setBooks(data.books || []);
      } else {
        setError(data.error || 'Failed to fetch books');
      }
    } catch (err) {
      setError('Network error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch books by category
  const fetchBooksByCategory = async (category) => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${API_BASE_URL}/books/category/${category}`);
      const data = await response.json();
      if (response.ok) {
        setBooks(data.books || []);
      } else {
        setError(data.error || 'Failed to fetch books');
      }
    } catch (err) {
      setError('Network error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch books by year
  const fetchBooksByYear = async (year) => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${API_BASE_URL}/books/year/${year}`);
      const data = await response.json();
      if (response.ok) {
        setBooks(data.books || []);
      } else {
        setError(data.error || 'Failed to fetch books');
      }
    } catch (err) {
      setError('Network error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Create a new book
  const createBook = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${API_BASE_URL}/books`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.title,
          author: formData.author,
          category: formData.category,
          publishedYear: parseInt(formData.publishedYear),
          availableCopies: parseInt(formData.availableCopies)
        })
      });
      const data = await response.json();
      if (response.ok) {
        setFormData({
          title: '',
          author: '',
          category: '',
          publishedYear: '',
          availableCopies: ''
        });
        fetchBooks(); // Refresh the list
      } else {
        setError(data.error || 'Failed to create book');
      }
    } catch (err) {
      setError('Network error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Update book copies
  const updateBookCopies = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${API_BASE_URL}/books/${updateData.id}/copies`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          quantity: parseInt(updateData.copiesChange)
        })
      });
      const data = await response.json();
      if (response.ok) {
        setUpdateData({
          id: '',
          copiesChange: 0,
          newCategory: ''
        });
        fetchBooks(); // Refresh the list
      } else {
        setError(data.error || 'Failed to update copies');
      }
    } catch (err) {
      setError('Network error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Update book category
  const updateBookCategory = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${API_BASE_URL}/books/${updateData.id}/category`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          category: updateData.newCategory
        })
      });
      const data = await response.json();
      if (response.ok) {
        setUpdateData({
          id: '',
          copiesChange: 0,
          newCategory: ''
        });
        fetchBooks(); // Refresh the list
      } else {
        setError(data.error || 'Failed to update category');
      }
    } catch (err) {
      setError('Network error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Delete a book
  const deleteBook = async (id) => {
    if (!window.confirm('Are you sure you want to delete this book? Note: You can only delete books with 0 available copies.')) {
      return;
    }
    
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${API_BASE_URL}/books/${id}`, {
        method: 'DELETE'
      });
      const data = await response.json();
      if (response.ok) {
        fetchBooks(); // Refresh the list
      } else {
        setError(data.error || 'Failed to delete book');
      }
    } catch (err) {
      setError('Network error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle tab changes
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === 'all') {
      fetchBooks();
    } else if (tab === 'fiction') {
      fetchBooksByCategory('Fiction');
    } else if (tab === 'recent') {
      fetchBooksByYear(2010);
    }
  };

  // Filter books based on search term
  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesYear = !yearFilter || book.publishedYear >= parseInt(yearFilter);
    
    return matchesSearch && matchesYear;
  });

  // Load all books on component mount
  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="book-management">
      <div className="section-header">
        <h2>📚 Book Inventory</h2>
        
        {/* Tabs */}
        <div className="tabs">
          <button 
            className={activeTab === 'all' ? 'active' : ''} 
            onClick={() => handleTabChange('all')}
          >
            All Books
          </button>
          <button 
            className={activeTab === 'fiction' ? 'active' : ''} 
            onClick={() => handleTabChange('fiction')}
          >
            Fiction
          </button>
          <button 
            className={activeTab === 'recent' ? 'active' : ''} 
            onClick={() => handleTabChange('recent')}
          >
            Recent
          </button>
        </div>
      </div>
      
      <div className="controls">

        {/* Search and Filter */}
        <div className="search-filter">
          <input
            type="text"
            placeholder="Search by title, author, or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <input
            type="number"
            placeholder="Year filter (>=)"
            value={yearFilter}
            onChange={(e) => setYearFilter(e.target.value)}
          />
        </div>

        {/* Add Book Form */}
        <div className="form-section">
          <h3>➕ Add New Book</h3>
          <form onSubmit={createBook}>
            <div className="form-row">
              <input
                type="text"
                placeholder="Title"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                required
              />
              <input
                type="text"
                placeholder="Author"
                value={formData.author}
                onChange={(e) => setFormData({...formData, author: e.target.value})}
                required
              />
            </div>
            <div className="form-row">
              <input
                type="text"
                placeholder="Category"
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                required
              />
              <input
                type="number"
                placeholder="Published Year"
                value={formData.publishedYear}
                onChange={(e) => setFormData({...formData, publishedYear: e.target.value})}
                required
              />
            </div>
            <div className="form-row">
              <input
                type="number"
                placeholder="Available Copies"
                value={formData.availableCopies}
                onChange={(e) => setFormData({...formData, availableCopies: e.target.value})}
                required
              />
            </div>
            <button type="submit" disabled={loading}>Add Book</button>
          </form>
        </div>

        {/* Update Book Form */}
        <div className="form-section update-section">
          <h3>🔄 Update Book</h3>
          <form onSubmit={(e) => {
            e.preventDefault();
            if (updateData.copiesChange !== 0) {
              updateBookCopies(e);
            } else if (updateData.newCategory) {
              updateBookCategory(e);
            }
          }}>
            <div className="form-row">
              <input
                type="text"
                placeholder="Book ID"
                value={updateData.id}
                onChange={(e) => setUpdateData({...updateData, id: e.target.value})}
                required
              />
            </div>
            <div className="form-row">
              <input
                type="number"
                placeholder="Copies to add/remove (e.g., 5 or -2)"
                value={updateData.copiesChange}
                onChange={(e) => setUpdateData({...updateData, copiesChange: parseInt(e.target.value) || 0})}
              />
              <input
                type="text"
                placeholder="New Category"
                value={updateData.newCategory}
                onChange={(e) => setUpdateData({...updateData, newCategory: e.target.value})}
              />
            </div>
            <button type="submit" disabled={loading}>Update Book</button>
          </form>
        </div>
      </div>

      {/* Books List */}
      <div className="books-list">
        <h3>Books ({filteredBooks.length})</h3>
        
        {error && <div className="error">{error}</div>}
        {loading && <div className="loading">Loading...</div>}
        
        <div className="books-grid">
          {filteredBooks.map(book => (
            <div key={book._id} className="book-card">
              <h4>{book.title}</h4>
              <p><strong>Author</strong> <span>{book.author}</span></p>
              <p><strong>Category</strong> <span>{book.category}</span></p>
              <p><strong>Published</strong> <span>{book.publishedYear}</span></p>
              <p><strong>Stock</strong> <span>{book.availableCopies} copies</span></p>
              <p><strong>Created</strong> <span>{new Date(book.createdAt).toLocaleDateString()}</span></p>
              <div className="book-actions">
                <button 
                  className="delete-btn" 
                  onClick={() => deleteBook(book._id)}
                  disabled={book.availableCopies > 0}
                  title={book.availableCopies > 0 ? "Can only delete books with 0 copies" : "Delete book"}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {filteredBooks.length === 0 && !loading && (
          <p className="no-books">No books found.</p>
        )}
      </div>
    </div>
  );
};

export default BookManagement;