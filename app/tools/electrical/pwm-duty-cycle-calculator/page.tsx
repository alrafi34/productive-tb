import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import PWMDutyCycleCalculatorUI from "@/tools/pwm-duty-cycle-calculator/ui";
import { pwmDutyCycleCalculatorConfig } from "@/tools/pwm-duty-cycle-calculator/config";

export const metadata: Metadata = {
  title: pwmDutyCycleCalculatorConfig.seo.title,
  description: pwmDutyCycleCalculatorConfig.seo.description,
  keywords: pwmDutyCycleCalculatorConfig.seo.keywords,
  openGraph: {
    title: pwmDutyCycleCalculatorConfig.seo.og.title,
    description: pwmDutyCycleCalculatorConfig.seo.og.description,
    type: "website",
    url: pwmDutyCycleCalculatorConfig.seo.og.url,
  },
  alternates: {
    canonical: pwmDutyCycleCalculatorConfig.seo.og.url,
  },
};

export default function PWMDutyCycleCalculatorPage() {
  return (
    <ToolLayout
      title={pwmDutyCycleCalculatorConfig.name}
      description={pwmDutyCycleCalculatorConfig.description}
      icon={pwmDutyCycleCalculatorConfig.icon}
    >
      <PWMDutyCycleCalculatorUI />
    </ToolLayout>
  );
}
