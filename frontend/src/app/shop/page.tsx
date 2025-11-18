import { getProducts } from "@/lib/api";
import { ProductCard } from "@/components/ProductCard";

export default async function ShopPage() {
    let products = [];
    try {
        products = await getProducts();
    } catch (error) {
        console.error("Failed to fetch products:", error);
        // Fallback mock data
        products = [
            {
                id: 1,
                name: "Gold Necklace",
                slug: "gold-necklace",
                price: "120.00",
                description: "Beautiful gold necklace.",
                short_description: "Gold necklace.",
                images: [{ src: "https://placehold.co/400", alt: "Gold Necklace" }],
                stock_quantity: 10,
                categories: [],
                materials: [],
                collections: [],
            },
            {
                id: 2,
                name: "Silver Ring",
                slug: "silver-ring",
                price: "85.00",
                description: "Sterling silver ring.",
                short_description: "Silver ring.",
                images: [{ src: "https://placehold.co/400", alt: "Silver Ring" }],
                stock_quantity: 15,
                categories: [],
                materials: [],
                collections: [],
            },
            {
                id: 3,
                name: "Diamond Earrings",
                slug: "diamond-earrings",
                price: "250.00",
                description: "Sparkling diamond earrings.",
                short_description: "Diamond earrings.",
                images: [{ src: "https://placehold.co/400", alt: "Diamond Earrings" }],
                stock_quantity: 5,
                categories: [],
                materials: [],
                collections: [],
            },
            {
                id: 4,
                name: "Rose Gold Bracelet",
                slug: "rose-gold-bracelet",
                price: "150.00",
                description: "Elegant rose gold bracelet.",
                short_description: "Rose gold bracelet.",
                images: [{ src: "https://placehold.co/400", alt: "Rose Gold Bracelet" }],
                stock_quantity: 8,
                categories: [],
                materials: [],
                collections: [],
            },
        ];
    }

    return (
        <div className="container py-16">
            <h1 className="text-3xl font-bold tracking-tight mb-8">Shop All Products</h1>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {products.map((product: any) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}
