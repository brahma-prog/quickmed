import React, { useState } from 'react';

const DeliveryHistory = ({ deliveryData }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [taskFilter, setTaskFilter] = useState('all');

  const styles = {
    mainContent: {
      padding: '30px',
      minHeight: '100vh'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '30px'
    },
    greeting: {
      fontSize: '28px',
      fontWeight: '700',
      color: '#1f2937',
      margin: '0 0 8px 0'
    },
    subtitle: {
      fontSize: '16px',
      color: '#6b7280',
      margin: 0
    },
    taskHeaderActions: {
      display: 'flex',
      gap: '16px',
      alignItems: 'center'
    },
    searchBox: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center'
    },
    searchInput: {
      padding: '8px 12px 8px 35px',
      border: '1px solid #d1d5db',
      borderRadius: '8px',
      fontSize: '14px',
      width: '250px',
      outline: 'none'
    },
    searchIcon: {
      position: 'absolute',
      left: '10px',
      color: '#6b7280'
    },
    taskFilters: {
      display: 'flex',
      gap: '8px'
    },
    filterButton: {
      padding: '8px 16px',
      backgroundColor: 'white',
      border: '1px solid #e5e7eb',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '500'
    },
    filterButtonActive: {
      backgroundColor: '#7C2A62',
      color: 'white'
    },
    tasksContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px'
    },
    detailedTaskCard: {
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '12px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      border: '1px solid #e5e7eb'
    },
    taskHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '16px'
    },
    taskMainInfo: {
      flex: 1
    },
    orderHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '8px'
    },
    orderId: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#1f2937',
      margin: 0
    },
    ratingDisplay: {
      display: 'flex',
      alignItems: 'center',
      gap: '4px'
    },
    ratingText: {
      fontSize: '12px',
      color: '#6b7280'
    },
    customerInfo: {
      fontSize: '14px',
      color: '#6b7280',
      margin: '4px 0 0 0'
    },
    deliveryDate: {
      fontSize: '12px',
      color: '#9ca3af',
      margin: '4px 0 0 0'
    },
    taskStatus: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      gap: '8px'
    },
    statusBadge: {
      color: 'white',
      padding: '4px 8px',
      borderRadius: '12px',
      fontSize: '12px',
      fontWeight: '500'
    },
    amountBadge: {
      fontSize: '16px',
      fontWeight: '600',
      color: '#7C2A62'
    },
    taskDetails: {
      marginTop: '16px'
    },
    locationRow: {
      display: 'flex',
      gap: '20px',
      marginBottom: '12px'
    },
    locationColumn: {
      flex: 1
    },
    detailLabel: {
      fontSize: '14px',
      color: '#6b7280',
      fontWeight: '500'
    },
    detailText: {
      fontSize: '14px',
      color: '#1f2937',
      margin: '4px 0 0 0'
    },
    detailSection: {
      marginBottom: '12px'
    },
    feedbackText: {
      fontSize: '14px',
      color: '#1f2937',
      fontStyle: 'italic',
      margin: '4px 0 0 0'
    },
    noTasks: {
      textAlign: 'center',
      padding: '60px 20px',
      backgroundColor: 'white',
      borderRadius: '12px',
      border: '2px dashed #e5e7eb'
    },
    noTasksIcon: {
      fontSize: '48px',
      marginBottom: '16px'
    },
    noTasksText: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#374151',
      margin: '0 0 8px 0'
    },
    noTasksSubtext: {
      fontSize: '14px',
      color: '#6b7280',
      margin: 0
    }
  };

  const formatIndianCurrency = (amount) => {
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  // Filter tasks based on search and filter - Only show delivered tasks
  const getFilteredTasks = () => {
    let filtered = deliveryData.completedTasks;

    if (taskFilter !== 'all') {
      if (taskFilter === 'today') {
        const today = new Date().toISOString().split('T')[0];
        filtered = filtered.filter(task => task.deliveryDate === today);
      } else if (taskFilter === 'week') {
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        filtered = filtered.filter(task => new Date(task.deliveryDate) >= oneWeekAgo);
      }
    }

    if (searchTerm) {
      filtered = filtered.filter(task =>
        task.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.pickupLocation.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  };

  const filteredTasks = getFilteredTasks();

  return (
    <div style={styles.mainContent}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.greeting}>Delivery History</h1>
          <p style={styles.subtitle}>View your delivered orders</p>
        </div>
        <div style={styles.taskHeaderActions}>
          <div style={styles.searchBox}>
            <input
              type="text"
              placeholder="Search delivery history..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={styles.searchInput}
            />
            <span style={styles.searchIcon}></span>
          </div>
          <div style={styles.taskFilters}>
            <button
              style={{
                ...styles.filterButton,
                ...(taskFilter === 'all' ? styles.filterButtonActive : {})
              }}
              onClick={() => setTaskFilter('all')}
            >
              All Time
            </button>
            <button
              style={{
                ...styles.filterButton,
                ...(taskFilter === 'week' ? styles.filterButtonActive : {})
              }}
              onClick={() => setTaskFilter('week')}
            >
              This Week
            </button>
            <button
              style={{
                ...styles.filterButton,
                ...(taskFilter === 'today' ? styles.filterButtonActive : {})
              }}
              onClick={() => setTaskFilter('today')}
            >
              Today
            </button>
          </div>
        </div>
      </div>

      <div style={styles.tasksContainer}>
        {filteredTasks.length === 0 ? (
          <div style={styles.noTasks}>
            <div style={styles.noTasksIcon}>📦</div>
            <h3 style={styles.noTasksText}>No delivery history found</h3>
            <p style={styles.noTasksSubtext}>
              {searchTerm ? 'Try adjusting your search terms' : 'Complete some deliveries to see your history here!'}
            </p>
          </div>
        ) : (
          filteredTasks.map(task => (
            <div key={task.id} style={styles.detailedTaskCard}>
              <div style={styles.taskHeader}>
                <div style={styles.taskMainInfo}>
                  <div style={styles.orderHeader}>
                    <h3 style={styles.orderId}>{task.orderId}</h3>
                    <div style={styles.ratingDisplay}>
                      {'⭐'.repeat(task.rating)}
                      <span style={styles.ratingText}>{task.rating}/5</span>
                    </div>
                  </div>
                  <p style={styles.customerInfo}>
                    {task.customerName} • {task.customerPhone}
                  </p>
                  <p style={styles.deliveryDate}>
                    Delivered on {new Date(task.deliveryDate).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })} at {task.completedTime}
                  </p>
                </div>
                <div style={styles.taskStatus}>
                  <span style={{
                    ...styles.statusBadge,
                    backgroundColor: '#10B981'
                  }}>
                    Delivered
                  </span>
                  <div style={styles.amountBadge}>
                    {formatIndianCurrency(task.amount)}
                  </div>
                </div>
              </div>

              <div style={styles.taskDetails}>
                <div style={styles.locationRow}>
                  <div style={styles.locationColumn}>
                    <strong style={styles.detailLabel}>Pickup:</strong>
                    <p style={styles.detailText}>{task.pickupLocation}</p>
                  </div>
                  <div style={styles.locationColumn}>
                    <strong style={styles.detailLabel}>Delivery:</strong>
                    <p style={styles.detailText}>{task.deliveryLocation}</p>
                  </div>
                </div>
                {task.feedback && (
                  <div style={styles.detailSection}>
                    <strong style={styles.detailLabel}>Customer Feedback:</strong>
                    <p style={styles.feedbackText}>"{task.feedback}"</p>
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

export default DeliveryHistory;