import ToolFaq from "@/components/ToolFaq";
import { toolConfig } from "./config";

export default function ToolSEOContent() {
  // Same steps and questions as the HowTo / FAQPage schema
  const { howToSteps, faq } = toolConfig.seo;
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
          {howToSteps.map(({ name, text }, i) => (
            <div key={name} className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">{i + 1}</div>
              <div>
                <h3 className="font-semibold text-gray-900 text-lg">{name}</h3>
                <p className="text-gray-600">{text}</p>
              </div>
            </div>
          ))}
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

      <ToolFaq items={faq} />
    </div>
  );
}
