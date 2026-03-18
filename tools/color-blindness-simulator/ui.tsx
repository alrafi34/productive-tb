'use client';

import React, { useState, useRef, useCallback } from 'react';
import { Upload, Download, Eye, EyeOff, AlertCircle, Info } from 'lucide-react';
import { SimulatorState, AccessibilityTip } from './types';
import { 
  colorBlindnessTypes,
  accessibilityTips,
  generateAllSVGFilters,
  loadImageFromFile,
  sampleImages
} from './logic';
import ColorBlindnessSimulatorSEOContent from './seo-content';
import RelatedTools from '@/components/RelatedTools';

export default function ColorBlindnessSimulator() {
  const [state, setState] = useState<SimulatorState>({
    selectedType: 'normal',
    imageUrl: sampleImages[0].url,
    viewMode: 'comparison',
    intensity: 1,
    showUIComponents: false
  });
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const updateState = useCallback((updates: Partial<SimulatorState>) => {
    setState(prev => ({ ...prev, ...updates }));
  }, []);

  const handleFileUpload = async (file: File) => {
    try {
      const imageUrl = await loadImageFromFile(file);
      updateState({ imageUrl, showUIComponents: false });
    } catch (error) {
      console.error('Error loading image:', error);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileUpload(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFileUpload(file);
  };

  const selectedTypeData = colorBlindnessTypes.find(type => type.id === state.selectedType);
  const currentTips = accessibilityTips[state.selectedType] || [];

  const PreviewImage = ({ filtered = false }: { filtered?: boolean }) => (
    <div 
      className="relative w-full h-64 bg-gray-100 rounded-lg overflow-hidden border border-gray-200"
      style={{ 
        filter: filtered && state.selectedType !== 'normal' ? `url(#${state.selectedType})` : 'none' 
      }}
    >
      {state.showUIComponents ? (
        <div className="p-6 space-y-4 h-full overflow-auto">
          <div className="flex gap-2">
            <button className="bg-blue-500 text-white px-4 py-2 rounded">Primary</button>
            <button className="bg-green-500 text-white px-4 py-2 rounded">Success</button>
            <button className="bg-red-500 text-white px-4 py-2 rounded">Danger</button>
            <button className="bg-yellow-500 text-black px-4 py-2 rounded">Warning</button>
          </div>
          
          <div className="space-y-2">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              Error: Please fix the required fields
            </div>
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
              Success: Your changes have been saved
            </div>
            <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
              Warning: This action cannot be undone
            </div>
            <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded">
              Info: New features are available
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg shadow border">
              <div className="w-full h-2 bg-gray-200 rounded mb-2">
                <div className="w-3/4 h-2 bg-blue-500 rounded"></div>
              </div>
              <p className="text-sm text-gray-600">Progress: 75%</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow border">
              <div className="flex items-center justify-between">
                <span className="text-green-600">●</span>
                <span className="text-sm">Online</span>
              </div>
            </div>
          </div>
        </div>
      ) : state.imageUrl ? (
        <img 
          src={state.imageUrl} 
          alt="Preview" 
          className="w-full h-full object-contain"
        />
      ) : (
        <div className="flex items-center justify-center h-full text-gray-500">
          <div className="text-center">
            <Upload className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>Upload an image or select a sample</p>
          </div>
        </div>
      )}
    </div>
  );

  const TipIcon = ({ severity }: { severity: AccessibilityTip['severity'] }) => {
    switch (severity) {
      case 'error': return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'warning': return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      default: return <Info className="w-4 h-4 text-blue-500" />;
    }
  };

  return (
    <>
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* SVG Filters */}
        <div dangerouslySetInnerHTML={{ __html: generateAllSVGFilters(state.intensity) }} />

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Controls Panel */}
          <div className="lg:col-span-1 space-y-6">
            {/* Vision Type Selector */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold mb-4">Vision Type</h3>
              <div className="space-y-2">
                {colorBlindnessTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => updateState({ selectedType: type.id })}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      state.selectedType === type.id 
                        ? 'bg-primary text-white' 
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <div className="font-medium text-sm">{type.name}</div>
                    <div className="text-xs opacity-75">{type.prevalence}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Simulation Settings */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
              <h3 className="text-lg font-semibold">Settings</h3>
              
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Simulation Intensity: {Math.round(state.intensity * 100)}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={state.intensity}
                  onChange={(e) => updateState({ intensity: parseFloat(e.target.value) })}
                  className="w-full mt-2"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">View Mode</label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <button
                    onClick={() => updateState({ viewMode: 'single' })}
                    className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                      state.viewMode === 'single' ? 'bg-primary text-white' : 'bg-gray-100'
                    }`}
                  >
                    Single
                  </button>
                  <button
                    onClick={() => updateState({ viewMode: 'comparison' })}
                    className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                      state.viewMode === 'comparison' ? 'bg-primary text-white' : 'bg-gray-100'
                    }`}
                  >
                    Compare
                  </button>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Content Type</label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <button
                    onClick={() => updateState({ showUIComponents: false })}
                    className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                      !state.showUIComponents ? 'bg-primary text-white' : 'bg-gray-100'
                    }`}
                  >
                    Image
                  </button>
                  <button
                    onClick={() => updateState({ showUIComponents: true })}
                    className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                      state.showUIComponents ? 'bg-primary text-white' : 'bg-gray-100'
                    }`}
                  >
                    UI Demo
                  </button>
                </div>
              </div>
            </div>

            {/* Upload Controls */}
            {!state.showUIComponents && (
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-semibold mb-4">Image Upload</h3>
                
                <div
                  className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer"
                  onDrop={handleDrop}
                  onDragOver={(e) => e.preventDefault()}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm text-gray-600">Click or drag image here</p>
                  <p className="text-xs text-gray-500 mt-1">PNG, JPG, WEBP up to 10MB</p>
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />

                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Sample Images</p>
                  <div className="space-y-2">
                    {sampleImages.map((sample) => (
                      <button
                        key={sample.name}
                        onClick={() => updateState({ imageUrl: sample.url })}
                        className="w-full text-left px-3 py-2 text-sm bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <div className="font-medium">{sample.name}</div>
                        <div className="text-xs text-gray-600">{sample.description}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Preview Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* Vision Type Info */}
            {selectedTypeData && (
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">{selectedTypeData.name}</h3>
                    <p className="text-gray-600 text-sm mt-1">{selectedTypeData.description}</p>
                    <p className="text-gray-500 text-xs mt-1">Affects {selectedTypeData.prevalence}</p>
                  </div>
                  {state.selectedType !== 'normal' && (
                    <div className="flex items-center gap-2 text-sm">
                      <Eye className="w-4 h-4" />
                      <span>Simulation Active</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Preview */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold mb-4">Preview</h3>
              
              {state.viewMode === 'comparison' ? (
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Normal Vision</h4>
                    <PreviewImage filtered={false} />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">
                      {selectedTypeData?.name || 'Simulated Vision'}
                    </h4>
                    <PreviewImage filtered={true} />
                  </div>
                </div>
              ) : (
                <PreviewImage filtered={state.selectedType !== 'normal'} />
              )}
            </div>

            {/* Accessibility Tips */}
            {currentTips.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-semibold mb-4">Accessibility Guidelines</h3>
                <div className="space-y-3">
                  {currentTips.map((tip, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <TipIcon severity={tip.severity} />
                      <p className="text-sm text-gray-700">{tip.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* General Accessibility Tips */}
            <div className="bg-blue-50 rounded-xl border border-blue-200 p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">Design Best Practices</h3>
              <div className="space-y-2 text-sm text-blue-800">
                <p>• Use patterns, textures, or shapes in addition to color</p>
                <p>• Ensure sufficient contrast ratios (4.5:1 for normal text, 3:1 for large text)</p>
                <p>• Test your designs with multiple types of color vision deficiency</p>
                <p>• Provide text labels for color-coded information</p>
                <p>• Consider using colorblind-friendly palettes</p>
              </div>
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