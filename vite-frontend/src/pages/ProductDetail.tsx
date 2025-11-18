import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProduct, getProductsByCategory } from "@/lib/api";
import { AddToCartButton } from "@/components/AddToCartButton";
import { ProductDetailSkeleton } from "@/components/LoadingSkeleton";
import { Product } from "@/types";
import { ProductGallery } from "@/components/ProductGallery";
import { TrustBadges } from "@/components/TrustBadges";
import { ProductCard } from "@/components/ProductCard";

export default function ProductDetail() {
    const { slug } = useParams<{ slug: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
    const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function fetchProductData() {
            if (!slug) return;

            setLoading(true);
            setError(false);
            try {
                const data = await getProduct(slug);
                if (data) {
                    setProduct(data);

                    // Add to recently viewed
                    addToRecentlyViewed(data);

                    // Fetch related products if category exists
                    if (data.categories && data.categories.length > 0) {
                        const related = await getProductsByCategory(data.categories[0].slug);
                        setRelatedProducts(related.filter(p => p.id !== data.id).slice(0, 4));
                    }
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

        fetchProductData();
        loadRecentlyViewed();
    }, [slug]);

    const addToRecentlyViewed = (product: Product) => {
        try {
            const stored = localStorage.getItem("recentlyViewed");
            let items: Product[] = stored ? JSON.parse(stored) : [];

            // Remove if already exists to move to top
            items = items.filter(p => p.id !== product.id);

            // Add to beginning
            items.unshift(product);

            // Keep only last 5
            if (items.length > 5) items = items.slice(0, 5);

            localStorage.setItem("recentlyViewed", JSON.stringify(items));
            setRecentlyViewed(items.filter(p => p.id !== product.id)); // Don't show current product in recently viewed
        } catch (e) {
            console.error("Failed to update recently viewed", e);
        }
    };

    const loadRecentlyViewed = () => {
        try {
            const stored = localStorage.getItem("recentlyViewed");
            if (stored) {
                const items: Product[] = JSON.parse(stored);
                setRecentlyViewed(items);
            }
        } catch (e) {
            console.error("Failed to load recently viewed", e);
        }
    };

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

    // Filter out current product from recently viewed for display
    const displayRecentlyViewed = recentlyViewed.filter(p => p.id !== product.id).slice(0, 4);

    return (
        <div className="bg-white">
            <div className="container py-12 md:py-16">
                {/* Breadcrumbs */}
                <nav className="flex mb-8 text-sm text-gray-500">
                    <Link to="/" className="hover:text-gray-900">Home</Link>
                    <span className="mx-2">/</span>
                    <Link to="/shop" className="hover:text-gray-900">Shop</Link>
                    <span className="mx-2">/</span>
                    <span className="text-gray-900 font-medium truncate max-w-[200px]">{product.name}</span>
                </nav>

                <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
                    {/* Product Gallery */}
                    <ProductGallery images={product.images} productName={product.name} />

                    {/* Product Info */}
                    <div className="flex flex-col gap-8">
                        <div>
                            {product.categories && product.categories.length > 0 && (
                                <Link
                                    to={`/collections/${product.categories[0].slug}`}
                                    className="text-sm font-medium text-blue-600 hover:text-blue-800 mb-2 inline-block"
                                >
                                    {product.categories[0].name}
                                </Link>
                            )}
                            <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-4">{product.name}</h1>
                            <div className="flex items-end gap-4">
                                <p className="text-3xl font-medium text-gray-900">${product.price}</p>
                                {product.stock_quantity > 0 ? (
                                    <span className="mb-1 inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                        In Stock
                                    </span>
                                ) : (
                                    <span className="mb-1 inline-flex items-center rounded-full bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20">
                                        Out of Stock
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="prose prose-gray max-w-none text-gray-600" dangerouslySetInnerHTML={{ __html: product.short_description || product.description }} />

                        <div className="pt-4">
                            <AddToCartButton product={product} />
                        </div>

                        <TrustBadges />

                        <div className="border-t border-gray-100 pt-8">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Description</h3>
                            <div className="prose prose-sm max-w-none text-gray-600" dangerouslySetInnerHTML={{ __html: product.description }} />
                        </div>
                    </div>
                </div>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <div className="mt-24 border-t border-gray-100 pt-16">
                        <h2 className="text-2xl font-bold text-gray-900 mb-8">You Might Also Like</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                            {relatedProducts.map((relatedProduct) => (
                                <ProductCard key={relatedProduct.id} product={relatedProduct} />
                            ))}
                        </div>
                    </div>
                )}

                {/* Recently Viewed */}
                {displayRecentlyViewed.length > 0 && (
                    <div className="mt-24 border-t border-gray-100 pt-16">
                        <h2 className="text-2xl font-bold text-gray-900 mb-8">Recently Viewed</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                            {displayRecentlyViewed.map((viewedProduct) => (
                                <ProductCard key={viewedProduct.id} product={viewedProduct} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
