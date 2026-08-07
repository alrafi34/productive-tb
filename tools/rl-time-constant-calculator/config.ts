import { siteConfig } from "@/config/site";

export const rlTimeConstantCalculatorConfig = {
  name: "RL Time Constant Calculator",
  description: "Calculate the time constant (τ = L/R) of resistor-inductor circuits instantly with unit conversion and current rise/decay analysis.",
  icon: "⚡",
  category: "electrical",
  slug: "rl-time-constant-calculator",
  seo: {
    title: "RL Time Constant Calculator — Free τ = L/R Tool Online",
    description: "Calculate RL time constant instantly with τ = L / R. Enter inductance and resistance to get current rise/decay times in s, ms, µs, ns. Free, browser-based.",
    keywords: [
      "rl time constant calculator",
      "rl calculator",
      "time constant calculator",
      "tau calculator",
      "rl circuit calculator",
      "rl time constant",
      "inductor resistor calculator",
      "inductor time constant calculator",
      "l over r calculator",
      "rl filter calculator",
      "time constant formula",
      "rl circuit analysis",
      "inductive circuit calculator",
      "current rise time calculator",
      "current decay calculator",
      "relay coil time constant calculator",
      "solenoid switching time calculator",
      "electronics calculator online",
      "electrical engineering calculator",
      "circuit design tool",
      "free rl calculator",
      "5 time constants calculator",
      "flyback voltage time constant",
    ],
    og: {
      title: "RL Time Constant Calculator — Free τ = L/R Tool Online",
      description: "Calculate RL time constant instantly with τ = L / R. Enter inductance and resistance to get current rise/decay times in s, ms, µs, ns. Free, browser-based.",
      url: `${siteConfig.url}/tools/electrical/rl-time-constant-calculator`,
    },
    howToSteps: [
      {
        name: "Enter the Inductance Value",
        text: "Type the inductor value and select its unit — henries, millihenries, or microhenries. This is the inductance of the coil, choke, or winding in your RL circuit.",
      },
      {
        name: "Enter the Resistance Value",
        text: "Type the total series resistance and select its unit — ohms, kilohms, or megohms. Include both external resistance and the inductor's own DC winding resistance for an accurate result.",
      },
      {
        name: "Read the Time Constant Result",
        text: "The calculator instantly computes tau equals L divided by R and displays it in the clearest unit, along with conversions into seconds, milliseconds, microseconds, and nanoseconds.",
      },
      {
        name: "Review the Current Rise and Decay Table",
        text: "Check the current percentages at 1 tau through 5 tau to see exactly how long the circuit takes to energize or de-energize.",
      },
      {
        name: "Try a Common Preset",
        text: "Load a built-in preset such as Standard RL Filter or Motor Winding to see typical inductance and resistance combinations and their resulting time constants.",
      },
      {
        name: "Save, Copy, or Export the Result",
        text: "Save the calculation to history, copy the tau value to the clipboard, or export a full text report of the formula, steps, and current rise/decay times.",
      },
    ],
    faq: [
      {
        q: "What is an RL time constant calculator?",
        a: "An RL time constant calculator is a free electronics tool that computes tau, the time constant of a resistor-inductor circuit, using the formula tau equals L divided by R. It converts inductance and resistance from any common unit into a single time value in seconds, milliseconds, microseconds, or nanoseconds, and shows how long current takes to rise or decay to specific percentages.",
      },
      {
        q: "How is the RL time constant calculated?",
        a: "The calculator converts your inductance to henries and your resistance to ohms, then divides: tau equals L divided by R. For example, 10 millihenries divided by 100 ohms gives a time constant of 0.0001 seconds, or 0.1 milliseconds. The result is automatically expressed in the most readable unit and broken into current rise and decay times at 1 tau through 5 tau.",
      },
      {
        q: "What is a good time constant for an RL circuit?",
        a: "There is no universal good value — it depends entirely on the application. A relay or solenoid switching circuit typically has a time constant in the low milliseconds, an RF choke or tuning inductor operates in the microsecond range, and a large motor winding might have a time constant of tens or hundreds of milliseconds. Choose the inductance and resistance so tau matches the switching speed your circuit needs.",
      },
      {
        q: "What is the difference between current rise and current decay time constants?",
        a: "The time constant value itself, tau equals L divided by R, is identical for both rise and decay in the same RL circuit — only the direction of current change differs. When current is rising as the inductor energizes, it reaches 63.2 percent of its final value after 1 tau. When current is decaying as the inductor de-energizes, it falls to 36.8 percent of its starting value after 1 tau.",
      },
      {
        q: "How do I use this calculator to design a switching or delay circuit?",
        a: "Enter a known inductance and adjust resistance, or vice versa, while watching the tau result update in real time. For relay coils and solenoids, use 5 tau as your estimate for when current reaches steady state, since that is when the magnetic field and current draw stabilize at 99.3 percent of the final value.",
      },
      {
        q: "Why is my calculated time constant important for relay and solenoid switching?",
        a: "When a relay coil is de-energized, the collapsing magnetic field induces a voltage spike proportional to inductance times the rate of current change — the faster the current decays, the higher the spike. A short RL time constant means faster switching but a larger voltage transient, which is why relay drivers typically include a flyback diode to clamp that spike safely.",
      },
      {
        q: "Can I use this calculator for RC or RLC circuits?",
        a: "No. This calculator is specifically built for resistor-inductor circuits using tau equals L divided by R. Resistor-capacitor circuits use a different formula, tau equals R times C, and resonant RLC circuits involve a separate resonant frequency formula. Use the dedicated RC time constant calculator or RLC resonance calculator for those circuit types.",
      },
      {
        q: "How many time constants does it take for current to reach steady state?",
        a: "Practically, current in an RL circuit is considered to have reached steady state after 5 time constants, at which point it reaches 99.3 percent of its final value. Mathematically the exponential curve never reaches exactly 100 percent, but the remaining 0.7 percent is negligible for virtually every real-world switching, timing, or protection design.",
      },
      {
        q: "What real component factors affect my calculated time constant?",
        a: "Real inductors have DC winding resistance in addition to any external series resistance, and this internal resistance is part of the effective R in tau equals L divided by R — ignoring it makes your calculated tau larger than the actual circuit behavior. Also account for core saturation at high currents, which can change the effective inductance and therefore the time constant.",
      },
      {
        q: "Is my data private when using this calculator?",
        a: "Yes. All calculations run entirely in your browser using JavaScript. Your inductance and resistance values are never transmitted to any server, stored in any database, or accessible to anyone other than you.",
      },
    ],
  },
  relatedTools: [
    "rc-time-constant-calculator",
    "rlc-resonance-calculator",
    "inductor-calculator",
    "impedance-calculator",
    "inductive-reactance-calculator",
    "ohms-law-calculator",
  ],
};
