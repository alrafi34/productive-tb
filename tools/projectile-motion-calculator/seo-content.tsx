import React from "react";

export default function ProjectileMotionSEO() {
  return (
    <div className="max-w-4xl mx-auto mt-16 space-y-12">

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          What is a Projectile Motion Calculator?
        </h2>
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-700 leading-relaxed mb-4">
            A <strong>Projectile Motion Calculator</strong> is a physics tool that computes the trajectory of an
            object launched into the air under the influence of gravity. Given an initial velocity and launch angle,
            it calculates the horizontal range, maximum height, time of flight, and velocity components.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Projectile motion follows classical Newtonian mechanics. The horizontal and vertical components of
            motion are independent — horizontal velocity remains constant (no air resistance), while vertical
            velocity changes due to gravitational acceleration.
          </p>
          <p className="text-gray-700 leading-relaxed">
            This calculator supports multiple velocity units (m/s, km/h, ft/s, mph), gravity presets for
            different planets, elevated launch heights, and real-time trajectory visualization on a canvas graph.
          </p>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Projectile Motion Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Step-by-Step Guide</h3>
            <ol className="space-y-3 text-gray-700">
              {[
                "Enter the initial velocity (e.g. 50 m/s)",
                "Select the velocity unit — m/s, km/h, ft/s, or mph",
                "Set the launch angle using the slider or number input (0°–90°)",
                "Choose a gravity preset (Earth, Moon, Mars, Jupiter) or enter a custom value",
                "Optionally set a launch height above ground",
                "View range, height, flight time, and velocity components instantly",
                "Click Animate to watch the projectile travel along the trajectory",
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-semibold">
                    {i + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Key Features</h3>
            <ul className="space-y-2 text-gray-700">
              {[
                "Real-time calculation as you type or slide",
                "Animated trajectory visualization with canvas",
                "Gravity presets for Earth, Moon, Mars, Jupiter",
                "Multi-unit velocity support (m/s, km/h, ft/s, mph)",
                "Elevated launch height support",
                "Full results breakdown table",
                "Calculation history with localStorage",
                "Export results as TXT or chart as PNG",
                "Step-by-step formula panel",
                "Quick presets for common scenarios",
              ].map((tip, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Projectile Motion Formulas Explained
        </h2>
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-5 bg-gray-50 border border-gray-200 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-3">Velocity Components</h3>
              <div className="font-mono text-base text-center bg-white border border-gray-200 rounded-lg p-3 mb-3 space-y-1">
                <div>vx = v · cos(θ)</div>
                <div>vy = v · sin(θ)</div>
              </div>
              <p className="text-sm text-gray-600">
                The initial velocity is split into horizontal (vx) and vertical (vy) components using trigonometry.
                vx stays constant throughout the flight; vy decreases due to gravity.
              </p>
            </div>
            <div className="p-5 bg-gray-50 border border-gray-200 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-3">Range & Height</h3>
              <div className="font-mono text-base text-center bg-white border border-gray-200 rounded-lg p-3 mb-3 space-y-1">
                <div>R = v²·sin(2θ) / g</div>
                <div>H = vy² / (2g)</div>
              </div>
              <p className="text-sm text-gray-600">
                Range is maximized at 45°. Maximum height depends only on the vertical component and gravity.
                Complementary angles (30° and 60°) produce equal ranges.
              </p>
            </div>
            <div className="p-5 bg-gray-50 border border-gray-200 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-3">Time of Flight</h3>
              <div className="font-mono text-base text-center bg-white border border-gray-200 rounded-lg p-3 mb-3">
                T = 2·vy / g
              </div>
              <p className="text-sm text-gray-600">
                Total flight time is twice the time to reach peak height. With an elevated launch, the quadratic
                formula is used: T = (vy + √(vy² + 2g·h₀)) / g.
              </p>
            </div>
            <div className="p-5 bg-gray-50 border border-gray-200 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-3">Position at Time t</h3>
              <div className="font-mono text-base text-center bg-white border border-gray-200 rounded-lg p-3 mb-3 space-y-1">
                <div>x(t) = vx · t</div>
                <div>y(t) = vy·t − ½g·t²</div>
              </div>
              <p className="text-sm text-gray-600">
                These parametric equations define the parabolic trajectory. The calculator samples 200 points
                along the path to render the smooth curve on the graph.
              </p>
            </div>
          </div>
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
            <strong>Key insight:</strong> On the Moon (g = 1.62 m/s²), a projectile travels about 6× farther
            than on Earth for the same launch conditions — which is why astronauts could hit golf balls enormous
            distances on the lunar surface.
          </div>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Example Calculations
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Velocity</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Angle</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Gravity</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Range</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Max Height</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Flight Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["50 m/s",  "45°", "9.81 m/s²", "254.8 m",  "63.7 m",  "7.2 s"],
                ["50 m/s",  "30°", "9.81 m/s²", "220.6 m",  "31.9 m",  "5.1 s"],
                ["50 m/s",  "75°", "9.81 m/s²", "130.5 m",  "119.0 m", "9.8 s"],
                ["20 m/s",  "45°", "9.81 m/s²", "40.8 m",   "10.2 m",  "2.9 s"],
                ["100 m/s", "45°", "9.81 m/s²", "1019.4 m", "254.8 m", "14.4 s"],
                ["50 m/s",  "45°", "1.62 m/s²", "1543.2 m", "385.8 m", "43.5 s"],
              ].map(([vel, angle, grav, range, height, time]) => (
                <tr key={vel + angle + grav} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-mono">{vel}</td>
                  <td className="py-3 px-4 font-mono">{angle}</td>
                  <td className="py-3 px-4 font-mono">{grav}</td>
                  <td className="py-3 px-4 font-mono font-semibold text-primary">{range}</td>
                  <td className="py-3 px-4 font-mono">{height}</td>
                  <td className="py-3 px-4 font-mono">{time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Real-World Applications
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: "🎓", title: "Physics Education",    color: "blue",   desc: "Core kinematics concept taught in high school and university physics. Demonstrates independence of horizontal and vertical motion." },
            { icon: "⚽", title: "Sports Science",       color: "green",  desc: "Analyzing ball trajectories in soccer, basketball, baseball, and golf. Optimal launch angles for maximum distance or accuracy." },
            { icon: "🚀", title: "Aerospace & Rocketry", color: "purple", desc: "Ballistic trajectory calculations for rockets, missiles, and spacecraft re-entry paths under gravitational influence." },
            { icon: "🎮", title: "Game Development",     color: "orange", desc: "Physics engines in video games use projectile equations for realistic bullet, grenade, and ball trajectories." },
            { icon: "🤖", title: "Robotics",             color: "red",    desc: "Calculating throwing trajectories for robotic arms and autonomous systems that need to launch or catch objects." },
            { icon: "🏗️", title: "Engineering",          color: "gray",   desc: "Structural engineers analyze debris trajectories, water jet paths, and material ejection in manufacturing processes." },
          ].map(({ icon, title, color, desc }) => (
            <div key={title} className={`bg-${color}-50 border border-${color}-200 rounded-lg p-6`}>
              <div className="text-2xl mb-3">{icon}</div>
              <h3 className={`font-semibold text-${color}-900 mb-2`}>{title}</h3>
              <p className={`text-sm text-${color}-800`}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {[
            {
              q: "What is projectile motion?",
              a: "Projectile motion is the motion of an object thrown or projected into the air, subject only to gravity. The horizontal and vertical components of motion are independent — horizontal velocity is constant, while vertical velocity changes due to gravitational acceleration.",
            },
            {
              q: "What angle gives maximum range?",
              a: "In ideal conditions (no air resistance, flat ground), a launch angle of 45° gives the maximum horizontal range. Complementary angles like 30° and 60° produce the same range but different heights and flight times.",
            },
            {
              q: "How does launch height affect the trajectory?",
              a: "Launching from an elevated position increases both the range and flight time. The calculator uses the quadratic formula T = (vy + √(vy² + 2g·h₀)) / g to account for the initial height h₀.",
            },
            {
              q: "Why is gravity different on other planets?",
              a: "Gravitational acceleration depends on a planet's mass and radius. Earth's gravity is 9.81 m/s², the Moon's is 1.62 m/s² (about 1/6th), Mars is 3.71 m/s², and Jupiter is 24.79 m/s². Lower gravity means longer flight times and greater ranges.",
            },
            {
              q: "Does this calculator account for air resistance?",
              a: "No — this calculator uses ideal projectile motion equations without air resistance. In real-world scenarios, drag significantly reduces range and alters the trajectory shape. The ideal model is accurate for dense, slow-moving objects over short distances.",
            },
          ].map(({ q, a }, i) => (
            <div key={i} className={i < 4 ? "border-b border-gray-100 pb-6" : ""}>
              <h3 className="font-semibold text-gray-800 mb-2">{q}</h3>
              <p className="text-gray-700">{a}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
