import React from 'react';

const EarningsContent = ({ dashboardData, state, actions }) => {
  const { earningFilter } = state;
  const { setEarningFilter } = actions;

  const formatIndianCurrency = (amount) => {
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  const getEarningsData = () => {
    switch (earningFilter) {
      case 'daily':
        return {
          total: 2400,
          consultations: 6,
          average: 400,
          history: dashboardData.earningsHistory.daily
        };
      case 'weekly':
        return {
          total: 15200,
          consultations: 38,
          average: 400,
          history: dashboardData.earningsHistory.weekly
        };
      case 'monthly':
        return {
          total: 56800,
          consultations: 142,
          average: 400,
          history: dashboardData.earningsHistory.monthly
        };
      default:
        return {
          total: 2400,
          consultations: 6,
          average: 400,
          history: dashboardData.earningsHistory.daily
        };
    }
  };

  const earningsData = getEarningsData();

  return (
    <div style={styles.mainContent}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.greeting}>Earnings</h1>
          <p style={styles.subtitle}>Consultation fee logs and payouts overview</p>
        </div>
        <div style={styles.earningFilters}>
          <button
            style={{
              ...styles.earningFilter,
              ...(earningFilter === 'daily' && styles.earningFilterActive)
            }}
            onClick={() => setEarningFilter('daily')}
          >
            Daily
          </button>
          <button
            style={{
              ...styles.earningFilter,
              ...(earningFilter === 'weekly' && styles.earningFilterActive)
            }}
            onClick={() => setEarningFilter('weekly')}
          >
            Weekly
          </button>
          <button
            style={{
              ...styles.earningFilter,
              ...(earningFilter === 'monthly' && styles.earningFilterActive)
            }}
            onClick={() => setEarningFilter('monthly')}
          >
            Monthly
          </button>
        </div>
      </div>

      <div style={styles.earningsSummary}>
        <div style={styles.earningStats}>
          <div style={styles.earningStat}>
            <h3 style={styles.earningAmount}>
              {formatIndianCurrency(earningsData.total)}
            </h3>
            <p style={styles.earningLabel}>Total Earnings</p>
          </div>
          <div style={styles.earningStat}>
            <h3 style={styles.earningAmount}>
              {earningsData.consultations}
            </h3>
            <p style={styles.earningLabel}>Consultations</p>
          </div>
          <div style={styles.earningStat}>
            <h3 style={styles.earningAmount}>
              {formatIndianCurrency(earningsData.average)}
            </h3>
            <p style={styles.earningLabel}>Average per Consultation</p>
          </div>
        </div>
      </div>

      <div style={styles.earningsHistory}>
        <h3 style={styles.sectionTitle}>Earnings History</h3>
        <div style={styles.earningsList}>
          {earningsData.history.map((earning, index) => (
            <div key={index} style={styles.earningItem}>
              <div style={styles.earningDate}>
                <strong>{earning.date || earning.week || earning.month}</strong>
                <span>{earning.consultations} consultations</span>
              </div>
              <div style={styles.earningAmount}>
                {formatIndianCurrency(earning.amount)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const styles = {
  mainContent: {
    padding: '30px'
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
    border: '1px solid #e5e7eb'
  },
  earningFilter: {
    padding: '8px 16px',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500'
  },
  earningFilterActive: {
    backgroundColor: '#7C2A62',
    color: 'white'
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
    textAlign: 'center'
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
    margin: 0
  },
  earningsHistory: {
    backgroundColor: 'white',
    padding: '24px',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  },
  sectionTitle: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#1f2937',
    margin: '0 0 20px 0'
  },
  earningsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  earningItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px',
    border: '1px solid #e5e7eb',
    borderRadius: '8px'
  },
  earningDate: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  }
};

export default EarningsContent;