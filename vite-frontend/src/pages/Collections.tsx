import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCollections } from "@/lib/api";
import { CategoryGridSkeleton } from "@/components/LoadingSkeleton";

export default function Collections() {
    const [collections, setCollections] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchCollections() {
            setLoading(true);
            try {
                const data = await getCollections();
                setCollections(data);
            } catch (error) {
                console.error("Failed to fetch collections:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchCollections();
    }, []);

    return (
        <div className="container py-16">
            <h1 className="mb-8 text-3xl font-bold tracking-tight">Collections</h1>
            {loading ? (
                <CategoryGridSkeleton />
            ) : collections.length === 0 ? (
                <p>No collections found.</p>
            ) : (
                <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
                    {collections.map((collection: any) => (
                        <Link
                            key={collection.id}
                            to={`/collections/${collection.slug}`}
                            className="group relative overflow-hidden rounded-lg bg-gray-100"
                        >
                            <div className="aspect-square">
                                <img
                                    src={collection.image || `https://source.unsplash.com/random/800x800/?jewelry,${collection.slug}`}
                                    alt={collection.name}
                                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/40 transition-opacity group-hover:bg-black/50" />
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                    <h2 className="text-xl font-bold text-white">{collection.name}</h2>
                                    {collection.count !== undefined && (
                                        <p className="mt-2 text-sm text-gray-200">{collection.count} Products</p>
                                    )}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
