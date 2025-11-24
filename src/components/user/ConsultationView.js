import React, { useState, useEffect } from 'react';

const ConsultationView = ({
  doctorSearchQuery,
  setDoctorSearchQuery,
  selectedSpecialty,
  setSelectedSpecialty,
  selectedTimeSlot,
  setSelectedTimeSlot,
  selectedExperience,
  setSelectedExperience,
  selectedLanguage,
  setSelectedLanguage,
  filteredDoctors,
  specialties,
  allTimeSlots,
  setActiveView,
  handleBookAppointment,
  startDoctorChat
}) => {
  const [showFilters, setShowFilters] = useState(false);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Enhanced navigation handler that scrolls to top
  const handleBackToAppointments = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      setActiveView('appointments');
    }, 100);
  };

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
      onClick={onClick}
      type="button"
    >
      ← {text}
    </button>
  );

  const handleClearFilters = () => {
    setSelectedSpecialty('');
    setSelectedTimeSlot('');
    // Only clear these if the functions are provided
    if (setSelectedExperience) setSelectedExperience('');
    if (setSelectedLanguage) setSelectedLanguage('');
  };

  const FiltersDropdown = () => (
    <div style={{
      position: 'absolute',
      top: '100%',
      right: 0,
      marginTop: '0.5rem',
      backgroundColor: 'white',
      padding: '1.5rem',
      borderRadius: '15px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
      width: '300px',
      zIndex: 1000,
      border: '1px solid #F7D9EB'
    }}>
      <h3 style={{
        color: '#7C2A62',
        marginBottom: '1.5rem',
        fontSize: '1.2rem',
        fontWeight: '600'
      }}>Filters</h3>
      
      <div style={{
        marginBottom: '1.5rem'
      }}>
        <label style={{
          display: 'block',
          marginBottom: '0.5rem',
          color: '#7C2A62',
          fontWeight: '500',
          fontSize: '0.9rem'
        }}>Specialty</label>
        <select 
          value={selectedSpecialty}
          onChange={(e) => setSelectedSpecialty(e.target.value)}
          style={{
            width: '100%',
            padding: '0.75rem',
            border: '2px solid #F7D9EB',
            borderRadius: '8px',
            backgroundColor: 'white',
            fontSize: '0.9rem'
          }}
        >
          <option value="">All Specialties</option>
          {specialties.map(specialty => (
            <option key={specialty} value={specialty}>{specialty}</option>
          ))}
        </select>
      </div>

      <div style={{
        marginBottom: '1.5rem'
      }}>
        <label style={{
          display: 'block',
          marginBottom: '0.5rem',
          color: '#7C2A62',
          fontWeight: '500',
          fontSize: '0.9rem'
        }}>Time Slot</label>
        <select 
          value={selectedTimeSlot}
          onChange={(e) => setSelectedTimeSlot(e.target.value)}
          style={{
            width: '100%',
            padding: '0.75rem',
            border: '2px solid #F7D9EB',
            borderRadius: '8px',
            backgroundColor: 'white',
            fontSize: '0.9rem'
          }}
        >
          <option value="">All Time Slots</option>
          {allTimeSlots.map(slot => (
            <option key={slot} value={slot}>{slot}</option>
          ))}
        </select>
      </div>

      {/* Optional: Add Experience and Language filters if needed */}
      {setSelectedExperience && (
        <div style={{
          marginBottom: '1.5rem'
        }}>
          <label style={{
            display: 'block',
            marginBottom: '0.5rem',
            color: '#7C2A62',
            fontWeight: '500',
            fontSize: '0.9rem'
          }}>Experience</label>
          <select 
            value={selectedExperience}
            onChange={(e) => setSelectedExperience(e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '2px solid #F7D9EB',
              borderRadius: '8px',
              backgroundColor: 'white',
              fontSize: '0.9rem'
            }}
          >
            <option value="">Any Experience</option>
            <option value="0-5">0-5 years</option>
            <option value="5-10">5-10 years</option>
            <option value="10+">10+ years</option>
          </select>
        </div>
      )}

      {setSelectedLanguage && (
        <div style={{
          marginBottom: '1.5rem'
        }}>
          <label style={{
            display: 'block',
            marginBottom: '0.5rem',
            color: '#7C2A62',
            fontWeight: '500',
            fontSize: '0.9rem'
          }}>Language</label>
          <select 
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '2px solid #F7D9EB',
              borderRadius: '8px',
              backgroundColor: 'white',
              fontSize: '0.9rem'
            }}
          >
            <option value="">Any Language</option>
            <option value="English">English</option>
            <option value="Spanish">Spanish</option>
            <option value="French">French</option>
            <option value="German">German</option>
          </select>
        </div>
      )}

      <button 
        style={{
          width: '100%',
          padding: '0.75rem',
          backgroundColor: 'transparent',
          color: '#7C2A62',
          border: '2px solid #7C2A62',
          borderRadius: '8px',
          cursor: 'pointer',
          fontWeight: '600',
          marginTop: '1rem'
        }}
        onClick={handleClearFilters}
        type="button"
      >
        Clear Filters
      </button>
    </div>
  );

  // Custom Doctor Card Component with smaller size and side-by-side layout
  const CustomDoctorCard = ({ doctor, handleBookAppointment, startDoctorChat }) => (
    <div style={{
      backgroundColor: 'white',
      border: '1px solid #F7D9EB',
      borderRadius: '12px',
      padding: '1.25rem',
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      display: 'flex',
      gap: '1.5rem',
      alignItems: 'flex-start'
    }}>
      {/* Doctor Info Section */}
      <div style={{
        flex: '0 0 200px',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem'
      }}>
        <h4 style={{
          color: '#7C2A62',
          margin: '0 0 0.25rem 0',
          fontSize: '1.1rem',
          fontWeight: '600'
        }}>
          {doctor.name}
        </h4>
        
        <p style={{
          color: '#666',
          margin: '0 0 0.5rem 0',
          fontSize: '0.9rem'
        }}>
          {doctor.specialty}
        </p>
        
        {/* Star Rating */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.25rem',
          marginBottom: '0.5rem'
        }}>
          <span style={{ 
            color: '#FFD700', 
            fontSize: '1rem',
            letterSpacing: '1px'
          }}>
            {'★'.repeat(5)}
          </span>
          <span style={{
            color: '#666',
            fontSize: '0.85rem',
            marginLeft: '0.25rem'
          }}>
            (5)
          </span>
        </div>
      </div>

      {/* Doctor Details Section */}
      <div style={{
        flex: '1',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '0.75rem',
          fontSize: '0.9rem'
        }}>
          <div>
            <strong style={{ color: '#7C2A62' }}>Experience:</strong>
            <span style={{ marginLeft: '0.5rem', color: '#333' }}>
              {doctor.experience || '15 years'}
            </span>
          </div>
          
          <div>
            <strong style={{ color: '#7C2A62' }}>Languages:</strong>
            <span style={{ marginLeft: '0.5rem', color: '#333' }}>
              {doctor.languages || 'English, Telugu'}
            </span>
          </div>
          
          <div>
            <strong style={{ color: '#7C2A62' }}>Consultation Fee:</strong>
            <span style={{ marginLeft: '0.5rem', color: '#333' }}>
              {doctor.fee || '¥730'}
            </span>
          </div>
          
          <div>
            <strong style={{ color: '#7C2A62' }}>Available Slots:</strong>
            <span style={{ marginLeft: '0.5rem', color: '#333' }}>
              {doctor.availableSlots || '6 slots'}
            </span>
          </div>
        </div>

        {/* Action Buttons - Aligned to right edge */}
        <div style={{
          display: 'flex',
          gap: '0.75rem',
          marginTop: '0.5rem',
          justifyContent: 'flex-end' // This aligns buttons to the right
        }}>
          <button
            onClick={() => handleBookAppointment(doctor)}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#7C2A62',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '0.85rem',
              fontWeight: '500',
              minWidth: '140px' // Fixed width for consistent alignment
            }}
            type="button"
          >
            Book Appointment
          </button>
          
          <button
            onClick={() => startDoctorChat(doctor)}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: 'white',
              color: '#7C2A62',
              border: '1px solid #7C2A62',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '0.85rem',
              fontWeight: '500',
              minWidth: '140px' // Fixed width for consistent alignment
            }}
            type="button"
          >
            Send Message
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{
      marginTop: '140px',
      padding: '2rem',
      maxWidth: '1400px',
      marginLeft: 'auto',
      marginRight: 'auto'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        marginBottom: '2rem'
      }}>
        <BackButton onClick={handleBackToAppointments} text="Back to Appointments" />
        <div style={{
          textAlign: 'center',
          marginBottom: '2rem',
          flex: 1
        }}>
          <h2 style={{
            color: '#7C2A62',
            fontSize: '1.5rem',
            margin: 0
          }}>Doctor Consultation</h2>
          <p style={{
            fontSize: '1.1rem',
            color: '#666',
            marginTop: '0.5rem'
          }}>
            Connect with certified doctors for online consultations
          </p>
        </div>
      </div>

      <div style={{
        backgroundColor: 'white',
        padding: '1.5rem',
        borderRadius: '15px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        marginBottom: '1.5rem'
      }}>
        {/* Additional line about doctor consultation */}
        <div style={{
          marginBottom: '1rem',
          textAlign: 'center'
        }}>
          <p style={{
            fontSize: '0.95rem',
            color: '#7C2A62',
            margin: 0,
            fontStyle: 'italic',
            fontWeight: '500'
          }}>
            Get expert medical advice from qualified doctors - safe, secure, and convenient online consultations
          </p>
        </div>

        <div style={{
          display: 'flex',
          gap: '0.75rem',
          marginBottom: '0',
          position: 'relative',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          {/* Combined Search Bar and Search Button Group with gap */}
          <div style={{
            display: 'flex',
            gap: '0.5rem',
            alignItems: 'center',
            flex: '0 1 auto'
          }}>
            <input
              type="text"
              placeholder="Search by specialty, doctor name, or condition"
              value={doctorSearchQuery}
              onChange={(e) => setDoctorSearchQuery(e.target.value)}
              style={{
                width: '700px', // Increased width from 300px to 500px
                padding: '0.5rem 0.75rem',
                border: '2px solid #F7D9EB',
                borderRadius: '8px',
                fontSize: '0.9rem',
                transition: 'border-color 0.3s ease',
                height: '38px'
              }}
            />
          </div>
          
          {/* Filters Button */}
          <div style={{ position: 'relative' }}>
            <button 
              style={{
                padding: '0.5rem 1.25rem',
                backgroundColor: 'white',
                color: '#7C2A62',
                border: '2px solid #7C2A62',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.9rem',
                height: '38px',
                whiteSpace: 'nowrap'
              }}
              onClick={() => setShowFilters(!showFilters)}
              type="button"
            >
              <span>Filters</span>
              <span style={{ 
                transform: showFilters ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.3s ease',
                fontSize: '0.8rem'
              }}>
                ▼
              </span>
            </button>
            
            {/* Filters Dropdown */}
            {showFilters && <FiltersDropdown />}
          </div>
        </div>
      </div>

      {/* Close dropdown when clicking outside */}
      {showFilters && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 999
          }}
          onClick={() => setShowFilters(false)}
        />
      )}

      <div style={{
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '15px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <h3 style={{
          color: '#7C2A62',
          marginBottom: '1.5rem',
          fontSize: '1.3rem'
        }}>Available Doctors</h3>
        
        {filteredDoctors.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '3rem',
            color: '#666'
          }}>
            <p>No doctors found matching your criteria</p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gap: '1.25rem'
          }}>
            {filteredDoctors.map(doctor => (
              <CustomDoctorCard 
                key={doctor.id} 
                doctor={doctor}
                handleBookAppointment={handleBookAppointment}
                startDoctorChat={startDoctorChat}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ConsultationView;