import React, { useState, useCallback } from 'react';
import { styles } from './VendorStyles';

// Separate Modal Components to prevent re-renders
const AddMedicineModal = ({ show, onClose, onAdd, newMedicine, setNewMedicine }) => {
  const [formErrors, setFormErrors] = useState({});

  const validateField = (fieldName, value) => {
    let error = '';
    
    switch (fieldName) {
      case 'name':
        if (!value.trim()) {
          error = 'Medicine name is required';
        }
        break;
      case 'category':
        if (!value.trim()) {
          error = 'Category is required';
        }
        break;
      case 'quantity':
        if (!value || parseInt(value) < 0) {
          error = 'Valid quantity is required';
        }
        break;
      case 'minStock':
        if (!value || parseInt(value) < 0) {
          error = 'Valid minimum stock is required';
        }
        break;
      case 'price':
        if (!value || parseFloat(value) < 0) {
          error = 'Valid price is required';
        }
        break;
      case 'expiryDate':
        if (!value) {
          error = 'Expiry date is required';
        } else {
          const expiryDate = new Date(value);
          const today = new Date();
          if (expiryDate <= today) {
            error = 'Expiry date must be in the future';
          }
        }
        break;
      case 'supplier':
        if (!value.trim()) {
          error = 'Supplier is required';
        }
        break;
      case 'batchNo':
        if (!value.trim()) {
          error = 'Batch number is required';
        }
        break;
      default:
        break;
    }
    
    return error;
  };

  const validateForm = () => {
    const errors = {};
    
    errors.name = validateField('name', newMedicine.name);
    errors.category = validateField('category', newMedicine.category);
    errors.quantity = validateField('quantity', newMedicine.quantity);
    errors.minStock = validateField('minStock', newMedicine.minStock);
    errors.price = validateField('price', newMedicine.price);
    errors.expiryDate = validateField('expiryDate', newMedicine.expiryDate);
    errors.supplier = validateField('supplier', newMedicine.supplier);
    errors.batchNo = validateField('batchNo', newMedicine.batchNo);
    
    setFormErrors(errors);
    
    return !Object.values(errors).some(error => error);
  };

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setNewMedicine(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  }, [setNewMedicine, formErrors]);

  const handleAddClick = () => {
    if (validateForm()) {
      onAdd();
    }
  };

  if (!show) return null;

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modal}>
        <div style={styles.modalHeader}>
          <h3 style={styles.modalTitle}>Add New Medicine</h3>
          <button 
            style={styles.closeButton}
            onClick={onClose}
          >
            ✕
          </button>
        </div>
        <div style={styles.modalContent}>
          <div style={styles.formRow}>
            <label style={styles.label}>Medicine Name *</label>
            <input
              type="text"
              name="name"
              style={{
                ...styles.input,
                ...(formErrors.name && styles.inputError)
              }}
              value={newMedicine.name}
              onChange={handleChange}
              placeholder="Enter medicine name"
            />
            {formErrors.name && <div style={styles.errorText}>{formErrors.name}</div>}
          </div>
          <div style={styles.formRow}>
            <label style={styles.label}>Category *</label>
            <input
              type="text"
              name="category"
              style={{
                ...styles.input,
                ...(formErrors.category && styles.inputError)
              }}
              value={newMedicine.category}
              onChange={handleChange}
              placeholder="Enter category"
            />
            {formErrors.category && <div style={styles.errorText}>{formErrors.category}</div>}
          </div>
          <div style={styles.formGrid}>
            <div style={styles.formRow}>
              <label style={styles.label}>Quantity *</label>
              <input
                type="number"
                name="quantity"
                style={{
                  ...styles.input,
                  ...(formErrors.quantity && styles.inputError)
                }}
                value={newMedicine.quantity}
                onChange={handleChange}
                min="0"
              />
              {formErrors.quantity && <div style={styles.errorText}>{formErrors.quantity}</div>}
            </div>
            <div style={styles.formRow}>
              <label style={styles.label}>Min Stock *</label>
              <input
                type="number"
                name="minStock"
                style={{
                  ...styles.input,
                  ...(formErrors.minStock && styles.inputError)
                }}
                value={newMedicine.minStock}
                onChange={handleChange}
                min="0"
              />
              {formErrors.minStock && <div style={styles.errorText}>{formErrors.minStock}</div>}
            </div>
          </div>
          <div style={styles.formGrid}>
            <div style={styles.formRow}>
              <label style={styles.label}>Price (₹) *</label>
              <input
                type="number"
                name="price"
                style={{
                  ...styles.input,
                  ...(formErrors.price && styles.inputError)
                }}
                value={newMedicine.price}
                onChange={handleChange}
                min="0"
                step="0.01"
              />
              {formErrors.price && <div style={styles.errorText}>{formErrors.price}</div>}
            </div>
            <div style={styles.formRow}>
              <label style={styles.label}>Expiry Date *</label>
              <input
                type="date"
                name="expiryDate"
                style={{
                  ...styles.input,
                  ...(formErrors.expiryDate && styles.inputError)
                }}
                value={newMedicine.expiryDate}
                onChange={handleChange}
              />
              {formErrors.expiryDate && <div style={styles.errorText}>{formErrors.expiryDate}</div>}
            </div>
          </div>
          <div style={styles.formGrid}>
            <div style={styles.formRow}>
              <label style={styles.label}>Supplier *</label>
              <input
                type="text"
                name="supplier"
                style={{
                  ...styles.input,
                  ...(formErrors.supplier && styles.inputError)
                }}
                value={newMedicine.supplier}
                onChange={handleChange}
                placeholder="Enter supplier name"
              />
              {formErrors.supplier && <div style={styles.errorText}>{formErrors.supplier}</div>}
            </div>
            <div style={styles.formRow}>
              <label style={styles.label}>Batch No *</label>
              <input
                type="text"
                name="batchNo"
                style={{
                  ...styles.input,
                  ...(formErrors.batchNo && styles.inputError)
                }}
                value={newMedicine.batchNo}
                onChange={handleChange}
                placeholder="Enter batch number"
              />
              {formErrors.batchNo && <div style={styles.errorText}>{formErrors.batchNo}</div>}
            </div>
          </div>
          <div style={styles.formRow}>
            <label style={styles.checkboxLabel}>
              <input
                type="checkbox"
                name="prescriptionRequired"
                checked={newMedicine.prescriptionRequired}
                onChange={handleChange}
                style={styles.checkbox}
              />
              Prescription Required
            </label>
          </div>
          <div style={styles.requiredNote}>
            * Required fields
          </div>
        </div>
        <div style={styles.modalActions}>
          <button 
            style={styles.secondaryButton}
            onClick={onClose}
          >
            Cancel
          </button>
          <button 
            style={styles.primaryButton}
            onClick={handleAddClick}
          >
            Add Medicine
          </button>
        </div>
      </div>
    </div>
  );
};

const EditStockModal = ({ show, onClose, onUpdate, editingMedicine, setEditingMedicine }) => {
  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setEditingMedicine(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  }, [setEditingMedicine]);

  if (!show || !editingMedicine) return null;

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modal}>
        <div style={styles.modalHeader}>
          <h3 style={styles.modalTitle}>Update Stock - {editingMedicine.name}</h3>
          <button 
            style={styles.closeButton}
            onClick={onClose}
          >
            ✕
          </button>
        </div>
        <div style={styles.modalContent}>
          <div style={styles.formGrid}>
            <div style={styles.formRow}>
              <label style={styles.label}>Current Quantity</label>
              <input
                type="number"
                name="quantity"
                style={styles.input}
                value={editingMedicine.quantity}
                onChange={handleChange}
                min="0"
              />
            </div>
            <div style={styles.formRow}>
              <label style={styles.label}>Min Stock Level</label>
              <input
                type="number"
                name="minStock"
                style={styles.input}
                value={editingMedicine.minStock}
                onChange={handleChange}
                min="0"
              />
            </div>
          </div>
          <div style={styles.formGrid}>
            <div style={styles.formRow}>
              <label style={styles.label}>Price (₹)</label>
              <input
                type="number"
                name="price"
                style={styles.input}
                value={editingMedicine.price}
                onChange={handleChange}
                min="0"
                step="0.01"
              />
            </div>
            <div style={styles.formRow}>
              <label style={styles.label}>Expiry Date</label>
              <input
                type="date"
                name="expiryDate"
                style={styles.input}
                value={editingMedicine.expiryDate}
                onChange={handleChange}
              />
            </div>
          </div>
          <div style={styles.formRow}>
            <label style={styles.checkboxLabel}>
              <input
                type="checkbox"
                name="prescriptionRequired"
                checked={editingMedicine.prescriptionRequired}
                onChange={handleChange}
                style={styles.checkbox}
              />
              Prescription Required
            </label>
          </div>
        </div>
        <div style={styles.modalActions}>
          <button 
            style={styles.secondaryButton}
            onClick={onClose}
          >
            Cancel
          </button>
          <button 
            style={styles.primaryButton}
            onClick={onUpdate}
          >
            Update Stock
          </button>
        </div>
      </div>
    </div>
  );
};

const ProfileModal = ({ show, onClose, onUpdate, userProfile, setUserProfile, formErrors, validateField }) => {
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setUserProfile(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Validate field on change
    if (validateField) {
      validateField(name, value);
    }
  }, [setUserProfile, validateField]);

  if (!show) return null;

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modal}>
        <div style={styles.modalHeader}>
          <h3 style={styles.modalTitle}>Edit Profile</h3>
          <button 
            style={styles.closeButton}
            onClick={onClose}
          >
            ✕
          </button>
        </div>
        <div style={styles.modalContent}>
          <div style={styles.formGrid}>
            <div style={styles.formRow}>
              <label style={styles.label}>Full Name *</label>
              <input
                type="text"
                name="fullName"
                style={{
                  ...styles.input,
                  ...styles.lockedField,
                  ...(formErrors.fullName && styles.inputError)
                }}
                value={userProfile.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                disabled
                title="Name cannot be changed"
              />
              <div style={styles.lockedNote}>Name cannot be changed</div>
              {formErrors.fullName && <div style={styles.errorText}>{formErrors.fullName}</div>}
            </div>
            <div style={styles.formRow}>
              <label style={styles.label}>Email *</label>
              <input
                type="email"
                name="email"
                style={{
                  ...styles.input,
                  ...styles.lockedField,
                  ...(formErrors.email && styles.inputError)
                }}
                value={userProfile.email}
                onChange={handleChange}
                placeholder="Enter your email"
                disabled
                title="Email cannot be changed"
              />
              <div style={styles.lockedNote}>Email cannot be changed</div>
              {formErrors.email && <div style={styles.errorText}>{formErrors.email}</div>}
            </div>
          </div>
          <div style={styles.formGrid}>
            <div style={styles.formRow}>
              <label style={styles.label}>Phone *</label>
              <input
                type="tel"
                name="phone"
                style={{
                  ...styles.input,
                  ...(formErrors.phone && styles.inputError)
                }}
                value={userProfile.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                maxLength="15"
              />
              {formErrors.phone && <div style={styles.errorText}>{formErrors.phone}</div>}
            </div>
            <div style={styles.formRow}>
              <label style={styles.label}>Pharmacy Name *</label>
              <input
                type="text"
                name="pharmacyName"
                style={{
                  ...styles.input,
                  ...(formErrors.pharmacyName && styles.inputError)
                }}
                value={userProfile.pharmacyName}
                onChange={handleChange}
                placeholder="Enter pharmacy name"
                maxLength="100"
              />
              {formErrors.pharmacyName && <div style={styles.errorText}>{formErrors.pharmacyName}</div>}
            </div>
          </div>
          <div style={styles.formRow}>
            <label style={styles.label}>License Number *</label>
            <input
              type="text"
              name="licenseNumber"
              style={{
                ...styles.input,
                ...(formErrors.licenseNumber && styles.inputError)
              }}
              value={userProfile.licenseNumber}
              onChange={handleChange}
              placeholder="Enter license number"
              maxLength="50"
            />
            {formErrors.licenseNumber && <div style={styles.errorText}>{formErrors.licenseNumber}</div>}
          </div>
          <div style={styles.formRow}>
            <label style={styles.label}>Address *</label>
            <input
              type="text"
              name="address"
              style={{
                ...styles.input,
                ...(formErrors.address && styles.inputError)
              }}
              value={userProfile.address}
              onChange={handleChange}
              placeholder="Enter complete address"
              maxLength="200"
            />
            {formErrors.address && <div style={styles.errorText}>{formErrors.address}</div>}
          </div>
          <div style={styles.formGrid}>
            <div style={styles.formRow}>
              <label style={styles.label}>City *</label>
              <input
                type="text"
                name="city"
                style={{
                  ...styles.input,
                  ...(formErrors.city && styles.inputError)
                }}
                value={userProfile.city}
                onChange={handleChange}
                placeholder="Enter city"
                maxLength="50"
                pattern="[A-Za-z\s]+"
                title="City should contain only letters and spaces"
              />
              {formErrors.city && <div style={styles.errorText}>{formErrors.city}</div>}
            </div>
            <div style={styles.formRow}>
              <label style={styles.label}>State *</label>
              <input
                type="text"
                name="state"
                style={{
                  ...styles.input,
                  ...(formErrors.state && styles.inputError)
                }}
                value={userProfile.state}
                onChange={handleChange}
                placeholder="Enter state"
                maxLength="50"
                pattern="[A-Za-z\s]+"
                title="State should contain only letters and spaces"
              />
              {formErrors.state && <div style={styles.errorText}>{formErrors.state}</div>}
            </div>
            <div style={styles.formRow}>
              <label style={styles.label}>Pincode *</label>
              <input
                type="text"
                name="pincode"
                style={{
                  ...styles.input,
                  ...(formErrors.pincode && styles.inputError)
                }}
                value={userProfile.pincode}
                onChange={handleChange}
                placeholder="Enter pincode"
                maxLength="6"
                pattern="[0-9]{6}"
                title="Pincode should be 6 digits"
              />
              {formErrors.pincode && <div style={styles.errorText}>{formErrors.pincode}</div>}
            </div>
          </div>
          <div style={styles.requiredNote}>
            * Required fields
          </div>
        </div>
        <div style={styles.modalActions}>
          <button 
            style={styles.secondaryButton}
            onClick={onClose}
          >
            Cancel
          </button>
          <button 
            style={styles.primaryButton}
            onClick={onUpdate}
            disabled={Object.keys(formErrors).some(key => formErrors[key])}
          >
            Update Profile
          </button>
        </div>
      </div>
    </div>
  );
};

const NotificationsModal = ({ show, onClose, onSave, notificationSettings, setNotificationSettings }) => {
  const handleChange = useCallback((e) => {
    const { name, checked } = e.target;
    setNotificationSettings(prev => ({
      ...prev,
      [name]: checked
    }));
  }, [setNotificationSettings]);

  if (!show) return null;

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modal}>
        <div style={styles.modalHeader}>
          <h3 style={styles.modalTitle}>Notification Settings</h3>
          <button 
            style={styles.closeButton}
            onClick={onClose}
          >
            ✕
          </button>
        </div>
        <div style={styles.modalContent}>
          <div style={styles.settingsSection}>
            <h4 style={styles.settingsTitle}>Order Notifications</h4>
            <div style={styles.settingItem}>
              <label style={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  name="newOrders"
                  checked={notificationSettings.newOrders}
                  onChange={handleChange}
                  style={styles.checkbox}
                />
                New Orders
              </label>
              <span style={styles.settingDescription}>Get notified when new orders are received</span>
            </div>
            <div style={styles.settingItem}>
              <label style={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  name="orderReady"
                  checked={notificationSettings.orderReady}
                  onChange={handleChange}
                  style={styles.checkbox}
                />
                Order Ready
              </label>
              <span style={styles.settingDescription}>Get notified when orders are ready for pickup/delivery</span>
            </div>
          </div>

          <div style={styles.settingsSection}>
            <h4 style={styles.settingsTitle}>Inventory Notifications</h4>
            <div style={styles.settingItem}>
              <label style={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  name="lowStock"
                  checked={notificationSettings.lowStock}
                  onChange={handleChange}
                  style={styles.checkbox}
                />
                Low Stock Alerts
              </label>
              <span style={styles.settingDescription}>Get notified when medicines are running low</span>
            </div>
            <div style={styles.settingItem}>
              <label style={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  name="expiringMedicines"
                  checked={notificationSettings.expiringMedicines}
                  onChange={handleChange}
                  style={styles.checkbox}
                />
                Expiring Medicines
              </label>
              <span style={styles.settingDescription}>Get notified when medicines are about to expire</span>
            </div>
          </div>

          <div style={styles.settingsSection}>
            <h4 style={styles.settingsTitle}>Prescription Notifications</h4>
            <div style={styles.settingItem}>
              <label style={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  name="prescriptionVerification"
                  checked={notificationSettings.prescriptionVerification}
                  onChange={handleChange}
                  style={styles.checkbox}
                />
                Prescription Verification
              </label>
              <span style={styles.settingDescription}>Get notified when new prescriptions are uploaded</span>
            </div>
          </div>

          <div style={styles.settingsSection}>
            <h4 style={styles.settingsTitle}>Notification Methods</h4>
            <div style={styles.settingItem}>
              <label style={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  name="soundEnabled"
                  checked={notificationSettings.soundEnabled}
                  onChange={handleChange}
                  style={styles.checkbox}
                />
                Sound Alerts
              </label>
              <span style={styles.settingDescription}>Play sound for notifications</span>
            </div>
            <div style={styles.settingItem}>
              <label style={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  name="pushNotifications"
                  checked={notificationSettings.pushNotifications}
                  onChange={handleChange}
                  style={styles.checkbox}
                />
                Push Notifications
              </label>
              <span style={styles.settingDescription}>Show browser push notifications</span>
            </div>
            <div style={styles.settingItem}>
              <label style={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  name="emailNotifications"
                  checked={notificationSettings.emailNotifications}
                  onChange={handleChange}
                  style={styles.checkbox}
                />
                Email Notifications
              </label>
              <span style={styles.settingDescription}>Receive notifications via email</span>
            </div>
            <div style={styles.settingItem}>
              <label style={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  name="smsNotifications"
                  checked={notificationSettings.smsNotifications}
                  onChange={handleChange}
                  style={styles.checkbox}
                />
                SMS Notifications
              </label>
              <span style={styles.settingDescription}>Receive notifications via SMS</span>
            </div>
          </div>
        </div>
        <div style={styles.modalActions}>
          <button 
            style={styles.secondaryButton}
            onClick={onClose}
          >
            Cancel
          </button>
          <button 
            style={styles.primaryButton}
            onClick={onSave}
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};

const NotificationsBellModal = ({ show, onClose, notifications, onClearAll }) => {
  if (!show) return null;

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modal}>
        <div style={styles.modalHeader}>
          <h3 style={styles.modalTitle}>Notifications</h3>
          <div style={styles.notificationHeaderActions}>
            {notifications.length > 0 && (
              <button 
                style={styles.clearAllButton}
                onClick={onClearAll}
              >
                Clear All
              </button>
            )}
            <button 
              style={styles.closeButton}
              onClick={onClose}
            >
              ✕
            </button>
          </div>
        </div>
        <div style={styles.modalContent}>
          {notifications.length === 0 ? (
            <div style={styles.noNotifications}>
              <div style={styles.noNotificationsIcon}>🔔</div>
              <p style={styles.noNotificationsText}>No new notifications</p>
            </div>
          ) : (
            <div style={styles.notificationsList}>
              {notifications.map((notification, index) => (
                <div key={index} style={styles.notificationItem}>
                  <div style={styles.notificationIcon}>
                    {notification.type === 'order' && '📦'}
                    {notification.type === 'prescription' && '🩺'}
                    {notification.type === 'stock' && '⚠️'}
                    {notification.type === 'system' && '🔔'}
                  </div>
                  <div style={styles.notificationContent}>
                    <p style={styles.notificationTitle}>{notification.title}</p>
                    <p style={styles.notificationMessage}>{notification.message}</p>
                    <span style={styles.notificationTime}>{notification.time}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const LogoutConfirmationModal = ({ show, onClose, onConfirm }) => {
  if (!show) return null;

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modal}>
        <div style={styles.modalHeader}>
          <h3 style={styles.modalTitle}>Confirm Logout</h3>
          <button 
            style={styles.closeButton}
            onClick={onClose}
          >
            ✕
          </button>
        </div>
        <div style={styles.modalContent}>
          <p style={styles.confirmationText}>
            Are you sure you want to logout from the vendor dashboard?
          </p>
        </div>
        <div style={styles.modalActions}>
          <button 
            style={styles.secondaryButton}
            onClick={onClose}
          >
            Cancel
          </button>
          <button 
            style={styles.dangerButton}
            onClick={onConfirm}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

const VendorModals = ({
  showAddMedicineModal,
  setShowAddMedicineModal,
  showEditStockModal,
  setShowEditStockModal,
  showProfileModal,
  setShowProfileModal,
  showNotificationsModal,
  setShowNotificationsModal,
  showNotificationsBellModal,
  setShowNotificationsBellModal,
  showLogoutModal,
  setShowLogoutModal,
  newMedicine,
  setNewMedicine,
  editingMedicine,
  setEditingMedicine,
  userProfile,
  setUserProfile,
  notificationSettings,
  setNotificationSettings,
  notifications,
  formErrors,
  validateField,
  handleAddMedicine,
  handleUpdateStock,
  handleProfileUpdate,
  handleSaveNotificationSettings,
  handleClearAllNotifications,
  confirmLogout
}) => {
  return (
    <>
      <AddMedicineModal
        show={showAddMedicineModal}
        onClose={() => setShowAddMedicineModal(false)}
        onAdd={handleAddMedicine}
        newMedicine={newMedicine}
        setNewMedicine={setNewMedicine}
      />

      <EditStockModal
        show={showEditStockModal}
        onClose={() => setShowEditStockModal(false)}
        onUpdate={handleUpdateStock}
        editingMedicine={editingMedicine}
        setEditingMedicine={setEditingMedicine}
      />

      <ProfileModal
        show={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        onUpdate={handleProfileUpdate}
        userProfile={userProfile}
        setUserProfile={setUserProfile}
        formErrors={formErrors}
        validateField={validateField}
      />

      <NotificationsModal
        show={showNotificationsModal}
        onClose={() => setShowNotificationsModal(false)}
        onSave={handleSaveNotificationSettings}
        notificationSettings={notificationSettings}
        setNotificationSettings={setNotificationSettings}
      />

      <NotificationsBellModal
        show={showNotificationsBellModal}
        onClose={() => setShowNotificationsBellModal(false)}
        notifications={notifications}
        onClearAll={handleClearAllNotifications}
      />

      <LogoutConfirmationModal
        show={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={confirmLogout}
      />
    </>
  );
};

export default VendorModals;