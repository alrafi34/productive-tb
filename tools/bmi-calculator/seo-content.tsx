export default function BmiCalculatorSEO() {
  const faqItems = [
    {
      q: "What is BMI?",
      a: "BMI (Body Mass Index) is a numerical value derived from a person's weight and height. It is calculated by dividing weight in kilograms by the square of height in metres (kg/m²). The World Health Organization uses BMI as a population-level screening tool to classify underweight, normal weight, overweight, and obesity in adults. It does not directly measure body fat, but it correlates with body fat percentage in most adults and is widely used because it requires only two measurements and no specialist equipment.",
    },
    {
      q: "What is a healthy BMI range?",
      a: "For adults aged 18 and over, the WHO defines a healthy BMI as 18.5 to 24.9. Below 18.5 is classified as underweight, 25.0 to 29.9 as overweight, and 30.0 and above as obese. These thresholds are population-level guidelines — individual health depends on many additional factors including muscle mass, bone density, age, sex, and ethnicity. Some health authorities use adjusted thresholds for Asian populations, where health risks begin at lower BMI values.",
    },
    {
      q: "Is BMI the same for men and women?",
      a: "The BMI formula itself is identical for men and women. However, the same BMI value may represent different body fat percentages between sexes — women naturally carry more body fat than men at the same BMI. A BMI of 24 in a woman typically corresponds to a higher body fat percentage than the same BMI in a man. This is why some clinicians complement BMI with waist circumference or body fat percentage measurements when assessing health risk.",
    },
    {
      q: "Does BMI apply to children and teenagers?",
      a: "Standard adult BMI categories do not apply to children and adolescents. For people under 18, clinicians use BMI-for-age percentile charts that account for normal growth patterns and sex differences at different ages. A child in the 85th–94th BMI percentile for their age and sex is considered overweight; at or above the 95th percentile is considered obese. This calculator is designed for adults aged 18 and over.",
    },
    {
      q: "Can BMI be inaccurate?",
      a: "Yes, BMI has well-documented limitations. Athletes and heavily muscular individuals often fall into the overweight or obese category despite having low body fat — their extra weight is lean muscle mass, not fat. Conversely, older adults can have a normal BMI while carrying too little muscle (sarcopenia) and too much visceral fat. Pregnant women, people with edema, and those with certain medical conditions will also get misleading BMI readings. BMI is best used as a starting point, not a definitive health verdict.",
    },
    {
      q: "What are the Devine and Robinson ideal weight formulas?",
      a: "The Devine formula (1974) and Robinson formula (1983) are two of the most commonly cited medical formulas for estimating ideal body weight from height. Both are applied in clinical settings — particularly in pharmacology for drug dosing — and are expressed in terms of height above 5 feet (60 inches). Devine: males = 50 kg + 2.3 kg per inch over 5 ft; females = 45.5 kg + 2.3 kg per inch over 5 ft. Robinson: males = 52 kg + 1.9 kg per inch over 5 ft; females = 49 kg + 1.7 kg per inch over 5 ft. The two formulas typically differ by 2–5 kg for the same height, which is why this calculator shows both as a range rather than a single target.",
    },
    {
      q: "How do I calculate BMI in imperial units?",
      a: "In imperial units, the formula is: BMI = (weight in pounds × 703) ÷ (height in inches)². For example, someone who is 5 ft 9 in (69 inches) and weighs 170 lbs: BMI = (170 × 703) ÷ (69²) = 119,510 ÷ 4,761 ≈ 25.1. This calculator handles the conversion automatically — select Imperial, enter your height in feet and inches and your weight in pounds, and it applies the formula correctly without any manual conversion.",
    },
    {
      q: "What BMI is considered obese?",
      a: "A BMI of 30.0 or above is classified as obese by the WHO and most national health authorities. Obesity is further subdivided into Class I (30.0–34.9), Class II (35.0–39.9), and Class III or severe obesity (40.0 and above). Each class carries progressively higher risks of type 2 diabetes, cardiovascular disease, hypertension, and other conditions. If your BMI falls in the obese range, this calculator's healthy weight range output shows exactly how many kilograms or pounds would bring you into the normal range.",
    },
    {
      q: "Is my data stored when I use this BMI calculator?",
      a: "No data is sent to any server. All calculations happen locally in your browser using JavaScript. The optional history feature stores previous results in your browser's localStorage — this data stays on your device and is not accessible to anyone else. Clearing your browser data will remove the saved history.",
    },
    {
      q: "What should I do if my BMI is outside the healthy range?",
      a: "A BMI result outside the 18.5–24.9 healthy range is a prompt to investigate further, not a diagnosis. If your BMI indicates underweight, overweight, or obesity, the most useful next step is to consult a doctor or registered dietitian who can assess your full health picture — including body composition, blood markers, blood pressure, and lifestyle factors. Small, sustained changes (500-calorie daily deficit for weight loss, or strength training to build muscle) typically have greater long-term impact than rapid interventions.",
    },
  ];

  const howToSteps = [
    ["Select your unit system", "Choose Metric (kg and cm) or Imperial (lb, ft, in) using the toggle at the top of the calculator. The inputs and outputs update instantly — you can switch at any time without re-entering values."],
    ["Enter your height", "Type your height in the height field. In metric mode, enter centimetres (e.g. 175). In imperial mode, enter feet and inches separately (e.g. 5 ft 9 in)."],
    ["Enter your weight", "Type your current weight. In metric mode, enter kilograms. In imperial mode, enter pounds. The BMI result updates as soon as both fields have valid values."],
    ["Read your BMI result", "Your BMI score appears immediately alongside your category (Underweight, Normal Weight, Overweight, or Obese) and a color-coded visual scale showing where you sit in the range."],
    ["Check your healthy weight range", "Below the BMI score, the calculator shows the minimum and maximum weight that corresponds to a healthy BMI (18.5–24.9) for your exact height — in whichever unit system you selected."],
    ["Review ideal weight estimates", "The Devine and Robinson formula results give you a clinical reference point for ideal weight. These are used in medical settings for drug dosing and provide a more nuanced target than a simple BMI midpoint."],
    ["Use the weight simulator", "Drag the simulator slider to explore how your BMI would change at different weights. This is useful for setting a realistic weight goal — you can see the BMI impact of losing or gaining 5, 10, or 20 kg/lbs."],
  ];

  return (
    <>

      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is a BMI Calculator?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            A <strong>BMI calculator</strong> is a free health screening tool that computes your Body Mass Index from
            your height and weight. BMI is the most widely used metric for classifying adult weight status — it is
            referenced by the World Health Organization, the CDC, and healthcare providers in every country as a
            first-pass indicator of whether a person's weight relative to their height falls within a healthy range.
          </p>
          <p>
            The challenge with most online BMI calculators is that they return a single number and stop there. That
            number — say, 27.4 — is not actionable on its own. You need context: What category does that place you in?
            How far is it from the healthy range? How much would you need to weigh to reach a healthy BMI at your
            height? What does that translate to in actual kilograms or pounds?
          </p>
          <p>
            This calculator answers all of those questions in one place. Beyond the BMI score, it shows your{" "}
            <strong>BMI category</strong>, the <strong>healthy weight range for your exact height</strong>, and{" "}
            <strong>ideal weight estimates</strong> using the clinically established Devine and Robinson formulas.
            It supports both metric (kg/cm) and imperial (lb/ft/in) units, runs entirely in your browser, and requires
            no account or sign-up.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How BMI Is Calculated
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            BMI uses one of two equivalent formulas depending on your unit system. Both produce the same result — the
            calculator converts internally so switching units never changes your BMI value.
          </p>
          <div className="grid md:grid-cols-2 gap-4 my-4">
            <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4">
              <p className="text-sm font-medium text-gray-500 mb-1">Metric Formula</p>
              <p className="font-mono text-base text-gray-900 font-semibold">BMI = weight (kg) ÷ height (m)²</p>
              <p className="text-xs text-gray-500 mt-2">Example: 70 kg ÷ (1.75 m)² = 22.9</p>
            </div>
            <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4">
              <p className="text-sm font-medium text-gray-500 mb-1">Imperial Formula</p>
              <p className="font-mono text-base text-gray-900 font-semibold">BMI = (weight (lb) × 703) ÷ height (in)²</p>
              <p className="text-xs text-gray-500 mt-2">Example: (154 lb × 703) ÷ 69² = 22.7</p>
            </div>
          </div>
          <p>
            The <strong>healthy weight range</strong> is derived by back-solving the formula: the minimum healthy
            weight at your height equals 18.5 × height(m)², and the maximum equals 24.9 × height(m)². The{" "}
            <strong>ideal weight estimates</strong> use the Devine and Robinson formulas — both are based on height
            in inches above 5 feet and are widely used in clinical pharmacology for drug dosing calculations.
          </p>
        </div>
      </section>

      {/* ── 3. Step-by-Step Usage ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the BMI Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Step-by-Step Guide</h3>
            <ol className="space-y-4 text-gray-600 leading-relaxed">
              {howToSteps.map(([title, desc], i) => (
                <li key={i} className="flex items-start">
                  <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0 font-semibold">{i + 1}</span>
                  <span><strong>{title}:</strong> {desc}</span>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>What This Calculator Provides</h3>
            <ul className="space-y-2 text-gray-600">
              {[
                "BMI score to 1 decimal place",
                "WHO category: Underweight, Normal, Overweight, Obese",
                "Color-coded visual scale showing your position",
                "Healthy weight range (min–max kg or lb) for your height",
                "Ideal weight via Devine formula (clinical reference)",
                "Ideal weight via Robinson formula (clinical reference)",
                "Weight simulator slider — preview BMI at target weights",
                "Local history log for tracking changes over time",
                "Metric and imperial — switch anytime without data loss",
                "100% browser-based — nothing sent to any server",
              ].map((f, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="text-green-500 flex-shrink-0">✓</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>


      {/* ── 4. Use Cases ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Real-World Use Cases
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              title: "Setting a Realistic Weight-Loss Goal",
              scenario: "A 5 ft 8 in (173 cm) person weighing 210 lbs (95 kg) has a BMI of 31.9 — Class I Obesity. They use the healthy weight range output to find that reaching a BMI of 24.9 requires a weight of 164 lbs (74 kg). The weight simulator shows that losing just 20 lbs (9 kg) would bring them to 190 lbs — a BMI of 28.9, out of the obese range and into overweight. That intermediate milestone is psychologically more achievable than the full 46-lb target.",
            },
            {
              title: "Pre-Appointment Health Screening",
              scenario: "A person scheduling their annual physical checks their BMI the day before so they can have an informed conversation with their doctor. They calculate a BMI of 26.2 — borderline overweight — and note their healthy weight range is 128–172 lbs for their 5 ft 6 in height. Armed with this context, they ask their doctor about waist circumference and cholesterol as additional risk indicators rather than just hearing their BMI read out in the appointment.",
            },
            {
              title: "Fitness Plan Progress Tracking",
              scenario: "Someone starting a 12-week training program checks their BMI at the start (29.1), at week 4 (28.3), week 8 (27.6), and week 12 (26.8). Using the built-in history log, they can see the trend clearly. The simulator shows they need to drop another 8 kg to reach a healthy BMI — which becomes the goal for their next training block.",
            },
            {
              title: "Clinical Drug Dosing Reference",
              scenario: "A pharmacist or medical student uses the Devine and Robinson ideal weight outputs as a quick cross-reference when verifying weight-based drug dosing calculations. Both formulas are well-established in pharmacology — the calculator surfaces both so the clinician can apply whichever protocol their institution uses, with the values available in both kg and lb.",
            },
            {
              title: "Evaluating Underweight Risk",
              scenario: "A parent notices their adult child looks noticeably thin after a stressful year. They use the calculator together — at 5 ft 4 in and 100 lbs, the BMI comes out at 17.2, classified as Underweight. The healthy weight range shows they need to be between 108 and 145 lbs. This concrete range helps frame a constructive conversation about nutrition and prompts a GP visit.",
            },
            {
              title: "Insurance and Health Assessment Forms",
              scenario: "Many health insurance applications, employer wellness programs, and gym membership intake forms ask for BMI. Rather than calculating manually or using a formula from memory, someone fills in their height and weight here, gets the precise BMI value with two decimal places, and copies it directly into the form — confident the number is accurate.",
            },
          ].map(({ title, scenario }) => (
            <div key={title} className="bg-gray-50 border border-gray-100 rounded-lg p-5">
              <h3 className="font-semibold text-gray-800 mb-2 text-sm" style={{ fontFamily: "var(--font-heading)" }}>{title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{scenario}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 5. Tips & Best Practices ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Tips &amp; Best Practices
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Pro Tips</h3>
            <ul className="space-y-3 text-gray-600 leading-relaxed">
              {[
                "Weigh yourself at the same time each day — ideally first thing in the morning before eating or drinking — to get a consistent baseline. Body weight can fluctuate 1–3 kg throughout the day due to food, water, and activity.",
                "Use BMI alongside waist circumference for a more complete picture. A waist measurement above 88 cm (35 in) for women or 102 cm (40 in) for men indicates elevated cardiovascular risk regardless of BMI category.",
                "If you are highly muscular (strength athletes, bodybuilders), your BMI will likely over-estimate your health risk. In this case, body fat percentage — measured by DEXA scan, skinfold calipers, or bioelectrical impedance — is a more accurate indicator.",
                "The healthy weight range shows the full span of normal BMI weights for your height. Aiming for the middle of that range (around BMI 21–22) rather than the upper boundary gives you a buffer for natural weight fluctuations.",
                "Use the weight simulator before setting a weight goal. If reaching a healthy BMI requires losing 40 kg, start with a 10 kg milestone — the simulator shows you exactly what BMI that intermediate target produces.",
              ].map((tip, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-primary font-bold flex-shrink-0 mt-0.5">💡</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Common Mistakes to Avoid</h3>
            <ul className="space-y-3 text-gray-600 leading-relaxed">
              {[
                "Don't use BMI as the sole basis for a health decision. It is a screening metric, not a diagnosis. A result outside the normal range means 'investigate further with a healthcare professional,' not 'you are unhealthy.'",
                "Don't apply adult BMI categories to children or teenagers. BMI-for-age percentile charts are required for anyone under 18 — adult thresholds will give misleading results.",
                "Don't round your height or weight to a nearby number. A 2 cm or 2 lb error in your inputs can shift your BMI by 0.5–1.0 points, which can place you in a different category. Use accurate measurements.",
                "Don't confuse the Devine/Robinson ideal weight estimates with a personal goal weight. These are clinical pharmacology formulas primarily used for drug dosing — your personal healthy weight range is the more useful target for everyday fitness planning.",
                "Don't ignore a BMI in the underweight range. Underweight (BMI < 18.5) carries health risks — including bone density loss, immune suppression, and cardiac stress — that are often less discussed than overweight risks but equally important to address.",
              ].map((mistake, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-red-400 font-bold flex-shrink-0 mt-0.5">✕</span>
                  <span>{mistake}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>


      {/* ── 6. BMI Reference Table ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          BMI Categories &amp; Healthy Weight Reference
        </h2>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">BMI Range</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Category</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Health Risk</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Common Associations</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Below 18.5",  "Underweight",     "Moderate–High",    "Malnutrition, bone density loss, immune suppression, anemia"],
                ["18.5 – 24.9", "Normal Weight",   "Low",              "Associated with best long-term health outcomes in most populations"],
                ["25.0 – 29.9", "Overweight",      "Increased",        "Elevated risk of hypertension, type 2 diabetes, metabolic syndrome"],
                ["30.0 – 34.9", "Obese (Class I)",  "High",             "Significant cardiovascular and diabetes risk; sleep apnea common"],
                ["35.0 – 39.9", "Obese (Class II)", "Very High",        "High surgical risk; strong association with metabolic disease"],
                ["40.0+",       "Obese (Class III)","Extremely High",   "Severe comorbidity burden; bariatric intervention often considered"],
              ].map(([range, category, risk, associations]) => (
                <tr key={range} className="hover:bg-gray-50">
                  <td className="py-2.5 px-4 font-mono font-semibold text-primary">{range}</td>
                  <td className="py-2.5 px-4 font-semibold text-gray-800">{category}</td>
                  <td className="py-2.5 px-4 text-gray-600 text-xs">{risk}</td>
                  <td className="py-2.5 px-4 text-gray-500 text-xs">{associations}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
          Healthy Weight Range by Height
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Height (cm)</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Height (ft/in)</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Min Healthy Weight</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Max Healthy Weight</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["155 cm", "5 ft 1 in",  "44.4 kg / 97.9 lb",  "59.8 kg / 131.8 lb"],
                ["160 cm", "5 ft 3 in",  "47.4 kg / 104.4 lb", "63.7 kg / 140.4 lb"],
                ["165 cm", "5 ft 5 in",  "50.3 kg / 110.9 lb", "67.7 kg / 149.3 lb"],
                ["170 cm", "5 ft 7 in",  "53.5 kg / 117.9 lb", "71.9 kg / 158.5 lb"],
                ["175 cm", "5 ft 9 in",  "56.7 kg / 125.0 lb", "76.3 kg / 168.2 lb"],
                ["180 cm", "5 ft 11 in", "59.9 kg / 132.1 lb", "80.7 kg / 177.9 lb"],
                ["185 cm", "6 ft 1 in",  "63.3 kg / 139.5 lb", "85.2 kg / 187.8 lb"],
                ["190 cm", "6 ft 3 in",  "66.8 kg / 147.2 lb", "89.8 kg / 197.9 lb"],
              ].map(([cm, ft, min, max]) => (
                <tr key={cm} className="hover:bg-gray-50">
                  <td className="py-2.5 px-4 font-mono text-gray-800">{cm}</td>
                  <td className="py-2.5 px-4 text-gray-600 text-xs">{ft}</td>
                  <td className="py-2.5 px-4 font-semibold text-gray-700 text-xs">{min}</td>
                  <td className="py-2.5 px-4 font-semibold text-gray-700 text-xs">{max}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 mt-4">
          * Healthy weight range calculated using WHO BMI thresholds of 18.5 (minimum) and 24.9 (maximum). Values rounded to one decimal place.
        </p>
      </section>

      {/* ── 7. FAQ ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {faqItems.map(({ q, a }, i) => (
            <div key={i} className={i < faqItems.length - 1 ? "border-b border-gray-100 pb-6" : ""}>
              <h3 className="font-semibold text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>{q}</h3>
              <p className="text-gray-600 leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 8. Who Uses This ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Who Uses This BMI Calculator?
        </h2>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            {
              icon: "🏃",
              title: "Fitness Enthusiasts",
              desc: "Track BMI changes during weight-loss or muscle-gain programs, set data-driven weight goals, and use the simulator to plan realistic milestones before starting a new training block.",
            },
            {
              icon: "🩺",
              title: "Healthcare Students & Clinicians",
              desc: "Cross-reference Devine and Robinson ideal weight values during drug dosing calculations, or quickly screen a patient's weight category before a consultation without specialist equipment.",
            },
            {
              icon: "👨‍👩‍👧",
              title: "General Adults",
              desc: "Check weight status before a medical appointment, complete insurance or wellness program intake forms, or simply understand where their current weight sits relative to the healthy range for their height.",
            },
            {
              icon: "🥗",
              title: "Dietitians & Nutritionists",
              desc: "Use as a client-facing tool during consultations to show healthy weight ranges visually, set incremental targets, and explain the clinical ideal weight formulas in plain language.",
            },
            {
              icon: "💪",
              title: "Personal Trainers",
              desc: "Onboard new clients with a quick BMI baseline, use the healthy weight range to set realistic programme outcomes, and track client progress across sessions with the history log.",
            },
            {
              icon: "🎓",
              title: "Health & Biology Students",
              desc: "Apply the BMI formula hands-on for coursework and assignments, compare Devine and Robinson formula outputs, and understand the mathematical relationship between height, weight, and BMI categories.",
            },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="bg-gray-50 border border-gray-100 rounded-lg p-5">
              <div className="text-2xl mb-2">{icon}</div>
              <h3 className="font-semibold text-gray-800 mb-1" style={{ fontFamily: "var(--font-heading)" }}>{title}</h3>
              <p className="text-sm text-gray-600">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Medical Disclaimer ── */}
      <section className="mt-8 bg-amber-50 rounded-xl border border-amber-100 p-6">
        <h2 className="text-base font-semibold text-amber-900 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
          Medical Disclaimer
        </h2>
        <p className="text-sm text-amber-800 leading-relaxed">
          BMI is a population-level screening indicator, not a clinical diagnosis. Results from this calculator are
          for informational purposes only and do not constitute medical advice. If your BMI result is outside the
          normal range, or if you have any health concerns, consult a qualified healthcare professional before making
          changes to your diet, exercise routine, or treatment plan.
        </p>
      </section>
    </>
  );
}
