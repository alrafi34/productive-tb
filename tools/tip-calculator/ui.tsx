"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  calculateTip,
  formatCurrency,
  roundUpBill,
  saveTipSettings,
  getTipSettings,
  saveToHistory,
  getHistory,
  clearHistory,
  debounce,
  PRESET_TIPS,
  CURRENCIES,
  TipCalculation,
  CalculationHistory
} from "./logic";
import TipCalculatorSEOContent from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function TipCalculatorUI() {
  const [billAmount, setBillAmount] = useState("");
  const [tipPercentage, setTipPercentage] = useState(15);
  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const [currency, setCurrency] = useState("USD");
  const [roundUp, setRoundUp] = useState(false);
  const [result, setResult] = useState<TipCalculation | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const [history, setHistory] = useState<CalculationHistory[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  const billInputRef = useRef<HTMLInputElement>(null);

  // Load settings on mount
  useEffect(() => {
    const settings = getTipSettings();
    if (settings) {
      setBillAmount(settings.billAmount.toString());
      setTipPercentage(settings.tipPercentage);
      setNumberOfPeople(settings.numberOfPeople);
      setCurrency(settings.currency);
    }
    setHistory(getHistory());
  }, []);

  // Perform calculation
  const performCalculation = useCallback(() => {
    const bill = parseFloat(billAmount);
    if (!billAmount || isNaN(bill) || bill < 0) {
      setResult(null);
      return;
    }

    const calc = calculateTip(bill, tipPercentage, numberOfPeople);
    setResult(calc);
    saveToHistory(bill, tipPercentage, numberOfPeople);
    setHistory(getHistory());
  }, [billAmount, tipPercentage, numberOfPeople]);

  const debouncedCalculation = useCallback(
    debounce(performCalculation, 200),
    [performCalculation]
  );

  // Handle bill amount change
  const handleBillChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setBillAmount(value);
    debouncedCalculation();
  };

  // Handle tip percentage change
  const handleTipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setTipPercentage(value);
    performCalculation();
  };

  // Handle people count change
  const handlePeopleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      setNumberOfPeople(value);
      performCalculation();
    }
  };

  // Handle preset tip
  const handlePresetTip = (tip: number) => {
    setTipPercentage(tip);
    performCalculation();
  };

  // Handle currency change
  const handleCurrencyChange = (newCurrency: string) => {
    setCurrency(newCurrency);
  };

  // Copy to clipboard
  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  // Copy summary
  const copySummary = () => {
    if (!result) return;
    const symbol = CURRENCIES[currency as keyof typeof CURRENCIES].symbol;
    const text = `Bill: ${formatCurrency(result.billAmount, symbol)}
Tip (${result.tipPercentage}%): ${formatCurrency(result.tipAmount, symbol)}
Total: ${formatCurrency(result.totalBill, symbol)}
People: ${result.numberOfPeople}
Each Pays: ${formatCurrency(result.perPersonAmount, symbol)}`;
    copyToClipboard(text, "summary");
  };

  // Clear all
  const clearAll = () => {
    setBillAmount("");
    setTipPercentage(15);
    setNumberOfPeople(1);
    setResult(null);
    setRoundUp(false);
    billInputRef.current?.focus();
  };

  // Load from history
  const loadFromHistory = (item: CalculationHistory) => {
    setBillAmount(item.billAmount.toString());
    setTipPercentage(item.tipPercentage);
    setNumberOfPeople(item.numberOfPeople);
    setShowHistory(false);
    performCalculation();
  };

  // Save settings when they change
  useEffect(() => {
    if (billAmount) {
      saveTipSettings(parseFloat(billAmount) || 0, tipPercentage, numberOfPeople, currency);
    }
  }, [billAmount, tipPercentage, numberOfPeople, currency]);

  const symbol = CURRENCIES[currency as keyof typeof CURRENCIES].symbol;
  const finalPerPersonAmount = roundUp && result ? roundUpBill(result.perPersonAmount) : result?.perPersonAmount;

  return (
    <>
      <div className="max-w-4xl mx-auto">
        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <span className="text-2xl">💵</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Tip Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate tips and split bills between multiple people instantly. Perfect for restaurants, group dinners, and travel expenses.
              </p>
            </div>
          </div>
        </div>

        {/* Main Input Panel */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
            Bill Details
          </h2>

          <div className="grid sm:grid-cols-2 gap-6 mb-6">
            {/* Bill Amount */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Bill Amount
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 font-semibold">
                  {symbol}
                </span>
                <input
                  ref={billInputRef}
                  type="number"
                  value={billAmount}
                  onChange={handleBillChange}
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  className="w-full pl-8 pr-3 py-3 rounded-lg border-2 border-gray-200 font-mono text-lg focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            {/* Number of People */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Number of People
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    if (numberOfPeople > 1) {
                      setNumberOfPeople(numberOfPeople - 1);
                      performCalculation();
                    }
                  }}
                  className="px-3 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-semibold transition-colors"
                >
                  −
                </button>
                <input
                  type="number"
                  value={numberOfPeople}
                  onChange={handlePeopleChange}
                  min="1"
                  max="100"
                  className="flex-1 px-3 py-3 rounded-lg border-2 border-gray-200 font-mono text-lg text-center focus:outline-none focus:border-primary"
                />
                <button
                  onClick={() => {
                    if (numberOfPeople < 100) {
                      setNumberOfPeople(numberOfPeople + 1);
                      performCalculation();
                    }
                  }}
                  className="px-3 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-semibold transition-colors"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Currency Selector */}
          <div className="space-y-2 mb-6">
            <label className="block text-sm font-semibold text-gray-700">
              Currency
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {Object.entries(CURRENCIES).map(([code, { symbol: sym, name }]) => (
                <button
                  key={code}
                  onClick={() => handleCurrencyChange(code)}
                  className={`px-3 py-2 rounded-lg font-semibold text-sm transition-colors ${
                    currency === code
                      ? "bg-primary text-white"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                  }`}
                  title={name}
                >
                  {sym} {code}
                </button>
              ))}
            </div>
          </div>

          {/* Clear Button */}
          <button
            onClick={clearAll}
            className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-semibold transition-colors"
          >
            🗑️ Clear All
          </button>
        </div>

        {/* Tip Percentage Panel */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
            Tip Percentage
          </h2>

          {/* Preset Buttons */}
          <div className="grid grid-cols-4 gap-2 mb-6">
            {PRESET_TIPS.map((tip) => (
              <button
                key={tip}
                onClick={() => handlePresetTip(tip)}
                className={`px-3 py-3 rounded-lg font-semibold text-sm transition-colors ${
                  tipPercentage === tip
                    ? "bg-primary text-white"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                }`}
              >
                {tip}%
              </button>
            ))}
          </div>

          {/* Slider */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-gray-700">
                Custom Tip
              </label>
              <span className="text-lg font-bold text-primary">{tipPercentage}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="50"
              value={tipPercentage}
              onChange={handleTipChange}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>0%</span>
              <span>50%</span>
            </div>
          </div>
        </div>

        {/* Results Panel */}
        {result && (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
              💰 Results
            </h2>

            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              {/* Tip Amount */}
              <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200">
                <div className="text-sm text-blue-600 mb-1">Tip Amount</div>
                <div className="text-3xl font-bold text-blue-900">
                  {formatCurrency(result.tipAmount, symbol)}
                </div>
                <div className="text-xs text-blue-600 mt-1">({result.tipPercentage}%)</div>
              </div>

              {/* Total Bill */}
              <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200">
                <div className="text-sm text-green-600 mb-1">Total Bill</div>
                <div className="text-3xl font-bold text-green-900">
                  {formatCurrency(result.totalBill, symbol)}
                </div>
                <div className="text-xs text-green-600 mt-1">Bill + Tip</div>
              </div>

              {/* Per Person */}
              <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border border-purple-200 sm:col-span-2">
                <div className="text-sm text-purple-600 mb-1">Each Person Pays</div>
                <div className="text-3xl font-bold text-purple-900">
                  {formatCurrency(finalPerPersonAmount || 0, symbol)}
                </div>
                <div className="text-xs text-purple-600 mt-1">
                  {result.numberOfPeople} {result.numberOfPeople === 1 ? "person" : "people"}
                  {roundUp && " (rounded up)"}
                </div>
              </div>
            </div>

            {/* Round Up Option */}
            <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors mb-6">
              <input
                type="checkbox"
                checked={roundUp}
                onChange={(e) => setRoundUp(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-sm font-semibold text-gray-700">Round up per-person amount to nearest dollar</span>
            </label>

            {/* Copy Buttons */}
            <div className="grid sm:grid-cols-2 gap-3">
              <button
                onClick={() => copyToClipboard(formatCurrency(result.tipAmount, symbol), "tip")}
                className="px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg text-sm font-semibold transition-colors"
              >
                {copied === "tip" ? "✓ Copied Tip" : "📋 Copy Tip"}
              </button>
              <button
                onClick={() => copyToClipboard(formatCurrency(result.totalBill, symbol), "total")}
                className="px-4 py-2 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg text-sm font-semibold transition-colors"
              >
                {copied === "total" ? "✓ Copied Total" : "📋 Copy Total"}
              </button>
              <button
                onClick={() => copyToClipboard(formatCurrency(finalPerPersonAmount || 0, symbol), "perPerson")}
                className="px-4 py-2 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-lg text-sm font-semibold transition-colors"
              >
                {copied === "perPerson" ? "✓ Copied Per Person" : "📋 Copy Per Person"}
              </button>
              <button
                onClick={copySummary}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-semibold transition-colors"
              >
                {copied === "summary" ? "✓ Copied Summary" : "📋 Copy Summary"}
              </button>
            </div>
          </div>
        )}

        {/* Bill Split Visualization */}
        {result && result.numberOfPeople > 1 && (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
              📊 Bill Split Visualization
            </h2>

            <div className="space-y-3">
              {Array.from({ length: result.numberOfPeople }).map((_, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="font-semibold text-gray-700">Person {idx + 1}</span>
                    <span className="font-bold text-gray-900">
                      {formatCurrency(finalPerPersonAmount || 0, symbol)}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-primary to-primary-hover h-2 rounded-full"
                      style={{ width: "100%" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* History */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
              📜 Calculation History
            </h2>
            <div className="flex gap-2">
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-semibold transition-colors"
              >
                {showHistory ? "Hide" : "Show"}
              </button>
              {history.length > 0 && (
                <button
                  onClick={() => {
                    clearHistory();
                    setHistory([]);
                  }}
                  className="px-3 py-1 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg text-sm font-semibold transition-colors"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {showHistory && (
            <div className="space-y-2">
              {history.length === 0 ? (
                <p className="text-center text-gray-500 py-8">No calculation history yet</p>
              ) : (
                history.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => loadFromHistory(item)}
                    className="p-3 bg-gray-50 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="text-sm">
                        <span className="font-semibold text-gray-800">
                          {formatCurrency(item.billAmount, symbol)}
                        </span>
                        <span className="text-gray-600 mx-2">•</span>
                        <span className="text-gray-600">{item.tipPercentage}% tip</span>
                        <span className="text-gray-600 mx-2">•</span>
                        <span className="text-gray-600">{item.numberOfPeople} {item.numberOfPeople === 1 ? "person" : "people"}</span>
                      </div>
                      <span className="text-xs text-gray-500">
                        {new Date(item.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      <TipCalculatorSEOContent />
      <RelatedTools
        currentTool="tip-calculator"
        tools={["discount-calculator", "percentage-calculator", "bill-split-calculator"]}
      />
    </>
  );
}
