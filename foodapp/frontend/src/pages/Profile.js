import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import './Profile.css';

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: user?.name || '', phone: user?.phone || '', address: user?.address || '' });
  const [saving, setSaving] = useState(false);
  const [edited, setEdited] = useState(false);

  const handleChange = e => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setEdited(true);
  };

  const handleSave = async e => {
    e.preventDefault();
    setSaving(true);
    try {
      await axios.put('/api/auth/profile', form);
      toast.success('Profile updated!');
      setEdited(false);
    } catch (err) {
      toast.error('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/');
  };

  return (
    <div className="profile-page page-enter">
      <div className="container">
        <h1 className="profile-title">My Profile</h1>

        <div className="profile-layout">
          {/* Avatar card */}
          <div className="profile-sidebar">
            <div className="avatar-card">
              <div className="avatar-circle">{user?.name?.[0]?.toUpperCase()}</div>
              <h2 className="avatar-name">{user?.name}</h2>
              <p className="avatar-email">{user?.email}</p>
              <div className="avatar-badges">
                <span className="avatar-badge">🍛 Food Lover</span>
                <span className="avatar-badge">📍 Thanjavur</span>
              </div>
            </div>
            <button className="logout-btn" onClick={handleLogout}>🚪 Sign Out</button>
          </div>

          {/* Edit form */}
          <div className="profile-main">
            <div className="profile-form-card">
              <h2 className="profile-section-title">Personal Information</h2>
              <form onSubmit={handleSave} className="profile-form">
                <div className="pf-group">
                  <label className="pf-label">Full Name</label>
                  <input name="name" value={form.name} onChange={handleChange} className="pf-input" placeholder="Your full name" />
                </div>
                <div className="pf-group">
                  <label className="pf-label">Email Address</label>
                  <input value={user?.email} className="pf-input readonly" readOnly />
                  <p className="pf-hint">Email cannot be changed</p>
                </div>
                <div className="pf-group">
                  <label className="pf-label">Phone Number</label>
                  <input name="phone" value={form.phone} onChange={handleChange} className="pf-input" placeholder="+91 98765 43210" />
                </div>
                <div className="pf-group">
                  <label className="pf-label">Default Delivery Address</label>
                  <textarea name="address" value={form.address} onChange={handleChange} className="pf-input pf-textarea" placeholder="Enter your delivery address in Thanjavur" rows={3} />
                </div>
                {edited && (
                  <button type="submit" className="save-btn" disabled={saving}>
                    {saving ? 'Saving...' : '💾 Save Changes'}
                  </button>
                )}
              </form>
            </div>

            {/* Account info */}
            <div className="profile-info-card">
              <h2 className="profile-section-title">Account Info</h2>
              <div className="info-row">
                <span className="info-label">Member Since</span>
                <span className="info-value">{new Date(user?.createdAt || Date.now()).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Account Type</span>
                <span className="info-value info-badge">⭐ Regular Customer</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
