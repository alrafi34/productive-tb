import { siteConfig } from "@/config/site";

export const rcTimeConstantCalculatorConfig = {
  name: "RC Time Constant Calculator",
  description: "Calculate the time constant (τ = RC) of resistor-capacitor circuits instantly with unit conversion and charging curve analysis.",
  icon: "⚡",
  category: "electrical",
  slug: "rc-time-constant-calculator",
  seo: {
    title: "RC Time Constant Calculator — Free τ = RC Tool Online",
    description: "Calculate RC time constant instantly with τ = R × C. Enter resistance and capacitance to get charging times in s, ms, µs, ns. Free, browser-based.",
    keywords: [
      "rc time constant calculator",
      "rc calculator",
      "time constant calculator",
      "tau calculator",
      "rc circuit calculator",
      "rc time constant",
      "capacitor charging time calculator",
      "capacitor discharge calculator",
      "rc filter calculator",
      "time constant formula",
      "rc circuit analysis",
      "tau equals rc calculator",
      "resistor capacitor time constant",
      "rc charging curve calculator",
      "electronics calculator online",
      "electrical engineering calculator",
      "circuit design tool",
      "free rc calculator",
      "rc time constant formula calculator",
      "capacitor charge percentage calculator",
      "5 time constants calculator",
      "rc debounce time calculator",
      "audio coupling capacitor calculator",
    ],
    og: {
      title: "RC Time Constant Calculator — Free τ = RC Tool Online",
      description: "Calculate RC time constant instantly with τ = R × C. Enter resistance and capacitance to get charging times in s, ms, µs, ns. Free, browser-based.",
      url: `${siteConfig.url}/tools/electrical/rc-time-constant-calculator`,
    },
    howToSteps: [
      {
        name: "Enter the Resistance Value",
        text: "Type the resistor value and select its unit — ohms, kilohms, or megohms. This is the resistance in series with the capacitor in your RC circuit.",
      },
      {
        name: "Enter the Capacitance Value",
        text: "Type the capacitor value and select its unit — farads, millifarads, microfarads, nanofarads, or picofarads, matching your component's datasheet or markings.",
      },
      {
        name: "Read the Time Constant Result",
        text: "The calculator instantly computes tau equals R times C and displays it in the clearest unit, along with conversions into seconds, milliseconds, microseconds, and nanoseconds.",
      },
      {
        name: "Review the Charging and Discharging Table",
        text: "Check the voltage percentages at 1 tau through 5 tau to see exactly how long the circuit takes to reach each charge or discharge level.",
      },
      {
        name: "Try a Common Preset",
        text: "Load a built-in preset such as Standard RC Filter or Audio Coupling to see typical resistor and capacitor combinations and their resulting time constants.",
      },
      {
        name: "Save, Copy, or Export the Result",
        text: "Save the calculation to history, copy the tau value to the clipboard, or export a full text report of the formula, steps, and charging times.",
      },
    ],
    faq: [
      {
        q: "What is an RC time constant calculator?",
        a: "An RC time constant calculator is a free electronics tool that computes tau, the time constant of a resistor-capacitor circuit, using the formula tau equals R times C. It converts resistance and capacitance from any common unit into a single time value in seconds, milliseconds, microseconds, or nanoseconds, and shows how long the circuit takes to charge or discharge to specific voltage percentages.",
      },
      {
        q: "How is the RC time constant calculated?",
        a: "The calculator converts your resistance to ohms and your capacitance to farads, then multiplies them: tau equals R times C. For example, 10 kilohms times 10 microfarads gives a time constant of 0.1 seconds, or 100 milliseconds. The result is automatically expressed in the most readable unit and broken into charging times at 1 tau through 5 tau.",
      },
      {
        q: "What is a good time constant for an RC filter?",
        a: "There is no universal good value — it depends entirely on the application. A low-pass audio filter targeting a few hundred hertz might use a time constant of a few milliseconds, while a debounce circuit for a mechanical switch typically uses 1 to 50 milliseconds, and a power-on delay circuit might use several seconds. Choose the resistance and capacitance so tau matches the response time your circuit needs.",
      },
      {
        q: "What is the difference between charging and discharging time constants?",
        a: "The time constant value itself, tau equals R times C, is identical for both charging and discharging the same RC circuit — only the direction of voltage change differs. During charging, voltage rises to 63.2 percent of the supply value after 1 tau and approaches 99.3 percent after 5 tau. During discharging, voltage falls to 36.8 percent of its starting value after 1 tau and drops to about 0.7 percent after 5 tau.",
      },
      {
        q: "How do I use this calculator to design a timing circuit?",
        a: "Enter a known resistor value and adjust capacitance, or vice versa, while watching the tau result update in real time. For a debounce or delay circuit, aim for 5 tau to equal your desired settling time, since that is when the capacitor is considered fully charged or discharged at 99.3 percent.",
      },
      {
        q: "Why does my calculated time constant look extremely small or use scientific notation?",
        a: "This happens with very small capacitance values, such as picofarads or nanofarads, common in RF and high-speed digital circuits. A 1 kilohm resistor with a 100 picofarad capacitor gives a time constant of 100 nanoseconds — correct for a fast circuit, but easy to misread if you expect seconds. Check the unit shown next to the result, not just the number.",
      },
      {
        q: "Can I use this calculator for RL or RLC circuits?",
        a: "No. This calculator is specifically built for resistor-capacitor circuits using tau equals R times C. Resistor-inductor circuits use a different formula, tau equals L divided by R, and resonant RLC circuits involve a separate resonant frequency formula. Use the dedicated RL time constant calculator or RLC resonance calculator for those circuit types.",
      },
      {
        q: "How many time constants does it take for a capacitor to fully charge?",
        a: "Practically, a capacitor is considered fully charged after 5 time constants, reaching 99.3 percent of the supply voltage. Mathematically the exponential curve never reaches exactly 100 percent, but the remaining 0.7 percent is negligible for virtually every real-world design, timing, and measurement purpose.",
      },
      {
        q: "What real component tolerances should I account for?",
        a: "Standard resistors are typically 1 percent or 5 percent tolerance, and capacitors — especially electrolytics — can be 10 to 20 percent or wider. A calculated time constant of 100 milliseconds could realistically fall between roughly 80 and 120 milliseconds with common-tolerance parts. For precision timing, use 1 percent resistors and film or NPO ceramic capacitors, and verify the built circuit with an oscilloscope.",
      },
      {
        q: "Is my data private when using this calculator?",
        a: "Yes. All calculations run entirely in your browser using JavaScript. Your resistance and capacitance values are never transmitted to any server, stored in any database, or accessible to anyone other than you.",
      },
    ],
  },
  relatedTools: [
    "rl-time-constant-calculator",
    "rlc-resonance-calculator",
    "capacitor-calculator",
    "capacitor-charge-time-calculator",
    "impedance-calculator",
    "ohms-law-calculator",
  ],
};
