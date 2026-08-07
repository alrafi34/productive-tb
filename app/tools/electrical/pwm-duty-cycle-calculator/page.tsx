import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import PWMDutyCycleCalculatorUI from "@/tools/pwm-duty-cycle-calculator/ui";
import { pwmDutyCycleCalculatorConfig } from "@/tools/pwm-duty-cycle-calculator/config";

export const metadata: Metadata = {
  title: pwmDutyCycleCalculatorConfig.seo.title,
  description: pwmDutyCycleCalculatorConfig.seo.description,
  keywords: pwmDutyCycleCalculatorConfig.seo.keywords,
  openGraph: {
    images: [{ url: "/og?title=PWM+Duty+Cycle+Calculator", width: 1200, height: 630, alt: "PWM Duty Cycle Calculator" }],
    title: pwmDutyCycleCalculatorConfig.seo.og.title,
    description: pwmDutyCycleCalculatorConfig.seo.og.description,
    type: "website",
    url: pwmDutyCycleCalculatorConfig.seo.og.url,
  },
  twitter: {
    card: "summary_large_image",
    title: pwmDutyCycleCalculatorConfig.seo.og.title,
    description: pwmDutyCycleCalculatorConfig.seo.og.description,
    images: ["/og?title=PWM+Duty+Cycle+Calculator"],
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
