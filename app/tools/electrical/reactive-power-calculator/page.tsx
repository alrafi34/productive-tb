import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import ReactivePowerCalculatorUI from "@/tools/reactive-power-calculator/ui";
import { reactivePowerCalculatorConfig } from "@/tools/reactive-power-calculator/config";

export const metadata: Metadata = {
  title: reactivePowerCalculatorConfig.seo.title,
  description: reactivePowerCalculatorConfig.seo.description,
  keywords: reactivePowerCalculatorConfig.seo.keywords,
  openGraph: {
    images: [{ url: "/og?title=Reactive+Power+Calculator", width: 1200, height: 630, alt: "Reactive Power Calculator" }],
    title: reactivePowerCalculatorConfig.seo.og.title,
    description: reactivePowerCalculatorConfig.seo.og.description,
    type: "website",
    url: reactivePowerCalculatorConfig.seo.og.url,
  },
  twitter: {
    card: "summary_large_image",
    title: reactivePowerCalculatorConfig.seo.og.title,
    description: reactivePowerCalculatorConfig.seo.og.description,
    images: ["/og?title=Reactive+Power+Calculator"],
  },
};

export default function ReactivePowerCalculatorPage() {
  return (
    <ToolLayout
      title={reactivePowerCalculatorConfig.name}
      description={reactivePowerCalculatorConfig.description}
      icon={reactivePowerCalculatorConfig.icon}
    >
      <ReactivePowerCalculatorUI />
    </ToolLayout>
  );
}
