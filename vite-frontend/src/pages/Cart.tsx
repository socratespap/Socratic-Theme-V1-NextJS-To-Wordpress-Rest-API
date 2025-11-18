import { Link } from "react-router-dom";
import { useCartStore } from "@/store/cart";
import { Trash2, Plus, Minus } from "lucide-react";

export default function Cart() {
    const { items, removeItem, updateQuantity, total, clearCart } = useCartStore();

    if (items.length === 0) {
        return (
            <div className="container py-16">
                <div className="text-center">
                    <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
                    <p className="text-gray-600 mb-8">Add some beautiful jewelry to your cart!</p>
                    <Link
                        to="/shop"
                        className="inline-block rounded-full bg-black px-8 py-3 text-sm font-medium text-white hover:bg-black/90"
                    >
                        Continue Shopping
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container py-16">
            <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

            <div className="grid gap-8 lg:grid-cols-3">
                <div className="lg:col-span-2">
                    <div className="space-y-4">
                        {items.map((item) => (
                            <div key={item.id} className="flex gap-4 border rounded-lg p-4">
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                                    {item.images[0] ? (
                                        <img
                                            src={item.images[0].src}
                                            alt={item.name}
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        <div className="h-full w-full flex items-center justify-center text-gray-400">
                                            No Image
                                        </div>
                                    )}
                                </div>
                                <div className="flex flex-1 flex-col">
                                    <div className="flex justify-between">
                                        <h3 className="font-medium">{item.name}</h3>
                                        <button
                                            onClick={() => removeItem(item.id)}
                                            className="text-gray-400 hover:text-red-500"
                                        >
                                            <Trash2 className="h-5 w-5" />
                                        </button>
                                    </div>
                                    <p className="text-sm text-gray-500 mt-1">${item.price}</p>
                                    <div className="mt-4 flex items-center gap-3">
                                        <button
                                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                            className="rounded-full border p-1 hover:bg-gray-100"
                                        >
                                            <Minus className="h-4 w-4" />
                                        </button>
                                        <span className="w-8 text-center">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            className="rounded-full border p-1 hover:bg-gray-100"
                                        >
                                            <Plus className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="lg:col-span-1">
                    <div className="rounded-lg border p-6 sticky top-20">
                        <h2 className="text-lg font-medium mb-4">Order Summary</h2>
                        <div className="space-y-2 mb-4">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Subtotal</span>
                                <span>${total().toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Shipping</span>
                                <span>Calculated at checkout</span>
                            </div>
                        </div>
                        <div className="border-t pt-4 mb-4">
                            <div className="flex justify-between font-medium text-lg">
                                <span>Total</span>
                                <span>${total().toFixed(2)}</span>
                            </div>
                        </div>
                        <Link
                            to="/checkout"
                            className="w-full block text-center rounded-md bg-black px-6 py-3 text-sm font-medium text-white hover:bg-black/90"
                        >
                            Proceed to Checkout
                        </Link>
                        <button
                            onClick={clearCart}
                            className="w-full mt-3 block text-center rounded-md border px-6 py-3 text-sm font-medium hover:bg-gray-50"
                        >
                            Clear Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
