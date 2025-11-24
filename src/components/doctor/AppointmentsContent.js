import React, { useState, useEffect } from 'react';

const AppointmentsContent = ({ dashboardData, state, actions }) => {
  const { appointmentFilter, appointments } = state;
  const { 
    setAppointmentFilter, 
    handleStartConsultation, 
    handleCancelAppointment,
    handleApproveAppointment,
    handleRejectAppointment,
    handleStartConversation,
    handleViewFullHistory,
    handleAddNotes
  } = actions;

  const isMobile = window.innerWidth <= 768;

  // State for real-time messaging features
  const [messageStatus, setMessageStatus] = useState({});
  const [unreadCounts, setUnreadCounts] = useState({});
  const [onlineStatus, setOnlineStatus] = useState({});

  // Simulate real-time updates for messaging
  useEffect(() => {
    const initialStatus = {};
    const initialUnread = {};
    const initialOnline = {};
    
    dashboardData.patients?.forEach(patient => {
      initialStatus[patient.id] = 'idle';
      initialUnread[patient.id] = Math.floor(Math.random() * 3);
      initialOnline[patient.id] = Math.random() > 0.3;
    });
    
    setMessageStatus(initialStatus);
    setUnreadCounts(initialUnread);
    setOnlineStatus(initialOnline);

    const statusInterval = setInterval(() => {
      setMessageStatus(prev => {
        const updated = { ...prev };
        Object.keys(updated).forEach(patientId => {
          const random = Math.random();
          if (random < 0.7) {
            updated[patientId] = 'online';
          } else if (random < 0.85) {
            updated[patientId] = 'typing';
          } else {
            updated[patientId] = 'offline';
          }
        });
        return updated;
      });

      setUnreadCounts(prev => {
        const updated = { ...prev };
        Object.keys(updated).forEach(patientId => {
          if (Math.random() < 0.1) {
            updated[patientId] = (updated[patientId] || 0) + 1;
          }
        });
        return updated;
      });
    }, 8000);

    return () => clearInterval(statusInterval);
  }, [dashboardData.patients]);

  const getFilteredAppointments = () => {
    switch (appointmentFilter) {
      case 'pending': return appointments.pending;
      case 'upcoming': return appointments.upcoming;
      case 'cancelled': return appointments.cancelled;
      default: return appointments.upcoming;
    }
  };

  const getPatientFromAppointment = (appointment) => {
    return dashboardData.patients?.find(p => 
      p.name === appointment.patientName || p.id === appointment.patientId
    );
  };

  const getMessageButtonStatus = (patient) => {
    if (!patient) return null;
    
    const status = messageStatus[patient.id];
    const unreadCount = unreadCounts[patient.id] || 0;
    const isOnline = onlineStatus[patient.id];
    
    return { status, unreadCount, isOnline };
  };

  const handleMessageClick = (appointment) => {
    const patient = getPatientFromAppointment(appointment);
    if (patient) {
      setUnreadCounts(prev => ({
        ...prev,
        [patient.id]: 0
      }));
      handleStartConversation(patient);
    }
  };

  const MessageButton = ({ appointment }) => {
    const patient = getPatientFromAppointment(appointment);
    const messageStatus = getMessageButtonStatus(patient);
    
    if (!patient) return null;

    const { status, unreadCount, isOnline } = messageStatus;
    
    const getButtonStyle = () => {
      const baseStyle = { ...styles.secondaryButton };
      
      if (unreadCount > 0) {
        return {
          ...baseStyle,
          backgroundColor: '#FEF3C7',
          borderColor: '#F59E0B',
          color: '#92400E',
          position: 'relative'
        };
      }
      
      return { ...baseStyle, position: 'relative' };
    };

    return (
      <button 
        style={getButtonStyle()}
        onClick={() => handleMessageClick(appointment)}
        title={`Message ${patient.name} (${isOnline ? 'Online' : 'Offline'})`}
      >
        <div style={styles.messageButtonContent}>
          <span>💬 Message</span>
          {(unreadCount > 0 || status === 'typing') && (
            <div style={styles.messageIndicators}>
              {unreadCount > 0 && (
                <span style={styles.unreadBadge}>{unreadCount > 9 ? '9+' : unreadCount}</span>
              )}
              {status === 'typing' && (
                <span style={styles.typingIndicator} title="Typing...">✍️</span>
              )}
            </div>
          )}
          <span style={styles.statusIndicator} title={isOnline ? 'Online' : 'Offline'}>
            {isOnline ? '🟢' : '⚫'}
          </span>
        </div>
      </button>
    );
  };

  const AppointmentCard = ({ appointment }) => {
    const patient = getPatientFromAppointment(appointment);
    const messageStatus = getMessageButtonStatus(patient);

    return (
      <div style={styles.appointmentCard}>
        <div style={styles.appointmentHeader}>
          <div style={styles.appointmentPatient}>
            <div style={styles.profileIcon}>
              <span>👤</span>
              {messageStatus?.isOnline && (
                <div style={styles.onlineStatus}></div>
              )}
            </div>
            <div style={styles.patientInfo}>
              <h3 style={styles.appointmentName}>
                {appointment.patientName}
                {messageStatus?.status === 'typing' && (
                  <span style={styles.typingBadge} title="Patient is typing...">✍️</span>
                )}
              </h3>
              <p style={styles.appointmentMeta}>Age: {appointment.age} • {appointment.type || 'Consultation'}</p>
            </div>
          </div>
          <div style={styles.appointmentTime}>
            <strong>{appointment.time}</strong>
            <span>{appointment.date}</span>
            {appointmentFilter === 'pending' && appointment.requestedDate && (
              <span style={styles.requestedDate}>Requested: {appointment.requestedDate}</span>
            )}
            {appointmentFilter === 'cancelled' && appointment.cancelledDate && (
              <span style={styles.cancelledInfo}>Cancelled: {appointment.cancelledDate}</span>
            )}
          </div>
        </div>
        
        <div style={styles.appointmentDetails}>
          <p style={styles.appointmentIssue}><strong>Reason:</strong> {appointment.issue}</p>
          <p style={styles.appointmentDuration}><strong>Duration:</strong> {appointment.duration}</p>
          {appointment.priority && (
            <span style={{
              ...styles.priorityBadge,
              ...(appointment.priority === 'high' && styles.highPriorityBadge)
            }}>
              {appointment.priority}
            </span>
          )}
          {appointmentFilter === 'cancelled' && appointment.reason && (
            <p style={styles.cancelledReason}><strong>Cancellation Reason:</strong> {appointment.reason}</p>
          )}
        </div>

        <div style={styles.appointmentActions}>
          {appointmentFilter === 'pending' ? (
            <>
              <button 
                style={styles.successButton}
                onClick={() => handleApproveAppointment(appointment.id)}
              >
                Approve
              </button>
              <button 
                style={styles.dangerButton}
                onClick={() => handleRejectAppointment(appointment.id)}
              >
                Reject
              </button>
              <MessageButton appointment={appointment} />
            </>
          ) : appointmentFilter === 'upcoming' ? (
            <>
              <button 
                style={styles.primaryButton}
                onClick={() => handleStartConsultation(appointment.id)}
              >
                Start Consultation
              </button>
              <button 
                style={styles.dangerButton}
                onClick={() => handleCancelAppointment(appointment.id)}
              >
                Cancel
              </button>
              <MessageButton appointment={appointment} />
            </>
          ) : (
            <>
              <button 
                style={styles.viewHistoryButton}
                onClick={() => handleViewFullHistory(appointment.patientName)}
              >
                View History
              </button>
              <button 
                style={styles.secondaryButton}
                onClick={() => handleAddNotes(appointment.patientName)}
              >
                Add Notes
              </button>
              <MessageButton appointment={appointment} />
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <div style={styles.mainContent}>
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
              Pending ({appointments.pending.length})
            </button>
            <button
              style={{
                ...styles.filterTab,
                ...(appointmentFilter === 'upcoming' && styles.filterTabActive)
              }}
              onClick={() => setAppointmentFilter('upcoming')}
            >
              Upcoming ({appointments.upcoming.length})
            </button>
            <button
              style={{
                ...styles.filterTab,
                ...(appointmentFilter === 'cancelled' && styles.filterTabActive)
              }}
              onClick={() => setAppointmentFilter('cancelled')}
            >
              Cancelled ({appointments.cancelled.length})
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
            <option value="pending">Pending ({appointments.pending.length})</option>
            <option value="upcoming">Upcoming ({appointments.upcoming.length})</option>
            <option value="cancelled">Cancelled ({appointments.cancelled.length})</option>
          </select>
        </div>
      )}

      <div style={styles.appointmentsContainer}>
        {getFilteredAppointments().map(appointment => (
          <AppointmentCard key={appointment.id} appointment={appointment} />
        ))}
      </div>
    </div>
  );
};

const styles = {
  mainContent: {
    padding: 'clamp(15px, 3vw, 30px)',
    textAlign: 'left'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '30px',
    textAlign: 'left',
    flexWrap: 'wrap',
    gap: '20px'
  },
  headerLeft: {
    textAlign: 'left',
    flex: 1
  },
  greeting: {
    fontSize: 'clamp(20px, 4vw, 28px)',
    fontWeight: '700',
    color: '#1f2937',
    margin: '0 0 8px 0',
    textAlign: 'left'
  },
  subtitle: {
    fontSize: 'clamp(14px, 2vw, 16px)',
    color: '#6b7280',
    margin: 0,
    textAlign: 'left'
  },
  filterTabs: {
    display: 'flex',
    gap: '8px',
    backgroundColor: 'white',
    padding: '4px',
    borderRadius: '8px',
    border: '1px solid #e5e7eb',
    flexWrap: 'wrap'
  },
  mobileFilterTabs: {
    marginBottom: '20px'
  },
  mobileFilterSelect: {
    width: '100%',
    padding: '12px',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    fontSize: '16px'
  },
  filterTab: {
    padding: '8px 16px',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    whiteSpace: 'nowrap'
  },
  filterTabActive: {
    backgroundColor: '#7C2A62',
    color: 'white'
  },
  appointmentsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    textAlign: 'left'
  },
  appointmentCard: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    border: '1px solid #e5e7eb',
    textAlign: 'left'
  },
  appointmentHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '16px',
    textAlign: 'left',
    flexWrap: 'wrap',
    gap: '15px'
  },
  appointmentPatient: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    textAlign: 'left',
    flex: 1
  },
  patientInfo: {
    textAlign: 'left',
    flex: 1
  },
  profileIcon: {
    position: 'relative',
    width: '40px',
    height: '40px',
    backgroundColor: '#F7D9EB',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '16px',
    flexShrink: 0
  },
  appointmentName: {
    fontSize: 'clamp(16px, 2.5vw, 18px)',
    fontWeight: '600',
    color: '#1f2937',
    margin: '0 0 4px 0',
    textAlign: 'left',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    flexWrap: 'wrap'
  },
  appointmentMeta: {
    fontSize: '14px',
    color: '#6b7280',
    margin: 0,
    textAlign: 'left'
  },
  appointmentTime: {
    textAlign: 'right',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    flexShrink: 0
  },
  requestedDate: {
    fontSize: '12px',
    color: '#6b7280',
    fontStyle: 'italic'
  },
  cancelledInfo: {
    fontSize: '12px',
    color: '#EF4444',
    fontStyle: 'italic'
  },
  appointmentDetails: {
    marginBottom: '16px',
    textAlign: 'left'
  },
  appointmentIssue: {
    fontSize: '14px',
    color: '#6b7280',
    margin: '0 0 8px 0',
    textAlign: 'left'
  },
  appointmentDuration: {
    fontSize: '14px',
    color: '#6b7280',
    margin: '0 0 8px 0',
    textAlign: 'left'
  },
  cancelledReason: {
    fontSize: '14px',
    color: '#EF4444',
    margin: '0 0 8px 0',
    fontStyle: 'italic',
    textAlign: 'left'
  },
  priorityBadge: {
    backgroundColor: '#F59E0B',
    color: 'white',
    padding: '4px 8px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: '500',
    display: 'inline-block'
  },
  highPriorityBadge: {
    backgroundColor: '#EF4444'
  },
  appointmentActions: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap',
    textAlign: 'left'
  },
  primaryButton: {
    backgroundColor: '#7C2A62',
    color: 'white',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    minWidth: '120px'
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    color: '#7C2A62',
    border: '2px solid #7C2A62',
    padding: '6px 10px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    minWidth: '90px'
  },
  viewHistoryButton: {
    backgroundColor: '#7C2A62',
    color: 'white',
    border: 'none',
    padding: '6px 10px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    minWidth: '100px'
  },
  successButton: {
    backgroundColor: '#10B981',
    color: 'white',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    minWidth: '80px'
  },
  dangerButton: {
    backgroundColor: '#EF4444',
    color: 'white',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    minWidth: '80px'
  },
  messageButtonContent: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    position: 'relative'
  },
  messageIndicators: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px'
  },
  unreadBadge: {
    backgroundColor: '#EF4444',
    color: 'white',
    borderRadius: '50%',
    width: '18px',
    height: '18px',
    fontSize: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold'
  },
  typingIndicator: {
    fontSize: '12px'
  },
  statusIndicator: {
    fontSize: '8px'
  },
  onlineStatus: {
    position: 'absolute',
    bottom: '2px',
    right: '2px',
    width: '8px',
    height: '8px',
    backgroundColor: '#10B981',
    borderRadius: '50%',
    border: '2px solid white'
  },
  typingBadge: {
    marginLeft: '8px',
    fontSize: '12px'
  }
};

export default AppointmentsContent;