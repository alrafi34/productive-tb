'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Search, Copy, Upload, Download, Eye, Info, Maximize, X, Check } from 'lucide-react';
import { CursorType, CustomCursor, CursorPreviewState } from './types';
import { 
  cursorTypes,
  interactiveElements,
  filterCursors,
  getCursorsByCategory,
  generateCursorCSS,
  generateCursorRule,
  copyToClipboard,
  createCustomCursor,
  validateCursorFile,
  getCategoryColor
} from './logic';
import CSSCursorStylePreviewerSEOContent from './seo-content';
import RelatedTools from '@/components/RelatedTools';

export default function CSSCursorStylePreviewer() {
  const [state, setState] = useState<CursorPreviewState>({
    selectedCursor: 'pointer',
    searchQuery: '',
    filteredCursors: cursorTypes,
    customCursors: [],
    showCompatibility: false,
    previewScale: 100
  });
  
  const [copiedCode, setCopiedCode] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragPosition, setDragPosition] = useState({ x: 50, y: 50 });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const previewAreaRef = useRef<HTMLDivElement>(null);

  const updateState = useCallback((updates: Partial<CursorPreviewState>) => {
    setState(prev => ({ ...prev, ...updates }));
  }, []);

  const handleSearch = useCallback((query: string) => {
    const filtered = filterCursors(cursorTypes, query);
    updateState({ 
      searchQuery: query, 
      filteredCursors: filtered 
    });
  }, [updateState]);

  const selectCursor = useCallback((cursorValue: string) => {
    updateState({ selectedCursor: cursorValue });
  }, [updateState]);

  const copyCSS = async (css: string) => {
    const success = await copyToClipboard(css);
    if (success) {
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!validateCursorFile(file)) {
      alert('Please upload a valid cursor file (PNG, SVG, ICO) under 2MB');
      return;
    }

    try {
      const customCursor = await createCustomCursor(file);
      updateState({
        customCursors: [...state.customCursors, customCursor],
        selectedCursor: `custom-${customCursor.name}`
      });
    } catch (error) {
      console.error('Error uploading cursor:', error);
      alert('Error uploading cursor file');
    }
  };

  const handleDragStart = (e: React.MouseEvent) => {
    setIsDragging(true);
    const rect = previewAreaRef.current?.getBoundingClientRect();
    if (rect) {
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setDragPosition({ x, y });
    }
  };

  const handleDragMove = (e: React.MouseEvent) => {
    if (!isDragging || !previewAreaRef.current) return;
    
    const rect = previewAreaRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
    setDragPosition({ x, y });
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const selectedCursorData = cursorTypes.find(c => c.value === state.selectedCursor);
  const customCursor = state.customCursors.find(c => `custom-${c.name}` === state.selectedCursor);
  const currentCursorCSS = generateCursorCSS(state.selectedCursor, customCursor);
  const categories = getCursorsByCategory(state.filteredCursors);

  const PreviewArea = () => (
    <div
      ref={previewAreaRef}
      className={`relative bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-dashed border-gray-300 rounded-xl overflow-hidden ${
        fullscreen ? 'fixed inset-0 z-50' : 'h-80 lg:h-96'
      }`}
      style={{ cursor: state.selectedCursor.startsWith('custom-') ? customCursor?.url ? `url('${customCursor.url}') ${customCursor.hotspotX} ${customCursor.hotspotY}, auto` : 'auto' : state.selectedCursor }}
      onMouseDown={handleDragStart}
      onMouseMove={handleDragMove}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragEnd}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="text-2xl lg:text-3xl font-bold text-gray-600">
            Move your mouse here
          </div>
          <div className="text-lg text-gray-500">
            Current cursor: <span className="font-mono font-semibold">{state.selectedCursor}</span>
          </div>
          <div className="text-sm text-gray-400">
            Click and drag to test cursor behavior
          </div>
        </div>
      </div>
      
      {/* Draggable element */}
      <div
        className="absolute w-16 h-16 bg-primary rounded-lg shadow-lg flex items-center justify-center text-white font-bold transform -translate-x-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing"
        style={{
          left: `${dragPosition.x}%`,
          top: `${dragPosition.y}%`
        }}
      >
        DRAG
      </div>
      
      {fullscreen && (
        <button
          onClick={() => setFullscreen(false)}
          className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-lg hover:bg-opacity-70 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      )}
    </div>
  );

  const CursorCard = ({ cursor }: { cursor: CursorType }) => (
    <div
      className={`bg-white border rounded-lg p-4 hover:shadow-md transition-all cursor-pointer ${
        state.selectedCursor === cursor.value ? 'ring-2 ring-primary border-primary' : 'border-gray-200'
      }`}
      style={{ cursor: cursor.value }}
      onClick={() => selectCursor(cursor.value)}
    >
      <div className="flex items-start justify-between mb-2">
        <h4 className="font-semibold text-gray-900">{cursor.name}</h4>
        <span className={`px-2 py-1 text-xs rounded-full ${getCategoryColor(cursor.category)}`}>
          {cursor.category}
        </span>
      </div>
      <p className="text-sm text-gray-600 mb-3">{cursor.description}</p>
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-500 font-mono">{cursor.value}</span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            copyCSS(generateCursorCSS(cursor.value));
          }}
          className="text-gray-400 hover:text-primary transition-colors"
        >
          <Copy className="w-4 h-4" />
        </button>
      </div>
    </div>
  );

  const InteractiveDemo = () => (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="text-lg font-semibold mb-4">Interactive UI Testing</h3>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {interactiveElements.map((element) => {
          const elementCursor = state.selectedCursor;
          
          switch (element.type) {
            case 'button':
              return (
                <button
                  key={element.id}
                  className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                  style={{ cursor: elementCursor }}
                >
                  {element.label}
                </button>
              );
            case 'input':
              return (
                <input
                  key={element.id}
                  type="text"
                  placeholder={element.label}
                  className="border border-gray-300 rounded-lg px-3 py-2"
                  style={{ cursor: elementCursor }}
                />
              );
            case 'link':
              return (
                <a
                  key={element.id}
                  href="#"
                  className="text-primary hover:underline"
                  style={{ cursor: elementCursor }}
                  onClick={(e) => e.preventDefault()}
                >
                  {element.label}
                </a>
              );
            case 'text':
              return (
                <div
                  key={element.id}
                  className="p-3 bg-gray-50 rounded-lg text-sm"
                  style={{ cursor: elementCursor }}
                >
                  {element.label}
                </div>
              );
            case 'draggable':
              return (
                <div
                  key={element.id}
                  className="bg-orange-100 border border-orange-300 rounded-lg p-3 text-center text-orange-800"
                  style={{ cursor: elementCursor }}
                >
                  {element.label}
                </div>
              );
            case 'resizable':
              return (
                <div
                  key={element.id}
                  className="bg-blue-100 border border-blue-300 rounded-lg p-3 text-center text-blue-800 relative"
                  style={{ cursor: elementCursor }}
                >
                  {element.label}
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-blue-500 cursor-nw-resize"></div>
                </div>
              );
            default:
              return null;
          }
        })}
      </div>
    </div>
  );

  return (
    <>
      <div className="max-w-7xl mx-auto p-4 lg:p-6 space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">CSS Cursor Style Previewer</h1>
          <p className="text-base lg:text-lg text-gray-600 max-w-3xl mx-auto">
            Test and preview all CSS cursor types with interactive examples. Perfect for developers and designers to understand cursor behavior.
          </p>
        </div>

        {/* Search and Controls */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 lg:p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search cursor types..."
                value={state.searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <Upload className="w-4 h-4" />
                Upload Custom
              </button>
              <button
                onClick={() => updateState({ showCompatibility: !state.showCompatibility })}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  state.showCompatibility ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Info className="w-4 h-4" />
                Compatibility
              </button>
            </div>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept=".png,.svg,.ico"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>

        {/* Preview Area */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 lg:p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Cursor Preview Area</h3>
            <button
              onClick={() => setFullscreen(true)}
              className="flex items-center gap-2 px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <Maximize className="w-4 h-4" />
              Fullscreen
            </button>
          </div>
          <PreviewArea />
        </div>

        {/* Interactive Demo */}
        <InteractiveDemo />

        {/* Cursor Grid */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 lg:p-6">
          <h3 className="text-lg font-semibold mb-6">All Cursor Types</h3>
          
          {Object.entries(categories).map(([category, cursors]) => (
            <div key={category} className="mb-8">
              <h4 className="text-md font-semibold text-gray-700 mb-4 capitalize">
                {category} Cursors ({cursors.length})
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {cursors.map((cursor) => (
                  <CursorCard key={cursor.value} cursor={cursor} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CSS Output */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 lg:p-6">
          <h3 className="text-lg font-semibold mb-4">Generated CSS</h3>
          
          {selectedCursorData && (
            <div className="mb-4 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">{selectedCursorData.name}</h4>
              <p className="text-blue-800 text-sm mb-2">{selectedCursorData.description}</p>
              <p className="text-blue-700 text-sm"><strong>Use case:</strong> {selectedCursorData.useCase}</p>
              {state.showCompatibility && (
                <div className="mt-2">
                  <p className="text-blue-700 text-sm"><strong>Browser support:</strong></p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {selectedCursorData.compatibility.map((browser) => (
                      <span key={browser} className="px-2 py-1 bg-blue-200 text-blue-800 text-xs rounded">
                        {browser}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-2">CSS Property</label>
              <div className="bg-gray-900 text-green-400 p-3 rounded-lg font-mono text-sm">
                {currentCursorCSS}
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-2">CSS Rule</label>
              <div className="bg-gray-900 text-green-400 p-3 rounded-lg font-mono text-sm whitespace-pre">
                {generateCursorRule('.element', state.selectedCursor, customCursor)}
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-4">
            <button
              onClick={() => copyCSS(currentCursorCSS)}
              className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
            >
              {copiedCode ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copiedCode ? 'Copied!' : 'Copy Property'}
            </button>
            <button
              onClick={() => copyCSS(generateCursorRule('.element', state.selectedCursor, customCursor))}
              className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <Copy className="w-4 h-4" />
              Copy Rule
            </button>
          </div>
        </div>
      </div>

      {/* Fullscreen Overlay */}
      {fullscreen && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-50" onClick={() => setFullscreen(false)} />
      )}

      <CSSCursorStylePreviewerSEOContent />
      
      <RelatedTools
        currentTool="css-cursor-style-previewer"
        tools={['css-filter-tester', 'css-animation-previewer', 'neumorphism-generator']}
      />
    </>
  );
}