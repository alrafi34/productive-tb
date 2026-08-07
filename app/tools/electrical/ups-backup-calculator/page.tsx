import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import UPSBackupCalculatorUI from "@/tools/ups-backup-calculator/ui";
import { upsBackupCalculatorConfig } from "@/tools/ups-backup-calculator/config";

export const metadata: Metadata = {
  title: upsBackupCalculatorConfig.seo.title,
  description: upsBackupCalculatorConfig.seo.description,
  keywords: upsBackupCalculatorConfig.seo.keywords,
  openGraph: {
    images: [{ url: "/og?title=UPS+Backup+Calculator", width: 1200, height: 630, alt: "UPS Backup Calculator" }],
    title: upsBackupCalculatorConfig.seo.og.title,
    description: upsBackupCalculatorConfig.seo.og.description,
    url: upsBackupCalculatorConfig.seo.og.url,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: upsBackupCalculatorConfig.seo.og.title,
    description: upsBackupCalculatorConfig.seo.og.description,
    images: ["/og?title=UPS+Backup+Calculator"],
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
