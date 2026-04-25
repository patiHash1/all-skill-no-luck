import { useState } from "react";
import { MOCK_USERS } from "../data/matches";
import { usePredictions } from "../context/PredictionContext";
import { useTranslation } from "react-i18next";
import "../styles/leaderboard.css";

const MAX_SCORE = 72;

function getRankClass(rank) {
  if (rank === 1) return "rank-1";
  if (rank === 2) return "rank-2";
  if (rank === 3) return "rank-3";
  return "rank-other";
}

export default function Leaderboard() {
  const [mode, setMode] = useState("overall"); // 'overall' | 'weekly'
  const [activeWeek, setActiveWeek] = useState(1);
  const { username, userScore } = usePredictions();
  const { t } = useTranslation();

  // Mock scoring logic for weekly mode
  const getWeeklyScore = (user, week) => {
    // Deterministic random-ish score for mock users based on their name and week
    const seed = user.name.length + week;
    const base =
      mode === "overall" ? user.score : Math.floor(user.score / 4 + (seed % 5));
    return user.isYou
      ? mode === "overall"
        ? userScore
        : Math.floor(userScore / 4)
      : base;
  };

  // Build ranked list
  const allUsers = username
    ? [
        ...MOCK_USERS,
        { name: username, avatar: "🫵", score: userScore, isYou: true },
      ]
    : MOCK_USERS;

  const ranked = allUsers
    .map((u) => ({ ...u, displayScore: getWeeklyScore(u, activeWeek) }))
    .sort((a, b) => b.displayScore - a.displayScore)
    .map((u, i) => ({ ...u, rank: i + 1 }));

  return (
    <div className="page">
      <p className="section-label">{t("leaderboard.label")}</p>
      <h1 className="page-title">{t("leaderboard.title")}</h1>

      {/* Mode Switcher */}
      <div className="group-tabs" style={{ marginBottom: "1.5rem" }}>
        <button
          className={`group-tab ${mode === "overall" ? "active" : ""}`}
          onClick={() => setMode("overall")}
        >
          {t("leaderboard.mode_overall", "Overall")}
        </button>
        <button
          className={`group-tab ${mode === "weekly" ? "active" : ""}`}
          onClick={() => setMode("weekly")}
        >
          {t("leaderboard.mode_weekly", "Weekly")}
        </button>
      </div>

      {/* Week Selector (only if weekly mode) */}
      {mode === "weekly" && (
        <div
          style={{
            display: "flex",
            gap: "0.5rem",
            marginBottom: "1.5rem",
            overflowX: "auto",
            paddingBottom: "0.5rem",
          }}
        >
          {[1, 2, 3, 4].map((w) => (
            <button
              key={w}
              onClick={() => setActiveWeek(w)}
              style={{
                padding: "0.4rem 1rem",
                borderRadius: "20px",
                border:
                  activeWeek === w
                    ? "1px solid var(--color-gold)"
                    : "1px solid rgba(255,255,255,0.1)",
                background:
                  activeWeek === w ? "rgba(212, 175, 55, 0.1)" : "transparent",
                color:
                  activeWeek === w ? "var(--color-gold)" : "var(--color-muted)",
                fontSize: "0.8rem",
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              {t("leaderboard.week", "Week")} {w}
            </button>
          ))}
        </div>
      )}

      {/* Restricted View */}
      {!username ? (
        <div className="empty-state">
          <span className="empty-icon">🔒</span>
          <h2
            style={{
              fontFamily: "var(--font-heading)",
              color: "var(--color-text)",
              marginBottom: "0.5rem",
            }}
          >
            {t("leaderboard.restricted_title")}
          </h2>
          <p className="empty-text">{t("leaderboard.restricted_desc")}</p>
        </div>
      ) : (
        <>
          <div className="card" style={{ padding: 0, overflow: "hidden" }}>
            <table className="leaderboard-table">
              <thead>
                <tr>
                  <th style={{ width: 48 }}>{t("leaderboard.col_rank")}</th>
                  <th>{t("leaderboard.col_player")}</th>
                  <th>{t("leaderboard.col_points")}</th>
                  <th style={{ minWidth: 120 }}>
                    {t("leaderboard.col_progress")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {ranked.map((user) => (
                  <tr
                    key={user.name}
                    className={[
                      user.isYou ? "user-row" : "",
                      user.rank <= 3 ? `podium-row-${user.rank}` : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    <td>
                      <span className={`rank-badge ${getRankClass(user.rank)}`}>
                        {user.rank <= 3
                          ? ["🥇", "🥈", "🥉"][user.rank - 1]
                          : user.rank}
                      </span>
                    </td>
                    <td>
                      <span style={{ marginRight: "0.5rem" }}>
                        {user.avatar}
                      </span>
                      <span style={{ fontWeight: user.isYou ? 700 : 400 }}>
                        {user.name}
                        {user.isYou && (
                          <span
                            style={{
                              marginLeft: "0.5rem",
                              fontSize: "0.7rem",
                              color: "var(--color-gold)",
                            }}
                          >
                            {t("leaderboard.you")}
                          </span>
                        )}
                      </span>
                    </td>
                    <td
                      style={{
                        fontFamily: "var(--font-heading)",
                        fontSize: "1.1rem",
                        color: "var(--color-gold)",
                      }}
                    >
                      {user.displayScore}
                    </td>
                    <td>
                      <div className="score-bar-track">
                        <div
                          className="score-bar-fill"
                          style={{
                            width: `${(user.displayScore / (mode === "overall" ? MAX_SCORE : 18)) * 100}%`,
                          }}
                        />
                      </div>
                      <span
                        style={{
                          fontSize: "0.7rem",
                          color: "var(--color-muted)",
                        }}
                      >
                        {user.displayScore} /{" "}
                        {mode === "overall" ? MAX_SCORE : 18}{" "}
                        {t("leaderboard.pts")}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p
            style={{
              marginTop: "1rem",
              fontSize: "0.75rem",
              color: "var(--color-muted)",
            }}
          >
            {t("leaderboard.footer")}
          </p>
        </>
      )}
    </div>
  );
}
