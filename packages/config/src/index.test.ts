import { strict as assert } from "node:assert";
import { currencies, money } from "./index.js";

assert.deepEqual(currencies, ["XOF", "EUR", "USD"]);
assert.match(money(12500, "XOF"), /12[\s ]?500/);
