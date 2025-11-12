import React, { useState, useContext, createContext } from 'react';

const ProfileContext = createContext();

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

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};

export default useProfile;