import Link from "next/link";
import { tools } from "@/config/tools";
import ToolCard from "@/components/ToolCard";

export default function ToolsPage() {
  return (
    <main style={{ minHeight: "100vh", background: "var(--bg)", padding: "80px 0" }}>
      <div className="container">
        <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "2rem", fontWeight: 700, marginBottom: "12px", color: "var(--text-heading)" }}>
          All Tools
        </h1>
        <p style={{ color: "var(--text-body)", marginBottom: "40px" }}>
          Browse all free tools — no sign-up required.
        </p>
        <div className="tools-grid">
          {tools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
        <div style={{ marginTop: "40px" }}>
          <Link href="/" style={{ color: "var(--primary)", fontWeight: 600 }}>← Back to Home</Link>
        </div>
      </div>
    </main>
  );
}
