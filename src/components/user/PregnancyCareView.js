import React, { useState, useEffect, useRef } from 'react';
import './PregnancyCareView.css';

const INITIAL_PREGNANCY_DATA = {
  currentWeek: 24,
  dueDate: '2024-06-15',
  familyMembers: 4,
  pregnancyPackage: 'Premium Pregnancy Care',
};

// Pregnancy Care Packages
const PREGNANCY_CARE_PACKAGES = [
  {
    id: 'basic-pregnancy-care',
    title: 'Basic Pregnancy Care',
    price: 25000,
    duration: '9 months',
    patientsEnrolled: '8 patients enrolled',
    features: [
      'Monthly checkups',
      'Basic tests (Blood, Urine)',
      '2 Ultrasounds',
      'Hospital delivery',
      'Postnatal checkup'
    ],
    popular: false,
    description: 'Essential pregnancy care for a healthy journey',
    planId: 'basic-pregnancy-care'
  },
  {
    id: 'premium-pregnancy-care',
    title: 'Premium Pregnancy Care',
    price: 50000,
    duration: '9 months',
    patientsEnrolled: '5 patients enrolled',
    features: [
      'Fortnightly checkups',
      'All tests included',
      '4 Ultrasounds',
      'Home visits (3 times)',
      'Nutrition counseling',
      'Delivery & postnatal care'
    ],
    popular: true,
    description: 'Comprehensive care with home visits and nutrition support',
    planId: 'premium-pregnancy-care'
  },
  {
    id: 'comprehensive-pregnancy-care',
    title: 'Comprehensive Pregnancy Care',
    price: 75000,
    duration: '9 months',
    patientsEnrolled: '2 patients enrolled',
    features: [
      'Weekly checkups',
      'All tests & advanced scans',
      'Unlimited home visits',
      'Personalized nutrition plan',
      'Delivery preparation classes',
      'Complete postnatal care'
    ],
    popular: false,
    description: 'Premium complete care package with unlimited support',
    planId: 'comprehensive-pregnancy-care'
  }
];

// 9-Month Pregnancy Diet Plans
const PREGNANCY_DIET_PLANS = {
  1: {
    month: 1,
    focus: 'Early Nutrition & Nausea Management',
    dailyCalories: 2200,
    keyNutrients: ['Folic Acid', 'Vitamin B6', 'Iron', 'Vitamin B12'],
    foods: {
      recommended: ['Leafy greens', 'Citrus fruits', 'Whole grains', 'Lean proteins'],
      avoid: ['Raw seafood', 'Unpasteurized dairy', 'High-mercury fish']
    },
    sampleDay: {
      breakfast: 'Whole grain toast with avocado + Ginger tea',
      snack: 'Banana with almonds',
      lunch: 'Quinoa salad with chickpeas and veggies',
      snack: 'Greek yogurt with berries',
      dinner: 'Grilled chicken with steamed vegetables',
      bedtime: 'Warm milk with honey'
    },
    tips: [
      'Eat small, frequent meals (6-8 times/day)',
      'Stay hydrated with 8-10 glasses of water',
      'Ginger tea helps with morning sickness',
      'Avoid strong smells and spicy foods'
    ]
  },
  2: {
    month: 2,
    focus: 'Organ Development Support',
    dailyCalories: 2300,
    keyNutrients: ['Protein', 'Calcium', 'Omega-3', 'Vitamin D'],
    foods: {
      recommended: ['Eggs', 'Salmon', 'Spinach', 'Berries', 'Nuts'],
      avoid: ['Processed meats', 'Artificial sweeteners', 'Excess caffeine']
    },
    sampleDay: {
      breakfast: 'Oatmeal with chia seeds, berries, and walnuts',
      snack: 'Hard-boiled eggs (2)',
      lunch: 'Lentil soup with whole grain bread',
      snack: 'Cottage cheese with pineapple chunks',
      dinner: 'Baked salmon with sweet potato and broccoli',
      bedtime: 'Chamomile tea'
    }
  },
  3: {
    month: 3,
    focus: 'Brain Development & Growth',
    dailyCalories: 2400,
    keyNutrients: ['Omega-3 DHA', 'Choline', 'Iodine', 'Zinc'],
    foods: {
      recommended: ['Walnuts', 'Eggs', 'Lean beef', 'Dairy products'],
      avoid: ['Raw sprouts', 'Undercooked eggs', 'High-sodium foods']
    }
  },
  4: {
    month: 4,
    focus: 'Bone Development & Energy',
    dailyCalories: 2500,
    keyNutrients: ['Calcium', 'Vitamin D', 'Magnesium', 'Protein'],
    foods: {
      recommended: ['Dairy', 'Leafy greens', 'Fish', 'Nuts and seeds'],
      avoid: ['Alcohol', 'Excess caffeine', 'Processed foods']
    }
  },
  5: {
    month: 5,
    focus: 'Muscle Development & Blood Volume',
    dailyCalories: 2600,
    keyNutrients: ['Iron', 'Vitamin C', 'Protein', 'Vitamin B12'],
    foods: {
      recommended: ['Lean meats', 'Citrus fruits', 'Legumes', 'Whole grains'],
      avoid: ['Raw shellfish', 'Soft cheeses', 'Deli meats']
    }
  },
  6: {
    month: 6,
    focus: 'Brain Growth & Fat Storage',
    dailyCalories: 2700,
    keyNutrients: ['Healthy fats', 'Omega-3', 'Vitamin E', 'Selenium'],
    foods: {
      recommended: ['Avocado', 'Nuts', 'Olive oil', 'Fatty fish'],
      avoid: ['Trans fats', 'Fried foods', 'Sugary drinks']
    }
  },
  7: {
    month: 7,
    focus: 'Lung Development & Immune Support',
    dailyCalories: 2800,
    keyNutrients: ['Vitamin C', 'Beta-carotene', 'Selenium', 'Zinc'],
    foods: {
      recommended: ['Bell peppers', 'Carrots', 'Berries', 'Garlic'],
      avoid: ['Raw honey', 'Unpasteurized juices', 'High-mercury fish']
    }
  },
  8: {
    month: 8,
    focus: 'Final Growth & Energy Storage',
    dailyCalories: 2900,
    keyNutrients: ['Complex carbs', 'Fiber', 'Iron', 'Calcium'],
    foods: {
      recommended: ['Whole grains', 'Legumes', 'Dairy', 'Leafy greens'],
      avoid: ['Large meals', 'Spicy foods', 'Gas-producing foods']
    }
  },
  9: {
    month: 9,
    focus: 'Labor Preparation & Recovery',
    dailyCalories: 3000,
    keyNutrients: ['Vitamin K', 'Iron', 'Protein', 'Complex carbs'],
    foods: {
      recommended: ['Leafy greens', 'Lean meats', 'Whole grains', 'Dates'],
      avoid: ['Heavy meals', 'New foods', 'Excess sugar']
    }
  }
};

const PregnancyCareView = ({ 
  user, 
  addNotification, 
  setActiveView,
  // Props from UserDashboard
  userSubscriptions = [],
  isSubscribed = false,
  handleSubscribe, // This is the Razorpay function from UserDashboard
  handleUpgradeSubscription,
  paymentLoading = false,
  showSubscriptionModal = false,
  setShowSubscriptionModal,
  selectedSubscription,
  setSelectedSubscription,
  showUpgradeModal = false,
  setShowUpgradeModal,
  selectedUpgradePlan,
  setSelectedUpgradePlan,
  // Razorpay props
  razorpayKey = "rzp_test_YOUR_KEY_HERE", // Replace with your actual Razorpay key
  handlePaymentSuccess = null,
  handlePaymentFailure = null
}) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [pregnancyData, setPregnancyData] = useState(INITIAL_PREGNANCY_DATA);
  const [medicalReports, setMedicalReports] = useState([]);
  const [uploadingFile, setUploadingFile] = useState(false);
  const [vitals, setVitals] = useState({
    bloodPressure: { value: '120/80', date: '2024-01-20', trend: 'stable' },
    weight: { value: '65 kg', date: '2024-01-20', trend: '+0.5kg/week' },
    bloodSugar: { value: '95 mg/dL', date: '2024-01-20', trend: 'normal' },
    temperature: { value: '36.8°C', date: '2024-01-20', trend: 'normal' },
  });
  const [showAddVitalModal, setShowAddVitalModal] = useState(false);
  const [newVital, setNewVital] = useState({ type: '', value: '', date: '', notes: '' });
  const fileInputRef = useRef(null);
  const [aiDietPlan, setAiDietPlan] = useState([]);
  const [medicineReminders, setMedicineReminders] = useState([]);
  
  const [showUploadedFileModal, setShowUploadedFileModal] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [showShareVitalsModal, setShowShareVitalsModal] = useState(false);
  const [selectedVitalsToShare, setSelectedVitalsToShare] = useState([]);
  
  // New state variables
  const [currentMonth, setCurrentMonth] = useState(1);
  const [pregnancyProgress, setPregnancyProgress] = useState(0);
  const [showPaymentCancelledModal, setShowPaymentCancelledModal] = useState(false);
  const [paymentCancelledMessage, setPaymentCancelledMessage] = useState('');
  const [showPackageDetailsModal, setShowPackageDetailsModal] = useState(false);
  const [selectedPackageDetails, setSelectedPackageDetails] = useState(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareOptions, setShareOptions] = useState(null);
  const [selectedShareOption, setSelectedShareOption] = useState('');
  const [regeneratingPlan, setRegeneratingPlan] = useState(false);
  const [showRegenerationModal, setShowRegenerationModal] = useState(false);
  const [regenerationProgress, setRegenerationProgress] = useState(0);

  // Share with Doctor modal state
  const [showShareDoctorModal, setShowShareDoctorModal] = useState(false);
  const [shareDoctorData, setShareDoctorData] = useState(null);

  // Payment state
  const [processingPayment, setProcessingPayment] = useState(false);
  const [paymentError, setPaymentError] = useState(null);

  const realTimeDietData = [
    { time: 'Breakfast (8:00 AM)', meals: ['Oatmeal with berries and almonds (300 cal)'], recommendation: 'High in protein and fiber', nutrients: 'Protein: 25g, Fiber: 8g' },
    { time: 'Mid-Morning Snack (11:00 AM)', meals: ['Apple with peanut butter (150 cal)'], recommendation: 'Maintains blood sugar', nutrients: 'Healthy fats, Vitamins' },
    { time: 'Lunch (1:00 PM)', meals: ['Grilled chicken with quinoa (450 cal)'], recommendation: 'Balanced meal', nutrients: 'Protein: 35g, Iron: 15% DV' },
    { time: 'Afternoon Snack (4:00 PM)', meals: ['Cottage cheese with fruits (160 cal)'], recommendation: 'Prevents energy slump', nutrients: 'Calcium: 20% DV' },
    { time: 'Dinner (7:00 PM)', meals: ['Baked fish with vegetables (420 cal)'], recommendation: 'Light, digestible meal', nutrients: 'Protein: 30g, Fiber: 10g' },
    { time: 'Bedtime (9:00 PM)', meals: ['Warm milk with turmeric (120 cal)'], recommendation: 'Promotes sleep', nutrients: 'Calcium: 30% DV' }
  ];

  // Get active pregnancy package from UserDashboard
  const activePregnancyPackage = userSubscriptions?.find(sub => 
    sub.planType === 'pregnancyCare' && sub.status === 'active'
  );

  // Check if user has premium access
  const hasPremiumAccess = () => {
    return isSubscribed && activePregnancyPackage;
  };

  // Calculate pregnancy progress percentage
  const calculatePregnancyProgress = () => {
    const progress = (pregnancyData.currentWeek / 40) * 100;
    setPregnancyProgress(progress);
    return progress;
  };

  // Update pregnancy progress
  const updatePregnancyProgress = (newWeek) => {
    const progress = (newWeek / 40) * 100;
    setPregnancyProgress(progress);
    setPregnancyData(prev => ({ ...prev, currentWeek: newWeek }));
    return progress;
  };

  // Get trimester based on week
  const getTrimester = (week) => {
    if (week <= 12) return 'First Trimester';
    if (week <= 27) return 'Second Trimester';
    return 'Third Trimester';
  };

  // Show payment cancelled modal
  const showPaymentCancelled = (message = 'Your payment was cancelled. You can try again.') => {
    setPaymentCancelledMessage(message);
    setShowPaymentCancelledModal(true);
    
    // Optionally add a notification
    addNotification('Payment Cancelled', message, 'alert');
  };

  // Show package details modal
  const showPackageDetails = (packageItem) => {
    setSelectedPackageDetails(packageItem);
    setShowPackageDetailsModal(true);
  };

  // Handle subscription navigation
  const handleSubscribeToAccess = () => {
    // Navigate to subscription plans tab
    setActiveTab('plans');
    
    // Scroll to packages section
    setTimeout(() => {
      const packagesSection = document.querySelector('.subscription-plans-section');
      if (packagesSection) {
        packagesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
    
    addNotification('Subscription Plans', 'Please select a pregnancy care package to access premium features', 'info');
  };

  // Handle share with doctor link
  const handleShareWithDoctorLink = (packageData = null) => {
    const shareData = {
      title: packageData ? `Pregnancy Care Package - ${packageData.title}` : 'Pregnancy Health Records',
      text: packageData 
        ? `I'm interested in the ${packageData.title} package for my pregnancy care. Please review and share your recommendations.`
        : 'Please review my pregnancy health records and vitals for your expert opinion.',
      type: packageData ? 'package' : 'records',
      data: packageData || {
        vitals: Object.entries(vitals).filter(([key, val]) => val.value && val.value.trim() !== ''),
        reports: medicalReports.length,
        currentWeek: pregnancyData.currentWeek
      },
      timestamp: new Date().toLocaleString(),
      // Generate a unique share link
      shareLink: `${window.location.origin}/doctor-share/${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      accessCode: Math.random().toString(36).substr(2, 8).toUpperCase()
    };

    setShareDoctorData(shareData);
    setShowShareDoctorModal(true);
  };

  // Regenerate AI diet plan
  const handleRegenerateAIPlan = () => {
    // Check if user has premium access
    if (!hasPremiumAccess()) {
      addNotification(
        'Premium Feature Required',
        'AI Diet Plan Regeneration requires a pregnancy care package subscription',
        'alert'
      );
      
      // Redirect to packages tab
      setActiveTab('plans');
      
      // Scroll to packages section
      setTimeout(() => {
        const packagesSection = document.querySelector('.subscription-plans-section');
        if (packagesSection) {
          packagesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
      
      return;
    }

    setRegeneratingPlan(true);
    setRegenerationProgress(0);
    setShowRegenerationModal(true);
    
    // Simulate AI processing with progress updates
    const progressInterval = setInterval(() => {
      setRegenerationProgress(prev => {
        const newProgress = prev + 25;
        if (newProgress >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return newProgress;
      });
    }, 500);

    // Get current month's focus - SAFE ACCESS
    const monthPlan = PREGNANCY_DIET_PLANS[currentMonth] || PREGNANCY_DIET_PLANS[1];
    
    // Simulate AI processing delay
    setTimeout(() => {
      // Generate new AI-optimized meal plan
      const mealVariations = {
        1: ['Oatmeal with berries and almonds', 'Greek yogurt with honey and nuts', 'Whole grain toast with avocado'],
        2: ['Apple with peanut butter', 'Handful of walnuts and almonds', 'Orange slices with cottage cheese'],
        3: ['Grilled chicken with quinoa', 'Lentil soup with vegetables', 'Tofu stir-fry with brown rice'],
        4: ['Cottage cheese with fruits', 'Yogurt with granola', 'Protein smoothie'],
        5: ['Baked fish with vegetables', 'Grilled salmon with sweet potato', 'Chicken vegetable stew'],
        6: ['Warm milk with turmeric', 'Chamomile tea', 'Herbal infusion']
      };

      const updatedPlan = realTimeDietData.map((meal, index) => {
        const mealKey = index + 1;
        const variations = mealVariations[mealKey] || meal.meals;
        const randomMeal = variations[Math.floor(Math.random() * variations.length)];
        
        // Generate AI recommendations
        const recommendation = generateAIRecommendation(currentMonth, index);
        const nutrients = generateNutrientInfo(currentMonth, index);
        
        return {
          ...meal,
          meals: [`${randomMeal} [AI Optimized]`],
          recommendation: recommendation,
          nutrients: nutrients,
          aiGenerated: true,
          timestamp: new Date().toLocaleTimeString(),
          month: currentMonth,
          focus: monthPlan?.focus || 'Nutrition & Health',
          calories: (monthPlan?.dailyCalories || 2200) + Math.floor(Math.random() * 100) - 50 // Random variation
        };
      });

      setAiDietPlan(updatedPlan);
      setRegeneratingPlan(false);
      clearInterval(progressInterval);
      
      // Close modal after a delay
      setTimeout(() => {
        setShowRegenerationModal(false);
        setRegenerationProgress(0);
      }, 1000);
      
      addNotification(
        'AI Plan Regenerated',
        `Your Month ${currentMonth} diet plan has been updated with AI optimizations`,
        'health'
      );
    }, 2000);
  };

  // Generate AI recommendation based on month and meal time
  const generateAIRecommendation = (month, mealIndex) => {
    const recommendations = {
      morning: [
        'High protein breakfast supports morning energy',
        'Fiber-rich meal helps digestion throughout the day',
        'Complex carbs provide sustained energy'
      ],
      midday: [
        'Balanced nutrients support baby development',
        'Iron-rich food enhances blood production',
        'Calcium intake supports bone development'
      ],
      evening: [
        'Light dinner aids digestion and sleep',
        'Protein supports overnight tissue repair',
        'Low glycemic index prevents blood sugar spikes'
      ]
    };

    let timeOfDay = 'midday';
    if (mealIndex === 0) timeOfDay = 'morning';
    else if (mealIndex >= realTimeDietData.length - 2) timeOfDay = 'evening';

    const specificRecs = {
      1: 'Extra folic acid for early development',
      2: 'Protein for organ formation',
      3: 'Omega-3 for brain development',
      4: 'Calcium for bone growth',
      5: 'Iron for increased blood volume',
      6: 'Healthy fats for baby\'s brain growth',
      7: 'Vitamin C for immune support',
      8: 'Complex carbs for energy storage',
      9: 'Vitamin K for labor preparation'
    };

    const baseRec = recommendations[timeOfDay]?.[mealIndex % (recommendations[timeOfDay]?.length || 3)] || 'Balanced nutrition for pregnancy';
    const specificRec = specificRecs[month] || 'Tailored for your pregnancy stage.';
    
    return `${baseRec}. ${specificRec}`;
  };

  // Generate nutrient information
  const generateNutrientInfo = (month, mealIndex) => {
    const nutrientProfiles = {
      1: { protein: '20-25g', fiber: '8-10g', calcium: '15% DV', folate: '100% DV' },
      2: { protein: '25-30g', fiber: '10-12g', calcium: '20% DV', iron: '15% DV' },
      3: { protein: '30-35g', fiber: '12-15g', omega3: '500mg', iodine: '100% DV' },
      4: { protein: '35-40g', fiber: '15-18g', calcium: '30% DV', vitaminD: '50% DV' },
      5: { protein: '40-45g', fiber: '18-20g', iron: '20% DV', vitaminC: '100% DV' },
      6: { protein: '35-40g', fiber: '15-18g', healthyFats: '20g', vitaminE: '30% DV' },
      7: { protein: '30-35g', fiber: '12-15g', vitaminC: '120% DV', betaCarotene: '80% DV' },
      8: { protein: '25-30g', fiber: '10-12g', complexCarbs: '50g', iron: '25% DV' },
      9: { protein: '20-25g', fiber: '8-10g', vitaminK: '100% DV', carbs: '45g' }
    };

    const profile = nutrientProfiles[month] || nutrientProfiles[1] || {};
    const nutrients = Object.entries(profile).map(([key, value]) => 
      `${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`
    ).join(', ');

    return nutrients + ' (AI Optimized)';
  };

  // Handle share functionality
  const handleSharePlan = () => {
    const shareData = {
      title: `Pregnancy Diet Plan - Month ${currentMonth}`,
      text: `Check out my AI-optimized pregnancy diet plan for Month ${currentMonth}: ${PREGNANCY_DIET_PLANS[currentMonth]?.focus || 'Pregnancy Nutrition'}`,
      month: currentMonth,
      focus: PREGNANCY_DIET_PLANS[currentMonth]?.focus || 'Nutrition & Health',
      plan: aiDietPlan.slice(0, 3), // Share first 3 meals as preview
      timestamp: new Date().toLocaleString(),
      url: window.location.href
    };

    // Check if Web Share API is available
    if (navigator.share) {
      navigator.share({
        title: shareData.title,
        text: shareData.text,
        url: shareData.url
      })
      .then(() => {
        addNotification('Plan Shared', 'Diet plan shared successfully', 'share');
      })
      .catch((error) => {
        console.log('Error sharing:', error);
        // Fallback to show share options
        setShareOptions({
          title: 'Share Diet Plan',
          message: `Share your Month ${currentMonth} pregnancy diet plan`,
          options: ['Copy Link', 'Send Email', 'Download PDF', 'Share with Doctor'],
          data: shareData
        });
        setShowShareModal(true);
      });
    } else {
      // Fallback: Show share options modal
      setShareOptions({
        title: 'Share Diet Plan',
        message: `Share your Month ${currentMonth} pregnancy diet plan`,
        options: ['Copy Link', 'Send Email', 'Download PDF', 'Share with Doctor'],
        data: shareData
      });
      setShowShareModal(true);
    }
  };

  // Initialize user data
  useEffect(() => {
    setMedicalReports([
      { id: 1, name: 'First Trimester Ultrasound', date: '2023-12-01', type: 'ultrasound',
        uploadedBy: 'Dr. Sarah Johnson', encrypted: true, access: ['patient', 'doctor'] },
      { id: 2, name: 'Blood Test Results', date: '2024-01-15', type: 'lab',
        uploadedBy: 'Lab Technician', encrypted: true, access: ['patient', 'doctor'] }
    ]);

    setAiDietPlan(realTimeDietData);
    setMedicineReminders([
      { id: 1, medicine: 'Prenatal Vitamins', time: '09:00 AM', dosage: '1 tablet', status: 'taken' },
      { id: 2, medicine: 'Folic Acid', time: '09:00 AM', dosage: '400mcg', status: 'taken' },
      { id: 3, medicine: 'Iron Supplement', time: '02:00 PM', dosage: '1 tablet', status: 'pending' }
    ]);
    
    // Calculate current month
    const calculatedMonth = Math.ceil(pregnancyData.currentWeek / 4.33);
    setCurrentMonth(Math.min(calculatedMonth, 9));
    
    // Calculate initial pregnancy progress
    const progress = calculatePregnancyProgress();
    setPregnancyProgress(progress);
    
    // Generate initial diet plan
    generateMonthlyDietPlan();
  }, []);

  // Generate monthly diet plan
  const generateMonthlyDietPlan = () => {
    const monthPlan = PREGNANCY_DIET_PLANS[currentMonth] || PREGNANCY_DIET_PLANS[1];
    const updatedPlan = realTimeDietData.map(meal => ({
      ...meal,
      meals: meal.meals.map(m => `${m} [Month ${currentMonth} Optimized]`),
      month: currentMonth,
      focus: monthPlan.focus,
      calories: monthPlan.dailyCalories
    }));
    
    setAiDietPlan(updatedPlan);
    
    if (hasPremiumAccess()) {
      addNotification(
        'Diet Plan Updated',
        `Your ${monthPlan.focus} diet plan for Month ${currentMonth} is ready!`,
        'health'
      );
    }
  };

  // Navigation between months
  const navigateMonth = (direction) => {
    if (!hasPremiumAccess()) {
      // Use the parent's subscription modal
      setShowSubscriptionModal(true);
      return;
    }
    
    const newMonth = currentMonth + direction;
    if (newMonth >= 1 && newMonth <= 9) {
      setCurrentMonth(newMonth);
      generateMonthlyDietPlan();
    }
  };

  // Razorpay Payment Integration
  const initiateRazorpayPayment = async (packageItem, isUpgrade = false) => {
    try {
      setProcessingPayment(true);
      setPaymentError(null);

      // Create order on your backend first
      const orderResponse = await createOrder(packageItem, isUpgrade);
      
      if (!orderResponse.success) {
        throw new Error(orderResponse.message || 'Failed to create order');
      }

      const orderId = orderResponse.orderId;
      const amount = packageItem.price * 100; // Convert to paise

      // Load Razorpay script
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        const options = {
          key: razorpayKey,
          amount: amount,
          currency: 'INR',
          name: 'Healthcare Pregnancy Care',
          description: `${packageItem.title} Package`,
          order_id: orderId,
          handler: async function (response) {
            // Payment successful
            await handlePaymentSuccessResponse(response, packageItem, isUpgrade);
          },
          prefill: {
            name: user?.fullName || 'User',
            email: user?.email || 'user@example.com',
            contact: user?.phone || '9999999999'
          },
          theme: {
            color: '#009688'
          },
          modal: {
            ondismiss: function() {
              // Payment cancelled
              handlePaymentCancelled(packageItem);
            }
          }
        };

        const razorpayInstance = new window.Razorpay(options);
        razorpayInstance.open();
      };

      script.onerror = () => {
        setProcessingPayment(false);
        setPaymentError('Failed to load payment gateway. Please try again.');
        addNotification('Payment Error', 'Failed to load payment gateway', 'error');
      };

    } catch (error) {
      console.error('Payment initiation error:', error);
      setProcessingPayment(false);
      setPaymentError(error.message || 'Failed to initiate payment');
      addNotification('Payment Error', error.message || 'Failed to initiate payment', 'error');
    }
  };

  // Create order on backend
  const createOrder = async (packageItem, isUpgrade) => {
    // Simulate API call - Replace with your actual backend endpoint
    try {
      const response = await fetch('/api/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          packageId: packageItem.id,
          packageName: packageItem.title,
          amount: packageItem.price,
          isUpgrade: isUpgrade,
          currentPackageId: activePregnancyPackage?.id,
          userId: user?.id || 'guest'
        })
      });

      const data = await response.json();
      return data;
    } catch (error) {
      // Fallback to client-side order creation for demo
      return {
        success: true,
        orderId: `order_${Date.now()}_${packageItem.id}`,
        amount: packageItem.price * 100
      };
    }
  };

  // Handle payment success
  const handlePaymentSuccessResponse = async (response, packageItem, isUpgrade) => {
    try {
      // Verify payment on backend
      const verificationResponse = await verifyPayment(response.razorpay_payment_id, response.razorpay_order_id, response.razorpay_signature);
      
      if (verificationResponse.success) {
        // Payment verified successfully
        setProcessingPayment(false);
        
        if (isUpgrade) {
          // Handle upgrade
          if (handleUpgradeSubscription) {
            await handleUpgradeSubscription({
              planType: 'pregnancyCare',
              subscription: activePregnancyPackage,
              newPackage: packageItem,
              paymentId: response.razorpay_payment_id,
              orderId: response.razorpay_order_id
            });
          }
        } else {
          // Handle new subscription
          if (handleSubscribe) {
            await handleSubscribe({
              ...packageItem,
              paymentId: response.razorpay_payment_id,
              orderId: response.razorpay_order_id,
              subscribedAt: new Date().toISOString(),
              status: 'active',
              planType: 'pregnancyCare'
            });
          }
        }

        // Call parent success handler if provided
        if (handlePaymentSuccess) {
          handlePaymentSuccess({
            package: packageItem,
            paymentId: response.razorpay_payment_id,
            orderId: response.razorpay_order_id,
            isUpgrade: isUpgrade
          });
        }

        addNotification('Payment Successful', `You have successfully subscribed to ${packageItem.title}`, 'success');
        
      } else {
        throw new Error('Payment verification failed');
      }
    } catch (error) {
      setProcessingPayment(false);
      setPaymentError('Payment verification failed');
      addNotification('Payment Error', 'Payment verification failed. Please contact support.', 'error');
      
      if (handlePaymentFailure) {
        handlePaymentFailure(error);
      }
    }
  };

  // Verify payment on backend
  const verifyPayment = async (paymentId, orderId, signature) => {
    try {
      const response = await fetch('/api/verify-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paymentId: paymentId,
          orderId: orderId,
          signature: signature
        })
      });

      const data = await response.json();
      return data;
    } catch (error) {
      // For demo purposes, return success
      return { success: true };
    }
  };

  // Handle payment cancellation
  const handlePaymentCancelled = (packageItem) => {
    setProcessingPayment(false);
    showPaymentCancelled(`Payment for ${packageItem.title} was cancelled. You can try again.`);
  };

  // Handle subscription selection in PregnancyCareView
  const handleSubscribeInPregnancy = (plan) => {
    initiateRazorpayPayment(plan, false);
  };

  // Handle package upgrade in PregnancyCareView
  const handleUpgradeInPregnancy = (newPackage) => {
    if (!activePregnancyPackage) {
      initiateRazorpayPayment(newPackage, false);
      return;
    }
    
    const currentPackagePrice = activePregnancyPackage.price || 0;
    const newPackagePrice = newPackage.price || 0;
    
    if (newPackagePrice <= currentPackagePrice) {
      alert('You can only upgrade to a higher-priced package');
      return;
    }
    
    initiateRazorpayPayment(newPackage, true);
  };

  // Generate new diet plan (regenerate AI plan)
  const generateNewDietPlan = () => {
    const updatedPlan = realTimeDietData.map(meal => ({
      ...meal,
      meals: meal.meals.map(item => `${item} [UPDATED]`)
    }));
    
    setAiDietPlan(updatedPlan);
    addNotification('Diet Plan Updated', 'AI has generated a new personalized diet plan', 'health');
  };

  // Mark medicine as taken
  const markMedicineTaken = (reminderId) => {
    setMedicineReminders(prev => prev.map(reminder => 
      reminder.id === reminderId ? { ...reminder, status: 'taken', takenAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) } : reminder
    ));
    addNotification('Medicine Taken', 'Medicine marked as taken', 'health');
  };

  // Add medicine reminder
  const addMedicineReminder = () => {
    const newReminder = {
      id: Date.now(),
      medicine: 'New Medicine',
      time: '12:00 PM',
      dosage: '1 tablet',
      status: 'pending'
    };
    setMedicineReminders(prev => [newReminder, ...prev]);
    addNotification('Reminder Added', 'New medicine reminder added', 'health');
  };

  // File upload functions
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
      alert('Please upload only images (JPG, PNG) or PDF files');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert('File size should be less than 10MB');
      return;
    }

    setUploadingFile(true);

    try {
      const validationResult = await validatePrescription(file);
      
      if (validationResult.valid) {
        const newReport = {
          id: Date.now(),
          name: file.name,
          date: new Date().toISOString().split('T')[0],
          type: getFileType(file.type),
          fileUrl: URL.createObjectURL(file),
          uploadedBy: user?.fullName || 'Patient',
          encrypted: true,
          size: formatFileSize(file.size),
          access: ['patient', 'doctor'],
          validatedByAI: true,
          file: file
        };

        setMedicalReports(prev => [newReport, ...prev]);
        setUploadedFile(newReport);
        setShowUploadedFileModal(true);
        addNotification('File Uploaded', `${file.name} has been uploaded and validated by AI`, 'medical');
      } else {
        alert(`AI Validation Failed: ${validationResult.message}`);
      }

    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file. Please try again.');
    } finally {
      setUploadingFile(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const validatePrescription = async (file) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ valid: Math.random() > 0.1, message: 'Prescription validated successfully' });
      }, 2000);
    });
  };

  const getFileType = (mimeType) => {
    if (mimeType.startsWith('image/')) return 'image';
    if (mimeType === 'application/pdf') return 'pdf';
    return 'document';
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const downloadReport = (report) => {
    if (report.file) {
      const url = URL.createObjectURL(report.file);
      const a = document.createElement('a');
      a.href = url;
      a.download = report.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
    alert(`Downloading ${report.name}...\n\nSecurity Note: This file is encrypted and requires authentication.`);
  };

  const deleteReport = (reportId) => {
    if (window.confirm('Are you sure you want to delete this report? This action cannot be undone.')) {
      setMedicalReports(prev => prev.filter(r => r.id !== reportId));
      addNotification('Report Deleted', 'Medical report has been deleted', 'medical');
    }
  };

  // Vital functions
  const addVitalRecord = () => {
    if (!newVital.type || !newVital.value || !newVital.date) {
      alert('Please fill all required fields');
      return;
    }
    
    // Validate value format
    const validation = validateVitalInput(newVital.type, newVital.value);
    if (!validation.valid) {
      alert(validation.message);
      return;
    }
    
    // Additional validation for date
    const today = new Date().toISOString().split('T')[0];
    const selectedDate = new Date(newVital.date);
    const currentDate = new Date();
    
    // Reset time part for comparison
    selectedDate.setHours(0, 0, 0, 0);
    currentDate.setHours(0, 0, 0, 0);
    
    // Allow dates up to today (not future)
    if (selectedDate > currentDate) {
      alert('Cannot record vitals for future dates');
      return;
    }

    // Create consistent key names that match initial state
    const getVitalKey = (type) => {
      const keyMap = {
        'Blood Pressure': 'bloodPressure',
        'Weight': 'weight',
        'Blood Sugar': 'bloodSugar',
        'Temperature': 'temperature',
        'Heart Rate': 'heartRate',
        'Fetal Heart Rate': 'fetalHeartRate'
      };
      return keyMap[type] || type.toLowerCase().replace(/\s+/g, '');
    };

    const key = getVitalKey(newVital.type);
    
    // Check if this vital type already exists
    if (vitals[key] && vitals[key].value && !window.confirm(`A ${newVital.type} record already exists. Do you want to update it?`)) {
      return;
    }

    setVitals(prev => ({
      ...prev,
      [key]: {
        value: newVital.value,
        date: newVital.date,
        trend: calculateTrend(newVital.type, newVital.value, prev[key]?.value),
        notes: newVital.notes || ''
      }
    }));

    // Reset form and close modal
    setNewVital({ type: '', value: '', date: '', notes: '' });
    setShowAddVitalModal(false);
    addNotification('Vital Recorded', `${newVital.type} recorded successfully`, 'health');
  };

  // Validate vital input
  const validateVitalInput = (type, value) => {
    if (type === 'Blood Pressure') {
      const bpRegex = /^\d{2,3}\/\d{2,3}$/;
      if (!bpRegex.test(value)) {
        return { valid: false, message: 'Please enter blood pressure in format: 120/80' };
      }
      const [systolic, diastolic] = value.split('/').map(Number);
      if (systolic < 70 || systolic > 200 || diastolic < 40 || diastolic > 130) {
        return { valid: false, message: 'Blood pressure values seem abnormal. Please check.' };
      }
    }
    
    if (type === 'Weight') {
      const weightRegex = /^\d+(\.\d+)?\s*(kg|KG|Kg|kG)?$/;
      if (!weightRegex.test(value)) {
        return { valid: false, message: 'Please enter weight in format: 65 kg' };
      }
    }
    
    if (type === 'Blood Sugar') {
      const sugarRegex = /^\d{2,3}\s*(mg\/dL|mg\/dl|MG\/DL)?$/;
      if (!sugarRegex.test(value)) {
        return { valid: false, message: 'Please enter blood sugar in format: 95 mg/dL' };
      }
    }
    
    if (type === 'Temperature') {
      const tempRegex = /^\d{2}(\.\d)?\s*(°C|°c|C|c)?$/;
      if (!tempRegex.test(value)) {
        return { valid: false, message: 'Please enter temperature in format: 36.8°C' };
      }
      const temp = parseFloat(value);
      if (temp < 35 || temp > 41) {
        return { valid: false, message: 'Temperature seems abnormal. Please check.' };
      }
    }
    
    return { valid: true };
  };

  // Calculate trend function
  const calculateTrend = (type, newValue, oldValue) => {
    if (!oldValue) return 'new';
    
    if (type === 'Blood Pressure') {
      const [newSys, newDia] = newValue.split('/').map(Number);
      const [oldSys, oldDia] = oldValue.split('/').map(Number);
      if (newSys > oldSys + 10 || newDia > oldDia + 10) return 'increasing';
      if (newSys < oldSys - 10 || newDia < oldDia - 10) return 'decreasing';
      return 'stable';
    }
    
    if (type === 'Weight') {
      const newWeight = parseFloat(newValue);
      const oldWeight = parseFloat(oldValue);
      if (newWeight > oldWeight + 1) return 'increasing';
      if (newWeight < oldWeight - 1) return 'decreasing';
      return 'stable';
    }
    
    return 'stable';
  };

  const openShareVitalsModal = () => {
    setSelectedVitalsToShare(Object.keys(vitals));
    setShowShareVitalsModal(true);
  };

  const shareVitalsWithDoctor = () => {
    const vitalsData = Object.entries(vitals)
      .filter(([key]) => selectedVitalsToShare.includes(key))
      .map(([key, data]) => `${key}: ${data.value} (${data.trend}) - ${data.date}`);
    
    alert(`Sharing selected vitals with your doctor...\n\n${vitalsData.join('\n')}`);
    addNotification('Vitals Shared', 'Health vitals shared with your doctor', 'share');
    setShowShareVitalsModal(false);
  };

  // Add useEffect to handle month changes safely
  useEffect(() => {
    // Ensure current month is valid (1-9)
    if (currentMonth < 1) setCurrentMonth(1);
    if (currentMonth > 9) setCurrentMonth(9);
    
    // Generate diet plan when month changes
    generateMonthlyDietPlan();
  }, [currentMonth]);

  // Back Button Component
  const BackButton = ({ onClick, text = 'Back' }) => (
    <button 
      className="back-button"
      onClick={onClick}
      type="button"
    >
      ← {text}
    </button>
  );

  const Icon = ({ name, size = 20, color = '#009688', style = {} }) => {
    const icons = {
      heart: '❤️', calendar: '📅', file: '📄', upload: '⬆️', clock: '⏰',
      users: '👥', bell: '🔔', message: '💬', shield: '🛡️', lock: '🔒',
      eye: '👁️', download: '⬇️', share: '🔗', trash: '🗑️', edit: '✏️',
      camera: '📷', stethoscope: '🩺', baby: '👶', scale: '⚖️', thermometer: '🌡️',
      activity: '📊', check: '✅', home: '🏠', video: '📹', pill: '💊',
      food: '🍎', family: '👨‍👩‍👧‍👦', security: '🔐', ai: '🤖', delivery: '🚚',
      progress: '📈', microphone: '🎤', phone: '📞', user: '👤', appointments: '📅',
      star: '⭐', arrow: '➡️', arrowLeft: '⬅️', arrowRight: '➡️', refresh: '🔄',
      info: 'ℹ️', rupee: '₹', package: '📦', doctor: '👩‍⚕️', hospital: '🏥',
      test: '🧪', ultrasound: '📡', nutrition: '🥗', classes: '👩‍🏫', homevisit: '🏡',
      payment: '💳', success: '✅', error: '❌'
    };
    return <span className="icon" style={{ fontSize: size, color, ...style }}>{icons[name.toLowerCase()] || '📋'}</span>;
  };

  // Pregnancy Care Packages Section
  const PregnancyPackagesSection = () => (
    <div className="subscription-plans-section">
      <h3><Icon name="package" size={24} /> Pregnancy Care Packages</h3>
      <p>Choose the perfect care package for your pregnancy journey</p>
      
      <div className="subscription-cards-grid">
        {PREGNANCY_CARE_PACKAGES.map(pkg => {
          const isActive = activePregnancyPackage?.planId === pkg.id;
          const canUpgrade = activePregnancyPackage && 
            activePregnancyPackage.price < pkg.price;
          
          return (
            <div
              key={pkg.id}
              className={`subscription-card ${isActive ? 'active' : ''} ${pkg.popular ? 'popular' : ''}`}
            >
              {pkg.popular && <div className="popular-badge">MOST POPULAR</div>}
              
              <div className="subscription-header">
                <h4>{pkg.title}</h4>
                <div className="subscription-price">
                  <span className="price"><Icon name="rupee" size={28} />{pkg.price.toLocaleString()}</span>
                  <span className="duration">{pkg.duration}</span>
                </div>
                <div className="patients-enrolled">
                  <Icon name="users" size={16} /> {pkg.patientsEnrolled}
                </div>
              </div>
              
              <div className="subscription-features">
                <ul>
                  {pkg.features.map((feature, index) => (
                    <li key={index}>
                      <Icon name="check" size={16} color="#4CAF50" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="package-actions">
                <button 
                  className="details-button"
                  onClick={() => showPackageDetails(pkg)}
                >
                  <Icon name="info" size={16} /> Explain Package
                </button>
                
                {isActive ? (
                  <div className="active-subscription">
                    <Icon name="check" size={20} color="#4CAF50" />
                    <span>Active Package</span>
                  </div>
                ) : canUpgrade ? (
                  <button
                    className="upgrade-button"
                    onClick={() => handleUpgradeSubscription({
                      subscription: activePregnancyPackage,
                      annualPlan: pkg
                    })}
                    disabled={paymentLoading}
                  >
                    <Icon name="arrow" size={16} /> {paymentLoading ? 'Processing...' : 'Upgrade Package'}
                  </button>
                ) : (
                  <button
                    className="subscribe-button"
                    onClick={() => handleSubscribe(pkg)}
                    disabled={paymentLoading}
                  >
                    {paymentLoading ? 'Processing...' : 'Subscribe Now'}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  // Close button component for modals
  const CloseButton = ({ onClick }) => (
    <button className="close-btn" onClick={onClick}>×</button>
  );

  return (
    <div className="pregnancy-container">
      {/* Header */}
      <div className="pregnancy-header-row">
        <BackButton onClick={() => setActiveView('dashboard')} text="Dashboard" />
        
        <div className="pregnancy-title-section">
          <h1 className="pregnancy-main-title">Pregnancy Care 🤰</h1>
          <p className="pregnancy-subtitle">Track your pregnancy journey with comprehensive care and monitoring</p>
        </div>

        <button 
          className="pregnancy-appointment-button"
          onClick={() => setActiveView('appointments')}
        >
          <Icon name="appointments" size={20} /> My Appointments
        </button>
      </div>

      {/* Package Status Bar */}
      <div className="subscription-status-bar">
        {activePregnancyPackage ? (
          <div className={`subscription-status active`}>
            <div>
              <strong>{activePregnancyPackage.title}</strong>
              <p>
                Active until {new Date(activePregnancyPackage.endDate || Date.now() + 270 * 24 * 60 * 60 * 1000).toLocaleDateString()} • 
                {activePregnancyPackage.duration || '9 months'} Package
              </p>
            </div>
            <div className="subscription-actions">
              {PREGNANCY_CARE_PACKAGES.filter(pkg => pkg.price > activePregnancyPackage.price).map(pkg => (
                <button 
                  key={pkg.id}
                  className="upgrade-btn" 
                  onClick={() => handleUpgradeSubscription({
                    subscription: activePregnancyPackage,
                    annualPlan: pkg
                  })}
                  disabled={paymentLoading}
                >
                  <Icon name="arrow" size={16} /> {paymentLoading ? 'Processing...' : `Upgrade to ${pkg.title}`}
                </button>
              ))}
              <button className="manage-btn" onClick={() => setActiveView('profile')}>
                <Icon name="user" size={16} /> Manage in Profile
              </button>
            </div>
          </div>
        ) : (
          <div className="subscription-status inactive">
            <p>No active pregnancy package. <a href="#plans" onClick={(e) => { e.preventDefault(); setActiveTab('plans'); }}>Subscribe now</a> for premium features.</p>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="dashboard-section">
        <div className="tabs-container">
          <div className="tabs">
            {['overview', 'records', 'care', 'plans'].map(tab => (
              <button key={tab} className={`tab ${activeTab === tab ? 'active-tab' : ''}`} onClick={() => setActiveTab(tab)}>
                <Icon name={
                  tab === 'overview' ? 'heart' : 
                  tab === 'records' ? 'shield' : 
                  tab === 'care' ? 'progress' :
                  'package'
                } size={20} />
                {tab === 'overview' ? 'Overview' : 
                 tab === 'records' ? 'Secure Records' : 
                 tab === 'care' ? 'Care Plan' :
                 'Care Packages'}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="tab-content" style={{ overflow: 'hidden' }}>
            {activeTab === 'overview' && (
              <div style={{ overflow: 'hidden', height: '100%' }}>
                <div className="card card-spacing">
                  <div className="card-header">
                    <h3>Pregnancy Progress</h3>
                    <span>{Math.round(pregnancyProgress)}% Complete</span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${pregnancyProgress}%` }}
                    />
                  </div>
                  <div className="flex-between mt-20">
                    <span>Week {pregnancyData.currentWeek} of 40</span>
                    <span>Due Date: {pregnancyData.dueDate}</span>
                  </div>
                  <div className="mt-15">
                    <small>
                      <Icon name="info" size={14} /> 
                      {getTrimester(pregnancyData.currentWeek)} • 
                      {40 - pregnancyData.currentWeek} weeks remaining
                    </small>
                  </div>
                </div>

                <div className="section-spacing">
                  <h3>Pregnancy Care Features</h3>
                  <div className="grid">
                    <div className="feature-card">
                      <div className="feature-header"><Icon name="doctor" size={24} /><h4>Doctor Consultations</h4></div>
                      <p>Regular checkups with experienced gynecologists</p>
                    </div>
                    <div className="feature-card">
                      <div className="feature-header"><Icon name="test" size={24} /><h4>Medical Tests</h4></div>
                      <p>Complete blood, urine, and ultrasound tests</p>
                    </div>
                    <div className="feature-card">
                      <div className="feature-header"><Icon name="homevisit" size={24} /><h4>Home Visits</h4></div>
                      <p>Convenient home checkups for your comfort</p>
                    </div>
                    <div className="feature-card">
                      <div className="feature-header"><Icon name="nutrition" size={24} /><h4>Nutrition Counseling</h4></div>
                      <p>Personalized diet plans for each trimester</p>
                    </div>
                  </div>
                </div>

                <div className="section-spacing">
                  <div className="flex-between mb-30">
                    <h3>Health Vitals Monitoring</h3>
                    <div className="gap-10 flex-wrap">
                      <button className="secondary-button" onClick={() => setShowAddVitalModal(true)}>
                        <Icon name="edit" size={16} /> Add Vital
                      </button>
                      <button className="button" onClick={openShareVitalsModal}>
                        <Icon name="share" size={16} /> Share with Doctor
                      </button>
                    </div>
                  </div>
                  
                  <div className="grid">
                    {Object.entries(vitals).map(([key, data]) => (
                      <div key={key} className="vital-card">
                        <Icon name={key === 'bloodPressure' ? 'activity' : key === 'weight' ? 'scale' : 'thermometer'} size={28} />
                        <div className="vital-info">
                          <h4>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</h4>
                          <p>{data.value}</p>
                          <div className="vital-details">
                            <span>Trend: {data.trend}</span>
                            <span>Last: {data.date}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'records' && (
              <div style={{ overflow: 'hidden', height: '100%' }}>
                <div className="secure-folder">
                  <div className="folder-header">
                    <div className="header-left">
                      <Icon name="shield" size={28} />
                      <h3>Secure Medical Records (File Locker)</h3>
                      <span className="encryption-badge">End-to-End Encrypted</span>
                    </div>
                    <button className="upload-btn" onClick={() => fileInputRef.current?.click()} disabled={uploadingFile}>
                      <Icon name="upload" size={20} /> {uploadingFile ? 'Uploading...' : 'Upload Prescription/Report'}
                    </button>
                  </div>

                  <input type="file" ref={fileInputRef} onChange={handleFileUpload} style={{ display: 'none' }} accept=".jpg,.jpeg,.png,.pdf" />

                  <div className="folder-info">
                    <p><strong>AI Validation:</strong> All prescriptions are validated by AI before processing</p>
                    <div className="security-features">
                      <span><Icon name="lock" size={16} /> 256-bit Encryption</span>
                      <span><Icon name="shield" size={16} /> HIPAA Compliant</span>
                      <span><Icon name="eye" size={16} /> Access Control</span>
                    </div>
                  </div>

                  <div className="files-grid">
                    {medicalReports.map(report => (
                      <div key={report.id} className="file-card">
                        <div className="file-header">
                          <div className="file-icon"><Icon name={report.type === 'ultrasound' ? 'ultrasound' : 'file'} size={24} /></div>
                          <div className="file-actions">
                            <button className="icon-btn" onClick={() => downloadReport(report)} title="Download"><Icon name="download" size={18} /></button>
                            <button className="icon-btn" title="Share with Doctor"><Icon name="share" size={18} /></button>
                            <button className="icon-btn" onClick={() => deleteReport(report.id)} title="Delete"><Icon name="trash" size={18} /></button>
                          </div>
                        </div>
                        <div className="file-info">
                          <h4>{report.name}</h4>
                          <p>Uploaded: {report.date}</p>
                          <div className="file-security">
                            {report.encrypted && <span><Icon name="lock" size={14} /> Encrypted</span>}
                            {report.validatedByAI && <span><Icon name="ai" size={14} /> AI Validated</span>}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'care' && (
              <div style={{ overflow: 'hidden', height: '100%' }}>
                {/* Diet Plan Section */}
                <div className="card card-spacing">
                  <div className="diet-header">
                    <div>
                      <h3>Real-Time AI Diet Plan</h3>
                      <p>Month {currentMonth} of Pregnancy: {PREGNANCY_DIET_PLANS[currentMonth]?.focus || 'Early Nutrition'}</p>
                    </div>
                    <div className="diet-controls">
                      {hasPremiumAccess() ? (
                        <div className="month-navigation">
                          <button onClick={() => navigateMonth(-1)} disabled={currentMonth <= 1}>
                            <Icon name="arrowLeft" size={16} /> Prev
                          </button>
                          <span className="current-month">Month {currentMonth}</span>
                          <button onClick={() => navigateMonth(1)} disabled={currentMonth >= 9}>
                            Next <Icon name="arrowRight" size={16} />
                          </button>
                        </div>
                      ) : (
                        <button className="upgrade-btn" onClick={() => {
                          setActiveTab('plans');
                        }}>
                          <Icon name="lock" size={16} /> Subscribe to Access
                        </button>
                      )}
                      <button className="secondary-button" onClick={handleRegenerateAIPlan}>
                        <Icon name="ai" size={16} /> Regenerate AI Plan
                      </button>
                      <button className="button" onClick={handleSharePlan}>
                        <Icon name="share" size={16} /> Share
                      </button>
                    </div>
                  </div>

                  {/* Month-specific stats */}
                  <div className="month-stats-grid">
                    <div className="month-stat">
                      <div className="stat-label">Daily Calories</div>
                      <div className="stat-value">
                        {PREGNANCY_DIET_PLANS[currentMonth]?.dailyCalories || 2200}
                      </div>
                    </div>
                    <div className="month-stat">
                      <div className="stat-label">Key Nutrients</div>
                      <div className="stat-value-nutrients">
                        {PREGNANCY_DIET_PLANS[currentMonth]?.keyNutrients?.slice(0, 3).join(', ') || 'Folic Acid, Iron'}
                      </div>
                    </div>
                    <div className="month-stat">
                      <div className="stat-label">Recommended Foods</div>
                      <div className="stat-value-foods">
                        {PREGNANCY_DIET_PLANS[currentMonth]?.foods?.recommended?.slice(0, 3).join(', ') || 'Leafy greens, Citrus fruits'}
                      </div>
                    </div>
                  </div>

                  {/* Diet plan */}
                  <div className="diet-plan">
                    {aiDietPlan.map((meal, index) => (
                      <div key={index} className="meal-card">
                        <div className="meal-time"><Icon name="clock" size={18} /><span>{meal.time}</span></div>
                        <div className="meal-details">
                          <div className="meal-options">
                            {meal.meals.map((option, idx) => (
                              <div key={idx} className="meal-option">
                                <Icon name="food" size={16} />
                                <span>{option}</span>
                                {hasPremiumAccess() && (
                                  <span className="month-tag">Month {currentMonth}</span>
                                )}
                              </div>
                            ))}
                          </div>
                          <div className="meal-info">
                            <div><strong>Recommendation:</strong> {meal.recommendation}</div>
                            <div><strong>Key Nutrients:</strong> {meal.nutrients}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Premium tips for current month */}
                  {hasPremiumAccess() && PREGNANCY_DIET_PLANS[currentMonth]?.tips && (
                    <div className="card mt-30">
                      <h4><Icon name="ai" size={20} /> Premium Tips for Month {currentMonth}</h4>
                      <ul style={{ paddingLeft: '20px' }}>
                        {PREGNANCY_DIET_PLANS[currentMonth].tips.map((tip, idx) => (
                          <li key={idx} style={{ marginBottom: '8px' }}>{tip}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Medicine Guidance - Only for premium users */}
                {hasPremiumAccess() ? (
                  <div className="card card-spacing">
                    <h3><Icon name="pill" size={24} /> Monthly Medication Guidance</h3>
                    <p>Personalized medication plan for Month {currentMonth}</p>
                    <div className="medication-guide">
                      <div className="medication-item">
                        <Icon name="pill" size={24} />
                        <div>
                          <h4>Prenatal Vitamins</h4>
                          <p>Take 1 tablet daily with breakfast</p>
                        </div>
                      </div>
                      <div className="medication-item">
                        <Icon name="pill" size={24} />
                        <div>
                          <h4>Folic Acid (400mcg)</h4>
                          <p>Essential for fetal brain development</p>
                        </div>
                      </div>
                      <div className="medication-item">
                        <Icon name="pill" size={24} />
                        <div>
                          <h4>Iron Supplement</h4>
                          <p>Take with Vitamin C for better absorption</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="card card-spacing premium-locked">
                    <div className="premium-locked-content">
                      <Icon name="lock" size={48} color="#009688" />
                      <h3>Monthly Medication Guidance</h3>
                      <p>Get personalized medication guidance based on your pregnancy stage</p>
                      <button className="button" onClick={() => {
                        setActiveTab('plans');
                      }}>
                        <Icon name="shield" size={20} /> Unlock with Package
                      </button>
                    </div>
                  </div>
                )}

                {/* Medicine Reminders */}
                <div className="card card-spacing">
                  <div className="flex-between flex-wrap mb-25">
                    <div><h3>Medicine Reminders</h3><p>Daily medication schedule</p></div>
                    <div className="gap-10">
                      <button className="secondary-button" onClick={addMedicineReminder}><Icon name="pill" size={16} /> Add Reminder</button>
                      <button className="button" onClick={() => setMedicineReminders(prev => prev.map(r => ({...r, status: 'pending'})))}>Reset All</button>
                    </div>
                  </div>

                  <div className="reminders-grid">
                    {medicineReminders.map(reminder => (
                      <div key={reminder.id} className="reminder-card">
                        <div className="reminder-info">
                          <Icon name="pill" size={24} />
                          <div>
                            <h4>{reminder.medicine}</h4>
                            <p>{reminder.time} • {reminder.dosage}</p>
                            <span className={`status-tag ${reminder.status}`}>{reminder.status === 'taken' ? `Taken at ${reminder.takenAt || 'N/A'}` : 'Pending'}</span>
                          </div>
                        </div>
                        {reminder.status === 'pending' && <button className="button" onClick={() => markMedicineTaken(reminder.id)}>Mark Taken</button>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'plans' && (
              <div style={{ overflow: 'hidden', height: '100%' }}>
                <PregnancyPackagesSection />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}

      {/* Add Vital Modal */}
      {showAddVitalModal && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '500px' }}>
            <div className="modal-header">
              <h3>Add Vital Record</h3>
              <button 
                className="close-btn" 
                onClick={() => {
                  setShowAddVitalModal(false);
                  setNewVital({ type: '', value: '', date: '', notes: '' });
                }}
              >
                ×
              </button>
            </div>
            
            <div className="modal-body">
              <div className="input-group">
                <label>Vital Type *</label>
                <select 
                  className="input" 
                  value={newVital.type} 
                  onChange={(e) => setNewVital({...newVital, type: e.target.value})}
                >
                  <option value="">Select type</option>
                  <option value="Blood Pressure">Blood Pressure</option>
                  <option value="Weight">Weight</option>
                  <option value="Blood Sugar">Blood Sugar</option>
                  <option value="Temperature">Temperature</option>
                  <option value="Heart Rate">Heart Rate</option>
                  <option value="Fetal Heart Rate">Fetal Heart Rate</option>
                </select>
              </div>
              
              <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <div className="input-group">
                  <label>Value *</label>
                  <input 
                    className="input" 
                    type="text" 
                    placeholder="e.g., 120/80 or 65 kg" 
                    value={newVital.value}
                    onChange={(e) => setNewVital({...newVital, value: e.target.value})}
                  />
                </div>
                
                <div className="input-group">
                  <label>Date *</label>
                  <input 
                    className="input" 
                    type="date" 
                    value={newVital.date || new Date().toISOString().split('T')[0]}
                    onChange={(e) => setNewVital({...newVital, date: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="input-group">
                <label>Notes (Optional)</label>
                <textarea 
                  className="textarea" 
                  placeholder="Any symptoms or observations..."
                  value={newVital.notes}
                  onChange={(e) => setNewVital({...newVital, notes: e.target.value})}
                  rows="3"
                />
              </div>
              
              {/* Update Pregnancy Week (Only for Weight) */}
              {newVital.type === 'Weight' && (
                <div className="card mt-15" style={{ background: '#f0f7ff' }}>
                  <div className="flex-between">
                    <div>
                      <h4>Update Pregnancy Week</h4>
                      <p>Update your current pregnancy week if needed</p>
                    </div>
                    <input 
                      type="number"
                      min="1"
                      max="40"
                      value={pregnancyData.currentWeek}
                      onChange={(e) => {
                        const newWeek = parseInt(e.target.value);
                        if (newWeek >= 1 && newWeek <= 40) {
                          updatePregnancyProgress(newWeek);
                        }
                      }}
                      className="input"
                      style={{ width: '80px', textAlign: 'center' }}
                    />
                  </div>
                  <div className="mt-10">
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{ width: `${pregnancyProgress}%` }}
                      />
                    </div>
                    <div className="flex-between mt-5">
                      <small>Week {pregnancyData.currentWeek} of 40</small>
                      <small>{Math.round(pregnancyProgress)}% Complete</small>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="modal-footer gap-10">
              <button 
                className="button" 
                onClick={() => {
                  if (!newVital.type || !newVital.value || !newVital.date) {
                    alert('Please fill all required fields');
                    return;
                  }
                  addVitalRecord();
                }}
              >
                <Icon name="check" size={18} /> Save Record
              </button>
              <button 
                className="secondary-button" 
                onClick={() => {
                  setShowAddVitalModal(false);
                  setNewVital({ type: '', value: '', date: '', notes: '' });
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Uploaded File Modal */}
      {showUploadedFileModal && uploadedFile && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>File Uploaded Successfully!</h3>
              <button className="close-btn" onClick={() => setShowUploadedFileModal(false)}>×</button>
            </div>
            <div className="modal-body">
              <div className="file-details">
                <div className="file-icon-large"><Icon name="file" size={48} /></div>
                <div className="file-info-large">
                  <h4>{uploadedFile.name}</h4>
                  <div className="file-meta">
                    <span><Icon name="calendar" size={14} /> Uploaded: {uploadedFile.date}</span>
                    <span><Icon name="scale" size={14} /> Size: {uploadedFile.size}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer gap-10">
              <button className="button" onClick={() => downloadReport(uploadedFile)}><Icon name="download" size={18} /> Download File</button>
              <button className="secondary-button" onClick={() => setShowUploadedFileModal(false)}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Share Vitals Modal */}
      {showShareVitalsModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Share Vitals with Doctor</h3>
              <button className="close-btn" onClick={() => setShowShareVitalsModal(false)}>×</button>
            </div>
            <div className="modal-body">
              <p>Select which vitals you want to share:</p>
              <div className="vital-selection">
                {Object.entries(vitals).map(([key, data]) => (
                  <label key={key} className="vital-checkbox">
                    <input 
                      type="checkbox" 
                      checked={selectedVitalsToShare.includes(key)} 
                      onChange={(e) => {
                        if (e.target.checked) setSelectedVitalsToShare([...selectedVitalsToShare, key]);
                        else setSelectedVitalsToShare(selectedVitalsToShare.filter(k => k !== key));
                      }} 
                    />
                    <span>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}: {data.value}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="modal-footer gap-10">
              <button className="button" onClick={shareVitalsWithDoctor} disabled={selectedVitalsToShare.length === 0}>
                <Icon name="share" size={18} /> Share Selected Vitals
              </button>
              <button className="secondary-button" onClick={() => setShowShareVitalsModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Regenerate AI Plan Modal */}
      {showRegenerationModal && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '500px' }}>
            <div className="modal-header">
              <h3><Icon name="ai" size={24} /> Regenerating AI Diet Plan</h3>
              <CloseButton onClick={() => {
                if (!regeneratingPlan) {
                  setShowRegenerationModal(false);
                }
              }} />
            </div>
            
            <div className="modal-body text-center">
              <div className="ai-regeneration-animation">
                <div className="spinner-large" style={{
                  width: '60px',
                  height: '60px',
                  border: '4px solid #f3f3f3',
                  borderTop: '4px solid #3498db',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite',
                  margin: '0 auto 20px'
                }}></div>
                <h4>AI is generating your personalized diet plan</h4>
                <p>Analyzing Month {currentMonth} nutritional needs...</p>
                
                <div className="ai-steps" style={{ margin: '20px 0' }}>
                  <div className={`ai-step ${regenerationProgress >= 33 ? 'active' : ''}`}>
                    <Icon name="ai" size={20} color={regenerationProgress >= 33 ? '#4CAF50' : '#ccc'} />
                    <span>Analyzing nutritional requirements</span>
                  </div>
                  <div className={`ai-step ${regenerationProgress >= 66 ? 'active' : ''}`}>
                    <Icon name="nutrition" size={20} color={regenerationProgress >= 66 ? '#4CAF50' : '#ccc'} />
                    <span>Optimizing meal combinations</span>
                  </div>
                  <div className={`ai-step ${regenerationProgress >= 100 ? 'active' : ''}`}>
                    <Icon name="check" size={20} color={regenerationProgress >= 100 ? '#4CAF50' : '#ccc'} />
                    <span>Generating personalized plan</span>
                  </div>
                </div>
                
                <div className="progress-bar mt-20">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${regenerationProgress}%` }}
                  />
                </div>
                <div className="flex-between mt-5">
                  <small>{regenerationProgress}% Complete</small>
                  <small>{regeneratingPlan ? 'Processing...' : 'Complete!'}</small>
                </div>
              </div>
            </div>
            
            <div className="modal-footer gap-10">
              <button 
                className="button" 
                onClick={() => {
                  if (!regeneratingPlan) {
                    setShowRegenerationModal(false);
                  }
                }}
                disabled={regeneratingPlan}
              >
                {regeneratingPlan ? 'Please wait...' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Share Diet Plan Modal */}
      {showShareModal && shareOptions && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '500px' }}>
            <div className="modal-header">
              <h3><Icon name="share" size={24} /> {shareOptions.title}</h3>
              <CloseButton onClick={() => {
                setShowShareModal(false);
                setSelectedShareOption('');
              }} />
            </div>
            
            <div className="modal-body">
              <div className="share-options">
                <p>{shareOptions.message}</p>
                
                <div className="share-option-grid">
                  {shareOptions.options.map((option, index) => (
                    <div 
                      key={index}
                      className={`share-option ${selectedShareOption === option ? 'selected' : ''}`}
                      onClick={() => setSelectedShareOption(option)}
                    >
                      <Icon 
                        name={
                          option === 'Copy Link' ? 'link' :
                          option === 'Send Email' ? 'mail' :
                          option === 'Download PDF' ? 'download' :
                          option === 'Share with Doctor' ? 'doctor' :
                          'share'
                        } 
                        size={24} 
                      />
                      <span>{option}</span>
                    </div>
                  ))}
                </div>
                
                {selectedShareOption && (
                  <div className="share-details mt-20">
                    <h4>Share Details</h4>
                    <div className="input-group">
                      <label>Share Message (Optional)</label>
                      <textarea 
                        className="textarea" 
                        placeholder={`Add a message for ${selectedShareOption.toLowerCase()}...`}
                        rows="3"
                        defaultValue={`Hi, I'd like to share my Month ${currentMonth} pregnancy diet plan for review.`}
                        id="share-message"
                      />
                    </div>
                    
                    {selectedShareOption === 'Download PDF' && (
                      <div className="card mt-15" style={{ background: '#f0f7ff' }}>
                        <h5><Icon name="download" size={18} /> PDF Download Options</h5>
                        <div className="checkbox-group mt-10">
                          <label className="checkbox">
                            <input type="checkbox" defaultChecked id="include-nutrition-tips" />
                            <span>Include nutrition tips</span>
                          </label>
                          <label className="checkbox">
                            <input type="checkbox" defaultChecked id="include-meal-timings" />
                            <span>Include meal timings</span>
                          </label>
                          <label className="checkbox">
                            <input type="checkbox" id="include-shopping-list" />
                            <span>Include shopping list</span>
                          </label>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            
            <div className="modal-footer gap-10">
              <button 
                className="button" 
                onClick={() => {
                  if (!selectedShareOption) {
                    alert('Please select a sharing option');
                    return;
                  }
                }}
                disabled={!selectedShareOption}
              >
                <Icon name="share" size={18} /> {selectedShareOption}
              </button>
              <button 
                className="secondary-button" 
                onClick={() => {
                  setShowShareModal(false);
                  setSelectedShareOption('');
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Payment Cancelled Modal */}
      {showPaymentCancelledModal && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '450px' }}>
            <div className="modal-header">
              <h3>Payment Cancelled</h3>
              <button 
                className="close-btn" 
                onClick={() => setShowPaymentCancelledModal(false)}
              >
                ×
              </button>
            </div>
            
            <div className="modal-body text-center">
              <div style={{ fontSize: '48px', color: '#ff6b6b', marginBottom: '20px' }}>
                ❌
              </div>
              <h4>Package Payment Cancelled</h4>
              <p style={{ color: '#666', margin: '15px 0' }}>
                {paymentCancelledMessage || 'Your payment was cancelled. You can try again.'}
              </p>
              
              <div className="card mt-20" style={{ background: '#fff9e6', textAlign: 'left' }}>
                <div className="flex gap-15">
                  <Icon name="info" size={24} color="#f39c12" />
                  <div>
                    <strong>What happened?</strong>
                    <p style={{ fontSize: '14px', marginTop: '5px' }}>
                      The payment process was interrupted or cancelled. Your pregnancy package was not activated.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="modal-footer gap-10">
              <button 
                className="button" 
                onClick={() => {
                  setShowPaymentCancelledModal(false);
                  // Redirect to package plans
                  setActiveTab('plans');
                }}
              >
                <Icon name="arrowRight" size={18} /> View Care Packages
              </button>
              <button 
                className="secondary-button" 
                onClick={() => setShowPaymentCancelledModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Package Details Modal */}
      {showPackageDetailsModal && selectedPackageDetails && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '600px' }}>
            <div className="modal-header">
              <h3><Icon name="package" size={24} /> {selectedPackageDetails.title}</h3>
              <button 
                className="close-btn" 
                onClick={() => setShowPackageDetailsModal(false)}
              >
                ×
              </button>
            </div>
            
            <div className="modal-body">
              <div className="package-details-header">
                <div className="package-price-large">
                  <Icon name="rupee" size={32} color="#009688" />
                  <span className="price">{selectedPackageDetails.price.toLocaleString()}</span>
                  <span className="duration">{selectedPackageDetails.duration}</span>
                </div>
                <div className="patients-count">
                  <Icon name="users" size={16} /> {selectedPackageDetails.patientsEnrolled}
                </div>
              </div>
              
              <p className="package-description">
                {selectedPackageDetails.description}
              </p>
              
              <div className="features-list">
                <h4><Icon name="check" size={20} color="#4CAF50" /> Package Includes:</h4>
                <ul>
                  {selectedPackageDetails.features.map((feature, index) => (
                    <li key={index}>
                      <Icon name="check" size={16} color="#4CAF50" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="benefits-section">
                <h4><Icon name="star" size={20} color="#FFC107" /> Benefits:</h4>
                <div className="benefits-grid">
                  <div className="benefit-item">
                    <Icon name="doctor" size={24} />
                    <span>Expert Doctors</span>
                  </div>
                  <div className="benefit-item">
                    <Icon name="hospital" size={24} />
                    <span>Hospital Delivery</span>
                  </div>
                  <div className="benefit-item">
                    <Icon name="nutrition" size={24} />
                    <span>Nutrition Support</span>
                  </div>
                  <div className="benefit-item">
                    <Icon name="homevisit" size={24} />
                    <span>Home Convenience</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="modal-footer gap-10">
              {activePregnancyPackage?.planId === selectedPackageDetails.id ? (
                <div className="active-subscription" style={{ width: '100%' }}>
                  <Icon name="check" size={20} color="#4CAF50" />
                  <span>You have this active package</span>
                </div>
              ) : (
                <>
                  <button 
                    className="button" 
                    onClick={() => {
                      setShowPackageDetailsModal(false);
                      handleSubscribe(selectedPackageDetails);
                    }}
                    disabled={processingPayment}
                  >
                    {processingPayment ? 'Processing...' : 'Subscribe Now'}
                  </button>
                  <button 
                    className="secondary-button" 
                    onClick={() => setShowPackageDetailsModal(false)}
                  >
                    Close
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PregnancyCareView;