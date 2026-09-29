"use client";

import { useEffect, useState } from "react";
import CurrencySelect from "@/components/CurrencySelect";
import NumberField, { num } from "@/components/NumberField";
import RelatedStrip from "@/components/RelatedStrip";
import RelatedTools from "@/components/RelatedTools";
import { currencySymbol, formatMoney, guessCurrency, type CurrencyCode } from "@/lib/currency";
import {
  NO_WAGE_TAX_STATES,
  PERIODS,
  UK_2026,
  US_2026,
  customPaycheck,
  ukPaycheck,
  usPaycheck,
  type FilingStatus,
  type Period,
} from "./logic";
import PaycheckCalculatorSEO from "./seo-content";

type Country = "us" | "uk" | "other";

export default function PaycheckCalculatorUI() {
  const [country, setCountry] = useState<Country>("us");
  const [otherCurrency, setOtherCurrency] = useState<CurrencyCode>("EUR");
  const [payType, setPayType] = useState<"salary" | "hourly">("salary");
  const [salary, setSalary] = useState("65000");
  const [hourly, setHourly] = useState("25");
  const [hours, setHours] = useState("40");
  const [period, setPeriod] = useState<Period>("biweekly");
  // US
  const [status, setStatus] = useState<FilingStatus>("single");
  const [retirementPct, setRetirementPct] = useState("5");
  const [preTax, setPreTax] = useState("0");
  const [stateRate, setStateRate] = useState("4");
  // UK and other
  const [pensionPct, setPensionPct] = useState("5");
  const [incomeTaxPct, setIncomeTaxPct] = useState("20");
  const [socialPct, setSocialPct] = useState("10");

  // Country and pay period from the visitor's region, after hydration
  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const c = guessCurrency();
      if (c === "GBP") {
        setCountry("uk");
        setPeriod("monthly");
        setSalary("35000");
      } else if (c !== "USD") {
        setCountry("other");
        setOtherCurrency(c);
        setPeriod("monthly");
      }
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const currency: CurrencyCode = country === "us" ? "USD" : country === "uk" ? "GBP" : otherCurrency;
  const sym = currencySymbol(currency);
  const money = (n: number) => formatMoney(n, currency);
  const gross = payType === "salary" ? num(salary) : num(hourly) * num(hours) * 52;

  const result =
    country === "us"
      ? usPaycheck({ gross, status, retirementPct: num(retirementPct), preTaxOther: num(preTax), stateRatePct: num(stateRate) })
      : country === "uk"
        ? ukPaycheck({ gross, pensionPct: num(pensionPct) })
        : customPaycheck({ gross, incomeTaxPct: num(incomeTaxPct), socialPct: num(socialPct), pensionPct: num(pensionPct) });

  const per = PERIODS[period].perYear;
  const periods = (country === "us" ? ["weekly", "biweekly", "semimonthly", "monthly"] : ["weekly", "fourweekly", "monthly"]) as Period[];
  const effective = gross > 0 ? ((gross - result.net) / gross) * 100 : 0;

  const selectCls = "w-full rounded-lg border border-gray-300 bg-white py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#058554]";

  return (
    <div className="max-w-5xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-6 items-start">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-5">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="pc-country" className="block text-sm font-medium text-gray-700 mb-1">Country</label>
              <select
                id="pc-country"
                value={country}
                onChange={(e) => {
                  const c = e.target.value as Country;
                  setCountry(c);
                  if (c === "us" && period === "fourweekly") setPeriod("biweekly");
                  if (c !== "us" && (period === "biweekly" || period === "semimonthly")) setPeriod("monthly");
                }}
                className={selectCls}
              >
                <option value="us">United States</option>
                <option value="uk">United Kingdom</option>
                <option value="other">Other country (your rates)</option>
              </select>
            </div>
            <div>
              <label htmlFor="pc-period" className="block text-sm font-medium text-gray-700 mb-1">Paid</label>
              <select id="pc-period" value={period} onChange={(e) => setPeriod(e.target.value as Period)} className={selectCls}>
                {periods.map((p) => (
                  <option key={p} value={p}>{PERIODS[p].label}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex gap-1 p-1 bg-gray-100 rounded-lg">
                {(["salary", "hourly"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setPayType(t)}
                    className={`px-3 py-1 rounded-md text-sm ${payType === t ? "bg-white shadow-sm text-gray-900" : "text-gray-600"}`}
                  >
                    {t === "salary" ? "Annual salary" : "Hourly"}
                  </button>
                ))}
              </div>
              {country === "other" && <CurrencySelect value={otherCurrency} onChange={setOtherCurrency} />}
            </div>
            {payType === "salary" ? (
              <NumberField id="pc-salary" label="Gross annual salary" value={salary} onChange={setSalary} prefix={sym} />
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <NumberField id="pc-hourly" label="Hourly rate" value={hourly} onChange={setHourly} prefix={sym} />
                <NumberField id="pc-hours" label="Hours per week" value={hours} onChange={setHours} />
              </div>
            )}
          </div>

          {country === "us" && (
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2">
                <label htmlFor="pc-status" className="block text-sm font-medium text-gray-700 mb-1">Filing status</label>
                <select id="pc-status" value={status} onChange={(e) => setStatus(e.target.value as FilingStatus)} className={selectCls}>
                  <option value="single">Single</option>
                  <option value="married">Married filing jointly</option>
                  <option value="head">Head of household</option>
                </select>
              </div>
              <NumberField id="pc-401k" label="401(k) / 403(b)" value={retirementPct} onChange={setRetirementPct} suffix="% of pay" />
              <NumberField id="pc-pretax" label="Pre-tax health & other" value={preTax} onChange={setPreTax} prefix="$" hint="Per year" />
              <div className="col-span-2">
                <NumberField
                  id="pc-state"
                  label="State & local income tax (average rate)"
                  value={stateRate}
                  onChange={setStateRate}
                  suffix="%"
                  hint={`0% in ${NO_WAGE_TAX_STATES.join(", ")}.`}
                />
              </div>
            </div>
          )}

          {country === "uk" && (
            <NumberField id="pc-pension" label="Workplace pension" value={pensionPct} onChange={setPensionPct} suffix="% of pay" hint="Treated as a net pay arrangement: before income tax, after National Insurance" />
          )}

          {country === "other" && (
            <div className="grid grid-cols-3 gap-3">
              <NumberField id="pc-tax" label="Income tax" value={incomeTaxPct} onChange={setIncomeTaxPct} suffix="%" />
              <NumberField id="pc-social" label="Social security" value={socialPct} onChange={setSocialPct} suffix="%" />
              <NumberField id="pc-pension-o" label="Pension" value={pensionPct} onChange={setPensionPct} suffix="%" />
              <p className="col-span-3 text-xs text-gray-500">Enter your average (effective) rates; tax systems differ too much between countries to build them all in.</p>
            </div>
          )}
        </div>

        <div className="bg-primary rounded-xl p-6 text-white shadow-lg shadow-primary/20">
          <div className="text-center pb-4 border-b border-white/20">
            <p className="text-primary-100 text-sm mb-1">Take-home pay, {PERIODS[period].label.toLowerCase()}</p>
            <p className="text-4xl font-bold">{money(result.net / per)}</p>
            <p className="text-primary-100 text-sm mt-1">{money(result.net)} a year</p>
          </div>
          <table className="w-full text-sm mt-4">
            <thead>
              <tr className="text-primary-100 text-xs">
                <th className="text-left font-normal py-1"></th>
                <th className="text-right font-normal py-1">Per paycheck</th>
                <th className="text-right font-normal py-1">Per year</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              <tr>
                <td className="py-1.5">Gross pay</td>
                <td className="py-1.5 text-right font-mono">{money(result.gross / per)}</td>
                <td className="py-1.5 text-right font-mono">{money(result.gross)}</td>
              </tr>
              {result.lines.filter((l) => l.amount > 0).map((l) => (
                <tr key={l.label}>
                  <td className="py-1.5 text-primary-100">− {l.label}</td>
                  <td className="py-1.5 text-right font-mono">{money(l.amount / per)}</td>
                  <td className="py-1.5 text-right font-mono">{money(l.amount)}</td>
                </tr>
              ))}
              <tr className="font-semibold">
                <td className="py-1.5">Take-home pay</td>
                <td className="py-1.5 text-right font-mono">{money(result.net / per)}</td>
                <td className="py-1.5 text-right font-mono">{money(result.net)}</td>
              </tr>
            </tbody>
          </table>
          <p className="text-xs text-primary-100 mt-3">
            Deductions are {effective.toFixed(1)}% of gross pay; marginal income tax rate {Math.round(result.marginal * 100)}%.{" "}
            {country === "us" ? US_2026.source : country === "uk" ? `${UK_2026.source}. Scottish income tax rates differ.` : ""}
          </p>
        </div>
      </div>

      <RelatedStrip />
      <PaycheckCalculatorSEO />
      <RelatedTools />
    </div>
  );
}
