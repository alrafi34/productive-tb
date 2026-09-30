import { siteConfig } from "@/config/site";

export const angularVelocityCalculatorConfig = {
  name: "Angular Velocity Calculator",
  slug: "angular-velocity-calculator",
  description:
    "Calculate angular velocity in rad/s, deg/s, rev/s, and RPM from displacement, linear velocity, RPM, frequency, or period. Free online mechanical calculator with real-time results and unit conversions.",
  category: "mechanical",
  icon: "🔄",
  free: true,
  seo: {
    title: "Angular Velocity Calculator – From RPM, Frequency & More",
    description:
      "Calculate angular velocity from RPM, frequency, period, angular displacement or linear speed and radius, with unit conversion and steps.",
    keywords: [
      "angular velocity calculator",
      "rpm to rad/s calculator",
      "mechanical calculator",
      "rotational speed calculator",
      "physics angular velocity calculator",
      "engineering calculator",
      "radian per second calculator",
      "angular velocity formula",
      "angular displacement calculator",
      "frequency to rad/s",
      "period to angular velocity",
      "omega calculator",
    ],
    og: {
      title: "Angular Velocity Calculator – From RPM, Frequency & More",
      description:
        "Calculate angular velocity from RPM, frequency, period, angular displacement or linear speed and radius, with unit conversion and steps.",
      url: `${siteConfig.url}/tools/mechanical/angular-velocity-calculator`,
    },
    howToSteps: [
      { name: "Select a formula mode from the dropdown", text: "Select a formula mode from the dropdown (e.g. RPM Conversion)" },
      { name: "Enter the required input value(s) with appropriate units", text: "Enter the required input value(s) with appropriate units" },
      { name: "The angular velocity updates instantly in rad/s, deg/s, rev/s, and RPM", text: "The angular velocity updates instantly in rad/s, deg/s, rev/s, and RPM" },
      { name: "Change the primary output unit in Settings to match your need", text: "Change the primary output unit in Settings to match your need" },
      { name: "Use presets to quickly load common engineering scenarios", text: "Use presets to quickly load common engineering scenarios" },
      { name: "Click Copy Result or Export TXT to share or record your calculation", text: "Click Copy Result or Export TXT to share or record your calculation" },
    ],
    faq: [
      { q: "What is angular velocity?", a: "Angular velocity (ω) is the rate of change of angular position of a rotating body. It tells you how fast something is spinning. The SI unit is rad/s. It differs from angular speed in that angular velocity is a vector quantity with a direction along the axis of rotation." },
      { q: "How do I convert RPM to rad/s?", a: "Multiply RPM by π/30. For example, 1200 RPM × (π/30) = 125.66 rad/s. This is because one revolution = 2π radians, and one minute = 60 seconds, so the factor is 2π/60 = π/30 ≈ 0.10472." },
      { q: "What is the difference between angular velocity and angular frequency?", a: "In many contexts they are the same (both equal ω = 2πf). Angular frequency is used in oscillation and wave physics, while angular velocity refers to the rotation of a rigid body. Both have units of rad/s." },
      { q: "How is angular velocity related to linear velocity?", a: "v = ω × r, where v is linear velocity, ω is angular velocity, and r is the radius from the axis of rotation. A point farther from the center moves faster in a straight-line sense even though all points rotate at the same angular velocity." },
      { q: "What is the period of rotation?", a: "The period T is the time for one complete rotation. T = 2π / ω = 1 / f. For a motor at 1200 RPM: T = 60/1200 = 0.05 seconds per revolution." },
    ],
  },
  relatedTools: [
    "torque-calculator",
    "centripetal-force-calculator",
    "gear-ratio-calculator",
    "velocity-calculator",
    "angular-acceleration-calculator",
    "rotational-kinetic-energy-calculator",
  ],
};
