import ToolFaq from "@/components/ToolFaq";
import { datasetSplitCalculatorConfig } from "./config";

export default function DatasetSplitCalculatorSEO() {
  // Same questions as the FAQPage schema
  const { faq } = datasetSplitCalculatorConfig.seo;
  return (
    <ToolFaq items={faq} />
  );
}
