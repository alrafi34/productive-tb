import { siteConfig } from "@/config/site";

export const relayCalculatorConfig = {
  name: "Relay Calculator",
  description: "Calculate relay coil current, power consumption, transistor base resistor, and verify load safety. Essential tool for relay driver circuit design with microcontrollers.",
  icon: "🔌",
  category: "electrical",
  slug: "relay-calculator",
  seo: {
    title: "Relay Driver Calculator – Coil Current & Resistor",
    description: "Calculate relay coil current and power, the transistor base resistor for an Arduino or ESP32 driver, and check the contacts against your load.",
    keywords: [
      "relay calculator",
      "relay coil current calculator",
      "relay power calculator",
      "transistor base resistor calculator",
      "relay driver circuit",
      "relay switching calculator",
      "relay coil resistance calculator",
      "arduino relay calculator",
      "microcontroller relay driver",
      "relay load calculator",
      "relay safety calculator",
      "transistor relay driver",
      "relay circuit calculator",
      "relay current calculator",
      "relay voltage calculator"
    ],
    og: {
      title: "Relay Driver Calculator – Coil Current & Resistor",
      description: "Calculate relay coil current and power, the transistor base resistor for an Arduino or ESP32 driver, and check the contacts against your load.",
      url: `${siteConfig.url}/tools/electrical/relay-calculator`
    },
    howToSteps: [
      { name: "Enter the coil data", text: "Type the relay's coil supply voltage and coil resistance, or pick a common relay preset." },
      { name: "Enter the driver data", text: "Type the microcontroller's output voltage, the transistor gain (hFE) and base-emitter voltage." },
      { name: "Enter the load", text: "Type the voltage and current of the load the contacts switch, and the relay's contact rating." },
      { name: "Read the results", text: "See the coil current and power, whether a transistor is needed, the base resistor and nearest standard value, and the load check." },
    ],
    faq: [
      { q: "How do I calculate relay coil current?", a: "Coil current = coil voltage ÷ coil resistance. A 5 V relay with a 70 Ω coil draws 5 ÷ 70 = 71 mA and uses 0.36 W." },
      { q: "Can I drive a relay straight from a GPIO pin?", a: "Usually not. Most coils draw 30–100 mA, well above what a microcontroller pin can supply (about 20 mA on an Arduino Uno, 12 mA recommended on an ESP32). Use a transistor or a relay module with a driver." },
      { q: "How is the base resistor calculated?", a: "Base current Ib = Ic ÷ hFE × overdrive, then Rb = (Vgpio − Vbe) ÷ Ib. With 71 mA, hFE 100 and 2× overdrive, Ib = 1.43 mA, so Rb ≈ 3.0 kΩ from 5 V or 1.8 kΩ from 3.3 V. Use the transistor's minimum hFE from the datasheet to be sure it saturates." },
      { q: "Why do I need a flyback diode?", a: "When the coil switches off, its magnetic field collapses and produces a voltage spike that can destroy the transistor. A diode such as a 1N4148 or 1N4007 across the coil, cathode to the positive supply, absorbs it." },
      { q: "How do I check the relay contacts?", a: "The load current must be below the contact rating at that voltage, with margin. Contacts are rated lower for DC and for inductive or motor loads than for resistive AC loads." },
    ],
  }
};
