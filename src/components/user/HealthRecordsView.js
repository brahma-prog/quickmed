import React, { useState } from 'react';

const HealthRecordsView = ({ healthRecords, addHealthRecord, setActiveView }) => {
  const [activeTab, setActiveTab] = useState('conditions');

  const BackButton = ({ onClick, text = 'Back' }) => (
    <button 
      style={{
        padding: '0.5rem 1rem',
        backgroundColor: 'transparent',
        color: '#009688',
        border: '1px solid #009688',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '0.9rem',
        transition: 'all 0.3s ease'
      }}
      onClick={onClick}
      type="button"
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = '#E0F2F1';
        e.currentTarget.style.transform = 'translateY(-1px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'transparent';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      ← {text}
    </button>
  );

  const styles = {
    container: {
      padding: '20px',
      maxWidth: '1200px',
      margin: '0 auto',
      marginTop: '120px',
      minHeight: 'calc(100vh - 120px)',
      width: '100%',
      boxSizing: 'border-box',
      backgroundColor: '#FFFFFF'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '2rem',
      flexWrap: 'wrap',
      gap: '1rem',
      paddingBottom: '1.5rem',
      borderBottom: '1px solid #E0F2F1'
    },
    title: {
      color: '#124441',
      fontSize: '2rem',
      margin: '0 0 0.5rem 0',
      fontWeight: '700',
      textAlign: 'center',
      flex: 1
    },
    subtitle: {
      color: '#4F6F6B',
      margin: 0,
      fontSize: '1rem',
      textAlign: 'center'
    },
    tabs: {
      display: 'flex',
      gap: '1rem',
      marginBottom: '2rem',
      flexWrap: 'wrap'
    },
    tab: {
      padding: '0.75rem 1.5rem',
      backgroundColor: '#FFFFFF',
      color: '#4F6F6B',
      border: '1px solid #E0F2F1',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '0.9rem',
      fontWeight: '600',
      transition: 'all 0.3s ease',
      textTransform: 'capitalize',
      ':hover': {
        borderColor: '#009688',
        backgroundColor: '#E0F2F1',
        transform: 'translateY(-2px)'
      }
    },
    activeTab: {
      backgroundColor: '#009688',
      color: '#FFFFFF',
      borderColor: '#009688',
      boxShadow: '0 2px 4px rgba(0, 150, 136, 0.2)'
    },
    contentSection: {
      backgroundColor: '#FFFFFF',
      borderRadius: '12px',
      padding: '2rem',
      boxShadow: '0 2px 15px rgba(18, 68, 65, 0.08)',
      border: '1px solid #E0F2F1',
      minHeight: '400px',
      transition: 'all 0.3s ease'
    },
    sectionTitle: {
      color: '#124441',
      marginBottom: '1.5rem',
      fontSize: '1.3rem',
      fontWeight: '600',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    recordCard: {
      padding: '1.25rem',
      border: '1px solid #E0F2F1',
      borderRadius: '10px',
      marginBottom: '1rem',
      backgroundColor: '#FFFFFF',
      transition: 'all 0.3s ease',
      boxShadow: '0 1px 3px rgba(18, 68, 65, 0.04)',
      ':hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 4px 12px rgba(18, 68, 65, 0.08)',
        borderColor: '#4DB6AC'
      }
    },
    recordTitle: {
      margin: '0 0 0.5rem 0',
      color: '#124441',
      fontSize: '1.1rem',
      fontWeight: '600'
    },
    recordText: {
      margin: '0 0 0.5rem 0',
      color: '#4F6F6B',
      fontSize: '0.9rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    statusBadge: {
      display: 'inline-block',
      padding: '0.25rem 0.75rem',
      borderRadius: '15px',
      fontSize: '0.8rem',
      fontWeight: '500',
      marginLeft: '0.5rem',
      transition: 'all 0.3s ease'
    },
    normalStatus: {
      backgroundColor: '#E0F2F1',
      color: '#065f46',
      border: '1px solid #4DB6AC'
    },
    severeStatus: {
      backgroundColor: '#fee2e2',
      color: '#991b1b',
      border: '1px solid #fca5a5'
    },
    mildStatus: {
      backgroundColor: '#fef3c7',
      color: '#92400e',
      border: '1px solid #fde68a'
    },
    emptyState: {
      textAlign: 'center',
      padding: '3rem 1rem',
      color: '#4F6F6B'
    },
    emptyIcon: {
      fontSize: '3rem',
      marginBottom: '1rem',
      opacity: 0.5,
      color: '#009688'
    },
    addButton: {
      backgroundColor: '#009688',
      color: '#FFFFFF',
      border: 'none',
      padding: '0.75rem 1.5rem',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '0.9rem',
      fontWeight: '500',
      marginTop: '1rem',
      transition: 'all 0.3s ease',
      ':hover': {
        backgroundColor: '#00796B',
        transform: 'translateY(-2px)',
        boxShadow: '0 2px 8px rgba(0, 150, 136, 0.3)'
      }
    },
    addSampleButton: {
      backgroundColor: '#4DB6AC',
      color: '#FFFFFF',
      border: 'none',
      padding: '0.75rem 1.5rem',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '0.9rem',
      fontWeight: '500',
      marginTop: '1rem',
      transition: 'all 0.3s ease',
      ':hover': {
        backgroundColor: '#26A69A',
        transform: 'translateY(-2px)',
        boxShadow: '0 2px 8px rgba(77, 182, 172, 0.3)'
      }
    }
  };

  const renderContent = () => {
    const records = healthRecords[activeTab] || [];
    
    if (records.length === 0) {
      return (
        <div style={styles.emptyState}>
          <div style={styles.emptyIcon}>
            {activeTab === 'conditions' && '🏥'}
            {activeTab === 'labResults' && '🧪'}
            {activeTab === 'vitals' && '📊'}
            {activeTab === 'allergies' && '⚠️'}
            {activeTab === 'surgical' && '🔪'}
          </div>
          <h3 style={{ color: '#124441', marginBottom: '0.5rem' }}>
            No {activeTab === 'conditions' ? 'medical conditions' : 
                     activeTab === 'labResults' ? 'lab results' :
                     activeTab === 'vitals' ? 'vital signs' :
                     activeTab === 'allergies' ? 'allergies' : 'surgical history'} found
          </h3>
          <p style={{ color: '#4F6F6B', marginBottom: '1rem' }}>
            Add your first record to start tracking your health history
          </p>
          <button 
            style={styles.addSampleButton}
            onClick={() => {
              const sampleRecord = {
                id: Date.now(),
                ...(activeTab === 'conditions' && {
                  condition: 'Sample Condition',
                  diagnosedDate: new Date().toISOString().split('T')[0],
                  status: 'Active',
                  severity: 'Mild',
                  treatment: 'Sample treatment'
                }),
                ...(activeTab === 'labResults' && {
                  test: 'Sample Test',
                  result: 'Normal',
                  date: new Date().toISOString().split('T')[0],
                  status: 'Normal',
                  lab: 'Sample Lab'
                }),
                ...(activeTab === 'vitals' && {
                  type: 'Sample Vital',
                  value: 'Normal',
                  date: new Date().toISOString().split('T')[0],
                  status: 'Normal'
                }),
                ...(activeTab === 'allergies' && {
                  allergen: 'Sample Allergen',
                  severity: 'Mild',
                  reaction: 'Sample reaction',
                  diagnosed: new Date().toISOString().split('T')[0]
                }),
                ...(activeTab === 'surgical' && {
                  procedure: 'Sample Procedure',
                  date: new Date().toISOString().split('T')[0],
                  hospital: 'Sample Hospital',
                  surgeon: 'Dr. Sample'
                })
              };
              addHealthRecord(activeTab, sampleRecord);
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#26A69A';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#4DB6AC';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            + Add Sample Record
          </button>
        </div>
      );
    }

    return (
      <div>
        <h3 style={styles.sectionTitle}>
          {activeTab === 'conditions' ? '🏥 Medical Conditions' :
           activeTab === 'labResults' ? '🧪 Lab Results' :
           activeTab === 'vitals' ? '📊 Vital Signs' :
           activeTab === 'allergies' ? '⚠️ Allergies' : '🔪 Surgical History'}
          <span style={{ 
            fontSize: '0.9rem', 
            color: '#4F6F6B', 
            marginLeft: '0.5rem',
            fontWeight: 'normal' 
          }}>
            ({records.length} records)
          </span>
        </h3>
        
        {records.map(record => (
          <div key={record.id} style={styles.recordCard}>
            {activeTab === 'conditions' && (
              <>
                <h4 style={styles.recordTitle}>{record.condition}</h4>
                <p style={styles.recordText}>
                  <span style={{ fontWeight: '600', color: '#124441', minWidth: '100px' }}>Diagnosed:</span>
                  {record.diagnosedDate}
                </p>
                <p style={styles.recordText}>
                  <span style={{ fontWeight: '600', color: '#124441', minWidth: '100px' }}>Status:</span>
                  {record.status}
                  <span style={{
                    ...styles.statusBadge,
                    ...(record.severity === 'Severe' ? styles.severeStatus : 
                        record.severity === 'Mild' ? styles.mildStatus : styles.normalStatus)
                  }}>
                    {record.severity}
                  </span>
                </p>
                <p style={styles.recordText}>
                  <span style={{ fontWeight: '600', color: '#124441', minWidth: '100px' }}>Treatment:</span>
                  {record.treatment}
                </p>
              </>
            )}
            
            {activeTab === 'labResults' && (
              <>
                <h4 style={styles.recordTitle}>{record.test}</h4>
                <p style={styles.recordText}>
                  <span style={{ fontWeight: '600', color: '#124441', minWidth: '80px' }}>Result:</span>
                  {record.result}
                </p>
                <p style={styles.recordText}>
                  <span style={{ fontWeight: '600', color: '#124441', minWidth: '80px' }}>Status:</span>
                  <span style={{
                    ...styles.statusBadge,
                    ...styles.normalStatus
                  }}>
                    {record.status}
                  </span>
                </p>
                <p style={styles.recordText}>
                  <span style={{ fontWeight: '600', color: '#124441', minWidth: '80px' }}>Lab:</span>
                  {record.lab}
                </p>
                <p style={styles.recordText}>
                  <span style={{ fontWeight: '600', color: '#124441', minWidth: '80px' }}>Date:</span>
                  {record.date}
                </p>
              </>
            )}
            
            {activeTab === 'vitals' && (
              <>
                <h4 style={styles.recordTitle}>{record.type}</h4>
                <p style={styles.recordText}>
                  <span style={{ fontWeight: '600', color: '#124441', minWidth: '80px' }}>Value:</span>
                  {record.value}
                </p>
                <p style={styles.recordText}>
                  <span style={{ fontWeight: '600', color: '#124441', minWidth: '80px' }}>Status:</span>
                  <span style={{
                    ...styles.statusBadge,
                    ...styles.normalStatus
                  }}>
                    {record.status}
                  </span>
                </p>
                <p style={styles.recordText}>
                  <span style={{ fontWeight: '600', color: '#124441', minWidth: '80px' }}>Date:</span>
                  {record.date}
                </p>
              </>
            )}
            
            {activeTab === 'allergies' && (
              <>
                <h4 style={styles.recordTitle}>{record.allergen}</h4>
                <p style={styles.recordText}>
                  <span style={{ fontWeight: '600', color: '#124441', minWidth: '80px' }}>Severity:</span>
                  <span style={{
                    ...styles.statusBadge,
                    ...(record.severity === 'Severe' ? styles.severeStatus : styles.mildStatus)
                  }}>
                    {record.severity}
                  </span>
                </p>
                <p style={styles.recordText}>
                  <span style={{ fontWeight: '600', color: '#124441', minWidth: '80px' }}>Reaction:</span>
                  {record.reaction}
                </p>
                <p style={styles.recordText}>
                  <span style={{ fontWeight: '600', color: '#124441', minWidth: '80px' }}>Diagnosed:</span>
                  {record.diagnosed}
                </p>
              </>
            )}
            
            {activeTab === 'surgical' && (
              <>
                <h4 style={styles.recordTitle}>{record.procedure}</h4>
                <p style={styles.recordText}>
                  <span style={{ fontWeight: '600', color: '#124441', minWidth: '80px' }}>Date:</span>
                  {record.date}
                </p>
                <p style={styles.recordText}>
                  <span style={{ fontWeight: '600', color: '#124441', minWidth: '80px' }}>Hospital:</span>
                  {record.hospital}
                </p>
                <p style={styles.recordText}>
                  <span style={{ fontWeight: '600', color: '#124441', minWidth: '80px' }}>Surgeon:</span>
                  {record.surgeon}
                </p>
              </>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <BackButton onClick={() => setActiveView('dashboard')} text="Dashboard" />
        
        <div style={{ textAlign: 'center', flex: 1 }}>
          <h1 style={styles.title}>Health Records</h1>
          <p style={styles.subtitle}>Complete medical history and health documents</p>
        </div>

        <div style={{ width: '140px' }}>
          <button 
            style={{
              ...styles.addButton,
              padding: '0.5rem 1rem',
              fontSize: '0.8rem',
              width: '100%'
            }}
            onClick={() => {
              alert('Add new record functionality would open a form here');
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#00796B';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#009688';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            + Add Record
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div style={styles.tabs}>
        {['conditions', 'labResults', 'vitals', 'allergies', 'surgical'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              ...styles.tab,
              ...(activeTab === tab ? styles.activeTab : {})
            }}
            type="button"
            onMouseEnter={(e) => {
              if (activeTab !== tab) {
                e.currentTarget.style.borderColor = '#009688';
                e.currentTarget.style.backgroundColor = '#E0F2F1';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }
            }}
            onMouseLeave={(e) => {
              if (activeTab !== tab) {
                e.currentTarget.style.borderColor = '#E0F2F1';
                e.currentTarget.style.backgroundColor = '#FFFFFF';
                e.currentTarget.style.transform = 'translateY(0)';
              }
            }}
          >
            {tab === 'conditions' ? ' Medical Conditions' :
             tab === 'labResults' ? ' Lab Results' :
             tab === 'vitals' ? '📊 Vital Signs' :
             tab === 'allergies' ? '⚠️ Allergies' : '🔪 Surgical History'}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={styles.contentSection}>
        {renderContent()}
      </div>
    </div>
  );
};

export default HealthRecordsView;