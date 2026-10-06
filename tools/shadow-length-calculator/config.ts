import { siteConfig } from "@/config/site";

export const toolConfig = {
  slug: "shadow-length-calculator",
  name: "Shadow Length Calculator",
  description: "Calculate shadow length from object height and sun elevation angle. Free online sun shadow calculator for architecture, solar planning, and photography.",
  category: "architecture",
  icon: "🌓",
  free: true,
  backend: false,
  seo: {
    title: "Shadow Length Calculator by Time & Date",
    description: "Find a shadow's length and direction from object height and sun angle, or from a date, time and place. Hour-by-hour table and live diagram.",
    keywords: [
      "shadow length calculator",
      "sun shadow calculator",
      "how to calculate shadow length",
      "shadow calculation formula",
      "shadow length from sun angle",
      "shadow length calculator online",
      "calculate shadow length with sun",
      "shadow calculator",
      "sun angle shadow length",
      "building shadow calculator",
      "shadow projection calculator",
      "shadow length formula",
      "shadow calculation",
      "solar shadow calculator",
      "how to calculate shadow length with sun",
      "shadow length from height and angle",
      "architecture shadow calculator",
      "shadow impact calculator",
      "sun elevation shadow calculator",
      "shadow length by time of day",
      "shadow length trigonometry",
      "winter solstice shadow calculator",
      "tree shadow calculator",
      "free shadow length calculator",
      "shadow calculator online",
    ],
    openGraph: {
      title: "Shadow Length Calculator — Free Sun Shadow Calculator Online",
      description: "Calculate shadow length from object height and sun elevation angle. Instant results for architecture, solar planning, and photography.",
      type: "website",
      url: `${siteConfig.url}/tools/architecture/shadow-length-calculator`,
    },
    howToSteps: [
      { name: "Enter the object height", text: "Type the height of the building, tree, pole or person and choose meters or feet." },
      { name: "Set the sun angle — or let the tool find it", text: "Drag the sun elevation slider, or choose Use date, time & place and pick a city or enter coordinates, a date and a local time; the sun's elevation and direction are worked out for you." },
      { name: "Read the shadow length and direction", text: "The shadow length appears in your unit and the other one. In date-and-place mode you also see which compass direction the shadow points." },
      { name: "Check the whole day", text: "Open Shadow through the day to see the shadow length and direction on every hour while the sun is up." },
      { name: "Copy, save or export", text: "Copy the result, save it to the history, or download the diagram as an image or the result as text." },
    ],
    faq: [
      {
        q: "What is a shadow length calculator?",
        a: "A shadow length calculator is a free online tool that computes the length of a shadow cast by any object based on the object's height and the sun's elevation angle. It uses the trigonometric formula Shadow Length = Object Height divided by tan(Sun Angle) to produce an accurate result instantly. It is used by architects, photographers, solar panel installers, teachers, and anyone who needs to estimate shadow length at a specific time of day.",
      },
      {
        q: "How do you calculate shadow length from sun angle?",
        a: "Shadow length is calculated by dividing the object height by the tangent of the sun's elevation angle: Shadow Length = Height / tan(Angle). For a 10-meter building at 30°, the shadow is 10 / tan(30°) = 17.3 meters. At 45°, the shadow equals the object height exactly. At 60°, the shadow is 5.77 meters — shorter because the sun is higher.",
      },
      {
        q: "How do I find the sun's elevation angle?",
        a: "Choose Use date, time & place in the calculator: pick a city or type latitude and longitude, set the date and local time, and the sun's elevation and compass bearing are calculated with the NOAA solar position method. As a rule of thumb, the noon elevation is about 90° − latitude, plus up to 23.4° in summer and minus up to 23.4° in winter.",
      },
      {
        q: "What is the shadow length when the sun is at 45 degrees?",
        a: "When the sun is at exactly 45° elevation, the shadow length equals the object height. This is because tan(45°) = 1, making the formula Shadow = Height / 1 = Height. A 5-meter fence post casts a 5-meter shadow. A 20-meter building casts a 20-meter shadow.",
      },
      {
        q: "Why are shadows longer in the morning and evening?",
        a: "Shadow length is determined by the tangent of the sun's angle. At sunrise and sunset, the sun is near 0° elevation and the tangent approaches zero, making shadows extremely long. As the sun rises, the elevation angle increases, the tangent grows, and shadows shorten. The shortest shadows occur at solar noon when elevation is at its peak.",
      },
      {
        q: "How do architects use shadow length calculations?",
        a: "Architects use shadow calculations to determine whether a proposed building will cast shadows onto neighboring properties, public spaces, or streets. Many planning authorities require shadow impact studies as part of building permit applications, especially for tall urban projects. Calculations are run for multiple times of day and dates to show the full range of shadow conditions.",
      },
      {
        q: "Can this calculator be used for objects other than buildings?",
        a: "Yes. The formula applies to any vertical object: trees, flagpoles, fences, utility poles, solar panel arrays, antennas, or people. The only inputs are the object height and the sun's elevation angle. A 15-meter tree at 60° sun casts an 8.66-meter shadow. A 1.8-meter person at 20° sun casts a 4.95-meter shadow.",
      },
      {
        q: "Does terrain slope affect shadow length?",
        a: "Yes. This calculator assumes flat, level ground. On an upward slope toward the sun, the shadow appears shorter because the ground rises to meet it sooner. On a downward slope away from the sun, the shadow appears longer. For most architectural site analysis purposes, the flat-ground result is used as a baseline with slope adjustments noted separately.",
      },
      {
        q: "What sun angle should I use for solar panel shading analysis?",
        a: "Start with the lowest sun of the year: the noon elevation on the winter solstice, roughly 90° − latitude − 23.5°. At 51° N that is about 15.5°, so a 2 m fence casts a shadow about 7 m long. Shadows are longer still in the early morning and late afternoon, so a full shading check also looks at the hours either side of noon.",
      },
      {
        q: "Is my data private when using this calculator?",
        a: "Yes. We do not collect or store what you enter.",
      },
      { q: "Which direction does a shadow point?", a: "Directly away from the sun. In the Northern Hemisphere the noon sun is to the south, so noon shadows point north; in the morning the sun is in the east and shadows point west, and in the evening the reverse. Date-and-place mode shows the exact bearing for the time you choose." },
    ],
  },
  features: [
    "Shadow length from any object height and sun angle",
    "Supports meters and feet",
    "Real-time result as you adjust inputs",
    "Visual diagram of sun–object–shadow geometry",
    "Shadow length reference table by angle",
    "Winter solstice reference angles by latitude",
    "Copy result to clipboard",
    "Export diagram as image",
    "Private: your inputs are not collected or stored",
    "No registration required",
  ],
  relatedTools: [
    "sunlight-exposure-calculator",
    "building-height-calculator",
    "solar-panel-calculator",
    "sun-angle-calculator",
    "structural-load-calculator",
    "parking-space-calculator",
  ],
};

// Alias export to satisfy existing import in app/tools/[tool]/[subtool]/page.tsx
export const shadowLengthCalculatorConfig = toolConfig;
