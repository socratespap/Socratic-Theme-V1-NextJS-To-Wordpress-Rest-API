"use client";

import Link from "next/link";
import { ShoppingBag, Menu, Search } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export function Header() {
    const items = useCartStore((state) => state.items);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const itemCount = isMounted ? items.reduce((acc, item) => acc + item.quantity, 0) : 0;

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between">
                <div className="flex items-center gap-6 md:gap-10">
                    <Link href="/" className="flex items-center space-x-2">
                        <span className="text-xl font-bold uppercase tracking-widest">BiancoRosso</span>
                    </Link>
                    <nav className="hidden md:flex gap-6">
                        <Link href="/shop" className="text-sm font-medium transition-colors hover:text-primary">
                            Shop
                        </Link>
                        <Link href="/collections" className="text-sm font-medium transition-colors hover:text-primary">
                            Collections
                        </Link>
                        <Link href="/about" className="text-sm font-medium transition-colors hover:text-primary">
                            About
                        </Link>
                        <Link href="/contact" className="text-sm font-medium transition-colors hover:text-primary">
                            Contact
                        </Link>
                    </nav>
                </div>
                <div className="flex items-center gap-4">
                    <button className="p-2 hover:bg-accent rounded-full">
                        <Search className="h-5 w-5" />
                        <span className="sr-only">Search</span>
                    </button>
                    <Link href="/cart" className="relative p-2 hover:bg-accent rounded-full">
                        <ShoppingBag className="h-5 w-5" />
                        {itemCount > 0 && (
                            <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[10px] text-white">
                                {itemCount}
                            </span>
                        )}
                        <span className="sr-only">Cart</span>
                    </Link>
                    <button className="md:hidden p-2 hover:bg-accent rounded-full">
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Menu</span>
                    </button>
                </div>
            </div>
        </header>
    );
}
