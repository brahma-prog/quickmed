import React from 'react';

const DashboardContent = ({ dashboardData, state, actions }) => {
  const { timeRange, appointments } = state;
  const { 
    setTimeRange, 
    setConsultationDetails, 
    handleStartConversation, 
    handleStartConsultation, 
    handleCancelAppointment 
  } = actions;

  const isMobile = window.innerWidth <= 768;
  const isTablet = window.innerWidth <= 1024;

  const AnalyticsCard = ({ icon, number, label, color }) => (
    <div style={styles.analyticsCard}>
      <div style={{...styles.analyticsIcon, backgroundColor: color}}>{icon}</div>
      <div style={styles.analyticsContent}>
        <h3 style={styles.analyticsNumber}>{number}</h3>
        <p style={styles.analyticsLabel}>{label}</p>
      </div>
    </div>
  );

  const ConsultationCard = ({ consultation }) => (
    <div style={styles.consultationCard}>
      <div style={styles.consultationHeader}>
        <div style={styles.patientInfo}>
          <div style={styles.profileIcon}>👤</div>
          <div>
            <h4 style={styles.patientName}>{consultation.patientName}</h4>
            <p style={styles.consultationTime}>
              {consultation.time} • {consultation.date}
            </p>
          </div>
        </div>
        <span style={styles.statusBadge}>{consultation.status}</span>
      </div>
      <p style={styles.consultationIssue}>{consultation.issue}</p>
      <div style={styles.consultationActions}>
        <button
          style={styles.viewDetailsButton}
          onClick={() => setConsultationDetails(consultation)}
        >
          View Details
        </button>
        <button
          style={styles.secondaryButton}
          onClick={() => {
            const patient = dashboardData.patients.find(p => p.name === consultation.patientName);
            if (patient) handleStartConversation(patient);
          }}
        >
          Message
        </button>
      </div>
    </div>
  );

  const UpcomingAppointmentCard = ({ appointment }) => (
    <div style={styles.upcomingCard}>
      <div style={styles.upcomingHeader}>
        <div style={styles.profileIconLarge}>👤</div>
        <div style={styles.upcomingPatientInfo}>
          <h3 style={styles.upcomingPatientName}>{appointment.patientName}</h3>
          <p style={styles.upcomingPatientAge}>Age: {appointment.age}</p>
        </div>
      </div>
      <div style={styles.upcomingDetails}>
        <div style={styles.detailItem}>
          <span style={styles.detailLabel}>Time:</span>
          <span style={styles.detailValue}>{appointment.time}</span>
        </div>
        <div style={styles.detailItem}>
          <span style={styles.detailLabel}>Date:</span>
          <span style={styles.detailValue}>{appointment.date}</span>
        </div>
        <div style={styles.detailItem}>
          <span style={styles.detailLabel}>Duration:</span>
          <span style={styles.detailValue}>{appointment.duration}</span>
        </div>
        <div style={styles.detailItem}>
          <span style={styles.detailLabel}>Reason:</span>
          <span style={styles.detailValue}>{appointment.issue}</span>
        </div>
      </div>
      <div style={styles.upcomingActions}>
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
      </div>
    </div>
  );

  return (
    <div style={styles.mainContent}>
      {/* Analytics Grid */}
      <div style={{
        ...styles.analyticsGrid,
        gridTemplateColumns: isMobile ? '1fr' : isTablet ? '1fr 1fr' : '1fr 1fr 1fr 1fr',
        gap: isMobile ? '15px' : '20px'
      }}>
        <AnalyticsCard
          icon="📅"
          number={dashboardData.appointments[timeRange]}
          label="Total Appointments"
          color="#F7D9EB"
        />
        <AnalyticsCard
          icon="🩺"
          number={dashboardData.consultations[timeRange]}
          label="Consultations Completed"
          color="#E8F4FD"
        />
        <AnalyticsCard
          icon="❌"
          number={dashboardData.cancelled[timeRange]}
          label="Cancelled"
          color="#FFE6E6"
        />
        
        {!isMobile && (
          <div style={styles.timeRangeSelector}>
            <button
              style={{
                ...styles.timeRangeButton,
                ...(timeRange === 'today' && styles.timeRangeButtonActive)
              }}
              onClick={() => setTimeRange('today')}
            >
              Today
            </button>
            <button
              style={{
                ...styles.timeRangeButton,
                ...(timeRange === 'week' && styles.timeRangeButtonActive)
              }}
              onClick={() => setTimeRange('week')}
            >
              This Week
            </button>
            <button
              style={{
                ...styles.timeRangeButton,
                ...(timeRange === 'month' && styles.timeRangeButtonActive)
              }}
              onClick={() => setTimeRange('month')}
            >
              This Month
            </button>
          </div>
        )}
      </div>

      {/* Mobile Time Range Selector */}
      {isMobile && (
        <div style={styles.mobileTimeRange}>
          <button
            style={{
              ...styles.timeRangeButton,
              ...(timeRange === 'today' && styles.timeRangeButtonActive)
            }}
            onClick={() => setTimeRange('today')}
          >
            Today
          </button>
          <button
            style={{
              ...styles.timeRangeButton,
              ...(timeRange === 'week' && styles.timeRangeButtonActive)
            }}
            onClick={() => setTimeRange('week')}
          >
            This Week
          </button>
          <button
            style={{
              ...styles.timeRangeButton,
              ...(timeRange === 'month' && styles.timeRangeButtonActive)
            }}
            onClick={() => setTimeRange('month')}
            >
            This Month
          </button>
        </div>
      )}

      <div style={{
        ...styles.contentGrid,
        gridTemplateColumns: isMobile ? '1fr' : isTablet ? '1fr' : '2fr 1fr',
        gap: isMobile ? '20px' : '30px'
      }}>
        {/* Recent Consultations */}
        <div style={styles.section}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>Recent Patient Consultations</h2>
            <span style={styles.viewAll}>View All</span>
          </div>
          <div style={styles.consultationsList}>
            {dashboardData.recentConsultations.map(consultation => (
              <ConsultationCard key={consultation.id} consultation={consultation} />
            ))}
          </div>
        </div>

        {/* Upcoming Appointments Sidebar */}
        <div style={styles.sidebarSection}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>Upcoming Appointment</h2>
          </div>
          {appointments.upcoming.slice(0, 1).map(appointment => (
            <UpcomingAppointmentCard key={appointment.id} appointment={appointment} />
          ))}

          <div style={styles.moreAppointments}>
            <h4 style={styles.moreAppointmentsTitle}>More Appointments Today</h4>
            {appointments.upcoming.slice(1, 3).map(appointment => (
              <div key={appointment.id} style={styles.smallAppointmentCard}>
                <div style={styles.smallAppointmentInfo}>
                  <span style={styles.smallAppointmentTime}>{appointment.time}</span>
                  <span style={styles.smallAppointmentName}>{appointment.patientName}</span>
                </div>
                <span style={styles.smallAppointmentDuration}>
                  {appointment.duration}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  mainContent: {
    padding: 'clamp(15px, 3vw, 30px)'
  },
  analyticsGrid: {
    display: 'grid',
    marginBottom: '30px'
  },
  mobileTimeRange: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
    justifyContent: 'center'
  },
  analyticsCard: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    display: 'flex',
    alignItems: 'center',
    border: '1px solid #e5e7eb'
  },
  analyticsIcon: {
    fontSize: 'clamp(24px, 3vw, 32px)',
    marginRight: '16px',
    width: 'clamp(50px, 8vw, 60px)',
    height: 'clamp(50px, 8vw, 60px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '12px'
  },
  analyticsContent: {
    flex: 1
  },
  analyticsNumber: {
    fontSize: 'clamp(20px, 3vw, 28px)',
    fontWeight: '700',
    color: '#1f2937',
    margin: '0 0 4px 0'
  },
  analyticsLabel: {
    fontSize: 'clamp(12px, 1.5vw, 14px)',
    color: '#6b7280',
    margin: 0
  },
  timeRangeSelector: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  timeRangeButton: {
    padding: '12px 16px',
    backgroundColor: 'white',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    flex: 1
  },
  timeRangeButtonActive: {
    backgroundColor: '#7C2A62',
    color: 'white',
    borderColor: '#7C2A62'
  },
  contentGrid: {
    display: 'grid'
  },
  section: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    border: '1px solid #e5e7eb'
  },
  sidebarSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    flexWrap: 'wrap',
    gap: '10px'
  },
  sectionTitle: {
    fontSize: 'clamp(18px, 2.5vw, 20px',
    fontWeight: '600',
    color: '#1f2937',
    margin: 0
  },
  viewAll: {
    fontSize: '14px',
    color: '#7C2A62',
    fontWeight: '500',
    cursor: 'pointer'
  },
  consultationsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  consultationCard: {
    padding: '16px',
    border: '1px solid #e5e7eb',
    borderRadius: '10px'
  },
  consultationHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '12px',
    flexWrap: 'wrap',
    gap: '10px'
  },
  patientInfo: {
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
    fontSize: '16px',
    flexShrink: 0
  },
  patientName: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#1f2937',
    margin: '0 0 4px 0'
  },
  consultationTime: {
    fontSize: '14px',
    color: '#6b7280',
    margin: 0
  },
  statusBadge: {
    backgroundColor: '#10B981',
    color: 'white',
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '500',
    flexShrink: 0
  },
  consultationIssue: {
    fontSize: '14px',
    color: '#6b7280',
    margin: '0 0 16px 0',
    lineHeight: '1.5'
  },
  consultationActions: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap'
  },
  viewDetailsButton: {
    backgroundColor: '#7C2A62',
    color: 'white',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    minWidth: '100px'
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    color: '#7C2A62',
    border: '2px solid #7C2A62',
    padding: '8px 12px',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    minWidth: '90px'
  },
  primaryButton: {
    backgroundColor: '#7C2A62',
    color: 'white',
    border: 'none',
    padding: '10px 16px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    flex: 1,
    minWidth: '140px'
  },
  dangerButton: {
    backgroundColor: '#EF4444',
    color: 'white',
    border: 'none',
    padding: '10px 16px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    flex: 1,
    minWidth: '100px'
  },
  upcomingCard: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    border: '1px solid #e5e7eb'
  },
  upcomingHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    marginBottom: '20px'
  },
  profileIconLarge: {
    width: '60px',
    height: '60px',
    backgroundColor: '#F7D9EB',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px',
    flexShrink: 0
  },
  upcomingPatientInfo: {
    flex: 1
  },
  upcomingPatientName: {
    fontSize: 'clamp(18px, 2.5vw, 20px)',
    fontWeight: '600',
    color: '#1f2937',
    margin: '0 0 4px 0'
  },
  upcomingPatientAge: {
    fontSize: '14px',
    color: '#6b7280',
    margin: 0
  },
  upcomingDetails: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    marginBottom: '20px'
  },
  detailItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  detailLabel: {
    fontSize: '14px',
    color: '#6b7280',
    fontWeight: '500'
  },
  detailValue: {
    fontSize: '14px',
    color: '#1f2937',
    fontWeight: '600'
  },
  upcomingActions: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap'
  },
  moreAppointments: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    border: '1px solid #e5e7eb'
  },
  moreAppointmentsTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#1f2937',
    margin: '0 0 16px 0'
  },
  smallAppointmentCard: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 0',
    borderBottom: '1px solid #e5e7eb'
  },
  smallAppointmentInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px'
  },
  smallAppointmentTime: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#1f2937'
  },
  smallAppointmentName: {
    fontSize: '12px',
    color: '#6b7280'
  },
  smallAppointmentDuration: {
    fontSize: '12px',
    color: '#7C2A62',
    fontWeight: '500'
  }
};

export default DashboardContent;