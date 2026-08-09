import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children, showToast }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('ec_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);

  useEffect(() => {
    try {
      localStorage.setItem('ec_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error('Cart persistence error:', e);
    }
  }, [cartItems]);

  const addToCart = (product, quantity = 1) => {
    if (!product || product.stock <= 0) {
      if (showToast) showToast('Product is currently out of stock!', 'error');
      return;
    }

    setCartItems(prevItems => {
      const existingIndex = prevItems.findIndex(item => item.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prevItems];
        const newQty = updated[existingIndex].quantity + quantity;
        
        if (newQty > product.stock) {
          if (showToast) showToast(`Only ${product.stock} units available in stock!`, 'warning');
          updated[existingIndex].quantity = product.stock;
        } else {
          updated[existingIndex].quantity = newQty;
          if (showToast) showToast(`Updated ${product.title} quantity in cart!`, 'info');
        }
        return updated;
      } else {
        if (showToast) showToast(`Added "${product.title}" to your cart!`, 'success');
        return [...prevItems, { ...product, quantity: Math.min(quantity, product.stock) }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => {
      const item = prev.find(i => i.id === productId);
      if (item && showToast) showToast(`Removed "${item.title}" from cart`, 'info');
      return prev.filter(i => i.id !== productId);
    });
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prev => prev.map(item => {
      if (item.id === productId) {
        const qty = Math.min(newQuantity, item.stock);
        if (qty === item.stock && showToast && newQuantity > item.stock) {
          showToast(`Maximum available stock reached (${item.stock})`, 'warning');
        }
        return { ...item, quantity: qty };
      }
      return item;
    }));
  };

  const clearCart = () => {
    setCartItems([]);
    setPromoCode('');
    setDiscountPercent(0);
  };

  const applyPromoCode = (code) => {
    const formatted = code.trim().toUpperCase();
    if (formatted === 'RESUME10' || formatted === 'INTERN10') {
      setPromoCode(formatted);
      setDiscountPercent(0.10);
      if (showToast) showToast('Promo code applied: 10% Discount!', 'success');
      return true;
    } else if (formatted === 'VIP20') {
      setPromoCode(formatted);
      setDiscountPercent(0.20);
      if (showToast) showToast('VIP Promo code applied: 20% Discount!', 'success');
      return true;
    } else {
      if (showToast) showToast('Invalid promo code. Try "RESUME10"', 'error');
      return false;
    }
  };

  // Calculations
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discountAmount = subtotal * discountPercent;
  const taxAmount = (subtotal - discountAmount) * 0.08; // 8% sales tax
  const shippingAmount = subtotal > 100 || cartItems.length === 0 ? 0 : 9.99;
  const grandTotal = Math.max(0, subtotal - discountAmount + taxAmount + shippingAmount);

  return (
    <CartContext.Provider value={{
      cartItems,
      isCartOpen,
      setIsCartOpen,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      applyPromoCode,
      promoCode,
      discountPercent,
      itemCount,
      subtotal,
      discountAmount,
      taxAmount,
      shippingAmount,
      grandTotal
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
