import React, { useState, useEffect } from 'react';

const ReviewsManagement = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock data - replace with actual API calls
  const mockReviews = [
    {
      id: 1,
      user: 'John Doe',
      rating: 5,
      comment: 'Excellent service! Quick delivery and genuine medicines.',
      date: '2024-01-15',
      status: 'pending',
      userType: 'Customer'
    },
    {
      id: 2,
      user: 'Sarah Smith',
      rating: 4,
      comment: 'Good experience overall. Would recommend to others.',
      date: '2024-01-14',
      status: 'approved',
      userType: 'Customer'
    },
    {
      id: 3,
      user: 'Mike Johnson',
      rating: 3,
      comment: 'Average service. Delivery was a bit delayed.',
      date: '2024-01-13',
      status: 'rejected',
      userType: 'Customer'
    },
    {
      id: 4,
      user: 'Dr. Robert Brown',
      rating: 5,
      comment: 'Great platform for telemedicine consultations.',
      date: '2024-01-12',
      status: 'pending',
      userType: 'Doctor'
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setReviews(mockReviews);
      setLoading(false);
    }, 1000);
  }, []);

  const handleApprove = (reviewId) => {
    setReviews(reviews.map(review => 
      review.id === reviewId ? { ...review, status: 'approved' } : review
    ));
    // Here you would make an API call to update the review status
  };

  const handleReject = (reviewId) => {
    setReviews(reviews.map(review => 
      review.id === reviewId ? { ...review, status: 'rejected' } : review
    ));
    // Here you would make an API call to update the review status
  };

  const getStatusBadge = (status) => {
    const statusColors = {
      pending: '#FFA500',
      approved: '#28A745',
      rejected: '#DC3545'
    };
    
    return (
      <span style={{
        padding: '4px 8px',
        borderRadius: '12px',
        fontSize: '12px',
        fontWeight: 'bold',
        backgroundColor: statusColors[status],
        color: 'white'
      }}>
        {status.toUpperCase()}
      </span>
    );
  };

  const getRatingStars = (rating) => {
    return '⭐'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  const pendingReviews = reviews.filter(review => review.status === 'pending');
  const approvedReviews = reviews.filter(review => review.status === 'approved');
  const rejectedReviews = reviews.filter(review => review.status === 'rejected');

  if (loading) {
    return <div>Loading reviews...</div>;
  }

  return (
    <div>
      <h2>Reviews Management</h2>
      <p>Approve or reject user reviews before they appear on the homepage</p>
      
      {/* Statistics */}
      <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
        <div style={{
          padding: '20px',
          backgroundColor: '#FFF3CD',
          borderRadius: '8px',
          flex: 1,
          textAlign: 'center'
        }}>
          <h3 style={{ margin: 0, color: '#856404' }}>{pendingReviews.length}</h3>
          <p style={{ margin: 0, color: '#856404' }}>Pending Reviews</p>
        </div>
        <div style={{
          padding: '20px',
          backgroundColor: '#D4EDDA',
          borderRadius: '8px',
          flex: 1,
          textAlign: 'center'
        }}>
          <h3 style={{ margin: 0, color: '#155724' }}>{approvedReviews.length}</h3>
          <p style={{ margin: 0, color: '#155724' }}>Approved Reviews</p>
        </div>
        <div style={{
          padding: '20px',
          backgroundColor: '#F8D7DA',
          borderRadius: '8px',
          flex: 1,
          textAlign: 'center'
        }}>
          <h3 style={{ margin: 0, color: '#721C24' }}>{rejectedReviews.length}</h3>
          <p style={{ margin: 0, color: '#721C24' }}>Rejected Reviews</p>
        </div>
      </div>

      {/* Pending Reviews Section */}
      <div style={{ marginBottom: '30px' }}>
        <h3>Pending Approval ({pendingReviews.length})</h3>
        {pendingReviews.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#6C757D', padding: '20px' }}>
            No pending reviews for approval
          </p>
        ) : (
          pendingReviews.map(review => (
            <div key={review.id} style={{
              border: '1px solid #DEE2E6',
              borderRadius: '8px',
              padding: '15px',
              marginBottom: '15px',
              backgroundColor: '#F8F9FA'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                <div>
                  <strong>{review.user}</strong>
                  <span style={{ 
                    marginLeft: '10px', 
                    padding: '2px 6px', 
                    backgroundColor: '#E9ECEF', 
                    borderRadius: '4px',
                    fontSize: '12px'
                  }}>
                    {review.userType}
                  </span>
                  <div style={{ marginTop: '5px' }}>
                    {getRatingStars(review.rating)}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '12px', color: '#6C757D' }}>{review.date}</div>
                  {getStatusBadge(review.status)}
                </div>
              </div>
              <p style={{ margin: '10px 0' }}>{review.comment}</p>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <button
                  onClick={() => handleApprove(review.id)}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#28A745',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Approve
                </button>
                <button
                  onClick={() => handleReject(review.id)}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#DC3545',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Reject
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Approved Reviews Section */}
      <div style={{ marginBottom: '30px' }}>
        <h3>Approved Reviews ({approvedReviews.length})</h3>
        {approvedReviews.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#6C757D', padding: '20px' }}>
            No approved reviews yet
          </p>
        ) : (
          approvedReviews.map(review => (
            <div key={review.id} style={{
              border: '1px solid #D4EDDA',
              borderRadius: '8px',
              padding: '15px',
              marginBottom: '15px',
              backgroundColor: '#F8FFF9'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <strong>{review.user}</strong>
                  <span style={{ 
                    marginLeft: '10px', 
                    padding: '2px 6px', 
                    backgroundColor: '#E9ECEF', 
                    borderRadius: '4px',
                    fontSize: '12px'
                  }}>
                    {review.userType}
                  </span>
                  <div style={{ marginTop: '5px' }}>
                    {getRatingStars(review.rating)}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '12px', color: '#6C757D' }}>{review.date}</div>
                  {getStatusBadge(review.status)}
                </div>
              </div>
              <p style={{ margin: '10px 0' }}>{review.comment}</p>
            </div>
          ))
        )}
      </div>

      {/* Rejected Reviews Section */}
      <div>
        <h3>Rejected Reviews ({rejectedReviews.length})</h3>
        {rejectedReviews.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#6C757D', padding: '20px' }}>
            No rejected reviews
          </p>
        ) : (
          rejectedReviews.map(review => (
            <div key={review.id} style={{
              border: '1px solid #F8D7DA',
              borderRadius: '8px',
              padding: '15px',
              marginBottom: '15px',
              backgroundColor: '#FFF5F5'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <strong>{review.user}</strong>
                  <span style={{ 
                    marginLeft: '10px', 
                    padding: '2px 6px', 
                    backgroundColor: '#E9ECEF', 
                    borderRadius: '4px',
                    fontSize: '12px'
                  }}>
                    {review.userType}
                  </span>
                  <div style={{ marginTop: '5px' }}>
                    {getRatingStars(review.rating)}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '12px', color: '#6C757D' }}>{review.date}</div>
                  {getStatusBadge(review.status)}
                </div>
              </div>
              <p style={{ margin: '10px 0' }}>{review.comment}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ReviewsManagement;