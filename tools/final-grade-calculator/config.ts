import { siteConfig } from "@/config/site";

export const finalGradeCalculatorConfig = {
  name: "Final Grade Calculator",
  description: "Find the score you need on your final exam to reach the course grade you want, or see what grade a given final score will give you.",
  icon: "📝",
  category: "calculator",
  slug: "final-grade-calculator",
  seo: {
    title: "Final Grade Calculator – What Do I Need on My Final?",
    description: "Find the score you need on your final exam to get an A, B or C in the class, from your current grade and the final's weight. Or see the grade a score gives you.",
    keywords: [
      "final grade calculator",
      "final exam calculator",
      "what do i need on my final",
      "final exam grade calculator",
      "grade needed on final",
      "required final exam score",
      "course grade calculator",
      "exam score calculator",
      "weighted grade calculator",
    ],
    og: {
      title: "Final Grade Calculator – What Do I Need on My Final?",
      description: "Find the score you need on your final exam to get an A, B or C in the class, from your current grade and the final's weight. Or see the grade a score gives you.",
      url: `${siteConfig.url}/tools/calculator/final-grade-calculator`,
    },
    howToSteps: [
      { name: "Enter your current grade", text: "Type your grade in the class so far, as a percentage, from your syllabus or online gradebook." },
      { name: "Enter the final's weight", text: "Type how much the final exam counts toward the course grade, such as 20% or 30%." },
      { name: "Choose your goal", text: "Enter the course grade you want to finish with to see the final exam score you need, plus the score needed for an A, B, C and D." },
      { name: "Or check a score", text: "Switch to the other mode and enter a final exam score to see the course grade it would give you." },
    ],
    faq: [
      { q: "How do I calculate the grade I need on my final?", a: "Required score = (goal − current grade × (1 − w)) ÷ w, where w is the final's weight as a decimal. With an 85% in the class, a final worth 20% and a goal of 90%, you need (90 − 85 × 0.8) ÷ 0.2 = 110% — out of reach without extra credit. For an 88% goal you would need 100%, and for 80% only 60%." },
      { q: "What if the score I need is over 100%?", a: "Then the goal cannot be reached with the final alone unless your teacher offers extra credit or bonus points. Aim for the next grade down; the table shows the score needed for each letter grade." },
      { q: "What if the score I need is negative?", a: "Then you have already secured that grade: even a zero on the final keeps you at or above it, as long as you take the exam and your course has no minimum-score rule for the final." },
      { q: "What grade will I get if I score a certain mark on the final?", a: "Course grade = current grade × (1 − w) + final score × w. With 85% in the class and a 20% final, a 70% on the final gives 85 × 0.8 + 70 × 0.2 = 82%." },
      { q: "Does this work with points-based or weighted categories?", a: "Yes, as long as you use your current grade as a percentage and the share of the course grade the final is worth. If your class uses total points, the final's weight is its points divided by the course's total points." },
      { q: "Which percentage is an A, B or C?", a: "The table uses the common US cut-offs: A from 90%, B from 80%, C from 70% and D from 60%. Schools and teachers vary, and many add plus and minus grades, so check your syllabus." },
    ],
  },
};
