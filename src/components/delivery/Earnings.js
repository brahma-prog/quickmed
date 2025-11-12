import React, { useState } from 'react';

const Earnings = ({ deliveryData }) => {
  const [earningFilter, setEarningFilter] = useState('today');

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
    earningFilters: {
      display: 'flex',
      gap: '8px',
      backgroundColor: 'white',
      padding: '4px',
      borderRadius: '8px',
      border: '1px solid #e5e7eb',
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
      marginLeft: '0'
    },
    monthSelect: {
      padding: '8px 12px',
      border: '1px solid #d1d5db',
      borderRadius: '6px',
      fontSize: '14px',
      backgroundColor: 'white',
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
      gridTemplateColumns: 'repeat(4, 1fr)',
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
    sectionTitle: {
      fontSize: '20px',
      fontWeight: '600',
      color: '#1f2937',
      margin: '0 0 16px 0'
    },
    sectionHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px'
    },
    viewAll: {
      fontSize: '14px',
      color: '#7C2A62',
      fontWeight: '500',
      cursor: 'pointer'
    },
    earningsHistory: {
      backgroundColor: 'white',
      padding: '24px',
      borderRadius: '12px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      marginBottom: '24px'
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
      padding: '16px',
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
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
    earningAmountItem: {
      fontSize: '16px',
      fontWeight: '600',
      color: '#7C2A62'
    }
  };

  const formatIndianCurrency = (amount) => {
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  // Enhanced months data for earnings
  const monthsData = [
    { value: 'january', label: 'January 2025', earnings: 15200, deliveries: 230, cancelled: 5, year: 2025 },
    { value: 'december', label: 'December 2024', earnings: 14200, deliveries: 215, cancelled: 8, year: 2024 },
    { value: 'november', label: 'November 2024', earnings: 13200, deliveries: 198, cancelled: 12, year: 2024 },
    { value: 'october', label: 'October 2024', earnings: 14800, deliveries: 225, cancelled: 6, year: 2024 },
    { value: 'september', label: 'September 2024', earnings: 12800, deliveries: 190, cancelled: 10, year: 2024 },
    { value: 'august', label: 'August 2024', earnings: 13500, deliveries: 205, cancelled: 7, year: 2024 }
  ];

  // Calculate metrics based on current filter
  const getFilteredMetrics = () => {
    const selectedMonth = monthsData.find(month => month.value === earningFilter);

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
        const currentMonthData = monthsData[0];
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
          const currentMonthData = monthsData[0];
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

  const metrics = getFilteredMetrics();
  const selectedMonth = monthsData.find(month => month.value === earningFilter);

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
            onClick={() => setEarningFilter('today')}
          >
            Today
          </button>
          <button
            style={{
              ...styles.earningFilter,
              ...(earningFilter === 'week' ? styles.earningFilterActive : {})
            }}
            onClick={() => setEarningFilter('week')}
          >
            This Week
          </button>
          <div style={styles.monthDropdown}>
            <select
              value={earningFilter}
              onChange={(e) => setEarningFilter(e.target.value)}
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
              {metrics.cancelledDeliveries}
            </h3>
            <p style={styles.earningLabel}>Cancelled Orders</p>
            <div style={styles.metricDetail}>
              <span style={styles.metricValue}>
                {metrics.totalDeliveries > 0 ? 
                  Math.round((metrics.cancelledDeliveries / metrics.totalDeliveries) * 100) : 0}%
              </span>
              <span style={styles.metricLabel}>Cancellation Rate</span>
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

      {/* Month Details Section */}
      {selectedMonth && (
        <div style={styles.earningsHistory}>
          <h3 style={styles.sectionTitle}>Month Details - {selectedMonth.label}</h3>
          <div style={styles.earningStats}>
            <div style={styles.earningStat}>
              <h3 style={styles.earningAmount}>{formatIndianCurrency(selectedMonth.earnings)}</h3>
              <p style={styles.earningLabel}>Total Earnings</p>
            </div>
            <div style={styles.earningStat}>
              <h3 style={styles.earningAmount}>{selectedMonth.deliveries}</h3>
              <p style={styles.earningLabel}>Successful Deliveries</p>
            </div>
            <div style={styles.earningStat}>
              <h3 style={styles.earningAmount}>{selectedMonth.cancelled}</h3>
              <p style={styles.earningLabel}>Cancelled Orders</p>
            </div>
            <div style={styles.earningStat}>
              <h3 style={styles.earningAmount}>
                {Math.round(selectedMonth.earnings / selectedMonth.deliveries)}
              </h3>
              <p style={styles.earningLabel}>Avg per Delivery</p>
            </div>
          </div>
        </div>
      )}

      {/* Recent Months Performance */}
      <div style={styles.earningsHistory}>
        <div style={styles.sectionHeader}>
          <h3 style={styles.sectionTitle}>Recent Months Performance</h3>
          <span style={styles.viewAll}>View All</span>
        </div>
        <div style={styles.earningsList}>
          {monthsData.slice(0, 6).map((month, index) => (
            <div key={index} style={styles.earningItem}>
              <div style={styles.earningDate}>
                <strong style={styles.earningDateText}>
                  {month.label}
                </strong>
                <div style={styles.earningMeta}>
                  <span style={styles.metaBadge}>{month.deliveries} deliveries</span>
                  <span style={styles.metaBadge}>{month.cancelled} cancelled</span>
                  <span style={styles.metaBadge}>
                    {month.value === 'january' ? '93%' :
                     month.value === 'december' ? '90%' : '88%'} efficiency
                  </span>
                </div>
              </div>
              <div style={styles.earningAmountItem}>
                {formatIndianCurrency(month.earnings)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Earnings;