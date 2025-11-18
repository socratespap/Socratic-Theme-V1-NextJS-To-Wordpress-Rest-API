import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProduct } from "@/lib/api";
import { AddToCartButton } from "@/components/AddToCartButton";
import { ProductDetailSkeleton } from "@/components/LoadingSkeleton";
import { Product } from "@/types";

export default function ProductDetail() {
    const { slug } = useParams<{ slug: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function fetchProduct() {
            if (!slug) return;

            setLoading(true);
            setError(false);
            try {
                const data = await getProduct(slug);
                if (data) {
                    setProduct(data);
                } else {
                    setError(true);
                }
            } catch (err) {
                console.error("Failed to fetch product:", err);
                setError(true);
            } finally {
                setLoading(false);
            }
        }

        fetchProduct();
    }, [slug]);

    if (loading) {
        return <ProductDetailSkeleton />;
    }

    if (error || !product) {
        return (
            <div className="container py-16">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Product Not Found</h1>
                    <p className="text-gray-600 mb-8">The product you're looking for doesn't exist or has been removed.</p>
                    <Link to="/shop" className="text-blue-600 hover:text-blue-800 underline">
                        Continue Shopping
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container py-16">
            <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
                <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
                    {product.images[0] ? (
                        <img
                            src={product.images[0].src}
                            alt={product.images[0].alt || product.name}
                            className="h-full w-full object-cover object-center"
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center text-gray-400">
                            No Image
                        </div>
                    )}
                </div>
                <div className="flex flex-col gap-6">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">{product.name}</h1>
                        <p className="mt-2 text-2xl text-gray-900">${product.price}</p>
                    </div>
                    <div className="prose prose-sm text-gray-500" dangerouslySetInnerHTML={{ __html: product.description }} />

                    <AddToCartButton product={product} />

                    <div className="border-t pt-6">
                        <h3 className="text-sm font-medium text-gray-900">Details</h3>
                        <ul className="mt-4 space-y-2 text-sm text-gray-500">
                            <li>Stock: {product.stock_quantity} available</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
