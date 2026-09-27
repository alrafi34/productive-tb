import { siteConfig } from "@/config/site";

export const adcResolutionCalculatorConfig = {
  name: "ADC Resolution Calculator",
  description: "Calculate ADC step size, quantization levels, and digital output values instantly. Essential for microcontroller projects, data acquisition systems, and embedded electronics design.",
  icon: "📊",
  category: "electrical",
  slug: "adc-resolution-calculator",
  seo: {
    title: "ADC Resolution Calculator – Step Size & LSB",
    description: "Calculate an ADC's step size (LSB), number of levels and the digital code for an input voltage from its bit resolution and reference voltage.",
    keywords: [
      "ADC calculator",
      "ADC resolution calculator",
      "quantization levels calculator",
      "step size calculator",
      "analog to digital converter tool",
      "ADC step size formula",
      "microcontroller ADC calculator",
      "Arduino ADC calculator",
      "ESP32 ADC calculator",
      "data acquisition calculator",
      "ADC bits calculator",
      "voltage resolution calculator",
      "embedded systems calculator",
      "sensor interface calculator",
      "ADC precision calculator"
    ],
    og: {
      title: "ADC Resolution Calculator – Step Size & LSB",
      description: "Calculate an ADC's step size (LSB), number of levels and the digital code for an input voltage from its bit resolution and reference voltage.",
      url: `${siteConfig.url}/tools/electrical/adc-resolution-calculator`
    },
    howToSteps: [
      { name: "Enter the reference voltage", text: "Type Vref, for example 5 V for an Arduino Uno or 3.3 V for an ESP32 or Raspberry Pi Pico." },
      { name: "Choose the resolution", text: "Select the ADC's number of bits, such as 8, 10, 12, 16 or 24, or pick a microcontroller preset." },
      { name: "Enter an input voltage", text: "Optionally type a voltage to see the code the ADC returns." },
      { name: "Read the results", text: "See the number of levels, the step size in mV or µV, the maximum voltage and the digital output." },
    ],
    faq: [
      { q: "How do I calculate ADC step size?", a: "Step size (1 LSB) = Vref ÷ 2ⁿ. A 10-bit ADC at 5 V has 1,024 levels and steps of 4.88 mV; a 12-bit ADC at 3.3 V steps 0.806 mV." },
      { q: "How do I convert an ADC reading to voltage?", a: "Voltage = reading × Vref ÷ 2ⁿ. On an Arduino Uno, a reading of 512 is 512 × 5 ÷ 1,024 = 2.5 V. Many sketches divide by 1,023 instead; the difference is under one step." },
      { q: "What code will a given voltage produce?", a: "Code = floor(Vin ÷ step size), limited to 0 … 2ⁿ − 1. 1.65 V on a 12-bit, 3.3 V ADC gives 2,048." },
      { q: "Is resolution the same as accuracy?", a: "No. Resolution is the step size; accuracy also depends on offset, gain error, nonlinearity, noise and the reference. The ESP32's ADC, for example, is noticeably nonlinear near its ends." },
      { q: "How do I measure voltages above Vref?", a: "Use a voltage divider so the highest input stays below Vref, then multiply the result by the divider ratio. Never exceed the pin's absolute maximum voltage." },
    ],
  }
};
