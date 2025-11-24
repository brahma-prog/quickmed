import React, { useRef, useEffect } from 'react';
import { useProfile } from './ProfileContext';

const Header = ({
  activeView,
  setActiveView,
  cart,
  notifications,
  markAsRead,
  markAllAsRead,
  getUnreadCount,
  handleNotificationsClick,
  toggleProfileDropdown,
  showProfileDropdown,
  setShowProfileDropdown,
  handleLogoutClick,
  toggleChatbot,
  profilePhotoInputRef,
  handleProfilePhotoUpload,
  triggerProfilePhotoUpload
}) => {
  const { profile } = useProfile();
  const profileRef = useRef(null);
  const notificationRef = useRef(null);

  // Debug: Log profile changes
  useEffect(() => {
    console.log('Header - Current profile:', profile);
  }, [profile]);

  // Enhanced navigation handler that scrolls to top
  const handleNavigation = (view) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      setActiveView(view);
    }, 100);
  };

  // Enhanced profile click handler with event prevention
  const handleProfileClick = (e) => {
    e.stopPropagation();
    console.log('Profile clicked, calling toggleProfileDropdown');
    toggleProfileDropdown();
  };

  // Enhanced profile navigation handler
  const handleProfileNavigation = (view) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      setActiveView(view);
      setShowProfileDropdown(false);
    }, 100);
  };

  // Enhanced cart navigation handler
  const handleCartNavigation = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      setActiveView('cart');
    }, 100);
  };

  // Handle clicks outside profile dropdown and notifications
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setShowProfileDropdown]);

  // Navigation items configuration for better maintainability
  const navItems = [
    { key: 'dashboard', label: 'Home' },
    { key: 'products', label: 'Products' },
    { key: 'appointments', label: 'Appointments' },
    { key: 'orders', label: 'Orders' }
  ];

  return (
    <header style={{
      backgroundColor: '#7C2A62',
      color: 'white',
      boxShadow: '0 4px 20px rgba(124, 42, 98, 0.3)',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
    }}>
      {/* Top Section: Logo and User Info */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0.8rem 1rem',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        flexWrap: 'wrap',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          marginLeft: '-25px', // Pulls the logo closer to the left edge
        }}>
          {/* Logo Image - Positioned at left edge */}
          <div style={{
            width: '80px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            borderRadius: '8px',
            overflow: 'hidden',
            flexShrink: 0,
            marginLeft: '0',
            paddingLeft: '0',
          }}>
            <img 
              src="/Quickmed img.png"
              alt="QuickMed Logo"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                display: 'block',
              }}
              onError={(e) => {
                // Fallback if image fails to load
                e.target.style.display = 'none';
              }}
            />
          </div>
          
          <div style={{
            display: 'flex',
            flexDirection: 'column',
          }}>
            <h1 style={{
              fontSize: '1.4rem',
              margin: 0,
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, #fff, #F7D9EB)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>QUICKMED</h1>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              marginTop: '0.25rem',
            }}>
              <span style={{
                fontSize: '0.85rem',
                opacity: 0.9,
                fontWeight: '500',
              }}>Quick Care, Smarter Health</span>
            </div>
          </div>
        </div>
        
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          flexShrink: 0,
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
          }}>
            <span style={{
              fontSize: '0.8rem',
              opacity: 0.8,
            }}>Welcome,</span>
            <span style={{
              fontSize: '0.85rem',
              fontWeight: '500',
            }}>{profile.fullName || 'User'}</span>
          </div>
          <div 
            ref={profileRef}
            style={{
              position: 'relative',
              cursor: 'pointer',
            }}
            onClick={handleProfileClick}
          >
            <div style={{
              width: '34px',
              height: '34px',
              fontSize: '1rem',
              borderRadius: '50%',
              backgroundColor: '#F7D9EB',
              color: '#7C2A62',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              transition: 'all 0.3s ease',
              overflow: 'hidden',
            }}>
              {profile.profilePhoto ? (
                <img
                  src={profile.profilePhoto}
                  alt="Profile"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              ) : (
                profile.fullName?.charAt(0)?.toUpperCase() || 'U'
              )}
            </div>
            
            {/* Profile Dropdown */}
            {showProfileDropdown && (
              <div style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                width: '300px',
                backgroundColor: 'white',
                borderRadius: '12px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                zIndex: 2000,
                marginTop: '0.5rem',
                overflow: 'hidden',
              }}>
                <div style={{
                  padding: '1rem 1.5rem',
                  backgroundColor: '#7C2A62',
                  color: 'white',
                }}>
                  <h4 style={{
                    margin: 0,
                    fontSize: '1.1rem',
                    fontWeight: '600',
                  }}>Profile Details</h4>
                </div>
                <div style={{
                  padding: '1rem 1.5rem',
                  borderBottom: '1px solid #f0f0f0',
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0.5rem 0',
                    borderBottom: '1px solid #f8f8f8',
                  }}>
                    <span style={{
                      color: '#666',
                      fontSize: '0.9rem',
                      fontWeight: '500',
                    }}>Name:</span>
                    <span style={{
                      color: '#333',
                      fontSize: '0.9rem',
                      fontWeight: '600',
                    }}>{profile.fullName || 'Not provided'}</span>
                  </div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0.5rem 0',
                    borderBottom: '1px solid #f8f8f8',
                  }}>
                    <span style={{
                      color: '#666',
                      fontSize: '0.9rem',
                      fontWeight: '500',
                    }}>Email:</span>
                    <span style={{
                      color: '#333',
                      fontSize: '0.9rem',
                      fontWeight: '600',
                    }}>{profile.email || 'Not provided'}</span>
                  </div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0.5rem 0',
                    borderBottom: '1px solid #f8f8f8',
                  }}>
                    <span style={{
                      color: '#666',
                      fontSize: '0.9rem',
                      fontWeight: '500',
                    }}>Phone:</span>
                    <span style={{
                      color: '#333',
                      fontSize: '0.9rem',
                      fontWeight: '600',
                    }}>
                      {profile.phone || 'Not provided'}
                    </span>
                  </div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0.5rem 0',
                    borderBottom: '1px solid #f8f8f8',
                  }}>
                    <span style={{
                      color: '#666',
                      fontSize: '0.9rem',
                      fontWeight: '500',
                    }}>Age:</span>
                    <span style={{
                      color: '#333',
                      fontSize: '0.9rem',
                      fontWeight: '600',
                    }}>
                      {profile.age ? `${profile.age} years` : 'Not provided'}
                    </span>
                  </div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0.5rem 0',
                    borderBottom: '1px solid #f8f8f8',
                  }}>
                    <span style={{
                      color: '#666',
                      fontSize: '0.9rem',
                      fontWeight: '500',
                    }}>Gender:</span>
                    <span style={{
                      color: '#333',
                      fontSize: '0.9rem',
                      fontWeight: '600',
                    }}>
                      {profile.gender ? 
                        profile.gender.charAt(0).toUpperCase() + profile.gender.slice(1) 
                        : 'Not specified'
                      }
                    </span>
                  </div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0.5rem 0',
                    borderBottom: '1px solid #f8f8f8',
                  }}>
                    <span style={{
                      color: '#666',
                      fontSize: '0.9rem',
                      fontWeight: '500',
                    }}>City:</span>
                    <span style={{
                      color: '#333',
                      fontSize: '0.9rem',
                      fontWeight: '600',
                    }}>
                      {profile.city || 'Not provided'}
                    </span>
                  </div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0.5rem 0',
                    borderBottom: '1px solid #f8f8f8',
                  }}>
                    <span style={{
                      color: '#666',
                      fontSize: '0.9rem',
                      fontWeight: '500',
                    }}>Address:</span>
                    <span style={{
                      color: '#333',
                      fontSize: '0.9rem',
                      fontWeight: '600',
                    }}>
                      {profile.address || 'Not provided'}
                    </span>
                  </div>
                </div>
                <div style={{
                  padding: '1rem 1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem',
                }}>
                  <button 
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      backgroundColor: '#7C2A62',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontWeight: '600',
                      fontSize: '0.9rem',
                    }}
                    onClick={() => handleProfileNavigation('profile')}
                    type="button"
                  >
                    View Full Profile
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Section: Navigation and Actions */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0.5rem 1rem',
        backgroundColor: 'rgba(255,255,255,0.05)',
        overflowX: 'auto',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
        }}>
          <nav style={{
            display: 'flex',
            gap: '0.3rem',
            flexWrap: 'nowrap',
          }}>
            {navItems.map(item => (
              <button 
                key={item.key}
                style={activeView === item.key ? {
                  padding: '0.45rem 0.75rem',
                  fontSize: '0.78rem',
                  borderRadius: '6px',
                  whiteSpace: 'nowrap',
                  border: 'none',
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  color: 'white',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
                } : {
                  padding: '0.45rem 0.75rem',
                  fontSize: '0.78rem',
                  borderRadius: '6px',
                  whiteSpace: 'nowrap',
                  border: 'none',
                  backgroundColor: 'transparent',
                  color: 'rgba(255, 255, 255, 0.8)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
                onClick={() => handleNavigation(item.key)}
                type="button"
              >
                <span style={{ fontSize: '1.1rem' }}></span>
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
        }}>
          {/* Cart Icon */}
          <div 
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '0.5rem',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              border: '1px solid rgba(255, 255, 255, 0.2)',
            }}
            onClick={handleCartNavigation}
          >
            <div style={{
              position: 'relative',
              fontSize: '1.5rem',
            }}>
              🛒
              {cart.length > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-8px',
                  right: '-8px',
                  backgroundColor: '#FF6B6B',
                  color: 'white',
                  borderRadius: '50%',
                  width: '20px',
                  height: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem',
                  fontWeight: 'bold',
                  border: '2px solid #7C2A62',
                }}>{cart.length}</span>
              )}
            </div>
          </div>

          {/* Notification Bell */}
          <div 
            ref={notificationRef}
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              padding: '0.5rem',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              border: '1px solid rgba(255, 255, 255, 0.2)',
            }}
          >
            <div 
              style={{
                position: 'relative',
                fontSize: '1.5rem',
              }}
              onClick={handleNotificationsClick}
            >
              🔔
              {getUnreadCount() > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-8px',
                  right: '-8px',
                  backgroundColor: '#FF6B6B',
                  color: 'white',
                  borderRadius: '50%',
                  width: '20px',
                  height: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem',
                  fontWeight: 'bold',
                  border: '2px solid #7C2A62',
                }}>{getUnreadCount()}</span>
              )}
            </div>
          </div>

          {/* Logout Button */}
          <button 
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              color: 'white',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '0.95rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'all 0.3s ease',
            }}
            onClick={handleLogoutClick}
            type="button"
          >
            <span style={{ fontSize: '1.1rem' }}></span>
            Logout
          </button>
        </div>
      </div>

      {/* Hidden Profile Photo Input */}
      <input
        type="file"
        ref={profilePhotoInputRef}
        onChange={handleProfilePhotoUpload}
        accept="image/*"
        style={{ display: 'none' }}
      />
    </header>
  );
};

export default Header;