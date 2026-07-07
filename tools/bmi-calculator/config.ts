import { siteConfig } from "@/config/site";

export const toolConfig = {
  slug: "bmi-calculator",
  name: "BMI Calculator",
  description: "Calculate your Body Mass Index (BMI) instantly with metric or imperial units. Get your BMI category, healthy weight range, and ideal weight estimates — free, no sign-up required.",
  category: "calculator",
  icon: "⚖️",
  free: true,
  backend: false,
  seo: {
    title: "BMI Calculator — Free Body Mass Index Calculator Online | Productive Toolbox",
    description: "Free BMI calculator with metric and imperial support. Instantly calculate your Body Mass Index, BMI category, healthy weight range, and ideal weight. No sign-up, 100% browser-based.",
    keywords: [
      "bmi calculator",
      "bmi calculator online",
      "body mass index calculator",
      "calculate bmi",
      "free bmi calculator",
      "bmi chart",
      "healthy bmi range",
      "bmi for women",
      "bmi for men",
      "bmi calculator metric",
      "bmi calculator imperial",
      "healthy weight calculator",
      "ideal weight calculator",
      "bmi categories",
      "normal bmi range",
      "overweight bmi",
      "obese bmi range",
      "bmi calculator kg cm",
      "bmi calculator lbs inches",
      "bmi calculator adults",
      "bmi and healthy weight range",
      "body weight index",
      "weight category calculator",
      "bmi scale",
      "calculate body mass index online",
    ],
    openGraph: {
      title: "BMI Calculator — Free Body Mass Index Calculator Online",
      description: "Instantly calculate BMI, check your category, healthy weight range, and ideal weight estimates. Free, metric and imperial, no sign-up.",
      type: "website",
      url: `${siteConfig.url}/tools/calculator/bmi-calculator`,
    },
    howToSteps: [
      {
        name: "Select your unit system",
        text: "Choose Metric (kg and cm) or Imperial (lb, ft, in) using the toggle at the top of the calculator. The inputs and outputs update instantly — you can switch at any time without re-entering values.",
      },
      {
        name: "Enter your height",
        text: "Type your height in the height field. In metric mode, enter centimetres (e.g. 175). In imperial mode, enter feet and inches separately (e.g. 5 ft 9 in).",
      },
      {
        name: "Enter your weight",
        text: "Type your current weight. In metric mode, enter kilograms. In imperial mode, enter pounds. The BMI result updates as soon as both fields have valid values.",
      },
      {
        name: "Read your BMI result",
        text: "Your BMI score appears immediately alongside your category (Underweight, Normal Weight, Overweight, or Obese) and a color-coded visual scale showing where you sit in the range.",
      },
      {
        name: "Check your healthy weight range",
        text: "Below the BMI score, the calculator shows the minimum and maximum weight that corresponds to a healthy BMI (18.5–24.9) for your exact height — in whichever unit system you selected.",
      },
      {
        name: "Review ideal weight estimates",
        text: "The Devine and Robinson formula results give you a clinical reference point for ideal weight. These are used in medical settings for drug dosing and provide a more nuanced target than a simple BMI midpoint.",
      },
      {
        name: "Use the weight simulator",
        text: "Drag the simulator slider to explore how your BMI would change at different weights. This is useful for setting a realistic weight goal — you can see the BMI impact of losing or gaining 5, 10, or 20 kg/lbs.",
      },
    ],
    faq: [
      {
        q: "What is BMI?",
        a: "BMI (Body Mass Index) is a numerical value derived from a person's weight and height. It is calculated by dividing weight in kilograms by the square of height in metres (kg/m²). The World Health Organization uses BMI as a population-level screening tool to classify underweight, normal weight, overweight, and obesity in adults. It does not directly measure body fat, but it correlates with body fat percentage in most adults and is widely used because it requires only two measurements and no specialist equipment.",
      },
      {
        q: "What is a healthy BMI range?",
        a: "For adults aged 18 and over, the WHO defines a healthy BMI as 18.5 to 24.9. Below 18.5 is classified as underweight, 25.0 to 29.9 as overweight, and 30.0 and above as obese. These thresholds are population-level guidelines — individual health depends on many additional factors including muscle mass, bone density, age, sex, and ethnicity.",
      },
      {
        q: "Is BMI the same for men and women?",
        a: "The BMI formula itself is identical for men and women. However, the same BMI value may represent different body fat percentages between sexes — women naturally carry more body fat than men at the same BMI. This is why some clinicians complement BMI with waist circumference or body fat percentage measurements when assessing health risk.",
      },
      {
        q: "Does BMI apply to children and teenagers?",
        a: "Standard adult BMI categories do not apply to children and adolescents. For people under 18, clinicians use BMI-for-age percentile charts that account for normal growth patterns and sex differences at different ages. This calculator is designed for adults aged 18 and over.",
      },
      {
        q: "Can BMI be inaccurate?",
        a: "Yes, BMI has well-documented limitations. Athletes and heavily muscular individuals often fall into the overweight or obese category despite having low body fat. Conversely, older adults can have a normal BMI while carrying too little muscle and too much visceral fat. BMI is best used as a starting point for investigation, not a definitive health verdict.",
      },
      {
        q: "What are the Devine and Robinson ideal weight formulas?",
        a: "The Devine formula (1974) and Robinson formula (1983) are two of the most commonly cited medical formulas for estimating ideal body weight from height, applied in clinical pharmacology for drug dosing. Devine: males = 50 kg + 2.3 kg per inch over 5 ft; females = 45.5 kg + 2.3 kg per inch over 5 ft. Robinson: males = 52 kg + 1.9 kg per inch over 5 ft; females = 49 kg + 1.7 kg per inch over 5 ft. The two formulas typically differ by 2–5 kg for the same height.",
      },
      {
        q: "How do I calculate BMI in imperial units?",
        a: "In imperial units, the formula is: BMI = (weight in pounds × 703) divided by (height in inches squared). For example, someone who is 5 ft 9 in (69 inches) and weighs 170 lbs: BMI = (170 × 703) divided by (69 squared) = 119,510 divided by 4,761, which equals approximately 25.1. This calculator handles the conversion automatically — select Imperial, enter your height in feet and inches and your weight in pounds.",
      },
      {
        q: "What BMI is considered obese?",
        a: "A BMI of 30.0 or above is classified as obese by the WHO and most national health authorities. Obesity is further subdivided into Class I (30.0–34.9), Class II (35.0–39.9), and Class III or severe obesity (40.0 and above). Each class carries progressively higher risks of type 2 diabetes, cardiovascular disease, and hypertension. This calculator's healthy weight range output shows exactly how much weight would bring you into the normal range.",
      },
      {
        q: "Is my data stored when I use this BMI calculator?",
        a: "No data is sent to any server. All calculations happen locally in your browser using JavaScript. The optional history feature stores previous results in your browser's localStorage — this data stays on your device and is not accessible to anyone else. Clearing your browser data will remove the saved history.",
      },
      {
        q: "What should I do if my BMI is outside the healthy range?",
        a: "A BMI result outside the 18.5–24.9 healthy range is a prompt to investigate further, not a diagnosis. If your BMI indicates underweight, overweight, or obesity, the most useful next step is to consult a doctor or registered dietitian who can assess your full health picture — including body composition, blood markers, blood pressure, and lifestyle factors.",
      },
    ],
  },
  features: [
    "Instant BMI calculation in metric (kg/cm) or imperial (lb/ft/in)",
    "BMI category with color-coded visual scale",
    "Healthy weight range based on your exact height",
    "Ideal weight estimates using Devine and Robinson formulas",
    "Interactive weight simulator to preview BMI changes",
    "Local history for repeat check-ins — no account needed",
    "100% browser-based — your data never leaves your device",
  ],
  relatedTools: [
    "body-fat-calculator",
    "bmr-calculator",
    "calorie-calculator",
    "ideal-weight-calculator",
    "waist-to-hip-ratio-calculator",
    "age-calculator",
  ],
};
