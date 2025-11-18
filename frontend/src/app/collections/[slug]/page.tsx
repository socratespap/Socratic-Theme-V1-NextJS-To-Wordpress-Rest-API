import { getCategories } from "@/lib/api";
import { CollectionDetailClient } from "@/components/CollectionDetailClient";

export async function generateStaticParams() {
    try {
        const categories = await getCategories();
        return categories.map((category: { slug: string }) => ({
            slug: category.slug,
        }));
    } catch (error) {
        console.error("Failed to fetch categories for static generation:", error);
        return [];
    }
}

export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    return <CollectionDetailClient slug={slug} />;
}
