"use client";

import { useEffect, useState } from "react";
import NumberField, { num } from "@/components/NumberField";
import RelatedStrip from "@/components/RelatedStrip";
import RelatedTools from "@/components/RelatedTools";
import { guessCurrency } from "@/lib/currency";
import { PERCENTAGES, average, estimates, repsAtPercent, roundToPlate } from "./logic";
import OneRepMaxSEO from "./seo-content";

export default function OneRepMaxUI() {
  const [unit, setUnit] = useState<"kg" | "lb">("kg");
  const [weight, setWeight] = useState("100");
  const [reps, setReps] = useState("5");

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      if (guessCurrency() === "USD") {
        setUnit("lb");
        setWeight("225");
      }
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const r = Math.round(num(reps));
  const list = estimates(num(weight), r);
  const oneRm = average(list);
  const fmt = (n: number) => `${n.toLocaleString("en-US", { maximumFractionDigits: 1 })} ${unit}`;

  return (
    <div className="max-w-5xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-6 items-start">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
          <div className="flex justify-end">
            <div className="flex gap-1 p-1 bg-gray-100 rounded-lg">
              {(["kg", "lb"] as const).map((u) => (
                <button key={u} onClick={() => setUnit(u)} className={`px-3 py-1 rounded-md text-sm ${unit === u ? "bg-white shadow-sm text-gray-900" : "text-gray-600"}`}>
                  {u}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <NumberField id="rm-weight" label="Weight lifted" value={weight} onChange={setWeight} suffix={unit} />
            <NumberField id="rm-reps" label="Reps completed" value={reps} onChange={setReps} step="1" min="1" max="20" hint="Most accurate at 2–10 reps" />
          </div>
          {r > 12 && <p className="text-sm text-amber-700">Estimates from more than 12 reps are much less reliable.</p>}

          {list.length > 0 && (
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 text-xs border-b border-gray-200">
                  <th className="py-1.5">Formula</th>
                  <th className="py-1.5 text-right">Estimated 1RM</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {list.map((e) => (
                  <tr key={e.name}>
                    <td className="py-1.5">{e.name}</td>
                    <td className="py-1.5 text-right font-mono">{fmt(e.value)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="bg-primary rounded-xl p-6 text-white shadow-lg shadow-primary/20">
          {list.length > 0 ? (
            <>
              <div className="text-center pb-4 border-b border-white/20">
                <p className="text-primary-100 text-sm mb-1">Estimated one-rep max</p>
                <p className="text-4xl font-bold">{fmt(oneRm)}</p>
                <p className="text-primary-100 text-xs mt-1">Average of seven formulas</p>
              </div>
              <table className="w-full text-sm mt-4">
                <thead>
                  <tr className="text-primary-100 text-xs">
                    <th className="text-left font-normal py-1">% of 1RM</th>
                    <th className="text-right font-normal py-1">Weight</th>
                    <th className="text-right font-normal py-1">Loadable</th>
                    <th className="text-right font-normal py-1">≈ Reps</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {PERCENTAGES.map((p) => (
                    <tr key={p}>
                      <td className="py-1">{p}%</td>
                      <td className="py-1 text-right font-mono">{fmt((oneRm * p) / 100)}</td>
                      <td className="py-1 text-right font-mono">{fmt(roundToPlate((oneRm * p) / 100, unit))}</td>
                      <td className="py-1 text-right">{repsAtPercent(p)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          ) : (
            <p className="text-center text-primary-100">Enter the weight and the number of reps you completed.</p>
          )}
        </div>
      </div>

      <RelatedStrip />
      <OneRepMaxSEO />
      <RelatedTools />
    </div>
  );
}
