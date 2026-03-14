"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { 
  Gender,
  ActivityLevel,
  UnitSystem,
  HistoryEntry,
  calculateBMRAndTDEE,
  formatResult,
  generateCopyText,
  getHistory,
  saveToHistory,
  clearHistory,
  deleteHistoryEntry,
  ACTIVITY_DESCRIPTIONS,
  cmToFeetInches,
  feetInchesToCm
} from "./logic";
import ToolSEOContent from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function BMRCalculatorUI() {
  const [weight, setWeight] = useState<string>("70");
  const [height, setHeight] = useState<string>("175");
  const [heightFeet, setHeightFeet] = useState<string>("5");
  const [heightInches, setHeightInches] = useState<string>("9");
  const [age, setAge] = useState<string>("25");
  const [gender, setGender] = useState<Gender>("male");
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>("moderate");
  const [unitSystem, setUnitSystem] = useState<UnitSystem>("metric");
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [copied, setCopied] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setHistory(getHistory());
  }, []);

  const weightNum = parseFloat(weight);
  const ageNum = parseFloat(age);
  let heightNum = parseFloat(height);
  
  // Handle imperial height conversion
  if (unitSystem === 'imperial') {
    const feet = parseFloat(heightFeet) || 0;
    const inches = parseFloat(heightInches) || 0;
    heightNum = feet * 12 + inches; // Total inches
  }
  
  const isValid = !isNaN(weightNum) && !isNaN(heightNum) && !isNaN(ageNum) && 
                  weightNum > 0 && heightNum > 0 && ageNum > 0 && ageNum < 120;
  
  const result = useMemo(() => {
    if (!isValid) return { bmr: 0, tdee: 0, activityFactor: 0 };
    return calculateBMRAndTDEE(weightNum, heightNum, ageNum, gender, activityLevel, unitSystem);
  }, [weightNum, heightNum, ageNum, gender, activityLevel, unitSystem, isValid]);

  const handleCopy = () => {
    if (!isValid) return;
    const text = generateCopyText(weightNum, heightNum, ageNum, gender, activityLevel, unitSystem, result);
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveToHistory = useCallback(() => {
    if (!isValid) return;
    
    const entry: HistoryEntry = {
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      weight: weightNum,
      height: heightNum,
      age: ageNum,
      gender,
      activityLevel,
      unitSystem,
      bmr: result.bmr,
      tdee: result.tdee
    };
    
    saveToHistory(entry);
    setHistory(getHistory());
  }, [weightNum, heightNum, ageNum, gender, activityLevel, unitSystem, result, isValid]);

  const handleClear = () => {
    setWeight("");
    setHeight("");
    setHeightFeet("");
    setHeightInches("");
    setAge("");
  };

  const handleUnitSystemChange = (newSystem: UnitSystem) => {
    if (newSystem === unitSystem) return;
    
    setUnitSystem(newSystem);
    
    if (newSystem === 'imperial') {
      // Convert metric to imperial
      if (weight) {
        const lbs = parseFloat(weight) * 2.20462;
        setWeight(Math.round(lbs).toString());
      }
      if (height) {
        const cm = parseFloat(height);
        const { feet, inches } = cmToFeetInches(cm);
        setHeightFeet(feet.toString());
        setHeightInches(inches.toString());
      }
    } else {
      // Convert imperial to metric
      if (weight) {
        const kg = parseFloat(weight) * 0.453592;
        setWeight(Math.round(kg).toString());
      }
      const feet = parseFloat(heightFeet) || 0;
      const inches = parseFloat(heightInches) || 0;
      if (feet || inches) {
        const cm = feetInchesToCm(feet, inches);
        setHeight(Math.round(cm).toString());
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden mb-12">
        {/* Header */}
        <div className="bg-gradient-to-br from-primary to-primary-hover p-8 text-white relative">
          <div className="relative z-10">
            <h2 className="text-3xl font-black mb-2" style={{ fontFamily: "var(--font-heading)" }}>BMR Calculator</h2>
            <p className="text-green-100 opacity-90 font-medium">Calculate your Basal Metabolic Rate and Total Daily Energy Expenditure instantly.</p>
          </div>
          <div className="absolute right-0 top-0 opacity-10 p-4 transform translate-x-1/4 -translate-y-1/4 select-none pointer-events-none">
            <span className="text-[180px] font-black leading-none italic">🔥</span>
          </div>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
            {/* Input Side */}
            <div className="xl:col-span-5 space-y-6">
              {/* Unit System Toggle */}
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] pl-1">Unit System</label>
                <div className="flex gap-2">
                  {(['metric', 'imperial'] as UnitSystem[]).map(system => (
                    <button 
                      key={system}
                      onClick={() => handleUnitSystemChange(system)}
                      className={`flex-1 py-2 px-4 rounded-xl text-sm font-bold border transition-all ${
                        unitSystem === system 
                          ? 'bg-primary border-primary text-white shadow-lg' 
                          : 'bg-white border-gray-200 text-gray-500 hover:border-primary/30'
                      }`}
                    >
                      {system === 'metric' ? 'Metric (kg, cm)' : 'Imperial (lbs, ft/in)'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Weight Input */}
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] pl-1">
                  Weight ({unitSystem === 'metric' ? 'kg' : 'lbs'})
                </label>
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="w-full px-6 py-5 bg-gray-50 border-2 border-transparent rounded-2xl focus:outline-none focus:border-primary focus:bg-white transition-all text-2xl font-bold text-gray-800 shadow-sm"
                  placeholder={unitSystem === 'metric' ? "e.g. 70" : "e.g. 154"}
                />
              </div>

              {/* Height Input */}
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] pl-1">
                  Height ({unitSystem === 'metric' ? 'cm' : 'ft/in'})
                </label>
                {unitSystem === 'metric' ? (
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="w-full px-6 py-5 bg-gray-50 border-2 border-transparent rounded-2xl focus:outline-none focus:border-primary focus:bg-white transition-all text-2xl font-bold text-gray-800 shadow-sm"
                    placeholder="e.g. 175"
                  />
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative">
                      <input
                        type="number"
                        value={heightFeet}
                        onChange={(e) => setHeightFeet(e.target.value)}
                        className="w-full px-6 py-5 bg-gray-50 border-2 border-transparent rounded-2xl focus:outline-none focus:border-primary focus:bg-white transition-all text-xl font-bold text-gray-800 shadow-sm"
                        placeholder="5"
                      />
                      <span className="absolute right-5 top-1/2 -translate-y-1/2 text-lg font-bold text-gray-400">ft</span>
                    </div>
                    <div className="relative">
                      <input
                        type="number"
                        value={heightInches}
                        onChange={(e) => setHeightInches(e.target.value)}
                        className="w-full px-6 py-5 bg-gray-50 border-2 border-transparent rounded-2xl focus:outline-none focus:border-primary focus:bg-white transition-all text-xl font-bold text-gray-800 shadow-sm"
                        placeholder="9"
                      />
                      <span className="absolute right-5 top-1/2 -translate-y-1/2 text-lg font-bold text-gray-400">in</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Age and Gender */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] pl-1">Age (years)</label>
                  <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="w-full px-6 py-5 bg-gray-50 border-2 border-transparent rounded-2xl focus:outline-none focus:border-primary focus:bg-white transition-all text-xl font-bold text-gray-800 shadow-sm"
                    placeholder="e.g. 25"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] pl-1">Gender</label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value as Gender)}
                    className="w-full px-6 py-5 bg-gray-50 border-2 border-transparent rounded-2xl focus:outline-none focus:border-primary focus:bg-white transition-all text-lg font-bold text-gray-800 shadow-sm"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
              </div>

              {/* Activity Level */}
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] pl-1">Activity Level</label>
                <select
                  value={activityLevel}
                  onChange={(e) => setActivityLevel(e.target.value as ActivityLevel)}
                  className="w-full px-6 py-5 bg-gray-50 border-2 border-transparent rounded-2xl focus:outline-none focus:border-primary focus:bg-white transition-all text-lg font-bold text-gray-800 shadow-sm"
                >
                  <option value="sedentary">Sedentary - {ACTIVITY_DESCRIPTIONS.sedentary}</option>
                  <option value="light">Light Activity - {ACTIVITY_DESCRIPTIONS.light}</option>
                  <option value="moderate">Moderate Activity - {ACTIVITY_DESCRIPTIONS.moderate}</option>
                  <option value="active">Active - {ACTIVITY_DESCRIPTIONS.active}</option>
                  <option value="very-active">Very Active - {ACTIVITY_DESCRIPTIONS['very-active']}</option>
                </select>
              </div>
            </div>

            {/* Result Side */}
            <div className="xl:col-span-7">
              <div className="bg-gray-50 p-8 rounded-[40px] border-2 border-dashed border-gray-200 h-full flex flex-col justify-center gap-8 relative overflow-hidden group">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 z-10">
                  <div className="text-center space-y-1">
                    <span className="text-[10px] font-black text-primary bg-green-100 px-3 py-1 rounded-full uppercase tracking-widest mb-2 inline-block">BMR</span>
                    <h3 className="text-4xl font-black text-gray-900 leading-tight">
                      {isValid ? formatResult(result.bmr) : "0"} <span className="text-lg text-gray-500">kcal/day</span>
                    </h3>
                    <p className="text-xs text-gray-500 font-medium">Basal Metabolic Rate</p>
                  </div>

                  <div className="text-center space-y-1">
                    <span className="text-[10px] font-black text-primary bg-green-100 px-3 py-1 rounded-full uppercase tracking-widest mb-2 inline-block">TDEE</span>
                    <h3 className="text-4xl font-black text-gray-900 leading-tight">
                      {isValid ? formatResult(result.tdee) : "0"} <span className="text-lg text-gray-500">kcal/day</span>
                    </h3>
                    <p className="text-xs text-gray-500 font-medium">Total Daily Energy Expenditure</p>
                  </div>
                </div>

                {isValid && (
                  <div className="text-center z-10">
                    <p className="text-sm text-gray-600 mb-4">
                      Activity Factor: <span className="font-bold text-gray-800">{result.activityFactor}x</span>
                    </p>
                    <div className="flex flex-wrap gap-3 justify-center">
                      <button
                        onClick={handleCopy}
                        className="px-6 py-2 bg-primary text-white rounded-xl font-bold text-sm hover:bg-primary-hover transition-colors shadow-lg"
                      >
                        {copied ? "Copied!" : "Copy Results"}
                      </button>
                      <button
                        onClick={handleSaveToHistory}
                        className="px-6 py-2 bg-green-600 text-white rounded-xl font-bold text-sm hover:bg-green-700 transition-colors shadow-lg"
                      >
                        Save to History
                      </button>
                      <button
                        onClick={handleClear}
                        className="px-6 py-2 bg-gray-200 text-gray-700 rounded-xl font-bold text-sm hover:bg-gray-300 transition-colors"
                      >
                        Clear
                      </button>
                    </div>
                  </div>
                )}

                <div className="absolute inset-0 opacity-5 flex items-center justify-center pointer-events-none">
                  <span className="text-[200px] font-black leading-none">🔥</span>
                </div>
              </div>
            </div>
          </div>

          {/* History Section */}
          {isClient && history.length > 0 && (
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Calculation History</h3>
                <button
                  onClick={() => {
                    clearHistory();
                    setHistory([]);
                  }}
                  className="text-sm text-red-600 hover:text-red-700 font-medium"
                >
                  Clear All
                </button>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {history.map((entry) => (
                  <div key={entry.id} className="bg-gray-50 rounded-xl p-4 relative group">
                    <button
                      onClick={() => {
                        deleteHistoryEntry(entry.id);
                        setHistory(getHistory());
                      }}
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:text-red-700"
                    >
                      ×
                    </button>
                    <div className="text-xs text-gray-500 mb-2">
                      {new Date(entry.timestamp).toLocaleDateString()}
                    </div>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Weight:</span>
                        <span className="font-medium">{entry.weight} {entry.unitSystem === 'metric' ? 'kg' : 'lbs'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Height:</span>
                        <span className="font-medium">{entry.height} {entry.unitSystem === 'metric' ? 'cm' : 'in'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Age:</span>
                        <span className="font-medium">{entry.age} years</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Gender:</span>
                        <span className="font-medium capitalize">{entry.gender}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Activity:</span>
                        <span className="font-medium capitalize">{entry.activityLevel}</span>
                      </div>
                      <hr className="my-2" />
                      <div className="flex justify-between font-bold">
                        <span className="text-primary">BMR:</span>
                        <span>{formatResult(entry.bmr)} kcal</span>
                      </div>
                      <div className="flex justify-between font-bold">
                        <span className="text-primary">TDEE:</span>
                        <span>{formatResult(entry.tdee)} kcal</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <ToolSEOContent />
      <RelatedTools 
        currentTool="bmr-calculator" 
        tools={["bmi-calculator", "age-calculator", "discount-calculator", "percentage-calculator", "simple-interest-calculator"]}
      />
    </div>
  );
}