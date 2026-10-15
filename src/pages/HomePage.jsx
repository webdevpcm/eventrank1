import React, { useState } from 'react';
import { Search, Zap, TrendingUp, Users } from 'lucide-react';
import { CATEGORIES } from '../data/events';
import EventCard from '../components/EventCard';
import CompareBar from '../components/CompareBar';

export default function HomePage({ events, shortlist, compareList, onEventClick, onShortlist, onCompare, setPage, onClearCompare }) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const filtered = events.filter((ev) => {
    const matchSearch = ev.title.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === 'All' || ev.category === category;
    return matchSearch && matchCat;
  });

  return (
    <div style={{ paddingTop: 64 }}>
      {/* Hero */}
      <div style={{ position: 'relative', overflow: 'hidden', background: 'linear-gradient(135deg,#0a0f1e 0%,#0d1526 50%,#111d35 100%)' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 65% 40%, rgba(124,58,237,0.18) 0%, transparent 65%)' }} />
        <div style={{ position: 'relative', maxWidth: 1280, margin: '0 auto', padding: '80px 24px 64px', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 16px', borderRadius: 20, marginBottom: 24, background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.35)', color: '#a78bfa', fontSize: '0.8rem', fontWeight: 500 }}>
            <Zap size={13} /> Discover what's worth attending
          </div>
          <h1 style={{ fontWeight: 900, fontSize: 'clamp(2rem,5vw,3.5rem)', color: 'white', lineHeight: 1.15, marginBottom: 16 }}>
            Find Your Next<br />
            <span style={{ background: 'linear-gradient(135deg,#a78bfa,#60a5fa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Campus Experience
            </span>
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1.05rem', marginBottom: 36, maxWidth: 520, margin: '0 auto 36px' }}>
            Discover events, compare your options, and know what to expect before you go.
          </p>

          {/* Search */}
          <div style={{ position: 'relative', maxWidth: 520, margin: '0 auto 28px' }}>
            <Search size={18} color="#64748b" style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Search events..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: '100%', paddingLeft: 48, paddingRight: 16, paddingTop: 14, paddingBottom: 14, borderRadius: 16, border: '1px solid rgba(255,255,255,0.12)', outline: 'none', background: 'rgba(255,255,255,0.06)', color: 'white', fontSize: '0.95rem', boxSizing: 'border-box' }}
            />
          </div>

          {/* Category filters */}
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                style={{
                  padding: '8px 18px', borderRadius: 20, border: `1px solid ${category === cat ? 'transparent' : 'rgba(255,255,255,0.12)'}`, cursor: 'pointer', fontWeight: 500, fontSize: '0.875rem',
                  background: category === cat ? 'linear-gradient(135deg,#7c3aed,#3b82f6)' : 'rgba(255,255,255,0.06)',
                  color: category === cat ? 'white' : '#94a3b8',
                }}
              >{cat}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '24px 0' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 40 }}>
          {[
            { icon: <Zap size={20} color="#7c3aed" />, val: '50+', label: 'Events Listed' },
            { icon: <Users size={20} color="#3b82f6" />, val: '2,400+', label: 'Student Reviews' },
            { icon: <TrendingUp size={20} color="#22c55e" />, val: '98%', label: 'Accuracy Rate' },
          ].map((s) => (
            <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              {s.icon}
              <div>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'white' }}>{s.val}</div>
                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Events grid */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '40px 24px', paddingBottom: compareList.length > 0 ? 100 : 40 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
          <h2 style={{ fontWeight: 700, color: 'white', fontSize: '1.4rem' }}>
            {search || category !== 'All' ? 'Search Results' : 'Featured Events'}
            <span style={{ marginLeft: 8, fontWeight: 400, color: '#64748b', fontSize: '1rem' }}>({filtered.length})</span>
          </h2>
          <button onClick={() => setPage('discover')} style={{ color: '#7c3aed', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.875rem', fontWeight: 500 }}>View All →</button>
        </div>

        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '64px 0' }}>
            <div style={{ fontSize: '3.5rem', marginBottom: 16 }}>🔍</div>
            <h3 style={{ color: 'white', fontWeight: 700, fontSize: '1.2rem', marginBottom: 8 }}>No events found</h3>
            <p style={{ color: '#64748b', fontSize: '0.875rem' }}>Try different search terms or categories.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}>
            {filtered.map((ev) => (
              <EventCard
                key={ev.id} event={ev}
                isShortlisted={shortlist.includes(ev.id)} isComparing={compareList.includes(ev.id)}
                onEventClick={onEventClick} onShortlist={onShortlist} onCompare={onCompare}
              />
            ))}
          </div>
        )}
      </div>

      <CompareBar
        compareList={compareList} events={events}
        onRemove={onCompare}
        onGoCompare={() => setPage('compare')}
        onClearAll={onClearCompare}
      />
    </div>
  );
}
