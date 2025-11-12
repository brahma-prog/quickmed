import React from 'react';

const DoctorHeader = ({
  activePage,
  userProfile,
  getUnreadNotificationsCount,
  setShowNotificationsModal
}) => {
  const getCurrentGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const getPageTitle = () => {
    const titles = {
      dashboard: 'Dashboard',
      appointments: 'Appointments',
      patients: 'Patients',
      earnings: 'Earnings',
      messages: 'Messages'
    };
    return titles[activePage] || 'Dashboard';
  };

  const getPageSubtitle = () => {
    const subtitles = {
      dashboard: "Here's your daily overview and schedule",
      appointments: 'Manage your appointments and consultations',
      patients: 'Access patient history and medical records',
      earnings: 'Consultation fee logs and payouts overview',
      messages: 'Communicate with your patients'
    };
    return subtitles[activePage] || '';
  };

  return (
    <div style={styles.header}>
      <div>
        <h1 style={styles.greeting}>
          {activePage === 'dashboard' 
            ? `${getCurrentGreeting()}, Dr. ${userProfile.fullName?.split(' ')[0]}`
            : getPageTitle()
          }
        </h1>
        <p style={styles.subtitle}>{getPageSubtitle()}</p>
      </div>
      <div style={styles.headerActions}>
        <div style={styles.dateDisplay}>
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
        <button 
          style={styles.notificationBell}
          onClick={() => setShowNotificationsModal(true)}
        >
          🔔
          {getUnreadNotificationsCount() > 0 && (
            <span style={styles.notificationBadge}>
              {getUnreadNotificationsCount()}
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: '30px 30px 0 30px',
    marginBottom: '20px'
  },
  headerActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  },
  notificationBell: {
    position: 'relative',
    backgroundColor: 'white',
    border: 'none',
    borderRadius: '50%',
    width: '44px',
    height: '44px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px',
    cursor: 'pointer',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  },
  notificationBadge: {
    position: 'absolute',
    top: '-2px',
    right: '-2px',
    backgroundColor: '#EF4444',
    color: 'white',
    borderRadius: '50%',
    width: '18px',
    height: '18px',
    fontSize: '10px',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
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
  }
};

export default DoctorHeader;