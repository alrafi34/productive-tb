"use client";

import { useState, useEffect } from "react";
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

export default function IdealWeightCalculatorUI() {
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [heightCm, setHeightCm] = useState("170");
  const [heightFt, setHeightFt] = useState("5");
  const [heightIn, setHeightIn] = useState("7");
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [currentWeight, setCurrentWeight] = useState("");
  const [currentWeightLb, setCurrentWeightLb] = useState("");
  const [selectedFormula, setSelectedFormula] = useState<'devine' | 'robinson' | 'miller' | 'broca'>('devine');
  const [result, setResult] = useState<IdealWeightResult | null>(null);
  const [copied, setCopied] = useState("");

  const getHeightCm = (): number => {
    if (unit === 'metric') {
      return parseFloat(heightCm) || 0;
    } else {
      const ft = parseFloat(heightFt) || 0;
      const inch = parseFloat(heightIn) || 0;
      return inchesToCm((ft * 12) + inch);
    }
  };

  useEffect(() => {
    const cm = getHeightCm();
    if (cm > 0) {
      setResult(calculateIdealWeight(cm, gender));
    } else {
      setResult(null);
    }
  }, [heightCm, heightFt, heightIn, gender, unit]);

  const toggleUnit = (targetUnit: 'metric' | 'imperial') => {
    if (unit === targetUnit) return;

    if (targetUnit === 'imperial') {
      const cm = parseFloat(heightCm) || 0;
      const kg = parseFloat(currentWeight) || 0;

      if (cm > 0) {
        const totalInches = cmToInches(cm);
        const ft = Math.floor(totalInches / 12);
        const inv = Math.round(totalInches % 12);
        setHeightFt(ft.toString());
        setHeightIn(inv.toString());
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

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(""), 2000);
  };

  const getResultText = (): string => {
    if (!result) return "";

    const formulaValue = result[selectedFormula];
    let text = `Ideal Weight (${selectedFormula.charAt(0).toUpperCase() + selectedFormula.slice(1)}): `;

    if (unit === 'metric') {
      text += `${formulaValue} kg`;
    } else {
      text += `${kgToLb(formulaValue).toFixed(1)} lb`;
    }

    return text;
  };

  const getFullBreakdown = (): string => {
    if (!result) return "";

    const cm = getHeightCm();
    let text = `Height: ${unit === 'metric' ? `${cm.toFixed(0)} cm` : `${heightFt}'${heightIn}"`}\n`;
    text += `Gender: ${gender.charAt(0).toUpperCase() + gender.slice(1)}\n\n`;
    text += `Ideal Weight Ranges:\n`;
    text += `Devine: ${unit === 'metric' ? result.devine : kgToLb(result.devine).toFixed(1)} ${unit === 'metric' ? 'kg' : 'lb'}\n`;
    text += `Robinson: ${unit === 'metric' ? result.robinson : kgToLb(result.robinson).toFixed(1)} ${unit === 'metric' ? 'kg' : 'lb'}\n`;
    text += `Miller: ${unit === 'metric' ? result.miller : kgToLb(result.miller).toFixed(1)} ${unit === 'metric' ? 'kg' : 'lb'}\n`;
    text += `Broca Range: ${unit === 'metric' ? result.min : kgToLb(result.min).toFixed(1)} - ${unit === 'metric' ? result.max : kgToLb(result.max).toFixed(1)} ${unit === 'metric' ? 'kg' : 'lb'}`;

    return text;
  };

  const currentWeightKg = unit === 'metric' ? parseFloat(currentWeight) || 0 : lbToKg(parseFloat(currentWeightLb) || 0);
  const weightStatus = result && currentWeightKg > 0 ? getWeightStatus(currentWeightKg, result.min, result.max) : null;

  return (
    <>
      <div className="max-w-4xl mx-auto space-y-6">

        {/* Unit Toggle */}
        <div className="flex bg-gray-100 p-1 rounded-xl w-fit mx-auto sm:mx-0">
          <button
            onClick={() => toggleUnit('metric')}
            className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors ${unit === 'metric' ? 'bg-white text-gray-900 shadow-sm border border-gray-200' : 'text-gray-500 hover:text-gray-900'}`}
          >
            Metric (cm, kg)
          </button>
          <button
            onClick={() => toggleUnit('imperial')}
            className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors ${unit === 'imperial' ? 'bg-white text-gray-900 shadow-sm border border-gray-200' : 'text-gray-500 hover:text-gray-900'}`}
          >
            Imperial (ft, lb)
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6 items-start">

          {/* Input Panel */}
          <div className="space-y-6">

            {/* Height Input */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: "var(--font-heading)" }}>Your Height</label>

                {unit === 'metric' ? (
                  <div className="relative">
                    <input
                      type="number"
                      min="0"
                      value={heightCm}
                      onChange={(e) => setHeightCm(e.target.value)}
                      placeholder="170"
                      className="w-full rounded-lg border border-gray-200 bg-gray-50 pl-4 pr-12 py-3 text-lg font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50"
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
                        className="w-full rounded-lg border border-gray-200 bg-gray-50 pl-4 pr-10 py-3 text-lg font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50"
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
                        className="w-full rounded-lg border border-gray-200 bg-gray-50 pl-4 pr-10 py-3 text-lg font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-gray-500 font-medium">in</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Gender Selection */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Gender</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" checked={gender === 'male'} onChange={() => setGender('male')} className="text-primary focus:ring-primary w-4 h-4" />
                    <span className="text-sm font-medium text-gray-700">Male</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" checked={gender === 'female'} onChange={() => setGender('female')} className="text-primary focus:ring-primary w-4 h-4" />
                    <span className="text-sm font-medium text-gray-700">Female</span>
                  </label>
                </div>
              </div>

              {/* Current Weight (Optional) */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: "var(--font-heading)" }}>Current Weight (Optional)</label>

                {unit === 'metric' ? (
                  <div className="relative">
                    <input
                      type="number"
                      min="0"
                      value={currentWeight}
                      onChange={(e) => setCurrentWeight(e.target.value)}
                      placeholder="65"
                      className="w-full rounded-lg border border-gray-200 bg-gray-50 pl-4 pr-12 py-3 text-lg font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50"
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
                      className="w-full rounded-lg border border-gray-200 bg-gray-50 pl-4 pr-12 py-3 text-lg font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-gray-500 font-medium">lb</div>
                  </div>
                )}
              </div>
            </div>

            {/* Formula Selection */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Formula</label>
              <div className="space-y-2">
                {(['devine', 'robinson', 'miller', 'broca'] as const).map(formula => (
                  <label key={formula} className="flex items-center gap-3 cursor-pointer p-2 rounded hover:bg-gray-50 transition-colors">
                    <input
                      type="radio"
                      checked={selectedFormula === formula}
                      onChange={() => setSelectedFormula(formula)}
                      className="text-primary focus:ring-primary w-4 h-4"
                    />
                    <span className="text-sm font-medium text-gray-700 capitalize">{formula}</span>
                  </label>
                ))}
              </div>
            </div>

          </div>

          {/* Results Panel */}
          <div className="space-y-6">

            {/* Main Result */}
            {result ? (
              <div className="bg-white rounded-xl border border-gray-100 shadow-[0_4px_30px_-10px_rgba(0,0,0,0.1)] overflow-hidden">
                <div className="h-2 w-full bg-primary"></div>

                <div className="p-8 space-y-6 text-center">
                  <p className="text-gray-500 font-semibold mb-1 uppercase tracking-widest text-xs">Ideal Weight</p>

                  <div>
                    <h2 className="text-5xl md:text-6xl font-bold tracking-tight text-gray-900 mb-2">
                      {unit === 'metric' ? result[selectedFormula] : kgToLb(result[selectedFormula]).toFixed(1)}
                    </h2>
                    <p className="text-lg text-gray-500 font-medium">{unit === 'metric' ? 'kg' : 'lb'}</p>
                  </div>

                  {/* Formula Description */}
                  <div className="pt-4 border-t border-gray-100">
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Using {selectedFormula} Formula</p>
                    <p className="text-sm text-gray-600">
                      {selectedFormula === 'devine' && 'Devine formula is widely used in medical practice for calculating ideal body weight.'}
                      {selectedFormula === 'robinson' && 'Robinson formula provides a more conservative estimate of ideal weight.'}
                      {selectedFormula === 'miller' && 'Miller formula offers a middle ground between other formulas.'}
                      {selectedFormula === 'broca' && 'Broca index provides a quick estimate with ±10% range.'}
                    </p>
                  </div>
                </div>

                {/* Broca Range Display */}
                {selectedFormula === 'broca' && (
                  <div className="grid grid-cols-2 bg-gray-50 border-t border-gray-100 divide-x divide-gray-100">
                    <div className="p-4 text-center">
                      <span className="text-xs text-gray-500 font-bold uppercase tracking-wide block mb-1">Min Range</span>
                      <span className="font-semibold text-gray-900 text-sm">
                        {unit === 'metric' ? result.min : kgToLb(result.min).toFixed(1)} {unit === 'metric' ? 'kg' : 'lb'}
                      </span>
                    </div>
                    <div className="p-4 text-center">
                      <span className="text-xs text-gray-500 font-bold uppercase tracking-wide block mb-1">Max Range</span>
                      <span className="font-semibold text-gray-900 text-sm">
                        {unit === 'metric' ? result.max : kgToLb(result.max).toFixed(1)} {unit === 'metric' ? 'kg' : 'lb'}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-12 text-center text-gray-400 flex flex-col items-center justify-center min-h-[350px]">
                <div className="text-5xl mb-3 opacity-30">⚖️</div>
                <p className="font-medium">Enter your height to calculate ideal weight.</p>
              </div>
            )}

            {/* Weight Status */}
            {currentWeightKg > 0 && result && weightStatus && (
              <div className={`rounded-xl border p-4 ${getStatusBg(weightStatus)}`}>
                <p className="text-xs font-bold uppercase tracking-wide text-gray-600 mb-1">Your Status</p>
                <p className={`text-lg font-bold capitalize ${getStatusColor(weightStatus)}`}>
                  {weightStatus === 'healthy' ? '✓ Within Healthy Range' : weightStatus === 'underweight' ? '↓ Below Healthy Range' : '↑ Above Healthy Range'}
                </p>
                <p className="text-xs text-gray-600 mt-2">
                  {weightStatus === 'healthy' && `Your current weight is within the recommended range.`}
                  {weightStatus === 'underweight' && `You are ${(result.min - currentWeightKg).toFixed(1)} ${unit === 'metric' ? 'kg' : 'lb'} below the minimum.`}
                  {weightStatus === 'overweight' && `You are ${(currentWeightKg - result.max).toFixed(1)} ${unit === 'metric' ? 'kg' : 'lb'} above the maximum.`}
                </p>
              </div>
            )}

            {/* All Formulas Comparison */}
            {result && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="text-sm font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>All Formulas</h3>
                <div className="space-y-3">
                  {(['devine', 'robinson', 'miller'] as const).map(formula => (
                    <div key={formula} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700 capitalize">{formula}</span>
                      <span className="font-semibold text-gray-900">
                        {unit === 'metric' ? result[formula] : kgToLb(result[formula]).toFixed(1)} {unit === 'metric' ? 'kg' : 'lb'}
                      </span>
                    </div>
                  ))}
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <span className="text-sm font-medium text-blue-700">Broca Range</span>
                    <span className="font-semibold text-blue-900">
                      {unit === 'metric' ? result.min : kgToLb(result.min).toFixed(1)} - {unit === 'metric' ? result.max : kgToLb(result.max).toFixed(1)} {unit === 'metric' ? 'kg' : 'lb'}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Copy Actions */}
            {result && (
              <div className="grid sm:grid-cols-2 gap-2">
                <button
                  onClick={() => copyToClipboard(getResultText(), "result")}
                  className="bg-primary text-white font-medium py-2.5 rounded-lg hover:bg-primary-dark transition-colors text-sm shadow-sm"
                >
                  {copied === "result" ? "✓ Copied" : "📋 Copy Result"}
                </button>
                <button
                  onClick={() => copyToClipboard(getFullBreakdown(), "full")}
                  className="bg-white text-gray-700 font-semibold py-2.5 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors shadow-sm text-sm"
                >
                  {copied === "full" ? "✓ Copied" : "📋 Copy All"}
                </button>
              </div>
            )}

          </div>

        </div>
      </div>

      <IdealWeightCalculatorSEO />

      <RelatedTools
        currentTool="ideal-weight-calculator"
        tools={['bmi-calculator', 'bmr-calculator', 'daily-calorie-calculator']}
      />
    </>
  );
}
