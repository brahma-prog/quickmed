import React, { useState } from 'react';

const Profile = ({ profileData, setShowProfileImageUpload }) => {
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [formData, setFormData] = useState({
    fullName: profileData.fullName,
    email: profileData.email,
    phone: profileData.phone,
    currentLocation: profileData.currentLocation,
    vehicleType: profileData.vehicleType,
    vehicleNumber: profileData.vehicleNumber
  });

  const styles = {
    mainContent: {
      padding: '30px',
      minHeight: '100vh',
      backgroundColor: '#f8f9fa'
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
      fontSize: '40px',
      fontWeight: '1000',
      color: '#1f2937',
      margin: '0 0 8px 0',
      textAlign: 'center'
    },
    subtitle: {
      fontSize: '16px',
      color: '#6b7280',
      margin: 0,
      textAlign: 'center'
    },
    headerActions: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    },
    profileEditActions: {
      display: 'flex',
      gap: '12px',
      justifyContent: 'flex-end',
      marginTop: '30px',
      paddingTop: '20px',
      borderTop: '1px solid #e5e7eb'
    },
    primaryButton: {
      backgroundColor: '#7C2A62',
      color: 'white',
      border: 'none',
      padding: '12px 24px',
      borderRadius: '8px',
      fontSize: '14px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      minWidth: '140px',
      justifyContent: 'center'
    },
    secondaryButton: {
      backgroundColor: 'transparent',
      color: '#7C2A62',
      border: '2px solid #7C2A62',
      padding: '11px 23px',
      borderRadius: '8px',
      fontSize: '14px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      minWidth: '140px',
      justifyContent: 'center'
    },
    successButton: {
      backgroundColor: '#10B981',
      color: 'white',
      border: 'none',
      padding: '12px 24px',
      borderRadius: '8px',
      fontSize: '14px',
      fontWeight: '600',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      minWidth: '140px',
      justifyContent: 'center',
      transition: 'all 0.3s ease'
    },
    dangerButton: {
      backgroundColor: '#EF4444',
      color: 'white',
      border: 'none',
      padding: '12px 24px',
      borderRadius: '8px',
      fontSize: '14px',
      fontWeight: '600',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      minWidth: '140px',
      justifyContent: 'center',
      transition: 'all 0.3s ease'
    },
    profileContainer: {
      maxWidth: '800px',
      margin: '0 auto'
    },
    profileCard: {
      backgroundColor: 'white',
      borderRadius: '16px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      border: '1px solid #e5e7eb',
      overflow: 'hidden'
    },
    profileHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: '40px',
      borderBottom: '1px solid #e5e7eb',
      backgroundColor: '#f8fafc',
      position: 'relative'
    },
    profileAvatar: {
      marginRight: '25px',
      position: 'relative'
    },
    profileImage: {
      width: '120px',
      height: '120px',
      borderRadius: '50%',
      objectFit: 'cover',
      border: '4px solid #7C2A62',
      boxShadow: '0 4px 12px rgba(124, 42, 98, 0.2)'
    },
    profileImagePlaceholder: {
      width: '120px',
      height: '120px',
      borderRadius: '50%',
      backgroundColor: '#F7D9EB',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: '4px solid #7C2A62',
      boxShadow: '0 4px 12px rgba(124, 42, 98, 0.2)'
    },
    avatarIcon: {
      fontSize: '48px',
      color: '#7C2A62'
    },
    changePhotoButton: {
      position: 'absolute',
      bottom: '5px',
      right: '5px',
      backgroundColor: '#7C2A62',
      color: 'white',
      border: 'none',
      borderRadius: '50%',
      width: '36px',
      height: '36px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '16px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
      transition: 'all 0.3s ease'
    },
    profileUserInfo: {
      flex: 1
    },
    agentId: {
      fontSize: '16px',
      color: '#6b7280',
      margin: '0 0 15px 0',
      fontWeight: '500'
    },
    profileStatus: {
      display: 'flex',
      alignItems: 'center',
      gap: '15px'
    },
    onlineStatusProfile: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      backgroundColor: '#10B981',
      color: 'white',
      padding: '8px 16px',
      borderRadius: '20px',
      fontSize: '14px',
      fontWeight: '600'
    },
    statusDot: {
      width: '10px',
      height: '10px',
      borderRadius: '50%',
      display: 'inline-block',
      backgroundColor: 'white'
    },
    statusText: {
      fontSize: '14px',
      fontWeight: '600'
    },
    profileDetails: {
      padding: '40px'
    },
    detailGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '25px',
      marginBottom: '30px'
    },
    detailItem: {
      padding: '20px',
      backgroundColor: '#f8fafc',
      borderRadius: '12px',
      minHeight: '90px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      border: '1px solid #e5e7eb',
      transition: 'all 0.3s ease'
    },
    detailItemFullWidth: {
      gridColumn: '1 / -1',
      padding: '20px',
      backgroundColor: '#f8fafc',
      borderRadius: '12px',
      minHeight: '90px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      border: '1px solid #e5e7eb',
      transition: 'all 0.3s ease'
    },
    detailItemEditing: {
      backgroundColor: '#f0f9ff',
      borderColor: '#7C2A62'
    },
    detailLabel: {
      fontSize: '14px',
      color: '#6b7280',
      display: 'block',
      marginBottom: '10px',
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: '0.5px'
    },
    detailValue: {
      fontSize: '16px',
      color: '#1f2937',
      margin: 0,
      fontWeight: '500',
      wordBreak: 'break-word'
    },
    editInput: {
      padding: '12px 16px',
      border: '2px solid #d1d5db',
      borderRadius: '8px',
      fontSize: '16px',
      width: '100%',
      boxSizing: 'border-box',
      transition: 'all 0.3s ease',
      fontWeight: '500',
      backgroundColor: 'white'
    },
    editInputLarge: {
      padding: '14px 18px',
      border: '2px solid #d1d5db',
      borderRadius: '8px',
      fontSize: '18px',
      width: '100%',
      boxSizing: 'border-box',
      fontWeight: '500',
      transition: 'all 0.3s ease',
      backgroundColor: 'white'
    },
    editInputError: {
      borderColor: '#EF4444',
      backgroundColor: '#FEF2F2'
    },
    editInputSuccess: {
      borderColor: '#10B981',
      backgroundColor: '#F0FDF4'
    },
    inputContainer: {
      width: '100%',
      position: 'relative'
    },
    phonePrefix: {
      position: 'absolute',
      left: '16px',
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#6b7280',
      fontWeight: '500',
      fontSize: '16px'
    },
    phoneInput: {
      paddingLeft: '50px'
    },
    errorText: {
      color: '#EF4444',
      fontSize: '12px',
      marginTop: '6px',
      fontWeight: '500',
      display: 'flex',
      alignItems: 'center',
      gap: '4px'
    },
    successText: {
      color: '#10B981',
      fontSize: '12px',
      marginTop: '6px',
      fontWeight: '500',
      display: 'flex',
      alignItems: 'center',
      gap: '4px'
    },
    readOnlyField: {
      opacity: 0.7,
      cursor: 'not-allowed'
    },
    sectionTitle: {
      fontSize: '20px',
      fontWeight: '600',
      color: '#1f2937',
      margin: '0 0 20px 0',
      paddingBottom: '10px',
      borderBottom: '2px solid #7C2A62'
    }
  };

  const handleProfileEdit = () => {
    setIsEditingProfile(true);
    // Reset form data to current profile data when starting edit
    setFormData({
      fullName: profileData.fullName,
      email: profileData.email,
      phone: profileData.phone,
      currentLocation: profileData.currentLocation,
      vehicleType: profileData.vehicleType,
      vehicleNumber: profileData.vehicleNumber
    });
    setFieldErrors({});
  };

  const handleProfileSave = () => {
    // Validate all fields before saving
    const isValid = validateAllFields();
    if (isValid) {
      setIsEditingProfile(false);
      setFieldErrors({});
      // In real app, you would update the profile data here
      console.log('Profile saved:', formData);
    }
  };

  const handleProfileCancel = () => {
    setIsEditingProfile(false);
    setFieldErrors({});
    // Reset form data to original profile data
    setFormData({
      fullName: profileData.fullName,
      email: profileData.email,
      currentLocation: profileData.currentLocation,
      phone: profileData.phone,
      vehicleType: profileData.vehicleType,
      vehicleNumber: profileData.vehicleNumber
    });
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
          errors.email = 'Please enter a valid email address with @ and .';
        } else {
          delete errors.email;
        }
        break;

      case 'phone':
        if (!value.trim()) {
          errors.phone = 'Phone number is required';
        } else {
          // Remove any non-digit characters and check if it starts with 6,7,8,9
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

      default:
        break;
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateAllFields = () => {
    const errors = {};

    // Validate all fields
    if (!formData.fullName.trim()) {
      errors.fullName = 'Full name is required';
    } else if (!/^[a-zA-Z\s]{2,50}$/.test(formData.fullName)) {
      errors.fullName = 'Name should contain only alphabets (2-50 characters)';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address with @ and .';
    }

    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else {
      const cleanPhone = formData.phone.replace(/\D/g, '');
      if (cleanPhone.length !== 10) {
        errors.phone = 'Phone number must be 10 digits';
      } else if (!/^[6-9]/.test(cleanPhone)) {
        errors.phone = 'Phone number must start with 6, 7, 8, or 9';
      }
    }

    if (!formData.currentLocation.trim()) {
      errors.currentLocation = 'Current location is required';
    } else if (formData.currentLocation.length < 3) {
      errors.currentLocation = 'Location must be at least 3 characters';
    }

    if (!formData.vehicleNumber.trim()) {
      errors.vehicleNumber = 'Vehicle number is required';
    } else if (formData.vehicleNumber.length < 3) {
      errors.vehicleNumber = 'Vehicle number must be at least 3 characters';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Real-time validation as user types
    validateField(field, value);
  };

  const handlePhoneChange = (value) => {
    // Remove any non-digit characters
    const cleanValue = value.replace(/\D/g, '');
    
    // Limit to 10 digits
    const limitedValue = cleanValue.slice(0, 10);
    
    setFormData(prev => ({
      ...prev,
      phone: limitedValue
    }));
    
    validateField('phone', limitedValue);
  };

  const isFormValid = () => {
    return Object.keys(fieldErrors).length === 0 && 
           formData.fullName.trim() && 
           formData.email.trim() && 
           formData.phone.trim() && 
           formData.currentLocation.trim() && 
           formData.vehicleNumber.trim();
  };

  return (
    <div style={styles.mainContent}>
      {/* Centered Header Section */}
      <div style={styles.header}>
        <h1 style={styles.greeting}>My Profile</h1>
        <p style={styles.subtitle}>Manage your account information and preferences</p>
      </div>

      <div style={styles.profileContainer}>
        <div style={styles.profileCard}>
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
              {!isEditingProfile && (
                <button 
                  style={styles.changePhotoButton}
                  onClick={() => setShowProfileImageUpload(true)}
                  title="Change profile photo"
                >
                  📷
                </button>
              )}
            </div>
            <div style={styles.profileUserInfo}>
              <div style={styles.agentId}>
                <strong>AGENT ID:</strong> {profileData.agentId}
              </div>
              <div style={styles.profileStatus}>
              </div>
            </div>
          </div>
          
          <div style={styles.profileDetails}>
            <h3 style={styles.sectionTitle}>Personal Information</h3>
            <div style={styles.detailGrid}>
              {/* Full Name */}
              <div style={{
                ...styles.detailItemFullWidth,
                ...(isEditingProfile && styles.detailItemEditing)
              }}>
                <strong style={styles.detailLabel}>Full Name</strong>
                {isEditingProfile ? (
                  <div style={styles.inputContainer}>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      style={{
                        ...styles.editInputLarge,
                        ...(fieldErrors.fullName ? styles.editInputError : 
                            formData.fullName && !fieldErrors.fullName ? styles.editInputSuccess : {})
                      }}
                      placeholder="Enter your full name (alphabets only)"
                    />
                    {fieldErrors.fullName ? (
                      <div style={styles.errorText}>⚠️ {fieldErrors.fullName}</div>
                    ) : formData.fullName && !fieldErrors.fullName ? (
                      <div style={styles.successText}>✓ Valid name</div>
                    ) : null}
                  </div>
                ) : (
                  <span style={styles.detailValue}>{profileData.fullName}</span>
                )}
              </div>

              {/* Email */}
              <div style={{
                ...styles.detailItem,
                ...(isEditingProfile && styles.detailItemEditing)
              }}>
                <strong style={styles.detailLabel}>Email Address</strong>
                {isEditingProfile ? (
                  <div style={styles.inputContainer}>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      style={{
                        ...styles.editInput,
                        ...(fieldErrors.email ? styles.editInputError : 
                            formData.email && !fieldErrors.email ? styles.editInputSuccess : {})
                      }}
                      placeholder="example@domain.com"
                    />
                    {fieldErrors.email ? (
                      <div style={styles.errorText}>⚠️ {fieldErrors.email}</div>
                    ) : formData.email && !fieldErrors.email ? (
                      <div style={styles.successText}>✓ Valid email</div>
                    ) : null}
                  </div>
                ) : (
                  <span style={styles.detailValue}>{profileData.email}</span>
                )}
              </div>

              {/* Phone Number */}
              <div style={{
                ...styles.detailItem,
                ...(isEditingProfile && styles.detailItemEditing)
              }}>
                <strong style={styles.detailLabel}>Phone Number</strong>
                {isEditingProfile ? (
                  <div style={styles.inputContainer}>
                    <span style={styles.phonePrefix}></span>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handlePhoneChange(e.target.value)}
                      style={{
                        ...styles.editInput,
                        ...styles.phoneInput,
                        ...(fieldErrors.phone ? styles.editInputError : 
                            formData.phone && !fieldErrors.phone ? styles.editInputSuccess : {})
                      }}
                      placeholder="Enter 10-digit number"
                      maxLength="10"
                    />
                    {fieldErrors.phone ? (
                      <div style={styles.errorText}>⚠️ {fieldErrors.phone}</div>
                    ) : formData.phone && !fieldErrors.phone ? (
                      <div style={styles.successText}>✓ Valid phone number</div>
                    ) : null}
                  </div>
                ) : (
                  <span style={styles.detailValue}> {profileData.phone}</span>
                )}
              </div>

              {/* Current Location */}
              <div style={{
                ...styles.detailItem,
                ...(isEditingProfile && styles.detailItemEditing)
              }}>
                <strong style={styles.detailLabel}>Current Location</strong>
                {isEditingProfile ? (
                  <div style={styles.inputContainer}>
                    <input
                      type="text"
                      value={formData.currentLocation}
                      onChange={(e) => handleInputChange('currentLocation', e.target.value)}
                      style={{
                        ...styles.editInput,
                        ...(fieldErrors.currentLocation ? styles.editInputError : 
                            formData.currentLocation && !fieldErrors.currentLocation ? styles.editInputSuccess : {})
                      }}
                      placeholder="Enter your current location"
                    />
                    {fieldErrors.currentLocation ? (
                      <div style={styles.errorText}>⚠️ {fieldErrors.currentLocation}</div>
                    ) : formData.currentLocation && !fieldErrors.currentLocation ? (
                      <div style={styles.successText}>✓ Valid location</div>
                    ) : null}
                  </div>
                ) : (
                  <span style={styles.detailValue}>{profileData.currentLocation}</span>
                )}
              </div>

              {/* Vehicle Type */}
              <div style={{
                ...styles.detailItem,
                ...(isEditingProfile && styles.detailItemEditing)
              }}>
                <strong style={styles.detailLabel}>Vehicle Type</strong>
                {isEditingProfile ? (
                  <select
                    value={formData.vehicleType}
                    onChange={(e) => handleInputChange('vehicleType', e.target.value)}
                    style={styles.editInput}
                  >
                    <option value="Motorcycle">Motorcycle</option>
                    <option value="Scooter">Scooter</option>
                    <option value="Bicycle">Bicycle</option>
                    <option value="Car">Car</option>
                  </select>
                ) : (
                  <span style={styles.detailValue}>{profileData.vehicleType}</span>
                )}
              </div>

              {/* Vehicle Number */}
              <div style={{
                ...styles.detailItem,
                ...(isEditingProfile && styles.detailItemEditing)
              }}>
                <strong style={styles.detailLabel}>Vehicle Number</strong>
                {isEditingProfile ? (
                  <div style={styles.inputContainer}>
                    <input
                      type="text"
                      value={formData.vehicleNumber}
                      onChange={(e) => handleInputChange('vehicleNumber', e.target.value)}
                      style={{
                        ...styles.editInput,
                        ...(fieldErrors.vehicleNumber ? styles.editInputError : 
                            formData.vehicleNumber && !fieldErrors.vehicleNumber ? styles.editInputSuccess : {})
                      }}
                      placeholder="Enter vehicle registration number"
                    />
                    {fieldErrors.vehicleNumber ? (
                      <div style={styles.errorText}>⚠️ {fieldErrors.vehicleNumber}</div>
                    ) : formData.vehicleNumber && !fieldErrors.vehicleNumber ? (
                      <div style={styles.successText}>✓ Valid vehicle number</div>
                    ) : null}
                  </div>
                ) : (
                  <span style={styles.detailValue}>{profileData.vehicleNumber}</span>
                )}
              </div>
            </div>

            <h3 style={styles.sectionTitle}>Performance Statistics</h3>
            <div style={styles.detailGrid}>
              {/* Read-only performance fields */}
              <div style={styles.detailItem}>
                <strong style={styles.detailLabel}>Joined Date</strong>
                <span style={styles.detailValue}>{profileData.joinedDate}</span>
              </div>
              <div style={styles.detailItem}>
                <strong style={styles.detailLabel}>Total Deliveries</strong>
                <span style={styles.detailValue}>{profileData.totalDeliveries}</span>
              </div>
              <div style={styles.detailItem}>
                <strong style={styles.detailLabel}>Current Rating</strong>
                <span style={styles.detailValue}>{profileData.rating}/5 ⭐</span>
              </div>
              <div style={styles.detailItem}>
                <strong style={styles.detailLabel}>Completion Rate</strong>
                <span style={styles.detailValue}>{profileData.completionRate}</span>
              </div>
              <div style={styles.detailItem}>
                <strong style={styles.detailLabel}>Avg Response Time</strong>
                <span style={styles.detailValue}>{profileData.responseTime}</span>
              </div>
              <div style={styles.detailItem}>
                <strong style={styles.detailLabel}>Average Rating</strong>
                <span style={styles.detailValue}>{profileData.averageRating}/5 ⭐</span>
              </div>
            </div>

            {/* Edit Profile Actions - Moved to bottom */}
            <div style={styles.profileEditActions}>
              {!isEditingProfile ? (
                <button
                  style={styles.primaryButton}
                  onClick={handleProfileEdit}
                >
                  ✏️ Edit Profile
                </button>
              ) : (
                <>
                  <button
                    style={{
                      ...styles.successButton,
                      ...(!isFormValid() && { opacity: 0.6, cursor: 'not-allowed' })
                    }}
                    onClick={handleProfileSave}
                    disabled={!isFormValid()}
                  >
                    💾 Save Changes
                  </button>
                  <button
                    style={styles.dangerButton}
                    onClick={handleProfileCancel}
                  >
                    ❌ Cancel
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;