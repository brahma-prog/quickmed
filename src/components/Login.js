
import React, { useState } from 'react';

const Login = ({ onSwitchToSignup, onLoginSuccess, onBackToHome }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('user');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const userTypes = [
    { 
      type: 'user', 
      label: 'User',
      image: 'https://media.istockphoto.com/id/1140560047/photo/customer-in-pharmacy-holding-medicine-bottle-woman-reading-the-label-text-about-medical.jpg?s=612x612&w=0&k=20&c=IeZusngtnu-o4olnwAE62nk2Xcsj7xjtA4OopAubsdc=',
      quote: 'Access healthcare services, medicine delivery, and doctor consultations with ease.',
      title: 'Patient & Customer'
    },
    { 
      type: 'vendor', 
      label: 'Vendor',
      image: 'https://plus.unsplash.com/premium_photo-1672759453651-c6834f55c4f6?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEyfHx8ZW58MHx8fHx8&auto=format&fit=crop&q=60&w=600',
      quote: 'Manage your medical inventory efficiently and reach more customers through our platform.',
      title: 'Vendor Management'
    },
    { 
      type: 'delivery', 
      label: 'Delivery',
      image: 'https://media.istockphoto.com/id/1325274795/photo/black-delivery-man-in-mask-giving-cardboard-box-to-woman.jpg?s=612x612&w=0&k=20&c=CpkYYHqfz0vt166SMCHXyA0CRdnyOAmyniAcp171ZXw=',
      quote: 'Join our network of healthcare heroes delivering medicines and supplies to those in need.',
      title: 'Medical Delivery'
    },
    { 
      type: 'doctor', 
      label: 'Doctor',
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      quote: 'Expand your practice and provide exceptional care through our telemedicine platform.',
      title: 'Healthcare Professional'
    }
  ];

  const currentUserType = userTypes.find(user => user.type === userType);

  // Enhanced authentication function
  const authenticateUser = (email, password, userType) => {
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    
    const mockUsers = [
      { email: 'user@quickmed.com', password: 'password123', userType: 'user', fullName: 'Demo User' },
      { email: 'vendor@quickmed.com', password: 'password123', userType: 'vendor', fullName: 'Demo Vendor' },
      { email: 'delivery@quickmed.com', password: 'password123', userType: 'delivery', fullName: 'Demo Delivery' },
      { email: 'doctor@quickmed.com', password: 'password123', userType: 'doctor', fullName: 'Demo Doctor' }
    ];

    const allUsers = [...registeredUsers, ...mockUsers];
    
    console.log('Available users:', allUsers);
    console.log('Login attempt:', { email, password, userType });

    const user = allUsers.find(u => 
      u.email.toLowerCase() === email.toLowerCase() && 
      u.password === password && 
      u.userType === userType
    );

    return user;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email.trim() || !password.trim()) {
      setToastMessage('Please fill in all fields');
      setToastType('error');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      return;
    }

    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const user = authenticateUser(email, password, userType);
      
      if (user) {
        setToastMessage(`Welcome back, ${user.fullName || user.email}!`);
        setToastType('success');
        setShowToast(true);
        
        if (rememberMe) {
          localStorage.setItem('rememberMe', JSON.stringify({
            email: user.email,
            userType: user.userType
          }));
        }
        
        localStorage.setItem('currentUser', JSON.stringify(user));
        
        setEmail('');
        setPassword('');
        
        if (onLoginSuccess) {
          onLoginSuccess(user);
        }
      } else {
        setToastMessage('Invalid email, password, or user type. Please try again.');
        setToastType('error');
        setShowToast(true);
      }
    } catch (error) {
      console.error('Login error:', error);
      setToastMessage('An error occurred during login. Please try again.');
      setToastType('error');
      setShowToast(true);
    } finally {
      setIsLoading(false);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    
    if (!forgotEmail.trim()) {
      setToastMessage('Please enter your email address');
      setToastType('error');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      return;
    }

    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setToastMessage(`Password reset link sent to ${forgotEmail}`);
      setToastType('success');
      setShowToast(true);
      setShowForgotPassword(false);
      setForgotEmail('');
    } catch (error) {
      setToastMessage('Failed to send reset link. Please try again.');
      setToastType('error');
      setShowToast(true);
    } finally {
      setIsLoading(false);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handlePasswordToggleKeyPress = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      togglePasswordVisibility();
    }
  };

  React.useEffect(() => {
    const remembered = localStorage.getItem('rememberMe');
    if (remembered) {
      try {
        const rememberData = JSON.parse(remembered);
        setEmail(rememberData.email || '');
        setUserType(rememberData.userType || 'user');
        setRememberMe(true);
      } catch (error) {
        console.error('Error parsing remembered user:', error);
      }
    }
  }, []);

  const EyeIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
      <circle cx="12" cy="12" r="3"></circle>
    </svg>
  );

  const EyeOffIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
      <line x1="1" y1="1" x2="23" y2="23"></line>
    </svg>
  );

  return (
    <div className="login-container">
      
      {/* Back to Home Button */}
      <button 
        onClick={onBackToHome}
        className="back-home-btn"
        disabled={isLoading}
      >
        ← Back to Home
      </button>

      {/* Toast Message */}
      {showToast && (
        <div className={`toast-message ${toastType}`}>
          {toastType === 'success' ? '✅ ' : '❌ '}{toastMessage}
        </div>
      )}

      {/* Forgot Password Modal */}
      {showForgotPassword && (
        <div className="forgot-password-modal">
          <div className="modal-content">
            <h3>Reset Password</h3>
            <p>Enter your email to receive a reset link</p>
            
            <form onSubmit={handleForgotPassword}>
              <div className="input-group">
                <input
                  type="email"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  required
                  placeholder="Enter your email"
                  disabled={isLoading}
                />
              </div>
              
              <div className="modal-buttons">
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(false)}
                  disabled={isLoading}
                  className="cancel-btn"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="submit-btn"
                >
                  {isLoading ? 'Sending...' : 'Send Link'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Main Card Container */}
      <div className="main-card">

        {/* Left Side - Dynamic Content */}
        <div className="left-section">
          <div className="background-image" />
          
          <div className="content-wrapper">
            <div className="user-icon">
              {userType === 'user' && '👤'}
              {userType === 'vendor' && '🏪'}
              {userType === 'delivery' && '🚚'}
              {userType === 'doctor' && '👨‍⚕️'}
            </div>
            
            <h2 className="user-title">
              {currentUserType.title}
            </h2>
            
            <p className="user-quote">
              {currentUserType.quote}
            </p>
            
            <div className="user-type-buttons">
              {userTypes.map((user) => (
                <button
                  key={user.type}
                  type="button"
                  onClick={() => !isLoading && setUserType(user.type)}
                  className={`user-type-btn ${userType === user.type ? 'active' : ''}`}
                  disabled={isLoading}
                >
                  <span className="btn-icon">
                    {user.type === 'user' && '👤'}
                    {user.type === 'vendor' && '🏪'}
                    {user.type === 'delivery' && '🚚'}
                    {user.type === 'doctor' && '👨‍⚕️'}
                  </span>
                  <span className="btn-label">{user.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="right-section">
          <div className="form-header">
            <h1 className="app-title">QUICKMED</h1>
            <h2 className="login-title">Login</h2>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Email or Phone</label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder={`Enter your ${userType === 'vendor' ? 'business email' : 'email or phone'}`}
                disabled={isLoading}
              />
            </div>

            <div className="input-group">
              <label>Password</label>
              <div className="password-input-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter your password"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  onKeyDown={handlePasswordToggleKeyPress}
                  className="password-toggle"
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
            </div>

            {/* Remember Me and Forgot Password Row */}
            <div className="form-options">
              <label className="remember-me">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  disabled={isLoading}
                />
                <span>Remember me</span>
              </label>
              
              <span 
                onClick={() => !isLoading && setShowForgotPassword(true)}
                onKeyDown={(e) => !isLoading && (e.key === 'Enter' || e.key === ' ') && setShowForgotPassword(true)}
                className="forgot-password-link"
                tabIndex={0}
                role="button"
              >
                Forgot Password?
              </span>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="login-btn"
            >
              {isLoading ? 'Signing In...' : `Login as ${currentUserType.label}`}
            </button>
          </form>

          <div className="signup-section">
            <p>
              Don't have an account? <span 
                onClick={() => !isLoading && onSwitchToSignup()}
                onKeyDown={(e) => !isLoading && (e.key === 'Enter' || e.key === ' ') && onSwitchToSignup()}
                className="signup-link"
                tabIndex={0}
                role="button"
              >
                Sign up
              </span>
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .login-container {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          background-color: #f8fafc;
          padding: 20px;
          position: relative;
        }

        /* Back to Home Button */
        .back-home-btn {
          position: absolute;
          top: 20px;
          left: 20px;
          padding: 10px 20px;
          background-color: white;
          color: #7C2A62;
          border: 2px solid #7C2A62;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          z-index: 10;
        }

        .back-home-btn:hover:not(:disabled) {
          background-color: #7C2A62;
          color: white;
        }

        .back-home-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        /* Toast Message */
        .toast-message {
          position: fixed;
          top: 20px;
          right: 20px;
          background-color: #10B981;
          color: white;
          padding: 12px 20px;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          z-index: 1000;
          animation: slideInRight 0.3s ease-out;
          font-size: 14px;
          font-weight: 500;
          max-width: 400px;
        }

        .toast-message.error {
          background-color: #EF4444;
        }

        /* Forgot Password Modal */
        .forgot-password-modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0,0,0,0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1001;
          padding: 20px;
        }

        .modal-content {
          background-color: white;
          padding: 30px;
          border-radius: 12px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.2);
          width: 100%;
          max-width: 380px;
          text-align: center;
        }

        .modal-content h3 {
          color: #333333;
          margin-bottom: 10px;
          font-size: 20px;
          font-weight: 600;
        }

        .modal-content p {
          color: #666666;
          margin-bottom: 20px;
          font-size: 14px;
        }

        .modal-buttons {
          display: flex;
          gap: 10px;
          justify-content: space-between;
        }

        .cancel-btn {
          padding: 12px 20px;
          background-color: #F3F4F6;
          color: #333333;
          border: none;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          flex: 1;
        }

        .submit-btn {
          padding: 12px 20px;
          background-color: #7C2A62;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          flex: 1;
          opacity: 1;
        }

        .submit-btn:disabled {
          opacity: 0.7;
        }

        /* Main Card Container */
        .main-card {
          display: flex;
          width: 100%;
          max-width: 1100px;
          background-color: white;
          border-radius: 16px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          min-height: 600px;
        }

        /* Left Section */
        .left-section {
          flex: 1;
          background: linear-gradient(135deg, #7C2A62 0%, #5a1a4a 100%);
          color: white;
          padding: 40px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }

        .background-image {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: url(${currentUserType.image});
          background-size: cover;
          background-position: center;
          opacity: 0.15;
        }

        .content-wrapper {
          position: relative;
          z-index: 2;
          text-align: center;
        }

        .user-icon {
          font-size: 48px;
          margin-bottom: 20px;
          opacity: 0.9;
        }

        .user-title {
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 16px;
          line-height: 1.3;
        }

        .user-quote {
          font-size: 16px;
          line-height: 1.6;
          opacity: 0.9;
          margin-bottom: 30px;
          max-width: 400px;
          margin-left: auto;
          margin-right: auto;
        }

        .user-type-buttons {
          display: flex;
          justify-content: center;
          gap: 8px;
          flex-wrap: wrap;
        }

        .user-type-btn {
          padding: 12px 16px;
          border: 2px solid rgba(255,255,255,0.3);
          border-radius: 8px;
          background-color: transparent;
          color: white;
          font-weight: 500;
          cursor: pointer;
          font-size: 12px;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: all 0.3s ease;
        }

        .user-type-btn.active {
          border-color: white;
          background-color: rgba(255,255,255,0.2);
        }

        .user-type-btn:hover:not(:disabled) {
          border-color: rgba(255,255,255,0.6);
          background-color: rgba(255,255,255,0.1);
        }

        .user-type-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .btn-icon {
          font-size: 16px;
        }

        /* Right Section */
        .right-section {
          flex: 1;
          padding: 50px 40px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .form-header {
          text-align: center;
          margin-bottom: 30px;
        }

        .app-title {
          font-size: 32px;
          font-weight: 700;
          margin-bottom: 8px;
          color: #7C2A62;
        }

        .login-title {
          color: #333333;
          font-size: 24px;
          font-weight: 600;
          margin-bottom: 4px;
        }

        .input-group {
          margin-bottom: 20px;
          text-align: left;
        }

        .input-group label {
          display: block;
          margin-bottom: 8px;
          font-weight: 500;
          color: #333333;
          font-size: 14px;
        }

        .input-group input {
          width: 100%;
          padding: 14px 16px;
          border: 1px solid #D1D5DB;
          border-radius: 8px;
          font-size: 14px;
          box-sizing: border-box;
          outline: none;
          transition: border-color 0.2s ease;
          color: #333333;
        }

        .input-group input:focus {
          border-color: #7C2A62;
        }

        .input-group input:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .password-input-wrapper {
          position: relative;
        }

        .password-toggle {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          color: #666;
          padding: 4px;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          transition: all 0.2s ease;
        }

        .password-toggle:hover:not(:disabled) {
          background-color: #F7D9EB;
          color: #7C2A62;
        }

        .password-toggle:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .form-options {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 25px;
        }

        .remember-me {
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          font-size: 14px;
          color: #333333;
        }

        .remember-me input {
          margin: 0;
          accent-color: #7C2A62;
        }

        .forgot-password-link {
          color: #7C2A62;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          padding: 4px 8px;
          border-radius: 4px;
        }

        .forgot-password-link:hover {
          color: #5a1a4a;
          background-color: #F7D9EB;
        }

        .login-btn {
          width: 100%;
          padding: 14px;
          background-color: #7C2A62;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          opacity: 1;
          margin-bottom: 20px;
          box-shadow: 0 4px 12px rgba(124, 42, 98, 0.3);
        }

        .login-btn:hover:not(:disabled) {
          background-color: #5a1a4a;
        }

        .login-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          animation: pulse 1.5s ease-in-out infinite;
        }

        .signup-section {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 15px;
        }

        .signup-section p {
          color: #666666;
          font-size: 14px;
          text-align: center;
          margin: 0;
        }

        .signup-link {
          color: #7C2A62;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          padding: 2px 6px;
          border-radius: 4px;
          margin-left: 4px;
        }

        .signup-link:hover {
          color: #5a1a4a;
          background-color: #F7D9EB;
        }

        /* Animations */
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.7; }
          100% { opacity: 1; }
        }

        /* Mobile Responsive Styles */
        @media (max-width: 768px) {
          .login-container {
            padding: 16px;
            min-height: 100vh;
            align-items: flex-start;
          }

          .back-home-btn {
            position: fixed;
            top: 16px;
            left: 16px;
            padding: 8px 16px;
            font-size: 12px;
            z-index: 1000;
          }

          .toast-message {
            top: 16px;
            right: 16px;
            left: 16px;
            max-width: none;
            text-align: center;
          }

          .main-card {
            flex-direction: column;
            min-height: auto;
            margin-top: 60px;
            max-width: 500px;
          }

          .left-section {
            padding: 30px 20px;
            min-height: 250px;
          }

          .user-icon {
            font-size: 36px;
            margin-bottom: 15px;
          }

          .user-title {
            font-size: 22px;
            margin-bottom: 12px;
          }

          .user-quote {
            font-size: 14px;
            margin-bottom: 20px;
            padding: 0 10px;
          }

          .user-type-buttons {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 8px;
          }

          .user-type-btn {
            padding: 10px 12px;
            font-size: 11px;
            justify-content: center;
            min-height: 44px;
          }

          .btn-icon {
            font-size: 14px;
          }

          .right-section {
            padding: 30px 20px;
          }

          .form-header {
            margin-bottom: 20px;
          }

          .app-title {
            font-size: 28px;
          }

          .login-title {
            font-size: 20px;
          }

          .input-group {
            margin-bottom: 16px;
          }

          .input-group input {
            padding: 12px 14px;
          }

          .form-options {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
            margin-bottom: 20px;
          }

          .forgot-password-link {
            align-self: flex-end;
          }

          .login-btn {
            padding: 12px;
            font-size: 15px;
            margin-bottom: 16px;
          }

          .modal-content {
            padding: 24px;
            margin: 20px;
          }

          .modal-buttons {
            flex-direction: column;
          }

          .cancel-btn {
            margin-bottom: 8px;
          }
        }

        /* Small Mobile Devices */
        @media (max-width: 480px) {
          .left-section {
            padding: 25px 15px;
            min-height: 220px;
          }

          .right-section {
            padding: 25px 15px;
          }

          .user-type-buttons {
            grid-template-columns: 1fr;
          }

          .user-type-btn {
            min-height: 40px;
          }

          .back-home-btn {
            font-size: 11px;
            padding: 6px 12px;
          }
        }

        /* Tablet Styles */
        @media (min-width: 769px) and (max-width: 1024px) {
          .main-card {
            max-width: 900px;
          }

          .left-section {
            padding: 30px;
          }

          .right-section {
            padding: 40px 30px;
          }

          .user-title {
            font-size: 24px;
          }

          .user-quote {
            font-size: 15px;
          }
        }
      `}</style>
    </div>
  );
};

export default Login;