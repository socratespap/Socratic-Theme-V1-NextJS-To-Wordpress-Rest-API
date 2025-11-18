"use client";

import { useCartStore } from "@/store/cart";
import { createOrder } from "@/lib/api";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
    const { items, total, clearCart } = useCartStore();
    const router = useRouter();
    const [isMounted, setIsMounted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    if (items.length === 0) {
        router.push("/cart");
        return null;
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        const formData = new FormData(e.currentTarget);
        const orderData = {
            customer_name: formData.get("name") as string,
            customer_email: formData.get("email") as string,
            customer_address: formData.get("address") as string,
            total_amount: total(),
            items: items.map((item) => ({
                product_id: item.id,
                quantity: item.quantity,
            })),
        };

        try {
            const res = await createOrder(orderData);
            if (res.success || res.order_id) {
                clearCart();
                router.push(`/thank-you?orderId=${res.order_id}`);
            } else {
                setError("Failed to create order. Please try again.");
            }
        } catch (err) {
            console.error(err);
            // For demo purposes, if API fails, we might want to simulate success
            // But let's show error for now unless we want to mock it.
            // Mock success for demo:
            // clearCart();
            // router.push("/thank-you?orderId=MOCK-123");
            setError("Failed to connect to server. Is WordPress running?");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container py-16">
            <h1 className="mb-8 text-3xl font-bold tracking-tight">Checkout</h1>
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
                <div className="lg:col-span-7">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Full Name
                            </label>
                            <div className="mt-1">
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    required
                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm p-2 border"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <div className="mt-1">
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    required
                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm p-2 border"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                                Shipping Address
                            </label>
                            <div className="mt-1">
                                <textarea
                                    name="address"
                                    id="address"
                                    rows={4}
                                    required
                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm p-2 border"
                                />
                            </div>
                        </div>

                        {error && <div className="text-red-600 text-sm">{error}</div>}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="flex w-full items-center justify-center rounded-md border border-transparent bg-black px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-black/90 disabled:opacity-50"
                        >
                            {isLoading ? "Processing..." : `Pay $${total().toFixed(2)}`}
                        </button>
                    </form>
                </div>

                <div className="lg:col-span-5">
                    <div className="rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:p-8">
                        <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
                        <ul className="mt-6 divide-y border-t border-gray-200">
                            {items.map((item) => (
                                <li key={item.id} className="flex py-4">
                                    <div className="flex-1">
                                        <h3 className="text-sm font-medium">{item.name}</h3>
                                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                    </div>
                                    <p className="text-sm font-medium">${(parseFloat(item.price) * item.quantity).toFixed(2)}</p>
                                </li>
                            ))}
                        </ul>
                        <div className="mt-6 border-t border-gray-200 pt-4 flex justify-between">
                            <div className="text-base font-medium text-gray-900">Total</div>
                            <div className="text-base font-medium text-gray-900">${total().toFixed(2)}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
