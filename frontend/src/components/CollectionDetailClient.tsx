'use client';

import { useEffect, useState } from "react";
import { getProductsByCategory } from "@/lib/api";
import { ProductCard } from "@/components/ProductCard";
import { ProductGridSkeleton } from "@/components/LoadingSkeleton";
import { Product } from "@/types";

interface CollectionDetailClientProps {
    slug: string;
}

export function CollectionDetailClient({ slug }: CollectionDetailClientProps) {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProducts() {
            setLoading(true);
            try {
                const data = await getProductsByCategory(slug);
                setProducts(data);
            } catch (error) {
                console.error("Failed to fetch products for category:", error);
                setProducts([]);
            } finally {
                setLoading(false);
            }
        }

        fetchProducts();
    }, [slug]);

    // Capitalize slug for display title
    const title = slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, " ");

    return (
        <div className="container py-16">
            <h1 className="mb-8 text-3xl font-bold tracking-tight">{title}</h1>

            {loading ? (
                <ProductGridSkeleton />
            ) : products.length === 0 ? (
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
