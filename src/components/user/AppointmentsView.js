import React from 'react';
import { styles } from './Styles';

const AppointmentsView = ({
  appointments,
  filteredAppointments, // Add this prop
  appointmentFilter,
  setAppointmentFilter,
  setActiveView,
  rescheduleAppointment,
  cancelAppointment,
  viewAppointmentDetails
}) => {
  const BackButton = ({ onClick, text = 'Back' }) => (
    <button 
      style={styles.backButton}
      onClick={onClick}
      type="button"
    >
      ← {text}
    </button>
  );

  // Filter appointments based on the selected filter
  const getFilteredAppointments = () => {
    if (appointmentFilter === 'all') return appointments;
    
    return appointments.filter(appointment => {
      const status = appointment.status.toLowerCase();
      const filter = appointmentFilter.toLowerCase();
      
      switch (filter) {
        case 'scheduled':
          return status === 'scheduled';
        case 'pending':
          return status === 'pending';
        case 'rescheduled':
          return status === 'rescheduled';
        case 'cancelled':
          return status === 'cancelled';
        case 'completed':
          return status === 'completed';
        default:
          return true;
      }
    });
  };

  // Use the filtered appointments
  const displayAppointments = filteredAppointments || getFilteredAppointments();

  return (
    <div style={styles.appointmentsContainer}>
      <div style={styles.pageHeader}>
        <BackButton onClick={() => setActiveView('dashboard')} text="" />
        <h2 style={styles.sectionTitle}>My Appointments</h2>
      </div>
      
      {/* Appointments Filter Tabs */}
      <div style={styles.filterTabs}>
        <button 
          style={appointmentFilter === 'all' ? {...styles.filterTab, ...styles.activeFilterTab} : styles.filterTab}
          onClick={() => setAppointmentFilter('all')}
          type="button"
        >
          All Appointments
        </button>
        <button 
          style={appointmentFilter === 'scheduled' ? {...styles.filterTab, ...styles.activeFilterTab} : styles.filterTab}
          onClick={() => setAppointmentFilter('scheduled')}
          type="button"
        >
          Scheduled
        </button>
        <button 
          style={appointmentFilter === 'pending' ? {...styles.filterTab, ...styles.activeFilterTab} : styles.filterTab}
          onClick={() => setAppointmentFilter('pending')}
          type="button"
        >
          Pending
        </button>
        <button 
          style={appointmentFilter === 'rescheduled' ? {...styles.filterTab, ...styles.activeFilterTab} : styles.filterTab}
          onClick={() => setAppointmentFilter('rescheduled')}
          type="button"
        >
          Rescheduled
        </button>
        <button 
          style={appointmentFilter === 'cancelled' ? {...styles.filterTab, ...styles.activeFilterTab} : styles.filterTab}
          onClick={() => setAppointmentFilter('cancelled')}
          type="button"
        >
          Cancelled
        </button>
        <button 
          style={appointmentFilter === 'completed' ? {...styles.filterTab, ...styles.activeFilterTab} : styles.filterTab}
          onClick={() => setAppointmentFilter('completed')}
          type="button"
        >
          Completed
        </button>
      </div>

      <div style={styles.appointmentsHeader}>
        <button 
          style={styles.newAppointmentButton}
          onClick={() => setActiveView('consultation')}
          type="button"
        >
          + Book New Appointment
        </button>
      </div>

      {displayAppointments.length === 0 ? (
        <div style={styles.noAppointments}>
          <p style={styles.noAppointmentsText}>
            {appointmentFilter === 'all' 
              ? 'No appointments scheduled' 
              : `No ${appointmentFilter} appointments`}
          </p>
          <button 
            style={styles.bookAppointmentButton}
            onClick={() => setActiveView('consultation')}
            type="button"
          >
            Book Your First Appointment
          </button>
        </div>
      ) : (
        <div style={styles.appointmentsList}>
          {displayAppointments.map(appointment => (
            <div key={appointment.id} style={styles.appointmentCard}>
              <div style={styles.appointmentHeader}>
                <div>
                  <h3 style={styles.appointmentId}>Appointment #{appointment.id}</h3>
                  <p style={styles.appointmentDoctor}>{appointment.doctorName}</p>
                  <p style={styles.appointmentSpecialty}>{appointment.specialty}</p>
                </div>
                <div style={styles.appointmentStatus}>
                  <span style={{
                    ...styles.statusBadge,
                    backgroundColor: 
                      appointment.status === 'Scheduled' ? '#4CAF50' :
                      appointment.status === 'Completed' ? '#2196F3' :
                      appointment.status === 'Cancelled' ? '#FF6B6B' :
                      appointment.status === 'Rescheduled' ? '#FF9800' :
                      appointment.status === 'Pending' ? '#FFC107' : '#9E9E9E'
                  }}>
                    {appointment.status}
                  </span>
                </div>
              </div>
              
              <div style={styles.appointmentDetails}>
                <div style={styles.detailRow}>
                  <span style={styles.detailLabel}>Date:</span>
                  <span style={styles.detailValue}>{appointment.date}</span>
                </div>
                <div style={styles.detailRow}>
                  <span style={styles.detailLabel}>Time:</span>
                  <span style={styles.detailValue}>{appointment.time}</span>
                </div>
                <div style={styles.detailRow}>
                  <span style={styles.detailLabel}>Type:</span>
                  <span style={styles.detailValue}>{appointment.type}</span>
                </div>
                <div style={styles.detailRow}>
                  <span style={styles.detailLabel}>Fee:</span>
                  <span style={styles.feeValue}>₹{appointment.fee}</span>
                </div>
              </div>
              
              <div style={styles.appointmentActions}>
                {appointment.status === 'Scheduled' && (
                  <>
                    <button 
                      style={styles.rescheduleButton}
                      onClick={() => {
                        const newDate = prompt('Enter new date (YYYY-MM-DD):', appointment.date);
                        const newTime = prompt('Enter new time:', appointment.time);
                        if (newDate && newTime) {
                          rescheduleAppointment(appointment.id, newDate, newTime);
                        }
                      }}
                      type="button"
                    >
                      Reschedule
                    </button>
                    <button 
                      style={styles.cancelAppointmentButton}
                      onClick={() => {
                        if (window.confirm('Are you sure you want to cancel this appointment?')) {
                          cancelAppointment(appointment.id);
                        }
                      }}
                      type="button"
                    >
                      Cancel
                    </button>
                  </>
                )}
                {appointment.status === 'Pending' && (
                  <button 
                    style={styles.cancelAppointmentButton}
                    onClick={() => {
                      if (window.confirm('Are you sure you want to cancel this appointment?')) {
                        cancelAppointment(appointment.id);
                      }
                    }}
                    type="button"
                  >
                    Cancel
                  </button>
                )}
                <button 
                  style={styles.viewDetailsButton} 
                  onClick={() => viewAppointmentDetails(appointment)}
                  type="button"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AppointmentsView;