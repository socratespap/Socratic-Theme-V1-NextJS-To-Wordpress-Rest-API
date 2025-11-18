import Link from "next/link";

export function Footer() {
    return (
        <footer className="border-t bg-background">
            <div className="container py-8 md:py-12">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                    <div>
                        <h3 className="text-lg font-semibold uppercase tracking-wider mb-4">BiancoRosso</h3>
                        <p className="text-sm text-muted-foreground">
                            Handcrafted jewelry for the modern soul. Timeless elegance, sustainable materials.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold mb-4">Shop</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/shop" className="hover:text-foreground">All Products</Link></li>
                            <li><Link href="/collections/new" className="hover:text-foreground">New Arrivals</Link></li>
                            <li><Link href="/collections/bestsellers" className="hover:text-foreground">Bestsellers</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold mb-4">Support</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/contact" className="hover:text-foreground">Contact Us</Link></li>
                            <li><Link href="/shipping" className="hover:text-foreground">Shipping & Returns</Link></li>
                            <li><Link href="/faq" className="hover:text-foreground">FAQ</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold mb-4">Newsletter</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                            Subscribe to receive updates, access to exclusive deals, and more.
                        </p>
                        <form className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 rounded-md border px-3 py-2 text-sm"
                            />
                            <button className="rounded-md bg-black px-4 py-2 text-sm text-white hover:bg-black/90">
                                Join
                            </button>
                        </form>
                    </div>
                </div>
                <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
                    &copy; {new Date().getFullYear()} BiancoRosso Jewelry. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
