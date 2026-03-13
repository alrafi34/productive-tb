import Link from "next/link";
import type { Tool } from "@/config/tools";

export default function ToolCard({ tool }: { tool: Tool }) {
  const href = `/tools/${tool.category}/${tool.slug}`;
  return (
    <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-6 flex flex-col gap-2.5 hover:-translate-y-1 hover:shadow-md transition-all duration-200">
      <span className="text-3xl leading-none">{tool.icon}</span>
      <h3 className="text-base font-semibold text-gray-900" style={{ fontFamily: "var(--font-heading)" }}>{tool.name}</h3>
      <p className="text-sm text-gray-500 flex-1">{tool.description}</p>
      <Link
        href={href}
        className="mt-1 inline-flex items-center justify-center bg-primary hover:bg-primary-hover text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        Use Now
      </Link>
    </div>
  );
}
