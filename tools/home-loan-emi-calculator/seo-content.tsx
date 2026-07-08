export default function HomeLoanEmiCalculatorSEO() {
  const faqItems = [
    {
      q: "What is a home loan EMI and how is it calculated?",
      a: "EMI stands for Equated Monthly Installment — the fixed amount you pay every month to repay a home loan. Each payment covers two components: an interest portion (the cost of borrowing for that month) and a principal portion (the amount that reduces your outstanding balance). The calculation uses the standard amortization formula: EMI = P × r(1+r)ⁿ ÷ ((1+r)ⁿ−1), where P is the principal, r is the monthly interest rate (annual rate ÷ 12 ÷ 100), and n is the total number of months. This calculator applies that formula instantly as you adjust your inputs.",
    },
    {
      q: "Why does a longer loan tenure reduce my EMI but increase total interest?",
      a: "Spreading the principal over more months reduces each individual payment — which is why a 30-year tenure has a lower EMI than a 15-year tenure for the same loan. However, you are also paying interest for a longer period, which means the total interest paid over the life of the loan grows substantially. A $500,000 loan at 7.5% costs $198,160 in total interest over 10 years but $758,920 over 30 years — nearly four times more, despite the monthly payment being lower.",
    },
    {
      q: "How does a down payment affect my EMI?",
      a: "A down payment reduces the loan principal directly — every dollar of down payment is a dollar less that you borrow and pay interest on. For a $600,000 home, a $100,000 down payment reduces the principal to $500,000, which lowers both the monthly EMI and the total interest paid over the loan term. This calculator includes a down payment field so you can model the exact impact before deciding how much to put down.",
    },
    {
      q: "What is an amortization schedule and why does it matter?",
      a: "An amortization schedule is a complete table of every payment over the life of the loan, showing how much of each EMI goes toward interest and how much reduces the principal. In the early years of a loan, the majority of each payment is interest — for a 30-year mortgage, this can be 80–90% of the payment in year one. Understanding your amortization schedule helps you see the true cost of the loan and evaluate whether making extra payments or refinancing earlier would save significant money.",
    },
    {
      q: "What is the difference between fixed-rate and variable-rate home loans?",
      a: "A fixed-rate loan keeps the same interest rate for the entire tenure, so your EMI never changes — the amount shown by this calculator will be accurate for the life of the loan. A variable-rate (or adjustable-rate) loan has an interest rate that changes periodically based on a benchmark index. This calculator computes the EMI for a fixed rate, but you can manually re-enter a new rate at any time to see how a rate change would affect your payment.",
    },
    {
      q: "How do I compare two loan offers using this calculator?",
      a: "Use the Scenario Comparison panel. Enter your primary loan details in the main calculator, then open the Scenario panel and enter the alternative loan's rate and tenure. The side-by-side table shows both options with monthly EMI, total interest, and total payment — making it easy to see whether a lower rate, shorter tenure, or different principal produces meaningful savings.",
    },
    {
      q: "Should I choose the shortest tenure I can afford?",
      a: "Shorter tenures reduce total interest dramatically but require higher monthly payments. The right choice depends on your cash flow. A useful approach: calculate the EMI for your target tenure, then check whether that payment leaves enough monthly buffer for savings, emergencies, and other obligations. If a 15-year tenure is affordable without stress, it saves substantially more than a 30-year loan. If the higher payment would strain your budget, a longer tenure with optional extra payments may be safer.",
    },
    {
      q: "Can I use this calculator for mortgages outside India?",
      a: "Yes. The EMI formula is universal — it is the standard amortization formula used by banks worldwide. The calculator supports USD, EUR, GBP, INR, and BDT, so you can switch currency to match your loan. For country-specific considerations like government subsidies, stamp duty, mortgage insurance, or tax deductions, consult a local financial adviser.",
    },
    {
      q: "What happens to my EMI if interest rates rise after I take the loan?",
      a: "On a fixed-rate loan, nothing — your EMI stays the same regardless of market rate changes. On a variable-rate loan, your bank will typically either increase your EMI to cover the higher interest, or extend your tenure while keeping the EMI constant. You can model both scenarios in this calculator: enter the new rate to see the revised EMI, or extend the tenure to find the term needed to keep the payment the same.",
    },
    {
      q: "Is my data private when using this calculator?",
      a: "Yes. All calculations run entirely in your browser using JavaScript. The loan amount, interest rate, and other figures you enter are never transmitted to any server, stored in any database, or accessible to anyone other than you. The CSV export of the amortization schedule is generated locally on your device without any server-side processing.",
    },
  ];

  const howToSteps: [string, string][] = [
    ["Enter the loan amount", "Type the total home loan amount you need to borrow, or use the slider to adjust it. This is the property price minus your down payment if you prefer to enter the gross amount and let the calculator subtract it — or just enter the net principal directly."],
    ["Set the annual interest rate", "Enter the annual interest rate offered by your lender. Banks typically quote rates as an annual percentage. The calculator converts this to a monthly rate internally using annual rate ÷ 12 ÷ 100 for the EMI formula."],
    ["Choose the loan tenure", "Set the repayment period in years or months. Most home loans range from 5 to 30 years. Shorter tenures mean higher EMIs but less total interest paid; longer tenures mean lower EMIs but significantly more total interest over the life of the loan."],
    ["Add a down payment if applicable", "Enter the down payment amount to reduce the principal. The calculator subtracts the down payment from the loan amount automatically and recalculates the EMI on the net principal. Leave this blank if you have already entered the net loan amount directly."],
    ["Read the EMI and cost breakdown", "Your monthly EMI, total interest payable, total repayment amount, and estimated payoff date appear instantly. The pie chart shows the interest-to-principal ratio at a glance. Review the loan balance chart to see how your outstanding balance decreases over time."],
    ["Explore the amortization schedule", "Scroll to the amortization table to see every payment broken down by principal and interest — available in monthly or yearly view. Export the full schedule as a CSV file for use in your financial planning spreadsheet."],
    ["Compare loan scenarios", "Open the Scenario Comparison panel and enter a second loan's rate and tenure. The table shows both options side by side — monthly EMI, total interest, and total payment — so you can make a data-driven choice between two lender offers."],
  ];

  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is a Home Loan EMI Calculator?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            A <strong>home loan EMI calculator</strong> is a free online tool that computes your
            Equated Monthly Installment — the fixed amount you pay every month to repay a property
            loan. It answers the question every prospective home buyer needs answered before signing:{" "}
            <em>how much will this loan actually cost me each month, and how much will I pay in
            total by the time it is paid off?</em>
          </p>
          <p>
            The calculation involves more than simple division. Each EMI contains two components —
            an interest portion and a principal portion — whose proportions shift every single month
            over the life of the loan. In the early years, the vast majority of each payment goes
            toward interest, not the outstanding balance. This means a 30-year, $500,000 mortgage
            at 7.5% has a monthly payment of $3,497 — but by the time the loan is cleared you will
            have paid $758,920 in interest alone, on top of the $500,000 principal. Knowing this
            before you commit is what this calculator is for.
          </p>
          <p>
            Built for <strong>home buyers, property investors, mortgage seekers, financial
            planners, and first-time buyers</strong>, this tool goes well beyond a single EMI
            number. It provides a <strong>full amortization schedule</strong> showing every payment
            over the life of the loan, a <strong>loan balance chart</strong>, a{" "}
            <strong>principal-vs-interest pie chart</strong>, a <strong>scenario comparison</strong>{" "}
            panel for placing two loan offers side by side, and <strong>CSV export</strong> for
            taking your amortization data into a spreadsheet. Supports USD, EUR, GBP, INR, and BDT.
            Everything runs in your browser — no data is sent to any server.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How Home Loan EMI Is Calculated
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            The EMI formula is the standard amortization equation used by banks and lenders
            worldwide. It ensures that every monthly payment is exactly equal while the
            proportions of principal and interest within each payment shift gradually over time.
          </p>
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4 my-4">
            <p className="text-sm font-medium text-gray-500 mb-3">EMI Formula</p>
            <div className="space-y-2 font-mono text-sm text-gray-900">
              <p><span className="font-semibold">EMI</span> = P × r(1 + r)ⁿ ÷ ((1 + r)ⁿ − 1)</p>
              <p className="text-gray-500 text-xs mt-2">P = Principal loan amount (loan − down payment)</p>
              <p className="text-gray-500 text-xs">r = Monthly interest rate = annual rate ÷ 12 ÷ 100</p>
              <p className="text-gray-500 text-xs">n = Total number of months (years × 12)</p>
            </div>
          </div>
          <p>
            For each month in the amortization schedule, the interest component is calculated as{" "}
            <span className="font-mono text-sm">outstanding balance × monthly rate</span>, and
            the principal component is{" "}
            <span className="font-mono text-sm">EMI − interest component</span>. Because the
            outstanding balance decreases with each payment, the interest portion shrinks and the
            principal portion grows — this is what makes the amortization curve non-linear. The
            calculator builds the full schedule month by month and derives total interest, total
            repayment, and payoff date from that complete table.
          </p>
        </div>
      </section>

      {/* ── 3. Step-by-Step Usage ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Home Loan EMI Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              Step-by-Step Guide
            </h3>
            <ol className="space-y-4 text-gray-600 leading-relaxed">
              {howToSteps.map(([title, desc], i) => (
                <li key={i} className="flex items-start">
                  <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0 font-semibold">
                    {i + 1}
                  </span>
                  <span><strong>{title}:</strong> {desc}</span>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              What This Calculator Provides
            </h3>
            <ul className="space-y-2 text-gray-600">
              {[
                "Monthly EMI — recalculates instantly as you adjust inputs",
                "Total interest payable over the full loan term",
                "Total repayment amount (principal + interest)",
                "Estimated payoff date from today",
                "Principal vs interest pie chart",
                "Loan balance over time chart",
                "Full amortization schedule — monthly and yearly view",
                "Scenario comparison — two loan options side by side",
                "Down payment support to reduce principal",
                "CSV export of the complete repayment schedule",
                "Calculation history — last 10 saved locally",
                "Supports USD, EUR, GBP, INR, BDT",
                "100% browser-based — no data sent to any server",
              ].map((f, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="text-green-500 flex-shrink-0">✓</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── 4. Use Cases ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Real-World Use Cases
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              title: "First-Time Buyer — Setting a Budget",
              scenario:
                "A couple want to buy their first home and have been pre-approved for up to $450,000. Before making an offer, they enter $450,000 at 7.25% over 30 years — the EMI comes to $3,071 and total interest is $655,560. They reduce the tenure to 20 years: the EMI rises to $3,561 but total interest drops to $354,640, saving over $300,000. They decide on 20 years and factor the $3,561 monthly payment into their household budget before committing.",
            },
            {
              title: "Property Investor — Rental Yield Analysis",
              scenario:
                "An investor is evaluating a $320,000 rental property with a $64,000 down payment (20%). They enter principal $256,000, rate 7.0%, tenure 25 years — EMI is $1,810 per month. Rental income on the property is $2,200/month, leaving a $390 gross margin before maintenance and management fees. They use the amortization schedule to see when the principal balance drops below $200,000, identifying the point where cash flow improves enough to consider a second purchase.",
            },
            {
              title: "Comparing Two Lender Offers",
              scenario:
                "A borrower has quotes from two lenders for a $400,000 home loan: Bank A offers 7.2% over 25 years; Bank B offers 6.9% over 25 years. They enter Bank A's terms in the main calculator — EMI $2,875, total interest $462,500 — then open Scenario Comparison and enter Bank B's rate. The comparison shows Bank B's EMI is $2,803, a saving of $72 per month and $21,600 over the full 25 years. The decision is clear.",
            },
            {
              title: "Refinancing Decision",
              scenario:
                "A homeowner took a $380,000 loan 5 years ago at 8.5% over 30 years. They now owe approximately $355,000 and their bank is offering a refinance at 6.8%. They enter $355,000 at 6.8% over 25 years — the new EMI is $2,479, compared to their current $2,921. Monthly saving: $442. Total interest on the new loan: $388,700 vs $647,540 remaining on the current loan. They export the amortization schedule to compare the two paths side by side before proceeding.",
            },
            {
              title: "Down Payment Trade-Off Analysis",
              scenario:
                "A buyer is deciding between a 10% down payment ($60,000) and a 20% down payment ($120,000) on a $600,000 home. With 10% down: principal $540,000, EMI at 7.5% over 30 years = $3,776, total interest $819,360. With 20% down: principal $480,000, same terms, EMI = $3,357, total interest $728,520. The extra $60,000 down reduces the monthly payment by $419 and saves $90,840 in interest. The buyer weighs this against keeping the $60,000 as an investment.",
            },
            {
              title: "Financial Planner — Client Home Loan Review",
              scenario:
                "A financial planner is reviewing a client's home loan taken 8 years ago: $500,000 at 6.0% over 30 years. The client asks whether making an additional $500/month payment would make a significant difference. The planner uses the scenario comparison to model the original loan alongside a revised tenure, determining that the extra payment would reduce the loan term by approximately 7 years and save over $85,000 in interest — a concrete recommendation backed by amortization data.",
            },
          ].map(({ title, scenario }) => (
            <div key={title} className="bg-gray-50 border border-gray-100 rounded-lg p-5">
              <h3 className="font-semibold text-gray-800 mb-2 text-sm" style={{ fontFamily: "var(--font-heading)" }}>
                {title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">{scenario}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 5. Tips & Best Practices ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Tips &amp; Best Practices
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              Pro Tips
            </h3>
            <ul className="space-y-3 text-gray-600 leading-relaxed">
              {[
                "Use the tenure slider to find your EMI sweet spot rather than committing to the longest available term. Reducing from 30 to 25 years on a $500,000 loan at 7.5% cuts total interest by roughly $155,000 while only increasing the monthly payment by $183 — a significant long-term saving for a manageable short-term increase.",
                "Run the scenario comparison before visiting a second lender. Enter your best current offer first, then use Scenario B for alternatives. Seeing the exact dollar difference in total interest makes rate negotiations much more concrete.",
                "Export the amortization schedule to a CSV and open it in a spreadsheet before your bank meeting. Knowing exactly how much principal remains at year 5, 10, and 15 helps you ask informed questions about prepayment options and penalties.",
                "If you are considering a variable-rate loan, model a rate increase of 1.5–2% using the main calculator. Enter the same principal and tenure at the higher rate to see what your EMI would become — make sure you can still afford the payment at the stressed rate before accepting a variable offer.",
                "For investment properties, use the yearly amortization view to find the crossover year where your annual principal repayment exceeds your annual interest payment. This is often a useful milestone for refinancing decisions and tax planning.",
              ].map((tip, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-primary font-bold flex-shrink-0 mt-0.5">💡</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              Common Mistakes to Avoid
            </h3>
            <ul className="space-y-3 text-gray-600 leading-relaxed">
              {[
                "Don't compare loans by EMI alone. A lower EMI almost always means either a longer tenure or a lower principal — both of which can result in significantly higher total interest. Always check the total repayment amount alongside the monthly payment when evaluating offers.",
                "Don't forget to account for costs beyond the EMI. Home loan costs include property taxes, insurance, maintenance, and (in many countries) mortgage insurance on loans with less than 20% down. Budget these separately — they are not captured in the EMI figure.",
                "Don't enter the monthly interest rate if your lender quoted an annual rate. Banks and lenders universally quote annual rates. Enter the annual rate exactly as quoted; the calculator divides by 12 internally.",
                "Don't assume a shorter tenure is always better for your cash flow. A higher EMI on a 15-year loan reduces flexibility. If your income is variable or you anticipate large expenses (education, medical), a longer tenure with occasional extra payments may be safer than locking in a higher mandatory monthly obligation.",
                "Don't use a rounded EMI estimate when planning your budget. The exact EMI from the formula may differ from a mental estimate by $20–50 per month. Multiply the exact figure by 12 and by the full tenure to get your actual total commitment — the difference compounds significantly over 20–30 years.",
              ].map((mistake, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-red-400 font-bold flex-shrink-0 mt-0.5">✕</span>
                  <span>{mistake}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── 6. Reference Tables ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          EMI &amp; Interest Reference Tables
        </h2>

        {/* EMI by loan amount and rate */}
        <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
          Monthly EMI by Loan Amount &amp; Interest Rate (20-Year Tenure)
        </h3>
        <div className="overflow-x-auto mb-8">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Loan Amount</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">6.0%</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">6.5%</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">7.0%</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">7.5%</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">8.0%</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["$200,000", "$1,432", "$1,491", "$1,551", "$1,612", "$1,673"],
                ["$300,000", "$2,149", "$2,237", "$2,327", "$2,419", "$2,510"],
                ["$400,000", "$2,865", "$2,982", "$3,102", "$3,225", "$3,347"],
                ["$500,000", "$3,582", "$3,728", "$3,878", "$4,028", "$4,183"],
                ["$750,000", "$5,372", "$5,592", "$5,817", "$6,043", "$6,275"],
                ["$1,000,000","$7,164","$7,456","$7,756","$8,056","$8,366"],
              ].map(([loan, r6, r65, r7, r75, r8]) => (
                <tr key={loan} className="hover:bg-gray-50">
                  <td className="py-2 px-3 font-semibold text-gray-800">{loan}</td>
                  <td className="py-2 px-3 font-mono text-xs text-gray-600">{r6}</td>
                  <td className="py-2 px-3 font-mono text-xs text-gray-600">{r65}</td>
                  <td className="py-2 px-3 font-mono text-xs text-gray-600">{r7}</td>
                  <td className="py-2 px-3 font-mono text-xs text-primary font-semibold">{r75}</td>
                  <td className="py-2 px-3 font-mono text-xs text-gray-600">{r8}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Tenure effect */}
        <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
          How Tenure Affects EMI &amp; Total Interest — $500,000 at 7.5%
        </h3>
        <div className="overflow-x-auto mb-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Tenure</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Monthly EMI</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Total Interest</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Total Payment</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Interest as % of loan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["10 years", "$5,818", "$198,160",  "$698,160",  "39.6%"],
                ["15 years", "$4,644", "$335,920",  "$835,920",  "67.2%"],
                ["20 years", "$4,028", "$466,720",  "$966,720",  "93.3%"],
                ["25 years", "$3,680", "$604,000",  "$1,104,000","120.8%"],
                ["30 years", "$3,497", "$758,920",  "$1,258,920","151.8%"],
              ].map(([tenure, emi, interest, total, pct]) => (
                <tr key={tenure} className="hover:bg-gray-50">
                  <td className="py-2 px-3 font-semibold text-gray-800">{tenure}</td>
                  <td className="py-2 px-3 font-mono text-xs text-primary font-semibold">{emi}</td>
                  <td className="py-2 px-3 font-mono text-xs text-gray-600">{interest}</td>
                  <td className="py-2 px-3 font-mono text-xs text-gray-700">{total}</td>
                  <td className="py-2 px-3 font-mono text-xs text-red-500">{pct}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 mt-1 mb-8">
          * Total interest grows as tenure increases. A 30-year loan pays 151.8% of the original principal in interest alone.
        </p>

        {/* EMI formula reference */}
        <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
          EMI Formula Components
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Variable</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Meaning</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Example ($500k, 7.5%, 20 yr)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["P",       "Principal (loan − down payment)",          "$500,000"],
                ["r",       "Monthly rate = annual rate ÷ 12 ÷ 100",   "7.5 ÷ 12 ÷ 100 = 0.00625"],
                ["n",       "Total months = years × 12",                "20 × 12 = 240"],
                ["EMI",     "P × r(1+r)ⁿ ÷ ((1+r)ⁿ − 1)",             "$4,028"],
                ["Interest (month 1)", "P × r",                        "$500,000 × 0.00625 = $3,125"],
                ["Principal (month 1)","EMI − interest",                "$4,028 − $3,125 = $903"],
              ].map(([v, meaning, ex]) => (
                <tr key={v} className="hover:bg-gray-50">
                  <td className="py-2 px-3 font-mono font-semibold text-primary text-xs">{v}</td>
                  <td className="py-2 px-3 text-xs text-gray-700">{meaning}</td>
                  <td className="py-2 px-3 font-mono text-xs text-green-600">{ex}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── 7. FAQ ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {faqItems.map(({ q, a }, i) => (
            <div key={i} className={i < faqItems.length - 1 ? "border-b border-gray-100 pb-6" : ""}>
              <h3 className="font-semibold text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                {q}
              </h3>
              <p className="text-gray-600 leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 8. Who Uses This ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Who Uses This Home Loan EMI Calculator?
        </h2>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            {
              icon: "🏠",
              title: "First-Time Home Buyers",
              desc: "Translate a property price into a monthly payment before making an offer. Adjust tenure and down payment to find a combination that fits within monthly budget constraints.",
            },
            {
              icon: "🏗️",
              title: "Property Investors",
              desc: "Calculate debt service on potential acquisitions, assess cash flow viability, and identify the point in the amortization schedule where equity build-up accelerates enough to refinance.",
            },
            {
              icon: "🏦",
              title: "Mortgage Shoppers",
              desc: "Compare two or more lender offers side by side using the Scenario Comparison panel. See the exact difference in monthly EMI, total interest, and total repayment — not just the rate.",
            },
            {
              icon: "📊",
              title: "Financial Planners",
              desc: "Model home loan scenarios for clients, demonstrate the long-term cost of a lower down payment, and show concretely how much a shorter tenure or extra monthly payment saves in total interest.",
            },
            {
              icon: "💼",
              title: "Real Estate Agents",
              desc: "Show buyers realistic monthly payment estimates for properties at different price points during viewings. Export amortization schedules to share with clients considering their financing options.",
            },
            {
              icon: "🔄",
              title: "Refinancing Homeowners",
              desc: "Compare existing loan terms against a refinance offer. Enter the current outstanding balance at the new proposed rate and tenure to see exact savings in monthly payment and total interest before applying.",
            },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="bg-gray-50 border border-gray-100 rounded-lg p-5">
              <div className="text-2xl mb-2">{icon}</div>
              <h3 className="font-semibold text-gray-800 mb-1" style={{ fontFamily: "var(--font-heading)" }}>
                {title}
              </h3>
              <p className="text-sm text-gray-600">{desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
