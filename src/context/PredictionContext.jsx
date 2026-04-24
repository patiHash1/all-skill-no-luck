import { createContext, useContext, useState, useEffect } from 'react';

const PredictionContext = createContext(null);

export function PredictionProvider({ children }) {
  const [predictions, setPredictions] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('fifa2026_predictions') || '{}');
    } catch {
      return {};
    }
  });

  const [username, setUsername] = useState(() => {
    return localStorage.getItem('fifa2026_username') || '';
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
