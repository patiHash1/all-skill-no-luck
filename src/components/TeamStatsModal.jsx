import { useTranslation } from 'react-i18next';
import { TEAM_STATS } from '../data/stats';
import FlagIcon from './FlagIcon';

export default function TeamStatsModal({ teamName, countryName, onClose }) {
  const { t } = useTranslation();
  
  // Use countryName for matching stats, but fallback to teamName if not available
  const teamId = countryName || teamName;
  const stats = TEAM_STATS[teamId];

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card stats-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ fontSize: '1.5rem', lineHeight: 1 }}>
              <FlagIcon team={teamId} />
            </div>
            <span className="modal-title" style={{ fontSize: '1.5rem' }}>{teamName}</span>
          </div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        
        <div className="modal-body">
          {!stats ? (
            <div className="stats-unavailable">
              <span style={{ fontSize: '2rem', marginBottom: '0.5rem', display: 'block' }}>📉</span>
              <p>{t('stats.unavailable')}</p>
            </div>
          ) : (
            <div className="stats-grid">
              <div className="stat-box">
                <span className="stat-box-val">{stats.ranking}</span>
                <span className="stat-box-lbl">{t('stats.ranking')}</span>
              </div>
              <div className="stat-box">
                <span className="stat-box-val">{stats.wins}</span>
                <span className="stat-box-lbl">{t('stats.wins')}</span>
              </div>
              <div className="stat-box" style={{ gridColumn: 'span 2' }}>
                <span className="stat-box-val">{stats.appearances}</span>
                <span className="stat-box-lbl">{t('stats.appearances')}</span>
              </div>
              <div className="stat-box" style={{ gridColumn: 'span 2', padding: '1rem' }}>
                <span className="stat-box-lbl" style={{ marginBottom: '0.5rem' }}>{t('stats.form')}</span>
                <div className="form-badges">
                  {stats.form.map((result, i) => (
                    <span key={i} className={`form-badge form-${result.toLowerCase()}`}>
                      {t(`stats.form_${result.toLowerCase()}`)}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
