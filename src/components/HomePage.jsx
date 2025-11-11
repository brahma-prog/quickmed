import React, { useState, useRef, useEffect } from 'react';

// Separate ReviewModal component to prevent re-renders
const ReviewModal = ({ showReviewModal, setShowReviewModal, setPendingReviews }) => {
  const [reviewForm, setReviewForm] = useState({
    name: '',
    email: '',
    rating: 5,
    comment: ''
  });
  const [reviewErrors, setReviewErrors] = useState({});

  // Review form validation
  const validateReviewForm = () => {
    const errors = {};
    const nameRegex = /^[A-Za-z\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!reviewForm.name.trim()) {
      errors.name = 'Name is required';
    } else if (!nameRegex.test(reviewForm.name)) {
      errors.name = 'Name should contain only letters and spaces';
    }

    if (!reviewForm.email.trim()) {
      errors.email = 'Email is required';
    } else if (!emailRegex.test(reviewForm.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!reviewForm.comment.trim()) {
      errors.comment = 'Review comment is required';
    } else if (reviewForm.comment.length > 500) {
      errors.comment = 'Review should not exceed 500 characters';
    }

    return errors;
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    const errors = validateReviewForm();
    
    if (Object.keys(errors).length === 0) {
      // Create new review with pending status
      const newReview = {
        id: Date.now(),
        name: reviewForm.name,
        email: reviewForm.email,
        rating: reviewForm.rating,
        comment: reviewForm.comment,
        date: new Date().toISOString().split('T')[0],
        avatar: reviewForm.name.includes(' ') ? reviewForm.name.split(' ')[0][0] + reviewForm.name.split(' ')[1][0] : reviewForm.name[0],
        status: 'pending'
      };

      // Get existing pending reviews and add new one
      const storedPendingReviews = localStorage.getItem('pendingReviews');
      const existingReviews = storedPendingReviews ? JSON.parse(storedPendingReviews) : [];
      const updatedPendingReviews = [...existingReviews, newReview];
      
      // Update localStorage
      localStorage.setItem('pendingReviews', JSON.stringify(updatedPendingReviews));
      
      // Update parent state
      setPendingReviews(updatedPendingReviews);

      // Show success message
      alert('Thank you for your review! It has been submitted for approval and will be visible to our admin team.');

      // Reset form and close modal
      setReviewForm({
        name: '',
        email: '',
        rating: 5,
        comment: ''
      });
      setReviewErrors({});
      setShowReviewModal(false);
    } else {
      setReviewErrors(errors);
    }
  };

  const handleInputChange = (field, value) => {
    setReviewForm(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (reviewErrors[field]) {
      setReviewErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  if (!showReviewModal) return null;

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.reviewModalContent}>
        <div style={styles.modalHeader}>
          <h2 style={styles.modalTitle}>Write a Review</h2>
          <button 
            style={styles.closeButton}
            onClick={() => {
              setShowReviewModal(false);
              setReviewErrors({});
            }}
          >
            ×
          </button>
        </div>
        
        <form onSubmit={handleReviewSubmit} style={styles.reviewForm}>
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Your Name</label>
            <input
              type="text"
              value={reviewForm.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Enter your full name"
              style={{
                ...styles.formInput,
                ...(reviewErrors.name && styles.formInputError)
              }}
              required
            />
            {reviewErrors.name && <span style={styles.errorText}>{reviewErrors.name}</span>}
          </div>

          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Your Email</label>
            <input
              type="email"
              value={reviewForm.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="Enter your email"
              style={{
                ...styles.formInput,
                ...(reviewErrors.email && styles.formInputError)
              }}
              required
            />
            {reviewErrors.email && <span style={styles.errorText}>{reviewErrors.email}</span>}
          </div>

          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Rating</label>
            <div style={styles.ratingSelection}>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  style={{
                    ...styles.starButton,
                    ...(reviewForm.rating >= star ? styles.starButtonActive : {})
                  }}
                  onClick={() => handleInputChange('rating', star)}
                >
                  {star <= reviewForm.rating ? '⭐' : '☆'}
                </button>
              ))}
            </div>
            <div style={styles.ratingText}>
              {reviewForm.rating} {reviewForm.rating === 1 ? 'star' : 'stars'} selected
            </div>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Your Review</label>
            <textarea
              value={reviewForm.comment}
              onChange={(e) => handleInputChange('comment', e.target.value)}
              placeholder="Share your experience with QuickMed..."
              rows="5"
              style={{
                ...styles.formTextarea,
                ...(reviewErrors.comment && styles.formInputError)
              }}
              maxLength={500}
              required
            />
            {reviewErrors.comment && <span style={styles.errorText}>{reviewErrors.comment}</span>}
            <div style={styles.charCount}>
              {reviewForm.comment.length}/500 characters
            </div>
          </div>

          <div style={styles.reviewNote}>
            <p style={styles.noteText}>
              <strong>Note:</strong> Your review will be submitted for approval and will be visible to our admin team. 
              Once approved, it will appear on our website.
            </p>
          </div>

          <button 
            type="submit" 
            style={styles.submitReviewButton}
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
};

const HomePage = ({ onNavigateToAuth, onNavigateToAdmin }) => {
  const [activeSection, setActiveSection] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [contactErrors, setContactErrors] = useState({});
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [pendingReviews, setPendingReviews] = useState([]);

  const [reviews] = useState([
    {
      id: 1,
      name: 'Rahul Sharma',
      rating: 5,
      date: '2024-01-15',
      comment: 'QuickMed saved me during my emergency! The doctor was available within minutes and the medicine delivery was super fast. Highly recommended!',
      avatar: '👨',
      status: 'approved'
    },
    {
      id: 2,
      name: 'Priya Patel',
      rating: 4,
      date: '2024-01-12',
      comment: 'Excellent service! The consultation was smooth and the doctor was very patient. Medicine reached within 30 minutes as promised.',
      avatar: '👩',
      status: 'approved'
    },
    {
      id: 3,
      name: 'Ankit Verma',
      rating: 5,
      date: '2024-01-10',
      comment: 'Best healthcare app I have used. The live tracking feature is amazing and the doctors are very professional.',
      avatar: '👨',
      status: 'approved'
    },
    {
      id: 4,
      name: 'Sneha Reddy',
      rating: 4,
      date: '2024-01-08',
      comment: 'Great platform for busy professionals. Saved me multiple visits to the hospital. The health checkup service is fantastic!',
      avatar: '👩',
      status: 'approved'
    },
    {
      id: 5,
      name: 'Vikram Singh',
      rating: 5,
      date: '2024-01-05',
      comment: '24/7 availability is a lifesaver. Used their emergency service at 2 AM and was connected to a doctor immediately.',
      avatar: '👨',
      status: 'approved'
    },
    {
      id: 6,
      name: 'Neha Gupta',
      rating: 4,
      date: '2024-01-03',
      comment: 'User-friendly interface and quick service. The prescription delivery was accurate and timely. Will use again!',
      avatar: '👩',
      status: 'approved'
    }
  ]);

  // Predefined admin credentials
  const ADMIN_CREDENTIALS = {
    email: 'yerrajagan29@gmail.com',
    password: 'Jagan@123'
  };

  // Updated services data
  const services = [
    { 
      name: 'Medicine Delivery', 
      description: 'Get your prescribed medicines delivered to your doorstep within hours with real-time tracking.', 
      icon: '💊' 
    },
    { 
      name: 'Doctor Consultation', 
      description: 'Connect with certified doctors online for quick consultations and prescriptions.', 
      icon: '👨‍⚕️' 
    },
    { 
      name: 'Live Order Tracking', 
      description: 'Track your medical orders in real-time from dispatch to delivery at your doorstep.', 
      icon: '📍' 
    },
    { 
      name: 'Health Checkups', 
      description: 'Schedule at-home health checkups with certified professionals and digital reports.', 
      icon: '❤️' 
    }
  ];

  const doctors = [
    { 
      name: 'Dr.Brahma Gadikota', 
      specialty: 'General Physician', 
      experience: '10 years', 
      availability: 'Available Today',
      rating: '4.9'
    },
    { 
      name: 'Dr.Maha Lakshmi', 
      specialty: 'Neurologist', 
      experience: '7 years', 
      availability: 'Available Today',
      rating: '4.6'
    },
    { 
      name: 'Dr. Divya V', 
      specialty: 'Cardiologist', 
      experience: '8 years', 
      availability: 'Available Tomorrow',
      rating: '4.8'
    },
    { 
      name: 'Dr. Bhavana Shinagam', 
      specialty: 'Psychologist', 
      experience: '9 years', 
      availability: 'Available Today',
      rating: '4.8'
    },
    { 
      name: 'Dr. Charitha Kasturi', 
      specialty: 'Pediatrician', 
      experience: '8 years', 
      availability: 'Available Today',
      rating: '4.9'
    },
    { 
      name: 'Dr. Sreenivas Tulasi', 
      specialty: 'Dermatologist', 
      experience: '12 years', 
      availability: 'Available Now',
      rating: '4.7'
    }
  ];

  // Updated medical categories with better images and square format
  const medicalCategories = [
    { 
      name: 'Primary Care', 
      image: 'https://www.afterhoursgp.co.za/wp-content/uploads/2023/07/General-Consultation.jpg' 
    },
    { 
      name: 'Eye Care', 
      image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=200&h=200&fit=crop&crop=center' 
    },
    { 
      name: 'Dental Care', 
      image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=200&h=200&fit=crop&crop=center' 
    },
    { 
      name: 'Cardiology', 
      image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=200&h=200&fit=crop&crop=center' 
    }
  ];

  // Medical background image URL
  const medicalBackground = 'https://images.unsplash.com/photo-1551076805-e1869033e561?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80';

  // Function to render star ratings
  const renderStars = (rating) => {
    return '⭐'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  // Function to scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Function to handle section navigation with scroll to top
  const handleSectionChange = (section) => {
    setActiveSection(section);
    scrollToTop();
  };

  // Contact form validation
  const validateContactForm = () => {
    const errors = {};
    const nameRegex = /^[A-Za-z\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!contactForm.name.trim()) {
      errors.name = 'Name is required';
    } else if (!nameRegex.test(contactForm.name)) {
      errors.name = 'Name should contain only letters and spaces';
    }

    if (!contactForm.email.trim()) {
      errors.email = 'Email is required';
    } else if (!emailRegex.test(contactForm.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!contactForm.subject.trim()) {
      errors.subject = 'Subject is required';
    } else if (contactForm.subject.length > 100) {
      errors.subject = 'Subject should not exceed 100 characters';
    }

    if (!contactForm.message.trim()) {
      errors.message = 'Message is required';
    } else if (contactForm.message.length > 500) {
      errors.message = 'Message should not exceed 500 characters';
    }

    return errors;
  };

  // Handle contact form submission
  const handleContactSubmit = (e) => {
    e.preventDefault();
    const errors = validateContactForm();
    
    if (Object.keys(errors).length === 0) {
      // Simulate form submission
      setShowSuccessMessage(true);
      setContactForm({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setContactErrors({});
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setShowSuccessMessage(false);
        handleSectionChange('home');
      }, 3000);
    } else {
      setContactErrors(errors);
    }
  };

  // Handle contact form input changes
  const handleContactInputChange = (field, value) => {
    setContactForm(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (contactErrors[field]) {
      setContactErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  // Handle write review button click
  const handleWriteReview = () => {
    setShowReviewModal(true);
  };
  // Admin Modal Component
  const AdminLoginModal = () => {
    const [adminCredentials, setAdminCredentials] = useState({
      email: '',
      password: ''
    });
    
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    // Set focus only when modal first opens
    useEffect(() => {
      if (emailRef.current) {
        emailRef.current.focus();
      }
    }, []);

    const handleSubmit = (e) => {
      e.preventDefault();
      setLoginError('');
      
      if (adminCredentials.email === ADMIN_CREDENTIALS.email && 
          adminCredentials.password === ADMIN_CREDENTIALS.password) {
        
        const adminUser = {
          id: 1,
          name: 'Admin User',
          email: adminCredentials.email,
          userType: 'admin',
          permissions: ['all'],
          pendingReviewsCount: pendingReviews.length
        };
        
        localStorage.setItem('currentUser', JSON.stringify(adminUser));
        localStorage.setItem('pendingReviewsCount', pendingReviews.length.toString());
        onNavigateToAdmin(adminUser);
        setShowAdminModal(false);
        setAdminCredentials({ email: '', password: '' });
      } else {
        setLoginError('Invalid email or password. Please try again.');
        if (passwordRef.current) {
          passwordRef.current.focus();
        }
      }
    };

    const handleInputChange = (field, value) => {
      setAdminCredentials(prev => ({
        ...prev,
        [field]: value
      }));
      if (loginError) setLoginError('');
    };

    return (
      <div style={styles.modalOverlay}>
        <div style={styles.modalContent}>
          <div style={styles.modalHeader}>
            <h2 style={styles.modalTitle}>Admin Access</h2>
            <button 
              style={styles.closeButton}
              onClick={() => {
                setShowAdminModal(false);
                setLoginError('');
              }}
            >
              ×
            </button>
          </div>
          
          {loginError && (
            <div style={styles.errorMessage}>
              {loginError}
            </div>
          )}
          
          {/* Show pending reviews notification to admin */}
          {pendingReviews.length > 0 && (
            <div style={styles.pendingReviewsNotification}>
              <span style={styles.notificationIcon}>📝</span>
              <div>
                <strong>{pendingReviews.length} review(s) pending approval</strong>
                <p>Access the admin panel to manage reviews</p>
              </div>
            </div>
          )}
          
          <form onSubmit={handleSubmit} style={styles.adminForm}>
            <div style={styles.formGroup}>
              <label style={styles.formLabel}>Admin Email</label>
              <input
                ref={emailRef}
                type="email"
                value={adminCredentials.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="Enter admin email"
                style={styles.formInput}
                required
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.formLabel}>Password</label>
              <input
                ref={passwordRef}
                type="password"
                value={adminCredentials.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                placeholder="Enter admin password"
                style={styles.formInput}
                required
              />
            </div>
            <button 
              type="submit" 
              style={styles.adminLoginButton}
            >
              Access Admin Panel
            </button>
          </form>
          
          <div style={styles.adminNote}>
            <p style={styles.securityText}>
              <strong>Note:</strong> This area is restricted to authorized personnel only. 
              Unauthorized access is prohibited.
            </p>
          </div>
        </div>
      </div>
    );
  };

  // Search functionality
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Simulate search results
      const results = [
        ...services.filter(service => 
          service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          service.description.toLowerCase().includes(searchQuery.toLowerCase())
        ),
        ...doctors.filter(doctor =>
          doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase())
        )
      ];
      setSearchResults(results);
      handleSectionChange('search');
    }
  };

  return (
    <div style={styles.homepage}>
      {/* Admin Login Modal */}
      {showAdminModal && <AdminLoginModal />}

      {/* Review Modal - Now as separate component */}
      <ReviewModal 
        showReviewModal={showReviewModal}
        setShowReviewModal={setShowReviewModal}
        setPendingReviews={setPendingReviews}
      />

      {/* Success Message Modal */}
      {showSuccessMessage && (
        <div style={styles.successModalOverlay}>
          <div style={styles.successModalContent}>
            <div style={styles.successIcon}>✓</div>
            <h3 style={styles.successTitle}>Message Sent Successfully!</h3>
            <p style={styles.successText}>Thank you for contacting us. We'll get back to you soon.</p>
            <button 
              style={styles.successButton}
              onClick={() => setShowSuccessMessage(false)}
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <header style={styles.header}>
        <div style={styles.logo}>
          <h1 style={styles.logoText}>QUICKMED</h1>
          <p style={styles.tagline}>Quick Care Smarter Health</p>
        </div>
        <nav style={styles.nav}>
          <button 
            style={activeSection === 'home' ? {...styles.navButton, ...styles.activeNavButton} : styles.navButton}
            onClick={() => handleSectionChange('home')}
          >
            Home
          </button>
          <button 
            style={activeSection === 'about' ? {...styles.navButton, ...styles.activeNavButton} : styles.navButton}
            onClick={() => handleSectionChange('about')}
          >
            About Us
          </button>
          <button 
            style={activeSection === 'services' ? {...styles.navButton, ...styles.activeNavButton} : styles.navButton}
            onClick={() => handleSectionChange('services')}
          >
            Services
          </button>
          <button 
            style={activeSection === 'doctors' ? {...styles.navButton, ...styles.activeNavButton} : styles.navButton}
            onClick={() => handleSectionChange('doctors')}
          >
            Doctors
          </button>
          <button 
            style={activeSection === 'reviews' ? {...styles.navButton, ...styles.activeNavButton} : styles.navButton}
            onClick={() => handleSectionChange('reviews')}
          >
            Reviews
          </button>
          <button 
            style={activeSection === 'contact' ? {...styles.navButton, ...styles.activeNavButton} : styles.navButton}
            onClick={() => handleSectionChange('contact')}
          >
            Contact
          </button>
          <div style={styles.authButtons}>
            <button 
              style={styles.loginButton}
              onClick={onNavigateToAuth}
            >
              Login
            </button>
            {/* Admin Access Button */}
            <button 
              style={styles.adminAccessButton}
              onClick={() => setShowAdminModal(true)}
            >
              🔧 Admin
            </button>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main style={styles.main}>
        {/* Hero Section */}
        {activeSection === 'home' && (
          <section style={{
            ...styles.hero,
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.90)), url(${medicalBackground})`
          }}>
            <div style={styles.heroContent}>
              <h2 style={styles.heroTitle}>Your Health Is Our Priority</h2>
              <p style={styles.heroText}>
                Experience the future of healthcare with QuickMed. We deliver medicines, connect you with doctors, 
                and provide real-time tracking - all from the comfort of your home. Your well-being is just a click away.
              </p>
              
              {/* Emergency Section */}
              <div style={styles.emergencySection}>
                <div style={styles.emergencyCard}>
                  <span style={styles.emergencyIcon}>🚨</span>
                  <div>
                    <h3 style={styles.emergencyTitle}>Emergency Services</h3>
                    <p style={styles.emergencyText}>24/7 emergency consultation available</p>
                  </div>
                  <button style={styles.emergencyButton}>
                    Call Now
                  </button>
                </div>
              </div>

              {/* Search Section */}
              <div style={styles.searchSection}>
                <h3 style={styles.searchTitle}>Find Medical Services & Products</h3>
                <form onSubmit={handleSearch} style={styles.searchForm}>
                  <input
                    type="text"
                    placeholder="Search medicines, doctors, services..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={styles.searchInput}
                  />
                  <button 
                    type="submit" 
                    style={styles.searchButton}
                  >
                    Search
                  </button>
                </form>
              </div>

              {/* Medical Categories */}
              <div style={styles.categoriesSection}>
                <h3 style={styles.categoriesTitle}>Quick Access Categories</h3>
                <div style={styles.categoriesGrid}>
                  {medicalCategories.map((category, index) => (
                    <div 
                      key={index} 
                      style={styles.categoryCard}
                    >
                      <div 
                        style={{
                          ...styles.categoryImage,
                          backgroundImage: `url(${category.image})`
                        }}
                      ></div>
                      <span style={styles.categoryName}>{category.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Featured Services */}
              <div style={styles.featuredSection}>
                <h3 style={styles.featuredTitle}>Why Choose QuickMed?</h3>
                <div style={styles.featuredGrid}>
                  <div style={styles.featureItem}>
                    <span style={styles.featureIcon}>⚡</span>
                    <h4>Instant Access</h4>
                    <p>Connect with doctors in under 5 minutes</p>
                  </div>
                  <div style={styles.featureItem}>
                    <span style={styles.featureIcon}>🛡️</span>
                    <h4>Safe & Secure</h4>
                    <p>HIPAA compliant platform for your privacy</p>
                  </div>
                  <div style={styles.featureItem}>
                    <span style={styles.featureIcon}>💳</span>
                    <h4>Easy Payments</h4>
                    <p>Multiple secure payment options</p>
                  </div>
                  <div style={styles.featureItem}>
                    <span style={styles.featureIcon}>🏠</span>
                    <h4>Home Delivery</h4>
                    <p>Free delivery on orders above ₹499</p>
                  </div>
                </div>
              </div>

              {/* Stats Section */}
              <div style={styles.statsSection}>
                <div style={styles.statItem}>
                  <h3 style={styles.statNumber}>10,000+</h3>
                  <p style={styles.statLabel}>Medicines Delivered</p>
                </div>
                <div style={styles.statItem}>
                  <h3 style={styles.statNumber}>500+</h3>
                  <p style={styles.statLabel}>Certified Doctors</p>
                </div>
                <div style={styles.statItem}>
                  <h3 style={styles.statNumber}>24/7</h3>
                  <p style={styles.statLabel}>Service Available</p>
                </div>
                <div style={styles.statItem}>
                  <h3 style={styles.statNumber}>30 min</h3>
                  <p style={styles.statLabel}>Average Delivery</p>
                </div>
              </div>

              {/* Testimonials */}
              <div style={styles.testimonialsSection}>
                <h3 style={styles.testimonialsTitle}>What Our Patients Say</h3>
                <div style={styles.testimonialsGrid}>
                  <div style={styles.testimonialCard}>
                    <p style={styles.testimonialText}>"QuickMed saved me during my emergency. The doctor was available within minutes!"</p>
                    <div style={styles.testimonialAuthor}>
                      <strong>Rahul Sharma</strong>
                      <span>⭐ 4.9</span>
                    </div>
                  </div>
                  <div style={styles.testimonialCard}>
                    <p style={styles.testimonialText}>"Medicine delivery is super fast. Never had to wait for more than 30 minutes."</p>
                    <div style={styles.testimonialAuthor}>
                      <strong>Priya Patel</strong>
                      <span>⭐ 4.8</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Search Results Section */}
        {activeSection === 'search' && (
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>Search Results for "{searchQuery}"</h2>
            {searchResults.length > 0 ? (
              <div style={styles.searchResults}>
                {searchResults.map((result, index) => (
                  <div 
                    key={index} 
                    style={styles.searchResultCard}
                  >
                    <h3 style={styles.searchResultTitle}>
                      {result.name || result.specialty}
                    </h3>
                    <p style={styles.searchResultDescription}>
                      {result.description || `Experience: ${result.experience}`}
                    </p>
                    {result.rating && (
                      <div style={styles.rating}>⭐ {result.rating}</div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p style={styles.noResults}>No results found for "{searchQuery}"</p>
            )}
          </section>
        )}

        {/* About Us Section */}
        {activeSection === 'about' && (
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>About QuickMed</h2>
            <div style={styles.aboutContent}>
              <div style={styles.aboutText}>
                <p style={styles.paragraph}>
                  QuickMed is revolutionizing healthcare delivery by bringing medical services and products 
                  right to your doorstep. Founded with the vision to make healthcare accessible to everyone, 
                  we understand that when you're unwell, the last thing you want to do is wait in long queues 
                  or travel to distant medical stores.
                </p>
                <p style={styles.paragraph}>
                  Our team of dedicated professionals works round the clock to ensure that your medical needs 
                  are met promptly and efficiently. We partner with certified pharmacies, experienced doctors, 
                  and reliable diagnostic centers to provide a comprehensive healthcare ecosystem.
                </p>
                <div style={styles.featureGrid}>
                  <div style={styles.featureItem}>
                    <span style={styles.featureIcon}>🚚</span>
                    <h4>Fast Delivery</h4>
                    <p>Medicines delivered within 30 minutes</p>
                  </div>
                  <div style={styles.featureItem}>
                    <span style={styles.featureIcon}>📱</span>
                    <h4>Live Tracking</h4>
                    <p>Real-time order tracking</p>
                  </div>
                  <div style={styles.featureItem}>
                    <span style={styles.featureIcon}>👨‍⚕️</span>
                    <h4>Expert Doctors</h4>
                    <p>24/7 doctor consultations</p>
                  </div>
                  <div style={styles.featureItem}>
                    <span style={styles.featureIcon}>💳</span>
                    <h4>Easy Payments</h4>
                    <p>Secure online transactions</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Services Section */}
        {activeSection === 'services' && (
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>Our Healthcare Services</h2>
            <p style={styles.sectionSubtitle}>Comprehensive medical solutions delivered to your doorstep</p>
            <div style={styles.servicesGrid}>
              {services.map((service, index) => (
                <div 
                  key={index} 
                  style={styles.serviceCard}
                >
                  <div style={styles.serviceIconContainer}>
                    <span style={styles.serviceIcon}>{service.icon}</span>
                  </div>
                  <h3 style={styles.serviceName}>{service.name}</h3>
                  <p style={styles.serviceDescription}>{service.description}</p>
                  <button style={styles.learnMoreButton}>
                    Learn More →
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Doctors Section */}
        {activeSection === 'doctors' && (
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>Our Medical Experts</h2>
            <p style={styles.sectionSubtitle}>Connect with certified healthcare professionals</p>
            <div style={styles.doctorsGrid}>
              {doctors.map((doctor, index) => (
                <div 
                  key={index} 
                  style={styles.doctorCard}
                >
                  <div style={styles.doctorImage}>
                    <span style={styles.doctorInitial}>{doctor.name.split(' ')[1][0]}</span>
                  </div>
                  <div style={styles.ratingBadge}>
                    ⭐ {doctor.rating}
                  </div>
                  <h3 style={styles.doctorName}>{doctor.name}</h3>
                  <p style={styles.doctorSpecialty}>{doctor.specialty}</p>
                  <p style={styles.doctorExperience}>Experience: {doctor.experience}</p>
                  <div style={{
                    ...styles.availabilityBadge,
                    backgroundColor: doctor.availability === 'Available Now' ? '#4CAF50' : 
                                   doctor.availability === 'Available Today' ? '#FF9800' : '#7C2A62'
                  }}>
                    {doctor.availability}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Reviews Section */}
        {activeSection === 'reviews' && (
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>Patient Reviews</h2>
            <p style={styles.sectionSubtitle}>See what our patients say about their experience with QuickMed</p>
            
            {/* Overall Rating Summary */}
            <div style={styles.ratingSummary}>
              <div style={styles.overallRating}>
                <h3 style={styles.overallScore}>4.8</h3>
                <div style={styles.starsLarge}>{renderStars(5)}</div>
                <p style={styles.ratingCount}>Based on 1,234 reviews</p>
              </div>
              <div style={styles.ratingBreakdown}>
                <div style={styles.ratingBar}>
                  <span>5 stars</span>
                  <div style={styles.barContainer}>
                    <div style={styles.barFill5}></div>
                  </div>
                  <span>68%</span>
                </div>
                <div style={styles.ratingBar}>
                  <span>4 stars</span>
                  <div style={styles.barContainer}>
                    <div style={styles.barFill4}></div>
                  </div>
                  <span>24%</span>
                </div>
                <div style={styles.ratingBar}>
                  <span>3 stars</span>
                  <div style={styles.barContainer}>
                    <div style={styles.barFill3}></div>
                  </div>
                  <span>6%</span>
                </div>
                <div style={styles.ratingBar}>
                  <span>2 stars</span>
                  <div style={styles.barContainer}>
                    <div style={styles.barFill2}></div>
                  </div>
                  <span>2%</span>
                </div>
                <div style={styles.ratingBar}>
                  <span>1 star</span>
                  <div style={styles.barContainer}>
                    <div style={styles.barFill1}></div>
                  </div>
                  <span>0%</span>
                </div>
              </div>
            </div>

            {/* Reviews Grid */}
            <div style={styles.reviewsGrid}>
              {reviews.map((review) => (
                <div 
                  key={review.id} 
                  style={styles.reviewCard}
                >
                  <div style={styles.reviewHeader}>
                    <div style={styles.reviewerInfo}>
                      <span style={styles.avatar}>{review.avatar}</span>
                      <div>
                        <h4 style={styles.reviewerName}>{review.name}</h4>
                        <div style={styles.reviewStars}>
                          {renderStars(review.rating)}
                        </div>
                      </div>
                    </div>
                    <span style={styles.reviewDate}>{review.date}</span>
                  </div>
                  <p style={styles.reviewComment}>{review.comment}</p>
                </div>
              ))}
            </div>

            {/* Add Review CTA */}
            <div style={styles.addReviewSection}>
              <h3 style={styles.addReviewTitle}>Share Your Experience</h3>
              <p style={styles.addReviewText}>Help others make informed decisions about their healthcare</p>
              <button 
                style={styles.addReviewButton}
                onClick={handleWriteReview}
              >
                Write a Review
              </button>
            </div>
          </section>
        )}

        {/* Contact Section */}
        {activeSection === 'contact' && (
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>Contact Us</h2>
            <p style={styles.sectionSubtitle}>We're here to help with your healthcare needs</p>
            <div style={styles.contactContent}>
              <div style={styles.contactInfo}>
                <h3 style={styles.contactSubtitle}>Get in Touch</h3>
                <div style={styles.contactItem}>
                  <span style={styles.contactIcon}>📧</span>
                  <div>
                    <strong>Email:</strong><br />
                    support@quickmed.com
                  </div>
                </div>
                <div style={styles.contactItem}>
                  <span style={styles.contactIcon}>📞</span>
                  <div>
                    <strong>Phone:</strong><br />
                    9392416962
                  </div>
                </div>
                <div style={styles.contactItem}>
                  <span style={styles.contactIcon}>🏥</span>
                  <div>
                    <strong>Address:</strong><br />
                    123 Healthcare Ave, Medical District, City
                  </div>
                </div>
                <div style={styles.contactItem}>
                  <span style={styles.contactIcon}>🚨</span>
                  <div>
                    <strong>Emergency:</strong><br />
                    Available 24/7
                  </div>
                </div>
              </div>
              <form style={styles.contactForm} onSubmit={handleContactSubmit}>
                <div style={styles.formGroup}>
                  <input 
                    type="text" 
                    placeholder="Your Name" 
                    style={{
                      ...styles.formInput,
                      ...(contactErrors.name && styles.formInputError)
                    }}
                    value={contactForm.name}
                    onChange={(e) => handleContactInputChange('name', e.target.value)}
                  />
                  {contactErrors.name && <span style={styles.errorText}>{contactErrors.name}</span>}
                </div>
                
                <div style={styles.formGroup}>
                  <input 
                    type="email" 
                    placeholder="Your Email" 
                    style={{
                      ...styles.formInput,
                      ...(contactErrors.email && styles.formInputError)
                    }}
                    value={contactForm.email}
                    onChange={(e) => handleContactInputChange('email', e.target.value)}
                  />
                  {contactErrors.email && <span style={styles.errorText}>{contactErrors.email}</span>}
                </div>
                
                <div style={styles.formGroup}>
                  <input 
                    type="text" 
                    placeholder="Subject" 
                    style={{
                      ...styles.formInput,
                      ...(contactErrors.subject && styles.formInputError)
                    }}
                    value={contactForm.subject}
                    onChange={(e) => handleContactInputChange('subject', e.target.value)}
                    maxLength={100}
                  />
                  {contactErrors.subject && <span style={styles.errorText}>{contactErrors.subject}</span>}
                  <div style={styles.charCount}>
                    {contactForm.subject.length}/100 characters
                  </div>
                </div>
                
                <div style={styles.formGroup}>
                  <textarea 
                    placeholder="Your Message" 
                    rows="5" 
                    style={{
                      ...styles.formTextarea,
                      ...(contactErrors.message && styles.formInputError)
                    }}
                    value={contactForm.message}
                    onChange={(e) => handleContactInputChange('message', e.target.value)}
                    maxLength={500}
                  />
                  {contactErrors.message && <span style={styles.errorText}>{contactErrors.message}</span>}
                  <div style={styles.charCount}>
                    {contactForm.message.length}/500 characters
                  </div>
                </div>
                
                <button type="submit" style={styles.submitButton}>
                  Send Message
                </button>
              </form>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <div style={styles.footerSection}>
            <h3 style={styles.footerTitle}>QUICKMED</h3>
            <p style={styles.footerText}>Delivering healthcare to your doorstep with speed and care.</p>
            <div style={styles.socialLinks}>
              <span style={styles.socialIcon}>📘</span>
              <span style={styles.socialIcon}>📷</span>
              <span style={styles.socialIcon}>🐦</span>
              <span style={styles.socialIcon}>💼</span>
            </div>
          </div>
          <div style={styles.footerSection}>
            <h4 style={styles.footerSubtitle}>Quick Links</h4>
            <button 
              style={activeSection === 'home' ? {...styles.footerLink, ...styles.activeFooterLink} : styles.footerLink} 
              onClick={() => handleSectionChange('home')}
            >Home</button>
            <button 
              style={activeSection === 'about' ? {...styles.footerLink, ...styles.activeFooterLink} : styles.footerLink} 
              onClick={() => handleSectionChange('about')}
            >About</button>
            <button 
              style={activeSection === 'services' ? {...styles.footerLink, ...styles.activeFooterLink} : styles.footerLink} 
              onClick={() => handleSectionChange('services')}
            >Services</button>
            <button 
              style={activeSection === 'doctors' ? {...styles.footerLink, ...styles.activeFooterLink} : styles.footerLink} 
              onClick={() => handleSectionChange('doctors')}
            >Doctors</button>
            <button 
              style={activeSection === 'reviews' ? {...styles.footerLink, ...styles.activeFooterLink} : styles.footerLink} 
              onClick={() => handleSectionChange('reviews')}
            >Reviews</button>
            <button 
              style={activeSection === 'contact' ? {...styles.footerLink, ...styles.activeFooterLink} : styles.footerLink} 
              onClick={() => handleSectionChange('contact')}
            >Contact</button>
          </div>
          <div style={styles.footerSection}>
            <h4 style={styles.footerSubtitle}>Contact Info</h4>
            <p style={styles.footerText}>📧 support@quickmed.com</p>
            <p style={styles.footerText}>📞 9392416962</p>
            <p style={styles.footerText}>🏥 24/7 Emergency Service</p>
          </div>
        </div>
        <div style={styles.footerBottom}>
          <p style={styles.copyright}>&copy; 2025 QuickMed. All rights reserved. | Healthcare Revolutionized</p>
        </div>
      </footer>
    </div>
  );
};

// ... (Keep all the same styles object from previous code)
const styles = {
  // ... (All the same styles as in the previous code)
  homepage: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    backgroundColor: '#F7D9EB',
    boxShadow: '0 4px 20px rgba(124, 42, 98, 0.3)',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  },
  // ... (Include all other styles exactly as they were in the previous code)
  // Make sure to include all the styles for modalOverlay, reviewModalContent, formInput, formTextarea, etc.

  logo: {
    flex: 1,
  },
  logoText: {
    margin: 0,
    color: '#000000',
    fontSize: '2.2rem',
    fontWeight: 'bold',
    background: 'linear-gradient(45deg, #7C2A62, #5a1a4a)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  tagline: {
    margin: 0,
    color: '#000000',
    fontSize: '0.9rem',
    fontWeight: '500',
  },
  nav: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',
  },
  navButton: {
    padding: '0.75rem 1.5rem',
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    fontSize: '1rem',
    borderRadius: '25px',
    transition: 'all 0.3s ease',
    fontWeight: '600',
    color: '#000000',
  },
  activeNavButton: {
    backgroundColor: '#7C2A62',
    color: '#ffffff',
    boxShadow: '0 4px 15px rgba(124, 42, 98, 0.5)',
  },
  authButtons: {
    display: 'flex',
    gap: '1rem',
    marginLeft: '1rem',
  },
  loginButton: {
    padding: '0.75rem 1.5rem',
    border: '2px solid #7C2A62',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    borderRadius: '25px',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    color: '#7C2A62',
  },
  adminAccessButton: {
    padding: '0.75rem 1.5rem',
    border: 'none',
    backgroundColor: '#7C2A62',
    color: 'white',
    cursor: 'pointer',
    borderRadius: '25px',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(124, 42, 98, 0.3)',
  },
  // Modal Styles
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2000,
    padding: '20px',
  },
  modalContent: {
    background: 'white',
    borderRadius: '20px',
    padding: '2rem',
    maxWidth: '400px',
    width: '100%',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
  },
  reviewModalContent: {
    background: 'white',
    borderRadius: '20px',
    padding: '2rem',
    maxWidth: '500px',
    width: '100%',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
    maxHeight: '90vh',
    overflowY: 'auto',
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
  },
  modalTitle: {
    margin: 0,
    color: '#7C2A62',
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
  closeButton: {
    background: 'none',
    border: 'none',
    fontSize: '2rem',
    cursor: 'pointer',
    color: '#7C2A62',
    padding: 0,
    width: '30px',
    height: '30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorMessage: {
    backgroundColor: '#ffebee',
    color: '#d32f2f',
    padding: '12px',
    borderRadius: '8px',
    marginBottom: '1rem',
    textAlign: 'center',
    fontWeight: '500',
  },
  pendingReviewsNotification: {
    backgroundColor: '#FFF3CD',
    border: '1px solid #FFEAA7',
    color: '#856404',
    padding: '12px',
    borderRadius: '8px',
    marginBottom: '1rem',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  notificationIcon: {
    fontSize: '1.5rem',
  },
  // Review Form Styles
  reviewForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  ratingSelection: {
    display: 'flex',
    gap: '0.5rem',
    justifyContent: 'center',
    marginBottom: '0.5rem',
  },
  starButton: {
    background: 'none',
    border: 'none',
    fontSize: '2rem',
    cursor: 'pointer',
    padding: '0.5rem',
    borderRadius: '50%',
    transition: 'all 0.3s ease',
  },
  starButtonActive: {
    transform: 'scale(1.2)',
  },
  ratingText: {
    textAlign: 'center',
    color: '#7C2A62',
    fontWeight: 'bold',
    fontSize: '1rem',
  },
  reviewNote: {
    backgroundColor: '#F7D9EB',
    padding: '1rem',
    borderRadius: '10px',
    border: '1px solid #7C2A62',
  },
  noteText: {
    margin: 0,
    color: '#7C2A62',
    fontSize: '0.9rem',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  submitReviewButton: {
    padding: '12px 2rem',
    backgroundColor: '#7C2A62',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    transition: 'all 0.3s ease',
    marginTop: '1rem',
  },
  adminForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  formLabel: {
    marginBottom: '0.5rem',
    color: '#333',
    fontWeight: '600',
  },
  formInput: {
    padding: '12px 15px',
    border: '2px solid #e1e1e1',
    borderRadius: '10px',
    fontSize: '1rem',
    transition: 'border-color 0.3s ease',
    outline: 'none',
  },
  formInputError: {
    borderColor: '#d32f2f',
    backgroundColor: '#ffebee',
  },
  formTextarea: {
    padding: '12px 15px',
    border: '2px solid #e1e1e1',
    borderRadius: '10px',
    fontSize: '1rem',
    transition: 'border-color 0.3s ease',
    outline: 'none',
    resize: 'vertical',
    minHeight: '120px',
    fontFamily: 'inherit',
  },
  errorText: {
    color: '#d32f2f',
    fontSize: '0.8rem',
    marginTop: '0.3rem',
  },
  charCount: {
    fontSize: '0.8rem',
    color: '#666',
    textAlign: 'right',
    marginTop: '0.3rem',
  },
  adminLoginButton: {
    padding: '12px 2rem',
    backgroundColor: '#7C2A62',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    transition: 'all 0.3s ease',
    marginTop: '1rem',
  },
  adminNote: {
    marginTop: '2rem',
    padding: '1rem',
    backgroundColor: '#F7D9EB',
    borderRadius: '10px',
    border: '1px solid #7C2A62',
  },
  securityText: {
    margin: 0,
    color: '#7C2A62',
    fontSize: '0.8rem',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  // Success Message Modal
  successModalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2000,
    padding: '20px',
  },
  successModalContent: {
    background: 'white',
    borderRadius: '20px',
    padding: '3rem',
    maxWidth: '400px',
    width: '100%',
    textAlign: 'center',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
  },
  successIcon: {
    fontSize: '4rem',
    color: '#4CAF50',
    marginBottom: '1rem',
  },
  successTitle: {
    margin: '0 0 1rem 0',
    color: '#7C2A62',
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
  successText: {
    margin: '0 0 2rem 0',
    color: '#333',
    fontSize: '1rem',
  },
  successButton: {
    padding: '12px 2rem',
    backgroundColor: '#7C2A62',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    transition: 'all 0.3s ease',
  },
  main: {
    flex: 1,
  },
  hero: {
    padding: '4rem 2rem',
    minHeight: '90vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    position: 'relative',
  },
  heroContent: {
    maxWidth: '1200px',
    textAlign: 'center',
    position: 'relative',
    zIndex: 2,
  },
  heroTitle: {
    fontSize: '3.5rem',
    marginBottom: '1.5rem',
    color: '#000000',
    fontWeight: '700',
    textShadow: '2px 2px 4px rgba(255,255,255,0.8)',
  },
  heroText: {
    fontSize: '1.3rem',
    lineHeight: '1.8',
    marginBottom: '3rem',
    color: '#000000',
    fontWeight: '400',
    textShadow: '1px 1px 2px rgba(255,255,255,0.8)',
    maxWidth: '800px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  emergencySection: {
    marginBottom: '3rem',
  },
  emergencyCard: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(124, 42, 98, 0.1)',
    border: '2px solid #7C2A62',
    borderRadius: '15px',
    padding: '1.5rem 2rem',
    maxWidth: '500px',
    margin: '0 auto',
    backdropFilter: 'blur(10px)',
  },
  emergencyIcon: {
    fontSize: '2.5rem',
    color: '#7C2A62',
  },
  emergencyTitle: {
    margin: '0 0 0.5rem 0',
    color: '#000000',
    fontSize: '1.3rem',
  },
  emergencyText: {
    margin: 0,
    color: '#000000',
  },
  emergencyButton: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#7C2A62',
    color: 'white',
    border: 'none',
    borderRadius: '25px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'all 0.3s ease',
  },
  searchSection: {
    marginBottom: '4rem',
  },
  searchTitle: {
    fontSize: '1.8rem',
    marginBottom: '2rem',
    color: '#000000',
    fontWeight: '600',
    textShadow: '1px 1px 2px rgba(255,255,255,0.8)',
  },
  searchForm: {
    display: 'flex',
    maxWidth: '600px',
    margin: '0 auto',
    boxShadow: '0 8px 30px rgba(124, 42, 98, 0.15)',
    borderRadius: '50px',
    overflow: 'hidden',
    background: 'white',
  },
  searchInput: {
    flex: 1,
    padding: '1.2rem 2rem',
    border: 'none',
    fontSize: '1.1rem',
    outline: 'none',
    background: 'transparent',
    color: '#000000',
  },
  searchButton: {
    padding: '1.2rem 2.5rem',
    backgroundColor: '#7C2A62',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    color: 'white',
    transition: 'all 0.3s ease',
  },
  searchResults: {
    display: 'grid',
    gap: '1.5rem',
    marginTop: '2rem',
  },
  searchResultCard: {
    padding: '2rem',
    backgroundColor: 'white',
    borderRadius: '15px',
    boxShadow: '0 4px 15px rgba(124, 42, 98, 0.1)',
    borderLeft: '4px solid #7C2A62',
    transition: 'all 0.3s ease',
  },
  searchResultTitle: {
    margin: '0 0 1rem 0',
    color: '#000000',
    fontSize: '1.3rem',
  },
  searchResultDescription: {
    margin: '0 0 1rem 0',
    color: '#000000',
  },
  rating: {
    display: 'inline-block',
    backgroundColor: '#FFD700',
    color: '#000000',
    padding: '0.3rem 0.8rem',
    borderRadius: '12px',
    fontSize: '0.9rem',
    fontWeight: 'bold',
  },
  noResults: {
    textAlign: 'center',
    color: '#000000',
    fontSize: '1.2rem',
    marginTop: '2rem',
  },
  categoriesSection: {
    marginTop: '3rem',
  },
  categoriesTitle: {
    fontSize: '2rem',
    marginBottom: '2rem',
    color: '#000000',
    fontWeight: '600',
    textShadow: '1px 1px 2px rgba(255,255,255,0.8)',
  },
  categoriesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '2rem',
    maxWidth: '900px',
    margin: '0 auto',
  },
  categoryCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '2rem 1rem',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '20px',
    boxShadow: '0 8px 25px rgba(124, 42, 98, 0.15)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    border: '2px solid transparent',
    backdropFilter: 'blur(10px)',
  },
  categoryImage: {
    width: '120px',
    height: '120px',
    borderRadius: '15px',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    marginBottom: '1.5rem',
    border: '3px solid #7C2A62',
    boxShadow: '0 4px 15px rgba(124, 42, 98, 0.3)',
  },
  categoryName: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
  },
  featuredSection: {
    marginTop: '4rem',
  },
  featuredTitle: {
    fontSize: '2rem',
    marginBottom: '2rem',
    color: '#000000',
    fontWeight: '600',
    textShadow: '1px 1px 2px rgba(255,255,255,0.8)',
  },
  featuredGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '2rem',
    maxWidth: '1000px',
    margin: '0 auto',
  },
  featureItem: {
    textAlign: 'center',
    padding: '2rem 1.5rem',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: '15px',
    boxShadow: '0 5px 20px rgba(124, 42, 98, 0.1)',
    transition: 'all 0.3s ease',
    backdropFilter: 'blur(10px)',
  },
  featureIcon: {
    fontSize: '2.5rem',
    marginBottom: '1rem',
    color: '#7C2A62',
  },
  statsSection: {
    display: 'flex',
    justifyContent: 'center',
    gap: '3rem',
    marginTop: '4rem',
    flexWrap: 'wrap',
  },
  statItem: {
    textAlign: 'center',
    padding: '1.5rem',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: '15px',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 5px 15px rgba(124, 42, 98, 0.1)',
  },
  statNumber: {
    fontSize: '2.5rem',
    margin: '0 0 0.5rem',
    color: '#7C2A62',
    fontWeight: 'bold',
  },
  statLabel: {
    margin: 0,
    color: '#000000',
    fontWeight: '500',
  },
  testimonialsSection: {
    marginTop: '4rem',
  },
  testimonialsTitle: {
    fontSize: '2rem',
    marginBottom: '2rem',
    color: '#000000',
    fontWeight: '600',
    textShadow: '1px 1px 2px rgba(255,255,255,0.8)',
  },
  testimonialsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
    maxWidth: '800px',
    margin: '0 auto',
  },
  testimonialCard: {
    padding: '2rem',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: '15px',
    boxShadow: '0 5px 20px rgba(124, 42, 98, 0.1)',
    backdropFilter: 'blur(10px)',
  },
  testimonialText: {
    fontSize: '1.1rem',
    fontStyle: 'italic',
    color: '#000000',
    marginBottom: '1.5rem',
    lineHeight: '1.6',
  },
  testimonialAuthor: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  section: {
    padding: '5rem 2rem',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  sectionTitle: {
    fontSize: '3rem',
    marginBottom: '1rem',
    textAlign: 'center',
    color: '#000000',
    fontWeight: '700',
  },
  sectionSubtitle: {
    fontSize: '1.2rem',
    textAlign: 'center',
    color: '#000000',
    marginBottom: '3rem',
    fontWeight: '400',
  },
  aboutContent: {
    lineHeight: '1.8',
  },
  paragraph: {
    marginBottom: '2rem',
    fontSize: '1.2rem',
    color: '#000000',
    textAlign: 'center',
  },
  featureGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '2rem',
    marginTop: '3rem',
  },
  servicesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2.5rem',
  },
  serviceCard: {
    padding: '3rem 2rem',
    backgroundColor: 'white',
    borderRadius: '20px',
    boxShadow: '0 8px 25px rgba(124, 42, 98, 0.1)',
    textAlign: 'center',
    transition: 'all 0.3s ease',
    border: '2px solid #f8f9fa',
  },
  serviceIconContainer: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    backgroundColor: '#F7D9EB',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 2rem',
    fontSize: '2.5rem',
  },
  serviceName: {
    fontSize: '1.8rem',
    marginBottom: '1.5rem',
    color: '#000000',
    fontWeight: '600',
  },
  serviceDescription: {
    marginBottom: '2rem',
    color: '#000000',
    lineHeight: '1.6',
    fontSize: '1.1rem',
  },
  learnMoreButton: {
    padding: '1rem 2rem',
    backgroundColor: '#7C2A62',
    border: 'none',
    borderRadius: '25px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 'bold',
    color: 'white',
    transition: 'all 0.3s ease',
  },
  doctorsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '2.5rem',
  },
  doctorCard: {
    padding: '2.5rem',
    backgroundColor: 'white',
    borderRadius: '20px',
    boxShadow: '0 6px 20px rgba(124, 42, 98, 0.1)',
    textAlign: 'center',
    transition: 'all 0.3s ease',
    position: 'relative',
    border: '2px solid #f8f9fa',
  },
  doctorImage: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    backgroundColor: '#F7D9EB',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 1.5rem',
    border: '4px solid #7C2A62',
  },
  doctorInitial: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#000000',
  },
  ratingBadge: {
    position: 'absolute',
    top: '2rem',
    right: '2rem',
    backgroundColor: '#FFD700',
    color: '#000000',
    padding: '0.5rem 1rem',
    borderRadius: '15px',
    fontSize: '0.9rem',
    fontWeight: 'bold',
  },
  doctorName: {
    fontSize: '1.5rem',
    marginBottom: '0.5rem',
    color: '#000000',
    fontWeight: '600',
  },
  doctorSpecialty: {
    fontSize: '1.2rem',
    marginBottom: '0.5rem',
    color: '#7C2A62',
    fontWeight: '500',
  },
  doctorExperience: {
    marginBottom: '1.5rem',
    color: '#000000',
  },
  availabilityBadge: {
    display: 'inline-block',
    padding: '0.5rem 1.5rem',
    borderRadius: '20px',
    fontSize: '0.9rem',
    marginBottom: '2rem',
    fontWeight: '600',
    color: 'white',
  },
  // Reviews Section Styles
  ratingSummary: {
    display: 'grid',
    gridTemplateColumns: '1fr 2fr',
    gap: '3rem',
    marginBottom: '4rem',
    padding: '3rem',
    backgroundColor: 'white',
    borderRadius: '20px',
    boxShadow: '0 8px 25px rgba(124, 42, 98, 0.1)',
  },
  overallRating: {
    textAlign: 'center',
    padding: '2rem',
  },
  overallScore: {
    fontSize: '4rem',
    fontWeight: 'bold',
    color: '#7C2A62',
    margin: '0 0 1rem 0',
  },
  starsLarge: {
    fontSize: '2rem',
    marginBottom: '1rem',
  },
  ratingCount: {
    color: '#000000',
    fontSize: '1.1rem',
  },
  ratingBreakdown: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  ratingBar: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  barContainer: {
    flex: 1,
    height: '8px',
    backgroundColor: '#e8e8e8',
    borderRadius: '4px',
    overflow: 'hidden',
  },
  barFill5: {
    height: '100%',
    width: '68%',
    backgroundColor: '#7C2A62',
  },
  barFill4: {
    height: '100%',
    width: '24%',
    backgroundColor: '#7C2A62',
  },
  barFill3: {
    height: '100%',
    width: '6%',
    backgroundColor: '#7C2A62',
  },
  barFill2: {
    height: '100%',
    width: '2%',
    backgroundColor: '#7C2A62',
  },
  barFill1: {
    height: '100%',
    width: '0%',
    backgroundColor: '#7C2A62',
  },
  reviewsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '2rem',
    marginBottom: '4rem',
  },
  reviewCard: {
    padding: '2rem',
    backgroundColor: 'white',
    borderRadius: '15px',
    boxShadow: '0 6px 20px rgba(124, 42, 98, 0.1)',
    transition: 'all 0.3s ease',
  },
  reviewHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '1.5rem',
  },
  reviewerInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  avatar: {
    fontSize: '2.5rem',
  },
  reviewerName: {
    margin: '0 0 0.5rem 0',
    color: '#000000',
    fontSize: '1.2rem',
  },
  reviewStars: {
    fontSize: '1rem',
  },
  reviewDate: {
    color: '#000000',
    fontSize: '0.9rem',
  },
  reviewComment: {
    color: '#000000',
    lineHeight: '1.6',
    fontSize: '1rem',
    margin: 0,
  },
  addReviewSection: {
    textAlign: 'center',
    padding: '3rem',
    backgroundColor: 'white',
    borderRadius: '20px',
    boxShadow: '0 8px 25px rgba(124, 42, 98, 0.1)',
  },
  addReviewTitle: {
    fontSize: '2rem',
    marginBottom: '1rem',
    color: '#000000',
  },
  addReviewText: {
    color: '#000000',
    marginBottom: '2rem',
    fontSize: '1.1rem',
  },
  addReviewButton: {
    padding: '1rem 2.5rem',
    backgroundColor: '#7C2A62',
    border: 'none',
    borderRadius: '25px',
    cursor: 'pointer',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    color: 'white',
    transition: 'all 0.3s ease',
  },
  contactContent: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '4rem',
    alignItems: 'start',
  },
  contactInfo: {
    padding: '3rem',
    backgroundColor: 'white',
    borderRadius: '20px',
    boxShadow: '0 8px 25px rgba(124, 42, 98, 0.1)',
  },
  contactSubtitle: {
    fontSize: '1.8rem',
    marginBottom: '2rem',
    color: '#000000',
    fontWeight: '600',
  },
  contactItem: {
    marginBottom: '2rem',
    fontSize: '1.1rem',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  contactIcon: {
    fontSize: '1.5rem',
    color: '#7C2A62',
  },
  contactForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  submitButton: {
    padding: '1.2rem 2rem',
    backgroundColor: '#7C2A62',
    border: 'none',
    borderRadius: '25px',
    cursor: 'pointer',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    color: 'white',
    transition: 'all 0.3s ease',
  },
  footer: {
    backgroundColor: '#7C2A62',
    color: 'white',
    padding: '3rem 0 0',
  },
  footerContent: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '3rem',
    padding: '0 2rem',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  footerSection: {
    display: 'flex',
    flexDirection: 'column',
  },
  footerTitle: {
    fontSize: '1.8rem',
    marginBottom: '1rem',
    color: '#F7D9EB',
  },
  footerSubtitle: {
    fontSize: '1.3rem',
    marginBottom: '1.5rem',
    color: '#F7D9EB',
  },
  footerText: {
    marginBottom: '1rem',
    color: '#F7D9EB',
    lineHeight: '1.6',
  },
  socialLinks: {
    display: 'flex',
    gap: '1rem',
    marginTop: '1rem',
  },
  socialIcon: {
    fontSize: '1.5rem',
    cursor: 'pointer',
    transition: 'transform 0.3s ease',
    color: '#F7D9EB',
  },
  footerLink: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#F7D9EB',
    textAlign: 'left',
    padding: '0.5rem 0',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontSize: '1rem',
  },
  activeFooterLink: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    textDecoration: 'underline',
  },
  footerBottom: {
    borderTop: '1px solid #F7D9EB',
    padding: '2rem 2rem',
    textAlign: 'center',
    marginTop: '3rem',
  },
  copyright: {
    margin: 0,
    color: '#F7D9EB',
    fontSize: '1rem',
  },
};

export default HomePage;