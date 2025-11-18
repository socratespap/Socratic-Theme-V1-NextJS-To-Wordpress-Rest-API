'use client';

export function ProductCardSkeleton() {
    return (
        <div className="animate-pulse">
            <div className="aspect-square overflow-hidden rounded-lg bg-gray-200" />
            <div className="mt-4 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
            </div>
        </div>
    );
}

export function ProductDetailSkeleton() {
    return (
        <div className="container py-16 animate-pulse">
            <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
                <div className="aspect-square overflow-hidden rounded-lg bg-gray-200" />
                <div className="flex flex-col gap-6">
                    <div>
                        <div className="h-8 bg-gray-200 rounded w-3/4 mb-2" />
                        <div className="h-6 bg-gray-200 rounded w-1/4" />
                    </div>
                    <div className="space-y-2">
                        <div className="h-4 bg-gray-200 rounded" />
                        <div className="h-4 bg-gray-200 rounded" />
                        <div className="h-4 bg-gray-200 rounded w-5/6" />
                    </div>
                    <div className="h-12 bg-gray-200 rounded w-1/2" />
                </div>
            </div>
        </div>
    );
}

export function ProductGridSkeleton() {
    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[...Array(8)].map((_, i) => (
                <ProductCardSkeleton key={i} />
            ))}
        </div>
    );
}

export function CategoryCardSkeleton() {
    return (
        <div className="animate-pulse">
            <div className="aspect-square overflow-hidden rounded-lg bg-gray-200" />
            <div className="mt-4">
                <div className="h-5 bg-gray-200 rounded w-3/4 mx-auto" />
            </div>
        </div>
    );
}

export function CategoryGridSkeleton() {
    return (
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
            {[...Array(6)].map((_, i) => (
                <CategoryCardSkeleton key={i} />
            ))}
        </div>
    );
}
