import rostersCsv from './rosters.csv?raw';

export const TEAM_STATS = {
  'Argentina': { ranking: 1, wins: 3, appearances: 18, form: ['W', 'W', 'W', 'D', 'W'], tactic: '4-3-3 Attacking' },
  'France': { ranking: 2, wins: 2, appearances: 16, form: ['W', 'L', 'W', 'W', 'W'], tactic: '4-2-3-1 Counter' },
  'Brazil': { ranking: 5, wins: 5, appearances: 22, form: ['L', 'D', 'L', 'W', 'W'], tactic: '4-2-4 Jogo Bonito' },
  'England': { ranking: 3, wins: 1, appearances: 16, form: ['W', 'D', 'W', 'W', 'D'], tactic: '4-2-3-1 Possession' },
  'Spain': { ranking: 8, wins: 1, appearances: 16, form: ['W', 'W', 'W', 'W', 'W'], tactic: '4-3-3 Tiki-Taka' },
  'Germany': { ranking: 16, wins: 4, appearances: 20, form: ['W', 'D', 'W', 'L', 'W'], tactic: '4-2-3-1 Gegenpress' },
  'United States': { ranking: 11, wins: 0, appearances: 11, form: ['W', 'L', 'W', 'W', 'L'], tactic: '4-3-3 High Press' },
  'Mexico': { ranking: 15, wins: 0, appearances: 17, form: ['L', 'D', 'W', 'L', 'D'], tactic: '4-3-3 Direct' },
  'Japan': { ranking: 18, wins: 0, appearances: 7, form: ['W', 'W', 'W', 'W', 'W'], tactic: '4-2-3-1 Fluid' },
  'Morocco': { ranking: 12, wins: 0, appearances: 6, form: ['W', 'W', 'D', 'W', 'W'], tactic: '4-1-4-1 Defensive Block' },
  'Croatia': { ranking: 10, wins: 0, appearances: 6, form: ['L', 'W', 'D', 'L', 'D'], tactic: '4-3-3 Midfield Control' },
  'Netherlands': { ranking: 6, wins: 0, appearances: 11, form: ['W', 'W', 'L', 'W', 'W'], tactic: '3-4-1-2 Total Football' },
  'Portugal': { ranking: 7, wins: 0, appearances: 8, form: ['W', 'W', 'W', 'W', 'L'], tactic: '4-3-3 Offensive' },
  'Italy': { ranking: 9, wins: 4, appearances: 18, form: ['D', 'W', 'W', 'D', 'W'], tactic: '4-3-3 Catenaccio Hybrid' },
  'Senegal': { ranking: 17, wins: 0, appearances: 3, form: ['W', 'D', 'W', 'W', 'W'], tactic: '4-3-3 Athletic Wingers' },
  'South Korea': { ranking: 22, wins: 0, appearances: 11, form: ['W', 'D', 'W', 'D', 'W'], tactic: '4-2-3-1 Counter Attack' },
};

// Parse CSV and append rosters to TEAM_STATS
const lines = rostersCsv.split('\n').map(line => line.trim()).filter(Boolean);
// skip header
for (let i = 1; i < lines.length; i++) {
  const [team, role, name] = lines[i].split(',');
  if (TEAM_STATS[team]) {
    if (!TEAM_STATS[team].roster) {
      TEAM_STATS[team].roster = { coach: '', starters: [], subs: [] };
    }
    
    if (role === 'Coach') {
      TEAM_STATS[team].roster.coach = name;
    } else if (role === 'Starter') {
      TEAM_STATS[team].roster.starters.push(name);
    } else if (role === 'Sub') {
      TEAM_STATS[team].roster.subs.push(name);
    }
  }
}
