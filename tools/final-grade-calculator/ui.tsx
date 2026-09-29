"use client";

import { useState } from "react";
import NumberField, { num } from "@/components/NumberField";
import RelatedStrip from "@/components/RelatedStrip";
import RelatedTools from "@/components/RelatedTools";
import { LETTER_CUTOFFS, gradeWithFinal, letterFor, requiredFinal } from "./logic";
import FinalGradeCalculatorSEO from "./seo-content";

type Mode = "need" | "result";

const pct = (n: number) => `${n.toLocaleString("en-US", { maximumFractionDigits: 1 })}%`;

function verdict(score: number): { text: string; tone: string } {
  if (score > 100) return { text: "Not reachable without extra credit", tone: "text-amber-200" };
  if (score <= 0) return { text: "Already secured, even with a zero", tone: "text-primary-100" };
  return { text: "", tone: "" };
}

export default function FinalGradeCalculatorUI() {
  const [mode, setMode] = useState<Mode>("need");
  const [current, setCurrent] = useState("85");
  const [weight, setWeight] = useState("20");
  const [target, setTarget] = useState("90");
  const [finalScore, setFinalScore] = useState("75");

  const w = num(weight);
  const validWeight = w > 0 && w <= 100;
  const needed = validWeight ? requiredFinal(num(current), w, num(target)) : null;
  const courseGrade = validWeight ? gradeWithFinal(num(current), w, num(finalScore)) : null;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-wrap gap-2 p-1 bg-gray-100 rounded-xl w-fit mb-6" role="tablist">
        {([
          ["need", "Score I need on the final"],
          ["result", "Grade I'll get with a score"],
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

      <div className="grid md:grid-cols-2 gap-6 items-start">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
          <NumberField id="fg-current" label="Current grade in the class" value={current} onChange={setCurrent} suffix="%" max="120" />
          <NumberField id="fg-weight" label="Final exam weight" value={weight} onChange={setWeight} suffix="%" max="100" hint="Share of the course grade the final counts for" />
          {mode === "need" ? (
            <NumberField id="fg-target" label="Course grade I want" value={target} onChange={setTarget} suffix="%" max="120" />
          ) : (
            <NumberField id="fg-final" label="Score on the final exam" value={finalScore} onChange={setFinalScore} suffix="%" max="150" />
          )}
          {!validWeight && <p className="text-sm text-amber-700">Enter a final exam weight between 1% and 100%.</p>}
        </div>

        <div className="bg-primary rounded-xl p-6 text-white shadow-lg shadow-primary/20">
          {mode === "need" && needed !== null && (
            <>
              <div className="text-center pb-4 border-b border-white/20">
                <p className="text-primary-100 text-sm mb-1">You need on the final</p>
                <p className="text-5xl font-bold" data-testid="fg-needed">{pct(needed)}</p>
                {verdict(needed).text && <p className={`text-sm mt-2 ${verdict(needed).tone}`}>{verdict(needed).text}</p>}
                <p className="text-primary-100 text-xs mt-2">to finish with {pct(num(target))}</p>
              </div>
              <table className="w-full text-sm mt-4">
                <thead>
                  <tr className="text-primary-100 text-xs">
                    <th className="text-left font-normal py-1">Course grade</th>
                    <th className="text-right font-normal py-1">Score needed</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {LETTER_CUTOFFS.map((c) => {
                    const s = requiredFinal(num(current), w, c.min)!;
                    return (
                      <tr key={c.letter}>
                        <td className="py-1.5">{c.letter} ({c.min}%+)</td>
                        <td className="py-1.5 text-right font-mono">{s > 100 ? "Out of reach" : s <= 0 ? "Secured" : pct(s)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </>
          )}
          {mode === "result" && courseGrade !== null && (
            <div className="text-center">
              <p className="text-primary-100 text-sm mb-1">Your course grade would be</p>
              <p className="text-5xl font-bold" data-testid="fg-course">{pct(courseGrade)}</p>
              <p className="text-primary-100 text-sm mt-2">Letter grade {letterFor(courseGrade)} on a 90/80/70/60 scale</p>
            </div>
          )}
          {!validWeight && <p className="text-center text-primary-100">Enter your current grade and the final exam weight.</p>}
        </div>
      </div>

      <RelatedStrip />
      <FinalGradeCalculatorSEO />
      <RelatedTools />
    </div>
  );
}
