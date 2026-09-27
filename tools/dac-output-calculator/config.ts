import { siteConfig } from "@/config/site";

export const dacOutputCalculatorConfig = {
  name: "DAC Output Calculator",
  description: "Calculate analog output voltage from digital input value instantly. Supports unipolar and bipolar DAC configurations for microcontroller, audio, and signal processing applications.",
  icon: "📈",
  category: "electrical",
  slug: "dac-output-calculator",
  seo: {
    title: "DAC Output Voltage Calculator – Digital to Analog",
    description: "Convert a DAC code to output voltage from the bit resolution and reference voltage, unipolar or bipolar, with step size (LSB) and full-scale range.",
    keywords: [
      "DAC calculator",
      "DAC output calculator",
      "digital to analog converter calculator",
      "analog voltage calculator",
      "DAC voltage calculator",
      "Arduino DAC calculator",
      "ESP32 DAC calculator",
      "audio DAC calculator",
      "unipolar DAC calculator",
      "bipolar DAC calculator",
      "DAC resolution calculator",
      "microcontroller DAC",
      "signal processing calculator",
      "embedded systems calculator",
      "DAC output voltage formula"
    ],
    og: {
      title: "DAC Output Voltage Calculator – Digital to Analog",
      description: "Convert a DAC code to output voltage from the bit resolution and reference voltage, unipolar or bipolar, with step size (LSB) and full-scale range.",
      url: `${siteConfig.url}/tools/electrical/dac-output-calculator`
    },
    howToSteps: [
      { name: "Enter the digital value", text: "Type the code you write to the DAC, or drag the slider." },
      { name: "Set the resolution", text: "Enter the DAC's number of bits, such as 8, 10, 12 or 16." },
      { name: "Enter the reference voltage", text: "Type Vref, for example 3.3 V or 5 V." },
      { name: "Choose the mode", text: "Select unipolar (0 to Vref) or bipolar (−Vref to +Vref)." },
      { name: "Read the output", text: "See the output voltage, the step size and the calculation steps." },
    ],
    faq: [
      { q: "How do I calculate DAC output voltage?", a: "For a unipolar DAC, Vout = D ÷ (2ⁿ − 1) × Vref. A 12-bit DAC with a 3.3 V reference and a code of 2048 gives 2048 ÷ 4095 × 3.3 = 1.650 V. Many datasheets divide by 2ⁿ instead, so full scale is Vref − 1 LSB; the two differ by less than one step." },
      { q: "What is the step size (LSB)?", a: "The voltage change for one code: Vref ÷ (2ⁿ − 1) in unipolar mode, or 2 × Vref ÷ (2ⁿ − 1) in bipolar mode. A 12-bit DAC at 3.3 V steps about 0.81 mV per code." },
      { q: "What is the difference between unipolar and bipolar?", a: "A unipolar DAC outputs 0 V to +Vref, as in most microcontroller DACs. A bipolar DAC outputs −Vref to +Vref and is used in audio and control systems that need both polarities." },
      { q: "Can I use Arduino analogWrite() as a DAC?", a: "analogWrite() outputs 8-bit PWM, not a true analog voltage. Add an RC low-pass filter (for example 10 kΩ and 1 µF) to smooth it, or use a DAC chip such as the MCP4725 for a clean output." },
      { q: "Can a DAC drive a speaker directly?", a: "No. A DAC output supplies only a few milliamps at line level. Use an amplifier between the DAC and the speaker or headphones." },
      { q: "Why is my DAC output noisy?", a: "Common causes are a noisy reference or supply, missing decoupling capacitors, shared analog and digital grounds, and no output filter. Use a precision reference, decouple the supply pins and add a low-pass filter or buffer." },
    ],
  }
};
