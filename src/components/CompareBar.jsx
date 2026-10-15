import React from 'react';
import { GitCompare, X } from 'lucide-react';

export default function CompareBar({ compareList, events, onRemove, onGoCompare, onClearAll }) {
  if (compareList.length === 0) return null;
  const selected = events.filter((e) => compareList.includes(e.id));

  return (
    <div style={{
      position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 40,
      background: 'rgba(13,21,38,0.98)', borderTop: '1px solid rgba(124,58,237,0.4)',
      backdropFilter: 'blur(12px)',
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '12px 24px', display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
        <GitCompare size={18} color="#7c3aed" />
        <span style={{ color: 'white', fontSize: '0.875rem', fontWeight: 600 }}>{compareList.length}/3</span>
        <div style={{ display: 'flex', gap: 8, flex: 1, flexWrap: 'wrap' }}>
          {selected.map((ev) => (
            <div key={ev.id} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 12px', borderRadius: 8, background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.3)' }}>
              <span style={{ fontSize: '0.75rem', color: '#a78bfa', fontWeight: 500 }}>{ev.title}</span>
              <button onClick={() => onRemove(ev.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b', display: 'flex', padding: 0 }}><X size={12} /></button>
            </div>
          ))}
        </div>
        <button onClick={onClearAll} style={{ padding: '7px 14px', borderRadius: 10, border: 'none', cursor: 'pointer', background: 'rgba(255,255,255,0.06)', color: '#94a3b8', fontSize: '0.8rem' }}>Clear All</button>
        <button
          onClick={onGoCompare}
          disabled={compareList.length < 2}
          style={{
            padding: '9px 20px', borderRadius: 12, border: 'none', cursor: compareList.length < 2 ? 'not-allowed' : 'pointer',
            background: 'linear-gradient(135deg,#7c3aed,#3b82f6)', color: 'white', fontSize: '0.875rem', fontWeight: 600,
            opacity: compareList.length < 2 ? 0.45 : 1,
          }}
        >
          Compare Events
        </button>
      </div>
    </div>
  );
}
