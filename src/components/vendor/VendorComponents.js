import React from 'react';
import { styles } from './VendorStyles';

const SearchBar = ({ searchTerm, onSearchChange, onClearSearch, filteredStock }) => {
  return (
    <div style={styles.searchContainer}>
      <div style={styles.searchInputContainer}>
        <input
          type="text"
          style={styles.searchInput}
          placeholder="Search medicines by name, category, or batch number..."
          value={searchTerm}
          onChange={onSearchChange}
        />
        {searchTerm && (
          <button 
            style={styles.clearSearchButton}
            onClick={onClearSearch}
            title="Clear search"
          >
            ✕
          </button>
        )}
      </div>
      {searchTerm && (
        <div style={styles.searchResultsInfo}>
          Found {filteredStock.length} medicine(s) matching "{searchTerm}"
        </div>
      )}
    </div>
  );
};

const VendorComponents = ({
  activePage,
  userProfile,
  stockFilter,
  orderFilter,
  selectedOrder,
  selectedPrescription,
  analyticsPeriod,
  stock,
  orders,
  prescriptions,
  searchTerm,
  filteredStock,
  analyticsData,
  navigationItems,
  stockFilters,
  orderTabs,
  formatIndianCurrency,
  getCurrentGreeting,
  isLowStock,
  isExpiringSoon,
  isExpired,
  handleSearchChange,
  handleClearSearch,
  handleEditMedicine,
  setSelectedOrder,
  setSelectedPrescription,
  markOrderReady,
  markOrderPicked,
  printLabel,
  cancelOrder,
  approvePrescription,
  rejectPrescription,
  messageDoctor,
  setShowAddMedicineModal,
  setShowNotificationsBellModal,
  setShowNotificationsModal,
  setShowProfileModal,
  notifications,
  setStockFilter,
  setOrderFilter
}) => {
  const renderStockManagement = () => (
    <div style={styles.mainContent}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.greeting}>{getCurrentGreeting()}, {userProfile.fullName?.split(' ')[0] || 'User'}</h1>
          <p style={styles.subtitle}>Manage your medicine inventory and stock levels</p>
        </div>
        <div style={styles.headerActions}>
          <button 
            style={styles.notificationBell}
            onClick={() => setShowNotificationsBellModal(true)}
          >
            🔔
            {notifications.length > 0 && (
              <span style={styles.notificationBadge}>
                {notifications.length}
              </span>
            )}
          </button>
          <button 
            style={styles.primaryButton}
            onClick={() => setShowAddMedicineModal(true)}
          >
            + Add Medicine
          </button>
        </div>
      </div>

      <div style={styles.filterTabs}>
        {stockFilters.map(filter => (
          <button
            key={filter.id}
            style={{
              ...styles.filterTab,
              ...(stockFilter === filter.id ? styles.filterTabActive : {})
            }}
            onClick={() => setStockFilter(filter.id)}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <div style={{...styles.statIcon, backgroundColor: '#F7D9EB'}}>📦</div>
          <div style={styles.statContent}>
            <h3 style={styles.statNumber}>{stock.length}</h3>
            <p style={styles.statLabel}>Total Medicines</p>
          </div>
        </div>

        <div style={styles.statCard}>
          <div style={{...styles.statIcon, backgroundColor: '#FFE4E6'}}>⚠️</div>
          <div style={styles.statContent}>
            <h3 style={styles.statNumber}>
              {stock.filter(isLowStock).length}
            </h3>
            <p style={styles.statLabel}>Low Stock</p>
          </div>
        </div>

        <div style={styles.statCard}>
          <div style={{...styles.statIcon, backgroundColor: '#FEF3C7'}}>📅</div>
          <div style={styles.statContent}>
            <h3 style={styles.statNumber}>
              {stock.filter(isExpiringSoon).length}
            </h3>
            <p style={styles.statLabel}>Expiring Soon</p>
          </div>
        </div>

        <div style={styles.statCard}>
          <div style={{...styles.statIcon, backgroundColor: '#D1FAE5'}}>🩺</div>
          <div style={styles.statContent}>
            <h3 style={styles.statNumber}>
              {stock.filter(m => m.prescriptionRequired).length}
            </h3>
            <p style={styles.statLabel}>Prescription Only</p>
          </div>
        </div>
      </div>

      <div style={styles.section}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Medicine Inventory</h2>
          <span style={styles.viewAll}>{filteredStock.length} items</span>
        </div>

        <SearchBar 
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          onClearSearch={handleClearSearch}
          filteredStock={filteredStock}
        />

        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeader}>
                <th style={styles.tableCell}>Medicine Name</th>
                <th style={styles.tableCell}>Category</th>
                <th style={styles.tableCell}>Quantity</th>
                <th style={styles.tableCell}>Price</th>
                <th style={styles.tableCell}>Expiry Date</th>
                <th style={styles.tableCell}>Prescription</th>
                <th style={styles.tableCell}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStock.map(medicine => (
                <tr key={medicine.id} style={styles.tableRow}>
                  <td style={styles.tableCell}>
                    <div style={styles.medicineInfo}>
                      <strong>{medicine.name}</strong>
                      <span style={styles.batchNo}>{medicine.batchNo}</span>
                    </div>
                  </td>
                  <td style={styles.tableCell}>{medicine.category}</td>
                  <td style={styles.tableCell}>
                    <span style={{
                      ...styles.quantity,
                      ...(isLowStock(medicine) ? styles.lowStock : {})
                    }}>
                      {medicine.quantity}
                      {isLowStock(medicine) && ' ⚠️'}
                    </span>
                  </td>
                  <td style={styles.tableCell}>{formatIndianCurrency(medicine.price)}</td>
                  <td style={styles.tableCell}>
                    <span style={{
                      ...(isExpired(medicine) ? styles.expired : {}),
                      ...(isExpiringSoon(medicine) && !isExpired(medicine) ? styles.expiringSoon : {})
                    }}>
                      {medicine.expiryDate}
                      {isExpired(medicine) && ' 🔴'}
                      {isExpiringSoon(medicine) && !isExpired(medicine) && ' 🟡'}
                    </span>
                  </td>
                  <td style={styles.tableCell}>
                    {medicine.prescriptionRequired ? 'Yes' : 'No'}
                  </td>
                  <td style={styles.tableCell}>
                    <div style={styles.actionButtons}>
                      <button 
                        style={styles.smallButton}
                        onClick={() => handleEditMedicine(medicine)}
                      >
                        Update Stock
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredStock.length === 0 && (
          <div style={styles.noResults}>
            <p>No medicines found matching your search criteria.</p>
            {searchTerm && (
              <button 
                style={styles.secondaryButton}
                onClick={handleClearSearch}
              >
                Clear Search
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );

  const renderOrdersManagement = () => (
    <div style={styles.mainContent}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.greeting}>Orders Management</h1>
          <p style={styles.subtitle}>Process and manage customer orders</p>
        </div>
        <div style={styles.headerActions}>
          <button 
            style={styles.notificationBell}
            onClick={() => setShowNotificationsBellModal(true)}
          >
            🔔
            {notifications.length > 0 && (
              <span style={styles.notificationBadge}>
                {notifications.length}
              </span>
            )}
          </button>
          <div style={styles.dateDisplay}>
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </div>
        </div>
      </div>

      <div style={styles.orderTabs}>
        {orderTabs.map(tab => (
          <button
            key={tab.id}
            style={{
              ...styles.orderTab,
              ...(orderFilter === tab.id ? styles.orderTabActive : {})
            }}
            onClick={() => setOrderFilter(tab.id)}
          >
            <span>{tab.label}</span>
            <span style={styles.orderCount}>{tab.count}</span>
          </button>
        ))}
      </div>

      <div style={styles.contentGrid}>
        <div style={styles.section}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>
              {orderTabs.find(tab => tab.id === orderFilter)?.label} Orders
            </h2>
            <span style={styles.viewAll}>
              {orders[orderFilter]?.length || 0} orders
            </span>
          </div>

          <div style={styles.ordersList}>
            {(orders[orderFilter] || []).map(order => (
              <div 
                key={order.id} 
                style={{
                  ...styles.orderCard,
                  ...(selectedOrder?.id === order.id ? styles.orderCardSelected : {})
                }}
                onClick={() => setSelectedOrder(order)}
              >
                <div style={styles.orderHeader}>
                  <div style={styles.orderInfo}>
                    <h4 style={styles.orderId}>{order.id}</h4>
                    <p style={styles.customerName}>{order.customerName}</p>
                  </div>
                  <div style={styles.orderMeta}>
                    <span style={styles.orderTime}>{order.orderTime}</span>
                    <span style={styles.deliveryType}>{order.deliveryType}</span>
                  </div>
                </div>
                
                <div style={styles.orderItems}>
                  {order.items.map((item, index) => (
                    <div key={index} style={styles.orderItem}>
                      <span>{item.name}</span>
                      <span>Qty: {item.quantity}</span>
                    </div>
                  ))}
                </div>

                <div style={styles.orderFooter}>
                  <strong style={styles.orderTotal}>
                    {formatIndianCurrency(order.total)}
                  </strong>
                  {order.prescriptionRequired && (
                    <span style={styles.prescriptionBadge}>Prescription</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {selectedOrder && (
          <div style={styles.orderDetailsPanel}>
            <div style={styles.panelHeader}>
              <h3 style={styles.panelTitle}>Order Details</h3>
              <button 
                style={styles.closeButton}
                onClick={() => setSelectedOrder(null)}
              >
                ✕
              </button>
            </div>

            <div style={styles.panelContent}>
              <div style={styles.customerInfo}>
                <h4 style={styles.customerName}>{selectedOrder.customerName}</h4>
                <p style={styles.customerPhone}>{selectedOrder.customerPhone}</p>
                <p style={styles.deliveryAddress}>{selectedOrder.address}</p>
              </div>

              <div style={styles.orderItemsDetailed}>
                <h5 style={styles.itemsTitle}>Order Items</h5>
                {selectedOrder.items.map((item, index) => (
                  <div key={index} style={styles.orderItemDetailed}>
                    <span style={styles.itemName}>{item.name}</span>
                    <span style={styles.itemQuantity}>Qty: {item.quantity}</span>
                    <span style={styles.itemPrice}>{formatIndianCurrency(item.price)}</span>
                  </div>
                ))}
                <div style={styles.orderTotalSection}>
                  <strong>Total: {formatIndianCurrency(selectedOrder.total)}</strong>
                </div>
              </div>

              <div style={styles.orderActions}>
                {orderFilter === 'pending' && (
                  <>
                    <button 
                      style={styles.primaryButton}
                      onClick={() => markOrderReady(selectedOrder.id)}
                    >
                      Mark Ready
                    </button>
                    <button 
                      style={styles.secondaryButton}
                      onClick={() => printLabel(selectedOrder.id)}
                    >
                      Print Label
                    </button>
                    <button 
                      style={styles.dangerButton}
                      onClick={() => cancelOrder(selectedOrder.id)}
                    >
                      Cancel Order
                    </button>
                  </>
                )}
                {orderFilter === 'ready' && (
                  <button 
                    style={styles.successButton}
                    onClick={() => markOrderPicked(selectedOrder.id)}
                  >
                    Mark as Picked
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderPrescriptionVerification = () => (
    <div style={styles.mainContent}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.greeting}>Prescription Verification</h1>
          <p style={styles.subtitle}>
            Validate prescription-required medicines • Real-time updates active
            {prescriptions.filter(p => p.status === 'pending').length > 0 && (
              <span style={styles.realtimeIndicator}> • Live</span>
            )}
          </p>
        </div>
        <div style={styles.headerActions}>
          <button 
            style={styles.notificationBell}
            onClick={() => setShowNotificationsBellModal(true)}
          >
            🔔
            {notifications.length > 0 && (
              <span style={styles.notificationBadge}>
                {notifications.length}
              </span>
            )}
          </button>
          <div style={styles.prescriptionStats}>
            <span style={styles.pendingCount}>
              {prescriptions.filter(p => p.status === 'pending').length} Pending
            </span>
          </div>
        </div>
      </div>

      <div style={styles.contentGrid}>
        <div style={styles.section}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>Pending Verifications</h2>
            <span style={styles.viewAll}>
              {prescriptions.length} prescriptions
            </span>
          </div>

          <div style={styles.prescriptionsList}>
            {prescriptions.map(prescription => (
              <div 
                key={prescription.id}
                style={{
                  ...styles.prescriptionCard,
                  ...(selectedPrescription?.id === prescription.id ? styles.prescriptionCardSelected : {}),
                  ...(prescription.status === 'approved' ? styles.prescriptionApproved : {}),
                  ...(prescription.status === 'rejected' ? styles.prescriptionRejected : {})
                }}
                onClick={() => setSelectedPrescription(prescription)}
              >
                <div style={styles.prescriptionHeader}>
                  <div style={styles.prescriptionInfo}>
                    <h4 style={styles.orderId}>{prescription.orderId}</h4>
                    <p style={styles.customerName}>{prescription.customerName}</p>
                    <p style={styles.doctorName}>Dr. {prescription.doctorName}</p>
                  </div>
                  <div style={styles.prescriptionMeta}>
                    <span style={styles.uploadTime}>{prescription.uploadedTime}</span>
                    {prescription.status !== 'pending' && (
                      <span style={styles.statusTime}>
                        {prescription.status === 'approved' ? 'Approved' : 'Rejected'}
                      </span>
                    )}
                  </div>
                </div>
                
                <div style={styles.medicinesList}>
                  <strong>Medicines:</strong>
                  <div style={styles.medicineTags}>
                    {prescription.medicines.map((medicine, index) => (
                      <span key={index} style={styles.medicineTag}>
                        {medicine}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={styles.prescriptionStatus}>
                  <span style={{
                    ...styles.statusBadge,
                    ...(prescription.status === 'approved' ? styles.statusApproved : {}),
                    ...(prescription.status === 'rejected' ? styles.statusRejected : {})
                  }}>
                    {prescription.status === 'pending' ? 'Pending' : 
                     prescription.status === 'approved' ? 'Approved' : 'Rejected'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {selectedPrescription && (
          <div style={styles.prescriptionViewer}>
            <div style={styles.viewerHeader}>
              <h3 style={styles.viewerTitle}>Prescription Verification</h3>
              <div style={styles.prescriptionInfo}>
                <p><strong>Order:</strong> {selectedPrescription.orderId}</p>
                <p><strong>Customer:</strong> {selectedPrescription.customerName}</p>
                <p><strong>Doctor:</strong> Dr. {selectedPrescription.doctorName}</p>
                <p><strong>Status:</strong> 
                  <span style={{
                    ...styles.statusText,
                    ...(selectedPrescription.status === 'approved' ? styles.statusApproved : {}),
                    ...(selectedPrescription.status === 'rejected' ? styles.statusRejected : {})
                  }}>
                    {selectedPrescription.status.charAt(0).toUpperCase() + selectedPrescription.status.slice(1)}
                  </span>
                </p>
              </div>
            </div>

            <div style={styles.viewerContent}>
              <div style={styles.prescriptionImage}>
                <img 
                  src={selectedPrescription.imageUrl} 
                  alt="Prescription" 
                  style={styles.prescriptionImg}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x500?text=Prescription+Image';
                  }}
                />
                <div style={styles.imageControls}>
                  <button style={styles.smallButton}>Zoom In</button>
                  <button style={styles.smallButton}>Zoom Out</button>
                  <button style={styles.smallButton}>Rotate</button>
                </div>
              </div>

              <div style={styles.extractedMedicines}>
                <h4 style={styles.medicinesTitle}>Extracted Medicines</h4>
                <div style={styles.medicineList}>
                  {selectedPrescription.medicines.map((medicine, index) => (
                    <div key={index} style={styles.medicineItem}>
                      <input type="checkbox" defaultChecked style={styles.checkbox} />
                      <span>{medicine}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={styles.verificationActions}>
                {selectedPrescription.status === 'pending' && (
                  <>
                    <button 
                      style={styles.successButton}
                      onClick={() => approvePrescription(selectedPrescription.id)}
                    >
                      ✅ Approve
                    </button>
                    <button 
                      style={styles.dangerButton}
                      onClick={() => rejectPrescription(selectedPrescription.id)}
                    >
                      ❌ Reject
                    </button>
                    
                  </>
                )}
                {selectedPrescription.status !== 'pending' && (
                  <div style={styles.verificationResult}>
                    <p style={styles.resultText}>
                      This prescription has been {selectedPrescription.status}.
                      {selectedPrescription.status === 'approved' ? ' Order has been processed.' : ' Order has been cancelled.'}
                    </p>
                    <button 
                      style={styles.secondaryButton}
                      onClick={() => setSelectedPrescription(null)}
                    >
                      Close
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div style={styles.mainContent}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.greeting}>Business Analytics</h1>
          <p style={styles.subtitle}>Track your pharmacy performance and insights</p>
        </div>
        <div style={styles.headerActions}>
          <button 
            style={styles.notificationBell}
            onClick={() => setShowNotificationsBellModal(true)}
          >
            🔔
            {notifications.length > 0 && (
              <span style={styles.notificationBadge}>
                {notifications.length}
              </span>
            )}
          </button>
        </div>
      </div>

      <div style={styles.kpisGrid}>
        <div style={styles.kpiCard}>
          <div style={styles.kpiIcon}>📋</div>
          <div style={styles.kpiContent}>
            <h3 style={styles.kpiNumber}>{analyticsData.kpis.ordersToday}</h3>
            <p style={styles.kpiLabel}>Orders Today</p>
          </div>
        </div>

        <div style={styles.kpiCard}>
          <div style={styles.kpiIcon}>⏱️</div>
          <div style={styles.kpiContent}>
            <h3 style={styles.kpiNumber}>{analyticsData.kpis.avgFulfillment}</h3>
            <p style={styles.kpiLabel}>Avg Fulfillment Time</p>
          </div>
        </div>

        <div style={styles.kpiCard}>
          <div style={styles.kpiIcon}>📦</div>
          <div style={styles.kpiContent}>
            <h3 style={styles.kpiNumber}>{analyticsData.kpis.splitOrders}</h3>
            <p style={styles.kpiLabel}>Split Orders</p>
          </div>
        </div>

        <div style={styles.kpiCard}>
          <div style={styles.kpiIcon}>💰</div>
          <div style={styles.kpiContent}>
            <h3 style={styles.kpiNumber}>
              {formatIndianCurrency(analyticsData.kpis.revenue)}
            </h3>
            <p style={styles.kpiLabel}>Revenue</p>
          </div>
        </div>
      </div>

      <div style={styles.analyticsGrid}>
        <div style={styles.chartSection}>
          <h3 style={styles.chartTitle}>Order Trends</h3>
          <div style={styles.chartContainer}>
            <div style={styles.chartBars}>
              {analyticsData.orderTrends.map((day, index) => (
                <div key={index} style={styles.chartBarContainer}>
                  <div 
                    style={{
                      ...styles.chartBar,
                      height: `${(day.orders / 35) * 100}px`
                    }}
                  ></div>
                  <span style={styles.chartLabel}>{day.day}</span>
                  <span style={styles.chartValue}>{day.orders}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={styles.chartSection}>
          <h3 style={styles.chartTitle}>Delivery Efficiency</h3>
          <div style={styles.efficiencyChart}>
            <div style={styles.efficiencyMetric}>
              <span style={styles.efficiencyLabel}>On Time Delivery</span>
              <div style={styles.efficiencyBar}>
                <div style={{...styles.efficiencyFill, width: '85%'}}></div>
              </div>
              <span style={styles.efficiencyValue}>85%</span>
            </div>
            <div style={styles.efficiencyMetric}>
              <span style={styles.efficiencyLabel}>Order Accuracy</span>
              <div style={styles.efficiencyBar}>
                <div style={{...styles.efficiencyFill, width: '92%'}}></div>
              </div>
              <span style={styles.efficiencyValue}>92%</span>
            </div>
            <div style={styles.efficiencyMetric}>
              <span style={styles.efficiencyLabel}>Customer Satisfaction</span>
              <div style={styles.efficiencyBar}>
                <div style={{...styles.efficiencyFill, width: '88%'}}></div>
              </div>
              <span style={styles.efficiencyValue}>88%</span>
            </div>
          </div>
        </div>

        <div style={styles.heatmapSection}>
          <h3 style={styles.chartTitle}>High-Demand Localities</h3>
          <div style={styles.heatmapContainer}>
            {analyticsData.topLocalities.map((locality, index) => (
              <div key={index} style={styles.heatmapItem}>
                <span style={styles.localityName}>{locality.area}</span>
                <div style={styles.heatmapBar}>
                  <div 
                    style={{
                      ...styles.heatmapFill,
                      width: `${(locality.orders / 45) * 100}%`
                    }}
                  ></div>
                </div>
                <span style={styles.localityOrders}>{locality.orders} orders</span>
              </div>
            ))}
          </div>
        </div>

        <div style={styles.chartSection}>
          <h3 style={styles.chartTitle}>Revenue Trend</h3>
          <div style={styles.revenueChart}>
            <div style={styles.revenueBars}>
              {analyticsData.orderTrends.map((day, index) => (
                <div key={index} style={styles.revenueBarContainer}>
                  <div 
                    style={{
                      ...styles.revenueBar,
                      height: `${(day.revenue / 11500) * 100}px`
                    }}
                  ></div>
                  <span style={styles.chartLabel}>{day.day}</span>
                  <span style={styles.chartValue}>{formatIndianCurrency(day.revenue)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderMainContent = () => {
    switch (activePage) {
      case 'stock':
        return renderStockManagement();
      case 'orders':
        return renderOrdersManagement();
      case 'prescriptions':
        return renderPrescriptionVerification();
      case 'analytics':
        return renderAnalytics();
      default:
        return renderStockManagement();
    }
  };

  return {
    renderMainContent,
    SearchBar
  };
};

export default VendorComponents;