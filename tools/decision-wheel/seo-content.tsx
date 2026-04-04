import React from 'react';

export default function DecisionWheelSEOContent() {
  return (
    <div className="mt-12 max-w-4xl mx-auto">
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <div className="prose prose-gray max-w-none">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            How to Use the Decision Wheel Spinner
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                🎯 Perfect For
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Making everyday decisions</li>
                <li>• Classroom activities and games</li>
                <li>• Team selections and assignments</li>
                <li>• Choosing restaurants or activities</li>
                <li>• Giveaway winners</li>
                <li>• Ice-breaker activities</li>
                <li>• Random task assignment</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                ⚡ Features
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Smooth canvas-based animation</li>
                <li>• Customizable spin duration</li>
                <li>• Automatic color generation</li>
                <li>• Result history tracking</li>
                <li>• Download wheel as image</li>
                <li>• Copy results to clipboard</li>
                <li>• Keyboard shortcuts (Space to spin)</li>
              </ul>
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">
              📝 How to Use
            </h3>
            <ol className="space-y-2 text-blue-800">
              <li><strong>1.</strong> Enter your options in the text area (one per line)</li>
              <li><strong>2.</strong> Use quick examples or add your own custom options</li>
              <li><strong>3.</strong> Adjust spin duration if desired (2-10 seconds)</li>
              <li><strong>4.</strong> Click "Spin the Wheel" or press Space</li>
              <li><strong>5.</strong> Watch the wheel spin and see your random result!</li>
              <li><strong>6.</strong> Copy the result or download the wheel image</li>
            </ol>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl mb-2">🎲</div>
              <h4 className="font-semibold text-gray-800">Random & Fair</h4>
              <p className="text-sm text-gray-600 mt-1">
                Uses true randomization for completely fair results
              </p>
            </div>
            
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl mb-2">🎨</div>
              <h4 className="font-semibold text-gray-800">Beautiful Design</h4>
              <p className="text-sm text-gray-600 mt-1">
                Colorful wheel with smooth spinning animation
              </p>
            </div>
            
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl mb-2">📱</div>
              <h4 className="font-semibold text-gray-800">Mobile Friendly</h4>
              <p className="text-sm text-gray-600 mt-1">
                Works perfectly on all devices and screen sizes
              </p>
            </div>
          </div>

          <div className="bg-green-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-green-900 mb-3">
              💡 Pro Tips
            </h3>
            <ul className="space-y-2 text-green-800">
              <li>• Use the shuffle feature to randomize option order</li>
              <li>• Remove duplicates to ensure fair selection</li>
              <li>• Adjust spin duration for more suspense</li>
              <li>• Download the result as an image to share</li>
              <li>• Use keyboard shortcut (Space) for quick spins</li>
              <li>• Check the history to see previous results</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}