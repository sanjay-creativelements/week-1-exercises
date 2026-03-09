const fs = require('fs').promises;

async function transformData() {
  const raw = await fs.readFile('data.json', 'utf8');
  const people = JSON.parse(raw);

  const result = people
    .filter(p => p.age >= 18)
    .map(p => ({ ...p, grade: p.score >= 60 ? 'Pass' : 'Fail' }));

  await fs.writeFile('output.json', JSON.stringify(result, null, 2));
  console.log('Done! Check output.json');
}

transformData();
