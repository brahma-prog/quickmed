import React from 'react';

const Navbar = ({ activeSection, onSectionChange, onNavigateToAuth, onNavigateToAdmin, isMobileMenuOpen, onMobileMenuToggle }) => {
  const styles = {
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem 2rem',
      backgroundColor: '#F7D9EB',
      boxShadow: '0 4px 20px rgba(124, 42, 98, 0.3)',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      minHeight: '60px',
      boxSizing: 'border-box',
      touchAction: 'manipulation',
    },
    logo: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      textAlign: 'left',
      minWidth: '200px',
      cursor: 'pointer',
      flexShrink: 0,
      touchAction: 'manipulation',
    },
    logoImage: {
      width: '45px',
      height: '45px',
      objectFit: 'contain',
    },
    logoText: {
      margin: 0,
      color: '#000000',
      fontSize: '2.2rem',
      fontWeight: 'bold',
      background: 'linear-gradient(45deg, #7C2A62, #5a1a4a)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      lineHeight: '1.2',
      WebkitTextSizeAdjust: '100%',
      textSizeAdjust: '100%',
      fontSize: 'clamp(1.5rem, 5vw, 2.2rem)',
    },
    tagline: {
      margin: 0,
      color: '#000000',
      fontSize: '0.9rem',
      fontWeight: '500',
      lineHeight: '1.3',
      WebkitTextSizeAdjust: '100%',
      textSizeAdjust: '100%',
      fontSize: 'clamp(0.7rem, 2.5vw, 0.9rem)',
    },
    mobileMenuButton: {
      backgroundColor: 'transparent',
      border: '2px solid #7C2A62',
      cursor: 'pointer',
      padding: '0.5rem',
      color: '#7C2A62',
      borderRadius: '8px',
      transition: 'all 0.3s ease',
      zIndex: 1001,
      minWidth: '50px',
      minHeight: '50px',
      touchAction: 'manipulation',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
    },
    nav: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.8rem',
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
    navButton: {
      padding: '0.5rem 1rem',
      border: 'none',
      backgroundColor: 'transparent',
      cursor: 'pointer',
      fontSize: '0.9rem',
      borderRadius: '20px',
      transition: 'all 0.3s ease',
      fontWeight: '600',
      color: '#000000',
      whiteSpace: 'nowrap',
      minHeight: '44px',
      WebkitTextSizeAdjust: '100%',
      textSizeAdjust: '100%',
      touchAction: 'manipulation',
      fontSize: 'clamp(0.8rem, 2.5vw, 0.9rem)',
    },
    activeNavButton: {
      backgroundColor: '#7C2A62',
      color: '#ffffff',
      boxShadow: '0 2px 10px rgba(124, 42, 98, 0.3)',
      transform: 'scale(1.05)',
    },
    authButtons: {
      display: 'flex',
      gap: '0.5rem',
      marginLeft: '1rem',
      flexShrink: 0,
    },
    loginButton: {
      padding: '0.5rem 1rem',
      border: '2px solid #7C2A62',
      backgroundColor: 'transparent',
      cursor: 'pointer',
      borderRadius: '20px',
      fontWeight: '600',
      transition: 'all 0.3s ease',
      color: '#7C2A62',
      whiteSpace: 'nowrap',
      minHeight: '44px',
      WebkitTextSizeAdjust: '100%',
      textSizeAdjust: '100%',
      touchAction: 'manipulation',
      fontSize: 'clamp(0.8rem, 2.5vw, 0.9rem)',
    },
    adminButton: {
      padding: '0.5rem 1rem',
      border: 'none',
      backgroundColor: '#7C2A62',
      color: 'white',
      cursor: 'pointer',
      borderRadius: '20px',
      fontWeight: '600',
      transition: 'all 0.3s ease',
      whiteSpace: 'nowrap',
      minHeight: '44px',
      WebkitTextSizeAdjust: '100%',
      textSizeAdjust: '100%',
      touchAction: 'manipulation',
      fontSize: 'clamp(0.8rem, 2.5vw, 0.9rem)',
    },
    mobileNav: {
      position: 'absolute',
      top: '100%',
      left: 0,
      right: 0,
      backgroundColor: '#F7D9EB',
      flexDirection: 'column',
      padding: '1.5rem',
      boxShadow: '0 4px 20px rgba(124, 42, 98, 0.3)',
      zIndex: 999,
      gap: '0.5rem',
      maxHeight: 'calc(100vh - 60px)',
      overflowY: 'auto',
      boxSizing: 'border-box',
      touchAction: 'pan-y',
    },
    mobileOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 998,
      touchAction: 'none',
    },
    hamburgerIcon: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      width: '24px',
      height: '18px',
      transition: 'all 0.3s ease',
    },
    hamburgerLine: {
      height: '3px',
      width: '100%',
      backgroundColor: '#7C2A62',
      borderRadius: '3px',
      transition: 'all 0.3s ease',
      transformOrigin: 'center',
    },
    closeIcon: {
      position: 'relative',
      width: '24px',
      height: '24px',
      transition: 'all 0.3s ease',
    },
    closeLine: {
      position: 'absolute',
      height: '3px',
      width: '100%',
      backgroundColor: '#7C2A62',
      borderRadius: '3px',
      top: '50%',
      left: '0',
      transition: 'all 0.3s ease',
    }
  };

  // Enhanced responsive state management
  const [windowSize, setWindowSize] = React.useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
  });

  // Debug state to see what's happening
  const [debugInfo, setDebugInfo] = React.useState('');

  React.useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;
      
      setWindowSize({
        width: newWidth,
        height: newHeight,
      });

      // Debug info
      setDebugInfo(`
        Window: ${newWidth}px x ${newHeight}px
        Is Mobile: ${newWidth <= 768}
        Menu Open: ${isMobileMenuOpen}
      `);
    };

    // Initial call
    handleResize();

    // Throttled resize handler
    let resizeTimeout;
    const throttledResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(handleResize, 100);
    };

    window.addEventListener('resize', throttledResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', throttledResize);
      clearTimeout(resizeTimeout);
    };
  }, [isMobileMenuOpen]);

  // Define breakpoints - using more reliable detection
  const isSmallScreen = windowSize.width <= 768;
  const isMediumScreen = windowSize.width > 768 && windowSize.width <= 1024;
  const isLargeScreen = windowSize.width > 1024;
  const isExtraSmallScreen = windowSize.width <= 480;

  console.log('Responsive Debug:', {
    windowWidth: windowSize.width,
    isSmallScreen,
    isMobileMenuOpen,
    showHamburger: isSmallScreen
  });

  // Responsive styles based on screen size
  const responsiveStyles = {
    header: {
      ...styles.header,
      padding: isExtraSmallScreen ? '0.8rem 1rem' : 
               isSmallScreen ? '1rem 1.5rem' : '1rem 2rem',
    },
    logo: {
      ...styles.logo,
      minWidth: isExtraSmallScreen ? '140px' : 
                isSmallScreen ? '160px' : '200px',
      gap: isExtraSmallScreen ? '6px' : '12px',
    },
    logoImage: {
      ...styles.logoImage,
      width: isExtraSmallScreen ? '32px' : 
             isSmallScreen ? '38px' : '45px',
      height: isExtraSmallScreen ? '32px' : 
              isSmallScreen ? '38px' : '45px',
    },
    logoText: {
      ...styles.logoText,
    },
    tagline: {
      ...styles.tagline,
      display: isExtraSmallScreen ? 'none' : 'block',
    },
    mobileMenuButton: {
      ...styles.mobileMenuButton,
      display: isSmallScreen ? 'flex' : 'none', // This controls hamburger visibility
    },
    nav: {
      ...styles.nav,
      display: isSmallScreen ? 'none' : 'flex', // Hide desktop nav on mobile
      gap: isMediumScreen ? '0.5rem' : '0.8rem',
    },
    navButton: {
      ...styles.navButton,
      padding: isMediumScreen ? '0.4rem 0.8rem' : '0.5rem 1rem',
    },
    authButtons: {
      ...styles.authButtons,
      display: isSmallScreen ? 'none' : 'flex', // Hide auth buttons on mobile (they're in mobile menu)
      marginLeft: isMediumScreen ? '0.5rem' : '1rem',
      gap: isMediumScreen ? '0.3rem' : '0.5rem',
    },
    loginButton: {
      ...styles.loginButton,
      padding: isMediumScreen ? '0.4rem 0.8rem' : '0.5rem 1rem',
    },
    adminButton: {
      ...styles.adminButton,
      padding: isMediumScreen ? '0.4rem 0.8rem' : '0.5rem 1rem',
    },
    mobileNav: {
      ...styles.mobileNav,
      display: (isSmallScreen && isMobileMenuOpen) ? 'flex' : 'none',
    },
    mobileOverlay: {
      ...styles.mobileOverlay,
      display: (isSmallScreen && isMobileMenuOpen) ? 'block' : 'none',
    }
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'services', label: 'Services' },
    { id: 'doctors', label: 'Doctors' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'contact', label: 'Contact' }
  ];

  // Enhanced hover effects
  const handleMouseEnter = (e) => {
    if (!isSmallScreen) {
      e.target.style.transform = 'translateY(-2px)';
      e.target.style.boxShadow = '0 4px 12px rgba(124, 42, 98, 0.2)';
    }
  };

  const handleMouseLeave = (e) => {
    if (!isSmallScreen) {
      e.target.style.transform = 'translateY(0)';
      if (!e.target.style.backgroundColor || e.target.style.backgroundColor === 'transparent') {
        e.target.style.boxShadow = 'none';
      }
    }
  };

  const handleMobileMenuToggle = () => {
    onMobileMenuToggle();
    
    if (isSmallScreen) {
      document.body.style.overflow = isMobileMenuOpen ? 'auto' : 'hidden';
    }
  };

  const handleMobileNavClick = (sectionId) => {
    onSectionChange(sectionId);
    onMobileMenuToggle();
    document.body.style.overflow = 'auto';
  };

  // Enhanced Hamburger Icon Component
  const HamburgerIcon = () => (
    <div style={styles.hamburgerIcon}>
      <div style={{...styles.hamburgerLine, backgroundColor: '#7C2A62'}} />
      <div style={{...styles.hamburgerLine, backgroundColor: '#7C2A62'}} />
      <div style={{...styles.hamburgerLine, backgroundColor: '#7C2A62'}} />
    </div>
  );

  // Enhanced Close Icon Component
  const CloseIcon = () => (
    <div style={styles.closeIcon}>
      <div style={{
        ...styles.closeLine, 
        backgroundColor: '#7C2A62',
        transform: 'rotate(45deg)'
      }} />
      <div style={{
        ...styles.closeLine, 
        backgroundColor: '#7C2A62',
        transform: 'rotate(-45deg)'
      }} />
    </div>
  );

  return (
    <>
      {/* Debug info - remove in production */}
      {process.env.NODE_ENV === 'development' && (
        <div style={{
          position: 'fixed',
          top: '10px',
          right: '10px',
          background: 'rgba(0,0,0,0.8)',
          color: 'white',
          padding: '10px',
          fontSize: '12px',
          zIndex: 10000,
          borderRadius: '5px',
          maxWidth: '300px',
          display: 'none' // Set to 'block' to see debug info
        }}>
          {debugInfo}
        </div>
      )}

      {/* Mobile Overlay */}
      {isSmallScreen && isMobileMenuOpen && (
        <div 
          style={responsiveStyles.mobileOverlay}
          onClick={handleMobileMenuToggle}
        />
      )}

      <header style={responsiveStyles.header}>
        <div 
          style={responsiveStyles.logo} 
          onClick={() => onSectionChange('home')}
        >
          <img 
            src="/Quickmed img.png" 
            alt="QuickMed Logo" 
            style={responsiveStyles.logoImage}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
          <div>
            <h1 style={responsiveStyles.logoText}>QUICKMED</h1>
            <p style={responsiveStyles.tagline}>Quick Care Smarter Health</p>
          </div>
        </div>

        {/* Hamburger Menu Button - Only shows on mobile */}
        <button 
          style={responsiveStyles.mobileMenuButton}
          onClick={handleMobileMenuToggle}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = 'rgba(124, 42, 98, 0.1)';
            e.target.style.transform = 'scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'transparent';
            e.target.style.transform = 'scale(1)';
          }}
          aria-label="Toggle mobile menu"
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <CloseIcon /> : <HamburgerIcon />}
        </button>

        {/* Desktop Navigation - Hidden on mobile */}
        <nav style={responsiveStyles.nav} role="navigation" aria-label="Main navigation">
          {navItems.map(item => (
            <button
              key={item.id}
              style={{
                ...responsiveStyles.navButton,
                ...(activeSection === item.id && styles.activeNavButton)
              }}
              onClick={() => onSectionChange(item.id)}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              aria-current={activeSection === item.id ? 'page' : undefined}
            >
              {item.label}
            </button>
          ))}
          <div style={responsiveStyles.authButtons}>
            <button 
              style={responsiveStyles.loginButton}
              onClick={onNavigateToAuth}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              aria-label="Login to your account"
            >
              Login
            </button>
            <button 
              style={responsiveStyles.adminButton}
              onClick={onNavigateToAdmin}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              aria-label="Admin dashboard"
            >
              🔧 Admin
            </button>
          </div>
        </nav>

        {/* Mobile Navigation - Shows when hamburger is clicked */}
        <nav 
          style={responsiveStyles.mobileNav} 
          role="navigation" 
          aria-label="Mobile navigation"
          aria-hidden={!isMobileMenuOpen}
        >
          {navItems.map(item => (
            <button
              key={item.id}
              style={{
                ...responsiveStyles.navButton,
                ...(activeSection === item.id && styles.activeNavButton),
                width: '100%',
                marginBottom: '0.5rem',
                textAlign: 'center',
                fontSize: '1rem',
              }}
              onClick={() => handleMobileNavClick(item.id)}
              aria-current={activeSection === item.id ? 'page' : undefined}
            >
              {item.label}
            </button>
          ))}
          <div style={{...responsiveStyles.authButtons, marginLeft: 0, flexDirection: 'column', width: '100%'}}>
            <button 
              style={{...responsiveStyles.loginButton, width: '100%', marginBottom: '0.5rem', fontSize: '1rem'}} 
              onClick={() => {
                onNavigateToAuth();
                handleMobileMenuToggle();
              }}
              aria-label="Login to your account"
            >
              Login
            </button>
            <button 
              style={{...responsiveStyles.adminButton, width: '100%', fontSize: '1rem'}} 
              onClick={() => {
                onNavigateToAdmin();
                handleMobileMenuToggle();
              }}
              aria-label="Admin dashboard"
            >
              🔧 Admin
            </button>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;