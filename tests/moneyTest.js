import currencyFormat from "../scripts/utils/money.js";

console.log('Test suite: formatCurrency');
console.log('converts cents to dollars');

if (currencyFormat(2095) === '20.95') {
  console.log('passed');
} else {
  console.log('failed');
}

console.log('works with 0');

if (currencyFormat(0) === '0.00') {
  console.log('passed');
} else {
  console.log('failed');
}

console.log('round up to the nearest cent');

if (currencyFormat(2000.5) === '20.01') {
  console.log('passed');
} else {
  console.log('failed');
}