import React from 'react';

const LogoutConfirmation = ({ onConfirm, onCancel }) => {
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
      zIndex: 1000,
      padding: '16px',
    },
    logoutModal: {
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '0',
      width: '400px',
      maxWidth: '90vw',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      border: '1px solid #E5E7EB'
    },
    logoutModalHeader: {
      padding: '24px 24px 0 24px',
      borderBottom: '1px solid #E5E7EB'
    },
    logoutModalTitle: {
      margin: '0',
      fontSize: '18px',
      fontWeight: '600',
      color: '#111827',
      textAlign: 'center'
    },
    logoutModalContent: {
      padding: '24px'
    },
    logoutModalText: {
      margin: '0',
      fontSize: '14px',
      color: '#6B7280',
      textAlign: 'center',
      lineHeight: '1.5'
    },
    logoutModalActions: {
      padding: '16px 24px 24px 24px',
      display: 'flex',
      gap: '12px',
      justifyContent: 'flex-end',
      borderTop: '1px solid #E5E7EB'
    },
    logoutCancelButton: {
      padding: '8px 16px',
      backgroundColor: 'white',
      color: '#374151',
      border: '1px solid #D1D5DB',
      borderRadius: '6px',
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.2s',
      minWidth: '80px'
    },
    logoutConfirmButton: {
      padding: '8px 16px',
      backgroundColor: '#7C2A62',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.2s',
      minWidth: '100px'
    }
  };

  // Mobile responsive styles
  const mobileStyles = {
    modalOverlay: {
      ...styles.modalOverlay,
      padding: '8px',
      alignItems: 'center'
    },
    logoutModal: {
      ...styles.logoutModal,
      width: '95vw',
    },
    logoutModalHeader: {
      ...styles.logoutModalHeader,
      padding: '20px 20px 0 20px'
    },
    logoutModalTitle: {
      ...styles.logoutModalTitle,
      fontSize: '16px'
    },
    logoutModalContent: {
      ...styles.logoutModalContent,
      padding: '20px'
    },
    logoutModalText: {
      ...styles.logoutModalText,
      fontSize: '13px'
    },
    logoutModalActions: {
      ...styles.logoutModalActions,
      padding: '16px 20px 20px 20px',
      flexDirection: 'column',
      gap: '8px'
    },
    logoutCancelButton: {
      ...styles.logoutCancelButton,
      width: '100%',
      padding: '10px',
      fontSize: '14px'
    },
    logoutConfirmButton: {
      ...styles.logoutConfirmButton,
      width: '100%',
      padding: '10px',
      fontSize: '14px'
    }
  };

  const isMobile = window.innerWidth < 768;
  const currentStyles = isMobile ? mobileStyles : styles;

  return (
    <div style={currentStyles.modalOverlay}>
      <div style={currentStyles.logoutModal}>
        <div style={currentStyles.logoutModalHeader}>
          <h3 style={currentStyles.logoutModalTitle}>Confirm Logout</h3>
        </div>
        <div style={currentStyles.logoutModalContent}>
          <p style={currentStyles.logoutModalText}>
            Are you sure you want to logout from your QuickMed account?
          </p>
        </div>
        <div style={currentStyles.logoutModalActions}>
          <button
            style={currentStyles.logoutCancelButton}
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            style={currentStyles.logoutConfirmButton}
            onClick={onConfirm}
          >
            Yes, Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutConfirmation;