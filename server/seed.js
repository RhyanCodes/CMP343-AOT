require("dotenv").config({ path: "../.env" });
const pool = require("./db");

const episodes = [];

const seasonCounts = [25, 12, 22, 35];

for (let s = 0; s < seasonCounts.length; s++) {
  for (let e = 1; e <= seasonCounts[s]; e++) {
    episodes.push({ season: s + 1, episode_number: e, title: `Season ${s + 1} - Episode ${e}` });
  }
}

async function seed() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS episodes (
        id SERIAL PRIMARY KEY,
        season INTEGER NOT NULL,
        episode_number INTEGER NOT NULL,
        title VARCHAR(255) NOT NULL
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS reviews (
        id SERIAL PRIMARY KEY,
        episode_id INTEGER REFERENCES episodes(id) ON DELETE CASCADE,
        reviewer_name VARCHAR(100) NOT NULL,
        rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 10),
        comment TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);

    // Clear existing data
    await pool.query("DELETE FROM reviews");
    await pool.query("DELETE FROM episodes");

    // Insert episodes
    for (const ep of episodes) {
      await pool.query(
        "INSERT INTO episodes (season, episode_number, title) VALUES ($1, $2, $3)",
        [ep.season, ep.episode_number, ep.title]
      );
    }

    console.log(`Seeded ${episodes.length} episodes across 4 seasons.`);
    process.exit(0);
  } catch (err) {
    console.error("Seed error:", err);
    process.exit(1);
  }
}

seed();
