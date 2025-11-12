import React from 'react';

const MessagesContent = ({ state, actions, dashboardData }) => {
  const { patientMessages } = state;
  const { getUnreadMessagesCount, handleStartConversation, handleViewFullHistory } = actions;

  const formatMessageTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  const conversations = Object.entries(patientMessages)
    .map(([patientName, messages]) => {
      const lastMessage = messages[messages.length - 1];
      const unreadCount = messages.filter(msg => msg.from === 'patient' && !msg.read).length;
      const patient = dashboardData.patients.find(p => p.name === patientName);

      return {
        patientName,
        patient,
        lastMessage,
        unreadCount,
        timestamp: lastMessage.timestamp
      };
    })
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  return (
    <div style={styles.mainContent}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.greeting}>Messages</h1>
          <p style={styles.subtitle}>Communicate with your patients</p>
        </div>
        <div style={styles.messagesStats}>
          <div style={styles.messageStat}>
            <span style={styles.messageStatNumber}>{getUnreadMessagesCount()}</span>
            <span style={styles.messageStatLabel}>Unread Messages</span>
          </div>
          <div style={styles.messageStat}>
            <span style={styles.messageStatNumber}>{Object.keys(patientMessages).length}</span>
            <span style={styles.messageStatLabel}>Active Conversations</span>
          </div>
        </div>
      </div>

      <div style={styles.messagesOverview}>
        <div style={styles.conversationsGrid}>
          {conversations.map((conversation) => (
            <div key={conversation.patientName} style={styles.conversationCard}>
              <div style={styles.conversationCardHeader}>
                <div style={styles.conversationCardAvatar}>
                  👤
                  {conversation.unreadCount > 0 && (
                    <span style={styles.unreadBadge}>
                      {conversation.unreadCount}
                    </span>
                  )}
                </div>
                <div style={styles.conversationCardInfo}>
                  <h4 style={styles.conversationCardName}>{conversation.patientName}</h4>
                  <p style={styles.conversationCardLastMessage}>
                    {conversation.lastMessage.message}
                  </p>
                </div>
                <span style={styles.conversationCardTime}>
                  {formatMessageTime(conversation.timestamp)}
                </span>
              </div>
              <div style={styles.conversationCardActions}>
                <button 
                  style={styles.primaryButton}
                  onClick={() => {
                    if (conversation.patient) {
                      handleStartConversation(conversation.patient);
                    }
                  }}
                >
                  Open Chat
                </button>
                <button 
                  style={styles.secondaryButton}
                  onClick={() => handleViewFullHistory(conversation.patientName)}
                >
                  View History
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const styles = {
  mainContent: {
    padding: '30px'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '30px'
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
  messagesStats: {
    display: 'flex',
    gap: '20px'
  },
  messageStat: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '16px 24px',
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  },
  messageStatNumber: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#7C2A62',
    marginBottom: '4px'
  },
  messageStatLabel: {
    fontSize: '14px',
    color: '#6b7280'
  },
  messagesOverview: {
    marginTop: '20px'
  },
  conversationsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
    gap: '20px'
  },
  conversationCard: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    border: '1px solid #e5e7eb'
  },
  conversationCardHeader: {
    display: 'flex',
    alignItems: 'flex-start',
    marginBottom: '16px'
  },
  conversationCardAvatar: {
    position: 'relative',
    fontSize: '32px',
    marginRight: '12px'
  },
  conversationCardInfo: {
    flex: 1
  },
  conversationCardName: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#1f2937',
    margin: '0 0 4px 0'
  },
  conversationCardLastMessage: {
    fontSize: '14px',
    color: '#6b7280',
    margin: 0,
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden'
  },
  conversationCardTime: {
    fontSize: '12px',
    color: '#9CA3AF'
  },
  conversationCardActions: {
    display: 'flex',
    gap: '8px'
  },
  primaryButton: {
    backgroundColor: '#7C2A62',
    color: 'white',
    border: 'none',
    padding: '10px 16px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer'
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    color: '#7C2A62',
    border: '2px solid #7C2A62',
    padding: '8px 16px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer'
  },
  unreadBadge: {
    position: 'absolute',
    top: '-2px',
    right: '-2px',
    backgroundColor: '#EF4444',
    color: 'white',
    borderRadius: '8px',
    padding: '1px 6px',
    fontSize: '10px',
    fontWeight: '600',
    minWidth: '16px',
    textAlign: 'center'
  }
};

export default MessagesContent;