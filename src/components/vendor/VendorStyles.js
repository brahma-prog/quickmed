export const styles = {
  container: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#f8fafc',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
  },
  sidebar: {
    width: '280px',
    backgroundColor: '#7C2A62',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    position: 'fixed',
    height: '100vh',
    left: 0,
    top: 0
  },
  sidebarHeader: {
    padding: '30px 24px 20px',
    borderBottom: '1px solid rgba(255,255,255,0.1)'
  },
  logo: {
    fontSize: '24px',
    fontWeight: '700',
    margin: '0 0 4px 0',
    color: 'white'
  },
  vendorTitle: {
    fontSize: '14px',
    opacity: 0.8,
    margin: 0
  },
  navigation: {
    flex: 1,
    padding: '20px 0'
  },
  navButton: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    padding: '16px 24px',
    backgroundColor: 'transparent',
    border: 'none',
    color: 'white',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    opacity: 0.8
  },
  navButtonActive: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    opacity: 1,
    borderRight: '4px solid #F7D9EB'
  },
  navIcon: {
    fontSize: '20px',
    marginRight: '12px',
    width: '24px',
    textAlign: 'center'
  },
  navLabel: {
    fontWeight: '500'
  },
  profileSection: {
    padding: '20px 24px',
    borderTop: '1px solid rgba(255,255,255,0.1)',
    borderBottom: '1px solid rgba(255,255,255,0.1)'
  },
  userInfo: {
    display: 'flex',
    alignItems: 'flex-start',
    marginBottom: '16px'
  },
  userAvatar: {
    fontSize: '32px',
    marginRight: '12px',
    marginTop: '4px'
  },
  userDetails: {
    flex: 1
  },
  userName: {
    margin: '0 0 4px 0',
    fontWeight: '600',
    fontSize: '14px'
  },
  userEmail: {
    margin: '0 0 4px 0',
    fontSize: '12px',
    opacity: 0.8
  },
  pharmacyName: {
    margin: 0,
    fontSize: '11px',
    opacity: 0.7,
    fontStyle: 'italic'
  },
  profileActions: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  profileButton: {
    width: '100%',
    padding: '8px 12px',
    backgroundColor: 'rgba(255,255,255,0.1)',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: '500',
    transition: 'background-color 0.3s ease'
  },
  sidebarFooter: {
    padding: '20px 24px'
  },
  logoutButton: {
    width: '100%',
    padding: '12px',
    backgroundColor: 'rgba(255,255,255,0.1)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '500',
    transition: 'background-color 0.3s ease'
  },
  content: {
    flex: 1,
    marginLeft: '280px',
    padding: '0'
  },
  mainContent: {
    padding: '30px',
    minHeight: '100vh'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '30px'
  },
  headerActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  },
  notificationBell: {
    position: 'relative',
    backgroundColor: 'white',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    padding: '10px 12px',
    fontSize: '18px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  notificationBadge: {
    position: 'absolute',
    top: '-5px',
    right: '-5px',
    backgroundColor: '#EF4444',
    color: 'white',
    borderRadius: '50%',
    width: '18px',
    height: '18px',
    fontSize: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '600'
  },
  greeting: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#1f2937',
    margin: '0 0 8px 0'
  },
  subtitle: {
    fontSize: '16px',
    color: '#6b7280',
    margin: 0
  },
  dateDisplay: {
    fontSize: '14px',
    color: '#6b7280',
    fontWeight: '500'
  },
  primaryButton: {
    backgroundColor: '#7C2A62',
    color: 'white',
    border: 'none',
    padding: '12px 20px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease'
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    color: '#7C2A62',
    border: '2px solid #7C2A62',
    padding: '10px 18px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  successButton: {
    backgroundColor: '#10B981',
    color: 'white',
    border: 'none',
    padding: '12px 20px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer'
  },
  dangerButton: {
    backgroundColor: '#EF4444',
    color: 'white',
    border: 'none',
    padding: '12px 20px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer'
  },
  smallButton: {
    backgroundColor: '#7C2A62',
    color: 'white',
    border: 'none',
    padding: '6px 12px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: '500',
    cursor: 'pointer',
    marginRight: '8px'
  },
  clearAllButton: {
    backgroundColor: 'transparent',
    color: '#7C2A62',
    border: 'none',
    padding: '6px 12px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: '500',
    cursor: 'pointer',
    marginRight: '8px'
  },
  searchContainer: {
    marginBottom: '24px'
  },
  searchInputContainer: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'white',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    padding: '8px 12px',
    transition: 'border-color 0.3s ease'
  },
  searchIcon: {
    marginRight: '8px',
    color: '#6b7280'
  },
  searchInput: {
    flex: 1,
    border: 'none',
    outline: 'none',
    fontSize: '14px',
    padding: '4px 0'
  },
  clearSearchButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#6b7280',
    fontSize: '16px',
    padding: '4px'
  },
  searchResultsInfo: {
    marginTop: '8px',
    fontSize: '14px',
    color: '#6b7280'
  },
  noResults: {
    textAlign: 'center',
    padding: '40px',
    color: '#6b7280'
  },
  filterTabs: {
    display: 'flex',
    gap: '8px',
    marginBottom: '24px'
  },
  filterTab: {
    padding: '10px 20px',
    backgroundColor: 'white',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.3s ease'
  },
  filterTabActive: {
    backgroundColor: '#7C2A62',
    color: 'white',
    borderColor: '#7C2A62'
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '20px',
    marginBottom: '30px'
  },
  statCard: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    display: 'flex',
    alignItems: 'center',
    border: '1px solid #e5e7eb'
  },
  statIcon: {
    fontSize: '24px',
    marginRight: '16px',
    width: '50px',
    height: '50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '10px'
  },
  statContent: {
    flex: 1
  },
  statNumber: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#1f2937',
    margin: '0 0 4px 0'
  },
  statLabel: {
    fontSize: '14px',
    color: '#6b7280',
    margin: 0
  },
  section: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    border: '1px solid #e5e7eb'
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px'
  },
  sectionTitle: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#1f2937',
    margin: 0
  },
  viewAll: {
    fontSize: '14px',
    color: '#7C2A62',
    fontWeight: '500',
    cursor: 'pointer'
  },
  tableContainer: {
    overflowX: 'auto'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse'
  },
  tableHeader: {
    backgroundColor: '#f8fafc',
    borderBottom: '2px solid #e5e7eb'
  },
  tableRow: {
    borderBottom: '1px solid #e5e7eb',
    transition: 'background-color 0.2s ease'
  },
  tableCell: {
    padding: '12px 16px',
    textAlign: 'left',
    fontSize: '14px'
  },
  medicineInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px'
  },
  batchNo: {
    fontSize: '12px',
    color: '#6b7280'
  },
  quantity: {
    fontWeight: '600'
  },
  lowStock: {
    color: '#EF4444'
  },
  expiringSoon: {
    color: '#F59E0B'
  },
  expired: {
    color: '#EF4444',
    fontWeight: '600'
  },
  actionButtons: {
    display: 'flex',
    gap: '4px'
  },
  orderTabs: {
    display: 'flex',
    gap: '4px',
    backgroundColor: 'white',
    padding: '4px',
    borderRadius: '8px',
    border: '1px solid #e5e7eb',
    marginBottom: '24px'
  },
  orderTab: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 20px',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.3s ease'
  },
  orderTabActive: {
    backgroundColor: '#7C2A62',
    color: 'white'
  },
  orderCount: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    color: 'inherit',
    padding: '2px 8px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: '600'
  },
  contentGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 400px',
    gap: '24px'
  },
  ordersList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  orderCard: {
    padding: '16px',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  orderCardSelected: {
    borderColor: '#7C2A62',
    backgroundColor: '#F7D9EB'
  },
  orderHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '8px'
  },
  orderInfo: {
    flex: 1
  },
  orderId: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#1f2937',
    margin: '0 0 4px 0'
  },
  customerName: {
    fontSize: '14px',
    color: '#6b7280',
    margin: 0
  },
  orderMeta: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: '2px'
  },
  orderTime: {
    fontSize: '12px',
    color: '#6b7280'
  },
  deliveryType: {
    fontSize: '12px',
    color: '#7C2A62',
    fontWeight: '500'
  },
  orderItems: {
    marginBottom: '8px'
  },
  orderItem: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '12px',
    color: '#6b7280',
    marginBottom: '2px'
  },
  orderFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  orderTotal: {
    color: '#1f2937'
  },
  prescriptionBadge: {
    backgroundColor: '#F7D9EB',
    color: '#7C2A62',
    padding: '2px 8px',
    borderRadius: '12px',
    fontSize: '10px',
    fontWeight: '500'
  },
  orderDetailsPanel: {
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    border: '1px solid #e5e7eb',
    height: 'fit-content'
  },
  panelHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px',
    borderBottom: '1px solid #e5e7eb'
  },
  panelTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#1f2937',
    margin: 0
  },
  closeButton: {
    backgroundColor: 'transparent',
    border: 'none',
    fontSize: '18px',
    cursor: 'pointer',
    color: '#6b7280'
  },
  panelContent: {
    padding: '20px'
  },
  customerInfo: {
    marginBottom: '20px'
  },
  customerPhone: {
    fontSize: '14px',
    color: '#6b7280',
    margin: '4px 0'
  },
  deliveryAddress: {
    fontSize: '14px',
    color: '#6b7280',
    margin: '4px 0'
  },
  orderItemsDetailed: {
    marginBottom: '20px'
  },
  itemsTitle: {
    fontSize: '16px',
    fontWeight: '600',
    margin: '0 0 12px 0'
  },
  orderItemDetailed: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px 0',
    borderBottom: '1px solid #f3f4f6'
  },
  itemName: {
    flex: 1,
    fontSize: '14px'
  },
  itemQuantity: {
    fontSize: '14px',
    color: '#6b7280'
  },
  itemPrice: {
    fontSize: '14px',
    fontWeight: '600'
  },
  orderTotalSection: {
    paddingTop: '12px',
    borderTop: '2px solid #e5e7eb',
    textAlign: 'right'
  },
  orderActions: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  prescriptionStats: {
    display: 'flex',
    alignItems: 'center'
  },
  pendingCount: {
    backgroundColor: '#FEF3C7',
    color: '#D97706',
    padding: '8px 16px',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: '600'
  },
  prescriptionsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  prescriptionCard: {
    padding: '16px',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  prescriptionCardSelected: {
    borderColor: '#7C2A62',
    backgroundColor: '#F7D9EB'
  },
  prescriptionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '8px'
  },
  doctorName: {
    fontSize: '12px',
    color: '#6b7280',
    margin: '2px 0 0 0'
  },
  uploadTime: {
    fontSize: '12px',
    color: '#6b7280'
  },
  medicinesList: {
    marginBottom: '8px'
  },
  medicineTags: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '4px',
    marginTop: '4px'
  },
  medicineTag: {
    backgroundColor: '#F7D9EB',
    color: '#7C2A62',
    padding: '2px 6px',
    borderRadius: '8px',
    fontSize: '10px',
    fontWeight: '500'
  },
  prescriptionStatus: {
    textAlign: 'right'
  },
  statusBadge: {
    backgroundColor: '#F59E0B',
    color: 'white',
    padding: '4px 8px',
    borderRadius: '12px',
    fontSize: '10px',
    fontWeight: '500'
  },
  prescriptionViewer: {
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    border: '1px solid #e5e7eb'
  },
  viewerHeader: {
    padding: '20px',
    borderBottom: '1px solid #e5e7eb'
  },
  viewerTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#1f2937',
    margin: '0 0 12px 0'
  },
  prescriptionInfo: {
    fontSize: '14px',
    color: '#6b7280'
  },
  viewerContent: {
    padding: '20px'
  },
  prescriptionImage: {
    marginBottom: '20px'
  },
  prescriptionImg: {
    width: '100%',
    height: '300px',
    objectFit: 'contain',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    backgroundColor: '#f8fafc'
  },
  imageControls: {
    display: 'flex',
    gap: '8px',
    marginTop: '8px'
  },
  extractedMedicines: {
    marginBottom: '20px'
  },
  medicinesTitle: {
    fontSize: '16px',
    fontWeight: '600',
    margin: '0 0 12px 0'
  },
  medicineList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  medicineItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  checkbox: {
    margin: 0
  },
  verificationActions: {
    display: 'flex',
    gap: '8px'
  },
  periodSelector: {
    display: 'flex',
    alignItems: 'center'
  },
  periodSelect: {
    padding: '8px 12px',
    border: '1px solid #e5e7eb',
    borderRadius: '6px',
    fontSize: '14px',
    backgroundColor: 'white'
  },
  kpisGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '20px',
    marginBottom: '30px'
  },
  kpiCard: {
    backgroundColor: 'white',
    padding: '24px',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    display: 'flex',
    alignItems: 'center',
    border: '1px solid #e5e7eb'
  },
  kpiIcon: {
    fontSize: '32px',
    marginRight: '16px',
    width: '60px',
    height: '60px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '12px',
    backgroundColor: '#F7D9EB'
  },
  kpiContent: {
    flex: 1
  },
  kpiNumber: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#1f2937',
    margin: '0 0 4px 0'
  },
  kpiLabel: {
    fontSize: '14px',
    color: '#6b7280',
    margin: 0
  },
  analyticsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '24px'
  },
  chartSection: {
    backgroundColor: 'white',
    padding: '24px',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    border: '1px solid #e5e7eb'
  },
  chartTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#1f2937',
    margin: '0 0 20px 0'
  },
  chartContainer: {
    height: '200px',
    display: 'flex',
    alignItems: 'flex-end'
  },
  chartBars: {
    display: 'flex',
    alignItems: 'flex-end',
    gap: '16px',
    width: '100%',
    height: '150px'
  },
  chartBarContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1
  },
  chartBar: {
    backgroundColor: '#7C2A62',
    width: '30px',
    borderRadius: '4px 4px 0 0',
    minHeight: '10px'
  },
  chartLabel: {
    fontSize: '12px',
    color: '#6b7280',
    marginTop: '8px'
  },
  chartValue: {
    fontSize: '10px',
    color: '#7C2A62',
    fontWeight: '600',
    marginTop: '4px'
  },
  efficiencyChart: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  efficiencyMetric: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  efficiencyLabel: {
    fontSize: '14px',
    color: '#6b7280',
    minWidth: '120px'
  },
  efficiencyBar: {
    flex: 1,
    height: '8px',
    backgroundColor: '#e5e7eb',
    borderRadius: '4px',
    overflow: 'hidden'
  },
  efficiencyFill: {
    height: '100%',
    backgroundColor: '#7C2A62',
    borderRadius: '4px'
  },
  efficiencyValue: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#7C2A62',
    minWidth: '40px'
  },
  heatmapSection: {
    backgroundColor: 'white',
    padding: '24px',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    border: '1px solid #e5e7eb'
  },
  heatmapContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  heatmapItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  localityName: {
    fontSize: '14px',
    color: '#6b7280',
    minWidth: '80px'
  },
  heatmapBar: {
    flex: 1,
    height: '8px',
    backgroundColor: '#e5e7eb',
    borderRadius: '4px',
    overflow: 'hidden'
  },
  heatmapFill: {
    height: '100%',
    backgroundColor: '#7C2A62',
    borderRadius: '4px'
  },
  localityOrders: {
    fontSize: '12px',
    color: '#7C2A62',
    fontWeight: '600',
    minWidth: '60px'
  },
  revenueChart: {
    height: '200px',
    display: 'flex',
    alignItems: 'flex-end'
  },
  revenueBars: {
    display: 'flex',
    alignItems: 'flex-end',
    gap: '16px',
    width: '100%',
    height: '150px'
  },
  revenueBarContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1
  },
  revenueBar: {
    backgroundColor: '#7C2A62',
    width: '30px',
    borderRadius: '4px 4px 0 0',
    minHeight: '10px'
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: 0,
    width: '500px',
    maxWidth: '90vw',
    maxHeight: '90vh',
    overflow: 'auto',
    boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px',
    borderBottom: '1px solid #e5e7eb'
  },
  notificationHeaderActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  modalTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#1f2937',
    margin: 0
  },
  modalContent: {
    padding: '20px'
  },
  modalActions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
    padding: '20px',
    borderTop: '1px solid #e5e7eb'
  },
  formRow: {
    marginBottom: '16px'
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px'
  },
  label: {
    display: 'block',
    marginBottom: '6px',
    fontWeight: '500',
    color: '#374151',
    fontSize: '14px'
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontWeight: '500',
    color: '#374151',
    fontSize: '14px'
  },
  input: {
    width: '100%',
    padding: '10px 12px',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    fontSize: '14px',
    transition: 'border-color 0.3s ease',
    boxSizing: 'border-box'
  },
  inputError: {
    borderColor: '#EF4444',
    backgroundColor: '#FEF2F2'
  },
  lockedField: {
    backgroundColor: '#f9fafb',
    color: '#6b7280',
    cursor: 'not-allowed'
  },
  lockedNote: {
    fontSize: '12px',
    color: '#6b7280',
    fontStyle: 'italic',
    marginTop: '4px'
  },
  errorText: {
    color: '#EF4444',
    fontSize: '12px',
    marginTop: '4px'
  },
  requiredNote: {
    fontSize: '12px',
    color: '#6b7280',
    fontStyle: 'italic',
    marginTop: '16px'
  },
  confirmationText: {
    fontSize: '16px',
    color: '#6b7280',
    textAlign: 'center',
    margin: '20px 0'
  },
  realtimeIndicator: {
    color: '#10B981',
    fontWeight: '600'
  },
  prescriptionApproved: {
    borderColor: '#10B981',
    backgroundColor: '#F0FDF4'
  },
  prescriptionRejected: {
    borderColor: '#EF4444',
    backgroundColor: '#FEF2F2'
  },
  statusApproved: {
    backgroundColor: '#10B981',
    color: 'white'
  },
  statusRejected: {
    backgroundColor: '#EF4444',
    color: 'white'
  },
  statusText: {
    padding: '4px 8px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: '500',
    marginLeft: '8px'
  },
  prescriptionMeta: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: '2px'
  },
  statusTime: {
    fontSize: '11px',
    color: '#6b7280',
    fontStyle: 'italic'
  },
  verificationResult: {
    textAlign: 'center',
    padding: '20px'
  },
  resultText: {
    marginBottom: '16px',
    color: '#6b7280',
    fontSize: '14px'
  },
  settingsSection: {
    marginBottom: '24px',
    paddingBottom: '16px',
    borderBottom: '1px solid #e5e7eb'
  },
  settingsTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#1f2937',
    margin: '0 0 12px 0'
  },
  settingItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    marginBottom: '12px'
  },
  settingDescription: {
    fontSize: '12px',
    color: '#6b7280',
    marginLeft: '24px'
  },
  noNotifications: {
    textAlign: 'center',
    padding: '40px 20px'
  },
  noNotificationsIcon: {
    fontSize: '48px',
    marginBottom: '16px',
    opacity: 0.5
  },
  noNotificationsText: {
    color: '#6b7280',
    fontSize: '16px',
    margin: 0
  },
  notificationsList: {
    maxHeight: '400px',
    overflowY: 'auto'
  },
  notificationItem: {
    display: 'flex',
    alignItems: 'flex-start',
    padding: '12px',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    marginBottom: '8px',
    backgroundColor: '#f8fafc'
  },
  notificationIcon: {
    fontSize: '20px',
    marginRight: '12px',
    marginTop: '2px'
  },
  notificationContent: {
    flex: 1
  },
  notificationTitle: {
    fontWeight: '600',
    color: '#1f2937',
    margin: '0 0 4px 0',
    fontSize: '14px'
  },
  notificationMessage: {
    color: '#6b7280',
    margin: '0 0 4px 0',
    fontSize: '13px'
  },
  notificationTime: {
    color: '#9ca3af',
    fontSize: '11px'
  }
};