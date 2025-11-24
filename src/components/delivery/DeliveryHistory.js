import React, { useState } from 'react';

const DeliveryHistory = ({ deliveryData }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [taskFilter, setTaskFilter] = useState('all');

  const styles = {
    mainContent: {
      padding: '20px',
      minHeight: '100vh',
      backgroundColor: '#f8f9fa',
      '@media (max-width: 768px)': {
        padding: '16px'
      },
      '@media (max-width: 480px)': {
        padding: '12px'
      }
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '24px',
      flexWrap: 'wrap',
      gap: '16px',
      '@media (max-width: 768px)': {
        flexDirection: 'column',
        alignItems: 'stretch'
      }
    },
    greeting: {
      fontSize: '28px',
      fontWeight: '700',
      color: '#1f2937',
      margin: '0 0 8px 0',
      '@media (max-width: 768px)': {
        fontSize: '24px'
      },
      '@media (max-width: 480px)': {
        fontSize: '20px'
      }
    },
    subtitle: {
      fontSize: '16px',
      color: '#6b7280',
      margin: 0,
      '@media (max-width: 480px)': {
        fontSize: '14px'
      }
    },
    taskHeaderActions: {
      display: 'flex',
      gap: '16px',
      alignItems: 'center',
      flexWrap: 'wrap',
      '@media (max-width: 768px)': {
        width: '100%',
        justifyContent: 'space-between'
      },
      '@media (max-width: 480px)': {
        flexDirection: 'column',
        gap: '12px',
        alignItems: 'stretch'
      }
    },
    searchBox: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      '@media (max-width: 480px)': {
        width: '100%'
      }
    },
    searchInput: {
      padding: '8px 12px 8px 35px',
      border: '1px solid #d1d5db',
      borderRadius: '8px',
      fontSize: '14px',
      width: '250px',
      outline: 'none',
      '@media (max-width: 480px)': {
        width: '100%',
        fontSize: '13px'
      }
    },
    searchIcon: {
      position: 'absolute',
      left: '10px',
      color: '#6b7280'
    },
    taskFilters: {
      display: 'flex',
      gap: '8px',
      flexWrap: 'wrap',
      '@media (max-width: 480px)': {
        justifyContent: 'center'
      }
    },
    filterButton: {
      padding: '8px 16px',
      backgroundColor: 'white',
      border: '1px solid #e5e7eb',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '500',
      transition: 'all 0.3s ease',
      '@media (max-width: 480px)': {
        padding: '6px 12px',
        fontSize: '13px',
        flex: '1 1 calc(33.333% - 8px)',
        textAlign: 'center'
      }
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
      border: '1px solid #e5e7eb',
      '@media (max-width: 768px)': {
        padding: '16px'
      },
      '@media (max-width: 480px)': {
        padding: '12px'
      }
    },
    taskHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '16px',
      gap: '16px',
      '@media (max-width: 768px)': {
        flexDirection: 'column',
        gap: '12px'
      }
    },
    taskMainInfo: {
      flex: 1
    },
    orderHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '8px',
      gap: '12px',
      '@media (max-width: 480px)': {
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '8px'
      }
    },
    orderId: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#1f2937',
      margin: 0,
      '@media (max-width: 480px)': {
        fontSize: '16px'
      }
    },
    ratingDisplay: {
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      '@media (max-width: 480px)': {
        alignSelf: 'flex-start'
      }
    },
    ratingText: {
      fontSize: '12px',
      color: '#6b7280',
      '@media (max-width: 480px)': {
        fontSize: '11px'
      }
    },
    customerInfo: {
      fontSize: '14px',
      color: '#6b7280',
      margin: '4px 0 0 0',
      '@media (max-width: 480px)': {
        fontSize: '13px'
      }
    },
    deliveryDate: {
      fontSize: '12px',
      color: '#9ca3af',
      margin: '4px 0 0 0',
      '@media (max-width: 480px)': {
        fontSize: '11px'
      }
    },
    taskStatus: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      gap: '8px',
      '@media (max-width: 768px)': {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%'
      }
    },
    statusBadge: {
      color: 'white',
      padding: '4px 8px',
      borderRadius: '12px',
      fontSize: '12px',
      fontWeight: '500',
      '@media (max-width: 480px)': {
        fontSize: '11px'
      }
    },
    amountBadge: {
      fontSize: '16px',
      fontWeight: '600',
      color: '#7C2A62',
      '@media (max-width: 480px)': {
        fontSize: '15px'
      }
    },
    taskDetails: {
      marginTop: '16px'
    },
    locationRow: {
      display: 'flex',
      gap: '20px',
      marginBottom: '12px',
      '@media (max-width: 768px)': {
        flexDirection: 'column',
        gap: '8px'
      }
    },
    locationColumn: {
      flex: 1
    },
    detailLabel: {
      fontSize: '14px',
      color: '#6b7280',
      fontWeight: '500',
      '@media (max-width: 480px)': {
        fontSize: '13px'
      }
    },
    detailText: {
      fontSize: '14px',
      color: '#1f2937',
      margin: '4px 0 0 0',
      '@media (max-width: 480px)': {
        fontSize: '13px'
      }
    },
    detailSection: {
      marginBottom: '12px'
    },
    feedbackText: {
      fontSize: '14px',
      color: '#1f2937',
      fontStyle: 'italic',
      margin: '4px 0 0 0',
      '@media (max-width: 480px)': {
        fontSize: '13px'
      }
    },
    noTasks: {
      textAlign: 'center',
      padding: '60px 20px',
      backgroundColor: 'white',
      borderRadius: '12px',
      border: '2px dashed #e5e7eb',
      '@media (max-width: 480px)': {
        padding: '40px 16px'
      }
    },
    noTasksIcon: {
      fontSize: '48px',
      marginBottom: '16px',
      '@media (max-width: 480px)': {
        fontSize: '40px'
      }
    },
    noTasksText: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#374151',
      margin: '0 0 8px 0',
      '@media (max-width: 480px)': {
        fontSize: '16px'
      }
    },
    noTasksSubtext: {
      fontSize: '14px',
      color: '#6b7280',
      margin: 0,
      '@media (max-width: 480px)': {
        fontSize: '13px'
      }
    }
  };

  const formatIndianCurrency = (amount) => {
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  // Helper function to check if a date is today
  const isToday = (dateString) => {
    const today = new Date();
    const taskDate = new Date(dateString);
    
    return (
      taskDate.getDate() === today.getDate() &&
      taskDate.getMonth() === today.getMonth() &&
      taskDate.getFullYear() === today.getFullYear()
    );
  };

  // Helper function to check if a date is within the current week
  const isThisWeek = (dateString) => {
    const today = new Date();
    const taskDate = new Date(dateString);
    
    // Get the start of the week (Monday)
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay() + (today.getDay() === 0 ? -6 : 1));
    startOfWeek.setHours(0, 0, 0, 0);
    
    // Get the end of the week (Sunday)
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);
    
    return taskDate >= startOfWeek && taskDate <= endOfWeek;
  };

  // Filter tasks based on search and filter - Only show delivered tasks
  const getFilteredTasks = () => {
    let filtered = deliveryData.completedTasks || [];

    // Apply time filter
    if (taskFilter === 'today') {
      filtered = filtered.filter(task => isToday(task.deliveryDate));
    } else if (taskFilter === 'week') {
      filtered = filtered.filter(task => isThisWeek(task.deliveryDate));
    }
    // 'all' filter shows all tasks, no additional filtering needed

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(task =>
        task.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.orderId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.pickupLocation?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.deliveryLocation?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  };

  const filteredTasks = getFilteredTasks();

  // Get filter summary text
  const getFilterSummary = () => {
    const totalTasks = filteredTasks.length;
    
    if (taskFilter === 'today') {
      return `Showing ${totalTasks} delivery${totalTasks !== 1 ? 's' : ''} from today`;
    } else if (taskFilter === 'week') {
      return `Showing ${totalTasks} delivery${totalTasks !== 1 ? 's' : ''} from this week`;
    } else {
      return `Showing ${totalTasks} delivery${totalTasks !== 1 ? 's' : ''} from all time`;
    }
  };

  return (
    <div style={styles.mainContent}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.greeting}>Delivery History</h1>
          <p style={styles.subtitle}>{getFilterSummary()}</p>
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
                ...(taskFilter === 'today' ? styles.filterButtonActive : {})
              }}
              onClick={() => setTaskFilter('today')}
            >
              Today
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
                ...(taskFilter === 'all' ? styles.filterButtonActive : {})
              }}
              onClick={() => setTaskFilter('all')}
            >
              All Time
            </button>
          </div>
        </div>
      </div>

      <div style={styles.tasksContainer}>
        {filteredTasks.length === 0 ? (
          <div style={styles.noTasks}>
            <div style={styles.noTasksIcon}>📦</div>
            <h3 style={styles.noTasksText}>
              {taskFilter === 'today' ? 'No deliveries today' : 
               taskFilter === 'week' ? 'No deliveries this week' : 
               'No delivery history found'}
            </h3>
            <p style={styles.noTasksSubtext}>
              {searchTerm ? 'Try adjusting your search terms' : 
               taskFilter === 'today' ? 'Complete some deliveries today to see them here!' :
               taskFilter === 'week' ? 'Complete some deliveries this week to see them here!' :
               'Complete some deliveries to see your history here!'}
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
                      {'⭐'.repeat(task.rating || 0)}
                      <span style={styles.ratingText}>{task.rating || 0}/5</span>
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