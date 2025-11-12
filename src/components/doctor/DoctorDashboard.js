import React from 'react';
import DoctorSidebar from './DoctorSidebar';
import DoctorHeader from './DoctorHeader';
import DashboardContent from './DashboardContent';
import AppointmentsContent from './AppointmentsContent';
import PatientsContent from './PatientsContent';
import EarningsContent from './EarningsContent';
import MessagesContent from './MessagesContent';
import DoctorModals from './DoctorModals';
import { 
  useDoctorState, 
  useDoctorActions,
  dashboardData,
  navigationItems 
} from './doctorUtils';

const DoctorDashboard = ({ user, onLogout }) => {
  // Get state and state setters
  const {
    // State values
    activePage,
    timeRange,
    appointmentFilter,
    patientSearch,
    earningFilter,
    showProfileModal,
    showNotificationsModal,
    showMessagesModal,
    showLogoutConfirm,
    consultationDetails,
    userProfile,
    notifications,
    appointments,
    patientMessages,
    selectedPatient,
    formErrors,
    
    // State setters
    setActivePage,
    setTimeRange,
    setAppointmentFilter,
    setPatientSearch,
    setEarningFilter,
    setShowProfileModal,
    setShowNotificationsModal,
    setShowMessagesModal,
    setShowLogoutConfirm,
    setConsultationDetails,
    setUserProfile,
    setNotifications,
    setAppointments,
    setPatientNotes,
    setPatientMessages,
    setFormErrors,
    setSelectedPatient
  } = useDoctorState(user);

  // Get actions
  const actions = useDoctorActions({
    // Pass state values
    userProfile,
    appointments,
    patientMessages,
    patientNotes: {}, // You might need to add this to your state
    notifications,
    consultationDetails,
    formErrors,
    selectedPatient,
    
    // Pass state setters
    setUserProfile,
    setAppointments,
    setPatientMessages,
    setPatientNotes,
    setNotifications,
    setConsultationDetails,
    setFormErrors,
    setShowMessagesModal,
    setSelectedPatient,
    setShowProfileModal,
    setShowNotificationsModal,
    setShowLogoutConfirm
  });

  const {
    getUnreadMessagesCount,
    getUnreadNotificationsCount,
    handleStartConversation,
    handleMarkAsRead,
    handleSendMessage,
    handleStartConsultation,
    handleRescheduleAppointment,
    handleCancelAppointment,
    handleApproveAppointment,
    handleRejectAppointment,
    handleAddNotes,
    handleViewFullHistory,
    handleProfileUpdate,
    handleMarkNotificationAsRead,
    handleMarkAllNotificationsAsRead,
    handleClearAllNotifications,
    showNotification,
    validateForm
  } = actions;

  const renderMainContent = () => {
    const contentProps = {
      dashboardData,
      state: {
        activePage,
        timeRange,
        appointmentFilter,
        patientSearch,
        earningFilter,
        appointments,
        patientMessages,
        userProfile
      },
      actions: {
        // State setters
        setActivePage,
        setTimeRange,
        setAppointmentFilter,
        setPatientSearch,
        setEarningFilter,
        setConsultationDetails,
        
        // Action functions
        getUnreadMessagesCount,
        getUnreadNotificationsCount,
        handleStartConversation,
        handleStartConsultation,
        handleRescheduleAppointment,
        handleCancelAppointment,
        handleApproveAppointment,
        handleRejectAppointment,
        handleAddNotes,
        handleViewFullHistory
      }
    };

    switch (activePage) {
      case 'dashboard':
        return <DashboardContent {...contentProps} />;
      case 'appointments':
        return <AppointmentsContent {...contentProps} />;
      case 'patients':
        return <PatientsContent {...contentProps} />;
      case 'earnings':
        return <EarningsContent {...contentProps} />;
      case 'messages':
        return <MessagesContent {...contentProps} />;
      default:
        return <DashboardContent {...contentProps} />;
    }
  };

  return (
    <div style={styles.container}>
      <DoctorSidebar
        activePage={activePage}
        setActivePage={setActivePage}
        userProfile={userProfile}
        getUnreadMessagesCount={getUnreadMessagesCount}
        setShowProfileModal={setShowProfileModal}
        setShowLogoutConfirm={setShowLogoutConfirm}
        navigationItems={navigationItems}
      />

      <div style={styles.content}>
        <DoctorHeader
          activePage={activePage}
          userProfile={userProfile}
          getUnreadNotificationsCount={getUnreadNotificationsCount}
          setShowNotificationsModal={setShowNotificationsModal}
        />
        
        {renderMainContent()}
      </div>

      <DoctorModals
        state={{
          showProfileModal,
          showNotificationsModal,
          showMessagesModal,
          showLogoutConfirm,
          consultationDetails,
          userProfile,
          notifications,
          patientMessages,
          selectedPatient,
          formErrors
        }}
        actions={{
          setShowProfileModal,
          setShowNotificationsModal,
          setShowMessagesModal,
          setShowLogoutConfirm,
          setConsultationDetails,
          setUserProfile,
          setFormErrors,
          handleProfileUpdate,
          handleMarkNotificationAsRead,
          handleMarkAllNotificationsAsRead,
          handleClearAllNotifications,
          handleSendMessage,
          handleMarkAsRead,
          handleViewFullHistory,
          handleAddNotes,
          validateForm,
          handleStartConversation
        }}
        onLogout={onLogout}
        dashboardData={dashboardData}
      />
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#f8fafc',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
  },
  content: {
    flex: 1,
    marginLeft: '280px',
    padding: '0'
  }
};

export default DoctorDashboard;