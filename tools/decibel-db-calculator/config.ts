import { siteConfig } from "@/config/site";

export const decibelCalculatorConfig = {
  name: "Decibel (dB) Calculator",
  description: "Convert gain or loss ratios to decibels (dB) and vice versa. Supports power-based and amplitude-based calculations for electronics, audio, and RF engineering.",
  icon: "📊",
  category: "electrical",
  slug: "decibel-db-calculator",
  seo: {
    title: "Decibel (dB) Calculator — Free Gain & Loss Converter | Productive Toolbox",
    description: "Convert power and voltage ratios to decibels (dB) and back instantly. Real-time results, formulas, and step-by-step steps. Free, browser-based, no signup.",
    keywords: [
      "decibel calculator",
      "db calculator",
      "gain to db calculator",
      "voltage to db calculator",
      "power ratio to decibel calculator",
      "db to ratio converter",
      "db conversion calculator",
      "signal gain calculator",
      "audio db calculator",
      "rf gain calculator",
      "amplifier gain db calculator",
      "attenuation calculator",
      "logarithmic calculator",
      "power gain calculator",
      "voltage gain calculator",
      "10log10 calculator",
      "20log10 calculator",
      "db to power ratio calculator",
      "db to voltage ratio calculator",
      "half power point calculator",
      "cascaded gain calculator",
      "decibel formula calculator",
      "free decibel calculator online",
    ],
    og: {
      title: "Decibel (dB) Calculator — Free Gain & Loss Converter",
      description: "Convert power and voltage ratios to decibels (dB) and back instantly. Real-time results, formulas, and step-by-step steps. Free, browser-based, no signup.",
      url: `${siteConfig.url}/tools/electrical/decibel-db-calculator`
    },
    howToSteps: [
      {
        name: "Choose a Calculation Mode",
        text: "Select Power Ratio to dB, Voltage/Current Ratio to dB, dB to Power Ratio, or dB to Voltage/Current Ratio depending on the direction of conversion needed.",
      },
      {
        name: "Enter the Value",
        text: "Type the ratio for ratio-to-dB modes, or the dB figure for dB-to-ratio modes. Ratio values must be greater than zero for the logarithmic modes.",
      },
      {
        name: "Let the Calculator Convert Instantly",
        text: "The result updates in real time as you type, applying the correct 10 times or 20 times multiplier automatically based on the selected mode.",
      },
      {
        name: "Review the Formula and Steps",
        text: "Each result shows the exact formula used and a full breakdown of the logarithm calculation for checking the work or learning the math.",
      },
      {
        name: "Use a Preset for Common Scenarios",
        text: "Pick from built-in presets like 2x power gain, 0.5x power loss, plus 3 dB, or minus 20 dB to quickly see standard reference values.",
      },
    ],
    faq: [
      {
        q: "What is a decibel (dB) calculator?",
        a: "A decibel calculator converts between a power or voltage ratio and its equivalent value in decibels, the logarithmic unit used throughout electronics, audio, and RF engineering to express gain and loss. This calculator supports four modes: power ratio to dB, voltage or current ratio to dB, dB to power ratio, and dB to voltage or current ratio.",
      },
      {
        q: "How is a power ratio converted to decibels?",
        a: "Power ratio to dB uses the formula dB equals 10 times the base-10 logarithm of the ratio. An amplifier that increases power from 1 watt to 10 watts has a power ratio of 10, giving 10 dB of gain. This tool takes the ratio directly, not the two raw power values separately.",
      },
      {
        q: "How is a voltage or current ratio converted to decibels?",
        a: "Voltage or current ratio to dB uses dB equals 20 times the base-10 logarithm of the ratio, a factor of 20 instead of 10 because power is proportional to voltage squared. Doubling voltage gives approximately 6.02 dB, while doubling power alone only gives 3.01 dB.",
      },
      {
        q: "How do I convert decibels back to a ratio?",
        a: "For power, use ratio equals 10 raised to the power of dB divided by 10. For voltage or current, use ratio equals 10 raised to the power of dB divided by 20. Entering -3 dB in the dB-to-power mode returns a ratio of approximately 0.501, confirming that -3 dB is the well-known half power point.",
      },
      {
        q: "Why does the calculator use 10 times for power but 20 times for voltage?",
        a: "Power is proportional to the square of voltage. A logarithm of a squared quantity doubles when pulled out front, so converting a voltage ratio to an equivalent power-based dB scale requires the extra factor of 2, turning 10 into 20. This keeps a given dB value meaning the same thing whether arrived at through power or voltage.",
      },
      {
        q: "Why is -3 dB called the half-power point?",
        a: "Because 10 raised to the power of -3/10 is approximately 0.501, meaning a -3 dB power ratio leaves just over half the original power. This threshold is used constantly in filter design and frequency response analysis to define the edges of a passband.",
      },
      {
        q: "Can I add decibel values together?",
        a: "Yes, and this is one of the main reasons dB is used industry-wide. Because dB is logarithmic, cascaded gains and losses along a signal chain add instead of multiply. A plus 10 dB amplifier stage followed by a minus 4 dB cable loss and another plus 8 dB stage totals plus 14 dB overall.",
      },
      {
        q: "What is the difference between dB, dBm, and dBW?",
        a: "dB is a relative unit comparing two values and has no meaning on its own without a reference point. dBm is an absolute power unit referenced to 1 milliwatt, and dBW is referenced to 1 watt. This calculator computes relative dB from ratios; it does not convert an absolute power value in watts directly into dBm or dBW.",
      },
      {
        q: "What does a negative dB value mean?",
        a: "A negative dB value indicates attenuation or loss rather than gain. In ratio-to-dB modes, entering a ratio less than 1 always produces a negative dB result. In dB-to-ratio modes, entering a negative dB value always returns a ratio less than 1.",
      },
      {
        q: "Is my data private when using this calculator?",
        a: "Yes. All calculations run entirely in your browser using JavaScript. Your ratio and dB values, along with your calculation history, are never transmitted to any server, stored in any database, or accessible to anyone other than you.",
      },
    ],
  },
  relatedTools: [
    "signal-attenuation-calculator",
    "frequency-calculator",
    "wavelength-calculator",
    "rf-power-calculator",
    "power-density-calculator",
    "amplifier-gain-calculator",
  ]
};
