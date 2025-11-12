import React from 'react';

const TaskDetailsModal = ({ selectedTask, onClose, onGetDirections, onContactCustomer, onStartDelivery, onMarkDelivered, onCancelDelivery, onAcceptDelivery }) => {
  const styles = {
    modalOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    },
    modal: {
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '0',
      width: '90%',
      maxWidth: '500px',
      maxHeight: '90vh',
      overflow: 'auto'
    },
    modalHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '24px',
      borderBottom: '1px solid #e5e7eb'
    },
    closeButton: {
      backgroundColor: 'transparent',
      border: 'none',
      fontSize: '20px',
      cursor: 'pointer',
      color: '#6b7280'
    },
    modalContent: {
      padding: '24px'
    },
    customerInfoModal: {
      marginBottom: '20px'
    },
    modalCustomerName: {
      fontSize: '20px',
      fontWeight: '600',
      color: '#1f2937',
      margin: '0 0 4px 0'
    },
    modalCustomerPhone: {
      fontSize: '14px',
      color: '#6b7280',
      margin: 0
    },
    taskStatusModal: {
      display: 'flex',
      gap: '8px',
      marginTop: '8px'
    },
    statusBadge: {
      color: 'white',
      padding: '4px 8px',
      borderRadius: '12px',
      fontSize: '12px',
      fontWeight: '500'
    },
    priorityBadge: {
      fontSize: '12px',
      fontWeight: '500'
    },
    modalDetails: {
      marginBottom: '24px'
    },
    modalSection: {
      marginBottom: '16px'
    },
    modalLocation: {
      margin: '4px 0',
      fontSize: '14px',
      color: '#1f2937',
      lineHeight: '1.4'
    },
    distanceText: {
      color: '#6b7280',
      fontSize: '12px',
      fontStyle: 'italic'
    },
    modalItems: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '6px',
      marginTop: '8px'
    },
    modalItemTag: {
      backgroundColor: '#F7D9EB',
      color: '#7C2A62',
      padding: '4px 8px',
      borderRadius: '12px',
      fontSize: '12px',
      fontWeight: '500'
    },
    specialInstructions: {
      backgroundColor: '#FFF7ED',
      padding: '8px 12px',
      borderRadius: '6px',
      borderLeft: '3px solid #F59E0B',
      margin: '4px 0',
      fontSize: '14px',
      color: '#92400E'
    },
    deliveryInfo: {
      display: 'flex',
      flexDirection: 'column',
      gap: '4px',
      marginTop: '8px'
    },
    infoRow: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '4px 0'
    },
    infoLabel: {
      fontSize: '14px',
      color: '#6b7280',
      fontWeight: '500'
    },
    infoValue: {
      fontSize: '14px',
      color: '#1f2937',
      fontWeight: '600'
    },
    modalActions: {
      display: 'flex',
      gap: '8px',
      flexWrap: 'wrap'
    },
    primaryButton: {
      backgroundColor: '#7C2A62',
      color: 'white',
      border: 'none',
      padding: '10px 16px',
      borderRadius: '6px',
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '6px'
    },
    secondaryButton: {
      backgroundColor: 'transparent',
      color: '#7C2A62',
      border: '1px solid #7C2A62',
      padding: '9px 15px',
      borderRadius: '6px',
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '6px'
    },
    successButton: {
      backgroundColor: '#10B981',
      color: 'white',
      border: 'none',
      padding: '10px 16px',
      borderRadius: '6px',
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '6px'
    },
    dangerButton: {
      backgroundColor: '#EF4444',
      color: 'white',
      border: 'none',
      padding: '10px 16px',
      borderRadius: '6px',
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '6px'
    },
    acceptButton: {
      backgroundColor: '#3B82F6',
      color: 'white',
      border: 'none',
      padding: '10px 16px',
      borderRadius: '6px',
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '6px'
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return '#EF4444';
      case 'Medium': return '#F59E0B';
      case 'Low': return '#10B981';
      default: return '#6B7280';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return '#F59E0B';
      case 'assigned': return '#F59E0B';
      case 'in-progress': return '#3B82F6';
      case 'delivered': return '#10B981';
      case 'cancelled': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const formatIndianCurrency = (amount) => {
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  if (!selectedTask) return null;

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modal}>
        <div style={styles.modalHeader}>
          <h2>Order Details - {selectedTask.orderId}</h2>
          <button style={styles.closeButton} onClick={onClose}>
            ✕
          </button>
        </div>
        <div style={styles.modalContent}>
          <div style={styles.customerInfoModal}>
            <h3 style={styles.modalCustomerName}>{selectedTask.customerName}</h3>
            <p style={styles.modalCustomerPhone}>{selectedTask.customerPhone}</p>
            <div style={styles.taskStatusModal}>
              <span style={{
                ...styles.statusBadge,
                backgroundColor: getStatusColor(selectedTask.status)
              }}>
                {selectedTask.status}
              </span>
              <span style={{
                ...styles.priorityBadge,
                color: getPriorityColor(selectedTask.priority)
              }}>
                {selectedTask.priority} Priority
              </span>
            </div>
          </div>

          <div style={styles.modalDetails}>
            <div style={styles.modalSection}>
              <strong>Pickup Location:</strong>
              <p style={styles.modalLocation}>{selectedTask.pickupLocation}</p>
              <small style={styles.distanceText}>{selectedTask.distance} away</small>
            </div>
            <div style={styles.modalSection}>
              <strong>Delivery Location:</strong>
              <p style={styles.modalLocation}>{selectedTask.deliveryLocation}</p>
            </div>
            <div style={styles.modalSection}>
              <strong>Items to Deliver:</strong>
              <div style={styles.modalItems}>
                {selectedTask.items.map((item, index) => (
                  <span key={index} style={styles.modalItemTag}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
            {selectedTask.specialInstructions && (
              <div style={styles.modalSection}>
                <strong>Special Instructions:</strong>
                <p style={styles.specialInstructions}>{selectedTask.specialInstructions}</p>
              </div>
            )}
            <div style={styles.modalSection}>
              <strong>Delivery Information:</strong>
              <div style={styles.deliveryInfo}>
                <div style={styles.infoRow}>
                  <span style={styles.infoLabel}>Estimated Time:</span>
                  <span style={styles.infoValue}>{selectedTask.estimatedTime}</span>
                </div>
                <div style={styles.infoRow}>
                  <span style={styles.infoLabel}>Delivery Fee:</span>
                  <span style={styles.infoValue}>{formatIndianCurrency(selectedTask.amount)}</span>
                </div>
                <div style={styles.infoRow}>
                  <span style={styles.infoLabel}>Assigned Time:</span>
                  <span style={styles.infoValue}>{selectedTask.assignedTime}</span>
                </div>
              </div>
            </div>
          </div>

          <div style={styles.modalActions}>
            <button
              style={styles.primaryButton}
              onClick={() => onGetDirections(selectedTask)}
            >
              🗺️ Get Directions
            </button>
            <button
              style={styles.secondaryButton}
              onClick={() => onContactCustomer(selectedTask)}
            >
              📞 Contact Customer
            </button>
            
            {/* Accept Delivery Button for Pending Orders */}
            {selectedTask.status === 'pending' && (
              <button
                style={styles.acceptButton}
                onClick={() => onAcceptDelivery(selectedTask.id)}
              >
                ✅ Accept Delivery
              </button>
            )}
            
            {selectedTask.status === 'assigned' && (
              <button
                style={styles.successButton}
                onClick={() => onStartDelivery(selectedTask.id)}
              >
                🚚 Start Delivery
              </button>
            )}
            {selectedTask.status === 'in-progress' && (
              <button
                style={styles.successButton}
                onClick={() => onMarkDelivered(selectedTask.id)}
              >
                ✅ Mark Delivered
              </button>
            )}
            <button
              style={styles.dangerButton}
              onClick={() => onCancelDelivery(selectedTask.id)}
            >
              ❌ Cancel Delivery
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailsModal;