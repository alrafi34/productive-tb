'use client';

import React, { useState, useRef, useCallback, useMemo } from 'react';
import Image from 'next/image';
import { Upload, Eye, AlertCircle, Info } from 'lucide-react';
import { SimulatorState, AccessibilityTip } from './types';
import { colorBlindnessTypes, accessibilityTips, generateAllSVGFilters, loadImageFromFile, sampleImages } from './logic';
import ColorBlindnessSimulatorSEOContent from './seo-content';
import RelatedTools from '@/components/RelatedTools';

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024;

const getTipIcon = (severity: AccessibilityTip['severity']) => {
  switch (severity) {
    case 'error':
      return <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />;
    case 'warning':
      return <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />;
    default:
      return <Info className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />;
  }
};

const getTipCardStyle = (severity: AccessibilityTip['severity']) => {
  if (severity === 'error') return 'bg-red-50 border border-red-100';
  if (severity === 'warning') return 'bg-amber-50 border border-amber-100';
  return 'bg-blue-50 border border-blue-100';
};

export default function ColorBlindnessSimulatorUI() {
  const [state, setState] = useState<SimulatorState>({
    selectedType: 'normal',
    imageUrl: sampleImages[0].url,
    viewMode: 'comparison',
    intensity: 1,
    showUIComponents: false,
  });
  const [uploadError, setUploadError] = useState<string>('');
  const [isDragging, setIsDragging] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const updateState = useCallback((updates: Partial<SimulatorState>) => {
    setState((prev) => ({ ...prev, ...updates }));
  }, []);

  const handleFileUpload = useCallback(
    async (file: File) => {
      if (file.size > MAX_FILE_SIZE_BYTES) {
        setUploadError('File is too large. Please upload an image under 10MB.');
        return;
      }

      try {
        const imageUrl = await loadImageFromFile(file);
        setUploadError('');
        updateState({ imageUrl, showUIComponents: false });
      } catch (error) {
        setUploadError(error instanceof Error ? error.message : 'Failed to load image.');
      }
    },
    [updateState]
  );

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileUpload(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFileUpload(file);
  };

  const selectedTypeData = useMemo(
    () => colorBlindnessTypes.find((type) => type.id === state.selectedType),
    [state.selectedType]
  );

  const currentTips = useMemo(() => accessibilityTips[state.selectedType] || [], [state.selectedType]);

  const activeTypeLabel = selectedTypeData?.name || 'Simulated Vision';

  const getPreviewStyle = (filtered: boolean): React.CSSProperties => ({
    filter: filtered && state.selectedType !== 'normal' ? `url(#${state.selectedType})` : 'none',
  });

  const renderUIDemo = () => (
    <div className="p-4 sm:p-5 space-y-4 h-full overflow-auto">
      <div className="flex flex-wrap gap-2">
        <button className="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-xs font-semibold">Primary</button>
        <button className="bg-emerald-600 text-white px-3 py-1.5 rounded-lg text-xs font-semibold">Success</button>
        <button className="bg-red-600 text-white px-3 py-1.5 rounded-lg text-xs font-semibold">Danger</button>
        <button className="bg-amber-400 text-gray-900 px-3 py-1.5 rounded-lg text-xs font-semibold">Warning</button>
      </div>

      <div className="space-y-2 text-xs sm:text-sm">
        <div className="bg-red-100 border border-red-200 text-red-700 px-3 py-2 rounded-lg">Error: Please fix required fields.</div>
        <div className="bg-emerald-100 border border-emerald-200 text-emerald-700 px-3 py-2 rounded-lg">Success: Settings saved.</div>
        <div className="bg-amber-100 border border-amber-200 text-amber-700 px-3 py-2 rounded-lg">Warning: Action cannot be undone.</div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
          <div className="w-full h-2 bg-gray-200 rounded mb-2">
            <div className="w-3/4 h-2 bg-blue-500 rounded" />
          </div>
          <p className="text-xs text-gray-600">Progress 75%</p>
        </div>
        <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm flex items-center justify-between">
          <span className="text-emerald-600">●</span>
          <span className="text-xs text-gray-600">System online</span>
        </div>
      </div>
    </div>
  );

  const renderImagePreview = () => {
    if (state.showUIComponents) return renderUIDemo();

    if (!state.imageUrl) {
      return (
        <div className="flex items-center justify-center h-full text-gray-500">
          <div className="text-center px-4">
            <Upload className="w-10 h-10 mx-auto mb-2 opacity-50" />
            <p className="text-sm">Upload an image or select a sample</p>
          </div>
        </div>
      );
    }

    return (
      <div className="relative w-full h-full">
        <Image src={state.imageUrl} alt="Simulation preview" fill className="object-contain" unoptimized />
      </div>
    );
  };

  const renderPreviewPanel = (filtered: boolean, panelHeight = 'h-64 sm:h-72') => (
    <div
      className={`relative w-full ${panelHeight} bg-gray-100 rounded-xl overflow-hidden border border-gray-200`}
      style={getPreviewStyle(filtered)}
    >
      {renderImagePreview()}
    </div>
  );

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-8">
        <div dangerouslySetInnerHTML={{ __html: generateAllSVGFilters(state.intensity) }} />

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-7">
          <div className="flex flex-col xl:flex-row xl:items-end xl:justify-between gap-5 pb-6 border-b border-gray-100">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-primary">Accessibility Simulator</p>
              <h3 className="text-2xl font-black text-gray-900 mt-1">Color Blindness Preview Workspace</h3>
              <p className="text-sm text-gray-600 mt-2">
                Test images or UI components across color vision deficiencies and compare side-by-side instantly.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1.5 rounded-lg bg-gray-100 text-gray-700 text-xs font-semibold">
                Mode: {state.viewMode === 'comparison' ? 'Compare' : 'Single'}
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-gray-100 text-gray-700 text-xs font-semibold">
                Content: {state.showUIComponents ? 'UI Demo' : 'Image'}
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-semibold">
                Intensity {Math.round(state.intensity * 100)}%
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 lg:gap-8 pt-6">
            <div className="xl:col-span-4 space-y-6">
              <div className="bg-gray-50/70 rounded-xl border border-gray-200 p-4 sm:p-5">
                <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-3">Vision Type</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-2">
                  {colorBlindnessTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => updateState({ selectedType: type.id })}
                      className={`w-full text-left p-3 rounded-lg border transition-all ${
                        state.selectedType === type.id
                          ? 'bg-primary text-white border-primary shadow-sm'
                          : 'bg-white text-gray-700 border-gray-200 hover:border-primary/40'
                      }`}
                    >
                      <div className="font-semibold text-sm">{type.name}</div>
                      <div className="text-xs opacity-80 mt-0.5">{type.prevalence}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50/70 rounded-xl border border-gray-200 p-4 sm:p-5 space-y-5">
                <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Simulation Settings</h4>

                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Intensity: {Math.round(state.intensity * 100)}%
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={state.intensity}
                    onChange={(e) => updateState({ intensity: parseFloat(e.target.value) })}
                    className="w-full mt-2 accent-primary"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">View Mode</label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <button
                      onClick={() => updateState({ viewMode: 'single' })}
                      className={`px-3 py-2 text-sm font-semibold rounded-lg border transition-all ${
                        state.viewMode === 'single'
                          ? 'bg-primary text-white border-primary'
                          : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      Single
                    </button>
                    <button
                      onClick={() => updateState({ viewMode: 'comparison' })}
                      className={`px-3 py-2 text-sm font-semibold rounded-lg border transition-all ${
                        state.viewMode === 'comparison'
                          ? 'bg-primary text-white border-primary'
                          : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      Compare
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Content Type</label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <button
                      onClick={() => updateState({ showUIComponents: false })}
                      className={`px-3 py-2 text-sm font-semibold rounded-lg border transition-all ${
                        !state.showUIComponents
                          ? 'bg-primary text-white border-primary'
                          : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      Image
                    </button>
                    <button
                      onClick={() => updateState({ showUIComponents: true })}
                      className={`px-3 py-2 text-sm font-semibold rounded-lg border transition-all ${
                        state.showUIComponents
                          ? 'bg-primary text-white border-primary'
                          : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      UI Demo
                    </button>
                  </div>
                </div>
              </div>

              {!state.showUIComponents && (
                <div className="bg-gray-50/70 rounded-xl border border-gray-200 p-4 sm:p-5 space-y-4">
                  <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Upload or Samples</h4>

                  <div
                    className={`border-2 border-dashed rounded-xl p-5 text-center transition-colors cursor-pointer ${
                      isDragging ? 'border-primary bg-primary/5' : 'border-gray-300 hover:border-primary/60'
                    }`}
                    onDrop={handleDrop}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setIsDragging(true);
                    }}
                    onDragLeave={() => setIsDragging(false)}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm font-medium text-gray-700">Click or drag image here</p>
                    <p className="text-xs text-gray-500 mt-1">PNG, JPG, WEBP up to 10MB</p>
                  </div>

                  <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />

                  {uploadError && (
                    <div className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{uploadError}</div>
                  )}

                  <div>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Sample Images</p>
                    <div className="space-y-2">
                      {sampleImages.map((sample) => (
                        <button
                          key={sample.name}
                          onClick={() => {
                            setUploadError('');
                            updateState({ imageUrl: sample.url, showUIComponents: false });
                          }}
                          className={`w-full text-left px-3 py-2 rounded-lg border transition-all ${
                            state.imageUrl === sample.url
                              ? 'bg-primary/10 border-primary/30 text-primary'
                              : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'
                          }`}
                        >
                          <div className="text-sm font-semibold">{sample.name}</div>
                          <div className="text-xs opacity-80">{sample.description}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="xl:col-span-8 space-y-6">
              {selectedTypeData && (
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl border border-primary/20 p-4 sm:p-5">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                    <div>
                      <h4 className="text-lg font-bold text-gray-900">{activeTypeLabel}</h4>
                      <p className="text-sm text-gray-600 mt-1">{selectedTypeData.description}</p>
                      <p className="text-xs text-gray-500 mt-1">Affects {selectedTypeData.prevalence}</p>
                    </div>
                    {state.selectedType !== 'normal' && (
                      <div className="inline-flex items-center gap-2 text-xs font-semibold text-primary bg-white border border-primary/20 px-3 py-1.5 rounded-lg w-fit">
                        <Eye className="w-4 h-4" />
                        Simulation Active
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="bg-gray-50/70 rounded-xl border border-gray-200 p-4 sm:p-5">
                <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-3">Preview</h4>

                {state.viewMode === 'comparison' ? (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Normal Vision</p>
                      {renderPreviewPanel(false, 'h-64 sm:h-72')}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">{activeTypeLabel}</p>
                      {renderPreviewPanel(true, 'h-64 sm:h-72')}
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">{activeTypeLabel}</p>
                    {renderPreviewPanel(state.selectedType !== 'normal', 'h-72 sm:h-80 lg:h-[28rem]')}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Accessibility Guidelines</h3>
            {currentTips.length > 0 ? (
              <div className="space-y-3">
                {currentTips.map((tip, index) => (
                  <div key={index} className={`flex items-start gap-3 p-3 rounded-lg ${getTipCardStyle(tip.severity)}`}>
                    {getTipIcon(tip.severity)}
                    <p className="text-sm text-gray-700">{tip.message}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm text-gray-600">
                No specific warnings for normal vision mode. Switch to a deficiency type to see focused guidance.
              </div>
            )}
          </div>

          <div className="bg-blue-50 rounded-2xl border border-blue-200 p-5 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold text-blue-900 mb-3">Design Best Practices</h3>
            <div className="space-y-2 text-sm text-blue-800">
              <p>• Use patterns, textures, or icons in addition to color.</p>
              <p>• Keep contrast ratios at 4.5:1 for body text and 3:1 for large text.</p>
              <p>• Test key screens across multiple deficiency types.</p>
              <p>• Add labels to color-dependent status indicators.</p>
              <p>• Prefer accessibility-safe palettes for data and UI states.</p>
            </div>
          </div>
        </div>
      </div>

      <ColorBlindnessSimulatorSEOContent />

      <RelatedTools
        currentTool="color-blindness-simulator"
        tools={['contrast-checker', 'color-palette-contrast-grid', 'color-palette-generator']}
      />
    </>
  );
}
