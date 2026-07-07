export default function AgeCalculatorSEO() {
  const faqItems = [
    {
      q: "How do I calculate my exact age from date of birth?",
      a: "To calculate exact age, subtract the birth date from today's date accounting for actual calendar months and leap years — not just dividing total days by 365. For example, someone born on March 15, 1990 turns 35 years old on March 15, 2025. Between birthday milestones, you track the remaining months and days separately. This calculator handles all calendar edge cases automatically: leap year birthdays (February 29), months with different lengths, and historical dates.",
    },
    {
      q: "How many days have I lived?",
      a: "Your total days lived equals the number of calendar days from your date of birth to today, including leap years. Someone who is exactly 30 years old has lived approximately 10,957 days (30 × 365 + 7 or 8 leap days depending on birth year). This calculator shows your exact days, weeks, months, hours, minutes, and seconds lived in the Lifetime Statistics panel — updated to the current date each time you load the page.",
    },
    {
      q: "What happens if I was born on February 29 (leap day)?",
      a: "People born on February 29 officially turn a year older on March 1 in non-leap years — this is the most common legal convention used by most countries and this calculator follows the same rule. In leap years, your birthday falls on February 29 as expected. The next birthday countdown and milestone dates all account for this correctly.",
    },
    {
      q: "Can I calculate how old I will be on a future date?",
      a: "Yes. Change the 'comparison date' field to any future date and the calculator immediately shows your exact age on that date, including years, months, and days. This is useful for checking eligibility ages (retirement, pension, licensing), planning milestone celebrations, or simply satisfying curiosity about age at a future event.",
    },
    {
      q: "Can I calculate someone's age on a past date?",
      a: "Yes. Set the comparison date to any historical date to see exactly how old someone was at that point. This is commonly used to verify age at the time of a legal document signing, a historical event, or a family photo, and for genealogy research where birth and death records need to be cross-referenced.",
    },
    {
      q: "What is the 10,000 days milestone?",
      a: "The 10,000 days milestone — sometimes called '10K days' — falls at approximately 27 years and 4–5 months of age and has become a popular personal milestone to acknowledge. Other notable day milestones include 1,000 days (about 2 years 9 months), 5,000 days (about 13 years 8 months), 15,000 days (about 41 years), and 20,000 days (about 54 years 9 months). This calculator shows the exact date each milestone falls on and whether it has already passed.",
    },
    {
      q: "What is chronological age and why does it matter?",
      a: "Chronological age is your actual age in calendar time — the number of years, months, and days since you were born. It is distinct from biological age (how your body ages physically) or mental age. Chronological age is used for legal eligibility (voting, driving, retirement), medical dosing, educational enrollment, insurance actuarial tables, and statistical classification. This calculator computes chronological age precisely.",
    },
    {
      q: "What is batch age calculation and when is it useful?",
      a: "Batch mode lets you enter multiple dates of birth at once — one per line — and get all the ages calculated simultaneously, with an option to export the results as a CSV file. This is useful for teachers calculating student ages for class lists, HR administrators processing employee records, healthcare workers handling patient data, event planners checking guest eligibility, and anyone who regularly needs to process more than one DOB at a time.",
    },
    {
      q: "How is the Western zodiac sign determined?",
      a: "Western astrology divides the year into 12 signs based on the position of the sun at birth. The sign boundaries are fixed date ranges: Aries begins around March 21, Taurus April 20, Gemini May 21, Cancer June 21, Leo July 23, Virgo August 23, Libra September 23, Scorpio October 23, Sagittarius November 22, Capricorn December 22, Aquarius January 20, and Pisces February 19. This calculator determines your Western zodiac sign from your date of birth automatically.",
    },
    {
      q: "Is my date of birth stored or shared?",
      a: "No. All calculations happen entirely in your browser using JavaScript. The dates you enter are never sent to any server, stored in a database, or shared with third parties. The optional history feature uses browser localStorage — data stays only on your device and is cleared when you clear your browser data.",
    },
  ];

  const howToSteps = [
    ["Enter your date of birth", "Click the date of birth field and select your birth date from the date picker, or type it in MM/DD/YYYY format. The calculator accepts any date from 1900 to the present."],
    ["Set the comparison date", "By default the comparison date is today. Leave it as-is to calculate your current age, or change it to any past or future date to see your age at that specific point in time."],
    ["Read your exact age", "Your age appears instantly in years, months, and days. The result updates automatically whenever you change either date — no submit button needed."],
    ["Review lifetime statistics", "The Lifetime Stats panel shows your total months, weeks, days, hours, minutes, and seconds lived from birth to the comparison date. These numbers update in real time."],
    ["Check your next birthday", "The birthday countdown shows how many months and days remain until your next birthday, the total days left, and what day of the week your next birthday falls on."],
    ["Explore milestones and zodiac", "The milestones panel lists notable day and year milestones with their exact calendar dates, marking which ones you have already passed. Your Western and Chinese zodiac signs are shown based on your birth date."],
    ["Use batch mode for multiple people", "Switch to Batch mode, paste one birth date per line, and the calculator processes all entries simultaneously. Use the Export CSV button to download the results for school, HR, or admin use."],
  ];

  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is an Age Calculator?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            An <strong>age calculator</strong> is a free online tool that computes your exact age from your date of
            birth. Rather than returning a single number like "35 years," a proper age calculator breaks the result
            down into <strong>years, months, and days</strong> — because knowing you are 35 years, 4 months, and 12
            days old is the precise answer required for legal documents, medical forms, eligibility checks, and
            personal curiosity.
          </p>
          <p>
            The calculation sounds simple but involves real calendar complexity. Months have different lengths.
            Leap years add a day every four years. February 29 birthdays need special handling. Calculating the age
            of someone born on January 31 as of March 1 requires knowing whether the current year is a leap year.
            This tool handles all of those edge cases using calendar-aware date arithmetic — the same approach used
            by government and medical systems — not a rough approximation from dividing total days by 365.
          </p>
          <p>
            Beyond the age result, this calculator provides a full set of outputs useful for planning, records, and
            fun: <strong>total days and hours lived</strong>, a <strong>countdown to your next birthday</strong>,
            notable <strong>life milestones</strong> (1,000 days, 10,000 days, major birthdays), your{" "}
            <strong>Western and Chinese zodiac signs</strong>, and a <strong>batch mode</strong> for calculating
            ages for multiple people at once with CSV export.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How Age Is Calculated
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            The calculator uses calendar-aware date subtraction, not day-division arithmetic. The process works in
            three steps:
          </p>
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-5 my-4 space-y-3">
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-1">Step 1 — Subtract days</p>
              <p className="text-sm text-gray-600">If the target day is less than the birth day, borrow one month and add the number of days in the previous month to the difference.</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-1">Step 2 — Subtract months</p>
              <p className="text-sm text-gray-600">If the resulting months value is negative after Step 1, borrow one year and add 12 to the months.</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-1">Step 3 — Subtract years</p>
              <p className="text-sm text-gray-600">The remaining year difference is the completed years of age. The result: exact years, months, and days with no rounding.</p>
            </div>
          </div>
          <p>
            Lifetime statistics (total days, weeks, hours, etc.) are calculated from the raw millisecond difference
            between the two dates — a precise count, not an estimate. The next birthday is found by advancing the
            birth month and day to the next calendar year and computing the remaining days, accounting for leap year
            birthdays falling on February 29.
          </p>
        </div>
      </section>

      {/* ── 3. Step-by-Step Usage ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Age Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Step-by-Step Guide</h3>
            <ol className="space-y-4 text-gray-600 leading-relaxed">
              {howToSteps.map(([title, desc], i) => (
                <li key={i} className="flex items-start">
                  <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0 font-semibold">{i + 1}</span>
                  <span><strong>{title}:</strong> {desc}</span>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>What This Calculator Provides</h3>
            <ul className="space-y-2 text-gray-600">
              {[
                "Exact age — years, months, and days",
                "Total months, weeks, days, hours, minutes, seconds lived",
                "Next birthday date, weekday, and countdown",
                "Life milestones: 1K days, 5K days, 10K days, 15K days, 20K days",
                "Year milestones: 18, 21, 30, 40, 50, 60, 65, 80",
                "Western zodiac sign with symbol",
                "Chinese zodiac animal",
                "Age at any past or future comparison date",
                "Batch mode — multiple DOBs at once",
                "CSV export for batch results",
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
              title: "Legal and Administrative Eligibility Checks",
              scenario: "A passport application requires the applicant to be at least 18 years old at the date of travel. An administrator enters the applicant's DOB and sets the comparison date to the travel date — the exact age appears immediately. If the result shows 17 years, 11 months, and 22 days, the application must be handled differently than if it shows 18 years, 0 months, and 3 days. The precision here matters for compliance.",
            },
            {
              title: "School and Class Age Grouping",
              scenario: "A primary school administrator needs to verify that all students in an intake cohort are between 5 years 0 months and 5 years 11 months on the first day of term. They switch to batch mode, paste 30 birth dates, set the comparison date to September 1, and export the results as CSV. The spreadsheet shows exact ages for every child — the admin can sort and flag any outliers in seconds.",
            },
            {
              title: "Medical Age Verification",
              scenario: "A pharmacist needs to verify a patient's exact age in months for a weight-based paediatric drug dose that changes at 24 months. The patient's DOB is entered and the comparison date is today — the result shows 23 months and 18 days. The pharmacist knows the lower dosing bracket still applies and confirms the calculation with the calculator's output visible for documentation.",
            },
            {
              title: "Genealogy and Historical Research",
              scenario: "A genealogy researcher finds a great-grandparent's birth record from 1887 and a death record from 1951. They enter the birth date, set the comparison date to the death date, and get the exact age at death: 63 years, 8 months, and 14 days — more precise than the rounded figure that appears on the death certificate and useful for cross-referencing with census records that list age at the time of enumeration.",
            },
            {
              title: "Personal Milestone Planning",
              scenario: "Someone discovers their 10,000th day of life is approaching in three months. Using the milestones panel, they find the exact date — a Saturday — and decide to plan a celebration around it. They check which other milestones are close: 500 weeks falls the following month, and their 30th birthday is six weeks after that. Three milestones to celebrate in one quarter.",
            },
            {
              title: "Insurance and Financial Planning",
              scenario: "A financial adviser is helping a client determine the earliest date they can access pension benefits, which begin at age 55 years and 0 months. The adviser enters the client's DOB and changes the comparison date forward month by month until the result shows 55 years, 0 months, 0 days — giving the precise pension eligibility date to include in the financial plan.",
            },
          ].map(({ title, scenario }) => (
            <div key={title} className="bg-gray-50 border border-gray-100 rounded-lg p-5">
              <h3 className="font-semibold text-gray-800 mb-2 text-sm" style={{ fontFamily: "var(--font-heading)" }}>{title}</h3>
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
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Pro Tips</h3>
            <ul className="space-y-3 text-gray-600 leading-relaxed">
              {[
                "Use the comparison date field for eligibility checks rather than calculating manually. Change the comparison date to the cutoff date (e.g. first day of school, policy start date) to get the exact age on that day — not today.",
                "For batch processing, format all dates consistently before pasting. MM/DD/YYYY is the most reliable format. Mixed formats (some DD/MM, some MM/DD) will produce wrong results for ambiguous dates like 03/04/2000.",
                "The lifetime stats update to the current moment each time the page loads — so your total days and hours lived will be slightly different each time you visit, which is expected behavior.",
                "Use the milestone dates to plan ahead. If your 10,000th day falls on a weekday, you can see it months in advance and schedule something for the nearest weekend.",
                "For genealogy work, use very old birth dates (1800s, early 1900s) freely — the calendar-aware arithmetic works for any date within the supported range, regardless of how old the person would be.",
              ].map((tip, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-primary font-bold flex-shrink-0 mt-0.5">💡</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Common Mistakes to Avoid</h3>
            <ul className="space-y-3 text-gray-600 leading-relaxed">
              {[
                "Don't divide total days by 365 to calculate age — this ignores leap years and month lengths and produces results that can be off by several months for older ages. Always use calendar-aware arithmetic.",
                "Don't assume your age in years is the only number that matters. For medical dosing, insurance premium changes, and pension eligibility, the months and days component can mean the difference between two different tiers.",
                "Don't use the Western zodiac result for dates right on the cusp (e.g., October 22–23 for Libra/Scorpio) without double-checking — the exact cusp date shifts slightly year by year. This calculator uses standard fixed date ranges.",
                "Don't mix DD/MM/YYYY and MM/DD/YYYY formats in batch mode. Standardize all input dates to one format before pasting to avoid silent errors on ambiguous dates.",
                "Don't confuse chronological age with biological age. This calculator gives your chronological age — time elapsed since birth. Biological age (how your body has aged relative to average) requires medical assessment.",
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

      {/* ── 6. Reference Table ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Age Milestones &amp; Lifetime Statistics Reference
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Notable Day Milestones</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Days</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Approximate Age</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    ["1,000 days", "2 years, 9 months"],
                    ["5,000 days", "13 years, 8 months"],
                    ["10,000 days", "27 years, 4–5 months"],
                    ["15,000 days", "41 years, 1–2 months"],
                    ["20,000 days", "54 years, 9–10 months"],
                    ["25,000 days", "68 years, 6 months"],
                    ["30,000 days", "82 years, 2–3 months"],
                  ].map(([days, age]) => (
                    <tr key={days} className="hover:bg-gray-50">
                      <td className="py-2 px-3 font-mono font-semibold text-primary">{days}</td>
                      <td className="py-2 px-3 text-gray-600 text-xs">{age}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Lifetime Stats at Key Ages</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Age</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Total Days</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Total Hours</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    ["18 years", "~6,574",   "~157,776"],
                    ["21 years", "~7,670",   "~184,080"],
                    ["25 years", "~9,131",   "~219,144"],
                    ["30 years", "~10,957",  "~262,968"],
                    ["40 years", "~14,610",  "~350,640"],
                    ["50 years", "~18,263",  "~438,312"],
                    ["65 years", "~23,742",  "~569,808"],
                  ].map(([age, days, hours]) => (
                    <tr key={age} className="hover:bg-gray-50">
                      <td className="py-2 px-3 font-semibold text-gray-800">{age}</td>
                      <td className="py-2 px-3 font-mono text-primary font-semibold text-xs">{days}</td>
                      <td className="py-2 px-3 text-gray-600 text-xs">{hours}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Western Zodiac Signs by Birth Date</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-2 px-3 font-semibold text-gray-700">Sign</th>
                  <th className="text-left py-2 px-3 font-semibold text-gray-700">Date Range</th>
                  <th className="text-left py-2 px-3 font-semibold text-gray-700">Symbol</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  ["Aries",       "Mar 21 – Apr 19",  "♈"],
                  ["Taurus",      "Apr 20 – May 20",  "♉"],
                  ["Gemini",      "May 21 – Jun 20",  "♊"],
                  ["Cancer",      "Jun 21 – Jul 22",  "♋"],
                  ["Leo",         "Jul 23 – Aug 22",  "♌"],
                  ["Virgo",       "Aug 23 – Sep 22",  "♍"],
                  ["Libra",       "Sep 23 – Oct 22",  "♎"],
                  ["Scorpio",     "Oct 23 – Nov 21",  "♏"],
                  ["Sagittarius", "Nov 22 – Dec 21",  "♐"],
                  ["Capricorn",   "Dec 22 – Jan 19",  "♑"],
                  ["Aquarius",    "Jan 20 – Feb 18",  "♒"],
                  ["Pisces",      "Feb 19 – Mar 20",  "♓"],
                ].map(([sign, dates, symbol]) => (
                  <tr key={sign} className="hover:bg-gray-50">
                    <td className="py-2 px-3 font-semibold text-gray-800">{sign}</td>
                    <td className="py-2 px-3 text-gray-600 text-xs">{dates}</td>
                    <td className="py-2 px-3 text-xl">{symbol}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 mt-3">* Cusp dates shift slightly by year. Dates shown are standard fixed-range values used by this calculator.</p>
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
              <h3 className="font-semibold text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>{q}</h3>
              <p className="text-gray-600 leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 8. Who Uses This ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Who Uses This Age Calculator?
        </h2>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            {
              icon: "📋",
              title: "Administrative Staff",
              desc: "Verify exact ages for eligibility requirements in applications, registrations, and compliance processes. Batch mode handles class lists, employee records, and membership databases in a single export.",
            },
            {
              icon: "🏥",
              title: "Healthcare Professionals",
              desc: "Confirm precise patient age in years and months for paediatric dosing, developmental milestone tracking, age-stratified screening guidelines, and clinical documentation.",
            },
            {
              icon: "🔍",
              title: "Genealogists & Researchers",
              desc: "Calculate exact age at historical events, cross-reference census records with birth dates, and verify ages stated on historical documents by using any past comparison date.",
            },
            {
              icon: "💼",
              title: "Financial & Legal Advisers",
              desc: "Determine exact pension eligibility dates, retirement age milestones, insurance policy age brackets, and legal age thresholds by setting any future comparison date.",
            },
            {
              icon: "🎓",
              title: "Students & Parents",
              desc: "Check school enrollment age eligibility, calculate exact age for sports age-group categories, and track personal milestones like 10,000 days or major birthday years.",
            },
            {
              icon: "🎉",
              title: "Event Planners",
              desc: "Find upcoming birthday milestones months in advance, confirm the weekday a birthday falls on, and plan significant celebrations like 50th birthdays or 10,000-day anniversaries.",
            },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="bg-gray-50 border border-gray-100 rounded-lg p-5">
              <div className="text-2xl mb-2">{icon}</div>
              <h3 className="font-semibold text-gray-800 mb-1" style={{ fontFamily: "var(--font-heading)" }}>{title}</h3>
              <p className="text-sm text-gray-600">{desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
