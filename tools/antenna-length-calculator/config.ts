import { siteConfig } from "@/config/site";

export const antennaLengthCalculatorConfig = {
  name: "Antenna Length Calculator",
  description: "Calculate optimal antenna length from frequency for RF engineering, IoT, and wireless communication. Supports quarter-wave, half-wave, and full-wave antennas.",
  icon: "📡",
  category: "electrical",
  slug: "antenna-length-calculator",
  seo: {
    title: "Antenna Length Calculator – Quarter & Half Wave",
    description: "Calculate quarter-wave, half-wave and full-wave antenna length from frequency, with velocity factor, in meters, centimeters, inches or feet.",
    keywords: [
      "antenna length calculator",
      "frequency to wavelength calculator",
      "RF antenna calculator",
      "quarter wave antenna length",
      "half wave antenna calculator",
      "wireless antenna design",
      "RF engineering calculator",
      "IoT antenna calculator",
      "amateur radio calculator",
      "dipole antenna calculator"
    ],
    og: {
      title: "Antenna Length Calculator – Quarter & Half Wave",
      description: "Calculate quarter-wave, half-wave and full-wave antenna length from frequency, with velocity factor, in meters, centimeters, inches or feet.",
      url: `${siteConfig.url}/tools/electrical/antenna-length-calculator`,
    },
    howToSteps: [
      { name: "Enter the frequency", text: "Type the operating frequency and choose Hz, kHz, MHz or GHz." },
      { name: "Choose the antenna type", text: "Select quarter wave, half wave, full wave, monopole or dipole." },
      { name: "Set the velocity factor", text: "Use 1.0 for free space, or a lower value for wire insulation, coax or a PCB." },
      { name: "Choose the output unit", text: "Select meters, centimeters, millimeters, inches or feet, and the number of decimals." },
      { name: "Read the length", text: "See the wavelength and the antenna length, then trim the real antenna to tune it." },
    ],
    faq: [
      { q: "How is antenna length calculated?", a: "Wavelength λ = c × VF ÷ f, and the antenna is a fraction of it. At 146 MHz, λ = 299,792,458 ÷ 146,000,000 = 2.053 m, so a quarter-wave element is 51.3 cm (20.2 in)." },
      { q: "What is velocity factor?", a: "How fast the wave travels in the conductor or medium compared with free space. Use 1.0 for a bare wire in air; a real wire dipole is usually cut about 5% short (VF ≈ 0.95), and PCB antennas and coax use lower values." },
      { q: "Why does my antenna need trimming?", a: "The calculated length is a starting point. Conductor thickness, end effects, nearby objects and the feed point change the resonant frequency, so cut long and trim while checking SWR." },
      { q: "What is the difference between a monopole and a dipole?", a: "A monopole is a quarter-wave element that uses a ground plane as its other half. A dipole is two quarter-wave elements, half a wavelength in total, and needs no ground plane." },
      { q: "Can I use this for multi-band antennas?", a: "Calculate each band separately. Multi-band designs use traps, loading coils or other geometries that need more than a length calculation." },
    ],
  },
};
