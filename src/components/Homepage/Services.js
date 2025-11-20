
import React, { useState } from 'react';

const Services = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const styles = {
    services: {
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
    },
    servicesGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '2rem',
    },
    serviceCard: {
      padding: '2.5rem',
      backgroundColor: 'white',
      borderRadius: '20px',
      boxShadow: '0 5px 20px rgba(124, 42, 98, 0.1)',
      textAlign: 'center',
      transition: 'all 0.3s ease',
      border: '2px solid transparent',
    },
    serviceIcon: {
      fontSize: '4rem',
      marginBottom: '1.5rem',
    },
    serviceTitle: {
      fontSize: '1.5rem',
      marginBottom: '1rem',
      color: '#7C2A62',
      fontWeight: '600',
    },
    serviceDescription: {
      color: '#666',
      lineHeight: '1.6',
      marginBottom: '2rem',
    },
    serviceFeatures: {
      listStyle: 'none',
      padding: '0',
      margin: '1.5rem 0',
      textAlign: 'left',
    },
    serviceFeatureItem: {
      padding: '0.5rem 0',
      color: '#555',
      fontSize: '0.95rem',
      position: 'relative',
      paddingLeft: '1.5rem',
    },
    featureBullet: {
      position: 'absolute',
      left: '0',
      color: '#7C2A62',
      fontWeight: 'bold',
    },
    learnMoreButton: {
      padding: '0.8rem 1.5rem',
      backgroundColor: 'transparent',
      color: '#7C2A62',
      border: '2px solid #7C2A62',
      borderRadius: '25px',
      cursor: 'pointer',
      fontWeight: '600',
      transition: 'all 0.3s ease',
      fontSize: '1rem',
    },
    modalOverlay: {
      position: 'fixed',
      top: '0',
      left: '0',
      right: '0',
      bottom: '0',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: '1000',
      padding: '2rem',
    },
    modalContent: {
      backgroundColor: 'white',
      borderRadius: '20px',
      padding: '2.5rem',
      maxWidth: '800px',
      width: '100%',
      maxHeight: '90vh',
      overflowY: 'auto',
      position: 'relative',
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
    },
    modalClose: {
      position: 'absolute',
      top: '1rem',
      right: '1.5rem',
      background: 'none',
      border: 'none',
      fontSize: '2rem',
      cursor: 'pointer',
      color: '#666',
      fontWeight: '300',
    },
    modalHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '1.5rem',
      marginBottom: '2rem',
      paddingBottom: '1.5rem',
      borderBottom: '2px solid #f0f0f0',
    },
    modalIcon: {
      fontSize: '3rem',
    },
    modalTitle: {
      fontSize: '2rem',
      color: '#7C2A62',
      fontWeight: '700',
      marginBottom: '0.5rem',
    },
    modalDescription: {
      fontSize: '1.1rem',
      color: '#666',
      margin: '0',
    },
    modalBody: {
      marginBottom: '2rem',
    },
    modalSection: {
      marginBottom: '2rem',
    },
    modalSectionTitle: {
      fontSize: '1.3rem',
      color: '#7C2A62',
      fontWeight: '600',
      marginBottom: '1rem',
    },
    modalText: {
      color: '#555',
      lineHeight: '1.6',
      fontSize: '1rem',
    },
    modalList: {
      listStyle: 'none',
      padding: '0',
      margin: '0',
    },
    modalListItem: {
      padding: '0.5rem 0',
      color: '#555',
      fontSize: '1rem',
      position: 'relative',
      paddingLeft: '1.5rem',
      lineHeight: '1.5',
    },
    modalProcess: {
      listStyle: 'none',
      padding: '0',
      margin: '0',
      counterReset: 'step-counter',
    },
    modalProcessItem: {
      padding: '0.8rem 0',
      color: '#555',
      fontSize: '1rem',
      position: 'relative',
      paddingLeft: '2.5rem',
      lineHeight: '1.5',
      counterIncrement: 'step-counter',
    },
    processNumber: {
      position: 'absolute',
      left: '0',
      width: '1.8rem',
      height: '1.8rem',
      backgroundColor: '#7C2A62',
      color: 'white',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '0.9rem',
      fontWeight: '600',
    },
    modalDetailsGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '2rem',
      marginTop: '2rem',
      padding: '1.5rem',
      backgroundColor: '#f8f9fa',
      borderRadius: '15px',
    },
    detailItem: {
      textAlign: 'left',
    },
    detailTitle: {
      fontSize: '1.1rem',
      color: '#7C2A62',
      fontWeight: '600',
      marginBottom: '0.5rem',
    },
    detailText: {
      color: '#555',
      fontSize: '1rem',
      lineHeight: '1.5',
      margin: '0',
    },
    modalFooter: {
      display: 'flex',
      gap: '1rem',
      justifyContent: 'flex-end',
      paddingTop: '1.5rem',
      borderTop: '2px solid #f0f0f0',
    },
    btnPrimary: {
      padding: '0.8rem 2rem',
      backgroundColor: '#7C2A62',
      color: 'white',
      border: 'none',
      borderRadius: '25px',
      cursor: 'pointer',
      fontWeight: '600',
      fontSize: '1rem',
      transition: 'all 0.3s ease',
    },
    btnSecondary: {
      padding: '0.8rem 2rem',
      backgroundColor: 'transparent',
      color: '#7C2A62',
      border: '2px solid #7C2A62',
      borderRadius: '25px',
      cursor: 'pointer',
      fontWeight: '600',
      fontSize: '1rem',
      transition: 'all 0.3s ease',
    },
  };

  const services = [
    {
      icon: '💊',
      title: 'Medicine Delivery',
      description: 'Get prescribed medicines delivered to your home within 2 hours',
      features: ['24/7 Delivery', 'Prescription Upload', 'Generic Alternatives'],
      details: {
        overview: "Our fast and reliable medicine delivery service ensures you get your prescribed medications without leaving your home. We partner with licensed pharmacies to provide authentic medicines with proper storage and handling.",
        benefits: [
          "Free delivery on orders above $25",
          "Real-time order tracking",
          "Temperature-sensitive packaging",
          "Prescription verification",
          "Insurance claim support"
        ],
        process: [
          "Upload your prescription",
          "Select medicines from verified pharmacies",
          "Choose delivery time slot",
          "Track your order in real-time",
          "Safe and contactless delivery"
        ],
        pricing: "Starting from $2.99 delivery fee. Free for emergency medications.",
        duration: "2-4 hours standard delivery"
      }
    },
    {
      icon: '👨‍⚕️',
      title: 'Online Consultation',
      description: 'Video calls with certified doctors and specialists',
      features: ['Instant Booking', 'Multiple Specialties', 'E-Prescriptions'],
      details: {
        overview: "Connect with board-certified doctors through secure video consultations. Get medical advice, prescriptions, and specialist referrals from the comfort of your home.",
        benefits: [
          "100+ certified doctors",
          "15+ medical specialties",
          "Secure and private sessions",
          "Instant e-prescriptions",
          "Follow-up consultations"
        ],
        process: [
          "Choose your doctor and specialty",
          "Book appointment (instant or scheduled)",
          "Join video call at appointment time",
          "Receive diagnosis and e-prescription",
          "Get specialist referrals if needed"
        ],
        pricing: "Starting from $25 per consultation. Insurance accepted.",
        duration: "15-30 minutes per session"
      }
    },
    {
      icon: '🏥',
      title: 'Emergency Care',
      description: 'Immediate medical assistance for urgent health issues',
      features: ['24/7 Availability', 'Ambulance Service', 'Emergency Kit'],
      details: {
        overview: "24/7 emergency medical support with instant response teams. We provide immediate assistance, ambulance services, and emergency medical guidance.",
        benefits: [
          "Instant response within 2 minutes",
          "GPS-enabled ambulance tracking",
          "Emergency medical guidance",
          "Hospital coordination",
          "Family notification system"
        ],
        process: [
          "Call emergency helpline",
          "Describe emergency situation",
          "Receive immediate first-aid guidance",
          "Ambulance dispatched if needed",
          "Hospital admission coordination"
        ],
        pricing: "Emergency consultation: Free. Ambulance: $50-$150 based on distance.",
        duration: "Immediate response, 15-minute ambulance ETA"
      }
    },
    {
      icon: '🩺',
      title: 'Diagnostic Tests',
      description: 'Home sample collection and lab tests',
      features: ['Home Collection', 'Digital Reports', '100+ Tests'],
      details: {
        overview: "Comprehensive diagnostic testing with home sample collection. Get accurate results from certified labs with digital reports and doctor consultations.",
        benefits: [
          "200+ test options",
          "Certified phlebotomists",
          "Digital reports in 24 hours",
          "Free doctor consultation on abnormal results",
          "Historical report tracking"
        ],
        process: [
          "Book test online or via app",
          "Sample collection at your home",
          "Sample processing at certified labs",
          "Digital report delivery",
          "Free doctor consultation if needed"
        ],
        pricing: "Starting from $15. Health packages available at discounted rates.",
        duration: "Sample collection: 2 hours, Reports: 6-24 hours"
      }
    },
    {
      icon: '📋',
      title: 'Health Checkups',
      description: 'Comprehensive health packages for all ages',
      features: ['Custom Packages', 'Doctor Consultation', 'Diet Plans'],
      details: {
        overview: "Preventive health checkups designed for different age groups and health conditions. Comprehensive packages with detailed reports and specialist consultations.",
        benefits: [
          "Age-specific packages",
          "Comprehensive health assessment",
          "Specialist doctor consultation",
          "Personalized diet and exercise plans",
          "Annual health tracking"
        ],
        process: [
          "Choose health package",
          "Complete tests and assessments",
          "Comprehensive report generation",
          "Specialist doctor consultation",
          "Receive personalized health plan"
        ],
        pricing: "Packages starting from $99. Family and corporate discounts available.",
        duration: "2-4 hours for complete checkup"
      }
    },
    {
      icon: '🧘',
      title: 'Wellness Programs',
      description: 'Preventive healthcare and lifestyle management',
      features: ['Yoga Sessions', 'Diet Planning', 'Mental Wellness'],
      details: {
        overview: "Holistic wellness programs focusing on preventive care, mental health, and lifestyle management. Customized plans for overall well-being.",
        benefits: [
          "Personalized wellness plans",
          "Certified wellness coaches",
          "Mental health support",
          "Nutritionist consultations",
          "Progress tracking"
        ],
        process: [
          "Initial health assessment",
          "Personalized wellness plan creation",
          "Regular coaching sessions",
          "Progress monitoring",
          "Plan adjustments based on results"
        ],
        pricing: "Starting from $49/month. 3-month and annual plans available.",
        duration: "3-12 month programs with weekly sessions"
      }
    }
  ];

  const openModal = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <section style={styles.services}>
      <div style={styles.container}>
        <h2 style={{
          ...styles.sectionTitle,
          ...(window.innerWidth <= 768 && { fontSize: '2rem' }),
          ...(window.innerWidth <= 480 && { fontSize: '1.8rem' })
        }}>
          Our Services
        </h2>
        <p style={{
          ...styles.sectionSubtitle,
          ...(window.innerWidth <= 768 && { fontSize: '1rem', marginBottom: '3rem' }),
          ...(window.innerWidth <= 480 && { fontSize: '0.9rem', padding: '0 1rem' })
        }}>
          Comprehensive healthcare solutions for all your needs
        </p>
        
        <div style={{
          ...styles.servicesGrid,
          ...(window.innerWidth <= 768 && { 
            gridTemplateColumns: '1fr',
            gap: '1.5rem'
          })
        }}>
          {services.map((service, index) => (
            <div
              key={index}
              style={{
                ...styles.serviceCard,
                ...(window.innerWidth <= 768 && { 
                  padding: '2rem 1.5rem',
                  margin: '0 0.5rem'
                }),
                ...(window.innerWidth <= 480 && { 
                  padding: '1.5rem 1rem'
                })
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px)';
                e.currentTarget.style.boxShadow = '0 15px 40px rgba(124, 42, 98, 0.15)';
                e.currentTarget.style.borderColor = '#7C2A62';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 5px 20px rgba(124, 42, 98, 0.1)';
                e.currentTarget.style.borderColor = 'transparent';
              }}
            >
              <div style={{
                ...styles.serviceIcon,
                ...(window.innerWidth <= 768 && { fontSize: '3.5rem' }),
                ...(window.innerWidth <= 480 && { fontSize: '3rem' })
              }}>
                {service.icon}
              </div>
              <h3 style={{
                ...styles.serviceTitle,
                ...(window.innerWidth <= 768 && { fontSize: '1.3rem' }),
                ...(window.innerWidth <= 480 && { fontSize: '1.2rem' })
              }}>
                {service.title}
              </h3>
              <p style={{
                ...styles.serviceDescription,
                ...(window.innerWidth <= 480 && { fontSize: '0.9rem' })
              }}>
                {service.description}
              </p>
              
              <ul style={styles.serviceFeatures}>
                {service.features.map((feature, idx) => (
                  <li key={idx} style={styles.serviceFeatureItem}>
                    <span style={styles.featureBullet}>•</span>
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                style={{
                  ...styles.learnMoreButton,
                  ...(window.innerWidth <= 480 && { 
                    padding: '0.6rem 1.2rem',
                    fontSize: '0.9rem'
                  })
                }}
                onClick={() => openModal(service)}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#7C2A62';
                  e.target.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = '#7C2A62';
                }}
              >
                Learn More →
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Service Details Modal */}
      {isModalOpen && selectedService && (
        <div style={styles.modalOverlay} onClick={closeModal}>
          <div style={{
            ...styles.modalContent,
            ...(window.innerWidth <= 768 && { 
              padding: '2rem',
              margin: '1rem'
            }),
            ...(window.innerWidth <= 480 && { 
              padding: '1.5rem',
              margin: '0.5rem'
            })
          }} onClick={(e) => e.stopPropagation()}>
            <button 
              style={styles.modalClose}
              onClick={closeModal}
            >
              ×
            </button>
           
            <div style={styles.modalHeader}>
              <div style={{
                ...styles.modalIcon,
                ...(window.innerWidth <= 480 && { fontSize: '2.5rem' })
              }}>
                {selectedService.icon}
              </div>
              <div>
                <h2 style={{
                  ...styles.modalTitle,
                  ...(window.innerWidth <= 480 && { fontSize: '1.5rem' })
                }}>
                  {selectedService.title}
                </h2>
                <p style={{
                  ...styles.modalDescription,
                  ...(window.innerWidth <= 480 && { fontSize: '0.9rem' })
                }}>
                  {selectedService.description}
                </p>
              </div>
            </div>

            <div style={styles.modalBody}>
              <div style={styles.modalSection}>
                <h3 style={styles.modalSectionTitle}>Overview</h3>
                <p style={styles.modalText}>{selectedService.details.overview}</p>
              </div>

              <div style={styles.modalSection}>
                <h3 style={styles.modalSectionTitle}>Key Benefits</h3>
                <ul style={styles.modalList}>
                  {selectedService.details.benefits.map((benefit, index) => (
                    <li key={index} style={styles.modalListItem}>
                      <span style={styles.featureBullet}>•</span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>

              <div style={styles.modalSection}>
                <h3 style={styles.modalSectionTitle}>How It Works</h3>
                <ol style={styles.modalProcess}>
                  {selectedService.details.process.map((step, index) => (
                    <li key={index} style={styles.modalProcessItem}>
                      <span style={styles.processNumber}>
                        {index + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>

              <div style={{
                ...styles.modalDetailsGrid,
                ...(window.innerWidth <= 768 && { 
                  gridTemplateColumns: '1fr',
                  gap: '1rem'
                })
              }}>
                <div style={styles.detailItem}>
                  <h4 style={styles.detailTitle}>Pricing</h4>
                  <p style={styles.detailText}>{selectedService.details.pricing}</p>
                </div>
                <div style={styles.detailItem}>
                  <h4 style={styles.detailTitle}>Duration</h4>
                  <p style={styles.detailText}>{selectedService.details.duration}</p>
                </div>
              </div>
            </div>

            <div style={{
              ...styles.modalFooter,
              ...(window.innerWidth <= 480 && { 
                flexDirection: 'column',
                gap: '0.8rem'
              })
            }}>
              <button 
                style={{
                  ...styles.btnPrimary,
                  ...(window.innerWidth <= 480 && { 
                    padding: '0.7rem 1.5rem',
                    fontSize: '0.9rem'
                  })
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#9C3A7A';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#7C2A62';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                Book Now
              </button>
              <button 
                style={{
                  ...styles.btnSecondary,
                  ...(window.innerWidth <= 480 && { 
                    padding: '0.7rem 1.5rem',
                    fontSize: '0.9rem'
                  })
                }}
                onClick={closeModal}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#7C2A62';
                  e.target.style.color = 'white';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = '#7C2A62';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Services;