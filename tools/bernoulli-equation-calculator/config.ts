import { siteConfig } from "@/config/site";

export const bernoulliEquationCalculatorConfig = {
  name: "Bernoulli Equation Calculator",
  slug: "bernoulli-equation-calculator",
  description:
    "Apply the Bernoulli principle to calculate fluid pressure, velocity, and elevation. Solve for any unknown variable with step-by-step explanations and unit conversion.",
  category: "mechanical",
  icon: "🌊",
  free: true,
  seo: {
    title: "Bernoulli Equation Calculator – Pressure, Velocity, Height",
    description:
      "Solve the Bernoulli equation for P₁, P₂, V₁, V₂, h₁ or h₂ in SI or US units (Pa, kPa, bar, psi, m/s, ft/s, m, ft), with fluid presets and step-by-step working.",
    keywords: [
      "bernoulli equation calculator",
      "fluid mechanics calculator",
      "pressure velocity calculator",
      "pipe flow calculator",
      "fluid pressure solver",
      "bernoulli principle calculator",
      "engineering calculator",
      "pressure drop calculator",
      "fluid flow calculator",
      "venturi calculator",
      "nozzle flow calculator",
      "hydraulic calculator",
      "mechanical engineering calculator",
      "bernoulli formula",
      "fluid energy calculator",
    ],
    og: {
      title: "Bernoulli Equation Calculator – Pressure, Velocity, Height",
      description:
        "Solve the Bernoulli equation for P₁, P₂, V₁, V₂, h₁ or h₂ in SI or US units (Pa, kPa, bar, psi, m/s, ft/s, m, ft), with fluid presets and step-by-step working.",
      url: `${siteConfig.url}/tools/mechanical/bernoulli-equation-calculator`,
    },
    howToSteps: [
      { name: "Choose the unknown", text: "Select what to solve for: pressure P₁ or P₂, velocity V₁ or V₂, or height h₁ or h₂. That field is calculated; the others are inputs." },
      { name: "Enter the known values", text: "Type the pressures, velocities and heights at points 1 and 2, each in its own unit: Pa, kPa, bar or psi; m/s or ft/s; m or ft." },
      { name: "Set the fluid", text: "Pick water, seawater, air, oil or gasoline, or type a custom density in kg/m³ or lb/ft³. Gravity defaults to 9.81 m/s²." },
      { name: "Read the result", text: "The answer updates as you type, with the rearranged formula, the step-by-step working and the pressure, kinetic and potential energy terms at each point." },
      { name: "Copy, save or export", text: "Copy the result, save it to the history in this browser, or export the calculation as a text file." },
    ],
    faq: [
      { q: "What is the Bernoulli equation?", a: "P₁ + ½ρV₁² + ρgh₁ = P₂ + ½ρV₂² + ρgh₂. Along a streamline, the sum of the pressure, the kinetic energy per volume (½ρV²) and the potential energy per volume (ρgh) stays constant. P is pressure in Pa, ρ density in kg/m³, V velocity in m/s, g gravity in m/s² and h height in m." },
      { q: "What are its assumptions?", a: "Steady, incompressible flow along one streamline, with no friction (viscous) losses and no pump or turbine between the two points. For real pipes, add a head-loss term from the Darcy–Weisbach equation, and a pump or turbine head where there is one." },
      { q: "Why does pressure drop when the fluid speeds up?", a: "Because the total energy is constant. Where a pipe narrows, the fluid must speed up to carry the same flow, so its kinetic energy rises and its pressure falls. Venturi meters, carburetors and atomizers use this effect." },
      { q: "Can I use it for air or other gases?", a: "Yes, as long as the flow is slower than about Mach 0.3, roughly 100 m/s (330 ft/s) in air, where the density changes by less than about 5%. Faster gas flows need the compressible form of the energy equation." },
      { q: "Should I use gauge or absolute pressure?", a: "Either, as long as both points use the same one. The equation only depends on the pressure difference, so gauge pressures (such as psig) work as well as absolute ones." },
      { q: "Why does the calculator say a velocity would be imaginary?", a: "Solving for a velocity takes a square root. If the numbers you entered would need a negative kinetic energy, for example a higher pressure and height downstream with nothing driving the flow, there is no real solution. Check the signs, units and which point is upstream." },
    ],
  },
  relatedTools: [
    "reynolds-number-calculator",
    "pressure-drop-calculator",
    "flow-rate-calculator",
    "pipe-velocity-calculator",
    "hydraulic-pressure-calculator",
    "venturi-flow-calculator",
  ],
};

export const toolConfig = bernoulliEquationCalculatorConfig;
