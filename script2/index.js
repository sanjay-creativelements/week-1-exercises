const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function isPrime(n) {
  if (isNaN(n) || n < 2) return false;
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return false;
  }
  return true;
}

rl.question('Enter a number: ', (input) => {
  const num = parseInt(input);
  if (isNaN(num)) {
    console.log('Invalid input — please enter a whole number.');
  } else if (num < 2) {
    console.log(`${num} is not a prime number.`);
  } else if (isPrime(num)) {
    console.log(`${num} is a prime number!`);
  } else {
    console.log(`${num} is not a prime number.`);
  }
  rl.close();
});
