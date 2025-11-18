import { Link } from "react-router-dom";
import { Product } from "@/types";
import { useCartStore } from "@/store/cart";
import { ShoppingBag } from "lucide-react";

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    const addItem = useCartStore((state) => state.addItem);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        addItem(product);
    };

    return (
        <Link to={`/product/${product.slug}`} className="group block space-y-3">
            <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
                {product.images[0] ? (
                    <img
                        src={product.images[0].src}
                        alt={product.images[0].alt || product.name}
                        className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center text-gray-400">
                        No Image
                    </div>
                )}
                <button
                    onClick={handleAddToCart}
                    className="absolute bottom-4 right-4 rounded-full bg-black p-2 text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100 hover:bg-black/80"
                >
                    <ShoppingBag className="h-5 w-5" />
                    <span className="sr-only">Add to cart</span>
                </button>
            </div>
            <div className="space-y-1">
                <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
                <p className="text-sm text-gray-500">${product.price}</p>
            </div>
        </Link>
    );
}
