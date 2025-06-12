"use client"

import { Star } from 'lucide-react';

/**
 * คอมโพเนนต์แสดงคะแนนดาว - พร้อม animation
 * @param {number} rating - คะแนน (1-5)
 * @param {number} totalReviews - จำนวนรีวิวทั้งหมด
 * @param {string} size - ขนาด (xs, sm, md, lg)
 */
const StarRating = ({ rating, totalReviews = 0, size = 'sm' }) => {
  const iconSizes = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4', 
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const textSizes = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${iconSizes[size]} transition-colors duration-200 ${
              star <= rating 
                ? 'text-yellow-400 fill-current drop-shadow-sm' 
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
      <div className={`${textSizes[size]} text-gray-600 font-medium`}>
        <span className="text-gray-900">{rating.toFixed(1)}</span>
        <span className="text-gray-500 ml-1">({totalReviews.toLocaleString()} รีวิว)</span>
      </div>
    </div>
  );
};

export default StarRating;