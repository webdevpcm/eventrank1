# EventRank

> **Discover what's worth attending** — A college event discovery platform.

## Quick Start

```bash
cd C:\Users\avina\.gemini\antigravity\scratch\eventrank
npm install
npm run dev
```

Open **http://localhost:5173** in your browser.

---

## Features

| Feature | Description |
|---|---|
| 🔍 **Discover Events** | Search by name, filter by category / fee / mode, sort by date or rating |
| 📊 **Evaluate Score** | Unique 0–100 score showing how well an event matched its promises |
| ⚖️ **Compare Events** | Select up to 3 events and compare side-by-side with highlighted best values |
| ⭐ **Ratings & Reviews** | Write reviews, update average ratings and Evaluate Scores live |
| ❤️ **Shortlist** | Save events and access them from the My Shortlist page |

## Tech Stack

- **React 18** + **Vite 5**
- **Tailwind CSS 3**
- **Lucide React** icons
- **localStorage** for persistence (no backend required)

## Project Structure

```
src/
├── data/
│   └── events.js          # Sample events + seeded reviews
├── components/
│   ├── Navbar.jsx          # Top navigation bar
│   ├── EventCard.jsx       # Event card with actions
│   ├── EventModal.jsx      # Full event detail modal
│   ├── EvaluateScore.jsx   # Circular score gauge
│   ├── StarRating.jsx      # Interactive star rating
│   ├── CompareBar.jsx      # Fixed bottom compare bar
│   └── Toast.jsx           # Notification toasts
└── pages/
    ├── HomePage.jsx        # Hero + featured events
    ├── DiscoverPage.jsx    # Full search + filter page
    ├── ComparePage.jsx     # Side-by-side comparison table
    └── ShortlistPage.jsx   # Saved events page
```

## Demo Notes

- All data is sample/demo data stored in `src/data/events.js`
- Reviews marked **"Demo"** are seeded content, not real student feedback
- Evaluate Scores are prototype values; they update when new reviews are submitted
- No backend, database, or external API is required
