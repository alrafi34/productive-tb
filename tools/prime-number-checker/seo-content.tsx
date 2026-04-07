export default function PrimeNumberCheckerSEO() {
  return (
    <div className="mt-12 prose prose-gray max-w-4xl mx-auto">
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">About Prime Number Checker</h2>
        
        <div className="space-y-6 text-gray-700">
          <p>
            Our Prime Number Checker is a powerful mathematical tool that helps you instantly determine whether any number is prime 
            and generate all prime numbers up to a specified limit using the efficient Sieve of Eratosthenes algorithm.
          </p>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">What are Prime Numbers?</h3>
            <p>
              A prime number is a natural number greater than 1 that has no positive divisors other than 1 and itself. 
              Prime numbers are fundamental building blocks in mathematics and play crucial roles in cryptography, 
              computer science, and number theory.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Key Features</h3>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Instant Prime Checking:</strong> Quickly determine if any number is prime with detailed explanations</li>
              <li><strong>Sieve of Eratosthenes:</strong> Generate all prime numbers up to N using this ancient, efficient algorithm</li>
              <li><strong>Educational Explanations:</strong> Learn why numbers are or aren't prime with factor breakdowns</li>
              <li><strong>Export Options:</strong> Copy results or download prime lists as CSV or JSON files</li>
              <li><strong>Performance Optimized:</strong> Handle large numbers efficiently with optimized algorithms</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">How to Use</h3>
            <ol className="list-decimal list-inside space-y-2">
              <li>Choose between "Prime Check" mode to test individual numbers or "Generate Primes" mode</li>
              <li>Enter your number in the input field</li>
              <li>For prime checking: Get instant results with explanations</li>
              <li>For prime generation: Set your upper limit and generate all primes up to that number</li>
              <li>Copy results or export your prime list for further use</li>
            </ol>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">The Sieve of Eratosthenes</h3>
            <p>
              The Sieve of Eratosthenes is an ancient algorithm for finding all prime numbers up to a given limit. 
              It works by iteratively marking the multiples of each prime number starting from 2. 
              This method is highly efficient and remains one of the best ways to generate lists of prime numbers.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Applications</h3>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Education:</strong> Perfect for students learning number theory and mathematics</li>
              <li><strong>Cryptography:</strong> Prime numbers are essential for RSA encryption and security</li>
              <li><strong>Programming:</strong> Useful for algorithm practice and mathematical programming challenges</li>
              <li><strong>Research:</strong> Analyze prime distribution patterns and mathematical properties</li>
            </ul>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-2">💡 Did You Know?</h4>
            <p className="text-blue-800 text-sm">
              The largest known prime number has over 24 million digits! Prime numbers become increasingly rare as numbers get larger, 
              but there are infinitely many of them - a fact proven by the ancient Greek mathematician Euclid.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}