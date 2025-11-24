import React from 'react';

const LiveRouteTracker = ({ deliveryData, isOnline }) => {
  const styles = {
    liveRouteContainer: {
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      border: '1px solid #e5e7eb',
      overflow: 'hidden',
      marginBottom: '20px'
    },
    routeHeader: {
      padding: '16px 20px',
      borderBottom: '1px solid #e5e7eb',
      backgroundColor: '#f8fafc',
    },
    routeTitle: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '8px',
    },
    mapTitle: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#1f2937',
      margin: 0,
    },
    liveBadge: {
      backgroundColor: '#EF4444',
      color: 'white',
      padding: '4px 8px',
      borderRadius: '12px',
      fontSize: '10px',
      fontWeight: '600',
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
    },
    livePulse: {
      width: '6px',
      height: '6px',
      backgroundColor: 'white',
      borderRadius: '50%',
      animation: 'pulse 1.5s infinite'
    },
    routeStats: {
      display: 'flex',
      gap: '16px',
      fontSize: '12px',
      color: '#6b7280',
      flexWrap: 'wrap',
    },
    routeStat: {
      fontWeight: '500'
    },
    routeVisualization: {
      padding: '20px',
    },
    routePath: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px'
    },
    routeStart: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
    },
    routeEnd: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
    },
    locationPin: {
      fontSize: '20px',
      flexShrink: 0,
    },
    locationInfo: {
      flex: 1
    },
    routeLocationLabel: {
      fontSize: '12px',
      color: '#6b7280',
      fontWeight: '500',
      marginBottom: '2px',
    },
    routeLocationText: {
      fontSize: '14px',
      color: '#1f2937',
      fontWeight: '500',
    },
    progressBar: {
      height: '4px',
      backgroundColor: '#e5e7eb',
      borderRadius: '2px',
      position: 'relative',
      margin: '8px 0 8px 32px',
    },
    progressFill: {
      height: '100%',
      backgroundColor: '#10B981',
      borderRadius: '2px',
      transition: 'width 0.5s ease',
      position: 'relative'
    },
    progressMarker: {
      position: 'absolute',
      right: '0',
      top: '50%',
      transform: 'translateY(-50%)',
      width: '12px',
      height: '12px',
      backgroundColor: '#10B981',
      borderRadius: '50%',
      border: '2px solid white',
      boxShadow: '0 0 0 2px #10B981'
    },
    trafficInfo: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '12px 20px',
      backgroundColor: '#f8fafc',
      borderTop: '1px solid #e5e7eb',
    },
    trafficStatus: {
      display: 'flex',
      gap: '8px',
      fontSize: '12px',
    },
    trafficLabel: {
      color: '#6b7280'
    },
    trafficValue: {
      fontWeight: '600'
    },
    activeDeliveries: {
      display: 'flex',
      gap: '8px',
      fontSize: '12px',
    },
    deliveryLabel: {
      color: '#6b7280'
    },
    deliveryValue: {
      fontWeight: '600',
      color: '#7C2A62'
    },
    realTimeUpdates: {
      padding: '8px 20px',
      backgroundColor: '#f0f9ff',
      borderTop: '1px solid #e0f2fe',
    },
    updateIndicator: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontSize: '11px',
      color: '#0369a1',
      fontWeight: '500',
    },
    updateDot: {
      width: '6px',
      height: '6px',
      backgroundColor: '#0369a1',
      borderRadius: '50%'
    },
    offlineMessage: {
      padding: '40px 20px',
      textAlign: 'center',
      color: '#6b7280',
      backgroundColor: '#f8fafc',
    }
  };

  // Mobile responsive styles
  const mobileStyles = {
    liveRouteContainer: {
      ...styles.liveRouteContainer,
      marginBottom: '16px'
    },
    routeHeader: {
      ...styles.routeHeader,
      padding: '12px 16px'
    },
    routeTitle: {
      ...styles.routeTitle,
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: '8px'
    },
    mapTitle: {
      ...styles.mapTitle,
      fontSize: '16px'
    },
    liveBadge: {
      ...styles.liveBadge,
      fontSize: '9px'
    },
    routeStats: {
      ...styles.routeStats,
      gap: '12px'
    },
    routeVisualization: {
      ...styles.routeVisualization,
      padding: '16px'
    },
    routeStart: {
      ...styles.routeStart,
      gap: '8px'
    },
    routeEnd: {
      ...styles.routeEnd,
      gap: '8px'
    },
    locationPin: {
      ...styles.locationPin,
      fontSize: '18px'
    },
    routeLocationLabel: {
      ...styles.routeLocationLabel,
      fontSize: '11px'
    },
    routeLocationText: {
      ...styles.routeLocationText,
      fontSize: '13px'
    },
    progressBar: {
      ...styles.progressBar,
      marginLeft: '28px'
    },
    trafficInfo: {
      ...styles.trafficInfo,
      flexDirection: 'column',
      gap: '8px',
      padding: '12px 16px'
    },
    trafficStatus: {
      ...styles.trafficStatus,
      fontSize: '11px'
    },
    activeDeliveries: {
      ...styles.activeDeliveries,
      fontSize: '11px'
    },
    realTimeUpdates: {
      ...styles.realTimeUpdates,
      padding: '8px 16px'
    },
    updateIndicator: {
      ...styles.updateIndicator,
      fontSize: '10px'
    }
  };

  const isMobile = window.innerWidth < 768;
  const currentStyles = isMobile ? mobileStyles : styles;

  // For demo purposes, using the first in-progress task or a default
  const activeTask = deliveryData.assignedTasks.find(task => task.status === 'in-progress') || 
                    deliveryData.assignedTasks[0] || 
                    deliveryData.pendingTasks[0];

  const progress = activeTask ? activeTask.routeProgress : 0;
  const currentLocation = activeTask ? activeTask.currentLocation : 'Sector 18, Noida';
  const nextLocation = activeTask ? activeTask.deliveryLocation : 'Next pickup location';

  if (!isOnline) {
    return (
      <div style={currentStyles.liveRouteContainer}>
        <div style={currentStyles.offlineMessage}>
          <p>Go online to view live route tracking</p>
        </div>
      </div>
    );
  }

  return (
    <div style={currentStyles.liveRouteContainer}>
      <div style={currentStyles.routeHeader}>
        <div style={currentStyles.routeTitle}>
          <h3 style={currentStyles.mapTitle}>Live Delivery Route</h3>
          <span style={currentStyles.liveBadge}>
            <span style={currentStyles.livePulse}></span>
            LIVE
          </span>
        </div>
        <div style={currentStyles.routeStats}>
          <span style={currentStyles.routeStat}>Progress: {Math.round(progress)}%</span>
          <span style={currentStyles.routeStat}>ETA: {activeTask?.estimatedTime || '15 mins'}</span>
        </div>
      </div>

      <div style={currentStyles.routeVisualization}>
        <div style={currentStyles.routePath}>
          <div style={currentStyles.routeStart}>
            <div style={currentStyles.locationPin}>📍</div>
            <div style={currentStyles.locationInfo}>
              <div style={currentStyles.routeLocationLabel}>Current Location</div>
              <div style={currentStyles.routeLocationText}>{currentLocation}</div>
            </div>
          </div>

          <div style={currentStyles.progressBar}>
            <div
              style={{
                ...currentStyles.progressFill,
                width: `${progress}%`
              }}
            ></div>
            <div style={currentStyles.progressMarker}></div>
          </div>

          <div style={currentStyles.routeEnd}>
            <div style={currentStyles.locationPin}>🏁</div>
            <div style={currentStyles.locationInfo}>
              <div style={currentStyles.routeLocationLabel}>Next Destination</div>
              <div style={currentStyles.routeLocationText}>{nextLocation}</div>
            </div>
          </div>
        </div>
      </div>

      <div style={currentStyles.trafficInfo}>
        <div style={currentStyles.trafficStatus}>
          <span style={currentStyles.trafficLabel}>Traffic:</span>
          <span style={currentStyles.trafficValue}>
            Moderate
          </span>
        </div>
        <div style={currentStyles.activeDeliveries}>
          <span style={currentStyles.deliveryLabel}>Active Deliveries:</span>
          <span style={currentStyles.deliveryValue}>
            {deliveryData.assignedTasks.filter(task => task.status === 'in-progress').length}
          </span>
        </div>
      </div>

      <div style={currentStyles.realTimeUpdates}>
        <div style={currentStyles.updateIndicator}>
          <span style={currentStyles.updateDot}></span>
          Updating in real-time
        </div>
      </div>
    </div>
  );
};

export default LiveRouteTracker;