"use client";

import { useState, useMemo, useEffect } from "react";
import {
  Appliance,
  calculateTotalConsumption,
  downloadCSV,
  saveToLocalStorage,
  loadFromLocalStorage,
  clearLocalStorage,
  generateSummaryText,
} from "./logic";
import PowerConsumptionCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function PowerConsumptionCalculatorUI() {
  const [appliances, setAppliances] = useState<Appliance[]>([]);
  const [ratePerKwh, setRatePerKwh] = useState(0.12);
  const [name, setName] = useState("");
  const [wattage, setWattage] = useState("");
  const [hoursPerDay, setHoursPerDay] = useState("");
  const [copied, setCopied] = useState("");
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const saved = loadFromLocalStorage();
    if (saved) {
      setAppliances(saved.appliances);
      setRatePerKwh(saved.ratePerKwh);
    }
    setHasLoaded(true);
  }, []);

  useEffect(() => {
    if (hasLoaded && appliances.length > 0) {
      saveToLocalStorage(appliances, ratePerKwh);
    }
  }, [appliances, ratePerKwh, hasLoaded]);

  const { results, totals } = useMemo(
    () => calculateTotalConsumption(appliances, ratePerKwh),
    [appliances, ratePerKwh]
  );

  const addAppliance = () => {
    if (!name.trim() || !wattage || !hoursPerDay) return;

    const newAppliance: Appliance = {
      id: Date.now().toString(),
      name: name.trim(),
      wattage: parseFloat(wattage),
      hoursPerDay: parseFloat(hoursPerDay),
    };

    setAppliances([...appliances, newAppliance]);
    setName("");
    setWattage("");
    setHoursPerDay("");
  };

  const removeAppliance = (id: string) => {
    setAppliances(appliances.filter((app) => app.id !== id));
  };

  const updateAppliance = (id: string, field: keyof Appliance, value: any) => {
    setAppliances(
      appliances.map((app) =>
        app.id === id ? { ...app, [field]: value } : app
      )
    );
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(""), 2000);
  };

  const handleClearAll = () => {
    if (confirm("Are you sure you want to clear all appliances?")) {
      setAppliances([]);
      clearLocalStorage();
    }
  };

  const handleLoadExample = () => {
    const examples: Appliance[] = [
      { id: "1", name: "Refrigerator", wattage: 150, hoursPerDay: 24 },
      { id: "2", name: "Laptop", wattage: 60, hoursPerDay: 6 },
      { id: "3", name: "LED Bulb", wattage: 10, hoursPerDay: 5 },
      { id: "4", name: "Fan", wattage: 75, hoursPerDay: 10 },
    ];
    setAppliances(examples);
  };

  return (
    <>
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Input Panel */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8 space-y-6">
              <div className="space-y-4">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">
                  Appliance Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addAppliance()}
                  placeholder="e.g., Refrigerator, Laptop, Fan"
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">
                    Power (W)
                  </label>
                  <input
                    type="number"
                    value={wattage}
                    onChange={(e) => setWattage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && addAppliance()}
                    placeholder="e.g., 100"
                    min="0"
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 font-medium"
                  />
                </div>
                <div className="space-y-4">
                  <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">
                    Hours/Day
                  </label>
                  <input
                    type="number"
                    value={hoursPerDay}
                    onChange={(e) => setHoursPerDay(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && addAppliance()}
                    placeholder="e.g., 8"
                    min="0"
                    max="24"
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 font-medium"
                  />
                </div>
              </div>

              <button
                onClick={addAppliance}
                disabled={!name.trim() || !wattage || !hoursPerDay}
                className="w-full bg-primary hover:bg-primary-hover disabled:bg-gray-300 text-white font-bold py-3 rounded-lg transition-all shadow-md disabled:cursor-not-allowed"
              >
                ➕ Add Appliance
              </button>

              <div className="pt-4 border-t border-gray-100 space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">
                    Electricity Rate ($/kWh)
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500 font-bold">$</span>
                    <input
                      type="number"
                      value={ratePerKwh}
                      onChange={(e) => setRatePerKwh(parseFloat(e.target.value) || 0)}
                      step="0.01"
                      min="0"
                      className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                    <span className="text-gray-500 font-bold">/kWh</span>
                  </div>
                  <p className="text-xs text-gray-500 font-medium">
                    Typical US rate: $0.10-$0.15/kWh
                  </p>
                </div>
              </div>

              <div className="flex gap-2 pt-4 border-t border-gray-100">
                <button
                  onClick={handleLoadExample}
                  className="flex-1 text-xs bg-gray-100 border border-gray-200 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg font-bold transition-all"
                >
                  📋 Load Example
                </button>
                <button
                  onClick={handleClearAll}
                  disabled={appliances.length === 0}
                  className="flex-1 text-xs bg-red-50 border border-red-200 hover:bg-red-100 disabled:opacity-50 text-red-700 px-3 py-2 rounded-lg font-bold transition-all disabled:cursor-not-allowed"
                >
                  🗑️ Clear All
                </button>
              </div>
            </div>
          </div>

          {/* Results Panel */}
          <div className="lg:col-span-7 space-y-6">
            {appliances.length === 0 ? (
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border border-gray-200 p-8 text-center">
                <p className="text-gray-600 font-medium mb-2">No appliances added yet</p>
                <p className="text-sm text-gray-500">
                  Add appliances to see consumption and cost calculations
                </p>
              </div>
            ) : (
              <>
                {/* Summary Cards */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                      Monthly Consumption
                    </p>
                    <p className="text-2xl font-black text-gray-900">
                      {totals.monthlyKwh.toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                      })}
                    </p>
                    <p className="text-xs text-gray-500 font-medium mt-1">kWh</p>
                  </div>
                  <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                      Monthly Bill
                    </p>
                    <p className="text-2xl font-black text-primary">
                      ${totals.monthlyCost.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </p>
                    <p className="text-xs text-gray-500 font-medium mt-1">
                      ${(totals.yearlyCost / 12).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}/mo avg
                    </p>
                  </div>
                </div>

                {/* Yearly Summary */}
                <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl border border-primary/20 p-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-[10px] font-bold text-primary/60 uppercase tracking-wider mb-1">
                        Yearly Consumption
                      </p>
                      <p className="text-xl font-bold text-primary">
                        {totals.yearlyKwh.toLocaleString(undefined, {
                          maximumFractionDigits: 2,
                        })}
                        <span className="text-sm font-medium"> kWh</span>
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-primary/60 uppercase tracking-wider mb-1">
                        Yearly Cost
                      </p>
                      <p className="text-xl font-bold text-primary">
                        ${totals.yearlyCost.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Appliances Table */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                    <h3 className="font-bold text-gray-900">Appliances</h3>
                    <p className="text-xs text-gray-500 mt-1">
                      {appliances.length} appliance{appliances.length !== 1 ? "s" : ""}
                    </p>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-white uppercase tracking-wide text-[10px] text-gray-400 font-bold border-b border-gray-100">
                        <tr>
                          <th className="px-4 py-3">Name</th>
                          <th className="px-4 py-3 text-right">Power (W)</th>
                          <th className="px-4 py-3 text-right">Hours/Day</th>
                          <th className="px-4 py-3 text-right">Daily (kWh)</th>
                          <th className="px-4 py-3 text-right">Monthly ($)</th>
                          <th className="px-4 py-3 text-center">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {results.map((app) => (
                          <tr key={app.id} className="hover:bg-gray-50/50 transition-colors">
                            <td className="px-4 py-3">
                              <input
                                type="text"
                                value={app.name}
                                onChange={(e) =>
                                  updateAppliance(app.id, "name", e.target.value)
                                }
                                className="w-full bg-transparent font-medium text-gray-900 focus:outline-none focus:ring-1 focus:ring-primary/50 rounded px-1"
                              />
                            </td>
                            <td className="px-4 py-3 text-right">
                              <input
                                type="number"
                                value={app.wattage}
                                onChange={(e) =>
                                  updateAppliance(
                                    app.id,
                                    "wattage",
                                    parseFloat(e.target.value) || 0
                                  )
                                }
                                className="w-20 bg-transparent font-medium text-gray-900 text-right focus:outline-none focus:ring-1 focus:ring-primary/50 rounded px-1"
                              />
                            </td>
                            <td className="px-4 py-3 text-right">
                              <input
                                type="number"
                                value={app.hoursPerDay}
                                onChange={(e) =>
                                  updateAppliance(
                                    app.id,
                                    "hoursPerDay",
                                    parseFloat(e.target.value) || 0
                                  )
                                }
                                className="w-16 bg-transparent font-medium text-gray-900 text-right focus:outline-none focus:ring-1 focus:ring-primary/50 rounded px-1"
                              />
                            </td>
                            <td className="px-4 py-3 text-right font-bold text-gray-900">
                              {app.dailyKwh}
                            </td>
                            <td className="px-4 py-3 text-right font-bold text-primary">
                              ${app.monthlyCost.toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })}
                            </td>
                            <td className="px-4 py-3 text-center">
                              <button
                                onClick={() => removeAppliance(app.id)}
                                className="text-red-500 hover:text-red-700 font-bold transition-colors"
                              >
                                ✕
                              </button>
                            </td>
                          </tr>
                        ))}
                        <tr className="bg-gray-50/50 font-bold border-t-2 border-gray-200">
                          <td className="px-4 py-3 text-gray-900">TOTAL</td>
                          <td className="px-4 py-3 text-right text-gray-500">—</td>
                          <td className="px-4 py-3 text-right text-gray-500">—</td>
                          <td className="px-4 py-3 text-right text-gray-900">
                            {totals.dailyKwh}
                          </td>
                          <td className="px-4 py-3 text-right text-primary">
                            ${totals.monthlyCost.toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </td>
                          <td className="px-4 py-3"></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() =>
                      copyToClipboard(generateSummaryText(appliances, ratePerKwh), "summary")
                    }
                    className="flex-1 text-sm bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-4 py-3 rounded-lg font-bold transition-all shadow-sm"
                  >
                    {copied === "summary" ? "✓ Copied" : "📋 Copy Summary"}
                  </button>
                  <button
                    onClick={() => downloadCSV(appliances, ratePerKwh)}
                    className="flex-1 text-sm bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-4 py-3 rounded-lg font-bold transition-all shadow-sm"
                  >
                    💾 Download CSV
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Educational Section */}
      <div className="max-w-6xl mx-auto mt-12 space-y-8">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Use the Power Consumption Calculator</h2>
          <div className="space-y-4 text-gray-700">
            <p>
              <strong>Step 1:</strong> Enter the name of an appliance (e.g., "Refrigerator", "Laptop", "LED Bulb")
            </p>
            <p>
              <strong>Step 2:</strong> Input the power consumption in watts (W). You can find this on the appliance label or manual.
            </p>
            <p>
              <strong>Step 3:</strong> Specify how many hours per day the appliance is used.
            </p>
            <p>
              <strong>Step 4:</strong> Click "Add Appliance" to add it to your list.
            </p>
            <p>
              <strong>Step 5:</strong> Set your electricity rate ($/kWh) - typically between $0.10-$0.15 in the US.
            </p>
            <p>
              <strong>Step 6:</strong> View instant calculations for daily, monthly, and yearly consumption and costs.
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl border border-primary/20 p-8">
          <h3 className="text-xl font-bold text-primary mb-4">Understanding the Calculations</h3>
          <div className="space-y-3 text-gray-700 font-medium">
            <p>
              <strong>Daily kWh:</strong> (Wattage × Hours/Day) ÷ 1000
            </p>
            <p>
              <strong>Monthly kWh:</strong> Daily kWh × 30 days
            </p>
            <p>
              <strong>Yearly kWh:</strong> Monthly kWh × 12 months
            </p>
            <p>
              <strong>Cost:</strong> Total kWh × Electricity Rate ($/kWh)
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Common Appliance Wattages</h3>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-bold text-gray-900 mb-2">High Power (500W+)</p>
              <ul className="space-y-1 text-gray-600">
                <li>• Refrigerator: 150-800W</li>
                <li>• Washing Machine: 500-2000W</li>
                <li>• Dryer: 2000-5000W</li>
                <li>• Air Conditioner: 1000-5000W</li>
              </ul>
            </div>
            <div>
              <p className="font-bold text-gray-900 mb-2">Low Power (&lt;500W)</p>
              <ul className="space-y-1 text-gray-600">
                <li>• LED Bulb: 5-15W</li>
                <li>• Laptop: 30-100W</li>
                <li>• TV: 50-150W</li>
                <li>• Microwave: 600-1200W</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <PowerConsumptionCalculatorSEO />

      <RelatedTools
        currentTool="power-consumption-calculator"
        tools={[
          "mortgage-calculator",
          "simple-interest-calculator",
          "daily-calorie-calculator",
        ]}
      />
    </>
  );
}
