import { getProducts, getSettings } from "@/lib/api";
import { ProductCard } from "@/components/ProductCard";
import Link from "next/link";

export default async function Home() {
  let products = [];
  let heroImage = "https://images.unsplash.com/photo-1573408301185-a1d31e667545?q=80&w=2531&auto=format&fit=crop";
  let heroAlt = "Jewelry Hero";
  let heroHeading = "Timeless Elegance";
  let heroDescription = "Handcrafted jewelry designed to elevate your everyday style.";

  // Fetch settings for hero section
  try {
    const settings = await getSettings();
    if (settings.hero_image) {
      heroImage = settings.hero_image;
    }
    if (settings.hero_alt) {
      heroAlt = settings.hero_alt;
    }
    if (settings.hero_heading) {
      heroHeading = settings.hero_heading;
    }
    if (settings.hero_description) {
      heroDescription = settings.hero_description;
    }
  } catch (error) {
    console.error("Failed to fetch settings:", error);
  }

  try {
    products = await getProducts();
  } catch (error) {
    console.error("Failed to fetch products:", error);
    // Fallback mock data for demonstration if API is down
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
    <div className="flex flex-col gap-16 pb-16">
      {/* Hero Section */}
      <section className="relative h-[80vh] w-full overflow-hidden bg-gray-900 text-white">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <img
          src={heroImage}
          alt={heroAlt}
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
            href="/shop"
            className="mt-8 rounded-full bg-white px-8 py-3 text-sm font-medium text-black transition-colors hover:bg-gray-200"
          >
            Shop Collection
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold tracking-tight">Featured Products</h2>
          <Link href="/shop" className="text-sm font-medium hover:underline">
            View all
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.slice(0, 4).map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Collections / Categories Teaser */}
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
            <Link href="/collections/new" className="absolute inset-0" />
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
            <Link href="/collections/bestsellers" className="absolute inset-0" />
          </div>
        </div>
      </section>
    </div>
  );
}
