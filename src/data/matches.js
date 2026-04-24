import { GROUPS } from './groups';

function generateMatches() {
  const allMatches = [];
  GROUPS.forEach((group) => {
    const teams = group.teams;
    let matchIndex = 0;
    for (let i = 0; i < teams.length; i++) {
      for (let j = i + 1; j < teams.length; j++) {
        allMatches.push({
          id: `${group.id}-${matchIndex}`,
          groupId: group.id,
          home: teams[i],
          away: teams[j],
        });
        matchIndex++;
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
