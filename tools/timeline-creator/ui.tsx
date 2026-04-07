"use client";

import { useState, useEffect, useRef } from "react";
import {
  TimelineEvent,
  TimelineConfig,
  DEFAULT_CONFIG,
  sortEventsByDate,
  validateEvent,
  generateSVGTimeline,
  exportTimelineAsImage,
  copyTimelineToClipboard,
  exportAsJSON,
  importFromJSON,
} from "./logic";
import TimelineCreatorSEOContent from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function TimelineCreatorUI() {
  const [events, setEvents] = useState<TimelineEvent[]>([
    { id: "1", title: "Project Kickoff", date: "2025-01-01", description: "Initial planning meeting" },
    { id: "2", title: "Prototype Completed", date: "2025-02-10", description: "First working prototype" },
    { id: "3", title: "Launch", date: "2025-04-15", description: "Public release" },
  ]);

  const [config, setConfig] = useState<TimelineConfig>(DEFAULT_CONFIG);
  const [title, setTitle] = useState("My Timeline");
  const [newEvent, setNewEvent] = useState({ title: "", date: "", description: "" });
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState<TimelineEvent[][]>([events]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const svgRef = useRef<HTMLDivElement>(null);

  // Auto-save to localStorage
  useEffect(() => {
    localStorage.setItem(
      "timeline-autosave",
      JSON.stringify({ events, config, title })
    );
  }, [events, config, title]);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("timeline-autosave");
    if (saved) {
      try {
        const { events: savedEvents, config: savedConfig, title: savedTitle } = JSON.parse(saved);
        setEvents(savedEvents);
        setConfig(savedConfig);
        setTitle(savedTitle);
        setHistory([savedEvents]);
      } catch (e) {
        // Ignore parse errors
      }
    }
  }, []);

  const addToHistory = (newEvents: TimelineEvent[]) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newEvents);
    if (newHistory.length > 50) newHistory.shift();
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    setEvents(newEvents);
  };

  const handleAddEvent = () => {
    if (!validateEvent(newEvent)) {
      alert("Please enter event title and date");
      return;
    }

    const event: TimelineEvent = {
      id: Date.now().toString(),
      title: newEvent.title,
      date: newEvent.date,
      description: newEvent.description,
    };

    addToHistory([...events, event]);
    setNewEvent({ title: "", date: "", description: "" });
  };

  const handleDeleteEvent = (id: string) => {
    addToHistory(events.filter((e) => e.id !== id));
  };

  const handleUpdateEvent = (id: string, field: keyof TimelineEvent, value: string) => {
    addToHistory(
      events.map((e) => (e.id === id ? { ...e, [field]: value } : e))
    );
  };

  const handleClearAll = () => {
    if (confirm("Clear all events?")) {
      addToHistory([]);
    }
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setEvents(history[historyIndex - 1]);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setEvents(history[historyIndex + 1]);
    }
  };

  const handleExportPNG = async () => {
    if (events.length === 0) {
      alert("Add events first");
      return;
    }
    try {
      const svg = generateSVGTimeline(events, config, 1200, 400);
      await exportTimelineAsImage(svg, `${title || "timeline"}.png`);
    } catch (error) {
      alert("Export failed");
    }
  };

  const handleCopyImage = async () => {
    if (events.length === 0) {
      alert("Add events first");
      return;
    }
    try {
      const svg = generateSVGTimeline(events, config, 1200, 400);
      await copyTimelineToClipboard(svg);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      alert("Copy failed");
    }
  };

  const handleExportJSON = () => {
    const json = exportAsJSON(events, config);
    const link = document.createElement("a");
    link.href = `data:application/json;charset=utf-8,${encodeURIComponent(json)}`;
    link.download = `${title || "timeline"}.json`;
    link.click();
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const imported = importFromJSON(content);
      if (imported) {
        addToHistory(imported.events);
        setConfig(imported.config);
      } else {
        alert("Invalid JSON file");
      }
    };
    reader.readAsText(file);
  };

  const svgTimeline = generateSVGTimeline(events, config, 1200, 400);
  const sorted = config.autoSort ? sortEventsByDate(events) : events;

  return (
    <>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Input Panel */}
          <div className="lg:col-span-1 space-y-4">
            {/* Title */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Timeline Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="My Timeline"
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Add Event */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 space-y-3">
              <h3 className="font-semibold text-gray-800 text-sm">Add Event</h3>
              <input
                type="text"
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                placeholder="Event title"
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <input
                type="date"
                value={newEvent.date}
                onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <textarea
                value={newEvent.description}
                onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                placeholder="Description (optional)"
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                rows={2}
              />
              <button
                onClick={handleAddEvent}
                className="w-full bg-primary hover:bg-primary-hover text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
              >
                ➕ Add Event
              </button>
            </div>

            {/* Layout Options */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 space-y-3">
              <h3 className="font-semibold text-gray-800 text-sm">Layout</h3>
              <select
                value={config.layout}
                onChange={(e) => setConfig({ ...config, layout: e.target.value as "horizontal" | "vertical" })}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="horizontal">Horizontal</option>
                <option value="vertical">Vertical</option>
              </select>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-2">
                  Node Color
                </label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={config.nodeColor}
                    onChange={(e) => setConfig({ ...config, nodeColor: e.target.value })}
                    className="w-12 h-10 rounded-lg cursor-pointer border border-gray-200"
                  />
                  <input
                    type="text"
                    value={config.nodeColor}
                    onChange={(e) => setConfig({ ...config, nodeColor: e.target.value })}
                    className="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-2">
                  Line Color
                </label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={config.lineColor}
                    onChange={(e) => setConfig({ ...config, lineColor: e.target.value })}
                    className="w-12 h-10 rounded-lg cursor-pointer border border-gray-200"
                  />
                  <input
                    type="text"
                    value={config.lineColor}
                    onChange={(e) => setConfig({ ...config, lineColor: e.target.value })}
                    className="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-2">
                  Spacing: {config.spacing}px
                </label>
                <input
                  type="range"
                  min="20"
                  max="120"
                  value={config.spacing}
                  onChange={(e) => setConfig({ ...config, spacing: parseInt(e.target.value) })}
                  className="w-full"
                />
              </div>

              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <input
                  type="checkbox"
                  checked={config.autoSort}
                  onChange={(e) => setConfig({ ...config, autoSort: e.target.checked })}
                  className="w-4 h-4 rounded border-gray-300"
                />
                Auto-sort by date
              </label>
            </div>

            {/* Controls */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 space-y-2">
              <div className="flex gap-2">
                <button
                  onClick={handleUndo}
                  disabled={historyIndex === 0}
                  className="flex-1 px-3 py-2 bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-400 text-gray-700 rounded-lg text-sm font-semibold transition-colors"
                >
                  ↶ Undo
                </button>
                <button
                  onClick={handleRedo}
                  disabled={historyIndex === history.length - 1}
                  className="flex-1 px-3 py-2 bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-400 text-gray-700 rounded-lg text-sm font-semibold transition-colors"
                >
                  ↷ Redo
                </button>
              </div>
              <button
                onClick={handleClearAll}
                disabled={events.length === 0}
                className="w-full px-3 py-2 border-2 border-red-300 hover:border-red-500 hover:text-red-500 disabled:opacity-40 disabled:cursor-not-allowed text-gray-500 rounded-lg text-sm font-semibold transition-colors"
              >
                🗑️ Clear All
              </button>
            </div>

            {/* Export */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 space-y-2">
              <h3 className="font-semibold text-gray-800 text-sm">Export</h3>
              <button
                onClick={handleExportPNG}
                disabled={events.length === 0}
                className="w-full bg-primary hover:bg-primary-hover disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold px-3 py-2 rounded-lg transition-colors"
              >
                📥 PNG
              </button>
              <button
                onClick={handleCopyImage}
                disabled={events.length === 0}
                className="w-full border-2 border-primary hover:bg-primary hover:text-white disabled:opacity-40 disabled:cursor-not-allowed text-primary text-sm font-semibold px-3 py-2 rounded-lg transition-colors"
              >
                {copied ? "✅ Copied!" : "📋 Copy"}
              </button>
              <button
                onClick={handleExportJSON}
                disabled={events.length === 0}
                className="w-full bg-primary hover:bg-primary-hover disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold px-3 py-2 rounded-lg transition-colors"
              >
                📥 JSON
              </button>
              <label className="block">
                <span className="sr-only">Import JSON</span>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImportJSON}
                  className="w-full text-sm text-gray-500 file:mr-2 file:px-3 file:py-2 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary-hover"
                />
              </label>
            </div>
          </div>

          {/* Preview Panel */}
          <div className="lg:col-span-2 space-y-4">
            {/* Timeline Preview */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h3 className="font-semibold text-gray-800 text-sm mb-4">Preview</h3>
              <div
                ref={svgRef}
                className="flex justify-center overflow-x-auto bg-gray-50 rounded-lg p-4"
              >
                <div dangerouslySetInnerHTML={{ __html: svgTimeline }} />
              </div>
            </div>

            {/* Stats */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary">{events.length}</div>
                  <div className="text-xs text-gray-500">Events</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">
                    {sorted.length > 0
                      ? new Date(sorted[sorted.length - 1].date).getFullYear()
                      : "-"}
                  </div>
                  <div className="text-xs text-gray-500">Latest Year</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">
                    {sorted.length > 0
                      ? new Date(sorted[0].date).getFullYear()
                      : "-"}
                  </div>
                  <div className="text-xs text-gray-500">Earliest Year</div>
                </div>
              </div>
            </div>

            {/* Events List */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-100">
                <h3 className="font-semibold text-gray-800 text-sm">Events ({events.length})</h3>
              </div>
              <div className="divide-y divide-gray-100 max-h-96 overflow-y-auto">
                {sorted.length === 0 ? (
                  <div className="p-4 text-center text-sm text-gray-500">No events yet</div>
                ) : (
                  sorted.map((event) => (
                    <div key={event.id} className="p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between items-start gap-2">
                        <div className="flex-1">
                          <div className="font-semibold text-gray-800 text-sm">{event.title}</div>
                          <div className="text-xs text-gray-500 mt-1">
                            {new Date(event.date).toLocaleDateString()}
                          </div>
                          {event.description && (
                            <div className="text-xs text-gray-600 mt-2 line-clamp-2">
                              {event.description}
                            </div>
                          )}
                        </div>
                        <button
                          onClick={() => handleDeleteEvent(event.id)}
                          className="text-red-500 hover:text-red-700 text-xs font-semibold"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <TimelineCreatorSEOContent />

      <RelatedTools
        currentTool="timeline-creator"
        tools={["bar-graph-generator", "pie-chart-maker", "mind-map-builder"]}
      />
    </>
  );
}
