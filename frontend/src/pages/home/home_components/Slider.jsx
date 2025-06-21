// import React, {useState} from 'react'
// import {ArrowRight, ChevronLeft, ChevronRight} from "lucide-react";
//
// const Slider = () => {
//     const [currentSlide, setCurrentSlide] = useState(0);
//
//     const slides = [
//         {
//             id: 1,
//             image: "https://wdt-teapoy.myshopify.com/cdn/shop/files/slider-img-2.jpg?v=1719824824",
//             title: "Enjoy Style And Comfort",
//             subtitle: "CRAFTSMANSHIP",
//             description: "Consectetur a erat nam at. Facilisis magna etiam tempor orci. Sem et tortor consequat id. Fermentum egestas tellus. Nunc eu hendrerit turpis. Fusce non lectus sem. In pellentesque nunc non Donec pretium gravida neque et placerat."
//         },
//         {
//             id: 2,
//             image: "https://wdt-teapoy.myshopify.com/cdn/shop/files/slider-img-03_ceb10e02-b97b-4d28-bf36-b6e94130fdbf.jpg?v=1719906493",
//             title: "Modern Living Redefined",
//             subtitle: "ELEGANCE",
//             description: "Transform your living space with our contemporary furniture collection. Each piece is carefully crafted to blend functionality with aesthetic appeal, creating the perfect harmony for your home."
//         }
//     ];
//     const nextSlide = () => {
//         setCurrentSlide((prev) => (prev + 1) % slides.length);
//     };
//
//     const prevSlide = () => {
//         setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
//     };
//     return (
//         <>
//         {/* Hero Section */}
//         <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white">
//             {/* Navigation Arrows */}
//             <button
//                 onClick={prevSlide}
//                 className="absolute left-4 sm:left-8 top-1/2 transform -translate-y-1/2 z-30 w-12 h-12 bg-orange-500 hover:bg-orange-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg"
//             >
//                 <ChevronLeft className="w-6 h-6 text-white" />
//             </button>
//
//             <button
//                 onClick={nextSlide}
//                 className="absolute right-4 sm:right-8 top-1/2 transform -translate-y-1/2 z-30 w-12 h-12 bg-orange-500 hover:bg-orange-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg"
//             >
//                 <ChevronRight className="w-6 h-6 text-white" />
//             </button>
//
//             {/* Content Container */}
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-24 w-full">
//                 <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
//                     {/* Left Content */}
//                     <div className="text-center lg:text-left order-2 lg:order-1 space-y-6 lg:space-y-8">
//                         <div className="space-y-4 lg:space-y-6">
//                 <span className="inline-block text-orange-500 text-sm sm:text-base font-medium tracking-widest uppercase animate-pulse">
//                   {slides[currentSlide].subtitle}
//                 </span>
//                             <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-light leading-tight transition-all duration-500">
//                                 {slides[currentSlide].title.split(' ').slice(0, -1).join(' ')}{' '}
//                                 <span className="font-medium bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
//                     {slides[currentSlide].title.split(' ').slice(-1)}
//                   </span>
//                             </h1>
//                         </div>
//
//                         <p className="text-gray-300 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0 opacity-90 transition-all duration-500">
//                             {slides[currentSlide].description}
//                         </p>
//
//                         <div className="pt-4 lg:pt-6">
//                             <button className="group bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 px-8 py-4 rounded-full text-white font-medium flex items-center space-x-3 mx-auto lg:mx-0 transition-all duration-300 hover:shadow-xl hover:scale-105 hover:-translate-y-1">
//                                 <span>SHOP NOW</span>
//                                 <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//                             </button>
//                         </div>
//                     </div>
//
//                     {/* Right Content - Image Slider */}
//                     <div className="order-1 lg:order-2 relative">
//                         <div className="relative max-w-2xl mx-auto">
//                             {/* Background Decorative Elements */}
//                             <div className="absolute -inset-4 bg-gradient-to-r from-orange-500/20 to-amber-500/20 rounded-3xl blur-2xl animate-pulse"></div>
//                             <div className="absolute inset-0 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-3xl transform rotate-3"></div>
//                             <div className="absolute inset-0 bg-gradient-to-tl from-gray-700/30 to-gray-800/30 rounded-3xl transform -rotate-2"></div>
//
//                             {/* Image Container */}
//                             <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl overflow-hidden shadow-2xl border border-gray-700/50">
//                                 <div className="relative h-64 sm:h-80 lg:h-96 xl:h-[28rem]">
//                                     {slides.map((slide, index) => (
//                                         <div
//                                             key={slide.id}
//                                             className={`absolute inset-0 transition-all duration-700 ease-in-out ${
//                                                 index === currentSlide
//                                                     ? 'opacity-100 scale-100'
//                                                     : 'opacity-0 scale-105'
//                                             }`}
//                                         >
//                                             <img
//                                                 src={slide.image}
//                                                 alt={slide.title}
//                                                 className="w-full h-full object-cover"
//                                                 onError={(e) => {
//                                                     e.target.style.display = 'none';
//                                                     e.target.nextSibling.style.display = 'flex';
//                                                 }}
//                                             />
//                                             {/* Fallback furniture illustration */}
//                                             <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 p-6 sm:p-8 lg:p-12 hidden items-center justify-center">
//                                                 <div className="grid grid-cols-3 gap-4 lg:gap-6 items-end w-full max-w-md">
//                                                     {/* Left Lamp & Chair */}
//                                                     <div className="space-y-4">
//                                                         <div className="relative mx-auto w-8 sm:w-12 lg:w-16">
//                                                             <div className="w-full aspect-square bg-gradient-to-br from-amber-200 to-amber-400 rounded-full shadow-lg"></div>
//                                                             <div className="w-1 sm:w-2 h-16 sm:h-24 lg:h-32 bg-gradient-to-b from-amber-600 to-amber-800 mx-auto"></div>
//                                                             <div className="w-6 sm:w-8 lg:w-12 h-2 sm:h-3 bg-gray-600 rounded-full mx-auto"></div>
//                                                         </div>
//                                                         <div className="w-full h-16 sm:h-20 lg:h-24 bg-gradient-to-br from-gray-400 to-gray-600 rounded-t-3xl relative shadow-lg">
//                                                             <div className="absolute top-2 left-2 right-2 h-6 sm:h-8 bg-gradient-to-br from-gray-300 to-gray-500 rounded-t-xl"></div>
//                                                             <div className="absolute -left-2 top-4 w-4 sm:w-6 h-8 sm:h-10 bg-gradient-to-br from-gray-400 to-gray-600 rounded-l-xl"></div>
//                                                             <div className="absolute -right-2 top-4 w-4 sm:w-6 h-8 sm:h-10 bg-gradient-to-br from-gray-400 to-gray-600 rounded-r-xl"></div>
//                                                         </div>
//                                                     </div>
//
//                                                     {/* Center Sofa */}
//                                                     <div className="relative">
//                                                         <div className="w-full h-20 sm:h-24 lg:h-28 bg-gradient-to-br from-gray-700 to-gray-900 rounded-t-3xl shadow-xl">
//                                                             <div className="absolute top-2 left-2 right-2 h-8 sm:h-10 lg:h-12 bg-gradient-to-br from-gray-600 to-gray-800 rounded-t-xl"></div>
//                                                             <div className="absolute bottom-0 left-2 right-2 h-8 sm:h-10 lg:h-12 bg-gradient-to-br from-gray-500 to-gray-700 rounded-b-xl flex space-x-1 p-1">
//                                                                 <div className="flex-1 bg-gradient-to-br from-gray-400 to-gray-600 rounded"></div>
//                                                                 <div className="flex-1 bg-gradient-to-br from-gray-400 to-gray-600 rounded"></div>
//                                                                 <div className="flex-1 bg-gradient-to-br from-gray-400 to-gray-600 rounded"></div>
//                                                             </div>
//                                                             <div className="absolute top-3 left-3 w-3 sm:w-4 lg:w-6 h-3 sm:h-4 lg:h-6 bg-gradient-to-br from-gray-300 to-gray-500 rounded transform -rotate-12"></div>
//                                                             <div className="absolute top-3 right-3 w-3 sm:w-4 lg:w-6 h-3 sm:h-4 lg:h-6 bg-gradient-to-br from-gray-300 to-gray-500 rounded transform rotate-12"></div>
//                                                         </div>
//                                                         <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-12 sm:w-16 lg:w-20 h-3 sm:h-4 lg:h-5 bg-gradient-to-br from-amber-600 to-amber-800 rounded-full shadow-lg">
//                                                             <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 sm:w-10 lg:w-12 h-1 bg-gradient-to-r from-amber-700 to-amber-900 rounded-full"></div>
//                                                         </div>
//                                                     </div>
//
//                                                     {/* Right Lamp & Chair */}
//                                                     <div className="space-y-4">
//                                                         <div className="relative mx-auto w-8 sm:w-12 lg:w-16">
//                                                             <div className="w-full aspect-square bg-gradient-to-br from-amber-200 to-amber-400 rounded-full shadow-lg"></div>
//                                                             <div className="w-1 sm:w-2 h-16 sm:h-24 lg:h-32 bg-gradient-to-b from-amber-600 to-amber-800 mx-auto"></div>
//                                                             <div className="w-6 sm:w-8 lg:w-12 h-2 sm:h-3 bg-gray-600 rounded-full mx-auto"></div>
//                                                         </div>
//                                                         <div className="w-full h-16 sm:h-20 lg:h-24 bg-gradient-to-br from-gray-400 to-gray-600 rounded-t-3xl relative shadow-lg">
//                                                             <div className="absolute top-2 left-2 right-2 h-6 sm:h-8 bg-gradient-to-br from-gray-300 to-gray-500 rounded-t-xl"></div>
//                                                             <div className="absolute -left-2 top-4 w-4 sm:w-6 h-8 sm:h-10 bg-gradient-to-br from-gray-400 to-gray-600 rounded-l-xl"></div>
//                                                             <div className="absolute -right-2 top-4 w-4 sm:w-6 h-8 sm:h-10 bg-gradient-to-br from-gray-400 to-gray-600 rounded-r-xl"></div>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     ))}
//
//                                     {/* Image Overlay Gradient */}
//                                     <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
//                                 </div>
//
//                                 {/* Ambient Lighting Effects */}
//                                 <div className="absolute top-4 left-4 w-16 sm:w-24 h-16 sm:h-24 bg-amber-400/20 rounded-full blur-xl"></div>
//                                 <div className="absolute top-4 right-4 w-16 sm:w-24 h-16 sm:h-24 bg-amber-400/20 rounded-full blur-xl"></div>
//                                 <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-20 sm:w-32 h-8 sm:h-12 bg-orange-500/10 rounded-full blur-lg"></div>
//                             </div>
//
//                             {/* Slide Indicators */}
//                             <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
//                                 {slides.map((_, index) => (
//                                     <button
//                                         key={index}
//                                         onClick={() => setCurrentSlide(index)}
//                                         className={`w-3 h-3 rounded-full transition-all duration-300 ${
//                                             index === currentSlide
//                                                 ? 'bg-orange-500 scale-125'
//                                                 : 'bg-gray-400 hover:bg-gray-300'
//                                         }`}
//                                     />
//                                 ))}
//                             </div>
//
//                             {/* Background Pattern */}
//                             <div className="absolute -inset-8 opacity-10">
//                                 <div className="absolute top-0 left-0 w-2 h-2 bg-orange-500 rounded-full animate-ping"></div>
//                                 <div className="absolute top-8 right-8 w-1 h-1 bg-amber-400 rounded-full animate-pulse"></div>
//                                 <div className="absolute bottom-16 left-16 w-1.5 h-1.5 bg-orange-400 rounded-full animate-pulse delay-300"></div>
//                                 <div className="absolute bottom-8 right-0 w-2 h-2 bg-amber-500 rounded-full animate-ping delay-700"></div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//
//             {/* Decorative Background Elements */}
//             <div className="absolute inset-0 overflow-hidden pointer-events-none">
//                 <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-orange-500/5 to-transparent rounded-full blur-3xl"></div>
//                 <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-amber-500/5 to-transparent rounded-full blur-3xl"></div>
//             </div>
//         </section>
//
//         </>
//     )
// }
// export default Slider

import React, { useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const Slider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        {
            id: 1,
            image: "https://wdt-teapoy.myshopify.com/cdn/shop/files/slider-img-2.jpg?v=1719824824",
            title: "Enjoy Style And Comfort",
            subtitle: "CRAFTSMANSHIP",
            description: "Consectetur a erat nam at. Facilisis magna etiam tempor orci. Sem et tortor consequat id. Fermentum egestas tellus. Nunc eu hendrerit turpis. Fusce non lectus sem. In pellentesque nunc non Donec pretium gravida neque et placerat."
        },
        {
            id: 2,
            image: "https://wdt-teapoy.myshopify.com/cdn/shop/files/slider-img-03_ceb10e02-b97b-4d28-bf36-b6e94130fdbf.jpg?v=1719906493",
            title: "Modern Living Redefined",
            subtitle: "ELEGANCE",
            description: "Transform your living space with our contemporary furniture collection. Each piece is carefully crafted to blend functionality with aesthetic appeal, creating the perfect harmony for your home."
        }
    ];

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    return (
        <section className="relative min-h-screen flex items-center overflow-hidden bg-white dark:bg-gradient-to-br dark:from-gray-800 dark:via-gray-900 dark:to-black transition-colors duration-500">
            {/* Navigation Arrows */}
            <button
                onClick={prevSlide}
                className="absolute left-4 sm:left-8 top-1/2 transform -translate-y-1/2 z-30 w-12 h-12 bg-orange-500 hover:bg-orange-600 rounded-full flex items-center justify-center transition duration-300 hover:scale-110 shadow-lg"
            >
                <ChevronLeft className="w-6 h-6 text-white" />
            </button>

            <button
                onClick={nextSlide}
                className="absolute right-4 sm:right-8 top-1/2 transform -translate-y-1/2 z-30 w-12 h-12 bg-orange-500 hover:bg-orange-600 rounded-full flex items-center justify-center transition duration-300 hover:scale-110 shadow-lg"
            >
                <ChevronRight className="w-6 h-6 text-white" />
            </button>

            {/* Content Container */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-24 w-full text-black dark:text-white">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                    {/* Left Content */}
                    <div className="text-center lg:text-left order-2 lg:order-1 space-y-6 lg:space-y-8">
                        <div className="space-y-4 lg:space-y-6">
              <span className="inline-block text-orange-500 text-sm sm:text-base font-medium tracking-widest uppercase animate-pulse">
                {slides[currentSlide].subtitle}
              </span>
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-light leading-tight transition-all duration-500">
                                {slides[currentSlide].title.split(' ').slice(0, -1).join(' ')}{' '}
                                <span className="font-medium bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                  {slides[currentSlide].title.split(' ').slice(-1)}
                </span>
                            </h1>
                        </div>

                        <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0 transition-all duration-500">
                            {slides[currentSlide].description}
                        </p>

                        <div className="pt-4 lg:pt-6">
                            <button className="group bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 px-8 py-4 rounded-full text-white font-medium flex items-center space-x-3 mx-auto lg:mx-0 transition-all duration-300 hover:shadow-xl hover:scale-105 hover:-translate-y-1">
                                <span>SHOP NOW</span>
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>

                    {/* Right Image */}
                    <div className="order-1 lg:order-2 relative">
                        <div className="relative max-w-2xl mx-auto">
                            <div className="relative bg-gray-100 dark:bg-gradient-to-br dark:from-gray-800 dark:to-gray-900 rounded-3xl overflow-hidden shadow-2xl border border-gray-300 dark:border-gray-700/50 transition-colors duration-500">
                                <div className="relative h-64 sm:h-80 lg:h-96 xl:h-[28rem]">
                                    {slides.map((slide, index) => (
                                        <div
                                            key={slide.id}
                                            className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                                                index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                                            }`}
                                        >
                                            <img
                                                src={slide.image}
                                                alt={slide.title}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Slide Indicators */}
                            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
                                {slides.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentSlide(index)}
                                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                            index === currentSlide
                                                ? 'bg-orange-500 scale-125'
                                                : 'bg-gray-400 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500'
                                        }`}
                                    />
                                ))}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Slider;

