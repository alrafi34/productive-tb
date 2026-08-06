import { siteConfig } from "@/config/site";

export const frequencyCalculatorConfig = {
  name: "Frequency Calculator",
  description: "Calculate frequency from time period or time period from frequency instantly. Convert between Hz, kHz, MHz and seconds, milliseconds, microseconds.",
  icon: "📡",
  category: "electrical",
  slug: "frequency-calculator",
  seo: {
    title: "Frequency Calculator — Free Frequency to Period Converter | Productive Toolbox",
    description: "Calculate frequency from time period or time period from frequency instantly. Convert Hz, kHz, MHz and s, ms, µs online. Free, browser-based, no signup.",
    keywords: [
      "frequency calculator",
      "time period calculator",
      "frequency to period converter",
      "period to frequency converter",
      "hz calculator",
      "khz to hz calculator",
      "mhz to hz calculator",
      "frequency time period calculator",
      "ac frequency calculator",
      "oscillator frequency calculator",
      "signal frequency calculator",
      "electrical frequency calculator",
      "period to frequency formula",
      "f equals 1 over t calculator",
      "frequency calculator online free",
      "audio frequency calculator",
      "rf frequency calculator",
      "pwm frequency calculator",
      "crystal oscillator frequency calculator",
      "50hz 60hz frequency calculator",
      "wave frequency calculator",
      "cycle time calculator",
      "physics frequency calculator",
      "electronics frequency calculator",
    ],
    og: {
      title: "Frequency Calculator — Free Frequency to Period Converter",
      description: "Calculate frequency from time period or time period from frequency instantly. Convert Hz, kHz, MHz and s, ms, µs online. Free, browser-based, no signup.",
      url: `${siteConfig.url}/tools/electrical/frequency-calculator`,
    },
    howToSteps: [
      {
        name: "Choose a Calculation Mode",
        text: "Select Time Period to Frequency if you know how long one cycle takes, or Frequency to Time Period if you already know the frequency. The input fields update automatically to match the mode.",
      },
      {
        name: "Enter Your Known Value",
        text: "Type the time period or frequency value into the input box. The field accepts decimals and updates its unit selector depending on the selected mode.",
      },
      {
        name: "Select the Input Unit",
        text: "Choose seconds, milliseconds, or microseconds for time period, or Hz, kHz, or MHz for frequency. The calculator normalizes the value to a common base unit before computing.",
      },
      {
        name: "Set Decimal Precision",
        text: "Pick 2 to 8 decimal places depending on how exact you need the answer. Use higher precision for MHz-range or microsecond-range values.",
      },
      {
        name: "Choose the Output Unit",
        text: "Select which unit the result should display in, independent of the input unit, so you can enter Hz and read the answer in kHz or MHz.",
      },
      {
        name: "Read the Result and Steps",
        text: "The calculator shows the converted value with a full formula breakdown. Copy the result, save it to history, swap modes, or export a text report.",
      },
    ],
    faq: [
      {
        q: "What is a frequency calculator?",
        a: "A frequency calculator is a tool that converts between frequency and time period using the inverse relationship f = 1/T. Frequency measures how many cycles occur per second in Hertz, while time period measures how long one full cycle takes in seconds. Enter either value and the calculator instantly returns the other, along with the calculation steps.",
      },
      {
        q: "How is frequency calculated from time period?",
        a: "Frequency is calculated as f = 1/T, where T is the time period in seconds. For example, a signal with a time period of 0.02 seconds has a frequency of 1 divided by 0.02, which equals 50 Hz. If the time period is entered in milliseconds or microseconds, the calculator first converts it to seconds before applying the formula.",
      },
      {
        q: "How is time period calculated from frequency?",
        a: "Time period is calculated as T = 1/f, where f is the frequency in Hertz. For example, a 1 MHz signal has a time period of 1 divided by 1,000,000, which equals 0.000001 seconds, or 1 microsecond. The calculator normalizes kHz and MHz inputs to Hz internally before computing the period.",
      },
      {
        q: "What decimal precision should I use?",
        a: "For AC power calculations at 50 Hz or 60 Hz, 2 to 3 decimal places is enough since the numbers are already round. For audio work in the kHz range, 4 to 6 decimals keeps millisecond periods accurate. For RF and MHz-range signals where the period is in microseconds or smaller, use 6 to 8 decimals to avoid rounding errors compounding in downstream calculations.",
      },
      {
        q: "What is the difference between frequency and angular frequency?",
        a: "Frequency is the number of cycles per second in Hertz, while angular frequency is the rate of rotation in radians per second, related by the formula omega equals 2 pi times f. This calculator computes ordinary frequency, not angular frequency. To get angular frequency for impedance or reactance work, multiply the frequency result by 2 pi (approximately 6.2832) separately.",
      },
      {
        q: "Why do AC power frequencies differ between regions?",
        a: "Most of Europe, Asia, Africa, and Australia standardized on 50 Hz for their electrical grids, while North America and parts of South America and Japan use 60 Hz. The difference dates back to early 20th-century generator design decisions and has stayed fixed ever since because changing grid frequency requires replacing all connected equipment.",
      },
      {
        q: "Can I use this calculator for audio frequencies?",
        a: "Yes. Human hearing spans roughly 20 Hz to 20 kHz, and this calculator handles that entire range plus everything above and below it. A 440 Hz concert-pitch A note has a time period of about 2.27 milliseconds, while a 1 kHz test tone, the standard reference signal in audio engineering, has a period of exactly 1 millisecond.",
      },
      {
        q: "Can I use this calculator for RF and radio frequencies?",
        a: "Yes, up to the MHz range. AM broadcast frequencies and shortwave signals up to 30 MHz convert cleanly. For frequencies above the MHz range, such as GHz-scale microwave and cellular signals, convert your value to MHz first, since MHz is the highest frequency unit this tool supports.",
      },
      {
        q: "What is the difference between Hz, kHz, and MHz?",
        a: "Hz, or Hertz, is the base unit equal to one cycle per second. kHz, or kilohertz, equals 1,000 Hz, and MHz, or megahertz, equals 1,000,000 Hz. A 100 kHz signal is the same as 100,000 Hz or 0.1 MHz. The calculator lets you pick input and output units independently, so you can enter a value in kHz and read the result in Hz or MHz.",
      },
      {
        q: "Is my data private when using this calculator?",
        a: "Yes. All calculations run entirely in your browser using JavaScript. Your frequency values, time periods, and calculation history are never transmitted to any server, stored in any database, or accessible to anyone other than you.",
      },
    ],
  },
  relatedTools: [
    "wavelength-calculator",
    "signal-attenuation-calculator",
    "decibel-db-calculator",
    "capacitive-reactance-calculator",
    "inductive-reactance-calculator",
    "rlc-resonance-calculator",
  ],
};
