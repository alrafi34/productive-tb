import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import AntennaLengthCalculatorUI from "@/tools/antenna-length-calculator/ui";
import { antennaLengthCalculatorConfig } from "@/tools/antenna-length-calculator/config";

export const metadata: Metadata = {
  title: antennaLengthCalculatorConfig.seo.title,
  description: antennaLengthCalculatorConfig.seo.description,
  keywords: antennaLengthCalculatorConfig.seo.keywords,
  openGraph: {
    images: [{ url: "/og?title=Antenna+Length+Calculator", width: 1200, height: 630, alt: "Antenna Length Calculator" }],
    title: antennaLengthCalculatorConfig.seo.og.title,
    description: antennaLengthCalculatorConfig.seo.og.description,
    type: "website",
    url: antennaLengthCalculatorConfig.seo.og.url,
  },
  twitter: {
    card: "summary_large_image",
    title: antennaLengthCalculatorConfig.seo.og.title,
    description: antennaLengthCalculatorConfig.seo.og.description,
    images: ["/og?title=Antenna+Length+Calculator"],
  },
  alternates: {
    canonical: antennaLengthCalculatorConfig.seo.og.url,
  },
};

export default function AntennaLengthCalculatorPage() {
  return (
    <ToolLayout
      title={antennaLengthCalculatorConfig.name}
      description={antennaLengthCalculatorConfig.description}
      icon={antennaLengthCalculatorConfig.icon}
    >
      <AntennaLengthCalculatorUI />
    </ToolLayout>
  );
}
