import { useTranslation } from 'react-i18next';

export default function Loader() {
  const { t } = useTranslation();
  return (
    <div className="loader">
      <p className="loader-eyebrow">{t('loader.eyebrow')}</p>
      <div className="loader-title">
        {t('loader.title1')}<br /><span>{t('loader.title2')}</span>
      </div>
      <p className="loader-sub">{t('loader.sub')}</p>
      <div className="loader-bar-track">
        <div className="loader-bar-fill" />
      </div>
    </div>
  );
}
