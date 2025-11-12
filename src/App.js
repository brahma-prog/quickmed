import React, { useState, useEffect } from 'react';
import HomePage from './components/HomePage';
import Login from './components/Login';
import Signup from './components/Signup';
import UserDashboard from './components/user/UserDashboard';
import VendorDashboard from './components/vendor/VendorDashboard';
import DoctorDashboard from './components/doctor/DoctorDashboard';
import DeliveryDashboard from './components/delivery/DeliveryDashboard';
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [authMode, setAuthMode] = useState('login');
  const [currentUser, setCurrentUser] = useState(null);

  // User type to dashboard mapping
  const userTypeToPageMap = {
    vendor: 'vendorDashboard',
    doctor: 'doctorDashboard',
    delivery: 'deliveryDashboard',
    admin: 'adminDashboard'
  };

  useEffect(() => {
    // Check if user is already logged in
    const user = localStorage.getItem('currentUser');
    if (user) {
      try {
        const userData = JSON.parse(user);
        setCurrentUser(userData);
        setCurrentPage(userTypeToPageMap[userData.userType] || 'dashboard');
      } catch (error) {
        console.error('Error parsing user data from localStorage:', error);
        localStorage.removeItem('currentUser');
      }
    }
  }, []);

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
    setCurrentPage(userTypeToPageMap[user.userType] || 'dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    setCurrentPage('home');
  };

  const navigateToAuth = () => {
    setCurrentPage('auth');
    setAuthMode('login');
  };

  const navigateToAdmin = () => {
    setCurrentPage('adminAuth');
    setAuthMode('login');
  };

  const switchToSignup = () => setAuthMode('signup');
  const switchToLogin = () => setAuthMode('login');
  
  const handleSignupSuccess = () => {
    setAuthMode('login');
    setCurrentPage('auth');
  };

  const handleBackToHome = () => {
    setCurrentPage('home');
  };

  const renderAuthPage = () => {
    if (authMode === 'login') {
      return (
        <Login 
          onSwitchToSignup={switchToSignup}
          onLoginSuccess={handleLoginSuccess}
          onBack={handleBackToHome}
        />
      );
    }
    return (
      <Signup 
        onSwitchToLogin={switchToLogin}
        onSignupSuccess={handleSignupSuccess}
        onBack={handleBackToHome}
      />
    );
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <HomePage 
            onNavigateToAuth={navigateToAuth}
            onNavigateToAdmin={navigateToAdmin}
          />
        );
      case 'auth':
        return renderAuthPage();
      case 'adminAuth':
        return (
          <AdminLogin 
            onLoginSuccess={handleLoginSuccess}
            onBack={handleBackToHome}
          />
        );
      case 'dashboard':
        return (
          <UserDashboard 
            user={currentUser}
            onLogout={handleLogout}
          />
        );
      case 'vendorDashboard':
        return (
          <VendorDashboard 
            user={currentUser}
            onLogout={handleLogout}
          />
        );
      case 'doctorDashboard':
        return (
          <DoctorDashboard 
            user={currentUser}
            onLogout={handleLogout}
          />
        );
      case 'deliveryDashboard':
        return (
          <DeliveryDashboard 
            user={currentUser}
            onLogout={handleLogout}
          />
        );
      case 'adminDashboard':
        return (
          <AdminDashboard 
            user={currentUser}
            onLogout={handleLogout}
          />
        );
      default:
        return (
          <HomePage 
            onNavigateToAuth={navigateToAuth}
            onNavigateToAdmin={navigateToAdmin}
          />
        );
    }
  };

  return (
    <div className="App">
      {renderPage()}
    </div>
  );
}

export default App;