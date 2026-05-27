import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import SquareFeetToAcreConverterUI from "@/tools/square-feet-to-acre-converter/ui";
import { squareFeetToAcreConverterConfig } from "@/tools/square-feet-to-acre-converter/config";

export const metadata: Metadata = {
  title: squareFeetToAcreConverterConfig.seo.title,
  description: squareFeetToAcreConverterConfig.seo.description,
  keywords: squareFeetToAcreConverterConfig.seo.keywords,
  openGraph: {
    title: squareFeetToAcreConverterConfig.seo.og.title,
    description: squareFeetToAcreConverterConfig.seo.og.description,
    type: "website",
    url: squareFeetToAcreConverterConfig.seo.og.url,
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
