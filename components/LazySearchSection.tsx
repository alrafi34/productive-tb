"use client";

import dynamic from "next/dynamic";
import LazyLoad from "./LazyLoad";

const SearchSection = dynamic(() => import("./SearchSection"), { ssr: false });

export default function LazySearchSection() {
  return (
    <LazyLoad
      fallback={
        <section className="bg-gradient-to-br from-primary to-primary-hover py-20 px-6">
          <div className="max-w-6xl mx-auto text-center">
            <div className="h-32 animate-pulse bg-white/10 rounded-xl max-w-xl mx-auto" />
          </div>
        </section>
      }
    >
      <SearchSection />
    </LazyLoad>
  );
}
