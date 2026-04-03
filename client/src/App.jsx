import { useState } from "react";
import IntroScreen from "./IntroScreen";
import SeasonCard from "./SeasonCard";
import EpisodeList from "./EpisodeList";
import ReviewPanel from "./ReviewPanel";

const seasons = [
  { season: 1, episodes: 25 },
  { season: 2, episodes: 12 },
  { season: 3, episodes: 22 },
  { season: 4, episodes: 35 },
];

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [selectedEpisode, setSelectedEpisode] = useState(null);

  if (showIntro) {
    return <IntroScreen onFinish={() => setShowIntro(false)} />;
  }

  if (selectedEpisode) {
    return (
      <ReviewPanel
        episode={selectedEpisode}
        onBack={() => setSelectedEpisode(null)}
      />
    );
  }

  if (selectedSeason) {
    return (
      <EpisodeList
        season={selectedSeason}
        onSelectEpisode={(ep) => setSelectedEpisode(ep)}
        onBack={() => setSelectedSeason(null)}
      />
    );
  }

  return (
    <div className="landing">
      <h1>ATTACK ON TITAN</h1>
      <p className="subtitle">Choose a Season to Review</p>
      <div className="season-grid">
        {seasons.map((s) => (
          <SeasonCard
            key={s.season}
            season={s.season}
            episodeCount={s.episodes}
            onClick={() => setSelectedSeason(s.season)}
          />
        ))}
      </div>
    </div>
  );
}
