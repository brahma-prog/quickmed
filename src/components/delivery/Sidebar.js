import React, { useState, useEffect } from 'react';

const Sidebar = ({ activePage, setActivePage, profileData, isOnline, onLogout, onToggleAIChat }) => {
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const [screenSize, setScreenSize] = useState(getScreenSize());
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Helper function to determine screen size
  function getScreenSize() {
    const width = window.innerWidth;
    if (width < 640) return 'xs';      // Mobile
    else if (width < 768) return 'sm'; // Small tablet
    else if (width < 1024) return 'md'; // Tablet
    else if (width < 1280) return 'lg'; // Laptop
    else return 'xl';                  // Desktop
  }

  // Handle screen resize with debouncing
  useEffect(() => {
    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        setScreenSize(getScreenSize());
        // Auto-close mobile menu on larger screens
        if (window.innerWidth >= 1024) {
          setIsSidebarOpen(false);
        }
      }, 100);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      const sidebar = document.querySelector('.sidebar-container');
      const hamburger = document.querySelector('.hamburger-menu');
      if (isSidebarOpen && 
          sidebar && 
          !sidebar.contains(event.target) && 
          hamburger && 
          !hamburger.contains(event.target)) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isSidebarOpen]);

  const handleNavClick = (itemId) => {
    setActivePage(itemId);
    // Close sidebar on mobile after selection
    if (screenSize === 'xs' || screenSize === 'sm') {
      setIsSidebarOpen(false);
    }
  };

  const handleProfileImageClick = () => {
    setShowProfilePopup(true);
    if (screenSize === 'xs' || screenSize === 'sm') {
      setIsSidebarOpen(false);
    }
  };

  const handleClosePopup = () => {
    setShowProfilePopup(false);
  };

  const handleViewFullProfile = () => {
    setActivePage('profile');
    setShowProfilePopup(false);
    if (screenSize === 'xs' || screenSize === 'sm') {
      setIsSidebarOpen(false);
    }
  };

  // Responsive dimensions based on screen size
  const getResponsiveStyles = () => {
    const styles = {
      // Layout
      sidebarWidth: {
        xs: '280px',     // Fixed width on mobile
        sm: '300px',     // Fixed width on small tablets
        md: '280px',     // Slightly smaller for tablets
        lg: '260px',     // Compact for laptops
        xl: '280px',     // Standard for desktops
      },
      sidebarHeight: {
        xs: '100vh',     // Full height on mobile
        sm: '100vh',     // Full height on tablets
        md: '100vh',     // Full height on tablets
        lg: '100vh',     // Full height on laptops
        xl: '100vh',     // Full height on desktops
      },
      sidebarPosition: {
        xs: 'fixed',     // Fixed on mobile
        sm: 'fixed',     // Fixed on small tablets
        md: 'fixed',     // Fixed on tablets
        lg: 'fixed',     // Fixed on laptops
        xl: 'fixed',     // Fixed on desktops
      },
      topSpacing: {
        xs: '0',         // No top spacing on mobile
        sm: '0',         // No top spacing on tablets
        md: '0',         // No top spacing on tablets
        lg: '0',         // No top spacing on laptops
        xl: '0',         // No top spacing on desktops
      },
      leftSpacing: {
        xs: isSidebarOpen ? '0' : '-100%', // Off-screen when closed
        sm: isSidebarOpen ? '0' : '-100%', // Off-screen when closed
        md: '0',         // Always visible on tablets
        lg: '0',         // Always visible on laptops
        xl: '0',         // Always visible on desktops
      },
      zIndex: {
        xs: 1000,        // High z-index for mobile overlay
        sm: 1000,        // High z-index for tablet overlay
        md: 100,         // Normal z-index
        lg: 100,         // Normal z-index
        xl: 100,         // Normal z-index
      },
      display: {
        xs: 'flex',      // Flex on mobile
        sm: 'flex',      // Flex on tablets
        md: 'flex',      // Flex on tablets
        lg: 'flex',      // Flex on laptops
        xl: 'flex',      // Flex on desktops
      },

      // Header
      headerPadding: {
        xs: '16px 20px', // Compact padding
        sm: '20px 24px', // Standard padding
        md: '24px 20px 20px', // Original padding
        lg: '24px 20px 20px', // Original padding
        xl: '24px 20px 20px', // Original padding
      },
      logoSize: {
        xs: '32px',      // Small logo
        sm: '40px',      // Medium logo
        md: '48px',      // Large logo
        lg: '48px',      // Large logo
        xl: '48px',      // Large logo
      },
      mainTitleFont: {
        xs: '22px',      // Smaller title
        sm: '24px',      // Medium title
        md: '28px',      // Large title
        lg: '28px',      // Large title
        xl: '28px',      // Large title
      },
      subtitleFont: {
        xs: '12px',      // Small subtitle
        sm: '13px',      // Medium subtitle
        md: '14px',      // Standard subtitle
        lg: '14px',      // Standard subtitle
        xl: '14px',      // Standard subtitle
      },

      // Profile Section - FIXED: Changed 'none' to 'flex' for mobile
      profileDisplay: {
        xs: 'flex',      // FIXED: Now visible on mobile
        sm: 'flex',      // Visible on tablets
        md: 'flex',      // Visible on tablets
        lg: 'flex',      // Visible on laptops
        xl: 'flex',      // Visible on desktops
      },
      profilePadding: {
        xs: '14px 16px', // Adjusted padding for mobile
        sm: '14px 18px', // Standard
        md: '16px 20px', // Original
        lg: '16px 20px', // Original
        xl: '16px 20px', // Original
      },
      avatarSize: {
        xs: '36px',      // Adjusted for better visibility on mobile
        sm: '36px',      // Medium avatar
        md: '40px',      // Standard avatar
        lg: '40px',      // Standard avatar
        xl: '40px',      // Standard avatar
      },
      userNameFont: {
        xs: '14px',      // Adjusted for mobile readability
        sm: '13px',      // Medium name
        md: '14px',      // Standard name
        lg: '14px',      // Standard name
        xl: '14px',      // Standard name
      },

      // Navigation
      navDirection: {
        xs: 'column',    // Vertical on mobile
        sm: 'column',    // Vertical on tablets
        md: 'column',    // Vertical on tablets
        lg: 'column',    // Vertical on laptops
        xl: 'column',    // Vertical on desktops
      },
      navPadding: {
        xs: '16px 0',    // Adjusted padding for mobile
        sm: '20px 0',    // Standard padding
        md: '20px 0',    // Standard padding
        lg: '20px 0',    // Standard padding
        xl: '20px 0',    // Standard padding
      },
      navButtonPadding: {
        xs: '12px 16px', // Adjusted for mobile
        sm: '14px 20px', // Standard padding
        md: '14px 24px', // Standard padding
        lg: '14px 24px', // Standard padding
        xl: '14px 24px', // Standard padding
      },
      navFontSize: {
        xs: '14px',      // Smaller text for mobile
        sm: '15px',      // Standard text
        md: '15px',      // Standard text
        lg: '15px',      // Standard text
        xl: '15px',      // Standard text
      },
      navIconSize: {
        xs: '18px',      // Smaller icons for mobile
        sm: '20px',      // Standard icons
        md: '20px',      // Standard icons
        lg: '20px',      // Standard icons
        xl: '20px',      // Standard icons
      },

      // Footer
      footerDisplay: {
        xs: 'block',     // Visible on mobile (at bottom)
        sm: 'block',     // Visible on tablets
        md: 'block',     // Visible on tablets
        lg: 'block',     // Visible on laptops
        xl: 'block',     // Visible on desktops
      },
      footerPadding: {
        xs: '16px 20px', // Compact padding
        sm: '20px 20px', // Standard padding
        md: '20px 20px', // Standard padding
        lg: '20px 20px', // Standard padding
        xl: '20px 20px', // Standard padding
      },
    };

    return {
      sidebar: {
        width: styles.sidebarWidth[screenSize],
        backgroundColor: '#E0F2F1',
        color: '#124441',
        display: styles.display[screenSize],
        flexDirection: 'column',
        position: styles.sidebarPosition[screenSize],
        height: styles.sidebarHeight[screenSize],
        left: styles.leftSpacing[screenSize],
        top: styles.topSpacing[screenSize],
        overflow: 'hidden',
        borderRight: '1px solid #4DB6AC',
        zIndex: styles.zIndex[screenSize],
        boxShadow: (screenSize === 'xs' || screenSize === 'sm') && isSidebarOpen 
          ? '0 4px 20px rgba(0, 0, 0, 0.15)' 
          : 'none',
        transition: 'left 0.3s ease-in-out, width 0.3s ease-in-out',
        maxWidth: '100%',
      },
      // Header section
      sidebarHeader: {
        padding: styles.headerPadding[screenSize],
        borderBottom: '1px solid #E0F2F1',
        display: 'flex',
        flexShrink: 0,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: '12px',
      },
      logoContainer: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        flexDirection: 'row',
      },
      logoWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        width: styles.logoSize[screenSize],
        height: styles.logoSize[screenSize],
        borderRadius: '8px',
        overflow: 'hidden',
      },
      logoImage: {
        width: '100%',
        height: '100%',
        objectFit: 'contain',
      },
      titleContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '4px',
      },
      mainTitle: {
        fontSize: styles.mainTitleFont[screenSize],
        fontWeight: '800',
        color: '#009688',
        margin: 0,
        lineHeight: 1,
        letterSpacing: '0.5px',
      },
      subtitle: {
        fontSize: styles.subtitleFont[screenSize],
        color: '#4F6F6B',
        margin: 0,
        fontWeight: '500',
        opacity: 0.9,
        textAlign: 'left',
      },
      // Profile section - NOW VISIBLE ON MOBILE
      profileSection: {
        padding: styles.profilePadding[screenSize],
        borderBottom: '1px solid #E0F2F1',
        backgroundColor: '#F8FAFC',
        display: styles.profileDisplay[screenSize],
        alignItems: 'center',
        justifyContent: 'space-between',
        flexShrink: 0,
      },
      profileInfo: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        width: '100%',
      },
      userAvatar: {
        position: 'relative',
        cursor: 'pointer',
        flexShrink: 0,
      },
      sidebarProfileImage: {
        width: styles.avatarSize[screenSize],
        height: styles.avatarSize[screenSize],
        borderRadius: '50%',
        objectFit: 'cover',
        border: '2px solid #4DB6AC',
        cursor: 'pointer',
      },
      sidebarAvatarPlaceholder: {
        width: styles.avatarSize[screenSize],
        height: styles.avatarSize[screenSize],
        borderRadius: '50%',
        backgroundColor: '#E0F2F1',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: screenSize === 'xs' ? '14px' : '16px',
        border: '2px solid #4DB6AC',
        cursor: 'pointer',
        color: '#009688',
        overflow: 'hidden',
        fontWeight: 'bold',
      },
      userDetails: {
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        flex: 1,
        minWidth: 0, // For text truncation
      },
      userName: {
        margin: 0,
        fontWeight: '600',
        fontSize: styles.userNameFont[screenSize],
        color: '#124441',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      },
      statusContainer: {
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        flexWrap: 'wrap',
      },
      statusLabel: {
        fontSize: screenSize === 'xs' ? '11px' : '12px',
        color: '#4F6F6B',
        opacity: 0.9,
        flexShrink: 0,
      },
      statusValue: {
        fontSize: screenSize === 'xs' ? '11px' : '12px',
        fontWeight: '600',
        color: isOnline ? '#4DB6AC' : '#9CA3AF',
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
      },
      statusDot: {
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        backgroundColor: isOnline ? '#4DB6AC' : '#9CA3AF',
        flexShrink: 0,
      },
      // Navigation section
      navigationContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        width: '100%',
      },
      navigation: {
        flex: 1,
        padding: styles.navPadding[screenSize],
        display: 'flex',
        flexDirection: styles.navDirection[screenSize],
        alignItems: 'stretch',
        justifyContent: 'flex-start',
        width: 'auto',
        gap: '4px',
        overflow: 'hidden',
      },
      navButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
        padding: styles.navButtonPadding[screenSize],
        backgroundColor: 'transparent',
        border: 'none',
        color: '#4F6F6B',
        fontSize: styles.navFontSize[screenSize],
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        opacity: 0.9,
        position: 'relative',
        overflow: 'hidden',
        flexDirection: 'row',
        textAlign: 'left',
        flex: 'none',
        boxSizing: 'border-box',
        margin: '0 4px',
        borderRadius: '8px',
        whiteSpace: 'nowrap',
      },
      navButtonActive: {
        backgroundColor: '#E0F2F1',
        opacity: 1,
        color: '#009688',
        fontWeight: '600',
        borderLeft: '4px solid #009688',
      },
      navIcon: {
        marginRight: screenSize === 'xs' ? '12px' : '14px',
        width: styles.navIconSize[screenSize],
        height: styles.navIconSize[screenSize],
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: screenSize === 'xs' ? '16px' : '18px',
        fontWeight: 'bold',
      },
      navLabel: {
        fontWeight: '500',
        fontSize: styles.navFontSize[screenSize],
        whiteSpace: 'nowrap',
        letterSpacing: '0.3px',
      },
      // Footer section
      sidebarFooter: {
        padding: styles.footerPadding[screenSize],
        backgroundColor: '#FFFFFF',
        flexShrink: 0,
        display: styles.footerDisplay[screenSize],
        borderTop: 'none',
      },
      logoutButton: {
        width: '100%',
        padding: screenSize === 'xs' ? '10px 14px' : '12px 16px',
        backgroundColor: '#E0F2F1',
        color: '#124441',
        border: '1px solid #4DB6AC',
        borderRadius: '8px',
        cursor: 'pointer',
        fontWeight: '600',
        fontSize: screenSize === 'xs' ? '13px' : '14px',
        transition: 'all 0.3s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        letterSpacing: '0.5px',
      },
      logoutIcon: {
        fontSize: screenSize === 'xs' ? '14px' : '16px',
        fontWeight: 'bold',
      },
      // Hamburger menu for mobile - Fixed to right top corner
      hamburgerMenu: {
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 1001,
        display: (screenSize === 'xs' || screenSize === 'sm') ? 'flex' : 'none',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '30px',
        height: '24px',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: '0',
      },
      hamburgerLine: {
        width: '100%',
        height: '3px',
        backgroundColor: '#009688',
        borderRadius: '3px',
        transition: 'all 0.3s ease',
      },
      hamburgerLineTop: {
        transform: isSidebarOpen ? 'rotate(45deg) translate(6px, 7px)' : 'none',
      },
      hamburgerLineMiddle: {
        opacity: isSidebarOpen ? 0 : 1,
      },
      hamburgerLineBottom: {
        transform: isSidebarOpen ? 'rotate(-45deg) translate(6px, -7px)' : 'none',
      },
      // Profile Popup Styles
      profilePopup: {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#FFFFFF',
        borderRadius: '12px',
        padding: screenSize === 'xs' ? '20px' : '24px',
        width: screenSize === 'xs' ? '90vw' : 
               screenSize === 'sm' ? '85vw' : 
               screenSize === 'md' ? '70vw' : '400px',
        maxWidth: '500px',
        maxHeight: '80vh',
        overflow: 'auto',
        boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
        zIndex: 2000,
        color: '#124441',
        border: '1px solid #4DB6AC',
      },
      overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.3)',
        zIndex: 1999,
      },
      popupHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '20px',
        paddingBottom: '16px',
        borderBottom: '1px solid #E0F2F1',
      },
      popupTitle: {
        fontSize: screenSize === 'xs' ? '18px' : '20px',
        fontWeight: '600',
        color: '#009688',
        margin: 0,
      },
      popupCloseButton: {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        color: '#4F6F6B',
        padding: '4px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '24px',
        fontWeight: 'bold',
      },
      profileDetails: {
        display: 'grid',
        gap: '16px',
      },
      detailRow: {
        display: 'flex',
        flexDirection: screenSize === 'xs' ? 'column' : 'row',
        justifyContent: 'space-between',
        alignItems: screenSize === 'xs' ? 'flex-start' : 'flex-start',
        padding: '12px 0',
        borderBottom: '1px solid #F8FAFC',
        gap: screenSize === 'xs' ? '4px' : '0',
      },
      detailLabel: {
        fontWeight: '500',
        color: '#4F6F6B',
        fontSize: screenSize === 'xs' ? '13px' : '14px',
        minWidth: screenSize === 'xs' ? 'auto' : '80px',
      },
      detailValue: {
        fontWeight: '400',
        color: '#124441',
        fontSize: screenSize === 'xs' ? '13px' : '14px',
        textAlign: screenSize === 'xs' ? 'left' : 'right',
        flex: 1,
        wordBreak: 'break-word',
      },
      notProvided: {
        color: '#9CA3AF',
        fontStyle: 'italic',
      },
      popupActions: {
        display: 'flex',
        gap: '12px',
        marginTop: '24px',
      },
      fullProfileButton: {
        flex: 1,
        padding: '12px',
        backgroundColor: '#009688',
        color: '#FFFFFF',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontWeight: '500',
        fontSize: '14px',
        transition: 'background-color 0.3s ease',
      },
      // Mobile overlay when sidebar is open
      mobileOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: 999,
        display: (screenSize === 'xs' || screenSize === 'sm') && isSidebarOpen ? 'block' : 'none',
      },
    };
  };

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'earnings', label: 'Earnings', icon: '💰' },
    { id: 'performance', label: 'Performance', icon: '📈' },
    { id: 'tasks', label: 'Delivery History', icon: '🚚' },
  ];

  const getDisplayName = () => {
    return profileData.fullName || 'Jagan';
  };

  const getProfileData = () => {
    return {
      name: profileData.fullName || 'Jagan',
      email: profileData.email || 'del@gmail.com',
      phone: profileData.phone || '+91 73829 70467',
      age: profileData.age || 'Not provided',
      city: profileData.city || 'Vishakapatanam',
      address: profileData.address || 'A Square buildings',
    };
  };

  const styles = getResponsiveStyles();
  const profileInfo = getProfileData();

  return (
    <>
      {/* Hamburger Menu for Mobile - Fixed to right top corner */}
      {(screenSize === 'xs' || screenSize === 'sm') && (
        <button 
          className="hamburger-menu"
          style={styles.hamburgerMenu}
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <span style={{...styles.hamburgerLine, ...styles.hamburgerLineTop}}></span>
          <span style={{...styles.hamburgerLine, ...styles.hamburgerLineMiddle}}></span>
          <span style={{...styles.hamburgerLine, ...styles.hamburgerLineBottom}}></span>
        </button>
      )}

      {/* Mobile Overlay */}
      <div 
        style={styles.mobileOverlay}
        onClick={() => setIsSidebarOpen(false)}
      />

      {/* Sidebar */}
      <div className="sidebar-container" style={styles.sidebar}>
        {/* Top Section - Header and Profile */}
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden', width: '100%' }}>
          {/* Header with Logo, QUICKMED and Delivery Portal */}
          <div style={styles.sidebarHeader}>
            <div style={styles.logoContainer}>
              <div style={styles.logoWrapper}>
                <img 
                  src="/QuickMed_logo.png" 
                  alt="QUICKMED Logo" 
                  style={styles.logoImage}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = '<div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: #009688; color: white; font-weight: bold; font-size: 18px;">QM</div>';
                  }}
                />
              </div>
              <div style={styles.titleContainer}>
                <h1 style={styles.mainTitle}>QUICKMED</h1>
                <p style={styles.subtitle}>Delivery Portal</p>
              </div>
            </div>
          </div>

          {/* Profile Section with Delivery Online status - NOW VISIBLE ON MOBILE */}
          <div style={styles.profileSection}>
            <div style={styles.profileInfo}>
              <div style={styles.userAvatar} onClick={handleProfileImageClick}>
                {profileData.profileImage ? (
                  <img 
                    src={profileData.profileImage} 
                    alt="Profile" 
                    style={styles.sidebarProfileImage}
                  />
                ) : (
                  <div style={styles.sidebarAvatarPlaceholder}>
                    👤
                  </div>
                )}
              </div>
              <div style={styles.userDetails}>
                <p style={styles.userName}>{getDisplayName()}</p>
                <div style={styles.statusContainer}>
                  <span style={styles.statusLabel}>Delivery</span>
                  <span style={styles.statusValue}>
                    <span style={styles.statusDot}></span>
                    {isOnline ? 'Online' : 'Offline'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Menu */}
          <div style={styles.navigationContainer}>
            <nav style={styles.navigation}>
              {navigationItems.map(item => {
                const isActive = activePage === item.id;
                
                return (
                  <button
                    key={item.id}
                    style={{
                      ...styles.navButton,
                      ...(isActive ? styles.navButtonActive : {}),
                    }}
                    onClick={() => handleNavClick(item.id)}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor = '#F8FAFC';
                        e.currentTarget.style.color = '#124441';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = isActive ? '#009688' : '#4F6F6B';
                      }
                    }}
                  >
                    <span style={styles.navIcon}>
                      {item.icon}
                    </span>
                    <span style={styles.navLabel}>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Footer with Logout */}
        <div style={styles.sidebarFooter}>
          <button 
            style={styles.logoutButton} 
            onClick={onLogout}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#4DB6AC';
              e.currentTarget.style.color = '#FFFFFF';
              e.currentTarget.style.borderColor = '#4DB6AC';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#E0F2F1';
              e.currentTarget.style.color = '#124441';
              e.currentTarget.style.borderColor = '#4DB6AC';
            }}
          >
            <span style={styles.logoutIcon}></span>
            Logout
          </button>
        </div>
      </div>

      {/* Profile Popup */}
      {showProfilePopup && (
        <>
          <div style={styles.overlay} onClick={handleClosePopup}></div>
          <div style={styles.profilePopup}>
            <div style={styles.popupHeader}>
              <h2 style={styles.popupTitle}>Profile Details</h2>
              <button style={styles.popupCloseButton} onClick={handleClosePopup}>
                ×
              </button>
            </div>
            
            <div style={styles.profileDetails}>
              <div style={styles.detailRow}>
                <span style={styles.detailLabel}>Name:</span>
                <span style={styles.detailValue}>{profileInfo.name}</span>
              </div>
              <div style={styles.detailRow}>
                <span style={styles.detailLabel}>Email:</span>
                <span style={styles.detailValue}>{profileInfo.email}</span>
              </div>
              <div style={styles.detailRow}>
                <span style={styles.detailLabel}>Phone:</span>
                <span style={styles.detailValue}>{profileInfo.phone}</span>
              </div>
              <div style={styles.detailRow}>
                <span style={styles.detailLabel}>Age:</span>
                <span style={{...styles.detailValue, ...(profileInfo.age === 'Not provided' && styles.notProvided)}}>
                  {profileInfo.age}
                </span>
              </div>
              <div style={styles.detailRow}>
                <span style={styles.detailLabel}>City:</span>
                <span style={styles.detailValue}>{profileInfo.city}</span>
              </div>
              <div style={styles.detailRow}>
                <span style={styles.detailLabel}>Address:</span>
                <span style={styles.detailValue}>{profileInfo.address}</span>
              </div>
            </div>

            <div style={styles.popupActions}>
              <button 
                style={styles.fullProfileButton} 
                onClick={handleViewFullProfile}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#4DB6AC';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#009688';
                }}
              >
                View Full Profile
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Sidebar;