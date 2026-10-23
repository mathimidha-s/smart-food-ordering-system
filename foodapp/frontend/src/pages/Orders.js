import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Orders.css';

const STATUS_LABELS = {
  placed: { label: 'Order Placed', color: '#1565C0', bg: '#E3F2FD', icon: '📋' },
  confirmed: { label: 'Confirmed', color: '#1B5E20', bg: '#E8F5E9', icon: '✅' },
  preparing: { label: 'Preparing', color: '#E65100', bg: '#FFF3E0', icon: '👨‍🍳' },
  out_for_delivery: { label: 'Out for Delivery', color: '#6A1B9A', bg: '#F3E5F5', icon: '🛵' },
  delivered: { label: 'Delivered', color: '#2E7D32', bg: '#E8F5E9', icon: '✅' },
  cancelled: { label: 'Cancelled', color: '#B71C1C', bg: '#FFEBEE', icon: '❌' },
};

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get('/api/orders/my-orders');
      setOrders(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="spinner" style={{ marginTop: 100 }} />;

  if (orders.length === 0) {
    return (
      <div className="orders-empty page-enter">
        <span className="orders-empty-icon">📦</span>
        <h2>No orders yet</h2>
        <p>When you place an order, it will appear here.</p>
        <Link to="/restaurants" className="btn-primary">Order Now</Link>
      </div>
    );
  }

  return (
    <div className="orders-page page-enter">
      <div className="container">
        <h1 className="orders-title">My Orders</h1>
        <p className="orders-sub">{orders.length} order{orders.length !== 1 ? 's' : ''} placed</p>

        <div className="orders-list">
          {orders.map(order => {
            const statusInfo = STATUS_LABELS[order.status] || STATUS_LABELS.placed;
            return (
              <div key={order._id} className="order-card">
                <div className="order-card-header">
                  <div className="order-restaurant-info">
                    <h3 className="order-restaurant-name">{order.restaurantName}</h3>
                    <p className="order-date">{new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
                  </div>
                  <span className="order-status-badge" style={{ color: statusInfo.color, background: statusInfo.bg }}>
                    {statusInfo.icon} {statusInfo.label}
                  </span>
                </div>

                <div className="order-items-preview">
                  {order.items.slice(0, 3).map((item, i) => (
                    <span key={i} className="order-item-chip">
                      {item.name} ×{item.quantity}
                    </span>
                  ))}
                  {order.items.length > 3 && (
                    <span className="order-item-chip more">+{order.items.length - 3} more</span>
                  )}
                </div>

                <div className="order-card-footer">
                  <div className="order-total-info">
                    <span className="order-total">₹{order.totalAmount}</span>
                    <span className="order-payment">{order.paymentMethod}</span>
                  </div>
                  <Link to={"/order/" + order._id} className="track-btn">
                    {['delivered', 'cancelled'].includes(order.status) ? 'View Details' : 'Track Order 🗺️'}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
