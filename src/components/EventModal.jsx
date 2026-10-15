import React, { useState } from 'react';
import { X, Heart, GitCompare, MapPin, Calendar, Users, Tag, Star, Send, Award, CheckCircle } from 'lucide-react';
import StarRating from './StarRating';
import EvaluateScore from './EvaluateScore';

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'highest', label: 'Highest Rated' },
  { value: 'lowest', label: 'Lowest Rated' },
];

export default function EventModal({
  event, reviews, isShortlisted, isComparing,
  onClose, onShortlist, onCompare, onSubmitReview, showToast,
}) {
  const [reviewSort, setReviewSort] = useState('newest');
  const [form, setForm] = useState({ rating: 0, text: '', metPromises: true });
  const [formError, setFormError] = useState('');
  const [showRegModal, setShowRegModal] = useState(false);

  const avgRating =
    reviews.length > 0
      ? Math.round((reviews.reduce((s, r) => s + r.rating, 0) / reviews.length) * 10) / 10
      : event.rating;

  const sortedReviews = [...reviews].sort((a, b) => {
    if (reviewSort === 'newest') return new Date(b.date) - new Date(a.date);
    if (reviewSort === 'highest') return b.rating - a.rating;
    return a.rating - b.rating;
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.rating === 0) { setFormError('Please select a star rating.'); return; }
    if (form.text.trim().length < 10) { setFormError('Please write at least 10 characters.'); return; }
    setFormError('');
    onSubmitReview(event.id, { author: 'You', rating: form.rating, text: form.text.trim(), metPromises: form.metPromises });
    setForm({ rating: 0, text: '', metPromises: true });
  };

  const scoreColor = event.evaluateScore >= 85 ? '#22c55e' : event.evaluateScore >= 70 ? '#f59e0b' : '#ef4444';

  const details = [
    { icon: <Calendar size={14} color="#7c3aed" />, label: 'Date', val: event.dateDisplay },
    { icon: <MapPin size={14} color="#7c3aed" />, label: 'Venue', val: event.venue },
    { icon: <Tag size={14} color="#7c3aed" />, label: 'Fee', val: event.feeDisplay },
    { icon: <Users size={14} color="#7c3aed" />, label: 'Eligibility', val: event.eligibility },
    { icon: <Award size={14} color="#7c3aed" />, label: 'Prizes', val: event.prizes },
    { icon: <CheckCircle size={14} color="#7c3aed" />, label: 'Mode', val: event.mode },
  ];

  return (
    <div
      style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '72px 16px 16px', background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}
    >
      <div
        className="animate-fade-in"
        style={{ width: '100%', maxWidth: 680, borderRadius: 24, overflow: 'hidden', background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', maxHeight: '88vh', overflowY: 'auto' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Hero image */}
        <div style={{ position: 'relative', height: 220 }}>
          <img
            src={event.image} alt={event.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80'; }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #0f172a 0%, rgba(15,23,42,0.35) 60%, transparent 100%)' }} />
          <button
            onClick={onClose}
            style={{ position: 'absolute', top: 16, right: 16, width: 32, height: 32, borderRadius: '50%', background: 'rgba(0,0,0,0.65)', border: 'none', cursor: 'pointer', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          ><X size={16} /></button>
          <div style={{ position: 'absolute', top: 16, left: 16, display: 'flex', gap: 8 }}>
            <span style={{ padding: '4px 10px', borderRadius: 20, fontSize: '0.7rem', fontWeight: 600, background: 'rgba(124,58,237,0.85)', color: '#e9d5ff' }}>{event.category}</span>
            <span style={{ padding: '4px 10px', borderRadius: 20, fontSize: '0.7rem', fontWeight: 600, background: event.fee === 0 ? 'rgba(34,197,94,0.85)' : 'rgba(59,130,246,0.85)', color: 'white' }}>{event.feeDisplay}</span>
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: 28 }}>
          {/* Title + actions */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16, gap: 12 }}>
            <div>
              <h2 style={{ fontWeight: 800, color: 'white', fontSize: '1.4rem', marginBottom: 4 }}>{event.title}</h2>
              <p style={{ color: '#94a3b8', fontSize: '0.8rem' }}>by {event.organizer}</p>
            </div>
            <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
              <button onClick={() => onCompare(event.id)} title="Compare" style={{ padding: '8px 12px', borderRadius: 12, border: `1px solid ${isComparing ? '#7c3aed' : 'rgba(255,255,255,0.1)'}`, background: isComparing ? 'rgba(124,58,237,0.25)' : 'rgba(255,255,255,0.06)', cursor: 'pointer', color: isComparing ? '#a78bfa' : '#94a3b8', display: 'flex' }}>
                <GitCompare size={16} />
              </button>
              <button onClick={() => onShortlist(event.id)} title="Shortlist" style={{ padding: '8px 12px', borderRadius: 12, border: `1px solid ${isShortlisted ? '#ef4444' : 'rgba(255,255,255,0.1)'}`, background: isShortlisted ? 'rgba(239,68,68,0.2)' : 'rgba(255,255,255,0.06)', cursor: 'pointer', color: isShortlisted ? '#f87171' : '#94a3b8', display: 'flex' }}>
                <Heart size={16} fill={isShortlisted ? '#f87171' : 'none'} />
              </button>
            </div>
          </div>

          {/* Rating row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20, padding: 12, borderRadius: 12, background: 'rgba(255,255,255,0.03)' }}>
            <StarRating value={Math.round(avgRating)} readonly size={15} />
            <span style={{ fontWeight: 700, color: '#fbbf24' }}>{avgRating}</span>
            <span style={{ fontSize: '0.75rem', color: '#64748b' }}>({reviews.length} reviews)</span>
            <div style={{ marginLeft: 'auto', fontSize: '0.8rem' }}>
              <span style={{ fontWeight: 700, color: scoreColor }}>{event.evaluateScore}/100</span>
              <span style={{ color: '#64748b' }}> Evaluate</span>
            </div>
          </div>

          {/* Description */}
          <p style={{ color: '#cbd5e1', fontSize: '0.875rem', lineHeight: 1.7, marginBottom: 20 }}>{event.description}</p>

          {/* Details grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
            {details.map(({ icon, label, val }) => (
              <div key={label} style={{ padding: 12, borderRadius: 12, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>{icon}<span style={{ fontSize: '0.7rem', color: '#64748b' }}>{label}</span></div>
                <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'white' }}>{val}</span>
              </div>
            ))}
          </div>

          {/* Tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
            {event.tags.map((tag) => (
              <span key={tag} style={{ padding: '4px 10px', borderRadius: 20, fontSize: '0.72rem', background: 'rgba(124,58,237,0.15)', color: '#a78bfa', border: '1px solid rgba(124,58,237,0.3)' }}>{tag}</span>
            ))}
          </div>

          {/* Evaluate Score */}
          <div style={{ marginBottom: 20 }}>
            <EvaluateScore score={event.evaluateScore} breakdown={event.evaluateBreakdown} />
          </div>

          {/* Register button */}
          <button
            onClick={() => setShowRegModal(true)}
            style={{ width: '100%', padding: '14px', borderRadius: 14, border: 'none', cursor: 'pointer', background: 'linear-gradient(135deg,#7c3aed,#3b82f6)', color: 'white', fontSize: '0.95rem', fontWeight: 700, marginBottom: 28 }}
          >
            Register Now →
          </button>

          {/* Reviews */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <h3 style={{ fontWeight: 700, color: 'white', fontSize: '1rem' }}>
                Reviews <span style={{ fontWeight: 400, color: '#64748b', fontSize: '0.85rem' }}>({reviews.length})</span>
              </h3>
              <select
                value={reviewSort}
                onChange={(e) => setReviewSort(e.target.value)}
                style={{ padding: '6px 12px', borderRadius: 8, border: 'none', outline: 'none', background: 'rgba(255,255,255,0.06)', color: '#94a3b8', fontSize: '0.78rem', cursor: 'pointer' }}
              >
                {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
              {sortedReviews.length === 0 && (
                <p style={{ textAlign: 'center', padding: '20px 0', color: '#64748b', fontSize: '0.875rem' }}>No reviews yet. Be the first to write one!</p>
              )}
              {sortedReviews.map((review, i) => (
                <div key={review.id || i} style={{ padding: 16, borderRadius: 14, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 8 }}>
                    <div>
                      <span style={{ fontWeight: 600, color: 'white', fontSize: '0.875rem' }}>{review.author}</span>
                      {review.isDemo && (
                        <span style={{ marginLeft: 6, fontSize: '0.65rem', padding: '2px 6px', borderRadius: 4, background: 'rgba(100,116,139,0.3)', color: '#94a3b8' }}>Demo</span>
                      )}
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
                        <StarRating value={review.rating} readonly size={12} />
                        <span style={{ fontSize: '0.7rem', color: '#64748b' }}>{review.date}</span>
                      </div>
                    </div>
                    {review.metPromises !== undefined && (
                      <span style={{ fontSize: '0.68rem', padding: '3px 8px', borderRadius: 20, background: review.metPromises ? 'rgba(34,197,94,0.12)' : 'rgba(239,68,68,0.12)', color: review.metPromises ? '#22c55e' : '#ef4444', flexShrink: 0 }}>
                        {review.metPromises ? '✓ Met promises' : '✗ Didn\'t meet'}
                      </span>
                    )}
                  </div>
                  <p style={{ color: '#cbd5e1', fontSize: '0.82rem', lineHeight: 1.6 }}>{review.text}</p>
                </div>
              ))}
            </div>

            {/* Write review form */}
            <div style={{ padding: 20, borderRadius: 18, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <h4 style={{ fontWeight: 700, color: 'white', marginBottom: 16, fontSize: '0.95rem' }}>Write a Review</h4>
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div>
                  <label style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 500, display: 'block', marginBottom: 8 }}>Your Rating *</label>
                  <StarRating value={form.rating} onChange={(r) => setForm((f) => ({ ...f, rating: r }))} size={24} />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 500, display: 'block', marginBottom: 8 }}>Your Review *</label>
                  <textarea
                    value={form.text}
                    onChange={(e) => setForm((f) => ({ ...f, text: e.target.value }))}
                    placeholder="Share your experience with this event..."
                    rows={3}
                    style={{ width: '100%', padding: '12px 14px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.1)', outline: 'none', background: 'rgba(255,255,255,0.05)', color: 'white', fontSize: '0.875rem', resize: 'vertical', fontFamily: 'inherit', boxSizing: 'border-box' }}
                  />
                </div>
                <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={form.metPromises}
                    onChange={(e) => setForm((f) => ({ ...f, metPromises: e.target.checked }))}
                    style={{ width: 16, height: 16, accentColor: '#7c3aed', cursor: 'pointer' }}
                  />
                  <span style={{ fontSize: '0.875rem', color: '#94a3b8' }}>This event met its stated promises</span>
                </label>
                {formError && <p style={{ color: '#ef4444', fontSize: '0.78rem' }}>{formError}</p>}
                <button
                  type="submit"
                  style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 20px', borderRadius: 12, border: 'none', cursor: 'pointer', background: 'linear-gradient(135deg,#7c3aed,#3b82f6)', color: 'white', fontSize: '0.875rem', fontWeight: 600, width: 'fit-content' }}
                >
                  <Send size={14} /> Submit Review
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Registration confirm modal */}
      {showRegModal && (
        <div
          style={{ position: 'fixed', inset: 0, zIndex: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.65)' }}
          onClick={() => setShowRegModal(false)}
        >
          <div
            style={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 24, padding: 32, maxWidth: 360, width: '90%', textAlign: 'center' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(124,58,237,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <CheckCircle size={32} color="#a78bfa" />
            </div>
            <h3 style={{ color: 'white', fontWeight: 800, fontSize: '1.15rem', marginBottom: 8 }}>Confirm Registration</h3>
            <p style={{ color: '#a78bfa', fontWeight: 600, marginBottom: 6 }}>{event.title}</p>
            <p style={{ color: '#64748b', fontSize: '0.82rem', marginBottom: 24 }}>You'll be redirected to the official registration page.</p>
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => setShowRegModal(false)} style={{ flex: 1, padding: '11px', borderRadius: 12, border: 'none', cursor: 'pointer', background: 'rgba(255,255,255,0.06)', color: '#94a3b8', fontWeight: 600 }}>Cancel</button>
              <button
                onClick={() => { showToast('Registration initiated! Check your email. 🎉'); setShowRegModal(false); }}
                style={{ flex: 1, padding: '11px', borderRadius: 12, border: 'none', cursor: 'pointer', background: 'linear-gradient(135deg,#7c3aed,#3b82f6)', color: 'white', fontWeight: 600 }}
              >Confirm</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
