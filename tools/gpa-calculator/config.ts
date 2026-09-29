import { siteConfig } from "@/config/site";

export const gpaCalculatorConfig = {
  name: "GPA Calculator",
  description: "Calculate your weighted and unweighted GPA on the US 4.0 scale from letter grades and credits, and see your new cumulative GPA.",
  icon: "🎓",
  category: "calculator",
  slug: "gpa-calculator",
  seo: {
    title: "GPA Calculator – Weighted, Unweighted & Cumulative",
    description: "Calculate your semester GPA on the 4.0 scale from letter grades and credit hours, with honors and AP weighting and your new cumulative GPA. Free, no sign-up.",
    keywords: [
      "gpa calculator",
      "weighted gpa calculator",
      "unweighted gpa calculator",
      "cumulative gpa calculator",
      "college gpa calculator",
      "high school gpa calculator",
      "semester gpa calculator",
      "4.0 scale calculator",
      "how to calculate gpa",
      "grade point average",
    ],
    og: {
      title: "GPA Calculator – Weighted, Unweighted & Cumulative",
      description: "Calculate your semester GPA on the 4.0 scale from letter grades and credit hours, with honors and AP weighting and your new cumulative GPA. Free, no sign-up.",
      url: `${siteConfig.url}/tools/calculator/gpa-calculator`,
    },
    howToSteps: [
      { name: "Add your courses", text: "Enter each course with its letter grade and its credit hours (or 1 for every class if your school does not use credits)." },
      { name: "Set the course level", text: "Mark honors and AP, IB or college-level classes to get a weighted GPA; leave them as regular for an unweighted GPA only." },
      { name: "Read your GPA", text: "See your unweighted and weighted GPA for the term, the credits counted and your total quality points." },
      { name: "Update your cumulative GPA", text: "Optionally enter your GPA and credits so far to see your new cumulative GPA after this term." },
    ],
    faq: [
      { q: "How is GPA calculated?", a: "Each letter grade is worth grade points (A = 4.0, B = 3.0, C = 2.0, D = 1.0, F = 0). Multiply each course's points by its credits, add the results and divide by the total credits. An A in a 4-credit class, a B+ in a 3-credit class, an A− in a 3-credit class and a C in a 2-credit class give 41 quality points over 12 credits, a GPA of 3.42." },
      { q: "What is the difference between weighted and unweighted GPA?", a: "An unweighted GPA uses the 4.0 scale for every class. A weighted GPA, used by many US high schools, adds a bonus for harder classes, commonly +0.5 for honors and +1.0 for AP or IB, so it can go above 4.0. In the example above, with the A in an AP class and the A− in an honors class, the weighted GPA is 3.88." },
      { q: "How do I calculate my cumulative GPA?", a: "Combine the quality points of every term and divide by all the credits. If you had a 3.2 GPA over 30 credits and earn a 3.42 GPA over 12 credits this term, your new cumulative GPA is (3.2 × 30 + 41) ÷ 42 = 3.26." },
      { q: "Is an A+ worth 4.0 or 4.3?", a: "Most US colleges cap an A+ at 4.0, but some count it as 4.3. Tick the A+ = 4.3 option if your school does." },
      { q: "Can I use this outside the US?", a: "The 4.0 letter scale is American. Other countries use different systems, such as UK degree classifications, the European ECTS A–F scale, the German 1–5 scale or percentage marks, and converting between them depends on the institution. Use your school's or the receiving university's official conversion table." },
    ],
  },
};
