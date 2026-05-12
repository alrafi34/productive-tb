import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import AntennaLengthCalculatorUI from "@/tools/antenna-length-calculator/ui";
import { antennaLengthCalculatorConfig } from "@/tools/antenna-length-calculator/config";

export const metadata: Metadata = {
  title: antennaLengthCalculatorConfig.seo.title,
  description: antennaLengthCalculatorConfig.seo.description,
  keywords: antennaLengthCalculatorConfig.seo.keywords,
  openGraph: {
    title: antennaLengthCalculatorConfig.seo.og.title,
    description: antennaLengthCalculatorConfig.seo.og.description,
    type: "website",
    url: antennaLengthCalculatorConfig.seo.og.url,
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
