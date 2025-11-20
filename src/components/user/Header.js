import React from 'react';
import { useProfile } from './ProfileContext';
import { styles } from './Styles';

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
  showChatbot,
  chatMessages,
  userMessage,
  handleUserMessage,
  sendMessage,
  handleKeyPress,
  chatInputRef,
  chatMessagesEndRef,
  chatRef,
  notificationRef,
  profileRef,
  profilePhotoInputRef,
  handleProfilePhotoUpload,
  triggerProfilePhotoUpload
}) => {
  const { profile } = useProfile();

  return (
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
            <span style={styles.userName}>{profile.fullName || 'User'}</span>
          </div>
          <div 
            ref={profileRef}
            style={styles.userAvatarContainer}
            onClick={toggleProfileDropdown}
          >
            <div style={styles.userAvatar}>
              {profile.profilePhoto ? (
                <img
                  src={profile.profilePhoto}
                  alt="Profile"
                  style={styles.avatarImage}
                />
              ) : (
                profile.fullName?.charAt(0) || 'U'
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
                    <span style={styles.profileDetailValue}>{profile.fullName}</span>
                  </div>
                  <div style={styles.profileDetailItem}>
                    <span style={styles.profileDetailLabel}>Email:</span>
                    <span style={styles.profileDetailValue}>{profile.email}</span>
                  </div>
                  <div style={styles.profileDetailItem}>
                    <span style={styles.profileDetailLabel}>Phone:</span>
                    <span style={styles.profileDetailValue}>
                      {profile.phone || 'Not provided'}
                    </span>
                  </div>
                  <div style={styles.profileDetailItem}>
                    <span style={styles.profileDetailLabel}>Age:</span>
                    <span style={styles.profileDetailValue}>
                      {profile.age ? `${profile.age} years` : 'Not provided'}
                    </span>
                  </div>
                  <div style={styles.profileDetailItem}>
                    <span style={styles.profileDetailLabel}>Gender:</span>
                    <span style={styles.profileDetailValue}>
                      {profile.gender ? 
                        profile.gender.charAt(0).toUpperCase() + profile.gender.slice(1) 
                        : 'Not specified'
                      }
                    </span>
                  </div>
                  <div style={styles.profileDetailItem}>
                    <span style={styles.profileDetailLabel}>City:</span>
                    <span style={styles.profileDetailValue}>
                      {profile.city || 'Not provided'}
                    </span>
                  </div>
                  <div style={styles.profileDetailItem}>
                    <span style={styles.profileDetailLabel}>Address:</span>
                    <span style={styles.profileDetailValue}>
                      {profile.address || 'Not provided'}
                    </span>
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
              <span style={styles.navIcon}></span>
              Home
            </button>
            <button 
              style={activeView === 'appointments' ? {...styles.navButton, ...styles.activeNavButton} : styles.navButton}
              onClick={() => setActiveView('appointments')}
              type="button"
            >
              <span style={styles.navIcon}></span>
              Appointments
            </button>
            <button 
              style={activeView === 'orders' ? {...styles.navButton, ...styles.activeNavButton} : styles.navButton}
              onClick={() => setActiveView('orders')}
              type="button"
            >
              <span style={styles.navIcon}></span>
              Orders
            </button>
            <button 
              style={activeView === 'profile' ? {...styles.navButton, ...styles.activeNavButton} : styles.navButton}
              onClick={() => setActiveView('profile')}
              type="button"
            >
              <span style={styles.navIcon}></span>
              Profile
            </button>
          </nav>
        </div>

        <div style={styles.headerActions}>
          {/* AI Chatbot Icon */}
          <div 
            style={styles.chatbotIconContainer}
            onClick={toggleChatbot}
          >
            <div style={styles.chatbotIcon}>
              💬
            </div>
          </div>

          {/* Cart Icon */}
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

          {/* Notification Bell - UPDATED for page navigation */}
          <div 
            ref={notificationRef}
            style={styles.notificationContainer}
          >
            <div 
              style={styles.notificationBell}
              onClick={handleNotificationsClick}
            >
              🔔
              {getUnreadCount() > 0 && (
                <span style={styles.notificationBadge}>{getUnreadCount()}</span>
              )}
            </div>
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

      {/* Hidden Profile Photo Input */}
      <input
        type="file"
        ref={profilePhotoInputRef}
        onChange={handleProfilePhotoUpload}
        accept="image/*"
        style={{ display: 'none' }}
      />

      {/* AI Chatbot */}
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
};

export default Header;

