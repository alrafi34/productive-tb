"use client";

import { useState, useRef, useEffect } from "react";
import { Box, Connection, FlowchartState, createBox, createConnection, getBoxCenter, isPointInBox, exportAsJSON, importFromJSON } from "./logic";
import FlowchartSEOContent from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function FlowchartLogicMapperUI() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [state, setState] = useState<FlowchartState>({
    boxes: [],
    connections: [],
    selectedBoxIds: new Set<string>(),
    history: [],
    historyIndex: -1
  });

  const [mode, setMode] = useState<"select" | "draw" | "connect">("select");
  const [connecting, setConnecting] = useState<string | null>(null);
  const [draggingBox, setDraggingBox] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [boxTitle, setBoxTitle] = useState("");
  const [boxColor, setBoxColor] = useState("#3b82f6");
  const [boxShape, setBoxShape] = useState<"rectangle" | "rounded" | "diamond">("rounded");
  const [snapToGrid, setSnapToGrid] = useState(true);
  const [copied, setCopied] = useState("");

  const GRID_SIZE = 20;
  const COLORS = ["#3b82f6", "#ef4444", "#10b981", "#f59e0b", "#8b5cf6", "#ec4899", "#06b6d4", "#6366f1"];

  const saveHistory = (newState: FlowchartState) => {
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

  const addBox = () => {
    if (!boxTitle.trim()) return;
    const newBox = createBox(boxTitle, 100 + Math.random() * 200, 100 + Math.random() * 200);
    newBox.color = boxColor;
    newBox.shape = boxShape;
    const newState = { ...state, boxes: [...state.boxes, newBox], selectedBoxIds: new Set([newBox.id]) };
    saveHistory(newState);
    setBoxTitle("");
  };

  const deleteBox = (id: string) => {
    const newState = {
      ...state,
      boxes: state.boxes.filter(b => b.id !== id),
      connections: state.connections.filter(c => c.fromId !== id && c.toId !== id),
      selectedBoxIds: new Set([...state.selectedBoxIds].filter(sid => sid !== id))
    };
    saveHistory(newState);
  };

  const deleteConnection = (id: string) => {
    const newState = { ...state, connections: state.connections.filter(c => c.id !== id) };
    saveHistory(newState);
  };

  const updateBox = (id: string, updates: Partial<Box>) => {
    const newState = {
      ...state,
      boxes: state.boxes.map(b => b.id === id ? { ...b, ...updates } : b)
    };
    saveHistory(newState);
  };

  const startConnect = (fromId: string) => {
    setConnecting(fromId);
    setMode("connect");
  };

  const finishConnect = (toId: string) => {
    if (connecting && connecting !== toId) {
      const newConnection = createConnection(connecting, toId);
      const newState = { ...state, connections: [...state.connections, newConnection] };
      saveHistory(newState);
    }
    setConnecting(null);
    setMode("select");
  };

  const clearCanvas = () => {
    if (confirm("Clear all boxes and connections?")) {
      const newState: FlowchartState = { boxes: [], connections: [], selectedBoxIds: new Set(), history: [], historyIndex: -1 };
      setState(newState);
    }
  };

  const exportPNG = () => {
    if (!canvasRef.current) return;
    const link = document.createElement("a");
    link.href = canvasRef.current.toDataURL("image/png");
    link.download = "flowchart.png";
    link.click();
  };

  const exportSVG = () => {
    let svg = `<svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">`;
    svg += `<rect width="800" height="600" fill="white"/>`;
    
    state.connections.forEach(conn => {
      const from = state.boxes.find(b => b.id === conn.fromId);
      const to = state.boxes.find(b => b.id === conn.toId);
      if (from && to) {
        const f = getBoxCenter(from);
        const t = getBoxCenter(to);
        svg += `<line x1="${f.x}" y1="${f.y}" x2="${t.x}" y2="${t.y}" stroke="black" stroke-width="2"/>`;
      }
    });

    state.boxes.forEach(box => {
      if (box.shape === "diamond") {
        svg += `<polygon points="${box.x + box.width/2},${box.y} ${box.x + box.width},${box.y + box.height/2} ${box.x + box.width/2},${box.y + box.height} ${box.x},${box.y + box.height/2}" fill="${box.color}" stroke="black" stroke-width="2"/>`;
      } else {
        const rx = box.shape === "rounded" ? 8 : 0;
        svg += `<rect x="${box.x}" y="${box.y}" width="${box.width}" height="${box.height}" rx="${rx}" fill="${box.color}" stroke="black" stroke-width="2"/>`;
      }
      svg += `<text x="${box.x + box.width/2}" y="${box.y + box.height/2}" text-anchor="middle" dy="0.3em" font-size="12" fill="white">${box.title}</text>`;
    });

    svg += `</svg>`;
    const link = document.createElement("a");
    link.href = `data:image/svg+xml;base64,${btoa(svg)}`;
    link.download = "flowchart.svg";
    link.click();
  };

  const exportJSON = () => {
    const json = exportAsJSON(state);
    const link = document.createElement("a");
    link.href = `data:application/json;base64,${btoa(json)}`;
    link.download = "flowchart.json";
    link.click();
  };

  const saveToStorage = () => {
    localStorage.setItem("flowchart", exportAsJSON(state));
    setCopied("saved");
    setTimeout(() => setCopied(""), 2000);
  };

  const loadFromStorage = () => {
    const data = localStorage.getItem("flowchart");
    if (data) {
      const imported = importFromJSON(data);
      if (imported) {
        const newState = { ...state, boxes: imported.boxes, connections: imported.connections };
        saveHistory(newState);
      }
    }
  };

  const handleCanvasMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left - pan.x) / zoom;
    const y = (e.clientY - rect.top - pan.y) / zoom;

    const clickedBox = state.boxes.find(b => isPointInBox(x, y, b));

    if (mode === "connect" && clickedBox) {
      finishConnect(clickedBox.id);
      return;
    }

    if (clickedBox) {
      if (e.ctrlKey || e.metaKey) {
        const newSelected = new Set(state.selectedBoxIds);
        if (newSelected.has(clickedBox.id)) {
          newSelected.delete(clickedBox.id);
        } else {
          newSelected.add(clickedBox.id);
        }
        setState({ ...state, selectedBoxIds: newSelected });
      } else {
        setState({ ...state, selectedBoxIds: new Set([clickedBox.id]) });
      }
      setDraggingBox(clickedBox.id);
      setDragOffset({ x: x - clickedBox.x, y: y - clickedBox.y });
    } else {
      setState({ ...state, selectedBoxIds: new Set() });
    }
  };

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - pan.x) / zoom;
    const y = (e.clientY - rect.top - pan.y) / zoom;

    if (draggingBox) {
      const newX = snapToGrid ? Math.round((x - dragOffset.x) / GRID_SIZE) * GRID_SIZE : x - dragOffset.x;
      const newY = snapToGrid ? Math.round((y - dragOffset.y) / GRID_SIZE) * GRID_SIZE : y - dragOffset.y;
      
      state.selectedBoxIds.forEach(id => {
        const box = state.boxes.find(b => b.id === id);
        if (box) {
          updateBox(id, { x: newX, y: newY });
        }
      });
    }
  };

  const handleCanvasMouseUp = () => {
    setDraggingBox(null);
  };

  const handleCanvasWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    setZoom(Math.max(0.5, Math.min(3, zoom * delta)));
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "#f9fafb";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.translate(pan.x, pan.y);
    ctx.scale(zoom, zoom);

    if (snapToGrid) {
      ctx.strokeStyle = "#e5e7eb";
      ctx.lineWidth = 0.5;
      for (let i = 0; i < canvas.width / zoom; i += GRID_SIZE) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height / zoom);
        ctx.stroke();
      }
      for (let i = 0; i < canvas.height / zoom; i += GRID_SIZE) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width / zoom, i);
        ctx.stroke();
      }
    }

    state.connections.forEach(conn => {
      const from = state.boxes.find(b => b.id === conn.fromId);
      const to = state.boxes.find(b => b.id === conn.toId);
      if (from && to) {
        const f = getBoxCenter(from);
        const t = getBoxCenter(to);
        ctx.strokeStyle = "#6b7280";
        ctx.lineWidth = 2;
        ctx.setLineDash(conn.style === "dashed" ? [5, 5] : []);
        ctx.beginPath();
        ctx.moveTo(f.x, f.y);
        ctx.lineTo(t.x, t.y);
        ctx.stroke();
        ctx.setLineDash([]);

        const angle = Math.atan2(t.y - f.y, t.x - f.x);
        const arrowSize = 10;
        ctx.fillStyle = "#6b7280";
        ctx.beginPath();
        ctx.moveTo(t.x, t.y);
        ctx.lineTo(t.x - arrowSize * Math.cos(angle - Math.PI / 6), t.y - arrowSize * Math.sin(angle - Math.PI / 6));
        ctx.lineTo(t.x - arrowSize * Math.cos(angle + Math.PI / 6), t.y - arrowSize * Math.sin(angle + Math.PI / 6));
        ctx.fill();

        if (conn.label) {
          const mid = { x: (f.x + t.x) / 2, y: (f.y + t.y) / 2 };
          ctx.fillStyle = "white";
          ctx.fillRect(mid.x - 20, mid.y - 10, 40, 20);
          ctx.fillStyle = "#000";
          ctx.font = "12px sans-serif";
          ctx.textAlign = "center";
          ctx.fillText(conn.label, mid.x, mid.y + 4);
        }
      }
    });

    state.boxes.forEach(box => {
      const isSelected = state.selectedBoxIds.has(box.id);
      ctx.fillStyle = box.color;
      ctx.strokeStyle = isSelected ? "#000" : "#d1d5db";
      ctx.lineWidth = isSelected ? 3 : 2;

      if (box.shape === "diamond") {
        ctx.beginPath();
        ctx.moveTo(box.x + box.width / 2, box.y);
        ctx.lineTo(box.x + box.width, box.y + box.height / 2);
        ctx.lineTo(box.x + box.width / 2, box.y + box.height);
        ctx.lineTo(box.x, box.y + box.height / 2);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      } else {
        const rx = box.shape === "rounded" ? 8 : 0;
        ctx.beginPath();
        ctx.roundRect(box.x, box.y, box.width, box.height, rx);
        ctx.fill();
        ctx.stroke();
      }

      ctx.fillStyle = "#fff";
      ctx.font = "bold 14px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      const words = box.title.split(" ");
      const lineHeight = 16;
      const startY = box.y + box.height / 2 - (words.length - 1) * lineHeight / 2;
      words.forEach((word, i) => {
        ctx.fillText(word, box.x + box.width / 2, startY + i * lineHeight);
      });
    });

    if (connecting) {
      const fromBox = state.boxes.find(b => b.id === connecting);
      if (fromBox) {
        const from = getBoxCenter(fromBox);
        ctx.strokeStyle = "#3b82f6";
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(state.boxes[0]?.x || 0, state.boxes[0]?.y || 0);
        ctx.stroke();
        ctx.setLineDash([]);
      }
    }

    ctx.restore();
  }, [state, zoom, pan, snapToGrid, connecting]);

  return (
    <>
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 mb-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Box Title</label>
              <input
                type="text"
                value={boxTitle}
                onChange={(e) => setBoxTitle(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addBox()}
                placeholder="Enter box title"
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Color</label>
              <div className="flex gap-1">
                {COLORS.map(color => (
                  <button
                    key={color}
                    onClick={() => setBoxColor(color)}
                    className={`w-8 h-8 rounded-lg border-2 ${boxColor === color ? "border-gray-800" : "border-gray-200"}`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Shape</label>
              <select
                value={boxShape}
                onChange={(e) => setBoxShape(e.target.value as any)}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="rectangle">Rectangle</option>
                <option value="rounded">Rounded</option>
                <option value="diamond">Diamond</option>
              </select>
            </div>
            <div className="flex items-end">
              <button
                onClick={addBox}
                className="w-full bg-primary hover:bg-primary-hover text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
              >
                ➕ Add Box
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <button onClick={() => setMode("select")} className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${mode === "select" ? "bg-primary text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
              Select
            </button>
            <button onClick={() => setMode("connect")} className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${mode === "connect" ? "bg-primary text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
              Connect
            </button>
            <button onClick={undo} disabled={state.historyIndex <= 0} className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50">
              ↶ Undo
            </button>
            <button onClick={redo} disabled={state.historyIndex >= state.history.length - 1} className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50">
              ↷ Redo
            </button>
            <button onClick={() => setZoom(1)} className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200">
              🔍 Reset Zoom
            </button>
            <button onClick={() => setSnapToGrid(!snapToGrid)} className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${snapToGrid ? "bg-primary text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
              📐 Grid
            </button>
            <button onClick={clearCanvas} className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-100 text-red-700 hover:bg-red-200">
              🗑️ Clear
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 mb-4">
          <canvas
            ref={canvasRef}
            width={800}
            height={500}
            onMouseDown={handleCanvasMouseDown}
            onMouseMove={handleCanvasMouseMove}
            onMouseUp={handleCanvasMouseUp}
            onWheel={handleCanvasWheel}
            className="w-full border border-gray-200 rounded-lg cursor-move bg-gray-50"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <h3 className="text-sm font-semibold text-gray-800 mb-3">Boxes ({state.boxes.length})</h3>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {state.boxes.map(box => (
                <div key={box.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded" style={{ backgroundColor: box.color }} />
                    <span className="text-xs text-gray-700">{box.title}</span>
                  </div>
                  <button onClick={() => deleteBox(box.id)} className="text-xs text-red-600 hover:text-red-800">
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <h3 className="text-sm font-semibold text-gray-800 mb-3">Connections ({state.connections.length})</h3>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {state.connections.map(conn => {
                const from = state.boxes.find(b => b.id === conn.fromId);
                const to = state.boxes.find(b => b.id === conn.toId);
                return (
                  <div key={conn.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                    <span className="text-xs text-gray-700">{from?.title} → {to?.title}</span>
                    <button onClick={() => deleteConnection(conn.id)} className="text-xs text-red-600 hover:text-red-800">
                      ✕
                    </button>
                  </div>
                );
              })}
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
            <button onClick={exportJSON} className="px-4 py-2 bg-primary hover:bg-primary-hover text-white text-sm font-semibold rounded-lg transition-colors">
              📥 Export JSON
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

      <FlowchartSEOContent />
      <RelatedTools currentTool="flowchart-logic-mapper" tools={["mind-map-builder", "timeline-creator", "venn-diagram-maker"]} />
    </>
  );
}
