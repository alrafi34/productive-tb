/* Sales tax maths. Rates are percentages (8.25 = 8.25%). */

export type Mode = "add" | "remove" | "rate";

/* State-level base sales tax rates, from the Tax Foundation's "State and
   Local Sales Tax Rates, 2025" (January 1, 2025). Cities, counties and
   special districts add local rates on top in most states. */
export const STATE_RATES_SOURCE = "Tax Foundation, state base rates as of January 1, 2025";

export const US_STATE_RATES: { state: string; code: string; rate: number }[] = [
  { state: "Alabama", code: "AL", rate: 4 },
  { state: "Alaska", code: "AK", rate: 0 },
  { state: "Arizona", code: "AZ", rate: 5.6 },
  { state: "Arkansas", code: "AR", rate: 6.5 },
  { state: "California", code: "CA", rate: 7.25 },
  { state: "Colorado", code: "CO", rate: 2.9 },
  { state: "Connecticut", code: "CT", rate: 6.35 },
  { state: "Delaware", code: "DE", rate: 0 },
  { state: "District of Columbia", code: "DC", rate: 6 },
  { state: "Florida", code: "FL", rate: 6 },
  { state: "Georgia", code: "GA", rate: 4 },
  { state: "Hawaii", code: "HI", rate: 4 },
  { state: "Idaho", code: "ID", rate: 6 },
  { state: "Illinois", code: "IL", rate: 6.25 },
  { state: "Indiana", code: "IN", rate: 7 },
  { state: "Iowa", code: "IA", rate: 6 },
  { state: "Kansas", code: "KS", rate: 6.5 },
  { state: "Kentucky", code: "KY", rate: 6 },
  { state: "Louisiana", code: "LA", rate: 5 },
  { state: "Maine", code: "ME", rate: 5.5 },
  { state: "Maryland", code: "MD", rate: 6 },
  { state: "Massachusetts", code: "MA", rate: 6.25 },
  { state: "Michigan", code: "MI", rate: 6 },
  { state: "Minnesota", code: "MN", rate: 6.875 },
  { state: "Mississippi", code: "MS", rate: 7 },
  { state: "Missouri", code: "MO", rate: 4.225 },
  { state: "Montana", code: "MT", rate: 0 },
  { state: "Nebraska", code: "NE", rate: 5.5 },
  { state: "Nevada", code: "NV", rate: 6.85 },
  { state: "New Hampshire", code: "NH", rate: 0 },
  { state: "New Jersey", code: "NJ", rate: 6.625 },
  { state: "New Mexico", code: "NM", rate: 4.875 },
  { state: "New York", code: "NY", rate: 4 },
  { state: "North Carolina", code: "NC", rate: 4.75 },
  { state: "North Dakota", code: "ND", rate: 5 },
  { state: "Ohio", code: "OH", rate: 5.75 },
  { state: "Oklahoma", code: "OK", rate: 4.5 },
  { state: "Oregon", code: "OR", rate: 0 },
  { state: "Pennsylvania", code: "PA", rate: 6 },
  { state: "Rhode Island", code: "RI", rate: 7 },
  { state: "South Carolina", code: "SC", rate: 6 },
  { state: "South Dakota", code: "SD", rate: 4.2 },
  { state: "Tennessee", code: "TN", rate: 7 },
  { state: "Texas", code: "TX", rate: 6.25 },
  { state: "Utah", code: "UT", rate: 6.1 },
  { state: "Vermont", code: "VT", rate: 6 },
  { state: "Virginia", code: "VA", rate: 5.3 },
  { state: "Washington", code: "WA", rate: 6.5 },
  { state: "West Virginia", code: "WV", rate: 6 },
  { state: "Wisconsin", code: "WI", rate: 5 },
  { state: "Wyoming", code: "WY", rate: 4 },
];

export type SalesTaxResult = { net: number; tax: number; gross: number; rate: number };

const round2 = (n: number) => Math.round((n + Number.EPSILON) * 100) / 100;

/* Price before tax → tax and total. */
export function addTax(net: number, ratePct: number): SalesTaxResult {
  const tax = round2((net * ratePct) / 100);
  return { net: round2(net), tax, gross: round2(net + tax), rate: ratePct };
}

/* Total that already includes tax → price before tax and the tax in it. */
export function removeTax(gross: number, ratePct: number): SalesTaxResult {
  const net = round2(gross / (1 + ratePct / 100));
  return { net, tax: round2(gross - net), gross: round2(gross), rate: ratePct };
}

/* Price before tax and total paid → the rate that was charged. */
export function findRate(net: number, gross: number): SalesTaxResult | null {
  if (!(net > 0) || gross < net) return null;
  return { net: round2(net), tax: round2(gross - net), gross: round2(gross), rate: ((gross - net) / net) * 100 };
}

/* Combined rate: state base plus local (county, city, district) rates. */
export function combinedRate(stateRate: number, localRate: number): number {
  return Math.round((stateRate + localRate) * 1000) / 1000;
}
