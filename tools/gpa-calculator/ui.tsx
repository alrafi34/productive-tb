"use client";

import { useState } from "react";
import NumberField, { num } from "@/components/NumberField";
import RelatedStrip from "@/components/RelatedStrip";
import RelatedTools from "@/components/RelatedTools";
import { GRADES, LEVELS, calculateGpa, cumulativeGpa, gradePoints, type Course, type Level } from "./logic";
import GpaCalculatorSEO from "./seo-content";

type Row = { id: number; name: string; grade: string; credits: string; level: Level };

const START: Row[] = [
  { id: 1, name: "English", grade: "A", credits: "3", level: "regular" },
  { id: 2, name: "Calculus", grade: "B+", credits: "4", level: "regular" },
  { id: 3, name: "Biology", grade: "A-", credits: "4", level: "regular" },
  { id: 4, name: "History", grade: "B", credits: "3", level: "regular" },
];

export default function GpaCalculatorUI() {
  const [rows, setRows] = useState<Row[]>(START);
  const [nextId, setNextId] = useState(START.length + 1);
  const [aPlus43, setAPlus43] = useState(false);
  const [priorGpa, setPriorGpa] = useState("");
  const [priorCredits, setPriorCredits] = useState("");

  const update = (id: number, patch: Partial<Row>) => setRows((rs) => rs.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  const addRow = () => {
    setRows((rs) => [...rs, { id: nextId, name: "", grade: "A", credits: "3", level: "regular" }]);
    setNextId((n) => n + 1);
  };
  const removeRow = (id: number) => setRows((rs) => rs.filter((r) => r.id !== id));

  const courses: Course[] = rows.map((r) => ({ name: r.name, grade: r.grade, credits: num(r.credits), level: r.level }));
  const result = calculateGpa(courses, aPlus43);
  const hasWeighting = rows.some((r) => r.level !== "regular");
  const pc = num(priorCredits);
  const pg = num(priorGpa);
  const cumulative = result && pc > 0 && priorGpa.trim() !== "" ? cumulativeGpa(pg, pc, result) : null;
  const f2 = (n: number) => n.toFixed(2);

  const select = "w-full rounded-lg border border-gray-300 bg-white py-2 px-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#058554]";

  return (
    <div className="max-w-5xl mx-auto">
      <div className="grid lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
          <div className="hidden sm:grid grid-cols-[1fr_5.5rem_5rem_9rem_2rem] gap-2 text-xs text-gray-500 font-medium">
            <span>Course</span><span>Grade</span><span>Credits</span><span>Level</span><span />
          </div>
          {rows.map((r, i) => (
            <div key={r.id} className="grid grid-cols-[1fr_5.5rem_5rem_2rem] sm:grid-cols-[1fr_5.5rem_5rem_9rem_2rem] gap-2 items-center border-b border-gray-100 sm:border-0 pb-3 sm:pb-0">
              <input
                aria-label={`Course ${i + 1} name`}
                value={r.name}
                onChange={(e) => update(r.id, { name: e.target.value })}
                placeholder={`Course ${i + 1}`}
                className="w-full rounded-lg border border-gray-300 bg-white py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#058554]"
              />
              <select aria-label={`Course ${i + 1} grade`} value={r.grade} onChange={(e) => update(r.id, { grade: e.target.value })} className={select}>
                {GRADES.map((g) => (
                  <option key={g.letter} value={g.letter}>{g.letter} ({gradePoints(g.letter, aPlus43)?.toFixed(1)})</option>
                ))}
              </select>
              <input
                aria-label={`Course ${i + 1} credits`}
                type="number"
                inputMode="decimal"
                min="0"
                step="any"
                value={r.credits}
                onChange={(e) => update(r.id, { credits: e.target.value })}
                className="w-full rounded-lg border border-gray-300 bg-white py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#058554]"
              />
              <select
                aria-label={`Course ${i + 1} level`}
                value={r.level}
                onChange={(e) => update(r.id, { level: e.target.value as Level })}
                className={`${select} col-span-3 sm:col-span-1 order-last sm:order-none`}
              >
                {(Object.keys(LEVELS) as Level[]).map((l) => (
                  <option key={l} value={l}>{LEVELS[l].label}{LEVELS[l].bonus ? ` (+${LEVELS[l].bonus})` : ""}</option>
                ))}
              </select>
              <button
                onClick={() => removeRow(r.id)}
                aria-label={`Remove course ${i + 1}`}
                className="h-9 w-8 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50"
              >
                ×
              </button>
            </div>
          ))}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <button onClick={addRow} className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50">
              + Add course
            </button>
            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input type="checkbox" checked={aPlus43} onChange={(e) => setAPlus43(e.target.checked)} className="accent-[#058554]" />
              My school counts A+ as 4.3
            </label>
          </div>

          <div className="pt-4 border-t border-gray-100">
            <p className="text-sm font-medium text-gray-700 mb-3">Cumulative GPA (optional)</p>
            <div className="grid grid-cols-2 gap-3">
              <NumberField id="gpa-prior" label="GPA so far" value={priorGpa} onChange={setPriorGpa} max="5" />
              <NumberField id="gpa-prior-credits" label="Credits so far" value={priorCredits} onChange={setPriorCredits} />
            </div>
          </div>
        </div>

        <div className="bg-primary rounded-xl p-6 text-white shadow-lg shadow-primary/20">
          {result ? (
            <>
              <div className="text-center pb-4 border-b border-white/20">
                <p className="text-primary-100 text-sm mb-1">{hasWeighting ? "Unweighted GPA" : "Term GPA"}</p>
                <p className="text-5xl font-bold" data-testid="gpa-unweighted">{f2(result.unweighted)}</p>
              </div>
              {hasWeighting && (
                <div className="text-center py-4 border-b border-white/20">
                  <p className="text-primary-100 text-sm mb-1">Weighted GPA</p>
                  <p className="text-3xl font-bold" data-testid="gpa-weighted">{f2(result.weighted)}</p>
                </div>
              )}
              {cumulative !== null && (
                <div className="text-center py-4 border-b border-white/20">
                  <p className="text-primary-100 text-sm mb-1">New cumulative GPA</p>
                  <p className="text-3xl font-bold" data-testid="gpa-cumulative">{f2(cumulative)}</p>
                  <p className="text-primary-100 text-xs mt-1">over {(pc + result.credits).toLocaleString("en-US")} credits</p>
                </div>
              )}
              <dl className="mt-4 space-y-1 text-sm">
                <div className="flex justify-between"><dt className="text-primary-100">Credits counted</dt><dd>{result.credits.toLocaleString("en-US")}</dd></div>
                <div className="flex justify-between"><dt className="text-primary-100">Quality points</dt><dd>{result.qualityPoints.toLocaleString("en-US", { maximumFractionDigits: 2 })}</dd></div>
              </dl>
            </>
          ) : (
            <p className="text-center text-primary-100">Add a course with a grade and its credits.</p>
          )}
        </div>
      </div>

      <RelatedStrip />
      <GpaCalculatorSEO />
      <RelatedTools />
    </div>
  );
}
