import { useState, useEffect } from 'react';
import { usePredictions } from '../context/PredictionContext';

// Target: June 11, 2026 — FIFA World Cup 2026 Kickoff
const TARGET = new Date('2026-06-11T16:00:00Z').getTime();

function useCountdown() {
  const [time, setTime] = useState(() => getTime());

  function getTime() {
    const diff = Math.max(0, TARGET - Date.now());
    return {
      days:    Math.floor(diff / 86400000),
      hours:   Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
    };
  }

  useEffect(() => {
    const id = setInterval(() => setTime(getTime()), 1000);
    return () => clearInterval(id);
  }, []);

  return time;
}

export default function Hero({ onPredict }) {
  const { predictionCount } = usePredictions();
  const { days, hours, minutes, seconds } = useCountdown();

  return (
    <div className="page">
      <div className="hero-section">
        <div className="hero-badge">
          <span>🔮</span> Official Prophecy Game
        </div>

        <h1 className="hero-title">
          FIFA<br />
          <span className="gold">WORLD</span><br />
          CUP 2026
        </h1>

        <p className="hero-desc">
          Give your prophecy for all 48 teams across 12 groups.
          Compete on the leaderboard and prove you have the gift of football foresight.
        </p>

        {/* Countdown */}
        <div>
          <p className="section-label" style={{ textAlign: 'center', marginBottom: '1rem' }}>
            Tournament starts in
          </p>
          <div className="countdown">
            <div className="countdown-unit">
              <span className="countdown-value">{String(days).padStart(2, '0')}</span>
              <span className="countdown-label">Days</span>
            </div>
            <span className="countdown-sep">:</span>
            <div className="countdown-unit">
              <span className="countdown-value">{String(hours).padStart(2, '0')}</span>
              <span className="countdown-label">Hours</span>
            </div>
            <span className="countdown-sep">:</span>
            <div className="countdown-unit">
              <span className="countdown-value">{String(minutes).padStart(2, '0')}</span>
              <span className="countdown-label">Mins</span>
            </div>
            <span className="countdown-sep">:</span>
            <div className="countdown-unit">
              <span className="countdown-value">{String(seconds).padStart(2, '0')}</span>
              <span className="countdown-label">Secs</span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="stats-strip">
          <div className="stat-item">
            <span className="stat-value">48</span>
            <span className="stat-label">Teams</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">12</span>
            <span className="stat-label">Groups</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">72</span>
            <span className="stat-label">Matches</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{predictionCount}</span>
            <span className="stat-label">Prophecies</span>
          </div>
        </div>

        <button className="btn-primary" style={{ fontSize: '1rem', padding: '0.75rem 2.5rem' }} onClick={onPredict}>
          Give a Prophecy →
        </button>
      </div>
    </div>
  );
}
