import { redirect } from "next/navigation";
import { categories } from "@/config/tools";

export async function generateStaticParams() {
  return categories.map(cat => ({ category: cat.slug }));
}

export default async function OldCategoryRedirect({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  // Redirect permanently to the new canonical category URL
  redirect(`/tools/${category}`);
}
