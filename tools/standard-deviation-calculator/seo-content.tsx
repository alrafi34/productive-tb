export default function StandardDeviationCalculatorSEOContent() {
  return (
    <div className="mt-12 max-w-4xl mx-auto space-y-8 text-gray-700">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">How the Standard Deviation Calculator Works</h2>
        <p>
          The Standard Deviation Calculator uses statistical formulas to measure how spread out numbers are from the average (mean). Here's how it works:
        </p>
        <div className="bg-gray-50 p-4 rounded-lg space-y-3">
          <div>
            <h3 className="font-semibold text-gray-900">Step 1: Parse Input</h3>
            <p className="text-sm">Enter numbers separated by commas, spaces, tabs, or on new lines. The calculator automatically detects and parses all valid numbers.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Step 2: Calculate Mean</h3>
            <p className="text-sm">The mean (average) is calculated by summing all numbers and dividing by the count.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Step 3: Calculate Variance</h3>
            <p className="text-sm">Variance measures the average squared distance from the mean. Population variance divides by N, sample variance divides by N-1.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Step 4: Calculate Standard Deviation</h3>
            <p className="text-sm">Standard deviation is the square root of variance, showing spread in the same units as the original data.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Step 5: Additional Statistics</h3>
            <p className="text-sm">The calculator also provides median, min, max, range, sum, and count for complete data analysis.</p>
          </div>
        </div>
      </section>

      {/* Formulas */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Statistical Formulas</h2>
        <div className="bg-blue-50 p-4 rounded-lg space-y-3 font-mono text-sm">
          <div>
            <p className="font-semibold text-blue-900">Mean (Average):</p>
            <p className="text-blue-800">Mean = Σx / N</p>
          </div>
          <div>
            <p className="font-semibold text-blue-900">Population Variance:</p>
            <p className="text-blue-800">σ² = Σ(x - mean)² / N</p>
          </div>
          <div>
            <p className="font-semibold text-blue-900">Sample Variance:</p>
            <p className="text-blue-800">s² = Σ(x - mean)² / (N - 1)</p>
          </div>
          <div>
            <p className="font-semibold text-blue-900">Population Standard Deviation:</p>
            <p className="text-blue-800">σ = √(σ²)</p>
          </div>
          <div>
            <p className="font-semibold text-blue-900">Sample Standard Deviation:</p>
            <p className="text-blue-800">s = √(s²)</p>
          </div>
          <div>
            <p className="font-semibold text-blue-900">Median:</p>
            <p className="text-blue-800">Middle value when data is sorted</p>
          </div>
          <div>
            <p className="font-semibold text-blue-900">Range:</p>
            <p className="text-blue-800">Range = Max - Min</p>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Common Use Cases</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">📚 Education</h3>
            <p className="text-sm">Students learning statistics can quickly verify calculations and understand data distribution concepts.</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">📊 Data Analysis</h3>
            <p className="text-sm">Analysts use standard deviation to measure data variability and identify outliers in datasets.</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">🔬 Research</h3>
            <p className="text-sm">Researchers analyze experimental results and validate statistical measures for publications.</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">💼 Business</h3>
            <p className="text-sm">Business analysts measure performance variability, quality control, and risk assessment.</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">📈 Finance</h3>
            <p className="text-sm">Financial professionals calculate investment volatility and portfolio risk metrics.</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">🏥 Healthcare</h3>
            <p className="text-sm">Medical professionals analyze patient data and clinical trial results for statistical significance.</p>
          </div>
        </div>
      </section>

      {/* Population vs Sample */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Population vs Sample Standard Deviation</h2>
        <div className="space-y-3">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Population Standard Deviation (σ)</h3>
            <p className="text-sm mb-2">Use when you have data for the entire population you're studying.</p>
            <p className="text-sm font-mono text-xs">Formula: σ = √(Σ(x - mean)² / N)</p>
            <p className="text-sm mt-2">Example: Heights of all students in a specific class</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Sample Standard Deviation (s)</h3>
            <p className="text-sm mb-2">Use when you have data from a sample representing a larger population.</p>
            <p className="text-sm font-mono text-xs">Formula: s = √(Σ(x - mean)² / (N - 1))</p>
            <p className="text-sm mt-2">Example: Heights of 30 randomly selected students from a university</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">What is standard deviation?</h3>
            <p className="text-sm">Standard deviation measures how spread out numbers are from the average. A low standard deviation means numbers are close to the mean, while a high standard deviation means they're spread out.</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">What's the difference between variance and standard deviation?</h3>
            <p className="text-sm">Variance is the average squared distance from the mean. Standard deviation is the square root of variance, making it easier to interpret because it's in the same units as the original data.</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">When should I use population vs sample standard deviation?</h3>
            <p className="text-sm">Use population SD when analyzing the entire group. Use sample SD when analyzing a subset that represents a larger population. Sample SD is more commonly used in practice.</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">What does a high standard deviation mean?</h3>
            <p className="text-sm">A high standard deviation indicates that data points are spread far from the mean, showing high variability. A low standard deviation indicates data points cluster closely around the mean.</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Can I upload a CSV file?</h3>
            <p className="text-sm">Yes! The calculator supports CSV file uploads. Your CSV should have one number per line or in a column. The first row can be a header like 'value'.</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">What separators are supported?</h3>
            <p className="text-sm">The calculator automatically detects and parses numbers separated by commas, spaces, tabs, or line breaks. You can mix separators in the same input.</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Can I export my results?</h3>
            <p className="text-sm">Yes! You can export results as CSV or JSON format, copy results to clipboard, or download your dataset with statistics.</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Is my data saved?</h3>
            <p className="text-sm">Your data is stored locally in your browser using localStorage. Previous datasets appear in the history section for quick access. No data is sent to any server.</p>
          </div>
        </div>
      </section>

      {/* Example Calculations */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Example Calculations</h2>
        <div className="space-y-3">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Example 1: Simple Dataset</h3>
            <p className="text-sm mb-2"><strong>Data:</strong> 5, 7, 3, 9, 10</p>
            <p className="text-sm mb-2"><strong>Calculations:</strong></p>
            <p className="text-sm font-mono">Mean = (5+7+3+9+10) / 5 = 34 / 5 = 6.8</p>
            <p className="text-sm font-mono">Variance = ((5-6.8)² + (7-6.8)² + ... ) / 5 = 6.96</p>
            <p className="text-sm font-mono">Std Dev = √6.96 ≈ 2.64</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Example 2: Exam Scores</h3>
            <p className="text-sm mb-2"><strong>Data:</strong> 78, 82, 91, 87, 75, 88</p>
            <p className="text-sm mb-2"><strong>Results:</strong></p>
            <p className="text-sm font-mono">Mean = 83.5</p>
            <p className="text-sm font-mono">Sample Std Dev ≈ 5.6</p>
            <p className="text-sm">This shows exam scores vary by about 5.6 points from the average.</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Example 3: Business Metrics</h3>
            <p className="text-sm mb-2"><strong>Data:</strong> 120, 135, 150, 160, 140</p>
            <p className="text-sm mb-2"><strong>Results:</strong></p>
            <p className="text-sm font-mono">Mean = 141</p>
            <p className="text-sm font-mono">Std Dev ≈ 14.14</p>
            <p className="text-sm">Sales vary by about 14 units from the average of 141.</p>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Key Features</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          <div className="flex gap-2 text-sm">
            <span className="text-primary font-bold">⚡</span>
            <span>Instant calculations as you type</span>
          </div>
          <div className="flex gap-2 text-sm">
            <span className="text-primary font-bold">📊</span>
            <span>Population and sample standard deviation</span>
          </div>
          <div className="flex gap-2 text-sm">
            <span className="text-primary font-bold">📁</span>
            <span>CSV file upload support</span>
          </div>
          <div className="flex gap-2 text-sm">
            <span className="text-primary font-bold">📈</span>
            <span>Data distribution visualization</span>
          </div>
          <div className="flex gap-2 text-sm">
            <span className="text-primary font-bold">📋</span>
            <span>Copy results to clipboard</span>
          </div>
          <div className="flex gap-2 text-sm">
            <span className="text-primary font-bold">💾</span>
            <span>Export as CSV or JSON</span>
          </div>
          <div className="flex gap-2 text-sm">
            <span className="text-primary font-bold">🎲</span>
            <span>Generate random test data</span>
          </div>
          <div className="flex gap-2 text-sm">
            <span className="text-primary font-bold">📜</span>
            <span>Dataset history tracking</span>
          </div>
          <div className="flex gap-2 text-sm">
            <span className="text-primary font-bold">📱</span>
            <span>Mobile-responsive design</span>
          </div>
          <div className="flex gap-2 text-sm">
            <span className="text-primary font-bold">🔒</span>
            <span>100% client-side processing</span>
          </div>
        </div>
      </section>

      {/* Privacy & Security */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Privacy & Security</h2>
        <p className="text-sm">
          Your privacy is important to us. This Standard Deviation Calculator:
        </p>
        <ul className="space-y-2 text-sm">
          <li className="flex gap-2">
            <span className="text-primary font-bold">✓</span>
            <span>Runs 100% in your browser with no server communication</span>
          </li>
          <li className="flex gap-2">
            <span className="text-primary font-bold">✓</span>
            <span>Stores data locally using browser localStorage only</span>
          </li>
          <li className="flex gap-2">
            <span className="text-primary font-bold">✓</span>
            <span>Never collects or transmits your personal data</span>
          </li>
          <li className="flex gap-2">
            <span className="text-primary font-bold">✓</span>
            <span>Works offline after initial page load</span>
          </li>
          <li className="flex gap-2">
            <span className="text-primary font-bold">✓</span>
            <span>No tracking, analytics, or third-party scripts</span>
          </li>
        </ul>
      </section>
    </div>
  );
}
