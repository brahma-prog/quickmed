import React, { useState, useEffect } from 'react';

const SupportDisputesDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [cases, setCases] = useState([]);
  const [filteredCases, setFilteredCases] = useState([]);
  const [selectedCase, setSelectedCase] = useState(null);
  const [showCaseDetail, setShowCaseDetail] = useState(false);
  const [newNote, setNewNote] = useState('');

  // Mock data - replace with actual API calls
  const mockCases = [
    {
      id: 'C-4823',
      caseId: 'C-4823',
      user: 'John Wilson',
      userId: 'U12345',
      orderId: '10052',
      phone: '+1-555-0123',
      issue: 'Damaged Medicine',
      description: 'Customer received damaged medicine package. The seal was broken and some tablets were crushed.',
      status: 'Pending Review',
      createdAt: '2024-01-15T10:30:00Z',
      evidence: ['image1.jpg', 'image2.jpg'],
      orderDetails: {
        products: ['Paracetamol 500mg', 'Vitamin C tablets'],
        pharmacy: 'MedPlus',
        deliveryAgent: 'Rider-456',
        amount: '$24.99'
      },
      timeline: [
        { event: 'Order Placed', time: '2024-01-14T09:00:00Z' },
        { event: 'Packed', time: '2024-01-14T10:15:00Z' },
        { event: 'Dispatched', time: '2024-01-14T11:30:00Z' },
        { event: 'Delivered', time: '2024-01-14T14:45:00Z' }
      ],
      contactLogs: [
        { type: 'Chat', time: '2024-01-15T10:35:00Z', summary: 'Customer reported issue' }
      ],
      internalNotes: [
        { staff: 'Admin User', time: '2024-01-15T11:00:00Z', note: 'Initial review pending' }
      ]
    },
    {
      id: 'C-4835',
      caseId: 'C-4835',
      user: 'Kaha Rao',
      userId: 'U12346',
      orderId: '10050',
      phone: '+1-555-0124',
      issue: 'Late Delivery',
      description: 'Order delivered 3 hours later than promised delivery time.',
      status: 'Refund Requested',
      createdAt: '2024-01-14T16:20:00Z',
      evidence: [],
      orderDetails: {
        products: ['Aspirin 75mg'],
        pharmacy: 'PharmaEasy',
        deliveryAgent: 'Rider-789',
        amount: '$12.50'
      },
      timeline: [
        { event: 'Order Placed', time: '2024-01-14T13:00:00Z' },
        { event: 'Packed', time: '2024-01-14T13:45:00Z' },
        { event: 'Dispatched', time: '2024-01-14T14:30:00Z' },
        { event: 'Delivered', time: '2024-01-14T18:15:00Z' }
      ],
      contactLogs: [
        { type: 'Call', time: '2024-01-14T17:30:00Z', summary: 'Customer complained about delay' }
      ],
      internalNotes: [
        { staff: 'Support Agent', time: '2024-01-14T17:45:00Z', note: 'Verified delivery timestamp - confirmed delay' }
      ]
    },
    {
      id: 'C-4821',
      caseId: 'C-4821',
      user: 'Ali Khan',
      userId: 'U12347',
      orderId: '10059',
      phone: '+1-555-0125',
      issue: 'Incorrect Item',
      description: 'Received wrong medication. Ordered Amoxicillin but received Azithromycin.',
      status: 'In Review',
      createdAt: '2024-01-13T09:15:00Z',
      evidence: ['prescription.jpg', 'received_item.jpg'],
      orderDetails: {
        products: ['Amoxicillin 250mg'],
        pharmacy: 'HealthMart',
        deliveryAgent: 'Rider-123',
        amount: '$18.75'
      },
      timeline: [
        { event: 'Order Placed', time: '2024-01-12T15:30:00Z' },
        { event: 'Packed', time: '2024-01-12T16:15:00Z' },
        { event: 'Dispatched', time: '2024-01-12T17:00:00Z' },
        { event: 'Delivered', time: '2024-01-12T19:30:00Z' }
      ],
      contactLogs: [
        { type: 'Chat', time: '2024-01-13T09:20:00Z', summary: 'Customer reported wrong item received' },
        { type: 'Call', time: '2024-01-13T14:00:00Z', summary: 'Follow-up call with pharmacy' }
      ],
      internalNotes: [
        { staff: 'Support Manager', time: '2024-01-13T10:00:00Z', note: 'Contacted pharmacy for verification' },
        { staff: 'Pharmacy Manager', time: '2024-01-13T14:30:00Z', note: 'Confirmed packing error from our end' }
      ]
    }
  ];

  useEffect(() => {
    // Simulate API call
    setCases(mockCases);
    setFilteredCases(mockCases);
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = cases.filter(caseItem =>
        caseItem.caseId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        caseItem.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
        caseItem.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        caseItem.phone.includes(searchTerm)
      );
      setFilteredCases(filtered);
    } else {
      setFilteredCases(cases);
    }
  }, [searchTerm, cases]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleViewCase = (caseItem) => {
    setSelectedCase(caseItem);
    setShowCaseDetail(true);
  };

  const handleOpenRefund = (caseItem) => {
    // Simulate moving case to refunds dashboard
    const updatedCases = cases.map(c =>
      c.id === caseItem.id ? { ...c, status: 'Refund Requested' } : c
    );
    setCases(updatedCases);
    alert(`Case ${caseItem.caseId} moved to Refunds Dashboard`);
  };

  const handleAddNote = (caseItem) => {
    if (newNote.trim()) {
      const updatedCases = cases.map(c =>
        c.id === caseItem.id ? {
          ...c,
          internalNotes: [
            ...c.internalNotes,
            {
              staff: 'Current Admin',
              time: new Date().toISOString(),
              note: newNote
            }
          ]
        } : c
      );
      setCases(updatedCases);
      setNewNote('');
      alert('Note added successfully');
    }
  };

  const handleRequestRefund = () => {
    if (selectedCase) {
      handleOpenRefund(selectedCase);
      setShowCaseDetail(false);
    }
  };

  const handleRequestReplacement = () => {
    if (selectedCase) {
      // Implement replacement logic
      alert(`Replacement requested for order ${selectedCase.orderId}`);
    }
  };

  const handleCloseCase = () => {
    if (selectedCase) {
      const updatedCases = cases.map(c =>
        c.id === selectedCase.id ? { ...c, status: 'Resolved' } : c
      );
      setCases(updatedCases);
      setShowCaseDetail(false);
      alert(`Case ${selectedCase.caseId} closed`);
    }
  };

  const maskPhoneNumber = (phone) => {
    return phone.replace(/(\d{3})-(\d{3})-(\d{2})/, 'XXX-XXX-$3');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending Review': return '#FFA500';
      case 'Refund Requested': return '#FF6B6B';
      case 'In Review': return '#4ECDC4';
      case 'Resolved': return '#45B7D1';
      default: return '#95A5A6';
    }
  };

  if (showCaseDetail && selectedCase) {
    return (
      <div style={{ padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2>Case Details: {selectedCase.caseId}</h2>
          <button
            onClick={() => setShowCaseDetail(false)}
            style={{
              padding: '8px 16px',
              backgroundColor: '#7C2A62',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            ← Back to Cases
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
          {/* Left Column - Main Content */}
          <div>
            {/* Customer Message */}
            <div style={{ backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '5px', marginBottom: '20px' }}>
              <h4>Customer Message</h4>
              <p>{selectedCase.description}</p>
            </div>

            {/* Evidence */}
            {selectedCase.evidence.length > 0 && (
              <div style={{ marginBottom: '20px' }}>
                <h4>Uploaded Evidence</h4>
                <div style={{ display: 'flex', gap: '10px' }}>
                  {selectedCase.evidence.map((evidence, index) => (
                    <div key={index} style={{
                      padding: '10px',
                      border: '1px solid #ddd',
                      borderRadius: '5px',
                      backgroundColor: '#f8f9fa'
                    }}>
                      📎 {evidence}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Order Information */}
            <div style={{ marginBottom: '20px' }}>
              <h4>Order Information</h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div><strong>Order ID:</strong> {selectedCase.orderId}</div>
                <div><strong>Amount:</strong> {selectedCase.orderDetails.amount}</div>
                <div><strong>Pharmacy:</strong> {selectedCase.orderDetails.pharmacy}</div>
                <div><strong>Delivery Agent:</strong> {selectedCase.orderDetails.deliveryAgent}</div>
              </div>
              <div style={{ marginTop: '10px' }}>
                <strong>Products:</strong>
                <ul>
                  {selectedCase.orderDetails.products.map((product, index) => (
                    <li key={index}>{product}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Timeline */}
            <div style={{ marginBottom: '20px' }}>
              <h4>Order Timeline</h4>
              <div style={{ borderLeft: '2px solid #7C2A62', paddingLeft: '15px' }}>
                {selectedCase.timeline.map((event, index) => (
                  <div key={index} style={{ marginBottom: '10px' }}>
                    <strong>{event.event}</strong>
                    <div style={{ fontSize: '12px', color: '#666' }}>
                      {new Date(event.time).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Actions and Logs */}
          <div>
            {/* Actions */}
            <div style={{ backgroundColor: '#F7D9EB', padding: '15px', borderRadius: '5px', marginBottom: '20px' }}>
              <h4>Case Actions</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <button
                  onClick={handleRequestRefund}
                  style={{
                    padding: '10px',
                    backgroundColor: '#7C2A62',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer'
                  }}
                >
                  Request Refund
                </button>
                <button
                  onClick={handleRequestReplacement}
                  style={{
                    padding: '10px',
                    backgroundColor: '#45B7D1',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer'
                  }}
                >
                  Request Replacement
                </button>
                <button
                  onClick={handleCloseCase}
                  style={{
                    padding: '10px',
                    backgroundColor: '#95A5A6',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer'
                  }}
                >
                  Close Case
                </button>
              </div>
            </div>

            {/* Contact Logs */}
            <div style={{ marginBottom: '20px' }}>
              <h4>Contact Logs</h4>
              {selectedCase.contactLogs.map((log, index) => (
                <div key={index} style={{
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '5px',
                  marginBottom: '5px',
                  fontSize: '14px'
                }}>
                  <strong>{log.type}:</strong> {log.summary}
                  <div style={{ fontSize: '12px', color: '#666' }}>
                    {new Date(log.time).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>

            {/* Internal Notes */}
            <div>
              <h4>Internal Notes</h4>
              <div style={{ marginBottom: '10px' }}>
                <textarea
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Add internal note..."
                  style={{
                    width: '100%',
                    height: '60px',
                    padding: '8px',
                    border: '1px solid #ddd',
                    borderRadius: '5px',
                    fontSize: '14px'
                  }}
                />
                <button
                  onClick={() => handleAddNote(selectedCase)}
                  style={{
                    width: '100%',
                    padding: '8px',
                    backgroundColor: '#7C2A62',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    marginTop: '5px'
                  }}
                >
                  Add Note
                </button>
              </div>
              {selectedCase.internalNotes.map((note, index) => (
                <div key={index} style={{
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '5px',
                  marginBottom: '5px',
                  fontSize: '14px'
                }}>
                  <div><strong>{note.staff}:</strong> {note.note}</div>
                  <div style={{ fontSize: '12px', color: '#666' }}>
                    {new Date(note.time).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Support & Disputes</h2>
      
      {/* Search Bar */}
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Search Case ID / User / Order ID / Phone"
          value={searchTerm}
          onChange={handleSearch}
          style={{
            width: '100%',
            padding: '12px',
            border: '1px solid #ddd',
            borderRadius: '8px',
            fontSize: '16px'
          }}
        />
      </div>

      {/* Cases Table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'white' }}>
          <thead>
            <tr style={{ backgroundColor: '#7C2A62', color: 'white' }}>
              <th style={{ padding: '12px', textAlign: 'left' }}>Case ID</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>User</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Order ID</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Issue</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Status</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredCases.map((caseItem) => (
              <tr key={caseItem.id} style={{ borderBottom: '1px solid #ddd' }}>
                <td style={{ padding: '12px' }}>{caseItem.caseId}</td>
                <td style={{ padding: '12px' }}>
                  <div>{caseItem.user}</div>
                  <div style={{ fontSize: '12px', color: '#666' }}>
                    {maskPhoneNumber(caseItem.phone)}
                  </div>
                </td>
                <td style={{ padding: '12px' }}>{caseItem.orderId}</td>
                <td style={{ padding: '12px' }}>{caseItem.issue}</td>
                <td style={{ padding: '12px' }}>
                  <span style={{
                    padding: '4px 8px',
                    borderRadius: '12px',
                    backgroundColor: getStatusColor(caseItem.status),
                    color: 'white',
                    fontSize: '12px'
                  }}>
                    {caseItem.status}
                  </span>
                </td>
                <td style={{ padding: '12px' }}>
                  <div style={{ display: 'flex', gap: '5px' }}>
                    <button
                      onClick={() => handleViewCase(caseItem)}
                      style={{
                        padding: '6px 12px',
                        backgroundColor: '#7C2A62',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '12px'
                      }}
                    >
                      View Case
                    </button>
                    {caseItem.status === 'Pending Review' && (
                      <button
                        onClick={() => handleOpenRefund(caseItem)}
                        style={{
                          padding: '6px 12px',
                          backgroundColor: '#FF6B6B',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '12px'
                        }}
                      >
                        Open Refund
                      </button>
                    )}
                    <button
                      onClick={() => handleAddNote(caseItem)}
                      style={{
                        padding: '6px 12px',
                        backgroundColor: '#45B7D1',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '12px'
                      }}
                    >
                      Add Notes
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {filteredCases.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
            No cases found matching your search criteria.
          </div>
        )}
      </div>
    </div>
  );
};

export default SupportDisputesDashboard;