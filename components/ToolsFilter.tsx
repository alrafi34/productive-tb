"use client";

import { useState } from "react";
import ToolCard from "@/components/ToolCard";
import { tools, categories } from "@/config/tools";

export default function ToolsFilter() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTools = tools.filter(tool => {
    const matchesCategory = selectedCategory === "all" || tool.category === selectedCategory;
    const matchesSearch = searchQuery === "" || 
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      {/* Search Bar */}
      <div className="max-w-2xl mx-auto mb-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Search tools by name or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-5 py-4 pr-12 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-gray-800 placeholder:text-gray-400"
          />
          <svg 
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
        </div>
      </div>

      {/* Categories Filter */}
      <div className="flex flex-wrap gap-3 justify-center mb-8">
        <button
          onClick={() => setSelectedCategory("all")}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
            selectedCategory === "all" 
              ? "bg-primary text-white" 
              : "bg-white border border-gray-200 text-gray-700 hover:border-primary hover:text-primary"
          }`}
        >
          All
        </button>
        {categories.map(cat => (
          <button
            key={cat.slug}
            onClick={() => setSelectedCategory(cat.slug)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
              selectedCategory === cat.slug
                ? "bg-primary text-white"
                : "bg-white border border-gray-200 text-gray-700 hover:border-primary hover:text-primary"
            }`}
          >
            {cat.icon} {cat.name}
          </button>
        ))}
      </div>

      {/* Results Count */}
      <p className="text-sm text-gray-500 mb-6">
        Showing {filteredTools.length} {filteredTools.length === 1 ? "tool" : "tools"}
        {searchQuery && ` for "${searchQuery}"`}
      </p>

      {/* Tools Grid */}
      {filteredTools.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map(tool => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
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
            Clear All Filters
          </button>
        </div>
      )}
    </>
  );
}
