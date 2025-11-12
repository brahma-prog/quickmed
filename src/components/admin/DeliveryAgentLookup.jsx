import React, { useState, useEffect } from 'react';

const DeliveryAgentLookup = () => {
  const primaryColor = '#7C2A62';
  const accentColor = '#F7D9EB';
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [agents, setAgents] = useState([]);
  const [showAllAgents, setShowAllAgents] = useState(true);

  // Mock data with enhanced information
  const mockAgents = [
    {
      id: 'DA001',
      name: 'Raj Kumar',
      region: 'Central Bangalore',
      phone: '+91 9876543210',
      email: 'raj.kumar@quickmed.com',
      vehicleType: 'Bike',
      vehicleNumber: 'KA01AB1234',
      status: 'Active',
      licenseNumber: 'DL12345678901234',
      verificationStatus: 'Verified',
      totalDeliveries: 345,
      onTimePercentage: 92,
      averageDeliveryTime: '25 mins',
      averageRating: 4.7,
      joinDate: '2023-06-15',
      address: '123 MG Road, Bangalore',
      
      // Performance Trends
      performanceTrend: {
        weekly: [88, 92, 90, 94, 91, 93, 92],
        monthly: [89, 91, 90, 92, 93, 94, 92, 91, 93, 92, 94, 92]
      },
      
      // Customer Feedback
      recentReviews: [
        {
          id: 1,
          customer: 'Priya Sharma',
          rating: 5,
          comment: 'Very professional and on-time delivery. Medicine was handled carefully.',
          date: '2024-01-14',
          orderId: 'ORD1001'
        },
        {
          id: 2,
          customer: 'Arun Patel',
          rating: 4,
          comment: 'Good service but delivery was slightly delayed due to traffic.',
          date: '2024-01-13',
          orderId: 'ORD1002'
        },
        {
          id: 3,
          customer: 'Sneha Reddy',
          rating: 5,
          comment: 'Excellent service! Very polite and careful with the package.',
          date: '2024-01-12',
          orderId: 'ORD1003'
        }
      ],
      
      // Delivery History
      deliveryHistory: [
        {
          date: '2024-01-15',
          orderId: 'ORD1015',
          customer: 'John Wilson',
          address: '456 Koramangala, Bangalore',
          status: 'Delivered',
          deliveryTime: '24 mins',
          rating: 5
        },
        {
          date: '2024-01-15',
          orderId: 'ORD1014',
          customer: 'Meera Iyer',
          address: '789 Indiranagar, Bangalore',
          status: 'Delivered',
          deliveryTime: '28 mins',
          rating: 4
        },
        {
          date: '2024-01-14',
          orderId: 'ORD1013',
          customer: 'Rahul Verma',
          address: '321 Jayanagar, Bangalore',
          status: 'Delivered',
          deliveryTime: '22 mins',
          rating: 5
        },
        {
          date: '2024-01-14',
          orderId: 'ORD1012',
          customer: 'Anita Desai',
          address: '654 Whitefield, Bangalore',
          status: 'Delivered',
          deliveryTime: '35 mins',
          rating: 4
        },
        {
          date: '2024-01-13',
          orderId: 'ORD1011',
          customer: 'Karan Singh',
          address: '987 HSR Layout, Bangalore',
          status: 'Delivered',
          deliveryTime: '26 mins',
          rating: 5
        }
      ]
    },
    {
      id: 'DA002',
      name: 'Priya Singh',
      region: 'South Bangalore',
      phone: '+91 9876543211',
      email: 'priya.singh@quickmed.com',
      vehicleType: 'Scooter',
      vehicleNumber: 'KA01CD5678',
      status: 'Active',
      licenseNumber: 'DL12345678901235',
      verificationStatus: 'Verified',
      totalDeliveries: 289,
      onTimePercentage: 95,
      averageDeliveryTime: '23 mins',
      averageRating: 4.8,
      joinDate: '2023-08-22',
      address: '456 Koramangala, Bangalore',
      
      performanceTrend: {
        weekly: [92, 94, 93, 95, 94, 96, 95],
        monthly: [91, 93, 94, 95, 94, 95, 96, 95, 94, 95, 96, 95]
      },
      
      recentReviews: [
        {
          id: 1,
          customer: 'Rohan Mehta',
          rating: 5,
          comment: 'Fastest delivery ever! Very satisfied with the service.',
          date: '2024-01-14',
          orderId: 'ORD1004'
        }
      ],
      
      deliveryHistory: [
        {
          date: '2024-01-15',
          orderId: 'ORD1016',
          customer: 'Sanjay Kumar',
          address: '123 Bannerghatta Road, Bangalore',
          status: 'Delivered',
          deliveryTime: '21 mins',
          rating: 5
        }
      ]
    },
    {
      id: 'DA003',
      name: 'Amit Sharma',
      region: 'North Bangalore',
      phone: '+91 9876543212',
      email: 'amit.sharma@quickmed.com',
      vehicleType: 'Bike',
      vehicleNumber: 'KA01EF9012',
      status: 'Inactive',
      licenseNumber: 'DL12345678901236',
      verificationStatus: 'Pending',
      totalDeliveries: 156,
      onTimePercentage: 85,
      averageDeliveryTime: '32 mins',
      averageRating: 4.2,
      joinDate: '2023-11-05',
      address: '789 Hebbal, Bangalore',
      
      performanceTrend: {
        weekly: [82, 85, 83, 86, 84, 85, 85],
        monthly: [80, 82, 83, 84, 85, 86, 85, 84, 85, 86, 85, 85]
      },
      
      recentReviews: [
        {
          id: 1,
          customer: 'Neha Gupta',
          rating: 4,
          comment: 'Good service but could improve communication.',
          date: '2024-01-10',
          orderId: 'ORD1005'
        }
      ],
      
      deliveryHistory: [
        {
          date: '2024-01-10',
          orderId: 'ORD1010',
          customer: 'Vikram Joshi',
          address: '456 Yeshwanthpur, Bangalore',
          status: 'Delivered',
          deliveryTime: '30 mins',
          rating: 4
        }
      ]
    }
  ];

  useEffect(() => {
    // Load all agents initially
    setAgents(mockAgents);
    setSelectedAgent(mockAgents[0]); // Select first agent by default
    setShowAllAgents(true);
  }, []);

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setSelectedAgent(agents[0]);
      setShowAllAgents(true);
      return;
    }

    const foundAgent = agents.find(a => 
      a.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
      a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.phone.includes(searchQuery) ||
      a.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    setSelectedAgent(foundAgent || null);
    setShowAllAgents(!foundAgent);
  };

  const handleAdminAction = (action, agentId) => {
    const agent = agents.find(a => a.id === agentId);
    switch (action) {
      case 'activate':
        alert(`Agent ${agentId} has been activated`);
        break;
      case 'suspend':
        alert(`Agent ${agentId} has been suspended`);
        break;
      case 'edit':
        alert(`Edit profile for agent ${agentId}`);
        break;
      case 'incentive':
        alert(`Add incentive for agent ${agentId}`);
        break;
      case 'earnings':
        alert(`View earnings for agent ${agentId}`);
        break;
      default:
        break;
    }
  };

  // Performance Trend Chart Component
  const PerformanceChart = ({ trend, title, timeFrame }) => {
    const data = timeFrame === 'weekly' ? trend.weekly : trend.monthly;
    const labels = timeFrame === 'weekly' 
      ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      : Array.from({ length: 12 }, (_, i) => `Week ${i + 1}`);
    
    const maxValue = Math.max(...data);
    const minValue = Math.min(...data);

    return (
      <div style={{ marginBottom: '20px' }}>
        <h4 style={{ color: primaryColor, marginBottom: '15px' }}>{title}</h4>
        <div style={{ 
          display: 'flex', 
          alignItems: 'end', 
          height: '120px', 
          gap: '8px',
          padding: '15px',
          backgroundColor: '#f8f9fa',
          borderRadius: '5px',
          border: `1px solid ${accentColor}`
        }}>
          {data.map((value, index) => {
            const height = ((value - minValue) / (maxValue - minValue)) * 80 + 20;
            return (
              <div key={index} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div
                  style={{
                    height: `${height}px`,
                    width: '20px',
                    backgroundColor: primaryColor,
                    borderRadius: '3px 3px 0 0',
                    marginBottom: '5px'
                  }}
                />
                <div style={{ fontSize: '10px', color: '#666', textAlign: 'center' }}>
                  {labels[index]}
                </div>
                <div style={{ fontSize: '10px', fontWeight: 'bold', color: primaryColor }}>
                  {value}%
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div>
      <h2 style={{ color: primaryColor, marginBottom: '20px' }}>Delivery Agent Lookup & Profile</h2>
      
      {/* Search Section */}
      <div style={{ marginBottom: '30px' }}>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <input
            type="text"
            placeholder="Enter Agent ID, Name, Phone, or Email"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            style={{
              flex: 1,
              padding: '12px',
              border: `1px solid ${accentColor}`,
              borderRadius: '5px',
              fontSize: '14px'
            }}
          />
          <button
            onClick={handleSearch}
            style={{
              padding: '12px 24px',
              backgroundColor: primaryColor,
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            Search
          </button>
        </div>
      </div>

      {/* Quick Agent Selection */}
      {showAllAgents && (
        <section style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          border: `1px solid ${accentColor}`,
          marginBottom: '20px'
        }}>
          <h3 style={{ color: primaryColor, marginBottom: '15px' }}>Available Delivery Agents</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '15px' }}>
            {agents.map(agent => (
              <div 
                key={agent.id}
                style={{
                  padding: '15px',
                  border: `2px solid ${selectedAgent?.id === agent.id ? primaryColor : accentColor}`,
                  borderRadius: '8px',
                  cursor: 'pointer',
                  backgroundColor: selectedAgent?.id === agent.id ? `${accentColor}40` : 'white',
                  transition: 'all 0.3s'
                }}
                onClick={() => setSelectedAgent(agent)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <div style={{ fontWeight: 'bold', fontSize: '16px' }}>{agent.name}</div>
                  <span style={{
                    padding: '4px 8px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    backgroundColor: agent.status === 'Active' ? '#d4edda' : '#f8d7da',
                    color: agent.status === 'Active' ? '#155724' : '#721c24'
                  }}>
                    {agent.status}
                  </span>
                </div>
                <div style={{ fontSize: '14px', color: '#666' }}>ID: {agent.id}</div>
                <div style={{ fontSize: '14px', color: '#666' }}>Region: {agent.region}</div>
                <div style={{ fontSize: '14px', color: '#666' }}>Phone: {agent.phone}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {selectedAgent && (
        <div style={{ display: 'grid', gap: '20px' }}>
          {/* Agent Information */}
          <section style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            border: `1px solid ${accentColor}`
          }}>
            <h3 style={{ color: primaryColor, marginBottom: '15px' }}>A. Agent Information</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px' }}>
              <div><strong>Agent ID:</strong> {selectedAgent.id}</div>
              <div><strong>Name:</strong> {selectedAgent.name}</div>
              <div><strong>Assigned Region:</strong> {selectedAgent.region}</div>
              <div><strong>Phone:</strong> {selectedAgent.phone}</div>
              <div><strong>Email:</strong> {selectedAgent.email}</div>
              <div><strong>Vehicle Type:</strong> {selectedAgent.vehicleType}</div>
              <div><strong>Vehicle Number:</strong> {selectedAgent.vehicleNumber}</div>
              <div><strong>Join Date:</strong> {selectedAgent.joinDate}</div>
              <div><strong>Address:</strong> {selectedAgent.address}</div>
              <div>
                <strong>Status:</strong> 
                <span style={{
                  padding: '4px 8px',
                  borderRadius: '12px',
                  fontSize: '12px',
                  marginLeft: '8px',
                  backgroundColor: selectedAgent.status === 'Active' ? '#d4edda' : '#f8d7da',
                  color: selectedAgent.status === 'Active' ? '#155724' : '#721c24'
                }}>
                  {selectedAgent.status}
                </span>
              </div>
            </div>
          </section>

          {/* Verification & Documents */}
          <section style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            border: `1px solid ${accentColor}`
          }}>
            <h3 style={{ color: primaryColor, marginBottom: '15px' }}>B. Verification & Documents</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px' }}>
              <div><strong>Driver License:</strong> {selectedAgent.licenseNumber}</div>
              <div><strong>Background Check:</strong> 
                <span style={{
                  padding: '4px 8px',
                  borderRadius: '12px',
                  fontSize: '12px',
                  marginLeft: '8px',
                  backgroundColor: selectedAgent.verificationStatus === 'Verified' ? '#d4edda' : '#fff3cd',
                  color: selectedAgent.verificationStatus === 'Verified' ? '#155724' : '#856404'
                }}>
                  {selectedAgent.verificationStatus}
                </span>
              </div>
            </div>
          </section>

          {/* Performance Metrics */}
          <section style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            border: `1px solid ${accentColor}`
          }}>
            <h3 style={{ color: primaryColor, marginBottom: '15px' }}>C. Delivery Performance Metrics</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
              <div style={{ textAlign: 'center', padding: '15px', backgroundColor: accentColor, borderRadius: '5px' }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: primaryColor }}>{selectedAgent.totalDeliveries}</div>
                <div>Total Deliveries</div>
              </div>
              <div style={{ textAlign: 'center', padding: '15px', backgroundColor: '#d4edda', borderRadius: '5px' }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#155724' }}>{selectedAgent.onTimePercentage}%</div>
                <div>On-Time Delivery</div>
              </div>
              <div style={{ textAlign: 'center', padding: '15px', backgroundColor: '#cce7ff', borderRadius: '5px' }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#004085' }}>{selectedAgent.averageDeliveryTime}</div>
                <div>Avg. Delivery Time</div>
              </div>
              <div style={{ textAlign: 'center', padding: '15px', backgroundColor: '#fff3cd', borderRadius: '5px' }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#856404' }}>{selectedAgent.averageRating}/5</div>
                <div>Customer Rating</div>
              </div>
            </div>
          </section>

          {/* Performance Summary */}
          <section style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            border: `1px solid ${accentColor}`
          }}>
            <h3 style={{ color: primaryColor, marginBottom: '15px' }}>D. Performance Summary</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <PerformanceChart trend={selectedAgent.performanceTrend} title="Weekly Performance Trend" timeFrame="weekly" />
              <PerformanceChart trend={selectedAgent.performanceTrend} title="Monthly Performance Trend" timeFrame="monthly" />
            </div>
          </section>

          {/* Customer Feedback & Ratings */}
          <section style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            border: `1px solid ${accentColor}`
          }}>
            <h3 style={{ color: primaryColor, marginBottom: '15px' }}>E. Customer Feedback & Ratings</h3>
            <div style={{ marginBottom: '20px', textAlign: 'center' }}>
              <div style={{ fontSize: '32px', fontWeight: 'bold', color: primaryColor }}>
                {selectedAgent.averageRating}/5
              </div>
              <div style={{ fontSize: '14px', color: '#666' }}>Average Rating from {selectedAgent.totalDeliveries} deliveries</div>
            </div>
            
            <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
              {selectedAgent.recentReviews.map(review => (
                <div key={review.id} style={{
                  padding: '15px',
                  border: `1px solid ${accentColor}`,
                  borderRadius: '5px',
                  marginBottom: '10px',
                  backgroundColor: '#f8f9fa'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <div style={{ fontWeight: 'bold' }}>{review.customer}</div>
                    <div style={{ 
                      padding: '4px 8px',
                      backgroundColor: review.rating >= 4 ? '#d4edda' : review.rating >= 3 ? '#fff3cd' : '#f8d7da',
                      color: review.rating >= 4 ? '#155724' : review.rating >= 3 ? '#856404' : '#721c24',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: 'bold'
                    }}>
                      {review.rating} ★
                    </div>
                  </div>
                  <div style={{ fontSize: '14px', color: '#666', marginBottom: '5px' }}>
                    Order: {review.orderId} • {review.date}
                  </div>
                  <div style={{ fontSize: '14px' }}>{review.comment}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Delivery History */}
          <section style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            border: `1px solid ${accentColor}`
          }}>
            <h3 style={{ color: primaryColor, marginBottom: '15px' }}>F. Recent Delivery History</h3>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: primaryColor, color: 'white' }}>
                    <th style={{ padding: '12px', textAlign: 'left' }}>Date</th>
                    <th style={{ padding: '12px', textAlign: 'left' }}>Order ID</th>
                    <th style={{ padding: '12px', textAlign: 'left' }}>Customer</th>
                    <th style={{ padding: '12px', textAlign: 'left' }}>Address</th>
                    <th style={{ padding: '12px', textAlign: 'center' }}>Status</th>
                    <th style={{ padding: '12px', textAlign: 'center' }}>Delivery Time</th>
                    <th style={{ padding: '12px', textAlign: 'center' }}>Rating</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedAgent.deliveryHistory.map((delivery, index) => (
                    <tr key={index} style={{ borderBottom: `1px solid ${accentColor}` }}>
                      <td style={{ padding: '12px' }}>{delivery.date}</td>
                      <td style={{ padding: '12px', fontWeight: 'bold' }}>{delivery.orderId}</td>
                      <td style={{ padding: '12px' }}>{delivery.customer}</td>
                      <td style={{ padding: '12px', maxWidth: '200px' }}>
                        <div style={{ 
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}>
                          {delivery.address}
                        </div>
                      </td>
                      <td style={{ padding: '12px', textAlign: 'center' }}>
                        <span style={{
                          padding: '4px 8px',
                          borderRadius: '12px',
                          fontSize: '12px',
                          backgroundColor: delivery.status === 'Delivered' ? '#d4edda' : '#fff3cd',
                          color: delivery.status === 'Delivered' ? '#155724' : '#856404'
                        }}>
                          {delivery.status}
                        </span>
                      </td>
                      <td style={{ padding: '12px', textAlign: 'center' }}>{delivery.deliveryTime}</td>
                      <td style={{ padding: '12px', textAlign: 'center' }}>
                        <span style={{
                          padding: '4px 8px',
                          borderRadius: '12px',
                          fontSize: '12px',
                          backgroundColor: delivery.rating >= 4 ? '#d4edda' : delivery.rating >= 3 ? '#fff3cd' : '#f8d7da',
                          color: delivery.rating >= 4 ? '#155724' : delivery.rating >= 3 ? '#856404' : '#721c24',
                          fontWeight: 'bold'
                        }}>
                          {delivery.rating} ★
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Admin Actions */}
          <section style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            border: `1px solid ${accentColor}`
          }}>
            <h3 style={{ color: primaryColor, marginBottom: '15px' }}>Admin Actions</h3>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <button 
                onClick={() => handleAdminAction('activate', selectedAgent.id)}
                style={{ 
                  padding: '10px 15px', 
                  backgroundColor: '#28a745', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '5px', 
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                Activate
              </button>
              <button 
                onClick={() => handleAdminAction('suspend', selectedAgent.id)}
                style={{ 
                  padding: '10px 15px', 
                  backgroundColor: '#dc3545', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '5px', 
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                Suspend
              </button>
              <button 
                onClick={() => handleAdminAction('edit', selectedAgent.id)}
                style={{ 
                  padding: '10px 15px', 
                  backgroundColor: primaryColor, 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '5px', 
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                Edit Profile
              </button>
              <button 
                onClick={() => handleAdminAction('incentive', selectedAgent.id)}
                style={{ 
                  padding: '10px 15px', 
                  backgroundColor: '#ffc107', 
                  color: 'black', 
                  border: 'none', 
                  borderRadius: '5px', 
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                Add Incentive
              </button>
              <button 
                onClick={() => handleAdminAction('earnings', selectedAgent.id)}
                style={{ 
                  padding: '10px 15px', 
                  backgroundColor: '#17a2b8', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '5px', 
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                View Earnings
              </button>
            </div>
          </section>
        </div>
      )}

      {!selectedAgent && searchQuery && (
        <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
          No delivery agent found with the search criteria
        </div>
      )}
    </div>
  );
};

export default DeliveryAgentLookup;