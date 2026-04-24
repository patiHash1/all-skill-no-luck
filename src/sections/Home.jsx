import { useState, useEffect } from 'react';
import { usePredictions } from '../context/PredictionContext';
import { useTranslation } from 'react-i18next';


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

export default function Home({ onPredict }) {
  const { predictionCount } = usePredictions();
  const { days, hours, minutes, seconds } = useCountdown();
  const { t } = useTranslation();


  return (
    <div className="page hero-page">
      {/* Decorative ambient orbs */}
      <div className="hero-orb hero-orb-1" aria-hidden="true" />
      <div className="hero-orb hero-orb-2" aria-hidden="true" />
      <div className="hero-section">
        <div className="hero-badge">
          <span>🔮</span> {t('home.badge')}
        </div>

        <h1 className="hero-title">
          {t('home.title_line1')}<br />
          <span className="gold">{t('home.title_line2')}</span><br />
          {t('home.title_line3')}
        </h1>

        <p className="hero-desc">
          {t('home.desc')}
        </p>


        {/* Countdown */}
        <div>
          <p className="section-label" style={{ textAlign: 'center', marginBottom: '1rem' }}>
            {t('home.tournament_starts')}
          </p>
          <div className="countdown">
            <div className="countdown-unit">
              <span className="countdown-value">{String(days).padStart(2, '0')}</span>
              <span className="countdown-label">{t('home.days')}</span>
            </div>
            <span className="countdown-sep">:</span>
            <div className="countdown-unit">
              <span className="countdown-value">{String(hours).padStart(2, '0')}</span>
              <span className="countdown-label">{t('home.hours')}</span>
            </div>
            <span className="countdown-sep">:</span>
            <div className="countdown-unit">
              <span className="countdown-value">{String(minutes).padStart(2, '0')}</span>
              <span className="countdown-label">{t('home.mins')}</span>
            </div>
            <span className="countdown-sep">:</span>
            <div className="countdown-unit">
              <span className="countdown-value">{String(seconds).padStart(2, '0')}</span>
              <span className="countdown-label">{t('home.secs')}</span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="stats-strip">
          <div className="stat-item">
            <span className="stat-value">48</span>
            <span className="stat-label">{t('home.stats_teams')}</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">12</span>
            <span className="stat-label">{t('home.stats_groups')}</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">72</span>
            <span className="stat-label">{t('home.stats_matches')}</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{predictionCount}</span>
            <span className="stat-label">{t('home.stats_prophecies')}</span>
          </div>
        </div>

        <button className="btn-primary" style={{ fontSize: '1rem', padding: '0.75rem 2.5rem' }} onClick={onPredict}>
          {t('home.btn_predict')}
        </button>
      </div>
    </div>
  );
}
