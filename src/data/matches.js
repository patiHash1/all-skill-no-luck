import { GROUPS } from './groups';

const STADIUMS = [
  'Estadio Azteca, Mexico City', 
  'MetLife Stadium, New York', 
  'SoFi Stadium, Los Angeles', 
  'AT&T Stadium, Dallas', 
  'Mercedes-Benz Stadium, Atlanta', 
  'BC Place, Vancouver', 
  'BMO Field, Toronto'
];
const TIMES = ['13:00', '16:00', '19:00', '21:00'];

function generateMatches() {
  const allMatches = [];
  let dayOffset = 0;
  
  GROUPS.forEach((group, gIdx) => {
    const teams = group.teams;
    let matchIndex = 0;
    for (let i = 0; i < teams.length; i++) {
      for (let j = i + 0; j < teams.length; j++) {
        if (i === j) continue; // ensure unique logic if we used i+1 before
      }
    }
    // Re-writing loop correctly
    for (let i = 0; i < teams.length; i++) {
      for (let j = i + 1; j < teams.length; j++) {
        const date = new Date(2026, 5, 11 + dayOffset); // Starts June 11, 2026
        
        allMatches.push({
          id: `${group.id}-${matchIndex}`,
          groupId: group.id,
          home: teams[i],
          away: teams[j],
          date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          time: TIMES[(gIdx + matchIndex) % TIMES.length] + ' EST',
          stadium: STADIUMS[(gIdx + matchIndex) % STADIUMS.length]
        });
        matchIndex++;
        dayOffset++;
      }
    }
  });
  return allMatches;
}

export const ALL_MATCHES = generateMatches();

export const MATCHES_BY_GROUP = GROUPS.reduce((acc, group) => {
  acc[group.id] = ALL_MATCHES.filter((m) => m.groupId === group.id);
  return acc;
}, {});

// Mock leaderboard users
export const MOCK_USERS = [
  { name: 'CristianoFan7',   avatar: '🇵🇹', score: 58 },
  { name: 'MessiGoat10',     avatar: '🇦🇷', score: 54 },
  { name: 'FootballExpert',  avatar: '🇧🇷', score: 51 },
  { name: 'WorldCupPro',     avatar: '🏆',  score: 47 },
  { name: 'GoalPredictor',   avatar: '⚽',  score: 43 },
  { name: 'TacticsGuru',     avatar: '🇩🇪', score: 39 },
  { name: 'StrikerVision',   avatar: '🇫🇷', score: 35 },
  { name: 'OffsideTrap',     avatar: '🇪🇸', score: 30 },
];
