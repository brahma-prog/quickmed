// // LabTestsView.js
// import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';

// const LabTestsView = ({ setActiveView, addNotification }) => {
//   const [activeTab, setActiveTab] = useState('book');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('all');
//   const [cart, setCart] = useState([]);
//   const [selectedFamilyMember, setSelectedFamilyMember] = useState('self');
//   const [selectedLab, setSelectedLab] = useState(null);
//   const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
//   const [bookingStep, setBookingStep] = useState(1);
//   const [currentBooking, setCurrentBooking] = useState(null);
//   const [liveTracking, setLiveTracking] = useState(false);
//   const [phlebotomistLocation, setPhlebotomistLocation] = useState({ lat: 12.9716, lng: 77.5946 });
//   const [phlebotomistStatus, setPhlebotomistStatus] = useState('assigned');
//   const [estimatedArrival, setEstimatedArrival] = useState(15);
//   const [reportProgress, setReportProgress] = useState(0);
//   const [downloadingReport, setDownloadingReport] = useState(null);
  
//   // Use refs to persist values without causing re-renders
//   const searchInputRef = useRef(null);
  
//   const [bookingHistory, setBookingHistory] = useState([
//     {
//       id: 'LAB001',
//       tests: ['Complete Blood Count', 'Liver Function Test'],
//       lab: 'Metropolis Laboratory',
//       date: '2024-01-15',
//       time: '08:00 AM',
//       status: 'Completed',
//       results: 'Available',
//       amount: 1200,
//       reportUrl: '#',
//       familyMember: 'Self',
//       phlebotomist: 'Dr. Ramesh Kumar',
//       trackingId: 'TRK001',
//       sampleCollectionTime: '08:15 AM',
//       reportReadyTime: '2024-01-16 10:30 AM',
//       reportData: {
//         patientName: 'John Doe',
//         age: 28,
//         gender: 'Male',
//         referenceNo: 'LAB001',
//         collectedDate: '2024-01-15',
//         reportedDate: '2024-01-16',
//         tests: [
//           {
//             name: 'Complete Blood Count (CBC)',
//             results: [
//               { parameter: 'Hemoglobin', value: '14.2', unit: 'g/dL', normalRange: '13.5-17.5', status: 'normal' },
//               { parameter: 'RBC Count', value: '4.8', unit: 'million/µL', normalRange: '4.5-5.5', status: 'normal' },
//               { parameter: 'WBC Count', value: '7.2', unit: 'thousand/µL', normalRange: '4.0-11.0', status: 'normal' },
//               { parameter: 'Platelet Count', value: '250', unit: 'thousand/µL', normalRange: '150-400', status: 'normal' },
//               { parameter: 'Hematocrit', value: '42', unit: '%', normalRange: '40-50', status: 'normal' }
//             ]
//           },
//           {
//             name: 'Liver Function Test (LFT)',
//             results: [
//               { parameter: 'SGOT (AST)', value: '22', unit: 'U/L', normalRange: '0-40', status: 'normal' },
//               { parameter: 'SGPT (ALT)', value: '25', unit: 'U/L', normalRange: '0-41', status: 'normal' },
//               { parameter: 'Alkaline Phosphatase', value: '85', unit: 'U/L', normalRange: '44-147', status: 'normal' },
//               { parameter: 'Total Bilirubin', value: '0.8', unit: 'mg/dL', normalRange: '0.2-1.2', status: 'normal' },
//               { parameter: 'Direct Bilirubin', value: '0.2', unit: 'mg/dL', normalRange: '0.0-0.3', status: 'normal' }
//             ]
//           }
//         ],
//         labDetails: {
//           name: 'Metropolis Laboratory',
//           address: '123 Health Street, Medical Complex, Bangalore',
//           accreditation: 'NABL, CAP Certified',
//           labDirector: 'Dr. Rajesh Verma',
//           phone: '+91 80 2345 6789',
//           email: 'reports@metropolisindia.com'
//         },
//         interpretation: 'All parameters are within normal limits. No significant abnormalities detected.',
//         recommendations: [
//           'Maintain healthy lifestyle with regular exercise',
//           'Continue with balanced diet rich in fruits and vegetables',
//           'Follow up annually for routine health checkup'
//         ]
//       }
//     },
//     {
//       id: 'LAB002',
//       tests: ['Thyroid Profile', 'Vitamin D'],
//       lab: 'Thyrocare',
//       date: '2024-01-20',
//       time: '10:30 AM',
//       status: 'Sample Collected',
//       results: 'Testing in Progress',
//       amount: 1500,
//       familyMember: 'Mother',
//       phlebotomist: 'Dr. Priya Sharma',
//       trackingId: 'TRK002',
//       sampleCollectionTime: '10:45 AM',
//       reportProgress: 60
//     }
//   ]);

//   // Static data - no need to memoize if it doesn't change
//   const familyMembers = [
//     { id: 'self', name: 'Self', relation: 'Self', age: 28 },
//     { id: 'father', name: 'Rajesh Kumar', relation: 'Father', age: 58 },
//     { id: 'mother', name: 'Sita Devi', relation: 'Mother', age: 55 },
//     { id: 'spouse', name: 'Priya Sharma', relation: 'Spouse', age: 27 },
//     { id: 'child', name: 'Aarav Kumar', relation: 'Son', age: 4 }
//   ];

//   const labTests = [
//     {
//       id: 1,
//       name: 'Complete Blood Count (CBC)',
//       category: 'blood',
//       price: 400,
//       fasting: 'Not Required',
//       reportTime: '6 hours',
//       description: 'Measures different components of blood including red cells, white cells, and platelets. Essential for overall health screening.',
//       popular: true,
//       image: 'https://arthdiagnostics.com/wp-content/uploads/2024/11/CBC-Test-in-Udaipur-350x250.jpg',
//       recommendedFor: ['Anemia screening', 'Infection detection', 'General health checkup'],
//       preparation: 'No special preparation required'
//     },
//     {
//       id: 2,
//       name: 'Thyroid Profile (TSH, T3, T4)',
//       category: 'hormone',
//       price: 600,
//       fasting: 'Fasting Required',
//       reportTime: '24 hours',
//       description: 'Comprehensive thyroid function test including T3, T4, and TSH levels. Detects hyper/hypothyroidism.',
//       popular: true,
//       image: 'https://cdn1.healthians.com/blog/wp-content/uploads/2021/02/74.jpg',
//       recommendedFor: ['Weight changes', 'Fatigue', 'Mood swings'],
//       preparation: '8-12 hours fasting recommended'
//     },
//     {
//       id: 3,
//       name: 'Liver Function Test (LFT)',
//       category: 'organ',
//       price: 800,
//       fasting: 'Fasting Required',
//       reportTime: '12 hours',
//       description: 'Assesses liver health by measuring enzymes, proteins, and bilirubin. Detects liver damage.',
//       popular: false,
//       image: 'https://www.shutterstock.com/shutterstock/photos/2587246243/display_1500/stock-vector-liver-function-tests-are-blood-tests-that-measure-different-substances-produced-by-your-liver-2587246243.jpg',
//       recommendedFor: ['Alcohol consumption', 'Medication monitoring', 'Jaundice'],
//       preparation: '10-12 hours fasting required'
//     },
//     {
//       id: 4,
//       name: 'Kidney Function Test (KFT)',
//       category: 'organ',
//       price: 700,
//       fasting: 'Fasting Required',
//       reportTime: '12 hours',
//       description: 'Evaluates kidney function through creatinine, urea, and electrolyte levels.',
//       popular: false,
//       image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbJFQMnDD62kh4AoSPYL77bqBJRnTqGLpM1g&s',
//       recommendedFor: ['High BP patients', 'Diabetes patients', 'Swelling in legs'],
//       preparation: '10-12 hours fasting required'
//     },
//     {
//       id: 5,
//       name: 'Diabetes Screening (HbA1c + Fasting)',
//       category: 'metabolic',
//       price: 300,
//       fasting: 'Fasting Required',
//       reportTime: '24 hours',
//       description: 'Comprehensive diabetes screening including HbA1c and fasting blood glucose.',
//       popular: true,
//       image: 'https://www.metropolisindia.com/upgrade/blog/upload/2020/12/hba1c-checkup-importance-Metropolis-Healthcare.jpg',
//       recommendedFor: ['Family history of diabetes', 'Frequent urination', 'Increased thirst'],
//       preparation: '8-10 hours fasting required'
//     },
//     {
//       id: 6,
//       name: 'Vitamin D (25-OH) Test',
//       category: 'vitamin',
//       price: 900,
//       fasting: 'Not Required',
//       reportTime: '48 hours',
//       description: 'Measures Vitamin D levels essential for bone health, immunity and mood regulation.',
//       popular: true,
//       image: 'https://images.apollo247.in/pd-cms/cms/inline-images/Vitamin-D-Test-Details_0.jpg',
//       recommendedFor: ['Bone pain', 'Fatigue', 'Weak immunity'],
//       preparation: 'No special preparation'
//     },
//     {
//       id: 7,
//       name: 'Lipid Profile',
//       category: 'cardiac',
//       price: 500,
//       fasting: 'Fasting Required',
//       reportTime: '12 hours',
//       description: 'Complete cholesterol check including HDL, LDL, triglycerides and total cholesterol.',
//       popular: true,
//       image: 'https://karaulidiagnostics.com/wp-content/uploads/2024/08/1613636799_Lipid_big_450.jpg',
//       recommendedFor: ['Heart health check', 'High cholesterol', 'Family history'],
//       preparation: '12-14 hours fasting required'
//     },
//     {
//       id: 8,
//       name: 'Complete Urine Examination',
//       category: 'routine',
//       price: 200,
//       fasting: 'Not Required',
//       reportTime: '4 hours',
//       description: 'Complete urine analysis for kidney function, diabetes and urinary tract infections.',
//       popular: false,
//       image: 'https://images.apollo247.in/pd-cms/cms/inline-images/Urine-Routine-Test-Details_0.jpg',
//       recommendedFor: ['UTI symptoms', 'Kidney issues', 'Routine checkup'],
//       preparation: 'First morning sample preferred'
//     }
//   ];

//   const categories = [
//     { id: 'all', name: 'All Tests', icon: '🧪', count: 8 },
//     { id: 'blood', name: 'Blood Tests', icon: '💉', count: 4 },
//     { id: 'hormone', name: 'Hormone Tests', icon: '⚖️', count: 1 },
//     { id: 'organ', name: 'Organ Function', icon: '🫀', count: 2 },
//     { id: 'metabolic', name: 'Metabolic', icon: '🔬', count: 1 },
//     { id: 'vitamin', name: 'Vitamin Tests', icon: '💊', count: 1 },
//     { id: 'cardiac', name: 'Cardiac', icon: '❤️', count: 1 },
//     { id: 'routine', name: 'Routine', icon: '📋', count: 1 }
//   ];

//   const labs = [
//     {
//       id: 1,
//       name: 'Metropolis Laboratory',
//       rating: 4.5,
//       distance: '1.2 km',
//       sampleCollection: 'Home Service Available',
//       timing: '6:00 AM - 10:00 PM',
//       image: 'https://www.metropolisindia.com/newdata/images/labs/mumbai/mumbai_lab_1.jpg',
//       address: '123 Health Street, Medical Complex',
//       homeCollectionFee: 99,
//       labVisitDiscount: 10,
//       phlebotomists: 5,
//       averageWaitTime: '10-15 mins',
//       accreditation: 'NABL, CAP'
//     },
//     {
//       id: 2,
//       name: 'Thyrocare',
//       rating: 4.3,
//       distance: '2.1 km',
//       sampleCollection: 'Home & Lab Service',
//       timing: '7:00 AM - 9:00 PM',
//       image: 'https://inc42.com/cdn-cgi/image/quality=75/https://asset.inc42.com/2021/07/thyrocare-pharmeasy-cci-featured.jpg',
//       address: '456 Diagnostic Road, Health Hub',
//       homeCollectionFee: 149,
//       labVisitDiscount: 15,
//       phlebotomists: 8,
//       averageWaitTime: '15-20 mins',
//       accreditation: 'NABL, ISO'
//     },
//     {
//       id: 3,
//       name: 'Lal Path Labs',
//       rating: 4.6,
//       distance: '1.8 km',
//       sampleCollection: 'Home Service Available',
//       timing: '6:30 AM - 8:00 PM',
//       image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQox6Z8_GalcucXC5ZbcUlmFNkiolSc-J0r5A&s',
//       address: '789 Wellness Avenue',
//       homeCollectionFee: 129,
//       labVisitDiscount: 20,
//       phlebotomists: 6,
//       averageWaitTime: '5-10 mins',
//       accreditation: 'NABL, NABH'
//     }
//   ];

//   const timeSlots = [
//     { id: 1, time: '08:00 AM - 09:00 AM', available: true },
//     { id: 2, time: '09:00 AM - 10:00 AM', available: true },
//     { id: 3, time: '10:00 AM - 11:00 AM', available: false },
//     { id: 4, time: '11:00 AM - 12:00 PM', available: true },
//     { id: 5, time: '12:00 PM - 01:00 PM', available: true },
//     { id: 6, time: '02:00 PM - 03:00 PM', available: true },
//     { id: 7, time: '04:00 PM - 05:00 PM', available: true },
//     { id: 8, time: '06:00 PM - 07:00 PM', available: true }
//   ];

//   // Generate dummy PDF report
//   const generateReportPDF = (booking) => {
//     if (!booking.reportData) return null;
    
//     const { patientName, age, gender, referenceNo, collectedDate, reportedDate, tests, labDetails, interpretation, recommendations } = booking.reportData;
    
//     const reportContent = `
//       <!DOCTYPE html>
//       <html>
//       <head>
//         <style>
//           body { font-family: Arial, sans-serif; margin: 40px; }
//           .header { text-align: center; border-bottom: 2px solid #009688; padding-bottom: 20px; margin-bottom: 30px; }
//           .header h1 { color: #009688; margin: 0; }
//           .header h2 { color: #4F6F6B; margin: 10px 0; }
//           .patient-info { background: #f5f5f5; padding: 20px; border-radius: 10px; margin-bottom: 30px; }
//           .info-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; }
//           .info-item { margin: 5px 0; }
//           .test-section { margin: 30px 0; }
//           .test-header { background: #009688; color: white; padding: 10px; border-radius: 5px 5px 0 0; }
//           .test-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
//           .test-table th, .test-table td { border: 1px solid #ddd; padding: 12px; text-align: left; }
//           .test-table th { background: #f5f5f5; }
//           .normal { color: #4CAF50; }
//           .abnormal { color: #F44336; }
//           .lab-info { background: #E0F2F1; padding: 20px; border-radius: 10px; margin: 30px 0; }
//           .footer { text-align: center; margin-top: 50px; color: #666; font-size: 12px; }
//           .signature { margin-top: 50px; text-align: right; }
//           .stamp { position: absolute; right: 50px; opacity: 0.8; }
//         </style>
//       </head>
//       <body>
//         <div class="header">
//           <h1>${labDetails.name}</h1>
//           <h2>Laboratory Test Report</h2>
//           <p>${labDetails.accreditation}</p>
//         </div>
        
//         <div class="patient-info">
//           <div class="info-grid">
//             <div class="info-item"><strong>Patient Name:</strong> ${patientName}</div>
//             <div class="info-item"><strong>Age/Gender:</strong> ${age} years / ${gender}</div>
//             <div class="info-item"><strong>Reference No:</strong> ${referenceNo}</div>
//             <div class="info-item"><strong>Report Date:</strong> ${reportedDate}</div>
//             <div class="info-item"><strong>Collected Date:</strong> ${collectedDate}</div>
//             <div class="info-item"><strong>Sample Type:</strong> Blood</div>
//           </div>
//         </div>
        
//         ${tests.map(test => `
//           <div class="test-section">
//             <div class="test-header">
//               <h3 style="margin: 0;">${test.name}</h3>
//             </div>
//             <table class="test-table">
//               <thead>
//                 <tr>
//                   <th>Test Parameter</th>
//                   <th>Result</th>
//                   <th>Unit</th>
//                   <th>Reference Range</th>
//                   <th>Status</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 ${test.results.map(result => `
//                   <tr>
//                     <td>${result.parameter}</td>
//                     <td>${result.value}</td>
//                     <td>${result.unit}</td>
//                     <td>${result.normalRange}</td>
//                     <td class="${result.status}">${result.status === 'normal' ? 'Normal ✓' : 'Abnormal ✗'}</td>
//                   </tr>
//                 `).join('')}
//               </tbody>
//             </table>
//           </div>
//         `).join('')}
        
//         <div class="lab-info">
//           <h3>Laboratory Details</h3>
//           <p><strong>Lab:</strong> ${labDetails.name}</p>
//           <p><strong>Address:</strong> ${labDetails.address}</p>
//           <p><strong>Phone:</strong> ${labDetails.phone}</p>
//           <p><strong>Email:</strong> ${labDetails.email}</p>
//           <p><strong>Lab Director:</strong> ${labDetails.labDirector}</p>
//         </div>
        
//         <div>
//           <h3>Interpretation</h3>
//           <p>${interpretation}</p>
//         </div>
        
//         <div>
//           <h3>Recommendations</h3>
//           <ul>
//             ${recommendations.map(rec => `<li>${rec}</li>`).join('')}
//           </ul>
//         </div>
        
//         <div class="signature">
//           <p><strong>Authorized Signatory</strong></p>
//           <p>${labDetails.labDirector}</p>
//           <p>Lab Director</p>
//         </div>
        
//         <div class="footer">
//           <p>This is a digitally signed report. No physical signature required.</p>
//           <p>Report generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</p>
//           <p>Confidential - For patient use only</p>
//         </div>
//       </body>
//       </html>
//     `;
    
//     return reportContent;
//   };

//   // Download report with progress simulation
//   const downloadReport = useCallback(async (bookingId) => {
//     const booking = bookingHistory.find(b => b.id === bookingId);
//     if (!booking || booking.results !== 'Available') return;
    
//     setDownloadingReport(bookingId);
    
//     try {
//       // Simulate download progress
//       for (let i = 0; i <= 100; i += 10) {
//         await new Promise(resolve => setTimeout(resolve, 100));
//         // Update progress in UI
//       }
      
//       // Generate PDF content
//       const pdfContent = generateReportPDF(booking);
      
//       // Create Blob and download
//       const blob = new Blob([pdfContent], { type: 'text/html' });
//       const url = window.URL.createObjectURL(blob);
//       const a = document.createElement('a');
//       a.href = url;
//       a.download = `Lab_Report_${booking.id}_${new Date().toISOString().split('T')[0]}.pdf`;
//       document.body.appendChild(a);
//       a.click();
//       document.body.removeChild(a);
//       window.URL.revokeObjectURL(url);
      
//       addNotification('Report Downloaded', `${booking.tests[0]} report downloaded successfully`, 'lab');
//     } catch (error) {
//       console.error('Error downloading report:', error);
//       addNotification('Download Failed', 'Failed to download report. Please try again.', 'error');
//     } finally {
//       setDownloadingReport(null);
//     }
//   }, [bookingHistory, addNotification]);

//   // Filter tests - memoize to prevent recalculation on every render
//   const filteredTests = useMemo(() => {
//     return labTests.filter(test => {
//       const matchesSearch = test.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                            test.description.toLowerCase().includes(searchQuery.toLowerCase());
//       const matchesCategory = selectedCategory === 'all' || test.category === selectedCategory;
//       return matchesSearch && matchesCategory;
//     });
//   }, [searchQuery, selectedCategory]);

//   // Calculate total price
//   const totalPrice = useMemo(() => {
//     const testsTotal = cart.reduce((total, item) => total + item.price, 0);
//     const homeCollectionFee = selectedLab?.homeCollectionFee || 0;
//     return testsTotal + homeCollectionFee;
//   }, [cart, selectedLab]);

//   // Get selected family member data
//   const selectedFamilyMemberData = useMemo(() => {
//     return familyMembers.find(m => m.id === selectedFamilyMember);
//   }, [selectedFamilyMember]);

//   // Event handlers
//   const handleSearchChange = useCallback((e) => {
//     setSearchQuery(e.target.value);
//   }, []);

//   const handleCategoryClick = useCallback((categoryId) => {
//     setSelectedCategory(categoryId);
//   }, []);

//   const handleTabClick = useCallback((tab) => {
//     setActiveTab(tab);
//     if (tab === 'book') setBookingStep(1);
//   }, []);

//   const addToCart = useCallback((test) => {
//     setCart(prev => {
//       const existing = prev.find(item => item.id === test.id);
//       if (existing) return prev;
//       return [...prev, { ...test, quantity: 1 }];
//     });
//     addNotification('Test Added', `${test.name} added to cart`, 'lab');
//   }, [addNotification]);

//   const removeFromCart = useCallback((testId) => {
//     setCart(prev => prev.filter(item => item.id !== testId));
//   }, []);

//   const handleAddToCart = useCallback((test, e) => {
//     e.stopPropagation();
//     if (cart.some(item => item.id === test.id)) {
//       removeFromCart(test.id);
//     } else {
//       addToCart(test);
//     }
//   }, [cart, addToCart, removeFromCart]);

//   const handleFamilyMemberClick = useCallback((memberId) => {
//     setSelectedFamilyMember(memberId);
//   }, []);

//   const handleLabClick = useCallback((lab) => {
//     setSelectedLab(lab);
//   }, []);

//   const handleTimeSlotClick = useCallback((slot) => {
//     if (slot.available) {
//       setSelectedTimeSlot(slot);
//     }
//   }, []);

//   const proceedToFamilySelection = useCallback(() => {
//     if (cart.length === 0) {
//       alert('Please add tests to cart first');
//       return;
//     }
//     setBookingStep(2);
//   }, [cart]);

//   const proceedToLabSelection = useCallback(() => {
//     setBookingStep(3);
//   }, []);

//   const proceedToTimeSlot = useCallback(() => {
//     if (!selectedLab) {
//       alert('Please select a lab first');
//       return;
//     }
//     setBookingStep(4);
//   }, [selectedLab]);

//   const proceedToPayment = useCallback(() => {
//     if (!selectedTimeSlot) {
//       alert('Please select a time slot');
//       return;
//     }
//     setBookingStep(5);
//   }, [selectedTimeSlot]);

//   const simulatePayment = useCallback(() => {
//     const newBooking = {
//       id: `LAB${Date.now()}`,
//       tests: cart.map(item => item.name),
//       lab: selectedLab.name,
//       date: new Date().toISOString().split('T')[0],
//       time: selectedTimeSlot.time,
//       status: 'Phlebotomist Assigned',
//       results: 'Pending',
//       amount: totalPrice,
//       familyMember: selectedFamilyMemberData?.name || 'Self',
//       phlebotomist: 'Dr. Ramesh Kumar',
//       phone: '+91 98765 43210',
//       trackingId: `TRK${Date.now()}`,
//       estimatedArrival: '15 minutes',
//       homeCollectionFee: selectedLab.homeCollectionFee
//     };

//     setCurrentBooking(newBooking);
//     setBookingHistory(prev => [newBooking, ...prev]);
//     setCart([]);
//     setSelectedLab(null);
//     setSelectedTimeSlot(null);
//     setBookingStep(6);
    
//     setTimeout(() => {
//       setCurrentBooking(prev => ({ ...prev, status: 'On the Way' }));
//       setPhlebotomistStatus('on_the_way');
//       addNotification('Phlebotomist En Route', 'Your phlebotomist is on the way', 'lab');
//     }, 3000);

//     setTimeout(() => {
//       setCurrentBooking(prev => ({ ...prev, status: 'Sample Collected' }));
//       setPhlebotomistStatus('sample_collected');
//       addNotification('Sample Collected', 'Blood sample has been collected', 'lab');
//     }, 60000);

//     addNotification('Payment Successful', 'Your lab tests have been booked', 'lab');
//   }, [cart, selectedLab, selectedTimeSlot, totalPrice, selectedFamilyMemberData, addNotification]);

//   const startLiveTracking = useCallback(() => {
//     setLiveTracking(true);
//     addNotification('Live Tracking Started', 'You can now track phlebotomist location', 'lab');
//   }, [addNotification]);

//   const viewReportDetails = useCallback((booking) => {
//     setCurrentBooking(booking);
//     setActiveTab('book');
//     setBookingStep(6);
//   }, [setActiveTab]);

//   // View report details in modal
//   const viewFullReport = useCallback((booking) => {
//     if (!booking.reportData) {
//       alert('Report data not available yet');
//       return;
//     }
    
//     const reportWindow = window.open('', '_blank', 'width=1200,height=800');
//     const reportContent = generateReportPDF(booking);
//     reportWindow.document.write(reportContent);
//     reportWindow.document.close();
//   }, []);

//   // Styles
//   const styles = {
//     container: {
//       padding: '20px',
//       maxWidth: '1200px',
//       margin: '0 auto',
//       marginTop: '120px',
//       minHeight: 'calc(100vh - 120px)',
//       width: '100%',
//       boxSizing: 'border-box',
//       backgroundColor: '#E0F2F1'
//     },
//     headerRow: {
//       display: 'flex',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//       marginBottom: '2rem',
//       flexWrap: 'wrap',
//       gap: '1rem'
//     },
//     titleSection: {
//       textAlign: 'center',
//       flex: 1,
//       minWidth: '300px'
//     },
//     title: {
//       color: '#124441',
//       fontSize: '2rem',
//       margin: '0 0 0.5rem 0',
//       fontWeight: '700'
//     },
//     subtitle: {
//       color: '#4F6F6B',
//       margin: 0,
//       fontSize: '1rem'
//     },
//     tabs: {
//       display: 'flex',
//       gap: '10px',
//       marginBottom: '20px',
//       flexWrap: 'wrap',
//       overflowX: 'auto',
//       paddingBottom: '5px'
//     },
//     tab: {
//       padding: '12px 24px',
//       borderRadius: '25px',
//       border: '1px solid #4DB6AC',
//       backgroundColor: '#FFFFFF',
//       color: '#4F6F6B',
//       cursor: 'pointer',
//       fontSize: '0.9rem',
//       fontWeight: '500',
//       transition: 'all 0.3s ease',
//       whiteSpace: 'nowrap',
//       '@media (max-width: 768px)': {
//         padding: '10px 15px',
//         fontSize: '0.85rem'
//       }
//     },
//     activeTab: {
//       backgroundColor: '#009688',
//       color: '#FFFFFF',
//       borderColor: '#009688'
//     },
//     contentCard: {
//       backgroundColor: '#FFFFFF',
//       borderRadius: '15px',
//       padding: '25px',
//       boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
//       marginBottom: '25px',
//       border: '1px solid #4DB6AC',
//       transition: 'all 0.3s ease',
//       '@media (max-width: 768px)': {
//         padding: '15px'
//       }
//     },
//     searchBox: {
//       width: '100%',
//       padding: '15px 25px',
//       borderRadius: '12px',
//       border: '1px solid #4DB6AC',
//       fontSize: '1rem',
//       marginBottom: '20px',
//       backgroundColor: '#FFFFFF',
//       color: '#124441',
//       boxSizing: 'border-box',
//       '@media (max-width: 768px)': {
//         padding: '12px 15px',
//         fontSize: '0.9rem'
//       }
//     },
//     categories: {
//       display: 'flex',
//       gap: '10px',
//       overflowX: 'auto',
//       paddingBottom: '15px',
//       marginBottom: '20px',
//       '&::-webkit-scrollbar': {
//         height: '4px'
//       },
//       '&::-webkit-scrollbar-track': {
//         background: '#f1f1f1'
//       },
//       '&::-webkit-scrollbar-thumb': {
//         background: '#4DB6AC'
//       }
//     },
//     category: {
//       padding: '12px 20px',
//       borderRadius: '25px',
//       border: '1px solid #4DB6AC',
//       backgroundColor: '#FFFFFF',
//       cursor: 'pointer',
//       whiteSpace: 'nowrap',
//       fontSize: '0.9rem',
//       transition: 'all 0.3s ease',
//       color: '#4F6F6B',
//       display: 'flex',
//       alignItems: 'center',
//       gap: '8px',
//       '@media (max-width: 768px)': {
//         padding: '8px 15px',
//         fontSize: '0.8rem'
//       }
//     },
//     activeCategory: {
//       backgroundColor: '#009688',
//       color: '#FFFFFF',
//       borderColor: '#009688'
//     },
//     testsGrid: {
//       display: 'grid',
//       gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
//       gap: '25px',
//       '@media (max-width: 768px)': {
//         gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
//         gap: '15px'
//       },
//       '@media (max-width: 480px)': {
//         gridTemplateColumns: '1fr'
//       }
//     },
//     testCard: {
//       backgroundColor: '#FFFFFF',
//       borderRadius: '15px',
//       padding: '20px',
//       boxShadow: '0 3px 15px rgba(0,0,0,0.05)',
//       border: '1px solid #4DB6AC',
//       transition: 'all 0.3s ease',
//       position: 'relative',
//       cursor: 'pointer',
//       '@media (max-width: 768px)': {
//         padding: '15px'
//       }
//     },
//     testImage: {
//       width: '100%',
//       height: '150px',
//       borderRadius: '10px',
//       objectFit: 'cover',
//       marginBottom: '15px',
//       '@media (max-width: 768px)': {
//         height: '120px'
//       }
//     },
//     testName: {
//       fontSize: '1.1rem',
//       fontWeight: 'bold',
//       color: '#124441',
//       marginBottom: '10px',
//       '@media (max-width: 768px)': {
//         fontSize: '1rem'
//       }
//     },
//     testDescription: {
//       fontSize: '0.9rem',
//       color: '#4F6F6B',
//       marginBottom: '15px',
//       lineHeight: '1.5',
//       '@media (max-width: 768px)': {
//         fontSize: '0.85rem'
//       }
//     },
//     testDetails: {
//       display: 'flex',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//       marginBottom: '15px',
//       flexWrap: 'wrap',
//       gap: '10px'
//     },
//     testPrice: {
//       fontSize: '1.3rem',
//       fontWeight: 'bold',
//       color: '#009688',
//       '@media (max-width: 768px)': {
//         fontSize: '1.1rem'
//       }
//     },
//     testInfo: {
//       fontSize: '0.85rem',
//       color: '#4F6F6B',
//       display: 'flex',
//       alignItems: 'center',
//       gap: '5px'
//     },
//     button: {
//       backgroundColor: '#009688',
//       color: '#FFFFFF',
//       border: 'none',
//       padding: '12px 24px',
//       borderRadius: '8px',
//       cursor: 'pointer',
//       fontSize: '0.95rem',
//       fontWeight: '500',
//       transition: 'all 0.3s ease',
//       width: '100%',
//       boxSizing: 'border-box',
//       '@media (max-width: 768px)': {
//         padding: '10px 20px',
//         fontSize: '0.9rem'
//       }
//     },
//     secondaryButton: {
//       backgroundColor: '#FFFFFF',
//       color: '#009688',
//       border: '1px solid #009688',
//       padding: '12px 24px',
//       borderRadius: '8px',
//       cursor: 'pointer',
//       fontSize: '0.95rem',
//       fontWeight: '500',
//       transition: 'all 0.3s ease',
//       width: '100%',
//       boxSizing: 'border-box',
//       '@media (max-width: 768px)': {
//         padding: '10px 20px',
//         fontSize: '0.9rem'
//       }
//     },
//     cartBadge: {
//       position: 'absolute',
//       top: '-8px',
//       right: '-8px',
//       backgroundColor: '#FF6B6B',
//       color: '#FFFFFF',
//       borderRadius: '50%',
//       width: '24px',
//       height: '24px',
//       fontSize: '0.8rem',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       fontWeight: 'bold',
//       zIndex: 1
//     },
//     bookingCard: {
//       backgroundColor: '#FFFFFF',
//       borderRadius: '12px',
//       padding: '20px',
//       marginBottom: '15px',
//       boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
//       border: '1px solid #4DB6AC',
//       transition: 'all 0.3s ease',
//       '@media (max-width: 768px)': {
//         padding: '15px'
//       }
//     },
//     sectionTitle: {
//       fontSize: '1.3rem',
//       fontWeight: 'bold',
//       color: '#124441',
//       marginBottom: '20px',
//       display: 'flex',
//       alignItems: 'center',
//       gap: '10px',
//       '@media (max-width: 768px)': {
//         fontSize: '1.1rem'
//       }
//     },
//     headerActions: {
//       display: 'flex',
//       gap: '15px',
//       alignItems: 'center',
//       flexWrap: 'wrap',
//       justifyContent: 'flex-end'
//     },
//     cartButtonContainer: {
//       position: 'relative'
//     },
//     stepIndicator: {
//       display: 'flex',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//       marginBottom: '30px',
//       padding: '20px',
//       backgroundColor: '#FFFFFF',
//       borderRadius: '12px',
//       border: '1px solid #4DB6AC',
//       '@media (max-width: 768px)': {
//         flexDirection: 'column',
//         gap: '15px',
//         padding: '15px'
//       }
//     },
//     step: {
//       display: 'flex',
//       flexDirection: 'column',
//       alignItems: 'center',
//       flex: 1,
//       position: 'relative',
//       '@media (max-width: 768px)': {
//         width: '100%',
//         flexDirection: 'row',
//         gap: '10px'
//       }
//     },
//     stepNumber: {
//       width: '35px',
//       height: '35px',
//       borderRadius: '50%',
//       backgroundColor: '#E0F2F1',
//       color: '#4F6F6B',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       fontWeight: 'bold',
//       marginBottom: '10px',
//       border: '2px solid #4DB6AC',
//       '@media (max-width: 768px)': {
//         marginBottom: '0',
//         minWidth: '35px'
//       }
//     },
//     activeStep: {
//       backgroundColor: '#009688',
//       color: '#FFFFFF',
//       borderColor: '#009688'
//     },
//     stepName: {
//       fontSize: '0.85rem',
//       color: '#4F6F6B',
//       textAlign: 'center',
//       whiteSpace: 'nowrap',
//       '@media (max-width: 768px)': {
//         textAlign: 'left',
//         flex: 1
//       }
//     },
//     activeStepName: {
//       color: '#009688',
//       fontWeight: 'bold'
//     },
//     stepLine: {
//       position: 'absolute',
//       top: '17px',
//       left: '50%',
//       width: '100%',
//       height: '2px',
//       backgroundColor: '#4DB6AC',
//       zIndex: -1,
//       '@media (max-width: 768px)': {
//         display: 'none'
//       }
//     },
//     familyMemberCard: {
//       padding: '20px',
//       border: '2px solid #E0F2F1',
//       borderRadius: '12px',
//       cursor: 'pointer',
//       transition: 'all 0.3s ease',
//       backgroundColor: '#FFFFFF',
//       '@media (max-width: 768px)': {
//         padding: '15px'
//       }
//     },
//     selectedFamilyMember: {
//       borderColor: '#009688',
//       backgroundColor: '#E0F2F1'
//     },
//     labCard: {
//       padding: '20px',
//       border: '2px solid #E0F2F1',
//       borderRadius: '12px',
//       marginBottom: '15px',
//       cursor: 'pointer',
//       transition: 'all 0.3s ease',
//       backgroundColor: '#FFFFFF',
//       '@media (max-width: 768px)': {
//         padding: '15px'
//       }
//     },
//     selectedLab: {
//       borderColor: '#009688',
//       backgroundColor: '#E0F2F1'
//     },
//     timeSlot: {
//       padding: '12px',
//       border: '1px solid #4DB6AC',
//       borderRadius: '8px',
//       margin: '5px',
//       cursor: 'pointer',
//       transition: 'all 0.3s ease',
//       backgroundColor: '#FFFFFF',
//       color: '#124441',
//       minWidth: '150px',
//       textAlign: 'center',
//       '@media (max-width: 768px)': {
//         minWidth: '130px',
//         padding: '10px',
//         fontSize: '0.9rem'
//       }
//     },
//     selectedTimeSlot: {
//       backgroundColor: '#009688',
//       color: '#FFFFFF',
//       borderColor: '#009688'
//     },
//     unavailableTimeSlot: {
//       backgroundColor: '#F5F5F5',
//       color: '#999',
//       borderColor: '#DDD',
//       cursor: 'not-allowed'
//     },
//     trackingMap: {
//       width: '100%',
//       height: '300px',
//       backgroundColor: '#E0F2F1',
//       borderRadius: '12px',
//       marginBottom: '20px',
//       border: '1px solid #4DB6AC',
//       position: 'relative',
//       overflow: 'hidden',
//       '@media (max-width: 768px)': {
//         height: '200px'
//       }
//     },
//     progressBar: {
//       width: '100%',
//       height: '10px',
//       backgroundColor: '#E0F2F1',
//       borderRadius: '5px',
//       margin: '20px 0',
//       overflow: 'hidden'
//     },
//     progressFill: {
//       height: '100%',
//       backgroundColor: '#009688',
//       borderRadius: '5px',
//       transition: 'width 0.3s ease'
//     },
//     statusTimeline: {
//       padding: '20px',
//       borderLeft: '2px solid #4DB6AC',
//       marginLeft: '10px',
//       '@media (max-width: 768px)': {
//         padding: '15px',
//         marginLeft: '5px'
//       }
//     },
//     statusItem: {
//       position: 'relative',
//       paddingLeft: '25px',
//       marginBottom: '25px',
//       '@media (max-width: 768px)': {
//         paddingLeft: '20px',
//         marginBottom: '20px'
//       }
//     },
//     statusDot: {
//       position: 'absolute',
//       left: '-11px',
//       top: '0',
//       width: '20px',
//       height: '20px',
//       borderRadius: '50%',
//       backgroundColor: '#FFFFFF',
//       border: '2px solid #4DB6AC',
//       '@media (max-width: 768px)': {
//         width: '16px',
//         height: '16px',
//         left: '-9px'
//       }
//     },
//     activeStatusDot: {
//       backgroundColor: '#009688',
//       borderColor: '#009688'
//     },
//     completedStatusDot: {
//       backgroundColor: '#4CAF50',
//       borderColor: '#4CAF50'
//     }
//   };

//   // Render search input separately with a stable key
//   const renderSearchInput = () => (
//     <input
//       key="search-input"
//       type="text"
//       placeholder="🔍 Search for lab tests (e.g., CBC, Thyroid, Vitamin D)..."
//       style={styles.searchBox}
//       value={searchQuery}
//       onChange={handleSearchChange}
//       ref={searchInputRef}
//     />
//   );

//   // Render categories
//   const renderCategories = () => (
//     <div style={styles.categories}>
//       {categories.map(category => (
//         <button
//           key={category.id}
//           style={{
//             ...styles.category,
//             ...(selectedCategory === category.id ? styles.activeCategory : {})
//           }}
//           onClick={() => handleCategoryClick(category.id)}
//         >
//           {category.icon} {category.name} ({category.count})
//         </button>
//       ))}
//     </div>
//   );

//   // Render test card
//   const renderTestCard = (test) => (
//     <div 
//       key={test.id}
//       style={styles.testCard}
//       onClick={() => addNotification('Test Details', `${test.name} - ${test.description}`, 'lab')}
//       onMouseEnter={(e) => {
//         e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 150, 136, 0.15)';
//         e.currentTarget.style.transform = 'translateY(-5px)';
//       }}
//       onMouseLeave={(e) => {
//         e.currentTarget.style.boxShadow = '0 3px 15px rgba(0,0,0,0.05)';
//         e.currentTarget.style.transform = 'translateY(0)';
//       }}
//     >
//       <img src={test.image} alt={test.name} style={styles.testImage} />
//       {test.popular && (
//         <div style={{
//           position: 'absolute',
//           top: '25px',
//           right: '25px',
//           backgroundColor: '#FF6B6B',
//           color: '#FFFFFF',
//           padding: '3px 12px',
//           borderRadius: '12px',
//           fontSize: '0.75rem',
//           fontWeight: 'bold',
//           zIndex: 1
//         }}>
//           Popular
//         </div>
//       )}
//       <div style={styles.testName}>{test.name}</div>
//       <div style={styles.testDescription}>{test.description}</div>
//       <div style={styles.testDetails}>
//         <div>
//           <div style={styles.testPrice}>₹{test.price}</div>
//           <div style={styles.testInfo}>⏱️ Report: {test.reportTime}</div>
//         </div>
//         <div>
//           <div style={styles.testInfo}>🍽️ {test.fasting}</div>
//           <div style={{...styles.testInfo, fontSize: '0.8rem', color: '#009688'}}>
//             {test.recommendedFor[0]}
//           </div>
//         </div>
//       </div>
//       <button 
//         style={{
//           ...styles.button,
//           backgroundColor: cart.some(item => item.id === test.id) ? '#4DB6AC' : '#009688',
//           marginTop: '10px'
//         }}
//         onClick={(e) => handleAddToCart(test, e)}
//         onMouseEnter={(e) => {
//           e.target.style.backgroundColor = cart.some(item => item.id === test.id) ? '#4F6F6B' : '#4DB6AC';
//         }}
//         onMouseLeave={(e) => {
//           e.target.style.backgroundColor = cart.some(item => item.id === test.id) ? '#4DB6AC' : '#009688';
//         }}
//       >
//         {cart.some(item => item.id === test.id) ? '✓ Added to Cart' : 'Add to Cart'}
//       </button>
//     </div>
//   );

//   // Step 1: Test Selection
//   const renderStep1 = () => (
//     <>
//       <div style={styles.contentCard}>
//         {renderSearchInput()}
//         {renderCategories()}
//       </div>

//       <div style={styles.testsGrid}>
//         {filteredTests.map(test => renderTestCard(test))}
//       </div>

//       {cart.length > 0 && (
//         <div style={{
//           position: 'fixed',
//           bottom: '20px',
//           right: '20px',
//           zIndex: 1000,
//           '@media (max-width: 768px)': {
//             bottom: '10px',
//             right: '10px',
//             left: '10px'
//           }
//         }}>
//           <button
//             style={{
//               ...styles.button,
//               padding: '15px 30px',
//               fontSize: '1rem',
//               borderRadius: '25px',
//               boxShadow: '0 4px 15px rgba(0, 150, 136, 0.3)',
//               '@media (max-width: 768px)': {
//                 padding: '12px 20px',
//                 fontSize: '0.9rem',
//                 width: 'auto'
//               }
//             }}
//             onClick={proceedToFamilySelection}
//           >
//             Proceed to Booking ({cart.length} tests) →
//           </button>
//         </div>
//       )}
//     </>
//   );

//   // Step 2: Family Member Selection
//   const renderStep2 = () => (
//     <div style={styles.contentCard}>
//       <h3 style={styles.sectionTitle}>👨‍👩‍👧‍👦 Select Family Member</h3>
//       <p style={{ color: '#4F6F6B', marginBottom: '20px' }}>
//         Select who these tests are for. You can book tests for yourself or family members.
//       </p>
//       <div style={styles.testsGrid}>
//         {familyMembers.map(member => (
//           <div
//             key={member.id}
//             style={{
//               ...styles.familyMemberCard,
//               ...(selectedFamilyMember === member.id ? styles.selectedFamilyMember : {})
//             }}
//             onClick={() => handleFamilyMemberClick(member.id)}
//           >
//             <div style={{ fontSize: '2rem', marginBottom: '10px' }}>
//               {member.id === 'self' ? '👤' : 
//                member.id === 'father' ? '👨' :
//                member.id === 'mother' ? '👩' :
//                member.id === 'spouse' ? '💑' : '👶'}
//             </div>
//             <div style={{ fontWeight: 'bold', color: '#124441' }}>{member.name}</div>
//             <div style={{ color: '#4F6F6B', fontSize: '0.9rem' }}>
//               {member.relation} • {member.age} years
//             </div>
//           </div>
//         ))}
//       </div>
//       <div style={{ display: 'flex', gap: '15px', marginTop: '30px' }}>
//         <button 
//           style={styles.secondaryButton}
//           onClick={() => setBookingStep(1)}
//         >
//           ← Back
//         </button>
//         <button 
//           style={styles.button}
//           onClick={proceedToLabSelection}
//         >
//           Next: Select Lab →
//         </button>
//       </div>
//     </div>
//   );

//   // Step 3: Lab Selection
//   const renderStep3 = () => (
//     <div style={styles.contentCard}>
//       <h3 style={styles.sectionTitle}>🏥 Select Laboratory</h3>
//       <p style={{ color: '#4F6F6B', marginBottom: '20px' }}>
//         Choose a lab for sample collection. Home service available for all labs.
//       </p>
//       {labs.map(lab => (
//         <div
//           key={lab.id}
//           style={{
//             ...styles.labCard,
//             ...(selectedLab?.id === lab.id ? styles.selectedLab : {})
//           }}
//           onClick={() => handleLabClick(lab)}
//         >
//           <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', '@media (max-width: 768px)': { flexDirection: 'column', gap: '10px' } }}>
//             <img src={lab.image} alt={lab.name} style={{ width: '100px', height: '80px', borderRadius: '8px', '@media (max-width: 768px)': { width: '100%', height: '150px', objectFit: 'cover' } }} />
//             <div style={{ flex: 1 }}>
//               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', '@media (max-width: 768px)': { flexDirection: 'column', gap: '10px' } }}>
//                 <div>
//                   <div style={{ fontWeight: 'bold', color: '#124441', fontSize: '1.1rem' }}>
//                     {lab.name}
//                   </div>
//                   <div style={{ color: '#4F6F6B', fontSize: '0.9rem', marginTop: '5px' }}>
//                     📍 {lab.address}
//                   </div>
//                 </div>
//                 <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
//                   <span style={{ color: '#FFA500' }}>★</span>
//                   <span style={{ fontWeight: 'bold', color: '#124441' }}>{lab.rating}</span>
//                   <span style={{ color: '#4F6F6B' }}>({lab.distance})</span>
//                 </div>
//               </div>
//               <div style={{ display: 'flex', gap: '20px', marginTop: '15px', flexWrap: 'wrap', '@media (max-width: 768px)': { gap: '10px' } }}>
//                 <div style={styles.testInfo}>
//                   🏠 Home Collection: ₹{lab.homeCollectionFee}
//                 </div>
//                 <div style={styles.testInfo}>
//                   ⏰ {lab.timing}
//                 </div>
//                 <div style={styles.testInfo}>
//                   👨‍⚕️ {lab.phlebotomists} phlebotomists
//                 </div>
//               </div>
//               <div style={{ marginTop: '10px', color: '#009688', fontSize: '0.85rem' }}>
//                 🏆 {lab.accreditation}
//               </div>
//             </div>
//           </div>
//         </div>
//       ))}
//       <div style={{ display: 'flex', gap: '15px', marginTop: '30px' }}>
//         <button 
//           style={styles.secondaryButton}
//           onClick={() => setBookingStep(2)}
//         >
//           ← Back
//         </button>
//         <button 
//           style={styles.button}
//           onClick={proceedToTimeSlot}
//           disabled={!selectedLab}
//         >
//           Next: Select Time Slot →
//         </button>
//       </div>
//     </div>
//   );

//   // Step 4: Time Slot Selection
//   const renderStep4 = () => (
//     <div style={styles.contentCard}>
//       <h3 style={styles.sectionTitle}>⏰ Select Time Slot</h3>
//       <p style={{ color: '#4F6F6B', marginBottom: '20px' }}>
//         Choose your preferred time for sample collection. Slots update in real-time.
//       </p>
//       <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '30px' }}>
//         {timeSlots.map(slot => (
//           <button
//             key={slot.id}
//             style={{
//               ...styles.timeSlot,
//               ...(selectedTimeSlot?.id === slot.id ? styles.selectedTimeSlot : {}),
//               ...(!slot.available ? styles.unavailableTimeSlot : {})
//             }}
//             onClick={() => handleTimeSlotClick(slot)}
//             disabled={!slot.available}
//           >
//             {slot.time}
//             {!slot.available && ' (Booked)'}
//           </button>
//         ))}
//       </div>
//       <div style={{ 
//         backgroundColor: '#E0F2F1', 
//         padding: '20px', 
//         borderRadius: '10px',
//         border: '1px solid #4DB6AC',
//         marginBottom: '20px'
//       }}>
//         <div style={{ fontWeight: 'bold', color: '#124441', marginBottom: '10px' }}>
//           Booking Summary
//         </div>
//         <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
//           <span style={{ color: '#4F6F6B' }}>Tests ({cart.length})</span>
//           <span style={{ fontWeight: 'bold' }}>₹{cart.reduce((sum, item) => sum + item.price, 0)}</span>
//         </div>
//         <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
//           <span style={{ color: '#4F6F6B' }}>Home Collection Fee</span>
//           <span style={{ fontWeight: 'bold' }}>₹{selectedLab?.homeCollectionFee || 0}</span>
//         </div>
//         <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', paddingTop: '10px', borderTop: '1px solid #4DB6AC' }}>
//           <span style={{ color: '#124441', fontWeight: 'bold' }}>Total Amount</span>
//           <span style={{ color: '#009688', fontWeight: 'bold', fontSize: '1.2rem' }}>
//             ₹{totalPrice}
//           </span>
//         </div>
//       </div>
//       <div style={{ display: 'flex', gap: '15px' }}>
//         <button 
//           style={styles.secondaryButton}
//           onClick={() => setBookingStep(3)}
//         >
//           ← Back
//         </button>
//         <button 
//           style={styles.button}
//           onClick={proceedToPayment}
//           disabled={!selectedTimeSlot}
//         >
//           Proceed to Payment →
//         </button>
//       </div>
//     </div>
//   );

//   // Step 5: Payment
//   const renderStep5 = () => (
//     <div style={styles.contentCard}>
//       <h3 style={styles.sectionTitle}>💳 Payment</h3>
//       <div style={{ 
//         backgroundColor: '#E0F2F1', 
//         padding: '30px', 
//         borderRadius: '10px',
//         border: '1px solid #4DB6AC',
//         textAlign: 'center',
//         marginBottom: '30px'
//       }}>
//         <div style={{ fontSize: '3rem', marginBottom: '20px' }}>💳</div>
//         <div style={{ fontWeight: 'bold', color: '#124441', fontSize: '1.2rem', marginBottom: '10px' }}>
//           Total Amount: ₹{totalPrice}
//         </div>
//         <div style={{ color: '#4F6F6B', marginBottom: '30px' }}>
//           Secure payment powered by Razorpay
//         </div>
        
//         <div style={{ textAlign: 'left', marginBottom: '30px', backgroundColor: '#FFFFFF', padding: '20px', borderRadius: '8px' }}>
//           <div style={{ fontWeight: 'bold', color: '#124441', marginBottom: '15px' }}>Booking Details:</div>
//           <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
//             <span style={{ color: '#4F6F6B' }}>For:</span>
//             <span style={{ fontWeight: '500' }}>{selectedFamilyMemberData?.name || 'Self'}</span>
//           </div>
//           <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
//             <span style={{ color: '#4F6F6B' }}>Lab:</span>
//             <span style={{ fontWeight: '500' }}>{selectedLab?.name}</span>
//           </div>
//           <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
//             <span style={{ color: '#4F6F6B' }}>Time:</span>
//             <span style={{ fontWeight: '500' }}>{selectedTimeSlot?.time}</span>
//           </div>
//           <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px', paddingTop: '15px', borderTop: '1px solid #E0F2F1' }}>
//             <span style={{ color: '#4F6F6B' }}>Tests:</span>
//             <span style={{ fontWeight: '500' }}>{cart.map(t => t.name).join(', ')}</span>
//           </div>
//         </div>

//         <button 
//           style={{
//             ...styles.button,
//             padding: '15px 40px',
//             fontSize: '1.1rem',
//             maxWidth: '300px',
//             '@media (max-width: 768px)': {
//               padding: '12px 30px',
//               fontSize: '1rem'
//             }
//           }}
//           onClick={simulatePayment}
//         >
//           Pay ₹{totalPrice} Now
//         </button>
//       </div>
//       <button 
//         style={styles.secondaryButton}
//         onClick={() => setBookingStep(4)}
//       >
//         ← Back
//       </button>
//     </div>
//   );

//   // Step 6: Tracking
//   const renderStep6 = () => (
//     <div style={styles.contentCard}>
//       <h3 style={styles.sectionTitle}>🚚 Sample Collection Tracking</h3>
//       <div style={{ 
//         backgroundColor: '#4CAF50', 
//         color: '#FFFFFF', 
//         padding: '15px', 
//         borderRadius: '8px',
//         marginBottom: '20px',
//         textAlign: 'center',
//         fontWeight: 'bold'
//       }}>
//         ✅ Booking Confirmed! Order #{currentBooking.id}
//       </div>

//       <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginBottom: '30px' }}>
//         <div style={{ flex: 1, minWidth: '250px' }}>
//           <div style={styles.sectionTitle}>👨‍⚕️ Phlebotomist Details</div>
//           <div style={{ backgroundColor: '#E0F2F1', padding: '20px', borderRadius: '8px' }}>
//             <div style={{ fontWeight: 'bold', color: '#124441' }}>{currentBooking.phlebotomist}</div>
//             <div style={{ color: '#4F6F6B', marginTop: '5px' }}>📱 {currentBooking.phone}</div>
//             <div style={{ color: '#4F6F6B', marginTop: '5px' }}>🆔 Tracking ID: {currentBooking.trackingId}</div>
//           </div>
//         </div>
//         <div style={{ flex: 1, minWidth: '250px' }}>
//           <div style={styles.sectionTitle}>📋 Test Details</div>
//           <div style={{ backgroundColor: '#E0F2F1', padding: '20px', borderRadius: '8px' }}>
//             <div style={{ color: '#124441', fontWeight: '500' }}>For: {currentBooking.familyMember}</div>
//             <div style={{ color: '#4F6F6B', marginTop: '10px' }}>
//               {currentBooking.tests.map((test, idx) => (
//                 <div key={idx}>• {test}</div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       <div style={styles.sectionTitle}>📍 Live Tracking</div>
//       <div style={styles.trackingMap}>
//         <div style={{
//           position: 'absolute',
//           top: '50%',
//           left: '50%',
//           transform: 'translate(-50%, -50%)',
//           textAlign: 'center',
//           color: '#124441'
//         }}>
//           <div style={{ fontSize: '3rem' }}>🗺️</div>
//           <div style={{ fontWeight: 'bold', marginTop: '10px' }}>Live Tracking Active</div>
//           <div style={{ marginTop: '5px' }}>Phlebotomist is {estimatedArrival} mins away</div>
//         </div>
//       </div>
//       <button 
//         style={{ ...styles.button, marginBottom: '20px' }}
//         onClick={startLiveTracking}
//       >
//         {liveTracking ? 'Live Tracking Active' : 'Start Live Tracking'}
//       </button>

//       <div style={styles.sectionTitle}>📊 Collection Status</div>
//       <div style={styles.statusTimeline}>
//         {['Phlebotomist Assigned', 'On the Way', 'Sample Collected', 'Sample at Lab', 'Testing', 'Report Ready'].map((status, idx) => {
//           const isActive = idx === ['Phlebotomist Assigned', 'On the Way', 'Sample Collected', 'Sample at Lab', 'Testing', 'Report Ready']
//             .indexOf(currentBooking.status);
//           const isCompleted = idx < isActive;
          
//           return (
//             <div key={status} style={styles.statusItem}>
//               <div style={{
//                 ...styles.statusDot,
//                 ...(isCompleted ? styles.completedStatusDot : {}),
//                 ...(idx === isActive ? styles.activeStatusDot : {})
//               }}></div>
//               <div style={{ fontWeight: idx <= isActive ? 'bold' : 'normal', color: '#124441' }}>
//                 {status}
//               </div>
//               <div style={{ color: '#4F6F6B', fontSize: '0.9rem', marginTop: '5px' }}>
//                 {idx === 0 && currentBooking.date} {idx === 1 && `ETA: ${estimatedArrival} mins`}
//                 {idx === 2 && currentBooking.time} {idx === 5 && 'Digital report available for download'}
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {currentBooking.status === 'Sample Collected' && (
//         <div style={{ marginTop: '30px' }}>
//           <div style={styles.sectionTitle}>🔬 Report Progress</div>
//           <div style={styles.progressBar}>
//             <div style={{ ...styles.progressFill, width: `${reportProgress}%` }}></div>
//           </div>
//           <div style={{ display: 'flex', justifyContent: 'space-between', color: '#4F6F6B' }}>
//             <span>Sample Received</span>
//             <span>{reportProgress}%</span>
//             <span>Report Ready</span>
//           </div>
//         </div>
//       )}
//     </div>
//   );

//   // Book Tests Tab
//   const renderBookTestsTab = () => {
//     switch (bookingStep) {
//       case 1:
//         return renderStep1();
//       case 2:
//         return renderStep2();
//       case 3:
//         return renderStep3();
//       case 4:
//         return renderStep4();
//       case 5:
//         return renderStep5();
//       case 6:
//         return currentBooking ? renderStep6() : null;
//       default:
//         return renderStep1();
//     }
//   };

//   // Cart Tab
//   const renderCartTab = () => (
//     <div style={styles.contentCard}>
//       <h3 style={styles.sectionTitle}>🛒 Test Cart ({cart.length} tests)</h3>
//       {cart.length === 0 ? (
//         <div style={{ textAlign: 'center', padding: '40px', color: '#4F6F6B' }}>
//           <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🧪</div>
//           <div style={{ color: '#124441', fontWeight: '500' }}>Your cart is empty</div>
//           <div style={{ fontSize: '0.9rem', marginTop: '10px' }}>Add tests from the Book section</div>
//           <button 
//             style={{ ...styles.button, marginTop: '20px', maxWidth: '200px' }}
//             onClick={() => handleTabClick('book')}
//           >
//             Browse Tests
//           </button>
//         </div>
//       ) : (
//         <div>
//           {cart.map(test => (
//             <div key={test.id} style={styles.bookingCard}>
//               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
//                 <div style={{ flex: 1 }}>
//                   <div style={{ fontWeight: 'bold', color: '#124441', fontSize: '1.1rem' }}>{test.name}</div>
//                   <div style={{ fontSize: '0.9rem', color: '#4F6F6B', marginTop: '5px' }}>
//                     ⏱️ Report: {test.reportTime} • 🍽️ {test.fasting}
//                   </div>
//                   <div style={{ fontSize: '0.85rem', color: '#009688', marginTop: '5px' }}>
//                     {test.recommendedFor[0]}
//                   </div>
//                 </div>
//                 <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
//                   <div style={{ fontWeight: 'bold', color: '#009688', fontSize: '1.2rem' }}>₹{test.price}</div>
//                   <button 
//                     onClick={() => removeFromCart(test.id)}
//                     style={{
//                       backgroundColor: '#FF6B6B',
//                       color: '#FFFFFF',
//                       border: 'none',
//                       padding: '8px 15px',
//                       borderRadius: '6px',
//                       cursor: 'pointer',
//                       transition: 'all 0.3s ease',
//                       fontWeight: '500'
//                     }}
//                     onMouseEnter={(e) => {
//                       e.target.style.backgroundColor = '#FF4757';
//                     }}
//                     onMouseLeave={(e) => {
//                       e.target.style.backgroundColor = '#FF6B6B';
//                     }}
//                   >
//                     Remove
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//           <div style={{ 
//             backgroundColor: '#E0F2F1', 
//             padding: '25px', 
//             borderRadius: '10px', 
//             marginTop: '25px',
//             border: '1px solid #4DB6AC'
//           }}>
//             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
//               <div>
//                 <div style={{ fontWeight: 'bold', color: '#124441' }}>Tests Total ({cart.length})</div>
//                 <div style={{ fontSize: '0.9rem', color: '#4F6F6B' }}>Home collection fee will be added later</div>
//               </div>
//               <div style={{ fontWeight: 'bold', color: '#124441', fontSize: '1.3rem' }}>
//                 ₹{cart.reduce((sum, item) => sum + item.price, 0)}
//               </div>
//             </div>
//             <div style={{ borderTop: '1px solid #4DB6AC', paddingTop: '15px' }}>
//               <div style={{ fontSize: '0.9rem', color: '#4F6F6B', marginBottom: '10px' }}>
//                 You'll select time slot and lab in next step
//               </div>
//               <button 
//                 style={{ 
//                   ...styles.button, 
//                   marginTop: '10px', 
//                   fontSize: '1rem', 
//                   padding: '15px',
//                   backgroundColor: '#009688'
//                 }}
//                 onClick={proceedToFamilySelection}
//                 onMouseEnter={(e) => {
//                   e.target.style.backgroundColor = '#4DB6AC';
//                 }}
//                 onMouseLeave={(e) => {
//                   e.target.style.backgroundColor = '#009688';
//                 }}
//               >
//                 🧪 Proceed to Booking →
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );

//   // History Tab with enhanced report download
//   const renderHistoryTab = () => (
//     <div style={styles.contentCard}>
//       <h3 style={styles.sectionTitle}>📋 Test History & Reports</h3>
//       {bookingHistory.length === 0 ? (
//         <div style={{ textAlign: 'center', padding: '40px', color: '#4F6F6B' }}>
//           <div style={{ fontSize: '3rem', marginBottom: '20px' }}>📄</div>
//           <div style={{ color: '#124441', fontWeight: '500' }}>No test history found</div>
//           <div style={{ fontSize: '0.9rem', marginTop: '10px' }}>Book your first test to see history here</div>
//         </div>
//       ) : (
//         <div>
//           {bookingHistory.map(booking => (
//             <div 
//               key={booking.id} 
//               style={{
//                 ...styles.bookingCard,
//                 cursor: 'pointer'
//               }}
//               onClick={() => viewReportDetails(booking)}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 150, 136, 0.1)';
//                 e.currentTarget.style.transform = 'translateY(-2px)';
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)';
//                 e.currentTarget.style.transform = 'translateY(0)';
//               }}
//             >
//               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px', flexWrap: 'wrap', gap: '15px' }}>
//                 <div style={{ flex: 1 }}>
//                   <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
//                     <div style={{ fontWeight: 'bold', color: '#124441', fontSize: '1.1rem' }}>Booking #{booking.id}</div>
//                     <div style={{
//                       padding: '4px 12px',
//                       borderRadius: '12px',
//                       fontSize: '0.75rem',
//                       fontWeight: 'bold',
//                       backgroundColor: booking.status === 'Completed' ? '#E8F5E9' : 
//                                      booking.status === 'Sample Collected' ? '#E3F2FD' : 
//                                      booking.status === 'Phlebotomist Assigned' ? '#FFF3E0' : '#F5F5F5',
//                       color: booking.status === 'Completed' ? '#2E7D32' : 
//                             booking.status === 'Sample Collected' ? '#1565C0' :
//                             booking.status === 'Phlebotomist Assigned' ? '#F57C00' : '#757575',
//                       border: '1px solid #4DB6AC'
//                     }}>
//                       {booking.status}
//                     </div>
//                   </div>
//                   <div style={{ fontSize: '0.9rem', color: '#4F6F6B', marginTop: '5px' }}>
//                     <strong>For:</strong> {booking.familyMember || 'Self'}
//                   </div>
//                   <div style={{ fontSize: '0.9rem', color: '#4F6F6B', marginTop: '5px' }}>
//                     {booking.tests.slice(0, 2).join(', ')}
//                     {booking.tests.length > 2 && ` +${booking.tests.length - 2} more`}
//                   </div>
//                   <div style={{ fontSize: '0.85rem', color: '#4F6F6B', marginTop: '5px' }}>
//                     {booking.lab} • {booking.date} at {booking.time}
//                     {booking.phlebotomist && ` • 👨‍⚕️ ${booking.phlebotomist}`}
//                   </div>
//                 </div>
//                 <div style={{ textAlign: 'right' }}>
//                   <div style={{ fontWeight: 'bold', color: '#009688', fontSize: '1.2rem' }}>₹{booking.amount}</div>
//                   <div style={{ fontSize: '0.8rem', color: '#4F6F6B', marginTop: '5px' }}>
//                     {booking.results}
//                   </div>
//                 </div>
//               </div>
//               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginTop: '15px' }}>
//                 <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
//                   {booking.results === 'Available' ? (
//                     <>
//                       <button 
//                         style={{
//                           backgroundColor: downloadingReport === booking.id ? '#4F6F6B' : '#009688',
//                           color: '#FFFFFF',
//                           border: 'none',
//                           padding: '8px 20px',
//                           borderRadius: '6px',
//                           cursor: 'pointer',
//                           fontSize: '0.85rem',
//                           fontWeight: '500',
//                           transition: 'all 0.3s ease',
//                           display: 'flex',
//                           alignItems: 'center',
//                           gap: '5px',
//                           minWidth: '140px',
//                           justifyContent: 'center'
//                         }}
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           downloadReport(booking.id);
//                         }}
//                         disabled={downloadingReport === booking.id}
//                       >
//                         {downloadingReport === booking.id ? (
//                           <>
//                             <span style={{ animation: 'spin 1s linear infinite' }}>⟳</span>
//                             Downloading...
//                           </>
//                         ) : (
//                           <>
//                             📄 Download PDF
//                           </>
//                         )}
//                       </button>
//                       <button 
//                         style={{
//                           backgroundColor: 'transparent',
//                           color: '#009688',
//                           border: '1px solid #009688',
//                           padding: '8px 20px',
//                           borderRadius: '6px',
//                           cursor: 'pointer',
//                           fontSize: '0.85rem',
//                           fontWeight: '500',
//                           transition: 'all 0.3s ease'
//                         }}
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           viewFullReport(booking);
//                         }}
//                       >
//                         👁️ View Report
//                       </button>
//                     </>
//                   ) : booking.reportProgress ? (
//                     <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
//                       <div style={{ width: '100px', height: '6px', backgroundColor: '#E0F2F1', borderRadius: '3px', overflow: 'hidden' }}>
//                         <div style={{ width: `${booking.reportProgress}%`, height: '100%', backgroundColor: '#009688' }}></div>
//                       </div>
//                       <span style={{ fontSize: '0.85rem', color: '#4F6F6B' }}>{booking.reportProgress}%</span>
//                     </div>
//                   ) : null}
//                 </div>
//                 <button 
//                   style={{
//                     backgroundColor: 'transparent',
//                     color: '#009688',
//                     border: '1px solid #009688',
//                     padding: '6px 15px',
//                     borderRadius: '6px',
//                     cursor: 'pointer',
//                     fontSize: '0.85rem',
//                     transition: 'all 0.3s ease'
//                   }}
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     viewReportDetails(booking);
//                   }}
//                 >
//                   View Details →
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );

//   // Labs Tab
//   const renderLabsTab = () => (
//     <div style={styles.contentCard}>
//       <h3 style={styles.sectionTitle}>🏥 Nearby Diagnostic Centers</h3>
//       <p style={{ color: '#4F6F6B', marginBottom: '20px' }}>
//         Choose from NABL accredited labs with home collection service
//       </p>
//       <div style={styles.testsGrid}>
//         {labs.map(lab => (
//           <div 
//             key={lab.id} 
//             style={styles.testCard}
//             onClick={() => {
//               handleLabClick(lab);
//               addNotification('Lab Selected', `${lab.name} selected. You can now book tests from this lab.`, 'lab');
//             }}
//             onMouseEnter={(e) => {
//               e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 150, 136, 0.15)';
//               e.currentTarget.style.transform = 'translateY(-5px)';
//             }}
//             onMouseLeave={(e) => {
//               e.currentTarget.style.boxShadow = '0 3px 15px rgba(0,0,0,0.05)';
//               e.currentTarget.style.transform = 'translateY(0)';
//             }}
//           >
//             <img src={lab.image} alt={lab.name} style={styles.testImage} />
//             <div style={styles.testName}>{lab.name}</div>
//             <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
//               <span style={{ color: '#FFA500', marginRight: '5px' }}>★</span>
//               <span style={{ color: '#124441', fontWeight: 'bold' }}>{lab.rating}</span>
//               <span style={{ marginLeft: '10px', color: '#4F6F6B', fontSize: '0.9rem' }}>
//                 📍 {lab.distance} away
//               </span>
//             </div>
//             <div style={{ fontSize: '0.9rem', color: '#4F6F6B', marginBottom: '10px' }}>
//               🏠 {lab.sampleCollection}
//             </div>
//             <div style={{ fontSize: '0.9rem', color: '#4F6F6B', marginBottom: '10px' }}>
//               ⏰ {lab.timing}
//             </div>
//             <div style={{ fontSize: '0.85rem', color: '#009688', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '5px' }}>
//               🏆 {lab.accreditation.split(', ')[0]}
//             </div>
//             <button 
//               style={styles.button}
//               onClick={(e) => {
//                 e.stopPropagation();
//                 handleLabClick(lab);
//                 handleTabClick('book');
//                 setBookingStep(3);
//               }}
//             >
//               Book from this Lab
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );

//   // Step Indicator
//   const renderStepIndicator = () => {
//     if (bookingStep <= 1 || bookingStep >= 6) return null;
    
//     return (
//       <div style={styles.stepIndicator}>
//         {[1, 2, 3, 4, 5].map(step => (
//           <div key={step} style={styles.step}>
//             <div style={{ ...styles.stepNumber, ...(step <= bookingStep ? styles.activeStep : {}) }}>
//               {step}
//             </div>
//             <div style={{ ...styles.stepName, ...(step <= bookingStep ? styles.activeStepName : {}) }}>
//               {step === 1 && 'Select Tests'}
//               {step === 2 && 'Family Member'}
//               {step === 3 && 'Choose Lab'}
//               {step === 4 && 'Time Slot'}
//               {step === 5 && 'Payment'}
//             </div>
//             {step < 5 && <div style={styles.stepLine}></div>}
//           </div>
//         ))}
//       </div>
//     );
//   };

//   // Back Button component
//   const BackButton = ({ onClick, text = 'Back' }) => (
//     <button 
//       style={{
//         padding: '0.5rem 1rem',
//         backgroundColor: 'transparent',
//         color: '#009688',
//         border: '1px solid #009688',
//         borderRadius: '6px',
//         cursor: 'pointer',
//         fontSize: '0.9rem',
//         marginRight: '1rem',
//         transition: 'all 0.3s ease',
//         '@media (max-width: 768px)': {
//           padding: '0.4rem 0.8rem',
//           fontSize: '0.85rem'
//         }
//       }}
//       onClick={onClick}
//       type="button"
//       onMouseEnter={(e) => {
//         e.target.style.backgroundColor = '#E0F2F1';
//         e.target.style.color = '#124441';
//       }}
//       onMouseLeave={(e) => {
//         e.target.style.backgroundColor = 'transparent';
//         e.target.style.color = '#009688';
//       }}
//     >
//       ← {text}
//     </button>
//   );

//   // Add CSS animation for spinner
//   const spinnerStyle = `
//     @keyframes spin {
//       0% { transform: rotate(0deg); }
//       100% { transform: rotate(360deg); }
//     }
//   `;

//   return (
//     <>
//       <style>{spinnerStyle}</style>
//       <div style={styles.container}>
//         {/* Header Row with Back Button */}
//         <div style={styles.headerRow}>
//           <BackButton onClick={() => setActiveView('dashboard')} text="Dashboard" />
          
//           <div style={styles.titleSection}>
//             <h1 style={styles.title}>Lab Tests 🔬</h1>
//             <p style={styles.subtitle}>Book tests, track collection, download digital reports</p>
//           </div>

//           <div style={styles.headerActions}>
//             <div style={styles.cartButtonContainer}>
//               <button 
//                 style={{
//                   ...styles.tab,
//                   backgroundColor: cart.length > 0 ? '#009688' : '#FFFFFF',
//                   color: cart.length > 0 ? '#FFFFFF' : '#4F6F6B',
//                   borderColor: '#4DB6AC',
//                   display: 'flex',
//                   alignItems: 'center',
//                   gap: '8px'
//                 }}
//                 onClick={() => handleTabClick('cart')}
//               >
//                 🛒 Cart
//                 {cart.length > 0 && (
//                   <span style={styles.cartBadge}>{cart.length}</span>
//                 )}
//               </button>
//             </div>
//             {currentBooking && (
//               <button 
//                 style={styles.tab}
//                 onClick={() => {
//                   handleTabClick('book');
//                   setBookingStep(6);
//                 }}
//               >
//                 🚚 Track #{currentBooking.id}
//               </button>
//             )}
//           </div>
//         </div>

//         {/* Step Indicator for Booking Flow */}
//         {renderStepIndicator()}

//         {/* Main Tabs */}
//         <div style={styles.tabs}>
//           {['book', 'history', 'labs'].map(tab => (
//             <button
//               key={tab}
//               style={{
//                 ...styles.tab,
//                 ...(activeTab === tab ? styles.activeTab : {})
//               }}
//               onClick={() => handleTabClick(tab)}
//             >
//               {tab === 'book' && '🧪 Book Tests'}
//               {tab === 'history' && '📋 History & Reports'}
//               {tab === 'labs' && '🏥 Labs'}
//             </button>
//           ))}
//         </div>

//         {/* Tab Content */}
//         {activeTab === 'book' && renderBookTestsTab()}
//         {activeTab === 'cart' && renderCartTab()}
//         {activeTab === 'history' && renderHistoryTab()}
//         {activeTab === 'labs' && renderLabsTab()}
//       </div>
//     </>
//   );
// };

// export default LabTestsView;
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import './LabTestsView.css';

const LabTestsView = ({ setActiveView, addNotification }) => {
  const [activeTab, setActiveTab] = useState('book');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cart, setCart] = useState([]);
  const [selectedFamilyMember, setSelectedFamilyMember] = useState('self');
  const [selectedLab, setSelectedLab] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [bookingStep, setBookingStep] = useState(1);
  const [currentBooking, setCurrentBooking] = useState(null);
  const [liveTracking, setLiveTracking] = useState(false);
  const [phlebotomistLocation, setPhlebotomistLocation] = useState({ lat: 12.9716, lng: 77.5946 });
  const [phlebotomistStatus, setPhlebotomistStatus] = useState('assigned');
  const [estimatedArrival, setEstimatedArrival] = useState(15);
  const [reportProgress, setReportProgress] = useState(0);
  const [downloadingReport, setDownloadingReport] = useState(null);
  
  // Use refs to persist values without causing re-renders
  const searchInputRef = useRef(null);
  
  const [bookingHistory, setBookingHistory] = useState([
    {
      id: 'LAB001',
      tests: ['Complete Blood Count', 'Liver Function Test'],
      lab: 'Metropolis Laboratory',
      date: '2024-01-15',
      time: '08:00 AM',
      status: 'Completed',
      results: 'Available',
      amount: 1200,
      reportUrl: '#',
      familyMember: 'Self',
      phlebotomist: 'Dr. Ramesh Kumar',
      trackingId: 'TRK001',
      sampleCollectionTime: '08:15 AM',
      reportReadyTime: '2024-01-16 10:30 AM',
      reportData: {
        patientName: 'John Doe',
        age: 28,
        gender: 'Male',
        referenceNo: 'LAB001',
        collectedDate: '2024-01-15',
        reportedDate: '2024-01-16',
        tests: [
          {
            name: 'Complete Blood Count (CBC)',
            results: [
              { parameter: 'Hemoglobin', value: '14.2', unit: 'g/dL', normalRange: '13.5-17.5', status: 'normal' },
              { parameter: 'RBC Count', value: '4.8', unit: 'million/µL', normalRange: '4.5-5.5', status: 'normal' },
              { parameter: 'WBC Count', value: '7.2', unit: 'thousand/µL', normalRange: '4.0-11.0', status: 'normal' },
              { parameter: 'Platelet Count', value: '250', unit: 'thousand/µL', normalRange: '150-400', status: 'normal' },
              { parameter: 'Hematocrit', value: '42', unit: '%', normalRange: '40-50', status: 'normal' }
            ]
          },
          {
            name: 'Liver Function Test (LFT)',
            results: [
              { parameter: 'SGOT (AST)', value: '22', unit: 'U/L', normalRange: '0-40', status: 'normal' },
              { parameter: 'SGPT (ALT)', value: '25', unit: 'U/L', normalRange: '0-41', status: 'normal' },
              { parameter: 'Alkaline Phosphatase', value: '85', unit: 'U/L', normalRange: '44-147', status: 'normal' },
              { parameter: 'Total Bilirubin', value: '0.8', unit: 'mg/dL', normalRange: '0.2-1.2', status: 'normal' },
              { parameter: 'Direct Bilirubin', value: '0.2', unit: 'mg/dL', normalRange: '0.0-0.3', status: 'normal' }
            ]
          }
        ],
        labDetails: {
          name: 'Metropolis Laboratory',
          address: '123 Health Street, Medical Complex, Bangalore',
          accreditation: 'NABL, CAP Certified',
          labDirector: 'Dr. Rajesh Verma',
          phone: '+91 80 2345 6789',
          email: 'reports@metropolisindia.com'
        },
        interpretation: 'All parameters are within normal limits. No significant abnormalities detected.',
        recommendations: [
          'Maintain healthy lifestyle with regular exercise',
          'Continue with balanced diet rich in fruits and vegetables',
          'Follow up annually for routine health checkup'
        ]
      }
    },
    {
      id: 'LAB002',
      tests: ['Thyroid Profile', 'Vitamin D'],
      lab: 'Thyrocare',
      date: '2024-01-20',
      time: '10:30 AM',
      status: 'Sample Collected',
      results: 'Testing in Progress',
      amount: 1500,
      familyMember: 'Mother',
      phlebotomist: 'Dr. Priya Sharma',
      trackingId: 'TRK002',
      sampleCollectionTime: '10:45 AM',
      reportProgress: 60
    }
  ]);

  // Static data - no need to memoize if it doesn't change
  const familyMembers = [
    { id: 'self', name: 'Self', relation: 'Self', age: 28 },
    { id: 'father', name: 'Rajesh Kumar', relation: 'Father', age: 58 },
    { id: 'mother', name: 'Sita Devi', relation: 'Mother', age: 55 },
    { id: 'spouse', name: 'Priya Sharma', relation: 'Spouse', age: 27 },
    { id: 'child', name: 'Aarav Kumar', relation: 'Son', age: 4 }
  ];

  const labTests = [
    {
      id: 1,
      name: 'Complete Blood Count (CBC)',
      category: 'blood',
      price: 400,
      fasting: 'Not Required',
      reportTime: '6 hours',
      description: 'Measures different components of blood including red cells, white cells, and platelets. Essential for overall health screening.',
      popular: true,
      image: 'https://arthdiagnostics.com/wp-content/uploads/2024/11/CBC-Test-in-Udaipur-350x250.jpg',
      recommendedFor: ['Anemia screening', 'Infection detection', 'General health checkup'],
      preparation: 'No special preparation required'
    },
    {
      id: 2,
      name: 'Thyroid Profile (TSH, T3, T4)',
      category: 'hormone',
      price: 600,
      fasting: 'Fasting Required',
      reportTime: '24 hours',
      description: 'Comprehensive thyroid function test including T3, T4, and TSH levels. Detects hyper/hypothyroidism.',
      popular: true,
      image: 'https://cdn1.healthians.com/blog/wp-content/uploads/2021/02/74.jpg',
      recommendedFor: ['Weight changes', 'Fatigue', 'Mood swings'],
      preparation: '8-12 hours fasting recommended'
    },
    {
      id: 3,
      name: 'Liver Function Test (LFT)',
      category: 'organ',
      price: 800,
      fasting: 'Fasting Required',
      reportTime: '12 hours',
      description: 'Assesses liver health by measuring enzymes, proteins, and bilirubin. Detects liver damage.',
      popular: false,
      image: 'https://www.shutterstock.com/shutterstock/photos/2587246243/display_1500/stock-vector-liver-function-tests-are-blood-tests-that-measure-different-substances-produced-by-your-liver-2587246243.jpg',
      recommendedFor: ['Alcohol consumption', 'Medication monitoring', 'Jaundice'],
      preparation: '10-12 hours fasting required'
    },
    {
      id: 4,
      name: 'Kidney Function Test (KFT)',
      category: 'organ',
      price: 700,
      fasting: 'Fasting Required',
      reportTime: '12 hours',
      description: 'Evaluates kidney function through creatinine, urea, and electrolyte levels.',
      popular: false,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbJFQMnDD62kh4AoSPYL77bqBJRnTqGLpM1g&s',
      recommendedFor: ['High BP patients', 'Diabetes patients', 'Swelling in legs'],
      preparation: '10-12 hours fasting required'
    },
    {
      id: 5,
      name: 'Diabetes Screening (HbA1c + Fasting)',
      category: 'metabolic',
      price: 300,
      fasting: 'Fasting Required',
      reportTime: '24 hours',
      description: 'Comprehensive diabetes screening including HbA1c and fasting blood glucose.',
      popular: true,
      image: 'https://www.metropolisindia.com/upgrade/blog/upload/2020/12/hba1c-checkup-importance-Metropolis-Healthcare.jpg',
      recommendedFor: ['Family history of diabetes', 'Frequent urination', 'Increased thirst'],
      preparation: '8-10 hours fasting required'
    },
    {
      id: 6,
      name: 'Vitamin D (25-OH) Test',
      category: 'vitamin',
      price: 900,
      fasting: 'Not Required',
      reportTime: '48 hours',
      description: 'Measures Vitamin D levels essential for bone health, immunity and mood regulation.',
      popular: true,
      image: 'https://images.apollo247.in/pd-cms/cms/inline-images/Vitamin-D-Test-Details_0.jpg',
      recommendedFor: ['Bone pain', 'Fatigue', 'Weak immunity'],
      preparation: 'No special preparation'
    },
    {
      id: 7,
      name: 'Lipid Profile',
      category: 'cardiac',
      price: 500,
      fasting: 'Fasting Required',
      reportTime: '12 hours',
      description: 'Complete cholesterol check including HDL, LDL, triglycerides and total cholesterol.',
      popular: true,
      image: 'https://karaulidiagnostics.com/wp-content/uploads/2024/08/1613636799_Lipid_big_450.jpg',
      recommendedFor: ['Heart health check', 'High cholesterol', 'Family history'],
      preparation: '12-14 hours fasting required'
    },
    {
      id: 8,
      name: 'Complete Urine Examination',
      category: 'routine',
      price: 200,
      fasting: 'Not Required',
      reportTime: '4 hours',
      description: 'Complete urine analysis for kidney function, diabetes and urinary tract infections.',
      popular: false,
      image: 'https://images.apollo247.in/pd-cms/cms/inline-images/Urine-Routine-Test-Details_0.jpg',
      recommendedFor: ['UTI symptoms', 'Kidney issues', 'Routine checkup'],
      preparation: 'First morning sample preferred'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Tests', icon: '🧪', count: 8 },
    { id: 'blood', name: 'Blood Tests', icon: '💉', count: 4 },
    { id: 'hormone', name: 'Hormone Tests', icon: '⚖️', count: 1 },
    { id: 'organ', name: 'Organ Function', icon: '🫀', count: 2 },
    { id: 'metabolic', name: 'Metabolic', icon: '🔬', count: 1 },
    { id: 'vitamin', name: 'Vitamin Tests', icon: '💊', count: 1 },
    { id: 'cardiac', name: 'Cardiac', icon: '❤️', count: 1 },
    { id: 'routine', name: 'Routine', icon: '📋', count: 1 }
  ];

  const labs = [
    {
      id: 1,
      name: 'Metropolis Laboratory',
      rating: 4.5,
      distance: '1.2 km',
      sampleCollection: 'Home Service Available',
      timing: '6:00 AM - 10:00 PM',
      image: 'https://www.metropolisindia.com/newdata/images/labs/mumbai/mumbai_lab_1.jpg',
      address: '123 Health Street, Medical Complex',
      homeCollectionFee: 99,
      labVisitDiscount: 10,
      phlebotomists: 5,
      averageWaitTime: '10-15 mins',
      accreditation: 'NABL, CAP'
    },
    {
      id: 2,
      name: 'Thyrocare',
      rating: 4.3,
      distance: '2.1 km',
      sampleCollection: 'Home & Lab Service',
      timing: '7:00 AM - 9:00 PM',
      image: 'https://inc42.com/cdn-cgi/image/quality=75/https://asset.inc42.com/2021/07/thyrocare-pharmeasy-cci-featured.jpg',
      address: '456 Diagnostic Road, Health Hub',
      homeCollectionFee: 149,
      labVisitDiscount: 15,
      phlebotomists: 8,
      averageWaitTime: '15-20 mins',
      accreditation: 'NABL, ISO'
    },
    {
      id: 3,
      name: 'Lal Path Labs',
      rating: 4.6,
      distance: '1.8 km',
      sampleCollection: 'Home Service Available',
      timing: '6:30 AM - 8:00 PM',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQox6Z8_GalcucXC5ZbcUlmFNkiolSc-J0r5A&s',
      address: '789 Wellness Avenue',
      homeCollectionFee: 129,
      labVisitDiscount: 20,
      phlebotomists: 6,
      averageWaitTime: '5-10 mins',
      accreditation: 'NABL, NABH'
    }
  ];

  const timeSlots = [
    { id: 1, time: '08:00 AM - 09:00 AM', available: true },
    { id: 2, time: '09:00 AM - 10:00 AM', available: true },
    { id: 3, time: '10:00 AM - 11:00 AM', available: false },
    { id: 4, time: '11:00 AM - 12:00 PM', available: true },
    { id: 5, time: '12:00 PM - 01:00 PM', available: true },
    { id: 6, time: '02:00 PM - 03:00 PM', available: true },
    { id: 7, time: '04:00 PM - 05:00 PM', available: true },
    { id: 8, time: '06:00 PM - 07:00 PM', available: true }
  ];

  // Generate dummy PDF report
  const generateReportPDF = (booking) => {
    if (!booking.reportData) return null;
    
    const { patientName, age, gender, referenceNo, collectedDate, reportedDate, tests, labDetails, interpretation, recommendations } = booking.reportData;
    
    const reportContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; margin: 40px; }
          .header { text-align: center; border-bottom: 2px solid #009688; padding-bottom: 20px; margin-bottom: 30px; }
          .header h1 { color: #009688; margin: 0; }
          .header h2 { color: #4F6F6B; margin: 10px 0; }
          .patient-info { background: #f5f5f5; padding: 20px; border-radius: 10px; margin-bottom: 30px; }
          .info-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; }
          .info-item { margin: 5px 0; }
          .test-section { margin: 30px 0; }
          .test-header { background: #009688; color: white; padding: 10px; border-radius: 5px 5px 0 0; }
          .test-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
          .test-table th, .test-table td { border: 1px solid #ddd; padding: 12px; text-align: left; }
          .test-table th { background: #f5f5f5; }
          .normal { color: #4CAF50; }
          .abnormal { color: #F44336; }
          .lab-info { background: #E0F2F1; padding: 20px; border-radius: 10px; margin: 30px 0; }
          .footer { text-align: center; margin-top: 50px; color: #666; font-size: 12px; }
          .signature { margin-top: 50px; text-align: right; }
          .stamp { position: absolute; right: 50px; opacity: 0.8; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>${labDetails.name}</h1>
          <h2>Laboratory Test Report</h2>
          <p>${labDetails.accreditation}</p>
        </div>
        
        <div class="patient-info">
          <div class="info-grid">
            <div class="info-item"><strong>Patient Name:</strong> ${patientName}</div>
            <div class="info-item"><strong>Age/Gender:</strong> ${age} years / ${gender}</div>
            <div class="info-item"><strong>Reference No:</strong> ${referenceNo}</div>
            <div class="info-item"><strong>Report Date:</strong> ${reportedDate}</div>
            <div class="info-item"><strong>Collected Date:</strong> ${collectedDate}</div>
            <div class="info-item"><strong>Sample Type:</strong> Blood</div>
          </div>
        </div>
        
        ${tests.map(test => `
          <div class="test-section">
            <div class="test-header">
              <h3 style="margin: 0;">${test.name}</h3>
            </div>
            <table class="test-table">
              <thead>
                <tr>
                  <th>Test Parameter</th>
                  <th>Result</th>
                  <th>Unit</th>
                  <th>Reference Range</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                ${test.results.map(result => `
                  <tr>
                    <td>${result.parameter}</td>
                    <td>${result.value}</td>
                    <td>${result.unit}</td>
                    <td>${result.normalRange}</td>
                    <td class="${result.status}">${result.status === 'normal' ? 'Normal ✓' : 'Abnormal ✗'}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        `).join('')}
        
        <div class="lab-info">
          <h3>Laboratory Details</h3>
          <p><strong>Lab:</strong> ${labDetails.name}</p>
          <p><strong>Address:</strong> ${labDetails.address}</p>
          <p><strong>Phone:</strong> ${labDetails.phone}</p>
          <p><strong>Email:</strong> ${labDetails.email}</p>
          <p><strong>Lab Director:</strong> ${labDetails.labDirector}</p>
        </div>
        
        <div>
          <h3>Interpretation</h3>
          <p>${interpretation}</p>
        </div>
        
        <div>
          <h3>Recommendations</h3>
          <ul>
            ${recommendations.map(rec => `<li>${rec}</li>`).join('')}
          </ul>
        </div>
        
        <div class="signature">
          <p><strong>Authorized Signatory</strong></p>
          <p>${labDetails.labDirector}</p>
          <p>Lab Director</p>
        </div>
        
        <div class="footer">
          <p>This is a digitally signed report. No physical signature required.</p>
          <p>Report generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</p>
          <p>Confidential - For patient use only</p>
        </div>
      </body>
      </html>
    `;
    
    return reportContent;
  };

  // Download report with progress simulation
  const downloadReport = useCallback(async (bookingId) => {
    const booking = bookingHistory.find(b => b.id === bookingId);
    if (!booking || booking.results !== 'Available') return;
    
    setDownloadingReport(bookingId);
    
    try {
      // Simulate download progress
      for (let i = 0; i <= 100; i += 10) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      
      // Generate PDF content
      const pdfContent = generateReportPDF(booking);
      
      // Create Blob and download
      const blob = new Blob([pdfContent], { type: 'text/html' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Lab_Report_${booking.id}_${new Date().toISOString().split('T')[0]}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      
      addNotification('Report Downloaded', `${booking.tests[0]} report downloaded successfully`, 'lab');
    } catch (error) {
      console.error('Error downloading report:', error);
      addNotification('Download Failed', 'Failed to download report. Please try again.', 'error');
    } finally {
      setDownloadingReport(null);
    }
  }, [bookingHistory, addNotification]);

  // Filter tests - memoize to prevent recalculation on every render
  const filteredTests = useMemo(() => {
    return labTests.filter(test => {
      const matchesSearch = test.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           test.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || test.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  // Calculate total price
  const totalPrice = useMemo(() => {
    const testsTotal = cart.reduce((total, item) => total + item.price, 0);
    const homeCollectionFee = selectedLab?.homeCollectionFee || 0;
    return testsTotal + homeCollectionFee;
  }, [cart, selectedLab]);

  // Get selected family member data
  const selectedFamilyMemberData = useMemo(() => {
    return familyMembers.find(m => m.id === selectedFamilyMember);
  }, [selectedFamilyMember]);

  // Event handlers
  const handleSearchChange = useCallback((e) => {
    setSearchQuery(e.target.value);
  }, []);

  const handleCategoryClick = useCallback((categoryId) => {
    setSelectedCategory(categoryId);
  }, []);

  const handleTabClick = useCallback((tab) => {
    setActiveTab(tab);
    if (tab === 'book') setBookingStep(1);
  }, []);

  const addToCart = useCallback((test) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === test.id);
      if (existing) return prev;
      return [...prev, { ...test, quantity: 1 }];
    });
    addNotification('Test Added', `${test.name} added to cart`, 'lab');
  }, [addNotification]);

  const removeFromCart = useCallback((testId) => {
    setCart(prev => prev.filter(item => item.id !== testId));
  }, []);

  const handleAddToCart = useCallback((test, e) => {
    e.stopPropagation();
    if (cart.some(item => item.id === test.id)) {
      removeFromCart(test.id);
    } else {
      addToCart(test);
    }
  }, [cart, addToCart, removeFromCart]);

  const handleFamilyMemberClick = useCallback((memberId) => {
    setSelectedFamilyMember(memberId);
  }, []);

  const handleLabClick = useCallback((lab) => {
    setSelectedLab(lab);
  }, []);

  const handleTimeSlotClick = useCallback((slot) => {
    if (slot.available) {
      setSelectedTimeSlot(slot);
    }
  }, []);

  const proceedToFamilySelection = useCallback(() => {
    if (cart.length === 0) {
      alert('Please add tests to cart first');
      return;
    }
    setBookingStep(2);
  }, [cart]);

  const proceedToLabSelection = useCallback(() => {
    setBookingStep(3);
  }, []);

  const proceedToTimeSlot = useCallback(() => {
    if (!selectedLab) {
      alert('Please select a lab first');
      return;
    }
    setBookingStep(4);
  }, [selectedLab]);

  const proceedToPayment = useCallback(() => {
    if (!selectedTimeSlot) {
      alert('Please select a time slot');
      return;
    }
    setBookingStep(5);
  }, [selectedTimeSlot]);

  const simulatePayment = useCallback(() => {
    const newBooking = {
      id: `LAB${Date.now()}`,
      tests: cart.map(item => item.name),
      lab: selectedLab.name,
      date: new Date().toISOString().split('T')[0],
      time: selectedTimeSlot.time,
      status: 'Phlebotomist Assigned',
      results: 'Pending',
      amount: totalPrice,
      familyMember: selectedFamilyMemberData?.name || 'Self',
      phlebotomist: 'Dr. Ramesh Kumar',
      phone: '+91 98765 43210',
      trackingId: `TRK${Date.now()}`,
      estimatedArrival: '15 minutes',
      homeCollectionFee: selectedLab.homeCollectionFee
    };

    setCurrentBooking(newBooking);
    setBookingHistory(prev => [newBooking, ...prev]);
    setCart([]);
    setSelectedLab(null);
    setSelectedTimeSlot(null);
    setBookingStep(6);
    
    setTimeout(() => {
      setCurrentBooking(prev => ({ ...prev, status: 'On the Way' }));
      setPhlebotomistStatus('on_the_way');
      addNotification('Phlebotomist En Route', 'Your phlebotomist is on the way', 'lab');
    }, 3000);

    setTimeout(() => {
      setCurrentBooking(prev => ({ ...prev, status: 'Sample Collected' }));
      setPhlebotomistStatus('sample_collected');
      addNotification('Sample Collected', 'Blood sample has been collected', 'lab');
    }, 60000);

    addNotification('Payment Successful', 'Your lab tests have been booked', 'lab');
  }, [cart, selectedLab, selectedTimeSlot, totalPrice, selectedFamilyMemberData, addNotification]);

  const startLiveTracking = useCallback(() => {
    setLiveTracking(true);
    addNotification('Live Tracking Started', 'You can now track phlebotomist location', 'lab');
  }, [addNotification]);

  const viewReportDetails = useCallback((booking) => {
    setCurrentBooking(booking);
    setActiveTab('book');
    setBookingStep(6);
  }, [setActiveTab]);

  // View report details in modal
  const viewFullReport = useCallback((booking) => {
    if (!booking.reportData) {
      alert('Report data not available yet');
      return;
    }
    
    const reportWindow = window.open('', '_blank', 'width=1200,height=800');
    const reportContent = generateReportPDF(booking);
    reportWindow.document.write(reportContent);
    reportWindow.document.close();
  }, []);

  // Render search input separately with a stable key
  const renderSearchInput = () => (
    <input
      key="search-input"
      type="text"
      placeholder="🔍 Search for lab tests (e.g., CBC, Thyroid, Vitamin D)..."
      className="search-box"
      value={searchQuery}
      onChange={handleSearchChange}
      ref={searchInputRef}
    />
  );

  // Render categories
  const renderCategories = () => (
    <div className="categories-scroll-container">
      {categories.map(category => (
        <button
          key={category.id}
          className={`category-tag ${selectedCategory === category.id ? 'active-category' : ''}`}
          onClick={() => handleCategoryClick(category.id)}
        >
          {category.icon} {category.name} ({category.count})
        </button>
      ))}
    </div>
  );

  // Render test card
  const renderTestCard = (test) => (
    <div 
      key={test.id}
      className="test-card"
      onClick={() => addNotification('Test Details', `${test.name} - ${test.description}`, 'lab')}
    >
      <img src={test.image} alt={test.name} className="test-image" />
      {test.popular && (
        <div className="popular-badge">
          Popular
        </div>
      )}
      <div className="test-name">{test.name}</div>
      <div className="test-description">{test.description}</div>
      <div className="test-details">
        <div>
          <div className="test-price">₹{test.price}</div>
          <div className="test-info">⏱️ Report: {test.reportTime}</div>
        </div>
        <div>
          <div className="test-info">🍽️ {test.fasting}</div>
          <div className="test-recommended">
            {test.recommendedFor[0]}
          </div>
        </div>
      </div>
      <button 
        className={`add-to-cart-btn ${cart.some(item => item.id === test.id) ? 'added-to-cart' : ''}`}
        onClick={(e) => handleAddToCart(test, e)}
      >
        {cart.some(item => item.id === test.id) ? '✓ Added to Cart' : 'Add to Cart'}
      </button>
    </div>
  );

  // Step 1: Test Selection
  const renderStep1 = () => (
    <>
      <div className="content-card">
        {renderSearchInput()}
        {renderCategories()}
      </div>

      <div className="tests-grid">
        {filteredTests.map(test => renderTestCard(test))}
      </div>

      {cart.length > 0 && (
        <div className="floating-cart-button">
          <button
            className="proceed-button"
            onClick={proceedToFamilySelection}
          >
            Proceed to Booking ({cart.length} tests) →
          </button>
        </div>
      )}
    </>
  );

  // Step 2: Family Member Selection
  const renderStep2 = () => (
    <div className="content-card">
      <h3 className="section-title">👨‍👩‍👧‍👦 Select Family Member</h3>
      <p className="section-subtitle">
        Select who these tests are for. You can book tests for yourself or family members.
      </p>
      <div className="family-grid">
        {familyMembers.map(member => (
          <div
            key={member.id}
            className={`family-member-card ${selectedFamilyMember === member.id ? 'selected-family-member' : ''}`}
            onClick={() => handleFamilyMemberClick(member.id)}
          >
            <div className="family-icon">
              {member.id === 'self' ? '👤' : 
               member.id === 'father' ? '👨' :
               member.id === 'mother' ? '👩' :
               member.id === 'spouse' ? '💑' : '👶'}
            </div>
            <div className="family-name">{member.name}</div>
            <div className="family-details">
              {member.relation} • {member.age} years
            </div>
          </div>
        ))}
      </div>
      <div className="navigation-buttons">
        <button 
          className="secondary-button"
          onClick={() => setBookingStep(1)}
        >
          ← Back
        </button>
        <button 
          className="primary-button"
          onClick={proceedToLabSelection}
        >
          Next: Select Lab →
        </button>
      </div>
    </div>
  );

  // Step 3: Lab Selection
  const renderStep3 = () => (
    <div className="content-card">
      <h3 className="section-title">🏥 Select Laboratory</h3>
      <p className="section-subtitle">
        Choose a lab for sample collection. Home service available for all labs.
      </p>
      {labs.map(lab => (
        <div
          key={lab.id}
          className={`lab-card ${selectedLab?.id === lab.id ? 'selected-lab' : ''}`}
          onClick={() => handleLabClick(lab)}
        >
          <div className="lab-card-content">
            <img src={lab.image} alt={lab.name} className="lab-image" />
            <div className="lab-info">
              <div className="lab-header">
                <div>
                  <div className="lab-name">
                    {lab.name}
                  </div>
                  <div className="lab-address">
                    📍 {lab.address}
                  </div>
                </div>
                <div className="lab-rating">
                  <span className="star-icon">★</span>
                  <span className="rating-value">{lab.rating}</span>
                  <span className="distance">({lab.distance})</span>
                </div>
              </div>
              <div className="lab-details">
                <div className="lab-detail-item">
                  🏠 Home Collection: ₹{lab.homeCollectionFee}
                </div>
                <div className="lab-detail-item">
                  ⏰ {lab.timing}
                </div>
                <div className="lab-detail-item">
                  👨‍⚕️ {lab.phlebotomists} phlebotomists
                </div>
              </div>
              <div className="lab-accreditation">
                🏆 {lab.accreditation}
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className="navigation-buttons">
        <button 
          className="secondary-button"
          onClick={() => setBookingStep(2)}
        >
          ← Back
        </button>
        <button 
          className="primary-button"
          onClick={proceedToTimeSlot}
          disabled={!selectedLab}
        >
          Next: Select Time Slot →
        </button>
      </div>
    </div>
  );

  // Step 4: Time Slot Selection
  const renderStep4 = () => (
    <div className="content-card">
      <h3 className="section-title">⏰ Select Time Slot</h3>
      <p className="section-subtitle">
        Choose your preferred time for sample collection. Slots update in real-time.
      </p>
      <div className="time-slots-grid">
        {timeSlots.map(slot => (
          <button
            key={slot.id}
            className={`time-slot-btn ${selectedTimeSlot?.id === slot.id ? 'selected-time-slot' : ''} ${!slot.available ? 'unavailable-time-slot' : ''}`}
            onClick={() => handleTimeSlotClick(slot)}
            disabled={!slot.available}
          >
            {slot.time}
            {!slot.available && ' (Booked)'}
          </button>
        ))}
      </div>
      <div className="booking-summary">
        <div className="summary-title">Booking Summary</div>
        <div className="summary-row">
          <span>Tests ({cart.length})</span>
          <span className="summary-value">₹{cart.reduce((sum, item) => sum + item.price, 0)}</span>
        </div>
        <div className="summary-row">
          <span>Home Collection Fee</span>
          <span className="summary-value">₹{selectedLab?.homeCollectionFee || 0}</span>
        </div>
        <div className="summary-total">
          <span>Total Amount</span>
          <span className="total-amount">
            ₹{totalPrice}
          </span>
        </div>
      </div>
      <div className="navigation-buttons">
        <button 
          className="secondary-button"
          onClick={() => setBookingStep(3)}
        >
          ← Back
        </button>
        <button 
          className="primary-button"
          onClick={proceedToPayment}
          disabled={!selectedTimeSlot}
        >
          Proceed to Payment →
        </button>
      </div>
    </div>
  );

  // Step 5: Payment
  const renderStep5 = () => (
    <div className="content-card">
      <h3 className="section-title">💳 Payment</h3>
      <div className="payment-container">
        <div className="payment-icon">💳</div>
        <div className="payment-amount">
          Total Amount: ₹{totalPrice}
        </div>
        <div className="payment-subtitle">
          Secure payment powered by Razorpay
        </div>
        
        <div className="payment-details">
          <div className="details-title">Booking Details:</div>
          <div className="detail-row">
            <span>For:</span>
            <span>{selectedFamilyMemberData?.name || 'Self'}</span>
          </div>
          <div className="detail-row">
            <span>Lab:</span>
            <span>{selectedLab?.name}</span>
          </div>
          <div className="detail-row">
            <span>Time:</span>
            <span>{selectedTimeSlot?.time}</span>
          </div>
          <div className="detail-tests">
            <span>Tests:</span>
            <span>{cart.map(t => t.name).join(', ')}</span>
          </div>
        </div>

        <button 
          className="payment-button"
          onClick={simulatePayment}
        >
          Pay ₹{totalPrice} Now
        </button>
      </div>
      <button 
        className="secondary-button"
        onClick={() => setBookingStep(4)}
      >
        ← Back
      </button>
    </div>
  );

  // Step 6: Tracking
  const renderStep6 = () => (
    <div className="content-card">
      <h3 className="section-title">🚚 Sample Collection Tracking</h3>
      <div className="booking-confirmed">
        ✅ Booking Confirmed! Order #{currentBooking.id}
      </div>

      <div className="tracking-grid">
        <div className="tracking-section">
          <div className="section-title">👨‍⚕️ Phlebotomist Details</div>
          <div className="detail-card">
            <div className="detail-name">{currentBooking.phlebotomist}</div>
            <div className="detail-info">📱 {currentBooking.phone}</div>
            <div className="detail-info">🆔 Tracking ID: {currentBooking.trackingId}</div>
          </div>
        </div>
        <div className="tracking-section">
          <div className="section-title">📋 Test Details</div>
          <div className="detail-card">
            <div className="detail-label">For: {currentBooking.familyMember}</div>
            <div className="tests-list">
              {currentBooking.tests.map((test, idx) => (
                <div key={idx} className="test-item">• {test}</div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="section-title">📍 Live Tracking</div>
      <div className="tracking-map">
        <div className="map-placeholder">
          <div className="map-icon">🗺️</div>
          <div className="map-title">Live Tracking Active</div>
          <div className="map-subtitle">Phlebotomist is {estimatedArrival} mins away</div>
        </div>
      </div>
      <button 
        className="primary-button tracking-button"
        onClick={startLiveTracking}
      >
        {liveTracking ? 'Live Tracking Active' : 'Start Live Tracking'}
      </button>

      <div className="section-title">📊 Collection Status</div>
      <div className="status-timeline">
        {['Phlebotomist Assigned', 'On the Way', 'Sample Collected', 'Sample at Lab', 'Testing', 'Report Ready'].map((status, idx) => {
          const isActive = idx === ['Phlebotomist Assigned', 'On the Way', 'Sample Collected', 'Sample at Lab', 'Testing', 'Report Ready']
            .indexOf(currentBooking.status);
          const isCompleted = idx < isActive;
          
          return (
            <div key={status} className="status-item">
              <div className={`status-dot ${isCompleted ? 'completed-dot' : ''} ${idx === isActive ? 'active-dot' : ''}`}></div>
              <div className={`status-name ${idx <= isActive ? 'active-status' : ''}`}>
                {status}
              </div>
              <div className="status-time">
                {idx === 0 && currentBooking.date} {idx === 1 && `ETA: ${estimatedArrival} mins`}
                {idx === 2 && currentBooking.time} {idx === 5 && 'Digital report available for download'}
              </div>
            </div>
          );
        })}
      </div>

      {currentBooking.status === 'Sample Collected' && (
        <div className="progress-section">
          <div className="section-title">🔬 Report Progress</div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${reportProgress}%` }}></div>
          </div>
          <div className="progress-labels">
            <span>Sample Received</span>
            <span>{reportProgress}%</span>
            <span>Report Ready</span>
          </div>
        </div>
      )}
    </div>
  );

  // Cart Tab
  const renderCartTab = () => (
    <div className="content-card">
      <h3 className="section-title">🛒 Test Cart ({cart.length} tests)</h3>
      {cart.length === 0 ? (
        <div className="empty-cart">
          <div className="empty-icon">🧪</div>
          <div className="empty-title">Your cart is empty</div>
          <div className="empty-subtitle">Add tests from the Book section</div>
          <button 
            className="primary-button"
            onClick={() => handleTabClick('book')}
          >
            Browse Tests
          </button>
        </div>
      ) : (
        <div>
          {cart.map(test => (
            <div key={test.id} className="cart-item">
              <div className="cart-item-content">
                <div className="cart-item-info">
                  <div className="cart-item-name">{test.name}</div>
                  <div className="cart-item-details">
                    ⏱️ Report: {test.reportTime} • 🍽️ {test.fasting}
                  </div>
                  <div className="cart-item-recommended">
                    {test.recommendedFor[0]}
                  </div>
                </div>
                <div className="cart-item-actions">
                  <div className="cart-item-price">₹{test.price}</div>
                  <button 
                    onClick={() => removeFromCart(test.id)}
                    className="remove-button"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
          <div className="cart-summary">
            <div className="summary-header">
              <div>
                <div className="summary-title">Tests Total ({cart.length})</div>
                <div className="summary-note">Home collection fee will be added later</div>
              </div>
              <div className="summary-amount">
                ₹{cart.reduce((sum, item) => sum + item.price, 0)}
              </div>
            </div>
            <div className="summary-footer">
              <div className="summary-note">
                You'll select time slot and lab in next step
              </div>
              <button 
                className="proceed-button"
                onClick={proceedToFamilySelection}
              >
                🧪 Proceed to Booking →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // History Tab with enhanced report download
  const renderHistoryTab = () => (
    <div className="content-card">
      <h3 className="section-title">📋 Test History & Reports</h3>
      {bookingHistory.length === 0 ? (
        <div className="empty-history">
          <div className="empty-icon">📄</div>
          <div className="empty-title">No test history found</div>
          <div className="empty-subtitle">Book your first test to see history here</div>
        </div>
      ) : (
        <div>
          {bookingHistory.map(booking => (
            <div 
              key={booking.id} 
              className="history-item"
              onClick={() => viewReportDetails(booking)}
            >
              <div className="history-header">
                <div className="history-info">
                  <div className="history-title">
                    <span>Booking #{booking.id}</span>
                    <span className={`status-badge status-${booking.status.toLowerCase().replace(' ', '-')}`}>
                      {booking.status}
                    </span>
                  </div>
                  <div className="history-details">
                    <strong>For:</strong> {booking.familyMember || 'Self'}
                  </div>
                  <div className="history-tests">
                    {booking.tests.slice(0, 2).join(', ')}
                    {booking.tests.length > 2 && ` +${booking.tests.length - 2} more`}
                  </div>
                  <div className="history-meta">
                    {booking.lab} • {booking.date} at {booking.time}
                    {booking.phlebotomist && ` • 👨‍⚕️ ${booking.phlebotomist}`}
                  </div>
                </div>
                <div className="history-side">
                  <div className="history-amount">₹{booking.amount}</div>
                  <div className="history-results">
                    {booking.results}
                  </div>
                </div>
              </div>
              <div className="history-actions">
                <div className="action-buttons">
                  {booking.results === 'Available' ? (
                    <>
                      <button 
                        className={`download-button ${downloadingReport === booking.id ? 'downloading' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          downloadReport(booking.id);
                        }}
                        disabled={downloadingReport === booking.id}
                      >
                        {downloadingReport === booking.id ? (
                          <>
                            <span className="spinner">⟳</span>
                            Downloading...
                          </>
                        ) : (
                          <>
                            📄 Download PDF
                          </>
                        )}
                      </button>
                      <button 
                        className="view-report-button"
                        onClick={(e) => {
                          e.stopPropagation();
                          viewFullReport(booking);
                        }}
                      >
                        👁️ View Report
                      </button>
                    </>
                  ) : booking.reportProgress ? (
                    <div className="progress-indicator">
                      <div className="progress-bar">
                        <div className="progress-fill" style={{ width: `${booking.reportProgress}%` }}></div>
                      </div>
                      <span className="progress-text">{booking.reportProgress}%</span>
                    </div>
                  ) : null}
                </div>
                <button 
                  className="details-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    viewReportDetails(booking);
                  }}
                >
                  View Details →
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  // Labs Tab
  const renderLabsTab = () => (
    <div className="content-card">
      <h3 className="section-title">🏥 Nearby Diagnostic Centers</h3>
      <p className="section-subtitle">
        Choose from NABL accredited labs with home collection service
      </p>
      <div className="labs-grid">
        {labs.map(lab => (
          <div 
            key={lab.id} 
            className="lab-card-compact"
            onClick={() => {
              handleLabClick(lab);
              addNotification('Lab Selected', `${lab.name} selected. You can now book tests from this lab.`, 'lab');
            }}
          >
            <img src={lab.image} alt={lab.name} className="lab-image-compact" />
            <div className="lab-name-compact">{lab.name}</div>
            <div className="lab-rating-compact">
              <span className="star-icon">★</span>
              <span className="rating-value">{lab.rating}</span>
              <span className="distance-compact">
                📍 {lab.distance} away
              </span>
            </div>
            <div className="lab-service">
              🏠 {lab.sampleCollection}
            </div>
            <div className="lab-timing">
              ⏰ {lab.timing}
            </div>
            <div className="lab-accreditation-compact">
              🏆 {lab.accreditation.split(', ')[0]}
            </div>
            <button 
              className="primary-button"
              onClick={(e) => {
                e.stopPropagation();
                handleLabClick(lab);
                handleTabClick('book');
                setBookingStep(3);
              }}
            >
              Book from this Lab
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  // Step Indicator
  const renderStepIndicator = () => {
    if (bookingStep <= 1 || bookingStep >= 6) return null;
    
    return (
      <div className="step-indicator">
        {[1, 2, 3, 4, 5].map(step => (
          <div key={step} className="step">
            <div className={`step-number ${step <= bookingStep ? 'active-step' : ''}`}>
              {step}
            </div>
            <div className={`step-name ${step <= bookingStep ? 'active-step-name' : ''}`}>
              {step === 1 && 'Select Tests'}
              {step === 2 && 'Family Member'}
              {step === 3 && 'Choose Lab'}
              {step === 4 && 'Time Slot'}
              {step === 5 && 'Payment'}
            </div>
            {step < 5 && <div className="step-line"></div>}
          </div>
        ))}
      </div>
    );
  };

  // Book Tests Tab
  const renderBookTestsTab = () => {
    switch (bookingStep) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      case 4:
        return renderStep4();
      case 5:
        return renderStep5();
      case 6:
        return currentBooking ? renderStep6() : null;
      default:
        return renderStep1();
    }
  };

  return (
    <div className="lab-tests-container">
      {/* Header Row with Back Button */}
      <div className="header-row">
        <button 
          className="back-button"
          onClick={() => setActiveView('dashboard')}
          type="button"
        >
          ← Dashboard
        </button>
        
        <div className="title-section">
          <h1 className="page-title">Lab Tests 🔬</h1>
          <p className="page-subtitle">Book tests, track collection, download digital reports</p>
        </div>

        <div className="header-actions">
          <div className="cart-button-container">
            <button 
              className={`tab-button ${cart.length > 0 ? 'cart-active' : ''}`}
              onClick={() => handleTabClick('cart')}
            >
              🛒 Cart
              {cart.length > 0 && (
                <span className="cart-badge">{cart.length}</span>
              )}
            </button>
          </div>
          {currentBooking && (
            <button 
              className="tab-button track-button"
              onClick={() => {
                handleTabClick('book');
                setBookingStep(6);
              }}
            >
              🚚 Track #{currentBooking.id}
            </button>
          )}
        </div>
      </div>

      {/* Step Indicator for Booking Flow */}
      {renderStepIndicator()}

      {/* Main Tabs */}
      <div className="tabs-container">
        {['book', 'history', 'labs'].map(tab => (
          <button
            key={tab}
            className={`tab ${activeTab === tab ? 'active-tab' : ''}`}
            onClick={() => handleTabClick(tab)}
          >
            {tab === 'book' && '🧪 Book Tests'}
            {tab === 'history' && '📋 History & Reports'}
            {tab === 'labs' && '🏥 Labs'}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'book' && renderBookTestsTab()}
      {activeTab === 'cart' && renderCartTab()}
      {activeTab === 'history' && renderHistoryTab()}
      {activeTab === 'labs' && renderLabsTab()}
    </div>
  );
};

export default LabTestsView;