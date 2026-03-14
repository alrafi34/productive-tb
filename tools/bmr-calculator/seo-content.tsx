import React from 'react';

export default function ToolSEOContent() {
  return (
    <div className="mt-16 prose prose-gray max-w-4xl mx-auto">
      <div className="bg-gray-50 rounded-2xl p-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">What is BMR (Basal Metabolic Rate)?</h2>
        <p className="text-gray-700 mb-4">
          Basal Metabolic Rate (BMR) is the number of calories your body needs to maintain basic physiological functions 
          while at rest. This includes breathing, circulation, cell production, nutrient processing, and protein synthesis.
        </p>
        <p className="text-gray-700">
          BMR represents approximately 60-75% of your total daily energy expenditure and is crucial for understanding 
          your daily caloric needs for weight maintenance, loss, or gain.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-3">🔬 Mifflin-St Jeor Equation</h3>
          <p className="text-gray-700 mb-3">Our calculator uses the Mifflin-St Jeor equation, considered the most accurate formula:</p>
          <div className="bg-gray-100 p-3 rounded-lg text-sm font-mono">
            <p><strong>Men:</strong> BMR = (10 × weight) + (6.25 × height) - (5 × age) + 5</p>
            <p><strong>Women:</strong> BMR = (10 × weight) + (6.25 × height) - (5 × age) - 161</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-3">⚡ TDEE Calculation</h3>
          <p className="text-gray-700 mb-3">Total Daily Energy Expenditure multiplies BMR by activity factors:</p>
          <ul className="text-sm text-gray-600 space-y-1">
            <li><strong>Sedentary:</strong> BMR × 1.2</li>
            <li><strong>Light Activity:</strong> BMR × 1.375</li>
            <li><strong>Moderate Activity:</strong> BMR × 1.55</li>
            <li><strong>Active:</strong> BMR × 1.725</li>
            <li><strong>Very Active:</strong> BMR × 1.9</li>
          </ul>
        </div>
      </div>

      <div className="bg-blue-50 rounded-2xl p-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Use the BMR Calculator</h2>
        <ol className="list-decimal list-inside space-y-3 text-gray-700">
          <li><strong>Enter your weight</strong> - Use kilograms (metric) or pounds (imperial)</li>
          <li><strong>Input your height</strong> - Use centimeters (metric) or inches (imperial)</li>
          <li><strong>Specify your age</strong> - Enter your current age in years</li>
          <li><strong>Select your gender</strong> - Male or female (affects the calculation formula)</li>
          <li><strong>Choose activity level</strong> - Select the option that best describes your lifestyle</li>
          <li><strong>View results</strong> - See your BMR and TDEE calculated instantly</li>
        </ol>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="text-center p-6 bg-green-50 rounded-xl">
          <div className="text-3xl mb-2">🎯</div>
          <h3 className="font-semibold text-gray-900 mb-2">Weight Loss</h3>
          <p className="text-sm text-gray-600">Eat 500-750 calories below your TDEE for 1-1.5 lbs/week loss</p>
        </div>
        <div className="text-center p-6 bg-blue-50 rounded-xl">
          <div className="text-3xl mb-2">⚖️</div>
          <h3 className="font-semibold text-gray-900 mb-2">Maintenance</h3>
          <p className="text-sm text-gray-600">Eat calories equal to your TDEE to maintain current weight</p>
        </div>
        <div className="text-center p-6 bg-orange-50 rounded-xl">
          <div className="text-3xl mb-2">💪</div>
          <h3 className="font-semibold text-gray-900 mb-2">Weight Gain</h3>
          <p className="text-sm text-gray-600">Eat 300-500 calories above your TDEE for healthy weight gain</p>
        </div>
      </div>

      <div className="bg-yellow-50 rounded-2xl p-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Factors Affecting BMR</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Increases BMR:</h3>
            <ul className="text-gray-700 space-y-1 text-sm">
              <li>• Higher muscle mass</li>
              <li>• Younger age</li>
              <li>• Male gender</li>
              <li>• Taller height</li>
              <li>• Higher body weight</li>
              <li>• Pregnancy/breastfeeding</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Decreases BMR:</h3>
            <ul className="text-gray-700 space-y-1 text-sm">
              <li>• Lower muscle mass</li>
              <li>• Older age</li>
              <li>• Calorie restriction</li>
              <li>• Certain medications</li>
              <li>• Thyroid disorders</li>
              <li>• Genetics</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Is BMR the same as RMR?</h3>
            <p className="text-gray-700 text-sm">
              BMR (Basal Metabolic Rate) and RMR (Resting Metabolic Rate) are similar but not identical. 
              BMR is measured under strict conditions, while RMR is more practical and typically 10-20% higher.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">How accurate is the Mifflin-St Jeor equation?</h3>
            <p className="text-gray-700 text-sm">
              The Mifflin-St Jeor equation is considered the most accurate predictive equation, with about 90% accuracy 
              for healthy individuals. However, individual variations can occur due to genetics, body composition, and health conditions.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Should I eat exactly my BMR calories?</h3>
            <p className="text-gray-700 text-sm">
              No, you should eat according to your TDEE, not BMR. BMR only accounts for basic functions, 
              while TDEE includes all daily activities. Eating only BMR calories would be too restrictive for most people.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}