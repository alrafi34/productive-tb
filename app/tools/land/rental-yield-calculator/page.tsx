import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import RentalYieldCalculatorUI from "@/tools/rental-yield-calculator/ui";
import { rentalYieldCalculatorConfig } from "@/tools/rental-yield-calculator/config";

export const metadata: Metadata = {
  title: rentalYieldCalculatorConfig.seo.title,
  description: rentalYieldCalculatorConfig.seo.description,
  keywords: rentalYieldCalculatorConfig.seo.keywords,
  openGraph: {
    title: rentalYieldCalculatorConfig.seo.og.title,
    description: rentalYieldCalculatorConfig.seo.og.description,
    type: "website",
    url: rentalYieldCalculatorConfig.seo.og.url,
  },
  alternates: {
    canonical: rentalYieldCalculatorConfig.seo.og.url,
  },
};

export default function RentalYieldCalculatorPage() {
  return (
    <ToolLayout
      title={rentalYieldCalculatorConfig.name}
      description={rentalYieldCalculatorConfig.description}
      icon={rentalYieldCalculatorConfig.icon}
      category={{ slug: "land", name: "Land & Surveying" }}
    >
      <RentalYieldCalculatorUI />
    </ToolLayout>
  );
}
