
// VendorData.js - Main data file for Vendor Portal

export const user = {
  fullName: 'Rajesh Kumar',
  email: 'rajesh.pharmacy@gmail.com',
  phone: '9876543210',
  pharmacyName: 'City Medical Store',
  licenseNumber: 'PHARM-UP-2024-789',
  gstNumber: '07AABCU9603R1ZM',
  address: 'Shop No. 15, Medical Complex, Sector 15',
  city: 'Noida',
  state: 'Uttar Pradesh',
  pincode: '201301',
  openingTime: '08:00 AM',
  closingTime: '10:00 PM'
};

// Delivery Agents Data
export const deliveryAgents = [
  {
    id: 1,
    name: 'Rahul Singh',
    phone: '+919876543210',
    vehicle: 'Motorcycle - Honda Activa',
    rating: 4.8,
    active: true
  },
  {
    id: 2,
    name: 'Suresh Kumar',
    phone: '+919876543211',
    vehicle: 'Scooter - TVS Jupiter',
    rating: 4.5,
    active: true
  },
  {
    id: 3,
    name: 'Amit Sharma',
    phone: '+919876543212',
    vehicle: 'Bike - Bajaj Pulsar',
    rating: 4.9,
    active: false
  },
  {
    id: 4,
    name: 'Vikram Patel',
    phone: '+919876543213',
    vehicle: 'Car - Maruti Suzuki',
    rating: 4.7,
    active: true
  },
  {
    id: 5,
    name: 'Rajesh Gupta',
    phone: '+919876543214',
    vehicle: 'Motorcycle - Hero Splendor',
    rating: 4.6,
    active: true
  }
];

export const initialData = {
  stock: [
    // ================= PREGNANCY CARE =================
    {
      id: 'PC-001',
      name: 'Folic Acid 5mg Tablets',
      category: 'Pregnancy Care',
      batchNo: 'FA-2024-001',
      quantity: 8,
      minStock: 10,
      price: 65,
      expiryDate: '2025-12-15',
      prescriptionRequired: false,
      supplier: 'PharmaCorp',
      description: 'Essential for preventing neural tube defects'
    },
    {
      id: 'PC-002',
      name: 'Iron Supplement',
      category: 'Pregnancy Care',
      batchNo: 'IRN-2024-002',
      quantity: 12,
      minStock: 15,
      price: 1250,
      expiryDate: '2025-12-15',
      prescriptionRequired: true,
      supplier: 'HealthPlus',
      description: 'For anemia during pregnancy'
    },
    {
      id: 'PC-003',
      name: 'Prenatal Multivitamin',
      category: 'Pregnancy Care',
      batchNo: 'PMV-2024-003',
      quantity: 28,
      minStock: 20,
      price: 380,
      expiryDate: '2024-12-15',
      prescriptionRequired: false,
      supplier: 'Maternity Pharma',
      description: 'Complete prenatal nutrition'
    },
    {
      id: 'PC-004',
      name: 'Calcium + Vitamin D3',
      category: 'Pregnancy Care',
      batchNo: 'CAL-2024-004',
      quantity: 45,
      minStock: 20,
      price: 220,
      expiryDate: '2025-12-15',
      prescriptionRequired: false,
      supplier: 'HealthPlus',
      description: 'Bone health supplement'
    },
    {
      id: 'PC-005',
      name: 'Progesterone Gel',
      category: 'Pregnancy Care',
      batchNo: 'PRO-2024-005',
      quantity: 15,
      minStock: 10,
      price: 1850,
      expiryDate: '2024-12-15',
      prescriptionRequired: true,
      supplier: 'FertiCare',
      description: 'Hormone support for pregnancy'
    },

    // ================= BABY & CHILD CARE (MEDICINES) =================
    {
      id: 'BC-001',
      name: 'Infant Paracetamol Drops',
      category: 'Baby & Child Care',
      batchNo: 'IPD-2024-001',
      quantity: 5,
      minStock: 15,
      price: 95,
      expiryDate: '2025-12-15',
      prescriptionRequired: true,
      supplier: 'Pediatric Pharma',
      description: 'Fever reducer for infants'
    },
    {
      id: 'BC-002',
      name: 'Diaper Rash Cream',
      category: 'Baby & Child Care',
      batchNo: 'DRC-2024-002',
      quantity: 25,
      minStock: 20,
      price: 150,
      expiryDate: '2025-12-15',
      prescriptionRequired: false,
      supplier: 'BabyCare Inc',
      description: 'For diaper rash prevention'
    },
    {
      id: 'BC-003',
      name: 'Baby Nasal Drops',
      category: 'Baby & Child Care',
      batchNo: 'BND-2024-003',
      quantity: 38,
      minStock: 25,
      price: 85,
      expiryDate: '2025-12-15',
      prescriptionRequired: false,
      supplier: 'Pediatric Pharma',
      description: 'Nasal congestion relief'
    },
    {
      id: 'BC-004',
      name: 'Teething Gel',
      category: 'Baby & Child Care',
      batchNo: 'TG-2024-004',
      quantity: 8,
      minStock: 15,
      price: 110,
      expiryDate: '2025-12-15',
      prescriptionRequired: false,
      supplier: 'BabyCare Inc',
      description: 'Pain relief for teething'
    },

    // ================= BABY & CHILD CARE (EQUIPMENT) =================
    {
      id: 'BCE-001',
      name: 'Baby Digital Thermometer',
      category: 'Baby & Child Care',
      batchNo: 'BDT-2024-001',
      quantity: 8,
      minStock: 10,
      price: 550,
      expiryDate: 'N/A',
      prescriptionRequired: false,
      supplier: 'BabyCare Equipment',
      description: 'Digital thermometer for babies'
    },
    {
      id: 'BCE-002',
      name: 'Baby Nebulizer Machine',
      category: 'Baby & Child Care',
      batchNo: 'BNM-2024-002',
      quantity: 3,
      minStock: 5,
      price: 4200,
      expiryDate: 'N/A',
      prescriptionRequired: true,
      supplier: 'MedEquip Solutions',
      description: 'For asthma treatment in children'
    },
    {
      id: 'BCE-003',
      name: 'Baby Food Warmer',
      category: 'Baby & Child Care',
      batchNo: 'BFW-2024-003',
      quantity: 12,
      minStock: 15,
      price: 850,
      expiryDate: 'N/A',
      prescriptionRequired: false,
      supplier: 'BabyCare Equipment',
      description: 'Electric baby food warmer'
    },
    {
      id: 'BCE-004',
      name: 'Baby Weighing Scale',
      category: 'Baby & Child Care',
      batchNo: 'BWS-2024-004',
      quantity: 6,
      minStock: 8,
      price: 1250,
      expiryDate: 'N/A',
      prescriptionRequired: false,
      supplier: 'BabyCare Equipment',
      description: 'Digital baby weighing scale'
    },
    {
      id: 'BCE-005',
      name: 'Baby Nasal Aspirator',
      category: 'Baby & Child Care',
      batchNo: 'BNA-2024-005',
      quantity: 18,
      minStock: 20,
      price: 180,
      expiryDate: 'N/A',
      prescriptionRequired: false,
      supplier: 'BabyCare Equipment',
      description: 'Manual nasal aspirator for babies'
    },

    // ================= MEDICAL EQUIPMENT =================
    {
      id: 'ME-001',
      name: 'Blood Pressure Monitor',
      category: 'Medical Equipment',
      batchNo: 'BPM-2024-001',
      quantity: 8,
      minStock: 10,
      price: 2250,
      expiryDate: 'N/A',
      prescriptionRequired: false,
      supplier: 'MedEquip Solutions',
      description: 'Digital BP monitor'
    },
    {
      id: 'ME-002',
      name: 'Glucometer Kit',
      category: 'Medical Equipment',
      batchNo: 'GLU-2024-002',
      quantity: 6,
      minStock: 10,
      price: 1250,
      expiryDate: '2025-06-30',
      prescriptionRequired: false,
      supplier: 'MedEquip Solutions',
      description: 'Blood glucose monitor with strips'
    },
    {
      id: 'ME-003',
      name: 'Digital Thermometer',
      category: 'Medical Equipment',
      batchNo: 'DT-2024-003',
      quantity: 15,
      minStock: 20,
      price: 550,
      expiryDate: 'N/A',
      prescriptionRequired: false,
      supplier: 'MedEquip Solutions',
      description: 'Infrared digital thermometer'
    },
    {
      id: 'ME-004',
      name: 'Nebulizer Machine',
      category: 'Medical Equipment',
      batchNo: 'NEB-2024-004',
      quantity: 5,
      minStock: 8,
      price: 3800,
      expiryDate: 'N/A',
      prescriptionRequired: true,
      supplier: 'MedEquip Solutions',
      description: 'For asthma treatment'
    },
    {
      id: 'ME-005',
      name: 'Oxygen Concentrator',
      category: 'Medical Equipment',
      batchNo: 'OXC-2024-005',
      quantity: 2,
      minStock: 3,
      price: 52000,
      expiryDate: 'N/A',
      prescriptionRequired: true,
      supplier: 'MedEquip Solutions',
      description: '5L oxygen therapy device'
    },

    // ================= VITAMINS & SUPPLEMENTS =================
    {
      id: 'VIT-001',
      name: 'Vitamin C 1000mg Tablets',
      category: 'Vitamins & Supplements',
      batchNo: 'VC-2024-001',
      quantity: 65,
      minStock: 50,
      price: 150,
      expiryDate: '2025-06-15',
      prescriptionRequired: false,
      supplier: 'HealthPlus',
      description: 'Immune support vitamin C'
    },
    {
      id: 'VIT-002',
      name: 'Vitamin D3 60K IU',
      category: 'Vitamins & Supplements',
      batchNo: 'VD3-2024-002',
      quantity: 42,
      minStock: 30,
      price: 120,
      expiryDate: '2025-03-20',
      prescriptionRequired: false,
      supplier: 'HealthPlus',
      description: 'Bone health vitamin D'
    },
    {
      id: 'VIT-003',
      name: 'Multivitamin Capsules',
      category: 'Vitamins & Supplements',
      batchNo: 'MV-2024-003',
      quantity: 38,
      minStock: 25,
      price: 280,
      expiryDate: '2025-08-10',
      prescriptionRequired: false,
      supplier: 'HealthPlus',
      description: 'Complete multivitamin supplement'
    },

    // ================= PAIN RELIEF =================
    {
      id: 'PAIN-001',
      name: 'Paracetamol 500mg',
      category: 'Pain Relief',
      batchNo: 'PAR-2024-001',
      quantity: 120,
      minStock: 100,
      price: 15,
      expiryDate: '2025-09-30',
      prescriptionRequired: false,
      supplier: 'PharmaCorp',
      description: 'Pain and fever relief'
    },
    {
      id: 'PAIN-002',
      name: 'Ibuprofen 400mg',
      category: 'Pain Relief',
      batchNo: 'IBU-2024-002',
      quantity: 85,
      minStock: 50,
      price: 45,
      expiryDate: '2025-07-15',
      prescriptionRequired: false,
      supplier: 'PharmaCorp',
      description: 'Anti-inflammatory pain relief'
    },
    {
      id: 'PAIN-003',
      name: 'Diclofenac Gel',
      category: 'Pain Relief',
      batchNo: 'DIC-2024-003',
      quantity: 28,
      minStock: 20,
      price: 95,
      expiryDate: '2025-05-20',
      prescriptionRequired: false,
      supplier: 'PharmaCorp',
      description: 'Topical pain relief gel'
    },

    // ================= ANTIBIOTICS =================
    {
      id: 'ANT-001',
      name: 'Amoxicillin 500mg',
      category: 'Antibiotics',
      batchNo: 'AMX-2024-001',
      quantity: 85,
      minStock: 50,
      price: 95,
      expiryDate: '2025-08-15',
      prescriptionRequired: true,
      supplier: 'PharmaCorp',
      description: 'Broad spectrum antibiotic'
    },
    {
      id: 'ANT-002',
      name: 'Azithromycin 500mg',
      category: 'Antibiotics',
      batchNo: 'AZI-2024-002',
      quantity: 42,
      minStock: 30,
      price: 120,
      expiryDate: '2025-06-30',
      prescriptionRequired: true,
      supplier: 'PharmaCorp',
      description: 'Macrolide antibiotic'
    },
    {
      id: 'ANT-003',
      name: 'Ciprofloxacin 500mg',
      category: 'Antibiotics',
      batchNo: 'CIP-2024-003',
      quantity: 38,
      minStock: 25,
      price: 85,
      expiryDate: '2025-04-15',
      prescriptionRequired: true,
      supplier: 'PharmaCorp',
      description: 'Fluoroquinolone antibiotic'
    },

    // ================= CHRONIC CARE =================
    {
      id: 'CHR-001',
      name: 'Metformin 500mg',
      category: 'Chronic Care',
      batchNo: 'MET-2024-001',
      quantity: 150,
      minStock: 100,
      price: 55,
      expiryDate: '2025-10-30',
      prescriptionRequired: true,
      supplier: 'HealthPlus',
      description: 'Diabetes medication'
    },
    {
      id: 'CHR-002',
      name: 'Amlodipine 5mg',
      category: 'Chronic Care',
      batchNo: 'AML-2024-002',
      quantity: 95,
      minStock: 60,
      price: 35,
      expiryDate: '2025-09-15',
      prescriptionRequired: true,
      supplier: 'HealthPlus',
      description: 'Blood pressure medication'
    },
    {
      id: 'CHR-003',
      name: 'Atorvastatin 10mg',
      category: 'Chronic Care',
      batchNo: 'ATO-2024-003',
      quantity: 110,
      minStock: 75,
      price: 65,
      expiryDate: '2025-11-20',
      prescriptionRequired: true,
      supplier: 'HealthPlus',
      description: 'Cholesterol medication'
    },

    // ================= FIRST AID =================
    {
      id: 'FA-001',
      name: 'First Aid Kit (Family)',
      category: 'First Aid',
      batchNo: 'FAK-2024-001',
      quantity: 18,
      minStock: 15,
      price: 550,
      expiryDate: '2025-12-31',
      prescriptionRequired: false,
      supplier: 'FirstAid Corp',
      description: 'Complete family first aid kit'
    },
    {
      id: 'FA-002',
      name: 'Bandages (Assorted)',
      category: 'First Aid',
      batchNo: 'BAN-2024-002',
      quantity: 45,
      minStock: 30,
      price: 85,
      expiryDate: '2025-08-15',
      prescriptionRequired: false,
      supplier: 'FirstAid Corp',
      description: 'Assorted bandage pack'
    },
    {
      id: 'FA-003',
      name: 'Antiseptic Solution',
      category: 'First Aid',
      batchNo: 'ANT-2024-003',
      quantity: 32,
      minStock: 25,
      price: 65,
      expiryDate: '2025-07-30',
      prescriptionRequired: false,
      supplier: 'FirstAid Corp',
      description: 'Wound antiseptic solution'
    },
    {
      id: 'FA-004',
      name: 'Burn Cream',
      category: 'First Aid',
      batchNo: 'BUR-2024-004',
      quantity: 25,
      minStock: 20,
      price: 95,
      expiryDate: '2025-06-15',
      prescriptionRequired: false,
      supplier: 'FirstAid Corp',
      description: 'Burn relief cream'
    }
  ],
  orders: {
    pending: [
      {
        id: 'ORD-001',
        customerName: 'Rajesh Kumar',
        customerPhone: '+91 98765 43210',
        items: [
          { name: 'Paracetamol 500mg', quantity: 2, price: 15 },
          { name: 'Vitamin C 1000mg', quantity: 1, price: 120 }
        ],
        total: 150,
        orderTime: '2024-01-15 10:30',
        deliveryType: 'home',
        address: 'H-12, Sector 15, Noida',
        prescriptionRequired: false
      },
      {
        id: 'ORD-002',
        customerName: 'Priya Sharma',
        customerPhone: '+91 98765 43211',
        items: [
          { name: 'Amoxicillin 500mg', quantity: 1, price: 85 }
        ],
        total: 85,
        orderTime: '2024-01-15 11:15',
        deliveryType: 'pickup',
        address: 'Store Pickup',
        prescriptionRequired: true
      },
      {
        id: 'ORD-003',
        customerName: 'Amit Verma',
        customerPhone: '+91 98765 43212',
        items: [
          { name: 'Baby Digital Thermometer', quantity: 1, price: 550 },
          { name: 'Infant Paracetamol Drops', quantity: 1, price: 95 }
        ],
        total: 645,
        orderTime: '2024-01-15 09:45',
        deliveryType: 'home',
        address: 'B-5, Sector 62, Noida',
        prescriptionRequired: false
      }
    ],
    ready: [
      {
        id: 'ORD-004',
        customerName: 'Sunita Reddy',
        customerPhone: '+91 98765 43213',
        items: [
          { name: 'Folic Acid 5mg Tablets', quantity: 1, price: 65 },
          { name: 'Prenatal Multivitamin', quantity: 1, price: 380 }
        ],
        total: 445,
        orderTime: '2024-01-15 08:30',
        deliveryType: 'pickup',
        address: 'Store Pickup',
        prescriptionRequired: false
      }
    ],
    picked: [
      {
        id: 'ORD-005',
        customerName: 'Rohan Mehta',
        customerPhone: '+91 98765 43214',
        items: [
          { name: 'Blood Pressure Monitor', quantity: 1, price: 2250 }
        ],
        total: 2250,
        orderTime: '2024-01-14 16:45',
        deliveryType: 'home',
        address: 'C-12, Sector 18, Noida',
        prescriptionRequired: false
      }
    ],
    cancelled: []
  },
  prescriptions: [
    {
      id: 1,
      orderId: 'ORD-002',
      customerName: 'Priya Sharma',
      doctorName: 'Dr. Sharma',
      uploadedTime: '2024-01-15 11:15',
      status: 'pending',
      medicines: ['Amoxicillin 500mg', 'Azithromycin 500mg'],
      imageUrl: 'https://via.placeholder.com/400x500?text=Prescription+Image'
    },
    {
      id: 2,
      orderId: 'ORD-003',
      customerName: 'Amit Verma',
      doctorName: 'Dr. Gupta',
      uploadedTime: '2024-01-15 09:45',
      status: 'pending',
      medicines: ['Infant Paracetamol Drops', 'Baby Nasal Drops'],
      imageUrl: 'https://via.placeholder.com/400x500?text=Prescription+Image'
    },
    {
      id: 3,
      orderId: 'ORD-006',
      customerName: 'Neha Kapoor',
      doctorName: 'Dr. Singh',
      uploadedTime: '2024-01-14 14:30',
      status: 'approved',
      medicines: ['Metformin 500mg', 'Atorvastatin 10mg'],
      imageUrl: 'https://via.placeholder.com/400x500?text=Prescription+Image'
    }
  ]
};

export const navigationItems = [
  { id: 'stock', label: 'Stock Management', icon: '📦' },
  { id: 'orders', label: 'Orders', icon: '📋' },
  { id: 'prescriptions', label: 'Prescription Verification', icon: '🩺' },
  { id: 'analytics', label: 'Analytics', icon: '📊' },
  { id: 'profile', label: 'Profile', icon: '👤' }
];

// Category filters based on updated categories
export const categoryFilters = [
  { id: 'all', label: 'All Medicines', count: 40 },
  { id: 'pregnancy', label: 'Pregnancy Care', count: 5 },
  { id: 'baby', label: 'Baby & Child Care', count: 9 },
  { id: 'vitamins', label: 'Vitamins & Supplements', count: 3 },
  { id: 'pain', label: 'Pain Relief', count: 3 },
  { id: 'antibiotics', label: 'Antibiotics', count: 3 },
  { id: 'chronic', label: 'Chronic Care', count: 3 },
  { id: 'firstaid', label: 'First Aid', count: 4 },
  { id: 'equipment', label: 'Medical Equipment', count: 5 }
];

// Fixed stock filters
export const stockFilters = [
  { id: 'all', label: 'All Medicines' },
  { id: 'low', label: 'Low Stock' },
  { id: 'expiring', label: 'Expiring Soon' },
  { id: 'prescription', label: 'Prescription Only' }
];

// Helper function to filter stock based on selected filter
export const getFilteredStock = (stock, filterType) => {
  const today = new Date();
  const thirtyDaysFromNow = new Date();
  thirtyDaysFromNow.setDate(today.getDate() + 30);
  
  switch(filterType) {
    case 'low':
      return stock.filter(item => {
        const hasMinStock = item.minStock !== undefined && item.minStock !== null;
        return hasMinStock ? (item.quantity <= item.minStock) : false;
      });
    
    case 'expiring':
      return stock.filter(item => {
        if (!item.expiryDate || item.expiryDate === 'N/A') return false;
        const expiryDate = new Date(item.expiryDate);
        return expiryDate <= thirtyDaysFromNow && expiryDate >= today;
      });
    
    case 'prescription':
      return stock.filter(item => item.prescriptionRequired);
    
    case 'all':
    default:
      return stock;
  }
};

// Helper function to filter by category
export const getStockByCategory = (stock, categoryId) => {
  const categoryMappings = {
    'all': 'All',
    'pregnancy': 'Pregnancy Care',
    'baby': 'Baby & Child Care',
    'vitamins': 'Vitamins & Supplements',
    'pain': 'Pain Relief',
    'antibiotics': 'Antibiotics',
    'chronic': 'Chronic Care',
    'firstaid': 'First Aid',
    'equipment': 'Medical Equipment'
  };
  
  if (categoryId === 'all') return stock;
  
  const targetCategory = categoryMappings[categoryId];
  if (!targetCategory) return stock;
  
  return stock.filter(item => item.category === targetCategory);
};

// Get counts for filter badges
export const getFilterCounts = (stock) => {
  const today = new Date();
  const thirtyDaysFromNow = new Date();
  thirtyDaysFromNow.setDate(today.getDate() + 30);
  
  const lowStockCount = stock.filter(item => {
    const hasMinStock = item.minStock !== undefined && item.minStock !== null;
    return hasMinStock ? (item.quantity <= item.minStock) : false;
  }).length;
  
  const expiringCount = stock.filter(item => {
    if (!item.expiryDate || item.expiryDate === 'N/A') return false;
    const expiryDate = new Date(item.expiryDate);
    return expiryDate <= thirtyDaysFromNow && expiryDate >= today;
  }).length;
  
  const prescriptionCount = stock.filter(item => item.prescriptionRequired).length;
  
  return {
    all: stock.length,
    low: lowStockCount,
    expiring: expiringCount,
    prescription: prescriptionCount
  };
};

// Get category counts dynamically
export const getCategoryCounts = (stock) => {
  const counts = {
    all: stock.length,
    pregnancy: stock.filter(item => item.category === 'Pregnancy Care').length,
    baby: stock.filter(item => item.category === 'Baby & Child Care').length,
    vitamins: stock.filter(item => item.category === 'Vitamins & Supplements').length,
    pain: stock.filter(item => item.category === 'Pain Relief').length,
    antibiotics: stock.filter(item => item.category === 'Antibiotics').length,
    chronic: stock.filter(item => item.category === 'Chronic Care').length,
    firstaid: stock.filter(item => item.category === 'First Aid').length,
    equipment: stock.filter(item => item.category === 'Medical Equipment').length
  };
  
  // Update categoryFilters with dynamic counts
  categoryFilters.forEach(filter => {
    filter.count = counts[filter.id] || 0;
  });
  
  return counts;
};

// Get unique categories for filter options
export const getStockCategories = (stock) => {
  const categories = [...new Set(stock.map(item => item.category))];
  return categories.map(category => ({ id: category, label: category }));
};

// This will be dynamically calculated based on actual orders data
export const getOrderTabs = (orders) => [
  { id: 'pending', label: 'Pending', count: orders.pending?.length || 0 },
  { id: 'ready', label: 'Ready', count: orders.ready?.length || 0 },
  { id: 'picked', label: 'Picked', count: orders.picked?.length || 0 },
  { id: 'cancelled', label: 'Cancelled', count: orders.cancelled?.length || 0 }
];

// Get equipment categories
export const getEquipmentCategories = (stock) => {
  const equipmentItems = stock.filter(item => item.category === 'Medical Equipment');
  const subCategories = [...new Set(equipmentItems.map(item => item.subCategory))];
  return subCategories.map(cat => ({ id: cat, label: cat }));
};

// Get medicines by category
export const getMedicinesByCategory = (stock, category) => {
  return stock.filter(item => item.category === category && item.category !== 'Medical Equipment');
};

// Get all categories including sub-categories for equipment
export const getAllCategories = (stock) => {
  const categories = [];
  const mainCategories = new Set(stock.map(item => item.category));
  
  mainCategories.forEach(category => {
    if (category === 'Medical Equipment') {
      const equipmentCategories = getEquipmentCategories(stock);
      categories.push(...equipmentCategories);
    } else {
      categories.push({ id: category, label: category });
    }
  });
  
  return categories;
};

// Generate sample data for demonstration
export const generateSampleStockData = () => {
  const categories = [
    'Pain Relief',
    'Antibiotics', 
    'Vitamins & Supplements',
    'Chronic Care',
    'Cardiac',
    'Pregnancy Care',
    'Baby & Child Care',
    'First Aid',
    'Medical Equipment'
  ];
  
  const equipmentSubCategories = [
    'Baby Care',
    'Pregnancy Care',
    'First Aid',
    'Chronic Care',
    'General'
  ];
  
  const sampleData = [];
  let id = 1;
  
  // Generate 50 sample items
  for (let i = 0; i < 50; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const isEquipment = category === 'Medical Equipment';
    const prescriptionRequired = Math.random() > 0.5;
    const quantity = Math.floor(Math.random() * 100) + 1;
    const minStock = Math.floor(quantity * 0.3);
    
    const item = {
      id: id++,
      name: `Sample Medicine ${id}`,
      category: category,
      quantity: quantity,
      minStock: minStock,
      price: Math.floor(Math.random() * 500) + 10,
      expiryDate: `2024-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
      prescriptionRequired: prescriptionRequired,
      supplier: 'Sample Supplier',
      batchNo: `BATCH-${String(id).padStart(3, '0')}`,
      description: 'Sample medicine description'
    };
    
    if (isEquipment) {
      item.subCategory = equipmentSubCategories[Math.floor(Math.random() * equipmentSubCategories.length)];
      item.name = `Sample Equipment ${id}`;
      item.batchNo = `EQP-${String(id).padStart(3, '0')}`;
      item.expiryDate = 'N/A';
    }
    
    sampleData.push(item);
  }
  
  return sampleData;
};

// Get sample data for each category when clicked
export const getCategorySampleData = (categoryId) => {
  const sampleData = {
    all: {
      title: 'All Medicines',
      description: 'Showing all medicines and equipment in stock',
      items: initialData.stock.slice(0, 5)
    },
    pregnancy: {
      title: 'Pregnancy Care',
      description: 'Medicines and equipment for pregnancy care',
      items: initialData.stock.filter(item => item.category === 'Pregnancy Care')
    },
    baby: {
      title: 'Baby & Child Care',
      description: 'Medicines and equipment for baby care',
      items: initialData.stock.filter(item => item.category === 'Baby & Child Care')
    },
    vitamins: {
      title: 'Vitamins & Supplements',
      description: 'Vitamins and dietary supplements',
      items: initialData.stock.filter(item => item.category === 'Vitamins & Supplements')
    },
    pain: {
      title: 'Pain Relief',
      description: 'Pain relief medicines',
      items: initialData.stock.filter(item => item.category === 'Pain Relief')
    },
    antibiotics: {
      title: 'Antibiotics',
      description: 'Antibiotic medicines',
      items: initialData.stock.filter(item => item.category === 'Antibiotics')
    },
    chronic: {
      title: 'Chronic Care',
      description: 'Medicines for chronic conditions',
      items: initialData.stock.filter(item => item.category === 'Chronic Care')
    },
    firstaid: {
      title: 'First Aid',
      description: 'First aid supplies and medicines',
      items: initialData.stock.filter(item => item.category === 'First Aid')
    },
    equipment: {
      title: 'Medical Equipment',
      description: 'Medical equipment and devices',
      items: initialData.stock.filter(item => item.category === 'Medical Equipment')
    }
  };
  
  return sampleData[categoryId] || sampleData.all;
};

// Color constants based on your specifications
export const colors = {
  primary: '#009688',
  mint: '#4DB6AC',
  softbg: '#E0F2F1',
  white: '#FFFFFF',
  darktext: '#124441',
  softtext: '#4F6F6B'
};

// Theme configuration for the entire application
export const theme = {
  primary: colors.primary,
  secondary: colors.mint,
  background: colors.softbg,
  surface: colors.white,
  text: {
    primary: colors.darktext,
    secondary: colors.softtext,
    white: colors.white
  },
  status: {
    success: '#4CAF50',
    warning: '#FF9800',
    error: '#F44336',
    info: '#2196F3'
  },
  borders: {
    light: '#B2DFDB',
    medium: '#80CBC4'
  },
  shadows: {
    small: '0 2px 4px rgba(0, 150, 136, 0.1)',
    medium: '0 4px 8px rgba(0, 150, 136, 0.15)',
    large: '0 8px 16px rgba(0, 150, 136, 0.2)'
  }
};

// Helper functions for stock management
export const checkLowStock = (item) => {
  return item.quantity <= item.minStock;
};

export const checkExpiringSoon = (item) => {
  if (!item.expiryDate || item.expiryDate === 'N/A') return false;
  
  const expiryDate = new Date(item.expiryDate);
  const today = new Date();
  const thirtyDaysFromNow = new Date();
  thirtyDaysFromNow.setDate(today.getDate() + 30);
  
  return expiryDate <= thirtyDaysFromNow && expiryDate >= today;
};

export const checkExpired = (item) => {
  if (!item.expiryDate || item.expiryDate === 'N/A') return false;
  
  const expiryDate = new Date(item.expiryDate);
  const today = new Date();
  
  return expiryDate < today;
};

// Sample medicine categories for dropdown
export const medicineCategories = [
  'Pregnancy Care',
  'Baby & Child Care',
  'Medical Equipment',
  'Vitamins & Supplements',
  'Pain Relief',
  'Antibiotics',
  'Chronic Care',
  'First Aid',
  'Cardiac Care',
  'Diabetes Care',
  'Skin Care',
  'Eye Care',
  'Digestive Care',
  'Respiratory Care'
];

// Sample suppliers for dropdown
export const suppliers = [
  'PharmaCorp',
  'HealthPlus',
  'MedEquip Solutions',
  'BabyCare Equipment',
  'FirstAid Corp',
  'Pediatric Pharma',
  'Maternity Pharma',
  'FertiCare',
  'MedPlus Suppliers',
  'Apollo Pharmacy',
  'Sun Pharma',
  'Cipla',
  'Dr. Reddy\'s',
  'Lupin'
];

// Status colors for orders and prescriptions
export const statusColors = {
  pending: '#F59E0B',
  ready: '#10B981',
  picked: '#3B82F6',
  cancelled: '#EF4444',
  approved: '#10B981',
  rejected: '#EF4444'
};

// Status icons for orders and prescriptions
export const statusIcons = {
  pending: '⏳',
  ready: '✅',
  picked: '📦',
  cancelled: '❌',
  approved: '✅',
  rejected: '❌'
};

// Analytics sample data
export const analyticsData = {
  kpis: {
    ordersToday: 24,
    avgFulfillment: '32 mins',
    splitOrders: 3,
    revenue: 8450
  },
  orderTrends: [
    { day: 'Mon', orders: 18, revenue: 6200 },
    { day: 'Tue', orders: 22, revenue: 7400 },
    { day: 'Wed', orders: 25, revenue: 8100 },
    { day: 'Thu', orders: 20, revenue: 6800 },
    { day: 'Fri', orders: 28, revenue: 9200 },
    { day: 'Sat', orders: 35, revenue: 11500 },
    { day: 'Sun', orders: 30, revenue: 9800 }
  ],
  topLocalities: [
    { area: 'Sector 15', orders: 45 },
    { area: 'Sector 18', orders: 38 },
    { area: 'Sector 62', orders: 32 },
    { area: 'Sector 128', orders: 28 },
    { area: 'Sector 137', orders: 25 }
  ],
  efficiencyMetrics: {
    onTimeDelivery: 85,
    orderAccuracy: 92,
    customerSatisfaction: 88
  }
};

// Default new medicine template
export const defaultNewMedicine = {
  name: '',
  category: '',
  batchNo: '',
  quantity: '',
  minStock: '',
  price: '',
  expiryDate: '',
  prescriptionRequired: false,
  supplier: '',
  description: ''
};

// Helper to generate batch number
export const generateBatchNumber = (category) => {
  const prefix = {
    'Pregnancy Care': 'PC',
    'Baby & Child Care': 'BC',
    'Medical Equipment': 'ME',
    'Vitamins & Supplements': 'VIT',
    'Pain Relief': 'PAIN',
    'Antibiotics': 'ANT',
    'Chronic Care': 'CHR',
    'First Aid': 'FA'
  }[category] || 'MED';
  
  const year = new Date().getFullYear();
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  
  return `${prefix}-${year}-${random}`;
};