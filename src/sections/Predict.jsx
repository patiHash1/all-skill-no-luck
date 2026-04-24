import { useState } from 'react';
import { GROUPS, FLAG_MAP } from '../data/groups';
import { MATCHES_BY_GROUP } from '../data/matches';
import { usePredictions } from '../context/PredictionContext';

function MatchCard({ match, prediction, onPick }) {
  const homeFlag = FLAG_MAP[match.home] || '🏳';
  const awayFlag = FLAG_MAP[match.away] || '🏳';

  return (
    <div className="match-card">
      <div className="match-teams">
        <div className="team-col">
          <span className="team-flag">{homeFlag}</span>
          <span className="team-name">{match.home}</span>
        </div>
        <span className="vs-label">VS</span>
        <div className="team-col">
          <span className="team-flag">{awayFlag}</span>
          <span className="team-name">{match.away}</span>
        </div>
      </div>

      <div className="pick-row">
        <button
          className={`pick-btn ${prediction === 'home' ? 'picked' : ''}`}
          onClick={() => onPick(match.id, 'home')}
        >
          {match.home.split(' ')[0]} Win
        </button>
        <button
          className={`pick-btn ${prediction === 'draw' ? 'picked' : ''}`}
          onClick={() => onPick(match.id, 'draw')}
        >
          Draw
        </button>
        <button
          className={`pick-btn ${prediction === 'away' ? 'picked' : ''}`}
          onClick={() => onPick(match.id, 'away')}
        >
          {match.away.split(' ')[0]} Win
        </button>
      </div>
    </div>
  );
}

export default function Predict() {
  const [activeGroup, setActiveGroup] = useState('A');
  const { predictions, setPrediction, predictionCount } = usePredictions();

  const matches = MATCHES_BY_GROUP[activeGroup] || [];
  const groupPicked = matches.filter((m) => predictions[m.id]).length;

  return (
    <div className="page">
      <p className="section-label">Group Stage Prophecies</p>
      <h1 className="page-title">Give Your Prophecy</h1>
      <p className="page-sub">
        {predictionCount} / 72 prophecies given — select a group to get started
      </p>

      {/* Progress bar */}
      <div className="progress-track" style={{ marginBottom: '1.5rem' }}>
        <div className="progress-fill" style={{ width: `${(predictionCount / 72) * 100}%` }} />
      </div>

      {/* Group selector */}
      <div className="group-tabs">
        {GROUPS.map((g) => {
          const picked = MATCHES_BY_GROUP[g.id].filter((m) => predictions[m.id]).length;
          return (
            <button
              key={g.id}
              className={`group-tab ${activeGroup === g.id ? 'active' : ''}`}
              onClick={() => setActiveGroup(g.id)}
              title={`Group ${g.id}: ${g.teams.join(', ')}`}
            >
              {g.id} {picked === 6 ? '✨' : `${picked}/6`}
            </button>
          );
        })}
      </div>

      {/* Group header */}
      <div className="card" style={{ marginBottom: '1.25rem', padding: '0.75rem 1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', color: 'var(--color-gold)' }}>
            GROUP {activeGroup}
          </span>
          <span style={{ fontSize: '0.8rem', color: 'var(--color-muted)', marginLeft: '0.75rem' }}>
            {GROUPS.find((g) => g.id === activeGroup)?.teams.join(' · ')}
          </span>
        </div>
        <span style={{ fontSize: '0.8rem', color: 'var(--color-muted)' }}>
          {groupPicked} / 6 picked
        </span>
      </div>

      {/* Match cards */}
      <div className="match-grid">
        {matches.map((match) => (
          <MatchCard
            key={match.id}
            match={match}
            prediction={predictions[match.id]}
            onPick={setPrediction}
          />
        ))}
      </div>
    </div>
  );
}
