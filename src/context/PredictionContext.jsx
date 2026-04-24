import { createContext, useContext, useState, useEffect } from 'react';

const PredictionContext = createContext(null);
const DUMMY_PREDICTIONS = {
  'A-0': 'home',
  'A-1': 'draw',
  'A-2': 'away',
  'B-0': 'home',
  'B-1': 'away',
  'C-0': 'home'
};

export function PredictionProvider({ children }) {
  const [predictions, setPredictions] = useState(() => {
    try {
      const saved = localStorage.getItem('fifa2026_predictions');
      if (saved) {
        const parsed = JSON.parse(saved);
        return Object.keys(parsed).length > 0 ? parsed : DUMMY_PREDICTIONS;
      }
      return DUMMY_PREDICTIONS;
    } catch {
      return DUMMY_PREDICTIONS;
    }
  });

  const [username, setUsername] = useState(() => {
    return localStorage.getItem('fifa2026_username') || 'DummyUser99';
  });

  const [userScore] = useState(() => {
    // Deterministic mock score seeded by username length
    return Math.floor(Math.random() * 30) + 20;
  });

  useEffect(() => {
    localStorage.setItem('fifa2026_predictions', JSON.stringify(predictions));
  }, [predictions]);

  useEffect(() => {
    if (username) localStorage.setItem('fifa2026_username', username);
  }, [username]);

  function setPrediction(matchId, result) {
    setPredictions((prev) => ({ ...prev, [matchId]: result }));
  }

  function clearPredictions() {
    setPredictions({});
    localStorage.removeItem('fifa2026_predictions');
  }

  const predictionCount = Object.keys(predictions).length;

  return (
    <PredictionContext.Provider
      value={{ predictions, setPrediction, clearPredictions, predictionCount, username, setUsername, userScore }}
    >
      {children}
    </PredictionContext.Provider>
  );
}

export function usePredictions() {
  const ctx = useContext(PredictionContext);
  if (!ctx) throw new Error('usePredictions must be used inside PredictionProvider');
  return ctx;
}
