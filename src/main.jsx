import { StrictMode, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { PredictionProvider } from './context/PredictionContext';
import Navbar from './components/Navbar';
import Loader from './components/Loader';
import Hero from './sections/Hero';
import Predict from './sections/Predict';
import Leaderboard from './sections/Leaderboard';
import Results from './sections/Results';
import './index.css';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (!loaded) return <Loader />;

  return (
    <PredictionProvider>
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main>
        {activeTab === 'home'        && <Hero onPredict={() => setActiveTab('predict')} />}
        {activeTab === 'predict'     && <Predict />}
        {activeTab === 'leaderboard' && <Leaderboard />}
        {activeTab === 'results'     && <Results />}
      </main>
    </PredictionProvider>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
