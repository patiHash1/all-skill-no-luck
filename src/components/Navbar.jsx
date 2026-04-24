const TABS = [
  { id: 'home',        icon: '🏠', label: '🏠 Home',         shortLabel: 'Home' },
  { id: 'predict',     icon: '⚽', label: '⚽ Prophesy',      shortLabel: 'Prophesy' },
  { id: 'leaderboard', icon: '🏆', label: '🏆 Leaderboard',   shortLabel: 'Rankings' },
  { id: 'results',     icon: '🔮', label: '🔮 Prophecies',    shortLabel: 'Prophecies' },
];

export default function Navbar({ activeTab, setActiveTab }) {
  return (
    <>
      {/* ── Top bar (desktop only) ── */}
      <nav className="navbar">
        <div className="navbar-inner">
          <div className="navbar-brand">ALL SKILL <span>NO LUCK</span></div>
          <ul className="nav-tabs">
            {TABS.map((t) => (
              <li key={t.id}>
                <button
                  className={`nav-tab-btn ${activeTab === t.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(t.id)}
                >
                  {t.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* ── Bottom tab bar (mobile only) ── */}
      <nav className="bottom-nav" aria-label="Main navigation">
        {TABS.map((t) => (
          <button
            key={t.id}
            className={`bottom-nav-btn ${activeTab === t.id ? 'active' : ''}`}
            onClick={() => setActiveTab(t.id)}
          >
            <span className="bottom-nav-icon">{t.icon}</span>
            <span className="bottom-nav-label">{t.shortLabel}</span>
          </button>
        ))}
      </nav>
    </>
  );
}
