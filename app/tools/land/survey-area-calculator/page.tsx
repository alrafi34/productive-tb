import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import SurveyAreaCalculatorUI from "@/tools/survey-area-calculator/ui";
import { surveyAreaCalculatorConfig } from "@/tools/survey-area-calculator/config";

export const metadata: Metadata = {
  title: surveyAreaCalculatorConfig.seo.title,
  description: surveyAreaCalculatorConfig.seo.description,
  keywords: surveyAreaCalculatorConfig.seo.keywords,
  openGraph: {
    images: [{ url: "/og?title=Survey+Area+Calculator", width: 1200, height: 630, alt: "Survey Area Calculator" }],
    title: surveyAreaCalculatorConfig.seo.og.title,
    description: surveyAreaCalculatorConfig.seo.og.description,
    type: "website",
    url: surveyAreaCalculatorConfig.seo.og.url,
  },
  twitter: {
    card: "summary_large_image",
    title: surveyAreaCalculatorConfig.seo.og.title,
    description: surveyAreaCalculatorConfig.seo.og.description,
    images: ["/og?title=Survey+Area+Calculator"],
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
