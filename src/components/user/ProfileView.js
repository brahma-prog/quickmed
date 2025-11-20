import React, { useState, useEffect } from 'react';
import { useProfile } from './ProfileContext'; // Import the context hook
import { styles } from './Styles';

const ProfileView = ({
  setActiveView,
  triggerProfilePhotoUpload,
  removeProfilePhoto
}) => {
  // Use the profile from context
  const { profile, updateProfile } = useProfile();

  const [localProfile, setLocalProfile] = useState({
    phone: "",
    address: "",
    city: "",
    pincode: "",
    dateOfBirth: "",
    age: "",
    gender: ""
  });

  const [localFormErrors, setLocalFormErrors] = useState({});
  const [localIsFormValid, setLocalIsFormValid] = useState(false);
  const [localIsFormTouched, setLocalIsFormTouched] = useState(false);

  // Sync with updated profile from context - FIXED
  useEffect(() => {
    console.log('ProfileView: profile updated from context', profile);
    setLocalProfile({
      phone: profile.phone || "",
      address: profile.address || "",
      city: profile.city || "",
      pincode: profile.pincode || "",
      dateOfBirth: profile.dateOfBirth || "",
      age: profile.age || "",
      gender: profile.gender || ""
    });
  }, [profile]);

  // Auto-calculate age - FIXED
  useEffect(() => {
    if (localProfile.dateOfBirth) {
      const calculateAge = (birthDate) => {
        const dob = new Date(birthDate);
        const today = new Date();
        let age = today.getFullYear() - dob.getFullYear();
        const monthDiff = today.getMonth() - dob.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
          age--;
        }
        return age.toString();
      };

      const calculatedAge = calculateAge(localProfile.dateOfBirth);
      console.log('Auto-calculated age:', calculatedAge);
      setLocalProfile(prev => ({ 
        ...prev, 
        age: calculatedAge 
      }));
    }
  }, [localProfile.dateOfBirth]);

  // Validate Form
  const validateLocalForm = () => {
    const errors = {};

    // Phone validation - make it required
    if (!localProfile.phone.trim()) {
      errors.phone = "Phone number required";
    } else if (!/^[6-9]\d{9}$/.test(localProfile.phone)) {
      errors.phone = "Enter valid 10-digit mobile starting with 6-9";
    }

    if (!localProfile.address.trim()) errors.address = "Address required";

    if (!localProfile.city.trim()) {
      errors.city = "City required";
    } else if (!/^[A-Za-z\s]+$/.test(localProfile.city)) {
      errors.city = "Only letters allowed";
    }

    if (!localProfile.pincode) {
      errors.pincode = "Pincode required";
    } else if (!/^\d{6}$/.test(localProfile.pincode)) {
      errors.pincode = "Must be 6 digits";
    }

    if (!localProfile.dateOfBirth) errors.dateOfBirth = "Birthdate required";
    if (!localProfile.age) errors.age = "Age required";
    if (!localProfile.gender) errors.gender = "Gender required";

    setLocalFormErrors(errors);
    setLocalIsFormValid(Object.keys(errors).length === 0);
  };

  useEffect(() => {
    validateLocalForm();
  }, [localProfile]);

  const handleLocalProfileChange = (e) => {
    const { name, value } = e.target;
    let updatedValue = value;

    if (name === "city") updatedValue = value.replace(/[^A-Za-z\s]/g, "");
    if (name === "pincode") updatedValue = value.replace(/\D/g, "").slice(0, 6);

    setLocalProfile(prev => ({ ...prev, [name]: updatedValue }));
    setLocalIsFormTouched(true);
  };

  const handleLocalProfileBlur = (e) => {
    if (e.target.name === "phone") {
      const cleaned = e.target.value.replace(/\D/g, "").slice(0, 10);
      setLocalProfile(prev => ({ ...prev, phone: cleaned }));
    }
  };

  const handleLocalProfileUpdate = async (e) => {
    e.preventDefault();
    
    // Final validation check
    validateLocalForm();
    
    if (!localIsFormValid) {
      alert("Please fix all errors before updating!");
      return;
    }

    // Create complete updated profile
    const updatedProfile = {
      ...profile, // Use the current profile from context
      phone: localProfile.phone,
      address: localProfile.address,
      city: localProfile.city,
      pincode: localProfile.pincode,
      dateOfBirth: localProfile.dateOfBirth,
      age: localProfile.age,
      gender: localProfile.gender
    };

    console.log('Updating profile with:', updatedProfile);

    try {
      // Update profile using the context function
      await updateProfile(updatedProfile);
      
      // Show success message
      alert("Profile updated successfully!");
      console.log('Profile update successful!');
      
      // Reset form touched state
      setLocalIsFormTouched(false);
      
      // Optional: Navigate back to dashboard
      // setActiveView("dashboard");
      
    } catch (error) {
      alert("Error updating profile. Please try again.");
      console.error("Profile update error:", error);
    }
  };

  const BackButton = ({ onClick, text = "Back" }) => (
    <button style={styles.backButton} onClick={onClick} type="button">
      ← {text}
    </button>
  );

  return (
    <div style={styles.profileContainer}>
      <div style={styles.pageHeader}>
        <BackButton onClick={() => setActiveView("dashboard")} text="" />
        <h2 style={styles.sectionTitle}>My Profile</h2>
      </div>

     {/* Profile Photo */}
<div style={styles.profilePhotoSection}>
  <div style={styles.profilePhotoContainer}>
    <div style={styles.profilePhotoPreview}>
      <img
        src={localProfile.profilePhoto || profile.profilePhoto || ""}
        alt="Profile"
        style={styles.profilePhotoImage}
        onError={(e) => (e.target.style.display = "none")}
      />
      {!localProfile.profilePhoto && !profile.profilePhoto && (
        <div style={styles.profilePhotoPlaceholder}>
          {profile.fullName?.charAt(0).toUpperCase() || "U"}
        </div>
      )}
    </div>

    <div style={styles.profilePhotoActions}>
      {/* Upload Button + Hidden File Input */}
      <label style={styles.uploadPhotoButton}>
         Update Photo
        <input
          type="file"
          accept="image/*"
          hidden
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) {
              const imageURL = URL.createObjectURL(file);
              setLocalProfile((prev) => ({
                ...prev,
                profilePhoto: imageURL,
              }));
              updateProfile({
                ...profile,
                profilePhoto: imageURL,
              });
            }
          }}
        />
      </label>

      {/* Remove Button */}
      {(localProfile.profilePhoto || profile.profilePhoto) && (
        <button
          style={styles.removePhotoButton}
          type="button"
          onClick={() => {
            setLocalProfile((prev) => ({
              ...prev,
              profilePhoto: "",
            }));
            updateProfile({
              ...profile,
              profilePhoto: "",
            });
          }}
        >
           Remove Photo
        </button>
      )}
    </div>
  </div>
</div>


      {/* Form */}
      <form onSubmit={handleLocalProfileUpdate} style={styles.profileForm}>
        <div style={styles.formGrid}>
          
          {/* Full Name */}
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Full Name</label>
            <input 
              type="text" 
              value={profile.fullName} 
              style={{ ...styles.formInput, ...styles.nonEditableField }} 
              disabled 
            />
            <p style={styles.fieldNote}>Name cannot be changed</p>
          </div>

          {/* Email */}
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Email</label>
            <input 
              type="email" 
              value={profile.email} 
              style={{ ...styles.formInput, ...styles.nonEditableField }} 
              disabled 
            />
            <p style={styles.fieldNote}>Email cannot be changed</p>
          </div>

          {/* Phone */}
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Phone *</label>
            <div style={styles.phoneInputContainer}>
              <div style={styles.phonePrefix}>🇮🇳 +91</div>
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
                placeholder="10-digit number"
                maxLength="10"
              />
            </div>
            {localIsFormTouched && localFormErrors.phone && (
              <span style={styles.formError}>{localFormErrors.phone}</span>
            )}
          </div>

          {/* Date of Birth */}
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Date of Birth *</label>
            <input 
              type="date" 
              name="dateOfBirth" 
              value={localProfile.dateOfBirth} 
              onChange={handleLocalProfileChange}
              style={{ 
                ...styles.formInput, 
                ...(localIsFormTouched && localFormErrors.dateOfBirth && styles.formInputError) 
              }}
            />
            {localIsFormTouched && localFormErrors.dateOfBirth && (
              <span style={styles.formError}>{localFormErrors.dateOfBirth}</span>
            )}
          </div>

          {/* Age - Auto-calculated */}
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Age *</label>
            <input 
              type="text" 
              name="age" 
              value={localProfile.age} 
              style={{ 
                ...styles.formInput, 
                ...(localIsFormTouched && localFormErrors.age && styles.formInputError) 
              }}
              placeholder="Auto-calculated from birth date"
              readOnly
            />
            {localIsFormTouched && localFormErrors.age && (
              <span style={styles.formError}>{localFormErrors.age}</span>
            )}
          </div>

          {/* Gender */}
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
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {localIsFormTouched && localFormErrors.gender && (
              <span style={styles.formError}>{localFormErrors.gender}</span>
            )}
          </div>

          {/* Address */}
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Address *</label>
            <textarea 
              name="address" 
              rows="3" 
              placeholder="Full address"
              value={localProfile.address} 
              onChange={handleLocalProfileChange}
              style={{ 
                ...styles.formTextarea, 
                ...(localIsFormTouched && localFormErrors.address && styles.formInputError) 
              }}
            />
            {localIsFormTouched && localFormErrors.address && (
              <span style={styles.formError}>{localFormErrors.address}</span>
            )}
          </div>

          {/* City */}
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>City *</label>
            <input 
              type="text" 
              name="city" 
              placeholder="Enter city name"
              value={localProfile.city} 
              onChange={handleLocalProfileChange}
              style={{ 
                ...styles.formInput, 
                ...(localIsFormTouched && localFormErrors.city && styles.formInputError) 
              }}
            />
            {localIsFormTouched && localFormErrors.city && (
              <span style={styles.formError}>{localFormErrors.city}</span>
            )}
          </div>

          {/* Pincode */}
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Pincode *</label>
            <input 
              type="text" 
              name="pincode" 
              placeholder="6 digits only"
              value={localProfile.pincode} 
              onChange={handleLocalProfileChange}
              style={{ 
                ...styles.formInput, 
                ...(localIsFormTouched && localFormErrors.pincode && styles.formInputError) 
              }}
              maxLength="6"
            />
            {localIsFormTouched && localFormErrors.pincode && (
              <span style={styles.formError}>{localFormErrors.pincode}</span>
            )}
          </div>
        </div>

        {/* Update Profile Button */}
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

export default ProfileView;