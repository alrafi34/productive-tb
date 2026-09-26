"use client";

import UnitConverter, { formatNumber } from "@/components/UnitConverter";
import ToolSEOContent from "./seo-content";
import RelatedTools from "@/components/RelatedTools";
import RelatedStrip from "@/components/RelatedStrip";

export default function KgToPoundConverterUI() {
  return (
    <div className="max-w-4xl mx-auto">
      <UnitConverter
        from={{ symbol: "kg", name: "Kilograms" }}
        to={{ symbol: "lb", name: "Pounds" }}
        factor={1 / 0.45359237}
        factorLabel="2.20462"
        initial={70}
        quickValues={[1, 5, 10, 50, 70, 100]}
        chart={[1, 2, 3, 4, 5, 10, 15, 20, 25, 30, 40, 50, 60, 70, 80, 90, 100, 150]}
        decimals={2}
      extra={(kg) => {
        const lb = kg / 0.45359237;
        const stone = Math.floor(lb / 14);
        return <p>In stones and pounds: <strong>{stone} st {formatNumber(lb - stone * 14, 1)} lb</strong></p>;
      }}
      />
      <RelatedStrip />
      <ToolSEOContent />
      <div className="mt-12">
        <RelatedTools />
      </div>
    </div>
  );
}
