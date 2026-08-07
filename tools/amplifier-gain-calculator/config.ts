import { siteConfig } from "@/config/site";

export const amplifierGainCalculatorConfig = {
  name: "Amplifier Gain Calculator",
  description: "Calculate voltage gain, current gain, power gain, and gain in decibels (dB) for electronic amplifiers with instant results.",
  icon: "📡",
  category: "electrical",
  slug: "amplifier-gain-calculator",
  seo: {
    title: "Amplifier Gain Calculator — Free Gain & dB Calculator",
    description: "Calculate amplifier gain instantly. Get voltage, current, or power gain and dB values for any amplifier stage. Free, browser-based, no signup.",
    keywords: [
      "amplifier gain calculator",
      "gain calculator",
      "voltage gain calculator",
      "voltage gain formula",
      "current gain calculator",
      "power gain calculator",
      "gain to db calculator",
      "db gain calculator",
      "decibel calculator",
      "db converter electronics",
      "electronics gain calculator",
      "amplifier calculator online",
      "audio amplifier gain calculator",
      "op amp gain calculator",
      "transistor gain calculator",
      "rf gain calculator",
      "signal amplification calculator",
      "cascaded amplifier gain calculator",
      "unity gain calculator",
      "20 log10 calculator",
      "10 log10 calculator",
      "gain calculation tool",
      "amplifier design calculator",
      "free amplifier gain calculator",
    ],
    og: {
      title: "Amplifier Gain Calculator — Free Gain & dB Calculator",
      description: "Calculate amplifier gain instantly. Get voltage, current, or power gain and dB values for any amplifier stage. Free, browser-based, no signup.",
      url: `${siteConfig.url}/tools/electrical/amplifier-gain-calculator`,
    },
    howToSteps: [
      {
        name: "Select a Calculation Mode",
        text: "Choose Voltage Gain, Current Gain, Power Gain, or dB Conversion depending on which quantities you know. Each mode swaps in the correct input fields and dB formula automatically.",
      },
      {
        name: "Enter Your Input and Output Values",
        text: "For voltage, current, or power mode, type the input and output readings in matching units. For dB Conversion mode, enter a single linear gain value directly.",
      },
      {
        name: "Try a Built-In Preset",
        text: "Load a preset such as Audio Preamp, Transistor Beta 100, or 100W Power Amp to see realistic values before entering your own measurements.",
      },
      {
        name: "Read the Linear and dB Results",
        text: "The calculator instantly returns the linear gain ratio alongside the equivalent decibel value, using 20 times log10 for voltage and current or 10 times log10 for power.",
      },
      {
        name: "Review the Step-by-Step Breakdown",
        text: "Expand the calculation steps to see exactly which formula was applied and how each number was derived.",
      },
      {
        name: "Save or Export Your Result",
        text: "Copy the result to your clipboard or export a text report. The last 10 calculations are saved automatically for comparison.",
      },
    ],
    faq: [
      {
        q: "What is an amplifier gain calculator?",
        a: "An amplifier gain calculator computes how much an electronic amplifier increases a signal's amplitude, expressed as a linear ratio and in decibels. It supports four modes: voltage gain, current gain, power gain, and direct dB conversion, covering the way gain is specified across audio, RF, and general circuit design work.",
      },
      {
        q: "How is amplifier gain calculated?",
        a: "Voltage gain equals output voltage divided by input voltage, current gain equals output current divided by input current, and power gain equals output power divided by input power. To convert to decibels, voltage and current gain use 20 times the base-10 logarithm of the gain, while power gain uses 10 times the base-10 logarithm, because power is proportional to the square of voltage or current.",
      },
      {
        q: "What is the difference between voltage gain, current gain, and power gain?",
        a: "Voltage gain compares output voltage to input voltage and is the figure most often quoted for op-amp circuits and audio preamplifiers. Current gain compares output current to input current and is the key spec for transistor stages, often called beta or hFE. Power gain compares output power to input power and is what matters for RF transmitters and audio power amplifiers.",
      },
      {
        q: "Why use decibels (dB) for amplifier gain?",
        a: "Decibels convert multiplication into addition, so cascaded amplifier stages can be combined by simply adding their dB figures instead of multiplying linear ratios. This logarithmic scale also compresses very large gain ratios, such as 100,000, into manageable numbers like 100 dB.",
      },
      {
        q: "What is the difference between the 20 log10 and 10 log10 dB formulas?",
        a: "Power is proportional to the square of voltage or current, so converting a voltage or current ratio to decibels uses a factor of 20 to account for that squared relationship, while a power ratio uses a factor of 10 directly. Using the wrong formula for the wrong quantity doubles or halves the resulting dB figure.",
      },
      {
        q: "What is unity gain?",
        a: "Unity gain means the output exactly equals the input, a linear gain of 1 or 0 dB. Unity gain buffers, also called voltage followers, are used for impedance matching and signal isolation between circuit stages without adding amplification.",
      },
      {
        q: "Can amplifier gain be negative or less than 1?",
        a: "Yes. A linear gain less than 1, corresponding to negative dB, means the output is smaller than the input, which is attenuation rather than amplification. This is the expected result for passive attenuators, voltage dividers, long cable runs, and filters operating outside their passband.",
      },
      {
        q: "How do I calculate total gain across multiple cascaded amplifier stages?",
        a: "Convert each stage's linear gain to dB using dB Conversion mode, then add the dB figures together. For example, three stages with linear gains of 5, 8, and 20 convert to roughly 14 dB, 18 dB, and 26 dB, summing to 58 dB total, matching a direct multiplication of the linear gains.",
      },
      {
        q: "Does power gain equal voltage gain times current gain?",
        a: "Yes, when the same impedance applies at the input and output, power gain equals voltage gain times current gain, because power equals voltage times current. If input and output impedances differ, common in RF and transformer-coupled stages, this identity no longer holds directly and power gain must be calculated from actual input and output power.",
      },
      {
        q: "Is my data private when using this calculator?",
        a: "Yes. All calculations run entirely in your browser using JavaScript. Your voltage, current, power, and gain values are never transmitted to any server, stored in any database, or accessible to anyone other than you.",
      },
    ],
  },
  relatedTools: [
    "op-amp-calculator",
    "transistor-bias-calculator",
    "decibel-db-calculator",
    "ohms-law-calculator",
    "power-calculator-electrical",
    "impedance-calculator",
  ],
};
