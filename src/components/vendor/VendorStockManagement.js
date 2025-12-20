
import React, { useState, useEffect } from 'react';

const SearchBar = ({ searchTerm, onSearchChange, onClearSearch, filteredStock }) => {
  return (
    <div style={{ marginBottom: '24px' }}>
      <div style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        border: '1px solid #4DB6AC',
        borderRadius: '8px',
        padding: '8px 12px',
        transition: 'border-color 0.3s ease'
      }}>
        <input
          type="text"
          style={{
            flex: 1,
            border: 'none',
            outline: 'none',
            fontSize: '14px',
            padding: '4px 0',
            color: '#124441'
          }}
          placeholder="Search medicines by name, category, or batch number..."
          value={searchTerm}
          onChange={onSearchChange}
        />
        {searchTerm && (
          <button 
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#4F6F6B',
              fontSize: '16px',
              padding: '4px'
            }}
            onClick={onClearSearch}
            title="Clear search"
          >
            ✕
          </button>
        )}
      </div>
      {searchTerm && (
        <div style={{ marginTop: '8px', fontSize: '14px', color: '#4F6F6B' }}>
          Found {filteredStock.length} medicine(s) matching "{searchTerm}"
        </div>
      )}
    </div>
  );
};

const CategoryTopBar = ({ 
  categories, 
  activeCategory, 
  onCategoryClick,
  categoryStats 
}) => {
  const categoryIcons = {
    all: '📦',
    pregnancy: '🤰',
    babycare: '👶',
    vitamins: '💊',
    pain: '😷',
    antibiotics: '🦠',
    chronic: '❤️',
    firstaid: '🩹',
    equipment: '⚙️'
  };

  return (
    <div style={{
      display: 'flex',
      gap: '8px',
      marginBottom: '24px',
      flexWrap: 'wrap',
      padding: '16px',
      backgroundColor: '#FFFFFF',
      borderRadius: '12px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      border: '1px solid #4DB6AC'
    }}>
      {categories.map(category => (
        <button
          key={category.id}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 20px',
            backgroundColor: activeCategory === category.id ? '#009688' : '#FFFFFF',
            color: activeCategory === category.id ? '#FFFFFF' : '#124441',
            border: '1px solid #4DB6AC',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500',
            transition: 'all 0.3s ease',
            minWidth: '120px',
            justifyContent: 'center',
            ...(activeCategory === category.id ? {
              borderColor: '#009688',
              transform: 'translateY(-2px)',
              boxShadow: '0 4px 12px rgba(0, 150, 136, 0.2)'
            } : {})
          }}
          onClick={() => onCategoryClick(category.id)}
        >
          <span style={{ fontSize: '16px' }}>{categoryIcons[category.id] || '💊'}</span>
          <span>{category.name}</span>
          <span style={{
            backgroundColor: activeCategory === category.id ? 'rgba(255, 255, 255, 0.3)' : '#E0F2F1',
            color: activeCategory === category.id ? '#FFFFFF' : '#124441',
            borderRadius: '12px',
            padding: '2px 8px',
            fontSize: '12px',
            fontWeight: '600',
            minWidth: '24px',
            textAlign: 'center'
          }}>
            {categoryStats[category.id] || 0}
          </span>
        </button>
      ))}
    </div>
  );
};

// Update Stock Modal Component
const UpdateStockModal = ({ show, onClose, onUpdate, medicine, setMedicine }) => {
  const [formData, setFormData] = useState({
    quantity: '',
    minStock: '',
    price: '',
    expiryDate: '',
    prescriptionRequired: false
  });

  useEffect(() => {
    if (medicine) {
      setFormData({
        quantity: medicine.quantity || '',
        minStock: medicine.minStock || '',
        price: medicine.price || '',
        expiryDate: medicine.expiryDate || '',
        prescriptionRequired: medicine.prescriptionRequired || false
      });
    }
  }, [medicine]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = () => {
    if (formData.quantity && formData.minStock && formData.price && formData.expiryDate) {
      const updatedMedicine = {
        ...medicine,
        quantity: parseInt(formData.quantity),
        minStock: parseInt(formData.minStock),
        price: parseFloat(formData.price),
        expiryDate: formData.expiryDate,
        prescriptionRequired: formData.prescriptionRequired
      };
      onUpdate(updatedMedicine);
      onClose();
    }
  };

  if (!show || !medicine) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '12px',
        padding: '24px',
        width: '400px',
        maxWidth: '90vw',
        maxHeight: '90vh',
        overflow: 'auto',
        boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
          paddingBottom: '12px',
          borderBottom: '1px solid #E0F2F1'
        }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#124441', margin: 0 }}>
            Update Stock - {medicine.name}
          </h3>
          <button 
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              fontSize: '18px',
              cursor: 'pointer',
              color: '#4F6F6B'
            }}
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#124441', fontWeight: '500' }}>
            Current Quantity
          </label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '10px 12px',
              border: '1px solid #4DB6AC',
              borderRadius: '6px',
              fontSize: '14px',
              boxSizing: 'border-box'
            }}
            min="0"
          />
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#124441', fontWeight: '500' }}>
            Minimum Stock Level
          </label>
          <input
            type="number"
            name="minStock"
            value={formData.minStock}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '10px 12px',
              border: '1px solid #4DB6AC',
              borderRadius: '6px',
              fontSize: '14px',
              boxSizing: 'border-box'
            }}
            min="0"
          />
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#124441', fontWeight: '500' }}>
            Price (₹)
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '10px 12px',
              border: '1px solid #4DB6AC',
              borderRadius: '6px',
              fontSize: '14px',
              boxSizing: 'border-box'
            }}
            min="0"
            step="0.01"
          />
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#124441', fontWeight: '500' }}>
            Expiry Date
          </label>
          <input
            type="date"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '10px 12px',
              border: '1px solid #4DB6AC',
              borderRadius: '6px',
              fontSize: '14px',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#124441', fontWeight: '500' }}>
            <input
              type="checkbox"
              name="prescriptionRequired"
              checked={formData.prescriptionRequired}
              onChange={handleChange}
              style={{ margin: 0 }}
            />
            Prescription Required
          </label>
        </div>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
          <button 
            style={{
              backgroundColor: 'transparent',
              color: '#009688',
              border: '2px solid #009688',
              padding: '10px 18px',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
            onClick={onClose}
          >
            Cancel
          </button>
          <button 
            style={{
              backgroundColor: '#009688',
              color: '#FFFFFF',
              border: 'none',
              padding: '12px 20px',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
            onClick={handleSubmit}
          >
            Update Stock
          </button>
        </div>
      </div>
    </div>
  );
};

// Edit Medicine Modal Component
const EditMedicineModal = ({ show, onClose, onUpdate, medicine, setMedicine }) => {
  const [formData, setFormData] = useState({
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
  });

  useEffect(() => {
    if (medicine) {
      setFormData({
        name: medicine.name || '',
        category: medicine.category || '',
        batchNo: medicine.batchNo || '',
        quantity: medicine.quantity || '',
        minStock: medicine.minStock || '',
        price: medicine.price || '',
        expiryDate: medicine.expiryDate || '',
        prescriptionRequired: medicine.prescriptionRequired || false,
        supplier: medicine.supplier || '',
        description: medicine.description || ''
      });
    }
  }, [medicine]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = () => {
    if (formData.name && formData.category && formData.batchNo && formData.quantity && formData.minStock && formData.price) {
      const updatedMedicine = {
        ...medicine,
        ...formData,
        quantity: parseInt(formData.quantity),
        minStock: parseInt(formData.minStock),
        price: parseFloat(formData.price)
      };
      onUpdate(updatedMedicine);
      onClose();
    }
  };

  const medicineCategories = [
    'Pregnancy Care',
    'Baby & Child Care',
    'Medical Equipment',
    'Vitamins & Supplements',
    'Pain Relief',
    'Antibiotics',
    'Chronic Care',
    'First Aid'
  ];

  if (!show || !medicine) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '12px',
        padding: '24px',
        width: '500px',
        maxWidth: '90vw',
        maxHeight: '90vh',
        overflow: 'auto',
        boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
          paddingBottom: '12px',
          borderBottom: '1px solid #E0F2F1'
        }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#124441', margin: 0 }}>
            Edit Medicine - {medicine.name}
          </h3>
          <button 
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              fontSize: '18px',
              cursor: 'pointer',
              color: '#4F6F6B'
            }}
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <div style={{ display: 'grid', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#124441', fontWeight: '500' }}>
              Medicine Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '1px solid #4DB6AC',
                borderRadius: '6px',
                fontSize: '14px',
                boxSizing: 'border-box'
              }}
              required
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#124441', fontWeight: '500' }}>
              Category *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '1px solid #4DB6AC',
                borderRadius: '6px',
                fontSize: '14px',
                boxSizing: 'border-box',
                backgroundColor: '#FFFFFF'
              }}
              required
            >
              <option value="">Select Category</option>
              {medicineCategories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#124441', fontWeight: '500' }}>
                Quantity *
              </label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #4DB6AC',
                  borderRadius: '6px',
                  fontSize: '14px',
                  boxSizing: 'border-box'
                }}
                min="0"
                required
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#124441', fontWeight: '500' }}>
                Min Stock *
              </label>
              <input
                type="number"
                name="minStock"
                value={formData.minStock}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #4DB6AC',
                  borderRadius: '6px',
                  fontSize: '14px',
                  boxSizing: 'border-box'
                }}
                min="0"
                required
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#124441', fontWeight: '500' }}>
                Price (₹) *
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #4DB6AC',
                  borderRadius: '6px',
                  fontSize: '14px',
                  boxSizing: 'border-box'
                }}
                min="0"
                step="0.01"
                required
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#124441', fontWeight: '500' }}>
                Expiry Date *
              </label>
              <input
                type="date"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #4DB6AC',
                  borderRadius: '6px',
                  fontSize: '14px',
                  boxSizing: 'border-box'
                }}
                required
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#124441', fontWeight: '500' }}>
              Batch Number *
            </label>
            <input
              type="text"
              name="batchNo"
              value={formData.batchNo}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '1px solid #4DB6AC',
                borderRadius: '6px',
                fontSize: '14px',
                boxSizing: 'border-box'
              }}
              required
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#124441', fontWeight: '500' }}>
              Supplier
            </label>
            <input
              type="text"
              name="supplier"
              value={formData.supplier}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '1px solid #4DB6AC',
                borderRadius: '6px',
                fontSize: '14px',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#124441', fontWeight: '500' }}>
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '1px solid #4DB6AC',
                borderRadius: '6px',
                fontSize: '14px',
                boxSizing: 'border-box',
                minHeight: '80px',
                resize: 'vertical'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#124441', fontWeight: '500' }}>
              <input
                type="checkbox"
                name="prescriptionRequired"
                checked={formData.prescriptionRequired}
                onChange={handleChange}
                style={{ margin: 0 }}
              />
              Prescription Required
            </label>
          </div>
        </div>

        <div style={{ marginTop: '24px', display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
          <button 
            style={{
              backgroundColor: 'transparent',
              color: '#009688',
              border: '2px solid #009688',
              padding: '10px 18px',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
            onClick={onClose}
          >
            Cancel
          </button>
          <button 
            style={{
              backgroundColor: '#009688',
              color: '#FFFFFF',
              border: 'none',
              padding: '12px 20px',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
            onClick={handleSubmit}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

// Delete Confirmation Modal
const DeleteConfirmationModal = ({ show, onClose, onConfirm, medicine }) => {
  if (!show || !medicine) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '12px',
        padding: '24px',
        width: '400px',
        maxWidth: '90vw',
        boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
          paddingBottom: '12px',
          borderBottom: '1px solid #E0F2F1'
        }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#124441', margin: 0 }}>
            Confirm Delete
          </h3>
          <button 
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              fontSize: '18px',
              cursor: 'pointer',
              color: '#4F6F6B'
            }}
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <p style={{ fontSize: '16px', color: '#124441', marginBottom: '12px' }}>
            Are you sure you want to delete this item?
          </p>
          <div style={{
            backgroundColor: '#FEF2F2',
            border: '1px solid #FECACA',
            borderRadius: '8px',
            padding: '16px',
            marginBottom: '16px'
          }}>
            <p style={{ fontSize: '14px', color: '#124441', margin: 0, fontWeight: '500' }}>
              {medicine.name}
            </p>
            <p style={{ fontSize: '12px', color: '#4F6F6B', margin: '4px 0 0 0' }}>
              Category: {medicine.category} • Batch: {medicine.batchNo}
            </p>
          </div>
          <p style={{ fontSize: '14px', color: '#EF4444', fontWeight: '500' }}>
            ⚠️ This action cannot be undone.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
          <button 
            style={{
              backgroundColor: 'transparent',
              color: '#4F6F6B',
              border: '1px solid #4F6F6B',
              padding: '10px 18px',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
            onClick={onClose}
          >
            Cancel
          </button>
          <button 
            style={{
              backgroundColor: '#EF4444',
              color: '#FFFFFF',
              border: 'none',
              padding: '10px 18px',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
            onClick={() => {
              onConfirm(medicine.id);
              onClose();
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

const VendorStockManagement = ({
  userProfile,
  stockFilter,
  stock,
  searchTerm,
  filteredStock,
  stockFilters,
  formatIndianCurrency,
  getCurrentGreeting,
  isLowStock,
  isExpiringSoon,
  isExpired,
  handleSearchChange,
  handleClearSearch,
  handleEditMedicine,
  setShowAddMedicineModal,
  setShowNotificationsBellModal,
  notifications,
  setStockFilter,
  deleteMedicine,
  updateStock // NEW: Added updateStock function
}) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [localStock, setLocalStock] = useState([]);
  const [displayStock, setDisplayStock] = useState([]);
  
  // Modal states
  const [showUpdateStockModal, setShowUpdateStockModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState(null);

  // Simplified categories
  const categories = [
    { id: 'all', name: 'All Medicines' },
    { id: 'pregnancy', name: 'Pregnancy Care' },
    { id: 'babycare', name: 'Baby & Child Care' },
    { id: 'vitamins', name: 'Vitamins & Supplements' },
    { id: 'pain', name: 'Pain Relief' },
    { id: 'antibiotics', name: 'Antibiotics' },
    { id: 'chronic', name: 'Chronic Care' },
    { id: 'firstaid', name: 'First Aid' },
    { id: 'equipment', name: 'Medical Equipment' }
  ];

  // Initialize comprehensive sample data including Baby/Child Equipment
  const initializeSampleMedicines = () => {
    const today = new Date();
    const nextMonth = new Date(today);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    const nextYear = new Date(today);
    nextYear.setFullYear(nextYear.getFullYear() + 1);
    const expiredDate = new Date(today);
    expiredDate.setMonth(expiredDate.getMonth() - 2);
    
    const formatDate = (date) => date.toISOString().split('T')[0];
    
    const mockData = [
      // ================= PREGNANCY CARE =================
      {
        id: 'PC-001',
        name: 'Folic Acid 5mg Tablets',
        category: 'Pregnancy Care',
        batchNo: 'FA-2024-001',
        quantity: 8,
        minStock: 10,
        price: 65,
        expiryDate: formatDate(nextYear),
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
        expiryDate: formatDate(nextYear),
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
        expiryDate: formatDate(nextMonth),
        prescriptionRequired: false,
        supplier: 'Maternity Pharma',
        description: 'Complete prenatal nutrition'
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
        expiryDate: formatDate(nextYear),
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
        expiryDate: formatDate(nextYear),
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
        expiryDate: formatDate(nextYear),
        prescriptionRequired: false,
        supplier: 'Pediatric Pharma',
        description: 'Nasal congestion relief'
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
        expiryDate: formatDate(nextYear),
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

      // ================= OTHER CATEGORIES =================
      {
        id: 'VIT-001',
        name: 'Vitamin C Tablets',
        category: 'Vitamins & Supplements',
        batchNo: 'VC-2024-001',
        quantity: 65,
        minStock: 50,
        price: 150,
        expiryDate: formatDate(nextYear),
        prescriptionRequired: false,
        supplier: 'HealthPlus',
        description: 'Immune support'
      },
      {
        id: 'PAIN-001',
        name: 'Ibuprofen Tablets',
        category: 'Pain Relief',
        batchNo: 'IBU-2024-001',
        quantity: 120,
        minStock: 100,
        price: 45,
        expiryDate: formatDate(nextYear),
        prescriptionRequired: false,
        supplier: 'PharmaCorp',
        description: 'Pain relief'
      },
      {
        id: 'ANT-001',
        name: 'Amoxicillin Capsules',
        category: 'Antibiotics',
        batchNo: 'AMX-2024-001',
        quantity: 85,
        minStock: 50,
        price: 95,
        expiryDate: formatDate(nextYear),
        prescriptionRequired: true,
        supplier: 'PharmaCorp',
        description: 'Antibiotic'
      },
      {
        id: 'CHR-001',
        name: 'Metformin Tablets',
        category: 'Chronic Care',
        batchNo: 'MET-2024-001',
        quantity: 150,
        minStock: 100,
        price: 55,
        expiryDate: formatDate(nextYear),
        prescriptionRequired: true,
        supplier: 'HealthPlus',
        description: 'Diabetes medication'
      },
      {
        id: 'FA-001',
        name: 'First Aid Kit',
        category: 'First Aid',
        batchNo: 'FAK-2024-001',
        quantity: 18,
        minStock: 15,
        price: 550,
        expiryDate: formatDate(nextYear),
        prescriptionRequired: false,
        supplier: 'FirstAid Corp',
        description: 'Emergency kit'
      }
    ];

    return mockData;
  };

  // Handle category selection
  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  // Filter products based on category
  const filterByCategory = (products) => {
    if (selectedCategory === 'all') {
      return products;
    }
    
    const categoryMappings = {
      'pregnancy': ['Pregnancy Care'],
      'babycare': ['Baby & Child Care'],
      'equipment': ['Medical Equipment'],
      'vitamins': ['Vitamins & Supplements'],
      'pain': ['Pain Relief'],
      'antibiotics': ['Antibiotics'],
      'chronic': ['Chronic Care'],
      'firstaid': ['First Aid']
    };
    
    const targetCategory = categoryMappings[selectedCategory];
    if (!targetCategory) return products;
    
    return products.filter(item => targetCategory.includes(item.category));
  };

  // Apply stock filters
  const applyStockFilter = (products) => {
    switch (stockFilter) {
      case 'low':
        return products.filter(item => {
          // Ensure item has minStock property
          const hasMinStock = item.minStock !== undefined;
          const isLow = hasMinStock ? (item.quantity <= item.minStock) : false;
          return isLow;
        });
      case 'expiring':
        return products.filter(item => {
          // Check if expiry date is valid and item is expiring soon
          if (!item.expiryDate || item.expiryDate === 'N/A') return false;
          return isExpiringSoon(item);
        });
      case 'prescription':
        return products.filter(m => m.prescriptionRequired);
      default:
        return products;
    }
  };

  // Apply search filter
  const applySearchFilter = (products) => {
    if (!searchTerm) return products;
    
    const searchLower = searchTerm.toLowerCase();
    return products.filter(item => 
      (item.name && item.name.toLowerCase().includes(searchLower)) ||
      (item.category && item.category.toLowerCase().includes(searchLower)) ||
      (item.batchNo && item.batchNo.toLowerCase().includes(searchLower)) ||
      (item.description && item.description.toLowerCase().includes(searchLower))
    );
  };

  // Calculate category statistics
  const calculateCategoryStats = (products) => {
    const stats = {};
    
    categories.forEach(category => {
      if (category.id === 'all') {
        stats['all'] = products.length;
      } else {
        const categoryMappings = {
          'pregnancy': ['Pregnancy Care'],
          'babycare': ['Baby & Child Care'],
          'equipment': ['Medical Equipment'],
          'vitamins': ['Vitamins & Supplements'],
          'pain': ['Pain Relief'],
          'antibiotics': ['Antibiotics'],
          'chronic': ['Chronic Care'],
          'firstaid': ['First Aid']
        };
        
        const targetCategory = categoryMappings[category.id];
        if (!targetCategory) {
          stats[category.id] = 0;
          return;
        }
        
        const count = products.filter(item => targetCategory.includes(item.category)).length;
        stats[category.id] = count;
      }
    });
    
    return stats;
  };

  // Initialize and update local stock
  useEffect(() => {
    const initialStock = stock.length > 0 ? stock : initializeSampleMedicines();
    setLocalStock(initialStock);
  }, [stock]);

  // Update displayed stock when filters change
  useEffect(() => {
    let filtered = [...localStock];
    
    // Apply category filter
    filtered = filterByCategory(filtered);
    
    // Apply stock filter
    filtered = applyStockFilter(filtered);
    
    // Apply search filter
    filtered = applySearchFilter(filtered);
    
    setDisplayStock(filtered);
  }, [selectedCategory, stockFilter, searchTerm, localStock]);

  // Handle update stock button click
  const handleUpdateStockClick = (medicine) => {
    setSelectedMedicine(medicine);
    setShowUpdateStockModal(true);
  };

  // Handle edit button click
  const handleEditClick = (medicine) => {
    setSelectedMedicine(medicine);
    setShowEditModal(true);
  };

  // Handle delete button click
  const handleDeleteClick = (medicine) => {
    setSelectedMedicine(medicine);
    setShowDeleteModal(true);
  };

  // Handle actual stock update
  const handleStockUpdate = (updatedMedicine) => {
    if (updateStock) {
      updateStock(updatedMedicine);
    } else {
      setLocalStock(prev => prev.map(med => 
        med.id === updatedMedicine.id ? updatedMedicine : med
      ));
    }
  };

  // Handle actual medicine edit
  const handleMedicineEdit = (updatedMedicine) => {
    if (handleEditMedicine) {
      handleEditMedicine(updatedMedicine);
    } else {
      setLocalStock(prev => prev.map(med => 
        med.id === updatedMedicine.id ? updatedMedicine : med
      ));
    }
  };

  // Handle actual medicine delete
  const handleMedicineDelete = (medicineId) => {
    if (deleteMedicine) {
      deleteMedicine(medicineId);
    } else {
      setLocalStock(prev => prev.filter(item => item.id !== medicineId));
    }
  };

  const categoryStats = calculateCategoryStats(localStock);
  const currentCategory = categories.find(c => c.id === selectedCategory);

  return (
    <>
      <div style={{ padding: '24px', minHeight: '100vh', backgroundColor: '#E0F2F1' }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '30px'
        }}>
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#124441', margin: '0 0 8px 0' }}>
              {getCurrentGreeting()}, {userProfile.fullName?.split(' ')[0] || 'User'}
            </h1>
            <p style={{ fontSize: '16px', color: '#4F6F6B', margin: 0 }}>
              Manage your medicine inventory and stock levels
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button 
              style={{
                position: 'relative',
                backgroundColor: '#FFFFFF',
                border: '1px solid #4DB6AC',
                borderRadius: '8px',
                padding: '10px 12px',
                fontSize: '18px',
                cursor: 'pointer',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                color: '#124441'
              }}
              onClick={() => setShowNotificationsBellModal(true)}
            >
              🔔
              {notifications.length > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-5px',
                  right: '-5px',
                  backgroundColor: '#EF4444',
                  color: '#FFFFFF',
                  borderRadius: '50%',
                  width: '18px',
                  height: '18px',
                  fontSize: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '600'
                }}>
                  {notifications.length}
                </span>
              )}
            </button>
            <button 
              style={{
                backgroundColor: '#009688',
                color: '#FFFFFF',
                border: 'none',
                padding: '12px 20px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
              onClick={() => setShowAddMedicineModal(true)}
            >
              + Add Medicine/Equipment
            </button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
          {stockFilters.map(filter => (
            <button
              key={filter.id}
              style={{
                padding: '10px 20px',
                backgroundColor: stockFilter === filter.id ? '#009688' : '#FFFFFF',
                color: stockFilter === filter.id ? '#FFFFFF' : '#124441',
                border: '1px solid #4DB6AC',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
              onClick={() => setStockFilter(filter.id)}
            >
              <span>{filter.label}</span>
              {stockFilter === filter.id && filter.id === 'low' && (
                <span style={{
                  backgroundColor: 'rgba(255,255,255,0.3)',
                  padding: '2px 8px',
                  borderRadius: '10px',
                  fontSize: '12px'
                }}>
                  {localStock.filter(item => item.quantity <= item.minStock).length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Stats Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
          marginBottom: '30px'
        }}>
          <div style={{
            backgroundColor: '#FFFFFF',
            padding: '20px',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            display: 'flex',
            alignItems: 'center',
            border: '1px solid #4DB6AC'
          }}>
            <div style={{ fontSize: '24px', marginRight: '16px', color: '#009688' }}>📦</div>
            <div>
              <h3 style={{ fontSize: '24px', fontWeight: '700', color: '#124441', margin: '0 0 4px 0' }}>
                {localStock.length}
              </h3>
              <p style={{ fontSize: '14px', color: '#4F6F6B', margin: 0 }}>Total Items</p>
            </div>
          </div>

          <div style={{
            backgroundColor: '#FFFFFF',
            padding: '20px',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            display: 'flex',
            alignItems: 'center',
            border: '1px solid #4DB6AC'
          }}>
            <div style={{ fontSize: '24px', marginRight: '16px', color: '#EF4444' }}>⚠️</div>
            <div>
              <h3 style={{ fontSize: '24px', fontWeight: '700', color: '#124441', margin: '0 0 4px 0' }}>
                {localStock.filter(item => item.quantity <= item.minStock).length}
              </h3>
              <p style={{ fontSize: '14px', color: '#4F6F6B', margin: 0 }}>Low Stock</p>
            </div>
          </div>

          <div style={{
            backgroundColor: '#FFFFFF',
            padding: '20px',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            display: 'flex',
            alignItems: 'center',
            border: '1px solid #4DB6AC'
          }}>
            <div style={{ fontSize: '24px', marginRight: '16px', color: '#F59E0B' }}>📅</div>
            <div>
              <h3 style={{ fontSize: '24px', fontWeight: '700', color: '#124441', margin: '0 0 4px 0' }}>
                {localStock.filter(isExpiringSoon).length}
              </h3>
              <p style={{ fontSize: '14px', color: '#4F6F6B', margin: 0 }}>Expiring Soon</p>
            </div>
          </div>

          <div style={{
            backgroundColor: '#FFFFFF',
            padding: '20px',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            display: 'flex',
            alignItems: 'center',
            border: '1px solid #4DB6AC'
          }}>
            <div style={{ fontSize: '24px', marginRight: '16px', color: '#009688' }}>🩺</div>
            <div>
              <h3 style={{ fontSize: '24px', fontWeight: '700', color: '#124441', margin: '0 0 4px 0' }}>
                {localStock.filter(m => m.prescriptionRequired).length}
              </h3>
              <p style={{ fontSize: '14px', color: '#4F6F6B', margin: 0 }}>Prescription Only</p>
            </div>
          </div>
        </div>

        {/* Category Top Bar */}
        <CategoryTopBar 
          categories={categories}
          activeCategory={selectedCategory}
          onCategoryClick={handleCategoryClick}
          categoryStats={categoryStats}
        />

        {/* Category Status */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          backgroundColor: '#FFFFFF',
          padding: '12px 16px',
          borderRadius: '8px',
          marginBottom: '20px',
          border: '1px solid #4DB6AC'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#124441' }}>
            <span>Showing:</span>
            <span style={{ fontWeight: '600' }}>
              {selectedCategory === 'all' ? 'All Items' : currentCategory?.name}
              {stockFilter !== 'all' && ` (${stockFilters.find(f => f.id === stockFilter)?.label})`}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#124441' }}>
            <span>Items:</span>
            <span style={{ fontWeight: '600' }}>{displayStock.length}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#124441' }}>
            <span>Category Count:</span>
            <span style={{ fontWeight: '600' }}>{categoryStats[selectedCategory] || 0}</span>
          </div>
          {(selectedCategory !== 'all' || stockFilter !== 'all' || searchTerm) && (
            <button 
              style={{
                marginLeft: 'auto',
                fontSize: '12px',
                padding: '6px 12px',
                backgroundColor: 'transparent',
                border: '1px solid #009688',
                color: '#009688',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
              onClick={() => {
                setSelectedCategory('all');
                setStockFilter('all');
                handleClearSearch();
              }}
            >
              Reset All Filters
            </button>
          )}
        </div>

        {/* Main Content */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '12px',
          padding: '24px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          border: '1px solid #4DB6AC'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px'
          }}>
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#124441', margin: 0 }}>
                {selectedCategory === 'all' ? 'Medicine & Equipment Inventory' : currentCategory?.name}
                {stockFilter !== 'all' && ` (${stockFilters.find(f => f.id === stockFilter)?.label})`}
              </h2>
              <p style={{ fontSize: '14px', color: '#4F6F6B', margin: '4px 0 0 0' }}>
                {displayStock.length} of {categoryStats[selectedCategory] || 0} items shown
                {stockFilter !== 'all' ? ` after applying ${stockFilters.find(f => f.id === stockFilter)?.label.toLowerCase()} filter` : ''}
              </p>
            </div>
            <div style={{ fontSize: '14px', color: '#009688', fontWeight: '500' }}>
              <span>{displayStock.length} items</span>
            </div>
          </div>

          <SearchBar 
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
            onClearSearch={handleClearSearch}
            filteredStock={displayStock}
          />

          {/* Table */}
          <div style={{ overflowX: 'auto', marginTop: '20px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '1000px' }}>
              <thead>
                <tr style={{ backgroundColor: '#E0F2F1', borderBottom: '2px solid #4DB6AC' }}>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '14px', color: '#124441' }}>Name & Details</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '14px', color: '#124441' }}>Category</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '14px', color: '#124441' }}>Quantity</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '14px', color: '#124441' }}>Price</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '14px', color: '#124441' }}>Expiry Date</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '14px', color: '#124441' }}>Prescription</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '14px', color: '#124441' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {displayStock.map(item => (
                  <tr key={item.id} style={{ borderBottom: '1px solid #E0F2F1' }}>
                    <td style={{ padding: '12px 16px', fontSize: '14px', color: '#124441' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        <strong>{item.name}</strong>
                        <span style={{ fontSize: '12px', color: '#4F6F6B' }}>Batch: {item.batchNo}</span>
                        {item.description && (
                          <span style={{ fontSize: '11px', color: '#4F6F6B', fontStyle: 'italic' }}>
                            {item.description}
                          </span>
                        )}
                      </div>
                    </td>
                    <td style={{ padding: '12px 16px', fontSize: '14px' }}>
                      <span style={{
                        fontWeight: '500',
                        backgroundColor: '#E0F2F1',
                        color: '#124441',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '12px',
                        display: 'inline-block'
                      }}>
                        {item.category}
                      </span>
                    </td>
                    <td style={{ padding: '12px 16px', fontSize: '14px', color: '#124441' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        <span style={{ 
                          fontWeight: '600', 
                          ...(item.quantity <= item.minStock ? { color: '#EF4444' } : {}) 
                        }}>
                          {item.quantity} {item.quantity <= item.minStock && '⚠️'}
                        </span>
                        <span style={{ fontSize: '11px', color: '#4F6F6B' }}>
                          Min: {item.minStock || 'N/A'}
                        </span>
                      </div>
                    </td>
                    <td style={{ padding: '12px 16px', fontSize: '14px', color: '#124441' }}>
                      {formatIndianCurrency(item.price)}
                    </td>
                    <td style={{ padding: '12px 16px', fontSize: '14px' }}>
                      <span style={{
                        color: '#124441',
                        ...(isExpired(item) ? { color: '#EF4444', fontWeight: '600' } : {}),
                        ...(isExpiringSoon(item) && !isExpired(item) ? { color: '#F59E0B' } : {})
                      }}>
                        {item.expiryDate || 'N/A'}
                        {isExpired(item) && ' 🔴'}
                        {isExpiringSoon(item) && !isExpired(item) && ' 🟡'}
                      </span>
                    </td>
                    <td style={{ padding: '12px 16px', fontSize: '14px' }}>
                      {item.prescriptionRequired ? (
                        <span style={{ color: '#EF4444', fontWeight: '500' }}>Yes</span>
                      ) : (
                        <span style={{ color: '#009688', fontWeight: '500' }}>No</span>
                      )}
                    </td>
                    <td style={{ padding: '12px 16px', fontSize: '14px' }}>
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        <button 
                          style={{
                            backgroundColor: '#009688',
                            color: '#FFFFFF',
                            border: 'none',
                            padding: '6px 12px',
                            borderRadius: '4px',
                            fontSize: '12px',
                            fontWeight: '500',
                            cursor: 'pointer'
                          }}
                          onClick={() => handleUpdateStockClick(item)}
                        >
                          Update Stock
                        </button>
                        <button 
                          style={{
                            backgroundColor: 'transparent',
                            color: '#009688',
                            border: '1px solid #009688',
                            padding: '6px 12px',
                            borderRadius: '4px',
                            fontSize: '12px',
                            fontWeight: '500',
                            cursor: 'pointer'
                          }}
                          onClick={() => handleEditClick(item)}
                        >
                          Edit
                        </button>
                        <button 
                          style={{
                            backgroundColor: '#EF4444',
                            color: '#FFFFFF',
                            border: 'none',
                            padding: '6px 12px',
                            borderRadius: '4px',
                            fontSize: '12px',
                            fontWeight: '500',
                            cursor: 'pointer'
                          }}
                          onClick={() => handleDeleteClick(item)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {displayStock.length === 0 && (
            <div style={{ textAlign: 'center', padding: '40px', color: '#4F6F6B' }}>
              <p style={{ fontSize: '16px', marginBottom: '8px' }}>
                No items found 
                {selectedCategory !== 'all' ? ` in ${currentCategory?.name}` : ''}
                {stockFilter !== 'all' ? ` with ${stockFilters.find(f => f.id === stockFilter)?.label.toLowerCase()} filter` : ''}
                {searchTerm ? ` matching "${searchTerm}"` : ''}.
              </p>
              <p style={{ fontSize: '14px', color: '#4F6F6B', marginBottom: '16px' }}>
                {selectedCategory !== 'all' 
                  ? `There are ${categoryStats[selectedCategory] || 0} items in this category. Try changing the stock filter or search term.`
                  : 'Try changing filters or adding new items to your inventory.'}
              </p>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                {(searchTerm || stockFilter !== 'all' || selectedCategory !== 'all') && (
                  <button 
                    style={{
                      backgroundColor: 'transparent',
                      color: '#009688',
                      border: '2px solid #009688',
                      padding: '10px 18px',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      marginTop: '16px'
                    }}
                    onClick={() => {
                      handleClearSearch();
                      setSelectedCategory('all');
                      setStockFilter('all');
                    }}
                  >
                    Clear All Filters
                  </button>
                )}
                <button 
                  style={{
                    backgroundColor: '#009688',
                    color: '#FFFFFF',
                    border: 'none',
                    padding: '10px 18px',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    marginTop: '16px'
                  }}
                  onClick={() => setShowAddMedicineModal(true)}
                >
                  Add New Item
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Update Stock Modal */}
      <UpdateStockModal
        show={showUpdateStockModal}
        onClose={() => {
          setShowUpdateStockModal(false);
          setSelectedMedicine(null);
        }}
        onUpdate={handleStockUpdate}
        medicine={selectedMedicine}
        setMedicine={setSelectedMedicine}
      />

      {/* Edit Medicine Modal */}
      <EditMedicineModal
        show={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setSelectedMedicine(null);
        }}
        onUpdate={handleMedicineEdit}
        medicine={selectedMedicine}
        setMedicine={setSelectedMedicine}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        show={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedMedicine(null);
        }}
        onConfirm={handleMedicineDelete}
        medicine={selectedMedicine}
      />
    </>
  );
};

export default VendorStockManagement;