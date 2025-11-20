import React, { useState, useEffect } from 'react';

const Reviews = ({ onWriteReview, reviews: propReviews }) => {
  const [reviews, setReviews] = useState([]);
  const [showAllReviews, setShowAllReviews] = useState(false);

  // Use propReviews if provided, otherwise load from localStorage
  useEffect(() => {
    if (propReviews && propReviews.length > 0) {
      setReviews(propReviews);
    } else {
      const savedReviews = localStorage.getItem('quickmed-reviews');
      if (savedReviews) {
        setReviews(JSON.parse(savedReviews));
      } else {
        // Initialize with default reviews if none exist
        const defaultReviews = [
          {
            id: 1,
            name: 'Rahul Sharma',
            rating: 5,
            date: '2024-01-15',
            comment: 'QuickMed saved me during my emergency! The medicine delivery was super fast - received within 25 minutes. Highly recommended!',
            avatar: 'RS'
          },
          {
            id: 2,
            name: 'Priya Patel',
            rating: 4,
            date: '2024-01-12',
            comment: 'Excellent service! The doctor consultation was smooth and the medicine reached within 30 minutes as promised.',
            avatar: 'PP'
          },
          {
            id: 3,
            name: 'Ankit Verma',
            rating: 5,
            date: '2024-01-10',
            comment: 'Best healthcare app I have used. The live tracking feature is amazing and the doctors are very professional.',
            avatar: 'AV'
          },
          {
            id: 4,
            name: 'Sneha Reddy',
            rating: 5,
            date: '2024-01-08',
            comment: '24/7 doctor consultation is a lifesaver! Got immediate help for my child fever at midnight.',
            avatar: 'SR'
          },
          {
            id: 5,
            name: 'Vikram Singh',
            rating: 4,
            date: '2024-01-05',
            comment: 'Great platform for medicine delivery. The delivery executive was very professional and polite.',
            avatar: 'VS'
          },
          {
            id: 6,
            name: 'Meera Joshi',
            rating: 5,
            date: '2024-01-03',
            comment: 'The OTC products section is very comprehensive. Found all my regular health supplements easily.',
            avatar: 'MJ'
          }
        ];
        setReviews(defaultReviews);
        localStorage.setItem('quickmed-reviews', JSON.stringify(defaultReviews));
      }
    }
  }, [propReviews]);

  // Save reviews to localStorage whenever reviews change
  useEffect(() => {
    if (reviews.length > 0) {
      localStorage.setItem('quickmed-reviews', JSON.stringify(reviews));
    }
  }, [reviews]);

  // Calculate rating statistics
  const calculateRatingStats = () => {
    const totalReviews = reviews.length;
    const averageRating = totalReviews > 0 
      ? (reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews).toFixed(1)
      : '0.0';
    
    const ratingDistribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach(review => {
      ratingDistribution[review.rating]++;
    });

    const ratingBars = [5, 4, 3, 2, 1].map(stars => ({
      stars,
      percentage: totalReviews > 0 ? Math.round((ratingDistribution[stars] / totalReviews) * 100) : 0,
      count: ratingDistribution[stars]
    }));

    return { averageRating, ratingBars, totalReviews };
  };

  const { averageRating, ratingBars, totalReviews } = calculateRatingStats();

  // Get reviews to display (show first 6 by default, or all if showAllReviews is true)
  const displayedReviews = showAllReviews ? reviews : reviews.slice(0, 6);

  const styles = {
    reviews: {
      padding: '5rem 2rem',
      backgroundColor: 'white',
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
    },
    sectionTitle: {
      fontSize: '3rem',
      textAlign: 'center',
      marginBottom: '1rem',
      color: '#7C2A62',
      fontWeight: '700',
    },
    sectionSubtitle: {
      fontSize: '1.2rem',
      textAlign: 'center',
      marginBottom: '4rem',
      color: '#666',
      maxWidth: '600px',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    ratingSummary: {
      display: 'grid',
      gridTemplateColumns: '1fr 2fr',
      gap: '3rem',
      marginBottom: '4rem',
      padding: '3rem',
      backgroundColor: '#f8f9fa',
      borderRadius: '20px',
    },
    overallRating: {
      textAlign: 'center',
      padding: '2rem',
    },
    overallScore: {
      fontSize: '4rem',
      fontWeight: 'bold',
      color: '#7C2A62',
      margin: '0 0 1rem 0',
    },
    starsLarge: {
      fontSize: '2rem',
      marginBottom: '1rem',
    },
    ratingCount: {
      color: '#666',
      fontSize: '1.1rem',
    },
    ratingBreakdown: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
    },
    ratingBar: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
    },
    barContainer: {
      flex: 1,
      height: '8px',
      backgroundColor: '#e8e8e8',
      borderRadius: '4px',
      overflow: 'hidden',
    },
    barFill: {
      height: '100%',
      backgroundColor: '#7C2A62',
    },
    reviewsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
      gap: '2rem',
      marginBottom: '3rem',
    },
    reviewsGridScrollable: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
      gap: '2rem',
      marginBottom: '3rem',
      maxHeight: '600px',
      overflowY: 'auto',
      padding: '1rem',
    },
    reviewCard: {
      padding: '2rem',
      backgroundColor: '#f8f9fa',
      borderRadius: '15px',
      boxShadow: '0 5px 20px rgba(124, 42, 98, 0.1)',
      transition: 'all 0.3s ease',
      position: 'relative',
    },
    newReviewBadge: {
      position: 'absolute',
      top: '1rem',
      right: '1rem',
      backgroundColor: '#4CAF50',
      color: 'white',
      padding: '0.3rem 0.8rem',
      borderRadius: '12px',
      fontSize: '0.7rem',
      fontWeight: 'bold',
    },
    reviewHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '1.5rem',
      position: 'relative',
      paddingRight: '70px', // Add padding to prevent overlap with NEW badge
    },
    reviewerInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
    },
    avatar: {
      width: '50px',
      height: '50px',
      borderRadius: '50%',
      backgroundColor: '#F7D9EB',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 'bold',
      color: '#7C2A62',
      fontSize: '1rem',
    },
    reviewerName: {
      margin: '0 0 0.5rem 0',
      color: '#333',
      fontSize: '1.2rem',
      fontWeight: '600',
    },
    reviewStars: {
      color: '#FFD700',
      fontSize: '1rem',
    },
    reviewDate: {
      color: '#666',
      fontSize: '0.9rem',
      textAlign: 'right',
      minWidth: '120px',
    },
    reviewComment: {
      color: '#333',
      lineHeight: '1.6',
      fontSize: '1rem',
      margin: 0,
    },
    viewMoreButton: {
      padding: '1rem 2rem',
      backgroundColor: 'transparent',
      border: '2px solid #7C2A62',
      borderRadius: '25px',
      cursor: 'pointer',
      fontSize: '1rem',
      fontWeight: 'bold',
      color: '#7C2A62',
      transition: 'all 0.3s ease',
      margin: '0 auto 3rem',
      display: 'block',
    },
    addReviewSection: {
      textAlign: 'center',
      padding: '3rem',
      backgroundColor: '#F7D9EB',
      borderRadius: '20px',
    },
    addReviewTitle: {
      fontSize: '2rem',
      marginBottom: '1rem',
      color: '#7C2A62',
      fontWeight: '600',
    },
    addReviewText: {
      color: '#666',
      marginBottom: '2rem',
      fontSize: '1.1rem',
      maxWidth: '500px',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    addReviewButton: {
      padding: '1rem 2.5rem',
      backgroundColor: '#7C2A62',
      border: 'none',
      borderRadius: '25px',
      cursor: 'pointer',
      fontSize: '1.1rem',
      fontWeight: 'bold',
      color: 'white',
      transition: 'all 0.3s ease',
    },
    scrollIndicator: {
      textAlign: 'center',
      color: '#7C2A62',
      fontSize: '0.9rem',
      marginBottom: '1rem',
      fontStyle: 'italic',
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        // Filled star (golden)
        stars.push(
          <span key={i} style={{ color: '#fffdf3ff', fontSize: 'inherit' }}>
            ⭐
          </span>
        );
      } else {
        // Empty star (gray)
        stars.push(
          <span key={i} style={{ color: '#DDDDDD', fontSize: 'inherit' }}>
            ☆
          </span>
        );
      }
    }
    return <div style={{ display: 'inline-block' }}>{stars}</div>;
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const isNewReview = (reviewDate) => {
    const reviewDateObj = new Date(reviewDate);
    const currentDate = new Date();
    const diffTime = Math.abs(currentDate - reviewDateObj);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7; // Consider reviews from last 7 days as new
  };

  return (
    <section style={styles.reviews}>
      <div style={styles.container}>
        <h2 style={styles.sectionTitle}>
          Patient Reviews
        </h2>
        <p style={styles.sectionSubtitle}>
          See what our patients say about their experience with QuickMed
        </p>

        {/* Rating Summary Section */}
        <div style={styles.ratingSummary}>
          <div style={styles.overallRating}>
            <div style={styles.overallScore}>{averageRating}</div>
            <div style={styles.starsLarge}>
              {renderStars(Math.round(parseFloat(averageRating)))}
            </div>
            <div style={styles.ratingCount}>Based on {totalReviews} reviews</div>
          </div>
          <div style={styles.ratingBreakdown}>
            {ratingBars.map((bar, index) => (
              <div key={index} style={styles.ratingBar}>
                <span>{bar.stars} stars</span>
                <div style={styles.barContainer}>
                  <div style={{...styles.barFill, width: `${bar.percentage}%`}}></div>
                </div>
                <span>{bar.count} ({bar.percentage}%)</span>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews Grid */}
        {showAllReviews && reviews.length > 6 && (
          <div style={styles.scrollIndicator}>
            Scroll to view all {reviews.length} reviews ↓
          </div>
        )}
        
        <div style={showAllReviews ? styles.reviewsGridScrollable : styles.reviewsGrid}>
          {displayedReviews.map((review) => (
            <div
              key={review.id}
              style={styles.reviewCard}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(124, 42, 98, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 5px 20px rgba(124, 42, 98, 0.1)';
              }}
            >
              {isNewReview(review.date) && (
                <div style={styles.newReviewBadge}>NEW</div>
              )}
              
              <div style={styles.reviewHeader}>
                <div style={styles.reviewerInfo}>
                  <div style={styles.avatar}>{review.avatar}</div>
                  <div>
                    <h4 style={styles.reviewerName}>{review.name}</h4>
                    <div style={styles.reviewStars}>{renderStars(review.rating)}</div>
                  </div>
                </div>
                <span style={styles.reviewDate}>{formatDate(review.date)}</span>
              </div>
              <p style={styles.reviewComment}>{review.comment}</p>
            </div>
          ))}
        </div>

        {/* View More/Less Button */}
        {reviews.length > 6 && (
          <button
            style={styles.viewMoreButton}
            onClick={() => setShowAllReviews(!showAllReviews)}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#7C2A62';
              e.target.style.color = 'white';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.color = '#7C2A62';
            }}
          >
            {showAllReviews ? `Show Less (Viewing ${reviews.length} reviews)` : `View All Reviews (${reviews.length} total)`}
          </button>
        )}

        {/* Add Review Section */}
        <div style={styles.addReviewSection}>
          <h3 style={styles.addReviewTitle}>Share Your Experience</h3>
          <p style={styles.addReviewText}>
            Help others make informed decisions about their healthcare
          </p>
          <button
            style={styles.addReviewButton}
            onClick={onWriteReview}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#5a1a4a';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#7C2A62';
            }}
          >
            Write a Review
          </button>
        </div>
      </div>
    </section>
  );
};

export default Reviews;