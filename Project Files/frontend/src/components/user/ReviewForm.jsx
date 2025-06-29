import React, { useState } from 'react';
import axios from 'axios';

const ReviewForm = ({ doctorId, userId, onReviewSubmitted }) => {
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      await axios.post(
        `http://localhost:5000/api/user/review/${doctorId}`,
        { rating, comment, userId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Review submitted!");
      setRating('');
      setComment('');
      onReviewSubmitted(); // refresh list
    } catch (err) {
      console.error('Review Error:', err.response?.data || err.message);
      alert("Failed to submit review");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="review-form">
      <h4>Leave a Review</h4>
      <select value={rating} onChange={(e) => setRating(e.target.value)} required>
        <option value="">Rating</option>
        {[5, 4, 3, 2, 1].map(n => (
          <option key={n} value={n}>{n}</option>
        ))}
      </select>
      <textarea
        placeholder="Write a comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        required
      ></textarea>
      <button type="submit">Submit Review</button>
    </form>
  );
};

export default ReviewForm;
