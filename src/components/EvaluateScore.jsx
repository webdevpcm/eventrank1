import React, { useState } from 'react';
import { Info } from 'lucide-react';

export default function EvaluateScore({ score, breakdown }) {
  const [showTip, setShowTip] = useState(false);
  const color = score >= 85 ? '#22c55e' : score >= 70 ? '#f59e0b' : '#ef4444';
  const label = score >= 85 ? 'Excellent Match' : score >= 70 ? 'Good Match' : 'Needs Review';

  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: 20 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
        <span style={{ fontWeight: 700, color: 'white', fontSize: '0.875rem' }}>Evaluate Score</span>
        <div style={{ position: 'relative' }}>
          <button
            onMouseEnter={() => setShowTip(true)}
            onMouseLeave={() => setShowTip(false)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', display: 'flex' }}
          >
            <Info size={14} />
          </button>
          {showTip && (
            <div style={{
              position: 'absolute', left: 20, top: 0, zIndex: 10, width: 220,
              background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 10, padding: 10, fontSize: '0.75rem', color: '#cbd5e1',
            }}>
              Measures how well an event matched its promises based on aggregated student feedback.
            </div>
          )}
        </div>
        <span style={{ marginLeft: 'auto', fontSize: '0.7rem', padding: '2px 8px', borderRadius: 20, background: 'rgba(124,58,237,0.2)', color: '#a78bfa' }}>
          Demo Score
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        {/* SVG Circle */}
        <div style={{ position: 'relative', flexShrink: 0 }}>
          <svg width="96" height="96" viewBox="0 0 96 96">
            <circle cx="48" cy="48" r={radius} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
            <circle
              cx="48" cy="48" r={radius}
              fill="none" stroke={color} strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              transform="rotate(-90 48 48)"
              style={{ transition: 'stroke-dashoffset 1s ease' }}
            />
          </svg>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontWeight: 800, fontSize: '1.4rem', color }}>{score}</span>
            <span style={{ fontSize: '0.65rem', color: '#94a3b8' }}>/100</span>
          </div>
        </div>

        {/* Details */}
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700, color, marginBottom: 4, fontSize: '0.9rem' }}>{label}</div>
          <p style={{ color: '#94a3b8', fontSize: '0.75rem', marginBottom: 10, lineHeight: 1.5 }}>
            Based on student feedback about whether the event met its stated promises.
          </p>
          {breakdown && (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: 4 }}>
                <span style={{ color: '#94a3b8' }}>Positive feedback</span>
                <span style={{ color: '#22c55e', fontWeight: 600 }}>{breakdown.positive} / {breakdown.total}</span>
              </div>
              <div style={{ height: 6, borderRadius: 3, background: 'rgba(255,255,255,0.08)' }}>
                <div style={{ height: '100%', borderRadius: 3, background: color, width: `${(breakdown.positive / breakdown.total) * 100}%`, transition: 'width 0.7s ease' }} />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
