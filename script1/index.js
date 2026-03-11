const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter your name: ', (name) => {
  console.log(`Hello, ${name}! Welcome to Creative Elements. We're thrilled to have you here. Get ready to explore, create, and bring your ideas to life!`);
  rl.close();
});
