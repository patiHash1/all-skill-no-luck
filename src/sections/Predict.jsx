import { useState } from 'react';
import { GROUPS } from '../data/groups';
import FlagIcon from '../components/FlagIcon';
import { MATCHES_BY_GROUP } from '../data/matches';
import { usePredictions } from '../context/PredictionContext';
import { useLiveMatch } from '../context/LiveMatchContext';
import { useTranslation } from 'react-i18next';
import TeamStatsModal from '../components/TeamStatsModal';
import '../styles/predict.css';

function MatchCard({ match, prediction, onPick, t, onTeamClick, isLocked }) {
  const homeName = t(`teams.${match.home}`, match.home);
  const awayName = t(`teams.${match.away}`, match.away);

  return (
    <div className={`match-card ${isLocked ? 'locked' : ''}`}>
      <div className="match-teams">
        <div className="team-col" onClick={() => onTeamClick(homeName, match.home)} title={`View ${homeName} Stats`}>
          <span className="team-flag"><FlagIcon team={match.home} /></span>
          <span className="team-name">{homeName}</span>
        </div>
        <span className="vs-label">{isLocked ? '🔒' : t('predict.vs')}</span>
        <div className="team-col" onClick={() => onTeamClick(awayName, match.away)} title={`View ${awayName} Stats`}>
          <span className="team-flag"><FlagIcon team={match.away} /></span>
          <span className="team-name">{awayName}</span>
        </div>
      </div>

      <div className="pick-row">
        <button
          className={`pick-btn ${prediction === 'home' ? 'picked' : ''}`}
          onClick={() => onPick(match.id, 'home')}
          disabled={isLocked}
        >
          <FlagIcon team={match.home} /> {homeName.split(' ')[0]} {t('predict.win')}
        </button>
        <button
          className={`pick-btn ${prediction === 'draw' ? 'picked' : ''}`}
          onClick={() => onPick(match.id, 'draw')}
          disabled={isLocked}
        >
          {t('predict.draw')}
        </button>
        <button
          className={`pick-btn ${prediction === 'away' ? 'picked' : ''}`}
          onClick={() => onPick(match.id, 'away')}
          disabled={isLocked}
        >
          <FlagIcon team={match.away} /> {awayName.split(' ')[0]} {t('predict.win')}
        </button>
      </div>
      {isLocked && (
        <div style={{ textAlign: 'center', fontSize: '0.65rem', color: 'var(--color-accent)', marginTop: '0.4rem', fontWeight: 700, textTransform: 'uppercase' }}>
          {t('predict.locked_msg', 'Predictions Locked')}
        </div>
      )}
    </div>
  );
}

export default function Predict() {
  const [activeGroup, setActiveGroup] = useState('A');
  const [selectedTeam, setSelectedTeam] = useState(null);
  const { predictions, setPrediction, predictionCount } = usePredictions();
  const { liveMatch, isLocked } = useLiveMatch();
  const { t } = useTranslation();

  const matches = MATCHES_BY_GROUP[activeGroup] || [];
  const groupPicked = matches.filter((m) => predictions[m.id]).length;

  return (
    <div className="page">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <p className="section-label">{t('predict.label')}</p>
          <h1 className="page-title">{t('predict.title')}</h1>
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
            isLocked={match.id === liveMatch.id && isLocked}
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
