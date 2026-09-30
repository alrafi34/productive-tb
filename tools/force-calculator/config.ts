import { siteConfig } from "@/config/site";

export const forceCalculatorConfig = {
  name: "Force Calculator",
  slug: "force-calculator",
  description: "Calculate force instantly using Newton's Second Law (F = ma). Supports metric and imperial units with real-time results, unit conversion, and step-by-step formula breakdown.",
  category: "mechanical",
  icon: "⚡",
  free: true,
  seo: {
    title: "Force Calculator (F = ma) – Calculate Force Online",
    description: "Calculate force from mass and acceleration with Newton's second law (F = ma), with unit conversion and step-by-step working.",
    keywords: [
      "force calculator",
      "F ma calculator",
      "newton force calculator",
      "physics force calculator",
      "calculate force online",
      "force formula calculator",
      "mass acceleration calculator",
      "newton second law calculator",
      "F=ma online",
      "force in newtons calculator",
    ],
    og: {
      title: "Force Calculator (F = ma) – Calculate Force Online",
      description: "Calculate force from mass and acceleration with Newton's second law (F = ma), with unit conversion and step-by-step working.",
      url: `${siteConfig.url}/tools/mechanical/force-calculator`,
    },
    howToSteps: [
      { name: "Enter the mass value", text: "Enter the mass value (e.g. 10)" },
      { name: "Select the mass unit", text: "Select the mass unit — kg, g, lb, or metric ton" },
      { name: "Enter the acceleration value", text: "Enter the acceleration value (e.g. 9.8)" },
      { name: "Select the acceleration unit", text: "Select the acceleration unit — m/s² or ft/s²" },
      { name: "View the force result instantly in N, kN, and lbf", text: "View the force result instantly in N, kN, and lbf" },
      { name: "Use presets for common physics scenarios", text: "Use presets for common physics scenarios" },
    ],
    faq: [
      { q: "What is Newton's Second Law of Motion?", a: "Newton's Second Law states that the net force acting on an object equals the product of its mass and acceleration: F = ma. It means that a larger force produces greater acceleration, and a heavier object requires more force to achieve the same acceleration." },
      { q: "What is a Newton (N)?", a: "A Newton is the SI unit of force. It is defined as the force required to accelerate a 1 kilogram mass at 1 meter per second squared. 1 N = 1 kg·m/s². In everyday terms, a medium apple weighs approximately 1 Newton." },
      { q: "Can acceleration be negative?", a: "Yes. Negative acceleration (deceleration) means the object is slowing down. The resulting force will also be negative, indicating it acts in the opposite direction to motion. This is common in braking, air resistance, and collision scenarios." },
      { q: "What is the difference between mass and weight?", a: "Mass is the amount of matter in an object (measured in kg) and does not change with location. Weight is the force of gravity acting on that mass (measured in N). Weight = mass × gravitational acceleration (9.8 m/s² on Earth)." },
      { q: "Is this calculator accurate for engineering use?", a: "Yes. The calculator uses exact conversion factors and IEEE 754 double-precision floating-point arithmetic. Results are accurate to the selected decimal precision. For safety-critical applications, always verify with a licensed engineer." },
    ],
  },
  relatedTools: [
    "torque-calculator",
    "kinetic-energy-calculator",
    "centripetal-force-calculator",
    "momentum-calculator",
    "spring-force-calculator",
    "acceleration-calculator",
  ],
};
