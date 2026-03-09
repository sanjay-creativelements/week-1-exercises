const fs = require('fs');

const raw = fs.readFileSync('data.json', 'utf8');
const people = JSON.parse(raw);

const result = people
  .filter(p => p.age >= 18)
  .map(p => ({ ...p, grade: p.score >= 60 ? 'Pass' : 'Fail' }));

fs.writeFileSync('output.json', JSON.stringify(result, null, 2));
console.log('Done! Check output.json');
