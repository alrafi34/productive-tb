import { siteConfig } from "@/config/site";

export const chiSquareCalculatorConfig = {
  slug: "chi-square-calculator",
  name: "Chi-Square Calculator",
  description: "Calculate Chi-Square (χ²) Goodness of Fit and Test of Independence instantly. View step-by-step calculations, p-values, expected frequencies, Cramér's V effect size, and export professional statistical reports — free and browser-based.",
  category: "data-analytics",
  icon: "📊",
  free: true,
  relatedTools: [
    "p-value-calculator",
    "a-b-test-calculator",
    "sample-size-calculator",
    "correlation-coefficient-calculator",
    "standard-deviation-calculator",
    "confidence-interval-calculator",
  ],
  seo: {
    title: "Free Chi-Square Calculator (χ² Test) – Goodness of Fit & Independence",
    description: "Calculate Chi-Square (χ²) tests instantly online. Perform Goodness of Fit and Test of Independence, view step-by-step calculations, p-values, expected frequencies, effect size, and export statistical reports for free.",
    keywords: [
      "chi square calculator",
      "chi-square calculator",
      "chi square test",
      "chi-square test",
      "goodness of fit calculator",
      "test of independence calculator",
      "chi square p value calculator",
      "statistics calculator",
      "hypothesis testing calculator",
      "contingency table calculator",
      "chi square formula",
      "online chi square calculator",
      "free chi square calculator",
      "cramers v calculator",
      "chi square distribution calculator",
    ],
    openGraph: {
      title: "Free Chi-Square Calculator Online",
      description: "Perform Chi-Square Goodness of Fit and Test of Independence with step-by-step calculations, p-values, expected frequencies, and effect size, all in your browser.",
      type: "website",
      url: `${siteConfig.url}/tools/data-analytics/chi-square-calculator`,
    },
    og: {
      title: "Free Chi-Square Calculator Online",
      description: "Perform Chi-Square Goodness of Fit and Test of Independence with step-by-step calculations, p-values, expected frequencies, and effect size, all in your browser.",
      url: `${siteConfig.url}/tools/data-analytics/chi-square-calculator`,
    },
    howToSteps: [
      {
        name: "Choose Your Test Type",
        text: "Select Goodness of Fit to compare one set of categories against expected values, or Test of Independence to analyze a contingency table.",
      },
      {
        name: "Build Your Table",
        text: "Add or remove categories, or rows and columns, to match your dataset, then type in your observed counts.",
      },
      {
        name: "Set Expected Values",
        text: "For goodness of fit, enter your expected count per category. For independence, expected counts are calculated automatically from your table.",
      },
      {
        name: "Choose a Significance Level",
        text: "Select 0.10, 0.05, or 0.01, or enter a custom alpha value.",
      },
      {
        name: "Read the Live Results",
        text: "The chi-square statistic, degrees of freedom, p-value, and decision update instantly as you edit the table.",
      },
      {
        name: "Export or Share the Report",
        text: "Copy the report, download it as CSV, TXT, or JSON, or print a formatted version.",
      },
    ],
    faq: [
      {
        q: "What is a chi-square calculator?",
        a: "A chi-square calculator is a free browser-based tool that performs chi-square hypothesis tests. It supports the Goodness of Fit test, which checks whether observed category counts match expected values, and the Test of Independence, which checks whether two categorical variables in a table are associated.",
      },
      {
        q: "How is the chi-square statistic calculated?",
        a: "The chi-square statistic sums, across every category or cell, the squared difference between observed and expected counts divided by the expected count. Larger values indicate a bigger mismatch between what was observed and what was expected.",
      },
      {
        q: "What is a good p-value for a chi-square test?",
        a: "There is no universally good p-value, since it depends on your chosen significance level, commonly 0.05. If the p-value is below your significance level, you reject the null hypothesis; otherwise you fail to reject it.",
      },
      {
        q: "What is the difference between Goodness of Fit and Test of Independence?",
        a: "Goodness of Fit compares one categorical variable's observed distribution against a specific expected distribution, such as testing whether a die is fair. Test of Independence examines two categorical variables at once, using a contingency table, to determine whether they are related to each other.",
      },
      {
        q: "How do I calculate degrees of freedom for a chi-square test?",
        a: "For Goodness of Fit, degrees of freedom equals the number of categories minus 1. For Test of Independence, degrees of freedom equals the number of rows minus 1 times the number of columns minus 1.",
      },
      {
        q: "What does it mean if my expected frequency is below 5?",
        a: "The chi-square approximation becomes less reliable when expected cell counts are too small, commonly cited as below 5. The calculator flags this automatically, and you should consider combining sparse categories or using an exact test instead.",
      },
      {
        q: "What is Cramér's V and why does it matter?",
        a: "Cramér's V is an effect size measure for the Test of Independence, ranging from 0, meaning no association, to 1, meaning perfect association, and it is not affected by sample size the way the chi-square statistic and p-value are.",
      },
      {
        q: "Can chi-square tests be used on continuous data?",
        a: "Not directly. Chi-square tests require categorical count data, so continuous measurements must first be grouped into bins or categories before applying either chi-square test.",
      },
      {
        q: "What do the standardized residuals tell me?",
        a: "Standardized residuals show, cell by cell, how far the observed count deviates from the expected count in units of standard error. Residuals beyond roughly plus or minus 2 highlight the specific cells driving a significant Test of Independence result.",
      },
      {
        q: "Is my data private when using this calculator?",
        a: "Yes. All calculations run entirely in your browser using JavaScript. Your data is never transmitted to any server, stored in any database, or accessible to anyone other than you.",
      },
    ],
  },
};
