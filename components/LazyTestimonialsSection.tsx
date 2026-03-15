"use client";

import dynamic from "next/dynamic";
import LazyLoad from "./LazyLoad";

const TestimonialsSection = dynamic(() => import("./TestimonialsSection"), { ssr: false });

export default function LazyTestimonialsSection() {
  return (
    <LazyLoad
      fallback={
        <section className="py-20 px-6 bg-gradient-to-b from-white to-violet-50/30">
          <div className="max-w-6xl mx-auto">
            <div className="h-64 animate-pulse bg-gray-100 rounded-xl" />
          </div>
        </section>
      }
    >
      <TestimonialsSection />
    </LazyLoad>
  );
}
