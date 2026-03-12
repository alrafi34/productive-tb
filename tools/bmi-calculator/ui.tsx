"use client";

import { useState, useEffect } from "react";
import { 
  BmiResult, 
  WeightRange, 
  IdealWeight, 
  HistoryRecord,
  calculateBmiValue,
  getBmiDetails,
  getHealthyWeightRange,
  calculateIdealWeight,
  kgToLb,
  lbToKg,
  cmToInches,
  inchesToCm
} from "./logic";
import BmiCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function BmiCalculatorUI() {
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  
  // Inputs
  const [heightCm, setHeightCm] = useState("170");
  const [weightKg, setWeightKg] = useState("65");
  
  // Imperial Inputs
  const [heightFt, setHeightFt] = useState("5");
  const [heightIn, setHeightIn] = useState("7");
  const [weightLb, setWeightLb] = useState("143");
  
  // Results
  const [bmiResult, setBmiResult] = useState<BmiResult | null>(null);
  const [healthyRange, setHealthyRange] = useState<WeightRange | null>(null);
  const [idealWeight, setIdealWeight] = useState<IdealWeight | null>(null);
  
  // Interactive Simulator Slider Mode
  const [isSimulating, setIsSimulating] = useState(false);
  const [simWeightKg, setSimWeightKg] = useState(65);
  
  // Gender for extended formulas
  const [gender, setGender] = useState<'male' | 'female'>('male');

  // History State
  const [history, setHistory] = useState<HistoryRecord[]>([]);

  const [copied, setCopied] = useState("");

  // Load history on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('bmiHistory');
      if (saved) setHistory(JSON.parse(saved));
    } catch (e) {}
  }, []);

  const saveToHistory = () => {
    if (!bmiResult) return;
    
    let heightRaw = "";
    let weightRaw = "";
    
    if (unit === 'metric') {
      heightRaw = `${heightCm} cm`;
      weightRaw = `${weightKg} kg`;
    } else {
      heightRaw = `${heightFt}'${heightIn}"`;
      weightRaw = `${weightLb} lb`;
    }

    const newRecord: HistoryRecord = {
      id: Date.now().toString(),
      dateStr: new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }),
      timestamp: Date.now(),
      heightRaw,
      weightRaw,
      bmi: bmiResult.bmi,
      category: bmiResult.category,
      unit
    };

    const newHistory = [newRecord, ...history].slice(0, 50); // Keep last 50
    setHistory(newHistory);
    try {
      localStorage.setItem('bmiHistory', JSON.stringify(newHistory));
    } catch (e) {}
  };

  const clearHistory = () => {
    setHistory([]);
    try {
      localStorage.removeItem('bmiHistory');
    } catch (e) {}
  };

  const activeWeightKg = isSimulating ? simWeightKg : (unit === 'metric' ? parseFloat(weightKg) || 0 : lbToKg(parseFloat(weightLb) || 0));

  useEffect(() => {
    // 1. Resolve unified Height and Weight into Metric (base units for calculation logic)
    let finalHeightCm = 0;
    
    if (unit === 'metric') {
      finalHeightCm = parseFloat(heightCm) || 0;
    } else {
      const ft = parseFloat(heightFt) || 0;
      const inch = parseFloat(heightIn) || 0;
      const totalInches = (ft * 12) + inch;
      finalHeightCm = inchesToCm(totalInches);
    }
    
    const heightM = finalHeightCm / 100;

    // 2. Perform Calculations
    if (heightM > 0 && activeWeightKg > 0) {
      const bmiVal = calculateBmiValue(activeWeightKg, heightM);
      setBmiResult(getBmiDetails(bmiVal));
      
      const range = getHealthyWeightRange(heightM);
      setHealthyRange(range);
      
      const inVal = cmToInches(finalHeightCm);
      setIdealWeight(calculateIdealWeight(inVal, gender));
    } else {
      setBmiResult(null);
      setHealthyRange(null);
      setIdealWeight(null);
    }
    
    // Default the slider target back to whatever the base is if not actively simulating
    if (!isSimulating && activeWeightKg > 0) {
      setSimWeightKg(activeWeightKg);
    }

  }, [heightCm, weightKg, heightFt, heightIn, weightLb, unit, isSimulating, simWeightKg, activeWeightKg, gender]);

  // Unit Switcher Handler - tries to convert existing sensible values gracefully
  const toggleUnit = (targetUnit: 'metric' | 'imperial') => {
    if (unit === targetUnit) return;
    
    if (targetUnit === 'imperial') {
      const cm = parseFloat(heightCm) || 0;
      const kg = parseFloat(weightKg) || 0;
      
      if (cm > 0) {
        const totalInches = cmToInches(cm);
        const ft = Math.floor(totalInches / 12);
        const inv = Math.round(totalInches % 12);
        setHeightFt(ft.toString());
        setHeightIn(inv.toString());
      }
      
      if (kg > 0) {
        setWeightLb(kgToLb(kg).toFixed(1));
      }
    } else {
       const ft = parseFloat(heightFt) || 0;
       const inch = parseFloat(heightIn) || 0;
       const lb = parseFloat(weightLb) || 0;
       
       if (ft > 0 || inch > 0) {
         setHeightCm(inchesToCm((ft * 12) + inch).toFixed(0));
       }
       if (lb > 0) {
         setWeightKg(lbToKg(lb).toFixed(1));
       }
    }
    
    setUnit(targetUnit);
    setIsSimulating(false);
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(""), 2000);
  };

  const getFullBreakdownText = () => {
    if (!bmiResult || !healthyRange) return "";
    
    let baseStr = `BMI: ${bmiResult.bmi}\nCategory: ${bmiResult.category}\n`;
    
    if (unit === 'metric') {
      baseStr += `Height: ${heightCm} cm\nWeight: ${activeWeightKg.toFixed(1)} kg\n`;
      baseStr += `Healthy Range: ${healthyRange.min.toFixed(1)} kg - ${healthyRange.max.toFixed(1)} kg\n`;
      if (idealWeight?.devine) baseStr += `Ideal (Devine): ${idealWeight.devine} kg\n`;
    } else {
      baseStr += `Height: ${heightFt}'${heightIn}"\nWeight: ${kgToLb(activeWeightKg).toFixed(1)} lb\n`;
      baseStr += `Healthy Range: ${kgToLb(healthyRange.min).toFixed(1)} lb - ${kgToLb(healthyRange.max).toFixed(1)} lb\n`;
      if (idealWeight?.devine) baseStr += `Ideal (Devine): ${kgToLb(idealWeight.devine).toFixed(1)} lb\n`;
    }
    
    return baseStr;
  };

  return (
    <>
      <div className="max-w-4xl mx-auto space-y-6">

        {/* Unit Toggle Banner */}
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
              
              {/* HEIGHT INPUT */}
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
                      <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-gray-500 font-medium tracking-wide">cm</div>
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

              {/* WEIGHT INPUT */}
              <div>
                 <div className="flex justify-between items-center mb-2">
                   <label className="block text-sm font-semibold text-gray-700" style={{ fontFamily: "var(--font-heading)" }}>Your Weight</label>
                   {isSimulating && (
                     <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded font-medium">Simulating Mode</span>
                   )}
                 </div>
                 
                 {unit === 'metric' ? (
                   <div className="relative">
                      <input
                        type="number"
                        min="0"
                        value={isSimulating ? simWeightKg.toFixed(1) : weightKg}
                        onChange={(e) => {
                          setIsSimulating(false);
                          setWeightKg(e.target.value);
                        }}
                        placeholder="65"
                        className={`w-full rounded-lg border bg-gray-50 pl-4 pr-12 py-3 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors ${isSimulating ? 'border-yellow-400 text-yellow-900' : 'border-gray-200 text-gray-900'}`}
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-gray-500 font-medium tracking-wide">kg</div>
                   </div>
                 ) : (
                   <div className="relative">
                      <input
                        type="number"
                        min="0"
                        value={isSimulating ? kgToLb(simWeightKg).toFixed(1) : weightLb}
                        onChange={(e) => {
                          setIsSimulating(false);
                          setWeightLb(e.target.value);
                        }}
                        placeholder="143"
                        className={`w-full rounded-lg border bg-gray-50 pl-4 pr-12 py-3 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors ${isSimulating ? 'border-yellow-400 text-yellow-900' : 'border-gray-200 text-gray-900'}`}
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-gray-500 font-medium tracking-wide">lb</div>
                   </div>
                 )}
              </div>

            </div>

            {/* BMI Simulator Controls */}
            {bmiResult && (
               <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
                 <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Interactive Weight Simulator</h3>
                 <p className="text-xs text-gray-500">Drag the slider to immediately see how weight changes dynamically impact your BMI categories down below.</p>
                 
                 <div className="pt-2">
                    <input 
                      type="range" 
                      min={unit === 'metric' ? 30 : lbToKg(65)} 
                      max={unit === 'metric' ? 200 : lbToKg(440)} 
                      step="0.5"
                      value={simWeightKg} 
                      onChange={e => {
                        setIsSimulating(true);
                        setSimWeightKg(parseFloat(e.target.value));
                      }}
                      className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary hover:accent-primary-light"
                    />
                    <div className="flex justify-between text-xs font-semibold text-gray-400 mt-2">
                      <span>{unit === 'metric' ? '30kg' : '65lb'}</span>
                      <span>{unit === 'metric' ? '200kg' : '440lb'}</span>
                    </div>
                 </div>

                 {isSimulating && (
                   <div className="flex justify-end pt-2">
                     <button 
                       onClick={() => setIsSimulating(false)} 
                       className="text-xs font-medium text-gray-500 hover:text-gray-900 underline underline-offset-2"
                     >
                       Reset to Base Weight
                     </button>
                   </div>
                 )}
               </div>
            )}

            {/* Biological Metrics Config */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: "var(--font-heading)" }}>Biological Gender (For Ideal Estimates)</label>
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

          </div>

          {/* Results Panel */}
          <div className="space-y-6">
            
            {/* Main Primary View Output */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-[0_4px_30px_-10px_rgba(0,0,0,0.1)] overflow-hidden relative group transition-all">
               {bmiResult ? (
                 <>
                   {/* Top Color Band correlating to result */}
                   <div className={`h-2 w-full ${bmiResult.colorClass.replace('text-', 'bg-')}`}></div>
                   
                   <div className="p-8 pb-10 space-y-6 text-center">
                      <p className="text-gray-500 font-semibold mb-1 uppercase tracking-widest text-xs">Body Mass Index</p>
                      
                      <div className="relative inline-block w-full">
                         <h2 className="text-6xl md:text-7xl font-bold tracking-tight text-gray-900 mb-1">
                            {bmiResult.bmi}
                         </h2>
                         <p className={`text-xl font-bold uppercase tracking-wider ${bmiResult.colorClass}`}>
                            {bmiResult.category}
                         </p>
                      </div>
                      
                      {/* Graphical Scale Array */}
                      <div className="pt-6 w-full max-w-sm mx-auto">
                        <div className="flex justify-between text-[10px] sm:text-xs font-semibold text-gray-500 mb-1.5 px-0.5">
                           <span>10</span>
                           <span>18.5</span>
                           <span>25.0</span>
                           <span>30.0</span>
                           <span>45+</span>
                        </div>
                        
                        {/* Scale Background */}
                        <div className="relative w-full h-3 bg-gray-100 rounded-full overflow-hidden flex shadow-inner">
                           {/* 18.5 => ~30% of scale. 25.0 => ~50%. 30.0 => ~60% mapped visually loosely */}
                           <div className="bg-blue-400 h-full border-r border-white/50" style={{ width: '25%' }}></div>
                           <div className="bg-green-400 h-full border-r border-white/50" style={{ width: '25%' }}></div>
                           <div className="bg-yellow-400 h-full border-r border-white/50" style={{ width: '15%' }}></div>
                           <div className="bg-red-500 h-full" style={{ width: '35%' }}></div>
                        </div>

                        {/* Scale Pointer */}
                        <div className="relative w-full h-6 mt-1">
                          <div 
                             className="absolute top-0 flex flex-col items-center -ml-2.5 transition-all duration-500 ease-out"
                             style={{ left: `${bmiResult.progressPercent}%` }}
                          >
                             <div className={`w-0 h-0 border-l-[6px] border-r-[6px] border-b-[8px] border-l-transparent border-r-transparent ${bmiResult.colorClass.replace('text-', 'border-b-')}`}></div>
                             <span className="text-[10px] font-bold text-gray-700 mt-0.5">You</span>
                          </div>
                        </div>
                      </div>
                   </div>

                   {/* Sub-panels attached directly to result */}
                   <div className="grid grid-cols-2 bg-gray-50 border-t border-gray-100 divide-x divide-gray-100">
                      
                      {healthyRange && (
                         <div className="p-4 text-center">
                            <span className="text-xs text-green-600 font-bold uppercase tracking-wide block mb-1">Healthy Range</span>
                            <span className="font-semibold text-gray-900 text-sm">
                              {unit === 'metric' 
                                ? `${healthyRange.min} - ${healthyRange.max} kg` 
                                : `${kgToLb(healthyRange.min).toFixed(1)} - ${kgToLb(healthyRange.max).toFixed(1)} lb`
                              }
                            </span>
                         </div>
                      )}
                      
                      {idealWeight && idealWeight.devine > 0 ? (
                         <div className="p-4 text-center">
                            <span className="text-xs text-blue-600 font-bold uppercase tracking-wide block mb-1">Ideal Target</span>
                            <span className="font-semibold text-gray-900 text-sm">
                              {unit === 'metric' 
                                ? `~ ${idealWeight.devine} kg` 
                                : `~ ${kgToLb(idealWeight.devine).toFixed(1)} lb`
                              }
                            </span>
                         </div>
                      ) : (
                         <div className="p-4 text-center flex items-center justify-center">
                           <span className="text-xs text-gray-400">Formula unavailable for height</span>
                         </div>
                      )}

                   </div>
                 </>
               ) : (
                 <div className="p-12 text-center text-gray-400 flex flex-col items-center justify-center min-h-[350px]">
                    <div className="text-5xl mb-3 opacity-30">⚖️</div>
                    <p className="font-medium">Enter valid height and weight to view comprehensive BMI scaling and ideal ranges.</p>
                 </div>
               )}
            </div>

            {/* Quick Actions Panel */}
            {bmiResult && !isSimulating && (
               <div className="grid sm:grid-cols-3 gap-2">
                 <button 
                   onClick={() => copyToClipboard(bmiResult.bmi.toString(), "bmi")}
                   className="bg-white text-gray-700 font-semibold py-2.5 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors shadow-sm text-sm"
                 >
                   {copied === "bmi" ? "Copied!" : "📋 Copy BMI"}
                 </button>
                 <button 
                   onClick={() => copyToClipboard(getFullBreakdownText(), "full")}
                   className="bg-primary text-white font-medium py-2.5 rounded-lg hover:bg-primary-dark transition-colors text-sm shadow-sm"
                 >
                   {copied === "full" ? "Copied All" : "📋 Copy Full Output"}
                 </button>
                 <button 
                   onClick={saveToHistory}
                   className="bg-green-50 text-green-700 border border-green-200 font-medium py-2.5 rounded-lg hover:bg-green-100 transition-colors text-sm shadow-sm"
                 >
                   📁 Save Log
                 </button>
               </div>
            )}

            {/* Local History Array Box */}
            {history.length > 0 && (
               <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="flex justify-between items-center p-4 border-b border-gray-100 bg-gray-50">
                     <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Local History</h3>
                     <button onClick={clearHistory} className="text-xs font-semibold text-red-500 hover:text-red-700">Clear All</button>
                  </div>
                  <div className="max-h-60 overflow-y-auto custom-scrollbar">
                     <table className="w-full text-left text-xs sm:text-sm text-gray-600">
                        <thead className="text-gray-400 uppercase bg-white sticky top-0 shadow-sm text-[10px] sm:text-xs font-semibold">
                          <tr>
                            <th className="px-4 py-3">Date</th>
                            <th className="px-4 py-3">Weight</th>
                            <th className="px-4 py-3">BMI Integer</th>
                            <th className="px-4 py-3 hidden sm:table-cell">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {history.map(row => (
                            <tr key={row.id} className="hover:bg-gray-50/50 transition-colors">
                               <td className="px-4 py-3 font-medium text-gray-900">{row.dateStr}</td>
                               <td className="px-4 py-3">{row.weightRaw}</td>
                               <td className="px-4 py-3 font-bold">{row.bmi}</td>
                               <td className="px-4 py-3 hidden sm:table-cell">
                                 <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-700">
                                   {row.category}
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
      
      <BmiCalculatorSEO />
      
      <RelatedTools
        currentTool="bmi-calculator"
        tools={['percentage-calculator', 'age-calculator', 'discount-calculator']}
      />
    </>
  );
}
