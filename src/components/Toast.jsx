import React from 'react';
import { CheckCircle, AlertTriangle, Info } from 'lucide-react';

export default function Toast({ msg, type = 'success' }) {
  const colors = {
    success: { bg: 'rgba(34,197,94,0.12)', border: 'rgba(34,197,94,0.35)', icon: <CheckCircle size={18} color="#22c55e" /> },
    warn:    { bg: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.35)', icon: <AlertTriangle size={18} color="#f59e0b" /> },
    info:    { bg: 'rgba(59,130,246,0.12)', border: 'rgba(59,130,246,0.35)', icon: <Info size={18} color="#60a5fa" /> },
  };
  const c = colors[type] || colors.success;

  return (
    <div style={{
      position: 'fixed', bottom: 24, right: 24, zIndex: 9999,
      display: 'flex', alignItems: 'center', gap: 10,
      padding: '14px 20px', borderRadius: 14, minWidth: 240,
      background: c.bg, border: `1px solid ${c.border}`,
      backdropFilter: 'blur(12px)',
      animation: 'slideInRight 0.3s ease',
      boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
    }}>
      {c.icon}
      <span style={{ color: 'white', fontSize: '0.875rem', fontWeight: 500 }}>{msg}</span>
    </div>
  );
}
