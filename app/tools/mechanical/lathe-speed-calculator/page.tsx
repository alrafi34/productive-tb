import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import LatheSpeedCalculatorUI from "@/tools/lathe-speed-calculator/ui";
import { latheSpeedCalculatorConfig } from "@/tools/lathe-speed-calculator/config";

export const metadata: Metadata = {
  title: latheSpeedCalculatorConfig.seo.title,
  description: latheSpeedCalculatorConfig.seo.description,
  keywords: latheSpeedCalculatorConfig.seo.keywords,
  openGraph: {
    images: [{ url: "/og?title=Lathe+Speed+Calculator", width: 1200, height: 630, alt: "Lathe Speed Calculator" }],
    title: latheSpeedCalculatorConfig.seo.og.title,
    description: latheSpeedCalculatorConfig.seo.og.description,
    type: "website",
    url: latheSpeedCalculatorConfig.seo.og.url,
  },
  twitter: {
    card: "summary_large_image",
    title: latheSpeedCalculatorConfig.seo.og.title,
    description: latheSpeedCalculatorConfig.seo.og.description,
    images: ["/og?title=Lathe+Speed+Calculator"],
  },
  alternates: {
    canonical: latheSpeedCalculatorConfig.seo.og.url,
  },
};

export default function LatheSpeedCalculatorPage() {
  return (
    <ToolLayout
      title={latheSpeedCalculatorConfig.name}
      description={latheSpeedCalculatorConfig.description}
      icon={latheSpeedCalculatorConfig.icon}
    >
      <LatheSpeedCalculatorUI />
    </ToolLayout>
  );
}
