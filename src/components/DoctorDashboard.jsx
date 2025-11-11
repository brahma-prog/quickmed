import React, { useState, useEffect } from 'react';

const DoctorDashboard = ({ user, onLogout }) => {
  const [activePage, setActivePage] = useState('dashboard');
  const [timeRange, setTimeRange] = useState('today');
  const [consultationDetails, setConsultationDetails] = useState(null);
  const [appointmentFilter, setAppointmentFilter] = useState('upcoming');
  const [patientSearch, setPatientSearch] = useState('');
  const [earningFilter, setEarningFilter] = useState('daily');
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showNotificationsModal, setShowNotificationsModal] = useState(false);
  const [showMessagesModal, setShowMessagesModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  // User profile state - initialized with logged-in user data
  const [userProfile, setUserProfile] = useState({
    fullName: user?.fullName || 'Dr. John Doe',
    email: user?.email || 'doctor@example.com',
    phone: user?.phone || '+91 98765 43210',
    specialization: user?.specialization || 'General Physician',
    licenseNumber: user?.licenseNumber || 'MED-2024-12345',
    experience: user?.experience || '12 years',
    hospital: user?.hospital || 'City General Hospital',
    address: user?.address || 'Medical Complex, Sector 15, Noida',
    city: user?.city || 'Noida',
    state: user?.state || 'Uttar Pradesh',
    pincode: user?.pincode || '201301'
  });

  // Notification messages state
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'appointment',
      title: 'New Appointment Request',
      message: 'Rahul Verma requested an appointment for general health checkup',
      time: '10 minutes ago',
      read: false,
      priority: 'high'
    },
    {
      id: 2,
      type: 'message',
      title: 'New Message from Patient',
      message: 'Sarah Johnson sent a message about prescription follow-up',
      time: '25 minutes ago',
      read: false,
      priority: 'medium'
    },
    {
      id: 3,
      type: 'reminder',
      title: 'Upcoming Appointment',
      message: 'You have an appointment with Lisa Thompson in 30 minutes',
      time: '1 hour ago',
      read: true,
      priority: 'high'
    },
    {
      id: 4,
      type: 'system',
      title: 'System Update',
      message: 'New features added to patient management system',
      time: '2 hours ago',
      read: true,
      priority: 'low'
    },
    {
      id: 5,
      type: 'prescription',
      title: 'Prescription Request',
      message: 'Michael Chen requested prescription refill for blood pressure medication',
      time: '3 hours ago',
      read: true,
      priority: 'medium'
    }
  ]);

  // State for appointments and consultations
  const [appointments, setAppointments] = useState({
    upcoming: [],
    rescheduled: [],
    cancelled: [],
    pending: []
  });

  // State for patient notes and messages
  const [patientNotes, setPatientNotes] = useState({});
  const [patientMessages, setPatientMessages] = useState({});

  // State for form validation
  const [formErrors, setFormErrors] = useState({});

  // Mock data for the dashboard
  const dashboardData = {
    appointments: {
      today: 8,
      week: 42,
      month: 156
    },
    consultations: {
      today: 6,
      week: 38,
      month: 142
    },
    rescheduled: {
      today: 2,
      week: 8,
      month: 25
    },
    cancelled: {
      today: 1,
      week: 5,
      month: 18
    },
    recentConsultations: [
      {
        id: 1,
        patientName: 'Sarah Johnson',
        time: '10:30 AM',
        date: '2024-01-15',
        issue: 'Regular checkup and prescription renewal',
        age: 45,
        status: 'completed',
        prescription: 'Medication A, Medication B',
        notes: 'Patient responding well to treatment'
      },
      {
        id: 2,
        patientName: 'Michael Chen',
        time: '11:15 AM',
        date: '2024-01-15',
        issue: 'Follow-up for blood pressure medication',
        age: 62,
        status: 'completed',
        prescription: 'Blood Pressure Meds',
        notes: 'BP under control, continue medication'
      },
      {
        id: 3,
        patientName: 'Emily Rodriguez',
        time: '2:00 PM',
        date: '2024-01-15',
        issue: 'Initial consultation for chronic pain',
        age: 38,
        status: 'completed',
        prescription: 'Pain Management',
        notes: 'Referred to physiotherapy'
      },
      {
        id: 4,
        patientName: 'Robert Williams',
        time: '3:30 PM',
        date: '2024-01-15',
        issue: 'Diabetes management review',
        age: 55,
        status: 'completed',
        prescription: 'Insulin, Diet Plan',
        notes: 'Blood sugar levels improving'
      }
    ],
    upcomingAppointments: [
      {
        id: 5,
        patientName: 'Lisa Thompson',
        time: '10:00 AM',
        date: '2024-01-16',
        issue: 'Annual physical examination',
        age: 42,
        duration: '30 mins',
        type: 'Follow-up',
        priority: 'normal',
        status: 'scheduled'
      },
      {
        id: 6,
        patientName: 'David Miller',
        time: '11:00 AM',
        date: '2024-01-16',
        issue: 'Cardiac follow-up consultation',
        age: 68,
        duration: '45 mins',
        type: 'Specialist',
        priority: 'high',
        status: 'scheduled'
      },
      {
        id: 7,
        patientName: 'Priya Sharma',
        time: '2:30 PM',
        date: '2024-01-16',
        issue: 'Pregnancy checkup',
        age: 29,
        duration: '30 mins',
        type: 'Routine',
        priority: 'normal',
        status: 'scheduled'
      }
    ],
    rescheduledAppointments: [
      {
        id: 8,
        patientName: 'Amit Patel',
        time: '9:00 AM',
        date: '2024-01-15',
        issue: 'Fever and cold',
        age: 35,
        status: 'rescheduled',
        originalDate: '2024-01-14',
        newDate: '2024-01-15',
        reason: 'Patient requested change'
      },
      {
        id: 9,
        patientName: 'Sunita Reddy',
        time: '4:00 PM',
        date: '2024-01-14',
        issue: 'Skin allergy',
        age: 28,
        status: 'rescheduled',
        originalDate: '2024-01-13',
        newDate: '2024-01-14',
        reason: 'Doctor unavailable'
      }
    ],
    cancelledAppointments: [
      {
        id: 10,
        patientName: 'Rajesh Kumar',
        time: '3:00 PM',
        date: '2024-01-17',
        issue: 'General health checkup',
        age: 40,
        status: 'cancelled',
        cancelledDate: '2024-01-15',
        reason: 'Patient emergency'
      },
      {
        id: 11,
        patientName: 'Anita Desai',
        time: '11:30 AM',
        date: '2024-01-18',
        issue: 'Migraine consultation',
        age: 35,
        status: 'cancelled',
        cancelledDate: '2024-01-14',
        reason: 'Doctor cancelled due to emergency'
      }
    ],
    pendingAppointments: [
      {
        id: 12,
        patientName: 'Rahul Verma',
        time: '3:00 PM',
        date: '2024-01-17',
        issue: 'General health checkup',
        age: 40,
        duration: '30 mins',
        type: 'New Patient',
        priority: 'normal',
        status: 'pending',
        requestedDate: '2024-01-15'
      },
      {
        id: 13,
        patientName: 'Neha Gupta',
        time: '11:30 AM',
        date: '2024-01-18',
        issue: 'Migraine consultation',
        age: 35,
        duration: '45 mins',
        type: 'Follow-up',
        priority: 'normal',
        status: 'pending',
        requestedDate: '2024-01-14'
      }
    ],
    patients: [
      {
        id: 1,
        name: 'Sarah Johnson',
        lastVisit: '2024-01-15',
        totalVisits: 12,
        conditions: ['Hypertension', 'Diabetes'],
        phone: '+91 98765 43210',
        email: 'sarah.j@email.com',
        bloodGroup: 'A+',
        emergencyContact: '+91 98765 43211',
        medicalHistory: [
          { date: '2024-01-15', diagnosis: 'Regular checkup', prescription: 'Medication A, Medication B' },
          { date: '2023-12-10', diagnosis: 'Diabetes follow-up', prescription: 'Insulin adjustment' },
          { date: '2023-11-05', diagnosis: 'Hypertension review', prescription: 'Blood pressure medication' }
        ]
      },
      {
        id: 2,
        name: 'Michael Chen',
        lastVisit: '2024-01-15',
        totalVisits: 8,
        conditions: ['High Blood Pressure'],
        phone: '+91 98765 43212',
        email: 'michael.c@email.com',
        bloodGroup: 'B+',
        emergencyContact: '+91 98765 43213',
        medicalHistory: [
          { date: '2024-01-15', diagnosis: 'BP follow-up', prescription: 'Blood Pressure Meds' },
          { date: '2023-12-12', diagnosis: 'Routine checkup', prescription: 'Maintain current medication' }
        ]
      },
      {
        id: 3,
        name: 'Emily Rodriguez',
        lastVisit: '2024-01-15',
        totalVisits: 3,
        conditions: ['Chronic Back Pain'],
        phone: '+91 98765 43214',
        email: 'emily.r@email.com',
        bloodGroup: 'O+',
        emergencyContact: '+91 98765 43215',
        medicalHistory: [
          { date: '2024-01-15', diagnosis: 'Chronic pain consultation', prescription: 'Pain Management' },
          { date: '2023-12-20', diagnosis: 'Back pain assessment', prescription: 'Physiotherapy referral' }
        ]
      },
      {
        id: 4,
        name: 'Robert Williams',
        lastVisit: '2024-01-15',
        totalVisits: 5,
        conditions: ['Diabetes'],
        phone: '+91 98765 43216',
        email: 'robert.w@email.com',
        bloodGroup: 'AB+',
        emergencyContact: '+91 98765 43217',
        medicalHistory: [
          { date: '2024-01-15', diagnosis: 'Diabetes review', prescription: 'Insulin, Diet Plan' },
          { date: '2023-12-08', diagnosis: 'Blood sugar monitoring', prescription: 'Adjust insulin dosage' }
        ]
      },
      {
        id: 5,
        name: 'Priya Sharma',
        lastVisit: '2024-01-14',
        totalVisits: 7,
        conditions: ['Pregnancy', 'Anemia'],
        phone: '+91 98765 43218',
        email: 'priya.s@email.com',
        bloodGroup: 'A+',
        emergencyContact: '+91 98765 43219',
        medicalHistory: [
          { date: '2024-01-14', diagnosis: 'Pregnancy checkup', prescription: 'Prenatal vitamins' },
          { date: '2023-12-28', diagnosis: 'Anemia treatment', prescription: 'Iron supplements' }
        ]
      }
    ],
    earningsHistory: {
      daily: [
        { date: '2024-01-15', amount: 2400, consultations: 6 },
        { date: '2024-01-14', amount: 3200, consultations: 8 },
        { date: '2024-01-13', amount: 2800, consultations: 7 },
        { date: '2024-01-12', amount: 3600, consultations: 9 }
      ],
      weekly: [
        { week: 'Week 2, Jan 2024', amount: 15200, consultations: 38 },
        { week: 'Week 1, Jan 2024', amount: 16800, consultations: 42 },
        { week: 'Week 4, Dec 2023', amount: 14400, consultations: 36 }
      ],
      monthly: [
        { month: 'January 2024', amount: 56800, consultations: 142 },
        { month: 'December 2023', amount: 61200, consultations: 153 },
        { month: 'November 2023', amount: 52400, consultations: 131 }
      ]
    }
  };

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'appointments', label: 'Appointments', icon: '📅' },
    { id: 'patients', label: 'Patients', icon: '👥' },
    { id: 'earnings', label: 'Earnings', icon: '💰' },
    { id: 'messages', label: 'Messages', icon: '💬' }
  ];

  // Initialize with user data and set up appointments
  useEffect(() => {
    // Set appointments from mock data
    setAppointments({
      upcoming: dashboardData.upcomingAppointments,
      rescheduled: dashboardData.rescheduledAppointments,
      cancelled: dashboardData.cancelledAppointments,
      pending: dashboardData.pendingAppointments
    });

    // Initialize with some sample messages
    const initialMessages = {
      'Sarah Johnson': [
        {
          id: 1,
          from: 'patient',
          message: 'Hello Doctor, I wanted to follow up on my prescription.',
          timestamp: '2024-01-15T14:30:00',
          read: true
        },
        {
          id: 2,
          from: 'doctor',
          message: 'Hello Sarah, your prescription has been updated. You can collect it from the pharmacy.',
          timestamp: '2024-01-15T14:35:00',
          read: true
        }
      ],
      'Michael Chen': [
        {
          id: 1,
          from: 'patient',
          message: 'Dr. John, my blood pressure readings have been normal this week.',
          timestamp: '2024-01-15T10:15:00',
          read: true
        }
      ],
      'Emily Rodriguez': [
        {
          id: 1,
          from: 'patient',
          message: 'When should I schedule my next physiotherapy session?',
          timestamp: '2024-01-14T16:20:00',
          read: false
        }
      ]
    };

    setPatientMessages(initialMessages);

    // Request notification permission
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }

    // Simulate real-time notifications
    const notificationInterval = setInterval(() => {
      if (Math.random() < 0.1) {
        simulatePatientApproach();
      }
    }, 30000);

    return () => clearInterval(notificationInterval);
  }, []);

  // Calculate unread messages count
  const getUnreadMessagesCount = () => {
    let count = 0;
    Object.values(patientMessages).forEach(messages => {
      messages.forEach(msg => {
        if (msg.from === 'patient' && !msg.read) {
          count++;
        }
      });
    });
    return count;
  };

  // Calculate unread notifications count
  const getUnreadNotificationsCount = () => {
    return notifications.filter(notification => !notification.read).length;
  };

  // Simulate patient approaching doctor
  const simulatePatientApproach = () => {
    const patients = ['Sarah Johnson', 'Michael Chen', 'Emily Rodriguez', 'Robert Williams', 'Priya Sharma'];
    const randomPatient = patients[Math.floor(Math.random() * patients.length)];
    const issues = ['Urgent consultation needed', 'Prescription refill request', 'Test results discussion', 'Emergency follow-up'];
    const randomIssue = issues[Math.floor(Math.random() * issues.length)];

    // Add new notification
    const newNotification = {
      id: Date.now(),
      type: 'message',
      title: 'New Patient Message',
      message: `${randomPatient}: ${randomIssue}`,
      time: 'Just now',
      read: false,
      priority: 'medium'
    };

    setNotifications(prev => [newNotification, ...prev]);

    // Add the message to the patient's message history
    const newMessage = {
      id: Date.now(),
      from: 'patient',
      message: randomIssue,
      timestamp: new Date().toISOString(),
      read: false
    };

    setPatientMessages(prev => ({
      ...prev,
      [randomPatient]: [...(prev[randomPatient] || []), newMessage]
    }));
  };

  // Notification function
  const showNotification = (title, message) => {
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification(title, { body: message, icon: '/doctor-icon.png' });
    }
    
    console.log(`Notification: ${title} - ${message}`);
  };

  // Filter patients based on search
  const filteredPatients = dashboardData.patients.filter(patient =>
    patient.name.toLowerCase().includes(patientSearch.toLowerCase()) ||
    patient.conditions.some(condition => 
      condition.toLowerCase().includes(patientSearch.toLowerCase())
    )
  );

  // Form validation functions
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

  const validateForm = (formData) => {
    const errors = {};

    if (!validateName(formData.fullName)) {
      errors.fullName = 'Please enter a valid name (letters and spaces only)';
    }

    if (!validateEmail(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!validatePhone(formData.phone)) {
      errors.phone = 'Please enter a valid phone number';
    }

    if (!formData.specialization.trim()) {
      errors.specialization = 'Specialization is required';
    }

    if (!validateLicenseNumber(formData.licenseNumber)) {
      errors.licenseNumber = 'Please enter a valid license number (alphanumeric characters and hyphens only)';
    }

    if (!validateExperience(formData.experience)) {
      errors.experience = 'Please enter valid experience (e.g., "12 years")';
    }

    if (formData.pincode && !validatePincode(formData.pincode)) {
      errors.pincode = 'Please enter a valid 6-digit pincode';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const getCurrentGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const formatIndianCurrency = (amount) => {
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  const openConsultationDetails = (consultation) => {
    setConsultationDetails(consultation);
  };

  const closeConsultationDetails = () => {
    setConsultationDetails(null);
  };

  // Message Management Functions
  const handleSendMessage = (patientName) => {
    if (!newMessage.trim()) return;

    const message = {
      id: Date.now(),
      from: 'doctor',
      message: newMessage,
      timestamp: new Date().toISOString(),
      read: true
    };

    setPatientMessages(prev => ({
      ...prev,
      [patientName]: [...(prev[patientName] || []), message]
    }));

    setNewMessage('');
    showNotification('Message Sent', `Message sent to ${patientName}`);
  };

  const handleMarkAsRead = (patientName) => {
    setPatientMessages(prev => {
      const updatedMessages = { ...prev };
      if (updatedMessages[patientName]) {
        updatedMessages[patientName] = updatedMessages[patientName].map(msg => ({
          ...msg,
          read: true
        }));
      }
      return updatedMessages;
    });
  };

  // FIXED: Added safe patient lookup
  const handleStartConversation = (patient) => {
    if (!patient || !patient.name) {
      console.error('Invalid patient object:', patient);
      return;
    }
    
    setSelectedPatient(patient);
    setShowMessagesModal(true);
    handleMarkAsRead(patient.name);
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

  // Appointment Management Functions
  const handleStartConsultation = (appointmentId) => {
    const appointment = appointments.upcoming.find(apt => apt.id === appointmentId);
    if (appointment) {
      showNotification('Consultation Started', `Starting consultation with ${appointment.patientName}`);
      
      setAppointments(prev => ({
        ...prev,
        upcoming: prev.upcoming.filter(apt => apt.id !== appointmentId)
      }));
      
      sendMessageToPatient(appointment.patientName, `Dr. ${userProfile.fullName} has started your consultation. Please join the consultation room.`);
    }
  };

  const handleRescheduleAppointment = (appointmentId) => {
    const appointment = appointments.upcoming.find(apt => apt.id === appointmentId);
    if (appointment) {
      const newDate = prompt(`Reschedule appointment with ${appointment.patientName}. Enter new date (YYYY-MM-DD):`, appointment.date);
      const newTime = prompt('Enter new time (HH:MM AM/PM):', appointment.time);
      
      if (newDate && newTime) {
        const rescheduledAppointment = {
          ...appointment,
          id: Date.now(),
          originalDate: appointment.date,
          originalTime: appointment.time,
          date: newDate,
          time: newTime,
          status: 'rescheduled',
          reason: 'Doctor rescheduled'
        };

        setAppointments(prev => ({
          ...prev,
          upcoming: prev.upcoming.filter(apt => apt.id !== appointmentId),
          rescheduled: [...prev.rescheduled, rescheduledAppointment]
        }));
        
        showNotification('Appointment Rescheduled', `Appointment with ${appointment.patientName} rescheduled to ${newDate} at ${newTime}`);
        
        sendMessageToPatient(appointment.patientName, `Your appointment with Dr. ${userProfile.fullName} has been rescheduled to ${newDate} at ${newTime}.`);
      }
    }
  };

  const handleCancelAppointment = (appointmentId) => {
    const appointment = appointments.upcoming.find(apt => apt.id === appointmentId);
    if (appointment && window.confirm(`Are you sure you want to cancel the appointment with ${appointment.patientName}?`)) {
      const cancelledAppointment = {
        ...appointment,
        status: 'cancelled',
        cancelledDate: new Date().toISOString().split('T')[0],
        reason: 'Doctor cancelled'
      };

      setAppointments(prev => ({
        ...prev,
        upcoming: prev.upcoming.filter(apt => apt.id !== appointmentId),
        cancelled: [...prev.cancelled, cancelledAppointment]
      }));
      
      showNotification('Appointment Cancelled', `Appointment with ${appointment.patientName} has been cancelled`);
      
      sendMessageToPatient(appointment.patientName, `Your appointment with Dr. ${userProfile.fullName} has been cancelled. Please contact the clinic to reschedule.`);
    }
  };

  const handleApproveAppointment = (appointmentId) => {
    const appointment = appointments.pending.find(apt => apt.id === appointmentId);
    if (appointment) {
      setAppointments(prev => ({
        ...prev,
        pending: prev.pending.filter(apt => apt.id !== appointmentId),
        upcoming: [...prev.upcoming, { ...appointment, status: 'scheduled' }]
      }));
      
      showNotification('Appointment Approved', `Appointment with ${appointment.patientName} has been approved`);
      
      sendMessageToPatient(appointment.patientName, `Your appointment with Dr. ${userProfile.fullName} on ${appointment.date} at ${appointment.time} has been approved.`);
    }
  };

  const handleRejectAppointment = (appointmentId) => {
    const appointment = appointments.pending.find(apt => apt.id === appointmentId);
    if (appointment && window.confirm(`Are you sure you want to reject the appointment request from ${appointment.patientName}?`)) {
      setAppointments(prev => ({
        ...prev,
        pending: prev.pending.filter(apt => apt.id !== appointmentId)
      }));
      
      showNotification('Appointment Rejected', `Appointment request from ${appointment.patientName} has been rejected`);
      
      sendMessageToPatient(appointment.patientName, `Your appointment request with Dr. ${userProfile.fullName} has been rejected. Please contact the clinic for alternative options.`);
    }
  };

  const sendMessageToPatient = (patientName, message) => {
    console.log(`Message sent to ${patientName}: ${message}`);
    const newMsg = {
      id: Date.now(),
      from: 'doctor',
      message: message,
      timestamp: new Date().toISOString(),
      read: true
    };

    setPatientMessages(prev => ({
      ...prev,
      [patientName]: [...(prev[patientName] || []), newMsg]
    }));
  };

  const handleAddNotes = (patientName) => {
    const notes = prompt(`Add notes for ${patientName}:`, patientNotes[patientName] || '');
    if (notes !== null) {
      setPatientNotes(prev => ({
        ...prev,
        [patientName]: notes
      }));
      showNotification('Notes Added', `Notes updated for ${patientName}`);
    }
  };

  const handleViewFullHistory = (patientName) => {
    const patient = dashboardData.patients.find(p => p.name === patientName);
    if (patient) {
      const historyWindow = window.open('', '_blank');
      historyWindow.document.write(`
        <html>
          <head>
            <title>Medical History - ${patientName}</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 20px; }
              .header { border-bottom: 2px solid #7C2A62; padding-bottom: 10px; margin-bottom: 20px; }
              .history-item { border: 1px solid #ddd; padding: 15px; margin-bottom: 10px; border-radius: 5px; }
              .diagnosis { font-weight: bold; color: #7C2A62; }
              .prescription { color: #2d5016; }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>Medical History - ${patientName}</h1>
              <p><strong>Age:</strong> ${patient.age} | <strong>Blood Group:</strong> ${patient.bloodGroup}</p>
              <p><strong>Conditions:</strong> ${patient.conditions.join(', ')}</p>
            </div>
            <h2>Medical Records</h2>
            ${patient.medicalHistory.map(record => `
              <div class="history-item">
                <p><strong>Date:</strong> ${record.date}</p>
                <p class="diagnosis">Diagnosis: ${record.diagnosis}</p>
                <p class="prescription">Prescription: ${record.prescription}</p>
              </div>
            `).join('')}
          </body>
        </html>
      `);
      historyWindow.document.close();
    }
  };

  // Profile Management Functions
  const handleProfileUpdate = (updatedProfile) => {
    if (!validateForm(updatedProfile)) {
      return;
    }
    
    setUserProfile(updatedProfile);
    
    if (user && typeof user === 'object') {
      Object.assign(user, updatedProfile);
    }
    
    setShowProfileModal(false);
    setFormErrors({});
    showNotification('Profile Updated', 'Your profile has been updated successfully');
  };

  // Notification Management Functions
  const handleMarkNotificationAsRead = (notificationId) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === notificationId
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const handleMarkAllNotificationsAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const handleClearAllNotifications = () => {
    setNotifications([]);
  };

  // Logout Confirmation Modal
  const LogoutConfirmationModal = () => (
    <div style={styles.modalOverlay}>
      <div style={styles.confirmModal}>
        <div style={styles.confirmModalHeader}>
          {/* <div style={styles.confirmIcon}>🚪</div> */}
          <h3 style={styles.confirmModalTitle}>Confirm Logout</h3>
        </div>
        <div style={styles.confirmModalContent}>
          <p style={styles.confirmationText}>
            Are you sure you want to logout from your account?
          </p>
        </div>
        <div style={styles.confirmModalActions}>
          <button 
            style={styles.confirmCancelButton}
            onClick={() => setShowLogoutConfirm(false)}
          >
            Cancel
          </button>
          <button 
            style={styles.confirmLogoutButton}
            onClick={onLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );

  // Profile Modal Component
  const ProfileModal = () => {
    const [formData, setFormData] = useState({...userProfile});

    const handleInputChange = (field, value) => {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
      
      if (formErrors[field]) {
        setFormErrors(prev => ({
          ...prev,
          [field]: ''
        }));
      }
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

    const handleSubmit = (e) => {
      e.preventDefault();
      handleProfileUpdate(formData);
    };

    return (
      <div style={styles.modalOverlay}>
        <div style={styles.modal}>
          <div style={styles.modalHeader}>
            <h3 style={styles.modalTitle}>Edit Profile</h3>
            <button 
              style={styles.closeButton}
              onClick={() => {
                setShowProfileModal(false);
                setFormErrors({});
              }}
            >
              ✕
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div style={styles.modalContent}>
              <div style={styles.formGrid}>
                <div style={styles.formRow}>
                  <label style={styles.label}>Full Name *</label>
                  <input
                    type="text"
                    style={{
                      ...styles.input,
                      ...(formErrors.fullName ? styles.inputError : {})
                    }}
                    value={formData.fullName}
                    onChange={(e) => handleNameChange(e.target.value)}
                    placeholder="Enter your full name"
                    readOnly
                  />
                  <span style={styles.readOnlyNote}>Name cannot be changed</span>
                  {formErrors.fullName && <span style={styles.errorText}>{formErrors.fullName}</span>}
                </div>
                <div style={styles.formRow}>
                  <label style={styles.label}>Email *</label>
                  <input
                    type="email"
                    style={{
                      ...styles.input,
                      ...(formErrors.email ? styles.inputError : {})
                    }}
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="Enter your email"
                    readOnly
                  />
                  <span style={styles.readOnlyNote}>Email cannot be changed</span>
                  {formErrors.email && <span style={styles.errorText}>{formErrors.email}</span>}
                </div>
              </div>
              <div style={styles.formGrid}>
                <div style={styles.formRow}>
                  <label style={styles.label}>Phone *</label>
                  <input
                    type="tel"
                    style={{
                      ...styles.input,
                      ...(formErrors.phone ? styles.inputError : {})
                    }}
                    value={formData.phone}
                    onChange={(e) => handlePhoneChange(e.target.value)}
                    placeholder="Enter your phone number"
                  />
                  {formErrors.phone && <span style={styles.errorText}>{formErrors.phone}</span>}
                </div>
                <div style={styles.formRow}>
                  <label style={styles.label}>Specialization *</label>
                  <input
                    type="text"
                    style={{
                      ...styles.input,
                      ...(formErrors.specialization ? styles.inputError : {})
                    }}
                    value={formData.specialization}
                    onChange={(e) => handleInputChange('specialization', e.target.value)}
                    placeholder="Enter your specialization"
                  />
                  {formErrors.specialization && <span style={styles.errorText}>{formErrors.specialization}</span>}
                </div>
              </div>
              <div style={styles.formGrid}>
                <div style={styles.formRow}>
                  <label style={styles.label}>License Number *</label>
                  <input
                    type="text"
                    style={{
                      ...styles.input,
                      ...(formErrors.licenseNumber ? styles.inputError : {})
                    }}
                    value={formData.licenseNumber}
                    onChange={(e) => handleLicenseChange(e.target.value)}
                    placeholder="Enter license number"
                  />
                  {formErrors.licenseNumber && <span style={styles.errorText}>{formErrors.licenseNumber}</span>}
                </div>
                <div style={styles.formRow}>
                  <label style={styles.label}>Experience *</label>
                  <input
                    type="text"
                    style={{
                      ...styles.input,
                      ...(formErrors.experience ? styles.inputError : {})
                    }}
                    value={formData.experience}
                    onChange={(e) => handleExperienceChange(e.target.value)}
                    placeholder="Enter years of experience (e.g., 12 years)"
                  />
                  {formErrors.experience && <span style={styles.errorText}>{formErrors.experience}</span>}
                </div>
              </div>
              <div style={styles.formRow}>
                <label style={styles.label}>Hospital/Clinic</label>
                <input
                  type="text"
                  style={styles.input}
                  value={formData.hospital}
                  onChange={(e) => handleInputChange('hospital', e.target.value)}
                  placeholder="Enter hospital or clinic name"
                />
              </div>
              <div style={styles.formRow}>
                <label style={styles.label}>Address</label>
                <input
                  type="text"
                  style={styles.input}
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder="Enter complete address"
                />
              </div>
              <div style={styles.formGrid}>
                <div style={styles.formRow}>
                  <label style={styles.label}>City</label>
                  <input
                    type="text"
                    style={styles.input}
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    placeholder="Enter city"
                  />
                </div>
                <div style={styles.formRow}>
                  <label style={styles.label}>State</label>
                  <input
                    type="text"
                    style={styles.input}
                    value={formData.state}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                    placeholder="Enter state"
                  />
                </div>
                <div style={styles.formRow}>
                  <label style={styles.label}>Pincode</label>
                  <input
                    type="text"
                    style={{
                      ...styles.input,
                      ...(formErrors.pincode ? styles.inputError : {})
                    }}
                    value={formData.pincode}
                    onChange={(e) => handlePincodeChange(e.target.value)}
                    placeholder="Enter 6-digit pincode"
                    maxLength="6"
                  />
                  {formErrors.pincode && <span style={styles.errorText}>{formErrors.pincode}</span>}
                </div>
              </div>
            </div>
            <div style={styles.modalActions}>
              <button 
                type="button"
                style={styles.secondaryButton}
                onClick={() => {
                  setShowProfileModal(false);
                  setFormErrors({});
                }}
              >
                Cancel
              </button>
              <button 
                type="submit"
                style={styles.primaryButton}
              >
                Update Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  // Notifications Modal Component - Updated to show messages
  const NotificationsModal = () => (
    <div style={styles.modalOverlay}>
      <div style={{...styles.modal, width: '90%', maxWidth: '600px'}}>
        <div style={styles.modalHeader}>
          <h3 style={styles.modalTitle}>Notifications</h3>
          <div style={styles.notificationActions}>
            <button 
              style={styles.smallButton}
              onClick={handleMarkAllNotificationsAsRead}
            >
              Mark All Read
            </button>
            <button 
              style={styles.smallButton}
              onClick={handleClearAllNotifications}
            >
              Clear All
            </button>
            <button 
              style={styles.closeButton}
              onClick={() => setShowNotificationsModal(false)}
            >
              ✕
            </button>
          </div>
        </div>
        <div style={styles.modalContent}>
          {notifications.length === 0 ? (
            <div style={styles.noNotifications}>
              <div style={styles.noNotificationsIcon}>🔔</div>
              <h4 style={styles.noNotificationsTitle}>No Notifications</h4>
              <p style={styles.noNotificationsText}>
                You're all caught up! New notifications will appear here.
              </p>
            </div>
          ) : (
            <div style={styles.notificationsList}>
              {notifications.map(notification => (
                <div
                  key={notification.id}
                  style={{
                    ...styles.notificationItem,
                    ...(!notification.read ? styles.unreadNotification : {})
                  }}
                  onClick={() => handleMarkNotificationAsRead(notification.id)}
                >
                  <div style={styles.notificationIcon}>
                    {notification.type === 'appointment' && '📅'}
                    {notification.type === 'message' && '💬'}
                    {notification.type === 'reminder' && '⏰'}
                    {notification.type === 'system' && '🔧'}
                    {notification.type === 'prescription' && '💊'}
                  </div>
                  <div style={styles.notificationContent}>
                    <div style={styles.notificationHeader}>
                      <h4 style={styles.notificationTitle}>{notification.title}</h4>
                      <span style={styles.notificationTime}>{notification.time}</span>
                    </div>
                    <p style={styles.notificationMessage}>{notification.message}</p>
                    <div style={{
                      ...styles.priorityIndicator,
                      ...(notification.priority === 'high' ? styles.highPriority : {}),
                      ...(notification.priority === 'medium' ? styles.mediumPriority : {}),
                      ...(notification.priority === 'low' ? styles.lowPriority : {})
                    }}>
                      {notification.priority}
                    </div>
                  </div>
                  {!notification.read && (
                    <div style={styles.unreadDot}></div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // Messages Modal Component - Fixed with proper state management
  const MessagesModal = () => {
    const [activeConversation, setActiveConversation] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [localNewMessage, setLocalNewMessage] = useState('');

    const conversations = Object.entries(patientMessages)
      .filter(([patientName]) => 
        patientName.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .map(([patientName, messages]) => {
        const lastMessage = messages[messages.length - 1];
        const unreadCount = messages.filter(msg => msg.from === 'patient' && !msg.read).length;
        const patient = dashboardData.patients.find(p => p.name === patientName);

        return {
          patientName,
          patient,
          lastMessage,
          unreadCount,
          timestamp: lastMessage.timestamp
        };
      })
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    const filteredConversations = activeConversation === 'unread' 
      ? conversations.filter(conv => conv.unreadCount > 0)
      : conversations;

    const handleSendLocalMessage = (patientName) => {
      if (!localNewMessage.trim()) return;

      const message = {
        id: Date.now(),
        from: 'doctor',
        message: localNewMessage,
        timestamp: new Date().toISOString(),
        read: true
      };

      setPatientMessages(prev => ({
        ...prev,
        [patientName]: [...(prev[patientName] || []), message]
      }));

      setLocalNewMessage('');
      showNotification('Message Sent', `Message sent to ${patientName}`);
    };

    if (!showMessagesModal) return null;

    return (
      <div style={styles.modalOverlay}>
        <div style={{...styles.modal, width: '90%', maxWidth: '1000px', height: '80vh'}}>
          <div style={styles.modalHeader}>
            <h3 style={styles.modalTitle}>Patient Messages</h3>
            <button 
              style={styles.closeButton}
              onClick={() => setShowMessagesModal(false)}
            >
              ✕
            </button>
          </div>
          
          <div style={styles.messagesContainer}>
            {/* Conversations Sidebar */}
            <div style={styles.conversationsSidebar}>
              <div style={styles.conversationsHeader}>
                <div style={styles.searchContainer}>
                  <input
                    type="text"
                    placeholder="Search patients..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={styles.searchInput}
                  />
                </div>
                <div style={styles.conversationFilters}>
                  <button
                    style={{
                      ...styles.conversationFilter,
                      ...(activeConversation === 'all' ? styles.conversationFilterActive : {})
                    }}
                    onClick={() => setActiveConversation('all')}
                  >
                    All
                  </button>
                  <button
                    style={{
                      ...styles.conversationFilter,
                      ...(activeConversation === 'unread' ? styles.conversationFilterActive : {})
                    }}
                    onClick={() => setActiveConversation('unread')}
                  >
                    Unread
                  </button>
                </div>
              </div>

              <div style={styles.conversationsList}>
                {filteredConversations.map(conversation => (
                  <div
                    key={conversation.patientName}
                    style={{
                      ...styles.conversationItem,
                      ...(selectedPatient?.name === conversation.patientName ? styles.conversationItemActive : {})
                    }}
                    onClick={() => {
                      setSelectedPatient(conversation.patient);
                      handleMarkAsRead(conversation.patientName);
                    }}
                  >
                    <div style={styles.conversationAvatar}>
                      👤
                      {conversation.unreadCount > 0 && (
                        <span style={styles.unreadBadge}>
                          {conversation.unreadCount}
                        </span>
                      )}
                    </div>
                    <div style={styles.conversationInfo}>
                      <div style={styles.conversationHeader}>
                        <h4 style={styles.conversationName}>{conversation.patientName}</h4>
                        <span style={styles.conversationTime}>
                          {formatMessageTime(conversation.timestamp)}
                        </span>
                      </div>
                      <p style={styles.conversationPreview}>
                        {conversation.lastMessage.message}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat Area */}
            <div style={styles.chatArea}>
              {selectedPatient ? (
                <>
                  <div style={styles.chatHeader}>
                    <div style={styles.chatPatientInfo}>
                      <div style={styles.chatAvatar}>👤</div>
                      <div>
                        <h4 style={styles.chatPatientName}>{selectedPatient.name}</h4>
                        <p style={styles.chatPatientDetails}>
                          {selectedPatient.conditions.join(', ')} • Last visit: {selectedPatient.lastVisit}
                        </p>
                      </div>
                    </div>
                    <div style={styles.chatActions}>
                      <button 
                        style={styles.secondaryButton}
                        onClick={() => handleViewFullHistory(selectedPatient.name)}
                      >
                        View History
                      </button>
                      <button 
                        style={styles.secondaryButton}
                        onClick={() => handleAddNotes(selectedPatient.name)}
                      >
                        Add Notes
                      </button>
                    </div>
                  </div>

                  <div style={styles.messagesList}>
                    {patientMessages[selectedPatient.name]?.map(message => (
                      <div
                        key={message.id}
                        style={{
                          ...styles.messageBubble,
                          ...(message.from === 'doctor' ? styles.messageBubbleRight : styles.messageBubbleLeft)
                        }}
                      >
                        <div style={{
                          ...styles.messageContent,
                          ...(message.from === 'doctor' && styles.messageBubbleRightMessageContent)
                        }}>
                          <p style={styles.messageText}>{message.message}</p>
                          <span style={styles.messageTime}>
                            {formatMessageTime(message.timestamp)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div style={styles.messageInputContainer}>
                    <input
                      type="text"
                      placeholder="Type your message..."
                      value={localNewMessage}
                      onChange={(e) => setLocalNewMessage(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleSendLocalMessage(selectedPatient.name);
                        }
                      }}
                      style={styles.messageInput}
                    />
                    <button
                      style={{
                        ...styles.sendButton,
                        ...(!localNewMessage.trim() ? styles.sendButtonDisabled : {})
                      }}
                      onClick={() => handleSendLocalMessage(selectedPatient.name)}
                      disabled={!localNewMessage.trim()}
                    >
                      Send
                    </button>
                  </div>
                </>
              ) : (
                <div style={styles.noConversation}>
                  <div style={styles.noConversationIcon}>💬</div>
                  <h3 style={styles.noConversationTitle}>Select a conversation</h3>
                  <p style={styles.noConversationText}>
                    Choose a patient from the list to start messaging
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderDashboard = () => (
    <div style={styles.mainContent}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.greeting}>{getCurrentGreeting()}, Dr. {userProfile.fullName?.split(' ')[0]}</h1>
          <p style={styles.subtitle}>Here's your daily overview and schedule</p>
        </div>
        <div style={styles.headerActions}>
          <div style={styles.dateDisplay}>
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </div>
          <button 
            style={styles.notificationBell}
            onClick={() => setShowNotificationsModal(true)}
          >
            🔔
            {getUnreadNotificationsCount() > 0 && (
              <span style={styles.notificationBadge}>
                {getUnreadNotificationsCount()}
              </span>
            )}
          </button>
        </div>
      </div>

      <div style={styles.analyticsGrid}>
        <div style={styles.analyticsCard}>
          <div style={{...styles.analyticsIcon, backgroundColor: '#F7D9EB'}}>📅</div>
          <div style={styles.analyticsContent}>
            <h3 style={styles.analyticsNumber}>
              {timeRange === 'today' ? dashboardData.appointments.today :
               timeRange === 'week' ? dashboardData.appointments.week :
               dashboardData.appointments.month}
            </h3>
            <p style={styles.analyticsLabel}>Total Appointments</p>
          </div>
        </div>

        <div style={styles.analyticsCard}>
          <div style={{...styles.analyticsIcon, backgroundColor: '#E8F4FD'}}>🩺</div>
          <div style={styles.analyticsContent}>
            <h3 style={styles.analyticsNumber}>
              {timeRange === 'today' ? dashboardData.consultations.today :
               timeRange === 'week' ? dashboardData.consultations.week :
               dashboardData.consultations.month}
            </h3>
            <p style={styles.analyticsLabel}>Consultations Completed</p>
          </div>
        </div>

        <div style={styles.analyticsCard}>
          <div style={{...styles.analyticsIcon, backgroundColor: '#FFF4E6'}}>🔄</div>
          <div style={styles.analyticsContent}>
            <h3 style={styles.analyticsNumber}>
              {timeRange === 'today' ? dashboardData.rescheduled.today :
               timeRange === 'week' ? dashboardData.rescheduled.week :
               dashboardData.rescheduled.month}
            </h3>
            <p style={styles.analyticsLabel}>Rescheduled</p>
          </div>
        </div>

        <div style={styles.analyticsCard}>
          <div style={{...styles.analyticsIcon, backgroundColor: '#FFE6E6'}}>❌</div>
          <div style={styles.analyticsContent}>
            <h3 style={styles.analyticsNumber}>
              {timeRange === 'today' ? dashboardData.cancelled.today :
               timeRange === 'week' ? dashboardData.cancelled.week :
               dashboardData.cancelled.month}
            </h3>
            <p style={styles.analyticsLabel}>Cancelled</p>
          </div>
        </div>

        <div style={styles.timeRangeSelector}>
          <button
            style={{
              ...styles.timeRangeButton,
              ...(timeRange === 'today' ? styles.timeRangeButtonActive : {})
            }}
            onClick={() => setTimeRange('today')}
          >
            Today
          </button>
          <button
            style={{
              ...styles.timeRangeButton,
              ...(timeRange === 'week' ? styles.timeRangeButtonActive : {})
            }}
            onClick={() => setTimeRange('week')}
          >
            This Week
          </button>
          <button
            style={{
              ...styles.timeRangeButton,
              ...(timeRange === 'month' ? styles.timeRangeButtonActive : {})
            }}
            onClick={() => setTimeRange('month')}
          >
            This Month
          </button>
        </div>
      </div>

      <div style={styles.contentGrid}>
        <div style={styles.section}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>Recent Patient Consultations</h2>
            <span style={styles.viewAll}>View All</span>
          </div>
          <div style={styles.consultationsList}>
            {dashboardData.recentConsultations.map(consultation => (
              <div key={consultation.id} style={styles.consultationCard}>
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
                    onClick={() => openConsultationDetails(consultation)}
                  >
                    View Details
                  </button>
                  <button
                    style={styles.secondaryButton}
                    onClick={() => {
                      // FIXED: Safe patient lookup
                      const patient = dashboardData.patients.find(p => p.name === consultation.patientName);
                      if (patient) {
                        handleStartConversation(patient);
                      } else {
                        console.warn(`Patient not found: ${consultation.patientName}`);
                      }
                    }}
                  >
                    Message
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={styles.sidebarSection}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>Upcoming Appointment</h2>
          </div>
          {appointments.upcoming.slice(0, 1).map(appointment => (
            <div key={appointment.id} style={styles.upcomingCard}>
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
                  style={styles.secondaryButton}
                  onClick={() => handleRescheduleAppointment(appointment.id)}
                >
                  Reschedule
                </button>
              </div>
            </div>
          ))}

          <div style={styles.moreAppointments}>
            <h4 style={styles.moreAppointmentsTitle}>More Appointments Today</h4>
            {appointments.upcoming.slice(1).map(appointment => (
              <div key={appointment.id} style={styles.smallAppointmentCard}>
                <div style={styles.smallAppointmentInfo}>
                  <span style={styles.smallAppointmentTime}>{appointment.time}</span>
                  <span style={styles.smallAppointmentName}>{appointment.patientName}</span>
                </div>
                <span style={{
                  ...styles.smallAppointmentDuration,
                  ...(appointment.priority === 'high' ? styles.highPriority : {})
                }}>
                  {appointment.duration}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderAppointments = () => (
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
              ...(appointmentFilter === 'pending' ? styles.filterTabActive : {})
            }}
            onClick={() => setAppointmentFilter('pending')}
          >
            Pending ({appointments.pending.length})
          </button>
          <button
            style={{
              ...styles.filterTab,
              ...(appointmentFilter === 'upcoming' ? styles.filterTabActive : {})
            }}
            onClick={() => setAppointmentFilter('upcoming')}
          >
            Upcoming
          </button>
          <button
            style={{
              ...styles.filterTab,
              ...(appointmentFilter === 'rescheduled' ? styles.filterTabActive : {})
            }}
            onClick={() => setAppointmentFilter('rescheduled')}
          >
            Rescheduled
          </button>
          <button
            style={{
              ...styles.filterTab,
              ...(appointmentFilter === 'cancelled' ? styles.filterTabActive : {})
            }}
            onClick={() => setAppointmentFilter('cancelled')}
          >
            Cancelled
          </button>
        </div>
      </div>

      <div style={styles.appointmentsContainer}>
        {(appointmentFilter === 'pending' ? appointments.pending : 
          appointmentFilter === 'upcoming' ? appointments.upcoming : 
          appointmentFilter === 'rescheduled' ? appointments.rescheduled :
          appointments.cancelled).map(appointment => (
          <div key={appointment.id} style={styles.appointmentCard}>
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
                {appointmentFilter === 'pending' && (
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
                  ...(appointment.priority === 'high' ? styles.highPriorityBadge : {})
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
                      // FIXED: Safe patient lookup
                      const patient = dashboardData.patients.find(p => p.name === appointment.patientName);
                      if (patient) {
                        handleStartConversation(patient);
                      } else {
                        console.warn(`Patient not found: ${appointment.patientName}`);
                      }
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
                      // FIXED: Safe patient lookup
                      const patient = dashboardData.patients.find(p => p.name === appointment.patientName);
                      if (patient) {
                        handleStartConversation(patient);
                      } else {
                        console.warn(`Patient not found: ${appointment.patientName}`);
                      }
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
                      // FIXED: Safe patient lookup
                      const patient = dashboardData.patients.find(p => p.name === appointment.patientName);
                      if (patient) {
                        handleStartConversation(patient);
                      } else {
                        console.warn(`Patient not found: ${appointment.patientName}`);
                      }
                    }}
                  >
                    Message
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPatients = () => (
    <div style={styles.mainContent}>
      <div style={styles.header}>
        <div>
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

      <div style={styles.patientsGrid}>
        {filteredPatients.map(patient => (
          <div key={patient.id} style={styles.patientCard}>
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
                style={styles.primaryButton}
                onClick={() => handleViewFullHistory(patient.name)}
              >
                View Full History
              </button>
              <button 
                style={styles.secondaryButton}
                onClick={() => handleAddNotes(patient.name)}
              >
                Add Notes
              </button>
              <button 
                style={styles.secondaryButton}
                onClick={() => handleStartConversation(patient)}
              >
                Message
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderEarnings = () => (
    <div style={styles.mainContent}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.greeting}>Earnings</h1>
          <p style={styles.subtitle}>Consultation fee logs and payouts overview</p>
        </div>
        <div style={styles.earningFilters}>
          <button
            style={{
              ...styles.earningFilter,
              ...(earningFilter === 'daily' ? styles.earningFilterActive : {})
            }}
            onClick={() => setEarningFilter('daily')}
          >
            Daily
          </button>
          <button
            style={{
              ...styles.earningFilter,
              ...(earningFilter === 'weekly' ? styles.earningFilterActive : {})
            }}
            onClick={() => setEarningFilter('weekly')}
          >
            Weekly
          </button>
          <button
            style={{
              ...styles.earningFilter,
              ...(earningFilter === 'monthly' ? styles.earningFilterActive : {})
            }}
            onClick={() => setEarningFilter('monthly')}
          >
            Monthly
          </button>
        </div>
      </div>

      <div style={styles.earningsSummary}>
        <div style={styles.earningStats}>
          <div style={styles.earningStat}>
            <h3 style={styles.earningAmount}>
              {formatIndianCurrency(
                earningFilter === 'daily' ? 2400 :
                earningFilter === 'weekly' ? 15200 :
                56800
              )}
            </h3>
            <p style={styles.earningLabel}>Total Earnings</p>
          </div>
          <div style={styles.earningStat}>
            <h3 style={styles.earningAmount}>
              {earningFilter === 'daily' ? 6 :
               earningFilter === 'weekly' ? 38 :
               142}
            </h3>
            <p style={styles.earningLabel}>Consultations</p>
          </div>
          <div style={styles.earningStat}>
            <h3 style={styles.earningAmount}>
              {formatIndianCurrency(
                earningFilter === 'daily' ? 400 :
                earningFilter === 'weekly' ? 400 :
                400
              )}
            </h3>
            <p style={styles.earningLabel}>Average per Consultation</p>
          </div>
        </div>
      </div>

      <div style={styles.earningsHistory}>
        <h3 style={styles.sectionTitle}>Earnings History</h3>
        <div style={styles.earningsList}>
          {dashboardData.earningsHistory[earningFilter].map((earning, index) => (
            <div key={index} style={styles.earningItem}>
              <div style={styles.earningDate}>
                <strong>{earning.date || earning.week || earning.month}</strong>
                <span>{earning.consultations} consultations</span>
              </div>
              <div style={styles.earningAmount}>
                {formatIndianCurrency(earning.amount)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderMessages = () => (
    <div style={styles.mainContent}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.greeting}>Messages</h1>
          <p style={styles.subtitle}>Communicate with your patients</p>
        </div>
        <div style={styles.messagesStats}>
          <div style={styles.messageStat}>
            <span style={styles.messageStatNumber}>{getUnreadMessagesCount()}</span>
            <span style={styles.messageStatLabel}>Unread Messages</span>
          </div>
          <div style={styles.messageStat}>
            <span style={styles.messageStatNumber}>{Object.keys(patientMessages).length}</span>
            <span style={styles.messageStatLabel}>Active Conversations</span>
          </div>
        </div>
      </div>

      <div style={styles.messagesOverview}>
        <div style={styles.conversationsGrid}>
          {Object.entries(patientMessages)
            .sort(([, messagesA], [, messagesB]) => 
              new Date(messagesB[messagesB.length - 1].timestamp) - new Date(messagesA[messagesA.length - 1].timestamp)
            )
            .map(([patientName, messages]) => {
              const lastMessage = messages[messages.length - 1];
              const unreadCount = messages.filter(msg => msg.from === 'patient' && !msg.read).length;
              const patient = dashboardData.patients.find(p => p.name === patientName);

              return (
                <div key={patientName} style={styles.conversationCard}>
                  <div style={styles.conversationCardHeader}>
                    <div style={styles.conversationCardAvatar}>
                      👤
                      {unreadCount > 0 && (
                        <span style={styles.unreadBadge}>
                          {unreadCount}
                        </span>
                      )}
                    </div>
                    <div style={styles.conversationCardInfo}>
                      <h4 style={styles.conversationCardName}>{patientName}</h4>
                      <p style={styles.conversationCardLastMessage}>
                        {lastMessage.message}
                      </p>
                    </div>
                    <span style={styles.conversationCardTime}>
                      {formatMessageTime(lastMessage.timestamp)}
                    </span>
                  </div>
                  <div style={styles.conversationCardActions}>
                    <button 
                      style={styles.primaryButton}
                      onClick={() => {
                        if (patient) {
                          handleStartConversation(patient);
                        } else {
                          console.warn(`Patient not found: ${patientName}`);
                        }
                      }}
                    >
                      Open Chat
                    </button>
                    <button 
                      style={styles.secondaryButton}
                      onClick={() => handleViewFullHistory(patientName)}
                    >
                      View History
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );

  const renderMainContent = () => {
    switch (activePage) {
      case 'dashboard':
        return renderDashboard();
      case 'appointments':
        return renderAppointments();
      case 'patients':
        return renderPatients();
      case 'earnings':
        return renderEarnings();
      case 'messages':
        return renderMessages();
      default:
        return renderDashboard();
    }
  };

  return (
    <div style={styles.container}>
      {/* Sidebar Navigation */}
      <div style={styles.sidebar}>
        <div style={styles.sidebarHeader}>
          <h1 style={styles.logo}>QUICKMED</h1>
          <p style={styles.doctorTitle}>Doctor Portal</p>
        </div>
        
        <nav style={styles.navigation}>
          {navigationItems.map(item => (
            <button
              key={item.id}
              style={{
                ...styles.navButton,
                ...(activePage === item.id ? styles.navButtonActive : {})
              }}
              onClick={() => setActivePage(item.id)}
            >
              <span style={styles.navIcon}>{item.icon}</span>
              <span style={styles.navLabel}>{item.label}</span>
              {item.id === 'messages' && getUnreadMessagesCount() > 0 && (
                <span style={styles.navBadge}>{getUnreadMessagesCount()}</span>
              )}
            </button>
          ))}
        </nav>

        {/* User Profile Section */}
        <div style={styles.profileSection}>
          <div style={styles.userInfo}>
            <div style={styles.userAvatar}>👨‍⚕️</div>
            <div style={styles.userDetails}>
              <p style={styles.userName}>Dr. {userProfile.fullName}</p>
              <p style={styles.userEmail}>{userProfile.email}</p>
              <p style={styles.userSpecialization}>{userProfile.specialization}</p>
            </div>
          </div>
          <div style={styles.profileActions}>
            <button 
              style={styles.profileButton}
              onClick={() => setShowProfileModal(true)}
            >
              Edit Profile
            </button>
          </div>
        </div>

        <div style={styles.sidebarFooter}>
          <button 
            style={styles.logoutButton} 
            onClick={() => setShowLogoutConfirm(true)}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div style={styles.content}>
        {renderMainContent()}
      </div>

      {/* Consultation Details Modal */}
      {consultationDetails && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <div style={styles.modalHeader}>
              <h2>Consultation Details</h2>
              <button style={styles.closeButton} onClick={closeConsultationDetails}>
                ✕
              </button>
            </div>
            <div style={styles.modalContent}>
              <div style={styles.patientInfoModal}>
                <div style={styles.profileIconLarge}>👤</div>
                <div>
                  <h3 style={styles.modalPatientName}>{consultationDetails.patientName}</h3>
                  <p style={styles.modalPatientAge}>Age: {consultationDetails.age}</p>
                </div>
              </div>
              <div style={styles.modalDetails}>
                <div style={styles.modalDetailItem}>
                  <strong>Date & Time:</strong> {consultationDetails.date} at {consultationDetails.time}
                </div>
                <div style={styles.modalDetailItem}>
                  <strong>Reason for Visit:</strong> {consultationDetails.issue}
                </div>
                <div style={styles.modalDetailItem}>
                  <strong>Status:</strong> {consultationDetails.status}
                </div>
                {consultationDetails.prescription && (
                  <div style={styles.modalDetailItem}>
                    <strong>Prescription:</strong> {consultationDetails.prescription}
                  </div>
                )}
                {consultationDetails.notes && (
                  <div style={styles.modalDetailItem}>
                    <strong>Doctor Notes:</strong> {consultationDetails.notes}
                  </div>
                )}
              </div>
              <div style={styles.modalActions}>
                <button 
                  style={styles.primaryButton}
                  onClick={() => handleViewFullHistory(consultationDetails.patientName)}
                >
                  View Full History
                </button>
                <button 
                  style={styles.secondaryButton}
                  onClick={() => handleAddNotes(consultationDetails.patientName)}
                >
                  Add Notes
                </button>
                <button 
                  style={styles.secondaryButton}
                  onClick={() => {
                    // FIXED: Safe patient lookup
                    const patient = dashboardData.patients.find(p => p.name === consultationDetails.patientName);
                    if (patient) {
                      handleStartConversation(patient);
                    } else {
                      console.warn(`Patient not found: ${consultationDetails.patientName}`);
                    }
                  }}
                >
                  Message Patient
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Profile, Notifications, and Messages Modals */}
      {showProfileModal && <ProfileModal />}
      {showNotificationsModal && <NotificationsModal />}
      {showLogoutConfirm && <LogoutConfirmationModal />}
      
      {/* Fixed Messages Modal */}
      <MessagesModal />
    </div>
  );
};

// Enhanced Styles with improved logout confirmation and notifications
const styles = {
  container: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#f8fafc',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
  },
  sidebar: {
    width: '280px',
    backgroundColor: '#7C2A62',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    position: 'fixed',
    height: '100vh',
    left: 0,
    top: 0
  },
  sidebarHeader: {
    padding: '30px 24px 20px',
    borderBottom: '1px solid rgba(255,255,255,0.1)'
  },
  logo: {
    fontSize: '24px',
    fontWeight: '700',
    margin: '0 0 4px 0',
    color: 'white'
  },
  doctorTitle: {
    fontSize: '14px',
    opacity: 0.8,
    margin: 0
  },
  navigation: {
    flex: 1,
    padding: '20px 0'
  },
  navButton: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    padding: '16px 24px',
    backgroundColor: 'transparent',
    border: 'none',
    color: 'white',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    opacity: 0.8,
    position: 'relative'
  },
  navButtonActive: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    opacity: 1,
    borderRight: '4px solid #F7D9EB'
  },
  navIcon: {
    fontSize: '20px',
    marginRight: '12px',
    width: '24px',
    textAlign: 'center'
  },
  navLabel: {
    fontWeight: '500'
  },
  navBadge: {
    backgroundColor: '#EF4444',
    color: 'white',
    borderRadius: '10px',
    padding: '2px 8px',
    fontSize: '12px',
    fontWeight: '600',
    marginLeft: 'auto'
  },
  // Profile Section Styles
  profileSection: {
    padding: '20px 24px',
    borderTop: '1px solid rgba(255,255,255,0.1)',
    borderBottom: '1px solid rgba(255,255,255,0.1)'
  },
  userInfo: {
    display: 'flex',
    alignItems: 'flex-start',
    marginBottom: '16px'
  },
  userAvatar: {
    fontSize: '32px',
    marginRight: '12px',
    marginTop: '4px'
  },
  userDetails: {
    flex: 1
  },
  userName: {
    margin: '0 0 4px 0',
    fontWeight: '600',
    fontSize: '14px'
  },
  userEmail: {
    margin: '0 0 4px 0',
    fontSize: '12px',
    opacity: 0.8
  },
  userSpecialization: {
    margin: 0,
    fontSize: '11px',
    opacity: 0.7,
    fontStyle: 'italic'
  },
  profileActions: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  profileButton: {
    width: '100%',
    padding: '8px 12px',
    backgroundColor: 'rgba(255,255,255,0.1)',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: '500',
    transition: 'background-color 0.3s ease'
  },
  sidebarFooter: {
    padding: '20px 24px'
  },
  logoutButton: {
    width: '100%',
    padding: '12px',
    backgroundColor: 'rgba(255,255,255,0.1)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '500',
    transition: 'background-color 0.3s ease'
  },
  content: {
    flex: 1,
    marginLeft: '280px',
    padding: '0'
  },
  mainContent: {
    padding: '30px',
    minHeight: '100vh'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '30px'
  },
  headerActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  },
  notificationBell: {
    position: 'relative',
    backgroundColor: 'white',
    border: 'none',
    borderRadius: '50%',
    width: '44px',
    height: '44px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px',
    cursor: 'pointer',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    transition: 'all 0.3s ease'
  },
  notificationBadge: {
    position: 'absolute',
    top: '-2px',
    right: '-2px',
    backgroundColor: '#EF4444',
    color: 'white',
    borderRadius: '50%',
    width: '18px',
    height: '18px',
    fontSize: '10px',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
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
  dateDisplay: {
    fontSize: '14px',
    color: '#6b7280',
    fontWeight: '500'
  },
  // Enhanced Logout Confirmation Modal Styles
  confirmModal: {
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: '0',
    width: '90%',
    maxWidth: '400px',
    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
    textAlign: 'center'
  },
  confirmModalHeader: {
    padding: '32px 24px 16px',
    borderBottom: '1px solid #e5e7eb'
  },
  confirmIcon: {
    fontSize: '48px',
    marginBottom: '16px'
  },
  confirmModalTitle: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#1f2937',
    margin: '0 0 8px 0'
  },
  confirmModalContent: {
    padding: '24px'
  },
  confirmationText: {
    fontSize: '16px',
    color: '#6b7280',
    lineHeight: '1.5',
    margin: 0
  },
  confirmModalActions: {
    display: 'flex',
    padding: '20px 24px',
    borderTop: '1px solid #e5e7eb',
    gap: '12px'
  },
  confirmCancelButton: {
    flex: 1,
    padding: '12px 20px',
    backgroundColor: 'transparent',
    color: '#6b7280',
    border: '2px solid #e5e7eb',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  confirmLogoutButton: {
    flex: 1,
    padding: '12px 20px',
    backgroundColor: '#EF4444',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease'
  },
  // Notifications Modal Styles
  notificationActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  smallButton: {
    padding: '6px 12px',
    backgroundColor: 'transparent',
    color: '#7C2A62',
    border: '1px solid #7C2A62',
    borderRadius: '6px',
    fontSize: '12px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  noNotifications: {
    textAlign: 'center',
    padding: '40px 20px',
    color: '#6b7280'
  },
  noNotificationsIcon: {
    fontSize: '48px',
    marginBottom: '16px',
    opacity: 0.5
  },
  noNotificationsTitle: {
    fontSize: '18px',
    fontWeight: '600',
    margin: '0 0 8px 0'
  },
  noNotificationsText: {
    fontSize: '14px',
    margin: 0,
    opacity: 0.7
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
    transition: 'all 0.3s ease',
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
  notificationHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '4px'
  },
  notificationTitle: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#1f2937',
    margin: '0 0 4px 0'
  },
  notificationTime: {
    fontSize: '11px',
    color: '#9CA3AF'
  },
  notificationMessage: {
    fontSize: '13px',
    color: '#6b7280',
    margin: '0 0 8px 0',
    lineHeight: '1.4'
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
  // Messages Stats
  messagesStats: {
    display: 'flex',
    gap: '20px'
  },
  messageStat: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '16px 24px',
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  },
  messageStatNumber: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#7C2A62',
    marginBottom: '4px'
  },
  messageStatLabel: {
    fontSize: '14px',
    color: '#6b7280'
  },
  // Messages Overview
  messagesOverview: {
    marginTop: '20px'
  },
  conversationsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
    gap: '20px'
  },
  conversationCard: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    border: '1px solid #e5e7eb'
  },
  conversationCardHeader: {
    display: 'flex',
    alignItems: 'flex-start',
    marginBottom: '16px'
  },
  conversationCardAvatar: {
    position: 'relative',
    fontSize: '32px',
    marginRight: '12px'
  },
  conversationCardInfo: {
    flex: 1
  },
  conversationCardName: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#1f2937',
    margin: '0 0 4px 0'
  },
  conversationCardLastMessage: {
    fontSize: '14px',
    color: '#6b7280',
    margin: 0,
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden'
  },
  conversationCardTime: {
    fontSize: '12px',
    color: '#9CA3AF'
  },
  conversationCardActions: {
    display: 'flex',
    gap: '8px'
  },
  // Messages Modal Styles
  messagesContainer: {
    display: 'flex',
    height: 'calc(80vh - 80px)'
  },
  conversationsSidebar: {
    width: '350px',
    borderRight: '1px solid #e5e7eb',
    display: 'flex',
    flexDirection: 'column'
  },
  conversationsHeader: {
    padding: '20px',
    borderBottom: '1px solid #e5e7eb'
  },
  searchContainer: {
    marginBottom: '16px'
  },
  searchInput: {
    width: '100%',
    padding: '10px 12px',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    fontSize: '14px'
  },
  conversationFilters: {
    display: 'flex',
    gap: '8px'
  },
  conversationFilter: {
    padding: '6px 12px',
    backgroundColor: 'transparent',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: '500',
    transition: 'all 0.3s ease'
  },
  conversationFilterActive: {
    backgroundColor: '#7C2A62',
    color: 'white',
    borderColor: '#7C2A62'
  },
  conversationsList: {
    flex: 1,
    overflow: 'auto'
  },
  conversationItem: {
    display: 'flex',
    padding: '16px 20px',
    cursor: 'pointer',
    borderBottom: '1px solid #f3f4f6',
    transition: 'background-color 0.3s ease'
  },
  conversationItemActive: {
    backgroundColor: '#F7D9EB'
  },
  conversationAvatar: {
    position: 'relative',
    fontSize: '24px',
    marginRight: '12px'
  },
  conversationInfo: {
    flex: 1
  },
  conversationHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '4px'
  },
  conversationName: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#1f2937',
    margin: 0
  },
  conversationTime: {
    fontSize: '11px',
    color: '#9CA3AF'
  },
  conversationPreview: {
    fontSize: '12px',
    color: '#6b7280',
    margin: 0,
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden'
  },
  unreadBadge: {
    position: 'absolute',
    top: '-2px',
    right: '-2px',
    backgroundColor: '#EF4444',
    color: 'white',
    borderRadius: '8px',
    padding: '1px 6px',
    fontSize: '10px',
    fontWeight: '600',
    minWidth: '16px',
    textAlign: 'center'
  },
  chatArea: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column'
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
    color: '#1f2937',
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
  messageBubbleLeft: {
    alignSelf: 'flex-start'
  },
  messageBubbleRight: {
    alignSelf: 'flex-end'
  },
  messageContent: {
    padding: '12px 16px',
    borderRadius: '16px',
    backgroundColor: '#f3f4f6'
  },
  messageBubbleRightMessageContent: {
    backgroundColor: '#7C2A62',
    color: 'white'
  },
  messageText: {
    margin: '0 0 4px 0',
    fontSize: '14px',
    lineHeight: '1.4'
  },
  messageTime: {
    fontSize: '11px',
    opacity: 0.7
  },
  messageInputContainer: {
    display: 'flex',
    padding: '20px',
    borderTop: '1px solid #e5e7eb',
    gap: '12px'
  },
  messageInput: {
    flex: 1,
    padding: '12px 16px',
    border: '1px solid #d1d5db',
    borderRadius: '24px',
    fontSize: '14px',
    outline: 'none'
  },
  sendButton: {
    padding: '12px 24px',
    backgroundColor: '#7C2A62',
    color: 'white',
    border: 'none',
    borderRadius: '24px',
    cursor: 'pointer',
    fontWeight: '500',
    transition: 'background-color 0.3s ease'
  },
  sendButtonDisabled: {
    backgroundColor: '#9CA3AF',
    cursor: 'not-allowed'
  },
  noConversation: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#6b7280'
  },
  noConversationIcon: {
    fontSize: '48px',
    marginBottom: '16px'
  },
  noConversationTitle: {
    fontSize: '18px',
    fontWeight: '600',
    margin: '0 0 8px 0'
  },
  noConversationText: {
    fontSize: '14px',
    margin: 0
  },
  // Rest of the existing styles remain the same...
  analyticsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr 1fr 200px',
    gap: '20px',
    marginBottom: '30px'
  },
  analyticsCard: {
    backgroundColor: 'white',
    padding: '24px',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    display: 'flex',
    alignItems: 'center',
    border: '1px solid #e5e7eb'
  },
  analyticsIcon: {
    fontSize: '32px',
    marginRight: '16px',
    width: '60px',
    height: '60px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '12px'
  },
  analyticsContent: {
    flex: 1
  },
  analyticsNumber: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#1f2937',
    margin: '0 0 4px 0'
  },
  analyticsLabel: {
    fontSize: '14px',
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
    transition: 'all 0.3s ease'
  },
  timeRangeButtonActive: {
    backgroundColor: '#7C2A62',
    color: 'white',
    borderColor: '#7C2A62'
  },
  contentGrid: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: '30px'
  },
  section: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '24px',
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
    marginBottom: '20px'
  },
  sectionTitle: {
    fontSize: '20px',
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
    padding: '20px',
    border: '1px solid #e5e7eb',
    borderRadius: '10px',
    transition: 'all 0.3s ease'
  },
  consultationHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '12px'
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
    fontSize: '16px'
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
    fontWeight: '500'
  },
  consultationIssue: {
    fontSize: '14px',
    color: '#6b7280',
    margin: '0 0 16px 0',
    lineHeight: '1.5'
  },
  viewDetailsButton: {
    backgroundColor: '#7C2A62',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease'
  },
  upcomingCard: {
    backgroundColor: 'white',
    padding: '24px',
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
    fontSize: '20px'
  },
  upcomingPatientInfo: {
    flex: 1
  },
  upcomingPatientName: {
    fontSize: '20px',
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
    alignItems: 'center'
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
    gap: '12px'
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
    transition: 'background-color 0.3s ease'
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    color: '#7C2A62',
    border: '2px solid #7C2A62',
    padding: '8px 16px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
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
  },
  highPriority: {
    color: '#EF4444',
    fontWeight: '600'
  },
  // Appointments Page Styles
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
    fontWeight: '500',
    transition: 'all 0.3s ease'
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
  // Patients Page Styles
  searchBox: {
    marginBottom: '0'
  },
  searchInput: {
    padding: '12px 16px',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    fontSize: '14px',
    width: '300px',
    outline: 'none'
  },
  patientsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
    gap: '20px'
  },
  patientCard: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    border: '1px solid #e5e7eb'
  },
  patientHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    marginBottom: '16px'
  },
  patientBasicInfo: {
    flex: 1
  },
  patientContact: {
    fontSize: '14px',
    color: '#6b7280',
    margin: '4px 0'
  },
  patientEmail: {
    fontSize: '12px',
    color: '#9CA3AF',
    margin: 0
  },
  patientDetails: {
    marginBottom: '16px'
  },
  detailRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px'
  },
  conditionsSection: {
    marginBottom: '16px'
  },
  conditionsLabel: {
    fontSize: '14px',
    color: '#6b7280',
    marginBottom: '8px',
    display: 'block'
  },
  conditionsList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '6px'
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
    flexWrap: 'wrap'
  },
  // Earnings Page Styles
  earningFilters: {
    display: 'flex',
    gap: '8px',
    backgroundColor: 'white',
    padding: '4px',
    borderRadius: '8px',
    border: '1px solid #e5e7eb'
  },
  earningFilter: {
    padding: '8px 16px',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.3s ease'
  },
  earningFilterActive: {
    backgroundColor: '#7C2A62',
    color: 'white'
  },
  earningsSummary: {
    backgroundColor: 'white',
    padding: '24px',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    marginBottom: '24px'
  },
  earningStats: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '20px'
  },
  earningStat: {
    textAlign: 'center'
  },
  earningAmount: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#7C2A62',
    margin: '0 0 8px 0'
  },
  earningLabel: {
    fontSize: '14px',
    color: '#6b7280',
    margin: 0
  },
  earningsHistory: {
    backgroundColor: 'white',
    padding: '24px',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  },
  earningsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  earningItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px',
    border: '1px solid #e5e7eb',
    borderRadius: '8px'
  },
  earningDate: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  },
  modalOverlay: {
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
    padding: '0',
    width: '90%',
    maxWidth: '500px',
    maxHeight: '90vh',
    overflow: 'auto'
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '24px',
    borderBottom: '1px solid #e5e7eb'
  },
  closeButton: {
    backgroundColor: 'transparent',
    border: 'none',
    fontSize: '20px',
    cursor: 'pointer',
    color: '#6b7280'
  },
  modalContent: {
    padding: '24px'
  },
  patientInfoModal: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    marginBottom: '24px'
  },
  modalPatientName: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#1f2937',
    margin: '0 0 4px 0'
  },
  modalPatientAge: {
    fontSize: '14px',
    color: '#6b7280',
    margin: 0
  },
  modalDetails: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginBottom: '24px'
  },
  modalDetailItem: {
    fontSize: '14px',
    color: '#1f2937',
    lineHeight: '1.5'
  },
  modalActions: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap'
  },
  // Profile and Notification Modal Styles
  modalTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#1f2937',
    margin: 0
  },
  formRow: {
    marginBottom: '16px'
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px'
  },
  label: {
    display: 'block',
    marginBottom: '6px',
    fontWeight: '500',
    color: '#374151',
    fontSize: '14px'
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
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
    transition: 'border-color 0.3s ease',
    boxSizing: 'border-box'
  },
  inputError: {
    borderColor: '#EF4444',
    backgroundColor: '#FEF2F2'
  },
  errorText: {
    color: '#EF4444',
    fontSize: '12px',
    marginTop: '4px',
    display: 'block'
  },
  readOnlyNote: {
    fontSize: '11px',
    color: '#6b7280',
    fontStyle: 'italic',
    marginTop: '4px',
    display: 'block'
  },
  checkbox: {
    margin: 0
  }
};

export default DoctorDashboard;