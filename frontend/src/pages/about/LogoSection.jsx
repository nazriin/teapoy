export default function LogoSection() {
    const logos = [
        { name: 'Mapbox', alt: 'Mapbox logo', url: 'https://wellingtons-hotel.myshopify.com/cdn/shop/files/brand-01.png?v=1742197160&width=2000' },
        { name: 'Abstract', alt: 'Abstract logo', url: 'https://wellingtons-hotel.myshopify.com/cdn/shop/files/brand-02.png?v=1742197160&width=2000' },
        { name: 'Maze', alt: 'Maze logo', url: 'https://wellingtons-hotel.myshopify.com/cdn/shop/files/brand-03.png?v=1742197160&width=2000' },
        { name: 'Mailchimp', alt: 'Mailchimp logo', url: 'https://wellingtons-hotel.myshopify.com/cdn/shop/files/brand-04.png?v=1742197160&width=2000' },
    ];

    return (
        <div className="w-full bg-gray-50 py-12 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 lg:gap-16">
                    {logos.map((logo, index) => (
                        <div
                            key={index}
                            className="flex-shrink-0 transition-transform duration-300 hover:scale-110"
                        >
                            <img
                                src={logo.url}
                                alt={logo.alt}
                                className="h-12 md:h-16 lg:h-20 w-auto opacity-60 hover:opacity-100 transition-opacity duration-300"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}