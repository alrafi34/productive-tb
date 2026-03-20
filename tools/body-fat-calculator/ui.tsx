"use client";

import { useEffect, useMemo, useState } from "react";
import {
  BodyFatResult,
  HistoryRecord,
  calculateNavyMale,
  calculateNavyFemale,
  calculateBMIBodyFat,
  getBodyFatDetails,
  inchesToCm,
  cmToInches,
  calculateBMI,
  lbToKg,
  kgToLb,
} from "./logic";
import BodyFatCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

type Unit = "metric" | "imperial";
type Gender = "male" | "female";
type Method = "navy" | "bmi";

function convertField(value: string, converter: (num: number) => number): string {
  const trimmed = value.trim();
  if (!trimmed) return "";

  const numeric = parseFloat(trimmed);
  if (!Number.isFinite(numeric) || numeric <= 0) return "";
  return converter(numeric).toFixed(1);
}

export default function BodyFatCalculatorUI() {
  const [unit, setUnit] = useState<Unit>("metric");
  const [gender, setGender] = useState<Gender>("male");
  const [method, setMethod] = useState<Method>("navy");

  const [waist, setWaist] = useState("85");
  const [neck, setNeck] = useState("38");
  const [hip, setHip] = useState("95");
  const [height, setHeight] = useState("175");

  const [weight, setWeight] = useState("70");
  const [heightBMI, setHeightBMI] = useState("175");
  const [age, setAge] = useState("30");

  const [history, setHistory] = useState<HistoryRecord[]>([]);
  const [copied, setCopied] = useState("");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("bodyFatHistory");
      if (!saved) return;

      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) {
        setHistory(parsed.slice(0, 20));
      }
    } catch {
      setHistory([]);
    }
  }, []);

  const parsed = useMemo(() => {
    const toPositive = (value: string) => {
      const num = parseFloat(value);
      return Number.isFinite(num) && num > 0 ? num : 0;
    };

    return {
      waist: toPositive(waist),
      neck: toPositive(neck),
      hip: toPositive(hip),
      height: toPositive(height),
      weight: toPositive(weight),
      heightBMI: toPositive(heightBMI),
      age: toPositive(age),
    };
  }, [waist, neck, hip, height, weight, heightBMI, age]);

  const result: BodyFatResult | null = useMemo(() => {
    let percentage = 0;

    if (method === "navy") {
      if (!parsed.waist || !parsed.neck || !parsed.height) return null;
      if (parsed.waist <= parsed.neck) return null;

      const waistInches = unit === "metric" ? cmToInches(parsed.waist) : parsed.waist;
      const neckInches = unit === "metric" ? cmToInches(parsed.neck) : parsed.neck;
      const heightInches = unit === "metric" ? cmToInches(parsed.height) : parsed.height;

      if (gender === "male") {
        percentage = calculateNavyMale(waistInches, neckInches, heightInches);
      } else {
        if (!parsed.hip) return null;
        const hipInches = unit === "metric" ? cmToInches(parsed.hip) : parsed.hip;
        percentage = calculateNavyFemale(waistInches, neckInches, hipInches, heightInches);
      }
    } else {
      if (!parsed.weight || !parsed.heightBMI || !parsed.age) return null;

      const weightKg = unit === "metric" ? parsed.weight : lbToKg(parsed.weight);
      const heightM = unit === "metric" ? parsed.heightBMI / 100 : inchesToCm(parsed.heightBMI) / 100;

      const bmi = calculateBMI(weightKg, heightM);
      percentage = calculateBMIBodyFat(bmi, parsed.age, gender);
    }

    if (!percentage || !Number.isFinite(percentage)) return null;
    return getBodyFatDetails(percentage, gender);
  }, [method, parsed, unit, gender]);

  const validationMessage = useMemo(() => {
    if (method === "navy") {
      if (!parsed.waist || !parsed.neck || !parsed.height || (gender === "female" && !parsed.hip)) {
        return "Enter all required measurements for the selected method.";
      }
      if (parsed.waist <= parsed.neck) {
        return "For Navy method, waist must be greater than neck.";
      }
      if (gender === "female" && (parsed.waist + parsed.hip <= parsed.neck)) {
        return "For female Navy method, waist + hip must be greater than neck.";
      }
      return "";
    }

    if (!parsed.weight || !parsed.heightBMI || !parsed.age) {
      return "Enter weight, height, and age for BMI method.";
    }
    if (parsed.age > 120) {
      return "Age should be 120 or less.";
    }
    return "";
  }, [method, parsed, gender]);

  const categoryTheme = useMemo(() => {
    switch (result?.category) {
      case "Underfat":
        return {
          text: "text-blue-700",
          band: "bg-blue-500",
          panel: "bg-blue-50 border-blue-200",
        };
      case "Fitness":
        return {
          text: "text-green-700",
          band: "bg-green-500",
          panel: "bg-green-50 border-green-200",
        };
      case "Average":
        return {
          text: "text-yellow-700",
          band: "bg-yellow-500",
          panel: "bg-yellow-50 border-yellow-200",
        };
      case "Obese":
        return {
          text: "text-red-700",
          band: "bg-red-500",
          panel: "bg-red-50 border-red-200",
        };
      default:
        return {
          text: "text-gray-700",
          band: "bg-gray-300",
          panel: "bg-gray-50 border-gray-200",
        };
    }
  }, [result]);

  const measurementsSummary = useMemo(() => {
    if (method === "navy") {
      if (gender === "male") {
        return `Waist ${waist || "-"}${unit === "metric" ? " cm" : " in"}, Neck ${neck || "-"}${unit === "metric" ? " cm" : " in"}, Height ${height || "-"}${unit === "metric" ? " cm" : " in"}`;
      }
      return `Waist ${waist || "-"}${unit === "metric" ? " cm" : " in"}, Neck ${neck || "-"}${unit === "metric" ? " cm" : " in"}, Hip ${hip || "-"}${unit === "metric" ? " cm" : " in"}, Height ${height || "-"}${unit === "metric" ? " cm" : " in"}`;
    }

    return `Weight ${weight || "-"}${unit === "metric" ? " kg" : " lb"}, Height ${heightBMI || "-"}${unit === "metric" ? " cm" : " in"}, Age ${age || "-"}`;
  }, [method, gender, unit, waist, neck, hip, height, weight, heightBMI, age]);

  const fullResultText = useMemo(() => {
    if (!result) return "";
    return [
      `Body Fat: ${result.percentage}%`,
      `Category: ${result.category}`,
      `Method: ${method === "navy" ? "US Navy" : "BMI"}`,
      `Gender: ${gender}`,
      `Unit: ${unit}`,
      `Inputs: ${measurementsSummary}`,
    ].join(" | ");
  }, [result, method, gender, unit, measurementsSummary]);

  const toggleUnit = (targetUnit: Unit) => {
    if (unit === targetUnit) return;

    if (targetUnit === "imperial") {
      setWaist((prev) => convertField(prev, cmToInches));
      setNeck((prev) => convertField(prev, cmToInches));
      setHip((prev) => convertField(prev, cmToInches));
      setHeight((prev) => convertField(prev, cmToInches));
      setWeight((prev) => convertField(prev, kgToLb));
      setHeightBMI((prev) => convertField(prev, cmToInches));
    } else {
      setWaist((prev) => convertField(prev, inchesToCm));
      setNeck((prev) => convertField(prev, inchesToCm));
      setHip((prev) => convertField(prev, inchesToCm));
      setHeight((prev) => convertField(prev, inchesToCm));
      setWeight((prev) => convertField(prev, lbToKg));
      setHeightBMI((prev) => convertField(prev, inchesToCm));
    }

    setUnit(targetUnit);
  };

  const loadSample = () => {
    if (method === "navy") {
      if (unit === "metric") {
        setWaist(gender === "male" ? "86" : "79");
        setNeck(gender === "male" ? "39" : "33");
        setHip(gender === "male" ? "95" : "98");
        setHeight(gender === "male" ? "178" : "165");
      } else {
        setWaist(gender === "male" ? "33.9" : "31.1");
        setNeck(gender === "male" ? "15.4" : "13.0");
        setHip(gender === "male" ? "37.4" : "38.6");
        setHeight(gender === "male" ? "70.1" : "65.0");
      }
      return;
    }

    if (unit === "metric") {
      setWeight(gender === "male" ? "78" : "62");
      setHeightBMI(gender === "male" ? "178" : "165");
    } else {
      setWeight(gender === "male" ? "172" : "137");
      setHeightBMI(gender === "male" ? "70.1" : "65.0");
    }
    setAge("30");
  };

  const handleReset = () => {
    setUnit("metric");
    setGender("male");
    setMethod("navy");
    setWaist("85");
    setNeck("38");
    setHip("95");
    setHeight("175");
    setWeight("70");
    setHeightBMI("175");
    setAge("30");
    setCopied("");
  };

  const copyToClipboard = (text: string, type: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(""), 1800);
  };

  const saveToHistory = () => {
    if (!result) return;

    const record: HistoryRecord = {
      id: Date.now().toString(),
      dateStr: new Date().toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" }),
      timestamp: Date.now(),
      gender,
      method,
      measurements: measurementsSummary,
      percentage: result.percentage,
      category: result.category,
      unit,
    };

    setHistory((prev) => {
      const next = [record, ...prev].slice(0, 20);
      try {
        localStorage.setItem("bodyFatHistory", JSON.stringify(next));
      } catch {
        // Ignore storage errors in private mode.
      }
      return next;
    });
  };

  const clearHistory = () => {
    setHistory([]);
    try {
      localStorage.removeItem("bodyFatHistory");
    } catch {
      // Ignore storage errors.
    }
  };

  return (
    <>
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-8">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900" style={{ fontFamily: "var(--font-heading)" }}>
                Body Fat Calculator
              </h2>
              <p className="text-sm text-gray-600 mt-1" style={{ fontFamily: "var(--font-body)" }}>
                Estimate body fat percentage with US Navy and BMI methods, then compare category and track history.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 self-start sm:self-auto text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-lg px-3 py-1.5">
              <span>Methods:</span>
              <code>Navy + BMI</code>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
            <div className="xl:col-span-5 space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Unit System</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => toggleUnit("metric")}
                    className={`py-2.5 rounded-lg text-sm font-semibold border transition-all ${
                      unit === "metric"
                        ? "bg-primary border-primary text-white"
                        : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"
                    }`}
                  >
                    Metric
                  </button>
                  <button
                    onClick={() => toggleUnit("imperial")}
                    className={`py-2.5 rounded-lg text-sm font-semibold border transition-all ${
                      unit === "imperial"
                        ? "bg-primary border-primary text-white"
                        : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"
                    }`}
                  >
                    Imperial
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Gender</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setGender("male")}
                    className={`py-2.5 rounded-lg text-sm font-semibold border transition-all ${
                      gender === "male"
                        ? "bg-primary border-primary text-white"
                        : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"
                    }`}
                  >
                    Male
                  </button>
                  <button
                    onClick={() => setGender("female")}
                    className={`py-2.5 rounded-lg text-sm font-semibold border transition-all ${
                      gender === "female"
                        ? "bg-primary border-primary text-white"
                        : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"
                    }`}
                  >
                    Female
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Calculation Method</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setMethod("navy")}
                    className={`py-2.5 rounded-lg text-sm font-semibold border transition-all ${
                      method === "navy"
                        ? "bg-primary border-primary text-white"
                        : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"
                    }`}
                  >
                    US Navy
                  </button>
                  <button
                    onClick={() => setMethod("bmi")}
                    className={`py-2.5 rounded-lg text-sm font-semibold border transition-all ${
                      method === "bmi"
                        ? "bg-primary border-primary text-white"
                        : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"
                    }`}
                  >
                    BMI
                  </button>
                </div>
              </div>

              {method === "navy" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">Waist ({unit === "metric" ? "cm" : "in"})</label>
                      <input
                        type="number"
                        min="0"
                        step="0.1"
                        value={waist}
                        onChange={(e) => setWaist(e.target.value)}
                        className="w-full rounded-xl border-2 border-transparent bg-gray-50 px-4 py-3 text-base font-semibold text-gray-900 focus:outline-none focus:border-primary focus:bg-white"
                        placeholder={unit === "metric" ? "85" : "33.5"}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">Neck ({unit === "metric" ? "cm" : "in"})</label>
                      <input
                        type="number"
                        min="0"
                        step="0.1"
                        value={neck}
                        onChange={(e) => setNeck(e.target.value)}
                        className="w-full rounded-xl border-2 border-transparent bg-gray-50 px-4 py-3 text-base font-semibold text-gray-900 focus:outline-none focus:border-primary focus:bg-white"
                        placeholder={unit === "metric" ? "38" : "15.0"}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {gender === "female" && (
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">Hip ({unit === "metric" ? "cm" : "in"})</label>
                        <input
                          type="number"
                          min="0"
                          step="0.1"
                          value={hip}
                          onChange={(e) => setHip(e.target.value)}
                          className="w-full rounded-xl border-2 border-transparent bg-gray-50 px-4 py-3 text-base font-semibold text-gray-900 focus:outline-none focus:border-primary focus:bg-white"
                          placeholder={unit === "metric" ? "95" : "37.0"}
                        />
                      </div>
                    )}

                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">Height ({unit === "metric" ? "cm" : "in"})</label>
                      <input
                        type="number"
                        min="0"
                        step="0.1"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        className="w-full rounded-xl border-2 border-transparent bg-gray-50 px-4 py-3 text-base font-semibold text-gray-900 focus:outline-none focus:border-primary focus:bg-white"
                        placeholder={unit === "metric" ? "175" : "69.0"}
                      />
                    </div>
                  </div>
                </div>
              )}

              {method === "bmi" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">Weight ({unit === "metric" ? "kg" : "lb"})</label>
                      <input
                        type="number"
                        min="0"
                        step="0.1"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        className="w-full rounded-xl border-2 border-transparent bg-gray-50 px-4 py-3 text-base font-semibold text-gray-900 focus:outline-none focus:border-primary focus:bg-white"
                        placeholder={unit === "metric" ? "70" : "154"}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">Height ({unit === "metric" ? "cm" : "in"})</label>
                      <input
                        type="number"
                        min="0"
                        step="0.1"
                        value={heightBMI}
                        onChange={(e) => setHeightBMI(e.target.value)}
                        className="w-full rounded-xl border-2 border-transparent bg-gray-50 px-4 py-3 text-base font-semibold text-gray-900 focus:outline-none focus:border-primary focus:bg-white"
                        placeholder={unit === "metric" ? "175" : "69"}
                      />
                    </div>
                  </div>

                  <div className="space-y-2 max-w-[180px]">
                    <label className="block text-sm font-semibold text-gray-700">Age</label>
                    <input
                      type="number"
                      min="1"
                      max="120"
                      step="1"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      className="w-full rounded-xl border-2 border-transparent bg-gray-50 px-4 py-3 text-base font-semibold text-gray-900 focus:outline-none focus:border-primary focus:bg-white"
                      placeholder="30"
                    />
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={loadSample}
                  className="py-2.5 rounded-lg text-sm font-semibold border bg-white border-gray-200 text-gray-700 hover:border-primary hover:text-primary transition-all"
                >
                  Use Sample
                </button>
                <button
                  onClick={handleReset}
                  className="py-2.5 rounded-lg text-sm font-semibold border bg-white border-gray-200 text-gray-700 hover:border-red-200 hover:text-red-600 transition-all"
                >
                  Reset Inputs
                </button>
              </div>
            </div>

            <div className="xl:col-span-7 flex flex-col gap-4">
              {!!validationMessage && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-amber-700 text-sm font-medium">
                  {validationMessage}
                </div>
              )}

              <div className={`relative overflow-hidden p-7 rounded-3xl border-2 shadow-inner ${categoryTheme.panel}`}>
                <span className="text-xs font-bold uppercase tracking-wider text-gray-600">Body Fat Result</span>
                {result ? (
                  <>
                    <div className="mt-4">
                      <p className="text-xs text-gray-500 font-medium">{method === "navy" ? "US Navy" : "BMI"} Method</p>
                      <h3 className="text-5xl font-black text-gray-900 leading-tight">{result.percentage}%</h3>
                      <p className={`text-sm font-bold uppercase tracking-wide mt-1 ${categoryTheme.text}`}>{result.category}</p>
                    </div>

                    <div className="mt-5">
                      <div className="h-2 w-full rounded-full bg-gray-200 overflow-hidden">
                        <div
                          className={`h-full ${categoryTheme.band}`}
                          style={{ width: `${Math.max(2, result.progressPercent)}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-2">Scale reference: 0% to 50% body fat range</p>
                    </div>
                  </>
                ) : (
                  <span className="block mt-4 text-2xl font-bold text-gray-300 italic">Enter valid values...</span>
                )}
                <div className="absolute -right-8 -bottom-6 text-8xl text-primary opacity-5 select-none font-black">BF</div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Method</p>
                  <p className="text-base font-bold text-gray-900">{method === "navy" ? "US Navy" : "BMI"}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Gender</p>
                  <p className="text-base font-bold capitalize text-gray-900">{gender}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Unit</p>
                  <p className="text-base font-bold capitalize text-gray-900">{unit}</p>
                </div>
              </div>

              <div className="rounded-xl border border-gray-200 p-4 bg-gray-50">
                <p className="text-xs font-bold uppercase tracking-wide text-gray-500 mb-2">Input Summary</p>
                <p className="text-sm text-gray-700 leading-relaxed">{measurementsSummary}</p>
              </div>

              <div className="rounded-xl border border-gray-200 p-4 bg-white">
                <p className="text-xs font-bold uppercase tracking-wide text-gray-500 mb-3">Category Guide</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  <div className="rounded-lg bg-blue-50 border border-blue-100 p-2 text-blue-700 font-semibold">Underfat</div>
                  <div className="rounded-lg bg-green-50 border border-green-100 p-2 text-green-700 font-semibold">Fitness</div>
                  <div className="rounded-lg bg-yellow-50 border border-yellow-100 p-2 text-yellow-700 font-semibold">Average</div>
                  <div className="rounded-lg bg-red-50 border border-red-100 p-2 text-red-700 font-semibold">Obese</div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 pt-6 border-t border-gray-100 mt-8">
            <button
              onClick={() => copyToClipboard(result ? `${result.percentage}%` : "", "percent")}
              disabled={!result}
              className={`flex-1 min-w-[140px] px-6 py-3.5 font-bold rounded-2xl transition-all ${
                !result
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : copied === "percent"
                  ? "bg-emerald-600 text-white"
                  : "bg-primary hover:bg-primary-hover text-white"
              }`}
            >
              {copied === "percent" ? "Copied" : "Copy %"}
            </button>

            <button
              onClick={() => copyToClipboard(fullResultText, "full")}
              disabled={!result}
              className={`px-6 py-3.5 font-bold rounded-2xl transition-all ${
                !result
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : copied === "full"
                  ? "bg-emerald-600 text-white"
                  : "bg-teal-50 border border-teal-100 text-teal-700 hover:bg-teal-100"
              }`}
            >
              {copied === "full" ? "Copied" : "Copy Full"}
            </button>

            <button
              onClick={saveToHistory}
              disabled={!result}
              className={`px-6 py-3.5 font-bold rounded-2xl transition-all ${
                !result
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-emerald-50 border border-emerald-100 text-emerald-700 hover:bg-emerald-100"
              }`}
            >
              Save History
            </button>
          </div>

          <div className="mt-6 rounded-2xl border border-gray-100 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-100">
              <p className="text-sm font-semibold text-gray-800">Recent History</p>
              <button
                onClick={clearHistory}
                disabled={history.length === 0}
                className="text-xs font-semibold text-red-600 disabled:text-gray-300"
              >
                Clear
              </button>
            </div>

            {history.length === 0 ? (
              <div className="px-4 py-6 text-sm text-gray-500">No saved entries yet.</div>
            ) : (
              <div className="divide-y divide-gray-100 max-h-72 overflow-y-auto">
                {history.map((row) => (
                  <div key={row.id} className="px-4 py-3 grid grid-cols-1 sm:grid-cols-4 gap-2 text-sm">
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Date</p>
                      <p className="font-semibold text-gray-800">{row.dateStr}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Method</p>
                      <p className="font-semibold text-gray-800 uppercase">{row.method}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Result</p>
                      <p className="font-bold text-gray-900">{row.percentage}%</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Category</p>
                      <p className="font-semibold text-gray-800">{row.category}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <BodyFatCalculatorSEO />

      <RelatedTools
        currentTool="body-fat-calculator"
        tools={["bmi-calculator", "bmr-calculator", "ideal-weight-calculator"]}
      />
    </>
  );
}
