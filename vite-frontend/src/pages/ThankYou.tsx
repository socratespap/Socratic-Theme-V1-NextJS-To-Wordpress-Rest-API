import { Link } from "react-router-dom";

export default function ThankYou() {
    return (
        <div className="container py-16">
            <div className="text-center max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold mb-4">Thank You for Your Order!</h1>
                <p className="text-gray-600 mb-8">Your order has been received and is being processed.</p>
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
