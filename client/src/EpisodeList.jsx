import { useState, useEffect } from "react";
import { getEpisodes } from "./api";

export default function EpisodeList({ season, onSelectEpisode, onBack }) {
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getEpisodes(season)
      .then((data) => setEpisodes(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [season]);

  return (
    <div className="episode-view">
      <button className="back-btn" onClick={onBack}>
        ← Back to Seasons
      </button>
      <h2>Season {season}</h2>

      {loading ? (
        <p style={{ textAlign: "center", color: "#888" }}>Loading episodes...</p>
      ) : (
        <ul className="episode-list">
          {episodes.map((ep) => (
            <li
              key={ep.id}
              className="episode-item"
              onClick={() => onSelectEpisode(ep)}
            >
              <span className="ep-title">{ep.title}</span>
              <span className="ep-arrow">→</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
