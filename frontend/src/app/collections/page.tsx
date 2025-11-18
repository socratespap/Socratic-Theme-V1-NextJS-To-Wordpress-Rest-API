import Link from "next/link";
import { getCollections } from "@/lib/api";

export default async function CollectionsPage() {
    let collections = [];
    try {
        collections = await getCollections();
    } catch (error) {
        console.error("Failed to fetch collections:", error);
    }

    return (
        <div className="container py-16">
            <h1 className="mb-8 text-3xl font-bold tracking-tight">Collections</h1>
            {collections.length === 0 ? (
                <p>No collections found.</p>
            ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {collections.map((collection: any) => (
                        <Link
                            key={collection.id}
                            href={`/collections/${collection.slug}`}
                            className="group relative overflow-hidden rounded-lg bg-gray-100"
                        >
                            <div className="aspect-[4/3]">
                                {/* Use fetched image or fallback to placeholder */}
                                <img
                                    src={collection.image || `https://source.unsplash.com/random/800x600/?jewelry,${collection.slug}`}
                                    alt={collection.name}
                                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/40 transition-opacity group-hover:bg-black/50" />
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                    <h2 className="text-2xl font-bold text-white">{collection.name}</h2>
                                    <p className="mt-2 text-sm text-gray-200">{collection.count} Products</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
