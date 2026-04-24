import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';
import { usePredictions } from '../context/PredictionContext';

export default function SettingsModal({ onClose }) {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const { username, setUsername } = usePredictions();
  const [loginInput, setLoginInput] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginInput.trim()) {
      setUsername(loginInput.trim());
    }
  };

  const handleGoogleLogin = () => {
    setUsername('GoogleUser123'); // Dummy ID
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <span className="modal-title">{t('settings.title')}</span>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
          
          {/* Account Setting */}
          <div style={{ marginBottom: '0.5rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '1rem' }}>
            <span className="setting-label" style={{ display: 'block', marginBottom: '0.75rem', color: 'var(--color-accent)' }}>
              {t('settings.account')}
            </span>
            {username ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <p style={{ fontSize: '0.8rem', color: 'var(--color-text)' }}>
                  {t('settings.logged_in_as')}: <strong>{username}</strong>
                </p>
                <button 
                  className="btn-primary" 
                  onClick={() => setUsername('')}
                  style={{ background: 'var(--color-bg)', color: 'var(--color-text)', border: '1px solid var(--color-border)', minHeight: '36px' }}
                >
                  {t('settings.logout')}
                </button>
              </div>
            ) : (
              <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <input 
                  type="text" 
                  className="text-input" 
                  placeholder={t('settings.username')} 
                  value={loginInput}
                  onChange={(e) => setLoginInput(e.target.value)}
                  style={{ minHeight: '36px', fontSize: '0.85rem' }}
                />
                <input 
                  type="password" 
                  className="text-input" 
                  placeholder={t('settings.password')} 
                  style={{ minHeight: '36px', fontSize: '0.85rem' }}
                />
                <button type="submit" className="btn-primary" style={{ minHeight: '36px' }}>
                  {t('settings.login')}
                </button>
                <div style={{ textAlign: 'center', fontSize: '0.7rem', color: 'var(--color-muted)', margin: '0.25rem 0' }}>— OR —</div>
                <button 
                  type="button" 
                  className="btn-primary" 
                  onClick={handleGoogleLogin}
                  style={{ background: '#fff', color: '#444', border: '1px solid #ccc', minHeight: '36px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}
                >
                  <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google" style={{ width: '16px', height: '16px' }} />
                  {t('settings.google_login')}
                </button>
              </form>
            )}
          </div>

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
