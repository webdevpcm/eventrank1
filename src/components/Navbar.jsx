import React, { useState } from 'react';
import { Zap, Menu, X, GitCompare, Heart } from 'lucide-react';

export default function Navbar({ page, setPage, compareCount, shortlistCount }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { key: 'discover', label: 'Discover Events' },
    { key: 'compare', label: 'Compare Events', badge: compareCount },
    { key: 'shortlist', label: 'My Shortlist', badge: shortlistCount },
  ];

  return (
    <nav
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        background: 'rgba(10,15,30,0.95)', backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' }}>
          {/* Logo */}
          <button
            onClick={() => setPage('home')}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg,#7c3aed,#3b82f6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Zap size={16} color="white" />
            </div>
            <span style={{ color: 'white', fontWeight: 800, fontSize: '1.25rem', letterSpacing: '-0.02em' }}>
              Event<span style={{ color: '#a78bfa' }}>Rank</span>
            </span>
          </button>

          {/* Desktop nav */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }} className="hidden-mobile">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => setPage(item.key)}
                style={{
                  position: 'relative', padding: '8px 16px', borderRadius: 10, border: 'none', cursor: 'pointer',
                  background: page === item.key ? 'rgba(124,58,237,0.15)' : 'transparent',
                  color: page === item.key ? '#a78bfa' : 'rgba(255,255,255,0.65)',
                  fontWeight: 500, fontSize: '0.875rem',
                }}
              >
                {item.label}
                {item.badge > 0 && (
                  <span style={{
                    position: 'absolute', top: -4, right: -4, width: 18, height: 18, borderRadius: '50%',
                    background: '#7c3aed', color: 'white', fontSize: 10, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>{item.badge}</span>
                )}
              </button>
            ))}
            <button
              onClick={() => setPage('discover')}
              style={{
                marginLeft: 8, padding: '8px 20px', borderRadius: 12, border: 'none', cursor: 'pointer',
                background: 'linear-gradient(135deg,#7c3aed,#3b82f6)', color: 'white', fontWeight: 600, fontSize: '0.875rem',
              }}
            >
              Explore Events
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', display: 'none' }}
            className="show-mobile"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div style={{ paddingBottom: 16 }}>
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => { setPage(item.key); setMenuOpen(false); }}
                style={{ display: 'block', width: '100%', textAlign: 'left', padding: '12px 16px', borderRadius: 10, border: 'none', cursor: 'pointer', background: 'transparent', color: page === item.key ? '#a78bfa' : 'rgba(255,255,255,0.7)', fontWeight: 500, fontSize: '0.875rem', marginBottom: 4 }}
              >{item.label}</button>
            ))}
            <button onClick={() => { setPage('discover'); setMenuOpen(false); }} style={{ width: '100%', padding: '10px 20px', borderRadius: 12, border: 'none', cursor: 'pointer', background: 'linear-gradient(135deg,#7c3aed,#3b82f6)', color: 'white', fontWeight: 600, fontSize: '0.875rem', marginTop: 8 }}>Explore Events</button>
          </div>
        )}
      </div>

      <style>{`
        @media (min-width: 768px) { .hidden-mobile { display: flex !important; } .show-mobile { display: none !important; } }
        @media (max-width: 767px) { .hidden-mobile { display: none !important; } .show-mobile { display: block !important; } }
      `}</style>
    </nav>
  );
}
