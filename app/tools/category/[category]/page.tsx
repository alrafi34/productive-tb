import { notFound, permanentRedirect } from "next/navigation";
import { categories } from "@/config/tools";

export async function generateStaticParams() {
  return categories.map(cat => ({ category: cat.slug }));
}

/* Old /tools/category/<slug> URLs → the category page at /tools/<slug> */
export default async function OldCategoryRedirect({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  if (!categories.some(c => c.slug === category)) notFound();
  permanentRedirect(`/tools/${category}`);
}
