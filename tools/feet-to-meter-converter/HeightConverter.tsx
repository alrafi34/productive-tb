"use client";

import { useState } from "react";
import { formatNumber } from "@/components/UnitConverter";

/* Height in feet and inches ↔ meters and centimeters. */
export default function HeightConverter() {
  const [feet, setFeet] = useState("5");
  const [inches, setInches] = useState("7");
  const [cm, setCm] = useState("");

  const ft = parseFloat(feet) || 0;
  const inch = parseFloat(inches) || 0;
  const cmTyped = parseFloat(cm);
  const fromCm = cm.trim() !== "" && !isNaN(cmTyped);

  // Total inches, from whichever side was typed last
  const totalInches = fromCm ? cmTyped / 2.54 : ft * 12 + inch;
  const meters = totalInches * 0.0254;
  const wholeFeet = Math.floor(totalInches / 12 + 1e-9);
  const restInches = totalInches - wholeFeet * 12;

  const box = "w-full px-3 py-3 bg-gray-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-primary focus:bg-white text-xl font-bold text-gray-900";

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 mb-8 space-y-4">
      <h2 className="text-lg font-bold text-gray-900">Height in feet and inches</h2>
      <div className="grid grid-cols-3 gap-3 items-end">
        <label className="space-y-1 text-sm font-semibold text-gray-700">
          Feet
          <input type="number" inputMode="decimal" min="0" value={fromCm ? String(wholeFeet) : feet}
            onChange={(e) => { setFeet(e.target.value); setCm(""); if (fromCm) setInches(String(Number(restInches.toFixed(2)))); }} className={box} />
        </label>
        <label className="space-y-1 text-sm font-semibold text-gray-700">
          Inches
          <input type="number" inputMode="decimal" min="0" value={fromCm ? String(Number(restInches.toFixed(2))) : inches}
            onChange={(e) => { setInches(e.target.value); setCm(""); if (fromCm) setFeet(String(wholeFeet)); }} className={box} />
        </label>
        <label className="space-y-1 text-sm font-semibold text-gray-700">
          Centimeters
          <input type="number" inputMode="decimal" min="0" value={fromCm ? cm : String(Number((totalInches * 2.54).toFixed(2)))}
            onChange={(e) => setCm(e.target.value)} className={box} />
        </label>
      </div>
      <p className="text-2xl font-black text-gray-900" style={{ fontFamily: "var(--font-heading)" }}>
        {wholeFeet} ft {formatNumber(restInches, 2)} in = {formatNumber(meters, 3)} m = {formatNumber(totalInches * 2.54, 2)} cm
      </p>
      <p className="text-sm font-mono text-gray-600">
        ({wholeFeet} × 12 + {formatNumber(restInches, 2)}) in × 0.0254 = {formatNumber(meters, 4)} m
      </p>
    </div>
  );
}
