import { siteConfig } from "@/config/site";

export const houseWiringLoadCalculatorConfig = {
  name: "House Wiring Load Calculator",
  description: "Calculate total electrical load for your house by adding appliances. Get instant recommendations for circuit breakers and wiring capacity.",
  icon: "🏠",
  category: "electrical",
  slug: "house-wiring-load-calculator",
  seo: {
    title: "House Wiring Load Calculator — Free Electrical Load & Breaker Tool | Productive Toolbox",
    description: "Calculate total house electrical load, current, and breaker size instantly with a 34-item appliance library and diversity factor. Free, browser-based.",
    keywords: [
      "house wiring load calculator",
      "electrical load calculator",
      "house wiring calculator online",
      "home electrical load calculator",
      "breaker size calculator",
      "wiring load calculation",
      "electrical capacity calculator",
      "circuit breaker size calculator",
      "appliance load calculator",
      "residential load calculator",
      "electrical panel load calculator",
      "home power load calculator",
      "house wattage calculator",
      "electrical planning tool",
      "house electrical load calculator",
      "diversity factor calculator",
      "connected load calculator",
      "service size calculator electrical",
      "free house wiring load calculator",
      "residential electrical load estimator",
      "panel sizing calculator",
    ],
    og: {
      title: "House Wiring Load Calculator — Free Electrical Load & Breaker Tool",
      description: "Calculate total house electrical load, current, and breaker size instantly with a 34-item appliance library and diversity factor. Free, browser-based.",
      url: `${siteConfig.url}/tools/electrical/house-wiring-load-calculator`
    },
    howToSteps: [
      {
        name: "Add Your Appliances",
        text: "Click Add Appliance for each device in the home, or start from the Appliance Library for common presets like LED bulbs, ceiling fans, and air conditioners with typical wattage filled in.",
      },
      {
        name: "Enter Quantity and Wattage",
        text: "For each appliance row, enter the quantity and wattage per unit, checking the nameplate for accuracy. The calculator multiplies quantity by wattage automatically.",
      },
      {
        name: "Select Your Supply Voltage",
        text: "Choose 110V, 220V, 230V, or 240V to match your electrical system, since current equals power divided by voltage.",
      },
      {
        name: "Set the Diversity Factor",
        text: "Adjust the slider between 0.5 and 1.0 to reflect realistic simultaneous usage. 0.7 to 0.8 is standard for typical residential homes.",
      },
      {
        name: "Read the Total Load and Breaker Recommendation",
        text: "The calculator shows total connected load, adjusted load, current in amperes, apparent power in VA, and the recommended standard breaker size with a 1.25x safety margin.",
      },
      {
        name: "Save, Export, or Start From a Preset",
        text: "Apply Small Apartment, Medium House, or Large House presets as a starting point, then save to history or export a CSV or text report.",
      },
    ],
    faq: [
      {
        q: "What is a house wiring load calculator?",
        a: "A house wiring load calculator is a tool that sums the wattage of every appliance in a home, applies a diversity factor to account for appliances not all running at once, and converts the result into current draw and a recommended circuit breaker size. It answers the question every homeowner and electrician needs before sizing a panel: how much current will this house actually pull, and what breaker rating handles it safely.",
      },
      {
        q: "How is total electrical load calculated?",
        a: "The calculator multiplies each appliance's quantity by its wattage to get an individual load, then sums every appliance's load into a total connected load in watts. This total is then multiplied by your chosen diversity factor to produce the adjusted load, the realistic figure used for sizing rather than the theoretical worst case of every appliance running simultaneously.",
      },
      {
        q: "What is a diversity factor and why does it matter?",
        a: "A diversity factor is a multiplier between 0.5 and 1.0 that accounts for the fact that not every appliance in a house runs at the same time. Applying a realistic diversity factor, commonly 0.7 to 0.8 for residential use, avoids oversizing the electrical panel and wiring for a peak load that almost never actually occurs.",
      },
      {
        q: "How does the calculator determine the recommended breaker size?",
        a: "The calculator divides the adjusted load by your supply voltage to get current in amperes, multiplies that current by a 1.25 safety factor, and selects the nearest standard breaker size at or above that required capacity from a list of standard sizes from 6A to 200A.",
      },
      {
        q: "Why does the calculator apply a 1.25 safety factor to the current?",
        a: "Electrical codes require continuous loads, those expected to run for three hours or more, to be sized at 125 percent of their calculated current, not 100 percent. This safety margin prevents breakers and conductors from operating at their absolute thermal limit continuously, which would shorten insulation life and increase nuisance tripping risk.",
      },
      {
        q: "What voltage should I select for my calculation?",
        a: "Select the voltage that matches your electrical system: 110V is standard in North America for general outlets, 220V is common across most of Asia and continental Europe, 230V is the UK and much of Europe's nominal standard, and 240V is used in Australia and parts of the Pacific. Using the wrong voltage produces an incorrect current and breaker recommendation.",
      },
      {
        q: "What does apparent power mean in the results?",
        a: "Apparent power, measured in volt-amperes, is the adjusted load divided by an assumed residential power factor of 0.9. It represents the total power the electrical system must supply including the reactive component drawn by motors and inductive appliances like fans and compressors.",
      },
      {
        q: "How accurate is the appliance wattage library?",
        a: "The built-in appliance library provides typical wattage values for common household devices, from a 10W LED bulb to a 3000W clothes dryer, based on standard residential ratings. Actual appliance wattage varies by manufacturer and model, so check the nameplate rating on each specific appliance for a precise final calculation.",
      },
      {
        q: "Can this calculator replace a professional electrical load calculation for permits?",
        a: "No. This calculator provides a fast planning estimate using simplified diversity and safety factors, useful for budgeting and early design decisions. Formal load calculations submitted for permits typically follow a jurisdiction's specific code method with category-specific demand factors and must be performed or verified by a licensed electrician.",
      },
      {
        q: "Is my data private when using this calculator?",
        a: "Yes. All calculations run entirely in your browser using JavaScript. Your appliance list, wattage values, voltage, and diversity factor are never transmitted to any server, stored in any database, or accessible to anyone other than you.",
      },
    ],
  },
  relatedTools: [
    "electrical-load-calculator-building",
    "wire-size-calculator",
    "circuit-breaker-calculator",
    "cable-length-calculator",
    "earthing-resistance-calculator",
    "fuse-rating-calculator"
  ]
};
