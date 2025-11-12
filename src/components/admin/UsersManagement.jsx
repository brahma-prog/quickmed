import React, { useState, useEffect } from 'react';

const UsersManagement = () => {
  const primaryColor = '#7C2A62';
  const accentColor = '#F7D9EB';
  
  const [searchTerm, setSearchTerm] = useState('');
  const [userType, setUserType] = useState('all');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserHistory, setShowUserHistory] = useState(false);
  const [actionLoading, setActionLoading] = useState(null); // Track loading state for specific actions

  // Simulate API call to fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data - in real app, this would come from an API
      const mockUsers = [
        { 
          id: 1, 
          name: 'John Doe', 
          type: 'customer', 
          email: 'john@email.com', 
          status: 'active',
          lastLogin: '2023-10-15',
          registrationDate: '2023-01-10',
          phone: '+1234567890',
          address: '123 Main St, City, State',
          orders: 15,
          totalSpent: 1250.75
        },
        { 
          id: 2, 
          name: 'MedPlus Pharmacy', 
          type: 'vendor', 
          email: 'medplus@pharmacy.com', 
          status: 'active',
          lastLogin: '2023-10-14',
          registrationDate: '2023-02-15',
          phone: '+1234567891',
          address: '456 Pharmacy Ave, City, State',
          products: 245,
          rating: 4.8
        },
        { 
          id: 3, 
          name: 'Dr. Sharma', 
          type: 'doctor', 
          email: 'sharma@clinic.com', 
          status: 'active',
          lastLogin: '2023-10-10',
          registrationDate: '2023-10-10',
          phone: '+1234567892',
          address: '789 Medical Center, City, State',
          specialization: 'Cardiology',
          experience: '10 years'
        },
        { 
          id: 4, 
          name: 'Raj Kumar', 
          type: 'delivery', 
          email: 'raj@delivery.com', 
          status: 'inactive',
          lastLogin: '2023-09-20',
          registrationDate: '2023-03-05',
          phone: '+1234567893',
          address: '321 Delivery Lane, City, State',
          deliveries: 342,
          rating: 4.9
        },
        { 
          id: 5, 
          name: 'Alice Johnson', 
          type: 'customer', 
          email: 'alice@email.com', 
          status: 'active',
          lastLogin: '2023-10-16',
          registrationDate: '2023-04-20',
          phone: '+1234567894',
          address: '654 Customer Rd, City, State',
          orders: 8,
          totalSpent: 650.25
        }
      ];
      
      setUsers(mockUsers);
      setLoading(false);
    };

    fetchUsers();
  }, []);

  // Real-time search and filter functionality
  const filteredUsers = users.filter(user => {
    const matchesSearch = searchTerm === '' || 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = userType === 'all' || user.type === userType;
    
    return matchesSearch && matchesType;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return { bg: '#d4edda', text: '#155724' };
      case 'pending':
        return { bg: '#fff3cd', text: '#856404' };
      case 'inactive':
        return { bg: '#f8d7da', text: '#721c24' };
      default:
        return { bg: '#e2e3e5', text: '#383d41' };
    }
  };

  // Enhanced action handlers with better loading states
  const handleActivateUser = async (userId) => {
    setActionLoading(userId);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    setUsers(users.map(user => 
      user.id === userId 
        ? { 
            ...user, 
            status: 'active',
            lastLogin: new Date().toISOString().split('T')[0] // Update last login on activation
          }
        : user
    ));
    setActionLoading(null);
  };

  const handleInactivateUser = async (userId) => {
    setActionLoading(userId);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    setUsers(users.map(user => 
      user.id === userId 
        ? { 
            ...user, 
            status: 'inactive'
            // Don't update last login when inactivating
          }
        : user
    ));
    setActionLoading(null);
  };

  const handleViewHistory = async (userId) => {
    setActionLoading(userId);
    // Simulate API call to fetch user history
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const user = users.find(u => u.id === userId);
    setSelectedUser(user);
    setShowUserHistory(true);
    setActionLoading(null);
  };

  const handleCloseHistory = () => {
    setShowUserHistory(false);
    setSelectedUser(null);
  };

  const getUserTypeCounts = () => {
    const counts = {
      all: users.length,
      customer: users.filter(u => u.type === 'customer').length,
      vendor: users.filter(u => u.type === 'vendor').length,
      doctor: users.filter(u => u.type === 'doctor').length,
      delivery: users.filter(u => u.type === 'delivery').length
    };
    return counts;
  };

  // Enhanced action buttons with real-time loading states and better styling
  const getActionButtons = (user) => {
    const isActionLoading = actionLoading === user.id;

    const baseButtonStyle = {
      padding: '6px 12px',
      border: 'none',
      borderRadius: '4px',
      cursor: isActionLoading ? 'not-allowed' : 'pointer',
      fontSize: '12px',
      fontWeight: '500',
      transition: 'all 0.3s ease',
      width: '100px',
      opacity: isActionLoading ? 0.7 : 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '5px'
    };

    const inactivateButton = (
      <button 
        onClick={() => !isActionLoading && handleInactivateUser(user.id)}
        disabled={isActionLoading}
        style={{
          ...baseButtonStyle,
          backgroundColor: '#dc3545',
          color: 'white',
        }}
        onMouseOver={(e) => !isActionLoading && (e.target.style.backgroundColor = '#c82333')}
        onMouseOut={(e) => !isActionLoading && (e.target.style.backgroundColor = '#dc3545')}
      >
        {isActionLoading ? '⏳' : ''} Inactivate
      </button>
    );

    const activateButton = (
      <button 
        onClick={() => !isActionLoading && handleActivateUser(user.id)}
        disabled={isActionLoading}
        style={{
          ...baseButtonStyle,
          backgroundColor: '#28a745',
          color: 'white',
        }}
        onMouseOver={(e) => !isActionLoading && (e.target.style.backgroundColor = '#218838')}
        onMouseOut={(e) => !isActionLoading && (e.target.style.backgroundColor = '#28a745')}
      >
        {isActionLoading ? '⏳' : ''} Activate
      </button>
    );

    const viewHistoryButton = (
      <button 
        onClick={() => !isActionLoading && handleViewHistory(user.id)}
        disabled={isActionLoading}
        style={{
          ...baseButtonStyle,
          backgroundColor: primaryColor,
          color: 'white',
        }}
        onMouseOver={(e) => !isActionLoading && (e.target.style.backgroundColor = '#6a2452')}
        onMouseOut={(e) => !isActionLoading && (e.target.style.backgroundColor = primaryColor)}
      >
        {isActionLoading ? '⏳' : ''} View History
      </button>
    );

    switch (user.status) {
      case 'active':
        return (
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '8px',
            alignItems: 'flex-start'
          }}>
            {inactivateButton}
            {viewHistoryButton}
          </div>
        );
      case 'inactive':
        return (
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '8px',
            alignItems: 'flex-start'
          }}>
            {activateButton}
            {viewHistoryButton}
          </div>
        );
      case 'pending':
        return (
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '8px',
            alignItems: 'flex-start'
          }}>
            {inactivateButton}
            {viewHistoryButton}
          </div>
        );
      default:
        return (
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '8px',
            alignItems: 'flex-start'
          }}>
            {viewHistoryButton}
          </div>
        );
    }
  };

  const typeCounts = getUserTypeCounts();

  return (
    <div style={{ 
      padding: '20px', 
      fontFamily: 'Arial, sans-serif',
      height: '100vh',
      overflow: 'auto',
      boxSizing: 'border-box'
    }}>
      <h2 style={{ color: primaryColor, marginBottom: '20px', borderBottom: `2px solid ${accentColor}`, paddingBottom: '10px' }}>Users Management</h2>
      
      {/* Search and Filter */}
      <div style={{ 
        display: 'flex', 
        gap: '15px', 
        marginBottom: '20px', 
        flexWrap: 'wrap',
        alignItems: 'center'
      }}>
        <input
          type="text"
          placeholder="Search users by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: '10px',
            border: `1px solid ${accentColor}`,
            borderRadius: '5px',
            flex: '1',
            minWidth: '250px',
            fontSize: '14px'
          }}
        />
        <select
          value={userType}
          onChange={(e) => setUserType(e.target.value)}
          style={{
            padding: '10px',
            border: `1px solid ${accentColor}`,
            borderRadius: '5px',
            backgroundColor: 'white',
            minWidth: '150px',
            fontSize: '14px'
          }}
        >
          <option value="all">All Users ({typeCounts.all})</option>
          <option value="customer">Customers ({typeCounts.customer})</option>
          <option value="vendor">Vendors ({typeCounts.vendor})</option>
          <option value="doctor">Doctors ({typeCounts.doctor})</option>
          <option value="delivery">Delivery Agents ({typeCounts.delivery})</option>
        </select>
        
        {/* Results counter */}
        <div style={{ 
          color: '#666', 
          fontSize: '14px',
          backgroundColor: '#f8f9fa',
          padding: '8px 12px',
          borderRadius: '5px',
          border: `1px solid ${accentColor}`
        }}>
          {filteredUsers.length} user(s) found
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div style={{ 
          textAlign: 'center', 
          padding: '40px', 
          color: primaryColor,
          backgroundColor: '#f9f9f9',
          borderRadius: '8px',
          marginBottom: '20px',
          border: `1px solid ${accentColor}`
        }}>
          <div style={{ fontSize: '16px', marginBottom: '10px' }}>Loading users...</div>
          <div style={{ fontSize: '12px', color: '#666' }}>Please wait while we fetch user data</div>
        </div>
      )}

      {/* Users Table */}
      {!loading && (
        <div style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          overflow: 'hidden',
          border: `1px solid ${accentColor}`,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ 
              width: '100%', 
              borderCollapse: 'collapse', 
              minWidth: '800px',
              fontSize: '14px'
            }}>
              <thead>
                <tr style={{ 
                  backgroundColor: primaryColor, 
                  color: 'white',
                  fontSize: '14px'
                }}>
                  <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>User ID</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>Name</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>Type</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>Email</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>Status</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>Last Login</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map(user => {
                  const statusColors = getStatusColor(user.status);
                  return (
                    <tr key={user.id} style={{ 
                      borderBottom: `1px solid ${accentColor}`,
                      transition: 'background-color 0.2s',
                      backgroundColor: actionLoading === user.id ? '#f8f9fa' : 'white'
                    }}
                    onMouseEnter={(e) => {
                      if (actionLoading !== user.id) {
                        e.currentTarget.style.backgroundColor = '#f8f9fa';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (actionLoading !== user.id) {
                        e.currentTarget.style.backgroundColor = 'white';
                      }
                    }}>
                      <td style={{ padding: '12px', fontWeight: '500' }}>#{user.id}</td>
                      <td style={{ padding: '12px', fontWeight: '500' }}>{user.name}</td>
                      <td style={{ 
                        padding: '12px', 
                        textTransform: 'capitalize',
                        color: primaryColor,
                        fontWeight: '500'
                      }}>
                        {user.type}
                      </td>
                      <td style={{ padding: '12px' }}>{user.email}</td>
                      <td style={{ padding: '12px' }}>
                        <span style={{
                          padding: '6px 12px',
                          borderRadius: '15px',
                          fontSize: '12px',
                          backgroundColor: statusColors.bg,
                          color: statusColors.text,
                          fontWeight: '600',
                          border: `1px solid ${statusColors.text}20`
                        }}>
                          {user.status.toUpperCase()}
                        </span>
                      </td>
                      <td style={{ 
                        padding: '12px', 
                        fontSize: '12px',
                        color: user.lastLogin ? '#333' : '#999',
                        fontStyle: user.lastLogin ? 'normal' : 'italic'
                      }}>
                        {user.lastLogin || 'Never logged in'}
                      </td>
                      <td style={{ padding: '12px' }}>
                        <div style={{ 
                          display: 'flex', 
                          flexDirection: 'column', 
                          gap: '8px', 
                          alignItems: 'flex-start'
                        }}>
                          {getActionButtons(user)}
                          {actionLoading === user.id && (
                            <div style={{
                              fontSize: '11px',
                              color: primaryColor,
                              fontStyle: 'italic'
                            }}>
                              Processing...
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {!loading && filteredUsers.length === 0 && (
        <div style={{ 
          textAlign: 'center', 
          padding: '40px', 
          color: '#666',
          backgroundColor: '#f9f9f9',
          borderRadius: '8px',
          marginTop: '20px',
          border: `1px solid ${accentColor}`
        }}>
          <div style={{ fontSize: '16px', marginBottom: '10px' }}>No users found</div>
          <div style={{ fontSize: '14px' }}>Try adjusting your search criteria or filters</div>
        </div>
      )}

      {/* User History Modal */}
      {showUserHistory && selectedUser && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '30px',
            borderRadius: '12px',
            width: '90%',
            maxWidth: '700px',
            maxHeight: '85vh',
            overflowY: 'auto',
            boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
            border: `3px solid ${primaryColor}`
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '25px',
              borderBottom: `2px solid ${accentColor}`,
              paddingBottom: '15px'
            }}>
              <h3 style={{ 
                color: primaryColor, 
                margin: 0,
                fontSize: '20px',
                fontWeight: '600'
              }}>
                📊 User History - {selectedUser.name}
              </h3>
              <button 
                onClick={handleCloseHistory}
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  fontSize: '24px',
                  cursor: 'pointer',
                  color: primaryColor,
                  padding: '5px',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background-color 0.2s'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = accentColor}
                onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
              >
                ✕
              </button>
            </div>
            
            {/* User Details Section */}
            <div style={{ 
              marginBottom: '25px',
              backgroundColor: '#f8f9fa',
              padding: '20px',
              borderRadius: '8px',
              border: `1px solid ${accentColor}`
            }}>
              <h4 style={{ 
                color: primaryColor, 
                marginBottom: '15px',
                fontSize: '16px',
                fontWeight: '600'
              }}>
                👤 User Details
              </h4>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                gap: '15px',
                fontSize: '14px'
              }}>
                <div><strong>Name:</strong> {selectedUser.name}</div>
                <div><strong>Email:</strong> {selectedUser.email}</div>
                <div><strong>Type:</strong> 
                  <span style={{
                    textTransform: 'capitalize',
                    color: primaryColor,
                    fontWeight: '600',
                    marginLeft: '5px'
                  }}>
                    {selectedUser.type}
                  </span>
                </div>
                <div><strong>Status:</strong> 
                  <span style={{
                    padding: '4px 8px',
                    borderRadius: '10px',
                    fontSize: '11px',
                    backgroundColor: getStatusColor(selectedUser.status).bg,
                    color: getStatusColor(selectedUser.status).text,
                    fontWeight: '600',
                    marginLeft: '5px'
                  }}>
                    {selectedUser.status.toUpperCase()}
                  </span>
                </div>
                <div><strong>Phone:</strong> {selectedUser.phone}</div>
                <div><strong>Registration:</strong> {selectedUser.registrationDate}</div>
                <div><strong>Last Login:</strong> {selectedUser.lastLogin || 'Never'}</div>
                <div><strong>Address:</strong> {selectedUser.address}</div>
              </div>
            </div>

            {/* Activity History Section */}
            <div style={{ 
              marginBottom: '25px',
              backgroundColor: '#f8f9fa',
              padding: '20px',
              borderRadius: '8px',
              border: `1px solid ${accentColor}`
            }}>
              <h4 style={{ 
                color: primaryColor, 
                marginBottom: '15px',
                fontSize: '16px',
                fontWeight: '600'
              }}>
                📈 Activity History
              </h4>
              <div style={{ 
                backgroundColor: 'white', 
                padding: '20px', 
                borderRadius: '8px',
                fontSize: '14px',
                border: `1px solid ${accentColor}`
              }}>
                {/* Enhanced activity data with better formatting */}
                {selectedUser.type === 'customer' && (
                  <div style={{ display: 'grid', gap: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span><strong>Total Orders:</strong></span>
                      <span style={{ color: primaryColor, fontWeight: '600' }}>{selectedUser.orders}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span><strong>Total Spent:</strong></span>
                      <span style={{ color: '#28a745', fontWeight: '600' }}>${selectedUser.totalSpent}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span><strong>Recent Activity:</strong></span>
                      <span>Last purchase on 2023-10-15</span>
                    </div>
                    <div style={{ 
                      padding: '10px', 
                      backgroundColor: getStatusColor(selectedUser.status).bg,
                      color: getStatusColor(selectedUser.status).text,
                      borderRadius: '5px',
                      marginTop: '10px',
                      fontSize: '13px',
                      fontWeight: '500'
                    }}>
                      {selectedUser.status === 'active' 
                        ? '✅ Active - Can place orders' 
                        : selectedUser.status === 'pending' 
                        ? '⏳ Pending - Awaiting approval' 
                        : '❌ Inactive - Cannot place orders'}
                    </div>
                  </div>
                )}
                {selectedUser.type === 'vendor' && (
                  <div style={{ display: 'grid', gap: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span><strong>Products Listed:</strong></span>
                      <span style={{ color: primaryColor, fontWeight: '600' }}>{selectedUser.products}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span><strong>Rating:</strong></span>
                      <span style={{ color: '#FFA500', fontWeight: '600' }}>{selectedUser.rating}/5 ⭐</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span><strong>Recent Activity:</strong></span>
                      <span>Added 5 new products</span>
                    </div>
                    <div style={{ 
                      padding: '10px', 
                      backgroundColor: getStatusColor(selectedUser.status).bg,
                      color: getStatusColor(selectedUser.status).text,
                      borderRadius: '5px',
                      marginTop: '10px',
                      fontSize: '13px',
                      fontWeight: '500'
                    }}>
                      {selectedUser.status === 'active' 
                        ? '✅ Active - Can sell products' 
                        : selectedUser.status === 'pending' 
                        ? '⏳ Pending - Awaiting approval' 
                        : '❌ Inactive - Cannot sell products'}
                    </div>
                  </div>
                )}
                {selectedUser.type === 'doctor' && (
                  <div style={{ display: 'grid', gap: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span><strong>Specialization:</strong></span>
                      <span style={{ color: primaryColor, fontWeight: '600' }}>{selectedUser.specialization}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span><strong>Experience:</strong></span>
                      <span style={{ color: primaryColor, fontWeight: '600' }}>{selectedUser.experience}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span><strong>Recent Activity:</strong></span>
                      <span>Completed 3 consultations</span>
                    </div>
                    <div style={{ 
                      padding: '10px', 
                      backgroundColor: getStatusColor(selectedUser.status).bg,
                      color: getStatusColor(selectedUser.status).text,
                      borderRadius: '5px',
                      marginTop: '10px',
                      fontSize: '13px',
                      fontWeight: '500'
                    }}>
                      {selectedUser.status === 'active' 
                        ? '✅ Active - Can provide consultations' 
                        : selectedUser.status === 'pending' 
                        ? '⏳ Pending - Awaiting approval' 
                        : '❌ Inactive - Cannot provide consultations'}
                    </div>
                  </div>
                )}
                {selectedUser.type === 'delivery' && (
                  <div style={{ display: 'grid', gap: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span><strong>Total Deliveries:</strong></span>
                      <span style={{ color: primaryColor, fontWeight: '600' }}>{selectedUser.deliveries}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span><strong>Rating:</strong></span>
                      <span style={{ color: '#FFA500', fontWeight: '600' }}>{selectedUser.rating}/5 ⭐</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span><strong>Recent Activity:</strong></span>
                      <span>2 deliveries today</span>
                    </div>
                    <div style={{ 
                      padding: '10px', 
                      backgroundColor: getStatusColor(selectedUser.status).bg,
                      color: getStatusColor(selectedUser.status).text,
                      borderRadius: '5px',
                      marginTop: '10px',
                      fontSize: '13px',
                      fontWeight: '500'
                    }}>
                      {selectedUser.status === 'active' 
                        ? '✅ Active - Can accept deliveries' 
                        : selectedUser.status === 'pending' 
                        ? '⏳ Pending - Awaiting approval' 
                        : '❌ Inactive - Cannot accept deliveries'}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons in Modal */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              paddingTop: '20px',
              borderTop: `1px solid ${accentColor}`
            }}>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {selectedUser.status === 'active' ? (
                  <button 
                    onClick={() => {
                      handleInactivateUser(selectedUser.id);
                      handleCloseHistory();
                    }}
                    style={{
                      padding: '10px 20px',
                      backgroundColor: '#dc3545',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: '600',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#c82333'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#dc3545'}
                  >
                    Inactivate User
                  </button>
                ) : selectedUser.status === 'inactive' ? (
                  <button 
                    onClick={() => {
                      handleActivateUser(selectedUser.id);
                      handleCloseHistory();
                    }}
                    style={{
                      padding: '10px 20px',
                      backgroundColor: '#28a745',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: '600',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#218838'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#28a745'}
                  >
                    Activate User
                  </button>
                ) : (
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button 
                      onClick={() => {
                        handleActivateUser(selectedUser.id);
                        handleCloseHistory();
                      }}
                      style={{
                        padding: '10px 20px',
                        backgroundColor: '#28a745',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: '600',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseOver={(e) => e.target.style.backgroundColor = '#218838'}
                      onMouseOut={(e) => e.target.style.backgroundColor = '#28a745'}
                    >
                      Active User
                    </button>
                    <button 
                      onClick={() => {
                        handleInactivateUser(selectedUser.id);
                        handleCloseHistory();
                      }}
                      style={{
                        padding: '10px 20px',
                        backgroundColor: '#dc3545',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: '600',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseOver={(e) => e.target.style.backgroundColor = '#c82333'}
                      onMouseOut={(e) => e.target.style.backgroundColor = '#dc3545'}
                    >
                      Inactive User
                    </button>
                  </div>
                )}
              </div>
              <button 
                onClick={handleCloseHistory}
                style={{
                  padding: '10px 25px',
                  backgroundColor: primaryColor,
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '600',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#6a2452'}
                onMouseOut={(e) => e.target.style.backgroundColor = primaryColor}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersManagement;