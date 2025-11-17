import React, { useState, useContext } from 'react';

// Create a context for global profile state
const ProfileContext = React.createContext();

// Profile Provider Component (should be at app root level)
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