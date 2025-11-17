import React, { useState } from 'react';
import { styles } from './Styles';

const CartView = ({
  cart,
  setActiveView,
  updateQuantity,
  removeFromCart,
  getTotalPrice,
  handleCheckoutConfirmation,
  paymentLoading
}) => {
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [address, setAddress] = useState({
    fullName: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    pincode: '',
    landmark: ''
  });

  const BackButton = ({ onClick, text = 'Back' }) => (
    <button 
      style={styles.backButton}
      onClick={onClick}
      type="button"
    >
      ← {text}
    </button>
  );

  // Format numbers with commas for Indian numbering system
  const formatIndianNumber = (number) => {
    return new Intl.NumberFormat('en-IN').format(number);
  };

  // Handle address form input changes
  const handleAddressChange = (field, value) => {
    setAddress(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Validate address form
  const validateAddress = () => {
    const { fullName, phone, street, city, state, pincode } = address;
    if (!fullName.trim()) return 'Please enter full name';
    if (!phone.trim() || phone.length !== 10) return 'Please enter valid 10-digit phone number';
    if (!street.trim()) return 'Please enter street address';
    if (!city.trim()) return 'Please enter city';
    if (!state.trim()) return 'Please enter state';
    if (!pincode.trim() || pincode.length !== 6) return 'Please enter valid 6-digit pincode';
    return null;
  };

  // Handle checkout process
  const handleCheckout = async () => {
    if (!showAddressForm) {
      // First step: Show address form
      setShowAddressForm(true);
      return;
    }

    // Second step: Validate address and proceed to payment
    const validationError = validateAddress();
    if (validationError) {
      alert(validationError);
      return;
    }

    // Proceed with payment
    await handleCheckoutConfirmation(address);
  };

  // Razorpay payment integration function
  const initiateRazorpayPayment = (orderData) => {
    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY_ID, // Your Razorpay key
      amount: orderData.amount * 100, // Amount in paise
      currency: 'INR',
      name: 'MediQuick',
      description: 'Medicine Purchase',
      order_id: orderData.id,
      handler: function (response) {
        // Handle successful payment
        console.log('Payment successful:', response);
        alert('Payment successful! Your order has been placed.');
        setActiveView('orders');
      },
      prefill: {
        name: address.fullName,
        contact: address.phone,
        email: 'customer@example.com' // You can get this from user profile
      },
      notes: {
        address: `${address.street}, ${address.city}, ${address.state} - ${address.pincode}`
      },
      theme: {
        color: '#007bff'
      }
    };

    const razorpayInstance = new window.Razorpay(options);
    razorpayInstance.open();
  };

  // Modified checkout confirmation to include address
  const handleCheckoutWithAddress = async (addressData) => {
    try {
      // Your existing payment logic here, but now with address
      const orderData = {
        amount: getTotalPrice(),
        currency: 'INR',
        receipt: `receipt_${Date.now()}`,
        notes: {
          address: addressData,
          items: cart.map(item => ({
            id: item.id,
            name: item.name,
            quantity: item.quantity,
            price: item.price
          }))
        }
      };

      // Simulate API call to create order
      // Replace this with your actual Razorpay order creation API call
      const response = await fetch('/api/create-razorpay-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
      });

      const order = await response.json();
      
      // Initiate Razorpay payment
      initiateRazorpayPayment(order);
      
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
    }
  };

  return (
    <div style={styles.cartPageContainer}>
      <div style={styles.pageHeader}>
        <BackButton onClick={() => setActiveView('medicine')} text="Back to Medicines" />
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
                      <p style={styles.cartItemPrice}>₹{formatIndianNumber(item.price)} each</p>
                    </div>
                    <div style={styles.quantityControls}>
                      <button 
                        style={styles.quantityButton}
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        type="button"
                        disabled={item.quantity <= 1}
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
                      ₹{formatIndianNumber(item.price * item.quantity)}
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
              
              {showAddressForm && (
                <div style={styles.addressForm}>
                  <h4 style={styles.addressFormTitle}>Delivery Address</h4>
                  <div style={styles.addressFormGrid}>
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={address.fullName}
                      onChange={(e) => handleAddressChange('fullName', e.target.value)}
                      style={styles.addressInput}
                    />
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      value={address.phone}
                      onChange={(e) => handleAddressChange('phone', e.target.value)}
                      style={styles.addressInput}
                      maxLength="10"
                    />
                    <input
                      type="text"
                      placeholder="Street Address"
                      value={address.street}
                      onChange={(e) => handleAddressChange('street', e.target.value)}
                      style={styles.addressInput}
                    />
                    <input
                      type="text"
                      placeholder="Landmark (Optional)"
                      value={address.landmark}
                      onChange={(e) => handleAddressChange('landmark', e.target.value)}
                      style={styles.addressInput}
                    />
                    <input
                      type="text"
                      placeholder="City"
                      value={address.city}
                      onChange={(e) => handleAddressChange('city', e.target.value)}
                      style={styles.addressInput}
                    />
                    <input
                      type="text"
                      placeholder="State"
                      value={address.state}
                      onChange={(e) => handleAddressChange('state', e.target.value)}
                      style={styles.addressInput}
                    />
                    <input
                      type="text"
                      placeholder="Pincode"
                      value={address.pincode}
                      onChange={(e) => handleAddressChange('pincode', e.target.value)}
                      style={styles.addressInput}
                      maxLength="6"
                    />
                  </div>
                </div>
              )}
              
              <div style={styles.summaryDetails}>
                <div style={styles.summaryRow}>
                  <span>Subtotal:</span>
                  <span>₹{formatIndianNumber(getTotalPrice())}</span>
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
                  <span>₹{formatIndianNumber(getTotalPrice())}</span>
                </div>
              </div>
              
              <button 
                style={styles.checkoutButtonLarge}
                onClick={handleCheckout}
                disabled={paymentLoading}
                type="button"
              >
                {paymentLoading ? 'Processing...' : 
                 showAddressForm ? 'Proceed to Payment' : 'Proceed to Checkout'}
              </button>
              
              {showAddressForm && (
                <button 
                  style={styles.backToCartButton}
                  onClick={() => setShowAddressForm(false)}
                  type="button"
                >
                  Back to Cart
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartView;