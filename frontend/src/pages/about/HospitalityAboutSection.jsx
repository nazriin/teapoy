import React from 'react';

const HospitalityAboutSection = () => {
    return (
        <section className="bg-white py-16 px-4 md:px-8 lg:px-16">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left side - Image */}
                    <div className="relative">
                        <div className="rounded-2xl overflow-hidden shadow-2xl transform transition-transform duration-300 hover:scale-105 cursor-pointer">
                            <img
                                src="https://wellingtons-hotel.myshopify.com/cdn/shop/files/about-image.png?v=1742023307"
                                alt="Luxury hotel lobby with modern design"
                                // className="w-full h-64 md:h-80 lg:h-96 object-cover"
                                className="w-full h-80 md:h-96 lg:h-[500px] object-cover"
                            />
                        </div>
                    </div>

                    {/* Right side - Content */}
                    <div className="space-y-8">
                        {/* Section header */}
                        <div className="space-y-4">
                            <div className="flex items-center space-x-3">
                                <div className="w-12 h-px bg-amber-600"></div>
                                <span className="text-amber-600 font-medium text-sm tracking-wider uppercase">
                  About Us
                </span>
                            </div>

                            <h2 className="text-4xl md:text-5xl font-light text-gray-900">
                                Our Story of{' '}
                                <span className="text-amber-600 italic">Hospitality</span>
                            </h2>
                        </div>

                        {/* Description paragraphs */}
                        <div className="space-y-6 text-gray-600 leading-relaxed">
                            <p>
                                From the moment you step into our hotel, you are welcomed into a world of elegance,
                                comfort, and personalized service. Our journey began with a vision to create a space where
                                luxury meets warmth, offering guests an unforgettable experience. Every detail, from our
                                thoughtfully designed rooms to our exceptional amenities, reflects our commitment to
                                excellence.
                            </p>

                            <p>
                                At the heart of our hospitality is a passion for making every stay seamless and memorable.
                                Whether you are here for business or leisure, our dedicated team ensures that your
                                experience is nothing short of extraordinary. With world-class services, fine dining, and a
                                relaxing ambiance, we redefine what it means to feel at home away from home.
                            </p>
                        </div>

                        {/* CEO signature section */}
                        <div className="border-t border-gray-200 pt-8">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                                <div className="flex items-center space-x-4">
                                    <img
                                        src="https://wellingtons-hotel.myshopify.com/cdn/shop/files/about-img.png?v=1742025658"
                                        alt="Ethan Rodriguez CEO"
                                        className="w-16 h-16 rounded-full object-cover"
                                        // Replace with actual CEO photo URL
                                    />
                                    <div>
                                        <h4 className="font-semibold text-gray-900">Ethan Rodriguez</h4>
                                        <p className="text-amber-600 text-sm">CEO • Owner</p>
                                    </div>
                                </div>

                                <div className="text-2xl md:text-3xl text-gray-400 font-light italic">
                                    Ethan Rodriguez
                                </div>
                            </div>
                        </div>

                        {/* CTA Button */}
                        <div className="pt-4">
                            <button className="border-2 border-gray-900 text-gray-900 px-8 py-3 rounded-full font-medium hover:bg-gray-900 hover:text-white transition-colors duration-300">
                                Shop Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HospitalityAboutSection;