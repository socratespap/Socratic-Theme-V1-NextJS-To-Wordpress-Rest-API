import { ShieldCheck, Truck, RefreshCw, CreditCard } from "lucide-react";

export function TrustBadges() {
    return (
        <div className="grid grid-cols-2 gap-4 py-6 border-t border-b border-gray-100 my-6">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-full text-blue-600">
                    <ShieldCheck size={20} />
                </div>
                <div>
                    <h4 className="text-sm font-medium text-gray-900">Secure Payment</h4>
                    <p className="text-xs text-gray-500">100% protected</p>
                </div>
            </div>
            <div className="flex items-center gap-3">
                <div className="p-2 bg-green-50 rounded-full text-green-600">
                    <Truck size={20} />
                </div>
                <div>
                    <h4 className="text-sm font-medium text-gray-900">Free Shipping</h4>
                    <p className="text-xs text-gray-500">On orders over $100</p>
                </div>
            </div>
            <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-50 rounded-full text-purple-600">
                    <RefreshCw size={20} />
                </div>
                <div>
                    <h4 className="text-sm font-medium text-gray-900">Easy Returns</h4>
                    <p className="text-xs text-gray-500">30-day return policy</p>
                </div>
            </div>
            <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-50 rounded-full text-orange-600">
                    <CreditCard size={20} />
                </div>
                <div>
                    <h4 className="text-sm font-medium text-gray-900">Flexible Payment</h4>
                    <p className="text-xs text-gray-500">Pay with multiple methods</p>
                </div>
            </div>
        </div>
    );
}
