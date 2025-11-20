import React from 'react';

const NotificationsPage = ({
  notifications,
  markAsRead,
  markAllAsRead,
  getUnreadCount,
  setActiveView
}) => {
  const unreadCount = getUnreadCount();

  return (
    <div style={styles.notificationsPage}>
      <div style={styles.notificationsHeader}>
        <button 
          style={styles.backButton}
          onClick={() => setActiveView('dashboard')}
          type="button"
        >
          ← Back
        </button>
        <h1 style={styles.pageTitle}>Notifications</h1>
        <div style={styles.headerActions}>
          {unreadCount > 0 && (
            <button 
              style={styles.markAllReadButton}
              onClick={markAllAsRead}
              type="button"
            >
              Mark all as read
            </button>
          )}
          <div style={styles.notificationCount}>
            {unreadCount} unread
          </div>
        </div>
      </div>

      <div style={styles.notificationsList}>
        {notifications.length === 0 ? (
          <div style={styles.emptyState}>
            <div style={styles.emptyStateIcon}>🔔</div>
            <h3 style={styles.emptyStateText}>No notifications yet</h3>
            <p style={styles.emptyStateSubtext}>
              We'll notify you about orders, appointments, and important updates here.
            </p>
          </div>
        ) : (
          notifications.map(notification => (
            <div 
              key={notification.id} 
              style={{
                ...styles.notificationItem,
                ...(notification.read ? styles.readNotification : styles.unreadNotification)
              }}
              onClick={() => markAsRead(notification.id)}
            >
              <div style={styles.notificationIcon}>
                {notification.type === 'order' && '📦'}
                {notification.type === 'delivery' && '🚚'}
                {notification.type === 'prescription' && '📄'}
                {notification.type === 'tracking' && '📍'}
                {notification.type === 'appointment' && '📅'}
              </div>
              <div style={styles.notificationContent}>
                <div style={styles.notificationHeader}>
                  <h4 style={styles.notificationItemTitle}>{notification.title}</h4>
                  {!notification.read && (
                    <span style={styles.unreadIndicator}>●</span>
                  )}
                </div>
                <p style={styles.notificationMessage}>{notification.message}</p>
                <span style={styles.notificationTime}>
                  {new Date(notification.timestamp).toLocaleDateString()} • 
                  {new Date(notification.timestamp).toLocaleTimeString([], { 
                    hour: '2-digit', minute: '2-digit' 
                  })}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const styles = {
  notificationsPage: {
    marginTop: '140px',
    padding: '2rem',
    maxWidth: '800px',
    marginLeft: 'auto',
    marginRight: 'auto',
    minHeight: 'calc(100vh - 140px)',
  },
  notificationsHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
    paddingBottom: '1rem',
    borderBottom: '2px solid #F7D9EB',
  },
  backButton: {
    padding: '0.75rem 1.5rem',
    backgroundColor: 'transparent',
    color: '#7C2A62',
    border: '2px solid #7C2A62',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '0.9rem',
  },
  pageTitle: {
    color: '#7C2A62',
    margin: 0,
    fontSize: '2rem',
  },
  headerActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  markAllReadButton: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#7C2A62',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '0.9rem',
  },
  notificationCount: {
    padding: '0.5rem 1rem',
    backgroundColor: '#F7D9EB',
    color: '#7C2A62',
    borderRadius: '20px',
    fontSize: '0.9rem',
    fontWeight: '600',
  },
  notificationsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  notificationItem: {
    display: 'flex',
    padding: '1.5rem',
    border: '2px solid #F7D9EB',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    backgroundColor: 'white',
    gap: '1rem',
  },
  unreadNotification: {
    backgroundColor: '#f8f5ff',
    borderColor: '#7C2A62',
  },
  readNotification: {
    backgroundColor: 'white',
    opacity: 0.8,
  },
  notificationIcon: {
    fontSize: '1.5rem',
    width: '50px',
    height: '50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F7D9EB',
    borderRadius: '10px',
    flexShrink: 0,
  },
  notificationContent: {
    flex: 1,
  },
  notificationHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '0.5rem',
  },
  notificationItemTitle: {
    margin: '0 0 0.5rem 0',
    fontSize: '1.1rem',
    fontWeight: '600',
    color: '#333',
  },
  unreadIndicator: {
    color: '#7C2A62',
    fontSize: '1.2rem',
  },
  notificationMessage: {
    margin: '0 0 1rem 0',
    fontSize: '0.95rem',
    color: '#666',
    lineHeight: '1.5',
  },
  notificationTime: {
    fontSize: '0.85rem',
    color: '#999',
  },
  emptyState: {
    textAlign: 'center',
    padding: '4rem 2rem',
    color: '#666',
  },
  emptyStateIcon: {
    fontSize: '4rem',
    marginBottom: '1rem',
    opacity: 0.5,
  },
  emptyStateText: {
    margin: '0 0 1rem 0',
    fontSize: '1.5rem',
    fontWeight: '600',
    color: '#7C2A62',
  },
  emptyStateSubtext: {
    margin: 0,
    fontSize: '1rem',
    color: '#999',
    lineHeight: '1.5',
  },
};

export default NotificationsPage;