import { siteConfig } from "@/config/site";

export const arcFlashCalculatorConfig = {
  name: "Arc Flash Calculator",
  description: "Calculate arc flash hazard levels, incident energy, and PPE requirements for electrical safety assessment.",
  icon: "⚡",
  category: "electrical",
  slug: "arc-flash-calculator",
  seo: {
    title: "Arc Flash Calculator – IEEE 1584 Incident Energy",
    description: "Estimate arc flash incident energy (cal/cm²), arcing current, arc flash boundary and the minimum PPE arc rating with the IEEE 1584-2002 equations.",
    keywords: [
      "arc flash calculator",
      "electrical safety calculator",
      "incident energy calculator",
      "PPE arc flash tool",
      "IEEE 1584 calculator online",
      "arc flash hazard assessment",
      "electrical safety risk calculator",
      "arc flash PPE calculator",
      "incident energy estimation",
      "electrical arc flash analysis"
    ],
    og: {
      title: "Arc Flash Calculator – IEEE 1584 Incident Energy",
      description: "Estimate arc flash incident energy (cal/cm²), arcing current, arc flash boundary and the minimum PPE arc rating with the IEEE 1584-2002 equations.",
      url: `${siteConfig.url}/tools/electrical/arc-flash-calculator`,
    },
    howToSteps: [
      { name: "Enter the system voltage", text: "Type the nominal voltage, from 208 V to 15 kV." },
      { name: "Enter the bolted fault current", text: "Type the available three-phase bolted fault current in kA at the equipment, from your short circuit study." },
      { name: "Enter the working distance", text: "Type the distance from the arc to the worker's face and chest in inches; 18 in (455 mm) is typical for low-voltage panels." },
      { name: "Set the arc duration", text: "Type the clearing time of the upstream protective device in seconds; this has the biggest effect on the result." },
      { name: "Choose the equipment and grounding", text: "Select panelboard, MCC, switchgear or open air, and whether the system is solidly grounded." },
      { name: "Read the results", text: "See the incident energy, arcing current, arc flash boundary and the minimum PPE arc rating." },
    ],
    faq: [
      { q: "How is arc flash incident energy calculated?", a: "This tool uses the IEEE 1584-2002 empirical model: it finds the arcing current from the bolted fault current, voltage and electrode gap, then the incident energy from the arcing current, arc duration, equipment type and working distance. At 480 V, 20 kA, 18 in and 0.1 s in a panelboard, the arcing current is about 11.9 kA and the incident energy about 4.0 cal/cm², with an arc flash boundary of about 37 in." },
      { q: "What is the arc flash boundary?", a: "The distance at which the incident energy falls to 1.2 cal/cm², the onset of a second-degree burn on bare skin. Anyone inside it needs arc-rated PPE." },
      { q: "What PPE do I need?", a: "Clothing with an arc rating at least equal to the incident energy. NFPA 70E category PPE is rated 4, 8, 25 and 40 cal/cm² for categories 1 to 4. Above 40 cal/cm², de-energize the equipment before work." },
      { q: "Why does the clearing time matter so much?", a: "Incident energy is proportional to arc duration. The same fault cleared in 0.5 s instead of 0.1 s releases five times the energy, which is why faster protection and maintenance switches reduce the hazard." },
      { q: "How accurate is this estimate?", a: "It is a screening estimate. A full study to IEEE 1584-2018 models the electrode configuration and enclosure size, checks a reduced arcing current with its own clearing time, and uses your protective device curves. Equipment labels must come from a study by a qualified engineer." },
      { q: "When is an arc flash study required?", a: "NFPA 70E in the US requires an arc flash risk assessment before energized work and a review at least every five years or after major changes. In the UK and Europe, the Electricity at Work Regulations and EN 50110 require the risk to be assessed and controlled." },
    ],
  },
};