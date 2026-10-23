import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import './Restaurants.css';

const AREAS = ['All', 'Gandhiji Road', 'Medical College Road', 'Punnainallur', 'Nallur', 'Kumbakonam Road', 'Hospital Road'];

export default function Restaurants() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [selectedArea, setSelectedArea] = useState('All');

  useEffect(() => {
    fetchRestaurants();
  }, [searchParams]);

  const fetchRestaurants = async () => {
    setLoading(true);
    try {
      const params = {};
      if (searchParams.get('search')) params.search = searchParams.get('search');
      if (searchParams.get('cuisine')) params.cuisine = searchParams.get('cuisine');
      const res = await axios.get('/api/restaurants', { params });
      setRestaurants(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = e => {
    e.preventDefault();
    setSearchParams(search ? { search } : {});
  };

  const filtered = selectedArea === 'All' ? restaurants : restaurants.filter(r => r.area === selectedArea);

  return (
    <div className="restaurants-page page-enter">
      <div className="restaurants-hero">
        <div className="container">
          <h1 className="rest-hero-title">Restaurants in <span>Thanjavur</span></h1>
          <p className="rest-hero-sub">Discover the finest eateries Thanjavur has to offer</p>
          <form onSubmit={handleSearch} className="rest-search">
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search restaurants or cuisines..."
              className="rest-search-input"
            />
            <button type="submit" className="rest-search-btn">🔍 Search</button>
          </form>
        </div>
      </div>

      <div className="container">
        {/* Area filter */}
        <div className="area-filter">
          {AREAS.map(a => (
            <button
              key={a}
              className={"area-btn" + (selectedArea === a ? ' active' : '')}
              onClick={() => setSelectedArea(a)}
            >
              {a}
            </button>
          ))}
        </div>

        {/* Results */}
        <div className="results-header">
          <h2 className="results-count">
            {loading ? 'Loading...' : `${filtered.length} restaurant${filtered.length !== 1 ? 's' : ''} found`}
          </h2>
        </div>

        {loading ? (
          <div className="spinner" />
        ) : filtered.length === 0 ? (
          <div className="empty-state">
            <span className="empty-icon">🍽️</span>
            <h3>No restaurants found</h3>
            <p>Try a different search or area filter</p>
          </div>
        ) : (
          <div className="restaurant-grid">
            {filtered.map(r => (
              <RestaurantCard key={r._id} restaurant={r} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function RestaurantCard({ restaurant: r }) {
  return (
    <Link to={"/restaurant/" + r._id} className="r-card">
      <div className="r-card-img-wrap">
        <img
          src={r.imageUrl || "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400"}
          alt={r.name}
          className="r-card-img"
          onError={e => { e.target.src = 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400'; }}
        />
        {r.offers && <div className="r-card-offer">🏷️ {r.offers}</div>}
        {!r.isOpen && <div className="r-card-closed">Closed</div>}
      </div>
      <div className="r-card-body">
        <div className="r-card-top">
          <h3 className="r-card-name">{r.name}</h3>
          <div className="r-card-rating">
            <span className="rating-star">★</span> {r.rating}
          </div>
        </div>
        <p className="r-card-cuisine">{r.cuisine.join(' • ')}</p>
        <p className="r-card-address">📍 {r.area}</p>
        <div className="r-card-footer">
          <span className="r-card-meta">🕐 {r.deliveryTime}</span>
          <span className="r-card-sep">·</span>
          <span className="r-card-meta">🛵 ₹{r.deliveryFee} delivery</span>
          <span className="r-card-sep">·</span>
          <span className="r-card-meta">Min ₹{r.minOrder}</span>
        </div>
        {r.tags.length > 0 && (
          <div className="r-card-tags">
            {r.tags.map(t => <span key={t} className="r-tag">{t}</span>)}
          </div>
        )}
      </div>
    </Link>
  );
}
