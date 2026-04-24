const fs = require('fs');
const css = fs.readFileSync('src/styles/components.css', 'utf8').split('\n');

const extract = (start, end) => css.slice(start - 1, end).join('\n');

const homeCss = extract(651, 977);
const predictCss = extract(424, 467) + '\n\n' + extract(483, 511) + '\n\n' + extract(1092, 1107);
const leaderboardCss = extract(512, 588);
const resultsCss = extract(978, 1091);

fs.writeFileSync('src/styles/home.css', homeCss);
fs.writeFileSync('src/styles/predict.css', predictCss);
fs.writeFileSync('src/styles/leaderboard.css', leaderboardCss);
fs.writeFileSync('src/styles/results.css', resultsCss);

// Remove extracted lines
const keep = [];
for (let i = 0; i < css.length; i++) {
  const lineNum = i + 1;
  if (
    (lineNum >= 651 && lineNum <= 977) ||
    (lineNum >= 424 && lineNum <= 467) ||
    (lineNum >= 483 && lineNum <= 511) ||
    (lineNum >= 1092 && lineNum <= 1107) ||
    (lineNum >= 512 && lineNum <= 588) ||
    (lineNum >= 978 && lineNum <= 1091)
  ) {
    continue;
  }
  keep.push(css[i]);
}

fs.writeFileSync('src/styles/components.css', keep.join('\n'));
console.log('CSS split successful.');
