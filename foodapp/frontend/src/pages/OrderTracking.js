import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import './OrderTracking.css';

const STEPS = [
  { key: 'placed', label: 'Order Placed', icon: '📋', desc: 'We received your order' },
  { key: 'confirmed', label: 'Confirmed', icon: '✅', desc: 'Restaurant confirmed' },
  { key: 'preparing', label: 'Preparing', icon: '👨‍🍳', desc: 'Chef is cooking your food' },
  { key: 'out_for_delivery', label: 'Out for Delivery', icon: '🛵', desc: 'On the way to you' },
  { key: 'delivered', label: 'Delivered', icon: '🏠', desc: 'Enjoy your meal!' },
];

const STATUS_ORDER = ['placed', 'confirmed', 'preparing', 'out_for_delivery', 'delivered'];

export default function OrderTracking() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);

  const fetchOrder = useCallback(async () => {
    try {
      const res = await axios.get('/api/orders/' + id);
      setOrder(res.data);
    } catch {
      toast.error('Order not found');
      navigate('/orders');
    } finally {
      setLoading(false);
    }
  }, [id, navigate]);

  useEffect(() => {
    fetchOrder();
    // Poll every 15 seconds for live updates
    const interval = setInterval(fetchOrder, 15000);
    return () => clearInterval(interval);
  }, [fetchOrder]);

  const handleCancel = async () => {
    if (!window.confirm('Are you sure you want to cancel this order?')) return;
    setCancelling(true);
    try {
      await axios.put('/api/orders/' + id + '/cancel');
      toast.success('Order cancelled');
      fetchOrder();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Cannot cancel order');
    } finally {
      setCancelling(false);
    }
  };

  if (loading) return <div className="spinner" style={{ marginTop: 100 }} />;
  if (!order) return null;

  const currentIdx = order.status === 'cancelled' ? -1 : STATUS_ORDER.indexOf(order.status);
  const isCancelled = order.status === 'cancelled';
  const isDelivered = order.status === 'delivered';
  const canCancel = ['placed', 'confirmed'].includes(order.status);

  const eta = order.estimatedDelivery ? new Date(order.estimatedDelivery).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) : '--';

  return (
    <div className="tracking-page page-enter">
      <div className="container">
        <div className="tracking-header">
          <button className="back-link" onClick={() => navigate('/orders')}>← Back to Orders</button>
          <div className="order-id-badge">Order #{order._id.slice(-8).toUpperCase()}</div>
        </div>

        {/* Status Banner */}
        {isCancelled ? (
          <div className="status-banner cancelled">
            <span className="banner-icon">❌</span>
            <div>
              <h2 className="banner-title">Order Cancelled</h2>
              <p className="banner-sub">Your order has been cancelled. Refund will be processed if applicable.</p>
            </div>
          </div>
        ) : isDelivered ? (
          <div className="status-banner delivered">
            <span className="banner-icon">🎉</span>
            <div>
              <h2 className="banner-title">Order Delivered!</h2>
              <p className="banner-sub">Enjoy your meal from {order.restaurantName}. Hope you loved it!</p>
            </div>
          </div>
        ) : (
          <div className="status-banner active">
            <span className="banner-icon">🛵</span>
            <div>
              <h2 className="banner-title">Your order is on its way!</h2>
              <p className="banner-sub">Estimated delivery by <strong>{eta}</strong></p>
            </div>
            <div className="eta-circle">
              <span className="eta-time">{eta}</span>
              <span className="eta-label">ETA</span>
            </div>
          </div>
        )}

        <div className="tracking-layout">
          {/* Progress tracker */}
          <div className="tracking-main">
            {!isCancelled && (
              <div className="progress-card">
                <h2 className="section-heading">Order Progress</h2>
                <div className="progress-steps">
                  {STEPS.map((step, idx) => {
                    const isDone = idx <= currentIdx;
                    const isActive = idx === currentIdx;
                    return (
                      <div key={step.key} className={"progress-step" + (isDone ? ' done' : '') + (isActive ? ' active' : '')}>
                        <div className="step-connector-wrap">
                          <div className={"step-circle" + (isDone ? ' done' : isActive ? ' active' : '')}>
                            {isDone ? (isActive ? step.icon : '✓') : <span className="step-num">{idx + 1}</span>}
                          </div>
                          {idx < STEPS.length - 1 && (
                            <div className={"step-line" + (idx < currentIdx ? ' done' : '')} />
                          )}
                        </div>
                        <div className="step-info">
                          <span className={"step-label" + (isActive ? ' active' : isDone ? ' done' : '')}>{step.label}</span>
                          <span className="step-desc">{step.desc}</span>
                          {isActive && <span className="step-current-badge">Current</span>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Status history */}
            <div className="history-card">
              <h2 className="section-heading">Order Updates</h2>
              <div className="history-list">
                {[...order.statusHistory].reverse().map((h, i) => (
                  <div key={i} className="history-item">
                    <div className="history-dot" />
                    <div className="history-info">
                      <p className="history-msg">{h.message}</p>
                      <p className="history-time">{new Date(h.timestamp).toLocaleString('en-IN')}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order details sidebar */}
          <div className="tracking-sidebar">
            <div className="order-detail-card">
              <h2 className="section-heading">Order Details</h2>
              <p className="od-restaurant">🍽️ {order.restaurantName}</p>

              <div className="od-items">
                {order.items.map((item, i) => (
                  <div key={i} className="od-item">
                    <span className={"veg-badge " + (item.isVeg ? 'veg' : 'nonveg')} style={{ marginTop: 2 }} />
                    <div className="od-item-info">
                      <span className="od-item-name">{item.name}</span>
                      <span className="od-item-qty">×{item.quantity}</span>
                    </div>
                    <span className="od-item-price">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="od-pricing">
                <div className="od-price-row"><span>Subtotal</span><span>₹{order.subtotal}</span></div>
                <div className="od-price-row"><span>Delivery</span><span>₹{order.deliveryFee}</span></div>
                <div className="od-price-row"><span>Taxes</span><span>₹{order.taxes}</span></div>
                <div className="od-price-divider" />
                <div className="od-price-row total"><span>Total</span><span>₹{order.totalAmount}</span></div>
              </div>

              <div className="od-address">
                <p className="od-label">📍 Delivery Address</p>
                <p className="od-value">{order.deliveryAddress}</p>
              </div>
              <div className="od-payment">
                <p className="od-label">💳 Payment</p>
                <p className="od-value">{order.paymentMethod}</p>
              </div>
            </div>

            {canCancel && (
              <button className="cancel-btn" onClick={handleCancel} disabled={cancelling}>
                {cancelling ? 'Cancelling...' : '❌ Cancel Order'}
              </button>
            )}

            <Link to="/restaurants" className="reorder-btn">🔄 Order Again</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
