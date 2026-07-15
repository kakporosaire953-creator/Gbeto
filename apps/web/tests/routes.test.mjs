import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";

const routes = [
  "app/page.tsx",
  "app/catalogue/page.tsx",
  "app/produit/[slug]/page.tsx",
  "app/panier/page.tsx",
  "app/compte/page.tsx",
  "app/dashboard/page.tsx",
  "app/admin/page.tsx",
];

test("all planned marketplace routes exist", () => {
  for (const route of routes) assert.ok(existsSync(new URL(`../${route}`, import.meta.url)), route);
});

test("regulated financial controls are visible to administrators", () => {
  const page = readFileSync(new URL("../app/admin/page.tsx", import.meta.url), "utf8");
  assert.match(page, /Escrow et tontine restent bloqués/);
});

test("checkout explains multi-currency confirmation", () => {
  const page = readFileSync(new URL("../app/panier/page.tsx", import.meta.url), "utf8");
  assert.match(page, /EUR\/USD/);
  assert.match(page, /taux seront confirmés avant paiement/);
});
