import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import RentalYieldCalculatorUI from "@/tools/rental-yield-calculator/ui";
import { rentalYieldCalculatorConfig } from "@/tools/rental-yield-calculator/config";

export const metadata: Metadata = {
  title: rentalYieldCalculatorConfig.seo.title,
  description: rentalYieldCalculatorConfig.seo.description,
  keywords: rentalYieldCalculatorConfig.seo.keywords,
  openGraph: {
    images: [{ url: "/og?title=Rental+Yield+Calculator", width: 1200, height: 630, alt: "Rental Yield Calculator" }],
    title: rentalYieldCalculatorConfig.seo.og.title,
    description: rentalYieldCalculatorConfig.seo.og.description,
    type: "website",
    url: rentalYieldCalculatorConfig.seo.og.url,
  },
  twitter: {
    card: "summary_large_image",
    title: rentalYieldCalculatorConfig.seo.og.title,
    description: rentalYieldCalculatorConfig.seo.og.description,
    images: ["/og?title=Rental+Yield+Calculator"],
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
