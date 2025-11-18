import { getProduct } from "@/lib/api";
import { AddToCartButton } from "@/components/AddToCartButton";
import { notFound } from "next/navigation";

// Separate client component for the button to keep this page server-side
// Actually, I'll just make a client component for the whole details section or use a client component for the button.
// Let's create a client component for the button first.

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    let product = null;
    try {
        product = await getProduct(slug);
    } catch (error) {
        console.error("Failed to fetch product:", error);
    }

    // Mock fallback if API fails or returns null (for demo)
    if (!product) {
        // For demo purposes, return a mock product if slug matches one of our mocks
        if (["gold-necklace", "silver-ring", "diamond-earrings", "rose-gold-bracelet"].includes(slug)) {
            product = {
                id: 1,
                name: "Gold Necklace",
                slug: slug,
                price: "120.00",
                description: "<p>This is a beautiful gold necklace handcrafted with care.</p>",
                short_description: "Gold necklace.",
                images: [{ src: "https://placehold.co/600", alt: "Gold Necklace" }],
                stock_quantity: 10,
                categories: [],
                materials: [],
                collections: [],
            };
            // Adjust details based on slug roughly
            if (slug === "silver-ring") { product.name = "Silver Ring"; product.price = "85.00"; }
        } else {
            // notFound(); // Uncomment this in production
        }
    }

    if (!product) {
        return <div className="container py-16">Product not found</div>;
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
                            {/* Add more details here */}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
