import React, { useState, useEffect } from 'react';
import { styles } from './Styles';

const ProfileView = ({
  userProfile,
  setUserProfile,
  updateProfile,
  setActiveView,
  triggerProfilePhotoUpload,
  removeProfilePhoto,
  user,
  addNotification
}) => {
  // Move the form state to local component state for better control
  const [localProfile, setLocalProfile] = useState({
    phone: userProfile.phone || '',
    address: userProfile.address || '',
    city: userProfile.city || '',
    pincode: userProfile.pincode || '',
    dateOfBirth: userProfile.dateOfBirth || '',
    age: userProfile.age || '',
    gender: userProfile.gender || ''
  });
  const [localFormErrors, setLocalFormErrors] = useState({});
  const [localIsFormValid, setLocalIsFormValid] = useState(false);
  const [localIsFormTouched, setLocalIsFormTouched] = useState(false);

  // Local validation function with enhanced phone validation
  const validateLocalForm = () => {
    const errors = {};

    // Phone validation (only numbers, 10 digits, required, must start with 9, 8, or 7)
    if (!localProfile.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(localProfile.phone)) {
      errors.phone = 'Phone number must be 10 digits';
    } else if (!/^[789]/.test(localProfile.phone)) {
      errors.phone = 'Phone number must start with 9, 8, or 7';
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

  // Fixed useEffect dependency issue
  useEffect(() => {
    validateLocalForm();
  }, [localProfile]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleLocalProfileChange = (e) => {
    const { name, value } = e.target;
    
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
      case 'city':
        // Only allow alphabets and spaces
        processedValue = value.replace(/[^A-Za-z\s]/g, '');
        break;
      case 'phone':
        // Only allow numbers, max 10 digits, must start with 9, 8, or 7
        processedValue = value.replace(/\D/g, '').slice(0, 10);
        // If first digit is not 9, 8, or 7, clear the input
        if (processedValue && !/^[789]/.test(processedValue)) {
          processedValue = '';
        }
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
    
    // Update the main user profile state (preserve name and email)
    const updatedProfile = {
      ...userProfile, // Keep original name and email
      phone: localProfile.phone,
      address: localProfile.address,
      city: localProfile.city,
      pincode: localProfile.pincode,
      dateOfBirth: localProfile.dateOfBirth,
      age: localProfile.age,
      gender: localProfile.gender,
      profilePhoto: userProfile.profilePhoto // Preserve profile photo
    };
    setUserProfile(updatedProfile);
    updateProfile(updatedProfile);
    
    // Update user profile in parent component (if provided)
    if (user && typeof user === 'object') {
      user.phone = localProfile.phone;
      user.address = localProfile.address;
      user.city = localProfile.city;
      user.pincode = localProfile.pincode;
      user.dateOfBirth = localProfile.dateOfBirth;
      user.age = localProfile.age;
      user.gender = localProfile.gender;
    }
    
    alert('Profile updated successfully!');
    addNotification('Profile Updated', 'Your profile information has been updated successfully', 'info');
    
    setLocalIsFormTouched(false);
  };

  const BackButton = ({ onClick, text = 'Back' }) => (
    <button 
      style={styles.backButton}
      onClick={onClick}
      type="button"
    >
      ← {text}
    </button>
  );

  return (
    <div style={styles.profileContainer}>
      <div style={styles.pageHeader}>
        <BackButton onClick={() => setActiveView('dashboard')} text="" />
        <h2 style={styles.sectionTitle}>My Profile</h2>
      </div>
      
      {/* Profile Photo Section */}
      <div style={styles.profilePhotoSection}>
        <div style={styles.profilePhotoContainer}>
          <div style={styles.profilePhotoPreview}>
            {userProfile.profilePhoto ? (
              <img
                src={userProfile.profilePhoto}
                alt="Profile"
                style={styles.profilePhotoImage}
              />
            ) : (
              <div style={styles.profilePhotoPlaceholder}>
                {userProfile.fullName?.charAt(0) || 'U'}
              </div>
            )}
          </div>
          <div style={styles.profilePhotoActions}>
            <button 
              style={styles.uploadPhotoButton}
              onClick={triggerProfilePhotoUpload}
              type="button"
            >
              📷 Update Photo
            </button>
            {userProfile.profilePhoto && (
              <button 
                style={styles.removePhotoButton}
                onClick={removeProfilePhoto}
                type="button"
              >
                🗑️ Remove Photo
              </button>
            )}
          </div>
        </div>
      </div>

      <form onSubmit={handleLocalProfileUpdate} style={styles.profileForm}>
        <div style={styles.formGrid}>
          {/* Non-editable Name Field */}
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Full Name</label>
            <input
              type="text"
              value={userProfile.fullName || ''}
              style={{
                ...styles.formInput,
                ...styles.nonEditableField
              }}
              readOnly
              disabled
            />
            <p style={styles.fieldNote}>Name cannot be changed</p>
          </div>
          
          {/* Non-editable Email Field */}
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Email</label>
            <input
              type="email"
              value={userProfile.email || ''}
              style={{
                ...styles.formInput,
                ...styles.nonEditableField
              }}
              readOnly
              disabled
            />
            <p style={styles.fieldNote}>Email cannot be changed</p>
          </div>
          
          {/* Editable Phone Field with Indian Flag and Validation */}
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Phone *</label>
            <div style={styles.phoneInputContainer}>
              <div style={styles.phonePrefix}>
                <span style={styles.indianFlag}>🇮🇳</span>
                <span style={styles.countryCode}>+91</span>
              </div>
              <input
                type="tel"
                name="phone"
                value={localProfile.phone}
                onChange={handleLocalProfileChange}
                onBlur={handleLocalProfileBlur}
                style={{
                  ...styles.phoneInput,
                  ...(localIsFormTouched && localFormErrors.phone && styles.formInputError)
                }}
                placeholder="Enter 10-digit mobile number"
                maxLength="10"
                required
              />
            </div>
            {localIsFormTouched && localFormErrors.phone && <span style={styles.formError}>{localFormErrors.phone}</span>}
            {!localFormErrors.phone && localProfile.phone && (
              <div style={styles.phoneValidationMessage}>
                <span style={styles.validPhoneIcon}>✓</span>
                <span style={styles.validPhoneText}>Valid Indian mobile number</span>
              </div>
            )}
          </div>

          {/* Editable Date of Birth Field */}
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
          
          {/* Editable Age Field */}
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
          
          {/* Editable Gender Field */}
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
          
          {/* Editable Address Field */}
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
          
          {/* Editable City Field */}
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
              placeholder="Enter your city"
              required
            />
            {localIsFormTouched && localFormErrors.city && <span style={styles.formError}>{localFormErrors.city}</span>}
          </div>
          
          {/* Editable Pincode Field */}
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
              placeholder="Enter your pincode"
              required
            />
            {localIsFormTouched && localFormErrors.pincode && <span style={styles.formError}>{localFormErrors.pincode}</span>}
          </div>
        </div>
        
        <div style={styles.formNote}>
          <p style={styles.noteText}>* Please fill in all mandatory fields marked with an asterisk (*)</p>
          <p style={styles.noteText}>Name and email cannot be changed for security reasons</p>
          <p style={styles.noteText}>Phone number must be a valid Indian mobile number starting with 9, 8, or 7</p>
        </div>
        
        <div style={styles.formActions}>
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
        </div>
      </form>
    </div>
  );
};

export default ProfileView;