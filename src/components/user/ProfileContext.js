// src/context/ProfileContext.js
import React, { useState, useContext, createContext } from 'react';

const ProfileContext = createContext();

export const ProfileProvider = ({ children, user }) => {
  const [profile, setProfile] = useState({
    fullName: user?.fullName || 'Jagan',
    email: user?.email || 'yerrajagan29@gmail.com',
    phone: user?.phone || '6300604470',
    address: user?.address || '',
    city: user?.city || '',
    pincode: user?.pincode || '',
    dateOfBirth: user?.dateOfBirth || '',
    age: user?.age || '',
    gender: user?.gender || '',
    profilePhoto: user?.profilePhoto || null
  });

  const updateProfile = (newProfile) => {
    console.log('Updating profile in context:', newProfile);
    setProfile(prevProfile => ({
      ...prevProfile,
      ...newProfile
    }));
  };

  const updateProfilePhoto = (photoUrl) => {
    setProfile(prevProfile => ({
      ...prevProfile,
      profilePhoto: photoUrl
    }));
  };

  const removeProfilePhoto = () => {
    setProfile(prevProfile => ({
      ...prevProfile,
      profilePhoto: null
    }));
  };

  return (
    <ProfileContext.Provider value={{ 
      profile, 
      updateProfile,
      updateProfilePhoto,
      removeProfilePhoto
    }}>
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

export default ProfileContext;