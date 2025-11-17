import React from 'react';
import { styles } from './Styles';

const MedicineCard = ({ medicine, cart, addToCart, updateQuantity }) => {
  const cartItem = cart.find(item => item.id === medicine.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  return (
    <div style={styles.productCard}>
      <div style={styles.productInfo}>
        <h4 style={styles.productName}>{medicine.name}</h4>
        <p style={styles.productVendor}>{medicine.vendor}</p>
        <div style={styles.productCategory}>
          <span style={styles.categoryBadge}>{medicine.category}</span>
        </div>
        <div style={styles.productFooter}>
          <p style={styles.productPrice}>₹{medicine.price}</p>
          <div style={styles.quantityControls}>
            {quantity > 0 ? (
              <>
                <button 
                  style={styles.quantityButton}
                  onClick={() => updateQuantity(medicine.id, quantity - 1)}
                  type="button"
                >
                  −
                </button>
                <span style={styles.quantity}>{quantity}</span>
                <button 
                  style={styles.quantityButton}
                  onClick={() => updateQuantity(medicine.id, quantity + 1)}
                  type="button"
                >
                  +
                </button>
              </>
            ) : (
              <button 
                style={styles.addToCartButton}
                onClick={() => addToCart(medicine)}
                type="button"
              >
                Add to Cart
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicineCard;