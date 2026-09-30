import ToolFaq from "@/components/ToolFaq";
import { cssCursorStylePreviewerConfig } from "./config";

import React from 'react';

export default function CSSCursorStylePreviewerSEOContent() {
  // Same questions as the FAQPage schema
  const { faq } = cssCursorStylePreviewerConfig.seo;
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* How to Use Guide */}
      <section className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">How to Use the CSS Cursor Style Previewer</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">1. Browse Cursor Types</h3>
            <p className="text-gray-600 mb-3">
              Explore our comprehensive collection of CSS cursor types organized by categories:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
              <li><strong>Basic:</strong> auto, default, none</li>
              <li><strong>Interactive:</strong> pointer, help, context-menu, progress, wait</li>
              <li><strong>Text:</strong> text, vertical-text</li>
              <li><strong>Drag:</strong> grab, grabbing, move, copy, alias</li>
              <li><strong>Resize:</strong> All directional resize cursors</li>
              <li><strong>Zoom:</strong> zoom-in, zoom-out</li>
              <li><strong>Special:</strong> crosshair, cell, all-scroll, no-drop, not-allowed</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">2. Test in Preview Area</h3>
            <p className="text-gray-600">
              Move your mouse over the large preview area to see how each cursor looks and behaves. 
              The draggable element helps you test grab and grabbing cursors in action.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">3. Interactive UI Testing</h3>
            <p className="text-gray-600">
              Test cursors on real UI elements like buttons, inputs, links, and draggable components 
              to understand how they work in practical scenarios.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">4. Copy CSS Code</h3>
            <p className="text-gray-600">
              Get the exact CSS code for any cursor style. Copy individual properties or complete CSS rules 
              ready to paste into your stylesheets.
            </p>
          </div>
        </div>
      </section>

      {/* CSS Cursor Guide */}
      <section className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Complete Guide to CSS Cursors</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Understanding CSS Cursor Property</h3>
            <p className="text-gray-600 mb-4">
              The CSS cursor property specifies the mouse cursor to be displayed when pointing over an element. 
              It's essential for creating intuitive user interfaces that guide user interactions.
            </p>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">Basic Syntax:</h4>
              <code className="text-sm bg-gray-900 text-green-400 p-2 rounded block">
                cursor: pointer;
              </code>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">When to Use Different Cursors</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-gray-800">pointer</h4>
                  <p className="text-sm text-gray-600">Links, buttons, clickable elements</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">text</h4>
                  <p className="text-sm text-gray-600">Text inputs, editable content</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">grab/grabbing</h4>
                  <p className="text-sm text-gray-600">Draggable elements, maps</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">resize cursors</h4>
                  <p className="text-sm text-gray-600">Resizable elements, table columns</p>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-gray-800">wait/progress</h4>
                  <p className="text-sm text-gray-600">Loading states, processing</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">not-allowed</h4>
                  <p className="text-sm text-gray-600">Disabled elements, forbidden actions</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">crosshair</h4>
                  <p className="text-sm text-gray-600">Drawing tools, precise selection</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">zoom-in/zoom-out</h4>
                  <p className="text-sm text-gray-600">Image viewers, maps</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Custom Cursors</h3>
            <p className="text-gray-600 mb-3">
              You can use custom cursor images with the url() function:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <code className="text-sm bg-gray-900 text-green-400 p-2 rounded block">
                cursor: url('custom-cursor.png') 10 10, pointer;
              </code>
              <p className="text-sm text-gray-600 mt-2">
                The numbers (10 10) specify the hotspot coordinates, and 'pointer' is the fallback cursor.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Best Practices */}
      <section className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">CSS Cursor Best Practices</h2>
        
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
            <div>
              <h4 className="font-semibold text-gray-800">Use Semantic Cursors</h4>
              <p className="text-gray-600">Choose cursors that match the expected interaction (pointer for clickable, text for editable)</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
            <div>
              <h4 className="font-semibold text-gray-800">Provide Fallbacks</h4>
              <p className="text-gray-600">Always include fallback cursors for custom cursor images</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
            <div>
              <h4 className="font-semibold text-gray-800">Consider Accessibility</h4>
              <p className="text-gray-600">Ensure cursor changes are meaningful and don't confuse users with disabilities</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
            <div>
              <h4 className="font-semibold text-gray-800">Test Across Browsers</h4>
              <p className="text-gray-600">Cursor appearance can vary between browsers and operating systems</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
            <div>
              <h4 className="font-semibold text-gray-800">Optimize Custom Cursors</h4>
              <p className="text-gray-600">Keep custom cursor files small (under 32x32px) for best performance</p>
            </div>
          </div>
        </div>
      </section>

      <ToolFaq items={faq} />

      {/* Technical Details */}
      <section className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Technical Implementation</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">CSS Cursor Syntax</h3>
            <div className="bg-gray-50 p-4 rounded-lg space-y-3">
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">Basic cursor:</h4>
                <code className="text-sm bg-gray-900 text-green-400 p-2 rounded block">
                  .element &#123; cursor: pointer; &#125;
                </code>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">Custom cursor with fallback:</h4>
                <code className="text-sm bg-gray-900 text-green-400 p-2 rounded block">
                  .element &#123; cursor: url('cursor.png') 10 10, pointer; &#125;
                </code>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">Multiple fallbacks:</h4>
                <code className="text-sm bg-gray-900 text-green-400 p-2 rounded block">
                  .element &#123; cursor: url('cursor.png'), url('fallback.cur'), pointer; &#125;
                </code>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">JavaScript Cursor Control</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <code className="text-sm bg-gray-900 text-green-400 p-2 rounded block whitespace-pre">
{`// Change cursor dynamically
element.style.cursor = 'pointer';

// During drag operations
element.addEventListener('mousedown', () => {
  element.style.cursor = 'grabbing';
});

element.addEventListener('mouseup', () => {
  element.style.cursor = 'grab';
});`}
              </code>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}