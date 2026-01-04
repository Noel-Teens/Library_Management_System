import { useState } from 'react';
import './App.css';
import BookManagement from './components/BookManagement';
import CustomerManagement from './components/CustomerManagement';

function App() {
  const [activeTab, setActiveTab] = useState('books');

  return (
    <div className="App">
      <header className="App-header">
        <h1>Library Management System</h1>
        
        {/* Tab Navigation */}
        <div className="tabs-nav">
          <button 
            className={activeTab === 'books' ? 'active' : ''}
            onClick={() => setActiveTab('books')}
          >
            Books
          </button>
          <button 
            className={activeTab === 'customers' ? 'active' : ''}
            onClick={() => setActiveTab('customers')}
          >
            Customers
          </button>
        </div>
      </header>
      <main>
        {activeTab === 'books' ? <BookManagement /> : <CustomerManagement />}
      </main>
    </div>
  );
}

export default App;
