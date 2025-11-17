import React from 'react';
import { styles } from './Styles';

const LiveTrackingView = ({
  trackingOrder,
  deliveryPartner,
  setActiveView,
  callDeliveryPartner,
  getDeliveryStatusText,
  getDeliveryProgress
}) => {
  const BackButton = ({ onClick, text = 'Back' }) => (
    <button 
      style={styles.backButton}
      onClick={onClick}
      type="button"
    >
      ← {text}
    </button>
  );

  return (
    <div style={styles.liveTrackingContainer}>
      <div style={styles.trackingHeader}>
        <BackButton onClick={() => setActiveView('orders')} text="Back to Orders" />
        <h2 style={styles.trackingTitle}>Live Order Tracking</h2>
        <p style={styles.trackingSubtitle}>Order #{trackingOrder?.id}</p>
      </div>

      <div style={styles.trackingContent}>
        <div style={styles.mapContainer}>
          <iframe
            src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d248756.11675378976!2d77.4651372271771!3d12.953945987030732!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v${Date.now()}!5m2!1sen!2sin`}
            width="100%"
            height="100%"
            style={{ border: 0, borderRadius: '15px' }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Live Order Tracking Map"
          ></iframe>
        </div>

        <div style={styles.trackingSidebar}>
          <div style={styles.deliveryInfo}>
            <h3 style={styles.sidebarTitle}>Delivery Information</h3>
            
            <div style={styles.progressSection}>
              <div style={styles.progressBar}>
                <div 
                  style={{
                    ...styles.progressFill,
                    width: `${getDeliveryProgress(deliveryPartner.status)}%`
                  }}
                ></div>
              </div>
              <div style={styles.progressLabels}>
                <span>Order Placed</span>
                <span>On the Way</span>
                <span>Delivered</span>
              </div>
            </div>

            <div style={styles.statusCard}>
              <div style={styles.currentStatus}>
                <span style={styles.statusLabel}>Current Status:</span>
                <span style={styles.statusValue}>
                  {getDeliveryStatusText(deliveryPartner.status)}
                </span>
              </div>
              <div style={styles.eta}>
                <span style={styles.etaLabel}>Estimated Time:</span>
                <span style={styles.etaValue}>{deliveryPartner.estimatedTime}</span>
              </div>
            </div>

            <div style={styles.deliveryPartner}>
              <h4 style={styles.partnerTitle}>Delivery Partner</h4>
              <div style={styles.partnerInfo}>
                <div style={styles.partnerAvatar}>
                  {deliveryPartner.name.charAt(0)}
                </div>
                <div style={styles.partnerDetails}>
                  <p style={styles.partnerName}>{deliveryPartner.name}</p>
                  <p style={styles.partnerVehicle}>
                    {deliveryPartner.vehicle} • {deliveryPartner.vehicleNumber}
                  </p>
                  <div style={styles.partnerRating}>
                    ⭐ {deliveryPartner.rating}
                  </div>
                </div>
              </div>
              <button 
                style={styles.callButton}
                onClick={callDeliveryPartner}
                type="button"
              >
                📞 Call Delivery Partner
              </button>
            </div>

            <div style={styles.orderSummary}>
              <h4 style={styles.summaryTitleText}>Order Summary</h4>
              {trackingOrder.items.map((item, index) => (
                <div key={index} style={styles.orderSummaryItem}>
                  <span>{item.name}</span>
                  <span>Qty: {item.quantity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveTrackingView;