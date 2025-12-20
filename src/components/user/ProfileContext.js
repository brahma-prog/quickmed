import React, { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const ProfileContext = createContext();

// Default profile structure - UPDATED to match ProfileView fields
const defaultProfile = {
  fullName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  pincode: '',
  district: '',
  country: 'India',
  dateOfBirth: '',
  age: '',
  gender: '',
  profilePhoto: null,
  emergencyContact: '',
  linkedAccounts: [],
  lastUpdated: '',
  // Additional fields for better parsing
  firstName: '',
  lastName: '',
  streetAddress: '',
  apartment: ''
};

export const ProfileProvider = ({ children, user }) => {
  const [profile, setProfile] = useState(() => {
    try {
      // Load from localStorage first
      const saved = localStorage.getItem('userProfile');
      if (saved) {
        console.log('Initializing profile from localStorage:', saved);
        const parsed = JSON.parse(saved);
        return { ...defaultProfile, ...parsed };
      }
      
      // Then use user data from props (login data)
      if (user && user.email) {
        console.log('Initializing profile from user props:', user);
        const userProfile = {
          ...defaultProfile,
          fullName: user.fullName || user.name || '',
          email: user.email || '',
          phone: user.phone || '',
          address: user.address || '',
          city: user.city || '',
          state: user.state || '',
          pincode: user.pincode || '',
          district: user.district || '',
          country: user.country || 'India',
          dateOfBirth: user.dateOfBirth || '',
          age: user.age || '',
          gender: user.gender || '',
          profilePhoto: user.profilePhoto || null,
          emergencyContact: user.emergencyContact || '',
          linkedAccounts: user.linkedAccounts || [],
          lastUpdated: user.lastUpdated || new Date().toISOString()
        };
        
        // Save to localStorage
        localStorage.setItem('userProfile', JSON.stringify(userProfile));
        return userProfile;
      }
      
      // Fallback: default profile
      console.log('Initializing with default profile');
      return defaultProfile;
    } catch (error) {
      console.error('Error loading profile:', error);
      return defaultProfile;
    }
  });

  // Sync profile to localStorage whenever it changes
  useEffect(() => {
    try {
      console.log('Saving profile to localStorage:', profile);
      localStorage.setItem('userProfile', JSON.stringify(profile));
    } catch (error) {
      console.error('Error saving profile to localStorage:', error);
    }
  }, [profile]);

  // Update profile when user prop changes (login/logout)
  useEffect(() => {
    if (user && user.email) {
      console.log('User data received in ProfileProvider - UPDATING PROFILE:', user);
      setProfile(prevProfile => {
        const updatedProfile = {
          ...prevProfile,
          ...user,
          lastUpdated: new Date().toISOString()
        };
        
        console.log('Profile updated from user data:', updatedProfile);
        return updatedProfile;
      });
    }
  }, [user]);

  // CRITICAL FIX: Enhanced updateProfile function that properly merges ALL fields
  const updateProfile = (newProfileData) => {
    console.log('Updating profile with new data:', newProfileData);
    
    setProfile(prevProfile => {
      // Create a properly merged profile with ALL fields
      const updatedProfile = {
        ...prevProfile,
        ...newProfileData,
        lastUpdated: new Date().toISOString()
      };
      
      // Ensure we have all default fields
      Object.keys(defaultProfile).forEach(key => {
        if (updatedProfile[key] === undefined) {
          updatedProfile[key] = defaultProfile[key];
        }
      });
      
      console.log('Final updated profile for storage:', updatedProfile);
      return updatedProfile;
    });
    
    return Promise.resolve();
  };

  // Helper function to update both local and context state together
  const updateProfileWithLocalState = async (formData) => {
    console.log('Updating profile with form data:', formData);
    
    // Prepare the data for context
    const profileData = {
      ...formData,
      fullName: `${formData.firstName} ${formData.lastName}`.trim(),
      address: `${formData.streetAddress}${formData.apartment ? ', ' + formData.apartment : ''}`,
      lastUpdated: new Date().toISOString()
    };
    
    console.log('Processed profile data for context:', profileData);
    
    await updateProfile(profileData);
    return Promise.resolve();
  };

  const updateProfilePhoto = (photoUrl) => {
    console.log('Updating profile photo:', photoUrl);
    setProfile(prevProfile => ({
      ...prevProfile,
      profilePhoto: photoUrl,
      lastUpdated: new Date().toISOString()
    }));
    
    return Promise.resolve();
  };

  const removeProfilePhoto = () => {
    console.log('Removing profile photo');
    setProfile(prevProfile => ({
      ...prevProfile,
      profilePhoto: null,
      lastUpdated: new Date().toISOString()
    }));
    
    return Promise.resolve();
  };

  const clearProfile = () => {
    console.log('Clearing profile data');
    localStorage.removeItem('userProfile');
    setProfile(defaultProfile);
  };

  const isProfileComplete = () => {
    const requiredFields = ['fullName', 'email', 'phone', 'address', 'city', 'state', 'pincode', 'district', 'dateOfBirth', 'gender'];
    return requiredFields.every(field => profile[field] && profile[field].toString().trim() !== '');
  };

  const forceProfileUpdate = (userData) => {
    console.log('Force updating profile:', userData);
    if (userData) {
      updateProfile(userData);
    }
  };

  const value = {
    profile,
    updateProfile,
    updateProfileWithLocalState, // New function
    updateProfilePhoto,
    removeProfilePhoto,
    clearProfile,
    isProfileComplete,
    forceProfileUpdate,
    getProfileCompletion: () => {
      const requiredFields = ['fullName', 'email', 'phone', 'address', 'city', 'state', 'pincode', 'district', 'dateOfBirth', 'gender'];
      const completedFields = requiredFields.filter(field => 
        profile[field] && profile[field].toString().trim() !== ''
      ).length;
      return Math.round((completedFields / requiredFields.length) * 100);
    },
    getMissingFields: () => {
      const requiredFields = ['fullName', 'email', 'phone', 'address', 'city', 'state', 'pincode', 'district', 'dateOfBirth', 'gender'];
      return requiredFields.filter(field => 
        !profile[field] || profile[field].toString().trim() === ''
      );
    }
  };

  return (
    <ProfileContext.Provider value={value}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};

ProfileProvider.propTypes = {
  children: PropTypes.node.isRequired,
  user: PropTypes.shape({
    email: PropTypes.string,
    fullName: PropTypes.string,
    name: PropTypes.string,
    phone: PropTypes.string,
    address: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    pincode: PropTypes.string,
    district: PropTypes.string,
    country: PropTypes.string,
    dateOfBirth: PropTypes.string,
    age: PropTypes.string,
    gender: PropTypes.string,
    profilePhoto: PropTypes.string,
    lastUpdated: PropTypes.string,
    emergencyContact: PropTypes.string,
    linkedAccounts: PropTypes.array
  })
};

ProfileProvider.defaultProps = {
  user: null
};

export default ProfileContext;