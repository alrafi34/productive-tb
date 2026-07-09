export const capacitiveReactanceCalculatorConfig = {
  name: "Capacitive Reactance Calculator",
  slug: "capacitive-reactance-calculator",
  category: "electrical",
  description: "Calculate capacitive reactance (XC) using the formula Xc = 1/(2πfC). Enter frequency and capacitance with unit conversion and step-by-step explanation.",
  icon: "⚡",
  color: "#058554",
  featured: false,
  seo: {
    title: "Capacitive Reactance Calculator — Xc = 1/(2πfC) Formula | Productive Toolbox",
    description: "Free capacitive reactance calculator using Xc = 1/(2πfC). Enter frequency and capacitance, get XC instantly with unit conversion and step-by-step solution.",
    keywords: [
      // Primary — exact GSC queries
      "capacitive reactance calculator",
      "xc = 1/(2πfc)",
      "capacitive reactance formula",
      "1/(2πfc) calculator",
      "xc formula calculator",
      "capacitive reactance xc",
      // Secondary
      "capacitive reactance formula calculator",
      "calculate capacitive reactance",
      "xc calculator",
      "capacitor reactance calculator",
      "ac circuit calculator",
      "capacitor impedance calculator",
      "reactance calculator",
      // Long-tail
      "capacitive reactance at 50hz",
      "capacitive reactance at 60hz",
      "capacitive reactance frequency",
      "how to calculate capacitive reactance",
      "xc = 1 2pfc calculation",
      "capacitive reactance ohms",
      "capacitive reactance formula derivation",
      "reactance of capacitor formula",
      "xc formula electronics",
      "capacitive reactance and frequency",
      "free capacitive reactance calculator",
    ],
    openGraph: {
      title: "Capacitive Reactance Calculator — Xc = 1/(2πfC) Formula",
      description: "Free capacitive reactance calculator using Xc = 1/(2πfC). Enter frequency and capacitance, get XC instantly with unit conversion and step-by-step solution.",
      type: "website",
      url: "/tools/electrical/capacitive-reactance-calculator",
    },
    og: {
      title: "Capacitive Reactance Calculator — Xc = 1/(2πfC) Formula",
      description: "Free capacitive reactance calculator using Xc = 1/(2πfC). Enter frequency and capacitance, get XC instantly with unit conversion and step-by-step solution.",
      url: "/tools/electrical/capacitive-reactance-calculator",
    },
    howToSteps: [
      {
        name: "Enter Frequency",
        text: "Input the AC frequency value and select the unit — Hz, kHz, or MHz. For mains power circuits use 50 Hz (Europe) or 60 Hz (North America). For audio circuits use Hz to kHz. For RF circuits use kHz to MHz.",
      },
      {
        name: "Enter Capacitance",
        text: "Input the capacitor value and select the unit — F, mF, µF, nF, or pF. Most electrolytic capacitors are in the µF range; ceramic and film capacitors are typically nF to pF.",
      },
      {
        name: "Read the Capacitive Reactance",
        text: "The tool instantly calculates XC in ohms using Xc = 1/(2πfC) and displays the step-by-step calculation. Higher frequency or larger capacitance both reduce XC.",
      },
      {
        name: "Review the Step-by-Step Breakdown",
        text: "Check the detailed calculation steps showing how frequency and capacitance values are substituted into the formula. This is useful for verifying manual calculations and understanding the math.",
      },
      {
        name: "Use Presets for Common Values",
        text: "Click common preset combinations — such as 50 Hz / 10 µF or 1 kHz / 100 nF — to instantly load typical values for power circuits, audio filters, and RF applications.",
      },
    ],
    faq: [
      {
        q: "What is the capacitive reactance formula?",
        a: "The capacitive reactance formula is Xc = 1 divided by (2 times pi times f times C), where Xc is capacitive reactance in ohms, f is frequency in hertz, and C is capacitance in farads. The formula shows that Xc decreases as frequency or capacitance increases — higher frequency means the capacitor charges and discharges more rapidly, allowing more current to flow.",
      },
      {
        q: "How do I calculate Xc = 1/(2πfC)?",
        a: "To calculate Xc = 1/(2πfC): multiply 2 times pi (6.28318) by the frequency in Hz, then multiply that result by the capacitance in farads. Divide 1 by this product. For example, at 50 Hz with 10 µF (0.00001 F): 2 × 3.14159 × 50 × 0.00001 = 0.003142. Then 1 ÷ 0.003142 = 318.3 ohms.",
      },
      {
        q: "What is capacitive reactance at 50 Hz?",
        a: "At 50 Hz, capacitive reactance depends on the capacitance value. For a 10 µF capacitor: Xc = 1 ÷ (2π × 50 × 0.00001) = 318.3 ohms. For a 100 µF capacitor at the same frequency: Xc = 31.8 ohms. For a 1 µF capacitor: Xc = 3183 ohms. Enter your specific capacitor value in this calculator to get the exact result.",
      },
      {
        q: "Why does capacitive reactance decrease with frequency?",
        a: "Capacitive reactance is inversely proportional to frequency — Xc = 1/(2πfC). As frequency increases, the capacitor charges and discharges more rapidly, allowing more AC current to pass through. At very high frequencies, Xc approaches zero (near short circuit). At DC (frequency = 0), Xc becomes infinite — the capacitor blocks DC completely.",
      },
      {
        q: "What is the difference between capacitive reactance and resistance?",
        a: "Resistance opposes both AC and DC equally and dissipates energy as heat. Capacitive reactance only opposes AC, varies with frequency, and stores energy temporarily in an electric field rather than dissipating it. Both are measured in ohms, but reactance produces a 90-degree phase shift between voltage and current, while pure resistance produces no phase shift.",
      },
      {
        q: "What is the difference between capacitive and inductive reactance?",
        a: "Capacitive reactance (Xc = 1/2πfC) decreases as frequency increases, and causes current to lead voltage by 90 degrees. Inductive reactance (XL = 2πfL) increases with frequency, and causes voltage to lead current by 90 degrees. They have opposite effects — at resonance in an LC circuit, Xc and XL are equal and cancel out.",
      },
      {
        q: "How is capacitive reactance used in filter circuits?",
        a: "In a high-pass filter, a capacitor is placed in series with the signal path. Low frequencies see a high Xc (the capacitor blocks them), while high frequencies see a low Xc (the capacitor passes them). In a low-pass filter, the capacitor is placed in parallel — it shunts high-frequency signals to ground while low-frequency signals pass through. The cutoff frequency is where Xc equals the circuit resistance: f = 1/(2πRC).",
      },
      {
        q: "What units does this calculator support?",
        a: "This calculator supports Hz, kHz, and MHz for frequency input, and F, mF, µF, nF, and pF for capacitance input. All unit conversions are handled automatically before applying the formula, so you can enter values in the most convenient unit for your application without manual conversion.",
      },
      {
        q: "Can I use this calculator for power factor correction?",
        a: "Yes. Power factor correction uses capacitors to offset inductive reactance in AC systems. Calculate the required Xc for your system frequency (50 or 60 Hz) to determine the capacitor value needed. The required capacitance is C = 1/(2πf × Xc). Enter your target Xc and frequency to back-calculate the capacitor size.",
      },
      {
        q: "Is my data private when using this calculator?",
        a: "Yes. All calculations run entirely in your browser using JavaScript. Your frequency and capacitance inputs are never transmitted to any server, stored in any database, or accessible to anyone other than you.",
      },
    ],
  },
  relatedTools: [
    "inductive-reactance-calculator",
    "impedance-calculator",
    "capacitor-calculator",
    "rlc-resonance-calculator",
    "rc-time-constant-calculator",
    "ohms-law-calculator",
  ],
};

export const toolConfig = capacitiveReactanceCalculatorConfig;
