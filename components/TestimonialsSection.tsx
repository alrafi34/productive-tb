"use client";

import { useEffect, useRef, useState } from "react";
import { testimonials as BASE } from "@/config/testimonials";

// Triple for seamless infinite loop
const ITEMS = [...BASE, ...BASE, ...BASE];
const GAP = 24;

function getVisible() {
  if (typeof window === "undefined") return 3;
  if (window.innerWidth < 640) return 1;
  if (window.innerWidth < 1024) return 2;
  return 3;
}

export default function TestimonialsSection() {
  const [offset, setOffset] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [cardW, setCardW] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  function measure() {
    if (!wrapRef.current) return;
    const visible = getVisible();
    const w = (wrapRef.current.offsetWidth - GAP * (visible - 1)) / visible;
    setCardW(w);
  }

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setAnimate(true);
      setOffset((o) => o + 1);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (offset >= BASE.length) {
      const t = setTimeout(() => {
        setAnimate(false);
        setOffset(0);
      }, 520);
      return () => clearTimeout(t);
    }
  }, [offset]);

  const translateX = offset * (cardW + GAP);

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-white to-violet-50/30">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Loved by Thousands of Users</h2>
        <p className="text-center text-gray-400 text-sm mb-10">Real people, real productivity gains.</p>

        <div className="flex justify-center gap-12 mb-12">
          {[["5M+", "Monthly Users"], ["100+", "Free Tools"], ["4.9★", "Average Rating"]].map(([v, l]) => (
            <div key={l} className="text-center">
              <strong className="block text-3xl font-bold text-primary" style={{ fontFamily: "var(--font-heading)" }}>{v}</strong>
              <span className="text-xs text-gray-400">{l}</span>
            </div>
          ))}
        </div>

        <div className="t-carousel-wrap" ref={wrapRef}>
          <div
            className="t-carousel-track"
            style={{ transform: `translateX(-${translateX}px)`, transition: animate ? "transform 0.5s ease" : "none", gap: GAP }}
          >
            {ITEMS.map((t, i) => (
              <div key={i} className="t-carousel-card bg-white border border-gray-100 rounded-2xl p-6 flex flex-col gap-4 shadow-sm" style={{ height: 200, width: cardW || undefined }}>
                <p className="text-sm text-gray-500 leading-relaxed flex-1 line-clamp-3">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3 border-t border-gray-100 pt-4">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ background: t.color }}>{t.initials}</div>
                  <div>
                    <div className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>{t.name}</div>
                    <div className="text-xs text-gray-400">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
