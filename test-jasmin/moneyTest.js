import currencyFormat from "../scripts/utils/money.js";

describe('test suite: formatCurrency', () => {
  it('converts cents to dollars', () => {
    expect(currencyFormat(2095)).toEqual('20.95');
  });
  it('works with 0', () => {
    expect(currencyFormat(0)).toEqual('0.00')
  });
  it('round up to the nearest cent', () => {
    expect(currencyFormat(2000.5)).toEqual('20.01')
  });
});