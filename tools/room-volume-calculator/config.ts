export const roomVolumeCalculatorConfig = {
  name: "Room Volume Calculator",
  slug: "room-volume-calculator",
  description: "Compute volume of interior spaces.",
  category: "architecture",
  icon: "📦",
  free: true,
  seo: {
    title: "Room Volume Calculator – Cubic Feet & m³",
    description: "Calculate a room's volume in cubic feet, cubic meters and liters for rectangular, round and attic rooms, plus air changes per hour and air purifier CADR.",
    keywords: [
      "room volume calculator",
      "calculate room volume",
      "cubic meter room calculator",
      "room size calculator",
      "HVAC room volume calculator",
      "interior space calculator",
      "room capacity calculator",
      "air volume calculator",
      "cubic feet calculator",
      "room dimensions calculator"
    ],
    openGraph: {
      title: "Room Volume Calculator – Calculate Interior Space Volume Instantly",
      description: "Free room volume calculator for architects, designers, and homeowners. Calculate cubic meters, cubic feet, and liters instantly.",
      type: "website",
      url: "/tools/architecture/room-volume-calculator"
    },
    howToSteps: [
      { name: "Pick the room shape", text: "Choose rectangular, cylindrical or triangular (attic)." },
      { name: "Choose the unit", text: "Select feet or meters, or start from a room preset." },
      { name: "Enter the dimensions", text: "Type length, width and height, the radius, or the wall and peak heights for an attic." },
      { name: "Read the volume", text: "See the volume in every unit, the air changes per hour for an airflow in CFM, and the CADR to look for in an air purifier." },
    ],
    faq: [
      { q: "How do I calculate room volume?", a: "Length × width × height. A 12 × 15 ft room with an 8 ft ceiling is 1,440 cu ft, or 40.8 m³ (40,800 liters)." },
      { q: "How do I work out the volume of an attic room?", a: "For a triangular cross-section, volume = ½ × width × peak height × length. For knee walls, add the rectangular part below the slope to the triangle above it." },
      { q: "What are air changes per hour (ACH)?", a: "How many times the room's air is replaced each hour: ACH = CFM × 60 ÷ volume in cu ft. 120 CFM in a 1,440 cu ft room gives 5 ACH. ASHRAE 62.2 sets minimum ventilation for homes." },
      { q: "What CADR do I need for an air purifier?", a: "AHAM recommends a CADR of at least two-thirds of the floor area in square feet, for rooms with 8 ft ceilings: a 180 sq ft room needs a CADR of 120 CFM. The calculator uses the room volume ÷ 12, which is the same rule and also adjusts for taller ceilings." },
      { q: "How do I convert cubic feet to cubic meters?", a: "Multiply by 0.0283. 1 m³ = 35.31 cu ft = 1,000 liters." },
    ],
  },
  features: [
    "Multiple room shapes",
    "Real-time calculations",
    "Unit conversions",
    "Room presets",
    "Calculation history",
    "Export to text",
    "HVAC helpers",
    "Copy to clipboard",
    "Mobile responsive"
  ]
};
