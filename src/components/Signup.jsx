import React, { useState } from 'react';

const Signup = ({ onSwitchToLogin, onSignupSuccess }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    userType: 'user'
  });
  const [formErrors, setFormErrors] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');
  const [isLoading, setIsLoading] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

  const currentUserType = userTypes.find(user => user.type === formData.userType);

  // Validation functions
  const validateName = (name) => {
    const nameRegex = /^[A-Za-z\s]{2,}$/;
    if (!name.trim()) return 'Full name is required';
    if (!nameRegex.test(name)) return 'Name should contain only alphabets and spaces (min 2 characters)';
    return '';
  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email.trim()) return 'Email is required';
    if (!emailRegex.test(email)) return 'Please enter a valid email address (e.g., example@gmail.com)';
    return '';
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phone.trim()) return 'Phone number is required';
    if (!phoneRegex.test(phone)) return 'Please enter a valid phone number';
    return '';
  };

  const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*]/.test(password);
    
    return password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Apply input restrictions based on field type
    let processedValue = value;
    
    if (name === 'fullName') {
      // Only allow letters and spaces
      processedValue = value.replace(/[^A-Za-z\s]/g, '');
    } else if (name === 'phone') {
      // Only allow numbers and limit to 10 digits
      processedValue = value.replace(/\D/g, '').slice(0, 10);
    }
    
    setFormData({
      ...formData,
      [name]: processedValue
    });

    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    let error = '';

    switch (name) {
      case 'fullName':
        error = validateName(value);
        break;
      case 'email':
        error = validateEmail(value);
        break;
      case 'phone':
        error = validatePhone(value);
        break;
      case 'password':
        if (value && !validatePassword(value)) {
          error = 'Password must be 8+ characters with uppercase, lowercase, number & special character';
        }
        break;
      case 'confirmPassword':
        if (value && value !== formData.password) {
          error = 'Passwords do not match';
        }
        break;
      default:
        break;
    }

    setFormErrors({
      ...formErrors,
      [name]: error
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Validate all fields before submission
    const nameError = validateName(formData.fullName);
    const emailError = validateEmail(formData.email);
    const phoneError = validatePhone(formData.phone);
    const passwordError = formData.password && !validatePassword(formData.password) 
      ? 'Password must be 8+ characters with uppercase, lowercase, number & special character' 
      : '';
    const confirmPasswordError = formData.confirmPassword && formData.password !== formData.confirmPassword 
      ? 'Passwords do not match' 
      : '';

    const errors = {
      fullName: nameError,
      email: emailError,
      phone: phoneError,
      password: passwordError,
      confirmPassword: confirmPasswordError
    };

    setFormErrors(errors);

    // Check if there are any errors
    const hasErrors = Object.values(errors).some(error => error !== '');
    
    if (hasErrors) {
      setToastMessage('Please fix the errors in the form');
      setToastType('error');
      setShowToast(true);
      setIsLoading(false);
      setTimeout(() => setShowToast(false), 3000);
      return;
    }

    if (!agreeToTerms) {
      setToastMessage('Please agree to the Terms of Service and Privacy Policy');
      setToastType('error');
      setShowToast(true);
      setIsLoading(false);
      setTimeout(() => setShowToast(false), 3000);
      return;
    }

    // simulate async (keep your behavior)
    await new Promise(resolve => setTimeout(resolve, 1000));

    const storedUsers = localStorage.getItem('registeredUsers');
    const existingUsers = storedUsers ? JSON.parse(storedUsers) : [];

    const userExists = existingUsers.find(user => 
      user.email === formData.email || user.phone === formData.phone
    );
    
    if (userExists) {
      setToastMessage('User already exists with this email or phone');
      setToastType('error');
      setShowToast(true);
      setIsLoading(false);
      setTimeout(() => setShowToast(false), 3000);
      return;
    }

    const newUser = {
      id: Date.now(),
      ...formData,
      createdAt: new Date().toISOString()
    };

    const updatedUsers = [...existingUsers, newUser];
    localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));

    setToastMessage(`Account created! Welcome ${formData.fullName}`);
    setToastType('success');
    setShowToast(true);
    
    // reset form like before
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      userType: 'user'
    });
    setFormErrors({
      fullName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: ''
    });
    setAgreeToTerms(false);
    setShowPassword(false);
    setShowConfirmPassword(false);

    setTimeout(() => {
      setShowToast(false);
      if (onSignupSuccess) {
        onSignupSuccess();
      }
    }, 2000);

    setIsLoading(false);
  };

  const passwordStrength = validatePassword(formData.password) ? 'strong' : 'weak';

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

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

      {/* Main Card Container */}
      <div style={{
        display: 'flex',
        width: '100%',
        maxWidth: '1100px',
        backgroundColor: 'white',
        borderRadius: '16px',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
        minHeight: '650px'
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
              {formData.userType === 'user' }
              {formData.userType === 'vendor' }
              {formData.userType === 'delivery' }
              {formData.userType === 'doctor' }
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
                  onClick={() => setFormData({...formData, userType: user.type})}
                  style={{
                    padding: '10px 16px',
                    border: `2px solid ${formData.userType === user.type ? 'white' : 'rgba(255,255,255,0.3)'}`,
                    borderRadius: '8px',
                    backgroundColor: formData.userType === user.type ? 'rgba(255,255,255,0.2)' : 'transparent',
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

        {/* Right Side - Signup Form */}
        <div style={{
          flex: 1,
          padding: '40px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          overflowY: 'auto'
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
              Create Account
            </h2>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Full Name Field */}
            <div style={{ marginBottom: '16px', textAlign: 'left' }}>
              <label style={{
                display: 'block',
                marginBottom: '6px',
                fontWeight: '500',
                color: '#333333',
                fontSize: '13px'
              }}>
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                placeholder="Enter your full name"
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  border: `1px solid ${formErrors.fullName ? '#EF4444' : '#D1D5DB'}`,
                  borderRadius: '8px',
                  fontSize: '14px',
                  boxSizing: 'border-box',
                  outline: 'none',
                  transition: 'border-color 0.2s ease',
                  color: '#333333'
                }}
                onFocus={(e) => e.target.style.borderColor = '#7C2A62'}
              />
              {formErrors.fullName && (
                <div style={{
                  marginTop: '4px',
                  fontSize: '11px',
                  color: '#EF4444',
                  fontWeight: '500'
                }}>
                  {formErrors.fullName}
                </div>
              )}
            </div>

            {/* Email Field */}
            <div style={{ marginBottom: '16px', textAlign: 'left' }}>
              <label style={{
                display: 'block',
                marginBottom: '6px',
                fontWeight: '500',
                color: '#333333',
                fontSize: '13px'
              }}>
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                placeholder="Enter your email"
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  border: `1px solid ${formErrors.email ? '#EF4444' : '#D1D5DB'}`,
                  borderRadius: '8px',
                  fontSize: '14px',
                  boxSizing: 'border-box',
                  outline: 'none',
                  transition: 'border-color 0.2s ease',
                  color: '#333333'
                }}
                onFocus={(e) => e.target.style.borderColor = '#7C2A62'}
              />
              {formErrors.email && (
                <div style={{
                  marginTop: '4px',
                  fontSize: '11px',
                  color: '#EF4444',
                  fontWeight: '500'
                }}>
                  {formErrors.email}
                </div>
              )}
            </div>

            {/* Phone Number Field */}
            <div style={{ marginBottom: '16px', textAlign: 'left' }}>
              <label style={{
                display: 'block',
                marginBottom: '6px',
                fontWeight: '500',
                color: '#333333',
                fontSize: '13px'
              }}>
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                placeholder="Enter your 10-digit phone number"
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  border: `1px solid ${formErrors.phone ? '#EF4444' : '#D1D5DB'}`,
                  borderRadius: '8px',
                  fontSize: '14px',
                  boxSizing: 'border-box',
                  outline: 'none',
                  transition: 'border-color 0.2s ease',
                  color: '#333333'
                }}
                onFocus={(e) => e.target.style.borderColor = '#7C2A62'}
              />
              {formErrors.phone && (
                <div style={{
                  marginTop: '4px',
                  fontSize: '11px',
                  color: '#EF4444',
                  fontWeight: '500'
                }}>
                  {formErrors.phone}
                </div>
              )}
            </div>

            {/* Password Field */}
            <div style={{ marginBottom: '16px', textAlign: 'left' }}>
              <label style={{
                display: 'block',
                marginBottom: '6px',
                fontWeight: '500',
                color: '#333333',
                fontSize: '13px'
              }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  placeholder="Create a strong password"
                  style={{
                    width: '100%',
                    padding: '12px 45px 12px 14px',
                    border: `1px solid ${formErrors.password ? '#EF4444' : '#D1D5DB'}`,
                    borderRadius: '8px',
                    fontSize: '14px',
                    boxSizing: 'border-box',
                    outline: 'none',
                    transition: 'border-color 0.2s ease',
                    color: '#333333'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#7C2A62'}
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
              {formData.password && !formErrors.password && (
                <div style={{
                  marginTop: '4px',
                  fontSize: '11px',
                  color: passwordStrength === 'strong' ? '#10B981' : '#EF4444',
                  fontWeight: '500'
                }}>
                  {passwordStrength === 'strong' ? '✓ Strong password' : '✗ Weak password'}
                </div>
              )}
              {formErrors.password && (
                <div style={{
                  marginTop: '4px',
                  fontSize: '11px',
                  color: '#EF4444',
                  fontWeight: '500'
                }}>
                  {formErrors.password}
                </div>
              )}
            </div>

            {/* Confirm Password Field */}
            <div style={{ marginBottom: '20px', textAlign: 'left' }}>
              <label style={{
                display: 'block',
                marginBottom: '6px',
                fontWeight: '500',
                color: '#333333',
                fontSize: '13px'
              }}>
                Confirm Password
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  placeholder="Confirm your password"
                  style={{
                    width: '100%',
                    padding: '12px 45px 12px 14px',
                    border: `1px solid ${formErrors.confirmPassword ? '#EF4444' : '#D1D5DB'}`,
                    borderRadius: '8px',
                    fontSize: '14px',
                    boxSizing: 'border-box',
                    outline: 'none',
                    transition: 'border-color 0.2s ease',
                    color: '#333333'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#7C2A62'}
                />
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
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
                  {showConfirmPassword ? '' : ''}
                </button>
              </div>
              {formErrors.confirmPassword && (
                <div style={{
                  marginTop: '4px',
                  fontSize: '11px',
                  color: '#EF4444',
                  fontWeight: '500'
                }}>
                  {formErrors.confirmPassword}
                </div>
              )}
            </div>

            {/* Terms and Conditions Checkbox */}
            <div style={{ marginBottom: '20px', textAlign: 'left' }}>
              <label style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '8px',
                cursor: 'pointer',
                fontSize: '13px',
                color: '#333333'
              }}>
                <input
                  type="checkbox"
                  checked={agreeToTerms}
                  onChange={(e) => setAgreeToTerms(e.target.checked)}
                  style={{
                    marginTop: '2px'
                  }}
                />
                <span>
                  I agree to the{' '}
                  <a 
                    href="https://drive.google.com/file/d/1bZkQuNNdVootx27yQ0lMbIpqn83oIrYn/view?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: '#7C2A62',
                      fontWeight: '500',
                      cursor: 'pointer',
                      textDecoration: 'underline'
                    }}
                  >
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a 
                    href="https://drive.google.com/file/d/1D3PHKle-WG-A9sJv2f4O2ZjBzoGaKLzo/view?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: '#7C2A62',
                      fontWeight: '500',
                      cursor: 'pointer',
                      textDecoration: 'underline'
                    }}
                  >
                    Privacy Policy
                  </a>
                </span>
              </label>
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
              {isLoading ? 'Creating Account...' : `Join as ${currentUserType.label}`}
            </button>
          </form>

          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <p style={{
              color: '#666666',
              fontSize: '14px',
              textAlign: 'center',
              margin: 0
            }}>
              Already have an account? <span 
                onClick={() => !isLoading && onSwitchToLogin()}
                style={{
                  color: '#7C2A62',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Sign in
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;