import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';
import './Navbar.css';

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/');
    setMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">🍛</span>
          <span className="logo-text">TanjoreEats</span>
        </Link>

        <div className="navbar-links">
          <Link to="/restaurants" className={"nav-link" + (isActive('/restaurants') ? ' active' : '')}>
            Restaurants
          </Link>
          {isAuthenticated && (
            <Link to="/orders" className={"nav-link" + (isActive('/orders') ? ' active' : '')}>
              My Orders
            </Link>
          )}
        </div>

        <div className="navbar-actions">
          <Link to="/cart" className="cart-btn">
            <span>🛒</span>
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>

          {isAuthenticated ? (
            <div className="user-menu">
              <button className="user-btn" onClick={() => setMenuOpen(!menuOpen)}>
                <span className="user-avatar">{user?.name?.[0]?.toUpperCase()}</span>
                <span className="user-name">{user?.name?.split(' ')[0]}</span>
                <span>▾</span>
              </button>
              {menuOpen && (
                <div className="dropdown">
                  <Link to="/profile" onClick={() => setMenuOpen(false)} className="dropdown-item">
                    👤 Profile
                  </Link>
                  <Link to="/orders" onClick={() => setMenuOpen(false)} className="dropdown-item">
                    📦 My Orders
                  </Link>
                  <div className="dropdown-divider" />
                  <button onClick={handleLogout} className="dropdown-item danger">
                    🚪 Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="auth-btns">
              <Link to="/login" className="btn-ghost">Login</Link>
              <Link to="/register" className="btn-primary-sm">Sign Up</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
