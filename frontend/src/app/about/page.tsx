export default function AboutPage() {
    return (
        <div className="container py-16">
            <div className="mx-auto max-w-2xl text-center">
                <h1 className="text-4xl font-bold tracking-tight">About BiancoRosso</h1>
                <p className="mt-6 text-lg text-gray-500">
                    BiancoRosso was born from a passion for timeless elegance and sustainable craftsmanship.
                    We believe that jewelry should be more than just an accessory; it should be a reflection of your unique story.
                </p>
            </div>
            <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
                <div className="aspect-video overflow-hidden rounded-lg bg-gray-100">
                    <img
                        src="https://images.unsplash.com/photo-1531995811006-35cb42e1a022?q=80&w=2070&auto=format&fit=crop"
                        alt="Our Workshop"
                        className="h-full w-full object-cover"
                    />
                </div>
                <div className="flex flex-col justify-center">
                    <h2 className="text-2xl font-bold">Our Craft</h2>
                    <p className="mt-4 text-gray-500">
                        Every piece is handcrafted in our studio using ethically sourced materials.
                        We combine traditional techniques with modern design to create jewelry that stands the test of time.
                    </p>
                </div>
            </div>
        </div>
    );
}
