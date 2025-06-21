import React from 'react';
import { Check, Clock } from 'lucide-react';

const FurnitureShowcase = () => {
    return (
        <div className="bg-white text-black dark:bg-gray-900 dark:text-white transition-colors duration-500">
            {/* Header Section */}
            <div className="container mx-auto px-6 py-16">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <div className="space-y-8">
                        <div className="text-orange-500 text-sm font-medium tracking-wide uppercase">
                            HOME DECOR HUB
                        </div>

                        <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
                            Exceptional Furniture's For Indoor & Outdoor
                        </h1>

                        <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                            Ut eleifend mattis ligula, porta finibus urna gravida at. Aenean vehicula sodales arcu non
                            mattis. Integer dapibus ac dui pretium blandit. Class aptent taciti sociosqu ad litora
                            torquent per conubia nostra, per inceptos himenaeos.
                        </p>
                    </div>

                    {/* Right Image */}
                    <div className="space-y-8">
                        <div className="rounded-lg overflow-hidden shadow-2xl">
                            <img
                                src="https://wdt-teapoy.myshopify.com/cdn/shop/files/img-2.jpg?v=1720163393&width=1500"
                                alt="Cozy living room with fireplace"
                                className="w-full h-[32rem] object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Second Section */}
            <div className="container mx-auto px-6 pb-16">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Image */}
                    <div className="rounded-lg overflow-hidden shadow-2xl">
                        <img
                            src="https://wdt-teapoy.myshopify.com/cdn/shop/files/img-1.jpg?v=1720163379&width=1500"
                            alt="Modern living room interior"
                            className="w-full h-[32rem] object-cover"
                        />
                    </div>

                    {/* Right Content */}
                    <div className="space-y-8">
                        <div className="space-y-6">
                            <h2 className="text-3xl lg:text-4xl font-bold">
                                Discover Endless Designs
                            </h2>

                            <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                                Integer dapibus ac dui pretium blandit. Class aptent taciti sociosqu ad litora torquent per
                                conubia nostra, per inceptos himenaeos. Ut eleifend mattis ligula, porta finibus urna
                                gravida at. Aenean vehicula sodales arcu non mattis.
                            </p>
                        </div>

                        {/* Feature List */}
                        <div className="space-y-4">
                            {[
                                "Ut eleifend mattis ligula, porta finibus urna gravida at",
                                "Aenean vehicula sodales arcu non mattis.",
                                "Integer dapibus ac dui pretium blanss aptent."
                            ].map((text, index) => (
                                <div className="flex items-start space-x-3" key={index}>
                                    <div className="bg-orange-500 rounded-full p-1 mt-1 flex-shrink-0">
                                        <Check className="w-3 h-3 text-white" />
                                    </div>
                                    <p className="text-gray-700 dark:text-gray-300">{text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FurnitureShowcase;
