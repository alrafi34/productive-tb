import { siteConfig } from "@/config/site";

export const voltageDropCalculatorConfig = {
  name: "Voltage Drop Calculator",
  description: "Calculate voltage loss across electrical wires based on current, length, wire size, and material. Ensure safe and efficient electrical installations.",
  icon: "⚡",
  category: "electrical",
  slug: "voltage-drop-calculator",
  seo: {
    title: "Voltage Drop Calculator — Free Wire Voltage Loss Calculator | Productive Toolbox",
    description: "Calculate voltage drop in copper or aluminum wires for single-phase, three-phase, or DC. Get drop %, final voltage, and power loss instantly. Free, browser-based.",
    keywords: [
      "voltage drop calculator",
      "wire voltage drop",
      "electrical calculator",
      "cable voltage loss",
      "voltage drop formula",
      "wire size calculator",
      "electrical wire calculator",
      "copper wire voltage drop",
      "aluminum wire voltage drop",
      "three phase voltage drop",
      "DC voltage drop",
      "cable sizing calculator",
      "voltage loss calculator",
      "electrical installation calculator",
      "wire resistance calculator",
      "free voltage drop calculator",
      "voltage drop percentage calculator",
      "voltage drop calculator single phase",
      "voltage drop calculator three phase",
      "12v voltage drop calculator",
      "solar voltage drop calculator",
      "NEC voltage drop calculator",
      "how to calculate voltage drop",
      "acceptable voltage drop percentage",
    ],
    og: {
      title: "Voltage Drop Calculator — Free Wire Voltage Loss Calculator",
      description: "Calculate voltage drop in copper or aluminum wires for single-phase, three-phase, or DC. Get drop %, final voltage, and power loss instantly. Free tool.",
      url: `${siteConfig.url}/tools/electrical/voltage-drop-calculator`
    },
    howToSteps: [
      {
        name: "Select System Type",
        text: "Choose Single Phase, Three Phase, or DC to match your electrical supply. This determines whether the calculator applies the 2 times multiplier or the square root of 3 multiplier in the voltage drop formula.",
      },
      {
        name: "Enter Supply Voltage and Current",
        text: "Type your system voltage and the load current in amperes. For low-voltage DC systems like 12V or 24V solar setups, small voltage drops represent a much larger percentage of the total supply than on a 230V circuit.",
      },
      {
        name: "Enter the Cable Length",
        text: "Enter the one-way distance from the power source to the load in meters. The formula already accounts for the return conductor, so do not double the distance manually.",
      },
      {
        name: "Choose Wire Size and Material",
        text: "Select the conductor cross-section in mm squared and choose copper or aluminum. Aluminum has roughly 1.63 times the resistance of copper for the same size.",
      },
      {
        name: "Set the Operating Temperature",
        text: "Enter the expected conductor temperature. The calculator adjusts resistance using copper's temperature coefficient, since a cable running hot has more resistance than one at the 20°C reference point.",
      },
      {
        name: "Read the Result and Status",
        text: "The calculator returns the voltage drop in volts and as a percentage, the final voltage at the load, power loss in watts, and a status of Good, Acceptable, or Too High with a wire-size suggestion when needed.",
      },
    ],
    faq: [
      {
        q: "What is a voltage drop calculator?",
        a: "A voltage drop calculator determines how much supply voltage is lost across a cable run due to conductor resistance, based on current, cable length, wire size, material, and operating temperature. It reports the voltage lost, the percentage of supply voltage that represents, the final voltage delivered to the load, and the power dissipated as heat in the conductor.",
      },
      {
        q: "How is voltage drop calculated?",
        a: "For single-phase and DC circuits, voltage drop equals 2 times current times resistance times length. For three-phase circuits, voltage drop equals the square root of 3 times current times resistance times length, where resistance is the conductor's resistance per meter and length is the one-way cable length in meters. This calculator derives resistance from the wire's cross-sectional area and material, then adjusts it for the operating temperature you enter.",
      },
      {
        q: "What is an acceptable voltage drop percentage?",
        a: "This calculator treats under 3 percent as good, 3 to 5 percent as acceptable but worth optimizing, and over 5 percent as too high. These align with common NEC and IEC guidance of 3 percent for branch circuits, 2 percent for feeders, and a combined maximum of 5 percent from service entrance to the farthest outlet. Sensitive electronics and precision equipment often need a stricter 1 to 2 percent limit.",
      },
      {
        q: "Why does temperature affect voltage drop?",
        a: "Conductor resistance rises with temperature. This calculator applies copper's temperature coefficient of approximately 0.393 percent per degree Celsius above the 20°C reference point. A cable operating hot, whether from ambient heat or its own current load, has measurably higher resistance and therefore a larger voltage drop than the same cable at 20°C.",
      },
      {
        q: "Why is voltage drop worse on low-voltage DC systems?",
        a: "Voltage drop in volts depends only on current, resistance, and length, not on system voltage. But the percentage drop is the volts lost divided by the supply voltage, so the same 1.2 volt drop that's negligible on a 230V AC circuit is over 10 percent on a 12V DC solar or battery system. Low-voltage DC runs need proportionally much larger wire to keep the percentage drop acceptable.",
      },
      {
        q: "Should I enter one-way or round-trip cable length?",
        a: "Enter the one-way distance from the source to the load, for example from a breaker panel to an outlet, or from a battery to a DC load. The formula already accounts for the return conductor through the multiplier of 2 for single-phase and DC, or the square root of 3 for three-phase, so doubling the length yourself will overstate the drop.",
      },
      {
        q: "Why does three-phase have lower voltage drop than single-phase?",
        a: "The three-phase formula uses a multiplier of approximately 1.732 instead of the multiplier of 2 used for single-phase and DC. For the same current, length, and wire size, three-phase voltage drop in volts is about 13.4 percent lower than single-phase, which is one reason industrial and commercial installations favor three-phase distribution for long runs to heavy loads.",
      },
      {
        q: "How much does switching from aluminum to copper reduce voltage drop?",
        a: "This calculator applies aluminum resistance as approximately 1.63 times copper resistance for the same wire size, so switching an identical-size run from aluminum to copper cuts the resistance, and therefore the voltage drop in volts, by roughly 39 percent. Aluminum remains popular for large feeders because of its lower cost and weight, but it needs a larger cross-section to match copper's voltage drop performance.",
      },
      {
        q: "What should I do if my voltage drop is too high?",
        a: "The calculator's suggestion recommends the next larger standard wire size when your result exceeds 3 percent. If a larger wire isn't practical, other options include shortening the cable run, switching from single-phase to three-phase where equipment allows, increasing the supply voltage, or running multiple conductors in parallel to reduce total resistance.",
      },
      {
        q: "Is my data private when using this calculator?",
        a: "Yes. All calculations run entirely in your browser using JavaScript. Your voltage, current, cable length, and wire selections are never transmitted to any server, stored in any database, or accessible to anyone other than you.",
      },
    ],
  },
  relatedTools: [
    "wire-size-calculator",
    "circuit-breaker-calculator",
    "fuse-rating-calculator",
    "electrical-load-calculator-building",
    "ohms-law-calculator",
    "electric-motor-power-calculator",
  ],
};
