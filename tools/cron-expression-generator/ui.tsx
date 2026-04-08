"use client";

import { useState, useEffect, useCallback } from "react";
import {
  CronState,
  buildCronExpression,
  parseCronExpression,
  validateCronExpression,
  generateHumanDescription,
  copyToClipboard,
  downloadCronSchedule,
  CRON_PRESETS,
  MINUTE_OPTIONS,
  HOUR_OPTIONS,
  DAY_OF_MONTH_OPTIONS,
  MONTH_OPTIONS,
  DAY_OF_WEEK_OPTIONS
} from "./logic";
import CronExpressionGeneratorSEOContent from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function CronExpressionGeneratorUI() {
  const [cronState, setCronState] = useState<CronState>({
    minute: "*",
    hour: "*",
    dayOfMonth: "*",
    month: "*",
    dayOfWeek: "*"
  });
  
  const [customValues, setCustomValues] = useState({
    minute: "0",
    hour: "0",
    dayOfMonth: "1"
  });
  
  const [inputExpression, setInputExpression] = useState("");
  const [copied, setCopied] = useState<string | null>(null);
  const [showPresets, setShowPresets] = useState(false);

  const cronExpression = buildCronExpression(cronState);
  const description = generateHumanDescription(cronState);
  const validation = validateCronExpression(cronExpression);

  const handleCopy = useCallback(async (text: string, type: string) => {
    try {
      await copyToClipboard(text);
      setCopied(type);
      setTimeout(() => setCopied(null), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  }, []);

  const handleFieldChange = (field: keyof CronState, value: string) => {
    if (value === "custom") {
      setCronState(prev => ({
        ...prev,
        [field]: customValues[field as keyof typeof customValues] || "0"
      }));
    } else {
      setCronState(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleCustomValueChange = (field: keyof typeof customValues, value: string) => {
    setCustomValues(prev => ({ ...prev, [field]: value }));
    setCronState(prev => ({ ...prev, [field]: value }));
  };

  const handlePresetSelect = (expression: string) => {
    const parsed = parseCronExpression(expression);
    if (parsed) {
      setCronState(parsed);
      setInputExpression(expression);
    }
    setShowPresets(false);
  };

  const handleInputExpressionChange = (value: string) => {
    setInputExpression(value);
    const parsed = parseCronExpression(value);
    if (parsed) {
      setCronState(parsed);
    }
  };

  const resetToDefault = () => {
    setCronState({
      minute: "*",
      hour: "*",
      dayOfMonth: "*",
      month: "*",
      dayOfWeek: "*"
    });
    setInputExpression("");
  };

  useEffect(() => {
    setInputExpression(cronExpression);
  }, [cronExpression]);

  return (
    <>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Input Expression */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Cron Expression</h2>
          <div className="space-y-4">
            <div>
              <input
                type="text"
                value={inputExpression}
                onChange={(e) => handleInputExpressionChange(e.target.value)}
                placeholder="* * * * *"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg font-mono text-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <p className="text-sm text-gray-500 mt-2">
                Format: minute hour day-of-month month day-of-week
              </p>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setShowPresets(!showPresets)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
              >
                📋 Presets
              </button>
              <button
                onClick={resetToDefault}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
              >
                🔄 Reset
              </button>
              <button
                onClick={() => handleCopy(cronExpression, "expression")}
                className="px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg text-sm font-medium transition-colors"
              >
                {copied === "expression" ? "✓ Copied" : "📋 Copy"}
              </button>
            </div>
          </div>
        </div>

        {/* Presets */}
        {showPresets && (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Common Presets</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {CRON_PRESETS.map((preset) => (
                <button
                  key={preset.expression}
                  onClick={() => handlePresetSelect(preset.expression)}
                  className="text-left p-3 border border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition-colors"
                >
                  <div className="font-medium text-gray-900">{preset.name}</div>
                  <div className="text-sm text-gray-500 font-mono">{preset.expression}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Visual Builder */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Visual Builder</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Minute */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Minute</label>
              <select
                value={MINUTE_OPTIONS.find(opt => opt.value === cronState.minute)?.value || "custom"}
                onChange={(e) => handleFieldChange("minute", e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
              >
                {MINUTE_OPTIONS.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
              {!MINUTE_OPTIONS.find(opt => opt.value === cronState.minute) && (
                <input
                  type="number"
                  min="0"
                  max="59"
                  value={cronState.minute}
                  onChange={(e) => handleCustomValueChange("minute", e.target.value)}
                  className="w-full mt-2 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                  placeholder="0-59"
                />
              )}
            </div>

            {/* Hour */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Hour</label>
              <select
                value={HOUR_OPTIONS.find(opt => opt.value === cronState.hour)?.value || "custom"}
                onChange={(e) => handleFieldChange("hour", e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
              >
                {HOUR_OPTIONS.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
              {!HOUR_OPTIONS.find(opt => opt.value === cronState.hour) && (
                <input
                  type="number"
                  min="0"
                  max="23"
                  value={cronState.hour}
                  onChange={(e) => handleCustomValueChange("hour", e.target.value)}
                  className="w-full mt-2 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                  placeholder="0-23"
                />
              )}
            </div>

            {/* Day of Month */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Day of Month</label>
              <select
                value={DAY_OF_MONTH_OPTIONS.find(opt => opt.value === cronState.dayOfMonth)?.value || "custom"}
                onChange={(e) => handleFieldChange("dayOfMonth", e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
              >
                {DAY_OF_MONTH_OPTIONS.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
              {!DAY_OF_MONTH_OPTIONS.find(opt => opt.value === cronState.dayOfMonth) && (
                <input
                  type="number"
                  min="1"
                  max="31"
                  value={cronState.dayOfMonth}
                  onChange={(e) => handleCustomValueChange("dayOfMonth", e.target.value)}
                  className="w-full mt-2 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                  placeholder="1-31"
                />
              )}
            </div>

            {/* Month */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Month</label>
              <select
                value={cronState.month}
                onChange={(e) => handleFieldChange("month", e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
              >
                {MONTH_OPTIONS.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>

            {/* Day of Week */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Day of Week</label>
              <select
                value={cronState.dayOfWeek}
                onChange={(e) => handleFieldChange("dayOfWeek", e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
              >
                {DAY_OF_WEEK_OPTIONS.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Output */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Generated Schedule</h2>
          
          {/* Validation Status */}
          <div className={`p-4 rounded-lg mb-4 ${validation.valid ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
            <div className="flex items-center gap-2">
              <span className="text-lg">{validation.valid ? "✅" : "❌"}</span>
              <span className={`font-medium ${validation.valid ? 'text-green-800' : 'text-red-800'}`}>
                {validation.valid ? "Valid Cron Expression" : "Invalid Expression"}
              </span>
            </div>
            {validation.error && (
              <p className="text-sm text-red-600 mt-1">{validation.error}</p>
            )}
          </div>

          {validation.valid && (
            <div className="space-y-4">
              {/* Expression */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Cron Expression</label>
                <div className="flex gap-2">
                  <code className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg font-mono text-lg">
                    {cronExpression}
                  </code>
                  <button
                    onClick={() => handleCopy(cronExpression, "expression")}
                    className="px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg text-sm font-medium transition-colors"
                  >
                    {copied === "expression" ? "✓" : "📋"}
                  </button>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Human Readable</label>
                <div className="flex gap-2">
                  <div className="flex-1 px-4 py-3 bg-blue-50 border border-blue-200 rounded-lg text-blue-900">
                    {description}
                  </div>
                  <button
                    onClick={() => handleCopy(description, "description")}
                    className="px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg text-sm font-medium transition-colors"
                  >
                    {copied === "description" ? "✓" : "📋"}
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => downloadCronSchedule(cronExpression, description)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
                >
                  💾 Download
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Field Reference */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Cron Field Reference</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 font-medium text-gray-700">Field</th>
                  <th className="text-left py-2 font-medium text-gray-700">Range</th>
                  <th className="text-left py-2 font-medium text-gray-700">Special Characters</th>
                  <th className="text-left py-2 font-medium text-gray-700">Examples</th>
                </tr>
              </thead>
              <tbody className="text-gray-600">
                <tr className="border-b border-gray-100">
                  <td className="py-2 font-medium">Minute</td>
                  <td className="py-2">0-59</td>
                  <td className="py-2">* , - /</td>
                  <td className="py-2">0, 15, */5, 10-30</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 font-medium">Hour</td>
                  <td className="py-2">0-23</td>
                  <td className="py-2">* , - /</td>
                  <td className="py-2">0, 12, */2, 9-17</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 font-medium">Day of Month</td>
                  <td className="py-2">1-31</td>
                  <td className="py-2">* , - /</td>
                  <td className="py-2">1, 15, */7, 1-15</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 font-medium">Month</td>
                  <td className="py-2">1-12</td>
                  <td className="py-2">* , - /</td>
                  <td className="py-2">1, 6, */3, 3-6</td>
                </tr>
                <tr>
                  <td className="py-2 font-medium">Day of Week</td>
                  <td className="py-2">0-6 (Sun-Sat)</td>
                  <td className="py-2">* , - /</td>
                  <td className="py-2">0, 1, 1-5, 6,0</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <CronExpressionGeneratorSEOContent />
      <RelatedTools
        currentTool="cron-expression-generator"
        tools={["timestamp-unix-converter", "time-zone-converter", "pomodoro-timer"]}
      />
    </>
  );
}