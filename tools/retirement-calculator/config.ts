import { siteConfig } from "@/config/site";

export const retirementCalculatorConfig = {
  name: "Retirement Calculator (401k)",
  description: "Project your retirement savings from your contributions, employer match, salary growth and investment returns, in future and today's money.",
  icon: "🏖️",
  category: "calculator",
  slug: "retirement-calculator",
  seo: {
    title: "Retirement Calculator – 401(k) & Pension Savings Projection",
    description: "Project your 401(k) or pension at retirement with employer match, salary growth, returns and inflation, and see the yearly income it could pay in today's money.",
    keywords: [
      "retirement calculator",
      "401k calculator",
      "retirement savings calculator",
      "401k employer match calculator",
      "pension calculator",
      "how much will I have at retirement",
      "retirement planner",
      "401k growth calculator",
      "retirement income calculator",
      "4% rule calculator",
    ],
    og: {
      title: "Retirement Calculator – 401(k) & Pension Savings Projection",
      description: "Project your 401(k) or pension at retirement with employer match, salary growth, returns and inflation, and see the yearly income it could pay in today's money.",
      url: `${siteConfig.url}/tools/calculator/retirement-calculator`,
    },
    howToSteps: [
      { name: "Enter your ages and savings", text: "Type your current age, the age you plan to retire and how much you have saved for retirement so far." },
      { name: "Enter your salary and contribution", text: "Type your annual salary, the percentage of pay you contribute and how fast you expect your salary to grow." },
      { name: "Add your employer match", text: "Enter the match rate and the cap from your plan, for example 50% on contributions up to 6% of pay." },
      { name: "Set the assumptions", text: "Choose an average annual return, inflation and a withdrawal rate; for US dollars you can cap contributions at the current 401(k) limit." },
      { name: "Read the projection", text: "See the balance at retirement in future and today's money, how much came from you, your employer and growth, the yearly income it could pay, and the year-by-year table." },
    ],
    faq: [
      { q: "How much will I have when I retire?", a: "The calculator grows your savings each year at your expected return and adds your contributions and your employer's match. For example, a 35-year-old with $50,000 saved, earning $75,000 with 3% raises, contributing 10% with a 50% match up to 6%, at a 6% return, would have roughly $1.58 million at 67, or about $720,000 in today's money at 2.5% inflation." },
      { q: "How does an employer 401(k) match work?", a: "A common formula is 50% of what you contribute, on contributions up to 6% of your salary. On a $75,000 salary, contributing 6% ($4,500) earns a $2,250 match. Contributing less than the cap leaves free money unclaimed; contributing more is fine but is not matched." },
      { q: "What are the 401(k) limits for 2026?", a: "Employees can defer up to $24,500 in 2026. From age 50 you can add a $8,000 catch-up contribution, and at ages 60 to 63 a higher catch-up of $11,250. Employer contributions do not count toward your limit but count toward the overall annual additions limit." },
      { q: "What return should I assume?", a: "Many planners use 5–7% a year for a mostly stock portfolio over the long run and less for bonds. Returns vary widely from year to year and are not guaranteed, so try a lower figure to see a cautious case." },
      { q: "What is the 4% rule?", a: "A rule of thumb from US studies of historical returns: withdrawing 4% of your savings in the first year of retirement and then raising the amount with inflation has lasted at least 30 years in most past markets. $1 million would give about $40,000 in the first year, before tax." },
      { q: "Why show the result in today's money?", a: "Prices rise over time, so $1.58 million in 32 years will buy much less than it does today. Dividing by accumulated inflation shows what the future balance would be worth in today's prices, which is easier to compare with your current spending." },
      { q: "Does it work for a UK or European pension?", a: "Yes. Choose your currency and turn off the 401(k) cap. In the UK, auto-enrolment workplace pensions need at least 8% of qualifying earnings in total, of which at least 3% comes from the employer, so enter your own and your employer's rates to match your scheme." },
    ],
  },
};
