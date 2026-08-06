import { siteConfig } from "@/config/site";

export const wavelengthCalculatorConfig = {
  name: "Wavelength Calculator",
  description: "Calculate wavelength from frequency using λ = v/f. Supports multiple frequency units and propagation mediums for electromagnetic waves.",
  icon: "📡",
  category: "electrical",
  slug: "wavelength-calculator",
  seo: {
    title: "Wavelength Calculator — Free Frequency to Wavelength Tool | Productive Toolbox",
    description: "Calculate wavelength from frequency using λ = v/f. Supports Hz to GHz and vacuum, air, water, copper, or custom speed. Free, browser-based, no signup.",
    keywords: [
      "wavelength calculator",
      "frequency to wavelength calculator",
      "wavelength formula calculator",
      "lambda calculator",
      "electromagnetic wave calculator",
      "rf wavelength calculator",
      "antenna wavelength calculator",
      "signal wavelength calculator",
      "wave speed calculator",
      "wifi wavelength calculator",
      "5g wavelength calculator",
      "radio wave wavelength calculator",
      "microwave wavelength calculator",
      "wavelength to frequency converter",
      "lambda equals v over f calculator",
      "quarter wave antenna calculator",
      "sound wavelength calculator",
      "electromagnetic spectrum calculator",
      "wavelength calculator online free",
      "physics wavelength calculator",
      "GHz wavelength calculator",
      "wavelength in air calculator",
    ],
    og: {
      title: "Wavelength Calculator — Free Frequency to Wavelength Tool",
      description: "Calculate wavelength from frequency using λ = v/f. Supports Hz to GHz and vacuum, air, water, copper, or custom speed. Free, browser-based, no signup.",
      url: `${siteConfig.url}/tools/electrical/wavelength-calculator`,
    },
    howToSteps: [
      {
        name: "Enter the Frequency",
        text: "Type the frequency value into the input box. This is the number of wave cycles per second for the signal being analyzed, such as 2.4 for a WiFi band or 100 for FM radio.",
      },
      {
        name: "Select the Frequency Unit",
        text: "Choose Hz, kHz, MHz, or GHz to match how the frequency value is normally expressed. The calculator converts the input to Hz internally before applying the formula.",
      },
      {
        name: "Choose the Propagation Medium",
        text: "Select vacuum, air, water, copper, or a custom speed. Each medium has a different wave propagation speed, which directly changes the calculated wavelength.",
      },
      {
        name: "Enter a Custom Speed if Needed",
        text: "For a medium not listed, such as sound in steel or a fiber-optic core, select Custom Speed and enter the propagation speed in meters per second.",
      },
      {
        name: "Read the Wavelength Result",
        text: "The calculator instantly returns the wavelength using lambda equals v divided by f, converted simultaneously into kilometers, meters, centimeters, and millimeters.",
      },
    ],
    faq: [
      {
        q: "What is a wavelength calculator?",
        a: "A wavelength calculator is a tool that computes the physical length of one full wave cycle from its frequency and propagation speed, using lambda equals v divided by f. It works for any wave type, electromagnetic or mechanical, as long as the frequency and the propagation speed in the medium are known.",
      },
      {
        q: "How is wavelength calculated?",
        a: "Wavelength is calculated as lambda equals v divided by f, where v is the wave's propagation speed in meters per second and f is the frequency in Hertz. For a 100 MHz FM radio signal traveling through air at 299,702,547 meters per second, the wavelength is approximately 2.997 meters.",
      },
      {
        q: "Why does the calculator ask for a propagation medium?",
        a: "Wave speed is not constant. It depends on what the wave is traveling through. Electromagnetic waves move at the speed of light in vacuum, fractionally slower in air, and considerably slower in water or along a copper conductor. Since wavelength depends directly on speed, selecting the correct medium is necessary for an accurate result.",
      },
      {
        q: "Why is wavelength shorter in water or copper than in air?",
        a: "When a wave enters a denser or more resistive medium, its propagation speed drops while its frequency stays fixed. Since wavelength equals speed divided by frequency, a lower speed at the same frequency produces a shorter wavelength. The same 2.4 GHz signal has a shorter wavelength in water than the roughly 12.5 centimeters it has in air.",
      },
      {
        q: "Can I use this calculator for sound waves?",
        a: "Yes. Select Custom Speed and enter the speed of sound for your medium, approximately 343 meters per second in air at 20 degrees Celsius, 1,480 meters per second in water, or 5,120 meters per second in steel. The formula applies to any wave type, not just electromagnetic ones.",
      },
      {
        q: "What is the wavelength of 2.4 GHz WiFi?",
        a: "A 2.4 GHz WiFi signal traveling through air has a wavelength of approximately 12.49 centimeters. This is why 2.4 GHz WiFi antennas are commonly built around 6.2 centimeters for a quarter-wavelength design or 12.5 centimeters for a half-wavelength design.",
      },
      {
        q: "How do I calculate antenna length from wavelength?",
        a: "Common antenna designs use fractions of the wavelength: a quarter-wave monopole is one quarter of lambda, and a half-wave dipole is one half of lambda. For 2.4 GHz WiFi with a wavelength of about 12.5 centimeters, a quarter-wave antenna target is roughly 3.1 centimeters before accounting for the antenna material's velocity factor.",
      },
      {
        q: "What is the difference between wavelength and frequency?",
        a: "Frequency is how many wave cycles occur per second, measured in Hertz. Wavelength is the physical distance one complete cycle covers, measured in meters. They are inversely linked through the wave speed, so higher frequency always means shorter wavelength for a wave traveling at a fixed speed.",
      },
      {
        q: "Why does the result show conversions in km, m, cm, and mm?",
        a: "Wavelengths span an enormous range depending on frequency. AM radio wavelengths are hundreds of meters long, while 5G millimeter-wave signals are barely a centimeter. Showing the result in multiple units at once lets you immediately pick the most readable scale for your application.",
      },
      {
        q: "Is my data private when using this calculator?",
        a: "Yes. All calculations run entirely in your browser using JavaScript. Your frequency values, medium selection, and calculation history are never transmitted to any server, stored in any database, or accessible to anyone other than you.",
      },
    ],
  },
  relatedTools: [
    "frequency-calculator",
    "signal-attenuation-calculator",
    "decibel-db-calculator",
    "rf-power-calculator",
    "rlc-resonance-calculator",
    "impedance-calculator",
  ],
};
