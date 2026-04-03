export default function SeasonCard({ season, episodeCount, onClick }) {
  return (
    <div className="season-card" onClick={onClick}>
      <h2>Season {season}</h2>
      <span className="ep-count">{episodeCount} Episodes</span>
    </div>
  );
}
