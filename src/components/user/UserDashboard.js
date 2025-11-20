import React, { useState, useEffect, useRef, useContext } from 'react';
import Header from './Header';
import ProfileView from './ProfileView';
import AppointmentsView from './AppointmentsView';
import OrdersView from './OrdersView';
import MedicineView from './MedicineView';
import CartView from './CartView';
import ConsultationView from './ConsultationView';
import LiveTrackingView from './LiveTrackingView';
import NotificationsPage from './NotificationsPage';
import Modals from './Modals';
import { styles } from './Styles';

// Create a context for global profile state
const ProfileContext = React.createContext();

// Profile Provider Component
export const ProfileProvider = ({ children, user }) => {
  const [profile, setProfile] = useState({
    fullName: user?.fullName || 'Jagan',
    email: user?.email || 'yerrajagan29@gmail.com',
    phone: user?.phone || '6300604470',
    profilePhoto: user?.profilePhoto || null,
    address: user?.address || '',
    city: user?.city || '',
    pincode: user?.pincode || '',
    dateOfBirth: user?.dateOfBirth || '',
    age: user?.age || '',
    gender: user?.gender || ''
  });

  const updateProfile = (newProfile) => {
    setProfile(newProfile);
  };

  return (
    <ProfileContext.Provider value={{ profile, updateProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

// Hook to use profile context
export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};

const UserDashboardContent = ({ user, onLogout, onNavigate }) => {
  const { profile, updateProfile } = useProfile();
  
  const [activeView, setActiveView] = useState('dashboard');
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [orders, setOrders] = useState([]);
  const [showCheckoutConfirm, setShowCheckoutConfirm] = useState(false);
  
  const [userProfile, setUserProfile] = useState(profile);

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

  // Profile Photo Upload State
  const [showProfilePhotoModal, setShowProfilePhotoModal] = useState(false);
  const [profilePhotoFile, setProfilePhotoFile] = useState(null);
  const [profilePhotoPreview, setProfilePhotoPreview] = useState(profile.profilePhoto);

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
    },
    {
      id: 'APT004',
      doctorName: 'Dr. Priya Sharma',
      specialty: 'Dermatologist',
      date: '2024-01-25',
      time: '3:00 PM',
      status: 'Pending',
      type: 'Video Consultation',
      fee: 800,
      details: {
        patientName: 'User',
        symptoms: 'Skin allergy',
        notes: 'Awaiting confirmation',
        prescription: 'To be provided after consultation'
      }
    },
    {
      id: 'APT005',
      doctorName: 'Dr. Anil Kumar',
      specialty: 'Orthopedic',
      date: '2024-01-19',
      time: '4:30 PM',
      status: 'Rescheduled',
      type: 'In-Person',
      fee: 950,
      details: {
        patientName: 'User',
        symptoms: 'Knee pain',
        notes: 'Rescheduled from original date',
        prescription: 'To be provided after consultation'
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

  // Remove the showNotifications state since we're using a page now
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
    { id: 1, name: 'Aspirin 75mg', price: 25, vendor: 'WellCare Store', category: 'OTC' },
    { id: 2, name: 'Paracetamol 500mg', price: 30, vendor: 'City Pharmacy', category: 'OTC' },
    { id: 3, name: 'Ibuprofen 400mg', price: 35, vendor: 'HealthPlus Medicines', category: 'OTC' },
    { id: 4, name: 'Vitamin C 1000mg', price: 40, vendor: 'WellCare Store', category: 'Vitamins' },
    { id: 5, name: 'Amoxicillin 500mg', price: 120, vendor: 'City Pharmacy', category: 'Prescription' },
    { id: 6, name: 'Blood Pressure Monitor', price: 899, vendor: 'HealthPlus Medicines', category: 'Equipment' }
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

  // Mock doctors data - Updated with additional doctors
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
    },
    {
      id: 3,
      name: 'Dr. Rajesh Kumar',
      specialty: 'Cardiologist',
      rating: 4.9,
      experience: '18 years',
      languages: ['English', 'Hindi'],
      consultationFee: 1200,
      availableSlots: generateTimeSlots(),
      image: '👨‍⚕️',
      bio: 'Expert in heart diseases and cardiovascular treatments with 18 years of experience.',
      qualifications: 'MBBS, MD, DM (Cardiology)'
    },
    {
      id: 4,
      name: 'Dr. Priya Sharma',
      specialty: 'Dermatologist',
      rating: 4.7,
      experience: '10 years',
      languages: ['English', 'Hindi', 'Tamil'],
      consultationFee: 800,
      availableSlots: generateTimeSlots(),
      image: '👩‍⚕️',
      bio: 'Specialized in skin treatments and cosmetic dermatology with 10 years of experience.',
      qualifications: 'MBBS, MD (Dermatology)'
    },
    {
      id: 5,
      name: 'Dr. Anil Kumar',
      specialty: 'Orthopedic',
      rating: 4.6,
      experience: '14 years',
      languages: ['English', 'Hindi'],
      consultationFee: 950,
      availableSlots: generateTimeSlots(),
      image: '👨‍⚕️',
      bio: 'Expert in bone and joint treatments with 14 years of surgical experience.',
      qualifications: 'MBBS, MS (Orthopedics)'
    }
  ];

  // Enhanced mock orders data with tracking
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
    },
    {
      id: 'ORD004',
      date: '2024-01-12',
      items: [
        { name: 'Ibuprofen 400mg', quantity: 1, price: 35 },
        { name: 'Cetirizine 10mg', quantity: 2, price: 25 }
      ],
      total: 85,
      status: 'Pending',
      deliveryAddress: '789 Oak Street, City, 560001',
      trackingAvailable: false
    },
    {
      id: 'ORD005',
      date: '2024-01-08',
      items: [
        { name: 'Blood Pressure Monitor', quantity: 1, price: 899 }
      ],
      total: 899,
      status: 'Delivered',
      deliveryAddress: '321 Pine Road, City, 560001',
      trackingAvailable: false
    }
  ];

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
        setUserProfile(updatedProfile);

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
        console.log('Profile photo updated:', profileData);
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
    setUserProfile(updatedProfile);
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
    setOrders(initialOrders);
    const trackableOrder = initialOrders.find(order => 
      order.trackingAvailable && (order.status === 'In Transit' || order.status === 'On the Way')
    );
    if (trackableOrder) {
      setTrackingOrder(trackableOrder);
    }
  }, []);

  // Update the click outside handler to remove notifications dropdown logic
  useEffect(() => {
    const handleClickOutside = (event) => {
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

  // Notification functions - UPDATED
  const handleNotificationsClick = () => {
    setActiveView('notifications');
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
    
    setActiveView('appointments');
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

  // Dashboard View Component
  const DashboardView = () => (
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
  );

  return (
    <div style={styles.container}>
      <Header
        activeView={activeView}
        setActiveView={setActiveView}
        cart={cart}
        // REMOVED: showNotifications, setShowNotifications, toggleNotifications props
        notifications={notifications}
        markAsRead={markAsRead}
        markAllAsRead={markAllAsRead}
        getUnreadCount={getUnreadCount}
        // ADDED: handleNotificationsClick for navigation
        handleNotificationsClick={handleNotificationsClick}
        toggleProfileDropdown={toggleProfileDropdown}
        showProfileDropdown={showProfileDropdown}
        setShowProfileDropdown={setShowProfileDropdown}
        handleLogoutClick={handleLogoutClick}
        toggleChatbot={toggleChatbot}
        showChatbot={showChatbot}
        chatMessages={chatMessages}
        userMessage={userMessage}
        handleUserMessage={handleUserMessage}
        sendMessage={sendMessage}
        handleKeyPress={handleKeyPress}
        chatInputRef={chatInputRef}
        chatMessagesEndRef={chatMessagesEndRef}
        chatRef={chatRef}
        notificationRef={notificationRef}
        profileRef={profileRef}
        profilePhotoInputRef={profilePhotoInputRef}
        handleProfilePhotoUpload={handleProfilePhotoUpload}
        triggerProfilePhotoUpload={triggerProfilePhotoUpload}
      />

      {/* Single Modals component with all props */}
      <Modals
        // Modal visibility states
        showProfilePhotoModal={showProfilePhotoModal}
        showDoctorChat={showDoctorChat}
        showCheckoutConfirm={showCheckoutConfirm}
        showPrescriptionModal={showPrescriptionModal}
        showLogoutConfirm={showLogoutConfirm}
        showPharmacyStore={showPharmacyStore}
        showAppointmentDetails={showAppointmentDetails}
        
        // Modal data
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
        
        // Functions
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
        
        // Setter functions
        setShowProfilePhotoModal={setShowProfilePhotoModal}
        setShowDoctorChat={setShowDoctorChat}
        setShowCheckoutConfirm={setShowCheckoutConfirm}
        setShowPrescriptionModal={setShowPrescriptionModal}
        setShowLogoutConfirm={setShowLogoutConfirm}
        setShowPharmacyStore={setShowPharmacyStore}
        setShowAppointmentDetails={setShowAppointmentDetails}
        setActiveView={setActiveView}
      />

      {/* Main Content Views - ADD NotificationsPage */}
      {activeView === 'dashboard' && <DashboardView />}
      {activeView === 'notifications' && (
        <NotificationsPage
          notifications={notifications}
          markAsRead={markAsRead}
          markAllAsRead={markAllAsRead}
          getUnreadCount={getUnreadCount}
          setActiveView={setActiveView}
        />
      )}
      {activeView === 'profile' && (
        <ProfileView
          setActiveView={setActiveView}
          triggerProfilePhotoUpload={triggerProfilePhotoUpload}
          removeProfilePhoto={removeProfilePhoto}
          userProfile={userProfile}
          updateProfile={updateProfile}
        />
      )}
      {activeView === 'appointments' && (
        <AppointmentsView
          appointments={appointments}
          filteredAppointments={filteredAppointments}
          setActiveView={setActiveView}
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
          setActiveView={setActiveView}
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
          setActiveView={setActiveView}
        />
      )}
      {activeView === 'cart' && (
        <CartView
          cart={cart}
          setActiveView={setActiveView}
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
          setActiveView={setActiveView}
          handleBookAppointment={handleBookAppointment}
          startDoctorChat={startDoctorChat}
        />
      )}
      {activeView === 'live-tracking' && (
        <LiveTrackingView
          trackingOrder={trackingOrder}
          deliveryPartner={deliveryPartner}
          setActiveView={setActiveView}
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