import { createContext, useContext, useState, useEffect } from 'react';
import { ALL_MATCHES } from '../data/matches';

const LiveMatchContext = createContext(null);

// 10 minutes in milliseconds
const LOCK_THRESHOLD_MS = 10 * 60 * 1000;
// Kickoff is 15 minutes from now
const INITIAL_OFFSET_MS = 15 * 60 * 1000;

export function LiveMatchProvider({ children }) {
  // Select a dummy match from ALL_MATCHES (e.g., A-0: United States vs Brazil)
  const [liveMatch] = useState(() => ALL_MATCHES.find(m => m.id === 'A-0') || ALL_MATCHES[0]);
  
  // Set kickoff time 15 minutes in the future from the first load
  const [kickoffTime] = useState(() => Date.now() + INITIAL_OFFSET_MS);

  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    // Check lock status every second
    const interval = setInterval(() => {
      const timeRemaining = kickoffTime - Date.now();
      if (timeRemaining <= LOCK_THRESHOLD_MS && !isLocked) {
        setIsLocked(true);
      }
    }, 1000);
    
    // Initial check
    if (kickoffTime - Date.now() <= LOCK_THRESHOLD_MS) {
      setIsLocked(true);
    }

    return () => clearInterval(interval);
  }, [kickoffTime, isLocked]);

  return (
    <LiveMatchContext.Provider value={{ liveMatch, kickoffTime, isLocked }}>
      {children}
    </LiveMatchContext.Provider>
  );
}

export function useLiveMatch() {
  const ctx = useContext(LiveMatchContext);
  if (!ctx) throw new Error('useLiveMatch must be used within LiveMatchProvider');
  return ctx;
}
