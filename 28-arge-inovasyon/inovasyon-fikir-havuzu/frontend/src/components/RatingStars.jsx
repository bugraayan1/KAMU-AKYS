import React, { useState } from 'react';

const RatingStars = ({ value, onRate, disabled }) => {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className={`text-2xl ${star <= (hovered || value) ? 'text-yellow-400' : 'text-gray-300'}`}
          onMouseEnter={() => !disabled && setHovered(star)}
          onMouseLeave={() => !disabled && setHovered(0)}
          onClick={() => !disabled && onRate && onRate(star)}
          disabled={disabled}
        >★</button>
      ))}
    </div>
  );
};

export default RatingStars; 