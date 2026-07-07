import { siteConfig } from "@/config/site";

export const bearingLifeCalculatorConfig = {
  name: "Bearing Life Calculator",
  slug: "bearing-life-calculator",
  description: "Estimate bearing lifespan using ISO L10 bearing life formulas. Calculate life in revolutions, operating hours, and years for ball and roller bearings with reliability and service factor adjustments.",
  category: "mechanical",
  icon: "⚙️",
  free: true,
  seo: {
    title: "Bearing Life Calculator – L10 Bearing Life Calculation Online",
    description: "Calculate bearing life instantly using ISO L10 formulas. Estimate operating hours, revolutions, and years for ball and roller bearings with reliability adjustments. Free online bearing life calculator.",
    keywords: [
      "bearing life calculator",
      "L10 bearing calculator",
      "bearing lifespan calculator",
      "bearing load calculator",
      "rolling bearing life calculation",
      "ISO bearing life formula",
      "ball bearing life calculator",
      "roller bearing life calculator",
      "bearing hours calculator",
      "mechanical engineering calculator",
      "bearing reliability calculator",
      "bearing failure prediction",
    ],
    og: {
      title: "Bearing Life Calculator – L10 Bearing Life Calculation Online",
      description: "Calculate bearing life instantly using ISO L10 formulas. Estimate operating hours, revolutions, and years for ball and roller bearings with reliability adjustments.",
      url: `${siteConfig.url}/tools/mechanical/bearing-life-calculator`,
    },
  },
  relatedTools: [
    "torque-calculator",
    "gear-ratio-calculator",
    "shaft-torque-calculator",
    "spring-force-calculator",
    "natural-frequency-calculator",
    "angular-velocity-calculator",
  ],
};
