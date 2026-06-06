import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import ThreadPitchCalculatorUI from "@/tools/thread-pitch-calculator/ui";
import { threadPitchCalculatorConfig } from "@/tools/thread-pitch-calculator/config";

export const metadata: Metadata = {
  title: threadPitchCalculatorConfig.seo.title,
  description: threadPitchCalculatorConfig.seo.description,
  keywords: threadPitchCalculatorConfig.seo.keywords,
  openGraph: {
    title: threadPitchCalculatorConfig.seo.og.title,
    description: threadPitchCalculatorConfig.seo.og.description,
    type: "website",
    url: threadPitchCalculatorConfig.seo.og.url,
  },
  alternates: {
    canonical: threadPitchCalculatorConfig.seo.og.url,
  },
};

export default function ThreadPitchCalculatorPage() {
  return (
    <ToolLayout
      title={threadPitchCalculatorConfig.name}
      description={threadPitchCalculatorConfig.description}
      icon={threadPitchCalculatorConfig.icon}
      category={{ slug: "mechanical", name: "Mechanical Engineering" }}
    >
      <ThreadPitchCalculatorUI />
    </ToolLayout>
  );
}
