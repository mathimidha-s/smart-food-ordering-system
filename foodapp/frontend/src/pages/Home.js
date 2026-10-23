import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css';

const CUISINES = [
  { label: 'Biryani', emoji: '🍚', color: '#FFF3E0' },
  { label: 'South Indian', emoji: '🥥', color: '#E8F5E9' },
  { label: 'Chettinad', emoji: '🌶️', color: '#FFEBEE' },
  { label: 'Snacks', emoji: '🥟', color: '#F3E5F5' },
  { label: 'Desserts', emoji: '🍮', color: '#FFF8E1' },
  { label: 'Beverages', emoji: '☕', color: '#E3F2FD' },
];

export default function Home() {
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const q = e.target.search.value.trim();
    navigate(`/restaurants${q ? `?search=${encodeURIComponent(q)}` : ''}`);
  };

  return (
    <div className="home page-enter">
      {/* Hero */}
      <section className="hero">
        <div className="hero-content">
          <p className="hero-pill">🏛️ Serving Thanjavur Since 2024</p>
          <h1 className="hero-title">
            Authentic Flavours,<br />
            <span className="hero-highlight">Delivered Hot</span>
          </h1>
          <p className="hero-sub">
            From aromatic biryanis to crispy dosas — Thanjavur's best
            restaurants delivered to your doorstep in 30 minutes.
          </p>
          <form className="search-bar" onSubmit={handleSearch}>
            <span className="search-icon">🔍</span>
            <input
              name="search"
              placeholder="Search restaurants or cuisines..."
              className="search-input"
              autoComplete="off"
            />
            <button type="submit" className="search-btn">Search</button>
          </form>
          <div className="hero-stats">
            <div className="stat"><strong>50+</strong><span>Restaurants</span></div>
            <div className="stat-divider" />
            <div className="stat"><strong>30 min</strong><span>Avg Delivery</span></div>
            <div className="stat-divider" />
            <div className="stat"><strong>4.5★</strong><span>Avg Rating</span></div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-plate">
            <div className="plate-ring ring-1" />
            <div className="plate-ring ring-2" />
            <div className="plate-ring ring-3" />
            <span className="plate-emoji">🍛</span>
          </div>
          <div className="floating-card card-1">🕐 30 min</div>
          <div className="floating-card card-2">⭐ 4.8 Rated</div>
          <div className="floating-card card-3">🛵 Free Delivery</div>
        </div>
      </section>

      {/* Cuisines */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">What are you craving?</h2>
          <div className="cuisine-grid">
            {CUISINES.map(c => (
              <Link
                key={c.label}
                to={`/restaurants?cuisine=${encodeURIComponent(c.label)}`}
                className="cuisine-card"
                style={{ background: c.color }}
              >
                <span className="cuisine-emoji">{c.emoji}</span>
                <span className="cuisine-label">{c.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features-section">
        <div className="container">
          <div className="features-grid">
            {[
              { icon: '⚡', title: 'Lightning Fast', desc: 'Orders delivered in 30 minutes or less, hot and fresh.' },
              { icon: '🛡️', title: 'Safe & Hygienic', desc: 'All restaurants are verified for food safety standards.' },
              { icon: '💰', title: 'Best Prices', desc: 'Exclusive deals and offers available daily.' },
              { icon: '📍', title: 'Live Tracking', desc: 'Track your order in real-time from kitchen to door.' },
            ].map(f => (
              <div key={f.title} className="feature-card">
                <div className="feature-icon">{f.icon}</div>
                <h3 className="feature-title">{f.title}</h3>
                <p className="feature-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-card">
            <div className="cta-left">
              <h2 className="cta-title">Hungry? Let's fix that.</h2>
              <p className="cta-sub">Browse 50+ restaurants in Thanjavur and get food delivered.</p>
              <Link to="/restaurants" className="btn-primary cta-btn">
                Explore Restaurants →
              </Link>
            </div>
            <div className="cta-right">
              <div className="cta-food-icons">
                {['🍛', '🥘', '🍱', '🥗', '🍜', '🫕'].map((e, i) => (
                  <span key={i} className="cta-food-icon" style={{ animationDelay: `${i * 0.2}s` }}>{e}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
