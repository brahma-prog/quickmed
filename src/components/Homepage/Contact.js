import React, { useState, useEffect, useRef } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [emailStatus, setEmailStatus] = useState(''); // 'valid', 'invalid', ''
  const [phoneStatus, setPhoneStatus] = useState(''); // 'valid', 'invalid', ''
  
  const sectionRef = useRef(null);

  // Stats data
  const stats = [
    { number: '30-40', label: 'Minutes Delivery' },
    { number: '24/7', label: 'Service Available' },
    { number: '1000+', label: 'Happy Patients' },
    { number: '50+', label: 'Expert Doctors' }
  ];

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  // Validation functions
  const validateName = (name) => {
    const nameRegex = /^[A-Za-z\s]+$/;
    return nameRegex.test(name.trim());
  };

  const validateEmail = (email) => {
    const emailRegex = /^\S+@\S+\.\S+$/;
    return emailRegex.test(email.trim());
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone.replace('+91', '').trim());
  };

  // Styles with image matching card height
  const styles = {
    contact: {
      padding: isMobile ? '2rem 1rem' : '4rem 2rem',
      background: `
        linear-gradient(135deg, #f8f9fa 0%, #ffffff 50%, #f0f7ff 100%),
        radial-gradient(circle at 20% 80%, rgba(124, 42, 98, 0.08) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(74, 144, 226, 0.08) 0%, transparent 50%)
      `,
      position: 'relative',
      overflow: 'hidden',
      opacity: 0,
      transform: 'translateY(30px)',
      transition: 'all 0.8s ease-out',
      ...(isVisible && {
        opacity: 1,
        transform: 'translateY(0)'
      }),
      minHeight: 'auto',
    },
    // Enhanced animated background elements
    animatedBg: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      overflow: 'hidden',
      zIndex: 0,
      pointerEvents: 'none',
      backgroundImage: `
        radial-gradient(circle at 20% 50%, rgba(124, 42, 98, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(74, 144, 226, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 40% 80%, rgba(124, 42, 98, 0.08) 0%, transparent 50%)
      `,
    },
    // Medical-themed floating elements
    floatingPill: {
      position: 'absolute',
      borderRadius: '20px',
      background: 'linear-gradient(135deg, rgba(124, 42, 98, 0.15), rgba(74, 144, 226, 0.15))',
      animation: 'floatPill 8s ease-in-out infinite',
    },
    floatingCross: {
      position: 'absolute',
      background: 'linear-gradient(135deg, rgba(124, 42, 98, 0.1), rgba(255, 255, 255, 0.8))',
      animation: 'floatCross 12s ease-in-out infinite',
      clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
    },
    floatingHeart: {
      position: 'absolute',
      background: 'linear-gradient(135deg, rgba(220, 53, 69, 0.1), rgba(124, 42, 98, 0.1))',
      animation: 'floatHeart 10s ease-in-out infinite',
      clipPath: 'path("M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z")',
    },
    pulseRing: {
      position: 'absolute',
      border: '2px solid rgba(124, 42, 98, 0.1)',
      borderRadius: '50%',
      animation: 'pulse 4s ease-out infinite',
    },
    // New medical animations
    dnaStrand: {
      position: 'absolute',
      background: 'linear-gradient(135deg, rgba(124, 42, 98, 0.08), rgba(74, 144, 226, 0.08))',
      animation: 'dnaFloat 15s linear infinite',
    },
    heartbeatLine: {
      position: 'absolute',
      background: 'linear-gradient(90deg, transparent, rgba(220, 53, 69, 0.1), transparent)',
      animation: 'heartbeat 3s ease-in-out infinite',
    },
    medicalStar: {
      position: 'absolute',
      background: 'linear-gradient(135deg, rgba(124, 42, 98, 0.1), rgba(255, 255, 255, 0.6))',
      animation: 'pulseStar 6s ease-in-out infinite',
      clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
    },
    // Status indicators
    statusIndicator: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.3rem',
      fontSize: '0.75rem',
      marginTop: '0.3rem',
    },
    validStatus: {
      color: '#28a745',
      fontWeight: '600',
    },
    invalidStatus: {
      color: '#dc3545',
      fontWeight: '600',
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      position: 'relative',
      zIndex: 1,
    },
    sectionHeader: {
      textAlign: 'center',
      marginBottom: isMobile ? '2rem' : '3rem',
    },
    sectionTitle: {
      fontSize: isMobile ? '2rem' : '2.5rem',
      marginBottom: '1rem',
      background: 'linear-gradient(135deg, #7C2A62 0%, #9d4b8a 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      fontWeight: '800',
      lineHeight: '1.2',
    },
    sectionSubtitle: {
      fontSize: isMobile ? '1rem' : '1.1rem',
      color: '#666',
      maxWidth: '600px',
      margin: '0 auto',
      lineHeight: '1.5',
    },
    // Stats Section - Centered and improved
    statsSection: {
      display: 'grid',
      gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
      gap: isMobile ? '1rem' : '2rem',
      marginBottom: isMobile ? '2rem' : '3rem',
      padding: isMobile ? '1.5rem' : '2rem',
      background: 'linear-gradient(135deg, #7C2A62, #9d4b8a)',
      borderRadius: '15px',
      color: 'white',
      boxShadow: '0 10px 30px rgba(124, 42, 98, 0.2)',
      position: 'relative',
      zIndex: 2,
    },
    statItem: {
      textAlign: 'center',
      padding: isMobile ? '1rem' : '1.5rem',
    },
    statNumber: {
      fontSize: isMobile ? '1.5rem' : '2rem',
      fontWeight: '800',
      marginBottom: '0.5rem',
    },
    statLabel: {
      fontSize: isMobile ? '0.8rem' : '0.9rem',
      opacity: '0.9',
    },
    // Main content container with image and form side by side
    contentContainer: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
      gap: isMobile ? '2rem' : '3rem',
      alignItems: 'stretch', // Changed to stretch for equal height
    },
    // Image container - matching card height
    imageContainer: {
      display: isMobile ? 'none' : 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      borderRadius: '20px',
      overflow: 'hidden',
      boxShadow: '0 15px 50px rgba(124, 42, 98, 0.15)',
      transform: isVisible ? 'translateX(0)' : 'translateX(-30px)',
      opacity: isVisible ? 1 : 0,
      transition: 'all 0.8s ease-out 0.2s',
      height: 'auto', // Will match form height
    },
    medicalImage: {
      width: '100%',
      height: '100%', // Full height of container
      objectFit: 'cover', // Cover the entire area
      borderRadius: '20px',
    },
    imageOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(135deg, rgba(124, 42, 98, 0.1), rgba(74, 144, 226, 0.05))',
      borderRadius: '20px',
      pointerEvents: 'none',
    },
    // Form Container
    formContainer: {
      display: 'flex',
      flexDirection: 'column',
    },
    // Enhanced Contact Form
    contactForm: {
      background: 'white',
      padding: isMobile ? '2rem 1.5rem' : '3rem 2.5rem',
      borderRadius: '20px',
      border: '1px solid #e9ecef',
      boxShadow: `
        0 10px 40px rgba(124, 42, 98, 0.15),
        0 5px 20px rgba(74, 144, 226, 0.1),
        inset 0 1px 0 rgba(255, 255, 255, 0.8)
      `,
      width: '100%',
      position: 'relative',
      zIndex: 2,
      transform: isVisible ? 'translateX(0)' : 'translateX(30px)',
      opacity: isVisible ? 1 : 0,
      transition: 'all 0.8s ease-out 0.4s',
      height: 'fit-content', // Form will take needed height
    },
    formHeader: {
      marginBottom: '2rem',
      textAlign: 'center',
    },
    formTitle: {
      fontSize: isMobile ? '1.5rem' : '2rem',
      fontWeight: '800',
      background: 'linear-gradient(135deg, #7C2A62 0%, #9d4b8a 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      marginBottom: '0.8rem',
      lineHeight: '1.3',
    },
    formSubtitle: {
      fontSize: isMobile ? '0.9rem' : '1rem',
      color: '#666',
      lineHeight: '1.5',
      maxWidth: '500px',
      margin: '0 auto',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.2rem',
    },
    formRow: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
      gap: '1rem',
    },
    formGroup: {
      display: 'flex',
      flexDirection: 'column',
    },
    formLabel: {
      fontSize: isMobile ? '0.85rem' : '0.9rem',
      fontWeight: '600',
      color: '#333',
      marginBottom: '0.5rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.3rem',
    },
    requiredStar: {
      color: '#dc3545',
      fontSize: '0.8rem',
    },
    formInput: {
      padding: isMobile ? '0.9rem' : '1rem',
      border: '2px solid #e9ecef',
      borderRadius: '10px',
      fontSize: isMobile ? '0.9rem' : '1rem',
      transition: 'all 0.3s ease',
      outline: 'none',
      background: '#f8f9fa',
      width: '100%',
      boxSizing: 'border-box',
      fontFamily: 'inherit',
    },
    formInputFocus: {
      borderColor: '#7C2A62',
      background: 'white',
      boxShadow: '0 0 0 3px rgba(124, 42, 98, 0.1)',
      transform: 'translateY(-1px)',
    },
    formInputError: {
      borderColor: '#dc3545',
      background: '#fff5f5',
    },
    formInputValid: {
      borderColor: '#28a745',
      background: '#f8fff9',
    },
    formSelect: {
      padding: isMobile ? '0.9rem' : '1rem',
      border: '2px solid #e9ecef',
      borderRadius: '10px',
      fontSize: isMobile ? '0.9rem' : '1rem',
      transition: 'all 0.3s ease',
      outline: 'none',
      background: '#f8f9fa',
      cursor: 'pointer',
      width: '100%',
      boxSizing: 'border-box',
      fontFamily: 'inherit',
    },
    formTextarea: {
      padding: isMobile ? '0.9rem' : '1rem',
      border: '2px solid #e9ecef',
      borderRadius: '10px',
      fontSize: isMobile ? '0.9rem' : '1rem',
      minHeight: isMobile ? '120px' : '140px',
      maxHeight: '200px',
      resize: 'vertical',
      transition: 'all 0.3s ease',
      outline: 'none',
      fontFamily: 'inherit',
      background: '#f8f9fa',
      width: '100%',
      boxSizing: 'border-box',
      lineHeight: '1.4',
    },
    errorText: {
      color: '#dc3545',
      fontSize: isMobile ? '0.75rem' : '0.8rem',
      marginTop: '0.3rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.3rem',
    },
    submitButton: {
      padding: isMobile ? '1rem' : '1.2rem',
      background: 'linear-gradient(135deg, #7C2A62, #9d4b8a)',
      color: 'white',
      border: 'none',
      borderRadius: '12px',
      fontSize: isMobile ? '1rem' : '1.1rem',
      fontWeight: '700',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      marginTop: '0.5rem',
      width: '100%',
      position: 'relative',
      overflow: 'hidden',
    },
    submitButtonHover: {
      transform: 'translateY(-3px)',
      boxShadow: '0 10px 25px rgba(124, 42, 98, 0.4)',
    },
    submitButtonDisabled: {
      background: 'linear-gradient(135deg, #cccccc, #aaaaaa)',
      cursor: 'not-allowed',
      transform: 'none',
      boxShadow: 'none',
    },
  };

  // State for hover effects
  const [hoverStates, setHoverStates] = useState({
    submitButton: false,
    formFocus: {
      name: false,
      email: false,
      phone: false,
      service: false,
      message: false
    }
  });

  // Enhanced medical-themed background elements
  const backgroundElements = [
    // Pills
    ...Array.from({ length: 6 }, (_, i) => ({
      type: 'pill',
      id: `pill-${i}`,
      width: Math.random() * 40 + 20,
      height: Math.random() * 15 + 8,
      left: Math.random() * 100,
      top: Math.random() * 100,
      animationDelay: Math.random() * 8,
      opacity: Math.random() * 0.1 + 0.05
    })),
    // Crosses
    ...Array.from({ length: 4 }, (_, i) => ({
      type: 'cross',
      id: `cross-${i}`,
      size: Math.random() * 30 + 20,
      left: Math.random() * 100,
      top: Math.random() * 100,
      animationDelay: Math.random() * 12,
      opacity: Math.random() * 0.08 + 0.04
    })),
    // Hearts
    ...Array.from({ length: 3 }, (_, i) => ({
      type: 'heart',
      id: `heart-${i}`,
      size: Math.random() * 25 + 15,
      left: Math.random() * 100,
      top: Math.random() * 100,
      animationDelay: Math.random() * 10,
      opacity: Math.random() * 0.07 + 0.03
    })),
    // Pulse rings
    ...Array.from({ length: 3 }, (_, i) => ({
      type: 'pulse',
      id: `pulse-${i}`,
      size: Math.random() * 100 + 50,
      left: Math.random() * 100,
      top: Math.random() * 100,
      animationDelay: Math.random() * 4,
      opacity: Math.random() * 0.06 + 0.02
    })),
    // DNA Strands
    ...Array.from({ length: 2 }, (_, i) => ({
      type: 'dna',
      id: `dna-${i}`,
      width: Math.random() * 4 + 2,
      height: Math.random() * 200 + 100,
      left: Math.random() * 100,
      top: Math.random() * 100,
      animationDelay: Math.random() * 15,
      opacity: Math.random() * 0.06 + 0.02
    })),
    // Heartbeat lines
    ...Array.from({ length: 3 }, (_, i) => ({
      type: 'heartbeat',
      id: `heartbeat-${i}`,
      width: Math.random() * 150 + 100,
      height: Math.random() * 3 + 1,
      left: Math.random() * 100,
      top: Math.random() * 100,
      animationDelay: Math.random() * 3,
      opacity: Math.random() * 0.05 + 0.02
    })),
    // Medical stars
    ...Array.from({ length: 4 }, (_, i) => ({
      type: 'star',
      id: `star-${i}`,
      size: Math.random() * 20 + 10,
      left: Math.random() * 100,
      top: Math.random() * 100,
      animationDelay: Math.random() * 6,
      opacity: Math.random() * 0.08 + 0.03
    }))
  ];

  const handleInputChange = (field, value) => {
    let processedValue = value;

    // Name validation - only alphabets and spaces
    if (field === 'name') {
      // Remove any numbers or special characters
      processedValue = value.replace(/[^A-Za-z\s]/g, '');
    }

    // Phone validation - only numbers, auto-format with +91
    if (field === 'phone') {
      // Remove all non-digit characters
      processedValue = value.replace(/\D/g, '');
      
      // Auto-format with +91 if it starts with 6,7,8,9
      if (processedValue.length > 0 && /^[6-9]/.test(processedValue)) {
        if (processedValue.length <= 10) {
          processedValue = `+91 ${processedValue.slice(0, 10)}`;
        } else {
          processedValue = `+91 ${processedValue.slice(0, 10)}`;
        }
      }
    }

    setFormData(prev => ({
      ...prev,
      [field]: processedValue
    }));

    // Clear errors when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }

    // Validate email in real-time
    if (field === 'email') {
      if (processedValue.trim() === '') {
        setEmailStatus('');
      } else {
        setEmailStatus(validateEmail(processedValue) ? 'valid' : 'invalid');
      }
    }

    // Validate phone in real-time
    if (field === 'phone') {
      const phoneWithoutPrefix = processedValue.replace('+91', '').trim();
      if (phoneWithoutPrefix === '') {
        setPhoneStatus('');
      } else {
        setPhoneStatus(validatePhone(processedValue) ? 'valid' : 'invalid');
      }
    }
  };

  const handleFocus = (field) => {
    setHoverStates(prev => ({
      ...prev,
      formFocus: {
        ...prev.formFocus,
        [field]: true
      }
    }));
  };

  const handleBlur = (field) => {
    setHoverStates(prev => ({
      ...prev,
      formFocus: {
        ...prev.formFocus,
        [field]: false
      }
    }));

    // Validate on blur
    if (field === 'name' && formData.name.trim()) {
      if (!validateName(formData.name)) {
        setErrors(prev => ({ ...prev, name: 'Name should contain only alphabets' }));
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (!validateName(formData.name)) {
      newErrors.name = 'Name should contain only alphabets';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit Indian mobile number starting with 6,7,8,9';
    }

    // Service validation
    if (!formData.service) {
      newErrors.service = 'Please select a service';
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Please provide details';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      alert('Thank you! We will contact you within 30 minutes for your medicine delivery/consultation.');
      setFormData({ name: '', email: '', phone: '', service: '', message: '' });
      setEmailStatus('');
      setPhoneStatus('');
      setIsSubmitting(false);
    }, 2000);
  };

  const renderBackgroundElement = (element) => {
    switch (element.type) {
      case 'pill':
        return (
          <div
            key={element.id}
            style={{
              ...styles.floatingPill,
              width: element.width,
              height: element.height,
              left: `${element.left}%`,
              top: `${element.top}%`,
              animationDelay: `${element.animationDelay}s`,
              opacity: element.opacity,
            }}
          />
        );
      case 'cross':
        return (
          <div
            key={element.id}
            style={{
              ...styles.floatingCross,
              width: element.size,
              height: element.size,
              left: `${element.left}%`,
              top: `${element.top}%`,
              animationDelay: `${element.animationDelay}s`,
              opacity: element.opacity,
            }}
          />
        );
      case 'heart':
        return (
          <div
            key={element.id}
            style={{
              ...styles.floatingHeart,
              width: element.size,
              height: element.size,
              left: `${element.left}%`,
              top: `${element.top}%`,
              animationDelay: `${element.animationDelay}s`,
              opacity: element.opacity,
            }}
          />
        );
      case 'pulse':
        return (
          <div
            key={element.id}
            style={{
              ...styles.pulseRing,
              width: element.size,
              height: element.size,
              left: `${element.left}%`,
              top: `${element.top}%`,
              animationDelay: `${element.animationDelay}s`,
              opacity: element.opacity,
            }}
          />
        );
      case 'dna':
        return (
          <div
            key={element.id}
            style={{
              ...styles.dnaStrand,
              width: element.width,
              height: element.height,
              left: `${element.left}%`,
              top: `${element.top}%`,
              animationDelay: `${element.animationDelay}s`,
              opacity: element.opacity,
            }}
          />
        );
      case 'heartbeat':
        return (
          <div
            key={element.id}
            style={{
              ...styles.heartbeatLine,
              width: element.width,
              height: element.height,
              left: `${element.left}%`,
              top: `${element.top}%`,
              animationDelay: `${element.animationDelay}s`,
              opacity: element.opacity,
            }}
          />
        );
      case 'star':
        return (
          <div
            key={element.id}
            style={{
              ...styles.medicalStar,
              width: element.size,
              height: element.size,
              left: `${element.left}%`,
              top: `${element.top}%`,
              animationDelay: `${element.animationDelay}s`,
              opacity: element.opacity,
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <section style={styles.contact} ref={sectionRef} id="contact">
      {/* Enhanced Medical-themed Animated Background Elements */}
      <div style={styles.animatedBg}>
        {backgroundElements.map(renderBackgroundElement)}
      </div>

      <div style={styles.container}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Quick Medical Services</h2>
          <p style={styles.sectionSubtitle}>
            Professional healthcare at your fingertips
          </p>
        </div>

        {/* Stats Section */}
        <div style={styles.statsSection}>
          {stats.map((stat, index) => (
            <div key={index} style={styles.statItem}>
              <div style={styles.statNumber}>{stat.number}</div>
              <div style={styles.statLabel}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Main Content with Image and Form Side by Side */}
        <div style={styles.contentContainer}>
          {/* Medical Image - Same height as form */}
          <div style={styles.imageContainer}>
            <img 
              src="https://eremedium.in/wp-content/uploads/2022/09/Medical-Animations.jpg" 
              alt="Medical Animations"
              style={styles.medicalImage}
            />
            <div style={styles.imageOverlay}></div>
          </div>

          {/* Form Section */}
          <div style={styles.formContainer}>
            <div style={styles.contactForm}>
              <div style={styles.formHeader}>
                <h3 style={styles.formTitle}>Get Quick Service</h3>
                <p style={styles.formSubtitle}>
                  Fill this form for quick medicine delivery or doctor consultation.  
                  Our team will respond within 30 minutes.
                </p>
              </div>

              <form style={styles.form} onSubmit={handleSubmit}>
                <div style={styles.formRow}>
                  <div style={styles.formGroup}>
                    <label style={styles.formLabel}>
                      Full Name <span style={styles.requiredStar}>*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your full name (alphabets only)"
                      style={{
                        ...styles.formInput,
                        ...(hoverStates.formFocus.name && styles.formInputFocus),
                        ...(errors.name && styles.formInputError)
                      }}
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      onFocus={() => handleFocus('name')}
                      onBlur={() => handleBlur('name')}
                    />
                    {errors.name && (
                      <span style={styles.errorText}>⚠️ {errors.name}</span>
                    )}
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.formLabel}>
                      Email Address <span style={styles.requiredStar}>*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      style={{
                        ...styles.formInput,
                        ...(hoverStates.formFocus.email && styles.formInputFocus),
                        ...(errors.email && styles.formInputError),
                        ...(emailStatus === 'valid' && styles.formInputValid)
                      }}
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      onFocus={() => handleFocus('email')}
                      onBlur={() => handleBlur('email')}
                    />
                    {errors.email && (
                      <span style={styles.errorText}>⚠️ {errors.email}</span>
                    )}
                    {emailStatus === 'valid' && (
                      <div style={{...styles.statusIndicator, ...styles.validStatus}}>
                        ✓ Valid email
                      </div>
                    )}
                    {emailStatus === 'invalid' && formData.email && (
                      <div style={{...styles.statusIndicator, ...styles.invalidStatus}}>
                        ✗ Invalid email format
                      </div>
                    )}
                  </div>
                </div>

                <div style={styles.formRow}>
                  <div style={styles.formGroup}>
                    <label style={styles.formLabel}>
                      Phone Number <span style={styles.requiredStar}>*</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 XXXXXXXXXX"
                      style={{
                        ...styles.formInput,
                        ...(hoverStates.formFocus.phone && styles.formInputFocus),
                        ...(errors.phone && styles.formInputError),
                        ...(phoneStatus === 'valid' && styles.formInputValid)
                      }}
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      onFocus={() => handleFocus('phone')}
                      onBlur={() => handleBlur('phone')}
                    />
                    {errors.phone && (
                      <span style={styles.errorText}>⚠️ {errors.phone}</span>
                    )}
                    {phoneStatus === 'valid' && (
                      <div style={{...styles.statusIndicator, ...styles.validStatus}}>
                        ✓ Valid Indian mobile number
                      </div>
                    )}
                    {phoneStatus === 'invalid' && formData.phone && (
                      <div style={{...styles.statusIndicator, ...styles.invalidStatus}}>
                        ✗ Must be 10 digits starting with 6,7,8,9
                      </div>
                    )}
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.formLabel}>
                      Service Needed <span style={styles.requiredStar}>*</span>
                    </label>
                    <select
                      style={{
                        ...styles.formSelect,
                        ...(hoverStates.formFocus.service && styles.formInputFocus),
                        ...(errors.service && styles.formInputError)
                      }}
                      value={formData.service}
                      onChange={(e) => handleInputChange('service', e.target.value)}
                      onFocus={() => handleFocus('service')}
                      onBlur={() => handleBlur('service')}
                    >
                      <option value="">Select a service</option>
                      <option value="medicine-delivery">Medicine Delivery</option>
                      <option value="doctor-consultation">Doctor Consultation</option>
                      <option value="both">Both Services</option>
                    </select>
                    {errors.service && (
                      <span style={styles.errorText}>⚠️ {errors.service}</span>
                    )}
                  </div>
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>
                    {formData.service === 'medicine-delivery' ? 'Medicine Details *' : 
                     formData.service === 'doctor-consultation' ? 'Symptoms Description *' : 
                     'Service Details *'}
                  </label>
                  <textarea
                    placeholder={
                      formData.service === 'medicine-delivery' ? 
                      'Please provide medicine names, prescription details...' :
                      formData.service === 'doctor-consultation' ?
                      'Please describe your symptoms and medical concerns...' :
                      'Please provide details about the services you need...'
                    }
                    style={{
                      ...styles.formTextarea,
                      ...(hoverStates.formFocus.message && styles.formInputFocus),
                      ...(errors.message && styles.formInputError)
                    }}
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    onFocus={() => handleFocus('message')}
                    onBlur={() => handleBlur('message')}
                  />
                  {errors.message && (
                    <span style={styles.errorText}>⚠️ {errors.message}</span>
                  )}
                </div>

                <button
                  type="submit"
                  style={{
                    ...styles.submitButton,
                    ...(hoverStates.submitButton && !isSubmitting && styles.submitButtonHover),
                    ...(isSubmitting && styles.submitButtonDisabled)
                  }}
                  disabled={isSubmitting}
                  onMouseEnter={() => !isSubmitting && setHoverStates(prev => ({ ...prev, submitButton: true }))}
                  onMouseLeave={() => !isSubmitting && setHoverStates(prev => ({ ...prev, submitButton: false }))}
                >
                  {isSubmitting ? 'Processing Request...' : 'Get Quick Service Now'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced CSS animations for medical theme */}
      <style jsx>{`
        @keyframes floatPill {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg) scale(1);
          }
          33% { 
            transform: translateY(-15px) rotate(90deg) scale(1.1);
          }
          66% { 
            transform: translateY(-8px) rotate(180deg) scale(0.9);
          }
        }

        @keyframes floatCross {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg) scale(1);
          }
          50% { 
            transform: translateY(-20px) rotate(180deg) scale(1.2);
          }
        }

        @keyframes floatHeart {
          0%, 100% { 
            transform: translateY(0px) scale(1);
          }
          25% { 
            transform: translateY(-12px) scale(1.15);
          }
          50% { 
            transform: translateY(-5px) scale(0.95);
          }
          75% { 
            transform: translateY(-18px) scale(1.1);
          }
        }

        @keyframes pulse {
          0% {
            transform: scale(0.1);
            opacity: 1;
          }
          100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }

        /* New medical animations */
        @keyframes dnaFloat {
          0% {
            transform: translateY(-100%) rotate(0deg);
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
          }
        }

        @keyframes heartbeat {
          0%, 100% {
            transform: scaleX(0.3);
            opacity: 0.3;
          }
          25% {
            transform: scaleX(1);
            opacity: 0.7;
          }
          50% {
            transform: scaleX(0.5);
            opacity: 0.5;
          }
          75% {
            transform: scaleX(0.8);
            opacity: 0.6;
          }
        }

        @keyframes pulseStar {
          0%, 100% {
            transform: scale(1) rotate(0deg);
            opacity: 0.5;
          }
          50% {
            transform: scale(1.3) rotate(180deg);
            opacity: 0.8;
          }
        }
      `}</style>
    </section>
  );
};

export default Contact;