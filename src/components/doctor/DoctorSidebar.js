import React from 'react';

const DoctorSidebar = ({
  activePage,
  setActivePage,
  userProfile,
  setShowProfileModal,
  setShowLogoutConfirm,
  navigationItems,
  isSidebarOpen,
  setIsSidebarOpen
}) => {
  const isMobile = window.innerWidth <= 768;

  // Filter out messages from navigation items
  const filteredNavigationItems = navigationItems.filter(item => item.id !== 'messages');

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && isSidebarOpen && (
        <div 
          style={styles.overlay}
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      
      <div style={{
        ...styles.sidebar,
        transform: isMobile ? (isSidebarOpen ? 'translateX(0)' : 'translateX(-100%)') : 'translateX(0)',
        width: isMobile ? '280px' : '280px'
      }}>
        <div style={styles.sidebarHeader}>
          <h1 style={styles.logo}>QUICKMED</h1>
          <p style={styles.doctorTitle}>Doctor Portal</p>
          {isMobile && (
            <button 
              style={styles.closeButton}
              onClick={() => setIsSidebarOpen(false)}
            >
              ✕
            </button>
          )}
        </div>
        
        <nav style={styles.navigation}>
          {filteredNavigationItems.map(item => (
            <button
              key={item.id}
              style={{
                ...styles.navButton,
                ...(activePage === item.id && styles.navButtonActive)
              }}
              onClick={() => {
                setActivePage(item.id);
                if (isMobile) setIsSidebarOpen(false);
              }}
            >
              <span style={styles.navIcon}>{item.icon}</span>
              <span style={styles.navLabel}>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Fixed Profile Section */}
        <div style={styles.bottomSection}>
          <div style={styles.profileSection}>
            <button 
              style={styles.profileButton}
              onClick={() => setShowProfileModal(true)}
            >
              <div style={styles.userInfo}>
                <div style={styles.userAvatar}>👨‍⚕️</div>
                <div style={styles.userDetails}>
                  <p style={styles.userName}>Dr. {userProfile.fullName?.split(' ')[0] || 'User'}</p>
                  <p style={styles.userSpecialization}>{userProfile.specialization || 'General Physician'}</p>
                </div>
              </div>
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
      </div>
    </>
  );
};

const styles = {
  sidebar: {
    backgroundColor: '#7C2A62',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    position: 'fixed',
    height: '100vh',
    left: 0,
    top: 0,
    zIndex: 1000,
    transition: 'transform 0.3s ease',
    overflow: 'hidden',
    justifyContent: 'space-between'
  },
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 999
  },
  sidebarHeader: {
    padding: '30px 24px 20px',
    borderBottom: '1px solid rgba(255,255,255,0.1)',
    position: 'relative',
    flexShrink: 0
  },
  closeButton: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    background: 'none',
    border: 'none',
    color: 'white',
    fontSize: '20px',
    cursor: 'pointer'
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
    padding: '20px 0',
    overflow: 'hidden',
    flexShrink: 1
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
  bottomSection: {
    flexShrink: 0,
    borderTop: '1px solid rgba(255,255,255,0.1)'
  },
  profileSection: {
    padding: '16px 24px 8px'
  },
  profileButton: {
    width: '100%',
    padding: '0',
    backgroundColor: 'transparent',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    textAlign: 'left',
    transition: 'background-color 0.3s ease'
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px',
    borderRadius: '6px',
    transition: 'background-color 0.3s ease'
  },
  userAvatar: {
    fontSize: '32px',
    flexShrink: 0,
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  userDetails: {
    flex: 1,
    minWidth: 0
  },
  userName: {
    margin: '0 0 4px 0',
    fontWeight: '600',
    fontSize: '14px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  userSpecialization: {
    margin: 0,
    fontSize: '12px',
    opacity: 0.8,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  sidebarFooter: {
    padding: '8px 24px 20px'
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
  }
};

export default DoctorSidebar;