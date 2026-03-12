const fs = require('fs').promises;

async function transformData() {
  const raw = await fs.readFile('data.json', 'utf8');
  const people = JSON.parse(raw);

  if (!Array.isArray(people)) {
    throw new Error('Invalid data.json: expected an array of people.');
  }

  const result = people
    .filter(p => p && typeof p === 'object' && Number(p.age) >= 18)
    .map(p => ({
      ...p,
      grade: Number(p.score) >= 60 ? 'Pass' : 'Fail'
    }));

  await fs.writeFile('output.json', JSON.stringify(result, null, 2));
  console.log('Done! Check output.json');
}

transformData().catch((err) => {
  const message = err && typeof err === 'object' && 'message' in err ? err.message : String(err);
  console.error(`Error: ${message}`);
  process.exitCode = 1;
});
