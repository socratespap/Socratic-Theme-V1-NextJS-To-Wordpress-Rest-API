import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts, getSettings, getCategories } from "@/lib/api";
import { ProductCard } from "@/components/ProductCard";
import { Product } from "@/types";

export default function Home() {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [heroImage, setHeroImage] = useState("https://images.unsplash.com/photo-1573408301185-a1d31e667545?q=80&w=2531&auto=format&fit=crop");
    const [heroHeading, setHeroHeading] = useState("Timeless Elegance");
    const [heroDescription, setHeroDescription] = useState("Handcrafted jewelry designed to elevate your everyday style.");
    const [categoriesStyle, setCategoriesStyle] = useState<"circled" | "squared">("circled");

    useEffect(() => {
        async function fetchData() {
            try {
                const settings = await getSettings();
                if (settings.hero_image) setHeroImage(settings.hero_image);
                if (settings.hero_heading) setHeroHeading(settings.hero_heading);
                if (settings.hero_description) setHeroDescription(settings.hero_description);
                if (settings.categories_style) setCategoriesStyle(settings.categories_style);
            } catch (error) {
                console.error("Failed to fetch settings:", error);
            }

            try {
                const data = await getProducts();
                setProducts(data);
            } catch (error) {
                console.error("Failed to fetch products:", error);
            }

            try {
                const categoriesData = await getCategories();
                setCategories(categoriesData);
            } catch (error) {
                console.error("Failed to fetch categories:", error);
            }
        }

        fetchData();
    }, []);

    return (
        <div className="flex flex-col gap-16 pb-16">
            {/* Hero Section */}
            <section className="relative h-[80vh] w-full overflow-hidden bg-gray-900 text-white">
                <div className="absolute inset-0 bg-black/40 z-10" />
                <img
                    src={heroImage}
                    alt="Jewelry Hero"
                    className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="relative z-20 container flex h-full flex-col items-center justify-center text-center">
                    <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                        {heroHeading}
                    </h1>
                    <p className="mt-4 max-w-[600px] text-lg text-gray-200 md:text-xl">
                        {heroDescription}
                    </p>
                    <Link
                        to="/shop"
                        className="mt-8 rounded-full bg-white px-8 py-3 text-sm font-medium text-black transition-colors hover:bg-gray-200"
                    >
                        Shop Collection
                    </Link>
                </div>
            </section>

            {/* Categories Section */}
            {categories.length > 0 && (
                <section className="container">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold tracking-tight">Shop By Category</h2>
                        <Link to="/collections" className="text-sm font-medium hover:underline">
                            View all
                        </Link>
                    </div>
                    <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                        {categories.slice(0, 6).map((category: any) => (
                            <Link
                                key={category.id}
                                to={`/collections/${category.slug}`}
                                className="group flex flex-col items-center text-center"
                            >
                                <div
                                    className={`relative w-full aspect-square overflow-hidden bg-gray-100 transition-all duration-300 group-hover:shadow-xl ${categoriesStyle === "circled" ? "rounded-full" : "rounded-lg"
                                        }`}
                                >
                                    <img
                                        src={category.image || `https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800&auto=format&fit=crop`}
                                        alt={category.name}
                                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </div>
                                <h3 className="mt-3 text-sm font-medium transition-colors group-hover:text-gray-600">
                                    {category.name}
                                </h3>
                                {category.count !== undefined && (
                                    <p className="mt-1 text-xs text-gray-500">
                                        {category.count} {category.count === 1 ? 'item' : 'items'}
                                    </p>
                                )}
                            </Link>
                        ))}
                    </div>
                </section>
            )}

            {/* Featured Products */}
            <section className="container">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold tracking-tight">Featured Products</h2>
                    <Link to="/shop" className="text-sm font-medium hover:underline">
                        View all
                    </Link>
                </div>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {products.slice(0, 4).map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </section>

            {/* Collections */}
            <section className="container">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="relative aspect-[16/9] overflow-hidden rounded-lg group">
                        <img
                            src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=2070&auto=format&fit=crop"
                            alt="New Arrivals"
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                            <h3 className="text-2xl font-bold text-white">New Arrivals</h3>
                        </div>
                        <Link to="/collections/new" className="absolute inset-0" />
                    </div>
                    <div className="relative aspect-[16/9] overflow-hidden rounded-lg group">
                        <img
                            src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=2070&auto=format&fit=crop"
                            alt="Bestsellers"
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                            <h3 className="text-2xl font-bold text-white">Bestsellers</h3>
                        </div>
                        <Link to="/collections/bestsellers" className="absolute inset-0" />
                    </div>
                </div>
            </section>
        </div>
    );
}
