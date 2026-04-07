import React from "react";

export default function DiceRollerSEOContent() {
  return (
    <div className="mt-12 space-y-8 text-gray-700">
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          About the Dice Roller Simulator
        </h2>
        <p className="text-base leading-relaxed">
          The Dice Roller Simulator is a fast, browser-based tool for rolling virtual dice commonly used in tabletop RPGs, board games, and probability demonstrations. Roll D4, D6, D8, D10, D12, and D20 dice individually or as custom sets with smooth animations and instant results.
        </p>
      </section>

      <section>
        <h3 className="text-xl font-bold text-gray-900 mb-3">Key Features</h3>
        <ul className="space-y-2 list-disc list-inside">
          <li>Roll multiple dice types simultaneously</li>
          <li>Smooth 300-700ms roll animations</li>
          <li>Customizable animation speed (fast, normal, slow)</li>
          <li>Roll history tracking (last 20 rolls)</li>
          <li>Copy results to clipboard</li>
          <li>Export roll history as JSON</li>
          <li>Keyboard shortcut (Spacebar to roll)</li>
          <li>Responsive design for all devices</li>
          <li>Local storage persistence</li>
        </ul>
      </section>

      <section>
        <h3 className="text-xl font-bold text-gray-900 mb-3">How to Use</h3>
        <ol className="space-y-2 list-decimal list-inside">
          <li>Select the dice types and quantities you want to roll</li>
          <li>Adjust animation speed if desired</li>
          <li>Click "Roll Dice" or press Spacebar</li>
          <li>View results with total calculation</li>
          <li>Copy results or export history as needed</li>
        </ol>
      </section>

      <section>
        <h3 className="text-xl font-bold text-gray-900 mb-3">Perfect For</h3>
        <ul className="space-y-2 list-disc list-inside">
          <li>Dungeons & Dragons and Pathfinder players</li>
          <li>Board game enthusiasts</li>
          <li>Teachers explaining probability</li>
          <li>Game designers testing mechanics</li>
          <li>Anyone needing quick random numbers</li>
        </ul>
      </section>

      <section>
        <h3 className="text-xl font-bold text-gray-900 mb-3">Dice Types</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { name: "D4", uses: "Pyramid die, 4 outcomes" },
            { name: "D6", uses: "Standard die, 6 outcomes" },
            { name: "D8", uses: "Octahedron, 8 outcomes" },
            { name: "D10", uses: "Percentile, 10 outcomes" },
            { name: "D12", uses: "Dodecahedron, 12 outcomes" },
            { name: "D20", uses: "Icosahedron, 20 outcomes" },
          ].map((die) => (
            <div key={die.name} className="p-3 bg-gray-50 rounded-lg">
              <div className="font-bold text-primary">{die.name}</div>
              <div className="text-sm text-gray-600">{die.uses}</div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-xl font-bold text-gray-900 mb-3">Privacy & Performance</h3>
        <p className="text-base leading-relaxed">
          All dice rolls are generated locally in your browser using JavaScript's Math.random() function. No data is sent to any server. Roll history is stored in your browser's local storage and can be cleared anytime. The tool runs entirely client-side for maximum speed and privacy.
        </p>
      </section>
    </div>
  );
}
