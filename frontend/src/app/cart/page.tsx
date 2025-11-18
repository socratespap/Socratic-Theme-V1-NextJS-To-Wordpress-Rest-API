"use client";

import { useCartStore } from "@/store/cart";
import Link from "next/link";
import { Trash2, Minus, Plus } from "lucide-react";
import { useEffect, useState } from "react";

export default function CartPage() {
    const { items, removeItem, updateQuantity, total } = useCartStore();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return <div className="container py-16">Loading cart...</div>;
    }

    if (items.length === 0) {
        return (
            <div className="container flex flex-col items-center justify-center py-24 text-center">
                <h1 className="text-3xl font-bold tracking-tight">Your Cart is Empty</h1>
                <p className="mt-4 text-muted-foreground">
                    Looks like you haven't added anything to your cart yet.
                </p>
                <Link
                    href="/shop"
                    className="mt-8 rounded-full bg-black px-8 py-3 text-sm font-medium text-white hover:bg-black/90"
                >
                    Start Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="container py-16">
            <h1 className="mb-8 text-3xl font-bold tracking-tight">Shopping Cart</h1>
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
                <div className="lg:col-span-8">
                    <ul className="divide-y border-b border-t">
                        {items.map((item) => (
                            <li key={item.id} className="flex py-6 sm:py-10">
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 sm:h-32 sm:w-32">
                                    {item.images[0] ? (
                                        <img
                                            src={item.images[0].src}
                                            alt={item.images[0].alt || item.name}
                                            className="h-full w-full object-cover object-center"
                                        />
                                    ) : (
                                        <div className="flex h-full w-full items-center justify-center bg-gray-100 text-xs text-gray-400">
                                            No Image
                                        </div>
                                    )}
                                </div>

                                <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                                    <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                                        <div>
                                            <div className="flex justify-between">
                                                <h3 className="text-sm">
                                                    <Link href={`/product/${item.slug}`} className="font-medium text-gray-700 hover:text-gray-800">
                                                        {item.name}
                                                    </Link>
                                                </h3>
                                            </div>
                                            <p className="mt-1 text-sm font-medium text-gray-900">${item.price}</p>
                                        </div>

                                        <div className="mt-4 sm:mt-0 sm:pr-9">
                                            <div className="flex items-center border rounded-md w-max">
                                                <button
                                                    onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                                    className="p-2 hover:bg-gray-100"
                                                >
                                                    <Minus className="h-3 w-3" />
                                                </button>
                                                <span className="px-2 text-sm">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="p-2 hover:bg-gray-100"
                                                >
                                                    <Plus className="h-3 w-3" />
                                                </button>
                                            </div>

                                            <div className="absolute right-0 top-0">
                                                <button
                                                    onClick={() => removeItem(item.id)}
                                                    className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500"
                                                >
                                                    <span className="sr-only">Remove</span>
                                                    <Trash2 className="h-5 w-5" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="lg:col-span-4">
                    <div className="rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:p-8">
                        <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
                        <div className="mt-6 space-y-4">
                            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                                <div className="text-base font-medium text-gray-900">Order Total</div>
                                <div className="text-base font-medium text-gray-900">${total().toFixed(2)}</div>
                            </div>
                        </div>

                        <div className="mt-6">
                            <Link
                                href="/checkout"
                                className="flex w-full items-center justify-center rounded-md border border-transparent bg-black px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-black/90"
                            >
                                Checkout
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
