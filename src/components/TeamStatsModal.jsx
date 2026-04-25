import { useTranslation } from "react-i18next";
import { TEAM_STATS } from "../data/stats";
import FlagIcon from "./FlagIcon";

export default function TeamStatsModal({ teamName, countryName, onClose }) {
  const { t } = useTranslation();

  // Use countryName for matching stats, but fallback to teamName if not available
  const teamId = countryName || teamName;
  const stats = TEAM_STATS[teamId];

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-card stats-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <div
            style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}
          >
            <div style={{ fontSize: "1.5rem", lineHeight: 1 }}>
              <FlagIcon team={teamId} />
            </div>
            <span className="modal-title" style={{ fontSize: "1.5rem" }}>
              {teamName}
            </span>
          </div>
          <button className="modal-close" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="modal-body">
          {!stats ? (
            <div className="stats-unavailable">
              <span
                style={{
                  fontSize: "2rem",
                  marginBottom: "0.5rem",
                  display: "block",
                }}
              >
                📉
              </span>
              <p>{t("stats.unavailable")}</p>
            </div>
          ) : (
            <div className="stats-grid">
              <div className="stat-box">
                <span className="stat-box-val">{stats.ranking}</span>
                <span className="stat-box-lbl">{t("stats.ranking")}</span>
              </div>
              <div className="stat-box">
                <span className="stat-box-val">{stats.wins}</span>
                <span className="stat-box-lbl">{t("stats.wins")}</span>
              </div>
              <div className="stat-box" style={{ gridColumn: "span 2" }}>
                <span className="stat-box-val">{stats.appearances}</span>
                <span className="stat-box-lbl">{t("stats.appearances")}</span>
              </div>
              <div
                className="stat-box"
                style={{ gridColumn: "span 2", padding: "1rem" }}
              >
                <span
                  className="stat-box-lbl"
                  style={{ marginBottom: "0.5rem" }}
                >
                  {t("stats.form")}
                </span>
                <div className="form-badges">
                  {stats.form.map((result, i) => (
                    <span
                      key={i}
                      className={`form-badge form-${result.toLowerCase()}`}
                    >
                      {t(`stats.form_${result.toLowerCase()}`)}
                    </span>
                  ))}
                </div>
              </div>

              {stats.roster && (
                <div
                  className="stat-box"
                  style={{
                    gridColumn: "span 2",
                    padding: "0",
                    display: "flex",
                    flexDirection: "column",
                    overflow: "hidden",
                  }}
                >
                  {/* Coach & Tactics Section */}
                  <div
                    style={{
                      padding: "1rem 1.5rem",
                      borderBottom: "1px solid rgba(155, 44, 255, 0.2)",
                      background:
                        "linear-gradient(90deg, rgba(155, 44, 255, 0.1) 0%, transparent 100%)",
                      textAlign: "left",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      flexWrap: "wrap",
                      gap: "1rem",
                    }}
                  >
                    <div>
                      <span
                        className="stat-box-lbl"
                        style={{
                          marginBottom: "0.3rem",
                          display: "block",
                          color: "var(--color-accent)",
                        }}
                      >
                        {t("stats.coach", "Head Coach")}
                      </span>
                      <span
                        style={{
                          fontSize: "1.1rem",
                          fontWeight: "bold",
                          color: "#fff",
                          letterSpacing: "0.05em",
                        }}
                      >
                        👔 {stats.roster.coach}
                      </span>
                    </div>
                    {stats.tactic && (
                      <div style={{ textAlign: "right" }}>
                        <span
                          className="stat-box-lbl"
                          style={{
                            marginBottom: "0.3rem",
                            display: "block",
                            color: "var(--color-muted)",
                          }}
                        >
                          {t("stats.tactic", "Preferred Tactic")}
                        </span>
                        <span
                          style={{
                            fontSize: "0.9rem",
                            fontWeight: "bold",
                            color: "var(--color-cyan)",
                            letterSpacing: "0.05em",
                            background: "rgba(0, 229, 255, 0.1)",
                            padding: "0.3rem 0.6rem",
                            borderRadius: "4px",
                            border: "1px solid rgba(0, 229, 255, 0.2)",
                          }}
                        >
                          📋 {stats.tactic}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="roster-grid">
                    {/* Starters */}
                    <div className="roster-card starters">
                      <span
                        className="stat-box-lbl"
                        style={{
                          marginBottom: "1rem",
                          display: "block",
                          color: "#ffd700",
                          fontSize: "0.75rem",
                          letterSpacing: "0.15em",
                        }}
                      >
                        {t("stats.starters", "Starting XI")}
                      </span>
                      <ul
                        style={{
                          listStyle: "none",
                          padding: 0,
                          margin: 0,
                          fontSize: "0.9rem",
                          color: "#eaeaea",
                        }}
                      >
                        {stats.roster.starters.map((player, idx) => (
                          <li
                            key={idx}
                            style={{
                              padding: "0.4rem 0",
                              borderBottom:
                                idx < stats.roster.starters.length - 1
                                  ? "1px solid rgba(255,255,255,0.05)"
                                  : "none",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            <span
                              style={{
                                display: "inline-block",
                                width: "24px",
                                color: "#ffd700",
                                opacity: 0.8,
                                fontSize: "0.75rem",
                                fontWeight: "bold",
                              }}
                            >
                              {idx + 1}.
                            </span>{" "}
                            {player}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Substitutes */}
                    <div className="roster-card subs">
                      <span
                        className="stat-box-lbl"
                        style={{
                          marginBottom: "1rem",
                          display: "block",
                          color: "var(--color-cyan)",
                          fontSize: "0.75rem",
                          letterSpacing: "0.15em",
                        }}
                      >
                        {t("stats.subs", "Substitutes")}
                      </span>
                      <ul
                        style={{
                          listStyle: "none",
                          padding: 0,
                          margin: 0,
                          fontSize: "0.9rem",
                          color: "#eaeaea",
                        }}
                      >
                        {stats.roster.subs.map((player, idx) => (
                          <li
                            key={idx}
                            style={{
                              padding: "0.4rem 0",
                              borderBottom:
                                idx < stats.roster.subs.length - 1
                                  ? "1px solid rgba(255,255,255,0.05)"
                                  : "none",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            <span
                              style={{
                                marginRight: "0.6rem",
                                color: "var(--color-cyan)",
                                opacity: 0.8,
                              }}
                            >
                              🔁
                            </span>{" "}
                            {player}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
