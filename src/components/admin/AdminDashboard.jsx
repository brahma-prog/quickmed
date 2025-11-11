import React, { useState, useEffect } from 'react';

const AdminDashboard = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [kpis, setKpis] = useState({
    totalUsers: 0,
    totalVendors: 0,
    totalDoctors: 0,
    totalDeliveryAgents: 0
  });
  
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);

  // Profile Data
  const [vendorProfile, setVendorProfile] = useState(null);
  const [doctorProfile, setDoctorProfile] = useState(null);
  const [deliveryAgentProfile, setDeliveryAgentProfile] = useState(null);

  // Payouts Data
  const [payouts, setPayouts] = useState([]);
  const [payoutHistory, setPayoutHistory] = useState([]);

  // Settings Data
  const [settings, setSettings] = useState({
    platformName: 'MediQuick',
    theme: 'light',
    timezone: 'IST',
    currency: 'INR',
    twoFactorAuth: true,
    sessionTimeout: 30,
    prescriptionRequired: true,
    deliveryTracking: true,
    autoAssignDelivery: true,
    auditLogging: true,
    dataRetention: 'HIPAA'
  });

  useEffect(() => {
    loadMockData();
  }, []);

  const loadMockData = () => {
    // KPIs
    setKpis({
      totalUsers: 12840,
      totalVendors: 856,
      totalDoctors: 423,
      totalDeliveryAgents: 289
    });

    // Users (Only Customers)
    setUsers([
      { id: 1, name: 'John Doe', type: 'customer', status: 'active', email: 'john@example.com', joinDate: '2024-01-15', phone: '+91 9876543210' },
      { id: 2, name: 'Jane Smith', type: 'customer', status: 'active', email: 'jane@example.com', joinDate: '2024-01-14', phone: '+91 9876543211' },
      { id: 3, name: 'Mike Johnson', type: 'customer', status: 'suspended', email: 'mike@example.com', joinDate: '2024-01-12', phone: '+91 9876543212' },
      { id: 4, name: 'Sarah Wilson', type: 'customer', status: 'active', email: 'sarah@example.com', joinDate: '2024-01-10', phone: '+91 9876543213' }
    ]);

    // Orders
    setOrders([
      { id: 1, customer: 'John Doe', status: 'delivered', amount: '$45.00', date: '2024-01-15', deliveryTime: '30 min' },
      { id: 2, customer: 'Jane Smith', status: 'pending', amount: '$32.50', date: '2024-01-15', deliveryTime: 'Pending' },
      { id: 3, customer: 'Mike Johnson', status: 'cancelled', amount: '$28.75', date: '2024-01-14', deliveryTime: 'N/A' },
      { id: 4, customer: 'Sarah Wilson', status: 'processing', amount: '$67.80', date: '2024-01-15', deliveryTime: '25 min' }
    ]);

    // Payouts
    setPayouts([
      { id: 1, vendorName: 'Medical Store A', amount: '$1,250.00', requestedDate: '2024-01-15', paymentMethod: 'UPI', status: 'pending' },
      { id: 2, vendorName: 'Pharma Plus', amount: '$890.50', requestedDate: '2024-01-14', paymentMethod: 'Bank Transfer', status: 'processing' },
      { id: 3, vendorName: 'City Meds', amount: '$2,340.75', requestedDate: '2024-01-13', paymentMethod: 'Wallet', status: 'hold' }
    ]);

    setPayoutHistory([
      { id: 1, vendorName: 'Health Pharmacy', amount: '$1,800.00', paidDate: '2024-01-10', transactionId: 'TXN001234' },
      { id: 2, vendorName: 'Medi Care', amount: '$950.25', paidDate: '2024-01-08', transactionId: 'TXN001235' }
    ]);

    // Load vendor profile data
    setVendorProfile({
      storeInfo: {
        storeName: 'City Medical Store',
        ownerName: 'Rajesh Kumar',
        phone: '+91 9876543210',
        email: 'citymed@example.com',
        address: '123 Medical Street, Healthcare District, Mumbai, Maharashtra - 400001',
        status: 'Active'
      },
      registration: {
        licenseNumber: 'PHARM123456',
        licenseExpiry: '2025-12-31',
        drugPermitCert: 'Uploaded',
        gstCert: 'Uploaded',
        kycStatus: 'Verified'
      },
      inventory: {
        totalMedicines: 1250,
        lowStock: 45,
        expiredItems: 12,
        outOfStock: 23
      },
      sales: {
        dailySales: '$2,450',
        weeklySales: '$15,670',
        monthlySales: '$58,920',
        totalOrders: 345,
        cancelledOrders: 12,
        averageOrder: '$170.78'
      },
      feedback: {
        averageRating: 4.5,
        reviews: [
          { rating: 5, comment: 'Great service and fast delivery. Medicines were genuine and properly packed.', date: '2024-01-15', customer: 'Rahul Sharma' },
          { rating: 4, comment: 'Good quality medicines and reasonable prices. Delivery was on time.', date: '2024-01-14', customer: 'Priya Patel' },
          { rating: 5, comment: 'Excellent customer service. Helped me find rare medication.', date: '2024-01-13', customer: 'Amit Verma' }
        ]
      },
      products: [
        { name: 'Paracetamol 500mg', brand: 'Cipla', quantity: 150, price: '$0.50', sku: 'PARA001', expiry: '2025-06-30' },
        { name: 'Amoxicillin 250mg', brand: 'Sun Pharma', quantity: 80, price: '$1.20', sku: 'AMOX002', expiry: '2024-12-31' },
        { name: 'Vitamin C 100mg', brand: 'Himalaya', quantity: 200, price: '$0.80', sku: 'VITC003', expiry: '2025-03-15' },
        { name: 'Metformin 500mg', brand: 'Dr. Reddy', quantity: 12, price: '$1.50', sku: 'MET004', expiry: '2024-11-30' }
      ]
    });

    // Load doctor profile data
    setDoctorProfile({
      doctorInfo: {
        name: 'Dr. Priya Sharma',
        specialization: 'Cardiologist',
        phone: '+91 9876543211',
        email: 'drpriya@example.com',
        address: 'Heart Care Hospital, Medical Complex, Delhi - 110001',
        status: 'Active'
      },
      registration: {
        licenseNumber: 'MED123456',
        licenseExpiry: '2025-12-31',
        certification: 'MBBS, MD Cardiology, DM Cardiology',
        registrationId: 'MCI12345',
        kycStatus: 'Verified'
      },
      consultation: {
        totalAppointments: 1250,
        cancelledAppointments: 45,
        avgDuration: '15 min',
        satisfaction: 4.8
      },
      practice: {
        weeklyTrend: [45, 52, 48, 55, 50, 47, 53],
        monthlyTrend: [1200, 1250, 1300, 1280, 1320, 1350, 1250]
      },
      feedback: {
        averageRating: 4.8,
        reviews: [
          { rating: 5, comment: 'Excellent diagnosis and care. Very professional and caring.', date: '2024-01-15', patient: 'Rahul Verma' },
          { rating: 4, comment: 'Very professional and helpful. Explained everything clearly.', date: '2024-01-14', patient: 'Sunita Patel' },
          { rating: 5, comment: 'Best cardiologist in town. Treatment was very effective.', date: '2024-01-13', patient: 'Anil Kumar' }
        ]
      },
      prescriptions: [
        { date: '2024-01-15', patient: 'Rahul Verma', diagnosis: 'Hypertension', prescription: 'Amlodipine 5mg, Telmisartan 40mg' },
        { date: '2024-01-14', patient: 'Sunita Patel', diagnosis: 'Diabetes Type 2', prescription: 'Metformin 500mg, Glimepiride 2mg' },
        { date: '2024-01-13', patient: 'Anil Kumar', diagnosis: 'Coronary Artery Disease', prescription: 'Aspirin 75mg, Atorvastatin 20mg' }
      ]
    });

    // Load delivery agent profile data
    setDeliveryAgentProfile({
      agentInfo: {
        name: 'Amit Singh',
        assignedRegion: 'South Delhi',
        phone: '+91 9876543212',
        email: 'amit.delivery@example.com',
        vehicleType: 'Motorcycle',
        status: 'Active'
      },
      verification: {
        idProof: 'Aadhar Card',
        licenseNumber: 'DL123456789',
        vehicleRegistration: 'DL01AB1234',
        bgStatus: 'Verified'
      },
      performance: {
        totalDeliveries: 345,
        onTimePercentage: 94,
        cancelledDeliveries: 8,
        avgDeliveryTime: '28 min'
      },
      performanceTrend: {
        weeklyTrend: [45, 48, 42, 50, 47, 52, 49],
        monthlyTrend: [320, 345, 330, 350, 340, 355, 345]
      },
      feedback: {
        averageRating: 4.7,
        reviews: [
          { rating: 5, comment: 'Very punctual and polite. Delivered exactly on time.', date: '2024-01-15', customer: 'Neha Gupta' },
          { rating: 4, comment: 'Good service. Package was handled carefully.', date: '2024-01-14', customer: 'Raj Malhotra' },
          { rating: 5, comment: 'Excellent delivery service. Very professional.', date: '2024-01-13', customer: 'Sneha Sharma' }
        ]
      },
      deliveryHistory: [
        { date: '2024-01-15', orderId: 'ORD001234', customer: 'Neha Gupta', status: 'Delivered', time: '30 min' },
        { date: '2024-01-14', orderId: 'ORD001233', customer: 'Raj Malhotra', status: 'Delivered', time: '25 min' },
        { date: '2024-01-13', orderId: 'ORD001232', customer: 'Sneha Sharma', status: 'Delivered', time: '28 min' },
        { date: '2024-01-12', orderId: 'ORD001231', customer: 'Amit Kumar', status: 'Cancelled', time: 'N/A' }
      ]
    });
  };

  const handleVendorAction = (action) => {
    alert(`Vendor ${action} successfully!`);
  };

  const handleDoctorAction = (action) => {
    alert(`Doctor ${action} successfully!`);
  };

  const handleDeliveryAgentAction = (action) => {
    alert(`Delivery Agent ${action} successfully!`);
  };

  const handlePayoutAction = (payoutId, action) => {
    console.log(`Payout ${payoutId}: ${action}`);
    alert(`Payout ${action} successfully!`);
  };

  const handleSettingsUpdate = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  // Dashboard Overview Component
  const DashboardOverview = () => (
    <div>
      <div style={styles.pageHeader}>
        <h1 style={styles.pageTitle}>Admin · Dashboard</h1>
        <div style={styles.breadcrumb}>Dashboard / Overview</div>
      </div>

      {/* KPI Cards */}
      <div style={styles.kpiGrid}>
        <div style={styles.kpiCard}>
          <div style={styles.kpiContent}>
            <h3 style={styles.kpiLabel}>Total Users</h3>
            <p style={styles.kpiNumber}>{kpis.totalUsers.toLocaleString()}</p>
            <span style={styles.kpiStatus}>Active</span>
          </div>
          <div style={styles.kpiIcon}>👥</div>
        </div>
        <div style={styles.kpiCard}>
          <div style={styles.kpiContent}>
            <h3 style={styles.kpiLabel}>Vendors</h3>
            <p style={styles.kpiNumber}>{kpis.totalVendors}</p>
            <span style={styles.kpiStatus}>Registered</span>
          </div>
          <div style={styles.kpiIcon}>🏪</div>
        </div>
        <div style={styles.kpiCard}>
          <div style={styles.kpiContent}>
            <h3 style={styles.kpiLabel}>Doctors</h3>
            <p style={styles.kpiNumber}>{kpis.totalDoctors}</p>
            <span style={styles.kpiStatus}>Verified</span>
          </div>
          <div style={styles.kpiIcon}>👨‍⚕️</div>
        </div>
        <div style={styles.kpiCard}>
          <div style={styles.kpiContent}>
            <h3 style={styles.kpiLabel}>Delivery Agents</h3>
            <p style={styles.kpiNumber}>{kpis.totalDeliveryAgents}</p>
            <span style={styles.kpiStatus}>Active</span>
          </div>
          <div style={styles.kpiIcon}>🚚</div>
        </div>
      </div>

      <div style={styles.dashboardContent}>
        {/* Live Map */}
        <div style={styles.mapSection}>
          <h3 style={styles.sectionTitle}>Live Orders Map</h3>
          <div style={styles.mapContainer}>
            <div style={styles.mapPlaceholder}>
              <p style={styles.mapText}>Map / Live Rider Tracking</p>
              <div style={styles.mapOverlay}>
                <div style={styles.riderMarker}>🚚</div>
                <div style={styles.riderMarker}>🏍️</div>
                <div style={styles.riderMarker}>🚗</div>
              </div>
            </div>
          </div>
        </div>

        {/* Alerts Section */}
        <div style={styles.alertsSection}>
          <h3 style={styles.sectionTitle}>System Alerts & Flags</h3>
          <div style={styles.alertsContainer}>
            <div style={styles.alertItem}>
              <div style={styles.alertIcon}>⚠️</div>
              <div style={styles.alertContent}>
                <strong>3 orders delayed in delivery</strong>
                <p>Requires immediate attention</p>
              </div>
            </div>
            <div style={styles.alertItem}>
              <div style={styles.alertIcon}>🔔</div>
              <div style={styles.alertContent}>
                <strong>5 vendor payouts pending approval</strong>
                <p>Total: $4,481.25</p>
              </div>
            </div>
            <div style={styles.alertItem}>
              <div style={styles.alertIcon}>📊</div>
              <div style={styles.alertContent}>
                <strong>System performance optimal</strong>
                <p>All systems running smoothly</p>
              </div>
            </div>
            <div style={styles.alertItem}>
              <div style={styles.alertIcon}>🔄</div>
              <div style={styles.alertContent}>
                <strong>12 new user registrations today</strong>
                <p>Includes 3 vendors, 2 doctors</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Users Management Component (Only Customers)
  const UsersManagement = () => (
    <div>
      <div style={styles.pageHeader}>
        <h1 style={styles.pageTitle}>Users Management</h1>
        <div style={styles.breadcrumb}>Dashboard / Users Management</div>
      </div>

      {/* Search and Filters */}
      <div style={styles.searchFilters}>
        <input
          type="text"
          placeholder="Search users by name, email, or phone..."
          style={styles.searchInput}
        />
        <select style={styles.filterSelect}>
          <option>All Status</option>
          <option>Active</option>
          <option>Pending</option>
          <option>Suspended</option>
        </select>
        <button style={styles.primaryButton}>
          Search
        </button>
      </div>

      {/* Users Table */}
      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.tableHeaderRow}>
              <th style={styles.tableHeader}>ID</th>
              <th style={styles.tableHeader}>Name</th>
              <th style={styles.tableHeader}>Email</th>
              <th style={styles.tableHeader}>Phone</th>
              <th style={styles.tableHeader}>Status</th>
              <th style={styles.tableHeader}>Join Date</th>
              <th style={styles.tableHeader}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} style={styles.tableRow}>
                <td style={styles.tableCell}>#{user.id}</td>
                <td style={styles.tableCell}>
                  <strong>{user.name}</strong>
                </td>
                <td style={styles.tableCell}>{user.email}</td>
                <td style={styles.tableCell}>{user.phone}</td>
                <td style={styles.tableCell}>
                  <span style={{
                    ...styles.badge,
                    ...getStatusBadgeStyle(user.status)
                  }}>
                    {user.status}
                  </span>
                </td>
                <td style={styles.tableCell}>{user.joinDate}</td>
                <td style={styles.tableCell}>
                  <div style={styles.actionGroup}>
                    <button style={{
                      ...styles.actionButton,
                      background: user.status === 'active' ? '#ff4444' : '#4CAF50'
                    }}>
                      {user.status === 'active' ? 'Suspend' : 'Activate'}
                    </button>
                    <button style={styles.secondaryButton}>
                      View History
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // Vendors Management Component
  const VendorsManagement = () => (
    <div>
      <div style={styles.pageHeader}>
        <h1 style={styles.pageTitle}>Vendors Management</h1>
        <div style={styles.breadcrumb}>Dashboard / Vendors Management</div>
      </div>

      {/* Vendor Profile */}
      {vendorProfile && (
        <div style={styles.profileContainer}>
          <div style={styles.profileHeader}>
            <h3 style={styles.profileTitle}>Vendor Profile - {vendorProfile.storeInfo.storeName}</h3>
            <div style={styles.adminActions}>
              <button onClick={() => handleVendorAction('approved')} style={styles.actionButton}>
                Approve
              </button>
              <button onClick={() => handleVendorAction('rejected')} style={{...styles.actionButton, background: '#ff4444'}}>
                Reject
              </button>
              <button onClick={() => handleVendorAction('suspended')} style={{...styles.actionButton, background: '#FF9800'}}>
                Suspend
              </button>
              <button onClick={() => handleVendorAction('blacklisted')} style={{...styles.actionButton, background: '#333'}}>
                Blacklist
              </button>
              <button onClick={() => handleVendorAction('warning sent')} style={styles.secondaryButton}>
                Send Warning
              </button>
              <button style={styles.secondaryButton}>
                Open Support
              </button>
            </div>
          </div>
          
          {/* Store Information */}
          <div style={styles.profileSection}>
            <h4 style={styles.sectionTitle}>Store Information</h4>
            <div style={styles.infoGrid}>
              <InfoItem label="Store Name" value={vendorProfile.storeInfo.storeName} />
              <InfoItem label="Owner Name" value={vendorProfile.storeInfo.ownerName} />
              <InfoItem label="Phone Number" value={vendorProfile.storeInfo.phone} />
              <InfoItem label="Email Address" value={vendorProfile.storeInfo.email} />
              <InfoItem label="Store Address" value={vendorProfile.storeInfo.address} />
              <InfoItem label="Business Status" value={vendorProfile.storeInfo.status} />
            </div>
          </div>

          {/* Registration & Compliance */}
          <div style={styles.profileSection}>
            <h4 style={styles.sectionTitle}>Registration & Compliance Documents</h4>
            <div style={styles.infoGrid}>
              <InfoItem label="Pharmacy License Number" value={vendorProfile.registration.licenseNumber} />
              <InfoItem label="License Expiry Date" value={vendorProfile.registration.licenseExpiry} />
              <InfoItem label="Drug Permit Certificate" value={vendorProfile.registration.drugPermitCert} />
              <InfoItem label="GST Certificate" value={vendorProfile.registration.gstCert} />
              <InfoItem label="KYC Verification Status" value={vendorProfile.registration.kycStatus} />
            </div>
          </div>

          {/* Stock & Inventory */}
          <div style={styles.profileSection}>
            <h4 style={styles.sectionTitle}>Stock & Inventory Snapshot</h4>
            <div style={styles.statsGrid}>
              <StatCard title="Total Medicines" value={vendorProfile.inventory.totalMedicines} />
              <StatCard title="Low Stock Alerts" value={vendorProfile.inventory.lowStock} type="warning" />
              <StatCard title="Expired Items" value={vendorProfile.inventory.expiredItems} type="error" />
              <StatCard title="Out of Stock" value={vendorProfile.inventory.outOfStock} type="error" />
            </div>
          </div>

          {/* Sales Summary */}
          <div style={styles.profileSection}>
            <h4 style={styles.sectionTitle}>Sales Summary</h4>
            <div style={styles.salesGrid}>
              <StatCard title="Daily Sales" value={vendorProfile.sales.dailySales} />
              <StatCard title="Weekly Sales" value={vendorProfile.sales.weeklySales} />
              <StatCard title="Monthly Sales" value={vendorProfile.sales.monthlySales} />
              <StatCard title="Total Orders" value={vendorProfile.sales.totalOrders} />
              <StatCard title="Cancelled Orders" value={vendorProfile.sales.cancelledOrders} type="warning" />
              <StatCard title="Average Order Value" value={vendorProfile.sales.averageOrder} />
            </div>
            <div style={styles.chartPlaceholder}>
              Sales Trend Chart (Weekly/Monthly)
            </div>
          </div>

          {/* Customer Feedback */}
          <div style={styles.profileSection}>
            <h4 style={styles.sectionTitle}>Customer Feedback & Ratings</h4>
            <div style={styles.ratingSection}>
              <div style={styles.ratingOverview}>
                <span style={styles.averageRating}>{vendorProfile.feedback.averageRating}</span>
                <span style={styles.ratingStars}>★★★★★</span>
                <span style={styles.ratingText}>Average Rating</span>
              </div>
              <div style={styles.reviewsList}>
                <h5 style={styles.reviewsTitle}>Recent Reviews</h5>
                {vendorProfile.feedback.reviews.map((review, index) => (
                  <div key={index} style={styles.reviewItem}>
                    <div style={styles.reviewHeader}>
                      <span style={styles.reviewStars}>{'★'.repeat(review.rating)}{'☆'.repeat(5-review.rating)}</span>
                      <span style={styles.reviewDate}>{review.date} - {review.customer}</span>
                    </div>
                    <p style={styles.reviewComment}>{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Products Catalog */}
          <div style={styles.profileSection}>
            <h4 style={styles.sectionTitle}>Products / Medicine Catalog</h4>
            <div style={styles.tableContainer}>
              <table style={styles.table}>
                <thead>
                  <tr style={styles.tableHeaderRow}>
                    <th style={styles.tableHeader}>Medicine Name</th>
                    <th style={styles.tableHeader}>Brand</th>
                    <th style={styles.tableHeader}>Quantity</th>
                    <th style={styles.tableHeader}>Price</th>
                    <th style={styles.tableHeader}>SKU</th>
                    <th style={styles.tableHeader}>Expiry</th>
                  </tr>
                </thead>
                <tbody>
                  {vendorProfile.products.map((product, index) => (
                    <tr key={index} style={styles.tableRow}>
                      <td style={styles.tableCell}>{product.name}</td>
                      <td style={styles.tableCell}>{product.brand}</td>
                      <td style={styles.tableCell}>{product.quantity}</td>
                      <td style={styles.tableCell}>{product.price}</td>
                      <td style={styles.tableCell}>{product.sku}</td>
                      <td style={styles.tableCell}>{product.expiry}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // Doctors Management Component
  const DoctorsManagement = () => (
    <div>
      <div style={styles.pageHeader}>
        <h1 style={styles.pageTitle}>Doctors Management</h1>
        <div style={styles.breadcrumb}>Dashboard / Doctors Management</div>
      </div>

      {/* Doctor Profile */}
      {doctorProfile && (
        <div style={styles.profileContainer}>
          <div style={styles.profileHeader}>
            <h3 style={styles.profileTitle}>Doctor Profile - {doctorProfile.doctorInfo.name}</h3>
            <div style={styles.adminActions}>
              <button onClick={() => handleDoctorAction('approved')} style={styles.actionButton}>
                Approve
              </button>
              <button onClick={() => handleDoctorAction('rejected')} style={{...styles.actionButton, background: '#ff4444'}}>
                Reject
              </button>
              <button onClick={() => handleDoctorAction('suspended')} style={{...styles.actionButton, background: '#FF9800'}}>
                Suspend
              </button>
              <button style={styles.secondaryButton}>
                Open Support
              </button>
            </div>
          </div>

          {/* Doctor Information */}
          <div style={styles.profileSection}>
            <h4 style={styles.sectionTitle}>Doctor Information</h4>
            <div style={styles.infoGrid}>
              <InfoItem label="Name" value={doctorProfile.doctorInfo.name} />
              <InfoItem label="Specialization" value={doctorProfile.doctorInfo.specialization} />
              <InfoItem label="Phone Number" value={doctorProfile.doctorInfo.phone} />
              <InfoItem label="Email Address" value={doctorProfile.doctorInfo.email} />
              <InfoItem label="Clinic/Hospital Address" value={doctorProfile.doctorInfo.address} />
              <InfoItem label="Status" value={doctorProfile.doctorInfo.status} />
            </div>
          </div>

          {/* Registration & Compliance */}
          <div style={styles.profileSection}>
            <h4 style={styles.sectionTitle}>Registration & Compliance</h4>
            <div style={styles.infoGrid}>
              <InfoItem label="Medical License Number" value={doctorProfile.registration.licenseNumber} />
              <InfoItem label="License Expiry Date" value={doctorProfile.registration.licenseExpiry} />
              <InfoItem label="Professional Certification" value={doctorProfile.registration.certification} />
              <InfoItem label="Registration ID" value={doctorProfile.registration.registrationId} />
              <InfoItem label="KYC Verification Status" value={doctorProfile.registration.kycStatus} />
            </div>
          </div>

          {/* Consultation Metrics */}
          <div style={styles.profileSection}>
            <h4 style={styles.sectionTitle}>Consultation & Appointment Metrics</h4>
            <div style={styles.statsGrid}>
              <StatCard title="Total Appointments" value={doctorProfile.consultation.totalAppointments} />
              <StatCard title="Cancelled Appointments" value={doctorProfile.consultation.cancelledAppointments} type="warning" />
              <StatCard title="Average Duration" value={doctorProfile.consultation.avgDuration} />
              <StatCard title="Satisfaction Rating" value={doctorProfile.consultation.satisfaction} />
            </div>
          </div>

          {/* Practice Summary */}
          <div style={styles.profileSection}>
            <h4 style={styles.sectionTitle}>Practice Summary</h4>
            <div style={styles.chartGrid}>
              <div style={styles.chartPlaceholder}>
                Weekly Appointments Trend
              </div>
              <div style={styles.chartPlaceholder}>
                Monthly Appointments Trend
              </div>
            </div>
          </div>

          {/* Patient Feedback */}
          <div style={styles.profileSection}>
            <h4 style={styles.sectionTitle}>Patient Feedback & Reviews</h4>
            <div style={styles.ratingSection}>
              <div style={styles.ratingOverview}>
                <span style={styles.averageRating}>{doctorProfile.feedback.averageRating}</span>
                <span style={styles.ratingStars}>★★★★★</span>
                <span style={styles.ratingText}>Average Rating</span>
              </div>
              <div style={styles.reviewsList}>
                <h5 style={styles.reviewsTitle}>Recent Feedback</h5>
                {doctorProfile.feedback.reviews.map((review, index) => (
                  <div key={index} style={styles.reviewItem}>
                    <div style={styles.reviewHeader}>
                      <span style={styles.reviewStars}>{'★'.repeat(review.rating)}{'☆'.repeat(5-review.rating)}</span>
                      <span style={styles.reviewDate}>{review.date} - {review.patient}</span>
                    </div>
                    <p style={styles.reviewComment}>{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Prescription Records */}
          <div style={styles.profileSection}>
            <h4 style={styles.sectionTitle}>Prescription Records</h4>
            <div style={styles.tableContainer}>
              <table style={styles.table}>
                <thead>
                  <tr style={styles.tableHeaderRow}>
                    <th style={styles.tableHeader}>Date</th>
                    <th style={styles.tableHeader}>Patient</th>
                    <th style={styles.tableHeader}>Diagnosis</th>
                    <th style={styles.tableHeader}>Prescription</th>
                  </tr>
                </thead>
                <tbody>
                  {doctorProfile.prescriptions.map((prescription, index) => (
                    <tr key={index} style={styles.tableRow}>
                      <td style={styles.tableCell}>{prescription.date}</td>
                      <td style={styles.tableCell}>{prescription.patient}</td>
                      <td style={styles.tableCell}>{prescription.diagnosis}</td>
                      <td style={styles.tableCell}>{prescription.prescription}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // Delivery Agents Management Component
  const DeliveryAgentsManagement = () => (
    <div>
      <div style={styles.pageHeader}>
        <h1 style={styles.pageTitle}>Delivery Agents Management</h1>
        <div style={styles.breadcrumb}>Dashboard / Delivery Agents Management</div>
      </div>

      {/* Delivery Agent Profile */}
      {deliveryAgentProfile && (
        <div style={styles.profileContainer}>
          <div style={styles.profileHeader}>
            <h3 style={styles.profileTitle}>Delivery Agent Profile - {deliveryAgentProfile.agentInfo.name}</h3>
            <div style={styles.adminActions}>
              <button onClick={() => handleDeliveryAgentAction('approved')} style={styles.actionButton}>
                Approve
              </button>
              <button onClick={() => handleDeliveryAgentAction('rejected')} style={{...styles.actionButton, background: '#ff4444'}}>
                Reject
              </button>
              <button onClick={() => handleDeliveryAgentAction('suspended')} style={{...styles.actionButton, background: '#FF9800'}}>
                Suspend
              </button>
              <button style={styles.secondaryButton}>
                Assign Region
              </button>
            </div>
          </div>

          {/* Agent Information */}
          <div style={styles.profileSection}>
            <h4 style={styles.sectionTitle}>Agent Information</h4>
            <div style={styles.infoGrid}>
              <InfoItem label="Name" value={deliveryAgentProfile.agentInfo.name} />
              <InfoItem label="Assigned Region" value={deliveryAgentProfile.agentInfo.assignedRegion} />
              <InfoItem label="Phone Number" value={deliveryAgentProfile.agentInfo.phone} />
              <InfoItem label="Email Address" value={deliveryAgentProfile.agentInfo.email} />
              <InfoItem label="Vehicle Type" value={deliveryAgentProfile.agentInfo.vehicleType} />
              <InfoItem label="Status" value={deliveryAgentProfile.agentInfo.status} />
            </div>
          </div>

          {/* Verification & Documents */}
          <div style={styles.profileSection}>
            <h4 style={styles.sectionTitle}>Verification & Documents</h4>
            <div style={styles.infoGrid}>
              <InfoItem label="ID Proof" value={deliveryAgentProfile.verification.idProof} />
              <InfoItem label="Driver License Number" value={deliveryAgentProfile.verification.licenseNumber} />
              <InfoItem label="Vehicle Registration" value={deliveryAgentProfile.verification.vehicleRegistration} />
              <InfoItem label="Background Verification" value={deliveryAgentProfile.verification.bgStatus} />
            </div>
          </div>

          {/* Performance Metrics */}
          <div style={styles.profileSection}>
            <h4 style={styles.sectionTitle}>Delivery Performance Metrics</h4>
            <div style={styles.statsGrid}>
              <StatCard title="Total Deliveries" value={deliveryAgentProfile.performance.totalDeliveries} />
              <StatCard title="On-time Percentage" value={`${deliveryAgentProfile.performance.onTimePercentage}%`} />
              <StatCard title="Cancelled Deliveries" value={deliveryAgentProfile.performance.cancelledDeliveries} type="warning" />
              <StatCard title="Average Delivery Time" value={deliveryAgentProfile.performance.avgDeliveryTime} />
            </div>
          </div>

          {/* Performance Summary */}
          <div style={styles.profileSection}>
            <h4 style={styles.sectionTitle}>Performance Summary</h4>
            <div style={styles.chartGrid}>
              <div style={styles.chartPlaceholder}>
                Weekly Delivery Trend
              </div>
              <div style={styles.chartPlaceholder}>
                Monthly Performance
              </div>
            </div>
          </div>

          {/* Customer Feedback */}
          <div style={styles.profileSection}>
            <h4 style={styles.sectionTitle}>Customer Feedback & Ratings</h4>
            <div style={styles.ratingSection}>
              <div style={styles.ratingOverview}>
                <span style={styles.averageRating}>{deliveryAgentProfile.feedback.averageRating}</span>
                <span style={styles.ratingStars}>★★★★★</span>
                <span style={styles.ratingText}>Average Rating</span>
              </div>
              <div style={styles.reviewsList}>
                <h5 style={styles.reviewsTitle}>Recent Reviews</h5>
                {deliveryAgentProfile.feedback.reviews.map((review, index) => (
                  <div key={index} style={styles.reviewItem}>
                    <div style={styles.reviewHeader}>
                      <span style={styles.reviewStars}>{'★'.repeat(review.rating)}{'☆'.repeat(5-review.rating)}</span>
                      <span style={styles.reviewDate}>{review.date} - {review.customer}</span>
                    </div>
                    <p style={styles.reviewComment}>{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Delivery History */}
          <div style={styles.profileSection}>
            <h4 style={styles.sectionTitle}>Delivery History</h4>
            <div style={styles.tableContainer}>
              <table style={styles.table}>
                <thead>
                  <tr style={styles.tableHeaderRow}>
                    <th style={styles.tableHeader}>Date</th>
                    <th style={styles.tableHeader}>Order ID</th>
                    <th style={styles.tableHeader}>Customer</th>
                    <th style={styles.tableHeader}>Status</th>
                    <th style={styles.tableHeader}>Time</th>
                  </tr>
                </thead>
                <tbody>
                  {deliveryAgentProfile.deliveryHistory.map((delivery, index) => (
                    <tr key={index} style={styles.tableRow}>
                      <td style={styles.tableCell}>{delivery.date}</td>
                      <td style={styles.tableCell}>{delivery.orderId}</td>
                      <td style={styles.tableCell}>{delivery.customer}</td>
                      <td style={styles.tableCell}>
                        <span style={{
                          ...styles.badge,
                          ...getDeliveryStatusBadgeStyle(delivery.status)
                        }}>
                          {delivery.status}
                        </span>
                      </td>
                      <td style={styles.tableCell}>{delivery.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // Orders Monitoring Component
  const OrdersMonitoring = () => (
    <div>
      <div style={styles.pageHeader}>
        <h1 style={styles.pageTitle}>Orders & Deliveries</h1>
        <div style={styles.breadcrumb}>Dashboard / Orders & Deliveries</div>
      </div>

      {/* Real-time Tracking Section */}
      <div style={styles.trackingSection}>
        <h3 style={styles.sectionTitle}>Live Delivery Tracking</h3>
        <div style={styles.liveMap}>
          <div style={styles.mapContainerLarge}>
            <div style={styles.mapPlaceholderLarge}>
              <p style={styles.mapText}>Live Rider Tracking Map</p>
              <div style={styles.activeRiders}>
                <div style={styles.riderInfo}>
                  <span style={styles.riderIcon}>🚚</span>
                  <span>Rider #123 - 2 deliveries pending</span>
                </div>
                <div style={styles.riderInfo}>
                  <span style={styles.riderIcon}>🏍️</span>
                  <span>Rider #456 - On route to customer</span>
                </div>
                <div style={styles.riderInfo}>
                  <span style={styles.riderIcon}>🚗</span>
                  <span>Rider #789 - Delivery completed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Order Status Summary */}
      <div style={styles.statusSummary}>
        {[
          { status: 'Pending', count: orders.filter(o => o.status === 'pending').length, color: '#FF9800' },
          { status: 'Processing', count: orders.filter(o => o.status === 'processing').length, color: '#2196F3' },
          { status: 'Delivered', count: orders.filter(o => o.status === 'delivered').length, color: '#4CAF50' },
          { status: 'Cancelled', count: orders.filter(o => o.status === 'cancelled').length, color: '#f44336' },
          { status: 'Delayed', count: 3, color: '#FF5722' }
        ].map(item => (
          <div key={item.status} style={styles.statusCard}>
            <h4 style={{ margin: '0 0 5px 0', color: '#333' }}>{item.status}</h4>
            <p style={{...styles.statusNumber, color: item.color}}>
              {item.count}
            </p>
          </div>
        ))}
      </div>

      {/* Orders Table */}
      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.tableHeaderRow}>
              <th style={styles.tableHeader}>Order ID</th>
              <th style={styles.tableHeader}>Customer</th>
              <th style={styles.tableHeader}>Amount</th>
              <th style={styles.tableHeader}>Status</th>
              <th style={styles.tableHeader}>Date</th>
              <th style={styles.tableHeader}>Delivery Time</th>
              <th style={styles.tableHeader}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id} style={styles.tableRow}>
                <td style={styles.tableCell}>#{order.id}</td>
                <td style={styles.tableCell}>{order.customer}</td>
                <td style={styles.tableCell}>{order.amount}</td>
                <td style={styles.tableCell}>
                  <span style={{
                    ...styles.badge,
                    ...getOrderStatusBadgeStyle(order.status)
                  }}>
                    {order.status}
                  </span>
                </td>
                <td style={styles.tableCell}>{order.date}</td>
                <td style={styles.tableCell}>{order.deliveryTime}</td>
                <td style={styles.tableCell}>
                  <button style={styles.actionButton}>
                    Track Delivery
                  </button>
                  {order.status === 'delayed' && (
                    <button style={{...styles.actionButton, background: '#FF5722', marginLeft: '8px'}}>
                      Resolve Issue
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // Analytics & Payouts Component
  const AnalyticsPayouts = () => (
    <div>
      <div style={styles.pageHeader}>
        <h1 style={styles.pageTitle}>Analytics & Payouts</h1>
        <div style={styles.breadcrumb}>Dashboard / Analytics & Payouts</div>
      </div>

      {/* Payouts Summary */}
      <div style={styles.analyticsGrid}>
        <div style={styles.analyticsCard}>
          <h4>Pending Payouts</h4>
          <p style={styles.analyticsNumber}>$4,481.25</p>
          <span style={styles.analyticsTrend}>3 vendors awaiting</span>
        </div>
        <div style={styles.analyticsCard}>
          <h4>Completed Payouts</h4>
          <p style={styles.analyticsNumber}>$2,750.25</p>
          <span style={styles.analyticsTrend}>This month</span>
        </div>
        <div style={styles.analyticsCard}>
          <h4>Total Vendors</h4>
          <p style={styles.analyticsNumber}>856</p>
          <span style={styles.analyticsTrend}>Active vendors</span>
        </div>
        <div style={styles.analyticsCard}>
          <h4>Revenue</h4>
          <p style={styles.analyticsNumber}>$75,430.00</p>
          <span style={styles.analyticsTrend}>This month</span>
        </div>
      </div>

      {/* Payouts Processing */}
      <div style={styles.payoutsSection}>
        <h3 style={styles.sectionTitle}>Payouts Processing Queue</h3>
        
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeaderRow}>
                <th style={styles.tableHeader}>Vendor Name</th>
                <th style={styles.tableHeader}>Amount</th>
                <th style={styles.tableHeader}>Requested Date</th>
                <th style={styles.tableHeader}>Payment Method</th>
                <th style={styles.tableHeader}>Status</th>
                <th style={styles.tableHeader}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {payouts.map(payout => (
                <tr key={payout.id} style={styles.tableRow}>
                  <td style={styles.tableCell}>{payout.vendorName}</td>
                  <td style={styles.tableCell}>{payout.amount}</td>
                  <td style={styles.tableCell}>{payout.requestedDate}</td>
                  <td style={styles.tableCell}>{payout.paymentMethod}</td>
                  <td style={styles.tableCell}>
                    <span style={{
                      ...styles.badge,
                      ...getPayoutStatusBadgeStyle(payout.status)
                    }}>
                      {payout.status}
                    </span>
                  </td>
                  <td style={styles.tableCell}>
                    <div style={styles.actionGroup}>
                      <button 
                        onClick={() => handlePayoutAction(payout.id, 'approve')}
                        style={styles.actionButton}
                      >
                        Approve
                      </button>
                      <button 
                        onClick={() => handlePayoutAction(payout.id, 'hold')}
                        style={{...styles.actionButton, background: '#FF9800'}}
                      >
                        Hold
                      </button>
                      <button 
                        onClick={() => handlePayoutAction(payout.id, 'reject')}
                        style={{...styles.actionButton, background: '#ff4444'}}
                      >
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payout History */}
      <div style={styles.payoutsSection}>
        <h3 style={styles.sectionTitle}>Completed Payout History</h3>
        
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeaderRow}>
                <th style={styles.tableHeader}>Vendor Name</th>
                <th style={styles.tableHeader}>Paid Amount</th>
                <th style={styles.tableHeader}>Paid Date</th>
                <th style={styles.tableHeader}>Transaction ID</th>
              </tr>
            </thead>
            <tbody>
              {payoutHistory.map(payout => (
                <tr key={payout.id} style={styles.tableRow}>
                  <td style={styles.tableCell}>{payout.vendorName}</td>
                  <td style={styles.tableCell}>{payout.amount}</td>
                  <td style={styles.tableCell}>{payout.paidDate}</td>
                  <td style={styles.tableCell}>{payout.transactionId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Export Section */}
      <div style={styles.saveSection}>
        <button style={styles.saveButton}>
          Export Payout Summary (Excel/PDF)
        </button>
      </div>
    </div>
  );

  // Settings Component
  const Settings = () => (
    <div>
      <div style={styles.pageHeader}>
        <h1 style={styles.pageTitle}>Settings</h1>
        <div style={styles.breadcrumb}>Dashboard / Settings</div>
      </div>

      {/* System Configuration */}
      <div style={styles.settingsSection}>
        <h3 style={styles.sectionTitle}>System Configuration</h3>
        <div style={styles.settingsGrid}>
          <div style={styles.settingItem}>
            <label style={styles.settingLabel}>Platform Name</label>
            <input
              type="text"
              value={settings.platformName}
              onChange={(e) => handleSettingsUpdate('platformName', e.target.value)}
              style={styles.settingInput}
            />
          </div>
          <div style={styles.settingItem}>
            <label style={styles.settingLabel}>Timezone</label>
            <select
              value={settings.timezone}
              onChange={(e) => handleSettingsUpdate('timezone', e.target.value)}
              style={styles.settingInput}
            >
              <option value="IST">IST</option>
              <option value="UTC">UTC</option>
              <option value="PST">PST</option>
            </select>
          </div>
          <div style={styles.settingItem}>
            <label style={styles.settingLabel}>Currency</label>
            <select
              value={settings.currency}
              onChange={(e) => handleSettingsUpdate('currency', e.target.value)}
              style={styles.settingInput}
            >
              <option value="INR">INR</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
            </select>
          </div>
          <div style={styles.settingItem}>
            <label style={styles.settingLabel}>Session Timeout (minutes)</label>
            <input
              type="number"
              value={settings.sessionTimeout}
              onChange={(e) => handleSettingsUpdate('sessionTimeout', parseInt(e.target.value))}
              style={styles.settingInput}
            />
          </div>
          <div style={styles.settingItem}>
            <label style={styles.settingLabel}>Data Retention Policy</label>
            <select
              value={settings.dataRetention}
              onChange={(e) => handleSettingsUpdate('dataRetention', e.target.value)}
              style={styles.settingInput}
            >
              <option value="HIPAA">HIPAA Compliant</option>
              <option value="GDPR">GDPR Compliant</option>
              <option value="Standard">Standard</option>
            </select>
          </div>
        </div>
      </div>

      {/* Feature Toggles */}
      <div style={styles.settingsSection}>
        <h3 style={styles.sectionTitle}>Feature Configuration</h3>
        <div style={styles.toggleGrid}>
          <ToggleItem
            label="Prescription Upload Requirement"
            checked={settings.prescriptionRequired}
            onChange={(checked) => handleSettingsUpdate('prescriptionRequired', checked)}
          />
          <ToggleItem
            label="Delivery Tracking"
            checked={settings.deliveryTracking}
            onChange={(checked) => handleSettingsUpdate('deliveryTracking', checked)}
          />
          <ToggleItem
            label="Auto-Assign Delivery"
            checked={settings.autoAssignDelivery}
            onChange={(checked) => handleSettingsUpdate('autoAssignDelivery', checked)}
          />
          <ToggleItem
            label="Two-Factor Authentication"
            checked={settings.twoFactorAuth}
            onChange={(checked) => handleSettingsUpdate('twoFactorAuth', checked)}
          />
          <ToggleItem
            label="Audit Logging"
            checked={settings.auditLogging}
            onChange={(checked) => handleSettingsUpdate('auditLogging', checked)}
          />
        </div>
      </div>

      <div style={styles.saveSection}>
        <button style={styles.saveButton}>
          Save Settings
        </button>
      </div>
    </div>
  );

  // Reusable Components
  const InfoItem = ({ label, value }) => (
    <div style={styles.infoItem}>
      <strong>{label}:</strong> {value}
    </div>
  );

  const StatCard = ({ title, value, type = 'normal' }) => (
    <div style={styles.statCard}>
      <h5 style={styles.statTitle}>{title}</h5>
      <p style={{
        ...styles.statNumber,
        color: type === 'error' ? '#ff4444' : 
              type === 'warning' ? '#FF9800' : '#7C2A62'
      }}>
        {value}
      </p>
    </div>
  );

  const ToggleItem = ({ label, checked, onChange }) => (
    <div style={styles.toggleItem}>
      <label style={styles.toggleLabel}>
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          style={styles.toggleInput}
        />
        {label}
      </label>
    </div>
  );

  // Helper functions for badge styles
  const getStatusBadgeStyle = (status) => {
    const styles = {
      active: { background: '#E8F5E8', color: '#388E3C' },
      pending: { background: '#FFF3E0', color: '#F57C00' },
      suspended: { background: '#FFEBEE', color: '#D32F2F' }
    };
    return styles[status] || styles.pending;
  };

  const getOrderStatusBadgeStyle = (status) => {
    const styles = {
      delivered: { background: '#E8F5E8', color: '#388E3C' },
      pending: { background: '#FFF3E0', color: '#F57C00' },
      processing: { background: '#E3F2FD', color: '#1976D2' },
      cancelled: { background: '#FFEBEE', color: '#D32F2F' },
      delayed: { background: '#FFE0B2', color: '#E65100' }
    };
    return styles[status] || styles.pending;
  };

  const getPayoutStatusBadgeStyle = (status) => {
    const styles = {
      pending: { background: '#FFF3E0', color: '#F57C00' },
      processing: { background: '#E3F2FD', color: '#1976D2' },
      hold: { background: '#FFEBEE', color: '#D32F2F' },
      completed: { background: '#E8F5E8', color: '#388E3C' }
    };
    return styles[status] || styles.pending;
  };

  const getDeliveryStatusBadgeStyle = (status) => {
    const styles = {
      Delivered: { background: '#E8F5E8', color: '#388E3C' },
      Cancelled: { background: '#FFEBEE', color: '#D32F2F' }
    };
    return styles[status] || { background: '#FFF3E0', color: '#F57C00' };
  };

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <div style={{
        ...styles.sidebar,
        width: sidebarOpen ? '250px' : '80px'
      }}>
        <div style={styles.sidebarHeader}>
          {sidebarOpen && <h2 style={styles.sidebarTitle}>MediQuick Admin</h2>}
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={styles.sidebarToggle}
          >
            {sidebarOpen ? '◀' : '▶'}
          </button>
        </div>
        
        <nav style={styles.sidebarNav}>
          {[
            { id: 'dashboard', label: 'Dashboard', icon: '📊' },
            { id: 'users', label: 'Users', icon: '👥' },
            { id: 'vendors', label: 'Vendors', icon: '🏪' },
            { id: 'doctors', label: 'Doctors', icon: '👨‍⚕️' },
            { id: 'delivery', label: 'Delivery Agents', icon: '🚚' },
            { id: 'orders', label: 'Orders', icon: '📦' },
            { id: 'analytics', label: 'Analytics & Payouts', icon: '💰' },
            { id: 'settings', label: 'Settings', icon: '⚙️' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                ...styles.sidebarButton,
                ...(activeTab === tab.id ? styles.sidebarButtonActive : {})
              }}
            >
              <span style={styles.sidebarIcon}>{tab.icon}</span>
              {sidebarOpen && <span style={styles.sidebarLabel}>{tab.label}</span>}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div style={{
        ...styles.mainContent,
        marginLeft: sidebarOpen ? '250px' : '80px'
      }}>
        {/* Header */}
        <header style={styles.header}>
          <div style={styles.headerLeft}>
            <h1 style={styles.headerTitle}>
              {activeTab === 'dashboard' && 'Admin · Dashboard'}
              {activeTab === 'users' && 'Users Management'}
              {activeTab === 'vendors' && 'Vendors Management'}
              {activeTab === 'doctors' && 'Doctors Management'}
              {activeTab === 'delivery' && 'Delivery Agents Management'}
              {activeTab === 'orders' && 'Orders & Deliveries'}
              {activeTab === 'analytics' && 'Analytics & Payouts'}
              {activeTab === 'settings' && 'Settings'}
            </h1>
          </div>
          <div style={styles.headerRight}>
            <span style={styles.userWelcome}>Welcome, {user?.name}</span>
            <button onClick={onLogout} style={styles.logoutButton}>
              Logout
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main style={styles.main}>
          {activeTab === 'dashboard' && <DashboardOverview />}
          {activeTab === 'users' && <UsersManagement />}
          {activeTab === 'vendors' && <VendorsManagement />}
          {activeTab === 'doctors' && <DoctorsManagement />}
          {activeTab === 'delivery' && <DeliveryAgentsManagement />}
          {activeTab === 'orders' && <OrdersMonitoring />}
          {activeTab === 'analytics' && <AnalyticsPayouts />}
          {activeTab === 'settings' && <Settings />}
        </main>
      </div>
    </div>
  );
};

// Styles (same as before, no changes needed)
const styles = {
  container: {
    display: 'flex',
    minHeight: '100vh',
    background: '#f8f9fa',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  sidebar: {
    position: 'fixed',
    left: 0,
    top: 0,
    height: '100vh',
    background: 'linear-gradient(180deg, #7C2A62 0%, #9C3A7A 100%)',
    color: 'white',
    transition: 'width 0.3s ease',
    zIndex: 1000,
    overflow: 'hidden',
  },
  sidebarHeader: {
    padding: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: '1px solid rgba(255,255,255,0.1)',
  },
  sidebarTitle: {
    margin: 0,
    fontSize: '18px',
    fontWeight: '600',
  },
  sidebarToggle: {
    background: 'rgba(255,255,255,0.1)',
    border: 'none',
    color: 'white',
    padding: '5px 10px',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  sidebarNav: {
    padding: '10px 0',
  },
  sidebarButton: {
    width: '100%',
    padding: '15px 20px',
    background: 'transparent',
    border: 'none',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontSize: '14px',
  },
  sidebarButtonActive: {
    background: 'rgba(255,255,255,0.15)',
    borderRight: '3px solid #F7D9EB',
  },
  sidebarIcon: {
    fontSize: '16px',
    minWidth: '20px',
  },
  sidebarLabel: {
    whiteSpace: 'nowrap',
  },
  mainContent: {
    flex: 1,
    transition: 'margin-left 0.3s ease',
    minWidth: 0,
  },
  header: {
    background: 'white',
    padding: '20px 30px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    borderBottom: '1px solid #e1e1e1',
  },
  headerTitle: {
    margin: 0,
    color: '#7C2A62',
    fontSize: '24px',
    fontWeight: '600',
  },
  headerRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
  },
  userWelcome: {
    color: '#666',
    fontSize: '14px',
  },
  logoutButton: {
    padding: '8px 16px',
    background: '#7C2A62',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  main: {
    padding: '30px',
    maxWidth: '1200px',
  },
  pageHeader: {
    marginBottom: '30px',
  },
  pageTitle: {
    color: '#7C2A62',
    margin: '0 0 5px 0',
    fontSize: '28px',
    fontWeight: '600',
  },
  breadcrumb: {
    color: '#666',
    fontSize: '14px',
  },
  kpiGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '20px',
    marginBottom: '30px',
  },
  kpiCard: {
    background: 'white',
    padding: '25px',
    borderRadius: '12px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderLeft: '4px solid #7C2A62',
  },
  kpiContent: {
    flex: 1,
  },
  kpiLabel: {
    margin: '0 0 8px 0',
    color: '#666',
    fontSize: '14px',
    fontWeight: '500',
  },
  kpiNumber: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#7C2A62',
    margin: '0 0 5px 0',
  },
  kpiStatus: {
    color: '#4CAF50',
    fontSize: '12px',
    fontWeight: '500',
  },
  kpiIcon: {
    fontSize: '40px',
    opacity: 0.7,
  },
  dashboardContent: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: '30px',
  },
  mapSection: {
    background: 'white',
    padding: '25px',
    borderRadius: '12px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  },
  sectionTitle: {
    color: '#7C2A62',
    margin: '0 0 20px 0',
    fontSize: '18px',
    fontWeight: '600',
  },
  mapContainer: {
    background: '#f8f9fa',
    borderRadius: '8px',
    overflow: 'hidden',
  },
  mapPlaceholder: {
    height: '400px',
    background: 'linear-gradient(135deg, #F7D9EB 0%, #E8C3D5 100%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#7C2A62',
    position: 'relative',
  },
  mapText: {
    margin: '0 0 20px 0',
    fontSize: '16px',
    fontWeight: '500',
  },
  mapOverlay: {
    display: 'flex',
    gap: '20px',
  },
  riderMarker: {
    fontSize: '24px',
    background: 'rgba(255,255,255,0.9)',
    padding: '10px',
    borderRadius: '50%',
    boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
  },
  alertsSection: {
    background: 'white',
    padding: '25px',
    borderRadius: '12px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  },
  alertsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  alertItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
    padding: '15px',
    background: '#FFF9E6',
    borderRadius: '8px',
    borderLeft: '4px solid #FFD700',
  },
  alertIcon: {
    fontSize: '18px',
  },
  alertContent: {
    flex: 1,
  },
  searchFilters: {
    display: 'flex',
    gap: '15px',
    marginBottom: '25px',
    flexWrap: 'wrap',
  },
  searchInput: {
    padding: '12px 15px',
    border: '2px solid #e1e1e1',
    borderRadius: '8px',
    flex: '1',
    minWidth: '250px',
    fontSize: '14px',
  },
  filterSelect: {
    padding: '12px 15px',
    border: '2px solid #e1e1e1',
    borderRadius: '8px',
    background: 'white',
    fontSize: '14px',
    minWidth: '150px',
  },
  primaryButton: {
    padding: '12px 25px',
    backgroundColor: '#7C2A62',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    color: 'white',
    fontWeight: '500',
    fontSize: '14px',
  },
  secondaryButton: {
    padding: '8px 16px',
    backgroundColor: 'transparent',
    border: '1px solid #7C2A62',
    borderRadius: '6px',
    cursor: 'pointer',
    color: '#7C2A62',
    fontWeight: '500',
    fontSize: '12px',
  },
  actionButton: {
    padding: '8px 16px',
    background: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: '500',
  },
  actionGroup: {
    display: 'flex',
    gap: '8px',
  },
  tableContainer: {
    background: 'white',
    borderRadius: '12px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    overflow: 'hidden',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  tableHeaderRow: {
    background: '#7C2A62',
    color: 'white',
  },
  tableHeader: {
    padding: '15px 20px',
    textAlign: 'left',
    fontWeight: '600',
    fontSize: '14px',
  },
  tableRow: {
    borderBottom: '1px solid #f0f0f0',
  },
  tableCell: {
    padding: '15px 20px',
    fontSize: '14px',
  },
  badge: {
    padding: '6px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '500',
    display: 'inline-block',
  },
  profileContainer: {
    background: 'white',
    borderRadius: '12px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    padding: '30px',
  },
  profileHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '25px',
    paddingBottom: '20px',
    borderBottom: '1px solid #f0f0f0',
  },
  profileTitle: {
    color: '#7C2A62',
    margin: 0,
    fontSize: '24px',
    fontWeight: '600',
  },
  adminActions: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
  },
  profileSection: {
    marginBottom: '30px',
    paddingBottom: '20px',
    borderBottom: '1px solid #f0f0f0',
  },
  infoGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '15px',
  },
  infoItem: {
    padding: '10px 0',
    fontSize: '14px',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '15px',
  },
  statCard: {
    background: '#f8f9fa',
    padding: '20px',
    borderRadius: '8px',
    textAlign: 'center',
  },
  statTitle: {
    margin: '0 0 10px 0',
    color: '#666',
    fontSize: '14px',
    fontWeight: '500',
  },
  statNumber: {
    fontSize: '24px',
    fontWeight: 'bold',
    margin: 0,
  },
  salesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: '15px',
    marginBottom: '20px',
  },
  chartPlaceholder: {
    height: '200px',
    background: '#f8f9fa',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#666',
    fontSize: '14px',
    border: '2px dashed #e1e1e1',
  },
  chartGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '20px',
  },
  ratingSection: {
    display: 'grid',
    gridTemplateColumns: '200px 1fr',
    gap: '30px',
  },
  ratingOverview: {
    textAlign: 'center',
    padding: '20px',
    background: '#f8f9fa',
    borderRadius: '8px',
  },
  averageRating: {
    fontSize: '36px',
    fontWeight: 'bold',
    color: '#7C2A62',
    display: 'block',
  },
  ratingStars: {
    fontSize: '20px',
    color: '#FFD700',
    display: 'block',
    margin: '10px 0',
  },
  ratingText: {
    fontSize: '14px',
    color: '#666',
  },
  reviewsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  reviewsTitle: {
    margin: '0 0 15px 0',
    color: '#7C2A62',
    fontSize: '16px',
    fontWeight: '600',
  },
  reviewItem: {
    padding: '15px',
    background: '#f8f9fa',
    borderRadius: '8px',
  },
  reviewHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px',
  },
  reviewStars: {
    color: '#FFD700',
    fontSize: '14px',
  },
  reviewDate: {
    fontSize: '12px',
    color: '#666',
  },
  reviewComment: {
    margin: 0,
    fontSize: '14px',
    color: '#333',
  },
  statusSummary: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '20px',
    marginBottom: '30px',
  },
  statusCard: {
    background: 'white',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    textAlign: 'center',
  },
  statusNumber: {
    fontSize: '28px',
    fontWeight: 'bold',
    margin: 0,
  },
  trackingSection: {
    background: 'white',
    padding: '25px',
    borderRadius: '12px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    marginBottom: '30px',
  },
  liveMap: {
    marginTop: '20px',
  },
  mapContainerLarge: {
    background: '#f8f9fa',
    borderRadius: '8px',
    overflow: 'hidden',
  },
  mapPlaceholderLarge: {
    height: '300px',
    background: 'linear-gradient(135deg, #F7D9EB 0%, #E8C3D5 100%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#7C2A62',
    position: 'relative',
  },
  activeRiders: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginTop: '20px',
  },
  riderInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '10px 15px',
    background: 'rgba(255,255,255,0.9)',
    borderRadius: '6px',
    fontSize: '14px',
  },
  riderIcon: {
    fontSize: '20px',
  },
  analyticsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
    marginBottom: '30px',
  },
  analyticsCard: {
    background: 'white',
    padding: '25px',
    borderRadius: '12px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    textAlign: 'center',
  },
  analyticsNumber: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#7C2A62',
    margin: '10px 0 5px 0',
  },
  analyticsTrend: {
    fontSize: '12px',
    color: '#4CAF50',
    fontWeight: '500',
  },
  payoutsSection: {
    background: 'white',
    padding: '25px',
    borderRadius: '12px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    marginBottom: '20px',
  },
  settingsSection: {
    background: 'white',
    padding: '25px',
    borderRadius: '12px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    marginBottom: '20px',
  },
  settingsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '20px',
  },
  settingItem: {
    display: 'flex',
    flexDirection: 'column',
  },
  settingLabel: {
    marginBottom: '8px',
    fontWeight: '500',
    color: '#333',
    fontSize: '14px',
  },
  settingInput: {
    padding: '12px 15px',
    border: '2px solid #e1e1e1',
    borderRadius: '8px',
    fontSize: '14px',
  },
  toggleGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '15px',
  },
  toggleItem: {
    display: 'flex',
    alignItems: 'center',
  },
  toggleLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  toggleInput: {
    transform: 'scale(1.2)',
  },
  saveSection: {
    textAlign: 'center',
    marginTop: '30px',
  },
  saveButton: {
    padding: '12px 30px',
    background: '#7C2A62',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '500',
  }
};

export default AdminDashboard;