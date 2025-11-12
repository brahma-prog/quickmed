import React, { useState, useEffect } from 'react';

export const BackButton = ({ onClick, text = 'Back', styles }) => (
  <button 
    style={styles.backButton}
    onClick={onClick}
    type="button"
  >
    ← {text}
  </button>
);

export const MedicineCard = ({ medicine, cart, updateQuantity, addToCart, styles }) => {
  const cartItem = cart.find(item => item.id === medicine.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  return (
    <div style={styles.productCard}>
      <div style={styles.productInfo}>
        <h4 style={styles.productName}>{medicine.name}</h4>
        <p style={styles.productVendor}>{medicine.vendor}</p>
        <div style={styles.productCategory}>
          <span style={styles.categoryBadge}>{medicine.category}</span>
        </div>
        <div style={styles.productFooter}>
          <p style={styles.productPrice}>₹{medicine.price}</p>
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
                style={styles.addToCartButton}
                onClick={() => addToCart(medicine)}
                type="button"
              >
                Add to Cart
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const DoctorCard = ({ doctor, handleBookAppointment, startDoctorChat, styles }) => (
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

export const PharmacyMedicineCard = ({ medicine, cart, updateQuantity, addToCartFromPharmacy, styles }) => {
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

export const NearbyPharmaciesSection = ({ 
  pharmacies, 
  viewPharmacyStore, 
  handlePharmacySearch, 
  getFilteredPharmacyMedicines,
  addToCartFromPharmacy,
  cart,
  updateQuantity,
  styles 
}) => {
  const PharmacyCard = ({ pharmacy }) => {
    const filteredMedicines = getFilteredPharmacyMedicines(pharmacy);
    const searchQuery = handlePharmacySearch[pharmacy.id] || '';

    return (
      <div key={pharmacy.id} style={styles.pharmacyCard}>
        <div style={styles.pharmacyHeader}>
          <div style={styles.pharmacyIcon}>🏪</div>
          <div style={styles.pharmacyInfo}>
            <h4 style={styles.pharmacyName}>{pharmacy.name}</h4>
            <div style={styles.pharmacyRating}>
              ⭐ {pharmacy.rating}
            </div>
          </div>
        </div>
        <div style={styles.pharmacyDetails}>
          <div style={styles.pharmacyDetailItem}>
            <span style={styles.pharmacyDetailLabel}>Distance:</span>
            <span style={styles.pharmacyDetailValue}>{pharmacy.distance}</span>
          </div>
          <div style={styles.pharmacyDetailItem}>
            <span style={styles.pharmacyDetailLabel}>Delivery Time:</span>
            <span style={styles.pharmacyDetailValue}>{pharmacy.deliveryTime}</span>
          </div>
        </div>
        
        <div style={styles.pharmacySearchContainer}>
          <input
            type="text"
            placeholder={`Search medicines in ${pharmacy.name}...`}
            value={searchQuery}
            onChange={(e) => handlePharmacySearch(pharmacy.id, e.target.value)}
            style={styles.pharmacySearchInputSmall}
          />
        </div>
        
        <button 
          style={styles.viewButton} 
          onClick={() => viewPharmacyStore(pharmacy)}
          type="button"
        >
          View Store
        </button>
      </div>
    );
  };

  return (
    <section style={styles.pharmaciesSection}>
      <div style={styles.sectionHeader}>
        <h3 style={styles.sectionTitle}>Nearby Medical Shops</h3>
        <p style={styles.sectionSubtitle}>Fast delivery from trusted pharmacies</p>
      </div>
      <div style={styles.pharmaciesGrid}>
        {pharmacies.map(pharmacy => (
          <PharmacyCard key={pharmacy.id} pharmacy={pharmacy} />
        ))}
      </div>
    </section>
  );
};

export const AppointmentsView = ({ 
  setActiveView, 
  appointments, 
  appointmentFilter, 
  setAppointmentFilter, 
  filteredAppointments, 
  rescheduleAppointment, 
  cancelAppointment, 
  viewAppointmentDetails,
  styles 
}) => (
  <div style={styles.appointmentsContainer}>
    <div style={styles.pageHeader}>
      <BackButton onClick={() => setActiveView('dashboard')} text="" styles={styles} />
      <h2 style={styles.sectionTitle}>My Appointments</h2>
    </div>
    
    <div style={styles.filterTabs}>
      <button 
        style={appointmentFilter === 'all' ? {...styles.filterTab, ...styles.activeFilterTab} : styles.filterTab}
        onClick={() => setAppointmentFilter('all')}
        type="button"
      >
        All Appointments
      </button>
      <button 
        style={appointmentFilter === 'scheduled' ? {...styles.filterTab, ...styles.activeFilterTab} : styles.filterTab}
        onClick={() => setAppointmentFilter('scheduled')}
        type="button"
      >
        Scheduled
      </button>
      <button 
        style={appointmentFilter === 'pending' ? {...styles.filterTab, ...styles.activeFilterTab} : styles.filterTab}
        onClick={() => setAppointmentFilter('pending')}
        type="button"
      >
        Pending
      </button>
      <button 
        style={appointmentFilter === 'rescheduled' ? {...styles.filterTab, ...styles.activeFilterTab} : styles.filterTab}
        onClick={() => setAppointmentFilter('rescheduled')}
        type="button"
      >
        Rescheduled
      </button>
      <button 
        style={appointmentFilter === 'cancelled' ? {...styles.filterTab, ...styles.activeFilterTab} : styles.filterTab}
        onClick={() => setAppointmentFilter('cancelled')}
        type="button"
      >
        Cancelled
      </button>
    </div>

    <div style={styles.appointmentsHeader}>
      <button 
        style={styles.newAppointmentButton}
        onClick={() => setActiveView('consultation')}
        type="button"
      >
        + Book New Appointment
      </button>
    </div>

    {filteredAppointments.length === 0 ? (
      <div style={styles.noAppointments}>
        <p style={styles.noAppointmentsText}>
          {appointmentFilter === 'all' 
            ? 'No appointments scheduled' 
            : `No ${appointmentFilter} appointments`}
        </p>
        <button 
          style={styles.bookAppointmentButton}
          onClick={() => setActiveView('consultation')}
          type="button"
        >
          Book Your First Appointment
        </button>
      </div>
    ) : (
      <div style={styles.appointmentsList}>
        {filteredAppointments.map(appointment => (
          <div key={appointment.id} style={styles.appointmentCard}>
            <div style={styles.appointmentHeader}>
              <div>
                <h3 style={styles.appointmentId}>Appointment #{appointment.id}</h3>
                <p style={styles.appointmentDoctor}>{appointment.doctorName}</p>
                <p style={styles.appointmentSpecialty}>{appointment.specialty}</p>
              </div>
              <div style={styles.appointmentStatus}>
                <span style={{
                  ...styles.statusBadge,
                  backgroundColor: 
                    appointment.status === 'Scheduled' ? '#4CAF50' :
                    appointment.status === 'Completed' ? '#2196F3' :
                    appointment.status === 'Cancelled' ? '#FF6B6B' :
                    appointment.status === 'Rescheduled' ? '#FF9800' :
                    appointment.status === 'Pending' ? '#FFC107' : '#9E9E9E'
                }}>
                  {appointment.status}
                </span>
              </div>
            </div>
            
            <div style={styles.appointmentDetails}>
              <div style={styles.detailRow}>
                <span style={styles.detailLabel}>Date:</span>
                <span style={styles.detailValue}>{appointment.date}</span>
              </div>
              <div style={styles.detailRow}>
                <span style={styles.detailLabel}>Time:</span>
                <span style={styles.detailValue}>{appointment.time}</span>
              </div>
              <div style={styles.detailRow}>
                <span style={styles.detailLabel}>Type:</span>
                <span style={styles.detailValue}>{appointment.type}</span>
              </div>
              <div style={styles.detailRow}>
                <span style={styles.detailLabel}>Fee:</span>
                <span style={styles.feeValue}>₹{appointment.fee}</span>
              </div>
            </div>
            
            <div style={styles.appointmentActions}>
              {appointment.status === 'Scheduled' && (
                <>
                  <button 
                    style={styles.rescheduleButton}
                    onClick={() => {
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
                    style={styles.cancelAppointmentButton}
                    onClick={() => {
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
              <button 
                style={styles.viewDetailsButton} 
                onClick={() => viewAppointmentDetails(appointment)}
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
);

export const OrdersView = ({ 
  setActiveView, 
  orders, 
  orderFilter, 
  setOrderFilter, 
  filteredOrders, 
  startLiveTracking,
  styles 
}) => (
  <div style={styles.ordersContainer}>
    <div style={styles.pageHeader}>
      <BackButton onClick={() => setActiveView('dashboard')} text="" styles={styles} />
      <h2 style={styles.sectionTitle}>My Orders</h2>
    </div>
    
    <div style={styles.filterTabs}>
      <button 
        style={orderFilter === 'all' ? {...styles.filterTab, ...styles.activeFilterTab} : styles.filterTab}
        onClick={() => setOrderFilter('all')}
        type="button"
      >
        All Orders
      </button>
      <button 
        style={orderFilter === 'delivered' ? {...styles.filterTab, ...styles.activeFilterTab} : styles.filterTab}
        onClick={() => setOrderFilter('delivered')}
        type="button"
      >
        Delivered
      </button>
      <button 
        style={orderFilter === 'in-transit' ? {...styles.filterTab, ...styles.activeFilterTab} : styles.filterTab}
        onClick={() => setOrderFilter('in-transit')}
        type="button"
      >
        In Transit
      </button>
      <button 
        style={orderFilter === 'pending' ? {...styles.filterTab, ...styles.activeFilterTab} : styles.filterTab}
        onClick={() => setOrderFilter('pending')}
        type="button"
      >
        Pending
      </button>
    </div>
    
    {filteredOrders.length === 0 ? (
      <div style={styles.noOrders}>
        <p style={styles.noOrdersText}>
          {orderFilter === 'all' 
            ? 'No orders yet' 
            : `No ${orderFilter} orders`}
        </p>
        <button 
          style={styles.shopNowButton}
          onClick={() => setActiveView('medicine')}
          type="button"
        >
          Shop Now
        </button>
      </div>
    ) : (
      <div style={styles.ordersList}>
        {filteredOrders.map(order => (
          <div key={order.id} style={styles.orderCard}>
            <div style={styles.orderHeader}>
              <div>
                <h3 style={styles.orderId}>Order #{order.id}</h3>
                <p style={styles.orderDate}>Placed on {order.date}</p>
                {order.paymentId && (
                  <p style={styles.paymentId}>Payment ID: {order.paymentId}</p>
                )}
              </div>
              <div style={styles.orderStatus}>
                <span style={{
                  ...styles.statusBadge,
                  backgroundColor: 
                    order.status === 'Delivered' ? '#4CAF50' :
                    order.status === 'In Transit' ? '#FF9800' :
                    order.status === 'On the Way' ? '#2196F3' :
                    order.status === 'Confirmed' ? '#9C27B0' :
                    order.status === 'Pending' ? '#FFC107' : '#9E9E9E'
                }}>
                  {order.status}
                </span>
              </div>
            </div>
            
            <div style={styles.orderItems}>
              {order.items.map((item, index) => (
                <div key={index} style={styles.orderItem}>
                  <span style={styles.itemName}>{item.name}</span>
                  <span style={styles.itemQuantity}>Qty: {item.quantity}</span>
                  <span style={styles.itemPrice}>₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>
            
            <div style={styles.orderFooter}>
              <div style={styles.orderAddress}>
                <strong>Delivery Address:</strong> {order.deliveryAddress}
              </div>
              <div style={styles.orderActions}>
                <div style={styles.orderTotal}>
                  <strong>Total: ₹{order.total}</strong>
                </div>
                {order.trackingAvailable && (order.status === 'In Transit' || order.status === 'On the Way') && (
                  <button 
                    style={styles.trackButton}
                    onClick={() => startLiveTracking(order)}
                    type="button"
                  >
                    📍 Live Track
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);

export const LiveTrackingView = ({ 
  setActiveView, 
  trackingOrder, 
  deliveryPartner, 
  callDeliveryPartner, 
  getDeliveryStatusText, 
  getDeliveryProgress,
  styles 
}) => (
  <div style={styles.liveTrackingContainer}>
    <div style={styles.trackingHeader}>
      <BackButton onClick={() => setActiveView('orders')} text="Back to Orders" styles={styles} />
      <h2 style={styles.trackingTitle}>Live Order Tracking</h2>
      <p style={styles.trackingSubtitle}>Order #{trackingOrder?.id}</p>
    </div>

    <div style={styles.trackingContent}>
      <div style={styles.mapContainer}>
        <iframe
          src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d248756.11675378976!2d77.4651372271771!3d12.953945987030732!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v${Date.now()}!5m2!1sen!2sin`}
          width="100%"
          height="100%"
          style={{ border: 0, borderRadius: '15px' }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Live Order Tracking Map"
        ></iframe>
      </div>

      <div style={styles.trackingSidebar}>
        <div style={styles.deliveryInfo}>
          <h3 style={styles.sidebarTitle}>Delivery Information</h3>
          
          <div style={styles.progressSection}>
            <div style={styles.progressBar}>
              <div 
                style={{
                  ...styles.progressFill,
                  width: `${getDeliveryProgress(deliveryPartner.status)}%`
                }}
              ></div>
            </div>
            <div style={styles.progressLabels}>
              <span>Order Placed</span>
              <span>On the Way</span>
              <span>Delivered</span>
            </div>
          </div>

          <div style={styles.statusCard}>
            <div style={styles.currentStatus}>
              <span style={styles.statusLabel}>Current Status:</span>
              <span style={styles.statusValue}>
                {getDeliveryStatusText(deliveryPartner.status)}
              </span>
            </div>
            <div style={styles.eta}>
              <span style={styles.etaLabel}>Estimated Time:</span>
              <span style={styles.etaValue}>{deliveryPartner.estimatedTime}</span>
            </div>
          </div>

          <div style={styles.deliveryPartner}>
            <h4 style={styles.partnerTitle}>Delivery Partner</h4>
            <div style={styles.partnerInfo}>
              <div style={styles.partnerAvatar}>
                {deliveryPartner.name.charAt(0)}
              </div>
              <div style={styles.partnerDetails}>
                <p style={styles.partnerName}>{deliveryPartner.name}</p>
                <p style={styles.partnerVehicle}>
                  {deliveryPartner.vehicle} • {deliveryPartner.vehicleNumber}
                </p>
                <div style={styles.partnerRating}>
                  ⭐ {deliveryPartner.rating}
                </div>
              </div>
            </div>
            <button 
              style={styles.callButton}
              onClick={callDeliveryPartner}
              type="button"
            >
              📞 Call Delivery Partner
            </button>
          </div>

          <div style={styles.orderSummary}>
            <h4 style={styles.summaryTitleText}>Order Summary</h4>
            {trackingOrder.items.map((item, index) => (
              <div key={index} style={styles.orderSummaryItem}>
                <span>{item.name}</span>
                <span>Qty: {item.quantity}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export const ProfileView = ({ 
  setActiveView, 
  userProfile, 
  updateProfile, 
  triggerProfilePhotoUpload,
  removeProfilePhoto,
  styles 
}) => {
  const [localProfile, setLocalProfile] = useState({
    phone: userProfile.phone || '',
    address: userProfile.address || '',
    city: userProfile.city || '',
    pincode: userProfile.pincode || '',
    dateOfBirth: userProfile.dateOfBirth || '',
    age: userProfile.age || '',
    gender: userProfile.gender || ''
  });
  const [localFormErrors, setLocalFormErrors] = useState({});
  const [localIsFormValid, setLocalIsFormValid] = useState(false);
  const [localIsFormTouched, setLocalIsFormTouched] = useState(false);

  const validateLocalForm = () => {
    const errors = {};

    if (!localProfile.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(localProfile.phone)) {
      errors.phone = 'Phone number must be 10 digits';
    } else if (!/^[789]/.test(localProfile.phone)) {
      errors.phone = 'Phone number must start with 9, 8, or 7';
    }

    if (!localProfile.address.trim()) {
      errors.address = 'Address is required';
    }

    if (!localProfile.city.trim()) {
      errors.city = 'City is required';
    } else if (!/^[A-Za-z\s]+$/.test(localProfile.city)) {
      errors.city = 'City should contain only alphabets';
    }

    if (!localProfile.pincode.trim()) {
      errors.pincode = 'Pincode is required';
    } else if (!/^\d{6}$/.test(localProfile.pincode)) {
      errors.pincode = 'Pincode must be 6 digits';
    }

    if (!localProfile.dateOfBirth.trim()) {
      errors.dateOfBirth = 'Date of Birth is required';
    }

    if (!localProfile.age.trim()) {
      errors.age = 'Age is required';
    } else if (!/^\d+$/.test(localProfile.age) || parseInt(localProfile.age) < 1 || parseInt(localProfile.age) > 120) {
      errors.age = 'Age must be between 1 and 120';
    }

    if (!localProfile.gender.trim()) {
      errors.gender = 'Gender is required';
    }

    setLocalFormErrors(errors);
    setLocalIsFormValid(Object.keys(errors).length === 0);
  };

  useEffect(() => {
    validateLocalForm();
  }, [localProfile]);

  const handleLocalProfileChange = (e) => {
    const { name, value } = e.target;
    
    setLocalProfile(prev => ({
      ...prev,
      [name]: value
    }));
    
    setLocalIsFormTouched(true);
  };

  const handleLocalProfileBlur = (e) => {
    const { name, value } = e.target;
    let processedValue = value;

    switch (name) {
      case 'city':
        processedValue = value.replace(/[^A-Za-z\s]/g, '');
        break;
      case 'phone':
        processedValue = value.replace(/\D/g, '').slice(0, 10);
        if (processedValue && !/^[789]/.test(processedValue)) {
          processedValue = '';
        }
        break;
      case 'pincode':
        processedValue = value.replace(/\D/g, '').slice(0, 6);
        break;
      case 'age':
        processedValue = value.replace(/\D/g, '');
        if (processedValue && (parseInt(processedValue) < 1 || parseInt(processedValue) > 120)) {
          processedValue = processedValue.slice(0, -1);
        }
        break;
      default:
        processedValue = value;
    }

    if (name === 'dateOfBirth' && value) {
      const today = new Date();
      const birthDate = new Date(value);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      
      setLocalProfile(prev => ({
        ...prev,
        [name]: value,
        age: age.toString()
      }));
    } else if (processedValue !== value) {
      setLocalProfile(prev => ({
        ...prev,
        [name]: processedValue
      }));
    }
  };

  const handleLocalProfileUpdate = (e) => {
    e.preventDefault();
    setLocalIsFormTouched(true);
    
    if (!localIsFormValid) {
      alert('Please fix all form errors before updating.');
      return;
    }
    
    const updatedProfile = {
      ...userProfile,
      phone: localProfile.phone,
      address: localProfile.address,
      city: localProfile.city,
      pincode: localProfile.pincode,
      dateOfBirth: localProfile.dateOfBirth,
      age: localProfile.age,
      gender: localProfile.gender,
      profilePhoto: userProfile.profilePhoto
    };
    updateProfile(updatedProfile);
    
    alert('Profile updated successfully!');
    
    setLocalIsFormTouched(false);
  };

  return (
    <div style={styles.profileContainer}>
      <div style={styles.pageHeader}>
        <BackButton onClick={() => setActiveView('dashboard')} text="" styles={styles} />
        <h2 style={styles.sectionTitle}>My Profile</h2>
      </div>
      
      <div style={styles.profilePhotoSection}>
        <div style={styles.profilePhotoContainer}>
          <div style={styles.profilePhotoPreview}>
            {userProfile.profilePhoto ? (
              <img
                src={userProfile.profilePhoto}
                alt="Profile"
                style={styles.profilePhotoImage}
              />
            ) : (
              <div style={styles.profilePhotoPlaceholder}>
                {userProfile.fullName?.charAt(0) || 'U'}
              </div>
            )}
          </div>
          <div style={styles.profilePhotoActions}>
            <button 
              style={styles.uploadPhotoButton}
              onClick={triggerProfilePhotoUpload}
              type="button"
            >
              📷 Update Photo
            </button>
            {userProfile.profilePhoto && (
              <button 
                style={styles.removePhotoButton}
                onClick={removeProfilePhoto}
                type="button"
              >
                🗑️ Remove Photo
              </button>
            )}
          </div>
        </div>
      </div>

      <form onSubmit={handleLocalProfileUpdate} style={styles.profileForm}>
        <div style={styles.formGrid}>
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Full Name</label>
            <input
              type="text"
              value={userProfile.fullName || ''}
              style={{
                ...styles.formInput,
                ...styles.nonEditableField
              }}
              readOnly
              disabled
            />
            <p style={styles.fieldNote}>Name cannot be changed</p>
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Email</label>
            <input
              type="email"
              value={userProfile.email || ''}
              style={{
                ...styles.formInput,
                ...styles.nonEditableField
              }}
              readOnly
              disabled
            />
            <p style={styles.fieldNote}>Email cannot be changed</p>
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Phone *</label>
            <div style={styles.phoneInputContainer}>
              <div style={styles.phonePrefix}>
                <span style={styles.indianFlag}>🇮🇳</span>
                <span style={styles.countryCode}>+91</span>
              </div>
              <input
                type="tel"
                name="phone"
                value={localProfile.phone}
                onChange={handleLocalProfileChange}
                onBlur={handleLocalProfileBlur}
                style={{
                  ...styles.phoneInput,
                  ...(localIsFormTouched && localFormErrors.phone && styles.formInputError)
                }}
                placeholder="Enter 10-digit mobile number"
                maxLength="10"
                required
              />
            </div>
            {localIsFormTouched && localFormErrors.phone && <span style={styles.formError}>{localFormErrors.phone}</span>}
            {!localFormErrors.phone && localProfile.phone && (
              <div style={styles.phoneValidationMessage}>
                <span style={styles.validPhoneIcon}>✓</span>
                <span style={styles.validPhoneText}>Valid Indian mobile number</span>
              </div>
            )}
          </div>

          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Date of Birth *</label>
            <input
              type="date"
              name="dateOfBirth"
              value={localProfile.dateOfBirth}
              onChange={handleLocalProfileChange}
              onBlur={handleLocalProfileBlur}
              style={{
                ...styles.formInput,
                ...(localIsFormTouched && localFormErrors.dateOfBirth && styles.formInputError)
              }}
              required
            />
            {localIsFormTouched && localFormErrors.dateOfBirth && <span style={styles.formError}>{localFormErrors.dateOfBirth}</span>}
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Age *</label>
            <input
              type="text"
              name="age"
              value={localProfile.age}
              onChange={handleLocalProfileChange}
              onBlur={handleLocalProfileBlur}
              style={{
                ...styles.formInput,
                ...(localIsFormTouched && localFormErrors.age && styles.formInputError)
              }}
              placeholder="Enter your age"
              required
            />
            {localIsFormTouched && localFormErrors.age && <span style={styles.formError}>{localFormErrors.age}</span>}
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Gender *</label>
            <select
              name="gender"
              value={localProfile.gender}
              onChange={handleLocalProfileChange}
              style={{
                ...styles.formInput,
                ...(localIsFormTouched && localFormErrors.gender && styles.formInputError)
              }}
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
              <option value="prefer-not-to-say">Prefer not to say</option>
            </select>
            {localIsFormTouched && localFormErrors.gender && <span style={styles.formError}>{localFormErrors.gender}</span>}
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Address *</label>
            <textarea
              name="address"
              value={localProfile.address}
              onChange={handleLocalProfileChange}
              onBlur={handleLocalProfileBlur}
              style={{
                ...styles.formTextarea,
                ...(localIsFormTouched && localFormErrors.address && styles.formInputError)
              }}
              rows="3"
              placeholder="Enter your complete address"
              required
            />
            {localIsFormTouched && localFormErrors.address && <span style={styles.formError}>{localFormErrors.address}</span>}
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>City *</label>
            <input
              type="text"
              name="city"
              value={localProfile.city}
              onChange={handleLocalProfileChange}
              onBlur={handleLocalProfileBlur}
              style={{
                ...styles.formInput,
                ...(localIsFormTouched && localFormErrors.city && styles.formInputError)
              }}
              placeholder="Enter your city"
              required
            />
            {localIsFormTouched && localFormErrors.city && <span style={styles.formError}>{localFormErrors.city}</span>}
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Pincode *</label>
            <input
              type="text"
              name="pincode"
              value={localProfile.pincode}
              onChange={handleLocalProfileChange}
              onBlur={handleLocalProfileBlur}
              style={{
                ...styles.formInput,
                ...(localIsFormTouched && localFormErrors.pincode && styles.formInputError)
              }}
              placeholder="Enter your pincode"
              required
            />
            {localIsFormTouched && localFormErrors.pincode && <span style={styles.formError}>{localFormErrors.pincode}</span>}
          </div>
        </div>
        
        <div style={styles.formNote}>
          <p style={styles.noteText}>* Please fill in all mandatory fields marked with an asterisk (*)</p>
          <p style={styles.noteText}>Name and email cannot be changed for security reasons</p>
          <p style={styles.noteText}>Phone number must be a valid Indian mobile number starting with 9, 8, or 7</p>
        </div>
        
        <div style={styles.formActions}>
          <button 
            type="submit" 
            style={{
              ...styles.updateButton,
              ...(!localIsFormValid && styles.updateButtonDisabled)
            }}
            disabled={!localIsFormValid}
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};

const UserDashboardComponents = {
  BackButton,
  MedicineCard,
  DoctorCard,
  PharmacyMedicineCard,
  NearbyPharmaciesSection,
  AppointmentsView,
  OrdersView,
  LiveTrackingView,
  ProfileView
};

export default UserDashboardComponents;