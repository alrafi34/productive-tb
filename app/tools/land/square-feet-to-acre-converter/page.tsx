import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import SquareFeetToAcreConverterUI from "@/tools/square-feet-to-acre-converter/ui";
import { squareFeetToAcreConverterConfig } from "@/tools/square-feet-to-acre-converter/config";

export const metadata: Metadata = {
  title: squareFeetToAcreConverterConfig.seo.title,
  description: squareFeetToAcreConverterConfig.seo.description,
  keywords: squareFeetToAcreConverterConfig.seo.keywords,
  openGraph: {
    images: [{ url: "/og?title=Square+Feet+to+Acre+Converter", width: 1200, height: 630, alt: "Square Feet to Acre Converter" }],
    title: squareFeetToAcreConverterConfig.seo.og.title,
    description: squareFeetToAcreConverterConfig.seo.og.description,
    type: "website",
    url: squareFeetToAcreConverterConfig.seo.og.url,
  },
  twitter: {
    card: "summary_large_image",
    title: squareFeetToAcreConverterConfig.seo.og.title,
    description: squareFeetToAcreConverterConfig.seo.og.description,
    images: ["/og?title=Square+Feet+to+Acre+Converter"],
  },
  alternates: {
    canonical: squareFeetToAcreConverterConfig.seo.og.url,
  },
};

export default function SquareFeetToAcreConverterPage() {
  return (
    <ToolLayout
      title={squareFeetToAcreConverterConfig.name}
      description={squareFeetToAcreConverterConfig.description}
      icon={squareFeetToAcreConverterConfig.icon}
      category={{ slug: "land", name: "Land & Surveying" }}
    >
      <SquareFeetToAcreConverterUI />
    </ToolLayout>
  );
}
