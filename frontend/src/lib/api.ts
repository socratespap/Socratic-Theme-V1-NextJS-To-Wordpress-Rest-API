import { Product, Order } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || "http://localhost/wp-json";

export async function getProducts(): Promise<Product[]> {
    const res = await fetch(`${API_URL}/wp/v2/product?_embed`);
    if (!res.ok) throw new Error("Failed to fetch products");
    const data = await res.json();

    return data.map((item: any) => transformProduct(item));
}

export async function getProduct(slug: string): Promise<Product | null> {
    const res = await fetch(`${API_URL}/wp/v2/product?slug=${slug}&_embed`);
    if (!res.ok) throw new Error("Failed to fetch product");
    const data = await res.json();

    if (data.length === 0) return null;
    return transformProduct(data[0]);
}

export async function getCollections() {
    // Try fetching standard WooCommerce categories first, then fallback or check for custom ones if needed
    // The user's site has 'product_cat' exposed
    const res = await fetch(`${API_URL}/wp/v2/product_cat`);
    if (!res.ok) {
        // Fallback to 'collection' if product_cat fails (though API check showed it exists)
        const resBackup = await fetch(`${API_URL}/wp/v2/collection`);
        if (!resBackup.ok) throw new Error("Failed to fetch collections");
        return resBackup.json();
    }
    return res.json();
}

export async function getProductsByCategory(slug: string): Promise<Product[]> {
    // First get the category ID from the slug
    const categories = await getCollections();
    const category = categories.find((c: any) => c.slug === slug);

    if (!category) return [];

    // Then fetch products with that category ID
    // Note: 'product_cat' is the taxonomy, but the parameter for filtering products is usually 'product_cat' or just 'categories' depending on setup
    // For standard WP REST API with 'product' post type, it might be 'product_cat' if registered correctly, or we might need to filter client side if not exposed
    // Let's try standard filter first. If using WooCommerce CPT, it's usually 'product_cat'.
    // However, for standard 'post' it's 'categories'. For custom CPT, we need to check if 'rest_base' allows filtering.
    // Let's assume we can filter by the taxonomy ID.

    const res = await fetch(`${API_URL}/wp/v2/product?product_cat=${category.id}&_embed`);
    if (!res.ok) {
        // Fallback: fetch all and filter (less efficient but safer if param not supported)
        const allRes = await fetch(`${API_URL}/wp/v2/product?_embed`);
        if (!allRes.ok) throw new Error("Failed to fetch products");
        const allData = await allRes.json();
        return allData
            .map((item: any) => transformProduct(item))
            .filter((p: Product) => p.categories?.some((c: any) => c.slug === slug)); // We need to map categories in transformProduct for this to work
    }

    const data = await res.json();
    return data.map((item: any) => transformProduct(item));
}

export async function getSettings() {
    const res = await fetch(`${API_URL}/biancorosso/v1/settings`);
    if (!res.ok) throw new Error("Failed to fetch settings");
    return res.json();
}

export async function createOrder(order: Order) {
    const res = await fetch(`${API_URL}/biancorosso/v1/order`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
    });

    if (!res.ok) throw new Error("Failed to create order");
    return res.json();
}

function transformProduct(item: any): Product {
    return {
        id: item.id,
        name: item.title.rendered,
        slug: item.slug,
        price: item.price || "0",
        description: item.content.rendered,
        short_description: item.excerpt.rendered,
        images: item._embedded?.["wp:featuredmedia"]?.map((media: any) => ({
            src: media.source_url,
            alt: media.alt_text,
        })) || [],
        stock_quantity: parseInt(item.stock_quantity) || 0,
        categories: [], // TODO: Map categories
        materials: [], // TODO: Map materials
        collections: [], // TODO: Map collections
    };
}
