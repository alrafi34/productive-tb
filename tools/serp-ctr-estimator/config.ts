import { siteConfig } from "@/config/site";

export const serpCtrEstimatorConfig = {
  slug: "serp-ctr-estimator",
  name: "SERP CTR Estimator",
  description: "Estimate organic click-through rate (CTR), monthly and annual clicks, and traffic opportunity based on Google ranking position. Compare current vs. target rankings using Industry Average, Backlinko, Advanced Web Ranking, or FirstPageSage CTR curves. Free browser-based SERP CTR estimator.",
  category: "marketing",
  icon: "📊",
  free: true,
  relatedTools: [
    "ctr-calculator",
    "keyword-density-calculator-seo",
    "seo-score-calculator",
    "domain-authority-estimator",
    "traffic-growth-calculator",
    "backlink-ratio-calculator",
  ],
  seo: {
    title: "SERP CTR Estimator — Free Organic Click-Through Rate Tool Online | Productive Toolbox",
    description: "Estimate organic CTR and expected clicks by Google ranking position. Compare current vs. target rankings, visualize the CTR curve, and calculate traffic opportunity. Free, browser-based, no signup.",
    keywords: [
      "serp ctr estimator",
      "ctr by position calculator",
      "organic ctr calculator",
      "google ctr by position",
      "serp ctr curve",
      "seo ctr tool",
      "search ranking ctr calculator",
      "organic traffic estimator",
      "google ranking calculator",
      "seo click calculator",
      "ctr curve tool",
      "click through rate by position",
      "backlinko ctr study",
      "advanced web ranking ctr",
      "firstpagesage ctr",
      "position 1 ctr",
      "ranking traffic estimator",
      "seo opportunity score calculator",
      "organic visibility score",
      "keyword traffic potential calculator",
      "free serp ctr estimator",
      "google search ctr calculator",
    ],
    openGraph: {
      title: "SERP CTR Estimator — Free Organic Click-Through Rate Tool",
      description: "Estimate organic CTR, expected clicks, and traffic opportunity based on Google ranking position. Compare rankings and visualize the CTR curve for free.",
      type: "website",
      url: `${siteConfig.url}/tools/marketing/serp-ctr-estimator`,
    },
    og: {
      title: "SERP CTR Estimator — Free Organic Click-Through Rate Tool",
      description: "Estimate organic CTR, expected clicks, and traffic opportunity based on Google ranking position. Compare rankings and visualize the CTR curve for free.",
      url: `${siteConfig.url}/tools/marketing/serp-ctr-estimator`,
    },
    howToSteps: [
      {
        name: "Enter Monthly Search Volume",
        text: "Type the average monthly search volume for your target keyword. You can find this figure in Google Search Console, Google Keyword Planner, Ahrefs, or Semrush.",
      },
      {
        name: "Set Your Current Position",
        text: "Choose your current Google ranking position from 1 to 100 using the dropdown or the slider. The estimator instantly calculates your expected CTR and monthly clicks for that position.",
      },
      {
        name: "Choose a CTR Dataset and Adjust Filters",
        text: "Select Industry Average, Backlinko, Advanced Web Ranking, FirstPageSage, or build a Custom curve. Optionally adjust Device Type and Search Intent to refine the estimate for your specific audience.",
      },
      {
        name: "Enable Target Position for Comparison",
        text: "Turn on Target Position and select a ranking goal to see the exact traffic difference, percentage increase, and how many positions you need to climb to hit that goal.",
      },
      {
        name: "Review the CTR Curve and Heatmap",
        text: "Study the interactive CTR curve chart and SERP position heatmap to see how click-through rate drops as ranking position increases, and click any heatmap cell to jump to that position.",
      },
      {
        name: "Export or Share Your Results",
        text: "Copy the result or full report, download as CSV or JSON, print a report, or copy a shareable URL with your exact inputs to send to a teammate or client.",
      },
    ],
    faq: [
      {
        q: "What is a SERP CTR estimator?",
        a: "A SERP CTR estimator is a free browser-based tool that predicts the click-through rate a webpage will receive based on its ranking position in Google's search results, using CTR data compiled from industry studies. It converts a ranking position and search volume into an estimated number of monthly and annual organic clicks, helping you forecast traffic before or after a ranking change.",
      },
      {
        q: "How is organic CTR calculated by position?",
        a: "Organic CTR by position is derived from aggregated click and impression data across large sets of search queries, then averaged for each ranking position. This tool applies that curve as: Estimated Clicks = Search Volume multiplied by the CTR percentage for the selected position, adjusted for device type and search intent.",
      },
      {
        q: "What is a good CTR for position 1 on Google?",
        a: "Across the datasets included in this tool, Position 1 CTR ranges from roughly 25% to 40% depending on the study and query type. Branded and navigational searches often see even higher CTR at position 1, while highly competitive commercial queries with many SERP features (ads, shopping results, featured snippets) tend to see lower top-position CTR.",
      },
      {
        q: "Why do the CTR datasets show different numbers for the same position?",
        a: "Each dataset — Industry Average, Backlinko, Advanced Web Ranking, and FirstPageSage — is built from different sample sizes, industries, time periods, and SERP feature prevalence. None of them is universally correct; they represent different snapshots of aggregate search behavior. Use the dataset that most closely matches your industry and query type, or build a Custom curve from your own Google Search Console data.",
      },
      {
        q: "How do I build a Custom CTR curve from my own data?",
        a: "Select Custom from the CTR Dataset dropdown, then enter your own CTR percentage for positions 1 through 10, 20, 50, and 100 using data exported from Google Search Console for keywords you already rank for. The estimator smoothly interpolates the curve between the values you provide.",
      },
      {
        q: "What does the Opportunity Score mean?",
        a: "Opportunity Score (0–100) measures how much estimated traffic you are missing compared to ranking Position 1 for the same keyword and search volume. A low score means you are already capturing most of the available clicks; a high or critical score means there is significant traffic to gain by improving your ranking.",
      },
      {
        q: "What is the difference between Opportunity Score and Visibility Score?",
        a: "Opportunity Score represents the percentage of Position 1 traffic you are currently missing, while Visibility Score represents the percentage you are currently capturing — the two values always add up to 100. Opportunity Score highlights room to grow; Visibility Score highlights how well you're already performing.",
      },
      {
        q: "Does device type affect CTR?",
        a: "Yes. Mobile search results typically show more SERP features, ads, and a smaller visible screen area, which tends to lower organic CTR compared to desktop. This tool applies a modest multiplier for Desktop, Mobile, and Combined device types on top of the base CTR curve to reflect that difference.",
      },
      {
        q: "How accurate is a SERP CTR estimate?",
        a: "SERP CTR estimates are directional, not exact — actual CTR varies by query type, brand recognition, SERP features (featured snippets, People Also Ask, ads, shopping results), seasonality, and device mix. Use these estimates for planning, prioritization, and forecasting, and validate against your own Google Search Console data whenever possible.",
      },
      {
        q: "How do I estimate traffic gain from improving my ranking?",
        a: "Enable Target Position, select the ranking you're aiming for, and the calculator shows the exact traffic difference, percentage change, and number of positions you need to climb. For example, moving a 5,000-volume keyword from Position 8 to Position 3 can show the estimated clicks nearly tripling based on the CTR curve you select.",
      },
      {
        q: "Is my data private when using this calculator?",
        a: "Yes. All calculations run entirely in your browser using JavaScript. Your search volume, ranking positions, and any custom CTR values you enter are never transmitted to any server, stored in any database, or accessible to anyone other than you. Calculation history and saved inputs are stored only in your browser's local storage.",
      },
    ],
  },
};
