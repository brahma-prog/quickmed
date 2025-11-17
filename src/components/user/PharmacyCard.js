import React from 'react';
import { styles } from './Styles';

const PharmacyCard = ({ 
  pharmacy, 
  onViewStore,
  viewPharmacyStore,
  handlePharmacySearch, 
  pharmacySearchQueries,
  startDoctorChat 
}) => {
  // Safe access to pharmacy properties with fallbacks
  const {
    id = Math.random(),
    name = 'Unknown Pharmacy',
    distance = 'N/A',
    deliveryTime = 'N/A',
    rating = 0,
    medicines = []
  } = pharmacy || {};

  // Use onViewStore if provided, otherwise use viewPharmacyStore
  const handleViewStore = () => {
    if (onViewStore) {
      onViewStore(pharmacy);
    } else if (viewPharmacyStore) {
      viewPharmacyStore(pharmacy);
    }
  };

  return (
    <div key={id} style={styles.pharmacyCard}>
      <div style={styles.pharmacyHeader}>
        <div style={styles.pharmacyIcon}>🏪</div>
        <div style={styles.pharmacyInfo}>
          <h3 style={styles.pharmacyName}>{name}</h3>
          <div style={styles.pharmacyRating}>
            <span style={styles.ratingText}>⭐ {rating || 'N/A'}</span>
          </div>
        </div>
      </div>
      
      <div style={styles.pharmacyDetails}>
        <div style={styles.pharmacyDetailItem}>
          <span style={styles.pharmacyDetailLabel}>Distance:</span>
          <span style={styles.pharmacyDetailValue}>{distance}</span>
        </div>
        <div style={styles.pharmacyDetailItem}>
          <span style={styles.pharmacyDetailLabel}>Delivery Time:</span>
          <span style={styles.pharmacyDetailValue}>{deliveryTime}</span>
        </div>
        <div style={styles.pharmacyDetailItem}>
          <span style={styles.pharmacyDetailLabel}>Medicines Available:</span>
          <span style={styles.pharmacyDetailValue}>{medicines.length}</span>
        </div>
      </div>
      
      {/* Search Bar for Individual Pharmacy */}
      {handlePharmacySearch && (
        <div style={styles.pharmacySearchContainer}>
          <input
            type="text"
            placeholder={`Search medicines in ${name}...`}
            value={pharmacySearchQueries?.[id] || ''}
            onChange={(e) => handlePharmacySearch(id, e.target.value)}
            style={styles.pharmacySearchInputSmall}
          />
        </div>
      )}
      
      <button 
        style={styles.viewStoreButton}
        onClick={handleViewStore}
        type="button"
      >
        View Store
      </button>
    </div>
  );
};

export default PharmacyCard;