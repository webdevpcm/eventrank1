import React, { useState } from 'react';
import { Star } from 'lucide-react';

export default function StarRating({ value = 0, onChange, size = 18, readonly = false }) {
  const [hover, setHover] = useState(0);
  return (
    <div style={{ display: 'flex', gap: 2 }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => !readonly && onChange && onChange(star)}
          onMouseEnter={() => !readonly && setHover(star)}
          onMouseLeave={() => !readonly && setHover(0)}
          style={{ background: 'none', border: 'none', padding: 0, cursor: readonly ? 'default' : 'pointer', transition: 'transform 0.1s', display: 'flex' }}
          onMouseDown={(e) => { if (!readonly) e.currentTarget.style.transform = 'scale(1.2)'; }}
          onMouseUp={(e) => { if (!readonly) e.currentTarget.style.transform = 'scale(1)'; }}
        >
          <Star
            size={size}
            fill={(hover || value) >= star ? '#fbbf24' : 'none'}
            color={(hover || value) >= star ? '#fbbf24' : '#374151'}
          />
        </button>
      ))}
    </div>
  );
}
