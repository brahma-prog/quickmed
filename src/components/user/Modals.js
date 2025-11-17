import React, { useState, useEffect, useRef, useMemo } from 'react';
import { styles } from './Styles';

const Modals = ({
  showCheckoutConfirm,
  showPrescriptionModal,
  showPharmacyStore,
  showAppointmentDetails,
  showDoctorChat,
  showLogoutConfirm,
  showProfilePhotoModal,
  selectedPharmacy,
  selectedAppointment,
  activeDoctorChat,
  doctorChats,
  prescriptionFile,
  prescriptionPreview,
  profilePhotoFile,
  profilePhotoPreview,
  profile,
  cart,
  getTotalPrice,
  paymentLoading,
  getFilteredPharmacyMedicines,
  pharmacySearchQueries,
  handlePharmacySearch,
  addToCartFromPharmacy,
  updateQuantity,
  setShowPharmacyStore,
  setShowAppointmentDetails,
  setShowDoctorChat,
  setShowCheckoutConfirm,
  setShowPrescriptionModal,
  setShowLogoutConfirm,
  setShowProfilePhotoModal,
  handlePrescriptionUpload,
  handlePrescriptionSubmit,
  handleConfirmCheckout,
  handleCancelCheckout,
  confirmLogout,
  cancelLogout,
  handleProfilePhotoSubmit,
  removeProfilePhoto,
  sendDoctorMessage,
  setPrescriptionFile,
  setPrescriptionPreview,
  setProfilePhotoFile,
  setProfilePhotoPreview,
  handleProfilePhotoUpload,
  setActiveView
}) => {
  // Refs for click outside detection
  const checkoutModalRef = useRef(null);
  const prescriptionModalRef = useRef(null);
  const pharmacyStoreModalRef = useRef(null);
  const appointmentModalRef = useRef(null);
  const doctorChatModalRef = useRef(null);
  const logoutModalRef = useRef(null);
  const profilePhotoModalRef = useRef(null);

  // Click outside handler for all modals
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Checkout Confirmation Modal
      if (showCheckoutConfirm && 
          checkoutModalRef.current && 
          !checkoutModalRef.current.contains(event.target)) {
        setShowCheckoutConfirm(false);
      }

      // Prescription Upload Modal
      if (showPrescriptionModal && 
          prescriptionModalRef.current && 
          !prescriptionModalRef.current.contains(event.target)) {
        setShowPrescriptionModal(false);
        setPrescriptionFile(null);
        setPrescriptionPreview(null);
      }

      // Pharmacy Store Modal
      if (showPharmacyStore && 
          pharmacyStoreModalRef.current && 
          !pharmacyStoreModalRef.current.contains(event.target)) {
        setShowPharmacyStore(false);
      }

      // Appointment Details Modal
      if (showAppointmentDetails && 
          appointmentModalRef.current && 
          !appointmentModalRef.current.contains(event.target)) {
        setShowAppointmentDetails(false);
      }

      // Doctor Chat Modal
      if (showDoctorChat && 
          doctorChatModalRef.current && 
          !doctorChatModalRef.current.contains(event.target)) {
        setShowDoctorChat(false);
      }

      // Logout Confirmation Modal
      if (showLogoutConfirm && 
          logoutModalRef.current && 
          !logoutModalRef.current.contains(event.target)) {
        setShowLogoutConfirm(false);
      }

      // Profile Photo Modal
      if (showProfilePhotoModal && 
          profilePhotoModalRef.current && 
          !profilePhotoModalRef.current.contains(event.target)) {
        setShowProfilePhotoModal(false);
        setProfilePhotoFile(null);
        setProfilePhotoPreview(profile.profilePhoto);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [
    showCheckoutConfirm,
    showPrescriptionModal,
    showPharmacyStore,
    showAppointmentDetails,
    showDoctorChat,
    showLogoutConfirm,
    showProfilePhotoModal,
    setShowCheckoutConfirm,
    setShowPrescriptionModal,
    setShowPharmacyStore,
    setShowAppointmentDetails,
    setShowDoctorChat,
    setShowLogoutConfirm,
    setShowProfilePhotoModal,
    setPrescriptionFile,
    setPrescriptionPreview,
    setProfilePhotoFile,
    setProfilePhotoPreview,
    profile.profilePhoto
  ]);

  // Doctor Chat Modal Component
  const DoctorChatModal = () => {
    const [message, setMessage] = useState('');
    const chatEndRef = useRef(null);

    const activeDoctorId = activeDoctorChat?.id;
    const currentChat = useMemo(() => {
      if (!activeDoctorId) return [];
      return doctorChats[activeDoctorId] || [];
    }, [activeDoctorId, doctorChats]);

    useEffect(() => {
      if (chatEndRef.current) {
        chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, [currentChat]);

    const handleSendMessage = () => {
      if (!message.trim()) return;
      sendDoctorMessage(activeDoctorChat.id, message);
      setMessage('');
    };

    const handleKeyPress = (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSendMessage();
      }
    };

    return (
      <div style={styles.modalOverlay}>
        <div style={styles.doctorChatModal} ref={doctorChatModalRef}>
          <div style={styles.doctorChatHeader}>
            <div style={styles.doctorChatInfo}>
              <div style={styles.doctorImageSmall}>
                {activeDoctorChat?.image}
              </div>
              <div>
                <h3 style={styles.doctorChatName}>{activeDoctorChat?.name}</h3>
                <p style={styles.doctorChatSpecialty}>{activeDoctorChat?.specialty}</p>
              </div>
            </div>
            <div style={styles.doctorChatActions}>
              <button 
                style={styles.closeModalButton}
                onClick={() => setShowDoctorChat(false)}
                type="button"
              >
                ×
              </button>
            </div>
          </div>

          <div style={styles.doctorChatMessages}>
            {currentChat.map(chatMessage => (
              <div
                key={chatMessage.id}
                style={{
                  ...styles.chatMessage,
                  ...styles[`${chatMessage.sender}Message`]
                }}
              >
                <div style={{
                  ...styles.messageBubble,
                  ...styles[`${chatMessage.sender}MessageBubble`]
                }}>
                  {chatMessage.text}
                </div>
                <span style={styles.messageTime}>
                  {chatMessage.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          <div style={styles.doctorChatInputContainer}>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message to the doctor..."
              style={styles.doctorChatInput}
              autoFocus
            />
            <button 
              style={styles.sendButton}
              onClick={handleSendMessage}
              type="button"
              disabled={!message.trim()}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Checkout Confirmation Modal
  const CheckoutConfirmation = () => (
    <div style={styles.modalOverlay}>
      <div style={styles.confirmationModal} ref={checkoutModalRef}>
        <h3 style={styles.confirmationTitle}>Confirm Checkout</h3>
        <p style={styles.confirmationText}>
          You are about to proceed with your order. Total amount: <strong>₹{getTotalPrice()}</strong>
        </p>
        
        <div style={styles.confirmationItems}>
          {cart.map(item => (
            <div key={item.id} style={styles.confirmationItem}>
              <span>{item.name}</span>
              <span>₹{item.price} × {item.quantity}</span>
            </div>
          ))}
        </div>

        <div style={styles.confirmationActions}>
          <button 
            style={styles.cancelButton}
            onClick={handleCancelCheckout}
            disabled={paymentLoading}
            type="button"
          >
            Cancel
          </button>
          <button 
            style={styles.confirmButton}
            onClick={handleConfirmCheckout}
            disabled={paymentLoading}
            type="button"
          >
            {paymentLoading ? 'Processing...' : 'Proceed to Payment'}
          </button>
        </div>
      </div>
    </div>
  );

  // Prescription Upload Modal
  const PrescriptionUploadModal = () => (
    <div style={styles.modalOverlay}>
      <div style={styles.prescriptionModal} ref={prescriptionModalRef}>
        <h3 style={styles.modalTitle}>Upload Prescription</h3>
        
        <div style={styles.prescriptionPreview}>
          {prescriptionPreview ? (
            <div style={styles.prescriptionImageContainer}>
              <img 
                src={prescriptionPreview} 
                alt="Prescription preview" 
                style={styles.prescriptionImage}
              />
              <div style={styles.fileInfoOverlay}>
                <span style={styles.fileIcon}>📄</span>
                <div>
                  <p style={styles.fileName}>{prescriptionFile.name}</p>
                  <p style={styles.fileSize}>
                    {(prescriptionFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
            </div>
          ) : prescriptionFile ? (
            <div style={styles.fileInfo}>
              <span style={styles.fileIcon}>📄</span>
              <div>
                <p style={styles.fileName}>{prescriptionFile.name}</p>
                <p style={styles.fileSize}>
                  {(prescriptionFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
          ) : (
            <div style={styles.uploadPrompt}>
              <div style={styles.uploadIconLarge}>📎</div>
              <p style={styles.uploadText}>No file selected</p>
              <p style={styles.uploadSubtext}>Supported formats: JPG, PNG, PDF (Max 5MB)</p>
            </div>
          )}
        </div>

        <div style={styles.prescriptionRequirements}>
          <h4 style={styles.requirementsTitle}>Prescription Requirements:</h4>
          <ul style={styles.requirementsList}>
            <li>Clear image of your doctor's prescription</li>
            <li>All text should be readable</li>
            <li>Doctor's signature and stamp should be visible</li>
            <li>Supported formats: JPG, PNG, PDF</li>
            <li>Maximum file size: 5MB</li>
          </ul>
        </div>

        <div style={styles.modalActions}>
          <label style={styles.uploadButton}>
            <span style={styles.uploadIcon}>📎</span>
            {prescriptionFile ? 'Change File' : 'Choose File'}
            <input
              type="file"
              accept=".jpg,.jpeg,.png,.pdf"
              onChange={handlePrescriptionUpload}
              style={{ display: 'none' }}
            />
          </label>
          <button 
            style={styles.submitButton}
            onClick={handlePrescriptionSubmit}
            disabled={!prescriptionFile}
            type="button"
          >
            Upload Prescription
          </button>
          <button 
            style={styles.cancelButton}
            onClick={() => {
              setShowPrescriptionModal(false);
              setPrescriptionFile(null);
              setPrescriptionPreview(null);
            }}
            type="button"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  // Logout Confirmation Modal
  const LogoutConfirmation = () => (
    <div style={styles.modalOverlay}>
      <div style={styles.logoutConfirmationModal} ref={logoutModalRef}>
        <div style={styles.logoutConfirmationIcon}></div>
        <h3 style={styles.logoutConfirmationTitle}>Confirm Logout</h3>
        <p style={styles.logoutConfirmationText}>
          Are you sure you want to logout from your QuickMed account?
        </p>
        <div style={styles.logoutConfirmationActions}>
          <button 
            style={styles.logoutCancelButton}
            onClick={cancelLogout}
            type="button"
          >
            Cancel
          </button>
          <button 
            style={styles.logoutConfirmButton}
            onClick={confirmLogout}
            type="button"
          >
            Yes, Logout
          </button>
        </div>
      </div>
    </div>
  );

  // Profile Photo Upload Modal
  const ProfilePhotoModal = () => (
    <div style={styles.modalOverlay}>
      <div style={styles.profilePhotoModal} ref={profilePhotoModalRef}>
        <div style={styles.profilePhotoHeader}>
          <h3 style={styles.modalTitle}>Update Profile Photo</h3>
          <button 
            style={styles.closeModalButton}
            onClick={() => {
              setShowProfilePhotoModal(false);
              setProfilePhotoFile(null);
              setProfilePhotoPreview(profile.profilePhoto);
            }}
            type="button"
          >
            ×
          </button>
        </div>
        
        <div style={styles.profilePhotoPreviewSection}>
          {profilePhotoPreview ? (
            <div style={styles.profilePhotoImageContainer}>
              <img 
                src={profilePhotoPreview} 
                alt="Profile preview" 
                style={styles.profilePhotoImage}
              />
            </div>
          ) : (
            <div style={styles.uploadPrompt}>
              <div style={styles.uploadIconLarge}>👤</div>
              <p style={styles.uploadText}>No photo selected</p>
              <p style={styles.uploadSubtext}>Supported formats: JPG, PNG (Max 5MB)</p>
            </div>
          )}
        </div>

        <div style={styles.profilePhotoRequirements}>
          <h4 style={styles.requirementsTitle}>Photo Requirements:</h4>
          <ul style={styles.requirementsList}>
            <li>Clear, recent photo of yourself</li>
            <li>Face should be clearly visible</li>
            <li>Supported formats: JPG, PNG</li>
            <li>Maximum file size: 5MB</li>
          </ul>
        </div>

        <div style={styles.modalActions}>
          <label style={styles.uploadButton}>
            <span style={styles.uploadIcon}>📷</span>
            {profilePhotoFile ? 'Change Photo' : 'Choose Photo'}
            <input
              type="file"
              accept="image/*"
              onChange={handleProfilePhotoUpload}
              style={{ display: 'none' }}
            />
          </label>
          {profile.profilePhoto && (
            <button 
              style={styles.removePhotoButton}
              onClick={removeProfilePhoto}
              type="button"
            >
              Remove Current Photo
            </button>
          )}
          <button 
            style={styles.submitButton}
            onClick={handleProfilePhotoSubmit}
            disabled={!profilePhotoFile}
            type="button"
          >
            Update Profile Photo
          </button>
          <button 
            style={styles.cancelButton}
            onClick={() => {
              setShowProfilePhotoModal(false);
              setProfilePhotoFile(null);
              setProfilePhotoPreview(profile.profilePhoto);
            }}
            type="button"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  // Pharmacy Store Modal
  const PharmacyStoreModal = () => {
    const filteredMedicines = getFilteredPharmacyMedicines(selectedPharmacy);
    const searchQuery = pharmacySearchQueries[selectedPharmacy?.id] || '';

    // Medicine Card with Quantity Controls for Pharmacy Store
    const PharmacyMedicineCard = ({ medicine }) => {
      const cartItem = cart.find(item => item.id === medicine.id);
      const quantity = cartItem ? cartItem.quantity : 0;

      return (
        <div style={styles.medicineItem}>
          <div style={styles.medicineInfo}>
            <h5 style={styles.medicineName}>{medicine.name}</h5>
            <p style={styles.medicineCategory}>{medicine.category}</p>
            <p style={styles.medicinePrice}>₹{medicine.price}</p>
          </div>
          <div style={styles.quantityControls}>
            {quantity > 0 ? (
              <>
                <button 
                  style={styles.quantityButton}
                  onClick={() => updateQuantity(medicine.id, quantity - 1)}
                  type="button"
                >
                  −
                </button>
                <span style={styles.quantity}>{quantity}</span>
                <button 
                  style={styles.quantityButton}
                  onClick={() => updateQuantity(medicine.id, quantity + 1)}
                  type="button"
                >
                  +
                </button>
              </>
            ) : (
              <button 
                style={styles.addToCartPharmacyButton}
                onClick={() => addToCartFromPharmacy(medicine)}
                type="button"
              >
                Add to Cart
              </button>
            )}
          </div>
        </div>
      );
    };

    return (
      <div style={styles.modalOverlay}>
        <div style={styles.pharmacyStoreModal} ref={pharmacyStoreModalRef}>
          <div style={styles.pharmacyStoreHeader}>
            <h3 style={styles.modalTitle}>{selectedPharmacy?.name}</h3>
            <button 
              style={styles.closeModalButton}
              onClick={() => setShowPharmacyStore(false)}
              type="button"
            >
              ×
            </button>
          </div>
          
          <div style={styles.pharmacyInfoSection}>
            <div style={styles.pharmacyDetailsSection}>
              <p style={styles.pharmacyDistance}>📍 {selectedPharmacy?.distance} away</p>
              <p style={styles.pharmacyDelivery}>🚚 Delivery: {selectedPharmacy?.deliveryTime}</p>
              <p style={styles.pharmacyRatingText}>⭐ {selectedPharmacy?.rating} Rating</p>
            </div>
          </div>

          {/* Search Bar for Pharmacy Medicines */}
          <div style={styles.pharmacySearchSection}>
            <input
              type="text"
              placeholder="Search for medicines in this pharmacy..."
              value={searchQuery}
              onChange={(e) => handlePharmacySearch(selectedPharmacy.id, e.target.value)}
              style={styles.pharmacySearchInput}
            />
          </div>

          <div style={styles.pharmacyMedicines}>
            <h4 style={styles.medicinesTitle}>Available Medicines</h4>
            <div style={styles.medicinesGrid}>
              {filteredMedicines.length === 0 ? (
                <div style={styles.noMedicinesFound}>
                  <p>No medicines found matching your search.</p>
                </div>
              ) : (
                filteredMedicines.map(medicine => (
                  <PharmacyMedicineCard key={medicine.id} medicine={medicine} />
                ))
              )}
            </div>
          </div>

          <div style={styles.pharmacyActions}>
            <button 
              style={styles.viewCartButton}
              onClick={() => {
                setShowPharmacyStore(false);
                setActiveView('cart');
              }}
              type="button"
            >
              View Cart ({cart.length})
            </button>
            <button 
              style={styles.backToPharmaciesButton}
              onClick={() => setShowPharmacyStore(false)}
              type="button"
            >
              Back to Pharmacies
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Appointment Details Modal
  const AppointmentDetailsModal = () => (
    <div style={styles.modalOverlay}>
      <div style={styles.appointmentDetailsModal} ref={appointmentModalRef}>
        <div style={styles.appointmentDetailsHeader}>
          <h3 style={styles.modalTitle}>Appointment Details</h3>
          <button 
            style={styles.closeModalButton}
            onClick={() => setShowAppointmentDetails(false)}
            type="button"
          >
            ×
          </button>
        </div>

        <div style={styles.appointmentDetailsContent}>
          <div style={styles.detailSection}>
            <h4 style={styles.detailSectionTitle}>Basic Information</h4>
            <div style={styles.detailGrid}>
              <div style={styles.detailItem}>
                <span style={styles.detailLabel}>Appointment ID:</span>
                <span style={styles.detailValue}>{selectedAppointment?.id}</span>
              </div>
              <div style={styles.detailItem}>
                <span style={styles.detailLabel}>Doctor:</span>
                <span style={styles.detailValue}>{selectedAppointment?.doctorName}</span>
              </div>
              <div style={styles.detailItem}>
                <span style={styles.detailLabel}>Specialty:</span>
                <span style={styles.detailValue}>{selectedAppointment?.specialty}</span>
              </div>
              <div style={styles.detailItem}>
                <span style={styles.detailLabel}>Date & Time:</span>
                <span style={styles.detailValue}>{selectedAppointment?.date} at {selectedAppointment?.time}</span>
              </div>
              <div style={styles.detailItem}>
                <span style={styles.detailLabel}>Type:</span>
                <span style={styles.detailValue}>{selectedAppointment?.type}</span>
              </div>
              <div style={styles.detailItem}>
                <span style={styles.detailLabel}>Fee:</span>
                <span style={styles.detailValue}>₹{selectedAppointment?.fee}</span>
              </div>
              <div style={styles.detailItem}>
                <span style={styles.detailLabel}>Status:</span>
                <span style={{
                  ...styles.statusBadge,
                  backgroundColor: 
                    selectedAppointment?.status === 'Scheduled' ? '#4CAF50' :
                    selectedAppointment?.status === 'Completed' ? '#2196F3' :
                    selectedAppointment?.status === 'Cancelled' ? '#FF6B6B' :
                    selectedAppointment?.status === 'Rescheduled' ? '#FF9800' :
                    selectedAppointment?.status === 'Pending' ? '#FFC107' : '#9E9E9E'
                }}>
                  {selectedAppointment?.status}
                </span>
              </div>
            </div>
          </div>

          <div style={styles.detailSection}>
            <h4 style={styles.detailSectionTitle}>Patient Details</h4>
            <div style={styles.detailGrid}>
              <div style={styles.detailItem}>
                <span style={styles.detailLabel}>Patient Name:</span>
                <span style={styles.detailValue}>{selectedAppointment?.details.patientName}</span>
              </div>
              <div style={styles.detailItem}>
                <span style={styles.detailLabel}>Symptoms:</span>
                <span style={styles.detailValue}>{selectedAppointment?.details.symptoms}</span>
              </div>
              <div style={styles.detailItem}>
                <span style={styles.detailLabel}>Notes:</span>
                <span style={styles.detailValue}>{selectedAppointment?.details.notes}</span>
              </div>
              <div style={styles.detailItem}>
                <span style={styles.detailLabel}>Prescription:</span>
                <span style={styles.detailValue}>{selectedAppointment?.details.prescription}</span>
              </div>
            </div>
          </div>
        </div>

        <div style={styles.appointmentDetailsActions}>
          <button 
            style={styles.closeDetailsButton}
            onClick={() => setShowAppointmentDetails(false)}
            type="button"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {showCheckoutConfirm && <CheckoutConfirmation />}
      {showPrescriptionModal && <PrescriptionUploadModal />}
      {showPharmacyStore && <PharmacyStoreModal />}
      {showAppointmentDetails && <AppointmentDetailsModal />}
      {showDoctorChat && <DoctorChatModal />}
      {showLogoutConfirm && <LogoutConfirmation />}
      {showProfilePhotoModal && <ProfilePhotoModal />}
    </>
  );
};

export default Modals;