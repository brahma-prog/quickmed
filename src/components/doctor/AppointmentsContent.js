import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';

const AppointmentsContent = ({ dashboardData, state, actions }) => {
  const { appointmentFilter, appointments } = state;
  const { 
    setAppointmentFilter, 
    setActivePage
  } = actions;

  const isMobile = window.innerWidth <= 768;

  // State for appointments management
  const [loadingAppointments, setLoadingAppointments] = useState({});
  const [notifications, setNotifications] = useState([]);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showReminderModal, setShowReminderModal] = useState(false);
  const [showVideoConsultation, setShowVideoConsultation] = useState(false);
  const [currentConsultation, setCurrentConsultation] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [callTime, setCallTime] = useState(0);

  // Local state for appointments
  const [localAppointments, setLocalAppointments] = useState({
    pending: [...appointments.pending],
    upcoming: [...appointments.upcoming],
    cancelled: [...appointments.cancelled]
  });

  // Timer for video call
  useEffect(() => {
    let timer;
    if (showVideoConsultation && callTime >= 0) {
      timer = setInterval(() => {
        setCallTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [showVideoConsultation, callTime]);

  // Sync localAppointments with props when appointments change
  useEffect(() => {
    setLocalAppointments({
      pending: [...appointments.pending],
      upcoming: [...appointments.upcoming],
      cancelled: [...appointments.cancelled]
    });
  }, [appointments]);

  // Show simple notification
  const showNotification = useCallback((message, type = 'info') => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type }]);
    
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 3000);
  }, []);

  // Handle appointment approval
  const handleApproveAppointment = useCallback((appointment) => {
    setLoadingAppointments(prev => ({ ...prev, [appointment.id]: true }));

    setTimeout(() => {
      setLocalAppointments(prev => {
        const pendingIndex = prev.pending.findIndex(a => a.id === appointment.id);
        if (pendingIndex === -1) return prev;

        const approvedAppointment = prev.pending[pendingIndex];
        const newPending = [...prev.pending];
        newPending.splice(pendingIndex, 1);
        
        return {
          ...prev,
          pending: newPending,
          upcoming: [...prev.upcoming, { 
            ...approvedAppointment, 
            status: 'upcoming',
            approvedDate: new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'short', 
              day: 'numeric' 
            })
          }]
        };
      });
      
      showNotification(`Appointment approved for ${appointment.patientName}`, 'success');
      setLoadingAppointments(prev => ({ ...prev, [appointment.id]: false }));
    }, 1000);
  }, [showNotification]);

  // Handle appointment rejection/reschedule
  const handleRejectAppointment = useCallback((appointment, reason) => {
    setLoadingAppointments(prev => ({ ...prev, [appointment.id]: true }));

    setTimeout(() => {
      setLocalAppointments(prev => {
        const pendingIndex = prev.pending.findIndex(a => a.id === appointment.id);
        if (pendingIndex === -1) return prev;

        const rejectedAppointment = prev.pending[pendingIndex];
        const newPending = [...prev.pending];
        newPending.splice(pendingIndex, 1);
        
        return {
          ...prev,
          pending: newPending,
          cancelled: [...prev.cancelled, { 
            ...rejectedAppointment, 
            status: 'cancelled',
            cancelledDate: new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'short', 
              day: 'numeric' 
            }),
            cancelledTime: new Date().toLocaleTimeString('en-US', { 
              hour: '2-digit', 
              minute: '2-digit' 
            }),
            reason: reason,
            rejectedBy: 'doctor'
          }]
        };
      });
      
      showNotification(`Appointment rejected for ${appointment.patientName}`, 'info');
      setLoadingAppointments(prev => ({ ...prev, [appointment.id]: false }));
      setShowRejectModal(false);
      setSelectedAppointment(null);
    }, 1000);
  }, [showNotification]);

  // Handle appointment rescheduling
  const handleRescheduleAppointment = useCallback((appointment, newDate, newTime) => {
    setLoadingAppointments(prev => ({ ...prev, [appointment.id]: true }));

    setTimeout(() => {
      setLocalAppointments(prev => {
        const pendingIndex = prev.pending.findIndex(a => a.id === appointment.id);
        if (pendingIndex === -1) return prev;

        const rescheduledAppointment = prev.pending[pendingIndex];
        const newPending = [...prev.pending];
        newPending.splice(pendingIndex, 1);
        
        return {
          ...prev,
          pending: newPending,
          upcoming: [...prev.upcoming, { 
            ...rescheduledAppointment, 
            status: 'upcoming',
            date: newDate,
            time: newTime,
            originalDate: rescheduledAppointment.date,
            originalTime: rescheduledAppointment.time,
            rescheduledBy: 'doctor',
            rescheduledDate: new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'short', 
              day: 'numeric' 
            })
          }]
        };
      });
      
      showNotification(`Appointment rescheduled for ${appointment.patientName}`, 'success');
      setLoadingAppointments(prev => ({ ...prev, [appointment.id]: false }));
      setShowRejectModal(false);
      setSelectedAppointment(null);
    }, 1000);
  }, [showNotification]);

  // Start video consultation
  const handleStartConsultation = useCallback((appointment) => {
    setCurrentConsultation(appointment);
    setShowVideoConsultation(true);
    setCallTime(0);
    showNotification(`Starting video consultation with ${appointment.patientName}`, 'info');
  }, [showNotification]);

  // End video consultation
  const handleEndConsultation = useCallback(() => {
    setShowVideoConsultation(false);
    setIsRecording(false);
    setIsScreenSharing(false);
    showNotification(`Video consultation ended with ${currentConsultation?.patientName}`, 'info');
    
    // Move appointment from upcoming to completed
    if (currentConsultation) {
      setLocalAppointments(prev => {
        const upcomingIndex = prev.upcoming.findIndex(a => a.id === currentConsultation.id);
        if (upcomingIndex === -1) return prev;

        const newUpcoming = [...prev.upcoming];
        newUpcoming.splice(upcomingIndex, 1);
        
        return {
          ...prev,
          upcoming: newUpcoming
        };
      });
    }
    
    setCurrentConsultation(null);
  }, [currentConsultation, showNotification]);

  // Toggle recording
  const handleToggleRecording = useCallback(() => {
    setIsRecording(!isRecording);
    showNotification(isRecording ? 'Recording stopped' : 'Recording started', 'info');
  }, [isRecording, showNotification]);

  // Toggle screen sharing
  const handleToggleScreenShare = useCallback(() => {
    setIsScreenSharing(!isScreenSharing);
    showNotification(isScreenSharing ? 'Screen sharing stopped' : 'Screen sharing started', 'info');
  }, [isScreenSharing, showNotification]);

  // Handle send reminder
  const handleSendReminder = useCallback((appointment, message, method) => {
    setLoadingAppointments(prev => ({ ...prev, [appointment.id]: true }));
    
    setTimeout(() => {
      showNotification(`Reminder sent via ${method.toUpperCase()} to ${appointment.patientName}`, 'success');
      setLoadingAppointments(prev => ({ ...prev, [appointment.id]: false }));
      setShowReminderModal(false);
      setSelectedAppointment(null);
    }, 1000);
  }, [showNotification]);

  // Format call time
  const formatCallTime = useCallback((seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, []);

  // Get current date for date input
  const getCurrentDate = useCallback(() => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  }, []);

  // Get filtered appointments
  const getFilteredAppointments = useCallback(() => {
    switch (appointmentFilter) {
      case 'pending': return localAppointments.pending;
      case 'upcoming': return localAppointments.upcoming;
      case 'cancelled': return localAppointments.cancelled;
      default: return localAppointments.upcoming;
    }
  }, [appointmentFilter, localAppointments]);

  // Reject/Reschedule Modal Component
  const RejectRescheduleModal = React.memo(({ 
    show, 
    appointment, 
    onClose, 
    onReject, 
    onReschedule,
    loading 
  }) => {
    const [rejectReason, setRejectReason] = useState('');
    const [rescheduleDate, setRescheduleDate] = useState('');
    const [rescheduleTime, setRescheduleTime] = useState('');

    const handleRejectReasonChange = (e) => {
      setRejectReason(e.target.value);
    };

    const handleRescheduleDateChange = (e) => {
      setRescheduleDate(e.target.value);
    };

    const handleRescheduleTimeChange = (e) => {
      setRescheduleTime(e.target.value);
    };

    const handleRejectSubmit = () => {
      if (rejectReason.trim()) {
        onReject(appointment, rejectReason);
      }
    };

    const handleRescheduleSubmit = () => {
      if (rescheduleDate && rescheduleTime) {
        onReschedule(appointment, rescheduleDate, rescheduleTime);
      }
    };

    if (!show || !appointment) return null;

    return (
      <div style={styles.modalOverlay}>
        <div style={styles.modal}>
          <div style={styles.modalHeader}>
            <h3 style={styles.modalTitle}>
              Manage Appointment - {appointment.patientName}
            </h3>
            <button 
              style={styles.closeButton}
              onClick={onClose}
            >
              ✕
            </button>
          </div>

          <div style={styles.modalContent}>
            <div style={styles.appointmentInfoCard}>
              <p><strong>Patient:</strong> {appointment.patientName}</p>
              <p><strong>Age:</strong> {appointment.age}</p>
              <p><strong>Scheduled:</strong> {appointment.date} at {appointment.time}</p>
              <p><strong>Issue:</strong> {appointment.issue}</p>
              <p><strong>Duration:</strong> {appointment.duration}</p>
              {appointment.fee && (
                <p><strong>Fee:</strong> {appointment.fee}</p>
              )}
            </div>

            <div style={styles.section}>
              <h4 style={styles.sectionTitle}>Reject Appointment</h4>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Reason for rejection:</label>
                <textarea 
                  style={styles.textarea}
                  placeholder="Provide reason for rejecting this appointment..."
                  value={rejectReason}
                  onChange={handleRejectReasonChange}
                  rows="3"
                />
              </div>
              <button 
                style={styles.dangerButton}
                onClick={handleRejectSubmit}
                disabled={!rejectReason.trim() || loading}
              >
                {loading ? 'Processing...' : 'Reject Appointment'}
              </button>
            </div>

            <div style={styles.divider}>
              <span style={styles.dividerText}>OR</span>
            </div>

            <div style={styles.section}>
              <h4 style={styles.sectionTitle}>Reschedule Appointment</h4>
              <div style={styles.inputGroup}>
                <label style={styles.label}>New Date:</label>
                <input 
                  type="date" 
                  style={styles.input}
                  min={getCurrentDate()}
                  value={rescheduleDate}
                  onChange={handleRescheduleDateChange}
                />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>New Time:</label>
                <input 
                  type="time" 
                  style={styles.input}
                  value={rescheduleTime}
                  onChange={handleRescheduleTimeChange}
                />
              </div>
              <button 
                style={styles.successButton}
                onClick={handleRescheduleSubmit}
                disabled={!rescheduleDate || !rescheduleTime || loading}
              >
                {loading ? 'Processing...' : 'Reschedule Appointment'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  });

  // Reminder Modal Component
  const ReminderModal = React.memo(({ 
    show, 
    appointment, 
    onClose, 
    onSendReminder,
    loading 
  }) => {
    const [reminderMessage, setReminderMessage] = useState('');
    const [reminderMethod, setReminderMethod] = useState('sms');

    const handleReminderMessageChange = (e) => {
      setReminderMessage(e.target.value);
    };

    const handleMethodChange = (method) => {
      setReminderMethod(method);
    };

    const handleTimeOptionClick = (option) => {
      let message = '';
      switch(option) {
        case '24h':
          message = `Reminder: Your appointment with Dr. is scheduled for tomorrow at ${appointment.time}. Please be on time.`;
          break;
        case '1h':
          message = `Reminder: Your appointment is in 1 hour. Please join the video call or arrive at the clinic.`;
          break;
        case 'now':
          message = `Final reminder: Your appointment starts now. Please join the video consultation.`;
          break;
        default:
          message = '';
      }
      setReminderMessage(message);
    };

    const handleSubmit = () => {
      if (reminderMessage.trim()) {
        onSendReminder(appointment, reminderMessage, reminderMethod);
      }
    };

    if (!show || !appointment) return null;

    return (
      <div style={styles.modalOverlay}>
        <div style={styles.modal}>
          <div style={styles.modalHeader}>
            <h3 style={styles.modalTitle}>
              Send Reminder - {appointment.patientName}
            </h3>
            <button 
              style={styles.closeButton}
              onClick={onClose}
            >
              ✕
            </button>
          </div>

          <div style={styles.modalContent}>
            <div style={styles.appointmentInfoCard}>
              <p><strong>Patient:</strong> {appointment.patientName}</p>
              <p><strong>Age:</strong> {appointment.age}</p>
              <p><strong>Scheduled:</strong> {appointment.date} at {appointment.time}</p>
              <p><strong>Issue:</strong> {appointment.issue}</p>
            </div>

            <div style={styles.section}>
              <h4 style={styles.sectionTitle}>Reminder Details</h4>
              
              <div style={styles.inputGroup}>
                <label style={styles.label}>Select Method:</label>
                <div style={styles.methodOptions}>
                  <label style={{
                    ...styles.methodOption,
                    ...(reminderMethod === 'sms' && styles.activeMethodOption)
                  }}>
                    <input
                      type="radio"
                      value="sms"
                      checked={reminderMethod === 'sms'}
                      onChange={() => handleMethodChange('sms')}
                      style={styles.radioInput}
                    />
                    <span style={styles.methodLabel}>📱 SMS</span>
                  </label>
                  <label style={{
                    ...styles.methodOption,
                    ...(reminderMethod === 'email' && styles.activeMethodOption)
                  }}>
                    <input
                      type="radio"
                      value="email"
                      checked={reminderMethod === 'email'}
                      onChange={() => handleMethodChange('email')}
                      style={styles.radioInput}
                    />
                    <span style={styles.methodLabel}>📧 Email</span>
                  </label>
                  <label style={{
                    ...styles.methodOption,
                    ...(reminderMethod === 'whatsapp' && styles.activeMethodOption)
                  }}>
                    <input
                      type="radio"
                      value="whatsapp"
                      checked={reminderMethod === 'whatsapp'}
                      onChange={() => handleMethodChange('whatsapp')}
                      style={styles.radioInput}
                    />
                    <span style={styles.methodLabel}>💬 WhatsApp</span>
                  </label>
                </div>
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Reminder Message:</label>
                <textarea 
                  style={styles.textarea}
                  placeholder={`Reminder for ${appointment.patientName}'s appointment on ${appointment.date} at ${appointment.time}`}
                  value={reminderMessage}
                  onChange={handleReminderMessageChange}
                  rows="4"
                />
                <div style={styles.messagePreview}>
                  <strong>Preview:</strong>
                  <div style={styles.previewText}>
                    {reminderMessage || 'Your reminder message will appear here...'}
                  </div>
                </div>
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Quick Templates:</label>
                <div style={styles.timeOptions}>
                  <button 
                    type="button"
                    style={styles.timeOption}
                    onClick={() => handleTimeOptionClick('24h')}
                  >
                    24 hours before
                  </button>
                  <button 
                    type="button"
                    style={styles.timeOption}
                    onClick={() => handleTimeOptionClick('1h')}
                  >
                    1 hour before
                  </button>
                  <button 
                    type="button"
                    style={styles.timeOption}
                    onClick={() => handleTimeOptionClick('now')}
                  >
                    At appointment time
                  </button>
                </div>
              </div>

              <button 
                style={styles.primaryButton}
                onClick={handleSubmit}
                disabled={!reminderMessage.trim() || loading}
              >
                {loading ? 'Sending...' : `Send ${reminderMethod.toUpperCase()} Reminder`}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  });

  // Video Consultation Modal Component
  const VideoConsultationModal = React.memo(({ 
    show, 
    consultation, 
    callTime,
    isRecording,
    isScreenSharing,
    onEndCall,
    onToggleRecording,
    onToggleScreenShare,
    onClose 
  }) => {
    const [notes, setNotes] = useState('');

    const handleNotesChange = (e) => {
      setNotes(e.target.value);
    };

    const handleSaveNotes = () => {
      if (notes.trim()) {
        showNotification('Consultation notes saved', 'success');
      } else {
        showNotification('Please add some notes before saving', 'error');
      }
    };

    if (!show || !consultation) return null;

    return (
      <div style={styles.videoModalOverlay}>
        <div style={styles.videoModal}>
          <div style={styles.videoHeader}>
            <div style={styles.videoHeaderInfo}>
              <div style={styles.videoStatus}>
                <span style={styles.connectedDot}>●</span>
                <span>Status: connected</span>
              </div>
              <div style={styles.callTimer}>
                <span>{formatCallTime(callTime)}</span>
              </div>
            </div>
            <button 
              style={styles.endCallButton}
              onClick={onEndCall}
            >
              End Call
            </button>
          </div>

          <div style={styles.videoMainArea}>
            <div style={styles.patientVideoContainer}>
              <div style={styles.patientVideoHeader}>
                <div style={styles.patientVideoInfo}>
                  <h3 style={styles.patientVideoName}>{consultation.patientName}</h3>
                  <div style={styles.appointmentInfo}>
                    Age: {consultation.age} • {consultation.issue}
                  </div>
                </div>
              </div>
              
              <div style={styles.videoFeed}>
                <div style={styles.videoMock}>
                  <div style={styles.videoMockContent}>
                    <div style={styles.videoMockAvatar}>
                      <span style={styles.avatarEmoji}>👤</span>
                    </div>
                    <div style={styles.videoMockInfo}>
                      <p style={styles.videoMockText}>Live Video Feed</p>
                      <p style={styles.videoMockSubtext}>{consultation.patientName}</p>
                    </div>
                  </div>
                </div>
                
                <div style={styles.selfView}>
                  <div style={styles.selfViewHeader}>
                    <span style={styles.selfViewLabel}>You</span>
                  </div>
                  <div style={styles.selfViewVideo}>
                    <div style={styles.selfViewMock}>
                      <span style={styles.selfViewEmoji}>👨‍⚕️</span>
                      <p style={styles.selfViewText}>Dr. View</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div style={styles.quickTools}>
              <div style={styles.quickToolsHeader}>
                <h4 style={styles.quickToolsTitle}>Consultation Tools</h4>
              </div>
              
              <div style={styles.toolButtons}>
                <button 
                  style={isScreenSharing ? styles.activeToolButton : styles.toolButton}
                  onClick={onToggleScreenShare}
                >
                  <span style={styles.toolIcon}>🖥️</span>
                  <span>Share Screen</span>
                </button>
                
                <button 
                  style={isRecording ? styles.recordingButton : styles.toolButton}
                  onClick={onToggleRecording}
                >
                  <span style={styles.toolIcon}>⏺️</span>
                  <span>{isRecording ? 'Recording...' : 'Record'}</span>
                </button>
                
                <button 
                  style={styles.toolButton}
                  onClick={() => showNotification('Opening prescription pad', 'info')}
                >
                  <span style={styles.toolIcon}>💊</span>
                  <span>Prescription</span>
                </button>
                
                <button 
                  style={styles.toolButton}
                  onClick={() => {
                    if (setActivePage) {
                      setActivePage('messages');
                    }
                    showNotification('Opening chat with patient', 'info');
                  }}
                >
                  <span style={styles.toolIcon}>💬</span>
                  <span>Chat</span>
                </button>
                
                <button 
                  style={styles.toolButton}
                  onClick={() => showNotification('Opening medical history', 'info')}
                >
                  <span style={styles.toolIcon}>📋</span>
                  <span>History</span>
                </button>
              </div>
              
              <div style={styles.consultationNotes}>
                <h4 style={styles.notesTitle}>Consultation Notes</h4>
                <textarea 
                  style={styles.notesTextarea}
                  placeholder="Add notes about symptoms, observations, recommendations..."
                  value={notes}
                  onChange={handleNotesChange}
                  rows="4"
                />
                <button 
                  style={styles.saveNotesButton}
                  onClick={handleSaveNotes}
                >
                  Save Notes
                </button>
              </div>
            </div>
          </div>

          <div style={styles.videoFooter}>
            <div style={styles.appointmentInfo}>
              <strong>Patient:</strong> {consultation.patientName}
            </div>
            <div style={styles.consultationType}>
              <strong>Issue:</strong> {consultation.issue} • {consultation.duration}
            </div>
          </div>
        </div>
      </div>
    );
  });

  // AppointmentCard Component (Updated - removed cancel button from upcoming section)
  const AppointmentCard = React.memo(({ appointment, filter, onApprove, onRejectReschedule, onStartConsultation, onSendReminder, loading }) => {
    const isLoading = loading[appointment.id];

    return (
      <div style={styles.appointmentCard}>
        <div style={styles.appointmentHeader}>
          <div style={styles.appointmentPatient}>
            <div style={styles.profileIcon}>
              <span>👤</span>
            </div>
            <div style={styles.patientInfo}>
              <h3 style={styles.appointmentName}>
                {appointment.patientName}
                {appointment.priority === 'high' && (
                  <span style={styles.priorityBadge}>High Priority</span>
                )}
              </h3>
              <p style={styles.appointmentMeta}>
                Age: {appointment.age} • {appointment.type || 'Consultation'}
                {appointment.fee && appointment.fee !== 'Free' && (
                  <span style={styles.feeBadge}>💰 {appointment.fee}</span>
                )}
              </p>
            </div>
          </div>
          <div style={styles.appointmentTime}>
            <strong>{appointment.time}</strong>
            <span>{appointment.date}</span>
            {appointment.fee && appointment.fee === 'Free' && (
              <span style={styles.freeBadge}>🆓 Free</span>
            )}
          </div>
        </div>
        
        <div style={styles.appointmentDetails}>
          <p><strong>Reason:</strong> {appointment.issue}</p>
          <p><strong>Duration:</strong> {appointment.duration}</p>
          {appointment.location && (
            <p><strong>Location:</strong> {appointment.location}</p>
          )}
        </div>

        <div style={styles.appointmentActions}>
          {filter === 'pending' && (
            <>
              <button 
                style={styles.successButton}
                onClick={() => onApprove(appointment)}
                disabled={isLoading}
              >
                {isLoading ? 'Approving...' : 'Approve'}
              </button>
              <button 
                style={styles.secondaryButton}
                onClick={() => onRejectReschedule(appointment)}
                disabled={isLoading}
              >
                {isLoading ? 'Processing...' : 'Reject/Reschedule'}
              </button>
            </>
          )}
          
          {filter === 'upcoming' && (
            <>
              <button 
                style={styles.primaryButton}
                onClick={() => onStartConsultation(appointment)}
                disabled={isLoading}
              >
                Start Consultation
              </button>
              <button 
                style={styles.secondaryButton}
                onClick={() => onSendReminder(appointment)}
                disabled={isLoading}
              >
                Send Reminder
              </button>
            </>
          )}
          
          {filter === 'cancelled' && (
            <div style={styles.cancelledInfo}>
              <p><strong>Cancelled Date:</strong> {appointment.cancelledDate || 'N/A'}</p>
              <p><strong>Cancelled Time:</strong> {appointment.cancelledTime || 'N/A'}</p>
              <p><strong>Reason:</strong> {appointment.reason || 'Not specified'}</p>
            </div>
          )}
        </div>
      </div>
    );
  });

  // Notifications Component
  const Notifications = React.memo(() => (
    <div style={styles.notificationsContainer}>
      {notifications.map(notification => (
        <div
          key={notification.id}
          style={{
            ...styles.notification,
            backgroundColor: notification.type === 'success' ? '#4CAF50' :
                           notification.type === 'error' ? '#F44336' : '#009688'
          }}
        >
          {notification.message}
        </div>
      ))}
    </div>
  ));

  const filteredAppointments = useMemo(() => getFilteredAppointments(), [getFilteredAppointments]);

  return (
    <div style={styles.mainContent}>
      <Notifications />
      <RejectRescheduleModal 
        show={showRejectModal}
        appointment={selectedAppointment}
        onClose={() => {
          setShowRejectModal(false);
          setSelectedAppointment(null);
        }}
        onReject={handleRejectAppointment}
        onReschedule={handleRescheduleAppointment}
        loading={selectedAppointment ? loadingAppointments[selectedAppointment.id] : false}
      />
      <ReminderModal 
        show={showReminderModal}
        appointment={selectedAppointment}
        onClose={() => {
          setShowReminderModal(false);
          setSelectedAppointment(null);
        }}
        onSendReminder={handleSendReminder}
        loading={selectedAppointment ? loadingAppointments[selectedAppointment.id] : false}
      />
      <VideoConsultationModal 
        show={showVideoConsultation}
        consultation={currentConsultation}
        callTime={callTime}
        isRecording={isRecording}
        isScreenSharing={isScreenSharing}
        onEndCall={handleEndConsultation}
        onToggleRecording={handleToggleRecording}
        onToggleScreenShare={handleToggleScreenShare}
        onClose={() => {
          setShowVideoConsultation(false);
          setCurrentConsultation(null);
        }}
      />
      
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <h1 style={styles.greeting}>Appointments</h1>
          <p style={styles.subtitle}>Manage your upcoming and cancelled consultations</p>
        </div>
        {!isMobile && (
          <div style={styles.filterTabs}>
            <button
              style={{
                ...styles.filterTab,
                ...(appointmentFilter === 'pending' && styles.filterTabActive)
              }}
              onClick={() => setAppointmentFilter('pending')}
            >
              Pending ({localAppointments.pending?.length || 0})
            </button>
            <button
              style={{
                ...styles.filterTab,
                ...(appointmentFilter === 'upcoming' && styles.filterTabActive)
              }}
              onClick={() => setAppointmentFilter('upcoming')}
            >
              Upcoming ({localAppointments.upcoming?.length || 0})
            </button>
            <button
              style={{
                ...styles.filterTab,
                ...(appointmentFilter === 'cancelled' && styles.filterTabActive)
              }}
              onClick={() => setAppointmentFilter('cancelled')}
            >
              Cancelled ({localAppointments.cancelled?.length || 0})
            </button>
          </div>
        )}
      </div>

      {/* Mobile Filter Tabs */}
      {isMobile && (
        <div style={styles.mobileFilterTabs}>
          <select 
            value={appointmentFilter}
            onChange={(e) => setAppointmentFilter(e.target.value)}
            style={styles.mobileFilterSelect}
          >
            <option value="pending">Pending ({localAppointments.pending?.length || 0})</option>
            <option value="upcoming">Upcoming ({localAppointments.upcoming?.length || 0})</option>
            <option value="cancelled">Cancelled ({localAppointments.cancelled?.length || 0})</option>
          </select>
        </div>
      )}

      <div style={styles.appointmentsContainer}>
        {filteredAppointments.length > 0 ? (
          filteredAppointments.map(appointment => (
            <AppointmentCard 
              key={appointment.id} 
              appointment={appointment} 
              filter={appointmentFilter}
              onApprove={handleApproveAppointment}
              onRejectReschedule={(appt) => {
                setSelectedAppointment(appt);
                setShowRejectModal(true);
              }}
              onStartConsultation={handleStartConsultation}
              onSendReminder={(appt) => {
                setSelectedAppointment(appt);
                setShowReminderModal(true);
              }}
              loading={loadingAppointments}
            />
          ))
        ) : (
          <div style={styles.emptyState}>
            <div style={styles.emptyIcon}>📅</div>
            <h4 style={styles.emptyTitle}>No Appointments</h4>
            <p style={styles.emptyMessage}>
              {appointmentFilter === 'pending' ? 'No pending appointments.' :
               appointmentFilter === 'upcoming' ? 'No upcoming appointments.' :
               'No cancelled appointments.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

// Styles
const styles = {
  mainContent: {
    padding: 'clamp(15px, 3vw, 30px)',
    backgroundColor: '#E0F2F1',
    minHeight: '100vh'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '30px',
    flexWrap: 'wrap',
    gap: '20px'
  },
  headerLeft: {
    flex: 1
  },
  greeting: {
    fontSize: 'clamp(20px, 4vw, 28px)',
    fontWeight: '700',
    color: '#124441',
    margin: '0 0 8px 0'
  },
  subtitle: {
    fontSize: 'clamp(14px, 2vw, 16px)',
    color: '#4F6F6B',
    margin: 0
  },
  filterTabs: {
    display: 'flex',
    gap: '8px',
    backgroundColor: '#FFFFFF',
    padding: '4px',
    borderRadius: '8px',
    border: '1px solid #B2DFDB',
    flexWrap: 'wrap'
  },
  mobileFilterTabs: {
    marginBottom: '20px'
  },
  mobileFilterSelect: {
    width: '100%',
    padding: '12px',
    border: '1px solid #B2DFDB',
    borderRadius: '8px',
    fontSize: '16px',
    backgroundColor: '#FFFFFF'
  },
  filterTab: {
    padding: '8px 16px',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    whiteSpace: 'nowrap',
    transition: 'all 0.3s ease'
  },
  filterTabActive: {
    backgroundColor: '#009688',
    color: '#FFFFFF'
  },
  appointmentsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  appointmentCard: {
    backgroundColor: '#FFFFFF',
    padding: '25px',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0, 150, 136, 0.1)',
    border: '1px solid #B2DFDB',
    transition: 'transform 0.2s, box-shadow 0.2s'
  },
  appointmentCardHover: {
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 12px rgba(0, 150, 136, 0.15)'
  },
  appointmentHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '20px',
    flexWrap: 'wrap',
    gap: '20px'
  },
  appointmentPatient: {
    display: 'flex',
    gap: '15px',
    alignItems: 'center'
  },
  profileIcon: {
    width: '50px',
    height: '50px',
    background: 'linear-gradient(135deg, #E0F2F1 0%, #B2DFDB 100%)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '22px',
    color: '#124441',
    flexShrink: 0
  },
  patientInfo: {
    flex: 1
  },
  appointmentName: {
    fontSize: '18px',
    fontWeight: '600',
    marginBottom: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    flexWrap: 'wrap',
    color: '#124441'
  },
  priorityBadge: {
    background: '#FEE2E2',
    color: '#DC2626',
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '500',
    border: '1px solid #FCA5A5'
  },
  appointmentMeta: {
    fontSize: '14px',
    color: '#4F6F6B',
    marginBottom: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    flexWrap: 'wrap'
  },
  feeBadge: {
    background: '#E0F2F1',
    color: '#009688',
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '500',
    border: '1px solid #4DB6AC'
  },
  freeBadge: {
    background: '#10B981',
    color: '#FFFFFF',
    padding: '3px 8px',
    borderRadius: '6px',
    fontSize: '12px',
    border: '1px solid #10B981'
  },
  appointmentTime: {
    textAlign: 'right',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    color: '#124441',
    minWidth: '180px'
  },
  appointmentDetails: {
    marginBottom: '20px',
    fontSize: '14px',
    color: '#4F6F6B'
  },
  appointmentActions: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap'
  },
  cancelledInfo: {
    width: '100%',
    padding: '15px',
    background: '#FFEBEE',
    borderRadius: '8px',
    fontSize: '14px',
    color: '#C62828',
    border: '1px solid #FFCDD2'
  },
  primaryButton: {
    padding: '10px 20px',
    background: 'linear-gradient(135deg, #009688 0%, #00796B 100%)',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
    minWidth: '160px',
    transition: 'all 0.3s ease'
  },
  primaryButtonHover: {
    opacity: 0.9,
    transform: 'translateY(-2px)'
  },
  secondaryButton: {
    padding: '10px 20px',
    background: 'transparent',
    color: '#009688',
    border: '2px solid #009688',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.3s ease'
  },
  secondaryButtonHover: {
    background: 'rgba(0, 150, 136, 0.1)'
  },
  successButton: {
    padding: '10px 20px',
    background: 'linear-gradient(135deg, #4CAF50 0%, #388E3C 100%)',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
    transition: 'all 0.3s ease'
  },
  successButtonHover: {
    opacity: 0.9,
    transform: 'translateY(-2px)'
  },
  dangerButton: {
    padding: '10px 20px',
    background: 'linear-gradient(135deg, #F44336 0%, #D32F2F 100%)',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
    transition: 'all 0.3s ease'
  },
  dangerButtonHover: {
    opacity: 0.9,
    transform: 'translateY(-2px)'
  },
  emptyState: {
    textAlign: 'center',
    padding: '60px 40px',
    color: '#4F6F6B',
    background: '#FFFFFF',
    borderRadius: '12px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    border: '2px dashed #BDBDBD'
  },
  emptyIcon: {
    fontSize: '48px',
    marginBottom: '16px',
    opacity: 0.5
  },
  emptyTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#124441',
    margin: '0 0 8px 0'
  },
  emptyMessage: {
    fontSize: '14px',
    color: '#4F6F6B',
    margin: '0 0 20px 0'
  },
  // Video Consultation Styles
  videoModalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(18, 68, 65, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2000
  },
  videoModal: {
    background: '#FFFFFF',
    borderRadius: '12px',
    width: '95%',
    maxWidth: '1200px',
    height: '80vh',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden'
  },
  videoHeader: {
    background: '#009688',
    color: '#FFFFFF',
    padding: '15px 25px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  videoHeaderInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px'
  },
  videoStatus: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px'
  },
  connectedDot: {
    color: '#4CAF50',
    fontSize: '12px'
  },
  callTimer: {
    background: 'rgba(255, 255, 255, 0.1)',
    padding: '5px 12px',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: '600'
  },
  endCallButton: {
    background: '#F44336',
    color: '#FFFFFF',
    border: 'none',
    padding: '8px 20px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600',
    transition: 'all 0.3s ease'
  },
  endCallButtonHover: {
    background: '#D32F2F',
    transform: 'translateY(-2px)'
  },
  videoMainArea: {
    flex: 1,
    display: 'flex',
    overflow: 'hidden'
  },
  patientVideoContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    background: '#E0F2F1'
  },
  patientVideoHeader: {
    padding: '15px 25px',
    borderBottom: '1px solid #B2DFDB',
    background: '#FFFFFF'
  },
  patientVideoInfo: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  patientVideoName: {
    margin: 0,
    fontSize: '18px',
    fontWeight: '600',
    color: '#124441'
  },
  appointmentInfo: {
    background: '#E0F2F1',
    color: '#124441',
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '14px',
    border: '1px solid #B2DFDB'
  },
  videoFeed: {
    flex: 1,
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    position: 'relative'
  },
  videoMock: {
    flex: 1,
    background: 'linear-gradient(135deg, #009688 0%, #00796B 100%)',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  videoMockContent: {
    textAlign: 'center',
    color: '#FFFFFF'
  },
  videoMockAvatar: {
    fontSize: '80px',
    marginBottom: '20px'
  },
  avatarEmoji: {
    fontSize: '80px'
  },
  videoMockText: {
    fontSize: '24px',
    fontWeight: '600',
    margin: 0,
    marginBottom: '5px'
  },
  videoMockSubtext: {
    fontSize: '16px',
    opacity: 0.9,
    margin: 0
  },
  selfView: {
    width: '200px',
    background: '#FFFFFF',
    borderRadius: '12px',
    border: '2px solid #B2DFDB',
    position: 'absolute',
    bottom: '20px',
    right: '20px',
    overflow: 'hidden'
  },
  selfViewHeader: {
    background: '#E0F2F1',
    padding: '8px 12px',
    borderBottom: '1px solid #B2DFDB'
  },
  selfViewLabel: {
    fontSize: '12px',
    fontWeight: '600',
    color: '#124441'
  },
  selfViewVideo: {
    padding: '15px',
    textAlign: 'center'
  },
  selfViewMock: {
    background: '#E0F2F1',
    borderRadius: '8px',
    padding: '15px'
  },
  selfViewEmoji: {
    fontSize: '40px',
    marginBottom: '5px'
  },
  selfViewText: {
    fontSize: '12px',
    color: '#124441',
    margin: 0
  },
  quickTools: {
    width: '300px',
    background: '#FFFFFF',
    borderLeft: '1px solid #B2DFDB',
    display: 'flex',
    flexDirection: 'column'
  },
  quickToolsHeader: {
    padding: '20px',
    borderBottom: '1px solid #B2DFDB'
  },
  quickToolsTitle: {
    margin: 0,
    fontSize: '16px',
    fontWeight: '600',
    color: '#124441'
  },
  toolButtons: {
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  toolButton: {
    background: '#FFFFFF',
    border: '1px solid #B2DFDB',
    padding: '12px 16px',
    borderRadius: '8px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '14px',
    color: '#124441',
    transition: 'all 0.2s'
  },
  toolButtonHover: {
    background: '#E0F2F1',
    borderColor: '#009688'
  },
  activeToolButton: {
    background: '#E0F2F1',
    border: '1px solid #009688',
    padding: '12px 16px',
    borderRadius: '8px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '14px',
    color: '#009688',
    fontWeight: '500'
  },
  recordingButton: {
    background: '#FFEBEE',
    border: '1px solid #F44336',
    padding: '12px 16px',
    borderRadius: '8px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '14px',
    color: '#F44336',
    fontWeight: '500'
  },
  toolIcon: {
    fontSize: '18px'
  },
  consultationNotes: {
    flex: 1,
    padding: '20px',
    display: 'flex',
    flexDirection: 'column'
  },
  notesTitle: {
    margin: '0 0 15px 0',
    fontSize: '14px',
    fontWeight: '600',
    color: '#124441'
  },
  notesTextarea: {
    flex: 1,
    border: '1px solid #B2DFDB',
    borderRadius: '8px',
    padding: '12px',
    fontSize: '14px',
    fontFamily: 'inherit',
    resize: 'none',
    marginBottom: '15px'
  },
  saveNotesButton: {
    background: '#009688',
    color: '#FFFFFF',
    border: 'none',
    padding: '10px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '500',
    fontSize: '14px',
    transition: 'all 0.3s ease'
  },
  saveNotesButtonHover: {
    background: '#00796B',
    transform: 'translateY(-2px)'
  },
  videoFooter: {
    background: '#E0F2F1',
    padding: '12px 25px',
    borderTop: '1px solid #B2DFDB',
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '14px',
    color: '#124441'
  },
  // Modal Styles
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(18, 68, 65, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '20px'
  },
  modal: {
    background: '#FFFFFF',
    borderRadius: '16px',
    maxWidth: '600px',
    width: '100%',
    maxHeight: '90vh',
    overflow: 'auto',
    boxShadow: '0 20px 60px rgba(0, 150, 136, 0.3)'
  },
  modalHeader: {
    padding: '25px',
    borderBottom: '1px solid #E0E0E0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: '#F8FAFC',
    borderTopLeftRadius: '16px',
    borderTopRightRadius: '16px'
  },
  modalTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#124441',
    margin: 0
  },
  closeButton: {
    background: 'none',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
    color: '#4F6F6B',
    padding: 0,
    width: '32px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '4px',
    transition: 'all 0.2s'
  },
  closeButtonHover: {
    background: '#E0E0E0'
  },
  modalContent: {
    padding: '25px'
  },
  appointmentInfoCard: {
    background: '#E0F2F1',
    padding: '15px',
    borderRadius: '8px',
    marginBottom: '25px',
    border: '1px solid #B2DFDB',
    fontSize: '14px',
    color: '#124441'
  },
  section: {
    marginBottom: '25px'
  },
  sectionTitle: {
    fontSize: '18px',
    fontWeight: '600',
    marginBottom: '15px',
    color: '#124441',
    paddingBottom: '10px',
    borderBottom: '2px solid #E0E0E0'
  },
  inputGroup: {
    marginBottom: '20px'
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontSize: '14px',
    color: '#4F6F6B',
    fontWeight: '500'
  },
  input: {
    width: '100%',
    padding: '12px 15px',
    border: '1px solid #B2DFDB',
    borderRadius: '8px',
    fontSize: '14px',
    color: '#124441',
    boxSizing: 'border-box'
  },
  inputFocus: {
    outline: 'none',
    borderColor: '#009688',
    boxShadow: '0 0 0 3px rgba(0, 150, 136, 0.1)'
  },
  textarea: {
    width: '100%',
    padding: '12px 15px',
    border: '1px solid #B2DFDB',
    borderRadius: '8px',
    fontSize: '14px',
    color: '#124441',
    boxSizing: 'border-box',
    fontFamily: 'inherit',
    resize: 'vertical'
  },
  textareaFocus: {
    outline: 'none',
    borderColor: '#009688',
    boxShadow: '0 0 0 3px rgba(0, 150, 136, 0.1)'
  },
  divider: {
    display: 'flex',
    alignItems: 'center',
    margin: '30px 0',
    color: '#4F6F6B'
  },
  dividerText: {
    padding: '0 15px',
    fontSize: '14px',
    fontWeight: '500',
    color: '#4F6F6B'
  },
  methodOptions: {
    display: 'flex',
    gap: '15px',
    marginBottom: '20px'
  },
  methodOption: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer',
    padding: '10px 15px',
    background: '#F5F5F5',
    borderRadius: '8px',
    border: '1px solid #E0E0E0',
    flex: 1,
    justifyContent: 'center',
    transition: 'all 0.3s ease'
  },
  methodOptionHover: {
    background: '#E0E0E0'
  },
  activeMethodOption: {
    background: '#E0F2F1',
    borderColor: '#009688',
    borderWidth: '2px'
  },
  radioInput: {
    margin: 0
  },
  methodLabel: {
    fontSize: '14px',
    color: '#124441'
  },
  messagePreview: {
    marginTop: '15px',
    padding: '15px',
    background: '#F5F5F5',
    borderRadius: '8px',
    border: '1px solid #E0E0E0'
  },
  previewText: {
    fontSize: '13px',
    color: '#4F6F6B',
    marginTop: '8px',
    fontStyle: 'italic'
  },
  timeOptions: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
    flexWrap: 'wrap'
  },
  timeOption: {
    padding: '10px 15px',
    background: 'transparent',
    color: '#009688',
    border: '1px solid #009688',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: '500',
    transition: 'all 0.3s ease'
  },
  timeOptionHover: {
    background: 'rgba(0, 150, 136, 0.1)'
  },
  // Notifications Styles
  notificationsContainer: {
    position: 'fixed',
    top: '20px',
    right: '20px',
    zIndex: 1001,
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  notification: {
    padding: '15px 25px',
    borderRadius: '8px',
    color: '#FFFFFF',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    fontSize: '14px',
    fontWeight: '500',
    maxWidth: '400px',
    wordBreak: 'break-word',
    animation: 'slideIn 0.3s ease'
  },
  // Animations
  slideIn: {
    from: {
      transform: 'translateX(100%)',
      opacity: 0
    },
    to: {
      transform: 'translateX(0)',
      opacity: 1
    }
  }
};

// Add hover effects
const addHoverEffects = () => {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideIn {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    
    .appointmentCard:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 12px rgba(0, 150, 136, 0.15);
    }
    
    .primaryButton:hover {
      opacity: 0.9;
      transform: translateY(-2px);
    }
    
    .secondaryButton:hover {
      background: rgba(0, 150, 136, 0.1);
    }
    
    .successButton:hover {
      opacity: 0.9;
      transform: translateY(-2px);
    }
    
    .dangerButton:hover {
      opacity: 0.9;
      transform: translateY(-2px);
    }
    
    .endCallButton:hover {
      background: #D32F2F;
      transform: translateY(-2px);
    }
    
    .toolButton:hover {
      background: #E0F2F1;
      border-color: #009688;
    }
    
    .saveNotesButton:hover {
      background: #00796B;
      transform: translateY(-2px);
    }
    
    .closeButton:hover {
      background: #E0E0E0;
    }
    
    .methodOption:hover {
      background: #E0E0E0;
    }
    
    .timeOption:hover {
      background: rgba(0, 150, 136, 0.1);
    }
    
    input:focus, textarea:focus {
      outline: none;
      border-color: #009688;
      box-shadow: 0 0 0 3px rgba(0, 150, 136, 0.1);
    }
    
    /* Scrollbar Styling */
    ::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }
    
    ::-webkit-scrollbar-track {
      background: #f1f1f1;
      border-radius: 4px;
    }
    
    ::-webkit-scrollbar-thumb {
      background: #888;
      border-radius: 4px;
    }
    
    ::-webkit-scrollbar-thumb:hover {
      background: #555;
    }
    
    .modal::-webkit-scrollbar {
      width: 6px;
    }
    
    .modal::-webkit-scrollbar-track {
      background: #f1f1f1;
      border-radius: 3px;
    }
    
    .modal::-webkit-scrollbar-thumb {
      background: #B2DFDB;
      border-radius: 3px;
    }
    
    .modal::-webkit-scrollbar-thumb:hover {
      background: #009688;
    }
  `;
  document.head.appendChild(style);
};

// Initialize hover effects
if (typeof window !== 'undefined') {
  addHoverEffects();
}

// Button States
const buttonDisabled = {
  opacity: 0.6,
  cursor: 'not-allowed',
  transform: 'none !important'
};

export default AppointmentsContent;