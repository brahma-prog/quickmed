import React from 'react';

const UserDashboardHeader = ({
  userProfile,
  activeView,
  setActiveView,
  showProfileDropdown,
  toggleProfileDropdown,
  setShowProfileDropdown,
  profileRef,
  showNotifications,
  toggleNotifications,
  notifications,
  markAsRead,
  markAllAsRead,
  getUnreadCount,
  notificationRef,
  cart,
  showChatbot,
  toggleChatbot,
  chatMessages,
  userMessage,
  handleUserMessage,
  sendMessage,
  handleKeyPress,
  chatInputRef,
  chatMessagesEndRef,
  chatRef,
  handleLogoutClick,
  triggerProfilePhotoUpload,
  profilePhotoInputRef,
  handleProfilePhotoUpload,
  styles
}) => {
  const EnhancedHeader = () => (
    <header style={styles.header}>
      <div style={styles.headerTop}>
        <div style={styles.logoSection}>
          <div style={styles.logoContainer}>
            <h1 style={styles.logo}>QUICKMED</h1>
            <div style={styles.logoSubtitle}>
              <span style={styles.subtitleText}>Quick Care, Smarter Health</span>
            </div>
          </div>
        </div>
        
        <div style={styles.userSection}>
          <div style={styles.userWelcome}>
            <span style={styles.welcomeText}>Welcome,</span>
            <span style={styles.userName}>{userProfile.fullName || 'User'}</span>
          </div>
          <div 
            ref={profileRef}
            style={styles.userAvatarContainer}
            onClick={toggleProfileDropdown}
          >
            <div style={styles.userAvatar}>
              {userProfile.profilePhoto ? (
                <img
                  src={userProfile.profilePhoto}
                  alt="Profile"
                  style={styles.avatarImage}
                />
              ) : (
                userProfile.fullName?.charAt(0) || 'U'
              )}
            </div>
            
            {showProfileDropdown && (
              <div style={styles.profileDropdown}>
                <div style={styles.profileDropdownHeader}>
                  <h4 style={styles.profileDropdownTitle}>Profile Details</h4>
                </div>
                <div style={styles.profileDropdownContent}>
                  <div style={styles.profileDetailItem}>
                    <span style={styles.profileDetailLabel}>Name:</span>
                    <span style={styles.profileDetailValue}>{userProfile.fullName}</span>
                  </div>
                  <div style={styles.profileDetailItem}>
                    <span style={styles.profileDetailLabel}>Email:</span>
                    <span style={styles.profileDetailValue}>{userProfile.email}</span>
                  </div>
                  <div style={styles.profileDetailItem}>
                    <span style={styles.profileDetailLabel}>Phone:</span>
                    <span style={styles.profileDetailValue}>{userProfile.phone}</span>
                  </div>
                  <div style={styles.profileDetailItem}>
                    <span style={styles.profileDetailLabel}>Age:</span>
                    <span style={styles.profileDetailValue}>{userProfile.age}</span>
                  </div>
                  <div style={styles.profileDetailItem}>
                    <span style={styles.profileDetailLabel}>Gender:</span>
                    <span style={styles.profileDetailValue}>{userProfile.gender || 'Not specified'}</span>
                  </div>
                </div>
                <div style={styles.profileDropdownActions}>
                  <button 
                    style={styles.viewProfileButton}
                    onClick={() => {
                      setActiveView('profile');
                      setShowProfileDropdown(false);
                    }}
                    type="button"
                  >
                    View Full Profile
                  </button>
                  <button 
                    style={styles.uploadPhotoButton}
                    onClick={() => {
                      triggerProfilePhotoUpload();
                      setShowProfileDropdown(false);
                    }}
                    type="button"
                  >
                    Update Photo
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div style={styles.headerBottom}>
        <div style={styles.navSection}>
          <nav style={styles.nav}>
            <button 
              style={activeView === 'dashboard' ? {...styles.navButton, ...styles.activeNavButton} : styles.navButton}
              onClick={() => setActiveView('dashboard')}
              type="button"
            >
              <span style={styles.navIcon}>🏠</span>
              Home
            </button>
            <button 
              style={activeView === 'appointments' ? {...styles.navButton, ...styles.activeNavButton} : styles.navButton}
              onClick={() => setActiveView('appointments')}
              type="button"
            >
              <span style={styles.navIcon}>📅</span>
              Appointments
            </button>
            <button 
              style={activeView === 'orders' ? {...styles.navButton, ...styles.activeNavButton} : styles.navButton}
              onClick={() => setActiveView('orders')}
              type="button"
            >
              <span style={styles.navIcon}>📦</span>
              Orders
            </button>
            <button 
              style={activeView === 'profile' ? {...styles.navButton, ...styles.activeNavButton} : styles.navButton}
              onClick={() => setActiveView('profile')}
              type="button"
            >
              <span style={styles.navIcon}>👤</span>
              Profile
            </button>
          </nav>
        </div>

        <div style={styles.headerActions}>
          <div 
            style={styles.chatbotIconContainer}
            onClick={toggleChatbot}
          >
            <div style={styles.chatbotIcon}>
              💬
            </div>
          </div>

          <div 
            style={styles.cartIconContainer}
            onClick={() => setActiveView('cart')}
          >
            <div style={styles.cartIcon}>
              🛒
              {cart.length > 0 && (
                <span style={styles.cartBadge}>{cart.length}</span>
              )}
            </div>
          </div>

          <div 
            ref={notificationRef}
            style={styles.notificationContainer}
          >
            <div 
              style={styles.notificationBell}
              onClick={toggleNotifications}
            >
              🔔
              {getUnreadCount() > 0 && (
                <span style={styles.notificationBadge}>{getUnreadCount()}</span>
              )}
            </div>

            {showNotifications && (
              <div style={styles.notificationDropdown}>
                <div style={styles.notificationHeader}>
                  <h3 style={styles.notificationTitle}>Notifications</h3>
                  <button 
                    style={styles.markAllReadButton}
                    onClick={markAllAsRead}
                    type="button"
                  >
                    Mark all as read
                  </button>
                </div>
                <div style={styles.notificationList}>
                  {notifications.length === 0 ? (
                    <p style={styles.noNotifications}>No notifications</p>
                  ) : (
                    notifications.map(notification => (
                      <div 
                        key={notification.id} 
                        style={{
                          ...styles.notificationItem,
                          ...(notification.read ? styles.readNotification : styles.unreadNotification)
                        }}
                        onClick={() => markAsRead(notification.id)}
                      >
                        <div style={styles.notificationIcon}>
                          {notification.type === 'order' && '📦'}
                          {notification.type === 'delivery' && '🚚'}
                          {notification.type === 'prescription' && '📄'}
                          {notification.type === 'tracking' && '📍'}
                          {notification.type === 'appointment' && '📅'}
                        </div>
                        <div style={styles.notificationContent}>
                          <h4 style={styles.notificationItemTitle}>{notification.title}</h4>
                          <p style={styles.notificationMessage}>{notification.message}</p>
                          <span style={styles.notificationTime}>
                            {new Date(notification.timestamp).toLocaleTimeString()}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          <button 
            style={styles.logoutButton}
            onClick={handleLogoutClick}
            type="button"
          >
            <span style={styles.logoutIcon}></span>
            Logout
          </button>
        </div>
      </div>

      <input
        type="file"
        ref={profilePhotoInputRef}
        onChange={handleProfilePhotoUpload}
        accept="image/*"
        style={{ display: 'none' }}
      />

      {showChatbot && (
        <div ref={chatRef} style={styles.chatbotContainer}>
          <div style={styles.chatbotHeader}>
            <h3 style={styles.chatbotTitle}>QuickMed Assistant</h3>
            <button 
              style={styles.closeChatbot}
              onClick={toggleChatbot}
              type="button"
            >
              ×
            </button>
          </div>
          <div style={styles.chatMessages}>
            {chatMessages.map(message => (
              <div
                key={message.id}
                style={{
                  ...styles.chatMessage,
                  ...styles[`${message.sender}Message`]
                }}
              >
                <div style={{
                  ...styles.messageBubble,
                  ...styles[`${message.sender}MessageBubble`]
                }}>
                  {message.text}
                </div>
                <span style={styles.messageTime}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            ))}
            <div ref={chatMessagesEndRef} />
          </div>
          <div style={styles.chatInputContainer}>
            <input
              ref={chatInputRef}
              type="text"
              value={userMessage}
              onChange={handleUserMessage}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              style={styles.chatInput}
              autoFocus
            />
            <button 
              style={styles.sendButton}
              onClick={sendMessage}
              type="button"
              disabled={!userMessage.trim()}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </header>
  );

  return <EnhancedHeader />;
};

export default UserDashboardHeader;