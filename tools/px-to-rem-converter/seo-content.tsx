import ToolFaq from "@/components/ToolFaq";
import { toolConfig } from "./config";

export default function PxToRemSEOContent() {
  // Same questions as the FAQPage schema
  const { faq } = toolConfig.seo;
  return (
    <ToolFaq items={faq} />
  );
}
