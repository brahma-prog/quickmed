// import React from 'react';

// const Sidebar = ({ activePage, setActivePage, profileData, isOnline, onLogout, isMobile }) => {
//   const styles = {
//     // Desktop Sidebar
//     sidebar: {
//       width: isMobile ? '100%' : '280px',
//       backgroundColor: '#7C2A62',
//       color: 'white',
//       display: 'flex',
//       flexDirection: isMobile ? 'row' : 'column',
//       position: 'fixed',
//       height: isMobile ? '60px' : '100vh',
//       left: 0,
//       top: 0,
//       zIndex: 1000,
//       boxShadow: isMobile ? '0 2px 10px rgba(0,0,0,0.1)' : 'none',
//     },
    
//     // Desktop Header
//     sidebarHeader: {
//       padding: '30px 24px 20px',
//       borderBottom: '1px solid rgba(255,255,255,0.1)',
//       display: isMobile ? 'none' : 'block',
//     },
    
//     // Desktop Navigation
//     desktopNav: {
//       flex: 1,
//       padding: '20px 0',
//       display: isMobile ? 'none' : 'flex',
//       flexDirection: 'column',
//       gap: '0',
//     },
    
//     // Mobile Navigation
//     mobileNav: {
//       flex: 1,
//       display: isMobile ? 'flex' : 'none',
//       flexDirection: 'row',
//       justifyContent: 'space-around',
//       alignItems: 'center',
//       height: '60px',
//     },
    
//     // Common Nav Button
//     navButton: {
//       display: 'flex',
//       alignItems: 'center',
//       backgroundColor: 'transparent',
//       border: 'none',
//       color: 'white',
//       cursor: 'pointer',
//       transition: 'all 0.3s ease',
//       opacity: 0.8,
      
//       // Desktop styles
//       ...(!isMobile && {
//         width: '100%',
//         padding: '16px 24px',
//         fontSize: '16px',
//         flexDirection: 'row',
//         gap: '12px',
//         borderRadius: '0',
//         justifyContent: 'flex-start',
//       }),
      
//       // Mobile styles
//       ...(isMobile && {
//         flexDirection: 'column',
//         padding: '8px 12px',
//         fontSize: '12px',
//         gap: '4px',
//         borderRadius: '8px',
//         justifyContent: 'center',
//         flex: 1,
//         minHeight: '60px',
//       }),
//     },
    
//     navButtonActive: {
//       backgroundColor: isMobile ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.1)',
//       opacity: 1,
//       ...(!isMobile && {
//         borderRight: '4px solid #F7D9EB',
//       }),
//     },
    
//     navIcon: {
//       ...(!isMobile && {
//         fontSize: '20px',
//         marginRight: '12px',
//         width: '24px',
//         textAlign: 'center',
//       }),
//       ...(isMobile && {
//         fontSize: '16px',
//         marginRight: '0',
//       }),
//     },
    
//     navLabel: {
//       fontWeight: '500',
//       ...(!isMobile && {
//         fontSize: '16px',
//         textAlign: 'left',
//       }),
//       ...(isMobile && {
//         fontSize: '10px',
//         textAlign: 'center',
//       }),
//     },
    
//     // Desktop Footer
//     sidebarFooter: {
//       padding: '20px 24px',
//       borderTop: '1px solid rgba(255,255,255,0.1)',
//       display: isMobile ? 'none' : 'block',
//     },
    
//     profileSection: {
//       marginBottom: '20px',
//       padding: '16px',
//       backgroundColor: 'rgba(255,255,255,0.1)',
//       borderRadius: '8px'
//     },
    
//     profileInfo: {
//       display: 'flex',
//       alignItems: 'center',
//       marginBottom: '12px'
//     },
    
//     userAvatar: {
//       marginRight: '12px',
//       position: 'relative'
//     },
    
//     sidebarProfileImage: {
//       width: '48px',
//       height: '48px',
//       borderRadius: '50%',
//       objectFit: 'cover',
//       border: '2px solid rgba(255,255,255,0.3)'
//     },
    
//     sidebarAvatarPlaceholder: {
//       width: '48px',
//       height: '48px',
//       borderRadius: '50%',
//       backgroundColor: 'rgba(255,255,255,0.2)',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       fontSize: '20px',
//       border: '2px solid rgba(255,255,255,0.3)'
//     },
    
//     userDetails: {
//       flex: 1
//     },
    
//     userName: {
//       margin: '0 0 4px 0',
//       fontWeight: '600',
//       fontSize: '14px'
//     },
    
//     userId: {
//       margin: '0 0 4px 0',
//       fontSize: '12px',
//       opacity: 0.8
//     },
    
//     onlineStatusSmall: {
//       display: 'flex',
//       alignItems: 'center',
//       gap: '6px',
//       fontSize: '12px',
//       opacity: 0.8,
//       marginTop: '4px'
//     },
    
//     statusDot: {
//       width: '8px',
//       height: '8px',
//       borderRadius: '50%',
//       display: 'inline-block'
//     },
    
//     profileButton: {
//       width: '100%',
//       padding: '10px',
//       backgroundColor: 'rgba(255,255,255,0.2)',
//       color: 'white',
//       border: 'none',
//       borderRadius: '6px',
//       cursor: 'pointer',
//       fontWeight: '500',
//       fontSize: '14px',
//       transition: 'background-color 0.3s ease'
//     },
    
//     sidebarActions: {
//       display: 'flex',
//       flexDirection: 'column',
//       gap: '8px'
//     },
    
//     logoutButton: {
//       width: '100%',
//       padding: '12px',
//       backgroundColor: 'rgba(255,255,255,0.1)',
//       color: 'white',
//       border: 'none',
//       borderRadius: '8px',
//       cursor: 'pointer',
//       fontWeight: '500',
//       transition: 'background-color 0.3s ease'
//     },
    
//     // Mobile specific
//     mobileHeader: {
//       display: isMobile ? 'flex' : 'none',
//       alignItems: 'center',
//       justifyContent: 'space-between',
//       padding: '0 16px',
//       width: '100%',
//       height: '60px',
//     },
    
//     mobileLogo: {
//       fontSize: '18px',
//       fontWeight: '700',
//       color: 'white',
//       margin: 0
//     },
    
//     mobileProfile: {
//       display: 'flex',
//       alignItems: 'center',
//       gap: '8px'
//     },
    
//     mobileAvatar: {
//       width: '32px',
//       height: '32px',
//       borderRadius: '50%',
//       backgroundColor: 'rgba(255,255,255,0.2)',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       fontSize: '14px',
//       border: '1px solid rgba(255,255,255,0.3)',
//       cursor: 'pointer'
//     }
//   };

//   const navigationItems = [
//     { id: 'dashboard', label: 'Dashboard', icon: '📊' },
//     { id: 'tasks', label: 'History', icon: '📦' },
//     { id: 'earnings', label: 'Earnings', icon: '💰' },
//     { id: 'performance', label: 'Performance', icon: '📈' },
//   ];

//   const getDisplayName = () => {
//     return profileData.fullName;
//   };

//   return (
//     <>
//       <div style={styles.sidebar}>
//         {/* Desktop Sidebar */}
//         {!isMobile && (
//           <>
//             <div style={styles.sidebarHeader}>
//               <h1 style={styles.logo}>QUICKMED</h1>
//               <p style={styles.agentTitle}>Delivery Portal</p>
//             </div>

//             <nav style={styles.desktopNav}>
//               {navigationItems.map(item => (
//                 <button
//                   key={item.id}
//                   style={{
//                     ...styles.navButton,
//                     ...(activePage === item.id ? styles.navButtonActive : {})
//                   }}
//                   onClick={() => setActivePage(item.id)}
//                 >
//                   <span style={styles.navIcon}>{item.icon}</span>
//                   <span style={styles.navLabel}>{item.label}</span>
//                 </button>
//               ))}
//             </nav>

//             <div style={styles.sidebarFooter}>
//               <div style={styles.profileSection}>
//                 <div style={styles.profileInfo}>
//                   <div style={styles.userAvatar}>
//                     {profileData.profileImage ? (
//                       <img 
//                         src={profileData.profileImage} 
//                         alt="Profile" 
//                         style={styles.sidebarProfileImage}
//                       />
//                     ) : (
//                       <div style={styles.sidebarAvatarPlaceholder}>👤</div>
//                     )}
//                   </div>
//                   <div style={styles.userDetails}>
//                     <p style={styles.userName}>{getDisplayName()}</p>
//                     <p style={styles.userId}>ID: {profileData.agentId}</p>
//                     <div style={styles.onlineStatusSmall}>
//                       <span style={{
//                         ...styles.statusDot,
//                         backgroundColor: isOnline ? '#10B981' : '#6B7280'
//                       }}></span>
//                       <span>{isOnline ? 'Online' : 'Offline'}</span>
//                     </div>
//                   </div>
//                 </div>
//                 <button
//                   style={styles.profileButton}
//                   onClick={() => setActivePage('profile')}
//                 >
//                   👤 View Profile
//                 </button>
//               </div>

//               <div style={styles.sidebarActions}>
//                 <button style={styles.logoutButton} onClick={onLogout}>
//                   Logout
//                 </button>
//               </div>
//             </div>
//           </>
//         )}

//         {/* Mobile Navigation Bar */}
//         {isMobile && (
//           <nav style={styles.mobileNav}>
//             {navigationItems.map(item => (
//               <button
//                 key={item.id}
//                 style={{
//                   ...styles.navButton,
//                   ...(activePage === item.id ? styles.navButtonActive : {})
//                 }}
//                 onClick={() => setActivePage(item.id)}
//               >
//                 <span style={styles.navIcon}>{item.icon}</span>
//                 <span style={styles.navLabel}>
//                   {item.label}
//                 </span>
//               </button>
//             ))}
//             <div 
//               style={styles.mobileAvatar}
//               onClick={() => setActivePage('profile')}
//               title="Profile"
//             >
//               👤
//             </div>
//           </nav>
//         )}
//       </div>
      
//       {/* Spacer for mobile to prevent content overlap */}
//       {isMobile && <div style={{ height: '60px', width: '100%' }}></div>}
//     </>
//   );
// };

// export default Sidebar;







// import React from 'react';

// const Sidebar = ({ activePage, setActivePage, profileData, isOnline, onLogout, onToggleAIChat, isMobile }) => {
//   const styles = {
//     // Desktop Sidebar
//     sidebar: {
//       width: isMobile ? '100%' : '280px',
//       backgroundColor: '#7C2A62',
//       color: 'white',
//       display: 'flex',
//       flexDirection: isMobile ? 'row' : 'column',
//       position: 'fixed',
//       height: isMobile ? '60px' : '100vh',
//       left: 0,
//       top: 0,
//       zIndex: 1000,
//       boxShadow: isMobile ? '0 2px 10px rgba(0,0,0,0.1)' : 'none',
//     },
    
//     // Desktop Header
//     sidebarHeader: {
//       padding: '30px 24px 20px',
//       borderBottom: '1px solid rgba(255,255,255,0.1)',
//       display: isMobile ? 'none' : 'block',
//     },
    
//     // Desktop Navigation
//     desktopNav: {
//       flex: 1,
//       padding: '20px 0',
//       display: isMobile ? 'none' : 'flex',
//       flexDirection: 'column',
//       gap: '0',
//     },
    
//     // Mobile Navigation
//     mobileNav: {
//       flex: 1,
//       display: isMobile ? 'flex' : 'none',
//       flexDirection: 'row',
//       justifyContent: 'space-around',
//       alignItems: 'center',
//       height: '60px',
//     },
    
//     // Common Nav Button
//     navButton: {
//       display: 'flex',
//       alignItems: 'center',
//       backgroundColor: 'transparent',
//       border: 'none',
//       color: 'white',
//       cursor: 'pointer',
//       transition: 'all 0.3s ease',
//       opacity: 0.8,
      
//       // Desktop styles
//       ...(!isMobile && {
//         width: '100%',
//         padding: '16px 24px',
//         fontSize: '16px',
//         flexDirection: 'row',
//         gap: '12px',
//         borderRadius: '0',
//         justifyContent: 'flex-start',
//       }),
      
//       // Mobile styles
//       ...(isMobile && {
//         flexDirection: 'column',
//         padding: '8px 4px',
//         fontSize: '12px',
//         gap: '4px',
//         borderRadius: '8px',
//         justifyContent: 'center',
//         flex: 1,
//         minHeight: '60px',
//         maxWidth: '80px',
//       }),
//     },
    
//     navButtonActive: {
//       backgroundColor: isMobile ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.1)',
//       opacity: 1,
//       ...(!isMobile && {
//         borderRight: '4px solid #F7D9EB',
//       }),
//     },
    
//     navIcon: {
//       ...(!isMobile && {
//         fontSize: '20px',
//         marginRight: '12px',
//         width: '24px',
//         textAlign: 'center',
//       }),
//       ...(isMobile && {
//         fontSize: '16px',
//         marginRight: '0',
//       }),
//     },
    
//     navLabel: {
//       fontWeight: '500',
//       ...(!isMobile && {
//         fontSize: '16px',
//         textAlign: 'left',
//       }),
//       ...(isMobile && {
//         fontSize: '10px',
//         textAlign: 'center',
//         lineHeight: '1.2',
//       }),
//     },
    
//     // Desktop Footer
//     sidebarFooter: {
//       padding: '20px 24px',
//       borderTop: '1px solid rgba(255,255,255,0.1)',
//       display: isMobile ? 'none' : 'block',
//     },
    
//     profileSection: {
//       marginBottom: '20px',
//       padding: '16px',
//       backgroundColor: 'rgba(255,255,255,0.1)',
//       borderRadius: '8px'
//     },
    
//     profileInfo: {
//       display: 'flex',
//       alignItems: 'center',
//       marginBottom: '12px'
//     },
    
//     userAvatar: {
//       marginRight: '12px',
//       position: 'relative'
//     },
    
//     sidebarProfileImage: {
//       width: '48px',
//       height: '48px',
//       borderRadius: '50%',
//       objectFit: 'cover',
//       border: '2px solid rgba(255,255,255,0.3)'
//     },
    
//     sidebarAvatarPlaceholder: {
//       width: '48px',
//       height: '48px',
//       borderRadius: '50%',
//       backgroundColor: 'rgba(255,255,255,0.2)',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       fontSize: '20px',
//       border: '2px solid rgba(255,255,255,0.3)'
//     },
    
//     userDetails: {
//       flex: 1
//     },
    
//     userName: {
//       margin: '0 0 4px 0',
//       fontWeight: '600',
//       fontSize: '14px'
//     },
    
//     userId: {
//       margin: '0 0 4px 0',
//       fontSize: '12px',
//       opacity: 0.8
//     },
    
//     onlineStatusSmall: {
//       display: 'flex',
//       alignItems: 'center',
//       gap: '6px',
//       fontSize: '12px',
//       opacity: 0.8,
//       marginTop: '4px'
//     },
    
//     statusDot: {
//       width: '8px',
//       height: '8px',
//       borderRadius: '50%',
//       display: 'inline-block'
//     },
    
//     profileButton: {
//       width: '100%',
//       padding: '10px',
//       backgroundColor: 'rgba(255,255,255,0.2)',
//       color: 'white',
//       border: 'none',
//       borderRadius: '6px',
//       cursor: 'pointer',
//       fontWeight: '500',
//       fontSize: '14px',
//       transition: 'background-color 0.3s ease'
//     },
    
//     sidebarActions: {
//       display: 'flex',
//       flexDirection: 'column',
//       gap: '8px'
//     },
    
//     logoutButton: {
//       width: '100%',
//       padding: '12px',
//       backgroundColor: 'rgba(255,255,255,0.1)',
//       color: 'white',
//       border: 'none',
//       borderRadius: '8px',
//       cursor: 'pointer',
//       fontWeight: '500',
//       transition: 'background-color 0.3s ease'
//     },
    
//     // Mobile specific
//     mobileHeader: {
//       display: isMobile ? 'flex' : 'none',
//       alignItems: 'center',
//       justifyContent: 'space-between',
//       padding: '0 16px',
//       width: '100%',
//       height: '60px',
//     },
    
//     mobileLogo: {
//       fontSize: '18px',
//       fontWeight: '700',
//       color: 'white',
//       margin: 0
//     },
    
//     mobileProfile: {
//       display: 'flex',
//       alignItems: 'center',
//       gap: '8px'
//     },
    
//     mobileAvatar: {
//       width: '32px',
//       height: '32px',
//       borderRadius: '50%',
//       backgroundColor: 'rgba(255,255,255,0.2)',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       fontSize: '14px',
//       border: '1px solid rgba(255,255,255,0.3)',
//       cursor: 'pointer'
//     }
//   };

//   const navigationItems = [
//     { id: 'dashboard', label: 'Dashboard', icon: '📊' },
//     { id: 'tasks', label: 'History', icon: '📦' },
//     { id: 'earnings', label: 'Earnings', icon: '💰' },
//     { id: 'performance', label: 'Performance', icon: '📈' },
//   ];

//   const getDisplayName = () => {
//     return profileData.fullName;
//   };

//   return (
//     <>
//       <div style={styles.sidebar}>
//         {/* Desktop Sidebar */}
//         {!isMobile && (
//           <>
//             <div style={styles.sidebarHeader}>
//               <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '700' }}>QUICKMED</h1>
//               <p style={{ margin: '8px 0 0 0', fontSize: '14px', opacity: 0.8 }}>Delivery Portal</p>
//             </div>

//             <nav style={styles.desktopNav}>
//               {navigationItems.map(item => (
//                 <button
//                   key={item.id}
//                   style={{
//                     ...styles.navButton,
//                     ...(activePage === item.id ? styles.navButtonActive : {})
//                   }}
//                   onClick={() => setActivePage(item.id)}
//                 >
//                   <span style={styles.navIcon}>{item.icon}</span>
//                   <span style={styles.navLabel}>{item.label}</span>
//                 </button>
//               ))}
//             </nav>

//             <div style={styles.sidebarFooter}>
//               <div style={styles.profileSection}>
//                 <div style={styles.profileInfo}>
//                   <div style={styles.userAvatar}>
//                     {profileData.profileImage ? (
//                       <img 
//                         src={profileData.profileImage} 
//                         alt="Profile" 
//                         style={styles.sidebarProfileImage}
//                       />
//                     ) : (
//                       <div style={styles.sidebarAvatarPlaceholder}>👤</div>
//                     )}
//                   </div>
//                   <div style={styles.userDetails}>
//                     <p style={styles.userName}>{getDisplayName()}</p>
//                     <p style={styles.userId}>ID: {profileData.agentId}</p>
//                     <div style={styles.onlineStatusSmall}>
//                       <span style={{
//                         ...styles.statusDot,
//                         backgroundColor: isOnline ? '#10B981' : '#6B7280'
//                       }}></span>
//                       <span>{isOnline ? 'Online' : 'Offline'}</span>
//                     </div>
//                   </div>
//                 </div>
//                 <button
//                   style={styles.profileButton}
//                   onClick={() => setActivePage('profile')}
//                 >
//                   👤 View Profile
//                 </button>
//               </div>

//               <div style={styles.sidebarActions}>
//                 <button style={styles.logoutButton} onClick={onLogout}>
//                   Logout
//                 </button>
//               </div>
//             </div>
//           </>
//         )}

//         {/* Mobile Navigation Bar */}
//         {isMobile && (
//           <nav style={styles.mobileNav}>
//             {navigationItems.map(item => (
//               <button
//                 key={item.id}
//                 style={{
//                   ...styles.navButton,
//                   ...(activePage === item.id ? styles.navButtonActive : {})
//                 }}
//                 onClick={() => setActivePage(item.id)}
//               >
//                 <span style={styles.navIcon}>{item.icon}</span>
//                 <span style={styles.navLabel}>
//                   {item.label}
//                 </span>
//               </button>
//             ))}
//             <button
//               style={{
//                 ...styles.navButton,
//                 ...(activePage === 'profile' ? styles.navButtonActive : {})
//               }}
//               onClick={() => setActivePage('profile')}
//               title="Profile"
//             >
//               <span style={styles.navIcon}>👤</span>
//               <span style={styles.navLabel}>Profile</span>
//             </button>
//           </nav>
//         )}
//       </div>
      
//       {/* Spacer for mobile to prevent content overlap */}
//       {isMobile && <div style={{ height: '60px', width: '100%' }}></div>}
//     </>
//   );
// };

// export default Sidebar;





import React, { useState } from 'react';

const Sidebar = ({ activePage, setActivePage, profileData, isOnline, onLogout, onToggleAIChat, isMobile }) => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

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
    
    // Desktop Header
    sidebarHeader: {
      padding: '30px 24px 20px',
      borderBottom: '1px solid rgba(255,255,255,0.1)',
      display: isMobile ? 'none' : 'block',
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
  };

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'profile', label: 'Profile', icon: '👤' },
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

  return (
    <>
      <div style={styles.sidebar}>
        {/* Desktop Sidebar */}
        {!isMobile && (
          <>
            <div style={styles.sidebarHeader}>
              <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '700' }}>QUICKMED</h1>
              <p style={{ margin: '8px 0 0 0', fontSize: '14px', opacity: 0.8 }}>Delivery Portal</p>
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
              </div>

              <div style={styles.sidebarActions}>
                <button style={styles.logoutButton} onClick={onLogout}>
                  🚪 Logout
                </button>
              </div>
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
            <p style={styles.mobileProfileId}>ID: {profileData.agentId}</p>
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
      
      {/* Spacer for mobile to prevent content overlap */}
      {isMobile && <div style={{ height: '60px', width: '100%' }}></div>}
    </>
  );
};

export default Sidebar;