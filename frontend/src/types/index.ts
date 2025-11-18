export interface Product {
    id: number;
    name: string;
    slug: string;
    price: string;
    description: string;
    short_description: string;
    images: { src: string; alt: string }[];
    stock_quantity: number;
    categories: { id: number; name: string; slug: string }[];
    materials: { id: number; name: string; slug: string }[];
    collections: { id: number; name: string; slug: string }[];
}

export interface CartItem extends Product {
    quantity: number;
}

export interface Order {
    id?: number;
    customer_name: string;
    customer_email: string;
    customer_address: string;
    total_amount: number;
    items: { product_id: number; quantity: number }[];
    status?: string;
}
