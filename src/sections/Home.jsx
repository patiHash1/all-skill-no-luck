import { useState, useEffect } from 'react';
import { usePredictions } from '../context/PredictionContext';
import { useTranslation } from 'react-i18next';
import { ALL_MATCHES } from '../data/matches';
import { HIGHLIGHTS_DATA } from '../data/highlights';
import FlagIcon from '../components/FlagIcon';

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

export default function Home({ onPredict, onResults }) {
  const { predictions, predictionCount } = usePredictions();
  const { days, hours, minutes, seconds } = useCountdown();
  const { t } = useTranslation();

  // Get up to 3 recent predictions
  const recentPredictions = Object.entries(predictions)
    .slice(-3)
    .map(([matchId, pick]) => {
      const match = ALL_MATCHES.find((m) => m.id === matchId);
      return { match, pick };
    })
    .filter((item) => item.match); // ensure match exists

  return (
    <div className="page hero-page">
      {/* Decorative ambient orbs */}
      <div className="hero-orb hero-orb-1" aria-hidden="true" />
      <div className="hero-orb hero-orb-2" aria-hidden="true" />
      
      {/* ── Compact Hero Section ── */}
      <div className="hero-section">
        <div className="hero-badge">
          <span>🔮</span> {t('home.badge')}
        </div>

        <h1 className="hero-title">
          {t('home.title_line1')} <span className="gold">{t('home.title_line2')}</span> {t('home.title_line3')}
        </h1>

        {/* Countdown */}
        <div className="countdown" style={{ margin: '0.5rem 0' }}>
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

        <button className="btn-primary" style={{ fontSize: '0.9rem', padding: '0.6rem 2rem', marginTop: '0.5rem' }} onClick={onPredict}>
          {t('home.btn_predict')}
        </button>
      </div>

      {/* ── Recent Prophecies Section ── */}
      {recentPredictions.length > 0 && (
        <div className="home-section">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1rem' }}>
            <h2 className="home-section-title" style={{ marginBottom: 0 }}>{t('home.recent_prophecies')}</h2>
          </div>
          <div className="match-grid">
            {recentPredictions.map(({ match, pick }) => {
              const homeName = t(`teams.${match.home}`, match.home);
              const awayName = t(`teams.${match.away}`, match.away);
              
              return (
                <div key={match.id} className="match-card" style={{ opacity: 0.9 }}>
                  <div className="match-teams">
                    <div className="team-col">
                      <span className="team-flag"><FlagIcon team={match.home} /></span>
                      <span className="team-name">{homeName}</span>
                    </div>
                    <span className="vs-label">VS</span>
                    <div className="team-col">
                      <span className="team-flag"><FlagIcon team={match.away} /></span>
                      <span className="team-name">{awayName}</span>
                    </div>
                  </div>
                  <div className="pick-row">
                    <button className={`pick-btn ${pick === 'home' ? 'picked' : ''}`} disabled>
                      {homeName.split(' ')[0]} {t('predict.win')}
                    </button>
                    <button className={`pick-btn ${pick === 'draw' ? 'picked' : ''}`} disabled>
                      {t('predict.draw')}
                    </button>
                    <button className={`pick-btn ${pick === 'away' ? 'picked' : ''}`} disabled>
                      {awayName.split(' ')[0]} {t('predict.win')}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── World Cup Highlights Section ── */}
      <div className="home-section">
        <h2 className="home-section-title">{t('home.highlights')}</h2>
        <div className="highlight-grid">
          {HIGHLIGHTS_DATA.map((item) => (
            <div key={item.id} className="highlight-card">
              <div className="highlight-banner">
                <span className="highlight-flag"><FlagIcon team={item.team} /></span>
              </div>
              <div className="highlight-content">
                <span className="highlight-year">{item.year}</span>
                <h3 className="highlight-title">{item.title}</h3>
                <p className="highlight-desc">{t(item.descKey)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
