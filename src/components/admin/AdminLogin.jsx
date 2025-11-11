// src/components/admin/AdminLogin.js
import React, { useState } from 'react';

const AdminLogin = ({ onLoginSuccess, onSwitchToSignup }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock admin login - replace with actual API call
    const adminUser = {
      id: 1,
      name: 'Admin User',
      email: formData.email,
      userType: 'admin',
      permissions: ['all']
    };
    localStorage.setItem('currentUser', JSON.stringify(adminUser));
    onLoginSuccess(adminUser);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #7C2A62 0%, #F7D9EB 100%)',
      padding: '20px'
    }}>
      <div style={{
        background: 'white',
        padding: '40px',
        borderRadius: '15px',
        boxShadow: '0 10px 30px rgba(124, 42, 98, 0.3)',
        width: '100%',
        maxWidth: '400px'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h1 style={{ 
            color: '#7C2A62', 
            margin: '0 0 10px 0',
            fontSize: '28px',
            fontWeight: 'bold'
          }}>
            MediQuick Admin
          </h1>
          <p style={{ color: '#666', margin: 0 }}>
            Administrative Control Panel
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              color: '#333',
              fontWeight: '500'
            }}>
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '12px 15px',
                border: '2px solid #e1e1e1',
                borderRadius: '8px',
                fontSize: '16px',
                transition: 'border-color 0.3s',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => e.target.style.borderColor = '#7C2A62'}
              onBlur={(e) => e.target.style.borderColor = '#e1e1e1'}
            />
          </div>

          <div style={{ marginBottom: '25px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              color: '#333',
              fontWeight: '500'
            }}>
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '12px 15px',
                border: '2px solid #e1e1e1',
                borderRadius: '8px',
                fontSize: '16px',
                transition: 'border-color 0.3s',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => e.target.style.borderColor = '#7C2A62'}
              onBlur={(e) => e.target.style.borderColor = '#e1e1e1'}
            />
          </div>

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '12px',
              background: '#7C2A62',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'background 0.3s'
            }}
            onMouseOver={(e) => e.target.style.background = '#6A2354'}
            onMouseOut={(e) => e.target.style.background = '#7C2A62'}
          >
            Sign In
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button
            onClick={onSwitchToSignup}
            style={{
              background: 'none',
              border: 'none',
              color: '#7C2A62',
              cursor: 'pointer',
              textDecoration: 'underline'
            }}
          >
            Need admin access? Contact system administrator
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;