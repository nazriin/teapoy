import React from 'react';

const AboutUsSection = () => {
    return (
        <section className="relative h-[390px] bg-gradient-to-br from-amber-900 via-amber-800 to-orange-900 overflow-hidden">
            {/* Background Image Container */}
            <div className="absolute inset-0">
                <img
                    src="https://wellingtons-hotel.myshopify.com/cdn/shop/files/breadcrumb.png?v=1742451376"
                    alt="Luxurious interior with warm lighting and wooden panels"
                    className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/10"></div>
            </div>

            {/* Content Container */}
            <div className="relative z-10 flex flex-col justify-center h-full px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto w-full">
                    <div className="text-center mb-8 lg:mb-12">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-wider">
                            About Us
                        </h1>
                    </div>
                </div>
            </div>

            {/* Subtle Pattern Overlay */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div
                    className="w-full h-full"
                    style={{
                        backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                        backgroundSize: '50px 50px'
                    }}
                ></div>
            </div>
        </section>
    );
};

export default AboutUsSection;
