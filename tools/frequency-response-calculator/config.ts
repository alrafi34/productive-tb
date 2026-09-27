import { siteConfig } from "@/config/site";

export const frequencyResponseCalculatorConfig = {
  name: "Frequency Response Calculator",
  description: "Analyze frequency response of systems with real-time Bode plots. Enter transfer functions and visualize magnitude and phase response instantly in your browser.",
  icon: "📊",
  category: "electrical",
  slug: "frequency-response-calculator",
  seo: {
    title: "Frequency Response Calculator – Bode Plot Online",
    description: "Plot the magnitude and phase (Bode plot) of any transfer function H(jω) or H(s), and find the cutoff frequency, gain and peak.",
    keywords: [
      "frequency response calculator",
      "bode plot generator",
      "transfer function simulator",
      "control systems tool",
      "signal processing visualization",
      "magnitude response calculator",
      "phase response analyzer",
      "electrical engineering tool",
      "system analysis calculator",
      "filter response calculator"
    ],
    og: {
      title: "Frequency Response Calculator – Bode Plot Online",
      description: "Plot the magnitude and phase (Bode plot) of any transfer function H(jω) or H(s), and find the cutoff frequency, gain and peak.",
      url: `${siteConfig.url}/tools/electrical/frequency-response-calculator`,
    },
    howToSteps: [
      { name: "Enter the transfer function", text: "Type H using jω or s, for example 1/(1+jω/6283) for a 1 kHz RC low-pass, or pick a preset." },
      { name: "Set the frequency range", text: "Type the start and end frequency in Hz." },
      { name: "Choose the resolution and view", text: "Select the number of points and whether to show magnitude, phase or both." },
      { name: "Read the Bode plot", text: "See the magnitude in dB and phase in degrees, with the DC gain, −3 dB cutoff and peak gain." },
    ],
    faq: [
      { q: "How do I enter a transfer function?", a: "Use jω (or w) for frequency, or s for jω, with +, −, *, /, ^ and brackets; multiplication can be implied. Examples: 1/(1+jω/6283), 10/(s+10)^2, (1+jω/100)/(1+jω/1000). ω = 2πf, so a pole at ω = 6,283 rad/s is at 1 kHz." },
      { q: "What is a Bode plot?", a: "Two graphs against log frequency: the magnitude in dB and the phase in degrees. They show how a filter, amplifier or control loop treats each frequency." },
      { q: "How is the cutoff frequency found?", a: "It is the first frequency where the magnitude falls 3 dB below its value at the start of the range. For a first-order RC low-pass, fc = 1 ÷ (2πRC); 1.6 kΩ and 100 nF give about 1 kHz." },
      { q: "What does the phase tell me?", a: "The phase shift at each frequency. A first-order low-pass reaches −45° at its cutoff and −90° far above it; in feedback loops the phase at 0 dB gain sets the phase margin and stability." },
      { q: "How do I convert dB to a gain ratio?", a: "Gain = 10^(dB ÷ 20). −3 dB is 0.708 (half power), −20 dB is 0.1 and +6 dB is about 2." },
    ],
  },
};