export const roomAcousticsCalculatorConfig = {
  name: "Room Acoustics Calculator",
  slug: "room-acoustics-calculator",
  category: "architecture",
  description: "Analyze room acoustics instantly. Calculate RT60, sound reflections, and room modes with this free online room acoustics calculator. Perfect for studios, offices, and home setups.",
  icon: "🔊",
  color: "#058554",
  featured: false,
  keywords: [
    "room acoustics calculator",
    "RT60 calculator",
    "sound absorption calculator",
    "room sound analysis",
    "studio acoustics tool",
    "reverberation time calculator",
    "acoustic treatment calculator"
  ],
  seo: {
    title: "Room Acoustics Calculator – RT60 Reverb Time",
    description: "Estimate a room's reverberation time (RT60) with the Sabine formula from its size and surface materials, plus room modes and tips for studios and offices.",
    keywords: "room acoustics calculator, RT60 calculator, sound absorption calculator, room sound analysis, studio acoustics tool",
    og: {
      title: "Room Acoustics Calculator – Free RT60 & Sound Analysis Tool",
      description: "Calculate reverberation time, room modes, and acoustic quality instantly with material recommendations.",
      type: "website",
      url: "/tools/architecture/room-acoustics-calculator"
    },
    howToSteps: [
      { name: "Enter the room size", text: "Type the length, width and height in meters or feet, or pick a room preset." },
      { name: "Choose the surfaces", text: "Select the material for the walls, floor and ceiling; each has an absorption coefficient." },
      { name: "Set the air conditions", text: "Adjust temperature and humidity, which change the speed of sound used for room modes." },
      { name: "Read the results", text: "See RT60, the total absorption, the first room modes and a rating with suggestions." },
    ],
    faq: [
      { q: "What is RT60?", a: "The time it takes for sound to fall by 60 dB after the source stops, a standard measure of how reverberant a room is. The calculator uses the Sabine formula RT60 = 0.161 × V ÷ A, with volume V in m³ and absorption A in m² sabins." },
      { q: "What RT60 is good for my room?", a: "About 0.3–0.5 s for recording studios and control rooms, 0.4–0.6 s for home theaters and small meeting rooms, 0.6–0.8 s for classrooms and offices (ANSI S12.60 asks for 0.6 s in small classrooms), and 1.5–2.5 s for concert halls and churches." },
      { q: "What are room modes?", a: "Resonances at frequencies where sound waves fit exactly between parallel walls: f = c ÷ 2L for the axial modes. A 5 m long room has its first length mode at about 34 Hz. They cause boomy or missing bass in small rooms." },
      { q: "How do I reduce echo in a room?", a: "Add absorption: acoustic panels, carpet, curtains, upholstered furniture and bookshelves. Treating about 20–30% of the wall and ceiling area usually brings a bare room into a comfortable range." },
      { q: "Is the Sabine formula accurate for very absorbent rooms?", a: "It overestimates RT60 when average absorption is high (above about 0.2–0.3). The Eyring formula is better there, but for planning either gives a useful estimate." },
    ],
  },
  relatedTools: [
    "acoustic-soundproofing-calculator",
    "ventilation-calculator",
    "room-volume-calculator"
  ]
};
