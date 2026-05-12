import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import CapacitorCalculatorUI from "@/tools/capacitor-calculator/ui";
import { capacitorCalculatorConfig } from "@/tools/capacitor-calculator/config";

export const metadata: Metadata = {
  title: capacitorCalculatorConfig.seo.title,
  description: capacitorCalculatorConfig.seo.description,
  keywords: capacitorCalculatorConfig.seo.keywords,
  openGraph: {
    title: capacitorCalculatorConfig.seo.og.title,
    description: capacitorCalculatorConfig.seo.og.description,
    type: "website",
    url: capacitorCalculatorConfig.seo.og.url,
  },
};

export default function CapacitorCalculatorPage() {
  return (
    <ToolLayout
      title={capacitorCalculatorConfig.name}
      description={capacitorCalculatorConfig.description}
      icon={capacitorCalculatorConfig.icon}
    >
      <CapacitorCalculatorUI />
    </ToolLayout>
  );
}
