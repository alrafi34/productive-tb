import { siteConfig } from "@/config/site";

export const centripetalForceCalculatorConfig = {
  name: "Centripetal Force Calculator",
  slug: "centripetal-force-calculator",
  description: "Calculate centripetal force instantly using mass, velocity, and radius (F = mv²/r) or angular velocity (F = mrω²). Real-time results, step-by-step breakdown, and unit conversion for physics and engineering.",
  category: "mechanical",
  icon: "🌀",
  free: true,
  seo: {
    title: "Centripetal Force Calculator – F = mv²/r and F = mrω²",
    description: "Calculate centripetal force from mass, speed and radius (F = mv²/r) or angular velocity (F = mrω²). Metric and US units, results in N, kN and lbf.",
    keywords: [
      "centripetal force calculator",
      "circular motion calculator",
      "centripetal acceleration calculator",
      "physics force calculator",
      "F=mv2/r calculator",
      "angular velocity force calculator",
      "mechanics calculator",
      "force in circular motion",
      "centripetal force formula",
      "online physics calculator",
    ],
    og: {
      title: "Centripetal Force Calculator – F = mv²/r and F = mrω²",
      description: "Calculate centripetal force from mass, speed and radius (F = mv²/r) or angular velocity (F = mrω²). Metric and US units, results in N, kN and lbf.",
      url: `${siteConfig.url}/tools/mechanical/centripetal-force-calculator`,
    },
    howToSteps: [
      { name: "Choose the formula", text: "Use speed (F = mv²/r) when you know how fast the object moves, or angular velocity (F = mrω²) when you know how fast it rotates, in rad/s." },
      { name: "Enter the mass", text: "Type the mass in kg, g, lb or metric tons." },
      { name: "Enter the speed or angular velocity", text: "Type the speed in m/s, km/h or mph, or the angular velocity in rad/s." },
      { name: "Enter the radius", text: "Type the radius of the circular path in m, cm or ft." },
      { name: "Read the force", text: "See the centripetal force in newtons, kilonewtons and pound-force with the step-by-step working; copy it or export it as a text file." },
    ],
    faq: [
      { q: "What is the centripetal force formula?", a: "F = mv²/r, where m is the mass in kg, v the speed in m/s and r the radius in m, giving F in newtons. With angular velocity ω in rad/s, F = mω²r. Example: a 1,500 kg car taking a 50 m radius curve at 20 m/s (72 km/h, about 45 mph) needs 1,500 × 20² ÷ 50 = 12,000 N, about 2,700 lbf." },
      { q: "What is centripetal force?", a: "The net inward force that keeps an object moving in a circle, always pointing toward the center. It is not a separate kind of force: friction on a car's tires, the tension in a string or gravity on a satellite provides it. Without it, the object would carry on in a straight line." },
      { q: "What is the difference between centripetal and centrifugal force?", a: "Centripetal force is the real inward force on the object. Centrifugal force is an apparent outward force that only appears when you describe the motion from inside the rotating frame; the outward push you feel in a turning car is your body's inertia trying to go straight." },
      { q: "Why is speed squared in the formula?", a: "Going faster means both covering the curve sooner and changing direction faster, so the required force grows with the square of the speed. Doubling the speed on the same curve needs four times the force, which is why speed limits on bends matter so much." },
      { q: "How do I convert RPM to angular velocity?", a: "Multiply by 2π and divide by 60: ω = 2π × RPM ÷ 60. For example 3,000 RPM is 314.2 rad/s. Enter that in angular velocity mode." },
      { q: "How do I find the centripetal acceleration?", a: "Divide the force by the mass, or use a = v²/r directly. Dividing by 9.81 m/s² gives the acceleration in g; the car in the example above feels 8 m/s², about 0.82 g." },
    ],
  },
  relatedTools: [
    "force-calculator",
    "torque-calculator",
    "angular-velocity-calculator",
    "kinetic-energy-calculator",
    "spring-force-calculator",
    "velocity-calculator",
  ],
};
