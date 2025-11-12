import React, { useState } from 'react';

const Performance = () => {
  const [performanceFilter, setPerformanceFilter] = useState('thisMonth');

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
    chartContainer: {
      backgroundColor: 'white',
      padding: '24px',
      borderRadius: '12px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      marginBottom: '24px'
    },
    sectionTitle: {
      fontSize: '20px',
      fontWeight: '600',
      color: '#1f2937',
      margin: '0 0 16px 0'
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
    chartLegend: {
      display: 'flex',
      gap: '16px',
      marginTop: '16px'
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
    </div>
  );
};

export default Performance;