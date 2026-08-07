import { siteConfig } from "@/config/site";

export const rlcResonanceCalculatorConfig = {
  name: "RLC Resonance Calculator",
  description: "Calculate the resonant frequency of RLC circuits instantly using f₀ = 1/(2π√LC) with unit conversion and circuit analysis.",
  icon: "📊",
  category: "electrical",
  slug: "rlc-resonance-calculator",
  seo: {
    title: "RLC Resonance Calculator — Free Resonant Frequency Tool",
    description: "Calculate RLC resonant frequency instantly with f₀ = 1/(2π√LC). Get quality factor, bandwidth, and impedance at resonance. Free, browser-based, no signup.",
    keywords: [
      "rlc resonance calculator",
      "rlc calculator",
      "resonant frequency calculator",
      "lc circuit calculator",
      "resonance calculator",
      "quality factor calculator",
      "bandwidth calculator",
      "tank circuit calculator",
      "tuned circuit calculator",
      "resonant frequency formula",
      "rlc circuit analysis",
      "series rlc calculator",
      "parallel rlc calculator",
      "lc tank resonant frequency",
      "q factor calculator electronics",
      "rf tuning circuit calculator",
      "bandpass filter frequency calculator",
      "impedance at resonance calculator",
      "electronics calculator online",
      "electrical engineering calculator",
      "circuit design tool",
      "free rlc calculator",
      "1/(2 pi sqrt lc) calculator",
    ],
    og: {
      title: "RLC Resonance Calculator — Free Resonant Frequency Tool",
      description: "Calculate RLC resonant frequency instantly with f₀ = 1/(2π√LC). Get quality factor, bandwidth, and impedance at resonance. Free, browser-based, no signup.",
      url: `${siteConfig.url}/tools/electrical/rlc-resonance-calculator`,
    },
    howToSteps: [
      {
        name: "Enter the Resistance Value",
        text: "Type the circuit resistance and select its unit — ohms, kilohms, or megohms. In a series RLC circuit this is the total series resistance, including any coil winding resistance.",
      },
      {
        name: "Enter the Inductance Value",
        text: "Type the inductor value and select its unit — henries, millihenries, or microhenries. This is the inductance of the coil or winding forming the resonant tank.",
      },
      {
        name: "Enter the Capacitance Value",
        text: "Type the capacitor value and select its unit — farads, millifarads, microfarads, nanofarads, or picofarads, matching the tuning or filter capacitor.",
      },
      {
        name: "Read the Resonant Frequency Result",
        text: "The calculator instantly computes f0 equals 1 over 2 pi square root of L times C and displays it in Hz, kHz, or MHz.",
      },
      {
        name: "Review Q, Bandwidth, and Impedance",
        text: "Check the quality factor, bandwidth, and impedance at resonance to understand how sharp or broad the resonance peak is and how the circuit behaves near the resonant frequency.",
      },
      {
        name: "Save, Copy, or Export the Result",
        text: "Save the calculation to history, copy the resonant frequency to the clipboard, or export a full text report of the formula, steps, and circuit characteristics.",
      },
    ],
    faq: [
      {
        q: "What is an RLC resonance calculator?",
        a: "An RLC resonance calculator is a free electronics tool that computes the resonant frequency, quality factor, impedance, and bandwidth of a resistor-inductor-capacitor circuit, using the formula f0 equals 1 divided by 2 pi times the square root of L times C. It converts resistance, inductance, and capacitance from any common unit into a resonant frequency shown in Hz, kHz, or MHz, along with the circuit's selectivity and impedance at that frequency.",
      },
      {
        q: "How is the RLC resonant frequency calculated?",
        a: "The calculator converts your inductance to henries and capacitance to farads, multiplies them to get LC, takes the square root, multiplies by 2 pi, and inverts the result. For example, L = 10 millihenries and C = 100 microfarads gives LC = 0.000001, the square root of LC = 0.001, 2 pi times that is about 0.00628, and the resonant frequency is about 159.15 Hz.",
      },
      {
        q: "What is a good quality factor (Q) for a resonant circuit?",
        a: "It depends entirely on the application. A high Q above 10 gives a sharp, narrow resonance peak, ideal for radio tuning and selective bandpass filters where you want to isolate one frequency. A low Q below 1 gives a broad, damped response, useful for wideband filters or snubber networks. This calculator computes Q using the series RLC formula, so lower resistance produces a higher Q.",
      },
      {
        q: "What is the difference between series and parallel RLC resonance?",
        a: "Both series and parallel RLC circuits share the same resonant frequency formula, since resonance depends only on L and C. The difference is impedance behavior: at resonance, a series RLC circuit has minimum impedance equal to R and maximum current, while a parallel RLC circuit has maximum impedance and minimum current. This calculator computes series-circuit values, where impedance at resonance equals R.",
      },
      {
        q: "How do I use this calculator to design a tuned or bandpass circuit?",
        a: "Enter a known inductance and adjust capacitance, or vice versa, while watching the resonant frequency update in real time. Then check the Q and bandwidth results — higher resistance lowers Q and widens the passband, while lower resistance sharpens the resonance for more selective tuning.",
      },
      {
        q: "Why does resistance not change the resonant frequency?",
        a: "The resonant frequency depends only on the energy-storage elements, L and C — the point where inductive reactance and capacitive reactance are equal in magnitude and cancel. Resistance dissipates energy but doesn't store it, so it has no effect on the resonant frequency. What resistance does change is the quality factor and bandwidth: more resistance means a broader, less selective resonance peak.",
      },
      {
        q: "What is the relationship between bandwidth and quality factor?",
        a: "Bandwidth is the range of frequencies around resonance where the circuit still responds effectively, and it relates to Q as bandwidth equals resonant frequency divided by Q. A circuit with a 1 MHz resonant frequency and Q of 50 has a bandwidth of 20 kHz — a fairly narrow, selective response. Increasing resistance lowers Q, which widens the bandwidth for the same resonant frequency.",
      },
      {
        q: "Can I use this calculator for parallel RLC circuits?",
        a: "The resonant frequency result is identical whether your circuit is series or parallel, since resonance depends only on L and C. However, the Q, impedance, and bandwidth values this calculator returns use the series RLC formulas — for a parallel RLC circuit, impedance is maximum, not equal to R, at resonance and the Q formula is different, so treat those specific values as series-circuit reference points only.",
      },
      {
        q: "Why does my resonant frequency look extremely high or use scientific notation?",
        a: "This happens with very small inductance and capacitance values, common in RF tank circuits. An RF circuit with 10 microhenries and 1 nanofarad resonates at roughly 1.59 MHz — correct for a high-frequency application, but easy to misjudge if you expect a value in the hundreds of hertz. Always check the unit shown next to the result, not just the raw number.",
      },
      {
        q: "Is my data private when using this calculator?",
        a: "Yes. All calculations run entirely in your browser using JavaScript. Your resistance, inductance, and capacitance values are never transmitted to any server, stored in any database, or accessible to anyone other than you.",
      },
    ],
  },
  relatedTools: [
    "rc-time-constant-calculator",
    "rl-time-constant-calculator",
    "capacitive-reactance-calculator",
    "inductive-reactance-calculator",
    "impedance-calculator",
    "frequency-calculator",
  ],
};
