import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import AcreToHectareConverterUI from "@/tools/acre-to-hectare-converter/ui";
import { acreToHectareConverterConfig } from "@/tools/acre-to-hectare-converter/config";

export const metadata: Metadata = {
  title: acreToHectareConverterConfig.seo.title,
  description: acreToHectareConverterConfig.seo.description,
  keywords: acreToHectareConverterConfig.seo.keywords,
  openGraph: {
    title: acreToHectareConverterConfig.seo.og.title,
    description: acreToHectareConverterConfig.seo.og.description,
    type: "website",
    url: acreToHectareConverterConfig.seo.og.url,
  },
  alternates: {
    canonical: acreToHectareConverterConfig.seo.og.url,
  },
};

export default function AcreToHectareConverterPage() {
  return (
    <ToolLayout
      title={acreToHectareConverterConfig.name}
      description={acreToHectareConverterConfig.description}
      icon={acreToHectareConverterConfig.icon}
      category={{ slug: "land", name: "Land & Surveying" }}
    >
      <AcreToHectareConverterUI />
    </ToolLayout>
  );
}
