import { useState } from "react";
import { Product } from "@/types";

interface ProductGalleryProps {
    images: Product["images"];
    productName: string;
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
    const [selectedImage, setSelectedImage] = useState(0);

    if (!images || images.length === 0) {
        return (
            <div className="aspect-square overflow-hidden rounded-2xl bg-gray-100 flex items-center justify-center text-gray-400">
                No Image
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="aspect-square overflow-hidden rounded-2xl bg-gray-100 relative group">
                <img
                    src={images[selectedImage].src}
                    alt={images[selectedImage].alt || productName}
                    className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
            </div>
            {images.length > 1 && (
                <div className="grid grid-cols-4 gap-4">
                    {images.map((image, index) => (
                        <button
                            key={index}
                            onClick={() => setSelectedImage(index)}
                            className={`aspect-square overflow-hidden rounded-lg bg-gray-100 border-2 transition-all ${selectedImage === index
                                    ? "border-black ring-2 ring-black/10"
                                    : "border-transparent hover:border-gray-300"
                                }`}
                        >
                            <img
                                src={image.src}
                                alt={image.alt || `${productName} thumbnail ${index + 1}`}
                                className="h-full w-full object-cover object-center"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
