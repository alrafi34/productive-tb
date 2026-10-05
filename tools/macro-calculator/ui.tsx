"use client";

import { useEffect, useState } from "react";
import NumberField, { num } from "@/components/NumberField";
import RelatedStrip from "@/components/RelatedStrip";
import { readCarryOver } from "@/components/CarryOverLinks";
import { readBody } from "@/lib/carry-body";
import RelatedTools from "@/components/RelatedTools";
import { guessCurrency } from "@/lib/currency";
import { ACTIVITY, CM_PER_IN, GOALS, LB_PER_KG, SPLITS, macros, type Activity, type Goal, type Sex, type Split } from "./logic";
import MacroCalculatorSEO from "./seo-content";

export default function MacroCalculatorUI() {
  const [units, setUnits] = useState<"metric" | "imperial">("metric");
  const [sex, setSex] = useState<Sex>("female");
  const [age, setAge] = useState("30");
  const [kg, setKg] = useState("65");
  const [cm, setCm] = useState("165");
  const [lb, setLb] = useState("145");
  const [ft, setFt] = useState("5");
  const [inch, setInch] = useState("5");
  const [activity, setActivity] = useState<Activity>("moderate");
  const [goal, setGoal] = useState<Goal>("maintain");
  const [split, setSplit] = useState<Split>("balanced");
  const [custom, setCustom] = useState({ protein: "30", carbs: "40", fat: "30" });
  const [meals, setMeals] = useState(3);

  // US visitors get pounds and feet by default; body measurements carried over
  // from another tool (see lib/carry-body) take priority
  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const body = readBody(readCarryOver());
      if (!body) {
        if (guessCurrency() === "USD") setUnits("imperial");
        return;
      }
      setUnits(body.unit);
      if (body.unit === "metric") {
        setCm(String(body.cm));
        setKg(String(body.kg));
      } else {
        setFt(String(body.ft));
        setInch(String(body.inch));
        setLb(String(body.lb));
      }
      if (body.sex) setSex(body.sex);
      if (body.age !== undefined) setAge(String(body.age));
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const weightKg = units === "metric" ? num(kg) : num(lb) / LB_PER_KG;
  const heightCm = units === "metric" ? num(cm) : (num(ft) * 12 + num(inch)) * CM_PER_IN;
  const pct = split === "custom" ? { protein: num(custom.protein), carbs: num(custom.carbs), fat: num(custom.fat) } : SPLITS[split];
  const pctTotal = pct.protein + pct.carbs + pct.fat;
  const valid = weightKg > 0 && heightCm > 0 && num(age) > 0 && Math.abs(pctTotal - 100) < 0.01;
  const r = valid ? macros(sex, weightKg, heightCm, num(age), activity, goal, pct) : null;

  const selectCls = "w-full rounded-lg border border-gray-300 bg-white py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#058554]";
  const g = (n: number) => `${Math.round(n)} g`;

  return (
    <div className="max-w-5xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-6 items-start">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex gap-1 p-1 bg-gray-100 rounded-lg">
              {(["female", "male"] as const).map((s) => (
                <button key={s} onClick={() => setSex(s)} className={`px-3 py-1 rounded-md text-sm ${sex === s ? "bg-white shadow-sm text-gray-900" : "text-gray-600"}`}>
                  {s === "female" ? "Female" : "Male"}
                </button>
              ))}
            </div>
            <div className="flex gap-1 p-1 bg-gray-100 rounded-lg">
              {(["metric", "imperial"] as const).map((u) => (
                <button key={u} onClick={() => setUnits(u)} className={`px-3 py-1 rounded-md text-sm ${units === u ? "bg-white shadow-sm text-gray-900" : "text-gray-600"}`}>
                  {u === "metric" ? "kg / cm" : "lb / ft"}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <NumberField id="mc-age" label="Age" value={age} onChange={setAge} suffix="years" step="1" />
            {units === "metric" ? (
              <>
                <NumberField id="mc-kg" label="Weight" value={kg} onChange={setKg} suffix="kg" />
                <NumberField id="mc-cm" label="Height" value={cm} onChange={setCm} suffix="cm" />
              </>
            ) : (
              <>
                <NumberField id="mc-lb" label="Weight" value={lb} onChange={setLb} suffix="lb" />
                <NumberField id="mc-ft" label="Height" value={ft} onChange={setFt} suffix="ft" step="1" />
                <NumberField id="mc-in" label="Inches" value={inch} onChange={setInch} suffix="in" />
              </>
            )}
          </div>
          <div>
            <label htmlFor="mc-activity" className="block text-sm font-medium text-gray-700 mb-1">Activity level</label>
            <select id="mc-activity" value={activity} onChange={(e) => setActivity(e.target.value as Activity)} className={selectCls}>
              {(Object.keys(ACTIVITY) as Activity[]).map((a) => <option key={a} value={a}>{ACTIVITY[a].label}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="mc-goal" className="block text-sm font-medium text-gray-700 mb-1">Goal</label>
              <select id="mc-goal" value={goal} onChange={(e) => setGoal(e.target.value as Goal)} className={selectCls}>
                {(Object.keys(GOALS) as Goal[]).map((k) => <option key={k} value={k}>{GOALS[k].label}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="mc-split" className="block text-sm font-medium text-gray-700 mb-1">Diet</label>
              <select id="mc-split" value={split} onChange={(e) => setSplit(e.target.value as Split)} className={selectCls}>
                {(Object.keys(SPLITS) as (keyof typeof SPLITS)[]).map((k) => (
                  <option key={k} value={k}>{SPLITS[k].label} ({SPLITS[k].protein}/{SPLITS[k].carbs}/{SPLITS[k].fat})</option>
                ))}
                <option value="custom">Custom</option>
              </select>
            </div>
          </div>
          {split === "custom" && (
            <div className="grid grid-cols-3 gap-3">
              {(["protein", "carbs", "fat"] as const).map((k) => (
                <NumberField key={k} id={`mc-${k}`} label={k[0].toUpperCase() + k.slice(1)} value={custom[k]} onChange={(v) => setCustom((c) => ({ ...c, [k]: v }))} suffix="%" />
              ))}
              {Math.abs(pctTotal - 100) >= 0.01 && <p className="col-span-3 text-sm text-red-600">The three percentages add up to {pctTotal}%; they need to total 100%.</p>}
            </div>
          )}
        </div>

        <div className="bg-primary rounded-xl p-6 text-white shadow-lg shadow-primary/20">
          {r ? (
            <>
              <div className="text-center pb-4 border-b border-white/20">
                <p className="text-primary-100 text-sm mb-1">Daily target</p>
                <p className="text-4xl font-bold">{Math.round(r.calories).toLocaleString("en-US")} kcal</p>
                <p className="text-primary-100 text-xs mt-1">
                  BMR {Math.round(r.bmr)} kcal · maintenance (TDEE) {Math.round(r.tdee)} kcal
                </p>
                {r.calories < (sex === "male" ? 1500 : 1200) && (
                  <p className="text-xs bg-white/15 rounded-lg px-3 py-2 mt-3">
                    This is below the {sex === "male" ? "1,500" : "1,200"} kcal a day usually advised as a minimum
                    without medical supervision. Choose a slower goal or more activity.
                  </p>
                )}
              </div>
              <div className="grid grid-cols-3 gap-3 mt-4 text-center">
                {[
                  ["Protein", r.proteinG, pct.protein],
                  ["Carbs", r.carbsG, pct.carbs],
                  ["Fat", r.fatG, pct.fat],
                ].map(([k, v, p]) => (
                  <div key={k as string} className="bg-white/10 rounded-lg p-3">
                    <p className="text-primary-100 text-xs uppercase tracking-wide">{k}</p>
                    <p className="text-2xl font-bold">{g(v as number)}</p>
                    <p className="text-primary-100 text-xs">{p}% of kcal</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between text-sm">
                <span className="text-primary-100">Per meal</span>
                <div className="flex gap-1">
                  {[3, 4, 5].map((n) => (
                    <button key={n} onClick={() => setMeals(n)} className={`px-2 py-0.5 rounded ${meals === n ? "bg-white text-gray-900" : "bg-white/10"}`}>{n} meals</button>
                  ))}
                </div>
              </div>
              <p className="text-sm mt-2">
                {g(r.proteinG / meals)} protein · {g(r.carbsG / meals)} carbs · {g(r.fatG / meals)} fat · {Math.round(r.calories / meals)} kcal
              </p>
              <p className="text-xs text-primary-100 mt-3">
                Protein: {r.proteinPerKg.toFixed(1)} g per kg of body weight ({(r.proteinPerKg / LB_PER_KG).toFixed(2)} g per lb).
              </p>
            </>
          ) : (
            <p className="text-center text-primary-100">Enter your age, height and weight.</p>
          )}
        </div>
      </div>

      <RelatedStrip />
      <MacroCalculatorSEO />
      <RelatedTools />
    </div>
  );
}
