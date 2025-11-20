import React from 'react';
import { styles } from './Styles';

const DoctorCard = ({ doctor, handleBookAppointment, startDoctorChat }) => {
  return (
    <div style={styles.doctorCard}>
      <div style={styles.doctorHeader}>
        <div style={styles.doctorImage}>
          {doctor.image}
        </div>
        <div style={styles.doctorBasicInfo}>
          <h4 style={styles.doctorName}>{doctor.name}</h4>
          <p style={styles.doctorSpecialty}>{doctor.specialty}</p>
          <div style={styles.doctorRating}>
            <span style={styles.goldenStars}>
              {'★'.repeat(doctor.rating)}
              {'☆'.repeat(5 - doctor.rating)}
            </span>
            <span style={styles.ratingText}>({doctor.rating}.0)</span>
          </div>
        </div>
      </div>

      <div style={styles.doctorDetails}>
        <div style={styles.doctorDetailItem}>
          <span style={styles.doctorDetailLabel}>Experience:</span>
          <span style={styles.doctorDetailValue}>{doctor.experience}</span>
        </div>
        <div style={styles.doctorDetailItem}>
          <span style={styles.doctorDetailLabel}>Languages:</span>
          <span style={styles.doctorDetailValue}>{doctor.languages.join(', ')}</span>
        </div>
        <div style={styles.doctorDetailItem}>
          <span style={styles.doctorDetailLabel}>Consultation Fee:</span>
          <span style={styles.feeValue}>₹{doctor.consultationFee}</span>
        </div>
      </div>

      <div style={styles.doctorActions}>
        <button 
          style={styles.bookButton}
          onClick={() => {
            const selectedTimeSlot = prompt('Select time slot:\n' + doctor.availableSlots.join('\n'), doctor.availableSlots[0]);
            if (selectedTimeSlot) {
              handleBookAppointment(doctor, selectedTimeSlot);
            }
          }}
          type="button"
        >
          Book Appointment
        </button>
        <button 
          style={styles.messageButton}
          onClick={() => startDoctorChat(doctor)}
          type="button"
        >
          Send Message
        </button>
      </div>
    </div>
  );
};

export default DoctorCard;