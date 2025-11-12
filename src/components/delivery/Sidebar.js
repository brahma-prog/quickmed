import React from 'react';

const Sidebar = ({ activePage, setActivePage, profileData, isOnline, onLogout, onToggleAIChat }) => {
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
      marginRight: '12px',
      position: 'relative'
    },
    sidebarProfileImage: {
      width: '48px',
      height: '48px',
      borderRadius: '50%',
      objectFit: 'cover',
      border: '2px solid rgba(255,255,255,0.3)'
    },
    sidebarAvatarPlaceholder: {
      width: '48px',
      height: '48px',
      borderRadius: '50%',
      backgroundColor: 'rgba(255,255,255,0.2)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '20px',
      border: '2px solid rgba(255,255,255,0.3)'
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
    statusDot: {
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      display: 'inline-block'
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
    sidebarActions: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px'
    },
    aiSidebarButton: {
      width: '100%',
      padding: '12px',
      backgroundColor: 'rgba(255,255,255,0.15)',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontWeight: '500',
      fontSize: '14px',
      transition: 'background-color 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px'
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

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'tasks', label: 'Delivery History', icon: '📦' },
    { id: 'earnings', label: 'Earnings', icon: '💰' },
    { id: 'performance', label: 'Performance', icon: '📈' }
  ];

  const getDisplayName = () => {
    return profileData.fullName;
  };

  return (
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
            <div style={styles.userAvatar}>
              {profileData.profileImage ? (
                <img 
                  src={profileData.profileImage} 
                  alt="Profile" 
                  style={styles.sidebarProfileImage}
                />
              ) : (
                <div style={styles.sidebarAvatarPlaceholder}>👤</div>
              )}
            </div>
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

        <div style={styles.sidebarActions}>
          <button style={styles.logoutButton} onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;