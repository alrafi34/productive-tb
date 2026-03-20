"use client";

import { useMemo, useState } from "react";
import {
  IdealWeightResult,
  calculateIdealWeight,
  getWeightStatus,
  getStatusColor,
  getStatusBg,
  cmToInches,
  inchesToCm,
  kgToLb,
  lbToKg
} from "./logic";
import IdealWeightCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

const QUICK_HEIGHTS_CM = [150, 160, 170, 180, 190, 200];

function toFeetInches(totalInches: number): { ft: number; in: number } {
  const roundedTotal = Math.round(totalInches);
  return {
    ft: Math.floor(roundedTotal / 12),
    in: roundedTotal % 12,
  };
}

export default function IdealWeightCalculatorUI() {
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [heightCm, setHeightCm] = useState("170");
  const [heightFt, setHeightFt] = useState("5");
  const [heightIn, setHeightIn] = useState("7");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [currentWeight, setCurrentWeight] = useState("");
  const [currentWeightLb, setCurrentWeightLb] = useState("");
  const [selectedFormula, setSelectedFormula] = useState<"devine" | "robinson" | "miller" | "broca">("devine");
  const [copied, setCopied] = useState("");

  const resolvedHeightCm = useMemo(() => {
    if (unit === "metric") return parseFloat(heightCm) || 0;
    const ft = parseFloat(heightFt) || 0;
    const inch = parseFloat(heightIn) || 0;
    return inchesToCm((ft * 12) + inch);
  }, [unit, heightCm, heightFt, heightIn]);

  const result: IdealWeightResult | null = useMemo(() => {
    if (resolvedHeightCm <= 0) return null;
    return calculateIdealWeight(resolvedHeightCm, gender);
  }, [resolvedHeightCm, gender]);

  const isValidHeight = resolvedHeightCm > 0;

  const currentWeightKg = useMemo(() => {
    if (unit === "metric") return parseFloat(currentWeight) || 0;
    return lbToKg(parseFloat(currentWeightLb) || 0);
  }, [unit, currentWeight, currentWeightLb]);

  const weightStatus = result && currentWeightKg > 0 ? getWeightStatus(currentWeightKg, result.min, result.max) : null;

  const selectedFormulaValue = result ? result[selectedFormula] : 0;
  const selectedDisplayValue = unit === "metric" ? selectedFormulaValue : kgToLb(selectedFormulaValue);
  const displayUnit = unit === "metric" ? "kg" : "lb";

  const weightDiffText = useMemo(() => {
    if (!result || !weightStatus || currentWeightKg <= 0) return "";

    if (weightStatus === "healthy") {
      return "Your current weight is within the recommended range.";
    }

    if (weightStatus === "underweight") {
      const diffKg = result.min - currentWeightKg;
      const diff = unit === "metric" ? diffKg : kgToLb(diffKg);
      return `You are ${diff.toFixed(1)} ${displayUnit} below the minimum healthy range.`;
    }

    const diffKg = currentWeightKg - result.max;
    const diff = unit === "metric" ? diffKg : kgToLb(diffKg);
    return `You are ${diff.toFixed(1)} ${displayUnit} above the maximum healthy range.`;
  }, [result, weightStatus, currentWeightKg, unit, displayUnit]);

  const selectedFormulaDescription = {
    devine: "Devine is widely used in clinical settings for quick ideal body weight estimates.",
    robinson: "Robinson typically provides a slightly more conservative estimate than Devine.",
    miller: "Miller offers a moderate estimate and is often used for comparison with other formulas.",
    broca: "Broca uses height-based estimation and gives a practical range around the central value.",
  };

  const toggleUnit = (targetUnit: "metric" | "imperial") => {
    if (unit === targetUnit) return;

    if (targetUnit === "imperial") {
      const cm = parseFloat(heightCm) || 0;
      const kg = parseFloat(currentWeight) || 0;

      if (cm > 0) {
        const { ft, in: inch } = toFeetInches(cmToInches(cm));
        setHeightFt(ft.toString());
        setHeightIn(inch.toString());
      }

      if (kg > 0) {
        setCurrentWeightLb(kgToLb(kg).toFixed(1));
      }
    } else {
      const ft = parseFloat(heightFt) || 0;
      const inch = parseFloat(heightIn) || 0;
      const lb = parseFloat(currentWeightLb) || 0;

      if (ft > 0 || inch > 0) {
        setHeightCm(inchesToCm((ft * 12) + inch).toFixed(0));
      }

      if (lb > 0) {
        setCurrentWeight(lbToKg(lb).toFixed(1));
      }
    }

    setUnit(targetUnit);
  };

  const handleQuickHeight = (cm: number) => {
    if (unit === "metric") {
      setHeightCm(String(cm));
    } else {
      const { ft, in: inch } = toFeetInches(cmToInches(cm));
      setHeightFt(String(ft));
      setHeightIn(String(inch));
    }
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(""), 2000);
  };

  const getResultText = (): string => {
    if (!result) return "";

    let text = `Ideal Weight (${selectedFormula.charAt(0).toUpperCase() + selectedFormula.slice(1)}): `;
    text += `${selectedDisplayValue.toFixed(1)} ${displayUnit}`;
    return text;
  };

  const getFullBreakdown = (): string => {
    if (!result) return "";

    let text = `Height: ${unit === "metric" ? `${resolvedHeightCm.toFixed(0)} cm` : `${heightFt}'${heightIn}"`}\n`;
    text += `Gender: ${gender.charAt(0).toUpperCase() + gender.slice(1)}\n\n`;
    text += `Ideal Weight Estimates:\n`;
    text += `Devine: ${unit === "metric" ? result.devine.toFixed(1) : kgToLb(result.devine).toFixed(1)} ${displayUnit}\n`;
    text += `Robinson: ${unit === "metric" ? result.robinson.toFixed(1) : kgToLb(result.robinson).toFixed(1)} ${displayUnit}\n`;
    text += `Miller: ${unit === "metric" ? result.miller.toFixed(1) : kgToLb(result.miller).toFixed(1)} ${displayUnit}\n`;
    text += `Broca: ${unit === "metric" ? result.broca.toFixed(1) : kgToLb(result.broca).toFixed(1)} ${displayUnit}\n`;
    text += `Broca Range: ${unit === "metric" ? result.min.toFixed(1) : kgToLb(result.min).toFixed(1)} - ${unit === "metric" ? result.max.toFixed(1) : kgToLb(result.max).toFixed(1)} ${displayUnit}`;

    return text;
  };

  const handleReset = () => {
    setUnit("metric");
    setHeightCm("170");
    setHeightFt("5");
    setHeightIn("7");
    setGender("male");
    setCurrentWeight("");
    setCurrentWeightLb("");
    setSelectedFormula("devine");
  };

  return (
    <>
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-8">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900" style={{ fontFamily: "var(--font-heading)" }}>
                Ideal Weight Calculator
              </h2>
              <p className="text-sm text-gray-600 mt-1" style={{ fontFamily: "var(--font-body)" }}>
                Estimate healthy weight using Devine, Robinson, Miller, and Broca formulas with metric or imperial units.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 self-start sm:self-auto text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-lg px-3 py-1.5">
              <span>Example:</span>
              <code>Devine uses height over 5ft</code>
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
                <label className="block text-sm font-semibold text-gray-700">Height</label>
                {unit === "metric" ? (
                  <div className="relative">
                    <input
                      type="number"
                      min="0"
                      value={heightCm}
                      onChange={(e) => setHeightCm(e.target.value)}
                      placeholder="170"
                      className="w-full rounded-xl border-2 border-transparent bg-gray-50 pl-4 pr-12 py-3 text-lg font-semibold text-gray-900 focus:outline-none focus:border-primary focus:bg-white"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-gray-500 font-medium">cm</div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    <div className="relative">
                      <input
                        type="number"
                        min="0"
                        value={heightFt}
                        onChange={(e) => setHeightFt(e.target.value)}
                        placeholder="5"
                        className="w-full rounded-xl border-2 border-transparent bg-gray-50 pl-4 pr-10 py-3 text-lg font-semibold text-gray-900 focus:outline-none focus:border-primary focus:bg-white"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-gray-500 font-medium">ft</div>
                    </div>
                    <div className="relative">
                      <input
                        type="number"
                        min="0"
                        max="11"
                        value={heightIn}
                        onChange={(e) => setHeightIn(e.target.value)}
                        placeholder="7"
                        className="w-full rounded-xl border-2 border-transparent bg-gray-50 pl-4 pr-10 py-3 text-lg font-semibold text-gray-900 focus:outline-none focus:border-primary focus:bg-white"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-gray-500 font-medium">in</div>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Quick Heights</label>
                <div className="grid grid-cols-3 gap-2">
                  {QUICK_HEIGHTS_CM.map((cm) => (
                    <button
                      key={cm}
                      onClick={() => handleQuickHeight(cm)}
                      className="px-3 py-2 text-xs font-semibold rounded-lg border border-gray-200 bg-white text-gray-700 hover:border-primary hover:text-primary transition-colors"
                    >
                      {unit === "metric"
                        ? `${cm} cm`
                        : (() => {
                            const { ft, in: inch } = toFeetInches(cmToInches(cm));
                            return `${ft}'${inch}"`;
                          })()}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Gender</label>
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
                <label className="block text-sm font-semibold text-gray-700">Current Weight (Optional)</label>
                {unit === "metric" ? (
                  <div className="relative">
                    <input
                      type="number"
                      min="0"
                      value={currentWeight}
                      onChange={(e) => setCurrentWeight(e.target.value)}
                      placeholder="65"
                      className="w-full rounded-xl border-2 border-transparent bg-gray-50 pl-4 pr-12 py-3 text-lg font-semibold text-gray-900 focus:outline-none focus:border-primary focus:bg-white"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-gray-500 font-medium">kg</div>
                  </div>
                ) : (
                  <div className="relative">
                    <input
                      type="number"
                      min="0"
                      value={currentWeightLb}
                      onChange={(e) => setCurrentWeightLb(e.target.value)}
                      placeholder="143"
                      className="w-full rounded-xl border-2 border-transparent bg-gray-50 pl-4 pr-12 py-3 text-lg font-semibold text-gray-900 focus:outline-none focus:border-primary focus:bg-white"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-gray-500 font-medium">lb</div>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Formula</label>
                <div className="grid grid-cols-2 gap-2">
                  {(["devine", "robinson", "miller", "broca"] as const).map((formula) => (
                    <button
                      key={formula}
                      onClick={() => setSelectedFormula(formula)}
                      className={`py-2.5 rounded-lg text-sm font-semibold border transition-all capitalize ${
                        selectedFormula === formula
                          ? "bg-primary border-primary text-white"
                          : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"
                      }`}
                    >
                      {formula}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="xl:col-span-7 flex flex-col gap-4">
              {!isValidHeight && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm font-medium">
                  Enter a valid height to calculate ideal weight.
                </div>
              )}

              <div className="relative overflow-hidden p-7 rounded-3xl bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-primary/15 shadow-inner">
                <span className="text-xs font-bold uppercase tracking-wider text-primary/70">Ideal Weight Result</span>
                {result ? (
                  <>
                    <div className="mt-4">
                      <p className="text-xs text-gray-500 font-medium">{selectedFormula.charAt(0).toUpperCase() + selectedFormula.slice(1)} Formula</p>
                      <h3 className="text-5xl font-black text-gray-900 leading-tight">
                        {selectedDisplayValue.toFixed(1)} {displayUnit}
                      </h3>
                    </div>
                    <p className="mt-3 text-sm text-gray-600">{selectedFormulaDescription[selectedFormula]}</p>
                  </>
                ) : (
                  <span className="block mt-4 text-2xl font-bold text-gray-300 italic">Enter valid values...</span>
                )}
                <div className="absolute -right-8 -bottom-6 text-8xl text-primary opacity-5 select-none font-black">FIT</div>
              </div>

              {result && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Devine</p>
                    <p className="text-xl font-bold text-gray-900">{unit === "metric" ? result.devine.toFixed(1) : kgToLb(result.devine).toFixed(1)} {displayUnit}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Robinson</p>
                    <p className="text-xl font-bold text-gray-900">{unit === "metric" ? result.robinson.toFixed(1) : kgToLb(result.robinson).toFixed(1)} {displayUnit}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Miller</p>
                    <p className="text-xl font-bold text-gray-900">{unit === "metric" ? result.miller.toFixed(1) : kgToLb(result.miller).toFixed(1)} {displayUnit}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Broca Range</p>
                    <p className="text-xl font-bold text-gray-900">
                      {unit === "metric" ? result.min.toFixed(1) : kgToLb(result.min).toFixed(1)} - {unit === "metric" ? result.max.toFixed(1) : kgToLb(result.max).toFixed(1)} {displayUnit}
                    </p>
                  </div>
                </div>
              )}

              {result && currentWeightKg > 0 && weightStatus && (
                <div className={`rounded-xl border p-4 ${getStatusBg(weightStatus)}`}>
                  <p className="text-xs font-bold uppercase tracking-wide text-gray-600 mb-1">Weight Status</p>
                  <p className={`text-lg font-bold capitalize ${getStatusColor(weightStatus)}`}>
                    {weightStatus === "healthy" ? "Within Healthy Range" : weightStatus === "underweight" ? "Below Healthy Range" : "Above Healthy Range"}
                  </p>
                  <p className="text-xs text-gray-600 mt-2">{weightDiffText}</p>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-3 pt-6 border-t border-gray-100 mt-8">
            <button
              onClick={() => copyToClipboard(getResultText(), "result")}
              disabled={!result}
              className={`flex-1 min-w-[150px] px-6 py-3.5 font-bold rounded-2xl transition-all ${
                !result
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : copied === "result"
                  ? "bg-emerald-600 text-white"
                  : "bg-primary hover:bg-primary-hover text-white"
              }`}
            >
              {copied === "result" ? "Copied" : "Copy Result"}
            </button>

            <button
              onClick={() => copyToClipboard(getFullBreakdown(), "full")}
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
              onClick={handleReset}
              className="px-6 py-3.5 bg-white border-2 border-gray-100 hover:border-red-200 hover:text-red-500 text-gray-600 font-bold rounded-2xl transition-all"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      <IdealWeightCalculatorSEO />

      <RelatedTools
        currentTool="ideal-weight-calculator"
        tools={["bmi-calculator", "bmr-calculator", "daily-calorie-calculator"]}
      />
    </>
  );
}
