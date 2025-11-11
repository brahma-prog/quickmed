import React, { useState } from 'react';

const Login = ({ onSwitchToSignup, onLoginSuccess }) => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const storedUsers = localStorage.getItem('registeredUsers');
    const users = storedUsers ? JSON.parse(storedUsers) : [];
    
    const user = users.find(user => user.email === email || user.phone === email);
    
    if (!user) {
      setToastMessage('User not found. Please sign up first.');
      setToastType('error');
      setShowToast(true);
      setIsLoading(false);
      setTimeout(() => setShowToast(false), 3000);
      return;
    }
    
    if (user.password !== password) {
      setToastMessage('Invalid password. Please try again.');
      setToastType('error');
      setShowToast(true);
      setIsLoading(false);
      setTimeout(() => setShowToast(false), 3000);
      return;
    }
    
    if (user.userType !== userType) {
      setToastMessage(`Please login as ${user.userType}`);
      setToastType('error');
      setShowToast(true);
      setIsLoading(false);
      setTimeout(() => setShowToast(false), 3000);
      return;
    }
    
    // Save to localStorage if Remember Me is checked
    if (rememberMe) {
      const rememberMeData = {
        email: user.email,
        userType: user.userType,
        timestamp: new Date().getTime()
      };
      localStorage.setItem('rememberMe', JSON.stringify(rememberMeData));
    } else {
      localStorage.removeItem('rememberMe');
    }
    
    setToastMessage(`Welcome back, ${user.fullName}!`);
    setToastType('success');
    setShowToast(true);
    
    localStorage.setItem('currentUser', JSON.stringify(user));
    setEmail('');
    setPassword('');
    setIsLoading(false);
    
    // Call the success callback
    if (onLoginSuccess) {
      onLoginSuccess(user);
    }
    
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const storedUsers = localStorage.getItem('registeredUsers');
    const users = storedUsers ? JSON.parse(storedUsers) : [];
    
    const user = users.find(user => user.email === forgotEmail);
    
    if (!user) {
      setToastMessage('No account found with this email address.');
      setToastType('error');
      setShowToast(true);
      setIsLoading(false);
      setTimeout(() => setShowToast(false), 3000);
      return;
    }
    
    setToastMessage(`Password reset link sent to ${forgotEmail}`);
    setToastType('success');
    setShowToast(true);
    setShowForgotPassword(false);
    setForgotEmail('');
    setIsLoading(false);
    
    setTimeout(() => setShowToast(false), 3000);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Check for remembered user on component mount
  React.useEffect(() => {
    const remembered = localStorage.getItem('rememberMe');
    if (remembered) {
      const rememberData = JSON.parse(remembered);
      setEmail(rememberData.email);
      setUserType(rememberData.userType);
      setRememberMe(true);
    }
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      backgroundColor: '#f8fafc',
      padding: '20px'
    }}>
      
      {/* Toast Message */}
      {showToast && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          backgroundColor: toastType === 'success' ? '#10B981' : '#EF4444',
          color: 'white',
          padding: '12px 20px',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          zIndex: 1000,
          animation: 'slideInRight 0.3s ease-out',
          fontSize: '14px',
          fontWeight: '500'
        }}>
          {toastType === 'success' ? '✅ ' : '❌ '}{toastMessage}
        </div>
      )}

      {/* Forgot Password Modal */}
      {showForgotPassword && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1001,
          padding: '20px'
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '30px',
            borderRadius: '12px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
            width: '100%',
            maxWidth: '380px',
            textAlign: 'center'
          }}>
            <h3 style={{
              color: '#333333',
              marginBottom: '10px',
              fontSize: '20px',
              fontWeight: '600'
            }}>
              Reset Password
            </h3>
            <p style={{
              color: '#666666',
              marginBottom: '20px',
              fontSize: '14px'
            }}>
              Enter your email to receive a reset link
            </p>
            
            <form onSubmit={handleForgotPassword}>
              <div style={{ marginBottom: '20px', textAlign: 'left' }}>
                <input
                  type="email"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  required
                  placeholder="Enter your email"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #D1D5DB',
                    borderRadius: '8px',
                    fontSize: '14px',
                    boxSizing: 'border-box',
                    outline: 'none',
                    color: '#333333'
                  }}
                />
              </div>
              
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'space-between' }}>
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(false)}
                  style={{
                    padding: '12px 20px',
                    backgroundColor: '#F3F4F6',
                    color: '#333333',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    flex: 1
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  style={{
                    padding: '12px 20px',
                    backgroundColor: '#7C2A62',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    flex: 1,
                    opacity: isLoading ? 0.7 : 1
                  }}
                >
                  {isLoading ? 'Sending...' : 'Send Link'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Main Card Container */}
      <div style={{
        display: 'flex',
        width: '100%',
        maxWidth: '1100px',
        backgroundColor: 'white',
        borderRadius: '16px',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
        minHeight: '600px'
      }}>

        {/* Left Side - Dynamic Content */}
        <div style={{
          flex: 1,
          background: `linear-gradient(135deg, #7C2A62 0%, #5a1a4a 100%)`,
          color: 'white',
          padding: '40px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url(${currentUserType.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.15
          }} />
          
          <div style={{
            position: 'relative',
            zIndex: 2,
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: '48px',
              marginBottom: '20px',
              opacity: 0.9
            }}>
              {userType === 'user'}
              {userType === 'vendor'}
              {userType === 'delivery'}
              {userType === 'doctor'}
            </div>
            
            <h2 style={{
              fontSize: '28px',
              fontWeight: '700',
              marginBottom: '16px',
              lineHeight: '1.3'
            }}>
              {currentUserType.title}
            </h2>
            
            <p style={{
              fontSize: '16px',
              lineHeight: '1.6',
              opacity: 0.9,
              marginBottom: '30px',
              maxWidth: '400px',
              marginLeft: 'auto',
              marginRight: 'auto'
            }}>
              {currentUserType.quote}
            </p>
            
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '8px',
              flexWrap: 'wrap'
            }}>
              {userTypes.map((user) => (
                <button
                  key={user.type}
                  type="button"
                  onClick={() => setUserType(user.type)}
                  style={{
                    padding: '10px 16px',
                    border: `2px solid ${userType === user.type ? 'white' : 'rgba(255,255,255,0.3)'}`,
                    borderRadius: '8px',
                    backgroundColor: userType === user.type ? 'rgba(255,255,255,0.2)' : 'transparent',
                    color: 'white',
                    fontWeight: '500',
                    cursor: 'pointer',
                    fontSize: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <span style={{ fontSize: '16px' }}>
                    {user.type === 'user' && '👤'}
                    {user.type === 'vendor' && '🏪'}
                    {user.type === 'delivery' && '🚚'}
                    {user.type === 'doctor' && '👨‍⚕️'}
                  </span>
                  <span>{user.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div style={{
          flex: 1,
          padding: '50px 40px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          <div style={{
            textAlign: 'center',
            marginBottom: '30px'
          }}>
            <h1 style={{
              fontSize: '32px',
              fontWeight: '700',
              marginBottom: '8px',
              color: '#7C2A62'
            }}>
              QUICKMED
            </h1>
            <h2 style={{
              color: '#333333',
              fontSize: '24px',
              fontWeight: '600',
              marginBottom: '4px'
            }}>
              Login
            </h2>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '20px', textAlign: 'left' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: '500',
                color: '#333333',
                fontSize: '14px'
              }}>
                Email or Phone
              </label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder={`Enter your ${userType === 'vendor' ? 'business email' : 'email'}`}
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  border: '1px solid #D1D5DB',
                  borderRadius: '8px',
                  fontSize: '14px',
                  boxSizing: 'border-box',
                  outline: 'none',
                  transition: 'border-color 0.2s ease',
                  color: '#333333'
                }}
                onFocus={(e) => e.target.style.borderColor = '#7C2A62'}
                onBlur={(e) => e.target.style.borderColor = '#D1D5DB'}
              />
            </div>

            <div style={{ marginBottom: '20px', textAlign: 'left' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: '500',
                color: '#333333',
                fontSize: '14px'
              }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter your password"
                  style={{
                    width: '100%',
                    padding: '14px 45px 14px 16px',
                    border: '1px solid #D1D5DB',
                    borderRadius: '8px',
                    fontSize: '14px',
                    boxSizing: 'border-box',
                    outline: 'none',
                    transition: 'border-color 0.2s ease',
                    color: '#333333'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#7C2A62'}
                  onBlur={(e) => e.target.style.borderColor = '#D1D5DB'}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#666',
                    fontSize: '18px',
                    padding: '4px',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '30px',
                    height: '30px'
                  }}
                  onMouseOver={(e) => e.target.style.backgroundColor = '#f1f1f1'}
                  onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
                >
                  {showPassword ? '' : ''}
                </button>
              </div>
            </div>

            {/* Remember Me and Forgot Password Row */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              marginBottom: '25px'
            }}>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                color: '#333333'
              }}>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  style={{
                    margin: 0
                  }}
                />
                <span>Remember me</span>
              </label>
              
              <span 
                onClick={() => !isLoading && setShowForgotPassword(true)}
                style={{
                  color: '#7C2A62',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}
              >
                Forgot Password?
              </span>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: '100%',
                padding: '14px',
                backgroundColor: '#7C2A62',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                opacity: isLoading ? 0.7 : 1,
                marginBottom: '20px',
                boxShadow: '0 4px 12px rgba(124, 42, 98, 0.3)'
              }}
              onMouseOver={(e) => !isLoading && (e.target.style.backgroundColor = '#5a1a4a')}
              onMouseOut={(e) => !isLoading && (e.target.style.backgroundColor = '#7C2A62')}
            >
              {isLoading ? 'Signing In...' : `Login as ${currentUserType.label}`}
            </button>
          </form>

          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <p style={{
              color: '#666666',
              fontSize: '14px',
              textAlign: 'center',
              margin: 0
            }}>
              Don't have an account? <span 
                onClick={() => !isLoading && onSwitchToSignup()}
                style={{
                  color: '#7C2A62',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Sign up
              </span>
            </p>
          </div>
        </div>
      </div>

      <style>
        {`
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
          
          @media (max-width: 768px) {
            .main-card {
              flex-direction: column;
            }
            .image-side {
              display: none;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Login;