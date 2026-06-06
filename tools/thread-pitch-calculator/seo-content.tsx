import React from "react";

export default function ThreadPitchCalculatorSEO() {
  return (
    <div className="max-w-4xl mx-auto mt-16 space-y-12">

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          What is Thread Pitch?
        </h2>
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Thread pitch</strong> is the distance between adjacent thread crests (peaks), measured
            parallel to the thread axis. In the metric system, pitch is expressed in millimeters (mm). In the
            imperial system, thread density is described as <strong>Threads Per Inch (TPI)</strong> — the
            number of complete thread cycles within one inch.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Thread pitch is a critical specification for fasteners, pipes, shafts, and machine components.
            Mismatched thread pitch causes cross-threading, poor fitment, stripped threads, and in pipe
            systems, dangerous leaks. This calculator supports all four common thread measurement methods
            used globally by engineers, machinists, and technicians.
          </p>
          <p className="text-gray-700 leading-relaxed">
            The tool covers <strong>Metric (ISO)</strong> threads following the M-designation standard,
            <strong> Imperial UNC/UNF</strong> threads used in the United States, and lead calculations
            for multi-start threads used in lead screws, ball screws, and power transmission applications.
          </p>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Thread Pitch Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Step-by-Step Guide</h3>
            <ol className="space-y-3 text-gray-700">
              {[
                "Select a calculation mode from the dropdown (Metric, Imperial, Measurement, or Lead)",
                "Enter the required values for your selected mode",
                "Results update instantly as you type — no button press needed",
                "View the thread designation, TPI, pitch, and closest standard thread",
                "Use Copy Result or Export TXT to save your calculation",
                "Save to History to recall previous calculations",
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
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Calculation Modes</h3>
            <ul className="space-y-3 text-gray-700">
              {[
                { label: "Metric Thread Pitch", desc: "Enter diameter and pitch in mm to get M-designation and TPI equivalent" },
                { label: "Imperial TPI", desc: "Count threads over a measured length to calculate TPI and pitch in inches" },
                { label: "Thread Measurement", desc: "Enter the measured distance between thread peaks to identify the thread" },
                { label: "Lead Calculator", desc: "Calculate lead for single, double, triple, or quad-start threads" },
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-primary font-bold mt-0.5">→</span>
                  <span><strong>{item.label}:</strong> {item.desc}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Thread Pitch Formulas Explained
        </h2>
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-5 bg-gray-50 border border-gray-200 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-3">Metric Thread Pitch</h3>
              <div className="font-mono text-base text-center bg-white border border-gray-200 rounded-lg p-3 mb-3">
                TPI = 25.4 ÷ Pitch (mm)
              </div>
              <p className="text-sm text-gray-600">
                Metric pitch is the direct distance between thread peaks in mm. An M10 × 1.5 bolt has a
                10 mm nominal diameter and 1.5 mm between each thread crest.
              </p>
            </div>
            <div className="p-5 bg-gray-50 border border-gray-200 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-3">Imperial TPI</h3>
              <div className="font-mono text-base text-center bg-white border border-gray-200 rounded-lg p-3 mb-3">
                TPI = Threads Counted ÷ Length (in)
              </div>
              <p className="text-sm text-gray-600">
                Count the number of thread peaks over a known length (usually 1 inch) to determine TPI.
                A 1/4-20 bolt has 20 threads per inch with a 0.05 inch pitch.
              </p>
            </div>
            <div className="p-5 bg-gray-50 border border-gray-200 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-3">Pitch from TPI</h3>
              <div className="font-mono text-base text-center bg-white border border-gray-200 rounded-lg p-3 mb-3">
                Pitch (in) = 1 ÷ TPI
              </div>
              <p className="text-sm text-gray-600">
                TPI and pitch are reciprocals. A 20 TPI thread has a pitch of 1/20 = 0.05 inches,
                which equals 0.05 × 25.4 = 1.27 mm.
              </p>
            </div>
            <div className="p-5 bg-gray-50 border border-gray-200 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-3">Lead Calculation</h3>
              <div className="font-mono text-base text-center bg-white border border-gray-200 rounded-lg p-3 mb-3">
                Lead = Pitch × Number of Starts
              </div>
              <p className="text-sm text-gray-600">
                Lead is the axial distance a screw advances per full rotation. A double-start screw with
                2 mm pitch has a 4 mm lead — it advances twice as fast as a single-start screw.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Common Thread Pitch Reference Table
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Thread</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Pitch (mm)</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">TPI</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Pitch (inch)</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Type</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["M6 × 1.0",    "1.000", "25.40", "0.0394", "Metric Coarse"],
                ["M8 × 1.25",   "1.250", "20.32", "0.0492", "Metric Coarse"],
                ["M10 × 1.5",   "1.500", "16.93", "0.0591", "Metric Coarse"],
                ["M12 × 1.75",  "1.750", "14.51", "0.0689", "Metric Coarse"],
                ["1/4\"-20 UNC","1.270", "20.00", "0.0500", "Imperial UNC"],
                ["3/8\"-16 UNC","1.588", "16.00", "0.0625", "Imperial UNC"],
                ["1/2\"-13 UNC","1.954", "13.00", "0.0769", "Imperial UNC"],
                ["3/4\"-10 UNC","2.540", "10.00", "0.1000", "Imperial UNC"],
                ["1\"-8 UNC",   "3.175",  "8.00", "0.1250", "Imperial UNC"],
              ].map(([thread, pitchmm, tpi, pitchin, type]) => (
                <tr key={thread} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-mono font-semibold text-primary">{thread}</td>
                  <td className="py-3 px-4 font-mono">{pitchmm}</td>
                  <td className="py-3 px-4 font-mono">{tpi}</td>
                  <td className="py-3 px-4 font-mono">{pitchin}</td>
                  <td className="py-3 px-4 text-gray-600">{type}</td>
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
            { icon: "🔩", title: "Fastener Identification",  color: "blue",   desc: "Identify unknown bolts and screws by measuring thread pitch and matching to standard designations." },
            { icon: "🏭", title: "CNC Machining",            color: "green",  desc: "Set correct thread pitch for lathe threading operations, tapping, and thread milling programs." },
            { icon: "🚗", title: "Automotive Repair",        color: "orange", desc: "Match replacement fasteners to OEM specifications. Prevent cross-threading in engine and chassis work." },
            { icon: "🔧", title: "Pipe Fitting",             color: "purple", desc: "Verify NPT, BSP, and metric pipe thread pitch to ensure leak-free connections in plumbing systems." },
            { icon: "⚙️", title: "Lead Screw Design",        color: "red",    desc: "Calculate lead for ball screws and ACME screws in linear motion systems and CNC axis drives." },
            { icon: "🎓", title: "Engineering Education",    color: "gray",   desc: "Understand thread standards, pitch-TPI relationships, and multi-start thread geometry." },
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
              q: "What is the difference between pitch and TPI?",
              a: "Pitch is the distance between thread crests in mm (metric) or inches (imperial). TPI (Threads Per Inch) is the number of thread cycles per inch. They are reciprocals: Pitch (inch) = 1 ÷ TPI. A 20 TPI thread has a pitch of 0.05 inches (1.27 mm).",
            },
            {
              q: "What does M10 × 1.5 mean?",
              a: "M10 × 1.5 is a metric thread designation. 'M' indicates metric, '10' is the nominal diameter in mm, and '1.5' is the thread pitch in mm (distance between thread peaks). This is the standard coarse pitch for 10 mm metric bolts.",
            },
            {
              q: "What is thread lead and how is it different from pitch?",
              a: "Lead is the axial distance a screw advances per complete rotation. For a single-start thread, lead equals pitch. For a double-start thread, lead = 2 × pitch. Multi-start threads advance faster per rotation while maintaining the same thread profile.",
            },
            {
              q: "How do I measure thread pitch without a gauge?",
              a: "Use the Thread Measurement Calculator mode. Place a ruler along the thread axis and count the number of peaks over a known distance. Divide the count by the length in inches to get TPI, or measure the distance between two adjacent peaks directly for pitch in mm.",
            },
            {
              q: "What is the difference between UNC and UNF threads?",
              a: "UNC (Unified National Coarse) has fewer threads per inch and is more common for general fastening. UNF (Unified National Fine) has more threads per inch, providing finer adjustment and better resistance to loosening under vibration. Both use the same thread form angle (60°).",
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
