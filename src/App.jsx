import React, { useState, useEffect } from 'react';
import { EVENTS, SAMPLE_REVIEWS } from './data/events';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import DiscoverPage from './pages/DiscoverPage';
import ComparePage from './pages/ComparePage';
import ShortlistPage from './pages/ShortlistPage';
import EventModal from './components/EventModal';
import Toast from './components/Toast';

const LS_SHORTLIST = 'er_shortlist_v1';
const LS_REVIEWS = 'er_reviews_v1';

function computeEvents(baseEvents, userReviews) {
  return baseEvents.map((ev) => {
    const base = EVENTS.find((e) => e.id === ev.id);
    const sampleRevs = SAMPLE_REVIEWS[ev.id] || [];
    const userRevs = (userReviews[ev.id] || []).filter((r) => !r.isDemo);
    const allRevs = [...sampleRevs, ...userRevs];
    const avgRating =
      allRevs.length > 0
        ? Math.round((allRevs.reduce((s, r) => s + r.rating, 0) / allRevs.length) * 10) / 10
        : base.rating;
    const baseBreakdown = base.evaluateBreakdown;
    const userPositive = userRevs.filter((r) => r.metPromises).length;
    const newPositive = baseBreakdown.positive + userPositive;
    const newTotal = baseBreakdown.total + userRevs.length;
    const newScore = newTotal > 0 ? Math.round((newPositive / newTotal) * 100) : base.evaluateScore;
    return {
      ...base,
      rating: avgRating,
      evaluateScore: newScore,
      evaluateBreakdown: { positive: newPositive, total: newTotal },
    };
  });
}

export default function App() {
  const [page, setPage] = useState('home');
  const [shortlist, setShortlist] = useState(() => {
    try { return JSON.parse(localStorage.getItem(LS_SHORTLIST)) || []; } catch { return []; }
  });
  const [compareList, setCompareList] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [userReviews, setUserReviews] = useState(() => {
    try { return JSON.parse(localStorage.getItem(LS_REVIEWS)) || {}; } catch { return {}; }
  });
  const [toast, setToast] = useState(null);

  const events = computeEvents(EVENTS, userReviews);

  useEffect(() => { localStorage.setItem(LS_SHORTLIST, JSON.stringify(shortlist)); }, [shortlist]);
  useEffect(() => { localStorage.setItem(LS_REVIEWS, JSON.stringify(userReviews)); }, [userReviews]);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type, key: Date.now() });
    setTimeout(() => setToast(null), 3000);
  };

  const toggleShortlist = (id) => {
    setShortlist((prev) => {
      if (prev.includes(id)) { showToast('Removed from shortlist.', 'info'); return prev.filter((i) => i !== id); }
      showToast('Added to shortlist! ❤️');
      return [...prev, id];
    });
  };

  const toggleCompare = (id) => {
    setCompareList((prev) => {
      if (prev.includes(id)) return prev.filter((i) => i !== id);
      if (prev.length >= 3) { showToast('Max 3 events can be compared.', 'warn'); return prev; }
      showToast('Added to comparison!');
      return [...prev, id];
    });
  };

  const clearCompare = () => setCompareList([]);

  const submitReview = (eventId, review) => {
    const newReview = { ...review, id: `user-${Date.now()}`, date: new Date().toISOString().split('T')[0], isDemo: false };
    setUserReviews((prev) => ({ ...prev, [eventId]: [...(prev[eventId] || []), newReview] }));
    showToast('Review submitted! Thank you! 🎉');
  };

  const getEventReviews = (eventId) => {
    const sampleRevs = SAMPLE_REVIEWS[eventId] || [];
    const userRevs = (userReviews[eventId] || []).filter((r) => !r.isDemo);
    return [...sampleRevs, ...userRevs];
  };

  const selectedEvent = selectedEventId ? events.find((e) => e.id === selectedEventId) : null;

  const navProps = { page, setPage, compareCount: compareList.length, shortlistCount: shortlist.length };
  const cardProps = { shortlist, compareList, onEventClick: (ev) => setSelectedEventId(ev.id), onShortlist: toggleShortlist, onCompare: toggleCompare };

  return (
    <div style={{ minHeight: '100vh', background: '#0a0f1e' }}>
      <Navbar {...navProps} />
      {page === 'home' && <HomePage events={events} {...cardProps} setPage={setPage} compareList={compareList} onClearCompare={clearCompare} />}
      {page === 'discover' && <DiscoverPage events={events} {...cardProps} setPage={setPage} compareList={compareList} onClearCompare={clearCompare} />}
      {page === 'compare' && <ComparePage events={events} compareList={compareList} onRemove={toggleCompare} onClearAll={clearCompare} onEventClick={(ev) => setSelectedEventId(ev.id)} setPage={setPage} />}
      {page === 'shortlist' && <ShortlistPage events={events} {...cardProps} setPage={setPage} compareList={compareList} onClearCompare={clearCompare} />}

      {selectedEvent && (
        <EventModal
          event={selectedEvent}
          reviews={getEventReviews(selectedEvent.id)}
          isShortlisted={shortlist.includes(selectedEvent.id)}
          isComparing={compareList.includes(selectedEvent.id)}
          onClose={() => setSelectedEventId(null)}
          onShortlist={toggleShortlist}
          onCompare={toggleCompare}
          onSubmitReview={submitReview}
          showToast={showToast}
        />
      )}

      {toast && <Toast key={toast.key} msg={toast.msg} type={toast.type} />}
    </div>
  );
}
