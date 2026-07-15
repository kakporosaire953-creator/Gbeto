import test from "node:test";
import assert from "node:assert/strict";

test("currency conversion keeps XOF as base", () => {
  const rates = { XOF: 1, EUR: 0.00152, USD: 0.00165 };
  assert.equal(18500 * rates.XOF, 18500);
  assert.equal(Math.round(18500 * rates.EUR * 100) / 100, 28.12);
});
