import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import './Cart.css';

export default function Cart() {
  const { cartItems, cartRestaurant, subtotal, updateQuantity, removeFromCart, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [address, setAddress] = useState(user?.address || '');
  const [instructions, setInstructions] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery');
  const [placing, setPlacing] = useState(false);

  const deliveryFee = cartRestaurant?.deliveryFee || 30;
  const taxes = Math.round(subtotal * 0.05);
  const total = subtotal + deliveryFee + taxes;

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty page-enter">
        <span className="cart-empty-icon">🛒</span>
        <h2>Your cart is empty</h2>
        <p>Add items from a restaurant to get started</p>
        <Link to="/restaurants" className="btn-primary">Browse Restaurants</Link>
      </div>
    );
  }

  const handlePlaceOrder = async () => {
    if (!address.trim()) { toast.error('Please enter a delivery address'); return; }
    setPlacing(true);
    try {
      const orderData = {
        restaurantId: cartRestaurant._id,
        restaurantName: cartRestaurant.name,
        items: cartItems.map(i => ({ menuItemId: i._id, name: i.name, price: i.price, quantity: i.quantity, isVeg: i.isVeg })),
        subtotal,
        deliveryFee,
        taxes,
        totalAmount: total,
        deliveryAddress: address,
        paymentMethod,
        specialInstructions: instructions
      };
      const res = await axios.post('/api/orders', orderData);
      clearCart();
      toast.success('Order placed successfully! 🎉');
      navigate('/order/' + res.data._id);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to place order');
    } finally {
      setPlacing(false);
    }
  };

  return (
    <div className="cart-page page-enter">
      <div className="container">
        <h1 className="cart-title">Your Cart</h1>
        {cartRestaurant && (
          <p className="cart-restaurant">🍽️ Order from <strong>{cartRestaurant.name}</strong></p>
        )}

        <div className="cart-layout">
          {/* Items */}
          <div className="cart-items-section">
            <div className="cart-items-card">
              {cartItems.map(item => (
                <div key={item._id} className="cart-item">
                  <div className={"veg-badge " + (item.isVeg ? 'veg' : 'nonveg')} />
                  <div className="cart-item-info">
                    <h3 className="cart-item-name">{item.name}</h3>
                    <p className="cart-item-price">₹{item.price} each</p>
                  </div>
                  <div className="cart-item-actions">
                    <div className="qty-ctrl">
                      <button className="qty-btn" onClick={() => updateQuantity(item._id, item.quantity - 1)}>−</button>
                      <span className="qty-val">{item.quantity}</span>
                      <button className="qty-btn" onClick={() => updateQuantity(item._id, item.quantity + 1)}>+</button>
                    </div>
                    <span className="cart-item-total">₹{item.price * item.quantity}</span>
                    <button className="remove-btn" onClick={() => removeFromCart(item._id)}>🗑️</button>
                  </div>
                </div>
              ))}
            </div>

            {/* Special instructions */}
            <div className="cart-instructions-card">
              <h3 className="card-section-title">Special Instructions</h3>
              <textarea
                value={instructions}
                onChange={e => setInstructions(e.target.value)}
                placeholder="Any special requests? (e.g., less spice, no onion...)"
                className="instructions-input"
                rows={3}
              />
            </div>
          </div>

          {/* Summary */}
          <div className="cart-summary-section">
            <div className="cart-summary-card">
              <h2 className="card-section-title">Order Summary</h2>
              <div className="summary-rows">
                <div className="summary-row"><span>Subtotal</span><span>₹{subtotal}</span></div>
                <div className="summary-row"><span>Delivery Fee</span><span>₹{deliveryFee}</span></div>
                <div className="summary-row"><span>Taxes & Fees (5%)</span><span>₹{taxes}</span></div>
                <div className="summary-divider" />
                <div className="summary-row total"><span>Total</span><span>₹{total}</span></div>
              </div>

              <div className="address-section">
                <h3 className="card-section-title">Delivery Address *</h3>
                <textarea
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  placeholder="Enter your full delivery address in Thanjavur"
                  className="address-input"
                  rows={3}
                  required
                />
              </div>

              <div className="payment-section">
                <h3 className="card-section-title">Payment Method</h3>
                {['Cash on Delivery', 'Online Payment (UPI)', 'Card Payment'].map(m => (
                  <label key={m} className="payment-option">
                    <input type="radio" name="payment" value={m} checked={paymentMethod === m} onChange={e => setPaymentMethod(e.target.value)} />
                    <span>{m === 'Cash on Delivery' ? '💵' : m === 'Online Payment (UPI)' ? '📱' : '💳'} {m}</span>
                  </label>
                ))}
              </div>

              <button className="place-order-btn" onClick={handlePlaceOrder} disabled={placing}>
                {placing ? 'Placing Order...' : `Place Order • ₹${total}`}
              </button>

              <p className="cart-savings">
                {cartRestaurant?.offers ? `🏷️ ${cartRestaurant.offers}` : '🛡️ Safe & secure ordering'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
