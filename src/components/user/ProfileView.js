import React, { useState, useEffect, useCallback } from 'react';
import { useProfile } from './ProfileContext';

// SVG Icons Component
const Icons = {
  // Back arrow
  BackArrow: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  
  // Edit pencil
  Edit: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  
  // Camera/Photo
  Camera: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="12" cy="13" r="4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  
  // Trash/Remove
  Trash: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" strokeLinecap="round" strokeLinejoin="round"/>
      <line x1="10" y1="11" x2="10" y2="17" strokeLinecap="round" strokeLinejoin="round"/>
      <line x1="14" y1="11" x2="14" y2="17" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  
  // Check mark
  Check: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
      <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  
  // Warning
  Warning: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.954-.833-2.724 0L4.346 16.5c-.77.833.192 2.5 1.732 2.5z" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  
  // Loading spinner
  Loading: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  
  // User profile
  User: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="12" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  
  // Search/Lookup
  Search: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="8" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="m21 21-4.35-4.35" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  
  // Location/Pin
  Location: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="12" cy="10" r="3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  
  // Phone
  Phone: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  
  // Email
  Email: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" strokeLinecap="round" strokeLinejoin="round"/>
      <polyline points="22,6 12,13 2,6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  
  // Calendar
  Calendar: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeLinecap="round" strokeLinejoin="round"/>
      <line x1="16" y1="2" x2="16" y2="6" strokeLinecap="round" strokeLinejoin="round"/>
      <line x1="8" y1="2" x2="8" y2="6" strokeLinecap="round" strokeLinejoin="round"/>
      <line x1="3" y1="10" x2="21" y2="10" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  
  // Gender
  Gender: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="8" r="5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 13v8m-5-5h10" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  
  // Home/Address
  Home: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" strokeLinecap="round" strokeLinejoin="round"/>
      <polyline points="9 22 9 12 15 12 15 22" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  
  // Building
  Building: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="12" cy="10" r="3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  
  // Flag/Country
  Flag: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" strokeLinecap="round" strokeLinejoin="round"/>
      <line x1="4" y1="22" x2="4" y2="15" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  
  // Linked accounts
  Link: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M15 7h3a5 5 0 0 1 5 5 5 5 0 0 1-5 5h-3m-6 0H6a5 5 0 0 1-5-5 5 5 0 0 1 5-5h3" strokeLinecap="round" strokeLinejoin="round"/>
      <line x1="8" y1="12" x2="16" y2="12" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  
  // Modal icons
  Success: () => (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#009688" strokeWidth="3">
      <circle cx="12" cy="12" r="10" stroke="#E0F6F4" strokeWidth="2"/>
      <path d="M8 12l3 3 5-6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  
  Error: () => (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#FF6B6B" strokeWidth="3">
      <circle cx="12" cy="12" r="10" stroke="#FFE5E5" strokeWidth="2"/>
      <line x1="15" y1="9" x2="9" y2="15" strokeLinecap="round" strokeLinejoin="round"/>
      <line x1="9" y1="9" x2="15" y2="15" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  
  Info: () => (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#009688" strokeWidth="3">
      <circle cx="12" cy="12" r="10" stroke="#E0F6F4" strokeWidth="2"/>
      <line x1="12" y1="16" x2="12" y2="12" strokeLinecap="round" strokeLinejoin="round"/>
      <line x1="12" y1="8" x2="12.01" y2="8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  
  WarningModal: () => (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#FF9800" strokeWidth="3">
      <circle cx="12" cy="12" r="10" stroke="#FFF3E0" strokeWidth="2"/>
      <line x1="12" y1="8" x2="12" y2="12" strokeLinecap="round" strokeLinejoin="round"/>
      <line x1="12" y1="16" x2="12.01" y2="16" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
};

const ProfileView = ({ setActiveView }) => {
  // Get profile and functions from ProfileContext
  const { profile, updateProfile, updateProfilePhoto, removeProfilePhoto } = useProfile();

  const [localProfile, setLocalProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    streetAddress: "",
    apartment: "",
    city: "",
    state: "",
    pincode: "",
    district: "",
    country: "India",
    dateOfBirth: "",
    age: "",
    gender: "",
    profilePhoto: "",
    emergencyContact: "",
    linkedAccounts: []
  });

  const [localFormErrors, setLocalFormErrors] = useState({});
  const [localIsFormValid, setLocalIsFormValid] = useState(false);
  const [localIsFormTouched, setLocalIsFormTouched] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [saveStatus, setSaveStatus] = useState('');
  const [hasChanges, setHasChanges] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [pincodeLoading, setPincodeLoading] = useState(false);
  const [pincodeData, setPincodeData] = useState(null);
  
  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [modalAction, setModalAction] = useState(null);

  // Store initial profile data to track changes
  const [initialProfile, setInitialProfile] = useState(null);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Enhanced navigation handler
  const handleBackToDashboard = () => {
    setActiveView("dashboard");
  };

  // Modal Styles with new color scheme
  const modalStyles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(18, 68, 65, 0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      animation: 'fadeIn 0.3s ease-out'
    },
    modal: {
      backgroundColor: '#FFFFFF',
      padding: '2rem',
      borderRadius: '12px',
      maxWidth: '400px',
      width: '90%',
      textAlign: 'center',
      boxShadow: '0 10px 30px rgba(18, 68, 65, 0.2)',
      animation: 'slideUp 0.3s ease-out',
      border: '1px solid #E0F2F1'
    },
    modalIcon: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: '1rem',
      height: '60px'
    },
    modalTitle: {
      color: '#009688',
      fontSize: '1.5rem',
      margin: '0 0 0.5rem 0',
      fontWeight: '700'
    },
    modalMessage: {
      color: '#4F6F6B',
      fontSize: '1rem',
      marginBottom: '1.5rem',
      lineHeight: '1.5'
    },
    modalButtons: {
      display: 'flex',
      gap: '1rem',
      justifyContent: 'center',
      marginTop: '1rem'
    },
    primaryButton: {
      padding: '0.75rem 2rem',
      backgroundColor: '#009688',
      color: '#FFFFFF',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontWeight: '600',
      fontSize: '0.9rem',
      transition: 'all 0.3s ease',
      boxShadow: '0 2px 8px rgba(0, 150, 136, 0.3)',
      minWidth: '120px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem'
    },
    secondaryButton: {
      padding: '0.75rem 2rem',
      backgroundColor: 'transparent',
      color: '#009688',
      border: '2px solid #009688',
      borderRadius: '8px',
      cursor: 'pointer',
      fontWeight: '600',
      fontSize: '0.9rem',
      transition: 'all 0.3s ease',
      minWidth: '120px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem'
    },
    warningButton: {
      padding: '0.75rem 2rem',
      backgroundColor: '#FF6B6B',
      color: '#FFFFFF',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontWeight: '600',
      fontSize: '0.9rem',
      transition: 'all 0.3s ease',
      boxShadow: '0 2px 8px rgba(255, 107, 107, 0.3)',
      minWidth: '120px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem'
    }
  };

  // Add CSS animation for success message and modal
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideDown {
        from {
          opacity: 0;
          transform: translateY(-20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      @keyframes fadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
      @keyframes slideUp {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Modal Functions
  const showModalPopup = (type, title, message, action = null) => {
    setModalType(type);
    setModalTitle(title);
    setModalMessage(message);
    setModalAction(() => action);
    setShowModal(true);
  };

  const hideModal = () => {
    setShowModal(false);
    setModalType('');
    setModalTitle('');
    setModalMessage('');
    setModalAction(null);
  };

  // Get modal icon based on type
  const getModalIcon = () => {
    switch (modalType) {
      case 'success':
        return <Icons.Success />;
      case 'warning':
        return <Icons.WarningModal />;
      case 'error':
        return <Icons.Error />;
      case 'info':
        return <Icons.Info />;
      default:
        return <Icons.Info />;
    }
  };

  // Get modal button style based on type
  const getModalButtonStyle = (isPrimary = true) => {
    switch (modalType) {
      case 'warning':
        return isPrimary ? modalStyles.warningButton : modalStyles.secondaryButton;
      default:
        return isPrimary ? modalStyles.primaryButton : modalStyles.secondaryButton;
    }
  };

  // Helper function to check if two profiles are equal
  const areProfilesEqual = (profile1, profile2) => {
    if (!profile1 || !profile2) return false;
    
    const fieldsToCompare = [
      'firstName', 'lastName', 'email', 'phone', 'streetAddress',
      'apartment', 'city', 'state', 'pincode', 'district', 'country',
      'dateOfBirth', 'age', 'gender', 'emergencyContact', 'profilePhoto'
    ];
    
    return fieldsToCompare.every(field => {
      const val1 = profile1[field] || '';
      const val2 = profile2[field] || '';
      return val1.toString().trim() === val2.toString().trim();
    });
  };

  // Helper function to calculate age from DOB
  const calculateAgeFromDOB = (dateOfBirth) => {
    if (!dateOfBirth) return "";
    
    const dob = new Date(dateOfBirth);
    const today = new Date();
    
    if (dob > today) return "0";
    
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
      age--;
    }
    
    return age > 0 ? age.toString() : "0";
  };

  // Function to fetch pincode details
  const fetchPincodeDetails = async (pincode) => {
    if (!pincode || pincode.length !== 6) {
      return null;
    }
    
    try {
      setPincodeLoading(true);
      const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
      const data = await response.json();
      
      if (data && data[0] && data[0].Status === "Success") {
        const postOffice = data[0].PostOffice[0];
        return {
          district: postOffice.District || '',
          state: postOffice.State || '',
          country: postOffice.Country || 'India'
        };
      }
      return null;
    } catch (error) {
      console.error('Error fetching pincode details:', error);
      return null;
    } finally {
      setPincodeLoading(false);
    }
  };

  // Enhanced function to parse profile data
  const parseProfileData = useCallback((profileData) => {
    if (!profileData) return null;
    
    console.log('Parsing profile data:', profileData);
    
    // Parse fullName into firstName and lastName
    const fullName = profileData.fullName || "";
    const nameParts = fullName.trim().split(' ');
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(' ') || "";
    
    // Parse address into components
    const address = profileData.address || "";
    let streetAddress = "";
    let apartment = "";
    let city = profileData.city || "";
    let state = profileData.state || "";
    let pincode = profileData.pincode || "";
    let district = profileData.district || "";
    
    if (address.includes(',')) {
      const addressParts = address.split(',');
      streetAddress = addressParts[0] || "";
      
      if (!city && addressParts.length >= 3) {
        city = addressParts[addressParts.length - 3]?.trim() || "";
      }
      if (!state && addressParts.length >= 2) {
        state = addressParts[addressParts.length - 2]?.trim() || "";
      }
      if (!pincode && addressParts.length >= 1) {
        pincode = addressParts[addressParts.length - 1]?.trim() || "";
      }
      
      if (addressParts.length > 1) {
        apartment = addressParts.slice(1, -2).join(', ').trim() || "";
      }
    } else {
      streetAddress = address;
    }
    
    const parsedProfile = {
      firstName,
      lastName,
      email: profileData.email || "",
      phone: profileData.phone || "",
      streetAddress: streetAddress.trim(),
      apartment: apartment.trim(),
      city: city.trim(),
      state: state.trim(),
      pincode: pincode.trim(),
      district: district.trim(),
      country: profileData.country || "India",
      dateOfBirth: profileData.dateOfBirth || "",
      age: profileData.age || calculateAgeFromDOB(profileData.dateOfBirth),
      gender: profileData.gender || "",
      profilePhoto: profileData.profilePhoto || "",
      emergencyContact: profileData.emergencyContact || "",
      linkedAccounts: profileData.linkedAccounts || []
    };
    
    console.log('Parsed profile:', parsedProfile);
    return parsedProfile;
  }, []);

  // CRITICAL FIX: Real-time profile sync from context - Enhanced
  useEffect(() => {
    console.log('Profile context updated:', profile);
    
    if (!profile) {
      setIsLoading(false);
      return;
    }
    
    const parsedProfile = parseProfileData(profile);
    
    if (parsedProfile) {
      console.log('Setting local profile from parsed data:', parsedProfile);
      
      // IMPORTANT: Always update local state when context changes
      // This ensures profile photo updates are reflected immediately
      setLocalProfile(parsedProfile);
      setInitialProfile(parsedProfile);
      setHasChanges(false);
      setIsLoading(false);
      
      // If we're in edit mode and just saved, exit edit mode
      if (isEditMode && areProfilesEqual(parsedProfile, localProfile)) {
        setIsEditMode(false);
      }
    } else {
      setIsLoading(false);
    }
  }, [profile, parseProfileData]);

  // Track changes in form
  useEffect(() => {
    if (initialProfile && !isLoading) {
      const hasFormChanges = !areProfilesEqual(localProfile, initialProfile);
      setHasChanges(hasFormChanges);
    }
  }, [localProfile, initialProfile, isLoading]);

  // Real-time age calculation
  useEffect(() => {
    if (!localProfile.dateOfBirth || !isEditMode) return;

    const calculatedAge = calculateAgeFromDOB(localProfile.dateOfBirth);
    if (calculatedAge !== localProfile.age) {
      setLocalProfile(prev => ({ ...prev, age: calculatedAge }));
    }
  }, [localProfile.dateOfBirth, localProfile.age, isEditMode]);

  // Effect to fetch pincode details when pincode changes
  useEffect(() => {
    if (isEditMode && localProfile.pincode && localProfile.pincode.length === 6) {
      const fetchPincode = async () => {
        const pincodeData = await fetchPincodeDetails(localProfile.pincode);
        if (pincodeData) {
          setPincodeData(pincodeData);
          setLocalProfile(prev => ({
            ...prev,
            state: pincodeData.state || prev.state,
            district: pincodeData.district || prev.district,
            country: pincodeData.country || prev.country
          }));
        }
      };
      
      const timer = setTimeout(() => {
        fetchPincode();
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [localProfile.pincode, isEditMode]);

  // Enhanced validation that triggers on form submit
  const validateLocalForm = useCallback((triggerAll = false) => {
    const errors = {};

    // Trigger validation for all fields on save
    const shouldValidate = (field) => {
      return triggerAll || localIsFormTouched || localProfile[field] !== '';
    };

    // First Name validation
    if (!localProfile.firstName.trim()) {
      errors.firstName = "First name is required";
    } else if (localProfile.firstName.trim().length < 2) {
      errors.firstName = "First name should be at least 2 characters long";
    } else if (!/^[A-Za-z]{2,}$/.test(localProfile.firstName.trim())) {
      errors.firstName = "First name should contain only letters";
    }

    // Last Name validation (optional)
    if (localProfile.lastName && localProfile.lastName.trim() && !/^[A-Za-z\s]{0,}$/.test(localProfile.lastName.trim())) {
      errors.lastName = "Last name should contain only letters";
    }

    // Email validation
    if (!localProfile.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(localProfile.email.trim())) {
      errors.email = "Enter a valid email address";
    }

    // Phone validation
    if (!localProfile.phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (!/^[6-9]\d{9}$/.test(localProfile.phone.trim())) {
      errors.phone = "Enter a valid 10-digit number starting with 6-9";
    }

    // Street Address validation
    if (!localProfile.streetAddress.trim()) {
      errors.streetAddress = "Street address is required";
    } else if (localProfile.streetAddress.trim().length < 5) {
      errors.streetAddress = "Street address should be at least 5 characters long";
    }

    // City validation - REMOVED: City is now optional
    if (localProfile.city && localProfile.city.trim() && !/^[A-Za-z\s]{2,}$/.test(localProfile.city.trim())) {
      errors.city = "City should contain only letters and be at least 2 characters";
    }

    // District validation (optional but recommended)
    if (!localProfile.district.trim()) {
      errors.district = "District is required (automatically fetched from pincode)";
    } else if (!/^[A-Za-z\s]{2,}$/.test(localProfile.district.trim())) {
      errors.district = "District should contain only letters and be at least 2 characters";
    }

    // State validation
    if (!localProfile.state.trim()) {
      errors.state = "State is required";
    } else if (!/^[A-Za-z\s]{2,}$/.test(localProfile.state.trim())) {
      errors.state = "State should contain only letters and be at least 2 characters";
    }

    // Pincode validation
    if (!localProfile.pincode) {
      errors.pincode = "Pincode is required";
    } else if (!/^\d{6}$/.test(localProfile.pincode.trim())) {
      errors.pincode = "Pincode must be exactly 6 digits";
    } else if (pincodeLoading) {
      errors.pincode = "Verifying pincode...";
    } else if (!localProfile.district && !pincodeLoading) {
      errors.pincode = "Enter a valid Indian pincode";
    }

    // Date of Birth validation - FIXED: Allow today's date
    if (!localProfile.dateOfBirth) {
      errors.dateOfBirth = "Date of birth is required";
    } else {
      const dob = new Date(localProfile.dateOfBirth);
      const today = new Date();
      
      // Set both to midnight for date-only comparison
      const todayMidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      const dobMidnight = new Date(dob.getFullYear(), dob.getMonth(), dob.getDate());
      
      if (dobMidnight > todayMidnight) {
        errors.dateOfBirth = "Date of birth cannot be in the future";
      }
    }

    // Age validation
    if (!localProfile.age) {
      errors.age = "Age is required";
    } else if (parseInt(localProfile.age) <= 0) {
      errors.age = "Age must be a positive number";
    } else if (parseInt(localProfile.age) > 120) {
      errors.age = "Please enter a valid age";
    }

    // Gender validation
    if (!localProfile.gender) {
      errors.gender = "Please select your gender";
    }

    // Emergency Contact validation (optional but if provided, validate)
    if (localProfile.emergencyContact && localProfile.emergencyContact.trim() && !/^[6-9]\d{9}$/.test(localProfile.emergencyContact.trim())) {
      errors.emergencyContact = "Enter a valid 10-digit number starting with 6-9";
    }

    setLocalFormErrors(errors);
    const isValid = Object.keys(errors).length === 0;
    setLocalIsFormValid(isValid);
    
    return isValid;
  }, [localProfile, localIsFormTouched, pincodeLoading]);

  // Real-time validation on every change
  useEffect(() => {
    if (localIsFormTouched && isEditMode) {
      validateLocalForm(false);
    }
  }, [localProfile, localIsFormTouched, validateLocalForm, isEditMode]);

  // Real-time input handlers
  const handleLocalProfileChange = (e) => {
    if (!isEditMode) return;
    
    const { name, value } = e.target;
    let updatedValue = value;

    // Real-time input formatting and validation
    switch (name) {
      case "firstName":
      case "lastName":
        updatedValue = value.replace(/[^A-Za-z\s]/g, "");
        break;
      case "city":
      case "state":
      case "country":
      case "district":
        updatedValue = value.replace(/[^A-Za-z\s]/g, "");
        break;
      case "pincode":
        updatedValue = value.replace(/\D/g, "").slice(0, 6);
        break;
      case "phone":
        updatedValue = value.replace(/\D/g, "").slice(0, 10);
        break;
      case "emergencyContact":
        updatedValue = value.replace(/\D/g, "").slice(0, 10);
        break;
      default:
        break;
    }

    setLocalProfile(prev => ({ ...prev, [name]: updatedValue }));
    setLocalIsFormTouched(true);
    
    // Clear save status when user starts typing
    if (saveStatus) {
      setSaveStatus('');
    }
  };

  const handleLocalProfileBlur = (e) => {
    if (!isEditMode) return;
    
    const { name, value } = e.target;
    
    // Auto-trim on blur
    if (value && typeof value === 'string') {
      const trimmedValue = value.trim();
      if (trimmedValue !== value) {
        setLocalProfile(prev => ({ ...prev, [name]: trimmedValue }));
      }
    }
    
    // Trigger validation for this field
    if (isEditMode) {
      validateLocalForm(false);
    }
  };

  // Real-time profile photo handling
  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Real-time file validation
    if (!file.type.startsWith('image/')) {
      showModalPopup('error', 'Invalid File', 'Please select a valid image file (JPG, PNG, GIF, etc.)');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      showModalPopup('error', 'File Too Large', 'Image size should be less than 5MB');
      return;
    }

    try {
      setSaveStatus('🔄 Uploading photo...');
      
      const imgURL = URL.createObjectURL(file);
      
      // CRITICAL: Use the context function to update profile photo globally
      await updateProfilePhoto(imgURL);
      
      // Also update local state to reflect the change immediately
      setLocalProfile(prev => ({ ...prev, profilePhoto: imgURL }));
      setHasChanges(true);
      
      showModalPopup('success', 'Photo Updated', 'Your profile photo has been updated successfully!');
      setSaveStatus('');
    } catch (error) {
      console.error('Error uploading photo:', error);
      showModalPopup('error', 'Upload Failed', 'Error uploading photo. Please try again.');
    }
  };

  const handleRemovePhoto = async () => {
    try {
      setSaveStatus('🔄 Removing photo...');
      
      // CRITICAL: Use the context function to remove profile photo globally
      await removeProfilePhoto();
      
      // Also update local state to reflect the change immediately
      setLocalProfile(prev => ({ ...prev, profilePhoto: "" }));
      setHasChanges(true);
      
      showModalPopup('success', 'Photo Removed', 'Your profile photo has been removed successfully!');
      setSaveStatus('');
    } catch (error) {
      console.error('Error removing photo:', error);
      showModalPopup('error', 'Remove Failed', 'Error removing photo. Please try again.');
    }
  };

  // Enhanced edit mode handler
  const handleEditModeToggle = () => {
    setIsEditMode(true);
    setLocalIsFormTouched(true);
    validateLocalForm(true);
  };

  // Cancel Edit with modal confirmation
  const handleCancelEditWithModal = () => {
    if (hasChanges) {
      showModalPopup(
        'warning',
        'Discard Changes?',
        'You have unsaved changes. Are you sure you want to cancel?',
        () => {
          handleCancelEdit();
          hideModal();
        }
      );
    } else {
      handleCancelEdit();
    }
  };

  // Cancel Edit implementation
  const handleCancelEdit = () => {
    if (!profile) return;
    
    const parsedProfile = parseProfileData(profile);
    if (parsedProfile) {
      setLocalProfile(parsedProfile);
      setInitialProfile(parsedProfile);
    }
    
    setLocalFormErrors({});
    setLocalIsFormTouched(false);
    setHasChanges(false);
    setIsEditMode(false);
    setSaveStatus('');
    setPincodeLoading(false);
    setPincodeData(null);
  };

  // FIXED: Real-time form submission - CRITICAL FIX
  const handleLocalProfileUpdate = async (e) => {
    e.preventDefault();

    if (!isEditMode) {
      handleEditModeToggle();
      return;
    }

    // Check if there are any actual changes
    if (!hasChanges) {
      showModalPopup(
        'info',
        'No Changes Detected',
        'You haven\'t made any changes to save.',
        () => {
          setIsEditMode(false);
          hideModal();
        }
      );
      return;
    }

    // Final validation check with all fields
    const isValid = validateLocalForm(true);
    if (!isValid) {
      showModalPopup(
        'error',
        'Validation Error',
        'Please fix all validation errors before submitting.',
        () => hideModal()
      );
      return;
    }

    setIsSubmitting(true);
    setSaveStatus('🔄 Saving profile changes...');

    try {
      // Prepare update data from localProfile state
      const fullName = `${localProfile.firstName} ${localProfile.lastName}`.trim();
      
      // Combine address fields
      const addressParts = [
        localProfile.streetAddress,
        localProfile.apartment,
        localProfile.city,
        localProfile.district,
        localProfile.state,
        localProfile.pincode
      ].filter(part => part && part.trim());
      
      const address = addressParts.join(', ');

      // CRITICAL: Prepare the exact data structure expected by updateProfile
      // Include ALL fields from the localProfile state
      const updateData = {
        fullName: fullName,
        email: localProfile.email,
        phone: localProfile.phone,
        address: address,
        city: localProfile.city || '',
        state: localProfile.state,
        pincode: localProfile.pincode,
        district: localProfile.district,
        country: localProfile.country,
        dateOfBirth: localProfile.dateOfBirth,
        age: localProfile.age,
        gender: localProfile.gender,
        profilePhoto: localProfile.profilePhoto || '',
        emergencyContact: localProfile.emergencyContact || '',
        linkedAccounts: localProfile.linkedAccounts || []
      };

      console.log('Updating profile with data:', updateData);
      
      // IMPORTANT: Use the context function to update profile globally
      // This ensures both context and localStorage are updated
      await updateProfile(updateData);
      
      // Update initial profile to current state
      setInitialProfile(localProfile);
      setHasChanges(false);
      setLocalIsFormTouched(false);
      
      // Show success modal
      showModalPopup(
        'success',
        'Profile Updated Successfully!',
        'Your profile information has been saved successfully.',
        () => {
          setIsEditMode(false);
          hideModal();
        }
      );
      
    } catch (error) {
      console.error('Profile update error:', error);
      showModalPopup(
        'error',
        'Update Failed',
        'Error updating profile. Please try again.',
        () => hideModal()
      );
    } finally {
      setIsSubmitting(false);
      setSaveStatus('');
    }
  };

  // Helper function to get input styles
  const getInputStyle = (fieldName) => {
    const baseStyle = {
      padding: '0.75rem',
      border: '2px solid #E0F6F4',
      borderRadius: '8px',
      fontSize: '0.9rem',
      transition: 'all 0.3s ease',
      cursor: 'text',
      fontFamily: 'inherit',
      backgroundColor: '#FFFFFF',
      color: '#124441'
    };
    const errorStyle = localFormErrors[fieldName] ? {
      borderColor: '#FF6B6B !important',
      backgroundColor: '#FFF5F5',
    } : {};
    const disabledStyle = !isEditMode ? {
      backgroundColor: '#E0F6F4',
      color: '#4F6F6B',
      cursor: 'not-allowed',
      borderColor: '#4DB6AC',
    } : {};
    const focusStyle = isEditMode ? {
      borderColor: '#009688',
      boxShadow: '0 0 0 2px rgba(0, 150, 136, 0.1)',
      outline: 'none'
    } : {};
    const pincodeLoadingStyle = (fieldName === 'pincode' && pincodeLoading) ? {
      borderColor: '#FF9800',
      backgroundImage: 'linear-gradient(45deg, #FF9800 25%, transparent 25%, transparent 50%, #FF9800 50%, #FF9800 75%, transparent 75%, transparent)',
      backgroundSize: '20px 20px',
      animation: 'loadingBar 1s infinite linear',
    } : {};
    
    return {
      ...baseStyle,
      ...errorStyle,
      ...disabledStyle,
      ...focusStyle,
      ...pincodeLoadingStyle,
      cursor: !isEditMode ? 'not-allowed' : 'text'
    };
  };

  // Check if profile is complete
  const isProfileComplete = () => {
    const requiredFields = ['firstName', 'email', 'phone', 'streetAddress', 'district', 'state', 'pincode', 'dateOfBirth', 'gender'];
    return requiredFields.every(field => localProfile[field] && localProfile[field].trim());
  };

  // Get save status style
  const getSaveStatusStyle = () => {
    const baseStyle = {
      textAlign: 'center',
      padding: '0.75rem',
      marginTop: '0.75rem',
      borderRadius: '6px',
      fontWeight: '500',
      fontSize: '0.85rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem'
    };
    
    if (saveStatus.includes('✅')) return { ...baseStyle, backgroundColor: '#E0F6F4', color: '#009688', border: '2px solid #4DB6AC' };
    if (saveStatus.includes('❌')) return { ...baseStyle, backgroundColor: '#FFE5E5', color: '#FF6B6B', border: '2px solid #FF6B6B' };
    if (saveStatus.includes('🔄')) return { ...baseStyle, backgroundColor: '#E0F6F4', color: '#009688', border: '2px solid #4DB6AC' };
    return baseStyle;
  };

  // Add loading animation for pincode
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes loadingBar {
        0% {
          backgroundPosition: 0 0;
        }
        100% {
          backgroundPosition: 20px 0;
        }
      }
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Modal Component
  const Modal = () => {
    if (!showModal) return null;

    return (
      <div style={modalStyles.overlay} onClick={hideModal}>
        <div style={modalStyles.modal} onClick={(e) => e.stopPropagation()}>
          <div style={modalStyles.modalIcon}>{getModalIcon()}</div>
          <h3 style={modalStyles.modalTitle}>{modalTitle}</h3>
          <p style={modalStyles.modalMessage}>{modalMessage}</p>
          <div style={modalStyles.modalButtons}>
            {modalType === 'warning' ? (
              <>
                <button
                  style={getModalButtonStyle(true)}
                  onClick={() => {
                    if (modalAction) modalAction();
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#cc0000';
                    e.target.style.transform = 'translateY(-1px)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = '#FF6B6B';
                    e.target.style.transform = 'translateY(0)';
                  }}
                >
                  <Icons.Trash /> Discard Changes
                </button>
                <button
                  style={getModalButtonStyle(false)}
                  onClick={hideModal}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#009688';
                    e.target.style.color = '#FFFFFF';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.color = '#009688';
                  }}
                >
                  Continue Editing
                </button>
              </>
            ) : modalType === 'info' ? (
              <>
                <button
                  style={getModalButtonStyle(true)}
                  onClick={() => {
                    if (modalAction) {
                      modalAction();
                    } else {
                      hideModal();
                    }
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#00796B';
                    e.target.style.transform = 'translateY(-1px)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = '#009688';
                    e.target.style.transform = 'translateY(0)';
                  }}
                >
                  <Icons.Check /> Continue
                </button>
              </>
            ) : (
              <button
                style={getModalButtonStyle(true)}
                onClick={() => {
                  if (modalAction) {
                    modalAction();
                  } else {
                    hideModal();
                  }
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#00796B';
                  e.target.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#009688';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                {modalType === 'success' ? (
                  <>
                    <Icons.Check /> Continue
                  </>
                ) : (
                  'OK'
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Profile-specific styles
  const styles = {
    profileContainer: {
      marginTop: '140px',
      padding: '2rem 1rem 1rem 1rem',
      maxWidth: '800px',
      marginLeft: 'auto',
      marginRight: 'auto',
      minHeight: 'calc(100vh - 120px)',
      backgroundColor: '#E0F6F4',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      position: 'relative',
      zIndex: 1,
    },
    loadingContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '400px',
    },
    loadingText: {
      color: '#009688',
      fontSize: '1.2rem',
      fontWeight: '600',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    pageHeader: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '2rem',
      marginBottom: '2rem',
      textAlign: 'center',
      position: 'relative',
    },
    backButton: {
      padding: '0.75rem 1.5rem',
      backgroundColor: 'transparent',
      marginTop: '1.5rem',
      color: '#009688',
      border: '2px solid #009688',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '0.9rem',
      fontWeight: '600',
      transition: 'all 0.3s ease',
      alignSelf: 'flex-start',
      position: 'relative',
      zIndex: 2,
      marginBottom: '0.5rem',
      minWidth: '180px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem'
    },
    headerContent: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '0.75rem',
      width: '100%',
    },
    sectionTitle: {
      color: '#124441',
      fontSize: '2rem',
      margin: 0,
      fontWeight: '800',
      background: 'linear-gradient(135deg, #009688, #4DB6AC)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    profileStatus: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
    },
    statusComplete: {
      color: '#009688',
      fontWeight: '700',
      fontSize: '0.9rem',
      padding: '0.5rem 1rem',
      backgroundColor: '#E0F6F4',
      borderRadius: '20px',
      border: '2px solid #4DB6AC',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    statusIncomplete: {
      color: '#FF9800',
      fontWeight: '700',
      fontSize: '0.9rem',
      padding: '0.5rem 1rem',
      backgroundColor: '#FFF3E0',
      borderRadius: '20px',
      border: '2px solid #FF9800',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    profilePhotoSection: {
      backgroundColor: '#FFFFFF',
      padding: '1.5rem',
      borderRadius: '12px',
      boxShadow: '0 4px 16px rgba(18, 68, 65, 0.1)',
      marginBottom: '1.5rem',
      textAlign: 'center',
      border: '2px solid #E0F6F4',
    },
    profilePhotoContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '1rem',
    },
    profilePhotoPreview: {
      width: '120px',
      height: '120px',
      borderRadius: '50%',
      backgroundColor: '#E0F6F4',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      border: '3px solid #009688',
      boxShadow: '0 2px 8px rgba(0, 150, 136, 0.3)',
      position: 'relative',
    },
    profilePhotoImage: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
    profilePhotoPlaceholder: {
      fontSize: '3rem',
      color: '#009688',
      fontWeight: 'bold',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
    },
    profilePhotoActions: {
      display: 'flex',
      gap: '0.75rem',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'center',
    },
    uploadPhotoButton: {
      padding: '0.75rem 1.5rem',
      backgroundColor: '#4DB6AC',
      color: '#FFFFFF',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontWeight: '600',
      fontSize: '0.9rem',
      transition: 'all 0.3s ease',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
      boxShadow: '0 2px 8px rgba(77, 182, 172, 0.3)',
    },
    removePhotoButton: {
      padding: '0.75rem 1.5rem',
      backgroundColor: '#FF6B6B',
      color: '#FFFFFF',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontWeight: '600',
      fontSize: '0.9rem',
      transition: 'all 0.3s ease',
      boxShadow: '0 2px 8px rgba(255, 107, 107, 0.3)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem'
    },
    editProfileButton: {
      padding: '0.75rem 2rem',
      backgroundColor: '#009688',
      color: '#FFFFFF',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontWeight: '600',
      fontSize: '0.9rem',
      transition: 'all 0.3s ease',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
      boxShadow: '0 2px 8px rgba(0, 150, 136, 0.3)',
      minWidth: '160px',
    },
    profileForm: {
      backgroundColor: '#FFFFFF',
      padding: '1.5rem',
      borderRadius: '12px',
      boxShadow: '0 4px 16px rgba(18, 68, 65, 0.1)',
      border: '2px solid #E0F6F4',
    },
    formGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '1rem',
      marginBottom: '1.5rem',
    },
    formGroup: {
      display: 'flex',
      flexDirection: 'column',
    },
    formLabel: {
      marginBottom: '0.5rem',
      color: '#124441',
      fontWeight: '600',
      fontSize: '0.9rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.25rem',
    },
    requiredMarker: {
      color: '#FF6B6B',
      fontSize: '1rem',
    },
    formError: {
      color: '#FF6B6B',
      fontSize: '0.8rem',
      marginTop: '0.25rem',
      fontWeight: '500',
      display: 'flex',
      alignItems: 'center',
      gap: '0.25rem'
    },
    formTextarea: {
      padding: '0.75rem',
      border: '2px solid #E0F6F4',
      borderRadius: '8px',
      fontSize: '0.9rem',
      resize: 'vertical',
      minHeight: '80px',
      fontFamily: 'inherit',
      cursor: 'text',
      backgroundColor: '#FFFFFF',
      color: '#124441',
    },
    fieldNote: {
      color: '#4F6F6B',
      fontSize: '0.8rem',
      marginTop: '0.25rem',
      fontStyle: 'italic',
      display: 'flex',
      alignItems: 'center',
      gap: '0.25rem'
    },
    phoneInputContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      width: '100%',
    },
    phonePrefix: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.75rem 1rem',
      backgroundColor: '#E0F6F4',
      borderRadius: '8px',
      fontWeight: '600',
      color: '#009688',
      fontSize: '0.9rem',
      border: '2px solid #4DB6AC',
      minWidth: '100px',
      justifyContent: 'center',
      flexShrink: 0,
    },
    actionButtons: {
      display: 'flex',
      gap: '0.75rem',
      justifyContent: 'center',
      marginTop: '1.5rem',
      paddingTop: '1.5rem',
      borderTop: '2px solid #E0F6F4',
    },
    updateButton: {
      padding: '0.75rem 2rem',
      backgroundColor: '#009688',
      color: '#FFFFFF',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontWeight: '600',
      fontSize: '0.9rem',
      transition: 'all 0.3s ease',
      boxShadow: '0 2px 8px rgba(0, 150, 136, 0.3)',
      minWidth: '160px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem'
    },
    updateButtonDisabled: {
      backgroundColor: '#B2DFDB',
      cursor: 'not-allowed',
      boxShadow: 'none',
      color: '#4F6F6B',
    },
    cancelButton: {
      padding: '0.75rem 2rem',
      backgroundColor: 'transparent',
      color: '#009688',
      border: '2px solid #009688',
      borderRadius: '8px',
      cursor: 'pointer',
      fontWeight: '600',
      fontSize: '0.9rem',
      transition: 'all 0.3s ease',
      minWidth: '120px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem'
    },
    validationSummary: {
      backgroundColor: '#FFF5F5',
      border: '2px solid #FF6B6B',
      borderRadius: '8px',
      padding: '1rem',
      marginBottom: '1.5rem',
    },
    validationSummaryTitle: {
      color: '#FF6B6B',
      margin: '0 0 0.5rem 0',
      fontSize: '1rem',
      fontWeight: '600',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    validationSummaryList: {
      margin: 0,
      paddingLeft: '1.5rem',
    },
    validationSummaryItem: {
      color: '#D32F2F',
      fontSize: '0.85rem',
      marginBottom: '0.25rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.25rem'
    },
    autoFilledField: {
      backgroundColor: '#F0FFF8',
      borderColor: '#4CAF50',
      borderStyle: 'dashed',
    },
  };

  // Get validation summary
  const getValidationSummary = () => {
    const errorCount = Object.keys(localFormErrors).length;
    if (errorCount === 0 || !localIsFormTouched) return null;

    return (
      <div style={styles.validationSummary}>
        <h4 style={styles.validationSummaryTitle}>
          <Icons.Warning /> Please fix {errorCount} error{errorCount !== 1 ? 's' : ''} before saving:
        </h4>
        <ul style={styles.validationSummaryList}>
          {Object.entries(localFormErrors).map(([field, error]) => (
            <li key={field} style={styles.validationSummaryItem}>
              • {error}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  // Show loading state
  if (isLoading) {
    return (
      <div style={styles.profileContainer}>
        <div style={styles.loadingContainer}>
          <div style={styles.loadingText}>
            <Icons.Loading style={{ animation: 'spin 1s linear infinite' }} /> Loading profile data...
          </div>
        </div>
      </div>
    );
  }

  // Show empty state if no profile
  if (!profile) {
    return (
      <div style={styles.profileContainer}>
        <div style={styles.pageHeader}>
          <button 
            style={styles.backButton} 
            onClick={handleBackToDashboard}
            aria-label="Back to dashboard"
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#009688';
              e.target.style.color = '#FFFFFF';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.color = '#009688';
            }}
          >
            <Icons.BackArrow /> Back to Dashboard
          </button>
          <div style={styles.headerContent}>
            <h2 style={styles.sectionTitle}>
              <Icons.User /> My Profile
            </h2>
          </div>
        </div>
        <div style={styles.profileForm}>
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <h3 style={{ color: '#124441', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
              <Icons.Warning /> No Profile Data Found
            </h3>
            <p style={{ color: '#4F6F6B', marginBottom: '2rem' }}>
              Please complete your signup to create a profile.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Modal />
      
      <div style={styles.profileContainer}>
        {/* Compact Header */}
        <div style={styles.pageHeader}>
          <button 
            style={styles.backButton} 
            onClick={handleBackToDashboard}
            aria-label="Back to dashboard"
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#009688';
              e.target.style.color = '#FFFFFF';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.color = '#009688';
            }}
          >
            <Icons.BackArrow /> Back to Dashboard
          </button>
          <div style={styles.headerContent}>
            <h2 style={styles.sectionTitle}>
              <Icons.User /> My Profile
            </h2>
            {!isEditMode && (
              <div style={styles.profileStatus}>
                <span style={isProfileComplete() ? styles.statusComplete : styles.statusIncomplete}>
                  {isProfileComplete() ? (
                    <>
                      <Icons.Check /> Profile Complete
                    </>
                  ) : (
                    <>
                      <Icons.Warning /> Profile Incomplete
                    </>
                  )}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Profile Photo Section - Compact */}
        <div style={styles.profilePhotoSection}>
          <div style={styles.profilePhotoContainer}>
            <div style={styles.profilePhotoPreview}>
              {localProfile.profilePhoto ? (
                <img
                  src={localProfile.profilePhoto}
                  alt="Profile"
                  style={styles.profilePhotoImage}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    handleRemovePhoto();
                  }}
                />
              ) : (
                <div style={styles.profilePhotoPlaceholder}>
                  <Icons.User />
                </div>
              )}
            </div>

            <div style={styles.profilePhotoActions}>
              {!isEditMode ? (
                <button
                  style={styles.editProfileButton}
                  onClick={handleEditModeToggle}
                  type="button"
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#00796B';
                    e.target.style.transform = 'translateY(-1px)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = '#009688';
                    e.target.style.transform = 'translateY(0)';
                  }}
                >
                  <Icons.Edit /> Edit Profile
                </button>
              ) : (
                <>
                  <label style={styles.uploadPhotoButton}>
                    <Icons.Camera /> Update Photo
                    <input
                      type="file"
                      accept="image/*"
                      hidden
                      onChange={handlePhotoUpload}
                    />
                  </label>

                  {localProfile.profilePhoto && (
                    <button
                      style={styles.removePhotoButton}
                      type="button"
                      onClick={handleRemovePhoto}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = '#cc0000';
                        e.target.style.transform = 'translateY(-1px)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = '#FF6B6B';
                        e.target.style.transform = 'translateY(0)';
                      }}
                    >
                      <Icons.Trash /> Remove
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        {/* Validation Summary */}
        {getValidationSummary()}

        {/* Save Status Display */}
        {saveStatus && (
          <div style={getSaveStatusStyle()}>
            {saveStatus.includes('🔄') && <Icons.Loading style={{ animation: 'spin 1s linear infinite' }} />}
            {saveStatus.includes('✅') && <Icons.Check />}
            {saveStatus.includes('❌') && <Icons.Error />}
            {saveStatus.replace(/[🔄✅❌]/g, '')}
          </div>
        )}

        {/* Profile Form - Compact */}
        <form onSubmit={handleLocalProfileUpdate} style={styles.profileForm}>
          <div style={styles.formGrid}>
            {/* Name Section */}
            <div style={styles.formGroup}>
              <label style={styles.formLabel}>
                First Name <span style={styles.requiredMarker}>*</span>
              </label>
              <input
                type="text"
                name="firstName"
                value={localProfile.firstName}
                onChange={handleLocalProfileChange}
                onBlur={handleLocalProfileBlur}
                placeholder="Enter your first name"
                style={getInputStyle("firstName")}
                disabled={!isEditMode}
                onFocus={(e) => e.target.style.borderColor = '#009688'}
              />
              {localFormErrors.firstName && (
                <span style={styles.formError}>
                  <Icons.Error style={{ width: '12px', height: '12px' }} /> {localFormErrors.firstName}
                </span>
              )}
            </div>

            <div style={styles.formGroup}>
              <label style={styles.formLabel}>Last Name</label>
              <input
                type="text"
                name="lastName"
                value={localProfile.lastName}
                onChange={handleLocalProfileChange}
                onBlur={handleLocalProfileBlur}
                placeholder="Enter your last name"
                style={getInputStyle("lastName")}
                disabled={!isEditMode}
                onFocus={(e) => e.target.style.borderColor = '#009688'}
              />
              {localFormErrors.lastName && (
                <span style={styles.formError}>
                  <Icons.Error style={{ width: '12px', height: '12px' }} /> {localFormErrors.lastName}
                </span>
              )}
            </div>

            {/* Contact Information */}
            <div style={styles.formGroup}>
              <label style={styles.formLabel}>
                <Icons.Email style={{ width: '14px', height: '14px' }} /> Email <span style={styles.requiredMarker}>*</span>
              </label>
              <input
                type="email"
                name="email"
                value={localProfile.email}
                onChange={handleLocalProfileChange}
                onBlur={handleLocalProfileBlur}
                placeholder="Enter your email address"
                style={getInputStyle("email")}
                disabled={!isEditMode}
                onFocus={(e) => e.target.style.borderColor = '#009688'}
              />
              {localFormErrors.email && (
                <span style={styles.formError}>
                  <Icons.Error style={{ width: '12px', height: '12px' }} /> {localFormErrors.email}
                </span>
              )}
            </div>

            {/* Phone Field - Extended container */}
            <div style={styles.formGroup}>
              <label style={styles.formLabel}>
                <Icons.Phone style={{ width: '14px', height: '14px' }} /> Phone <span style={styles.requiredMarker}>*</span>
              </label>
              <div style={styles.phoneInputContainer}>
                <div style={styles.phonePrefix}>
                  <Icons.Location style={{ width: '14px', height: '14px' }} /> +91
                </div>
                <input
                  type="tel"
                  name="phone"
                  value={localProfile.phone}
                  onChange={handleLocalProfileChange}
                  onBlur={handleLocalProfileBlur}
                  style={getInputStyle("phone")}
                  placeholder="10-digit mobile number"
                  maxLength="10"
                  disabled={!isEditMode}
                  onFocus={(e) => e.target.style.borderColor = '#009688'}
                />
              </div>
              {localFormErrors.phone && (
                <span style={styles.formError}>
                  <Icons.Error style={{ width: '12px', height: '12px' }} /> {localFormErrors.phone}
                </span>
              )}
            </div>

            {/* Emergency Contact */}
            <div style={styles.formGroup}>
              <label style={styles.formLabel}>Emergency Contact</label>
              <div style={styles.phoneInputContainer}>
                <div style={styles.phonePrefix}>
                  <Icons.Location style={{ width: '14px', height: '14px' }} /> +91
                </div>
                <input
                  type="tel"
                  name="emergencyContact"
                  value={localProfile.emergencyContact}
                  onChange={handleLocalProfileChange}
                  onBlur={handleLocalProfileBlur}
                  style={getInputStyle("emergencyContact")}
                  placeholder="10-digit emergency number"
                  maxLength="10"
                  disabled={!isEditMode}
                  onFocus={(e) => e.target.style.borderColor = '#009688'}
                />
              </div>
              {localFormErrors.emergencyContact && (
                <span style={styles.formError}>
                  <Icons.Error style={{ width: '12px', height: '12px' }} /> {localFormErrors.emergencyContact}
                </span>
              )}
              <p style={styles.fieldNote}>Optional - for emergency notifications</p>
            </div>

            {/* Personal Information */}
            <div style={styles.formGroup}>
              <label style={styles.formLabel}>
                <Icons.Calendar style={{ width: '14px', height: '14px' }} /> Date of Birth <span style={styles.requiredMarker}>*</span>
              </label>
              <input
                type="date"
                name="dateOfBirth"
                value={localProfile.dateOfBirth}
                onChange={handleLocalProfileChange}
                style={getInputStyle("dateOfBirth")}
                disabled={!isEditMode}
                max={new Date().toISOString().split('T')[0]}
                onFocus={(e) => e.target.style.borderColor = '#009688'}
              />
              {localFormErrors.dateOfBirth && (
                <span style={styles.formError}>
                  <Icons.Error style={{ width: '12px', height: '12px' }} /> {localFormErrors.dateOfBirth}
                </span>
              )}
              <p style={styles.fieldNote}>Today's date is allowed</p>
            </div>

            {/* Age Field (Read-only) */}
            <div style={styles.formGroup}>
              <label style={styles.formLabel}>
                Age <span style={styles.requiredMarker}>*</span>
              </label>
              <input
                type="text"
                name="age"
                value={localProfile.age ? `${localProfile.age} years` : ""}
                readOnly
                style={getInputStyle("age")}
              />
              <p style={styles.fieldNote}>Automatically calculated from date of birth</p>
              {localFormErrors.age && (
                <span style={styles.formError}>
                  <Icons.Error style={{ width: '12px', height: '12px' }} /> {localFormErrors.age}
                </span>
              )}
            </div>

            {/* Gender Field */}
            <div style={styles.formGroup}>
              <label style={styles.formLabel}>
                <Icons.Gender style={{ width: '14px', height: '14px' }} /> Gender <span style={styles.requiredMarker}>*</span>
              </label>
              <select
                name="gender"
                value={localProfile.gender}
                onChange={handleLocalProfileChange}
                style={getInputStyle("gender")}
                disabled={!isEditMode}
                onFocus={(e) => e.target.style.borderColor = '#009688'}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="prefer-not-to-say">Prefer not to say</option>
              </select>
              {localFormErrors.gender && (
                <span style={styles.formError}>
                  <Icons.Error style={{ width: '12px', height: '12px' }} /> {localFormErrors.gender}
                </span>
              )}
            </div>

            {/* Address Section */}
            <div style={styles.formGroup}>
              <label style={styles.formLabel}>
                <Icons.Home style={{ width: '14px', height: '14px' }} /> Street Address <span style={styles.requiredMarker}>*</span>
              </label>
              <textarea
                name="streetAddress"
                rows="2"
                value={localProfile.streetAddress}
                onChange={handleLocalProfileChange}
                onBlur={handleLocalProfileBlur}
                style={getInputStyle("streetAddress")}
                disabled={!isEditMode}
                placeholder="House number, street name"
                onFocus={(e) => e.target.style.borderColor = '#009688'}
              />
              {localFormErrors.streetAddress && (
                <span style={styles.formError}>
                  <Icons.Error style={{ width: '12px', height: '12px' }} /> {localFormErrors.streetAddress}
                </span>
              )}
            </div>

            <div style={styles.formGroup}>
              <label style={styles.formLabel}>
                <Icons.Building style={{ width: '14px', height: '14px' }} /> Apartment/Building (Optional)
              </label>
              <input
                type="text"
                name="apartment"
                value={localProfile.apartment}
                onChange={handleLocalProfileChange}
                onBlur={handleLocalProfileBlur}
                placeholder="Apartment, suite, building"
                style={getInputStyle("apartment")}
                disabled={!isEditMode}
                onFocus={(e) => e.target.style.borderColor = '#009688'}
              />
            </div>

            {/* City Field - Now Optional */}
            <div style={styles.formGroup}>
              <label style={styles.formLabel}>City (Optional)</label>
              <input
                type="text"
                name="city"
                value={localProfile.city}
                onChange={handleLocalProfileChange}
                onBlur={handleLocalProfileBlur}
                placeholder="Enter your city (optional)"
                style={getInputStyle("city")}
                disabled={!isEditMode}
                onFocus={(e) => e.target.style.borderColor = '#009688'}
              />
              {localFormErrors.city && (
                <span style={styles.formError}>
                  <Icons.Error style={{ width: '12px', height: '12px' }} /> {localFormErrors.city}
                </span>
              )}
              <p style={styles.fieldNote}>Optional - District will be auto-filled from pincode</p>
            </div>

            {/* District Field - Auto-filled from pincode */}
            <div style={styles.formGroup}>
              <label style={styles.formLabel}>
                <Icons.Location style={{ width: '14px', height: '14px' }} /> District <span style={styles.requiredMarker}>*</span>
              </label>
              <input
                type="text"
                name="district"
                value={localProfile.district}
                onChange={handleLocalProfileChange}
                onBlur={handleLocalProfileBlur}
                placeholder="District (auto-filled from pincode)"
                style={{
                  ...getInputStyle("district"),
                  ...(localProfile.district && !localFormErrors.district && styles.autoFilledField)
                }}
                disabled={!isEditMode}
                onFocus={(e) => e.target.style.borderColor = '#009688'}
                readOnly={!!localProfile.district && pincodeData}
              />
              {localFormErrors.district && (
                <span style={styles.formError}>
                  <Icons.Error style={{ width: '12px', height: '12px' }} /> {localFormErrors.district}
                </span>
              )}
              <p style={styles.fieldNote}>
                {pincodeLoading 
                  ? <><Icons.Loading style={{ animation: 'spin 1s linear infinite', width: '12px', height: '12px' }} /> Looking up district from pincode...</> 
                  : localProfile.district 
                    ? <><Icons.Check style={{ width: '12px', height: '12px' }} /> Auto-filled from pincode</> 
                    : "Enter pincode to auto-fill district"}
              </p>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.formLabel}>
                <Icons.Location style={{ width: '14px', height: '14px' }} /> State <span style={styles.requiredMarker}>*</span>
              </label>
              <input
                type="text"
                name="state"
                value={localProfile.state}
                onChange={handleLocalProfileChange}
                onBlur={handleLocalProfileBlur}
                placeholder="State"
                style={{
                  ...getInputStyle("state"),
                  ...(localProfile.state && !localFormErrors.state && localProfile.pincode && styles.autoFilledField)
                }}
                disabled={!isEditMode}
                onFocus={(e) => e.target.style.borderColor = '#009688'}
                readOnly={!!localProfile.state && pincodeData}
              />
              {localFormErrors.state && (
                <span style={styles.formError}>
                  <Icons.Error style={{ width: '12px', height: '12px' }} /> {localFormErrors.state}
                </span>
              )}
              <p style={styles.fieldNote}>
                {pincodeLoading 
                  ? <><Icons.Loading style={{ animation: 'spin 1s linear infinite', width: '12px', height: '12px' }} /> Looking up state from pincode...</> 
                  : localProfile.state && localProfile.pincode
                    ? <><Icons.Check style={{ width: '12px', height: '12px' }} /> Auto-filled from pincode</> 
                    : "Enter pincode to auto-fill state"}
              </p>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.formLabel}>
                Pincode <span style={styles.requiredMarker}>*</span>
              </label>
              <input
                type="text"
                name="pincode"
                value={localProfile.pincode}
                onChange={handleLocalProfileChange}
                placeholder="6-digit pincode"
                maxLength="6"
                style={getInputStyle("pincode")}
                disabled={!isEditMode}
                onFocus={(e) => e.target.style.borderColor = '#009688'}
              />
              {localFormErrors.pincode && (
                <span style={styles.formError}>
                  <Icons.Error style={{ width: '12px', height: '12px' }} />
                  {localFormErrors.pincode}
                  {pincodeLoading && " (Verifying...)"}
                </span>
              )}
              <p style={styles.fieldNote}>
                {pincodeLoading 
                  ? <><Icons.Loading style={{ animation: 'spin 1s linear infinite', width: '12px', height: '12px' }} /> Verifying pincode and fetching district...</> 
                  : <><Icons.Search style={{ width: '12px', height: '12px' }} /> Enter 6-digit Indian pincode to auto-fill district & state</>}
              </p>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.formLabel}>
                <Icons.Flag style={{ width: '14px', height: '14px' }} /> Country
              </label>
              <input
                type="text"
                name="country"
                value={localProfile.country}
                onChange={handleLocalProfileChange}
                onBlur={handleLocalProfileBlur}
                placeholder="Enter your country"
                style={getInputStyle("country")}
                disabled={!isEditMode}
                onFocus={(e) => e.target.style.borderColor = '#009688'}
              />
              {localFormErrors.country && (
                <span style={styles.formError}>
                  <Icons.Error style={{ width: '12px', height: '12px' }} /> {localFormErrors.country}
                </span>
              )}
            </div>
          </div>

          {/* Linked Accounts Section (Read-only if exists) */}
          {localProfile.linkedAccounts && localProfile.linkedAccounts.length > 0 && (
            <div style={{
              backgroundColor: '#E0F6F4',
              padding: '1rem',
              borderRadius: '8px',
              marginBottom: '1.5rem'
            }}>
              <h4 style={{ color: '#124441', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Icons.Link /> Linked Accounts
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {localProfile.linkedAccounts.map((account, index) => (
                  <span key={index} style={{
                    backgroundColor: '#009688',
                    color: 'white',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '4px',
                    fontSize: '0.85rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem'
                  }}>
                    {account === 'guardian' ? (
                      <>
                        <Icons.User style={{ width: '12px', height: '12px' }} /> Guardian
                      </>
                    ) : (
                      <>
                        <Icons.User style={{ width: '12px', height: '12px' }} /> Spouse
                      </>
                    )}
                  </span>
                ))}
              </div>
              <p style={{ color: '#4F6F6B', fontSize: '0.85rem', marginTop: '0.5rem' }}>
                These accounts were set up during signup and can access your profile
              </p>
            </div>
          )}

          {/* Action Buttons - Compact */}
          {isEditMode && (
            <div style={styles.actionButtons}>
              <button
                type="submit"
                style={{
                  ...styles.updateButton,
                  ...((!localIsFormValid || !hasChanges) && styles.updateButtonDisabled),
                  ...(isSubmitting && styles.updateButtonDisabled)
                }}
                disabled={!localIsFormValid || !hasChanges || isSubmitting}
                onMouseEnter={(e) => {
                  if (!isSubmitting && localIsFormValid && hasChanges) {
                    e.target.style.backgroundColor = '#00796B';
                    e.target.style.transform = 'translateY(-1px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSubmitting && localIsFormValid && hasChanges) {
                    e.target.style.backgroundColor = '#009688';
                    e.target.style.transform = 'translateY(0)';
                  }
                }}
              >
                {isSubmitting ? (
                  <>
                    <Icons.Loading style={{ animation: 'spin 1s linear infinite' }} /> Saving...
                  </>
                ) : hasChanges ? (
                  <>
                    <Icons.Check /> Save Changes
                  </>
                ) : (
                  'No Changes'
                )}
              </button>
              <button
                type="button"
                style={styles.cancelButton}
                onClick={handleCancelEditWithModal}
                disabled={isSubmitting}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#009688';
                  e.target.style.color = '#FFFFFF';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = '#009688';
                }}
              >
                Cancel
              </button>
            </div>
          )}
        </form>
      </div>
    </>
  );
};

export default ProfileView;