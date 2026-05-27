import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import HectareToAcreConverterUI from "@/tools/hectare-to-acre-converter/ui";
import { hectareToAcreConverterConfig } from "@/tools/hectare-to-acre-converter/config";

export const metadata: Metadata = {
  title: hectareToAcreConverterConfig.seo.title,
  description: hectareToAcreConverterConfig.seo.description,
  keywords: hectareToAcreConverterConfig.seo.keywords,
  openGraph: {
    title: hectareToAcreConverterConfig.seo.og.title,
    description: hectareToAcreConverterConfig.seo.og.description,
    type: "website",
    url: hectareToAcreConverterConfig.seo.og.url,
  },
  alternates: {
    canonical: hectareToAcreConverterConfig.seo.og.url,
  },
};

export default function HectareToAcreConverterPage() {
  return (
    <ToolLayout
      title={hectareToAcreConverterConfig.name}
      description={hectareToAcreConverterConfig.description}
      icon={hectareToAcreConverterConfig.icon}
      category={{ slug: "land", name: "Land & Surveying" }}
    >
      <HectareToAcreConverterUI />
    </ToolLayout>
  );
}
