import { useState } from 'react';
import { MOCK_USERS } from '../data/matches';
import { usePredictions } from '../context/PredictionContext';

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

  // Build ranked list: mock users + current user (if named)
  const allUsers = username
    ? [...MOCK_USERS, { name: username, avatar: '🫵', score: userScore, isYou: true }]
    : MOCK_USERS;

  const ranked = [...allUsers]
    .sort((a, b) => b.score - a.score)
    .map((u, i) => ({ ...u, rank: i + 1 }));

  return (
    <div className="page">
      <p className="section-label">Rankings</p>
      <h1 className="page-title">Leaderboard</h1>
      <p className="page-sub">Scores will be updated live as matches are played</p>

      {/* Username prompt */}
      {!username && (
        <div className="username-prompt">
          <label htmlFor="username-input">Enter your name to join the leaderboard</label>
          <input
            id="username-input"
            className="text-input"
            type="text"
            placeholder="e.g. FootballFan99"
            value={draft}
            maxLength={20}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && draft.trim() && setUsername(draft.trim())}
          />
          <button
            className="btn-primary"
            onClick={() => draft.trim() && setUsername(draft.trim())}
          >
            Join Leaderboard
          </button>
        </div>
      )}

      {/* Table */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th style={{ width: 48 }}>#</th>
              <th>Player</th>
              <th>Points</th>
              <th style={{ minWidth: 120 }}>Progress</th>
            </tr>
          </thead>
          <tbody>
            {ranked.map((user) => (
              <tr key={user.name} className={user.isYou ? 'user-row' : ''}>
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
                      <span style={{ marginLeft: '0.5rem', fontSize: '0.7rem', color: 'var(--color-gold)' }}>YOU</span>
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
                    {user.score} / {MAX_SCORE} pts
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p style={{ marginTop: '1rem', fontSize: '0.75rem', color: 'var(--color-muted)' }}>
        ⚡ Points are awarded when official results are published — your prophecies will be judged.
      </p>
    </div>
  );
}
