import { siteConfig } from "@/config/site";

export const angularVelocityCalculatorConfig = {
  name: "Angular Velocity Calculator",
  slug: "angular-velocity-calculator",
  description:
    "Calculate angular velocity in rad/s, deg/s, rev/s, and RPM from displacement, linear velocity, RPM, frequency, or period. Free online mechanical calculator with real-time results and unit conversions.",
  category: "mechanical",
  icon: "🔄",
  free: true,
  seo: {
    title: "Angular Velocity Calculator – From RPM, Frequency & More",
    description:
      "Calculate angular velocity from RPM, frequency, period, angular displacement or linear speed and radius, with unit conversion and steps.",
    keywords: [
      "angular velocity calculator",
      "rpm to rad/s calculator",
      "mechanical calculator",
      "rotational speed calculator",
      "physics angular velocity calculator",
      "engineering calculator",
      "radian per second calculator",
      "angular velocity formula",
      "angular displacement calculator",
      "frequency to rad/s",
      "period to angular velocity",
      "omega calculator",
    ],
    og: {
      title: "Angular Velocity Calculator – From RPM, Frequency & More",
      description:
        "Calculate angular velocity from RPM, frequency, period, angular displacement or linear speed and radius, with unit conversion and steps.",
      url: `${siteConfig.url}/tools/mechanical/angular-velocity-calculator`,
    },
  },
  relatedTools: [
    "torque-calculator",
    "centripetal-force-calculator",
    "gear-ratio-calculator",
    "velocity-calculator",
    "angular-acceleration-calculator",
    "rotational-kinetic-energy-calculator",
  ],
};
