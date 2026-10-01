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
  getCalculationSummary,
  toDistancePerFuel,
  electricTripCost,
  type EconomyUnit,
} from "./logic";
import ToolSEOContent from "./seo-content";
import RelatedTools from "@/components/RelatedTools";
import RelatedStrip from "@/components/RelatedStrip";
import CurrencySelect from "@/components/CurrencySelect";
import { currencySymbol } from "@/lib/currency";
import { useCurrency } from "@/lib/use-currency";

type CompareMode = "none" | "car" | "ev";

type TripResult = {
  trip: FuelCalculation;
  people: number;
  roundTrip: boolean;
  compare?: { label: string; cost: number; amount: number; unit: string };
};

const INPUT =
  "w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none";

export default function FuelCostCalculatorUI() {
  const [distance, setDistance] = useState<string>("100");
  const [efficiency, setEfficiency] = useState<string>("25");
  const [fuelPrice, setFuelPrice] = useState<string>("3.50");
  const [distanceUnit, setDistanceUnit] = useState<"miles" | "km">("miles");
  const [economyUnit, setEconomyUnit] = useState<EconomyUnit>("mpg");
  const [currency, setCurrency] = useCurrency("fuel-cost-calculator:currency");
  const [roundTrip, setRoundTrip] = useState(false);
  const [people, setPeople] = useState<string>("1");
  const [compareMode, setCompareMode] = useState<CompareMode>("none");
  const [efficiency2, setEfficiency2] = useState<string>("40");
  const [evUse, setEvUse] = useState<string>("30");
  const [evPrice, setEvPrice] = useState<string>("0.17");

  const [result, setResult] = useState<TripResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  // Toggle state for advanced/history view
  const [showHistory, setShowHistory] = useState<boolean>(false);

  // Load history on mount
  useEffect(() => {
    setHistory(getHistoryFromStorage());
  }, []);

  const metric = distanceUnit === "km";
  const distLabel = metric ? "km" : "mi";
  const fuelUnit = metric ? "L" : "gal";
  const economyLabel = economyUnit === "mpg" ? "MPG" : economyUnit === "kml" ? "km/L" : "L/100 km";

  const handleCalculate = () => {
    const d = parseFloat(distance);
    const e = parseFloat(efficiency);
    const p = parseFloat(fuelPrice);
    const n = Math.max(1, Math.floor(parseFloat(people) || 1));

    if (isNaN(d) || isNaN(e) || isNaN(p) || d <= 0 || e <= 0 || p < 0) {
      setError("Enter a distance, fuel economy and fuel price greater than zero.");
      setResult(null);
      return;
    }
    setError(null);

    const totalDistance = roundTrip ? d * 2 : d;
    const trip = calculateFuelCost(
      totalDistance,
      toDistancePerFuel(e, economyUnit),
      p,
      distanceUnit,
      metric ? "kml" : "mpg",
      currency,
    );

    let compare: TripResult["compare"];
    if (compareMode === "car") {
      const e2 = parseFloat(efficiency2);
      if (e2 > 0) {
        const other = calculateFuelCost(totalDistance, toDistancePerFuel(e2, economyUnit), p, distanceUnit, metric ? "kml" : "mpg", currency);
        compare = { label: `Car at ${e2} ${economyLabel}`, cost: other.tripCost, amount: other.fuelNeeded, unit: fuelUnit };
      }
    } else if (compareMode === "ev") {
      const use = parseFloat(evUse);
      const price = parseFloat(evPrice);
      if (use > 0 && price >= 0) {
        const ev = electricTripCost(totalDistance, use, price);
        compare = { label: `Electric car at ${use} kWh/100 ${distLabel}`, cost: ev.cost, amount: ev.kwh, unit: "kWh" };
      }
    }

    setResult({ trip, people: n, roundTrip, compare });

    // Save to history automatically
    if (trip.tripCost > 0) {
      saveToHistory(trip);
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
    if (!result) return;
    const lines = [getCalculationSummary(result.trip)];
    if (result.roundTrip) lines.push("Round trip: yes (distance doubled)");
    if (result.people > 1) lines.push(`Cost per person (${result.people}): ${formatCurrency(result.trip.tripCost / result.people, result.trip.currency)}`);
    if (result.compare) lines.push(`${result.compare.label}: ${formatCurrency(result.compare.cost, result.trip.currency)}`);
    navigator.clipboard.writeText(lines.join("\n"));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Switch units cleanly
  const toggleUnitSystem = (system: "imperial" | "metric") => {
    // Economy, prices and EV use mean different things in each system, so
    // switch them to typical starting values rather than keep stale numbers
    if (system === "imperial") {
      setDistanceUnit("miles");
      setEconomyUnit("mpg");
      setEfficiency("25");
      setEfficiency2("40");
      setFuelPrice("3.50");
      setEvUse("30");
    } else {
      setDistanceUnit("km");
      setEconomyUnit("l100km");
      setEfficiency("6.5");
      setEfficiency2("4.5");
      setFuelPrice("1.75");
      setEvUse("18");
    }
    setResult(null);
  };

  const field = (label: string, value: string, set: (v: string) => void, suffix: string, placeholder: string, step = "any") => (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700 block">{label}</label>
      <div className="relative">
        <input type="number" value={value} onChange={(e) => set(e.target.value)} className={`${INPUT} pr-24`} placeholder={placeholder} min="0" step={step} />
        <div className="absolute inset-y-0 right-4 flex items-center text-sm text-gray-400 font-medium">{suffix}</div>
      </div>
    </div>
  );

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
                  !metric ? "bg-white text-emerald-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Miles · MPG · gallons
              </button>
              <button
                onClick={() => toggleUnitSystem("metric")}
                className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
                  metric ? "bg-white text-emerald-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Km · liters
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* INPUT SECTION */}
            <div className="space-y-5">
              {field("Trip distance (one way)", distance, setDistance, distLabel, "E.g., 100")}
              <label className="flex items-center gap-2 text-sm text-gray-700 -mt-2">
                <input type="checkbox" checked={roundTrip} onChange={(e) => setRoundTrip(e.target.checked)} />
                Round trip (there and back)
              </label>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">Fuel economy</label>
                  {metric && (
                    <select
                      value={economyUnit}
                      onChange={(e) => {
                        const unit = e.target.value as EconomyUnit;
                        setEconomyUnit(unit);
                        setEfficiency(unit === "kml" ? "15" : "6.5");
                        setEfficiency2(unit === "kml" ? "22" : "4.5");
                      }}
                      aria-label="Fuel economy unit"
                      className="px-2 py-1 border border-gray-200 rounded-md text-xs bg-white"
                    >
                      <option value="l100km">L/100 km</option>
                      <option value="kml">km/L</option>
                    </select>
                  )}
                </div>
                <div className="relative">
                  <input type="number" value={efficiency} onChange={(e) => setEfficiency(e.target.value)} className={`${INPUT} pr-24`} placeholder={economyUnit === "l100km" ? "E.g., 6.5" : "E.g., 25"} min="0" step="any" />
                  <div className="absolute inset-y-0 right-4 flex items-center text-sm text-gray-400 font-medium">{economyLabel}</div>
                </div>
                {!metric && <p className="text-xs text-gray-400">US MPG. For UK MPG (imperial gallons), multiply by 0.833.</p>}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">
                    Fuel price <span className="text-gray-400 text-xs font-normal">(per {metric ? "liter" : "gallon"})</span>
                  </label>
                  <CurrencySelect value={currency} onChange={setCurrency} className="text-xs" />
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-4 flex items-center text-gray-500">{currencySymbol(currency)}</div>
                  <input type="number" value={fuelPrice} onChange={(e) => setFuelPrice(e.target.value)} className={`${INPUT} pl-12`} placeholder={metric ? "1.75" : "3.50"} min="0" step="0.01" />
                </div>
              </div>

              {field("Split the cost between", people, setPeople, "people", "1", "1")}

              {/* Comparison */}
              <div className="space-y-3 rounded-xl border border-gray-100 p-4">
                <label className="text-sm font-medium text-gray-700 block">Compare with</label>
                <div className="flex flex-wrap gap-2">
                  {([["none", "Nothing"], ["car", "Another car"], ["ev", "An electric car"]] as const).map(([mode, label]) => (
                    <button
                      key={mode}
                      onClick={() => setCompareMode(mode)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                        compareMode === mode ? "border-emerald-500 bg-emerald-50 text-emerald-700" : "border-gray-200 text-gray-600 hover:border-gray-300"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
                {compareMode === "car" && field("Other car's fuel economy", efficiency2, setEfficiency2, economyLabel, "E.g., 40")}
                {compareMode === "ev" && (
                  <div className="grid grid-cols-2 gap-3">
                    {field("Consumption", evUse, setEvUse, `kWh/100 ${distLabel}`, "30")}
                    {field(`Electricity (${currencySymbol(currency)}/kWh)`, evPrice, setEvPrice, "per kWh", "0.17", "0.01")}
                  </div>
                )}
                {compareMode === "ev" && (
                  <p className="text-xs text-gray-400">Use your own tariff; home charging and public fast charging can differ several times over.</p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-2">
                <button
                  onClick={handleCalculate}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg active:scale-[0.98] flex justify-center items-center gap-2"
                >
                  Calculate Cost
                </button>
                {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
              </div>
            </div>

            {/* RESULTS SECTION */}
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 flex flex-col h-full">
              {!result ? (
                <div className="flex flex-col items-center justify-center text-center h-full text-gray-400 space-y-4 py-12">
                  <p>Enter your trip details to calculate estimated fuel costs.</p>
                </div>
              ) : (
                <div className="space-y-5">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold text-gray-800">Trip Estimate</h3>
                    <button onClick={handleCopyResult} className="text-xs text-gray-500 hover:text-emerald-600 transition-colors">
                      {copied ? "Copied" : "Copy summary"}
                    </button>
                  </div>

                  <div className="bg-white rounded-xl p-5 border border-emerald-100 shadow-sm">
                    <p className="text-sm font-medium text-emerald-600 mb-1 uppercase tracking-wider">Total Cost</p>
                    <p className="text-4xl font-bold text-gray-900 mb-2">{formatCurrency(result.trip.tripCost, result.trip.currency)}</p>
                    <p className="text-sm font-medium text-gray-500">
                      {formatCurrency(result.trip.costPerDistance, result.trip.currency)} / {distLabel}
                      {result.roundTrip && " · round trip"}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Fuel Required</p>
                      <p className="text-xl font-bold text-gray-800">
                        {result.trip.fuelNeeded.toFixed(2)} <span className="text-sm font-medium text-gray-500">{fuelUnit}</span>
                      </p>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Total Distance</p>
                      <p className="text-xl font-bold text-gray-800">
                        {result.trip.distance.toLocaleString("en-US")} <span className="text-sm font-medium text-gray-500">{distLabel}</span>
                      </p>
                    </div>
                    {result.people > 1 && (
                      <div className="col-span-2 bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Each of {result.people} people pays</p>
                        <p className="text-xl font-bold text-gray-800">{formatCurrency(result.trip.tripCost / result.people, result.trip.currency)}</p>
                      </div>
                    )}
                  </div>

                  {result.compare && (
                    <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm space-y-1">
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{result.compare.label}</p>
                      <p className="text-xl font-bold text-gray-800">
                        {formatCurrency(result.compare.cost, result.trip.currency)}{" "}
                        <span className="text-sm font-medium text-gray-500">({result.compare.amount.toFixed(1)} {result.compare.unit})</span>
                      </p>
                      <p className={`text-sm font-medium ${result.compare.cost <= result.trip.tripCost ? "text-emerald-600" : "text-red-500"}`}>
                        {result.compare.cost <= result.trip.tripCost
                          ? `Saves ${formatCurrency(result.trip.tripCost - result.compare.cost, result.trip.currency)} on this trip`
                          : `Costs ${formatCurrency(result.compare.cost - result.trip.tripCost, result.trip.currency)} more on this trip`}
                      </p>
                    </div>
                  )}

                  <p className="text-xs text-gray-400 text-center">Estimates vary with speed, traffic, load and weather.</p>
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
                          {entry.calculation.efficiency} <span className="text-xs font-normal text-gray-400">{entry.calculation.efficiencyUnit === 'mpg' ? 'mpg' : 'km/L'}</span>
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

      <RelatedStrip />
      <ToolSEOContent />
      <RelatedTools />
    </div>
  );
}
