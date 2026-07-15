export const locales = ["fr", "fon", "yo", "en", "ln"] as const;
export const currencies = ["XOF", "EUR", "USD"] as const;
export type Locale = (typeof locales)[number];
export type Currency = (typeof currencies)[number];

export const regulatedFeatures = {
  escrow: process.env.ENABLE_REGULATED_FLOWS === "true",
  tontine: process.env.ENABLE_REGULATED_FLOWS === "true",
} as const;

export const money = (minor: number, currency: Currency, locale = "fr-BJ") =>
  new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: currency === "XOF" ? 0 : 2,
  }).format(currency === "XOF" ? minor : minor / 100);

export * from "./permissions.js";
