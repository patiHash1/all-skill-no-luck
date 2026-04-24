import { StrictMode, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { PredictionProvider } from './context/PredictionContext';
import { ThemeProvider } from './context/ThemeContext';
import { LiveMatchProvider } from './context/LiveMatchContext';
import Navbar from './components/Navbar';
import Loader from './components/Loader';
import Home from './sections/Home';
import Predict from './sections/Predict';
import Leaderboard from './sections/Leaderboard';
import Results from './sections/Results';
import './index.css';
import './i18n/config';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (!loaded) return <Loader />;

  return (
    <ThemeProvider>
      <PredictionProvider>
        <LiveMatchProvider>
          <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
          <main>
            {activeTab === 'home'        && <Home onPredict={() => setActiveTab('predict')} />}
            {activeTab === 'predict'     && <Predict />}
            {activeTab === 'leaderboard' && <Leaderboard />}
            {activeTab === 'results'     && <Results />}
          </main>
        </LiveMatchProvider>
      </PredictionProvider>
    </ThemeProvider>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
