import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SettingsModal from './SettingsModal';

const TABS = [
  { id: 'home',        icon: '🏠', labelKey: 'nav.home',         shortLabelKey: 'nav.home_short' },
  { id: 'predict',     icon: '⚽', labelKey: 'nav.predict',      shortLabelKey: 'nav.predict_short' },
  { id: 'leaderboard', icon: '🏆', labelKey: 'nav.leaderboard',   shortLabelKey: 'nav.leaderboard_short' },
  { id: 'results',     icon: '🔮', labelKey: 'nav.results',    shortLabelKey: 'nav.results_short' },
];

export default function Navbar({ activeTab, setActiveTab }) {
  const { t } = useTranslation();
  const [showSettings, setShowSettings] = useState(false);
  return (
    <>
      {/* ── Top bar (desktop only) ── */}
      <nav className="navbar">
        <div className="navbar-inner">
          <div className="navbar-brand">{t('nav.brand_prefix')} <span className="brand-accent">{t('nav.brand_accent')}</span></div>
          <ul className="nav-tabs">
            {TABS.map((t_item) => (
              <li key={t_item.id}>
                <button
                  className={`nav-tab-btn ${activeTab === t_item.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(t_item.id)}
                >
                  {t_item.icon} {t(t_item.labelKey)}
                </button>
              </li>
            ))}
            <li>
              <button 
                className="nav-tab-btn" 
                onClick={() => setShowSettings(true)}
                style={{ marginLeft: '1rem', display: 'flex', alignItems: 'center', fontSize: '1.1rem' }}
                title={t('settings.title')}
              >
                ⚙️
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* ── Bottom tab bar (mobile only) ── */}
      <nav className="bottom-nav" aria-label="Main navigation">
        {TABS.map((t_item) => (
          <button
            key={t_item.id}
            className={`bottom-nav-btn ${activeTab === t_item.id ? 'active' : ''}`}
            onClick={() => setActiveTab(t_item.id)}
          >
            <span className="bottom-nav-icon">{t_item.icon}</span>
            <span className="bottom-nav-label">{t(t_item.shortLabelKey)}</span>
          </button>
        ))}
        <button className="bottom-nav-btn" onClick={() => setShowSettings(true)}>
          <span className="bottom-nav-icon">⚙️</span>
          <span className="bottom-nav-label" style={{ visibility: 'hidden' }}>.</span>
        </button>
      </nav>

      {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}
    </>
  );
}
