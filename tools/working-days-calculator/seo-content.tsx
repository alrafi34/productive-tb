export default function WorkingDaysCalculatorSEO() {
  return (
    <div className="mt-12 prose prose-gray max-w-4xl mx-auto">
      <div className="bg-gray-50 rounded-xl p-8 border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">About the Working Days Calculator</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">What is a Working Days Calculator?</h3>
            <p className="text-gray-600 mb-4">
              A working days calculator determines the number of business days between two dates, 
              with flexible weekend configurations (1-day or 2-day weekends) and optional exclusion 
              of public holidays or custom dates.
            </p>
            
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Common Use Cases</h3>
            <ul className="text-gray-600 space-y-1">
              <li>• Project planning and timeline estimation</li>
              <li>• HR scheduling and leave calculations</li>
              <li>• Payroll and billing calculations</li>
              <li>• Contract deadline planning</li>
              <li>• Service level agreement tracking</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Key Features</h3>
            <ul className="text-gray-600 space-y-1">
              <li>• Flexible weekend configuration (1 or 2 days)</li>
              <li>• Custom holiday support</li>
              <li>• Real-time calculation</li>
              <li>• Detailed breakdown display</li>
              <li>• Copy and export results</li>
              <li>• Mobile-friendly interface</li>
            </ul>
            
            <h3 className="text-lg font-semibold text-gray-800 mb-3 mt-6">How It Works</h3>
            <p className="text-gray-600">
              Simply select your start and end dates, choose your weekend configuration 
              (2-day, 1-day Saturday, 1-day Sunday, or no weekends), optionally add any holidays 
              to exclude, and the calculator will instantly show you the exact number of working 
              days along with a detailed breakdown.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}