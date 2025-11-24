import React, { useState, useEffect } from 'react';

const AppointmentsView = ({
  appointments,
  filteredAppointments,
  appointmentFilter,
  setAppointmentFilter,
  setActiveView,
  rescheduleAppointment,
  cancelAppointment,
  viewAppointmentDetails
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Scroll to top when component mounts or when navigating to this view
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, []);

  // Also add scroll to top when filter changes to ensure we're at the top
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [appointmentFilter, searchTerm]);

  const BackButton = ({ onClick, text = 'Back' }) => (
    <button 
      style={{
        padding: '0.5rem 1rem',
        backgroundColor: 'transparent',
        color: '#7C2A62',
        border: '1px solid #7C2A62',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '0.9rem'
      }}
      onClick={() => {
        // Scroll to top first, then navigate
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
        // Small delay to ensure scroll completes before navigation
        setTimeout(() => {
          onClick();
        }, 100);
      }}
      type="button"
    >
      ← {text}
    </button>
  );

  // Filter appointments based on the selected filter and search term
  const getFilteredAppointments = () => {
    let filtered = appointments;
    
    // Apply status filter
    if (appointmentFilter !== 'all') {
      filtered = appointments.filter(appointment => {
        const status = appointment.status.toLowerCase();
        const filter = appointmentFilter.toLowerCase();
        
        switch (filter) {
          case 'scheduled':
            return status === 'scheduled';
          case 'pending':
            return status === 'pending';
          case 'rescheduled':
            return status === 'rescheduled';
          case 'cancelled':
            return status === 'cancelled';
          case 'completed':
            return status === 'completed';
          default:
            return true;
        }
      });
    }
    
    // Apply search filter
    if (searchTerm.trim() !== '') {
      filtered = filtered.filter(appointment => 
        appointment.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  };

  // Use the filtered appointments
  const displayAppointments = getFilteredAppointments();

  // Doctor information data
  const doctorInfo = {
    "Dr. Brahma Gadikoto": {
      specialty: "General Physician",
      experience: "15+ years",
      education: "MBBS, MD - General Medicine",
      languages: "English, Hindi, Telugu",
      rating: "4.8/5",
      about: "Specialized in internal medicine and chronic disease management. Provides comprehensive healthcare for adults."
    },
    "Dr. Charitha Kasturi": {
      specialty: "Pediatrician",
      experience: "12+ years",
      education: "MBBS, DCH, MD - Pediatrics",
      languages: "English, Hindi, Tamil",
      rating: "4.9/5",
      about: "Expert in child healthcare, vaccination, and growth monitoring. Gentle approach with children."
    },
    "Dr. Rajesh Kumar": {
      specialty: "Cardiologist",
      experience: "18+ years",
      education: "MBBS, DM - Cardiology",
      languages: "English, Hindi",
      rating: "4.7/5",
      about: "Interventional cardiologist specializing in heart disease prevention and treatment."
    },
    "Dr. Priya Sharma": {
      specialty: "Dermatologist",
      experience: "10+ years",
      education: "MBBS, MD - Dermatology",
      languages: "English, Hindi, Punjabi",
      rating: "4.8/5",
      about: "Skin and hair care specialist with expertise in cosmetic and medical dermatology."
    },
    "Dr. Anil Kumar": {
      specialty: "Orthopedic",
      experience: "20+ years",
      education: "MBBS, MS - Orthopedics",
      languages: "English, Hindi, Malayalam",
      rating: "4.6/5",
      about: "Joint replacement specialist with extensive experience in sports injuries and trauma."
    }
  };

  return (
    <div style={{
      marginTop: '120px',
      padding: '0', // Remove padding to eliminate edge gaps
      width: '100vw', // Full viewport width
      marginLeft: '0',
      marginRight: '0',
      minHeight: 'calc(100vh - 120px)',
      overflowX: 'hidden', // Prevent horizontal scrolling
      backgroundColor: '#F8F9FA' // Add background color to fill gaps
    }}>
      {/* Main Container with limited width for content */}
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '1.5rem',
        minHeight: 'calc(100vh - 120px)'
      }}>
        {/* Header Section */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          {/* Left: Dashboard Button */}
          <BackButton onClick={() => setActiveView('dashboard')} text="Dashboard" />
          
          {/* Center: Title */}
          <div style={{
            textAlign: 'center',
            flex: 1
          }}>
            <h1 style={{
              color: '#7C2A62',
              fontSize: '2rem',
              margin: '0 0 0.5rem 0',
              fontWeight: '700'
            }}>My Appointments</h1>
            <p style={{
              color: '#666',
              margin: 0,
              fontSize: '1rem'
            }}>Quick Care, Better Health</p>
          </div>

          {/* Right: Search and Book Appointment */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4rem', // Increased gap to 4rem as requested
            flexWrap: 'wrap'
          }}>
            {/* Search Bar */}
            <div style={{
              position: 'relative',
              minWidth: '320px'
            }}>
              <input
                type="text"
                placeholder="Search doctors, specialties, or appointment ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  padding: '0.75rem 1rem 0.75rem 2.5rem',
                  border: '2px solid #E5E7EB',
                  borderRadius: '8px',
                  fontSize: '0.9rem',
                  width: '100%',
                  outline: 'none',
                  transition: 'border-color 0.3s ease',
                  backgroundColor: '#F9FAFB'
                }}
              />
              <span style={{
                position: 'absolute',
                left: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#7C2A62',
                fontSize: '1rem'
              }}>
              </span>
            </div>

            {/* Book New Appointment button */}
            <button 
              style={{
                padding: '0.75rem 2rem',
                backgroundColor: '#7C2A62',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '0.9rem',
                fontWeight: '600',
                whiteSpace: 'nowrap',
                minWidth: '180px'
              }}
              onClick={() => {
                // Scroll to top first, then navigate
                window.scrollTo({
                  top: 0,
                  left: 0,
                  behavior: 'smooth'
                });
                // Small delay to ensure scroll completes before navigation
                setTimeout(() => {
                  setActiveView('consultation');
                }, 100);
              }}
              type="button"
            >
              + Book New Appointment
            </button>
          </div>
        </div>

        {/* Medical Consultation Information Section */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '1.5rem',
          marginBottom: '2rem',
          boxShadow: '0 2px 15px rgba(0,0,0,0.08)',
          border: '1px solid #E5E7EB'
        }}>
          <h3 style={{
            color: '#7C2A62',
            fontSize: '1.25rem',
            margin: '0 0 1.5rem 0',
            fontWeight: '700',
            textAlign: 'center'
          }}>Why Choose QuickMed?</h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '1.5rem'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '1rem'
            }}>
              <div style={{
                fontSize: '2rem',
                color: '#7C2A62',
                flexShrink: 0
              }}></div>
              <div>
                <h4 style={{ color: '#7C2A62', margin: '0 0 0.5rem 0', fontSize: '1rem' }}>Expert Medical Care</h4>
                <p style={{ color: '#666', fontSize: '0.85rem', margin: 0, lineHeight: '1.4' }}>
                  Consult with experienced doctors across 15+ specialties. Get personalized treatment plans and continuous care.
                </p>
              </div>
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '1rem'
            }}>
              <div style={{
                fontSize: '2rem',
                color: '#7C2A62',
                flexShrink: 0
              }}></div>
              <div>
                <h4 style={{ color: '#7C2A62', margin: '0 0 0.5rem 0', fontSize: '1rem' }}>Digital Prescriptions</h4>
                <p style={{ color: '#666', fontSize: '0.85rem', margin: 0, lineHeight: '1.4' }}>
                  Receive digital prescriptions instantly. Access your medical records and treatment history anytime.
                </p>
              </div>
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '1rem'
            }}>
              <div style={{
                fontSize: '2rem',
                color: '#7C2A62',
                flexShrink: 0
              }}></div>
              <div>
                <h4 style={{ color: '#7C2A62', margin: '0 0 0.5rem 0', fontSize: '1rem' }}>24/7 Support</h4>
                <p style={{ color: '#666', fontSize: '0.85rem', margin: 0, lineHeight: '1.4' }}>
                  Our medical team is available round the clock. Emergency consultations and follow-ups made easy.
                </p>
              </div>
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '1rem'
            }}>
              <div style={{
                fontSize: '2rem',
                color: '#7C2A62',
                flexShrink: 0
              }}></div>
              <div>
                <h4 style={{ color: '#7C2A62', margin: '0 0 0.5rem 0', fontSize: '1rem' }}>Health Monitoring</h4>
                <p style={{ color: '#666', fontSize: '0.85rem', margin: 0, lineHeight: '1.4' }}>
                  Track your health progress with our digital tools. Regular follow-ups and health tips for better outcomes.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Appointments Filter Tabs */}
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          marginBottom: '2rem',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          {['all', 'scheduled', 'pending', 'rescheduled', 'cancelled', 'completed'].map((filter) => (
            <button 
              key={filter}
              style={appointmentFilter === filter ? {
                padding: '0.6rem 1.2rem',
                backgroundColor: '#7C2A62',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '0.85rem',
                transition: 'all 0.3s ease',
                textTransform: 'capitalize',
                minWidth: '100px'
              } : {
                padding: '0.6rem 1.2rem',
                backgroundColor: 'white',
                color: '#7C2A62',
                border: '1px solid #7C2A62',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '0.85rem',
                transition: 'all 0.3s ease',
                textTransform: 'capitalize',
                minWidth: '100px'
              }}
              onClick={() => setAppointmentFilter(filter)}
              type="button"
            >
              {filter === 'all' ? 'All' : filter}
            </button>
          ))}
        </div>

        {/* Main Content Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          gap: '2rem',
          alignItems: 'start'
        }}>
          {/* Left Side: Appointments List */}
          <div>
            {displayAppointments.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '3rem',
                backgroundColor: 'white',
                borderRadius: '15px',
                boxShadow: '0 2px 20px rgba(0,0,0,0.1)',
                border: '1px solid #E5E7EB'
              }}>
                <p style={{
                  fontSize: '1.2rem',
                  color: '#666',
                  marginBottom: '1.5rem'
                }}>
                  {appointmentFilter === 'all' && searchTerm === ''
                    ? 'No appointments scheduled' 
                    : `No ${appointmentFilter !== 'all' ? appointmentFilter : ''} appointments ${searchTerm ? `matching "${searchTerm}"` : ''}`.trim()}
                </p>
                <button 
                  style={{
                    padding: '1rem 2rem',
                    backgroundColor: '#7C2A62',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    fontWeight: '600'
                  }}
                  onClick={() => {
                    // Scroll to top first, then navigate
                    window.scrollTo({
                      top: 0,
                      left: 0,
                      behavior: 'smooth'
                    });
                    // Small delay to ensure scroll completes before navigation
                    setTimeout(() => {
                      setActiveView('consultation');
                    }, 100);
                  }}
                  type="button"
                >
                  Book Your First Appointment
                </button>
              </div>
            ) : (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem'
              }}>
                {displayAppointments.map((appointment, index) => (
                  <div key={appointment.id} style={{
                    backgroundColor: 'white',
                    borderRadius: '12px',
                    padding: '1.5rem',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
                    border: '1px solid #E5E7EB',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                  }} onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.12)';
                  }} onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.08)';
                  }}>
                    {/* Appointment Header */}
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: '1.25rem',
                      paddingBottom: '1rem',
                      borderBottom: '2px solid #F3F4F6'
                    }}>
                      <div style={{ flex: 1 }}>
                        <h3 style={{
                          margin: '0 0 0.75rem 0',
                          color: '#7C2A62',
                          fontSize: '1.1rem',
                          fontWeight: '700'
                        }}>Appointment #{appointment.id}</h3>
                        <p style={{
                          margin: '0 0 0.25rem 0',
                          color: '#1F2937',
                          fontSize: '1.05rem',
                          fontWeight: '600'
                        }}>{appointment.doctorName}</p>
                        <p style={{
                          margin: 0,
                          color: '#6B7280',
                          fontSize: '0.9rem',
                          fontWeight: '500'
                        }}>{appointment.specialty}</p>
                      </div>
                      <div>
                        <span style={{
                          padding: '0.4rem 0.9rem',
                          borderRadius: '20px',
                          color: 'white',
                          fontSize: '0.75rem',
                          fontWeight: '700',
                          backgroundColor: 
                            appointment.status === 'Scheduled' ? '#10B981' :
                            appointment.status === 'Completed' ? '#3B82F6' :
                            appointment.status === 'Cancelled' ? '#EF4444' :
                            appointment.status === 'Rescheduled' ? '#F59E0B' :
                            appointment.status === 'Pending' ? '#F59E0B' : '#6B7280'
                        }}>
                          {appointment.status.toUpperCase()}
                        </span>
                      </div>
                    </div>
                    
                    {/* Appointment Details */}
                    <div style={{
                      marginBottom: '1.5rem'
                    }}>
                      {[
                        { label: 'Date', value: appointment.date },
                        { label: 'Time', value: appointment.time },
                        { label: 'Type', value: appointment.type },
                        { label: 'Fee', value: `₹${appointment.fee}` }
                      ].map((item, index) => (
                        <div key={index} style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '0.6rem 0',
                          borderBottom: '1px solid #F3F4F6'
                        }}>
                          <span style={{
                            color: '#6B7280',
                            fontSize: '0.85rem',
                            fontWeight: '500'
                          }}>{item.label}:</span>
                          <span style={{
                            color: item.label === 'Fee' ? '#7C2A62' : '#1F2937',
                            fontSize: '0.85rem',
                            fontWeight: item.label === 'Fee' ? '700' : '600'
                          }}>{item.value}</span>
                        </div>
                      ))}
                    </div>
                    
                    {/* Action Buttons */}
                    <div style={{
                      display: 'flex',
                      gap: '0.75rem',
                      justifyContent: 'flex-end',
                      flexWrap: 'wrap'
                    }}>
                      {appointment.status === 'Scheduled' && (
                        <>
                          <button 
                            style={{
                              padding: '0.5rem 1rem',
                              backgroundColor: '#F59E0B',
                              color: 'white',
                              border: 'none',
                              borderRadius: '6px',
                              cursor: 'pointer',
                              fontSize: '0.8rem',
                              fontWeight: '600'
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              const newDate = prompt('Enter new date (YYYY-MM-DD):', appointment.date);
                              const newTime = prompt('Enter new time:', appointment.time);
                              if (newDate && newTime) {
                                rescheduleAppointment(appointment.id, newDate, newTime);
                              }
                            }}
                            type="button"
                          >
                            Reschedule
                          </button>
                          <button 
                            style={{
                              padding: '0.5rem 1rem',
                              backgroundColor: '#EF4444',
                              color: 'white',
                              border: 'none',
                              borderRadius: '6px',
                              cursor: 'pointer',
                              fontSize: '0.8rem',
                              fontWeight: '600'
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              if (window.confirm('Are you sure you want to cancel this appointment?')) {
                                cancelAppointment(appointment.id);
                              }
                            }}
                            type="button"
                          >
                            Cancel
                          </button>
                        </>
                      )}
                      {appointment.status === 'Pending' && (
                        <button 
                          style={{
                            padding: '0.5rem 1rem',
                            backgroundColor: '#EF4444',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '0.8rem',
                            fontWeight: '600'
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            if (window.confirm('Are you sure you want to cancel this appointment?')) {
                              cancelAppointment(appointment.id);
                            }
                          }}
                          type="button"
                        >
                          Cancel
                        </button>
                      )}
                      <button 
                        style={{
                          padding: '0.5rem 1rem',
                          backgroundColor: 'transparent',
                          color: '#7C2A62',
                          border: '1px solid #7C2A62',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '0.8rem',
                          fontWeight: '600'
                        }} 
                        onClick={(e) => {
                          e.stopPropagation();
                          viewAppointmentDetails(appointment);
                        }}
                        type="button"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Side: Doctors Information Sidebar */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '1.5rem',
            boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
            border: '1px solid #E5E7EB',
            position: 'sticky',
            top: '140px',
            maxHeight: 'calc(100vh - 160px)',
            overflowY: 'auto'
          }}>
            <h3 style={{
              color: '#7C2A62',
              fontSize: '1.25rem',
              margin: '0 0 1.5rem 0',
              fontWeight: '700',
              paddingBottom: '0.75rem',
              borderBottom: '2px solid #F3F4F6'
            }}>Our Medical Team</h3>
            
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem'
            }}>
              {Object.entries(doctorInfo).map(([doctorName, info]) => (
                <div key={doctorName} style={{
                  padding: '1rem',
                  backgroundColor: '#F8F9FA',
                  borderRadius: '8px',
                  border: '1px solid #E5E7EB'
                }}>
                  <h4 style={{
                    margin: '0 0 0.5rem 0',
                    color: '#1F2937',
                    fontSize: '1rem',
                    fontWeight: '600'
                  }}>{doctorName}</h4>
                  <p style={{
                    margin: '0 0 0.75rem 0',
                    color: '#7C2A62',
                    fontSize: '0.85rem',
                    fontWeight: '500'
                  }}>{info.specialty}</p>
                  
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.4rem',
                    marginBottom: '0.75rem'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#6B7280', fontSize: '0.8rem' }}>Experience:</span>
                      <span style={{ color: '#1F2937', fontSize: '0.8rem', fontWeight: '500' }}>{info.experience}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#6B7280', fontSize: '0.8rem' }}>Education:</span>
                      <span style={{ color: '#1F2937', fontSize: '0.8rem', fontWeight: '500', textAlign: 'right' }}>{info.education}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#6B7280', fontSize: '0.8rem' }}>Languages:</span>
                      <span style={{ color: '#1F2937', fontSize: '0.8rem', fontWeight: '500' }}>{info.languages}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#6B7280', fontSize: '0.8rem' }}>Rating:</span>
                      <span style={{ color: '#10B981', fontSize: '0.8rem', fontWeight: '600' }}>{info.rating}</span>
                    </div>
                  </div>
                  
                  <p style={{
                    margin: 0,
                    color: '#6B7280',
                    fontSize: '0.8rem',
                    lineHeight: '1.4',
                    fontStyle: 'italic'
                  }}>"{info.about}"</p>
                </div>
              ))}
            </div>

            {/* Quick Stats */}
            <div style={{
              marginTop: '2rem',
              padding: '1rem',
              backgroundColor: '#7C2A62',
              borderRadius: '8px',
              color: 'white'
            }}>
              <h4 style={{
                margin: '0 0 0.75rem 0',
                fontSize: '1rem',
                fontWeight: '600'
              }}>QuickMed Stats</h4>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '0.75rem',
                fontSize: '0.8rem'
              }}>
                <div>
                  <div style={{ opacity: 0.9 }}>Total Doctors</div>
                  <div style={{ fontWeight: '600', fontSize: '0.9rem' }}>50+</div>
                </div>
                <div>
                  <div style={{ opacity: 0.9 }}>Happy Patients</div>
                  <div style={{ fontWeight: '600', fontSize: '0.9rem' }}>10,000+</div>
                </div>
                <div>
                  <div style={{ opacity: 0.9 }}>Success Rate</div>
                  <div style={{ fontWeight: '600', fontSize: '0.9rem' }}>98%</div>
                </div>
                <div>
                  <div style={{ opacity: 0.9 }}>Availability</div>
                  <div style={{ fontWeight: '600', fontSize: '0.9rem' }}>24/7</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentsView;