"use client";

/* A labelled number input with an optional prefix ($, €) or suffix (%, years),
   used by the finance calculators. The value stays a string so people can
   clear the box and type freely. */
export default function NumberField({
  id,
  label,
  value,
  onChange,
  prefix,
  suffix,
  step = "any",
  min = "0",
  max,
  hint,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  prefix?: string;
  suffix?: string;
  step?: string;
  min?: string;
  max?: string;
  hint?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="relative">
        {prefix && (
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 text-sm pointer-events-none">{prefix}</span>
        )}
        <input
          id={id}
          type="number"
          inputMode="decimal"
          step={step}
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={prefix ? { paddingLeft: `${1.1 + prefix.length * 0.55}rem` } : undefined}
          className={`w-full rounded-lg border border-gray-300 bg-white py-2 ${prefix ? "" : "pl-3"} ${suffix ? "pr-14" : "pr-3"} text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#058554]`}
        />
        {suffix && (
          <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 text-sm pointer-events-none">{suffix}</span>
        )}
      </div>
      {hint && <p className="text-xs text-gray-500 mt-1">{hint}</p>}
    </div>
  );
}

/* "" or anything unparsable counts as 0; negative numbers are not allowed. */
export function num(value: string): number {
  const n = parseFloat(value);
  return Number.isFinite(n) && n > 0 ? n : 0;
}
