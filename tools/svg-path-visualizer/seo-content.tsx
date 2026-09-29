import ToolFaq from "@/components/ToolFaq";
import { toolConfig } from "./config";

// [command, parameters, meaning, example]
const COMMANDS: [string, string, string, string][] = [
  ["M / m", "x y", "Move the pen without drawing; starts every path", "M10 10"],
  ["L / l", "x y", "Straight line to a point", "L90 90"],
  ["H / h", "x", "Horizontal line", "H90"],
  ["V / v", "y", "Vertical line", "V90"],
  ["C / c", "x1 y1 x2 y2 x y", "Cubic Bézier curve with two control points", "C20 0, 80 0, 90 50"],
  ["S / s", "x2 y2 x y", "Smooth cubic curve; first control point mirrors the last one", "S150 100, 170 50"],
  ["Q / q", "x1 y1 x y", "Quadratic Bézier curve with one control point", "Q50 0 90 50"],
  ["T / t", "x y", "Smooth quadratic curve; control point is mirrored", "T170 50"],
  ["A / a", "rx ry rotation large-arc sweep x y", "Elliptical arc", "A40 40 0 1 0 90 50"],
  ["Z / z", "–", "Close the path with a line back to the start", "Z"],
];

export default function SVGPathVisualizerSEOContent() {
  // Same steps and questions as the HowTo / FAQPage schema
  const { howToSteps, faq } = toolConfig.seo;

  const card = "mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8";
  const h2 = "text-2xl font-semibold text-gray-900 mb-4";
  const th = "text-left py-2 px-3 font-semibold text-gray-700";

  return (
    <>
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>Reading SVG Path Data</h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>An SVG <code>&lt;path&gt;</code> draws its shape from the <code>d</code> attribute: a sequence of commands, each a single letter followed by numbers. Think of it as instructions to a pen: move here, draw a line there, curve through this point, close the shape.</p>
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4 font-mono text-sm text-gray-900 space-y-2">
            <p>&lt;path d=&quot;M10 10 H90 V90 H10 Z&quot; /&gt;</p>
            <p className="text-gray-500">move to (10,10) → right to x=90 → down to y=90 → left to x=10 → close</p>
          </div>
          <p>Coordinates are in the units of the SVG&apos;s <code>viewBox</code>, not pixels: <code>viewBox=&quot;0 0 100 100&quot;</code> means the drawing area runs from 0 to 100 in both directions, however large the image is displayed. Numbers can be separated by spaces or commas, and a minus sign also separates them, which is why exported icons often look like <code>l-5.2-3.1</code>.</p>
        </div>
      </section>

      <section className={card}>
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>SVG Path Commands Reference</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200"><th className={th}>Command</th><th className={th}>Parameters</th><th className={th}>What it does</th><th className={th}>Example</th></tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {COMMANDS.map(([cmd, params, meaning, ex]) => (
                <tr key={cmd} className="hover:bg-gray-50 align-top">
                  <td className="py-1.5 px-3 font-mono text-xs font-semibold text-gray-900 whitespace-nowrap">{cmd}</td>
                  <td className="py-1.5 px-3 font-mono text-xs text-gray-700">{params}</td>
                  <td className="py-1.5 px-3 text-xs text-gray-600">{meaning}</td>
                  <td className="py-1.5 px-3 font-mono text-xs text-gray-700 whitespace-nowrap">{ex}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-500 mt-4">Uppercase letters use absolute coordinates, lowercase letters are relative to the current point. After M, extra coordinate pairs are treated as L commands.</p>
      </section>

      <section className={card}>
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>How to Use the SVG Path Visualizer</h2>
        <ol className="space-y-3 text-gray-600 leading-relaxed">
          {howToSteps.map(({ name, text }, i) => (
            <li key={name} className="flex items-start">
              <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0 font-semibold">{i + 1}</span>
              <span><strong>{name}:</strong> {text}</span>
            </li>
          ))}
        </ol>
      </section>

      <ToolFaq items={faq} />
    </>
  );
}
