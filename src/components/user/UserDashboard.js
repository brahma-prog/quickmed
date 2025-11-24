import React, { useState, useEffect, useRef, useCallback } from 'react';
import Header from './Header';
import AppointmentsView from './AppointmentsView';
import OrdersView from './OrdersView';
import MedicineView from './MedicineView';
import CartView from './CartView';
import ConsultationView from './ConsultationView';
import LiveTrackingView from './LiveTrackingView';
import NotificationsPage from './NotificationsPage';
import FullNotificationsPage from './FullNotificationsPage';
import Modals from './Modals';
import Products from './Products';
import AIChatbotWidget from './AIChatbotWidget';
import { ProfileProvider, useProfile } from './ProfileContext';
import ProfileView from './ProfileView';


const UserDashboardContent = ({ user, onLogout, onNavigate }) => {
  const { profile, updateProfile } = useProfile();
  
  const [activeView, setActiveView] = useState('dashboard');
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [orders, setOrders] = useState([]);
  const [showCheckoutConfirm, setShowCheckoutConfirm] = useState(false);

  // Doctor Consultation State
  const [doctorSearchQuery, setDoctorSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [selectedExperience] = useState('');
  const [selectedLanguage] = useState('');

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

  // Profile Photo Upload State
  const [showProfilePhotoModal, setShowProfilePhotoModal] = useState(false);
  const [profilePhotoFile, setProfilePhotoFile] = useState(null);
  const [profilePhotoPreview, setProfilePhotoPreview] = useState(profile?.profilePhoto || null);

  // Notifications State
  const [showNotifications, setShowNotifications] = useState(false);
  const [showFullNotifications, setShowFullNotifications] = useState(false);

  // Appointments State
  const [appointments, setAppointments] = useState([
    {
      id: 'APT001',
      doctorName: 'Dr. Brahma Gadikoto',
      specialty: 'General Physician',
      date: new Date().toISOString().split('T')[0],
      time: '10:00 AM',
      status: 'Scheduled',
      type: 'Video Consultation',
      fee: 730,
      details: {
        patientName: profile?.fullName || 'User',
        symptoms: 'Fever and cold',
        notes: 'Regular checkup scheduled',
        prescription: 'To be provided after consultation'
      }
    },
    {
      id: 'APT002',
      doctorName: 'Dr. Charitha Kasturi',
      specialty: 'Pediatrician',
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      time: '2:00 PM',
      status: 'Completed',
      type: 'In-Person',
      fee: 505,
      details: {
        patientName: profile?.fullName || 'User',
        symptoms: 'Child vaccination',
        notes: 'Vaccination completed successfully',
        prescription: 'Next vaccination due in 2 months'
      }
    }
  ]);

  // Appointments Filter State
  const [appointmentFilter, setAppointmentFilter] = useState('all');

  // Orders Filter State
  const [orderFilter, setOrderFilter] = useState('all');

  // Enhanced notifications state
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
    }
  ]);

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
  const profilePhotoInputRef = useRef(null);

  // Enhanced mock data for medicines
  const medicines = [
    { id: 1, name: 'Aspirin 75mg', price: 25, vendor: 'WellCare Store', category: 'OTC', description: 'Low-dose aspirin for heart health' },
    { id: 2, name: 'Paracetamol 500mg', price: 30, vendor: 'City Pharmacy', category: 'OTC', description: 'Effective relief from fever and pain' },
    { id: 3, name: 'Ibuprofen 400mg', price: 35, vendor: 'HealthPlus Medicines', category: 'OTC', description: 'Anti-inflammatory pain relief' },
    { id: 4, name: 'Vitamin C 1000mg', price: 40, vendor: 'WellCare Store', category: 'Vitamins', description: 'Immune system support' },
    { id: 5, name: 'Amoxicillin 500mg', price: 120, vendor: 'City Pharmacy', category: 'Prescription', description: 'Antibiotic for bacterial infections' },
    { id: 6, name: 'Blood Pressure Monitor', price: 899, vendor: 'HealthPlus Medicines', category: 'Equipment', description: 'Digital automatic monitoring' }
  ];

  // Enhanced mock data for pharmacies with their medicines
  const pharmacies = [
    { 
      id: 1, 
      name: 'City Pharmacy', 
      distance: '1.1 km', 
      deliveryTime: '20 min', 
      rating: 4.5,
      medicines: [
        { id: 2, name: 'Paracetamol 500mg', price: 30, category: 'OTC' },
        { id: 5, name: 'Amoxicillin 500mg', price: 120, category: 'Prescription' }
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
        { id: 4, name: 'Vitamin C 1000mg', price: 40, category: 'Vitamins' }
      ]
    }
  ];

  // Generate real-time slots for Indian timezone
  const generateTimeSlots = () => {
    const slots = [];
    const now = new Date();
    const istOffset = 5.5 * 60 * 60 * 1000;
    const currentIST = new Date(now.getTime() + istOffset);
    
    let currentHour = currentIST.getHours();
    const currentMinute = currentIST.getMinutes();
    
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

  // Mock doctors data
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
      bio: 'Specialized in general medicine with 15 years of experience.',
      qualifications: 'MBBS, MD (General Medicine)'
    },
    {
      id: 2,
      name: 'Dr. Charitha Kasturi',
      specialty: 'Pediatrician',
      rating: 4.8,
      experience: '12 years',
      languages: ['English', 'Hindi', 'Telugu'],
      consultationFee: 505,
      availableSlots: generateTimeSlots(),
      image: '👩‍⚕️',
      bio: 'Specialized in child care and pediatric medicine with 12 years of experience.',
      qualifications: 'MBBS, MD (Pediatrics)'
    }
  ];

  // Enhanced mock orders data with tracking
  const initialOrders = useCallback(() => [
    {
      id: 'ORD001',
      date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      items: [
        { name: 'Paracetamol 500mg', quantity: 2, price: 30 },
        { name: 'Vitamin C 1000mg', quantity: 1, price: 40 }
      ],
      total: 100,
      status: 'Delivered',
      deliveryAddress: profile?.address || '123 Main St, City, 560001',
      trackingAvailable: false
    },
    {
      id: 'ORD002',
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      items: [
        { name: 'Aspirin 75mg', quantity: 1, price: 25 }
      ],
      total: 25,
      status: 'In Transit',
      deliveryAddress: profile?.address || '123 Main St, City, 560001',
      trackingAvailable: true,
      deliveryPartner: {
        name: 'Rahul Kumar',
        phone: '+91 9876543210',
        estimatedTime: '25 min'
      }
    }
  ], [profile?.address]);

  // AI Chatbot Responses
  const chatbotResponses = {
    'hello': "Hello! I'm your QuickMed assistant. How can I help you with medicines or doctor consultations today?",
    'hi': "Hi there! Welcome to QuickMed. How can I assist you with healthcare services?",
    'medicine': "We offer a wide range of medicines. You can search for specific medicines, upload prescriptions, or browse categories.",
    'doctor': "We have certified doctors available for online consultations.",
    'delivery': "We offer fast delivery within 2 hours for medicines and 24/7 doctor consultations.",
    'payment': "We accept all major payment methods including UPI, credit/debit cards, net banking, and wallet payments.",
    'prescription': "You can upload your prescription in the Medicine section.",
    'emergency': "For medical emergencies, please contact your nearest hospital immediately or call emergency services at 108.",
    'default': "I understand you're asking about healthcare services. I can help with medicine orders, doctor appointments, delivery tracking, and general health queries."
  };

  // Enhanced navigation handler that scrolls to top
  const handleNavigation = (view) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      setActiveView(view);
    }, 100);
  };

  // Profile Photo Upload Functions
  const handleProfilePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file (JPG, PNG, etc.)');
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        alert('File size should be less than 5MB');
        return;
      }

      setProfilePhotoFile(file);
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePhotoPreview(e.target.result);
      };
      reader.readAsDataURL(file);
      
      setShowProfilePhotoModal(true);
    }
  };

  const handleProfilePhotoSubmit = async () => {
    if (!profilePhotoFile) {
      alert('Please select a profile photo first');
      return;
    }

    try {
      const result = await updateProfilePhotoAPI({
        profilePhoto: profilePhotoFile
      });

      if (result.success) {
        const updatedProfile = {
          ...profile,
          profilePhoto: profilePhotoPreview
        };
        updateProfile(updatedProfile);

        setProfilePhotoFile(null);
        if (profilePhotoInputRef.current) {
          profilePhotoInputRef.current.value = '';
        }

        alert('Profile photo updated successfully!');
        addNotification('Profile Photo Updated', 'Your profile photo has been updated successfully', 'info');
        
        setShowProfilePhotoModal(false);
      }
    } catch (error) {
      console.error('Error updating profile photo:', error);
      alert('Error updating profile photo. Please try again.');
    }
  };

  const updateProfilePhotoAPI = async (profileData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, data: profileData });
      }, 1000);
    });
  };

  const removeProfilePhoto = () => {
    const updatedProfile = {
      ...profile,
      profilePhoto: null
    };
    updateProfile(updatedProfile);
    setProfilePhotoPreview(null);
    setProfilePhotoFile(null);
    if (profilePhotoInputRef.current) {
      profilePhotoInputRef.current.value = '';
    }
    alert('Profile photo removed successfully!');
    addNotification('Profile Photo Removed', 'Your profile photo has been removed', 'info');
  };

  const triggerProfilePhotoUpload = () => {
    profilePhotoInputRef.current?.click();
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
    const ordersData = initialOrders();
    setOrders(ordersData);
    const trackableOrder = ordersData.find(order => 
      order.trackingAvailable && (order.status === 'In Transit' || order.status === 'On the Way')
    );
    if (trackableOrder) {
      setTrackingOrder(trackableOrder);
    }
  }, [initialOrders]);

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
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

  // Update profile photo preview when profile changes
  useEffect(() => {
    if (profile?.profilePhoto) {
      setProfilePhotoPreview(profile.profilePhoto);
    }
  }, [profile?.profilePhoto]);

  // AI Chatbot Functions
  const toggleChatbot = () => {
    setShowChatbot(!showChatbot);
  };

  const handleUserMessage = (e) => {
    setUserMessage(e.target.value);
  };

  const sendMessage = () => {
    if (!userMessage.trim()) return;

    const newUserMessage = {
      id: Date.now(),
      text: userMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, newUserMessage]);
    setUserMessage('');
    
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

    setTimeout(() => {
      const doctorResponse = {
        id: Date.now() + 1,
        text: "Thank you for your message. I'll review your concerns and get back to you shortly.",
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
    addNotification('Medicine Added', `${medicine.name} added to cart`, 'order');
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

  // Filter appointments based on selected filter
  const filteredAppointments = appointments.filter(appointment => {
    if (appointmentFilter === 'all') return true;
    return appointment.status.toLowerCase() === appointmentFilter.toLowerCase();
  });

  // Filter orders based on selected filter
  const filteredOrders = orders.filter(order => {
    if (orderFilter === 'all') return true;
    
    switch (orderFilter) {
      case 'delivered':
        return order.status === 'Delivered';
      case 'in-transit':
        return order.status === 'In Transit' || order.status === 'On the Way';
      case 'pending':
        return order.status === 'Pending';
      default:
        return true;
    }
  });

  // Notification functions
  const handleNotificationsClick = () => {
    setShowNotifications(!showNotifications);
  };

  const handleCloseNotifications = () => {
    setShowNotifications(false);
  };

  const handleViewAllNotifications = () => {
    setShowNotifications(false);
    setShowFullNotifications(true);
  };

  const handleCloseFullNotifications = () => {
    setShowFullNotifications(false);
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
        patientName: profile?.fullName || 'User',
        symptoms: 'General consultation',
        notes: 'New appointment scheduled',
        prescription: 'To be provided after consultation'
      }
    };
    setAppointments(prev => [newAppointment, ...prev]);
    addNotification('Appointment Scheduled', `Appointment with ${doctor.name} scheduled for ${date} at ${time}`, 'appointment');
    
    handleNavigation('appointments');
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
  };

  // Prescription upload functions
  const handlePrescriptionUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
      if (!validTypes.includes(file.type)) {
        alert('Please upload a valid prescription file (JPG, PNG, or PDF)');
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        alert('File size should be less than 5MB');
        return;
      }

      setPrescriptionFile(file);
      
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
    handleNavigation('live-tracking');
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

  // Toggle Profile Dropdown
  const toggleProfileDropdown = () => {
    setShowProfileDropdown(prev => !prev);
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
          name: profile?.fullName || 'Customer',
          email: profile?.email || 'customer@example.com',
          contact: profile?.phone || '0000000000'
        },
        notes: {
          address: profile?.address || 'Address not provided',
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
          deliveryAddress: profile?.address || 'Address not provided',
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
        handleNavigation('orders');
        
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

  // OPTIMIZED Dashboard Styles - Better spacing and alignment
  const dashboardStyles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#f8f9fa',
      overflowX: 'hidden',
    },
    mainContent: {
      padding: '20px',
      maxWidth: '1400px',
      margin: '0 auto',
      marginTop: '130px',
      minHeight: 'calc(100vh - 80px)',
      boxSizing: 'border-box',
      width: '100%',
    },
    welcomeSection: {
      textAlign: 'center',
      marginBottom: '40px',
      padding: '30px 25px',
      backgroundColor: 'white',
      borderRadius: '20px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      width: '100%',
    },
    welcomeTitle: {
      fontSize: 'clamp(2rem, 5vw, 3rem)',
      fontWeight: 'bold',
      color: '#7C2A62',
      marginBottom: '15px',
      lineHeight: '1.2',
    },
    welcomeSubtitle: {
      fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
      color: '#666',
      lineHeight: '1.5',
      maxWidth: '800px',
      margin: '0 auto',
    },
    servicesSection: {
      marginBottom: '40px',
      width: '100%',
    },
    serviceGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
      gap: '30px',
      marginBottom: '30px',
      width: '100%',
      alignItems: 'stretch',
    },
    serviceCard: {
      backgroundColor: 'white',
      borderRadius: '16px',
      padding: '30px 25px',
      textAlign: 'center',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      border: '1px solid #e0e0e0',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      width: '100%',
      minHeight: '380px',
      boxSizing: 'border-box',
    },
    serviceIcon: {
      fontSize: '3.5rem',
      marginBottom: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '80px',
    },
    serviceTitle: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: '#7C2A62',
      marginBottom: '15px',
      lineHeight: '1.3',
      textAlign: 'center',
    },
    serviceDescription: {
      fontSize: '1rem',
      color: '#666',
      marginBottom: '25px',
      lineHeight: '1.6',
      flexGrow: 1,
      textAlign: 'center',
    },
    serviceButton: {
      backgroundColor: '#7C2A62',
      color: 'white',
      border: 'none',
      padding: '15px 25px',
      borderRadius: '25px',
      fontSize: '1rem',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      width: '100%',
    },
    featuredSection: {
      backgroundColor: 'white',
      borderRadius: '20px',
      padding: '35px 30px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      marginBottom: '40px',
      width: '100%',
      boxSizing: 'border-box',
    },
    sectionTitle: {
      fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
      fontWeight: 'bold',
      color: '#7C2A62',
      marginBottom: '15px',
      textAlign: 'center',
      width: '100%',
    },
    sectionSubtitle: {
      fontSize: '1.2rem',
      color: '#666',
      marginBottom: '35px',
      textAlign: 'center',
      width: '100%',
    },
    featuredGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '25px',
      width: '100%',
      alignItems: 'stretch',
    },
    featuredCard: {
      backgroundColor: '#f8f9fa',
      borderRadius: '15px',
      padding: '25px 20px',
      textAlign: 'center',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      border: '1px solid #e0e0e0',
      height: '100%',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      boxSizing: 'border-box',
      minHeight: '280px',
    },
    featuredImage: {
      fontSize: '3rem',
      marginBottom: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '80px',
      width: '100%',
    },
    featuredInfo: {
      textAlign: 'center',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      flexGrow: 1,
      justifyContent: 'space-between',
    },
    featuredName: {
      fontSize: '1.3rem',
      fontWeight: 'bold',
      color: '#333',
      marginBottom: '8px',
      lineHeight: '1.3',
      textAlign: 'center',
      width: '100%',
    },
    featuredBrand: {
      fontSize: '0.9rem',
      color: '#7C2A62',
      marginBottom: '10px',
      fontWeight: 'bold',
      textAlign: 'center',
      width: '100%',
    },
    featuredDescription: {
      fontSize: '0.9rem',
      color: '#666',
      marginBottom: '15px',
      lineHeight: '1.4',
      textAlign: 'center',
      width: '100%',
      flexGrow: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    featuredPrice: {
      fontSize: '1.3rem',
      fontWeight: 'bold',
      color: '#7C2A62',
      textAlign: 'center',
      width: '100%',
      marginTop: 'auto',
    },
    // Healthcare Information Section - OPTIMIZED
    healthcareInfoSection: {
      backgroundColor: 'white',
      borderRadius: '20px',
      padding: '40px 35px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      marginBottom: '40px',
      width: '100%',
      boxSizing: 'border-box',
    },
    infoTitle: {
      fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
      fontWeight: 'bold',
      color: '#7C2A62',
      marginBottom: '35px',
      textAlign: 'center',
    },
    infoGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
      gap: '30px',
      width: '100%',
    },
    infoCard: {
      backgroundColor: '#f8f9fa',
      borderRadius: '15px',
      padding: '30px 25px',
      border: '1px solid #e0e0e0',
      height: '100%',
      width: '100%',
      boxSizing: 'border-box',
      minHeight: '320px',
    },
    infoCardTitle: {
      fontSize: '1.4rem',
      fontWeight: 'bold',
      color: '#7C2A62',
      marginBottom: '20px',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
    },
    infoCardContent: {
      fontSize: '1rem',
      color: '#555',
      lineHeight: '1.6',
    },
    infoList: {
      paddingLeft: '20px',
      margin: '15px 0',
    },
    infoListItem: {
      marginBottom: '8px',
      lineHeight: '1.5',
      fontSize: '1rem',
    },
    highlightText: {
      color: '#7C2A62',
      fontWeight: '600',
    }
  };

  // Featured Products Section Component with Fixed Alignment
  const FeaturedProductsSection = () => (
    <section style={dashboardStyles.featuredSection}>
      <h2 style={dashboardStyles.sectionTitle}>Featured Medicines 💊</h2>
      <p style={dashboardStyles.sectionSubtitle}>Popular and essential medicines for your health needs</p>
      
      <div style={dashboardStyles.featuredGrid}>
        {[
          {
            id: 1,
            name: 'Aspirin 75mg',
            brand: 'Bayer',
            price: 25,
            description: 'Low-dose aspirin for heart health and blood thinning',
            image: '💊'
          },
          {
            id: 2,
            name: 'Paracetamol 500mg',
            brand: 'Crocin',
            price: 30,
            description: 'Effective relief from fever and mild to moderate pain',
            image: '🌡️'
          },
          {
            id: 4,
            name: 'Vitamin C 1000mg',
            brand: 'NatureMade',
            price: 40,
            description: 'Immune system support and antioxidant protection',
            image: '🍊'
          },
          {
            id: 6,
            name: 'BP Monitor',
            brand: 'Omron',
            price: 899,
            description: 'Digital automatic blood pressure monitoring device',
            image: '🩺'
          }
        ].map(product => (
          <div 
            key={product.id} 
            style={dashboardStyles.featuredCard}
            onClick={() => handleNavigation('products')}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
            }}
          >
            <div style={dashboardStyles.featuredImage}>
              {product.image}
            </div>
            <div style={dashboardStyles.featuredInfo}>
              <h4 style={dashboardStyles.featuredName}>{product.name}</h4>
              <p style={dashboardStyles.featuredBrand}>{product.brand}</p>
              <p style={dashboardStyles.featuredDescription}>{product.description}</p>
              <div style={dashboardStyles.featuredPrice}>₹{product.price}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );

  // Dashboard View Component - OPTIMIZED
  const DashboardView = () => (
    <div style={dashboardStyles.mainContent}>
      {/* Welcome Section */}
      <section style={dashboardStyles.welcomeSection}>
        <h2 style={dashboardStyles.welcomeTitle}>
          Welcome back, {profile?.fullName || 'User'}! 👋
        </h2>
        <p style={dashboardStyles.welcomeSubtitle}>
          Your health is our priority. Access quality healthcare services instantly with QuickMed's comprehensive platform.
        </p>
      </section>

      {/* Services Section */}
      <section style={dashboardStyles.servicesSection}>
        <div style={dashboardStyles.serviceGrid}>
          <div 
            style={dashboardStyles.serviceCard}
            onClick={() => handleNavigation('medicine')}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
            }}
          >
            <div style={dashboardStyles.serviceIcon}>💊</div>
            <h3 style={dashboardStyles.serviceTitle}>Medicine Delivery</h3>
            <p style={dashboardStyles.serviceDescription}>
              Get prescribed medicines delivered within 2 hours. Upload prescriptions for quick verification and enjoy fast, reliable service.
            </p>
            <button 
              style={dashboardStyles.serviceButton} 
              type="button"
              onMouseEnter={(e) => e.target.style.backgroundColor = '#6a2460'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#7C2A62'}
            >
              Order Medicines
            </button>
          </div>

          <div 
            style={dashboardStyles.serviceCard}
            onClick={() => handleNavigation('consultation')}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
            }}
          >
            <div style={dashboardStyles.serviceIcon}>👨‍⚕️</div>
            <h3 style={dashboardStyles.serviceTitle}>Doctor Consultation</h3>
            <p style={dashboardStyles.serviceDescription}>
              Connect with certified doctors online for video consultations. Available 24/7 for all your healthcare needs.
            </p>
            <button 
              style={dashboardStyles.serviceButton} 
              type="button"
              onMouseEnter={(e) => e.target.style.backgroundColor = '#6a2460'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#7C2A62'}
            >
              Consult Doctors
            </button>
          </div>

          <div 
            style={dashboardStyles.serviceCard}
            onClick={() => handleNavigation('products')}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
            }}
          >
            <div style={dashboardStyles.serviceIcon}>📚</div>
            <h3 style={dashboardStyles.serviceTitle}>Product Catalog</h3>
            <p style={dashboardStyles.serviceDescription}>
              Browse complete medicine catalog with detailed information, health guides, and expert recommendations.
            </p>
            <button 
              style={dashboardStyles.serviceButton} 
              type="button"
              onMouseEnter={(e) => e.target.style.backgroundColor = '#6a2460'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#7C2A62'}
            >
              Browse Products
            </button>
          </div>
        </div>
      </section>

      {/* Featured Products Section - USING FIXED COMPONENT */}
      <FeaturedProductsSection />

      {/* Healthcare Information Section */}
      <section style={dashboardStyles.healthcareInfoSection}>
        <h2 style={dashboardStyles.infoTitle}>Healthcare Information & Guidelines</h2>
        
        <div style={dashboardStyles.infoGrid}>
          {/* QuickMed Services Info */}
          <div style={dashboardStyles.infoCard}>
            <h3 style={dashboardStyles.infoCardTitle}>
              <span>🏥</span> About QuickMed Services
            </h3>
            <div style={dashboardStyles.infoCardContent}>
              <p>
                <span style={dashboardStyles.highlightText}>QuickMed</span> is your comprehensive digital healthcare platform offering:
              </p>
              <ul style={dashboardStyles.infoList}>
                <li style={dashboardStyles.infoListItem}><strong>Instant Medicine Delivery:</strong> Within 2 hours at your doorstep</li>
                <li style={dashboardStyles.infoListItem}><strong>Online Doctor Consultations:</strong> 24/7 access to certified professionals</li>
                <li style={dashboardStyles.infoListItem}><strong>Digital Prescription Management:</strong> Secure storage and easy access</li>
                <li style={dashboardStyles.infoListItem}><strong>Live Order Tracking:</strong> Real-time updates on your deliveries</li>
              </ul>
            </div>
          </div>

          {/* Medicine Safety Guidelines */}
          <div style={dashboardStyles.infoCard}>
            <h3 style={dashboardStyles.infoCardTitle}>
              <span>💊</span> Medicine Safety Guidelines
            </h3>
            <div style={dashboardStyles.infoCardContent}>
              <p>Your safety is our priority. Follow these guidelines:</p>
              <ul style={dashboardStyles.infoList}>
                <li style={dashboardStyles.infoListItem}>Always follow prescription instructions carefully</li>
                <li style={dashboardStyles.infoListItem}>Check expiry dates before consumption</li>
                <li style={dashboardStyles.infoListItem}>Store medicines in proper conditions</li>
                <li style={dashboardStyles.infoListItem}>Avoid self-medication without consultation</li>
                <li style={dashboardStyles.infoListItem}>Read dosage instructions thoroughly</li>
              </ul>
            </div>
          </div>

          {/* Doctor Consultation Benefits */}
          <div style={dashboardStyles.infoCard}>
            <h3 style={dashboardStyles.infoCardTitle}>
              <span>👨‍⚕️</span> Online Consultation Benefits
            </h3>
            <div style={dashboardStyles.infoCardContent}>
              <p>Advantages of telemedicine include:</p>
              <ul style={dashboardStyles.infoList}>
                <li style={dashboardStyles.infoListItem}>Time-saving with no travel required</li>
                <li style={dashboardStyles.infoListItem}>Access specialists from anywhere</li>
                <li style={dashboardStyles.infoListItem}>Private and confidential consultations</li>
                <li style={dashboardStyles.infoListItem}>Easy follow-up appointments</li>
                <li style={dashboardStyles.infoListItem}>Digital medical records access</li>
                <li style={dashboardStyles.infoListItem}>Cost-effective healthcare services</li>
              </ul>
            </div>
          </div>

          {/* Emergency Preparedness */}
          <div style={dashboardStyles.infoCard}>
            <h3 style={dashboardStyles.infoCardTitle}>
              <span>🚨</span> Emergency Preparedness
            </h3>
            <div style={dashboardStyles.infoCardContent}>
              <p>For medical emergencies, remember:</p>
              <ul style={dashboardStyles.infoList}>
                <li style={dashboardStyles.infoListItem}>Contact emergency services immediately (108)</li>
                <li style={dashboardStyles.infoListItem}>Maintain a well-stocked first aid kit</li>
                <li style={dashboardStyles.infoListItem}>Keep emergency medical contacts ready</li>
                <li style={dashboardStyles.infoListItem}>Have medical records easily accessible</li>
                <li style={dashboardStyles.infoListItem}>Know your allergies and medical conditions</li>
              </ul>
              <p style={{marginTop: '15px', fontWeight: '600'}}>
                <strong>Note:</strong> Online consultations are for non-emergency medical issues only.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  // Main container style - OPTIMIZED
  const containerStyle = {
    minHeight: '100vh',
    backgroundColor: '#f8f9fa',
    overflowX: 'hidden',
    position: 'relative',
    width: '100%',
    margin: 0,
    padding: 0,
  };

  return (
    <div style={containerStyle}>
      <Header
        activeView={activeView}
        setActiveView={handleNavigation}
        cart={cart}
        notifications={notifications}
        markAsRead={markAsRead}
        markAllAsRead={markAllAsRead}
        getUnreadCount={getUnreadCount}
        handleNotificationsClick={handleNotificationsClick}
        toggleProfileDropdown={toggleProfileDropdown}
        showProfileDropdown={showProfileDropdown}
        setShowProfileDropdown={setShowProfileDropdown}
        handleLogoutClick={handleLogoutClick}
        notificationRef={notificationRef}
        profileRef={profileRef}
        profilePhotoInputRef={profilePhotoInputRef}
        handleProfilePhotoUpload={handleProfilePhotoUpload}
        triggerProfilePhotoUpload={triggerProfilePhotoUpload}
        profile={profile}
      />

      {/* Notifications Popup */}
      <NotificationsPage
        showNotifications={showNotifications}
        notifications={notifications}
        onClose={handleCloseNotifications}
        onViewAll={handleViewAllNotifications}
      />

      {/* Full Notifications Page */}
      {showFullNotifications && (
        <FullNotificationsPage
          notifications={notifications}
          onBack={handleCloseFullNotifications}
          markAsRead={markAsRead}
          markAllAsRead={markAllAsRead}
        />
      )}

      {/* AI Chatbot Widget */}
      <AIChatbotWidget
        showChatbot={showChatbot}
        toggleChatbot={toggleChatbot}
        chatMessages={chatMessages}
        userMessage={userMessage}
        handleUserMessage={handleUserMessage}
        sendMessage={sendMessage}
        handleKeyPress={handleKeyPress}
        chatInputRef={chatInputRef}
        chatMessagesEndRef={chatMessagesEndRef}
      />

      {/* Single Modals component */}
      <Modals
        showProfilePhotoModal={showProfilePhotoModal}
        showDoctorChat={showDoctorChat}
        showCheckoutConfirm={showCheckoutConfirm}
        showPrescriptionModal={showPrescriptionModal}
        showLogoutConfirm={showLogoutConfirm}
        showPharmacyStore={showPharmacyStore}
        showAppointmentDetails={showAppointmentDetails}
        activeDoctorChat={activeDoctorChat}
        doctorChats={doctorChats}
        selectedPharmacy={selectedPharmacy}
        selectedAppointment={selectedAppointment}
        prescriptionFile={prescriptionFile}
        prescriptionPreview={prescriptionPreview}
        profilePhotoFile={profilePhotoFile}
        profilePhotoPreview={profilePhotoPreview}
        profile={profile}
        cart={cart}
        getTotalPrice={getTotalPrice}
        paymentLoading={paymentLoading}
        getFilteredPharmacyMedicines={getFilteredPharmacyMedicines}
        pharmacySearchQueries={pharmacySearchQueries}
        handlePharmacySearch={handlePharmacySearch}
        addToCartFromPharmacy={addToCartFromPharmacy}
        updateQuantity={updateQuantity}
        sendDoctorMessage={sendDoctorMessage}
        handlePrescriptionUpload={handlePrescriptionUpload}
        handlePrescriptionSubmit={handlePrescriptionSubmit}
        handleConfirmCheckout={handleConfirmCheckout}
        handleCancelCheckout={handleCancelCheckout}
        confirmLogout={confirmLogout}
        cancelLogout={cancelLogout}
        handleProfilePhotoSubmit={handleProfilePhotoSubmit}
        removeProfilePhoto={removeProfilePhoto}
        handleProfilePhotoUpload={handleProfilePhotoUpload}
        setShowProfilePhotoModal={setShowProfilePhotoModal}
        setShowDoctorChat={setShowDoctorChat}
        setShowCheckoutConfirm={setShowCheckoutConfirm}
        setShowPrescriptionModal={setShowPrescriptionModal}
        setShowLogoutConfirm={setShowLogoutConfirm}
        setShowPharmacyStore={setShowPharmacyStore}
        setShowAppointmentDetails={setShowAppointmentDetails}
        setActiveView={handleNavigation}
      />

      {/* Main Content Views */}
      {activeView === 'dashboard' && <DashboardView />}
      {activeView === 'notifications' && (
        <FullNotificationsPage
          notifications={notifications}
          onBack={() => handleNavigation('dashboard')}
          markAsRead={markAsRead}
          markAllAsRead={markAllAsRead}
        />
      )}
      {activeView === 'profile' && (
        <ProfileView
          setActiveView={handleNavigation}
          triggerProfilePhotoUpload={triggerProfilePhotoUpload}
          removeProfilePhoto={removeProfilePhoto}
          userProfile={profile}
          updateProfile={updateProfile}
        />
      )}
      {activeView === 'appointments' && (
        <AppointmentsView
          appointments={appointments}
          filteredAppointments={filteredAppointments}
          setActiveView={handleNavigation}
          rescheduleAppointment={rescheduleAppointment}
          cancelAppointment={cancelAppointment}
          viewAppointmentDetails={viewAppointmentDetails}
          appointmentFilter={appointmentFilter}
          setAppointmentFilter={setAppointmentFilter}
        />
      )}
      {activeView === 'orders' && (
        <OrdersView
          orders={orders}
          filteredOrders={filteredOrders}
          setActiveView={handleNavigation}
          startLiveTracking={startLiveTracking}
          orderFilter={orderFilter}
          setOrderFilter={setOrderFilter}
        />
      )}
      {activeView === 'medicine' && (
        <MedicineView
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          medicines={medicines}
          filteredMedicines={filteredMedicines}
          cart={cart}
          addToCart={addToCart}
          updateQuantity={updateQuantity}
          pharmacies={pharmacies}
          viewPharmacyStore={viewPharmacyStore}
          handlePrescriptionUpload={handlePrescriptionUpload}
          setActiveView={handleNavigation}
        />
      )}
      {activeView === 'products' && (
        <Products
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          medicines={medicines}
          filteredMedicines={filteredMedicines}
          cart={cart}
          addToCart={addToCart}
          updateQuantity={updateQuantity}
          setActiveView={handleNavigation}
        />
      )}
      {activeView === 'cart' && (
        <CartView
          cart={cart}
          setActiveView={handleNavigation}
          updateQuantity={updateQuantity}
          removeFromCart={removeFromCart}
          getTotalPrice={getTotalPrice}
          handleCheckoutConfirmation={handleCheckoutConfirmation}
          paymentLoading={paymentLoading}
        />
      )}
      {activeView === 'consultation' && (
        <ConsultationView
          doctors={doctors}
          filteredDoctors={filteredDoctors}
          doctorSearchQuery={doctorSearchQuery}
          setDoctorSearchQuery={setDoctorSearchQuery}
          selectedSpecialty={selectedSpecialty}
          setSelectedSpecialty={setSelectedSpecialty}
          selectedTimeSlot={selectedTimeSlot}
          setSelectedTimeSlot={setSelectedTimeSlot}
          specialties={specialties}
          allTimeSlots={allTimeSlots}
          setActiveView={handleNavigation}
          handleBookAppointment={handleBookAppointment}
          startDoctorChat={startDoctorChat}
        />
      )}
      {activeView === 'live-tracking' && (
        <LiveTrackingView
          trackingOrder={trackingOrder}
          deliveryPartner={deliveryPartner}
          setActiveView={handleNavigation}
          callDeliveryPartner={callDeliveryPartner}
          getDeliveryProgress={getDeliveryProgress}
          getDeliveryStatusText={getDeliveryStatusText}
        />
      )}
    </div>
  );
};

// Main UserDashboard component with ProfileProvider
const UserDashboard = ({ user, onLogout }) => {
  return (
    <ProfileProvider user={user}>
      <UserDashboardContent user={user} onLogout={onLogout} />
    </ProfileProvider>
  );
};

export default UserDashboard;