#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const dir = process.argv[2] || '.';

if (!fs.existsSync(dir) || !fs.statSync(dir).isDirectory()) {
  console.error(`Error: "${dir}" is not a valid directory`);
  process.exit(1);
}

const files = fs.readdirSync(dir)
  .filter(f => f.endsWith('.md') && f !== 'TOC.md')
  .sort();

if (files.length === 0) {
  console.error('No markdown files found.');
  process.exit(1);
}

const entries = files.map(file => {
  const content = fs.readFileSync(path.join(dir, file), 'utf8');
  const match = content.match(/^#\s+(.+)$/m);
  const heading = match ? match[1].trim() : '(no H1 found)';
  return { file, heading };
});

const lines = ['# Table of Contents', ''];
for (const { file, heading } of entries) {
  lines.push(`- **${file}** — ${heading}`);
}
lines.push('');

const output = lines.join('\n');

console.log(output);

const tocPath = path.join(dir, 'TOC.md');
fs.writeFileSync(tocPath, output);
console.log(`Saved to ${tocPath}`);
