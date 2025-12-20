import React, { useState, useEffect } from 'react';

const Performance = () => {
  const [performanceFilter, setPerformanceFilter] = useState('thisMonth');
  const [realTimeMetrics, setRealTimeMetrics] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // Real-time data simulation
  useEffect(() => {
    const simulateRealTimeData = () => {
      setIsLoading(true);
      
      // Simulate API call delay
      setTimeout(() => {
        const realTimeData = {
          thisMonth: {
            activeDeliveries: Math.floor(Math.random() * 15) + 5,
            completedToday: Math.floor(Math.random() * 8) + 12,
            currentRating: parseFloat((Math.random() * 0.3 + 4.6).toFixed(1)),
            responseRate: Math.floor(Math.random() * 5) + 95,
            liveUpdates: [
              { time: '10:00 AM', deliveries: 8, rating: 4.7 },
              { time: '11:00 AM', deliveries: 12, rating: 4.8 },
              { time: '12:00 PM', deliveries: 15, rating: 4.6 },
              { time: '01:00 PM', deliveries: 18, rating: 4.9 },
              { time: '02:00 PM', deliveries: 22, rating: 4.7 },
              { time: '03:00 PM', deliveries: 25, rating: 4.8 }
            ]
          },
          last3Months: {
            activeDeliveries: Math.floor(Math.random() * 25) + 15,
            completedToday: Math.floor(Math.random() * 15) + 25,
            currentRating: parseFloat((Math.random() * 0.4 + 4.5).toFixed(1)),
            responseRate: Math.floor(Math.random() * 8) + 92,
            liveUpdates: [
              { time: 'Week 1', deliveries: 45, rating: 4.5 },
              { time: 'Week 2', deliveries: 52, rating: 4.7 },
              { time: 'Week 3', deliveries: 48, rating: 4.6 },
              { time: 'Week 4', deliveries: 55, rating: 4.8 }
            ]
          },
          allTime: {
            activeDeliveries: Math.floor(Math.random() * 50) + 30,
            completedToday: Math.floor(Math.random() * 20) + 40,
            currentRating: parseFloat((Math.random() * 0.5 + 4.4).toFixed(1)),
            responseRate: Math.floor(Math.random() * 10) + 90,
            liveUpdates: [
              { time: '2022', deliveries: 42, rating: 4.4 },
              { time: '2023', deliveries: 48, rating: 4.6 },
              { time: '2024', deliveries: 55, rating: 4.7 }
            ]
          }
        };

        setRealTimeMetrics(realTimeData[performanceFilter] || realTimeData.thisMonth);
        setIsLoading(false);
      }, 1000);
    };

    simulateRealTimeData();

    // Set up real-time updates every 2 minutes
    const interval = setInterval(simulateRealTimeData, 120000);
    
    return () => clearInterval(interval);
  }, [performanceFilter]);

  // SVG Icon Components
  const PerformanceIcon = ({ type, size = 32, color = "#009688" }) => {
    const icons = {
      completionRate: (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      ),
      averageRating: (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ),
      onTimeDelivery: (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
      responseTime: (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      ),
      customerSatisfaction: (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M8 14s1.5 2 4 2 4-2 4-2" />
          <line x1="9" y1="9" x2="9.01" y2="9" />
          <line x1="15" y1="9" x2="15.01" y2="9" />
        </svg>
      ),
      efficiency: (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
          <path d="M12 20V10" />
          <path d="M18 20V4" />
          <path d="M6 20v-4" />
        </svg>
      )
    };

    return icons[type] || icons.completionRate;
  };

  const FilterIcon = ({ type, color = "#4F6F6B" }) => {
    const icons = {
      thisMonth: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      ),
      last3Months: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
          <path d="M8 14h.01" />
          <path d="M12 14h.01" />
          <path d="M16 14h.01" />
          <path d="M8 18h.01" />
          <path d="M12 18h.01" />
          <path d="M16 18h.01" />
        </svg>
      ),
      allTime: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
          <path d="M12 2a10 10 0 0 0-10 10c0 5.5 10 10 10 10s10-4.5 10-10A10 10 0 0 0 12 2z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      )
    };

    return icons[type] || icons.thisMonth;
  };

  const HeaderIcon = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#009688" strokeWidth="2">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  );

  const LiveIcon = ({ color = "#4DB6AC", size = 12 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3">
      <circle cx="12" cy="12" r="10" />
    </svg>
  );

  const StatsIcon = ({ type, color = "#009688" }) => {
    const icons = {
      activeDeliveries: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
          <line x1="12" y1="22.08" x2="12" y2="12" />
        </svg>
      ),
      completedToday: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      ),
      currentRating: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ),
      responseRate: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
        </svg>
      )
    };

    return icons[type] || icons.activeDeliveries;
  };

  const LoadingSpinner = () => (
    <svg width="48" height="48" viewBox="0 0 50 50" style={{ animation: 'rotate 2s linear infinite' }}>
      <circle cx="25" cy="25" r="20" fill="none" stroke="#E0F2F1" strokeWidth="5" />
      <circle cx="25" cy="25" r="20" fill="none" stroke="#4DB6AC" strokeWidth="5" strokeLinecap="round"
        strokeDasharray="1, 150" strokeDashoffset="0" style={{ animation: 'dash 1.5s ease-in-out infinite' }} />
      <style>
        {`
          @keyframes rotate {
            100% { transform: rotate(360deg); }
          }
          @keyframes dash {
            0% { stroke-dasharray: 1, 150; stroke-dashoffset: 0; }
            50% { stroke-dasharray: 90, 150; stroke-dashoffset: -35; }
            100% { stroke-dasharray: 90, 150; stroke-dashoffset: -124; }
          }
        `}
      </style>
    </svg>
  );

  const styles = {
    mainContent: {
      padding: '30px',
      minHeight: '100vh',
      backgroundColor: '#E0F2F1' // softbg
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '30px',
      flexWrap: 'wrap',
      gap: '20px'
    },
    greeting: {
      fontSize: '28px',
      fontWeight: '700',
      color: '#124441', // darktext
      margin: '0 0 8px 0',
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    },
    subtitle: {
      fontSize: '16px',
      color: '#4F6F6B', // softtext
      margin: 0
    },
    performanceFilters: {
      display: 'flex',
      gap: '8px',
      backgroundColor: '#FFFFFF', // white
      padding: '4px',
      borderRadius: '8px',
      border: '1px solid #4DB6AC', // mint
      flexWrap: 'wrap'
    },
    performanceFilterButton: {
      padding: '8px 16px',
      backgroundColor: 'transparent',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '500',
      transition: 'all 0.3s ease',
      color: '#4F6F6B', // softtext
      display: 'flex',
      alignItems: 'center',
      gap: '6px'
    },
    performanceFilterButtonActive: {
      backgroundColor: '#009688', // primary
      color: '#FFFFFF' // white
    },
    performanceGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '20px',
      marginBottom: '30px'
    },
    performanceCard: {
      backgroundColor: '#FFFFFF', // white
      padding: '24px',
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
      display: 'flex',
      alignItems: 'center',
      gap: '20px',
      border: '1px solid #4DB6AC', // mint
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: '0 8px 24px rgba(0,0,0,0.12)'
      }
    },
    performanceIcon: {
      width: '60px',
      height: '60px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#E0F2F1', // softbg
      borderRadius: '12px',
      flexShrink: 0
    },
    performanceContent: {
      flex: 1
    },
    performanceValue: {
      fontSize: '24px',
      fontWeight: '700',
      color: '#124441', // darktext
      margin: '0 0 4px 0'
    },
    performanceLabel: {
      fontSize: '14px',
      color: '#4F6F6B', // softtext
      margin: 0,
      textTransform: 'capitalize'
    },
    chartContainer: {
      backgroundColor: '#FFFFFF', // white
      padding: '24px',
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
      marginBottom: '24px',
      border: '1px solid #4DB6AC' // mint
    },
    sectionTitle: {
      fontSize: '20px',
      fontWeight: '600',
      color: '#124441', // darktext
      margin: '0 0 16px 0',
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    },
    performanceChart: {
      display: 'flex',
      alignItems: 'flex-end',
      gap: '20px',
      height: '200px',
      padding: '20px',
      backgroundColor: '#E0F2F1', // softbg
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
      backgroundColor: '#009688', // primary
      borderRadius: '4px 4px 0 0',
      minHeight: '4px',
      transition: 'height 0.5s ease'
    },
    ratingBar: {
      width: '20px',
      backgroundColor: '#4DB6AC', // mint
      borderRadius: '4px 4px 0 0',
      minHeight: '4px',
      transition: 'height 0.5s ease'
    },
    weekLabel: {
      fontSize: '12px',
      color: '#4F6F6B', // softtext
      fontWeight: '500'
    },
    chartLegend: {
      display: 'flex',
      gap: '16px',
      marginTop: '16px'
    },
    legendItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontSize: '12px',
      color: '#4F6F6B' // softtext
    },
    legendColor: {
      width: '12px',
      height: '12px',
      borderRadius: '2px'
    },
    // NEW STYLES FOR REAL-TIME GRAPH
    realTimeSection: {
      marginTop: '40px'
    },
    realTimeGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '24px',
      marginBottom: '30px'
    },
    realTimeChartContainer: {
      backgroundColor: '#FFFFFF', // white
      padding: '24px',
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
      border: '1px solid #4DB6AC' // mint
    },
    realTimeStatsContainer: {
      backgroundColor: '#FFFFFF', // white
      padding: '24px',
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
      border: '1px solid #4DB6AC' // mint
    },
    realTimeHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px'
    },
    realTimeTitle: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#124441', // darktext
      margin: 0,
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    realTimeIndicator: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontSize: '12px',
      color: '#4DB6AC', // mint
      fontWeight: '500'
    },
    pulseDot: {
      width: '8px',
      height: '8px',
      backgroundColor: '#4DB6AC', // mint
      borderRadius: '50%',
      animation: 'pulse 1.5s infinite'
    },
    realTimeChart: {
      display: 'flex',
      alignItems: 'flex-end',
      gap: '12px',
      height: '180px',
      padding: '20px',
      backgroundColor: '#E0F2F1', // softbg
      borderRadius: '8px'
    },
    timeBar: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      flex: 1
    },
    realTimeBarContainer: {
      display: 'flex',
      gap: '3px',
      alignItems: 'flex-end',
      height: '140px',
      marginBottom: '8px',
      width: '100%',
      justifyContent: 'center'
    },
    realTimeDeliveryBar: {
      width: '16px',
      backgroundColor: '#009688', // primary
      borderRadius: '3px 3px 0 0',
      minHeight: '4px',
      transition: 'all 0.5s ease',
      position: 'relative',
      '&:hover': {
        '&::after': {
          content: 'attr(title)',
          position: 'absolute',
          bottom: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: '#124441',
          color: 'white',
          padding: '4px 8px',
          borderRadius: '4px',
          fontSize: '10px',
          whiteSpace: 'nowrap',
          marginBottom: '8px'
        }
      }
    },
    realTimeRatingBar: {
      width: '16px',
      backgroundColor: '#4DB6AC', // mint
      borderRadius: '3px 3px 0 0',
      minHeight: '4px',
      transition: 'all 0.5s ease',
      position: 'relative'
    },
    barLabel: {
      fontSize: '10px',
      color: '#4F6F6B', // softtext
      fontWeight: '500',
      marginTop: '4px',
      textAlign: 'center'
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '16px'
    },
    statCard: {
      padding: '20px',
      backgroundColor: '#E0F2F1', // softbg
      borderRadius: '8px',
      border: '1px solid #4DB6AC', // mint
      transition: 'transform 0.3s ease',
      '&:hover': {
        transform: 'translateY(-2px)'
      }
    },
    statHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      marginBottom: '8px'
    },
    statValue: {
      fontSize: '24px',
      fontWeight: '700',
      color: '#009688', // primary
      margin: '0 0 4px 0'
    },
    statLabel: {
      fontSize: '12px',
      color: '#4F6F6B', // softtext
      margin: 0,
      textTransform: 'uppercase',
      fontWeight: '600'
    },
    loadingSpinner: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '180px',
      fontSize: '14px',
      color: '#4F6F6B', // softtext
      gap: '12px'
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
          { week: 'Dec W3', deliveries: 50, rating: 4.5 }
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

  const performanceData = getPerformanceData();

  // Calculate max values for real-time chart scaling
  const maxDeliveries = realTimeMetrics.liveUpdates ? 
    Math.max(...realTimeMetrics.liveUpdates.map(item => item.deliveries)) : 60;
  const maxRating = 5;

  return (
    <div style={styles.mainContent}>
      {/* Header with SVG Icon */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.greeting}>
            <HeaderIcon />
            Performance Analytics
          </h1>
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
            <FilterIcon type="thisMonth" color={performanceFilter === 'thisMonth' ? '#FFFFFF' : '#4F6F6B'} />
            This Month
          </button>
          <button
            style={{
              ...styles.performanceFilterButton,
              ...(performanceFilter === 'last3Months' ? styles.performanceFilterButtonActive : {})
            }}
            onClick={() => setPerformanceFilter('last3Months')}
          >
            <FilterIcon type="last3Months" color={performanceFilter === 'last3Months' ? '#FFFFFF' : '#4F6F6B'} />
            Last 3 Months
          </button>
          <button
            style={{
              ...styles.performanceFilterButton,
              ...(performanceFilter === 'allTime' ? styles.performanceFilterButtonActive : {})
            }}
            onClick={() => setPerformanceFilter('allTime')}
          >
            <FilterIcon type="allTime" color={performanceFilter === 'allTime' ? '#FFFFFF' : '#4F6F6B'} />
            All Time
          </button>
        </div>
      </div>

      {/* Performance Grid with SVG Icons */}
      <div style={styles.performanceGrid}>
        {Object.entries(performanceData.metrics).map(([key, value]) => (
          <div key={key} style={styles.performanceCard}>
            <div style={styles.performanceIcon}>
              <PerformanceIcon type={key} />
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

      {/* Performance Chart Container */}
      <div style={styles.chartContainer}>
        <h3 style={styles.sectionTitle}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#009688" strokeWidth="2">
            <path d="M18 20V10" />
            <path d="M12 20V4" />
            <path d="M6 20v-6" />
          </svg>
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
            <div style={{ ...styles.legendColor, backgroundColor: '#009688' }}></div>
            <span>Deliveries</span>
          </div>
          <div style={styles.legendItem}>
            <div style={{ ...styles.legendColor, backgroundColor: '#4DB6AC' }}></div>
            <span>Rating</span>
          </div>
        </div>
      </div>

      {/* Real-Time Graph Section */}
      <div style={styles.realTimeSection}>
        <div style={styles.realTimeGrid}>
          {/* Real-time Chart */}
          <div style={styles.realTimeChartContainer}>
            <div style={styles.realTimeHeader}>
              <h3 style={styles.realTimeTitle}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#009688" strokeWidth="2">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                  <circle cx="12" cy="13" r="4" />
                </svg>
                Real-Time Performance
              </h3>
              <div style={styles.realTimeIndicator}>
                <LiveIcon />
                <span>Live Updates</span>
              </div>
            </div>
            
            {isLoading ? (
              <div style={styles.loadingSpinner}>
                <LoadingSpinner />
                <span>Loading real-time data...</span>
              </div>
            ) : (
              <>
                <div style={styles.realTimeChart}>
                  {realTimeMetrics.liveUpdates && realTimeMetrics.liveUpdates.map((update, index) => (
                    <div key={index} style={styles.timeBar}>
                      <div style={styles.realTimeBarContainer}>
                        <div
                          style={{
                            ...styles.realTimeDeliveryBar,
                            height: `${(update.deliveries / maxDeliveries) * 120}px`
                          }}
                          title={`${update.deliveries} deliveries`}
                        ></div>
                        <div
                          style={{
                            ...styles.realTimeRatingBar,
                            height: `${(update.rating / maxRating) * 120}px`
                          }}
                          title={`Rating: ${update.rating}`}
                        ></div>
                      </div>
                      <div style={styles.barLabel}>{update.time}</div>
                    </div>
                  ))}
                </div>
                <div style={styles.chartLegend}>
                  <div style={styles.legendItem}>
                    <div style={{ ...styles.legendColor, backgroundColor: '#009688' }}></div>
                    <span>Deliveries</span>
                  </div>
                  <div style={styles.legendItem}>
                    <div style={{ ...styles.legendColor, backgroundColor: '#4DB6AC' }}></div>
                    <span>Rating</span>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Real-time Stats */}
          <div style={styles.realTimeStatsContainer}>
            <h3 style={styles.realTimeTitle}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#009688" strokeWidth="2">
                <path d="M12 2a10 10 0 1 0 10 10" />
                <path d="M12 2v10l5 5" />
              </svg>
              Current Status
            </h3>
            <div style={styles.statsGrid}>
              <div style={styles.statCard}>
                <div style={styles.statHeader}>
                  <StatsIcon type="activeDeliveries" />
                  <h4 style={styles.statValue}>
                    {isLoading ? '...' : realTimeMetrics.activeDeliveries}
                  </h4>
                </div>
                <p style={styles.statLabel}>Active Deliveries</p>
              </div>
              <div style={styles.statCard}>
                <div style={styles.statHeader}>
                  <StatsIcon type="completedToday" />
                  <h4 style={styles.statValue}>
                    {isLoading ? '...' : realTimeMetrics.completedToday}
                  </h4>
                </div>
                <p style={styles.statLabel}>Completed Today</p>
              </div>
              <div style={styles.statCard}>
                <div style={styles.statHeader}>
                  <StatsIcon type="currentRating" />
                  <h4 style={styles.statValue}>
                    {isLoading ? '...' : realTimeMetrics.currentRating}
                  </h4>
                </div>
                <p style={styles.statLabel}>Current Rating</p>
              </div>
              <div style={styles.statCard}>
                <div style={styles.statHeader}>
                  <StatsIcon type="responseRate" />
                  <h4 style={styles.statValue}>
                    {isLoading ? '...' : realTimeMetrics.responseRate}%
                  </h4>
                </div>
                <p style={styles.statLabel}>Response Rate</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animation for Pulse Effect */}
      <style>
        {`
          @keyframes pulse {
            0% { opacity: 1; }
            50% { opacity: 0.5; }
            100% { opacity: 1; }
          }
        `}
      </style>
    </div>
  );
};

export default Performance;