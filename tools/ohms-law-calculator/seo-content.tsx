import React from "react";

export default function ToolSEOContent() {
  return (
    <div className="mt-12 space-y-12">
      {/* What is Section */}
      <section className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 inline-flex items-center gap-2">
          <span>❓</span> What is the Ohm's Law Calculator?
        </h2>
        <div className="prose prose-emerald max-w-none text-gray-600 leading-relaxed">
          <p>
            The <strong>Ohm's Law Calculator</strong> is an interactive web-based tool designed to solve simple electrical circuits automatically. Utilizing Ohm's Law, this tool instantly calculates the missing variable—be it Voltage (V), Current (I), or Resistance (R)—when the other two are provided.
          </p>
          <p className="mt-3">
            Because it is designed entirely as a client-side application, every calculation you perform operates exclusively in your browser. This means lighting-fast computations without data privacy concerns or server latency. This makes it an ideal study companion and a practical assistant for electrical engineers, technicians, and hobbyists.
          </p>
        </div>
      </section>

      {/* How to Use Section */}
      <section className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 inline-flex items-center gap-2">
          <span>🛠️</span> How to Use the Calculator
        </h2>
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">1</div>
            <div>
              <h3 className="font-semibold text-gray-900 text-lg">Input Two Values</h3>
              <p className="text-gray-600">Provide numerals for exactly two of the three available variables (Voltage, Current, or Resistance). Ensure you correctly set their respective units to avoid errors.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">2</div>
            <div>
              <h3 className="font-semibold text-gray-900 text-lg">Instant Calculations</h3>
              <p className="text-gray-600">The calculator auto-detects the omitted field and performs a real-time computation to find its value. If three fields are filled simultaneously, no target can be deduced and you'll be prompted to clear one.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">3</div>
            <div>
              <h3 className="font-semibold text-gray-900 text-lg">Interact with Data</h3>
              <p className="text-gray-600">Use the UI buttons below the outputs to quickly duplicate results to your local clipboard, or hit the "Save to History" button to keep a browser-based log of your previous problems for fast recall.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Formulas Section */}
      <section className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 inline-flex items-center gap-2">
          <span>🧮</span> The Ohm's Law Formulas
        </h2>
        <div className="prose prose-emerald max-w-none text-gray-600 leading-relaxed">
          <p>
            Ohm's Law states that the current through a conductor between two points is directly proportional to the voltage across those two points. Our integrated tool uses the three variations of this core mathematical principle depending on which inputs you deliver:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
              <h4 className="font-bold text-gray-900 mb-2">Voltage (V)</h4>
              <p className="text-sm">Found by multiplying current with resistance.</p>
              <div className="mt-3 text-lg font-bold text-emerald-600 font-mono">V = I × R</div>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
              <h4 className="font-bold text-gray-900 mb-2">Current (I)</h4>
              <p className="text-sm">Found by dividing voltage by resistance.</p>
              <div className="mt-3 text-lg font-bold text-emerald-600 font-mono">I = V ÷ R</div>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
              <h4 className="font-bold text-gray-900 mb-2">Resistance (R)</h4>
              <p className="text-sm">Found by dividing voltage by current.</p>
              <div className="mt-3 text-lg font-bold text-emerald-600 font-mono">R = V ÷ I</div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 inline-flex items-center gap-2">
          <span>💬</span> Frequently Asked Questions (FAQ)
        </h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">What handles the conversion between milli, micro, and kilo units?</h3>
            <p className="text-gray-600 leading-relaxed">The application algorithm normalizes all inputs explicitly into standard Volts (V), Amperes (A), and Ohms (Ω) internally before calculations, ensuring accurate derivations without requiring the user to execute manual scaling operations.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Why can't I put "0" for Resistance or Current when obtaining voltage?</h3>
            <p className="text-gray-600 leading-relaxed">Dividing any value by zero is highly problematic mathematically and in programming calculations. To combat edge case infinity variables, the system incorporates logic specifically built to flag these scenarios as calculation errors immediately.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Is the calculation history stored securely?</h3>
            <p className="text-gray-600 leading-relaxed">Yes. Because this is a true client application, all history is appended directly to your browser's local storage. Not a single dataset or variable travels over the internet to intermediate servers. When you drop history data, it is permanently deleted exclusively from your device.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
