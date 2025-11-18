import { getProductsByCategory } from "@/lib/api";
import { ProductCard } from "@/components/ProductCard";
import { Product } from "@/types";

export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    let products: Product[] = [];

    try {
        products = await getProductsByCategory(slug);
    } catch (error) {
        console.error("Failed to fetch products for category:", error);
    }

    // Capitalize slug for display title
    const title = slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, " ");

    return (
        <div className="container py-16">
            <h1 className="mb-8 text-3xl font-bold tracking-tight">{title}</h1>

            {products.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-500">No products found in this collection.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
}
