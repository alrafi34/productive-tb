import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import AcreToSquareFeetConverterUI from "@/tools/acre-to-square-feet-converter/ui";
import { acreToSquareFeetConverterConfig } from "@/tools/acre-to-square-feet-converter/config";

export const metadata: Metadata = {
  title: acreToSquareFeetConverterConfig.seo.title,
  description: acreToSquareFeetConverterConfig.seo.description,
  keywords: acreToSquareFeetConverterConfig.seo.keywords,
  openGraph: {
    title: acreToSquareFeetConverterConfig.seo.og.title,
    description: acreToSquareFeetConverterConfig.seo.og.description,
    type: "website",
    url: acreToSquareFeetConverterConfig.seo.og.url,
  },
  alternates: {
    canonical: acreToSquareFeetConverterConfig.seo.og.url,
  },
};

export default function AcreToSquareFeetConverterPage() {
  return (
    <ToolLayout
      title={acreToSquareFeetConverterConfig.name}
      description={acreToSquareFeetConverterConfig.description}
      icon={acreToSquareFeetConverterConfig.icon}
      category={{ slug: "land", name: "Land & Surveying" }}
    >
      <AcreToSquareFeetConverterUI />
    </ToolLayout>
  );
}
