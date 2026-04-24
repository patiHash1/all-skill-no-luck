import { useState } from 'react';
import { GROUPS } from '../data/groups';
import FlagIcon from '../components/FlagIcon';
import { MATCHES_BY_GROUP } from '../data/matches';
import { usePredictions } from '../context/PredictionContext';
import { useTranslation } from 'react-i18next';
import TeamStatsModal from '../components/TeamStatsModal';

function MatchCard({ match, prediction, onPick, t, onTeamClick }) {
  const homeName = t(`teams.${match.home}`, match.home);
  const awayName = t(`teams.${match.away}`, match.away);

  return (
    <div className="match-card">
      <div className="match-teams">
        <div className="team-col" onClick={() => onTeamClick(homeName, match.home)} title={`View ${homeName} Stats`}>
          <span className="team-flag"><FlagIcon team={match.home} /></span>
          <span className="team-name">{homeName}</span>
        </div>
        <span className="vs-label">{t('predict.vs')}</span>
        <div className="team-col" onClick={() => onTeamClick(awayName, match.away)} title={`View ${awayName} Stats`}>
          <span className="team-flag"><FlagIcon team={match.away} /></span>
          <span className="team-name">{awayName}</span>
        </div>
      </div>

      <div className="pick-row">
        <button
          className={`pick-btn ${prediction === 'home' ? 'picked' : ''}`}
          onClick={() => onPick(match.id, 'home')}
        >
          <FlagIcon team={match.home} /> {homeName.split(' ')[0]} {t('predict.win')}
        </button>
        <button
          className={`pick-btn ${prediction === 'draw' ? 'picked' : ''}`}
          onClick={() => onPick(match.id, 'draw')}
        >
          {t('predict.draw')}
        </button>
        <button
          className={`pick-btn ${prediction === 'away' ? 'picked' : ''}`}
          onClick={() => onPick(match.id, 'away')}
        >
          <FlagIcon team={match.away} /> {awayName.split(' ')[0]} {t('predict.win')}
        </button>
      </div>
    </div>
  );
}

export default function Predict() {
  const [activeGroup, setActiveGroup] = useState('A');
  const [selectedTeam, setSelectedTeam] = useState(null);
  const { predictions, setPrediction, predictionCount } = usePredictions();
  const { t, i18n } = useTranslation();


  const matches = MATCHES_BY_GROUP[activeGroup] || [];
  const groupPicked = matches.filter((m) => predictions[m.id]).length;

  return (
    <div className="page">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <p className="section-label">{t('predict.label')}</p>
          <h1 className="page-title">{t('predict.title')}</h1>
        </div>
        <div 
          className="btn-primary" 
          style={{ 
            position: 'relative', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.4rem', 
            padding: '0.4rem 0.8rem', 
            fontSize: '0.8rem', 
            background: 'var(--color-bg-light)', 
            color: 'var(--color-text)', 
            border: '1px solid var(--color-border)',
            boxShadow: 'none'
          }}
        >
          <span>🌐 {i18n.resolvedLanguage === 'es' ? 'Español' : 'English'}</span>
          <span style={{ fontSize: '0.5rem', opacity: 0.7 }}>▼</span>
          <select 
            value={i18n.resolvedLanguage || i18n.language} 
            onChange={(e) => i18n.changeLanguage(e.target.value)}
            style={{ 
              position: 'absolute', 
              top: 0, 
              left: 0, 
              width: '100%', 
              height: '100%',
              opacity: 0, 
              cursor: 'pointer'
            }}
          >
            <option value="en">English</option>
            <option value="es">Español</option>
          </select>
        </div>
      </div>
      <p className="page-sub">
        {t('predict.sub_part1')}{predictionCount}{t('predict.sub_part2')}
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

      {/* Group header — UEFA authority style */}
      <div className="group-header">
        <div>
          <span className="group-header-name">{t('predict.group')} {activeGroup}</span>
          <span className="group-header-teams" style={{ marginLeft: '0.75rem', display: 'inline-flex', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
            {GROUPS.find((g) => g.id === activeGroup)?.teams.map((team, idx) => (
              <span key={team} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                {idx > 0 && <span style={{ margin: '0 0.25rem' }}>·</span>}
                <FlagIcon team={team} /> {t(`teams.${team}`, team)}
              </span>
            ))}
          </span>
        </div>
        <span className="group-header-count">{groupPicked} / 6 {t('predict.prophesied')}</span>
      </div>

      {/* Match cards */}
      <div className="match-grid">
        {matches.map((match) => (
          <MatchCard
            key={match.id}
            match={match}
            prediction={predictions[match.id]}
            onPick={setPrediction}
            t={t}
            onTeamClick={(name, raw) => setSelectedTeam({ name, raw })}
          />
        ))}
      </div>

      {selectedTeam && (
        <TeamStatsModal
          teamName={selectedTeam.name}
          countryName={selectedTeam.raw}
          onClose={() => setSelectedTeam(null)}
        />
      )}
    </div>
  );
}
