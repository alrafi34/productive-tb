import { siteConfig } from "@/config/site";

export const opAmpCalculatorConfig = {
  name: "Op-Amp Calculator",
  description: "Calculate gain and output voltage for operational amplifier circuits including inverting, non-inverting, voltage follower, and summing amplifier configurations.",
  icon: "⚡",
  category: "electrical",
  slug: "op-amp-calculator",
  seo: {
    title: "Op-Amp Calculator — Free Op-Amp Gain Calculator Online | Productive Toolbox",
    description: "Calculate op-amp gain and output voltage instantly. Supports inverting, non-inverting, follower, and summing amplifiers. Free, browser-based.",
    keywords: [
      "op amp calculator",
      "operational amplifier calculator",
      "inverting amplifier calculator",
      "non inverting amplifier calculator",
      "non inverting amplifier gain",
      "voltage follower calculator",
      "summing amplifier calculator",
      "op amp gain calculator",
      "amplifier circuit calculator",
      "electronics calculator op amp",
      "op amp design tool",
      "op amp output voltage calculator",
      "inverting amplifier gain formula",
      "non inverting amplifier gain formula",
      "unity gain buffer calculator",
      "summing amplifier vout calculator",
      "op amp circuit calculator online",
      "free op amp calculator",
      "ideal op amp calculator",
      "op amp vout calculator",
    ],
    og: {
      title: "Op-Amp Calculator — Free Op-Amp Gain Calculator",
      description: "Calculate op-amp gain and output voltage instantly. Supports inverting, non-inverting, follower, and summing amplifiers. Free, browser-based.",
      url: `${siteConfig.url}/tools/electrical/op-amp-calculator`,
    },
    howToSteps: [
      {
        name: "Select an Op-Amp Configuration",
        text: "Choose inverting, non-inverting, voltage follower, or summing amplifier from the mode selector. The input fields update automatically to match that configuration.",
      },
      {
        name: "Enter Your Resistor Values",
        text: "Input R1 and R2 for inverting or non-inverting mode, or Rf plus one to three input resistors for the summing amplifier, choosing ohms, kilohms, or megohms independently for each.",
      },
      {
        name: "Enter the Input Voltage",
        text: "Type Vin for inverting, non-inverting, or voltage follower mode, or up to three input voltages for the summing amplifier.",
      },
      {
        name: "Try a Built-In Preset",
        text: "Load a preset such as Gain of -10, Gain of 11, or 3-Input Mixer to see realistic resistor values before entering your own design.",
      },
      {
        name: "Read the Gain and Output Voltage",
        text: "The calculator instantly returns the voltage gain and Vout, along with a full step-by-step breakdown showing how each formula was applied.",
      },
      {
        name: "Export or Save Your Calculation",
        text: "Copy the result to your clipboard or export a text report. The last 10 calculations are saved automatically for comparing configurations.",
      },
    ],
    faq: [
      {
        q: "What is an op-amp calculator?",
        a: "An op-amp calculator finds the voltage gain and output voltage of an operational amplifier circuit from its resistor values and input voltage. It covers four standard configurations: inverting amplifier, non-inverting amplifier, voltage follower, and summing amplifier.",
      },
      {
        q: "How is gain calculated for an inverting amplifier?",
        a: "The inverting amplifier's gain equals negative R2 divided by R1, where R2 is the feedback resistor and R1 is the input resistor. The negative sign means the output is inverted, 180 degrees out of phase with the input. Output voltage equals gain times Vin, so a gain of negative 10 with a 1V input produces a negative 10V output.",
      },
      {
        q: "How is gain calculated for a non-inverting amplifier?",
        a: "The non-inverting amplifier's gain equals 1 plus R2 divided by R1, where R2 is the feedback resistor to the output and R1 connects the inverting input to ground. Because the formula always adds 1, non-inverting gain can never drop below 1, and the output stays in phase with the input.",
      },
      {
        q: "What is a voltage follower and when do I use one?",
        a: "A voltage follower, also called a unity gain buffer, has an output equal to the input with a gain of exactly 1. It provides very high input impedance and very low output impedance without adding amplification, making it the standard way to isolate a high-impedance source from a low-impedance load without loading it down.",
      },
      {
        q: "How does a summing amplifier combine multiple inputs?",
        a: "A summing amplifier computes the output as negative Rf times the sum of each input voltage divided by its own resistor. Each channel's contribution is scaled independently by the ratio of Rf to that channel's resistor, so multiple signals can be mixed with different weights simultaneously, and the result is inverted.",
      },
      {
        q: "Why is the inverting amplifier's output voltage negative for a positive input?",
        a: "The inverting configuration feeds the input signal through R1 into the op-amp's inverting terminal, and negative feedback through R2 forces that terminal to a virtual ground. This topology inherently flips the signal's polarity, which is why the gain formula always carries a minus sign.",
      },
      {
        q: "What is the difference between inverting and non-inverting amplifier input impedance?",
        a: "The inverting amplifier's input impedance is approximately equal to R1, because the source drives current through R1 into the virtual ground node. The non-inverting amplifier's input impedance is extremely high, essentially the op-amp's own input impedance, because the signal connects directly to the non-inverting terminal.",
      },
      {
        q: "Can non-inverting gain ever be less than 1?",
        a: "No. Because the formula is 1 plus R2 divided by R1, the smallest possible non-inverting gain is 1, which occurs only when R2 equals 0, making it a voltage follower. For gain below 1, use an inverting amplifier with R2 smaller than R1, or a passive voltage divider instead.",
      },
      {
        q: "What happens if I request a gain the real op-amp can't reach?",
        a: "This calculator uses ideal op-amp formulas, which assume infinite open-loop gain and unlimited output swing. A real op-amp's output voltage is limited by its supply rails, typically 1 to 2V below each rail, so if the calculated Vout exceeds what your actual supply allows, the real circuit will clip before reaching that value.",
      },
      {
        q: "Is my data private when using this calculator?",
        a: "Yes. All calculations run entirely in your browser using JavaScript. Your resistor values, input voltages, and any saved calculation history are never transmitted to any server, stored in any database, or accessible to anyone other than you.",
      },
    ],
  },
  relatedTools: [
    "transistor-bias-calculator",
    "amplifier-gain-calculator",
    "voltage-divider-calculator",
    "ohms-law-calculator",
    "resistor-color-code-calculator",
    "impedance-calculator",
  ],
};
