// import React, { useState, useEffect, useCallback } from 'react';

// // Separate Modal Components to prevent re-renders
// const AddMedicineModal = ({ show, onClose, onAdd, newMedicine, setNewMedicine }) => {
//   const [formErrors, setFormErrors] = useState({});

//   const validateField = (fieldName, value) => {
//     let error = '';
    
//     switch (fieldName) {
//       case 'name':
//         if (!value.trim()) {
//           error = 'Medicine name is required';
//         }
//         break;
//       case 'category':
//         if (!value.trim()) {
//           error = 'Category is required';
//         }
//         break;
//       case 'quantity':
//         if (!value || parseInt(value) < 0) {
//           error = 'Valid quantity is required';
//         }
//         break;
//       case 'minStock':
//         if (!value || parseInt(value) < 0) {
//           error = 'Valid minimum stock is required';
//         }
//         break;
//       case 'price':
//         if (!value || parseFloat(value) < 0) {
//           error = 'Valid price is required';
//         }
//         break;
//       case 'expiryDate':
//         if (!value) {
//           error = 'Expiry date is required';
//         } else {
//           const expiryDate = new Date(value);
//           const today = new Date();
//           if (expiryDate <= today) {
//             error = 'Expiry date must be in the future';
//           }
//         }
//         break;
//       case 'supplier':
//         if (!value.trim()) {
//           error = 'Supplier is required';
//         }
//         break;
//       case 'batchNo':
//         if (!value.trim()) {
//           error = 'Batch number is required';
//         }
//         break;
//       default:
//         break;
//     }
    
//     return error;
//   };

//   const validateForm = () => {
//     const errors = {};
    
//     errors.name = validateField('name', newMedicine.name);
//     errors.category = validateField('category', newMedicine.category);
//     errors.quantity = validateField('quantity', newMedicine.quantity);
//     errors.minStock = validateField('minStock', newMedicine.minStock);
//     errors.price = validateField('price', newMedicine.price);
//     errors.expiryDate = validateField('expiryDate', newMedicine.expiryDate);
//     errors.supplier = validateField('supplier', newMedicine.supplier);
//     errors.batchNo = validateField('batchNo', newMedicine.batchNo);
    
//     setFormErrors(errors);
    
//     return !Object.values(errors).some(error => error);
//   };

//   const handleChange = useCallback((e) => {
//     const { name, value, type, checked } = e.target;
//     setNewMedicine(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
    
//     // Clear error when user starts typing
//     if (formErrors[name]) {
//       setFormErrors(prev => ({
//         ...prev,
//         [name]: ''
//       }));
//     }
//   }, [setNewMedicine, formErrors]);

//   const handleAddClick = () => {
//     if (validateForm()) {
//       onAdd();
//     }
//   };

//   if (!show) return null;

//   return (
//     <div style={styles.modalOverlay}>
//       <div style={styles.modal}>
//         <div style={styles.modalHeader}>
//           <h3 style={styles.modalTitle}>Add New Medicine</h3>
//           <button 
//             style={styles.closeButton}
//             onClick={onClose}
//           >
//             ✕
//           </button>
//         </div>
//         <div style={styles.modalContent}>
//           <div style={styles.formRow}>
//             <label style={styles.label}>Medicine Name *</label>
//             <input
//               type="text"
//               name="name"
//               style={{
//                 ...styles.input,
//                 ...(formErrors.name && styles.inputError)
//               }}
//               value={newMedicine.name}
//               onChange={handleChange}
//               placeholder="Enter medicine name"
//             />
//             {formErrors.name && <div style={styles.errorText}>{formErrors.name}</div>}
//           </div>
//           <div style={styles.formRow}>
//             <label style={styles.label}>Category *</label>
//             <input
//               type="text"
//               name="category"
//               style={{
//                 ...styles.input,
//                 ...(formErrors.category && styles.inputError)
//               }}
//               value={newMedicine.category}
//               onChange={handleChange}
//               placeholder="Enter category"
//             />
//             {formErrors.category && <div style={styles.errorText}>{formErrors.category}</div>}
//           </div>
//           <div style={styles.formGrid}>
//             <div style={styles.formRow}>
//               <label style={styles.label}>Quantity *</label>
//               <input
//                 type="number"
//                 name="quantity"
//                 style={{
//                   ...styles.input,
//                   ...(formErrors.quantity && styles.inputError)
//                 }}
//                 value={newMedicine.quantity}
//                 onChange={handleChange}
//                 min="0"
//               />
//               {formErrors.quantity && <div style={styles.errorText}>{formErrors.quantity}</div>}
//             </div>
//             <div style={styles.formRow}>
//               <label style={styles.label}>Min Stock *</label>
//               <input
//                 type="number"
//                 name="minStock"
//                 style={{
//                   ...styles.input,
//                   ...(formErrors.minStock && styles.inputError)
//                 }}
//                 value={newMedicine.minStock}
//                 onChange={handleChange}
//                 min="0"
//               />
//               {formErrors.minStock && <div style={styles.errorText}>{formErrors.minStock}</div>}
//             </div>
//           </div>
//           <div style={styles.formGrid}>
//             <div style={styles.formRow}>
//               <label style={styles.label}>Price (₹) *</label>
//               <input
//                 type="number"
//                 name="price"
//                 style={{
//                   ...styles.input,
//                   ...(formErrors.price && styles.inputError)
//                 }}
//                 value={newMedicine.price}
//                 onChange={handleChange}
//                 min="0"
//                 step="0.01"
//               />
//               {formErrors.price && <div style={styles.errorText}>{formErrors.price}</div>}
//             </div>
//             <div style={styles.formRow}>
//               <label style={styles.label}>Expiry Date *</label>
//               <input
//                 type="date"
//                 name="expiryDate"
//                 style={{
//                   ...styles.input,
//                   ...(formErrors.expiryDate && styles.inputError)
//                 }}
//                 value={newMedicine.expiryDate}
//                 onChange={handleChange}
//               />
//               {formErrors.expiryDate && <div style={styles.errorText}>{formErrors.expiryDate}</div>}
//             </div>
//           </div>
//           <div style={styles.formGrid}>
//             <div style={styles.formRow}>
//               <label style={styles.label}>Supplier *</label>
//               <input
//                 type="text"
//                 name="supplier"
//                 style={{
//                   ...styles.input,
//                   ...(formErrors.supplier && styles.inputError)
//                 }}
//                 value={newMedicine.supplier}
//                 onChange={handleChange}
//                 placeholder="Enter supplier name"
//               />
//               {formErrors.supplier && <div style={styles.errorText}>{formErrors.supplier}</div>}
//             </div>
//             <div style={styles.formRow}>
//               <label style={styles.label}>Batch No *</label>
//               <input
//                 type="text"
//                 name="batchNo"
//                 style={{
//                   ...styles.input,
//                   ...(formErrors.batchNo && styles.inputError)
//                 }}
//                 value={newMedicine.batchNo}
//                 onChange={handleChange}
//                 placeholder="Enter batch number"
//               />
//               {formErrors.batchNo && <div style={styles.errorText}>{formErrors.batchNo}</div>}
//             </div>
//           </div>
//           <div style={styles.formRow}>
//             <label style={styles.checkboxLabel}>
//               <input
//                 type="checkbox"
//                 name="prescriptionRequired"
//                 checked={newMedicine.prescriptionRequired}
//                 onChange={handleChange}
//                 style={styles.checkbox}
//               />
//               Prescription Required
//             </label>
//           </div>
//           <div style={styles.requiredNote}>
//             * Required fields
//           </div>
//         </div>
//         <div style={styles.modalActions}>
//           <button 
//             style={styles.secondaryButton}
//             onClick={onClose}
//           >
//             Cancel
//           </button>
//           <button 
//             style={styles.primaryButton}
//             onClick={handleAddClick}
//           >
//             Add Medicine
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const EditStockModal = ({ show, onClose, onUpdate, editingMedicine, setEditingMedicine }) => {
//   const handleChange = useCallback((e) => {
//     const { name, value, type, checked } = e.target;
//     setEditingMedicine(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//   }, [setEditingMedicine]);

//   if (!show || !editingMedicine) return null;

//   return (
//     <div style={styles.modalOverlay}>
//       <div style={styles.modal}>
//         <div style={styles.modalHeader}>
//           <h3 style={styles.modalTitle}>Update Stock - {editingMedicine.name}</h3>
//           <button 
//             style={styles.closeButton}
//             onClick={onClose}
//           >
//             ✕
//           </button>
//         </div>
//         <div style={styles.modalContent}>
//           <div style={styles.formGrid}>
//             <div style={styles.formRow}>
//               <label style={styles.label}>Current Quantity</label>
//               <input
//                 type="number"
//                 name="quantity"
//                 style={styles.input}
//                 value={editingMedicine.quantity}
//                 onChange={handleChange}
//                 min="0"
//               />
//             </div>
//             <div style={styles.formRow}>
//               <label style={styles.label}>Min Stock Level</label>
//               <input
//                 type="number"
//                 name="minStock"
//                 style={styles.input}
//                 value={editingMedicine.minStock}
//                 onChange={handleChange}
//                 min="0"
//               />
//             </div>
//           </div>
//           <div style={styles.formGrid}>
//             <div style={styles.formRow}>
//               <label style={styles.label}>Price (₹)</label>
//               <input
//                 type="number"
//                 name="price"
//                 style={styles.input}
//                 value={editingMedicine.price}
//                 onChange={handleChange}
//                 min="0"
//                 step="0.01"
//               />
//             </div>
//             <div style={styles.formRow}>
//               <label style={styles.label}>Expiry Date</label>
//               <input
//                 type="date"
//                 name="expiryDate"
//                 style={styles.input}
//                 value={editingMedicine.expiryDate}
//                 onChange={handleChange}
//               />
//             </div>
//           </div>
//           <div style={styles.formRow}>
//             <label style={styles.checkboxLabel}>
//               <input
//                 type="checkbox"
//                 name="prescriptionRequired"
//                 checked={editingMedicine.prescriptionRequired}
//                 onChange={handleChange}
//                 style={styles.checkbox}
//               />
//               Prescription Required
//             </label>
//           </div>
//         </div>
//         <div style={styles.modalActions}>
//           <button 
//             style={styles.secondaryButton}
//             onClick={onClose}
//           >
//             Cancel
//           </button>
//           <button 
//             style={styles.primaryButton}
//             onClick={onUpdate}
//           >
//             Update Stock
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const ProfileModal = ({ show, onClose, onUpdate, userProfile, setUserProfile, formErrors, validateField }) => {
//   const handleChange = useCallback((e) => {
//     const { name, value } = e.target;
//     setUserProfile(prev => ({
//       ...prev,
//       [name]: value
//     }));
    
//     // Validate field on change
//     if (validateField) {
//       validateField(name, value);
//     }
//   }, [setUserProfile, validateField]);

//   if (!show) return null;

//   return (
//     <div style={styles.modalOverlay}>
//       <div style={styles.modal}>
//         <div style={styles.modalHeader}>
//           <h3 style={styles.modalTitle}>Edit Profile</h3>
//           <button 
//             style={styles.closeButton}
//             onClick={onClose}
//           >
//             ✕
//           </button>
//         </div>
//         <div style={styles.modalContent}>
//           <div style={styles.formGrid}>
//             <div style={styles.formRow}>
//               <label style={styles.label}>Full Name *</label>
//               <input
//                 type="text"
//                 name="fullName"
//                 style={{
//                   ...styles.input,
//                   ...styles.lockedField,
//                   ...(formErrors.fullName && styles.inputError)
//                 }}
//                 value={userProfile.fullName}
//                 onChange={handleChange}
//                 placeholder="Enter your full name"
//                 disabled
//                 title="Name cannot be changed"
//               />
//               <div style={styles.lockedNote}>Name cannot be changed</div>
//               {formErrors.fullName && <div style={styles.errorText}>{formErrors.fullName}</div>}
//             </div>
//             <div style={styles.formRow}>
//               <label style={styles.label}>Email *</label>
//               <input
//                 type="email"
//                 name="email"
//                 style={{
//                   ...styles.input,
//                   ...styles.lockedField,
//                   ...(formErrors.email && styles.inputError)
//                 }}
//                 value={userProfile.email}
//                 onChange={handleChange}
//                 placeholder="Enter your email"
//                 disabled
//                 title="Email cannot be changed"
//               />
//               <div style={styles.lockedNote}>Email cannot be changed</div>
//               {formErrors.email && <div style={styles.errorText}>{formErrors.email}</div>}
//             </div>
//           </div>
//           <div style={styles.formGrid}>
//             <div style={styles.formRow}>
//               <label style={styles.label}>Phone *</label>
//               <input
//                 type="tel"
//                 name="phone"
//                 style={{
//                   ...styles.input,
//                   ...(formErrors.phone && styles.inputError)
//                 }}
//                 value={userProfile.phone}
//                 onChange={handleChange}
//                 placeholder="Enter your phone number"
//                 maxLength="15"
//               />
//               {formErrors.phone && <div style={styles.errorText}>{formErrors.phone}</div>}
//             </div>
//             <div style={styles.formRow}>
//               <label style={styles.label}>Pharmacy Name *</label>
//               <input
//                 type="text"
//                 name="pharmacyName"
//                 style={{
//                   ...styles.input,
//                   ...(formErrors.pharmacyName && styles.inputError)
//                 }}
//                 value={userProfile.pharmacyName}
//                 onChange={handleChange}
//                 placeholder="Enter pharmacy name"
//                 maxLength="100"
//               />
//               {formErrors.pharmacyName && <div style={styles.errorText}>{formErrors.pharmacyName}</div>}
//             </div>
//           </div>
//           <div style={styles.formRow}>
//             <label style={styles.label}>License Number *</label>
//             <input
//               type="text"
//               name="licenseNumber"
//               style={{
//                 ...styles.input,
//                 ...(formErrors.licenseNumber && styles.inputError)
//               }}
//               value={userProfile.licenseNumber}
//               onChange={handleChange}
//               placeholder="Enter license number"
//               maxLength="50"
//             />
//             {formErrors.licenseNumber && <div style={styles.errorText}>{formErrors.licenseNumber}</div>}
//           </div>
//           <div style={styles.formRow}>
//             <label style={styles.label}>Address *</label>
//             <input
//               type="text"
//               name="address"
//               style={{
//                 ...styles.input,
//                 ...(formErrors.address && styles.inputError)
//               }}
//               value={userProfile.address}
//               onChange={handleChange}
//               placeholder="Enter complete address"
//               maxLength="200"
//             />
//             {formErrors.address && <div style={styles.errorText}>{formErrors.address}</div>}
//           </div>
//           <div style={styles.formGrid}>
//             <div style={styles.formRow}>
//               <label style={styles.label}>City *</label>
//               <input
//                 type="text"
//                 name="city"
//                 style={{
//                   ...styles.input,
//                   ...(formErrors.city && styles.inputError)
//                 }}
//                 value={userProfile.city}
//                 onChange={handleChange}
//                 placeholder="Enter city"
//                 maxLength="50"
//                 pattern="[A-Za-z\s]+"
//                 title="City should contain only letters and spaces"
//               />
//               {formErrors.city && <div style={styles.errorText}>{formErrors.city}</div>}
//             </div>
//             <div style={styles.formRow}>
//               <label style={styles.label}>State *</label>
//               <input
//                 type="text"
//                 name="state"
//                 style={{
//                   ...styles.input,
//                   ...(formErrors.state && styles.inputError)
//                 }}
//                 value={userProfile.state}
//                 onChange={handleChange}
//                 placeholder="Enter state"
//                 maxLength="50"
//                 pattern="[A-Za-z\s]+"
//                 title="State should contain only letters and spaces"
//               />
//               {formErrors.state && <div style={styles.errorText}>{formErrors.state}</div>}
//             </div>
//             <div style={styles.formRow}>
//               <label style={styles.label}>Pincode *</label>
//               <input
//                 type="text"
//                 name="pincode"
//                 style={{
//                   ...styles.input,
//                   ...(formErrors.pincode && styles.inputError)
//                 }}
//                 value={userProfile.pincode}
//                 onChange={handleChange}
//                 placeholder="Enter pincode"
//                 maxLength="6"
//                 pattern="[0-9]{6}"
//                 title="Pincode should be 6 digits"
//               />
//               {formErrors.pincode && <div style={styles.errorText}>{formErrors.pincode}</div>}
//             </div>
//           </div>
//           <div style={styles.requiredNote}>
//             * Required fields
//           </div>
//         </div>
//         <div style={styles.modalActions}>
//           <button 
//             style={styles.secondaryButton}
//             onClick={onClose}
//           >
//             Cancel
//           </button>
//           <button 
//             style={styles.primaryButton}
//             onClick={onUpdate}
//             disabled={Object.keys(formErrors).some(key => formErrors[key])}
//           >
//             Update Profile
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const NotificationsModal = ({ show, onClose, onSave, notificationSettings, setNotificationSettings }) => {
//   const handleChange = useCallback((e) => {
//     const { name, checked } = e.target;
//     setNotificationSettings(prev => ({
//       ...prev,
//       [name]: checked
//     }));
//   }, [setNotificationSettings]);

//   if (!show) return null;

//   return (
//     <div style={styles.modalOverlay}>
//       <div style={styles.modal}>
//         <div style={styles.modalHeader}>
//           <h3 style={styles.modalTitle}>Notification Settings</h3>
//           <button 
//             style={styles.closeButton}
//             onClick={onClose}
//           >
//             ✕
//           </button>
//         </div>
//         <div style={styles.modalContent}>
//           <div style={styles.settingsSection}>
//             <h4 style={styles.settingsTitle}>Order Notifications</h4>
//             <div style={styles.settingItem}>
//               <label style={styles.checkboxLabel}>
//                 <input
//                   type="checkbox"
//                   name="newOrders"
//                   checked={notificationSettings.newOrders}
//                   onChange={handleChange}
//                   style={styles.checkbox}
//                 />
//                 New Orders
//               </label>
//               <span style={styles.settingDescription}>Get notified when new orders are received</span>
//             </div>
//             <div style={styles.settingItem}>
//               <label style={styles.checkboxLabel}>
//                 <input
//                   type="checkbox"
//                   name="orderReady"
//                   checked={notificationSettings.orderReady}
//                   onChange={handleChange}
//                   style={styles.checkbox}
//                 />
//                 Order Ready
//               </label>
//               <span style={styles.settingDescription}>Get notified when orders are ready for pickup/delivery</span>
//             </div>
//           </div>

//           <div style={styles.settingsSection}>
//             <h4 style={styles.settingsTitle}>Inventory Notifications</h4>
//             <div style={styles.settingItem}>
//               <label style={styles.checkboxLabel}>
//                 <input
//                   type="checkbox"
//                   name="lowStock"
//                   checked={notificationSettings.lowStock}
//                   onChange={handleChange}
//                   style={styles.checkbox}
//                 />
//                 Low Stock Alerts
//               </label>
//               <span style={styles.settingDescription}>Get notified when medicines are running low</span>
//             </div>
//             <div style={styles.settingItem}>
//               <label style={styles.checkboxLabel}>
//                 <input
//                   type="checkbox"
//                   name="expiringMedicines"
//                   checked={notificationSettings.expiringMedicines}
//                   onChange={handleChange}
//                   style={styles.checkbox}
//                 />
//                 Expiring Medicines
//               </label>
//               <span style={styles.settingDescription}>Get notified when medicines are about to expire</span>
//             </div>
//           </div>

//           <div style={styles.settingsSection}>
//             <h4 style={styles.settingsTitle}>Prescription Notifications</h4>
//             <div style={styles.settingItem}>
//               <label style={styles.checkboxLabel}>
//                 <input
//                   type="checkbox"
//                   name="prescriptionVerification"
//                   checked={notificationSettings.prescriptionVerification}
//                   onChange={handleChange}
//                   style={styles.checkbox}
//                 />
//                 Prescription Verification
//               </label>
//               <span style={styles.settingDescription}>Get notified when new prescriptions are uploaded</span>
//             </div>
//           </div>

//           <div style={styles.settingsSection}>
//             <h4 style={styles.settingsTitle}>Notification Methods</h4>
//             <div style={styles.settingItem}>
//               <label style={styles.checkboxLabel}>
//                 <input
//                   type="checkbox"
//                   name="soundEnabled"
//                   checked={notificationSettings.soundEnabled}
//                   onChange={handleChange}
//                   style={styles.checkbox}
//                 />
//                 Sound Alerts
//               </label>
//               <span style={styles.settingDescription}>Play sound for notifications</span>
//             </div>
//             <div style={styles.settingItem}>
//               <label style={styles.checkboxLabel}>
//                 <input
//                   type="checkbox"
//                   name="pushNotifications"
//                   checked={notificationSettings.pushNotifications}
//                   onChange={handleChange}
//                   style={styles.checkbox}
//                 />
//                 Push Notifications
//               </label>
//               <span style={styles.settingDescription}>Show browser push notifications</span>
//             </div>
//             <div style={styles.settingItem}>
//               <label style={styles.checkboxLabel}>
//                 <input
//                   type="checkbox"
//                   name="emailNotifications"
//                   checked={notificationSettings.emailNotifications}
//                   onChange={handleChange}
//                   style={styles.checkbox}
//                 />
//                 Email Notifications
//               </label>
//               <span style={styles.settingDescription}>Receive notifications via email</span>
//             </div>
//             <div style={styles.settingItem}>
//               <label style={styles.checkboxLabel}>
//                 <input
//                   type="checkbox"
//                   name="smsNotifications"
//                   checked={notificationSettings.smsNotifications}
//                   onChange={handleChange}
//                   style={styles.checkbox}
//                 />
//                 SMS Notifications
//               </label>
//               <span style={styles.settingDescription}>Receive notifications via SMS</span>
//             </div>
//           </div>
//         </div>
//         <div style={styles.modalActions}>
//           <button 
//             style={styles.secondaryButton}
//             onClick={onClose}
//           >
//             Cancel
//           </button>
//           <button 
//             style={styles.primaryButton}
//             onClick={onSave}
//           >
//             Save Settings
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const NotificationsBellModal = ({ show, onClose, notifications, onClearAll }) => {
//   if (!show) return null;

//   return (
//     <div style={styles.modalOverlay}>
//       <div style={styles.modal}>
//         <div style={styles.modalHeader}>
//           <h3 style={styles.modalTitle}>Notifications</h3>
//           <div style={styles.notificationHeaderActions}>
//             {notifications.length > 0 && (
//               <button 
//                 style={styles.clearAllButton}
//                 onClick={onClearAll}
//               >
//                 Clear All
//               </button>
//             )}
//             <button 
//               style={styles.closeButton}
//               onClick={onClose}
//             >
//               ✕
//             </button>
//           </div>
//         </div>
//         <div style={styles.modalContent}>
//           {notifications.length === 0 ? (
//             <div style={styles.noNotifications}>
//               <div style={styles.noNotificationsIcon}>🔔</div>
//               <p style={styles.noNotificationsText}>No new notifications</p>
//             </div>
//           ) : (
//             <div style={styles.notificationsList}>
//               {notifications.map((notification, index) => (
//                 <div key={index} style={styles.notificationItem}>
//                   <div style={styles.notificationIcon}>
//                     {notification.type === 'order' && '📦'}
//                     {notification.type === 'prescription' && '🩺'}
//                     {notification.type === 'stock' && '⚠️'}
//                     {notification.type === 'system' && '🔔'}
//                   </div>
//                   <div style={styles.notificationContent}>
//                     <p style={styles.notificationTitle}>{notification.title}</p>
//                     <p style={styles.notificationMessage}>{notification.message}</p>
//                     <span style={styles.notificationTime}>{notification.time}</span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// const LogoutConfirmationModal = ({ show, onClose, onConfirm }) => {
//   if (!show) return null;

//   return (
//     <div style={styles.modalOverlay}>
//       <div style={styles.modal}>
//         <div style={styles.modalHeader}>
//           <h3 style={styles.modalTitle}>Confirm Logout</h3>
//           <button 
//             style={styles.closeButton}
//             onClick={onClose}
//           >
//             ✕
//           </button>
//         </div>
//         <div style={styles.modalContent}>
//           <p style={styles.confirmationText}>
//             Are you sure you want to logout from the vendor dashboard?
//           </p>
//         </div>
//         <div style={styles.modalActions}>
//           <button 
//             style={styles.secondaryButton}
//             onClick={onClose}
//           >
//             Cancel
//           </button>
//           <button 
//             style={styles.dangerButton}
//             onClick={onConfirm}
//           >
//             Logout
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const SearchBar = ({ searchTerm, onSearchChange, onClearSearch, filteredStock }) => {
//   return (
//     <div style={styles.searchContainer}>
//       <div style={styles.searchInputContainer}>
//         {/* <span style={styles.searchIcon}>🔍</span> */}
//         <input
//           type="text"
//           style={styles.searchInput}
//           placeholder="Search medicines by name, category, or batch number..."
//           value={searchTerm}
//           onChange={onSearchChange}
//         />
//         {searchTerm && (
//           <button 
//             style={styles.clearSearchButton}
//             onClick={onClearSearch}
//             title="Clear search"
//           >
//             ✕
//           </button>
//         )}
//       </div>
//       {searchTerm && (
//         <div style={styles.searchResultsInfo}>
//           Found {filteredStock.length} medicine(s) matching "{searchTerm}"
//         </div>
//       )}
//     </div>
//   );
// };

// // Main Component
// const VendorDashboard = ({ user = {
//   fullName: 'John Pharmacy',
//   email: 'john@pharmacy.com',
//   phone: '+91 98765 43210',
//   pharmacyName: 'John Medical Store',
//   licenseNumber: 'MH-PHR-2024-12345',
//   address: 'Shop No. 15, Main Market, Sector 18, Noida',
//   city: 'Noida',
//   state: 'Uttar Pradesh',
//   pincode: '201301'
// }, onLogout }) => {
//   const [activePage, setActivePage] = useState('stock');
//   const [stockFilter, setStockFilter] = useState('all');
//   const [orderFilter, setOrderFilter] = useState('pending');
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [selectedPrescription, setSelectedPrescription] = useState(null);
//   const [analyticsPeriod, setAnalyticsPeriod] = useState('week');
  
//   // State for real-time features
//   const [stock, setStock] = useState([]);
//   const [orders, setOrders] = useState({ pending: [], ready: [], picked: [], cancelled: [] });
//   const [prescriptions, setPrescriptions] = useState([]);
//   const [showAddMedicineModal, setShowAddMedicineModal] = useState(false);
//   const [editingMedicine, setEditingMedicine] = useState(null);
//   const [showEditStockModal, setShowEditStockModal] = useState(false);
//   const [showProfileModal, setShowProfileModal] = useState(false);
//   const [showNotificationsModal, setShowNotificationsModal] = useState(false);
//   const [showNotificationsBellModal, setShowNotificationsBellModal] = useState(false);
//   const [showLogoutModal, setShowLogoutModal] = useState(false);
  
//   // Search state
//   const [searchTerm, setSearchTerm] = useState('');
  
//   const [newMedicine, setNewMedicine] = useState({
//     name: '',
//     category: '',
//     quantity: '',
//     minStock: '',
//     price: '',
//     expiryDate: '',
//     prescriptionRequired: false,
//     supplier: '',
//     batchNo: ''
//   });

//   // User profile state
//   const [userProfile, setUserProfile] = useState({
//     fullName: '',
//     email: '',
//     phone: '',
//     pharmacyName: '',
//     licenseNumber: '',
//     address: '',
//     city: '',
//     state: '',
//     pincode: ''
//   });

//   // Form validation errors
//   const [formErrors, setFormErrors] = useState({});

//   // Notification settings state
//   const [notificationSettings, setNotificationSettings] = useState({
//     newOrders: true,
//     lowStock: true,
//     expiringMedicines: true,
//     prescriptionVerification: true,
//     orderReady: true,
//     soundEnabled: true,
//     pushNotifications: true,
//     emailNotifications: false,
//     smsNotifications: true
//   });

//   // Notifications state
//   const [notifications, setNotifications] = useState([
//     {
//       id: 1,
//       type: 'order',
//       title: 'New Order Received',
//       message: 'Order ORD-001 from Rajesh Kumar',
//       time: '2 mins ago',
//       read: false
//     },
//     {
//       id: 2,
//       type: 'prescription',
//       title: 'Prescription Uploaded',
//       message: 'New prescription from Priya Sharma needs verification',
//       time: '5 mins ago',
//       read: false
//     },
//     {
//       id: 3,
//       type: 'stock',
//       title: 'Low Stock Alert',
//       message: 'Amoxicillin 250mg is running low',
//       time: '1 hour ago',
//       read: false
//     }
//   ]);

//   // Mock data initialization
//   const initialData = {
//     stock: [
//       {
//         id: 1,
//         name: 'Paracetamol 500mg',
//         category: 'Pain Relief',
//         quantity: 45,
//         minStock: 20,
//         price: 15,
//         expiryDate: '2024-12-15',
//         prescriptionRequired: false,
//         supplier: 'MedPlus Suppliers',
//         batchNo: 'BATCH-001'
//       },
//       {
//         id: 2,
//         name: 'Amoxicillin 250mg',
//         category: 'Antibiotic',
//         quantity: 12,
//         minStock: 15,
//         price: 85,
//         expiryDate: '2024-08-20',
//         prescriptionRequired: true,
//         supplier: 'PharmaCorp',
//         batchNo: 'BATCH-002'
//       },
//       {
//         id: 3,
//         name: 'Vitamin C 1000mg',
//         category: 'Supplements',
//         quantity: 78,
//         minStock: 25,
//         price: 120,
//         expiryDate: '2025-03-10',
//         prescriptionRequired: false,
//         supplier: 'HealthPlus',
//         batchNo: 'BATCH-003'
//       },
//       {
//         id: 4,
//         name: 'Insulin Syringes',
//         category: 'Diabetes Care',
//         quantity: 8,
//         minStock: 10,
//         price: 45,
//         expiryDate: '2025-01-30',
//         prescriptionRequired: true,
//         supplier: 'Diabetic Care Ltd',
//         batchNo: 'BATCH-004'
//       },
//       {
//         id: 5,
//         name: 'Aspirin 75mg',
//         category: 'Cardiac',
//         quantity: 32,
//         minStock: 20,
//         price: 25,
//         expiryDate: '2024-11-15',
//         prescriptionRequired: false,
//         supplier: 'Cardio Pharma',
//         batchNo: 'BATCH-005'
//       }
//     ],
//     orders: {
//       pending: [
//         {
//           id: 'ORD-001',
//           customerName: 'Rajesh Kumar',
//           customerPhone: '+91 98765 43210',
//           items: [
//             { name: 'Paracetamol 500mg', quantity: 2, price: 15 },
//             { name: 'Vitamin C 1000mg', quantity: 1, price: 120 }
//           ],
//           total: 150,
//           orderTime: '2024-01-15 10:30',
//           deliveryType: 'home',
//           address: 'H-12, Sector 15, Noida',
//           prescriptionRequired: false
//         },
//         {
//           id: 'ORD-002',
//           customerName: 'Priya Sharma',
//           customerPhone: '+91 98765 43211',
//           items: [
//             { name: 'Amoxicillin 250mg', quantity: 1, price: 85 }
//           ],
//           total: 85,
//           orderTime: '2024-01-15 11:15',
//           deliveryType: 'pickup',
//           address: 'Store Pickup',
//           prescriptionRequired: true
//         }
//       ],
//       ready: [
//         {
//           id: 'ORD-003',
//           customerName: 'Amit Patel',
//           customerPhone: '+91 98765 43212',
//           items: [
//             { name: 'Insulin Syringes', quantity: 1, price: 45 },
//             { name: 'Diabetes Strips', quantity: 1, price: 320 }
//           ],
//           total: 365,
//           orderTime: '2024-01-15 09:45',
//           deliveryType: 'home',
//           address: 'B-5, Preet Vihar, Delhi',
//           prescriptionRequired: true
//         }
//       ],
//       picked: [
//         {
//           id: 'ORD-004',
//           customerName: 'Sunita Reddy',
//           customerPhone: '+91 98765 43213',
//           items: [
//             { name: 'Aspirin 75mg', quantity: 1, price: 25 }
//           ],
//           total: 25,
//           orderTime: '2024-01-15 08:30',
//           deliveryType: 'pickup',
//           address: 'Store Pickup',
//           prescriptionRequired: false
//         }
//       ],
//       cancelled: []
//     },
//     prescriptions: [
//       {
//         id: 1,
//         orderId: 'ORD-002',
//         customerName: 'Priya Sharma',
//         doctorName: ' Sharma',
//         uploadedTime: '2024-01-15 11:15',
//         status: 'pending',
//         medicines: ['Amoxicillin 250mg', 'Azithromycin 500mg'],
//         imageUrl: 'https://via.placeholder.com/400x500?text=Prescription+Image'
//       },
//       {
//         id: 2,
//         orderId: 'ORD-003',
//         customerName: 'Amit Patel',
//         doctorName: ' Gupta',
//         uploadedTime: '2024-01-15 09:45',
//         status: 'pending',
//         medicines: ['Insulin Syringes', 'Diabetes Strips', 'Metformin 500mg'],
//         imageUrl: 'https://via.placeholder.com/400x500?text=Prescription+Image'
//       }
//     ]
//   };

//   // Form validation functions
//   const validateField = (fieldName, value) => {
//     let error = '';
    
//     switch (fieldName) {
//       case 'phone':
//         const phoneRegex = /^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/;
//         if (!value.trim()) {
//           error = 'Phone number is required';
//         } else if (!phoneRegex.test(value.replace(/\s/g, ''))) {
//           error = 'Please enter a valid Indian phone number';
//         }
//         break;
        
//       case 'pharmacyName':
//         if (!value.trim()) {
//           error = 'Pharmacy name is required';
//         } else if (value.length < 2) {
//           error = 'Pharmacy name must be at least 2 characters long';
//         }
//         break;
        
//       case 'licenseNumber':
//         if (!value.trim()) {
//           error = 'License number is required';
//         } else if (value.length < 5) {
//           error = 'License number must be at least 5 characters long';
//         }
//         break;
        
//       case 'address':
//         if (!value.trim()) {
//           error = 'Address is required';
//         } else if (value.length < 10) {
//           error = 'Address must be at least 10 characters long';
//         }
//         break;
        
//       case 'city':
//         const cityRegex = /^[A-Za-z\s]+$/;
//         if (!value.trim()) {
//           error = 'City is required';
//         } else if (!cityRegex.test(value)) {
//           error = 'City should contain only letters and spaces';
//         }
//         break;
        
//       case 'state':
//         const stateRegex = /^[A-Za-z\s]+$/;
//         if (!value.trim()) {
//           error = 'State is required';
//         } else if (!stateRegex.test(value)) {
//           error = 'State should contain only letters and spaces';
//         }
//         break;
        
//       case 'pincode':
//         const pincodeRegex = /^[1-9][0-9]{5}$/;
//         if (!value.trim()) {
//           error = 'Pincode is required';
//         } else if (!pincodeRegex.test(value)) {
//           error = 'Please enter a valid 6-digit pincode';
//         }
//         break;
        
//       default:
//         break;
//     }
    
//     setFormErrors(prev => ({
//       ...prev,
//       [fieldName]: error
//     }));
    
//     return error;
//   };

//   const validateForm = () => {
//     const errors = {};
    
//     errors.phone = validateField('phone', userProfile.phone);
//     errors.pharmacyName = validateField('pharmacyName', userProfile.pharmacyName);
//     errors.licenseNumber = validateField('licenseNumber', userProfile.licenseNumber);
//     errors.address = validateField('address', userProfile.address);
//     errors.city = validateField('city', userProfile.city);
//     errors.state = validateField('state', userProfile.state);
//     errors.pincode = validateField('pincode', userProfile.pincode);
    
//     setFormErrors(errors);
    
//     return !Object.values(errors).some(error => error);
//   };

//   // Initialize state with mock data
//   useEffect(() => {
//     setStock(initialData.stock);
//     setOrders(initialData.orders);
//     setPrescriptions(initialData.prescriptions);
    
//     if (user) {
//       setUserProfile({
//         fullName: user.fullName || '',
//         email: user.email || '',
//         phone: user.phone || '',
//         pharmacyName: user.pharmacyName || '',
//         licenseNumber: user.licenseNumber || '',
//         address: user.address || '',
//         city: user.city || '',
//         state: user.state || '',
//         pincode: user.pincode || ''
//       });
//     }
//   }, [user]);

//   // Real-time prescription updates simulation
//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (Math.random() < 0.1 && prescriptions.length < 5) {
//         const newPrescription = {
//           id: prescriptions.length + 1,
//           orderId: `ORD-00${prescriptions.length + 3}`,
//           customerName: 'New Customer',
//           doctorName: 'Dr. New',
//           uploadedTime: new Date().toLocaleString(),
//           status: 'pending',
//           medicines: ['New Medicine 250mg', 'Another Medicine 500mg'],
//           imageUrl: 'https://via.placeholder.com/400x500?text=New+Prescription'
//         };
//         setPrescriptions(prev => [...prev, newPrescription]);
        
//         if (notificationSettings.prescriptionVerification) {
//           showNotification('New Prescription Uploaded', `New prescription received from ${newPrescription.customerName}`);
//         }
//       }
//     }, 10000);

//     return () => clearInterval(interval);
//   }, [prescriptions.length, notificationSettings.prescriptionVerification]);

//   // Simulate new order notifications
//   useEffect(() => {
//     const orderInterval = setInterval(() => {
//       if (Math.random() < 0.05 && orders.pending.length < 10) {
//         const newOrder = {
//           id: `ORD-00${orders.pending.length + orders.ready.length + orders.picked.length + orders.cancelled.length + 1}`,
//           customerName: 'New Customer',
//           customerPhone: '+91 98765 43299',
//           items: [
//             { name: 'Paracetamol 500mg', quantity: 1, price: 15 }
//           ],
//           total: 15,
//           orderTime: new Date().toLocaleString(),
//           deliveryType: Math.random() > 0.5 ? 'home' : 'pickup',
//           address: 'New Address, Sector 62, Noida',
//           prescriptionRequired: false
//         };
        
//         setOrders(prev => ({
//           ...prev,
//           pending: [...prev.pending, newOrder]
//         }));
        
//         if (notificationSettings.newOrders) {
//           showNotification('New Order Received', `Order ${newOrder.id} from ${newOrder.customerName}`);
//         }
//       }
//     }, 15000);

//     return () => clearInterval(orderInterval);
//   }, [orders, notificationSettings.newOrders]);

//   const navigationItems = [
//     { id: 'stock', label: 'Stock Management', icon: '📦' },
//     { id: 'orders', label: 'Orders', icon: '📋' },
//     { id: 'prescriptions', label: 'Prescription Verification', icon: '🩺' },
//     { id: 'analytics', label: 'Analytics', icon: '📊' }
//   ];

//   const stockFilters = [
//     { id: 'all', label: 'All Medicines' },
//     { id: 'low', label: 'Low Stock' },
//     { id: 'expiring', label: 'Expiring Soon' },
//     { id: 'prescription', label: 'Prescription Only' }
//   ];

//   const orderTabs = [
//     { id: 'pending', label: 'Pending', count: orders.pending.length },
//     { id: 'ready', label: 'Ready', count: orders.ready.length },
//     { id: 'picked', label: 'Picked', count: orders.picked.length },
//     { id: 'cancelled', label: 'Cancelled', count: orders.cancelled.length }
//   ];

//   const formatIndianCurrency = (amount) => {
//     return `₹${amount.toLocaleString('en-IN')}`;
//   };

//   const getCurrentGreeting = () => {
//     const hour = new Date().getHours();
//     if (hour < 12) return 'Good Morning';
//     if (hour < 18) return 'Good Afternoon';
//     return 'Good Evening';
//   };

//   const isLowStock = (medicine) => medicine.quantity <= medicine.minStock;
  
//   const isExpiringSoon = (medicine) => {
//     const expiryDate = new Date(medicine.expiryDate);
//     const today = new Date();
//     const diffTime = expiryDate - today;
//     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//     return diffDays <= 30;
//   };

//   const isExpired = (medicine) => {
//     const expiryDate = new Date(medicine.expiryDate);
//     const today = new Date();
//     return expiryDate < today;
//   };

//   // Enhanced search functionality
//   const filteredStock = stock.filter(medicine => {
//     const matchesSearch = searchTerm === '' || 
//       medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       medicine.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       medicine.batchNo.toLowerCase().includes(searchTerm.toLowerCase());
    
//     if (!matchesSearch) return false;
    
//     switch (stockFilter) {
//       case 'low':
//         return isLowStock(medicine);
//       case 'expiring':
//         return isExpiringSoon(medicine);
//       case 'prescription':
//         return medicine.prescriptionRequired;
//       default:
//         return true;
//     }
//   });

//   // Search handlers
//   const handleSearchChange = useCallback((e) => {
//     setSearchTerm(e.target.value);
//   }, []);

//   const handleClearSearch = useCallback(() => {
//     setSearchTerm('');
//   }, []);

//   const showNotification = (title, message) => {
//     console.log(`Notification: ${title} - ${message}`);
//     // Add to notifications list
//     const newNotification = {
//       id: notifications.length + 1,
//       type: getNotificationType(title),
//       title,
//       message,
//       time: 'Just now',
//       read: false
//     };
//     setNotifications(prev => [newNotification, ...prev]);
//   };

//   const getNotificationType = (title) => {
//     if (title.includes('Order')) return 'order';
//     if (title.includes('Prescription')) return 'prescription';
//     if (title.includes('Stock') || title.includes('Expiring')) return 'stock';
//     return 'system';
//   };

//   // Medicine Management Functions
//   const handleAddMedicine = () => {
//     const medicine = {
//       ...newMedicine,
//       id: Math.max(...stock.map(m => m.id), 0) + 1,
//       quantity: parseInt(newMedicine.quantity) || 0,
//       minStock: parseInt(newMedicine.minStock) || 0,
//       price: parseFloat(newMedicine.price) || 0
//     };
    
//     setStock(prev => [...prev, medicine]);
//     setShowAddMedicineModal(false);
//     setNewMedicine({
//       name: '',
//       category: '',
//       quantity: '',
//       minStock: '',
//       price: '',
//       expiryDate: '',
//       prescriptionRequired: false,
//       supplier: '',
//       batchNo: ''
//     });
    
//     showNotification('Medicine Added', `${medicine.name} has been added to inventory`);
//   };

//   const handleEditMedicine = (medicine) => {
//     setEditingMedicine({...medicine});
//     setShowEditStockModal(true);
//   };

//   const handleUpdateStock = () => {
//     if (editingMedicine) {
//       setStock(prev => prev.map(med => 
//         med.id === editingMedicine.id ? {
//           ...editingMedicine,
//           quantity: parseInt(editingMedicine.quantity) || 0,
//           minStock: parseInt(editingMedicine.minStock) || 0,
//           price: parseFloat(editingMedicine.price) || 0
//         } : med
//       ));
//       setShowEditStockModal(false);
//       setEditingMedicine(null);
//       showNotification('Stock Updated', `${editingMedicine.name} stock has been updated`);
//     }
//   };

//   // Profile Management Functions
//   const handleProfileUpdate = () => {
//     if (validateForm()) {
//       console.log('Profile updated:', userProfile);
//       setShowProfileModal(false);
//       setFormErrors({});
//       showNotification('Profile Updated', 'Your profile has been updated successfully');
//     }
//   };

//   // Notification Settings Functions
//   const handleSaveNotificationSettings = () => {
//     console.log('Notification settings saved:', notificationSettings);
//     setShowNotificationsModal(false);
//     showNotification('Settings Saved', 'Notification settings updated successfully');
//   };

//   // Notifications Functions
//   const handleClearAllNotifications = () => {
//     setNotifications([]);
//   };

//   // Order Management Functions
//   const markOrderReady = (orderId) => {
//     const order = orders.pending.find(o => o.id === orderId);
//     if (order) {
//       setOrders(prev => ({
//         ...prev,
//         pending: prev.pending.filter(o => o.id !== orderId),
//         ready: [...prev.ready, order]
//       }));
//       setSelectedOrder(null);
      
//       if (notificationSettings.orderReady) {
//         showNotification('Order Ready', `Order ${orderId} is now ready for ${order.deliveryType === 'pickup' ? 'pickup' : 'delivery'}`);
//       }
//     }
//   };

//   const markOrderPicked = (orderId) => {
//     const order = orders.ready.find(o => o.id === orderId);
//     if (order) {
//       setOrders(prev => ({
//         ...prev,
//         ready: prev.ready.filter(o => o.id !== orderId),
//         picked: [...prev.picked, order]
//       }));
//       setSelectedOrder(null);
//     }
//   };

//   const printLabel = (orderId) => {
//     alert(`Printing label for order ${orderId}`);
//   };

//   const cancelOrder = (orderId) => {
//     const order = orders.pending.find(o => o.id === orderId);
//     if (order) {
//       setOrders(prev => ({
//         ...prev,
//         pending: prev.pending.filter(o => o.id !== orderId),
//         cancelled: [...prev.cancelled, { ...order, cancelledTime: new Date().toLocaleString() }]
//       }));
//       setSelectedOrder(null);
//       showNotification('Order Cancelled', `Order ${orderId} has been cancelled`);
//     }
//   };

//   // Prescription Verification Functions
//   const approvePrescription = (prescriptionId) => {
//     setPrescriptions(prev => prev.map(p => 
//       p.id === prescriptionId ? { ...p, status: 'approved' } : p
//     ));
    
//     const prescription = prescriptions.find(p => p.id === prescriptionId);
//     if (prescription) {
//       const order = orders.pending.find(o => o.id === prescription.orderId);
//       if (order) {
//         markOrderReady(prescription.orderId);
//       }
//     }
    
//     setSelectedPrescription(null);
//   };

//   const rejectPrescription = (prescriptionId) => {
//     setPrescriptions(prev => prev.map(p => 
//       p.id === prescriptionId ? { ...p, status: 'rejected' } : p
//     ));
    
//     const prescription = prescriptions.find(p => p.id === prescriptionId);
//     if (prescription) {
//       cancelOrder(prescription.orderId);
//     }
    
//     setSelectedPrescription(null);
//   };

//   const messageDoctor = (prescriptionId) => {
//     const prescription = prescriptions.find(p => p.id === prescriptionId);
//     if (prescription) {
//       const message = `Need clarification for prescription ${prescriptionId} for order ${prescription.orderId}`;
//       alert(`Messaging Dr. ${prescription.doctorName}: ${message}`);
//     }
//   };

//   // Logout function
//   const handleLogout = () => {
//     setShowLogoutModal(true);
//   };

//   const confirmLogout = () => {
//     setShowLogoutModal(false);
//     if (onLogout) {
//       onLogout();
//     }
//   };

//   // Analytics data
//   const analyticsData = {
//     kpis: {
//       ordersToday: 24,
//       avgFulfillment: '32 mins',
//       splitOrders: 3,
//       revenue: 8450
//     },
//     orderTrends: [
//       { day: 'Mon', orders: 18, revenue: 6200 },
//       { day: 'Tue', orders: 22, revenue: 7400 },
//       { day: 'Wed', orders: 25, revenue: 8100 },
//       { day: 'Thu', orders: 20, revenue: 6800 },
//       { day: 'Fri', orders: 28, revenue: 9200 },
//       { day: 'Sat', orders: 35, revenue: 11500 },
//       { day: 'Sun', orders: 30, revenue: 9800 }
//     ],
//     topLocalities: [
//       { area: 'Sector 15', orders: 45 },
//       { area: 'Sector 18', orders: 38 },
//       { area: 'Sector 62', orders: 32 },
//       { area: 'Sector 128', orders: 28 },
//       { area: 'Sector 137', orders: 25 }
//     ]
//   };

//   const renderStockManagement = () => (
//     <div style={styles.mainContent}>
//       <div style={styles.header}>
//         <div>
//           <h1 style={styles.greeting}>{getCurrentGreeting()}, {userProfile.fullName?.split(' ')[0] || 'User'}</h1>
//           <p style={styles.subtitle}>Manage your medicine inventory and stock levels</p>
//         </div>
//         <div style={styles.headerActions}>
//           <button 
//             style={styles.notificationBell}
//             onClick={() => setShowNotificationsBellModal(true)}
//           >
//             🔔
//             {notifications.length > 0 && (
//               <span style={styles.notificationBadge}>
//                 {notifications.length}
//               </span>
//             )}
//           </button>
//           <button 
//             style={styles.primaryButton}
//             onClick={() => setShowAddMedicineModal(true)}
//           >
//             + Add Medicine
//           </button>
//         </div>
//       </div>

//       <div style={styles.filterTabs}>
//         {stockFilters.map(filter => (
//           <button
//             key={filter.id}
//             style={{
//               ...styles.filterTab,
//               ...(stockFilter === filter.id ? styles.filterTabActive : {})
//             }}
//             onClick={() => setStockFilter(filter.id)}
//           >
//             {filter.label}
//           </button>
//         ))}
//       </div>

//       <div style={styles.statsGrid}>
//         <div style={styles.statCard}>
//           <div style={{...styles.statIcon, backgroundColor: '#F7D9EB'}}>📦</div>
//           <div style={styles.statContent}>
//             <h3 style={styles.statNumber}>{stock.length}</h3>
//             <p style={styles.statLabel}>Total Medicines</p>
//           </div>
//         </div>

//         <div style={styles.statCard}>
//           <div style={{...styles.statIcon, backgroundColor: '#FFE4E6'}}>⚠️</div>
//           <div style={styles.statContent}>
//             <h3 style={styles.statNumber}>
//               {stock.filter(isLowStock).length}
//             </h3>
//             <p style={styles.statLabel}>Low Stock</p>
//           </div>
//         </div>

//         <div style={styles.statCard}>
//           <div style={{...styles.statIcon, backgroundColor: '#FEF3C7'}}>📅</div>
//           <div style={styles.statContent}>
//             <h3 style={styles.statNumber}>
//               {stock.filter(isExpiringSoon).length}
//             </h3>
//             <p style={styles.statLabel}>Expiring Soon</p>
//           </div>
//         </div>

//         <div style={styles.statCard}>
//           <div style={{...styles.statIcon, backgroundColor: '#D1FAE5'}}>🩺</div>
//           <div style={styles.statContent}>
//             <h3 style={styles.statNumber}>
//               {stock.filter(m => m.prescriptionRequired).length}
//             </h3>
//             <p style={styles.statLabel}>Prescription Only</p>
//           </div>
//         </div>
//       </div>

//       <div style={styles.section}>
//         <div style={styles.sectionHeader}>
//           <h2 style={styles.sectionTitle}>Medicine Inventory</h2>
//           <span style={styles.viewAll}>{filteredStock.length} items</span>
//         </div>

//         <SearchBar 
//           searchTerm={searchTerm}
//           onSearchChange={handleSearchChange}
//           onClearSearch={handleClearSearch}
//           filteredStock={filteredStock}
//         />

//         <div style={styles.tableContainer}>
//           <table style={styles.table}>
//             <thead>
//               <tr style={styles.tableHeader}>
//                 <th style={styles.tableCell}>Medicine Name</th>
//                 <th style={styles.tableCell}>Category</th>
//                 <th style={styles.tableCell}>Quantity</th>
//                 <th style={styles.tableCell}>Price</th>
//                 <th style={styles.tableCell}>Expiry Date</th>
//                 <th style={styles.tableCell}>Prescription</th>
//                 <th style={styles.tableCell}>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredStock.map(medicine => (
//                 <tr key={medicine.id} style={styles.tableRow}>
//                   <td style={styles.tableCell}>
//                     <div style={styles.medicineInfo}>
//                       <strong>{medicine.name}</strong>
//                       <span style={styles.batchNo}>{medicine.batchNo}</span>
//                     </div>
//                   </td>
//                   <td style={styles.tableCell}>{medicine.category}</td>
//                   <td style={styles.tableCell}>
//                     <span style={{
//                       ...styles.quantity,
//                       ...(isLowStock(medicine) ? styles.lowStock : {})
//                     }}>
//                       {medicine.quantity}
//                       {isLowStock(medicine) && ' ⚠️'}
//                     </span>
//                   </td>
//                   <td style={styles.tableCell}>{formatIndianCurrency(medicine.price)}</td>
//                   <td style={styles.tableCell}>
//                     <span style={{
//                       ...(isExpired(medicine) ? styles.expired : {}),
//                       ...(isExpiringSoon(medicine) && !isExpired(medicine) ? styles.expiringSoon : {})
//                     }}>
//                       {medicine.expiryDate}
//                       {isExpired(medicine) && ' 🔴'}
//                       {isExpiringSoon(medicine) && !isExpired(medicine) && ' 🟡'}
//                     </span>
//                   </td>
//                   <td style={styles.tableCell}>
//                     {medicine.prescriptionRequired ? 'Yes' : 'No'}
//                   </td>
//                   <td style={styles.tableCell}>
//                     <div style={styles.actionButtons}>
//                       <button 
//                         style={styles.smallButton}
//                         onClick={() => handleEditMedicine(medicine)}
//                       >
//                         Update Stock
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {filteredStock.length === 0 && (
//           <div style={styles.noResults}>
//             <p>No medicines found matching your search criteria.</p>
//             {searchTerm && (
//               <button 
//                 style={styles.secondaryButton}
//                 onClick={handleClearSearch}
//               >
//                 Clear Search
//               </button>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );

//   const renderOrdersManagement = () => (
//     <div style={styles.mainContent}>
//       <div style={styles.header}>
//         <div>
//           <h1 style={styles.greeting}>Orders Management</h1>
//           <p style={styles.subtitle}>Process and manage customer orders</p>
//         </div>
//         <div style={styles.headerActions}>
//           <button 
//             style={styles.notificationBell}
//             onClick={() => setShowNotificationsBellModal(true)}
//           >
//             🔔
//             {notifications.length > 0 && (
//               <span style={styles.notificationBadge}>
//                 {notifications.length}
//               </span>
//             )}
//           </button>
//           <div style={styles.dateDisplay}>
//             {new Date().toLocaleDateString('en-US', { 
//               weekday: 'long', 
//               year: 'numeric', 
//               month: 'long', 
//               day: 'numeric' 
//             })}
//           </div>
//         </div>
//       </div>

//       <div style={styles.orderTabs}>
//         {orderTabs.map(tab => (
//           <button
//             key={tab.id}
//             style={{
//               ...styles.orderTab,
//               ...(orderFilter === tab.id ? styles.orderTabActive : {})
//             }}
//             onClick={() => setOrderFilter(tab.id)}
//           >
//             <span>{tab.label}</span>
//             <span style={styles.orderCount}>{tab.count}</span>
//           </button>
//         ))}
//       </div>

//       <div style={styles.contentGrid}>
//         <div style={styles.section}>
//           <div style={styles.sectionHeader}>
//             <h2 style={styles.sectionTitle}>
//               {orderTabs.find(tab => tab.id === orderFilter)?.label} Orders
//             </h2>
//             <span style={styles.viewAll}>
//               {orders[orderFilter]?.length || 0} orders
//             </span>
//           </div>

//           <div style={styles.ordersList}>
//             {(orders[orderFilter] || []).map(order => (
//               <div 
//                 key={order.id} 
//                 style={{
//                   ...styles.orderCard,
//                   ...(selectedOrder?.id === order.id ? styles.orderCardSelected : {})
//                 }}
//                 onClick={() => setSelectedOrder(order)}
//               >
//                 <div style={styles.orderHeader}>
//                   <div style={styles.orderInfo}>
//                     <h4 style={styles.orderId}>{order.id}</h4>
//                     <p style={styles.customerName}>{order.customerName}</p>
//                   </div>
//                   <div style={styles.orderMeta}>
//                     <span style={styles.orderTime}>{order.orderTime}</span>
//                     <span style={styles.deliveryType}>{order.deliveryType}</span>
//                   </div>
//                 </div>
                
//                 <div style={styles.orderItems}>
//                   {order.items.map((item, index) => (
//                     <div key={index} style={styles.orderItem}>
//                       <span>{item.name}</span>
//                       <span>Qty: {item.quantity}</span>
//                     </div>
//                   ))}
//                 </div>

//                 <div style={styles.orderFooter}>
//                   <strong style={styles.orderTotal}>
//                     {formatIndianCurrency(order.total)}
//                   </strong>
//                   {order.prescriptionRequired && (
//                     <span style={styles.prescriptionBadge}>Prescription</span>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {selectedOrder && (
//           <div style={styles.orderDetailsPanel}>
//             <div style={styles.panelHeader}>
//               <h3 style={styles.panelTitle}>Order Details</h3>
//               <button 
//                 style={styles.closeButton}
//                 onClick={() => setSelectedOrder(null)}
//               >
//                 ✕
//               </button>
//             </div>

//             <div style={styles.panelContent}>
//               <div style={styles.customerInfo}>
//                 <h4 style={styles.customerName}>{selectedOrder.customerName}</h4>
//                 <p style={styles.customerPhone}>{selectedOrder.customerPhone}</p>
//                 <p style={styles.deliveryAddress}>{selectedOrder.address}</p>
//               </div>

//               <div style={styles.orderItemsDetailed}>
//                 <h5 style={styles.itemsTitle}>Order Items</h5>
//                 {selectedOrder.items.map((item, index) => (
//                   <div key={index} style={styles.orderItemDetailed}>
//                     <span style={styles.itemName}>{item.name}</span>
//                     <span style={styles.itemQuantity}>Qty: {item.quantity}</span>
//                     <span style={styles.itemPrice}>{formatIndianCurrency(item.price)}</span>
//                   </div>
//                 ))}
//                 <div style={styles.orderTotalSection}>
//                   <strong>Total: {formatIndianCurrency(selectedOrder.total)}</strong>
//                 </div>
//               </div>

//               <div style={styles.orderActions}>
//                 {orderFilter === 'pending' && (
//                   <>
//                     <button 
//                       style={styles.primaryButton}
//                       onClick={() => markOrderReady(selectedOrder.id)}
//                     >
//                       Mark Ready
//                     </button>
//                     <button 
//                       style={styles.secondaryButton}
//                       onClick={() => printLabel(selectedOrder.id)}
//                     >
//                       Print Label
//                     </button>
//                     <button 
//                       style={styles.dangerButton}
//                       onClick={() => cancelOrder(selectedOrder.id)}
//                     >
//                       Cancel Order
//                     </button>
//                   </>
//                 )}
//                 {orderFilter === 'ready' && (
//                   <button 
//                     style={styles.successButton}
//                     onClick={() => markOrderPicked(selectedOrder.id)}
//                   >
//                     Mark as Picked
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );

//   const renderPrescriptionVerification = () => (
//     <div style={styles.mainContent}>
//       <div style={styles.header}>
//         <div>
//           <h1 style={styles.greeting}>Prescription Verification</h1>
//           <p style={styles.subtitle}>
//             Validate prescription-required medicines • Real-time updates active
//             {prescriptions.filter(p => p.status === 'pending').length > 0 && (
//               <span style={styles.realtimeIndicator}> • Live</span>
//             )}
//           </p>
//         </div>
//         <div style={styles.headerActions}>
//           <button 
//             style={styles.notificationBell}
//             onClick={() => setShowNotificationsBellModal(true)}
//           >
//             🔔
//             {notifications.length > 0 && (
//               <span style={styles.notificationBadge}>
//                 {notifications.length}
//               </span>
//             )}
//           </button>
//           <div style={styles.prescriptionStats}>
//             <span style={styles.pendingCount}>
//               {prescriptions.filter(p => p.status === 'pending').length} Pending
//             </span>
//           </div>
//         </div>
//       </div>

//       <div style={styles.contentGrid}>
//         <div style={styles.section}>
//           <div style={styles.sectionHeader}>
//             <h2 style={styles.sectionTitle}>Pending Verifications</h2>
//             <span style={styles.viewAll}>
//               {prescriptions.length} prescriptions
//             </span>
//           </div>

//           <div style={styles.prescriptionsList}>
//             {prescriptions.map(prescription => (
//               <div 
//                 key={prescription.id}
//                 style={{
//                   ...styles.prescriptionCard,
//                   ...(selectedPrescription?.id === prescription.id ? styles.prescriptionCardSelected : {}),
//                   ...(prescription.status === 'approved' ? styles.prescriptionApproved : {}),
//                   ...(prescription.status === 'rejected' ? styles.prescriptionRejected : {})
//                 }}
//                 onClick={() => setSelectedPrescription(prescription)}
//               >
//                 <div style={styles.prescriptionHeader}>
//                   <div style={styles.prescriptionInfo}>
//                     <h4 style={styles.orderId}>{prescription.orderId}</h4>
//                     <p style={styles.customerName}>{prescription.customerName}</p>
//                     <p style={styles.doctorName}>Dr. {prescription.doctorName}</p>
//                   </div>
//                   <div style={styles.prescriptionMeta}>
//                     <span style={styles.uploadTime}>{prescription.uploadedTime}</span>
//                     {prescription.status !== 'pending' && (
//                       <span style={styles.statusTime}>
//                         {prescription.status === 'approved' ? 'Approved' : 'Rejected'}
//                       </span>
//                     )}
//                   </div>
//                 </div>
                
//                 <div style={styles.medicinesList}>
//                   <strong>Medicines:</strong>
//                   <div style={styles.medicineTags}>
//                     {prescription.medicines.map((medicine, index) => (
//                       <span key={index} style={styles.medicineTag}>
//                         {medicine}
//                       </span>
//                     ))}
//                   </div>
//                 </div>

//                 <div style={styles.prescriptionStatus}>
//                   <span style={{
//                     ...styles.statusBadge,
//                     ...(prescription.status === 'approved' ? styles.statusApproved : {}),
//                     ...(prescription.status === 'rejected' ? styles.statusRejected : {})
//                   }}>
//                     {prescription.status === 'pending' ? 'Pending' : 
//                      prescription.status === 'approved' ? 'Approved' : 'Rejected'}
//                   </span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {selectedPrescription && (
//           <div style={styles.prescriptionViewer}>
//             <div style={styles.viewerHeader}>
//               <h3 style={styles.viewerTitle}>Prescription Verification</h3>
//               <div style={styles.prescriptionInfo}>
//                 <p><strong>Order:</strong> {selectedPrescription.orderId}</p>
//                 <p><strong>Customer:</strong> {selectedPrescription.customerName}</p>
//                 <p><strong>Doctor:</strong> Dr. {selectedPrescription.doctorName}</p>
//                 <p><strong>Status:</strong> 
//                   <span style={{
//                     ...styles.statusText,
//                     ...(selectedPrescription.status === 'approved' ? styles.statusApproved : {}),
//                     ...(selectedPrescription.status === 'rejected' ? styles.statusRejected : {})
//                   }}>
//                     {selectedPrescription.status.charAt(0).toUpperCase() + selectedPrescription.status.slice(1)}
//                   </span>
//                 </p>
//               </div>
//             </div>

//             <div style={styles.viewerContent}>
//               <div style={styles.prescriptionImage}>
//                 <img 
//                   src={selectedPrescription.imageUrl} 
//                   alt="Prescription" 
//                   style={styles.prescriptionImg}
//                   onError={(e) => {
//                     e.target.src = 'https://via.placeholder.com/400x500?text=Prescription+Image';
//                   }}
//                 />
//                 <div style={styles.imageControls}>
//                   <button style={styles.smallButton}>Zoom In</button>
//                   <button style={styles.smallButton}>Zoom Out</button>
//                   <button style={styles.smallButton}>Rotate</button>
//                 </div>
//               </div>

//               <div style={styles.extractedMedicines}>
//                 <h4 style={styles.medicinesTitle}>Extracted Medicines</h4>
//                 <div style={styles.medicineList}>
//                   {selectedPrescription.medicines.map((medicine, index) => (
//                     <div key={index} style={styles.medicineItem}>
//                       <input type="checkbox" defaultChecked style={styles.checkbox} />
//                       <span>{medicine}</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               <div style={styles.verificationActions}>
//                 {selectedPrescription.status === 'pending' && (
//                   <>
//                     <button 
//                       style={styles.successButton}
//                       onClick={() => approvePrescription(selectedPrescription.id)}
//                     >
//                       ✅ Approve
//                     </button>
//                     <button 
//                       style={styles.dangerButton}
//                       onClick={() => rejectPrescription(selectedPrescription.id)}
//                     >
//                       ❌ Reject
//                     </button>
                    
//                   </>
//                 )}
//                 {selectedPrescription.status !== 'pending' && (
//                   <div style={styles.verificationResult}>
//                     <p style={styles.resultText}>
//                       This prescription has been {selectedPrescription.status}.
//                       {selectedPrescription.status === 'approved' ? ' Order has been processed.' : ' Order has been cancelled.'}
//                     </p>
//                     <button 
//                       style={styles.secondaryButton}
//                       onClick={() => setSelectedPrescription(null)}
//                     >
//                       Close
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );

//   const renderAnalytics = () => (
//     <div style={styles.mainContent}>
//       <div style={styles.header}>
//         <div>
//           <h1 style={styles.greeting}>Business Analytics</h1>
//           <p style={styles.subtitle}>Track your pharmacy performance and insights</p>
//         </div>
//         <div style={styles.headerActions}>
//           <button 
//             style={styles.notificationBell}
//             onClick={() => setShowNotificationsBellModal(true)}
//           >
//             🔔
//             {notifications.length > 0 && (
//               <span style={styles.notificationBadge}>
//                 {notifications.length}
//               </span>
//             )}
//           </button>
//         </div>
//       </div>

//       <div style={styles.kpisGrid}>
//         <div style={styles.kpiCard}>
//           <div style={styles.kpiIcon}>📋</div>
//           <div style={styles.kpiContent}>
//             <h3 style={styles.kpiNumber}>{analyticsData.kpis.ordersToday}</h3>
//             <p style={styles.kpiLabel}>Orders Today</p>
//           </div>
//         </div>

//         <div style={styles.kpiCard}>
//           <div style={styles.kpiIcon}>⏱️</div>
//           <div style={styles.kpiContent}>
//             <h3 style={styles.kpiNumber}>{analyticsData.kpis.avgFulfillment}</h3>
//             <p style={styles.kpiLabel}>Avg Fulfillment Time</p>
//           </div>
//         </div>

//         <div style={styles.kpiCard}>
//           <div style={styles.kpiIcon}>📦</div>
//           <div style={styles.kpiContent}>
//             <h3 style={styles.kpiNumber}>{analyticsData.kpis.splitOrders}</h3>
//             <p style={styles.kpiLabel}>Split Orders</p>
//           </div>
//         </div>

//         <div style={styles.kpiCard}>
//           <div style={styles.kpiIcon}>💰</div>
//           <div style={styles.kpiContent}>
//             <h3 style={styles.kpiNumber}>
//               {formatIndianCurrency(analyticsData.kpis.revenue)}
//             </h3>
//             <p style={styles.kpiLabel}>Revenue</p>
//           </div>
//         </div>
//       </div>

//       <div style={styles.analyticsGrid}>
//         <div style={styles.chartSection}>
//           <h3 style={styles.chartTitle}>Order Trends</h3>
//           <div style={styles.chartContainer}>
//             <div style={styles.chartBars}>
//               {analyticsData.orderTrends.map((day, index) => (
//                 <div key={index} style={styles.chartBarContainer}>
//                   <div 
//                     style={{
//                       ...styles.chartBar,
//                       height: `${(day.orders / 35) * 100}px`
//                     }}
//                   ></div>
//                   <span style={styles.chartLabel}>{day.day}</span>
//                   <span style={styles.chartValue}>{day.orders}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         <div style={styles.chartSection}>
//           <h3 style={styles.chartTitle}>Delivery Efficiency</h3>
//           <div style={styles.efficiencyChart}>
//             <div style={styles.efficiencyMetric}>
//               <span style={styles.efficiencyLabel}>On Time Delivery</span>
//               <div style={styles.efficiencyBar}>
//                 <div style={{...styles.efficiencyFill, width: '85%'}}></div>
//               </div>
//               <span style={styles.efficiencyValue}>85%</span>
//             </div>
//             <div style={styles.efficiencyMetric}>
//               <span style={styles.efficiencyLabel}>Order Accuracy</span>
//               <div style={styles.efficiencyBar}>
//                 <div style={{...styles.efficiencyFill, width: '92%'}}></div>
//               </div>
//               <span style={styles.efficiencyValue}>92%</span>
//             </div>
//             <div style={styles.efficiencyMetric}>
//               <span style={styles.efficiencyLabel}>Customer Satisfaction</span>
//               <div style={styles.efficiencyBar}>
//                 <div style={{...styles.efficiencyFill, width: '88%'}}></div>
//               </div>
//               <span style={styles.efficiencyValue}>88%</span>
//             </div>
//           </div>
//         </div>

//         <div style={styles.heatmapSection}>
//           <h3 style={styles.chartTitle}>High-Demand Localities</h3>
//           <div style={styles.heatmapContainer}>
//             {analyticsData.topLocalities.map((locality, index) => (
//               <div key={index} style={styles.heatmapItem}>
//                 <span style={styles.localityName}>{locality.area}</span>
//                 <div style={styles.heatmapBar}>
//                   <div 
//                     style={{
//                       ...styles.heatmapFill,
//                       width: `${(locality.orders / 45) * 100}%`
//                     }}
//                   ></div>
//                 </div>
//                 <span style={styles.localityOrders}>{locality.orders} orders</span>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div style={styles.chartSection}>
//           <h3 style={styles.chartTitle}>Revenue Trend</h3>
//           <div style={styles.revenueChart}>
//             <div style={styles.revenueBars}>
//               {analyticsData.orderTrends.map((day, index) => (
//                 <div key={index} style={styles.revenueBarContainer}>
//                   <div 
//                     style={{
//                       ...styles.revenueBar,
//                       height: `${(day.revenue / 11500) * 100}px`
//                     }}
//                   ></div>
//                   <span style={styles.chartLabel}>{day.day}</span>
//                   <span style={styles.chartValue}>{formatIndianCurrency(day.revenue)}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   const renderMainContent = () => {
//     switch (activePage) {
//       case 'stock':
//         return renderStockManagement();
//       case 'orders':
//         return renderOrdersManagement();
//       case 'prescriptions':
//         return renderPrescriptionVerification();
//       case 'analytics':
//         return renderAnalytics();
//       default:
//         return renderStockManagement();
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <div style={styles.sidebar}>
//         <div style={styles.sidebarHeader}>
//           <h1 style={styles.logo}>QUICKMED</h1>
//           <p style={styles.vendorTitle}>Vendor Portal</p>
//         </div>
        
//         <nav style={styles.navigation}>
//           {navigationItems.map(item => (
//             <button
//               key={item.id}
//               style={{
//                 ...styles.navButton,
//                 ...(activePage === item.id ? styles.navButtonActive : {})
//               }}
//               onClick={() => setActivePage(item.id)}
//             >
//               <span style={styles.navIcon}>{item.icon}</span>
//               <span style={styles.navLabel}>{item.label}</span>
//             </button>
//           ))}
//         </nav>

//         <div style={styles.profileSection}>
//           <div style={styles.userInfo}>
//             <div style={styles.userAvatar}>🏪</div>
//             <div style={styles.userDetails}>
//               <p style={styles.userName}>{userProfile.fullName}</p>
//               <p style={styles.userEmail}>{userProfile.email}</p>
//               <p style={styles.pharmacyName}>{userProfile.pharmacyName}</p>
//             </div>
//           </div>
//           <div style={styles.profileActions}>
//             <button 
//               style={styles.profileButton}
//               onClick={() => setShowProfileModal(true)}
//             >
//               Edit Profile
//             </button>
//           </div>
//         </div>

//         <div style={styles.sidebarFooter}>
//           <button style={styles.logoutButton} onClick={handleLogout}>
//             Logout
//           </button>
//         </div>
//       </div>

//       <div style={styles.content}>
//         {renderMainContent()}
//       </div>

//       {/* Modal Components */}
//       <AddMedicineModal
//         show={showAddMedicineModal}
//         onClose={() => setShowAddMedicineModal(false)}
//         onAdd={handleAddMedicine}
//         newMedicine={newMedicine}
//         setNewMedicine={setNewMedicine}
//       />

//       <EditStockModal
//         show={showEditStockModal}
//         onClose={() => setShowEditStockModal(false)}
//         onUpdate={handleUpdateStock}
//         editingMedicine={editingMedicine}
//         setEditingMedicine={setEditingMedicine}
//       />

//       <ProfileModal
//         show={showProfileModal}
//         onClose={() => setShowProfileModal(false)}
//         onUpdate={handleProfileUpdate}
//         userProfile={userProfile}
//         setUserProfile={setUserProfile}
//         formErrors={formErrors}
//         validateField={validateField}
//       />

//       <NotificationsModal
//         show={showNotificationsModal}
//         onClose={() => setShowNotificationsModal(false)}
//         onSave={handleSaveNotificationSettings}
//         notificationSettings={notificationSettings}
//         setNotificationSettings={setNotificationSettings}
//       />

//       <NotificationsBellModal
//         show={showNotificationsBellModal}
//         onClose={() => setShowNotificationsBellModal(false)}
//         notifications={notifications}
//         onClearAll={handleClearAllNotifications}
//       />

//       <LogoutConfirmationModal
//         show={showLogoutModal}
//         onClose={() => setShowLogoutModal(false)}
//         onConfirm={confirmLogout}
//       />
//     </div>
//   );
// };

// // Styles object with updated styles for notification bell
// const styles = {
//   container: {
//     display: 'flex',
//     minHeight: '100vh',
//     backgroundColor: '#f8fafc',
//     fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
//   },
//   sidebar: {
//     width: '280px',
//     backgroundColor: '#7C2A62',
//     color: 'white',
//     display: 'flex',
//     flexDirection: 'column',
//     position: 'fixed',
//     height: '100vh',
//     left: 0,
//     top: 0
//   },
//   sidebarHeader: {
//     padding: '30px 24px 20px',
//     borderBottom: '1px solid rgba(255,255,255,0.1)'
//   },
//   logo: {
//     fontSize: '24px',
//     fontWeight: '700',
//     margin: '0 0 4px 0',
//     color: 'white'
//   },
//   vendorTitle: {
//     fontSize: '14px',
//     opacity: 0.8,
//     margin: 0
//   },
//   navigation: {
//     flex: 1,
//     padding: '20px 0'
//   },
//   navButton: {
//     display: 'flex',
//     alignItems: 'center',
//     width: '100%',
//     padding: '16px 24px',
//     backgroundColor: 'transparent',
//     border: 'none',
//     color: 'white',
//     fontSize: '16px',
//     cursor: 'pointer',
//     transition: 'all 0.3s ease',
//     opacity: 0.8
//   },
//   navButtonActive: {
//     backgroundColor: 'rgba(255,255,255,0.1)',
//     opacity: 1,
//     borderRight: '4px solid #F7D9EB'
//   },
//   navIcon: {
//     fontSize: '20px',
//     marginRight: '12px',
//     width: '24px',
//     textAlign: 'center'
//   },
//   navLabel: {
//     fontWeight: '500'
//   },
//   profileSection: {
//     padding: '20px 24px',
//     borderTop: '1px solid rgba(255,255,255,0.1)',
//     borderBottom: '1px solid rgba(255,255,255,0.1)'
//   },
//   userInfo: {
//     display: 'flex',
//     alignItems: 'flex-start',
//     marginBottom: '16px'
//   },
//   userAvatar: {
//     fontSize: '32px',
//     marginRight: '12px',
//     marginTop: '4px'
//   },
//   userDetails: {
//     flex: 1
//   },
//   userName: {
//     margin: '0 0 4px 0',
//     fontWeight: '600',
//     fontSize: '14px'
//   },
//   userEmail: {
//     margin: '0 0 4px 0',
//     fontSize: '12px',
//     opacity: 0.8
//   },
//   pharmacyName: {
//     margin: 0,
//     fontSize: '11px',
//     opacity: 0.7,
//     fontStyle: 'italic'
//   },
//   profileActions: {
//     display: 'flex',
//     flexDirection: 'column',
//     gap: '8px'
//   },
//   profileButton: {
//     width: '100%',
//     padding: '8px 12px',
//     backgroundColor: 'rgba(255,255,255,0.1)',
//     color: 'white',
//     border: 'none',
//     borderRadius: '6px',
//     cursor: 'pointer',
//     fontSize: '12px',
//     fontWeight: '500',
//     transition: 'background-color 0.3s ease'
//   },
//   sidebarFooter: {
//     padding: '20px 24px'
//   },
//   logoutButton: {
//     width: '100%',
//     padding: '12px',
//     backgroundColor: 'rgba(255,255,255,0.1)',
//     color: 'white',
//     border: 'none',
//     borderRadius: '8px',
//     cursor: 'pointer',
//     fontWeight: '500',
//     transition: 'background-color 0.3s ease'
//   },
//   content: {
//     flex: 1,
//     marginLeft: '280px',
//     padding: '0'
//   },
//   mainContent: {
//     padding: '30px',
//     minHeight: '100vh'
//   },
//   header: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'flex-start',
//     marginBottom: '30px'
//   },
//   headerActions: {
//     display: 'flex',
//     alignItems: 'center',
//     gap: '16px'
//   },
//   notificationBell: {
//     position: 'relative',
//     backgroundColor: 'white',
//     border: '1px solid #e5e7eb',
//     borderRadius: '8px',
//     padding: '10px 12px',
//     fontSize: '18px',
//     cursor: 'pointer',
//     transition: 'all 0.3s ease',
//     boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
//   },
//   notificationBadge: {
//     position: 'absolute',
//     top: '-5px',
//     right: '-5px',
//     backgroundColor: '#EF4444',
//     color: 'white',
//     borderRadius: '50%',
//     width: '18px',
//     height: '18px',
//     fontSize: '10px',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     fontWeight: '600'
//   },
//   greeting: {
//     fontSize: '28px',
//     fontWeight: '700',
//     color: '#1f2937',
//     margin: '0 0 8px 0'
//   },
//   subtitle: {
//     fontSize: '16px',
//     color: '#6b7280',
//     margin: 0
//   },
//   dateDisplay: {
//     fontSize: '14px',
//     color: '#6b7280',
//     fontWeight: '500'
//   },
//   primaryButton: {
//     backgroundColor: '#7C2A62',
//     color: 'white',
//     border: 'none',
//     padding: '12px 20px',
//     borderRadius: '8px',
//     fontSize: '14px',
//     fontWeight: '600',
//     cursor: 'pointer',
//     transition: 'background-color 0.3s ease'
//   },
//   secondaryButton: {
//     backgroundColor: 'transparent',
//     color: '#7C2A62',
//     border: '2px solid #7C2A62',
//     padding: '10px 18px',
//     borderRadius: '8px',
//     fontSize: '14px',
//     fontWeight: '600',
//     cursor: 'pointer',
//     transition: 'all 0.3s ease'
//   },
//   successButton: {
//     backgroundColor: '#10B981',
//     color: 'white',
//     border: 'none',
//     padding: '12px 20px',
//     borderRadius: '8px',
//     fontSize: '14px',
//     fontWeight: '600',
//     cursor: 'pointer'
//   },
//   dangerButton: {
//     backgroundColor: '#EF4444',
//     color: 'white',
//     border: 'none',
//     padding: '12px 20px',
//     borderRadius: '8px',
//     fontSize: '14px',
//     fontWeight: '600',
//     cursor: 'pointer'
//   },
//   smallButton: {
//     backgroundColor: '#7C2A62',
//     color: 'white',
//     border: 'none',
//     padding: '6px 12px',
//     borderRadius: '4px',
//     fontSize: '12px',
//     fontWeight: '500',
//     cursor: 'pointer',
//     marginRight: '8px'
//   },
//   clearAllButton: {
//     backgroundColor: 'transparent',
//     color: '#7C2A62',
//     border: 'none',
//     padding: '6px 12px',
//     borderRadius: '4px',
//     fontSize: '12px',
//     fontWeight: '500',
//     cursor: 'pointer',
//     marginRight: '8px'
//   },
//   searchContainer: {
//     marginBottom: '24px'
//   },
//   searchInputContainer: {
//     position: 'relative',
//     display: 'flex',
//     alignItems: 'center',
//     backgroundColor: 'white',
//     border: '1px solid #e5e7eb',
//     borderRadius: '8px',
//     padding: '8px 12px',
//     transition: 'border-color 0.3s ease'
//   },
//   searchIcon: {
//     marginRight: '8px',
//     color: '#6b7280'
//   },
//   searchInput: {
//     flex: 1,
//     border: 'none',
//     outline: 'none',
//     fontSize: '14px',
//     padding: '4px 0'
//   },
//   clearSearchButton: {
//     background: 'none',
//     border: 'none',
//     cursor: 'pointer',
//     color: '#6b7280',
//     fontSize: '16px',
//     padding: '4px'
//   },
//   searchResultsInfo: {
//     marginTop: '8px',
//     fontSize: '14px',
//     color: '#6b7280'
//   },
//   noResults: {
//     textAlign: 'center',
//     padding: '40px',
//     color: '#6b7280'
//   },
//   filterTabs: {
//     display: 'flex',
//     gap: '8px',
//     marginBottom: '24px'
//   },
//   filterTab: {
//     padding: '10px 20px',
//     backgroundColor: 'white',
//     border: '1px solid #e5e7eb',
//     borderRadius: '8px',
//     cursor: 'pointer',
//     fontSize: '14px',
//     fontWeight: '500',
//     transition: 'all 0.3s ease'
//   },
//   filterTabActive: {
//     backgroundColor: '#7C2A62',
//     color: 'white',
//     borderColor: '#7C2A62'
//   },
//   statsGrid: {
//     display: 'grid',
//     gridTemplateColumns: 'repeat(4, 1fr)',
//     gap: '20px',
//     marginBottom: '30px'
//   },
//   statCard: {
//     backgroundColor: 'white',
//     padding: '20px',
//     borderRadius: '12px',
//     boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
//     display: 'flex',
//     alignItems: 'center',
//     border: '1px solid #e5e7eb'
//   },
//   statIcon: {
//     fontSize: '24px',
//     marginRight: '16px',
//     width: '50px',
//     height: '50px',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderRadius: '10px'
//   },
//   statContent: {
//     flex: 1
//   },
//   statNumber: {
//     fontSize: '24px',
//     fontWeight: '700',
//     color: '#1f2937',
//     margin: '0 0 4px 0'
//   },
//   statLabel: {
//     fontSize: '14px',
//     color: '#6b7280',
//     margin: 0
//   },
//   section: {
//     backgroundColor: 'white',
//     borderRadius: '12px',
//     padding: '24px',
//     boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
//     border: '1px solid #e5e7eb'
//   },
//   sectionHeader: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: '20px'
//   },
//   sectionTitle: {
//     fontSize: '20px',
//     fontWeight: '600',
//     color: '#1f2937',
//     margin: 0
//   },
//   viewAll: {
//     fontSize: '14px',
//     color: '#7C2A62',
//     fontWeight: '500',
//     cursor: 'pointer'
//   },
//   tableContainer: {
//     overflowX: 'auto'
//   },
//   table: {
//     width: '100%',
//     borderCollapse: 'collapse'
//   },
//   tableHeader: {
//     backgroundColor: '#f8fafc',
//     borderBottom: '2px solid #e5e7eb'
//   },
//   tableRow: {
//     borderBottom: '1px solid #e5e7eb',
//     transition: 'background-color 0.2s ease'
//   },
//   tableCell: {
//     padding: '12px 16px',
//     textAlign: 'left',
//     fontSize: '14px'
//   },
//   medicineInfo: {
//     display: 'flex',
//     flexDirection: 'column',
//     gap: '2px'
//   },
//   batchNo: {
//     fontSize: '12px',
//     color: '#6b7280'
//   },
//   quantity: {
//     fontWeight: '600'
//   },
//   lowStock: {
//     color: '#EF4444'
//   },
//   expiringSoon: {
//     color: '#F59E0B'
//   },
//   expired: {
//     color: '#EF4444',
//     fontWeight: '600'
//   },
//   actionButtons: {
//     display: 'flex',
//     gap: '4px'
//   },
//   orderTabs: {
//     display: 'flex',
//     gap: '4px',
//     backgroundColor: 'white',
//     padding: '4px',
//     borderRadius: '8px',
//     border: '1px solid #e5e7eb',
//     marginBottom: '24px'
//   },
//   orderTab: {
//     display: 'flex',
//     alignItems: 'center',
//     gap: '8px',
//     padding: '12px 20px',
//     backgroundColor: 'transparent',
//     border: 'none',
//     borderRadius: '6px',
//     cursor: 'pointer',
//     fontSize: '14px',
//     fontWeight: '500',
//     transition: 'all 0.3s ease'
//   },
//   orderTabActive: {
//     backgroundColor: '#7C2A62',
//     color: 'white'
//   },
//   orderCount: {
//     backgroundColor: 'rgba(255,255,255,0.2)',
//     color: 'inherit',
//     padding: '2px 8px',
//     borderRadius: '12px',
//     fontSize: '12px',
//     fontWeight: '600'
//   },
//   contentGrid: {
//     display: 'grid',
//     gridTemplateColumns: '1fr 400px',
//     gap: '24px'
//   },
//   ordersList: {
//     display: 'flex',
//     flexDirection: 'column',
//     gap: '12px'
//   },
//   orderCard: {
//     padding: '16px',
//     border: '1px solid #e5e7eb',
//     borderRadius: '8px',
//     cursor: 'pointer',
//     transition: 'all 0.3s ease'
//   },
//   orderCardSelected: {
//     borderColor: '#7C2A62',
//     backgroundColor: '#F7D9EB'
//   },
//   orderHeader: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'flex-start',
//     marginBottom: '8px'
//   },
//   orderInfo: {
//     flex: 1
//   },
//   orderId: {
//     fontSize: '14px',
//     fontWeight: '600',
//     color: '#1f2937',
//     margin: '0 0 4px 0'
//   },
//   customerName: {
//     fontSize: '14px',
//     color: '#6b7280',
//     margin: 0
//   },
//   orderMeta: {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'flex-end',
//     gap: '2px'
//   },
//   orderTime: {
//     fontSize: '12px',
//     color: '#6b7280'
//   },
//   deliveryType: {
//     fontSize: '12px',
//     color: '#7C2A62',
//     fontWeight: '500'
//   },
//   orderItems: {
//     marginBottom: '8px'
//   },
//   orderItem: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     fontSize: '12px',
//     color: '#6b7280',
//     marginBottom: '2px'
//   },
//   orderFooter: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center'
//   },
//   orderTotal: {
//     color: '#1f2937'
//   },
//   prescriptionBadge: {
//     backgroundColor: '#F7D9EB',
//     color: '#7C2A62',
//     padding: '2px 8px',
//     borderRadius: '12px',
//     fontSize: '10px',
//     fontWeight: '500'
//   },
//   orderDetailsPanel: {
//     backgroundColor: 'white',
//     borderRadius: '12px',
//     boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
//     border: '1px solid #e5e7eb',
//     height: 'fit-content'
//   },
//   panelHeader: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: '20px',
//     borderBottom: '1px solid #e5e7eb'
//   },
//   panelTitle: {
//     fontSize: '18px',
//     fontWeight: '600',
//     color: '#1f2937',
//     margin: 0
//   },
//   closeButton: {
//     backgroundColor: 'transparent',
//     border: 'none',
//     fontSize: '18px',
//     cursor: 'pointer',
//     color: '#6b7280'
//   },
//   panelContent: {
//     padding: '20px'
//   },
//   customerInfo: {
//     marginBottom: '20px'
//   },
//   customerPhone: {
//     fontSize: '14px',
//     color: '#6b7280',
//     margin: '4px 0'
//   },
//   deliveryAddress: {
//     fontSize: '14px',
//     color: '#6b7280',
//     margin: '4px 0'
//   },
//   orderItemsDetailed: {
//     marginBottom: '20px'
//   },
//   itemsTitle: {
//     fontSize: '16px',
//     fontWeight: '600',
//     margin: '0 0 12px 0'
//   },
//   orderItemDetailed: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: '8px 0',
//     borderBottom: '1px solid #f3f4f6'
//   },
//   itemName: {
//     flex: 1,
//     fontSize: '14px'
//   },
//   itemQuantity: {
//     fontSize: '14px',
//     color: '#6b7280'
//   },
//   itemPrice: {
//     fontSize: '14px',
//     fontWeight: '600'
//   },
//   orderTotalSection: {
//     paddingTop: '12px',
//     borderTop: '2px solid #e5e7eb',
//     textAlign: 'right'
//   },
//   orderActions: {
//     display: 'flex',
//     flexDirection: 'column',
//     gap: '8px'
//   },
//   prescriptionStats: {
//     display: 'flex',
//     alignItems: 'center'
//   },
//   pendingCount: {
//     backgroundColor: '#FEF3C7',
//     color: '#D97706',
//     padding: '8px 16px',
//     borderRadius: '20px',
//     fontSize: '14px',
//     fontWeight: '600'
//   },
//   prescriptionsList: {
//     display: 'flex',
//     flexDirection: 'column',
//     gap: '12px'
//   },
//   prescriptionCard: {
//     padding: '16px',
//     border: '1px solid #e5e7eb',
//     borderRadius: '8px',
//     cursor: 'pointer',
//     transition: 'all 0.3s ease'
//   },
//   prescriptionCardSelected: {
//     borderColor: '#7C2A62',
//     backgroundColor: '#F7D9EB'
//   },
//   prescriptionHeader: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'flex-start',
//     marginBottom: '8px'
//   },
//   doctorName: {
//     fontSize: '12px',
//     color: '#6b7280',
//     margin: '2px 0 0 0'
//   },
//   uploadTime: {
//     fontSize: '12px',
//     color: '#6b7280'
//   },
//   medicinesList: {
//     marginBottom: '8px'
//   },
//   medicineTags: {
//     display: 'flex',
//     flexWrap: 'wrap',
//     gap: '4px',
//     marginTop: '4px'
//   },
//   medicineTag: {
//     backgroundColor: '#F7D9EB',
//     color: '#7C2A62',
//     padding: '2px 6px',
//     borderRadius: '8px',
//     fontSize: '10px',
//     fontWeight: '500'
//   },
//   prescriptionStatus: {
//     textAlign: 'right'
//   },
//   statusBadge: {
//     backgroundColor: '#F59E0B',
//     color: 'white',
//     padding: '4px 8px',
//     borderRadius: '12px',
//     fontSize: '10px',
//     fontWeight: '500'
//   },
//   prescriptionViewer: {
//     backgroundColor: 'white',
//     borderRadius: '12px',
//     boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
//     border: '1px solid #e5e7eb'
//   },
//   viewerHeader: {
//     padding: '20px',
//     borderBottom: '1px solid #e5e7eb'
//   },
//   viewerTitle: {
//     fontSize: '18px',
//     fontWeight: '600',
//     color: '#1f2937',
//     margin: '0 0 12px 0'
//   },
//   prescriptionInfo: {
//     fontSize: '14px',
//     color: '#6b7280'
//   },
//   viewerContent: {
//     padding: '20px'
//   },
//   prescriptionImage: {
//     marginBottom: '20px'
//   },
//   prescriptionImg: {
//     width: '100%',
//     height: '300px',
//     objectFit: 'contain',
//     border: '1px solid #e5e7eb',
//     borderRadius: '8px',
//     backgroundColor: '#f8fafc'
//   },
//   imageControls: {
//     display: 'flex',
//     gap: '8px',
//     marginTop: '8px'
//   },
//   extractedMedicines: {
//     marginBottom: '20px'
//   },
//   medicinesTitle: {
//     fontSize: '16px',
//     fontWeight: '600',
//     margin: '0 0 12px 0'
//   },
//   medicineList: {
//     display: 'flex',
//     flexDirection: 'column',
//     gap: '8px'
//   },
//   medicineItem: {
//     display: 'flex',
//     alignItems: 'center',
//     gap: '8px'
//   },
//   checkbox: {
//     margin: 0
//   },
//   verificationActions: {
//     display: 'flex',
//     gap: '8px'
//   },
//   periodSelector: {
//     display: 'flex',
//     alignItems: 'center'
//   },
//   periodSelect: {
//     padding: '8px 12px',
//     border: '1px solid #e5e7eb',
//     borderRadius: '6px',
//     fontSize: '14px',
//     backgroundColor: 'white'
//   },
//   kpisGrid: {
//     display: 'grid',
//     gridTemplateColumns: 'repeat(4, 1fr)',
//     gap: '20px',
//     marginBottom: '30px'
//   },
//   kpiCard: {
//     backgroundColor: 'white',
//     padding: '24px',
//     borderRadius: '12px',
//     boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
//     display: 'flex',
//     alignItems: 'center',
//     border: '1px solid #e5e7eb'
//   },
//   kpiIcon: {
//     fontSize: '32px',
//     marginRight: '16px',
//     width: '60px',
//     height: '60px',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderRadius: '12px',
//     backgroundColor: '#F7D9EB'
//   },
//   kpiContent: {
//     flex: 1
//   },
//   kpiNumber: {
//     fontSize: '28px',
//     fontWeight: '700',
//     color: '#1f2937',
//     margin: '0 0 4px 0'
//   },
//   kpiLabel: {
//     fontSize: '14px',
//     color: '#6b7280',
//     margin: 0
//   },
//   analyticsGrid: {
//     display: 'grid',
//     gridTemplateColumns: '1fr 1fr',
//     gap: '24px'
//   },
//   chartSection: {
//     backgroundColor: 'white',
//     padding: '24px',
//     borderRadius: '12px',
//     boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
//     border: '1px solid #e5e7eb'
//   },
//   chartTitle: {
//     fontSize: '18px',
//     fontWeight: '600',
//     color: '#1f2937',
//     margin: '0 0 20px 0'
//   },
//   chartContainer: {
//     height: '200px',
//     display: 'flex',
//     alignItems: 'flex-end'
//   },
//   chartBars: {
//     display: 'flex',
//     alignItems: 'flex-end',
//     gap: '16px',
//     width: '100%',
//     height: '150px'
//   },
//   chartBarContainer: {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     flex: 1
//   },
//   chartBar: {
//     backgroundColor: '#7C2A62',
//     width: '30px',
//     borderRadius: '4px 4px 0 0',
//     minHeight: '10px'
//   },
//   chartLabel: {
//     fontSize: '12px',
//     color: '#6b7280',
//     marginTop: '8px'
//   },
//   chartValue: {
//     fontSize: '10px',
//     color: '#7C2A62',
//     fontWeight: '600',
//     marginTop: '4px'
//   },
//   efficiencyChart: {
//     display: 'flex',
//     flexDirection: 'column',
//     gap: '16px'
//   },
//   efficiencyMetric: {
//     display: 'flex',
//     alignItems: 'center',
//     gap: '12px'
//   },
//   efficiencyLabel: {
//     fontSize: '14px',
//     color: '#6b7280',
//     minWidth: '120px'
//   },
//   efficiencyBar: {
//     flex: 1,
//     height: '8px',
//     backgroundColor: '#e5e7eb',
//     borderRadius: '4px',
//     overflow: 'hidden'
//   },
//   efficiencyFill: {
//     height: '100%',
//     backgroundColor: '#7C2A62',
//     borderRadius: '4px'
//   },
//   efficiencyValue: {
//     fontSize: '14px',
//     fontWeight: '600',
//     color: '#7C2A62',
//     minWidth: '40px'
//   },
//   heatmapSection: {
//     backgroundColor: 'white',
//     padding: '24px',
//     borderRadius: '12px',
//     boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
//     border: '1px solid #e5e7eb'
//   },
//   heatmapContainer: {
//     display: 'flex',
//     flexDirection: 'column',
//     gap: '12px'
//   },
//   heatmapItem: {
//     display: 'flex',
//     alignItems: 'center',
//     gap: '12px'
//   },
//   localityName: {
//     fontSize: '14px',
//     color: '#6b7280',
//     minWidth: '80px'
//   },
//   heatmapBar: {
//     flex: 1,
//     height: '8px',
//     backgroundColor: '#e5e7eb',
//     borderRadius: '4px',
//     overflow: 'hidden'
//   },
//   heatmapFill: {
//     height: '100%',
//     backgroundColor: '#7C2A62',
//     borderRadius: '4px'
//   },
//   localityOrders: {
//     fontSize: '12px',
//     color: '#7C2A62',
//     fontWeight: '600',
//     minWidth: '60px'
//   },
//   revenueChart: {
//     height: '200px',
//     display: 'flex',
//     alignItems: 'flex-end'
//   },
//   revenueBars: {
//     display: 'flex',
//     alignItems: 'flex-end',
//     gap: '16px',
//     width: '100%',
//     height: '150px'
//   },
//   revenueBarContainer: {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     flex: 1
//   },
//   revenueBar: {
//     backgroundColor: '#7C2A62',
//     width: '30px',
//     borderRadius: '4px 4px 0 0',
//     minHeight: '10px'
//   },
//   modalOverlay: {
//     position: 'fixed',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     zIndex: 1000
//   },
//   modal: {
//     backgroundColor: 'white',
//     borderRadius: '12px',
//     padding: 0,
//     width: '500px',
//     maxWidth: '90vw',
//     maxHeight: '90vh',
//     overflow: 'auto',
//     boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
//   },
//   modalHeader: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: '20px',
//     borderBottom: '1px solid #e5e7eb'
//   },
//   notificationHeaderActions: {
//     display: 'flex',
//     alignItems: 'center',
//     gap: '8px'
//   },
//   modalTitle: {
//     fontSize: '18px',
//     fontWeight: '600',
//     color: '#1f2937',
//     margin: 0
//   },
//   modalContent: {
//     padding: '20px'
//   },
//   modalActions: {
//     display: 'flex',
//     justifyContent: 'flex-end',
//     gap: '12px',
//     padding: '20px',
//     borderTop: '1px solid #e5e7eb'
//   },
//   formRow: {
//     marginBottom: '16px'
//   },
//   formGrid: {
//     display: 'grid',
//     gridTemplateColumns: '1fr 1fr',
//     gap: '16px'
//   },
//   label: {
//     display: 'block',
//     marginBottom: '6px',
//     fontWeight: '500',
//     color: '#374151',
//     fontSize: '14px'
//   },
//   checkboxLabel: {
//     display: 'flex',
//     alignItems: 'center',
//     gap: '8px',
//     fontWeight: '500',
//     color: '#374151',
//     fontSize: '14px'
//   },
//   input: {
//     width: '100%',
//     padding: '10px 12px',
//     border: '1px solid #d1d5db',
//     borderRadius: '6px',
//     fontSize: '14px',
//     transition: 'border-color 0.3s ease',
//     boxSizing: 'border-box'
//   },
//   inputError: {
//     borderColor: '#EF4444',
//     backgroundColor: '#FEF2F2'
//   },
//   lockedField: {
//     backgroundColor: '#f9fafb',
//     color: '#6b7280',
//     cursor: 'not-allowed'
//   },
//   lockedNote: {
//     fontSize: '12px',
//     color: '#6b7280',
//     fontStyle: 'italic',
//     marginTop: '4px'
//   },
//   errorText: {
//     color: '#EF4444',
//     fontSize: '12px',
//     marginTop: '4px'
//   },
//   requiredNote: {
//     fontSize: '12px',
//     color: '#6b7280',
//     fontStyle: 'italic',
//     marginTop: '16px'
//   },
//   confirmationText: {
//     fontSize: '16px',
//     color: '#6b7280',
//     textAlign: 'center',
//     margin: '20px 0'
//   },
//   realtimeIndicator: {
//     color: '#10B981',
//     fontWeight: '600'
//   },
//   prescriptionApproved: {
//     borderColor: '#10B981',
//     backgroundColor: '#F0FDF4'
//   },
//   prescriptionRejected: {
//     borderColor: '#EF4444',
//     backgroundColor: '#FEF2F2'
//   },
//   statusApproved: {
//     backgroundColor: '#10B981',
//     color: 'white'
//   },
//   statusRejected: {
//     backgroundColor: '#EF4444',
//     color: 'white'
//   },
//   statusText: {
//     padding: '4px 8px',
//     borderRadius: '12px',
//     fontSize: '12px',
//     fontWeight: '500',
//     marginLeft: '8px'
//   },
//   prescriptionMeta: {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'flex-end',
//     gap: '2px'
//   },
//   statusTime: {
//     fontSize: '11px',
//     color: '#6b7280',
//     fontStyle: 'italic'
//   },
//   verificationResult: {
//     textAlign: 'center',
//     padding: '20px'
//   },
//   resultText: {
//     marginBottom: '16px',
//     color: '#6b7280',
//     fontSize: '14px'
//   },
//   settingsSection: {
//     marginBottom: '24px',
//     paddingBottom: '16px',
//     borderBottom: '1px solid #e5e7eb'
//   },
//   settingsTitle: {
//     fontSize: '16px',
//     fontWeight: '600',
//     color: '#1f2937',
//     margin: '0 0 12px 0'
//   },
//   settingItem: {
//     display: 'flex',
//     flexDirection: 'column',
//     gap: '4px',
//     marginBottom: '12px'
//   },
//   settingDescription: {
//     fontSize: '12px',
//     color: '#6b7280',
//     marginLeft: '24px'
//   },
//   // Notification bell modal styles
//   noNotifications: {
//     textAlign: 'center',
//     padding: '40px 20px'
//   },
//   noNotificationsIcon: {
//     fontSize: '48px',
//     marginBottom: '16px',
//     opacity: 0.5
//   },
//   noNotificationsText: {
//     color: '#6b7280',
//     fontSize: '16px',
//     margin: 0
//   },
//   notificationsList: {
//     maxHeight: '400px',
//     overflowY: 'auto'
//   },
//   notificationItem: {
//     display: 'flex',
//     alignItems: 'flex-start',
//     padding: '12px',
//     border: '1px solid #e5e7eb',
//     borderRadius: '8px',
//     marginBottom: '8px',
//     backgroundColor: '#f8fafc'
//   },
//   notificationIcon: {
//     fontSize: '20px',
//     marginRight: '12px',
//     marginTop: '2px'
//   },
//   notificationContent: {
//     flex: 1
//   },
//   notificationTitle: {
//     fontWeight: '600',
//     color: '#1f2937',
//     margin: '0 0 4px 0',
//     fontSize: '14px'
//   },
//   notificationMessage: {
//     color: '#6b7280',
//     margin: '0 0 4px 0',
//     fontSize: '13px'
//   },
//   notificationTime: {
//     color: '#9ca3af',
//     fontSize: '11px'
//   }
// };

// export default VendorDashboard;