import { useState } from "react";
import StarRating from "./StarRating";
import { createReview } from "./api";

export default function ReviewForm({ episodeId, onReviewAdded }) {
  const [reviewerName, setReviewerName] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!reviewerName.trim() || rating === 0) return;
    setSubmitting(true);
    try {
      const newReview = await createReview({
        episode_id: episodeId,
        reviewer_name: reviewerName.trim(),
        rating,
        comment: comment.trim(),
      });
      onReviewAdded(newReview);
      setReviewerName("");
      setRating(0);
      setComment("");
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="review-form" onSubmit={handleSubmit}>
      <h3>Leave a Review</h3>

      <div className="form-group">
        <label>Your Name</label>
        <input
          type="text"
          value={reviewerName}
          onChange={(e) => setReviewerName(e.target.value)}
          placeholder="Enter your name"
          maxLength={100}
          required
        />
      </div>

      <div className="form-group">
        <label>Rating (1-10)</label>
        <StarRating value={rating} onChange={setRating} />
      </div>

      <div className="form-group">
        <label>Comment (optional)</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="What did you think of this episode?"
        />
      </div>

      <button className="submit-btn" type="submit" disabled={submitting}>
        {submitting ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
}
