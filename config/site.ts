/* Kept free of imports on purpose: this module is pulled into client
   components (e.g. Header), so importing the tool registry here would
   ship the whole ~105 KB catalogue to the browser.
   Exact tool counts are derived from `tools.length` at the point of use. */
export const siteConfig = {
  name: "Productive Toolbox",
  tagline: "500+ Free Engineering & Technical Calculators",
  description:
    "Electrical, structural, mechanical, land and data calculators — plus everyday text, image and developer utilities. Free, instant, and no sign-up.",
  url: "https://productivetoolbox.com",
};
