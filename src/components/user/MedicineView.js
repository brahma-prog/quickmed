import React from 'react';
import { styles } from './Styles';
import MedicineCard from './MedicineCard';
import PharmacyCard from './PharmacyCard';

const MedicineView = ({ 
  searchQuery, 
  setSearchQuery, 
  filteredMedicines, 
  pharmacies, 
  setActiveView, 
  addToCart, 
  updateQuantity, 
  cart, 
  handlePrescriptionUpload, 
  viewPharmacyStore,
  handlePharmacySearch,
  pharmacySearchQueries,
  startDoctorChat 
}) => {
  
  // Safe access to pharmacies array
  const safePharmacies = Array.isArray(pharmacies) ? pharmacies : [];

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
    <div style={styles.medicineLayout}>
      {/* Header with Back Button */}
      <div style={styles.pageHeader}>
        <BackButton onClick={() => setActiveView('dashboard')} text="" />
        <h2 style={styles.sectionTitle}>Medicine Delivery</h2>
      </div>

      <div style={styles.fullWidthContent}>
        {/* Search and Prescription Section */}
        <section style={styles.searchSection}>
          <div style={styles.searchContainer}>
            <input
              type="text"
              placeholder="Search for medicines, vendors, or categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={styles.searchInput}
            />
            <label style={styles.prescriptionUploadLabel}>
              <span style={styles.uploadIcon}>📄</span>
              Upload Prescription
              <input
                type="file"
                id="prescription-upload"
                accept=".jpg,.jpeg,.png,.pdf"
                onChange={handlePrescriptionUpload}
                style={{ display: 'none' }}
              />
            </label>
          </div>
          {/* Additional Upload Hint */}
          <p style={styles.uploadHint}>Supported formats: JPG, PNG, PDF (Max 5MB)</p>
        </section>

        {/* Medicines Section */}
        <section style={styles.productsSection}>
          <div style={styles.sectionHeader}>
            <h3 style={styles.sectionTitle}>Available Medicines</h3>
            <p style={styles.resultsCount}>{filteredMedicines.length} products found</p>
          </div>
          
          {filteredMedicines.length > 0 ? (
            <div style={styles.productsGrid}>
              {filteredMedicines.map(medicine => (
                <MedicineCard 
                  key={medicine.id} 
                  medicine={medicine}
                  cart={cart}
                  addToCart={addToCart}
                  updateQuantity={updateQuantity}
                />
              ))}
            </div>
          ) : (
            <div style={styles.noResults}>
              <p>No medicines found matching your search.</p>
              <p style={styles.noResultsHint}>Try different keywords or check the pharmacies section.</p>
            </div>
          )}
        </section>

        {/* Pharmacies Section */}
        <section style={styles.pharmaciesSection}>
          <div style={styles.sectionHeader}>
            <h3 style={styles.sectionTitle}>Nearby Medical Shops</h3>
            <p style={styles.sectionSubtitle}>Fast delivery from trusted pharmacies</p>
          </div>
          
          {safePharmacies.length > 0 ? (
            <div style={styles.pharmaciesGrid}>
              {safePharmacies.map((pharmacy, index) => (
                <PharmacyCard
                  key={pharmacy?.id || index}
                  pharmacy={pharmacy}
                  viewPharmacyStore={viewPharmacyStore}
                  handlePharmacySearch={handlePharmacySearch}
                  pharmacySearchQueries={pharmacySearchQueries}
                  startDoctorChat={startDoctorChat}
                />
              ))}
            </div>
          ) : (
            <div style={styles.noResults}>
              <p>No pharmacies found nearby.</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default MedicineView;