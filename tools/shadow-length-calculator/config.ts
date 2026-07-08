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
    title: "Shadow Length Calculator — Free Sun Shadow Calculator Online | Productive Toolbox",
    description: "Calculate shadow length from object height and sun angle. Free sun shadow calculator for architects, solar installers, and photographers. No signup.",
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
      {
        name: "Enter the Object Height",
        text: "Type the height of the object casting the shadow into the height field. Select meters or feet using the unit toggle. The calculator accepts any positive number including decimals.",
      },
      {
        name: "Set the Sun Elevation Angle",
        text: "Use the angle slider or type directly into the angle field to set the sun's elevation above the horizon in degrees. Values range from 1° (sun near horizon, very long shadows) to 89° (sun nearly overhead, very short shadows). At 45°, the shadow equals the object height.",
      },
      {
        name: "Read the Shadow Length",
        text: "The shadow length result appears instantly as you adjust either input. The result is displayed in the same unit as your height input. The visual diagram updates in real time to show the geometric relationship between the object, the sun angle, and the shadow.",
      },
      {
        name: "Try Different Angles for Time-of-Day Analysis",
        text: "Change the sun angle to model different times of day. Use low angles (10–20°) for morning and evening, mid angles (40–60°) for mid-morning and mid-afternoon, and high angles (70–80°) for midday in summer.",
      },
      {
        name: "Export Your Result",
        text: "Click the copy button to copy the result to clipboard, or export the diagram as an image for use in design presentations, planning documents, or client reports.",
      },
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
        a: "Sun elevation angle varies by location, date, and time of day. At solar noon it approximately equals 90° minus your latitude plus a seasonal correction of up to plus or minus 23.5°. You can find the exact angle for any location and time using a sun position app, a solar elevation chart, or an online ephemeris tool.",
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
        a: "For solar panel shading analysis, use the winter solstice noon elevation angle for your latitude — this is the lowest sun position of the year and produces the longest shadows. Any obstacle that does not shade the panels at winter solstice noon will not shade them at any other time. At 51° N, winter solstice noon elevation is approximately 15°.",
      },
      {
        q: "Is my data private when using this calculator?",
        a: "Yes. All calculations run entirely in your browser using JavaScript. Your inputs — object height and sun angle — are never transmitted to any server, stored in any database, or accessible to anyone other than you. The tool works offline once the page is loaded.",
      },
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
    "100% browser-based — no data sent to any server",
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
