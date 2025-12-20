// import React, { useState, useEffect } from 'react';

// const AppointmentsView = ({
//   appointments,
//   appointmentFilter,
//   setAppointmentFilter,
//   setActiveView
// }) => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedAppointment, setSelectedAppointment] = useState(null);
//   const [showDetails, setShowDetails] = useState(false);
//   const [validatedAppointments, setValidatedAppointments] = useState(appointments);

//   // Validate appointments data
//   useEffect(() => {
//     // Ensure all appointments have required fields
//     const validatedAppointments = appointments.map(appt => ({
//       id: appt.id || `appt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
//       doctorName: appt.doctorName || 'Dr. Unknown',
//       doctorSpecialty: appt.doctorSpecialty || appt.doctor?.specialty || 'General',
//       date: appt.date || appt.appointmentDateTime?.split('T')[0] || new Date().toISOString().split('T')[0],
//       time: appt.time || appt.appointmentDateTime?.split('T')[1]?.substring(0, 5) || '10:00',
//       status: appt.status || 'pending',
//       type: appt.type || 'clinic',
//       fee: appt.fee || appt.payment?.amount || '500',
//       category: appt.category || 'General',
//       hospital: appt.hospital || 'QuickMed Clinic',
//       priority: appt.priority || 'L2',
//       payment: appt.payment || null,
//       createdAt: appt.createdAt || new Date().toISOString(),
//       ...appt
//     }));
    
//     // Only update if there are changes
//     if (JSON.stringify(validatedAppointments) !== JSON.stringify(appointments)) {
//       setValidatedAppointments(validatedAppointments);
//       console.log('Appointments validated:', validatedAppointments);
//     } else {
//       setValidatedAppointments(appointments);
//     }
//   }, [appointments]);

//   // Scroll to top when component mounts or filter/search changes
//   useEffect(() => {
//     window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
//   }, [appointmentFilter, searchTerm]);

//   const BackButton = ({ onClick, text = 'Back' }) => (
//     <button 
//       style={styles.backButton}
//       onClick={() => {
//         window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
//         setTimeout(() => onClick(), 100);
//       }}
//       type="button"
//     >
//       ← {text}
//     </button>
//   );

//   const handleViewDetails = (appointment) => {
//     setSelectedAppointment(appointment);
//     setShowDetails(true);
//     window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
//   };

//   const handleBackToList = () => {
//     setShowDetails(false);
//     setSelectedAppointment(null);
//   };

//   const getFilteredAppointments = () => {
//     let filtered = validatedAppointments;
    
//     if (appointmentFilter !== 'all') {
//       filtered = validatedAppointments.filter(appt => {
//         const status = appt.status ? appt.status.toLowerCase() : 'pending';
//         const filter = appointmentFilter.toLowerCase();
        
//         // Map filter values to appointment statuses
//         if (filter === 'confirmed') {
//           return status === 'confirmed' || status === 'scheduled';
//         } else if (filter === 'pending') {
//           return status === 'pending';
//         } else if (filter === 'completed') {
//           return status === 'completed';
//         }
//         return true;
//       });
//     }
    
//     if (searchTerm.trim() !== '') {
//       filtered = filtered.filter(appt => {
//         const searchLower = searchTerm.toLowerCase();
//         return (
//           (appt.doctorName && appt.doctorName.toLowerCase().includes(searchLower)) ||
//           (appt.doctorSpecialty && appt.doctorSpecialty.toLowerCase().includes(searchLower)) ||
//           (appt.id && appt.id.toLowerCase().includes(searchLower)) ||
//           (appt.hospital && appt.hospital.toLowerCase().includes(searchLower))
//         );
//       });
//     }
    
//     // Sort by date (newest first)
//     return filtered.sort((a, b) => {
//       const dateA = new Date(a.date || a.appointmentDateTime || 0);
//       const dateB = new Date(b.date || b.appointmentDateTime || 0);
//       return dateB - dateA;
//     });
//   };

//   const displayAppointments = getFilteredAppointments();

//   const formatDate = (dateString) => {
//     if (!dateString) return 'Not set';
//     try {
//       const date = new Date(dateString);
//       if (isNaN(date.getTime())) return dateString;
//       return date.toLocaleDateString('en-US', { 
//         weekday: 'long', 
//         year: 'numeric', 
//         month: 'long', 
//         day: 'numeric' 
//       });
//     } catch {
//       return dateString;
//     }
//   };

//   const formatTime = (timeString) => {
//     if (!timeString) return 'Not set';
    
//     // If it's a full datetime string
//     if (timeString.includes('T')) {
//       try {
//         const date = new Date(timeString);
//         if (!isNaN(date.getTime())) {
//           return date.toLocaleTimeString('en-US', { 
//             hour: '2-digit', 
//             minute: '2-digit',
//             hour12: true 
//           });
//         }
//       } catch {
//         // Continue to other formats
//       }
//     }
    
//     // If it's already in AM/PM format
//     if (timeString.includes('AM') || timeString.includes('PM')) {
//       return timeString;
//     }
    
//     // If it's in 24-hour format
//     if (timeString.includes(':')) {
//       const [hours, minutes] = timeString.split(':');
//       const hour = parseInt(hours);
//       const ampm = hour >= 12 ? 'PM' : 'AM';
//       const formattedHour = hour % 12 || 12;
//       return `${formattedHour}:${minutes} ${ampm}`;
//     }
    
//     return timeString;
//   };

//   const getStatusColor = (status) => {
//     const statusStyles = {
//       confirmed: { background: '#E8F5E8', color: '#2E7D32', border: '1px solid #C8E6C9' },
//       scheduled: { background: '#E8F5E8', color: '#2E7D32', border: '1px solid #C8E6C9' },
//       pending: { background: '#FFF3E0', color: '#EF6C00', border: '1px solid #FFE0B2' },
//       completed: { background: '#F5F5F5', color: '#424242', border: '1px solid #E0E0E0' }
//     };
//     return statusStyles[status?.toLowerCase()] || statusStyles.pending;
//   };

//   const getPaymentStatusColor = (status) => {
//     const paymentStyles = {
//       completed: { background: '#E8F5E8', color: '#2E7D32', icon: '✓' },
//       pending: { background: '#FFF3E0', color: '#EF6C00', icon: '⏳' },
//       failed: { background: '#FFEBEE', color: '#D32F2F', icon: '✕' }
//     };
//     return paymentStyles[status] || paymentStyles.pending;
//   };

//   const getPriorityBadge = (priority) => {
//     const priorityStyles = {
//       'L1': { background: '#FEE2E2', color: '#DC2626',  label: 'High Priority' },
//       'L2': { background: '#FEF3C7', color: '#D97706',  label: 'Medium Priority' },
//       'L3': { background: '#D1FAE5', color: '#059669',  label: 'Low Priority' }
//     };
//     const style = priorityStyles[priority] || priorityStyles['L2'];
    
//     return (
//       <span style={{
//         backgroundColor: style.background,
//         color: style.color,
//         padding: '0.2rem 0.5rem',
//         borderRadius: '10px',
//         fontSize: '0.75rem',
//         fontWeight: '600',
//         display: 'inline-flex',
//         alignItems: 'center',
//         gap: '0.25rem',
//         marginLeft: '0.5rem'
//       }}>
//         {style.icon} {style.label}
//       </span>
//     );
//   };

//   // Doctor Information Database
//   const doctorDatabase = {
//     "Dr. Ananya Sharma": {
//       specialty: "Pediatrics", 
//       experience: "12+ years", 
//       education: "MBBS, MD - Pediatrics",
//       languages: "English, Hindi, Telugu", 
//       rating: "4.9/5", 
//       about: "Specialized in newborn care, vaccinations, and developmental disorders.",
//       clinic: "Apollo Children's Hospital", 
//       address: "123 Health Street, Medical District, Hyderabad"
//     },
//     "Dr. Rohan Verma": {
//       specialty: "Pediatric Cardiology", 
//       experience: "15+ years", 
//       education: "MBBS, DM - Cardiology",
//       languages: "English, Hindi", 
//       rating: "4.8/5", 
//       about: "Expert in congenital heart defects and pediatric heart care.",
//       clinic: "Fortis Hospital", 
//       address: "456 Cardiac Road, Medical District, Hyderabad"
//     },
//     "Dr. Priya Reddy": {
//       specialty: "Pediatric Neurology", 
//       experience: "10+ years", 
//       education: "MBBS, DM - Neurology",
//       languages: "English, Telugu, Tamil", 
//       rating: "4.7/5", 
//       about: "Specialized in epilepsy, developmental delays, and neurological disorders in children.",
//       clinic: "Narayana Health", 
//       address: "789 Neuro Street, Medical District, Hyderabad"
//     },
//     "Dr. Amit Patel": {
//       specialty: "Pediatric Gastroenterology", 
//       experience: "8+ years", 
//       education: "MBBS, DM - Gastroenterology",
//       languages: "English, Hindi, Gujarati", 
//       rating: "4.6/5", 
//       about: "Expert in digestive disorders, nutrition, and feeding issues in infants.",
//       clinic: "Medanta Hospital", 
//       address: "321 Digestive Road, Medical District, Hyderabad"
//     },
//     "Dr. Charitha Kasturi": {
//       specialty: "General Pediatrics", 
//       experience: "20+ years", 
//       education: "MBBS, DCH, MD - Pediatrics",
//       languages: "English, Telugu", 
//       rating: "4.9/5", 
//       about: "Expert in routine checkups, vaccinations, and growth monitoring.",
//       clinic: "KIMS Hospital", 
//       address: "654 Child Care Street, Medical District, Hyderabad"
//     },
//     "Dr. Sarah Johnson": {
//       specialty: "Obstetrics & Gynecology", 
//       experience: "15+ years", 
//       education: "MBBS, MD - OBGY",
//       languages: "English, Hindi", 
//       rating: "4.9/5", 
//       about: "Expert in high-risk pregnancies, prenatal care, and delivery.",
//       clinic: "Apollo Hospital", 
//       address: "987 Maternity Road, Medical District, Hyderabad"
//     },
//     "Dr. Priya Sharma": {
//       specialty: "Maternal-Fetal Medicine", 
//       experience: "12+ years", 
//       education: "MBBS, DM - Fetal Medicine",
//       languages: "English, Telugu, Tamil", 
//       rating: "4.8/5", 
//       about: "Specialized in fetal medicine, genetic counseling, and prenatal diagnosis.",
//       clinic: "Fortis La Femme", 
//       address: "147 Fetal Care Road, Medical District, Hyderabad"
//     },
//     "Dr. Meera Reddy": {
//       specialty: "Obstetrics & Gynecology", 
//       experience: "18+ years", 
//       education: "MBBS, MD - OBGY",
//       languages: "English, Telugu, Hindi", 
//       rating: "4.9/5", 
//       about: "Expert in normal deliveries, pregnancy care, and postnatal recovery.",
//       clinic: "KIMS Cuddles", 
//       address: "258 Delivery Street, Medical District, Hyderabad"
//     },
//     "Dr. Anjali Gupta": {
//       specialty: "Pregnancy Nutrition & Wellness", 
//       experience: "10+ years", 
//       education: "MBBS, MSc - Nutrition",
//       languages: "English, Hindi, Gujarati", 
//       rating: "4.7/5", 
//       about: "Specialized in pregnancy nutrition, weight management, and gestational diabetes.",
//       clinic: "Manipal Hospital", 
//       address: "369 Nutrition Road, Medical District, Hyderabad"
//     },
//     "Dr. Kavita Singh": {
//       specialty: "Pregnancy Mental Health", 
//       experience: "8+ years", 
//       education: "MBBS, MD - Psychiatry",
//       languages: "English, Hindi, Punjabi", 
//       rating: "4.6/5", 
//       about: "Expert in prenatal and postpartum depression, anxiety, and mental wellness.",
//       clinic: "Max Healthcare", 
//       address: "741 Mental Health Street, Medical District, Hyderabad"
//     },
//     "Dr. Radha Menon": {
//       specialty: "Pregnancy Yoga & Fitness", 
//       experience: "14+ years", 
//       education: "MBBS, Certified Yoga Instructor",
//       languages: "English, Malayalam, Tamil", 
//       rating: "4.8/5", 
//       about: "Certified pregnancy yoga instructor and fitness expert for all trimesters.",
//       clinic: "Aster Maternity", 
//       address: "852 Yoga Road, Medical District, Hyderabad"
//     },
//     "Dr. Arjun Mehta": {
//       specialty: "General Physician & Pregnancy Care", 
//       experience: "18+ years", 
//       education: "MBBS, MD - General Medicine",
//       languages: "English, Hindi, Bengali", 
//       rating: "4.8/5", 
//       about: "Expert in pregnancy care, routine checkups, and general health consultations for expecting mothers.",
//       clinic: "Global Health City", 
//       address: "963 Health Street, Medical District, Hyderabad"
//     },
//     "Dr. Neha Kapoor": {
//       specialty: "Family Medicine & Baby Care", 
//       experience: "14+ years", 
//       education: "MBBS, MD - Family Medicine",
//       languages: "English, Hindi, Punjabi", 
//       rating: "4.7/5", 
//       about: "Specialized in family health, baby care, vaccinations, and pediatric wellness.",
//       clinic: "Columbia Asia Hospital", 
//       address: "159 Family Care Road, Medical District, Hyderabad"
//     },
//     "Dr. Vikram Singh": {
//       specialty: "General Medicine & Pregnancy Consultation", 
//       experience: "20+ years", 
//       education: "MBBS, MD - General Medicine",
//       languages: "English, Hindi, Tamil", 
//       rating: "4.9/5", 
//       about: "Comprehensive care for pregnancy, general health issues, and chronic disease management.",
//       clinic: "Apollo Hospitals", 
//       address: "357 Comprehensive Care Street, Medical District, Hyderabad"
//     },
//     "Dr. Sunita Rao": {
//       specialty: "Women's Health & Baby Wellness", 
//       experience: "16+ years", 
//       education: "MBBS, MD - Gynecology",
//       languages: "English, Hindi, Telugu", 
//       rating: "4.8/5", 
//       about: "Expert in women's health, pregnancy care, baby wellness, and postnatal recovery.",
//       clinic: "Fortis La Femme", 
//       address: "753 Women's Health Road, Medical District, Hyderabad"
//     },
//     "Dr. Rajesh Kumar": {
//       specialty: "General Physician & Child Care", 
//       experience: "12+ years", 
//       education: "MBBS, MD - General Medicine",
//       languages: "English, Hindi, Marathi", 
//       rating: "4.6/5", 
//       about: "Specialized in child healthcare, general medicine, and family wellness consultations.",
//       clinic: "Manipal Hospital", 
//       address: "951 Child Health Street, Medical District, Hyderabad"
//     },
//     "Dr. Pooja Sharma": {
//       specialty: "Pregnancy & Newborn Care Specialist", 
//       experience: "15+ years", 
//       education: "MBBS, MD - Pediatrics",
//       languages: "English, Hindi, Gujarati", 
//       rating: "4.9/5", 
//       about: "Comprehensive care for expecting mothers and newborn babies including lactation support.",
//       clinic: "Max Super Specialty Hospital", 
//       address: "864 Newborn Care Road, Medical District, Hyderabad"
//     }
//   };

//   // Appointment Details Component
//   const AppointmentDetails = ({ appointment, onBack }) => {
//     const doctorInfo = doctorDatabase[appointment.doctorName] || {
//       specialty: appointment.doctorSpecialty || "Medical Specialist",
//       experience: appointment.doctorExperience || "Experienced professional",
//       education: "Medical degree",
//       languages: "English",
//       rating: "4.5/5",
//       about: "Qualified medical professional providing excellent care.",
//       clinic: appointment.hospital || "QuickMed Clinic",
//       address: "123 Health Street, Medical District"
//     };

//     const statusStyle = getStatusColor(appointment.status);
//     const paymentStyle = appointment.payment ? getPaymentStatusColor(appointment.payment.status) : null;

//     return (
//       <div style={styles.mainContainer}>
//         <div style={styles.contentWrapper}>
//           <div style={styles.detailsHeader}>
//             <BackButton onClick={onBack} text="Back to Appointments" />
//             <div style={styles.headerCenter}>
//               <h1 style={styles.mainTitle}>Appointment Details</h1>
//               <p style={styles.subtitle}>Complete information about your appointment</p>
//             </div>
//             <div style={{ width: '140px' }}></div>
//           </div>

//           <div style={styles.gridContainer}>
//             {/* Appointment Card */}
//             <div style={styles.card}>
//               <div style={styles.cardHeader}>
//                 <div>
//                   <div style={styles.statusContainer}>
//                     <span style={{ ...styles.statusBadge, ...statusStyle }}>
//                       {appointment.status?.charAt(0).toUpperCase() + appointment.status?.slice(1) || 'Pending'}
//                     </span>
//                     <span style={styles.idBadge}>ID: {appointment.id}</span>
//                     {appointment.priority && getPriorityBadge(appointment.priority)}
//                   </div>
//                   <h2 style={styles.doctorName}>{appointment.doctorName}</h2>
//                   <p style={styles.specialtyText}>{doctorInfo.specialty}</p>
//                 </div>
//               </div>

//               <div style={styles.detailsGrid}>
//                 {[
//                   { label: 'Appointment Date', value: formatDate(appointment.date) },
//                   { label: 'Appointment Time', value: formatTime(appointment.time) },
//                   { label: 'Consultation Type', value: appointment.type === 'home' ? 'Home Consultation' : 'Clinic Appointment' },
//                   { label: 'Consultation Fee', value: `₹${appointment.fee || '500'}` },
//                   { label: 'Category', value: appointment.category || 'General' },
//                   { label: 'Hospital/Clinic', value: appointment.hospital || doctorInfo.clinic }
//                 ].map((item, idx) => (
//                   <div key={idx} style={styles.detailItem}>
//                     <strong style={styles.detailLabel}>{item.label}</strong>
//                     <p style={styles.detailValue}>{item.value}</p>
//                   </div>
//                 ))}
//               </div>

//               {/* Payment Information */}
//               {appointment.payment && (
//                 <div style={styles.paymentContainer}>
//                   <h4 style={styles.sectionTitle}>Payment Information</h4>
//                   <div style={styles.paymentDetails}>
//                     <div style={styles.paymentDetailRow}>
//                       <strong style={styles.paymentLabel}>Status:</strong>
//                       <span style={{
//                         ...styles.paymentStatus,
//                         backgroundColor: paymentStyle.background,
//                         color: paymentStyle.color
//                       }}>
//                         {paymentStyle.icon} {appointment.payment.status.charAt(0).toUpperCase() + appointment.payment.status.slice(1)}
//                       </span>
//                     </div>
//                     <div style={styles.paymentDetailRow}>
//                       <strong style={styles.paymentLabel}>Amount:</strong>
//                       <span style={styles.paymentValue}>₹{appointment.payment.amount}</span>
//                     </div>
//                     {appointment.payment.paymentId && (
//                       <div style={styles.paymentDetailRow}>
//                         <strong style={styles.paymentLabel}>Payment ID:</strong>
//                         <span style={styles.paymentId}>{appointment.payment.paymentId}</span>
//                       </div>
//                     )}
//                     {appointment.payment.orderId && (
//                       <div style={styles.paymentDetailRow}>
//                         <strong style={styles.paymentLabel}>Order ID:</strong>
//                         <span style={styles.paymentId}>{appointment.payment.orderId}</span>
//                       </div>
//                     )}
//                     {appointment.payment.timestamp && (
//                       <div style={styles.paymentDetailRow}>
//                         <strong style={styles.paymentLabel}>Paid on:</strong>
//                         <span>{new Date(appointment.payment.timestamp).toLocaleDateString('en-US', { 
//                           year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' 
//                         })}</span>
//                       </div>
//                     )}
//                     {appointment.payment.method && (
//                       <div style={styles.paymentDetailRow}>
//                         <strong style={styles.paymentLabel}>Payment Method:</strong>
//                         <span>{appointment.payment.method}</span>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               )}

//               <div style={styles.notesContainer}>
//                 <h4 style={styles.sectionTitle}>Additional Information</h4>
//                 <p style={styles.notesText}>
//                   {appointment.type === 'home' 
//                     ? ' Home Consultation: Doctor will contact you for address confirmation. Please be available at the scheduled time.' 
//                     : ' Clinic Appointment: Please arrive 15 minutes before your scheduled time. Bring your ID and any previous medical records.'}
//                 </p>
//                 {appointment.hospital && (
//                   <p style={styles.notesText}>
//                     <strong>Hospital:</strong> {appointment.hospital}
//                   </p>
//                 )}
//                 {appointment.createdAt && (
//                   <p style={styles.notesText}>
//                     <strong>Booked on:</strong> {new Date(appointment.createdAt).toLocaleDateString('en-US', { 
//                       year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' 
//                     })}
//                   </p>
//                 )}
//               </div>
//             </div>

//             {/* Doctor Information */}
//             <div style={styles.card}>
//               <h3 style={styles.sectionTitle}>About Dr. {appointment.doctorName.replace('Dr. ', '')}</h3>
//               <div style={styles.infoGrid}>
//                 {[
//                   { label: 'Experience:', value: doctorInfo.experience },
//                   { label: 'Education:', value: doctorInfo.education },
//                   { label: 'Languages:', value: doctorInfo.languages },
//                   { label: 'Rating:', value: doctorInfo.rating }
//                 ].map((item, idx) => (
//                   <div key={idx} style={styles.infoRow}>
//                     <strong style={styles.infoLabel}>{item.label}</strong>
//                     <p style={styles.infoValue}>{item.value}</p>
//                   </div>
//                 ))}
//               </div>
//               <div>
//                 <strong style={styles.infoLabel}>About the Doctor:</strong>
//                 <p style={styles.aboutText}>{doctorInfo.about}</p>
//               </div>
//             </div>

//             {/* Clinic Information */}
//             <div style={styles.card}>
//               <h3 style={styles.sectionTitle}>Clinic Information</h3>
//               {[
//                 { label: 'Clinic Name', value: doctorInfo.clinic },
//                 { label: 'Address', value: doctorInfo.address, multiline: true },
//                 { label: 'Contact', value: '📞 1-800-QUICK-MED\n✉️ info@quickmed.com', multiline: true }
//               ].map((item, idx) => (
//                 <div key={idx} style={styles.clinicItem}>
//                   <strong style={styles.clinicLabel}>{item.label}</strong>
//                   <p style={item.multiline ? styles.clinicTextMultiline : styles.clinicText}>{item.value}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   // Main Appointments List View
//   if (showDetails && selectedAppointment) {
//     return <AppointmentDetails appointment={selectedAppointment} onBack={handleBackToList} />;
//   }

//   return (
//     <div style={styles.mainContainer}>
//       <div style={styles.contentWrapper}>
//         <div style={styles.header}>
//           <BackButton onClick={() => setActiveView('dashboard')} text="Dashboard" />
//           <div style={styles.headerCenter}>
//             <h1 style={styles.mainTitle}>My Appointments</h1>
//             <p style={styles.subtitle}>Quick Care, Better Health</p>
//           </div>
//           <div style={styles.headerActions}>
//             <div style={styles.searchContainer}>
//               <input
//                 type="text"
//                 placeholder="Search doctors, specialties, or appointment ID..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 style={styles.searchInput}
//               />
//               <span style={styles.searchIcon}></span>
//             </div>
//             <button 
//               style={styles.bookButton}
//               onClick={() => {
//                 window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
//                 setTimeout(() => setActiveView('consultation'), 100);
//               }}
//               type="button"
//             >
//               + Book New Appointment
//             </button>
//           </div>
//         </div>

//         <div style={styles.filterContainer}>
//           {['all', 'confirmed', 'pending', 'completed'].map((filter) => (
//             <button
//               key={filter}
//               onClick={() => setAppointmentFilter(filter)}
//               style={{
//                 ...styles.filterButton,
//                 backgroundColor: appointmentFilter === filter ? '#009688' : 'white',
//                 color: appointmentFilter === filter ? 'white' : '#124441',
//                 border: `1px solid ${appointmentFilter === filter ? '#009688' : '#4DB6AC'}`
//               }}
//               type="button"
//             >
//               {filter === 'all' ? 'All Appointments' : 
//                filter === 'confirmed' ? 'Confirmed' :
//                filter === 'pending' ? 'Pending Payment' : 'Completed'}
//             </button>
//           ))}
//         </div>

//         <div style={styles.appointmentsList}>
//           {displayAppointments.length === 0 ? (
//             <div style={styles.emptyState}>
//               <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📅</div>
//               <h3 style={styles.emptyTitle}>No Appointments Found</h3>
//               <p style={styles.emptyText}>
//                 {searchTerm || appointmentFilter !== 'all' 
//                   ? 'Try adjusting your search or filter criteria.' 
//                   : 'You don\'t have any appointments yet.'}
//               </p>
//               <button 
//                 style={styles.bookButton}
//                 onClick={() => {
//                   setSearchTerm('');
//                   setAppointmentFilter('all');
//                   setActiveView('consultation');
//                 }}
//                 type="button"
//               >
//                 Book Your First Appointment
//               </button>
//             </div>
//           ) : (
//             displayAppointments.map((appointment) => {
//               const statusStyle = getStatusColor(appointment.status);
//               const paymentStyle = appointment.payment ? getPaymentStatusColor(appointment.payment.status) : null;
              
//               const doctorInfo = doctorDatabase[appointment.doctorName] || {
//                 specialty: appointment.doctorSpecialty || "Medical Specialist",
//                 experience: appointment.doctorExperience || "Experienced professional",
//                 rating: "4.5/5",
//                 about: "Qualified medical professional providing excellent care."
//               };

//               return (
//                 <div key={appointment.id} style={styles.appointmentCard}>
//                   <div style={styles.cardContent}>
//                     <div style={{ flex: 1 }}>
//                       <div style={styles.statusContainer}>
//                         <span style={{ ...styles.statusBadge, ...statusStyle }}>
//                           {appointment.status?.charAt(0).toUpperCase() + appointment.status?.slice(1) || 'Pending'}
//                         </span>
//                         <span style={styles.idText}>ID: {appointment.id}</span>
//                         {appointment.priority && (
//                           <span style={{
//                             backgroundColor: appointment.priority === 'L1' ? '#FEE2E2' : 
//                                          appointment.priority === 'L2' ? '#FEF3C7' : '#D1FAE5',
//                             color: appointment.priority === 'L1' ? '#DC2626' : 
//                                  appointment.priority === 'L2' ? '#D97706' : '#059669',
//                             padding: '0.2rem 0.5rem',
//                             borderRadius: '10px',
//                             fontSize: '0.7rem',
//                             fontWeight: '600',
//                             display: 'inline-flex',
//                             alignItems: 'center',
//                             gap: '0.2rem'
//                           }}>
//                             {appointment.priority === 'L1' ? '' : 
//                              appointment.priority === 'L2' ? '' : '✅'} 
//                             {appointment.priority === 'L1' ? ' High' : 
//                              appointment.priority === 'L2' ? ' Medium' : ' Low'}
//                           </span>
//                         )}
//                         {appointment.payment && (
//                           <span style={{
//                             ...styles.paymentBadge,
//                             backgroundColor: paymentStyle.background,
//                             color: paymentStyle.color
//                           }}>
//                             {paymentStyle.icon} {appointment.payment.status.charAt(0).toUpperCase() + appointment.payment.status.slice(1)}
//                           </span>
//                         )}
//                       </div>
//                       <h3 style={styles.cardDoctorName}>{appointment.doctorName}</h3>
//                       <p style={styles.cardSpecialty}>
//                         {doctorInfo.specialty} • {doctorInfo.experience} • Rating: {doctorInfo.rating}
//                       </p>
//                       <div style={styles.cardDetails}>
//                         <div>
//                           <strong style={styles.cardLabel}>Date:</strong>
//                           <p style={styles.cardValue}>{formatDate(appointment.date)}</p>
//                         </div>
//                         <div>
//                           <strong style={styles.cardLabel}>Time:</strong>
//                           <p style={styles.cardValue}>{formatTime(appointment.time)}</p>
//                         </div>
//                         <div>
//                           <strong style={styles.cardLabel}>Type:</strong>
//                           <p style={styles.cardValue}>
//                             {appointment.type === 'home' ? 'Home Consultation' : 'Clinic Appointment'}
//                           </p>
//                         </div>
//                         <div>
//                           <strong style={styles.cardLabel}>Fee:</strong>
//                           <p style={styles.cardValue}>₹{appointment.fee || '500'}</p>
//                         </div>
//                       </div>
//                       <p style={styles.cardAbout}>{doctorInfo.about}</p>
//                       {appointment.payment && (
//                         <div style={styles.paymentSummary}>
//                           <span style={styles.paymentAmount}>Paid: ₹{appointment.payment.amount}</span>
//                           {appointment.payment.paymentId && (
//                             <span style={styles.paymentIdSmall}>Payment ID: {appointment.payment.paymentId.slice(0, 8)}...</span>
//                           )}
//                         </div>
//                       )}
//                     </div>
//                     <div style={styles.actionButtons}>
//                       <button
//                         onClick={() => handleViewDetails(appointment)}
//                         style={styles.viewButton}
//                         onMouseEnter={(e) => {
//                           e.target.style.backgroundColor = '#009688';
//                           e.target.style.color = 'white';
//                         }}
//                         onMouseLeave={(e) => {
//                           e.target.style.backgroundColor = 'transparent';
//                           e.target.style.color = '#124441';
//                         }}
//                         type="button"
//                       >
//                         View Details
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })
//           )}
//         </div>

//         <div style={styles.footer}>
//           <h4 style={styles.footerTitle}>Need Help?</h4>
//           <p style={styles.footerText}>
//             Contact our support team for assistance with appointments, payments, or medical queries.
//           </p>
//           <div style={styles.contactInfo}>
//             <span>📞 Support: 1-800-QUICK-MED</span>
//             <span>✉️ Email: support@quickmed.com</span>
//             <span>🕒 Available 24/7</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const styles = {
//   mainContainer: {
//     marginTop: '120px',
//     padding: '0',
//     width: '100vw',
//     marginLeft: '0',
//     marginRight: '0',
//     minHeight: 'calc(100vh - 120px)',
//     overflowX: 'hidden',
//     backgroundColor: '#E0F2F1' // softbg
//   },
//   contentWrapper: {
//     maxWidth: '1400px',
//     margin: '0 auto',
//     padding: '1.5rem',
//     minHeight: 'calc(100vh - 120px)'
//   },
//   backButton: {
//     padding: '0.5rem 1rem',
//     backgroundColor: 'transparent',
//     color: '#009688', // primary
//     border: '1px solid #009688', // primary
//     borderRadius: '6px',
//     cursor: 'pointer',
//     fontSize: '0.9rem',
//     transition: 'all 0.3s ease',
//     ':hover': {
//       backgroundColor: '#009688', // primary
//       color: 'white'
//     }
//   },
//   header: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: '2rem',
//     flexWrap: 'wrap',
//     gap: '1rem'
//   },
//   headerCenter: {
//     textAlign: 'center',
//     flex: 1
//   },
//   mainTitle: {
//     color: '#124441', // darktext
//     fontSize: '2rem',
//     margin: '0 0 0.5rem 0',
//     fontWeight: '700'
//   },
//   subtitle: {
//     color: '#4F6F6B', // softtext
//     margin: '0',
//     fontSize: '1rem'
//   },
//   headerActions: {
//     display: 'flex',
//     alignItems: 'center',
//     gap: '1rem',
//     flexWrap: 'wrap'
//   },
//   searchContainer: {
//     position: 'relative',
//     minWidth: '200px'
//   },
//   searchInput: {
//     padding: '0.75rem 1rem 0.75rem 2.5rem',
//     border: '2px solid #4DB6AC', // mint
//     borderRadius: '8px',
//     fontSize: '0.9rem',
//     width: '80%',
//     outline: 'none',
//     transition: 'border-color 0.3s ease',
//     backgroundColor: '#FFFFFF' // white
//   },
//   bookButton: {
//     padding: '0.75rem 1rem',
//     backgroundColor: '#009688', // primary
//     color: 'white',
//     border: 'none',
//     borderRadius: '8px',
//     cursor: 'pointer',
//     fontSize: '0.9rem',
//     fontWeight: '600',
//     whiteSpace: 'nowrap',
//     minWidth: '130px',
//     transition: 'all 0.3s ease',
//     ':hover': {
//       backgroundColor: '#00796B',
//       transform: 'translateY(-2px)'
//     }
//   },
//   filterContainer: {
//     display: 'flex',
//     gap: '1rem',
//     marginBottom: '2rem',
//     flexWrap: 'wrap',
//     justifyContent: 'center'
//   },
//   filterButton: {
//     padding: '0.75rem 1.5rem',
//     borderRadius: '8px',
//     cursor: 'pointer',
//     fontSize: '0.9rem',
//     fontWeight: '600',
//     transition: 'all 0.3s ease',
//     textTransform: 'capitalize',
//     ':hover': {
//       transform: 'translateY(-2px)'
//     }
//   },
//   appointmentsList: {
//     display: 'grid',
//     gap: '1.5rem',
//     marginBottom: '3rem'
//   },
//   emptyState: {
//     textAlign: 'center',
//     padding: '3rem',
//     backgroundColor: 'white',
//     borderRadius: '12px',
//     boxShadow: '0 2px 15px rgba(0,0,0,0.08)'
//   },
//   emptyTitle: {
//     color: '#124441', // darktext
//     marginBottom: '0.5rem'
//   },
//   emptyText: {
//     color: '#4F6F6B', // softtext
//     marginBottom: '1.5rem'
//   },
//   appointmentCard: {
//     backgroundColor: 'white',
//     borderRadius: '12px',
//     padding: '1.5rem',
//     boxShadow: '0 2px 15px rgba(0,0,0,0.08)',
//     border: '1px solid #4DB6AC', // mint
//     transition: 'transform 0.2s ease, box-shadow 0.2s ease',
//     ':hover': {
//       transform: 'translateY(-4px)',
//       boxShadow: '0 4px 20px rgba(0,0,0,0.12)'
//     }
//   },
//   cardContent: {
//     display: 'flex',
//     gap: '1.5rem',
//     alignItems: 'flex-start'
//   },
//   statusContainer: {
//     display: 'flex',
//     alignItems: 'center',
//     gap: '0.75rem',
//     marginBottom: '1rem',
//     flexWrap: 'wrap'
//   },
//   statusBadge: {
//     padding: '0.25rem 0.75rem',
//     borderRadius: '20px',
//     fontSize: '0.8rem',
//     fontWeight: '600'
//   },
//   idBadge: {
//     color: '#4F6F6B', // softtext
//     fontSize: '0.9rem',
//     fontWeight: '500',
//     backgroundColor: '#E0F2F1', // softbg
//     padding: '0.5rem 1rem',
//     borderRadius: '6px'
//   },
//   idText: {
//     color: '#4F6F6B', // softtext
//     fontSize: '0.85rem',
//     fontWeight: '500'
//   },
//   paymentBadge: {
//     padding: '0.2rem 0.6rem',
//     borderRadius: '12px',
//     fontSize: '0.75rem',
//     fontWeight: '600',
//     display: 'inline-flex',
//     alignItems: 'center',
//     gap: '0.25rem'
//   },
//   doctorName: {
//     color: '#124441', // darktext
//     fontSize: '1.75rem',
//     margin: '0 0 0.5rem 0',
//     fontWeight: '700'
//   },
//   cardDoctorName: {
//     color: '#124441', // darktext
//     fontSize: '1.25rem',
//     margin: '0 0 0.5rem 0',
//     fontWeight: '700'
//   },
//   specialtyText: {
//     color: '#4F6F6B', // softtext
//     margin: '0 0 1.5rem 0',
//     fontSize: '1.1rem',
//     fontWeight: '500'
//   },
//   cardSpecialty: {
//     color: '#4F6F6B', // softtext
//     margin: '0 0 1rem 0',
//     fontSize: '0.9rem'
//   },
//   detailsGrid: {
//     display: 'grid',
//     gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
//     gap: '1.5rem',
//     marginBottom: '2rem'
//   },
//   detailItem: {
//     padding: '1rem',
//     backgroundColor: '#E0F2F1', // softbg
//     borderRadius: '8px',
//     border: '1px solid #4DB6AC' // mint
//   },
//   detailLabel: {
//     color: '#124441', // darktext
//     fontSize: '0.9rem',
//     display: 'block',
//     marginBottom: '0.5rem'
//   },
//   detailValue: {
//     color: '#124441', // darktext
//     margin: 0,
//     fontSize: '1rem',
//     fontWeight: '600'
//   },
//   cardDetails: {
//     display: 'grid',
//     gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
//     gap: '1rem',
//     marginBottom: '1.5rem'
//   },
//   cardLabel: {
//     color: '#009688', // primary
//     fontSize: '0.85rem'
//   },
//   cardValue: {
//     color: '#124441', // darktext
//     margin: '0.25rem 0 0 0',
//     fontSize: '0.9rem',
//     fontWeight: '500'
//   },
//   paymentContainer: {
//     padding: '1.5rem',
//     backgroundColor: '#E0F2F1', // softbg
//     borderRadius: '8px',
//     border: '1px solid #4DB6AC', // mint
//     marginBottom: '1.5rem'
//   },
//   paymentDetails: {
//     display: 'grid',
//     gap: '0.75rem'
//   },
//   paymentDetailRow: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: '0.5rem 0',
//     borderBottom: '1px solid #4DB6AC', // mint
//     ':last-child': {
//       borderBottom: 'none'
//     }
//   },
//   paymentLabel: {
//     color: '#4F6F6B', // softtext
//     fontSize: '0.9rem'
//   },
//   paymentStatus: {
//     padding: '0.25rem 0.75rem',
//     borderRadius: '12px',
//     fontSize: '0.85rem',
//     fontWeight: '600'
//   },
//   paymentValue: {
//     color: '#124441', // darktext
//     fontSize: '0.9rem',
//     fontWeight: '600'
//   },
//   paymentId: {
//     color: '#4F6F6B', // softtext
//     fontSize: '0.85rem',
//     fontFamily: 'monospace'
//   },
//   paymentSummary: {
//     display: 'flex',
//     alignItems: 'center',
//     gap: '1rem',
//     marginTop: '0.5rem',
//     paddingTop: '0.5rem',
//     borderTop: '1px solid #4DB6AC' // mint
//   },
//   paymentAmount: {
//     color: '#059669',
//     fontSize: '0.85rem',
//     fontWeight: '600'
//   },
//   paymentIdSmall: {
//     color: '#4F6F6B', // softtext
//     fontSize: '0.8rem',
//     fontFamily: 'monospace'
//   },
//   notesContainer: {
//     padding: '1.5rem',
//     backgroundColor: '#E0F2F1', // softbg
//     borderRadius: '8px',
//     border: '1px solid #4DB6AC' // mint
//   },
//   sectionTitle: {
//     color: '#124441', // darktext
//     marginBottom: '1rem',
//     fontSize: '1.1rem',
//     fontWeight: '600'
//   },
//   notesText: {
//     color: '#4F6F6B', // softtext
//     margin: '0 0 0.5rem 0',
//     fontSize: '0.9rem',
//     lineHeight: '1.6'
//   },
//   gridContainer: {
//     display: 'grid',
//     gridTemplateColumns: '1fr',
//     gap: '2rem',
//     alignItems: 'start'
//   },
//   card: {
//     backgroundColor: 'white',
//     borderRadius: '12px',
//     padding: '2rem',
//     boxShadow: '0 2px 15px rgba(0,0,0,0.08)',
//     border: '1px solid #4DB6AC', // mint
//     marginBottom: '1.5rem'
//   },
//   cardHeader: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'flex-start',
//     marginBottom: '2rem',
//     flexWrap: 'wrap',
//     gap: '1rem'
//   },
//   infoGrid: {
//     display: 'grid',
//     gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
//     gap: '1.5rem',
//     marginBottom: '1.5rem'
//   },
//   infoRow: {
//     marginBottom: '0.5rem'
//   },
//   infoLabel: {
//     color: '#009688', // primary
//     fontSize: '0.9rem',
//     display: 'block',
//     marginBottom: '0.25rem'
//   },
//   infoValue: {
//     color: '#124441', // darktext
//     margin: 0,
//     fontSize: '0.9rem',
//     fontWeight: '500'
//   },
//   aboutText: {
//     color: '#4F6F6B', // softtext
//     margin: '0.5rem 0 0 0',
//     fontSize: '0.9rem',
//     lineHeight: '1.6'
//   },
//   clinicItem: {
//     marginBottom: '1.5rem'
//   },
//   clinicLabel: {
//     color: '#009688', // primary
//     fontSize: '0.9rem',
//     display: 'block',
//     marginBottom: '0.5rem'
//   },
//   clinicText: {
//     color: '#124441', // darktext
//     margin: 0,
//     fontSize: '0.9rem',
//     fontWeight: '500'
//   },
//   clinicTextMultiline: {
//     color: '#4F6F6B', // softtext
//     margin: 0,
//     fontSize: '0.9rem',
//     lineHeight: '1.5',
//     whiteSpace: 'pre-line'
//   },
//   detailsHeader: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: '2rem',
//     flexWrap: 'wrap',
//     gap: '1rem'
//   },
//   cardAbout: {
//     color: '#4F6F6B', // softtext
//     fontSize: '0.85rem',
//     lineHeight: '1.5',
//     margin: '0.5rem 0'
//   },
//   actionButtons: {
//     display: 'flex',
//     flexDirection: 'column',
//     gap: '0.75rem',
//     minWidth: '140px'
//   },
//   viewButton: {
//     padding: '0.6rem 1rem',
//     backgroundColor: 'transparent',
//     color: '#124441', // darktext
//     border: '1px solid #009688', // primary
//     borderRadius: '6px',
//     cursor: 'pointer',
//     fontSize: '0.8rem',
//     fontWeight: '600',
//     transition: 'all 0.3s ease'
//   },
//   footer: {
//     backgroundColor: 'white',
//     borderRadius: '12px',
//     padding: '1.5rem',
//     boxShadow: '0 2px 15px rgba(0,0,0,0.08)',
//     border: '1px solid #4DB6AC', // mint
//     textAlign: 'center'
//   },
//   footerTitle: {
//     color: '#124441', // darktext
//     marginBottom: '1rem'
//   },
//   footerText: {
//     color: '#4F6F6B', // softtext
//     fontSize: '0.9rem',
//     marginBottom: '1rem'
//   },
//   contactInfo: {
//     display: 'flex',
//     justifyContent: 'center',
//     gap: '2rem',
//     flexWrap: 'wrap',
//     fontSize: '0.9rem',
//     color: '#4F6F6B' // softtext
//   }
// };

// export default AppointmentsView;


import React, { useState, useEffect } from 'react';
import './AppointmentsView.css';

const AppointmentsView = ({
  appointments,
  appointmentFilter,
  setAppointmentFilter,
  setActiveView
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [validatedAppointments, setValidatedAppointments] = useState(appointments);

  // Validate appointments data
  useEffect(() => {
    const validatedAppointments = appointments.map(appt => ({
      id: appt.id || `appt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      doctorName: appt.doctorName || 'Dr. Unknown',
      doctorSpecialty: appt.doctorSpecialty || appt.doctor?.specialty || 'General',
      date: appt.date || appt.appointmentDateTime?.split('T')[0] || new Date().toISOString().split('T')[0],
      time: appt.time || appt.appointmentDateTime?.split('T')[1]?.substring(0, 5) || '10:00',
      status: appt.status || 'pending',
      type: appt.type || 'clinic',
      fee: appt.fee || appt.payment?.amount || '500',
      category: appt.category || 'General',
      hospital: appt.hospital || 'QuickMed Clinic',
      priority: appt.priority || 'L2',
      payment: appt.payment || null,
      createdAt: appt.createdAt || new Date().toISOString(),
      ...appt
    }));
    
    if (JSON.stringify(validatedAppointments) !== JSON.stringify(appointments)) {
      setValidatedAppointments(validatedAppointments);
    } else {
      setValidatedAppointments(appointments);
    }
  }, [appointments]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [appointmentFilter, searchTerm]);

  const BackButton = ({ onClick, text = 'Back' }) => (
    <button 
      className="back-button"
      onClick={() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        setTimeout(() => onClick(), 100);
      }}
      type="button"
    >
      ← {text}
    </button>
  );

  const handleViewDetails = (appointment) => {
    setSelectedAppointment(appointment);
    setShowDetails(true);
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  const handleBackToList = () => {
    setShowDetails(false);
    setSelectedAppointment(null);
  };

  const getFilteredAppointments = () => {
    let filtered = validatedAppointments;
    
    if (appointmentFilter !== 'all') {
      filtered = validatedAppointments.filter(appt => {
        const status = appt.status ? appt.status.toLowerCase() : 'pending';
        const filter = appointmentFilter.toLowerCase();
        
        if (filter === 'confirmed') {
          return status === 'confirmed' || status === 'scheduled';
        } else if (filter === 'pending') {
          return status === 'pending';
        } else if (filter === 'completed') {
          return status === 'completed';
        }
        return true;
      });
    }
    
    if (searchTerm.trim() !== '') {
      filtered = filtered.filter(appt => {
        const searchLower = searchTerm.toLowerCase();
        return (
          (appt.doctorName && appt.doctorName.toLowerCase().includes(searchLower)) ||
          (appt.doctorSpecialty && appt.doctorSpecialty.toLowerCase().includes(searchLower)) ||
          (appt.id && appt.id.toLowerCase().includes(searchLower)) ||
          (appt.hospital && appt.hospital.toLowerCase().includes(searchLower))
        );
      });
    }
    
    return filtered.sort((a, b) => {
      const dateA = new Date(a.date || a.appointmentDateTime || 0);
      const dateB = new Date(b.date || b.appointmentDateTime || 0);
      return dateB - dateA;
    });
  };

  const displayAppointments = getFilteredAppointments();

  const formatDate = (dateString) => {
    if (!dateString) return 'Not set';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return dateString;
      return date.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    } catch {
      return dateString;
    }
  };

  const formatTime = (timeString) => {
    if (!timeString) return 'Not set';
    
    if (timeString.includes('T')) {
      try {
        const date = new Date(timeString);
        if (!isNaN(date.getTime())) {
          return date.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true 
          });
        }
      } catch {
        // Continue to other formats
      }
    }
    
    if (timeString.includes('AM') || timeString.includes('PM')) {
      return timeString;
    }
    
    if (timeString.includes(':')) {
      const [hours, minutes] = timeString.split(':');
      const hour = parseInt(hours);
      const ampm = hour >= 12 ? 'PM' : 'AM';
      const formattedHour = hour % 12 || 12;
      return `${formattedHour}:${minutes} ${ampm}`;
    }
    
    return timeString;
  };

  const getStatusColor = (status) => {
    const statusStyles = {
      confirmed: { background: '#E8F5E8', color: '#2E7D32', border: '1px solid #C8E6C9' },
      scheduled: { background: '#E8F5E8', color: '#2E7D32', border: '1px solid #C8E6C9' },
      pending: { background: '#FFF3E0', color: '#EF6C00', border: '1px solid #FFE0B2' },
      completed: { background: '#F5F5F5', color: '#424242', border: '1px solid #E0E0E0' }
    };
    return statusStyles[status?.toLowerCase()] || statusStyles.pending;
  };

  const getPaymentStatusColor = (status) => {
    const paymentStyles = {
      completed: { background: '#E8F5E8', color: '#2E7D32', icon: '✓' },
      pending: { background: '#FFF3E0', color: '#EF6C00', icon: '⏳' },
      failed: { background: '#FFEBEE', color: '#D32F2F', icon: '✕' }
    };
    return paymentStyles[status] || paymentStyles.pending;
  };

  const getPriorityBadge = (priority) => {
    const priorityStyles = {
      'L1': { background: '#FEE2E2', color: '#DC2626',  label: 'High Priority' },
      'L2': { background: '#FEF3C7', color: '#D97706',  label: 'Medium Priority' },
      'L3': { background: '#D1FAE5', color: '#059669',  label: 'Low Priority' }
    };
    const style = priorityStyles[priority] || priorityStyles['L2'];
    
    return (
      <span 
        className="priority-badge"
        style={{
          backgroundColor: style.background,
          color: style.color
        }}
      >
        {style.icon} {style.label}
      </span>
    );
  };

  const doctorDatabase = {
    "Dr. Ananya Sharma": {
      specialty: "Pediatrics", 
      experience: "12+ years", 
      education: "MBBS, MD - Pediatrics",
      languages: "English, Hindi, Telugu", 
      rating: "4.9/5", 
      about: "Specialized in newborn care, vaccinations, and developmental disorders.",
      clinic: "Apollo Children's Hospital", 
      address: "123 Health Street, Medical District, Hyderabad"
    },
    "Dr. Rohan Verma": {
      specialty: "Pediatric Cardiology", 
      experience: "15+ years", 
      education: "MBBS, DM - Cardiology",
      languages: "English, Hindi", 
      rating: "4.8/5", 
      about: "Expert in congenital heart defects and pediatric heart care.",
      clinic: "Fortis Hospital", 
      address: "456 Cardiac Road, Medical District, Hyderabad"
    },
    "Dr. Priya Reddy": {
      specialty: "Pediatric Neurology", 
      experience: "10+ years", 
      education: "MBBS, DM - Neurology",
      languages: "English, Telugu, Tamil", 
      rating: "4.7/5", 
      about: "Specialized in epilepsy, developmental delays, and neurological disorders in children.",
      clinic: "Narayana Health", 
      address: "789 Neuro Street, Medical District, Hyderabad"
    },
    "Dr. Amit Patel": {
      specialty: "Pediatric Gastroenterology", 
      experience: "8+ years", 
      education: "MBBS, DM - Gastroenterology",
      languages: "English, Hindi, Gujarati", 
      rating: "4.6/5", 
      about: "Expert in digestive disorders, nutrition, and feeding issues in infants.",
      clinic: "Medanta Hospital", 
      address: "321 Digestive Road, Medical District, Hyderabad"
    },
    "Dr. Charitha Kasturi": {
      specialty: "General Pediatrics", 
      experience: "20+ years", 
      education: "MBBS, DCH, MD - Pediatrics",
      languages: "English, Telugu", 
      rating: "4.9/5", 
      about: "Expert in routine checkups, vaccinations, and growth monitoring.",
      clinic: "KIMS Hospital", 
      address: "654 Child Care Street, Medical District, Hyderabad"
    },
    "Dr. Sarah Johnson": {
      specialty: "Obstetrics & Gynecology", 
      experience: "15+ years", 
      education: "MBBS, MD - OBGY",
      languages: "English, Hindi", 
      rating: "4.9/5", 
      about: "Expert in high-risk pregnancies, prenatal care, and delivery.",
      clinic: "Apollo Hospital", 
      address: "987 Maternity Road, Medical District, Hyderabad"
    },
    "Dr. Priya Sharma": {
      specialty: "Maternal-Fetal Medicine", 
      experience: "12+ years", 
      education: "MBBS, DM - Fetal Medicine",
      languages: "English, Telugu, Tamil", 
      rating: "4.8/5", 
      about: "Specialized in fetal medicine, genetic counseling, and prenatal diagnosis.",
      clinic: "Fortis La Femme", 
      address: "147 Fetal Care Road, Medical District, Hyderabad"
    },
    "Dr. Meera Reddy": {
      specialty: "Obstetrics & Gynecology", 
      experience: "18+ years", 
      education: "MBBS, MD - OBGY",
      languages: "English, Telugu, Hindi", 
      rating: "4.9/5", 
      about: "Expert in normal deliveries, pregnancy care, and postnatal recovery.",
      clinic: "KIMS Cuddles", 
      address: "258 Delivery Street, Medical District, Hyderabad"
    },
    "Dr. Anjali Gupta": {
      specialty: "Pregnancy Nutrition & Wellness", 
      experience: "10+ years", 
      education: "MBBS, MSc - Nutrition",
      languages: "English, Hindi, Gujarati", 
      rating: "4.7/5", 
      about: "Specialized in pregnancy nutrition, weight management, and gestational diabetes.",
      clinic: "Manipal Hospital", 
      address: "369 Nutrition Road, Medical District, Hyderabad"
    },
    "Dr. Kavita Singh": {
      specialty: "Pregnancy Mental Health", 
      experience: "8+ years", 
      education: "MBBS, MD - Psychiatry",
      languages: "English, Hindi, Punjabi", 
      rating: "4.6/5", 
      about: "Expert in prenatal and postpartum depression, anxiety, and mental wellness.",
      clinic: "Max Healthcare", 
      address: "741 Mental Health Street, Medical District, Hyderabad"
    },
    "Dr. Radha Menon": {
      specialty: "Pregnancy Yoga & Fitness", 
      experience: "14+ years", 
      education: "MBBS, Certified Yoga Instructor",
      languages: "English, Malayalam, Tamil", 
      rating: "4.8/5", 
      about: "Certified pregnancy yoga instructor and fitness expert for all trimesters.",
      clinic: "Aster Maternity", 
      address: "852 Yoga Road, Medical District, Hyderabad"
    },
    "Dr. Arjun Mehta": {
      specialty: "General Physician & Pregnancy Care", 
      experience: "18+ years", 
      education: "MBBS, MD - General Medicine",
      languages: "English, Hindi, Bengali", 
      rating: "4.8/5", 
      about: "Expert in pregnancy care, routine checkups, and general health consultations for expecting mothers.",
      clinic: "Global Health City", 
      address: "963 Health Street, Medical District, Hyderabad"
    },
    "Dr. Neha Kapoor": {
      specialty: "Family Medicine & Baby Care", 
      experience: "14+ years", 
      education: "MBBS, MD - Family Medicine",
      languages: "English, Hindi, Punjabi", 
      rating: "4.7/5", 
      about: "Specialized in family health, baby care, vaccinations, and pediatric wellness.",
      clinic: "Columbia Asia Hospital", 
      address: "159 Family Care Road, Medical District, Hyderabad"
    },
    "Dr. Vikram Singh": {
      specialty: "General Medicine & Pregnancy Consultation", 
      experience: "20+ years", 
      education: "MBBS, MD - General Medicine",
      languages: "English, Hindi, Tamil", 
      rating: "4.9/5", 
      about: "Comprehensive care for pregnancy, general health issues, and chronic disease management.",
      clinic: "Apollo Hospitals", 
      address: "357 Comprehensive Care Street, Medical District, Hyderabad"
    },
    "Dr. Sunita Rao": {
      specialty: "Women's Health & Baby Wellness", 
      experience: "16+ years", 
      education: "MBBS, MD - Gynecology",
      languages: "English, Hindi, Telugu", 
      rating: "4.8/5", 
      about: "Expert in women's health, pregnancy care, baby wellness, and postnatal recovery.",
      clinic: "Fortis La Femme", 
      address: "753 Women's Health Road, Medical District, Hyderabad"
    },
    "Dr. Rajesh Kumar": {
      specialty: "General Physician & Child Care", 
      experience: "12+ years", 
      education: "MBBS, MD - General Medicine",
      languages: "English, Hindi, Marathi", 
      rating: "4.6/5", 
      about: "Specialized in child healthcare, general medicine, and family wellness consultations.",
      clinic: "Manipal Hospital", 
      address: "951 Child Health Street, Medical District, Hyderabad"
    },
    "Dr. Pooja Sharma": {
      specialty: "Pregnancy & Newborn Care Specialist", 
      experience: "15+ years", 
      education: "MBBS, MD - Pediatrics",
      languages: "English, Hindi, Gujarati", 
      rating: "4.9/5", 
      about: "Comprehensive care for expecting mothers and newborn babies including lactation support.",
      clinic: "Max Super Specialty Hospital", 
      address: "864 Newborn Care Road, Medical District, Hyderabad"
    }
  };

  const AppointmentDetails = ({ appointment, onBack }) => {
    const doctorInfo = doctorDatabase[appointment.doctorName] || {
      specialty: appointment.doctorSpecialty || "Medical Specialist",
      experience: appointment.doctorExperience || "Experienced professional",
      education: "Medical degree",
      languages: "English",
      rating: "4.5/5",
      about: "Qualified medical professional providing excellent care.",
      clinic: appointment.hospital || "QuickMed Clinic",
      address: "123 Health Street, Medical District"
    };

    const statusStyle = getStatusColor(appointment.status);
    const paymentStyle = appointment.payment ? getPaymentStatusColor(appointment.payment.status) : null;

    return (
      <div className="main-container">
        <div className="content-wrapper">
          <div className="details-header">
            <BackButton onClick={onBack} text="Back to Appointments" />
            <div className="header-center">
              <h1 className="main-title">Appointment Details</h1>
              <p className="subtitle">Complete information about your appointment</p>
            </div>
            <div style={{ width: '140px' }}></div>
          </div>

          <div className="grid-container">
            <div className="card">
              <div className="card-header">
                <div>
                  <div className="status-container">
                    <span 
                      className="status-badge"
                      style={{ ...statusStyle }}
                    >
                      {appointment.status?.charAt(0).toUpperCase() + appointment.status?.slice(1) || 'Pending'}
                    </span>
                    <span className="id-badge">ID: {appointment.id}</span>
                    {appointment.priority && getPriorityBadge(appointment.priority)}
                  </div>
                  <h2 className="doctor-name">{appointment.doctorName}</h2>
                  <p className="specialty-text">{doctorInfo.specialty}</p>
                </div>
              </div>

              <div className="details-grid">
                {[
                  { label: 'Appointment Date', value: formatDate(appointment.date) },
                  { label: 'Appointment Time', value: formatTime(appointment.time) },
                  { label: 'Consultation Type', value: appointment.type === 'home' ? 'Home Consultation' : 'Clinic Appointment' },
                  { label: 'Consultation Fee', value: `₹${appointment.fee || '500'}` },
                  { label: 'Category', value: appointment.category || 'General' },
                  { label: 'Hospital/Clinic', value: appointment.hospital || doctorInfo.clinic }
                ].map((item, idx) => (
                  <div key={idx} className="detail-item">
                    <strong className="detail-label">{item.label}</strong>
                    <p className="detail-value">{item.value}</p>
                  </div>
                ))}
              </div>

              {appointment.payment && (
                <div className="payment-container">
                  <h4 className="section-title">Payment Information</h4>
                  <div className="payment-details">
                    <div className="payment-detail-row">
                      <strong className="payment-label">Status:</strong>
                      <span 
                        className="payment-status"
                        style={{
                          backgroundColor: paymentStyle.background,
                          color: paymentStyle.color
                        }}
                      >
                        {paymentStyle.icon} {appointment.payment.status.charAt(0).toUpperCase() + appointment.payment.status.slice(1)}
                      </span>
                    </div>
                    <div className="payment-detail-row">
                      <strong className="payment-label">Amount:</strong>
                      <span className="payment-value">₹{appointment.payment.amount}</span>
                    </div>
                    {appointment.payment.paymentId && (
                      <div className="payment-detail-row">
                        <strong className="payment-label">Payment ID:</strong>
                        <span className="payment-id">{appointment.payment.paymentId}</span>
                      </div>
                    )}
                    {appointment.payment.orderId && (
                      <div className="payment-detail-row">
                        <strong className="payment-label">Order ID:</strong>
                        <span className="payment-id">{appointment.payment.orderId}</span>
                      </div>
                    )}
                    {appointment.payment.timestamp && (
                      <div className="payment-detail-row">
                        <strong className="payment-label">Paid on:</strong>
                        <span>{new Date(appointment.payment.timestamp).toLocaleDateString('en-US', { 
                          year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' 
                        })}</span>
                      </div>
                    )}
                    {appointment.payment.method && (
                      <div className="payment-detail-row">
                        <strong className="payment-label">Payment Method:</strong>
                        <span>{appointment.payment.method}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="notes-container">
                <h4 className="section-title">Additional Information</h4>
                <p className="notes-text">
                  {appointment.type === 'home' 
                    ? 'Home Consultation: Doctor will contact you for address confirmation. Please be available at the scheduled time.' 
                    : 'Clinic Appointment: Please arrive 15 minutes before your scheduled time. Bring your ID and any previous medical records.'}
                </p>
                {appointment.hospital && (
                  <p className="notes-text">
                    <strong>Hospital:</strong> {appointment.hospital}
                  </p>
                )}
                {appointment.createdAt && (
                  <p className="notes-text">
                    <strong>Booked on:</strong> {new Date(appointment.createdAt).toLocaleDateString('en-US', { 
                      year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' 
                    })}
                  </p>
                )}
              </div>
            </div>

            <div className="card">
              <h3 className="section-title">About Dr. {appointment.doctorName.replace('Dr. ', '')}</h3>
              <div className="info-grid">
                {[
                  { label: 'Experience:', value: doctorInfo.experience },
                  { label: 'Education:', value: doctorInfo.education },
                  { label: 'Languages:', value: doctorInfo.languages },
                  { label: 'Rating:', value: doctorInfo.rating }
                ].map((item, idx) => (
                  <div key={idx} className="info-row">
                    <strong className="info-label">{item.label}</strong>
                    <p className="info-value">{item.value}</p>
                  </div>
                ))}
              </div>
              <div>
                <strong className="info-label">About the Doctor:</strong>
                <p className="about-text">{doctorInfo.about}</p>
              </div>
            </div>

            <div className="card">
              <h3 className="section-title">Clinic Information</h3>
              {[
                { label: 'Clinic Name', value: doctorInfo.clinic },
                { label: 'Address', value: doctorInfo.address, multiline: true },
                { label: 'Contact', value: '📞 1-800-QUICK-MED\n✉️ info@quickmed.com', multiline: true }
              ].map((item, idx) => (
                <div key={idx} className="clinic-item">
                  <strong className="clinic-label">{item.label}</strong>
                  <p className={item.multiline ? "clinic-text-multiline" : "clinic-text"}>{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (showDetails && selectedAppointment) {
    return <AppointmentDetails appointment={selectedAppointment} onBack={handleBackToList} />;
  }

  return (
    <div className="main-container">
      <div className="content-wrapper">
        <div className="header">
          <BackButton onClick={() => setActiveView('dashboard')} text="Dashboard" />
          <div className="header-center">
            <h1 className="main-title">My Appointments</h1>
            <p className="subtitle">Quick Care, Better Health</p>
          </div>
          <div className="header-actions">
            <div className="search-container">
              <input
                type="text"
                placeholder="Search doctors, specialties, or appointment ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <span className="search-icon"></span>
            </div>
            <button 
              className="book-button"
              onClick={() => {
                window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                setTimeout(() => setActiveView('consultation'), 100);
              }}
              type="button"
            >
              + Book New Appointment
            </button>
          </div>
        </div>

        <div className="filter-container">
          {['all', 'confirmed', 'pending', 'completed'].map((filter) => (
            <button
              key={filter}
              onClick={() => setAppointmentFilter(filter)}
              className={`filter-button ${appointmentFilter === filter ? 'active' : ''}`}
              type="button"
            >
              {filter === 'all' ? 'All Appointments' : 
               filter === 'confirmed' ? 'Confirmed' :
               filter === 'pending' ? 'Pending Payment' : 'Completed'}
            </button>
          ))}
        </div>

        <div className="appointments-list">
          {displayAppointments.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📅</div>
              <h3 className="empty-title">No Appointments Found</h3>
              <p className="empty-text">
                {searchTerm || appointmentFilter !== 'all' 
                  ? 'Try adjusting your search or filter criteria.' 
                  : 'You don\'t have any appointments yet.'}
              </p>
              <button 
                className="book-button"
                onClick={() => {
                  setSearchTerm('');
                  setAppointmentFilter('all');
                  setActiveView('consultation');
                }}
                type="button"
              >
                Book Your First Appointment
              </button>
            </div>
          ) : (
            displayAppointments.map((appointment) => {
              const statusStyle = getStatusColor(appointment.status);
              const paymentStyle = appointment.payment ? getPaymentStatusColor(appointment.payment.status) : null;
              
              const doctorInfo = doctorDatabase[appointment.doctorName] || {
                specialty: appointment.doctorSpecialty || "Medical Specialist",
                experience: appointment.doctorExperience || "Experienced professional",
                rating: "4.5/5",
                about: "Qualified medical professional providing excellent care."
              };

              return (
                <div key={appointment.id} className="appointment-card">
                  <div className="card-content">
                    <div className="card-content-left">
                      <div className="status-container">
                        <span 
                          className="status-badge"
                          style={{ ...statusStyle }}
                        >
                          {appointment.status?.charAt(0).toUpperCase() + appointment.status?.slice(1) || 'Pending'}
                        </span>
                        <span className="id-text">ID: {appointment.id}</span>
                        {appointment.priority && (
                          <span 
                            className={`priority-indicator priority-${appointment.priority}`}
                          >
                            {appointment.priority === 'L1' ? '⚠️ High' : 
                             appointment.priority === 'L2' ? '⚡ Medium' : '✅ Low'}
                          </span>
                        )}
                        {appointment.payment && (
                          <span 
                            className="payment-badge"
                            style={{
                              backgroundColor: paymentStyle.background,
                              color: paymentStyle.color
                            }}
                          >
                            {paymentStyle.icon} {appointment.payment.status.charAt(0).toUpperCase() + appointment.payment.status.slice(1)}
                          </span>
                        )}
                      </div>
                      <h3 className="card-doctor-name">{appointment.doctorName}</h3>
                      <p className="card-specialty">
                        {doctorInfo.specialty} • {doctorInfo.experience} • Rating: {doctorInfo.rating}
                      </p>
                      <div className="card-details">
                        <div>
                          <strong className="card-label">Date:</strong>
                          <p className="card-value">{formatDate(appointment.date)}</p>
                        </div>
                        <div>
                          <strong className="card-label">Time:</strong>
                          <p className="card-value">{formatTime(appointment.time)}</p>
                        </div>
                        <div>
                          <strong className="card-label">Type:</strong>
                          <p className="card-value">
                            {appointment.type === 'home' ? 'Home Consultation' : 'Clinic Appointment'}
                          </p>
                        </div>
                        <div>
                          <strong className="card-label">Fee:</strong>
                          <p className="card-value">₹{appointment.fee || '500'}</p>
                        </div>
                      </div>
                      <p className="card-about">{doctorInfo.about}</p>
                      {appointment.payment && (
                        <div className="payment-summary">
                          <span className="payment-amount">Paid: ₹{appointment.payment.amount}</span>
                          {appointment.payment.paymentId && (
                            <span className="payment-id-small">Payment ID: {appointment.payment.paymentId.slice(0, 8)}...</span>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="action-buttons">
                      <button
                        onClick={() => handleViewDetails(appointment)}
                        className="view-button"
                        type="button"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="footer">
          <h4 className="footer-title">Need Help?</h4>
          <p className="footer-text">
            Contact our support team for assistance with appointments, payments, or medical queries.
          </p>
          <div className="contact-info">
            <span>📞 Support: 1-800-QUICK-MED</span>
            <span>✉️ Email: support@quickmed.com</span>
            <span>🕒 Available 24/7</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentsView;