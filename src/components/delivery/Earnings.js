import React, { useState, useEffect } from 'react';

// Custom hook for media queries with inline styles
const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addListener(listener);
    return () => media.removeListener(listener);
  }, [matches, query]);

  return matches;
};

const Earnings = ({ deliveryData }) => {
  const [earningFilter, setEarningFilter] = useState('today');
  const [showAllMonths, setShowAllMonths] = useState(false);
  const [allMonthsData, setAllMonthsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMonthDetails, setSelectedMonthDetails] = useState(null);
  const [showMonthDetails, setShowMonthDetails] = useState(false);

  // Responsive breakpoints using custom hook
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(max-width: 1024px)');

  // Extended months data for "View All" functionality
  const extendedMonthsData = [
    { 
      value: 'january', 
      label: 'January 2025', 
      earnings: 15200, 
      deliveries: 230, 
      cancelled: 5, 
      year: 2025,
      dailyEarnings: [
        { date: '2025-01-15', earnings: 850, deliveries: 12, hours: 8.5 },
        { date: '2025-01-14', earnings: 920, deliveries: 14, hours: 9 },
        { date: '2025-01-13', earnings: 780, deliveries: 11, hours: 7.5 }
      ],
      topZones: [
        { zone: 'Downtown', deliveries: 45, earnings: 2850 },
        { zone: 'Suburbs', deliveries: 38, earnings: 2450 },
        { zone: 'Business District', deliveries: 32, earnings: 2100 }
      ]
    },
    { 
      value: 'december', 
      label: 'December 2024', 
      earnings: 14200, 
      deliveries: 215, 
      cancelled: 8, 
      year: 2024,
      dailyEarnings: [
        { date: '2024-12-20', earnings: 950, deliveries: 15, hours: 9.5 },
        { date: '2024-12-19', earnings: 880, deliveries: 13, hours: 8.5 }
      ],
      topZones: [
        { zone: 'Shopping Mall Area', deliveries: 52, earnings: 3250 },
        { zone: 'Downtown', deliveries: 41, earnings: 2650 }
      ]
    },
    { 
      value: 'november', 
      label: 'November 2024', 
      earnings: 13200, 
      deliveries: 198, 
      cancelled: 12, 
      year: 2024 
    },
    { 
      value: 'october', 
      label: 'October 2024', 
      earnings: 14800, 
      deliveries: 225, 
      cancelled: 6, 
      year: 2024 
    },
    { 
      value: 'september', 
      label: 'September 2024', 
      earnings: 12800, 
      deliveries: 190, 
      cancelled: 10, 
      year: 2024 
    },
    { 
      value: 'august', 
      label: 'August 2024', 
      earnings: 13500, 
      deliveries: 205, 
      cancelled: 7, 
      year: 2024 
    },
    { 
      value: 'july', 
      label: 'July 2024', 
      earnings: 12100, 
      deliveries: 185, 
      cancelled: 9, 
      year: 2024 
    },
    { 
      value: 'june', 
      label: 'June 2024', 
      earnings: 11800, 
      deliveries: 180, 
      cancelled: 11, 
      year: 2024 
    },
    { 
      value: 'may', 
      label: 'May 2024', 
      earnings: 12500, 
      deliveries: 195, 
      cancelled: 8, 
      year: 2024 
    },
    { 
      value: 'april', 
      label: 'April 2024', 
      earnings: 11500, 
      deliveries: 175, 
      cancelled: 12, 
      year: 2024 
    },
    { 
      value: 'march', 
      label: 'March 2024', 
      earnings: 12200, 
      deliveries: 188, 
      cancelled: 7, 
      year: 2024 
    },
    { 
      value: 'february', 
      label: 'February 2024', 
      earnings: 11000, 
      deliveries: 168, 
      cancelled: 15, 
      year: 2024 
    }
  ];

  // Initial months data for display
  const initialMonthsData = extendedMonthsData.slice(0, 6);

  const itemsPerPage = 6;

  // Responsive styles based on screen size
  const responsiveStyles = {
    mainContent: {
      padding: isMobile ? '15px' : isTablet ? '20px' : '30px',
      minHeight: '100vh',
      backgroundColor: '#E0F2F1'
    },
    header: {
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      justifyContent: 'space-between',
      alignItems: isMobile ? 'flex-start' : 'flex-start',
      marginBottom: isMobile ? '20px' : '30px',
      gap: isMobile ? '15px' : '0'
    },
    greeting: {
      fontSize: isMobile ? '22px' : isTablet ? '26px' : '28px',
      fontWeight: '700',
      color: '#124441',
      margin: '0 0 8px 0'
    },
    subtitle: {
      fontSize: isMobile ? '14px' : '16px',
      color: '#4F6F6B',
      margin: 0
    },
    earningFilters: {
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      gap: '8px',
      backgroundColor: 'white',
      padding: '4px',
      borderRadius: '8px',
      border: '1px solid #4DB6AC',
      alignItems: 'center',
      width: isMobile ? '100%' : 'auto'
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
      gap: '6px',
      color: '#124441'
    },
    earningFilterActive: {
      backgroundColor: '#009688',
      color: 'white'
    },
    monthSelect: {
      padding: '8px 12px',
      border: '1px solid #4DB6AC',
      borderRadius: '6px',
      fontSize: '14px',
      backgroundColor: 'white',
      minWidth: isMobile ? '100%' : '150px',
      color: '#124441'
    },
    earningsSummary: {
      backgroundColor: 'white',
      padding: isMobile ? '16px' : '24px',
      borderRadius: '12px',
      boxShadow: '0 2px 8px rgba(0,150,136,0.1)',
      marginBottom: isMobile ? '16px' : '24px',
      border: '1px solid #E0F2F1'
    },
    earningStats: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
      gap: isMobile ? '12px' : '20px'
    },
    earningStat: {
      textAlign: 'center',
      padding: isMobile ? '12px' : '16px',
      backgroundColor: '#E0F2F1',
      borderRadius: '8px',
      border: '1px solid #4DB6AC'
    },
    earningAmount: {
      fontSize: isMobile ? '20px' : '24px',
      fontWeight: '700',
      color: '#009688',
      margin: '0 0 8px 0'
    },
    earningLabel: {
      fontSize: isMobile ? '13px' : '14px',
      color: '#4F6F6B',
      margin: '0 0 12px 0',
      fontWeight: '500'
    },
    metricDetail: {
      display: 'flex',
      flexDirection: 'column',
      gap: '4px',
      paddingTop: '12px',
      borderTop: '1px solid #4DB6AC'
    },
    metricValue: {
      fontSize: isMobile ? '14px' : '16px',
      fontWeight: '600',
      color: '#124441'
    },
    metricLabel: {
      fontSize: isMobile ? '11px' : '12px',
      color: '#4F6F6B'
    },
    sectionTitle: {
      fontSize: isMobile ? '18px' : '20px',
      fontWeight: '600',
      color: '#124441',
      margin: '0 0 16px 0'
    },
    sectionHeader: {
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      justifyContent: 'space-between',
      alignItems: isMobile ? 'flex-start' : 'center',
      marginBottom: '20px',
      gap: isMobile ? '10px' : '0'
    },
    viewAll: {
      fontSize: '14px',
      color: '#009688',
      fontWeight: '500',
      cursor: 'pointer',
      padding: '8px 16px',
      border: '1px solid #009688',
      borderRadius: '6px',
      transition: 'all 0.3s ease',
      backgroundColor: 'white',
      alignSelf: isMobile ? 'flex-start' : 'center'
    },
    earningsHistory: {
      backgroundColor: 'white',
      padding: isMobile ? '16px' : '24px',
      borderRadius: '12px',
      boxShadow: '0 2px 8px rgba(0,150,136,0.1)',
      marginBottom: '24px',
      border: '1px solid #E0F2F1'
    },
    earningsList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px'
    },
    earningItem: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      padding: isMobile ? '12px' : '16px',
      border: '1px solid #4DB6AC',
      borderRadius: '8px',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      backgroundColor: 'white'
    },
    earningDate: {
      flex: 1
    },
    earningDateText: {
      fontSize: isMobile ? '14px' : '16px',
      color: '#124441',
      marginBottom: '8px',
      display: 'block',
      fontWeight: '600'
    },
    earningMeta: {
      display: 'flex',
      gap: '8px',
      flexWrap: 'wrap'
    },
    metaBadge: {
      fontSize: '11px',
      padding: '4px 8px',
      backgroundColor: '#E0F2F1',
      color: '#4F6F6B',
      borderRadius: '12px',
      fontWeight: '500',
      border: '1px solid #4DB6AC'
    },
    earningAmountItem: {
      fontSize: isMobile ? '16px' : '18px',
      fontWeight: '600',
      color: '#009688'
    },
    loadingSpinner: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '40px'
    },
    spinner: {
      width: '40px',
      height: '40px',
      border: '4px solid #E0F2F1',
      borderTop: '4px solid #009688',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    },
    noData: {
      textAlign: 'center',
      padding: '40px',
      color: '#4F6F6B',
      fontSize: '16px'
    },
    pagination: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '16px',
      marginTop: '20px',
      padding: '16px'
    },
    paginationButton: {
      padding: '8px 16px',
      border: '1px solid #4DB6AC',
      backgroundColor: 'white',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '14px',
      transition: 'all 0.3s ease',
      color: '#124441'
    },
    paginationButtonDisabled: {
      opacity: 0.5,
      cursor: 'not-allowed',
      backgroundColor: '#E0F2F1',
      color: '#4F6F6B'
    },
    paginationInfo: {
      fontSize: '14px',
      color: '#4F6F6B'
    },
    monthDetailsGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
      gap: '15px',
      marginTop: '20px'
    },
    deliveryItem: {
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      justifyContent: 'space-between',
      alignItems: isMobile ? 'flex-start' : 'center',
      padding: isMobile ? '12px' : '16px',
      border: '1px solid #4DB6AC',
      borderRadius: '8px',
      marginBottom: '12px',
      backgroundColor: 'white'
    },
    backArrowButton: {
      background: 'transparent',
      color: '#009688',
      border: 'none',
      padding: '10px 15px',
      borderRadius: '50%',
      cursor: 'pointer',
      fontSize: '20px',
      fontWeight: '600',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.3s ease',
      marginRight: '15px',
      width: '40px',
      height: '40px',
      '&:hover': {
        backgroundColor: '#E0F2F1',
        transform: 'scale(1.1)'
      }
    },
    detailsHeader: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: isMobile ? '15px' : '20px'
    },
    detailsTitle: {
      fontSize: isMobile ? '20px' : '24px',
      fontWeight: '700',
      color: '#124441',
      margin: 0
    }
  };

  // Calculate current data for display
  const calculateCurrentData = () => {
    // const totalPages = Math.ceil(allMonthsData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    
    return showAllMonths ? 
      allMonthsData.slice(startIndex, endIndex) : 
      initialMonthsData.slice(0, 6);
  };

  const currentMonthsData = calculateCurrentData();

  // Simulate API call to fetch all months data
  const fetchAllMonthsData = async () => {
    setIsLoading(true);
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    setAllMonthsData(extendedMonthsData);
    setIsLoading(false);
  };

  // Handle View All click
  const handleViewAllClick = () => {
    if (!showAllMonths) {
      fetchAllMonthsData();
    }
    setShowAllMonths(!showAllMonths);
    setCurrentPage(1);
  };

  // Real-time delivery data simulation for selected month
  const generateRealTimeDeliveries = (monthData) => {
    const deliveries = [];
    const daysInMonth = 30;
    
    for (let i = 1; i <= daysInMonth; i++) {
      deliveries.push({
        id: `delivery-${monthData.value}-${i}`,
        date: `2025-${monthData.value === 'january' ? '01' : '12'}-${i.toString().padStart(2, '0')}`,
        time: `${Math.floor(Math.random() * 12) + 8}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')} ${Math.random() > 0.5 ? 'AM' : 'PM'}`,
        orderId: `ORD${Math.floor(Math.random() * 90000) + 10000}`,
        customer: `Customer ${i}`,
        amount: Math.floor(Math.random() * 300) + 150,
        status: Math.random() > 0.1 ? 'Delivered' : 'Cancelled',
        location: `Zone ${String.fromCharCode(65 + Math.floor(Math.random() * 6))}`,
        vehicle: Math.random() > 0.5 ? 'Bike' : 'Car'
      });
    }
    
    return deliveries;
  };

  // Handle month click for detailed view
  const handleMonthClick = (month) => {
    const monthData = initialMonthsData.find(m => m.value === month.value) || month;
    const realTimeDeliveries = generateRealTimeDeliveries(monthData);
    
    setSelectedMonthDetails({
      ...monthData,
      realTimeDeliveries,
      stats: {
        totalEarnings: monthData.earnings,
        totalDeliveries: monthData.deliveries,
        cancelled: monthData.cancelled,
        successRate: ((monthData.deliveries - monthData.cancelled) / monthData.deliveries * 100).toFixed(1),
        averageDelivery: Math.round(monthData.earnings / monthData.deliveries),
        peakHours: '10:00 AM - 2:00 PM',
        mostActiveDay: 'Friday'
      },
      topZones: monthData.topZones || [
        { zone: 'Downtown', deliveries: 45, earnings: 2850 },
        { zone: 'Suburbs', deliveries: 38, earnings: 2450 },
        { zone: 'Business District', deliveries: 32, earnings: 2100 }
      ]
    });
    
    setShowMonthDetails(true);
  };

  // Close month details view
  const handleCloseDetails = () => {
    setShowMonthDetails(false);
    setSelectedMonthDetails(null);
  };

  // Calculate metrics based on current filter
  const getFilteredMetrics = () => {
    const selectedMonth = initialMonthsData.find(month => month.value === earningFilter);

    switch (earningFilter) {
      case 'today':
        return {
          totalEarnings: deliveryData.stats.todayEarnings,
          totalDeliveries: deliveryData.stats.completed,
          cancelledDeliveries: deliveryData.stats.cancelled,
          averagePerDelivery: deliveryData.stats.completed > 0 ? 
            Math.round(deliveryData.stats.todayEarnings / deliveryData.stats.completed) : 0,
          efficiency: '94%',
          activeHours: '8h 30m'
        };
      case 'week':
        return {
          totalEarnings: 3850,
          totalDeliveries: 55,
          cancelledDeliveries: 8,
          averagePerDelivery: Math.round(3850 / 55),
          efficiency: '92%',
          activeHours: '42h 15m'
        };
      case 'month':
        // Current month data
        const currentMonthData = initialMonthsData[0];
        return {
          totalEarnings: currentMonthData.earnings,
          totalDeliveries: currentMonthData.deliveries,
          cancelledDeliveries: currentMonthData.cancelled,
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
            cancelledDeliveries: selectedMonth.cancelled,
            averagePerDelivery: Math.round(selectedMonth.earnings / selectedMonth.deliveries),
            efficiency: selectedMonth.value === 'january' ? '93%' :
              selectedMonth.value === 'december' ? '90%' : '88%',
            activeHours: selectedMonth.value === 'january' ? '178h 30m' :
              selectedMonth.value === 'december' ? '165h 45m' : '155h 20m'
          };
        } else {
          // Default to current month
          const currentMonthData = initialMonthsData[0];
          return {
            totalEarnings: currentMonthData.earnings,
            totalDeliveries: currentMonthData.deliveries,
            cancelledDeliveries: currentMonthData.cancelled,
            averagePerDelivery: Math.round(currentMonthData.earnings / currentMonthData.deliveries),
            efficiency: '93%',
            activeHours: '178h 30m'
          };
        }
    }
  };

  const formatIndianCurrency = (amount) => {
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  const metrics = getFilteredMetrics();
  const selectedMonth = initialMonthsData.find(month => month.value === earningFilter);

  // Calculate pagination
  const totalPages = Math.ceil(allMonthsData.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Add CSS animation for spinner
  const spinnerStyles = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;

  return (
    <div style={responsiveStyles.mainContent}>
      <style>{spinnerStyles}</style>
      
      {!showMonthDetails ? (
        // Original Main View
        <>
          <div style={responsiveStyles.header}>
            <div>
              <h1 style={responsiveStyles.greeting}>Earnings</h1>
              <p style={responsiveStyles.subtitle}>Track your delivery earnings and performance</p>
            </div>
            <div style={responsiveStyles.earningFilters}>
              <button
                style={{
                  ...responsiveStyles.earningFilter,
                  ...(earningFilter === 'today' ? responsiveStyles.earningFilterActive : {})
                }}
                onClick={() => setEarningFilter('today')}
                onMouseEnter={(e) => {
                  if (earningFilter !== 'today') {
                    e.currentTarget.style.backgroundColor = '#E0F2F1';
                  }
                }}
                onMouseLeave={(e) => {
                  if (earningFilter !== 'today') {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                Today
              </button>
              <button
                style={{
                  ...responsiveStyles.earningFilter,
                  ...(earningFilter === 'week' ? responsiveStyles.earningFilterActive : {})
                }}
                onClick={() => setEarningFilter('week')}
                onMouseEnter={(e) => {
                  if (earningFilter !== 'week') {
                    e.currentTarget.style.backgroundColor = '#E0F2F1';
                  }
                }}
                onMouseLeave={(e) => {
                  if (earningFilter !== 'week') {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                This Week
              </button>
              <select
                value={earningFilter}
                onChange={(e) => setEarningFilter(e.target.value)}
                style={responsiveStyles.monthSelect}
              >
                <option value="" disabled>Select Month</option>
                {initialMonthsData.map(month => (
                  <option key={month.value} value={month.value}>
                    {month.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div style={responsiveStyles.earningsSummary}>
            <div style={responsiveStyles.earningStats}>
              <div style={responsiveStyles.earningStat}>
                <h3 style={responsiveStyles.earningAmount}>
                  {formatIndianCurrency(metrics.totalEarnings)}
                </h3>
                <p style={responsiveStyles.earningLabel}>Total Earnings</p>
                <div style={responsiveStyles.metricDetail}>
                  <span style={responsiveStyles.metricValue}>{metrics.activeHours}</span>
                  <span style={responsiveStyles.metricLabel}>Active Time</span>
                </div>
              </div>
              <div style={responsiveStyles.earningStat}>
                <h3 style={responsiveStyles.earningAmount}>
                  {metrics.totalDeliveries}
                </h3>
                <p style={responsiveStyles.earningLabel}>Total Deliveries</p>
                <div style={responsiveStyles.metricDetail}>
                  <span style={responsiveStyles.metricValue}>{metrics.efficiency}</span>
                  <span style={responsiveStyles.metricLabel}>Efficiency</span>
                </div>
              </div>
              <div style={responsiveStyles.earningStat}>
                <h3 style={responsiveStyles.earningAmount}>
                  {metrics.cancelledDeliveries}
                </h3>
                <p style={responsiveStyles.earningLabel}>Cancelled Orders</p>
                <div style={responsiveStyles.metricDetail}>
                  <span style={responsiveStyles.metricValue}>
                    {metrics.totalDeliveries > 0 ? 
                      Math.round((metrics.cancelledDeliveries / metrics.totalDeliveries) * 100) : 0}%
                  </span>
                  <span style={responsiveStyles.metricLabel}>Cancellation Rate</span>
                </div>
              </div>
              <div style={responsiveStyles.earningStat}>
                <h3 style={responsiveStyles.earningAmount}>
                  {formatIndianCurrency(metrics.averagePerDelivery)}
                </h3>
                <p style={responsiveStyles.earningLabel}>Average per Delivery</p>
                <div style={responsiveStyles.metricDetail}>
                  <span style={responsiveStyles.metricValue}>
                    {earningFilter === 'today' ? '12' :
                      earningFilter === 'week' ? '7.8' : '6.5'}
                  </span>
                  <span style={responsiveStyles.metricLabel}>Deliveries/Hour</span>
                </div>
              </div>
            </div>
          </div>

          {/* Month Details Section */}
          {selectedMonth && (
            <div style={responsiveStyles.earningsHistory}>
              <h3 style={responsiveStyles.sectionTitle}>Month Details - {selectedMonth.label}</h3>
              <div style={responsiveStyles.earningStats}>
                <div style={responsiveStyles.earningStat}>
                  <h3 style={responsiveStyles.earningAmount}>{formatIndianCurrency(selectedMonth.earnings)}</h3>
                  <p style={responsiveStyles.earningLabel}>Total Earnings</p>
                </div>
                <div style={responsiveStyles.earningStat}>
                  <h3 style={responsiveStyles.earningAmount}>{selectedMonth.deliveries}</h3>
                  <p style={responsiveStyles.earningLabel}>Successful Deliveries</p>
                </div>
                <div style={responsiveStyles.earningStat}>
                  <h3 style={responsiveStyles.earningAmount}>{selectedMonth.cancelled}</h3>
                  <p style={responsiveStyles.earningLabel}>Cancelled Orders</p>
                </div>
                <div style={responsiveStyles.earningStat}>
                  <h3 style={responsiveStyles.earningAmount}>
                    {Math.round(selectedMonth.earnings / selectedMonth.deliveries)}
                  </h3>
                  <p style={responsiveStyles.earningLabel}>Avg per Delivery</p>
                </div>
              </div>
            </div>
          )}

          {/* Recent Months Performance */}
          <div style={responsiveStyles.earningsHistory}>
            <div style={responsiveStyles.sectionHeader}>
              <h3 style={responsiveStyles.sectionTitle}>
                {showAllMonths ? 'Complete Earnings History' : 'Recent Months Performance'}
              </h3>
              <span 
                style={responsiveStyles.viewAll}
                onClick={handleViewAllClick}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#009688';
                  e.currentTarget.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'white';
                  e.currentTarget.style.color = '#009688';
                }}
              >
                {showAllMonths ? 'Show Less' : 'View All'}
              </span>
            </div>

            {isLoading ? (
              <div style={responsiveStyles.loadingSpinner}>
                <div style={responsiveStyles.spinner}></div>
              </div>
            ) : (
              <>
                <div style={responsiveStyles.earningsList}>
                  {currentMonthsData.length > 0 ? (
                    currentMonthsData.map((month, index) => (
                      <div 
                        key={index} 
                        style={responsiveStyles.earningItem}
                        onClick={() => handleMonthClick(month)}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#E0F2F1';
                          e.currentTarget.style.borderColor = '#009688';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'white';
                          e.currentTarget.style.borderColor = '#4DB6AC';
                        }}
                      >
                        <div style={responsiveStyles.earningDate}>
                          <strong style={responsiveStyles.earningDateText}>
                            {month.label}
                          </strong>
                          <div style={responsiveStyles.earningMeta}>
                            <span style={responsiveStyles.metaBadge}>{month.deliveries} deliveries</span>
                            <span style={responsiveStyles.metaBadge}>{month.cancelled} cancelled</span>
                            <span style={responsiveStyles.metaBadge}>
                              {month.value.includes('january') ? '93%' :
                               month.value.includes('december') ? '90%' : 
                               month.year === 2023 ? '85%' : '88%'} efficiency
                            </span>
                          </div>
                        </div>
                        <div style={responsiveStyles.earningAmountItem}>
                          {formatIndianCurrency(month.earnings)}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div style={responsiveStyles.noData}>
                      No earnings data available
                    </div>
                  )}
                </div>

                {/* Pagination for View All */}
                {showAllMonths && allMonthsData.length > itemsPerPage && (
                  <div style={responsiveStyles.pagination}>
                    <button
                      style={{
                        ...responsiveStyles.paginationButton,
                        ...(currentPage === 1 ? responsiveStyles.paginationButtonDisabled : {})
                      }}
                      onClick={handlePrevPage}
                      disabled={currentPage === 1}
                      onMouseEnter={(e) => {
                        if (currentPage !== 1) {
                          e.currentTarget.style.backgroundColor = '#009688';
                          e.currentTarget.style.color = 'white';
                          e.currentTarget.style.borderColor = '#009688';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (currentPage !== 1) {
                          e.currentTarget.style.backgroundColor = 'white';
                          e.currentTarget.style.color = '#124441';
                          e.currentTarget.style.borderColor = '#4DB6AC';
                        }
                      }}
                    >
                      Previous
                    </button>
                    <span style={responsiveStyles.paginationInfo}>
                      Page {currentPage} of {totalPages}
                    </span>
                    <button
                      style={{
                        ...responsiveStyles.paginationButton,
                        ...(currentPage === totalPages ? responsiveStyles.paginationButtonDisabled : {})
                      }}
                      onClick={handleNextPage}
                      disabled={currentPage === totalPages}
                      onMouseEnter={(e) => {
                        if (currentPage !== totalPages) {
                          e.currentTarget.style.backgroundColor = '#009688';
                          e.currentTarget.style.color = 'white';
                          e.currentTarget.style.borderColor = '#009688';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (currentPage !== totalPages) {
                          e.currentTarget.style.backgroundColor = 'white';
                          e.currentTarget.style.color = '#124441';
                          e.currentTarget.style.borderColor = '#4DB6AC';
                        }
                      }}
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </>
      ) : (
        // Month Details View with Arrow Back Button
        <div>
          {/* Header with Arrow Back Button */}
          <div style={responsiveStyles.detailsHeader}>
            <button 
              onClick={handleCloseDetails}
              style={{
                background: 'transparent',
                color: '#009688',
                border: 'none',
                padding: '10px 15px',
                borderRadius: '50%',
                cursor: 'pointer',
                fontSize: '20px',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease',
                marginRight: '15px',
                width: '40px',
                height: '40px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#E0F2F1';
                e.currentTarget.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              ←
            </button>
            <h1 style={responsiveStyles.detailsTitle}>{selectedMonthDetails.label} Details</h1>
          </div>
          
          <p style={responsiveStyles.subtitle}>Real-time delivery history and performance metrics</p>

          {/* Month Summary Stats */}
          <div style={responsiveStyles.earningsSummary}>
            <div style={responsiveStyles.earningStats}>
              <div style={responsiveStyles.earningStat}>
                <h3 style={responsiveStyles.earningAmount}>
                  {formatIndianCurrency(selectedMonthDetails.stats.totalEarnings)}
                </h3>
                <p style={responsiveStyles.earningLabel}>Total Earnings</p>
              </div>
              <div style={responsiveStyles.earningStat}>
                <h3 style={responsiveStyles.earningAmount}>
                  {selectedMonthDetails.stats.totalDeliveries}
                </h3>
                <p style={responsiveStyles.earningLabel}>Completed Deliveries</p>
              </div>
              <div style={responsiveStyles.earningStat}>
                <h3 style={responsiveStyles.earningAmount}>
                  {selectedMonthDetails.stats.cancelled}
                </h3>
                <p style={responsiveStyles.earningLabel}>Cancelled Orders</p>
              </div>
              <div style={responsiveStyles.earningStat}>
                <h3 style={responsiveStyles.earningAmount}>
                  {selectedMonthDetails.stats.successRate}%
                </h3>
                <p style={responsiveStyles.earningLabel}>Success Rate</p>
              </div>
            </div>
          </div>

          {/* Real-time Delivery History */}
          <div style={responsiveStyles.earningsHistory}>
            <h3 style={responsiveStyles.sectionTitle}>Delivery History</h3>
            <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
              {selectedMonthDetails.realTimeDeliveries.slice(0, 20).map((delivery, index) => (
                <div key={index} style={responsiveStyles.deliveryItem}>
                  <div>
                    <strong style={{ color: '#124441', display: 'block' }}>
                      {delivery.customer}
                    </strong>
                    <div style={{ display: 'flex', gap: '8px', marginTop: '8px', flexWrap: 'wrap' }}>
                      <span style={responsiveStyles.metaBadge}>{delivery.time}</span>
                      <span style={responsiveStyles.metaBadge}>{delivery.location}</span>
                      <span style={{
                        ...responsiveStyles.metaBadge,
                        backgroundColor: delivery.status === 'Delivered' ? '#E0F2F1' : '#FFEBEE',
                        color: delivery.status === 'Delivered' ? '#124441' : '#C62828',
                        borderColor: delivery.status === 'Delivered' ? '#4DB6AC' : '#EF9A9A'
                      }}>
                        {delivery.status}
                      </span>
                    </div>
                  </div>
                  <div style={{ textAlign: isMobile ? 'left' : 'right', marginTop: isMobile ? '10px' : '0' }}>
                    <div style={{ fontSize: '18px', fontWeight: '600', color: '#009688' }}>
                      {formatIndianCurrency(delivery.amount)}
                    </div>
                    <div style={{ fontSize: '12px', color: '#4F6F6B', marginTop: '4px' }}>
                      {delivery.orderId} • {delivery.vehicle}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Performance Insights */}
          <div style={responsiveStyles.earningsHistory}>
            <h3 style={responsiveStyles.sectionTitle}>Performance Insights</h3>
            <div style={responsiveStyles.monthDetailsGrid}>
              <div style={{
                backgroundColor: '#E0F2F1',
                padding: '20px',
                borderRadius: '8px',
                border: '1px solid #4DB6AC'
              }}>
                <h4 style={{ margin: '0 0 15px 0', color: '#124441' }}>Peak Performance</h4>
                <p style={{ margin: '8px 0', color: '#4F6F6B' }}>
                  <strong>Peak Hours:</strong> {selectedMonthDetails.stats.peakHours}
                </p>
                <p style={{ margin: '8px 0', color: '#4F6F6B' }}>
                  <strong>Most Active Day:</strong> {selectedMonthDetails.stats.mostActiveDay}
                </p>
                <p style={{ margin: '8px 0', color: '#4F6F6B' }}>
                  <strong>Avg per Delivery:</strong> {formatIndianCurrency(selectedMonthDetails.stats.averageDelivery)}
                </p>
              </div>
              
              <div style={{
                backgroundColor: '#E0F2F1',
                padding: '20px',
                borderRadius: '8px',
                border: '1px solid #4DB6AC'
              }}>
                <h4 style={{ margin: '0 0 15px 0', color: '#124441' }}>Zone Performance</h4>
                {selectedMonthDetails.topZones && selectedMonthDetails.topZones.map((zone, index) => (
                  <div key={index} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '8px 0',
                    borderBottom: index < selectedMonthDetails.topZones.length - 1 ? '1px solid #4DB6AC' : 'none'
                  }}>
                    <span style={{ color: '#4F6F6B' }}>{zone.zone}</span>
                    <span style={{ color: '#124441', fontWeight: '600' }}>
                      {zone.deliveries} deliveries
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Earnings;