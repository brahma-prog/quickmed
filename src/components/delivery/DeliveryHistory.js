import React, { useState, useEffect } from 'react';
import './DeliveryHistory.css';

const DeliveryHistory = ({ deliveryData, completedOrders = [] }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [taskFilter, setTaskFilter] = useState('all');
  const [allCompletedOrders, setAllCompletedOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load delivery history from localStorage and combine with props
  useEffect(() => {
    try {
      setIsLoading(true);
      
      // Get orders from localStorage for persistence
      const storedOrders = JSON.parse(localStorage.getItem('completedOrders')) || [];
      const storedCancelledOrders = JSON.parse(localStorage.getItem('cancelledOrders')) || [];
      
      // Combine all orders
      const combinedOrders = [
        ...storedOrders,
        ...completedOrders.map(order => ({
          id: order.id,
          orderId: order.orderId,
          customerName: order.customerName,
          customerPhone: order.customerPhone,
          pharmacyName: order.pharmacyName,
          pickupLocation: order.pharmacyLocation,
          deliveryLocation: order.deliveryLocation,
          amount: order.amount,
          tip: order.tip || 0,
          deliveryDate: order.deliveryDate || new Date().toISOString().split('T')[0],
          completedTime: order.completedTime || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          rating: order.rating || Math.floor(Math.random() * 2) + 4,
          feedback: order.feedback || (Math.random() > 0.5 ? 'Great service! Very professional and on time.' : 'Excellent delivery service!'),
          status: 'delivered',
          medicines: order.medicines || [],
          specialInstructions: order.specialInstructions || '',
          paymentMethod: order.paymentMethod || 'Cash on Delivery',
          deliveryPartner: order.deliveryPartner || 'You',
          transactionId: order.transactionId || `TXN${Date.now().toString().slice(-8)}`
        }))
      ];
      
      // Remove duplicates based on orderId
      const uniqueOrders = combinedOrders.filter((order, index, self) =>
        index === self.findIndex(o => o.orderId === order.orderId)
      );
      
      // Sort by date (newest first)
      uniqueOrders.sort((a, b) => new Date(b.deliveryDate + ' ' + b.completedTime) - new Date(a.deliveryDate + ' ' + a.completedTime));
      
      setAllCompletedOrders(uniqueOrders);
      setError(null);
    } catch (err) {
      setError('Failed to load delivery history');
      console.error('Error loading delivery history:', err);
    } finally {
      setIsLoading(false);
    }
  }, [deliveryData, completedOrders]);

  // SVG Icons Component
  const SvgIcons = {
    Search: () => (
      <svg className="icon-small" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </svg>
    ),
    Package: () => (
      <svg className="icon-xlarge" viewBox="0 0 24 24" fill="none" stroke="#009688" strokeWidth="1.5">
        <path d="M16.5 9.4l-9-5.19M21 16v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2M21 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2M3 7h18v5H3z" />
        <path d="m9.5 22 1.5-7 3 6.5M13.5 22 12 15l-3 6.5" />
      </svg>
    ),
    Location: ({ type = 'delivery' }) => (
      <svg className="icon-small" viewBox="0 0 24 24" fill="none" stroke="#4DB6AC" strokeWidth="2">
        {type === 'pickup' ? (
          <>
            <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
            <path d="M2 8h16v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8z" />
            <line x1="6" y1="1" x2="6" y2="4" />
            <line x1="10" y1="1" x2="10" y2="4" />
            <line x1="14" y1="1" x2="14" y2="4" />
          </>
        ) : (
          <>
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
            <circle cx="12" cy="10" r="3" />
          </>
        )}
      </svg>
    ),
    Star: ({ filled = true }) => (
      <svg className="icon-small" viewBox="0 0 24 24" fill={filled ? "#FFD700" : "none"} stroke="#FFD700" strokeWidth="2">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    Calendar: () => (
      <svg className="icon-small" viewBox="0 0 24 24" fill="none" stroke="#4DB6AC" strokeWidth="2">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
    Clock: () => (
      <svg className="icon-small" viewBox="0 0 24 24" fill="none" stroke="#4DB6AC" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    Message: () => (
      <svg className="icon-small" viewBox="0 0 24 24" fill="none" stroke="#4DB6AC" strokeWidth="2">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    Rupee: () => (
      <svg className="icon-small" viewBox="0 0 24 24" fill="none" stroke="#009688" strokeWidth="2">
        <path d="M4 10h16" />
        <path d="M4 14h16" />
        <path d="M10 3v18" />
        <path d="M14 3v18" />
        <path d="M8 7h8" />
        <path d="M8 17h8" />
      </svg>
    ),
    User: () => (
      <svg className="icon-small" viewBox="0 0 24 24" fill="none" stroke="#4DB6AC" strokeWidth="2">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
    History: () => (
      <svg className="icon-medium" viewBox="0 0 24 24" fill="none" stroke="#009688" strokeWidth="2">
        <path d="M9 17v-8l-2 2" />
        <path d="M15 17v-8l2 2" />
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
    Document: () => (
      <svg className="icon-medium" viewBox="0 0 24 24" fill="none" stroke="#009688" strokeWidth="2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
    Check: () => (
      <svg className="icon-small" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
    Delivery: () => (
      <svg className="icon-large" viewBox="0 0 24 24" fill="none" stroke="#009688" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <path d="M16 8l-8 8" />
        <path d="M16 16L8 8" />
      </svg>
    ),
    Earnings: () => (
      <svg className="icon-large" viewBox="0 0 24 24" fill="none" stroke="#009688" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v12" />
        <path d="M15 9.5a3 3 0 1 1 0 6" />
      </svg>
    ),
    Tips: () => (
      <svg className="icon-large" viewBox="0 0 24 24" fill="none" stroke="#009688" strokeWidth="2">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    Rating: () => (
      <svg className="icon-large" viewBox="0 0 24 24" fill="none" stroke="#009688" strokeWidth="2">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    Today: () => (
      <svg className="icon-small" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    Week: () => (
      <svg className="icon-small" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
    Month: () => (
      <svg className="icon-small" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 12h18M12 3v18" />
      </svg>
    ),
    AllTime: () => (
      <svg className="icon-small" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    Money: () => (
      <svg className="icon-small" viewBox="0 0 24 24" fill="none" stroke="#4DB6AC" strokeWidth="2">
        <path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    // Error and Loading Icons
    Error: () => (
      <svg className="icon-xlarge" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <line x1="15" y1="9" x2="9" y2="15" />
        <line x1="9" y1="9" x2="15" y2="15" />
      </svg>
    ),
    Loading: () => (
      <svg className="icon-xlarge" viewBox="0 0 24 24" fill="none" stroke="#009688" strokeWidth="2">
        <circle cx="12" cy="12" r="10" strokeOpacity="0.3" />
        <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round" />
      </svg>
    )
  };

  const formatIndianCurrency = (amount) => {
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  // Filter tasks based on search and filter
  const getFilteredTasks = () => {
    let filtered = allCompletedOrders;

    if (taskFilter !== 'all') {
      const now = new Date();
      if (taskFilter === 'today') {
        const today = now.toISOString().split('T')[0];
        filtered = filtered.filter(task => task.deliveryDate === today);
      } else if (taskFilter === 'week') {
        const oneWeekAgo = new Date(now);
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        filtered = filtered.filter(task => new Date(task.deliveryDate) >= oneWeekAgo);
      } else if (taskFilter === 'month') {
        const oneMonthAgo = new Date(now);
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
        filtered = filtered.filter(task => new Date(task.deliveryDate) >= oneMonthAgo);
      }
    }

    if (searchTerm) {
      filtered = filtered.filter(task =>
        task.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.pickupLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.deliveryLocation.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered.sort((a, b) => new Date(b.deliveryDate) - new Date(a.deliveryDate));
  };

  const filteredTasks = getFilteredTasks();

  // Calculate statistics
  const totalEarnings = filteredTasks.reduce((sum, task) => sum + task.amount + (task.tip || 0), 0);
  const totalTips = filteredTasks.reduce((sum, task) => sum + (task.tip || 0), 0);
  const averageRating = filteredTasks.length > 0 
    ? (filteredTasks.reduce((sum, task) => sum + (task.rating || 0), 0) / filteredTasks.length).toFixed(1)
    : 0;

  // Loading State
  if (isLoading) {
    return (
      <div className="delivery-history-container">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p className="loading-text">Loading delivery history...</p>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="delivery-history-container">
        <div className="error-state">
          <div className="error-icon">
            <SvgIcons.Error />
          </div>
          <h3 className="error-title">Error Loading History</h3>
          <p className="error-message">{error}</p>
          <button className="retry-button" onClick={() => window.location.reload()}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="delivery-history-container">
      {/* Header */}
      <div className="history-header">
        <div className="history-title-container">
          <h1>
            <SvgIcons.History />
            Delivery History
          </h1>
          <p className="history-subtitle">View your delivered orders and earnings</p>
        </div>
        
        <div className="header-actions">
          {/* Search Box */}
          <div className="search-container">
            <input
              type="text"
              placeholder="Search delivery history..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <span className="search-icon">
              <SvgIcons.Search />
            </span>
          </div>

          {/* Filter Buttons */}
          <div className="filter-container">
            <button
              className={`filter-button ${taskFilter === 'today' ? 'active' : ''}`}
              onClick={() => setTaskFilter('today')}
            >
              <SvgIcons.Today />
              Today
            </button>
            <button
              className={`filter-button ${taskFilter === 'week' ? 'active' : ''}`}
              onClick={() => setTaskFilter('week')}
            >
              <SvgIcons.Week />
              This Week
            </button>
            <button
              className={`filter-button ${taskFilter === 'month' ? 'active' : ''}`}
              onClick={() => setTaskFilter('month')}
            >
              <SvgIcons.Month />
              This Month
            </button>
            <button
              className={`filter-button ${taskFilter === 'all' ? 'active' : ''}`}
              onClick={() => setTaskFilter('all')}
            >
              <SvgIcons.AllTime />
              All Time
            </button>
          </div>
        </div>
      </div>

      {/* Statistics Summary */}
      {filteredTasks.length > 0 && (
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">
              <SvgIcons.Delivery />
            </div>
            <h3 className="stat-number">{filteredTasks.length}</h3>
            <p className="stat-label">Total Deliveries</p>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <SvgIcons.Earnings />
            </div>
            <h3 className="stat-number">{formatIndianCurrency(totalEarnings)}</h3>
            <p className="stat-label">Total Earnings</p>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <SvgIcons.Tips />
            </div>
            <h3 className="stat-number">{formatIndianCurrency(totalTips)}</h3>
            <p className="stat-label">Total Tips</p>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <SvgIcons.Rating />
            </div>
            <h3 className="stat-number">
              {averageRating}
              <SvgIcons.Star filled={false} />
            </h3>
            <p className="stat-label">Average Rating</p>
          </div>
        </div>
      )}

      {/* Tasks List */}
      <div className="tasks-container">
        {filteredTasks.length === 0 ? (
          <div className="no-tasks">
            <div className="no-tasks-icon">
              <SvgIcons.Package />
            </div>
            <h3 className="no-tasks-title">No delivery history found</h3>
            <p className="no-tasks-subtitle">
              {searchTerm ? 'Try adjusting your search terms' : 'Complete some deliveries to see your history here!'}
            </p>
          </div>
        ) : (
          filteredTasks.map(task => (
            <div key={task.id} className="task-card">
              {/* Task Header */}
              <div className="task-header">
                <div className="task-main-info">
                  <div className="order-header">
                    <h3 className="order-id">
                      <SvgIcons.Document />
                      {task.orderId}
                    </h3>
                    <div className="rating-display">
                      {[...Array(5)].map((_, i) => (
                        <SvgIcons.Star key={i} filled={i < Math.floor(task.rating || 0)} />
                      ))}
                      <span className="rating-text">{task.rating || 0}/5</span>
                    </div>
                  </div>
                  
                  <p className="customer-info">
                    <SvgIcons.User />
                    {task.customerName} • {task.customerPhone}
                  </p>
                  
                  <div className="delivery-datetime">
                    <span className="datetime-item">
                      <SvgIcons.Calendar />
                      {new Date(task.deliveryDate).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                    <span className="datetime-item">
                      <SvgIcons.Clock />
                      {task.completedTime}
                    </span>
                  </div>
                </div>

                {/* Task Status */}
                <div className="task-status">
                  <span className="status-badge">
                    <SvgIcons.Check />
                    Delivered
                  </span>
                  <div className="amount-badge">
                    <SvgIcons.Rupee />
                    {formatIndianCurrency(task.amount)}
                    {task.tip > 0 && (
                      <div className="tip-badge">
                        <SvgIcons.Money />
                        +{formatIndianCurrency(task.tip)} tip
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Task Details */}
              <div className="task-details">
                <div className="location-row">
                  <div className="location-column">
                    <strong className="detail-label">
                      <SvgIcons.Location type="pickup" />
                      Pickup Location
                    </strong>
                    <p className="detail-text">{task.pickupLocation}</p>
                  </div>
                  <div className="location-column">
                    <strong className="detail-label">
                      <SvgIcons.Location type="delivery" />
                      Delivery Location
                    </strong>
                    <p className="detail-text">{task.deliveryLocation}</p>
                  </div>
                </div>
                
                {task.feedback && (
                  <div className="detail-section">
                    <strong className="detail-label">
                      <SvgIcons.Message />
                      Customer Feedback
                    </strong>
                    <p className="feedback-text">"{task.feedback}"</p>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// Add default props
DeliveryHistory.defaultProps = {
  deliveryData: {
    completedTasks: []
  },
  completedOrders: []
};

export default DeliveryHistory;