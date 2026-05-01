export default function ProjectTimelineCalculatorSEO() {
  return (
    <div className="mt-12 prose prose-gray max-w-none">
      <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-100">
        
        <h2 className="text-2xl font-bold text-gray-900 mb-4">About the Project Timeline Calculator</h2>
        
        <p className="text-gray-700 leading-relaxed mb-6">
          The <strong>Project Timeline Calculator</strong> is a powerful scheduling tool designed to help project managers, contractors, architects, and engineers estimate project duration using task dependencies and parallel execution logic. By breaking down projects into individual tasks with dependencies, this calculator provides accurate timeline estimates, identifies critical paths, and helps optimize project scheduling for construction, software development, and other complex projects.
        </p>

        <div className="grid md:grid-cols-2 gap-6 my-8">
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <span className="text-2xl">📅</span>
              Key Features
            </h3>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Dynamic task creation with dependencies</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Sequential and parallel task execution</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Critical path method (CPM) analysis</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Visual Gantt chart timeline</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Circular dependency detection</span>
              </li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <span className="text-2xl">🎯</span>
              Use Cases
            </h3>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Construction project scheduling</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Software development planning</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Event planning and coordination</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Manufacturing process optimization</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Academic project management</span>
              </li>
            </ul>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-4 mt-8">Timeline Calculation Method</h3>
        
        <div className="space-y-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-900 mb-2">Critical Path Method (CPM)</h4>
            <p className="text-sm text-blue-800 mb-2">
              The calculator uses the Critical Path Method to determine the longest sequence of dependent tasks that determines the minimum project duration.
            </p>
            <code className="bg-white px-3 py-1 rounded border border-blue-300 text-xs block mt-2">
              Project Duration = Maximum(Earliest Finish Time of all tasks)
            </code>
            <div className="text-xs text-blue-700 mt-2">
              Tasks on the critical path have zero slack time and directly impact project completion.
            </div>
          </div>

          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h4 className="font-semibold text-green-900 mb-2">Task Scheduling Formula</h4>
            <p className="text-sm text-green-800 mb-2">
              Each task's start time depends on the completion of its dependencies.
            </p>
            <code className="bg-white px-3 py-1 rounded border border-green-300 text-xs block mt-2">
              Earliest Start = Maximum(Earliest Finish of all dependencies)
            </code>
            <code className="bg-white px-3 py-1 rounded border border-green-300 text-xs block mt-2">
              Earliest Finish = Earliest Start + Task Duration
            </code>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-4">Task Dependencies Explained</h3>
        
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-900 mb-2">Sequential Tasks</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Must wait for dependencies to complete</li>
              <li>• Creates linear task chains</li>
              <li>• Extends overall project duration</li>
              <li>• Common in construction phases</li>
            </ul>
            <div className="mt-2 text-xs text-blue-700">
              <strong>Example:</strong> Foundation → Framing → Roofing
            </div>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h4 className="font-semibold text-green-900 mb-2">Parallel Tasks</h4>
            <ul className="text-sm text-green-800 space-y-1">
              <li>• Can run simultaneously</li>
              <li>• Reduces overall project time</li>
              <li>• Requires separate resources</li>
              <li>• Optimizes project efficiency</li>
            </ul>
            <div className="mt-2 text-xs text-green-700">
              <strong>Example:</strong> Electrical + Plumbing (both after framing)
            </div>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-4">Working Days Configuration</h3>
        
        <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-6 rounded-xl border border-orange-200 mb-6">
          <p className="text-gray-700 mb-4">
            The calculator adjusts completion dates based on your working schedule, accounting for weekends and non-working days.
          </p>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="text-orange-600 font-bold">5 Days/Week:</span>
              <span>Monday to Friday (excludes weekends) - typical office schedule</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-orange-600 font-bold">6 Days/Week:</span>
              <span>Monday to Saturday (excludes Sunday) - common in construction</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-orange-600 font-bold">7 Days/Week:</span>
              <span>Every day (no weekends) - continuous operations or urgent projects</span>
            </li>
          </ul>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-4">Practical Examples</h3>
        
        <div className="space-y-4 mb-6">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2">Example 1: Simple Sequential Project</h4>
            <div className="text-sm text-gray-700 space-y-1">
              <p><strong>Tasks:</strong></p>
              <p>• Planning: 3 days (no dependencies)</p>
              <p>• Design: 5 days (after Planning)</p>
              <p>• Implementation: 8 days (after Design)</p>
              <p><strong>Timeline:</strong> Planning (Days 1-3) → Design (Days 4-8) → Implementation (Days 9-16)</p>
              <p className="text-primary font-semibold pt-2"><strong>Total Duration:</strong> 16 days</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2">Example 2: Parallel Optimization</h4>
            <div className="text-sm text-gray-700 space-y-1">
              <p><strong>Tasks:</strong></p>
              <p>• Foundation: 5 days (no dependencies)</p>
              <p>• Electrical: 4 days (after Foundation, parallel)</p>
              <p>• Plumbing: 3 days (after Foundation, parallel)</p>
              <p>• Finishing: 6 days (after Electrical and Plumbing)</p>
              <p><strong>Timeline:</strong> Foundation (Days 1-5) → Electrical & Plumbing (Days 6-9) → Finishing (Days 10-15)</p>
              <p className="text-primary font-semibold pt-2"><strong>Total Duration:</strong> 15 days (vs 18 if sequential)</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2">Example 3: Complex Dependencies</h4>
            <div className="text-sm text-gray-700 space-y-1">
              <p><strong>Tasks:</strong></p>
              <p>• Site Prep: 2 days</p>
              <p>• Foundation: 4 days (after Site Prep)</p>
              <p>• Framing: 6 days (after Foundation)</p>
              <p>• Electrical: 3 days (after Framing)</p>
              <p>• Plumbing: 3 days (after Framing, parallel with Electrical)</p>
              <p>• Inspection: 1 day (after Electrical and Plumbing)</p>
              <p className="text-primary font-semibold pt-2"><strong>Total Duration:</strong> 16 days</p>
              <p className="text-red-600 text-xs"><strong>Critical Path:</strong> Site Prep → Foundation → Framing → Electrical → Inspection</p>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-4">Understanding Critical Path</h3>
        
        <div className="space-y-3 mb-6">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-gray-900">What is Critical Path?</h4>
            </div>
            <p className="text-sm text-gray-700">
              The critical path is the longest sequence of dependent tasks that determines the minimum project duration. Any delay in critical path tasks directly delays the entire project.
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-gray-900">Why Critical Path Matters</h4>
            </div>
            <p className="text-sm text-gray-700">
              Focus resources and attention on critical path tasks to ensure on-time completion. Non-critical tasks have slack time and can be delayed without affecting the project deadline.
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-gray-900">Optimizing Project Timeline</h4>
            </div>
            <p className="text-sm text-gray-700">
              To reduce project duration, focus on shortening critical path tasks or converting sequential tasks to parallel where possible.
            </p>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-4">Common Construction Phases</h3>
        
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2">Foundation Phase</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Site Preparation (2-3 days)</li>
              <li>• Excavation (1-2 days)</li>
              <li>• Foundation Pour (3-5 days)</li>
              <li>• Curing Time (7-14 days)</li>
            </ul>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2">Structure Phase</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Framing (5-10 days)</li>
              <li>• Roofing (3-6 days)</li>
              <li>• Exterior Walls (4-8 days)</li>
              <li>• Windows & Doors (2-4 days)</li>
            </ul>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2">Systems Phase</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Electrical Rough-in (2-4 days)</li>
              <li>• Plumbing Rough-in (2-4 days)</li>
              <li>• HVAC Installation (3-5 days)</li>
              <li>• Insulation (1-3 days)</li>
            </ul>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2">Finishing Phase</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Drywall (3-6 days)</li>
              <li>• Flooring (3-7 days)</li>
              <li>• Interior Painting (2-5 days)</li>
              <li>• Final Fixtures (2-4 days)</li>
            </ul>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-4">Advanced Features</h3>
        
        <div className="space-y-3 mb-6">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-gray-900">Visual Gantt Chart</h4>
            </div>
            <p className="text-sm text-gray-700">
              Interactive timeline visualization showing task duration, dependencies, and critical path with color-coded bars.
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-gray-900">Dependency Validation</h4>
            </div>
            <p className="text-sm text-gray-700">
              Automatic detection of circular dependencies that would make the project impossible to complete.
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-gray-900">Project Templates</h4>
            </div>
            <p className="text-sm text-gray-700">
              Pre-configured project templates for common scenarios like house construction, office renovation, and software development.
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-gray-900">Real-time Updates</h4>
            </div>
            <p className="text-sm text-gray-700">
              Instant recalculation of project timeline as you modify tasks, durations, or dependencies.
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-gray-900">Export Options</h4>
            </div>
            <p className="text-sm text-gray-700">
              Export project timelines to text reports or JSON format for integration with other project management tools.
            </p>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-4">Project Management Best Practices</h3>
        
        <div className="bg-gradient-to-r from-primary/5 to-primary/10 p-6 rounded-xl border border-primary/20 mb-6">
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="text-primary text-xl flex-shrink-0">✓</span>
              <span><strong>Break Down Complex Tasks:</strong> Divide large tasks into smaller, manageable components</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary text-xl flex-shrink-0">✓</span>
              <span><strong>Identify Dependencies Early:</strong> Map out task relationships before starting the project</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary text-xl flex-shrink-0">✓</span>
              <span><strong>Add Buffer Time:</strong> Include contingency time for unexpected delays or complications</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary text-xl flex-shrink-0">✓</span>
              <span><strong>Monitor Critical Path:</strong> Focus resources on critical tasks to maintain schedule</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary text-xl flex-shrink-0">✓</span>
              <span><strong>Optimize Parallel Work:</strong> Identify opportunities to run tasks simultaneously</span>
            </li>
          </ul>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-4">Why Use This Calculator?</h3>
        
        <div className="bg-gradient-to-r from-primary/5 to-primary/10 p-6 rounded-xl border border-primary/20">
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="text-primary text-xl flex-shrink-0">✓</span>
              <span><strong>Instant Timeline Calculation:</strong> Get project duration estimates in real-time</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary text-xl flex-shrink-0">✓</span>
              <span><strong>Critical Path Analysis:</strong> Identify tasks that directly impact project completion</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary text-xl flex-shrink-0">✓</span>
              <span><strong>Visual Timeline:</strong> See project flow with interactive Gantt chart visualization</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary text-xl flex-shrink-0">✓</span>
              <span><strong>Dependency Management:</strong> Handle complex task relationships with ease</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary text-xl flex-shrink-0">✓</span>
              <span><strong>No Software Required:</strong> Works entirely in your browser, no installation needed</span>
            </li>
          </ul>
        </div>

        <div className="mt-8 p-6 bg-yellow-50 border border-yellow-200 rounded-xl">
          <h4 className="font-semibold text-yellow-900 mb-2 flex items-center gap-2">
            <span className="text-xl">💡</span>
            Important Note
          </h4>
          <p className="text-sm text-yellow-800">
            This calculator provides timeline estimates based on the task durations and dependencies you specify. Actual project timelines may vary due to resource availability, weather conditions, permit delays, scope changes, and unforeseen complications. The calculator assumes ideal conditions and does not account for resource constraints, skill levels, or external factors. Always add buffer time for contingencies and consult with project management professionals for complex projects. Use these estimates as a starting point for detailed project planning and scheduling.
          </p>
        </div>

      </div>
    </div>
  );
}