const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('SIGINT', () => {
  console.error('\nCancelled.');
  rl.close();
  process.exitCode = 1;
});

rl.on('error', (err) => {
  console.error(`Readline error: ${err?.message ?? err}`);
  rl.close();
  process.exitCode = 1;
});

rl.question('Enter your name: ', (name) => {
  try {
    console.log(`Hello, ${name}! Welcome to Creative Elements. We're thrilled to have you here. Get ready to explore, create, and bring your ideas to life!`);
  } catch (err) {
    console.error(`Unexpected error: ${err?.message ?? err}`);
    process.exitCode = 1;
  } finally {
    rl.close();
  }
});
