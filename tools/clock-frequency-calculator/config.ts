import { siteConfig } from "@/config/site";

export const clockFrequencyCalculatorConfig = {
  name: "Clock Frequency Calculator",
  description: "Calculate clock frequency, period, cycles, and execution time for digital electronics, microcontrollers, and embedded systems. Instant results with step-by-step calculations.",
  icon: "⏱️",
  category: "electrical",
  slug: "clock-frequency-calculator",
  seo: {
    title: "Clock Frequency Calculator – Period & Cycles",
    description: "Convert clock frequency to period, and clock cycles to execution time, in Hz to GHz and s to ns, for microcontrollers, FPGAs and CPUs.",
    keywords: [
      "clock frequency calculator",
      "digital clock calculator",
      "microcontroller clock",
      "embedded systems calculator",
      "clock cycles calculator",
      "execution time calculator",
      "CPU clock frequency",
      "FPGA clock calculator",
      "timing calculator",
      "clock period calculator"
    ],
    og: {
      title: "Clock Frequency Calculator – Period & Cycles",
      description: "Convert clock frequency to period, and clock cycles to execution time, in Hz to GHz and s to ns, for microcontrollers, FPGAs and CPUs.",
      url: `${siteConfig.url}/tools/electrical/clock-frequency-calculator`,
    },
    howToSteps: [
      { name: "Choose the mode", text: "Select frequency to period, period to frequency, cycles to time or time to cycles." },
      { name: "Enter the values", text: "Type the frequency, period, cycle count or time and choose the units." },
      { name: "Set the precision", text: "Choose how many decimal places to show." },
      { name: "Read the result", text: "See the converted value with the formula and steps, or start from a preset." },
    ],
    faq: [
      { q: "How do I convert frequency to period?", a: "Period T = 1 ÷ f. A 16 MHz clock has a period of 62.5 ns; 1 GHz is 1 ns." },
      { q: "How do I work out execution time?", a: "Time = cycles ÷ clock frequency. 1,000 cycles at 16 MHz take 62.5 µs; at 240 MHz they take about 4.2 µs." },
      { q: "How many cycles fit in a given time?", a: "Cycles = time × frequency. A 1 ms timer at 48 MHz counts 48,000 cycles." },
      { q: "Can I use this for mains frequency?", a: "Yes. The period at 60 Hz is 16.67 ms and at 50 Hz 20 ms." },
      { q: "Why are some results in scientific notation?", a: "Very large or very small numbers are shown as powers of ten to keep them readable." },
    ],
  },
};
