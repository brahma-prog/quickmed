import React, { useState } from 'react';

// SVG Icons
const UserIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
  </svg>
);

const EmailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
  </svg>
);

const PhoneIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
  </svg>
);

const LocationIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
  </svg>
);

const VehicleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5H15V3H9v2H6.5c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
  </svg>
);

const EmergencyIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L1 21h22L12 2zm0 3.99L19.53 19H4.47L12 5.99zM11 10v4h2v-4h-2zm0 6v2h2v-2h-2z" />
  </svg>
);

const BankIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M5 14h14v1H5zM12 3L4 9v2h16V9l-8-6zm4 8H8v1h8v-1z" />
  </svg>
);

const StatsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 11V3H8v6H2v12h20V11h-6zm-6-6h4v14h-4V5zm-6 6h4v8H4v-8zm16 8h-4v-6h4v6z" />
  </svg>
);

const CameraIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 14.5c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zm7-6h-1.2l-1.2-3H9.4L8.2 8.5H7c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-8c0-1.1-.9-2-2-2zm-7 9.5c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" />
  </svg>
);

const Profile = ({ profileData, setShowProfileImageUpload }) => {
  const [fieldErrors, setFieldErrors] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    // Personal Information
    fullName: profileData.fullName,
    email: profileData.email,
    phone: profileData.phone,
    currentLocation: profileData.currentLocation,
    vehicleType: profileData.vehicleType,
    vehicleNumber: profileData.vehicleNumber,
    
    // Emergency Contacts
    emergencyContact1Name: profileData.emergencyContact1Name || '',
    emergencyContact1Relation: profileData.emergencyContact1Relation || '',
    emergencyContact1Phone: profileData.emergencyContact1Phone || '',
    emergencyContact2Name: profileData.emergencyContact2Name || '',
    emergencyContact2Relation: profileData.emergencyContact2Relation || '',
    emergencyContact2Phone: profileData.emergencyContact2Phone || '',
    
    // Bank Details
    bankAccountNumber: profileData.bankAccountNumber || '',
    bankAccountHolder: profileData.bankAccountHolder || '',
    bankName: profileData.bankName || '',
    ifscCode: profileData.ifscCode || '',
    upiId: profileData.upiId || ''
  });

  const styles = {
    mainContent: {
      padding: '20px',
      minHeight: '100vh',
      backgroundColor: '#E0F2F1'
    },
    header: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      marginBottom: '30px'
    },
    greeting: {
      fontSize: '28px',
      fontWeight: '700',
      color: '#124441',
      margin: '0 0 8px 0',
      textAlign: 'center'
    },
    subtitle: {
      fontSize: '14px',
      color: '#4F6F6B',
      margin: 0,
      textAlign: 'center'
    },
    profileContainer: {
      maxWidth: '800px',
      margin: '0 auto',
      backgroundColor: '#FFFFFF',
      borderRadius: '12px',
      padding: '30px',
      boxShadow: '0 4px 6px rgba(0, 150, 136, 0.1)',
      border: '1px solid #4DB6AC'
    },
    profileHeader: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '30px',
      paddingBottom: '20px',
      borderBottom: '1px solid #E0F2F1'
    },
    profileAvatar: {
      marginRight: '20px',
      position: 'relative'
    },
    profileImage: {
      width: '80px',
      height: '80px',
      borderRadius: '50%',
      objectFit: 'cover',
      border: '3px solid #009688'
    },
    profileImagePlaceholder: {
      width: '80px',
      height: '80px',
      borderRadius: '50%',
      backgroundColor: '#E0F2F1',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: '3px solid #009688'
    },
    avatarIcon: {
      fontSize: '32px',
      color: '#009688'
    },
    changePhotoButton: {
      position: 'absolute',
      bottom: '0',
      right: '0',
      backgroundColor: '#009688',
      color: '#FFFFFF',
      border: 'none',
      borderRadius: '50%',
      width: '28px',
      height: '28px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '12px',
      boxShadow: '0 2px 4px rgba(0, 150, 136, 0.3)'
    },
    profileUserInfo: {
      flex: 1
    },
    agentId: {
      fontSize: '16px',
      color: '#4F6F6B',
      margin: '0 0 10px 0',
      fontWeight: '500',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    formSection: {
      marginBottom: '40px'
    },
    sectionTitle: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#124441',
      margin: '0 0 20px 0',
      paddingBottom: '10px',
      borderBottom: '2px solid #009688',
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    },
    sectionSubtitle: {
      fontSize: '14px',
      color: '#4F6F6B',
      margin: '0 0 15px 0',
      fontStyle: 'italic',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    formGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '20px',
      marginBottom: '10px'
    },
    formGridVertical: {
      display: 'grid',
      gridTemplateColumns: 'repeat(1, 1fr)',
      gap: '20px',
      marginBottom: '10px'
    },
    emergencyFormGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(1, 1fr)',
      gap: '20px',
      marginBottom: '30px'
    },
    formRow: {
      display: 'flex',
      flexDirection: 'column',
      marginBottom: '15px'
    },
    formRowFull: {
      gridColumn: '1 / -1',
      display: 'flex',
      flexDirection: 'column',
      marginBottom: '15px'
    },
    label: {
      fontSize: '14px',
      fontWeight: '600',
      color: '#124441',
      marginBottom: '6px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    labelDisabled: {
      fontSize: '14px',
      fontWeight: '600',
      color: '#4F6F6B',
      marginBottom: '6px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    required: {
      color: '#FF6B6B'
    },
    inputContainer: {
      position: 'relative',
      width: '100%'
    },
    input: {
      width: '100%',
      padding: '10px 12px',
      border: '1px solid #4DB6AC',
      borderRadius: '6px',
      fontSize: '14px',
      backgroundColor: '#FFFFFF',
      transition: 'all 0.2s ease',
      outline: 'none',
      boxSizing: 'border-box',
      fontFamily: 'inherit'
    },
    inputEditing: {
      borderColor: '#009688',
      backgroundColor: '#E0F2F1'
    },
    inputDisabled: {
      backgroundColor: '#F0F7F6',
      color: '#4F6F6B',
      cursor: 'not-allowed',
      border: '1px solid #4DB6AC'
    },
    inputError: {
      borderColor: '#FF6B6B',
      backgroundColor: '#FFF5F5'
    },
    inputReadOnly: {
      backgroundColor: '#F0F7F6',
      color: '#124441',
      border: '1px solid #4DB6AC'
    },
    select: {
      width: '100%',
      padding: '10px 12px',
      border: '1px solid #4DB6AC',
      borderRadius: '6px',
      fontSize: '14px',
      backgroundColor: '#FFFFFF',
      outline: 'none',
      boxSizing: 'border-box',
      fontFamily: 'inherit'
    },
    selectDisabled: {
      backgroundColor: '#F0F7F6',
      color: '#4F6F6B',
      cursor: 'not-allowed'
    },
    phoneContainer: {
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      height: '40px'
    },
    phonePrefix: {
      backgroundColor: '#F0F7F6',
      color: '#4F6F6B',
      fontWeight: '500',
      fontSize: '14px',
      padding: '0 12px',
      border: '1px solid #4DB6AC',
      borderRight: 'none',
      borderRadius: '6px 0 0 6px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: '55px',
      whiteSpace: 'nowrap',
      fontFamily: 'inherit',
      height: '100%',
      boxSizing: 'border-box'
    },
    phoneInputContainer: {
      flex: 1,
      position: 'relative',
      height: '100%'
    },
    phoneInput: {
      width: '100%',
      padding: '0 12px',
      border: '1px solid #4DB6AC',
      borderLeft: 'none',
      borderRadius: '0 6px 6px 0',
      fontSize: '14px',
      backgroundColor: '#FFFFFF',
      transition: 'all 0.2s ease',
      outline: 'none',
      boxSizing: 'border-box',
      fontFamily: 'inherit',
      height: '100%'
    },
    phoneInputError: {
      borderColor: '#FF6B6B',
      backgroundColor: '#FFF5F5'
    },
    phoneInputReadOnly: {
      backgroundColor: '#F0F7F6',
      color: '#124441'
    },
    errorText: {
      color: '#FF6B6B',
      fontSize: '12px',
      marginTop: '4px',
      fontWeight: '500',
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      fontFamily: 'inherit'
    },
    fieldValue: {
      padding: '10px 12px',
      fontSize: '14px',
      color: '#124441',
      fontWeight: '500',
      backgroundColor: '#E0F2F1',
      borderRadius: '6px',
      border: '1px solid #4DB6AC',
      minHeight: '40px',
      display: 'flex',
      alignItems: 'center',
      fontFamily: 'inherit'
    },
    sensitiveData: {
      color: '#009688',
      fontWeight: '600',
      backgroundColor: '#E0F2F1',
      padding: '2px 6px',
      borderRadius: '4px',
      fontFamily: 'inherit'
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '15px',
      marginTop: '10px'
    },
    statItem: {
      padding: '15px',
      backgroundColor: '#E0F7F6',
      borderRadius: '8px',
      border: '1px solid #4DB6AC',
      textAlign: 'center',
      fontFamily: 'inherit'
    },
    statLabel: {
      fontSize: '12px',
      color: '#4F6F6B',
      fontWeight: '600',
      textTransform: 'uppercase',
      marginBottom: '5px',
      fontFamily: 'inherit'
    },
    statValue: {
      fontSize: '16px',
      color: '#124441',
      fontWeight: '600',
      fontFamily: 'inherit'
    },
    emergencyContactSection: {
      backgroundColor: '#E0F7F6',
      padding: '20px',
      borderRadius: '8px',
      border: '1px solid #4DB6AC',
      marginBottom: '20px'
    },
    emergencyContactHeader: {
      fontSize: '16px',
      fontWeight: '600',
      color: '#124441',
      marginBottom: '15px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontFamily: 'inherit'
    },
    emergencyContactGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '15px'
    },
    emergencyContactField: {
      marginBottom: '0'
    },
    saveButtonContainer: {
      display: 'flex',
      justifyContent: 'flex-end',
      marginTop: '30px',
      paddingTop: '20px',
      borderTop: '1px solid #E0F2F1'
    },
    saveButton: {
      backgroundColor: '#009688',
      color: '#FFFFFF',
      border: 'none',
      borderRadius: '6px',
      padding: '12px 24px',
      fontSize: '14px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      minWidth: '140px',
      boxShadow: '0 2px 4px rgba(0, 150, 136, 0.2)',
      fontFamily: 'inherit',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px'
    },
    saveButtonDisabled: {
      backgroundColor: '#4DB6AC',
      opacity: 0.6,
      cursor: 'not-allowed'
    },
    saveButtonHover: {
      backgroundColor: '#00796B',
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 8px rgba(0, 150, 136, 0.3)'
    },
    editButton: {
      backgroundColor: '#124441',
      color: '#FFFFFF',
      border: 'none',
      borderRadius: '6px',
      padding: '12px 24px',
      fontSize: '14px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      minWidth: '140px',
      marginTop: '10px',
      boxShadow: '0 2px 4px rgba(18, 68, 65, 0.2)',
      fontFamily: 'inherit',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px'
    },
    editButtonHover: {
      backgroundColor: '#0A2D2A',
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 8px rgba(18, 68, 65, 0.3)'
    }
  };

  // Handle input change with alphabetic validation for name fields
  const handleInputChange = (field, value) => {
    // Prevent editing of name, email, and phone fields
    if (['fullName', 'email', 'phone'].includes(field) && !isEditing) {
      return;
    }
    
    let processedValue = value;
    
    // Apply alphabetic validation for name fields
    if (field.includes('Name') || field === 'fullName' || field === 'bankAccountHolder') {
      // Allow only alphabets and spaces
      processedValue = value.replace(/[^a-zA-Z\s]/g, '');
    }
    
    // Apply alphabetic validation for location and bank name
    if (field === 'currentLocation' || field === 'bankName') {
      // Allow alphabets, spaces, and common punctuation
      processedValue = value.replace(/[^a-zA-Z\s.,-]/g, '');
    }
    
    setFormData(prev => ({
      ...prev,
      [field]: processedValue
    }));
    
    // Real-time validation
    validateField(field, processedValue);
  };

  // Handle phone number input with validation for starting digit (6-9)
  const handlePhoneChange = (value) => {
    const cleanValue = value.replace(/\D/g, '');
    const limitedValue = cleanValue.slice(0, 10);
    
    // If the first digit is entered and it's not 6-9, show error
    if (limitedValue.length > 0 && !/^[6-9]/.test(limitedValue)) {
      setFieldErrors(prev => ({
        ...prev,
        phone: 'Phone number must start with 6, 7, 8, or 9'
      }));
    } else if (fieldErrors.phone && limitedValue.length > 0 && /^[6-9]/.test(limitedValue)) {
      // Clear error if valid
      setFieldErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.phone;
        return newErrors;
      });
    }
    
    setFormData(prev => ({
      ...prev,
      phone: limitedValue
    }));
    
    validateField('phone', limitedValue);
  };

  // Handle emergency phone number input with validation for starting digit (6-9)
  const handleEmergencyPhoneChange = (contactNumber, value) => {
    const cleanValue = value.replace(/\D/g, '');
    const limitedValue = cleanValue.slice(0, 10);
    
    // If the first digit is entered and it's not 6-9, show error
    if (limitedValue.length > 0 && !/^[6-9]/.test(limitedValue)) {
      setFieldErrors(prev => ({
        ...prev,
        [contactNumber]: 'Phone number must start with 6, 7, 8, or 9'
      }));
    } else if (fieldErrors[contactNumber] && limitedValue.length > 0 && /^[6-9]/.test(limitedValue)) {
      // Clear error if valid
      setFieldErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[contactNumber];
        return newErrors;
      });
    }
    
    setFormData(prev => ({
      ...prev,
      [contactNumber]: limitedValue
    }));
    
    validateField(contactNumber, limitedValue);
  };

  // Handle bank account number - only digits (limited to 11 digits)
  const handleBankAccountChange = (value) => {
    const cleanValue = value.replace(/\D/g, '');
    const limitedValue = cleanValue.slice(0, 11);
    
    setFormData(prev => ({
      ...prev,
      bankAccountNumber: limitedValue
    }));
    
    validateField('bankAccountNumber', limitedValue);
  };

  // Handle IFSC code - uppercase letters and numbers
  const handleIfscCodeChange = (value) => {
    const processedValue = value.toUpperCase().replace(/[^A-Z0-9]/g, '');
    
    setFormData(prev => ({
      ...prev,
      ifscCode: processedValue
    }));
    
    validateField('ifscCode', processedValue);
  };

  // Handle UPI ID - alphanumeric with @ybl at the end
  const handleUpiIdChange = (value) => {
    setFormData(prev => ({
      ...prev,
      upiId: value
    }));
    
    validateField('upiId', value);
  };

  const validateField = (field, value) => {
    const errors = { ...fieldErrors };

    switch (field) {
      case 'fullName':
        if (!value.trim()) {
          errors.fullName = 'Full name is required';
        } else if (!/^[a-zA-Z\s]{2,50}$/.test(value)) {
          errors.fullName = 'Name should contain only alphabets (2-50 characters)';
        } else {
          delete errors.fullName;
        }
        break;

      case 'email':
        if (!value.trim()) {
          errors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          errors.email = 'Please enter a valid email address';
        } else {
          delete errors.email;
        }
        break;

      case 'phone':
        if (!value.trim()) {
          errors.phone = 'Phone number is required';
        } else {
          const cleanPhone = value.replace(/\D/g, '');
          if (cleanPhone.length !== 10) {
            errors.phone = 'Phone number must be 10 digits';
          } else if (!/^[6-9]/.test(cleanPhone)) {
            errors.phone = 'Phone number must start with 6, 7, 8, or 9';
          } else {
            delete errors.phone;
          }
        }
        break;

      case 'currentLocation':
        if (!value.trim()) {
          errors.currentLocation = 'Current location is required';
        } else if (value.length < 3) {
          errors.currentLocation = 'Location must be at least 3 characters';
        } else {
          delete errors.currentLocation;
        }
        break;

      case 'vehicleNumber':
        if (!value.trim()) {
          errors.vehicleNumber = 'Vehicle number is required';
        } else if (value.length < 3) {
          errors.vehicleNumber = 'Vehicle number must be at least 3 characters';
        } else {
          delete errors.vehicleNumber;
        }
        break;

      case 'emergencyContact1Phone':
        if (value && value.trim()) {
          const cleanPhone = value.replace(/\D/g, '');
          if (cleanPhone.length !== 10) {
            errors.emergencyContact1Phone = 'Phone number must be 10 digits';
          } else if (!/^[6-9]/.test(cleanPhone)) {
            errors.emergencyContact1Phone = 'Phone number must start with 6, 7, 8, or 9';
          } else {
            delete errors.emergencyContact1Phone;
          }
        }
        break;

      case 'emergencyContact2Phone':
        if (value && value.trim()) {
          const cleanPhone = value.replace(/\D/g, '');
          if (cleanPhone.length !== 10) {
            errors.emergencyContact2Phone = 'Phone number must be 10 digits';
          } else if (!/^[6-9]/.test(cleanPhone)) {
            errors.emergencyContact2Phone = 'Phone number must start with 6, 7, 8, or 9';
          } else {
            delete errors.emergencyContact2Phone;
          }
        }
        break;

      case 'bankAccountNumber':
        if (value && value.trim()) {
          if (!/^\d{9,11}$/.test(value.replace(/\s/g, ''))) {
            errors.bankAccountNumber = 'Account number must be 9-11 digits';
          } else {
            delete errors.bankAccountNumber;
          }
        }
        break;

      case 'ifscCode':
        if (value && value.trim()) {
          if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(value)) {
            errors.ifscCode = 'Please enter a valid IFSC code';
          } else {
            delete errors.ifscCode;
          }
        }
        break;

      case 'upiId':
        if (value && value.trim()) {
          // UPI ID must end with @ybl
          if (!/^[\w.-]+@ybl$/.test(value.toLowerCase())) {
            errors.upiId = 'UPI ID must end with @ybl (e.g., username@ybl)';
          } else {
            delete errors.upiId;
          }
        }
        break;

      default:
        break;
    }

    setFieldErrors(errors);
    return !errors[field];
  };

  const handleSaveChanges = () => {
    // Validate all required fields
    const requiredFields = ['fullName', 'email', 'phone', 'currentLocation', 'vehicleType', 'vehicleNumber'];
    let hasErrors = false;
    
    requiredFields.forEach(field => {
      if (!validateField(field, formData[field])) {
        hasErrors = true;
      }
    });

    if (hasErrors) {
      alert('Please fix all validation errors before saving.');
      return;
    }

    // Save all changes
    Object.keys(formData).forEach(field => {
      profileData[field] = formData[field];
    });

    console.log('All changes saved:', formData);
    setIsEditing(false);
    
    // Here you would typically send the entire formData to your backend
    alert('Profile updated successfully!');
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      // Reset form data if canceling edit
      setFormData({
        fullName: profileData.fullName,
        email: profileData.email,
        phone: profileData.phone,
        currentLocation: profileData.currentLocation,
        vehicleType: profileData.vehicleType,
        vehicleNumber: profileData.vehicleNumber,
        emergencyContact2Name: profileData.emergencyContact2Name || '',
        emergencyContact2Phone: profileData.emergencyContact2Phone || '',
        emergencyContact2Relation: profileData.emergencyContact2Relation || '',
        emergencyContact1Name: profileData.emergencyContact1Name || '',
        emergencyContact1Phone: profileData.emergencyContact1Phone || '',
        emergencyContact1Relation: profileData.emergencyContact1Relation || '',
        bankAccountNumber: profileData.bankAccountNumber || '',
        bankAccountHolder: profileData.bankAccountHolder || '',
        bankName: profileData.bankName || '',
        ifscCode: profileData.ifscCode || '',
        upiId: profileData.upiId || ''
      });
      setFieldErrors({});
    }
  };

  const maskSensitiveData = (data) => {
    if (!data) return 'Not provided';
    return '•'.repeat(Math.min(data.length, 8));
  };

  const maskAccountNumber = (accountNumber) => {
    if (!accountNumber) return 'Not provided';
    const visibleDigits = 4;
    if (accountNumber.length <= visibleDigits) return '•'.repeat(accountNumber.length);
    return '•'.repeat(accountNumber.length - visibleDigits) + accountNumber.slice(-visibleDigits);
  };

  const renderFormField = (field, label, isRequired = false, isFullWidth = false, isSelect = false, options = [], isReadOnly = false, icon = null) => {
    const hasError = fieldErrors[field];

    const getFieldIcon = () => {
      if (icon) return icon;
      if (field.includes('Name') || field === 'fullName' || field === 'bankAccountHolder') return <UserIcon />;
      if (field.includes('email')) return <EmailIcon />;
      if (field.includes('phone')) return <PhoneIcon />;
      if (field.includes('Location')) return <LocationIcon />;
      if (field.includes('vehicle')) return <VehicleIcon />;
      return null;
    };

    return (
      <div style={isFullWidth ? styles.formRowFull : styles.formRow}>
        <label style={isReadOnly ? styles.labelDisabled : styles.label}>
          {getFieldIcon()}
          {label}
          {isRequired && <span style={styles.required}>*</span>}
          {isReadOnly && <span style={{fontSize: '12px', color: '#4F6F6B', marginLeft: '8px'}}>(Cannot be changed)</span>}
        </label>
        
        {isEditing ? (
          <div style={styles.inputContainer}>
            {isSelect ? (
              <select
                value={formData[field]}
                onChange={(e) => handleInputChange(field, e.target.value)}
                disabled={isReadOnly}
                style={{
                  ...styles.select,
                  ...(hasError ? styles.inputError : {}),
                  ...(isReadOnly ? styles.inputDisabled : {})
                }}
              >
                {options.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type="text"
                value={formData[field]}
                onChange={(e) => {
                  if (field === 'bankAccountNumber') {
                    handleBankAccountChange(e.target.value);
                  } else if (field === 'ifscCode') {
                    handleIfscCodeChange(e.target.value);
                  } else if (field === 'upiId') {
                    handleUpiIdChange(e.target.value);
                  } else {
                    handleInputChange(field, e.target.value);
                  }
                }}
                disabled={isReadOnly}
                style={{
                  ...styles.input,
                  ...(hasError ? styles.inputError : {}),
                  ...(isReadOnly ? styles.inputReadOnly : {})
                }}
                placeholder={`Enter ${label.toLowerCase()}`}
                readOnly={isReadOnly}
              />
            )}
            {hasError && (
              <div style={styles.errorText}>
                <span style={{color: '#FF6B6B'}}>⚠️</span> {hasError}
              </div>
            )}
          </div>
        ) : (
          <div style={styles.fieldValue}>
            {formData[field] || 'Not provided'}
          </div>
        )}
      </div>
    );
  };

  const renderPhoneField = (field, label, isRequired = false, isEmergency = false, isReadOnly = false) => {
    const hasError = fieldErrors[field];

    return (
      <div style={styles.formRow}>
        <label style={isReadOnly ? styles.labelDisabled : styles.label}>
          <PhoneIcon />
          {label}
          {isRequired && <span style={styles.required}>*</span>}
          {isReadOnly && <span style={{fontSize: '12px', color: '#4F6F6B', marginLeft: '8px'}}>(Cannot be changed)</span>}
        </label>
        
        {isEditing ? (
          <div>
            <div style={styles.phoneContainer}>
              <div style={styles.phonePrefix}>+91</div>
              <div style={styles.phoneInputContainer}>
                <input
                  type="tel"
                  value={formData[field]}
                  onChange={(e) => isEmergency ? 
                    handleEmergencyPhoneChange(field, e.target.value) : 
                    handlePhoneChange(e.target.value)
                  }
                  disabled={isReadOnly}
                  style={{
                    ...styles.phoneInput,
                    ...(hasError ? styles.phoneInputError : {}),
                    ...(isReadOnly ? styles.phoneInputReadOnly : {})
                  }}
                  placeholder="Enter 10-digit number"
                  maxLength="10"
                  readOnly={isReadOnly}
                />
              </div>
            </div>
            {hasError && (
              <div style={styles.errorText}>
                <span style={{color: '#FF6B6B'}}>⚠️</span> {hasError}
              </div>
            )}
          </div>
        ) : (
          <div style={styles.fieldValue}>
            {formData[field] ? `+91 ${formData[field]}` : 'Not provided'}
          </div>
        )}
      </div>
    );
  };

  const renderSensitiveField = (field, label, maskFunction, isRequired = false, inputType = 'text') => {
    const hasError = fieldErrors[field];

    const getFieldIcon = () => {
      if (field.includes('Account')) return <BankIcon />;
      if (field === 'ifscCode') return <BankIcon />;
      if (field === 'upiId') return <BankIcon />;
      return null;
    };

    return (
      <div style={styles.formRow}>
        <label style={styles.label}>
          {getFieldIcon()}
          {label}
          {isRequired && <span style={styles.required}>*</span>}
        </label>
        
        {isEditing ? (
          <div style={styles.inputContainer}>
            <input
              type={inputType}
              value={formData[field]}
              onChange={(e) => {
                if (field === 'bankAccountNumber') {
                  handleBankAccountChange(e.target.value);
                } else if (field === 'ifscCode') {
                  handleIfscCodeChange(e.target.value);
                } else if (field === 'upiId') {
                  handleUpiIdChange(e.target.value);
                } else {
                  handleInputChange(field, e.target.value);
                }
              }}
              style={{
                ...styles.input,
                ...(hasError ? styles.inputError : {})
              }}
              placeholder={field === 'upiId' ? 'Enter UPI ID (e.g., username@ybl)' : `Enter ${label.toLowerCase()}`}
            />
            {hasError && (
              <div style={styles.errorText}>
                <span style={{color: '#FF6B6B'}}>⚠️</span> {hasError}
              </div>
            )}
          </div>
        ) : (
          <div style={styles.fieldValue}>
            {formData[field] ? (
              <span style={styles.sensitiveData}>
                {maskFunction(formData[field])}
              </span>
            ) : 'Not provided'}
          </div>
        )}
      </div>
    );
  };

  const hasValidationErrors = () => {
    return Object.keys(fieldErrors).length > 0;
  };

  const [hoverState, setHoverState] = useState({
    editButton: false,
    saveButton: false
  });

  return (
    <div style={styles.mainContent}>
      <div style={styles.header}>
        <h1 style={styles.greeting}>My Profile</h1>
        <p style={styles.subtitle}>Manage your account information and preferences</p>
      </div>

      <div style={styles.profileContainer}>
        {/* Profile Header */}
        <div style={styles.profileHeader}>
          <div style={styles.profileAvatar}>
            {profileData.profileImage ? (
              <img 
                src={profileData.profileImage} 
                alt="Profile" 
                style={styles.profileImage}
              />
            ) : (
              <div style={styles.profileImagePlaceholder}>
                <span style={styles.avatarIcon}>👤</span>
              </div>
            )}
            <button 
              style={styles.changePhotoButton}
              onClick={() => setShowProfileImageUpload(true)}
              title="Change profile photo"
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#00796B';
                e.target.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#009688';
                e.target.style.transform = 'scale(1)';
              }}
            >
              <CameraIcon />
            </button>
          </div>
          <div style={styles.profileUserInfo}>
            <div style={styles.agentId}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#4F6F6B">
                <path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z" />
              </svg>
              <strong>AGENT ID:</strong> {profileData.agentId}
            </div>
            <button
              style={{
                ...styles.editButton,
                ...(hoverState.editButton ? styles.editButtonHover : {})
              }}
              onClick={handleEditToggle}
              onMouseEnter={() => setHoverState(s => ({ ...s, editButton: true }))}
              onMouseLeave={() => setHoverState(s => ({ ...s, editButton: false }))}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
              </svg>
              {isEditing ? 'Cancel Editing' : 'Edit Profile'}
            </button>
          </div>
        </div>

        {/* Personal Information */}
        <div style={styles.formSection}>
          <h3 style={styles.sectionTitle}>
            <UserIcon />
            Personal Information
          </h3>
          
          <div style={styles.formGrid}>
            {renderFormField('fullName', 'Full Name', true, false, false, [], true)}
            {renderFormField('email', 'Email Address', true, false, false, [], true)}
            {renderPhoneField('phone', 'Phone Number', true, false, true)}
            {renderFormField('currentLocation', 'Current Location', true)}
            {renderFormField(
              'vehicleType', 
              'Vehicle Type', 
              true,
              false,
              true,
              [
                { value: 'Motorcycle', label: 'Motorcycle' },
                { value: 'Scooter', label: 'Scooter' },
                { value: 'Bicycle', label: 'Bicycle' },
              ]
            )}
            {renderFormField('vehicleNumber', 'Vehicle Number', true)}
          </div>
        </div>

        {/* Emergency Contacts */}
        <div style={styles.formSection}>
          <h3 style={styles.sectionTitle}>
            <EmergencyIcon />
            Emergency Contacts
          </h3>
          <p style={styles.sectionSubtitle}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#4F6F6B">
              <path d="M12 2L1 21h22L12 2zm0 3.99L19.53 19H4.47L12 5.99zM11 10v4h2v-4h-2zm0 6v2h2v-2h-2z" />
            </svg>
            In case of emergencies, we'll contact these people
          </p>
          
          <div style={styles.emergencyFormGrid}>
            {/* Emergency Contact 1 */}
            <div style={styles.emergencyContactSection}>
              <div style={styles.emergencyContactHeader}>
                <EmergencyIcon />
                <span>Emergency Contact 1</span>
              </div>
              <div style={styles.formGridVertical}>
                {renderFormField('emergencyContact1Name', 'Name')}
                {renderPhoneField('emergencyContact1Phone', 'Phone Number', false, true)}
                {renderFormField(
                  'emergencyContact1Relation', 
                  'Relation', 
                  false,
                  false,
                  true,
                  [
                    { value: '', label: 'Select relation' },
                    { value: 'Father', label: 'Father' },
                    { value: 'Mother', label: 'Mother' },
                    { value: 'Spouse', label: 'Spouse' },
                    { value: 'Sibling', label: 'Sibling' },
                    { value: 'Friend', label: 'Friend' },
                    { value: 'Other', label: 'Other' }
                  ]
                )}
              </div>
            </div>

            {/* Emergency Contact 2 */}
            <div style={styles.emergencyContactSection}>
              <div style={styles.emergencyContactHeader}>
                <EmergencyIcon />
                <span>Emergency Contact 2</span>
              </div>
              <div style={styles.formGridVertical}>
                {renderFormField('emergencyContact2Name', 'Name')}
                {renderPhoneField('emergencyContact2Phone', 'Phone Number', false, true)}
                {renderFormField(
                  'emergencyContact2Relation', 
                  'Relation', 
                  false,
                  false,
                  true,
                  [
                    { value: '', label: 'Select relation' },
                    { value: 'Father', label: 'Father' },
                    { value: 'Mother', label: 'Mother' },
                    { value: 'Spouse', label: 'Spouse' },
                    { value: 'Sibling', label: 'Sibling' },
                    { value: 'Friend', label: 'Friend' },
                    { value: 'Other', label: 'Other' }
                  ]
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bank Details */}
        <div style={styles.formSection}>
          <h3 style={styles.sectionTitle}>
            <BankIcon />
            Bank Details
          </h3>
          <p style={styles.sectionSubtitle}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#4F6F6B">
              <path d="M20 8h-3V4H7v4H4v2h16V8zM4 14h16v2H4v-2z" />
            </svg>
            For salary transfers and payments
          </p>
          <div style={styles.formGrid}>
            {renderFormField('bankAccountHolder', 'Account Holder Name')}
            {renderFormField('bankName', 'Bank Name')}
            {renderSensitiveField('bankAccountNumber', 'Account Number', maskAccountNumber, false, 'text')}
            {renderSensitiveField('ifscCode', 'IFSC Code', maskSensitiveData, false, 'text')}
            {renderSensitiveField('upiId', 'UPI ID', maskSensitiveData, false, 'text')}
          </div>
        </div>

        {/* Performance Statistics */}
        <div style={styles.formSection}>
          <h3 style={styles.sectionTitle}>
            <StatsIcon />
            Performance Statistics
          </h3>
          <div style={styles.statsGrid}>
            <div style={styles.statItem}>
              <div style={styles.statLabel}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="#4F6F6B" style={{marginRight: '4px'}}>
                  <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z" />
                </svg>
                Joined Date
              </div>
              <div style={styles.statValue}>{profileData.joinedDate}</div>
            </div>
            <div style={styles.statItem}>
              <div style={styles.statLabel}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="#4F6F6B" style={{marginRight: '4px'}}>
                  <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
                </svg>
                Total Deliveries
              </div>
              <div style={styles.statValue}>{profileData.totalDeliveries}</div>
            </div>
            <div style={styles.statItem}>
              <div style={styles.statLabel}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="#4F6F6B" style={{marginRight: '4px'}}>
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
                Current Rating
              </div>
              <div style={styles.statValue}>{profileData.rating}/5 ⭐</div>
            </div>
            <div style={styles.statItem}>
              <div style={styles.statLabel}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="#4F6F6B" style={{marginRight: '4px'}}>
                  <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
                </svg>
                Completion Rate
              </div>
              <div style={styles.statValue}>{profileData.completionRate}</div>
            </div>
            <div style={styles.statItem}>
              <div style={styles.statLabel}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="#4F6F6B" style={{marginRight: '4px'}}>
                  <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
                </svg>
                Avg Response Time
              </div>
              <div style={styles.statValue}>{profileData.responseTime}</div>
            </div>
            <div style={styles.statItem}>
              <div style={styles.statLabel}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="#4F6F6B" style={{marginRight: '4px'}}>
                  <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm4.18-12.24l-7.19 3.75 3.75 7.19 7.19-3.75-3.75-7.19z" />
                </svg>
                Average Rating
              </div>
              <div style={styles.statValue}>{profileData.averageRating}/5 ⭐</div>
            </div>
          </div>
        </div>

        {/* Save Changes Button */}
        {isEditing && (
          <div style={styles.saveButtonContainer}>
            <button
              style={{
                ...styles.saveButton,
                ...(hasValidationErrors() ? styles.saveButtonDisabled : {}),
                ...(hoverState.saveButton && !hasValidationErrors() ? styles.saveButtonHover : {})
              }}
              onClick={handleSaveChanges}
              disabled={hasValidationErrors()}
              onMouseEnter={() => !hasValidationErrors() && setHoverState(s => ({ ...s, saveButton: true }))}
              onMouseLeave={() => setHoverState(s => ({ ...s, saveButton: false }))}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z" />
              </svg>
              Save Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;