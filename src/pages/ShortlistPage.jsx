import React from 'react';
import { Heart } from 'lucide-react';
import EventCard from '../components/EventCard';
import CompareBar from '../components/CompareBar';

export default function ShortlistPage({ events, shortlist, compareList, onEventClick, onShortlist, onCompare, setPage, onClearCompare }) {
  const shortlisted = events.filter((e) => shortlist.includes(e.id));

  return (
    <div style={{ paddingTop: 64, minHeight: '100vh', paddingBottom: compareList.length > 0 ? 100 : 40 }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6 }}>
          <Heart size={26} color="#f87171" fill="#f87171" />
          <h1 style={{ fontWeight: 800, color: 'white', fontSize: '1.8rem' }}>My Shortlist</h1>
        </div>
        <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginBottom: 28 }}>
          {shortlisted.length} event{shortlisted.length !== 1 ? 's' : ''} saved · Add to compare and review them side by side
        </p>

        {shortlisted.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <div style={{ fontSize: '3.5rem', marginBottom: 20 }}>💜</div>
            <h3 style={{ color: 'white', fontWeight: 700, fontSize: '1.2rem', marginBottom: 8 }}>Your shortlist is empty</h3>
            <p style={{ color: '#64748b', fontSize: '0.875rem', marginBottom: 24 }}>
              Click the <Heart size={13} color="#f87171" style={{ display: 'inline', verticalAlign: 'middle' }} /> icon on any event to save it here.
            </p>
            <button
              onClick={() => setPage('discover')}
              style={{ padding: '12px 28px', borderRadius: 14, border: 'none', cursor: 'pointer', background: 'linear-gradient(135deg,#7c3aed,#3b82f6)', color: 'white', fontWeight: 700, fontSize: '0.95rem' }}
            >Browse Events</button>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}>
            {shortlisted.map((ev) => (
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
