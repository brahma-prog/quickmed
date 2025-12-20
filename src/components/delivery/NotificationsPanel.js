import React, { useState, useEffect, useRef, useCallback } from 'react';

const NotificationPanel = ({ 
  showNotifications, 
  notifications = [],
  onClose, 
  onViewAll,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  deleteAllNotifications,
  loadMoreNotifications,
  isFullPage = false,
  // New props for real-time functionality
  realTimeEnabled = false,
  websocketUrl = null,
  onNewNotification = null,
  onNotificationUpdate = null,
  pollInterval = 30000, // 30 seconds for fallback polling
  autoMarkAsRead = false,
  soundEnabled = false,
  notificationSound = null
}) => {
  const [localNotifications, setLocalNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [deletedIds, setDeletedIds] = useState(new Set());
  const [deletedAll, setDeletedAll] = useState(false);
  const [hoverStates, setHoverStates] = useState({});
  
  // New states for real-time functionality
  const [isConnected, setIsConnected] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('disconnected');
  const [newNotificationsCount, setNewNotificationsCount] = useState(0);
  const [lastUpdateTime, setLastUpdateTime] = useState(null);
  const [websocket, setWebsocket] = useState(null);
  
  const notificationsRef = useRef(null);
  const audioRef = useRef(null);
  const pollIntervalRef = useRef(null);
  const reconnectTimeoutRef = useRef(null);

  // Initialize audio for notification sound
  useEffect(() => {
    if (soundEnabled && notificationSound) {
      audioRef.current = new Audio(notificationSound);
    }
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [soundEnabled, notificationSound]);

  // Initialize WebSocket connection
  useEffect(() => {
    if (!realTimeEnabled || !websocketUrl || !showNotifications) return;

    const connectWebSocket = () => {
      try {
        const ws = new WebSocket(websocketUrl);
        
        ws.onopen = () => {
          setIsConnected(true);
          setConnectionStatus('connected');
          console.log('WebSocket connected for real-time notifications');
          
          // Send authentication if needed
          const token = localStorage.getItem('authToken');
          if (token) {
            ws.send(JSON.stringify({
              type: 'auth',
              token: token
            }));
          }
        };

        ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            handleRealTimeMessage(data);
          } catch (error) {
            console.error('Error parsing WebSocket message:', error);
          }
        };

        ws.onclose = (event) => {
          setIsConnected(false);
          setConnectionStatus('disconnected');
          console.log('WebSocket disconnected:', event.code, event.reason);
          
          // Attempt reconnection after delay
          if (event.code !== 1000) { // Don't reconnect if normal closure
            reconnectTimeoutRef.current = setTimeout(() => {
              setConnectionStatus('reconnecting');
              connectWebSocket();
            }, 5000);
          }
        };

        ws.onerror = (error) => {
          console.error('WebSocket error:', error);
          setConnectionStatus('error');
        };

        setWebsocket(ws);
      } catch (error) {
        console.error('Error connecting WebSocket:', error);
        setConnectionStatus('error');
      }
    };

    connectWebSocket();

    return () => {
      if (websocket) {
        websocket.close(1000, 'Component unmounting');
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
    };
  }, [realTimeEnabled, websocketUrl, showNotifications]);

  // Fallback polling for real-time updates if WebSocket fails
  useEffect(() => {
    if (!realTimeEnabled || isConnected || !showNotifications) return;

    const pollForUpdates = async () => {
      try {
        const response = await fetch('/api/notifications/check-updates', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
            'If-Modified-Since': lastUpdateTime || new Date(0).toUTCString()
          }
        });

        if (response.status === 200) {
          const data = await response.json();
          if (data.newNotifications > 0) {
            handleNewNotifications(data.notifications);
          }
          setLastUpdateTime(new Date().toUTCString());
        }
      } catch (error) {
        console.error('Polling error:', error);
      }
    };

    // Initial poll
    pollForUpdates();

    // Set up polling interval
    pollIntervalRef.current = setInterval(pollForUpdates, pollInterval);

    return () => {
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current);
      }
    };
  }, [realTimeEnabled, isConnected, showNotifications, pollInterval, lastUpdateTime]);

  // Handle real-time WebSocket messages
  const handleRealTimeMessage = useCallback((data) => {
    switch (data.type) {
      case 'new_notification':
        handleNewNotifications([data.notification]);
        break;
      
      case 'notification_update':
        if (onNotificationUpdate) {
          onNotificationUpdate(data.notification);
        } else {
          updateLocalNotification(data.notification);
        }
        break;
      
      case 'notification_deleted':
        setDeletedIds(prev => new Set(prev).add(data.notificationId));
        break;
      
      case 'all_notifications_deleted':
        setDeletedAll(true);
        break;
      
      case 'connection_info':
        console.log('Connected to notification service:', data.info);
        break;
      
      default:
        console.log('Unknown message type:', data.type);
    }
  }, [onNotificationUpdate]);

  // Handle incoming new notifications
  const handleNewNotifications = useCallback((newNotifications) => {
    if (!newNotifications || newNotifications.length === 0) return;

    // Filter out duplicates
    setLocalNotifications(prev => {
      const existingIds = new Set(prev.map(n => n.id));
      const filteredNew = newNotifications.filter(n => 
        !existingIds.has(n.id) && !deletedIds.has(n.id)
      );
      
      if (filteredNew.length === 0) return prev;
      
      // Play sound if enabled
      if (soundEnabled && audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(e => console.log('Audio play failed:', e));
      }
      
      // Update new notifications count
      setNewNotificationsCount(prevCount => prevCount + filteredNew.length);
      
      // Notify parent component
      if (onNewNotification) {
        filteredNew.forEach(notification => onNewNotification(notification));
      }
      
      // Add new notifications to the top
      return [...filteredNew, ...prev];
    });
  }, [deletedIds, soundEnabled, onNewNotification]);

  // Update existing notification
  const updateLocalNotification = useCallback((updatedNotification) => {
    setLocalNotifications(prev =>
      prev.map(notif =>
        notif.id === updatedNotification.id 
          ? { ...notif, ...updatedNotification }
          : notif
      )
    );
  }, []);

  // Send real-time event when marking as read
  const sendRealTimeEvent = useCallback((eventType, data) => {
    if (!websocket || websocket.readyState !== WebSocket.OPEN) return;
    
    try {
      websocket.send(JSON.stringify({
        type: eventType,
        ...data,
        timestamp: new Date().toISOString()
      }));
    } catch (error) {
      console.error('Error sending WebSocket message:', error);
    }
  }, [websocket]);

  // Enhanced mark as read with real-time
  const handleMarkAsRead = (notificationId) => {
    const notification = localNotifications.find(n => n.id === notificationId);
    
    // Add to deleted set immediately for instant UI feedback
    setDeletedIds(prev => new Set(prev).add(notificationId));
    
    // Send real-time event
    if (realTimeEnabled && websocket) {
      sendRealTimeEvent('mark_as_read', { notificationId });
    }
    
    // Update new notifications count
    if (notification && !notification.read) {
      setNewNotificationsCount(prev => Math.max(0, prev - 1));
    }
    
    if (deleteNotification) {
      deleteNotification(notificationId);
    } else {
      setLocalNotifications(prev =>
        prev.filter(notif => notif.id !== notificationId)
      );
    }
  };

  // Enhanced mark all as read with real-time
  const handleMarkAllAsRead = () => {
    // Send real-time event
    if (realTimeEnabled && websocket) {
      sendRealTimeEvent('mark_all_as_read', {});
    }
    
    // Reset new notifications count
    setNewNotificationsCount(0);
    
    if (markAllAsRead) {
      markAllAsRead();
    } else {
      setLocalNotifications(prev =>
        prev.map(notif => ({ ...notif, read: true }))
      );
    }
  };

  // Enhanced delete with real-time
  const handleDeleteNotification = (notificationId) => {
    // Send real-time event
    if (realTimeEnabled && websocket) {
      sendRealTimeEvent('delete_notification', { notificationId });
    }
    
    // Add to deleted set for persistent tracking
    setDeletedIds(prev => new Set(prev).add(notificationId));
    
    if (deleteNotification) {
      deleteNotification(notificationId);
    } else {
      setLocalNotifications(prev =>
        prev.filter(notif => notif.id !== notificationId)
      );
    }
  };

  // Enhanced delete all with real-time
  const handleDeleteAll = () => {
    if (window.confirm('Are you sure you want to delete all notifications? This action cannot be undone.')) {
      // Send real-time event
      if (realTimeEnabled && websocket) {
        sendRealTimeEvent('delete_all_notifications', {});
      }
      
      setDeletedAll(true);
      setNewNotificationsCount(0);
      
      if (deleteAllNotifications) {
        deleteAllNotifications();
      } else {
        setLocalNotifications([]);
      }
    }
  };

  // Sync with server when panel opens
  useEffect(() => {
    if (showNotifications && realTimeEnabled) {
      fetchLatestNotifications();
    }
  }, [showNotifications, realTimeEnabled]);

  const fetchLatestNotifications = async () => {
    try {
      const response = await fetch('/api/notifications/latest', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.notifications) {
          setLocalNotifications(data.notifications);
          setNewNotificationsCount(data.unreadCount || 0);
        }
      }
    } catch (error) {
      console.error('Error fetching latest notifications:', error);
    }
  };

  // Update local notifications when prop changes
  useEffect(() => {
    if (notifications && Array.isArray(notifications)) {
      // Filter out notifications that have been deleted
      const filteredNotifications = notifications.filter(
        notif => !deletedIds.has(notif.id) && !deletedAll
      );
      setLocalNotifications(filteredNotifications);
      
      // Calculate new notifications count
      const unread = filteredNotifications.filter(notif => !notif.read).length;
      setNewNotificationsCount(unread);
    }
  }, [notifications, deletedIds, deletedAll]);

  // Add connection status indicator styles
  const connectionStatusStyles = {
    connected: {
      backgroundColor: '#4CAF50',
      color: 'white'
    },
    disconnected: {
      backgroundColor: '#f44336',
      color: 'white'
    },
    reconnecting: {
      backgroundColor: '#FF9800',
      color: 'white'
    },
    error: {
      backgroundColor: '#9E9E9E',
      color: 'white'
    }
  };

  // Add connection status indicator to header
  const renderConnectionStatus = () => {
    if (!realTimeEnabled) return null;
    
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '12px',
        padding: '4px 8px',
        borderRadius: '4px',
        ...connectionStatusStyles[connectionStatus]
      }}>
        <div style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          backgroundColor: connectionStatus === 'connected' ? '#4CAF50' : 
                         connectionStatus === 'reconnecting' ? '#FF9800' : '#f44336'
        }} />
        {connectionStatus === 'connected' ? 'Live' : 
         connectionStatus === 'reconnecting' ? 'Reconnecting...' : 'Offline'}
      </div>
    );
  };

  // Add refresh button
  const handleRefresh = async () => {
    setIsLoading(true);
    try {
      await fetchLatestNotifications();
      setLastUpdateTime(new Date().toUTCString());
    } catch (error) {
      console.error('Error refreshing notifications:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUndoDelete = (notificationId) => {
    // Remove from deleted set
    setDeletedIds(prev => {
      const newSet = new Set(prev);
      newSet.delete(notificationId);
      return newSet;
    });
    
    // Send real-time event for undo
    if (realTimeEnabled && websocket) {
      sendRealTimeEvent('undo_delete', { notificationId });
    }
    
    // Restore the notification
    const originalNotification = notifications.find(n => n.id === notificationId);
    if (originalNotification) {
      setLocalNotifications(prev => [originalNotification, ...prev]);
    }
  };

  const getNotificationIcon = (type) => {
    const icons = {
      order: '📦',
      system: '⚙️',
      customer: '👤',
      payment: '💳',
      security: '🔒',
      promotion: '🎁',
      appointment: '👨‍⚕️',
      default: '🔔'
    };
    return icons[type] || icons.default;
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return 'Just now';
    
    const now = new Date();
    const notificationTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - notificationTime) / (1000 * 60));
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInDays < 7) return `${diffInDays}d ago`;
    
    return notificationTime.toLocaleDateString();
  };

  const unreadCount = Math.max(
    localNotifications.filter(notif => !notif.read).length,
    newNotificationsCount
  );

  const styles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'transparent',
      zIndex: 1000,
    },
    popupContainer: {
      position: 'fixed',
      top: '20px',
      right: '20px',
      width: '420px',
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 10px 25px rgba(0,150,136,0.15)',
      zIndex: 1001,
      maxHeight: '80vh',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      border: '1px solid #4DB6AC'
    },
    fullPageOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(18, 68, 65, 0.7)',
      zIndex: 1000,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
      padding: '20px'
    },
    fullPageContainer: {
      backgroundColor: 'white',
      borderRadius: '12px',
      width: '90%',
      maxWidth: '800px',
      maxHeight: '90vh',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      boxShadow: '0 20px 60px rgba(0,150,136,0.2)',
      border: '1px solid #4DB6AC'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: isFullPage ? '24px' : '20px',
      borderBottom: '1px solid #4DB6AC',
      backgroundColor: '#E0F2F1'
    },
    headerActions: {
      display: 'flex',
      alignItems: 'center',
      gap: isFullPage ? '16px' : '10px'
    },
    unreadBadge: {
      backgroundColor: '#009688',
      color: 'white',
      borderRadius: '10px',
      padding: isFullPage ? '4px 12px' : '2px 8px',
      fontSize: isFullPage ? '14px' : '12px',
      fontWeight: '600'
    },
    closeButton: {
      backgroundColor: 'transparent',
      border: 'none',
      fontSize: '20px',
      cursor: 'pointer',
      color: '#4F6F6B',
      padding: isFullPage ? '8px' : '4px',
      transition: 'color 0.2s ease'
    },
    backButton: {
      backgroundColor: 'transparent',
      border: 'none',
      fontSize: '20px',
      cursor: 'pointer',
      color: '#4F6F6B',
      padding: '8px',
      transition: 'color 0.2s ease'
    },
    actionButton: {
      backgroundColor: 'transparent',
      border: 'none',
      color: '#009688',
      cursor: 'pointer',
      fontSize: isFullPage ? '14px' : '12px',
      fontWeight: '500',
      padding: isFullPage ? '8px 16px' : '4px 8px',
      borderRadius: isFullPage ? '6px' : '4px',
      transition: 'all 0.2s ease',
      border: '1px solid #4DB6AC'
    },
    deleteAllButton: {
      backgroundColor: 'transparent',
      border: 'none',
      color: '#f44336',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '500',
      padding: '8px 16px',
      borderRadius: '6px',
      transition: 'all 0.2s ease',
      border: '1px solid #f44336'
    },
    refreshButton: {
      backgroundColor: 'transparent',
      border: 'none',
      fontSize: '18px',
      cursor: 'pointer',
      color: '#4F6F6B',
      padding: '4px 8px',
      borderRadius: '4px',
      transition: 'all 0.2s ease'
    },
    notificationsList: {
      flex: 1,
      overflowY: 'auto',
      maxHeight: isFullPage ? 'none' : '400px',
      padding: '0'
    },
    notificationItem: {
      display: 'flex',
      padding: isFullPage ? '20px 24px' : '16px 20px',
      borderBottom: '1px solid #E0F2F1',
      backgroundColor: 'transparent',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      position: 'relative'
    },
    unreadNotification: {
      backgroundColor: '#E0F2F1'
    },
    notificationIcon: {
      fontSize: isFullPage ? '24px' : '20px',
      marginRight: isFullPage ? '16px' : '12px',
      marginTop: '2px',
      flexShrink: 0
    },
    notificationContent: {
      flex: 1,
      minWidth: 0
    },
    notificationTitle: {
      fontSize: isFullPage ? '16px' : '14px',
      fontWeight: '600',
      color: '#124441',
      margin: '0 0 4px 0',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start'
    },
    notificationMessage: {
      fontSize: isFullPage ? '14px' : '13px',
      color: '#4F6F6B',
      margin: '0 0 4px 0',
      lineHeight: isFullPage ? '1.5' : '1.4',
      wordWrap: 'break-word'
    },
    notificationTime: {
      fontSize: isFullPage ? '12px' : '11px',
      color: '#4DB6AC',
      fontWeight: '500'
    },
    deleteButton: {
      backgroundColor: 'transparent',
      border: 'none',
      color: '#4F6F6B',
      cursor: 'pointer',
      fontSize: isFullPage ? '14px' : '12px',
      padding: isFullPage ? '4px 8px' : '2px 6px',
      borderRadius: isFullPage ? '4px' : '3px',
      marginLeft: '8px',
      transition: 'all 0.2s ease'
    },
    deleteButtonHover: {
      color: '#f44336',
      backgroundColor: '#FFEBEE',
      border: '1px solid #f44336'
    },
    undoButton: {
      backgroundColor: '#009688',
      color: 'white',
      border: 'none',
      cursor: 'pointer',
      fontSize: '12px',
      fontWeight: '500',
      padding: '4px 12px',
      borderRadius: '4px',
      marginLeft: '8px',
      transition: 'all 0.2s ease'
    },
    emptyState: {
      padding: isFullPage ? '60px 20px' : '40px 20px',
      textAlign: 'center',
      color: '#4F6F6B',
      fontSize: isFullPage ? '16px' : '14px'
    },
    footer: {
      padding: isFullPage ? '16px 24px' : '16px 20px',
      borderTop: '1px solid #4DB6AC',
      backgroundColor: '#E0F2F1'
    },
    viewAllButton: {
      width: '100%',
      padding: '12px',
      backgroundColor: '#009688',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      fontWeight: '500',
      fontSize: '14px',
      transition: 'all 0.2s ease'
    },
    loadMoreButton: {
      width: '100%',
      padding: '16px',
      backgroundColor: 'transparent',
      color: '#009688',
      border: '1px solid #009688',
      borderRadius: '8px',
      cursor: 'pointer',
      fontWeight: '500',
      fontSize: '16px',
      margin: '20px',
      maxWidth: '200px',
      alignSelf: 'center',
      transition: 'all 0.2s ease'
    },
    loadMoreButtonDisabled: {
      opacity: 0.6,
      cursor: 'not-allowed'
    },
    notificationActions: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    readStatus: {
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      backgroundColor: '#009688',
      marginRight: '8px'
    }
  };

  useEffect(() => {
    if (!showNotifications || isFullPage) return;

    const handleClickOutside = (event) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        onClose();
      }
    };

    const timer = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside);
    }, 100);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showNotifications, onClose, isFullPage]);

  const handleLoadMore = async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    try {
      if (loadMoreNotifications) {
        const nextPage = currentPage + 1;
        const newNotifications = await loadMoreNotifications(nextPage);
        
        if (newNotifications && newNotifications.length > 0) {
          // Filter out any notifications that were previously deleted
          const filteredNewNotifications = newNotifications.filter(
            notif => !deletedIds.has(notif.id)
          );
          setLocalNotifications(prev => [...prev, ...filteredNewNotifications]);
          setCurrentPage(nextPage);
        } else {
          setHasMore(false);
        }
      }
    } catch (error) {
      console.error('Error loading more notifications:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!showNotifications && !isFullPage) {
    return null;
  }

  if (!localNotifications || !Array.isArray(localNotifications)) {
    return null;
  }

  if (isFullPage) {
    return (
      <div style={styles.fullPageOverlay} onClick={onClose}>
        <div style={styles.fullPageContainer} onClick={(e) => e.stopPropagation()}>
          <div style={styles.header}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <button
                style={styles.backButton}
                onClick={onClose}
                onMouseEnter={(e) => e.target.style.color = '#124441'}
                onMouseLeave={(e) => e.target.style.color = '#4F6F6B'}
                aria-label="Go back"
              >
                ←
              </button>
              <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '600', color: '#124441' }}>All Notifications</h2>
              {unreadCount > 0 && (
                <span style={styles.unreadBadge}>
                  {unreadCount} unread
                </span>
              )}
            </div>
            
            <div style={styles.headerActions}>
              {renderConnectionStatus()}
              {realTimeEnabled && (
                <button
                  style={styles.refreshButton}
                  onClick={handleRefresh}
                  disabled={isLoading}
                  onMouseEnter={(e) => e.target.style.color = '#124441'}
                  onMouseLeave={(e) => e.target.style.color = '#4F6F6B'}
                  aria-label="Refresh notifications"
                >
                  {isLoading ? '⟳' : '↻'}
                </button>
              )}
              {unreadCount > 0 && localNotifications.length > 0 && (
                <button
                  style={styles.actionButton}
                  onClick={handleMarkAllAsRead}
                  onMouseEnter={(e) => {
                    e.target.style.color = '#FFFFFF';
                    e.target.style.backgroundColor = '#009688';
                    e.target.style.borderColor = '#009688';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = '#009688';
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.borderColor = '#4DB6AC';
                  }}
                >
                  Mark all as read
                </button>
              )}
              {localNotifications.length > 0 && (
                <button
                  style={styles.deleteAllButton}
                  onClick={handleDeleteAll}
                  onMouseEnter={(e) => {
                    e.target.style.color = '#FFFFFF';
                    e.target.style.backgroundColor = '#f44336';
                    e.target.style.borderColor = '#f44336';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = '#f44336';
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.borderColor = '#f44336';
                  }}
                >
                  Delete all
                </button>
              )}
            </div>
          </div>
          
          <div style={styles.notificationsList}>
            {localNotifications.length > 0 ? (
              <>
                {localNotifications.map(notification => (
                  <div 
                    key={notification.id} 
                    style={{
                      ...styles.notificationItem,
                      ...(!notification.read ? styles.unreadNotification : {})
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#E0F2F1';
                      e.currentTarget.style.borderBottomColor = '#009688';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = !notification.read ? '#E0F2F1' : 'transparent';
                      e.currentTarget.style.borderBottomColor = '#E0F2F1';
                    }}
                  >
                    <div style={styles.notificationIcon}>
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div style={styles.notificationContent}>
                      <div style={styles.notificationTitle}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          {!notification.read && <div style={styles.readStatus} />}
                          <span style={{ color: '#124441' }}>{notification.title || 'Notification'}</span>
                        </div>
                        <div style={styles.notificationActions}>
                          <button
                            onClick={() => handleMarkAsRead(notification.id)}
                            style={{
                              ...styles.actionButton,
                              fontSize: '12px',
                              padding: '4px 12px',
                              border: '1px solid #4DB6AC'
                            }}
                            onMouseEnter={(e) => {
                              e.target.style.color = '#FFFFFF';
                              e.target.style.backgroundColor = '#009688';
                              e.target.style.borderColor = '#009688';
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.color = '#009688';
                              e.target.style.backgroundColor = 'transparent';
                              e.target.style.borderColor = '#4DB6AC';
                            }}
                          >
                            Mark Read
                          </button>
                          <button
                            style={{
                              ...styles.deleteButton,
                              ...(hoverStates[notification.id] ? styles.deleteButtonHover : {})
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteNotification(notification.id);
                            }}
                            onMouseEnter={() => setHoverStates(prev => ({ ...prev, [notification.id]: true }))}
                            onMouseLeave={() => setHoverStates(prev => ({ ...prev, [notification.id]: false }))}
                            aria-label="Delete notification"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                      <p style={styles.notificationMessage}>
                        {notification.message || 'No message'}
                      </p>
                      <span style={styles.notificationTime}>
                        {formatTime(notification.timestamp || notification.time)}
                      </span>
                    </div>
                  </div>
                ))}
                
                {hasMore && (
                  <button
                    style={{
                      ...styles.loadMoreButton,
                      ...(isLoading ? styles.loadMoreButtonDisabled : {})
                    }}
                    onClick={handleLoadMore}
                    disabled={isLoading}
                    onMouseEnter={(e) => !isLoading && (
                      e.target.style.backgroundColor = '#009688',
                      e.target.style.color = 'white',
                      e.target.style.borderColor = '#009688'
                    )}
                    onMouseLeave={(e) => !isLoading && (
                      e.target.style.backgroundColor = 'transparent',
                      e.target.style.color = '#009688',
                      e.target.style.borderColor = '#009688'
                    )}
                  >
                    {isLoading ? 'Loading...' : 'Load More Notifications'}
                  </button>
                )}
              </>
            ) : (
              <div style={styles.emptyState}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>📭</div>
                <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: '600', color: '#124441' }}>
                  No notifications
                </h3>
                <p style={{ margin: 0, color: '#4F6F6B' }}>
                  {deletedAll ? 'All notifications have been deleted.' : 'You\'re all caught up!'}
                </p>
                {deletedAll && (
                  <button
                    onClick={() => {
                      setDeletedAll(false);
                      setDeletedIds(new Set());
                    }}
                    style={{
                      marginTop: '16px',
                      padding: '8px 16px',
                      backgroundColor: '#009688',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#00796B'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#009688'}
                  >
                    Restore All Notifications
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div style={styles.overlay} />
      
      <div ref={notificationsRef} style={styles.popupContainer}>
        <div style={styles.header}>
          <div>
            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600', color: '#124441' }}>Notifications</h3>
            {unreadCount > 0 && (
              <span style={styles.unreadBadge}>
                {unreadCount} unread
              </span>
            )}
          </div>
          <div style={styles.headerActions}>
            {renderConnectionStatus()}
            {realTimeEnabled && (
              <button
                style={styles.refreshButton}
                onClick={handleRefresh}
                disabled={isLoading}
                onMouseEnter={(e) => e.target.style.color = '#124441'}
                onMouseLeave={(e) => e.target.style.color = '#4F6F6B'}
                aria-label="Refresh notifications"
              >
                {isLoading ? '⟳' : '↻'}
              </button>
            )}
            {unreadCount > 0 && localNotifications.length > 0 && (
              <button
                style={styles.actionButton}
                onClick={handleMarkAllAsRead}
                onMouseEnter={(e) => {
                  e.target.style.color = '#FFFFFF';
                  e.target.style.backgroundColor = '#009688';
                  e.target.style.borderColor = '#009688';
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = '#009688';
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.borderColor = '#4DB6AC';
                }}
              >
                Mark all read
              </button>
            )}
            <button
              style={styles.closeButton}
              onClick={onClose}
              onMouseEnter={(e) => e.target.style.color = '#124441'}
              onMouseLeave={(e) => e.target.style.color = '#4F6F6B'}
              aria-label="Close notifications"
            >
              ✕
            </button>
          </div>
        </div>
        
        <div style={styles.notificationsList}>
          {localNotifications.length > 0 ? (
            <>
              {localNotifications.slice(0, 5).map(notification => (
                <div 
                  key={notification.id} 
                  style={{
                    ...styles.notificationItem,
                    ...(!notification.read ? styles.unreadNotification : {})
                  }}
                  onClick={() => handleMarkAsRead(notification.id)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#E0F2F1';
                    e.currentTarget.style.borderBottomColor = '#009688';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = !notification.read ? '#E0F2F1' : 'transparent';
                    e.currentTarget.style.borderBottomColor = '#E0F2F1';
                  }}
                >
                  <div style={styles.notificationIcon}>
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div style={styles.notificationContent}>
                    <div style={styles.notificationTitle}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        {!notification.read && <div style={styles.readStatus} />}
                        <span style={{ color: '#124441' }}>{notification.title || 'Notification'}</span>
                      </div>
                      <button
                        style={{
                          ...styles.deleteButton,
                          ...(hoverStates[notification.id] ? styles.deleteButtonHover : {})
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteNotification(notification.id);
                        }}
                        onMouseEnter={() => setHoverStates(prev => ({ ...prev, [notification.id]: true }))}
                        onMouseLeave={() => setHoverStates(prev => ({ ...prev, [notification.id]: false }))}
                        aria-label="Delete notification"
                      >
                        ×
                      </button>
                    </div>
                    <p style={styles.notificationMessage}>
                      {notification.message || 'No message'}
                    </p>
                    <span style={styles.notificationTime}>
                      {formatTime(notification.timestamp || notification.time)}
                    </span>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div style={styles.emptyState}>
              <div style={{ fontSize: '36px', marginBottom: '12px' }}>🔔</div>
              <p style={{ margin: 0, color: '#4F6F6B' }}>
                {deletedAll ? 'All notifications deleted' : 'No notifications available'}
              </p>
            </div>
          )}
        </div>
        
        <div style={styles.footer}>
          <button
            style={styles.viewAllButton}
            onClick={onViewAll}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#00796B';
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 4px 12px rgba(0,150,136,0.3)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#009688';
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'none';
            }}
          >
            View All Notifications
          </button>
        </div>
      </div>
    </>
  );
};

export default NotificationPanel;