import React, { useState, useEffect } from 'react';

const Hero = ({ onSectionChange, onNavigateToAuth }) => {
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);
  const [showDoctorsModal, setShowDoctorsModal] = useState(false);
  const [showMedicinesModal, setShowMedicinesModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingTime, setBookingTime] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [showMedicineDetails, setShowMedicineDetails] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showServiceDetails, setShowServiceDetails] = useState(null);

  useEffect(() => {
    setIsVisible(true);
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const defaultNavigateToAuth = () => {
    console.log('Navigate to auth - function not provided');
  };

  const handleAuthNavigation = onNavigateToAuth || defaultNavigateToAuth;

  const handleOrderMedicines = () => {
    setShowMedicinesModal(true);
  };

  const handleConsultDoctor = () => {
    setShowDoctorsModal(true);
  };

  const handleDoctorSelect = (doctor) => {
    setSelectedDoctor(doctor);
    setShowBookingModal(true);
  };

  const handleBookAppointment = () => {
    if (!bookingTime) {
      alert('Please select a consultation time');
      return;
    }
    
    const confirmLogin = window.confirm(
      `To book an appointment with Dr. ${selectedDoctor.name} for ${bookingTime}, you need to login first.\n\nClick OK to proceed to login page.`
    );
    
    if (confirmLogin) {
      handleAuthNavigation();
    }
  };

  const handleMedicineSelect = (medicine) => {
    setSelectedMedicine(medicine);
    setShowMedicineDetails(true);
  };

  const handleAddToCart = () => {
    const confirmLogin = window.confirm(
      `To add ${selectedMedicine.name} to your cart, you need to login first.\n\nClick OK to proceed to login page.`
    );
    
    if (confirmLogin) {
      handleAuthNavigation();
    }
  };

  // Service Details Handlers
  const handleMedicineDeliveryClick = () => {
    setShowServiceDetails('medicineDelivery');
  };

  const handleDoctorConsultationClick = () => {
    setShowServiceDetails('doctorConsultation');
  };

  const handleLiveTrackingClick = () => {
    setShowServiceDetails('liveTracking');
  };

  const closeServiceDetails = () => {
    setShowServiceDetails(null);
  };

  // Emergency contact functionality
  const handleEmergencyContact = () => {
    setShowEmergencyModal(true);
  };

  const handleEmergencyCall = () => {
    window.open('tel:9392416962');
    setShowEmergencyModal(false);
    
    setTimeout(() => {
      alert('Emergency call initiated. If the call doesn\'t connect automatically, please dial 9392416962 manually.');
    }, 500);
  };

  const handleEmergencyMessage = () => {
    const message = 'EMERGENCY: I need immediate medical assistance! Please help.';
    window.open(`https://wa.me/9392416962?text=${encodeURIComponent(message)}`, '_blank');
    setShowEmergencyModal(false);
  };

  const handleEmergencyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const locationUrl = `https://maps.google.com/?q=${latitude},${longitude}`;
          const message = `EMERGENCY: I need medical help! My location: ${locationUrl}`;
          window.open(`sms:9392416962?body=${encodeURIComponent(message)}`);
        },
        (error) => {
          const message = 'EMERGENCY: I need immediate medical assistance! Please help.';
          window.open(`sms:9392416962?body=${encodeURIComponent(message)}`);
        }
      );
    } else {
      const message = 'EMERGENCY: I need immediate medical assistance! Please help.';
      window.open(`sms:9392416962?body=${encodeURIComponent(message)}`);
    }
    setShowEmergencyModal(false);
  };

  const handleVideoConsultation = () => {
    alert('Connecting you with the nearest available emergency doctor...\n\nPlease ensure you have a stable internet connection for the video call.');
    
    setTimeout(() => {
      const confirmCall = window.confirm('Emergency video consultation is ready. Click OK to start the call.');
      if (confirmCall) {
        window.open('#', '_blank');
      }
    }, 2000);
    
    setShowEmergencyModal(false);
  };

  const closeModal = () => {
    setShowEmergencyModal(false);
    setShowDoctorsModal(false);
    setShowMedicinesModal(false);
    setShowBookingModal(false);
    setShowMedicineDetails(false);
    setSelectedDoctor(null);
    setSelectedMedicine(null);
    setBookingTime('');
  };

  // Real-time Doctor Data
  const doctors = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      specialization: 'Cardiologist',
      experience: '15 years',
      rating: 4.9,
      reviews: 1247,
      fee: '₹800',
      availability: 'Available Today',
      image: '👩‍⚕️',
      languages: ['English', 'Hindi', 'Telugu'],
      education: 'MBBS, MD - Cardiology, AIIMS Delhi',
      nextAvailable: '10:30 AM',
      about: 'Senior Cardiologist with extensive experience in heart-related disorders. Specialized in preventive cardiology and non-invasive procedures.'
    },
    {
      id: 2,
      name: 'Dr. Rajesh Kumar',
      specialization: 'General Physician',
      experience: '12 years',
      rating: 4.8,
      reviews: 892,
      fee: '₹500',
      availability: 'Available Now',
      image: '👨‍⚕️',
      languages: ['Hindi', 'English', 'Tamil'],
      education: 'MBBS, MD - General Medicine, CMC Vellore',
      nextAvailable: '11:00 AM',
      about: 'Expert in general medicine with focus on diabetes management, hypertension, and infectious diseases.'
    },
    {
      id: 3,
      name: 'Dr. Priya Sharma',
      specialization: 'Pediatrician',
      experience: '10 years',
      rating: 4.9,
      reviews: 956,
      fee: '₹600',
      availability: 'Available Today',
      image: '👩‍⚕️',
      languages: ['English', 'Hindi', 'Marathi'],
      education: 'MBBS, DCH, MD - Pediatrics, PGIMER Chandigarh',
      nextAvailable: '2:00 PM',
      about: 'Child specialist with expertise in neonatal care, vaccination, and childhood developmental disorders.'
    },
    {
      id: 4,
      name: 'Dr. Michael Chen',
      specialization: 'Neurologist',
      experience: '18 years',
      rating: 4.9,
      reviews: 678,
      fee: '₹1200',
      availability: 'Available Tomorrow',
      image: '👨‍⚕️',
      languages: ['English', 'Hindi'],
      education: 'MBBS, DM - Neurology, NIMHANS Bangalore',
      nextAvailable: '9:00 AM',
      about: 'Renowned neurologist specializing in stroke management, epilepsy, and movement disorders.'
    },
    {
      id: 5,
      name: 'Dr. Anjali Mehta',
      specialization: 'Dermatologist',
      experience: '8 years',
      rating: 4.7,
      reviews: 543,
      fee: '₹700',
      availability: 'Available Now',
      image: '👩‍⚕️',
      languages: ['Hindi', 'English', 'Gujarati'],
      education: 'MBBS, MD - Dermatology, KEM Mumbai',
      nextAvailable: '3:30 PM',
      about: 'Skin and hair specialist with expertise in cosmetic dermatology and laser treatments.'
    },
    {
      id: 6,
      name: 'Dr. Amit Patel',
      specialization: 'Orthopedic Surgeon',
      experience: '14 years',
      rating: 4.8,
      reviews: 789,
      fee: '₹900',
      availability: 'Available Today',
      image: '👨‍⚕️',
      languages: ['Hindi', 'English', 'Bengali'],
      education: 'MBBS, MS - Orthopedics, AIIMS Delhi',
      nextAvailable: '4:00 PM',
      about: 'Orthopedic specialist with expertise in joint replacement, sports injuries, and arthroscopic surgeries.'
    }
  ];

  // Emergency Medicines Data
  const emergencyMedicines = [
    {
      id: 1,
      name: 'Paracetamol 500mg',
      brand: 'Crocin',
      type: 'Tablet',
      price: '₹25',
      description: 'Fast relief from fever and mild to moderate pain',
      uses: ['Fever', 'Headache', 'Body Pain', 'Toothache'],
      deliveryTime: '30-40 mins',
      prescription: false,
      image: '💊'
    },
    {
      id: 2,
      name: 'Ibuprofen 400mg',
      brand: 'Brufen',
      type: 'Tablet',
      price: '₹45',
      description: 'Anti-inflammatory pain reliever for arthritis and muscle pain',
      uses: ['Arthritis', 'Muscle Pain', 'Back Pain', 'Inflammation'],
      deliveryTime: '30-40 mins',
      prescription: false,
      image: '💊'
    },
    {
      id: 3,
      name: 'Cetirizine 10mg',
      brand: 'Zyrtec',
      type: 'Tablet',
      price: '₹35',
      description: 'Fast-acting allergy relief for sneezing and runny nose',
      uses: ['Allergies', 'Hay Fever', 'Itching', 'Hives'],
      deliveryTime: '30-40 mins',
      prescription: false,
      image: '💊'
    },
    {
      id: 4,
      name: 'Omeprazole 20mg',
      brand: 'Omez',
      type: 'Capsule',
      price: '₹85',
      description: 'Acid reducer for heartburn and GERD',
      uses: ['Acidity', 'Heartburn', 'GERD', 'Ulcer'],
      deliveryTime: '30-40 mins',
      prescription: false,
      image: '💊'
    },
    {
      id: 5,
      name: 'Amoxicillin 500mg',
      brand: 'Mox',
      type: 'Capsule',
      price: '₹120',
      description: 'Antibiotic for bacterial infections',
      uses: ['Bacterial Infections', 'Throat Infection', 'Pneumonia'],
      deliveryTime: '30-40 mins',
      prescription: true,
      image: '💊'
    },
    {
      id: 6,
      name: 'Aspirin 75mg',
      brand: 'Ecosprin',
      type: 'Tablet',
      price: '₹28',
      description: 'Blood thinner for heart attack and stroke prevention',
      uses: ['Heart Protection', 'Pain Relief', 'Fever'],
      deliveryTime: '30-40 mins',
      prescription: false,
      image: '💊'
    },
    {
      id: 7,
      name: 'Salbutamol Inhaler',
      brand: 'Asthalin',
      type: 'Inhaler',
      price: '₹180',
      description: 'Quick relief from asthma and breathing problems',
      uses: ['Asthma', 'Bronchitis', 'Breathing Difficulty'],
      deliveryTime: '30-40 mins',
      prescription: true,
      image: '💨'
    },
    {
      id: 8,
      name: 'ORS Powder',
      brand: 'Electral',
      type: 'Powder',
      price: '₹15',
      description: 'Rehydration therapy for diarrhea and dehydration',
      uses: ['Dehydration', 'Diarrhea', 'Vomiting'],
      deliveryTime: '30-40 mins',
      prescription: false,
      image: '🥤'
    }
  ];

  // Service Details Data
  const serviceDetails = {
    medicineDelivery: {
      title: '🚚 Medicine Delivery Service',
      description: 'Get your prescribed and over-the-counter medicines delivered to your doorstep within 30-40 minutes. Our network of 500+ partner pharmacies ensures you get genuine medicines with complete safety and privacy.',
      features: [
        '📦 30-40 Minutes Guaranteed Delivery',
        '💊 Prescription & OTC Medicines',
        '🏪 500+ Partner Pharmacies',
        '🔒 Genuine & Safe Medicines',
        '📱 Real-time Order Tracking',
        '🏠 Free Home Delivery'
      ],
      process: [
        '1. Upload your prescription or select OTC medicines',
        '2. Choose delivery address and time slot',
        '3. Make secure payment online',
        '4. Track your order in real-time',
        '5. Receive medicines at your doorstep'
      ]
    },
    doctorConsultation: {
      title: '🎥 Online Doctor Consultation',
      description: 'Connect with experienced doctors via video call for comprehensive medical consultations. Get expert advice, prescriptions, and follow-up care from the comfort of your home.',
      features: [
        '👨‍⚕️ 100+ Expert Doctors',
        '🎥 HD Video Consultations',
        '⏰ 24/7 Availability',
        '💊 Digital Prescriptions',
        '📄 Medical Record Storage',
        '🔒 Complete Privacy'
      ],
      process: [
        '1. Choose your preferred doctor & specialty',
        '2. Book convenient time slot',
        '3. Connect via secure video call',
        '4. Get diagnosis & prescription',
        '5. Follow-up consultations available'
      ]
    },
    liveTracking: {
      title: '📱 Live Order Tracking',
      description: 'Track your medical orders in real-time from dispatch to delivery. Get live updates, delivery executive details, and estimated arrival time for complete peace of mind.',
      features: [
        '📍 Real-time GPS Tracking',
        '👨‍💼 Delivery Executive Details',
        '⏱️ Live ETA Updates',
        '📲 Push Notifications',
        '🗺️ Route Optimization',
        '📞 Direct Communication'
      ],
      process: [
        '1. Order confirmed & dispatched',
        '2. Track live location on map',
        '3. Get real-time ETA updates',
        '4. Receive delivery notifications',
        '5. Safe & contactless delivery'
      ]
    }
  };

  const consultationTimes = [
    '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', 
    '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM'
  ];

  const stats = [
    { number: '50,000+', label: 'Happy Customers' },
    { number: '30-40 min', label: 'Avg Delivery Time' },
    { number: '500+', label: 'Partner Pharmacies' },
    { number: '100+', label: 'Expert Doctors' }
  ];

  const services = [
    {

      name: 'Medicine Delivery',
      description: 'Prescription and OTC medicines delivered to your doorstep within 30-40 minutes',
      onClick: handleMedicineDeliveryClick
    },
    {
      name: 'Doctor Consultation',
      description: 'Video consultations with specialist doctors for comprehensive medical advice',
      onClick: handleDoctorConsultationClick
    },
    {
      name: 'Live Tracking',
      description: 'Track your medical orders in real-time from dispatch to delivery',
      onClick: handleLiveTrackingClick
    }
  ];

  const emergencyOptions = [
    {
      title: '📞 Emergency Call',
      description: 'Direct voice call with emergency medical response team',
      action: handleEmergencyCall
    },
    {
      title: '💬 WhatsApp Message',
      description: 'Send immediate message with your location and details',
      action: handleEmergencyMessage
    },
    {
      title: '📍 SMS with Location',
      description: 'Share your exact location via SMS for faster assistance',
      action: handleEmergencyLocation
    },
    {
      title: '🎥 Video Consultation',
      description: 'Instant video call with emergency doctor',
      action: handleVideoConsultation
    }
  ];

  // Responsive Styles
  const styles = {
    // Hero Section
    hero: {
      minHeight: isMobile ? 'auto' : '100vh',
      background: 'linear-gradient(135deg, #F7D9EB 0%, #ffffff 50%, #F7D9EB 100%)',
      position: 'relative',
      overflow: 'hidden',
      padding: isMobile ? '2rem 1rem' : '2rem 1rem',
    },
    heroContent: {
      maxWidth: '1200px',
      margin: '0 auto',
      position: 'relative',
      zIndex: 2,
    },
    floatingElements: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      zIndex: 1,
    },
    floatingElement: {
      position: 'absolute',
      background: 'rgba(124, 42, 98, 0.1)',
      borderRadius: '50%',
      animation: 'float 6s ease-in-out infinite',
    },
    mainHero: {
      textAlign: 'center',
      padding: isMobile ? '2rem 1rem 1rem' : '4rem 1rem 2rem',
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
      transition: 'all 0.8s ease-out',
    },
    heroTitle: {
      fontSize: isMobile ? '2.5rem' : 'clamp(2.5rem, 5vw, 4.5rem)',
      marginBottom: isMobile ? '0.8rem' : '1.5rem',
      background: 'linear-gradient(45deg, #7C2A62, #9C3A7A, #D32F2F)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      fontWeight: '800',
      lineHeight: '1.1',
      letterSpacing: '-0.02em',
    },
    heroSubtitle: {
      fontSize: isMobile ? '1.4rem' : 'clamp(1.5rem, 3vw, 2.2rem)',
      marginBottom: isMobile ? '1rem' : '2rem',
      color: '#333',
      fontWeight: '400',
      opacity: 0.9,
    },
    heroText: {
      fontSize: isMobile ? '1.1rem' : 'clamp(1.1rem, 2vw, 1.3rem)',
      lineHeight: '1.6',
      marginBottom: isMobile ? '2rem' : '3rem',
      color: '#666',
      maxWidth: '800px',
      marginLeft: 'auto',
      marginRight: 'auto',
      fontWeight: '300',
    },
    ctaButtons: {
      display: 'flex',
      gap: isMobile ? '1rem' : '1.5rem',
      justifyContent: 'center',
      flexWrap: 'wrap',
      marginBottom: isMobile ? '3rem' : '4rem',
      flexDirection: isMobile ? 'column' : 'row',
      alignItems: 'center',
    },
    primaryButton: {
      padding: isMobile ? '1rem 2rem' : '1.2rem 2.5rem',
      backgroundColor: '#7C2A62',
      color: 'white',
      border: 'none',
      borderRadius: '50px',
      cursor: 'pointer',
      fontSize: isMobile ? '1.1rem' : '1.1rem',
      fontWeight: 'bold',
      transition: 'all 0.3s ease',
      boxShadow: '0 8px 25px rgba(124, 42, 98, 0.4)',
      position: 'relative',
      overflow: 'hidden',
      width: isMobile ? '100%' : 'auto',
      maxWidth: isMobile ? '300px' : 'none',
    },
    secondaryButton: {
      padding: isMobile ? '1rem 2rem' : '1.2rem 2.5rem',
      backgroundColor: 'transparent',
      color: '#7C2A62',
      border: '3px solid #7C2A62',
      borderRadius: '50px',
      cursor: 'pointer',
      fontSize: isMobile ? '1.1rem' : '1.1rem',
      fontWeight: 'bold',
      transition: 'all 0.3s ease',
      boxShadow: '0 5px 15px rgba(124, 42, 98, 0.2)',
      position: 'relative',
      overflow: 'hidden',
      width: isMobile ? '100%' : 'auto',
      maxWidth: isMobile ? '300px' : 'none',
    },
    statsSection: {
      display: 'flex',
      justifyContent: 'center',
      gap: isMobile ? '1.5rem' : '3rem',
      marginBottom: isMobile ? '3rem' : '5rem',
      flexWrap: 'wrap',
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
      transition: 'all 0.8s ease-out 0.2s',
    },
    statItem: {
      textAlign: 'center',
      padding: isMobile ? '1rem' : '2rem 1.5rem',
      background: 'rgba(255, 255, 255, 0.7)',
      borderRadius: '20px',
      backdropFilter: 'blur(10px)',
      boxShadow: '0 8px 32px rgba(124, 42, 98, 0.1)',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      transition: 'all 0.3s ease',
      minWidth: isMobile ? '140px' : '180px',
    },
    statNumber: {
      fontSize: isMobile ? '2rem' : '2.5rem',
      fontWeight: 'bold',
      background: 'linear-gradient(45deg, #7C2A62, #D32F2F)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      marginBottom: '0.5rem',
    },
    statLabel: {
      color: '#666',
      fontSize: isMobile ? '0.9rem' : '1rem',
      fontWeight: '500',
    },
    servicesSection: {
      marginBottom: isMobile ? '3rem' : '4rem',
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
      transition: 'all 0.8s ease-out 0.4s',
    },
    sectionTitle: {
      fontSize: isMobile ? '1.8rem' : 'clamp(2rem, 4vw, 3rem)',
      textAlign: 'center',
      marginBottom: isMobile ? '2rem' : '3rem',
      color: '#7C2A62',
      fontWeight: '700',
    },
    servicesGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: isMobile ? '1.5rem' : '2rem',
      marginBottom: isMobile ? '2rem' : '3rem',
    },
    serviceCard: {
      padding: isMobile ? '1.5rem 1rem' : '2.5rem 2rem',
      background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(247,217,235,0.3) 100%)',
      borderRadius: '25px',
      boxShadow: '0 10px 40px rgba(124, 42, 98, 0.1)',
      transition: 'all 0.4s ease',
      border: '1px solid rgba(255, 255, 255, 0.5)',
      textAlign: 'center',
      backdropFilter: 'blur(10px)',
      position: 'relative',
      overflow: 'hidden',
    },
    serviceIcon: {
      fontSize: isMobile ? '3rem' : '3.5rem',
      marginBottom: isMobile ? '1rem' : '1.5rem',
      background: 'linear-gradient(45deg, #7C2A62, #D32F2F)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    serviceName: {
      fontSize: isMobile ? '1.2rem' : '1.4rem',
      marginBottom: isMobile ? '0.8rem' : '1rem',
      color: '#333',
      fontWeight: '600',
    },
    serviceDescription: {
      color: '#666',
      lineHeight: '1.6',
      fontSize: isMobile ? '0.9rem' : '1rem',
    },
    emergencySection: {
      marginTop: isMobile ? '2rem' : '3rem',
      padding: isMobile ? '1.5rem' : '3rem 2rem',
      background: 'linear-gradient(135deg, rgba(255,107,107,0.1) 0%, rgba(255,255,255,0.8) 100%)',
      borderRadius: '25px',
      border: '2px solid rgba(255,107,107,0.3)',
      textAlign: 'center',
      backdropFilter: 'blur(10px)',
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
      transition: 'all 0.8s ease-out 0.6s',
    },
    emergencyTitle: {
      fontSize: isMobile ? '1.5rem' : '1.8rem',
      marginBottom: '1rem',
      color: '#D32F2F',
      fontWeight: '600',
    },
    emergencyText: {
      color: '#666',
      marginBottom: isMobile ? '1.5rem' : '2rem',
      fontSize: isMobile ? '1rem' : '1.1rem',
      maxWidth: '600px',
      marginLeft: 'auto',
      marginRight: 'auto',
      lineHeight: '1.6',
    },
    emergencyButton: {
      padding: isMobile ? '1rem 2rem' : '1.2rem 2.5rem',
      backgroundColor: '#FF6B6B',
      color: 'white',
      border: 'none',
      borderRadius: '50px',
      cursor: 'pointer',
      fontSize: isMobile ? '1rem' : '1.1rem',
      fontWeight: 'bold',
      transition: 'all 0.3s ease',
      boxShadow: '0 8px 25px rgba(255, 107, 107, 0.4)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.8rem',
      margin: '0 auto',
      position: 'relative',
      overflow: 'hidden',
      width: isMobile ? '100%' : 'auto',
      maxWidth: isMobile ? '300px' : 'none',
    },

    // Modal Overlay (Common for all modals)
    modalOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: isMobile ? '0.5rem' : '1rem',
      backdropFilter: 'blur(5px)',
    },

    // Service Details Modal Styles
    serviceDetailsModal: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: isMobile ? '0.5rem' : '1rem',
      backdropFilter: 'blur(5px)',
    },
    serviceDetailsContent: {
      backgroundColor: 'white',
      padding: isMobile ? '1.5rem' : '2.5rem',
      borderRadius: '20px',
      maxWidth: isMobile ? '95%' : '800px',
      width: '100%',
      maxHeight: isMobile ? '90vh' : '80vh',
      overflowY: 'auto',
      boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)',
    },
    serviceDetailsTitle: {
      fontSize: isMobile ? '1.5rem' : '2rem',
      color: '#7C2A62',
      marginBottom: '1rem',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    serviceDetailsDescription: {
      fontSize: isMobile ? '1rem' : '1.1rem',
      color: '#666',
      lineHeight: '1.6',
      marginBottom: '2rem',
      textAlign: 'center',
    },
    featuresGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '1rem',
      marginBottom: '2rem',
    },
    featureItem: {
      padding: '1rem',
      backgroundColor: '#F7D9EB',
      borderRadius: '10px',
      textAlign: 'center',
      fontSize: isMobile ? '0.9rem' : '1rem',
      fontWeight: '500',
    },
    processList: {
      backgroundColor: '#f8f9fa',
      padding: '1.5rem',
      borderRadius: '10px',
      marginBottom: '2rem',
    },
    processItem: {
      marginBottom: '0.5rem',
      fontSize: isMobile ? '0.9rem' : '1rem',
      color: '#666',
      lineHeight: '1.5',
    },

    // Medicines Modal
    medicinesModalContent: {
      backgroundColor: 'white',
      padding: isMobile ? '1.5rem' : '2rem',
      borderRadius: '20px',
      maxWidth: isMobile ? '95%' : '1000px',
      width: '100%',
      maxHeight: isMobile ? '90vh' : '80vh',
      overflowY: 'auto',
      boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)',
    },
    medicinesGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: isMobile ? '1rem' : '1.5rem',
      marginBottom: isMobile ? '1.5rem' : '2rem',
    },
    medicineCard: {
      padding: isMobile ? '1rem' : '1.5rem',
      border: '2px solid #e0e0e0',
      borderRadius: '15px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      background: 'white',
      position: 'relative',
    },
    medicineHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: isMobile ? '0.8rem' : '1rem',
      marginBottom: isMobile ? '0.8rem' : '1rem',
    },
    medicineImage: {
      fontSize: isMobile ? '2rem' : '2.5rem',
    },
    medicineInfo: {
      flex: 1,
    },
    medicineName: {
      fontSize: isMobile ? '1.1rem' : '1.2rem',
      fontWeight: 'bold',
      color: '#7C2A62',
      marginBottom: '0.3rem',
    },
    medicineBrand: {
      color: '#666',
      fontSize: isMobile ? '0.8rem' : '0.9rem',
      marginBottom: '0.5rem',
    },
    medicinePrice: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      fontSize: isMobile ? '0.8rem' : '0.9rem',
      flexWrap: 'wrap',
    },
    finalPrice: {
      color: '#D32F2F',
      fontWeight: 'bold',
      fontSize: isMobile ? '1rem' : '1.1rem',
    },
    prescriptionBadge: {
      backgroundColor: '#FF9800',
      color: 'white',
      padding: '0.2rem 0.6rem',
      borderRadius: '10px',
      fontSize: isMobile ? '0.6rem' : '0.7rem',
      fontWeight: 'bold',
      marginTop: '0.5rem',
    },
    medicineDetails: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
      gap: '0.5rem',
      fontSize: isMobile ? '0.7rem' : '0.8rem',
      color: '#666',
      marginTop: '1rem',
    },
    detailItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.3rem',
    },

    // Medicine Details Modal
    medicineDetailsContent: {
      backgroundColor: 'white',
      padding: isMobile ? '1.5rem' : '2.5rem',
      borderRadius: '20px',
      maxWidth: isMobile ? '95%' : '500px',
      width: '100%',
      boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)',
    },
    medicineDetailsHeader: {
      textAlign: 'center',
      marginBottom: isMobile ? '1.5rem' : '2rem',
    },
    medicineUses: {
      marginBottom: isMobile ? '1rem' : '1.5rem',
    },
    useTag: {
      display: 'inline-block',
      backgroundColor: '#F7D9EB',
      color: '#7C2A62',
      padding: '0.3rem 0.8rem',
      borderRadius: '15px',
      fontSize: isMobile ? '0.7rem' : '0.8rem',
      margin: '0.2rem',
    },
    addToCartButton: {
      width: '100%',
      padding: isMobile ? '0.8rem' : '1rem',
      backgroundColor: '#7C2A62',
      color: 'white',
      border: 'none',
      borderRadius: '10px',
      cursor: 'pointer',
      fontSize: isMobile ? '1rem' : '1.1rem',
      fontWeight: 'bold',
      transition: 'all 0.3s ease',
      marginTop: '1rem',
    },

    // Doctors Modal
    doctorsModalContent: {
      backgroundColor: 'white',
      padding: isMobile ? '1.5rem' : '2rem',
      borderRadius: '20px',
      maxWidth: isMobile ? '95%' : '900px',
      width: '100%',
      maxHeight: isMobile ? '90vh' : '80vh',
      overflowY: 'auto',
      boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)',
    },
    doctorsGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: isMobile ? '1rem' : '1.5rem',
      marginBottom: isMobile ? '1.5rem' : '2rem',
    },
    doctorCard: {
      padding: isMobile ? '1rem' : '1.5rem',
      border: '2px solid #e0e0e0',
      borderRadius: '15px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      background: 'white',
    },
    doctorHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: isMobile ? '0.8rem' : '1rem',
      marginBottom: isMobile ? '0.8rem' : '1rem',
    },
    doctorImage: {
      fontSize: isMobile ? '2.5rem' : '3rem',
    },
    doctorInfo: {
      flex: 1,
    },
    doctorName: {
      fontSize: isMobile ? '1.1rem' : '1.3rem',
      fontWeight: 'bold',
      color: '#7C2A62',
      marginBottom: '0.3rem',
    },
    doctorSpecialization: {
      color: '#666',
      fontSize: isMobile ? '0.8rem' : '0.9rem',
      marginBottom: '0.5rem',
    },
    doctorRating: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      color: '#ffa500',
      fontSize: isMobile ? '0.8rem' : '0.9rem',
    },
    doctorDetails: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
      gap: '0.5rem',
      fontSize: isMobile ? '0.7rem' : '0.85rem',
      color: '#666',
    },
    availabilityBadge: {
      backgroundColor: '#4CAF50',
      color: 'white',
      padding: '0.3rem 0.8rem',
      borderRadius: '15px',
      fontSize: isMobile ? '0.7rem' : '0.8rem',
      fontWeight: 'bold',
    },

    // Booking Modal
    bookingModalContent: {
      backgroundColor: 'white',
      padding: isMobile ? '1.5rem' : '2.5rem',
      borderRadius: '20px',
      maxWidth: isMobile ? '95%' : '500px',
      width: '100%',
      boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)',
    },
    bookingTitle: {
      fontSize: isMobile ? '1.5rem' : '1.8rem',
      color: '#7C2A62',
      marginBottom: '1rem',
      textAlign: 'center',
    },
    bookingDoctor: {
      textAlign: 'center',
      marginBottom: isMobile ? '1.5rem' : '2rem',
      padding: isMobile ? '0.8rem' : '1rem',
      background: '#f8f9fa',
      borderRadius: '10px',
    },
    timeSlots: {
      display: 'grid',
      gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(auto-fit, minmax(120px, 1fr))',
      gap: isMobile ? '0.5rem' : '0.8rem',
      marginBottom: isMobile ? '1.5rem' : '2rem',
    },
    timeSlot: {
      padding: isMobile ? '0.6rem' : '0.8rem',
      border: '2px solid #e0e0e0',
      borderRadius: '8px',
      cursor: 'pointer',
      textAlign: 'center',
      transition: 'all 0.3s ease',
      background: 'white',
      fontSize: isMobile ? '0.8rem' : '1rem',
    },
    selectedTimeSlot: {
      borderColor: '#7C2A62',
      backgroundColor: '#F7D9EB',
      color: '#7C2A62',
      fontWeight: 'bold',
    },
    bookingButton: {
      width: '100%',
      padding: isMobile ? '0.8rem' : '1rem',
      backgroundColor: '#7C2A62',
      color: 'white',
      border: 'none',
      borderRadius: '10px',
      cursor: 'pointer',
      fontSize: isMobile ? '1rem' : '1.1rem',
      fontWeight: 'bold',
      transition: 'all 0.3s ease',
    },
    loginPrompt: {
      textAlign: 'center',
      marginTop: '1rem',
      fontSize: isMobile ? '0.8rem' : '0.9rem',
      color: '#666',
    },

    // Common Modal Elements
    modalTitle: {
      fontSize: isMobile ? '1.5rem' : '2rem',
      color: '#D32F2F',
      marginBottom: '1rem',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalSubtitle: {
      fontSize: isMobile ? '1rem' : '1.1rem',
      color: '#666',
      marginBottom: isMobile ? '2rem' : '2.5rem',
      lineHeight: '1.5',
      textAlign: 'center',
    },
    emergencyOptions: {
      display: 'flex',
      flexDirection: 'column',
      gap: isMobile ? '0.8rem' : '1.2rem',
      marginBottom: isMobile ? '2rem' : '2.5rem',
    },
    emergencyOption: {
      padding: isMobile ? '1rem' : '1.5rem',
      background: 'linear-gradient(135deg, #FFF5F5 0%, #FFE5E5 100%)',
      border: '2px solid #FF6B6B',
      borderRadius: '15px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      textAlign: 'left',
      position: 'relative',
      overflow: 'hidden',
    },
    emergencyOptionTitle: {
      fontSize: isMobile ? '1rem' : '1.2rem',
      fontWeight: 'bold',
      color: '#D32F2F',
      marginBottom: '0.5rem',
    },
    emergencyOptionDesc: {
      fontSize: isMobile ? '0.8rem' : '0.95rem',
      color: '#666',
      lineHeight: '1.4',
    },
    modalButtons: {
      display: 'flex',
      gap: '1rem',
      justifyContent: 'center',
      flexDirection: isMobile ? 'column' : 'row',
    },
    cancelButton: {
      padding: isMobile ? '0.8rem 2rem' : '1rem 2.5rem',
      backgroundColor: '#666',
      color: 'white',
      border: 'none',
      borderRadius: '25px',
      cursor: 'pointer',
      fontSize: isMobile ? '0.9rem' : '1rem',
      fontWeight: 'bold',
      transition: 'all 0.3s ease',
      width: isMobile ? '100%' : 'auto',
    },
  };

  // Generate floating elements
  const floatingElements = Array.from({ length: isMobile ? 8 : 15 }, (_, i) => ({
    id: i,
    size: Math.random() * (isMobile ? 50 : 100) + (isMobile ? 30 : 50),
    left: Math.random() * 100,
    top: Math.random() * 100,
    animationDelay: Math.random() * 5,
  }));

  return (
    <>
      <section style={styles.hero}>
        {/* Floating Background Elements */}
        <div style={styles.floatingElements}>
          {floatingElements.map((element) => (
            <div
              key={element.id}
              style={{
                ...styles.floatingElement,
                width: element.size,
                height: element.size,
                left: `${element.left}%`,
                top: `${element.top}%`,
                animationDelay: `${element.animationDelay}s`,
              }}
            />
          ))}
        </div>

        <div style={styles.heroContent}>
          {/* Main Hero Section */}
          <div style={styles.mainHero}>
            <h1 style={styles.heroTitle}>
              Your Health is Our Priority
            </h1>
            <h2 style={styles.heroSubtitle}>
              Medicine Delivery in 30-40 Minutes Guaranteed
            </h2>
            <p style={styles.heroText}>
              QuickMed revolutionizes healthcare delivery by bringing pharmacy to your doorstep. 
              Experience lightning-fast medicine delivery, expert doctor consultations, and comprehensive 
              healthcare services - all accessible through our user-friendly platform.
            </p>
            
            {/* Call to Action Buttons */}
            <div style={styles.ctaButtons}>
              <button 
                style={styles.primaryButton}
                onClick={handleOrderMedicines}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#5a1a4a';
                  e.target.style.transform = 'translateY(-5px) scale(1.05)';
                  e.target.style.boxShadow = '0 15px 35px rgba(124, 42, 98, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#7C2A62';
                  e.target.style.transform = 'translateY(0) scale(1)';
                  e.target.style.boxShadow = '0 8px 25px rgba(124, 42, 98, 0.4)';
                }}
              >
                🚀 Order Medicines Now
              </button>
              <button 
                style={styles.secondaryButton}
                onClick={handleConsultDoctor}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#7C2A62';
                  e.target.style.color = 'white';
                  e.target.style.transform = 'translateY(-5px) scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = '#7C2A62';
                  e.target.style.transform = 'translateY(0) scale(1)';
                }}
              >
                👨‍⚕️ Consult Doctor Online
              </button>
            </div>
          </div>

          {/* Statistics */}
          <div style={styles.statsSection}>
            {stats.map((stat, index) => (
              <div 
                key={index} 
                style={styles.statItem}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px)';
                  e.currentTarget.style.boxShadow = '0 15px 40px rgba(124, 42, 98, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(124, 42, 98, 0.1)';
                }}
              >
                <div style={styles.statNumber}>{stat.number}</div>
                <div style={styles.statLabel}>{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Services Section */}
          <div style={styles.servicesSection}>
            <h2 style={styles.sectionTitle}>Our Healthcare Services</h2>
            <div style={styles.servicesGrid}>
              {services.map((service, index) => (
                <div
                  key={index}
                  style={styles.serviceCard}
                  onClick={service.onClick}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
                    e.currentTarget.style.boxShadow = '0 20px 50px rgba(124, 42, 98, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow = '0 10px 40px rgba(124, 42, 98, 0.1)';
                  }}
                >
                  <div style={styles.serviceIcon}>{service.icon}</div>
                  <h3 style={styles.serviceName}>{service.name}</h3>
                  <p style={styles.serviceDescription}>{service.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Emergency Section */}
          <div style={styles.emergencySection}>
            <h3 style={styles.emergencyTitle}>🚨 Emergency Medical Assistance</h3>
            <p style={styles.emergencyText}>
              Need immediate medical help? Our emergency response team is available 24/7 to provide 
              urgent care and connect you with nearby medical facilities.
            </p>
            <button 
              style={styles.emergencyButton}
              onClick={handleEmergencyContact}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#D32F2F';
                e.target.style.transform = 'scale(1.05)';
                e.target.style.boxShadow = '0 12px 30px rgba(211, 47, 47, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#FF6B6B';
                e.target.style.transform = 'scale(1)';
                e.target.style.boxShadow = '0 8px 25px rgba(255, 107, 107, 0.4)';
              }}
            >
              🚑 Emergency Contact: 9392416962
            </button>
          </div>
        </div>
      </section>

      {/* Service Details Modal */}
      {showServiceDetails && (
        <div style={styles.serviceDetailsModal} onClick={closeServiceDetails}>
          <div style={styles.serviceDetailsContent} onClick={(e) => e.stopPropagation()}>
            <h2 style={styles.serviceDetailsTitle}>
              {serviceDetails[showServiceDetails].title}
            </h2>
            <p style={styles.serviceDetailsDescription}>
              {serviceDetails[showServiceDetails].description}
            </p>

            <h3 style={{color: '#7C2A62', marginBottom: '1rem', fontSize: '1.2rem'}}>Key Features:</h3>
            <div style={styles.featuresGrid}>
              {serviceDetails[showServiceDetails].features.map((feature, index) => (
                <div key={index} style={styles.featureItem}>
                  {feature}
                </div>
              ))}
            </div>

            <h3 style={{color: '#7C2A62', marginBottom: '1rem', fontSize: '1.2rem'}}>How It Works:</h3>
            <div style={styles.processList}>
              {serviceDetails[showServiceDetails].process.map((step, index) => (
                <div key={index} style={styles.processItem}>
                  {step}
                </div>
              ))}
            </div>

            <div style={styles.modalButtons}>
              <button 
                style={styles.cancelButton}
                onClick={closeServiceDetails}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Emergency Medicines Modal */}
      {showMedicinesModal && (
        <div style={styles.modalOverlay} onClick={closeModal}>
          <div style={styles.medicinesModalContent} onClick={(e) => e.stopPropagation()}>
            <h2 style={{...styles.modalTitle, color: '#7C2A62'}}>
              💊 Emergency Medicines - Delivery in 30-40 Minutes
            </h2>
            <div style={styles.medicinesGrid}>
              {emergencyMedicines.map((medicine) => (
                <div
                  key={medicine.id}
                  style={styles.medicineCard}
                  onClick={() => handleMedicineSelect(medicine)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = '0 10px 25px rgba(124, 42, 98, 0.2)';
                    e.currentTarget.style.borderColor = '#7C2A62';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.borderColor = '#e0e0e0';
                  }}
                >
                  <div style={styles.medicineHeader}>
                    <div style={styles.medicineImage}>{medicine.image}</div>
                    <div style={styles.medicineInfo}>
                      <div style={styles.medicineName}>{medicine.name}</div>
                      <div style={styles.medicineBrand}>{medicine.brand} • {medicine.type}</div>
                      <div style={styles.medicinePrice}>
                        <span style={styles.finalPrice}>{medicine.price}</span>
                      </div>
                    </div>
                  </div>
                  <div style={styles.medicineDetails}>
                    <div style={styles.detailItem}>🚚 {medicine.deliveryTime}</div>
                  </div>
                  {medicine.prescription && (
                    <div style={styles.prescriptionBadge}>📋 Prescription Required</div>
                  )}
                </div>
              ))}
            </div>
            <div style={styles.modalButtons}>
              <button 
                style={styles.cancelButton}
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Medicine Details Modal */}
      {showMedicineDetails && selectedMedicine && (
        <div style={styles.modalOverlay} onClick={closeModal}>
          <div style={styles.medicineDetailsContent} onClick={(e) => e.stopPropagation()}>
            <div style={styles.medicineDetailsHeader}>
              <div style={styles.medicineImage}>{selectedMedicine.image}</div>
              <div style={styles.medicineName}>{selectedMedicine.name}</div>
              <div style={styles.medicineBrand}>{selectedMedicine.brand} • {selectedMedicine.type}</div>
              <div style={styles.medicinePrice}>
                <span style={styles.finalPrice}>{selectedMedicine.price}</span>
              </div>
            </div>
            
            <p style={{color: '#666', marginBottom: '1.5rem', lineHeight: '1.5'}}>
              {selectedMedicine.description}
            </p>
            
            <div style={styles.medicineUses}>
              <h4 style={{color: '#7C2A62', marginBottom: '0.5rem'}}>Uses:</h4>
              {selectedMedicine.uses.map((use, index) => (
                <span key={index} style={styles.useTag}>{use}</span>
              ))}
            </div>
            
            <div style={styles.medicineDetails}>
              <div style={styles.detailItem}>🚚 {selectedMedicine.deliveryTime}</div>
              {selectedMedicine.prescription && (
                <div style={styles.prescriptionBadge}>📋 Prescription Required</div>
              )}
            </div>
            
            <button 
              style={styles.addToCartButton}
              onClick={handleAddToCart}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#5a1a4a';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#7C2A62';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              Add to Cart - {selectedMedicine.price}
            </button>
            
            <button 
              style={{...styles.cancelButton, marginTop: '1rem'}}
              onClick={closeModal}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Doctors Consultation Modal */}
      {showDoctorsModal && (
        <div style={styles.modalOverlay} onClick={closeModal}>
          <div style={styles.doctorsModalContent} onClick={(e) => e.stopPropagation()}>
            <h2 style={{...styles.modalTitle, color: '#7C2A62'}}>
              👨‍⚕️ Available Doctors for Online Consultation
            </h2>
            <div style={styles.doctorsGrid}>
              {doctors.map((doctor) => (
                <div
                  key={doctor.id}
                  style={styles.doctorCard}
                  onClick={() => handleDoctorSelect(doctor)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = '0 10px 25px rgba(124, 42, 98, 0.2)';
                    e.currentTarget.style.borderColor = '#7C2A62';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.borderColor = '#e0e0e0';
                  }}
                >
                  <div style={styles.doctorHeader}>
                    <div style={styles.doctorImage}>{doctor.image}</div>
                    <div style={styles.doctorInfo}>
                      <div style={styles.doctorName}>{doctor.name}</div>
                      <div style={styles.doctorSpecialization}>{doctor.specialization}</div>
                      <div style={styles.doctorRating}>
                        ⭐ {doctor.rating} ({doctor.reviews} reviews)
                      </div>
                    </div>
                  </div>
                  <div style={styles.doctorDetails}>
                    <div style={styles.detailItem}>🎓 {doctor.experience}</div>
                    <div style={styles.detailItem}>💵 {doctor.fee}</div>
                    <div style={styles.detailItem}>🕐 {doctor.nextAvailable}</div>
                    <div style={styles.availabilityBadge}>{doctor.availability}</div>
                  </div>
                  <div style={{marginTop: '1rem', fontSize: '0.85rem', color: '#666'}}>
                    {doctor.languages.join(', ')}
                  </div>
                </div>
              ))}
            </div>
            <div style={styles.modalButtons}>
              <button 
                style={styles.cancelButton}
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Booking Modal */}
      {showBookingModal && selectedDoctor && (
        <div style={styles.modalOverlay} onClick={closeModal}>
          <div style={styles.bookingModalContent} onClick={(e) => e.stopPropagation()}>
            <h2 style={styles.bookingTitle}>Book Consultation</h2>
            <div style={styles.bookingDoctor}>
              <div style={styles.doctorImage}>{selectedDoctor.image}</div>
              <div style={styles.doctorName}>{selectedDoctor.name}</div>
              <div style={styles.doctorSpecialization}>{selectedDoctor.specialization}</div>
              <div>Consultation Fee: {selectedDoctor.fee}</div>
            </div>
            
            <h3 style={{marginBottom: '1rem', color: '#7C2A62'}}>Select Time Slot:</h3>
            <div style={styles.timeSlots}>
              {consultationTimes.map((time) => (
                <div
                  key={time}
                  style={{
                    ...styles.timeSlot,
                    ...(bookingTime === time && styles.selectedTimeSlot)
                  }}
                  onClick={() => setBookingTime(time)}
                >
                  {time}
                </div>
              ))}
            </div>
            
            <button 
              style={styles.bookingButton}
              onClick={handleBookAppointment}
              disabled={!bookingTime}
              onMouseEnter={(e) => {
                if (!bookingTime) return;
                e.target.style.backgroundColor = '#5a1a4a';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                if (!bookingTime) return;
                e.target.style.backgroundColor = '#7C2A62';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              Book Appointment for {bookingTime}
            </button>
            
            <div style={styles.loginPrompt}>
              * You need to login to book an appointment
            </div>
            
            <button 
              style={{...styles.cancelButton, marginTop: '1rem'}}
              onClick={closeModal}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Emergency Contact Modal */}
      {showEmergencyModal && (
        <div style={styles.modalOverlay} onClick={closeModal}>
          <div style={styles.medicineDetailsContent} onClick={(e) => e.stopPropagation()}>
            <h2 style={styles.modalTitle}>🚨 Emergency Assistance</h2>
            <p style={styles.modalSubtitle}>
              Choose how you'd like to contact our emergency medical response team:
            </p>
            
            <div style={styles.emergencyOptions}>
              {emergencyOptions.map((option, index) => (
                <div
                  key={index}
                  style={styles.emergencyOption}
                  onClick={option.action}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#FFD5D5';
                    e.currentTarget.style.transform = 'translateX(8px) scale(1.02)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#FFF5F5';
                    e.currentTarget.style.transform = 'translateX(0) scale(1)';
                  }}
                >
                  <div style={styles.emergencyOptionTitle}>{option.title}</div>
                  <div style={styles.emergencyOptionDesc}>{option.description}</div>
                </div>
              ))}
            </div>

            <div style={styles.modalButtons}>
              <button 
                style={styles.cancelButton}
                onClick={closeModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Hero;