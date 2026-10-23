import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import './Auth.css';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '', address: '' });
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    if (form.password.length < 6) { toast.error('Password must be at least 6 characters'); return; }
    setLoading(true);
    try {
      await register(form.name, form.email, form.password, form.phone, form.address);
      toast.success('Account created! Welcome to TanjoreEats 🎉');
      navigate('/restaurants');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page page-enter">
      <div className="auth-card">
        <div className="auth-header">
          <span className="auth-logo">🍛</span>
          <h1 className="auth-title">Create account</h1>
          <p className="auth-sub">Join thousands of food lovers in Thanjavur</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input type="text" name="name" value={form.name} onChange={handleChange} className="form-input" placeholder="Your full name" required />
          </div>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} className="form-input" placeholder="you@example.com" required />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input type="password" name="password" value={form.password} onChange={handleChange} className="form-input" placeholder="Minimum 6 characters" required />
          </div>
          <div className="form-group">
            <label className="form-label">Phone Number <span className="optional">(optional)</span></label>
            <input type="tel" name="phone" value={form.phone} onChange={handleChange} className="form-input" placeholder="+91 98765 43210" />
          </div>
          <div className="form-group">
            <label className="form-label">Delivery Address <span className="optional">(optional)</span></label>
            <textarea name="address" value={form.address} onChange={handleChange} className="form-input form-textarea" placeholder="Your delivery address in Thanjavur" rows={2} />
          </div>
          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/login" className="auth-link">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
