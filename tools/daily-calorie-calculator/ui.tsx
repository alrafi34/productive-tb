"use client";

import { useState, useEffect } from "react";
import { 
  CalorieResult, 
  MacroBreakdown,
  HistoryRecord,
  ACTIVITY_LEVELS,
  GOALS,
  calculateCalorieNeeds,
  calculateMacros,
  lbToKg,
  kgToLb,
  inchesToCm,
  cmToInches,
  feetInchesToCm
} from "./logic";
import DailyCalorieCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function DailyCalorieCalculatorUI() {
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [goal, setGoal] = useState('maintenance');
  
  // Inputs
  const [age, setAge] = useState("30");
  const [weight, setWeight] = useState("70");
  const [height, setHeight] = useState("175");
  const [heightFt, setHeightFt] = useState("5");
  const [heightIn, setHeightIn] = useState("9");
  const [activityLevel, setActivityLevel] = useState(1.55);
  
  // Results
  const [result, setResult] = useState<CalorieResult | null>(null);
  const [macros, setMacros] = useState<MacroBreakdown | null>(null);
  const [targetCalories, setTargetCalories] = useState(0);
  const [history, setHistory] = useState<HistoryRecord[]>([]);
  const [copied, setCopied] = useState("");

  // Load history on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('calorieHistory');
      if (saved) setHistory(JSON.parse(saved));
    } catch (e) {}
  }, []);

  const saveToHistory = () => {
    if (!result || !targetCalories) return;
    
    const selectedGoal = GOALS.find(g => g.value === goal);
    const selectedActivity = ACTIVITY_LEVELS.find(a => a.value === activityLevel);
    
    const newRecord: HistoryRecord = {
      id: Date.now().toString(),
      dateStr: new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }),
      timestamp: Date.now(),
      age: parseInt(age) || 0,
      gender,
      weight: parseFloat(weight) || 0,
      height: unit === 'metric' ? parseFloat(height) || 0 : feetInchesToCm(parseFloat(heightFt) || 0, parseFloat(heightIn) || 0),
      activityLevel: selectedActivity?.label || 'Unknown',
      goal: selectedGoal?.label || 'Unknown',
      calories: targetCalories,
      unit
    };

    const newHistory = [newRecord, ...history].slice(0, 20); // Keep last 20
    setHistory(newHistory);
    try {
      localStorage.setItem('calorieHistory', JSON.stringify(newHistory));
    } catch (e) {}
  };

  const clearHistory = () => {
    setHistory([]);
    try {
      localStorage.removeItem('calorieHistory');
    } catch (e) {}
  };

  useEffect(() => {
    const ageVal = parseInt(age) || 0;
    const weightVal = parseFloat(weight) || 0;
    let heightVal = 0;
    
    if (unit === 'metric') {
      heightVal = parseFloat(height) || 0;
    } else {
      const ft = parseFloat(heightFt) || 0;
      const inches = parseFloat(heightIn) || 0;
      heightVal = feetInchesToCm(ft, inches);
    }

    if (ageVal > 0 && weightVal > 0 && heightVal > 0) {
      // Convert to metric for calculations
      const weightKg = unit === 'metric' ? weightVal : lbToKg(weightVal);
      const heightCm = heightVal;
      
      const calorieResult = calculateCalorieNeeds(weightKg, heightCm, ageVal, gender, activityLevel);
      setResult(calorieResult);
      
      // Determine target calories based on goal
      let target = calorieResult.maintenance;
      const selectedGoal = GOALS.find(g => g.value === goal);
      if (selectedGoal) {
        target = calorieResult.maintenance + selectedGoal.deficit;
      }
      
      setTargetCalories(target);
      setMacros(calculateMacros(target, goal));
    } else {
      setResult(null);
      setMacros(null);
      setTargetCalories(0);
    }
  }, [age, weight, height, heightFt, heightIn, gender, activityLevel, goal, unit]);

  const toggleUnit = (targetUnit: 'metric' | 'imperial') => {
    if (unit === targetUnit) return;
    
    if (targetUnit === 'imperial') {
      // Convert metric to imperial
      const kg = parseFloat(weight) || 0;
      const cm = parseFloat(height) || 0;
      
      if (kg > 0) setWeight(kgToLb(kg).toFixed(1));
      if (cm > 0) {
        const totalInches = cmToInches(cm);
        const ft = Math.floor(totalInches / 12);
        const inches = Math.round(totalInches % 12);
        setHeightFt(ft.toString());
        setHeightIn(inches.toString());
      }
    } else {
      // Convert imperial to metric
      const lb = parseFloat(weight) || 0;
      const ft = parseFloat(heightFt) || 0;
      const inches = parseFloat(heightIn) || 0;
      
      if (lb > 0) setWeight(lbToKg(lb).toFixed(1));
      if (ft > 0 || inches > 0) {
        setHeight(feetInchesToCm(ft, inches).toFixed(0));
      }
    }
    
    setUnit(targetUnit);
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(""), 2000);
  };

  const getFullResultText = () => {
    if (!result || !targetCalories) return "";
    const selectedGoal = GOALS.find(g => g.value === goal);
    return `Daily Calories: ${targetCalories} cal | Goal: ${selectedGoal?.label} | BMR: ${result.bmr} cal | TDEE: ${result.tdee} cal`;
  };

  const selectedGoal = GOALS.find(g => g.value === goal);
  const selectedActivity = ACTIVITY_LEVELS.find(a => a.value === activityLevel);

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
          
          {/* Controls Panel */}
          <div className="space-y-6">
            
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-6">
              
              {/* Basic Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: "var(--font-heading)" }}>Age</label>
                  <div className="relative">
                    <input
                      type="number"
                      min="1"
                      max="120"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      placeholder="30"
                      className="w-full rounded-lg border border-gray-200 bg-gray-50 pl-3 pr-12 py-2.5 text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500 text-xs font-medium">
                      years
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: "var(--font-heading)" }}>Gender</label>
                  <div className="flex gap-3">
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
              </div>

              {/* Weight */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: "var(--font-heading)" }}>Weight</label>
                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    step="0.1"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder={unit === 'metric' ? '70' : '154'}
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 pl-3 pr-12 py-2.5 text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500 text-xs font-medium">
                    {unit === 'metric' ? 'kg' : 'lbs'}
                  </div>
                </div>
              </div>

              {/* Height */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: "var(--font-heading)" }}>Height</label>
                {unit === 'metric' ? (
                  <div className="relative">
                    <input
                      type="number"
                      min="0"
                      step="0.1"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      placeholder="175"
                      className="w-full rounded-lg border border-gray-200 bg-gray-50 pl-3 pr-12 py-2.5 text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500 text-xs font-medium">
                      cm
                    </div>
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
                        className="w-full rounded-lg border border-gray-200 bg-gray-50 pl-3 pr-10 py-2.5 text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500 text-xs font-medium">
                        ft
                      </div>
                    </div>
                    <div className="relative">
                      <input
                        type="number"
                        min="0"
                        max="11"
                        value={heightIn}
                        onChange={(e) => setHeightIn(e.target.value)}
                        placeholder="9"
                        className="w-full rounded-lg border border-gray-200 bg-gray-50 pl-3 pr-10 py-2.5 text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500 text-xs font-medium">
                        in
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Activity Level */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: "var(--font-heading)" }}>Activity Level</label>
                <select
                  value={activityLevel}
                  onChange={(e) => setActivityLevel(parseFloat(e.target.value))}
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  {ACTIVITY_LEVELS.map(level => (
                    <option key={level.value} value={level.value}>
                      {level.label} - {level.description}
                    </option>
                  ))}
                </select>
              </div>

              {/* Goal */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: "var(--font-heading)" }}>Goal</label>
                <select
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  {GOALS.map(goalOption => (
                    <option key={goalOption.value} value={goalOption.value}>
                      {goalOption.label} - {goalOption.description}
                    </option>
                  ))}
                </select>
              </div>

            </div>

          </div>

          {/* Results Panel */}
          <div className="space-y-6">
            
            {/* Main Result Display */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-[0_4px_30px_-10px_rgba(0,0,0,0.1)] overflow-hidden relative group transition-all">
               {result && targetCalories > 0 ? (
                 <>
                   {/* Top Color Band */}
                   <div className="h-2 w-full bg-primary"></div>
                   
                   <div className="p-8 pb-6 space-y-6 text-center">
                      <p className="text-gray-500 font-semibold mb-1 uppercase tracking-widest text-xs">Daily Calorie Target</p>
                      
                      <div className="relative inline-block w-full">
                         <h2 className="text-5xl md:text-6xl font-bold tracking-tight text-gray-900 mb-1">
                            {targetCalories.toLocaleString()}
                         </h2>
                         <p className="text-lg font-bold uppercase tracking-wider text-primary">
                            Calories per day
                         </p>
                      </div>
                      
                      <div className="text-sm text-gray-600">
                        <p className="font-medium">{selectedGoal?.label}</p>
                        <p>{selectedActivity?.label}</p>
                      </div>
                   </div>

                   {/* Breakdown */}
                   <div className="grid grid-cols-2 bg-gray-50 border-t border-gray-100 divide-x divide-gray-100">
                      <div className="p-4 text-center">
                         <span className="text-xs text-blue-600 font-bold uppercase tracking-wide block mb-1">BMR</span>
                         <span className="font-semibold text-gray-900 text-sm">{result.bmr} cal</span>
                      </div>
                      <div className="p-4 text-center">
                         <span className="text-xs text-green-600 font-bold uppercase tracking-wide block mb-1">TDEE</span>
                         <span className="font-semibold text-gray-900 text-sm">{result.tdee} cal</span>
                      </div>
                   </div>
                 </>
               ) : (
                 <div className="p-12 text-center text-gray-400 flex flex-col items-center justify-center min-h-[300px]">
                    <div className="text-5xl mb-3 opacity-30">🍎</div>
                    <p className="font-medium">Enter your details to calculate daily calorie needs</p>
                 </div>
               )}
            </div>

            {/* Macros Breakdown */}
            {macros && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Macronutrient Breakdown
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div>
                      <span className="font-semibold text-blue-800">Protein</span>
                      <span className="text-blue-600 text-sm ml-2">({macros.protein.percentage}%)</span>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-blue-900">{macros.protein.grams}g</div>
                      <div className="text-xs text-blue-600">{macros.protein.calories} cal</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div>
                      <span className="font-semibold text-green-800">Carbohydrates</span>
                      <span className="text-green-600 text-sm ml-2">({macros.carbs.percentage}%)</span>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-green-900">{macros.carbs.grams}g</div>
                      <div className="text-xs text-green-600">{macros.carbs.calories} cal</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                    <div>
                      <span className="font-semibold text-yellow-800">Fats</span>
                      <span className="text-yellow-600 text-sm ml-2">({macros.fats.percentage}%)</span>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-yellow-900">{macros.fats.grams}g</div>
                      <div className="text-xs text-yellow-600">{macros.fats.calories} cal</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Actions */}
            {result && targetCalories > 0 && (
               <div className="grid sm:grid-cols-3 gap-2">
                 <button 
                   onClick={() => copyToClipboard(targetCalories.toString() + ' cal', "calories")}
                   className="bg-white text-gray-700 font-semibold py-2.5 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors shadow-sm text-sm"
                 >
                   {copied === "calories" ? "Copied!" : "📋 Copy Calories"}
                 </button>
                 <button 
                   onClick={() => copyToClipboard(getFullResultText(), "full")}
                   className="bg-primary text-white font-medium py-2.5 rounded-lg hover:bg-primary-hover transition-colors text-sm shadow-sm"
                 >
                   {copied === "full" ? "Copied All" : "📋 Copy Full"}
                 </button>
                 <button 
                   onClick={saveToHistory}
                   className="bg-green-50 text-green-700 border border-green-200 font-medium py-2.5 rounded-lg hover:bg-green-100 transition-colors text-sm shadow-sm"
                 >
                   📁 Save
                 </button>
               </div>
            )}

            {/* History */}
            {history.length > 0 && (
               <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="flex justify-between items-center p-4 border-b border-gray-100 bg-gray-50">
                     <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>History</h3>
                     <button onClick={clearHistory} className="text-xs font-semibold text-red-500 hover:text-red-700">Clear</button>
                  </div>
                  <div className="max-h-60 overflow-y-auto">
                     <table className="w-full text-left text-xs text-gray-600">
                        <thead className="text-gray-400 uppercase bg-white sticky top-0 shadow-sm text-[10px] font-semibold">
                          <tr>
                            <th className="px-4 py-3">Date</th>
                            <th className="px-4 py-3">Goal</th>
                            <th className="px-4 py-3">Calories</th>
                            <th className="px-4 py-3 hidden sm:table-cell">Activity</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {history.map(row => (
                            <tr key={row.id} className="hover:bg-gray-50/50 transition-colors">
                               <td className="px-4 py-3 font-medium text-gray-900">{row.dateStr}</td>
                               <td className="px-4 py-3">{row.goal}</td>
                               <td className="px-4 py-3 font-bold">{row.calories} cal</td>
                               <td className="px-4 py-3 hidden sm:table-cell">
                                 <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-700 text-[10px]">
                                   {row.activityLevel}
                                 </span>
                               </td>
                            </tr>
                          ))}
                        </tbody>
                     </table>
                  </div>
               </div>
            )}

          </div>

        </div>
      </div>
      
      <DailyCalorieCalculatorSEO />
      
      <RelatedTools
        currentTool="daily-calorie-calculator"
        tools={['bmr-calculator', 'bmi-calculator', 'body-fat-calculator']}
      />
    </>
  );
}