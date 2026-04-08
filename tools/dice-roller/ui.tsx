"use client";

import { useState, useEffect, useRef } from "react";
import {
  DiceSet,
  RollResult,
  rollDiceSet,
  calculateTotal,
  formatDiceConfig,
  saveRollToHistory,
  exportHistoryAsJSON,
  downloadFile,
} from "./logic";
import DiceRollerSEOContent from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

const DICE_TYPES = [4, 6, 8, 10, 12, 20];
let rollCounter = 0;

export default function DiceRollerUI() {
  const [diceSet, setDiceSet] = useState<DiceSet[]>(
    DICE_TYPES.map((sides) => ({ sides, count: sides === 6 ? 1 : 0 }))
  );
  const [results, setResults] = useState<number[]>([]);
  const [total, setTotal] = useState(0);
  const [history, setHistory] = useState<RollResult[]>([]);
  const [isRolling, setIsRolling] = useState(false);
  const [animatingDice, setAnimatingDice] = useState<number[]>([]);
  const [copied, setCopied] = useState("");
  const [animationSpeed, setAnimationSpeed] = useState<"fast" | "normal" | "slow">(
    "normal"
  );
  const [showTotal, setShowTotal] = useState(true);
  const rollIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Load history from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("diceRollerHistory");
      if (saved) {
        const parsed = JSON.parse(saved);
        const withNewIds = parsed.map((item: RollResult) => ({
          ...item,
          id: `roll-${++rollCounter}`,
        }));
        setHistory(withNewIds);
      }
    } catch (e) {}
  }, []);

  // Save history to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("diceRollerHistory", JSON.stringify(history.slice(0, 20)));
    } catch (e) {}
  }, [history]);

  const getAnimationDuration = () => {
    switch (animationSpeed) {
      case "fast":
        return 300;
      case "slow":
        return 700;
      default:
        return 500;
    }
  };

  const handleRoll = () => {
    const activeDice = diceSet.filter((d) => d.count > 0);
    if (activeDice.length === 0) return;

    setIsRolling(true);
    const duration = getAnimationDuration();
    const tickCount = Math.ceil(duration / 50);
    let tick = 0;

    // Animate dice rolling
    rollIntervalRef.current = setInterval(() => {
      const tempRolls = rollDiceSet(activeDice);
      setAnimatingDice(tempRolls);
      tick++;

      if (tick >= tickCount) {
        if (rollIntervalRef.current) clearInterval(rollIntervalRef.current);

        // Final roll
        const finalRolls = rollDiceSet(activeDice);
        setResults(finalRolls);
        setAnimatingDice([]);
        setTotal(calculateTotal(finalRolls));
        setIsRolling(false);

        // Save to history
        const config = formatDiceConfig(activeDice);
        const uniqueId = `roll-${++rollCounter}`;
        const rollResult = saveRollToHistory(finalRolls, config, uniqueId);
        setHistory((prev) => [rollResult, ...prev].slice(0, 20));
      }
    }, 50);
  };

  const handleRollMultiple = (times: number) => {
    const activeDice = diceSet.filter((d) => d.count > 0);
    if (activeDice.length === 0) return;

    const newHistory: RollResult[] = [];
    const config = formatDiceConfig(activeDice);

    for (let i = 0; i < times; i++) {
      const rolls = rollDiceSet(activeDice);
      const uniqueId = `roll-${++rollCounter}`;
      const rollResult = saveRollToHistory(rolls, config, uniqueId);
      newHistory.push(rollResult);
    }

    setHistory((prev) => [...newHistory, ...prev].slice(0, 20));
    if (newHistory.length > 0) {
      setResults(newHistory[0].rolls);
      setTotal(newHistory[0].total);
    }
  };

  const handleDiceCountChange = (sides: number, count: number) => {
    setDiceSet((prev) =>
      prev.map((d) => (d.sides === sides ? { ...d, count: Math.max(0, count) } : d))
    );
  };

  const handleClearResults = () => {
    setResults([]);
    setTotal(0);
    setAnimatingDice([]);
  };

  const handleResetDice = () => {
    setDiceSet(DICE_TYPES.map((sides) => ({ sides, count: sides === 6 ? 1 : 0 })));
    handleClearResults();
  };

  const handleClearHistory = () => {
    setHistory([]);
    try {
      localStorage.removeItem("diceRollerHistory");
    } catch (e) {}
  };

  const handleCopyResults = () => {
    const text = results.join(", ") + (showTotal ? ` (Total: ${total})` : "");
    navigator.clipboard.writeText(text);
    setCopied("results");
    setTimeout(() => setCopied(""), 2000);
  };

  const handleExportHistory = () => {
    const json = exportHistoryAsJSON(history);
    downloadFile(json, `dice-rolls-${Date.now()}.json`);
  };

  const handleCopyHistoryItem = (item: RollResult) => {
    const text = item.rolls.join(", ") + ` (Total: ${item.total})`;
    navigator.clipboard.writeText(text);
    setCopied(item.id);
    setTimeout(() => setCopied(""), 2000);
  };

  // Keyboard shortcut
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === "Space" && !isRolling) {
        e.preventDefault();
        handleRoll();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [isRolling, diceSet]);

  const displayRolls = isRolling ? animatingDice : results;
  const activeDiceCount = diceSet.filter((d) => d.count > 0).length;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Controls Column */}
        <div className="lg:col-span-4 space-y-6">
          {/* Dice Selection */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">
              Select Dice
            </h3>
            <div className="space-y-3">
              {diceSet.map((die) => (
                <div key={die.sides} className="flex items-center justify-between">
                  <label className="text-sm font-semibold text-gray-700">
                    D{die.sides}
                  </label>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleDiceCountChange(die.sides, die.count - 1)}
                      className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold transition-colors"
                    >
                      −
                    </button>
                    <input
                      type="number"
                      min="0"
                      max="10"
                      value={die.count}
                      onChange={(e) =>
                        handleDiceCountChange(die.sides, parseInt(e.target.value) || 0)
                      }
                      className="w-12 text-center bg-gray-50 border border-gray-200 rounded-lg px-2 py-1.5 font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                    <button
                      onClick={() => handleDiceCountChange(die.sides, die.count + 1)}
                      className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Settings */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">
              Settings
            </h3>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">
                  Animation Speed
                </label>
                <div className="flex gap-2">
                  {(["fast", "normal", "slow"] as const).map((speed) => (
                    <button
                      key={speed}
                      onClick={() => setAnimationSpeed(speed)}
                      className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
                        animationSpeed === speed
                          ? "bg-primary text-white shadow-md"
                          : "bg-gray-50 text-gray-500 hover:bg-gray-100"
                      }`}
                    >
                      {speed.charAt(0).toUpperCase() + speed.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <label className="text-sm font-semibold text-gray-700">
                  Show Total
                </label>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showTotal}
                    onChange={(e) => setShowTotal(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleRoll}
              disabled={isRolling || activeDiceCount === 0}
              className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-primary-hover transition-all shadow-lg active:scale-[0.98] disabled:opacity-50"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {isRolling ? "ROLLING..." : "ROLL DICE"}
            </button>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => handleRollMultiple(10)}
                disabled={isRolling || activeDiceCount === 0}
                className="bg-white border border-gray-200 text-gray-700 font-bold py-2.5 rounded-xl hover:bg-gray-50 transition-all disabled:opacity-50"
              >
                Roll ×10
              </button>
              <button
                onClick={handleClearResults}
                className="bg-white border border-gray-200 text-gray-700 font-bold py-2.5 rounded-xl hover:bg-gray-50 transition-all"
              >
                Clear
              </button>
            </div>

            <button
              onClick={handleResetDice}
              className="w-full bg-white border border-gray-200 text-gray-700 font-bold py-2.5 rounded-xl hover:bg-gray-50 transition-all"
            >
              Reset Dice
            </button>
          </div>

          {/* History */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="flex justify-between items-center p-4 bg-gray-50 border-b border-gray-100">
              <h3 className="text-xs font-bold text-gray-700 uppercase tracking-widest">
                History
              </h3>
              <div className="flex gap-2">
                {history.length > 0 && (
                  <>
                    <button
                      onClick={handleExportHistory}
                      className="text-[10px] font-bold text-primary hover:text-primary-hover uppercase tracking-tighter"
                    >
                      Export
                    </button>
                    <button
                      onClick={handleClearHistory}
                      className="text-[10px] font-bold text-red-400 hover:text-red-500 uppercase tracking-tighter"
                    >
                      Clear
                    </button>
                  </>
                )}
              </div>
            </div>
            <div className="max-h-64 overflow-y-auto custom-scrollbar divide-y divide-gray-50">
              {history.length === 0 ? (
                <p className="p-8 text-center text-xs text-gray-400 italic font-medium">
                  No rolls yet.
                </p>
              ) : (
                history.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 hover:bg-gray-50 transition-colors group relative"
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[10px] font-bold text-gray-400">
                        {item.time}
                      </span>
                      <span className="text-[10px] font-bold text-primary bg-primary/5 px-1.5 py-0.5 rounded">
                        {item.diceConfig}
                      </span>
                    </div>
                    <p className="text-sm font-bold text-gray-800 truncate pr-8">
                      {item.rolls.join(", ")}
                    </p>
                    <p className="text-xs text-gray-500 font-semibold">
                      Total: {item.total}
                    </p>
                    <button
                      onClick={() => handleCopyHistoryItem(item)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-xs text-gray-400 hover:text-primary font-bold"
                    >
                      {copied === item.id ? "✓" : "Copy"}
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Results Column */}
        <div className="lg:col-span-8">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_4px_30px_-10px_rgba(0,0,0,0.05)] h-full flex flex-col min-h-[600px] overflow-hidden">
            {/* Display Area */}
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-gray-50/50 border-b border-gray-100 relative">
              {displayRolls.length === 0 ? (
                <div className="space-y-3 opacity-30">
                  <span className="text-8xl">🎲</span>
                  <p className="text-sm font-bold uppercase tracking-widest">
                    Ready to roll
                  </p>
                </div>
              ) : (
                <div className="space-y-6 w-full">
                  <div className="space-y-2">
                    <span className="text-8xl font-black text-gray-900 tracking-tighter block leading-none">
                      {displayRolls[0]}
                    </span>
                    {displayRolls.length > 1 && (
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                        Main Result (out of {displayRolls.length})
                      </p>
                    )}
                  </div>

                  {showTotal && displayRolls.length > 0 && (
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                        Total
                      </p>
                      <p className="text-5xl font-black text-primary tracking-tighter">
                        {calculateTotal(displayRolls)}
                      </p>
                    </div>
                  )}

                  {results.length > 0 && !isRolling && (
                    <button
                      onClick={handleCopyResults}
                      className="bg-white border border-gray-200 text-gray-700 font-bold px-6 py-2.5 rounded-xl shadow-sm hover:shadow-md transition-all text-sm"
                    >
                      {copied === "results" ? "✓ Copied" : "📋 Copy Results"}
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Dice Grid */}
            {displayRolls.length > 0 && (
              <div className="bg-white p-6 max-h-[300px] overflow-y-auto custom-scrollbar">
                <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2">
                  {displayRolls.map((roll, i) => (
                    <div
                      key={i}
                      className="aspect-square bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-lg flex items-center justify-center text-sm font-black text-primary hover:bg-primary/10 hover:border-primary/40 transition-all cursor-default"
                      title={`Roll ${i + 1}`}
                    >
                      {roll}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <DiceRollerSEOContent />
      <RelatedTools
        currentTool="dice-roller"
        tools={["decision-wheel", "random-number-generator", "random-name-picker"]}
      />
    </div>
  );
}
