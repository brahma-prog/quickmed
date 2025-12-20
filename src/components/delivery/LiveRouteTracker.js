import React, { useState, useEffect } from 'react';

const LiveRouteTracker = ({ deliveryData }) => {
  const [currentProgress, setCurrentProgress] = useState(0);
  const [isLive, setIsLive] = useState(true);
  const [trafficStatus, setTrafficStatus] = useState('Moderate');
  const [updateTime, setUpdateTime] = useState(new Date());

  // SVG Icons - Updated to use primary color
  const SVG = {
    Location: () => (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="#124441">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
      </svg>
    ),
    Time: () => (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="#124441">
        <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
      </svg>
    ),
    Traffic: () => (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="#124441">
        <path d="M18 20h-3v-2h3c1.65 0 3-1.35 3-3s-1.35-3-3-3h-3V8h3c2.76 0 5 2.24 5 5s-2.24 5-5 5zm-9 0H6c-1.65 0-3-1.35-3-3s1.35-3 3-3h3v2H6c-.55 0-1 .45-1 1s.45 1 1 1h3v2zM8 8c0-1.66 1.34-3 3-3s3 1.34 3 3-1.34 3-3 3-3-1.34-3-3z"/>
      </svg>
    ),
    Delivery: () => (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="#124441">
        <path d="M18 18.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5-1.5.67-1.5 1.5.67 1.5 1.5 1.5zM19.5 4H17V2H7v2H4.5C3.67 4 3 4.67 3 5.5v11c0 .83.67 1.5 1.5 1.5h.83c.32 1.25 1.48 2.17 2.83 2.17s2.51-.92 2.83-2.17h3.34c.32 1.25 1.48 2.17 2.83 2.17s2.51-.92 2.83-2.17h.84c.83 0 1.5-.67 1.5-1.5v-11c0-.83-.67-1.5-1.5-1.5zM5.5 15h13v-2h-13v2zm0-4h13V9h-13v2zm0-4h13V5h-13v2z"/>
      </svg>
    ),
    Start: () => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="#FFFFFF">
        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/>
        <circle cx="12" cy="12" r="5"/>
      </svg>
    ),
    Current: () => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="#FFFFFF">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 11.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
      </svg>
    ),
    End: () => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="#FFFFFF">
        <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z"/>
      </svg>
    ),
    Package: () => (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="#4F6F6B">
        <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
      </svg>
    ),
    Refresh: () => (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="#FFFFFF">
        <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
      </svg>
    ),
    Play: () => (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="#FFFFFF">
        <path d="M8 5v14l11-7z"/>
      </svg>
    ),
    Pause: () => (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="#FFFFFF">
        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
      </svg>
    )
  };

  const vizagLocations = {
    pickupPoints: [
      'Dwaraka Nagar',
      'MVP Colony',
      'Rushikonda',
      'Gajuwaka',
      'Madhurawada',
      'Akkayyapalem'
    ],
    deliveryPoints: [
      'Beach Road',
      'Jagadamba Centre',
      'Simhachalam',
      'Anakapalle',
      'NAD Junction',
      'Santhoshnagar'
    ],
    landmarks: [
      'RK Beach',
      'Kailasagiri',
      'Vizag Port',
      'INS Kursura',
      'TU 142 Museum',
      'Vuda Park'
    ]
  };

  const styles = {
    container: {
      backgroundColor: '#FFFFFF',
      borderRadius: '10px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      border: '1px solid #E0F2F1',
      overflow: 'hidden',
      margin: '0 auto',
      maxWidth: '400px',
      fontFamily: 'Arial, sans-serif',
      fontSize: '13px'
    },
    header: {
      padding: '12px 16px',
      borderBottom: '1px solid #E0F2F1',
      background: 'linear-gradient(135deg, #009688 0%, #4DB6AC 100%)',
      color: 'white'
    },
    titleRow: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '6px'
    },
    title: {
      fontSize: '16px',
      fontWeight: '600',
      margin: 0,
      display: 'flex',
      alignItems: 'center',
      gap: '6px'
    },
    vizagTag: {
      background: 'rgba(255,255,255,0.2)',
      padding: '2px 6px',
      borderRadius: '4px',
      fontSize: '10px',
      fontWeight: '500'
    },
    liveBadge: {
      background: '#FF4081',
      color: 'white',
      padding: '4px 8px',
      borderRadius: '12px',
      fontSize: '10px',
      fontWeight: '600',
      display: 'flex',
      alignItems: 'center',
      gap: '4px'
    },
    pulseDot: {
      width: '6px',
      height: '6px',
      background: 'white',
      borderRadius: '50%',
      animation: 'pulse 1.5s infinite'
    },
    statsRow: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '10px',
      fontSize: '11px',
      color: 'rgba(255,255,255,0.9)'
    },
    statItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '4px'
    },
    routeSection: {
      padding: '16px',
      background: '#E0F2F1'
    },
    routePath: {
      position: 'relative',
      marginBottom: '16px'
    },
    routeLine: {
      position: 'absolute',
      left: '18px',
      top: '20px',
      bottom: '20px',
      width: '1px',
      background: '#4DB6AC',
      zIndex: 1
    },
    locationItem: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '12px',
      marginBottom: '12px',
      position: 'relative',
      zIndex: 2
    },
    iconWrapper: {
      width: '36px',
      height: '36px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      zIndex: 2
    },
    startIcon: {
      background: '#009688',
      color: 'white'
    },
    currentIcon: {
      background: '#4DB6AC',
      color: 'white',
      animation: 'bounce 2s infinite'
    },
    endIcon: {
      background: '#124441',
      color: 'white'
    },
    locationContent: {
      flex: 1,
      background: 'white',
      padding: '10px 12px',
      borderRadius: '6px',
      border: '1px solid #E0F2F1',
      boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
    },
    locationLabel: {
      fontSize: '10px',
      color: '#4F6F6B',
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: '0.3px',
      marginBottom: '2px'
    },
    locationText: {
      fontSize: '12px',
      color: '#124441',
      fontWeight: '600',
      lineHeight: '1.3'
    },
    locationMeta: {
      fontSize: '10px',
      color: '#009688',
      marginTop: '2px'
    },
    progressSection: {
      margin: '16px 0',
      padding: '12px',
      background: 'white',
      borderRadius: '8px',
      border: '1px solid #E0F2F1'
    },
    progressHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '8px'
    },
    progressLabel: {
      fontSize: '12px',
      color: '#124441',
      fontWeight: '600'
    },
    progressValue: {
      fontSize: '14px',
      color: '#009688',
      fontWeight: '700'
    },
    progressBar: {
      height: '8px',
      background: '#E0F2F1',
      borderRadius: '4px',
      overflow: 'hidden',
      marginBottom: '6px'
    },
    progressFill: {
      height: '100%',
      background: 'linear-gradient(90deg, #4DB6AC 0%, #009688 100%)',
      borderRadius: '4px',
      transition: 'width 0.5s ease',
      position: 'relative'
    },
    marker: {
      position: 'absolute',
      right: '-4px',
      top: '50%',
      transform: 'translateY(-50%)',
      width: '16px',
      height: '16px',
      background: '#009688',
      borderRadius: '50%',
      border: '2px solid white',
      boxShadow: '0 0 0 2px #009688'
    },
    progressScale: {
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: '10px',
      color: '#4F6F6B',
      marginTop: '2px'
    },
    infoGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '10px',
      marginTop: '16px'
    },
    infoCard: {
      background: 'white',
      padding: '10px 12px',
      borderRadius: '6px',
      border: '1px solid #E0F2F1'
    },
    infoHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      fontSize: '10px',
      color: '#4F6F6B',
      fontWeight: '600',
      marginBottom: '4px'
    },
    infoValue: {
      fontSize: '14px',
      color: '#124441',
      fontWeight: '700',
      lineHeight: '1.2'
    },
    infoSub: {
      fontSize: '10px',
      color: '#4F6F6B',
      marginTop: '1px'
    },
    footer: {
      background: '#E0F2F1',
      padding: '10px 16px',
      borderTop: '1px solid #B2DFDB',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    updateStatus: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontSize: '11px',
      color: '#009688',
      fontWeight: '600'
    },
    updateDot: {
      width: '6px',
      height: '6px',
      background: '#009688',
      borderRadius: '50%',
      animation: 'pulse 1s infinite'
    },
    lastUpdate: {
      fontSize: '10px',
      color: '#4F6F6B',
      marginLeft: '8px'
    },
    actionButtons: {
      display: 'flex',
      gap: '8px'
    },
    button: {
      padding: '5px 12px',
      background: '#009688',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      fontSize: '11px',
      fontWeight: '600',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      transition: 'background 0.2s'
    }
  };

  // CSS animations
  const animationStyle = `
    @keyframes pulse {
      0% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.5; transform: scale(1.1); }
      100% { opacity: 1; transform: scale(1); }
    }
    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-3px); }
    }
  `;

  // Simulate progress
  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      setCurrentProgress(prev => {
        if (prev >= 100) {
          setIsLive(false);
          return 100;
        }
        return Math.min(prev + (Math.random() * 2 + 1), 100);
      });
      
      const levels = ['Clear', 'Moderate', 'Heavy'];
      setTrafficStatus(levels[Math.floor(Math.random() * levels.length)]);
      setUpdateTime(new Date());
    }, 3000);

    return () => clearInterval(interval);
  }, [isLive]);

  const getRandomLocation = (type) => {
    const locations = vizagLocations[type];
    return locations[Math.floor(Math.random() * locations.length)];
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleRefresh = () => {
    setCurrentProgress(0);
    setIsLive(true);
    setUpdateTime(new Date());
  };

  return (
    <>
      <style>{animationStyle}</style>
      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.titleRow}>
            <h3 style={styles.title}>
              <SVG.Delivery /> Vizag Route
              <span style={styles.vizagTag}>AP</span>
            </h3>
            {isLive && (
              <div style={styles.liveBadge}>
                <span style={styles.pulseDot}></span>
                LIVE
              </div>
            )}
          </div>
          <div style={styles.statsRow}>
            <div style={styles.statItem}>
              <SVG.Location />
              <span>Visakhapatnam</span>
            </div>
            <div style={styles.statItem}>
              <SVG.Time />
              <span>{formatTime(updateTime)}</span>
            </div>
            <div style={styles.statItem}>
              <SVG.Traffic />
              <span style={{
                color: trafficStatus === 'Clear' ? '#4CAF50' : 
                       trafficStatus === 'Heavy' ? '#FF5722' : '#009688'
              }}>
                {trafficStatus}
              </span>
            </div>
          </div>
        </div>

        {/* Route */}
        <div style={styles.routeSection}>
          <div style={styles.routePath}>
            <div style={styles.routeLine}></div>
            
            {/* Start */}
            <div style={styles.locationItem}>
              <div style={{...styles.iconWrapper, ...styles.startIcon}}>
                <SVG.Start />
              </div>
              <div style={styles.locationContent}>
                <div style={styles.locationLabel}>Pickup</div>
                <div style={styles.locationText}>{getRandomLocation('pickupPoints')}</div>
                <div style={styles.locationMeta}>9:00 AM</div>
              </div>
            </div>

            {/* Current */}
            <div style={styles.locationItem}>
              <div style={{...styles.iconWrapper, ...styles.currentIcon}}>
                <SVG.Current />
              </div>
              <div style={styles.locationContent}>
                <div style={styles.locationLabel}>Current</div>
                <div style={styles.locationText}>{getRandomLocation('landmarks')}</div>
                <div style={styles.locationMeta}>Arrived 5 mins ago</div>
              </div>
            </div>

            {/* End */}
            <div style={styles.locationItem}>
              <div style={{...styles.iconWrapper, ...styles.endIcon}}>
                <SVG.End />
              </div>
              <div style={styles.locationContent}>
                <div style={styles.locationLabel}>Delivery</div>
                <div style={styles.locationText}>{getRandomLocation('deliveryPoints')}</div>
                <div style={styles.locationMeta}>ETA: 25 mins</div>
              </div>
            </div>
          </div>

          {/* Progress */}
          <div style={styles.progressSection}>
            <div style={styles.progressHeader}>
              <div style={styles.progressLabel}>Route Progress</div>
              <div style={styles.progressValue}>{Math.round(currentProgress)}%</div>
            </div>
            <div style={styles.progressBar}>
              <div style={{...styles.progressFill, width: `${currentProgress}%`}}>
                <div style={styles.marker}></div>
              </div>
            </div>
            <div style={styles.progressScale}>
              <span>Start</span>
              <span>50%</span>
              <span>Complete</span>
            </div>
          </div>

          {/* Info Grid */}
          <div style={styles.infoGrid}>
            <div style={styles.infoCard}>
              <div style={styles.infoHeader}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="#4F6F6B">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                Distance
              </div>
              <div style={styles.infoValue}>18.5 km</div>
              <div style={styles.infoSub}>Via Beach Road</div>
            </div>
            <div style={styles.infoCard}>
              <div style={styles.infoHeader}>
                <SVG.Time />
                Duration
              </div>
              <div style={styles.infoValue}>45 min</div>
              <div style={styles.infoSub}>Est. arrival 9:45</div>
            </div>
            <div style={styles.infoCard}>
              <div style={styles.infoHeader}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="#4F6F6B">
                  <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5H15V3H9v2H6.5c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
                </svg>
                Vehicle
              </div>
              <div style={styles.infoValue}>Tata Ace</div>
              <div style={styles.infoSub}>AP31 TC 1234</div>
            </div>
            <div style={styles.infoCard}>
              <div style={styles.infoHeader}>
                <SVG.Package />
                Packages
              </div>
              <div style={styles.infoValue}>12/15</div>
              <div style={styles.infoSub}>3 remaining</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={styles.footer}>
          <div>
            <div style={styles.updateStatus}>
              <span style={styles.updateDot}></span>
              {isLive ? 'Live tracking' : 'Tracking paused'}
              <span style={styles.lastUpdate}>
                {formatTime(updateTime)}
              </span>
            </div>
          </div>
          <div style={styles.actionButtons}>
            <button 
              style={styles.button}
              onClick={handleRefresh}
            >
              <SVG.Refresh /> Refresh
            </button>
            <button 
              style={{
                ...styles.button,
                background: isLive ? '#FF5722' : '#009688'
              }}
              onClick={() => setIsLive(!isLive)}
            >
              {isLive ? <><SVG.Pause /> Pause</> : <><SVG.Play /> Resume</>}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LiveRouteTracker;