"use client";

import { useEffect, useRef, useState } from "react";

const BASE = [
  { quote: "Productive Toolbox saves me 30 minutes every day. The word counter is my go-to tool.", name: "Sarah M.", role: "Content Writer", initials: "SM", color: "#4f46e5" },
  { quote: "I use the QR generator and image compressor for every client project. Fast and free!", name: "James K.", role: "Freelance Designer", initials: "JK", color: "#0891b2" },
  { quote: "Finally a toolbox without ads. Clean UI, instant results. Highly recommended.", name: "Priya R.", role: "Marketing Manager", initials: "PR", color: "#059669" },
  { quote: "The case converter alone saves me so much time when formatting documents.", name: "Alex T.", role: "Technical Writer", initials: "AT", color: "#d97706" },
  { quote: "Color picker and reading time tools are perfect for my design workflow.", name: "Maya L.", role: "UI Designer", initials: "ML", color: "#7c3aed" },
  { quote: "Image resizer works flawlessly. No quality loss and super fast.", name: "Tom B.", role: "Photographer", initials: "TB", color: "#dc2626" },
  { quote: "QR code generator is the best I've used. Simple and reliable.", name: "Nina S.", role: "Event Planner", initials: "NS", color: "#0d9488" },
  { quote: "Percentage calculator is a lifesaver for my daily finance tasks.", name: "Omar F.", role: "Accountant", initials: "OF", color: "#b45309" },
  { quote: "I recommend Productive Toolbox to every student in my class.", name: "Dr. Chen", role: "Professor", initials: "DC", color: "#1d4ed8" },
  { quote: "Word counter with reading time estimate is exactly what bloggers need.", name: "Lisa W.", role: "Blogger", initials: "LW", color: "#be185d" },
  { quote: "No sign-up, no paywall. Just tools that work. Love it.", name: "Raj P.", role: "Startup Founder", initials: "RP", color: "#065f46" },
  { quote: "The image compressor reduced my site load time by 40%.", name: "Ethan G.", role: "Web Developer", initials: "EG", color: "#4f46e5" },
  { quote: "Super clean interface. I use it daily for content creation.", name: "Zoe H.", role: "Content Creator", initials: "ZH", color: "#0891b2" },
  { quote: "Best free toolbox on the internet. Period.", name: "Carlos M.", role: "Digital Marketer", initials: "CM", color: "#059669" },
  { quote: "The reading time calculator helps me plan my articles perfectly.", name: "Aisha N.", role: "Journalist", initials: "AN", color: "#d97706" },
  { quote: "I switched from paid tools to this. Zero regrets.", name: "Ben O.", role: "Copywriter", initials: "BO", color: "#7c3aed" },
  { quote: "Fast, reliable, and always available. My team uses it every day.", name: "Hana K.", role: "Project Manager", initials: "HK", color: "#dc2626" },
  { quote: "The color picker exports in every format I need.", name: "Ivan D.", role: "Brand Designer", initials: "ID", color: "#0d9488" },
  { quote: "Case converter handles all edge cases perfectly.", name: "Julia R.", role: "Editor", initials: "JR", color: "#b45309" },
  { quote: "QR generator with custom text is incredibly useful for my shop.", name: "Kevin L.", role: "Small Business Owner", initials: "KL", color: "#1d4ed8" },
  { quote: "I use the word counter for every essay I write.", name: "Laura B.", role: "Student", initials: "LB", color: "#be185d" },
  { quote: "Percentage calculator is intuitive and accurate.", name: "Mike T.", role: "Financial Analyst", initials: "MT", color: "#065f46" },
  { quote: "Image resizer is the fastest I've ever used online.", name: "Nora V.", role: "Social Media Manager", initials: "NV", color: "#4f46e5" },
  { quote: "No bloat, no distractions. Just pure utility.", name: "Oscar W.", role: "Developer", initials: "OW", color: "#0891b2" },
  { quote: "Productive Toolbox is my browser's most visited site.", name: "Paula X.", role: "Researcher", initials: "PX", color: "#059669" },
  { quote: "The tools load instantly even on slow connections.", name: "Quinn Y.", role: "Remote Worker", initials: "QY", color: "#d97706" },
  { quote: "I love that every tool is free with no hidden fees.", name: "Rachel Z.", role: "Freelancer", initials: "RZ", color: "#7c3aed" },
  { quote: "Word counter with character limit is perfect for social media posts.", name: "Sam A.", role: "Social Media Strategist", initials: "SA", color: "#dc2626" },
  { quote: "The image compressor is a must-have for any web project.", name: "Tina B.", role: "Frontend Developer", initials: "TB", color: "#0d9488" },
  { quote: "Reading time tool helps me keep my newsletters concise.", name: "Uma C.", role: "Newsletter Writer", initials: "UC", color: "#b45309" },
  { quote: "QR codes for my restaurant menu — generated in seconds.", name: "Victor D.", role: "Restaurant Owner", initials: "VD", color: "#1d4ed8" },
  { quote: "Case converter saved me hours of manual reformatting.", name: "Wendy E.", role: "Data Analyst", initials: "WE", color: "#be185d" },
  { quote: "Color picker is accurate and the hex export is flawless.", name: "Xander F.", role: "Graphic Designer", initials: "XF", color: "#065f46" },
  { quote: "I use the percentage calculator for every discount calculation.", name: "Yara G.", role: "Retail Manager", initials: "YG", color: "#4f46e5" },
  { quote: "Productive Toolbox replaced 5 different apps for me.", name: "Zack H.", role: "Productivity Enthusiast", initials: "ZH", color: "#0891b2" },
  { quote: "The tools are mobile-friendly and work great on my phone.", name: "Amy I.", role: "Mobile User", initials: "AI", color: "#059669" },
  { quote: "Word counter updates in real time — no lag at all.", name: "Brian J.", role: "Academic Writer", initials: "BJ", color: "#d97706" },
  { quote: "Image compressor quality is better than most paid tools.", name: "Clara K.", role: "Photographer", initials: "CK", color: "#7c3aed" },
  { quote: "I share Productive Toolbox with every new hire at our company.", name: "David L.", role: "Team Lead", initials: "DL", color: "#dc2626" },
  { quote: "The QR generator works perfectly for my event tickets.", name: "Eva M.", role: "Event Coordinator", initials: "EM", color: "#0d9488" },
  { quote: "Reading time calculator is spot on for my podcast scripts.", name: "Frank N.", role: "Podcaster", initials: "FN", color: "#b45309" },
  { quote: "Case converter handles Unicode characters without issues.", name: "Grace O.", role: "Localization Specialist", initials: "GO", color: "#1d4ed8" },
  { quote: "Color picker with palette history is a game changer.", name: "Henry P.", role: "Art Director", initials: "HP", color: "#be185d" },
  { quote: "Percentage calculator is my go-to for tip calculations.", name: "Iris Q.", role: "Server", initials: "IQ", color: "#065f46" },
  { quote: "Image resizer maintains aspect ratio perfectly every time.", name: "Jake R.", role: "E-commerce Seller", initials: "JR", color: "#4f46e5" },
  { quote: "Word counter with sentence count is great for proofreading.", name: "Kate S.", role: "Proofreader", initials: "KS", color: "#0891b2" },
  { quote: "QR generator for my business cards — simple and professional.", name: "Leo T.", role: "Entrepreneur", initials: "LT", color: "#059669" },
  { quote: "No account needed. I can just open and use it instantly.", name: "Mia U.", role: "Casual User", initials: "MU", color: "#d97706" },
  { quote: "The tools are consistently updated and always reliable.", name: "Noah V.", role: "Power User", initials: "NV", color: "#7c3aed" },
  { quote: "Productive Toolbox is the Swiss Army knife of web tools.", name: "Olivia W.", role: "Digital Nomad", initials: "OW", color: "#dc2626" },
];

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
