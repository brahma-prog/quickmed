import React, { useState } from 'react';

const DoctorModals = ({ state, actions, onLogout, dashboardData }) => {
  const {
    showProfileModal,
    showNotificationsModal,
    showMessagesModal,
    showLogoutConfirm,
    consultationDetails,
    userProfile,
    notifications,
    patientMessages,
    selectedPatient,
    formErrors
  } = state;

  const {
    setShowProfileModal,
    setShowNotificationsModal,
    setShowMessagesModal,
    setShowLogoutConfirm,
    setConsultationDetails,
    setUserProfile,
    setFormErrors,
    handleProfileUpdate,
    handleMarkNotificationAsRead,
    handleMarkAllNotificationsAsRead,
    handleClearAllNotifications,
    handleSendMessage,
    handleMarkAsRead,
    handleViewFullHistory,
    handleAddNotes,
    validateForm,
    handleStartConversation
  } = actions;

  if (!showProfileModal && !showNotificationsModal && !showMessagesModal && 
      !showLogoutConfirm && !consultationDetails) {
    return null;
  }

  return (
    <>
      {/* Profile Modal */}
      {showProfileModal && (
        <ProfileModal
          userProfile={userProfile}
          setUserProfile={setUserProfile}
          setShowProfileModal={setShowProfileModal}
          handleProfileUpdate={handleProfileUpdate}
          formErrors={formErrors}
          setFormErrors={setFormErrors}
          validateForm={validateForm}
        />
      )}

      {/* Notifications Modal */}
      {showNotificationsModal && (
        <NotificationsModal
          notifications={notifications}
          setShowNotificationsModal={setShowNotificationsModal}
          handleMarkNotificationAsRead={handleMarkNotificationAsRead}
          handleMarkAllNotificationsAsRead={handleMarkAllNotificationsAsRead}
          handleClearAllNotifications={handleClearAllNotifications}
        />
      )}

      {/* Messages Modal */}
      {showMessagesModal && (
        <MessagesModal
          showMessagesModal={showMessagesModal}
          setShowMessagesModal={setShowMessagesModal}
          selectedPatient={selectedPatient}
          patientMessages={patientMessages}
          handleSendMessage={handleSendMessage}
          handleMarkAsRead={handleMarkAsRead}
          handleViewFullHistory={handleViewFullHistory}
          handleAddNotes={handleAddNotes}
          dashboardData={dashboardData}
        />
      )}

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <LogoutModal
          setShowLogoutConfirm={setShowLogoutConfirm}
          onLogout={onLogout}
        />
      )}

      {/* Consultation Details Modal */}
      {consultationDetails && (
        <ConsultationModal
          consultationDetails={consultationDetails}
          setConsultationDetails={setConsultationDetails}
          handleViewFullHistory={handleViewFullHistory}
          handleAddNotes={handleAddNotes}
          handleStartConversation={handleStartConversation}
          dashboardData={dashboardData}
        />
      )}
    </>
  );
};

// Profile Modal Component with all fields
const ProfileModal = ({ 
  userProfile, 
  setUserProfile, 
  setShowProfileModal, 
  handleProfileUpdate,
  formErrors,
  setFormErrors,
  validateForm 
}) => {
  const [formData, setFormData] = useState({...userProfile});

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm(formData)) {
      handleProfileUpdate(formData);
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
  };

  const validateName = (name) => {
    const nameRegex = /^[a-zA-Z\s]*$/;
    return nameRegex.test(name) && name.trim().length > 0;
  };

  const validatePincode = (pincode) => {
    const pincodeRegex = /^[1-9][0-9]{5}$/;
    return pincodeRegex.test(pincode);
  };

  const validateLicenseNumber = (license) => {
    const licenseRegex = /^[A-Za-z0-9\-]+$/;
    return licenseRegex.test(license) && license.trim().length > 0;
  };

  const validateExperience = (experience) => {
    const experienceRegex = /^[0-9]+\s*(years|yrs)?$/i;
    return experienceRegex.test(experience) && experience.trim().length > 0;
  };

  const handleNameChange = (value) => {
    if (validateName(value) || value === '') {
      handleInputChange('fullName', value);
    }
  };

  const handlePhoneChange = (value) => {
    const phoneRegex = /^[\+\-\d\s\(\)]*$/;
    if (phoneRegex.test(value)) {
      handleInputChange('phone', value);
    }
  };

  const handlePincodeChange = (value) => {
    const pincodeRegex = /^\d{0,6}$/;
    if (pincodeRegex.test(value)) {
      handleInputChange('pincode', value);
    }
  };

  const handleLicenseChange = (value) => {
    const licenseRegex = /^[A-Za-z0-9\-]*$/;
    if (licenseRegex.test(value)) {
      handleInputChange('licenseNumber', value);
    }
  };

  const handleExperienceChange = (value) => {
    const experienceRegex = /^[0-9\sA-Za-z]*$/;
    if (experienceRegex.test(value)) {
      handleInputChange('experience', value);
    }
  };

  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.modal}>
        <div style={modalStyles.header}>
          <h3 style={modalStyles.title}>Edit Profile</h3>
          <button 
            style={modalStyles.closeButton}
            onClick={() => {
              setShowProfileModal(false);
              setFormErrors({});
            }}
          >
            ✕
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div style={modalStyles.content}>
            <div style={modalStyles.formGrid}>
              <div style={modalStyles.formRow}>
                <label style={modalStyles.label}>Full Name *</label>
                <input
                  type="text"
                  style={{
                    ...modalStyles.input,
                    ...(formErrors.fullName && modalStyles.inputError)
                  }}
                  value={formData.fullName}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="Enter your full name"
                />
                {formErrors.fullName && <span style={modalStyles.error}>{formErrors.fullName}</span>}
              </div>
              <div style={modalStyles.formRow}>
                <label style={modalStyles.label}>Email *</label>
                <input
                  type="email"
                  style={{
                    ...modalStyles.input,
                    ...(formErrors.email && modalStyles.inputError)
                  }}
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="Enter your email"
                />
                {formErrors.email && <span style={modalStyles.error}>{formErrors.email}</span>}
              </div>
            </div>

            <div style={modalStyles.formGrid}>
              <div style={modalStyles.formRow}>
                <label style={modalStyles.label}>Phone *</label>
                <input
                  type="tel"
                  style={{
                    ...modalStyles.input,
                    ...(formErrors.phone && modalStyles.inputError)
                  }}
                  value={formData.phone}
                  onChange={(e) => handlePhoneChange(e.target.value)}
                  placeholder="Enter your phone number"
                />
                {formErrors.phone && <span style={modalStyles.error}>{formErrors.phone}</span>}
              </div>
              <div style={modalStyles.formRow}>
                <label style={modalStyles.label}>Specialization *</label>
                <input
                  type="text"
                  style={{
                    ...modalStyles.input,
                    ...(formErrors.specialization && modalStyles.inputError)
                  }}
                  value={formData.specialization}
                  onChange={(e) => handleInputChange('specialization', e.target.value)}
                  placeholder="Enter your specialization"
                />
                {formErrors.specialization && <span style={modalStyles.error}>{formErrors.specialization}</span>}
              </div>
            </div>

            <div style={modalStyles.formGrid}>
              <div style={modalStyles.formRow}>
                <label style={modalStyles.label}>License Number *</label>
                <input
                  type="text"
                  style={{
                    ...modalStyles.input,
                    ...(formErrors.licenseNumber && modalStyles.inputError)
                  }}
                  value={formData.licenseNumber}
                  onChange={(e) => handleLicenseChange(e.target.value)}
                  placeholder="Enter license number"
                />
                {formErrors.licenseNumber && <span style={modalStyles.error}>{formErrors.licenseNumber}</span>}
              </div>
              <div style={modalStyles.formRow}>
                <label style={modalStyles.label}>Experience *</label>
                <input
                  type="text"
                  style={{
                    ...modalStyles.input,
                    ...(formErrors.experience && modalStyles.inputError)
                  }}
                  value={formData.experience}
                  onChange={(e) => handleExperienceChange(e.target.value)}
                  placeholder="Enter years of experience"
                />
                {formErrors.experience && <span style={modalStyles.error}>{formErrors.experience}</span>}
              </div>
            </div>

            <div style={modalStyles.formRow}>
              <label style={modalStyles.label}>Hospital/Clinic</label>
              <input
                type="text"
                style={modalStyles.input}
                value={formData.hospital}
                onChange={(e) => handleInputChange('hospital', e.target.value)}
                placeholder="Enter hospital or clinic name"
              />
            </div>

            <div style={modalStyles.formRow}>
              <label style={modalStyles.label}>Address</label>
              <input
                type="text"
                style={modalStyles.input}
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                placeholder="Enter complete address"
              />
            </div>

            <div style={modalStyles.formGrid}>
              <div style={modalStyles.formRow}>
                <label style={modalStyles.label}>City</label>
                <input
                  type="text"
                  style={modalStyles.input}
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  placeholder="Enter city"
                />
              </div>
              <div style={modalStyles.formRow}>
                <label style={modalStyles.label}>State</label>
                <input
                  type="text"
                  style={modalStyles.input}
                  value={formData.state}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                  placeholder="Enter state"
                />
              </div>
              <div style={modalStyles.formRow}>
                <label style={modalStyles.label}>Pincode</label>
                <input
                  type="text"
                  style={{
                    ...modalStyles.input,
                    ...(formErrors.pincode && modalStyles.inputError)
                  }}
                  value={formData.pincode}
                  onChange={(e) => handlePincodeChange(e.target.value)}
                  placeholder="Enter 6-digit pincode"
                  maxLength="6"
                />
                {formErrors.pincode && <span style={modalStyles.error}>{formErrors.pincode}</span>}
              </div>
            </div>
          </div>
          <div style={modalStyles.actions}>
            <button 
              type="button"
              style={modalStyles.secondaryButton}
              onClick={() => {
                setShowProfileModal(false);
                setFormErrors({});
              }}
            >
              Cancel
            </button>
            <button 
              type="submit"
              style={modalStyles.primaryButton}
            >
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Notifications Modal Component
const NotificationsModal = ({ 
  notifications, 
  setShowNotificationsModal,
  handleMarkNotificationAsRead,
  handleMarkAllNotificationsAsRead,
  handleClearAllNotifications 
}) => (
  <div style={modalStyles.overlay}>
    <div style={{...modalStyles.modal, width: '500px'}}>
      <div style={modalStyles.header}>
        <h3 style={modalStyles.title}>Notifications</h3>
        <div style={modalStyles.notificationActions}>
          <button style={modalStyles.smallButton} onClick={handleMarkAllNotificationsAsRead}>
            Mark All Read
          </button>
          <button style={modalStyles.smallButton} onClick={handleClearAllNotifications}>
            Clear All
          </button>
          <button 
            style={modalStyles.closeButton}
            onClick={() => setShowNotificationsModal(false)}
          >
            ✕
          </button>
        </div>
      </div>
      <div style={modalStyles.content}>
        {notifications.length === 0 ? (
          <div style={modalStyles.emptyState}>
            <div style={modalStyles.emptyIcon}>🔔</div>
            <h4>No Notifications</h4>
            <p>You're all caught up!</p>
          </div>
        ) : (
          <div style={modalStyles.notificationsList}>
            {notifications.map(notification => (
              <div
                key={notification.id}
                style={{
                  ...modalStyles.notificationItem,
                  ...(!notification.read && modalStyles.unreadNotification)
                }}
                onClick={() => handleMarkNotificationAsRead(notification.id)}
              >
                <div style={modalStyles.notificationIcon}>
                  {notification.type === 'appointment' && '📅'}
                  {notification.type === 'message' && '💬'}
                  {notification.type === 'reminder' && '⏰'}
                  {notification.type === 'system' && '🔧'}
                  {notification.type === 'prescription' && '💊'}
                </div>
                <div style={modalStyles.notificationContent}>
                  <h4 style={modalStyles.notificationTitle}>{notification.title}</h4>
                  <p style={modalStyles.notificationMessage}>{notification.message}</p>
                  <span style={modalStyles.notificationTime}>{notification.time}</span>
                  <div style={{
                    ...modalStyles.priorityIndicator,
                    ...(notification.priority === 'high' && modalStyles.highPriority),
                    ...(notification.priority === 'medium' && modalStyles.mediumPriority),
                    ...(notification.priority === 'low' && modalStyles.lowPriority)
                  }}>
                    {notification.priority}
                  </div>
                </div>
                {!notification.read && <div style={modalStyles.unreadDot}></div>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  </div>
);

// Messages Modal Component
const MessagesModal = ({
  showMessagesModal,
  setShowMessagesModal,
  selectedPatient,
  patientMessages,
  handleSendMessage,
  handleMarkAsRead,
  handleViewFullHistory,
  handleAddNotes,
  dashboardData
}) => {
  const [newMessage, setNewMessage] = useState('');

  if (!showMessagesModal) return null;

  const patientName = selectedPatient?.name;
  const messages = patientName ? patientMessages[patientName] || [] : [];

  const handleSend = () => {
    if (newMessage.trim() && patientName) {
      handleSendMessage(patientName, newMessage);
      setNewMessage('');
    }
  };

  const formatMessageTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  return (
    <div style={modalStyles.overlay}>
      <div style={{...modalStyles.modal, width: '600px', height: '70vh'}}>
        <div style={modalStyles.header}>
          <h3 style={modalStyles.title}>
            {selectedPatient ? `Messages with ${selectedPatient.name}` : 'Messages'}
          </h3>
          <button 
            style={modalStyles.closeButton}
            onClick={() => setShowMessagesModal(false)}
          >
            ✕
          </button>
        </div>
        <div style={modalStyles.messagesContent}>
          {selectedPatient ? (
            <>
              <div style={modalStyles.chatHeader}>
                <div style={modalStyles.chatPatientInfo}>
                  <div style={modalStyles.chatAvatar}>👤</div>
                  <div>
                    <h4 style={modalStyles.chatPatientName}>{selectedPatient.name}</h4>
                    <p style={modalStyles.chatPatientDetails}>
                      {selectedPatient.conditions?.join(', ')} • Last visit: {selectedPatient.lastVisit}
                    </p>
                  </div>
                </div>
                <div style={modalStyles.chatActions}>
                  <button 
                    style={modalStyles.smallButton}
                    onClick={() => handleViewFullHistory(selectedPatient.name)}
                  >
                    View History
                  </button>
                  <button 
                    style={modalStyles.smallButton}
                    onClick={() => handleAddNotes(selectedPatient.name)}
                  >
                    Add Notes
                  </button>
                </div>
              </div>

              <div style={modalStyles.messagesList}>
                {messages.map(message => (
                  <div
                    key={message.id}
                    style={{
                      ...modalStyles.messageBubble,
                      ...(message.from === 'doctor' ? modalStyles.messageRight : modalStyles.messageLeft)
                    }}
                  >
                    <div style={{
                      ...modalStyles.messageContent,
                      ...(message.from === 'doctor' ? modalStyles.messageRightContent : modalStyles.messageLeftContent)
                    }}>
                      <p style={modalStyles.messageText}>{message.message}</p>
                      <span style={modalStyles.messageTime}>
                        {formatMessageTime(message.timestamp)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div style={modalStyles.messageInput}>
                <input
                  type="text"
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  style={modalStyles.input}
                />
                <button 
                  style={{
                    ...modalStyles.primaryButton,
                    ...(!newMessage.trim() && modalStyles.buttonDisabled)
                  }}
                  onClick={handleSend}
                  disabled={!newMessage.trim()}
                >
                  Send
                </button>
              </div>
            </>
          ) : (
            <div style={modalStyles.emptyState}>
              <div style={modalStyles.emptyIcon}>💬</div>
              <h4>Select a conversation</h4>
              <p>Choose a patient to start messaging</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Logout Modal Component
const LogoutModal = ({ setShowLogoutConfirm, onLogout }) => (
  <div style={modalStyles.overlay}>
    <div style={modalStyles.confirmModal}>
      <div style={modalStyles.confirmHeader}>
        <div style={modalStyles.confirmIcon}>🚪</div>
        <h3 style={modalStyles.title}>Confirm Logout</h3>
      </div>
      <div style={modalStyles.confirmContent}>
        <p>Are you sure you want to logout from your account?</p>
      </div>
      <div style={modalStyles.confirmActions}>
        <button 
          style={modalStyles.secondaryButton}
          onClick={() => setShowLogoutConfirm(false)}
        >
          Cancel
        </button>
        <button 
          style={modalStyles.dangerButton}
          onClick={onLogout}
        >
          Logout
        </button>
      </div>
    </div>
  </div>
);

// Consultation Modal Component
const ConsultationModal = ({
  consultationDetails,
  setConsultationDetails,
  handleViewFullHistory,
  handleAddNotes,
  handleStartConversation,
  dashboardData
}) => (
  <div style={modalStyles.overlay}>
    <div style={modalStyles.modal}>
      <div style={modalStyles.header}>
        <h3 style={modalStyles.title}>Consultation Details</h3>
        <button 
          style={modalStyles.closeButton}
          onClick={() => setConsultationDetails(null)}
        >
          ✕
        </button>
      </div>
      <div style={modalStyles.content}>
        <div style={modalStyles.patientInfo}>
          <div style={modalStyles.profileIcon}>👤</div>
          <div>
            <h4 style={modalStyles.patientName}>{consultationDetails.patientName}</h4>
            <p style={modalStyles.patientAge}>Age: {consultationDetails.age}</p>
          </div>
        </div>
        <div style={modalStyles.details}>
          <p><strong>Date & Time:</strong> {consultationDetails.date} at {consultationDetails.time}</p>
          <p><strong>Reason:</strong> {consultationDetails.issue}</p>
          <p><strong>Status:</strong> {consultationDetails.status}</p>
          {consultationDetails.prescription && (
            <p><strong>Prescription:</strong> {consultationDetails.prescription}</p>
          )}
          {consultationDetails.notes && (
            <p><strong>Doctor Notes:</strong> {consultationDetails.notes}</p>
          )}
        </div>
        <div style={modalStyles.actions}>
          <button 
            style={modalStyles.primaryButton}
            onClick={() => handleViewFullHistory(consultationDetails.patientName)}
          >
            View Full History
          </button>
          <button 
            style={modalStyles.secondaryButton}
            onClick={() => handleAddNotes(consultationDetails.patientName)}
          >
            Add Notes
          </button>
          <button 
            style={modalStyles.secondaryButton}
            onClick={() => {
              const patient = dashboardData.patients.find(p => p.name === consultationDetails.patientName);
              if (patient) handleStartConversation(patient);
            }}
          >
            Message Patient
          </button>
        </div>
      </div>
    </div>
  </div>
);

// Fixed modal styles with proper syntax
const modalStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: '12px',
    width: '90%',
    maxWidth: '500px',
    maxHeight: '90vh',
    overflow: 'auto'
  },
  confirmModal: {
    backgroundColor: 'white',
    borderRadius: '12px',
    width: '90%',
    maxWidth: '400px',
    textAlign: 'center'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '24px',
    borderBottom: '1px solid #e5e7eb'
  },
  confirmHeader: {
    padding: '32px 24px 16px',
    borderBottom: '1px solid #e5e7eb'
  },
  confirmIcon: {
    fontSize: '48px',
    marginBottom: '16px'
  },
  title: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#1f2937',
    margin: 0
  },
  closeButton: {
    background: 'none',
    border: 'none',
    fontSize: '20px',
    cursor: 'pointer',
    color: '#6b7280'
  },
  content: {
    padding: '24px'
  },
  confirmContent: {
    padding: '24px'
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
    marginBottom: '16px'
  },
  formRow: {
    marginBottom: '16px'
  },
  label: {
    display: 'block',
    marginBottom: '6px',
    fontWeight: '500',
    color: '#374151',
    fontSize: '14px'
  },
  input: {
    width: '100%',
    padding: '10px 12px',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    fontSize: '14px',
    boxSizing: 'border-box'
  },
  inputError: {
    borderColor: '#EF4444',
    backgroundColor: '#FEF2F2'
  },
  error: {
    color: '#EF4444',
    fontSize: '12px',
    marginTop: '4px',
    display: 'block'
  },
  actions: {
    display: 'flex',
    gap: '12px',
    padding: '20px 24px',
    borderTop: '1px solid #e5e7eb'
  },
  confirmActions: {
    display: 'flex',
    gap: '12px',
    padding: '20px 24px',
    borderTop: '1px solid #e5e7eb'
  },
  primaryButton: {
    flex: 1,
    padding: '12px 20px',
    backgroundColor: '#7C2A62',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer'
  },
  secondaryButton: {
    flex: 1,
    padding: '12px 20px',
    backgroundColor: 'transparent',
    color: '#6b7280',
    border: '2px solid #e5e7eb',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer'
  },
  dangerButton: {
    flex: 1,
    padding: '12px 20px',
    backgroundColor: '#EF4444',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer'
  },
  smallButton: {
    padding: '6px 12px',
    backgroundColor: 'transparent',
    color: '#7C2A62',
    border: '1px solid #7C2A62',
    borderRadius: '6px',
    fontSize: '12px',
    cursor: 'pointer'
  },
  buttonDisabled: {
    backgroundColor: '#9CA3AF',
    cursor: 'not-allowed'
  },
  notificationActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  emptyState: {
    textAlign: 'center',
    padding: '40px 20px',
    color: '#6b7280'
  },
  emptyIcon: {
    fontSize: '48px',
    marginBottom: '16px',
    opacity: 0.5
  },
  notificationsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  notificationItem: {
    display: 'flex',
    padding: '16px',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    cursor: 'pointer',
    position: 'relative'
  },
  unreadNotification: {
    backgroundColor: '#F7D9EB',
    borderColor: '#7C2A62'
  },
  notificationIcon: {
    fontSize: '20px',
    marginRight: '12px',
    marginTop: '2px'
  },
  notificationContent: {
    flex: 1
  },
  notificationTitle: {
    fontSize: '14px',
    fontWeight: '600',
    margin: '0 0 4px 0'
  },
  notificationMessage: {
    fontSize: '13px',
    color: '#6b7280',
    margin: '0 0 8px 0'
  },
  notificationTime: {
    fontSize: '11px',
    color: '#9CA3AF'
  },
  priorityIndicator: {
    display: 'inline-block',
    padding: '2px 8px',
    borderRadius: '12px',
    fontSize: '10px',
    fontWeight: '600',
    textTransform: 'uppercase'
  },
  highPriority: {
    backgroundColor: '#FEE2E2',
    color: '#DC2626'
  },
  mediumPriority: {
    backgroundColor: '#FEF3C7',
    color: '#D97706'
  },
  lowPriority: {
    backgroundColor: '#D1FAE5',
    color: '#059669'
  },
  unreadDot: {
    position: 'absolute',
    top: '12px',
    right: '12px',
    width: '8px',
    height: '8px',
    backgroundColor: '#EF4444',
    borderRadius: '50%'
  },
  messagesContent: {
    display: 'flex',
    flexDirection: 'column',
    height: '500px'
  },
  chatHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px',
    borderBottom: '1px solid #e5e7eb'
  },
  chatPatientInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  chatAvatar: {
    fontSize: '32px'
  },
  chatPatientName: {
    fontSize: '16px',
    fontWeight: '600',
    margin: '0 0 4px 0'
  },
  chatPatientDetails: {
    fontSize: '12px',
    color: '#6b7280',
    margin: 0
  },
  chatActions: {
    display: 'flex',
    gap: '8px'
  },
  messagesList: {
    flex: 1,
    padding: '20px',
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  messageBubble: {
    display: 'flex',
    maxWidth: '70%'
  },
  messageLeft: {
    alignSelf: 'flex-start'
  },
  messageRight: {
    alignSelf: 'flex-end'
  },
  messageContent: {
    padding: '12px 16px',
    borderRadius: '16px'
  },
  messageLeftContent: {
    backgroundColor: '#f3f4f6'
  },
  messageRightContent: {
    backgroundColor: '#7C2A62',
    color: 'white'
  },
  messageText: {
    margin: '0 0 4px 0',
    fontSize: '14px'
  },
  messageTime: {
    fontSize: '11px',
    opacity: 0.7
  },
  messageInput: {
    display: 'flex',
    padding: '20px',
    borderTop: '1px solid #e5e7eb',
    gap: '12px'
  },
  patientInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '20px'
  },
  profileIcon: {
    width: '50px',
    height: '50px',
    backgroundColor: '#F7D9EB',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px'
  },
  patientName: {
    fontSize: '18px',
    fontWeight: '600',
    margin: '0 0 4px 0'
  },
  patientAge: {
    fontSize: '14px',
    color: '#6b7280',
    margin: 0
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    marginBottom: '20px'
  }
};

export default DoctorModals;