import React, { useState, useEffect, useRef } from 'react';

// Toast Notification Component
const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const getToastStyle = () => {
    const baseStyle = {
      position: 'fixed',
      top: '20px',
      right: '20px',
      padding: '12px 20px',
      borderRadius: '8px',
      color: 'white',
      fontWeight: '500',
      zIndex: 1002,
      minWidth: '250px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      animation: 'slideIn 0.3s ease-out'
    };

    switch (type) {
      case 'success':
        return { ...baseStyle, backgroundColor: '#10B981' };
      case 'error':
        return { ...baseStyle, backgroundColor: '#EF4444' };
      case 'warning':
        return { ...baseStyle, backgroundColor: '#F59E0B' };
      case 'info':
        return { ...baseStyle, backgroundColor: '#3B82F6' };
      default:
        return { ...baseStyle, backgroundColor: '#7C2A62' };
    }
  };

  const getToastIcon = () => {
    switch (type) {
      case 'success': return '✅';
      case 'error': return '❌';
      case 'warning': return '⚠️';
      case 'info': return 'ℹ️';
      default: return '💬';
    }
  };

  return (
    <div style={getToastStyle()}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span>{getToastIcon()}</span>
        <span>{message}</span>
      </div>
      <button
        onClick={onClose}
        style={{
          background: 'none',
          border: 'none',
          color: 'white',
          fontSize: '16px',
          cursor: 'pointer',
          marginLeft: '10px'
        }}
      >
        ✕
      </button>
    </div>
  );
};

// Calendar Icon Component
const CalendarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

// Calendar Component
const CalendarView = ({ selectedDate, onDateSelect, earningsData }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [dailyEarnings, setDailyEarnings] = useState({});

  // Generate sample daily earnings data
  useEffect(() => {
    const generateDailyEarnings = () => {
      const earnings = {};
      const daysInMonth = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() + 1,
        0
      ).getDate();

      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
        const dateString = date.toISOString().split('T')[0];

        // Generate realistic earnings data
        const baseEarning = 400 + Math.random() * 300;
        const deliveries = 5 + Math.floor(Math.random() * 10);
        earnings[dateString] = {
          amount: Math.round(baseEarning),
          deliveries: deliveries,
          hours: `${6 + Math.floor(Math.random() * 4)}h ${Math.floor(Math.random() * 60)}m`,
          efficiency: `${85 + Math.floor(Math.random() * 15)}%`
        };
      }
      return earnings;
    };

    setDailyEarnings(generateDailyEarnings());
  }, [currentMonth]);

  const getDaysInMonth = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= lastDay.getDate(); day++) {
      const date = new Date(year, month, day);
      days.push(date);
    }

    return days;
  };

  const navigateMonth = (direction) => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev);
      newMonth.setMonth(prev.getMonth() + direction);
      return newMonth;
    });
  };

  const isToday = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSelected = (date) => {
    return selectedDate && date.toDateString() === selectedDate.toDateString();
  };

  const getEarningsForDate = (date) => {
    const dateString = date.toISOString().split('T')[0];
    return dailyEarnings[dateString];
  };

  const days = getDaysInMonth();
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div style={styles.calendarContainer}>
      <div style={styles.calendarHeader}>
        <button
          style={styles.calendarNavButton}
          onClick={() => navigateMonth(-1)}
        >
          ‹
        </button>
        <h3 style={styles.calendarTitle}>
          {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </h3>
        <button
          style={styles.calendarNavButton}
          onClick={() => navigateMonth(1)}
        >
          ›
        </button>
      </div>

      <div style={styles.calendarGrid}>
        {dayNames.map(day => (
          <div key={day} style={styles.calendarDayHeader}>
            {day}
          </div>
        ))}
        {days.map((date, index) => (
          <div
            key={index}
            style={{
              ...styles.calendarDay,
              ...(date ? styles.calendarDayActive : {}),
              ...(isToday(date) ? styles.calendarDayToday : {}),
              ...(isSelected(date) ? styles.calendarDaySelected : {})
            }}
            onClick={() => date && onDateSelect(date)}
          >
            {date && (
              <>
                <div style={styles.calendarDateNumber}>
                  {date.getDate()}
                </div>
                {getEarningsForDate(date) && (
                  <div style={styles.calendarEarnings}>
                    <div style={styles.calendarAmount}>
                      ₹{getEarningsForDate(date).amount}
                    </div>
                    <div style={styles.calendarDeliveries}>
                      {getEarningsForDate(date).deliveries} del
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>

      {selectedDate && getEarningsForDate(selectedDate) && (
        <div style={styles.selectedDateInfo}>
          <h4 style={styles.selectedDateTitle}>
            {selectedDate.toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </h4>
          <div style={styles.selectedDateStats}>
            <div style={styles.selectedDateStat}>
              <span style={styles.selectedDateStatValue}>
                ₹{getEarningsForDate(selectedDate).amount}
              </span>
              <span style={styles.selectedDateStatLabel}>Earnings</span>
            </div>
            <div style={styles.selectedDateStat}>
              <span style={styles.selectedDateStatValue}>
                {getEarningsForDate(selectedDate).deliveries}
              </span>
              <span style={styles.selectedDateStatLabel}>Deliveries</span>
            </div>
            <div style={styles.selectedDateStat}>
              <span style={styles.selectedDateStatValue}>
                {getEarningsForDate(selectedDate).hours}
              </span>
              <span style={styles.selectedDateStatLabel}>Active Time</span>
            </div>
            <div style={styles.selectedDateStat}>
              <span style={styles.selectedDateStatValue}>
                {getEarningsForDate(selectedDate).efficiency}
              </span>
              <span style={styles.selectedDateStatLabel}>Efficiency</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const DeliveryDashboard = ({ user, onLogout }) => {
  const [activePage, setActivePage] = useState('dashboard');
  const [selectedTask, setSelectedTask] = useState(null);
  const [earningFilter, setEarningFilter] = useState('today');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isOnline, setIsOnline] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [performanceFilter, setPerformanceFilter] = useState('thisMonth');
  const [currentLocation, setCurrentLocation] = useState(null);
  const [routeProgress, setRouteProgress] = useState(0);
  const [taskFilter, setTaskFilter] = useState('all');
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  // Calendar states
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [calendarView, setCalendarView] = useState(false);

  // Toast state
  const [toast, setToast] = useState(null);

  // Refs for click outside detection
  const notificationsRef = useRef(null);
  const chatbotRef = useRef(null);

  // Show toast function
  const showToast = (message, type = 'info') => {
    setToast({ message, type });
  };

  // Enhanced months data for earnings - Updated with current year and proper structure
  const monthsData = [
    { value: 'january', label: 'January 2024', earnings: 15200, deliveries: 230, year: 2024 },
    { value: 'december', label: 'December 2023', earnings: 14200, deliveries: 215, year: 2023 },
    { value: 'november', label: 'November 2023', earnings: 13200, deliveries: 198, year: 2023 },
    { value: 'october', label: 'October 2023', earnings: 14800, deliveries: 225, year: 2023 },
    { value: 'september', label: 'September 2023', earnings: 12800, deliveries: 190, year: 2023 },
    { value: 'august', label: 'August 2023', earnings: 13500, deliveries: 205, year: 2023 },
    { value: 'july', label: 'July 2023', earnings: 14000, deliveries: 210, year: 2023 },
    { value: 'june', label: 'June 2023', earnings: 12500, deliveries: 195, year: 2023 },
    { value: 'may', label: 'May 2023', earnings: 13800, deliveries: 208, year: 2023 },
    { value: 'april', label: 'April 2023', earnings: 12200, deliveries: 185, year: 2023 },
    { value: 'march', label: 'March 2023', earnings: 14500, deliveries: 220, year: 2023 },
    { value: 'february', label: 'February 2023', earnings: 11800, deliveries: 180, year: 2023 }
  ];

  // Click outside handler for notifications and chatbot
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (chatbotRef.current && !chatbotRef.current.contains(event.target)) {
        setShowChatbot(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Real-time location tracking effect
  useEffect(() => {
    if (!isOnline) return;

    const locationInterval = setInterval(() => {
      const locations = [
        'Sector 18, Noida',
        'Sector 15, Noida',
        'Sector 16, Noida',
        'MedPlus Pharmacy, MG Road',
        'Sector 18 Market, Noida'
      ];

      const randomLocation = locations[Math.floor(Math.random() * locations.length)];
      setCurrentLocation(randomLocation);

      setRouteProgress(prev => {
        const newProgress = prev + Math.random() * 10;
        return newProgress > 100 ? 100 : newProgress;
      });
    }, 5000);

    return () => clearInterval(locationInterval);
  }, [isOnline]);

  useEffect(() => {
    if (!isOnline) {
      setRouteProgress(0);
    }
  }, [isOnline]);

  // Enhanced earnings data with months
  const earningsData = {
    today: 560,
    week: 3850,
    month: 15200,
    history: {
      today: [
        { date: '2024-01-15', deliveries: 25, amount: 560, hours: '8h 30m', efficiency: '94%' },
        { date: '2024-01-14', deliveries: 10, amount: 480, hours: '7h 15m', efficiency: '88%' },
        { date: '2024-01-13', deliveries: 8, amount: 420, hours: '6h 45m', efficiency: '85%' },
        { date: '2024-01-12', deliveries: 14, amount: 620, hours: '9h 20m', efficiency: '96%' }
      ],
      week: [
        { date: 'Week 2, Jan 2024', deliveries: 55, amount: 3850, hours: '42h 15m', efficiency: '92%' },
        { date: 'Week 1, Jan 2024', deliveries: 48, amount: 3520, hours: '38h 30m', efficiency: '89%' },
        { date: 'Week 52, Dec 2023', deliveries: 52, amount: 3680, hours: '40h 45m', efficiency: '91%' },
        { date: 'Week 51, Dec 2023', deliveries: 45, amount: 3250, hours: '36h 20m', efficiency: '87%' }
      ],
      month: monthsData // Use the monthsData array for monthly history
    },
    trends: {
      today: [45, 52, 48, 56, 60, 55, 52, 58, 62, 56, 54, 60],
      week: [3200, 3500, 3850, 3400, 3600, 3750, 3900],
      month: [12500, 13200, 14200, 13500, 14800, 15200, 14500, 15800]
    }
  };

  // Generate unique ID for delivery agent
  const generateAgentId = () => {
    const timestamp = new Date().getTime().toString(36);
    const randomStr = Math.random().toString(36).substr(2, 5);
    return `DA-${timestamp}-${randomStr}`.toUpperCase();
  };

  // Initialize profile data with unique ID - UPDATED WITH CURRENT LOCATION
  const [profileData, setProfileData] = useState({
    agentId: generateAgentId(),
    fullName: user?.fullName || 'Delivery Agent',
    email: user?.email || 'delivery@quickmed.com',
    phone: '+91 98765 43210',
    currentLocation: 'Sector 18, Noida',
    vehicleType: 'Motorcycle',
    vehicleNumber: 'DL01AB1234',
    joinedDate: '2023-05-15',
    totalDeliveries: 1245,
    rating: 4.8,
    completionRate: '98%',
    averageRating: 4.7,
    responseTime: '12 mins'
  });

  // Enhanced mock data for delivery agent with realistic real-time data
  const [deliveryData, setDeliveryData] = useState({
    stats: {
      totalToday: 12,
      inProgress: 3,
      completed: 8,
      pending: 1
    },
    assignedTasks: [
      {
        id: 1,
        orderId: 'ORD-001',
        customerName: 'Rajesh Kumar',
        customerPhone: '+91 98765 43210',
        pickupLocation: 'MedPlus Pharmacy, MG Road',
        deliveryLocation: 'H-12, Sector 15, Noida',
        items: ['Paracetamol', 'Vitamin C', 'Cough Syrup'],
        priority: 'High',
        status: 'assigned',
        estimatedTime: '30 mins',
        distance: '4.2 km',
        amount: 45,
        assignedTime: '09:00 AM',
        specialInstructions: 'Call before delivery',
        currentLocation: 'Sector 18, Noida',
        routeProgress: 0
      },
      {
        id: 2,
        orderId: 'ORD-002',
        customerName: 'Priya Sharma',
        customerPhone: '+91 98765 43211',
        pickupLocation: 'Apollo Pharmacy, Connaught Place',
        deliveryLocation: 'B-5, Preet Vihar, Delhi',
        items: ['Insulin', 'Blood Pressure Monitor'],
        priority: 'Medium',
        status: 'in-progress',
        estimatedTime: '25 mins',
        distance: '3.8 km',
        amount: 35,
        assignedTime: '09:15 AM',
        specialInstructions: 'Handle with care - medical equipment',
        currentLocation: 'Connaught Place, Delhi',
        routeProgress: 45
      },
      {
        id: 3,
        orderId: 'ORD-003',
        customerName: 'Amit Patel',
        customerPhone: '+91 98765 43212',
        pickupLocation: 'Fortis Hospital Pharmacy',
        deliveryLocation: 'C-12, GK-1, New Delhi',
        items: ['Antibiotics', 'Pain Relief Spray'],
        priority: 'Low',
        status: 'assigned',
        estimatedTime: '40 mins',
        distance: '6.1 km',
        amount: 50,
        assignedTime: '09:30 AM',
        specialInstructions: 'Leave at security if not available',
        currentLocation: 'Sector 18, Noida',
        routeProgress: 0
      }
    ],
    completedTasks: [
      // Today's deliveries
      {
        id: 101,
        orderId: 'ORD-101',
        customerName: 'Arun Sharma',
        customerPhone: '+91 98765 43218',
        pickupLocation: 'City Medical Store, Sector 18',
        deliveryLocation: 'A-12, Sector 15, Noida',
        items: ['Blood Pressure Medicine', 'Vitamin D3'],
        completedTime: '10:45 AM',
        amount: 65,
        rating: 5,
        feedback: 'Very prompt delivery, excellent service',
        deliveryDate: new Date().toISOString().split('T')[0]
      },
      {
        id: 102,
        orderId: 'ORD-102',
        customerName: 'Meera Singh',
        customerPhone: '+91 98765 43219',
        pickupLocation: 'MedPlus Pharmacy, MG Road',
        deliveryLocation: 'B-8, Sector 16, Noida',
        items: ['Diabetes Medication', 'Insulin Syringes'],
        completedTime: '11:20 AM',
        amount: 55,
        rating: 4,
        feedback: 'Courteous delivery executive',
        deliveryDate: new Date().toISOString().split('T')[0]
      },
      {
        id: 103,
        orderId: 'ORD-103',
        customerName: 'Rohit Verma',
        customerPhone: '+91 98765 43220',
        pickupLocation: 'Apollo Pharmacy, Connaught Place',
        deliveryLocation: 'C-15, Preet Vihar, Delhi',
        items: ['Antibiotics', 'Pain Relief Gel'],
        completedTime: '02:15 PM',
        amount: 75,
        rating: 5,
        feedback: 'Quick and efficient service',
        deliveryDate: new Date().toISOString().split('T')[0]
      },
      {
        id: 104,
        orderId: 'ORD-104',
        customerName: 'Priyanka Mehta',
        customerPhone: '+91 98765 43221',
        pickupLocation: 'Fortis Hospital Pharmacy',
        deliveryLocation: 'D-22, GK-2, New Delhi',
        items: ['Pregnancy Vitamins', 'Folic Acid'],
        completedTime: '03:45 PM',
        amount: 85,
        rating: 4,
        feedback: 'Professional and careful handling',
        deliveryDate: new Date().toISOString().split('T')[0]
      },
      // This week's deliveries
      {
        id: 105,
        orderId: 'ORD-105',
        customerName: 'Sanjay Gupta',
        customerPhone: '+91 98765 43222',
        pickupLocation: 'Max Healthcare Pharmacy',
        deliveryLocation: 'E-8, Vasant Kunj, Delhi',
        items: ['Heart Medication', 'Blood Thinners'],
        completedTime: '09:30 AM',
        amount: 95,
        rating: 5,
        feedback: 'Life-saving delivery, thank you!',
        deliveryDate: new Date(Date.now() - 86400000).toISOString().split('T')[0] // Yesterday
      },
      {
        id: 106,
        orderId: 'ORD-106',
        customerName: 'Anita Reddy',
        customerPhone: '+91 98765 43223',
        pickupLocation: 'City Medical Store, Rohini',
        deliveryLocation: 'F-12, Pitampura, Delhi',
        items: ['Cold Medicine', 'Vitamin C'],
        completedTime: '01:15 PM',
        amount: 45,
        rating: 4,
        feedback: 'Good service',
        deliveryDate: new Date(Date.now() - 86400000).toISOString().split('T')[0] // Yesterday
      },
      {
        id: 107,
        orderId: 'ORD-107',
        customerName: 'Vikram Malhotra',
        customerPhone: '+91 98765 43224',
        pickupLocation: 'MedPlus Pharmacy, Saket',
        deliveryLocation: 'G-5, Greater Kailash, Delhi',
        items: ['Diabetes Strips', 'Insulin'],
        completedTime: '10:00 AM',
        amount: 120,
        rating: 5,
        feedback: 'Excellent timing and service',
        deliveryDate: new Date(Date.now() - 172800000).toISOString().split('T')[0] // 2 days ago
      },
      {
        id: 108,
        orderId: 'ORD-108',
        customerName: 'Neha Kapoor',
        customerPhone: '+91 98765 43225',
        pickupLocation: 'Apollo Pharmacy, CP',
        deliveryLocation: 'H-18, Defence Colony, Delhi',
        items: ['Skin Cream', 'Antibiotic Ointment'],
        completedTime: '04:30 PM',
        amount: 65,
        rating: 4,
        feedback: 'Polite and professional',
        deliveryDate: new Date(Date.now() - 172800000).toISOString().split('T')[0] // 2 days ago
      },
      {
        id: 109,
        orderId: 'ORD-109',
        customerName: 'Rahul Jain',
        customerPhone: '+91 98765 43226',
        pickupLocation: 'Fortis Hospital Pharmacy',
        deliveryLocation: 'I-7, South Extension, Delhi',
        items: ['Blood Pressure Monitor', 'Strips'],
        completedTime: '11:45 AM',
        amount: 150,
        rating: 5,
        feedback: 'Very careful with medical equipment',
        deliveryDate: new Date(Date.now() - 259200000).toISOString().split('T')[0] // 3 days ago
      },
      {
        id: 110,
        orderId: 'ORD-110',
        customerName: 'Sonia Das',
        customerPhone: '+91 98765 43227',
        pickupLocation: 'Max Healthcare, Gurgaon',
        deliveryLocation: 'J-12, DLF Phase 1, Gurgaon',
        items: ['Pregnancy Test', 'Prenatal Vitamins'],
        completedTime: '03:15 PM',
        amount: 55,
        rating: 4,
        feedback: 'Discreet and professional',
        deliveryDate: new Date(Date.now() - 259200000).toISOString().split('T')[0] // 3 days ago
      }
    ],
    liveMap: {
      currentLocation: currentLocation || 'Sector 18, Noida',
      nextPickup: 'MedPlus Pharmacy, 2 km away',
      activeDeliveries: 2,
      trafficConditions: 'Moderate',
      estimatedTravelTime: '15 mins',
      routeProgress: routeProgress
    },
    notifications: [
      {
        id: 1,
        type: 'order',
        title: 'New Delivery Assignment',
        message: 'You have been assigned a new delivery order ORD-006',
        time: '10 minutes ago',
        read: false,
        action: 'view'
      },
      {
        id: 2,
        type: 'system',
        title: 'System Update',
        message: 'App will undergo maintenance tonight from 2-3 AM',
        time: '1 hour ago',
        read: true,
        action: 'dismiss'
      },
      {
        id: 3,
        type: 'customer',
        title: 'Customer Message',
        message: 'Rajesh Kumar: Please deliver to back gate',
        time: '2 hours ago',
        read: true,
        action: 'reply'
      },
      {
        id: 4,
        type: 'order',
        title: 'Delivery Completed',
        message: 'Order ORD-101 has been successfully delivered',
        time: '3 hours ago',
        read: true,
        action: 'view'
      },
      {
        id: 5,
        type: 'system',
        title: 'Bonus Earned',
        message: 'You earned ₹50 bonus for on-time delivery',
        time: '4 hours ago',
        read: true,
        action: 'dismiss'
      },
      {
        id: 6,
        type: 'customer',
        title: 'Customer Rating',
        message: 'You received a 5-star rating from Priya Sharma',
        time: '5 hours ago',
        read: true,
        action: 'view'
      }
    ]
  });

  const [notifications, setNotifications] = useState(deliveryData.notifications);

  // Update delivery data with real-time location
  useEffect(() => {
    if (currentLocation) {
      setDeliveryData(prev => ({
        ...prev,
        liveMap: {
          ...prev.liveMap,
          currentLocation: currentLocation,
          routeProgress: routeProgress
        },
        assignedTasks: prev.assignedTasks.map(task =>
          task.status === 'in-progress'
            ? { ...task, currentLocation: currentLocation, routeProgress: routeProgress }
            : task
        )
      }));
    }
  }, [currentLocation, routeProgress]);

  // Navigation items
  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'tasks', label: 'Delivery History', icon: '📦' },
    { id: 'earnings', label: 'Earnings', icon: '💰' },
    { id: 'performance', label: 'Performance', icon: '📈' }
  ];

  // Function to handle "View All" click
  const handleViewAllTasks = () => {
    setActivePage('tasks');
  };

  // Utility Functions
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
    return profileData.fullName;
  };

  // Task Management Functions
  const startPickup = (taskId) => {
    setDeliveryData(prev => ({
      ...prev,
      assignedTasks: prev.assignedTasks.map(task =>
        task.id === taskId ? { ...task, status: 'in-progress' } : task
      )
    }));
  };

  const markDelivered = (taskId) => {
    const task = deliveryData.assignedTasks.find(t => t.id === taskId);
    if (task) {
      const completedTask = {
        ...task,
        status: 'delivered',
        completedTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        rating: Math.floor(Math.random() * 2) + 4,
        deliveryDate: new Date().toISOString().split('T')[0],
        feedback: 'Delivery completed successfully'
      };

      setDeliveryData(prev => ({
        ...prev,
        assignedTasks: prev.assignedTasks.filter(t => t.id !== taskId),
        completedTasks: [completedTask, ...prev.completedTasks],
        stats: {
          ...prev.stats,
          completed: prev.stats.completed + 1,
          inProgress: prev.stats.inProgress - 1
        }
      }));
    }
  };

  const startDelivery = (taskId) => {
    setDeliveryData(prev => ({
      ...prev,
      assignedTasks: prev.assignedTasks.map(task =>
        task.id === taskId ? { ...task, status: 'in-progress' } : task
      ),
      stats: {
        ...prev.stats,
        inProgress: prev.stats.inProgress + 1,
        pending: prev.stats.pending - 1
      }
    }));
    setSelectedTask(null);
  };

  const getDirections = (task) => {
    const directionsUrl = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(deliveryData.liveMap.currentLocation)}&destination=${encodeURIComponent(task.deliveryLocation)}&travelmode=driving`;
    window.open(directionsUrl, '_blank');
  };

  const contactCustomer = (task) => {
    window.open(`tel:${task.customerPhone}`);
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
      case 'assigned': return '#F59E0B';
      case 'in-progress': return '#3B82F6';
      case 'delivered': return '#10B981';
      default: return '#6B7280';
    }
  };

  // Notification functions
  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    if (!showNotifications) {
      setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
    }
  };

  const getUnreadCount = () => {
    return notifications.filter(notif => !notif.read).length;
  };

  const handleViewAllNotifications = () => {
    setShowNotifications(false);
    alert('View All Notifications - This would open a full notifications page in a real application');
  };

  // Chatbot functions
  const sendMessage = () => {
    if (newMessage.trim() === '') return;

    const userMessage = {
      id: Date.now(),
      text: newMessage,
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, userMessage]);
    setNewMessage('');

    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        text: "Thank you for your message. Our support team will get back to you shortly regarding: '" + newMessage + "'",
        sender: 'bot',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
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

  // Calculate metrics based on current filter - IMPROVED VERSION
  const getFilteredMetrics = () => {
    const selectedMonth = monthsData.find(month => month.value === earningFilter);

    switch (earningFilter) {
      case 'today':
        return {
          totalEarnings: earningsData.today,
          totalDeliveries: deliveryData.stats.totalToday,
          averagePerDelivery: Math.round(earningsData.today / deliveryData.stats.totalToday),
          efficiency: '94%',
          activeHours: '8h 30m'
        };
      case 'week':
        return {
          totalEarnings: earningsData.week,
          totalDeliveries: 55,
          averagePerDelivery: Math.round(earningsData.week / 55),
          efficiency: '92%',
          activeHours: '42h 15m'
        };
      case 'month':
        // Current month data
        const currentMonthData = monthsData[0]; // January 2024 is the current month
        return {
          totalEarnings: currentMonthData.earnings,
          totalDeliveries: currentMonthData.deliveries,
          averagePerDelivery: Math.round(currentMonthData.earnings / currentMonthData.deliveries),
          efficiency: '93%',
          activeHours: '178h 30m'
        };
      default:
        // For specific months
        if (selectedMonth) {
          return {
            totalEarnings: selectedMonth.earnings,
            totalDeliveries: selectedMonth.deliveries,
            averagePerDelivery: Math.round(selectedMonth.earnings / selectedMonth.deliveries),
            efficiency: selectedMonth.value === 'january' ? '93%' :
              selectedMonth.value === 'december' ? '90%' : '88%',
            activeHours: selectedMonth.value === 'january' ? '178h 30m' :
              selectedMonth.value === 'december' ? '165h 45m' : '155h 20m'
          };
        } else {
          // Default to current month
          const currentMonthData = monthsData[0];
          return {
            totalEarnings: currentMonthData.earnings,
            totalDeliveries: currentMonthData.deliveries,
            averagePerDelivery: Math.round(currentMonthData.earnings / currentMonthData.deliveries),
            efficiency: '93%',
            activeHours: '178h 30m'
          };
        }
    }
  };

  // Online status toggle
  const toggleOnlineStatus = () => {
    setIsOnline(!isOnline);
    showToast(
      isOnline ? 'You are now offline' : 'You are now online',
      isOnline ? 'warning' : 'success'
    );
  };

  // Profile editing functions with validation
  const handleProfileEdit = () => {
    setIsEditingProfile(true);
  };

  // Enhanced profile validation
  const handleProfileSave = () => {
    // Validate fields
    if (!profileData.fullName.trim()) {
      showToast('Please enter your full name', 'error');
      return;
    }

    if (!profileData.email.trim() || !/\S+@\S+\.\S+/.test(profileData.email)) {
      showToast('Please enter a valid email address', 'error');
      return;
    }

    // Enhanced phone validation - exactly 10 digits after country code
    const phoneRegex = /^\+91\s[6-9]\d{4}\s\d{5}$/;
    if (!profileData.phone.trim() || !phoneRegex.test(profileData.phone)) {
      showToast('Please enter a valid 10-digit Indian phone number (format: +91 XXXXX XXXXX)', 'error');
      return;
    }

    // Validate current location
    if (!profileData.currentLocation.trim()) {
      showToast('Please enter your current location', 'error');
      return;
    }

    if (!profileData.vehicleNumber.trim()) {
      showToast('Please enter your vehicle number', 'error');
      return;
    }

    // Show confirmation before saving
    if (window.confirm('Are you sure you want to save these changes?')) {
      setIsEditingProfile(false);
      showToast('Profile updated successfully!', 'success');
    }
  };

  const handleProfileCancel = () => {
    setIsEditingProfile(false);
    showToast('Profile editing cancelled', 'warning');
  };

  const handleProfileChange = (field, value) => {
    // Validation for specific fields
    if (field === 'fullName' && !/^[a-zA-Z\s]*$/.test(value) && value !== '') {
      showToast('Name should contain only alphabets', 'error');
      return;
    }

    if (field === 'phone') {
      // Auto-format phone number as user types
      let formattedValue = value;

      // Remove all non-digit characters except +
      formattedValue = formattedValue.replace(/[^\d+]/g, '');

      // Ensure it starts with +91
      if (!formattedValue.startsWith('+91')) {
        if (formattedValue.startsWith('91')) {
          formattedValue = '+' + formattedValue;
        } else if (formattedValue.startsWith('0')) {
          formattedValue = '+91' + formattedValue.substring(1);
        } else if (!formattedValue.startsWith('+')) {
          formattedValue = '+91' + formattedValue;
        }
      }

      // Limit to 10 digits after +91
      if (formattedValue.length > 13) {
        formattedValue = formattedValue.substring(0, 13);
      }

      // Format with space after +91 and after 5 digits
      if (formattedValue.length > 3) {
        formattedValue = formattedValue.substring(0, 3) + ' ' + formattedValue.substring(3);
      }
      if (formattedValue.length > 9) {
        formattedValue = formattedValue.substring(0, 9) + ' ' + formattedValue.substring(9);
      }

      value = formattedValue;
    }

    if (field === 'vehicleNumber' && value.length > 15) {
      showToast('Vehicle number is too long', 'error');
      return;
    }

    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Enhanced logout handler with confirmation
  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      showToast('Logging out...', 'info');
      setTimeout(() => {
        onLogout();
      }, 1500);
    } else {
      showToast('Logout cancelled', 'warning');
    }
  };

  // Performance data based on filter
  const getPerformanceData = () => {
    const baseData = {
      thisMonth: {
        metrics: {
          completionRate: '98%',
          averageRating: 4.7,
          onTimeDelivery: '95%',
          responseTime: '12 mins',
          customerSatisfaction: '96%',
          efficiency: '94%'
        },
        weeklyProgress: [
          { week: 'Week 1', deliveries: 48, rating: 4.6 },
          { week: 'Week 2', deliveries: 55, rating: 4.8 },
          { week: 'Week 3', deliveries: 52, rating: 4.7 },
          { week: 'Week 4', deliveries: 58, rating: 4.9 }
        ]
      },
      last3Months: {
        metrics: {
          completionRate: '97%',
          averageRating: 4.6,
          onTimeDelivery: '94%',
          responseTime: '13 mins',
          customerSatisfaction: '95%',
          efficiency: '92%'
        },
        weeklyProgress: [
          { week: 'Jan W1', deliveries: 45, rating: 4.5 },
          { week: 'Jan W2', deliveries: 52, rating: 4.7 },
          { week: 'Dec W4', deliveries: 48, rating: 4.6 },
          { week: 'Dec W3', deliveries: 50, rating: 4.5 },
          { week: 'Dec W2', deliveries: 47, rating: 4.6 },
          { week: 'Dec W1', deliveries: 44, rating: 4.4 }
        ]
      },
      allTime: {
        metrics: {
          completionRate: '96%',
          averageRating: 4.5,
          onTimeDelivery: '93%',
          responseTime: '14 mins',
          customerSatisfaction: '94%',
          efficiency: '91%'
        },
        weeklyProgress: [
          { week: '2024', deliveries: 55, rating: 4.7 },
          { week: '2023', deliveries: 48, rating: 4.6 },
          { week: '2022', deliveries: 42, rating: 4.4 }
        ]
      }
    };

    return baseData[performanceFilter] || baseData.thisMonth;
  };

  // Enhanced Live Route Component with Real-time Tracking
  const LiveRouteTracker = () => {
    const progress = deliveryData.liveMap.routeProgress;

    return (
      <div style={styles.liveRouteContainer}>
        <div style={styles.routeHeader}>
          <div style={styles.routeTitle}>
            <h3 style={styles.mapTitle}>Live Delivery Route</h3>
            <span style={styles.liveBadge}>
              <span style={styles.livePulse}></span>
              LIVE
            </span>
          </div>
          <div style={styles.routeStats}>
            <span style={styles.routeStat}>Progress: {Math.round(progress)}%</span>
            <span style={styles.routeStat}>ETA: {deliveryData.liveMap.estimatedTravelTime}</span>
          </div>
        </div>

        <div style={styles.routeVisualization}>
          <div style={styles.routePath}>
            <div style={styles.routeStart}>
              <div style={styles.locationPin}>📍</div>
              <div style={styles.locationInfo}>
                <div style={styles.routeLocationLabel}>Current Location</div>
                <div style={styles.routeLocationText}>{deliveryData.liveMap.currentLocation}</div>
              </div>
            </div>

            <div style={styles.progressBar}>
              <div
                style={{
                  ...styles.progressFill,
                  width: `${progress}%`
                }}
              ></div>
              <div style={styles.progressMarker}></div>
            </div>

            <div style={styles.routeEnd}>
              <div style={styles.locationPin}>🏁</div>
              <div style={styles.locationInfo}>
                <div style={styles.routeLocationLabel}>Next Destination</div>
                <div style={styles.routeLocationText}>{deliveryData.liveMap.nextPickup}</div>
              </div>
            </div>
          </div>
        </div>

        <div style={styles.trafficInfo}>
          <div style={styles.trafficStatus}>
            <span style={styles.trafficLabel}>Traffic:</span>
            <span style={{
              ...styles.trafficValue,
              color: deliveryData.liveMap.trafficConditions === 'Heavy' ? '#EF4444' :
                deliveryData.liveMap.trafficConditions === 'Moderate' ? '#F59E0B' : '#10B981'
            }}>
              {deliveryData.liveMap.trafficConditions}
            </span>
          </div>
          <div style={styles.activeDeliveries}>
            <span style={styles.deliveryLabel}>Active Deliveries:</span>
            <span style={styles.deliveryValue}>{deliveryData.liveMap.activeDeliveries}</span>
          </div>
        </div>

        {isOnline && (
          <div style={styles.realTimeUpdates}>
            <div style={styles.updateIndicator}>
              <span style={styles.updateDot}></span>
              Updating in real-time
            </div>
          </div>
        )}
      </div>
    );
  };

  // Performance Page
  const renderPerformance = () => {
    const performanceData = getPerformanceData();

    return (
      <div style={styles.mainContent}>
        <div style={styles.header}>
          <div>
            <h1 style={styles.greeting}>Performance Analytics</h1>
            <p style={styles.subtitle}>Track your delivery performance and metrics</p>
          </div>
          <div style={styles.performanceFilters}>
            <button
              style={{
                ...styles.performanceFilterButton,
                ...(performanceFilter === 'thisMonth' ? styles.performanceFilterButtonActive : {})
              }}
              onClick={() => setPerformanceFilter('thisMonth')}
            >
              This Month
            </button>
            <button
              style={{
                ...styles.performanceFilterButton,
                ...(performanceFilter === 'last3Months' ? styles.performanceFilterButtonActive : {})
              }}
              onClick={() => setPerformanceFilter('last3Months')}
            >
              Last 3 Months
            </button>
            <button
              style={{
                ...styles.performanceFilterButton,
                ...(performanceFilter === 'allTime' ? styles.performanceFilterButtonActive : {})
              }}
              onClick={() => setPerformanceFilter('allTime')}
            >
              All Time
            </button>
          </div>
        </div>

        <div style={styles.performanceGrid}>
          {Object.entries(performanceData.metrics).map(([key, value]) => (
            <div key={key} style={styles.performanceCard}>
              <div style={styles.performanceIcon}>
                {key === 'completionRate' && '✅'}
                {key === 'averageRating' && '⭐'}
                {key === 'onTimeDelivery' && '⏱️'}
                {key === 'responseTime' && '⚡'}
                {key === 'customerSatisfaction' && '😊'}
                {key === 'efficiency' && '📊'}
              </div>
              <div style={styles.performanceContent}>
                <h3 style={styles.performanceValue}>{value}</h3>
                <p style={styles.performanceLabel}>
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div style={styles.chartContainer}>
          <h3 style={styles.sectionTitle}>
            {performanceFilter === 'thisMonth' && 'Weekly Performance Trend'}
            {performanceFilter === 'last3Months' && 'Monthly Performance Trend (Last 3 Months)'}
            {performanceFilter === 'allTime' && 'Yearly Performance Trend'}
          </h3>
          <div style={styles.performanceChart}>
            {performanceData.weeklyProgress.map((week, index) => (
              <div key={index} style={styles.weekBar}>
                <div style={styles.barContainer}>
                  <div
                    style={{
                      ...styles.deliveryBar,
                      height: `${(week.deliveries / 60) * 100}px`
                    }}
                    title={`${week.deliveries} deliveries`}
                  ></div>
                  <div
                    style={{
                      ...styles.ratingBar,
                      height: `${(week.rating / 5) * 100}px`
                    }}
                    title={`Rating: ${week.rating}`}
                  ></div>
                </div>
                <div style={styles.weekLabel}>{week.week}</div>
              </div>
            ))}
          </div>
          <div style={styles.chartLegend}>
            <div style={styles.legendItem}>
              <div style={{ ...styles.legendColor, backgroundColor: '#7C2A62' }}></div>
              <span>Deliveries</span>
            </div>
            <div style={styles.legendItem}>
              <div style={{ ...styles.legendColor, backgroundColor: '#10B981' }}></div>
              <span>Rating</span>
            </div>
          </div>
        </div>

        <div style={styles.performanceInsights}>
          <h3 style={styles.sectionTitle}>Performance Insights</h3>
          <div style={styles.insightsGrid}>
            <div style={styles.insightCard}>
              <div style={styles.insightIcon}>📈</div>
              <div style={styles.insightContent}>
                <h4 style={styles.insightTitle}>Trend Analysis</h4>
                <p style={styles.insightText}>
                  {performanceFilter === 'thisMonth' && 'Your performance has improved by 8% compared to last month.'}
                  {performanceFilter === 'last3Months' && 'Consistent growth observed with 12% improvement over the period.'}
                  {performanceFilter === 'allTime' && 'Steady performance growth with 25% overall improvement since joining.'}
                </p>
              </div>
            </div>
            <div style={styles.insightCard}>
              <div style={styles.insightIcon}>🎯</div>
              <div style={styles.insightContent}>
                <h4 style={styles.insightTitle}>Areas for Improvement</h4>
                <p style={styles.insightText}>
                  {performanceFilter === 'thisMonth' && 'Focus on reducing response time during peak hours.'}
                  {performanceFilter === 'last3Months' && 'Work on maintaining consistency across different delivery zones.'}
                  {performanceFilter === 'allTime' && 'Continue excellent work! Consider mentoring new delivery agents.'}
                </p>
              </div>
            </div>
            <div style={styles.insightCard}>
              <div style={styles.insightIcon}>🏆</div>
              <div style={styles.insightContent}>
                <h4 style={styles.insightTitle}>Achievements</h4>
                <p style={styles.insightText}>
                  {performanceFilter === 'thisMonth' && 'Top 10% performer in your region this month!'}
                  {performanceFilter === 'last3Months' && 'Maintained 95%+ customer satisfaction for 3 consecutive months.'}
                  {performanceFilter === 'allTime' && 'Elite delivery agent status achieved with 1200+ successful deliveries.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Delivery History Page - Only shows delivered tasks
  const renderTasks = () => {
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
              <span style={styles.searchIcon}>🔍</span>
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

  // Dashboard
  const renderDashboard = () => (
    <div style={styles.mainContent}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.greeting}>{getCurrentGreeting()}, {getDisplayName().split(' ')[0]}</h1>
          <p style={styles.subtitle}>Here's your delivery overview for today</p>
        </div>
        <div style={styles.headerActions}>
          <div style={styles.onlineStatus}>
            <span style={{
              ...styles.statusDot,
              backgroundColor: isOnline ? '#10B981' : '#6B7280'
            }}></span>
            <span style={styles.statusText}>
              {isOnline ? 'Online' : 'Offline'}
            </span>
            <button
              style={styles.statusToggle}
              onClick={toggleOnlineStatus}
            >
              {isOnline ? 'Go Offline' : 'Go Online'}
            </button>
          </div>
          <div style={styles.dateDisplay}>
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </div>
          <div style={styles.actionButtons}>
            <button
              style={styles.iconButton}
              onClick={() => setShowChatbot(true)}
            >
              💬
            </button>
            <button
              style={styles.notificationButton}
              onClick={toggleNotifications}
            >
              🔔
              {getUnreadCount() > 0 && (
                <span style={styles.notificationBadge}>{getUnreadCount()}</span>
              )}
            </button>
          </div>
        </div>
      </div>

      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <div style={{ ...styles.statIcon, backgroundColor: '#F7D9EB' }}>📦</div>
          <div style={styles.statContent}>
            <h3 style={styles.statNumber}>{deliveryData.stats.totalToday}</h3>
            <p style={styles.statLabel}>Total Deliveries Today</p>
          </div>
        </div>

        <div style={styles.statCard}>
          <div style={{ ...styles.statIcon, backgroundColor: '#E8F4FD' }}>🚚</div>
          <div style={styles.statContent}>
            <h3 style={styles.statNumber}>{deliveryData.stats.inProgress}</h3>
            <p style={styles.statLabel}>In Progress</p>
          </div>
        </div>

        <div style={styles.statCard}>
          <div style={{ ...styles.statIcon, backgroundColor: '#F0F7E8' }}>✅</div>
          <div style={styles.statContent}>
            <h3 style={styles.statNumber}>{deliveryData.stats.completed}</h3>
            <p style={styles.statLabel}>Delivered</p>
          </div>
        </div>

        <div style={styles.statCard}>
          <div style={{ ...styles.statIcon, backgroundColor: '#FFF7ED' }}>💰</div>
          <div style={styles.statContent}>
            <h3 style={styles.statNumber}>{formatIndianCurrency(earningsData.today)}</h3>
            <p style={styles.statLabel}>Today's Earnings</p>
          </div>
        </div>
      </div>

      <div style={styles.contentGrid}>
        <div style={styles.section}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>Current Deliveries</h2>
            <span
              style={styles.viewAll}
              onClick={handleViewAllTasks}
            >
              View History
            </span>
          </div>
          <div style={styles.tasksList}>
            {deliveryData.assignedTasks.filter(task => task.status !== 'delivered').map(task => (
              <div key={task.id} style={styles.taskCard}>
                <div style={styles.taskHeader}>
                  <div style={styles.taskInfo}>
                    <h4 style={styles.orderId}>{task.orderId}</h4>
                    <p style={styles.customerName}>{task.customerName}</p>
                  </div>
                  <div style={styles.taskStatus}>
                    <span style={{
                      ...styles.statusBadge,
                      backgroundColor: getStatusColor(task.status)
                    }}>
                      {task.status}
                    </span>
                    <span style={{
                      ...styles.priorityBadge,
                      color: getPriorityColor(task.priority)
                    }}>
                      {task.priority}
                    </span>
                  </div>
                </div>

                <div style={styles.taskDetails}>
                  <div style={styles.locationRow}>
                    <span style={styles.locationLabel}>Pickup:</span>
                    <span style={styles.locationText}>{task.pickupLocation}</span>
                  </div>
                  <div style={styles.locationRow}>
                    <span style={styles.locationLabel}>Delivery:</span>
                    <span style={styles.locationText}>{task.deliveryLocation}</span>
                  </div>
                </div>

                <div style={styles.taskMeta}>
                  <span style={styles.metaItem}>🕒 {task.estimatedTime}</span>
                  <span style={styles.metaItem}>📏 {task.distance}</span>
                  <span style={styles.metaItem}>💰 {formatIndianCurrency(task.amount)}</span>
                </div>

                <div style={styles.taskActions}>
                  {task.status === 'assigned' && (
                    <button
                      style={styles.primaryButton}
                      onClick={() => startPickup(task.id)}
                    >
                      Start Pickup
                    </button>
                  )}
                  {task.status === 'in-progress' && (
                    <button
                      style={styles.successButton}
                      onClick={() => markDelivered(task.id)}
                    >
                      Mark Delivered
                    </button>
                  )}
                  <button
                    style={styles.secondaryButton}
                    onClick={() => setSelectedTask(task)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={styles.sidebarSection}>
          <LiveRouteTracker />
        </div>
      </div>
    </div>
  );

  // Earnings Page with Calendar View - IMPROVED VERSION
  const renderEarnings = () => {
    const metrics = getFilteredMetrics();

    // Get current history based on filter
    const getCurrentHistory = () => {
      if (earningFilter === 'today') {
        return earningsData.history.today;
      } else if (earningFilter === 'week') {
        return earningsData.history.week;
      } else if (earningFilter === 'month') {
        return [monthsData[0]]; // Current month
      } else {
        // For specific months
        const selectedMonth = monthsData.find(month => month.value === earningFilter);
        return selectedMonth ? [selectedMonth] : [monthsData[0]];
      }
    };

    const currentHistory = getCurrentHistory();

    // Get current trend data based on filter
    const getCurrentTrend = () => {
      if (earningFilter === 'today') {
        return earningsData.trends.today;
      } else if (earningFilter === 'week') {
        return earningsData.trends.week;
      } else {
        // For month and specific months, show monthly trend
        return monthsData.slice(0, 6).map(month => month.earnings);
      }
    };

    const currentTrend = getCurrentTrend();

    return (
      <div style={styles.mainContent}>
        <div style={styles.header}>
          <div>
            <h1 style={styles.greeting}>Earnings</h1>
            <p style={styles.subtitle}>Track your delivery earnings and performance</p>
          </div>
          <div style={styles.earningFilters}>
            <button
              style={{
                ...styles.earningFilter,
                ...(earningFilter === 'today' ? styles.earningFilterActive : {})
              }}
              onClick={() => {
                setEarningFilter('today');
                setCalendarView(false);
              }}
            >
              Today
            </button>
            <button
              style={{
                ...styles.earningFilter,
                ...(earningFilter === 'week' ? styles.earningFilterActive : {})
              }}
              onClick={() => {
                setEarningFilter('week');
                setCalendarView(false);
              }}
            >
              This Week
            </button>
            <button
              style={{
                ...styles.earningFilter,
                ...(earningFilter === 'month' ? styles.earningFilterActive : {})
              }}
              onClick={() => {
                setEarningFilter('month');
                setCalendarView(false);
              }}
            >
              This Month
            </button>
            <button
              style={{
                ...styles.earningFilter,
                ...(earningFilter === 'calendar' ? styles.earningFilterActive : {})
              }}
              onClick={() => {
                setEarningFilter('calendar');
                setCalendarView(true);
              }}
            >
              <CalendarIcon />
              Calendar
            </button>
            <div style={styles.monthDropdown}>
              <select
                value={earningFilter}
                onChange={(e) => {
                  setEarningFilter(e.target.value);
                  setCalendarView(false);
                }}
                style={styles.monthSelect}
              >
                <option value="" disabled>Select Month</option>
                {monthsData.map(month => (
                  <option key={month.value} value={month.value}>
                    {month.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {calendarView ? (
          <div style={styles.calendarViewContainer}>
            <CalendarView
              selectedDate={selectedDate}
              onDateSelect={setSelectedDate}
              earningsData={earningsData}
            />
          </div>
        ) : (
          <>
            <div style={styles.earningsSummary}>
              <div style={styles.earningStats}>
                <div style={styles.earningStat}>
                  <h3 style={styles.earningAmount}>
                    {formatIndianCurrency(metrics.totalEarnings)}
                  </h3>
                  <p style={styles.earningLabel}>Total Earnings</p>
                  <div style={styles.metricDetail}>
                    <span style={styles.metricValue}>{metrics.activeHours}</span>
                    <span style={styles.metricLabel}>Active Time</span>
                  </div>
                </div>
                <div style={styles.earningStat}>
                  <h3 style={styles.earningAmount}>
                    {metrics.totalDeliveries}
                  </h3>
                  <p style={styles.earningLabel}>Total Deliveries</p>
                  <div style={styles.metricDetail}>
                    <span style={styles.metricValue}>{metrics.efficiency}</span>
                    <span style={styles.metricLabel}>Efficiency</span>
                  </div>
                </div>
                <div style={styles.earningStat}>
                  <h3 style={styles.earningAmount}>
                    {formatIndianCurrency(metrics.averagePerDelivery)}
                  </h3>
                  <p style={styles.earningLabel}>Average per Delivery</p>
                  <div style={styles.metricDetail}>
                    <span style={styles.metricValue}>
                      {earningFilter === 'today' ? '12' :
                        earningFilter === 'week' ? '7.8' : '6.5'}
                    </span>
                    <span style={styles.metricLabel}>Deliveries/Hour</span>
                  </div>
                </div>
              </div>
            </div>

            <div style={styles.chartContainer}>
              <div style={styles.chartHeader}>
                <h3 style={styles.sectionTitle}>
                  {earningFilter === 'today' ? 'Today\'s Earnings Trend' :
                    earningFilter === 'week' ? 'Weekly Earnings Trend' :
                      'Monthly Earnings Trend'}
                </h3>
                <div style={styles.chartLegend}>
                  <div style={styles.legendItem}>
                    <div style={{ ...styles.legendColor, backgroundColor: '#7C2A62' }}></div>
                    <span>Earnings ({formatIndianCurrency(metrics.totalEarnings)})</span>
                  </div>
                  <div style={styles.legendItem}>
                    <div style={{ ...styles.legendColor, backgroundColor: '#10B981' }}></div>
                    <span>Target (+12%)</span>
                  </div>
                </div>
              </div>
              <div style={styles.chartPlaceholder}>
                <div style={styles.chartContent}>
                  <div style={styles.chartBars}>
                    {currentTrend.map((value, index) => {
                      const maxValue = Math.max(...currentTrend);
                      const height = maxValue > 0 ? (value / maxValue) * 120 : 0;
                      return (
                        <div key={index} style={styles.chartBarContainer}>
                          <div
                            style={{
                              ...styles.chartBar,
                              height: `${height}px`,
                              backgroundColor: value === Math.max(...currentTrend) ? '#10B981' : '#7C2A62'
                            }}
                            title={formatIndianCurrency(value)}
                          ></div>
                          <div style={styles.chartLabel}>
                            {earningFilter === 'today' ? `${index + 8}:00` :
                              earningFilter === 'week' ? `Day ${index + 1}` :
                                monthsData[index]?.label.split(' ')[0] || `M${index + 1}`}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div style={styles.chartStats}>
                    <div style={styles.chartStat}>
                      <span style={styles.chartStatValue}>
                        {formatIndianCurrency(metrics.totalEarnings)}
                      </span>
                      <span style={styles.chartStatLabel}>Current</span>
                    </div>
                    <div style={styles.chartStat}>
                      <span style={styles.chartStatValue}>
                        {formatIndianCurrency(Math.round(metrics.totalEarnings * 1.12))}
                      </span>
                      <span style={styles.chartStatLabel}>Target</span>
                    </div>
                    <div style={styles.chartStat}>
                      <span style={{ ...styles.chartStatValue, color: '#10B981' }}>
                        +12%
                      </span>
                      <span style={styles.chartStatLabel}>Growth</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div style={styles.earningsHistory}>
              <div style={styles.sectionHeader}>
                <h3 style={styles.sectionTitle}>
                  {earningFilter === 'today' ? 'Today\'s Earnings' :
                    earningFilter === 'week' ? 'Weekly Earnings History' :
                      'Monthly Earnings History'}
                </h3>
                <span style={styles.viewAll}>Export Report</span>
              </div>
              <div style={styles.earningsList}>
                {currentHistory.map((earning, index) => (
                  <div key={index} style={styles.earningItem}>
                    <div style={styles.earningDate}>
                      <strong style={styles.earningDateText}>
                        {earning.date || earning.label}
                      </strong>
                      <div style={styles.earningMeta}>
                        <span style={styles.metaBadge}>{earning.deliveries} deliveries</span>
                        <span style={styles.metaBadge}>{earning.hours || metrics.activeHours}</span>
                        <span style={{
                          ...styles.metaBadge,
                          backgroundColor: (earning.efficiency || metrics.efficiency) >= '90%' ? '#D1FAE5' : '#FEF3C7',
                          color: (earning.efficiency || metrics.efficiency) >= '90%' ? '#065F46' : '#92400E'
                        }}>
                          {earning.efficiency || metrics.efficiency} efficiency
                        </span>
                      </div>
                    </div>
                    <div style={styles.earningAmount}>
                      {formatIndianCurrency(earning.amount || earning.earnings)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    );
  };

  // Profile Page with improved alignment
  const renderProfile = () => (
    <div style={styles.mainContent}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.greeting}>My Profile</h1>
          <p style={styles.subtitle}>Manage your account information</p>
        </div>
        <div style={styles.headerActions}>
          {!isEditingProfile && (
            <button
              style={styles.primaryButton}
              onClick={handleProfileEdit}
            >
              ✏️ Edit Profile
            </button>
          )}
          <button
            style={styles.iconButton}
            onClick={() => setShowChatbot(true)}
          >
            💬
          </button>
          <button
            style={styles.notificationButton}
            onClick={toggleNotifications}
          >
            🔔
            {getUnreadCount() > 0 && (
              <span style={styles.notificationBadge}>{getUnreadCount()}</span>
            )}
          </button>
        </div>
      </div>

      <div style={styles.profileContainer}>
        <div style={styles.profileCard}>
          <div style={styles.profileHeader}>
            <div style={styles.profileAvatar}>
              <span style={styles.avatarIcon}>🚚</span>
            </div>
            <div style={styles.profileUserInfo}>
              <h2 style={styles.profileName}>
                {isEditingProfile ? (
                  <input
                    type="text"
                    value={profileData.fullName}
                    onChange={(e) => handleProfileChange('fullName', e.target.value)}
                    style={styles.editInput}
                    placeholder="Enter full name"
                  />
                ) : (
                  profileData.fullName
                )}
              </h2>
              <div style={styles.agentId}>
                <strong>Agent ID:</strong> {profileData.agentId}
              </div>
              <div style={styles.profileStatus}>
                <div style={styles.onlineStatusProfile}>
                  <span style={{
                    ...styles.statusDot,
                    backgroundColor: isOnline ? '#10B981' : '#6B7280'
                  }}></span>
                  <span style={styles.statusText}>
                    {isOnline ? 'Online' : 'Offline'}
                  </span>
                </div>
                <button
                  style={styles.statusToggle}
                  onClick={toggleOnlineStatus}
                >
                  {isOnline ? 'Go Offline' : 'Go Online'}
                </button>
              </div>
            </div>
          </div>

          <div style={styles.profileDetails}>
            <div style={styles.detailGrid}>
              <div style={styles.detailItem}>
                <strong style={styles.detailLabel}>Email:</strong>
                {isEditingProfile ? (
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => handleProfileChange('email', e.target.value)}
                    style={styles.editInput}
                    placeholder="Enter email address"
                  />
                ) : (
                  <span style={styles.detailValue}>{profileData.email}</span>
                )}
              </div>
              <div style={styles.detailItem}>
                <strong style={styles.detailLabel}>Phone:</strong>
                {isEditingProfile ? (
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => handleProfileChange('phone', e.target.value)}
                    style={styles.editInput}
                    placeholder="+91 XXXXX XXXXX"
                  />
                ) : (
                  <span style={styles.detailValue}>{profileData.phone}</span>
                )}
              </div>
              <div style={styles.detailItem}>
                <strong style={styles.detailLabel}>Current Location:</strong>
                {isEditingProfile ? (
                  <input
                    type="text"
                    value={profileData.currentLocation}
                    onChange={(e) => handleProfileChange('currentLocation', e.target.value)}
                    style={styles.editInput}
                    placeholder="Enter your current location"
                  />
                ) : (
                  <span style={styles.detailValue}>{profileData.currentLocation}</span>
                )}
              </div>
              <div style={styles.detailItem}>
                <strong style={styles.detailLabel}>Vehicle Type:</strong>
                {isEditingProfile ? (
                  <select
                    value={profileData.vehicleType}
                    onChange={(e) => handleProfileChange('vehicleType', e.target.value)}
                    style={styles.editInput}
                  >
                    <option value="Motorcycle">Motorcycle</option>
                    <option value="Scooter">Scooter</option>
                    <option value="Bicycle">Bicycle</option>
                    <option value="Car">Car</option>
                  </select>
                ) : (
                  <span style={styles.detailValue}>{profileData.vehicleType}</span>
                )}
              </div>
              <div style={styles.detailItem}>
                <strong style={styles.detailLabel}>Vehicle Number:</strong>
                {isEditingProfile ? (
                  <input
                    type="text"
                    value={profileData.vehicleNumber}
                    onChange={(e) => handleProfileChange('vehicleNumber', e.target.value)}
                    style={styles.editInput}
                    placeholder="Enter vehicle number"
                  />
                ) : (
                  <span style={styles.detailValue}>{profileData.vehicleNumber}</span>
                )}
              </div>
              <div style={styles.detailItem}>
                <strong style={styles.detailLabel}>Joined Date:</strong>
                <span style={styles.detailValue}>{profileData.joinedDate}</span>
              </div>
              <div style={styles.detailItem}>
                <strong style={styles.detailLabel}>Total Deliveries:</strong>
                <span style={styles.detailValue}>{profileData.totalDeliveries}</span>
              </div>
              <div style={styles.detailItem}>
                <strong style={styles.detailLabel}>Rating:</strong>
                <span style={styles.detailValue}>{profileData.rating}/5</span>
              </div>
              <div style={styles.detailItem}>
                <strong style={styles.detailLabel}>Completion Rate:</strong>
                <span style={styles.detailValue}>{profileData.completionRate}</span>
              </div>
              <div style={styles.detailItem}>
                <strong style={styles.detailLabel}>Average Response Time:</strong>
                <span style={styles.detailValue}>{profileData.responseTime}</span>
              </div>
              <div style={styles.detailItem}>
                <strong style={styles.detailLabel}>Average Rating:</strong>
                <span style={styles.detailValue}>{profileData.averageRating}/5</span>
              </div>
            </div>

            {isEditingProfile && (
              <div style={styles.editActions}>
                <button
                  style={styles.successButton}
                  onClick={handleProfileSave}
                >
                  💾 Save Changes
                </button>
                <button
                  style={styles.secondaryButton}
                  onClick={handleProfileCancel}
                >
                  ❌ Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderMainContent = () => {
    switch (activePage) {
      case 'dashboard':
        return renderDashboard();
      case 'tasks':
        return renderTasks();
      case 'earnings':
        return renderEarnings();
      case 'performance':
        return renderPerformance();
      case 'profile':
        return renderProfile();
      default:
        return renderDashboard();
    }
  };

  return (
    <div style={styles.container}>
      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* Sidebar Navigation */}
      <div style={styles.sidebar}>
        <div style={styles.sidebarHeader}>
          <h1 style={styles.logo}>QUICKMED</h1>
          <p style={styles.agentTitle}>Delivery Portal</p>
        </div>

        <nav style={styles.navigation}>
          {navigationItems.map(item => (
            <button
              key={item.id}
              style={{
                ...styles.navButton,
                ...(activePage === item.id ? styles.navButtonActive : {})
              }}
              onClick={() => setActivePage(item.id)}
            >
              <span style={styles.navIcon}>{item.icon}</span>
              <span style={styles.navLabel}>{item.label}</span>
            </button>
          ))}
        </nav>

        <div style={styles.sidebarFooter}>
          <div style={styles.profileSection}>
            <div style={styles.profileInfo}>
              <div style={styles.userAvatar}>🚚</div>
              <div style={styles.userDetails}>
                <p style={styles.userName}>{getDisplayName()}</p>
                <p style={styles.userId}>ID: {profileData.agentId}</p>
                <div style={styles.onlineStatusSmall}>
                  <span style={{
                    ...styles.statusDot,
                    backgroundColor: isOnline ? '#10B981' : '#6B7280'
                  }}></span>
                  <span>{isOnline ? 'Online' : 'Offline'}</span>
                </div>
              </div>
            </div>
            <button
              style={styles.profileButton}
              onClick={() => setActivePage('profile')}
            >
              👤 View Profile
            </button>
          </div>

          <button style={styles.logoutButton} onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      <div style={styles.content}>
        {renderMainContent()}
      </div>

      {/* Notifications Panel */}
      {showNotifications && (
        <div ref={notificationsRef} style={styles.notificationsPanel}>
          <div style={styles.notificationsHeader}>
            <h3>Notifications</h3>
            <button
              style={styles.closeButton}
              onClick={toggleNotifications}
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
              onClick={handleViewAllNotifications}
            >
              View All Notifications
            </button>
          </div>
        </div>
      )}

      {/* Chatbot */}
      {showChatbot && (
        <div ref={chatbotRef} style={styles.chatbotContainer}>
          <div style={styles.chatbotHeader}>
            <div style={styles.chatbotTitle}>
              <span style={styles.chatbotIcon}>💬</span>
              QuickMed Support
            </div>
            <button
              style={styles.closeButton}
              onClick={() => setShowChatbot(false)}
            >
              ✕
            </button>
          </div>
          <div style={styles.chatMessages}>
            {chatMessages.length === 0 ? (
              <div style={styles.welcomeMessage}>
                <p>Hello! How can I help you with your delivery today?</p>
              </div>
            ) : (
              chatMessages.map(message => (
                <div
                  key={message.id}
                  style={{
                    ...styles.chatMessage,
                    ...(message.sender === 'user' ? styles.userMessage : styles.botMessage)
                  }}
                >
                  <div style={{
                    ...styles.messageContent,
                    ...(message.sender === 'user' ? styles.userMessageContent : styles.botMessageContent)
                  }}>
                    {message.text}
                  </div>
                  <div style={styles.messageTime}>
                    {message.time}
                  </div>
                </div>
              ))
            )}
          </div>
          <div style={styles.chatInputContainer}>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              style={styles.chatInput}
            />
            <button
              style={styles.sendButton}
              onClick={sendMessage}
            >
              Send
            </button>
          </div>
        </div>
      )}

      {/* Task Details Modal */}
      {selectedTask && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <div style={styles.modalHeader}>
              <h2>Order Details - {selectedTask.orderId}</h2>
              <button style={styles.closeButton} onClick={() => setSelectedTask(null)}>
                ✕
              </button>
            </div>
            <div style={styles.modalContent}>
              <div style={styles.customerInfoModal}>
                <h3 style={styles.modalCustomerName}>{selectedTask.customerName}</h3>
                <p style={styles.modalCustomerPhone}>{selectedTask.customerPhone}</p>
                <div style={styles.taskStatusModal}>
                  <span style={{
                    ...styles.statusBadge,
                    backgroundColor: getStatusColor(selectedTask.status)
                  }}>
                    {selectedTask.status}
                  </span>
                  <span style={{
                    ...styles.priorityBadge,
                    color: getPriorityColor(selectedTask.priority)
                  }}>
                    {selectedTask.priority} Priority
                  </span>
                </div>
              </div>

              <div style={styles.modalDetails}>
                <div style={styles.modalSection}>
                  <strong>Pickup Location:</strong>
                  <p style={styles.modalLocation}>{selectedTask.pickupLocation}</p>
                  <small style={styles.distanceText}>{selectedTask.distance} away</small>
                </div>
                <div style={styles.modalSection}>
                  <strong>Delivery Location:</strong>
                  <p style={styles.modalLocation}>{selectedTask.deliveryLocation}</p>
                </div>
                <div style={styles.modalSection}>
                  <strong>Items to Deliver:</strong>
                  <div style={styles.modalItems}>
                    {selectedTask.items.map((item, index) => (
                      <span key={index} style={styles.modalItemTag}>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                {selectedTask.specialInstructions && (
                  <div style={styles.modalSection}>
                    <strong>Special Instructions:</strong>
                    <p style={styles.specialInstructions}>{selectedTask.specialInstructions}</p>
                  </div>
                )}
                <div style={styles.modalSection}>
                  <strong>Delivery Information:</strong>
                  <div style={styles.deliveryInfo}>
                    <div style={styles.infoRow}>
                      <span style={styles.infoLabel}>Estimated Time:</span>
                      <span style={styles.infoValue}>{selectedTask.estimatedTime}</span>
                    </div>
                    <div style={styles.infoRow}>
                      <span style={styles.infoLabel}>Delivery Fee:</span>
                      <span style={styles.infoValue}>{formatIndianCurrency(selectedTask.amount)}</span>
                    </div>
                    <div style={styles.infoRow}>
                      <span style={styles.infoLabel}>Assigned Time:</span>
                      <span style={styles.infoValue}>{selectedTask.assignedTime}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div style={styles.modalActions}>
                <button
                  style={styles.primaryButton}
                  onClick={() => getDirections(selectedTask)}
                >
                  🗺️ Get Directions
                </button>
                <button
                  style={styles.secondaryButton}
                  onClick={() => contactCustomer(selectedTask)}
                >
                  📞 Contact Customer
                </button>
                {selectedTask.status === 'assigned' && (
                  <button
                    style={styles.successButton}
                    onClick={() => startDelivery(selectedTask.id)}
                  >
                    🚚 Start Delivery
                  </button>
                )}
                {selectedTask.status === 'in-progress' && (
                  <button
                    style={styles.successButton}
                    onClick={() => markDelivered(selectedTask.id)}
                  >
                    ✅ Mark Delivered
                  </button>
                )}
              </div>

              <div style={styles.realTimeInfo}>
                <div style={styles.realTimeHeader}>
                  <span style={styles.realTimeIcon}>🔄</span>
                  <strong>Real-time Updates</strong>
                </div>
                <div style={styles.realTimeContent}>
                  <p>• Your current location: <strong>{deliveryData.liveMap.currentLocation}</strong></p>
                  <p>• Traffic conditions: <strong>{deliveryData.liveMap.trafficConditions}</strong></p>
                  <p>• Estimated travel time: <strong>{deliveryData.liveMap.estimatedTravelTime}</strong></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Add CSS animation for slideIn effect
if (typeof document !== 'undefined' && !document.querySelector('style[data-slide-animation]')) {
  const styleElement = document.createElement('style');
  styleElement.setAttribute('data-slide-animation', 'true');
  styleElement.textContent = `
    @keyframes slideIn {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    @keyframes pulse {
      0% { opacity: 1; }
      50% { opacity: 0.5; }
      100% { opacity: 1; }
    }
  `;
  document.head.appendChild(styleElement);
}

// Updated styles with improved profile alignment and new dropdown styles
const styles = {
  container: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#f8fafc',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
  },
  sidebar: {
    width: '280px',
    backgroundColor: '#7C2A62',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    position: 'fixed',
    height: '100vh',
    left: 0,
    top: 0
  },
  sidebarHeader: {
    padding: '30px 24px 20px',
    borderBottom: '1px solid rgba(255,255,255,0.1)'
  },
  logo: {
    fontSize: '24px',
    fontWeight: '700',
    margin: '0 0 4px 0',
    color: 'white'
  },
  agentTitle: {
    fontSize: '14px',
    opacity: 0.8,
    margin: 0
  },
  navigation: {
    flex: 1,
    padding: '20px 0'
  },
  navButton: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    padding: '16px 24px',
    backgroundColor: 'transparent',
    border: 'none',
    color: 'white',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    opacity: 0.8
  },
  navButtonActive: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    opacity: 1,
    borderRight: '4px solid #F7D9EB'
  },
  navIcon: {
    fontSize: '20px',
    marginRight: '12px',
    width: '24px',
    textAlign: 'center'
  },
  navLabel: {
    fontWeight: '500'
  },
  sidebarFooter: {
    padding: '20px 24px',
    borderTop: '1px solid rgba(255,255,255,0.1)'
  },
  profileSection: {
    marginBottom: '20px',
    padding: '16px',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: '8px'
  },
  profileInfo: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '12px'
  },
  userAvatar: {
    fontSize: '32px',
    marginRight: '12px'
  },
  userDetails: {
    flex: 1
  },
  userName: {
    margin: '0 0 4px 0',
    fontWeight: '600',
    fontSize: '14px'
  },
  userId: {
    margin: '0 0 4px 0',
    fontSize: '12px',
    opacity: 0.8
  },
  onlineStatusSmall: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '12px',
    opacity: 0.8,
    marginTop: '4px'
  },
  profileButton: {
    width: '100%',
    padding: '10px',
    backgroundColor: 'rgba(255,255,255,0.2)',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '500',
    fontSize: '14px',
    transition: 'background-color 0.3s ease'
  },
  logoutButton: {
    width: '100%',
    padding: '12px',
    backgroundColor: 'rgba(255,255,255,0.1)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '500',
    transition: 'background-color 0.3s ease'
  },
  content: {
    flex: 1,
    marginLeft: '280px',
    padding: '0'
  },
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
  headerActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  actionButtons: {
    display: 'flex',
    gap: '8px'
  },
  onlineStatus: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: 'white',
    padding: '8px 12px',
    borderRadius: '8px',
    border: '1px solid #e5e7eb'
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
    color: '#374151'
  },
  statusToggle: {
    backgroundColor: 'transparent',
    border: '1px solid #d1d5db',
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '12px',
    cursor: 'pointer',
    color: '#374151'
  },
  iconButton: {
    backgroundColor: 'white',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    padding: '8px 12px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'all 0.3s ease'
  },
  notificationButton: {
    backgroundColor: 'white',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    padding: '8px 12px',
    cursor: 'pointer',
    fontSize: '16px',
    position: 'relative',
    transition: 'all 0.3s ease'
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
    margin: '0 0 8px 0'
  },
  subtitle: {
    fontSize: '16px',
    color: '#6b7280',
    margin: 0
  },
  dateDisplay: {
    fontSize: '14px',
    color: '#6b7280',
    fontWeight: '500'
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '20px',
    marginBottom: '30px'
  },
  statCard: {
    backgroundColor: 'white',
    padding: '24px',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    display: 'flex',
    alignItems: 'center',
    border: '1px solid #e5e7eb'
  },
  statIcon: {
    fontSize: '32px',
    marginRight: '16px',
    width: '60px',
    height: '60px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '12px'
  },
  statContent: {
    flex: 1
  },
  statNumber: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#1f2937',
    margin: '0 0 4px 0'
  },
  statLabel: {
    fontSize: '14px',
    color: '#6b7280',
    margin: 0
  },
  contentGrid: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: '30px'
  },
  section: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    border: '1px solid #e5e7eb'
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
    marginBottom: '20px'
  },
  sectionTitle: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#1f2937',
    margin: 0
  },
  viewAll: {
    fontSize: '14px',
    color: '#7C2A62',
    fontWeight: '500',
    cursor: 'pointer'
  },
  tasksList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  taskCard: {
    padding: '20px',
    border: '1px solid #e5e7eb',
    borderRadius: '10px',
    transition: 'all 0.3s ease'
  },
  taskHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '12px'
  },
  taskInfo: {
    flex: 1
  },
  orderId: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#1f2937',
    margin: '0 0 4px 0'
  },
  customerName: {
    fontSize: '14px',
    color: '#6b7280',
    margin: 0
  },
  taskStatus: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: '4px'
  },
  statusBadge: {
    color: 'white',
    padding: '4px 8px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: '500'
  },
  priorityBadge: {
    fontSize: '12px',
    fontWeight: '500'
  },
  taskDetails: {
    marginBottom: '12px'
  },
  locationRow: {
    display: 'flex',
    alignItems: 'flex-start',
    marginBottom: '8px'
  },
  locationLabel: {
    fontSize: '12px',
    color: '#6b7280',
    fontWeight: '500',
    minWidth: '60px'
  },
  locationText: {
    fontSize: '14px',
    color: '#1f2937',
    flex: 1
  },
  taskMeta: {
    display: 'flex',
    gap: '12px',
    marginBottom: '16px'
  },
  metaItem: {
    fontSize: '12px',
    color: '#6b7280',
    fontWeight: '500'
  },
  taskActions: {
    display: 'flex',
    gap: '8px'
  },
  primaryButton: {
    backgroundColor: '#7C2A62',
    color: 'white',
    border: 'none',
    padding: '10px 16px',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '6px'
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    color: '#7C2A62',
    border: '1px solid #7C2A62',
    padding: '9px 15px',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '6px'
  },
  successButton: {
    backgroundColor: '#10B981',
    color: 'white',
    border: 'none',
    padding: '10px 16px',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '6px'
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
  customerInfo: {
    fontSize: '14px',
    color: '#6b7280',
    margin: '4px 0 0 0'
  },
  deliveryDate: {
    fontSize: '12px',
    color: '#6b7280',
    margin: '2px 0 0 0'
  },
  taskDetails: {
    marginBottom: '12px'
  },
  locationRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '20px',
    marginBottom: '12px'
  },
  locationColumn: {
    display: 'flex',
    flexDirection: 'column'
  },
  detailLabel: {
    fontSize: '14px',
    color: '#6b7280',
    marginBottom: '4px'
  },
  detailText: {
    fontSize: '14px',
    color: '#1f2937',
    margin: 0
  },
  detailSection: {
    marginBottom: '12px'
  },
  itemsList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '6px',
    marginTop: '4px'
  },
  itemTag: {
    backgroundColor: '#F7D9EB',
    color: '#7C2A62',
    padding: '4px 8px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: '500'
  },
  metaInfo: {
    display: 'flex',
    gap: '16px',
    alignItems: 'center'
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
  amountBadge: {
    backgroundColor: '#F7D9EB',
    color: '#7C2A62',
    padding: '6px 12px',
    borderRadius: '12px',
    fontSize: '14px',
    fontWeight: '600',
    marginTop: '8px'
  },
  feedbackText: {
    fontSize: '14px',
    color: '#1f2937',
    fontStyle: 'italic',
    margin: '4px 0 0 0',
    backgroundColor: '#f8fafc',
    padding: '8px',
    borderRadius: '6px',
    borderLeft: '3px solid #10B981'
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
  },
  earningFilters: {
    display: 'flex',
    gap: '8px',
    backgroundColor: 'white',
    padding: '4px',
    borderRadius: '8px',
    border: '1px solid #e5e7eb',
    flexWrap: 'wrap',
    alignItems: 'center'
  },
  earningFilter: {
    padding: '8px 16px',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '6px'
  },
  earningFilterActive: {
    backgroundColor: '#7C2A62',
    color: 'white'
  },
  monthDropdown: {
    position: 'relative'
  },
  monthSelect: {
    padding: '8px 12px',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    fontSize: '14px',
    backgroundColor: 'white',
    cursor: 'pointer',
    outline: 'none',
    minWidth: '150px'
  },
  earningsSummary: {
    backgroundColor: 'white',
    padding: '24px',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    marginBottom: '24px'
  },
  earningStats: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '20px'
  },
  earningStat: {
    textAlign: 'center',
    padding: '16px',
    backgroundColor: '#f8fafc',
    borderRadius: '8px'
  },
  earningAmount: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#7C2A62',
    margin: '0 0 8px 0'
  },
  earningLabel: {
    fontSize: '14px',
    color: '#6b7280',
    margin: '0 0 12px 0',
    fontWeight: '500'
  },
  metricDetail: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    paddingTop: '12px',
    borderTop: '1px solid #e5e7eb'
  },
  metricValue: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#1f2937'
  },
  metricLabel: {
    fontSize: '12px',
    color: '#6b7280'
  },
  chartContainer: {
    backgroundColor: 'white',
    padding: '24px',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    marginBottom: '24px'
  },
  chartHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px'
  },
  chartLegend: {
    display: 'flex',
    gap: '16px'
  },
  legendItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '12px',
    color: '#6b7280'
  },
  legendColor: {
    width: '12px',
    height: '12px',
    borderRadius: '2px'
  },
  chartPlaceholder: {
    height: '200px',
    backgroundColor: '#f8fafc',
    borderRadius: '8px',
    padding: '20px'
  },
  chartContent: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  chartBars: {
    display: 'flex',
    alignItems: 'flex-end',
    gap: '8px',
    height: '120px',
    marginBottom: '20px'
  },
  chartBarContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1
  },
  chartBar: {
    width: '100%',
    minHeight: '4px',
    borderRadius: '4px 4px 0 0',
    transition: 'all 0.3s ease',
    cursor: 'pointer'
  },
  chartLabel: {
    fontSize: '10px',
    color: '#6b7280',
    marginTop: '8px',
    textAlign: 'center'
  },
  chartStats: {
    display: 'flex',
    justifyContent: 'space-around',
    paddingTop: '16px',
    borderTop: '1px solid #e5e7eb'
  },
  chartStat: {
    textAlign: 'center'
  },
  chartStatValue: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#1f2937',
    display: 'block'
  },
  chartStatLabel: {
    fontSize: '12px',
    color: '#6b7280',
    marginTop: '4px'
  },
  earningsHistory: {
    backgroundColor: 'white',
    padding: '24px',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    marginBottom: '24px'
  },
  earningItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: '16px',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    marginBottom: '12px',
    transition: 'all 0.3s ease'
  },
  earningDate: {
    flex: 1
  },
  earningDateText: {
    fontSize: '14px',
    color: '#1f2937',
    marginBottom: '8px',
    display: 'block'
  },
  earningMeta: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap'
  },
  metaBadge: {
    fontSize: '11px',
    padding: '4px 8px',
    backgroundColor: '#f3f4f6',
    color: '#6b7280',
    borderRadius: '12px',
    fontWeight: '500'
  },
  performanceGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '20px',
    marginBottom: '30px'
  },
  performanceCard: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    border: '1px solid #e5e7eb'
  },
  performanceIcon: {
    fontSize: '32px',
    width: '60px',
    height: '60px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F7D9EB',
    borderRadius: '12px'
  },
  performanceContent: {
    flex: 1
  },
  performanceValue: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#1f2937',
    margin: '0 0 4px 0'
  },
  performanceLabel: {
    fontSize: '14px',
    color: '#6b7280',
    margin: 0,
    textTransform: 'capitalize'
  },
  performanceChart: {
    display: 'flex',
    alignItems: 'flex-end',
    gap: '20px',
    height: '200px',
    padding: '20px',
    backgroundColor: '#f8fafc',
    borderRadius: '8px',
    marginBottom: '20px'
  },
  weekBar: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1
  },
  barContainer: {
    display: 'flex',
    gap: '4px',
    alignItems: 'flex-end',
    height: '120px',
    marginBottom: '8px'
  },
  deliveryBar: {
    width: '20px',
    backgroundColor: '#7C2A62',
    borderRadius: '4px 4px 0 0',
    minHeight: '4px'
  },
  ratingBar: {
    width: '20px',
    backgroundColor: '#10B981',
    borderRadius: '4px 4px 0 0',
    minHeight: '4px'
  },
  weekLabel: {
    fontSize: '12px',
    color: '#6b7280',
    fontWeight: '500'
  },
  performanceFilters: {
    display: 'flex',
    gap: '8px',
    backgroundColor: 'white',
    padding: '4px',
    borderRadius: '8px',
    border: '1px solid #e5e7eb'
  },
  performanceFilterButton: {
    padding: '8px 16px',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.3s ease'
  },
  performanceFilterButtonActive: {
    backgroundColor: '#7C2A62',
    color: 'white'
  },
  performanceInsights: {
    backgroundColor: 'white',
    padding: '24px',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    marginTop: '24px'
  },
  insightsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '20px',
    marginTop: '16px'
  },
  insightCard: {
    backgroundColor: '#f8fafc',
    padding: '20px',
    borderRadius: '8px',
    border: '1px solid #e5e7eb',
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px'
  },
  insightIcon: {
    fontSize: '24px',
    marginTop: '4px'
  },
  insightContent: {
    flex: 1
  },
  insightTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#1f2937',
    margin: '0 0 8px 0'
  },
  insightText: {
    fontSize: '14px',
    color: '#6b7280',
    margin: 0,
    lineHeight: '1.5'
  },
  profileContainer: {
    maxWidth: '800px'
  },
  profileCard: {
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    border: '1px solid #e5e7eb',
    overflow: 'hidden'
  },
  profileHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '30px',
    borderBottom: '1px solid #e5e7eb',
    backgroundColor: '#f8fafc'
  },
  profileAvatar: {
    marginRight: '20px'
  },
  avatarIcon: {
    fontSize: '64px',
    display: 'block'
  },
  profileUserInfo: {
    flex: 1
  },
  profileName: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#1f2937',
    margin: '0 0 8px 0'
  },
  agentId: {
    fontSize: '14px',
    color: '#6b7280',
    margin: '0 0 12px 0'
  },
  profileStatus: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  onlineStatusProfile: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  profileDetails: {
    padding: '30px'
  },
  detailGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '20px',
    marginBottom: '24px'
  },
  detailItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    padding: '12px 0'
  },
  detailLabel: {
    fontSize: '14px',
    color: '#6b7280',
    fontWeight: '500'
  },
  detailValue: {
    fontSize: '16px',
    color: '#1f2937',
    fontWeight: '500'
  },
  editInput: {
    padding: '8px 12px',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    fontSize: '16px',
    outline: 'none',
    width: '100%',
    backgroundColor: 'white'
  },
  editActions: {
    display: 'flex',
    gap: '12px',
    justifyContent: 'flex-end',
    paddingTop: '20px',
    borderTop: '1px solid #e5e7eb'
  },
  liveRouteContainer: {
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    border: '1px solid #e5e7eb',
    overflow: 'hidden',
    marginBottom: '20px'
  },
  routeHeader: {
    padding: '16px 20px',
    borderBottom: '1px solid #e5e7eb',
    backgroundColor: '#f8fafc'
  },
  routeTitle: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px'
  },
  mapTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#1f2937',
    margin: 0
  },
  liveBadge: {
    backgroundColor: '#EF4444',
    color: 'white',
    padding: '4px 8px',
    borderRadius: '12px',
    fontSize: '10px',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    gap: '4px'
  },
  livePulse: {
    width: '6px',
    height: '6px',
    backgroundColor: 'white',
    borderRadius: '50%',
    animation: 'pulse 1.5s infinite'
  },
  routeStats: {
    display: 'flex',
    gap: '16px',
    fontSize: '12px',
    color: '#6b7280'
  },
  routeStat: {
    fontWeight: '500'
  },
  routeVisualization: {
    padding: '20px'
  },
  routePath: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  routeStart: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  routeEnd: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  locationPin: {
    fontSize: '20px',
    flexShrink: 0
  },
  locationInfo: {
    flex: 1
  },
  routeLocationLabel: {
    fontSize: '12px',
    color: '#6b7280',
    fontWeight: '500',
    marginBottom: '2px'
  },
  routeLocationText: {
    fontSize: '14px',
    color: '#1f2937',
    fontWeight: '500'
  },
  progressBar: {
    height: '4px',
    backgroundColor: '#e5e7eb',
    borderRadius: '2px',
    position: 'relative',
    margin: '8px 0 8px 32px'
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#10B981',
    borderRadius: '2px',
    transition: 'width 0.5s ease',
    position: 'relative'
  },
  progressMarker: {
    position: 'absolute',
    right: '0',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '12px',
    height: '12px',
    backgroundColor: '#10B981',
    borderRadius: '50%',
    border: '2px solid white',
    boxShadow: '0 0 0 2px #10B981'
  },
  trafficInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '12px 20px',
    backgroundColor: '#f8fafc',
    borderTop: '1px solid #e5e7eb'
  },
  trafficStatus: {
    display: 'flex',
    gap: '8px',
    fontSize: '12px'
  },
  trafficLabel: {
    color: '#6b7280'
  },
  trafficValue: {
    fontWeight: '600'
  },
  activeDeliveries: {
    display: 'flex',
    gap: '8px',
    fontSize: '12px'
  },
  deliveryLabel: {
    color: '#6b7280'
  },
  deliveryValue: {
    fontWeight: '600',
    color: '#7C2A62'
  },
  realTimeUpdates: {
    padding: '8px 20px',
    backgroundColor: '#f0f9ff',
    borderTop: '1px solid #e0f2fe'
  },
  updateIndicator: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '11px',
    color: '#0369a1',
    fontWeight: '500'
  },
  updateDot: {
    width: '6px',
    height: '6px',
    backgroundColor: '#0369a1',
    borderRadius: '50%',
    animation: 'pulse 1.5s infinite'
  },
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
    padding: '16px 20px',
    borderBottom: '1px solid #e5e7eb',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
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
    textAlign: 'center'
  },
  viewAllButton: {
    backgroundColor: '#7C2A62',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    width: '100%'
  },
  chatbotContainer: {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    width: '350px',
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
    zIndex: 1001,
    display: 'flex',
    flexDirection: 'column',
    maxHeight: '500px'
  },
  chatbotHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 20px',
    borderBottom: '1px solid #e5e7eb',
    backgroundColor: '#7C2A62',
    color: 'white',
    borderRadius: '12px 12px 0 0'
  },
  chatbotTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontWeight: '600'
  },
  chatbotIcon: {
    fontSize: '16px'
  },
  closeButton: {
    backgroundColor: 'transparent',
    border: 'none',
    fontSize: '20px',
    cursor: 'pointer',
    color: 'inherit'
  },
  chatMessages: {
    flex: 1,
    padding: '16px',
    overflowY: 'auto',
    maxHeight: '300px',
    backgroundColor: '#f8fafc'
  },
  welcomeMessage: {
    textAlign: 'center',
    color: '#6b7280',
    fontSize: '14px',
    padding: '20px'
  },
  chatMessage: {
    marginBottom: '12px',
    maxWidth: '80%'
  },
  userMessage: {
    marginLeft: 'auto',
    textAlign: 'right'
  },
  botMessage: {
    marginRight: 'auto',
    textAlign: 'left'
  },
  messageContent: {
    padding: '10px 14px',
    borderRadius: '18px',
    fontSize: '14px',
    lineHeight: '1.4',
    display: 'inline-block'
  },
  userMessageContent: {
    backgroundColor: '#7C2A62',
    color: 'white',
    borderBottomRightRadius: '4px'
  },
  botMessageContent: {
    backgroundColor: 'white',
    color: '#1f2937',
    border: '1px solid #e5e7eb',
    borderBottomLeftRadius: '4px'
  },
  messageTime: {
    fontSize: '11px',
    color: '#9ca3af',
    marginTop: '4px'
  },
  chatInputContainer: {
    display: 'flex',
    padding: '16px',
    borderTop: '1px solid #e5e7eb',
    backgroundColor: 'white'
  },
  chatInput: {
    flex: 1,
    padding: '10px 12px',
    border: '1px solid #d1d5db',
    borderRadius: '20px',
    fontSize: '14px',
    outline: 'none'
  },
  sendButton: {
    backgroundColor: '#7C2A62',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '20px',
    marginLeft: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500'
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '0',
    width: '90%',
    maxWidth: '500px',
    maxHeight: '90vh',
    overflow: 'auto'
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '24px',
    borderBottom: '1px solid #e5e7eb'
  },
  modalContent: {
    padding: '24px'
  },
  customerInfoModal: {
    marginBottom: '20px'
  },
  modalCustomerName: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#1f2937',
    margin: '0 0 4px 0'
  },
  modalCustomerPhone: {
    fontSize: '14px',
    color: '#6b7280',
    margin: 0
  },
  modalDetails: {
    marginBottom: '24px'
  },
  modalSection: {
    marginBottom: '16px'
  },
  modalItems: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '6px',
    marginTop: '8px'
  },
  modalItemTag: {
    backgroundColor: '#F7D9EB',
    color: '#7C2A62',
    padding: '4px 8px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: '500'
  },
  deliveryInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    marginTop: '8px'
  },
  modalActions: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap'
  },
  taskStatusModal: {
    display: 'flex',
    gap: '8px',
    marginTop: '8px'
  },
  modalLocation: {
    margin: '4px 0',
    fontSize: '14px',
    color: '#1f2937',
    lineHeight: '1.4'
  },
  distanceText: {
    color: '#6b7280',
    fontSize: '12px',
    fontStyle: 'italic'
  },
  specialInstructions: {
    backgroundColor: '#FFF7ED',
    padding: '8px 12px',
    borderRadius: '6px',
    borderLeft: '3px solid #F59E0B',
    margin: '4px 0',
    fontSize: '14px',
    color: '#92400E'
  },
  infoRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '4px 0'
  },
  infoLabel: {
    fontSize: '14px',
    color: '#6b7280',
    fontWeight: '500'
  },
  infoValue: {
    fontSize: '14px',
    color: '#1f2937',
    fontWeight: '600'
  },
  realTimeInfo: {
    backgroundColor: '#f0f9ff',
    padding: '16px',
    borderRadius: '8px',
    border: '1px solid #e0f2fe',
    marginTop: '20px'
  },
  realTimeHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '8px',
    color: '#0369a1',
    fontSize: '14px',
    fontWeight: '600'
  },
  realTimeIcon: {
    fontSize: '16px'
  },
  realTimeContent: {
    fontSize: '13px',
    color: '#1e40af',
    lineHeight: '1.5'
  },
  // Calendar Styles
  calendarViewContainer: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    marginBottom: '24px'
  },
  calendarContainer: {
    maxWidth: '100%'
  },
  calendarHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    padding: '0 10px'
  },
  calendarNavButton: {
    backgroundColor: '#7C2A62',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    width: '36px',
    height: '36px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    fontSize: '18px',
    fontWeight: 'bold'
  },
  calendarTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#1f2937',
    margin: 0
  },
  calendarGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gap: '8px',
    marginBottom: '20px'
  },
  calendarDayHeader: {
    textAlign: 'center',
    fontSize: '12px',
    fontWeight: '600',
    color: '#6b7280',
    padding: '8px 4px',
    textTransform: 'uppercase'
  },
  calendarDay: {
    aspectRatio: '1',
    padding: '8px',
    borderRadius: '8px',
    cursor: 'pointer',
    border: '2px solid transparent',
    backgroundColor: '#f8fafc',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  calendarDayActive: {
    backgroundColor: 'white',
    border: '2px solid #e5e7eb'
  },
  calendarDayToday: {
    borderColor: '#7C2A62',
    backgroundColor: '#F7D9EB'
  },
  calendarDaySelected: {
    borderColor: '#7C2A62',
    backgroundColor: '#7C2A62',
    color: 'white'
  },
  calendarDateNumber: {
    fontSize: '14px',
    fontWeight: '600',
    marginBottom: '4px'
  },
  calendarEarnings: {
    textAlign: 'center',
    fontSize: '10px',
    lineHeight: '1.2'
  },
  calendarAmount: {
    fontWeight: '600',
    fontSize: '9px'
  },
  calendarDeliveries: {
    fontSize: '8px',
    opacity: 0.8
  },
  selectedDateInfo: {
    backgroundColor: '#f8fafc',
    padding: '20px',
    borderRadius: '8px',
    border: '1px solid #e5e7eb'
  },
  selectedDateTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#1f2937',
    margin: '0 0 16px 0',
    textAlign: 'center'
  },
  selectedDateStats: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '12px'
  },
  selectedDateStat: {
    textAlign: 'center',
    padding: '12px 8px',
    backgroundColor: 'white',
    borderRadius: '6px',
    border: '1px solid #e5e7eb'
  },
  selectedDateStatValue: {
    display: 'block',
    fontSize: '14px',
    fontWeight: '700',
    color: '#7C2A62',
    marginBottom: '4px'
  },
  selectedDateStatLabel: {
    display: 'block',
    fontSize: '11px',
    color: '#6b7280',
    fontWeight: '500'
  }
};

export default DeliveryDashboard;