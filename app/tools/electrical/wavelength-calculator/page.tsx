import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import WavelengthCalculatorUI from "@/tools/wavelength-calculator/ui";
import { wavelengthCalculatorConfig } from "@/tools/wavelength-calculator/config";

export const metadata: Metadata = {
  title: wavelengthCalculatorConfig.seo.title,
  description: wavelengthCalculatorConfig.seo.description,
  keywords: wavelengthCalculatorConfig.seo.keywords,
  openGraph: {
    title: wavelengthCalculatorConfig.seo.og.title,
    description: wavelengthCalculatorConfig.seo.og.description,
    type: "website",
    url: wavelengthCalculatorConfig.seo.og.url,
  },
  alternates: {
    canonical: wavelengthCalculatorConfig.seo.og.url,
  },
};

export default function WavelengthCalculatorPage() {
  return (
    <ToolLayout
      title={wavelengthCalculatorConfig.name}
      description={wavelengthCalculatorConfig.description}
      icon={wavelengthCalculatorConfig.icon}
    >
      <WavelengthCalculatorUI />
    </ToolLayout>
  );
}
