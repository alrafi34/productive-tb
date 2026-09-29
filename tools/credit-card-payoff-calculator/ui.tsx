"use client";

import { useState } from "react";
import CurrencySelect from "@/components/CurrencySelect";
import NumberField, { num } from "@/components/NumberField";
import RelatedStrip from "@/components/RelatedStrip";
import RelatedTools from "@/components/RelatedTools";
import { currencySymbol, formatMoney } from "@/lib/currency";
import { useCurrency } from "@/lib/use-currency";
import { formatDuration, paymentForMonths, payoffMinimumOnly, payoffWithPayment } from "./logic";
import CreditCardPayoffSEO from "./seo-content";

type Mode = "payment" | "months";

export default function CreditCardPayoffUI() {
  const [currency, setCurrency] = useCurrency("cc-payoff-currency");
  const [mode, setMode] = useState<Mode>("payment");
  const [balance, setBalance] = useState("5000");
  const [apr, setApr] = useState("22.9");
  const [payment, setPayment] = useState("200");
  const [months, setMonths] = useState("24");
  const [floor, setFloor] = useState("25");

  const sym = currencySymbol(currency);
  const money = (n: number) => formatMoney(n, currency);
  const b = num(balance);
  const rate = num(apr);

  const monthlyPayment = mode === "payment" ? num(payment) : paymentForMonths(b, rate, Math.round(num(months)));
  const plan = payoffWithPayment(b, rate, monthlyPayment);
  const minimum = payoffMinimumOnly(b, rate, num(floor));
  const firstInterest = (b * rate) / 100 / 12;

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex flex-wrap gap-2 p-1 bg-gray-100 rounded-xl w-fit mb-6" role="tablist">
        {([
          ["payment", "I can pay a fixed amount"],
          ["months", "I want to be debt-free by"],
        ] as [Mode, string][]).map(([id, label]) => (
          <button
            key={id}
            role="tab"
            aria-selected={mode === id}
            onClick={() => setMode(id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${mode === id ? "bg-white text-gray-900 shadow-sm border border-gray-200" : "text-gray-600 hover:text-gray-900"}`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6 items-start">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between gap-2">
            <h2 className="font-semibold text-gray-900">Your card</h2>
            <CurrencySelect value={currency} onChange={setCurrency} />
          </div>
          <NumberField id="cc-balance" label="Current balance" value={balance} onChange={setBalance} prefix={sym} />
          <NumberField id="cc-apr" label="Interest rate (APR)" value={apr} onChange={setApr} suffix="%" hint="On your statement; purchase APR if you are not on a promotional rate" />
          {mode === "payment" ? (
            <NumberField id="cc-payment" label="Monthly payment" value={payment} onChange={setPayment} prefix={sym} />
          ) : (
            <NumberField id="cc-months" label="Pay it off in" value={months} onChange={setMonths} suffix="months" step="1" min="1" />
          )}
          <NumberField id="cc-floor" label="Card's minimum payment floor" value={floor} onChange={setFloor} prefix={sym} hint="Used for the minimum-only comparison: interest + 1% of the balance, at least this amount" />
        </div>

        <div className="space-y-4">
          <div className="bg-primary rounded-xl p-6 text-white shadow-lg shadow-primary/20">
            {plan.never ? (
              <div className="text-center">
                <p className="text-2xl font-bold mb-2">This payment never clears the balance</p>
                <p className="text-primary-100 text-sm">
                  The first month&apos;s interest is {money(firstInterest)}. Pay more than that each month, or the balance will
                  stay the same or grow.
                </p>
              </div>
            ) : (
              <>
                <div className="text-center pb-4 border-b border-white/20">
                  <p className="text-primary-100 text-sm mb-1">{mode === "payment" ? "Debt-free in" : "Pay each month"}</p>
                  <p className="text-4xl font-bold">{mode === "payment" ? formatDuration(plan.months) : money(monthlyPayment)}</p>
                </div>
                <dl className="grid grid-cols-2 gap-3 text-sm mt-4">
                  {[
                    ["Monthly payment", money(monthlyPayment)],
                    ["Months to pay off", String(plan.months)],
                    ["Total interest", money(plan.totalInterest)],
                    ["Total paid", money(plan.totalPaid)],
                  ].map(([k, v]) => (
                    <div key={k} className="bg-white/10 rounded-lg p-3">
                      <dt className="text-primary-100 text-xs uppercase tracking-wide">{k}</dt>
                      <dd className="text-lg font-semibold">{v}</dd>
                    </div>
                  ))}
                </dl>
              </>
            )}
          </div>

          {b > 0 && (
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 text-sm">
              <h3 className="font-semibold text-gray-900 mb-2">If you paid only the minimum</h3>
              <p className="text-gray-600">
                {minimum.never
                  ? "The balance would not be paid off within 100 years."
                  : <>It would take <strong>{formatDuration(minimum.months)}</strong> and cost <strong>{money(minimum.totalInterest)}</strong> in interest.</>}
                {!plan.never && !minimum.never && minimum.totalInterest > plan.totalInterest && (
                  <> Your plan saves <strong className="text-[#058554]">{money(minimum.totalInterest - plan.totalInterest)}</strong> and{" "}
                    {formatDuration(Math.max(minimum.months - plan.months, 0))}.</>
                )}
              </p>
            </div>
          )}
        </div>
      </div>

      <RelatedStrip />
      <CreditCardPayoffSEO />
      <RelatedTools />
    </div>
  );
}
