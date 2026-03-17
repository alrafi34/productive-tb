'use client';

import React, { useState, useRef, useCallback } from 'react';
import { Copy, Upload, Info, Check } from 'lucide-react';
import { CursorType, CustomCursor, CursorPreviewState } from './types';
import { 
  cursorTypes,
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
  const [expandedCategory, setExpandedCategory] = useState<string | null>('all');
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const updateState = useCallback((updates: Partial<CursorPreviewState>) => {
    setState(prev => ({ ...prev, ...updates }));
  }, []);

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



  const selectedCursorData = cursorTypes.find(c => c.value === state.selectedCursor);
  const customCursor = state.customCursors.find(c => `custom-${c.name}` === state.selectedCursor);
  const currentCursorCSS = generateCursorCSS(state.selectedCursor, customCursor);
  const categories = getCursorsByCategory(cursorTypes);



  const CursorCard = ({ cursor }: { cursor: CursorType }) => (
    <div
      className={`bg-white border rounded-lg p-3 sm:p-4 hover:shadow-md transition-all cursor-pointer ${
        state.selectedCursor === cursor.value ? 'ring-2 ring-primary border-primary' : 'border-gray-200'
      }`}
      style={{ cursor: cursor.value }}
      onClick={() => selectCursor(cursor.value)}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <h4 className="font-semibold text-gray-900 text-sm sm:text-base truncate">{cursor.name}</h4>
        <span className={`px-2 py-1 text-xs rounded-full whitespace-nowrap ${getCategoryColor(cursor.category)}`}>
          {cursor.category}
        </span>
      </div>
      <p className="text-xs sm:text-sm text-gray-600 mb-3 line-clamp-2">{cursor.description}</p>
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs text-gray-500 font-mono truncate">{cursor.value}</span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            copyCSS(generateCursorCSS(cursor.value));
          }}
          className="text-gray-400 hover:text-primary transition-colors flex-shrink-0"
        >
          <Copy className="w-4 h-4" />
        </button>
      </div>
    </div>
  );

  const CategorySection = ({ category, cursors }: { category: string; cursors: CursorType[] }) => {
    const isExpanded = true; // Always expanded
    
    return (
      <div key={category} className="border-b border-gray-200 last:border-b-0">
        <div className="p-4 bg-gray-50">
          <h4 className="text-sm sm:text-base font-semibold text-gray-700 capitalize">
            {category} Cursors ({cursors.length})
          </h4>
        </div>
        
        <div className="px-4 pb-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
          {cursors.map((cursor) => (
            <CursorCard key={cursor.value} cursor={cursor} />
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="w-full min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-4 sm:space-y-6">

          {/* Cursor Grid */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="p-4 sm:p-6 border-b border-gray-200">
              <h3 className="text-base sm:text-lg font-semibold">All Cursor Types</h3>
            </div>
            
            <div className="divide-y divide-gray-200">
              {Object.entries(categories).map(([category, cursors]) => (
                <CategorySection key={category} category={category} cursors={cursors} />
              ))}
            </div>
          </div>

          {/* CSS Output */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold mb-4">Generated CSS</h3>
            
            {selectedCursorData && (
              <div className="mb-4 p-3 sm:p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2 text-sm sm:text-base">{selectedCursorData.name}</h4>
                <p className="text-blue-800 text-xs sm:text-sm mb-2">{selectedCursorData.description}</p>
                <p className="text-blue-700 text-xs sm:text-sm"><strong>Use case:</strong> {selectedCursorData.useCase}</p>
                {state.showCompatibility && (
                  <div className="mt-3">
                    <p className="text-blue-700 text-xs sm:text-sm font-semibold mb-2"><strong>Browser support:</strong></p>
                    <div className="flex flex-wrap gap-1 sm:gap-2">
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
                <label className="text-xs sm:text-sm font-medium text-gray-700 block mb-2">CSS Property</label>
                <div className="bg-gray-900 text-green-400 p-3 rounded-lg font-mono text-xs sm:text-sm overflow-x-auto">
                  {currentCursorCSS}
                </div>
              </div>
              
              <div>
                <label className="text-xs sm:text-sm font-medium text-gray-700 block mb-2">CSS Rule</label>
                <div className="bg-gray-900 text-green-400 p-3 rounded-lg font-mono text-xs sm:text-sm whitespace-pre overflow-x-auto">
                  {generateCursorRule('.element', state.selectedCursor, customCursor)}
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row flex-wrap gap-2 mt-4">
              <button
                onClick={() => copyCSS(currentCursorCSS)}
                className="flex items-center justify-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors text-sm sm:text-base flex-1 sm:flex-none"
              >
                {copiedCode ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copiedCode ? 'Copied!' : 'Copy Property'}
              </button>
              <button
                onClick={() => copyCSS(generateCursorRule('.element', state.selectedCursor, customCursor))}
                className="flex items-center justify-center gap-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors text-sm sm:text-base flex-1 sm:flex-none"
              >
                <Copy className="w-4 h-4" />
                <span>Copy Rule</span>
              </button>
            </div>
          </div>
        </div>
      </div>



      <CSSCursorStylePreviewerSEOContent />
      
      <RelatedTools
        currentTool="css-cursor-style-previewer"
        tools={['css-filter-tester', 'css-animation-previewer', 'neumorphism-generator']}
      />
    </>
  );
}
