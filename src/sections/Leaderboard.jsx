import { useState } from 'react';
import { MOCK_USERS } from '../data/matches';
import { usePredictions } from '../context/PredictionContext';
import { useTranslation } from 'react-i18next';

const MAX_SCORE = 72;

function getRankClass(rank) {
  if (rank === 1) return 'rank-1';
  if (rank === 2) return 'rank-2';
  if (rank === 3) return 'rank-3';
  return 'rank-other';
}

export default function Leaderboard() {
  const { username, setUsername, userScore } = usePredictions();
  const [draft, setDraft] = useState('');
  const { t } = useTranslation();

  // Build ranked list: mock users + current user (if named)
  const allUsers = username
    ? [...MOCK_USERS, { name: username, avatar: '🫵', score: userScore, isYou: true }]
    : MOCK_USERS;

  const ranked = [...allUsers]
    .sort((a, b) => b.score - a.score)
    .map((u, i) => ({ ...u, rank: i + 1 }));

  return (
    <div className="page">
      <p className="section-label">{t('leaderboard.label')}</p>
      <h1 className="page-title">{t('leaderboard.title')}</h1>
      <p className="page-sub">{t('leaderboard.sub')}</p>

      {/* Username prompt */}
      {!username && (
        <div className="username-prompt">
          <label htmlFor="username-input">{t('leaderboard.prompt_label')}</label>
          <input
            id="username-input"
            className="text-input"
            type="text"
            placeholder={t('leaderboard.prompt_placeholder')}
            value={draft}
            maxLength={20}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && draft.trim() && setUsername(draft.trim())}
          />
          <button
            className="btn-primary"
            onClick={() => draft.trim() && setUsername(draft.trim())}
          >
            {t('leaderboard.prompt_btn')}
          </button>
        </div>
      )}

      {/* Table */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th style={{ width: 48 }}>{t('leaderboard.col_rank')}</th>
              <th>{t('leaderboard.col_player')}</th>
              <th>{t('leaderboard.col_points')}</th>
              <th style={{ minWidth: 120 }}>{t('leaderboard.col_progress')}</th>
            </tr>
          </thead>
          <tbody>
            {ranked.map((user) => (
              <tr
                key={user.name}
                className={[
                  user.isYou ? 'user-row' : '',
                  user.rank <= 3 ? `podium-row-${user.rank}` : '',
                ].filter(Boolean).join(' ')}
              >
                <td>
                  <span className={`rank-badge ${getRankClass(user.rank)}`}>
                    {user.rank <= 3 ? ['🥇','🥈','🥉'][user.rank - 1] : user.rank}
                  </span>
                </td>
                <td>
                  <span style={{ marginRight: '0.5rem' }}>{user.avatar}</span>
                  <span style={{ fontWeight: user.isYou ? 700 : 400 }}>
                    {user.name}
                    {user.isYou && (
                      <span style={{ marginLeft: '0.5rem', fontSize: '0.7rem', color: 'var(--color-gold)' }}>{t('leaderboard.you')}</span>
                    )}
                  </span>
                </td>
                <td style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', color: 'var(--color-gold)' }}>
                  {user.score}
                </td>
                <td>
                  <div className="score-bar-track">
                    <div
                      className="score-bar-fill"
                      style={{ width: `${(user.score / MAX_SCORE) * 100}%` }}
                    />
                  </div>
                  <span style={{ fontSize: '0.7rem', color: 'var(--color-muted)' }}>
                    {user.score} / {MAX_SCORE} {t('leaderboard.pts')}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p style={{ marginTop: '1rem', fontSize: '0.75rem', color: 'var(--color-muted)' }}>
        {t('leaderboard.footer')}
      </p>
    </div>
  );
}
