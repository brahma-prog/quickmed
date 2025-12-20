import React, { useState, useEffect, useRef, useCallback } from 'react';
import './CartView.css';

const CartView = ({
  cart,
  setActiveView,
  updateQuantity,
  removeFromCart,
  getTotalPrice,
  handleCheckoutConfirmation,
  paymentLoading,
  addToOrderHistory
}) => {
  // Current date and time state
  const [currentDateTime, setCurrentDateTime] = useState({
    date: '',
    time: '',
    timestamp: ''
  });
  
  // Saved addresses state
  const [savedAddresses, setSavedAddresses] = useState(() => {
    try {
      const saved = localStorage.getItem('med_app_saved_addresses');
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('Error loading saved addresses:', error);
      return [];
    }
  });
  
  // Address state
  const [address, setAddress] = useState({
    fullName: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    pincode: '',
    landmark: ''
  });
  
  // Address selection state
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [addressMode, setAddressMode] = useState('select');
  
  // Modal states
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  
  // Validation errors state
  const [validationErrors, setValidationErrors] = useState({});
  
  // Tip states
  const [selectedTip, setSelectedTip] = useState(0);
  const [customTip, setCustomTip] = useState('');
  const [tipAmount, setTipAmount] = useState(0);
  
  // Selection state
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  
  // Processing state
  const [isProcessingOrder, setIsProcessingOrder] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  
  // Payment states
  const [paymentStatus, setPaymentStatus] = useState(''); // 'success', 'failed', 'pending'
  const [orderDetails, setOrderDetails] = useState(null);
  const [razorpayOrderId, setRazorpayOrderId] = useState('');
  
  // Tax rate (5% GST)
  const TAX_RATE = 0.05;
  
  const tipOptions = [
    { amount: 10, label: '₹10' },
    { amount: 20, label: '₹20' },
    { amount: 30, label: '₹30' },
    { amount: 50, label: '₹50' },
    { amount: 100, label: '₹100' },
    { amount: 0, label: 'Custom' }
  ];

  const modalRef = useRef(null);
  const paymentModalRef = useRef(null);

  // 🔧 **RAZORPAY CONFIGURATION**
  // Replace with your actual Razorpay credentials
  const RAZORPAY_CONFIG = {
    key_id: 'rzp_test_YOUR_KEY_ID', // Replace with your test/live key
    currency: 'INR',
    name: 'Medicines Delivery App',
    description: 'Medicines Purchase',
    prefill: {
      name: '',
      email: '',
      contact: ''
    },
    theme: {
      color: '#4DB6AC' // Mint color from your theme
    }
  };

  // ========== RAZORPAY PAYMENT FUNCTIONS ==========

  // Load Razorpay script dynamically
  useEffect(() => {
    const loadRazorpayScript = () => {
      if (window.Razorpay) {
        console.log('Razorpay already loaded');
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      
      script.onload = () => {
        console.log('Razorpay SDK loaded successfully');
      };
      
      script.onerror = () => {
        console.error('Failed to load Razorpay SDK');
      };
      
      document.body.appendChild(script);
    };

    loadRazorpayScript();
  }, []);

  // Simulate server-side order creation (In production, call your backend API)
  const createRazorpayOrder = async (amount) => {
    try {
      // In a real app, call your backend API:
      // const response = await fetch('/api/create-razorpay-order', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ amount: amount * 100 }) // Amount in paise
      // });
      // const data = await response.json();
      // return data.orderId;

      // For demo: Generate a mock order ID
      const mockOrderId = 'order_' + Date.now();
      console.log('Created Razorpay order:', mockOrderId, 'for amount:', amount);
      return mockOrderId;
    } catch (error) {
      console.error('Error creating Razorpay order:', error);
      throw error;
    }
  };

  // Main payment initialization function
  const initializeRazorpayPayment = async (paymentData) => {
    if (!window.Razorpay) {
      console.error('Razorpay SDK not loaded');
      alert('Payment system not ready. Please refresh and try again.');
      return;
    }

    setIsProcessingPayment(true);

    try {
      const amountInPaise = Math.round(paymentData.totalAmount * 100); // Razorpay expects amount in paise
      
      // Create order on server
      const orderId = await createRazorpayOrder(paymentData.totalAmount);
      setRazorpayOrderId(orderId);

      // Configure Razorpay options
      const options = {
        key: RAZORPAY_CONFIG.key_id,
        amount: amountInPaise,
        currency: RAZORPAY_CONFIG.currency,
        name: RAZORPAY_CONFIG.name,
        description: `Medicines Order - ${paymentData.selectedItems.length} item(s)`,
        order_id: orderId,
        handler: async (response) => {
          console.log('Payment success response:', response);
          
          // Verify payment on your backend (in production)
          // const verification = await verifyPayment(response);
          
          // For demo, assume payment is successful
          await handlePaymentSuccess(response, paymentData);
        },
        prefill: {
          name: paymentData.address.fullName || 'Customer',
          email: 'customer@example.com',
          contact: paymentData.address.phone || '9999999999'
        },
        notes: {
          order_type: 'medicines',
          item_count: paymentData.selectedItems.length.toString(),
          delivery_address: `${paymentData.address.city}, ${paymentData.address.state}`
        },
        theme: RAZORPAY_CONFIG.theme,
        modal: {
          ondismiss: () => {
            console.log('Payment modal dismissed');
            setIsProcessingPayment(false);
            setPaymentStatus('failed');
            setTimeout(() => {
              setShowPaymentModal(false);
              setPaymentStatus('');
            }, 2000);
          }
        }
      };

      // Initialize Razorpay
      const razorpayInstance = new window.Razorpay(options);
      
      // Open payment modal
      razorpayInstance.open();
      
      razorpayInstance.on('payment.failed', (response) => {
        console.error('Payment failed:', response.error);
        handlePaymentFailure(response.error, paymentData);
      });

    } catch (error) {
      console.error('Payment initialization error:', error);
      setIsProcessingPayment(false);
      alert(`Payment setup failed: ${error.message}`);
    }
  };

  // Handle successful payment
  const handlePaymentSuccess = async (razorpayResponse, paymentData) => {
    setPaymentStatus('success');
    setIsProcessingPayment(false);
    
    // Store order details
    const orderDetails = {
      ...paymentData,
      paymentId: razorpayResponse.razorpay_payment_id,
      orderId: razorpayResponse.razorpay_order_id,
      signature: razorpayResponse.razorpay_signature,
      paymentTimestamp: new Date().toISOString(),
      status: 'paid'
    };
    
    setOrderDetails(orderDetails);
    
    // Add to order history
    if (addToOrderHistory) {
      addToOrderHistory(orderDetails);
    }
    
    // Remove purchased items from cart
    paymentData.selectedItems.forEach(itemId => {
      removeFromCart(itemId);
    });
    
    // Reset selections
    setSelectedItems([]);
    setSelectAll(false);
    setSelectedTip(0);
    setCustomTip('');
    setTipAmount(0);
    
    // Show success modal
    setShowPaymentModal(true);
    
    // Close address modal
    closeAddressModal();
  };

  // Handle payment failure
  const handlePaymentFailure = (error, paymentData) => {
    console.error('Payment failed:', error);
    setPaymentStatus('failed');
    setIsProcessingPayment(false);
    
    // Store failed order details
    const failedOrder = {
      ...paymentData,
      error: error,
      status: 'failed',
      paymentTimestamp: new Date().toISOString()
    };
    
    setOrderDetails(failedOrder);
    setShowPaymentModal(true);
  };

  // ========== EXISTING FUNCTIONS (Updated) ==========

  // Update current date and time every second
  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const dateStr = now.toLocaleDateString('en-IN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      const timeStr = now.toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      });
      
      setCurrentDateTime({
        date: dateStr,
        time: timeStr,
        timestamp: now.toISOString(),
        displayTime: `${timeStr}`,
        orderDate: now.toISOString()
      });
    };
    
    updateDateTime();
    const intervalId = setInterval(updateDateTime, 1000);
    
    return () => clearInterval(intervalId);
  }, []);

  // Calculate tip amount
  useEffect(() => {
    let calculatedTip = 0;
    
    if (selectedTip > 0) {
      calculatedTip = selectedTip;
    } else if (customTip) {
      calculatedTip = parseInt(customTip) || 0;
    }
    
    setTipAmount(calculatedTip);
  }, [selectedTip, customTip]);

  // Save addresses to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('med_app_saved_addresses', JSON.stringify(savedAddresses));
    } catch (error) {
      console.error('Error saving addresses:', error);
    }
  }, [savedAddresses]);

  // Helper functions
  const getSelectedCartItems = useCallback(() => {
    return cart.filter(item => selectedItems.includes(item.id));
  }, [cart, selectedItems]);

  const getSelectedTotalPrice = useCallback(() => {
    const selected = getSelectedCartItems();
    return selected.reduce((total, item) => total + (item.price * item.quantity), 0);
  }, [getSelectedCartItems]);

  const calculateTaxAmount = useCallback((subtotal) => {
    return subtotal * TAX_RATE;
  }, [TAX_RATE]);

  const getTotalWithTaxAndTip = useCallback(() => {
    const subtotal = getSelectedTotalPrice();
    const tax = calculateTaxAmount(subtotal);
    const tip = tipAmount;
    const total = subtotal + tax + tip;
    
    return {
      subtotal,
      tax,
      tip,
      total,
      formattedTax: Math.round(tax)
    };
  }, [getSelectedTotalPrice, tipAmount, calculateTaxAmount]);

  const formatIndianNumber = useCallback((number) => {
    return new Intl.NumberFormat('en-IN').format(Math.round(number));
  }, []);

  // Item selection functions
  const toggleItemSelection = useCallback((itemId) => {
    setSelectedItems(prev => {
      let newSelected;
      
      if (prev.includes(itemId)) {
        newSelected = prev.filter(id => id !== itemId);
      } else {
        newSelected = [...prev, itemId];
      }
      
      setSelectAll(newSelected.length === cart.length && cart.length > 0);
      
      return newSelected;
    });
  }, [cart.length]);

  const toggleSelectAll = useCallback(() => {
    if (selectAll) {
      setSelectedItems([]);
      setSelectAll(false);
    } else {
      const allItemIds = cart.map(item => item.id);
      setSelectedItems(allItemIds);
      setSelectAll(true);
    }
  }, [selectAll, cart]);

  const handleRemoveItem = useCallback((itemId) => {
    removeFromCart(itemId);
    
    setSelectedItems(prev => {
      const newSelected = prev.filter(id => id !== itemId);
      
      if (cart.length > 1) {
        setSelectAll(newSelected.length === (cart.length - 1));
      } else {
        setSelectAll(false);
      }
      
      return newSelected;
    });
  }, [removeFromCart, cart.length]);

  // Back button handler
  const handleBackToMedicines = useCallback(() => {
    if (setActiveView && typeof setActiveView === 'function') {
      setActiveView('medicines');
    } else if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = window.location.origin;
    }
  }, [setActiveView]);

  // Address management functions
  const resetAddressForm = useCallback(() => {
    setAddress({
      fullName: '',
      phone: '',
      street: '',
      city: '',
      state: '',
      pincode: '',
      landmark: ''
    });
    setValidationErrors({});
  }, []);

  // Validation functions (keep your existing validation code)
  const validateFullName = useCallback((value) => value.replace(/[^a-zA-Z\s]/g, ''), []);
  const validatePhone = useCallback((value) => value.replace(/[^0-9]/g, '').slice(0, 10), []);
  const validatePincode = useCallback((value) => value.replace(/[^0-9]/g, '').slice(0, 6), []);
  const validateCustomTip = useCallback((value) => value.replace(/[^0-9]/g, ''), []);

  const validateField = useCallback((field, value) => {
    switch (field) {
      case 'fullName':
        if (!value.trim()) return 'Full name is required';
        if (value.trim().length < 3) return 'Full name must be at least 3 characters';
        return '';
        
      case 'phone':
        if (!value.trim()) return 'Phone number is required';
        if (value.length !== 10) return 'Phone number must be 10 digits';
        if (!['6','7','8','9'].includes(value[0])) return 'Phone number must start with 6,7,8 or 9';
        return '';
        
      case 'street':
        if (!value.trim()) return 'Street address is required';
        if (value.trim().length < 5) return 'Please enter a valid street address';
        return '';
        
      case 'city':
        if (!value.trim()) return 'City is required';
        if (value.trim().length < 2) return 'Please enter a valid city name';
        return '';
        
      case 'state':
        if (!value.trim()) return 'State is required';
        if (value.trim().length < 2) return 'Please enter a valid state name';
        return '';
        
      case 'pincode':
        if (!value.trim()) return 'Pincode is required';
        if (value.length !== 6) return 'Pincode must be 6 digits';
        return '';
        
      default:
        return '';
    }
  }, []);

  const validateAddress = useCallback(() => {
    const errors = {};
    let isValid = true;

    const fieldsToValidate = ['fullName', 'phone', 'street', 'city', 'state', 'pincode'];
    
    fieldsToValidate.forEach(field => {
      const error = validateField(field, address[field]);
      if (error) {
        errors[field] = error;
        isValid = false;
      }
    });

    setValidationErrors(errors);
    return isValid;
  }, [address, validateField]);

  // Modal handlers
  const openAddressModal = useCallback(() => {
    if (selectedItems.length === 0) {
      alert('Please select at least one item to checkout');
      return;
    }
    
    let currentTip = 0;
    if (selectedTip > 0) {
      currentTip = selectedTip;
    } else if (customTip) {
      currentTip = parseInt(customTip) || 0;
    }
    setTipAmount(currentTip);
    
    setAddressMode('select');
    setSelectedAddressId(null);
    
    if (savedAddresses.length > 0) {
      setSelectedAddressId(savedAddresses[0].id);
      setAddress(savedAddresses[0]);
    } else {
      setAddressMode('new');
      resetAddressForm();
    }
    
    setShowAddressModal(true);
    document.body.style.overflow = 'hidden';
  }, [selectedItems.length, selectedTip, customTip, savedAddresses, resetAddressForm]);

  const closeAddressModal = useCallback(() => {
    setShowAddressModal(false);
    setValidationErrors({});
    setAddressMode('select');
    setSelectedAddressId(null);
    document.body.style.overflow = 'auto';
  }, []);

  const closePaymentModal = useCallback(() => {
    setShowPaymentModal(false);
    setPaymentStatus('');
    setOrderDetails(null);
    setIsProcessingPayment(false);
  }, []);

  // Handle click outside modal
  const handleOverlayClick = useCallback((e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      closeAddressModal();
    }
    if (paymentModalRef.current && !paymentModalRef.current.contains(e.target)) {
      closePaymentModal();
    }
  }, [closeAddressModal, closePaymentModal]);

  // BackButton component
  const BackButton = React.memo(({ onClick, text = 'Back' }) => {
    const handleClick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      if (onClick && typeof onClick === 'function') {
        onClick();
      } else if (window.history.length > 1) {
        window.history.back();
      }
    };
    
    return (
      <button 
        className="back-button"
        onClick={handleClick}
        type="button"
        style={{ cursor: 'pointer' }}
      >
        ← {text}
      </button>
    );
  });

  const saveCurrentAddress = useCallback(() => {
    if (!validateAddress()) {
      return;
    }

    const newAddress = {
      ...address,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };

    const isDuplicate = savedAddresses.some(saved => 
      saved.fullName === newAddress.fullName &&
      saved.phone === newAddress.phone &&
      saved.street === newAddress.street &&
      saved.pincode === newAddress.pincode
    );

    if (isDuplicate) {
      alert('This address is already saved!');
      return;
    }

    setSavedAddresses(prev => [newAddress, ...prev]);
    setSelectedAddressId(newAddress.id);
    setAddressMode('select');
    
    alert('Address saved successfully!');
  }, [address, savedAddresses, validateAddress]);

  const deleteAddress = useCallback((id, e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this address?')) {
      setSavedAddresses(prev => prev.filter(addr => addr.id !== id));
      if (selectedAddressId === id) {
        setSelectedAddressId(null);
        resetAddressForm();
      }
    }
  }, [selectedAddressId, resetAddressForm]);

  const handleAddressSelect = useCallback((selectedAddress) => {
    setSelectedAddressId(selectedAddress.id);
    setAddress(selectedAddress);
  }, []);

  const switchToNewAddressMode = useCallback(() => {
    setAddressMode('new');
    resetAddressForm();
    setSelectedAddressId(null);
  }, [resetAddressForm]);

  const handleTipSelect = useCallback((amount) => {
    setSelectedTip(amount);
    if (amount !== 0) {
      setCustomTip('');
      setTipAmount(amount);
    } else {
      setTipAmount(0);
    }
  }, []);

  const handleCustomTipChange = useCallback((value) => {
    const validatedValue = validateCustomTip(value);
    setCustomTip(validatedValue);
    
    if (validatedValue) {
      setSelectedTip(0);
      setTipAmount(parseInt(validatedValue) || 0);
    } else {
      setTipAmount(0);
    }
  }, [validateCustomTip]);

  const handleAddressChange = useCallback((field, value) => {
    let validatedValue = value;

    switch (field) {
      case 'fullName':
        validatedValue = validateFullName(value);
        break;
      case 'phone':
        validatedValue = validatePhone(value);
        break;
      case 'city':
        validatedValue = value; // No special validation
        break;
      case 'state':
        validatedValue = value; // No special validation
        break;
      case 'pincode':
        validatedValue = validatePincode(value);
        break;
      default:
        validatedValue = value;
    }

    if (validationErrors[field]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }

    setAddress(prev => ({
      ...prev,
      [field]: validatedValue
    }));
  }, [validateFullName, validatePhone, validatePincode, validationErrors]);

  // Updated checkout handler
  const handleCheckout = useCallback(() => {
    if (selectedItems.length === 0) {
      alert('Please select at least one item to checkout');
      return;
    }
    
    // Update tip amount
    let currentTip = tipAmount;
    if (selectedTip === 0 && customTip) {
      currentTip = parseInt(customTip) || 0;
    }
    setTipAmount(currentTip);
    
    // Open address modal
    openAddressModal();
  }, [selectedItems.length, tipAmount, selectedTip, customTip, openAddressModal]);

  // Updated payment submission handler
  const handlePaymentSubmit = useCallback(async () => {
    // Validate address
    if (addressMode === 'select' && !selectedAddressId) {
      alert('Please select a delivery address');
      return;
    }
    
    if (addressMode === 'new' && !validateAddress()) {
      const firstErrorField = Object.keys(validationErrors)[0];
      if (firstErrorField) {
        const element = document.getElementById(`address-${firstErrorField}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          element.focus();
        }
      }
      return;
    }

    const totals = getTotalWithTaxAndTip();
    const selectedCartItems = getSelectedCartItems();
    const selectedItemIds = [...selectedItems];
    
    // Get selected or new address
    const deliveryAddress = addressMode === 'new' 
      ? address 
      : savedAddresses.find(addr => addr.id === selectedAddressId);

    // Prepare payment data
    const paymentData = {
      address: deliveryAddress,
      tip: totals.tip,
      subtotal: totals.subtotal,
      tax: totals.tax,
      totalAmount: totals.total,
      selectedItems: selectedItemIds,
      cartItems: selectedCartItems,
      tipDetails: {
        selectedTip,
        customTip,
        tipAmount: totals.tip
      },
      orderDateTime: {
        date: currentDateTime.date,
        time: currentDateTime.time,
        timestamp: currentDateTime.timestamp,
        orderDate: currentDateTime.orderDate
      },
      taxDetails: {
        rate: TAX_RATE * 100,
        amount: totals.tax
      }
    };

    console.log('Initiating payment for:', paymentData);

    // Close address modal
    closeAddressModal();
    
    // Initialize Razorpay payment
    await initializeRazorpayPayment(paymentData);
  }, [
    addressMode, 
    selectedAddressId, 
    validateAddress, 
    validationErrors, 
    getTotalWithTaxAndTip, 
    getSelectedCartItems, 
    address, 
    savedAddresses, 
    selectedItems, 
    selectedTip, 
    customTip, 
    closeAddressModal,
    currentDateTime,
    TAX_RATE
  ]);

  const renderErrorMessage = useCallback((field) => {
    if (validationErrors[field]) {
      return (
        <div className="error-message">
          <span className="error-icon">⚠️</span>
          {validationErrors[field]}
        </div>
      );
    }
    return null;
  }, [validationErrors]);

  const getSelectionStats = useCallback(() => {
    const selectedCount = selectedItems.length;
    const totalCount = cart.length;
    const selectedTotal = getSelectedTotalPrice();
    const tax = calculateTaxAmount(selectedTotal);
    
    return {
      selectedCount,
      totalCount,
      selectedTotal,
      tax
    };
  }, [selectedItems.length, cart.length, getSelectedTotalPrice, calculateTaxAmount]);

  // ========== RENDER FUNCTIONS ==========

  const stats = getSelectionStats();
  const totals = getTotalWithTaxAndTip();

  // Render Payment Status Modal
  const renderPaymentModal = () => {
    if (!showPaymentModal) return null;

    const isSuccess = paymentStatus === 'success';
    const isFailed = paymentStatus === 'failed';

    return (
      <div className="modal-overlay" onClick={handleOverlayClick}>
        <div 
          ref={paymentModalRef}
          className="modal-container"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-header">
            <h2 className="modal-title">
              <span className="modal-icon">
                {isSuccess ? '✅' : isFailed ? '❌' : '⏳'}
              </span>
              {isSuccess ? 'Payment Successful!' : isFailed ? 'Payment Failed' : 'Processing Payment'}
            </h2>
            <button
              onClick={closePaymentModal}
              className="modal-close-btn"
              type="button"
            >
              ×
            </button>
          </div>

          <div className="modal-body">
            {isSuccess && orderDetails && (
              <>
                <div className="order-time-display-modal" style={{ background: '#E8F5E9', borderColor: '#4CAF50' }}>
                  <div className="order-time-modal-icon">🎉</div>
                  <div className="order-time-modal-details">
                    <div className="order-time-modal-label">Order Confirmed!</div>
                    <div className="order-time-modal-value">Payment ID: {orderDetails.paymentId?.substring(0, 12)}...</div>
                    <div className="order-date-modal-value">Order placed at: {currentDateTime.time}</div>
                  </div>
                </div>

                <div className="checkout-summary-modal">
                  <h4 className="checkout-summary-title">📦 Order Details</h4>
                  
                  <div className="checkout-items-list">
                    {orderDetails.cartItems.map(item => (
                      <div key={item.id} className="checkout-item">
                        <span className="checkout-item-name">{item.name}</span>
                        <span className="checkout-item-details">
                          {item.quantity} × ₹{formatIndianNumber(item.price)}
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="checkout-total">
                    <span>Subtotal:</span>
                    <span>₹{formatIndianNumber(orderDetails.subtotal)}</span>
                  </div>
                  <div className="checkout-total">
                    <span>Tax (GST 5%):</span>
                    <span>₹{formatIndianNumber(orderDetails.tax)}</span>
                  </div>
                  {orderDetails.tip > 0 && (
                    <div className="checkout-total">
                      <span>Delivery Tip:</span>
                      <span>₹{formatIndianNumber(orderDetails.tip)}</span>
                    </div>
                  )}
                  <div className="checkout-total" style={{ borderTop: '2px solid #4CAF50', fontWeight: '700' }}>
                    <span>Total Paid:</span>
                    <span style={{ color: '#4CAF50' }}>₹{formatIndianNumber(orderDetails.totalAmount)}</span>
                  </div>
                  
                  <div className="selected-address-preview">
                    <h5 className="address-preview-title">📍 Delivery To:</h5>
                    <div className="address-preview-content">
                      <div className="address-preview-name-phone">
                        <strong>{orderDetails.address.fullName}</strong>
                        <span>📱 {orderDetails.address.phone}</span>
                      </div>
                      <p>{orderDetails.address.street}</p>
                      {orderDetails.address.landmark && (
                        <p><em>Near: {orderDetails.address.landmark}</em></p>
                      )}
                      <p>{orderDetails.address.city}, {orderDetails.address.state} - {orderDetails.address.pincode}</p>
                    </div>
                  </div>
                </div>
                
                <div className="success-message" style={{ 
                  background: '#E8F5E9', 
                  padding: '20px', 
                  borderRadius: '12px', 
                  textAlign: 'center',
                  marginTop: '20px',
                  border: '2px solid #4CAF50'
                }}>
                  <h3 style={{ color: '#2E7D32', marginBottom: '10px' }}>🎉 Thank You for Your Order!</h3>
                  <p style={{ color: '#4F6F6B' }}>
                    Your order has been confirmed and will be delivered soon.
                    You can track your order in the "Orders" section.
                  </p>
                </div>
              </>
            )}

            {isFailed && orderDetails && (
              <div className="error-message-container" style={{ 
                background: '#FFEBEE', 
                padding: '30px', 
                borderRadius: '12px', 
                textAlign: 'center',
                border: '2px solid #FF4444'
              }}>
                <h3 style={{ color: '#C62828', marginBottom: '15px' }}>❌ Payment Failed</h3>
                <p style={{ color: '#4F6F6B', marginBottom: '20px' }}>
                  We couldn't process your payment. Please try again or use a different payment method.
                </p>
                <div style={{ marginTop: '20px' }}>
                  <button
                    onClick={() => {
                      closePaymentModal();
                      openAddressModal();
                    }}
                    className="modal-submit-btn"
                    style={{ background: '#4DB6AC' }}
                    type="button"
                  >
                    🔄 Try Again
                  </button>
                </div>
              </div>
            )}

            {isProcessingPayment && (
              <div style={{ textAlign: 'center', padding: '40px' }}>
                <div className="loading-spinner" style={{ 
                  width: '50px', 
                  height: '50px', 
                  border: '5px solid #E0F2F1',
                  borderTop: '5px solid #4DB6AC',
                  borderRadius: '50%',
                  margin: '0 auto 20px',
                  animation: 'spin 1s linear infinite'
                }}></div>
                <h3 style={{ color: '#124441' }}>Processing Payment...</h3>
                <p style={{ color: '#4F6F6B' }}>Please wait while we connect to payment gateway</p>
              </div>
            )}
          </div>

          <div className="modal-footer">
            <button
              onClick={closePaymentModal}
              className="modal-cancel-btn"
              type="button"
            >
              {isSuccess ? 'Continue Shopping' : 'Close'}
            </button>
            
            {isSuccess && (
              <button
                onClick={() => {
                  closePaymentModal();
                  if (setActiveView) setActiveView('orders');
                }}
                className="modal-submit-btn"
                type="button"
              >
                📋 View My Orders
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="cart-container">
      {/* Header Section */}
      <div className="cart-header">
        <div className="back-button-container">
          <BackButton 
            onClick={handleBackToMedicines} 
            text="Back to Medicines" 
          />
          
          {cart.length > 0 && (
            <button 
              className="view-orders-btn"
              onClick={() => {
                if (typeof setActiveView === 'function') {
                  setActiveView('orders');
                }
              }}
              type="button"
            >
              📋 View Orders
            </button>
          )}
        </div>
        
        <div className="header-title-container">
          <h2 className="cart-title">Your Shopping Cart</h2>
          <div className="current-time-display">
            <span className="time-icon">🕒</span>
            <span className="current-date">{currentDateTime.date}</span>
            <span className="current-time">{currentDateTime.time}</span>
          </div>
        </div>
        
        {cart.length > 0 && (
          <div className="cart-stats">
            <div className="stat-box">
              <div className="stat-value">{stats.selectedCount}/{cart.length}</div>
              <div className="stat-label">✅ Selected</div>
            </div>
            
            <div className="stat-box">
              <div className="stat-value">₹{formatIndianNumber(stats.selectedTotal)}</div>
              <div className="stat-label">💰 Selected Total</div>
            </div>

            <div className="stat-box">
              <div className="stat-value">₹{formatIndianNumber(stats.tax)}</div>
              <div className="stat-label">🧾 Tax (5% GST)</div>
            </div>
          </div>
        )}
      </div>
      
      <div className="cart-content">
        {cart.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-cart-icon">🛒</div>
            <h3 className="empty-cart-title">Your cart is empty</h3>
            <p className="empty-cart-message">
              Looks like you haven't added any medicines to your cart yet.
            </p>
            <button 
              className="shop-now-btn"
              onClick={handleBackToMedicines}
              type="button"
            >
              Shop Medicines Now
            </button>
          </div>
        ) : (
          <>
            {/* Cart Items Container (keep your existing JSX here) */}
            <div className="cart-items-container">
              {/* ... Your existing cart items JSX ... */}
              <div className="cart-items-header">
                <div className="selection-header">
                  <h3 className="cart-items-title">🛒 Cart Items ({cart.length})</h3>
                  <div className="select-all-container">
                    <label className="select-all-label">
                      <input
                        type="checkbox"
                        checked={selectAll}
                        onChange={toggleSelectAll}
                        className="select-all-checkbox"
                      />
                      <span className="select-all-text">
                        {selectAll ? 'Deselect All' : 'Select All'}
                      </span>
                    </label>
                    <span className="selection-count">
                      ({stats.selectedCount} selected)
                    </span>
                  </div>
                </div>
                <p className="cart-items-subtitle">Select items you want to checkout</p>
              </div>
              
              <div className="cart-items-list">
                {cart.map(item => {
                  const isSelected = selectedItems.includes(item.id);
                  return (
                    <div key={item.id} className={`cart-item ${isSelected ? 'selected' : ''}`}>
                      <div className="item-selection">
                        <label className="selection-label">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => toggleItemSelection(item.id)}
                            className="item-checkbox"
                          />
                          <span className="checkmark"></span>
                        </label>
                      </div>
                      
                      <div className="item-info">
                        <h4 className="item-name">
                          {item.name}
                          {isSelected && <span className="selected-badge">✓ Selected</span>}
                        </h4>
                        <p className="item-vendor"> {item.vendor}</p>
                        <p className="item-price">₹{formatIndianNumber(item.price)} each</p>
                      </div>
                      
                      <div className="quantity-controls">
                        <button 
                          className={`quantity-btn ${item.quantity <= 1 ? 'disabled' : ''}`}
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          type="button"
                          disabled={item.quantity <= 1}
                        >
                          −
                        </button>
                        <span className="quantity-display">{item.quantity}</span>
                        <button 
                          className="quantity-btn increase"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          type="button"
                        >
                          +
                        </button>
                      </div>
                      
                      <div className="item-total">
                        ₹{formatIndianNumber(item.price * item.quantity)}
                      </div>
                      
                      <button 
                        className="remove-btn"
                        onClick={() => handleRemoveItem(item.id)}
                        title="Remove item"
                        type="button"
                      >
                        ×
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Order Summary (keep your existing JSX here) */}
            <div className="order-summary">
              <div className="summary-content">
                <h3 className="summary-title">💰 Order Summary</h3>
                
                <div className="order-time-info">
                  <div className="order-time-icon">🕒</div>
                  <div className="order-time-details">
                    <div className="order-time-label">Order will be placed at:</div>
                    <div className="order-time-value">{currentDateTime.time}</div>
                    <div className="order-date-value">{currentDateTime.date}</div>
                  </div>
                </div>
                
                <div className="selection-summary">
                  <div className="selection-summary-header">
                    <span className="selection-summary-icon">📋</span>
                    <span className="selection-summary-title">Selected Items Summary</span>
                  </div>
                  <div className="selection-summary-content">
                    {getSelectedCartItems().map(item => (
                      <div key={item.id} className="selected-item-summary">
                        <span className="selected-item-name">{item.name}</span>
                        <span className="selected-item-qty">×{item.quantity}</span>
                        <span className="selected-item-price">
                          ₹{formatIndianNumber(item.price * item.quantity)}
                        </span>
                      </div>
                    ))}
                    {stats.selectedCount === 0 && (
                      <div className="no-selection-message">
                        ⚠️ No items selected. Please select items to checkout.
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="tip-section">
                  <h4 className="tip-title">💝 Tip Your Delivery Agent (Optional)</h4>
                  
                  <p className="tip-subtitle">
                    Support your delivery agent with a small tip for their service
                  </p>
                  
                  <div className="tip-options">
                    {tipOptions.map((tip) => (
                      <button
                        key={tip.amount}
                        className={`tip-option ${selectedTip === tip.amount ? 'selected' : ''}`}
                        onClick={() => handleTipSelect(tip.amount)}
                        type="button"
                        disabled={stats.selectedCount === 0}
                      >
                        <span className="tip-label">
                          {tip.label}
                        </span>
                        {tip.amount > 0 && (
                          <span className="tip-emoji">
                            👍
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                  
                  {selectedTip === 0 && (
                    <div className="custom-tip">
                      <label className="custom-tip-label">
                        Enter Custom Tip Amount (₹)
                      </label>
                      <input
                        type="text"
                        placeholder="Enter amount"
                        value={customTip}
                        onChange={(e) => handleCustomTipChange(e.target.value)}
                        className="custom-tip-input"
                        maxLength="5"
                        disabled={stats.selectedCount === 0}
                      />
                    </div>
                  )}
                </div>
                
                <div className="price-breakdown">
                  <div className="price-row">
                    <span className="price-label">Selected Items Total:</span>
                    <span className="price-value">₹{formatIndianNumber(totals.subtotal)}</span>
                  </div>
                  
                  <div className="price-row">
                    <span className="price-label">Delivery Fee:</span>
                    <span className="price-free">🆓 Free</span>
                  </div>
                  
                  <div className="price-row">
                    <span className="price-label">Tax (GST 5%):</span>
                    <span className="price-tax">₹{formatIndianNumber(totals.tax)}</span>
                  </div>
                  
                  <div className="price-row">
                    <div className="tip-label-container">
                      <span className="price-label">Delivery Tip:</span>
                      <span className="tip-optional">
                        Optional
                      </span>
                    </div>
                    <span className={`tip-amount ${totals.tip > 0 ? 'has-tip' : ''}`}>
                      {totals.tip > 0 ? `₹${formatIndianNumber(totals.tip)}` : '₹0'}
                    </span>
                  </div>
                  
                  <div className="grand-total">
                    <span className="total-label">Grand Total:</span>
                    <span className="total-value">
                      ₹{formatIndianNumber(totals.total)}
                    </span>
                  </div>
                  
                  {totals.tip > 0 && (
                    <div className="tip-note">
                      💝 Thank you for supporting your delivery agent!
                    </div>
                  )}
                  
                  {stats.selectedCount > 0 && stats.selectedCount < cart.length && (
                    <div className="selection-note">
                      📝 Note: {cart.length - stats.selectedCount} item(s) will remain in your cart
                    </div>
                  )}
                </div>
                
                <button 
                  className={`checkout-btn ${isProcessingPayment ? 'loading' : ''} ${stats.selectedCount === 0 ? 'disabled' : ''}`}
                  onClick={handleCheckout}
                  disabled={isProcessingPayment || stats.selectedCount === 0}
                  type="button"
                >
                  {isProcessingPayment 
                    ? '⏳ Processing Payment...' 
                    : stats.selectedCount === 0
                    ? '⚠️ Select Items to Checkout'
                    : `💳 Checkout ${stats.selectedCount} Item(s) - ₹${formatIndianNumber(totals.total)}`}
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Address Modal (keep your existing modal JSX) */}
      {showAddressModal && (
        <div className="modal-overlay" onClick={handleOverlayClick}>
          <div 
            ref={modalRef}
            className="modal-container"
            onClick={(e) => e.stopPropagation()}
          >
            {/* ... Your existing address modal JSX ... */}
            <div className="modal-header">
              <h2 className="modal-title">
                <span className="modal-icon">📍</span>
                Delivery Address
              </h2>
              <div className="modal-time-info">
                <span className="modal-time-icon">🕒</span>
                <span className="modal-time">{currentDateTime.time}</span>
              </div>
              <button
                onClick={closeAddressModal}
                className="modal-close-btn"
                type="button"
              >
                ×
              </button>
            </div>

            <div className="modal-body">
              {/* Order Time Display */}
              <div className="order-time-display-modal">
                <div className="order-time-modal-icon">📅</div>
                <div className="order-time-modal-details">
                  <div className="order-time-modal-label">Order will be placed at:</div>
                  <div className="order-time-modal-value">{currentDateTime.time}</div>
                  <div className="order-date-modal-value">{currentDateTime.date}</div>
                </div>
              </div>

              {/* Address Mode Tabs */}
              <div className="address-mode-tabs">
                <button
                  className={`address-tab ${addressMode === 'select' ? 'active' : ''}`}
                  onClick={() => setAddressMode('select')}
                  type="button"
                >
                  📋 Saved Addresses
                </button>
                <button
                  className={`address-tab ${addressMode === 'new' ? 'active' : ''}`}
                  onClick={switchToNewAddressMode}
                  type="button"
                >
                  ✏️ Add New Address
                </button>
              </div>

              {/* Saved Addresses Section */}
              {addressMode === 'select' && (
                <div className="saved-addresses-section">
                  {savedAddresses.length > 0 ? (
                    <>
                      <h4 className="section-title">🏠 Your Saved Addresses</h4>
                      <p className="section-subtitle">
                        Select a saved address or add a new one
                      </p>
                      
                      <div className="saved-addresses-list">
                        {savedAddresses.map((addr) => (
                          <div
                            key={addr.id}
                            className={`saved-address-card ${selectedAddressId === addr.id ? 'selected' : ''}`}
                            onClick={() => handleAddressSelect(addr)}
                          >
                            <div className="address-card-header">
                              <div className="address-type">
                                {addr.isDefault && <span className="default-badge">🏠 Default</span>}
                              </div>
                              <button
                                className="delete-address-btn"
                                onClick={(e) => deleteAddress(addr.id, e)}
                                type="button"
                                title="Delete address"
                              >
                                🗑️
                              </button>
                            </div>
                            
                            <div className="address-card-content">
                              <div className="address-name-phone">
                                <strong>{addr.fullName}</strong>
                                <span className="address-phone">📱 {addr.phone}</span>
                              </div>
                              <p className="address-street">{addr.street}</p>
                              {addr.landmark && (
                                <p className="address-landmark">
                                  <em>Near: {addr.landmark}</em>
                                </p>
                              )}
                              <p className="address-city-state">
                                {addr.city}, {addr.state} - {addr.pincode}
                              </p>
                            </div>
                            
                            <div className="address-card-footer">
                              {selectedAddressId === addr.id && (
                                <div className="selected-indicator">
                                  ✅ Selected for delivery
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {/* Add New Address Button */}
                      <button
                        className="add-new-address-btn"
                        onClick={switchToNewAddressMode}
                        type="button"
                      >
                        ➕ Add New Address
                      </button>
                    </>
                  ) : (
                    <div className="no-addresses-message">
                      <div className="no-addresses-icon">🏠</div>
                      <h4>No Saved Addresses</h4>
                      <p>You haven't saved any addresses yet.</p>
                      <button
                        className="add-first-address-btn"
                        onClick={switchToNewAddressMode}
                        type="button"
                      >
                        ➕ Add Your First Address
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* New Address Form Section */}
              {addressMode === 'new' && (
                <div className="new-address-section">
                  <h4 className="section-title">✏️ Enter New Address</h4>
                  <p className="section-subtitle">
                    Fill in your delivery details below
                  </p>
                  
                  <div className="address-form">
                    <div className="form-row">
                      <div id="address-fullName" className="form-group">
                        <label className="form-label">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          placeholder="Enter full name"
                          value={address.fullName}
                          onChange={(e) => handleAddressChange('fullName', e.target.value)}
                          className={`form-input ${validationErrors.fullName ? 'error' : ''}`}
                        />
                        {renderErrorMessage('fullName')}
                      </div>
                      <div id="address-phone" className="form-group">
                        <label className="form-label">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          placeholder="6,7,8,9 numbers only"
                          value={address.phone}
                          onChange={(e) => handleAddressChange('phone', e.target.value)}
                          className={`form-input ${validationErrors.phone ? 'error' : ''}`}
                          maxLength="10"
                        />
                        {renderErrorMessage('phone')}
                      </div>
                    </div>

                    <div id="address-street" className="form-group">
                      <label className="form-label">
                        Street Address *
                      </label>
                      <input
                        type="text"
                        placeholder="Enter street address"
                        value={address.street}
                        onChange={(e) => handleAddressChange('street', e.target.value)}
                        className={`form-input ${validationErrors.street ? 'error' : ''}`}
                      />
                      {renderErrorMessage('street')}
                    </div>

                    <div className="form-group">
                      <label className="form-label">
                        Landmark (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="Enter nearby landmark"
                        value={address.landmark}
                        onChange={(e) => handleAddressChange('landmark', e.target.value)}
                        className="form-input"
                      />
                    </div>

                    <div className="form-row">
                      <div id="address-city" className="form-group">
                        <label className="form-label">
                          City *
                        </label>
                        <input
                          type="text"
                          placeholder="Enter city"
                          value={address.city}
                          onChange={(e) => handleAddressChange('city', e.target.value)}
                          className={`form-input ${validationErrors.city ? 'error' : ''}`}
                        />
                        {renderErrorMessage('city')}
                      </div>
                      <div id="address-state" className="form-group">
                        <label className="form-label">
                          State *
                        </label>
                        <input
                          type="text"
                          placeholder="Enter state"
                          value={address.state}
                          onChange={(e) => handleAddressChange('state', e.target.value)}
                          className={`form-input ${validationErrors.state ? 'error' : ''}`}
                        />
                        {renderErrorMessage('state')}
                      </div>
                    </div>

                    <div id="address-pincode" className="form-group">
                      <label className="form-label">
                        Pincode *
                      </label>
                      <input
                        type="text"
                        placeholder="6-digit numbers only"
                        value={address.pincode}
                        onChange={(e) => handleAddressChange('pincode', e.target.value)}
                        className={`form-input ${validationErrors.pincode ? 'error' : ''}`}
                        maxLength="6"
                      />
                      {renderErrorMessage('pincode')}
                    </div>
                    
                    {/* Save Address Checkbox */}
                    <div className="save-address-option">
                      <label className="save-address-label">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="save-address-checkbox"
                        />
                        <span>💾 Save this address for future orders</span>
                      </label>
                    </div>
                    
                    {/* Form Action Buttons */}
                    <div className="address-form-actions">
                      <button
                        className="save-address-btn"
                        onClick={saveCurrentAddress}
                        type="button"
                      >
                        💾 Save Address
                      </button>
                      
                      <button
                        className="use-without-saving-btn"
                        onClick={() => {
                          setAddressMode('select');
                        }}
                        type="button"
                      >
                        📦 Use Address (Don't Save)
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Order Summary (Only shown when address is selected) */}
              {(addressMode === 'select' && selectedAddressId) && (
                <div className="checkout-summary-modal">
                  <h4 className="checkout-summary-title">📋 Order Summary ({stats.selectedCount} items)</h4>
                  <div className="checkout-items-list">
                    {getSelectedCartItems().map(item => (
                      <div key={item.id} className="checkout-item">
                        <span className="checkout-item-name">{item.name}</span>
                        <span className="checkout-item-details">
                          {item.quantity} × ₹{formatIndianNumber(item.price)} = 
                          ₹{formatIndianNumber(item.price * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="checkout-total">
                    <span>Subtotal:</span>
                    <span>₹{formatIndianNumber(totals.subtotal)}</span>
                  </div>
                  <div className="checkout-total">
                    <span>Tax (GST 5%):</span>
                    <span>₹{formatIndianNumber(totals.tax)}</span>
                  </div>
                  <div className="checkout-total">
                    <span>Delivery Tip:</span>
                    <span>₹{formatIndianNumber(totals.tip)}</span>
                  </div>
                  <div className="checkout-total" style={{ borderTop: '2px solid #009688', fontWeight: '700' }}>
                    <span>Total to Pay:</span>
                    <span>₹{formatIndianNumber(totals.total)}</span>
                  </div>
                  
                  {/* Selected Address Preview */}
                  <div className="selected-address-preview">
                    <h5 className="address-preview-title">📍 Delivery To:</h5>
                    <div className="address-preview-content">
                      {(() => {
                        const selectedAddress = savedAddresses.find(addr => addr.id === selectedAddressId);
                        if (!selectedAddress) return null;
                        
                        return (
                          <>
                            <div className="address-preview-name-phone">
                              <strong>{selectedAddress.fullName}</strong>
                              <span>📱 {selectedAddress.phone}</span>
                            </div>
                            <p>{selectedAddress.street}</p>
                            {selectedAddress.landmark && (
                              <p><em>Near: {selectedAddress.landmark}</em></p>
                            )}
                            <p>{selectedAddress.city}, {selectedAddress.state} - {selectedAddress.pincode}</p>
                          </>
                        );
                      })()}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="modal-footer">
              <button
                onClick={closeAddressModal}
                className="modal-cancel-btn"
                type="button"
              >
                Cancel
              </button>
              
              {/* Conditional Submit Button */}
              {addressMode === 'select' ? (
                <button
                  onClick={handlePaymentSubmit}
                  disabled={isProcessingPayment || !selectedAddressId}
                  className={`modal-submit-btn ${isProcessingPayment ? 'loading' : ''} ${!selectedAddressId ? 'disabled' : ''}`}
                  type="button"
                >
                  {isProcessingPayment
                    ? '⏳ Initializing Payment...' 
                    : !selectedAddressId
                    ? '📋 Select an Address'
                    : `💳 Pay ₹${formatIndianNumber(totals.total)}`}
                </button>
              ) : (
                <button
                  onClick={handlePaymentSubmit}
                  disabled={isProcessingPayment}
                  className={`modal-submit-btn ${isProcessingPayment ? 'loading' : ''}`}
                  type="button"
                >
                  {isProcessingPayment
                    ? '⏳ Initializing Payment...' 
                    : `💳 Pay ₹${formatIndianNumber(totals.total)}`}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Payment Status Modal */}
      {renderPaymentModal()}

      {/* Add CSS animation */}
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .loading-spinner {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default CartView;