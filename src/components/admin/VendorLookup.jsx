import React, { useState, useEffect } from 'react';

const VendorLookup = () => {
  const primaryColor = '#7C2A62';
  const accentColor = '#F7D9EB';
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [showAllVendors, setShowAllVendors] = useState(false);
  const [notification, setNotification] = useState('');
  const [dailySalesData, setDailySalesData] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [supportOpen, setSupportOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({});

  // Comprehensive vendor data - moved to state so it can be updated
  const initialVendors = [
    {
      id: 'V001',
      name: 'MedPlus Pharmacy',
      owner: 'Rajesh Kumar',
      phone: '+91 9876543210',
      email: 'medplus@pharmacy.com',
      address: '123 MG Road, Bangalore, Karnataka - 560001',
      status: 'Active',
      registrationDate: '2020-03-15',
      licenseNumber: 'PHARM123456',
      licenseExpiry: '2025-12-31',
      drugPermitNumber: 'DP789012',
      gstNumber: '29AABCU9603R1ZM',
      kycStatus: 'Verified',
      totalMedicines: 1250,
      lowStock: 15,
      expiredItems: 3,
      outOfStock: 8,
      averageRating: 4.5,
      totalReviews: 234,
      totalOrders: 1250,
      completedOrders: 1200,
      cancelledOrders: 25,
      refundedOrders: 15,
      averageOrderValue: 850,
      monthlyRevenue: 425000,
      documents: {
        drugPermit: 'drug_permit_V001.pdf',
        gstCertificate: 'gst_cert_V001.pdf',
        licenseCopy: 'license_V001.pdf'
      },
      recentReviews: [
        { id: 1, customer: 'Rahul Sharma', rating: 5, comment: 'Excellent service and fast delivery. Medicines were genuine and properly packed.', date: '2024-01-15' },
        { id: 2, customer: 'Priya Patel', rating: 4, comment: 'Good quality medicines, slightly delayed delivery but overall satisfied.', date: '2024-01-14' },
        { id: 3, customer: 'Anil Kumar', rating: 3, comment: 'Average experience. Some medicines were not available as expected.', date: '2024-01-12' },
        { id: 4, customer: 'Sneha Reddy', rating: 5, comment: 'Best pharmacy in town! Always have what I need and great customer service.', date: '2024-01-10' }
      ],
      products: [
        { id: 1, name: 'Paracetamol 500mg', brand: 'Cipla', quantity: 150, price: 25, sku: 'SKU001', expiry: '2025-06-30', category: 'Pain Relief' },
        { id: 2, name: 'Amoxicillin 250mg', brand: 'Sun Pharma', quantity: 80, price: 45, sku: 'SKU002', expiry: '2024-11-30', category: 'Antibiotic' },
        { id: 3, name: 'Vitamin C 1000mg', brand: 'Himalaya', quantity: 200, price: 120, sku: 'SKU003', expiry: '2025-12-31', category: 'Supplement' },
        { id: 4, name: 'Metformin 500mg', brand: 'Dr. Reddy\'s', quantity: 5, price: 35, sku: 'SKU004', expiry: '2024-09-30', category: 'Diabetes' },
        { id: 5, name: 'Atorvastatin 20mg', brand: 'Lupin', quantity: 12, price: 85, sku: 'SKU005', expiry: '2025-03-31', category: 'Cholesterol' },
        { id: 6, name: 'Omeprazole 20mg', brand: 'Mankind', quantity: 0, price: 55, sku: 'SKU006', expiry: '2025-01-31', category: 'Acidity' },
        { id: 7, name: 'Cetirizine 10mg', brand: 'Cipla', quantity: 45, price: 18, sku: 'SKU007', expiry: '2024-12-31', category: 'Allergy' },
        { id: 8, name: 'Aspirin 75mg', brand: 'GSK', quantity: 90, price: 30, sku: 'SKU008', expiry: '2025-08-31', category: 'Blood Thinner' }
      ],
      salesData: {
        daily: 42,
        weekly: 285,
        monthly: 1250,
        trend: 'up'
      },
      compliance: {
        lastAudit: '2024-01-10',
        auditScore: 92,
        violations: 0,
        warnings: 1
      }
    },
    {
      id: 'V002',
      name: 'Apollo Pharmacy',
      owner: 'Priya Singh',
      phone: '+91 9876543211',
      email: 'apollo.delhi@pharmacy.com',
      address: '45 Connaught Place, New Delhi - 110001',
      status: 'Active',
      registrationDate: '2019-08-22',
      licenseNumber: 'PHARM789012',
      licenseExpiry: '2024-11-30',
      drugPermitNumber: 'DP345678',
      gstNumber: '07AABCU9603R1ZN',
      kycStatus: 'Pending',
      totalMedicines: 890,
      lowStock: 8,
      expiredItems: 1,
      outOfStock: 3,
      averageRating: 4.2,
      totalReviews: 156,
      totalOrders: 890,
      completedOrders: 865,
      cancelledOrders: 15,
      refundedOrders: 8,
      averageOrderValue: 720,
      monthlyRevenue: 312000,
      documents: {
        drugPermit: 'drug_permit_V002.pdf',
        gstCertificate: 'gst_cert_V002.pdf',
        licenseCopy: 'license_V002.pdf'
      },
      recentReviews: [
        { id: 1, customer: 'Amit Verma', rating: 4, comment: 'Good service and reasonable prices.', date: '2024-01-14' },
        { id: 2, customer: 'Neha Gupta', rating: 5, comment: 'Very professional staff and quick service.', date: '2024-01-13' }
      ],
      products: [
        { id: 1, name: 'Ibuprofen 400mg', brand: 'Cipla', quantity: 75, price: 32, sku: 'SKU101', expiry: '2025-04-30', category: 'Pain Relief' },
        { id: 2, name: 'Azithromycin 250mg', brand: 'Sun Pharma', quantity: 40, price: 68, sku: 'SKU102', expiry: '2024-10-31', category: 'Antibiotic' }
      ],
      salesData: {
        daily: 28,
        weekly: 195,
        monthly: 890,
        trend: 'stable'
      },
      compliance: {
        lastAudit: '2024-01-05',
        auditScore: 88,
        violations: 1,
        warnings: 0
      }
    },
    {
      id: 'V003',
      name: 'Wellness Forever',
      owner: 'Arun Mehta',
      phone: '+91 9876543212',
      email: 'wellness.mumbai@pharmacy.com',
      address: '78 Linking Road, Mumbai, Maharashtra - 400052',
      status: 'Suspended',
      registrationDate: '2021-01-10',
      licenseNumber: 'PHARM345678',
      licenseExpiry: '2024-08-15',
      drugPermitNumber: 'DP901234',
      gstNumber: '27AABCU9603R1ZO',
      kycStatus: 'Rejected',
      totalMedicines: 0,
      lowStock: 0,
      expiredItems: 12,
      outOfStock: 0,
      averageRating: 3.8,
      totalReviews: 89,
      totalOrders: 0,
      completedOrders: 0,
      cancelledOrders: 0,
      refundedOrders: 0,
      averageOrderValue: 0,
      monthlyRevenue: 0,
      documents: {
        drugPermit: 'drug_permit_V003.pdf',
        gstCertificate: 'gst_cert_V003.pdf',
        licenseCopy: 'license_V003.pdf'
      },
      recentReviews: [],
      products: [],
      salesData: {
        daily: 0,
        weekly: 0,
        monthly: 0,
        trend: 'down'
      },
      compliance: {
        lastAudit: '2023-12-20',
        auditScore: 65,
        violations: 3,
        warnings: 2
      }
    }
  ];

  // Initialize vendors state
  useEffect(() => {
    setVendors(initialVendors);
    setSelectedVendor(initialVendors[0]);
    setDailySalesData(generateDailySalesData());
  }, []);

  // Generate daily sales data for chart
  const generateDailySalesData = () => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return days.map(day => ({
      day,
      sales: Math.floor(Math.random() * 50) + 20,
      revenue: Math.floor(Math.random() * 40000) + 10000
    }));
  };

  // Enhanced search function
  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setSelectedVendor(vendors[0]);
      setShowAllVendors(false);
      showNotification('Showing default vendor');
      return;
    }

    const query = searchQuery.toLowerCase().trim();
    const foundVendor = vendors.find(v => 
      v.id.toLowerCase() === query || 
      v.name.toLowerCase().includes(query) ||
      v.phone.includes(query) ||
      v.owner.toLowerCase().includes(query) ||
      v.licenseNumber.toLowerCase().includes(query)
    );
    
    if (foundVendor) {
      setSelectedVendor(foundVendor);
      setShowAllVendors(false);
      setDailySalesData(generateDailySalesData());
      showNotification(`Found vendor: ${foundVendor.name}`);
    } else {
      setSelectedVendor(null);
      showNotification('No vendor found with the search criteria', 'error');
    }
  };

  const handleShowAllVendors = () => {
    setShowAllVendors(true);
    setSelectedVendor(null);
    showNotification('Showing all vendors');
  };

  const handleVendorSelect = (vendor) => {
    setSelectedVendor(vendor);
    setShowAllVendors(false);
    setSearchQuery('');
    setDailySalesData(generateDailySalesData());
    showNotification(`Selected vendor: ${vendor.name}`);
  };

  // Document viewing functions
  const handleViewDocument = (documentType, vendor) => {
    const documentName = vendor.documents[documentType];
    showNotification(`Opening ${documentType.replace(/([A-Z])/g, ' $1')}: ${documentName}`);
    // In a real application, this would open the actual document
    console.log(`Opening document: ${documentName} for vendor ${vendor.name}`);
  };

  // Update vendor in state
  const updateVendor = (vendorId, updates) => {
    setVendors(prevVendors => 
      prevVendors.map(vendor => 
        vendor.id === vendorId ? { ...vendor, ...updates } : vendor
      )
    );
    
    // Also update selected vendor if it's the one being modified
    if (selectedVendor && selectedVendor.id === vendorId) {
      setSelectedVendor(prev => ({ ...prev, ...updates }));
    }
  };

  // Admin actions functions with real updates
  const handleAdminAction = (action, vendor) => {
    const vendorName = vendor.name;
    
    switch (action) {
      case 'approve':
        updateVendor(vendor.id, { 
          status: 'Active',
          kycStatus: 'Verified'
        });
        showNotification(`Vendor ${vendorName} has been approved and activated`);
        break;
        
      case 'reject':
        updateVendor(vendor.id, { 
          status: 'Inactive',
          kycStatus: 'Rejected'
        });
        showNotification(`Vendor ${vendorName} has been rejected and deactivated`);
        break;
        
      case 'request-resubmit':
        updateVendor(vendor.id, { 
          kycStatus: 'Pending'
        });
        showNotification(`Requested document re-submission from ${vendorName}`);
        break;
        
      case 'edit-profile':
        setEditFormData({
          name: vendor.name,
          owner: vendor.owner,
          phone: vendor.phone,
          email: vendor.email,
          address: vendor.address
        });
        setEditProfileOpen(true);
        break;
        
      case 'suspend':
        updateVendor(vendor.id, { 
          status: 'Suspended'
        });
        showNotification(`Vendor ${vendorName} has been suspended`);
        break;
        
      case 'blacklist':
        updateVendor(vendor.id, { 
          status: 'Blacklisted'
        });
        showNotification(`Vendor ${vendorName} has been blacklisted`);
        break;
        
      case 'send-warning':
        updateVendor(vendor.id, { 
          compliance: {
            ...vendor.compliance,
            warnings: vendor.compliance.warnings + 1
          }
        });
        showNotification(`Warning sent to ${vendorName}. Total warnings: ${vendor.compliance.warnings + 1}`);
        break;
        
      case 'open-support':
        setSupportOpen(true);
        break;
        
      default:
        showNotification(`Action performed on ${vendorName}`);
    }
  };

  // Handle edit form submission
  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (selectedVendor) {
      updateVendor(selectedVendor.id, editFormData);
      setEditProfileOpen(false);
      showNotification('Vendor profile updated successfully');
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Notification system
  const showNotification = (message, type = 'success') => {
    setNotification(message);
    setTimeout(() => setNotification(''), 3000);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Active': return { bg: '#d4edda', text: '#155724' };
      case 'Inactive': return { bg: '#f8d7da', text: '#721c24' };
      case 'Suspended': return { bg: '#fff3cd', text: '#856404' };
      case 'Blacklisted': return { bg: '#000', text: '#fff' };
      default: return { bg: '#e2e3e5', text: '#383d41' };
    }
  };

  const getKYCStatusColor = (status) => {
    switch(status) {
      case 'Verified': return { bg: '#d4edda', text: '#155724' };
      case 'Pending': return { bg: '#fff3cd', text: '#856404' };
      case 'Rejected': return { bg: '#f8d7da', text: '#721c24' };
      default: return { bg: '#e2e3e5', text: '#383d41' };
    }
  };

  const getTrendIcon = (trend) => {
    switch(trend) {
      case 'up': return '↗️';
      case 'down': return '↘️';
      case 'stable': return '→';
      default: return '→';
    }
  };

  // Simple bar chart component for sales
  const SalesBarChart = ({ data }) => {
    const maxSales = Math.max(...data.map(item => item.sales));
    
    return (
      <div style={{ display: 'flex', alignItems: 'end', gap: '10px', height: '150px', padding: '20px 0' }}>
        {data.map((item, index) => (
          <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
            <div
              style={{
                height: `${(item.sales / maxSales) * 100}px`,
                backgroundColor: primaryColor,
                width: '30px',
                borderRadius: '5px 5px 0 0',
                transition: 'height 0.3s ease'
              }}
            />
            <div style={{ marginTop: '8px', fontSize: '12px', fontWeight: 'bold' }}>
              {item.sales}
            </div>
            <div style={{ fontSize: '11px', color: '#666' }}>
              {item.day}
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Edit Profile Modal
  const EditProfileModal = () => (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1001
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '10px',
        width: '90%',
        maxWidth: '500px',
        maxHeight: '90vh',
        overflow: 'auto'
      }}>
        <h3 style={{ color: primaryColor, marginBottom: '20px' }}>Edit Vendor Profile</h3>
        <form onSubmit={handleEditSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Store Name:</label>
            <input
              type="text"
              name="name"
              value={editFormData.name || ''}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: '10px',
                border: `1px solid ${accentColor}`,
                borderRadius: '5px'
              }}
              required
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Owner Name:</label>
            <input
              type="text"
              name="owner"
              value={editFormData.owner || ''}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: '10px',
                border: `1px solid ${accentColor}`,
                borderRadius: '5px'
              }}
              required
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Phone:</label>
            <input
              type="tel"
              name="phone"
              value={editFormData.phone || ''}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: '10px',
                border: `1px solid ${accentColor}`,
                borderRadius: '5px'
              }}
              required
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Email:</label>
            <input
              type="email"
              name="email"
              value={editFormData.email || ''}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: '10px',
                border: `1px solid ${accentColor}`,
                borderRadius: '5px'
              }}
              required
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Address:</label>
            <textarea
              name="address"
              value={editFormData.address || ''}
              onChange={handleInputChange}
              rows="3"
              style={{
                width: '100%',
                padding: '10px',
                border: `1px solid ${accentColor}`,
                borderRadius: '5px',
                resize: 'vertical'
              }}
              required
            />
          </div>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
            <button
              type="button"
              onClick={() => setEditProfileOpen(false)}
              style={{
                padding: '10px 20px',
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{
                padding: '10px 20px',
                backgroundColor: primaryColor,
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  // Support Modal
  const SupportModal = () => (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1001
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '10px',
        width: '90%',
        maxWidth: '500px',
        maxHeight: '90vh',
        overflow: 'auto'
      }}>
        <h3 style={{ color: primaryColor, marginBottom: '20px' }}>Open Support Ticket</h3>
        <div style={{ marginBottom: '20px' }}>
          <p><strong>Vendor:</strong> {selectedVendor?.name}</p>
          <p><strong>Vendor ID:</strong> {selectedVendor?.id}</p>
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Briefly describe the support issue:
          </label>
          <textarea
            rows="4"
            placeholder="Describe the issue here..."
            style={{
              width: '100%',
              padding: '10px',
              border: `1px solid ${accentColor}`,
              borderRadius: '5px',
              resize: 'vertical'
            }}
          />
        </div>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
          <button
            onClick={() => setSupportOpen(false)}
            style={{
              padding: '10px 20px',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Cancel
          </button>
          <button
            onClick={() => {
              setSupportOpen(false);
              showNotification('Support ticket created successfully');
            }}
            style={{
              padding: '10px 20px',
              backgroundColor: primaryColor,
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Submit Ticket
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ padding: '20px', backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      {/* Notification */}
      {notification && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          backgroundColor: '#28a745',
          color: 'white',
          padding: '15px 20px',
          borderRadius: '5px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          zIndex: 1000,
          animation: 'slideIn 0.3s ease'
        }}>
          {notification}
        </div>
      )}

      {/* Modals */}
      {editProfileOpen && <EditProfileModal />}
      {supportOpen && <SupportModal />}

      <h2 style={{ color: primaryColor, marginBottom: '20px' }}>Vendor Lookup & Profile</h2>
      
      {/* Search Section */}
      <div style={{ marginBottom: '30px' }}>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
          <input
            type="text"
            placeholder="Enter Pharmacy ID, Name, Phone, or Owner"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            style={{
              flex: 1,
              padding: '12px',
              border: `1px solid ${accentColor}`,
              borderRadius: '5px',
              fontSize: '14px'
            }}
          />
          <button
            onClick={handleSearch}
            style={{
              padding: '12px 24px',
              backgroundColor: primaryColor,
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 'bold'
            }}
          >
            Search
          </button>
          <button
            onClick={handleShowAllVendors}
            style={{
              padding: '12px 24px',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 'bold'
            }}
          >
            View All Vendors
          </button>
        </div>
        <div style={{ fontSize: '12px', color: '#666' }}>
          Tip: Search by ID (V001), Name (MedPlus), Phone, or Owner name. Default vendor is displayed automatically.
        </div>
      </div>

      {/* All Vendors List */}
      {showAllVendors && (
        <section style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          border: `1px solid ${accentColor}`,
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          marginBottom: '20px'
        }}>
          <h3 style={{ color: primaryColor, marginBottom: '15px' }}>All Registered Vendors</h3>
          <div style={{ display: 'grid', gap: '10px' }}>
            {vendors.map(vendor => (
              <div 
                key={vendor.id}
                onClick={() => handleVendorSelect(vendor)}
                style={{
                  padding: '15px',
                  border: `1px solid ${accentColor}`,
                  borderRadius: '5px',
                  cursor: 'pointer',
                  backgroundColor: '#fafafa',
                  transition: 'all 0.3s ease',
                  transform: 'translateY(0)',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#F7E8F3';
                  e.currentTarget.style.borderColor = primaryColor;
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 8px rgba(124, 42, 98, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#fafafa';
                  e.currentTarget.style.borderColor = accentColor;
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <strong style={{ color: primaryColor, fontSize: '16px' }}>{vendor.name}</strong> 
                    <span style={{ color: '#666', marginLeft: '8px' }}>({vendor.id})</span>
                  </div>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <span style={{
                      padding: '4px 12px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      ...getStatusColor(vendor.status)
                    }}>
                      {vendor.status}
                    </span>
                    <span style={{
                      padding: '4px 12px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      ...getKYCStatusColor(vendor.kycStatus)
                    }}>
                      KYC: {vendor.kycStatus}
                    </span>
                  </div>
                </div>
                <div style={{ color: '#666', fontSize: '14px', marginTop: '8px' }}>
                  <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                    <span>👤 {vendor.owner}</span>
                    <span>📞 {vendor.phone}</span>
                    <span>📍 {vendor.address.split(',')[0]}</span>
                  </div>
                </div>
                <div style={{ marginTop: '10px', fontSize: '13px', color: '#888' }}>
                  Registered: {vendor.registrationDate} • Medicines: {vendor.totalMedicines} • Rating: {vendor.averageRating}/5
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Vendor Profile */}
      {selectedVendor && (
        <div style={{ display: 'grid', gap: '20px' }}>
          {/* Store Information */}
          <section style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            border: `1px solid ${accentColor}`,
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ color: primaryColor, marginBottom: '15px', borderBottom: `2px solid ${accentColor}`, paddingBottom: '10px' }}>A. Store Information</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '15px' }}>
              <div><strong>Store Name:</strong> {selectedVendor.name}</div>
              <div><strong>Owner Name:</strong> {selectedVendor.owner}</div>
              <div><strong>Phone:</strong> {selectedVendor.phone}</div>
              <div><strong>Email:</strong> {selectedVendor.email}</div>
              <div><strong>Address:</strong> {selectedVendor.address}</div>
              <div><strong>Registration Date:</strong> {selectedVendor.registrationDate}</div>
              <div>
                <strong>Status:</strong> 
                <span style={{
                  padding: '4px 12px',
                  borderRadius: '12px',
                  fontSize: '12px',
                  marginLeft: '8px',
                  fontWeight: 'bold',
                  ...getStatusColor(selectedVendor.status)
                }}>
                  {selectedVendor.status}
                </span>
              </div>
            </div>
          </section>

          {/* Registration & Compliance */}
          <section style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            border: `1px solid ${accentColor}`,
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ color: primaryColor, marginBottom: '15px', borderBottom: `2px solid ${accentColor}`, paddingBottom: '10px' }}>B. Registration & Compliance</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '15px' }}>
              <div><strong>License Number:</strong> {selectedVendor.licenseNumber}</div>
              <div><strong>License Expiry:</strong> {selectedVendor.licenseExpiry}</div>
              <div><strong>Drug Permit Number:</strong> {selectedVendor.drugPermitNumber}</div>
              <div><strong>GST Number:</strong> {selectedVendor.gstNumber}</div>
              <div>
                <strong>KYC Status:</strong> 
                <span style={{
                  padding: '4px 12px',
                  borderRadius: '12px',
                  fontSize: '12px',
                  marginLeft: '8px',
                  fontWeight: 'bold',
                  ...getKYCStatusColor(selectedVendor.kycStatus)
                }}>
                  {selectedVendor.kycStatus}
                </span>
              </div>
              <div><strong>Last Audit:</strong> {selectedVendor.compliance.lastAudit}</div>
              <div><strong>Audit Score:</strong> {selectedVendor.compliance.auditScore}%</div>
              <div><strong>Violations:</strong> {selectedVendor.compliance.violations}</div>
              <div><strong>Warnings:</strong> {selectedVendor.compliance.warnings}</div>
              <div>
                <strong>Drug Permit Certificate:</strong> 
                <button 
                  onClick={() => handleViewDocument('drugPermit', selectedVendor)}
                  style={{ 
                    marginLeft: '10px', 
                    padding: '5px 10px', 
                    backgroundColor: primaryColor, 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '3px', 
                    cursor: 'pointer',
                    fontSize: '12px'
                  }}
                >
                  📄 View Document
                </button>
              </div>
              <div>
                <strong>GST Certificate:</strong> 
                <button 
                  onClick={() => handleViewDocument('gstCertificate', selectedVendor)}
                  style={{ 
                    marginLeft: '10px', 
                    padding: '5px 10px', 
                    backgroundColor: primaryColor, 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '3px', 
                    cursor: 'pointer',
                    fontSize: '12px'
                  }}
                >
                  📄 View Document
                </button>
              </div>
              <div>
                <strong>License Copy:</strong> 
                <button 
                  onClick={() => handleViewDocument('licenseCopy', selectedVendor)}
                  style={{ 
                    marginLeft: '10px', 
                    padding: '5px 10px', 
                    backgroundColor: primaryColor, 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '3px', 
                    cursor: 'pointer',
                    fontSize: '12px'
                  }}
                >
                  📄 View Document
                </button>
              </div>
            </div>
          </section>

          {/* Stock & Inventory */}
          <section style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            border: `1px solid ${accentColor}`,
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ color: primaryColor, marginBottom: '15px', borderBottom: `2px solid ${accentColor}`, paddingBottom: '10px' }}>C. Stock & Inventory Snapshot</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
              <div style={{ textAlign: 'center', padding: '20px', backgroundColor: accentColor, borderRadius: '8px' }}>
                <div style={{ fontSize: '28px', fontWeight: 'bold', color: primaryColor }}>{selectedVendor.totalMedicines}</div>
                <div style={{ color: primaryColor, fontWeight: '500' }}>Total Medicines</div>
              </div>
              <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#fff3cd', borderRadius: '8px' }}>
                <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#856404' }}>{selectedVendor.lowStock}</div>
                <div style={{ color: '#856404', fontWeight: '500' }}>Low Stock Alerts</div>
              </div>
              <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#f8d7da', borderRadius: '8px' }}>
                <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#721c24' }}>{selectedVendor.expiredItems}</div>
                <div style={{ color: '#721c24', fontWeight: '500' }}>Expired Items</div>
              </div>
              <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#ffeaa7', borderRadius: '8px' }}>
                <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#e17055' }}>{selectedVendor.outOfStock}</div>
                <div style={{ color: '#e17055', fontWeight: '500' }}>Out of Stock</div>
              </div>
            </div>
          </section>

          {/* Sales Summary */}
          <section style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            border: `1px solid ${accentColor}`,
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ color: primaryColor, marginBottom: '15px', borderBottom: `2px solid ${accentColor}`, paddingBottom: '10px' }}>D. Sales Summary</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginBottom: '20px' }}>
              <div style={{ textAlign: 'center', padding: '15px', backgroundColor: '#e8f5e8', borderRadius: '8px' }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#27ae60' }}>{selectedVendor.totalOrders}</div>
                <div>Total Orders</div>
              </div>
              <div style={{ textAlign: 'center', padding: '15px', backgroundColor: '#fdebd0', borderRadius: '8px' }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#e67e22' }}>{selectedVendor.cancelledOrders}</div>
                <div>Cancelled Orders</div>
              </div>
              <div style={{ textAlign: 'center', padding: '15px', backgroundColor: '#e8f4fd', borderRadius: '8px' }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#2980b9' }}>₹{selectedVendor.averageOrderValue}</div>
                <div>Avg Order Value</div>
              </div>
              <div style={{ textAlign: 'center', padding: '15px', backgroundColor: '#e8f5e8', borderRadius: '8px' }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#27ae60' }}>₹{selectedVendor.monthlyRevenue.toLocaleString()}</div>
                <div>Monthly Revenue</div>
              </div>
              <div style={{ textAlign: 'center', padding: '15px', backgroundColor: '#f0e6ff', borderRadius: '8px' }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#6f42c1' }}>
                  {selectedVendor.salesData.daily} {getTrendIcon(selectedVendor.salesData.trend)}
                </div>
                <div>Daily Sales</div>
              </div>
            </div>
            
            {/* Daily Sales Chart */}
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ color: primaryColor, marginBottom: '15px' }}>Daily Sales Overview</h4>
              <SalesBarChart data={dailySalesData} />
            </div>
          </section>

          {/* Customer Feedback & Ratings */}
          <section style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            border: `1px solid ${accentColor}`,
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ color: primaryColor, marginBottom: '15px', borderBottom: `2px solid ${accentColor}`, paddingBottom: '10px' }}>E. Customer Feedback & Ratings</h3>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', gap: '20px' }}>
              <div style={{ fontSize: '32px', fontWeight: 'bold', color: primaryColor }}>
                {selectedVendor.averageRating}/5
              </div>
              <div style={{ fontSize: '24px', color: '#ffc107' }}>
                {'★'.repeat(Math.floor(selectedVendor.averageRating))}{'☆'.repeat(5-Math.floor(selectedVendor.averageRating))}
              </div>
              <div style={{ color: '#666' }}>
                ({selectedVendor.totalReviews} reviews)
              </div>
            </div>
            <div>
              <h4 style={{ color: primaryColor, marginBottom: '10px' }}>Recent Reviews</h4>
              {selectedVendor.recentReviews.length > 0 ? (
                selectedVendor.recentReviews.map(review => (
                  <div key={review.id} style={{ 
                    padding: '15px', 
                    border: '1px solid #eee', 
                    borderRadius: '5px', 
                    marginBottom: '10px',
                    backgroundColor: '#fafafa'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                      <strong>{review.customer}</strong>
                      <span style={{ color: '#666', fontSize: '12px' }}>{review.date}</span>
                    </div>
                    <div style={{ color: '#ffc107', marginBottom: '5px' }}>
                      {'★'.repeat(review.rating)}{'☆'.repeat(5-review.rating)}
                    </div>
                    <div>{review.comment}</div>
                  </div>
                ))
              ) : (
                <div style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
                  No reviews available
                </div>
              )}
            </div>
          </section>

          {/* Products / Medicine Catalog */}
          <section style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            border: `1px solid ${accentColor}`,
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ color: primaryColor, marginBottom: '15px', borderBottom: `2px solid ${accentColor}`, paddingBottom: '10px' }}>F. Products / Medicine Catalog</h3>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: accentColor }}>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: `2px solid ${primaryColor}` }}>Medicine Name</th>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: `2px solid ${primaryColor}` }}>Brand</th>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: `2px solid ${primaryColor}` }}>Category</th>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: `2px solid ${primaryColor}` }}>Quantity</th>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: `2px solid ${primaryColor}` }}>Price</th>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: `2px solid ${primaryColor}` }}>SKU</th>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: `2px solid ${primaryColor}` }}>Expiry</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedVendor.products.length > 0 ? (
                    selectedVendor.products.map(product => (
                      <tr key={product.id} style={{ borderBottom: '1px solid #eee' }}>
                        <td style={{ padding: '12px' }}>{product.name}</td>
                        <td style={{ padding: '12px' }}>{product.brand}</td>
                        <td style={{ padding: '12px' }}>{product.category}</td>
                        <td style={{ padding: '12px' }}>
                          <span style={{
                            padding: '4px 8px',
                            borderRadius: '10px',
                            fontSize: '12px',
                            fontWeight: 'bold',
                            backgroundColor: product.quantity === 0 ? '#f8d7da' : product.quantity < 10 ? '#fff3cd' : '#d4edda',
                            color: product.quantity === 0 ? '#721c24' : product.quantity < 10 ? '#856404' : '#155724'
                          }}>
                            {product.quantity === 0 ? 'Out of Stock' : product.quantity}
                          </span>
                        </td>
                        <td style={{ padding: '12px' }}>₹{product.price}</td>
                        <td style={{ padding: '12px' }}>{product.sku}</td>
                        <td style={{ padding: '12px' }}>{product.expiry}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
                        No products available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>

          {/* Admin Actions */}
          <section style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            border: `1px solid ${accentColor}`,
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ color: primaryColor, marginBottom: '15px', borderBottom: `2px solid ${accentColor}`, paddingBottom: '10px' }}>G. Admin Actions</h3>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <button 
                onClick={() => handleAdminAction('approve', selectedVendor)}
                style={{ padding: '10px 15px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
              >
                Approve
              </button>
              <button 
                onClick={() => handleAdminAction('reject', selectedVendor)}
                style={{ padding: '10px 15px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
              >
                Reject
              </button>
              <button 
                onClick={() => handleAdminAction('request-resubmit', selectedVendor)}
                style={{ padding: '10px 15px', backgroundColor: '#ffc107', color: 'black', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
              >
                Request Re-submit
              </button>
              <button 
                onClick={() => handleAdminAction('edit-profile', selectedVendor)}
                style={{ padding: '10px 15px', backgroundColor: primaryColor, color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
              >
                Edit Profile
              </button>
              <button 
                onClick={() => handleAdminAction('suspend', selectedVendor)}
                style={{ padding: '10px 15px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
              >
                Suspend Vendor
              </button>
              <button 
                onClick={() => handleAdminAction('blacklist', selectedVendor)}
                style={{ padding: '10px 15px', backgroundColor: '#343a40', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
              >
                Blacklist Vendor
              </button>
              <button 
                onClick={() => handleAdminAction('send-warning', selectedVendor)}
                style={{ padding: '10px 15px', backgroundColor: '#17a2b8', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
              >
                Send Warning
              </button>
              <button 
                onClick={() => handleAdminAction('open-support', selectedVendor)}
                style={{ padding: '10px 15px', backgroundColor: '#6610f2', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
              >
                Open Support
              </button>
            </div>
          </section>
        </div>
      )}

      {!selectedVendor && !showAllVendors && searchQuery && (
        <div style={{ textAlign: 'center', padding: '40px', color: '#666', backgroundColor: 'white', borderRadius: '8px' }}>
          <h3 style={{ color: '#999' }}>No vendor found</h3>
          <p>No vendor found with the search criteria "{searchQuery}"</p>
          <button 
            onClick={handleShowAllVendors}
            style={{
              marginTop: '15px',
              padding: '10px 20px',
              backgroundColor: primaryColor,
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            View All Vendors
          </button>
        </div>
      )}

      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default VendorLookup;