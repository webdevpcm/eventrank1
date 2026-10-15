import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { CATEGORIES } from '../data/events';
import EventCard from '../components/EventCard';
import CompareBar from '../components/CompareBar';

export default function DiscoverPage({ events, shortlist, compareList, onEventClick, onShortlist, onCompare, setPage, onClearCompare }) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [feeFilter, setFeeFilter] = useState('all');
  const [modeFilter, setModeFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let arr = events.filter((ev) => {
      if (search && !ev.title.toLowerCase().includes(search.toLowerCase())) return false;
      if (category !== 'All' && ev.category !== category) return false;
      if (feeFilter === 'free' && ev.fee !== 0) return false;
      if (feeFilter === 'paid' && ev.fee === 0) return false;
      if (modeFilter === 'online' && ev.mode.toLowerCase() !== 'online') return false;
      if (modeFilter === 'offline' && ev.mode.toLowerCase() !== 'offline') return false;
      return true;
    });
    if (sortBy === 'rating') arr = [...arr].sort((a, b) => b.rating - a.rating);
    else arr = [...arr].sort((a, b) => new Date(a.date) - new Date(b.date));
    return arr;
  }, [events, search, category, feeFilter, modeFilter, sortBy]);

  const activeFilters = [category !== 'All', feeFilter !== 'all', modeFilter !== 'all'].filter(Boolean).length;

  const clearAll = () => { setSearch(''); setCategory('All'); setFeeFilter('all'); setModeFilter('all'); };

  const pill = (active, onClick, label) => (
    <button
      onClick={onClick}
      style={{
        padding: '5px 12px', borderRadius: 20, border: `1px solid ${active ? '#7c3aed' : 'rgba(255,255,255,0.1)'}`, cursor: 'pointer', fontSize: '0.75rem', fontWeight: 500,
        background: active ? 'rgba(124,58,237,0.25)' : 'rgba(255,255,255,0.06)',
        color: active ? '#a78bfa' : '#94a3b8',
      }}
    >{label}</button>
  );

  return (
    <div style={{ paddingTop: 64, paddingBottom: compareList.length > 0 ? 100 : 24 }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '32px 24px' }}>
        <h1 style={{ fontWeight: 800, color: 'white', fontSize: '1.8rem', marginBottom: 6 }}>Discover Events</h1>
        <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginBottom: 24 }}>Filter, search, and find the perfect event for you.</p>

        {/* Top bar */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 12, flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', flex: '1 1 260px' }}>
            <Search size={15} color="#64748b" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Search events by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: '100%', paddingLeft: 38, paddingRight: 14, paddingTop: 11, paddingBottom: 11, borderRadius: 12, border: '1px solid rgba(255,255,255,0.1)', outline: 'none', background: 'rgba(255,255,255,0.06)', color: 'white', fontSize: '0.875rem', boxSizing: 'border-box' }}
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            style={{
              display: 'flex', alignItems: 'center', gap: 6, padding: '11px 16px', borderRadius: 12, border: `1px solid ${activeFilters > 0 ? '#7c3aed' : 'rgba(255,255,255,0.1)'}`, cursor: 'pointer', fontSize: '0.875rem', fontWeight: 500,
              background: activeFilters > 0 ? 'rgba(124,58,237,0.2)' : 'rgba(255,255,255,0.06)',
              color: activeFilters > 0 ? '#a78bfa' : '#94a3b8',
            }}
          >
            <SlidersHorizontal size={15} />
            Filters {activeFilters > 0 && `(${activeFilters})`}
          </button>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{ padding: '11px 14px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.1)', outline: 'none', background: 'rgba(255,255,255,0.06)', color: '#94a3b8', fontSize: '0.875rem', cursor: 'pointer' }}
          >
            <option value="date">Sort: Upcoming</option>
            <option value="rating">Sort: Top Rated</option>
          </select>
        </div>

        {/* Expanded filters */}
        {showFilters && (
          <div style={{ padding: 16, borderRadius: 16, marginBottom: 12, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            <div>
              <p style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 600, marginBottom: 8 }}>CATEGORY</p>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {CATEGORIES.map((c) => pill(category === c, () => setCategory(c), c))}
              </div>
            </div>
            <div>
              <p style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 600, marginBottom: 8 }}>FEE</p>
              <div style={{ display: 'flex', gap: 6 }}>
                {[['all','All'],['free','Free'],['paid','Paid']].map(([v,l]) => pill(feeFilter === v, () => setFeeFilter(v), l))}
              </div>
            </div>
            <div>
              <p style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 600, marginBottom: 8 }}>MODE</p>
              <div style={{ display: 'flex', gap: 6 }}>
                {[['all','All'],['online','Online'],['offline','Offline']].map(([v,l]) => pill(modeFilter === v, () => setModeFilter(v), l))}
              </div>
            </div>
          </div>
        )}

        {/* Category pills */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 24, overflowX: 'auto', paddingBottom: 4 }}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              style={{
                flexShrink: 0, padding: '7px 16px', borderRadius: 20, border: `1px solid ${category === cat ? 'transparent' : 'rgba(255,255,255,0.1)'}`, cursor: 'pointer', fontWeight: 500, fontSize: '0.85rem',
                background: category === cat ? 'linear-gradient(135deg,#7c3aed,#3b82f6)' : 'rgba(255,255,255,0.06)',
                color: category === cat ? 'white' : '#94a3b8',
              }}
            >{cat}</button>
          ))}
        </div>

        <p style={{ color: '#64748b', fontSize: '0.82rem', marginBottom: 20 }}>{filtered.length} event{filtered.length !== 1 ? 's' : ''} found</p>

        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '64px 0' }}>
            <div style={{ fontSize: '3.5rem', marginBottom: 16 }}>🎯</div>
            <h3 style={{ color: 'white', fontWeight: 700, fontSize: '1.2rem', marginBottom: 8 }}>No events match your filters</h3>
            <p style={{ color: '#64748b', fontSize: '0.875rem', marginBottom: 20 }}>Try adjusting your search or filters.</p>
            <button onClick={clearAll} style={{ padding: '10px 22px', borderRadius: 12, border: '1px solid #7c3aed', cursor: 'pointer', background: 'rgba(124,58,237,0.2)', color: '#a78bfa', fontSize: '0.875rem', fontWeight: 600 }}>Clear All Filters</button>
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

      <CompareBar compareList={compareList} events={events} onRemove={onCompare} onGoCompare={() => setPage('compare')} onClearAll={onClearCompare} />
    </div>
  );
}
