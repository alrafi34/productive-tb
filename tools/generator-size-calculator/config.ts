import { siteConfig } from "@/config/site";

export const generatorSizeCalculatorConfig = {
  name: "Generator Size Calculator",
  description: "Calculate appropriate generator capacity (kVA/kW) for electrical loads. Estimate generator size based on appliances, safety margin, and power factor with instant results.",
  icon: "⚡",
  category: "electrical",
  slug: "generator-size-calculator",
  seo: {
    title: "Generator Size Calculator – kW & kVA for Your Home",
    description: "Add up your appliances, add a safety margin and power factor, and find the generator size you need in kW and kVA, single- or three-phase.",
    keywords: [
      "generator size calculator",
      "kVA calculator",
      "generator capacity calculator",
      "electrical load calculator",
      "generator sizing tool",
      "home generator calculator",
      "kW to kVA calculator",
      "generator wattage calculator",
      "backup generator sizing",
      "standby generator calculator",
      "generator load calculator",
      "power generator calculator",
      "generator selection calculator",
      "electrical generator sizing",
      "generator capacity estimator"
    ],
    og: {
      title: "Generator Size Calculator – kW & kVA for Your Home",
      description: "Add up your appliances, add a safety margin and power factor, and find the generator size you need in kW and kVA, single- or three-phase.",
      url: `${siteConfig.url}/tools/electrical/generator-size-calculator`
    },
    howToSteps: [
      { name: "Add your appliances", text: "Pick appliances from the list or type your own with their running watts and quantity, or start from a home or office preset." },
      { name: "Set the safety margin", text: "Choose 20–30% for general loads, or more when motors and compressors start." },
      { name: "Set the power factor", text: "Use 0.8 for typical mixed loads, or 1.0 for heaters and lights only." },
      { name: "Choose the phase", text: "Select single-phase for homes or three-phase for larger buildings." },
      { name: "Read the size", text: "See the total load, the kVA and kW required and the next standard generator size." },
    ],
    faq: [
      { q: "How do I size a generator?", a: "Add the running watts of everything you want to power at once, add a safety margin and divide by the power factor. 2,000 W × 1.3 ÷ 0.8 = 3.25 kVA (2.6 kW), so choose the next size up." },
      { q: "What about starting watts?", a: "Motors and compressors draw two to three times their running watts for a few seconds when they start. Check the generator's surge rating and start the largest motor load first." },
      { q: "How do I convert kVA to kW?", a: "kW = kVA × power factor. A 10 kVA generator at 0.8 power factor supplies 8 kW." },
      { q: "What size generator runs central air?", a: "A 3-ton central air conditioner runs at about 3–3.5 kW and needs several kW more to start, so whole-home standby generators with central air are usually 14–22 kW, unless a soft starter is fitted." },
      { q: "How do I connect a generator to my house?", a: "Through a transfer switch or an interlock installed by a licensed electrician, never by back-feeding an outlet, which can electrocute utility workers." },
      { q: "Where should a portable generator run?", a: "Outdoors only, well away from doors, windows and vents, because the exhaust contains carbon monoxide. Fit CO alarms indoors." },
    ],
  }
};
