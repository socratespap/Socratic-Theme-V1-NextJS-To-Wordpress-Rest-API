import { useEffect, useState } from "react";
import { getProducts } from "@/lib/api";
import { ProductCard } from "@/components/ProductCard";
import { ProductGridSkeleton } from "@/components/LoadingSkeleton";
import { Product } from "@/types";

export default function Shop() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProducts() {
            setLoading(true);
            try {
                const data = await getProducts();
                setProducts(data);
            } catch (error) {
                console.error("Failed to fetch products:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchProducts();
    }, []);

    return (
        <div className="container py-16">
            <h1 className="text-3xl font-bold tracking-tight mb-8">Shop All Products</h1>
            {loading ? (
                <ProductGridSkeleton />
            ) : products.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-500">No products available at the moment.</p>
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
