"use client";

import { useState } from "react";
import CurrencySelect from "@/components/CurrencySelect";
import NumberField, { num } from "@/components/NumberField";
import RelatedStrip from "@/components/RelatedStrip";
import RelatedTools from "@/components/RelatedTools";
import { currencySymbol, formatMoney } from "@/lib/currency";
import { useCurrency } from "@/lib/use-currency";
import { TERMS, calculateCarLoan, type CarLoanInputs } from "./logic";
import CarLoanCalculatorSEO from "./seo-content";

export default function CarLoanCalculatorUI() {
  const [currency, setCurrency] = useCurrency("car-loan-currency");
  const [price, setPrice] = useState("35000");
  const [down, setDown] = useState("5000");
  const [tradeIn, setTradeIn] = useState("0");
  const [owed, setOwed] = useState("0");
  const [tax, setTax] = useState("7");
  const [taxAfterTradeIn, setTaxAfterTradeIn] = useState(true);
  const [fees, setFees] = useState("500");
  const [financeExtras, setFinanceExtras] = useState(true);
  const [apr, setApr] = useState("6.5");
  const [months, setMonths] = useState(60);
  const [showSchedule, setShowSchedule] = useState(false);

  const sym = currencySymbol(currency);
  const money = (n: number, d = 2) => formatMoney(n, currency, d);
  const inputs: CarLoanInputs = {
    price: num(price),
    downPayment: num(down),
    tradeInValue: num(tradeIn),
    tradeInOwed: num(owed),
    salesTaxPct: num(tax),
    taxAfterTradeIn,
    fees: num(fees),
    financeTaxAndFees: financeExtras,
    aprPct: num(apr),
    months,
  };
  const r = calculateCarLoan(inputs);
  const compare = TERMS.map((t) => ({ t, res: calculateCarLoan({ ...inputs, months: t }) }));

  return (
    <div className="max-w-5xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-6 items-start">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-5">
          <div className="flex items-center justify-between gap-2">
            <h2 className="font-semibold text-gray-900">Car and loan</h2>
            <CurrencySelect value={currency} onChange={setCurrency} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <NumberField id="cl-price" label="Vehicle price" value={price} onChange={setPrice} prefix={sym} />
            <NumberField id="cl-down" label="Down payment" value={down} onChange={setDown} prefix={sym} />
            <NumberField id="cl-trade" label="Trade-in value" value={tradeIn} onChange={setTradeIn} prefix={sym} />
            <NumberField id="cl-owed" label="Owed on trade-in" value={owed} onChange={setOwed} prefix={sym} />
            <NumberField id="cl-apr" label="Interest rate (APR)" value={apr} onChange={setApr} suffix="%" />
            <div>
              <label htmlFor="cl-term" className="block text-sm font-medium text-gray-700 mb-1">Loan term</label>
              <select
                id="cl-term"
                value={months}
                onChange={(e) => setMonths(Number(e.target.value))}
                className="w-full rounded-lg border border-gray-300 bg-white py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#058554]"
              >
                {[24, ...TERMS, 96].map((t) => (
                  <option key={t} value={t}>{t} months ({t / 12} years)</option>
                ))}
              </select>
            </div>
            <NumberField id="cl-tax" label="Sales tax" value={tax} onChange={setTax} suffix="%" hint="Your state + local rate; VAT is usually in the price" />
            <NumberField id="cl-fees" label="Title, registration & fees" value={fees} onChange={setFees} prefix={sym} />
          </div>
          <label className="flex items-start gap-2 text-sm text-gray-700">
            <input type="checkbox" checked={taxAfterTradeIn} onChange={(e) => setTaxAfterTradeIn(e.target.checked)} className="mt-1 accent-[#058554]" />
            <span>Charge sales tax on the price minus the trade-in (most US states)</span>
          </label>
          <label className="flex items-start gap-2 text-sm text-gray-700">
            <input type="checkbox" checked={financeExtras} onChange={(e) => setFinanceExtras(e.target.checked)} className="mt-1 accent-[#058554]" />
            <span>Include sales tax and fees in the loan</span>
          </label>
        </div>

        <div className="space-y-4">
          <div className="bg-primary rounded-xl p-6 text-white shadow-lg shadow-primary/20">
            <div className="text-center pb-4 border-b border-white/20">
              <p className="text-primary-100 text-sm mb-1">Monthly payment</p>
              <p className="text-4xl font-bold">{money(r.monthlyPayment)}</p>
              <p className="text-primary-100 text-sm mt-1">for {months} months at {num(apr)}% APR</p>
            </div>
            <dl className="grid grid-cols-2 gap-3 text-sm mt-4">
              {[
                ["Amount financed", money(r.loanAmount)],
                ["Total interest", money(r.totalInterest)],
                ["Sales tax", money(r.salesTax)],
                ["Paid upfront", money(r.upfront)],
                ["Total of payments", money(r.totalOfPayments)],
                ["Total cost of the car", money(r.totalCost)],
              ].map(([k, v]) => (
                <div key={k} className="bg-white/10 rounded-lg p-3">
                  <dt className="text-primary-100 text-xs uppercase tracking-wide">{k}</dt>
                  <dd className="text-lg font-semibold">{v}</dd>
                </div>
              ))}
            </dl>
            {r.negativeEquity > 0 && (
              <p className="text-xs text-primary-100 mt-3">
                You owe {money(r.negativeEquity)} more on the trade-in than it is worth; that negative equity is added to the loan.
              </p>
            )}
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <h3 className="font-semibold text-gray-900 mb-3 text-sm">Compare loan terms</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 text-xs">
                  <th className="py-1">Term</th>
                  <th className="py-1 text-right">Monthly</th>
                  <th className="py-1 text-right">Total interest</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {compare.map(({ t, res }) => (
                  <tr key={t} className={t === months ? "font-semibold text-gray-900" : "text-gray-700"}>
                    <td className="py-1.5">{t} mo</td>
                    <td className="py-1.5 text-right font-mono">{money(res.monthlyPayment)}</td>
                    <td className="py-1.5 text-right font-mono">{money(res.totalInterest, 0)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {r.schedule.length > 0 && (
        <div className="mt-6 bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <button onClick={() => setShowSchedule((s) => !s)} className="text-sm font-semibold text-[#058554]">
            {showSchedule ? "Hide" : "Show"} amortization schedule by year
          </button>
          {showSchedule && (
            <div className="overflow-x-auto mt-3">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-500 text-xs border-b border-gray-200">
                    <th className="py-1.5">Year</th>
                    <th className="py-1.5 text-right">Principal paid</th>
                    <th className="py-1.5 text-right">Interest paid</th>
                    <th className="py-1.5 text-right">Balance at year end</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {r.schedule.map((y) => (
                    <tr key={y.year}>
                      <td className="py-1.5">{y.year}</td>
                      <td className="py-1.5 text-right font-mono">{money(y.principal)}</td>
                      <td className="py-1.5 text-right font-mono">{money(y.interest)}</td>
                      <td className="py-1.5 text-right font-mono">{money(y.balance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      <RelatedStrip />
      <CarLoanCalculatorSEO />
      <RelatedTools />
    </div>
  );
}
