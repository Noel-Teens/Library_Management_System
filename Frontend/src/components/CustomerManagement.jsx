import { useState, useEffect } from 'react';
import './CustomerManagement.css';

const CustomerManagement = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    membership: ''
  });
  const [searchTerm, setSearchTerm] = useState('');

  // API base URL
  const API_BASE_URL = 'http://localhost:3000';

  // Fetch all customers
  const fetchCustomers = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${API_BASE_URL}/customers`);
      const data = await response.json();
      if (response.ok) {
        setCustomers(data);
      } else {
        setError(data.error || 'Failed to fetch customers');
      }
    } catch (err) {
      setError('Network error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Create a new customer
  const createCustomer = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${API_BASE_URL}/customers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          age: parseInt(formData.age),
          membership: formData.membership
        })
      });
      const data = await response.json();
      if (response.ok) {
        setFormData({
          name: '',
          age: '',
          membership: ''
        });
        fetchCustomers(); // Refresh the list
      } else {
        setError(data.error || 'Failed to create customer');
      }
    } catch (err) {
      setError('Network error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Update a customer
  const updateCustomer = async (id, updatedData) => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${API_BASE_URL}/customers/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData)
      });
      const data = await response.json();
      if (response.ok) {
        fetchCustomers(); // Refresh the list
      } else {
        setError(data.error || 'Failed to update customer');
      }
    } catch (err) {
      setError('Network error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Delete a customer
  const deleteCustomer = async (id) => {
    if (!window.confirm('Are you sure you want to delete this customer?')) {
      return;
    }
    
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${API_BASE_URL}/customers/${id}`, {
        method: 'DELETE'
      });
      const data = await response.json();
      if (response.ok) {
        fetchCustomers(); // Refresh the list
      } else {
        setError(data.error || 'Failed to delete customer');
      }
    } catch (err) {
      setError('Network error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Filter customers based on search term
  const filteredCustomers = customers.filter(customer => {
    return customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           customer.membership.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Load all customers on component mount
  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <div className="customer-management">
      <div className="section-header">
        <h2>👥 Customer Directory</h2>
      </div>

      <div className="controls">
        {/* Search */}
        <div className="search-filter">
          <input
            type="text"
            placeholder="🔍 Search by name or membership..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Add Customer Form */}
        <div className="form-section">
          <h3>➕ Add New Customer</h3>
          <form onSubmit={createCustomer}>
            <div className="form-row">
              <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
              <input
                type="number"
                placeholder="Age"
                value={formData.age}
                onChange={(e) => setFormData({...formData, age: e.target.value})}
                required
              />
            </div>
            <div className="form-row">
              <select
                value={formData.membership}
                onChange={(e) => setFormData({...formData, membership: e.target.value})}
                required
              >
                <option value="">Select Membership</option>
                <option value="Bronze">Bronze</option>
                <option value="Silver">Silver</option>
                <option value="Gold">Gold</option>
                <option value="Platinum">Platinum</option>
              </select>
            </div>
            <button type="submit" disabled={loading}>Add Customer</button>
          </form>
        </div>
      </div>

      {/* Customers List */}
      <div className="customers-list">
        <h3>Customers ({filteredCustomers.length})</h3>
        
        {error && <div className="error">{error}</div>}
        {loading && <div className="loading">Loading...</div>}
        
        <div className="customers-grid">
          {filteredCustomers.map(customer => (
            <div key={customer._id} className="customer-card">
              <h4>{customer.name}</h4>
              <p><strong>Age</strong> <span>{customer.age} years</span></p>
              <p><strong>Membership</strong> <span className={`membership-badge ${customer.membership.toLowerCase()}`}>{customer.membership}</span></p>
              <div className="customer-actions">
                <button 
                  className="delete-btn" 
                  onClick={() => deleteCustomer(customer._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {filteredCustomers.length === 0 && !loading && (
          <p className="no-customers">No customers found.</p>
        )}
      </div>
    </div>
  );
};

export default CustomerManagement;