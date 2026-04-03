import { useState, useEffect } from "react";
import { getReviews } from "./api";
import ReviewForm from "./ReviewForm";
import ReviewCard from "./ReviewCard";

export default function ReviewPanel({ episode, onBack }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getReviews(episode.id)
      .then((data) => setReviews(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [episode.id]);

  const handleReviewAdded = (newReview) => {
    setReviews((prev) => [newReview, ...prev]);
  };

  const handleReviewUpdated = (updated) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === updated.id ? updated : r))
    );
  };

  const handleReviewDeleted = (id) => {
    setReviews((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div className="review-panel">
      <button className="back-btn" onClick={onBack}>
        ← Back to Episodes
      </button>
      <h2>{episode.title}</h2>

      <ReviewForm episodeId={episode.id} onReviewAdded={handleReviewAdded} />

      <div className="reviews-list">
        <h3>Reviews ({reviews.length})</h3>
        {loading ? (
          <p style={{ color: "#888" }}>Loading reviews...</p>
        ) : reviews.length === 0 ? (
          <p className="no-reviews">No reviews yet. Be the first!</p>
        ) : (
          reviews.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
              onUpdate={handleReviewUpdated}
              onDelete={handleReviewDeleted}
            />
          ))
        )}
      </div>
    </div>
  );
}
