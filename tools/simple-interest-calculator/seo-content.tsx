import React from "react";

export default function ToolSEOContent() {
  return (
    <div className="mt-16 space-y-16">
      {/* Intro Section */}
      <section className="bg-white rounded-[40px] p-10 border border-gray-100 shadow-sm relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <h2 className="text-3xl font-black text-gray-900 mb-6 flex items-center gap-3">
            <span className="text-emerald-600">📊</span> 
            Understanding Simple Interest
          </h2>
          <div className="prose prose-emerald max-w-none text-gray-600 leading-relaxed font-medium">
            <p>
              In the world of finance, <strong>Simple Interest</strong> is a quick and easy method of calculating the interest charge on a loan or the growth of an investment. Unlike compound interest, which calculates interest on the principal plus any accumulated interest, simple interest is determined solely by the initial amount of money borrowed or invested (the principal).
            </p>
            <p className="mt-4">
              Our <strong>Simple Interest Calculator</strong> is designed for high precision and immediate utility. It allows students, borrowers, and investors to perform complex financial modeling instantly within their browser, supported by a modern interface that prioritizes clarity and speed.
            </p>
          </div>
        </div>
        <div className="absolute right-0 bottom-0 text-[12rem] font-black text-emerald-50/50 -mb-16 -mr-12 italic pointer-events-none select-none">
          CASH
        </div>
      </section>

      {/* The Formula Section */}
      <section className="bg-gray-900 rounded-[40px] p-12 text-white shadow-2xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="lg:w-1/2 space-y-6">
            <h2 className="text-4xl font-black mb-8 flex items-center gap-3">
              <span className="text-emerald-400">🧮</span> 
              The SI Formula
            </h2>
            <div className="bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10 shadow-2xl">
              <div className="text-5xl font-black text-emerald-400 mb-4 text-center">
                I = P × R × T
              </div>
              <div className="grid grid-cols-2 gap-4 text-xs font-bold uppercase tracking-widest text-gray-400 border-t border-white/10 pt-6">
                <div className="flex flex-col gap-1 italic"><span className="text-white not-italic">I</span> Interest</div>
                <div className="flex flex-col gap-1 italic"><span className="text-white not-italic">P</span> Principal</div>
                <div className="flex flex-col gap-1 italic"><span className="text-white not-italic">R</span> Rate (Decimal)</div>
                <div className="flex flex-col gap-1 italic"><span className="text-white not-italic">T</span> Time (Years)</div>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 prose prose-invert prose-emerald">
            <h3 className="text-2xl font-black text-emerald-400">How to use this formula?</h3>
            <p className="text-gray-400 font-medium">To calculate simple interest accurately, you must ensure your units are consistent. If your rate is per year, your time must also be in years. Our tool handles this conversion automatically for you!</p>
            <ul className="text-gray-300 space-y-3 font-medium">
               <li><strong>Convert Months:</strong> Total Months / 12</li>
               <li><strong>Convert Days:</strong> Total Days / 365</li>
               <li><strong>Total Amount:</strong> Principal + Calculated Interest</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            title: "Instant Results",
            desc: "Watch your interest and totals update in real-time as you adjust any numeric input.",
            icon: "⚡",
            color: "emerald"
          },
          {
            title: "Unit Conversion",
            desc: "Seamlessly switch between years, months, and days without manually doing the math.",
            icon: "🗓️",
            color: "teal"
          },
          {
            title: "Private & Secure",
            desc: "All calculations are processed locally on your device. Your financial data never leaves your browser.",
            icon: "🔒",
            color: "emerald"
          }
        ].map((item, i) => (
          <div key={i} className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm flex flex-col items-center text-center group hover:scale-[1.02] transition-all duration-300">
             <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-inner group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-500">{item.icon}</div>
             <h3 className="text-xl font-black text-gray-900 mb-3">{item.title}</h3>
             <p className="text-gray-500 text-sm font-medium leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </section>

      {/* FAQ Accordion-like Section */}
      <section className="bg-white rounded-[40px] p-10 border border-gray-100 shadow-sm font-inter">
        <h2 className="text-3xl font-black text-gray-900 mb-10 text-center">Frequently Asked Questions</h2>
        <div className="max-w-4xl mx-auto divide-y divide-gray-100">
          <div className="py-6 space-y-3">
             <h3 className="text-lg font-bold text-gray-800">What is the difference between Simple and Compound interest?</h3>
             <p className="text-gray-600 text-sm font-medium leading-relaxed">Simple interest is calculated only on the principal amount. Compound interest is calculated on the principal plus any interest that has accumulated in previous periods.</p>
          </div>
          <div className="py-6 space-y-3">
             <h3 className="text-lg font-bold text-gray-800">Can I use this for car loans?</h3>
             <p className="text-gray-600 text-sm font-medium leading-relaxed">Many car loans use simple interest rather than compound interest, making this calculator perfect for estimating your total repayment obligation before signing a contract.</p>
          </div>
          <div className="py-6 space-y-3">
             <h3 className="text-lg font-bold text-gray-800">How accurate is the 'Days' calculation?</h3>
             <p className="text-gray-600 text-sm font-medium leading-relaxed">Our calculator uses the standard 365-day year model. Some banking institutions may use a 360-day 'Banker's Year', but for 99% of general calculations, our method is the industry standard.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
