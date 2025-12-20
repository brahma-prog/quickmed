import React, { useState, useEffect, useRef, useCallback } from 'react';
import './babyCareStyles.css';

const BabyCareContent = ({ dashboardData, state, actions }) => {
  const { babyCareFilter } = state;
  const { setBabyCareFilter } = actions;

  const [activeTab, setActiveTab] = useState('appointments');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showReportViewer, setShowReportViewer] = useState(false);
  const [showVideoConsultation, setShowVideoConsultation] = useState(false);
  const [currentConsultation, setCurrentConsultation] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [callTime, setCallTime] = useState(0);
  const [loadingAppointments, setLoadingAppointments] = useState({});
  const [notifications, setNotifications] = useState([]);
  const [patientReports, setPatientReports] = useState({});
  const [selectedPlan, setSelectedPlan] = useState('basic');
  const [showPlanDetails, setShowPlanDetails] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showReminderModal, setShowReminderModal] = useState(false);
  
  // Removed uploadedFiles state as it's causing duplicates
  
  // Local state for appointments
  const [appointments, setAppointments] = useState({
    pending: [...(dashboardData.babyCareAppointments?.pending || [])],
    upcoming: [...(dashboardData.babyCareAppointments?.upcoming || [])],
    cancelled: [...(dashboardData.babyCareAppointments?.cancelled || [])]
  });

  // Local state for patients
  const [patients, setPatients] = useState([]);

  // Baby Care Plans Data
  const babyCarePlans = [
    {
      id: 'basic',
      name: 'Basic Plan',
      price: '₹8,999/month',
      duration: 'Monthly subscription',
      patients: '45 babies enrolled',
      icon: '👶',
      color: '#009688',
      features: [
        'Supplies & hygiene essentials delivery',
        'Diapers, wipes, skincare monthly',
        'Basic feeding & diaper assistance',
        'Light caregiving (up to 8 hours/day)',
        'Basic hygiene & nursery maintenance',
        'Monthly check-in advice line',
        'Parent support chat'
      ],
      idealFor: 'Newborns & early months',
      coverage: '8 hours/day caregiver support'
    },
    {
      id: 'premium',
      name: 'Premium Plan',
      price: '₹14,999/month',
      duration: 'Monthly subscription',
      patients: '28 babies enrolled',
      icon: '🌟',
      color: '#4DB6AC',
      features: [
        'Everything in Basic Plan',
        'Extended caregiver (12 hours/day)',
        'Enhanced hygiene & regular bathing',
        'Nursery cleaning & management',
        'Play & developmental support',
        'Sleep & routine establishment',
        'Daily/weekly progress reports',
        'Age-appropriate toys & activities',
        'Feeding schedule management'
      ],
      idealFor: 'Working parents, busy households',
      coverage: '12 hours/day day+night support'
    },
    {
      id: 'comprehensive',
      name: 'Comprehensive Plan',
      price: '₹24,999/month',
      duration: 'Monthly subscription',
      patients: '15 babies enrolled',
      icon: '👑',
      color: '#00796B',
      features: [
        'Everything in Premium Plan',
        '24×7 live-in caregiver/nanny',
        'Health monitoring & vaccination reminders',
        'Pediatrician consultation access',
        'Lactation & nutrition guidance',
        'Sleep-training & parenting coaching',
        'Postnatal & mother support',
        'Premium organic supplies',
        'Monthly baby-kit box',
        'Replacement guarantee',
        'Long-term contract options'
      ],
      idealFor: 'Both parents working, full support needed',
      coverage: '24×7 round-the-clock care'
    }
  ];

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

  // Initialize states
  useEffect(() => {
    const babyCarePatients = [...(dashboardData.patients?.filter(p => p.patientType === 'baby') || [])];
    setPatients(babyCarePatients);
    
    const reportsState = {};
    babyCarePatients.forEach(patient => {
      const reports = patient.babyCareDetails?.reports || [];
      reportsState[patient.id] = reports.map(report => ({
        ...report,
        id: report.id || `report_${patient.id}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        name: report.name || `Report_${Date.now()}`,
        type: report.type || 'pdf',
        date: report.date || new Date().toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'short', 
          day: 'numeric' 
        }),
        size: report.size || 'N/A',
        url: report.url || '#'
      }));
    });
    setPatientReports(reportsState);
  }, [dashboardData]);

  // Get baby care appointments
  const getFilteredBabyCareAppointments = () => {
    switch (babyCareFilter) {
      case 'pending': return appointments.pending;
      case 'upcoming': return appointments.upcoming;
      case 'cancelled': return appointments.cancelled;
      default: return appointments.upcoming;
    }
  };

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
      setAppointments(prev => {
        const pendingIndex = prev.pending.findIndex(a => a.id === appointment.id);
        if (pendingIndex === -1) return prev;

        const approvedAppointment = prev.pending[pendingIndex];
        const newPending = [...prev.pending];
        newPending.splice(pendingIndex, 1);
        
        return {
          ...prev,
          pending: newPending,
          upcoming: [...prev.upcoming, { ...approvedAppointment, status: 'upcoming' }]
        };
      });
      
      showNotification(`Appointment approved for ${appointment.patientName}`, 'success');
      setLoadingAppointments(prev => ({ ...prev, [appointment.id]: false }));
    }, 1000);
  }, [showNotification]);

  // Start video consultation
  const handleStartConsultation = useCallback((appointment) => {
    setCurrentConsultation(appointment);
    setShowVideoConsultation(true);
    setCallTime(0);
    showNotification(`Starting video consultation with ${appointment.parentName}`, 'info');
  }, [showNotification]);

  // End video consultation
  const handleEndConsultation = useCallback(() => {
    setShowVideoConsultation(false);
    setIsRecording(false);
    showNotification(`Video consultation ended with ${currentConsultation?.parentName}`, 'info');
    
    // Move appointment from upcoming to completed
    if (currentConsultation) {
      setAppointments(prev => {
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

  // Handle file upload - FIXED: Remove duplicate handling
  const handleFileUpload = useCallback((patientId, patientName, files) => {
    if (!files || files.length === 0) return;
    
    const validFiles = Array.from(files).filter(file => 
      file.type === 'application/pdf' || 
      file.type.startsWith('image/') ||
      file.name.toLowerCase().endsWith('.pdf') ||
      file.name.toLowerCase().endsWith('.jpg') ||
      file.name.toLowerCase().endsWith('.jpeg') ||
      file.name.toLowerCase().endsWith('.png')
    );

    if (validFiles.length === 0) {
      showNotification('Please upload PDF or image files only (PDF, JPG, PNG)', 'error');
      return;
    }

    showNotification(`Uploading ${validFiles.length} file(s) to ${patientName}'s reports...`, 'info');
    
    const newReports = validFiles.map((file, index) => {
      const fileId = `uploaded_${patientId}_${Date.now()}_${index}_${Math.random().toString(36).substr(2, 9)}`;
      return {
        id: fileId,
        name: file.name.replace(/\.[^/.]+$/, "").replace(/_/g, ' ').toUpperCase(),
        date: new Date().toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'short', 
          day: 'numeric' 
        }),
        time: new Date().toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
        type: file.type.startsWith('image/') ? 'image' : 'pdf',
        file: file,
        url: URL.createObjectURL(file),
        size: `${(file.size / 1024).toFixed(1)} KB`,
        uploaded: true // Flag to identify uploaded files
      };
    });
    
    // Add directly to patientReports only - no separate uploadedFiles state
    setPatientReports(prev => ({
      ...prev,
      [patientId]: [...(prev[patientId] || []), ...newReports]
    }));
    
    showNotification(`${validFiles.length} file(s) uploaded successfully to ${patientName}'s reports`, 'success');
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

  // Handle remove report - FIXED: Remove from patientReports only
  const handleRemoveReport = useCallback((patientId, reportId) => {
    setPatientReports(prev => ({
      ...prev,
      [patientId]: prev[patientId]?.filter(r => r.id !== reportId) || []
    }));
    showNotification('Report removed successfully', 'success');
  }, [showNotification]);

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
      <div className="baby-care-modal-overlay">
        <div className="baby-care-modal">
          <div className="baby-care-modal-header">
            <h3 className="baby-care-modal-title">
              Manage Appointment - {appointment.parentName}
            </h3>
            <button 
              className="baby-care-close-button"
              onClick={onClose}
            >
              ✕
            </button>
          </div>

          <div className="baby-care-modal-content">
            <div className="baby-care-appointment-info-card">
              <p><strong>Baby:</strong> {appointment.babyName} ({appointment.babyAge})</p>
              <p><strong>Scheduled:</strong> {appointment.date} at {appointment.time}</p>
              <p><strong>Issue:</strong> {appointment.issue}</p>
            </div>

            <div className="baby-care-section">
              <h4 className="baby-care-section-title">Reject Appointment</h4>
              <div className="baby-care-input-group">
                <label className="baby-care-label">Reason for rejection:</label>
                <textarea 
                  className="baby-care-textarea"
                  placeholder="Provide reason for rejecting this appointment..."
                  value={rejectReason}
                  onChange={handleRejectReasonChange}
                  rows="3"
                />
              </div>
              <button 
                className="baby-care-button-danger"
                onClick={handleRejectSubmit}
                disabled={!rejectReason.trim() || loading}
              >
                {loading ? 'Processing...' : 'Reject Appointment'}
              </button>
            </div>

            <div className="baby-care-divider">
              <span className="baby-care-divider-text">OR</span>
            </div>

            <div className="baby-care-section">
              <h4 className="baby-care-section-title">Reschedule Appointment</h4>
              <div className="baby-care-input-group">
                <label className="baby-care-label">New Date:</label>
                <input 
                  type="date" 
                  className="baby-care-input"
                  min={getCurrentDate()}
                  value={rescheduleDate}
                  onChange={handleRescheduleDateChange}
                />
              </div>
              <div className="baby-care-input-group">
                <label className="baby-care-label">New Time:</label>
                <input 
                  type="time" 
                  className="baby-care-input"
                  value={rescheduleTime}
                  onChange={handleRescheduleTimeChange}
                />
              </div>
              <button 
                className="baby-care-button-success"
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
          message = `Reminder: Your baby care appointment with Dr. is scheduled for tomorrow at ${appointment.time}. Please be on time.`;
          break;
        case '1h':
          message = `Reminder: Your appointment is in 1 hour. Please join the video call or arrive at the clinic for ${appointment.babyName}'s checkup.`;
          break;
        case 'now':
          message = `Final reminder: Your appointment starts now. ${appointment.consultationType === 'online' ? 'Please join the video consultation.' : 'Please proceed to the reception.'}`;
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
      <div className="baby-care-modal-overlay">
        <div className="baby-care-modal">
          <div className="baby-care-modal-header">
            <h3 className="baby-care-modal-title">
              Send Reminder - {appointment.parentName}
            </h3>
            <button 
              className="baby-care-close-button"
              onClick={onClose}
            >
              ✕
            </button>
          </div>

          <div className="baby-care-modal-content">
            <div className="baby-care-appointment-info-card">
              <p><strong>Baby:</strong> {appointment.babyName} ({appointment.babyAge})</p>
              <p><strong>Scheduled:</strong> {appointment.date} at {appointment.time}</p>
              <p><strong>Appointment Type:</strong> {appointment.consultationType === 'offline' ? '🏥 Hospital' : 
                 appointment.consultationType === 'home_visit' ? '🏠 Home Visit' : '💻 Online'}</p>
            </div>

            <div className="baby-care-section">
              <h4 className="baby-care-section-title">Reminder Details</h4>
              
              <div className="baby-care-input-group">
                <label className="baby-care-label">Select Method:</label>
                <div className="baby-care-method-options">
                  <label className={`baby-care-method-option ${reminderMethod === 'sms' ? 'baby-care-active-method-option' : ''}`}>
                    <input
                      type="radio"
                      value="sms"
                      checked={reminderMethod === 'sms'}
                      onChange={() => handleMethodChange('sms')}
                      className="baby-care-radio-input"
                    />
                    <span className="baby-care-method-label">📱 SMS</span>
                  </label>
                  <label className={`baby-care-method-option ${reminderMethod === 'email' ? 'baby-care-active-method-option' : ''}`}>
                    <input
                      type="radio"
                      value="email"
                      checked={reminderMethod === 'email'}
                      onChange={() => handleMethodChange('email')}
                      className="baby-care-radio-input"
                    />
                    <span className="baby-care-method-label">📧 Email</span>
                  </label>
                  <label className={`baby-care-method-option ${reminderMethod === 'whatsapp' ? 'baby-care-active-method-option' : ''}`}>
                    <input
                      type="radio"
                      value="whatsapp"
                      checked={reminderMethod === 'whatsapp'}
                      onChange={() => handleMethodChange('whatsapp')}
                      className="baby-care-radio-input"
                    />
                    <span className="baby-care-method-label">💬 WhatsApp</span>
                  </label>
                </div>
              </div>

              <div className="baby-care-input-group">
                <label className="baby-care-label">Reminder Message:</label>
                <textarea 
                  className="baby-care-textarea"
                  placeholder={`Reminder for ${appointment.parentName}'s appointment on ${appointment.date} at ${appointment.time}. Baby: ${appointment.babyName}`}
                  value={reminderMessage}
                  onChange={handleReminderMessageChange}
                  rows="4"
                />
                <div className="baby-care-message-preview">
                  <strong>Preview:</strong>
                  <div className="baby-care-preview-text">
                    {reminderMessage || 'Your reminder message will appear here...'}
                  </div>
                </div>
              </div>

              <div className="baby-care-input-group">
                <label className="baby-care-label">Quick Templates:</label>
                <div className="baby-care-time-options">
                  <button 
                    type="button"
                    className="baby-care-time-option"
                    onClick={() => handleTimeOptionClick('24h')}
                  >
                    24 hours before
                  </button>
                  <button 
                    type="button"
                    className="baby-care-time-option"
                    onClick={() => handleTimeOptionClick('1h')}
                  >
                    1 hour before
                  </button>
                  <button 
                    type="button"
                    className="baby-care-time-option"
                    onClick={() => handleTimeOptionClick('now')}
                  >
                    At appointment time
                  </button>
                </div>
              </div>

              <button 
                className="baby-care-button-primary"
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

  // Report Viewer Modal Component - FIXED: Remove duplicate handling
  const ReportViewerModal = React.memo(({ 
    show, 
    patient, 
    patientReports, 
    onClose, 
    onFileUpload,
    onRemoveReport 
  }) => {
    const fileInputRef = useRef(null);

    if (!show || !patient) return null;

    const patientReportsList = patientReports[patient.id] || [];

    const handleFileSelect = (e) => {
      onFileUpload(patient.id, patient.name, e.target.files);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    };

    const handleRemoveClick = (reportId) => {
      if (window.confirm('Are you sure you want to remove this report?')) {
        onRemoveReport(patient.id, reportId);
      }
    };

    return (
      <div className="baby-care-modal-overlay">
        <div className="baby-care-modal">
          <div className="baby-care-modal-header">
            <h3 className="baby-care-modal-title">
              Reports - {patient.name}
            </h3>
            <button 
              className="baby-care-close-button"
              onClick={onClose}
            >
              ✕
            </button>
          </div>

          <div className="baby-care-modal-content">
            <div className="baby-care-upload-section">
              <h4 className="baby-care-section-title">Upload New Report</h4>
              <div className="baby-care-upload-area">
                <input 
                  ref={fileInputRef}
                  type="file"
                  id="report-upload"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="baby-care-file-input"
                  onChange={handleFileSelect}
                />
                <label htmlFor="report-upload" className="baby-care-upload-label">
                  <div className="baby-care-upload-icon">📁</div>
                  <div className="baby-care-upload-text">
                    <strong>Click to upload reports</strong>
                    <span>Supports PDF, JPG, PNG files</span>
                  </div>
                </label>
              </div>
            </div>

            <div className="baby-care-section">
              <h4 className="baby-care-section-title">All Reports ({patientReportsList.length})</h4>
              {patientReportsList.length > 0 ? (
                <div className="baby-care-reports-list">
                  {patientReportsList.map((report) => (
                    <div key={report.id} className="baby-care-report-item">
                      <div className="baby-care-report-icon">
                        {report.type === 'pdf' ? '📄' : '🖼️'}
                      </div>
                      <div className="baby-care-report-info">
                        <div className="baby-care-report-name">{report.name}</div>
                        <div className="baby-care-report-meta">
                          {report.date} • {report.type ? report.type.toUpperCase() : 'FILE'} • {report.size}
                          {report.uploaded && <span style={{ marginLeft: '10px', color: '#4CAF50' }}>🆕 Uploaded</span>}
                        </div>
                      </div>
                      <div className="baby-care-report-actions">
                        <button 
                          className="baby-care-button-small"
                          onClick={() => {
                            if (report.url && report.url !== '#') {
                              window.open(report.url, '_blank');
                            } else {
                              showNotification('File preview not available', 'info');
                            }
                          }}
                        >
                          View
                        </button>
                        <button 
                          className="baby-care-button-small baby-care-button-danger"
                          onClick={() => handleRemoveClick(report.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="baby-care-empty-reports">
                  <div className="baby-care-empty-reports-icon">📄</div>
                  <p>No reports available yet</p>
                  <p className="baby-care-empty-subtext">Upload reports using the upload section above</p>
                </div>
              )}
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
    onEndCall,
    onToggleRecording,
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
      <div className="baby-care-video-modal-overlay">
        <div className="baby-care-video-modal">
          <div className="baby-care-video-header">
            <div className="baby-care-video-header-info">
              <div className="baby-care-video-status">
                <span className="baby-care-connected-dot">●</span>
                <span>Status: connected</span>
              </div>
              <div className="baby-care-call-timer">
                <span>{formatCallTime(callTime)}</span>
              </div>
            </div>
            <button 
              className="baby-care-end-call-button"
              onClick={onEndCall}
            >
              End Call
            </button>
          </div>

          <div className="baby-care-video-main-area">
            <div className="baby-care-patient-video-container">
              <div className="baby-care-patient-video-header">
                <div className="baby-care-patient-video-info">
                  <h3 className="baby-care-patient-video-name">{consultation.parentName}</h3>
                  <div className="baby-care-baby-info-indicator">
                    👶 Baby: {consultation.babyName} • {consultation.babyAge}
                  </div>
                </div>
              </div>
              
              <div className="baby-care-video-feed">
                <div className="baby-care-video-mock">
                  <div className="baby-care-video-mock-content">
                    <div className="baby-care-video-mock-avatar">
                      <span className="avatar-emoji">👶</span>
                    </div>
                    <div className="baby-care-video-mock-info">
                      <p className="baby-care-video-mock-text">Baby Care Consultation</p>
                      <p className="baby-care-video-mock-subtext">{consultation.parentName}</p>
                    </div>
                  </div>
                </div>
                
                <div className="baby-care-self-view">
                  <div className="baby-care-self-view-header">
                    <span className="baby-care-self-view-label">You</span>
                  </div>
                  <div className="baby-care-self-view-video">
                    <div className="baby-care-self-view-mock">
                      <span className="baby-care-self-view-emoji">👨‍⚕️</span>
                      <p className="baby-care-self-view-text">Dr. View</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="baby-care-quick-tools">
              <div className="baby-care-quick-tools-header">
                <h4 className="baby-care-quick-tools-title">Baby Care Tools</h4>
              </div>
              
              <div className="baby-care-tool-buttons">
                <button 
                  className={isRecording ? "baby-care-recording-button" : "baby-care-tool-button"}
                  onClick={onToggleRecording}
                >
                  <span className="baby-care-tool-icon">⏺️</span>
                  <span>{isRecording ? 'Recording...' : 'Record'}</span>
                </button>
                
                <button 
                  className="baby-care-tool-button"
                  onClick={() => showNotification('Opening feeding guide', 'info')}
                >
                  <span className="baby-care-tool-icon">🍼</span>
                  <span>Feeding Guide</span>
                </button>
                
                <button 
                  className="baby-care-tool-button"
                  onClick={() => showNotification('Opening growth chart', 'info')}
                >
                  <span className="baby-care-tool-icon">📈</span>
                  <span>Growth Chart</span>
                </button>
                
                <button 
                  className="baby-care-tool-button"
                  onClick={() => showNotification('Opening vaccination schedule', 'info')}
                >
                  <span className="baby-care-tool-icon">💉</span>
                  <span>Vaccination</span>
                </button>
                
                <button 
                  className="baby-care-tool-button"
                  onClick={() => showNotification('Opening sleep schedule', 'info')}
                >
                  <span className="baby-care-tool-icon">😴</span>
                  <span>Sleep Guide</span>
                </button>
              </div>
              
              <div className="baby-care-consultation-notes">
                <h4 className="baby-care-notes-title">Consultation Notes</h4>
                <textarea 
                  className="baby-care-notes-textarea"
                  placeholder="Add notes about baby's health, feeding, sleep, recommendations..."
                  value={notes}
                  onChange={handleNotesChange}
                  rows="4"
                />
                <button 
                  className="baby-care-save-notes-button"
                  onClick={handleSaveNotes}
                >
                  Save Notes
                </button>
              </div>
            </div>
          </div>

          <div className="baby-care-video-footer">
            <div className="baby-care-appointment-info">
              <strong>Baby:</strong> {consultation.babyName} ({consultation.babyAge})
            </div>
            <div className="baby-care-consultation-type">
              <strong>Plan:</strong> {consultation.plan || 'Basic Plan'}
            </div>
          </div>
        </div>
      </div>
    );
  });

  // Plan Details Modal Component
  const PlanDetailsModal = React.memo(({ show, planId, plans, onClose }) => {
    if (!show) return null;
    
    const plan = plans.find(p => p.id === planId);

    return (
      <div className="baby-care-modal-overlay">
        <div className="baby-care-modal">
          <div className="baby-care-modal-header">
            <h3>{plan.name} - Complete Details</h3>
            <button 
              className="baby-care-close-button"
              onClick={onClose}
            >
              ✕
            </button>
          </div>
          
          <div className="baby-care-modal-content">
            <div 
              className="baby-care-plan-header-card"
              style={{
                backgroundColor: `${plan.color}20`,
                borderColor: plan.color
              }}
            >
              <div className="baby-care-plan-header-content">
                <div className="baby-care-plan-icon-large">{plan.icon}</div>
                <div>
                  <h4 className="baby-care-plan-header-title">{plan.name}</h4>
                  <p className="baby-care-plan-header-price">{plan.price}</p>
                  <p className="baby-care-plan-header-duration">{plan.duration} • {plan.patients}</p>
                </div>
              </div>
            </div>
            
            <div className="baby-care-section">
              <h4 className="baby-care-section-title">Perfect For</h4>
              <div className="baby-care-ideal-for">
                <span className="baby-care-ideal-for-icon">🎯</span>
                <span>{plan.idealFor}</span>
              </div>
            </div>
            
            <div className="baby-care-section">
              <h4 className="baby-care-section-title">Care Coverage</h4>
              <div className="baby-care-coverage-card">
                <span className="baby-care-coverage-icon">⏰</span>
                <span>{plan.coverage}</span>
              </div>
            </div>
            
            <div className="baby-care-section">
              <h4 className="baby-care-section-title">All Features</h4>
              <div className="baby-care-features-list">
                {plan.features.map((feature, index) => (
                  <div key={index} className="baby-care-feature-item">
                    <span className="baby-care-check-icon">✓</span>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="baby-care-section">
              <h4 className="baby-care-section-title">Doctor's Recommendation</h4>
              <div className="baby-care-recommendation">
                <p>This plan is ideal for babies who need {plan.id === 'basic' ? 'basic care and support' : 
                  plan.id === 'premium' ? 'comprehensive daily care with developmental support' : 
                  'full-time professional care with medical guidance'}.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  });

  // Handle appointment rejection
  const handleRejectAppointment = useCallback((appointment, reason) => {
    setLoadingAppointments(prev => ({ ...prev, [appointment.id]: true }));

    setTimeout(() => {
      setAppointments(prev => {
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
            cancelledDate: new Date().toLocaleDateString(),
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
      setAppointments(prev => {
        const pendingIndex = prev.pending.findIndex(a => a.id === appointment.id);
        if (pendingIndex === -1) return prev;

        const rescheduledAppointment = prev.pending[pendingIndex];
        const newPending = [...prev.pending];
        newPending.splice(pendingIndex, 1);
        
        // Add to upcoming with new date/time
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
            rescheduledDate: new Date().toLocaleDateString()
          }]
        };
      });
      
      showNotification(`Appointment rescheduled for ${appointment.parentName}`, 'success');
      setLoadingAppointments(prev => ({ ...prev, [appointment.id]: false }));
      setShowRejectModal(false);
      setSelectedAppointment(null);
    }, 1000);
  }, [showNotification]);

  // Handle send reminder
  const handleSendReminder = useCallback((appointment, message, method) => {
    setLoadingAppointments(prev => ({ ...prev, [appointment.id]: true }));
    
    setTimeout(() => {
      showNotification(`Reminder sent via ${method.toUpperCase()} to ${appointment.parentName}`, 'success');
      setLoadingAppointments(prev => ({ ...prev, [appointment.id]: false }));
      setShowReminderModal(false);
      setSelectedAppointment(null);
    }, 1000);
  }, [showNotification]);

  // Baby Care Appointment Card Component
  const BabyCareAppointmentCard = React.memo(({ appointment, filter, onApprove, onRejectReschedule, onStartConsultation, onSendReminder, loading }) => {
    const isLoading = loading[appointment.id];

    return (
      <div className="baby-care-appointment-card">
        <div className="baby-care-appointment-header">
          <div className="baby-care-appointment-patient">
            <div className="baby-care-profile-icon">
              <span>👶</span>
            </div>
            <div className="baby-care-patient-info">
              <h3 className="baby-care-appointment-name">
                {appointment.parentName}
                <span 
                  className="baby-care-plan-badge"
                  style={{
                    backgroundColor: babyCarePlans.find(p => p.id === appointment.plan)?.color || '#009688'
                  }}
                >
                  {appointment.plan?.toUpperCase() || 'BASIC'} PLAN
                </span>
              </h3>
              <p className="baby-care-appointment-meta">
                Baby: {appointment.babyName} • Age: {appointment.babyAge}
                {appointment.vaccinationDue && (
                  <span className="baby-care-vaccine-badge"> 💉 Vaccine Due</span>
                )}
              </p>
              <div className="baby-care-consultation-type">
                {appointment.consultationType === 'offline' ? '🏥 Hospital' : 
                 appointment.consultationType === 'home_visit' ? '🏠 Home Visit' : '💻 Online'}
              </div>
            </div>
          </div>
          <div className="baby-care-appointment-time">
            <strong>{appointment.time}</strong>
            <span>{appointment.date}</span>
            <div className="baby-care-caregiver-info">
              👩‍🍼 {appointment.caregiverHours || '8 hours'} caregiver support
            </div>
          </div>
        </div>
        
        <div className="baby-care-appointment-details">
          <p><strong>Concern:</strong> {appointment.issue}</p>
          <p><strong>Feeding:</strong> {appointment.feedingType}</p>
          <p><strong>Caregiver Notes:</strong> {appointment.caregiverNotes || 'No notes'}</p>
        </div>

        <div className="baby-care-appointment-actions">
          {filter === 'pending' && (
            <>
              <button 
                className="baby-care-button-success"
                onClick={() => onApprove(appointment)}
                disabled={isLoading}
              >
                {isLoading ? 'Approving...' : 'Approve'}
              </button>
              <button 
                className="baby-care-button-secondary"
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
                className="baby-care-button-primary"
                onClick={() => onStartConsultation(appointment)}
                disabled={isLoading}
              >
                Start Consultation
              </button>
              <button 
                className="baby-care-button-secondary"
                onClick={() => onSendReminder(appointment)}
                disabled={isLoading}
              >
                {isLoading ? 'Processing...' : 'Send Reminder'}
              </button>
            </>
          )}
          
          {filter === 'cancelled' && (
            <div className="baby-care-cancelled-info">
              <p><strong>Cancelled Date:</strong> {appointment.cancelledDate || 'N/A'}</p>
              <p><strong>Reason:</strong> {appointment.reason || 'Not specified'}</p>
              {appointment.rejectedBy && (
                <p><strong>Action By:</strong> {appointment.rejectedBy}</p>
              )}
            </div>
          )}
        </div>
      </div>
    );
  });

  // Baby Care Patient Card Component - FIXED: Use patientReports only
  const BabyCarePatientCard = React.memo(({ patient, patientReports, onViewReports }) => {
    const patientReportsList = patientReports[patient.id] || [];
    const plan = patient.babyCareDetails?.package || 'basic';
    const currentPlan = babyCarePlans.find(p => p.id === plan);

    return (
      <div className="baby-care-patient-card">
        <div className="baby-care-patient-header">
          <div className="baby-care-profile-icon-large">
            <span>👶</span>
          </div>
          <div className="baby-care-patient-basic-info">
            <h3 className="baby-care-patient-name">{patient.babyCareDetails?.parentName || patient.name}</h3>
            <p className="baby-care-patient-contact">Baby: {patient.name}</p>
            <p className="baby-care-patient-contact">Phone: {patient.babyCareDetails?.parentPhone || patient.phone}</p>
          </div>
        </div>

        <div 
          className="baby-care-plan-indicator"
          style={{ borderLeftColor: currentPlan.color }}
        >
          <div className="baby-care-plan-header">
            <span className="baby-care-plan-icon">{currentPlan.icon}</span>
            <span className="baby-care-plan-name">{currentPlan.name}</span>
          </div>
          <div className="baby-care-plan-coverage">
            <span className="baby-care-coverage-text">{currentPlan.coverage}</span>
          </div>
        </div>

        <div className="baby-care-baby-details">
          <div className="baby-care-detail-row">
            <span>Baby Age:</span>
            <strong>{patient.babyCareDetails?.age || 'N/A'}</strong>
          </div>
          <div className="baby-care-detail-row">
            <span>Weight:</span>
            <strong>{patient.babyCareDetails?.weight || 'N/A'} kg</strong>
          </div>
          <div className="baby-care-detail-row">
            <span>Feeding:</span>
            <strong>{patient.babyCareDetails?.feedingType || 'N/A'}</strong>
          </div>
          <div className="baby-care-detail-row">
            <span>Next Vaccination:</span>
            <strong className={patient.babyCareDetails?.vaccinationDue ? "baby-care-due-text" : ""}>
              {patient.babyCareDetails?.nextVaccination || 'Not scheduled'}
            </strong>
          </div>
        </div>

        <div className="baby-care-reports-summary">
          <strong>Reports:</strong>
          <span className="baby-care-report-count">
            {patientReportsList.length} files
          </span>
        </div>

        <div className="baby-care-patient-actions">
          <button 
            className="baby-care-button-primary"
            onClick={() => onViewReports(patient)}
          >
            View/Upload Reports
          </button>
        </div>
      </div>
    );
  });

  // Plans Tab Component
  const PlansTab = React.memo(() => (
    <div className="baby-care-plans-container">
      <div className="baby-care-plans-header">
        <h3>Baby Care Subscription Plans</h3>
        <p>Three comprehensive plans for different baby care needs</p>
      </div>
      
      <div className="baby-care-plans-grid">
        {babyCarePlans.map(plan => (
          <div key={plan.id} className="baby-care-plan-card">
            <div 
              className="baby-care-plan-card-header"
              style={{
                backgroundColor: `${plan.color}20`,
                borderBottomColor: plan.color
              }}
            >
              <div className="baby-care-plan-card-icon">{plan.icon}</div>
              <div>
                <h4 className="baby-care-plan-card-name">{plan.name}</h4>
                <div className="baby-care-plan-card-price">{plan.price}</div>
              </div>
            </div>
            
            <div className="baby-care-plan-card-body">
              <div className="baby-care-plan-card-coverage">
                <span className="baby-care-coverage-icon">⏰</span>
                <span>{plan.coverage}</span>
              </div>
              
              <div className="baby-care-plan-card-features">
                <h5 className="baby-care-features-title">Key Features:</h5>
                <ul className="baby-care-features-list">
                  {plan.features.slice(0, 4).map((feature, index) => (
                    <li key={index} className="baby-care-feature-list-item">
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="baby-care-plan-card-stats">
                <span className="baby-care-stat-item">
                  <strong>{plan.patients.split(' ')[0]}</strong> babies enrolled
                </span>
              </div>
            </div>
            
            <div className="baby-care-plan-card-actions">
              <button 
                className="baby-care-details-button"
                style={{
                  borderColor: plan.color,
                  color: plan.color
                }}
                onClick={() => {
                  setSelectedPlan(plan.id);
                  setShowPlanDetails(true);
                }}
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="baby-care-plans-comparison">
        <h4 className="baby-care-comparison-title">Plan Comparison</h4>
        <table className="baby-care-comparison-table">
          <thead>
            <tr>
              <th className="baby-care-table-header">Features</th>
              {babyCarePlans.map(plan => (
                <th key={plan.id} className="baby-care-table-header" style={{ color: plan.color }}>
                  {plan.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="baby-care-table-cell">Caregiver Hours</td>
              <td className="baby-care-table-cell">8 hrs/day</td>
              <td className="baby-care-table-cell">12 hrs/day</td>
              <td className="baby-care-table-cell">24×7</td>
            </tr>
            <tr>
              <td className="baby-care-table-cell">Supplies</td>
              <td className="baby-care-table-cell">Basic</td>
              <td className="baby-care-table-cell">Enhanced</td>
              <td className="baby-care-table-cell">Premium Organic</td>
            </tr>
            <tr>
              <td className="baby-care-table-cell">Medical Guidance</td>
              <td className="baby-care-table-cell">Basic</td>
              <td className="baby-care-table-cell">Health Monitoring</td>
              <td className="baby-care-table-cell">Pediatrician Access</td>
            </tr>
            <tr>
              <td className="baby-care-table-cell">Parent Reports</td>
              <td className="baby-care-table-cell">Monthly</td>
              <td className="baby-care-table-cell">Daily/Weekly</td>
              <td className="baby-care-table-cell">Real-time</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  ));

  // Notifications Component
  const Notifications = React.memo(() => (
    <div className="baby-care-notifications-container">
      {notifications.map(notification => (
        <div
          key={notification.id}
          className="baby-care-notification"
          style={{
            backgroundColor: notification.type === 'success' ? '#4CAF50' :
                           notification.type === 'error' ? '#F44336' : '#009688'
          }}
        >
          {notification.message}
        </div>
      ))}
    </div>
  ));

  return (
    <div className="baby-care-container">
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
      <ReportViewerModal 
        show={showReportViewer}
        patient={selectedPatient}
        patientReports={patientReports}
        onClose={() => {
          setShowReportViewer(false);
          setSelectedPatient(null);
        }}
        onFileUpload={handleFileUpload}
        onRemoveReport={handleRemoveReport}
      />
      <VideoConsultationModal 
        show={showVideoConsultation}
        consultation={currentConsultation}
        callTime={callTime}
        isRecording={isRecording}
        onEndCall={handleEndConsultation}
        onToggleRecording={handleToggleRecording}
        onClose={() => {
          setShowVideoConsultation(false);
          setCurrentConsultation(null);
        }}
      />
      <PlanDetailsModal 
        show={showPlanDetails}
        planId={selectedPlan}
        plans={babyCarePlans}
        onClose={() => setShowPlanDetails(false)}
      />
      
      <div className="baby-care-header">
        <div>
          <h1 className="baby-care-title">Baby Care</h1>
          <p className="baby-care-subtitle">Manage baby care appointments and subscription plans</p>
        </div>
      </div>

      <div className="baby-care-tabs">
        <button
          className={`baby-care-tab ${activeTab === 'appointments' ? 'baby-care-tab-active' : ''}`}
          onClick={() => setActiveTab('appointments')}
        >
          Appointments ({appointments.upcoming.length + appointments.pending.length})
        </button>
        <button
          className={`baby-care-tab ${activeTab === 'patients' ? 'baby-care-tab-active' : ''}`}
          onClick={() => setActiveTab('patients')}
        >
          Patients ({patients.length})
        </button>
        <button
          className={`baby-care-tab ${activeTab === 'plans' ? 'baby-care-tab-active' : ''}`}
          onClick={() => setActiveTab('plans')}
        >
          Care Plans
        </button>
      </div>

      {activeTab === 'appointments' && (
        <>
          <div className="baby-care-filter-tabs">
            <button
              className={`baby-care-filter-tab ${babyCareFilter === 'pending' ? 'baby-care-filter-tab-active' : ''}`}
              onClick={() => setBabyCareFilter('pending')}
            >
              Pending ({appointments.pending.length})
            </button>
            <button
              className={`baby-care-filter-tab ${babyCareFilter === 'upcoming' ? 'baby-care-filter-tab-active' : ''}`}
              onClick={() => setBabyCareFilter('upcoming')}
            >
              Upcoming ({appointments.upcoming.length})
            </button>
            <button
              className={`baby-care-filter-tab ${babyCareFilter === 'cancelled' ? 'baby-care-filter-tab-active' : ''}`}
              onClick={() => setBabyCareFilter('cancelled')}
            >
              Cancelled ({appointments.cancelled.length})
            </button>
          </div>

          <div className="baby-care-appointments-container">
            {getFilteredBabyCareAppointments().length > 0 ? (
              getFilteredBabyCareAppointments().map(appointment => (
                <BabyCareAppointmentCard 
                  key={appointment.id} 
                  appointment={appointment} 
                  filter={babyCareFilter}
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
              <div className="baby-care-empty-state">
                <p>No {babyCareFilter} appointments found</p>
              </div>
            )}
          </div>
        </>
      )}

      {activeTab === 'patients' && (
        <div className="baby-care-patients-container">
          <div className="baby-care-patients-header">
            <h3>Baby Care Patients ({patients.length})</h3>
          </div>
          
          {patients.length > 0 ? (
            <div className="baby-care-patients-grid">
              {patients.map(patient => (
                <BabyCarePatientCard 
                  key={patient.id} 
                  patient={patient} 
                  patientReports={patientReports}
                  onViewReports={(patient) => {
                    setSelectedPatient(patient);
                    setShowReportViewer(true);
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="baby-care-empty-state">
              <div className="baby-care-empty-state-icon">👶</div>
              <h4>No babies in care yet</h4>
              <p>No baby patients are currently enrolled in care plans</p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'plans' && (
        <PlansTab />
      )}
    </div>
  );
};

export default BabyCareContent;  