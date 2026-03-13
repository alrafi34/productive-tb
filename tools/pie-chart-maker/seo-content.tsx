import React from 'react';

export default function PieChartSEO() {
  return (
    <div className="space-y-12 py-12 border-t border-gray-200">
      <div className="space-y-6">
        <h2 className="text-3xl font-black text-gray-900">What is a Pie Chart?</h2>
        <p className="text-gray-600 leading-relaxed">
          A pie chart is a circular statistical graphic divided into slices to illustrate numerical proportions. Each slice represents a category and its size is proportional to the percentage it represents of the whole. Pie charts are one of the most popular ways to visualize data because they make it easy to see the relative sizes of different categories at a glance.
        </p>
      </div>

      <div className="space-y-6">
        <h2 className="text-3xl font-black text-gray-900">When to Use Pie Charts</h2>
        <ul className="space-y-3 text-gray-600">
          <li className="flex gap-3">
            <span className="text-primary font-black">✓</span>
            <span><strong>Part-to-Whole Relationships:</strong> Show how different parts make up a whole, like budget allocation or market share.</span>
          </li>
          <li className="flex gap-3">
            <span className="text-primary font-black">✓</span>
            <span><strong>Percentage Distribution:</strong> Display how percentages add up to 100%, such as survey results or demographic data.</span>
          </li>
          <li className="flex gap-3">
            <span className="text-primary font-black">✓</span>
            <span><strong>Limited Categories:</strong> Work best with 2-5 categories; too many slices make the chart hard to read.</span>
          </li>
          <li className="flex gap-3">
            <span className="text-primary font-black">✓</span>
            <span><strong>Presentations:</strong> Ideal for business presentations, reports, and infographics where visual impact matters.</span>
          </li>
          <li className="flex gap-3">
            <span className="text-primary font-black">✓</span>
            <span><strong>Quick Comparisons:</strong> Allow viewers to quickly understand the relative proportions of different segments.</span>
          </li>
        </ul>
      </div>

      <div className="space-y-6">
        <h2 className="text-3xl font-black text-gray-900">How to Use This Pie Chart Maker</h2>
        <ol className="space-y-4 text-gray-600">
          <li className="flex gap-3">
            <span className="font-black text-primary flex-shrink-0">1.</span>
            <span><strong>Enter Your Data:</strong> Add labels and values in the data table. Each row represents one slice of the pie.</span>
          </li>
          <li className="flex gap-3">
            <span className="font-black text-primary flex-shrink-0">2.</span>
            <span><strong>Customize Colors:</strong> Click on the color input to change the color of each slice to match your preferences.</span>
          </li>
          <li className="flex gap-3">
            <span className="font-black text-primary flex-shrink-0">3.</span>
            <span><strong>Set Chart Title:</strong> Enter a descriptive title for your chart that will appear at the top.</span>
          </li>
          <li className="flex gap-3">
            <span className="font-black text-primary flex-shrink-0">4.</span>
            <span><strong>Configure Display Options:</strong> Choose whether to show percentages, labels, and legend based on your needs.</span>
          </li>
          <li className="flex gap-3">
            <span className="font-black text-primary flex-shrink-0">5.</span>
            <span><strong>Export Your Chart:</strong> Download as PNG for presentations, SVG for web use, or CSV for data backup.</span>
          </li>
        </ol>
      </div>

      <div className="space-y-6">
        <h2 className="text-3xl font-black text-gray-900">Pie Chart Examples</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h3 className="font-bold text-gray-900">Sales Distribution</h3>
            <div className="bg-gray-50 p-4 rounded-lg text-sm space-y-1">
              <div className="flex justify-between"><span>Product A</span><span className="font-bold">40%</span></div>
              <div className="flex justify-between"><span>Product B</span><span className="font-bold">25%</span></div>
              <div className="flex justify-between"><span>Product C</span><span className="font-bold">20%</span></div>
              <div className="flex justify-between"><span>Product D</span><span className="font-bold">15%</span></div>
            </div>
          </div>
          <div className="space-y-3">
            <h3 className="font-bold text-gray-900">Budget Allocation</h3>
            <div className="bg-gray-50 p-4 rounded-lg text-sm space-y-1">
              <div className="flex justify-between"><span>Rent</span><span className="font-bold">40%</span></div>
              <div className="flex justify-between"><span>Food</span><span className="font-bold">25%</span></div>
              <div className="flex justify-between"><span>Transport</span><span className="font-bold">20%</span></div>
              <div className="flex justify-between"><span>Other</span><span className="font-bold">15%</span></div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-3xl font-black text-gray-900">Key Features</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <h3 className="font-bold text-gray-900">📊 Real-Time Updates</h3>
            <p className="text-gray-600">Chart updates instantly as you modify data values and labels.</p>
          </div>
          <div className="space-y-2">
            <h3 className="font-bold text-gray-900">🎨 Custom Colors</h3>
            <p className="text-gray-600">Choose any color for each slice using the built-in color picker.</p>
          </div>
          <div className="space-y-2">
            <h3 className="font-bold text-gray-900">📥 Multiple Export Formats</h3>
            <p className="text-gray-600">Download as PNG for presentations, SVG for web, or CSV for data.</p>
          </div>
          <div className="space-y-2">
            <h3 className="font-bold text-gray-900">📋 CSV Import/Export</h3>
            <p className="text-gray-600">Easily import data from spreadsheets or export for further analysis.</p>
          </div>
          <div className="space-y-2">
            <h3 className="font-bold text-gray-900">🎲 Random Data Generator</h3>
            <p className="text-gray-600">Generate sample data instantly to test the chart functionality.</p>
          </div>
          <div className="space-y-2">
            <h3 className="font-bold text-gray-900">💾 Chart History</h3>
            <p className="text-gray-600">Save and load your previous charts from local storage.</p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-3xl font-black text-gray-900">Tips for Effective Pie Charts</h2>
        <div className="space-y-4 text-gray-600">
          <p>
            <strong>1. Limit Categories:</strong> Use no more than 5-6 slices. Too many slices make the chart confusing and hard to read.
          </p>
          <p>
            <strong>2. Use Contrasting Colors:</strong> Choose colors that are visually distinct from each other to make slices easy to differentiate.
          </p>
          <p>
            <strong>3. Start at 12 O'Clock:</strong> Arrange slices starting from the top and going clockwise for better readability.
          </p>
          <p>
            <strong>4. Include Percentages:</strong> Always show percentages so viewers understand the exact proportion each slice represents.
          </p>
          <p>
            <strong>5. Add a Legend:</strong> Include a legend to clearly identify what each color represents, especially for presentations.
          </p>
          <p>
            <strong>6. Use Descriptive Labels:</strong> Make sure category names are clear and concise for easy understanding.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-3xl font-black text-gray-900">Use Cases</h2>
        <div className="space-y-4 text-gray-600">
          <p>
            <strong>Business Reports:</strong> Show market share, revenue distribution, or departmental budgets in executive presentations.
          </p>
          <p>
            <strong>Educational Materials:</strong> Help students understand proportions and percentages in mathematics and statistics classes.
          </p>
          <p>
            <strong>Survey Analysis:</strong> Visualize poll results and survey responses to show public opinion on various topics.
          </p>
          <p>
            <strong>Financial Planning:</strong> Display budget allocation, expense distribution, or investment portfolio composition.
          </p>
          <p>
            <strong>Social Media Content:</strong> Create engaging infographics for social media posts and blog articles.
          </p>
          <p>
            <strong>Data Analysis:</strong> Quickly visualize categorical data to identify patterns and proportions in datasets.
          </p>
        </div>
      </div>

      <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8 space-y-4">
        <h3 className="text-xl font-black text-gray-900">Ready to Create Your Pie Chart?</h3>
        <p className="text-gray-600">
          Start using this free Pie Chart Maker today. No signup required, no server processing, 100% browser-based. Perfect for students, professionals, and data enthusiasts!
        </p>
      </div>
    </div>
  );
}
