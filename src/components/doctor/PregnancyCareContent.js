import React, { useState, useEffect, useRef, useCallback } from 'react';
import './PregnancyCareContent.css';

const PregnancyCareContent = ({ dashboardData, state, actions }) => {
  const { pregnancyFilter } = state;
  const { setPregnancyFilter } = actions;

  const [activeTab, setActiveTab] = useState('appointments');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showReportViewer, setShowReportViewer] = useState(false);
  const [showVideoConsultation, setShowVideoConsultation] = useState(false);
  const [currentConsultation, setCurrentConsultation] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [callTime, setCallTime] = useState(0);
  const [loadingAppointments, setLoadingAppointments] = useState({});
  const [notifications, setNotifications] = useState([]);
  const [patientReports, setPatientReports] = useState({});
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showReminderModal, setShowReminderModal] = useState(false);
  const [showPlanDetails, setShowPlanDetails] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  
  // Local state for appointments
  const [appointments, setAppointments] = useState({
    pending: [...dashboardData.pregnancyAppointments.pending],
    upcoming: [...dashboardData.pregnancyAppointments.upcoming],
    cancelled: [...dashboardData.pregnancyAppointments.cancelled]
  });

  // Local state for patients
  const [patients, setPatients] = useState([]);

  // Pregnancy Packages Data
  const pregnancyPackages = [
    {
      id: 'basic',
      name: 'Basic Pregnancy Care',
      price: '₹25,000',
      duration: '9 months',
      patients: '8 patients enrolled',
      icon: '🤰',
      color: '#009688',
      features: [
        'Monthly checkups',
        'Basic tests (Blood, Urine)',
        '2 Ultrasounds',
        'Hospital delivery',
        'Postnatal checkup'
      ],
      idealFor: 'Low-risk pregnancies, first-time mothers',
      coverage: 'Standard pregnancy care'
    },
    {
      id: 'premium',
      name: 'Premium Pregnancy Care',
      price: '₹50,000',
      duration: '9 months',
      patients: '5 patients enrolled',
      icon: '🌟',
      color: '#4DB6AC',
      features: [
        'Fortnightly checkups',
        'All tests included',
        '4 Ultrasounds',
        'Home visits (3 times)',
        'Nutrition counseling',
        'Delivery & postnatal care'
      ],
      idealFor: 'Working professionals, high-risk pregnancies',
      coverage: 'Enhanced care with home visits'
    },
    {
      id: 'comprehensive',
      name: 'Comprehensive Pregnancy Care',
      price: '₹75,000',
      duration: '9 months',
      patients: '2 patients enrolled',
      icon: '👑',
      color: '#00796B',
      features: [
        'Weekly checkups',
        'All tests & advanced scans',
        'Unlimited home visits',
        'Personalized nutrition plan',
        'Delivery preparation classes',
        'Complete postnatal care'
      ],
      idealFor: 'High-risk pregnancies, VIP patients',
      coverage: 'Complete care package'
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
    const pregnancyPatients = [...dashboardData.patients.filter(p => p.patientType === 'pregnancy')];
    setPatients(pregnancyPatients);
    
    const reportsState = {};
    pregnancyPatients.forEach(patient => {
      const reports = patient.pregnancyDetails?.reports || [];
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

  // Get pregnancy appointments
  const getFilteredPregnancyAppointments = () => {
    switch (pregnancyFilter) {
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
    if (appointment.isFirstConsultation && appointment.consultationType !== 'offline') {
      showNotification('First pregnancy consultation must be at hospital', 'error');
      return;
    }

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
      
      showNotification(`Appointment rescheduled for ${appointment.patientName}`, 'success');
      setLoadingAppointments(prev => ({ ...prev, [appointment.id]: false }));
      setShowRejectModal(false);
      setSelectedAppointment(null);
    }, 1000);
  }, [showNotification]);

  // Start video consultation
  const handleStartConsultation = useCallback((appointment) => {
    if (appointment.isFirstConsultation) {
      showNotification(`First consultation must be at hospital for ${appointment.patientName}`, 'info');
      return;
    }

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

  // Toggle screen sharing
  const handleToggleScreenShare = useCallback(() => {
    setIsScreenSharing(!isScreenSharing);
    showNotification(isScreenSharing ? 'Screen sharing stopped' : 'Screen sharing started', 'info');
  }, [isScreenSharing, showNotification]);

  // Handle file upload
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
        uploaded: true
      };
    });
    
    setPatientReports(prev => ({
      ...prev,
      [patientId]: [...(prev[patientId] || []), ...newReports]
    }));
    
    showNotification(`${validFiles.length} file(s) uploaded successfully to ${patientName}'s reports`, 'success');
  }, [showNotification]);

  // Handle remove report
  const handleRemoveReport = useCallback((patientId, reportId) => {
    setPatientReports(prev => ({
      ...prev,
      [patientId]: prev[patientId]?.filter(r => r.id !== reportId) || []
    }));
    showNotification('Report removed successfully', 'success');
  }, [showNotification]);

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
      <div className="modalOverlay">
        <div className="modal">
          <div className="modalHeader">
            <h3 className="modalTitle">
              Manage Appointment - {appointment.patientName}
            </h3>
            <button 
              className="closeButton"
              onClick={onClose}
            >
              ✕
            </button>
          </div>

          <div className="modalContent">
            <div className="appointmentInfoCard">
              <p><strong>Patient:</strong> {appointment.patientName}</p>
              <p><strong>Trimester:</strong> {appointment.trimester}</p>
              <p><strong>Scheduled:</strong> {appointment.date} at {appointment.time}</p>
              <p><strong>Issue:</strong> {appointment.issue}</p>
            </div>

            <div className="section">
              <h4 className="sectionTitle">Reject Appointment</h4>
              <div className="inputGroup">
                <label className="label">Reason for rejection:</label>
                <textarea 
                  className="textarea"
                  placeholder="Provide reason for rejecting this appointment..."
                  value={rejectReason}
                  onChange={handleRejectReasonChange}
                  rows="3"
                />
              </div>
              <button 
                className="dangerButton"
                onClick={handleRejectSubmit}
                disabled={!rejectReason.trim() || loading}
              >
                {loading ? 'Processing...' : 'Reject Appointment'}
              </button>
            </div>

            <div className="divider">
              <span className="dividerText">OR</span>
            </div>

            <div className="section">
              <h4 className="sectionTitle">Reschedule Appointment</h4>
              <div className="inputGroup">
                <label className="label">New Date:</label>
                <input 
                  type="date" 
                  className="input"
                  min={getCurrentDate()}
                  value={rescheduleDate}
                  onChange={handleRescheduleDateChange}
                />
              </div>
              <div className="inputGroup">
                <label className="label">New Time:</label>
                <input 
                  type="time" 
                  className="input"
                  value={rescheduleTime}
                  onChange={handleRescheduleTimeChange}
                />
              </div>
              <button 
                className="successButton"
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
          message = `Reminder: Your pregnancy care appointment with Dr. is scheduled for tomorrow at ${appointment.time}. Please be on time.`;
          break;
        case '1h':
          message = `Reminder: Your appointment is in 1 hour. Please join the video call or arrive at the clinic for your ${appointment.trimester} trimester checkup.`;
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
      <div className="modalOverlay">
        <div className="modal">
          <div className="modalHeader">
            <h3 className="modalTitle">
              Send Reminder - {appointment.patientName}
            </h3>
            <button 
              className="closeButton"
              onClick={onClose}
            >
              ✕
            </button>
          </div>

          <div className="modalContent">
            <div className="appointmentInfoCard">
              <p><strong>Patient:</strong> {appointment.patientName}</p>
              <p><strong>Trimester:</strong> {appointment.trimester} • {appointment.weeks} weeks</p>
              <p><strong>Scheduled:</strong> {appointment.date} at {appointment.time}</p>
              <p><strong>Appointment Type:</strong> {appointment.consultationType === 'offline' ? '🏥 Hospital' : 
                 appointment.consultationType === 'home_visit' ? '🏠 Home Visit' : '💻 Online'}</p>
            </div>

            <div className="section">
              <h4 className="sectionTitle">Reminder Details</h4>
              
              <div className="inputGroup">
                <label className="label">Select Method:</label>
                <div className="methodOptions">
                  <label className={`methodOption ${reminderMethod === 'sms' ? 'activeMethodOption' : ''}`}>
                    <input
                      type="radio"
                      value="sms"
                      checked={reminderMethod === 'sms'}
                      onChange={() => handleMethodChange('sms')}
                      className="radioInput"
                    />
                    <span className="methodLabel">📱 SMS</span>
                  </label>
                  <label className={`methodOption ${reminderMethod === 'email' ? 'activeMethodOption' : ''}`}>
                    <input
                      type="radio"
                      value="email"
                      checked={reminderMethod === 'email'}
                      onChange={() => handleMethodChange('email')}
                      className="radioInput"
                    />
                    <span className="methodLabel">📧 Email</span>
                  </label>
                  <label className={`methodOption ${reminderMethod === 'whatsapp' ? 'activeMethodOption' : ''}`}>
                    <input
                      type="radio"
                      value="whatsapp"
                      checked={reminderMethod === 'whatsapp'}
                      onChange={() => handleMethodChange('whatsapp')}
                      className="radioInput"
                    />
                    <span className="methodLabel">💬 WhatsApp</span>
                  </label>
                </div>
              </div>

              <div className="inputGroup">
                <label className="label">Reminder Message:</label>
                <textarea 
                  className="textarea"
                  placeholder={`Reminder for ${appointment.patientName}'s appointment on ${appointment.date} at ${appointment.time}. Trimester: ${appointment.trimester}`}
                  value={reminderMessage}
                  onChange={handleReminderMessageChange}
                  rows="4"
                />
                <div className="messagePreview">
                  <strong>Preview:</strong>
                  <div className="previewText">
                    {reminderMessage || 'Your reminder message will appear here...'}
                  </div>
                </div>
              </div>

              <div className="inputGroup">
                <label className="label">Quick Templates:</label>
                <div className="timeOptions">
                  <button 
                    type="button"
                    className="timeOption"
                    onClick={() => handleTimeOptionClick('24h')}
                  >
                    24 hours before
                  </button>
                  <button 
                    type="button"
                    className="timeOption"
                    onClick={() => handleTimeOptionClick('1h')}
                  >
                    1 hour before
                  </button>
                  <button 
                    type="button"
                    className="timeOption"
                    onClick={() => handleTimeOptionClick('now')}
                  >
                    At appointment time
                  </button>
                </div>
              </div>

              <button 
                className="primaryButton"
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

  // Report Viewer Modal Component
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
      <div className="modalOverlay">
        <div className="modal">
          <div className="modalHeader">
            <h3 className="modalTitle">
              Medical Reports - {patient.name}
            </h3>
            <button 
              className="closeButton"
              onClick={onClose}
            >
              ✕
            </button>
          </div>

          <div className="modalContent">
            <div className="uploadSection">
              <h4 className="sectionTitle">Upload New Report</h4>
              <div className="uploadArea">
                <input 
                  ref={fileInputRef}
                  type="file"
                  id="report-upload"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="fileInput"
                  onChange={handleFileSelect}
                />
                <label htmlFor="report-upload" className="uploadLabel">
                  <div className="uploadIcon">📁</div>
                  <div className="uploadText">
                    <strong>Click to upload reports</strong>
                    <span>Supports PDF, JPG, PNG files</span>
                  </div>
                </label>
              </div>
            </div>

            <div className="section">
              <h4 className="sectionTitle">All Reports ({patientReportsList.length})</h4>
              {patientReportsList.length > 0 ? (
                <div className="reportsList">
                  {patientReportsList.map((report) => (
                    <div key={report.id} className="reportItem">
                      <div className="reportIcon">
                        {report.type === 'pdf' ? '📄' : '🖼️'}
                      </div>
                      <div className="reportInfo">
                        <div className="reportName">{report.name}</div>
                        <div className="reportMeta">
                          {report.date} • {report.type ? report.type.toUpperCase() : 'FILE'} • {report.size}
                          {report.uploaded && <span style={{ marginLeft: '10px', color: '#4CAF50' }}>🆕 Uploaded</span>}
                        </div>
                      </div>
                      <div className="reportActions">
                        <button 
                          className="smallButton"
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
                          className="smallButton dangerButton"
                          onClick={() => handleRemoveClick(report.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="emptyReports">
                  <div className="emptyReportsIcon">📄</div>
                  <p>No reports available yet</p>
                  <p className="emptySubtext">Upload reports using the upload section above</p>
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
      <div className="videoModalOverlay">
        <div className="videoModal">
          <div className="videoHeader">
            <div className="videoHeaderInfo">
              <div className="videoStatus">
                <span className="connectedDot">●</span>
                <span>Status: connected</span>
              </div>
              <div className="callTimer">
                <span>{formatCallTime(callTime)}</span>
              </div>
            </div>
            <button 
              className="endCallButton"
              onClick={onEndCall}
            >
              End Call
            </button>
          </div>

          <div className="videoMainArea">
            <div className="patientVideoContainer">
              <div className="patientVideoHeader">
                <div className="patientVideoInfo">
                  <h3 className="patientVideoName">{consultation.patientName}</h3>
                  <div className="trimesterIndicator">
                    🤰 {consultation.trimester} Trimester • {consultation.weeks} weeks
                  </div>
                </div>
              </div>
              
              <div className="videoFeed">
                <div className="videoMock">
                  <div className="videoMockContent">
                    <div className="videoMockAvatar">
                      <span className="avatarEmoji">👩</span>
                    </div>
                    <div className="videoMockInfo">
                      <p className="videoMockText">Live Video Feed</p>
                      <p className="videoMockSubtext">{consultation.patientName}</p>
                    </div>
                  </div>
                </div>
                
                <div className="selfView">
                  <div className="selfViewHeader">
                    <span className="selfViewLabel">You</span>
                  </div>
                  <div className="selfViewVideo">
                    <div className="selfViewMock">
                      <span className="selfViewEmoji">👨‍⚕️</span>
                      <p className="selfViewText">Dr. View</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="quickTools">
              <div className="quickToolsHeader">
                <h4 className="quickToolsTitle">Pregnancy Care Tools</h4>
              </div>
              
              <div className="toolButtons">
                <button 
                  className={isScreenSharing ? 'activeToolButton' : 'toolButton'}
                  onClick={onToggleScreenShare}
                >
                  <span className="toolIcon">🖥️</span>
                  <span>Share Screen</span>
                </button>
                
                <button 
                  className={isRecording ? 'recordingButton' : 'toolButton'}
                  onClick={onToggleRecording}
                >
                  <span className="toolIcon">⏺️</span>
                  <span>{isRecording ? 'Recording...' : 'Record'}</span>
                </button>
                
                <button 
                  className="toolButton"
                  onClick={() => showNotification('Opening prescription pad', 'info')}
                >
                  <span className="toolIcon">💊</span>
                  <span>Prescription</span>
                </button>
                
                <button 
                  className="toolButton"
                  onClick={() => showNotification('Opening pregnancy chart', 'info')}
                >
                  <span className="toolIcon">📈</span>
                  <span>Progress Chart</span>
                </button>
                
                <button 
                  className="toolButton"
                  onClick={() => showNotification('Opening test results', 'info')}
                >
                  <span className="toolIcon">🧪</span>
                  <span>Test Results</span>
                </button>
              </div>
              
              <div className="consultationNotes">
                <h4 className="notesTitle">Consultation Notes</h4>
                <textarea 
                  className="notesTextarea"
                  placeholder="Add notes about symptoms, observations, recommendations..."
                  value={notes}
                  onChange={handleNotesChange}
                  rows="4"
                />
                <button 
                  className="saveNotesButton"
                  onClick={handleSaveNotes}
                >
                  Save Notes
                </button>
              </div>
            </div>
          </div>

          <div className="videoFooter">
            <div className="appointmentInfo">
              <strong>Patient:</strong> {consultation.patientName}
            </div>
            <div className="consultationType">
              <strong>Trimester:</strong> {consultation.trimester} • {consultation.weeks} weeks
            </div>
          </div>
        </div>
      </div>
    );
  });

  // Plan Details Modal Component
  const PlanDetailsModal = React.memo(({ show, plan, onClose }) => {
    if (!show || !plan) return null;

    return (
      <div className="modalOverlay">
        <div className="modal">
          <div className="modalHeader">
            <h3 className="modalTitle">
              {plan.name} - Complete Details
            </h3>
            <button 
              className="closeButton"
              onClick={onClose}
            >
              ✕
            </button>
          </div>
          
          <div className="modalContent">
            <div 
              className="planHeaderCard"
              style={{
                backgroundColor: `${plan.color}20`,
                borderColor: plan.color
              }}
            >
              <div className="planHeaderContent">
                <div className="planIconLarge">{plan.icon}</div>
                <div>
                  <h4 className="planHeaderTitle">{plan.name}</h4>
                  <p className="planHeaderPrice">{plan.price}</p>
                  <p className="planHeaderDuration">{plan.duration} • {plan.patients}</p>
                </div>
              </div>
            </div>
            
            <div className="section">
              <h4 className="sectionTitle">Perfect For</h4>
              <div className="idealFor">
                <span className="idealForIcon">🎯</span>
                <span>{plan.idealFor}</span>
              </div>
            </div>
            
            <div className="section">
              <h4 className="sectionTitle">Care Coverage</h4>
              <div className="coverageCard">
                <span className="coverageIcon">⏰</span>
                <span>{plan.coverage}</span>
              </div>
            </div>
            
            <div className="section">
              <h4 className="sectionTitle">All Features</h4>
              <div className="featuresList">
                {plan.features.map((feature, index) => (
                  <div key={index} className="featureItem">
                    <span className="checkIcon">✓</span>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="section">
              <h4 className="sectionTitle">Doctor's Recommendation</h4>
              <div className="recommendation">
                <p>This plan is ideal for {plan.idealFor.toLowerCase()}. It provides comprehensive care throughout the pregnancy journey with the right balance of checkups, tests, and support services.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  });

  // Pregnancy Appointment Card Component
  const PregnancyAppointmentCard = React.memo(({ appointment, filter, onApprove, onRejectReschedule, onStartConsultation, onSendReminder, loading }) => {
    const isLoading = loading[appointment.id];
    const isFirstConsultation = appointment.isFirstConsultation;

    return (
      <div className="appointmentCard">
        <div className="appointmentHeader">
          <div className="appointmentPatient">
            <div className="profileIcon">
              <span>🤰</span>
            </div>
            <div className="patientInfo">
              <h3 className="appointmentName">
                {appointment.patientName}
                <span className="trimesterBadge">
                  {appointment.trimester} Trimester
                </span>
                {isFirstConsultation && (
                  <span className="firstConsultationBadge">First Visit</span>
                )}
              </h3>
              <p className="appointmentMeta">
                Age: {appointment.age} • {appointment.weeks} weeks
                {isFirstConsultation && (
                  <span className="freeBadge"> First Free</span>
                )}
              </p>
              <div className="consultationType">
                {appointment.consultationType === 'offline' ? '🏥 Hospital' : 
                 appointment.consultationType === 'home_visit' ? '🏠 Home Visit' : '💻 Online'}
              </div>
            </div>
          </div>
          <div className="appointmentTime">
            <strong>{appointment.time}</strong>
            <span>{appointment.date}</span>
            {isFirstConsultation && (
              <span className="hospitalRequired">🏥 Hospital Required</span>
            )}
          </div>
        </div>
        
        <div className="appointmentDetails">
          <p><strong>Reason:</strong> {appointment.issue}</p>
          <p><strong>Duration:</strong> {appointment.duration}</p>
          {appointment.location && (
            <p><strong>Location:</strong> {appointment.location}</p>
          )}
        </div>

        <div className="appointmentActions">
          {filter === 'pending' && (
            <>
              <button 
                className="successButton"
                onClick={() => onApprove(appointment)}
                disabled={isLoading}
              >
                {isLoading ? 'Approving...' : 'Approve'}
              </button>
              <button 
                className="secondaryButton"
                onClick={() => onRejectReschedule(appointment)}
                disabled={isLoading}
              >
                {isLoading ? 'Processing...' : 'Reject/Reschedule'}
              </button>
            </>
          )}
          
          {filter === 'upcoming' && (
            <>
              {!isFirstConsultation ? (
                <button 
                  className="primaryButton"
                  onClick={() => onStartConsultation(appointment)}
                  disabled={isLoading}
                >
                  Start Consultation
                </button>
              ) : (
                <button 
                  className="hospitalButton"
                  onClick={() => showNotification(`First consultation must be at hospital for ${appointment.patientName}`, 'info')}
                  disabled={isLoading}
                >
                  🏥 Hospital Visit Required
                </button>
              )}
              <button 
                className="secondaryButton"
                onClick={() => onSendReminder(appointment)}
                disabled={isLoading}
              >
                {isLoading ? 'Processing...' : 'Send Reminder'}
              </button>
            </>
          )}
          
          {filter === 'cancelled' && (
            <div className="cancelledInfo">
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

  // Pregnancy Patient Card Component
  const PregnancyPatientCard = React.memo(({ patient, patientReports, onViewReports }) => {
    const patientReportsList = patientReports[patient.id] || [];
    const plan = patient.pregnancyDetails?.package || 'basic';
    const currentPlan = pregnancyPackages.find(p => p.id === plan) || pregnancyPackages[0];

    return (
      <div className="patientCard">
        <div className="patientHeader">
          <div className="profileIconLarge">
            <span>🤰</span>
          </div>
          <div className="patientBasicInfo">
            <h3 className="patientName">{patient.name}</h3>
            <p className="patientContact">{patient.phone}</p>
            <p className="patientEmail">{patient.email}</p>
          </div>
        </div>

        <div 
          className="planIndicator"
          style={{ borderLeftColor: currentPlan.color }}
        >
          <div className="planHeader">
            <span className="planIcon">{currentPlan.icon}</span>
            <span className="planName">{currentPlan.name}</span>
          </div>
          <div className="planCoverage">
            <span className="coverageText">{currentPlan.coverage}</span>
          </div>
        </div>

        <div className="pregnancyDetails">
          <div className="detailRow">
            <span>Trimester:</span>
            <strong>{patient.pregnancyDetails?.trimester || 'N/A'}</strong>
          </div>
          <div className="detailRow">
            <span>Weeks:</span>
            <strong>{patient.pregnancyDetails?.weeks || 'N/A'} weeks</strong>
          </div>
          <div className="detailRow">
            <span>Next Appointment:</span>
            <strong>{patient.pregnancyDetails?.nextAppointment || 'Not scheduled'}</strong>
          </div>
          <div className="detailRow">
            <span>Last Checkup:</span>
            <strong>{patient.pregnancyDetails?.lastCheckup || 'N/A'}</strong>
          </div>
        </div>

        <div className="reportsSummary">
          <strong>Reports:</strong>
          <span className="reportCount">
            {patientReportsList.length} files
          </span>
        </div>

        <div className="patientActions">
          <button 
            className="primaryButton"
            onClick={() => onViewReports(patient)}
          >
            View/Upload Reports
          </button>
        </div>
      </div>
    );
  });

  // Packages Tab Component
  const PackagesTab = React.memo(() => (
    <div className="packagesContainer">
      <div className="packagesHeader">
        <h3>Pregnancy Care Packages</h3>
        <p>Three comprehensive plans for complete pregnancy care</p>
      </div>
      
      <div className="packagesGrid">
        {pregnancyPackages.map(pkg => {
          let patientsCount = '0';
          if (typeof pkg.patients === 'string') {
            patientsCount = pkg.patients.split(' ')[0] || '0';
          } else if (typeof pkg.patients === 'number') {
            patientsCount = pkg.patients.toString();
          }

          return (
            <div key={pkg.id} className="packageCard">
              <div 
                className="packageCardHeader"
                style={{
                  backgroundColor: `${pkg.color}20`,
                  borderBottomColor: pkg.color
                }}
              >
                <div className="packageCardIcon">{pkg.icon}</div>
                <div>
                  <h4 className="packageCardName">{pkg.name}</h4>
                  <div className="packageCardPrice">{pkg.price}</div>
                </div>
              </div>
              
              <div className="packageCardBody">
                <div className="packageCardDuration">
                  <span>{pkg.duration}</span>
                  <span>• {patientsCount} patients enrolled</span>
                </div>
                
                <div className="packageCardFeatures">
                  <div className="featuresList">
                    {pkg.features && pkg.features.map((feature, index) => (
                      <div key={index} className="featureItem">
                        <span className="featureIcon">✓</span>
                        <span className="featureText">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="packageCardActions">
                <button 
                  className="detailsButton"
                  style={{
                    borderColor: pkg.color,
                    color: pkg.color
                  }}
                  onClick={() => {
                    setSelectedPlan(pkg);
                    setShowPlanDetails(true);
                  }}
                >
                  View Details
                </button>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="packagesComparison">
        <h4 className="comparisonTitle">Plan Comparison</h4>
        <table className="comparisonTable">
          <thead>
            <tr>
              <th className="tableHeader">Features</th>
              <th className="tableHeader">Basic</th>
              <th className="tableHeader">Premium</th>
              <th className="tableHeader">Comprehensive</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="tableCell">Checkup Frequency</td>
              <td className="tableCell">Monthly</td>
              <td className="tableCell">Fortnightly</td>
              <td className="tableCell">Weekly</td>
            </tr>
            <tr>
              <td className="tableCell">Ultrasounds</td>
              <td className="tableCell">2 scans</td>
              <td className="tableCell">4 scans</td>
              <td className="tableCell">Advanced scans</td>
            </tr>
            <tr>
              <td className="tableCell">Home Visits</td>
              <td className="tableCell">None</td>
              <td className="tableCell">3 visits</td>
              <td className="tableCell">Unlimited</td>
            </tr>
            <tr>
              <td className="tableCell">Nutrition Plan</td>
              <td className="tableCell">Basic</td>
              <td className="tableCell">Counseling</td>
              <td className="tableCell">Personalized</td>
            </tr>
            <tr>
              <td className="tableCell">Delivery Classes</td>
              <td className="tableCell">No</td>
              <td className="tableCell">No</td>
              <td className="tableCell">Yes</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="packagesGuidelines">
        <h4 className="guidelinesTitle">Package Guidelines</h4>
        <ul className="guidelinesList">
          <li>✓ First consultation is always free at hospital</li>
          <li>✓ Explain all packages during first visit</li>
          <li>✓ Help patient choose based on trimester and needs</li>
          <li>✓ Package can be upgraded anytime</li>
          <li>✓ Emergency support available 24/7 for all plans</li>
        </ul>
      </div>
    </div>
  ));

  // Notifications Component
  const Notifications = React.memo(() => (
    <div className="notificationsContainer">
      {notifications.map(notification => (
        <div
          key={notification.id}
          className="notification"
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
    <div className="mainContent">
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
        isScreenSharing={isScreenSharing}
        onEndCall={handleEndConsultation}
        onToggleRecording={handleToggleRecording}
        onToggleScreenShare={handleToggleScreenShare}
        onClose={() => {
          setShowVideoConsultation(false);
          setCurrentConsultation(null);
        }}
      />
      <PlanDetailsModal 
        show={showPlanDetails}
        plan={selectedPlan}
        onClose={() => setShowPlanDetails(false)}
      />
      
      <div className="header">
        <div>
          <h1 className="title">Pregnancy Care</h1>
          <p className="subtitle">Manage pregnancy appointments and patients</p>
        </div>
      </div>

      <div className="tabs">
        <button
          className={`tab ${activeTab === 'appointments' ? 'activeTab' : ''}`}
          onClick={() => setActiveTab('appointments')}
        >
          Appointments ({appointments.upcoming.length + appointments.pending.length})
        </button>
        <button
          className={`tab ${activeTab === 'patients' ? 'activeTab' : ''}`}
          onClick={() => setActiveTab('patients')}
        >
          Patients ({patients.length})
        </button>
        <button
          className={`tab ${activeTab === 'packages' ? 'activeTab' : ''}`}
          onClick={() => setActiveTab('packages')}
        >
          Care Packages
        </button>
      </div>

      {activeTab === 'appointments' && (
        <>
          <div className="filterTabs">
            <button
              className={`filterTab ${pregnancyFilter === 'pending' ? 'activeFilterTab' : ''}`}
              onClick={() => setPregnancyFilter('pending')}
            >
              Pending ({appointments.pending.length})
            </button>
            <button
              className={`filterTab ${pregnancyFilter === 'upcoming' ? 'activeFilterTab' : ''}`}
              onClick={() => setPregnancyFilter('upcoming')}
            >
              Upcoming ({appointments.upcoming.length})
            </button>
            <button
              className={`filterTab ${pregnancyFilter === 'cancelled' ? 'activeFilterTab' : ''}`}
              onClick={() => setPregnancyFilter('cancelled')}
            >
              Cancelled ({appointments.cancelled.length})
            </button>
          </div>

          <div className="appointmentsContainer">
            {getFilteredPregnancyAppointments().length > 0 ? (
              getFilteredPregnancyAppointments().map(appointment => (
                <PregnancyAppointmentCard 
                  key={appointment.id} 
                  appointment={appointment} 
                  filter={pregnancyFilter}
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
              <div className="emptyState">
                <p>No {pregnancyFilter} appointments found</p>
              </div>
            )}
          </div>
        </>
      )}

      {activeTab === 'patients' && (
        <div className="patientsContainer">
          <div className="patientsHeader">
            <h3>Pregnancy Patients ({patients.length})</h3>
          </div>
          
          {patients.length > 0 ? (
            <div className="patientsGrid">
              {patients.map(patient => (
                <PregnancyPatientCard 
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
            <div className="emptyState">
              <div className="emptyStateIcon">🤰</div>
              <h4>No pregnancy patients yet</h4>
              <p>No patients are currently enrolled in pregnancy care</p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'packages' && (
        <PackagesTab />
      )}
    </div>
  );
};

export default PregnancyCareContent;