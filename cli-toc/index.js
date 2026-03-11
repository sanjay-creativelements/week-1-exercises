#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const c = {
  reset:  '\x1b[0m',
  bold:   '\x1b[1m',
  dim:    '\x1b[2m',
  cyan:   '\x1b[36m',
  yellow: '\x1b[33m',
  green:  '\x1b[32m',
  red:    '\x1b[31m',
};

// Parse --dir / -d flag, falling back to positional arg or '.'
const args = process.argv.slice(2);
let dir = '.';
for (let i = 0; i < args.length; i++) {
  if ((args[i] === '--dir' || args[i] === '-d') && args[i + 1]) {
    dir = args[++i];
  } else if (!args[i].startsWith('-')) {
    dir = args[i];
  }
}

if (!fs.existsSync(dir) || !fs.statSync(dir).isDirectory()) {
  console.error(`${c.red}Error:${c.reset} "${dir}" is not a valid directory`);
  process.exit(1);
}

const files = fs.readdirSync(dir)
  .filter(f => f.endsWith('.md') && f !== 'TOC.md')
  .sort();

if (files.length === 0) {
  console.error(`${c.red}Error:${c.reset} No markdown files found in "${dir}".`);
  process.exit(1);
}

const entries = files.map(file => {
  const content = fs.readFileSync(path.join(dir, file), 'utf8');
  const match = content.match(/^#\s+(.+)$/m);
  const heading = match ? match[1].trim() : null;
  return { file, heading };
});

// Terminal output
console.log(`\n${c.bold}${c.cyan}Table of Contents${c.reset} ${c.dim}(${dir})${c.reset}\n`);
for (const { file, heading } of entries) {
  if (heading) {
    console.log(`  ${c.green}•${c.reset} ${c.bold}${file}${c.reset} — ${heading}`);
  } else {
    console.log(`  ${c.yellow}•${c.reset} ${c.bold}${file}${c.reset} ${c.yellow}(no H1 heading found)${c.reset}`);
  }
}
console.log('');

// Write TOC.md (plain text, no ANSI codes)
const lines = ['# Table of Contents', ''];
for (const { file, heading } of entries) {
  lines.push(`- **${file}** — ${heading ?? '(no H1 heading found)'}`);
}
lines.push('');

const tocPath = path.join(dir, 'TOC.md');
fs.writeFileSync(tocPath, lines.join('\n'));
console.log(`${c.green}Saved${c.reset} → ${tocPath}`);
