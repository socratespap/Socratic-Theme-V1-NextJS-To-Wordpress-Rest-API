import { Product, Order } from "@/types";

const API_URL = import.meta.env.VITE_WORDPRESS_API_URL || "https://biancorosso.socratisp.com/wp-json";

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
    const res = await fetch(`${API_URL}/wp/v2/product_cat`);
    if (!res.ok) {
        const resBackup = await fetch(`${API_URL}/wp/v2/collection`);
        if (!resBackup.ok) throw new Error("Failed to fetch collections");
        return resBackup.json();
    }
    return res.json();
}

export const getCategories = getCollections;

export async function getProductsByCategory(slug: string): Promise<Product[]> {
    const categories = await getCollections();
    const category = categories.find((c: any) => c.slug === slug);

    if (!category) return [];

    const res = await fetch(`${API_URL}/wp/v2/product?product_cat=${category.id}&_embed`);
    if (!res.ok) {
        const allRes = await fetch(`${API_URL}/wp/v2/product?_embed`);
        if (!allRes.ok) throw new Error("Failed to fetch products");
        const allData = await allRes.json();
        return allData
            .map((item: any) => transformProduct(item))
            .filter((p: Product) => p.categories?.some((c: any) => c.slug === slug));
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
        categories: [],
        materials: [],
        collections: [],
    };
}
