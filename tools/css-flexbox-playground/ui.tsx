"use client";

import { useState } from "react";
import {
  FlexContainerProps,
  FlexItemProps,
  FlexItem,
  DEFAULT_CONTAINER,
  DEFAULT_ITEM,
  PRESETS,
  generateFullCSS,
} from "./logic";
import CSSFlexboxPlaygroundSEOContent from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function CSSFlexboxPlaygroundUI() {
  const [container, setContainer] = useState<FlexContainerProps>(DEFAULT_CONTAINER);
  const [items, setItems] = useState<FlexItem[]>([
    { id: "1", label: "Item 1" },
    { id: "2", label: "Item 2" },
    { id: "3", label: "Item 3" },
  ]);
  const [itemProps, setItemProps] = useState<Record<string, FlexItemProps>>({
    "1": DEFAULT_ITEM,
    "2": DEFAULT_ITEM,
    "3": DEFAULT_ITEM,
  });
  const [copied, setCopied] = useState(false);
  const [previewMode, setPreviewMode] = useState<"desktop" | "tablet" | "mobile">("desktop");

  const previewWidths = {
    desktop: "100%",
    tablet: "768px",
    mobile: "375px",
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const addItem = () => {
    const newId = String(Math.max(...items.map(i => parseInt(i.id)), 0) + 1);
    setItems([...items, { id: newId, label: `Item ${items.length + 1}` }]);
    setItemProps({ ...itemProps, [newId]: DEFAULT_ITEM });
  };

  const removeItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter(i => i.id !== id));
      const newProps = { ...itemProps };
      delete newProps[id];
      setItemProps(newProps);
    }
  };

  const updateItem = (id: string, label: string) => {
    setItems(items.map(i => (i.id === id ? { ...i, label } : i)));
  };

  const updateItemProp = (id: string, key: keyof FlexItemProps, value: any) => {
    setItemProps({
      ...itemProps,
      [id]: { ...itemProps[id], [key]: value },
    });
  };

  const applyPreset = (presetName: keyof typeof PRESETS) => {
    const preset = PRESETS[presetName];
    setContainer(preset.container);
    setItems(preset.items.map((_, i) => ({ id: String(i + 1), label: `Item ${i + 1}` })));
    const newProps: Record<string, FlexItemProps> = {};
    preset.items.forEach((props, i) => {
      newProps[String(i + 1)] = props;
    });
    setItemProps(newProps);
  };

  const cssCode = generateFullCSS(container, items.map(i => itemProps[i.id] || DEFAULT_ITEM));

  const containerStyle: React.CSSProperties = {
    display: container.display,
    flexDirection: container.flexDirection,
    justifyContent: container.justifyContent,
    alignItems: container.alignItems,
    alignContent: container.alignContent,
    flexWrap: container.flexWrap,
    gap: `${container.gap}px`,
    width: "100%",
    minHeight: "300px",
    backgroundColor: "#f3f4f6",
    borderRadius: "12px",
    padding: "16px",
    border: "2px dashed #d1d5db",
  };

  return (
    <>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Presets */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
            Quick Presets
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {Object.keys(PRESETS).map(preset => (
              <button
                key={preset}
                onClick={() => applyPreset(preset as keyof typeof PRESETS)}
                className="px-3 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg text-xs font-semibold transition-colors capitalize"
              >
                {preset}
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Controls Panel */}
          <div className="lg:col-span-1 space-y-6">
            {/* Container Controls */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h3 className="text-sm font-bold text-gray-700 uppercase tracking-widest mb-4">Container</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-2">Display</label>
                  <select
                    value={container.display}
                    onChange={e => setContainer({ ...container, display: e.target.value as any })}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="flex">flex</option>
                    <option value="inline-flex">inline-flex</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-2">Direction</label>
                  <select
                    value={container.flexDirection}
                    onChange={e => setContainer({ ...container, flexDirection: e.target.value as any })}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="row">row</option>
                    <option value="column">column</option>
                    <option value="row-reverse">row-reverse</option>
                    <option value="column-reverse">column-reverse</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-2">Justify Content</label>
                  <select
                    value={container.justifyContent}
                    onChange={e => setContainer({ ...container, justifyContent: e.target.value as any })}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="flex-start">flex-start</option>
                    <option value="center">center</option>
                    <option value="flex-end">flex-end</option>
                    <option value="space-between">space-between</option>
                    <option value="space-around">space-around</option>
                    <option value="space-evenly">space-evenly</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-2">Align Items</label>
                  <select
                    value={container.alignItems}
                    onChange={e => setContainer({ ...container, alignItems: e.target.value as any })}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="stretch">stretch</option>
                    <option value="flex-start">flex-start</option>
                    <option value="center">center</option>
                    <option value="flex-end">flex-end</option>
                    <option value="baseline">baseline</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-2">Flex Wrap</label>
                  <select
                    value={container.flexWrap}
                    onChange={e => setContainer({ ...container, flexWrap: e.target.value as any })}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="nowrap">nowrap</option>
                    <option value="wrap">wrap</option>
                    <option value="wrap-reverse">wrap-reverse</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-2">Gap: {container.gap}px</label>
                  <input
                    type="range"
                    min="0"
                    max="64"
                    value={container.gap}
                    onChange={e => setContainer({ ...container, gap: parseInt(e.target.value) })}
                    className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-200"
                  />
                </div>
              </div>
            </div>

            {/* Item Controls */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h3 className="text-sm font-bold text-gray-700 uppercase tracking-widest mb-4">Items</h3>

              <div className="space-y-3 max-h-96 overflow-y-auto">
                {items.map(item => (
                  <div key={item.id} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <input
                        type="text"
                        value={item.label}
                        onChange={e => updateItem(item.id, e.target.value)}
                        className="flex-1 text-xs font-semibold bg-transparent border-0 focus:outline-none"
                      />
                      {items.length > 1 && (
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-700 text-sm font-bold"
                        >
                          ×
                        </button>
                      )}
                    </div>

                    <div className="space-y-2 text-xs">
                      <div>
                        <label className="text-gray-600">Grow</label>
                        <input
                          type="number"
                          min="0"
                          max="10"
                          value={itemProps[item.id]?.flexGrow || 0}
                          onChange={e => updateItemProp(item.id, "flexGrow", parseInt(e.target.value))}
                          className="w-full rounded border border-gray-200 px-2 py-1 text-xs"
                        />
                      </div>
                      <div>
                        <label className="text-gray-600">Shrink</label>
                        <input
                          type="number"
                          min="0"
                          max="10"
                          value={itemProps[item.id]?.flexShrink || 1}
                          onChange={e => updateItemProp(item.id, "flexShrink", parseInt(e.target.value))}
                          className="w-full rounded border border-gray-200 px-2 py-1 text-xs"
                        />
                      </div>
                      <div>
                        <label className="text-gray-600">Basis</label>
                        <input
                          type="text"
                          value={itemProps[item.id]?.flexBasis || "auto"}
                          onChange={e => updateItemProp(item.id, "flexBasis", e.target.value)}
                          placeholder="auto, 100px, 50%"
                          className="w-full rounded border border-gray-200 px-2 py-1 text-xs"
                        />
                      </div>
                      <div>
                        <label className="text-gray-600">Order</label>
                        <input
                          type="number"
                          value={itemProps[item.id]?.order || 0}
                          onChange={e => updateItemProp(item.id, "order", parseInt(e.target.value))}
                          className="w-full rounded border border-gray-200 px-2 py-1 text-xs"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={addItem}
                className="w-full mt-3 px-3 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg text-xs font-semibold transition-colors"
              >
                + Add Item
              </button>
            </div>
          </div>

          {/* Preview Panel */}
          <div className="lg:col-span-2 space-y-6">
            {/* Preview Mode Selector */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                  Preview
                </h2>
                <div className="flex gap-2">
                  {(["desktop", "tablet", "mobile"] as const).map(mode => (
                    <button
                      key={mode}
                      onClick={() => setPreviewMode(mode)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors capitalize ${
                        previewMode === mode
                          ? "bg-primary text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-center bg-gray-50 rounded-lg p-4 overflow-x-auto">
                <div style={{ width: previewWidths[previewMode] }}>
                  <div style={containerStyle}>
                    {items.map(item => {
                      const itemStyle: React.CSSProperties = {
                        backgroundColor: "#3b82f6",
                        color: "white",
                        padding: "16px",
                        borderRadius: "8px",
                        fontWeight: "600",
                        fontSize: "14px",
                        textAlign: "center",
                        minWidth: "80px",
                        flexGrow: itemProps[item.id]?.flexGrow || 0,
                        flexShrink: itemProps[item.id]?.flexShrink || 1,
                        flexBasis: itemProps[item.id]?.flexBasis || "auto",
                        order: itemProps[item.id]?.order || 0,
                        alignSelf: itemProps[item.id]?.alignSelf || "auto",
                      };
                      return (
                        <div key={item.id} style={itemStyle}>
                          {item.label}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* CSS Code Output */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                  CSS Code
                </h2>
                <button
                  onClick={() => copyToClipboard(cssCode)}
                  className="px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg text-sm font-semibold transition-colors"
                >
                  {copied ? "✓ Copied!" : "📋 Copy CSS"}
                </button>
              </div>
              <pre className="bg-gray-50 rounded-lg p-4 text-sm font-mono text-gray-800 overflow-x-auto max-h-96 overflow-y-auto">
                {cssCode}
              </pre>
            </div>
          </div>
        </div>
      </div>

      <CSSFlexboxPlaygroundSEOContent />
      <RelatedTools
        currentTool="css-flexbox-playground"
        tools={["css-gradient-generator", "css-box-shadow-generator", "css-animation-previewer"]}
      />
    </>
  );
}
