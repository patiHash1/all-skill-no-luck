import { GROUPS } from '../data/groups';
import FlagIcon from '../components/FlagIcon';
import { MATCHES_BY_GROUP } from '../data/matches';
import { usePredictions } from '../context/PredictionContext';
import { useTranslation } from 'react-i18next';

const CHIP_CLASS = { home: 'chip-home', draw: 'chip-draw', away: 'chip-away' };


export default function Results() {
  const { predictions, predictionCount, clearPredictions } = usePredictions();
  const { t } = useTranslation();
  const total = 72;

  const CHIP_LABEL = {
    home: (m) => <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}><FlagIcon team={m.home} /> {t(`teams.${m.home}`, m.home).split(' ')[0]} {t('results.win')}</span>,
    draw: ()   => t('results.draw'),
    away: (m)  => <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}><FlagIcon team={m.away} /> {t(`teams.${m.away}`, m.away).split(' ')[0]} {t('results.win')}</span>,
  };

  if (predictionCount === 0) {
    return (
      <div className="page">
        <p className="section-label">{t('results.label')}</p>
        <h1 className="page-title">{t('results.title')}</h1>
        <div className="empty-state">
          <span className="empty-icon">🔮</span>
          <p className="empty-text">{t('results.empty_text')}</p>
          <p style={{ fontSize: '0.8rem', color: 'var(--color-muted)' }}>
            {t('results.empty_sub1')}<strong>{t('results.empty_sub_strong')}</strong>{t('results.empty_sub2')}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <p className="section-label">{t('results.label')}</p>
      <h1 className="page-title">{t('results.title')}</h1>
      <p className="page-sub">{t('results.sub')}</p>

      {/* Summary cards */}
      <div className="results-summary">
        <div className="summary-card">
          <span className="val">{predictionCount}</span>
          <span className="lbl">{t('results.card_given')}</span>
        </div>
        <div className="summary-card">
          <span className="val">{total - predictionCount}</span>
          <span className="lbl">{t('results.card_remaining')}</span>
        </div>
        <div className="summary-card">
          <span className="val">{Math.round((predictionCount / total) * 100)}%</span>
          <span className="lbl">{t('results.card_complete')}</span>
        </div>
        <div className="summary-card">
          <span className="val">—</span>
          <span className="lbl">{t('results.card_score')}</span>
        </div>
      </div>

      {/* Completion bar */}
      <div style={{ marginBottom: '2rem' }}>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${(predictionCount / total) * 100}%` }} />
        </div>
        <span style={{ fontSize: '0.75rem', color: 'var(--color-muted)' }}>
          {t('results.progress_text1')}{predictionCount}{t('results.progress_text2')}{total}{t('results.progress_text3')}
        </span>
      </div>

      {/* Per-group breakdown */}
      {GROUPS.map((group) => {
        const matches = MATCHES_BY_GROUP[group.id];
        const picked = matches.filter((m) => predictions[m.id]);
        if (picked.length === 0) return null;

        return (
          <div key={group.id}>
            <h3 className="results-group-title">
              {t('results.group')} {group.id}
              <span style={{ fontSize: '0.8rem', color: 'var(--color-muted)', marginLeft: '0.75rem', fontFamily: 'var(--font-body)', fontWeight: 400 }}>
                {picked.length}/{matches.length} {t('results.prophecies_given')}
              </span>
            </h3>
            {picked.map((match) => {
              const pick = predictions[match.id];
              return (
                <div key={match.id} className="prophecy-row">
                  <span className="teams" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                    <FlagIcon team={match.home} /> {t(`teams.${match.home}`, match.home)} <span style={{ margin: '0 0.25rem' }}>{t('results.vs')}</span> <FlagIcon team={match.away} /> {t(`teams.${match.away}`, match.away)}
                  </span>
                  <span className={`prediction-chip ${CHIP_CLASS[pick]}`}>
                    {CHIP_LABEL[pick](match)}
                  </span>
                </div>
              );
            })}
          </div>
        );
      })}

      {/* Clear button */}
      <div style={{ marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--color-border)' }}>
        <button
          className="btn-primary"
          style={{ background: 'transparent', border: '1px solid var(--color-red)', color: 'var(--color-red)' }}
          onClick={() => {
            if (window.confirm(t('results.clear_confirm'))) {
              clearPredictions();
            }
          }}
        >
          {t('results.clear_btn')}
        </button>
      </div>
    </div>
  );
}
