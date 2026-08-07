import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import DecibelCalculatorUI from "@/tools/decibel-db-calculator/ui";
import { decibelCalculatorConfig } from "@/tools/decibel-db-calculator/config";

export const metadata: Metadata = {
  title: decibelCalculatorConfig.seo.title,
  description: decibelCalculatorConfig.seo.description,
  keywords: decibelCalculatorConfig.seo.keywords,
  openGraph: {
    images: [{ url: "/og?title=Decibel+(dB)+Calculator", width: 1200, height: 630, alt: "Decibel (dB) Calculator" }],
    title: decibelCalculatorConfig.seo.og.title,
    description: decibelCalculatorConfig.seo.og.description,
    type: "website",
    url: decibelCalculatorConfig.seo.og.url,
  },
  twitter: {
    card: "summary_large_image",
    title: decibelCalculatorConfig.seo.og.title,
    description: decibelCalculatorConfig.seo.og.description,
    images: ["/og?title=Decibel+(dB)+Calculator"],
  },
  alternates: {
    canonical: decibelCalculatorConfig.seo.og.url,
  },
};

export default function DecibelCalculatorPage() {
  return (
    <ToolLayout
      title={decibelCalculatorConfig.name}
      description={decibelCalculatorConfig.description}
      icon={decibelCalculatorConfig.icon}
    >
      <DecibelCalculatorUI />
    </ToolLayout>
  );
}
