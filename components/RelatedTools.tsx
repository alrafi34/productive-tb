import Link from 'next/link';
import { getToolBySlug } from '@/lib/tools-registry';

interface RelatedToolsProps {
  currentTool: string;
  tools: string[];
  title?: string;
}

export default function RelatedTools({ currentTool, tools, title = "Related Tools" }: RelatedToolsProps) {
  const relatedTools = tools
    .map(slug => getToolBySlug(slug))
    .filter(tool => tool && tool.slug !== currentTool);

  if (relatedTools.length === 0) return null;

  return (
    <div className="mt-16 pt-12 border-t border-gray-200">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatedTools.map((tool) => (
          <Link
            key={tool.slug}
            href={`/tools/${tool.slug}`}
            className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-[#058554] hover:-translate-y-1"
          >
            <div className="flex items-start gap-4">
              <div className="text-4xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                {tool.icon}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-[#058554] transition-colors">
                  {tool.name}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {tool.description}
                </p>
                <div className="mt-3 inline-flex items-center text-sm font-medium text-[#058554] group-hover:gap-2 transition-all">
                  Try it now
                  <span className="inline-block group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
