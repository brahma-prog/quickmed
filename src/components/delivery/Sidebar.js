import React, { useState, useRef } from 'react';

const Sidebar = ({ 
  activePage, 
  setActivePage, 
  profileData, 
  isOnline, 
  onLogout, 
  onToggleAIChat, 
  isMobile, 
  onProfileUpdate 
}) => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({ ...profileData });
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  // Default profile update function if not provided
  const defaultOnProfileUpdate = (updatedProfile) => {
    console.log('Profile update requested:', updatedProfile);
    return Promise.resolve(); // Return a resolved promise for async handling
  };

  // Use provided function or fallback to default
  const handleProfileUpdate = onProfileUpdate || defaultOnProfileUpdate;

  const styles = {
    // Desktop Sidebar
    sidebar: {
      width: isMobile ? '100%' : '280px',
      backgroundColor: '#7C2A62',
      color: 'white',
      display: 'flex',
      flexDirection: isMobile ? 'row' : 'column',
      position: 'fixed',
      height: isMobile ? '60px' : '100vh',
      left: 0,
      top: 0,
      zIndex: 1000,
      boxShadow: isMobile ? '0 2px 10px rgba(0,0,0,0.1)' : 'none',
    },
    
    // Desktop Header with Profile
    sidebarHeader: {
      padding: '20px 24px',
      borderBottom: '1px solid rgba(255,255,255,0.1)',
      display: isMobile ? 'none' : 'block',
    },
    
    // Updated: Title section with logo
    titleSection: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      marginBottom: '20px',
    },
    
    appLogo: {
      width: '40px',
      height: '40px',
      borderRadius: '8px',
      objectFit: 'cover',
    },
    
    appTitle: {
      fontSize: '20px',
      fontWeight: '700',
      margin: '0 0 4px 0',
      color: 'white',
    },
    
    appSubtitle: {
      fontSize: '12px',
      opacity: 0.8,
      margin: 0,
      color: 'white',
    },
    
    // Updated: Profile section below title
    profileSection: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      marginBottom: '10px',
      cursor: 'pointer',
      padding: '12px',
      borderRadius: '8px',
      transition: 'background-color 0.3s ease',
    },
    
    profileImage: {
      width: '50px',
      height: '50px',
      borderRadius: '50%',
      objectFit: 'cover',
      border: '2px solid rgba(255,255,255,0.3)',
    },
    
    profileImagePlaceholder: {
      width: '50px',
      height: '50px',
      borderRadius: '50%',
      backgroundColor: 'rgba(255,255,255,0.2)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: '2px solid rgba(255,255,255,0.3)',
      fontSize: '20px',
    },
    
    profileInfo: {
      flex: 1,
    },
    
    profileName: {
      fontSize: '16px',
      fontWeight: '600',
      margin: '0 0 4px 0',
      color: 'white',
    },
    
    profileStatus: {
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      fontSize: '12px',
      opacity: 0.8,
    },
    
    statusDot: {
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      backgroundColor: isOnline ? '#10B981' : '#6B7280',
    },
    
    // Desktop Navigation
    desktopNav: {
      flex: 1,
      padding: '20px 0',
      display: isMobile ? 'none' : 'flex',
      flexDirection: 'column',
      gap: '0',
    },
    
    // Mobile Navigation
    mobileNav: {
      flex: 1,
      display: isMobile ? 'flex' : 'none',
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      height: '60px',
      position: 'relative',
    },
    
    // Common Nav Button
    navButton: {
      display: 'flex',
      alignItems: 'center',
      backgroundColor: 'transparent',
      border: 'none',
      color: 'white',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      opacity: 0.8,
      
      // Desktop styles
      ...(!isMobile && {
        width: '100%',
        padding: '16px 24px',
        fontSize: '16px',
        flexDirection: 'row',
        gap: '12px',
        borderRadius: '0',
        justifyContent: 'flex-start',
      }),
      
      // Mobile styles
      ...(isMobile && {
        flexDirection: 'column',
        padding: '8px 4px',
        fontSize: '12px',
        gap: '4px',
        borderRadius: '8px',
        justifyContent: 'center',
        flex: 1,
        minHeight: '60px',
        maxWidth: '80px',
      }),
    },
    
    navButtonActive: {
      backgroundColor: isMobile ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.1)',
      opacity: 1,
      ...(!isMobile && {
        borderRight: '4px solid #F7D9EB',
      }),
    },
    
    navIcon: {
      ...(!isMobile && {
        fontSize: '20px',
        marginRight: '12px',
        width: '24px',
        textAlign: 'center',
      }),
      ...(isMobile && {
        fontSize: '16px',
        marginRight: '0',
      }),
    },
    
    navLabel: {
      fontWeight: '500',
      ...(!isMobile && {
        fontSize: '16px',
        textAlign: 'left',
      }),
      ...(isMobile && {
        fontSize: '10px',
        textAlign: 'center',
        lineHeight: '1.2',
      }),
    },
    
    // Desktop Footer
    sidebarFooter: {
      padding: '20px 24px',
      borderTop: '1px solid rgba(255,255,255,0.1)',
      display: isMobile ? 'none' : 'block',
    },
    
    profileButton: {
      width: '100%',
      padding: '12px',
      backgroundColor: 'rgba(255,255,255,0.15)',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontWeight: '500',
      fontSize: '14px',
      transition: 'all 0.3s ease',
      marginBottom: '12px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      justifyContent: 'center',
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
    },
    
    // Mobile Menu
    mobileMenuButton: {
      backgroundColor: 'transparent',
      border: 'none',
      color: 'white',
      fontSize: '20px',
      cursor: 'pointer',
      padding: '8px',
      borderRadius: '6px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: '40px',
    },
    
    mobileMenuOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      zIndex: 999,
    },
    
    mobileMenuPanel: {
      position: 'fixed',
      top: '60px',
      right: '10px',
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
      padding: '16px',
      minWidth: '200px',
      zIndex: 1000,
    },
    
    mobileMenuItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '12px 16px',
      backgroundColor: 'transparent',
      border: 'none',
      width: '100%',
      textAlign: 'left',
      cursor: 'pointer',
      borderRadius: '8px',
      fontSize: '14px',
      color: '#1f2937',
      transition: 'background-color 0.3s ease',
    },
    
    mobileMenuIcon: {
      fontSize: '16px',
      width: '20px',
    },
    
    mobileMenuDivider: {
      height: '1px',
      backgroundColor: '#e5e7eb',
      margin: '8px 0',
    },
    
    mobileProfileInfo: {
      padding: '12px 16px',
      borderBottom: '1px solid #e5e7eb',
      marginBottom: '8px',
    },
    
    mobileProfileName: {
      fontSize: '14px',
      fontWeight: '600',
      color: '#1f2937',
      margin: '0 0 4px 0',
    },
    
    mobileProfileId: {
      fontSize: '12px',
      color: '#6b7280',
      margin: 0,
    },

    // Profile Modal Styles
    profileModalOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.7)',
      zIndex: 2000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
    },

    profileModal: {
      backgroundColor: 'white',
      borderRadius: '16px',
      boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
      maxWidth: '500px',
      width: '100%',
      maxHeight: '90vh',
      overflow: 'hidden',
      position: 'relative',
    },

    profileModalHeader: {
      background: 'linear-gradient(135deg, #7C2A62 0%, #9D4B7C 100%)',
      padding: '30px',
      textAlign: 'center',
      position: 'relative',
      color: 'white',
    },

    profileModalBackground: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
      opacity: 0.3,
    },

    profileAvatar: {
      position: 'relative',
      marginBottom: '20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },

    profileImageLarge: {
      width: '100px',
      height: '100px',
      borderRadius: '50%',
      objectFit: 'cover',
      border: '4px solid rgba(255,255,255,0.3)',
      boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
      cursor: 'pointer',
    },

    profileImagePlaceholderLarge: {
      width: '100px',
      height: '100px',
      borderRadius: '50%',
      backgroundColor: 'rgba(255,255,255,0.2)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: '4px solid rgba(255,255,255,0.3)',
      fontSize: '40px',
      margin: '0 auto',
      cursor: 'pointer',
    },

    uploadOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.7)',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontSize: '12px',
      textAlign: 'center',
      padding: '10px',
      cursor: 'pointer',
    },

    uploadText: {
      fontSize: '12px',
      color: 'black',
      marginTop: '8px',
      fontWeight: '500',
      cursor: 'pointer',
    },

    profileModalContent: {
      padding: '30px',
    },

    profileInfoGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '20px',
      marginBottom: '20px',
    },

    profileInfoItem: {
      padding: '15px',
      backgroundColor: '#f8fafc',
      borderRadius: '8px',
      border: '1px solid #e5e7eb',
    },

    profileInfoLabel: {
      fontSize: '12px',
      color: '#6b7280',
      fontWeight: '600',
      textTransform: 'uppercase',
      marginBottom: '5px',
    },

    profileInfoValue: {
      fontSize: '14px',
      color: '#1f2937',
      fontWeight: '500',
    },

    editInput: {
      width: '90%',
      padding: '8px 12px',
      border: '1px solid #d1d5db',
      borderRadius: '6px',
      fontSize: '14px',
      backgroundColor: 'white',
    },

    performanceGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '15px',
      marginTop: '20px',
    },

    performanceItem: {
      textAlign: 'center',
      padding: '15px',
      backgroundColor: '#f8fafc',
      borderRadius: '8px',
      border: '1px solid #e5e7eb',
    },

    performanceValue: {
      fontSize: '18px',
      fontWeight: '700',
      color: '#7C2A62',
      marginBottom: '5px',
    },

    performanceLabel: {
      fontSize: '12px',
      color: '#6b7280',
      fontWeight: '500',
    },

    closeButton: {
      position: 'absolute',
      top: '15px',
      right: '15px',
      backgroundColor: 'rgba(255,255,255,0.2)',
      border: 'none',
      color: 'white',
      borderRadius: '50%',
      width: '32px',
      height: '32px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '16px',
    },

    actionButtons: {
      display: 'flex',
      gap: '12px',
      marginTop: '20px',
      justifyContent: 'flex-end',
    },

    primaryButton: {
      backgroundColor: '#7C2A62',
      color: 'white',
      border: 'none',
      padding: '10px 20px',
      borderRadius: '8px',
      cursor: 'pointer',
      fontWeight: '500',
      fontSize: '14px',
      transition: 'background-color 0.3s ease',
      minWidth: '100px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
    },

    secondaryButton: {
      backgroundColor: 'transparent',
      color: '#7C2A62',
      border: '1px solid #7C2A62',
      padding: '9px 19px',
      borderRadius: '8px',
      cursor: 'pointer',
      fontWeight: '500',
      fontSize: '14px',
      transition: 'all 0.3s ease',
      minWidth: '100px',
    },

    onlineStatus: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      justifyContent: 'center',
      marginTop: '10px',
    },

    agentName: {
      fontSize: '24px',
      fontWeight: '700',
      margin: '0 0 5px 0',
    },

    agentId: {
      fontSize: '16px',
      opacity: 0.9,
      margin: '0 0 10px 0',
    },

    loadingSpinner: {
      width: '16px',
      height: '16px',
      border: '2px solid #ffffff',
      borderTop: '2px solid transparent',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
    },

    editIcon: {
      position: 'absolute',
      top: '10px',
      left: '10px',
      backgroundColor: 'rgba(255,255,255,0.9)',
      border: 'none',
      borderRadius: '50%',
      width: '32px',
      height: '32px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '14px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
    },
  };

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'earnings', label: 'Earnings', icon: '💰' },
    { id: 'performance', label: 'Performance', icon: '📈' },
    { id: 'tasks', label: 'History', icon: '📦' },
  ];

  const getDisplayName = () => {
    return profileData.fullName;
  };

  const handleMobileMenuToggle = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  const handleMobileMenuItemClick = (pageId) => {
    setActivePage(pageId);
    setShowMobileMenu(false);
  };

  const handleMobileLogout = () => {
    setShowMobileMenu(false);
    onLogout();
  };

  const handleProfileButtonClick = () => {
    setShowProfileModal(true);
    setIsEditing(false);
    setEditedProfile({ ...profileData });
  };

  const handleCloseProfileModal = () => {
    setShowProfileModal(false);
    setIsEditing(false);
    setEditedProfile({ ...profileData });
  };

  const handleEditToggle = () => {
    if (isEditing) {
      // Cancel editing - reset to original data
      setEditedProfile({ ...profileData });
    }
    setIsEditing(!isEditing);
  };

  const handleSaveProfile = async () => {
    try {
      setIsUploading(true);
      
      // Validate required fields
      if (!editedProfile.fullName?.trim()) {
        alert('Please enter your full name');
        setIsUploading(false);
        return;
      }
      
      if (!editedProfile.email?.trim()) {
        alert('Please enter your email');
        setIsUploading(false);
        return;
      }

      if (!editedProfile.phone?.trim()) {
        alert('Please enter your phone number');
        setIsUploading(false);
        return;
      }

      // Simulate API call
      console.log('Saving profile data:', editedProfile);
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Use the profile update handler
      await handleProfileUpdate(editedProfile);
      
      setIsEditing(false);
      alert('Profile updated successfully!');
      
    } catch (error) {
      console.error('Profile update error:', error);
      alert('Error updating profile. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setEditedProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageUploadClick = () => {
    if (isEditing && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file (JPEG, PNG, etc.).');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size should be less than 5MB.');
      return;
    }

    try {
      setIsUploading(true);
      
      // Simulate upload process
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Create object URL for preview
      const imageUrl = URL.createObjectURL(file);
      
      // Update profile with new image
      setEditedProfile(prev => ({
        ...prev,
        profileImage: imageUrl
      }));

      console.log('Image uploaded successfully:', file.name);
      
    } catch (error) {
      alert('Error uploading image. Please try again.');
    } finally {
      setIsUploading(false);
      event.target.value = ''; // Reset file input
    }
  };

  const renderEditableField = (field, value, label) => {
    if (isEditing) {
      return (
        <input
          type="text"
          value={value || ''}
          onChange={(e) => handleInputChange(field, e.target.value)}
          style={styles.editInput}
          placeholder={`Enter ${label.toLowerCase()}`}
        />
      );
    }
    return <div style={styles.profileInfoValue}>{value || 'Not set'}</div>;
  };

  return (
    <>
      <div style={styles.sidebar}>
        {/* Desktop Sidebar */}
        {!isMobile && (
          <>
            <div style={styles.sidebarHeader}>
              {/* Title Section with Logo */}
              <div style={styles.titleSection}>
                <img 
                  src="/Quickmed img.png" // Using logo from public folder
                  alt="QuickMed Logo" 
                  style={styles.appLogo}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
                {/* Fallback if logo doesn't exist */}
                <div>
                  <h1 style={styles.appTitle}>QUICKMED</h1>
                  <p style={styles.appSubtitle}>Delivery Portal</p>
                </div>
              </div>

              {/* Profile Section - Below the title */}
              <div 
                style={styles.profileSection}
                onClick={handleProfileButtonClick}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                {profileData.profileImage ? (
                  <img 
                    src={profileData.profileImage} 
                    alt="Profile" 
                    style={styles.profileImage}
                  />
                ) : (
                  <div style={styles.profileImagePlaceholder}>
                    👤
                  </div>
                )}
                <div style={styles.profileInfo}>
                  <h3 style={styles.profileName}>{getDisplayName()}</h3>
                  <div style={styles.profileStatus}>
                    <span style={styles.statusDot}></span>
                    <span>{isOnline ? 'Online' : 'Offline'}</span>
                    {/* Removed Agent ID from sidebar */}
                  </div>
                </div>
              </div>
            </div>

            <nav style={styles.desktopNav}>
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
              <button style={styles.logoutButton} onClick={onLogout}>
                🚪 Logout
              </button>
            </div>
          </>
        )}

        {/* Mobile Navigation Bar */}
        {isMobile && (
          <nav style={styles.mobileNav}>
            {navigationItems.slice(0, 4).map(item => (
              <button
                key={item.id}
                style={{
                  ...styles.navButton,
                  ...(activePage === item.id ? styles.navButtonActive : {})
                }}
                onClick={() => setActivePage(item.id)}
              >
                <span style={styles.navIcon}>{item.icon}</span>
                <span style={styles.navLabel}>
                  {item.label}
                </span>
              </button>
            ))}
            
            {/* Mobile Menu Button */}
            <button
              style={styles.mobileMenuButton}
              onClick={handleMobileMenuToggle}
              title="Menu"
            >
              ⋮
            </button>
          </nav>
        )}
      </div>

      {/* Mobile Menu Overlay */}
      {isMobile && showMobileMenu && (
        <div 
          style={styles.mobileMenuOverlay}
          onClick={() => setShowMobileMenu(false)}
        />
      )}

      {/* Mobile Menu Panel */}
      {isMobile && showMobileMenu && (
        <div style={styles.mobileMenuPanel}>
          <div style={styles.mobileProfileInfo}>
            <p style={styles.mobileProfileName}>{getDisplayName()}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
              <span style={{
                ...styles.statusDot,
                backgroundColor: isOnline ? '#10B981' : '#6B7280'
              }}></span>
              <span style={{ fontSize: '12px', color: '#6b7280' }}>
                {isOnline ? 'Online' : 'Offline'}
              </span>
            </div>
          </div>

          <button
            style={styles.mobileMenuItem}
            onClick={() => handleMobileMenuItemClick('tasks')}
          >
            <span style={styles.mobileMenuIcon}>📦</span>
            History
          </button>

          <button
            style={styles.mobileMenuItem}
            onClick={onToggleAIChat}
          >
            <span style={styles.mobileMenuIcon}>🤖</span>
            AI Assistant
          </button>

          <button
            style={styles.mobileMenuItem}
            onClick={handleProfileButtonClick}
          >
            <span style={styles.mobileMenuIcon}>👤</span>
            Edit Profile
          </button>

          <div style={styles.mobileMenuDivider} />

          <button
            style={{
              ...styles.mobileMenuItem,
              color: '#EF4444',
              fontWeight: '600'
            }}
            onClick={handleMobileLogout}
          >
            <span style={styles.mobileMenuIcon}>🚪</span>
            Logout
          </button>
        </div>
      )}

      {/* Profile Modal */}
      {showProfileModal && (
        <div style={styles.profileModalOverlay} onClick={handleCloseProfileModal}>
          <div style={styles.profileModal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.profileModalHeader}>
              <div style={styles.profileModalBackground}></div>
              <button style={styles.closeButton} onClick={handleCloseProfileModal}>
                ✕
              </button>
              
              {/* Edit Toggle Button */}
              {!isEditing && (
                <button style={styles.editIcon} onClick={handleEditToggle} title="Edit Profile">
                  ✏️
                </button>
              )}

              <div style={styles.profileAvatar}>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  style={{ display: 'none' }}
                />
                
                {editedProfile.profileImage ? (
                  <div style={{ position: 'relative' }}>
                    <img 
                      src={editedProfile.profileImage} 
                      alt="Profile" 
                      style={styles.profileImageLarge}
                      onClick={handleImageUploadClick}
                    />
                    {isEditing && (
                      <div 
                        style={styles.uploadOverlay}
                        onClick={handleImageUploadClick}
                      >
                        {isUploading ? (
                          <div style={styles.loadingSpinner}></div>
                        ) : (
                          'Change Photo'
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  <div 
                    style={styles.profileImagePlaceholderLarge}
                    onClick={handleImageUploadClick}
                  >
                    {isUploading ? (
                      <div style={styles.loadingSpinner}></div>
                    ) : (
                      '👤'
                    )}
                  </div>
                )}
                
                {isEditing && (
                  <div 
                    style={styles.uploadText}
                    onClick={handleImageUploadClick}
                  >
                    {isUploading ? 'Uploading...' : 'Click to upload photo'}
                  </div>
                )}
              </div>

              {isEditing ? (
                <input
                  type="text"
                  value={editedProfile.fullName || ''}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  style={{
                    ...styles.editInput,
                    textAlign: 'center',
                    fontSize: '24px',
                    fontWeight: '700',
                    backgroundColor: 'rgba(255,255,255,0.9)',
                    marginBottom: '10px'
                  }}
                  placeholder="Enter your name"
                />
              ) : (
                <h2 style={styles.agentName}>{getDisplayName()}</h2>
              )}
              
              <p style={styles.agentId}>AGENT ID: {profileData.agentId}</p>
              <div style={styles.onlineStatus}>
                <span style={styles.statusDot}></span>
                <span>{isOnline ? 'Online' : 'Offline'}</span>
              </div>
            </div>

            <div style={styles.profileModalContent}>
              <div style={styles.profileInfoGrid}>
                <div style={styles.profileInfoItem}>
                  <div style={styles.profileInfoLabel}>Email</div>
                  {renderEditableField('email', editedProfile.email, 'Email')}
                </div>
                <div style={styles.profileInfoItem}>
                  <div style={styles.profileInfoLabel}>Phone</div>
                  {renderEditableField('phone', editedProfile.phone, 'Phone')}
                </div>
                <div style={styles.profileInfoItem}>
                  <div style={styles.profileInfoLabel}>Location</div>
                  {renderEditableField('currentLocation', editedProfile.currentLocation, 'Location')}
                </div>
                <div style={styles.profileInfoItem}>
                  <div style={styles.profileInfoLabel}>Vehicle</div>
                  {renderEditableField('vehicleType', editedProfile.vehicleType, 'Vehicle Type')}
                </div>
              </div>

              <div style={styles.performanceGrid}>
                <div style={styles.performanceItem}>
                  <div style={styles.performanceValue}>{profileData.totalDeliveries}</div>
                  <div style={styles.performanceLabel}>Total Deliveries</div>
                </div>
                <div style={styles.performanceItem}>
                  <div style={styles.performanceValue}>{profileData.rating}/5</div>
                  <div style={styles.performanceLabel}>Rating</div>
                </div>
                <div style={styles.performanceItem}>
                  <div style={styles.performanceValue}>{profileData.completionRate}</div>
                  <div style={styles.performanceLabel}>Completion Rate</div>
                </div>
              </div>

              {isEditing && (
                <div style={styles.actionButtons}>
                  <button 
                    style={styles.secondaryButton}
                    onClick={handleEditToggle}
                    disabled={isUploading}
                  >
                    Cancel
                  </button>
                  <button 
                    style={styles.primaryButton}
                    onClick={handleSaveProfile}
                    disabled={isUploading}
                  >
                    {isUploading ? (
                      <>
                        <div style={styles.loadingSpinner}></div>
                        Saving...
                      </>
                    ) : (
                      'Save Changes'
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* Spacer for mobile to prevent content overlap */}
      {isMobile && <div style={{ height: '60px', width: '100%' }}></div>}

      {/* Add CSS animation for spinner */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </>
  );
};

export default Sidebar;