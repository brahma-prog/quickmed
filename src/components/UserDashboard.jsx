import React, { useState, useEffect, useRef, useMemo } from 'react';

const UserDashboard = ({ user, onLogout }) => {
  const [activeView, setActiveView] = useState('dashboard');
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [orders, setOrders] = useState([]);
  const [showCheckoutConfirm, setShowCheckoutConfirm] = useState(false);
  const [userProfile, setUserProfile] = useState({
    fullName: user?.fullName || 'Jagan',
    email: user?.email || 'yerrajagan29@gmail.com',
    phone: user?.phone || '6300604470',
    address: '5',
    city: 'r',
    pincode: '3',
    dateOfBirth: '',
    age: '45',
    gender: ''
  });

  // Form validation state
  const [formErrors, setFormErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [isFormTouched, setIsFormTouched] = useState(false);

  // Doctor Consultation State
  const [doctorSearchQuery, setDoctorSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [selectedExperience, setSelectedExperience] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');

  // Payment State
  const [paymentLoading, setPaymentLoading] = useState(false);

  // AI Chatbot State
  const [showChatbot, setShowChatbot] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your QuickMed assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [userMessage, setUserMessage] = useState('');
  const chatInputRef = useRef(null);
  const chatMessagesEndRef = useRef(null);
  const chatRef = useRef(null);

  // Real-time Chat with Doctors State
  const [doctorChats, setDoctorChats] = useState({});
  const [activeDoctorChat, setActiveDoctorChat] = useState(null);
  const [showDoctorChat, setShowDoctorChat] = useState(false);

  // Pharmacy Search State
  const [pharmacySearchQueries, setPharmacySearchQueries] = useState({});

  // Logout Confirmation State
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  // Profile Dropdown State
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  // Appointments State
  const [appointments, setAppointments] = useState([
    {
      id: 'APT001',
      doctorName: 'Dr. Brahma Gadikoto',
      specialty: 'General Physician',
      date: '2024-01-20',
      time: '10:00 AM',
      status: 'Scheduled',
      type: 'Video Consultation',
      fee: 730,
      details: {
        patientName: 'User',
        symptoms: 'Fever and cold',
        notes: 'Regular checkup scheduled',
        prescription: 'To be provided after consultation'
      }
    },
    {
      id: 'APT002',
      doctorName: 'Dr. Charitha Kasturi',
      specialty: 'Pediatrician',
      date: '2024-01-18',
      time: '2:00 PM',
      status: 'Completed',
      type: 'In-Person',
      fee: 505,
      details: {
        patientName: 'User',
        symptoms: 'Child vaccination',
        notes: 'Vaccination completed successfully',
        prescription: 'Next vaccination due in 2 months'
      }
    },
    {
      id: 'APT003',
      doctorName: 'Dr. Rajesh Kumar',
      specialty: 'Cardiologist',
      date: '2024-01-22',
      time: '11:30 AM',
      status: 'Cancelled',
      type: 'Video Consultation',
      fee: 1200,
      details: {
        patientName: 'User',
        symptoms: 'Chest pain',
        notes: 'Appointment cancelled by patient',
        prescription: 'None'
      }
    }
  ]);

  // New Features State
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Order Confirmed',
      message: 'Your order ORD001 has been confirmed',
      timestamp: new Date(Date.now() - 300000),
      read: false,
      type: 'order'
    },
    {
      id: 2,
      title: 'Delivery Update',
      message: 'Your order is out for delivery',
      timestamp: new Date(Date.now() - 600000),
      read: false,
      type: 'delivery'
    },
    {
      id: 3,
      title: 'Prescription Approved',
      message: 'Your uploaded prescription has been verified',
      timestamp: new Date(Date.now() - 86400000),
      read: true,
      type: 'prescription'
    }
  ]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [prescriptionFile, setPrescriptionFile] = useState(null);
  const [prescriptionPreview, setPrescriptionPreview] = useState(null);
  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);
  
  // Live Tracking State
  const [trackingOrder, setTrackingOrder] = useState(null);
  const [deliveryPartner] = useState({
    id: 'DP001',
    name: 'Rahul Kumar',
    phone: '+91 9876543210',
    vehicle: 'Bike',
    vehicleNumber: 'KA01AB1234',
    rating: 4.7,
    currentLocation: { lat: 12.9716, lng: 77.5946 },
    userLocation: { lat: 12.9352, lng: 77.6245 },
    destination: { lat: 12.9352, lng: 77.6245 },
    status: 'picked_up',
    estimatedTime: '25 min'
  });

  // Pharmacy Store State
  const [selectedPharmacy, setSelectedPharmacy] = useState(null);
  const [showPharmacyStore, setShowPharmacyStore] = useState(false);

  // Appointment Details State
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showAppointmentDetails, setShowAppointmentDetails] = useState(false);

  // Refs for click outside detection
  const notificationRef = useRef(null);
  const profileRef = useRef(null);

  // Mock data for medicines
  const medicines = [
    { id: 1, name: 'Aspirin 75mg', price: 25, vendor: 'WellCare Store', category: 'OTC' },
    { id: 2, name: 'Paracetamol 500mg', price: 30, vendor: 'City Pharmacy', category: 'OTC' },
    { id: 3, name: 'Ibuprofen 400mg', price: 35, vendor: 'HealthPlus Medicines', category: 'OTC' },
    { id: 4, name: 'Vitamin C 1000mg', price: 40, vendor: 'WellCare Store', category: 'Vitamins' },
    { id: 5, name: 'Amoxicillin 500mg', price: 120, vendor: 'City Pharmacy', category: 'Prescription' },
    { id: 6, name: 'Blood Pressure Monitor', price: 899, vendor: 'HealthPlus Medicines', category: 'Equipment' }
  ];

  // Mock data for pharmacies with their medicines
  const pharmacies = [
    { 
      id: 1, 
      name: 'City Pharmacy', 
      distance: '1.1 km', 
      deliveryTime: '20 min', 
      rating: 4.5,
      medicines: [
        { id: 2, name: 'Paracetamol 500mg', price: 30, category: 'OTC' },
        { id: 5, name: 'Amoxicillin 500mg', price: 120, category: 'Prescription' },
        { id: 7, name: 'Cetirizine 10mg', price: 25, category: 'OTC' },
        { id: 8, name: 'Omeprazole 20mg', price: 45, category: 'Prescription' }
      ]
    },
    { 
      id: 2, 
      name: 'WellCare Store', 
      distance: '1.6 km', 
      deliveryTime: '25 min', 
      rating: 4.8,
      medicines: [
        { id: 1, name: 'Aspirin 75mg', price: 25, category: 'OTC' },
        { id: 4, name: 'Vitamin C 1000mg', price: 40, category: 'Vitamins' },
        { id: 9, name: 'Multivitamin Tablets', price: 150, category: 'Vitamins' },
        { id: 10, name: 'Calcium Supplements', price: 200, category: 'Vitamins' }
      ]
    },
    { 
      id: 3, 
      name: 'HealthPlus Medicines', 
      distance: '1.9 km', 
      deliveryTime: '30 min', 
      rating: 4.3,
      medicines: [
        { id: 3, name: 'Ibuprofen 400mg', price: 35, category: 'OTC' },
        { id: 6, name: 'Blood Pressure Monitor', price: 899, category: 'Equipment' },
        { id: 11, name: 'Diabetes Test Strips', price: 350, category: 'Equipment' },
        { id: 12, name: 'Thermometer', price: 150, category: 'Equipment' }
      ]
    }
  ];

  // Generate real-time slots for Indian timezone
  const generateTimeSlots = () => {
    const slots = [];
    const now = new Date();
    const istOffset = 5.5 * 60 * 60 * 1000; // IST is UTC+5:30
    const currentIST = new Date(now.getTime() + istOffset);
    
    let currentHour = currentIST.getHours();
    const currentMinute = currentIST.getMinutes();
    
    // Start from next available slot
    if (currentMinute > 30) {
      currentHour += 1;
    }
    
    for (let i = 0; i < 6; i++) {
      const hour = (currentHour + i) % 24;
      const period = hour >= 12 ? 'PM' : 'AM';
      const displayHour = hour % 12 || 12;
      const timeString = `${displayHour}:00 ${period}`;
      slots.push(timeString);
    }
    
    return slots;
  };

  // Mock doctors data with real Indian time slots
  const doctors = [
    {
      id: 1,
      name: 'Dr. Brahma Gadikoto',
      specialty: 'General Physician',
      rating: 5,
      experience: '15 years',
      languages: ['English', 'Telugu'],
      consultationFee: 730,
      availableSlots: generateTimeSlots(),
      image: '👨‍⚕️',
      bio: 'Specialized in general medicine with 15 years of experience. Available for online consultations.',
      qualifications: 'MBBS, MD (General Medicine)'
    },
    {
      id: 2,
      name: 'Dr. Charitha Kasturi',
      specialty: 'Pediatrician',
      rating: 5,
      experience: '12 years',
      languages: ['English', 'Telugu'],
      consultationFee: 505,
      availableSlots: generateTimeSlots(),
      image: '👩‍⚕️',
      bio: 'Pediatric specialist with expertise in child healthcare and development.',
      qualifications: 'MBBS, DCH (Diploma in Child Health)'
    },
    {
      id: 3,
      name: 'Dr. Rajesh Kumar',
      specialty: 'Cardiologist',
      rating: 4,
      experience: '10 years',
      languages: ['English', 'Hindi'],
      consultationFee: 1200,
      availableSlots: generateTimeSlots(),
      image: '👨‍⚕️',
      bio: 'Cardiology expert with extensive experience in heart-related conditions.',
      qualifications: 'MBBS, DM (Cardiology)'
    }
  ];

  // Mock orders data with tracking
  const initialOrders = [
    {
      id: 'ORD001',
      date: '2024-01-15',
      items: [
        { name: 'Paracetamol 500mg', quantity: 2, price: 30 },
        { name: 'Vitamin C 1000mg', quantity: 1, price: 40 }
      ],
      total: 100,
      status: 'Delivered',
      deliveryAddress: '123 Main St, City, 560001',
      trackingAvailable: false
    },
    {
      id: 'ORD002',
      date: '2024-01-10',
      items: [
        { name: 'Aspirin 75mg', quantity: 1, price: 25 }
      ],
      total: 25,
      status: 'In Transit',
      deliveryAddress: '123 Main St, City, 560001',
      trackingAvailable: true,
      deliveryPartner: {
        name: 'Rahul Kumar',
        phone: '+91 9876543210',
        estimatedTime: '25 min'
      }
    },
    {
      id: 'ORD003',
      date: new Date().toISOString().split('T')[0],
      items: [
        { name: 'Amoxicillin 500mg', quantity: 1, price: 120 },
        { name: 'Vitamin C 1000mg', quantity: 2, price: 40 }
      ],
      total: 200,
      status: 'On the Way',
      deliveryAddress: '456 Park Avenue, City, 560001',
      trackingAvailable: true,
      deliveryPartner: {
        name: 'Rahul Kumar',
        phone: '+91 9876543210',
        estimatedTime: '15 min'
      }
    }
  ];

  // AI Chatbot Responses
  const chatbotResponses = {
    'hello': "Hello! I'm your QuickMed assistant. How can I help you with medicines or doctor consultations today?",
    'hi': "Hi there! Welcome to QuickMed. How can I assist you with healthcare services?",
    'medicine': "We offer a wide range of medicines. You can search for specific medicines, upload prescriptions, or browse categories. Would you like me to help you find something specific?",
    'doctor': "We have certified doctors available for online consultations. You can book appointments by specialty, check availability, and consult via video. Would you like to book a consultation?",
    'delivery': "We offer fast delivery within 2 hours for medicines and 24/7 doctor consultations. Delivery is free for orders above ₹499.",
    'payment': "We accept all major payment methods including UPI, credit/debit cards, net banking, and wallet payments. All payments are secure and encrypted.",
    'prescription': "You can upload your prescription in the Medicine section. We'll verify it and deliver your medicines. Supported formats: JPG, PNG, PDF.",
    'emergency': "For medical emergencies, please contact your nearest hospital immediately or call emergency services at 108.",
    'default': "I understand you're asking about healthcare services. I can help with medicine orders, doctor appointments, delivery tracking, and general health queries. Could you please provide more details?"
  };

  // Load Razorpay script dynamically
  useEffect(() => {
    const loadRazorpayScript = () => {
      return new Promise((resolve) => {
        if (window.Razorpay) {
          resolve(true);
          return;
        }

        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
      });
    };

    loadRazorpayScript();
  }, []);

  // Initialize orders and start live tracking simulation
  useEffect(() => {
    setOrders(initialOrders);
    
    const trackableOrder = initialOrders.find(order => 
      order.trackingAvailable && (order.status === 'In Transit' || order.status === 'On the Way')
    );
    if (trackableOrder) {
      setTrackingOrder(trackableOrder);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Close notifications when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
      if (chatRef.current && !chatRef.current.contains(event.target)) {
        setShowChatbot(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Focus chat input when chatbot opens and scroll to bottom
  useEffect(() => {
    if (showChatbot) {
      setTimeout(() => {
        if (chatInputRef.current) {
          chatInputRef.current.focus();
        }
      }, 100);
    }
  }, [showChatbot]);

  // Scroll to bottom when new messages are added
  useEffect(() => {
    if (chatMessagesEndRef.current) {
      chatMessagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages]);

  // AI Chatbot Functions
  const toggleChatbot = () => {
    setShowChatbot(!showChatbot);
  };

  const handleUserMessage = (e) => {
    setUserMessage(e.target.value);
  };

  const sendMessage = () => {
    if (!userMessage.trim()) return;

    // Add user message
    const newUserMessage = {
      id: Date.now(),
      text: userMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, newUserMessage]);
    setUserMessage('');
    
    // Generate bot response after a short delay
    setTimeout(() => {
      const response = generateBotResponse(userMessage.toLowerCase());
      const botMessage = {
        id: Date.now() + 1,
        text: response,
        sender: 'bot',
        timestamp: new Date()
      };
      setChatMessages(prev => [...prev, botMessage]);
    }, 1000);

    // Refocus input after sending
    setTimeout(() => {
      if (chatInputRef.current) {
        chatInputRef.current.focus();
      }
    }, 50);
  };

  const generateBotResponse = (message) => {
    if (message.includes('hello') || message.includes('hi')) {
      return chatbotResponses.hello;
    } else if (message.includes('medicine') || message.includes('drug') || message.includes('pill')) {
      return chatbotResponses.medicine;
    } else if (message.includes('doctor') || message.includes('consult') || message.includes('appointment')) {
      return chatbotResponses.doctor;
    } else if (message.includes('delivery') || message.includes('shipping') || message.includes('time')) {
      return chatbotResponses.delivery;
    } else if (message.includes('payment') || message.includes('pay') || message.includes('money')) {
      return chatbotResponses.payment;
    } else if (message.includes('prescription') || message.includes('upload')) {
      return chatbotResponses.prescription;
    } else if (message.includes('emergency') || message.includes('urgent') || message.includes('help')) {
      return chatbotResponses.emergency;
    } else {
      return chatbotResponses.default;
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Real-time Doctor Chat Functions
  const startDoctorChat = (doctor) => {
    setActiveDoctorChat(doctor);
    setShowDoctorChat(true);
    
    // Initialize chat if not exists
    if (!doctorChats[doctor.id]) {
      setDoctorChats(prev => ({
        ...prev,
        [doctor.id]: [
          {
            id: 1,
            text: `Hello! I'm ${doctor.name}. How can I help you today?`,
            sender: 'doctor',
            timestamp: new Date()
          }
        ]
      }));
    }
  };

  const sendDoctorMessage = (doctorId, message) => {
    if (!message.trim()) return;

    const newMessage = {
      id: Date.now(),
      text: message,
      sender: 'user',
      timestamp: new Date()
    };

    setDoctorChats(prev => ({
      ...prev,
      [doctorId]: [...(prev[doctorId] || []), newMessage]
    }));

    // Simulate doctor response after delay
    setTimeout(() => {
      const doctorResponse = {
        id: Date.now() + 1,
        text: "Thank you for your message. I'll review your concerns and get back to you shortly. For urgent matters, please book an appointment.",
        sender: 'doctor',
        timestamp: new Date()
      };

      setDoctorChats(prev => ({
        ...prev,
        [doctorId]: [...(prev[doctorId] || []), doctorResponse]
      }));
    }, 2000);
  };

  // Pharmacy Search Functions
  const handlePharmacySearch = (pharmacyId, query) => {
    setPharmacySearchQueries(prev => ({
      ...prev,
      [pharmacyId]: query
    }));
  };

  const getFilteredPharmacyMedicines = (pharmacy) => {
    const query = pharmacySearchQueries[pharmacy.id] || '';
    if (!query.trim()) return pharmacy.medicines;
    
    return pharmacy.medicines.filter(medicine =>
      medicine.name.toLowerCase().includes(query.toLowerCase())
    );
  };

  // Cart functions
  const addToCart = (medicine) => {
    const existingItem = cart.find(item => item.id === medicine.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === medicine.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...medicine, quantity: 1 }]);
    }
  };

  const removeFromCart = (medicineId) => {
    setCart(cart.filter(item => item.id !== medicineId));
  };

  const updateQuantity = (medicineId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(medicineId);
    } else {
      setCart(cart.map(item => 
        item.id === medicineId 
          ? { ...item, quantity: newQuantity }
          : item
      ));
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Filter medicines based on search
  const filteredMedicines = medicines.filter(medicine =>
    medicine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    medicine.vendor.toLowerCase().includes(searchQuery.toLowerCase()) ||
    medicine.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter doctors based on search and filters
  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(doctorSearchQuery.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(doctorSearchQuery.toLowerCase());
    const matchesSpecialty = !selectedSpecialty || doctor.specialty === selectedSpecialty;
    const matchesTimeSlot = !selectedTimeSlot || doctor.availableSlots.includes(selectedTimeSlot);
    const matchesExperience = !selectedExperience || doctor.experience.includes(selectedExperience);
    const matchesLanguage = !selectedLanguage || doctor.languages.includes(selectedLanguage);
    
    return matchesSearch && matchesSpecialty && matchesTimeSlot && matchesExperience && matchesLanguage;
  });

  // Get unique specialties, languages, and time slots for filters
  const specialties = [...new Set(doctors.map(doctor => doctor.specialty))];
  const allTimeSlots = [...new Set(doctors.flatMap(doctor => doctor.availableSlots))].sort();

  // Notification functions
  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const markAsRead = (notificationId) => {
    setNotifications(notifications.map(notif =>
      notif.id === notificationId ? { ...notif, read: true } : notif
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };

  const getUnreadCount = () => {
    return notifications.filter(notif => !notif.read).length;
  };

  const addNotification = (title, message, type = 'info') => {
    const newNotification = {
      id: Date.now(),
      title,
      message,
      timestamp: new Date(),
      read: false,
      type
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  // Appointment functions
  const scheduleAppointment = (doctor, date, time) => {
    const newAppointment = {
      id: `APT${Date.now()}`,
      doctorName: doctor.name,
      specialty: doctor.specialty,
      date: date,
      time: time,
      status: 'Scheduled',
      type: 'Video Consultation',
      fee: doctor.consultationFee,
      details: {
        patientName: userProfile.fullName,
        symptoms: 'General consultation',
        notes: 'New appointment scheduled',
        prescription: 'To be provided after consultation'
      }
    };
    setAppointments(prev => [newAppointment, ...prev]);
    addNotification('Appointment Scheduled', `Appointment with ${doctor.name} scheduled for ${date} at ${time}`, 'appointment');
  };

  const rescheduleAppointment = (appointmentId, newDate, newTime) => {
    setAppointments(appointments.map(apt =>
      apt.id === appointmentId 
        ? { ...apt, date: newDate, time: newTime, status: 'Rescheduled' }
        : apt
    ));
    addNotification('Appointment Rescheduled', 'Your appointment has been rescheduled successfully', 'appointment');
  };

  const cancelAppointment = (appointmentId) => {
    setAppointments(appointments.map(apt =>
      apt.id === appointmentId 
        ? { ...apt, status: 'Cancelled' }
        : apt
    ));
    addNotification('Appointment Cancelled', 'Your appointment has been cancelled', 'appointment');
  };

  // View Appointment Details
  const viewAppointmentDetails = (appointment) => {
    setSelectedAppointment(appointment);
    setShowAppointmentDetails(true);
  };

  // Pharmacy Store functions
  const viewPharmacyStore = (pharmacy) => {
    setSelectedPharmacy(pharmacy);
    setShowPharmacyStore(true);
  };

  const addToCartFromPharmacy = (medicine) => {
    addToCart(medicine);
    addNotification('Medicine Added', `${medicine.name} added to cart from ${selectedPharmacy.name}`, 'order');
  };

  // Prescription upload functions
  const handlePrescriptionUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Check file type
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
      if (!validTypes.includes(file.type)) {
        alert('Please upload a valid prescription file (JPG, PNG, or PDF)');
        return;
      }

      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size should be less than 5MB');
        return;
      }

      setPrescriptionFile(file);
      
      // Create preview for images
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setPrescriptionPreview(e.target.result);
        };
        reader.readAsDataURL(file);
      } else {
        setPrescriptionPreview(null);
      }
      
      setShowPrescriptionModal(true);
      addNotification('Prescription Uploaded', 'Your prescription has been uploaded successfully', 'prescription');
    }
  };

  const handlePrescriptionSubmit = () => {
    if (!prescriptionFile) {
      alert('Please select a prescription file first');
      return;
    }
    
    alert(`Prescription "${prescriptionFile.name}" uploaded successfully! Our team will verify it shortly.`);
    setShowPrescriptionModal(false);
    setPrescriptionFile(null);
    setPrescriptionPreview(null);
  };

  // Live Tracking functions
  const startLiveTracking = (order) => {
    setTrackingOrder(order);
    setActiveView('live-tracking');
    addNotification('Live Tracking Started', `You can now track your order ${order.id} in real-time`, 'tracking');
  };

  const callDeliveryPartner = () => {
    alert(`Calling delivery partner: ${deliveryPartner.name}\nPhone: ${deliveryPartner.phone}`);
  };

  const getDeliveryStatusText = (status) => {
    const statusMap = {
      'ordered': 'Order Placed',
      'confirmed': 'Order Confirmed',
      'preparing': 'Preparing Your Order',
      'picked_up': 'Picked Up',
      'on_the_way': 'On the Way',
      'delivered': 'Delivered'
    };
    return statusMap[status] || status;
  };

  const getDeliveryProgress = (status) => {
    const progressMap = {
      'ordered': 20,
      'confirmed': 40,
      'preparing': 60,
      'picked_up': 80,
      'on_the_way': 90,
      'delivered': 100
    };
    return progressMap[status] || 0;
  };

  // Logout functions
  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
  };

  const confirmLogout = () => {
    setShowLogoutConfirm(false);
    onLogout();
  };

  const cancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  // Profile dropdown functions
  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  // Razorpay Payment Integration
  const initiatePayment = async () => {
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    if (!window.Razorpay) {
      alert('Payment system is loading, please try again in a moment.');
      return;
    }

    setPaymentLoading(true);

    try {
      const totalAmount = getTotalPrice() * 100;

      const options = {
        key: 'rzp_test_1DP5mmOlF5G5ag',
        amount: totalAmount,
        currency: 'INR',
        name: 'QuickMed Pharmacy',
        description: 'Medicine Purchase',
        image: 'https://cdn.razorpay.com/logos/FFATTsJeURNMxx_medium.png',
        handler: function(response) {
          handlePaymentSuccess(response);
        },
        prefill: {
          name: userProfile.fullName,
          email: userProfile.email,
          contact: userProfile.phone
        },
        notes: {
          address: userProfile.address,
        },
        theme: {
          color: '#7C2A62'
        },
        modal: {
          ondismiss: function() {
            setPaymentLoading(false);
            alert('Payment was cancelled. You can try again.');
          }
        }
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
      
    } catch (error) {
      console.error('Error initializing payment:', error);
      alert('Error initializing payment. Please try again.');
      setPaymentLoading(false);
    }
  };

  const handlePaymentSuccess = async (paymentResponse) => {
    try {
      const verificationResponse = await verifyPayment(paymentResponse);
      
      if (verificationResponse.success) {
        const orderId = `ORD${Date.now()}`;
        const newOrder = {
          id: orderId,
          date: new Date().toISOString().split('T')[0],
          items: [...cart],
          total: getTotalPrice(),
          status: 'Confirmed',
          deliveryAddress: userProfile.address || 'Address not provided',
          paymentId: paymentResponse.razorpay_payment_id,
          trackingAvailable: true,
          deliveryPartner: {
            name: 'Rahul Kumar',
            phone: '+91 9876543210',
            estimatedTime: '30 min'
          }
        };
        
        setOrders(prevOrders => [newOrder, ...prevOrders]);
        setCart([]);
        setActiveView('orders');
        
        addNotification('Order Confirmed', `Your order ${orderId} has been placed successfully`, 'order');
        alert(`Payment successful! Order ID: ${orderId}\nPayment ID: ${paymentResponse.razorpay_payment_id}`);
      } else {
        alert('Payment verification failed. Please contact support.');
      }
    } catch (error) {
      console.error('Payment verification failed:', error);
      alert('Payment verification failed. Please contact support.');
    } finally {
      setPaymentLoading(false);
    }
  };

  const verifyPayment = async (paymentResponse) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 1000);
    });
  };

  // Checkout functions
  const handleCheckoutConfirmation = () => {
    setShowCheckoutConfirm(true);
  };

  const handleConfirmCheckout = () => {
    setShowCheckoutConfirm(false);
    initiatePayment();
  };

  const handleCancelCheckout = () => {
    setShowCheckoutConfirm(false);
  };

  // Doctor consultation functions
  const handleBookAppointment = (doctor, timeSlot) => {
    const selectedDate = prompt('Enter appointment date (YYYY-MM-DD):', new Date().toISOString().split('T')[0]);
    
    if (selectedDate && timeSlot) {
      scheduleAppointment(doctor, selectedDate, timeSlot);
      alert(`Appointment booked with ${doctor.name} on ${selectedDate} at ${timeSlot}`);
    }
  };

  // Enhanced Header Component with updated user name and profile dropdown
  const EnhancedHeader = () => (
    <header style={styles.header}>
      <div style={styles.headerTop}>
        <div style={styles.logoSection}>
          <div style={styles.logoContainer}>
            <h1 style={styles.logo}>QUICKMED</h1>
            <div style={styles.logoSubtitle}>
              <span style={styles.subtitleText}>Quick Care, Smarter Health</span>
            </div>
          </div>
        </div>
        
        <div style={styles.userSection}>
          <div style={styles.userWelcome}>
            <span style={styles.welcomeText}>Welcome,</span>
            <span style={styles.userName}>{userProfile.fullName || 'User'}</span>
          </div>
          <div 
            ref={profileRef}
            style={styles.userAvatarContainer}
            onClick={toggleProfileDropdown}
          >
            <div style={styles.userAvatar}>
              {userProfile.fullName?.charAt(0) || 'U'}
            </div>
            
            {/* Profile Dropdown */}
            {showProfileDropdown && (
              <div style={styles.profileDropdown}>
                <div style={styles.profileDropdownHeader}>
                  <h4 style={styles.profileDropdownTitle}>Profile Details</h4>
                </div>
                <div style={styles.profileDropdownContent}>
                  <div style={styles.profileDetailItem}>
                    <span style={styles.profileDetailLabel}>Name:</span>
                    <span style={styles.profileDetailValue}>{userProfile.fullName}</span>
                  </div>
                  <div style={styles.profileDetailItem}>
                    <span style={styles.profileDetailLabel}>Email:</span>
                    <span style={styles.profileDetailValue}>{userProfile.email}</span>
                  </div>
                  <div style={styles.profileDetailItem}>
                    <span style={styles.profileDetailLabel}>Phone:</span>
                    <span style={styles.profileDetailValue}>{userProfile.phone}</span>
                  </div>
                  <div style={styles.profileDetailItem}>
                    <span style={styles.profileDetailLabel}>Age:</span>
                    <span style={styles.profileDetailValue}>{userProfile.age}</span>
                  </div>
                  <div style={styles.profileDetailItem}>
                    <span style={styles.profileDetailLabel}>Gender:</span>
                    <span style={styles.profileDetailValue}>{userProfile.gender || 'Not specified'}</span>
                  </div>
                </div>
                <div style={styles.profileDropdownActions}>
                  <button 
                    style={styles.viewProfileButton}
                    onClick={() => {
                      setActiveView('profile');
                      setShowProfileDropdown(false);
                    }}
                    type="button"
                  >
                    View Full Profile
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div style={styles.headerBottom}>
        <div style={styles.navSection}>
          <nav style={styles.nav}>
            <button 
              style={activeView === 'dashboard' ? {...styles.navButton, ...styles.activeNavButton} : styles.navButton}
              onClick={() => setActiveView('dashboard')}
              type="button"
            >
              <span style={styles.navIcon}>🏠</span>
              Home
            </button>
            <button 
              style={activeView === 'appointments' ? {...styles.navButton, ...styles.activeNavButton} : styles.navButton}
              onClick={() => setActiveView('appointments')}
              type="button"
            >
              <span style={styles.navIcon}>📅</span>
              Appointments
            </button>
            <button 
              style={activeView === 'orders' ? {...styles.navButton, ...styles.activeNavButton} : styles.navButton}
              onClick={() => setActiveView('orders')}
              type="button"
            >
              <span style={styles.navIcon}>📦</span>
              Orders
            </button>
            <button 
              style={activeView === 'profile' ? {...styles.navButton, ...styles.activeNavButton} : styles.navButton}
              onClick={() => setActiveView('profile')}
              type="button"
            >
              <span style={styles.navIcon}>👤</span>
              Profile
            </button>
          </nav>
        </div>

        <div style={styles.headerActions}>
          {/* AI Chatbot Icon - Updated Symbol */}
          <div 
            style={styles.chatbotIconContainer}
            onClick={toggleChatbot}
          >
            <div style={styles.chatbotIcon}>
              💬
            </div>
          </div>

          {/* Cart Icon */}
          <div 
            style={styles.cartIconContainer}
            onClick={() => setActiveView('cart')}
          >
            <div style={styles.cartIcon}>
              🛒
              {cart.length > 0 && (
                <span style={styles.cartBadge}>{cart.length}</span>
              )}
            </div>
          </div>

          {/* Notification Bell */}
          <div 
            ref={notificationRef}
            style={styles.notificationContainer}
          >
            <div 
              style={styles.notificationBell}
              onClick={toggleNotifications}
            >
              🔔
              {getUnreadCount() > 0 && (
                <span style={styles.notificationBadge}>{getUnreadCount()}</span>
              )}
            </div>

            {/* Notification Dropdown */}
            {showNotifications && (
              <div style={styles.notificationDropdown}>
                <div style={styles.notificationHeader}>
                  <h3 style={styles.notificationTitle}>Notifications</h3>
                  <button 
                    style={styles.markAllReadButton}
                    onClick={markAllAsRead}
                    type="button"
                  >
                    Mark all as read
                  </button>
                </div>
                <div style={styles.notificationList}>
                  {notifications.length === 0 ? (
                    <p style={styles.noNotifications}>No notifications</p>
                  ) : (
                    notifications.map(notification => (
                      <div 
                        key={notification.id} 
                        style={{
                          ...styles.notificationItem,
                          ...(notification.read ? styles.readNotification : styles.unreadNotification)
                        }}
                        onClick={() => markAsRead(notification.id)}
                      >
                        <div style={styles.notificationIcon}>
                          {notification.type === 'order' && '📦'}
                          {notification.type === 'delivery' && '🚚'}
                          {notification.type === 'prescription' && '📄'}
                          {notification.type === 'tracking' && '📍'}
                          {notification.type === 'appointment' && '📅'}
                        </div>
                        <div style={styles.notificationContent}>
                          <h4 style={styles.notificationItemTitle}>{notification.title}</h4>
                          <p style={styles.notificationMessage}>{notification.message}</p>
                          <span style={styles.notificationTime}>
                            {new Date(notification.timestamp).toLocaleTimeString()}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          <button 
            style={styles.logoutButton}
            onClick={handleLogoutClick}
            type="button"
          >
            <span style={styles.logoutIcon}>🚪</span>
            Logout
          </button>
        </div>
      </div>

      {/* AI Chatbot */}
      {showChatbot && (
        <div ref={chatRef} style={styles.chatbotContainer}>
          <div style={styles.chatbotHeader}>
            <h3 style={styles.chatbotTitle}>QuickMed Assistant</h3>
            <button 
              style={styles.closeChatbot}
              onClick={toggleChatbot}
              type="button"
            >
              ×
            </button>
          </div>
          <div style={styles.chatMessages}>
            {chatMessages.map(message => (
              <div
                key={message.id}
                style={{
                  ...styles.chatMessage,
                  ...styles[`${message.sender}Message`]
                }}
              >
                <div style={{
                  ...styles.messageBubble,
                  ...styles[`${message.sender}MessageBubble`]
                }}>
                  {message.text}
                </div>
                <span style={styles.messageTime}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            ))}
            <div ref={chatMessagesEndRef} />
          </div>
          <div style={styles.chatInputContainer}>
            <input
              ref={chatInputRef}
              type="text"
              value={userMessage}
              onChange={handleUserMessage}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              style={styles.chatInput}
              autoFocus
            />
            <button 
              style={styles.sendButton}
              onClick={sendMessage}
              type="button"
              disabled={!userMessage.trim()}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </header>
  );

  // Updated Doctor Chat Modal Component with Go Back option
  const DoctorChatModal = () => {
    const [message, setMessage] = useState('');
    const chatEndRef = useRef(null);

    const currentChat = useMemo(() => 
      activeDoctorChat ? doctorChats[activeDoctorChat.id] || [] : [],
      [activeDoctorChat?.id, doctorChats]
    );

    useEffect(() => {
      if (chatEndRef.current) {
        chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, [currentChat]);

    const handleSendMessage = () => {
      if (!message.trim()) return;
      sendDoctorMessage(activeDoctorChat.id, message);
      setMessage('');
    };

    const handleKeyPress = (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSendMessage();
      }
    };

    const handleGoBack = () => {
      setShowDoctorChat(false);
      setActiveDoctorChat(null);
    };

    return (
      <div style={styles.modalOverlay}>
        <div style={styles.doctorChatModal}>
          <div style={styles.doctorChatHeader}>
            <div style={styles.doctorChatInfo}>
              <div style={styles.doctorImageSmall}>
                {activeDoctorChat?.image}
              </div>
              <div>
                <h3 style={styles.doctorChatName}>{activeDoctorChat?.name}</h3>
                <p style={styles.doctorChatSpecialty}>{activeDoctorChat?.specialty}</p>
              </div>
            </div>
            <div style={styles.doctorChatActions}>
              <button 
                style={styles.closeModalButton}
                onClick={() => setShowDoctorChat(false)}
                type="button"
              >
                ×
              </button>
            </div>
          </div>

          <div style={styles.doctorChatMessages}>
            {currentChat.map(chatMessage => (
              <div
                key={chatMessage.id}
                style={{
                  ...styles.chatMessage,
                  ...styles[`${chatMessage.sender}Message`]
                }}
              >
                <div style={{
                  ...styles.messageBubble,
                  ...styles[`${chatMessage.sender}MessageBubble`]
                }}>
                  {chatMessage.text}
                </div>
                <span style={styles.messageTime}>
                  {chatMessage.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          <div style={styles.doctorChatInputContainer}>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message to the doctor..."
              style={styles.doctorChatInput}
              autoFocus
            />
            <button 
              style={styles.sendButton}
              onClick={handleSendMessage}
              type="button"
              disabled={!message.trim()}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Checkout Confirmation Modal
  const CheckoutConfirmation = () => (
    <div style={styles.modalOverlay}>
      <div style={styles.confirmationModal}>
        <h3 style={styles.confirmationTitle}>Confirm Checkout</h3>
        <p style={styles.confirmationText}>
          You are about to proceed with your order. Total amount: <strong>₹{getTotalPrice()}</strong>
        </p>
        
        <div style={styles.confirmationItems}>
          {cart.map(item => (
            <div key={item.id} style={styles.confirmationItem}>
              <span>{item.name}</span>
              <span>₹{item.price} × {item.quantity}</span>
            </div>
          ))}
        </div>

        <div style={styles.confirmationActions}>
          <button 
            style={styles.cancelButton}
            onClick={handleCancelCheckout}
            disabled={paymentLoading}
            type="button"
          >
            Cancel
          </button>
          <button 
            style={styles.confirmButton}
            onClick={handleConfirmCheckout}
            disabled={paymentLoading}
            type="button"
          >
            {paymentLoading ? 'Processing...' : 'Proceed to Payment'}
          </button>
        </div>
      </div>
    </div>
  );

  // Updated Prescription Upload Modal with Image Preview
  const PrescriptionUploadModal = () => (
    <div style={styles.modalOverlay}>
      <div style={styles.prescriptionModal}>
        <h3 style={styles.modalTitle}>Upload Prescription</h3>
        
        <div style={styles.prescriptionPreview}>
          {prescriptionPreview ? (
            <div style={styles.prescriptionImageContainer}>
              <img 
                src={prescriptionPreview} 
                alt="Prescription preview" 
                style={styles.prescriptionImage}
              />
              <div style={styles.fileInfoOverlay}>
                <span style={styles.fileIcon}>📄</span>
                <div>
                  <p style={styles.fileName}>{prescriptionFile.name}</p>
                  <p style={styles.fileSize}>
                    {(prescriptionFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
            </div>
          ) : prescriptionFile ? (
            <div style={styles.fileInfo}>
              <span style={styles.fileIcon}>📄</span>
              <div>
                <p style={styles.fileName}>{prescriptionFile.name}</p>
                <p style={styles.fileSize}>
                  {(prescriptionFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
          ) : (
            <div style={styles.uploadPrompt}>
              <div style={styles.uploadIconLarge}>📎</div>
              <p style={styles.uploadText}>No file selected</p>
              <p style={styles.uploadSubtext}>Supported formats: JPG, PNG, PDF (Max 5MB)</p>
            </div>
          )}
        </div>

        <div style={styles.prescriptionRequirements}>
          <h4 style={styles.requirementsTitle}>Prescription Requirements:</h4>
          <ul style={styles.requirementsList}>
            <li>Clear image of your doctor's prescription</li>
            <li>All text should be readable</li>
            <li>Doctor's signature and stamp should be visible</li>
            <li>Supported formats: JPG, PNG, PDF</li>
            <li>Maximum file size: 5MB</li>
          </ul>
        </div>

        <div style={styles.modalActions}>
          <label style={styles.uploadButton}>
            <span style={styles.uploadIcon}>📎</span>
            {prescriptionFile ? 'Change File' : 'Choose File'}
            <input
              type="file"
              accept=".jpg,.jpeg,.png,.pdf"
              onChange={handlePrescriptionUpload}
              style={{ display: 'none' }}
            />
          </label>
          <button 
            style={styles.submitButton}
            onClick={handlePrescriptionSubmit}
            disabled={!prescriptionFile}
            type="button"
          >
            Upload Prescription
          </button>
          <button 
            style={styles.cancelButton}
            onClick={() => {
              setShowPrescriptionModal(false);
              setPrescriptionFile(null);
              setPrescriptionPreview(null);
            }}
            type="button"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  // Logout Confirmation Modal
  const LogoutConfirmation = () => (
    <div style={styles.modalOverlay}>
      <div style={styles.logoutConfirmationModal}>
        <div style={styles.logoutConfirmationIcon}></div>
        <h3 style={styles.logoutConfirmationTitle}>Confirm Logout</h3>
        <p style={styles.logoutConfirmationText}>
          Are you sure you want to logout from your QuickMed account?
        </p>
        <div style={styles.logoutConfirmationActions}>
          <button 
            style={styles.logoutCancelButton}
            onClick={cancelLogout}
            type="button"
          >
            Cancel
          </button>
          <button 
            style={styles.logoutConfirmButton}
            onClick={confirmLogout}
            type="button"
          >
            Yes, Logout
          </button>
        </div>
      </div>
    </div>
  );

  // Pharmacy Store Modal with Search
  const PharmacyStoreModal = () => {
    const filteredMedicines = getFilteredPharmacyMedicines(selectedPharmacy);
    const searchQuery = pharmacySearchQueries[selectedPharmacy?.id] || '';

    return (
      <div style={styles.modalOverlay}>
        <div style={styles.pharmacyStoreModal}>
          <div style={styles.pharmacyStoreHeader}>
            <h3 style={styles.modalTitle}>{selectedPharmacy?.name}</h3>
            <button 
              style={styles.closeModalButton}
              onClick={() => setShowPharmacyStore(false)}
              type="button"
            >
              ×
            </button>
          </div>
          
          <div style={styles.pharmacyInfoSection}>
            <div style={styles.pharmacyDetailsSection}>
              <p style={styles.pharmacyDistance}>📍 {selectedPharmacy?.distance} away</p>
              <p style={styles.pharmacyDelivery}>🚚 Delivery: {selectedPharmacy?.deliveryTime}</p>
              <p style={styles.pharmacyRatingText}>⭐ {selectedPharmacy?.rating} Rating</p>
            </div>
          </div>

          {/* Search Bar for Pharmacy Medicines */}
          <div style={styles.pharmacySearchSection}>
            <input
              type="text"
              placeholder="Search for medicines in this pharmacy..."
              value={searchQuery}
              onChange={(e) => handlePharmacySearch(selectedPharmacy.id, e.target.value)}
              style={styles.pharmacySearchInput}
            />
          </div>

          <div style={styles.pharmacyMedicines}>
            <h4 style={styles.medicinesTitle}>Available Medicines</h4>
            <div style={styles.medicinesGrid}>
              {filteredMedicines.length === 0 ? (
                <div style={styles.noMedicinesFound}>
                  <p>No medicines found matching your search.</p>
                </div>
              ) : (
                filteredMedicines.map(medicine => (
                  <div key={medicine.id} style={styles.medicineItem}>
                    <div style={styles.medicineInfo}>
                      <h5 style={styles.medicineName}>{medicine.name}</h5>
                      <p style={styles.medicineCategory}>{medicine.category}</p>
                      <p style={styles.medicinePrice}>₹{medicine.price}</p>
                    </div>
                    <button 
                      style={styles.addToCartPharmacyButton}
                      onClick={() => addToCartFromPharmacy(medicine)}
                      type="button"
                    >
                      Add to Cart
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          <div style={styles.pharmacyActions}>
            <button 
              style={styles.backToPharmaciesButton}
              onClick={() => setShowPharmacyStore(false)}
              type="button"
            >
              Back to Pharmacies
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Appointment Details Modal
  const AppointmentDetailsModal = () => (
    <div style={styles.modalOverlay}>
      <div style={styles.appointmentDetailsModal}>
        <div style={styles.appointmentDetailsHeader}>
          <h3 style={styles.modalTitle}>Appointment Details</h3>
          <button 
            style={styles.closeModalButton}
            onClick={() => setShowAppointmentDetails(false)}
            type="button"
          >
            ×
          </button>
        </div>

        <div style={styles.appointmentDetailsContent}>
          <div style={styles.detailSection}>
            <h4 style={styles.detailSectionTitle}>Basic Information</h4>
            <div style={styles.detailGrid}>
              <div style={styles.detailItem}>
                <span style={styles.detailLabel}>Appointment ID:</span>
                <span style={styles.detailValue}>{selectedAppointment?.id}</span>
              </div>
              <div style={styles.detailItem}>
                <span style={styles.detailLabel}>Doctor:</span>
                <span style={styles.detailValue}>{selectedAppointment?.doctorName}</span>
              </div>
              <div style={styles.detailItem}>
                <span style={styles.detailLabel}>Specialty:</span>
                <span style={styles.detailValue}>{selectedAppointment?.specialty}</span>
              </div>
              <div style={styles.detailItem}>
                <span style={styles.detailLabel}>Date & Time:</span>
                <span style={styles.detailValue}>{selectedAppointment?.date} at {selectedAppointment?.time}</span>
              </div>
              <div style={styles.detailItem}>
                <span style={styles.detailLabel}>Type:</span>
                <span style={styles.detailValue}>{selectedAppointment?.type}</span>
              </div>
              <div style={styles.detailItem}>
                <span style={styles.detailLabel}>Fee:</span>
                <span style={styles.detailValue}>₹{selectedAppointment?.fee}</span>
              </div>
              <div style={styles.detailItem}>
                <span style={styles.detailLabel}>Status:</span>
                <span style={{
                  ...styles.statusBadge,
                  backgroundColor: 
                    selectedAppointment?.status === 'Scheduled' ? '#4CAF50' :
                    selectedAppointment?.status === 'Completed' ? '#2196F3' :
                    selectedAppointment?.status === 'Cancelled' ? '#FF6B6B' :
                    selectedAppointment?.status === 'Rescheduled' ? '#FF9800' : '#9E9E9E'
                }}>
                  {selectedAppointment?.status}
                </span>
              </div>
            </div>
          </div>

          <div style={styles.detailSection}>
            <h4 style={styles.detailSectionTitle}>Patient Details</h4>
            <div style={styles.detailGrid}>
              <div style={styles.detailItem}>
                <span style={styles.detailLabel}>Patient Name:</span>
                <span style={styles.detailValue}>{selectedAppointment?.details.patientName}</span>
              </div>
              <div style={styles.detailItem}>
                <span style={styles.detailLabel}>Symptoms:</span>
                <span style={styles.detailValue}>{selectedAppointment?.details.symptoms}</span>
              </div>
              <div style={styles.detailItem}>
                <span style={styles.detailLabel}>Notes:</span>
                <span style={styles.detailValue}>{selectedAppointment?.details.notes}</span>
              </div>
              <div style={styles.detailItem}>
                <span style={styles.detailLabel}>Prescription:</span>
                <span style={styles.detailValue}>{selectedAppointment?.details.prescription}</span>
              </div>
            </div>
          </div>
        </div>

        <div style={styles.appointmentDetailsActions}>
          <button 
            style={styles.closeDetailsButton}
            onClick={() => setShowAppointmentDetails(false)}
            type="button"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );

  // Doctor Card Component with Golden Stars and Real-time Chat
  const DoctorCard = ({ doctor }) => (
    <div style={styles.doctorCard}>
      <div style={styles.doctorHeader}>
        <div style={styles.doctorImage}>
          {doctor.image}
        </div>
        <div style={styles.doctorBasicInfo}>
          <h4 style={styles.doctorName}>{doctor.name}</h4>
          <p style={styles.doctorSpecialty}>{doctor.specialty}</p>
          <div style={styles.doctorRating}>
            <span style={styles.goldenStars}>
              {'★'.repeat(doctor.rating)}
              {'☆'.repeat(5 - doctor.rating)}
            </span>
            <span style={styles.ratingText}>({doctor.rating}.0)</span>
          </div>
        </div>
      </div>

      <div style={styles.doctorDetails}>
        <div style={styles.doctorDetailItem}>
          <span style={styles.doctorDetailLabel}>Experience:</span>
          <span style={styles.doctorDetailValue}>{doctor.experience}</span>
        </div>
        <div style={styles.doctorDetailItem}>
          <span style={styles.doctorDetailLabel}>Languages:</span>
          <span style={styles.doctorDetailValue}>{doctor.languages.join(', ')}</span>
        </div>
        <div style={styles.doctorDetailItem}>
          <span style={styles.doctorDetailLabel}>Consultation Fee:</span>
          <span style={styles.feeValue}>₹{doctor.consultationFee}</span>
        </div>
      </div>

      <div style={styles.doctorActions}>
        <button 
          style={styles.bookButton}
          onClick={() => {
            const selectedTimeSlot = prompt('Select time slot:\n' + doctor.availableSlots.join('\n'), doctor.availableSlots[0]);
            if (selectedTimeSlot) {
              handleBookAppointment(doctor, selectedTimeSlot);
            }
          }}
          type="button"
        >
          Book Appointment
        </button>
        <button 
          style={styles.messageButton}
          onClick={() => startDoctorChat(doctor)}
          type="button"
        >
          Send Message
        </button>
      </div>
    </div>
  );

  // Nearby Pharmacies Section Component with Search
  const NearbyPharmaciesSection = () => (
    <section style={styles.pharmaciesSection}>
      <div style={styles.sectionHeader}>
        <h3 style={styles.sectionTitle}>Nearby Medical Shops</h3>
        <p style={styles.sectionSubtitle}>Fast delivery from trusted pharmacies</p>
      </div>
      <div style={styles.pharmaciesGrid}>
        {pharmacies.map(pharmacy => (
          <div key={pharmacy.id} style={styles.pharmacyCard}>
            <div style={styles.pharmacyHeader}>
              <div style={styles.pharmacyIcon}>🏪</div>
              <div style={styles.pharmacyInfo}>
                <h4 style={styles.pharmacyName}>{pharmacy.name}</h4>
                <div style={styles.pharmacyRating}>
                  ⭐ {pharmacy.rating}
                </div>
              </div>
            </div>
            <div style={styles.pharmacyDetails}>
              <div style={styles.pharmacyDetailItem}>
                <span style={styles.pharmacyDetailLabel}>Distance:</span>
                <span style={styles.pharmacyDetailValue}>{pharmacy.distance}</span>
              </div>
              <div style={styles.pharmacyDetailItem}>
                <span style={styles.pharmacyDetailLabel}>Delivery Time:</span>
                <span style={styles.pharmacyDetailValue}>{pharmacy.deliveryTime}</span>
              </div>
            </div>
            
            {/* Search Bar for Individual Pharmacy */}
            <div style={styles.pharmacySearchContainer}>
              <input
                type="text"
                placeholder={`Search medicines in ${pharmacy.name}...`}
                value={pharmacySearchQueries[pharmacy.id] || ''}
                onChange={(e) => handlePharmacySearch(pharmacy.id, e.target.value)}
                style={styles.pharmacySearchInputSmall}
              />
            </div>
            
            <button 
              style={styles.viewButton} 
              onClick={() => viewPharmacyStore(pharmacy)}
              type="button"
            >
              View Store
            </button>
          </div>
        ))}
      </div>
    </section>
  );

  // Medicine Card with Quantity Controls
  const MedicineCard = ({ medicine }) => {
    const cartItem = cart.find(item => item.id === medicine.id);
    const quantity = cartItem ? cartItem.quantity : 0;

    return (
      <div style={styles.productCard}>
        <div style={styles.productInfo}>
          <h4 style={styles.productName}>{medicine.name}</h4>
          <p style={styles.productVendor}>{medicine.vendor}</p>
          <div style={styles.productCategory}>
            <span style={styles.categoryBadge}>{medicine.category}</span>
          </div>
          <div style={styles.productFooter}>
            <p style={styles.productPrice}>₹{medicine.price}</p>
            <div style={styles.quantityControls}>
              {quantity > 0 ? (
                <>
                  <button 
                    style={styles.quantityButton}
                    onClick={() => updateQuantity(medicine.id, quantity - 1)}
                    type="button"
                  >
                    −
                  </button>
                  <span style={styles.quantity}>{quantity}</span>
                  <button 
                    style={styles.quantityButton}
                    onClick={() => updateQuantity(medicine.id, quantity + 1)}
                    type="button"
                  >
                    +
                  </button>
                </>
              ) : (
                <button 
                  style={styles.addToCartButton}
                  onClick={() => addToCart(medicine)}
                  type="button"
                >
                  Add to Cart
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Back Button Component
  const BackButton = ({ onClick, text = 'Back' }) => (
    <button 
      style={styles.backButton}
      onClick={onClick}
      type="button"
    >
      ← {text}
    </button>
  );

  // Appointments View Component
  const AppointmentsView = () => (
    <div style={styles.appointmentsContainer}>
      <div style={styles.pageHeader}>
        <BackButton onClick={() => setActiveView('dashboard')} text="Back to Home" />
        <h2 style={styles.sectionTitle}>My Appointments</h2>
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

      {appointments.length === 0 ? (
        <div style={styles.noAppointments}>
          <p style={styles.noAppointmentsText}>No appointments scheduled</p>
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
          {appointments.map(appointment => (
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
                      appointment.status === 'Rescheduled' ? '#FF9800' : '#9E9E9E'
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

  // Live Tracking View Component
  const LiveTrackingView = () => (
    <div style={styles.liveTrackingContainer}>
      <div style={styles.trackingHeader}>
        <BackButton onClick={() => setActiveView('orders')} text="Back to Orders" />
        <h2 style={styles.trackingTitle}>Live Order Tracking</h2>
        <p style={styles.trackingSubtitle}>Order #{trackingOrder?.id}</p>
      </div>

      <div style={styles.trackingContent}>
        <div style={styles.mapContainer}>
          <iframe
            src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d248756.11675378976!2d77.4651372271771!3d12.953945987030732!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v${Date.now()}!5m2!1sen!2sin`}
            width="100%"
            height="100%"
            style={{ border: 0, borderRadius: '15px' }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Live Order Tracking Map"
          ></iframe>
        </div>

        <div style={styles.trackingSidebar}>
          <div style={styles.deliveryInfo}>
            <h3 style={styles.sidebarTitle}>Delivery Information</h3>
            
            <div style={styles.progressSection}>
              <div style={styles.progressBar}>
                <div 
                  style={{
                    ...styles.progressFill,
                    width: `${getDeliveryProgress(deliveryPartner.status)}%`
                  }}
                ></div>
              </div>
              <div style={styles.progressLabels}>
                <span>Order Placed</span>
                <span>On the Way</span>
                <span>Delivered</span>
              </div>
            </div>

            <div style={styles.statusCard}>
              <div style={styles.currentStatus}>
                <span style={styles.statusLabel}>Current Status:</span>
                <span style={styles.statusValue}>
                  {getDeliveryStatusText(deliveryPartner.status)}
                </span>
              </div>
              <div style={styles.eta}>
                <span style={styles.etaLabel}>Estimated Time:</span>
                <span style={styles.etaValue}>{deliveryPartner.estimatedTime}</span>
              </div>
            </div>

            <div style={styles.deliveryPartner}>
              <h4 style={styles.partnerTitle}>Delivery Partner</h4>
              <div style={styles.partnerInfo}>
                <div style={styles.partnerAvatar}>
                  {deliveryPartner.name.charAt(0)}
                </div>
                <div style={styles.partnerDetails}>
                  <p style={styles.partnerName}>{deliveryPartner.name}</p>
                  <p style={styles.partnerVehicle}>
                    {deliveryPartner.vehicle} • {deliveryPartner.vehicleNumber}
                  </p>
                  <div style={styles.partnerRating}>
                    ⭐ {deliveryPartner.rating}
                  </div>
                </div>
              </div>
              <button 
                style={styles.callButton}
                onClick={callDeliveryPartner}
                type="button"
              >
                📞 Call Delivery Partner
              </button>
            </div>

            <div style={styles.orderSummary}>
              <h4 style={styles.summaryTitleText}>Order Summary</h4>
              {trackingOrder.items.map((item, index) => (
                <div key={index} style={styles.orderSummaryItem}>
                  <span>{item.name}</span>
                  <span>Qty: {item.quantity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Profile View - Fixed with local state management
  const ProfileView = () => {
    // Move the form state to local component state for better control
    const [localProfile, setLocalProfile] = useState(userProfile);
    const [localFormErrors, setLocalFormErrors] = useState({});
    const [localIsFormValid, setLocalIsFormValid] = useState(false);
    const [localIsFormTouched, setLocalIsFormTouched] = useState(false);

    // Local validation function
    const validateLocalForm = () => {
      const errors = {};

      // Full Name validation (only alphabets and spaces, required)
      if (!localProfile.fullName.trim()) {
        errors.fullName = 'Full Name is required';
      } else if (!/^[A-Za-z\s]+$/.test(localProfile.fullName)) {
        errors.fullName = 'Full Name should contain only alphabets';
      }

      // Email validation (required)
      if (!localProfile.email.trim()) {
        errors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(localProfile.email)) {
        errors.email = 'Please enter a valid email address';
      }

      // Phone validation (only numbers, 10 digits, required)
      if (!localProfile.phone.trim()) {
        errors.phone = 'Phone number is required';
      } else if (!/^\d{10}$/.test(localProfile.phone)) {
        errors.phone = 'Phone number must be 10 digits';
      }

      // Address validation (required)
      if (!localProfile.address.trim()) {
        errors.address = 'Address is required';
      }

      // City validation (only alphabets and spaces, required)
      if (!localProfile.city.trim()) {
        errors.city = 'City is required';
      } else if (!/^[A-Za-z\s]+$/.test(localProfile.city)) {
        errors.city = 'City should contain only alphabets';
      }

      // Pincode validation (only numbers, 6 digits, required)
      if (!localProfile.pincode.trim()) {
        errors.pincode = 'Pincode is required';
      } else if (!/^\d{6}$/.test(localProfile.pincode)) {
        errors.pincode = 'Pincode must be 6 digits';
      }

      // Date of Birth validation (required)
      if (!localProfile.dateOfBirth.trim()) {
        errors.dateOfBirth = 'Date of Birth is required';
      }

      // Age validation (1-120, required)
      if (!localProfile.age.trim()) {
        errors.age = 'Age is required';
      } else if (!/^\d+$/.test(localProfile.age) || parseInt(localProfile.age) < 1 || parseInt(localProfile.age) > 120) {
        errors.age = 'Age must be between 1 and 120';
      }

      // Gender validation (required)
      if (!localProfile.gender.trim()) {
        errors.gender = 'Gender is required';
      }

      setLocalFormErrors(errors);
      setLocalIsFormValid(Object.keys(errors).length === 0);
    };

    useEffect(() => {
      validateLocalForm();
    }, [localProfile]);

    const handleLocalProfileChange = (e) => {
      const { name, value } = e.target;
      
      // Only process/sanitize on blur, not on change
      setLocalProfile(prev => ({
        ...prev,
        [name]: value
      }));
      
      setLocalIsFormTouched(true);
    };

    const handleLocalProfileBlur = (e) => {
      const { name, value } = e.target;
      let processedValue = value;

      // Input sanitization based on field type - only on blur
      switch (name) {
        case 'fullName':
          // Only allow alphabets and spaces
          processedValue = value.replace(/[^A-Za-z\s]/g, '');
          break;
        case 'city':
          // Only allow alphabets and spaces
          processedValue = value.replace(/[^A-Za-z\s]/g, '');
          break;
        case 'phone':
          // Only allow numbers, max 10 digits
          processedValue = value.replace(/\D/g, '').slice(0, 10);
          break;
        case 'pincode':
          // Only allow numbers, max 6 digits
          processedValue = value.replace(/\D/g, '').slice(0, 6);
          break;
        case 'age':
          // Only allow numbers
          processedValue = value.replace(/\D/g, '');
          if (processedValue && (parseInt(processedValue) < 1 || parseInt(processedValue) > 120)) {
            processedValue = processedValue.slice(0, -1);
          }
          break;
        default:
          processedValue = value;
      }

      if (name === 'dateOfBirth' && value) {
        const today = new Date();
        const birthDate = new Date(value);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        
        setLocalProfile(prev => ({
          ...prev,
          [name]: value,
          age: age.toString()
        }));
      } else if (processedValue !== value) {
        // Only update if value changed during sanitization
        setLocalProfile(prev => ({
          ...prev,
          [name]: processedValue
        }));
      }
    };

    const handleLocalProfileUpdate = (e) => {
      e.preventDefault();
      setLocalIsFormTouched(true);
      
      if (!localIsFormValid) {
        alert('Please fix all form errors before updating.');
        return;
      }
      
      // Update the main user profile state
      setUserProfile(localProfile);
      
      // Update user profile in parent component (if provided)
      if (user && typeof user === 'object') {
        user.fullName = localProfile.fullName;
        user.email = localProfile.email;
        user.phone = localProfile.phone;
      }
      
      alert('Profile updated successfully!');
      addNotification('Profile Updated', 'Your profile information has been updated successfully', 'info');
      
      setLocalIsFormTouched(false);
    };

    return (
      <div style={styles.profileContainer}>
        <div style={styles.pageHeader}>
          <BackButton onClick={() => setActiveView('dashboard')} text="Back to Home" />
          <h2 style={styles.sectionTitle}>My Profile</h2>
        </div>
        
        <form onSubmit={handleLocalProfileUpdate} style={styles.profileForm}>
          <div style={styles.formGrid}>
            <div style={styles.formGroup}>
              <label style={styles.formLabel}>Full Name *</label>
              <input
                type="text"
                name="fullName"
                value={localProfile.fullName}
                onChange={handleLocalProfileChange}
                onBlur={handleLocalProfileBlur}
                style={{
                  ...styles.formInput,
                  ...(localIsFormTouched && localFormErrors.fullName && styles.formInputError)
                }}
                required
              />
              {localIsFormTouched && localFormErrors.fullName && <span style={styles.formError}>{localFormErrors.fullName}</span>}
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.formLabel}>Email *</label>
              <input
                type="email"
                name="email"
                value={localProfile.email}
                onChange={handleLocalProfileChange}
                onBlur={handleLocalProfileBlur}
                style={{
                  ...styles.formInput,
                  ...(localIsFormTouched && localFormErrors.email && styles.formInputError)
                }}
                required
              />
              {localIsFormTouched && localFormErrors.email && <span style={styles.formError}>{localFormErrors.email}</span>}
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.formLabel}>Phone *</label>
              <input
                type="tel"
                name="phone"
                value={localProfile.phone}
                onChange={handleLocalProfileChange}
                onBlur={handleLocalProfileBlur}
                style={{
                  ...styles.formInput,
                  ...(localIsFormTouched && localFormErrors.phone && styles.formInputError)
                }}
                required
              />
              {localIsFormTouched && localFormErrors.phone && <span style={styles.formError}>{localFormErrors.phone}</span>}
            </div>

            <div style={styles.formGroup}>
              <label style={styles.formLabel}>Date of Birth *</label>
              <input
                type="date"
                name="dateOfBirth"
                value={localProfile.dateOfBirth}
                onChange={handleLocalProfileChange}
                onBlur={handleLocalProfileBlur}
                style={{
                  ...styles.formInput,
                  ...(localIsFormTouched && localFormErrors.dateOfBirth && styles.formInputError)
                }}
                required
              />
              {localIsFormTouched && localFormErrors.dateOfBirth && <span style={styles.formError}>{localFormErrors.dateOfBirth}</span>}
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.formLabel}>Age *</label>
              <input
                type="text"
                name="age"
                value={localProfile.age}
                onChange={handleLocalProfileChange}
                onBlur={handleLocalProfileBlur}
                style={{
                  ...styles.formInput,
                  ...(localIsFormTouched && localFormErrors.age && styles.formInputError)
                }}
                placeholder="Enter your age"
                required
              />
              {localIsFormTouched && localFormErrors.age && <span style={styles.formError}>{localFormErrors.age}</span>}
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.formLabel}>Gender *</label>
              <select
                name="gender"
                value={localProfile.gender}
                onChange={handleLocalProfileChange}
                style={{
                  ...styles.formInput,
                  ...(localIsFormTouched && localFormErrors.gender && styles.formInputError)
                }}
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="prefer-not-to-say">Prefer not to say</option>
              </select>
              {localIsFormTouched && localFormErrors.gender && <span style={styles.formError}>{localFormErrors.gender}</span>}
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.formLabel}>Address *</label>
              <textarea
                name="address"
                value={localProfile.address}
                onChange={handleLocalProfileChange}
                onBlur={handleLocalProfileBlur}
                style={{
                  ...styles.formTextarea,
                  ...(localIsFormTouched && localFormErrors.address && styles.formInputError)
                }}
                rows="3"
                placeholder="Enter your complete address"
                required
              />
              {localIsFormTouched && localFormErrors.address && <span style={styles.formError}>{localFormErrors.address}</span>}
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.formLabel}>City *</label>
              <input
                type="text"
                name="city"
                value={localProfile.city}
                onChange={handleLocalProfileChange}
                onBlur={handleLocalProfileBlur}
                style={{
                  ...styles.formInput,
                  ...(localIsFormTouched && localFormErrors.city && styles.formInputError)
                }}
                required
              />
              {localIsFormTouched && localFormErrors.city && <span style={styles.formError}>{localFormErrors.city}</span>}
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.formLabel}>Pincode *</label>
              <input
                type="text"
                name="pincode"
                value={localProfile.pincode}
                onChange={handleLocalProfileChange}
                onBlur={handleLocalProfileBlur}
                style={{
                  ...styles.formInput,
                  ...(localIsFormTouched && localFormErrors.pincode && styles.formInputError)
                }}
                required
              />
              {localIsFormTouched && localFormErrors.pincode && <span style={styles.formError}>{localFormErrors.pincode}</span>}
            </div>
          </div>
          
          <div style={styles.formNote}>
            <p style={styles.noteText}>* Please fill in all mandatory fields marked with an asterisk (*)</p>
          </div>
          
          <button 
            type="submit" 
            style={{
              ...styles.updateButton,
              ...(!localIsFormValid && styles.updateButtonDisabled)
            }}
            disabled={!localIsFormValid}
          >
            Update Profile
          </button>
        </form>
      </div>
    );
  };

  // Main Dashboard View
  if (activeView === 'dashboard') {
    return (
      <div style={styles.container}>
        <EnhancedHeader />
        {showCheckoutConfirm && <CheckoutConfirmation />}
        {showPrescriptionModal && <PrescriptionUploadModal />}
        {showPharmacyStore && <PharmacyStoreModal />}
        {showAppointmentDetails && <AppointmentDetailsModal />}
        {showDoctorChat && <DoctorChatModal />}
        {showLogoutConfirm && <LogoutConfirmation />}

        <div style={styles.mainContent}>
          <section style={styles.welcomeSection}>
            <h2 style={styles.welcomeTitle}>
              Welcome back, {userProfile.fullName || 'User'}! 👋
            </h2>
            <p style={styles.welcomeSubtitle}>
              How can we help you today?
            </p>
          </section>

          <section style={styles.servicesSection}>
            <div style={styles.serviceGrid}>
              <div 
                style={styles.serviceCard}
                onClick={() => setActiveView('medicine')}
              >
                <div style={styles.serviceIcon}>💊</div>
                <h3 style={styles.serviceTitle}>Medicine Delivery</h3>
                <p style={styles.serviceDescription}>
                  Get your prescribed medicines delivered to your doorstep within hours
                </p>
                <button style={styles.serviceButton} type="button">
                  Order Now
                </button>
              </div>

              <div 
                style={styles.serviceCard}
                onClick={() => setActiveView('consultation')}
              >
                <div style={styles.serviceIcon}>👨‍⚕️</div>
                <h3 style={styles.serviceTitle}>Doctor Consultation</h3>
                <p style={styles.serviceDescription}>
                  Connect with certified doctors online for quick consultations
                </p>
                <button style={styles.serviceButton} type="button">
                  Book Consultation
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }

  // Appointments View
  if (activeView === 'appointments') {
    return (
      <div style={styles.container}>
        <EnhancedHeader />
        {showAppointmentDetails && <AppointmentDetailsModal />}
        {showLogoutConfirm && <LogoutConfirmation />}
        <AppointmentsView />
      </div>
    );
  }

  // Medicine Delivery View with Prescription Upload
  if (activeView === 'medicine') {
    return (
      <div style={styles.container}>
        <EnhancedHeader />
        {showCheckoutConfirm && <CheckoutConfirmation />}
        {showPrescriptionModal && <PrescriptionUploadModal />}
        {showPharmacyStore && <PharmacyStoreModal />}
        {showDoctorChat && <DoctorChatModal />}
        {showLogoutConfirm && <LogoutConfirmation />}

        <div style={styles.medicineLayout}>
          <div style={styles.pageHeader}>
            <BackButton onClick={() => setActiveView('dashboard')} text="Back to Home" />
            <h2 style={styles.sectionTitle}>Medicine Delivery</h2>
          </div>

          <div style={styles.fullWidthContent}>
            <section style={styles.searchSection}>
              <div style={styles.searchContainer}>
                <input
                  type="text"
                  placeholder="Search for medicines, vendors, or categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={styles.searchInput}
                />
                <label style={styles.prescriptionUploadLabel}>
                  <span style={styles.uploadIcon}>📎</span>
                  Upload Prescription
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png,.pdf"
                    onChange={handlePrescriptionUpload}
                    style={{ display: 'none' }}
                  />
                </label>
                <button style={styles.searchButton} type="button">
                  Search
                </button>
              </div>
            </section>

            <section style={styles.productsSection}>
              <div style={styles.sectionHeader}>
                <h3 style={styles.sectionTitle}>Available Medicines</h3>
                <p style={styles.resultsCount}>{filteredMedicines.length} products found</p>
              </div>
              <div style={styles.productsGrid}>
                {filteredMedicines.map(medicine => (
                  <MedicineCard key={medicine.id} medicine={medicine} />
                ))}
              </div>
            </section>

            <NearbyPharmaciesSection />
          </div>
        </div>
      </div>
    );
  }

  // Live Tracking View
  if (activeView === 'live-tracking') {
    return (
      <div style={styles.container}>
        <EnhancedHeader />
        {showLogoutConfirm && <LogoutConfirmation />}
        <LiveTrackingView />
      </div>
    );
  }

  // Cart Page View
  if (activeView === 'cart') {
    return (
      <div style={styles.container}>
        <EnhancedHeader />
        {showCheckoutConfirm && <CheckoutConfirmation />}
        {showPrescriptionModal && <PrescriptionUploadModal />}
        {showDoctorChat && <DoctorChatModal />}
        {showLogoutConfirm && <LogoutConfirmation />}

        <div style={styles.cartPageContainer}>
          <div style={styles.pageHeader}>
            <BackButton onClick={() => setActiveView('medicine')} text="Back to Medicines" />
            <h2 style={styles.sectionTitle}>Your Shopping Cart</h2>
          </div>
          
          <div style={styles.cartPageContent}>
            <div style={styles.cartItemsSection}>
              <div style={styles.cartHeader}>
                <h3 style={styles.cartTitle}>Cart Items ({cart.length})</h3>
                {cart.length > 0 && (
                  <p style={styles.cartSubtitle}>Review your items before checkout</p>
                )}
              </div>
              
              <div style={styles.cartItems}>
                {cart.length === 0 ? (
                  <div style={styles.emptyCart}>
                    <div style={styles.emptyCartIcon}>🛒</div>
                    <p style={styles.emptyCartText}>Your cart is empty</p>
                    <p style={styles.emptyCartSubtext}>Add some medicines to get started</p>
                    <button 
                      style={styles.shopNowButton}
                      onClick={() => setActiveView('medicine')}
                      type="button"
                    >
                      Shop Medicines
                    </button>
                  </div>
                ) : (
                  <div style={styles.cartItemsList}>
                    {cart.map(item => (
                      <div key={item.id} style={styles.cartItem}>
                        <div style={styles.cartItemInfo}>
                          <h4 style={styles.cartItemName}>{item.name}</h4>
                          <p style={styles.cartItemVendor}>{item.vendor}</p>
                          <p style={styles.cartItemPrice}>₹{item.price} each</p>
                        </div>
                        <div style={styles.quantityControls}>
                          <button 
                            style={styles.quantityButton}
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            type="button"
                          >
                            −
                          </button>
                          <span style={styles.quantity}>{item.quantity}</span>
                          <button 
                            style={styles.quantityButton}
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            type="button"
                          >
                            +
                          </button>
                        </div>
                        <div style={styles.itemTotal}>
                          ₹{item.price * item.quantity}
                        </div>
                        <button 
                          style={styles.removeButton}
                          onClick={() => removeFromCart(item.id)}
                          title="Remove item"
                          type="button"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {cart.length > 0 && (
              <div style={styles.cartSummarySection}>
                <div style={styles.summaryCard}>
                  <h3 style={styles.summaryTitle}>Order Summary</h3>
                  <div style={styles.summaryDetails}>
                    <div style={styles.summaryRow}>
                      <span>Subtotal:</span>
                      <span>₹{getTotalPrice()}</span>
                    </div>
                    <div style={styles.summaryRow}>
                      <span>Delivery Fee:</span>
                      <span style={styles.freeDelivery}>Free</span>
                    </div>
                    <div style={styles.summaryRow}>
                      <span>Tax:</span>
                      <span>₹0</span>
                    </div>
                    <div style={styles.grandTotal}>
                      <span>Total:</span>
                      <span>₹{getTotalPrice()}</span>
                    </div>
                  </div>
                  <button 
                    style={styles.checkoutButtonLarge}
                    onClick={handleCheckoutConfirmation}
                    disabled={paymentLoading}
                    type="button"
                  >
                    {paymentLoading ? 'Processing...' : 'Proceed to Checkout'}
                  </button>
                </div>
            </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Orders View with Live Tracking
  if (activeView === 'orders') {
    return (
      <div style={styles.container}>
        <EnhancedHeader />
        {showDoctorChat && <DoctorChatModal />}
        {showLogoutConfirm && <LogoutConfirmation />}

        <div style={styles.ordersContainer}>
          <div style={styles.pageHeader}>
            <BackButton onClick={() => setActiveView('dashboard')} text="Back to Home" />
            <h2 style={styles.sectionTitle}>My Orders</h2>
          </div>
          
          {orders.length === 0 ? (
            <div style={styles.noOrders}>
              <p style={styles.noOrdersText}>No orders yet</p>
              <button 
                style={styles.shopNowButton}
                onClick={() => setActiveView('medicine')}
                type="button"
              >
                Shop Now
              </button>
            </div>
          ) : (
            <div style={styles.ordersList}>
              {orders.map(order => (
                <div key={order.id} style={styles.orderCard}>
                  <div style={styles.orderHeader}>
                    <div>
                      <h3 style={styles.orderId}>Order #{order.id}</h3>
                      <p style={styles.orderDate}>Placed on {order.date}</p>
                      {order.paymentId && (
                        <p style={styles.paymentId}>Payment ID: {order.paymentId}</p>
                      )}
                    </div>
                    <div style={styles.orderStatus}>
                      <span style={{
                        ...styles.statusBadge,
                        backgroundColor: 
                          order.status === 'Delivered' ? '#4CAF50' :
                          order.status === 'In Transit' ? '#FF9800' :
                          order.status === 'On the Way' ? '#2196F3' :
                          order.status === 'Confirmed' ? '#9C27B0' : '#9E9E9E'
                      }}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                  
                  <div style={styles.orderItems}>
                    {order.items.map((item, index) => (
                      <div key={index} style={styles.orderItem}>
                        <span style={styles.itemName}>{item.name}</span>
                        <span style={styles.itemQuantity}>Qty: {item.quantity}</span>
                        <span style={styles.itemPrice}>₹{item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div style={styles.orderFooter}>
                    <div style={styles.orderAddress}>
                      <strong>Delivery Address:</strong> {order.deliveryAddress}
                    </div>
                    <div style={styles.orderActions}>
                      <div style={styles.orderTotal}>
                        <strong>Total: ₹{order.total}</strong>
                      </div>
                      {order.trackingAvailable && (order.status === 'In Transit' || order.status === 'On the Way') && (
                        <button 
                          style={styles.trackButton}
                          onClick={() => startLiveTracking(order)}
                          type="button"
                        >
                          📍 Live Track
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Profile View
  if (activeView === 'profile') {
    return (
      <div style={styles.container}>
        <EnhancedHeader />
        {showDoctorChat && <DoctorChatModal />}
        {showLogoutConfirm && <LogoutConfirmation />}
        <ProfileView />
      </div>
    );
  }

  // Doctor Consultation View
  if (activeView === 'consultation') {
    return (
      <div style={styles.container}>
        <EnhancedHeader />
        {showDoctorChat && <DoctorChatModal />}
        {showLogoutConfirm && <LogoutConfirmation />}

        <div style={styles.consultationContainer}>
          <div style={styles.pageHeader}>
            <BackButton onClick={() => setActiveView('dashboard')} text="Back to Home" />
            <div style={styles.consultationHeader}>
              <h2 style={styles.sectionTitle}>Doctor Consultation</h2>
              <p style={styles.consultationSubtitle}>
                Connect with certified doctors for online consultations
              </p>
            </div>
          </div>

          <div style={styles.searchSection}>
            <div style={styles.searchContainer}>
              <input
                type="text"
                placeholder="Search by specialty or doctor"
                value={doctorSearchQuery}
                onChange={(e) => setDoctorSearchQuery(e.target.value)}
                style={styles.searchInput}
              />
              <button style={styles.searchButton} type="button">Search</button>
            </div>
          </div>

          <div style={styles.consultationLayout}>
            <div style={styles.filterPanel}>
              <h3 style={styles.filterTitle}>Filters</h3>
              
              <div style={styles.filterGroup}>
                <label style={styles.filterLabel}>Specialty</label>
                <select 
                  value={selectedSpecialty}
                  onChange={(e) => setSelectedSpecialty(e.target.value)}
                  style={styles.filterSelect}
                >
                  <option value="">All Specialties</option>
                  {specialties.map(specialty => (
                    <option key={specialty} value={specialty}>{specialty}</option>
                  ))}
                </select>
              </div>

              <div style={styles.filterGroup}>
                <label style={styles.filterLabel}>Time Slot</label>
                <select 
                  value={selectedTimeSlot}
                  onChange={(e) => setSelectedTimeSlot(e.target.value)}
                  style={styles.filterSelect}
                >
                  <option value="">All Time Slots</option>
                  {allTimeSlots.map(slot => (
                    <option key={slot} value={slot}>{slot}</option>
                  ))}
                </select>
              </div>

              <button 
                style={styles.clearFiltersButton}
                onClick={() => {
                  setSelectedSpecialty('');
                  setSelectedTimeSlot('');
                  setSelectedExperience('');
                  setSelectedLanguage('');
                }}
                type="button"
              >
                Clear Filters
              </button>
            </div>

            <div style={styles.doctorsList}>
              <h3 style={styles.doctorsTitle}>Available Doctors</h3>
              
              {filteredDoctors.length === 0 ? (
                <div style={styles.noDoctors}>
                  <p>No doctors found matching your criteria</p>
                </div>
              ) : (
                <div style={styles.doctorsGrid}>
                  {filteredDoctors.map(doctor => (
                    <DoctorCard key={doctor.id} doctor={doctor} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <EnhancedHeader />
      {showLogoutConfirm && <LogoutConfirmation />}
      <div style={styles.mainContent}>
        <h2>Page not found</h2>
        <button onClick={() => setActiveView('dashboard')} type="button">Go to Home</button>
      </div>
    </div>
  );
};

// Complete CSS Styles with all new styles
const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f8fafc',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
  },
  // Header Styles
  header: {
    backgroundColor: '#7C2A62',
    color: 'white',
    boxShadow: '0 4px 20px rgba(124, 42, 98, 0.3)',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  headerTop: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
  },
  headerBottom: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.75rem 2rem',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  logoSection: {
    display: 'flex',
    alignItems: 'center',
  },
  logoContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  logo: {
    margin: 0,
    fontSize: '2rem',
    fontWeight: 'bold',
    background: 'linear-gradient(135deg, #fff, #F7D9EB)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  logoSubtitle: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    marginTop: '0.25rem',
  },
  subtitleText: {
    fontSize: '0.85rem',
    opacity: 0.9,
    fontWeight: '500',
  },
  userSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  userWelcome: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  welcomeText: {
    fontSize: '0.8rem',
    opacity: 0.8,
  },
  userName: {
    fontSize: '1rem',
    fontWeight: '600',
  },
  userAvatarContainer: {
    position: 'relative',
    cursor: 'pointer',
  },
  userAvatar: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: '#F7D9EB',
    color: '#7C2A62',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: '1.1rem',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    transition: 'all 0.3s ease',
  },
  // Profile Dropdown Styles
  profileDropdown: {
    position: 'absolute',
    top: '100%',
    right: 0,
    width: '300px',
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
    zIndex: 2000,
    marginTop: '0.5rem',
    overflow: 'hidden',
  },
  profileDropdownHeader: {
    padding: '1rem 1.5rem',
    backgroundColor: '#7C2A62',
    color: 'white',
  },
  profileDropdownTitle: {
    margin: 0,
    fontSize: '1.1rem',
    fontWeight: '600',
  },
  profileDropdownContent: {
    padding: '1rem 1.5rem',
    borderBottom: '1px solid #f0f0f0',
  },
  profileDetailItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.5rem 0',
    borderBottom: '1px solid #f8f8f8',
  },
  profileDetailLabel: {
    color: '#666',
    fontSize: '0.9rem',
    fontWeight: '500',
  },
  profileDetailValue: {
    color: '#333',
    fontSize: '0.9rem',
    fontWeight: '600',
  },
  profileDropdownActions: {
    padding: '1rem 1.5rem',
  },
  viewProfileButton: {
    width: '100%',
    padding: '0.75rem',
    backgroundColor: '#7C2A62',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '0.9rem',
  },
  navSection: {
    display: 'flex',
    alignItems: 'center',
  },
  nav: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  navButton: {
    padding: '0.75rem 1.5rem',
    border: 'none',
    backgroundColor: 'transparent',
    color: 'rgba(255, 255, 255, 0.8)',
    cursor: 'pointer',
    borderRadius: '8px',
    transition: 'all 0.3s ease',
    fontSize: '0.95rem',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  activeNavButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    color: 'white',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
  },
  navIcon: {
    fontSize: '1.1rem',
  },
  headerActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  // AI Chatbot Styles - Updated Symbol
  chatbotIconContainer: {
    display: 'flex',
    alignItems: 'center',
    padding: '0.5rem',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    border: '1px solid rgba(255, 255, 255, 0.2)',
  },
  chatbotIcon: {
    fontSize: '1.5rem',
  },
  chatbotContainer: {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    width: '350px',
    height: '500px',
    backgroundColor: 'white',
    borderRadius: '15px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
    zIndex: 2000,
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid #e0e0e0',
  },
  chatbotHeader: {
    padding: '1rem',
    backgroundColor: '#7C2A62',
    color: 'white',
    borderTopLeftRadius: '15px',
    borderTopRightRadius: '15px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexShrink: 0,
  },
  chatbotTitle: {
    margin: 0,
    fontSize: '1.1rem',
    fontWeight: '600',
  },
  closeChatbot: {
    background: 'none',
    border: 'none',
    color: 'white',
    fontSize: '1.5rem',
    cursor: 'pointer',
    padding: '0',
    width: '30px',
    height: '30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    transition: 'background-color 0.2s ease',
  },
  chatMessages: {
    flex: 1,
    padding: '1rem',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    backgroundColor: '#fafafa',
  },
  chatMessage: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '85%',
  },
  userMessage: {
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
  },
  botMessage: {
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
  },
  messageBubble: {
    padding: '0.75rem 1rem',
    borderRadius: '15px',
    fontSize: '0.9rem',
    lineHeight: '1.4',
    wordWrap: 'break-word',
    maxWidth: '100%',
  },
  userMessageBubble: {
    backgroundColor: '#7C2A62',
    color: 'white',
    borderBottomRightRadius: '5px',
  },
  botMessageBubble: {
    backgroundColor: '#e0e0e0',
    color: '#333',
    borderBottomLeftRadius: '5px',
  },
  messageTime: {
    fontSize: '0.7rem',
    color: '#666',
    marginTop: '0.25rem',
    padding: '0 0.5rem',
  },
  chatInputContainer: {
    padding: '1rem',
    borderTop: '1px solid #e0e0e0',
    display: 'flex',
    gap: '0.5rem',
    backgroundColor: 'white',
    borderBottomLeftRadius: '15px',
    borderBottomRightRadius: '15px',
    flexShrink: 0,
  },
  chatInput: {
    flex: 1,
    padding: '0.75rem 1rem',
    border: '1px solid #ddd',
    borderRadius: '25px',
    fontSize: '0.9rem',
    outline: 'none',
    transition: 'border-color 0.2s ease',
    backgroundColor: '#f8f9fa',
  },
  sendButton: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#7C2A62',
    color: 'white',
    border: 'none',
    borderRadius: '25px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '0.9rem',
    transition: 'all 0.2s ease',
    minWidth: '60px',
  },
  // Updated Doctor Chat Modal Styles
  doctorChatModal: {
    backgroundColor: 'white',
    padding: '0',
    borderRadius: '15px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
    width: '450px',
    height: '650px',
    display: 'flex',
    flexDirection: 'column',
  },
  doctorChatHeader: {
    padding: '1rem 1.5rem',
    backgroundColor: '#7C2A62',
    color: 'white',
    borderTopLeftRadius: '15px',
    borderTopRightRadius: '15px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  doctorChatInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    flex: 1,
  },
  doctorChatActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  goBackButton: {
    padding: '0.5rem 1rem',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    color: 'white',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.8rem',
    fontWeight: '500',
    transition: 'all 0.2s ease',
  },
  doctorImageSmall: {
    fontSize: '2rem',
    width: '50px',
    height: '50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: '50%',
  },
  doctorChatName: {
    margin: 0,
    fontSize: '1.1rem',
    fontWeight: '600',
  },
  doctorChatSpecialty: {
    margin: 0,
    fontSize: '0.9rem',
    opacity: 0.9,
  },
  doctorChatMessages: {
    flex: 1,
    padding: '1rem',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    backgroundColor: '#fafafa',
  },
  doctorChatInputContainer: {
    padding: '1rem',
    borderTop: '1px solid #e0e0e0',
    display: 'flex',
    gap: '0.5rem',
    backgroundColor: 'white',
    borderBottomLeftRadius: '15px',
    borderBottomRightRadius: '15px',
  },
  doctorChatInput: {
    flex: 1,
    padding: '0.75rem 1rem',
    border: '1px solid #ddd',
    borderRadius: '25px',
    fontSize: '0.9rem',
    outline: 'none',
  },
  closeModalButton: {
    background: 'none',
    border: 'none',
    fontSize: '1.8rem',
    cursor: 'pointer',
    color: 'white',
    padding: '0',
    width: '35px',
    height: '35px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    transition: 'background-color 0.2s ease',
  },
  // Golden Stars Style
  goldenStars: {
    color: '#FFD700',
    fontSize: '1.1rem',
  },
  // Upload Icon Style
  uploadIcon: {
    marginRight: '0.5rem',
    fontSize: '1rem',
  },
  // Cart Icon Styles
  cartIconContainer: {
    display: 'flex',
    alignItems: 'center',
    padding: '0.5rem',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    border: '1px solid rgba(255, 255, 255, 0.2)',
  },
  cartIcon: {
    position: 'relative',
    fontSize: '1.5rem',
  },
  cartBadge: {
    position: 'absolute',
    top: '-8px',
    right: '-8px',
    backgroundColor: '#FF6B6B',
    color: 'white',
    borderRadius: '50%',
    width: '20px',
    height: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.75rem',
    fontWeight: 'bold',
    border: '2px solid #7C2A62',
  },
  // Notification Styles
  notificationContainer: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    padding: '0.5rem',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    border: '1px solid rgba(255, 255, 255, 0.2)',
  },
  notificationBell: {
    position: 'relative',
    fontSize: '1.5rem',
  },
  notificationBadge: {
    position: 'absolute',
    top: '-8px',
    right: '-8px',
    backgroundColor: '#FF6B6B',
    color: 'white',
    borderRadius: '50%',
    width: '20px',
    height: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.75rem',
    fontWeight: 'bold',
    border: '2px solid #7C2A62',
  },
  notificationDropdown: {
    position: 'absolute',
    top: '100%',
    right: 0,
    width: '400px',
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
    zIndex: 2000,
    maxHeight: '500px',
    overflow: 'hidden',
  },
  notificationHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 1.5rem',
    borderBottom: '1px solid #f0f0f0',
    backgroundColor: '#f8f9fa',
  },
  notificationTitle: {
    margin: 0,
    color: '#7C2A62',
    fontSize: '1.1rem',
  },
  markAllReadButton: {
    background: 'none',
    border: 'none',
    color: '#7C2A62',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: '500',
  },
  notificationList: {
    maxHeight: '400px',
    overflowY: 'auto',
  },
  notificationItem: {
    display: 'flex',
    padding: '1rem 1.5rem',
    borderBottom: '1px solid #f0f0f0',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
  },
  unreadNotification: {
    backgroundColor: '#f8f5ff',
  },
  readNotification: {
    backgroundColor: 'white',
  },
  notificationIcon: {
    fontSize: '1.2rem',
    marginRight: '1rem',
    width: '24px',
    textAlign: 'center',
  },
  notificationContent: {
    flex: 1,
  },
  notificationItemTitle: {
    margin: '0 0 0.25rem 0',
    fontSize: '0.95rem',
    fontWeight: '600',
    color: '#333',
  },
  notificationMessage: {
    margin: '0 0 0.5rem 0',
    fontSize: '0.85rem',
    color: '#666',
    lineHeight: '1.4',
  },
  notificationTime: {
    fontSize: '0.75rem',
    color: '#999',
  },
  noNotifications: {
    textAlign: 'center',
    padding: '2rem',
    color: '#666',
    margin: 0,
  },
  logoutButton: {
    padding: '0.75rem 1.5rem',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    color: 'white',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '0.95rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    transition: 'all 0.3s ease',
  },
  logoutIcon: {
    fontSize: '1.1rem',
  },
  mainContent: {
    marginTop: '140px',
    padding: '2rem',
  },
  welcomeSection: {
    padding: '2rem',
    textAlign: 'center',
    backgroundColor: 'white',
    borderRadius: '15px',
    marginBottom: '2rem',
  },
  welcomeTitle: {
    fontSize: '2.5rem',
    marginBottom: '1rem',
    color: '#7C2A62',
  },
  welcomeSubtitle: {
    fontSize: '1.2rem',
    color: '#666',
  },
  servicesSection: {
    padding: '2rem',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  serviceGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
  },
  serviceCard: {
    padding: '2rem',
    backgroundColor: 'white',
    borderRadius: '15px',
    boxShadow: '0 5px 20px rgba(124, 42, 98, 0.1)',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    border: '2px solid transparent',
  },
  serviceIcon: {
    fontSize: '3rem',
    marginBottom: '1rem',
  },
  serviceTitle: {
    fontSize: '1.5rem',
    marginBottom: '1rem',
    color: '#7C2A62',
  },
  serviceDescription: {
    color: '#666',
    marginBottom: '1.5rem',
    lineHeight: '1.5',
  },
  serviceButton: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#7C2A62',
    color: 'white',
    border: 'none',
    borderRadius: '25px',
    cursor: 'pointer',
    fontWeight: '600',
    transition: 'all 0.3s ease',
  },
  // Medicine Page Styles
  medicineLayout: {
    padding: '2rem',
    maxWidth: '1200px',
    margin: '140px auto 0',
    minHeight: 'calc(100vh - 140px)',
  },
  fullWidthContent: {
    width: '100%',
  },
  searchSection: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '15px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    marginBottom: '1.5rem',
  },
  searchContainer: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '1.5rem',
  },
  searchInput: {
    flex: 1,
    padding: '1rem',
    border: '2px solid #F7D9EB',
    borderRadius: '10px',
    fontSize: '1rem',
    transition: 'border-color 0.3s ease',
  },
  // Prescription Upload Styles
  prescriptionUploadLabel: {
    padding: '1rem 1.5rem',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '0.9rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    transition: 'all 0.3s ease',
    whiteSpace: 'nowrap',
  },
  searchButton: {
    padding: '1rem 2rem',
    backgroundColor: '#7C2A62',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    fontWeight: '600',
  },
  // Products Section
  productsSection: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '15px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    marginBottom: '1.5rem',
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5rem',
  },
  sectionTitle: {
    color: '#7C2A62',
    fontSize: '1.5rem',
    margin: 0,
  },
  resultsCount: {
    color: '#666',
    fontSize: '0.9rem',
  },
  sectionSubtitle: {
    color: '#666',
    fontSize: '0.9rem',
    margin: 0,
  },
  productsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '1.5rem',
  },
  productCard: {
    border: '2px solid #F7D9EB',
    borderRadius: '12px',
    padding: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    transition: 'all 0.3s ease',
    backgroundColor: 'white',
  },
  productInfo: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  productName: {
    margin: '0 0 0.5rem 0',
    color: '#7C2A62',
    fontSize: '1.1rem',
    fontWeight: '600',
  },
  productVendor: {
    margin: '0 0 0.5rem 0',
    color: '#666',
    fontSize: '0.9rem',
  },
  productCategory: {
    marginBottom: '1rem',
  },
  categoryBadge: {
    padding: '0.25rem 0.75rem',
    backgroundColor: '#F7D9EB',
    color: '#7C2A62',
    borderRadius: '12px',
    fontSize: '0.8rem',
    fontWeight: '500',
  },
  productFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto',
  },
  productPrice: {
    color: '#7C2A62',
    fontWeight: 'bold',
    fontSize: '1.2rem',
    margin: 0,
  },
  addToCartButton: {
    padding: '0.75rem 1rem',
    backgroundColor: '#7C2A62',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '0.9rem',
    transition: 'all 0.3s ease',
  },
  // Quantity Controls in Medicine Cards
  quantityControls: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  quantityButton: {
    width: '32px',
    height: '32px',
    border: '1px solid #7C2A62',
    backgroundColor: 'transparent',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantity: {
    padding: '0 0.5rem',
    fontWeight: '600',
    minWidth: '30px',
    textAlign: 'center',
  },
  // Pharmacies Section Styles
  pharmaciesSection: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '15px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  },
  pharmaciesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '1.5rem'
  },
  pharmacyCard: {
    border: '2px solid #F7D9EB',
    borderRadius: '12px',
    padding: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    transition: 'all 0.3s ease',
    cursor: 'pointer'
  },
  pharmacyHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
  },
  pharmacyIcon: {
    fontSize: '2rem',
    width: '50px',
    height: '50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F7D9EB',
    borderRadius: '10px'
  },
  pharmacyInfo: {
    flex: 1
  },
  pharmacyName: {
    margin: '0 0 0.25rem 0',
    color: '#7C2A62',
    fontSize: '1.1rem',
    fontWeight: '600'
  },
  pharmacyRating: {
    color: '#FFD700',
    fontWeight: 'bold',
    fontSize: '0.9rem'
  },
  pharmacyDetails: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  },
  pharmacyDetailItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  pharmacyDetailLabel: {
    color: '#666',
    fontSize: '0.9rem',
    fontWeight: '500'
  },
  pharmacyDetailValue: {
    color: '#333',
    fontSize: '0.9rem',
    fontWeight: '600'
  },
  feeValue: {
    color: '#7C2A62',
    fontWeight: 'bold',
    fontSize: '1rem',
  },
  // Pharmacy Search Styles
  pharmacySearchContainer: {
    margin: '0.5rem 0',
  },
  pharmacySearchInputSmall: {
    width: '100%',
    padding: '0.75rem',
    border: '1px solid #F7D9EB',
    borderRadius: '8px',
    fontSize: '0.9rem',
  },
  pharmacySearchSection: {
    marginBottom: '1.5rem',
  },
  pharmacySearchInput: {
    width: '100%',
    padding: '1rem',
    border: '2px solid #F7D9EB',
    borderRadius: '10px',
    fontSize: '1rem',
  },
  viewButton: {
    padding: '0.75rem 1rem',
    border: '1px solid #7C2A62',
    backgroundColor: 'transparent',
    color: '#7C2A62',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '0.9rem',
    transition: 'all 0.3s ease',
    marginTop: '0.5rem'
  },
  // Cart Page Styles
  cartPageContainer: {
    marginTop: '140px',
    padding: '2rem',
    maxWidth: '1200px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  cartPageContent: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: '2rem',
    alignItems: 'start',
  },
  cartItemsSection: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '15px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  },
  cartSummarySection: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '15px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    position: 'sticky',
    top: '160px',
  },
  summaryCard: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  summaryTitle: {
    color: '#7C2A62',
    fontSize: '1.3rem',
    margin: 0,
  },
  summaryDetails: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: '0.5rem',
    borderBottom: '1px solid #f0f0f0',
  },
  grandTotal: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '1rem',
    borderTop: '2px solid #7C2A62',
    fontWeight: 'bold',
    fontSize: '1.1rem',
    color: '#7C2A62',
  },
  freeDelivery: {
    color: '#4CAF50',
    fontWeight: '600',
  },
  // Cart Items Styles
  cartHeader: {
    borderBottom: '2px solid #F7D9EB',
    paddingBottom: '1rem',
    marginBottom: '1rem',
  },
  cartTitle: {
    margin: '0 0 0.25rem 0',
    color: '#7C2A62',
    fontSize: '1.3rem',
  },
  cartSubtitle: {
    margin: 0,
    color: '#666',
    fontSize: '0.9rem',
  },
  cartItems: {
    marginBottom: '2rem',
  },
  cartItemsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  emptyCart: {
    textAlign: 'center',
    padding: '3rem 1rem',
    color: '#666',
  },
  emptyCartIcon: {
    fontSize: '4rem',
    marginBottom: '1rem',
  },
  emptyCartText: {
    margin: '0 0 0.5rem 0',
    fontSize: '1.3rem',
    fontWeight: '600',
  },
  emptyCartSubtext: {
    margin: '0 0 2rem 0',
    fontSize: '1rem',
  },
  cartItem: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr 1fr auto',
    alignItems: 'center',
    gap: '1rem',
    padding: '1rem',
    border: '1px solid #F7D9EB',
    borderRadius: '8px',
    backgroundColor: '#fafafa',
  },
  cartItemInfo: {
    display: 'flex',
    flexDirection: 'column',
  },
  cartItemName: {
    margin: '0 0 0.25rem 0',
    fontSize: '1rem',
    color: '#7C2A62',
    fontWeight: '600',
  },
  cartItemVendor: {
    margin: '0 0 0.25rem 0',
    fontSize: '0.8rem',
    color: '#666',
  },
  cartItemPrice: {
    margin: 0,
    fontSize: '0.9rem',
    color: '#7C2A62',
  },
  itemTotal: {
    fontWeight: 'bold',
    color: '#7C2A62',
    fontSize: '1rem',
    textAlign: 'center',
  },
  removeButton: {
    width: '32px',
    height: '32px',
    border: 'none',
    backgroundColor: '#ff4444',
    color: 'white',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkoutButtonLarge: {
    width: '100%',
    padding: '1rem',
    backgroundColor: '#7C2A62',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
  },
  shopNowButton: {
    padding: '1rem 2rem',
    backgroundColor: '#7C2A62',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '600',
  },
  // Orders Page Styles
  ordersContainer: {
    marginTop: '140px',
    padding: '2rem',
    maxWidth: '1200px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  ordersList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  orderCard: {
    backgroundColor: 'white',
    borderRadius: '15px',
    padding: '2rem',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  },
  orderHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '1.5rem',
  },
  orderId: {
    margin: '0 0 0.5rem 0',
    color: '#7C2A62',
    fontSize: '1.2rem',
  },
  orderDate: {
    margin: '0 0 0.25rem 0',
    color: '#666',
    fontSize: '0.9rem',
  },
  paymentId: {
    margin: 0,
    color: '#666',
    fontSize: '0.8rem',
    fontFamily: 'monospace',
  },
  orderStatus: {
    textAlign: 'right',
  },
  statusBadge: {
    padding: '0.5rem 1rem',
    borderRadius: '20px',
    color: 'white',
    fontSize: '0.8rem',
    fontWeight: '600',
  },
  orderItems: {
    marginBottom: '1.5rem',
  },
  orderItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.75rem 0',
    borderBottom: '1px solid #F7D9EB',
  },
  itemName: {
    flex: 2,
    color: '#333',
  },
  itemQuantity: {
    flex: 1,
    color: '#666',
    textAlign: 'center',
  },
  itemPrice: {
    flex: 1,
    color: '#7C2A62',
    fontWeight: '600',
    textAlign: 'right',
  },
  orderFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '1rem',
    borderTop: '2px solid #F7D9EB',
  },
  orderAddress: {
    color: '#666',
    fontSize: '0.9rem',
  },
  orderTotal: {
    color: '#7C2A62',
    fontSize: '1.1rem',
    fontWeight: 'bold',
  },
  orderActions: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  trackButton: {
    padding: '0.5rem 1rem',
    backgroundColor: '#7C2A62',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: '600',
  },
  noOrders: {
    textAlign: 'center',
    padding: '3rem',
    backgroundColor: 'white',
    borderRadius: '15px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  },
  noOrdersText: {
    fontSize: '1.2rem',
    color: '#666',
    marginBottom: '1.5rem',
  },
  // Profile Page Styles
  profileContainer: {
    marginTop: '140px',
    padding: '2rem',
    maxWidth: '800px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  profileHeader: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: '2rem',
  },
  editProfileButton: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#7C2A62',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: '600',
  },
  profileForm: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '15px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '1.5rem',
    marginBottom: '2rem',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  formLabel: {
    marginBottom: '0.5rem',
    color: '#7C2A62',
    fontWeight: '600',
    fontSize: '0.9rem',
  },
  formInput: {
    padding: '0.75rem',
    border: '2px solid #F7D9EB',
    borderRadius: '8px',
    fontSize: '1rem',
    transition: 'border-color 0.3s ease',
    cursor: 'text',
  },
  formInputError: {
    borderColor: '#FF6B6B !important',
  },
  formError: {
    color: '#FF6B6B',
    fontSize: '0.8rem',
    marginTop: '0.25rem',
  },
  formTextarea: {
    padding: '0.75rem',
    border: '2px solid #F7D9EB',
    borderRadius: '8px',
    fontSize: '1rem',
    resize: 'vertical',
    minHeight: '80px',
    fontFamily: 'inherit',
    cursor: 'text',
  },
  updateButton: {
    padding: '1rem 2rem',
    backgroundColor: '#7C2A62',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '600',
  },
  updateButtonDisabled: {
    backgroundColor: '#cccccc',
    cursor: 'not-allowed',
  },
  fieldNote: {
    color: '#666',
    fontSize: '0.8rem',
    marginTop: '0.25rem',
    fontStyle: 'italic',
  },
  formNote: {
    marginBottom: '1.5rem',
    padding: '1rem',
    backgroundColor: '#f8f5ff',
    borderRadius: '8px',
    border: '1px solid #F7D9EB',
  },
  noteText: {
    margin: 0,
    color: '#666',
    fontSize: '0.9rem',
  },
  // Consultation Page Styles
  consultationContainer: {
    marginTop: '140px',
    padding: '2rem',
    maxWidth: '1400px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  consultationHeader: {
    textAlign: 'center',
    marginBottom: '2rem',
  },
  consultationSubtitle: {
    fontSize: '1.1rem',
    color: '#666',
    marginTop: '0.5rem',
  },
  consultationLayout: {
    display: 'grid',
    gridTemplateColumns: '1fr 3fr',
    gap: '2rem',
    alignItems: 'start',
  },
  filterPanel: {
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: '15px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    height: 'fit-content',
    position: 'sticky',
    top: '160px',
  },
  filterTitle: {
    color: '#7C2A62',
    marginBottom: '1.5rem',
    fontSize: '1.2rem',
    fontWeight: '600',
  },
  filterGroup: {
    marginBottom: '1.5rem',
  },
  filterLabel: {
    display: 'block',
    marginBottom: '0.5rem',
    color: '#7C2A62',
    fontWeight: '500',
    fontSize: '0.9rem',
  },
  filterSelect: {
    width: '100%',
    padding: '0.75rem',
    border: '2px solid #F7D9EB',
    borderRadius: '8px',
    backgroundColor: 'white',
    fontSize: '0.9rem',
  },
  clearFiltersButton: {
    width: '100%',
    padding: '0.75rem',
    backgroundColor: 'transparent',
    color: '#7C2A62',
    border: '2px solid #7C2A62',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
    marginTop: '1rem',
  },
  doctorsList: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '15px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  },
  doctorsTitle: {
    color: '#7C2A62',
    marginBottom: '1.5rem',
    fontSize: '1.3rem',
  },
  noDoctors: {
    textAlign: 'center',
    padding: '3rem',
    color: '#666',
  },
  doctorsGrid: {
    display: 'grid',
    gap: '1.5rem',
  },
  doctorCard: {
    border: '2px solid #F7D9EB',
    borderRadius: '12px',
    padding: '1.5rem',
    transition: 'all 0.3s ease',
  },
  doctorHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    marginBottom: '1rem',
  },
  doctorImage: {
    fontSize: '3rem',
  },
  doctorBasicInfo: {
    flex: 1,
  },
  doctorName: {
    margin: '0 0 0.5rem 0',
    color: '#7C2A62',
    fontSize: '1.2rem',
  },
  doctorSpecialty: {
    margin: '0 0 0.5rem 0',
    color: '#666',
    fontSize: '0.9rem',
  },
  doctorRating: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  ratingText: {
    color: '#666',
    fontSize: '0.9rem',
  },
  doctorDetails: {
    marginBottom: '1rem',
  },
  doctorDetailItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.5rem 0',
    borderBottom: '1px solid #f0f0f0',
  },
  doctorDetailLabel: {
    color: '#666',
    fontSize: '0.9rem',
  },
  doctorDetailValue: {
    color: '#333',
    fontSize: '0.9rem',
  },
  doctorActions: {
    display: 'flex',
    gap: '1rem',
  },
  bookButton: {
    flex: 2,
    padding: '0.75rem 1.5rem',
    backgroundColor: '#7C2A62',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '0.9rem',
  },
  messageButton: {
    flex: 1,
    padding: '0.75rem 1rem',
    backgroundColor: 'transparent',
    color: '#7C2A62',
    border: '2px solid #7C2A62',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '0.9rem',
  },
  // Appointments Styles
  appointmentsContainer: {
    marginTop: '140px',
    padding: '2rem',
    maxWidth: '1200px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  appointmentsHeader: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: '2rem',
  },
  newAppointmentButton: {
    padding: '1rem 2rem',
    backgroundColor: '#7C2A62',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '600',
  },
  appointmentsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  appointmentCard: {
    backgroundColor: 'white',
    borderRadius: '15px',
    padding: '2rem',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  },
  appointmentHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '1.5rem',
  },
  appointmentId: {
    margin: '0 0 0.5rem 0',
    color: '#7C2A62',
    fontSize: '1.2rem',
  },
  appointmentDoctor: {
    margin: '0 0 0.25rem 0',
    color: '#333',
    fontSize: '1.1rem',
    fontWeight: '600',
  },
  appointmentSpecialty: {
    margin: 0,
    color: '#666',
    fontSize: '0.9rem',
  },
  appointmentDetails: {
    marginBottom: '1.5rem',
  },
  detailRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.5rem 0',
    borderBottom: '1px solid #f0f0f0',
  },
  appointmentActions: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'flex-end',
  },
  rescheduleButton: {
    padding: '0.5rem 1rem',
    backgroundColor: '#FF9800',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.9rem',
  },
  cancelAppointmentButton: {
    padding: '0.5rem 1rem',
    backgroundColor: '#FF6B6B',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.9rem',
  },
  viewDetailsButton: {
    padding: '0.5rem 1rem',
    backgroundColor: 'transparent',
    color: '#7C2A62',
    border: '1px solid #7C2A62',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.9rem',
  },
  noAppointments: {
    textAlign: 'center',
    padding: '3rem',
    backgroundColor: 'white',
    borderRadius: '15px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  },
  noAppointmentsText: {
    fontSize: '1.2rem',
    color: '#666',
    marginBottom: '1.5rem',
  },
  bookAppointmentButton: {
    padding: '1rem 2rem',
    backgroundColor: '#7C2A62',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '600',
  },
  // Modal Styles
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2000,
  },
  confirmationModal: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '15px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
    maxWidth: '500px',
    width: '90%',
  },
  confirmationTitle: {
    color: '#7C2A62',
    marginBottom: '1rem',
    fontSize: '1.5rem',
    textAlign: 'center',
  },
  confirmationText: {
    color: '#666',
    marginBottom: '1.5rem',
    textAlign: 'center',
    lineHeight: '1.5',
  },
  confirmationItems: {
    marginBottom: '1.5rem',
    maxHeight: '200px',
    overflowY: 'auto',
  },
  confirmationItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.5rem 0',
    borderBottom: '1px solid #f0f0f0',
  },
  confirmationActions: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
  },
  cancelButton: {
    padding: '0.75rem 1.5rem',
    backgroundColor: 'transparent',
    color: '#7C2A62',
    border: '2px solid #7C2A62',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '0.9rem',
  },
  confirmButton: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#7C2A62',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '0.9rem',
  },
  // Updated Prescription Modal Styles with Image Preview
  prescriptionModal: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '15px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
    maxWidth: '600px',
    width: '90%',
    maxHeight: '80vh',
    overflowY: 'auto',
  },
  prescriptionPreview: {
    border: '2px dashed #F7D9EB',
    borderRadius: '10px',
    padding: '2rem',
    textAlign: 'center',
    marginBottom: '1.5rem',
    minHeight: '200px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  prescriptionImageContainer: {
    position: 'relative',
    width: '100%',
    maxHeight: '300px',
    overflow: 'hidden',
    borderRadius: '8px',
  },
  prescriptionImage: {
    width: '100%',
    height: 'auto',
    maxHeight: '300px',
    objectFit: 'contain',
  },
  fileInfoOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    color: 'white',
    padding: '1rem',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  fileInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    justifyContent: 'center',
  },
  fileIcon: {
    fontSize: '2rem',
  },
  fileName: {
    margin: '0 0 0.25rem 0',
    fontWeight: '600',
    color: '#333',
  },
  fileSize: {
    margin: 0,
    color: '#666',
    fontSize: '0.9rem',
  },
  uploadPrompt: {
    textAlign: 'center',
  },
  uploadIconLarge: {
    fontSize: '3rem',
    marginBottom: '1rem',
    color: '#7C2A62',
  },
  uploadText: {
    margin: '0 0 0.5rem 0',
    color: '#666',
    fontSize: '1.1rem',
  },
  uploadSubtext: {
    margin: 0,
    color: '#999',
    fontSize: '0.9rem',
  },
  prescriptionRequirements: {
    backgroundColor: '#f8f5ff',
    padding: '1rem',
    borderRadius: '8px',
    marginBottom: '1.5rem',
    border: '1px solid #F7D9EB',
  },
  requirementsTitle: {
    color: '#7C2A62',
    margin: '0 0 0.5rem 0',
    fontSize: '1rem',
  },
  requirementsList: {
    margin: 0,
    paddingLeft: '1.5rem',
    color: '#666',
    fontSize: '0.9rem',
    lineHeight: '1.5',
  },
  modalActions: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  uploadButton: {
    padding: '0.75rem 1.5rem',
    backgroundColor: 'transparent',
    color: '#7C2A62',
    border: '2px solid #7C2A62',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '0.9rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
  },
  submitButton: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#7C2A62',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '0.9rem',
  },
  // Logout Confirmation Modal Styles
  logoutConfirmationModal: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '15px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
    maxWidth: '400px',
    width: '90%',
    textAlign: 'center',
  },
  logoutConfirmationIcon: {
    fontSize: '4rem',
    marginBottom: '1rem',
  },
  logoutConfirmationTitle: {
    color: '#7C2A62',
    marginBottom: '1rem',
    fontSize: '1.5rem',
  },
  logoutConfirmationText: {
    color: '#666',
    marginBottom: '2rem',
    lineHeight: '1.5',
  },
  logoutConfirmationActions: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
  },
  logoutCancelButton: {
    padding: '0.75rem 1.5rem',
    backgroundColor: 'transparent',
    color: '#7C2A62',
    border: '2px solid #7C2A62',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '0.9rem',
    flex: 1,
  },
  logoutConfirmButton: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#7C2A62',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '0.9rem',
    flex: 1,
  },
  // Pharmacy Store Modal Styles
  pharmacyStoreModal: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '15px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
    maxWidth: '800px',
    width: '90%',
    maxHeight: '80vh',
    overflowY: 'auto',
  },
  pharmacyStoreHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5rem',
    borderBottom: '2px solid #F7D9EB',
    paddingBottom: '1rem',
  },
  pharmacyInfoSection: {
    marginBottom: '2rem',
  },
  pharmacyDetailsSection: {
    display: 'flex',
    gap: '2rem',
    flexWrap: 'wrap',
  },
  pharmacyDistance: {
    color: '#666',
    fontSize: '0.9rem',
    margin: '0.5rem 0',
  },
  pharmacyDelivery: {
    color: '#4CAF50',
    fontSize: '0.9rem',
    margin: '0.5rem 0',
  },
  pharmacyRatingText: {
    color: '#FFD700',
    fontSize: '0.9rem',
    margin: '0.5rem 0',
  },
  pharmacyMedicines: {
    marginBottom: '2rem',
  },
  medicinesTitle: {
    color: '#7C2A62',
    marginBottom: '1rem',
    fontSize: '1.2rem',
  },
  medicinesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '1rem',
  },
  medicineItem: {
    border: '1px solid #F7D9EB',
    borderRadius: '8px',
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  medicineInfo: {
    marginBottom: '1rem',
  },
  medicineName: {
    margin: '0 0 0.5rem 0',
    color: '#7C2A62',
    fontSize: '1rem',
  },
  medicineCategory: {
    margin: '0 0 0.5rem 0',
    color: '#666',
    fontSize: '0.8rem',
  },
  medicinePrice: {
    margin: 0,
    color: '#7C2A62',
    fontWeight: 'bold',
    fontSize: '1.1rem',
  },
  addToCartPharmacyButton: {
    padding: '0.5rem 1rem',
    backgroundColor: '#7C2A62',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: '600',
  },
  noMedicinesFound: {
    gridColumn: '1 / -1',
    textAlign: 'center',
    padding: '2rem',
    color: '#666',
  },
  pharmacyActions: {
    display: 'flex',
    justifyContent: 'center',
  },
  backToPharmaciesButton: {
    padding: '0.75rem 1.5rem',
    backgroundColor: 'transparent',
    color: '#7C2A62',
    border: '2px solid #7C2A62',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
  },
  // Appointment Details Modal Styles
  appointmentDetailsModal: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '15px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
    maxWidth: '700px',
    width: '90%',
    maxHeight: '80vh',
    overflowY: 'auto',
  },
  appointmentDetailsHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5rem',
    borderBottom: '2px solid #F7D9EB',
    paddingBottom: '1rem',
  },
  appointmentDetailsContent: {
    marginBottom: '2rem',
  },
  detailSection: {
    marginBottom: '2rem',
  },
  detailSectionTitle: {
    color: '#7C2A62',
    marginBottom: '1rem',
    fontSize: '1.1rem',
  },
  detailGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1rem',
  },
  detailItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem',
  },
  detailLabel: {
    color: '#666',
    fontSize: '0.9rem',
    fontWeight: '500',
  },
  detailValue: {
    color: '#333',
    fontSize: '1rem',
  },
  appointmentDetailsActions: {
    display: 'flex',
    justifyContent: 'center',
  },
  closeDetailsButton: {
    padding: '0.75rem 2rem',
    backgroundColor: '#7C2A62',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
  },
  // Live Tracking Styles
  liveTrackingContainer: {
    marginTop: '140px',
    padding: '2rem',
    minHeight: 'calc(100vh - 140px)',
    backgroundColor: '#f8fafc',
  },
  trackingHeader: {
    backgroundColor: 'white',
    padding: '1.5rem 2rem',
    borderRadius: '15px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    marginBottom: '2rem',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  backButton: {
    padding: '0.5rem 1rem',
    backgroundColor: 'transparent',
    color: '#7C2A62',
    border: '1px solid #7C2A62',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.9rem',
  },
  trackingTitle: {
    margin: 0,
    color: '#7C2A62',
    fontSize: '1.8rem',
  },
  trackingSubtitle: {
    margin: 0,
    color: '#666',
    fontSize: '1rem',
  },
  trackingContent: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: '2rem',
    height: '600px',
  },
  mapContainer: {
    backgroundColor: 'white',
    borderRadius: '15px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    overflow: 'hidden',
    height: '100%',
  },
  trackingSidebar: {
    backgroundColor: 'white',
    borderRadius: '15px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    padding: '1.5rem',
    overflowY: 'auto',
  },
  deliveryInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  sidebarTitle: {
    color: '#7C2A62',
    margin: '0 0 1rem 0',
    fontSize: '1.3rem',
  },
  progressSection: {
    marginBottom: '1rem',
  },
  progressBar: {
    height: '8px',
    backgroundColor: '#f0f0f0',
    borderRadius: '4px',
    overflow: 'hidden',
    marginBottom: '0.5rem',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#7C2A62',
    transition: 'width 0.5s ease',
  },
  progressLabels: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.8rem',
    color: '#666',
  },
  statusCard: {
    backgroundColor: '#f8f5ff',
    padding: '1rem',
    borderRadius: '10px',
    border: '1px solid #F7D9EB',
  },
  currentStatus: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '0.5rem',
  },
  statusLabel: {
    color: '#666',
    fontSize: '0.9rem',
  },
  statusValue: {
    color: '#7C2A62',
    fontWeight: '600',
    fontSize: '0.9rem',
  },
  eta: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  etaLabel: {
    color: '#666',
    fontSize: '0.9rem',
  },
  etaValue: {
    color: '#4CAF50',
    fontWeight: '600',
    fontSize: '0.9rem',
  },
  deliveryPartner: {
    border: '1px solid #F7D9EB',
    borderRadius: '10px',
    padding: '1rem',
  },
  partnerTitle: {
    color: '#7C2A62',
    margin: '0 0 1rem 0',
    fontSize: '1.1rem',
  },
  partnerInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    marginBottom: '1rem',
  },
  partnerAvatar: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    backgroundColor: '#F7D9EB',
    color: '#7C2A62',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: '1.2rem',
  },
  partnerDetails: {
    flex: 1,
  },
  partnerName: {
    margin: '0 0 0.25rem 0',
    fontWeight: '600',
    color: '#333',
  },
  partnerVehicle: {
    margin: '0 0 0.25rem 0',
    color: '#666',
    fontSize: '0.9rem',
  },
  partnerRating: {
    color: '#FFD700',
    fontWeight: 'bold',
    fontSize: '0.9rem',
  },
  callButton: {
    width: '100%',
    padding: '0.75rem',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '0.9rem',
  },
  orderSummary: {
    border: '1px solid #F7D9EB',
    borderRadius: '10px',
    padding: '1rem',
  },
  summaryTitleText: {
    color: '#7C2A62',
    margin: '0 0 1rem 0',
    fontSize: '1.1rem',
  },
  orderSummaryItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.5rem 0',
    borderBottom: '1px solid #f0f0f0',
  },
  // Page Header Styles with Back Button
  pageHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    marginBottom: '2rem',
  },
};

export default UserDashboard;