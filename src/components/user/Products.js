import React, { useState } from 'react';

const Products = ({ 
  searchQuery, 
  setSearchQuery, 
  medicines, 
  filteredMedicines, 
  cart, 
  addToCart, 
  updateQuantity, 
  setActiveView 
}) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showProductDetails, setShowProductDetails] = useState(false);

  // Color constants
  const colors = {
    primary: '#7C2A62',
    accent: '#F7D9EB',
    white: '#FFFFFF',
    lightGray: '#F5F5F5',
    gray: '#666666',
    darkGray: '#333333',
    success: '#28a745',
    warning: '#ffc107',
    danger: '#dc3545'
  };

  // Styles object with the new color scheme - SIGNIFICANTLY INCREASED GAP
  const styles = {
    mainContent: {
      padding: '20px',
      backgroundColor: colors.lightGray,
      minHeight: '100vh',
      marginTop: '50px', // Account for fixed header
      paddingTop: '80px' // SIGNIFICANTLY INCREASED from 50px to 80px
    },
    // NEW: Back button styles
    backButton: {
      position: 'fixed',
      top: '80px',
      left: '20px',
      padding: '12px 20px',
      backgroundColor: colors.primary,
      color: colors.white,
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '16px',
      fontWeight: '600',
      transition: 'all 0.3s ease',
      zIndex: 100,
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
    },
    welcomeSection: {
      textAlign: 'center',
      marginBottom: '30px', // Increased from 30px to 40px
      padding: '20px 10px', // SIGNIFICANTLY INCREASED padding
      backgroundColor: colors.white,
      borderRadius: '15px',
      boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
      marginTop: '20px' // DOUBLED from 10px to 20px
    },
    welcomeTitle: {
      color: colors.primary,
      fontSize: '2.5rem', // Larger font size
      marginBottom: '20px', // More space below title
      fontWeight: 'bold'
    },
    welcomeSubtitle: {
      color: colors.gray,
      fontSize: '1.3rem', // Larger subtitle
      lineHeight: '1.6'
    },
    searchSection: {
      marginBottom: '40px', // Increased spacing
      backgroundColor: colors.white,
      padding: '30px', // Increased padding
      borderRadius: '12px',
      boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
    },
    searchContainer: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '25px', // More space
      gap: '20px' // More gap between elements
    },
    searchInput: {
      flex: 0.5,
      padding: '15px 20px', // Larger padding for better touch
      border: `2px solid ${colors.accent}`,
      borderRadius: '5px', // Slightly larger border radius
      fontSize: '16px',
      outline: 'none',
      transition: 'border-color 0.3s ease',
      backgroundColor: colors.white
    },
    // NEW: Health message styles
    healthMessage: {
      flex: 0.8,
      padding: '15px 20px',
      backgroundColor: colors.accent,
      color: colors.primary,
      borderRadius: '8px',
      fontSize: '14px',
      lineHeight: '1.5',
      fontWeight: '500',
      textAlign: 'center',
      border: `1px solid ${colors.primary}20`
    },
    categoryFilter: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '15px' // More gap between category buttons
    },
    categoryButton: {
      padding: '12px 24px', // Larger buttons
      border: `2px solid ${colors.accent}`,
      backgroundColor: colors.white,
      color: colors.primary,
      borderRadius: '25px',
      cursor: 'pointer',
      fontSize: '15px', // Slightly larger font
      fontWeight: '500',
      transition: 'all 0.3s ease'
    },
    activeCategoryButton: {
      backgroundColor: colors.primary,
      color: colors.white,
      borderColor: colors.primary
    },
    productsSection: {
      marginBottom: '40px' // More space at bottom
    },
    productsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '25px' // More gap between product cards
    },
    productCard: {
      backgroundColor: colors.white,
      borderRadius: '12px',
      padding: '25px', // More padding in cards
      boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      border: `1px solid ${colors.accent}`,
      display: 'flex',
      flexDirection: 'column',
      height: '90%'
    },
    productImage: {
      fontSize: '3.5rem', // Larger icons
      textAlign: 'center',
      marginBottom: '20px' // More space below image
    },
    productInfo: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column'
    },
    productName: {
      color: colors.primary,
      fontSize: '1.3rem', // Slightly larger
      fontWeight: 'bold',
      marginBottom: '8px' // More space
    },
    productBrand: {
      color: colors.gray,
      fontSize: '1.1rem', // Slightly larger
      marginBottom: '12px', // More space
      fontWeight: '500'
    },
    productDescription: {
      color: colors.darkGray,
      fontSize: '0.95rem', // Slightly larger
      marginBottom: '18px', // More space
      lineHeight: '1.5' // Better readability
    },
    productMeta: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '15px' // More space
    },
    productCategory: {
      backgroundColor: colors.accent,
      color: colors.primary,
      padding: '6px 14px', // Larger badge
      borderRadius: '15px',
      fontSize: '0.85rem', // Slightly larger
      fontWeight: '500'
    },
    prescriptionBadge: {
      backgroundColor: colors.warning,
      color: colors.darkGray,
      padding: '6px 10px', // Larger badge
      borderRadius: '10px',
      fontSize: '0.75rem', // Slightly larger
      fontWeight: 'bold'
    },
    productRating: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px', // More gap
      marginBottom: '15px' // More space
    },
    ratingStars: {
      fontSize: '1rem' // Larger stars
    },
    ratingText: {
      color: colors.gray,
      fontSize: '0.85rem' // Slightly larger
    },
    productStock: {
      marginBottom: '18px' // More space
    },
    inStock: {
      color: colors.success,
      fontSize: '0.95rem', // Slightly larger
      fontWeight: '500'
    },
    outOfStock: {
      color: colors.danger,
      fontSize: '0.95rem', // Slightly larger
      fontWeight: '500'
    },
    productPriceSection: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '18px' // More space
    },
    productPrice: {
      color: colors.primary,
      fontSize: '1.6rem', // Larger price
      fontWeight: 'bold'
    },
    viewDetailsButton: {
      padding: '10px 10px', // Larger button
      backgroundColor: 'transparent',
      color: colors.primary,
      border: `2px solid ${colors.primary}`,
      borderRadius: '8px', // Slightly larger
      cursor: 'pointer',
      fontSize: '0.95rem', // Slightly larger
      fontWeight: '500',
      transition: 'all 0.3s ease'
    },
    // UPDATED: Smaller Add to Cart button
    addToCartButton: {
      padding: '10px 0px', // SMALLER: Reduced from 14px to 10px
      backgroundColor: colors.primary,
      color: colors.white,
      border: 'none',
      borderRadius: '6px', // Slightly smaller
      cursor: 'pointer',
      fontSize: '0.9rem', // SMALLER: Reduced from 1.1rem to 0.9rem
      fontWeight: '600',
      transition: 'all 0.3s ease',
      marginTop: 'auto'
    },
    // UPDATED: Smaller disabled button
    disabledButton: {
      padding: '10px 16px', // SMALLER: Reduced from 14px to 10px
      backgroundColor: colors.gray,
      color: colors.white,
      border: 'none',
      borderRadius: '6px', // Slightly smaller
      cursor: 'not-allowed',
      fontSize: '0.9rem', // SMALLER: Reduced from 1.1rem to 0.9rem
      fontWeight: '600',
      opacity: 0.6,
      marginTop: 'auto'
    },
    quantityControls: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '15px',
      marginTop: 'auto',
      padding: '10px',
      backgroundColor: colors.lightGray,
      borderRadius: '8px'
    },
    // UPDATED: Smaller quantity buttons
    quantityButton: {
      width: '35px', // SMALLER: Reduced from 40px to 35px
      height: '35px', // SMALLER: Reduced from 40px to 35px
      border: `2px solid ${colors.primary}`,
      backgroundColor: colors.white,
      color: colors.primary,
      borderRadius: '50%',
      cursor: 'pointer',
      fontSize: '1rem', // SMALLER: Reduced from 1.2rem to 1rem
      fontWeight: 'bold',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.3s ease'
    },
    // UPDATED: Smaller quantity display
    quantityDisplay: {
      fontSize: '1.1rem', // SMALLER: Reduced from 1.3rem to 1.1rem
      fontWeight: 'bold',
      color: colors.primary,
      minWidth: '35px', // SMALLER: Reduced from 40px to 35px
      textAlign: 'center'
    },
    modalOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.7)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
      padding: '20px'
    },
    productModal: {
      backgroundColor: colors.white,
      borderRadius: '15px',
      maxWidth: '800px',
      width: '100%',
      maxHeight: '90vh',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
    },
    modalHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '20px 25px',
      borderBottom: `2px solid ${colors.accent}`,
      backgroundColor: colors.primary,
      color: colors.white,
      position: 'relative'
    },
    modalTitle: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      margin: 0
    },
    // UPDATED: Decreased close button width
    closeButton: {
      background: 'none',
      border: 'none',
      color: colors.white,
      fontSize: '1.5rem', // Smaller font size
      cursor: 'pointer',
      padding: 0,
      width: '30px', // Decreased from 40px to 30px
      height: '30px', // Decreased from 40px to 30px
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '50%',
      transition: 'background-color 0.3s ease'
    },
    modalContent: {
      padding: '25px',
      overflowY: 'auto',
      flex: 1
    },
    modalImageSection: {
      display: 'flex',
      gap: '20px',
      marginBottom: '25px',
      alignItems: 'flex-start'
    },
    modalImage: {
      fontSize: '4rem',
      padding: '20px',
      backgroundColor: colors.accent,
      borderRadius: '10px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    modalBasicInfo: {
      flex: 1
    },
    modalBrand: {
      color: colors.primary,
      fontSize: '1.3rem',
      fontWeight: 'bold',
      marginBottom: '5px'
    },
    modalCategory: {
      color: colors.gray,
      fontSize: '1rem',
      marginBottom: '10px'
    },
    modalPrice: {
      color: colors.primary,
      fontSize: '2rem',
      fontWeight: 'bold',
      marginBottom: '10px'
    },
    modalRating: {
      color: colors.gray,
      fontSize: '1rem'
    },
    modalDetails: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px'
    },
    detailSection: {
      marginBottom: '15px'
    },
    detailTitle: {
      color: colors.primary,
      fontSize: '1.1rem',
      fontWeight: 'bold',
      marginBottom: '10px',
      borderBottom: `2px solid ${colors.accent}`,
      paddingBottom: '5px'
    },
    detailText: {
      color: colors.darkGray,
      fontSize: '0.95rem',
      lineHeight: '1.5',
      margin: 0
    },
    detailList: {
      margin: 0,
      paddingLeft: '20px'
    },
    detailListItem: {
      color: colors.darkGray,
      fontSize: '0.95rem',
      lineHeight: '1.5',
      marginBottom: '5px'
    },
    modalActions: {
      display: 'flex',
      gap: '15px',
      padding: '20px 25px',
      borderTop: `2px solid ${colors.accent}`,
      backgroundColor: colors.lightGray
    },
    closeModalButton: {
      padding: '12px 25px',
      backgroundColor: colors.gray,
      color: colors.white,
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '1rem',
      fontWeight: '600',
      transition: 'all 0.3s ease',
      flex: 0.2
    },
    modalQuantityControls: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '20px',
      margin: '20px 0',
      padding: '15px',
      backgroundColor: colors.accent,
      borderRadius: '10px'
    },
    modalQuantityButton: {
      width: '45px',
      height: '45px',
      border: `2px solid ${colors.primary}`,
      backgroundColor: colors.white,
      color: colors.primary,
      borderRadius: '50%',
      cursor: 'pointer',
      fontSize: '1.5rem',
      fontWeight: 'bold',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.3s ease'
    },
    modalQuantityDisplay: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: colors.primary,
      minWidth: '50px',
      textAlign: 'center'
    }
  };

  // Enhanced medicine data with detailed information
  const enhancedMedicines = [
    {
      id: 1,
      name: 'Aspirin 75mg',
      brand: 'Bayer',
      price: 25,
      vendor: 'WellCare Store',
      category: 'Pain Relief',
      description: 'Low-dose aspirin for heart health and pain relief',
      detailedDescription: 'Aspirin is a salicylate drug that works by reducing substances in the body that cause pain, fever, and inflammation. Low-dose aspirin (75mg) is commonly used for cardiovascular protection.',
      uses: [
        'Prevention of heart attacks and strokes',
        'Mild to moderate pain relief',
        'Reduction of fever and inflammation'
      ],
      dosage: 'Take one tablet daily with food as directed by your doctor',
      sideEffects: [
        'Stomach upset',
        'Heartburn',
        'Mild headache'
      ],
      precautions: [
        'Do not take if allergic to aspirin',
        'Consult doctor before surgery',
        'Avoid alcohol consumption'
      ],
      image: '',
      prescriptionRequired: false,
      stock: 50,
      rating: 4.5,
      reviews: 128
    },
    {
      id: 2,
      name: 'Paracetamol 500mg',
      brand: 'Crocin',
      price: 30,
      vendor: 'City Pharmacy',
      category: 'Fever & Pain',
      description: 'Effective relief from fever and mild pain',
      detailedDescription: 'Paracetamol (acetaminophen) is a common pain reliever and fever reducer. It works by affecting the areas of the brain that receive pain signals and regulate body temperature.',
      uses: [
        'Fever reduction',
        'Headache relief',
        'Muscle aches and pains',
        'Arthritis pain'
      ],
      dosage: '1-2 tablets every 4-6 hours as needed, maximum 8 tablets in 24 hours',
      sideEffects: [
        'Rare when taken as directed',
        'Allergic reactions in sensitive individuals',
        'Liver damage with overdose'
      ],
      precautions: [
        'Do not exceed recommended dosage',
        'Consult doctor for liver conditions',
        'Avoid with alcohol'
      ],
      image: '',
      prescriptionRequired: false,
      stock: 100,
      rating: 4.7,
      reviews: 256
    },
    {
      id: 3,
      name: 'Ibuprofen 400mg',
      brand: 'Brufen',
      price: 35,
      vendor: 'HealthPlus Medicines',
      category: 'Pain Relief',
      description: 'Anti-inflammatory pain reliever for various conditions',
      detailedDescription: 'Ibuprofen is a nonsteroidal anti-inflammatory drug (NSAID) that works by reducing hormones that cause inflammation and pain in the body. Effective for various inflammatory conditions.',
      uses: [
        'Arthritis pain and inflammation',
        'Muscle aches',
        'Menstrual cramps',
        'Dental pain'
      ],
      dosage: 'One tablet every 6-8 hours with food, maximum 1200mg per day',
      sideEffects: [
        'Stomach upset',
        'Heartburn',
        'Dizziness',
        'Increased blood pressure'
      ],
      precautions: [
        'Take with food or milk',
        'Avoid in third trimester of pregnancy',
        'Consult for kidney problems'
      ],
      image: '',
      prescriptionRequired: false,
      stock: 75,
      rating: 4.4,
      reviews: 189
    },
    {
      id: 4,
      name: 'Vitamin C 1000mg',
      brand: 'NatureMade',
      price: 40,
      vendor: 'WellCare Store',
      category: 'Vitamins & Supplements',
      description: 'High-potency Vitamin C for immune support',
      detailedDescription: 'Vitamin C (ascorbic acid) is a water-soluble vitamin essential for growth and development. It helps the body form collagen, absorb iron, and maintain healthy bones, teeth, and immune system.',
      uses: [
        'Immune system support',
        'Collagen production',
        'Antioxidant protection',
        'Iron absorption'
      ],
      dosage: 'One tablet daily with a meal',
      sideEffects: [
        'Mild diarrhea in high doses',
        'Stomach cramps',
        'Nausea'
      ],
      precautions: [
        'Consult for kidney stones history',
        'May interact with chemotherapy',
        'Store in cool dry place'
      ],
      image: '',
      prescriptionRequired: false,
      stock: 200,
      rating: 4.8,
      reviews: 342
    },
    {
      id: 5,
      name: 'Amoxicillin 500mg',
      brand: 'Amoxil',
      price: 120,
      vendor: 'City Pharmacy',
      category: 'Antibiotics',
      description: 'Broad-spectrum antibiotic for bacterial infections',
      detailedDescription: 'Amoxicillin is a penicillin-type antibiotic that fights bacteria in the body. It is used to treat many different types of infections caused by bacteria, such as ear infections, bladder infections, pneumonia, and more.',
      uses: [
        'Bacterial infections',
        'Respiratory tract infections',
        'Urinary tract infections',
        'Skin infections'
      ],
      dosage: 'As prescribed by doctor, typically one capsule three times daily',
      sideEffects: [
        'Nausea',
        'Diarrhea',
        'Skin rash',
        'Yeast infection'
      ],
      precautions: [
        'PRESCRIPTION REQUIRED',
        'Complete full course',
        'Inform about penicillin allergy',
        'Take with plenty of water'
      ],
      image: '',
      prescriptionRequired: true,
      stock: 30,
      rating: 4.3,
      reviews: 95
    },
    {
      id: 6,
      name: 'Blood Pressure Monitor',
      brand: 'Omron',
      price: 899,
      vendor: 'HealthPlus Medicines',
      category: 'Medical Equipment',
      description: 'Digital automatic blood pressure monitor',
      detailedDescription: 'Professional-grade digital blood pressure monitor with advanced accuracy. Features easy-to-read display, irregular heartbeat detector, and memory function for tracking readings over time.',
      uses: [
        'Home blood pressure monitoring',
        'Hypertension management',
        'Health tracking',
        'Doctor consultation support'
      ],
      features: [
        'One-touch operation',
        '90-reading memory',
        'Irregular heartbeat detection',
        'WHO classification indicator'
      ],
      specifications: [
        'Cuff size: 22-32cm',
        'Battery operated',
        '2-year warranty',
        'Clinically validated'
      ],
      image: '',
      prescriptionRequired: false,
      stock: 25,
      rating: 4.6,
      reviews: 167
    },
    {
      id: 7,
      name: 'Cetirizine 10mg',
      brand: 'Zyrtec',
      price: 25,
      vendor: 'City Pharmacy',
      category: 'Allergy',
      description: '24-hour allergy relief without drowsiness',
      detailedDescription: 'Cetirizine is an antihistamine that reduces the effects of natural chemical histamine in the body. Histamine can produce symptoms of sneezing, itching, watery eyes, and runny nose.',
      uses: [
        'Seasonal allergies',
        'Hay fever',
        'Chronic urticaria',
        'Allergic skin reactions'
      ],
      dosage: 'One tablet daily, with or without food',
      sideEffects: [
        'Dry mouth',
        'Mild drowsiness (rare)',
        'Headache',
        'Sore throat'
      ],
      precautions: [
        'Avoid alcohol',
        'Consult for kidney problems',
        'Safe for long-term use'
      ],
      image: '',
      prescriptionRequired: false,
      stock: 80,
      rating: 4.5,
      reviews: 214
    },
    {
      id: 8,
      name: 'Omeprazole 20mg',
      brand: 'Prilosec',
      price: 45,
      vendor: 'City Pharmacy',
      category: 'Acid Reducer',
      description: 'Proton pump inhibitor for acid reflux',
      detailedDescription: 'Omeprazole is a proton pump inhibitor that decreases the amount of acid produced in the stomach. It is used to treat symptoms of GERD and other conditions caused by excess stomach acid.',
      uses: [
        'GERD (gastroesophageal reflux disease)',
        'Stomach ulcers',
        'Zollinger-Ellison syndrome',
        'Erosive esophagitis'
      ],
      dosage: 'One capsule daily before eating, usually for 4-8 weeks',
      sideEffects: [
        'Headache',
        'Diarrhea',
        'Stomach pain',
        'Nausea'
      ],
      precautions: [
        'Take before meals',
        'Do not crush or chew',
        'Long-term use requires monitoring',
        'May affect vitamin B12 absorption'
      ],
      image: '',
      prescriptionRequired: true,
      stock: 40,
      rating: 4.2,
      reviews: 178
    },
    {
      id: 9,
      name: 'Multivitamin Tablets',
      brand: 'Centrum',
      price: 150,
      vendor: 'WellCare Store',
      category: 'Vitamins & Supplements',
      description: 'Complete daily multivitamin for adults',
      detailedDescription: 'Comprehensive multivitamin formula containing essential vitamins and minerals to support overall health, energy production, immune function, and cellular protection.',
      uses: [
        'Daily nutritional support',
        'Energy production',
        'Immune system function',
        'Bone and eye health'
      ],
      keyIngredients: [
        'Vitamin A, C, D, E',
        'B-complex vitamins',
        'Calcium and Magnesium',
        'Zinc and Selenium'
      ],
      dosage: 'One tablet daily with a meal',
      sideEffects: [
        'Mild stomach upset',
        'Constipation',
        'Unusual taste'
      ],
      precautions: [
        'Keep out of reach of children',
        'Do not exceed recommended dose',
        'Consult if pregnant or nursing'
      ],
      image: '',
      prescriptionRequired: false,
      stock: 150,
      rating: 4.7,
      reviews: 289
    },
    {
      id: 10,
      name: 'Calcium Supplements',
      brand: 'Caltrate',
      price: 200,
      vendor: 'WellCare Store',
      category: 'Vitamins & Supplements',
      description: 'Calcium with Vitamin D for bone health',
      detailedDescription: 'Advanced calcium supplement with Vitamin D3 to support bone density and strength. Essential for maintaining healthy bones and teeth, and preventing osteoporosis.',
      uses: [
        'Bone health maintenance',
        'Osteoporosis prevention',
        'Dental health',
        'Muscle function'
      ],
      dosage: 'One tablet twice daily with meals',
      sideEffects: [
        'Constipation',
        'Gas and bloating',
        'Stomach upset'
      ],
      precautions: [
        'Take with plenty of water',
        'Space from other medications',
        'Consult for kidney stones'
      ],
      image: '',
      prescriptionRequired: false,
      stock: 90,
      rating: 4.4,
      reviews: 156
    },
    {
      id: 11,
      name: 'Metformin 500mg',
      brand: 'Glucophage',
      price: 85,
      vendor: 'HealthPlus Medicines',
      category: 'Diabetes',
      description: 'First-line treatment for type 2 diabetes',
      detailedDescription: 'Metformin is an oral diabetes medicine that helps control blood sugar levels. It works by helping to restore the body\'s proper response to insulin and decreasing the amount of sugar produced by the liver.',
      uses: [
        'Type 2 diabetes management',
        'Polycystic ovary syndrome (PCOS)',
        'Weight management in diabetes'
      ],
      dosage: 'As prescribed, usually 1-2 tablets daily with meals',
      sideEffects: [
        'Nausea',
        'Diarrhea',
        'Stomach upset',
        'Metallic taste'
      ],
      precautions: [
        'PRESCRIPTION REQUIRED',
        'Monitor kidney function',
        'Avoid excessive alcohol',
        'Take with food to reduce side effects'
      ],
      image: '',
      prescriptionRequired: true,
      stock: 60,
      rating: 4.3,
      reviews: 134
    },
    {
      id: 12,
      name: 'Atorvastatin 10mg',
      brand: 'Lipitor',
      price: 95,
      vendor: 'City Pharmacy',
      category: 'Cholesterol',
      description: 'Statin medication for cholesterol control',
      detailedDescription: 'Atorvastatin is a statin that slows the production of cholesterol in the body to reduce the amount of cholesterol that may build up on the walls of arteries and block blood flow.',
      uses: [
        'High cholesterol treatment',
        'Cardiovascular disease prevention',
        'Triglyceride reduction'
      ],
      dosage: 'One tablet daily, usually in the evening',
      sideEffects: [
        'Headache',
        'Muscle pain',
        'Joint pain',
        'Digestive issues'
      ],
      precautions: [
        'PRESCRIPTION REQUIRED',
        'Regular liver function tests',
        'Report unexplained muscle pain',
        'Avoid grapefruit products'
      ],
      image: '',
      prescriptionRequired: true,
      stock: 45,
      rating: 4.4,
      reviews: 167
    }
  ];

  const categories = ['all', ...new Set(enhancedMedicines.map(medicine => medicine.category))];

  const filteredProducts = enhancedMedicines.filter(medicine => {
    const matchesSearch = medicine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         medicine.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         medicine.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || medicine.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const viewProductDetails = (product) => {
    setSelectedProduct(product);
    setShowProductDetails(true);
  };

  const closeProductDetails = () => {
    setShowProductDetails(false);
    setSelectedProduct(null);
  };

  const addToCartWithNotification = (product) => {
    addToCart(product);
    // You can add a toast notification here if needed
  };

  // Get quantity of product in cart
  const getProductQuantity = (productId) => {
    const cartItem = cart.find(item => item.id === productId);
    return cartItem ? cartItem.quantity : 0;
  };

  // Handle click outside modal to close
  const handleModalOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      closeProductDetails();
    }
  };

  // NEW: Handle back to home page
  const handleBackToHome = () => {
    setActiveView('home');
  };

  return (
    <div style={styles.mainContent}>
      {/* NEW: Back Button */}
      <button 
        style={styles.backButton}
        onClick={handleBackToHome}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = colors.accent;
          e.target.style.color = colors.primary;
          e.target.style.transform = 'translateX(-5px)';
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = colors.primary;
          e.target.style.color = colors.white;
          e.target.style.transform = 'translateX(0)';
        }}
      >
        ← Back to Home
      </button>

      {/* Header Section */}
      <section style={styles.welcomeSection}>
        <h2 style={styles.welcomeTitle}>Our Medicine Products 💊</h2>
        <p style={styles.welcomeSubtitle}>
          Discover high-quality medicines and healthcare products with detailed information
        </p>
      </section>

      {/* Search and Filter Section */}
      <section style={styles.searchSection}>
        <div style={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search medicines, brands, or categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={styles.searchInput}
          />
          {/* NEW: Health Priority Message */}
          <div style={styles.healthMessage}>
For your safety and well-being, we provide only quality medicines from trusted sources, properly stored for maximum efficacy.           </div>
        </div>

        <div style={styles.categoryFilter}>
          {categories.map(category => (
            <button
              key={category}
              style={
                selectedCategory === category 
                  ? {...styles.categoryButton, ...styles.activeCategoryButton}
                  : styles.categoryButton
              }
              onClick={() => setSelectedCategory(category)}
            >
              {category === 'all' ? 'All Products' : category}
            </button>
          ))}
        </div>
      </section>

      {/* Products Grid */}
      <section style={styles.productsSection}>
        <div style={styles.productsGrid}>
          {filteredProducts.map(product => {
            const quantityInCart = getProductQuantity(product.id);
            
            return (
              <div key={product.id} style={styles.productCard}>
                <div style={styles.productImage}>
                  {product.image}
                </div>
                
                <div style={styles.productInfo}>
                  <h3 style={styles.productName}>{product.name}</h3>
                  <p style={styles.productBrand}>{product.brand}</p>
                  <p style={styles.productDescription}>{product.description}</p>
                  
                  <div style={styles.productMeta}>
                    <div style={styles.productCategory}>{product.category}</div>
                    {product.prescriptionRequired && (
                      <div style={styles.prescriptionBadge}>Prescription Required</div>
                    )}
                  </div>

                  <div style={styles.productRating}>
                    <span style={styles.ratingStars}>
                      {'⭐'.repeat(Math.floor(product.rating))}
                    </span>
                    <span style={styles.ratingText}>({product.reviews})</span>
                  </div>

                  <div style={styles.productStock}>
                    {product.stock > 0 ? (
                      <span style={styles.inStock}>In Stock ({product.stock})</span>
                    ) : (
                      <span style={styles.outOfStock}>Out of Stock</span>
                    )}
                  </div>

                  <div style={styles.productPriceSection}>
                    <span style={styles.productPrice}>₹{product.price}</span>
                    <button
                      style={styles.viewDetailsButton}
                      onClick={() => viewProductDetails(product)}
                    >
                      View Details
                    </button>
                  </div>

                  {quantityInCart > 0 ? (
                    <div style={styles.quantityControls}>
                      <button
                        style={styles.quantityButton}
                        onClick={() => updateQuantity(product.id, quantityInCart - 1)}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = colors.primary;
                          e.target.style.color = colors.white;
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = colors.white;
                          e.target.style.color = colors.primary;
                        }}
                      >
                        −
                      </button>
                      <span style={styles.quantityDisplay}>{quantityInCart}</span>
                      <button
                        style={styles.quantityButton}
                        onClick={() => updateQuantity(product.id, quantityInCart + 1)}
                        disabled={quantityInCart >= product.stock}
                        onMouseEnter={(e) => {
                          if (quantityInCart < product.stock) {
                            e.target.style.backgroundColor = colors.primary;
                            e.target.style.color = colors.white;
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (quantityInCart < product.stock) {
                            e.target.style.backgroundColor = colors.white;
                            e.target.style.color = colors.primary;
                          }
                        }}
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <button
                      style={product.stock > 0 ? styles.addToCartButton : styles.disabledButton}
                      onClick={() => product.stock > 0 && addToCartWithNotification(product)}
                      disabled={product.stock === 0}
                    >
                      {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Product Details Modal */}
      {showProductDetails && selectedProduct && (
        <div style={styles.modalOverlay} onClick={handleModalOverlayClick}>
          <div style={styles.productModal}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>{selectedProduct.name}</h2>
              <button style={styles.closeButton} onClick={closeProductDetails}>
                ×
              </button>
            </div>

            <div style={styles.modalContent}>
              <div style={styles.modalImageSection}>
                <div style={styles.modalImage}>
                  {selectedProduct.image}
                </div>
                <div style={styles.modalBasicInfo}>
                  <h3 style={styles.modalBrand}>{selectedProduct.brand}</h3>
                  <p style={styles.modalCategory}>{selectedProduct.category}</p>
                  <div style={styles.modalPrice}>₹{selectedProduct.price}</div>
                  <div style={styles.modalRating}>
                    ⭐ {selectedProduct.rating} ({selectedProduct.reviews} reviews)
                  </div>
                </div>
              </div>

              {/* Quantity Controls in Modal */}
              <div style={styles.modalQuantityControls}>
                <button
                  style={styles.modalQuantityButton}
                  onClick={() => {
                    const currentQuantity = getProductQuantity(selectedProduct.id);
                    if (currentQuantity > 0) {
                      updateQuantity(selectedProduct.id, currentQuantity - 1);
                    }
                  }}
                  onMouseEnter={(e) => {
                    const currentQuantity = getProductQuantity(selectedProduct.id);
                    if (currentQuantity > 0) {
                      e.target.style.backgroundColor = colors.primary;
                      e.target.style.color = colors.white;
                    }
                  }}
                  onMouseLeave={(e) => {
                    const currentQuantity = getProductQuantity(selectedProduct.id);
                    if (currentQuantity > 0) {
                      e.target.style.backgroundColor = colors.white;
                      e.target.style.color = colors.primary;
                    }
                  }}
                >
                  −
                </button>
                <span style={styles.modalQuantityDisplay}>
                  {getProductQuantity(selectedProduct.id)}
                </span>
                <button
                  style={styles.modalQuantityButton}
                  onClick={() => {
                    const currentQuantity = getProductQuantity(selectedProduct.id);
                    if (currentQuantity < selectedProduct.stock) {
                      updateQuantity(selectedProduct.id, currentQuantity + 1);
                    }
                  }}
                  disabled={getProductQuantity(selectedProduct.id) >= selectedProduct.stock}
                  onMouseEnter={(e) => {
                    const currentQuantity = getProductQuantity(selectedProduct.id);
                    if (currentQuantity < selectedProduct.stock) {
                      e.target.style.backgroundColor = colors.primary;
                      e.target.style.color = colors.white;
                    }
                  }}
                  onMouseLeave={(e) => {
                    const currentQuantity = getProductQuantity(selectedProduct.id);
                    if (currentQuantity < selectedProduct.stock) {
                      e.target.style.backgroundColor = colors.white;
                      e.target.style.color = colors.primary;
                    }
                  }}
                >
                  +
                </button>
              </div>

              <div style={styles.modalDetails}>
                <div style={styles.detailSection}>
                  <h4 style={styles.detailTitle}>Description</h4>
                  <p style={styles.detailText}>{selectedProduct.detailedDescription}</p>
                </div>

                <div style={styles.detailSection}>
                  <h4 style={styles.detailTitle}>Uses</h4>
                  <ul style={styles.detailList}>
                    {selectedProduct.uses.map((use, index) => (
                      <li key={index} style={styles.detailListItem}>{use}</li>
                    ))}
                  </ul>
                </div>

                <div style={styles.detailSection}>
                  <h4 style={styles.detailTitle}>Dosage</h4>
                  <p style={styles.detailText}>{selectedProduct.dosage}</p>
                </div>

                <div style={styles.detailSection}>
                  <h4 style={styles.detailTitle}>Side Effects</h4>
                  <ul style={styles.detailList}>
                    {selectedProduct.sideEffects.map((effect, index) => (
                      <li key={index} style={styles.detailListItem}>{effect}</li>
                    ))}
                  </ul>
                </div>

                <div style={styles.detailSection}>
                  <h4 style={styles.detailTitle}>Precautions</h4>
                  <ul style={styles.detailList}>
                    {selectedProduct.precautions.map((precaution, index) => (
                      <li key={index} style={styles.detailListItem}>{precaution}</li>
                    ))}
                  </ul>
                </div>

                {selectedProduct.features && (
                  <div style={styles.detailSection}>
                    <h4 style={styles.detailTitle}>Features</h4>
                    <ul style={styles.detailList}>
                      {selectedProduct.features.map((feature, index) => (
                        <li key={index} style={styles.detailListItem}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedProduct.keyIngredients && (
                  <div style={styles.detailSection}>
                    <h4 style={styles.detailTitle}>Key Ingredients</h4>
                    <ul style={styles.detailList}>
                      {selectedProduct.keyIngredients.map((ingredient, index) => (
                        <li key={index} style={styles.detailListItem}>{ingredient}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <div style={styles.modalActions}>
              <button
                style={selectedProduct.stock > 0 ? styles.addToCartButton : styles.disabledButton}
                onClick={() => {
                  if (selectedProduct.stock > 0 && getProductQuantity(selectedProduct.id) === 0) {
                    addToCartWithNotification(selectedProduct);
                  }
                }}
                disabled={selectedProduct.stock === 0 || getProductQuantity(selectedProduct.id) > 0}
              >
                {getProductQuantity(selectedProduct.id) > 0 ? 'Added to Cart' : 'Add to Cart'}
              </button>
              <button style={styles.closeModalButton} onClick={closeProductDetails}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}; 

export default Products;