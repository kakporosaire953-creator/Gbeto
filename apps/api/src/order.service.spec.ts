import test from "node:test";
import assert from "node:assert/strict";
import { OrderService } from "./order.service";

const service = new OrderService();
test("splits commissions without floating point money", () => {
  assert.deepEqual(service.splitAmount(10_001, 900), { platformMinor: 900, sellerMinor: 9_101 });
});
test("rejects unsafe order transitions", () => {
  assert.throws(() => service.nextState("PENDING_PAYMENT", "DELIVERED"));
  assert.equal(service.nextState("PAID", "ACCEPTED"), "ACCEPTED");
});
