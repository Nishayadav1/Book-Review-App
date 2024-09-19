import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './ReviewFrom.css'; // Assuming you have a CSS file for styling

const ReviewPage = () => {
  const location = useLocation();
  const { book } = location.state || {};

  const [rating, setRating] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [reviews, setReviews] = useState([]); // State for previous reviews
  const [timestamp, setTimestamp] = useState(''); // State for live review timestamp

  if (!book) {
    return <p>No book details found</p>;
  }

  // Form handlers
  const handleRatingChange = (e) => {
    setRating(e.target.value);
  };

  const handleReviewTextChange = (e) => {
    setReviewText(e.target.value);
    setTimestamp(new Date().toLocaleString()); // Capture the current date and time
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating && reviewText) {
      // Add the current review along with timestamp to the list of previous reviews
      const newReview = {
        rating,
        reviewText,
        timestamp: new Date().toLocaleString() // Capture the current date and time
      };
      setReviews([...reviews, newReview]);
      setRating(''); // Clear the rating
      setReviewText(''); // Clear the review text
      setTimestamp(''); // Clear the live preview timestamp
    }
  };

  return (
    <div className="main">
      <div className="review-page">
        <h1>{book.volumeInfo.title}</h1>
        <img src={book.volumeInfo.imageLinks?.thumbnail} alt={book.volumeInfo.title} />
        <p><strong>Author(s):</strong> {book.volumeInfo.authors ? book.volumeInfo.authors.join(", ") : "Unknown Author"}</p>
        <p><strong>Description:</strong> {book.volumeInfo.description || "No description available."}</p>

        {/* Review Form */}
        <div className="review-form">
          <h2>Leave a Review</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor={`rating-${book.id}`}>Rating:</label>
            <select id={`rating-${book.id}`} value={rating} onChange={handleRatingChange}>
              <option value="">Select Rating</option>
              <option value="1">⭐</option>
              <option value="2">⭐⭐</option>
              <option value="3">⭐⭐⭐</option>
              <option value="4">⭐⭐⭐⭐</option>
              <option value="5">⭐⭐⭐⭐⭐</option>
            </select>

            <label htmlFor={`review-${book.id}`}>Your Review:</label>
            <textarea
              id={`review-${book.id}`}
              rows="4"
              value={reviewText}
              onChange={handleReviewTextChange}
              placeholder="Write your review..."
            ></textarea>

            <button type="submit">Submit Review</button>
          </form>
        </div>
      </div>

      <div className="reviewchats">
        {/* Display Previous Reviews */}
        <div className="previous-reviews">
          <h2>Previous Reviews</h2>
          {reviews.length === 0 ? (
            <p>No reviews yet.</p>
          ) : (
            <ul>
              {reviews.map((review, index) => (
                <li key={index}>
                  <p><strong>Rating:</strong> {Array(Number(review.rating)).fill('⭐').join('')}</p>
                  <p><strong>Review:</strong> {review.reviewText}</p>
                  <p><em>Date:</em> {review.timestamp}</p> {/* Display date and time */}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Live Review Preview */}
        {(rating || reviewText) && (
          <div className="review-chats">
            <h2>Live Review Preview</h2>
            {reviewText && <p><strong>Review:</strong> {reviewText}</p>}
            {rating && <p><strong>Rating:</strong> {Array(Number(rating)).fill('⭐').join('')}</p>}
            {timestamp && <p><em>Date:</em> {timestamp}</p>} {/* Display live date and time */}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewPage;
