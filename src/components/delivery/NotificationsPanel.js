import React from 'react';

const NotificationsPanel = ({ showNotifications, notifications, onClose, onViewAll }) => {
  const styles = {
    notificationsPanel: {
      position: 'fixed',
      top: '20px',
      right: '20px',
      width: '380px',
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
      zIndex: 1001,
      maxHeight: '80vh',
      overflow: 'hidden'
    },
    notificationsHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '20px',
      borderBottom: '1px solid #e5e7eb',
      backgroundColor: '#f8fafc'
    },
    closeButton: {
      backgroundColor: 'transparent',
      border: 'none',
      fontSize: '20px',
      cursor: 'pointer',
      color: '#6b7280'
    },
    notificationsList: {
      maxHeight: '400px',
      overflowY: 'auto'
    },
    notificationItem: {
      display: 'flex',
      padding: '16px 20px',
      borderBottom: '1px solid #f3f4f6',
      transition: 'background-color 0.3s ease'
    },
    notificationIcon: {
      fontSize: '20px',
      marginRight: '12px',
      marginTop: '2px'
    },
    notificationContent: {
      flex: 1
    },
    notificationTitle: {
      fontSize: '14px',
      fontWeight: '600',
      color: '#1f2937',
      margin: '0 0 4px 0'
    },
    notificationMessage: {
      fontSize: '13px',
      color: '#6b7280',
      margin: '0 0 4px 0',
      lineHeight: '1.4'
    },
    notificationTime: {
      fontSize: '11px',
      color: '#9ca3af'
    },
    notificationsFooter: {
      padding: '16px 20px',
      borderTop: '1px solid #e5e7eb',
      backgroundColor: '#f8fafc'
    },
    viewAllButton: {
      width: '100%',
      padding: '10px',
      backgroundColor: '#7C2A62',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      fontWeight: '500',
      fontSize: '14px'
    }
  };

  if (!showNotifications) return null;

  return (
    <div style={styles.notificationsPanel}>
      <div style={styles.notificationsHeader}>
        <h3>Notifications</h3>
        <button
          style={styles.closeButton}
          onClick={onClose}
        >
          ✕
        </button>
      </div>
      <div style={styles.notificationsList}>
        {notifications.slice(0, 5).map(notification => (
          <div key={notification.id} style={styles.notificationItem}>
            <div style={styles.notificationIcon}>
              {notification.type === 'order' && '📦'}
              {notification.type === 'system' && '⚙️'}
              {notification.type === 'customer' && '👤'}
            </div>
            <div style={styles.notificationContent}>
              <h4 style={styles.notificationTitle}>{notification.title}</h4>
              <p style={styles.notificationMessage}>{notification.message}</p>
              <span style={styles.notificationTime}>{notification.time}</span>
            </div>
          </div>
        ))}
      </div>
      <div style={styles.notificationsFooter}>
        <button
          style={styles.viewAllButton}
          onClick={onViewAll}
        >
          View All Notifications
        </button>
      </div>
    </div>
  );
};

export default NotificationsPanel;