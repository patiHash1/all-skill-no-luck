import { useState } from "react";
import { GROUPS } from "../data/groups";
import FlagIcon from "../components/FlagIcon";
import { MATCHES_BY_GROUP } from "../data/matches";
import { useTranslation } from "react-i18next";
import { Calendar, MapPin, BarChart3 } from "lucide-react";
import TeamStatsModal from "../components/TeamStatsModal";
import "../styles/predict.css";

function FixtureCard({ match, t, onTeamClick }) {
  const homeName = t(`teams.${match.home}`, match.home);
  const awayName = t(`teams.${match.away}`, match.away);

  return (
    <div className="match-card">
      {/* Match Info Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: "0.65rem",
          color: "var(--color-muted-2)",
          marginBottom: "0.75rem",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        }}
      >
        <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <Calendar size={12} /> {match.date} • {match.time}
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <MapPin size={12} /> {match.stadium}
        </span>
      </div>

      <div className="match-teams" style={{ paddingBottom: "0.5rem" }}>
        <div
          className="team-col"
          onClick={() => onTeamClick(homeName, match.home)}
          title={`View ${homeName} Stats`}
          style={{ cursor: "pointer" }}
        >
          <span className="team-flag">
            <FlagIcon team={match.home} />
          </span>
          <span className="team-name">{homeName}</span>
        </div>
        <span className="vs-label">{t("predict.vs")}</span>
        <div
          className="team-col"
          onClick={() => onTeamClick(awayName, match.away)}
          title={`View ${awayName} Stats`}
          style={{ cursor: "pointer" }}
        >
          <span className="team-flag">
            <FlagIcon team={match.away} />
          </span>
          <span className="team-name">{awayName}</span>
        </div>
      </div>
    </div>
  );
}

function GroupStandings({ group, t, onTeamClick }) {
  const teams = group?.teams || [];

  return (
    <div className="standings-card" style={{ marginTop: "2rem" }}>
      <h3
        className="section-subtitle"
        style={{
          marginBottom: "1rem",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <BarChart3 size={18} /> {t("fixtures.standings", "Group Standings")}
      </h3>
      <div
        className="card"
        style={{
          padding: 0,
          overflow: "hidden",
          background: "rgba(255, 255, 255, 0.03)",
        }}
      >
        <table className="leaderboard-table" style={{ margin: 0 }}>
          <thead>
            <tr>
              <th style={{ width: "40px", textAlign: "center" }}>#</th>
              <th>{t("fixtures.team", "Team")}</th>
              <th style={{ textAlign: "center" }}>P</th>
              <th style={{ textAlign: "center" }}>W</th>
              <th style={{ textAlign: "center" }}>D</th>
              <th style={{ textAlign: "center" }}>L</th>
              <th style={{ textAlign: "center" }}>GD</th>
              <th style={{ textAlign: "center" }}>Pts</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team, idx) => (
              <tr
                key={team}
                style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.05)" }}
              >
                <td
                  style={{
                    textAlign: "center",
                    color: "var(--color-muted-2)",
                    fontSize: "0.8rem",
                  }}
                >
                  {idx + 1}
                </td>
                <td
                  onClick={() => onTeamClick(t(`teams.${team}`, team), team)}
                  style={{
                    cursor: "pointer",
                    fontWeight: 500,
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <FlagIcon team={team} /> {t(`teams.${team}`, team)}
                </td>
                <td style={{ textAlign: "center", fontSize: "0.85rem" }}>0</td>
                <td style={{ textAlign: "center", fontSize: "0.85rem" }}>0</td>
                <td style={{ textAlign: "center", fontSize: "0.85rem" }}>0</td>
                <td style={{ textAlign: "center", fontSize: "0.85rem" }}>0</td>
                <td style={{ textAlign: "center", fontSize: "0.85rem" }}>0</td>
                <td
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    color: "var(--color-gold)",
                  }}
                >
                  0
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function Fixtures() {
  const [activeGroup, setActiveGroup] = useState("A");
  const [selectedTeam, setSelectedTeam] = useState(null);
  const { t } = useTranslation();

  const matches = MATCHES_BY_GROUP[activeGroup] || [];

  return (
    <div className="page">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <div>
          <p className="section-label">{t("nav.fixtures")}</p>
          <h1 className="page-title">
            {t("fixtures.title", "Fixtures & Stats")}
          </h1>
        </div>
      </div>
      <p className="page-sub">
        {t(
          "fixtures.sub",
          "Select a group to view all matches and team rosters",
        )}
      </p>

      {/* Group selector */}
      <div className="group-tabs" style={{ marginTop: "1.5rem" }}>
        {GROUPS.map((g) => {
          return (
            <button
              key={g.id}
              className={`group-tab ${activeGroup === g.id ? "active" : ""}`}
              onClick={() => setActiveGroup(g.id)}
              title={`Group ${g.id}: ${g.teams.join(", ")}`}
            >
              {g.id}
            </button>
          );
        })}
      </div>

      {/* Group header */}
      <div className="group-header">
        <div>
          <span className="group-header-name">
            {t("predict.group")} {activeGroup}
          </span>
          <span
            className="group-header-teams"
            style={{
              marginLeft: "0.75rem",
              display: "inline-flex",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "0.5rem",
            }}
          >
            {GROUPS.find((g) => g.id === activeGroup)?.teams.map(
              (team, idx) => (
                <span
                  key={team}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.25rem",
                  }}
                >
                  {idx > 0 && <span style={{ margin: "0 0.25rem" }}>·</span>}
                  <FlagIcon team={team} /> {t(`teams.${team}`, team)}
                </span>
              ),
            )}
          </span>
        </div>
      </div>

      {/* Match cards */}
      <div className="match-grid">
        {matches.map((match) => (
          <FixtureCard
            key={match.id}
            match={match}
            t={t}
            onTeamClick={(name, raw) => setSelectedTeam({ name, raw })}
          />
        ))}
      </div>

      {/* Group Standings */}
      <GroupStandings
        group={GROUPS.find((g) => g.id === activeGroup)}
        t={t}
        onTeamClick={(name, raw) => setSelectedTeam({ name, raw })}
      />

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
