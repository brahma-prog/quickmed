import React, { useState, useMemo } from 'react';
import { styles } from './Styles';

const OrdersView = ({
  orders,
  orderFilter,
  setOrderFilter,
  setActiveView,
  startLiveTracking
}) => {
  const [hoveredTab, setHoveredTab] = useState(null);

  const BackButton = ({ onClick, text = 'Back' }) => (
    <button 
      style={styles.backButton}
      onClick={onClick}
      type="button"
    >
      ← {text}
    </button>
  );

  // Enhanced filter tab handler
  const handleFilterClick = (filterType) => {
    setOrderFilter(filterType);
    console.log(`Filter activated: ${filterType}`);
  };

  // Helper function to get tab styles with hover and active states
  const getTabStyle = (filterType) => {
    const isActive = orderFilter === filterType;
    const isHovered = hoveredTab === filterType;
    
    let style = { ...styles.filterTab };
    
    if (isActive) {
      style = { ...style, ...styles.activeFilterTab };
    }
    
    if (isHovered && !isActive) {
      style = { ...style, ...styles.filterTabHover };
    }
    
    return style;
  };

  // Filter types configuration
  const filterTypes = [
    { key: 'all', label: 'All Orders' },
    { key: 'delivered', label: 'Delivered' },
    { key: 'in-transit', label: 'In Transit' },
    { key: 'pending', label: 'Pending' }
  ];

  // Filter orders based on selected filter
  const filteredOrders = useMemo(() => {
    if (!orders || orders.length === 0) return [];
    
    switch (orderFilter) {
      case 'delivered':
        return orders.filter(order => 
          order.status === 'Delivered' || 
          order.status.toLowerCase().includes('delivered')
        );
      
      case 'in-transit':
        return orders.filter(order => 
          order.status === 'In Transit' || 
          order.status === 'On the Way' ||
          order.status.toLowerCase().includes('transit') ||
          order.status.toLowerCase().includes('shipped')
        );
      
      case 'pending':
        return orders.filter(order => 
          order.status === 'Pending' || 
          order.status === 'Confirmed' ||
          order.status.toLowerCase().includes('pending') ||
          order.status.toLowerCase().includes('confirmed')
        );
      
      case 'all':
      default:
        return orders;
    }
  }, [orders, orderFilter]);

  // Get display text for empty state
  const getEmptyStateText = () => {
    switch (orderFilter) {
      case 'delivered':
        return 'No delivered orders';
      case 'in-transit':
        return 'No orders in transit';
      case 'pending':
        return 'No pending orders';
      case 'all':
      default:
        return 'No orders yet';
    }
  };

  return (
    <div style={styles.ordersContainer}>
      <div style={styles.pageHeader}>
        <BackButton onClick={() => setActiveView('dashboard')} text="" />
        <h2 style={styles.sectionTitle}>My Orders</h2>
      </div>
      
      {/* Enhanced Orders Filter Tabs */}
      <div style={styles.filterTabs}>
        {filterTypes.map((filter) => (
          <button
            key={filter.key}
            style={getTabStyle(filter.key)}
            onClick={() => handleFilterClick(filter.key)}
            onMouseEnter={() => setHoveredTab(filter.key)}
            onMouseLeave={() => setHoveredTab(null)}
            onFocus={() => setHoveredTab(filter.key)}
            onBlur={() => setHoveredTab(null)}
            type="button"
            aria-pressed={orderFilter === filter.key}
          >
            {filter.label}
          </button>
        ))}
      </div>
      
      {/* Show filtered orders or empty state */}
      {filteredOrders.length === 0 ? (
        <div style={styles.noOrders}>
          <p style={styles.noOrdersText}>
            {getEmptyStateText()}
          </p>
          <button 
            style={styles.shopNowButton}
            onClick={() => setActiveView('medicine')}
            type="button"
          >
            Shop Now
          </button>
        </div>
      ) : (
        <div style={styles.ordersList}>
          {/* Show filter indicator */}
          {orderFilter !== 'all' && (
            <div style={styles.filterIndicator}>
              Showing {filteredOrders.length} {orderFilter} order{filteredOrders.length !== 1 ? 's' : ''}
            </div>
          )}
          
          {filteredOrders.map(order => (
            <div key={order.id} style={styles.orderCard}>
              <div style={styles.orderHeader}>
                <div>
                  <h3 style={styles.orderId}>Order #{order.id}</h3>
                  <p style={styles.orderDate}>Placed on {order.date}</p>
                  {order.paymentId && (
                    <p style={styles.paymentId}>Payment ID: {order.paymentId}</p>
                  )}
                </div>
                <div style={styles.orderStatus}>
                  <span style={{
                    ...styles.statusBadge,
                    backgroundColor: 
                      order.status === 'Delivered' ? '#4CAF50' :
                      order.status === 'In Transit' ? '#FF9800' :
                      order.status === 'On the Way' ? '#2196F3' :
                      order.status === 'Confirmed' ? '#9C27B0' :
                      order.status === 'Pending' ? '#FFC107' : '#9E9E9E'
                  }}>
                    {order.status}
                  </span>
                </div>
              </div>
              
              <div style={styles.orderItems}>
                {order.items.map((item, index) => (
                  <div key={index} style={styles.orderItem}>
                    <span style={styles.itemName}>{item.name}</span>
                    <span style={styles.itemQuantity}>Qty: {item.quantity}</span>
                    <span style={styles.itemPrice}>₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
              
              <div style={styles.orderFooter}>
                <div style={styles.orderAddress}>
                  <strong>Delivery Address:</strong> {order.deliveryAddress}
                </div>
                <div style={styles.orderActions}>
                  <div style={styles.orderTotal}>
                    <strong>Total: ₹{order.total}</strong>
                  </div>
                  {order.trackingAvailable && (order.status === 'In Transit' || order.status === 'On the Way') && (
                    <button 
                      style={styles.trackButton}
                      onClick={() => startLiveTracking(order)}
                      type="button"
                    >
                      📍 Live Track
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersView;