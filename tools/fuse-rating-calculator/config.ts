import { siteConfig } from "@/config/site";

export const fuseRatingCalculatorConfig = {
  name: "Fuse Rating Calculator",
  description: "Calculate the correct fuse rating for electrical circuits and devices. Get instant recommendations with safety margins based on power, voltage, or current.",
  icon: "🔌",
  category: "electrical",
  slug: "fuse-rating-calculator",
  seo: {
    title: "Fuse Rating Calculator — Free Fuse Size Calculator Online",
    description: "Calculate the correct fuse rating from power, voltage, or current. Get fast/slow blow recommendations with safety margin. Free, browser-based, no signup.",
    keywords: [
      "fuse rating calculator",
      "fuse size calculator",
      "electrical fuse calculation",
      "current fuse calculator",
      "what fuse do I need",
      "fuse amperage calculator",
      "circuit fuse calculator",
      "appliance fuse rating",
      "fuse selection calculator",
      "electrical safety calculator",
      "fuse sizing tool",
      "correct fuse size",
      "fuse calculator online",
      "fast blow fuse calculator",
      "slow blow fuse calculator",
      "free fuse rating calculator",
      "fuse rating for motor",
      "fuse size for appliance",
      "standard fuse ratings chart",
      "fuse safety factor calculator",
      "IEC fuse rating calculator",
      "how to calculate fuse rating",
      "fuse rating from watts",
      "inline fuse calculator",
    ],
    og: {
      title: "Fuse Rating Calculator — Free Fuse Size Calculator Online",
      description: "Calculate the correct fuse rating from power, voltage, or current. Get fast/slow blow recommendations with safety margin. Free, browser-based.",
      url: `${siteConfig.url}/tools/electrical/fuse-rating-calculator`
    },
    howToSteps: [
      {
        name: "Choose an Input Mode",
        text: "Select Power + Voltage if you know the appliance's wattage and supply voltage, or Direct Current if you already have a measured or nameplate current value. The calculator computes current as I = P divided by V automatically in power/voltage mode.",
      },
      {
        name: "Enter Circuit Values",
        text: "Type the wattage and voltage, or the current directly, depending on the selected mode. Use the built-in appliance presets to auto-fill common values like a microwave, kettle, or air conditioner.",
      },
      {
        name: "Select a Safety Factor",
        text: "Choose 1.25 for standard resistive loads, 1.5 for occasional surge loads, or 1.6 for motors and other high-inrush equipment. This factor is applied to the calculated current before a fuse size is selected.",
      },
      {
        name: "Choose Fast Blow or Slow Blow",
        text: "Select Fast Blow for lighting, heating, and steady electronic loads. Select Slow Blow for motors, compressors, and transformers that need to tolerate a brief startup current surge.",
      },
      {
        name: "Read the Recommended Fuse Rating",
        text: "The calculator returns the nearest standard fuse rating at or above the adjusted current, the safety margin percentage, and the next higher standard size as a backup option.",
      },
      {
        name: "Save or Export the Result",
        text: "Copy the recommended rating to your clipboard, save the calculation to local history, or export a full text report showing every calculation step.",
      },
    ],
    faq: [
      {
        q: "What is a fuse rating calculator?",
        a: "A fuse rating calculator determines the correct fuse amperage for a circuit or appliance based on its power consumption, supply voltage, or measured current, plus a safety margin. It finds the smallest standard fuse size that safely carries the load's current without blowing during normal operation, while still opening the circuit if a genuine fault occurs.",
      },
      {
        q: "How is fuse rating calculated?",
        a: "If you know the appliance's power and voltage, current is found with I = P divided by V. If you already know the current draw, that value is used directly. The calculator then multiplies this current by a safety factor, typically 1.25, to get the adjusted current, and selects the nearest standard fuse rating at or above that adjusted value from the IEC list of 0.5A up through 200A.",
      },
      {
        q: "What safety factor should I use for fuse sizing?",
        a: "Use 1.25, the standard IEC-recommended default, for most resistive loads like heaters, lighting, and kitchen appliances. It adds a 25 percent margin that prevents nuisance blowing from minor voltage fluctuations. Use 1.5 or 1.6 for loads with inrush current, such as motors, compressors, and transformers, since their startup current briefly spikes well above the running current.",
      },
      {
        q: "What is the difference between fast blow and slow blow fuses?",
        a: "A fast blow fuse opens almost instantly once current exceeds its rating, making it suitable for resistive loads like lighting and heating elements where current is steady. A slow blow, or time-delay, fuse tolerates brief current surges of 5 to 8 times its rating for a fraction of a second before opening, which is required for motors, compressors, and transformers that draw high inrush current at startup.",
      },
      {
        q: "Why did the calculator warn about a low safety margin?",
        a: "A low safety margin under 10 percent means the recommended fuse rating is very close to your adjusted current, leaving little headroom. This increases the risk of nuisance blowing from normal load fluctuations. The calculator suggests moving to the next higher standard rating for more reliable operation.",
      },
      {
        q: "Should I round the fuse rating up or down?",
        a: "Always round up to the next available standard fuse rating after applying the safety factor, never round down. A fuse rated below the adjusted current will blow during normal operation, while rounding up preserves the safety margin the calculation was designed to provide.",
      },
      {
        q: "Can I use this calculator for both AC and DC circuits?",
        a: "The current and safety-margin math is identical for AC and DC circuits. However, the physical fuse you install must be rated for the circuit type. DC fuses are built to extinguish the sustained arc that forms when DC current is interrupted, and a fuse rated only for AC use should never be substituted into a DC circuit such as a solar or battery system.",
      },
      {
        q: "How does this differ from a circuit breaker calculator?",
        a: "Fuse sizing and circuit breaker sizing use the same underlying current and safety-factor logic, but fuses are single-use and must be physically replaced after blowing, while breakers can be reset. Fuses also come in a finer range of small ratings useful for electronics, whereas breakers are more common for whole-circuit protection in a panel. Use a circuit breaker calculator if you are sizing a panel-mounted breaker instead of a plug or inline fuse.",
      },
      {
        q: "Why does my fuse keep blowing even at the recommended rating?",
        a: "Repeated blowing at a correctly calculated rating usually indicates a fault rather than an undersized fuse — a short circuit, ground fault, or a failing component drawing excess current. Investigate the circuit before simply installing a larger fuse, since masking the fault with an oversized fuse removes the protection the circuit was designed to have.",
      },
      {
        q: "Is my data private when using this calculator?",
        a: "Yes. All calculations run entirely in your browser using JavaScript. Your power, voltage, current, and fuse selections are never transmitted to any server, stored in any database, or accessible to anyone other than you.",
      },
    ],
  },
  relatedTools: [
    "circuit-breaker-calculator",
    "voltage-drop-calculator",
    "wire-size-calculator",
    "short-circuit-current-calculator",
    "ohms-law-calculator",
    "power-consumption-calculator",
  ],
};
