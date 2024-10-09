import currencyFormat from "../scripts/utils/money.js";

if (currencyFormat(2095) === '20.95') {
  console.log('passed');
} else {
  console.log('failed');
}
if (currencyFormat(0) === '0.00') {
  console.log('passed');
} else {
  console.log('failed');
}
if (currencyFormat(2000.5) === '20.01') {
  console.log('passed');
} else {
  console.log('failed');
}