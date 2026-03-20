export default function DailyCalorieCalculatorSEO() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is a daily calorie calculator?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A daily calorie calculator estimates how many calories you need each day based on age, sex, height, weight, activity level, and goal."
        }
      },
      {
        "@type": "Question",
        name: "How accurate are calorie calculator results?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Calorie targets are evidence-based estimates. Real-world needs vary, so adjust intake based on 2 to 4 weeks of consistent progress tracking."
        }
      },
      {
        "@type": "Question",
        name: "What is the difference between BMR and TDEE?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "BMR is the calories your body needs at complete rest. TDEE includes BMR plus movement, exercise, and digestion, so it reflects full daily energy burn."
        }
      },
      {
        "@type": "Question",
        name: "How many calories should I cut to lose weight?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A common approach is a 250 to 500 calorie daily deficit for slower, sustainable fat loss. Larger deficits may be harder to maintain."
        }
      },
      {
        "@type": "Question",
        name: "Can I use imperial units in this tool?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. You can switch between metric and imperial units, and the calculator converts values so your results stay consistent."
        }
      },
      {
        "@type": "Question",
        name: "Does this calculator provide macronutrient targets?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. It provides daily protein, carbohydrate, and fat targets in both calories and grams based on your selected goal."
        }
      },
      {
        "@type": "Question",
        name: "Is my calorie history stored privately?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Saved history is stored in your browser local storage on your own device and can be cleared anytime."
        }
      },
      {
        "@type": "Question",
        name: "Is this a medical diagnosis tool?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. This is an educational planning tool. For medical conditions or nutrition therapy, consult a licensed healthcare professional."
        }
      }
    ]
  };

  return (
    <div className="mt-12 max-w-4xl mx-auto space-y-8 text-gray-700">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          Daily Calorie Calculator for Weight Loss, Maintenance, and Weight Gain
        </h2>
        <p className="leading-relaxed mb-4" style={{ fontFamily: "var(--font-body)" }}>
          This free Daily Calorie Calculator helps you estimate how many calories you should eat each day to reach your
          goal. Whether you are searching for a calorie deficit calculator, maintenance calories calculator, or a
          weight gain calorie planner, this tool gives personalized numbers in seconds.
        </p>
        <p className="leading-relaxed mb-4" style={{ fontFamily: "var(--font-body)" }}>
          The calculator uses your age, sex, height, weight, and activity level to estimate your Basal Metabolic Rate
          (BMR) and Total Daily Energy Expenditure (TDEE). From there, it creates target calories for mild, moderate,
          and aggressive weight loss, plus steady weight gain options. You also get a practical macronutrient breakdown
          in grams and calories.
        </p>
        <p className="leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
          If you want an online calorie calculator that is accurate, simple, and mobile-friendly, this page is built
          to cover both beginner and advanced use cases without forcing account signup.
        </p>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How Daily Calorie Needs Are Calculated
        </h2>
        <p className="leading-relaxed mb-4" style={{ fontFamily: "var(--font-body)" }}>
          This tool uses the Mifflin-St Jeor equation, one of the most trusted methods for estimating calorie needs in
          adults. It first calculates BMR, then applies an activity multiplier to estimate TDEE.
        </p>
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 text-sm font-mono text-gray-800 mb-4">
          Men: BMR = (10 x kg) + (6.25 x cm) - (5 x age) + 5
          <br />
          Women: BMR = (10 x kg) + (6.25 x cm) - (5 x age) - 161
          <br />
          TDEE = BMR x Activity Multiplier
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              Activity Multipliers Used
            </h3>
            <ul className="space-y-1 text-sm" style={{ fontFamily: "var(--font-body)" }}>
              <li>Sedentary: 1.2 (little or no exercise)</li>
              <li>Lightly active: 1.375 (light exercise 1 to 3 days per week)</li>
              <li>Moderately active: 1.55 (moderate exercise 3 to 5 days per week)</li>
              <li>Very active: 1.725 (hard exercise 6 to 7 days per week)</li>
              <li>Extremely active: 1.9 (physical job plus training)</li>
            </ul>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              Why This Method Is Useful
            </h3>
            <ul className="space-y-1 text-sm" style={{ fontFamily: "var(--font-body)" }}>
              <li>Balances precision with real-world usability</li>
              <li>Works well for maintenance and goal planning</li>
              <li>Supports metric and imperial inputs</li>
              <li>Gives actionable targets, not a single number</li>
              <li>Easy to adjust after progress check-ins</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          Calorie Targets by Goal
        </h2>
        <p className="leading-relaxed mb-4" style={{ fontFamily: "var(--font-body)" }}>
          After estimating maintenance calories, the calculator applies a structured deficit or surplus to create daily
          targets for different goals. This helps users choose a pace that matches lifestyle, training level, and
          adherence.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="bg-red-50 p-4 rounded-lg border border-red-100">
            <h3 className="font-semibold text-red-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              Weight Loss
            </h3>
            <ul className="space-y-1 text-red-700" style={{ fontFamily: "var(--font-body)" }}>
              <li>Mild: -250 calories per day</li>
              <li>Moderate: -500 calories per day</li>
              <li>Aggressive: -1000 calories per day</li>
            </ul>
          </div>
          <div className="bg-green-50 p-4 rounded-lg border border-green-100">
            <h3 className="font-semibold text-green-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              Maintenance
            </h3>
            <p className="text-green-700" style={{ fontFamily: "var(--font-body)" }}>
              Maintenance calories are set at your TDEE estimate to help you keep body weight stable.
            </p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <h3 className="font-semibold text-blue-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              Weight Gain
            </h3>
            <ul className="space-y-1 text-blue-700" style={{ fontFamily: "var(--font-body)" }}>
              <li>Mild: +250 calories per day</li>
              <li>Moderate: +500 calories per day</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          Macro Breakdown Included
        </h2>
        <p className="leading-relaxed mb-4" style={{ fontFamily: "var(--font-body)" }}>
          A calorie number is useful, but meal planning is easier with macro targets. This tool provides protein,
          carbs, and fats in percentages, calories, and grams so you can apply results to your daily food log.
        </p>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
            <h3 className="font-semibold text-blue-900 mb-1" style={{ fontFamily: "var(--font-heading)" }}>
              Protein
            </h3>
            <p className="text-blue-700" style={{ fontFamily: "var(--font-body)" }}>
              25% to 30% depending on goal. Converted at 4 calories per gram.
            </p>
          </div>
          <div className="bg-green-50 rounded-lg p-4 border border-green-100">
            <h3 className="font-semibold text-green-900 mb-1" style={{ fontFamily: "var(--font-heading)" }}>
              Carbohydrates
            </h3>
            <p className="text-green-700" style={{ fontFamily: "var(--font-body)" }}>
              45% to 50% depending on goal. Converted at 4 calories per gram.
            </p>
          </div>
          <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-100">
            <h3 className="font-semibold text-yellow-900 mb-1" style={{ fontFamily: "var(--font-heading)" }}>
              Fats
            </h3>
            <p className="text-yellow-700" style={{ fontFamily: "var(--font-body)" }}>
              25% across goals. Converted at 9 calories per gram.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use This Daily Calorie Calculator
        </h2>
        <ol className="space-y-3 leading-relaxed list-decimal list-inside" style={{ fontFamily: "var(--font-body)" }}>
          <li>Choose metric or imperial units.</li>
          <li>Enter your age, sex, weight, and height.</li>
          <li>Select the activity level that matches your weekly movement.</li>
          <li>Pick your goal: loss, maintenance, or gain.</li>
          <li>Review your target daily calories plus BMR and TDEE.</li>
          <li>Use macro grams to plan meals and track consistency.</li>
          <li>Save results in local history and compare over time.</li>
        </ol>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          Why This Tool Is Better Than Many Basic Calorie Calculators
        </h2>
        <p className="leading-relaxed mb-4" style={{ fontFamily: "var(--font-body)" }}>
          Many online calculators only output one maintenance number. This tool is designed for decision making, not
          just rough estimation.
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              What You Get Here
            </h3>
            <ul className="space-y-1 text-sm" style={{ fontFamily: "var(--font-body)" }}>
              <li>Mifflin-St Jeor based BMR and TDEE estimates</li>
              <li>Goal presets for mild to aggressive deficit and surplus</li>
              <li>Macro breakdown in grams and calories</li>
              <li>Metric and imperial support with clean conversion</li>
              <li>Copy actions and local history for progress tracking</li>
              <li>Fast experience on mobile and desktop</li>
            </ul>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              Why This Matters for Real Results
            </h3>
            <ul className="space-y-1 text-sm" style={{ fontFamily: "var(--font-body)" }}>
              <li>Clear targets improve adherence and reduce guesswork</li>
              <li>Macro guidance helps users translate targets into meals</li>
              <li>History makes weekly adjustment easier</li>
              <li>Simple interface lowers bounce from confusing tools</li>
              <li>Comprehensive content answers broader search intent</li>
              <li>No cluttered workflow or forced complexity</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          Accuracy Tips and Common Mistakes
        </h2>
        <p className="leading-relaxed mb-4" style={{ fontFamily: "var(--font-body)" }}>
          Calorie calculators are starting points. Your actual requirement may differ based on sleep, stress, hormone
          status, training quality, food logging accuracy, and metabolic adaptation.
        </p>
        <ul className="space-y-2 text-sm leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
          <li>Use a realistic activity level. Overestimating activity is the most common error.</li>
          <li>Track body weight trend for 2 to 4 weeks before making major changes.</li>
          <li>Adjust intake by about 100 to 200 calories if progress stalls.</li>
          <li>Keep protein adequate during fat loss to support lean mass retention.</li>
          <li>Prioritize consistency over perfection. Daily fluctuations are normal.</li>
        </ul>
      </section>

      <section className="bg-white rounded-xl border border-amber-200 bg-amber-50 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-amber-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          Important Health Disclaimer
        </h2>
        <p className="leading-relaxed text-amber-800 mb-4" style={{ fontFamily: "var(--font-body)" }}>
          This calorie needs calculator is for educational planning only. It does not diagnose or treat medical
          conditions. Pregnant or breastfeeding individuals, people under 18, and anyone with metabolic or clinical
          nutrition needs should consult a qualified healthcare professional before following a calorie target.
        </p>
        <p className="leading-relaxed text-amber-800" style={{ fontFamily: "var(--font-body)" }}>
          Avoid extreme calorie restriction. Sustainable changes are safer and generally more effective long-term.
        </p>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Frequently Asked Questions
        </h2>
        <div className="space-y-5">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-1" style={{ fontFamily: "var(--font-heading)" }}>
              What is a daily calorie calculator?
            </h3>
            <p className="text-sm leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              It is a tool that estimates your daily calorie needs for goals like fat loss, maintenance, or weight
              gain based on your profile and activity level.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-1" style={{ fontFamily: "var(--font-heading)" }}>
              What is the difference between BMR and TDEE?
            </h3>
            <p className="text-sm leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              BMR reflects calories needed at complete rest. TDEE includes your total daily activity and is more useful
              for setting calorie intake.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-1" style={{ fontFamily: "var(--font-heading)" }}>
              How many calories should I cut to lose weight?
            </h3>
            <p className="text-sm leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              A deficit of about 250 to 500 calories per day is common for steady progress. Aggressive deficits can
              work short-term but may be harder to sustain.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-1" style={{ fontFamily: "var(--font-heading)" }}>
              Does this tool also estimate macros?
            </h3>
            <p className="text-sm leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              Yes. It calculates protein, carbs, and fats in both calories and grams to make your nutrition target
              easier to execute.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-1" style={{ fontFamily: "var(--font-heading)" }}>
              Is my data private?
            </h3>
            <p className="text-sm leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              Calculations run in-browser. Saved history is kept in local storage on your device and can be cleared
              at any time.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-1" style={{ fontFamily: "var(--font-heading)" }}>
              Is this tool enough for medical nutrition planning?
            </h3>
            <p className="text-sm leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              No. Use it as a baseline estimator. For medical or therapeutic plans, work with a licensed professional.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
