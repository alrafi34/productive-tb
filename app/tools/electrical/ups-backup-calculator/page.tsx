import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import UPSBackupCalculatorUI from "@/tools/ups-backup-calculator/ui";
import { upsBackupCalculatorConfig } from "@/tools/ups-backup-calculator/config";

export const metadata: Metadata = {
  title: upsBackupCalculatorConfig.seo.title,
  description: upsBackupCalculatorConfig.seo.description,
  keywords: upsBackupCalculatorConfig.seo.keywords,
  openGraph: {
    title: upsBackupCalculatorConfig.seo.og.title,
    description: upsBackupCalculatorConfig.seo.og.description,
    url: upsBackupCalculatorConfig.seo.og.url,
    type: "website",
  },
};

export default function UPSBackupCalculatorPage() {
  return (
    <ToolLayout
      title={upsBackupCalculatorConfig.name}
      description={upsBackupCalculatorConfig.description}
      icon={upsBackupCalculatorConfig.icon}
    >
      <UPSBackupCalculatorUI />
    </ToolLayout>
  );
}
