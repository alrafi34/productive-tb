"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import { tools, categories } from "@/config/tools";
import ToolCard from "@/components/ToolCard";

export default function ToolsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTools = tools.filter(tool => {
    const matchesCategory = selectedCategory === "all" || tool.category === selectedCategory;
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 to-primary/5 py-16 px-6">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
              All Tools
            </h1>
            <p className="text-gray-600 text-lg mb-8">Browse {tools.length}+ free tools — no sign-up required.</p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search tools..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-5 py-4 pr-12 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                />
                <svg className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`px-5 py-2.5 rounded-lg font-medium text-sm transition-all ${
                  selectedCategory === "all"
                    ? "bg-primary text-white shadow-md"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                }`}
                style={{ fontFamily: "var(--font-heading)" }}
              >
                All Tools
              </button>
              {categories.map(cat => (
                <button
                  key={cat.slug}
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={`px-5 py-2.5 rounded-lg font-medium text-sm transition-all flex items-center gap-2 ${
                    selectedCategory === cat.slug
                      ? "bg-primary text-white shadow-md"
                      : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                  }`}
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  <span>{cat.icon}</span>
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Tools Grid */}
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            {filteredTools.length > 0 ? (
              <>
                <p className="text-gray-500 text-sm mb-6">
                  Showing {filteredTools.length} {filteredTools.length === 1 ? "tool" : "tools"}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredTools.map(tool => (
                    <ToolCard key={tool.slug} tool={tool} />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                  No tools found
                </h3>
                <p className="text-gray-500 mb-6">Try adjusting your search or filter</p>
                <button
                  onClick={() => { setSearchQuery(""); setSelectedCategory("all"); }}
                  className="bg-primary hover:bg-primary-hover text-white px-6 py-2.5 rounded-lg font-semibold transition-colors"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
