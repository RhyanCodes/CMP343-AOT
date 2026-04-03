import { useState } from "react";
import StarRating from "./StarRating";
import { updateReview, deleteReview } from "./api";

export default function ReviewCard({ review, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [editName, setEditName] = useState(review.reviewer_name);
  const [editRating, setEditRating] = useState(review.rating);
  const [editComment, setEditComment] = useState(review.comment);

  const handleSave = async () => {
    if (!editName.trim() || editRating === 0) return;
    try {
      const updated = await updateReview(review.id, {
        reviewer_name: editName.trim(),
        rating: editRating,
        comment: editComment.trim(),
      });
      onUpdate(updated);
      setEditing(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteReview(review.id);
      onDelete(review.id);
    } catch (err) {
      console.error(err);
    }
  };

  if (editing) {
    return (
      <div className="review-card">
        <div className="edit-form">
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              maxLength={100}
            />
          </div>
          <div className="form-group">
            <label>Rating</label>
            <StarRating value={editRating} onChange={setEditRating} />
          </div>
          <div className="form-group">
            <label>Comment</label>
            <textarea
              value={editComment}
              onChange={(e) => setEditComment(e.target.value)}
            />
          </div>
          <div className="edit-actions">
            <button className="save-btn" onClick={handleSave}>Save</button>
            <button className="cancel-btn" onClick={() => setEditing(false)}>Cancel</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="review-card">
      <div className="review-header">
        <span className="reviewer-name">{review.reviewer_name}</span>
        <span className="review-rating">{"★".repeat(review.rating)}{"☆".repeat(10 - review.rating)} {review.rating}/10</span>
      </div>
      {review.comment && <p className="review-comment">{review.comment}</p>}
      <span className="review-date">
        {new Date(review.created_at).toLocaleDateString()}
      </span>
      <div className="review-actions">
        <button className="edit-btn" onClick={() => setEditing(true)}>Edit</button>
        <button className="delete-btn" onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
}
