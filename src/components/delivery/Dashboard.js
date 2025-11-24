import React, { useState, useEffect } from 'react';
import AIChatBoard from './AIChatBoard';
import LiveRouteTracker from './LiveRouteTracker';

const Dashboard = ({ 
  profileData, 
  deliveryData, 
  isOnline, 
  toggleOnlineStatus, 
  setSelectedTask, 
  toggleNotifications, 
  getUnreadCount, 
  setActivePage,
  currentUser 
}) => {
  const [selectedStat, setSelectedStat] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [realTimeStats, setRealTimeStats] = useState(deliveryData.stats);
  const [realTimeTasks, setRealTimeTasks] = useState({
    pendingTasks: deliveryData.pendingTasks,
    assignedTasks: deliveryData.assignedTasks
  });

  // Simulate real-time updates for stats
  useEffect(() => {
    if (!isOnline) return;

    const interval = setInterval(() => {
      setRealTimeStats(prev => ({
        ...prev,
        // Simulate minor fluctuations in real data
        totalToday: prev.totalToday,
        pending: Math.max(0, prev.pending + (Math.random() > 0.7 ? 1 : 0) - (Math.random() > 0.9 ? 1 : 0)),
        inProgress: Math.max(0, prev.inProgress + (Math.random() > 0.8 ? 1 : 0) - (Math.random() > 0.85 ? 1 : 0)),
        completed: prev.completed + (Math.random() > 0.9 ? 1 : 0),
        todayEarnings: prev.todayEarnings + (Math.random() > 0.95 ? Math.floor(Math.random() * 50) : 0),
        cancelled: prev.cancelled + (Math.random() > 0.98 ? 1 : 0)
      }));
    }, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  }, [isOnline]);

  const styles = {
    mainContent: {
      padding: '20px',
      minHeight: '100vh',
      backgroundColor: '#f8f9fa',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '24px',
      flexWrap: 'wrap',
      gap: '16px',
    },
    headerActions: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      flexWrap: 'wrap',
    },
    actionButtons: {
      display: 'flex',
      gap: '8px',
    },
    onlineStatus: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      backgroundColor: 'white',
      padding: '8px 12px',
      borderRadius: '8px',
      border: '1px solid #e5e7eb',
      minWidth: 'fit-content',
    },
    statusDot: {
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      display: 'inline-block'
    },
    statusText: {
      fontSize: '14px',
      fontWeight: '500',
      color: '#374151',
    },
    statusToggle: {
      backgroundColor: 'transparent',
      border: '1px solid #d1d5db',
      padding: '4px 8px',
      borderRadius: '4px',
      fontSize: '12px',
      cursor: 'pointer',
      color: '#374151',
      whiteSpace: 'nowrap',
    },
    notificationButton: {
      backgroundColor: 'white',
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      padding: '8px 12px',
      cursor: 'pointer',
      fontSize: '16px',
      position: 'relative',
      transition: 'all 0.3s ease',
      minWidth: 'fit-content',
    },
    notificationBadge: {
      position: 'absolute',
      top: '-4px',
      right: '-4px',
      backgroundColor: '#EF4444',
      color: 'white',
      borderRadius: '50%',
      width: '16px',
      height: '16px',
      fontSize: '10px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 'bold'
    },
    greeting: {
      fontSize: '28px',
      fontWeight: '700',
      color: '#1f2937',
      margin: '0 0 8px 0',
    },
    subtitle: {
      fontSize: '16px',
      color: '#6b7280',
      margin: 0,
    },
    dateDisplay: {
      fontSize: '14px',
      color: '#6b7280',
      fontWeight: '500',
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
      gap: '12px',
      marginBottom: '24px',
    },
    statCard: {
      backgroundColor: 'white',
      padding: '16px',
      borderRadius: '12px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      border: '2px solid transparent',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      minHeight: '90px',
    },
    statCardActive: {
      borderColor: '#7C2A62',
      boxShadow: '0 4px 12px rgba(124, 42, 98, 0.2)',
      transform: 'translateY(-2px)'
    },
    statIcon: {
      fontSize: '18px',
      marginBottom: '8px',
      width: '36px',
      height: '36px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '10px',
    },
    statContent: {
      textAlign: 'center'
    },
    statNumber: {
      fontSize: '18px',
      fontWeight: '700',
      color: '#1f2937',
      margin: '0 0 4px 0',
    },
    statLabel: {
      fontSize: '11px',
      color: '#6b7280',
      margin: 0,
      fontWeight: '500',
    },
    contentGrid: {
      display: 'grid',
      gridTemplateColumns: '2fr 1fr',
      gap: '20px',
    },
    section: {
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '20px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
      border: '1px solid #e5e7eb',
    },
    sidebarSection: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px'
    },
    sectionHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '16px',
    },
    sectionTitle: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#1f2937',
      margin: 0,
    },
    viewAll: {
      fontSize: '14px',
      color: '#7C2A62',
      fontWeight: '500',
      cursor: 'pointer',
    },
    tasksList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px'
    },
    taskCard: {
      padding: '16px',
      border: '1px solid #e5e7eb',
      borderRadius: '10px',
      transition: 'all 0.3s ease',
    },
    taskHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '12px',
      gap: '12px',
    },
    taskInfo: {
      flex: 1
    },
    orderId: {
      fontSize: '16px',
      fontWeight: '600',
      color: '#1f2937',
      margin: '0 0 4px 0',
    },
    customerName: {
      fontSize: '14px',
      color: '#6b7280',
      margin: 0,
    },
    taskStatus: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      gap: '4px',
    },
    statusBadge: {
      color: 'white',
      padding: '4px 8px',
      borderRadius: '12px',
      fontSize: '11px',
      fontWeight: '500',
    },
    priorityBadge: {
      fontSize: '11px',
      fontWeight: '500',
    },
    taskDetails: {
      marginBottom: '12px'
    },
    locationRow: {
      display: 'flex',
      alignItems: 'flex-start',
      marginBottom: '8px',
    },
    locationLabel: {
      fontSize: '11px',
      color: '#6b7280',
      fontWeight: '500',
      minWidth: '60px',
    },
    locationText: {
      fontSize: '13px',
      color: '#1f2937',
      flex: 1,
    },
    taskMeta: {
      display: 'flex',
      gap: '12px',
      marginBottom: '16px',
      flexWrap: 'wrap',
    },
    metaItem: {
      fontSize: '11px',
      color: '#6b7280',
      fontWeight: '500',
    },
    taskActions: {
      display: 'flex',
      gap: '8px',
      flexWrap: 'wrap',
    },
    primaryButton: {
      backgroundColor: '#7C2A62',
      color: 'white',
      border: 'none',
      padding: '8px 12px',
      borderRadius: '6px',
      fontSize: '12px',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      flex: '1 1 auto',
      width: '100%', 
      minWidth: 'auto', 
      maxWidth: '200px', 
      margin: '0 auto',
      justifyContent: 'center',
    },
    secondaryButton: {
      backgroundColor: 'transparent',
      color: '#7C2A62',
      border: '1px solid #7C2A62',
      padding: '7px 11px',
      borderRadius: '6px',
      fontSize: '12px',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      flex: '1 1 auto',
     width: '100%', 
      minWidth: 'auto', 
      maxWidth: '200px', 
      margin: '0 auto',
      justifyContent: 'center',
    },
    successButton: {
      backgroundColor: '#10B981',
      color: 'white',
      border: 'none',
      padding: '8px 12px',
      borderRadius: '6px',
      fontSize: '12px',
      fontWeight: '500',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      flex: '1 1 auto',
      width: '100%', 
      minWidth: 'auto', 
      maxWidth: '200px', 
      margin: '0 auto',
      justifyContent: 'center',
    },
    dangerButton: {
      backgroundColor: '#EF4444',
      color: 'white',
      border: 'none',
      padding: '8px 12px',
      borderRadius: '6px',
      fontSize: '12px',
      fontWeight: '500',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      flex: '1 1 auto',
      width: '100%', 
      minWidth: 'auto', 
      maxWidth: '200px', 
      margin: '0 auto',
      justifyContent: 'center',
    },
    acceptButton: {
      backgroundColor: '#3B82F6',
      color: 'white',
      border: 'none',
      padding: '8px 12px',
      borderRadius: '6px',
      fontSize: '12px',
      fontWeight: '500',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      flex: '1 1 auto',
      width: '100%', 
      minWidth: 'auto', 
      maxWidth: '200px', 
      margin: '0 auto',
      justifyContent: 'center',
    },
    statDetailPanel: {
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '20px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      border: '1px solid #e5e7eb',
      marginBottom: '20px',
    },
    statDetailHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '16px',
    },
    statDetailTitle: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#1f2937',
      margin: 0,
    },
    closeButton: {
      backgroundColor: 'transparent',
      border: 'none',
      fontSize: '20px',
      cursor: 'pointer',
      color: '#6b7280',
    },
    statDetailContent: {
      fontSize: '14px',
      color: '#6b7280',
      lineHeight: '1.6',
    },
    offlineMessage: {
      backgroundColor: '#FEF3C7',
      border: '1px solid #F59E0B',
      borderRadius: '8px',
      padding: '16px',
      textAlign: 'center',
      marginBottom: '20px',
    },
    offlineText: {
      color: '#92400E',
      fontSize: '16px',
      fontWeight: '500',
      margin: 0,
    }
  };

  // Mobile responsive styles
  const mobileStyles = {
    mainContent: {
      ...styles.mainContent,
      padding: '12px 10px',
    },
    header: {
      ...styles.header,
      flexDirection: 'column',
      alignItems: 'stretch',
      gap: '12px',
      marginBottom: '16px',
    },
    headerActions: {
      ...styles.headerActions,
      justifyContent: 'space-between',
      width: '100%',
      gap: '8px',
    },
    actionButtons: {
      ...styles.actionButtons,
      gap: '6px',
    },
    onlineStatus: {
      ...styles.onlineStatus,
      padding: '6px 10px',
      fontSize: '12px',
    },
    statusText: {
      ...styles.statusText,
      fontSize: '12px',
    },
    statusToggle: {
      ...styles.statusToggle,
      fontSize: '10px',
      padding: '3px 6px',
    },
    notificationButton: {
      ...styles.notificationButton,
      padding: '6px 10px',
      fontSize: '14px',
    },
    greeting: {
      ...styles.greeting,
      fontSize: '22px',
      textAlign: 'center',
    },
    subtitle: {
      ...styles.subtitle,
      fontSize: '14px',
      textAlign: 'center',
    },
    dateDisplay: {
      ...styles.dateDisplay,
      display: 'none',
    },
    statsGrid: {
      ...styles.statsGrid,
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '8px',
      marginBottom: '16px',
    },
    statCard: {
      ...styles.statCard,
      padding: '12px 8px',
      minHeight: '80px',
    },
    statIcon: {
      ...styles.statIcon,
      width: '32px',
      height: '32px',
      fontSize: '16px',
    },
    statNumber: {
      ...styles.statNumber,
      fontSize: '16px',
    },
    statLabel: {
      ...styles.statLabel,
      fontSize: '10px',
    },
    contentGrid: {
      ...styles.contentGrid,
      gridTemplateColumns: '1fr',
      gap: '16px',
    },
    section: {
      ...styles.section,
      padding: '16px',
    },
    sectionHeader: {
      ...styles.sectionHeader,
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: '8px',
      marginBottom: '12px',
    },
    sectionTitle: {
      ...styles.sectionTitle,
      fontSize: '16px',
    },
    viewAll: {
      ...styles.viewAll,
      fontSize: '13px',
      alignSelf: 'flex-end',
    },
    taskCard: {
      ...styles.taskCard,
      padding: '12px',
    },
    taskHeader: {
      ...styles.taskHeader,
      flexDirection: 'column',
      gap: '8px',
      marginBottom: '10px',
    },
    orderId: {
      ...styles.orderId,
      fontSize: '15px',
    },
    customerName: {
      ...styles.customerName,
      fontSize: '13px',
    },
    taskStatus: {
      ...styles.taskStatus,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
    },
    locationRow: {
      ...styles.locationRow,
      flexDirection: 'column',
      gap: '4px',
    },
    locationLabel: {
      ...styles.locationLabel,
      minWidth: 'auto',
    },
    locationText: {
      ...styles.locationText,
      fontSize: '12px',
    },
    taskMeta: {
      ...styles.taskMeta,
      gap: '8px',
      marginBottom: '12px',
    },
    metaItem: {
      ...styles.metaItem,
      fontSize: '10px',
    },
    taskActions: {
      ...styles.taskActions,
      gap: '6px',
    },
    primaryButton: {
      ...styles.primaryButton,
      fontSize: '11px',
      padding: '6px 8px',
      minWidth: '100px',
      flex: '1 1 calc(50% - 6px)',
    },
    secondaryButton: {
      ...styles.secondaryButton,
      fontSize: '11px',
      padding: '6px 8px',
      minWidth: '80px',
      flex: '1 1 calc(50% - 6px)',
    },
    successButton: {
      ...styles.successButton,
      fontSize: '11px',
      padding: '6px 8px',
      minWidth: '100px',
      flex: '1 1 calc(50% - 6px)',
    },
    dangerButton: {
      ...styles.dangerButton,
      fontSize: '11px',
      padding: '6px 8px',
      minWidth: '60px',
      flex: '1 1 calc(50% - 6px)',
    },
    acceptButton: {
      ...styles.acceptButton,
      fontSize: '11px',
      padding: '6px 8px',
      minWidth: '120px',
      flex: '1 1 100%',
    },
    statDetailPanel: {
      ...styles.statDetailPanel,
      padding: '16px',
    },
    statDetailHeader: {
      ...styles.statDetailHeader,
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: '8px',
    },
    statDetailTitle: {
      ...styles.statDetailTitle,
      fontSize: '16px',
    },
    closeButton: {
      ...styles.closeButton,
      alignSelf: 'flex-end',
      marginTop: '-40px',
    },
    statDetailContent: {
      ...styles.statDetailContent,
      fontSize: '13px',
    },
    offlineMessage: {
      ...styles.offlineMessage,
      padding: '12px',
      marginBottom: '16px',
    },
    offlineText: {
      ...styles.offlineText,
      fontSize: '14px',
    }
  };

  const isMobile = window.innerWidth < 768;
  const currentStyles = isMobile ? mobileStyles : styles;

  const formatIndianCurrency = (amount) => {
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  const getCurrentGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const getDisplayName = () => {
    return profileData.fullName.split(' ')[0];
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return '#EF4444';
      case 'Medium': return '#F59E0B';
      case 'Low': return '#10B981';
      default: return '#6B7280';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return '#F59E0B';
      case 'assigned': return '#F59E0B';
      case 'in-progress': return '#3B82F6';
      case 'delivered': return '#10B981';
      case 'cancelled': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const handleViewAllTasks = () => {
    setActivePage('tasks');
  };

  const handleStatClick = (statKey) => {
    if (selectedStat === statKey) {
      setSelectedStat(null);
    } else {
      setSelectedStat(statKey);
    }
  };

  // Enhanced stat details with real-time data
  const getStatDetails = (statKey) => {
    const currentTime = new Date().toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });

    const details = {
      totalToday: {
        title: 'Total Deliveries Today',
        description: `You have ${realTimeStats.totalToday} deliveries scheduled for today. Current performance metrics:`,
        breakdown: [
          `${realTimeStats.completed} successfully delivered`,
          `${realTimeStats.inProgress} currently in progress`,
          `${realTimeStats.pending} waiting for acceptance`,
          `${realTimeStats.cancelled} cancelled orders`,
          `Completion rate: ${Math.round((realTimeStats.completed / realTimeStats.totalToday) * 100)}%`
        ],
        metrics: {
          completionRate: Math.round((realTimeStats.completed / realTimeStats.totalToday) * 100),
          activeDeliveries: realTimeStats.inProgress,
          pendingAcceptance: realTimeStats.pending
        }
      },
      pending: {
        title: 'Pending Acceptance',
        description: `You have ${realTimeStats.pending} deliveries waiting for your acceptance.`,
        breakdown: [
          `${realTimeTasks.pendingTasks.length} new orders available`,
          `Average response time: 8 minutes`,
          `Priority orders: ${realTimeTasks.pendingTasks.filter(task => task.priority === 'High').length}`,
          `Estimated earnings: ${formatIndianCurrency(realTimeTasks.pendingTasks.reduce((sum, task) => sum + task.amount, 0))}`,
          `Last updated: ${currentTime}`
        ],
        metrics: {
          highPriority: realTimeTasks.pendingTasks.filter(task => task.priority === 'High').length,
          totalEarnings: realTimeTasks.pendingTasks.reduce((sum, task) => sum + task.amount, 0),
          averageAmount: realTimeTasks.pendingTasks.length > 0 ? 
            Math.round(realTimeTasks.pendingTasks.reduce((sum, task) => sum + task.amount, 0) / realTimeTasks.pendingTasks.length) : 0
        }
      },
      inProgress: {
        title: 'In Progress Deliveries',
        description: `You have ${realTimeStats.inProgress} deliveries currently being processed.`,
        breakdown: [
          `${realTimeTasks.assignedTasks.filter(task => task.status === 'in-progress').length} actively being delivered`,
          `${realTimeTasks.assignedTasks.filter(task => task.status === 'assigned').length} ready for pickup`,
          `Next delivery: ${realTimeTasks.assignedTasks[0]?.customerName || 'No active deliveries'}`,
          `Total distance to cover: ${realTimeTasks.assignedTasks.reduce((sum, task) => sum + parseFloat(task.distance), 0).toFixed(1)} km`,
          `Current status: Active - ${currentTime}`
        ],
        metrics: {
          activeDelivery: realTimeTasks.assignedTasks.filter(task => task.status === 'in-progress').length,
          readyForPickup: realTimeTasks.assignedTasks.filter(task => task.status === 'assigned').length,
          totalDistance: realTimeTasks.assignedTasks.reduce((sum, task) => sum + parseFloat(task.distance), 0)
        }
      },
      completed: {
        title: 'Delivered Today',
        description: `You have successfully completed ${realTimeStats.completed} deliveries today.`,
        breakdown: [
          `Successful deliveries: ${realTimeStats.completed}`,
          `Total earnings from delivered: ${formatIndianCurrency(realTimeStats.todayEarnings)}`,
          `Average delivery time: 12 minutes`,
          `Customer rating: 4.8/5.0`,
          `Last delivery: ${currentTime}`
        ],
        metrics: {
          totalEarnings: realTimeStats.todayEarnings,
          successRate: Math.round((realTimeStats.completed / realTimeStats.totalToday) * 100),
          averageTime: '12 mins'
        }
      },
      todayEarnings: {
        title: "Today's Earnings",
        description: `Your total earnings so far: ${formatIndianCurrency(realTimeStats.todayEarnings)}`,
        breakdown: [
          `Base delivery fees: ${formatIndianCurrency(Math.round(realTimeStats.todayEarnings * 0.7))}`,
          `Tips received: ${formatIndianCurrency(Math.round(realTimeStats.todayEarnings * 0.3))}`,
          `Bonus earnings: ₹0`,
          `Pending payments: ${formatIndianCurrency(realTimeTasks.assignedTasks.reduce((sum, task) => sum + task.amount, 0))}`,
          `Projected daily total: ${formatIndianCurrency(realTimeStats.todayEarnings * 1.4)}`
        ],
        metrics: {
          baseFees: Math.round(realTimeStats.todayEarnings * 0.7),
          tips: Math.round(realTimeStats.todayEarnings * 0.3),
          pending: realTimeTasks.assignedTasks.reduce((sum, task) => sum + task.amount, 0)
        }
      },
      cancelled: {
        title: 'Cancelled Orders',
        description: `You have ${realTimeStats.cancelled} cancelled orders today.`,
        breakdown: [
          `Total cancelled: ${realTimeStats.cancelled}`,
          `Cancellation rate: ${Math.round((realTimeStats.cancelled / realTimeStats.totalToday) * 100)}%`,
          `Customer cancellations: ${Math.floor(realTimeStats.cancelled * 0.6)}`,
          `Restaurant cancellations: ${Math.floor(realTimeStats.cancelled * 0.3)}`,
          `Delivery partner cancellations: ${Math.floor(realTimeStats.cancelled * 0.1)}`
        ],
        metrics: {
          cancellationRate: Math.round((realTimeStats.cancelled / realTimeStats.totalToday) * 100),
          customerCancelled: Math.floor(realTimeStats.cancelled * 0.6),
          restaurantCancelled: Math.floor(realTimeStats.cancelled * 0.3)
        }
      }
    };
    return details[statKey] || { title: '', description: '', breakdown: [] };
  };

  const handleToggleOnline = () => {
    if (isOnline) {
      setSelectedStat(null);
    }
    toggleOnlineStatus();
  };

  const acceptDelivery = (task) => {
    setRealTimeTasks(prev => ({
      pendingTasks: prev.pendingTasks.filter(t => t.id !== task.id),
      assignedTasks: [...prev.assignedTasks, { ...task, status: 'assigned' }]
    }));

    setRealTimeStats(prev => ({
      ...prev,
      pending: prev.pending - 1,
      inProgress: prev.inProgress + 1
    }));
  };

  const startPickup = (task) => {
    setRealTimeTasks(prev => ({
      ...prev,
      assignedTasks: prev.assignedTasks.map(t => 
        t.id === task.id ? { ...t, status: 'in-progress' } : t
      )
    }));
  };

  const markDelivered = (task) => {
    setRealTimeTasks(prev => ({
      ...prev,
      assignedTasks: prev.assignedTasks.filter(t => t.id !== task.id)
    }));

    setRealTimeStats(prev => ({
      ...prev,
      inProgress: prev.inProgress - 1,
      completed: prev.completed + 1,
      todayEarnings: prev.todayEarnings + task.amount
    }));
  };

  const cancelDelivery = (task) => {
    if (task.status === 'pending') {
      setRealTimeTasks(prev => ({
        ...prev,
        pendingTasks: prev.pendingTasks.filter(t => t.id !== task.id)
      }));
    } else {
      setRealTimeTasks(prev => ({
        ...prev,
        assignedTasks: prev.assignedTasks.filter(t => t.id !== task.id)
      }));
    }

    setRealTimeStats(prev => ({
      ...prev,
      [task.status === 'pending' ? 'pending' : 'inProgress']: prev[task.status === 'pending' ? 'pending' : 'inProgress'] - 1,
      cancelled: prev.cancelled + 1
    }));
  };

  return (
    <div>
      <div style={currentStyles.mainContent}>
        <div style={currentStyles.header}>
          <div>
            <h1 style={currentStyles.greeting}>{getCurrentGreeting()}, {getDisplayName()}</h1>
            <p style={currentStyles.subtitle}>Here's your delivery overview for today</p>
          </div>
          <div style={currentStyles.headerActions}>
            <div style={currentStyles.onlineStatus}>
              <span style={{
                ...currentStyles.statusDot,
                backgroundColor: isOnline ? '#10B981' : '#6B7280'
              }}></span>
              <span style={currentStyles.statusText}>
                {isOnline ? 'Online' : 'Offline'}
              </span>
              <button
                style={currentStyles.statusToggle}
                onClick={handleToggleOnline}
              >
                {isOnline ? 'Go Offline' : 'Go Online'}
              </button>
            </div>
            {!isMobile && (
              <div style={currentStyles.dateDisplay}>
                {new Date().toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
            )}
            <div style={currentStyles.actionButtons}>
              <button
                style={currentStyles.notificationButton}
                onClick={toggleNotifications}
              >
                🔔
                {getUnreadCount() > 0 && (
                  <span style={currentStyles.notificationBadge}>{getUnreadCount()}</span>
                )}
              </button>
            </div>
          </div>
        </div>

        {!isOnline && (
          <div style={currentStyles.offlineMessage}>
            <p style={currentStyles.offlineText}>
              You are currently offline. Go online to accept new deliveries and view data.
            </p>
          </div>
        )}

        {/* Real-time Stats Grid */}
        <div style={currentStyles.statsGrid}>
          <div 
            style={{
              ...currentStyles.statCard,
              ...(selectedStat === 'totalToday' && currentStyles.statCardActive)
            }}
            onClick={() => isOnline && handleStatClick('totalToday')}
          >
            <div style={{ ...currentStyles.statIcon, backgroundColor: '#F7D9EB' }}>📦</div>
            <div style={currentStyles.statContent}>
              <h3 style={currentStyles.statNumber}>{realTimeStats.totalToday}</h3>
              <p style={currentStyles.statLabel}>Total Deliveries Today</p>
            </div>
          </div>

          <div 
            style={{
              ...currentStyles.statCard,
              ...(selectedStat === 'pending' && currentStyles.statCardActive)
            }}
            onClick={() => isOnline && handleStatClick('pending')}
          >
            <div style={{ ...currentStyles.statIcon, backgroundColor: '#E8F4FD' }}>⏳</div>
            <div style={currentStyles.statContent}>
              <h3 style={currentStyles.statNumber}>{realTimeStats.pending}</h3>
              <p style={currentStyles.statLabel}>Pending Acceptance</p>
            </div>
          </div>

          <div 
            style={{
              ...currentStyles.statCard,
              ...(selectedStat === 'inProgress' && currentStyles.statCardActive)
            }}
            onClick={() => isOnline && handleStatClick('inProgress')}
          >
            <div style={{ ...currentStyles.statIcon, backgroundColor: '#E8F4FD' }}>🚚</div>
            <div style={currentStyles.statContent}>
              <h3 style={currentStyles.statNumber}>{realTimeStats.inProgress}</h3>
              <p style={currentStyles.statLabel}>In Progress</p>
            </div>
          </div>

          <div 
            style={{
              ...currentStyles.statCard,
              ...(selectedStat === 'completed' && currentStyles.statCardActive)
            }}
            onClick={() => isOnline && handleStatClick('completed')}
          >
            <div style={{ ...currentStyles.statIcon, backgroundColor: '#F0F7E8' }}>✅</div>
            <div style={currentStyles.statContent}>
              <h3 style={currentStyles.statNumber}>{realTimeStats.completed}</h3>
              <p style={currentStyles.statLabel}>Delivered</p>
            </div>
          </div>

          <div 
            style={{
              ...currentStyles.statCard,
              ...(selectedStat === 'todayEarnings' && currentStyles.statCardActive)
            }}
            onClick={() => isOnline && handleStatClick('todayEarnings')}
          >
            <div style={{ ...currentStyles.statIcon, backgroundColor: '#FFF7ED' }}>💰</div>
            <div style={currentStyles.statContent}>
              <h3 style={currentStyles.statNumber}>{formatIndianCurrency(realTimeStats.todayEarnings)}</h3>
              <p style={currentStyles.statLabel}>Today's Earnings</p>
            </div>
          </div>

          <div 
            style={{
              ...currentStyles.statCard,
              ...(selectedStat === 'cancelled' && currentStyles.statCardActive)
            }}
            onClick={() => isOnline && handleStatClick('cancelled')}
          >
            <div style={{ ...currentStyles.statIcon, backgroundColor: '#FEE2E2' }}>❌</div>
            <div style={currentStyles.statContent}>
              <h3 style={currentStyles.statNumber}>{realTimeStats.cancelled}</h3>
              <p style={currentStyles.statLabel}>Cancelled Orders</p>
            </div>
          </div>
        </div>

        {/* Enhanced Stat Detail Panel */}
        {isOnline && selectedStat && (
          <div style={currentStyles.statDetailPanel}>
            <div style={currentStyles.statDetailHeader}>
              <h3 style={currentStyles.statDetailTitle}>{getStatDetails(selectedStat).title}</h3>
              <button 
                style={currentStyles.closeButton}
                onClick={() => setSelectedStat(null)}
              >
                ✕
              </button>
            </div>
            <div style={currentStyles.statDetailContent}>
              <p><strong>{getStatDetails(selectedStat).description}</strong></p>
              <div style={{ margin: '16px 0', padding: '12px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
                <ul style={{ margin: 0, paddingLeft: '20px' }}>
                  {getStatDetails(selectedStat).breakdown.map((item, index) => (
                    <li key={index} style={{ marginBottom: '8px', fontSize: '14px' }}>{item}</li>
                  ))}
                </ul>
              </div>
              {getStatDetails(selectedStat).metrics && (
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', 
                  gap: '12px', 
                  marginTop: '16px',
                  padding: '12px',
                  backgroundColor: '#f0f7ff',
                  borderRadius: '8px'
                }}>
                  {Object.entries(getStatDetails(selectedStat).metrics).map(([key, value]) => (
                    <div key={key} style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#7C2A62' }}>
                        {typeof value === 'number' && key.includes('Rate') ? `${value}%` : 
                         typeof value === 'number' && key.includes('Earnings') ? formatIndianCurrency(value) :
                         typeof value === 'number' && key.includes('Amount') ? formatIndianCurrency(value) :
                         value}
                      </div>
                      <div style={{ fontSize: '12px', color: '#6b7280', textTransform: 'capitalize' }}>
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        <div style={currentStyles.contentGrid}>
          <div style={currentStyles.section}>
            <div style={currentStyles.sectionHeader}>
              <h2 style={currentStyles.sectionTitle}>
                {isOnline ? 'Current Deliveries' : 'Delivery Overview'}
              </h2>
              {isOnline && (
                <span
                  style={currentStyles.viewAll}
                  onClick={handleViewAllTasks}
                >
                  View History
                </span>
              )}
            </div>
            <div style={currentStyles.tasksList}>
              {isOnline ? (
                <>
                  {/* Pending Tasks */}
                  {realTimeTasks.pendingTasks.map(task => (
                    <div key={task.id} style={currentStyles.taskCard}>
                      <div style={currentStyles.taskHeader}>
                        <div style={currentStyles.taskInfo}>
                          <h4 style={currentStyles.orderId}>{task.orderId}</h4>
                          <p style={currentStyles.customerName}>{task.customerName}</p>
                        </div>
                        <div style={currentStyles.taskStatus}>
                          <span style={{
                            ...currentStyles.statusBadge,
                            backgroundColor: getStatusColor(task.status)
                          }}>
                            {task.status}
                          </span>
                          <span style={{
                            ...currentStyles.priorityBadge,
                            color: getPriorityColor(task.priority)
                          }}>
                            {task.priority}
                          </span>
                        </div>
                      </div>

                      <div style={currentStyles.taskDetails}>
                        <div style={currentStyles.locationRow}>
                          <span style={currentStyles.locationLabel}>Pickup:</span>
                          <span style={currentStyles.locationText}>{task.pickupLocation}</span>
                        </div>
                        <div style={currentStyles.locationRow}>
                          <span style={currentStyles.locationLabel}>Delivery:</span>
                          <span style={currentStyles.locationText}>{task.deliveryLocation}</span>
                        </div>
                      </div>

                      <div style={currentStyles.taskMeta}>
                        <span style={currentStyles.metaItem}>🕒 {task.estimatedTime}</span>
                        <span style={currentStyles.metaItem}>📏 {task.distance}</span>
                        <span style={currentStyles.metaItem}>💰 {formatIndianCurrency(task.amount)}</span>
                      </div>

                      <div style={currentStyles.taskActions}>
                        <button
                          style={currentStyles.acceptButton}
                          onClick={() => acceptDelivery(task)}
                        >
                          ✅ Accept Delivery
                        </button>
                        <button
                          style={currentStyles.secondaryButton}
                          onClick={() => setSelectedTask(task)}
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}

                  {/* Assigned Tasks */}
                  {realTimeTasks.assignedTasks.map(task => (
                    <div key={task.id} style={currentStyles.taskCard}>
                      <div style={currentStyles.taskHeader}>
                        <div style={currentStyles.taskInfo}>
                          <h4 style={currentStyles.orderId}>{task.orderId}</h4>
                          <p style={currentStyles.customerName}>{task.customerName}</p>
                        </div>
                        <div style={currentStyles.taskStatus}>
                          <span style={{
                            ...currentStyles.statusBadge,
                            backgroundColor: getStatusColor(task.status)
                          }}>
                            {task.status}
                          </span>
                          <span style={{
                            ...currentStyles.priorityBadge,
                            color: getPriorityColor(task.priority)
                          }}>
                            {task.priority}
                          </span>
                        </div>
                      </div>

                      <div style={currentStyles.taskDetails}>
                        <div style={currentStyles.locationRow}>
                          <span style={currentStyles.locationLabel}>Pickup:</span>
                          <span style={currentStyles.locationText}>{task.pickupLocation}</span>
                        </div>
                        <div style={currentStyles.locationRow}>
                          <span style={currentStyles.locationLabel}>Delivery:</span>
                          <span style={currentStyles.locationText}>{task.deliveryLocation}</span>
                        </div>
                      </div>

                      <div style={currentStyles.taskMeta}>
                        <span style={currentStyles.metaItem}>🕒 {task.estimatedTime}</span>
                        <span style={currentStyles.metaItem}>📏 {task.distance}</span>
                        <span style={currentStyles.metaItem}>💰 {formatIndianCurrency(task.amount)}</span>
                      </div>

                      <div style={currentStyles.taskActions}>
                        {task.status === 'assigned' && (
                          <button
                            style={currentStyles.primaryButton}
                            onClick={() => startPickup(task)}
                          >
                            Start Pickup
                          </button>
                        )}
                        {task.status === 'in-progress' && (
                          <button
                            style={currentStyles.successButton}
                            onClick={() => markDelivered(task)}
                          >
                            Mark Delivered
                          </button>
                        )}
                        <button
                          style={currentStyles.secondaryButton}
                          onClick={() => setSelectedTask(task)}
                        >
                          View Details
                        </button>
                        <button
                          style={currentStyles.dangerButton}
                          onClick={() => cancelDelivery(task)}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>
                  <p>Go online to view and accept delivery tasks.</p>
                </div>
              )}
            </div>
          </div>

          <div style={currentStyles.sidebarSection}>
            <LiveRouteTracker 
              deliveryData={{
                ...deliveryData,
                stats: realTimeStats,
                pendingTasks: realTimeTasks.pendingTasks,
                assignedTasks: realTimeTasks.assignedTasks
              }} 
              isOnline={isOnline} 
            />
          </div>
        </div>
      </div>

      {/* Floating AI Chat Button */}
      <button 
        onClick={() => setIsChatOpen(true)}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          backgroundColor: '#7C2A62',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          width: '60px',
          height: '60px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          zIndex: 1002
        }}
      >
        💬
      </button>

      {/* AI Chat Board Component */}
      <AIChatBoard 
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        user={currentUser}
      />
    </div>
  );
};

export default Dashboard;