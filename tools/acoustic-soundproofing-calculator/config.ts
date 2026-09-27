export const acousticSoundproofingCalculatorConfig = {
  name: "Acoustic Soundproofing Calculator",
  slug: "acoustic-soundproofing-calculator",
  category: "architecture",
  description: "Calculate how much soundproofing you need for any room. Estimate noise reduction, insulation materials, and acoustic performance instantly with this free online calculator.",
  icon: "🔇",
  color: "#058554",
  featured: false,
  keywords: [
    "soundproofing calculator",
    "acoustic calculator",
    "noise reduction calculator",
    "sound insulation tool",
    "room soundproofing estimate",
    "acoustic treatment calculator",
    "decibel reduction calculator"
  ],
  seo: {
    title: "Soundproofing Calculator – How Much Noise Reduction?",
    description: "Work out how many decibels of noise reduction a room needs, what your wall and insulation give, and what to add. For bedrooms, studios and offices.",
    keywords: "soundproofing calculator, acoustic calculator, noise reduction calculator, sound insulation tool, room soundproofing estimate",
    og: {
      title: "Acoustic Soundproofing Calculator – Free Noise Reduction Tool",
      description: "Calculate soundproofing requirements instantly with material recommendations and acoustic performance estimates.",
      type: "website",
      url: "/tools/architecture/acoustic-soundproofing-calculator"
    },
    howToSteps: [
      { name: "Enter the room size", text: "Type the length, width and height in meters (1 m = 3.28 ft), or pick a room preset." },
      { name: "Set the noise levels", text: "Enter the noise source level in dB, or pick a source such as traffic or a drum kit, and the level you want inside." },
      { name: "Describe the wall", text: "Choose the wall type and any insulation in the cavity." },
      { name: "Read the result", text: "See the reduction needed, the reduction your wall gives, the level you will hear and what to add to close the gap." },
    ],
    faq: [
      { q: "How is the required noise reduction worked out?", a: "Required reduction = noise source level − the level you want. Loud traffic at 80 dB reduced to a quiet-bedroom 35 dB needs 45 dB. The calculator compares that with the wall's sound insulation plus the insulation you add." },
      { q: "What is STC and how does it relate to dB reduction?", a: "Sound Transmission Class (STC, ASTM E413) in the US, and Rw (ISO 717-1) in Europe, rate how much sound a wall blocks, roughly the dB drop at speech frequencies. A single stud wall with drywall is about STC 33; with insulation and double drywall about STC 45–50; a 200 mm (8 in) concrete wall about STC 50–55." },
      { q: "What noise level is acceptable indoors?", a: "The WHO recommends below 30 dB(A) in bedrooms at night; about 35–40 dB(A) suits living rooms and private offices, and 25 dB or less recording rooms." },
      { q: "Does acoustic foam soundproof a room?", a: "No. Foam absorbs echo inside a room but barely stops sound passing through a wall. Blocking sound needs mass (extra drywall, mass-loaded vinyl), decoupling (resilient channels, double studs), filling the cavity and sealing gaps." },
      { q: "Why do small gaps matter so much?", a: "Sound goes through any air path. A 1% opening, such as a gap under a door or an unsealed outlet, can cut a wall's performance from STC 50 to around STC 30, so seal every gap with acoustic sealant and door seals." },
    ],
  },
  relatedTools: [
    "heat-loss-calculator-building",
    "insulation-thickness-calculator",
    "ventilation-calculator"
  ]
};