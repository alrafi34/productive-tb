"use client";

import { useState, useRef, useEffect } from "react";
import { Circle, VennState, createCircle, isPointInCircle, getCircleIntersectionPoint, circlesOverlap, exportAsJSON, importFromJSON } from "./logic";
import VennDiagramSEOContent from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

const CIRCLE_LABELS = ["A", "B", "C"];
const DEFAULT_COLORS = ["#3b82f6", "#ef4444", "#10b981"];

export default function VennDiagramMakerUI() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [state, setState] = useState<VennState>({
    circles: [
      createCircle(200, 250, "A"),
      createCircle(400, 250, "B")
    ],
    intersectionLabels: {},
    selectedCircleId: null,
    history: [],
    historyIndex: -1,
    theme: "light"
  });

  const [circleCount, setCircleCount] = useState(2);
  const [draggingCircleId, setDraggingCircleId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [copied, setCopied] = useState("");

  const saveHistory = (newState: VennState) => {
    const newHistory = state.history.slice(0, state.historyIndex + 1);
    newHistory.push(newState);
    setState({ ...newState, history: newHistory, historyIndex: newHistory.length - 1 });
  };

  const undo = () => {
    if (state.historyIndex > 0) {
      const newIndex = state.historyIndex - 1;
      const prevState = state.history[newIndex];
      setState({ ...prevState, historyIndex: newIndex });
    }
  };

  const redo = () => {
    if (state.historyIndex < state.history.length - 1) {
      const newIndex = state.historyIndex + 1;
      const nextState = state.history[newIndex];
      setState({ ...nextState, historyIndex: newIndex });
    }
  };

  const addCircle = () => {
    if (state.circles.length < 3) {
      const newCircle = createCircle(300 + state.circles.length * 100, 250, CIRCLE_LABELS[state.circles.length]);
      newCircle.color = DEFAULT_COLORS[state.circles.length];
      const newState = { ...state, circles: [...state.circles, newCircle] };
      saveHistory(newState);
      setCircleCount(state.circles.length + 1);
    }
  };

  const removeCircle = (id: string) => {
    const newState = {
      ...state,
      circles: state.circles.filter(c => c.id !== id),
      selectedCircleId: state.selectedCircleId === id ? null : state.selectedCircleId
    };
    saveHistory(newState);
    setCircleCount(newState.circles.length);
  };

  const updateCircle = (id: string, updates: Partial<Circle>) => {
    const newState = {
      ...state,
      circles: state.circles.map(c => c.id === id ? { ...c, ...updates } : c)
    };
    saveHistory(newState);
  };

  const updateIntersectionLabel = (key: string, label: string) => {
    const newState = {
      ...state,
      intersectionLabels: { ...state.intersectionLabels, [key]: label }
    };
    saveHistory(newState);
  };

  const resetDiagram = () => {
    if (confirm("Reset all circles and labels?")) {
      const newState: VennState = {
        circles: [
          createCircle(200, 250, "A"),
          createCircle(400, 250, "B")
        ],
        intersectionLabels: {},
        selectedCircleId: null,
        history: [],
        historyIndex: -1,
        theme: state.theme
      };
      setState(newState);
      setCircleCount(2);
    }
  };

  const exportPNG = () => {
    if (!canvasRef.current) return;
    const link = document.createElement("a");
    link.href = canvasRef.current.toDataURL("image/png");
    link.download = "venn-diagram.png";
    link.click();
  };

  const exportSVG = () => {
    let svg = `<svg width="600" height="500" xmlns="http://www.w3.org/2000/svg">`;
    svg += `<rect width="600" height="500" fill="${state.theme === "dark" ? "#1f2937" : "#ffffff"}"/>`;
    
    state.circles.forEach(circle => {
      svg += `<circle cx="${circle.x}" cy="${circle.y}" r="${circle.radius}" fill="${circle.color}" fill-opacity="${circle.opacity}" stroke="black" stroke-width="2"/>`;
      svg += `<text x="${circle.x}" y="${circle.y + 5}" text-anchor="middle" font-size="16" font-weight="bold" fill="black">${circle.label}</text>`;
    });

    Object.entries(state.intersectionLabels).forEach(([key, label]) => {
      const parts = key.split("-");
      if (parts.length === 2) {
        const c1 = state.circles.find(c => c.id === parts[0]);
        const c2 = state.circles.find(c => c.id === parts[1]);
        if (c1 && c2) {
          const midX = (c1.x + c2.x) / 2;
          const midY = (c1.y + c2.y) / 2;
          svg += `<text x="${midX}" y="${midY}" text-anchor="middle" font-size="12" fill="black">${label}</text>`;
        }
      }
    });

    svg += `</svg>`;
    const link = document.createElement("a");
    link.href = `data:image/svg+xml;base64,${btoa(svg)}`;
    link.download = "venn-diagram.svg";
    link.click();
  };

  const saveToStorage = () => {
    localStorage.setItem("venn-diagram", exportAsJSON(state));
    setCopied("saved");
    setTimeout(() => setCopied(""), 2000);
  };

  const loadFromStorage = () => {
    const data = localStorage.getItem("venn-diagram");
    if (data) {
      const imported = importFromJSON(data);
      if (imported) {
        const newState: VennState = {
          ...state,
          circles: imported.circles,
          intersectionLabels: imported.intersectionLabels
        };
        setState(newState);
        setCircleCount(imported.circles.length);
      }
    }
  };

  const handleCanvasMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const clickedCircle = state.circles.find(c => isPointInCircle(x, y, c));
    if (clickedCircle) {
      setState({ ...state, selectedCircleId: clickedCircle.id });
      setDraggingCircleId(clickedCircle.id);
      setDragOffset({ x: x - clickedCircle.x, y: y - clickedCircle.y });
    } else {
      setState({ ...state, selectedCircleId: null });
    }
  };

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!draggingCircleId || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newX = x - dragOffset.x;
    const newY = y - dragOffset.y;

    updateCircle(draggingCircleId, { x: newX, y: newY });
  };

  const handleCanvasMouseUp = () => {
    setDraggingCircleId(null);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const bgColor = state.theme === "dark" ? "#1f2937" : "#f9fafb";
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = state.theme === "dark" ? "#374151" : "#e5e7eb";
    ctx.lineWidth = 1;
    for (let i = 0; i < canvas.width; i += 20) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, canvas.height);
      ctx.stroke();
    }
    for (let i = 0; i < canvas.height; i += 20) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(canvas.width, i);
      ctx.stroke();
    }

    state.circles.forEach(circle => {
      ctx.fillStyle = circle.color;
      ctx.globalAlpha = circle.opacity;
      ctx.beginPath();
      ctx.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI);
      ctx.fill();
      ctx.globalAlpha = 1;

      const isSelected = state.selectedCircleId === circle.id;
      ctx.strokeStyle = isSelected ? "#000" : "#666";
      ctx.lineWidth = isSelected ? 3 : 2;
      ctx.beginPath();
      ctx.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI);
      ctx.stroke();

      ctx.fillStyle = state.theme === "dark" ? "#fff" : "#000";
      ctx.font = "bold 16px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(circle.label, circle.x, circle.y);
    });

    Object.entries(state.intersectionLabels).forEach(([key, label]) => {
      const parts = key.split("-");
      if (parts.length === 2) {
        const c1 = state.circles.find(c => c.id === parts[0]);
        const c2 = state.circles.find(c => c.id === parts[1]);
        if (c1 && c2 && circlesOverlap(c1, c2)) {
          const midX = (c1.x + c2.x) / 2;
          const midY = (c1.y + c2.y) / 2;
          ctx.fillStyle = state.theme === "dark" ? "#fff" : "#000";
          ctx.font = "12px sans-serif";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(label, midX, midY);
        }
      }
    });
  }, [state, draggingCircleId]);

  return (
    <>
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 mb-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">Number of Circles</label>
              <select
                value={circleCount}
                onChange={(e) => {
                  const count = parseInt(e.target.value);
                  if (count > state.circles.length) {
                    addCircle();
                  } else if (count < state.circles.length) {
                    removeCircle(state.circles[state.circles.length - 1].id);
                  }
                }}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value={2}>2 Circles</option>
                <option value={3}>3 Circles</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">Theme</label>
              <select
                value={state.theme}
                onChange={(e) => setState({ ...state, theme: e.target.value as "light" | "dark" })}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </div>
            <div className="flex items-end">
              <button
                onClick={resetDiagram}
                className="w-full bg-red-100 hover:bg-red-200 text-red-700 text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
              >
                🔄 Reset
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <button onClick={undo} disabled={state.historyIndex <= 0} className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50">
              ↶ Undo
            </button>
            <button onClick={redo} disabled={state.historyIndex >= state.history.length - 1} className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50">
              ↷ Redo
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 mb-4">
          <canvas
            ref={canvasRef}
            width={600}
            height={500}
            onMouseDown={handleCanvasMouseDown}
            onMouseMove={handleCanvasMouseMove}
            onMouseUp={handleCanvasMouseUp}
            onMouseLeave={handleCanvasMouseUp}
            className="w-full border border-gray-200 rounded-lg cursor-move bg-gray-50"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <h3 className="text-sm font-semibold text-gray-800 mb-3">Circle Settings</h3>
            <div className="space-y-3">
              {state.circles.map((circle, idx) => (
                <div key={circle.id} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-medium text-gray-700">Circle {circle.label}</label>
                    {state.circles.length > 2 && (
                      <button onClick={() => removeCircle(circle.id)} className="text-xs text-red-600 hover:text-red-800">
                        ✕
                      </button>
                    )}
                  </div>
                  <div className="space-y-2">
                    <div>
                      <label className="text-xs text-gray-600">Label</label>
                      <input
                        type="text"
                        value={circle.label}
                        onChange={(e) => updateCircle(circle.id, { label: e.target.value })}
                        className="w-full rounded-lg border border-gray-200 px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div className="flex gap-2">
                      <div className="flex-1">
                        <label className="text-xs text-gray-600">Color</label>
                        <input
                          type="color"
                          value={circle.color}
                          onChange={(e) => updateCircle(circle.id, { color: e.target.value })}
                          className="w-full h-8 rounded-lg cursor-pointer border border-gray-200"
                        />
                      </div>
                      <div className="flex-1">
                        <label className="text-xs text-gray-600">Opacity</label>
                        <input
                          type="range"
                          min="0.1"
                          max="1"
                          step="0.1"
                          value={circle.opacity}
                          onChange={(e) => updateCircle(circle.id, { opacity: parseFloat(e.target.value) })}
                          className="w-full"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs text-gray-600">Radius: {circle.radius}px</label>
                      <input
                        type="range"
                        min="30"
                        max="150"
                        value={circle.radius}
                        onChange={(e) => updateCircle(circle.id, { radius: parseInt(e.target.value) })}
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <h3 className="text-sm font-semibold text-gray-800 mb-3">Intersection Labels</h3>
            <div className="space-y-3">
              {state.circles.length >= 2 && (
                <div className="p-3 bg-gray-50 rounded-lg">
                  <label className="text-xs font-medium text-gray-700 mb-1 block">
                    {state.circles[0].label} ∩ {state.circles[1].label}
                  </label>
                  <input
                    type="text"
                    value={state.intersectionLabels[`${state.circles[0].id}-${state.circles[1].id}`] || ""}
                    onChange={(e) => updateIntersectionLabel(`${state.circles[0].id}-${state.circles[1].id}`, e.target.value)}
                    placeholder="Enter intersection label"
                    className="w-full rounded-lg border border-gray-200 px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              )}
              {state.circles.length === 3 && (
                <>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <label className="text-xs font-medium text-gray-700 mb-1 block">
                      {state.circles[0].label} ∩ {state.circles[2].label}
                    </label>
                    <input
                      type="text"
                      value={state.intersectionLabels[`${state.circles[0].id}-${state.circles[2].id}`] || ""}
                      onChange={(e) => updateIntersectionLabel(`${state.circles[0].id}-${state.circles[2].id}`, e.target.value)}
                      placeholder="Enter intersection label"
                      className="w-full rounded-lg border border-gray-200 px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <label className="text-xs font-medium text-gray-700 mb-1 block">
                      {state.circles[1].label} ∩ {state.circles[2].label}
                    </label>
                    <input
                      type="text"
                      value={state.intersectionLabels[`${state.circles[1].id}-${state.circles[2].id}`] || ""}
                      onChange={(e) => updateIntersectionLabel(`${state.circles[1].id}-${state.circles[2].id}`, e.target.value)}
                      placeholder="Enter intersection label"
                      className="w-full rounded-lg border border-gray-200 px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <label className="text-xs font-medium text-gray-700 mb-1 block">
                      {state.circles[0].label} ∩ {state.circles[1].label} ∩ {state.circles[2].label}
                    </label>
                    <input
                      type="text"
                      value={state.intersectionLabels[`${state.circles[0].id}-${state.circles[1].id}-${state.circles[2].id}`] || ""}
                      onChange={(e) => updateIntersectionLabel(`${state.circles[0].id}-${state.circles[1].id}-${state.circles[2].id}`, e.target.value)}
                      placeholder="Enter center label"
                      className="w-full rounded-lg border border-gray-200 px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
          <h3 className="text-sm font-semibold text-gray-800 mb-3">Export & Save</h3>
          <div className="flex flex-wrap gap-2">
            <button onClick={exportPNG} className="px-4 py-2 bg-primary hover:bg-primary-hover text-white text-sm font-semibold rounded-lg transition-colors">
              📥 Export PNG
            </button>
            <button onClick={exportSVG} className="px-4 py-2 bg-primary hover:bg-primary-hover text-white text-sm font-semibold rounded-lg transition-colors">
              📥 Export SVG
            </button>
            <button onClick={saveToStorage} className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-lg transition-colors">
              {copied === "saved" ? "✓ Saved" : "💾 Save"}
            </button>
            <button onClick={loadFromStorage} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors">
              📂 Load
            </button>
          </div>
        </div>
      </div>

      <VennDiagramSEOContent />
      <RelatedTools currentTool="venn-diagram-maker" tools={["flowchart-logic-mapper", "mind-map-builder", "timeline-creator"]} />
    </>
  );
}
