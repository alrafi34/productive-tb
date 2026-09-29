import { siteConfig } from "@/config/site";

export const paycheckCalculatorConfig = {
  name: "Paycheck Calculator",
  description: "Estimate take-home pay per paycheck after federal and state tax, Social Security, Medicare and 401(k), or UK income tax, NI and pension.",
  icon: "💵",
  category: "calculator",
  slug: "paycheck-calculator",
  seo: {
    title: "Paycheck Calculator – Take-Home Pay After Tax (US & UK)",
    description: "Work out your take-home pay per paycheck: 2026 federal tax, FICA, state tax and 401(k) for the US, or 2026/27 income tax, NI and pension for the UK.",
    keywords: [
      "paycheck calculator",
      "take home pay calculator",
      "salary after tax calculator",
      "net pay calculator",
      "hourly paycheck calculator",
      "federal tax withholding calculator",
      "uk take home pay calculator",
      "income tax and national insurance calculator",
      "biweekly paycheck calculator",
      "gross to net salary",
    ],
    og: {
      title: "Paycheck Calculator – Take-Home Pay After Tax (US & UK)",
      description: "Work out your take-home pay per paycheck: 2026 federal tax, FICA, state tax and 401(k) for the US, or 2026/27 income tax, NI and pension for the UK.",
      url: `${siteConfig.url}/tools/calculator/paycheck-calculator`,
    },
    howToSteps: [
      { name: "Choose your country and pay schedule", text: "Pick the United States, the United Kingdom or another country, and how often you are paid: weekly, every two or four weeks, twice a month or monthly." },
      { name: "Enter your pay", text: "Type your gross annual salary, or your hourly rate and hours per week." },
      { name: "Add your details", text: "In the US, choose your filing status and enter your 401(k) percentage, pre-tax health deductions and state income tax rate. In the UK, enter your workplace pension. Elsewhere, enter your average income tax, social security and pension rates." },
      { name: "Read your take-home pay", text: "See your net pay per paycheck and per year, every deduction line by line, and your marginal tax rate." },
    ],
    faq: [
      { q: "How is take-home pay calculated in the US?", a: "Gross pay minus federal income tax, Social Security (6.2% up to $184,500 of wages in 2026), Medicare (1.45%, plus 0.9% above $200,000 for single filers), state and local income tax, and pre-tax deductions such as 401(k) contributions and health premiums. A single filer earning $65,000 who puts 5% in a 401(k) and pays 4% state tax takes home about $49,080 a year, or $1,888 every two weeks." },
      { q: "How is federal income tax worked out?", a: "Pre-tax deductions and the standard deduction ($16,100 for single filers in 2026, $32,200 for married couples filing jointly) are taken off first, then the rest is taxed in brackets: 10%, 12%, 22%, 24%, 32%, 35% and 37%. Only the income inside each bracket is taxed at that bracket's rate, so a raise never lowers your take-home pay." },
      { q: "Which states have no income tax?", a: "Alaska, Florida, Nevada, New Hampshire, South Dakota, Tennessee, Texas, Washington and Wyoming do not tax wages, so set the state rate to 0. Elsewhere, enter your average state rate; some cities, such as New York City, add their own income tax." },
      { q: "How is UK take-home pay calculated?", a: "For 2026/27 you pay no income tax on the first £12,570, 20% on the next £37,700, 40% up to £125,140 and 45% above, and 8% National Insurance on earnings between £12,570 and £50,270, then 2%. On £35,000 with a 5% pension, take-home pay is about £27,320 a year, or £2,277 a month. Scotland has its own income tax bands." },
      { q: "Why does my paycheck differ from this estimate?", a: "Your employer withholds based on your W-4 or tax code, and your pay may include bonuses, overtime, benefits, garnishments or student loan repayments that this estimate leaves out. The yearly result is closer to what you owe than any single paycheck." },
      { q: "How do 401(k) and pension contributions affect take-home pay?", a: "Traditional 401(k) contributions come out before federal and most state income tax, so each dollar saved lowers your take-home pay by less than a dollar; they do not reduce Social Security and Medicare tax. UK pension contributions under a net pay arrangement reduce income tax but not National Insurance." },
      { q: "Can I use it for other countries?", a: "Yes, with the Other country option. Enter your average income tax and social security rates, which you can find on a recent payslip by dividing each deduction by your gross pay, and choose your currency." },
    ],
  },
};
