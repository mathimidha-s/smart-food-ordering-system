import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div style={{ minHeight: 'calc(100vh - 64px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, padding: 40, textAlign: 'center' }}>
      <span style={{ fontSize: 80 }}>🍽️</span>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 48, fontWeight: 800, color: 'var(--text)' }}>404</h1>
      <p style={{ fontSize: 18, color: 'var(--text-muted)' }}>Oops! This page seems to have been eaten.</p>
      <Link to="/" className="btn-primary" style={{ marginTop: 8 }}>Go Home</Link>
    </div>
  );
}
