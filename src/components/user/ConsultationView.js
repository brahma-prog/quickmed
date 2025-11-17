import React from 'react';
import DoctorCard from './DoctorCard';
import { styles } from './Styles';

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
  const BackButton = ({ onClick, text = 'Back' }) => (
    <button 
      style={styles.backButton}
      onClick={onClick}
      type="button"
    >
      ← {text}
    </button>
  );

  return (
    <div style={styles.consultationContainer}>
      <div style={styles.pageHeader}>
        <BackButton onClick={() => setActiveView('appointments')} text="Back to Appointments" />
        <div style={styles.consultationHeader}>
          <h2 style={styles.sectionTitle}>Doctor Consultation</h2>
          <p style={styles.consultationSubtitle}>
            Connect with certified doctors for online consultations
          </p>
        </div>
      </div>

      <div style={styles.searchSection}>
        <div style={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search by specialty or doctor"
            value={doctorSearchQuery}
            onChange={(e) => setDoctorSearchQuery(e.target.value)}
            style={styles.searchInput}
          />
          <button style={styles.searchButton} type="button">Search</button>
        </div>
      </div>

      <div style={styles.consultationLayout}>
        <div style={styles.filterPanel}>
          <h3 style={styles.filterTitle}>Filters</h3>
          
          <div style={styles.filterGroup}>
            <label style={styles.filterLabel}>Specialty</label>
            <select 
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              style={styles.filterSelect}
            >
              <option value="">All Specialties</option>
              {specialties.map(specialty => (
                <option key={specialty} value={specialty}>{specialty}</option>
              ))}
            </select>
          </div>

          <div style={styles.filterGroup}>
            <label style={styles.filterLabel}>Time Slot</label>
            <select 
              value={selectedTimeSlot}
              onChange={(e) => setSelectedTimeSlot(e.target.value)}
              style={styles.filterSelect}
            >
              <option value="">All Time Slots</option>
              {allTimeSlots.map(slot => (
                <option key={slot} value={slot}>{slot}</option>
              ))}
            </select>
          </div>

          <button 
            style={styles.clearFiltersButton}
            onClick={() => {
              setSelectedSpecialty('');
              setSelectedTimeSlot('');
              setSelectedExperience('');
              setSelectedLanguage('');
            }}
            type="button"
          >
            Clear Filters
          </button>
        </div>

        <div style={styles.doctorsList}>
          <h3 style={styles.doctorsTitle}>Available Doctors</h3>
          
          {filteredDoctors.length === 0 ? (
            <div style={styles.noDoctors}>
              <p>No doctors found matching your criteria</p>
            </div>
          ) : (
            <div style={styles.doctorsGrid}>
              {filteredDoctors.map(doctor => (
                <DoctorCard 
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
    </div>
  );
};

export default ConsultationView;