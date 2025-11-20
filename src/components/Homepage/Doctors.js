import React, { useState, useEffect } from 'react';

const Doctors = ({ onNavigateToLogin }) => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [availableSlots, setAvailableSlots] = useState({});
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [loadingSlots, setLoadingSlots] = useState(false);

  const styles = {
    doctors: {
      padding: '5rem 2rem',
      backgroundColor: '#f8f9fa',
      minHeight: '100vh',
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
    },
    sectionTitle: {
      fontSize: '3rem',
      textAlign: 'center',
      marginBottom: '1rem',
      color: '#7C2A62',
      fontWeight: '700',
    },
    sectionSubtitle: {
      fontSize: '1.2rem',
      textAlign: 'center',
      marginBottom: '4rem',
      color: '#666',
    },
    doctorsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '2rem',
    },
    doctorCard: {
      padding: '2rem',
      backgroundColor: 'white',
      borderRadius: '20px',
      boxShadow: '0 5px 20px rgba(124, 42, 98, 0.1)',
      textAlign: 'center',
      transition: 'all 0.3s ease',
      position: 'relative',
    },
    doctorImage: {
      width: '120px',
      height: '120px',
      borderRadius: '50%',
      backgroundColor: '#F7D9EB',
      margin: '0 auto 1.5rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '2rem',
      color: '#7C2A62',
      border: '4px solid #7C2A62',
    },
    rating: {
      position: 'absolute',
      top: '1rem',
      right: '1rem',
      backgroundColor: '#FFD700',
      color: '#000',
      padding: '0.3rem 0.8rem',
      borderRadius: '15px',
      fontSize: '0.9rem',
      fontWeight: 'bold',
    },
    doctorName: {
      fontSize: '1.3rem',
      marginBottom: '0.5rem',
      color: '#333',
      fontWeight: '600',
    },
    doctorSpecialty: {
      fontSize: '1.1rem',
      marginBottom: '0.5rem',
      color: '#7C2A62',
      fontWeight: '500',
    },
    doctorExperience: {
      color: '#666',
      marginBottom: '1.5rem',
    },
    buttonContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.8rem',
    },
    viewProfileButton: {
      padding: '0.8rem 1.5rem',
      backgroundColor: 'transparent',
      color: '#7C2A62',
      border: '2px solid #7C2A62',
      borderRadius: '25px',
      cursor: 'pointer',
      fontWeight: '600',
      transition: 'all 0.3s ease',
    },
    bookConsultationButton: {
      padding: '0.8rem 1.5rem',
      backgroundColor: '#7C2A62',
      color: 'white',
      border: 'none',
      borderRadius: '25px',
      cursor: 'pointer',
      fontWeight: '600',
      transition: 'all 0.3s ease',
    },
    // Profile Modal Styles
    profileModal: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
      padding: '1rem',
    },
    profileContent: {
      backgroundColor: 'white',
      padding: '2.5rem',
      borderRadius: '20px',
      maxWidth: '600px',
      width: '100%',
      maxHeight: '90vh',
      overflowY: 'auto',
      position: 'relative',
    },
    closeButton: {
      position: 'absolute',
      top: '1rem',
      right: '1rem',
      background: 'none',
      border: 'none',
      fontSize: '1.5rem',
      cursor: 'pointer',
      color: '#7C2A62',
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.3s ease',
      zIndex: 1001,
    },
    profileHeader: {
      textAlign: 'center',
      marginBottom: '2rem',
    },
    profileImage: {
      width: '150px',
      height: '150px',
      borderRadius: '50%',
      backgroundColor: '#F7D9EB',
      margin: '0 auto 1.5rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '2.5rem',
      color: '#7C2A62',
      border: '4px solid #7C2A62',
    },
    profileName: {
      fontSize: '1.8rem',
      marginBottom: '0.5rem',
      color: '#333',
      fontWeight: '600',
    },
    profileSpecialty: {
      fontSize: '1.3rem',
      marginBottom: '0.5rem',
      color: '#7C2A62',
      fontWeight: '500',
    },
    profileRating: {
      backgroundColor: '#FFD700',
      color: '#000',
      padding: '0.3rem 0.8rem',
      borderRadius: '15px',
      fontSize: '0.9rem',
      fontWeight: 'bold',
      display: 'inline-block',
      marginBottom: '1rem',
    },
    profileDetails: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '1rem',
      marginBottom: '2rem',
    },
    detailItem: {
      padding: '1rem',
      backgroundColor: '#f8f9fa',
      borderRadius: '10px',
      textAlign: 'left',
    },
    detailLabel: {
      fontWeight: '600',
      color: '#333',
      marginBottom: '0.3rem',
      fontSize: '0.9rem',
    },
    detailValue: {
      color: '#666',
      fontSize: '0.9rem',
    },
    fullWidthDetail: {
      gridColumn: '1 / -1',
    },
    // Slots Section Styles
    slotsSection: {
      margin: '2rem 0',
    },
    slotsHeader: {
      fontSize: '1.3rem',
      fontWeight: '600',
      color: '#333',
      marginBottom: '1rem',
      textAlign: 'left',
    },
    slotsContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
      gap: '0.8rem',
      marginBottom: '1.5rem',
    },
    slotButton: {
      padding: '0.8rem 0.5rem',
      backgroundColor: '#f8f9fa',
      border: '2px solid #e9ecef',
      borderRadius: '10px',
      cursor: 'pointer',
      fontWeight: '500',
      fontSize: '0.9rem',
      transition: 'all 0.3s ease',
      textAlign: 'center',
    },
    selectedSlot: {
      backgroundColor: '#7C2A62',
      color: 'white',
      borderColor: '#7C2A62',
    },
    availableSlot: {
      backgroundColor: '#d4edda',
      borderColor: '#c3e6cb',
      color: '#155724',
    },
    unavailableSlot: {
      backgroundColor: '#f8d7da',
      borderColor: '#f5c6cb',
      color: '#721c24',
      cursor: 'not-allowed',
    },
    loadingSlots: {
      textAlign: 'center',
      padding: '2rem',
      color: '#666',
    },
    modalBookConsultationButton: {
      padding: '1rem 2rem',
      backgroundColor: '#7C2A62',
      color: 'white',
      border: 'none',
      borderRadius: '25px',
      cursor: 'pointer',
      fontWeight: '600',
      fontSize: '1.1rem',
      transition: 'all 0.3s ease',
      width: '100%',
      marginTop: '1rem',
    },
    disabledButton: {
      backgroundColor: '#ccc',
      cursor: 'not-allowed',
    },
    loginMessage: {
      backgroundColor: '#FFF3CD',
      border: '1px solid #FFEAA7',
      padding: '1rem',
      borderRadius: '10px',
      marginTop: '1rem',
      color: '#856404',
      textAlign: 'center',
    },
    loginLink: {
      color: '#7C2A62',
      fontWeight: '600',
      textDecoration: 'underline',
      cursor: 'pointer',
      marginLeft: '0.3rem',
    },
    selectedSlotInfo: {
      backgroundColor: '#e7f3ff',
      border: '1px solid #b3d9ff',
      padding: '1rem',
      borderRadius: '10px',
      marginBottom: '1rem',
      textAlign: 'center',
    }
  };

  const doctors = [
    {
      id: 1,
      name: 'Dr. Priya Sharma',
      specialty: 'General Physician',
      experience: '10 years',
      rating: '4.9',
      initial: 'PS',
      education: 'MBBS, MD - General Medicine',
      languages: 'English, Hindi, Tamil',
      consultationFee: '₹500',
      availability: 'Mon-Sat: 9 AM - 6 PM',
      about: 'Specialized in general medicine with 10 years of experience. Expertise in chronic disease management and preventive healthcare.',
      patients: '5000+'
    },
    {
      id: 2,
      name: 'Dr. Rajesh Kumar',
      specialty: 'Cardiologist',
      experience: '12 years',
      rating: '4.8',
      initial: 'RK',
      education: 'MBBS, MD - Cardiology, DM - Cardiology',
      languages: 'English, Hindi',
      consultationFee: '₹800',
      availability: 'Mon-Fri: 10 AM - 4 PM',
      about: 'Senior cardiologist with expertise in heart disease prevention and treatment. Performed 1000+ successful procedures.',
      patients: '3000+'
    },
    {
      id: 3,
      name: 'Dr. Anjali Mehta',
      specialty: 'Pediatrician',
      experience: '8 years',
      rating: '4.9',
      initial: 'AM',
      education: 'MBBS, MD - Pediatrics',
      languages: 'English, Hindi, Gujarati',
      consultationFee: '₹600',
      availability: 'Mon-Sat: 8 AM - 5 PM',
      about: 'Dedicated pediatrician with expertise in child healthcare, vaccination, and growth monitoring.',
      patients: '4000+'
    },
    {
      id: 4,
      name: 'Dr. Sanjay Verma',
      specialty: 'Orthopedic',
      experience: '15 years',
      rating: '4.7',
      initial: 'SV',
      education: 'MBBS, MS - Orthopedics',
      languages: 'English, Hindi, Punjabi',
      consultationFee: '₹700',
      availability: 'Tue-Sat: 11 AM - 7 PM',
      about: 'Orthopedic surgeon specializing in joint replacement and sports injuries. 15 years of surgical experience.',
      patients: '6000+'
    },
    {
      id: 5,
      name: 'Dr. Neha Gupta',
      specialty: 'Dermatologist',
      experience: '9 years',
      rating: '4.8',
      initial: 'NG',
      education: 'MBBS, MD - Dermatology',
      languages: 'English, Hindi, Bengali',
      consultationFee: '₹750',
      availability: 'Mon-Fri: 9 AM - 5 PM',
      about: 'Skin and hair specialist with expertise in cosmetic dermatology and skin disease treatment.',
      patients: '3500+'
    },
    {
      id: 6,
      name: 'Dr. Amit Patel',
      specialty: 'Psychiatrist',
      experience: '11 years',
      rating: '4.9',
      initial: 'AP',
      education: 'MBBS, MD - Psychiatry',
      languages: 'English, Hindi, Marathi',
      consultationFee: '₹900',
      availability: 'Mon-Sat: 10 AM - 6 PM',
      about: 'Mental health specialist with expertise in anxiety, depression, and relationship counseling.',
      patients: '2000+'
    }
  ];

  // Function to generate time slots
  const generateTimeSlots = () => {
    const slots = [];
    const startHour = 9;
    const endHour = 18;
    
    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        slots.push(timeString);
      }
    }
    return slots;
  };

  // Simulate fetching available slots from API
  const fetchAvailableSlots = async (doctorId) => {
    setLoadingSlots(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const allSlots = generateTimeSlots();
    const available = {};
    
    // Randomly mark some slots as available (simulating real-time availability)
    allSlots.forEach(slot => {
      available[slot] = Math.random() > 0.3; // 70% chance of being available
    });
    
    setAvailableSlots(available);
    setLoadingSlots(false);
  };

  const handleViewProfile = async (doctor) => {
    setSelectedDoctor(doctor);
    setSelectedSlot(null);
    await fetchAvailableSlots(doctor.id);
  };

  const handleCloseProfile = () => {
    setSelectedDoctor(null);
    setSelectedSlot(null);
    setAvailableSlots({});
  };

  const handleSlotSelect = (slot) => {
    if (availableSlots[slot]) {
      setSelectedSlot(slot);
    }
  };

  const handleBookConsultation = (doctor = null) => {
    const doctorName = doctor ? doctor.name : (selectedDoctor ? selectedDoctor.name : 'the doctor');
    const slotInfo = selectedSlot ? ` for ${selectedSlot}` : '';
    
    if (selectedSlot) {
      alert(`Booking consultation with ${doctorName}${slotInfo}. Please login to confirm.`);
    } else {
      alert('Please select a time slot first to book consultation with ' + doctorName);
      return;
    }
    
    // Close the profile modal if open
    if (selectedDoctor) {
      handleCloseProfile();
    }
    
    // Navigate to login page after a short delay
    setTimeout(() => {
      if (onNavigateToLogin) {
        onNavigateToLogin();
      }
    }, 500);
  };

  const handleLoginLinkClick = () => {
    handleBookConsultation();
  };

  // Format slot time for display
  const formatSlotTime = (slot) => {
    const [hours, minutes] = slot.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  return (
    <section style={styles.doctors}>
      <div style={styles.container}>
        <h2 style={{
          ...styles.sectionTitle,
          ...(window.innerWidth <= 768 && { fontSize: '2rem' }),
          ...(window.innerWidth <= 480 && { fontSize: '1.8rem' })
        }}>
          Our Medical Experts
        </h2>
        <p style={{
          ...styles.sectionSubtitle,
          ...(window.innerWidth <= 768 && { fontSize: '1rem', marginBottom: '3rem' }),
          ...(window.innerWidth <= 480 && { fontSize: '0.9rem', padding: '0 1rem' })
        }}>
          Connect with certified healthcare professionals online
        </p>
        
        <div style={{
          ...styles.doctorsGrid,
          ...(window.innerWidth <= 768 && { 
            gridTemplateColumns: '1fr',
            gap: '1.5rem'
          })
        }}>
          {doctors.map((doctor, index) => (
            <div
              key={doctor.id}
              style={{
                ...styles.doctorCard,
                ...(window.innerWidth <= 768 && { 
                  padding: '1.5rem',
                  margin: '0 0.5rem'
                })
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 15px 40px rgba(124, 42, 98, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 5px 20px rgba(124, 42, 98, 0.1)';
              }}
            >
              <div style={styles.rating}>⭐ {doctor.rating}</div>
              <div style={styles.doctorImage}>{doctor.initial}</div>
              <h3 style={styles.doctorName}>{doctor.name}</h3>
              <p style={styles.doctorSpecialty}>{doctor.specialty}</p>
              <p style={styles.doctorExperience}>Experience: {doctor.experience}</p>
              
              <div style={styles.buttonContainer}>
                <button
                  style={{
                    ...styles.viewProfileButton,
                    ...(window.innerWidth <= 480 && { 
                      padding: '0.6rem 1.2rem',
                      fontSize: '0.9rem'
                    })
                  }}
                  onClick={() => handleViewProfile(doctor)}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#7C2A62';
                    e.target.style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.color = '#7C2A62';
                  }}
                >
                  View Profile
                </button>
                
                <button
                  style={{
                    ...styles.bookConsultationButton,
                    ...(window.innerWidth <= 480 && { 
                      padding: '0.6rem 1.2rem',
                      fontSize: '0.9rem'
                    })
                  }}
                  onClick={() => handleBookConsultation(doctor)}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#5a1a4a';
                    e.target.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = '#7C2A62';
                    e.target.style.transform = 'scale(1)';
                  }}
                >
                  Book Consultation
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Doctor Profile Modal */}
        {selectedDoctor && (
          <div style={styles.profileModal} onClick={handleCloseProfile}>
            <div style={{
              ...styles.profileContent,
              ...(window.innerWidth <= 480 && { 
                padding: '1.5rem',
                margin: '1rem'
              })
            }} onClick={(e) => e.stopPropagation()}>
              <button 
                style={{
                  ...styles.closeButton,
                  ...(window.innerWidth <= 480 && {
                    top: '0.5rem',
                    right: '0.5rem'
                  })
                }}
                onClick={handleCloseProfile}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#F7D9EB';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                }}
              >
                ×
              </button>
              
              <div style={styles.profileHeader}>
                <div style={styles.profileImage}>{selectedDoctor.initial}</div>
                <h2 style={styles.profileName}>{selectedDoctor.name}</h2>
                <p style={styles.profileSpecialty}>{selectedDoctor.specialty}</p>
                <div style={styles.profileRating}>⭐ {selectedDoctor.rating} Rating</div>
              </div>

              <div style={styles.profileDetails}>
                <div style={styles.detailItem}>
                  <div style={styles.detailLabel}>Education</div>
                  <div style={styles.detailValue}>{selectedDoctor.education}</div>
                </div>
                <div style={styles.detailItem}>
                  <div style={styles.detailLabel}>Experience</div>
                  <div style={styles.detailValue}>{selectedDoctor.experience}</div>
                </div>
                <div style={styles.detailItem}>
                  <div style={styles.detailLabel}>Languages</div>
                  <div style={styles.detailValue}>{selectedDoctor.languages}</div>
                </div>
                <div style={styles.detailItem}>
                  <div style={styles.detailLabel}>Fee</div>
                  <div style={styles.detailValue}>{selectedDoctor.consultationFee}</div>
                </div>
                <div style={{...styles.detailItem, ...styles.fullWidthDetail}}>
                  <div style={styles.detailLabel}>Availability</div>
                  <div style={styles.detailValue}>{selectedDoctor.availability}</div>
                </div>
                <div style={{...styles.detailItem, ...styles.fullWidthDetail}}>
                  <div style={styles.detailLabel}>About</div>
                  <div style={styles.detailValue}>{selectedDoctor.about}</div>
                </div>
              </div>

              {/* Available Slots Section */}
              <div style={styles.slotsSection}>
                <h3 style={styles.slotsHeader}>Available Time Slots (Today)</h3>
                
                {loadingSlots ? (
                  <div style={styles.loadingSlots}>
                    Loading available slots...
                  </div>
                ) : (
                  <>
                    {selectedSlot && (
                      <div style={styles.selectedSlotInfo}>
                        <strong>Selected Slot:</strong> {formatSlotTime(selectedSlot)}
                      </div>
                    )}
                    
                    <div style={styles.slotsContainer}>
                      {Object.entries(availableSlots).map(([slot, isAvailable]) => (
                        <button
                          key={slot}
                          style={{
                            ...styles.slotButton,
                            ...(selectedSlot === slot && styles.selectedSlot),
                            ...(isAvailable ? styles.availableSlot : styles.unavailableSlot),
                            ...(!isAvailable && { cursor: 'not-allowed' })
                          }}
                          onClick={() => handleSlotSelect(slot)}
                          disabled={!isAvailable}
                          onMouseEnter={(e) => {
                            if (isAvailable && selectedSlot !== slot) {
                              e.target.style.transform = 'scale(1.05)';
                              e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)';
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (isAvailable && selectedSlot !== slot) {
                              e.target.style.transform = 'scale(1)';
                              e.target.style.boxShadow = 'none';
                            }
                          }}
                        >
                          {formatSlotTime(slot)}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>

              <button
                style={{
                  ...styles.modalBookConsultationButton,
                  ...(!selectedSlot && styles.disabledButton)
                }}
                onClick={() => handleBookConsultation(selectedDoctor)}
                disabled={!selectedSlot}
                onMouseEnter={(e) => {
                  if (selectedSlot) {
                    e.target.style.backgroundColor = '#5a1a4a';
                    e.target.style.transform = 'scale(1.05)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedSlot) {
                    e.target.style.backgroundColor = '#7C2A62';
                    e.target.style.transform = 'scale(1)';
                  }
                }}
              >
                {selectedSlot ? `Book Consultation at ${formatSlotTime(selectedSlot)}` : 'Select a Time Slot'}
              </button>

              <div style={styles.loginMessage}>
                Please 
                <span style={styles.loginLink} onClick={handleLoginLinkClick}>
                  login
                </span> 
                to confirm your booking
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Doctors;