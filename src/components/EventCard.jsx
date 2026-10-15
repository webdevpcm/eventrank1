import React from 'react';
import { Heart, GitCompare, Star, MapPin, Calendar } from 'lucide-react';

export default function EventCard({ event, isShortlisted, isComparing, onEventClick, onShortlist, onCompare }) {
  const scoreColor = event.evaluateScore >= 85 ? '#22c55e' : event.evaluateScore >= 70 ? '#f59e0b' : '#ef4444';

  return (
    <div
      className="card-hover"
      style={{ borderRadius: 20, overflow: 'hidden', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
    >
      {/* Image */}
      <div style={{ position: 'relative', height: 176, overflow: 'hidden', cursor: 'pointer' }} onClick={() => onEventClick(event)}>
        <img
          src={event.image}
          alt={event.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s' }}
          onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
          onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80'; }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,15,30,0.85) 0%, transparent 55%)' }} />
        <div style={{ position: 'absolute', top: 12, left: 12 }}>
          <span style={{ padding: '4px 10px', borderRadius: 20, fontSize: '0.7rem', fontWeight: 600, background: 'rgba(124,58,237,0.85)', color: '#e9d5ff' }}>{event.category}</span>
        </div>
        <div style={{ position: 'absolute', top: 12, right: 12 }}>
          <span style={{ padding: '4px 10px', borderRadius: 20, fontSize: '0.7rem', fontWeight: 600, background: event.fee === 0 ? 'rgba(34,197,94,0.85)' : 'rgba(59,130,246,0.85)', color: 'white' }}>{event.feeDisplay}</span>
        </div>
        <div style={{ position: 'absolute', bottom: 12, right: 12 }}>
          <span style={{ padding: '3px 8px', borderRadius: 6, fontSize: '0.65rem', background: 'rgba(0,0,0,0.65)', color: 'white' }}>{event.mode}</span>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: 16 }}>
        <h3
          onClick={() => onEventClick(event)}
          style={{ fontWeight: 700, color: 'white', fontSize: '0.95rem', marginBottom: 6, cursor: 'pointer', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
        >{event.title}</h3>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <Star size={13} fill="#fbbf24" color="#fbbf24" />
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#fbbf24' }}>{event.rating}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Evaluate:</span>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: scoreColor }}>{event.evaluateScore}/100</span>
          </div>
        </div>

        <div style={{ marginBottom: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
            <Calendar size={11} color="#7c3aed" />
            <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>{event.dateDisplay}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <MapPin size={11} color="#7c3aed" />
            <span style={{ fontSize: '0.72rem', color: '#94a3b8', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{event.venue}</span>
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={() => onEventClick(event)}
            style={{ flex: 1, padding: '9px 0', borderRadius: 12, border: 'none', cursor: 'pointer', background: 'linear-gradient(135deg,#7c3aed,#3b82f6)', color: 'white', fontSize: '0.78rem', fontWeight: 600 }}
          >View Details</button>
          <button
            onClick={(e) => { e.stopPropagation(); onCompare(event.id); }}
            title="Add to Compare"
            style={{
              padding: '9px 12px', borderRadius: 12, cursor: 'pointer', fontSize: '0.78rem', fontWeight: 600,
              background: isComparing ? 'rgba(124,58,237,0.25)' : 'rgba(255,255,255,0.06)',
              border: `1px solid ${isComparing ? '#7c3aed' : 'rgba(255,255,255,0.1)'}`,
              color: isComparing ? '#a78bfa' : '#94a3b8', display: 'flex', alignItems: 'center',
            }}
          ><GitCompare size={14} /></button>
          <button
            onClick={(e) => { e.stopPropagation(); onShortlist(event.id); }}
            title={isShortlisted ? 'Remove from Shortlist' : 'Add to Shortlist'}
            style={{
              padding: '9px 12px', borderRadius: 12, cursor: 'pointer',
              background: isShortlisted ? 'rgba(239,68,68,0.2)' : 'rgba(255,255,255,0.06)',
              border: `1px solid ${isShortlisted ? '#ef4444' : 'rgba(255,255,255,0.1)'}`,
              color: isShortlisted ? '#f87171' : '#94a3b8', display: 'flex', alignItems: 'center',
            }}
          ><Heart size={14} fill={isShortlisted ? '#f87171' : 'none'} /></button>
        </div>
      </div>
    </div>
  );
}
