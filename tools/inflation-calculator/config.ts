import { siteConfig } from "@/config/site";

export const inflationCalculatorConfig = {
  name: "Inflation Calculator",
  description: "See what a US dollar amount from any month or year since 1913 is worth today, using official CPI-U data from the Bureau of Labor Statistics.",
  icon: "📈",
  category: "calculator",
  slug: "inflation-calculator",
  seo: {
    title: "Inflation Calculator – Value of the US Dollar Since 1913",
    description: "Find what money from any year or month since 1913 is worth today, with total and average inflation, using official US CPI-U data from the BLS.",
    keywords: [
      "inflation calculator",
      "us inflation calculator",
      "cpi inflation calculator",
      "value of a dollar",
      "buying power calculator",
      "what is $100 worth today",
      "dollar value over time",
      "purchasing power calculator",
      "historical inflation rates",
      "adjust for inflation",
    ],
    og: {
      title: "Inflation Calculator – Value of the US Dollar Since 1913",
      description: "Find what money from any year or month since 1913 is worth today, with total and average inflation, using official US CPI-U data from the BLS.",
      url: `${siteConfig.url}/tools/calculator/inflation-calculator`,
    },
    howToSteps: [
      { name: "Enter the amount", text: "Type the dollar amount you want to compare, such as a salary, price or savings balance." },
      { name: "Choose the starting date", text: "Pick the year it is from, and a month if you know it; Whole year uses that year's average CPI." },
      { name: "Choose the end date", text: "Pick the year and month to convert to; the latest data is August 2026." },
      { name: "Read the result", text: "See the equivalent amount, the total change in prices, the average yearly inflation rate and the CPI values used." },
    ],
    faq: [
      { q: "How does the inflation calculator work?", a: "It multiplies your amount by the ratio of the Consumer Price Index on the two dates: value = amount × CPI(end) ÷ CPI(start). $100 in 2000 buys about as much as $186.96 did in 2025, because average prices rose 87% over those 25 years, about 2.5% a year." },
      { q: "Where does the data come from?", a: "From the Consumer Price Index for All Urban Consumers (CPI-U), U.S. city average, all items, published monthly by the US Bureau of Labor Statistics since 1913. It is the index used in most news reports about inflation. The data runs from January 1913 to August 2026 and is updated as new months are published." },
      { q: "Why is there no figure for October 2025?", a: "The BLS did not collect October 2025 prices because of the federal government shutdown, so there is no index for that month. The 2025 annual figure used here is the average of the 11 months that were published." },
      { q: "What is a normal rate of inflation?", a: "The Federal Reserve and the European Central Bank both aim for about 2% a year. US inflation averaged about 3% a year from 1913 to 2025, with peaks of 17% in 1918, 14% in 1947 and 13.5% in 1980, and 8% in 2022; prices fell in the early 1930s." },
      { q: "Why might my own cost of living have changed differently?", a: "CPI-U measures the average basket of goods and services bought by urban households. If you spend more than average on rent, health care or college, which have risen faster, or on electronics, which have become cheaper, your personal inflation rate will differ." },
      { q: "Can I use it for other currencies?", a: "No, it uses US prices only. Other countries publish their own indexes, such as the UK's CPI from the Office for National Statistics and the euro area's HICP from Eurostat, and their inflation history is different." },
    ],
  },
};
