"use client";

import { useState, useEffect } from "react";
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
  kgToLb
} from "./logic";
import BodyFatCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function BodyFatCalculatorUI() {
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [method, setMethod] = useState<'navy' | 'bmi'>('navy');
  
  // Navy Method Inputs
  const [waist, setWaist] = useState("34");
  const [neck, setNeck] = useState("16");
  const [hip, setHip] = useState("36");
  const [height, setHeight] = useState("70");
  
  // BMI Method Inputs
  const [weight, setWeight] = useState("70");
  const [heightBMI, setHeightBMI] = useState("175");
  const [age, setAge] = useState("30");
  
  // Results
  const [result, setResult] = useState<BodyFatResult | null>(null);
  const [history, setHistory] = useState<HistoryRecord[]>([]);
  const [copied, setCopied] = useState("");

  // Load history on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('bodyFatHistory');
      if (saved) setHistory(JSON.parse(saved));
    } catch (e) {}
  }, []);

  const saveToHistory = () => {
    if (!result) return;
    
    let measurements = "";
    if (method === 'navy') {
      measurements = gender === 'male' 
        ? `W:${waist} N:${neck} H:${height}${unit === 'metric' ? 'cm' : '"'}`
        : `W:${waist} N:${neck} Hip:${hip} H:${height}${unit === 'metric' ? 'cm' : '"'}`;
    } else {
      measurements = `W:${weight}${unit === 'metric' ? 'kg' : 'lb'} H:${heightBMI}${unit === 'metric' ? 'cm' : '"'} Age:${age}`;
    }

    const newRecord: HistoryRecord = {
      id: Date.now().toString(),
      dateStr: new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }),
      timestamp: Date.now(),
      gender,
      method,
      measurements,
      percentage: result.percentage,
      category: result.category,
      unit
    };

    const newHistory = [newRecord, ...history].slice(0, 20); // Keep last 20
    setHistory(newHistory);
    try {
      localStorage.setItem('bodyFatHistory', JSON.stringify(newHistory));
    } catch (e) {}
  };

  const clearHistory = () => {
    setHistory([]);
    try {
      localStorage.removeItem('bodyFatHistory');
    } catch (e) {}
  };

  useEffect(() => {
    let bodyFatPercentage = 0;

    if (method === 'navy') {
      const waistVal = parseFloat(waist) || 0;
      const neckVal = parseFloat(neck) || 0;
      const hipVal = parseFloat(hip) || 0;
      const heightVal = parseFloat(height) || 0;

      if (waistVal > 0 && neckVal > 0 && heightVal > 0) {
        // Convert to inches if metric
        const waistInches = unit === 'metric' ? cmToInches(waistVal) : waistVal;
        const neckInches = unit === 'metric' ? cmToInches(neckVal) : neckVal;
        const heightInches = unit === 'metric' ? cmToInches(heightVal) : heightVal;
        const hipInches = unit === 'metric' ? cmToInches(hipVal) : hipVal;

        if (gender === 'male') {
          bodyFatPercentage = calculateNavyMale(waistInches, neckInches, heightInches);
        } else {
          if (hipVal > 0) {
            bodyFatPercentage = calculateNavyFemale(waistInches, neckInches, hipInches, heightInches);
          }
        }
      }
    } else {
      const weightVal = parseFloat(weight) || 0;
      const heightVal = parseFloat(heightBMI) || 0;
      const ageVal = parseFloat(age) || 0;

      if (weightVal > 0 && heightVal > 0 && ageVal > 0) {
        // Convert to metric for BMI calculation
        const weightKg = unit === 'metric' ? weightVal : lbToKg(weightVal);
        const heightM = unit === 'metric' ? heightVal / 100 : inchesToCm(heightVal) / 100;
        
        const bmi = calculateBMI(weightKg, heightM);
        bodyFatPercentage = calculateBMIBodyFat(bmi, ageVal, gender);
      }
    }

    if (bodyFatPercentage > 0) {
      setResult(getBodyFatDetails(bodyFatPercentage, gender));
    } else {
      setResult(null);
    }
  }, [unit, gender, method, waist, neck, hip, height, weight, heightBMI, age]);

  const toggleUnit = (targetUnit: 'metric' | 'imperial') => {
    if (unit === targetUnit) return;
    
    if (targetUnit === 'imperial') {
      // Convert metric to imperial
      setWaist(cmToInches(parseFloat(waist) || 0).toFixed(1));
      setNeck(cmToInches(parseFloat(neck) || 0).toFixed(1));
      setHip(cmToInches(parseFloat(hip) || 0).toFixed(1));
      setHeight(cmToInches(parseFloat(height) || 0).toFixed(1));
      setWeight(kgToLb(parseFloat(weight) || 0).toFixed(1));
      setHeightBMI(cmToInches(parseFloat(heightBMI) || 0).toFixed(1));
    } else {
      // Convert imperial to metric
      setWaist(inchesToCm(parseFloat(waist) || 0).toFixed(1));
      setNeck(inchesToCm(parseFloat(neck) || 0).toFixed(1));
      setHip(inchesToCm(parseFloat(hip) || 0).toFixed(1));
      setHeight(inchesToCm(parseFloat(height) || 0).toFixed(1));
      setWeight(lbToKg(parseFloat(weight) || 0).toFixed(1));
      setHeightBMI(inchesToCm(parseFloat(heightBMI) || 0).toFixed(1));
    }
    
    setUnit(targetUnit);
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(""), 2000);
  };

  const getFullResultText = () => {
    if (!result) return "";
    return `Body Fat: ${result.percentage}% | Category: ${result.category} | Method: ${method.toUpperCase()} | Gender: ${gender}`;
  };

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
            Imperial (in, lb)
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6 items-start">
          
          {/* Controls Panel */}
          <div className="space-y-6">
            
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-6">
              
              {/* Gender Selection */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: "var(--font-heading)" }}>Gender</label>
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

              {/* Method Selection */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: "var(--font-heading)" }}>Calculation Method</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" checked={method === 'navy'} onChange={() => setMethod('navy')} className="text-primary focus:ring-primary w-4 h-4" />
                    <span className="text-sm font-medium text-gray-700">US Navy Method</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" checked={method === 'bmi'} onChange={() => setMethod('bmi')} className="text-primary focus:ring-primary w-4 h-4" />
                    <span className="text-sm font-medium text-gray-700">BMI Method</span>
                  </label>
                </div>
              </div>

              {/* Navy Method Inputs */}
              {method === 'navy' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative">
                      <label className="block text-xs font-semibold text-gray-600 mb-1">Waist</label>
                      <input
                        type="number"
                        min="0"
                        step="0.1"
                        value={waist}
                        onChange={(e) => setWaist(e.target.value)}
                        placeholder={unit === 'metric' ? '85' : '34'}
                        className="w-full rounded-lg border border-gray-200 bg-gray-50 pl-3 pr-10 py-2.5 text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500 text-xs font-medium mt-5">
                        {unit === 'metric' ? 'cm' : 'in'}
                      </div>
                    </div>
                    
                    <div className="relative">
                      <label className="block text-xs font-semibold text-gray-600 mb-1">Neck</label>
                      <input
                        type="number"
                        min="0"
                        step="0.1"
                        value={neck}
                        onChange={(e) => setNeck(e.target.value)}
                        placeholder={unit === 'metric' ? '40' : '16'}
                        className="w-full rounded-lg border border-gray-200 bg-gray-50 pl-3 pr-10 py-2.5 text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500 text-xs font-medium mt-5">
                        {unit === 'metric' ? 'cm' : 'in'}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {gender === 'female' && (
                      <div className="relative">
                        <label className="block text-xs font-semibold text-gray-600 mb-1">Hip</label>
                        <input
                          type="number"
                          min="0"
                          step="0.1"
                          value={hip}
                          onChange={(e) => setHip(e.target.value)}
                          placeholder={unit === 'metric' ? '95' : '36'}
                          className="w-full rounded-lg border border-gray-200 bg-gray-50 pl-3 pr-10 py-2.5 text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500 text-xs font-medium mt-5">
                          {unit === 'metric' ? 'cm' : 'in'}
                        </div>
                      </div>
                    )}
                    
                    <div className="relative">
                      <label className="block text-xs font-semibold text-gray-600 mb-1">Height</label>
                      <input
                        type="number"
                        min="0"
                        step="0.1"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        placeholder={unit === 'metric' ? '175' : '70'}
                        className="w-full rounded-lg border border-gray-200 bg-gray-50 pl-3 pr-10 py-2.5 text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500 text-xs font-medium mt-5">
                        {unit === 'metric' ? 'cm' : 'in'}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* BMI Method Inputs */}
              {method === 'bmi' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative">
                      <label className="block text-xs font-semibold text-gray-600 mb-1">Weight</label>
                      <input
                        type="number"
                        min="0"
                        step="0.1"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        placeholder={unit === 'metric' ? '70' : '154'}
                        className="w-full rounded-lg border border-gray-200 bg-gray-50 pl-3 pr-10 py-2.5 text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500 text-xs font-medium mt-5">
                        {unit === 'metric' ? 'kg' : 'lb'}
                      </div>
                    </div>
                    
                    <div className="relative">
                      <label className="block text-xs font-semibold text-gray-600 mb-1">Height</label>
                      <input
                        type="number"
                        min="0"
                        step="0.1"
                        value={heightBMI}
                        onChange={(e) => setHeightBMI(e.target.value)}
                        placeholder={unit === 'metric' ? '175' : '70'}
                        className="w-full rounded-lg border border-gray-200 bg-gray-50 pl-3 pr-10 py-2.5 text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500 text-xs font-medium mt-5">
                        {unit === 'metric' ? 'cm' : 'in'}
                      </div>
                    </div>
                  </div>

                  <div className="relative max-w-32">
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Age</label>
                    <input
                      type="number"
                      min="0"
                      max="120"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      placeholder="30"
                      className="w-full rounded-lg border border-gray-200 bg-gray-50 pl-3 pr-12 py-2.5 text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500 text-xs font-medium mt-5">
                      years
                    </div>
                  </div>
                </div>
              )}

            </div>

          </div>

          {/* Results Panel */}
          <div className="space-y-6">
            
            {/* Main Result Display */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-[0_4px_30px_-10px_rgba(0,0,0,0.1)] overflow-hidden relative group transition-all">
               {result ? (
                 <>
                   {/* Top Color Band */}
                   <div className={`h-2 w-full ${result.colorClass.replace('text-', 'bg-')}`}></div>
                   
                   <div className="p-8 pb-10 space-y-6 text-center">
                      <p className="text-gray-500 font-semibold mb-1 uppercase tracking-widest text-xs">Body Fat Percentage</p>
                      
                      <div className="relative inline-block w-full">
                         <h2 className="text-6xl md:text-7xl font-bold tracking-tight text-gray-900 mb-1">
                            {result.percentage}%
                         </h2>
                         <p className={`text-xl font-bold uppercase tracking-wider ${result.colorClass}`}>
                            {result.category}
                         </p>
                      </div>
                      
                      {/* Visual Progress Bar */}
                      <div className="pt-6 w-full max-w-sm mx-auto">
                        <div className="flex justify-between text-[10px] sm:text-xs font-semibold text-gray-500 mb-1.5 px-0.5">
                           <span>0%</span>
                           <span>15%</span>
                           <span>25%</span>
                           <span>35%</span>
                           <span>50%</span>
                        </div>
                        
                        {/* Scale Background */}
                        <div className="relative w-full h-3 bg-gray-100 rounded-full overflow-hidden flex shadow-inner">
                           <div className="bg-blue-400 h-full border-r border-white/50" style={{ width: '30%' }}></div>
                           <div className="bg-green-400 h-full border-r border-white/50" style={{ width: '20%' }}></div>
                           <div className="bg-yellow-400 h-full border-r border-white/50" style={{ width: '20%' }}></div>
                           <div className="bg-red-500 h-full" style={{ width: '30%' }}></div>
                        </div>

                        {/* Scale Pointer */}
                        <div className="relative w-full h-6 mt-1">
                          <div 
                             className="absolute top-0 flex flex-col items-center -ml-2.5 transition-all duration-500 ease-out"
                             style={{ left: `${result.progressPercent}%` }}
                          >
                             <div className={`w-0 h-0 border-l-[6px] border-r-[6px] border-b-[8px] border-l-transparent border-r-transparent ${result.colorClass.replace('text-', 'border-b-')}`}></div>
                             <span className="text-[10px] font-bold text-gray-700 mt-0.5">You</span>
                          </div>
                        </div>
                      </div>
                   </div>

                   {/* Method Info */}
                   <div className="bg-gray-50 border-t border-gray-100 p-4 text-center">
                      <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                        {method === 'navy' ? 'US Navy Method' : 'BMI Method'} • {gender} • {unit}
                      </span>
                   </div>
                 </>
               ) : (
                 <div className="p-12 text-center text-gray-400 flex flex-col items-center justify-center min-h-[350px]">
                    <div className="text-5xl mb-3 opacity-30">📏</div>
                    <p className="font-medium">Enter your measurements to calculate body fat percentage</p>
                 </div>
               )}
            </div>

            {/* Quick Actions */}
            {result && (
               <div className="grid sm:grid-cols-3 gap-2">
                 <button 
                   onClick={() => copyToClipboard(result.percentage.toString() + '%', "percentage")}
                   className="bg-white text-gray-700 font-semibold py-2.5 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors shadow-sm text-sm"
                 >
                   {copied === "percentage" ? "Copied!" : "📋 Copy %"}
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
                            <th className="px-4 py-3">Method</th>
                            <th className="px-4 py-3">Result</th>
                            <th className="px-4 py-3 hidden sm:table-cell">Category</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {history.map(row => (
                            <tr key={row.id} className="hover:bg-gray-50/50 transition-colors">
                               <td className="px-4 py-3 font-medium text-gray-900">{row.dateStr}</td>
                               <td className="px-4 py-3 uppercase">{row.method}</td>
                               <td className="px-4 py-3 font-bold">{row.percentage}%</td>
                               <td className="px-4 py-3 hidden sm:table-cell">
                                 <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-700 text-[10px]">
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
      
      <BodyFatCalculatorSEO />
      
      <RelatedTools
        currentTool="body-fat-calculator"
        tools={['bmi-calculator', 'bmr-calculator', 'ideal-weight-calculator']}
      />
    </>
  );
}