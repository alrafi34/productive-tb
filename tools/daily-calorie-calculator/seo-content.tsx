export default function DailyCalorieCalculatorSEO() {
  return (
    <div className="mt-16 max-w-4xl mx-auto prose prose-gray">
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          About Daily Calorie Calculator
        </h2>
        
        <div className="space-y-6 text-gray-600">
          <p>
            Our Daily Calorie Calculator helps you determine your exact calorie needs based on your personal metrics, 
            activity level, and weight goals. Using the scientifically-proven Mifflin-St Jeor equation, get accurate 
            recommendations for weight loss, maintenance, or gain.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">What is TDEE?</h3>
              <p className="text-sm mb-3">
                Total Daily Energy Expenditure (TDEE) is the total number of calories you burn in a day, including:
              </p>
              <ul className="space-y-1 text-sm">
                <li>• <strong>BMR:</strong> Basal Metabolic Rate (calories at rest)</li>
                <li>• <strong>Exercise:</strong> Planned physical activity</li>
                <li>• <strong>NEAT:</strong> Non-exercise activity thermogenesis</li>
                <li>• <strong>TEF:</strong> Thermic effect of food</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Activity Levels</h3>
              <ul className="space-y-2 text-sm">
                <li>• <strong>Sedentary:</strong> Desk job, no exercise</li>
                <li>• <strong>Lightly Active:</strong> Light exercise 1-3 days/week</li>
                <li>• <strong>Moderately Active:</strong> Exercise 3-5 days/week</li>
                <li>• <strong>Very Active:</strong> Hard exercise 6-7 days/week</li>
                <li>• <strong>Extremely Active:</strong> Physical job + exercise</li>
              </ul>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Weight Goals & Calorie Adjustments</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="bg-red-50 p-4 rounded-lg">
                <h4 className="font-semibold text-red-800 mb-2">Weight Loss</h4>
                <ul className="space-y-1 text-red-700">
                  <li>• Mild: -250 cal/day (0.5 lb/week)</li>
                  <li>• Moderate: -500 cal/day (1 lb/week)</li>
                  <li>• Aggressive: -1000 cal/day (2 lbs/week)</li>
                </ul>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">Maintenance</h4>
                <p className="text-green-700">
                  Eat at your TDEE level to maintain current weight and body composition.
                </p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Weight Gain</h4>
                <ul className="space-y-1 text-blue-700">
                  <li>• Mild: +250 cal/day (0.5 lb/week)</li>
                  <li>• Moderate: +500 cal/day (1 lb/week)</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Macronutrient Guidelines</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="grid grid-cols-3 gap-4 text-center text-sm">
                <div>
                  <div className="font-semibold text-blue-600">Protein</div>
                  <div className="text-gray-600">25-30% of calories</div>
                  <div className="text-xs text-gray-500">4 cal/gram</div>
                </div>
                <div>
                  <div className="font-semibold text-green-600">Carbohydrates</div>
                  <div className="text-gray-600">45-50% of calories</div>
                  <div className="text-xs text-gray-500">4 cal/gram</div>
                </div>
                <div>
                  <div className="font-semibold text-yellow-600">Fats</div>
                  <div className="text-gray-600">25% of calories</div>
                  <div className="text-xs text-gray-500">9 cal/gram</div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">How to Use This Calculator</h3>
            <ol className="space-y-2 text-sm list-decimal list-inside">
              <li>Enter your age, gender, weight, and height accurately</li>
              <li>Select your activity level based on weekly exercise</li>
              <li>Choose your weight goal (loss, maintenance, or gain)</li>
              <li>Review your personalized calorie and macro recommendations</li>
              <li>Track your progress and adjust as needed</li>
            </ol>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <h4 className="font-semibold text-amber-800 mb-2">Important Notes</h4>
            <ul className="text-amber-700 text-sm space-y-1">
              <li>• These are estimates - individual needs may vary</li>
              <li>• Consult healthcare professionals for medical advice</li>
              <li>• Extreme calorie restrictions can be harmful</li>
              <li>• Focus on sustainable, long-term changes</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}