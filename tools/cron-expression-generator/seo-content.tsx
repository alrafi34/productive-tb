import { toolConfig } from "./config";

export default function CronExpressionGeneratorSEOContent() {
  return (
    <div className="mt-12 prose prose-gray max-w-4xl mx-auto">
      <div className="bg-white rounded-xl border border-gray-200 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          About Cron Expression Generator
        </h2>
        
        <div className="space-y-6 text-gray-700">
          <p>
            The <strong>Cron Expression Generator</strong> is a visual tool that helps developers, DevOps engineers, 
            and system administrators create cron expressions without memorizing the complex syntax. Build cron 
            schedules using intuitive dropdown selectors and see the human-readable description instantly.
          </p>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">What are Cron Expressions?</h3>
            <p>
              Cron expressions are time-based job scheduling strings used in Unix-like operating systems. 
              They consist of five fields representing minute, hour, day of month, month, and day of week. 
              These expressions are widely used in:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Linux cron jobs for system automation</li>
              <li>CI/CD pipelines (Jenkins, GitHub Actions, GitLab CI)</li>
              <li>Cloud schedulers (AWS CloudWatch Events, Google Cloud Scheduler)</li>
              <li>Kubernetes CronJobs for container orchestration</li>
              <li>Backend job schedulers and task automation tools</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Key Features</h3>
            <ul className="list-disc list-inside space-y-1">
              {toolConfig.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Common Cron Examples</h3>
            <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm space-y-2">
              <div><code>*/5 * * * *</code> - Every 5 minutes</div>
              <div><code>0 */2 * * *</code> - Every 2 hours</div>
              <div><code>0 9 * * 1-5</code> - Every weekday at 9 AM</div>
              <div><code>0 0 1 * *</code> - First day of every month at midnight</div>
              <div><code>30 3 * * 0</code> - Every Sunday at 3:30 AM</div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">How to Use</h3>
            <ol className="list-decimal list-inside space-y-2">
              <li>Use the visual builder dropdowns to select your desired schedule</li>
              <li>Or paste an existing cron expression to parse and edit it</li>
              <li>View the generated cron expression and human-readable description</li>
              <li>Copy the expression or description to your clipboard</li>
              <li>Use common presets for quick setup of typical schedules</li>
            </ol>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Cron Field Format</h3>
            <p>
              Cron expressions follow the format: <code>minute hour day-of-month month day-of-week</code>
            </p>
            <div className="bg-gray-50 rounded-lg p-4 mt-2">
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-sm">
                <div className="text-center">
                  <div className="font-semibold">Minute</div>
                  <div className="text-gray-600">0-59</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold">Hour</div>
                  <div className="text-gray-600">0-23</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold">Day of Month</div>
                  <div className="text-gray-600">1-31</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold">Month</div>
                  <div className="text-gray-600">1-12</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold">Day of Week</div>
                  <div className="text-gray-600">0-6 (Sun-Sat)</div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Special Characters</h3>
            <ul className="list-disc list-inside space-y-1">
              <li><code>*</code> - Matches any value (wildcard)</li>
              <li><code>,</code> - Separates multiple values (e.g., 1,3,5)</li>
              <li><code>-</code> - Defines ranges (e.g., 1-5 for Monday to Friday)</li>
              <li><code>/</code> - Defines step values (e.g., */5 for every 5 units)</li>
            </ul>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-2">💡 Pro Tip</h4>
            <p className="text-blue-800 text-sm">
              Always test your cron expressions in a development environment before deploying to production. 
              Use this tool to validate syntax and understand exactly when your jobs will run.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}