import React from 'react';
import UserDashboardComponents from './UserDashboardComponents';

const UserDashboardViews = ({
  activeView,
  setActiveView,
  userProfile,
  cart,
  searchQuery,
  setSearchQuery,
  filteredMedicines,
  addToCart,
  updateQuantity,
  removeFromCart,
  getTotalPrice,
  handleCheckoutConfirmation,
  handlePrescriptionUpload,
  pharmacies,
  viewPharmacyStore,
  handlePharmacySearch,
  getFilteredPharmacyMedicines,
  addToCartFromPharmacy,
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
  handleBookAppointment,
  startDoctorChat,
  appointments,
  appointmentFilter,
  setAppointmentFilter,
  filteredAppointments,
  rescheduleAppointment,
  cancelAppointment,
  viewAppointmentDetails,
  orders,
  orderFilter,
  setOrderFilter,
  filteredOrders,
  startLiveTracking,
  trackingOrder,
  deliveryPartner,
  callDeliveryPartner,
  getDeliveryStatusText,
  getDeliveryProgress,
  paymentLoading,
  updateProfile,
  triggerProfilePhotoUpload,
  removeProfilePhoto,
  styles
}) => {
  const {
    BackButton,
    MedicineCard,
    DoctorCard,
    NearbyPharmaciesSection,
    AppointmentsView,
    OrdersView,
    LiveTrackingView,
    ProfileView
  } = UserDashboardComponents;

  if (activeView === 'dashboard') {
    return (
      <div style={styles.mainContent}>
        <section style={styles.welcomeSection}>
          <h2 style={styles.welcomeTitle}>
            Welcome back, {userProfile.fullName || 'User'}! 👋
          </h2>
          <p style={styles.welcomeSubtitle}>
            How can we help you today?
          </p>
        </section>

        <section style={styles.servicesSection}>
          <div style={styles.serviceGrid}>
            <div 
              style={styles.serviceCard}
              onClick={() => setActiveView('medicine')}
            >
              <div style={styles.serviceIcon}>💊</div>
              <h3 style={styles.serviceTitle}>Medicine Delivery</h3>
              <p style={styles.serviceDescription}>
                Get your prescribed medicines delivered to your doorstep within hours
              </p>
              <button style={styles.serviceButton} type="button">
                Order Now
              </button>
            </div>

            <div 
              style={styles.serviceCard}
              onClick={() => setActiveView('consultation')}
            >
              <div style={styles.serviceIcon}>👨‍⚕️</div>
              <h3 style={styles.serviceTitle}>Doctor Consultation</h3>
              <p style={styles.serviceDescription}>
                Connect with certified doctors online for quick consultations
              </p>
              <button style={styles.serviceButton} type="button">
                Book Consultation
              </button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (activeView === 'appointments') {
    return <AppointmentsView 
      setActiveView={setActiveView}
      appointments={appointments}
      appointmentFilter={appointmentFilter}
      setAppointmentFilter={setAppointmentFilter}
      filteredAppointments={filteredAppointments}
      rescheduleAppointment={rescheduleAppointment}
      cancelAppointment={cancelAppointment}
      viewAppointmentDetails={viewAppointmentDetails}
      styles={styles}
    />;
  }

  if (activeView === 'orders') {
    return <OrdersView 
      setActiveView={setActiveView}
      orders={orders}
      orderFilter={orderFilter}
      setOrderFilter={setOrderFilter}
      filteredOrders={filteredOrders}
      startLiveTracking={startLiveTracking}
      styles={styles}
    />;
  }

  if (activeView === 'medicine') {
    return (
      <div style={styles.medicineLayout}>
        <div style={styles.pageHeader}>
          <BackButton onClick={() => setActiveView('dashboard')} text="" styles={styles} />
          <h2 style={styles.sectionTitle}>Medicine Delivery</h2>
        </div>

        <div style={styles.fullWidthContent}>
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
                <span style={styles.uploadIcon}></span>
                Upload Prescription
                <input
                  type="file"
                  accept=".jpg,.jpeg,.png,.pdf"
                  onChange={handlePrescriptionUpload}
                  style={{ display: 'none' }}
                />
              </label>
            </div>
          </section>

          <section style={styles.productsSection}>
            <div style={styles.sectionHeader}>
              <h3 style={styles.sectionTitle}>Available Medicines</h3>
              <p style={styles.resultsCount}>{filteredMedicines.length} products found</p>
            </div>
            <div style={styles.productsGrid}>
              {filteredMedicines.map(medicine => (
                <MedicineCard 
                  key={medicine.id} 
                  medicine={medicine}
                  cart={cart}
                  updateQuantity={updateQuantity}
                  addToCart={addToCart}
                  styles={styles}
                />
              ))}
            </div>
          </section>

          <NearbyPharmaciesSection 
            pharmacies={pharmacies}
            viewPharmacyStore={viewPharmacyStore}
            handlePharmacySearch={handlePharmacySearch}
            getFilteredPharmacyMedicines={getFilteredPharmacyMedicines}
            addToCartFromPharmacy={addToCartFromPharmacy}
            cart={cart}
            updateQuantity={updateQuantity}
            styles={styles}
          />
        </div>
      </div>
    );
  }

  if (activeView === 'live-tracking') {
    return <LiveTrackingView 
      setActiveView={setActiveView}
      trackingOrder={trackingOrder}
      deliveryPartner={deliveryPartner}
      callDeliveryPartner={callDeliveryPartner}
      getDeliveryStatusText={getDeliveryStatusText}
      getDeliveryProgress={getDeliveryProgress}
      styles={styles}
    />;
  }

  if (activeView === 'cart') {
    return (
      <div style={styles.cartPageContainer}>
        <div style={styles.pageHeader}>
          <BackButton onClick={() => setActiveView('medicine')} text="Back to Medicines" styles={styles} />
          <h2 style={styles.sectionTitle}>Your Shopping Cart</h2>
        </div>
        
        <div style={styles.cartPageContent}>
          <div style={styles.cartItemsSection}>
            <div style={styles.cartHeader}>
              <h3 style={styles.cartTitle}>Cart Items ({cart.length})</h3>
              {cart.length > 0 && (
                <p style={styles.cartSubtitle}>Review your items before checkout</p>
              )}
            </div>
            
            <div style={styles.cartItems}>
              {cart.length === 0 ? (
                <div style={styles.emptyCart}>
                  <div style={styles.emptyCartIcon}>🛒</div>
                  <p style={styles.emptyCartText}>Your cart is empty</p>
                  <p style={styles.emptyCartSubtext}>Add some medicines to get started</p>
                  <button 
                    style={styles.shopNowButton}
                    onClick={() => setActiveView('medicine')}
                    type="button"
                  >
                    Shop Medicines
                  </button>
                </div>
              ) : (
                <div style={styles.cartItemsList}>
                  {cart.map(item => (
                    <div key={item.id} style={styles.cartItem}>
                      <div style={styles.cartItemInfo}>
                        <h4 style={styles.cartItemName}>{item.name}</h4>
                        <p style={styles.cartItemVendor}>{item.vendor}</p>
                        <p style={styles.cartItemPrice}>₹{item.price} each</p>
                      </div>
                      <div style={styles.quantityControls}>
                        <button 
                          style={styles.quantityButton}
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          type="button"
                        >
                          −
                        </button>
                        <span style={styles.quantity}>{item.quantity}</span>
                        <button 
                          style={styles.quantityButton}
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          type="button"
                        >
                          +
                        </button>
                      </div>
                      <div style={styles.itemTotal}>
                        ₹{item.price * item.quantity}
                      </div>
                      <button 
                        style={styles.removeButton}
                        onClick={() => removeFromCart(item.id)}
                        title="Remove item"
                        type="button"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {cart.length > 0 && (
            <div style={styles.cartSummarySection}>
              <div style={styles.summaryCard}>
                <h3 style={styles.summaryTitle}>Order Summary</h3>
                <div style={styles.summaryDetails}>
                  <div style={styles.summaryRow}>
                    <span>Subtotal:</span>
                    <span>₹{getTotalPrice()}</span>
                  </div>
                  <div style={styles.summaryRow}>
                    <span>Delivery Fee:</span>
                    <span style={styles.freeDelivery}>Free</span>
                  </div>
                  <div style={styles.summaryRow}>
                    <span>Tax:</span>
                    <span>₹0</span>
                  </div>
                  <div style={styles.grandTotal}>
                    <span>Total:</span>
                    <span>₹{getTotalPrice()}</span>
                  </div>
                </div>
                <button 
                  style={styles.checkoutButtonLarge}
                  onClick={handleCheckoutConfirmation}
                  disabled={paymentLoading}
                  type="button"
                >
                  {paymentLoading ? 'Processing...' : 'Proceed to Checkout'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (activeView === 'profile') {
    return <ProfileView 
      setActiveView={setActiveView}
      userProfile={userProfile}
      updateProfile={updateProfile}
      triggerProfilePhotoUpload={triggerProfilePhotoUpload}
      removeProfilePhoto={removeProfilePhoto}
      styles={styles}
    />;
  }

  if (activeView === 'consultation') {
    return (
      <div style={styles.consultationContainer}>
        <div style={styles.pageHeader}>
          <BackButton onClick={() => setActiveView('appointments')} text="Back to Appointments" styles={styles} />
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
                    styles={styles}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.mainContent}>
      <h2>Page not found</h2>
      <button onClick={() => setActiveView('dashboard')} type="button">Go to Home</button>
    </div>
  );
};

export default UserDashboardViews;