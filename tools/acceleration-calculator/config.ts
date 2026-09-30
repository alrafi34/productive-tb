import { siteConfig } from "@/config/site";

export const accelerationCalculatorConfig = {
  name: "Acceleration Calculator",
  slug: "acceleration-calculator",
  category: "mechanical",
  description: "Calculate acceleration using change in velocity over time. Supports multiple modes, unit conversion, and step-by-step explanations.",
  icon: "⚡",
  color: "#058554",
  free: true,
  seo: {
    title: "Acceleration Calculator – From Velocity Change & Time",
    description: "Calculate acceleration from the change in velocity over time, with step-by-step formulas and unit conversion.",
    keywords: [
      "acceleration calculator",
      "calculate acceleration",
      "velocity calculator",
      "physics acceleration formula",
      "motion calculator",
      "free acceleration calculator online",
      "a = (v2 - v1) / t",
      "deceleration calculator",
      "final velocity calculator",
      "initial velocity calculator",
      "kinematics calculator",
      "acceleration formula",
    ],
    og: {
      title: "Acceleration Calculator – From Velocity Change & Time",
      description: "Calculate acceleration from the change in velocity over time, with step-by-step formulas and unit conversion.",
      type: "website",
      url: `${siteConfig.url}/tools/mechanical/acceleration-calculator`,
    },
    howToSteps: [
      { name: "Select a calculation mode", text: "Select a calculation mode (acceleration, velocity, or time)" },
      { name: "Choose your velocity unit", text: "Choose your velocity unit — m/s, km/h, mph, or ft/s" },
      { name: "Choose your time unit", text: "Choose your time unit — seconds, minutes, or hours" },
      { name: "Enter the known values in the input fields", text: "Enter the known values in the input fields" },
      { name: "View the result instantly with step-by-step breakdown", text: "View the result instantly with step-by-step breakdown" },
      { name: "Copy, save, or export the result as needed", text: "Copy, save, or export the result as needed" },
    ],
    faq: [
      { q: "What is the acceleration formula?", a: "The standard acceleration formula is a = (v₂ − v₁) / t, where a is acceleration, v₁ is initial velocity, v₂ is final velocity, and t is time. The SI unit is meters per second squared (m/s²)." },
      { q: "What is deceleration?", a: "Deceleration is negative acceleration — the object is slowing down. When the final velocity is less than the initial velocity, the result is a negative number, indicating deceleration. For example, braking from 60 mph to 0 in 4 seconds gives −15 mph/s." },
      { q: "Why can't time be zero?", a: "Division by zero is mathematically undefined. If time equals zero, the formula a = (v₂ − v₁) / t has no valid result. In physics, instantaneous acceleration requires calculus (the derivative of velocity with respect to time)." },
      { q: "What is the acceleration due to gravity?", a: "On Earth, the standard acceleration due to gravity is 9.80665 m/s² (approximately 9.8 m/s²). This means a free-falling object gains about 9.8 m/s of downward velocity every second, ignoring air resistance." },
      { q: "How do I convert acceleration units?", a: "This calculator handles unit conversion automatically. Select your preferred velocity and time units, and the result is displayed in those units. For example, selecting km/h and seconds gives acceleration in km/h/s." },
    ],
  },
  relatedTools: [
    "velocity-calculator",
    "force-calculator",
    "kinetic-energy-calculator",
    "torque-calculator",
    "centripetal-force-calculator",
    "projectile-motion-calculator",
  ],
};

export const toolConfig = accelerationCalculatorConfig;
