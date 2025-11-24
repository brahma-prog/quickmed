import React from 'react';

const PatientsContent = ({ dashboardData, state, actions }) => {
  const { patientSearch } = state;
  const { setPatientSearch, handleStartConversation, handleViewFullHistory, handleAddNotes } = actions;

  const isMobile = window.innerWidth <= 768;
  const isTablet = window.innerWidth <= 1024;

  const filteredPatients = dashboardData.patients.filter(patient =>
    patient.name.toLowerCase().includes(patientSearch.toLowerCase()) ||
    patient.conditions.some(condition => 
      condition.toLowerCase().includes(patientSearch.toLowerCase())
    )
  );

  const PatientCard = ({ patient }) => (
    <div style={styles.patientCard}>
      <div style={styles.patientHeader}>
        <div style={styles.profileIconLarge}>👤</div>
        <div style={styles.patientBasicInfo}>
          <h3 style={styles.patientName}>{patient.name}</h3>
          <p style={styles.patientContact}>{patient.phone}</p>
          <p style={styles.patientEmail}>{patient.email}</p>
        </div>
      </div>

      <div style={styles.patientDetails}>
        <div style={styles.detailRow}>
          <span style={styles.detailLabel}>Last Visit:</span>
          <span style={styles.detailValue}>{patient.lastVisit}</span>
        </div>
        <div style={styles.detailRow}>
          <span style={styles.detailLabel}>Total Visits:</span>
          <span style={styles.detailValue}>{patient.totalVisits}</span>
        </div>
        <div style={styles.detailRow}>
          <span style={styles.detailLabel}>Blood Group:</span>
          <span style={styles.detailValue}>{patient.bloodGroup}</span>
        </div>
      </div>

      <div style={styles.conditionsSection}>
        <strong style={styles.conditionsLabel}>Medical Conditions:</strong>
        <div style={styles.conditionsList}>
          {patient.conditions.map((condition, index) => (
            <span key={index} style={styles.conditionTag}>
              {condition}
            </span>
          ))}
        </div>
      </div>

      <div style={styles.patientActions}>
        <button 
          style={styles.viewHistoryButton}
          onClick={() => handleViewFullHistory(patient.name)}
        >
          View History
        </button>
        <button 
          style={styles.addNotesButton}
          onClick={() => handleAddNotes(patient.name)}
        >
          Add Notes
        </button>
        <button 
          style={styles.messageButton}
          onClick={() => handleStartConversation(patient)}
        >
          Message
        </button>
      </div>
    </div>
  );

  return (
    <div style={styles.mainContent}>
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <h1 style={styles.greeting}>Patients</h1>
          <p style={styles.subtitle}>Access patient history and medical records</p>
        </div>
        <div style={styles.searchBox}>
          <input
            type="text"
            placeholder="Search patients by name or condition..."
            value={patientSearch}
            onChange={(e) => setPatientSearch(e.target.value)}
            style={styles.searchInput}
          />
        </div>
      </div>

      <div style={{
        ...styles.patientsGrid,
        gridTemplateColumns: isMobile ? '1fr' : isTablet ? '1fr 1fr' : 'repeat(auto-fill, minmax(350px, 1fr))'
      }}>
        {filteredPatients.map(patient => (
          <PatientCard key={patient.id} patient={patient} />
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
    flexWrap: 'nowrap',
    gap: '20px'
  },
  headerLeft: {
    textAlign: 'left',
    flex: '1 1 auto',
    minWidth: '200px'
  },
  greeting: {
    fontSize: 'clamp(20px, 4vw, 28px)',
    fontWeight: '700',
    color: '#1f2937',
    margin: '0 0 8px 0',
    textAlign: 'left',
    lineHeight: '1.2'
  },
  subtitle: {
    fontSize: 'clamp(14px, 2vw, 16px)',
    color: '#6b7280',
    margin: 0,
    textAlign: 'left',
    lineHeight: '1.4'
  },
  searchBox: {
    flex: '0 0 auto',
    alignSelf: 'flex-start',
    marginBottom: '0'
  },
  searchInput: {
    padding: '12px 16px',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    fontSize: '14px',
    width: 'clamp(250px, 100%, 300px)',
    outline: 'none',
    minWidth: '250px'
  },
  patientsGrid: {
    display: 'grid',
    gap: '20px',
    textAlign: 'left'
  },
  patientCard: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    border: '1px solid #e5e7eb',
    textAlign: 'left'
  },
  patientHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    marginBottom: '16px',
    textAlign: 'left'
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
  patientBasicInfo: {
    flex: 1,
    textAlign: 'left'
  },
  patientName: {
    fontSize: 'clamp(16px, 2.5vw, 18px)',
    fontWeight: '600',
    color: '#1f2937',
    margin: '0 0 4px 0',
    textAlign: 'left'
  },
  patientContact: {
    fontSize: '14px',
    color: '#6b7280',
    margin: '4px 0',
    textAlign: 'left'
  },
  patientEmail: {
    fontSize: '12px',
    color: '#9CA3AF',
    margin: 0,
    textAlign: 'left'
  },
  patientDetails: {
    marginBottom: '16px',
    textAlign: 'left'
  },
  detailRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px',
    textAlign: 'left'
  },
  detailLabel: {
    fontSize: '14px',
    color: '#6b7280',
    fontWeight: '500',
    textAlign: 'left'
  },
  detailValue: {
    fontSize: '14px',
    color: '#1f2937',
    fontWeight: '600',
    textAlign: 'right'
  },
  conditionsSection: {
    marginBottom: '16px',
    textAlign: 'left'
  },
  conditionsLabel: {
    fontSize: '14px',
    color: '#6b7280',
    marginBottom: '8px',
    display: 'block',
    textAlign: 'left'
  },
  conditionsList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '6px',
    textAlign: 'left'
  },
  conditionTag: {
    backgroundColor: '#F7D9EB',
    color: '#7C2A62',
    padding: '4px 8px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: '500'
  },
  patientActions: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap',
    textAlign: 'left'
  },
  viewHistoryButton: {
    backgroundColor: '#7C2A62',
    color: 'white',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '8px',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer',
    flex: 1,
    minWidth: '90px'
  },
  addNotesButton: {
    backgroundColor: 'transparent',
    color: '#7C2A62',
    border: '2px solid #7C2A62',
    padding: '8px 12px',
    borderRadius: '8px',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer',
    flex: 1,
    minWidth: '80px'
  },
  messageButton: {
    backgroundColor: 'transparent',
    color: '#7C2A62',
    border: '2px solid #7C2A62',
    padding: '8px 12px',
    borderRadius: '8px',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer',
    flex: 1,
    minWidth: '80px'
  }
};

export default PatientsContent;