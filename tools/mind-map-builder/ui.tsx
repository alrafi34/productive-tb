"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  MindMapNode,
  MindMapConnection,
  MindMapState,
  createNode,
  createConnection,
  deleteNode,
  deleteConnection,
  updateNodePosition,
  updateNodeColor,
  updateNodeTitle,
  getNodeById,
  isNodeAtPosition,
  exportToJSON,
  importFromJSON,
  snapToGrid,
  COLORS,
} from "./logic";
import MindMapBuilderSEOContent from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function MindMapBuilderUI() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [state, setState] = useState<MindMapState>({ nodes: [], connections: [] });
  const [undoStack, setUndoStack] = useState<MindMapState[]>([]);
  const [redoStack, setRedoStack] = useState<MindMapState[]>([]);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [draggedNodeId, setDraggedNodeId] = useState<string | null>(null);
  const [connectingFromId, setConnectingFromId] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const [panX, setPanX] = useState(0);
  const [panY, setPanY] = useState(0);
  const [nodeTitle, setNodeTitle] = useState("");
  const [nodeColor, setNodeColor] = useState(COLORS[0]);
  const [snapToGridEnabled, setSnapToGridEnabled] = useState(false);
  const [copied, setCopied] = useState(false);

  const canvasWidth = 1000;
  const canvasHeight = 600;

  const saveToHistory = useCallback((newState: MindMapState) => {
    setState(newState);
    setUndoStack([...undoStack, state]);
    setRedoStack([]);
  }, [state, undoStack]);

  const handleUndo = () => {
    if (undoStack.length === 0) return;
    const newUndoStack = [...undoStack];
    const previousState = newUndoStack.pop()!;
    setRedoStack([...redoStack, state]);
    setState(previousState);
    setUndoStack(newUndoStack);
  };

  const handleRedo = () => {
    if (redoStack.length === 0) return;
    const newRedoStack = [...redoStack];
    const nextState = newRedoStack.pop()!;
    setUndoStack([...undoStack, state]);
    setState(nextState);
    setRedoStack(newRedoStack);
  };

  const handleAddNode = () => {
    if (!nodeTitle.trim()) return;
    const newNode = createNode(nodeTitle, canvasWidth / 2, canvasHeight / 2, nodeColor);
    const newState = { ...state, nodes: [...state.nodes, newNode] };
    saveToHistory(newState);
    setNodeTitle("");
  };

  const handleDeleteNode = () => {
    if (!selectedNodeId) return;
    const newState = deleteNode(state, selectedNodeId);
    saveToHistory(newState);
    setSelectedNodeId(null);
  };

  const handleConnectNodes = () => {
    if (!connectingFromId || !selectedNodeId || connectingFromId === selectedNodeId) return;
    const existingConnection = state.connections.find(
      c => (c.fromNodeId === connectingFromId && c.toNodeId === selectedNodeId) ||
           (c.fromNodeId === selectedNodeId && c.toNodeId === connectingFromId)
    );
    if (existingConnection) {
      setConnectingFromId(null);
      return;
    }
    const newConnection = createConnection(connectingFromId, selectedNodeId);
    const newState = { ...state, connections: [...state.connections, newConnection] };
    saveToHistory(newState);
    setConnectingFromId(null);
  };

  const handleClear = () => {
    if (confirm("Clear all nodes and connections?")) {
      saveToHistory({ nodes: [], connections: [] });
      setSelectedNodeId(null);
    }
  };

  const handleExportPNG = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "mind-map.png";
    link.click();
  };

  const handleExportSVG = () => {
    let svg = `<svg width="${canvasWidth}" height="${canvasHeight}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${canvasWidth}" height="${canvasHeight}" fill="white"/>`;

    state.connections.forEach(conn => {
      const fromNode = getNodeById(state, conn.fromNodeId);
      const toNode = getNodeById(state, conn.toNodeId);
      if (fromNode && toNode) {
        svg += `<line x1="${fromNode.x}" y1="${fromNode.y}" x2="${toNode.x}" y2="${toNode.y}" stroke="#999" stroke-width="2"/>`;
      }
    });

    state.nodes.forEach(node => {
      svg += `<circle cx="${node.x}" cy="${node.y}" r="${node.size}" fill="${node.color}" stroke="#333" stroke-width="2"/>`;
      svg += `<text x="${node.x}" y="${node.y}" text-anchor="middle" dy="0.3em" font-size="12" fill="white" font-weight="bold">${node.title}</text>`;
    });

    svg += `</svg>`;

    const link = document.createElement("a");
    link.href = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
    link.download = "mind-map.svg";
    link.click();
  };

  const handleExportJSON = () => {
    const json = exportToJSON(state);
    const link = document.createElement("a");
    link.href = `data:application/json;charset=utf-8,${encodeURIComponent(json)}`;
    link.download = "mind-map.json";
    link.click();
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const json = event.target?.result as string;
      const imported = importFromJSON(json);
      if (imported) {
        saveToHistory(imported);
      } else {
        alert("Invalid JSON format");
      }
    };
    reader.readAsText(file);
  };

  const handleCopyImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.toBlob((blob) => {
      if (blob) {
        navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    });
  };

  const handleCanvasMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left - panX) / zoom;
    const y = (e.clientY - rect.top - panY) / zoom;

    const node = isNodeAtPosition(state.nodes, x, y, 30);
    if (node) {
      if (connectingFromId) {
        setSelectedNodeId(node.id);
        handleConnectNodes();
      } else {
        setSelectedNodeId(node.id);
        setDraggedNodeId(node.id);
      }
    }
  };

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!draggedNodeId) return;
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left - panX) / zoom;
    const y = (e.clientY - rect.top - panY) / zoom;

    let newX = x;
    let newY = y;
    if (snapToGridEnabled) {
      newX = snapToGrid(x, 20);
      newY = snapToGrid(y, 20);
    }

    const newState = updateNodePosition(state, draggedNodeId, newX, newY);
    setState(newState);
  };

  const handleCanvasMouseUp = () => {
    setDraggedNodeId(null);
  };

  const handleCanvasWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    setZoom(Math.max(0.5, Math.min(3, zoom * delta)));
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.ctrlKey || e.metaKey) {
      if (e.key === "z") {
        e.preventDefault();
        handleUndo();
      } else if (e.key === "y") {
        e.preventDefault();
        handleRedo();
      }
    }
    if (e.key === "Delete" && selectedNodeId) {
      handleDeleteNode();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedNodeId, undoStack, redoStack, state]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    ctx.save();
    ctx.translate(panX, panY);
    ctx.scale(zoom, zoom);

    state.connections.forEach(conn => {
      const fromNode = getNodeById(state, conn.fromNodeId);
      const toNode = getNodeById(state, conn.toNodeId);
      if (fromNode && toNode) {
        ctx.strokeStyle = "#999";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(fromNode.x, fromNode.y);
        ctx.lineTo(toNode.x, toNode.y);
        ctx.stroke();
      }
    });

    state.nodes.forEach(node => {
      ctx.fillStyle = node.color;
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
      ctx.fill();

      if (selectedNodeId === node.id) {
        ctx.strokeStyle = "#000";
        ctx.lineWidth = 3;
        ctx.stroke();
      }

      ctx.fillStyle = "#fff";
      ctx.font = "bold 12px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(node.title, node.x, node.y);
    });

    if (connectingFromId) {
      const fromNode = getNodeById(state, connectingFromId);
      if (fromNode) {
        ctx.strokeStyle = "#3B82F6";
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.moveTo(fromNode.x, fromNode.y);
        ctx.lineTo(fromNode.x + 50, fromNode.y + 50);
        ctx.stroke();
        ctx.setLineDash([]);
      }
    }

    ctx.restore();
  }, [state, selectedNodeId, zoom, panX, panY, connectingFromId]);

  return (
    <>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
          {/* Control Panel */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-gray-50 p-4 rounded-xl space-y-3">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Node Title</label>
                <input
                  type="text"
                  value={nodeTitle}
                  onChange={(e) => setNodeTitle(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleAddNode()}
                  placeholder="Enter node title..."
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Color</label>
                <div className="grid grid-cols-4 gap-2">
                  {COLORS.map(color => (
                    <button
                      key={color}
                      onClick={() => setNodeColor(color)}
                      className={`w-full h-8 rounded-lg border-2 transition-all ${
                        nodeColor === color ? "border-gray-800" : "border-gray-200"
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              <button
                onClick={handleAddNode}
                disabled={!nodeTitle.trim()}
                className="w-full bg-primary hover:bg-primary-hover disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
              >
                ➕ Add Node
              </button>

              <button
                onClick={() => setConnectingFromId(selectedNodeId)}
                disabled={!selectedNodeId}
                className="w-full border-2 border-primary hover:bg-primary hover:text-white disabled:opacity-40 disabled:cursor-not-allowed text-primary text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
              >
                🔗 Connect
              </button>

              <button
                onClick={handleDeleteNode}
                disabled={!selectedNodeId}
                className="w-full border-2 border-red-300 hover:border-red-500 hover:text-red-500 disabled:opacity-40 disabled:cursor-not-allowed text-gray-500 text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
              >
                🗑️ Delete
              </button>

              <div className="flex gap-2">
                <button
                  onClick={handleUndo}
                  disabled={undoStack.length === 0}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 disabled:opacity-40 disabled:cursor-not-allowed text-gray-800 text-sm font-semibold px-3 py-2 rounded-lg transition-colors"
                >
                  ↶ Undo
                </button>
                <button
                  onClick={handleRedo}
                  disabled={redoStack.length === 0}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 disabled:opacity-40 disabled:cursor-not-allowed text-gray-800 text-sm font-semibold px-3 py-2 rounded-lg transition-colors"
                >
                  ↷ Redo
                </button>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setZoom(Math.min(3, zoom + 0.2))}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-semibold px-3 py-2 rounded-lg transition-colors"
                >
                  🔍+
                </button>
                <button
                  onClick={() => setZoom(Math.max(0.5, zoom - 0.2))}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-semibold px-3 py-2 rounded-lg transition-colors"
                >
                  🔍-
                </button>
              </div>

              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <input
                  type="checkbox"
                  checked={snapToGridEnabled}
                  onChange={(e) => setSnapToGridEnabled(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300"
                />
                Snap to Grid
              </label>

              <button
                onClick={handleClear}
                className="w-full border-2 border-orange-300 hover:border-orange-500 hover:text-orange-500 text-gray-500 text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
              >
                🧹 Clear
              </button>
            </div>

            {/* Export Panel */}
            <div className="bg-gray-50 p-4 rounded-xl space-y-2">
              <h3 className="font-semibold text-gray-800 text-sm">Export</h3>
              <button
                onClick={handleExportPNG}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold px-3 py-2 rounded-lg transition-colors"
              >
                📥 PNG
              </button>
              <button
                onClick={handleExportSVG}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold px-3 py-2 rounded-lg transition-colors"
              >
                📥 SVG
              </button>
              <button
                onClick={handleExportJSON}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold px-3 py-2 rounded-lg transition-colors"
              >
                📥 JSON
              </button>
              <label className="w-full block">
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImportJSON}
                  className="hidden"
                />
                <span className="w-full block bg-green-500 hover:bg-green-600 text-white text-sm font-semibold px-3 py-2 rounded-lg transition-colors text-center cursor-pointer">
                  📤 Import
                </span>
              </label>
              <button
                onClick={handleCopyImage}
                className="w-full border-2 border-primary hover:bg-primary hover:text-white text-primary text-sm font-semibold px-3 py-2 rounded-lg transition-colors"
              >
                {copied ? "✅ Copied!" : "📋 Copy"}
              </button>
            </div>
          </div>

          {/* Canvas Panel */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <canvas
                ref={canvasRef}
                width={canvasWidth}
                height={canvasHeight}
                onMouseDown={handleCanvasMouseDown}
                onMouseMove={handleCanvasMouseMove}
                onMouseUp={handleCanvasMouseUp}
                onWheel={handleCanvasWheel}
                className="w-full border border-gray-100 bg-white cursor-move"
              />
            </div>

            {/* Info Panel */}
            <div className="mt-4 bg-gray-50 p-4 rounded-xl">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary">{state.nodes.length}</div>
                  <div className="text-xs text-gray-500">Nodes</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">{state.connections.length}</div>
                  <div className="text-xs text-gray-500">Connections</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">{(zoom * 100).toFixed(0)}%</div>
                  <div className="text-xs text-gray-500">Zoom</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <MindMapBuilderSEOContent />

      <RelatedTools
        currentTool="mind-map-builder"
        tools={["flowchart-logic-mapper", "venn-diagram-maker", "word-cloud-generator"]}
      />
    </>
  );
}
