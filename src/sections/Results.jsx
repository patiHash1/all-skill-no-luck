import { GROUPS, FLAG_MAP } from '../data/groups';
import { MATCHES_BY_GROUP } from '../data/matches';
import { usePredictions } from '../context/PredictionContext';

const CHIP_CLASS = { home: 'chip-home', draw: 'chip-draw', away: 'chip-away' };
const CHIP_LABEL = {
  home: (m) => `${m.home.split(' ')[0]} Win`,
  draw: ()   => 'Draw',
  away: (m)  => `${m.away.split(' ')[0]} Win`,
};

export default function Results() {
  const { predictions, predictionCount, clearPredictions } = usePredictions();
  const total = 72;

  if (predictionCount === 0) {
    return (
      <div className="page">
        <p className="section-label">Your Prophecies</p>
        <h1 className="page-title">Prophecies</h1>
        <div className="empty-state">
          <span className="empty-icon">🔮</span>
          <p className="empty-text">You haven&apos;t given any prophecies yet.</p>
          <p style={{ fontSize: '0.8rem', color: 'var(--color-muted)' }}>
            Head to the <strong>Prophesy</strong> tab to start picking winners.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <p className="section-label">Your Prophecies</p>
      <h1 className="page-title">Prophecies</h1>
      <p className="page-sub">Your prophecies are sealed — scores update after matches are played</p>

      {/* Summary cards */}
      <div className="results-summary">
        <div className="summary-card">
          <span className="val">{predictionCount}</span>
          <span className="lbl">Prophecies Given</span>
        </div>
        <div className="summary-card">
          <span className="val">{total - predictionCount}</span>
          <span className="lbl">Remaining</span>
        </div>
        <div className="summary-card">
          <span className="val">{Math.round((predictionCount / total) * 100)}%</span>
          <span className="lbl">Complete</span>
        </div>
        <div className="summary-card">
          <span className="val">—</span>
          <span className="lbl">Score (pending)</span>
        </div>
      </div>

      {/* Completion bar */}
      <div style={{ marginBottom: '2rem' }}>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${(predictionCount / total) * 100}%` }} />
        </div>
        <span style={{ fontSize: '0.75rem', color: 'var(--color-muted)' }}>
          {predictionCount} of {total} group stage prophecies given
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
              Group {group.id}
              <span style={{ fontSize: '0.8rem', color: 'var(--color-muted)', marginLeft: '0.75rem', fontFamily: 'var(--font-body)', fontWeight: 400 }}>
                {picked.length}/{matches.length} prophecies given
              </span>
            </h3>
            {picked.map((match) => {
              const pick = predictions[match.id];
              return (
                <div key={match.id} className="prophecy-row">
                  <span className="teams">
                    {FLAG_MAP[match.home]} {match.home} &nbsp;vs&nbsp; {FLAG_MAP[match.away]} {match.away}
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
            if (window.confirm('Clear all prophecies? This cannot be undone.')) {
              clearPredictions();
            }
          }}
        >
          🗑 Clear All Prophecies
        </button>
      </div>
    </div>
  );
}
