import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';

export default function SettingsModal({ onClose }) {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <span className="modal-title">{t('settings.title')}</span>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          {/* Language Setting */}
          <div className="setting-row">
            <span className="setting-label">{t('settings.language')}</span>
            <select
              value={i18n.resolvedLanguage || i18n.language}
              onChange={(e) => i18n.changeLanguage(e.target.value)}
              className="text-input"
              style={{ width: 'auto', padding: '0.4rem 0.5rem', cursor: 'pointer' }}
            >
              <option value="en">English</option>
              <option value="es">Español</option>
            </select>
          </div>

          {/* Theme Setting */}
          <div className="setting-row">
            <span className="setting-label">{t('settings.theme')}</span>
            <div className="theme-toggle">
              <button
                className={`theme-toggle-btn ${theme === 'light' ? 'active' : ''}`}
                onClick={() => theme === 'dark' && toggleTheme()}
              >
                {t('settings.theme_light')}
              </button>
              <button
                className={`theme-toggle-btn ${theme === 'dark' ? 'active' : ''}`}
                onClick={() => theme === 'light' && toggleTheme()}
              >
                {t('settings.theme_dark')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
