import React from 'react';

const AppointmentsContent = ({ dashboardData, state, actions }) => {
  const { appointmentFilter, appointments } = state;
  const { 
    setAppointmentFilter, 
    handleStartConsultation, 
    handleRescheduleAppointment, 
    handleCancelAppointment,
    handleApproveAppointment,
    handleRejectAppointment,
    handleStartConversation,
    handleViewFullHistory,
    handleAddNotes
  } = actions;

  const getFilteredAppointments = () => {
    switch (appointmentFilter) {
      case 'pending': return appointments.pending;
      case 'upcoming': return appointments.upcoming;
      case 'rescheduled': return appointments.rescheduled;
      case 'cancelled': return appointments.cancelled;
      default: return appointments.upcoming;
    }
  };

  const AppointmentCard = ({ appointment }) => (
    <div style={styles.appointmentCard}>
      <div style={styles.appointmentHeader}>
        <div style={styles.appointmentPatient}>
          <div style={styles.profileIcon}>👤</div>
          <div>
            <h3 style={styles.appointmentName}>{appointment.patientName}</h3>
            <p style={styles.appointmentMeta}>Age: {appointment.age} • {appointment.type || 'Consultation'}</p>
          </div>
        </div>
        <div style={styles.appointmentTime}>
          <strong>{appointment.time}</strong>
          <span>{appointment.date}</span>
          {appointmentFilter === 'pending' && appointment.requestedDate && (
            <span style={styles.requestedDate}>Requested: {appointment.requestedDate}</span>
          )}
          {appointmentFilter === 'rescheduled' && appointment.originalDate && (
            <span style={styles.rescheduledInfo}>Originally: {appointment.originalDate}</span>
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
        {appointmentFilter === 'rescheduled' && appointment.reason && (
          <p style={styles.rescheduledReason}><strong>Reschedule Reason:</strong> {appointment.reason}</p>
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
            <button 
              style={styles.secondaryButton}
              onClick={() => {
                const patient = dashboardData.patients.find(p => p.name === appointment.patientName);
                if (patient) handleStartConversation(patient);
              }}
            >
              Message
            </button>
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
              style={styles.secondaryButton}
              onClick={() => handleRescheduleAppointment(appointment.id)}
            >
              Reschedule
            </button>
            <button 
              style={styles.dangerButton}
              onClick={() => handleCancelAppointment(appointment.id)}
            >
              Cancel
            </button>
            <button 
              style={styles.secondaryButton}
              onClick={() => {
                const patient = dashboardData.patients.find(p => p.name === appointment.patientName);
                if (patient) handleStartConversation(patient);
              }}
            >
              Message
            </button>
          </>
        ) : (
          <>
            <button 
              style={styles.primaryButton}
              onClick={() => handleViewFullHistory(appointment.patientName)}
            >
              View Full History
            </button>
            <button 
              style={styles.secondaryButton}
              onClick={() => handleAddNotes(appointment.patientName)}
            >
              Add Notes
            </button>
            <button 
              style={styles.secondaryButton}
              onClick={() => {
                const patient = dashboardData.patients.find(p => p.name === appointment.patientName);
                if (patient) handleStartConversation(patient);
              }}
            >
              Message
            </button>
          </>
        )}
      </div>
    </div>
  );

  return (
    <div style={styles.mainContent}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.greeting}>Appointments</h1>
          <p style={styles.subtitle}>Manage your upcoming, rescheduled and cancelled consultations</p>
        </div>
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
              ...(appointmentFilter === 'rescheduled' && styles.filterTabActive)
            }}
            onClick={() => setAppointmentFilter('rescheduled')}
          >
            Rescheduled ({appointments.rescheduled.length})
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
      </div>

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
    padding: '30px'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '30px'
  },
  greeting: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#1f2937',
    margin: '0 0 8px 0'
  },
  subtitle: {
    fontSize: '16px',
    color: '#6b7280',
    margin: 0
  },
  filterTabs: {
    display: 'flex',
    gap: '8px',
    backgroundColor: 'white',
    padding: '4px',
    borderRadius: '8px',
    border: '1px solid #e5e7eb'
  },
  filterTab: {
    padding: '8px 16px',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500'
  },
  filterTabActive: {
    backgroundColor: '#7C2A62',
    color: 'white'
  },
  appointmentsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  appointmentCard: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    border: '1px solid #e5e7eb'
  },
  appointmentHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '16px'
  },
  appointmentPatient: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  profileIcon: {
    width: '40px',
    height: '40px',
    backgroundColor: '#F7D9EB',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '16px'
  },
  appointmentName: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#1f2937',
    margin: '0 0 4px 0'
  },
  appointmentMeta: {
    fontSize: '14px',
    color: '#6b7280',
    margin: 0
  },
  appointmentTime: {
    textAlign: 'right',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  },
  requestedDate: {
    fontSize: '12px',
    color: '#6b7280',
    fontStyle: 'italic'
  },
  rescheduledInfo: {
    fontSize: '12px',
    color: '#F59E0B',
    fontStyle: 'italic'
  },
  cancelledInfo: {
    fontSize: '12px',
    color: '#EF4444',
    fontStyle: 'italic'
  },
  appointmentDetails: {
    marginBottom: '16px'
  },
  appointmentIssue: {
    fontSize: '14px',
    color: '#6b7280',
    margin: '0 0 8px 0'
  },
  appointmentDuration: {
    fontSize: '14px',
    color: '#6b7280',
    margin: '0 0 8px 0'
  },
  rescheduledReason: {
    fontSize: '14px',
    color: '#F59E0B',
    margin: '0 0 8px 0',
    fontStyle: 'italic'
  },
  cancelledReason: {
    fontSize: '14px',
    color: '#EF4444',
    margin: '0 0 8px 0',
    fontStyle: 'italic'
  },
  priorityBadge: {
    backgroundColor: '#F59E0B',
    color: 'white',
    padding: '4px 8px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: '500'
  },
  highPriorityBadge: {
    backgroundColor: '#EF4444'
  },
  appointmentActions: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap'
  },
  primaryButton: {
    backgroundColor: '#7C2A62',
    color: 'white',
    border: 'none',
    padding: '10px 16px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer'
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    color: '#7C2A62',
    border: '2px solid #7C2A62',
    padding: '8px 16px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer'
  },
  successButton: {
    backgroundColor: '#10B981',
    color: 'white',
    border: 'none',
    padding: '10px 16px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer'
  },
  dangerButton: {
    backgroundColor: '#EF4444',
    color: 'white',
    border: 'none',
    padding: '10px 16px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer'
  }
};

export default AppointmentsContent;