import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartRestaurant, setCartRestaurant] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('cart');
    const savedRestaurant = localStorage.getItem('cartRestaurant');
    if (saved) setCartItems(JSON.parse(saved));
    if (savedRestaurant) setCartRestaurant(JSON.parse(savedRestaurant));
  }, []);

  const saveCart = (items, restaurant) => {
    localStorage.setItem('cart', JSON.stringify(items));
    if (restaurant) localStorage.setItem('cartRestaurant', JSON.stringify(restaurant));
  };

  const addToCart = (item, restaurant) => {
    if (cartRestaurant && cartRestaurant._id !== restaurant._id) {
      // Different restaurant - clear cart
      const newItems = [{ ...item, quantity: 1 }];
      setCartItems(newItems);
      setCartRestaurant(restaurant);
      saveCart(newItems, restaurant);
      return 'cleared';
    }

    setCartItems(prev => {
      const existing = prev.find(i => i._id === item._id);
      let updated;
      if (existing) {
        updated = prev.map(i => i._id === item._id ? { ...i, quantity: i.quantity + 1 } : i);
      } else {
        updated = [...prev, { ...item, quantity: 1 }];
      }
      saveCart(updated, restaurant);
      return updated;
    });
    if (!cartRestaurant) setCartRestaurant(restaurant);
    return 'added';
  };

  const removeFromCart = (itemId) => {
    setCartItems(prev => {
      const updated = prev.filter(i => i._id !== itemId);
      if (updated.length === 0) {
        setCartRestaurant(null);
        localStorage.removeItem('cartRestaurant');
      }
      localStorage.setItem('cart', JSON.stringify(updated));
      return updated;
    });
  };

  const updateQuantity = (itemId, quantity) => {
    if (quantity < 1) { removeFromCart(itemId); return; }
    setCartItems(prev => {
      const updated = prev.map(i => i._id === itemId ? { ...i, quantity } : i);
      localStorage.setItem('cart', JSON.stringify(updated));
      return updated;
    });
  };

  const clearCart = () => {
    setCartItems([]);
    setCartRestaurant(null);
    localStorage.removeItem('cart');
    localStorage.removeItem('cartRestaurant');
  };

  const cartCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider value={{
      cartItems, cartRestaurant, cartCount, subtotal,
      addToCart, removeFromCart, updateQuantity, clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
};
