'use client';

import React, { useState, useRef, useCallback } from 'react';
import { Copy, Plus, Trash2, Shuffle, Download, Maximize, Eye } from 'lucide-react';
import { GradientPoint, MeshGradientConfig } from './types';
import { 
  defaultMeshConfig,
  meshPresets,
  generateMeshCSS,
  generateSCSSVariables,
  generateSVG,
  generateRandomMesh,
  generateId,
  downloadFile
} from './logic';
import CSSMeshGradientGeneratorSEOContent from './seo-content';
import RelatedTools from '@/components/RelatedTools';

export default function CSSMeshGradientGenerator() {
  const [config, setConfig] = useState<MeshGradientConfig>({
    ...defaultMeshConfig,
    canvasWidth: 800,
    canvasHeight: 600
  });
  
  const [selectedPoint, setSelectedPoint] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);

  const updateConfig = useCallback((updates: Partial<MeshGradientConfig>) => {
    setConfig(prev => ({ ...prev, ...updates }));
  }, []);

  const updatePoint = useCallback((id: string, updates: Partial<GradientPoint>) => {
    setConfig(prev => ({
      ...prev,
      points: prev.points.map(point => 
        point.id === id ? { ...point, ...updates } : point
      )
    }));
  }, []);

  const addPoint = () => {
    const newPoint: GradientPoint = {
      id: generateId(),
      color: '#FF6B6B',
      x: 50,
      y: 50,
      size: 250,
      blur: 100,
      opacity: 0.7
    };
    setConfig(prev => ({
      ...prev,
      points: [...prev.points, newPoint]
    }));
  };

  const removePoint = (id: string) => {
    if (config.points.length > 1) {
      setConfig(prev => ({
        ...prev,
        points: prev.points.filter(point => point.id !== id)
      }));
      setSelectedPoint(null);
    }
  };

  const generateRandom = () => {
    const randomPoints = generateRandomMesh();
    setConfig(prev => ({
      ...prev,
      points: randomPoints
    }));
  };

  const applyPreset = (preset: typeof meshPresets[0]) => {
    setConfig(prev => ({
      ...prev,
      ...preset.config
    }));
  };

  const handleCanvasMouseDown = (e: React.MouseEvent) => {
    if (!canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    // Find closest point
    let closestPoint = null;
    let minDistance = Infinity;
    
    config.points.forEach(point => {
      const distance = Math.sqrt(Math.pow(point.x - x, 2) + Math.pow(point.y - y, 2));
      if (distance < minDistance && distance < 10) { // 10% threshold
        minDistance = distance;
        closestPoint = point.id;
      }
    });
    
    if (closestPoint) {
      setSelectedPoint(closestPoint);
      setIsDragging(true);
    }
  };

  const handleCanvasMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !selectedPoint || !canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
    
    updatePoint(selectedPoint, { x, y });
  };

  const handleCanvasMouseUp = () => {
    setIsDragging(false);
  };

  const copyCSS = async () => {
    const css = generateMeshCSS(config);
    try {
      await navigator.clipboard.writeText(css);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    } catch (err) {
      console.error('Failed to copy CSS:', err);
    }
  };

  const exportFile = (format: 'css' | 'scss' | 'svg') => {
    let content = '';
    let filename = '';
    let mimeType = 'text/plain';
    
    switch (format) {
      case 'css':
        content = generateMeshCSS(config);
        filename = 'mesh-gradient.css';
        mimeType = 'text/css';
        break;
      case 'scss':
        content = generateSCSSVariables(config);
        filename = 'mesh-gradient.scss';
        mimeType = 'text/scss';
        break;
      case 'svg':
        content = generateSVG(config);
        filename = 'mesh-gradient.svg';
        mimeType = 'image/svg+xml';
        break;
    }
    
    downloadFile(content, filename, mimeType);
  };

  const meshCSS = generateMeshCSS(config);
  const meshStyle = {
    background: meshCSS.split('background: ')[1]?.split(';')[0] || config.backgroundColor,
    backgroundImage: meshCSS.split('background-image: ')[1]?.split(';')[0] || 'none'
  };

  const GradientCanvas = () => (
    <div
      ref={canvasRef}
      className={`relative border border-gray-200 rounded-xl overflow-hidden cursor-crosshair ${
        fullscreen ? 'fixed inset-0 z-50' : 'h-64 sm:h-80 lg:h-96'
      }`}
      style={meshStyle}
      onMouseDown={handleCanvasMouseDown}
      onMouseMove={handleCanvasMouseMove}
      onMouseUp={handleCanvasMouseUp}
      onMouseLeave={handleCanvasMouseUp}
    >
      {config.points.map((point) => (
        <div
          key={point.id}
          className={`absolute w-4 h-4 border-2 border-white rounded-full transform -translate-x-1/2 -translate-y-1/2 cursor-move ${
            selectedPoint === point.id ? 'bg-white' : 'bg-black bg-opacity-50'
          }`}
          style={{
            left: `${point.x}%`,
            top: `${point.y}%`,
            boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
          }}
          onClick={(e) => {
            e.stopPropagation();
            setSelectedPoint(point.id);
          }}
        />
      ))}
      
      {fullscreen && (
        <button
          onClick={() => setFullscreen(false)}
          className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-lg hover:bg-opacity-70 transition-colors"
        >
          <Eye className="w-5 h-5" />
        </button>
      )}
    </div>
  );

  const PointControls = ({ point }: { point: GradientPoint }) => (
    <div className="bg-gray-50 p-3 lg:p-4 rounded-lg space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="font-medium text-sm">Point {config.points.findIndex(p => p.id === point.id) + 1}</h4>
        <button
          onClick={() => removePoint(point.id)}
          className="text-red-500 hover:text-red-700 transition-colors"
          disabled={config.points.length <= 1}
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="sm:col-span-2">
          <label className="text-xs font-medium text-gray-600">Color</label>
          <div className="flex gap-2 mt-1">
            <input
              type="color"
              value={point.color}
              onChange={(e) => updatePoint(point.id, { color: e.target.value })}
              className="w-8 h-8 rounded border border-gray-300 flex-shrink-0"
            />
            <input
              type="text"
              value={point.color}
              onChange={(e) => updatePoint(point.id, { color: e.target.value })}
              className="flex-1 px-2 py-1 text-xs border border-gray-300 rounded font-mono"
            />
          </div>
        </div>
        
        <div>
          <label className="text-xs font-medium text-gray-600">Opacity: {Math.round(point.opacity * 100)}%</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={point.opacity}
            onChange={(e) => updatePoint(point.id, { opacity: parseFloat(e.target.value) })}
            className="w-full mt-1"
          />
        </div>
        
        <div>
          <label className="text-xs font-medium text-gray-600">Size: {point.size}px</label>
          <input
            type="range"
            min="100"
            max="500"
            value={point.size}
            onChange={(e) => updatePoint(point.id, { size: parseInt(e.target.value) })}
            className="w-full mt-1"
          />
        </div>
        
        <div className="sm:col-span-2">
          <label className="text-xs font-medium text-gray-600">Blur: {point.blur}px</label>
          <input
            type="range"
            min="20"
            max="200"
            value={point.blur}
            onChange={(e) => updatePoint(point.id, { blur: parseInt(e.target.value) })}
            className="w-full mt-1"
          />
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="max-w-7xl mx-auto p-4 lg:p-6 space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">CSS Mesh Gradient Generator</h1>
          <p className="text-base lg:text-lg text-gray-600 max-w-2xl mx-auto">
            Create modern multi-color mesh gradient backgrounds with interactive editing and CSS code generation.
          </p>
        </div>

        {/* Main Canvas Section */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 lg:p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Gradient Preview</h3>
            <button
              onClick={() => setFullscreen(true)}
              className="flex items-center gap-2 px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <Maximize className="w-4 h-4" />
              Fullscreen
            </button>
          </div>
          <GradientCanvas />
          <p className="text-xs text-gray-500 mt-2">
            Click and drag the white dots to move gradient points
          </p>
        </div>

        {/* Controls Row */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Quick Actions */}
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <button
                onClick={addPoint}
                className="w-full flex items-center gap-2 bg-primary text-white px-3 py-2 rounded-lg hover:bg-primary/90 transition-colors text-sm"
              >
                <Plus className="w-4 h-4" />
                Add Point
              </button>
              <button
                onClick={generateRandom}
                className="w-full flex items-center gap-2 bg-gray-600 text-white px-3 py-2 rounded-lg hover:bg-gray-700 transition-colors text-sm"
              >
                <Shuffle className="w-4 h-4" />
                Random
              </button>
            </div>
          </div>

          {/* Background Settings */}
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h3 className="text-lg font-semibold mb-4">Background</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">Color</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={config.backgroundColor}
                    onChange={(e) => updateConfig({ backgroundColor: e.target.value })}
                    className="w-10 h-10 rounded border border-gray-300 flex-shrink-0"
                  />
                  <input
                    type="text"
                    value={config.backgroundColor}
                    onChange={(e) => updateConfig({ backgroundColor: e.target.value })}
                    className="min-w-0 flex-1 px-2 py-2 text-sm border border-gray-300 rounded font-mono"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">
                  Noise: {config.noiseIntensity}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="50"
                  value={config.noiseIntensity}
                  onChange={(e) => updateConfig({ noiseIntensity: parseInt(e.target.value) })}
                  className="w-full"
                />
              </div>
            </div>
          </div>

          {/* Presets */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 md:col-span-2">
            <h3 className="text-lg font-semibold mb-4">Presets</h3>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
              {meshPresets.map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => applyPreset(preset)}
                  className="text-left px-3 py-2 text-sm bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <div className="font-medium">{preset.name}</div>
                  <div className="text-xs text-gray-600 truncate">{preset.description}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Point Controls Section */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 lg:p-6">
          <h3 className="text-lg font-semibold mb-4">Gradient Points</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {config.points.map((point) => (
              <PointControls key={point.id} point={point} />
            ))}
          </div>
        </div>

        {/* CSS Output Section */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 lg:p-6">
          <h3 className="text-lg font-semibold mb-4">Generated CSS</h3>
          <div className="bg-gray-900 text-green-400 p-3 lg:p-4 rounded-lg font-mono text-xs lg:text-sm overflow-x-auto whitespace-pre">
            {generateMeshCSS(config)}
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            <button
              onClick={copyCSS}
              className="flex items-center gap-2 bg-primary text-white px-3 lg:px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors text-sm"
            >
              <Copy className="w-4 h-4" />
              {copiedCode ? 'Copied!' : 'Copy CSS'}
            </button>
            <button
              onClick={() => exportFile('scss')}
              className="flex items-center gap-2 bg-gray-600 text-white px-3 lg:px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors text-sm"
            >
              <Download className="w-4 h-4" />
              SCSS
            </button>
            <button
              onClick={() => exportFile('svg')}
              className="flex items-center gap-2 bg-blue-600 text-white px-3 lg:px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
            >
              <Download className="w-4 h-4" />
              SVG
            </button>
          </div>
        </div>
      </div>

      {/* Fullscreen Overlay */}
      {fullscreen && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-50" onClick={() => setFullscreen(false)} />
      )}

      <CSSMeshGradientGeneratorSEOContent />
      
      <RelatedTools
        currentTool="css-mesh-gradient-generator"
        tools={['css-gradient-generator', 'gradient-text-generator', 'random-hex-color-generator']}
      />
    </>
  );
}