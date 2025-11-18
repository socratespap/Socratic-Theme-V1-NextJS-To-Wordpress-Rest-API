"use client";

import { useState } from "react";

export default function TrackOrderPage() {
    const [orderId, setOrderId] = useState("");
    const [status, setStatus] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleTrack = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setStatus(null);

        // Simulate API call
        // In real app: const res = await fetch(`/api/orders/${orderId}`);
        setTimeout(() => {
            setLoading(false);
            setStatus("Processing"); // Mock status
        }, 1000);
    };

    return (
        <div className="container max-w-md py-16">
            <h1 className="mb-8 text-3xl font-bold tracking-tight text-center">Track Your Order</h1>
            <form onSubmit={handleTrack} className="space-y-4">
                <div>
                    <label htmlFor="orderId" className="block text-sm font-medium text-gray-700">
                        Order ID
                    </label>
                    <input
                        type="text"
                        id="orderId"
                        value={orderId}
                        onChange={(e) => setOrderId(e.target.value)}
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm p-2 border"
                        placeholder="Enter your Order ID"
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-black px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-black/90 disabled:opacity-50"
                >
                    {loading ? "Tracking..." : "Track"}
                </button>
            </form>

            {status && (
                <div className="mt-8 rounded-md bg-gray-50 p-4 text-center">
                    <p className="text-sm text-gray-500">Order Status:</p>
                    <p className="text-lg font-medium text-gray-900">{status}</p>
                </div>
            )}
        </div>
    );
}
