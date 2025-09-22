// file: app/dashboard/reviews/write/page.js
'use client';
import { useState } from 'react';
import { FiStar, FiSend } from 'react-icons/fi';

export default function WriteReviewPage() {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">เขียนรีวิวทริปของคุณ</h1>
      <p className="text-gray-600 mb-8">ทัวร์: เทศกาลหิมะ ฮอกไกโด (BK5678)</p>
      
      <form className="p-8 bg-white rounded-lg shadow-md">
        <div className="mb-6">
          <label className="block mb-2 font-semibold">ให้คะแนนความพึงพอใจ</label>
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <FiStar
                key={star}
                className={`cursor-pointer text-4xl transition-colors ${
                  (hoverRating || rating) >= star ? 'text-yellow-400' : 'text-gray-300'
                }`}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(star)}
              />
            ))}
          </div>
        </div>
        <div className="mb-6">
          <label htmlFor="review-title" className="block mb-2 font-semibold">หัวข้อรีวิว</label>
          <input type="text" id="review-title" className="w-full p-3 border rounded-md" placeholder="เช่น ประทับใจมาก!" />
        </div>
        <div className="mb-6">
          <label htmlFor="review-message" className="block mb-2 font-semibold">รายละเอียด</label>
          <textarea id="review-message" rows="8" className="w-full p-3 border rounded-md" placeholder="เล่าประสบการณ์ของคุณ..."></textarea>
        </div>
        <button type="submit" className="flex items-center gap-2 bg-brand-red text-white font-bold py-3 px-6 rounded-lg hover:bg-brand-red-dark">
          <FiSend />
          <span>ส่งรีวิว</span>
        </button>
      </form>
    </div>
  );
}