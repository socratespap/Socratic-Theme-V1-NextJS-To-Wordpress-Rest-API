import Link from "next/link";

export default function ThankYouPage({
    searchParams,
}: {
    searchParams: { orderId: string };
}) {
    return (
        <div className="container flex flex-col items-center justify-center py-24 text-center">
            <h1 className="text-3xl font-bold tracking-tight">Thank You for Your Order!</h1>
            <p className="mt-4 text-muted-foreground">
                Your order #{searchParams.orderId} has been received.
            </p>
            <p className="mt-2 text-muted-foreground">
                We will send you an email confirmation shortly.
            </p>
            <div className="mt-8 flex gap-4">
                <Link
                    href="/shop"
                    className="rounded-full bg-black px-8 py-3 text-sm font-medium text-white hover:bg-black/90"
                >
                    Continue Shopping
                </Link>
                <Link
                    href="/track-order"
                    className="rounded-full border border-gray-300 px-8 py-3 text-sm font-medium text-black hover:bg-gray-50"
                >
                    Track Order
                </Link>
            </div>
        </div>
    );
}
