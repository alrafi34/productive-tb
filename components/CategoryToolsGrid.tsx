"use client";

import { useState } from "react";
import Link from "next/link";
import ToolCard from "@/components/ToolCard";
import { tools } from "@/config/tools";
import type { Category } from "@/config/tools";

interface Props {
  category: Category;
}

const ITEMS_PER_PAGE = 20;

export default function CategoryToolsGrid({ category }: Props) {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const categoryTools = tools.filter(t => t.category === category.slug);

  const filtered = search.trim()
    ? categoryTools.filter(
        t =>
          t.name.toLowerCase().includes(search.toLowerCase()) ||
          t.description.toLowerCase().includes(search.toLowerCase())
      )
    : categoryTools;

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedTools = filtered.slice(startIdx, startIdx + ITEMS_PER_PAGE);

  const handleSearch = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  // Show limited page numbers on tablet (max 5 pages)
  const getVisiblePages = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    
    const pages = [];
    const start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, currentPage + 2);
    
    if (start > 1) pages.push(1);
    if (start > 2) pages.push("...");
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    
    if (end < totalPages - 1) pages.push("...");
    if (end < totalPages) pages.push(totalPages);
    
    return pages;
  };

  return (
    <>
      {/* Search bar */}
      <div className="relative max-w-xl mb-8">
        <input
          type="text"
          placeholder={`Search ${category.name.toLowerCase()}...`}
          value={search}
          onChange={e => handleSearch(e.target.value)}
          className="w-full bg-white border border-gray-200 rounded-xl px-5 py-3.5 pr-12 text-sm font-medium text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary shadow-sm transition-all"
        />
        <svg
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
          width="18" height="18" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" strokeWidth="2"
          strokeLinecap="round" strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </div>

      {/* Count */}
      <p className="text-sm text-gray-400 font-medium mb-6">
        Showing <span className="font-bold text-gray-700">{paginatedTools.length}</span> of{" "}
        <span className="font-bold text-gray-700">{filtered.length}</span> tools
        {search && ` matching "${search}"`}
      </p>

      {/* Grid */}
      {filtered.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-8">
            {paginatedTools.map(tool => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-2 mt-10 px-4 flex-wrap">
              {/* Previous Button */}
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="w-full sm:w-auto px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                ← Previous
              </button>

              {/* Page Numbers - Hidden on mobile, visible on tablet+ */}
              <div className="hidden sm:flex items-center gap-1 flex-wrap justify-center">
                {getVisiblePages().map((page, idx) => (
                  <div key={idx}>
                    {page === "..." ? (
                      <span className="px-2 py-2 text-gray-400">...</span>
                    ) : (
                      <button
                        onClick={() => setCurrentPage(page as number)}
                        className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                          currentPage === page
                            ? "bg-primary text-white"
                            : "border border-gray-200 text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        {page}
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Page Indicator - Visible on mobile only */}
              <div className="sm:hidden text-sm font-medium text-gray-600 px-3 py-2 bg-gray-50 rounded-lg">
                Page <span className="font-bold text-gray-900">{currentPage}</span> of <span className="font-bold text-gray-900">{totalPages}</span>
              </div>

              {/* Next Button */}
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="w-full sm:w-auto px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next →
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-20">
          <span className="text-5xl block mb-4">🔍</span>
          <h3 className="text-xl font-bold text-gray-900 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
            No tools found
          </h3>
          <p className="text-gray-400 text-sm mb-6">Try a different search term</p>
          <button
            onClick={() => handleSearch("")}
            className="bg-primary text-white text-sm font-bold px-5 py-2.5 rounded-lg hover:bg-primary-hover transition-colors"
          >
            Clear Search
          </button>
        </div>
      )}
    </>
  );
}
