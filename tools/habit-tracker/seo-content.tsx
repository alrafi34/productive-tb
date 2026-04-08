import React from 'react';

export default function HabitTrackerSEO() {
  return (
    <div className="mt-16 prose prose-gray max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Free Online Habit Tracker - Build Consistency & Track Progress
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              🎯 Why Track Habits?
            </h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• Build lasting positive routines</li>
              <li>• Visualize your progress over time</li>
              <li>• Stay motivated with streak tracking</li>
              <li>• Identify patterns in your behavior</li>
              <li>• Create accountability for your goals</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              ✨ Key Features
            </h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• One-click daily habit completion</li>
              <li>• Automatic streak calculation</li>
              <li>• Weekly progress visualization</li>
              <li>• Monthly calendar heatmap</li>
              <li>• Export/import your data</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            🚀 How to Use This Habit Tracker
          </h3>
          <div className="grid md:grid-cols-3 gap-6 text-sm text-gray-600">
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">1. Create Habits</h4>
              <p>Add custom habits like "Drink 2L Water", "Exercise", or "Read 30 minutes". Choose colors to organize them.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">2. Track Daily</h4>
              <p>Click the completion button each day. Watch your streaks grow and see weekly progress bars fill up.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">3. Analyze Progress</h4>
              <p>View monthly calendars, track completion rates, and celebrate milestones with confetti animations.</p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            💡 Popular Habits to Track
          </h3>
          <div className="flex flex-wrap gap-2">
            {[
              'Drink 8 glasses of water',
              'Exercise for 30 minutes',
              'Read for 20 minutes',
              'Meditate for 10 minutes',
              'Write in journal',
              'Take vitamins',
              'Walk 10,000 steps',
              'Practice gratitude',
              'Learn something new',
              'Get 8 hours of sleep'
            ].map(habit => (
              <span key={habit} className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-full">
                {habit}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            🔒 Privacy & Data Storage
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            Your habit data is stored locally in your browser using localStorage. No account required, no data sent to servers. 
            Your habits remain completely private and accessible only to you. Use the export feature to backup your data or 
            transfer it between devices.
          </p>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            📱 Mobile-Friendly Design
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            This habit tracker works perfectly on all devices - desktop, tablet, and mobile. The responsive design ensures 
            you can track your habits anywhere, anytime. Large touch targets make it easy to mark habits complete on mobile devices.
          </p>
        </div>
      </div>
    </div>
  );
}