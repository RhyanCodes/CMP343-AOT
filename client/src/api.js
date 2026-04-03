const API_BASE = import.meta.env.VITE_API_URL || "";

export async function getEpisodes(season) {
  const url = season ? `${API_BASE}/api/episodes?season=${season}` : `${API_BASE}/api/episodes`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch episodes");
  return res.json();
}

export async function getReviews(episodeId) {
  const res = await fetch(`${API_BASE}/api/reviews/${episodeId}`);
  if (!res.ok) throw new Error("Failed to fetch reviews");
  return res.json();
}

export async function createReview(data) {
  const res = await fetch(`${API_BASE}/api/reviews`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create review");
  return res.json();
}

export async function updateReview(id, data) {
  const res = await fetch(`${API_BASE}/api/reviews/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update review");
  return res.json();
}

export async function deleteReview(id) {
  const res = await fetch(`${API_BASE}/api/reviews/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete review");
  return res.json();
}
