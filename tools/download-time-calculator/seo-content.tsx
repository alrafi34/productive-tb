import ToolFaq from "@/components/ToolFaq";
import { downloadTimeCalculatorConfig } from "./config";

export default function DownloadTimeCalculatorSEO() {
  // Same questions as the FAQPage schema
  const { faq } = downloadTimeCalculatorConfig.seo;
  return (
    <ToolFaq items={faq} />
  );
}
