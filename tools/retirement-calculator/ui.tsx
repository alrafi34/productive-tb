"use client";

import { useState } from "react";
import CurrencySelect from "@/components/CurrencySelect";
import NumberField, { num } from "@/components/NumberField";
import RelatedStrip from "@/components/RelatedStrip";
import RelatedTools from "@/components/RelatedTools";
import { currencySymbol, formatMoney } from "@/lib/currency";
import { useCurrency } from "@/lib/use-currency";
import { US_401K_LIMITS, projectRetirement } from "./logic";
import RetirementCalculatorSEO from "./seo-content";

export default function RetirementCalculatorUI() {
  const [currency, setCurrency] = useCurrency("retirement-currency");
  const [age, setAge] = useState("35");
  const [retireAge, setRetireAge] = useState("67");
  const [savings, setSavings] = useState("50000");
  const [salary, setSalary] = useState("75000");
  const [contribution, setContribution] = useState("10");
  const [matchRate, setMatchRate] = useState("50");
  const [matchLimit, setMatchLimit] = useState("6");
  const [salaryGrowth, setSalaryGrowth] = useState("3");
  const [returnPct, setReturnPct] = useState("6");
  const [inflation, setInflation] = useState("2.5");
  const [withdrawal, setWithdrawal] = useState("4");
  const [usLimit, setUsLimit] = useState(true);
  const [showTable, setShowTable] = useState(false);

  const sym = currencySymbol(currency);
  const money = (n: number) => formatMoney(n, currency, 0);
  const limitApplies = currency === "USD" && usLimit;

  const r = projectRetirement({
    currentAge: num(age),
    retireAge: num(retireAge),
    currentSavings: num(savings),
    salary: num(salary),
    contributionPct: num(contribution),
    matchRatePct: num(matchRate),
    matchLimitPct: num(matchLimit),
    salaryGrowthPct: num(salaryGrowth),
    returnPct: num(returnPct),
    inflationPct: num(inflation),
    applyUsLimit: limitApplies,
    withdrawalRatePct: num(withdrawal),
  });

  return (
    <div className="max-w-5xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-6 items-start">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-5">
          <div className="flex items-center justify-between gap-2">
            <h2 className="font-semibold text-gray-900">You and your plan</h2>
            <CurrencySelect value={currency} onChange={setCurrency} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <NumberField id="rt-age" label="Current age" value={age} onChange={setAge} step="1" />
            <NumberField id="rt-retire" label="Retirement age" value={retireAge} onChange={setRetireAge} step="1" />
            <NumberField id="rt-savings" label="Saved so far" value={savings} onChange={setSavings} prefix={sym} />
            <NumberField id="rt-salary" label="Annual salary" value={salary} onChange={setSalary} prefix={sym} />
            <NumberField id="rt-contrib" label="You contribute" value={contribution} onChange={setContribution} suffix="% of pay" />
            <NumberField id="rt-growth" label="Salary growth" value={salaryGrowth} onChange={setSalaryGrowth} suffix="% / yr" />
          </div>

          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Employer match</p>
            <div className="grid grid-cols-2 gap-3">
              <NumberField id="rt-match" label="Match rate" value={matchRate} onChange={setMatchRate} suffix="%" hint="50% = 50 cents per dollar" />
              <NumberField id="rt-matchlimit" label="On contributions up to" value={matchLimit} onChange={setMatchLimit} suffix="% of pay" />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <NumberField id="rt-return" label="Return" value={returnPct} onChange={setReturnPct} suffix="%" />
            <NumberField id="rt-inflation" label="Inflation" value={inflation} onChange={setInflation} suffix="%" />
            <NumberField id="rt-withdraw" label="Withdrawal" value={withdrawal} onChange={setWithdrawal} suffix="%" />
          </div>

          {currency === "USD" && (
            <label className="flex items-start gap-2 text-sm text-gray-700">
              <input type="checkbox" checked={usLimit} onChange={(e) => setUsLimit(e.target.checked)} className="mt-1 accent-[#058554]" />
              <span>
                Cap my contributions at the {US_401K_LIMITS.year} 401(k) limit (${US_401K_LIMITS.base.toLocaleString("en-US")}, more from age 50)
              </span>
            </label>
          )}
        </div>

        <div className="space-y-4">
          <div className="bg-primary rounded-xl p-6 text-white shadow-lg shadow-primary/20">
            <div className="text-center pb-4 border-b border-white/20">
              <p className="text-primary-100 text-sm mb-1">At age {num(retireAge)} you could have</p>
              <p className="text-4xl font-bold">{money(r.balance)}</p>
              <p className="text-primary-100 text-sm mt-1">{money(r.balanceToday)} in today&apos;s money</p>
            </div>
            <dl className="grid grid-cols-2 gap-3 text-sm mt-4">
              {[
                ["Your contributions", money(r.totalYou)],
                ["Employer match", money(r.totalEmployer)],
                ["Investment growth", money(r.totalGrowth)],
                [`Yearly income at ${num(withdrawal)}%`, money(r.annualIncomeToday)],
              ].map(([k, v]) => (
                <div key={k} className="bg-white/10 rounded-lg p-3">
                  <dt className="text-primary-100 text-xs uppercase tracking-wide">{k}</dt>
                  <dd className="text-lg font-semibold">{v}</dd>
                </div>
              ))}
            </dl>
            <p className="text-xs text-primary-100 mt-3">
              Yearly income is in today&apos;s money: the first year&apos;s withdrawal at the rate you set, before tax.
              {r.capped && " Your contributions were capped at the 401(k) limit in some years."}
            </p>
          </div>

          {r.years === 0 && <p className="text-sm text-amber-700">Set a retirement age above your current age.</p>}
        </div>
      </div>

      {r.rows.length > 0 && (
        <div className="mt-6 bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <button onClick={() => setShowTable((s) => !s)} className="text-sm font-semibold text-[#058554]">
            {showTable ? "Hide" : "Show"} year-by-year projection
          </button>
          {showTable && (
            <div className="overflow-x-auto mt-3 max-h-[28rem] overflow-y-auto">
              <table className="w-full text-sm">
                <thead className="sticky top-0 bg-white">
                  <tr className="text-left text-gray-500 text-xs border-b border-gray-200">
                    <th className="py-1.5">Age</th>
                    <th className="py-1.5 text-right">Salary</th>
                    <th className="py-1.5 text-right">You</th>
                    <th className="py-1.5 text-right">Employer</th>
                    <th className="py-1.5 text-right">Growth</th>
                    <th className="py-1.5 text-right">Balance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {r.rows.map((row) => (
                    <tr key={row.age}>
                      <td className="py-1.5">{row.age}</td>
                      <td className="py-1.5 text-right font-mono">{money(row.salary)}</td>
                      <td className="py-1.5 text-right font-mono">{money(row.you)}</td>
                      <td className="py-1.5 text-right font-mono">{money(row.employer)}</td>
                      <td className="py-1.5 text-right font-mono">{money(row.growth)}</td>
                      <td className="py-1.5 text-right font-mono">{money(row.balance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      <RelatedStrip />
      <RetirementCalculatorSEO />
      <RelatedTools />
    </div>
  );
}
