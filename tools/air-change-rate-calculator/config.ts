export const airChangeRateCalculatorConfig = {
  name: "Air Change Rate Calculator",
  slug: "air-change-rate-calculator",
  category: "architecture",
  description: "Calculate air changes per hour (ACH) for ventilation design and HVAC systems. Instant ACH calculation with unit conversion.",
  icon: "🌬️",
  color: "#058554",
  featured: false,
  keywords: [
    "air change rate calculator",
    "ACH calculator",
    "air changes per hour",
    "ventilation calculator",
    "HVAC calculator",
    "airflow calculator",
    "indoor air quality",
    "ventilation design"
  ],
  seo: {
    title: "Air Change Rate Calculator – ACH from CFM or m³/h",
    description: "Calculate air changes per hour (ACH) from a room's size or volume and the airflow in CFM or m³/h, and see whether the ventilation is low, good or high.",
    keywords: "air change rate calculator, ACH calculator, ventilation calculator, HVAC airflow calculator, air changes per hour formula",
    og: {
      title: "Air Change Rate Calculator – Free ACH Tool",
      description: "Calculate air changes per hour instantly with multiple unit support.",
      type: "website",
      url: "/tools/architecture/air-change-rate-calculator"
    },
    howToSteps: [
      { name: "Choose the input", text: "Calculate from room dimensions or from a known volume." },
      { name: "Enter the room", text: "Type length, width and height in feet or meters, or the volume in m³ or ft³." },
      { name: "Enter the airflow", text: "Type the airflow of the fan, ventilation system or air purifier in CFM or m³/h." },
      { name: "Read the ACH", text: "See the air changes per hour and how the ventilation level compares with typical ranges." },
    ],
    faq: [
      { q: "How do you calculate air changes per hour?", a: "ACH = airflow per hour ÷ room volume: CFM × 60 ÷ volume in cu ft, or m³/h ÷ volume in m³. A 120 CFM fan in a 1,440 cu ft room gives 5 ACH." },
      { q: "What is a good ACH for a home?", a: "About 0.35 fresh-air changes per hour or more for the whole house (an older ASHRAE 62.2 guide), with bathrooms and kitchens exhausted while in use. For cleaning indoor air, 4–6 ACH of filtered air is a common target." },
      { q: "What ACH does an air purifier give?", a: "Divide its CADR in CFM by the room volume and multiply by 60. A purifier with a CADR of 200 CFM in a 1,440 cu ft room gives 8.3 ACH; AHAM suggests about 5 ACH." },
      { q: "How is ACH measured in a blower door test?", a: "Energy auditors use ACH50, the air changes at a 50 pascal pressure difference. The 2021 IECC allows at most 3–5 ACH50 depending on climate zone; Passive House requires 0.6 ACH50 or less." },
      { q: "How do I convert m³/h to CFM?", a: "Divide m³/h by 1.699. 250 m³/h is about 147 CFM." },
    ],
  },
  relatedTools: [
    "ventilation-calculator",
    "hvac-load-calculator",
    "room-volume-calculator"
  ]
};
