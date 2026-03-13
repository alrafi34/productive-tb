"use client";

import React, { useState, useEffect } from "react";
import {
  calculateFuelCost,
  saveToHistory,
  getHistoryFromStorage,
  clearHistory,
  deleteHistoryEntry,
  exportToCSV,
  downloadFile,
  FuelCalculation,
  HistoryEntry,
  formatCurrency,
  getCalculationSummary
} from "./logic";
import ToolSEOContent from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function FuelCostCalculatorUI() {
  const [distance, setDistance] = useState<string>("100");
  const [efficiency, setEfficiency] = useState<string>("25");
  const [fuelPrice, setFuelPrice] = useState<string>("3.50");
  const [distanceUnit, setDistanceUnit] = useState<"miles" | "km">("miles");
  const [efficiencyUnit, setEfficiencyUnit] = useState<"mpg" | "kml">("mpg");
  const [currency, setCurrency] = useState<string>("USD");

  const [result, setResult] = useState<FuelCalculation | null>(null);
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  // Toggle state for advanced/history view
  const [showHistory, setShowHistory] = useState<boolean>(false);

  // Load history on mount
  useEffect(() => {
    setHistory(getHistoryFromStorage());
  }, []);

  const handleCalculate = () => {
    const d = parseFloat(distance);
    const e = parseFloat(efficiency);
    const p = parseFloat(fuelPrice);

    if (isNaN(d) || isNaN(e) || isNaN(p) || d <= 0 || e <= 0 || p < 0) {
      alert("Please enter valid positive numbers for distance, efficiency, and fuel price.");
      return;
    }

    const calcResult = calculateFuelCost(d, e, p, distanceUnit, efficiencyUnit, currency);
    setResult(calcResult);
    
    // Save to history automatically
    if (calcResult.tripCost > 0) {
      saveToHistory(calcResult);
      // Reload history
      setHistory(getHistoryFromStorage());
    }
  };

  const clearCurrentHistory = () => {
    if (confirm("Are you sure you want to clear all history?")) {
      clearHistory();
      setHistory([]);
    }
  };

  const removeHistoryItem = (id: string) => {
    deleteHistoryEntry(id);
    setHistory(getHistoryFromStorage());
  };

  const handleExportCSV = () => {
    if (history.length === 0) return;
    const calculations = history.map(h => h.calculation);
    const csvContent = exportToCSV(calculations);
    downloadFile(csvContent, "fuel_calculator_history.csv", "text/csv");
  };

  const handleCopyResult = () => {
    if (result) {
      const summary = getCalculationSummary(result);
      navigator.clipboard.writeText(summary);
      alert("Result copied to clipboard!");
    }
  };

  // Switch units cleanly
  const toggleUnitSystem = (system: "imperial" | "metric") => {
    if (system === "imperial") {
      setDistanceUnit("miles");
      setEfficiencyUnit("mpg");
    } else {
      setDistanceUnit("km");
      setEfficiencyUnit("kml");
    }
  };

  const currencySymbols: Record<string, string> = {
    USD: "$",
    EUR: "€",
    GBP: "£",
    BDT: "৳"
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8">
        <div className="p-6 md:p-8">
          
          {/* Quick Unit Toggles */}
          <div className="flex flex-wrap items-center justify-between mb-8 pb-6 border-b border-gray-100 gap-4">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <span>⛽</span> Fuel Calculation
            </h2>
            <div className="flex bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => toggleUnitSystem("imperial")}
                className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
                  distanceUnit === "miles" ? "bg-white text-emerald-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Imperial (Miles / MPG)
              </button>
              <button
                onClick={() => toggleUnitSystem("metric")}
                className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
                  distanceUnit === "km" ? "bg-white text-emerald-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Metric (Km / Km/L)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* INPUT SECTION */}
            <div className="space-y-6">
              
              {/* Distance Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex justify-between">
                  <span>Trip Distance</span>
                  <span className="text-gray-400 capitalize">{distanceUnit}</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={distance}
                    onChange={(e) => setDistance(e.target.value)}
                    className="w-full pl-4 pr-16 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none"
                    placeholder="E.g., 100"
                    min="0"
                  />
                  <div className="absolute inset-y-0 right-4 flex items-center text-sm text-gray-400 font-medium">
                    {distanceUnit === 'miles' ? 'mi' : 'km'}
                  </div>
                </div>
              </div>

              {/* Efficiency Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex justify-between">
                  <span>Fuel Efficiency</span>
                  <span className="text-gray-400 capitalize">{efficiencyUnit}</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={efficiency}
                    onChange={(e) => setEfficiency(e.target.value)}
                    className="w-full pl-4 pr-16 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none"
                    placeholder="E.g., 25"
                    min="0"
                  />
                  <div className="absolute inset-y-0 right-4 flex items-center text-sm text-gray-400 font-medium">
                    {efficiencyUnit === 'mpg' ? 'MPG' : 'km/L'}
                  </div>
                </div>
              </div>

              {/* Grid for Price and Currency */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 block">
                    Fuel Price <span className="text-gray-400 text-xs font-normal">(per {efficiencyUnit === 'mpg' ? 'gallon' : 'liter'})</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-4 flex items-center text-gray-500">
                      {currencySymbols[currency] || '$'}
                    </div>
                    <input
                      type="number"
                      value={fuelPrice}
                      onChange={(e) => setFuelPrice(e.target.value)}
                      className="w-full pl-8 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none"
                      placeholder="3.50"
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 block">Currency</label>
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none appearance-none"
                  >
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                    <option value="BDT">BDT (৳)</option>
                  </select>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4">
                <button
                  onClick={handleCalculate}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg active:scale-[0.98] flex justify-center items-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 14a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2"/><rect width="12" height="12" x="6" y="10" rx="2" ry="2"/><path d="m14 14-2 2 2 2"/></svg>
                  Calculate Cost
                </button>
              </div>
            </div>

            {/* RESULTS SECTION */}
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 flex flex-col justify-between h-full">
              {!result ? (
                <div className="flex flex-col items-center justify-center text-center h-full text-gray-400 space-y-4 py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-300"><path d="M3 22v-8c0-2.2 1.8-4 4-4h6c2.2 0 4 1.8 4 4v8"/><path d="M14 22v-4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v4"/><path d="M21 22V6M21 6A5 5 0 0 0 11 6h0M21 6h0a5 5 0 0 1-10 0"/></svg>
                  </div>
                  <p>Enter your trip details to calculate estimated fuel costs.</p>
                </div>
              ) : (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold text-gray-800">Trip Estimate</h3>
                    <button 
                      onClick={handleCopyResult}
                      className="text-gray-400 hover:text-emerald-600 transition-colors p-1"
                      title="Copy Summary"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
                    </button>
                  </div>

                  <div className="bg-white rounded-xl p-5 border border-emerald-100 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-bl-full -z-0 opacity-50"></div>
                    <div className="relative z-10">
                      <p className="text-sm font-medium text-emerald-600 mb-1 uppercase tracking-wider">Total Cost</p>
                      <p className="text-4xl font-bold text-gray-900 mb-2">
                        {formatCurrency(result.tripCost, result.currency)}
                      </p>
                      <p className="text-sm font-medium text-gray-500">
                        {formatCurrency(result.costPerDistance, result.currency)} / {result.distanceUnit === 'miles' ? 'mi' : 'km'}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Fuel Required</p>
                      <p className="text-xl font-bold text-gray-800">
                        {result.fuelNeeded.toFixed(2)} <span className="text-sm font-medium text-gray-500">{result.efficiencyUnit === 'mpg' ? 'gal' : 'L'}</span>
                      </p>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Total Dist.</p>
                      <p className="text-xl font-bold text-gray-800">
                         {result.distance} <span className="text-sm font-medium text-gray-500">{result.distanceUnit === 'miles' ? 'mi' : 'km'}</span>
                      </p>
                    </div>
                  </div>
                  
                  <div className="pt-2">
                     <p className="text-xs text-gray-400 text-center flex items-center justify-center gap-1">
                       <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
                       Estimates may vary based on driving conditions
                     </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* History Toggle Button */}
        {history.length > 0 && (
          <button 
            onClick={() => setShowHistory(!showHistory)}
            className="w-full border-t border-gray-100 bg-gray-50 hover:bg-gray-100 py-3 text-sm font-medium text-gray-600 transition-colors flex justify-center items-center gap-2"
          >
            {showHistory ? 'Hide History' : `Show History (${history.length})`}
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-200 ${showHistory ? 'rotate-180' : ''}`}><path d="m6 9 6 6 6-6"/></svg>
          </button>
        )}
        
        {/* History Table */}
        {showHistory && history.length > 0 && (
          <div className="border-t border-gray-100 bg-white">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-base font-semibold text-gray-800 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l4 2"/></svg>
                  Recent Calculations
                </h3>
                <div className="flex gap-2 text-sm">
                  <button 
                    onClick={handleExportCSV}
                    className="text-emerald-600 hover:text-emerald-700 font-medium px-2 py-1 flex items-center gap-1 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
                    CSV
                  </button>
                  <button 
                    onClick={clearCurrentHistory}
                    className="text-red-500 hover:text-red-600 font-medium px-2 py-1 flex items-center gap-1 transition-colors"
                  >
                    Clear All
                  </button>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-gray-500 uppercase bg-gray-50 rounded-lg">
                    <tr>
                      <th className="px-4 py-3 rounded-l-lg font-medium">Distance</th>
                      <th className="px-4 py-3 font-medium">Efficiency</th>
                      <th className="px-4 py-3 font-medium">Price</th>
                      <th className="px-4 py-3 font-medium text-emerald-600">Total Cost</th>
                      <th className="px-4 py-3 rounded-r-lg font-medium"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {history.map((entry) => (
                      <tr key={entry.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors group">
                        <td className="px-4 py-3 font-medium text-gray-800">
                          {entry.calculation.distance} <span className="text-xs font-normal text-gray-400">{entry.calculation.distanceUnit === 'miles' ? 'mi' : 'km'}</span>
                        </td>
                        <td className="px-4 py-3 text-gray-600">
                          {entry.calculation.efficiency} <span className="text-xs font-normal text-gray-400">{entry.calculation.efficiencyUnit === 'mpg' ? 'mpg' : 'kml'}</span>
                        </td>
                        <td className="px-4 py-3 text-gray-600">
                          {formatCurrency(entry.calculation.fuelPrice, entry.calculation.currency)}
                        </td>
                        <td className="px-4 py-3 font-bold text-gray-900">
                          {formatCurrency(entry.calculation.tripCost, entry.calculation.currency)}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <button 
                            onClick={() => removeHistoryItem(entry.id)}
                            className="text-gray-300 hover:text-red-500 p-1 opacity-0 group-hover:opacity-100 transition-all rounded hover:bg-white focus:opacity-100 focus:outline-none"
                            aria-label="Delete entry"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      <ToolSEOContent />
      <RelatedTools currentTool="fuel-cost-calculator" tools={["tip-calculator", "loan-emi-calculator", "standard-deviation-calculator"]} />
    </div>
  );
}
