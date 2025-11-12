import React from 'react';

const DoctorSidebar = ({
  activePage,
  setActivePage,
  userProfile,
  getUnreadMessagesCount,
  setShowProfileModal,
  setShowLogoutConfirm,
  navigationItems
}) => {
  return (
    <div style={styles.sidebar}>
      <div style={styles.sidebarHeader}>
        <h1 style={styles.logo}>QUICKMED</h1>
        <p style={styles.doctorTitle}>Doctor Portal</p>
      </div>
      
      <nav style={styles.navigation}>
        {navigationItems.map(item => (
          <button
            key={item.id}
            style={{
              ...styles.navButton,
              ...(activePage === item.id && styles.navButtonActive)
            }}
            onClick={() => setActivePage(item.id)}
          >
            <span style={styles.navIcon}>{item.icon}</span>
            <span style={styles.navLabel}>{item.label}</span>
            {item.id === 'messages' && getUnreadMessagesCount() > 0 && (
              <span style={styles.navBadge}>{getUnreadMessagesCount()}</span>
            )}
          </button>
        ))}
      </nav>

      <div style={styles.profileSection}>
        <div style={styles.userInfo}>
          <div style={styles.userAvatar}>👨‍⚕️</div>
          <div style={styles.userDetails}>
            <p style={styles.userName}>Dr. {userProfile.fullName}</p>
            <p style={styles.userSpecialization}>{userProfile.specialization}</p>
          </div>
        </div>
        <button 
          style={styles.profileButton}
          onClick={() => setShowProfileModal(true)}
        >
          Edit Profile
        </button>
      </div>

      <div style={styles.sidebarFooter}>
        <button 
          style={styles.logoutButton} 
          onClick={() => setShowLogoutConfirm(true)}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

const styles = {
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
    margin: '0 0 4px 0'
  },
  doctorTitle: {
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
    opacity: 0.8,
    position: 'relative'
  },
  navButtonActive: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    opacity: 1,
    borderRight: '4px solid #F7D9EB'
  },
  navIcon: {
    fontSize: '20px',
    marginRight: '12px',
    width: '24px'
  },
  navLabel: {
    fontWeight: '500'
  },
  navBadge: {
    backgroundColor: '#EF4444',
    color: 'white',
    borderRadius: '10px',
    padding: '2px 8px',
    fontSize: '12px',
    fontWeight: '600',
    marginLeft: 'auto'
  },
  profileSection: {
    padding: '20px 24px',
    borderTop: '1px solid rgba(255,255,255,0.1)'
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '16px',
    gap: '12px'
  },
  userAvatar: {
    fontSize: '32px'
  },
  userDetails: {
    flex: 1
  },
  userName: {
    margin: '0 0 4px 0',
    fontWeight: '600',
    fontSize: '14px'
  },
  userSpecialization: {
    margin: 0,
    fontSize: '12px',
    opacity: 0.8
  },
  profileButton: {
    width: '100%',
    padding: '10px',
    backgroundColor: 'rgba(255,255,255,0.1)',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500'
  },
  sidebarFooter: {
    padding: '20px 24px'
  },
  logoutButton: {
    width: '100%',
    padding: '12px',
    backgroundColor: 'rgba(255,255,255,0.1)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '500'
  }
};

export default DoctorSidebar;