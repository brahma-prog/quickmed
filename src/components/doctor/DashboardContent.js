import React, { useState, useEffect, useCallback, useMemo } from 'react';
import styles from './DashboardContent.module.css';

const DashboardContent = ({ dashboardData, state, actions }) => {
  const { timeRange, appointments } = state;
  const { 
    setTimeRange, 
    setActivePage
  } = actions;

  const isMobile = window.innerWidth <= 768;
  const isTablet = window.innerWidth <= 1024;

  // State for notes modal
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [notesPatientName, setNotesPatientName] = useState('');
  const [notesText, setNotesText] = useState('');
  const [notesLoading, setNotesLoading] = useState(false);
  
  // State for view details modal
  const [showViewDetailsModal, setShowViewDetailsModal] = useState(false);
  const [selectedConsultation, setSelectedConsultation] = useState(null);
  
  // State for patient notes storage
  const [patientNotes, setPatientNotes] = useState({});
  
  // State for React-based notifications
  const [notification, setNotification] = useState(null);

  // State for full history modal
  const [showFullHistoryModal, setShowFullHistoryModal] = useState(false);
  const [fullHistoryPatient, setFullHistoryPatient] = useState(null);
  const [fullHistoryNotes, setFullHistoryNotes] = useState([]);

  // Today's schedule data
  const [todaysSchedule, setTodaysSchedule] = useState([
    { id: 1, time: '09:00 AM', patient: 'John Smith', type: 'Follow-up', duration: '30 mins', status: 'confirmed', age: 45, reason: 'Diabetes check-up' },
    { id: 2, time: '10:30 AM', patient: 'Maria Garcia', type: 'New Patient', duration: '45 mins', status: 'confirmed', age: 32, reason: 'Annual physical examination' },
    { id: 3, time: '02:00 PM', patient: 'Robert Wilson', type: 'Consultation', duration: '30 mins', status: 'pending', age: 58, reason: 'Hypertension follow-up' },
    { id: 4, time: '04:30 PM', patient: 'Lisa Anderson', type: 'Post-op', duration: '20 mins', status: 'confirmed', age: 41, reason: 'Post-surgery check' }
  ]);

  // React-based notification system
  const showNotification = useCallback((type, message) => {
    setNotification({ type, message, id: Date.now() });
    
    const timer = setTimeout(() => {
      setNotification(null);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);

  // Initialize patient notes from dashboard data
  useEffect(() => {
    const initialNotes = {};
    dashboardData.patients.forEach(patient => {
      initialNotes[patient.name] = patient.notes || [];
    });
    setPatientNotes(initialNotes);
  }, [dashboardData.patients]);

  // Function to handle Add Notes with modal
  const handleAddNotesClick = useCallback((patientName) => {
    setNotesPatientName(patientName);
    setNotesText('');
    setShowNotesModal(true);
  }, []);

  // Function to save notes to patient's history
  const handleSaveNotes = useCallback(() => {
    if (!notesText.trim()) {
      showNotification('error', 'Please enter notes before saving');
      return;
    }

    setNotesLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const newNote = {
        id: Date.now(),
        date: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        }),
        time: new Date().toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit'
        }),
        text: notesText,
        doctor: 'Dr. You',
        type: 'clinical_notes'
      };
      
      // Update patient notes in state
      setPatientNotes(prev => ({
        ...prev,
        [notesPatientName]: [...(prev[notesPatientName] || []), newNote]
      }));
      
      showNotification('success', `Notes saved for ${notesPatientName}`);
      setNotesLoading(false);
      setShowNotesModal(false);
      setNotesText('');
      setNotesPatientName('');
    }, 1000);
  }, [notesText, notesPatientName, showNotification]);

  // Function to handle View Details
  const handleViewDetails = useCallback((consultation) => {
    setSelectedConsultation(consultation);
    setShowViewDetailsModal(true);
  }, []);

  // Function to handle View Full History
  const handleViewFullHistory = useCallback((patientName, notes) => {
    setFullHistoryPatient(patientName);
    setFullHistoryNotes(notes);
    setShowFullHistoryModal(true);
  }, []);

  // Get patient notes for a specific patient
  const getPatientNotes = useCallback((patientName) => {
    return patientNotes[patientName] || [];
  }, [patientNotes]);

  // Today's Schedule Component
  const ScheduleItem = useCallback(({ schedule }) => {
    const statusColors = {
      confirmed: '#10B981',
      pending: '#F59E0B',
      cancelled: '#EF4444'
    };
    
    return (
      <div className={styles.scheduleItem}>
        <div className={styles.scheduleTime}>
          <strong>{schedule.time}</strong>
          <span className={styles.scheduleDuration}>{schedule.duration}</span>
        </div>
        <div className={styles.scheduleInfo}>
          <h4 className={styles.schedulePatient}>{schedule.patient}</h4>
          <p className={styles.scheduleType}>{schedule.type}</p>
          <p className={styles.scheduleReason}>{schedule.reason}</p>
        </div>
        <span className={styles.scheduleStatus} style={{
          backgroundColor: statusColors[schedule.status] + '20',
          color: statusColors[schedule.status]
        }}>
          {schedule.status}
        </span>
      </div>
    );
  }, []);

  // Analytics Card Component
  const AnalyticsCard = ({ icon, number, label, color }) => (
    <div className={styles.analyticsCard}>
      <div className={styles.analyticsIcon} style={{backgroundColor: color}}>{icon}</div>
      <div className={styles.analyticsContent}>
        <h3 className={styles.analyticsNumber}>{number}</h3>
        <p className={styles.analyticsLabel}>{label}</p>
      </div>
    </div>
  );

  // Notification Component - memoized to prevent re-renders
  const Notification = useMemo(() => {
    if (!notification) return null;
    
    const bgColor = notification.type === 'success' ? '#10B981' :
                    notification.type === 'error' ? '#EF4444' :
                    notification.type === 'warning' ? '#F59E0B' : '#3B82F6';
    
    const icon = notification.type === 'success' ? '✅' :
                 notification.type === 'error' ? '❌' :
                 notification.type === 'warning' ? '⚠️' : 'ℹ️';
    
    return (
      <div className={styles.notification}>
        <div className={styles.notificationContent} style={{ backgroundColor: bgColor }}>
          {icon} {notification.message}
        </div>
      </div>
    );
  }, [notification]);

  // Add Notes Modal Component
  const AddNotesModal = useMemo(() => {
    if (!showNotesModal) return null;

    return (
      <div className={styles.modalOverlay}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <h3 className={styles.modalTitle}>Add Notes for {notesPatientName}</h3>
            <button 
              className={styles.closeButton}
              onClick={() => {
                setShowNotesModal(false);
                setNotesText('');
                setNotesPatientName('');
              }}
            >
              ✕
            </button>
          </div>
          
          <div className={styles.modalContent}>
            <div className={styles.notesForm}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Patient Name</label>
                <input
                  type="text"
                  value={notesPatientName}
                  readOnly
                  className={styles.readOnlyInput}
                />
              </div>
              
              <div className={styles.formGroup}>
                <label className={styles.label}>Notes <span className={styles.required}>*</span></label>
                <textarea
                  value={notesText}
                  onChange={(e) => setNotesText(e.target.value)}
                  placeholder="Enter your notes here... (e.g., Symptoms, Diagnosis, Treatment plan, Follow-up instructions)"
                  className={styles.notesTextarea}
                  rows={8}
                  autoFocus
                />
                <div className={styles.charCount}>
                  {notesText.length}/1000 characters
                </div>
              </div>
              
              <div className={styles.notesTips}>
                <h4 className={styles.tipsTitle}>Tips for effective notes:</h4>
                <ul className={styles.tipsList}>
                  <li>Include symptoms and observations</li>
                  <li>Note diagnosis and prescribed medications</li>
                  <li>Record follow-up requirements</li>
                  <li>Add any special instructions for the patient</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className={styles.modalFooter}>
            <button
              className={styles.cancelButton}
              onClick={() => {
                setShowNotesModal(false);
                setNotesText('');
                setNotesPatientName('');
              }}
              disabled={notesLoading}
            >
              Cancel
            </button>
            <button
              className={styles.saveButton}
              onClick={handleSaveNotes}
              disabled={notesLoading}
            >
              {notesLoading ? 'Saving...' : 'Save Notes'}
            </button>
          </div>
        </div>
      </div>
    );
  }, [showNotesModal, notesPatientName, notesText, notesLoading, handleSaveNotes]);

  // View Details Modal Component
  const ViewDetailsModal = useMemo(() => {
    if (!showViewDetailsModal || !selectedConsultation) return null;

    const patient = dashboardData.patients.find(p => p.name === selectedConsultation.patientName);
    const notes = getPatientNotes(selectedConsultation.patientName);

    return (
      <div className={styles.modalOverlay}>
        <div className={styles.viewDetailsModal}>
          <div className={styles.modalHeader}>
            <h3 className={styles.modalTitle}>Patient Details - {selectedConsultation.patientName}</h3>
            <button 
              className={styles.closeButton}
              onClick={() => {
                setShowViewDetailsModal(false);
                setSelectedConsultation(null);
              }}
            >
              ✕
            </button>
          </div>
          
          <div className={styles.modalContent}>
            <div className={styles.patientOverview}>
              <div className={styles.patientHeader}>
                <div className={styles.profileIconLarge}>👤</div>
                <div className={styles.patientBasicInfo}>
                  <h4 className={styles.patientNameLarge}>{selectedConsultation.patientName}</h4>
                  <p className={styles.patientAge}>Age: {patient?.age || selectedConsultation.age}</p>
                  <p className={styles.patientContact}>Phone: {patient?.phone || 'N/A'}</p>
                  <p className={styles.patientEmail}>Email: {patient?.email || 'N/A'}</p>
                </div>
              </div>
              
              <div className={styles.consultationDetails}>
                <h4 className={styles.sectionTitle}>Consultation Details</h4>
                <div className={styles.detailGrid}>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Date:</span>
                    <span className={styles.detailValue}>{selectedConsultation.date}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Time:</span>
                    <span className={styles.detailValue}>{selectedConsultation.time}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Duration:</span>
                    <span className={styles.detailValue}>{selectedConsultation.duration}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Status:</span>
                    <span className={styles.statusBadge}>{selectedConsultation.status}</span>
                  </div>
                </div>
                
                <div className={styles.reasonSection}>
                  <h5 className={styles.subSectionTitle}>Reason for Consultation</h5>
                  <p className={styles.reasonText}>{selectedConsultation.issue}</p>
                </div>
              </div>
              
              {/* Patient Notes Section */}
              <div className={styles.notesSection}>
                <div className={styles.sectionHeaderRow}>
                  <h4 className={styles.sectionTitle}>Clinical Notes</h4>
                  <button 
                    className={styles.addNotesButton}
                    onClick={() => {
                      handleAddNotesClick(selectedConsultation.patientName);
                      setShowViewDetailsModal(false);
                    }}
                  >
                    + Add New Notes
                  </button>
                </div>
                
                {notes.length > 0 ? (
                  <div className={styles.notesList}>
                    {notes.slice(-3).reverse().map(note => (
                      <div key={note.id} className={styles.noteItem}>
                        <div className={styles.noteHeader}>
                          <span className={styles.noteDate}>{note.date}</span>
                          <span className={styles.noteTime}>{note.time}</span>
                          <span className={styles.noteDoctor}>By: {note.doctor}</span>
                        </div>
                        <p className={styles.noteText}>{note.text}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className={styles.noNotes}>
                    <p>No clinical notes recorded yet.</p>
                    <button 
                      className={styles.secondaryButton}
                      onClick={() => {
                        handleAddNotesClick(selectedConsultation.patientName);
                        setShowViewDetailsModal(false);
                      }}
                    >
                      Add First Note
                    </button>
                  </div>
                )}
              </div>
              
              {/* Medical History Section */}
              {patient && (
                <div className={styles.medicalHistorySection}>
                  <h4 className={styles.sectionTitle}>Medical History</h4>
                  {patient.medicalHistory.length > 0 ? (
                    <div className={styles.historyList}>
                      {patient.medicalHistory.slice(0, 3).map((record, index) => (
                        <div key={index} className={styles.historyItem}>
                          <div className={styles.historyHeader}>
                            <span className={styles.historyDate}>{record.date}</span>
                            <span className={styles.historyType}>{record.type}</span>
                          </div>
                          <p className={styles.historyDiagnosis}><strong>Diagnosis:</strong> {record.diagnosis}</p>
                          {record.prescription && (
                            <p className={styles.historyPrescription}><strong>Prescription:</strong> {record.prescription}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className={styles.noHistory}>No medical history available.</p>
                  )}
                </div>
              )}
            </div>
          </div>
          
          <div className={styles.modalFooter}>
            <button
              className={styles.secondaryButton}
              onClick={() => {
                setShowViewDetailsModal(false);
                setSelectedConsultation(null);
              }}
            >
              Close
            </button>
            <button
              className={styles.primaryButton}
              onClick={() => {
                handleViewFullHistory(selectedConsultation.patientName, notes);
                setShowViewDetailsModal(false);
              }}
            >
              View Full History
            </button>
          </div>
        </div>
      </div>
    );
  }, [showViewDetailsModal, selectedConsultation, dashboardData.patients, getPatientNotes, handleAddNotesClick, handleViewFullHistory]);

  // Full History Modal Component
  const FullHistoryModal = useMemo(() => {
    if (!showFullHistoryModal || !fullHistoryPatient) return null;

    const patient = dashboardData.patients.find(p => p.name === fullHistoryPatient);
    const allNotes = fullHistoryNotes;

    return (
      <div className={styles.modalOverlay}>
        <div className={styles.fullHistoryModal}>
          <div className={styles.modalHeader}>
            <h3 className={styles.modalTitle}>Complete Medical History - {fullHistoryPatient}</h3>
            <button 
              className={styles.closeButton}
              onClick={() => {
                setShowFullHistoryModal(false);
                setFullHistoryPatient(null);
                setFullHistoryNotes([]);
              }}
            >
              ✕
            </button>
          </div>
          
          <div className={styles.modalContent}>
            <div className={styles.patientOverview}>
              <div className={styles.patientHeader}>
                <div className={styles.profileIconLarge}>👤</div>
                <div className={styles.patientBasicInfo}>
                  <h4 className={styles.patientNameLarge}>{fullHistoryPatient}</h4>
                  <p className={styles.patientAge}>Age: {patient?.age || 'N/A'}</p>
                  <p className={styles.patientContact}>Phone: {patient?.phone || 'N/A'}</p>
                  <p className={styles.patientEmail}>Email: {patient?.email || 'N/A'}</p>
                </div>
              </div>
              
              {/* Complete Clinical Notes Section */}
              <div className={styles.notesSection}>
                <div className={styles.sectionHeaderRow}>
                  <h4 className={styles.sectionTitle}>Complete Clinical Notes History</h4>
                  <button 
                    className={styles.addNotesButton}
                    onClick={() => {
                      setShowFullHistoryModal(false);
                      handleAddNotesClick(fullHistoryPatient);
                    }}
                  >
                    + Add New Notes
                  </button>
                </div>
                
                {allNotes.length > 0 ? (
                  <div className={styles.fullNotesList}>
                    {allNotes.slice().reverse().map(note => (
                      <div key={note.id} className={styles.fullNoteItem}>
                        <div className={styles.noteHeader}>
                          <span className={styles.noteDate}>{note.date}</span>
                          <span className={styles.noteTime}>{note.time}</span>
                          <span className={styles.noteDoctor}>By: {note.doctor}</span>
                          <span className={styles.noteType}>{note.type}</span>
                        </div>
                        <p className={styles.noteText}>{note.text}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className={styles.noNotes}>
                    <p>No clinical notes recorded yet.</p>
                    <button 
                      className={styles.secondaryButton}
                      onClick={() => {
                        setShowFullHistoryModal(false);
                        handleAddNotesClick(fullHistoryPatient);
                      }}
                    >
                      Add First Note
                    </button>
                  </div>
                )}
              </div>
              
              {/* Complete Medical History Section */}
              {patient && patient.medicalHistory.length > 0 && (
                <div className={styles.medicalHistorySection}>
                  <h4 className={styles.sectionTitle}>Complete Medical History Records</h4>
                  <div className={styles.fullHistoryList}>
                    {patient.medicalHistory.slice().reverse().map((record, index) => (
                      <div key={index} className={styles.fullHistoryItem}>
                        <div className={styles.historyHeader}>
                          <span className={styles.historyDate}>{record.date}</span>
                          <span className={styles.historyType}>{record.type}</span>
                          <span className={styles.historyStatus}>{record.status || 'Completed'}</span>
                        </div>
                        <div className={styles.fullHistoryDetails}>
                          <p className={styles.historyDiagnosis}><strong>Diagnosis:</strong> {record.diagnosis}</p>
                          {record.symptoms && (
                            <p className={styles.historySymptoms}><strong>Symptoms:</strong> {record.symptoms}</p>
                          )}
                          {record.prescription && (
                            <p className={styles.historyPrescription}><strong>Prescription:</strong> {record.prescription}</p>
                          )}
                          {record.notes && (
                            <p className={styles.historyNotes}><strong>Additional Notes:</strong> {record.notes}</p>
                          )}
                          {record.followUp && (
                            <p className={styles.historyFollowUp}><strong>Follow-up:</strong> {record.followUp}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Patient Information Summary */}
              {patient && (
                <div className={styles.patientSummary}>
                  <h4 className={styles.sectionTitle}>Patient Information Summary</h4>
                  <div className={styles.summaryGrid}>
                    <div className={styles.summaryItem}>
                      <span className={styles.summaryLabel}>Blood Group:</span>
                      <span className={styles.summaryValue}>{patient.bloodGroup || 'Not specified'}</span>
                    </div>
                    <div className={styles.summaryItem}>
                      <span className={styles.summaryLabel}>Allergies:</span>
                      <span className={styles.summaryValue}>{patient.allergies?.join(', ') || 'None reported'}</span>
                    </div>
                    <div className={styles.summaryItem}>
                      <span className={styles.summaryLabel}>Chronic Conditions:</span>
                      <span className={styles.summaryValue}>{patient.conditions?.join(', ') || 'None reported'}</span>
                    </div>
                    <div className={styles.summaryItem}>
                      <span className={styles.summaryLabel}>Medications:</span>
                      <span className={styles.summaryValue}>{patient.medications?.join(', ') || 'None'}</span>
                    </div>
                    <div className={styles.summaryItem}>
                      <span className={styles.summaryLabel}>Last Consultation:</span>
                      <span className={styles.summaryValue}>
                        {patient.medicalHistory.length > 0 
                          ? patient.medicalHistory[0].date 
                          : 'No previous consultations'}
                      </span>
                    </div>
                    <div className={styles.summaryItem}>
                      <span className={styles.summaryLabel}>Total Consultations:</span>
                      <span className={styles.summaryValue}>{patient.medicalHistory.length}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className={styles.modalFooter}>
            <button
              className={styles.secondaryButton}
              onClick={() => {
                setShowFullHistoryModal(false);
                setFullHistoryPatient(null);
                setFullHistoryNotes([]);
              }}
            >
              Close
            </button>
            <button
              className={styles.primaryButton}
              onClick={() => {
                setShowFullHistoryModal(false);
                handleAddNotesClick(fullHistoryPatient);
              }}
            >
              Add New Notes
            </button>
          </div>
        </div>
      </div>
    );
  }, [showFullHistoryModal, fullHistoryPatient, fullHistoryNotes, dashboardData.patients, handleAddNotesClick]);

  const UpcomingAppointmentCard = useCallback(({ appointment }) => (
    <div className={styles.upcomingCard}>
      <div className={styles.upcomingHeader}>
        <div className={styles.profileIconLarge}>👤</div>
        <div className={styles.upcomingPatientInfo}>
          <h3 className={styles.upcomingPatientName}>{appointment.patientName}</h3>
          <p className={styles.upcomingPatientAge}>Age: {appointment.age}</p>
        </div>
      </div>
      <div className={styles.upcomingDetails}>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>Time:</span>
          <span className={styles.detailValue}>{appointment.time}</span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>Date:</span>
          <span className={styles.detailValue}>{appointment.date}</span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>Duration:</span>
          <span className={styles.detailValue}>{appointment.duration}</span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>Reason:</span>
          <span className={styles.detailValue}>{appointment.issue}</span>
        </div>
      </div>
      <div className={styles.upcomingActions}>
        <button 
          className={styles.secondaryButton}
          onClick={() => handleAddNotesClick(appointment.patientName)}
        >
          Quick Notes
        </button>
      </div>
    </div>
  ), [handleAddNotesClick]);

  // Upcoming appointments
  const upcomingAppointments = useMemo(() => 
    appointments.upcoming || []
  , [appointments.upcoming]);

  // Quick stats data
  const quickStats = useMemo(() => ({
    pendingTasks: 3,
    labResults: 2,
    todaysConsultations: 8,
    waitTime: '5 min'
  }), []);

  return (
    <div className={styles.mainContent}>
      {/* Notifications */}
      {Notification}
      
      {/* Add Notes Modal */}
      {AddNotesModal}
      
      {/* View Details Modal */}
      {ViewDetailsModal}
      
      {/* Full History Modal */}
      {FullHistoryModal}

      {/* Analytics Grid */}
      <div className={styles.analyticsGrid} style={{
        gridTemplateColumns: isMobile ? '1fr' : isTablet ? '1fr 1fr' : '1fr 1fr 1fr 1fr',
        gap: isMobile ? '15px' : '20px',
        marginBottom: '30px'
      }}>
        <AnalyticsCard
          icon="📅"
          number={dashboardData.appointments?.[timeRange] || 12}
          label="Total Appointments"
          color="#E0F2F1"
        />
        <AnalyticsCard
          icon="🩺"
          number={dashboardData.consultations?.[timeRange] || 8}
          label="Consultations Today"
          color="#E0F2F1"
        />
        <AnalyticsCard
          icon="❌"
          number={dashboardData.cancelled?.[timeRange] || 2}
          label="Cancelled"
          color="#FFE6E6"
        />
        <AnalyticsCard
          icon="⭐"
          number={dashboardData.rating || "4.8"}
          label="Patient Rating"
          color="#E0F2F1"
        />
      </div>

      {/* Mobile Time Range Selector */}
      {isMobile && (
        <div className={styles.mobileTimeRange}>
          <button
            className={`${styles.timeRangeButton} ${timeRange === 'today' ? styles.timeRangeButtonActive : ''}`}
            onClick={() => setTimeRange('today')}
          >
            Today
          </button>
          <button
            className={`${styles.timeRangeButton} ${timeRange === 'week' ? styles.timeRangeButtonActive : ''}`}
            onClick={() => setTimeRange('week')}
          >
            This Week
          </button>
          <button
            className={`${styles.timeRangeButton} ${timeRange === 'month' ? styles.timeRangeButtonActive : ''}`}
            onClick={() => setTimeRange('month')}
          >
            This Month
          </button>
        </div>
      )}

      <div className={styles.contentGrid} style={{
        gridTemplateColumns: isMobile ? '1fr' : isTablet ? '1fr' : '2fr 1fr',
        gap: isMobile ? '20px' : '30px',
        marginTop: '0'
      }}>
        {/* Today's Schedule Section */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Today's Schedule</h2>
            
          </div>
          <div className={styles.scheduleList}>
            {todaysSchedule.map((schedule) => (
              <ScheduleItem key={schedule.id} schedule={schedule} />
            ))}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className={styles.sidebarSection}>
          {/* Upcoming Appointments */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Upcoming Appointments</h2>
            </div>
            
            {upcomingAppointments.length > 0 ? (
              <>
                {upcomingAppointments.slice(0, 2).map(appointment => (
                  <UpcomingAppointmentCard key={appointment.id} appointment={appointment} />
                ))}
                
                {upcomingAppointments.length > 2 && (
                  <div className={styles.moreAppointments}>
                    <button 
                      className={styles.viewAll}
                      onClick={() => setActivePage && setActivePage('appointments')}
                    >
                      View All ({upcomingAppointments.length - 2} more)
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className={styles.noAppointments}>
                <p>No upcoming appointments</p>
              </div>
            )}
          </div>

          {/* Quick Overview Section */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Quick Overview</h2>
            </div>
            <div className={styles.quickOverview}>
              <div className={styles.overviewItem}>
                <div className={styles.overviewIcon}>📋</div>
                <div>
                  <div className={styles.overviewCount}>{quickStats.todaysConsultations}</div>
                  <div className={styles.overviewLabel}>Today's Consultations</div>
                </div>
              </div>
              <div className={styles.overviewItem}>
                <div className={styles.overviewIcon}>⚠️</div>
                <div>
                  <div className={styles.overviewCount}>{quickStats.pendingTasks}</div>
                  <div className={styles.overviewLabel}>Pending Tasks</div>
                </div>
              </div>
              <div className={styles.overviewItem}>
                <div className={styles.overviewIcon}>⏰</div>
                <div>
                  <div className={styles.overviewCount}>{quickStats.waitTime}</div>
                  <div className={styles.overviewLabel}>Avg. Wait Time</div>
                </div>
              </div>
              <div className={styles.overviewItem}>
                <div className={styles.overviewIcon}>🧪</div>
                <div>
                  <div className={styles.overviewCount}>{quickStats.labResults}</div>
                  <div className={styles.overviewLabel}>Lab Results</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;