import { useState } from "react";

export default function IntroScreen({ onFinish }) {
  const [fading, setFading] = useState(false);

  const handleClick = () => {
    setFading(true);
    setTimeout(onFinish, 800);
  };

  return (
    <div
      className="intro-screen"
      onClick={handleClick}
      style={{
        opacity: fading ? 0 : 1,
        transition: "opacity 0.8s ease-out",
      }}
    >
      <div className="intro-text">
        <h1>ATTACK ON TITAN</h1>
        <p>EPISODE REVIEWS</p>
      </div>

      <div className="titan">
        <img src="/titan.png" alt="Colossal Titan" className="titan-img" />
      </div>

      <div className="wall"></div>

      <p
        style={{
          position: "absolute",
          bottom: "20px",
          zIndex: 3,
          color: "#666",
          fontSize: "0.85rem",
          letterSpacing: "2px",
          animation: "fadeInText 2s ease-out 2.5s both",
        }}
      >
        CLICK ANYWHERE TO CONTINUE
      </p>
    </div>
  );
}
