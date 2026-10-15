import React from 'react';
import { X, Star, Award, Trash2 } from 'lucide-react';

function ScoreBar({ score }) {
  const color = score >= 85 ? '#22c55e' : score >= 70 ? '#f59e0b' : '#ef4444';
  return (
    <div>
      <span style={{ fontWeight: 700, color, fontSize: '0.85rem' }}>{score}/100</span>
      <div style={{ height: 6, borderRadius: 3, background: 'rgba(255,255,255,0.08)', marginTop: 4 }}>
        <div style={{ height: '100%', borderRadius: 3, background: color, width: `${score}%`, transition: 'width 0.7s ease' }} />
      </div>
    </div>
  );
}

export default function ComparePage({ events, compareList, onRemove, onClearAll, onEventClick, setPage }) {
  const selected = events.filter((e) => compareList.includes(e.id));

  if (selected.length === 0) {
    return (
      <div style={{ paddingTop: 64, minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ fontSize: '4rem', marginBottom: 20 }}>⚖️</div>
        <h2 style={{ color: 'white', fontWeight: 800, fontSize: '1.5rem', marginBottom: 8 }}>No Events Selected</h2>
        <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginBottom: 24, textAlign: 'center', maxWidth: 360 }}>
          Add events to compare using the <strong style={{ color: '#a78bfa' }}>⊕ Compare</strong> button on event cards.
        </p>
        <button onClick={() => setPage('discover')} style={{ padding: '12px 28px', borderRadius: 14, border: 'none', cursor: 'pointer', background: 'linear-gradient(135deg,#7c3aed,#3b82f6)', color: 'white', fontWeight: 700, fontSize: '0.95rem' }}>Browse Events</button>
      </div>
    );
  }

  const maxRating = Math.max(...selected.map((e) => e.rating));
  const maxScore = Math.max(...selected.map((e) => e.evaluateScore));
  const minFee = Math.min(...selected.map((e) => e.fee));

  const rows = [
    { label: 'Date', key: 'dateDisplay' },
    { label: 'Fee', key: 'feeDisplay', highlight: (e) => e.fee === minFee && selected.length > 1 },
    { label: 'Mode', key: 'mode' },
    { label: 'Venue', key: 'venue' },
    { label: 'Eligibility', key: 'eligibility' },
    { label: 'Organizer', key: 'organizer' },
    { label: 'Prizes', key: 'prizes' },
    {
      label: 'Star Rating',
      render: (e) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <Star size={14} fill="#fbbf24" color="#fbbf24" />
          <span style={{ fontWeight: 700 }}>{e.rating}</span>
        </div>
      ),
      highlight: (e) => e.rating === maxRating && selected.length > 1,
    },
    {
      label: 'Evaluate Score',
      render: (e) => <ScoreBar score={e.evaluateScore} />,
      highlight: (e) => e.evaluateScore === maxScore && selected.length > 1,
    },
  ];

  const colW = `${Math.floor(85 / selected.length)}%`;

  return (
    <div style={{ paddingTop: 64, paddingBottom: 48 }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '32px 24px' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24 }}>
          <div>
            <h1 style={{ fontWeight: 800, color: 'white', fontSize: '1.8rem', marginBottom: 6 }}>Compare Events</h1>
            <p style={{ color: '#94a3b8', fontSize: '0.875rem' }}>Side-by-side comparison. Highlighted cells indicate the best value.</p>
          </div>
          <button
            onClick={onClearAll}
            style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '9px 16px', borderRadius: 12, border: '1px solid rgba(239,68,68,0.35)', cursor: 'pointer', background: 'rgba(239,68,68,0.1)', color: '#f87171', fontWeight: 600, fontSize: '0.8rem', flexShrink: 0 }}
          >
            <Trash2 size={14} /> Clear All
          </button>
        </div>

        {selected.length < 3 && (
          <div style={{ marginBottom: 20, padding: '12px 20px', borderRadius: 12, background: 'rgba(124,58,237,0.1)', border: '1px dashed rgba(124,58,237,0.4)', color: '#a78bfa', fontSize: '0.85rem', textAlign: 'center' }}>
            You can compare up to 3 events.{' '}
            <button onClick={() => setPage('discover')} style={{ background: 'none', border: 'none', color: '#a78bfa', cursor: 'pointer', textDecoration: 'underline', fontWeight: 600 }}>Add more →</button>
          </div>
        )}

        {/* Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0 }}>
            <thead>
              <tr>
                <th style={{ width: '15%', textAlign: 'left', paddingBottom: 16, color: '#64748b', fontSize: '0.75rem', fontWeight: 600, verticalAlign: 'bottom' }}>Attribute</th>
                {selected.map((ev) => (
                  <th key={ev.id} style={{ width: colW, padding: '0 8px 16px', verticalAlign: 'top' }}>
                    <div style={{ borderRadius: 18, overflow: 'hidden', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                      <div style={{ position: 'relative', height: 110 }}>
                        <img
                          src={ev.image} alt={ev.title}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80'; }}
                        />
                        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,15,30,0.85), transparent)' }} />
                        <button
                          onClick={() => onRemove(ev.id)}
                          style={{ position: 'absolute', top: 8, right: 8, width: 24, height: 24, borderRadius: '50%', background: 'rgba(0,0,0,0.65)', border: 'none', cursor: 'pointer', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        ><X size={12} /></button>
                      </div>
                      <div style={{ padding: '12px 14px', textAlign: 'left' }}>
                        <div style={{ fontWeight: 700, color: 'white', fontSize: '0.875rem', marginBottom: 4, lineHeight: 1.3 }}>{ev.title}</div>
                        <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginBottom: 8 }}>{ev.category} · {ev.feeDisplay}</div>
                        <button
                          onClick={() => onEventClick(ev)}
                          style={{ fontSize: '0.72rem', padding: '4px 10px', borderRadius: 8, border: 'none', cursor: 'pointer', background: 'rgba(124,58,237,0.2)', color: '#a78bfa', fontWeight: 600 }}
                        >View Details</button>
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.label}>
                  <td style={{ padding: '10px 0', verticalAlign: 'middle' }}>
                    <span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#64748b' }}>{row.label}</span>
                  </td>
                  {selected.map((ev) => {
                    const highlighted = row.highlight ? row.highlight(ev) : false;
                    return (
                      <td key={ev.id} style={{ padding: '10px 8px', verticalAlign: 'middle' }}>
                        <div style={{
                          padding: '10px 12px', borderRadius: 12, fontSize: '0.82rem',
                          background: highlighted ? 'rgba(34,197,94,0.1)' : 'rgba(255,255,255,0.03)',
                          border: `1px solid ${highlighted ? 'rgba(34,197,94,0.35)' : 'rgba(255,255,255,0.06)'}`,
                          color: highlighted ? '#4ade80' : '#cbd5e1',
                          fontWeight: highlighted ? 600 : 400,
                        }}>
                          {row.render ? row.render(ev) : (ev[row.key] || '—')}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
