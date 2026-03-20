"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import {
  TaxOperation,
  HistoryEntry,
  calculateTax,
  formatCurrency,
  generateCSV,
  downloadCSV,
  getHistory,
  saveToHistory,
  clearHistory,
  deleteHistoryEntry,
  saveLastCalculation,
  getLastCalculation,
  PREDEFINED_TAX_RATES
} from "./logic";
import ToolSEOContent from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

const QUICK_AMOUNTS = [100, 500, 1000, 5000, 10000, 25000];

export default function GSTVATCalculatorUI() {
  const [price, setPrice] = useState<string>("100");
  const [taxRate, setTaxRate] = useState<string>("18");
  const [operation, setOperation] = useState<TaxOperation>("add");
  const [precision, setPrecision] = useState<number>(2);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [copied, setCopied] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setIsClient(true);
      setHistory(getHistory());

      const lastCalc = getLastCalculation();
      if (lastCalc) {
        setPrice(lastCalc.price);
        setTaxRate(lastCalc.taxRate);
        setOperation(lastCalc.operation);
      }
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  const priceNum = parseFloat(price);
  const taxRateNum = parseFloat(taxRate);

  const isValid = !isNaN(priceNum) && !isNaN(taxRateNum) && priceNum > 0 && taxRateNum >= 0;

  const result = useMemo(() => {
    if (!isValid) return null;
    return calculateTax(priceNum, taxRateNum, operation);
  }, [priceNum, taxRateNum, operation, isValid]);

  const validationMessage = useMemo(() => {
    if (price === "") return "Enter a price value.";
    if (taxRate === "") return "Enter a tax rate.";
    if (!isNaN(priceNum) && priceNum <= 0) return "Price must be greater than 0.";
    if (!isNaN(taxRateNum) && taxRateNum < 0) return "Tax rate cannot be negative.";
    if (!isValid) return "Please enter valid numeric values.";
    return "";
  }, [price, taxRate, priceNum, taxRateNum, isValid]);

  useEffect(() => {
    if (isClient && price && taxRate) {
      saveLastCalculation(price, taxRate, operation);
    }
  }, [price, taxRate, operation, isClient]);

  const handleCopy = () => {
    if (!result) return;

    const text = operation === "add"
      ? `Base Price: $${formatCurrency(result.basePrice, precision)}\nTax Rate: ${result.taxRate}%\nTax Amount: $${formatCurrency(result.taxAmount, precision)}\nFinal Price: $${formatCurrency(result.finalPrice, precision)}`
      : `Final Price: $${formatCurrency(result.finalPrice, precision)}\nTax Rate: ${result.taxRate}%\nTax Amount: $${formatCurrency(result.taxAmount, precision)}\nBase Price: $${formatCurrency(result.basePrice, precision)}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadCSV = () => {
    if (!result) return;
    const csvContent = generateCSV(result);
    downloadCSV(csvContent);
  };

  const handleSaveToHistory = useCallback(() => {
    if (!result) return;

    const entry: HistoryEntry = {
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      basePrice: result.basePrice,
      taxRate: result.taxRate,
      taxAmount: result.taxAmount,
      finalPrice: result.finalPrice,
      operation: result.operation
    };

    saveToHistory(entry);
    setHistory(getHistory());
  }, [result]);

  const handleClearInputs = () => {
    setPrice("");
    setTaxRate("");
  };

  const handlePredefinedRate = (rate: number) => {
    setTaxRate(rate.toString());
  };

  const handleQuickAmount = (amount: number) => {
    setPrice(amount.toString());
  };

  const handleLoadFromHistory = (entry: HistoryEntry) => {
    setOperation(entry.operation);
    setTaxRate(entry.taxRate.toString());
    setPrice((entry.operation === "add" ? entry.basePrice : entry.finalPrice).toString());
    setShowHistory(false);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-8">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900" style={{ fontFamily: "var(--font-heading)" }}>
              GST / VAT Calculator
            </h2>
            <p className="text-sm text-gray-600 mt-1" style={{ fontFamily: "var(--font-body)" }}>
              Add tax to a base price or remove tax from a final price with instant, schedule-free calculations.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 self-start sm:self-auto text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-lg px-3 py-1.5">
            <span>Formula:</span>
            <code>Add: Final = Base * (1 + r/100)</code>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          <div className="xl:col-span-5 space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Price Amount</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-semibold">$</span>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full pl-8 pr-4 py-3 bg-gray-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-primary focus:bg-white transition-all text-lg font-bold text-gray-800"
                  placeholder="e.g. 100"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Tax Rate (%)</label>
              <div className="relative">
                <input
                  type="number"
                  value={taxRate}
                  onChange={(e) => setTaxRate(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-primary focus:bg-white transition-all text-lg font-bold text-gray-800"
                  placeholder="e.g. 18"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-semibold">%</span>
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                {PREDEFINED_TAX_RATES.map((rate) => (
                  <button
                    key={rate.value}
                    onClick={() => handlePredefinedRate(rate.value)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                      taxRate === rate.value.toString()
                        ? "bg-primary border-primary text-white"
                        : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"
                    }`}
                  >
                    {rate.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Operation</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setOperation("add")}
                  className={`py-2.5 rounded-lg text-sm font-semibold border transition-all ${
                    operation === "add"
                      ? "bg-primary border-primary text-white"
                      : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"
                  }`}
                >
                  Add Tax
                </button>
                <button
                  onClick={() => setOperation("remove")}
                  className={`py-2.5 rounded-lg text-sm font-semibold border transition-all ${
                    operation === "remove"
                      ? "bg-primary border-primary text-white"
                      : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"
                  }`}
                >
                  Remove Tax
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Decimal Precision</label>
              <div className="grid grid-cols-3 gap-2">
                {[0, 2, 4].map((p) => (
                  <button
                    key={p}
                    onClick={() => setPrecision(p)}
                    className={`py-2 rounded-lg text-xs font-bold border transition-all ${
                      precision === p
                        ? "bg-primary border-primary text-white"
                        : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Quick Amounts</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {QUICK_AMOUNTS.map((amount) => (
                  <button
                    key={amount}
                    onClick={() => handleQuickAmount(amount)}
                    className="px-3 py-2 text-xs font-semibold rounded-lg border border-gray-200 bg-white text-gray-700 hover:border-primary hover:text-primary transition-colors"
                  >
                    ${amount.toLocaleString()}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-emerald-100 bg-emerald-50/60 p-4">
              <p className="text-xs text-emerald-700 font-semibold mb-1">Mode Note</p>
              <p className="text-sm text-emerald-900">
                {operation === "add"
                  ? "In Add mode, input is treated as pre-tax base amount."
                  : "In Remove mode, input is treated as tax-inclusive final amount."}
              </p>
            </div>
          </div>

          <div className="xl:col-span-7 flex flex-col gap-4">
            {validationMessage && !isValid && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm font-medium">
                {validationMessage}
              </div>
            )}

            <div className="relative overflow-hidden p-7 rounded-3xl bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-primary/15 shadow-inner">
              <span className="text-xs font-bold uppercase tracking-wider text-primary/70">Tax Breakdown</span>
              {result ? (
                <>
                  <div className="mt-4">
                    <p className="text-xs text-gray-500 font-medium">
                      {operation === "add" ? "Final Price (Tax Included)" : "Base Price (Tax Excluded)"}
                    </p>
                    <h3 className="text-5xl font-black text-gray-900 leading-tight">
                      ${formatCurrency(operation === "add" ? result.finalPrice : result.basePrice, precision)}
                    </h3>
                  </div>

                  <div className="mt-5 h-3 rounded-full overflow-hidden bg-white/80 border border-white">
                    <div className="h-full bg-emerald-500 transition-all duration-500" style={{ width: "100%" }} />
                  </div>
                </>
              ) : (
                <span className="block mt-4 text-2xl font-bold text-gray-300 italic">Enter valid values...</span>
              )}
              <div className="absolute -right-8 -bottom-6 text-8xl text-primary opacity-5 select-none font-black">TAX</div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Base Price</p>
                <p className="text-xl font-bold text-gray-900">
                  {result ? `$${formatCurrency(result.basePrice, precision)}` : "-"}
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Tax Amount</p>
                <p className="text-xl font-bold text-gray-900">
                  {result ? `$${formatCurrency(result.taxAmount, precision)}` : "-"}
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Final Price</p>
                <p className="text-xl font-bold text-gray-900">
                  {result ? `$${formatCurrency(result.finalPrice, precision)}` : "-"}
                </p>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 space-y-2">
              <div className="flex items-center justify-between text-xs text-gray-600">
                <span className="font-semibold">Tax Rate</span>
                <span className="font-bold">{result ? `${result.taxRate}%` : "0%"}</span>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-600">
                <span className="font-semibold">Operation</span>
                <span className="font-bold">{operation === "add" ? "Add Tax" : "Remove Tax"}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 pt-6 border-t border-gray-100 mt-8">
          <button
            onClick={handleCopy}
            disabled={!result}
            className={`flex-1 min-w-[150px] px-6 py-3.5 font-bold rounded-2xl transition-all ${
              !result
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : copied
                ? "bg-emerald-600 text-white"
                : "bg-primary hover:bg-primary-hover text-white"
            }`}
          >
            {copied ? "Copied" : "Copy Result"}
          </button>

          <button
            onClick={handleSaveToHistory}
            disabled={!result}
            className={`px-6 py-3.5 font-bold rounded-2xl transition-all ${
              result
                ? "bg-gray-900 hover:bg-gray-800 text-white"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            Save
          </button>

          <button
            onClick={handleDownloadCSV}
            disabled={!result}
            className={`px-6 py-3.5 font-bold rounded-2xl transition-all ${
              result
                ? "bg-teal-50 border border-teal-100 text-teal-700 hover:bg-teal-100"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            Export CSV
          </button>

          <button
            onClick={handleClearInputs}
            className="px-6 py-3.5 bg-white border-2 border-gray-100 hover:border-red-200 hover:text-red-500 text-gray-600 font-bold rounded-2xl transition-all"
          >
            Clear Inputs
          </button>

          <button
            onClick={() => setShowHistory(!showHistory)}
            className="px-6 py-3.5 bg-gray-50 border border-gray-200 text-gray-700 rounded-2xl font-bold hover:bg-gray-100 transition-all"
          >
            {showHistory ? "Hide" : "Show"} History ({history.length})
          </button>

          {history.length > 0 && (
            <button
              onClick={() => {
                clearHistory();
                setHistory([]);
                setShowHistory(false);
              }}
              className="px-6 py-3.5 bg-red-50 border border-red-100 text-red-700 rounded-2xl font-bold hover:bg-red-100 transition-all"
            >
              Clear History
            </button>
          )}
        </div>
      </div>

      {showHistory && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900">Recent Calculations</h3>
            <p className="text-xs text-gray-500 font-medium">Local browser history only</p>
          </div>

          {!isClient || history.length === 0 ? (
            <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50 p-6 text-sm text-gray-500">
              No saved calculations yet. Use <span className="font-semibold text-gray-700">Save</span> to store entries.
            </div>
          ) : (
            <div className="space-y-3 max-h-[460px] overflow-y-auto">
              {history.map((entry) => (
                <div
                  key={entry.id}
                  className="group flex items-center justify-between p-4 bg-gray-50/50 hover:bg-gray-50 rounded-2xl border border-transparent hover:border-gray-200 transition-all"
                >
                  <button
                    onClick={() => handleLoadFromHistory(entry)}
                    className="flex-1 text-left"
                  >
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded ${entry.operation === "add" ? "bg-emerald-100 text-emerald-700" : "bg-blue-100 text-blue-700"}`}>
                        {entry.operation === "add" ? "Add Tax" : "Remove Tax"}
                      </span>
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest italic">
                        {new Date(entry.timestamp).toLocaleString()}
                      </span>
                    </div>
                    <div className="text-sm font-bold text-gray-800 mt-1">
                      Base ${formatCurrency(entry.basePrice, precision)} | Tax ${formatCurrency(entry.taxAmount, precision)} | Final ${formatCurrency(entry.finalPrice, precision)}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">Tax Rate: {entry.taxRate}%</div>
                  </button>

                  <button
                    onClick={() => {
                      deleteHistoryEntry(entry.id);
                      setHistory(getHistory());
                    }}
                    className="ml-4 p-2 text-gray-400 hover:text-red-500 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all hover:bg-white rounded-xl shadow-sm border border-gray-100"
                    aria-label="Delete history entry"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <ToolSEOContent />
      <RelatedTools
        currentTool="gst-vat-calculator"
        tools={[
          "discount-calculator",
          "percentage-calculator",
          "simple-interest-calculator",
          "compound-interest-calculator",
          "profit-margin-calculator",
          "investment-return-calculator"
        ]}
      />
    </div>
  );
}
