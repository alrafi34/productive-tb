import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import SurveyAreaCalculatorUI from "@/tools/survey-area-calculator/ui";
import { surveyAreaCalculatorConfig } from "@/tools/survey-area-calculator/config";

export const metadata: Metadata = {
  title: surveyAreaCalculatorConfig.seo.title,
  description: surveyAreaCalculatorConfig.seo.description,
  keywords: surveyAreaCalculatorConfig.seo.keywords,
  openGraph: {
    title: surveyAreaCalculatorConfig.seo.og.title,
    description: surveyAreaCalculatorConfig.seo.og.description,
    type: "website",
    url: surveyAreaCalculatorConfig.seo.og.url,
  },
  alternates: {
    canonical: surveyAreaCalculatorConfig.seo.og.url,
  },
};

export default function SurveyAreaCalculatorPage() {
  return (
    <ToolLayout
      title={surveyAreaCalculatorConfig.name}
      description={surveyAreaCalculatorConfig.description}
      icon={surveyAreaCalculatorConfig.icon}
      category={{ slug: "land", name: "Land & Surveying" }}
    >
      <SurveyAreaCalculatorUI />
    </ToolLayout>
  );
}
