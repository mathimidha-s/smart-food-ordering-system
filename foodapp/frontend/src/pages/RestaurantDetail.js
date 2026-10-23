import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import './RestaurantDetail.css';

export default function RestaurantDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, cartItems, cartRestaurant, updateQuantity } = useCart();
  const { isAuthenticated } = useAuth();
  const [restaurant, setRestaurant] = useState(null);
  const [menu, setMenu] = useState({ items: [], grouped: {} });
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('');
  const [vegOnly, setVegOnly] = useState(false);

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [rRes, mRes] = await Promise.all([
        axios.get('/api/restaurants/' + id),
        axios.get('/api/menu/' + id)
      ]);
      setRestaurant(rRes.data);
      setMenu(mRes.data);
      const cats = Object.keys(mRes.data.grouped);
      if (cats.length > 0) setActiveCategory(cats[0]);
    } catch {
      toast.error('Failed to load restaurant');
      navigate('/restaurants');
    } finally {
      setLoading(false);
    }
  };

  const getItemQty = (itemId) => {
    const found = cartItems.find(i => i._id === itemId);
    return found ? found.quantity : 0;
  };

  const handleAddToCart = (item) => {
    if (!isAuthenticated) { toast.error('Please login to add items'); navigate('/login'); return; }
    const result = addToCart(item, restaurant);
    if (result === 'cleared') {
      toast.success('Cart cleared. New item added from ' + restaurant.name);
    } else {
      toast.success(item.name + ' added to cart!');
    }
  };

  const handleIncrease = (item) => {
    if (!isAuthenticated) { navigate('/login'); return; }
    const existing = cartItems.find(i => i._id === item._id);
    if (existing) {
      updateQuantity(item._id, existing.quantity + 1);
    } else {
      handleAddToCart(item);
    }
  };

  const handleDecrease = (item) => {
    const existing = cartItems.find(i => i._id === item._id);
    if (existing) updateQuantity(item._id, existing.quantity - 1);
  };

  if (loading) return <div className="spinner" style={{ marginTop: 100 }} />;
  if (!restaurant) return null;

  const categories = Object.keys(menu.grouped);
  const displayItems = vegOnly
    ? Object.fromEntries(Object.entries(menu.grouped).map(([cat, items]) => [cat, items.filter(i => i.isVeg)]))
    : menu.grouped;

  const cartTotal = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const cartCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);
  const showCartBar = cartCount > 0 && cartRestaurant?._id === restaurant._id;

  return (
    <div className="rdetail-page page-enter">
      {/* Header */}
      <div className="rdetail-header" style={{ backgroundImage: "url(" + restaurant.imageUrl + ")" }}>
        <div className="rdetail-overlay">
          <div className="container">
            <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
            <div className="rdetail-info">
              <h1 className="rdetail-name">{restaurant.name}</h1>
              <p className="rdetail-cuisine">{restaurant.cuisine.join(' • ')}</p>
              <p className="rdetail-address">📍 {restaurant.address}</p>
              <div className="rdetail-meta">
                <span className="rdetail-rating">★ {restaurant.rating} ({restaurant.reviewCount} reviews)</span>
                <span className="rdetail-sep">·</span>
                <span>🕐 {restaurant.deliveryTime}</span>
                <span className="rdetail-sep">·</span>
                <span>🛵 ₹{restaurant.deliveryFee} delivery</span>
                {restaurant.offers && <><span className="rdetail-sep">·</span><span className="rdetail-offer">🏷️ {restaurant.offers}</span></>}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container rdetail-body">
        {/* Category nav */}
        <div className="cat-nav-wrap">
          <div className="cat-nav">
            {categories.map(cat => (
              <button key={cat} className={"cat-btn" + (activeCategory === cat ? ' active' : '')} onClick={() => setActiveCategory(cat)}>
                {cat}
              </button>
            ))}
          </div>
          <label className="veg-toggle">
            <input type="checkbox" checked={vegOnly} onChange={e => setVegOnly(e.target.checked)} />
            <span className="veg-toggle-label">🥦 Veg only</span>
          </label>
        </div>

        {/* Menu */}
        <div className="menu-sections">
          {categories.map(cat => {
            const items = displayItems[cat];
            if (!items || items.length === 0) return null;
            return (
              <div key={cat} className="menu-section">
                <h2 className="menu-cat-title">{cat} <span>({items.length})</span></h2>
                <div className="menu-items">
                  {items.map(item => {
                    const qty = getItemQty(item._id);
                    return (
                      <div key={item._id} className="menu-item">
                        <div className="menu-item-left">
                          <div className={"veg-badge " + (item.isVeg ? 'veg' : 'nonveg')} />
                          <div className="menu-item-info">
                            <h3 className="menu-item-name">{item.name}</h3>
                            <p className="menu-item-desc">{item.description}</p>
                            <div className="menu-item-meta">
                              <span className="menu-item-rating">★ {item.rating}</span>
                              <span className="menu-item-spice">🌶️ {item.spiceLevel}</span>
                              <span className="menu-item-time">⏱ {item.preparationTime} min</span>
                            </div>
                            <p className="menu-item-price">₹{item.price}</p>
                          </div>
                        </div>
                        <div className="menu-item-right">
                          {item.imageUrl && (
                            <img src={item.imageUrl} alt={item.name} className="menu-item-img"
                              onError={e => { e.target.style.display = 'none'; }} />
                          )}
                          {qty === 0 ? (
                            <button className="add-btn" onClick={() => handleAddToCart(item)}>ADD +</button>
                          ) : (
                            <div className="qty-ctrl">
                              <button className="qty-btn" onClick={() => handleDecrease(item)}>−</button>
                              <span className="qty-val">{qty}</span>
                              <button className="qty-btn" onClick={() => handleIncrease(item)}>+</button>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating cart bar */}
      {showCartBar && (
        <div className="cart-bar">
          <div className="cart-bar-info">
            <span className="cart-bar-count">{cartCount} item{cartCount > 1 ? 's' : ''}</span>
            <span className="cart-bar-restaurant">{restaurant.name}</span>
          </div>
          <div className="cart-bar-right">
            <span className="cart-bar-total">₹{cartTotal}</span>
            <button className="cart-bar-btn" onClick={() => navigate('/cart')}>View Cart →</button>
          </div>
        </div>
      )}
    </div>
  );
}
