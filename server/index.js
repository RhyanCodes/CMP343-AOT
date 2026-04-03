try { require("dotenv").config({ path: "../.env" }); } catch(e) {}
const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: true }));
app.use(express.json());

/* ───── EPISODES ───── */

// GET all episodes (optionally filter by season)
app.get("/api/episodes", async (req, res) => {
  try {
    const { season } = req.query;
    let result;
    if (season) {
      result = await pool.query(
        "SELECT * FROM episodes WHERE season = $1 ORDER BY episode_number",
        [season]
      );
    } else {
      result = await pool.query("SELECT * FROM episodes ORDER BY season, episode_number");
    }
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// GET single episode
app.get("/api/episodes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM episodes WHERE id = $1", [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: "Episode not found" });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

/* ───── REVIEWS  (full CRUD) ───── */

// CREATE a review
app.post("/api/reviews", async (req, res) => {
  try {
    const { episode_id, reviewer_name, rating, comment } = req.body;
    if (!episode_id || !reviewer_name || !rating) {
      return res.status(400).json({ error: "episode_id, reviewer_name, and rating are required" });
    }
    const result = await pool.query(
      `INSERT INTO reviews (episode_id, reviewer_name, rating, comment)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [episode_id, reviewer_name, rating, comment || ""]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// READ reviews for an episode
app.get("/api/reviews/:episodeId", async (req, res) => {
  try {
    const { episodeId } = req.params;
    const result = await pool.query(
      "SELECT * FROM reviews WHERE episode_id = $1 ORDER BY created_at DESC",
      [episodeId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// UPDATE a review
app.put("/api/reviews/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { reviewer_name, rating, comment } = req.body;
    const result = await pool.query(
      `UPDATE reviews SET reviewer_name = $1, rating = $2, comment = $3
       WHERE id = $4 RETURNING *`,
      [reviewer_name, rating, comment, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: "Review not found" });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// DELETE a review
app.delete("/api/reviews/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("DELETE FROM reviews WHERE id = $1 RETURNING *", [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: "Review not found" });
    res.json({ message: "Review deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Export for Vercel serverless
module.exports = app;

// Only listen when running locally (not on Vercel)
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}
