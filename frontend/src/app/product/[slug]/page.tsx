import { getProducts } from "@/lib/api";
import { ProductDetailClient } from "@/components/ProductDetailClient";

export async function generateStaticParams() {
    try {
        const products = await getProducts();
        return products.map((product) => ({
            slug: product.slug,
        }));
    } catch (error) {
        console.error("Failed to fetch products for static generation:", error);
        return [];
    }
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    return <ProductDetailClient slug={slug} />;
}
